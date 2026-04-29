function FE(n, a) {
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
function $E(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Hf = { exports: {} }, jr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ag;
function XE() {
  if (Ag) return jr;
  Ag = 1;
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
  return jr.Fragment = a, jr.jsx = l, jr.jsxs = l, jr;
}
var jg;
function KE() {
  return jg || (jg = 1, Hf.exports = XE()), Hf.exports;
}
var v = KE(), qf = { exports: {} }, Ae = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dg;
function QE() {
  if (Dg) return Ae;
  Dg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(A) {
    return A === null || typeof A != "object" ? null : (A = S && A[S] || A["@@iterator"], typeof A == "function" ? A : null);
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
  function z(A, F, le) {
    this.props = A, this.context = F, this.refs = D, this.updater = le || R;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(A, F) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, F, "setState");
  }, z.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function B() {
  }
  B.prototype = z.prototype;
  function U(A, F, le) {
    this.props = A, this.context = F, this.refs = D, this.updater = le || R;
  }
  var V = U.prototype = new B();
  V.constructor = U, w(V, z.prototype), V.isPureReactComponent = !0;
  var $ = Array.isArray;
  function Q() {
  }
  var ee = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function Z(A, F, le) {
    var ce = le.ref;
    return {
      $$typeof: n,
      type: A,
      key: F,
      ref: ce !== void 0 ? ce : null,
      props: le
    };
  }
  function W(A, F) {
    return Z(A.type, F, A.props);
  }
  function ie(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function K(A) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(le) {
      return F[le];
    });
  }
  var Y = /\/+/g;
  function re(A, F) {
    return typeof A == "object" && A !== null && A.key != null ? K("" + A.key) : F.toString(36);
  }
  function te(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(Q, Q) : (A.status = "pending", A.then(
          function(F) {
            A.status === "pending" && (A.status = "fulfilled", A.value = F);
          },
          function(F) {
            A.status === "pending" && (A.status = "rejected", A.reason = F);
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
  function O(A, F, le, ce, Re) {
    var Me = typeof A;
    (Me === "undefined" || Me === "boolean") && (A = null);
    var je = !1;
    if (A === null) je = !0;
    else
      switch (Me) {
        case "bigint":
        case "string":
        case "number":
          je = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case n:
            case a:
              je = !0;
              break;
            case y:
              return je = A._init, O(
                je(A._payload),
                F,
                le,
                ce,
                Re
              );
          }
      }
    if (je)
      return Re = Re(A), je = ce === "" ? "." + re(A, 0) : ce, $(Re) ? (le = "", je != null && (le = je.replace(Y, "$&/") + "/"), O(Re, F, le, "", function(Xn) {
        return Xn;
      })) : Re != null && (ie(Re) && (Re = W(
        Re,
        le + (Re.key == null || A && A.key === Re.key ? "" : ("" + Re.key).replace(
          Y,
          "$&/"
        ) + "/") + je
      )), F.push(Re)), 1;
    je = 0;
    var ft = ce === "" ? "." : ce + ":";
    if ($(A))
      for (var Fe = 0; Fe < A.length; Fe++)
        ce = A[Fe], Me = ft + re(ce, Fe), je += O(
          ce,
          F,
          le,
          Me,
          Re
        );
    else if (Fe = T(A), typeof Fe == "function")
      for (A = Fe.call(A), Fe = 0; !(ce = A.next()).done; )
        ce = ce.value, Me = ft + re(ce, Fe++), je += O(
          ce,
          F,
          le,
          Me,
          Re
        );
    else if (Me === "object") {
      if (typeof A.then == "function")
        return O(
          te(A),
          F,
          le,
          ce,
          Re
        );
      throw F = String(A), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return je;
  }
  function ne(A, F, le) {
    if (A == null) return A;
    var ce = [], Re = 0;
    return O(A, ce, "", "", function(Me) {
      return F.call(le, Me, Re++);
    }), ce;
  }
  function se(A) {
    if (A._status === -1) {
      var F = A._result;
      F = F(), F.then(
        function(le) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = le);
        },
        function(le) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = le);
        }
      ), A._status === -1 && (A._status = 0, A._result = F);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var ue = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var F = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(F)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, Se = {
    map: ne,
    forEach: function(A, F, le) {
      ne(
        A,
        function() {
          F.apply(this, arguments);
        },
        le
      );
    },
    count: function(A) {
      var F = 0;
      return ne(A, function() {
        F++;
      }), F;
    },
    toArray: function(A) {
      return ne(A, function(F) {
        return F;
      }) || [];
    },
    only: function(A) {
      if (!ie(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Ae.Activity = b, Ae.Children = Se, Ae.Component = z, Ae.Fragment = l, Ae.Profiler = o, Ae.PureComponent = U, Ae.StrictMode = s, Ae.Suspense = p, Ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ee, Ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return ee.H.useMemoCache(A);
    }
  }, Ae.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Ae.cacheSignal = function() {
    return null;
  }, Ae.cloneElement = function(A, F, le) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ce = w({}, A.props), Re = A.key;
    if (F != null)
      for (Me in F.key !== void 0 && (Re = "" + F.key), F)
        !j.call(F, Me) || Me === "key" || Me === "__self" || Me === "__source" || Me === "ref" && F.ref === void 0 || (ce[Me] = F[Me]);
    var Me = arguments.length - 2;
    if (Me === 1) ce.children = le;
    else if (1 < Me) {
      for (var je = Array(Me), ft = 0; ft < Me; ft++)
        je[ft] = arguments[ft + 2];
      ce.children = je;
    }
    return Z(A.type, Re, ce);
  }, Ae.createContext = function(A) {
    return A = {
      $$typeof: d,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: c,
      _context: A
    }, A;
  }, Ae.createElement = function(A, F, le) {
    var ce, Re = {}, Me = null;
    if (F != null)
      for (ce in F.key !== void 0 && (Me = "" + F.key), F)
        j.call(F, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (Re[ce] = F[ce]);
    var je = arguments.length - 2;
    if (je === 1) Re.children = le;
    else if (1 < je) {
      for (var ft = Array(je), Fe = 0; Fe < je; Fe++)
        ft[Fe] = arguments[Fe + 2];
      Re.children = ft;
    }
    if (A && A.defaultProps)
      for (ce in je = A.defaultProps, je)
        Re[ce] === void 0 && (Re[ce] = je[ce]);
    return Z(A, Me, Re);
  }, Ae.createRef = function() {
    return { current: null };
  }, Ae.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Ae.isValidElement = ie, Ae.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: se
    };
  }, Ae.memo = function(A, F) {
    return {
      $$typeof: m,
      type: A,
      compare: F === void 0 ? null : F
    };
  }, Ae.startTransition = function(A) {
    var F = ee.T, le = {};
    ee.T = le;
    try {
      var ce = A(), Re = ee.S;
      Re !== null && Re(le, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(Q, ue);
    } catch (Me) {
      ue(Me);
    } finally {
      F !== null && le.types !== null && (F.types = le.types), ee.T = F;
    }
  }, Ae.unstable_useCacheRefresh = function() {
    return ee.H.useCacheRefresh();
  }, Ae.use = function(A) {
    return ee.H.use(A);
  }, Ae.useActionState = function(A, F, le) {
    return ee.H.useActionState(A, F, le);
  }, Ae.useCallback = function(A, F) {
    return ee.H.useCallback(A, F);
  }, Ae.useContext = function(A) {
    return ee.H.useContext(A);
  }, Ae.useDebugValue = function() {
  }, Ae.useDeferredValue = function(A, F) {
    return ee.H.useDeferredValue(A, F);
  }, Ae.useEffect = function(A, F) {
    return ee.H.useEffect(A, F);
  }, Ae.useEffectEvent = function(A) {
    return ee.H.useEffectEvent(A);
  }, Ae.useId = function() {
    return ee.H.useId();
  }, Ae.useImperativeHandle = function(A, F, le) {
    return ee.H.useImperativeHandle(A, F, le);
  }, Ae.useInsertionEffect = function(A, F) {
    return ee.H.useInsertionEffect(A, F);
  }, Ae.useLayoutEffect = function(A, F) {
    return ee.H.useLayoutEffect(A, F);
  }, Ae.useMemo = function(A, F) {
    return ee.H.useMemo(A, F);
  }, Ae.useOptimistic = function(A, F) {
    return ee.H.useOptimistic(A, F);
  }, Ae.useReducer = function(A, F, le) {
    return ee.H.useReducer(A, F, le);
  }, Ae.useRef = function(A) {
    return ee.H.useRef(A);
  }, Ae.useState = function(A) {
    return ee.H.useState(A);
  }, Ae.useSyncExternalStore = function(A, F, le) {
    return ee.H.useSyncExternalStore(
      A,
      F,
      le
    );
  }, Ae.useTransition = function() {
    return ee.H.useTransition();
  }, Ae.version = "19.2.5", Ae;
}
var Ng;
function Zd() {
  return Ng || (Ng = 1, qf.exports = QE()), qf.exports;
}
var x = Zd();
const IE = /* @__PURE__ */ $E(x), ZE = /* @__PURE__ */ FE({
  __proto__: null,
  default: IE
}, [x]);
var kf = { exports: {} }, Dr = {}, Pf = { exports: {} }, Yf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zg;
function JE() {
  return zg || (zg = 1, (function(n) {
    function a(O, ne) {
      var se = O.length;
      O.push(ne);
      e: for (; 0 < se; ) {
        var ue = se - 1 >>> 1, Se = O[ue];
        if (0 < o(Se, ne))
          O[ue] = ne, O[se] = Se, se = ue;
        else break e;
      }
    }
    function l(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var ne = O[0], se = O.pop();
      if (se !== ne) {
        O[0] = se;
        e: for (var ue = 0, Se = O.length, A = Se >>> 1; ue < A; ) {
          var F = 2 * (ue + 1) - 1, le = O[F], ce = F + 1, Re = O[ce];
          if (0 > o(le, se))
            ce < Se && 0 > o(Re, le) ? (O[ue] = Re, O[ce] = se, ue = ce) : (O[ue] = le, O[F] = se, ue = F);
          else if (ce < Se && 0 > o(Re, se))
            O[ue] = Re, O[ce] = se, ue = ce;
          else break e;
        }
      }
      return ne;
    }
    function o(O, ne) {
      var se = O.sortIndex - ne.sortIndex;
      return se !== 0 ? se : O.id - ne.id;
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
    var p = [], m = [], y = 1, b = null, S = 3, T = !1, R = !1, w = !1, D = !1, z = typeof setTimeout == "function" ? setTimeout : null, B = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function V(O) {
      for (var ne = l(m); ne !== null; ) {
        if (ne.callback === null) s(m);
        else if (ne.startTime <= O)
          s(m), ne.sortIndex = ne.expirationTime, a(p, ne);
        else break;
        ne = l(m);
      }
    }
    function $(O) {
      if (w = !1, V(O), !R)
        if (l(p) !== null)
          R = !0, Q || (Q = !0, K());
        else {
          var ne = l(m);
          ne !== null && te($, ne.startTime - O);
        }
    }
    var Q = !1, ee = -1, j = 5, Z = -1;
    function W() {
      return D ? !0 : !(n.unstable_now() - Z < j);
    }
    function ie() {
      if (D = !1, Q) {
        var O = n.unstable_now();
        Z = O;
        var ne = !0;
        try {
          e: {
            R = !1, w && (w = !1, B(ee), ee = -1), T = !0;
            var se = S;
            try {
              t: {
                for (V(O), b = l(p); b !== null && !(b.expirationTime > O && W()); ) {
                  var ue = b.callback;
                  if (typeof ue == "function") {
                    b.callback = null, S = b.priorityLevel;
                    var Se = ue(
                      b.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof Se == "function") {
                      b.callback = Se, V(O), ne = !0;
                      break t;
                    }
                    b === l(p) && s(p), V(O);
                  } else s(p);
                  b = l(p);
                }
                if (b !== null) ne = !0;
                else {
                  var A = l(m);
                  A !== null && te(
                    $,
                    A.startTime - O
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
          ne ? K() : Q = !1;
        }
      }
    }
    var K;
    if (typeof U == "function")
      K = function() {
        U(ie);
      };
    else if (typeof MessageChannel < "u") {
      var Y = new MessageChannel(), re = Y.port2;
      Y.port1.onmessage = ie, K = function() {
        re.postMessage(null);
      };
    } else
      K = function() {
        z(ie, 0);
      };
    function te(O, ne) {
      ee = z(function() {
        O(n.unstable_now());
      }, ne);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(O) {
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
        return O();
      } finally {
        S = se;
      }
    }, n.unstable_requestPaint = function() {
      D = !0;
    }, n.unstable_runWithPriority = function(O, ne) {
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
      var se = S;
      S = O;
      try {
        return ne();
      } finally {
        S = se;
      }
    }, n.unstable_scheduleCallback = function(O, ne, se) {
      var ue = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? ue + se : ue) : se = ue, O) {
        case 1:
          var Se = -1;
          break;
        case 2:
          Se = 250;
          break;
        case 5:
          Se = 1073741823;
          break;
        case 4:
          Se = 1e4;
          break;
        default:
          Se = 5e3;
      }
      return Se = se + Se, O = {
        id: y++,
        callback: ne,
        priorityLevel: O,
        startTime: se,
        expirationTime: Se,
        sortIndex: -1
      }, se > ue ? (O.sortIndex = se, a(m, O), l(p) === null && O === l(m) && (w ? (B(ee), ee = -1) : w = !0, te($, se - ue))) : (O.sortIndex = Se, a(p, O), R || T || (R = !0, Q || (Q = !0, K()))), O;
    }, n.unstable_shouldYield = W, n.unstable_wrapCallback = function(O) {
      var ne = S;
      return function() {
        var se = S;
        S = ne;
        try {
          return O.apply(this, arguments);
        } finally {
          S = se;
        }
      };
    };
  })(Yf)), Yf;
}
var Og;
function WE() {
  return Og || (Og = 1, Pf.exports = JE()), Pf.exports;
}
var Gf = { exports: {} }, Bt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _g;
function eT() {
  if (_g) return Bt;
  _g = 1;
  var n = Zd();
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
  return Bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Bt.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(p, m, null, y);
  }, Bt.flushSync = function(p) {
    var m = d.T, y = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = m, s.p = y, s.d.f();
    }
  }, Bt.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Bt.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Bt.preinit = function(p, m) {
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
  }, Bt.preinitModule = function(p, m) {
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
  }, Bt.preload = function(p, m) {
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
  }, Bt.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, Bt.requestFormReset = function(p) {
    s.d.r(p);
  }, Bt.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, Bt.useFormState = function(p, m, y) {
    return d.H.useFormState(p, m, y);
  }, Bt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Bt.version = "19.2.5", Bt;
}
var Lg;
function tT() {
  if (Lg) return Gf.exports;
  Lg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Gf.exports = eT(), Gf.exports;
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
var Ug;
function nT() {
  if (Ug) return Dr;
  Ug = 1;
  var n = WE(), a = Zd(), l = tT();
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
  var b = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), U = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), Z = Symbol.for("react.activity"), W = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
  function K(e) {
    return e === null || typeof e != "object" ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Y ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case z:
        return "Profiler";
      case D:
        return "StrictMode";
      case $:
        return "Suspense";
      case Q:
        return "SuspenseList";
      case Z:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case U:
          return e.displayName || "Context";
        case B:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ee:
          return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
        case j:
          t = e._payload, e = e._init;
          try {
            return re(e(t));
          } catch {
          }
      }
    return null;
  }
  var te = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ue = [], Se = -1;
  function A(e) {
    return { current: e };
  }
  function F(e) {
    0 > Se || (e.current = ue[Se], ue[Se] = null, Se--);
  }
  function le(e, t) {
    Se++, ue[Se] = e.current, e.current = t;
  }
  var ce = A(null), Re = A(null), Me = A(null), je = A(null);
  function ft(e, t) {
    switch (le(Me, t), le(Re, e), le(ce, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Zy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Zy(t), e = Jy(t, e);
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
    F(ce), le(ce, e);
  }
  function Fe() {
    F(ce), F(Re), F(Me);
  }
  function Xn(e) {
    e.memoizedState !== null && le(je, e);
    var t = ce.current, i = Jy(t, e.type);
    t !== i && (le(Re, e), le(ce, i));
  }
  function ba(e) {
    Re.current === e && (F(ce), F(Re)), je.current === e && (F(je), wr._currentValue = se);
  }
  var Ee, we;
  function Ke(e) {
    if (Ee === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        Ee = t && t[1] || "", we = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ee + e + we;
  }
  var Ft = !1;
  function Kn(e, t) {
    if (!e || Ft) return "";
    Ft = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var J = function() {
                throw Error();
              };
              if (Object.defineProperty(J.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(J, []);
                } catch (G) {
                  var P = G;
                }
                Reflect.construct(e, [], J);
              } else {
                try {
                  J.call();
                } catch (G) {
                  P = G;
                }
                e.call(J.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (G) {
                P = G;
              }
              (J = e()) && typeof J.catch == "function" && J.catch(function() {
              });
            }
          } catch (G) {
            if (G && P && typeof G.stack == "string")
              return [G.stack, P.stack];
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
      Ft = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Ke(i) : "";
  }
  function Qn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ke(e.type);
      case 16:
        return Ke("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ke("Suspense Fallback") : Ke("Suspense");
      case 19:
        return Ke("SuspenseList");
      case 0:
      case 15:
        return Kn(e.type, !1);
      case 11:
        return Kn(e.type.render, !1);
      case 1:
        return Kn(e.type, !0);
      case 31:
        return Ke("Activity");
      default:
        return "";
    }
  }
  function ds(e) {
    try {
      var t = "", i = null;
      do
        t += Qn(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Bl = Object.prototype.hasOwnProperty, Hi = n.unstable_scheduleCallback, Hl = n.unstable_cancelCallback, Mu = n.unstable_shouldYield, Au = n.unstable_requestPaint, qt = n.unstable_now, In = n.unstable_getCurrentPriorityLevel, Sa = n.unstable_ImmediatePriority, ql = n.unstable_UserBlockingPriority, xa = n.unstable_NormalPriority, wn = n.unstable_LowPriority, un = n.unstable_IdlePriority, hs = n.log, ju = n.unstable_setDisableYieldValue, Zn = null, kt = null;
  function Mt(e) {
    if (typeof hs == "function" && ju(e), kt && typeof kt.setStrictMode == "function")
      try {
        kt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Ut = Math.clz32 ? Math.clz32 : Du, ms = Math.log, ps = Math.LN2;
  function Du(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ms(e) / ps | 0) | 0;
  }
  var li = 256, Jn = 262144, ri = 4194304;
  function Cn(e) {
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
  function qi(e, t, i) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~f, r !== 0 ? u = Cn(r) : (g &= E, g !== 0 ? u = Cn(g) : i || (i = E & ~e, i !== 0 && (u = Cn(i))))) : (E = r & ~f, E !== 0 ? u = Cn(E) : g !== 0 ? u = Cn(g) : i || (i = r & ~e, i !== 0 && (u = Cn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, i = t & -t, f >= i || f === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function Ea(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Nu(e, t) {
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
  function kl() {
    var e = ri;
    return ri <<= 1, (ri & 62914560) === 0 && (ri = 4194304), e;
  }
  function Ta(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function Ln(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ys(e, t, i, r, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, C = e.expirationTimes, q = e.hiddenUpdates;
    for (i = g & ~i; 0 < i; ) {
      var X = 31 - Ut(i), J = 1 << X;
      E[X] = 0, C[X] = -1;
      var P = q[X];
      if (P !== null)
        for (q[X] = null, X = 0; X < P.length; X++) {
          var G = P[X];
          G !== null && (G.lane &= -536870913);
        }
      i &= ~J;
    }
    r !== 0 && gs(e, r, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~t));
  }
  function gs(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - Ut(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function vs(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var r = 31 - Ut(i), u = 1 << r;
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
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : xg(e.type));
  }
  function oe(e, t) {
    var i = ne.p;
    try {
      return ne.p = e, t();
    } finally {
      ne.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), fe = "__reactFiber$" + pe, de = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, Te = "__reactListeners$" + pe, be = "__reactHandles$" + pe, ke = "__reactResources$" + pe, ze = "__reactMarker$" + pe;
  function We(e) {
    delete e[fe], delete e[de], delete e[he], delete e[Te], delete e[be];
  }
  function Qe(e) {
    var t = e[fe];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ge] || i[fe]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = lg(e); e !== null; ) {
            if (i = e[fe]) return i;
            e = lg(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function ot(e) {
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
  function vt(e) {
    var t = e[ke];
    return t || (t = e[ke] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function nt(e) {
    e[ze] = !0;
  }
  var Ra = /* @__PURE__ */ new Set(), Mn = {};
  function At(e, t) {
    Un(e, t), Un(e + "Capture", t);
  }
  function Un(e, t) {
    for (Mn[e] = t, e = 0; e < t.length; e++)
      Ra.add(t[e]);
  }
  var si = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Vn = {}, oi = {};
  function ki(e) {
    return Bl.call(oi, e) ? !0 : Bl.call(Vn, e) ? !1 : si.test(e) ? oi[e] = !0 : (Vn[e] = !0, !1);
  }
  function Oe(e, t, i) {
    if (ki(t))
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
  function mt(e, t, i) {
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
  function Vt(e, t, i, r) {
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
  function bt(e) {
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
  function Pi(e, t, i) {
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
  function Yi(e) {
    if (!e._valueTracker) {
      var t = at(e) ? "checked" : "value";
      e._valueTracker = Pi(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function bs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), r = "";
    return e && (r = at(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (t.setValue(e), !0) : !1;
  }
  function Ss(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var H1 = /[\n"\\]/g;
  function cn(e) {
    return e.replace(
      H1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function zu(e, t, i, r, u, f, g, E) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + bt(t)) : e.value !== "" + bt(t) && (e.value = "" + bt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Ou(e, g, bt(t)) : i != null ? Ou(e, g, bt(i)) : r != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + bt(E) : e.removeAttribute("name");
  }
  function Fh(e, t, i, r, u, f, g, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        Yi(e);
        return;
      }
      i = i != null ? "" + bt(i) : "", t = t != null ? "" + bt(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Yi(e);
  }
  function Ou(e, t, i) {
    t === "number" && Ss(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Gi(e, t, i, r) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && r && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + bt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, r && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function $h(e, t, i) {
    if (t != null && (t = "" + bt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + bt(i) : "";
  }
  function Xh(e, t, i, r) {
    if (t == null) {
      if (r != null) {
        if (i != null) throw Error(s(92));
        if (te(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        i = r;
      }
      i == null && (i = ""), t = i;
    }
    i = bt(t), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), Yi(e);
  }
  function Fi(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var q1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Kh(e, t, i) {
    var r = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, i) : typeof i != "number" || i === 0 || q1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function Qh(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var r in i)
        !i.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var u in t)
        r = t[u], t.hasOwnProperty(u) && i[u] !== r && Kh(e, u, r);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && Kh(e, f, t[f]);
  }
  function _u(e) {
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
  var k1 = /* @__PURE__ */ new Map([
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
  ]), P1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xs(e) {
    return P1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wn() {
  }
  var Lu = null;
  function Uu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var $i = null, Xi = null;
  function Ih(e) {
    var t = ot(e);
    if (t && (e = t.stateNode)) {
      var i = e[de] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (zu(
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
              'input[name="' + cn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var r = i[t];
              if (r !== e && r.form === e.form) {
                var u = r[de] || null;
                if (!u) throw Error(s(90));
                zu(
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
              r = i[t], r.form === e.form && bs(r);
          }
          break e;
        case "textarea":
          $h(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Gi(e, !!i.multiple, t, !1);
      }
    }
  }
  var Vu = !1;
  function Zh(e, t, i) {
    if (Vu) return e(t, i);
    Vu = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Vu = !1, ($i !== null || Xi !== null) && (oo(), $i && (t = $i, e = Xi, Xi = $i = null, Ih(t), e)))
        for (t = 0; t < e.length; t++) Ih(e[t]);
    }
  }
  function Pl(e, t) {
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
  var ea = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bu = !1;
  if (ea)
    try {
      var Yl = {};
      Object.defineProperty(Yl, "passive", {
        get: function() {
          Bu = !0;
        }
      }), window.addEventListener("test", Yl, Yl), window.removeEventListener("test", Yl, Yl);
    } catch {
      Bu = !1;
    }
  var wa = null, Hu = null, Es = null;
  function Jh() {
    if (Es) return Es;
    var e, t = Hu, i = t.length, r, u = "value" in wa ? wa.value : wa.textContent, f = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var g = i - e;
    for (r = 1; r <= g && t[i - r] === u[f - r]; r++) ;
    return Es = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Ts(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Rs() {
    return !0;
  }
  function Wh() {
    return !1;
  }
  function $t(e) {
    function t(i, r, u, f, g) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Rs : Wh, this.isPropagationStopped = Wh, this;
    }
    return b(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Rs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Rs);
      },
      persist: function() {
      },
      isPersistent: Rs
    }), t;
  }
  var ui = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ws = $t(ui), Gl = b({}, ui, { view: 0, detail: 0 }), Y1 = $t(Gl), qu, ku, Fl, Cs = b({}, Gl, {
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
    getModifierState: Yu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Fl && (Fl && e.type === "mousemove" ? (qu = e.screenX - Fl.screenX, ku = e.screenY - Fl.screenY) : ku = qu = 0, Fl = e), qu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ku;
    }
  }), em = $t(Cs), G1 = b({}, Cs, { dataTransfer: 0 }), F1 = $t(G1), $1 = b({}, Gl, { relatedTarget: 0 }), Pu = $t($1), X1 = b({}, ui, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), K1 = $t(X1), Q1 = b({}, ui, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), I1 = $t(Q1), Z1 = b({}, ui, { data: 0 }), tm = $t(Z1), J1 = {
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
  }, W1 = {
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
  }, ex = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function tx(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = ex[e]) ? !!t[e] : !1;
  }
  function Yu() {
    return tx;
  }
  var nx = b({}, Gl, {
    key: function(e) {
      if (e.key) {
        var t = J1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ts(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? W1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Yu,
    charCode: function(e) {
      return e.type === "keypress" ? Ts(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ts(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), ax = $t(nx), ix = b({}, Cs, {
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
  }), nm = $t(ix), lx = b({}, Gl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yu
  }), rx = $t(lx), sx = b({}, ui, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ox = $t(sx), ux = b({}, Cs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), cx = $t(ux), fx = b({}, ui, {
    newState: 0,
    oldState: 0
  }), dx = $t(fx), hx = [9, 13, 27, 32], Gu = ea && "CompositionEvent" in window, $l = null;
  ea && "documentMode" in document && ($l = document.documentMode);
  var mx = ea && "TextEvent" in window && !$l, am = ea && (!Gu || $l && 8 < $l && 11 >= $l), im = " ", lm = !1;
  function rm(e, t) {
    switch (e) {
      case "keyup":
        return hx.indexOf(t.keyCode) !== -1;
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
  function sm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ki = !1;
  function px(e, t) {
    switch (e) {
      case "compositionend":
        return sm(t);
      case "keypress":
        return t.which !== 32 ? null : (lm = !0, im);
      case "textInput":
        return e = t.data, e === im && lm ? null : e;
      default:
        return null;
    }
  }
  function yx(e, t) {
    if (Ki)
      return e === "compositionend" || !Gu && rm(e, t) ? (e = Jh(), Es = Hu = wa = null, Ki = !1, e) : null;
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
        return am && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var gx = {
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
  function om(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gx[e.type] : t === "textarea";
  }
  function um(e, t, i, r) {
    $i ? Xi ? Xi.push(r) : Xi = [r] : $i = r, t = yo(t, "onChange"), 0 < t.length && (i = new ws(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: t }));
  }
  var Xl = null, Kl = null;
  function vx(e) {
    Fy(e, 0);
  }
  function Ms(e) {
    var t = Le(e);
    if (bs(t)) return e;
  }
  function cm(e, t) {
    if (e === "change") return t;
  }
  var fm = !1;
  if (ea) {
    var Fu;
    if (ea) {
      var $u = "oninput" in document;
      if (!$u) {
        var dm = document.createElement("div");
        dm.setAttribute("oninput", "return;"), $u = typeof dm.oninput == "function";
      }
      Fu = $u;
    } else Fu = !1;
    fm = Fu && (!document.documentMode || 9 < document.documentMode);
  }
  function hm() {
    Xl && (Xl.detachEvent("onpropertychange", mm), Kl = Xl = null);
  }
  function mm(e) {
    if (e.propertyName === "value" && Ms(Kl)) {
      var t = [];
      um(
        t,
        Kl,
        e,
        Uu(e)
      ), Zh(vx, t);
    }
  }
  function bx(e, t, i) {
    e === "focusin" ? (hm(), Xl = t, Kl = i, Xl.attachEvent("onpropertychange", mm)) : e === "focusout" && hm();
  }
  function Sx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ms(Kl);
  }
  function xx(e, t) {
    if (e === "click") return Ms(t);
  }
  function Ex(e, t) {
    if (e === "input" || e === "change")
      return Ms(t);
  }
  function Tx(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var en = typeof Object.is == "function" ? Object.is : Tx;
  function Ql(e, t) {
    if (en(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(t);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var u = i[r];
      if (!Bl.call(t, u) || !en(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function pm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ym(e, t) {
    var i = pm(e);
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
      i = pm(i);
    }
  }
  function gm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? gm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function vm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ss(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof t.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = t.contentWindow;
      else break;
      t = Ss(e.document);
    }
    return t;
  }
  function Xu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Rx = ea && "documentMode" in document && 11 >= document.documentMode, Qi = null, Ku = null, Il = null, Qu = !1;
  function bm(e, t, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Qu || Qi == null || Qi !== Ss(r) || (r = Qi, "selectionStart" in r && Xu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Il && Ql(Il, r) || (Il = r, r = yo(Ku, "onSelect"), 0 < r.length && (t = new ws(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: r }), t.target = Qi)));
  }
  function ci(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var Ii = {
    animationend: ci("Animation", "AnimationEnd"),
    animationiteration: ci("Animation", "AnimationIteration"),
    animationstart: ci("Animation", "AnimationStart"),
    transitionrun: ci("Transition", "TransitionRun"),
    transitionstart: ci("Transition", "TransitionStart"),
    transitioncancel: ci("Transition", "TransitionCancel"),
    transitionend: ci("Transition", "TransitionEnd")
  }, Iu = {}, Sm = {};
  ea && (Sm = document.createElement("div").style, "AnimationEvent" in window || (delete Ii.animationend.animation, delete Ii.animationiteration.animation, delete Ii.animationstart.animation), "TransitionEvent" in window || delete Ii.transitionend.transition);
  function fi(e) {
    if (Iu[e]) return Iu[e];
    if (!Ii[e]) return e;
    var t = Ii[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Sm)
        return Iu[e] = t[i];
    return e;
  }
  var xm = fi("animationend"), Em = fi("animationiteration"), Tm = fi("animationstart"), wx = fi("transitionrun"), Cx = fi("transitionstart"), Mx = fi("transitioncancel"), Rm = fi("transitionend"), wm = /* @__PURE__ */ new Map(), Zu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Zu.push("scrollEnd");
  function An(e, t) {
    wm.set(e, t), At(t, [e]);
  }
  var As = typeof reportError == "function" ? reportError : function(e) {
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
  }, fn = [], Zi = 0, Ju = 0;
  function js() {
    for (var e = Zi, t = Ju = Zi = 0; t < e; ) {
      var i = fn[t];
      fn[t++] = null;
      var r = fn[t];
      fn[t++] = null;
      var u = fn[t];
      fn[t++] = null;
      var f = fn[t];
      if (fn[t++] = null, r !== null && u !== null) {
        var g = r.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), r.pending = u;
      }
      f !== 0 && Cm(i, u, f);
    }
  }
  function Ds(e, t, i, r) {
    fn[Zi++] = e, fn[Zi++] = t, fn[Zi++] = i, fn[Zi++] = r, Ju |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Wu(e, t, i, r) {
    return Ds(e, t, i, r), Ns(e);
  }
  function di(e, t) {
    return Ds(e, null, null, t), Ns(e);
  }
  function Cm(e, t, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, r = f.alternate, r !== null && (r.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - Ut(i), e = f.hiddenUpdates, r = e[u], r === null ? e[u] = [t] : r.push(t), t.lane = i | 536870912), f) : null;
  }
  function Ns(e) {
    if (50 < vr)
      throw vr = 0, uf = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ji = {};
  function Ax(e, t, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function tn(e, t, i, r) {
    return new Ax(e, t, i, r);
  }
  function ec(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ta(e, t) {
    var i = e.alternate;
    return i === null ? (i = tn(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Mm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function zs(e, t, i, r, u, f) {
    var g = 0;
    if (r = e, typeof e == "function") ec(e) && (g = 1);
    else if (typeof e == "string")
      g = OE(
        e,
        i,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Z:
          return e = tn(31, i, t, u), e.elementType = Z, e.lanes = f, e;
        case w:
          return hi(i.children, u, f, t);
        case D:
          g = 8, u |= 24;
          break;
        case z:
          return e = tn(12, i, t, u | 2), e.elementType = z, e.lanes = f, e;
        case $:
          return e = tn(13, i, t, u), e.elementType = $, e.lanes = f, e;
        case Q:
          return e = tn(19, i, t, u), e.elementType = Q, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case U:
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
              case j:
                g = 16, r = null;
                break e;
            }
          g = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return t = tn(g, i, t, u), t.elementType = e, t.type = r, t.lanes = f, t;
  }
  function hi(e, t, i, r) {
    return e = tn(7, e, r, t), e.lanes = i, e;
  }
  function tc(e, t, i) {
    return e = tn(6, e, null, t), e.lanes = i, e;
  }
  function Am(e) {
    var t = tn(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function nc(e, t, i) {
    return t = tn(
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
  var jm = /* @__PURE__ */ new WeakMap();
  function dn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = jm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: ds(t)
      }, jm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ds(t)
    };
  }
  var Wi = [], el = 0, Os = null, Zl = 0, hn = [], mn = 0, Ca = null, Bn = 1, Hn = "";
  function na(e, t) {
    Wi[el++] = Zl, Wi[el++] = Os, Os = e, Zl = t;
  }
  function Dm(e, t, i) {
    hn[mn++] = Bn, hn[mn++] = Hn, hn[mn++] = Ca, Ca = e;
    var r = Bn;
    e = Hn;
    var u = 32 - Ut(r) - 1;
    r &= ~(1 << u), i += 1;
    var f = 32 - Ut(t) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (r & (1 << g) - 1).toString(32), r >>= g, u -= g, Bn = 1 << 32 - Ut(t) + u | i << u | r, Hn = f + e;
    } else
      Bn = 1 << f | i << u | r, Hn = e;
  }
  function ac(e) {
    e.return !== null && (na(e, 1), Dm(e, 1, 0));
  }
  function ic(e) {
    for (; e === Os; )
      Os = Wi[--el], Wi[el] = null, Zl = Wi[--el], Wi[el] = null;
    for (; e === Ca; )
      Ca = hn[--mn], hn[mn] = null, Hn = hn[--mn], hn[mn] = null, Bn = hn[--mn], hn[mn] = null;
  }
  function Nm(e, t) {
    hn[mn++] = Bn, hn[mn++] = Hn, hn[mn++] = Ca, Bn = t.id, Hn = t.overflow, Ca = e;
  }
  var Dt = null, it = null, qe = !1, Ma = null, pn = !1, lc = Error(s(519));
  function Aa(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Jl(dn(t, e)), lc;
  }
  function zm(e) {
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
        for (i = 0; i < Sr.length; i++)
          Ve(Sr[i], t);
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
        Ve("invalid", t), Fh(
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
        Ve("invalid", t), Xh(t, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || r.suppressHydrationWarning === !0 || Qy(t.textContent, i) ? (r.popover != null && (Ve("beforetoggle", t), Ve("toggle", t)), r.onScroll != null && Ve("scroll", t), r.onScrollEnd != null && Ve("scrollend", t), r.onClick != null && (t.onclick = Wn), t = !0) : t = !1, t || Aa(e, !0);
  }
  function Om(e) {
    for (Dt = e.return; Dt; )
      switch (Dt.tag) {
        case 5:
        case 31:
        case 13:
          pn = !1;
          return;
        case 27:
        case 3:
          pn = !0;
          return;
        default:
          Dt = Dt.return;
      }
  }
  function tl(e) {
    if (e !== Dt) return !1;
    if (!qe) return Om(e), qe = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Rf(e.type, e.memoizedProps)), i = !i), i && it && Aa(e), Om(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = ig(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      it = ig(e);
    } else
      t === 27 ? (t = it, Pa(e.type) ? (e = jf, jf = null, it = e) : it = t) : it = Dt ? gn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function mi() {
    it = Dt = null, qe = !1;
  }
  function rc() {
    var e = Ma;
    return e !== null && (It === null ? It = e : It.push.apply(
      It,
      e
    ), Ma = null), e;
  }
  function Jl(e) {
    Ma === null ? Ma = [e] : Ma.push(e);
  }
  var sc = A(null), pi = null, aa = null;
  function ja(e, t, i) {
    le(sc, t._currentValue), t._currentValue = i;
  }
  function ia(e) {
    e._currentValue = sc.current, F(sc);
  }
  function oc(e, t, i) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function uc(e, t, i, r) {
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
              f.lanes |= i, E = f.alternate, E !== null && (E.lanes |= i), oc(
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
        g.lanes |= i, f = g.alternate, f !== null && (f.lanes |= i), oc(g, i, e), g = null;
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
  function nl(e, t, i, r) {
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
          en(u.pendingProps.value, g.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === je.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(wr) : e = [wr]);
      }
      u = u.return;
    }
    e !== null && uc(
      t,
      e,
      i,
      r
    ), t.flags |= 262144;
  }
  function _s(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!en(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function yi(e) {
    pi = e, aa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Nt(e) {
    return _m(pi, e);
  }
  function Ls(e, t) {
    return pi === null && yi(e), _m(e, t);
  }
  function _m(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, aa === null) {
      if (e === null) throw Error(s(308));
      aa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else aa = aa.next = t;
    return i;
  }
  var jx = typeof AbortController < "u" ? AbortController : function() {
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
  }, Dx = n.unstable_scheduleCallback, Nx = n.unstable_NormalPriority, St = {
    $$typeof: U,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function cc() {
    return {
      controller: new jx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wl(e) {
    e.refCount--, e.refCount === 0 && Dx(Nx, function() {
      e.controller.abort();
    });
  }
  var er = null, fc = 0, al = 0, il = null;
  function zx(e, t) {
    if (er === null) {
      var i = er = [];
      fc = 0, al = pf(), il = {
        status: "pending",
        value: void 0,
        then: function(r) {
          i.push(r);
        }
      };
    }
    return fc++, t.then(Lm, Lm), t;
  }
  function Lm() {
    if (--fc === 0 && er !== null) {
      il !== null && (il.status = "fulfilled");
      var e = er;
      er = null, al = 0, il = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ox(e, t) {
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
  var Um = O.S;
  O.S = function(e, t) {
    by = qt(), typeof t == "object" && t !== null && typeof t.then == "function" && zx(e, t), Um !== null && Um(e, t);
  };
  var gi = A(null);
  function dc() {
    var e = gi.current;
    return e !== null ? e : et.pooledCache;
  }
  function Us(e, t) {
    t === null ? le(gi, gi.current) : le(gi, t.pool);
  }
  function Vm() {
    var e = dc();
    return e === null ? null : { parent: St._currentValue, pool: e };
  }
  var ll = Error(s(460)), hc = Error(s(474)), Vs = Error(s(542)), Bs = { then: function() {
  } };
  function Bm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Hm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Wn, Wn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, km(e), e;
      default:
        if (typeof t.status == "string") t.then(Wn, Wn);
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
            throw e = t.reason, km(e), e;
        }
        throw bi = t, ll;
    }
  }
  function vi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (bi = i, ll) : i;
    }
  }
  var bi = null;
  function qm() {
    if (bi === null) throw Error(s(459));
    var e = bi;
    return bi = null, e;
  }
  function km(e) {
    if (e === ll || e === Vs)
      throw Error(s(483));
  }
  var rl = null, tr = 0;
  function Hs(e) {
    var t = tr;
    return tr += 1, rl === null && (rl = []), Hm(rl, e, t);
  }
  function nr(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function qs(e, t) {
    throw t.$$typeof === S ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Pm(e) {
    function t(L, N) {
      if (e) {
        var H = L.deletions;
        H === null ? (L.deletions = [N], L.flags |= 16) : H.push(N);
      }
    }
    function i(L, N) {
      if (!e) return null;
      for (; N !== null; )
        t(L, N), N = N.sibling;
      return null;
    }
    function r(L) {
      for (var N = /* @__PURE__ */ new Map(); L !== null; )
        L.key !== null ? N.set(L.key, L) : N.set(L.index, L), L = L.sibling;
      return N;
    }
    function u(L, N) {
      return L = ta(L, N), L.index = 0, L.sibling = null, L;
    }
    function f(L, N, H) {
      return L.index = H, e ? (H = L.alternate, H !== null ? (H = H.index, H < N ? (L.flags |= 67108866, N) : H) : (L.flags |= 67108866, N)) : (L.flags |= 1048576, N);
    }
    function g(L) {
      return e && L.alternate === null && (L.flags |= 67108866), L;
    }
    function E(L, N, H, I) {
      return N === null || N.tag !== 6 ? (N = tc(H, L.mode, I), N.return = L, N) : (N = u(N, H), N.return = L, N);
    }
    function C(L, N, H, I) {
      var xe = H.type;
      return xe === w ? X(
        L,
        N,
        H.props.children,
        I,
        H.key
      ) : N !== null && (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && vi(xe) === N.type) ? (N = u(N, H.props), nr(N, H), N.return = L, N) : (N = zs(
        H.type,
        H.key,
        H.props,
        null,
        L.mode,
        I
      ), nr(N, H), N.return = L, N);
    }
    function q(L, N, H, I) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== H.containerInfo || N.stateNode.implementation !== H.implementation ? (N = nc(H, L.mode, I), N.return = L, N) : (N = u(N, H.children || []), N.return = L, N);
    }
    function X(L, N, H, I, xe) {
      return N === null || N.tag !== 7 ? (N = hi(
        H,
        L.mode,
        I,
        xe
      ), N.return = L, N) : (N = u(N, H), N.return = L, N);
    }
    function J(L, N, H) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = tc(
          "" + N,
          L.mode,
          H
        ), N.return = L, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case T:
            return H = zs(
              N.type,
              N.key,
              N.props,
              null,
              L.mode,
              H
            ), nr(H, N), H.return = L, H;
          case R:
            return N = nc(
              N,
              L.mode,
              H
            ), N.return = L, N;
          case j:
            return N = vi(N), J(L, N, H);
        }
        if (te(N) || K(N))
          return N = hi(
            N,
            L.mode,
            H,
            null
          ), N.return = L, N;
        if (typeof N.then == "function")
          return J(L, Hs(N), H);
        if (N.$$typeof === U)
          return J(
            L,
            Ls(L, N),
            H
          );
        qs(L, N);
      }
      return null;
    }
    function P(L, N, H, I) {
      var xe = N !== null ? N.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return xe !== null ? null : E(L, N, "" + H, I);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            return H.key === xe ? C(L, N, H, I) : null;
          case R:
            return H.key === xe ? q(L, N, H, I) : null;
          case j:
            return H = vi(H), P(L, N, H, I);
        }
        if (te(H) || K(H))
          return xe !== null ? null : X(L, N, H, I, null);
        if (typeof H.then == "function")
          return P(
            L,
            N,
            Hs(H),
            I
          );
        if (H.$$typeof === U)
          return P(
            L,
            N,
            Ls(L, H),
            I
          );
        qs(L, H);
      }
      return null;
    }
    function G(L, N, H, I, xe) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return L = L.get(H) || null, E(N, L, "" + I, xe);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case T:
            return L = L.get(
              I.key === null ? H : I.key
            ) || null, C(N, L, I, xe);
          case R:
            return L = L.get(
              I.key === null ? H : I.key
            ) || null, q(N, L, I, xe);
          case j:
            return I = vi(I), G(
              L,
              N,
              H,
              I,
              xe
            );
        }
        if (te(I) || K(I))
          return L = L.get(H) || null, X(N, L, I, xe, null);
        if (typeof I.then == "function")
          return G(
            L,
            N,
            H,
            Hs(I),
            xe
          );
        if (I.$$typeof === U)
          return G(
            L,
            N,
            H,
            Ls(N, I),
            xe
          );
        qs(N, I);
      }
      return null;
    }
    function me(L, N, H, I) {
      for (var xe = null, Pe = null, ve = N, Ne = N = 0, He = null; ve !== null && Ne < H.length; Ne++) {
        ve.index > Ne ? (He = ve, ve = null) : He = ve.sibling;
        var Ye = P(
          L,
          ve,
          H[Ne],
          I
        );
        if (Ye === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Ye.alternate === null && t(L, ve), N = f(Ye, N, Ne), Pe === null ? xe = Ye : Pe.sibling = Ye, Pe = Ye, ve = He;
      }
      if (Ne === H.length)
        return i(L, ve), qe && na(L, Ne), xe;
      if (ve === null) {
        for (; Ne < H.length; Ne++)
          ve = J(L, H[Ne], I), ve !== null && (N = f(
            ve,
            N,
            Ne
          ), Pe === null ? xe = ve : Pe.sibling = ve, Pe = ve);
        return qe && na(L, Ne), xe;
      }
      for (ve = r(ve); Ne < H.length; Ne++)
        He = G(
          ve,
          L,
          Ne,
          H[Ne],
          I
        ), He !== null && (e && He.alternate !== null && ve.delete(
          He.key === null ? Ne : He.key
        ), N = f(
          He,
          N,
          Ne
        ), Pe === null ? xe = He : Pe.sibling = He, Pe = He);
      return e && ve.forEach(function(Xa) {
        return t(L, Xa);
      }), qe && na(L, Ne), xe;
    }
    function Ce(L, N, H, I) {
      if (H == null) throw Error(s(151));
      for (var xe = null, Pe = null, ve = N, Ne = N = 0, He = null, Ye = H.next(); ve !== null && !Ye.done; Ne++, Ye = H.next()) {
        ve.index > Ne ? (He = ve, ve = null) : He = ve.sibling;
        var Xa = P(L, ve, Ye.value, I);
        if (Xa === null) {
          ve === null && (ve = He);
          break;
        }
        e && ve && Xa.alternate === null && t(L, ve), N = f(Xa, N, Ne), Pe === null ? xe = Xa : Pe.sibling = Xa, Pe = Xa, ve = He;
      }
      if (Ye.done)
        return i(L, ve), qe && na(L, Ne), xe;
      if (ve === null) {
        for (; !Ye.done; Ne++, Ye = H.next())
          Ye = J(L, Ye.value, I), Ye !== null && (N = f(Ye, N, Ne), Pe === null ? xe = Ye : Pe.sibling = Ye, Pe = Ye);
        return qe && na(L, Ne), xe;
      }
      for (ve = r(ve); !Ye.done; Ne++, Ye = H.next())
        Ye = G(ve, L, Ne, Ye.value, I), Ye !== null && (e && Ye.alternate !== null && ve.delete(Ye.key === null ? Ne : Ye.key), N = f(Ye, N, Ne), Pe === null ? xe = Ye : Pe.sibling = Ye, Pe = Ye);
      return e && ve.forEach(function(GE) {
        return t(L, GE);
      }), qe && na(L, Ne), xe;
    }
    function Je(L, N, H, I) {
      if (typeof H == "object" && H !== null && H.type === w && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            e: {
              for (var xe = H.key; N !== null; ) {
                if (N.key === xe) {
                  if (xe = H.type, xe === w) {
                    if (N.tag === 7) {
                      i(
                        L,
                        N.sibling
                      ), I = u(
                        N,
                        H.props.children
                      ), I.return = L, L = I;
                      break e;
                    }
                  } else if (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && vi(xe) === N.type) {
                    i(
                      L,
                      N.sibling
                    ), I = u(N, H.props), nr(I, H), I.return = L, L = I;
                    break e;
                  }
                  i(L, N);
                  break;
                } else t(L, N);
                N = N.sibling;
              }
              H.type === w ? (I = hi(
                H.props.children,
                L.mode,
                I,
                H.key
              ), I.return = L, L = I) : (I = zs(
                H.type,
                H.key,
                H.props,
                null,
                L.mode,
                I
              ), nr(I, H), I.return = L, L = I);
            }
            return g(L);
          case R:
            e: {
              for (xe = H.key; N !== null; ) {
                if (N.key === xe)
                  if (N.tag === 4 && N.stateNode.containerInfo === H.containerInfo && N.stateNode.implementation === H.implementation) {
                    i(
                      L,
                      N.sibling
                    ), I = u(N, H.children || []), I.return = L, L = I;
                    break e;
                  } else {
                    i(L, N);
                    break;
                  }
                else t(L, N);
                N = N.sibling;
              }
              I = nc(H, L.mode, I), I.return = L, L = I;
            }
            return g(L);
          case j:
            return H = vi(H), Je(
              L,
              N,
              H,
              I
            );
        }
        if (te(H))
          return me(
            L,
            N,
            H,
            I
          );
        if (K(H)) {
          if (xe = K(H), typeof xe != "function") throw Error(s(150));
          return H = xe.call(H), Ce(
            L,
            N,
            H,
            I
          );
        }
        if (typeof H.then == "function")
          return Je(
            L,
            N,
            Hs(H),
            I
          );
        if (H.$$typeof === U)
          return Je(
            L,
            N,
            Ls(L, H),
            I
          );
        qs(L, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, N !== null && N.tag === 6 ? (i(L, N.sibling), I = u(N, H), I.return = L, L = I) : (i(L, N), I = tc(H, L.mode, I), I.return = L, L = I), g(L)) : i(L, N);
    }
    return function(L, N, H, I) {
      try {
        tr = 0;
        var xe = Je(
          L,
          N,
          H,
          I
        );
        return rl = null, xe;
      } catch (ve) {
        if (ve === ll || ve === Vs) throw ve;
        var Pe = tn(29, ve, null, L.mode);
        return Pe.lanes = I, Pe.return = L, Pe;
      } finally {
      }
    };
  }
  var Si = Pm(!0), Ym = Pm(!1), Da = !1;
  function mc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function pc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Na(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function za(e, t, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Ge & 2) !== 0) {
      var u = r.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), r.pending = t, t = Ns(e), Cm(e, null, i), t;
    }
    return Ds(e, r, t, i), Ns(e);
  }
  function ar(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, vs(e, i);
    }
  }
  function yc(e, t) {
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
  var gc = !1;
  function ir() {
    if (gc) {
      var e = il;
      if (e !== null) throw e;
    }
  }
  function lr(e, t, i, r) {
    gc = !1;
    var u = e.updateQueue;
    Da = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var C = E, q = C.next;
      C.next = null, g === null ? f = q : g.next = q, g = C;
      var X = e.alternate;
      X !== null && (X = X.updateQueue, E = X.lastBaseUpdate, E !== g && (E === null ? X.firstBaseUpdate = q : E.next = q, X.lastBaseUpdate = C));
    }
    if (f !== null) {
      var J = u.baseState;
      g = 0, X = q = C = null, E = f;
      do {
        var P = E.lane & -536870913, G = P !== E.lane;
        if (G ? (Be & P) === P : (r & P) === P) {
          P !== 0 && P === al && (gc = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Ce = E;
            P = t;
            var Je = i;
            switch (Ce.tag) {
              case 1:
                if (me = Ce.payload, typeof me == "function") {
                  J = me.call(Je, J, P);
                  break e;
                }
                J = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Ce.payload, P = typeof me == "function" ? me.call(Je, J, P) : me, P == null) break e;
                J = b({}, J, P);
                break e;
              case 2:
                Da = !0;
            }
          }
          P = E.callback, P !== null && (e.flags |= 64, G && (e.flags |= 8192), G = u.callbacks, G === null ? u.callbacks = [P] : G.push(P));
        } else
          G = {
            lane: P,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, X === null ? (q = X = G, C = J) : X = X.next = G, g |= P;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          G = E, E = G.next, G.next = null, u.lastBaseUpdate = G, u.shared.pending = null;
        }
      } while (!0);
      X === null && (C = J), u.baseState = C, u.firstBaseUpdate = q, u.lastBaseUpdate = X, f === null && (u.shared.lanes = 0), Va |= g, e.lanes = g, e.memoizedState = J;
    }
  }
  function Gm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Fm(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Gm(i[e], t);
  }
  var sl = A(null), ks = A(0);
  function $m(e, t) {
    e = ha, le(ks, e), le(sl, t), ha = e | t.baseLanes;
  }
  function vc() {
    le(ks, ha), le(sl, sl.current);
  }
  function bc() {
    ha = ks.current, F(sl), F(ks);
  }
  var nn = A(null), yn = null;
  function Oa(e) {
    var t = e.alternate;
    le(pt, pt.current & 1), le(nn, e), yn === null && (t === null || sl.current !== null || t.memoizedState !== null) && (yn = e);
  }
  function Sc(e) {
    le(pt, pt.current), le(nn, e), yn === null && (yn = e);
  }
  function Xm(e) {
    e.tag === 22 ? (le(pt, pt.current), le(nn, e), yn === null && (yn = e)) : _a();
  }
  function _a() {
    le(pt, pt.current), le(nn, nn.current);
  }
  function an(e) {
    F(nn), yn === e && (yn = null), F(pt);
  }
  var pt = A(0);
  function Ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Mf(i) || Af(i)))
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
  var la = 0, De = null, Ie = null, xt = null, Ys = !1, ol = !1, xi = !1, Gs = 0, rr = 0, ul = null, _x = 0;
  function dt() {
    throw Error(s(321));
  }
  function xc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!en(e[i], t[i])) return !1;
    return !0;
  }
  function Ec(e, t, i, r, u, f) {
    return la = f, De = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Dp : Vc, xi = !1, f = i(r, u), xi = !1, ol && (f = Qm(
      t,
      i,
      r,
      u
    )), Km(e), f;
  }
  function Km(e) {
    O.H = ur;
    var t = Ie !== null && Ie.next !== null;
    if (la = 0, xt = Ie = De = null, Ys = !1, rr = 0, ul = null, t) throw Error(s(300));
    e === null || Et || (e = e.dependencies, e !== null && _s(e) && (Et = !0));
  }
  function Qm(e, t, i, r) {
    De = e;
    var u = 0;
    do {
      if (ol && (ul = null), rr = 0, ol = !1, 25 <= u) throw Error(s(301));
      if (u += 1, xt = Ie = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = Np, f = t(i, r);
    } while (ol);
    return f;
  }
  function Lx() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? sr(t) : t, e = e.useState()[0], (Ie !== null ? Ie.memoizedState : null) !== e && (De.flags |= 1024), t;
  }
  function Tc() {
    var e = Gs !== 0;
    return Gs = 0, e;
  }
  function Rc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function wc(e) {
    if (Ys) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ys = !1;
    }
    la = 0, xt = Ie = De = null, ol = !1, rr = Gs = 0, ul = null;
  }
  function Pt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return xt === null ? De.memoizedState = xt = e : xt = xt.next = e, xt;
  }
  function yt() {
    if (Ie === null) {
      var e = De.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = xt === null ? De.memoizedState : xt.next;
    if (t !== null)
      xt = t, Ie = e;
    else {
      if (e === null)
        throw De.alternate === null ? Error(s(467)) : Error(s(310));
      Ie = e, e = {
        memoizedState: Ie.memoizedState,
        baseState: Ie.baseState,
        baseQueue: Ie.baseQueue,
        queue: Ie.queue,
        next: null
      }, xt === null ? De.memoizedState = xt = e : xt = xt.next = e;
    }
    return xt;
  }
  function Fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function sr(e) {
    var t = rr;
    return rr += 1, ul === null && (ul = []), e = Hm(ul, e, t), t = De, (xt === null ? t.memoizedState : xt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Dp : Vc), e;
  }
  function $s(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return sr(e);
      if (e.$$typeof === U) return Nt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Cc(e) {
    var t = null, i = De.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var r = De.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Fs(), De.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), r = 0; r < e; r++)
        i[r] = W;
    return t.index++, i;
  }
  function ra(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xs(e) {
    var t = yt();
    return Mc(t, Ie, e);
  }
  function Mc(e, t, i) {
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
      var E = g = null, C = null, q = t, X = !1;
      do {
        var J = q.lane & -536870913;
        if (J !== q.lane ? (Be & J) === J : (la & J) === J) {
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
            }), J === al && (X = !0);
          else if ((la & P) === P) {
            q = q.next, P === al && (X = !0);
            continue;
          } else
            J = {
              lane: 0,
              revertLane: q.revertLane,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, C === null ? (E = C = J, g = f) : C = C.next = J, De.lanes |= P, Va |= P;
          J = q.action, xi && i(f, J), f = q.hasEagerState ? q.eagerState : i(f, J);
        } else
          P = {
            lane: J,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, C === null ? (E = C = P, g = f) : C = C.next = P, De.lanes |= J, Va |= J;
        q = q.next;
      } while (q !== null && q !== t);
      if (C === null ? g = f : C.next = E, !en(f, e.memoizedState) && (Et = !0, X && (i = il, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = g, e.baseQueue = C, r.lastRenderedState = f;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Ac(e) {
    var t = yt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, u = i.pending, f = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      en(f, t.memoizedState) || (Et = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), i.lastRenderedState = f;
    }
    return [f, r];
  }
  function Im(e, t, i) {
    var r = De, u = yt(), f = qe;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var g = !en(
      (Ie || u).memoizedState,
      i
    );
    if (g && (u.memoizedState = i, Et = !0), u = u.queue, Nc(Wm.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== t || g || xt !== null && xt.memoizedState.tag & 1) {
      if (r.flags |= 2048, cl(
        9,
        { destroy: void 0 },
        Jm.bind(
          null,
          r,
          u,
          i,
          t
        ),
        null
      ), et === null) throw Error(s(349));
      f || (la & 127) !== 0 || Zm(r, t, i);
    }
    return i;
  }
  function Zm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = De.updateQueue, t === null ? (t = Fs(), De.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Jm(e, t, i, r) {
    t.value = i, t.getSnapshot = r, ep(t) && tp(e);
  }
  function Wm(e, t, i) {
    return i(function() {
      ep(t) && tp(e);
    });
  }
  function ep(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !en(e, i);
    } catch {
      return !0;
    }
  }
  function tp(e) {
    var t = di(e, 2);
    t !== null && Zt(t, e, 2);
  }
  function jc(e) {
    var t = Pt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), xi) {
        Mt(!0);
        try {
          i();
        } finally {
          Mt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ra,
      lastRenderedState: e
    }, t;
  }
  function np(e, t, i, r) {
    return e.baseState = i, Mc(
      e,
      Ie,
      typeof r == "function" ? r : ra
    );
  }
  function Ux(e, t, i, r, u) {
    if (Is(e)) throw Error(s(485));
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
      O.T !== null ? i(!0) : f.isTransition = !1, r(f), i = t.pending, i === null ? (f.next = t.pending = f, ap(t, f)) : (f.next = i.next, t.pending = i.next = f);
    }
  }
  function ap(e, t) {
    var i = t.action, r = t.payload, u = e.state;
    if (t.isTransition) {
      var f = O.T, g = {};
      O.T = g;
      try {
        var E = i(u, r), C = O.S;
        C !== null && C(g, E), ip(e, t, E);
      } catch (q) {
        Dc(e, t, q);
      } finally {
        f !== null && g.types !== null && (f.types = g.types), O.T = f;
      }
    } else
      try {
        f = i(u, r), ip(e, t, f);
      } catch (q) {
        Dc(e, t, q);
      }
  }
  function ip(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(r) {
        lp(e, t, r);
      },
      function(r) {
        return Dc(e, t, r);
      }
    ) : lp(e, t, i);
  }
  function lp(e, t, i) {
    t.status = "fulfilled", t.value = i, rp(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, ap(e, i)));
  }
  function Dc(e, t, i) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = i, rp(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function rp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function sp(e, t) {
    return t;
  }
  function op(e, t) {
    if (qe) {
      var i = et.formState;
      if (i !== null) {
        e: {
          var r = De;
          if (qe) {
            if (it) {
              t: {
                for (var u = it, f = pn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = gn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                it = gn(
                  u.nextSibling
                ), r = u.data === "F!";
                break e;
              }
            }
            Aa(r);
          }
          r = !1;
        }
        r && (t = i[0]);
      }
    }
    return i = Pt(), i.memoizedState = i.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sp,
      lastRenderedState: t
    }, i.queue = r, i = Mp.bind(
      null,
      De,
      r
    ), r.dispatch = i, r = jc(!1), f = Uc.bind(
      null,
      De,
      !1,
      r.queue
    ), r = Pt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, i = Ux.bind(
      null,
      De,
      u,
      f,
      i
    ), u.dispatch = i, r.memoizedState = e, [t, i, !1];
  }
  function up(e) {
    var t = yt();
    return cp(t, Ie, e);
  }
  function cp(e, t, i) {
    if (t = Mc(
      e,
      t,
      sp
    )[0], e = Xs(ra)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = sr(t);
      } catch (g) {
        throw g === ll ? Vs : g;
      }
    else r = t;
    t = yt();
    var u = t.queue, f = u.dispatch;
    return i !== t.memoizedState && (De.flags |= 2048, cl(
      9,
      { destroy: void 0 },
      Vx.bind(null, u, i),
      null
    )), [r, f, e];
  }
  function Vx(e, t) {
    e.action = t;
  }
  function fp(e) {
    var t = yt(), i = Ie;
    if (i !== null)
      return cp(t, i, e);
    yt(), t = t.memoizedState, i = yt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [t, r, !1];
  }
  function cl(e, t, i, r) {
    return e = { tag: e, create: i, deps: r, inst: t, next: null }, t = De.updateQueue, t === null && (t = Fs(), De.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, t.lastEffect = e), e;
  }
  function dp() {
    return yt().memoizedState;
  }
  function Ks(e, t, i, r) {
    var u = Pt();
    De.flags |= e, u.memoizedState = cl(
      1 | t,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function Qs(e, t, i, r) {
    var u = yt();
    r = r === void 0 ? null : r;
    var f = u.memoizedState.inst;
    Ie !== null && r !== null && xc(r, Ie.memoizedState.deps) ? u.memoizedState = cl(t, f, i, r) : (De.flags |= e, u.memoizedState = cl(
      1 | t,
      f,
      i,
      r
    ));
  }
  function hp(e, t) {
    Ks(8390656, 8, e, t);
  }
  function Nc(e, t) {
    Qs(2048, 8, e, t);
  }
  function Bx(e) {
    De.flags |= 4;
    var t = De.updateQueue;
    if (t === null)
      t = Fs(), De.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function mp(e) {
    var t = yt().memoizedState;
    return Bx({ ref: t, nextImpl: e }), function() {
      if ((Ge & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function pp(e, t) {
    return Qs(4, 2, e, t);
  }
  function yp(e, t) {
    return Qs(4, 4, e, t);
  }
  function gp(e, t) {
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
  function vp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Qs(4, 4, gp.bind(null, t, e), i);
  }
  function zc() {
  }
  function bp(e, t) {
    var i = yt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    return t !== null && xc(t, r[1]) ? r[0] : (i.memoizedState = [e, t], e);
  }
  function Sp(e, t) {
    var i = yt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    if (t !== null && xc(t, r[1]))
      return r[0];
    if (r = e(), xi) {
      Mt(!0);
      try {
        e();
      } finally {
        Mt(!1);
      }
    }
    return i.memoizedState = [r, t], r;
  }
  function Oc(e, t, i) {
    return i === void 0 || (la & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = xy(), De.lanes |= e, Va |= e, i);
  }
  function xp(e, t, i, r) {
    return en(i, t) ? i : sl.current !== null ? (e = Oc(e, i, r), en(e, t) || (Et = !0), e) : (la & 42) === 0 || (la & 1073741824) !== 0 && (Be & 261930) === 0 ? (Et = !0, e.memoizedState = i) : (e = xy(), De.lanes |= e, Va |= e, t);
  }
  function Ep(e, t, i, r, u) {
    var f = ne.p;
    ne.p = f !== 0 && 8 > f ? f : 8;
    var g = O.T, E = {};
    O.T = E, Uc(e, !1, t, i);
    try {
      var C = u(), q = O.S;
      if (q !== null && q(E, C), C !== null && typeof C == "object" && typeof C.then == "function") {
        var X = Ox(
          C,
          r
        );
        or(
          e,
          t,
          X,
          sn(e)
        );
      } else
        or(
          e,
          t,
          r,
          sn(e)
        );
    } catch (J) {
      or(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: J },
        sn()
      );
    } finally {
      ne.p = f, g !== null && E.types !== null && (g.types = E.types), O.T = g;
    }
  }
  function Hx() {
  }
  function _c(e, t, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Tp(e).queue;
    Ep(
      e,
      u,
      t,
      se,
      i === null ? Hx : function() {
        return Rp(e), i(r);
      }
    );
  }
  function Tp(e) {
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
        lastRenderedReducer: ra,
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
        lastRenderedReducer: ra,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Rp(e) {
    var t = Tp(e);
    t.next === null && (t = e.alternate.memoizedState), or(
      e,
      t.next.queue,
      {},
      sn()
    );
  }
  function Lc() {
    return Nt(wr);
  }
  function wp() {
    return yt().memoizedState;
  }
  function Cp() {
    return yt().memoizedState;
  }
  function qx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = sn();
          e = Na(i);
          var r = za(t, e, i);
          r !== null && (Zt(r, t, i), ar(r, t, i)), t = { cache: cc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function kx(e, t, i) {
    var r = sn();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Is(e) ? Ap(t, i) : (i = Wu(e, t, i, r), i !== null && (Zt(i, e, r), jp(i, t, r)));
  }
  function Mp(e, t, i) {
    var r = sn();
    or(e, t, i, r);
  }
  function or(e, t, i, r) {
    var u = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Is(e)) Ap(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var g = t.lastRenderedState, E = f(g, i);
          if (u.hasEagerState = !0, u.eagerState = E, en(E, g))
            return Ds(e, t, u, 0), et === null && js(), !1;
        } catch {
        } finally {
        }
      if (i = Wu(e, t, u, r), i !== null)
        return Zt(i, e, r), jp(i, t, r), !0;
    }
    return !1;
  }
  function Uc(e, t, i, r) {
    if (r = {
      lane: 2,
      revertLane: pf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Is(e)) {
      if (t) throw Error(s(479));
    } else
      t = Wu(
        e,
        i,
        r,
        2
      ), t !== null && Zt(t, e, 2);
  }
  function Is(e) {
    var t = e.alternate;
    return e === De || t !== null && t === De;
  }
  function Ap(e, t) {
    ol = Ys = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function jp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, vs(e, i);
    }
  }
  var ur = {
    readContext: Nt,
    use: $s,
    useCallback: dt,
    useContext: dt,
    useEffect: dt,
    useImperativeHandle: dt,
    useLayoutEffect: dt,
    useInsertionEffect: dt,
    useMemo: dt,
    useReducer: dt,
    useRef: dt,
    useState: dt,
    useDebugValue: dt,
    useDeferredValue: dt,
    useTransition: dt,
    useSyncExternalStore: dt,
    useId: dt,
    useHostTransitionStatus: dt,
    useFormState: dt,
    useActionState: dt,
    useOptimistic: dt,
    useMemoCache: dt,
    useCacheRefresh: dt
  };
  ur.useEffectEvent = dt;
  var Dp = {
    readContext: Nt,
    use: $s,
    useCallback: function(e, t) {
      return Pt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Nt,
    useEffect: hp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Ks(
        4194308,
        4,
        gp.bind(null, t, e),
        i
      );
    },
    useLayoutEffect: function(e, t) {
      return Ks(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ks(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var i = Pt();
      t = t === void 0 ? null : t;
      var r = e();
      if (xi) {
        Mt(!0);
        try {
          e();
        } finally {
          Mt(!1);
        }
      }
      return i.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, i) {
      var r = Pt();
      if (i !== void 0) {
        var u = i(t);
        if (xi) {
          Mt(!0);
          try {
            i(t);
          } finally {
            Mt(!1);
          }
        }
      } else u = t;
      return r.memoizedState = r.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, r.queue = e, e = e.dispatch = kx.bind(
        null,
        De,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = Pt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = jc(e);
      var t = e.queue, i = Mp.bind(null, De, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = Pt();
      return Oc(i, e, t);
    },
    useTransition: function() {
      var e = jc(!1);
      return e = Ep.bind(
        null,
        De,
        e.queue,
        !0,
        !1
      ), Pt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var r = De, u = Pt();
      if (qe) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), et === null)
          throw Error(s(349));
        (Be & 127) !== 0 || Zm(r, t, i);
      }
      u.memoizedState = i;
      var f = { value: i, getSnapshot: t };
      return u.queue = f, hp(Wm.bind(null, r, f, e), [
        e
      ]), r.flags |= 2048, cl(
        9,
        { destroy: void 0 },
        Jm.bind(
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
      var e = Pt(), t = et.identifierPrefix;
      if (qe) {
        var i = Hn, r = Bn;
        i = (r & ~(1 << 32 - Ut(r) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Gs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = _x++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Lc,
    useFormState: op,
    useActionState: op,
    useOptimistic: function(e) {
      var t = Pt();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = Uc.bind(
        null,
        De,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Cc,
    useCacheRefresh: function() {
      return Pt().memoizedState = qx.bind(
        null,
        De
      );
    },
    useEffectEvent: function(e) {
      var t = Pt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((Ge & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Vc = {
    readContext: Nt,
    use: $s,
    useCallback: bp,
    useContext: Nt,
    useEffect: Nc,
    useImperativeHandle: vp,
    useInsertionEffect: pp,
    useLayoutEffect: yp,
    useMemo: Sp,
    useReducer: Xs,
    useRef: dp,
    useState: function() {
      return Xs(ra);
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = yt();
      return xp(
        i,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Xs(ra)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : sr(e),
        t
      ];
    },
    useSyncExternalStore: Im,
    useId: wp,
    useHostTransitionStatus: Lc,
    useFormState: up,
    useActionState: up,
    useOptimistic: function(e, t) {
      var i = yt();
      return np(i, Ie, e, t);
    },
    useMemoCache: Cc,
    useCacheRefresh: Cp
  };
  Vc.useEffectEvent = mp;
  var Np = {
    readContext: Nt,
    use: $s,
    useCallback: bp,
    useContext: Nt,
    useEffect: Nc,
    useImperativeHandle: vp,
    useInsertionEffect: pp,
    useLayoutEffect: yp,
    useMemo: Sp,
    useReducer: Ac,
    useRef: dp,
    useState: function() {
      return Ac(ra);
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = yt();
      return Ie === null ? Oc(i, e, t) : xp(
        i,
        Ie.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ac(ra)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : sr(e),
        t
      ];
    },
    useSyncExternalStore: Im,
    useId: wp,
    useHostTransitionStatus: Lc,
    useFormState: fp,
    useActionState: fp,
    useOptimistic: function(e, t) {
      var i = yt();
      return Ie !== null ? np(i, Ie, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Cc,
    useCacheRefresh: Cp
  };
  Np.useEffectEvent = mp;
  function Bc(e, t, i, r) {
    t = e.memoizedState, i = i(r, t), i = i == null ? t : b({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Hc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var r = sn(), u = Na(r);
      u.payload = t, i != null && (u.callback = i), t = za(e, u, r), t !== null && (Zt(t, e, r), ar(t, e, r));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var r = sn(), u = Na(r);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = za(e, u, r), t !== null && (Zt(t, e, r), ar(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = sn(), r = Na(i);
      r.tag = 2, t != null && (r.callback = t), t = za(e, r, i), t !== null && (Zt(t, e, i), ar(t, e, i));
    }
  };
  function zp(e, t, i, r, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, f, g) : t.prototype && t.prototype.isPureReactComponent ? !Ql(i, r) || !Ql(u, f) : !0;
  }
  function Op(e, t, i, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, r), t.state !== e && Hc.enqueueReplaceState(t, t.state, null);
  }
  function Ei(e, t) {
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
  function _p(e) {
    As(e);
  }
  function Lp(e) {
    console.error(e);
  }
  function Up(e) {
    As(e);
  }
  function Zs(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Vp(e, t, i) {
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
  function qc(e, t, i) {
    return i = Na(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Zs(e, t);
    }, i;
  }
  function Bp(e) {
    return e = Na(e), e.tag = 3, e;
  }
  function Hp(e, t, i, r) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        Vp(t, i, r);
      };
    }
    var g = i.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      Vp(t, i, r), typeof u != "function" && (Ba === null ? Ba = /* @__PURE__ */ new Set([this]) : Ba.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Px(e, t, i, r, u) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = i.alternate, t !== null && nl(
        t,
        i,
        u,
        !0
      ), i = nn.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return yn === null ? uo() : i.alternate === null && ht === 0 && (ht = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === Bs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), df(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === Bs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), df(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return df(e, r, u), uo(), !1;
    }
    if (qe)
      return t = nn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, r !== lc && (e = Error(s(422), { cause: r }), Jl(dn(e, i)))) : (r !== lc && (t = Error(s(423), {
        cause: r
      }), Jl(
        dn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = dn(r, i), u = qc(
        e.stateNode,
        r,
        u
      ), yc(e, u), ht !== 4 && (ht = 2)), !1;
    var f = Error(s(520), { cause: r });
    if (f = dn(f, i), gr === null ? gr = [f] : gr.push(f), ht !== 4 && (ht = 2), t === null) return !0;
    r = dn(r, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = qc(i.stateNode, r, e), yc(i, e), !1;
        case 1:
          if (t = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Ba === null || !Ba.has(f))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Bp(u), Hp(
              u,
              e,
              i,
              r
            ), yc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var kc = Error(s(461)), Et = !1;
  function zt(e, t, i, r) {
    t.child = e === null ? Ym(t, null, i, r) : Si(
      t,
      e.child,
      i,
      r
    );
  }
  function qp(e, t, i, r, u) {
    i = i.render;
    var f = t.ref;
    if ("ref" in r) {
      var g = {};
      for (var E in r)
        E !== "ref" && (g[E] = r[E]);
    } else g = r;
    return yi(t), r = Ec(
      e,
      t,
      i,
      g,
      f,
      u
    ), E = Tc(), e !== null && !Et ? (Rc(e, t, u), sa(e, t, u)) : (qe && E && ac(t), t.flags |= 1, zt(e, t, r, u), t.child);
  }
  function kp(e, t, i, r, u) {
    if (e === null) {
      var f = i.type;
      return typeof f == "function" && !ec(f) && f.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = f, Pp(
        e,
        t,
        f,
        r,
        u
      )) : (e = zs(
        i.type,
        null,
        r,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !Qc(e, u)) {
      var g = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Ql, i(g, r) && e.ref === t.ref)
        return sa(e, t, u);
    }
    return t.flags |= 1, e = ta(f, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Pp(e, t, i, r, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Ql(f, r) && e.ref === t.ref)
        if (Et = !1, t.pendingProps = r = f, Qc(e, u))
          (e.flags & 131072) !== 0 && (Et = !0);
        else
          return t.lanes = e.lanes, sa(e, t, u);
    }
    return Pc(
      e,
      t,
      i,
      r,
      u
    );
  }
  function Yp(e, t, i, r) {
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
        return Gp(
          e,
          t,
          f,
          i,
          r
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Us(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? $m(t, f) : vc(), Xm(t);
      else
        return r = t.lanes = 536870912, Gp(
          e,
          t,
          f !== null ? f.baseLanes | i : i,
          i,
          r
        );
    } else
      f !== null ? (Us(t, f.cachePool), $m(t, f), _a(), t.memoizedState = null) : (e !== null && Us(t, null), vc(), _a());
    return zt(e, t, u, i), t.child;
  }
  function cr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Gp(e, t, i, r, u) {
    var f = dc();
    return f = f === null ? null : { parent: St._currentValue, pool: f }, t.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && Us(t, null), vc(), Xm(t), e !== null && nl(e, t, r, !0), t.childLanes = u, null;
  }
  function Js(e, t) {
    return t = eo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Fp(e, t, i) {
    return Si(t, e.child, null, i), e = Js(t, t.pendingProps), e.flags |= 2, an(t), t.memoizedState = null, e;
  }
  function Yx(e, t, i) {
    var r = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (qe) {
        if (r.mode === "hidden")
          return e = Js(t, r), t.lanes = 536870912, cr(null, e);
        if (Sc(t), (e = it) ? (e = ag(
          e,
          pn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ca !== null ? { id: Bn, overflow: Hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Am(e), i.return = t, t.child = i, Dt = t, it = null)) : e = null, e === null) throw Aa(t);
        return t.lanes = 536870912, null;
      }
      return Js(t, r);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var g = f.dehydrated;
      if (Sc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Fp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Et || nl(e, t, i, !1), u = (i & e.childLanes) !== 0, Et || u) {
        if (r = et, r !== null && (g = M(r, i), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, di(e, g), Zt(r, e, g), kc;
        uo(), t = Fp(
          e,
          t,
          i
        );
      } else
        e = f.treeContext, it = gn(g.nextSibling), Dt = t, qe = !0, Ma = null, pn = !1, e !== null && Nm(t, e), t = Js(t, r), t.flags |= 4096;
      return t;
    }
    return e = ta(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ws(e, t) {
    var i = t.ref;
    if (i === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (e === null || e.ref !== i) && (t.flags |= 4194816);
    }
  }
  function Pc(e, t, i, r, u) {
    return yi(t), i = Ec(
      e,
      t,
      i,
      r,
      void 0,
      u
    ), r = Tc(), e !== null && !Et ? (Rc(e, t, u), sa(e, t, u)) : (qe && r && ac(t), t.flags |= 1, zt(e, t, i, u), t.child);
  }
  function $p(e, t, i, r, u, f) {
    return yi(t), t.updateQueue = null, i = Qm(
      t,
      r,
      i,
      u
    ), Km(e), r = Tc(), e !== null && !Et ? (Rc(e, t, f), sa(e, t, f)) : (qe && r && ac(t), t.flags |= 1, zt(e, t, i, f), t.child);
  }
  function Xp(e, t, i, r, u) {
    if (yi(t), t.stateNode === null) {
      var f = Ji, g = i.contextType;
      typeof g == "object" && g !== null && (f = Nt(g)), f = new i(r, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Hc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = r, f.state = t.memoizedState, f.refs = {}, mc(t), g = i.contextType, f.context = typeof g == "object" && g !== null ? Nt(g) : Ji, f.state = t.memoizedState, g = i.getDerivedStateFromProps, typeof g == "function" && (Bc(
        t,
        i,
        g,
        r
      ), f.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && Hc.enqueueReplaceState(f, f.state, null), lr(t, r, f, u), ir(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      f = t.stateNode;
      var E = t.memoizedProps, C = Ei(i, E);
      f.props = C;
      var q = f.context, X = i.contextType;
      g = Ji, typeof X == "object" && X !== null && (g = Nt(X));
      var J = i.getDerivedStateFromProps;
      X = typeof J == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, X || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || q !== g) && Op(
        t,
        f,
        r,
        g
      ), Da = !1;
      var P = t.memoizedState;
      f.state = P, lr(t, r, f, u), ir(), q = t.memoizedState, E || P !== q || Da ? (typeof J == "function" && (Bc(
        t,
        i,
        J,
        r
      ), q = t.memoizedState), (C = Da || zp(
        t,
        i,
        C,
        r,
        P,
        q,
        g
      )) ? (X || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = q), f.props = r, f.state = q, f.context = g, r = C) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      f = t.stateNode, pc(e, t), g = t.memoizedProps, X = Ei(i, g), f.props = X, J = t.pendingProps, P = f.context, q = i.contextType, C = Ji, typeof q == "object" && q !== null && (C = Nt(q)), E = i.getDerivedStateFromProps, (q = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== J || P !== C) && Op(
        t,
        f,
        r,
        C
      ), Da = !1, P = t.memoizedState, f.state = P, lr(t, r, f, u), ir();
      var G = t.memoizedState;
      g !== J || P !== G || Da || e !== null && e.dependencies !== null && _s(e.dependencies) ? (typeof E == "function" && (Bc(
        t,
        i,
        E,
        r
      ), G = t.memoizedState), (X = Da || zp(
        t,
        i,
        X,
        r,
        P,
        G,
        C
      ) || e !== null && e.dependencies !== null && _s(e.dependencies)) ? (q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, G, C), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        r,
        G,
        C
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = G), f.props = r, f.state = G, f.context = C, r = X) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return f = r, Ws(e, t), r = (t.flags & 128) !== 0, f || r ? (f = t.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && r ? (t.child = Si(
      t,
      e.child,
      null,
      u
    ), t.child = Si(
      t,
      null,
      i,
      u
    )) : zt(e, t, i, u), t.memoizedState = f.state, e = t.child) : e = sa(
      e,
      t,
      u
    ), e;
  }
  function Kp(e, t, i, r) {
    return mi(), t.flags |= 256, zt(e, t, i, r), t.child;
  }
  var Yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gc(e) {
    return { baseLanes: e, cachePool: Vm() };
  }
  function Fc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= rn), e;
  }
  function Qp(e, t, i) {
    var r = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (pt.current & 2) !== 0), g && (u = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (qe) {
        if (u ? Oa(t) : _a(), (e = it) ? (e = ag(
          e,
          pn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ca !== null ? { id: Bn, overflow: Hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Am(e), i.return = t, t.child = i, Dt = t, it = null)) : e = null, e === null) throw Aa(t);
        return Af(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (_a(), u = t.mode, E = eo(
        { mode: "hidden", children: E },
        u
      ), r = hi(
        r,
        u,
        i,
        null
      ), E.return = t, r.return = t, E.sibling = r, t.child = E, r = t.child, r.memoizedState = Gc(i), r.childLanes = Fc(
        e,
        g,
        i
      ), t.memoizedState = Yc, cr(null, r)) : (Oa(t), $c(t, E));
    }
    var C = e.memoizedState;
    if (C !== null && (E = C.dehydrated, E !== null)) {
      if (f)
        t.flags & 256 ? (Oa(t), t.flags &= -257, t = Xc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (_a(), t.child = e.child, t.flags |= 128, t = null) : (_a(), E = r.fallback, u = t.mode, r = eo(
          { mode: "visible", children: r.children },
          u
        ), E = hi(
          E,
          u,
          i,
          null
        ), E.flags |= 2, r.return = t, E.return = t, r.sibling = E, t.child = r, Si(
          t,
          e.child,
          null,
          i
        ), r = t.child, r.memoizedState = Gc(i), r.childLanes = Fc(
          e,
          g,
          i
        ), t.memoizedState = Yc, t = cr(null, r));
      else if (Oa(t), Af(E)) {
        if (g = E.nextSibling && E.nextSibling.dataset, g) var q = g.dgst;
        g = q, r = Error(s(419)), r.stack = "", r.digest = g, Jl({ value: r, source: null, stack: null }), t = Xc(
          e,
          t,
          i
        );
      } else if (Et || nl(e, t, i, !1), g = (i & e.childLanes) !== 0, Et || g) {
        if (g = et, g !== null && (r = M(g, i), r !== 0 && r !== C.retryLane))
          throw C.retryLane = r, di(e, r), Zt(g, e, r), kc;
        Mf(E) || uo(), t = Xc(
          e,
          t,
          i
        );
      } else
        Mf(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = C.treeContext, it = gn(
          E.nextSibling
        ), Dt = t, qe = !0, Ma = null, pn = !1, e !== null && Nm(t, e), t = $c(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (_a(), E = r.fallback, u = t.mode, C = e.child, q = C.sibling, r = ta(C, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = C.subtreeFlags & 65011712, q !== null ? E = ta(
      q,
      E
    ) : (E = hi(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, r.return = t, r.sibling = E, t.child = r, cr(null, r), r = t.child, E = e.child.memoizedState, E === null ? E = Gc(i) : (u = E.cachePool, u !== null ? (C = St._currentValue, u = u.parent !== C ? { parent: C, pool: C } : u) : u = Vm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = Fc(
      e,
      g,
      i
    ), t.memoizedState = Yc, cr(e.child, r)) : (Oa(t), i = e.child, e = i.sibling, i = ta(i, {
      mode: "visible",
      children: r.children
    }), i.return = t, i.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function $c(e, t) {
    return t = eo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function eo(e, t) {
    return e = tn(22, e, null, t), e.lanes = 0, e;
  }
  function Xc(e, t, i) {
    return Si(t, e.child, null, i), e = $c(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ip(e, t, i) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), oc(e.return, t, i);
  }
  function Kc(e, t, i, r, u, f) {
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
  function Zp(e, t, i) {
    var r = t.pendingProps, u = r.revealOrder, f = r.tail;
    r = r.children;
    var g = pt.current, E = (g & 2) !== 0;
    if (E ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, le(pt, g), zt(e, t, r, i), r = qe ? Zl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ip(e, i, t);
        else if (e.tag === 19)
          Ip(e, i, t);
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
          e = i.alternate, e !== null && Ps(e) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Kc(
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
          if (e = u.alternate, e !== null && Ps(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = i, i = u, u = e;
        }
        Kc(
          t,
          !0,
          i,
          null,
          f,
          r
        );
        break;
      case "together":
        Kc(
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
  function sa(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Va |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (nl(
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
      for (e = t.child, i = ta(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = ta(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Qc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && _s(e)));
  }
  function Gx(e, t, i) {
    switch (t.tag) {
      case 3:
        ft(t, t.stateNode.containerInfo), ja(t, St, e.memoizedState.cache), mi();
        break;
      case 27:
      case 5:
        Xn(t);
        break;
      case 4:
        ft(t, t.stateNode.containerInfo);
        break;
      case 10:
        ja(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Sc(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (Oa(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Qp(e, t, i) : (Oa(t), e = sa(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        Oa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (i & t.childLanes) !== 0, r || (nl(
          e,
          t,
          i,
          !1
        ), r = (i & t.childLanes) !== 0), u) {
          if (r)
            return Zp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), le(pt, pt.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, Yp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        ja(t, St, e.memoizedState.cache);
    }
    return sa(e, t, i);
  }
  function Jp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Et = !0;
      else {
        if (!Qc(e, i) && (t.flags & 128) === 0)
          return Et = !1, Gx(
            e,
            t,
            i
          );
        Et = (e.flags & 131072) !== 0;
      }
    else
      Et = !1, qe && (t.flags & 1048576) !== 0 && Dm(t, Zl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = vi(t.elementType), t.type = e, typeof e == "function")
            ec(e) ? (r = Ei(e, r), t.tag = 1, t = Xp(
              null,
              t,
              e,
              r,
              i
            )) : (t.tag = 0, t = Pc(
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
                t.tag = 11, t = qp(
                  null,
                  t,
                  e,
                  r,
                  i
                );
                break e;
              } else if (u === ee) {
                t.tag = 14, t = kp(
                  null,
                  t,
                  e,
                  r,
                  i
                );
                break e;
              }
            }
            throw t = re(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Pc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return r = t.type, u = Ei(
          r,
          t.pendingProps
        ), Xp(
          e,
          t,
          r,
          u,
          i
        );
      case 3:
        e: {
          if (ft(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          r = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, pc(e, t), lr(t, r, null, i);
          var g = t.memoizedState;
          if (r = g.cache, ja(t, St, r), r !== f.cache && uc(
            t,
            [St],
            i,
            !0
          ), ir(), r = g.element, f.isDehydrated)
            if (f = {
              element: r,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = Kp(
                e,
                t,
                r,
                i
              );
              break e;
            } else if (r !== u) {
              u = dn(
                Error(s(424)),
                t
              ), Jl(u), t = Kp(
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
              for (it = gn(e.firstChild), Dt = t, qe = !0, Ma = null, pn = !0, i = Ym(
                t,
                null,
                r,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (mi(), r === u) {
              t = sa(
                e,
                t,
                i
              );
              break e;
            }
            zt(e, t, r, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ws(e, t), e === null ? (i = ug(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : qe || (i = t.type, e = t.pendingProps, r = go(
          Me.current
        ).createElement(i), r[fe] = t, r[de] = e, Ot(r, i, e), nt(r), t.stateNode = r) : t.memoizedState = ug(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Xn(t), e === null && qe && (r = t.stateNode = rg(
          t.type,
          t.pendingProps,
          Me.current
        ), Dt = t, pn = !0, u = it, Pa(t.type) ? (jf = u, it = gn(r.firstChild)) : it = u), zt(
          e,
          t,
          t.pendingProps.children,
          i
        ), Ws(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && qe && ((u = r = it) && (r = SE(
          r,
          t.type,
          t.pendingProps,
          pn
        ), r !== null ? (t.stateNode = r, Dt = t, it = gn(r.firstChild), pn = !1, u = !0) : u = !1), u || Aa(t)), Xn(t), u = t.type, f = t.pendingProps, g = e !== null ? e.memoizedProps : null, r = f.children, Rf(u, f) ? r = null : g !== null && Rf(u, g) && (t.flags |= 32), t.memoizedState !== null && (u = Ec(
          e,
          t,
          Lx,
          null,
          null,
          i
        ), wr._currentValue = u), Ws(e, t), zt(e, t, r, i), t.child;
      case 6:
        return e === null && qe && ((e = i = it) && (i = xE(
          i,
          t.pendingProps,
          pn
        ), i !== null ? (t.stateNode = i, Dt = t, it = null, e = !0) : e = !1), e || Aa(t)), null;
      case 13:
        return Qp(e, t, i);
      case 4:
        return ft(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = Si(
          t,
          null,
          r,
          i
        ) : zt(e, t, r, i), t.child;
      case 11:
        return qp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return zt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return zt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return zt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return r = t.pendingProps, ja(t, t.type, r.value), zt(e, t, r.children, i), t.child;
      case 9:
        return u = t.type._context, r = t.pendingProps.children, yi(t), u = Nt(u), r = r(u), t.flags |= 1, zt(e, t, r, i), t.child;
      case 14:
        return kp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return Pp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Zp(e, t, i);
      case 31:
        return Yx(e, t, i);
      case 22:
        return Yp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return yi(t), r = Nt(St), e === null ? (u = dc(), u === null && (u = et, f = cc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), t.memoizedState = { parent: r, cache: u }, mc(t), ja(t, St, u)) : ((e.lanes & i) !== 0 && (pc(e, t), lr(t, null, null, i), ir()), u = e.memoizedState, f = t.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ja(t, St, r)) : (r = f.cache, ja(t, St, r), r !== u.cache && uc(
          t,
          [St],
          i,
          !0
        ))), zt(
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
  function oa(e) {
    e.flags |= 4;
  }
  function Ic(e, t, i, r, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (wy()) e.flags |= 8192;
        else
          throw bi = Bs, hc;
    } else e.flags &= -16777217;
  }
  function Wp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !mg(t))
      if (wy()) e.flags |= 8192;
      else
        throw bi = Bs, hc;
  }
  function to(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? kl() : 536870912, e.lanes |= t, ml |= t);
  }
  function fr(e, t) {
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
  function Fx(e, t, i) {
    var r = t.pendingProps;
    switch (ic(t), t.tag) {
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
        return i = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ia(St), Fe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (tl(t) ? oa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rc())), lt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (oa(t), f !== null ? (lt(t), Wp(t, f)) : (lt(t), Ic(
          t,
          u,
          null,
          r,
          i
        ))) : f ? f !== e.memoizedState ? (oa(t), lt(t), Wp(t, f)) : (lt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && oa(t), lt(t), Ic(
          t,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (ba(t), i = Me.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && oa(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return lt(t), null;
          }
          e = ce.current, tl(t) ? zm(t) : (e = rg(u, r, i), t.stateNode = e, oa(t));
        }
        return lt(t), null;
      case 5:
        if (ba(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && oa(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return lt(t), null;
          }
          if (f = ce.current, tl(t))
            zm(t);
          else {
            var g = go(
              Me.current
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
            r && oa(t);
          }
        }
        return lt(t), Ic(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && oa(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Me.current, tl(t)) {
            if (e = t.stateNode, i = t.memoizedProps, r = null, u = Dt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[fe] = t, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Qy(e.nodeValue, i)), e || Aa(t, !0);
          } else
            e = go(e).createTextNode(
              r
            ), e[fe] = t, t.stateNode = e;
        }
        return lt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = tl(t), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = t;
            } else
              mi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), e = !1;
          } else
            i = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (an(t), t) : (an(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return lt(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = tl(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[fe] = t;
            } else
              mi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            lt(t), u = !1;
          } else
            u = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (an(t), t) : (an(t), null);
        }
        return an(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = t.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), f = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (f = r.memoizedState.cachePool.pool), f !== u && (r.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), to(t, t.updateQueue), lt(t), null);
      case 4:
        return Fe(), e === null && bf(t.stateNode.containerInfo), lt(t), null;
      case 10:
        return ia(t.type), lt(t), null;
      case 19:
        if (F(pt), r = t.memoizedState, r === null) return lt(t), null;
        if (u = (t.flags & 128) !== 0, f = r.rendering, f === null)
          if (u) fr(r, !1);
          else {
            if (ht !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = Ps(e), f !== null) {
                  for (t.flags |= 128, fr(r, !1), e = f.updateQueue, t.updateQueue = e, to(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    Mm(i, e), i = i.sibling;
                  return le(
                    pt,
                    pt.current & 1 | 2
                  ), qe && na(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && qt() > ro && (t.flags |= 128, u = !0, fr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ps(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, to(t, e), fr(r, !0), r.tail === null && r.tailMode === "hidden" && !f.alternate && !qe)
                return lt(t), null;
            } else
              2 * qt() - r.renderingStartTime > ro && i !== 536870912 && (t.flags |= 128, u = !0, fr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (f.sibling = t.child, t.child = f) : (e = r.last, e !== null ? e.sibling = f : t.child = f, r.last = f);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = qt(), e.sibling = null, i = pt.current, le(
          pt,
          u ? i & 1 | 2 : i & 1
        ), qe && na(t, r.treeForkCount), e) : (lt(t), null);
      case 22:
      case 23:
        return an(t), bc(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (lt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : lt(t), i = t.updateQueue, i !== null && to(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== i && (t.flags |= 2048), e !== null && F(gi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ia(St), lt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function $x(e, t) {
    switch (ic(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ia(St), Fe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return ba(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (an(t), t.alternate === null)
            throw Error(s(340));
          mi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (an(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          mi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return F(pt), null;
      case 4:
        return Fe(), null;
      case 10:
        return ia(t.type), null;
      case 22:
      case 23:
        return an(t), bc(), e !== null && F(gi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ia(St), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ey(e, t) {
    switch (ic(t), t.tag) {
      case 3:
        ia(St), Fe();
        break;
      case 26:
      case 27:
      case 5:
        ba(t);
        break;
      case 4:
        Fe();
        break;
      case 31:
        t.memoizedState !== null && an(t);
        break;
      case 13:
        an(t);
        break;
      case 19:
        F(pt);
        break;
      case 10:
        ia(t.type);
        break;
      case 22:
      case 23:
        an(t), bc(), e !== null && F(gi);
        break;
      case 24:
        ia(St);
    }
  }
  function dr(e, t) {
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
      Xe(t, t.return, E);
    }
  }
  function La(e, t, i) {
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
              } catch (X) {
                Xe(
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
      Xe(t, t.return, X);
    }
  }
  function ty(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Fm(t, i);
      } catch (r) {
        Xe(e, e.return, r);
      }
    }
  }
  function ny(e, t, i) {
    i.props = Ei(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Xe(e, t, r);
    }
  }
  function hr(e, t) {
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
      Xe(e, t, u);
    }
  }
  function qn(e, t) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (u) {
          Xe(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Xe(e, t, u);
        }
      else i.current = null;
  }
  function ay(e) {
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
      Xe(e, e.return, u);
    }
  }
  function Zc(e, t, i) {
    try {
      var r = e.stateNode;
      mE(r, e.type, i, t), r[de] = t;
    } catch (u) {
      Xe(e, e.return, u);
    }
  }
  function iy(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Pa(e.type) || e.tag === 4;
  }
  function Jc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || iy(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Pa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wc(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Wn));
    else if (r !== 4 && (r === 27 && Pa(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Wc(e, t, i), e = e.sibling; e !== null; )
        Wc(e, t, i), e = e.sibling;
  }
  function no(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Pa(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (no(e, t, i), e = e.sibling; e !== null; )
        no(e, t, i), e = e.sibling;
  }
  function ly(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Ot(t, r, i), t[fe] = e, t[de] = i;
    } catch (f) {
      Xe(e, e.return, f);
    }
  }
  var ua = !1, Tt = !1, ef = !1, ry = typeof WeakSet == "function" ? WeakSet : Set, jt = null;
  function Xx(e, t) {
    if (e = e.containerInfo, Ef = Ro, e = vm(e), Xu(e)) {
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
            var g = 0, E = -1, C = -1, q = 0, X = 0, J = e, P = null;
            t: for (; ; ) {
              for (var G; J !== i || u !== 0 && J.nodeType !== 3 || (E = g + u), J !== f || r !== 0 && J.nodeType !== 3 || (C = g + r), J.nodeType === 3 && (g += J.nodeValue.length), (G = J.firstChild) !== null; )
                P = J, J = G;
              for (; ; ) {
                if (J === e) break t;
                if (P === i && ++q === u && (E = g), P === f && ++X === r && (C = g), (G = J.nextSibling) !== null) break;
                J = P, P = J.parentNode;
              }
              J = G;
            }
            i = E === -1 || C === -1 ? null : { start: E, end: C };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Tf = { focusedElem: e, selectionRange: i }, Ro = !1, jt = t; jt !== null; )
      if (t = jt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, jt = e;
      else
        for (; jt !== null; ) {
          switch (t = jt, f = t.alternate, e = t.flags, t.tag) {
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
                  var me = Ei(
                    i.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    me,
                    f
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ce) {
                  Xe(
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
                  Cf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Cf(e);
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
            e.return = t.return, jt = e;
            break;
          }
          jt = t.return;
        }
  }
  function sy(e, t, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        fa(e, i), r & 4 && dr(5, i);
        break;
      case 1:
        if (fa(e, i), r & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Xe(i, i.return, g);
            }
          else {
            var u = Ei(
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
              Xe(
                i,
                i.return,
                g
              );
            }
          }
        r & 64 && ty(i), r & 512 && hr(i, i.return);
        break;
      case 3:
        if (fa(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            Fm(e, t);
          } catch (g) {
            Xe(i, i.return, g);
          }
        }
        break;
      case 27:
        t === null && r & 4 && ly(i);
      case 26:
      case 5:
        fa(e, i), t === null && r & 4 && ay(i), r & 512 && hr(i, i.return);
        break;
      case 12:
        fa(e, i);
        break;
      case 31:
        fa(e, i), r & 4 && cy(e, i);
        break;
      case 13:
        fa(e, i), r & 4 && fy(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = nE.bind(
          null,
          i
        ), EE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || ua, !r) {
          t = t !== null && t.memoizedState !== null || Tt, u = ua;
          var f = Tt;
          ua = r, (Tt = t) && !f ? da(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : fa(e, i), ua = u, Tt = f;
        }
        break;
      case 30:
        break;
      default:
        fa(e, i);
    }
  }
  function oy(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, oy(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && We(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ut = null, Xt = !1;
  function ca(e, t, i) {
    for (i = i.child; i !== null; )
      uy(e, t, i), i = i.sibling;
  }
  function uy(e, t, i) {
    if (kt && typeof kt.onCommitFiberUnmount == "function")
      try {
        kt.onCommitFiberUnmount(Zn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        Tt || qn(i, t), ca(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        Tt || qn(i, t);
        var r = ut, u = Xt;
        Pa(i.type) && (ut = i.stateNode, Xt = !1), ca(
          e,
          t,
          i
        ), Er(i.stateNode), ut = r, Xt = u;
        break;
      case 5:
        Tt || qn(i, t);
      case 6:
        if (r = ut, u = Xt, ut = null, ca(
          e,
          t,
          i
        ), ut = r, Xt = u, ut !== null)
          if (Xt)
            try {
              (ut.nodeType === 9 ? ut.body : ut.nodeName === "HTML" ? ut.ownerDocument.body : ut).removeChild(i.stateNode);
            } catch (f) {
              Xe(
                i,
                t,
                f
              );
            }
          else
            try {
              ut.removeChild(i.stateNode);
            } catch (f) {
              Xe(
                i,
                t,
                f
              );
            }
        break;
      case 18:
        ut !== null && (Xt ? (e = ut, tg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), El(e)) : tg(ut, i.stateNode));
        break;
      case 4:
        r = ut, u = Xt, ut = i.stateNode.containerInfo, Xt = !0, ca(
          e,
          t,
          i
        ), ut = r, Xt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        La(2, i, t), Tt || La(4, i, t), ca(
          e,
          t,
          i
        );
        break;
      case 1:
        Tt || (qn(i, t), r = i.stateNode, typeof r.componentWillUnmount == "function" && ny(
          i,
          t,
          r
        )), ca(
          e,
          t,
          i
        );
        break;
      case 21:
        ca(
          e,
          t,
          i
        );
        break;
      case 22:
        Tt = (r = Tt) || i.memoizedState !== null, ca(
          e,
          t,
          i
        ), Tt = r;
        break;
      default:
        ca(
          e,
          t,
          i
        );
    }
  }
  function cy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        El(e);
      } catch (i) {
        Xe(t, t.return, i);
      }
    }
  }
  function fy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        El(e);
      } catch (i) {
        Xe(t, t.return, i);
      }
  }
  function Kx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new ry()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ry()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ao(e, t) {
    var i = Kx(e);
    t.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = aE.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Kt(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], f = e, g = t, E = g;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Pa(E.type)) {
                ut = E.stateNode, Xt = !1;
                break e;
              }
              break;
            case 5:
              ut = E.stateNode, Xt = !1;
              break e;
            case 3:
            case 4:
              ut = E.stateNode.containerInfo, Xt = !0;
              break e;
          }
          E = E.return;
        }
        if (ut === null) throw Error(s(160));
        uy(f, g, u), ut = null, Xt = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        dy(t, e), t = t.sibling;
  }
  var jn = null;
  function dy(e, t) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Kt(t, e), Qt(e), r & 4 && (La(3, e, e.return), dr(3, e), La(5, e, e.return));
        break;
      case 1:
        Kt(t, e), Qt(e), r & 512 && (Tt || i === null || qn(i, i.return)), r & 64 && ua && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = jn;
        if (Kt(t, e), Qt(e), r & 512 && (Tt || i === null || qn(i, i.return)), r & 4) {
          var f = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[ze] || f[fe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(r), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Ot(f, r, i), f[fe] = e, nt(f), r = f;
                      break e;
                    case "link":
                      var g = dg(
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
                      f = u.createElement(r), Ot(f, r, i), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (g = dg(
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
                      f = u.createElement(r), Ot(f, r, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  f[fe] = e, nt(f), r = f;
                }
                e.stateNode = r;
              } else
                hg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = fg(
                u,
                r,
                e.memoizedProps
              );
          else
            f !== r ? (f === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : f.count--, r === null ? hg(
              u,
              e.type,
              e.stateNode
            ) : fg(
              u,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Zc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Kt(t, e), Qt(e), r & 512 && (Tt || i === null || qn(i, i.return)), i !== null && r & 4 && Zc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Kt(t, e), Qt(e), r & 512 && (Tt || i === null || qn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Fi(u, "");
          } catch (me) {
            Xe(e, e.return, me);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, Zc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), r & 1024 && (ef = !0);
        break;
      case 6:
        if (Kt(t, e), Qt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (me) {
            Xe(e, e.return, me);
          }
        }
        break;
      case 3:
        if (So = null, u = jn, jn = vo(t.containerInfo), Kt(t, e), jn = u, Qt(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            El(t.containerInfo);
          } catch (me) {
            Xe(e, e.return, me);
          }
        ef && (ef = !1, hy(e));
        break;
      case 4:
        r = jn, jn = vo(
          e.stateNode.containerInfo
        ), Kt(t, e), Qt(e), jn = r;
        break;
      case 12:
        Kt(t, e), Qt(e);
        break;
      case 31:
        Kt(t, e), Qt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ao(e, r)));
        break;
      case 13:
        Kt(t, e), Qt(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (lo = qt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ao(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var C = i !== null && i.memoizedState !== null, q = ua, X = Tt;
        if (ua = q || u, Tt = X || C, Kt(t, e), Tt = X, ua = q, Qt(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || C || ua || Tt || Ti(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                C = i = t;
                try {
                  if (f = C.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    E = C.stateNode;
                    var J = C.memoizedProps.style, P = J != null && J.hasOwnProperty("display") ? J.display : null;
                    E.style.display = P == null || typeof P == "boolean" ? "" : ("" + P).trim();
                  }
                } catch (me) {
                  Xe(C, C.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                C = t;
                try {
                  C.stateNode.nodeValue = u ? "" : C.memoizedProps;
                } catch (me) {
                  Xe(C, C.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                C = t;
                try {
                  var G = C.stateNode;
                  u ? ng(G, !0) : ng(C.stateNode, !1);
                } catch (me) {
                  Xe(C, C.return, me);
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
        r & 4 && (r = e.updateQueue, r !== null && (i = r.retryQueue, i !== null && (r.retryQueue = null, ao(e, i))));
        break;
      case 19:
        Kt(t, e), Qt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ao(e, r)));
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
        for (var i, r = e.return; r !== null; ) {
          if (iy(r)) {
            i = r;
            break;
          }
          r = r.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, f = Jc(e);
            no(e, f, u);
            break;
          case 5:
            var g = i.stateNode;
            i.flags & 32 && (Fi(g, ""), i.flags &= -33);
            var E = Jc(e);
            no(e, E, g);
            break;
          case 3:
          case 4:
            var C = i.stateNode.containerInfo, q = Jc(e);
            Wc(
              e,
              q,
              C
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (X) {
        Xe(e, e.return, X);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function hy(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        hy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function fa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        sy(e, t.alternate, t), t = t.sibling;
  }
  function Ti(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          La(4, t, t.return), Ti(t);
          break;
        case 1:
          qn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && ny(
            t,
            t.return,
            i
          ), Ti(t);
          break;
        case 27:
          Er(t.stateNode);
        case 26:
        case 5:
          qn(t, t.return), Ti(t);
          break;
        case 22:
          t.memoizedState === null && Ti(t);
          break;
        case 30:
          Ti(t);
          break;
        default:
          Ti(t);
      }
      e = e.sibling;
    }
  }
  function da(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate, u = e, f = t, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          da(
            u,
            f,
            i
          ), dr(4, f);
          break;
        case 1:
          if (da(
            u,
            f,
            i
          ), r = f, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (q) {
              Xe(r, r.return, q);
            }
          if (r = f, u = r.updateQueue, u !== null) {
            var E = r.stateNode;
            try {
              var C = u.shared.hiddenCallbacks;
              if (C !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < C.length; u++)
                  Gm(C[u], E);
            } catch (q) {
              Xe(r, r.return, q);
            }
          }
          i && g & 64 && ty(f), hr(f, f.return);
          break;
        case 27:
          ly(f);
        case 26:
        case 5:
          da(
            u,
            f,
            i
          ), i && r === null && g & 4 && ay(f), hr(f, f.return);
          break;
        case 12:
          da(
            u,
            f,
            i
          );
          break;
        case 31:
          da(
            u,
            f,
            i
          ), i && g & 4 && cy(u, f);
          break;
        case 13:
          da(
            u,
            f,
            i
          ), i && g & 4 && fy(u, f);
          break;
        case 22:
          f.memoizedState === null && da(
            u,
            f,
            i
          ), hr(f, f.return);
          break;
        case 30:
          break;
        default:
          da(
            u,
            f,
            i
          );
      }
      t = t.sibling;
    }
  }
  function tf(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Wl(i));
  }
  function nf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Wl(e));
  }
  function Dn(e, t, i, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        my(
          e,
          t,
          i,
          r
        ), t = t.sibling;
  }
  function my(e, t, i, r) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dn(
          e,
          t,
          i,
          r
        ), u & 2048 && dr(9, t);
        break;
      case 1:
        Dn(
          e,
          t,
          i,
          r
        );
        break;
      case 3:
        Dn(
          e,
          t,
          i,
          r
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Wl(e)));
        break;
      case 12:
        if (u & 2048) {
          Dn(
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
            Xe(t, t.return, C);
          }
        } else
          Dn(
            e,
            t,
            i,
            r
          );
        break;
      case 31:
        Dn(
          e,
          t,
          i,
          r
        );
        break;
      case 13:
        Dn(
          e,
          t,
          i,
          r
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, g = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? Dn(
          e,
          t,
          i,
          r
        ) : mr(e, t) : f._visibility & 2 ? Dn(
          e,
          t,
          i,
          r
        ) : (f._visibility |= 2, fl(
          e,
          t,
          i,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && tf(g, t);
        break;
      case 24:
        Dn(
          e,
          t,
          i,
          r
        ), u & 2048 && nf(t.alternate, t);
        break;
      default:
        Dn(
          e,
          t,
          i,
          r
        );
    }
  }
  function fl(e, t, i, r, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, g = t, E = i, C = r, q = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          fl(
            f,
            g,
            E,
            C,
            u
          ), dr(8, g);
          break;
        case 23:
          break;
        case 22:
          var X = g.stateNode;
          g.memoizedState !== null ? X._visibility & 2 ? fl(
            f,
            g,
            E,
            C,
            u
          ) : mr(
            f,
            g
          ) : (X._visibility |= 2, fl(
            f,
            g,
            E,
            C,
            u
          )), u && q & 2048 && tf(
            g.alternate,
            g
          );
          break;
        case 24:
          fl(
            f,
            g,
            E,
            C,
            u
          ), u && q & 2048 && nf(g.alternate, g);
          break;
        default:
          fl(
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
  function mr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, r = t, u = r.flags;
        switch (r.tag) {
          case 22:
            mr(i, r), u & 2048 && tf(
              r.alternate,
              r
            );
            break;
          case 24:
            mr(i, r), u & 2048 && nf(r.alternate, r);
            break;
          default:
            mr(i, r);
        }
        t = t.sibling;
      }
  }
  var pr = 8192;
  function dl(e, t, i) {
    if (e.subtreeFlags & pr)
      for (e = e.child; e !== null; )
        py(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function py(e, t, i) {
    switch (e.tag) {
      case 26:
        dl(
          e,
          t,
          i
        ), e.flags & pr && e.memoizedState !== null && _E(
          i,
          jn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        dl(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var r = jn;
        jn = vo(e.stateNode.containerInfo), dl(
          e,
          t,
          i
        ), jn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = pr, pr = 16777216, dl(
          e,
          t,
          i
        ), pr = r) : dl(
          e,
          t,
          i
        ));
        break;
      default:
        dl(
          e,
          t,
          i
        );
    }
  }
  function yy(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function yr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          jt = r, vy(
            r,
            e
          );
        }
      yy(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        gy(e), e = e.sibling;
  }
  function gy(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        yr(e), e.flags & 2048 && La(9, e, e.return);
        break;
      case 3:
        yr(e);
        break;
      case 12:
        yr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, io(e)) : yr(e);
        break;
      default:
        yr(e);
    }
  }
  function io(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          jt = r, vy(
            r,
            e
          );
        }
      yy(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          La(8, t, t.return), io(t);
          break;
        case 22:
          i = t.stateNode, i._visibility & 2 && (i._visibility &= -3, io(t));
          break;
        default:
          io(t);
      }
      e = e.sibling;
    }
  }
  function vy(e, t) {
    for (; jt !== null; ) {
      var i = jt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          La(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          Wl(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, jt = r;
      else
        e: for (i = e; jt !== null; ) {
          r = jt;
          var u = r.sibling, f = r.return;
          if (oy(r), r === i) {
            jt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, jt = u;
            break e;
          }
          jt = f;
        }
    }
  }
  var Qx = {
    getCacheForType: function(e) {
      var t = Nt(St), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Nt(St).controller.signal;
    }
  }, Ix = typeof WeakMap == "function" ? WeakMap : Map, Ge = 0, et = null, Ue = null, Be = 0, $e = 0, ln = null, Ua = !1, hl = !1, af = !1, ha = 0, ht = 0, Va = 0, Ri = 0, lf = 0, rn = 0, ml = 0, gr = null, It = null, rf = !1, lo = 0, by = 0, ro = 1 / 0, so = null, Ba = null, wt = 0, Ha = null, pl = null, ma = 0, sf = 0, of = null, Sy = null, vr = 0, uf = null;
  function sn() {
    return (Ge & 2) !== 0 && Be !== 0 ? Be & -Be : O.T !== null ? pf() : ae();
  }
  function xy() {
    if (rn === 0)
      if ((Be & 536870912) === 0 || qe) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), rn = e;
      } else rn = 536870912;
    return e = nn.current, e !== null && (e.flags |= 32), rn;
  }
  function Zt(e, t, i) {
    (e === et && ($e === 2 || $e === 9) || e.cancelPendingCommit !== null) && (yl(e, 0), qa(
      e,
      Be,
      rn,
      !1
    )), Ln(e, i), ((Ge & 2) === 0 || e !== et) && (e === et && ((Ge & 2) === 0 && (Ri |= i), ht === 4 && qa(
      e,
      Be,
      rn,
      !1
    )), kn(e));
  }
  function Ey(e, t, i) {
    if ((Ge & 6) !== 0) throw Error(s(327));
    var r = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ea(e, t), u = r ? Wx(e, t) : ff(e, t, !0), f = r;
    do {
      if (u === 0) {
        hl && !r && qa(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !Zx(i)) {
          u = ff(e, t, !1), f = !1;
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
              u = gr;
              var C = E.current.memoizedState.isDehydrated;
              if (C && (yl(E, g).flags |= 256), g = ff(
                E,
                g,
                !1
              ), g !== 2) {
                if (af && !C) {
                  E.errorRecoveryDisabledLanes |= f, Ri |= f, u = 4;
                  break e;
                }
                f = It, It = u, f !== null && (It === null ? It = f : It.push.apply(
                  It,
                  f
                ));
              }
              u = g;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          yl(e, 0), qa(e, t, 0, !0);
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
              qa(
                r,
                t,
                rn,
                !Ua
              );
              break e;
            case 2:
              It = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = lo + 300 - qt(), 10 < u)) {
            if (qa(
              r,
              t,
              rn,
              !Ua
            ), qi(r, 0, !0) !== 0) break e;
            ma = t, r.timeoutHandle = Wy(
              Ty.bind(
                null,
                r,
                i,
                It,
                so,
                rf,
                t,
                rn,
                Ri,
                ml,
                Ua,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Ty(
            r,
            i,
            It,
            so,
            rf,
            t,
            rn,
            Ri,
            ml,
            Ua,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    kn(e);
  }
  function Ty(e, t, i, r, u, f, g, E, C, q, X, J, P, G) {
    if (e.timeoutHandle = -1, J = t.subtreeFlags, J & 8192 || (J & 16785408) === 16785408) {
      J = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wn
      }, py(
        t,
        f,
        J
      );
      var me = (f & 62914560) === f ? lo - qt() : (f & 4194048) === f ? by - qt() : 0;
      if (me = LE(
        J,
        me
      ), me !== null) {
        ma = f, e.cancelPendingCommit = me(
          Ny.bind(
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
            X,
            J,
            null,
            P,
            G
          )
        ), qa(e, f, g, !q);
        return;
      }
    }
    Ny(
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
  function Zx(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var u = i[r], f = u.getSnapshot;
          u = u.value;
          try {
            if (!en(f(), u)) return !1;
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
  function qa(e, t, i, r) {
    t &= ~lf, t &= ~Ri, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - Ut(u), g = 1 << f;
      r[f] = -1, u &= ~g;
    }
    i !== 0 && gs(e, i, t);
  }
  function oo() {
    return (Ge & 6) === 0 ? (br(0), !1) : !0;
  }
  function cf() {
    if (Ue !== null) {
      if ($e === 0)
        var e = Ue.return;
      else
        e = Ue, aa = pi = null, wc(e), rl = null, tr = 0, e = Ue;
      for (; e !== null; )
        ey(e.alternate, e), e = e.return;
      Ue = null;
    }
  }
  function yl(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, gE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), ma = 0, cf(), et = e, Ue = i = ta(e.current, null), Be = t, $e = 0, ln = null, Ua = !1, hl = Ea(e, t), af = !1, ml = rn = lf = Ri = Va = ht = 0, It = gr = null, rf = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var u = 31 - Ut(r), f = 1 << u;
        t |= e[u], r &= ~f;
      }
    return ha = t, js(), i;
  }
  function Ry(e, t) {
    De = null, O.H = ur, t === ll || t === Vs ? (t = qm(), $e = 3) : t === hc ? (t = qm(), $e = 4) : $e = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ln = t, Ue === null && (ht = 1, Zs(
      e,
      dn(t, e.current)
    ));
  }
  function wy() {
    var e = nn.current;
    return e === null ? !0 : (Be & 4194048) === Be ? yn === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === yn : !1;
  }
  function Cy() {
    var e = O.H;
    return O.H = ur, e === null ? ur : e;
  }
  function My() {
    var e = O.A;
    return O.A = Qx, e;
  }
  function uo() {
    ht = 4, Ua || (Be & 4194048) !== Be && nn.current !== null || (hl = !0), (Va & 134217727) === 0 && (Ri & 134217727) === 0 || et === null || qa(
      et,
      Be,
      rn,
      !1
    );
  }
  function ff(e, t, i) {
    var r = Ge;
    Ge |= 2;
    var u = Cy(), f = My();
    (et !== e || Be !== t) && (so = null, yl(e, t)), t = !1;
    var g = ht;
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          var E = Ue, C = ln;
          switch ($e) {
            case 8:
              cf(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              nn.current === null && (t = !0);
              var q = $e;
              if ($e = 0, ln = null, gl(e, E, C, q), i && hl) {
                g = 0;
                break e;
              }
              break;
            default:
              q = $e, $e = 0, ln = null, gl(e, E, C, q);
          }
        }
        Jx(), g = ht;
        break;
      } catch (X) {
        Ry(e, X);
      }
    while (!0);
    return t && e.shellSuspendCounter++, aa = pi = null, Ge = r, O.H = u, O.A = f, Ue === null && (et = null, Be = 0, js()), g;
  }
  function Jx() {
    for (; Ue !== null; ) Ay(Ue);
  }
  function Wx(e, t) {
    var i = Ge;
    Ge |= 2;
    var r = Cy(), u = My();
    et !== e || Be !== t ? (so = null, ro = qt() + 500, yl(e, t)) : hl = Ea(
      e,
      t
    );
    e: do
      try {
        if ($e !== 0 && Ue !== null) {
          t = Ue;
          var f = ln;
          t: switch ($e) {
            case 1:
              $e = 0, ln = null, gl(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Bm(f)) {
                $e = 0, ln = null, jy(t);
                break;
              }
              t = function() {
                $e !== 2 && $e !== 9 || et !== e || ($e = 7), kn(e);
              }, f.then(t, t);
              break e;
            case 3:
              $e = 7;
              break e;
            case 4:
              $e = 5;
              break e;
            case 7:
              Bm(f) ? ($e = 0, ln = null, jy(t)) : ($e = 0, ln = null, gl(e, t, f, 7));
              break;
            case 5:
              var g = null;
              switch (Ue.tag) {
                case 26:
                  g = Ue.memoizedState;
                case 5:
                case 27:
                  var E = Ue;
                  if (g ? mg(g) : E.stateNode.complete) {
                    $e = 0, ln = null;
                    var C = E.sibling;
                    if (C !== null) Ue = C;
                    else {
                      var q = E.return;
                      q !== null ? (Ue = q, co(q)) : Ue = null;
                    }
                    break t;
                  }
              }
              $e = 0, ln = null, gl(e, t, f, 5);
              break;
            case 6:
              $e = 0, ln = null, gl(e, t, f, 6);
              break;
            case 8:
              cf(), ht = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        eE();
        break;
      } catch (X) {
        Ry(e, X);
      }
    while (!0);
    return aa = pi = null, O.H = r, O.A = u, Ge = i, Ue !== null ? 0 : (et = null, Be = 0, js(), ht);
  }
  function eE() {
    for (; Ue !== null && !Mu(); )
      Ay(Ue);
  }
  function Ay(e) {
    var t = Jp(e.alternate, e, ha);
    e.memoizedProps = e.pendingProps, t === null ? co(e) : Ue = t;
  }
  function jy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = $p(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Be
        );
        break;
      case 11:
        t = $p(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Be
        );
        break;
      case 5:
        wc(t);
      default:
        ey(i, t), t = Ue = Mm(t, ha), t = Jp(i, t, ha);
    }
    e.memoizedProps = e.pendingProps, t === null ? co(e) : Ue = t;
  }
  function gl(e, t, i, r) {
    aa = pi = null, wc(t), rl = null, tr = 0;
    var u = t.return;
    try {
      if (Px(
        e,
        u,
        t,
        i,
        Be
      )) {
        ht = 1, Zs(
          e,
          dn(i, e.current)
        ), Ue = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Ue = u, f;
      ht = 1, Zs(
        e,
        dn(i, e.current)
      ), Ue = null;
      return;
    }
    t.flags & 32768 ? (qe || r === 1 ? e = !0 : hl || (Be & 536870912) !== 0 ? e = !1 : (Ua = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = nn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Dy(t, e)) : co(t);
  }
  function co(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Dy(
          t,
          Ua
        );
        return;
      }
      e = t.return;
      var i = Fx(
        t.alternate,
        t,
        ha
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
    ht === 0 && (ht = 5);
  }
  function Dy(e, t) {
    do {
      var i = $x(e.alternate, e);
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
    ht = 6, Ue = null;
  }
  function Ny(e, t, i, r, u, f, g, E, C) {
    e.cancelPendingCommit = null;
    do
      fo();
    while (wt !== 0);
    if ((Ge & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Ju, ys(
        e,
        i,
        f,
        g,
        E,
        C
      ), e === et && (Ue = et = null, Be = 0), pl = t, Ha = e, ma = i, sf = f, of = u, Sy = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, iE(xa, function() {
        return Uy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null, u = ne.p, ne.p = 2, g = Ge, Ge |= 4;
        try {
          Xx(e, t, i);
        } finally {
          Ge = g, ne.p = u, O.T = r;
        }
      }
      wt = 1, zy(), Oy(), _y();
    }
  }
  function zy() {
    if (wt === 1) {
      wt = 0;
      var e = Ha, t = pl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          dy(t, e);
          var f = Tf, g = vm(e.containerInfo), E = f.focusedElem, C = f.selectionRange;
          if (g !== E && E && E.ownerDocument && gm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (C !== null && Xu(E)) {
              var q = C.start, X = C.end;
              if (X === void 0 && (X = q), "selectionStart" in E)
                E.selectionStart = q, E.selectionEnd = Math.min(
                  X,
                  E.value.length
                );
              else {
                var J = E.ownerDocument || document, P = J && J.defaultView || window;
                if (P.getSelection) {
                  var G = P.getSelection(), me = E.textContent.length, Ce = Math.min(C.start, me), Je = C.end === void 0 ? Ce : Math.min(C.end, me);
                  !G.extend && Ce > Je && (g = Je, Je = Ce, Ce = g);
                  var L = ym(
                    E,
                    Ce
                  ), N = ym(
                    E,
                    Je
                  );
                  if (L && N && (G.rangeCount !== 1 || G.anchorNode !== L.node || G.anchorOffset !== L.offset || G.focusNode !== N.node || G.focusOffset !== N.offset)) {
                    var H = J.createRange();
                    H.setStart(L.node, L.offset), G.removeAllRanges(), Ce > Je ? (G.addRange(H), G.extend(N.node, N.offset)) : (H.setEnd(N.node, N.offset), G.addRange(H));
                  }
                }
              }
            }
            for (J = [], G = E; G = G.parentNode; )
              G.nodeType === 1 && J.push({
                element: G,
                left: G.scrollLeft,
                top: G.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < J.length; E++) {
              var I = J[E];
              I.element.scrollLeft = I.left, I.element.scrollTop = I.top;
            }
          }
          Ro = !!Ef, Tf = Ef = null;
        } finally {
          Ge = u, ne.p = r, O.T = i;
        }
      }
      e.current = t, wt = 2;
    }
  }
  function Oy() {
    if (wt === 2) {
      wt = 0;
      var e = Ha, t = pl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Ge;
        Ge |= 4;
        try {
          sy(e, t.alternate, t);
        } finally {
          Ge = u, ne.p = r, O.T = i;
        }
      }
      wt = 3;
    }
  }
  function _y() {
    if (wt === 4 || wt === 3) {
      wt = 0, Au();
      var e = Ha, t = pl, i = ma, r = Sy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? wt = 5 : (wt = 0, pl = Ha = null, Ly(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Ba = null), k(i), t = t.stateNode, kt && typeof kt.onCommitFiberRoot == "function")
        try {
          kt.onCommitFiberRoot(
            Zn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = O.T, u = ne.p, ne.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, g = 0; g < r.length; g++) {
            var E = r[g];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          O.T = t, ne.p = u;
        }
      }
      (ma & 3) !== 0 && fo(), kn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === uf ? vr++ : (vr = 0, uf = e) : vr = 0, br(0);
    }
  }
  function Ly(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Wl(t)));
  }
  function fo() {
    return zy(), Oy(), _y(), Uy();
  }
  function Uy() {
    if (wt !== 5) return !1;
    var e = Ha, t = sf;
    sf = 0;
    var i = k(ma), r = O.T, u = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, O.T = null, i = of, of = null;
      var f = Ha, g = ma;
      if (wt = 0, pl = Ha = null, ma = 0, (Ge & 6) !== 0) throw Error(s(331));
      var E = Ge;
      if (Ge |= 4, gy(f.current), my(
        f,
        f.current,
        g,
        i
      ), Ge = E, br(0, !1), kt && typeof kt.onPostCommitFiberRoot == "function")
        try {
          kt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      ne.p = u, O.T = r, Ly(e, t);
    }
  }
  function Vy(e, t, i) {
    t = dn(i, t), t = qc(e.stateNode, t, 2), e = za(e, t, 2), e !== null && (Ln(e, 2), kn(e));
  }
  function Xe(e, t, i) {
    if (e.tag === 3)
      Vy(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Vy(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ba === null || !Ba.has(r))) {
            e = dn(i, e), i = Bp(2), r = za(t, i, 2), r !== null && (Hp(
              i,
              r,
              t,
              e
            ), Ln(r, 2), kn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function df(e, t, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new Ix();
      var u = /* @__PURE__ */ new Set();
      r.set(t, u);
    } else
      u = r.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(t, u));
    u.has(i) || (af = !0, u.add(i), e = tE.bind(null, e, t, i), t.then(e, e));
  }
  function tE(e, t, i) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, et === e && (Be & i) === i && (ht === 4 || ht === 3 && (Be & 62914560) === Be && 300 > qt() - lo ? (Ge & 2) === 0 && yl(e, 0) : lf |= i, ml === Be && (ml = 0)), kn(e);
  }
  function By(e, t) {
    t === 0 && (t = kl()), e = di(e, t), e !== null && (Ln(e, t), kn(e));
  }
  function nE(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), By(e, i);
  }
  function aE(e, t) {
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
    r !== null && r.delete(t), By(e, i);
  }
  function iE(e, t) {
    return Hi(e, t);
  }
  var ho = null, vl = null, hf = !1, mo = !1, mf = !1, ka = 0;
  function kn(e) {
    e !== vl && e.next === null && (vl === null ? ho = vl = e : vl = vl.next = e), mo = !0, hf || (hf = !0, rE());
  }
  function br(e, t) {
    if (!mf && mo) {
      mf = !0;
      do
        for (var i = !1, r = ho; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = r.suspendedLanes, E = r.pingedLanes;
              f = (1 << 31 - Ut(42 | e) + 1) - 1, f &= u & ~(g & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, Py(r, f));
          } else
            f = Be, f = qi(
              r,
              r === et ? f : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (f & 3) === 0 || Ea(r, f) || (i = !0, Py(r, f));
          r = r.next;
        }
      while (i);
      mf = !1;
    }
  }
  function lE() {
    Hy();
  }
  function Hy() {
    mo = hf = !1;
    var e = 0;
    ka !== 0 && yE() && (e = ka);
    for (var t = qt(), i = null, r = ho; r !== null; ) {
      var u = r.next, f = qy(r, t);
      f === 0 ? (r.next = null, i === null ? ho = u : i.next = u, u === null && (vl = i)) : (i = r, (e !== 0 || (f & 3) !== 0) && (mo = !0)), r = u;
    }
    wt !== 0 && wt !== 5 || br(e), ka !== 0 && (ka = 0);
  }
  function qy(e, t) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - Ut(f), E = 1 << g, C = u[g];
      C === -1 ? ((E & i) === 0 || (E & r) !== 0) && (u[g] = Nu(E, t)) : C <= t && (e.expiredLanes |= E), f &= ~E;
    }
    if (t = et, i = Be, i = qi(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === t && ($e === 2 || $e === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Hl(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || Ea(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (r !== null && Hl(r), k(i)) {
        case 2:
        case 8:
          i = ql;
          break;
        case 32:
          i = xa;
          break;
        case 268435456:
          i = un;
          break;
        default:
          i = xa;
      }
      return r = ky.bind(null, e), i = Hi(i, r), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return r !== null && r !== null && Hl(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function ky(e, t) {
    if (wt !== 0 && wt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (fo() && e.callbackNode !== i)
      return null;
    var r = Be;
    return r = qi(
      e,
      e === et ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (Ey(e, r, t), qy(e, qt()), e.callbackNode != null && e.callbackNode === i ? ky.bind(null, e) : null);
  }
  function Py(e, t) {
    if (fo()) return null;
    Ey(e, t, !0);
  }
  function rE() {
    vE(function() {
      (Ge & 6) !== 0 ? Hi(
        Sa,
        lE
      ) : Hy();
    });
  }
  function pf() {
    if (ka === 0) {
      var e = al;
      e === 0 && (e = li, li <<= 1, (li & 261888) === 0 && (li = 256)), ka = e;
    }
    return ka;
  }
  function Yy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : xs("" + e);
  }
  function Gy(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function sE(e, t, i, r, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var f = Yy(
        (u[de] || null).action
      ), g = r.submitter;
      g && (t = (t = g[de] || null) ? Yy(t.formAction) : g.getAttribute("formAction"), t !== null && (f = t, g = null));
      var E = new ws(
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
                  var C = g ? Gy(u, g) : new FormData(u);
                  _c(
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
                typeof f == "function" && (E.preventDefault(), C = g ? Gy(u, g) : new FormData(u), _c(
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
  for (var yf = 0; yf < Zu.length; yf++) {
    var gf = Zu[yf], oE = gf.toLowerCase(), uE = gf[0].toUpperCase() + gf.slice(1);
    An(
      oE,
      "on" + uE
    );
  }
  An(xm, "onAnimationEnd"), An(Em, "onAnimationIteration"), An(Tm, "onAnimationStart"), An("dblclick", "onDoubleClick"), An("focusin", "onFocus"), An("focusout", "onBlur"), An(wx, "onTransitionRun"), An(Cx, "onTransitionStart"), An(Mx, "onTransitionCancel"), An(Rm, "onTransitionEnd"), Un("onMouseEnter", ["mouseout", "mouseover"]), Un("onMouseLeave", ["mouseout", "mouseover"]), Un("onPointerEnter", ["pointerout", "pointerover"]), Un("onPointerLeave", ["pointerout", "pointerover"]), At(
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
  ), cE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sr)
  );
  function Fy(e, t) {
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
            } catch (X) {
              As(X);
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
              As(X);
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
    i.has(r) || ($y(t, e, 2, !1), i.add(r));
  }
  function vf(e, t, i) {
    var r = 0;
    t && (r |= 4), $y(
      i,
      e,
      r,
      t
    );
  }
  var po = "_reactListening" + Math.random().toString(36).slice(2);
  function bf(e) {
    if (!e[po]) {
      e[po] = !0, Ra.forEach(function(i) {
        i !== "selectionchange" && (cE.has(i) || vf(i, !1, e), vf(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[po] || (t[po] = !0, vf("selectionchange", !1, t));
    }
  }
  function $y(e, t, i, r) {
    switch (xg(t)) {
      case 2:
        var u = BE;
        break;
      case 8:
        u = HE;
        break;
      default:
        u = _f;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Bu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), r ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function Sf(e, t, i, r, u) {
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
    Zh(function() {
      var q = f, X = Uu(i), J = [];
      e: {
        var P = wm.get(e);
        if (P !== void 0) {
          var G = ws, me = e;
          switch (e) {
            case "keypress":
              if (Ts(i) === 0) break e;
            case "keydown":
            case "keyup":
              G = ax;
              break;
            case "focusin":
              me = "focus", G = Pu;
              break;
            case "focusout":
              me = "blur", G = Pu;
              break;
            case "beforeblur":
            case "afterblur":
              G = Pu;
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
              G = em;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = F1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = rx;
              break;
            case xm:
            case Em:
            case Tm:
              G = K1;
              break;
            case Rm:
              G = ox;
              break;
            case "scroll":
            case "scrollend":
              G = Y1;
              break;
            case "wheel":
              G = cx;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = I1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = nm;
              break;
            case "toggle":
            case "beforetoggle":
              G = dx;
          }
          var Ce = (t & 4) !== 0, Je = !Ce && (e === "scroll" || e === "scrollend"), L = Ce ? P !== null ? P + "Capture" : null : P;
          Ce = [];
          for (var N = q, H; N !== null; ) {
            var I = N;
            if (H = I.stateNode, I = I.tag, I !== 5 && I !== 26 && I !== 27 || H === null || L === null || (I = Pl(N, L), I != null && Ce.push(
              xr(N, I, H)
            )), Je) break;
            N = N.return;
          }
          0 < Ce.length && (P = new G(
            P,
            me,
            null,
            i,
            X
          ), J.push({ event: P, listeners: Ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", G = e === "mouseout" || e === "pointerout", P && i !== Lu && (me = i.relatedTarget || i.fromElement) && (Qe(me) || me[ge]))
            break e;
          if ((G || P) && (P = X.window === X ? X : (P = X.ownerDocument) ? P.defaultView || P.parentWindow : window, G ? (me = i.relatedTarget || i.toElement, G = q, me = me ? Qe(me) : null, me !== null && (Je = c(me), Ce = me.tag, me !== Je || Ce !== 5 && Ce !== 27 && Ce !== 6) && (me = null)) : (G = null, me = q), G !== me)) {
            if (Ce = em, I = "onMouseLeave", L = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (Ce = nm, I = "onPointerLeave", L = "onPointerEnter", N = "pointer"), Je = G == null ? P : Le(G), H = me == null ? P : Le(me), P = new Ce(
              I,
              N + "leave",
              G,
              i,
              X
            ), P.target = Je, P.relatedTarget = H, I = null, Qe(X) === q && (Ce = new Ce(
              L,
              N + "enter",
              me,
              i,
              X
            ), Ce.target = H, Ce.relatedTarget = Je, I = Ce), Je = I, G && me)
              t: {
                for (Ce = fE, L = G, N = me, H = 0, I = L; I; I = Ce(I))
                  H++;
                I = 0;
                for (var xe = N; xe; xe = Ce(xe))
                  I++;
                for (; 0 < H - I; )
                  L = Ce(L), H--;
                for (; 0 < I - H; )
                  N = Ce(N), I--;
                for (; H--; ) {
                  if (L === N || N !== null && L === N.alternate) {
                    Ce = L;
                    break t;
                  }
                  L = Ce(L), N = Ce(N);
                }
                Ce = null;
              }
            else Ce = null;
            G !== null && Xy(
              J,
              P,
              G,
              Ce,
              !1
            ), me !== null && Je !== null && Xy(
              J,
              Je,
              me,
              Ce,
              !0
            );
          }
        }
        e: {
          if (P = q ? Le(q) : window, G = P.nodeName && P.nodeName.toLowerCase(), G === "select" || G === "input" && P.type === "file")
            var Pe = cm;
          else if (om(P))
            if (fm)
              Pe = Ex;
            else {
              Pe = Sx;
              var ve = bx;
            }
          else
            G = P.nodeName, !G || G.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? q && _u(q.elementType) && (Pe = cm) : Pe = xx;
          if (Pe && (Pe = Pe(e, q))) {
            um(
              J,
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
            (om(ve) || ve.contentEditable === "true") && (Qi = ve, Ku = q, Il = null);
            break;
          case "focusout":
            Il = Ku = Qi = null;
            break;
          case "mousedown":
            Qu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qu = !1, bm(J, i, X);
            break;
          case "selectionchange":
            if (Rx) break;
          case "keydown":
          case "keyup":
            bm(J, i, X);
        }
        var Ne;
        if (Gu)
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
          Ki ? rm(e, i) && (He = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (He = "onCompositionStart");
        He && (am && i.locale !== "ko" && (Ki || He !== "onCompositionStart" ? He === "onCompositionEnd" && Ki && (Ne = Jh()) : (wa = X, Hu = "value" in wa ? wa.value : wa.textContent, Ki = !0)), ve = yo(q, He), 0 < ve.length && (He = new tm(
          He,
          e,
          null,
          i,
          X
        ), J.push({ event: He, listeners: ve }), Ne ? He.data = Ne : (Ne = sm(i), Ne !== null && (He.data = Ne)))), (Ne = mx ? px(e, i) : yx(e, i)) && (He = yo(q, "onBeforeInput"), 0 < He.length && (ve = new tm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          X
        ), J.push({
          event: ve,
          listeners: He
        }), ve.data = Ne)), sE(
          J,
          e,
          q,
          i,
          X
        );
      }
      Fy(J, t);
    });
  }
  function xr(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function yo(e, t) {
    for (var i = t + "Capture", r = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = Pl(e, i), u != null && r.unshift(
        xr(e, u, f)
      ), u = Pl(e, t), u != null && r.push(
        xr(e, u, f)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function fE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Xy(e, t, i, r, u) {
    for (var f = t._reactName, g = []; i !== null && i !== r; ) {
      var E = i, C = E.alternate, q = E.stateNode;
      if (E = E.tag, C !== null && C === r) break;
      E !== 5 && E !== 26 && E !== 27 || q === null || (C = q, u ? (q = Pl(i, f), q != null && g.unshift(
        xr(i, q, C)
      )) : u || (q = Pl(i, f), q != null && g.push(
        xr(i, q, C)
      ))), i = i.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var dE = /\r\n?/g, hE = /\u0000|\uFFFD/g;
  function Ky(e) {
    return (typeof e == "string" ? e : "" + e).replace(dE, `
`).replace(hE, "");
  }
  function Qy(e, t) {
    return t = Ky(t), Ky(e) === t;
  }
  function Ze(e, t, i, r, u, f) {
    switch (i) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Fi(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Fi(e, "" + r);
        break;
      case "className":
        mt(e, "class", r);
        break;
      case "tabIndex":
        mt(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mt(e, i, r);
        break;
      case "style":
        Qh(e, r, f);
        break;
      case "data":
        if (t !== "object") {
          mt(e, "data", r);
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
        r = xs("" + r), e.setAttribute(i, r);
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
        r = xs("" + r), e.setAttribute(i, r);
        break;
      case "onClick":
        r != null && (e.onclick = Wn);
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
        i = xs("" + r), e.setAttributeNS(
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
        Ve("beforetoggle", e), Ve("toggle", e), Oe(e, "popover", r);
        break;
      case "xlinkActuate":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        Vt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        Vt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        Vt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        Vt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Oe(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = k1.get(i) || i, Oe(e, i, r));
    }
  }
  function xf(e, t, i, r, u, f) {
    switch (i) {
      case "style":
        Qh(e, r, f);
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
        typeof r == "string" ? Fi(e, r) : (typeof r == "number" || typeof r == "bigint") && Fi(e, "" + r);
        break;
      case "onScroll":
        r != null && Ve("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ve("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Wn);
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
        if (!Mn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), f = e[de] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof r == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, r, u);
              break e;
            }
            i in e ? e[i] = r : r === !0 ? e.setAttribute(i, "") : Oe(e, i, r);
          }
    }
  }
  function Ot(e, t, i) {
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
                    throw Error(s(137, t));
                  break;
                default:
                  Ze(e, t, r, X, i, null);
              }
          }
        Fh(
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
        t = f, i = g, e.multiple = !!r, t != null ? Gi(e, !!r, t, !1) : i != null && Gi(e, !!r, i, !0);
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
        Xh(e, r, u, f);
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
        for (r = 0; r < Sr.length; r++)
          Ve(Sr[r], e);
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
        if (_u(t)) {
          for (X in i)
            i.hasOwnProperty(X) && (r = i[X], r !== void 0 && xf(
              e,
              t,
              X,
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
  function mE(e, t, i, r) {
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
        var u = null, f = null, g = null, E = null, C = null, q = null, X = null;
        for (G in i) {
          var J = i[G];
          if (i.hasOwnProperty(G) && J != null)
            switch (G) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = J;
              default:
                r.hasOwnProperty(G) || Ze(e, t, G, null, r, J);
            }
        }
        for (var P in r) {
          var G = r[P];
          if (J = i[P], r.hasOwnProperty(P) && (G != null || J != null))
            switch (P) {
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
                X = G;
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
                G !== J && Ze(
                  e,
                  t,
                  P,
                  G,
                  r,
                  J
                );
            }
        }
        zu(
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
        G = g = E = P = null;
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
                  t,
                  u,
                  f,
                  r,
                  C
                );
            }
        t = E, i = g, r = G, P != null ? Gi(e, !!i, P, !1) : !!r != !!i && (t != null ? Gi(e, !!i, t, !0) : Gi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        G = P = null;
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
                P = u;
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
        $h(e, P, G);
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
                  t,
                  me,
                  null,
                  r,
                  P
                );
            }
        for (C in r)
          if (P = r[C], G = i[C], r.hasOwnProperty(C) && P !== G && (P != null || G != null))
            switch (C) {
              case "selected":
                e.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                Ze(
                  e,
                  t,
                  C,
                  P,
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
          P = i[Ce], i.hasOwnProperty(Ce) && P != null && !r.hasOwnProperty(Ce) && Ze(e, t, Ce, null, r, P);
        for (q in r)
          if (P = r[q], G = i[q], r.hasOwnProperty(q) && P !== G && (P != null || G != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                Ze(
                  e,
                  t,
                  q,
                  P,
                  r,
                  G
                );
            }
        return;
      default:
        if (_u(t)) {
          for (var Je in i)
            P = i[Je], i.hasOwnProperty(Je) && P !== void 0 && !r.hasOwnProperty(Je) && xf(
              e,
              t,
              Je,
              void 0,
              r,
              P
            );
          for (X in r)
            P = r[X], G = i[X], !r.hasOwnProperty(X) || P === G || P === void 0 && G === void 0 || xf(
              e,
              t,
              X,
              P,
              r,
              G
            );
          return;
        }
    }
    for (var L in i)
      P = i[L], i.hasOwnProperty(L) && P != null && !r.hasOwnProperty(L) && Ze(e, t, L, null, r, P);
    for (J in r)
      P = r[J], G = i[J], !r.hasOwnProperty(J) || P === G || P == null && G == null || Ze(e, t, J, P, r, G);
  }
  function Iy(e) {
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
  function pE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], f = u.transferSize, g = u.initiatorType, E = u.duration;
        if (f && E && Iy(g)) {
          for (g = 0, E = u.responseEnd, r += 1; r < i.length; r++) {
            var C = i[r], q = C.startTime;
            if (q > E) break;
            var X = C.transferSize, J = C.initiatorType;
            X && Iy(J) && (C = C.responseEnd, g += X * (C < E ? 1 : (E - q) / (C - q)));
          }
          if (--r, t += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ef = null, Tf = null;
  function go(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Zy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Jy(e, t) {
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
  function Rf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var wf = null;
  function yE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === wf ? !1 : (wf = e, !0) : (wf = null, !1);
  }
  var Wy = typeof setTimeout == "function" ? setTimeout : void 0, gE = typeof clearTimeout == "function" ? clearTimeout : void 0, eg = typeof Promise == "function" ? Promise : void 0, vE = typeof queueMicrotask == "function" ? queueMicrotask : typeof eg < "u" ? function(e) {
    return eg.resolve(null).then(e).catch(bE);
  } : Wy;
  function bE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Pa(e) {
    return e === "head";
  }
  function tg(e, t) {
    var i = t, r = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(u), El(t);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Er(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Er(i);
          for (var f = i.firstChild; f; ) {
            var g = f.nextSibling, E = f.nodeName;
            f[ze] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = g;
          }
        } else
          i === "body" && Er(e.ownerDocument.body);
      i = u;
    } while (i);
    El(t);
  }
  function ng(e, t) {
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
  function Cf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Cf(i), We(i);
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
  function SE(e, t, i, r) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[ze])
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
      if (e = gn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xE(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = gn(e.nextSibling), e === null)) return null;
    return e;
  }
  function ag(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = gn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Mf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Af(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function EE(e, t) {
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
  function gn(e) {
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
  var jf = null;
  function ig(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return gn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function lg(e) {
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
  function rg(e, t, i) {
    switch (t = go(i), e) {
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
  function Er(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    We(e);
  }
  var vn = /* @__PURE__ */ new Map(), sg = /* @__PURE__ */ new Set();
  function vo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var pa = ne.d;
  ne.d = {
    f: TE,
    r: RE,
    D: wE,
    C: CE,
    L: ME,
    m: AE,
    X: DE,
    S: jE,
    M: NE
  };
  function TE() {
    var e = pa.f(), t = oo();
    return e || t;
  }
  function RE(e) {
    var t = ot(e);
    t !== null && t.tag === 5 && t.type === "form" ? Rp(t) : pa.r(e);
  }
  var bl = typeof document > "u" ? null : document;
  function og(e, t, i) {
    var r = bl;
    if (r && typeof t == "string" && t) {
      var u = cn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), sg.has(u) || (sg.add(u), e = { rel: e, crossOrigin: i, href: t }, r.querySelector(u) === null && (t = r.createElement("link"), Ot(t, "link", e), nt(t), r.head.appendChild(t)));
    }
  }
  function wE(e) {
    pa.D(e), og("dns-prefetch", e, null);
  }
  function CE(e, t) {
    pa.C(e, t), og("preconnect", e, t);
  }
  function ME(e, t, i) {
    pa.L(e, t, i);
    var r = bl;
    if (r && e && t) {
      var u = 'link[rel="preload"][as="' + cn(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + cn(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + cn(
        i.imageSizes
      ) + '"]')) : u += '[href="' + cn(e) + '"]';
      var f = u;
      switch (t) {
        case "style":
          f = Sl(e);
          break;
        case "script":
          f = xl(e);
      }
      vn.has(f) || (e = b(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), vn.set(f, e), r.querySelector(u) !== null || t === "style" && r.querySelector(Tr(f)) || t === "script" && r.querySelector(Rr(f)) || (t = r.createElement("link"), Ot(t, "link", e), nt(t), r.head.appendChild(t)));
    }
  }
  function AE(e, t) {
    pa.m(e, t);
    var i = bl;
    if (i && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + cn(r) + '"][href="' + cn(e) + '"]', f = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = xl(e);
      }
      if (!vn.has(f) && (e = b({ rel: "modulepreload", href: e }, t), vn.set(f, e), i.querySelector(u) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Rr(f)))
              return;
        }
        r = i.createElement("link"), Ot(r, "link", e), nt(r), i.head.appendChild(r);
      }
    }
  }
  function jE(e, t, i) {
    pa.S(e, t, i);
    var r = bl;
    if (r && e) {
      var u = vt(r).hoistableStyles, f = Sl(e);
      t = t || "default";
      var g = u.get(f);
      if (!g) {
        var E = { loading: 0, preload: null };
        if (g = r.querySelector(
          Tr(f)
        ))
          E.loading = 5;
        else {
          e = b(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = vn.get(f)) && Df(e, i);
          var C = g = r.createElement("link");
          nt(C), Ot(C, "link", e), C._p = new Promise(function(q, X) {
            C.onload = q, C.onerror = X;
          }), C.addEventListener("load", function() {
            E.loading |= 1;
          }), C.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, bo(g, t, r);
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
  function DE(e, t) {
    pa.X(e, t);
    var i = bl;
    if (i && e) {
      var r = vt(i).hoistableScripts, u = xl(e), f = r.get(u);
      f || (f = i.querySelector(Rr(u)), f || (e = b({ src: e, async: !0 }, t), (t = vn.get(u)) && Nf(e, t), f = i.createElement("script"), nt(f), Ot(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function NE(e, t) {
    pa.M(e, t);
    var i = bl;
    if (i && e) {
      var r = vt(i).hoistableScripts, u = xl(e), f = r.get(u);
      f || (f = i.querySelector(Rr(u)), f || (e = b({ src: e, async: !0, type: "module" }, t), (t = vn.get(u)) && Nf(e, t), f = i.createElement("script"), nt(f), Ot(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function ug(e, t, i, r) {
    var u = (u = Me.current) ? vo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = Sl(i.href), i = vt(
          u
        ).hoistableStyles, r = i.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = Sl(i.href);
          var f = vt(
            u
          ).hoistableStyles, g = f.get(e);
          if (g || (u = u.ownerDocument || u, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, g), (f = u.querySelector(
            Tr(e)
          )) && !f._p && (g.instance = f, g.state.loading = 5), vn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, vn.set(e, i), f || zE(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = xl(i), i = vt(
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
  function Sl(e) {
    return 'href="' + cn(e) + '"';
  }
  function Tr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function cg(e) {
    return b({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function zE(e, t, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), Ot(t, "link", i), nt(t), e.head.appendChild(t));
  }
  function xl(e) {
    return '[src="' + cn(e) + '"]';
  }
  function Rr(e) {
    return "script[async]" + e;
  }
  function fg(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + cn(i.href) + '"]'
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
          ), nt(r), Ot(r, "style", u), bo(r, i.precedence, e), t.instance = r;
        case "stylesheet":
          u = Sl(i.href);
          var f = e.querySelector(
            Tr(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, nt(f), f;
          r = cg(i), (u = vn.get(u)) && Df(r, u), f = (e.ownerDocument || e).createElement("link"), nt(f);
          var g = f;
          return g._p = new Promise(function(E, C) {
            g.onload = E, g.onerror = C;
          }), Ot(f, "link", r), t.state.loading |= 4, bo(f, i.precedence, e), t.instance = f;
        case "script":
          return f = xl(i.src), (u = e.querySelector(
            Rr(f)
          )) ? (t.instance = u, nt(u), u) : (r = i, (u = vn.get(f)) && (r = b({}, i), Nf(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), nt(u), Ot(u, "link", r), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, bo(r, i.precedence, e));
    return t.instance;
  }
  function bo(e, t, i) {
    for (var r = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = r.length ? r[r.length - 1] : null, f = u, g = 0; g < r.length; g++) {
      var E = r[g];
      if (E.dataset.precedence === t) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Df(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Nf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var So = null;
  function dg(e, t, i) {
    if (So === null) {
      var r = /* @__PURE__ */ new Map(), u = So = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = So, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[ze] || f[fe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = f.getAttribute(t) || "";
        g = e + g;
        var E = r.get(g);
        E ? E.push(f) : r.set(g, [f]);
      }
    }
    return r;
  }
  function hg(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function OE(e, t, i) {
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
  function mg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function _E(e, t, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Sl(r.href), f = t.querySelector(
          Tr(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = xo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = f, nt(f);
          return;
        }
        f = t.ownerDocument || t, r = cg(r), (u = vn.get(u)) && Df(r, u), f = f.createElement("link"), nt(f);
        var g = f;
        g._p = new Promise(function(E, C) {
          g.onload = E, g.onerror = C;
        }), Ot(f, "link", r), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = xo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var zf = 0;
  function LE(e, t) {
    return e.stylesheets && e.count === 0 && To(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && To(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && zf === 0 && (zf = 62500 * pE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && To(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > zf ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(u);
      };
    } : null;
  }
  function xo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) To(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Eo = null;
  function To(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Eo = /* @__PURE__ */ new Map(), t.forEach(UE, e), Eo = null, xo.call(e));
  }
  function UE(e, t) {
    if (!(t.state.loading & 4)) {
      var i = Eo.get(e);
      if (i) var r = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Eo.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var g = u[f];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (i.set(g.dataset.precedence, g), r = g);
        }
        r && i.set(null, r);
      }
      u = t.instance, g = u.getAttribute("data-precedence"), f = i.get(g) || r, f === r && i.set(null, u), i.set(g, u), this.count++, r = xo.bind(this), u.addEventListener("load", r), u.addEventListener("error", r), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var wr = {
    $$typeof: U,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function VE(e, t, i, r, u, f, g, E, C) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ta(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ta(0), this.hiddenUpdates = Ta(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = C, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function pg(e, t, i, r, u, f, g, E, C, q, X, J) {
    return e = new VE(
      e,
      t,
      i,
      g,
      C,
      q,
      X,
      J,
      E
    ), t = 1, f === !0 && (t |= 24), f = tn(3, null, null, t), e.current = f, f.stateNode = e, t = cc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: t
    }, mc(f), e;
  }
  function yg(e) {
    return e ? (e = Ji, e) : Ji;
  }
  function gg(e, t, i, r, u, f) {
    u = yg(u), r.context === null ? r.context = u : r.pendingContext = u, r = Na(t), r.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (r.callback = f), i = za(e, r, t), i !== null && (Zt(i, e, t), ar(i, e, t));
  }
  function vg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Of(e, t) {
    vg(e, t), (e = e.alternate) && vg(e, t);
  }
  function bg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = di(e, 67108864);
      t !== null && Zt(t, e, 67108864), Of(e, 67108864);
    }
  }
  function Sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = sn();
      t = _(t);
      var i = di(e, t);
      i !== null && Zt(i, e, t), Of(e, t);
    }
  }
  var Ro = !0;
  function BE(e, t, i, r) {
    var u = O.T;
    O.T = null;
    var f = ne.p;
    try {
      ne.p = 2, _f(e, t, i, r);
    } finally {
      ne.p = f, O.T = u;
    }
  }
  function HE(e, t, i, r) {
    var u = O.T;
    O.T = null;
    var f = ne.p;
    try {
      ne.p = 8, _f(e, t, i, r);
    } finally {
      ne.p = f, O.T = u;
    }
  }
  function _f(e, t, i, r) {
    if (Ro) {
      var u = Lf(r);
      if (u === null)
        Sf(
          e,
          t,
          r,
          wo,
          i
        ), Eg(e, r);
      else if (kE(
        u,
        e,
        t,
        i,
        r
      ))
        r.stopPropagation();
      else if (Eg(e, r), t & 4 && -1 < qE.indexOf(e)) {
        for (; u !== null; ) {
          var f = ot(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = Cn(f.pendingLanes);
                  if (g !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; g; ) {
                      var C = 1 << 31 - Ut(g);
                      E.entanglements[1] |= C, g &= ~C;
                    }
                    kn(f), (Ge & 6) === 0 && (ro = qt() + 500, br(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = di(f, 2), E !== null && Zt(E, f, 2), oo(), Of(f, 2);
            }
          if (f = Lf(r), f === null && Sf(
            e,
            t,
            r,
            wo,
            i
          ), f === u) break;
          u = f;
        }
        u !== null && r.stopPropagation();
      } else
        Sf(
          e,
          t,
          r,
          null,
          i
        );
    }
  }
  function Lf(e) {
    return e = Uu(e), Uf(e);
  }
  var wo = null;
  function Uf(e) {
    if (wo = null, e = Qe(e), e !== null) {
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
    return wo = e, null;
  }
  function xg(e) {
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
        switch (In()) {
          case Sa:
            return 2;
          case ql:
            return 8;
          case xa:
          case wn:
            return 32;
          case un:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vf = !1, Ya = null, Ga = null, Fa = null, Cr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), $a = [], qE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Eg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ya = null;
        break;
      case "dragenter":
      case "dragleave":
        Ga = null;
        break;
      case "mouseover":
      case "mouseout":
        Fa = null;
        break;
      case "pointerover":
      case "pointerout":
        Cr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mr.delete(t.pointerId);
    }
  }
  function Ar(e, t, i, r, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = ot(t), t !== null && bg(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function kE(e, t, i, r, u) {
    switch (t) {
      case "focusin":
        return Ya = Ar(
          Ya,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return Ga = Ar(
          Ga,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return Fa = Ar(
          Fa,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Cr.set(
          f,
          Ar(
            Cr.get(f) || null,
            e,
            t,
            i,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Mr.set(
          f,
          Ar(
            Mr.get(f) || null,
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
  function Tg(e) {
    var t = Qe(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, oe(e.priority, function() {
              Sg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, oe(e.priority, function() {
              Sg(i);
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
  function Co(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var i = Lf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var r = new i.constructor(
          i.type,
          i
        );
        Lu = r, i.target.dispatchEvent(r), Lu = null;
      } else
        return t = ot(i), t !== null && bg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Rg(e, t, i) {
    Co(e) && i.delete(t);
  }
  function PE() {
    Vf = !1, Ya !== null && Co(Ya) && (Ya = null), Ga !== null && Co(Ga) && (Ga = null), Fa !== null && Co(Fa) && (Fa = null), Cr.forEach(Rg), Mr.forEach(Rg);
  }
  function Mo(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Vf || (Vf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      PE
    )));
  }
  var Ao = null;
  function wg(e) {
    Ao !== e && (Ao = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ao === e && (Ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], r = e[t + 1], u = e[t + 2];
          if (typeof r != "function") {
            if (Uf(r || i) === null)
              continue;
            break;
          }
          var f = ot(i);
          f !== null && (e.splice(t, 3), t -= 3, _c(
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
  function El(e) {
    function t(C) {
      return Mo(C, e);
    }
    Ya !== null && Mo(Ya, e), Ga !== null && Mo(Ga, e), Fa !== null && Mo(Fa, e), Cr.forEach(t), Mr.forEach(t);
    for (var i = 0; i < $a.length; i++) {
      var r = $a[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < $a.length && (i = $a[0], i.blockedOn === null); )
      Tg(i), i.blockedOn === null && $a.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], f = i[r + 1], g = u[de] || null;
        if (typeof f == "function")
          g || wg(i);
        else if (g) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[de] || null)
              E = g.formAction;
            else if (Uf(u) !== null) continue;
          } else E = g.action;
          typeof E == "function" ? i[r + 1] = E : (i.splice(r, 3), r -= 3), wg(i);
        }
      }
  }
  function Cg() {
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
  function Bf(e) {
    this._internalRoot = e;
  }
  jo.prototype.render = Bf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, r = sn();
    gg(i, r, e, t, null, null);
  }, jo.prototype.unmount = Bf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      gg(e.current, 2, null, e, null, null), oo(), t[ge] = null;
    }
  };
  function jo(e) {
    this._internalRoot = e;
  }
  jo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ae();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < $a.length && t !== 0 && t < $a[i].priority; i++) ;
      $a.splice(i, 0, e), i === 0 && Tg(e);
    }
  };
  var Mg = a.version;
  if (Mg !== "19.2.5")
    throw Error(
      s(
        527,
        Mg,
        "19.2.5"
      )
    );
  ne.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var YE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Do = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Do.isDisabled && Do.supportsFiber)
      try {
        Zn = Do.inject(
          YE
        ), kt = Do;
      } catch {
      }
  }
  return Dr.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, r = "", u = _p, f = Lp, g = Up;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = pg(
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
      Cg
    ), e[ge] = t.current, bf(e), new Bf(t);
  }, Dr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", f = _p, g = Lp, E = Up, C = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (g = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (C = i.formState)), t = pg(
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
      Cg
    ), t.context = yg(null), i = t.current, r = sn(), r = _(r), u = Na(r), u.callback = null, za(i, u, r), i = r, t.current.lanes = i, Ln(t, i), kn(t), e[ge] = t.current, bf(e), new jo(t);
  }, Dr.version = "19.2.5", Dr;
}
var Vg;
function aT() {
  if (Vg) return kf.exports;
  Vg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), kf.exports = nT(), kf.exports;
}
var iT = aT();
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
var sb = (n) => {
  throw TypeError(n);
}, lT = (n, a, l) => a.has(n) || sb("Cannot " + l), Ff = (n, a, l) => (lT(n, a, "read from private field"), l ? l.call(n) : a.get(n)), rT = (n, a, l) => a.has(n) ? sb("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, l);
function Bg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function sT(n = {}) {
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
    let z = Ed(
      o ? m().pathname : "/",
      T,
      R,
      w,
      D
    );
    return gt(
      z.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), z;
  }
  function b(T) {
    return typeof T == "string" ? T : Fn(T);
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
      let R = typeof T == "string" ? _n(T) : T;
      return {
        pathname: R.pathname || "",
        search: R.search || "",
        hash: R.hash || ""
      };
    },
    push(T, R) {
      d = "PUSH";
      let w = Bg(T) ? T : y(T, R);
      c += 1, o.splice(c, o.length, w), s && h && h({ action: d, location: w, delta: 1 });
    },
    replace(T, R) {
      d = "REPLACE";
      let w = Bg(T) ? T : y(T, R);
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
function _e(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function gt(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function oT() {
  return Math.random().toString(36).substring(2, 10);
}
function Ed(n, a, l = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? _n(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || oT(),
    unstable_mask: o
  };
}
function Fn({
  pathname: n = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (n += l.charAt(0) === "#" ? l : "#" + l), n;
}
function _n(n) {
  let a = {};
  if (n) {
    let l = n.indexOf("#");
    l >= 0 && (a.hash = n.substring(l), n = n.substring(0, l));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function uT(n, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), _e(l, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Fn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var qr, Hg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (rT(this, qr, /* @__PURE__ */ new Map()), n)
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
    if (Ff(this, qr).has(n))
      return Ff(this, qr).get(n);
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
    Ff(this, qr).set(n, a);
  }
};
qr = /* @__PURE__ */ new WeakMap();
var cT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function fT(n) {
  return cT.has(
    n
  );
}
var dT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function hT(n) {
  return dT.has(
    n
  );
}
function mT(n) {
  return n.index === !0;
}
function Kr(n, a, l = [], s = {}, o = !1) {
  return n.map((c, d) => {
    let h = [...l, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (_e(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), _e(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), mT(c)) {
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
      ), c.children && (m.children = Kr(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function qg(n, a) {
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
function Za(n, a, l = "/") {
  return kr(n, a, l, !1);
}
function kr(n, a, l, s) {
  let o = typeof a == "string" ? _n(a) : a, c = Tn(o.pathname || "/", l);
  if (c == null)
    return null;
  let d = ob(n);
  yT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = MT(c);
    h = wT(
      d[p],
      m,
      s
    );
  }
  return h;
}
function pT(n, a) {
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
function ob(n, a = [], l = [], s = "", o = !1) {
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
    let b = xn([s, y.relativePath]), S = l.concat(y);
    d.children && d.children.length > 0 && (_e(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
    ), ob(
      d.children,
      a,
      S,
      b,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: b,
      score: TT(b, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of ub(d.path))
        c(d, h, !0, p);
  }), a;
}
function ub(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = ub(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function yT(n) {
  n.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : RT(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var gT = /^:[\w-]+$/, vT = 3, bT = 2, ST = 1, xT = 10, ET = -2, kg = (n) => n === "*";
function TT(n, a) {
  let l = n.split("/"), s = l.length;
  return l.some(kg) && (s += ET), a && (s += bT), l.filter((o) => !kg(o)).reduce(
    (o, c) => o + (gT.test(c) ? vT : c === "" ? ST : xT),
    s
  );
}
function RT(n, a) {
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
function wT(n, a, l = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", b = tu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), S = p.route;
    if (!b && m && l && !s[s.length - 1].route.index && (b = tu(
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
      pathname: xn([c, b.pathname]),
      pathnameBase: DT(
        xn([c, b.pathnameBase])
      ),
      route: S
    }), b.pathnameBase !== "/" && (c = xn([c, b.pathnameBase]));
  }
  return d;
}
function tu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [l, s] = CT(
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
function CT(n, a = !1, l = !0) {
  gt(
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
function MT(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return gt(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function Tn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let l = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(l);
  return s && s !== "/" ? null : n.slice(l) || "/";
}
function AT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : xn([n, a]);
}
var cb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Jd = (n) => cb.test(n);
function jT(n, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? _n(n) : n, c;
  return l ? (l = eh(l), l.startsWith("/") ? c = Pg(l.substring(1), "/") : c = Pg(l, a)) : c = a, {
    pathname: c,
    search: NT(s),
    hash: zT(o)
  };
}
function Pg(n, a) {
  let l = nu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? l.length > 1 && l.pop() : o !== "." && l.push(o);
  }), l.length > 1 ? l.join("/") : "/";
}
function $f(n, a, l, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function fb(n) {
  return n.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function Wd(n) {
  let a = fb(n);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function yu(n, a, l, s = !1) {
  let o;
  typeof n == "string" ? o = _n(n) : (o = { ...n }, _e(
    !o.pathname || !o.pathname.includes("?"),
    $f("?", "pathname", "search", o)
  ), _e(
    !o.pathname || !o.pathname.includes("#"),
    $f("#", "pathname", "hash", o)
  ), _e(
    !o.search || !o.search.includes("#"),
    $f("#", "search", "hash", o)
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
  let p = jT(o, h), m = d && d !== "/" && d.endsWith("/"), y = (c || d === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var eh = (n) => n.replace(/\/\/+/g, "/"), xn = (n) => eh(n.join("/")), nu = (n) => n.replace(/\/+$/, ""), DT = (n) => nu(n).replace(/^\/*/, "/"), NT = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, zT = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, OT = (n, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let s = new Headers(l.headers);
  return s.set("Location", n), new Response(null, { ...l, headers: s });
}, gu = class {
  constructor(n, a, l, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function Qr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function ts(n) {
  let a = n.map((l) => l.route.path).filter(Boolean);
  return xn(a) || "/";
}
var db = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function hb(n, a) {
  let l = n;
  if (typeof l != "string" || !cb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (db)
    try {
      let c = new URL(window.location.href), d = l.startsWith("//") ? new URL(c.protocol + l) : new URL(l), h = Tn(d.pathname, a);
      d.origin === c.origin && h != null ? l = h + d.search + d.hash : o = !0;
    } catch {
      gt(
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
var Wa = Symbol("Uninstrumented");
function _T(n, a) {
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
    let o = Cl(l.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = l[`lazy.${c}`];
      if (typeof d == "function" && h.length > 0) {
        let p = Cl(h, d, () => {
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
      let d = c[Wa] ?? c, h = Cl(
        l[o],
        d,
        (...p) => Yg(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[Wa] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[Wa] ?? o, d = Cl(
      l.middleware,
      c,
      (...h) => Yg(h[0])
    );
    return d ? (d[Wa] = c, d) : o;
  })), s;
}
function LT(n, a) {
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
    let s = n.navigate[Wa] ?? n.navigate, o = Cl(
      l.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Fn(d) : ".",
          ...Gg(n, h ?? {})
        };
      }
    );
    o && (o[Wa] = s, n.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = n.fetch[Wa] ?? n.fetch, o = Cl(l.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Gg(n, p ?? {})
      };
    });
    o && (o[Wa] = s, n.fetch = o);
  }
  return n;
}
function Cl(n, a, l) {
  return n.length === 0 ? null : async (...s) => {
    let o = await mb(
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
async function mb(n, a, l, s) {
  let o = n[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = mb(n, a, l, s - 1), c = await d, _e(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
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
function Yg(n) {
  let { request: a, context: l, params: s, unstable_pattern: o } = n;
  return {
    request: UT(a),
    params: { ...s },
    unstable_pattern: o,
    context: VT(l)
  };
}
function Gg(n, a) {
  return {
    currentUrl: Fn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function UT(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function VT(n) {
  if (HT(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var BT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function HT(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === BT;
}
var pb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], qT = new Set(
  pb
), kT = [
  "GET",
  ...pb
], PT = new Set(kT), yb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), YT = /* @__PURE__ */ new Set([307, 308]), Xf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, GT = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Nr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, FT = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), gb = "remix-router-transitions", vb = Symbol("ResetLoaderData");
function $T(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  _e(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || FT, c = o;
  if (n.unstable_instrumentations) {
    let M = n.unstable_instrumentations;
    c = (_) => ({
      ...o(_),
      ..._T(
        M.map((k) => k.route).filter(Boolean),
        _
      )
    });
  }
  let d = {}, h = Kr(
    n.routes,
    c,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = n.dataStrategy || ZT, b = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), R = null, w = null, D = null, z = n.hydrationData != null, B = Za(h, n.history.location, m), U = !1, V = null, $, Q;
  if (B == null && !n.patchRoutesOnNavigation) {
    let M = bn(404, {
      pathname: n.history.location.pathname
    }), { matches: _, route: k } = No(h);
    $ = !0, Q = !$, B = _, V = { [k.id]: M };
  } else if (B && !n.hydrationData && Ta(
    B,
    h,
    n.history.location.pathname
  ).active && (B = null), B)
    if (B.some((M) => M.route.lazy))
      $ = !1, Q = !$;
    else if (!B.some((M) => th(M.route)))
      $ = !0, Q = !$;
    else {
      let M = n.hydrationData ? n.hydrationData.loaderData : null, _ = n.hydrationData ? n.hydrationData.errors : null, k = B;
      if (_) {
        let ae = B.findIndex(
          (oe) => _[oe.route.id] !== void 0
        );
        k = k.slice(0, ae + 1);
      }
      Q = !1, $ = !0, k.forEach((ae) => {
        let oe = bb(ae.route, M, _);
        Q = Q || oe.renderFallback, $ = $ && !oe.shouldLoad;
      });
    }
  else {
    $ = !1, Q = !$, B = [];
    let M = Ta(
      null,
      h,
      n.history.location.pathname
    );
    M.active && M.matches && (U = !0, B = M.matches);
  }
  let ee, j = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: B,
    initialized: $,
    renderFallback: Q,
    navigation: Xf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || V,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Z = "POP", W = null, ie = !1, K, Y = !1, re = /* @__PURE__ */ new Map(), te = null, O = !1, ne = !1, se = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), Se = 0, A = -1, F = /* @__PURE__ */ new Map(), le = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Set(), je = /* @__PURE__ */ new Map(), ft, Fe = null;
  function Xn() {
    if (S = n.history.listen(
      ({ action: M, location: _, delta: k }) => {
        if (ft) {
          ft(), ft = void 0;
          return;
        }
        gt(
          je.size === 0 || k != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = ri({
          currentLocation: j.location,
          nextLocation: _,
          historyAction: M
        });
        if (ae && k != null) {
          let oe = new Promise((pe) => {
            ft = pe;
          });
          n.history.go(k * -1), Jn(ae, {
            state: "blocked",
            location: _,
            proceed() {
              Jn(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: _
              }), oe.then(() => n.history.go(k));
            },
            reset() {
              let pe = new Map(j.blockers);
              pe.set(ae, Nr), we({ blockers: pe });
            }
          }), W?.resolve(), W = null;
          return;
        }
        return Qn(M, _);
      }
    ), l) {
      pR(a, re);
      let M = () => yR(a, re);
      a.addEventListener("pagehide", M), te = () => a.removeEventListener("pagehide", M);
    }
    return j.initialized || Qn("POP", j.location, {
      initialHydration: !0
    }), ee;
  }
  function ba() {
    S && S(), te && te(), T.clear(), K && K.abort(), j.fetchers.forEach((M, _) => Zn(_)), j.blockers.forEach((M, _) => li(_));
  }
  function Ee(M) {
    return T.add(M), () => T.delete(M);
  }
  function we(M, _ = {}) {
    M.matches && (M.matches = M.matches.map((oe) => {
      let pe = d[oe.route.id], fe = oe.route;
      return fe.element !== pe.element || fe.errorElement !== pe.errorElement || fe.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...oe,
        route: pe
      } : oe;
    })), j = {
      ...j,
      ...M
    };
    let k = [], ae = [];
    j.fetchers.forEach((oe, pe) => {
      oe.state === "idle" && (Me.has(pe) ? k.push(pe) : ae.push(pe));
    }), Me.forEach((oe) => {
      !j.fetchers.has(oe) && !ue.has(oe) && k.push(oe);
    }), [...T].forEach(
      (oe) => oe(j, {
        deletedFetchers: k,
        newErrors: M.errors ?? null,
        viewTransitionOpts: _.viewTransitionOpts,
        flushSync: _.flushSync === !0
      })
    ), k.forEach((oe) => Zn(oe)), ae.forEach((oe) => j.fetchers.delete(oe));
  }
  function Ke(M, _, { flushSync: k } = {}) {
    let ae = j.actionData != null && j.navigation.formMethod != null && Ht(j.navigation.formMethod) && j.navigation.state === "loading" && M.state?._isRedirect !== !0, oe;
    _.actionData ? Object.keys(_.actionData).length > 0 ? oe = _.actionData : oe = null : ae ? oe = j.actionData : oe = null;
    let pe = _.loaderData ? tv(
      j.loaderData,
      _.loaderData,
      _.matches || [],
      _.errors
    ) : j.loaderData, fe = j.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((Te, be) => fe.set(be, Nr)));
    let de = O ? !1 : kl(M, _.matches || j.matches), ge = ie === !0 || j.navigation.formMethod != null && Ht(j.navigation.formMethod) && M.state?._isRedirect !== !0;
    p && (h = p, p = void 0), O || Z === "POP" || (Z === "PUSH" ? n.history.push(M, M.state) : Z === "REPLACE" && n.history.replace(M, M.state));
    let he;
    if (Z === "POP") {
      let Te = re.get(j.location.pathname);
      Te && Te.has(M.pathname) ? he = {
        currentLocation: j.location,
        nextLocation: M
      } : re.has(M.pathname) && (he = {
        currentLocation: M,
        nextLocation: j.location
      });
    } else if (Y) {
      let Te = re.get(j.location.pathname);
      Te ? Te.add(M.pathname) : (Te = /* @__PURE__ */ new Set([M.pathname]), re.set(j.location.pathname, Te)), he = {
        currentLocation: j.location,
        nextLocation: M
      };
    }
    we(
      {
        ..._,
        // matches, errors, fetchers go through as-is
        actionData: oe,
        loaderData: pe,
        historyAction: Z,
        location: M,
        initialized: !0,
        renderFallback: !1,
        navigation: Xf,
        revalidation: "idle",
        restoreScrollPosition: de,
        preventScrollReset: ge,
        blockers: fe
      },
      {
        viewTransitionOpts: he,
        flushSync: k === !0
      }
    ), Z = "POP", ie = !1, Y = !1, O = !1, ne = !1, W?.resolve(), W = null, Fe?.resolve(), Fe = null;
  }
  async function Ft(M, _) {
    if (W?.resolve(), W = null, typeof M == "number") {
      W || (W = lv());
      let We = W.promise;
      return n.history.go(M), We;
    }
    let k = Td(
      j.location,
      j.matches,
      m,
      M,
      _?.fromRouteId,
      _?.relative
    ), { path: ae, submission: oe, error: pe } = Fg(
      !1,
      k,
      _
    ), fe;
    _?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof _.unstable_mask == "string" ? _n(_.unstable_mask) : {
        ...j.location.unstable_mask,
        ..._.unstable_mask
      }
    });
    let de = j.location, ge = Ed(
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
    he === !0 ? Te = "REPLACE" : he === !1 || oe != null && Ht(oe.formMethod) && oe.formAction === j.location.pathname + j.location.search && (Te = "REPLACE");
    let be = _ && "preventScrollReset" in _ ? _.preventScrollReset === !0 : void 0, ke = (_ && _.flushSync) === !0, ze = ri({
      currentLocation: de,
      nextLocation: ge,
      historyAction: Te
    });
    if (ze) {
      Jn(ze, {
        state: "blocked",
        location: ge,
        proceed() {
          Jn(ze, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Ft(M, _);
        },
        reset() {
          let We = new Map(j.blockers);
          We.set(ze, Nr), we({ blockers: We });
        }
      });
      return;
    }
    await Qn(Te, ge, {
      submission: oe,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: be,
      replace: _ && _.replace,
      enableViewTransition: _ && _.viewTransition,
      flushSync: ke,
      callSiteDefaultShouldRevalidate: _ && _.unstable_defaultShouldRevalidate
    });
  }
  function Kn() {
    Fe || (Fe = lv()), xa(), we({ revalidation: "loading" });
    let M = Fe.promise;
    return j.navigation.state === "submitting" ? M : j.navigation.state === "idle" ? (Qn(j.historyAction, j.location, {
      startUninterruptedRevalidation: !0
    }), M) : (Qn(
      Z || j.historyAction,
      j.navigation.location,
      {
        overrideNavigation: j.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Y === !0
      }
    ), M);
  }
  async function Qn(M, _, k) {
    K && K.abort(), K = null, Z = M, O = (k && k.startUninterruptedRevalidation) === !0, Nu(j.location, j.matches), ie = (k && k.preventScrollReset) === !0, Y = (k && k.enableViewTransition) === !0;
    let ae = p || h, oe = k && k.overrideNavigation, pe = k?.initialHydration && j.matches && j.matches.length > 0 && !U ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      j.matches
    ) : Za(ae, _, m), fe = (k && k.flushSync) === !0;
    if (pe && j.initialized && !ne && lR(j.location, _) && !(k && k.submission && Ht(k.submission.formMethod))) {
      Ke(_, { matches: pe }, { flushSync: fe });
      return;
    }
    let de = Ta(pe, ae, _.pathname);
    if (de.active && de.matches && (pe = de.matches), !pe) {
      let { error: Qe, notFoundMatches: ot, route: Le } = Cn(
        _.pathname
      );
      Ke(
        _,
        {
          matches: ot,
          loaderData: {},
          errors: {
            [Le.id]: Qe
          }
        },
        { flushSync: fe }
      );
      return;
    }
    K = new AbortController();
    let ge = Rl(
      n.history,
      _,
      K.signal,
      k && k.submission
    ), he = n.getContext ? await n.getContext() : new Hg(), Te;
    if (k && k.pendingError)
      Te = [
        Ja(pe).route.id,
        { type: "error", error: k.pendingError }
      ];
    else if (k && k.submission && Ht(k.submission.formMethod)) {
      let Qe = await ds(
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
        let [ot, Le] = Qe.pendingActionResult;
        if (on(Le) && Qr(Le.error) && Le.error.status === 404) {
          K = null, Ke(_, {
            matches: Qe.matches,
            loaderData: {},
            errors: {
              [ot]: Le.error
            }
          });
          return;
        }
      }
      pe = Qe.matches || pe, Te = Qe.pendingActionResult, oe = Kf(_, k.submission), fe = !1, de.active = !1, ge = Rl(
        n.history,
        ge.url,
        ge.signal
      );
    }
    let {
      shortCircuited: be,
      matches: ke,
      loaderData: ze,
      errors: We
    } = await Bl(
      ge,
      _,
      pe,
      he,
      de.active,
      oe,
      k && k.submission,
      k && k.fetcherSubmission,
      k && k.replace,
      k && k.initialHydration === !0,
      fe,
      Te,
      k && k.callSiteDefaultShouldRevalidate
    );
    be || (K = null, Ke(_, {
      matches: ke || pe,
      ...nv(Te),
      loaderData: ze,
      errors: We
    }));
  }
  async function ds(M, _, k, ae, oe, pe, fe, de = {}) {
    xa();
    let ge = hR(_, k);
    if (we({ navigation: ge }, { flushSync: de.flushSync === !0 }), pe) {
      let be = await Ln(
        ae,
        _.pathname,
        M.signal
      );
      if (be.type === "aborted")
        return { shortCircuited: !0 };
      if (be.type === "error") {
        if (be.partialMatches.length === 0) {
          let { matches: ze, route: We } = No(h);
          return {
            matches: ze,
            pendingActionResult: [
              We.id,
              {
                type: "error",
                error: be.error
              }
            ]
          };
        }
        let ke = Ja(be.partialMatches).route.id;
        return {
          matches: be.partialMatches,
          pendingActionResult: [
            ke,
            {
              type: "error",
              error: be.error
            }
          ]
        };
      } else if (be.matches)
        ae = be.matches;
      else {
        let { notFoundMatches: ke, error: ze, route: We } = Cn(
          _.pathname
        );
        return {
          matches: ke,
          pendingActionResult: [
            We.id,
            {
              type: "error",
              error: ze
            }
          ]
        };
      }
    }
    let he, Te = Yo(ae, _);
    if (!Te.route.action && !Te.route.lazy)
      he = {
        type: "error",
        error: bn(405, {
          method: M.method,
          pathname: _.pathname,
          routeId: Te.route.id
        })
      };
    else {
      let be = Nl(
        c,
        d,
        M,
        _,
        ae,
        Te,
        fe ? [] : s,
        oe
      ), ke = await Sa(
        M,
        _,
        be,
        oe,
        null
      );
      if (he = ke[Te.route.id], !he) {
        for (let ze of ae)
          if (ke[ze.route.id]) {
            he = ke[ze.route.id];
            break;
          }
      }
      if (M.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (ji(he)) {
      let be;
      return de && de.replace != null ? be = de.replace : be = Jg(
        he.response.headers.get("Location"),
        new URL(M.url),
        m,
        n.history
      ) === j.location.pathname + j.location.search, await In(M, he, !0, {
        submission: k,
        replace: be
      }), { shortCircuited: !0 };
    }
    if (on(he)) {
      let be = Ja(ae, Te.route.id);
      return (de && de.replace) !== !0 && (Z = "PUSH"), {
        matches: ae,
        pendingActionResult: [
          be.route.id,
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
  async function Bl(M, _, k, ae, oe, pe, fe, de, ge, he, Te, be, ke) {
    let ze = pe || Kf(_, fe), We = fe || de || iv(ze), Qe = !O && !he;
    if (oe) {
      if (Qe) {
        let mt = Hi(be);
        we(
          {
            navigation: ze,
            ...mt !== void 0 ? { actionData: mt } : {}
          },
          {
            flushSync: Te
          }
        );
      }
      let Oe = await Ln(
        k,
        _.pathname,
        M.signal
      );
      if (Oe.type === "aborted")
        return { shortCircuited: !0 };
      if (Oe.type === "error") {
        if (Oe.partialMatches.length === 0) {
          let { matches: Vt, route: bt } = No(h);
          return {
            matches: Vt,
            loaderData: {},
            errors: {
              [bt.id]: Oe.error
            }
          };
        }
        let mt = Ja(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          loaderData: {},
          errors: {
            [mt]: Oe.error
          }
        };
      } else if (Oe.matches)
        k = Oe.matches;
      else {
        let { error: mt, notFoundMatches: Vt, route: bt } = Cn(
          _.pathname
        );
        return {
          matches: Vt,
          loaderData: {},
          errors: {
            [bt.id]: mt
          }
        };
      }
    }
    let ot = p || h, { dsMatches: Le, revalidatingFetchers: vt } = $g(
      M,
      ae,
      c,
      d,
      n.history,
      j,
      k,
      We,
      _,
      he ? [] : s,
      he === !0,
      ne,
      se,
      Me,
      ce,
      le,
      ot,
      m,
      n.patchRoutesOnNavigation != null,
      be,
      ke
    );
    if (A = ++Se, !n.dataStrategy && !Le.some((Oe) => Oe.shouldLoad) && !Le.some(
      (Oe) => Oe.route.middleware && Oe.route.middleware.length > 0
    ) && vt.length === 0) {
      let Oe = ms();
      return Ke(
        _,
        {
          matches: k,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: be && on(be[1]) ? { [be[0]]: be[1].error } : null,
          ...nv(be),
          ...Oe ? { fetchers: new Map(j.fetchers) } : {}
        },
        { flushSync: Te }
      ), { shortCircuited: !0 };
    }
    if (Qe) {
      let Oe = {};
      if (!oe) {
        Oe.navigation = ze;
        let mt = Hi(be);
        mt !== void 0 && (Oe.actionData = mt);
      }
      vt.length > 0 && (Oe.fetchers = Hl(vt)), we(Oe, { flushSync: Te });
    }
    vt.forEach((Oe) => {
      Mt(Oe.key), Oe.controller && ue.set(Oe.key, Oe.controller);
    });
    let nt = () => vt.forEach((Oe) => Mt(Oe.key));
    K && K.signal.addEventListener(
      "abort",
      nt
    );
    let { loaderResults: Ra, fetcherResults: Mn } = await ql(
      Le,
      vt,
      M,
      _,
      ae
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    K && K.signal.removeEventListener(
      "abort",
      nt
    ), vt.forEach((Oe) => ue.delete(Oe.key));
    let At = zo(Ra);
    if (At)
      return await In(M, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (At = zo(Mn), At)
      return le.add(At.key), await In(M, At.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: Un, errors: si } = ev(
      j,
      k,
      Ra,
      be,
      vt,
      Mn
    );
    he && j.errors && (si = { ...j.errors, ...si });
    let Vn = ms(), oi = ps(A), ki = Vn || oi || vt.length > 0;
    return {
      matches: k,
      loaderData: Un,
      errors: si,
      ...ki ? { fetchers: new Map(j.fetchers) } : {}
    };
  }
  function Hi(M) {
    if (M && !on(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (j.actionData)
      return Object.keys(j.actionData).length === 0 ? null : j.actionData;
  }
  function Hl(M) {
    return M.forEach((_) => {
      let k = j.fetchers.get(_.key), ae = zr(
        void 0,
        k ? k.data : void 0
      );
      j.fetchers.set(_.key, ae);
    }), new Map(j.fetchers);
  }
  async function Mu(M, _, k, ae) {
    Mt(M);
    let oe = (ae && ae.flushSync) === !0, pe = p || h, fe = Td(
      j.location,
      j.matches,
      m,
      k,
      _,
      ae?.relative
    ), de = Za(pe, fe, m), ge = Ta(de, pe, fe);
    if (ge.active && ge.matches && (de = ge.matches), !de) {
      un(
        M,
        _,
        bn(404, { pathname: fe }),
        { flushSync: oe }
      );
      return;
    }
    let { path: he, submission: Te, error: be } = Fg(
      !0,
      fe,
      ae
    );
    if (be) {
      un(M, _, be, { flushSync: oe });
      return;
    }
    let ke = n.getContext ? await n.getContext() : new Hg(), ze = (ae && ae.preventScrollReset) === !0;
    if (Te && Ht(Te.formMethod)) {
      await Au(
        M,
        _,
        he,
        de,
        ke,
        ge.active,
        oe,
        ze,
        Te,
        ae && ae.unstable_defaultShouldRevalidate
      );
      return;
    }
    ce.set(M, { routeId: _, path: he }), await qt(
      M,
      _,
      he,
      de,
      ke,
      ge.active,
      oe,
      ze,
      Te
    );
  }
  async function Au(M, _, k, ae, oe, pe, fe, de, ge, he) {
    xa(), ce.delete(M);
    let Te = j.fetchers.get(M);
    wn(M, mR(ge, Te), {
      flushSync: fe
    });
    let be = new AbortController(), ke = Rl(
      n.history,
      k,
      be.signal,
      ge
    );
    if (pe) {
      let at = await Ln(
        ae,
        new URL(ke.url).pathname,
        ke.signal,
        M
      );
      if (at.type === "aborted")
        return;
      if (at.type === "error") {
        un(M, _, at.error, { flushSync: fe });
        return;
      } else if (at.matches)
        ae = at.matches;
      else {
        un(
          M,
          _,
          bn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let ze = Yo(ae, k);
    if (!ze.route.action && !ze.route.lazy) {
      let at = bn(405, {
        method: ge.formMethod,
        pathname: k,
        routeId: _
      });
      un(M, _, at, { flushSync: fe });
      return;
    }
    ue.set(M, be);
    let We = Se, Qe = Nl(
      c,
      d,
      ke,
      k,
      ae,
      ze,
      s,
      oe
    ), ot = await Sa(
      ke,
      k,
      Qe,
      oe,
      M
    ), Le = ot[ze.route.id];
    if (!Le) {
      for (let at of Qe)
        if (ot[at.route.id]) {
          Le = ot[at.route.id];
          break;
        }
    }
    if (ke.signal.aborted) {
      ue.get(M) === be && ue.delete(M);
      return;
    }
    if (Me.has(M)) {
      if (ji(Le) || on(Le)) {
        wn(M, ya(void 0));
        return;
      }
    } else {
      if (ji(Le))
        if (ue.delete(M), A > We) {
          wn(M, ya(void 0));
          return;
        } else
          return le.add(M), wn(M, zr(ge)), In(ke, Le, !1, {
            fetcherSubmission: ge,
            preventScrollReset: de
          });
      if (on(Le)) {
        un(M, _, Le.error);
        return;
      }
    }
    let vt = j.navigation.location || j.location, nt = Rl(
      n.history,
      vt,
      be.signal
    ), Ra = p || h, Mn = j.navigation.state !== "idle" ? Za(Ra, j.navigation.location, m) : j.matches;
    _e(Mn, "Didn't find any matches after fetcher action");
    let At = ++Se;
    F.set(M, At);
    let Un = zr(ge, Le.data);
    j.fetchers.set(M, Un);
    let { dsMatches: si, revalidatingFetchers: Vn } = $g(
      nt,
      oe,
      c,
      d,
      n.history,
      j,
      Mn,
      ge,
      vt,
      s,
      !1,
      ne,
      se,
      Me,
      ce,
      le,
      Ra,
      m,
      n.patchRoutesOnNavigation != null,
      [ze.route.id, Le],
      he
    );
    Vn.filter((at) => at.key !== M).forEach((at) => {
      let Pi = at.key, Yi = j.fetchers.get(Pi), bs = zr(
        void 0,
        Yi ? Yi.data : void 0
      );
      j.fetchers.set(Pi, bs), Mt(Pi), at.controller && ue.set(Pi, at.controller);
    }), we({ fetchers: new Map(j.fetchers) });
    let oi = () => Vn.forEach((at) => Mt(at.key));
    be.signal.addEventListener(
      "abort",
      oi
    );
    let { loaderResults: ki, fetcherResults: Oe } = await ql(
      si,
      Vn,
      nt,
      vt,
      oe
    );
    if (be.signal.aborted)
      return;
    if (be.signal.removeEventListener(
      "abort",
      oi
    ), F.delete(M), ue.delete(M), Vn.forEach((at) => ue.delete(at.key)), j.fetchers.has(M)) {
      let at = ya(Le.data);
      j.fetchers.set(M, at);
    }
    let mt = zo(ki);
    if (mt)
      return In(
        nt,
        mt.result,
        !1,
        { preventScrollReset: de }
      );
    if (mt = zo(Oe), mt)
      return le.add(mt.key), In(
        nt,
        mt.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: Vt, errors: bt } = ev(
      j,
      Mn,
      ki,
      void 0,
      Vn,
      Oe
    );
    ps(At), j.navigation.state === "loading" && At > A ? (_e(Z, "Expected pending action"), K && K.abort(), Ke(j.navigation.location, {
      matches: Mn,
      loaderData: Vt,
      errors: bt,
      fetchers: new Map(j.fetchers)
    })) : (we({
      errors: bt,
      loaderData: tv(
        j.loaderData,
        Vt,
        Mn,
        bt
      ),
      fetchers: new Map(j.fetchers)
    }), ne = !1);
  }
  async function qt(M, _, k, ae, oe, pe, fe, de, ge) {
    let he = j.fetchers.get(M);
    wn(
      M,
      zr(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: fe }
    );
    let Te = new AbortController(), be = Rl(
      n.history,
      k,
      Te.signal
    );
    if (pe) {
      let Le = await Ln(
        ae,
        new URL(be.url).pathname,
        be.signal,
        M
      );
      if (Le.type === "aborted")
        return;
      if (Le.type === "error") {
        un(M, _, Le.error, { flushSync: fe });
        return;
      } else if (Le.matches)
        ae = Le.matches;
      else {
        un(
          M,
          _,
          bn(404, { pathname: k }),
          { flushSync: fe }
        );
        return;
      }
    }
    let ke = Yo(ae, k);
    ue.set(M, Te);
    let ze = Se, We = Nl(
      c,
      d,
      be,
      k,
      ae,
      ke,
      s,
      oe
    ), Qe = await Sa(
      be,
      k,
      We,
      oe,
      M
    ), ot = Qe[ke.route.id];
    if (!ot) {
      for (let Le of ae)
        if (Qe[Le.route.id]) {
          ot = Qe[Le.route.id];
          break;
        }
    }
    if (ue.get(M) === Te && ue.delete(M), !be.signal.aborted) {
      if (Me.has(M)) {
        wn(M, ya(void 0));
        return;
      }
      if (ji(ot))
        if (A > ze) {
          wn(M, ya(void 0));
          return;
        } else {
          le.add(M), await In(be, ot, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (on(ot)) {
        un(M, _, ot.error);
        return;
      }
      wn(M, ya(ot.data));
    }
  }
  async function In(M, _, k, {
    submission: ae,
    fetcherSubmission: oe,
    preventScrollReset: pe,
    replace: fe
  } = {}) {
    k || (W?.resolve(), W = null), _.response.headers.has("X-Remix-Revalidate") && (ne = !0);
    let de = _.response.headers.get("Location");
    _e(de, "Expected a Location header on the redirect Response"), de = Jg(
      de,
      new URL(M.url),
      m,
      n.history
    );
    let ge = Ed(j.location, de, {
      _isRedirect: !0
    });
    if (l) {
      let We = !1;
      if (_.response.headers.has("X-Remix-Reload-Document"))
        We = !0;
      else if (Jd(de)) {
        const Qe = uT(de, !0);
        We = // Hard reload if it's an absolute URL to a new origin
        Qe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Tn(Qe.pathname, m) == null;
      }
      if (We) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    K = null;
    let he = fe === !0 || _.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Te, formAction: be, formEncType: ke } = j.navigation;
    !ae && !oe && Te && be && ke && (ae = iv(j.navigation));
    let ze = ae || oe;
    if (YT.has(_.response.status) && ze && Ht(ze.formMethod))
      await Qn(he, ge, {
        submission: {
          ...ze,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || ie,
        enableViewTransition: k ? Y : void 0
      });
    else {
      let We = Kf(
        ge,
        ae
      );
      await Qn(he, ge, {
        overrideNavigation: We,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: oe,
        // Preserve these flags across redirects
        preventScrollReset: pe || ie,
        enableViewTransition: k ? Y : void 0
      });
    }
  }
  async function Sa(M, _, k, ae, oe) {
    let pe, fe = {};
    try {
      pe = await WT(
        y,
        M,
        _,
        k,
        oe,
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
    if (!Ht(M.method))
      for (let de of k) {
        if (pe[de.route.id]?.type === "error")
          break;
        !pe.hasOwnProperty(de.route.id) && !j.loaderData.hasOwnProperty(de.route.id) && (!j.errors || !j.errors.hasOwnProperty(de.route.id)) && de.shouldCallHandler() && (pe[de.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${de.route.id}`
          )
        });
      }
    for (let [de, ge] of Object.entries(pe))
      if (uR(ge)) {
        let he = ge.result;
        fe[de] = {
          type: "redirect",
          response: aR(
            he,
            M,
            de,
            k,
            m
          )
        };
      } else
        fe[de] = await nR(ge);
    return fe;
  }
  async function ql(M, _, k, ae, oe) {
    let pe = Sa(
      k,
      ae,
      M,
      oe,
      null
    ), fe = Promise.all(
      _.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let be = (await Sa(
            he.request,
            he.path,
            he.matches,
            oe,
            he.key
          ))[he.match.route.id];
          return { [he.key]: be };
        } else
          return Promise.resolve({
            [he.key]: {
              type: "error",
              error: bn(404, {
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
  function xa() {
    ne = !0, ce.forEach((M, _) => {
      ue.has(_) && se.add(_), Mt(_);
    });
  }
  function wn(M, _, k = {}) {
    j.fetchers.set(M, _), we(
      { fetchers: new Map(j.fetchers) },
      { flushSync: (k && k.flushSync) === !0 }
    );
  }
  function un(M, _, k, ae = {}) {
    let oe = Ja(j.matches, _);
    Zn(M), we(
      {
        errors: {
          [oe.route.id]: k
        },
        fetchers: new Map(j.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function hs(M) {
    return Re.set(M, (Re.get(M) || 0) + 1), Me.has(M) && Me.delete(M), j.fetchers.get(M) || GT;
  }
  function ju(M, _) {
    Mt(M, _?.reason), wn(M, ya(null));
  }
  function Zn(M) {
    let _ = j.fetchers.get(M);
    ue.has(M) && !(_ && _.state === "loading" && F.has(M)) && Mt(M), ce.delete(M), F.delete(M), le.delete(M), Me.delete(M), se.delete(M), j.fetchers.delete(M);
  }
  function kt(M) {
    let _ = (Re.get(M) || 0) - 1;
    _ <= 0 ? (Re.delete(M), Me.add(M)) : Re.set(M, _), we({ fetchers: new Map(j.fetchers) });
  }
  function Mt(M, _) {
    let k = ue.get(M);
    k && (k.abort(_), ue.delete(M));
  }
  function Ut(M) {
    for (let _ of M) {
      let k = hs(_), ae = ya(k.data);
      j.fetchers.set(_, ae);
    }
  }
  function ms() {
    let M = [], _ = !1;
    for (let k of le) {
      let ae = j.fetchers.get(k);
      _e(ae, `Expected fetcher: ${k}`), ae.state === "loading" && (le.delete(k), M.push(k), _ = !0);
    }
    return Ut(M), _;
  }
  function ps(M) {
    let _ = [];
    for (let [k, ae] of F)
      if (ae < M) {
        let oe = j.fetchers.get(k);
        _e(oe, `Expected fetcher: ${k}`), oe.state === "loading" && (Mt(k), F.delete(k), _.push(k));
      }
    return Ut(_), _.length > 0;
  }
  function Du(M, _) {
    let k = j.blockers.get(M) || Nr;
    return je.get(M) !== _ && je.set(M, _), k;
  }
  function li(M) {
    j.blockers.delete(M), je.delete(M);
  }
  function Jn(M, _) {
    let k = j.blockers.get(M) || Nr;
    _e(
      k.state === "unblocked" && _.state === "blocked" || k.state === "blocked" && _.state === "blocked" || k.state === "blocked" && _.state === "proceeding" || k.state === "blocked" && _.state === "unblocked" || k.state === "proceeding" && _.state === "unblocked",
      `Invalid blocker state transition: ${k.state} -> ${_.state}`
    );
    let ae = new Map(j.blockers);
    ae.set(M, _), we({ blockers: ae });
  }
  function ri({
    currentLocation: M,
    nextLocation: _,
    historyAction: k
  }) {
    if (je.size === 0)
      return;
    je.size > 1 && gt(!1, "A router only supports one blocker at a time");
    let ae = Array.from(je.entries()), [oe, pe] = ae[ae.length - 1], fe = j.blockers.get(oe);
    if (!(fe && fe.state === "proceeding") && pe({ currentLocation: M, nextLocation: _, historyAction: k }))
      return oe;
  }
  function Cn(M) {
    let _ = bn(404, { pathname: M }), k = p || h, { matches: ae, route: oe } = No(k);
    return { notFoundMatches: ae, route: oe, error: _ };
  }
  function qi(M, _, k) {
    if (R = M, D = _, w = k || null, !z && j.navigation === Xf) {
      z = !0;
      let ae = kl(j.location, j.matches);
      ae != null && we({ restoreScrollPosition: ae });
    }
    return () => {
      R = null, D = null, w = null;
    };
  }
  function Ea(M, _) {
    return w && w(
      M,
      _.map((ae) => pT(ae, j.loaderData))
    ) || M.key;
  }
  function Nu(M, _) {
    if (R && D) {
      let k = Ea(M, _);
      R[k] = D();
    }
  }
  function kl(M, _) {
    if (R) {
      let k = Ea(M, _), ae = R[k];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function Ta(M, _, k) {
    if (n.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: kr(
            _,
            k,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: kr(
          _,
          k,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function Ln(M, _, k, ae) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let oe = M;
    for (; ; ) {
      let pe = p == null, fe = p || h, de = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: k,
          path: _,
          matches: oe,
          fetcherKey: ae,
          patch: (Te, be) => {
            k.aborted || Xg(
              Te,
              be,
              fe,
              de,
              c,
              !1
            );
          }
        });
      } catch (Te) {
        return { type: "error", error: Te, partialMatches: oe };
      } finally {
        pe && !k.aborted && (h = [...h]);
      }
      if (k.aborted)
        return { type: "aborted" };
      let ge = Za(fe, _, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = kr(
          fe,
          _,
          m,
          !0
        ), !(he && oe.length < he.length && ys(
          oe,
          he.slice(0, oe.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = kr(
        fe,
        _,
        m,
        !0
      )), !he || ys(oe, he))
        return { type: "success", matches: null };
      oe = he;
    }
  }
  function ys(M, _) {
    return M.length === _.length && M.every((k, ae) => k.route.id === _[ae].route.id);
  }
  function gs(M) {
    d = {}, p = Kr(
      M,
      c,
      void 0,
      d
    );
  }
  function vs(M, _, k = !1) {
    let ae = p == null;
    Xg(
      M,
      _,
      p || h,
      d,
      c,
      k
    ), ae && (h = [...h], we({}));
  }
  return ee = {
    get basename() {
      return m;
    },
    get future() {
      return b;
    },
    get state() {
      return j;
    },
    get routes() {
      return h;
    },
    get window() {
      return a;
    },
    initialize: Xn,
    subscribe: Ee,
    enableScrollRestoration: qi,
    navigate: Ft,
    fetch: Mu,
    revalidate: Kn,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => n.history.createHref(M),
    encodeLocation: (M) => n.history.encodeLocation(M),
    getFetcher: hs,
    resetFetcher: ju,
    deleteFetcher: kt,
    dispose: ba,
    getBlocker: Du,
    deleteBlocker: li,
    patchRoutes: vs,
    _internalFetchControllers: ue,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: gs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      we(M);
    }
  }, n.unstable_instrumentations && (ee = LT(
    ee,
    n.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), ee;
}
function XT(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Td(n, a, l, s, o, c) {
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
    Wd(d),
    Tn(n.pathname, l) || n.pathname,
    c === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = ah(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), b = y.getAll("index");
      y.delete("index"), b.filter((T) => T).forEach((T) => y.append("index", T));
      let S = y.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return l !== "/" && (p.pathname = AT({ basename: l, pathname: p.pathname })), Fn(p);
}
function Fg(n, a, l) {
  if (!l || !XT(l))
    return { path: a };
  if (l.formMethod && !dR(l.formMethod))
    return {
      path: a,
      error: bn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: bn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), d = Cb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Ht(c))
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
      if (!Ht(c))
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
    h = wd(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = wd(l.body), p = l.body;
  else if (l.body instanceof URLSearchParams)
    h = l.body, p = Wg(h);
  else if (l.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(l.body), p = Wg(h);
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
  if (Ht(m.formMethod))
    return { path: a, submission: m };
  let y = _n(a);
  return n && y.search && ah(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Fn(y), submission: m };
}
function $g(n, a, l, s, o, c, d, h, p, m, y, b, S, T, R, w, D, z, B, U, V) {
  let $ = U ? on(U[1]) ? U[1].error : U[1].data : void 0, Q = o.createURL(c.location), ee = o.createURL(p), j;
  if (y && c.errors) {
    let te = Object.keys(c.errors)[0];
    j = d.findIndex((O) => O.route.id === te);
  } else if (U && on(U[1])) {
    let te = U[0];
    j = d.findIndex((O) => O.route.id === te) - 1;
  }
  let Z = U ? U[1].statusCode : void 0, W = Z && Z >= 400, ie = {
    currentUrl: Q,
    currentParams: c.matches[0]?.params || {},
    nextUrl: ee,
    nextParams: d[0].params,
    ...h,
    actionResult: $,
    actionStatus: Z
  }, K = ts(d), Y = d.map((te, O) => {
    let { route: ne } = te, se = null;
    if (j != null && O > j)
      se = !1;
    else if (ne.lazy)
      se = !0;
    else if (!th(ne))
      se = !1;
    else if (y) {
      let { shouldLoad: F } = bb(
        ne,
        c.loaderData,
        c.errors
      );
      se = F;
    } else KT(c.loaderData, c.matches[O], te) && (se = !0);
    if (se !== null)
      return Rd(
        l,
        s,
        n,
        p,
        K,
        te,
        m,
        a,
        se
      );
    let ue = !1;
    typeof V == "boolean" ? ue = V : W ? ue = !1 : (b || Q.pathname + Q.search === ee.pathname + ee.search || Q.search !== ee.search || QT(c.matches[O], te)) && (ue = !0);
    let Se = {
      ...ie,
      defaultShouldRevalidate: ue
    }, A = Yr(te, Se);
    return Rd(
      l,
      s,
      n,
      p,
      K,
      te,
      m,
      a,
      A,
      Se,
      V
    );
  }), re = [];
  return R.forEach((te, O) => {
    if (y || !d.some((ce) => ce.route.id === te.routeId) || T.has(O))
      return;
    let ne = c.fetchers.get(O), se = ne && ne.state !== "idle" && ne.data === void 0, ue = Za(D, te.path, z);
    if (!ue) {
      if (B && se)
        return;
      re.push({
        key: O,
        routeId: te.routeId,
        path: te.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (w.has(O))
      return;
    let Se = Yo(ue, te.path), A = new AbortController(), F = Rl(
      o,
      te.path,
      A.signal
    ), le = null;
    if (S.has(O))
      S.delete(O), le = Nl(
        l,
        s,
        F,
        te.path,
        ue,
        Se,
        m,
        a
      );
    else if (se)
      b && (le = Nl(
        l,
        s,
        F,
        te.path,
        ue,
        Se,
        m,
        a
      ));
    else {
      let ce;
      typeof V == "boolean" ? ce = V : W ? ce = !1 : ce = b;
      let Re = {
        ...ie,
        defaultShouldRevalidate: ce
      };
      Yr(Se, Re) && (le = Nl(
        l,
        s,
        F,
        te.path,
        ue,
        Se,
        m,
        a,
        Re
      ));
    }
    le && re.push({
      key: O,
      routeId: te.routeId,
      path: te.path,
      matches: le,
      match: Se,
      request: F,
      controller: A
    });
  }), { dsMatches: Y, revalidatingFetchers: re };
}
function th(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function bb(n, a, l) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!th(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = l != null && l[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function KT(n, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !n.hasOwnProperty(l.route.id);
  return s || o;
}
function QT(n, a) {
  let l = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Yr(n, a) {
  if (n.route.shouldRevalidate) {
    let l = n.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function Xg(n, a, l, s, o, c) {
  let d;
  if (n) {
    let m = s[n];
    _e(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = l;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = d.find(
      (b) => Sb(m, b)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Kr(
      h,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: b } = p[m], S = y, [T] = Kr(
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
function Sb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (l, s) => a.children?.some((o) => Sb(l, o))
  ) ?? !1 : !1;
}
var Kg = /* @__PURE__ */ new WeakMap(), xb = ({
  key: n,
  route: a,
  manifest: l,
  mapRouteProperties: s
}) => {
  let o = l[a.id];
  if (_e(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let d = Kg.get(o);
  d || (d = {}, Kg.set(o, d));
  let h = d[n];
  if (h)
    return h;
  let p = (async () => {
    let m = fT(n), b = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      gt(
        !m,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), d[n] = Promise.resolve();
    else if (b)
      gt(
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
}, Qg = /* @__PURE__ */ new WeakMap();
function IT(n, a, l, s, o) {
  let c = l[n.id];
  if (_e(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let y = Qg.get(c);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let b = (async () => {
      _e(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), T = {};
      for (let R in S) {
        let w = S[R];
        if (w === void 0)
          continue;
        let D = hT(R), B = c[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        D ? gt(
          !D,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : B ? gt(
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
    return Qg.set(c, b), b.catch(() => {
    }), {
      lazyRoutePromise: b,
      lazyHandlerPromise: b
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let y of d) {
    if (o && o.includes(y))
      continue;
    let b = xb({
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
async function Ig(n) {
  let a = n.matches.filter((o) => o.shouldLoad), l = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    l[a[c].route.id] = o;
  }), l;
}
async function ZT(n) {
  return n.matches.some((a) => a.route.middleware) ? Eb(n, () => Ig(n)) : Ig(n);
}
function Eb(n, a) {
  return JT(
    n,
    a,
    (s) => {
      if (fR(s))
        throw s;
      return s;
    },
    sR,
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
      ), p = Ja(
        d,
        d[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function JT(n, a, l, s, o) {
  let { matches: c, ...d } = n, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await Tb(
    d,
    h,
    a,
    l,
    s,
    o
  );
}
async function Tb(n, a, l, s, o, c, d = 0) {
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
      return b = { value: await Tb(
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
function Rb(n, a, l, s, o) {
  let c = xb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = IT(
    s.route,
    Ht(l.method) ? "action" : "loader",
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
function Rd(n, a, l, s, o, c, d, h, p, m = null, y) {
  let b = !1, S = Rb(
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
      return b = !0, m ? typeof y == "boolean" ? Yr(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof T == "boolean" ? Yr(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : Yr(c, m) : p;
    },
    resolve(T) {
      let { lazy: R, loader: w, middleware: D } = c.route, z = b || p || T && !Ht(l.method) && (R || w), B = D && D.length > 0 && !w && !R;
      return z && (Ht(l.method) || !B) ? eR({
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
function Nl(n, a, l, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Rb(
      n,
      a,
      l,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Rd(
    n,
    a,
    l,
    s,
    ts(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function WT(n, a, l, s, o, c, d) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: wb(a, l),
    unstable_pattern: ts(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let b = h;
      return Eb(b, () => y({
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
async function eR({
  request: n,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, y = Ht(n.method), b = y ? "action" : "loader", S = (T) => {
    let R, w = new Promise((B, U) => R = U);
    m = () => R(), n.signal.addEventListener("abort", m);
    let D = (B) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: wb(n, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...B !== void 0 ? [B] : []
    ), z = (async () => {
      try {
        return { type: "data", result: await (d ? d((U) => D(U)) : D()) };
      } catch (B) {
        return { type: "error", result: B };
      }
    })();
    return Promise.race([z, w]);
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
          throw bn(405, {
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
      throw bn(404, {
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
async function tR(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function nR(n) {
  let { result: a, type: l } = n;
  if (nh(a)) {
    let s;
    try {
      s = await tR(a);
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
  return l === "error" ? av(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: rR(a),
    statusCode: Qr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Qr(a) ? a.status : void 0
  } : av(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function aR(n, a, l, s, o) {
  let c = n.headers.get("Location");
  if (_e(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Jd(c)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === l) + 1
    );
    c = Td(
      new URL(a.url),
      d,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var Zg = [
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
function Jg(n, a, l, s) {
  if (Jd(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Zg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let d = Tn(c.pathname, l) != null;
    if (c.origin === a.origin && d)
      return eh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Zg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function Rl(n, a, l, s) {
  let o = n.createURL(Cb(a)).toString(), c = { signal: l };
  if (s && Ht(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = wd(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function wb(n, a) {
  let l = new URL(n.url), s = typeof a == "string" ? _n(a) : a;
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
function wd(n) {
  let a = new URLSearchParams();
  for (let [l, s] of n.entries())
    a.append(l, typeof s == "string" ? s : s.name);
  return a;
}
function Wg(n) {
  let a = new FormData();
  for (let [l, s] of n.entries())
    a.append(l, s);
  return a;
}
function iR(n, a, l, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, y = l && on(l[1]) ? l[1].error : void 0;
  return n.forEach((b) => {
    if (!(b.route.id in a))
      return;
    let S = b.route.id, T = a[S];
    if (_e(
      !ji(T),
      "Cannot handle redirect results in processLoaderData"
    ), on(T)) {
      let R = T.error;
      if (y !== void 0 && (R = y, y = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let w = Ja(n, S);
        d[w.route.id] == null && (d[w.route.id] = R);
      }
      s || (c[S] = vb), p || (p = !0, h = Qr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
    } else
      c[S] = T.data, T.statusCode && T.statusCode !== 200 && !p && (h = T.statusCode), T.headers && (m[S] = T.headers);
  }), y !== void 0 && l && (d = { [l[0]]: y }, l[2] && (c[l[2]] = void 0)), {
    loaderData: c,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function ev(n, a, l, s, o, c) {
  let { loaderData: d, errors: h } = iR(
    a,
    l,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: b } = p;
    if (b && b.signal.aborted)
      return;
    let S = c[m];
    if (_e(S, "Did not find corresponding fetcher result"), on(S)) {
      let T = Ja(n.matches, y?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (ji(S))
      _e(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = ya(S.data);
      n.fetchers.set(m, T);
    }
  }), { loaderData: d, errors: h };
}
function tv(n, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== vb).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of l) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && c.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function nv(n) {
  return n ? on(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function Ja(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function No(n) {
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
function bn(n, {
  pathname: a,
  routeId: l,
  method: s,
  type: o,
  message: c
} = {}) {
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && l ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", h = `Route "${l}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && l ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new gu(
    n || 500,
    d,
    new Error(h),
    !0
  );
}
function zo(n) {
  let a = Object.entries(n);
  for (let l = a.length - 1; l >= 0; l--) {
    let [s, o] = a[l];
    if (ji(o))
      return { key: s, result: o };
  }
}
function Cb(n) {
  let a = typeof n == "string" ? _n(n) : n;
  return Fn({ ...a, hash: "" });
}
function lR(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function rR(n) {
  return new gu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function sR(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, l]) => typeof a == "string" && oR(l)
  );
}
function oR(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function uR(n) {
  return nh(n.result) && yb.has(n.result.status);
}
function on(n) {
  return n.type === "error";
}
function ji(n) {
  return (n && n.type) === "redirect";
}
function av(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function nh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function cR(n) {
  return yb.has(n);
}
function fR(n) {
  return nh(n) && cR(n.status) && n.headers.has("Location");
}
function dR(n) {
  return PT.has(n.toUpperCase());
}
function Ht(n) {
  return qT.has(n.toUpperCase());
}
function ah(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Yo(n, a) {
  let l = typeof a == "string" ? _n(a).search : a.search;
  if (n[n.length - 1].route.index && ah(l || ""))
    return n[n.length - 1];
  let s = fb(n);
  return s[s.length - 1];
}
function iv(n) {
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
function Kf(n, a) {
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
function hR(n, a) {
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
function mR(n, a) {
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
function ya(n) {
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
function pR(n, a) {
  try {
    let l = n.sessionStorage.getItem(
      gb
    );
    if (l) {
      let s = JSON.parse(l);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function yR(n, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      n.sessionStorage.setItem(
        gb,
        JSON.stringify(l)
      );
    } catch (s) {
      gt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function lv() {
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
var Li = x.createContext(null);
Li.displayName = "DataRouter";
var ns = x.createContext(null);
ns.displayName = "DataRouterState";
var Mb = x.createContext(!1);
function Ab() {
  return x.useContext(Mb);
}
var ih = x.createContext({
  isTransitioning: !1
});
ih.displayName = "ViewTransition";
var jb = x.createContext(
  /* @__PURE__ */ new Map()
);
jb.displayName = "Fetchers";
var gR = x.createContext(null);
gR.displayName = "Await";
var Rn = x.createContext(
  null
);
Rn.displayName = "Navigation";
var vu = x.createContext(
  null
);
vu.displayName = "Location";
var ga = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ga.displayName = "Route";
var lh = x.createContext(null);
lh.displayName = "RouteError";
var Db = "REACT_ROUTER_ERROR", vR = "REDIRECT", bR = "ROUTE_ERROR_RESPONSE";
function SR(n) {
  if (n.startsWith(`${Db}:${vR}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function xR(n) {
  if (n.startsWith(
    `${Db}:${bR}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new gu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function ER(n, { relative: a } = {}) {
  _e(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: s } = x.useContext(Rn), { hash: o, pathname: c, search: d } = is(n, { relative: a }), h = c;
  return l !== "/" && (h = c === "/" ? l : xn([l, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function as() {
  return x.useContext(vu) != null;
}
function va() {
  return _e(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(vu).location;
}
var Nb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function zb(n) {
  x.useContext(Rn).static || x.useLayoutEffect(n);
}
function Ui() {
  let { isDataRoute: n } = x.useContext(ga);
  return n ? _R() : TR();
}
function TR() {
  _e(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(Li), { basename: a, navigator: l } = x.useContext(Rn), { matches: s } = x.useContext(ga), { pathname: o } = va(), c = JSON.stringify(Wd(s)), d = x.useRef(!1);
  return zb(() => {
    d.current = !0;
  }), x.useCallback(
    (p, m = {}) => {
      if (gt(d.current, Nb), !d.current) return;
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
      n == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : xn([a, y.pathname])), (m.replace ? l.replace : l.push)(
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
function is(n, { relative: a } = {}) {
  let { matches: l } = x.useContext(ga), { pathname: s } = va(), o = JSON.stringify(Wd(l));
  return x.useMemo(
    () => yu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function RR(n, a, l) {
  _e(
    as(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(Rn), { matches: o } = x.useContext(ga), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    Lb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = va(), b;
  b = y;
  let S = b.pathname || "/", T = S;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let R = Za(n, { pathname: T });
  return gt(
    m || R != null,
    `No routes matched location "${b.pathname}${b.search}${b.hash}" `
  ), gt(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), jR(
    R && R.map(
      (D) => Object.assign({}, D, {
        params: Object.assign({}, d, D.params),
        pathname: xn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            D.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : D.pathname
        ]),
        pathnameBase: D.pathnameBase === "/" ? p : xn([
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
function wR() {
  let n = OR(), a = Qr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), l = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ x.createElement("pre", { style: o }, l) : null, d);
}
var CR = /* @__PURE__ */ x.createElement(wR, null), Ob = class extends x.Component {
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
      const l = xR(n.digest);
      l && (n = l);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ga.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      lh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(MR, { error: n }, a) : a;
  }
};
Ob.contextType = Mb;
var Qf = /* @__PURE__ */ new WeakMap();
function MR({
  children: n,
  error: a
}) {
  let { basename: l } = x.useContext(Rn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = SR(a.digest);
    if (s) {
      let o = Qf.get(a);
      if (o) throw o;
      let c = hb(s.location, l);
      if (db && !Qf.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Qf.set(a, d), d;
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
function AR({ routeContext: n, match: a, children: l }) {
  let s = x.useContext(Li);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ga.Provider, { value: n }, l);
}
function jR(n, a = [], l) {
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
      unstable_pattern: ts(s.matches),
      errorInfo: b
    });
  } : void 0;
  return o.reduceRight(
    (y, b, S) => {
      let T, R = !1, w = null, D = null;
      s && (T = c && b.route.id ? c[b.route.id] : void 0, w = b.route.errorElement || CR, d && (h < 0 && S === 0 ? (Lb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, D = null) : h === S && (R = !0, D = b.route.hydrateFallbackElement || null)));
      let z = a.concat(o.slice(0, S + 1)), B = () => {
        let U;
        return T ? U = w : R ? U = D : b.route.Component ? U = /* @__PURE__ */ x.createElement(b.route.Component, null) : b.route.element ? U = b.route.element : U = y, /* @__PURE__ */ x.createElement(
          AR,
          {
            match: b,
            routeContext: {
              outlet: y,
              matches: z,
              isDataRoute: s != null
            },
            children: U
          }
        );
      };
      return s && (b.route.ErrorBoundary || b.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        Ob,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: T,
          children: B(),
          routeContext: { outlet: null, matches: z, isDataRoute: !0 },
          onError: m
        }
      ) : B();
    },
    null
  );
}
function rh(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function DR(n) {
  let a = x.useContext(Li);
  return _e(a, rh(n)), a;
}
function _b(n) {
  let a = x.useContext(ns);
  return _e(a, rh(n)), a;
}
function NR(n) {
  let a = x.useContext(ga);
  return _e(a, rh(n)), a;
}
function bu(n) {
  let a = NR(n), l = a.matches[a.matches.length - 1];
  return _e(
    l.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function zR() {
  return bu(
    "useRouteId"
    /* UseRouteId */
  );
}
function ls() {
  let n = _b(
    "useLoaderData"
    /* UseLoaderData */
  ), a = bu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function OR() {
  let n = x.useContext(lh), a = _b(
    "useRouteError"
    /* UseRouteError */
  ), l = bu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[l];
}
function _R() {
  let { router: n } = DR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = bu(
    "useNavigate"
    /* UseNavigateStable */
  ), l = x.useRef(!1);
  return zb(() => {
    l.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      gt(l.current, Nb), l.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var rv = {};
function Lb(n, a, l) {
  !a && !rv[n] && (rv[n] = !0, gt(!1, l));
}
var sv = {};
function ov(n, a) {
  !n && !sv[a] && (sv[a] = !0, console.warn(a));
}
var LR = "useOptimistic", uv = ZE[LR], UR = () => {
};
function VR(n) {
  return uv ? uv(n) : [n, UR];
}
function BR(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && gt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && gt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && gt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var HR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function qR(n, a) {
  return $T({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: sT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: HR,
    mapRouteProperties: BR,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var kR = class {
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
function PR({
  router: n,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = Ab() || s;
  let [c, d] = x.useState(n.state), [h, p] = VR(c), [m, y] = x.useState(), [b, S] = x.useState({
    isTransitioning: !1
  }), [T, R] = x.useState(), [w, D] = x.useState(), [z, B] = x.useState(), U = x.useRef(/* @__PURE__ */ new Map()), V = x.useCallback(
    (Z, { deletedFetchers: W, newErrors: ie, flushSync: K, viewTransitionOpts: Y }) => {
      ie && l && Object.values(ie).forEach(
        (te) => l(te, {
          location: Z.location,
          params: Z.matches[0]?.params ?? {},
          unstable_pattern: ts(Z.matches)
        })
      ), Z.fetchers.forEach((te, O) => {
        te.data !== void 0 && U.current.set(O, te.data);
      }), W.forEach((te) => U.current.delete(te)), ov(
        K === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let re = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (ov(
        Y == null || re,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Y || !re) {
        a && K ? a(() => d(Z)) : s === !1 ? d(Z) : x.startTransition(() => {
          s === !0 && p((te) => cv(te, Z)), d(Z);
        });
        return;
      }
      if (a && K) {
        a(() => {
          w && (T?.resolve(), w.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Y.currentLocation,
            nextLocation: Y.nextLocation
          });
        });
        let te = n.window.document.startViewTransition(() => {
          a(() => d(Z));
        });
        te.finished.finally(() => {
          a(() => {
            R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => D(te));
        return;
      }
      w ? (T?.resolve(), w.skipTransition(), B({
        state: Z,
        currentLocation: Y.currentLocation,
        nextLocation: Y.nextLocation
      })) : (y(Z), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: Y.currentLocation,
        nextLocation: Y.nextLocation
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
  let $ = h.initialized;
  x.useLayoutEffect(() => {
    !$ && n.state.initialized && V(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [$, V, n.state]), x.useEffect(() => {
    b.isTransitioning && !b.flushSync && R(new kR());
  }, [b]), x.useEffect(() => {
    if (T && m && n.window) {
      let Z = m, W = T.promise, ie = n.window.document.startViewTransition(async () => {
        s === !1 ? d(Z) : x.startTransition(() => {
          s === !0 && p((K) => cv(K, Z)), d(Z);
        }), await W;
      });
      ie.finished.finally(() => {
        R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
      }), D(ie);
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
    !b.isTransitioning && z && (y(z.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: z.currentLocation,
      nextLocation: z.nextLocation
    }), B(void 0));
  }, [b.isTransitioning, z]);
  let Q = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (Z) => n.navigate(Z),
    push: (Z, W, ie) => n.navigate(Z, {
      state: W,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (Z, W, ie) => n.navigate(Z, {
      replace: !0,
      state: W,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [n]), ee = n.basename || "/", j = x.useMemo(
    () => ({
      router: n,
      navigator: Q,
      static: !1,
      basename: ee,
      onError: l
    }),
    [n, Q, ee, l]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(Li.Provider, { value: j }, /* @__PURE__ */ x.createElement(ns.Provider, { value: h }, /* @__PURE__ */ x.createElement(jb.Provider, { value: U.current }, /* @__PURE__ */ x.createElement(ih.Provider, { value: b }, /* @__PURE__ */ x.createElement(
    FR,
    {
      basename: ee,
      location: h.location,
      navigationType: h.historyAction,
      navigator: Q,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      YR,
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
function cv(n, a) {
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
var YR = x.memo(GR);
function GR({
  routes: n,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return RR(n, void 0, { state: l, isStatic: s, onError: o });
}
function FR({
  basename: n = "/",
  children: a = null,
  location: l,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  _e(
    !as(),
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
  typeof l == "string" && (l = _n(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: b = "",
    state: S = null,
    key: T = "default",
    unstable_mask: R
  } = l, w = x.useMemo(() => {
    let D = Tn(m, h);
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
  return gt(
    w != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
  ), w == null ? null : /* @__PURE__ */ x.createElement(Rn.Provider, { value: p }, /* @__PURE__ */ x.createElement(vu.Provider, { children: a, value: w }));
}
var Go = "get", Fo = "application/x-www-form-urlencoded";
function Su(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function $R(n) {
  return Su(n) && n.tagName.toLowerCase() === "button";
}
function XR(n) {
  return Su(n) && n.tagName.toLowerCase() === "form";
}
function KR(n) {
  return Su(n) && n.tagName.toLowerCase() === "input";
}
function QR(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function IR(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !QR(n);
}
var Oo = null;
function ZR() {
  if (Oo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Oo = !1;
    } catch {
      Oo = !0;
    }
  return Oo;
}
var JR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function If(n) {
  return n != null && !JR.has(n) ? (gt(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fo}"`
  ), null) : n;
}
function WR(n, a) {
  let l, s, o, c, d;
  if (XR(n)) {
    let h = n.getAttribute("action");
    s = h ? Tn(h, a) : null, l = n.getAttribute("method") || Go, o = If(n.getAttribute("enctype")) || Fo, c = new FormData(n);
  } else if ($R(n) || KR(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? Tn(p, a) : null, l = n.getAttribute("formmethod") || h.getAttribute("method") || Go, o = If(n.getAttribute("formenctype")) || If(h.getAttribute("enctype")) || Fo, c = new FormData(h, n), !ZR()) {
      let { name: m, type: y, value: b } = n;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, b);
    }
  } else {
    if (Su(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    l = Go, s = null, o = Fo, d = n;
  }
  return c && o === "text/plain" && (d = c, c = void 0), { action: s, method: l.toLowerCase(), encType: o, formData: c, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function sh(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Ub(n, a, l, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Tn(o.pathname, a) === "/" ? o.pathname = `${nu(a)}/_root.${s}` : o.pathname = `${nu(o.pathname)}.${s}`, o;
}
async function ew(n, a) {
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
function tw(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function nw(n, a, l) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let d = await ew(c, l);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return rw(
    s.flat(1).filter(tw).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function fv(n, a, l, s, o, c) {
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
function aw(n, a, { includeHydrateFallback: l } = {}) {
  return iw(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function iw(n) {
  return [...new Set(n)];
}
function lw(n) {
  let a = {}, l = Object.keys(n).sort();
  for (let s of l)
    a[s] = n[s];
  return a;
}
function rw(n, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(lw(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function oh() {
  let n = x.useContext(Li);
  return sh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function sw() {
  let n = x.useContext(ns);
  return sh(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var uh = x.createContext(void 0);
uh.displayName = "FrameworkContext";
function ch() {
  let n = x.useContext(uh);
  return sh(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function ow(n, a) {
  let l = x.useContext(uh), [s, o] = x.useState(!1), [c, d] = x.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: b } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let w = (z) => {
        z.forEach((B) => {
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
      onFocus: Or(h, T),
      onBlur: Or(p, R),
      onMouseEnter: Or(m, T),
      onMouseLeave: Or(y, R),
      onTouchStart: Or(b, T)
    }
  ] : [!1, S, {}];
}
function Or(n, a) {
  return (l) => {
    n && n(l), l.defaultPrevented || a(l);
  };
}
function uw({ page: n, ...a }) {
  let l = Ab(), { router: s } = oh(), o = x.useMemo(
    () => Za(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? l ? /* @__PURE__ */ x.createElement(fw, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(dw, { page: n, matches: o, ...a }) : null;
}
function cw(n) {
  let { manifest: a, routeModules: l } = ch(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return nw(n, a, l).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, l]), s;
}
function fw({
  page: n,
  matches: a,
  ...l
}) {
  let s = va(), { future: o } = ch(), { basename: c } = oh(), d = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = Ub(
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
function dw({
  page: n,
  matches: a,
  ...l
}) {
  let s = va(), { future: o, manifest: c, routeModules: d } = ch(), { basename: h } = oh(), { loaderData: p, matches: m } = sw(), y = x.useMemo(
    () => fv(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), b = x.useMemo(
    () => fv(
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
      let U = c.routes[B.route.id];
      !U || !U.hasLoader || (!y.some((V) => V.route.id === B.route.id) && B.route.id in p && d[B.route.id]?.shouldRevalidate || U.hasClientLoader ? D = !0 : w.add(B.route.id));
    }), w.size === 0)
      return [];
    let z = Ub(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && w.size > 0 && z.searchParams.set(
      "_routes",
      a.filter((B) => w.has(B.route.id)).map((B) => B.route.id).join(",")
    ), [z.pathname + z.search];
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
    () => aw(b, c),
    [b, c]
  ), R = cw(b);
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
function hw(...n) {
  return (a) => {
    n.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var mw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  mw && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Vb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, rs = x.forwardRef(
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
    let { basename: D, navigator: z, unstable_useTransitions: B } = x.useContext(Rn), U = typeof y == "string" && Vb.test(y), V = hb(y, D);
    y = V.to;
    let $ = ER(y, { relative: o }), Q = va(), ee = null;
    if (h) {
      let te = yu(
        h,
        [],
        Q.unstable_mask ? Q.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (te.pathname = te.pathname === "/" ? D : xn([D, te.pathname])), ee = z.createHref(te);
    }
    let [j, Z, W] = ow(
      s,
      R
    ), ie = vw(y, {
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
    function K(te) {
      a && a(te), te.defaultPrevented || ie(te);
    }
    let Y = !(V.isExternal || c), re = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...R,
          ...W,
          href: (Y ? ee : void 0) || V.absoluteURL || $,
          onClick: Y ? K : a,
          ref: hw(w, Z),
          target: m,
          "data-discover": !U && l === "render" ? "true" : void 0
        }
      )
    );
    return j && !U ? /* @__PURE__ */ x.createElement(x.Fragment, null, re, /* @__PURE__ */ x.createElement(uw, { page: $ })) : re;
  }
);
rs.displayName = "Link";
var pw = x.forwardRef(
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
    let b = is(d, { relative: m.relative }), S = va(), T = x.useContext(ns), { navigator: R, basename: w } = x.useContext(Rn), D = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Tw(b) && h === !0, z = R.encodeLocation ? R.encodeLocation(b).pathname : b.pathname, B = S.pathname, U = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    l || (B = B.toLowerCase(), U = U ? U.toLowerCase() : null, z = z.toLowerCase()), U && w && (U = Tn(U, w) || U);
    const V = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
    let $ = B === z || !o && B.startsWith(z) && B.charAt(V) === "/", Q = U != null && (U === z || !o && U.startsWith(z) && U.charAt(z.length) === "/"), ee = {
      isActive: $,
      isPending: Q,
      isTransitioning: D
    }, j = $ ? a : void 0, Z;
    typeof s == "function" ? Z = s(ee) : Z = [
      s,
      $ ? "active" : null,
      Q ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let W = typeof c == "function" ? c(ee) : c;
    return /* @__PURE__ */ x.createElement(
      rs,
      {
        ...m,
        "aria-current": j,
        className: Z,
        ref: y,
        style: W,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(ee) : p
    );
  }
);
pw.displayName = "NavLink";
var yw = x.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: l,
    reloadDocument: s,
    replace: o,
    state: c,
    method: d = Go,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: b,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, R) => {
    let { unstable_useTransitions: w } = x.useContext(Rn), D = xw(), z = Ew(h, { relative: m }), B = d.toLowerCase() === "get" ? "get" : "post", U = typeof h == "string" && Vb.test(h), V = ($) => {
      if (p && p($), $.defaultPrevented) return;
      $.preventDefault();
      let Q = $.nativeEvent.submitter, ee = Q?.getAttribute("formmethod") || d, j = () => D(Q || $.currentTarget, {
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
      w && l !== !1 ? x.startTransition(() => j()) : j();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: R,
        method: B,
        action: z,
        onSubmit: s ? p : V,
        ...T,
        "data-discover": !U && n === "render" ? "true" : void 0
      }
    );
  }
);
yw.displayName = "Form";
function gw(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bb(n) {
  let a = x.useContext(Li);
  return _e(a, gw(n)), a;
}
function vw(n, {
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
  let y = Ui(), b = va(), S = is(n, { relative: d });
  return x.useCallback(
    (T) => {
      if (IR(T, a)) {
        T.preventDefault();
        let R = l !== void 0 ? l : Fn(b) === Fn(S), w = () => y(n, {
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
var bw = 0, Sw = () => `__${String(++bw)}__`;
function xw() {
  let { router: n } = Bb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(Rn), l = zR(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: b } = WR(
        c,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || Sw();
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
function Ew(n, { relative: a } = {}) {
  let { basename: l } = x.useContext(Rn), s = x.useContext(ga);
  _e(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...is(n || ".", { relative: a }) }, d = va();
  if (n == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((b) => b).forEach((b) => h.append("index", b));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : xn([l, c.pathname])), Fn(c);
}
function Tw(n, { relative: a } = {}) {
  let l = x.useContext(ih);
  _e(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Bb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = is(n, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let c = Tn(l.currentLocation.pathname, s) || l.currentLocation.pathname, d = Tn(l.nextLocation.pathname, s) || l.nextLocation.pathname;
  return tu(o.pathname, d) != null || tu(o.pathname, c) != null;
}
class Vi extends Error {
  constructor(a, l, s, o) {
    super(s), this.status = a, this.category = l, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Bi = "/api/v1/extensions/nexus.audio.emotiontts";
async function st(n, a) {
  const l = n.startsWith("http") ? n : `${Bi}${n}`, s = await fetch(l, {
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
    throw new Vi(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function Rw(n, a, l) {
  const s = n.startsWith("http") ? n : `${Bi}${n}`, o = new EventSource(s);
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
async function ww() {
  return st("/deployments");
}
async function dv(n) {
  return st(`/deployments/${n}`);
}
async function Cw(n, a) {
  return st(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function hv(n) {
  return st(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Hb(n, a) {
  return st("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function Mw(n, a, l) {
  return st(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function Aw(n, a) {
  await st(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function jw(n) {
  return st(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function Dw(n, a, l = "error") {
  return st("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: l })
  });
}
async function Nw(n, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return st(`/deployments/${n}/runs${o}`);
}
async function zw(n, a) {
  return st(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function fh(n, a) {
  return st(`/deployments/${n}/runs/${a}`);
}
async function Ow(n, a) {
  return st(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function dh(n, a) {
  return st(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function _w(n, a) {
  return st(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function mv(n, a, l, s) {
  return Rw(
    `/deployments/${n}/runs/${a}/progress`,
    l,
    s
  );
}
async function au(n) {
  return st(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function Lw(n, a, l, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", l), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${Bi}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function Uw(n) {
  return st(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var Vw = "_93p6291", Bw = "_93p6292", Hw = "_93p6293", qw = "_93p6294", kw = "_93p6295", Pw = "_93p6296", Yw = "_93p6297", Gw = "_93p6298", Fw = "_93p6299", $w = "_93p629a", Xw = "_93p629b", Kw = "_93p629c", Qw = "_93p629d", Iw = "_93p629e", Zw = "_93p629f", Jw = "_93p629g", Ww = "_93p629h", eC = "_93p629i";
function tC() {
  const { deployments: n } = ls();
  return /* @__PURE__ */ v.jsxs("main", { className: Vw, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Bw, children: [
      /* @__PURE__ */ v.jsx("p", { className: Hw, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ v.jsxs("h1", { className: qw, children: [
        "Direct your characters.",
        /* @__PURE__ */ v.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: kw, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ v.jsxs("section", { className: Pw, children: [
      /* @__PURE__ */ v.jsx("h2", { className: Yw, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ v.jsxs("div", { className: Iw, children: [
        /* @__PURE__ */ v.jsx("span", { className: Zw, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ v.jsx("p", { className: Jw, children: "No deployments yet" }),
        /* @__PURE__ */ v.jsx("p", { className: Ww, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ v.jsx("p", { className: eC, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ v.jsx("ul", { className: Gw, children: n.map((a) => /* @__PURE__ */ v.jsx("li", { children: /* @__PURE__ */ v.jsxs(rs, { to: `/${a.deploymentId}/recipe`, className: Fw, children: [
        /* @__PURE__ */ v.jsx("span", { className: $w, "aria-hidden": "true", children: nC(a.displayName) }),
        /* @__PURE__ */ v.jsxs("span", { children: [
          /* @__PURE__ */ v.jsx("span", { className: Xw, children: a.displayName }),
          /* @__PURE__ */ v.jsx("span", { className: Kw, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: Qw, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function nC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const aC = "huggingface/IndexTeam/IndexTTS-2";
async function iC(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function lC() {
  return st("/runtime/health");
}
async function rC() {
  await st("/runtime/start", { method: "POST" });
}
async function sC() {
  return st("/runtime/stop", { method: "POST" });
}
async function oC() {
  await st("/runtime/restart", { method: "POST" });
}
function uC(n) {
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
var cC = "g5r6d10", fC = "g5r6d11", dC = "g5r6d12", _r = "g5r6d13", Lr = "g5r6d14", hC = "g5r6d15", mC = "g5r6d16", pC = "g5r6d17", Jt = "g5r6d18", Ia = "g5r6d19", iu = "g5r6d1b g5r6d1a", ti = "g5r6d1c g5r6d1a", qb = "g5r6d1d g5r6d1a", kb = "g5r6d1e", Ir = "g5r6d1f", Cd = "g5r6d1g", yC = "g5r6d1h", gC = "g5r6d1i", Ka = "g5r6d1j", Pb = "g5r6d1k", Yb = "g5r6d1l g5r6d1k", hh = "g5r6d1m g5r6d1k", mh = "g5r6d1n g5r6d1k";
const vC = 4e3;
function bC({ deployment: n }) {
  const a = Ui(), [l, s] = x.useState(null), [o, c] = x.useState(null), [d, h] = x.useState(!1);
  x.useEffect(() => {
    let D = !1;
    const z = async () => {
      try {
        const U = await lC();
        D || (s(U), c(null));
      } catch (U) {
        D || c(Ur(U));
      }
    };
    z();
    const B = setInterval(z, vC);
    return () => {
      D = !0, clearInterval(B);
    };
  }, []);
  const p = x.useCallback(async () => {
    h(!0), c(null);
    try {
      await rC();
    } catch (D) {
      c(Ur(D));
    } finally {
      h(!1);
    }
  }, []), m = x.useCallback(async () => {
    h(!0);
    try {
      await sC();
    } catch (D) {
      c(Ur(D));
    } finally {
      h(!1);
    }
  }, []), y = x.useCallback(async () => {
    h(!0);
    try {
      await oC();
    } catch (D) {
      c(Ur(D));
    } finally {
      h(!1);
    }
  }, []), b = x.useCallback(async () => {
    h(!0);
    try {
      await iC(aC);
    } catch (D) {
      c(Ur(D));
    } finally {
      h(!1);
    }
  }, []), S = l?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", R = S === "ready" || S === "running" || S === "starting", w = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { className: Ia, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Runtime" }),
    /* @__PURE__ */ v.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Badge" }),
    /* @__PURE__ */ v.jsx("span", { className: SC(S), children: uC(S) }),
    l && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Uptime" }),
      /* @__PURE__ */ v.jsx("span", { children: xC(l.uptimeSeconds) }),
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "VRAM" }),
      /* @__PURE__ */ v.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ v.jsx("button", { type: "button", className: iu, disabled: d, onClick: p, children: "Install / Start runtime" }),
    R && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
      /* @__PURE__ */ v.jsx("button", { type: "button", className: qb, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ v.jsx("button", { type: "button", className: ti, disabled: d, onClick: y, children: "Restart" })
    ] }),
    w && /* @__PURE__ */ v.jsx("button", { type: "button", className: iu, disabled: d, onClick: b, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: ti,
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !w && /* @__PURE__ */ v.jsx("span", { className: Ir, children: o })
  ] });
}
function SC(n) {
  switch (n) {
    case "ready":
    case "running":
      return Yb;
    case "starting":
    case "stopping":
    case "installing":
      return hh;
    case "failed":
      return mh;
    default:
      return Pb;
  }
}
function xC(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Ur(n) {
  return n instanceof Vi || n instanceof Error ? n.message : "unknown error";
}
async function EC(n) {
  return st(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function TC(n, a, l) {
  return st("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: l })
  });
}
async function RC(n, a) {
  await st(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var wC = "wfqeb50", CC = "wfqeb51", MC = "wfqeb52", AC = "wfqeb53", jC = "wfqeb54", DC = "wfqeb55 wfqeb54", NC = "wfqeb56", zC = "wfqeb57", Gb = "wfqeb58", Fb = "wfqeb59", $b = "wfqeb5a", OC = "wfqeb5b", _C = "wfqeb5c", pv = "wfqeb5d", LC = "wfqeb5e wfqeb5d", UC = "wfqeb5f wfqeb5d", VC = "wfqeb5g", BC = "wfqeb5h", Zf = "wfqeb5i", HC = "wfqeb5j", qC = "wfqeb5k", kC = "wfqeb5l", PC = "wfqeb5m";
const ph = x.createContext({});
function yh(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const YC = typeof window < "u", Xb = YC ? x.useLayoutEffect : x.useEffect, xu = /* @__PURE__ */ x.createContext(null);
function gh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function lu(n, a) {
  const l = n.indexOf(a);
  l > -1 && n.splice(l, 1);
}
const $n = (n, a, l) => l > a ? a : l < n ? n : l;
function yv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let ss = () => {
}, _i = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (ss = (n, a, l) => {
  !n && typeof console < "u" && console.warn(yv(a, l));
}, _i = (n, a, l) => {
  if (!n)
    throw new Error(yv(a, l));
});
const ni = {}, Kb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Qb(n) {
  return typeof n == "object" && n !== null;
}
const Ib = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Zb(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const En = /* @__NO_SIDE_EFFECTS__ */ (n) => n, GC = (n, a) => (l) => a(n(l)), os = (...n) => n.reduce(GC), Zr = /* @__NO_SIDE_EFFECTS__ */ (n, a, l) => {
  const s = a - n;
  return s === 0 ? 1 : (l - n) / s;
};
class vh {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return gh(this.subscriptions, a), () => lu(this.subscriptions, a);
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
const Wt = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Jb(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Wb = (n, a, l) => (((1 - 3 * l + 3 * a) * n + (3 * l - 6 * a)) * n + 3 * a) * n, FC = 1e-7, $C = 12;
function XC(n, a, l, s, o) {
  let c, d, h = 0;
  do
    d = a + (l - a) / 2, c = Wb(d, s, o) - n, c > 0 ? l = d : a = d;
  while (Math.abs(c) > FC && ++h < $C);
  return d;
}
function us(n, a, l, s) {
  if (n === a && l === s)
    return En;
  const o = (c) => XC(c, 0, 1, n, l);
  return (c) => c === 0 || c === 1 ? c : Wb(o(c), a, s);
}
const eS = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, tS = (n) => (a) => 1 - n(1 - a), nS = /* @__PURE__ */ us(0.33, 1.53, 0.69, 0.99), bh = /* @__PURE__ */ tS(nS), aS = /* @__PURE__ */ eS(bh), iS = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * bh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Sh = (n) => 1 - Math.sin(Math.acos(n)), lS = tS(Sh), rS = eS(Sh), KC = /* @__PURE__ */ us(0.42, 0, 1, 1), QC = /* @__PURE__ */ us(0, 0, 0.58, 1), sS = /* @__PURE__ */ us(0.42, 0, 0.58, 1), IC = (n) => Array.isArray(n) && typeof n[0] != "number", oS = (n) => Array.isArray(n) && typeof n[0] == "number", gv = {
  linear: En,
  easeIn: KC,
  easeInOut: sS,
  easeOut: QC,
  circIn: Sh,
  circInOut: rS,
  circOut: lS,
  backIn: bh,
  backInOut: aS,
  backOut: nS,
  anticipate: iS
}, ZC = (n) => typeof n == "string", vv = (n) => {
  if (oS(n)) {
    _i(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = n;
    return us(a, l, s, o);
  } else if (ZC(n))
    return _i(gv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), gv[n];
  return n;
}, _o = [
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
function JC(n, a) {
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
const WC = 40;
function uS(n, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, d = _o.reduce((U, V) => (U[V] = JC(c), U), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: b, preRender: S, render: T, postRender: R } = d, w = () => {
    const U = ni.useManualTiming, V = U ? o.timestamp : performance.now();
    l = !1, U || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(V - o.timestamp, WC), 1)), o.timestamp = V, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), b.process(o), S.process(o), T.process(o), R.process(o), o.isProcessing = !1, l && a && (s = !1, n(w));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || n(w);
  };
  return { schedule: _o.reduce((U, V) => {
    const $ = d[V];
    return U[V] = (Q, ee = !1, j = !1) => (l || D(), $.schedule(Q, ee, j)), U;
  }, {}), cancel: (U) => {
    for (let V = 0; V < _o.length; V++)
      d[_o[V]].cancel(U);
  }, state: o, steps: d };
}
const { schedule: tt, cancel: ai, state: _t, steps: Jf } = /* @__PURE__ */ uS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : En, !0);
let $o;
function eM() {
  $o = void 0;
}
const Yt = {
  now: () => ($o === void 0 && Yt.set(_t.isProcessing || ni.useManualTiming ? _t.timestamp : performance.now()), $o),
  set: (n) => {
    $o = n, queueMicrotask(eM);
  }
}, cS = (n) => (a) => typeof a == "string" && a.startsWith(n), fS = /* @__PURE__ */ cS("--"), tM = /* @__PURE__ */ cS("var(--"), xh = (n) => tM(n) ? nM.test(n.split("/*")[0].trim()) : !1, nM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function bv(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const _l = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Jr = {
  ..._l,
  transform: (n) => $n(0, 1, n)
}, Lo = {
  ..._l,
  default: 1
}, Gr = (n) => Math.round(n * 1e5) / 1e5, Eh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function aM(n) {
  return n == null;
}
const iM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Th = (n, a) => (l) => !!(typeof l == "string" && iM.test(l) && l.startsWith(n) || a && !aM(l) && Object.prototype.hasOwnProperty.call(l, a)), dS = (n, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(Eh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, lM = (n) => $n(0, 255, n), Wf = {
  ..._l,
  transform: (n) => Math.round(lM(n))
}, Di = {
  test: /* @__PURE__ */ Th("rgb", "red"),
  parse: /* @__PURE__ */ dS("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: l, alpha: s = 1 }) => "rgba(" + Wf.transform(n) + ", " + Wf.transform(a) + ", " + Wf.transform(l) + ", " + Gr(Jr.transform(s)) + ")"
};
function rM(n) {
  let a = "", l = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), l = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), l = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, l += l, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Md = {
  test: /* @__PURE__ */ Th("#"),
  parse: rM,
  transform: Di.transform
}, cs = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Qa = /* @__PURE__ */ cs("deg"), Gn = /* @__PURE__ */ cs("%"), ye = /* @__PURE__ */ cs("px"), sM = /* @__PURE__ */ cs("vh"), oM = /* @__PURE__ */ cs("vw"), Sv = {
  ...Gn,
  parse: (n) => Gn.parse(n) / 100,
  transform: (n) => Gn.transform(n * 100)
}, Ml = {
  test: /* @__PURE__ */ Th("hsl", "hue"),
  parse: /* @__PURE__ */ dS("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Gn.transform(Gr(a)) + ", " + Gn.transform(Gr(l)) + ", " + Gr(Jr.transform(s)) + ")"
}, Rt = {
  test: (n) => Di.test(n) || Md.test(n) || Ml.test(n),
  parse: (n) => Di.test(n) ? Di.parse(n) : Ml.test(n) ? Ml.parse(n) : Md.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Di.transform(n) : Ml.transform(n),
  getAnimatableNone: (n) => {
    const a = Rt.parse(n);
    return a.alpha = 0, Rt.transform(a);
  }
}, uM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function cM(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Eh)?.length || 0) + (n.match(uM)?.length || 0) > 0;
}
const hS = "number", mS = "color", fM = "var", dM = "var(", xv = "${}", hM = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function zl(n) {
  const a = n.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(hM, (p) => (Rt.test(p) ? (s.color.push(c), o.push(mS), l.push(Rt.parse(p))) : p.startsWith(dM) ? (s.var.push(c), o.push(fM), l.push(p)) : (s.number.push(c), o.push(hS), l.push(parseFloat(p))), ++c, xv)).split(xv);
  return { values: l, split: h, indexes: s, types: o };
}
function mM(n) {
  return zl(n).values;
}
function pS({ split: n, types: a }) {
  const l = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += n[c], s[c] !== void 0) {
        const d = a[c];
        d === hS ? o += Gr(s[c]) : d === mS ? o += Rt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function pM(n) {
  return pS(zl(n));
}
const yM = (n) => typeof n == "number" ? 0 : Rt.test(n) ? Rt.getAnimatableNone(n) : n, gM = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : yM(n);
function vM(n) {
  const a = zl(n);
  return pS(a)(a.values.map((s, o) => gM(s, a.split[o])));
}
const On = {
  test: cM,
  parse: mM,
  createTransformer: pM,
  getAnimatableNone: vM
};
function ed(n, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? n + (a - n) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? n + (a - n) * (2 / 3 - l) * 6 : n;
}
function bM({ hue: n, saturation: a, lightness: l, alpha: s }) {
  n /= 360, a /= 100, l /= 100;
  let o = 0, c = 0, d = 0;
  if (!a)
    o = c = d = l;
  else {
    const h = l < 0.5 ? l * (1 + a) : l + a - l * a, p = 2 * l - h;
    o = ed(p, h, n + 1 / 3), c = ed(p, h, n), d = ed(p, h, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function ru(n, a) {
  return (l) => l > 0 ? a : n;
}
const rt = (n, a, l) => n + (a - n) * l, td = (n, a, l) => {
  const s = n * n, o = l * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, SM = [Md, Di, Ml], xM = (n) => SM.find((a) => a.test(n));
function Ev(n) {
  const a = xM(n);
  if (ss(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(n);
  return a === Ml && (l = bM(l)), l;
}
const Tv = (n, a) => {
  const l = Ev(n), s = Ev(a);
  if (!l || !s)
    return ru(n, a);
  const o = { ...l };
  return (c) => (o.red = td(l.red, s.red, c), o.green = td(l.green, s.green, c), o.blue = td(l.blue, s.blue, c), o.alpha = rt(l.alpha, s.alpha, c), Di.transform(o));
}, Ad = /* @__PURE__ */ new Set(["none", "hidden"]);
function EM(n, a) {
  return Ad.has(n) ? (l) => l <= 0 ? n : a : (l) => l >= 1 ? a : n;
}
function TM(n, a) {
  return (l) => rt(n, a, l);
}
function Rh(n) {
  return typeof n == "number" ? TM : typeof n == "string" ? xh(n) ? ru : Rt.test(n) ? Tv : CM : Array.isArray(n) ? yS : typeof n == "object" ? Rt.test(n) ? Tv : RM : ru;
}
function yS(n, a) {
  const l = [...n], s = l.length, o = n.map((c, d) => Rh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      l[d] = o[d](c);
    return l;
  };
}
function RM(n, a) {
  const l = { ...n, ...a }, s = {};
  for (const o in l)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Rh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function wM(n, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = n.indexes[c][s[c]], h = n.values[d] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const CM = (n, a) => {
  const l = On.createTransformer(a), s = zl(n), o = zl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Ad.has(n) && !o.values.length || Ad.has(a) && !s.values.length ? EM(n, a) : os(yS(wM(s, o), o.values), l) : (ss(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ru(n, a));
};
function gS(n, a, l) {
  return typeof n == "number" && typeof a == "number" && typeof l == "number" ? rt(n, a, l) : Rh(n)(n, a);
}
const MM = (n) => {
  const a = ({ timestamp: l }) => n(l);
  return {
    start: (l = !0) => tt.update(a, l),
    stop: () => ai(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _t.isProcessing ? _t.timestamp : Yt.now()
  };
}, vS = (n, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, su = 2e4;
function wh(n) {
  let a = 0;
  const l = 50;
  let s = n.next(a);
  for (; !s.done && a < su; )
    a += l, s = n.next(a);
  return a >= su ? 1 / 0 : a;
}
function AM(n, a = 100, l) {
  const s = l({ ...n, keyframes: [0, a] }), o = Math.min(wh(s), su);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ Sn(o)
  };
}
const ct = {
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
function jd(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const jM = 12;
function DM(n, a, l) {
  let s = l;
  for (let o = 1; o < jM; o++)
    s = s - n(s) / a(s);
  return s;
}
const nd = 1e-3;
function NM({ duration: n = ct.duration, bounce: a = ct.bounce, velocity: l = ct.velocity, mass: s = ct.mass }) {
  let o, c;
  ss(n <= /* @__PURE__ */ Wt(ct.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = $n(ct.minDamping, ct.maxDamping, d), n = $n(ct.minDuration, ct.maxDuration, /* @__PURE__ */ Sn(n)), d < 1 ? (o = (m) => {
    const y = m * d, b = y * n, S = y - l, T = jd(m, d), R = Math.exp(-b);
    return nd - S / T * R;
  }, c = (m) => {
    const b = m * d * n, S = b * l + l, T = Math.pow(d, 2) * Math.pow(m, 2) * n, R = Math.exp(-b), w = jd(Math.pow(m, 2), d);
    return (-o(m) + nd > 0 ? -1 : 1) * ((S - T) * R) / w;
  }) : (o = (m) => {
    const y = Math.exp(-m * n), b = (m - l) * n + 1;
    return -nd + y * b;
  }, c = (m) => {
    const y = Math.exp(-m * n), b = (l - m) * (n * n);
    return y * b;
  });
  const h = 5 / n, p = DM(o, c, h);
  if (n = /* @__PURE__ */ Wt(n), isNaN(p))
    return {
      stiffness: ct.stiffness,
      damping: ct.damping,
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
const zM = ["duration", "bounce"], OM = ["stiffness", "damping", "mass"];
function Rv(n, a) {
  return a.some((l) => n[l] !== void 0);
}
function _M(n) {
  let a = {
    velocity: ct.velocity,
    stiffness: ct.stiffness,
    damping: ct.damping,
    mass: ct.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Rv(n, OM) && Rv(n, zM))
    if (a.velocity = 0, n.visualDuration) {
      const l = n.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * $n(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: ct.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = NM({ ...n, velocity: 0 });
      a = {
        ...a,
        ...l,
        mass: ct.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function ou(n = ct.visualDuration, a = ct.bounce) {
  const l = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = l;
  const c = l.keyframes[0], d = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: b, velocity: S, isResolvedFromDuration: T } = _M({
    ...l,
    velocity: -/* @__PURE__ */ Sn(l.velocity || 0)
  }), R = S || 0, w = m / (2 * Math.sqrt(p * y)), D = d - c, z = /* @__PURE__ */ Sn(Math.sqrt(p / y)), B = Math.abs(D) < 5;
  s || (s = B ? ct.restSpeed.granular : ct.restSpeed.default), o || (o = B ? ct.restDelta.granular : ct.restDelta.default);
  let U, V, $, Q, ee, j;
  if (w < 1)
    $ = jd(z, w), Q = (R + w * z * D) / $, U = (W) => {
      const ie = Math.exp(-w * z * W);
      return d - ie * (Q * Math.sin($ * W) + D * Math.cos($ * W));
    }, ee = w * z * Q + D * $, j = w * z * D - Q * $, V = (W) => Math.exp(-w * z * W) * (ee * Math.sin($ * W) + j * Math.cos($ * W));
  else if (w === 1) {
    U = (ie) => d - Math.exp(-z * ie) * (D + (R + z * D) * ie);
    const W = R + z * D;
    V = (ie) => Math.exp(-z * ie) * (z * W * ie - R);
  } else {
    const W = z * Math.sqrt(w * w - 1);
    U = (re) => {
      const te = Math.exp(-w * z * re), O = Math.min(W * re, 300);
      return d - te * ((R + w * z * D) * Math.sinh(O) + W * D * Math.cosh(O)) / W;
    };
    const ie = (R + w * z * D) / W, K = w * z * ie - D * W, Y = w * z * D - ie * W;
    V = (re) => {
      const te = Math.exp(-w * z * re), O = Math.min(W * re, 300);
      return te * (K * Math.sinh(O) + Y * Math.cosh(O));
    };
  }
  const Z = {
    calculatedDuration: T && b || null,
    velocity: (W) => /* @__PURE__ */ Wt(V(W)),
    next: (W) => {
      if (!T && w < 1) {
        const K = Math.exp(-w * z * W), Y = Math.sin($ * W), re = Math.cos($ * W), te = d - K * (Q * Y + D * re), O = /* @__PURE__ */ Wt(K * (ee * Y + j * re));
        return h.done = Math.abs(O) <= s && Math.abs(d - te) <= o, h.value = h.done ? d : te, h;
      }
      const ie = U(W);
      if (T)
        h.done = W >= b;
      else {
        const K = /* @__PURE__ */ Wt(V(W));
        h.done = Math.abs(K) <= s && Math.abs(d - ie) <= o;
      }
      return h.value = h.done ? d : ie, h;
    },
    toString: () => {
      const W = Math.min(wh(Z), su), ie = vS((K) => Z.next(W * K).value, W, 30);
      return W + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return Z;
}
ou.applyToOptions = (n) => {
  const a = AM(n, 100, ou);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ Wt(a.duration), n.type = "keyframes", n;
};
const LM = 5;
function bS(n, a, l) {
  const s = Math.max(a - LM, 0);
  return Jb(l - n(s), a - s);
}
function Dd({ keyframes: n, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const b = n[0], S = {
    done: !1,
    value: b
  }, T = (j) => h !== void 0 && j < h || p !== void 0 && j > p, R = (j) => h === void 0 ? p : p === void 0 || Math.abs(h - j) < Math.abs(p - j) ? h : p;
  let w = l * a;
  const D = b + w, z = d === void 0 ? D : d(D);
  z !== D && (w = z - b);
  const B = (j) => -w * Math.exp(-j / s), U = (j) => z + B(j), V = (j) => {
    const Z = B(j), W = U(j);
    S.done = Math.abs(Z) <= m, S.value = S.done ? z : W;
  };
  let $, Q;
  const ee = (j) => {
    T(S.value) && ($ = j, Q = ou({
      keyframes: [S.value, R(S.value)],
      velocity: bS(U, j, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return ee(0), {
    calculatedDuration: null,
    next: (j) => {
      let Z = !1;
      return !Q && $ === void 0 && (Z = !0, V(j), ee(j)), $ !== void 0 && j >= $ ? Q.next(j - $) : (!Z && V(j), S);
    }
  };
}
function UM(n, a, l) {
  const s = [], o = l || ni.mix || gS, c = n.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || En : a;
      h = os(p, h);
    }
    s.push(h);
  }
  return s;
}
function VM(n, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (_i(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = UM(a, s, o), p = h.length, m = (y) => {
    if (d && y < n[0])
      return a[0];
    let b = 0;
    if (p > 1)
      for (; b < n.length - 2 && !(y < n[b + 1]); b++)
        ;
    const S = /* @__PURE__ */ Zr(n[b], n[b + 1], y);
    return h[b](S);
  };
  return l ? (y) => m($n(n[0], n[c - 1], y)) : m;
}
function BM(n, a) {
  const l = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Zr(0, a, s);
    n.push(rt(l, 1, o));
  }
}
function HM(n) {
  const a = [0];
  return BM(a, n.length - 1), a;
}
function qM(n, a) {
  return n.map((l) => l * a);
}
function kM(n, a) {
  return n.map(() => a || sS).splice(0, n.length - 1);
}
function Fr({ duration: n = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = IC(s) ? s.map(vv) : vv(s), c = {
    done: !1,
    value: a[0]
  }, d = qM(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : HM(a),
    n
  ), h = VM(d, a, {
    ease: Array.isArray(o) ? o : kM(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = h(p), c.done = p >= n, c)
  };
}
const PM = (n) => n !== null;
function Eu(n, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = n.filter(PM), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const YM = {
  decay: Dd,
  inertia: Dd,
  tween: Fr,
  keyframes: Fr,
  spring: ou
};
function SS(n) {
  typeof n.type == "string" && (n.type = YM[n.type]);
}
class Ch {
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
const GM = (n) => n / 100;
class uu extends Ch {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== Yt.now() && this.tick(Yt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    SS(a);
    const { type: l = Fr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Fr;
    p !== Fr && typeof h[0] != "number" && (this.mixKeyframes = os(GM, gS(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = wh(m));
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
    const z = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), B = this.playbackSpeed >= 0 ? z < 0 : z > o;
    this.currentTime = Math.max(z, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let U = this.currentTime, V = s;
    if (b) {
      const j = Math.min(this.currentTime, o) / h;
      let Z = Math.floor(j), W = j % 1;
      !W && j >= 1 && (W = 1), W === 1 && Z--, Z = Math.min(Z, b + 1), !!(Z % 2) && (S === "reverse" ? (W = 1 - W, T && (W -= T / h)) : S === "mirror" && (V = d)), U = $n(0, 1, W) * h;
    }
    let $;
    B ? (this.delayState.value = y[0], $ = this.delayState) : $ = V.next(U), c && !B && ($.value = c($.value));
    let { done: Q } = $;
    !B && p !== null && (Q = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ee = this.holdTime === null && (this.state === "finished" || this.state === "running" && Q);
    return ee && R !== Dd && ($.value = Eu(y, this.options, D, this.speed)), w && w($.value), ee && this.finish(), $;
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
    return /* @__PURE__ */ Sn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Sn(a);
  }
  get time() {
    return /* @__PURE__ */ Sn(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Wt(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return bS((s) => this.generator.next(s).value, a, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const l = this.playbackSpeed !== a;
    l && this.driver && this.updateTime(Yt.now()), this.playbackSpeed = a, l && this.driver && (this.time = /* @__PURE__ */ Sn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = MM, startTime: l } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Yt.now()), this.holdTime = this.currentTime;
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
function FM(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ni = (n) => n * 180 / Math.PI, Nd = (n) => {
  const a = Ni(Math.atan2(n[1], n[0]));
  return zd(a);
}, $M = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Nd,
  rotateZ: Nd,
  skewX: (n) => Ni(Math.atan(n[1])),
  skewY: (n) => Ni(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, zd = (n) => (n = n % 360, n < 0 && (n += 360), n), wv = Nd, Cv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), Mv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), XM = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Cv,
  scaleY: Mv,
  scale: (n) => (Cv(n) + Mv(n)) / 2,
  rotateX: (n) => zd(Ni(Math.atan2(n[6], n[5]))),
  rotateY: (n) => zd(Ni(Math.atan2(-n[2], n[0]))),
  rotateZ: wv,
  rotate: wv,
  skewX: (n) => Ni(Math.atan(n[4])),
  skewY: (n) => Ni(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Od(n) {
  return n.includes("scale") ? 1 : 0;
}
function _d(n, a) {
  if (!n || n === "none")
    return Od(a);
  const l = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (l)
    s = XM, o = l;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = $M, o = h;
  }
  if (!o)
    return Od(a);
  const c = s[a], d = o[1].split(",").map(QM);
  return typeof c == "function" ? c(d) : d[c];
}
const KM = (n, a) => {
  const { transform: l = "none" } = getComputedStyle(n);
  return _d(l, a);
};
function QM(n) {
  return parseFloat(n.trim());
}
const Ll = [
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
], Ul = new Set(Ll), Av = (n) => n === _l || n === ye, IM = /* @__PURE__ */ new Set(["x", "y", "z"]), ZM = Ll.filter((n) => !IM.has(n));
function JM(n) {
  const a = [];
  return ZM.forEach((l) => {
    const s = n.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const ei = {
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
  x: (n, { transform: a }) => _d(a, "x"),
  y: (n, { transform: a }) => _d(a, "y")
};
ei.translateX = ei.x;
ei.translateY = ei.y;
const zi = /* @__PURE__ */ new Set();
let Ld = !1, Ud = !1, Vd = !1;
function xS() {
  if (Ud) {
    const n = Array.from(zi).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = JM(s);
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
  Ud = !1, Ld = !1, zi.forEach((n) => n.complete(Vd)), zi.clear();
}
function ES() {
  zi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Ud = !0);
  });
}
function WM() {
  Vd = !0, ES(), xS(), Vd = !1;
}
class Mh {
  constructor(a, l, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (zi.add(this), Ld || (Ld = !0, tt.read(ES), tt.resolveKeyframes(xS))) : (this.readKeyframes(), this.complete());
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
    FM(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), zi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (zi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const eA = (n) => n.startsWith("--");
function TS(n, a, l) {
  eA(a) ? n.style.setProperty(a, l) : n.style[a] = l;
}
const tA = {};
function RS(n, a) {
  const l = /* @__PURE__ */ Zb(n);
  return () => tA[a] ?? l();
}
const nA = /* @__PURE__ */ RS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), wS = /* @__PURE__ */ RS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Pr = ([n, a, l, s]) => `cubic-bezier(${n}, ${a}, ${l}, ${s})`, jv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Pr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Pr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Pr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Pr([0.33, 1.53, 0.69, 0.99])
};
function CS(n, a) {
  if (n)
    return typeof n == "function" ? wS() ? vS(n, a) : "ease-out" : oS(n) ? Pr(n) : Array.isArray(n) ? n.map((l) => CS(l, a) || jv.easeOut) : jv[n];
}
function aA(n, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const b = CS(h, o);
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
function MS(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function iA({ type: n, ...a }) {
  return MS(n) && wS() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class AS extends Ch {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, _i(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = iA(a);
    this.animation = aA(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = Eu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), TS(l, s, y), this.animation.cancel();
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
    return /* @__PURE__ */ Sn(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Sn(a);
  }
  get time() {
    return /* @__PURE__ */ Sn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Wt(a), l && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && nA() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), En) : o(this);
  }
}
const jS = {
  anticipate: iS,
  backInOut: aS,
  circInOut: rS
};
function lA(n) {
  return n in jS;
}
function rA(n) {
  typeof n.ease == "string" && lA(n.ease) && (n.ease = jS[n.ease]);
}
const ad = 10;
class sA extends AS {
  constructor(a) {
    rA(a), SS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const h = new uu({
      ...d,
      autoplay: !1
    }), p = Math.max(ad, Yt.now() - this.startTime), m = $n(0, ad, p - ad), y = h.sample(p).value, { name: b } = this.options;
    c && b && TS(c, b, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const Dv = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(On.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function oA(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let l = 0; l < n.length; l++)
    if (n[l] !== a)
      return !0;
}
function uA(n, a, l, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], d = Dv(o, a), h = Dv(c, a);
  return ss(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : oA(n) || (l === "spring" || MS(l)) && s;
}
function Bd(n) {
  n.duration = 0, n.type = "keyframes";
}
const DS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), cA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function fA(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && cA.test(n[a]))
      return !0;
  return !1;
}
const dA = /* @__PURE__ */ new Set([
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
]), hA = /* @__PURE__ */ Zb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function mA(n) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return hA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (DS.has(l) || dA.has(l) && fA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const pA = 40;
class yA extends Ch {
  constructor({ autoplay: a = !0, delay: l = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: y, ...b }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Yt.now();
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
    }, T = y?.KeyframeResolver || Mh;
    this.keyframeResolver = new T(h, (R, w, D) => this.onKeyframesResolved(R, w, S, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = Yt.now();
    let b = !0;
    uA(a, c, d, h) || (b = !1, (ni.instantAnimations || !p) && y?.(Eu(a, s, l)), a[0] = a[a.length - 1], Bd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > pA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, R = b && !m && mA(T), w = T.motionValue?.owner?.current;
    let D;
    if (R)
      try {
        D = new sA({
          ...T,
          element: w
        });
      } catch {
        D = new uu(T);
      }
    else
      D = new uu(T);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(En), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, l) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), WM()), this._animation;
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
function NS(n, a, l, s = 0, o = 1) {
  const c = Array.from(n).sort((m, y) => m.sortNodePosition(y)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof l == "function" ? l(c, d) : o === 1 ? c * s : h - c * s;
}
const gA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function vA(n) {
  const a = gA.exec(n);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const bA = 4;
function zS(n, a, l = 1) {
  _i(l <= bA, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = vA(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return Kb(d) ? parseFloat(d) : d;
  }
  return xh(o) ? zS(o, a, l + 1) : o;
}
const SA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, xA = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), EA = {
  type: "keyframes",
  duration: 0.8
}, TA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, RA = (n, { keyframes: a }) => a.length > 2 ? EA : Ul.has(n) ? n.startsWith("scale") ? xA(a[1]) : SA : TA;
function OS(n, a) {
  if (n?.inherit && a) {
    const { inherit: l, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function Ah(n, a) {
  const l = n?.[a] ?? n?.default ?? n;
  return l !== n ? OS(l, n) : l;
}
const wA = /* @__PURE__ */ new Set([
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
function CA(n) {
  for (const a in n)
    if (!wA.has(a))
      return !0;
  return !1;
}
const jh = (n, a, l, s = {}, o, c) => (d) => {
  const h = Ah(s, n) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ Wt(p);
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
  CA(h) || Object.assign(y, RA(n, y)), y.duration && (y.duration = /* @__PURE__ */ Wt(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ Wt(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let b = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Bd(y), y.delay === 0 && (b = !0)), (ni.instantAnimations || ni.skipAnimations || o?.shouldSkipAnimations) && (b = !0, Bd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, b && !c && a.get() !== void 0) {
    const S = Eu(y.keyframes, h);
    if (S !== void 0) {
      tt.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new uu(y) : new yA(y);
};
function Nv(n) {
  const a = [{}, {}];
  return n?.values.forEach((l, s) => {
    a[0][s] = l.get(), a[1][s] = l.getVelocity();
  }), a;
}
function Dh(n, a, l, s) {
  if (typeof a == "function") {
    const [o, c] = Nv(s);
    a = a(l !== void 0 ? l : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = Nv(s);
    a = a(l !== void 0 ? l : n.custom, o, c);
  }
  return a;
}
function Oi(n, a, l) {
  const s = n.getProps();
  return Dh(s, a, l !== void 0 ? l : s.custom, n);
}
const _S = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ll
]), zv = 30, MA = (n) => !isNaN(parseFloat(n));
class AA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Yt.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = l.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Yt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = MA(this.current));
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
    this.events[a] || (this.events[a] = new vh());
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
    const a = Yt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > zv)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, zv);
    return Jb(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function Ol(n, a) {
  return new AA(n, a);
}
const Hd = (n) => Array.isArray(n);
function jA(n, a, l) {
  n.hasValue(a) ? n.getValue(a).set(l) : n.addValue(a, Ol(l));
}
function DA(n) {
  return Hd(n) ? n[n.length - 1] || 0 : n;
}
function NA(n, a) {
  const l = Oi(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = DA(c[d]);
    jA(n, d, h);
  }
}
const Lt = (n) => !!(n && n.getVelocity);
function zA(n) {
  return !!(Lt(n) && n.add);
}
function qd(n, a) {
  const l = n.getValue("willChange");
  if (zA(l))
    return l.add(a);
  if (!l && ni.WillChange) {
    const s = new ni.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Nh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const OA = "framerAppearId", LS = "data-" + Nh(OA);
function US(n) {
  return n.props[LS];
}
function _A({ protectedKeys: n, needsAnimating: a }, l) {
  const s = n.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function VS(n, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  c = c ? OS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], b = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const T = n.getValue(S, n.latestValues[S] ?? null), R = h[S];
    if (R === void 0 || b && _A(b, S))
      continue;
    const w = {
      delay: l,
      ...Ah(c || {}, S)
    }, D = T.get();
    if (D !== void 0 && !T.isAnimating() && !Array.isArray(R) && R === D && !w.velocity) {
      tt.update(() => T.set(R));
      continue;
    }
    let z = !1;
    if (window.MotionHandoffAnimation) {
      const V = US(n);
      if (V) {
        const $ = window.MotionHandoffAnimation(V, S, tt);
        $ !== null && (w.startTime = $, z = !0);
      }
    }
    qd(n, S);
    const B = m ?? n.shouldReduceMotion;
    T.start(jh(S, T, R, B && _S.has(S) ? { type: !1 } : w, n, z));
    const U = T.animation;
    U && y.push(U);
  }
  if (d) {
    const S = () => tt.update(() => {
      d && NA(n, d);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function kd(n, a, l = {}) {
  const s = Oi(n, a, l.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(VS(n, s, l)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: b } = o;
    return LA(n, a, p, m, y, b, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(l.delay)]);
}
function LA(n, a, l = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(kd(p, a, {
      ...d,
      delay: l + (typeof s == "function" ? 0 : s) + NS(n.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function UA(n, a, l = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => kd(n, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = kd(n, a, l);
  else {
    const o = typeof a == "function" ? Oi(n, a, l.custom) : a;
    s = Promise.all(VS(n, o, l));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const VA = {
  test: (n) => n === "auto",
  parse: (n) => n
}, BS = (n) => (a) => a.test(n), HS = [_l, ye, Gn, Qa, oM, sM, VA], Ov = (n) => HS.find(BS(n));
function BA(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Ib(n) : !0;
}
const HA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function qA(n) {
  const [a, l] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = l.match(Eh) || [];
  if (!s)
    return n;
  const o = l.replace(s, "");
  let c = HA.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const kA = /\b([a-z-]*)\(.*?\)/gu, Pd = {
  ...On,
  getAnimatableNone: (n) => {
    const a = n.match(kA);
    return a ? a.map(qA).join(" ") : n;
  }
}, Yd = {
  ...On,
  getAnimatableNone: (n) => {
    const a = On.parse(n);
    return On.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, _v = {
  ..._l,
  transform: Math.round
}, PA = {
  rotate: Qa,
  rotateX: Qa,
  rotateY: Qa,
  rotateZ: Qa,
  scale: Lo,
  scaleX: Lo,
  scaleY: Lo,
  scaleZ: Lo,
  skew: Qa,
  skewX: Qa,
  skewY: Qa,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: Jr,
  originX: Sv,
  originY: Sv,
  originZ: ye
}, zh = {
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
  ...PA,
  zIndex: _v,
  // SVG
  fillOpacity: Jr,
  strokeOpacity: Jr,
  numOctaves: _v
}, YA = {
  ...zh,
  // Color props
  color: Rt,
  backgroundColor: Rt,
  outlineColor: Rt,
  fill: Rt,
  stroke: Rt,
  // Border props
  borderColor: Rt,
  borderTopColor: Rt,
  borderRightColor: Rt,
  borderBottomColor: Rt,
  borderLeftColor: Rt,
  filter: Pd,
  WebkitFilter: Pd,
  mask: Yd,
  WebkitMask: Yd
}, qS = (n) => YA[n], GA = /* @__PURE__ */ new Set([Pd, Yd]);
function kS(n, a) {
  let l = qS(n);
  return GA.has(l) || (l = On), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const FA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function $A(n, a, l) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !FA.has(c) && zl(c).values.length && (o = n[s]), s++;
  }
  if (o && l)
    for (const c of a)
      n[c] = kS(l, o);
}
class XA extends Mh {
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
      if (typeof b == "string" && (b = b.trim(), xh(b))) {
        const S = zS(b, l.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = b);
      }
    }
    if (this.resolveNoneKeyframes(), !_S.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Ov(o), h = Ov(c), p = bv(o), m = bv(c);
    if (p !== m && ei[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (Av(d) && Av(h))
        for (let y = 0; y < a.length; y++) {
          const b = a[y];
          typeof b == "string" && (a[y] = parseFloat(b));
        }
      else ei[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || BA(a[o])) && s.push(o);
    s.length && $A(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ei[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
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
    s[c] = ei[l](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function PS(n, a, l) {
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
const YS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Xo(n) {
  return Qb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Oh } = /* @__PURE__ */ uS(queueMicrotask, !1), zn = {
  x: !1,
  y: !1
};
function GS() {
  return zn.x || zn.y;
}
function KA(n) {
  return n === "x" || n === "y" ? zn[n] ? null : (zn[n] = !0, () => {
    zn[n] = !1;
  }) : zn.x || zn.y ? null : (zn.x = zn.y = !0, () => {
    zn.x = zn.y = !1;
  });
}
function FS(n, a) {
  const l = PS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function QA(n) {
  return !(n.pointerType === "touch" || GS());
}
function IA(n, a, l = {}) {
  const [s, o, c] = FS(n, l);
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
      if (!QA(D))
        return;
      p = !1;
      const z = a(d, D);
      typeof z == "function" && (m = z, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", w, o), d.addEventListener("pointerdown", T, o);
  }), c;
}
const $S = (n, a) => a ? n === a ? !0 : $S(n, a.parentElement) : !1, _h = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, ZA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function JA(n) {
  return ZA.has(n.tagName) || n.isContentEditable === !0;
}
const WA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function ej(n) {
  return WA.has(n.tagName) || n.isContentEditable === !0;
}
const Ko = /* @__PURE__ */ new WeakSet();
function Lv(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function id(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const tj = (n, a) => {
  const l = n.currentTarget;
  if (!l)
    return;
  const s = Lv(() => {
    if (Ko.has(l))
      return;
    id(l, "down");
    const o = Lv(() => {
      id(l, "up");
    }), c = () => id(l, "cancel");
    l.addEventListener("keyup", o, a), l.addEventListener("blur", c, a);
  });
  l.addEventListener("keydown", s, a), l.addEventListener("blur", () => l.removeEventListener("keydown", s), a);
};
function Uv(n) {
  return _h(n) && !GS();
}
const Vv = /* @__PURE__ */ new WeakSet();
function nj(n, a, l = {}) {
  const [s, o, c] = FS(n, l), d = (h) => {
    const p = h.currentTarget;
    if (!Uv(h) || Vv.has(h))
      return;
    Ko.add(p), l.stopPropagation && Vv.add(h);
    const m = a(p, h), y = (T, R) => {
      window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", S), Ko.has(p) && Ko.delete(p), Uv(T) && typeof m == "function" && m(T, { success: R });
    }, b = (T) => {
      y(T, p === window || p === document || l.useGlobalTarget || $S(p, T.target));
    }, S = (T) => {
      y(T, !1);
    };
    window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), Xo(h) && (h.addEventListener("focus", (m) => tj(m, o)), !JA(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Lh(n) {
  return Qb(n) && "ownerSVGElement" in n;
}
const Qo = /* @__PURE__ */ new WeakMap();
let Io;
const XS = (n, a, l) => (s, o) => o && o[0] ? o[0][n + "Size"] : Lh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], aj = /* @__PURE__ */ XS("inline", "width", "offsetWidth"), ij = /* @__PURE__ */ XS("block", "height", "offsetHeight");
function lj({ target: n, borderBoxSize: a }) {
  Qo.get(n)?.forEach((l) => {
    l(n, {
      get width() {
        return aj(n, a);
      },
      get height() {
        return ij(n, a);
      }
    });
  });
}
function rj(n) {
  n.forEach(lj);
}
function sj() {
  typeof ResizeObserver > "u" || (Io = new ResizeObserver(rj));
}
function oj(n, a) {
  Io || sj();
  const l = PS(n);
  return l.forEach((s) => {
    let o = Qo.get(s);
    o || (o = /* @__PURE__ */ new Set(), Qo.set(s, o)), o.add(a), Io?.observe(s);
  }), () => {
    l.forEach((s) => {
      const o = Qo.get(s);
      o?.delete(a), o?.size || Io?.unobserve(s);
    });
  };
}
const Zo = /* @__PURE__ */ new Set();
let Al;
function uj() {
  Al = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Zo.forEach((a) => a(n));
  }, window.addEventListener("resize", Al);
}
function cj(n) {
  return Zo.add(n), Al || uj(), () => {
    Zo.delete(n), !Zo.size && typeof Al == "function" && (window.removeEventListener("resize", Al), Al = void 0);
  };
}
function Bv(n, a) {
  return typeof n == "function" ? cj(n) : oj(n, a);
}
function fj(n) {
  return Lh(n) && n.tagName === "svg";
}
const dj = [...HS, Rt, On], hj = (n) => dj.find(BS(n)), Hv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), jl = () => ({
  x: Hv(),
  y: Hv()
}), qv = () => ({ min: 0, max: 0 }), Ct = () => ({
  x: qv(),
  y: qv()
}), mj = /* @__PURE__ */ new WeakMap();
function Tu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Wr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Uh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Vh = ["initial", ...Uh];
function Ru(n) {
  return Tu(n.animate) || Vh.some((a) => Wr(n[a]));
}
function KS(n) {
  return !!(Ru(n) || n.variants);
}
function pj(n, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
    if (Lt(o))
      n.addValue(s, o);
    else if (Lt(c))
      n.addValue(s, Ol(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const d = n.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = n.getStaticValue(s);
        n.addValue(s, Ol(d !== void 0 ? d : o, { owner: n }));
      }
  }
  for (const s in l)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const cu = { current: null }, Bh = { current: !1 }, yj = typeof window < "u";
function QS() {
  if (Bh.current = !0, !!yj)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => cu.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      cu.current = !1;
}
const kv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let fu = {};
function IS(n) {
  fu = n;
}
function gj() {
  return fu;
}
class vj {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Mh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Yt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, tt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = Ru(l), this.isVariantNode = KS(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: b, ...S } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in S) {
      const R = S[T];
      m[T] !== void 0 && Lt(R) && R.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, mj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Bh.current || QS(), this.shouldReduceMotion = cu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ai(this.notifyUpdate), ai(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && DS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, b = new AS({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ Wt(y)
      }), S = d(b);
      this.valueSubscriptions.set(a, () => {
        S(), b.cancel();
      });
      return;
    }
    const s = Ul.has(a);
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
    for (a in fu) {
      const l = fu[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ct();
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
    for (let s = 0; s < kv.length; s++) {
      const o = kv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, d = a[c];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = pj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = Ol(l === null ? void 0 : l, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, l) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Kb(s) || Ib(s)) ? s = parseFloat(s) : !hj(s) && On.test(l) && (s = kS(a, l)), this.setBaseTarget(a, Lt(s) ? s.get() : s)), Lt(s) ? s.get() : s;
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
      const c = Dh(this.props, l, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (l && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Lt(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, l) {
    return this.events[a] || (this.events[a] = new vh()), this.events[a].add(l);
  }
  notify(a, ...l) {
    this.events[a] && this.events[a].notify(...l);
  }
  scheduleRenderMicrotask() {
    Oh.render(this.render);
  }
}
class ZS extends vj {
  constructor() {
    super(...arguments), this.KeyframeResolver = XA;
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
    Lt(a) && (this.childSubscription = a.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class ii {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function JS({ top: n, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: n, max: s }
  };
}
function bj({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function Sj(n, a) {
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
function ld(n) {
  return n === void 0 || n === 1;
}
function Gd({ scale: n, scaleX: a, scaleY: l }) {
  return !ld(n) || !ld(a) || !ld(l);
}
function Ai(n) {
  return Gd(n) || WS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function WS(n) {
  return Pv(n.x) || Pv(n.y);
}
function Pv(n) {
  return n && n !== "0%";
}
function du(n, a, l) {
  const s = n - l, o = a * s;
  return l + o;
}
function Yv(n, a, l, s, o) {
  return o !== void 0 && (n = du(n, o, s)), du(n, l, s) + a;
}
function Fd(n, a = 0, l = 1, s, o) {
  n.min = Yv(n.min, a, l, s, o), n.max = Yv(n.max, a, l, s, o);
}
function e1(n, { x: a, y: l }) {
  Fd(n.x, a.translate, a.scale, a.originPoint), Fd(n.y, l.translate, l.scale, l.originPoint);
}
const Gv = 0.999999999999, Fv = 1.0000000000001;
function xj(n, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = l[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Yn(n.x, -c.scroll.offset.x), Yn(n.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, e1(n, d)), s && Ai(c.latestValues) && Jo(n, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Fv && a.x > Gv && (a.x = 1), a.y < Fv && a.y > Gv && (a.y = 1);
}
function Yn(n, a) {
  n.min += a, n.max += a;
}
function $v(n, a, l, s, o = 0.5) {
  const c = rt(n.min, n.max, o);
  Fd(n, a, l, c, s);
}
function Xv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Jo(n, a, l) {
  const s = l ?? n;
  $v(n.x, Xv(a.x, s.x), a.scaleX, a.scale, a.originX), $v(n.y, Xv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function t1(n, a) {
  return JS(Sj(n.getBoundingClientRect(), a));
}
function Ej(n, a, l) {
  const s = t1(n, l), { scroll: o } = a;
  return o && (Yn(s.x, o.offset.x), Yn(s.y, o.offset.y)), s;
}
const Tj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Rj = Ll.length;
function wj(n, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < Rj; c++) {
    const d = Ll[c], h = n[d];
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
      const m = YS(h, zh[d]);
      if (!p) {
        o = !1;
        const y = Tj[d] || d;
        s += `${y}(${m}) `;
      }
      l && (a[d] = m);
    }
  }
  return s = s.trim(), l ? s = l(a, o ? "" : s) : o && (s = "none"), s;
}
function Hh(n, a, l) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let d = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if (Ul.has(p)) {
      d = !0;
      continue;
    } else if (fS(p)) {
      o[p] = m;
      continue;
    } else {
      const y = YS(m, zh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (d || l ? s.transform = wj(a, n.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function n1(n, { style: a, vars: l }, s, o) {
  const c = n.style;
  let d;
  for (d in a)
    c[d] = a[d];
  o?.applyProjectionStyles(c, s);
  for (d in l)
    c.setProperty(d, l[d]);
}
function Kv(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Vr = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ye.test(n))
        n = parseFloat(n);
      else
        return n;
    const l = Kv(n, a.target.x), s = Kv(n, a.target.y);
    return `${l}% ${s}%`;
  }
}, Cj = {
  correct: (n, { treeScale: a, projectionDelta: l }) => {
    const s = n, o = On.parse(n);
    if (o.length > 5)
      return s;
    const c = On.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = rt(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
  }
}, $d = {
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
  boxShadow: Cj
};
function a1(n, { layout: a, layoutId: l }) {
  return Ul.has(n) || n.startsWith("origin") || (a || l !== void 0) && (!!$d[n] || n === "opacity");
}
function qh(n, a, l) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Lt(s[d]) || o && Lt(o[d]) || a1(d, n) || l?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function Mj(n) {
  return window.getComputedStyle(n);
}
class Aj extends ZS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = n1;
  }
  readValueFromInstance(a, l) {
    if (Ul.has(l))
      return this.projection?.isProjecting ? Od(l) : KM(a, l);
    {
      const s = Mj(a), o = (fS(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return t1(a, l);
  }
  build(a, l, s) {
    Hh(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return qh(a, l, s);
  }
}
const jj = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Dj = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Nj(n, a, l = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? jj : Dj;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${l}`;
}
const zj = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function i1(n, {
  attrX: a,
  attrY: l,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, y) {
  if (Hh(n, h, m), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: b, style: S } = n;
  b.transform && (S.transform = b.transform, delete b.transform), (S.transform || b.transformOrigin) && (S.transformOrigin = b.transformOrigin ?? "50% 50%", delete b.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete b.transformBox);
  for (const T of zj)
    b[T] !== void 0 && (S[T] = b[T], delete b[T]);
  a !== void 0 && (b.x = a), l !== void 0 && (b.y = l), s !== void 0 && (b.scale = s), o !== void 0 && Nj(b, o, c, d, !1);
}
const l1 = /* @__PURE__ */ new Set([
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
]), r1 = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Oj(n, a, l, s) {
  n1(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(l1.has(o) ? o : Nh(o), a.attrs[o]);
}
function s1(n, a, l) {
  const s = qh(n, a, l);
  for (const o in n)
    if (Lt(n[o]) || Lt(a[o])) {
      const c = Ll.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class _j extends ZS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ct;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if (Ul.has(l)) {
      const s = qS(l);
      return s && s.default || 0;
    }
    return l = l1.has(l) ? l : Nh(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return s1(a, l, s);
  }
  build(a, l, s) {
    i1(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    Oj(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = r1(a.tagName), super.mount(a);
  }
}
const Lj = Vh.length;
function o1(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const l = n.parent ? o1(n.parent) || {} : {};
    return n.props.initial !== void 0 && (l.initial = n.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < Lj; l++) {
    const s = Vh[l], o = n.props[s];
    (Wr(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function u1(n, a) {
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
const Uj = [...Uh].reverse(), Vj = Uh.length;
function Bj(n) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => UA(n, l, s)));
}
function Hj(n) {
  let a = Bj(n), l = Qv(), s = !0, o = !1;
  const c = (m) => (y, b) => {
    const S = Oi(n, b, m === "exit" ? n.presenceContext?.custom : void 0);
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
    const { props: y } = n, b = o1(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let R = {}, w = 1 / 0;
    for (let z = 0; z < Vj; z++) {
      const B = Uj[z], U = l[B], V = y[B] !== void 0 ? y[B] : b[B], $ = Wr(V), Q = B === m ? U.isActive : null;
      Q === !1 && (w = z);
      let ee = V === b[B] && V !== y[B] && $;
      if (ee && (s || o) && n.manuallyAnimateOnMount && (ee = !1), U.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !U.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !V && !U.prevProp || // Or if the prop doesn't define an animation
      Tu(V) || typeof V == "boolean")
        continue;
      if (B === "exit" && U.isActive && Q !== !0) {
        U.prevResolvedValues && (R = {
          ...R,
          ...U.prevResolvedValues
        });
        continue;
      }
      const j = qj(U.prevProp, V);
      let Z = j || // If we're making this variant active, we want to always make it active
      B === m && U.isActive && !ee && $ || // If we removed a higher-priority variant (i is in reverse order)
      z > w && $, W = !1;
      const ie = Array.isArray(V) ? V : [V];
      let K = ie.reduce(c(B), {});
      Q === !1 && (K = {});
      const { prevResolvedValues: Y = {} } = U, re = {
        ...Y,
        ...K
      }, te = (se) => {
        Z = !0, T.has(se) && (W = !0, T.delete(se)), U.needsAnimating[se] = !0;
        const ue = n.getValue(se);
        ue && (ue.liveStyle = !1);
      };
      for (const se in re) {
        const ue = K[se], Se = Y[se];
        if (R.hasOwnProperty(se))
          continue;
        let A = !1;
        Hd(ue) && Hd(Se) ? A = !u1(ue, Se) : A = ue !== Se, A ? ue != null ? te(se) : T.add(se) : ue !== void 0 && T.has(se) ? te(se) : U.protectedKeys[se] = !0;
      }
      U.prevProp = V, U.prevResolvedValues = K, U.isActive && (R = { ...R, ...K }), (s || o) && n.blockInitialAnimation && (Z = !1);
      const O = ee && j;
      Z && (!O || W) && S.push(...ie.map((se) => {
        const ue = { type: B };
        if (typeof se == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Se } = n, A = Oi(Se, se);
          if (Se.enteringChildren && A) {
            const { delayChildren: F } = A.transition || {};
            ue.delay = NS(Se.enteringChildren, n, F);
          }
        }
        return {
          animation: se,
          options: ue
        };
      }));
    }
    if (T.size) {
      const z = {};
      if (typeof y.initial != "boolean") {
        const B = Oi(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        B && B.transition && (z.transition = B.transition);
      }
      T.forEach((B) => {
        const U = n.getBaseTarget(B), V = n.getValue(B);
        V && (V.liveStyle = !0), z[B] = U ?? null;
      }), S.push({ animation: z });
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
      l = Qv(), o = !0;
    }
  };
}
function qj(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !u1(a, n) : !1;
}
function wi(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Qv() {
  return {
    animate: wi(!0),
    whileInView: wi(),
    whileHover: wi(),
    whileTap: wi(),
    whileDrag: wi(),
    whileFocus: wi(),
    exit: wi()
  };
}
function Xd(n, a) {
  n.min = a.min, n.max = a.max;
}
function Nn(n, a) {
  Xd(n.x, a.x), Xd(n.y, a.y);
}
function Iv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const c1 = 1e-4, kj = 1 - c1, Pj = 1 + c1, f1 = 0.01, Yj = 0 - f1, Gj = 0 + f1;
function Gt(n) {
  return n.max - n.min;
}
function Fj(n, a, l) {
  return Math.abs(n - a) <= l;
}
function Zv(n, a, l, s = 0.5) {
  n.origin = s, n.originPoint = rt(a.min, a.max, n.origin), n.scale = Gt(l) / Gt(a), n.translate = rt(l.min, l.max, n.origin) - n.originPoint, (n.scale >= kj && n.scale <= Pj || isNaN(n.scale)) && (n.scale = 1), (n.translate >= Yj && n.translate <= Gj || isNaN(n.translate)) && (n.translate = 0);
}
function $r(n, a, l, s) {
  Zv(n.x, a.x, l.x, s ? s.originX : void 0), Zv(n.y, a.y, l.y, s ? s.originY : void 0);
}
function Jv(n, a, l, s = 0) {
  const o = s ? rt(l.min, l.max, s) : l.min;
  n.min = o + a.min, n.max = n.min + Gt(a);
}
function $j(n, a, l, s) {
  Jv(n.x, a.x, l.x, s?.x), Jv(n.y, a.y, l.y, s?.y);
}
function Wv(n, a, l, s = 0) {
  const o = s ? rt(l.min, l.max, s) : l.min;
  n.min = a.min - o, n.max = n.min + Gt(a);
}
function hu(n, a, l, s) {
  Wv(n.x, a.x, l.x, s?.x), Wv(n.y, a.y, l.y, s?.y);
}
function e0(n, a, l, s, o) {
  return n -= a, n = du(n, 1 / l, s), o !== void 0 && (n = du(n, 1 / o, s)), n;
}
function Xj(n, a = 0, l = 1, s = 0.5, o, c = n, d = n) {
  if (Gn.test(a) && (a = parseFloat(a), a = rt(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = rt(c.min, c.max, s);
  n === c && (h -= a), n.min = e0(n.min, a, l, h, o), n.max = e0(n.max, a, l, h, o);
}
function t0(n, a, [l, s, o], c, d) {
  Xj(n, a[l], a[s], a[o], a.scale, c, d);
}
const Kj = ["x", "scaleX", "originX"], Qj = ["y", "scaleY", "originY"];
function n0(n, a, l, s) {
  t0(n.x, a, Kj, l ? l.x : void 0, s ? s.x : void 0), t0(n.y, a, Qj, l ? l.y : void 0, s ? s.y : void 0);
}
function a0(n) {
  return n.translate === 0 && n.scale === 1;
}
function d1(n) {
  return a0(n.x) && a0(n.y);
}
function i0(n, a) {
  return n.min === a.min && n.max === a.max;
}
function Ij(n, a) {
  return i0(n.x, a.x) && i0(n.y, a.y);
}
function l0(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function h1(n, a) {
  return l0(n.x, a.x) && l0(n.y, a.y);
}
function r0(n) {
  return Gt(n.x) / Gt(n.y);
}
function s0(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function Pn(n) {
  return [n("x"), n("y")];
}
function Zj(n, a, l) {
  let s = "";
  const o = n.x.translate / a.x, c = n.y.translate / a.y, d = l?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: b, rotateY: S, skewX: T, skewY: R } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), b && (s += `rotateX(${b}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const m1 = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], Jj = m1.length, o0 = (n) => typeof n == "string" ? parseFloat(n) : n, u0 = (n) => typeof n == "number" || ye.test(n);
function Wj(n, a, l, s, o, c) {
  o ? (n.opacity = rt(0, l.opacity ?? 1, e2(s)), n.opacityExit = rt(a.opacity ?? 1, 0, t2(s))) : c && (n.opacity = rt(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let d = 0; d < Jj; d++) {
    const h = m1[d];
    let p = c0(a, h), m = c0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || u0(p) === u0(m) ? (n[h] = Math.max(rt(o0(p), o0(m), s), 0), (Gn.test(m) || Gn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || l.rotate) && (n.rotate = rt(a.rotate || 0, l.rotate || 0, s));
}
function c0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const e2 = /* @__PURE__ */ p1(0, 0.5, lS), t2 = /* @__PURE__ */ p1(0.5, 0.95, En);
function p1(n, a, l) {
  return (s) => s < n ? 0 : s > a ? 1 : l(/* @__PURE__ */ Zr(n, a, s));
}
function n2(n, a, l) {
  const s = Lt(n) ? n : Ol(n);
  return s.start(jh("", s, a, l)), s.animation;
}
function es(n, a, l, s = { passive: !0 }) {
  return n.addEventListener(a, l, s), () => n.removeEventListener(a, l);
}
const a2 = (n, a) => n.depth - a.depth;
class i2 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    gh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    lu(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort(a2), this.isDirty = !1, this.children.forEach(a);
  }
}
function l2(n, a) {
  const l = Yt.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (ai(s), n(c - a));
  };
  return tt.setup(s, !0), () => ai(s);
}
function Wo(n) {
  return Lt(n) ? n.get() : n;
}
class r2 {
  constructor() {
    this.members = [];
  }
  add(a) {
    gh(this.members, a);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (lu(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (lu(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
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
const eu = {
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
}, rd = ["", "X", "Y", "Z"], s2 = 1e3;
let o2 = 0;
function sd(n, a, l, s) {
  const { latestValues: o } = a;
  o[n] && (l[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function y1(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const l = US(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(l, "transform", tt, !(o || c));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && y1(s);
}
function g1({ attachResizeListener: n, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = o2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(f2), this.nodes.forEach(g2), this.nodes.forEach(v2), this.nodes.forEach(d2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new i2());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new vh()), this.eventHandlers.get(d).add(h);
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
      this.isSVG = Lh(d) && !fj(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let y, b = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        tt.read(() => {
          b = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== b && (b = T, this.root.updateBlockedByResize = !0, y && y(), y = l2(S, 250), eu.hasAnimatedSinceResize && (eu.hasAnimatedSinceResize = !1, this.nodes.forEach(h0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: b, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || m.getDefaultTransition() || T2, { onLayoutAnimationStart: w, onLayoutAnimationComplete: D } = m.getProps(), z = !this.targetLayout || !h1(this.targetLayout, T), B = !b && S;
        if (this.options.layoutRoot || this.resumeFrom || B || b && (z || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const U = {
            ...Ah(R, "layout"),
            onPlay: w,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (U.delay = 0, U.type = !1), this.startAnimation(U), this.setAnimationOrigin(y, B);
        } else
          b || h0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ai(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(b2), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && y1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(m2), this.nodes.forEach(f0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(d0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(p2), this.nodes.forEach(y2), this.nodes.forEach(u2), this.nodes.forEach(c2)) : this.nodes.forEach(d0), this.clearAllSnapshots();
      const h = Yt.now();
      _t.delta = $n(0, 1e3 / 60, h - _t.timestamp), _t.timestamp = h, _t.isProcessing = !0, Jf.update.process(_t), Jf.preRender.process(_t), Jf.render.process(_t), _t.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Oh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(h2), this.sharedNodes.forEach(S2);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Gt(this.snapshot.measuredBox.x) && !Gt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Ct()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !d1(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || Ai(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), R2(p), {
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
        return Ct();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(w2))) {
        const { scroll: m } = this.root;
        m && (Yn(h.x, m.offset.x), Yn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = Ct();
      if (Nn(h, d), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: b } = m;
        m !== this.root && y && b.layoutScroll && (y.wasRoot && Nn(h, d), Yn(h.x, y.offset.x), Yn(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, p) {
      const m = p || Ct();
      Nn(m, d);
      for (let y = 0; y < this.path.length; y++) {
        const b = this.path[y];
        !h && b.options.layoutScroll && b.scroll && b !== b.root && (Yn(m.x, -b.scroll.offset.x), Yn(m.y, -b.scroll.offset.y)), Ai(b.latestValues) && Jo(m, b.latestValues, b.layout?.layoutBox);
      }
      return Ai(this.latestValues) && Jo(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = Ct();
      Nn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ai(m.latestValues))
          continue;
        let y;
        m.instance && (Gd(m.latestValues) && m.updateSnapshot(), y = Ct(), Nn(y, m.measurePageBox())), n0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return Ai(this.latestValues) && n0(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== _t.timestamp && this.relativeParent.resolveTargetDelta(!0);
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
      this.resolvedRelativeTargetAt = _t.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Ct(), this.targetWithTransforms = Ct()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), $j(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Nn(this.target, this.layout.layoutBox), e1(this.target, this.targetDelta)) : Nn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Gd(this.parent.latestValues) || WS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Ct(), this.relativeTargetOrigin = Ct(), hu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), Nn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === _t.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      Nn(this.layoutCorrected, this.layout.layoutBox);
      const b = this.treeScale.x, S = this.treeScale.y;
      xj(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Ct());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Iv(this.prevProjectionDelta.x, this.projectionDelta.x), Iv(this.prevProjectionDelta.y, this.projectionDelta.y)), $r(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== b || this.treeScale.y !== S || !s0(this.projectionDelta.x, this.prevProjectionDelta.x) || !s0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = jl(), this.projectionDelta = jl(), this.projectionDeltaWithTransform = jl();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, b = jl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = Ct(), T = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, w = T !== R, D = this.getStack(), z = !D || D.members.length <= 1, B = !!(w && !z && this.options.crossfade === !0 && !this.path.some(E2));
      this.animationProgress = 0;
      let U;
      this.mixTargetDelta = (V) => {
        const $ = V / 1e3;
        m0(b.x, d.x, $), m0(b.y, d.y, $), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (hu(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), x2(this.relativeTarget, this.relativeTargetOrigin, S, $), U && Ij(this.relativeTarget, U) && (this.isProjectionDirty = !1), U || (U = Ct()), Nn(U, this.relativeTarget)), w && (this.animationValues = y, Wj(y, m, this.latestValues, $, B, z)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = $;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ai(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = tt.update(() => {
        eu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ol(0)), this.motionValue.jump(0, !1), this.currentAnimation = n2(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(s2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && v1(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || Ct();
          const b = Gt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + b;
          const S = Gt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        Nn(h, p), Jo(h, y), $r(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new r2()), this.sharedNodes.get(d).add(h);
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
      p.z && sd("z", d, m, this.animationValues);
      for (let y = 0; y < rd.length; y++)
        sd(`rotate${rd[y]}`, d, m, this.animationValues), sd(`skew${rd[y]}`, d, m, this.animationValues);
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
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Wo(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Wo(h?.pointerEvents) || ""), this.hasProjected && !Ai(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let b = Zj(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (b = p(y, b)), d.transform = b;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const R in $d) {
        if (y[R] === void 0)
          continue;
        const { correct: w, applyTo: D, isCSSVariable: z } = $d[R], B = b === "none" ? y[R] : w(y[R], m);
        if (D) {
          const U = D.length;
          for (let V = 0; V < U; V++)
            d[D[V]] = B;
        } else
          z ? this.options.visualElement.renderState.vars[R] = B : d[R] = B;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? Wo(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(f0), this.root.sharedNodes.clear();
    }
  };
}
function u2(n) {
  n.updateLayout();
}
function c2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = n.layout, { animationType: o } = n.options, c = a.source !== n.layout.source;
    if (o === "size")
      Pn((y) => {
        const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Gt(b);
        b.min = l[y].min, b.max = b.min + S;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Xd(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else v1(o, a.layoutBox, l) && Pn((y) => {
      const b = c ? a.measuredBox[y] : a.layoutBox[y], S = Gt(l[y]);
      b.max = b.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + S);
    });
    const d = jl();
    $r(d, l, a.layoutBox);
    const h = jl();
    c ? $r(h, n.applyTransform(s, !0), a.measuredBox) : $r(h, l, a.layoutBox);
    const p = !d1(d);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: b, layout: S } = y;
        if (b && S) {
          const T = n.options.layoutAnchor || void 0, R = Ct();
          hu(R, a.layoutBox, b.layoutBox, T);
          const w = Ct();
          hu(w, l, S.layoutBox, T), h1(R, w) || (m = !0), y.options.layoutRoot && (n.relativeTarget = w, n.relativeTargetOrigin = R, n.relativeParent = y);
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
function f2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function d2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function h2(n) {
  n.clearSnapshot();
}
function f0(n) {
  n.clearMeasurements();
}
function m2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function d0(n) {
  n.isLayoutDirty = !1;
}
function p2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function y2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function h0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function g2(n) {
  n.resolveTargetDelta();
}
function v2(n) {
  n.calcProjection();
}
function b2(n) {
  n.resetSkewAndRotation();
}
function S2(n) {
  n.removeLeadSnapshot();
}
function m0(n, a, l) {
  n.translate = rt(a.translate, 0, l), n.scale = rt(a.scale, 1, l), n.origin = a.origin, n.originPoint = a.originPoint;
}
function p0(n, a, l, s) {
  n.min = rt(a.min, l.min, s), n.max = rt(a.max, l.max, s);
}
function x2(n, a, l, s) {
  p0(n.x, a.x, l.x, s), p0(n.y, a.y, l.y, s);
}
function E2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const T2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, y0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), g0 = y0("applewebkit/") && !y0("chrome/") ? Math.round : En;
function v0(n) {
  n.min = g0(n.min), n.max = g0(n.max);
}
function R2(n) {
  v0(n.x), v0(n.y);
}
function v1(n, a, l) {
  return n === "position" || n === "preserve-aspect" && !Fj(r0(a), r0(l), 0.2);
}
function w2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const C2 = g1({
  attachResizeListener: (n, a) => es(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), od = {
  current: void 0
}, b1 = g1({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!od.current) {
      const n = new C2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), od.current = n;
    }
    return od.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), kh = x.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function b0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function M2(...n) {
  return (a) => {
    let l = !1;
    const s = n.map((o) => {
      const c = b0(o, a);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : b0(n[o], null);
        }
      };
  };
}
function A2(...n) {
  return x.useCallback(M2(...n), n);
}
class j2 extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const l = this.props.childRef.current;
    if (Xo(l) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, o = Xo(s) && s.offsetWidth || 0, c = Xo(s) && s.offsetHeight || 0, d = getComputedStyle(l), h = this.props.sizeRef.current;
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
function D2({ children: n, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const d = x.useId(), h = x.useRef(null), p = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(kh), y = n.props?.ref ?? n?.ref, b = A2(h, y);
  return x.useInsertionEffect(() => {
    const { width: S, height: T, top: R, left: w, right: D, bottom: z } = p.current;
    if (a || c === !1 || !h.current || !S || !T)
      return;
    const B = l === "left" ? `left: ${w}` : `right: ${D}`, U = s === "bottom" ? `bottom: ${z}` : `top: ${R}`;
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
            ${U}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), $.contains(V) && $.removeChild(V);
    };
  }, [a]), v.jsx(j2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: b }) });
}
const N2 = ({ children: n, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const y = yh(z2), b = x.useId();
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
  }, [l]), n = v.jsx(D2, { pop: d === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: n }), v.jsx(xu.Provider, { value: T, children: n });
};
function z2() {
  return /* @__PURE__ */ new Map();
}
function S1(n = !0) {
  const a = x.useContext(xu);
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
const Uo = (n) => n.key || "";
function S0(n) {
  const a = [];
  return x.Children.forEach(n, (l) => {
    x.isValidElement(l) && a.push(l);
  }), a;
}
const O2 = ({ children: n, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, b] = S1(d), S = x.useMemo(() => S0(n), [n]), T = d && !y ? [] : S.map(Uo), R = x.useRef(!0), w = x.useRef(S), D = yh(() => /* @__PURE__ */ new Map()), z = x.useRef(/* @__PURE__ */ new Set()), [B, U] = x.useState(S), [V, $] = x.useState(S);
  Xb(() => {
    R.current = !1, w.current = S;
    for (let j = 0; j < V.length; j++) {
      const Z = Uo(V[j]);
      T.includes(Z) ? (D.delete(Z), z.current.delete(Z)) : D.get(Z) !== !0 && D.set(Z, !1);
    }
  }, [V, T.length, T.join("-")]);
  const Q = [];
  if (S !== B) {
    let j = [...S];
    for (let Z = 0; Z < V.length; Z++) {
      const W = V[Z], ie = Uo(W);
      T.includes(ie) || (j.splice(Z, 0, W), Q.push(W));
    }
    return c === "wait" && Q.length && (j = Q), $(S0(j)), U(S), null;
  }
  const { forceRender: ee } = x.useContext(ph);
  return v.jsx(v.Fragment, { children: V.map((j) => {
    const Z = Uo(j), W = d && !y ? !1 : S === V || T.includes(Z), ie = () => {
      if (z.current.has(Z))
        return;
      if (D.has(Z))
        z.current.add(Z), D.set(Z, !0);
      else
        return;
      let K = !0;
      D.forEach((Y) => {
        Y || (K = !1);
      }), K && (ee?.(), $(w.current), d && b?.(), s && s());
    };
    return v.jsx(N2, { isPresent: W, initial: !R.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: W ? void 0 : ie, anchorX: h, anchorY: p, children: j }, Z);
  }) });
}, x1 = x.createContext({ strict: !1 }), x0 = {
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
let E0 = !1;
function _2() {
  if (E0)
    return;
  const n = {};
  for (const a in x0)
    n[a] = {
      isEnabled: (l) => x0[a].some((s) => !!l[s])
    };
  IS(n), E0 = !0;
}
function E1() {
  return _2(), gj();
}
function L2(n) {
  const a = E1();
  for (const l in n)
    a[l] = {
      ...a[l],
      ...n[l]
    };
  IS(a);
}
const U2 = /* @__PURE__ */ new Set([
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
function mu(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || U2.has(n);
}
let T1 = (n) => !mu(n);
function V2(n) {
  typeof n == "function" && (T1 = (a) => a.startsWith("on") ? !mu(a) : n(a));
}
try {
  V2(require("@emotion/is-prop-valid").default);
} catch {
}
function B2(n, a, l) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Lt(n[o]) || (T1(o) || l === !0 && mu(o) || !a && !mu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const wu = /* @__PURE__ */ x.createContext({});
function H2(n, a) {
  if (Ru(n)) {
    const { initial: l, animate: s } = n;
    return {
      initial: l === !1 || Wr(l) ? l : void 0,
      animate: Wr(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function q2(n) {
  const { initial: a, animate: l } = H2(n, x.useContext(wu));
  return x.useMemo(() => ({ initial: a, animate: l }), [T0(a), T0(l)]);
}
function T0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Ph = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function R1(n, a, l) {
  for (const s in a)
    !Lt(a[s]) && !a1(s, l) && (n[s] = a[s]);
}
function k2({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const l = Ph();
    return Hh(l, a, n), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function P2(n, a) {
  const l = n.style || {}, s = {};
  return R1(s, l, n), Object.assign(s, k2(n, a)), s;
}
function Y2(n, a) {
  const l = {}, s = P2(n, a);
  return n.drag && n.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const w1 = () => ({
  ...Ph(),
  attrs: {}
});
function G2(n, a, l, s) {
  const o = x.useMemo(() => {
    const c = w1();
    return i1(c, a, r1(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    R1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const F2 = [
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
function Yh(n) {
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
      !!(F2.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function $2(n, a, l, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? Yh(n) ? G2 : Y2)(a, s, o, n), m = B2(a, typeof n == "string", c), y = n !== x.Fragment ? { ...m, ...p, ref: l } : {}, { children: b } = a, S = x.useMemo(() => Lt(b) ? b.get() : b, [b]);
  return x.createElement(n, {
    ...y,
    children: S
  });
}
function X2({ scrapeMotionValuesFromProps: n, createRenderState: a }, l, s, o) {
  return {
    latestValues: K2(l, s, o, n),
    renderState: a()
  };
}
function K2(n, a, l, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = Wo(c[S]);
  let { initial: d, animate: h } = n;
  const p = Ru(n), m = KS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || d === !1;
  const b = y ? h : d;
  if (b && typeof b != "boolean" && !Tu(b)) {
    const S = Array.isArray(b) ? b : [b];
    for (let T = 0; T < S.length; T++) {
      const R = Dh(n, S[T]);
      if (R) {
        const { transitionEnd: w, transition: D, ...z } = R;
        for (const B in z) {
          let U = z[B];
          if (Array.isArray(U)) {
            const V = y ? U.length - 1 : 0;
            U = U[V];
          }
          U !== null && (o[B] = U);
        }
        for (const B in w)
          o[B] = w[B];
      }
    }
  }
  return o;
}
const C1 = (n) => (a, l) => {
  const s = x.useContext(wu), o = x.useContext(xu), c = () => X2(n, a, s, o);
  return l ? c() : yh(c);
}, Q2 = /* @__PURE__ */ C1({
  scrapeMotionValuesFromProps: qh,
  createRenderState: Ph
}), I2 = /* @__PURE__ */ C1({
  scrapeMotionValuesFromProps: s1,
  createRenderState: w1
}), Z2 = Symbol.for("motionComponentSymbol");
function J2(n, a, l) {
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
const M1 = x.createContext({});
function wl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function W2(n, a, l, s, o, c) {
  const { visualElement: d } = x.useContext(wu), h = x.useContext(x1), p = x.useContext(xu), m = x.useContext(kh), y = m.reducedMotion, b = m.skipAnimations, S = x.useRef(null), T = x.useRef(!1);
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
  const R = S.current, w = x.useContext(M1);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && eD(S.current, l, o, w);
  const D = x.useRef(!1);
  x.useInsertionEffect(() => {
    R && D.current && R.update(l, p);
  });
  const z = l[LS], B = x.useRef(!!z && typeof window < "u" && !window.MotionHandoffIsComplete?.(z) && window.MotionHasOptimisedAnimation?.(z));
  return Xb(() => {
    T.current = !0, R && (D.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), B.current && R.animationState && R.animationState.animateChanges());
  }), x.useEffect(() => {
    R && (!B.current && R.animationState && R.animationState.animateChanges(), B.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(z);
    }), B.current = !1), R.enteringChildren = void 0);
  }), R;
}
function eD(n, a, l, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: b } = a;
  n.projection = new l(n.latestValues, a["data-framer-portal-id"] ? void 0 : A1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!d || h && wl(h),
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
function A1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : A1(n.parent);
}
function ud(n, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && L2(s);
  const c = l ? l === "svg" : Yh(n), d = c ? I2 : Q2;
  function h(m, y) {
    let b;
    const S = {
      ...x.useContext(kh),
      ...m,
      layoutId: tD(m)
    }, { isStatic: T } = S, R = q2(m), w = d(m, T);
    if (!T && typeof window < "u") {
      nD();
      const D = aD(S);
      b = D.MeasureLayout, R.visualElement = W2(n, w, S, o, D.ProjectionNode, c);
    }
    return v.jsxs(wu.Provider, { value: R, children: [b && R.visualElement ? v.jsx(b, { visualElement: R.visualElement, ...S }) : null, $2(n, m, J2(w, R.visualElement, y), w, T, a, c)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = x.forwardRef(h);
  return p[Z2] = n, p;
}
function tD({ layoutId: n }) {
  const a = x.useContext(ph).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function nD(n, a) {
  x.useContext(x1).strict;
}
function aD(n) {
  const a = E1(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function iD(n, a) {
  if (typeof Proxy > "u")
    return ud;
  const l = /* @__PURE__ */ new Map(), s = (c, d) => ud(c, d, n, a), o = (c, d) => s(c, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, d) => d === "create" ? s : (l.has(d) || l.set(d, ud(d, void 0, n, a)), l.get(d))
  });
}
const lD = (n, a) => a.isSVG ?? Yh(n) ? new _j(a) : new Aj(a, {
  allowProjection: n !== x.Fragment
});
class rD extends ii {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Hj(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Tu(a) && (this.unmountControls = a.subscribe(this.node));
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
let sD = 0;
class oD extends ii {
  constructor() {
    super(...arguments), this.id = sD++, this.isExitComplete = !1;
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
          const h = Oi(this.node, c, d);
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
const uD = {
  animation: {
    Feature: rD
  },
  exit: {
    Feature: oD
  }
};
function fs(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const cD = (n) => (a) => _h(a) && n(a, fs(a));
function Xr(n, a, l, s) {
  return es(n, a, cD(l), s);
}
const j1 = ({ current: n }) => n ? n.ownerDocument.defaultView : null, R0 = (n, a) => Math.abs(n - a);
function fD(n, a) {
  const l = R0(n.x, a.x), s = R0(n.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const w0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class D1 {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Vo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = cd(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, w = fD(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !w)
        return;
      const { point: D } = T, { timestamp: z } = _t;
      this.history.push({ ...D, timestamp: z });
      const { onStart: B, onMove: U } = this.handlers;
      R || (B && B(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), U && U(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, R) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = Vo(R, this.transformPagePoint), tt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, R) => {
      this.end();
      const { onEnd: w, onSessionEnd: D, resumeAnimation: z } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && z && z(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const B = cd(T.type === "pointercancel" ? this.lastMoveEventInfo : Vo(R, this.transformPagePoint), this.history);
      this.startEvent && w && w(T, B), D && D(T, B);
    }, !_h(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = fs(a), m = Vo(p, this.transformPagePoint), { point: y } = m, { timestamp: b } = _t;
    this.history = [{ ...y, timestamp: b }];
    const { onSessionStart: S } = l;
    S && S(a, cd(m, this.history)), this.removeListeners = os(Xr(this.contextWindow, "pointermove", this.handlePointerMove), Xr(this.contextWindow, "pointerup", this.handlePointerUp), Xr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let l = a.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (w0.has(s.overflowX) || w0.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ai(this.updatePoint);
  }
}
function Vo(n, a) {
  return a ? { point: a(n.point) } : n;
}
function C0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function cd({ point: n }, a) {
  return {
    point: n,
    delta: C0(n, N1(a)),
    offset: C0(n, dD(a)),
    velocity: hD(a, 0.1)
  };
}
function dD(n) {
  return n[0];
}
function N1(n) {
  return n[n.length - 1];
}
function hD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let l = n.length - 1, s = null;
  const o = N1(n);
  for (; l >= 0 && (s = n[l], !(o.timestamp - s.timestamp > /* @__PURE__ */ Wt(a))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ Wt(a) * 2 && (s = n[1]);
  const c = /* @__PURE__ */ Sn(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function mD(n, { min: a, max: l }, s) {
  return a !== void 0 && n < a ? n = s ? rt(a, n, s.min) : Math.max(n, a) : l !== void 0 && n > l && (n = s ? rt(l, n, s.max) : Math.min(n, l)), n;
}
function M0(n, a, l) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: l !== void 0 ? n.max + l - (n.max - n.min) : void 0
  };
}
function pD(n, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: M0(n.x, l, o),
    y: M0(n.y, a, s)
  };
}
function A0(n, a) {
  let l = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([l, s] = [s, l]), { min: l, max: s };
}
function yD(n, a) {
  return {
    x: A0(n.x, a.x),
    y: A0(n.y, a.y)
  };
}
function gD(n, a) {
  let l = 0.5;
  const s = Gt(n), o = Gt(a);
  return o > s ? l = /* @__PURE__ */ Zr(a.min, a.max - s, n.min) : s > o && (l = /* @__PURE__ */ Zr(n.min, n.max - o, a.min)), $n(0, 1, l);
}
function vD(n, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - n.min), a.max !== void 0 && (l.max = a.max - n.min), l;
}
const Kd = 0.35;
function bD(n = Kd) {
  return n === !1 ? n = 0 : n === !0 && (n = Kd), {
    x: j0(n, "left", "right"),
    y: j0(n, "top", "bottom")
  };
}
function j0(n, a, l) {
  return {
    min: D0(n, a),
    max: D0(n, l)
  };
}
function D0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const SD = /* @__PURE__ */ new WeakMap();
class xD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Ct(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (b) => {
      l && this.snapToCursor(fs(b).point), this.stopAnimation();
    }, d = (b, S) => {
      const { drag: T, dragPropagation: R, onDragStart: w } = this.getProps();
      if (T && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = KA(T), !this.openDragLock))
        return;
      this.latestPointerEvent = b, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Pn((z) => {
        let B = this.getAxisMotionValue(z).get() || 0;
        if (Gn.test(B)) {
          const { projection: U } = this.visualElement;
          if (U && U.layout) {
            const V = U.layout.layoutBox[z];
            V && (B = Gt(V) * (parseFloat(B) / 100));
          }
        }
        this.originPoint[z] = B;
      }), w && tt.update(() => w(b, S), !1, !0), qd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: R, onDirectionLock: w, onDrag: D } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: z } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = TD(z), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, z), this.updateAxis("y", S.point, z), this.visualElement.render(), D && tt.update(() => D(b, S), !1, !0);
    }, p = (b, S) => {
      this.latestPointerEvent = b, this.latestPanInfo = S, this.stop(b, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: b } = this.getProps();
      (b || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new D1(a, {
      onSessionStart: c,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: j1(this.visualElement),
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
    if (!s || !Bo(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = mD(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && wl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = pD(s.layoutBox, a) : this.constraints = !1, this.elastic = bD(l), o !== this.constraints && !wl(a) && s && this.constraints && !this.hasMutatedConstraints && Pn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = vD(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: l } = this.getProps();
    if (!a || !wl(a))
      return !1;
    const s = a.current;
    _i(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = Ej(s, o.root, this.visualElement.getTransformPagePoint());
    let d = yD(o.layout.layoutBox, c);
    if (l) {
      const h = l(bj(d));
      this.hasMutatedConstraints = !!h, h && (d = JS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = Pn((y) => {
      if (!Bo(y, l, this.currentDirection))
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
    return qd(this.visualElement, a), s.start(jh(a, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    Pn((a) => this.getAxisMotionValue(a).stop());
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
    Pn((l) => {
      const { drag: s } = this.getProps();
      if (!Bo(l, s, this.currentDirection))
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
    if (!wl(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Pn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = gD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Pn((d) => {
      if (!Bo(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(rt(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    SD.set(this.visualElement, this);
    const a = this.visualElement.current, l = Xr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: b = !0 } = this.getProps(), S = m.target, T = S !== a && ej(S);
      y && b && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      wl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = ED(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), tt.read(o);
    const h = es(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Pn((b) => {
        const S = this.getAxisMotionValue(b);
        S && (this.originPoint[b] += m[b].translate, S.set(S.get() + m[b].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), d(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: d = Kd, dragMomentum: h = !0 } = a;
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
function N0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function ED(n, a, l) {
  const s = Bv(n, N0(l)), o = Bv(a, N0(l));
  return () => {
    s(), o();
  };
}
function Bo(n, a, l) {
  return (a === !0 || a === n) && (l === null || l === n);
}
function TD(n, a = 10) {
  let l = null;
  return Math.abs(n.y) > a ? l = "y" : Math.abs(n.x) > a && (l = "x"), l;
}
class RD extends ii {
  constructor(a) {
    super(a), this.removeGroupControls = En, this.removeListeners = En, this.controls = new xD(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || En;
  }
  update() {
    const { dragControls: a } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    a !== l && (this.removeGroupControls(), a && (this.removeGroupControls = a.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const fd = (n) => (a, l) => {
  n && tt.update(() => n(a, l), !1, !0);
};
class wD extends ii {
  constructor() {
    super(...arguments), this.removePointerDownListener = En;
  }
  onPointerDown(a) {
    this.session = new D1(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: j1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: l, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: fd(a),
      onStart: fd(l),
      onMove: fd(s),
      onEnd: (c, d) => {
        delete this.session, o && tt.postRender(() => o(c, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Xr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let dd = !1;
class CD extends x.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: l, switchLayoutGroup: s, layoutId: o } = this.props, { projection: c } = a;
    c && (l.group && l.group.add(c), s && s.register && o && s.register(c), dd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), eu.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: l, visualElement: s, drag: o, isPresent: c } = this.props, { projection: d } = s;
    return d && (d.isPresent = c, a.layoutDependency !== l && d.setOptions({
      ...d.options,
      layoutDependency: l
    }), dd = !0, o || a.layoutDependency !== l || l === void 0 || a.isPresent !== c ? d.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? d.promote() : d.relegate() || tt.postRender(() => {
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
    dd = !0, o && (o.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function z1(n) {
  const [a, l] = S1(), s = x.useContext(ph);
  return v.jsx(CD, { ...n, layoutGroup: s, switchLayoutGroup: x.useContext(M1), isPresent: a, safeToRemove: l });
}
const MD = {
  pan: {
    Feature: wD
  },
  drag: {
    Feature: RD,
    ProjectionNode: b1,
    MeasureLayout: z1
  }
};
function z0(n, a, l) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && tt.postRender(() => c(a, fs(a)));
}
class AD extends ii {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = IA(a, (l, s) => (z0(this.node, s, "Start"), (o) => z0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class jD extends ii {
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
    this.unmount = os(es(this.node.current, "focus", () => this.onFocus()), es(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function O0(n, a, l) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", l === "Start");
  const o = "onTap" + (l === "End" ? "" : l), c = s[o];
  c && tt.postRender(() => c(a, fs(a)));
}
class DD extends ii {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = nj(a, (o, c) => (O0(this.node, c, "Start"), (d, { success: h }) => O0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Qd = /* @__PURE__ */ new WeakMap(), hd = /* @__PURE__ */ new WeakMap(), ND = (n) => {
  const a = Qd.get(n.target);
  a && a(n);
}, zD = (n) => {
  n.forEach(ND);
};
function OD({ root: n, ...a }) {
  const l = n || document;
  hd.has(l) || hd.set(l, {});
  const s = hd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(zD, { root: n, ...a })), s[o];
}
function _D(n, a, l) {
  const s = OD(a);
  return Qd.set(n, l), s.observe(n), () => {
    Qd.delete(n), s.unobserve(n);
  };
}
const LD = {
  some: 0,
  all: 1
};
class UD extends ii {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, d = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : LD[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: b } = this.node.getProps(), S = m ? y : b;
      S && S(p);
    };
    this.stopObserver = _D(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(VD(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function VD({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (l) => n[l] !== a[l];
}
const BD = {
  inView: {
    Feature: UD
  },
  tap: {
    Feature: DD
  },
  focus: {
    Feature: jD
  },
  hover: {
    Feature: AD
  }
}, HD = {
  layout: {
    ProjectionNode: b1,
    MeasureLayout: z1
  }
}, qD = {
  ...uD,
  ...BD,
  ...MD,
  ...HD
}, Gh = /* @__PURE__ */ iD(qD, lD);
function kD() {
  !Bh.current && QS();
  const [n] = x.useState(cu.current);
  return n;
}
const Br = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function PD({ vector: n, pulseKey: a, size: l = 220 }) {
  const s = kD(), o = l / 2, c = l / 2, d = l / 2 - 28, h = Br.length, p = Br.map((b, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * R, y: c + Math.sin(T) * d * R };
  }), m = Br.map((b, S) => {
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
          Gh.polygon,
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
            children: Br[S]
          },
          Br[S]
        ))
      ]
    }
  );
}
const YD = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function GD({ vector: n, onChange: a, disabled: l = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ v.jsx("div", { className: NC, role: "group", "aria-label": "Emotion axes", children: YD.map((o, c) => /* @__PURE__ */ v.jsxs("div", { className: zC, children: [
    /* @__PURE__ */ v.jsx("label", { htmlFor: `emo-slider-${c}`, className: Gb, children: o }),
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
        className: Fb
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
        className: $b,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const FD = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], O1 = [0, 0, 0, 0, 0, 0, 0, 0], $D = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function XD({ value: n, onChange: a, deploymentId: l }) {
  const s = n.mode ?? "none", o = KD(n.vector), c = n.emotionAlpha ?? 1, [d, h] = x.useState([]), [p, m] = x.useState(null), [y, b] = x.useState(""), [S, T] = x.useState(""), [R, w] = x.useState(0), [D, z] = x.useState(!1), B = x.useRef(!0);
  x.useEffect(() => (B.current = !0, () => {
    B.current = !1;
  }), []), x.useEffect(() => {
    let K = !1;
    return m(null), EC(l).then((Y) => {
      K || h(_0(Y.presets));
    }).catch((Y) => {
      K || m(md(Y));
    }), () => {
      K = !0;
    };
  }, [l]);
  const U = x.useMemo(
    () => d.find((K) => K.presetId === S) ?? null,
    [d, S]
  ), V = (K) => {
    a({ ...n, mode: K });
  }, $ = (K) => {
    a({ ...n, mode: "emotion_vector", vector: K }), U && !ID(U.vector, K) && T("");
  }, Q = (K) => {
    const Y = Math.max(0, Math.min(1, Number.isFinite(K) ? K : 1));
    a({ ...n, emotionAlpha: Y });
  }, ee = (K) => {
    const Y = d.find((re) => re.presetId === K);
    Y && (T(K), a({ ...n, mode: "emotion_vector", vector: Y.vector }), w((re) => re + 1));
  }, j = async () => {
    const K = y.trim();
    if (K) {
      z(!0), m(null);
      try {
        const Y = await TC(l, K, o);
        if (!B.current) return;
        h((re) => _0([Y, ...re.filter((te) => te.presetId !== Y.presetId)])), T(Y.presetId), b(""), w((re) => re + 1);
      } catch (Y) {
        B.current && m(md(Y));
      } finally {
        B.current && z(!1);
      }
    }
  }, Z = async (K) => {
    const Y = d;
    h((re) => re.filter((te) => te.presetId !== K)), S === K && T("");
    try {
      await RC(l, K);
    } catch (re) {
      B.current && (h(Y), m(md(re)));
    }
  }, W = () => $(O1), ie = () => {
    const K = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    $(K), w((Y) => Y + 1);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: wC, children: [
    /* @__PURE__ */ v.jsxs("div", { className: CC, children: [
      /* @__PURE__ */ v.jsx(PD, { vector: o, pulseKey: R }),
      /* @__PURE__ */ v.jsx("span", { className: Zf, children: ZD(s, U?.presetName) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: MC, children: [
      /* @__PURE__ */ v.jsx("div", { className: AC, role: "radiogroup", "aria-label": "Emotion source", children: FD.map((K) => /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === K.id,
          className: s === K.id ? DC : jC,
          onClick: () => V(K.id),
          children: K.label
        },
        K.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsxs("div", { className: OC, children: [
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: _C,
              value: S,
              onChange: (K) => ee(K.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((K) => /* @__PURE__ */ v.jsx("option", { value: K.presetId, children: K.presetName }, K.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: UC,
              onClick: () => void Z(S),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: pv, onClick: W, children: "Reset" }),
          /* @__PURE__ */ v.jsx("button", { type: "button", className: pv, onClick: ie, children: "Random" })
        ] }),
        /* @__PURE__ */ v.jsx(GD, { vector: o, onChange: $ }),
        /* @__PURE__ */ v.jsxs(
          "form",
          {
            className: HC,
            onSubmit: (K) => {
              K.preventDefault(), j();
            },
            children: [
              /* @__PURE__ */ v.jsx(
                "input",
                {
                  type: "text",
                  className: qC,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (K) => b(K.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  type: "submit",
                  className: LC,
                  disabled: D || y.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ v.jsxs("label", { children: [
        /* @__PURE__ */ v.jsxs("span", { className: Zf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ v.jsx(
          "textarea",
          {
            className: BC,
            value: n.qwenTemplate ?? "",
            onChange: (K) => a({ ...n, mode: "qwen_template", qwenTemplate: K.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ v.jsx("p", { className: Zf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ v.jsxs("div", { className: VC, children: [
        /* @__PURE__ */ v.jsx("span", { className: Gb, children: "alpha" }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Fb,
            onChange: (K) => Q(Number(K.currentTarget.value)),
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
            className: $b,
            onChange: (K) => Q(Number(K.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ v.jsx("p", { className: kC, children: p }),
      /* @__PURE__ */ v.jsx("pre", { className: PC, children: $D })
    ] })
  ] });
}
function KD(n) {
  return !n || n.length !== 8 ? [...O1] : n.map((a) => QD(a));
}
function QD(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function ID(n, a) {
  for (let l = 0; l < 8; l += 1) {
    const s = n[l] ?? 0, o = a[l] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function _0(n) {
  return [...n].sort((a, l) => l.updatedAt - a.updatedAt);
}
function ZD(n, a) {
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
function md(n) {
  return n instanceof Vi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const pd = [
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
function JD({
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
  }, m = pd.find((y) => y.id === o) ?? pd[0];
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("label", { className: Ia, children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Format" }),
      /* @__PURE__ */ v.jsxs("select", { value: n, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ v.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ v.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ v.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("label", { className: Ia, children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Speed" }),
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
        className: Ia,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Cache" }),
          pd.map((y) => /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === y.id,
              className: o === y.id ? iu : ti,
              onClick: () => c(y.id),
              title: y.help,
              children: y.label
            },
            y.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ v.jsx("p", { className: Jt, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ v.jsxs("label", { className: Ia, children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Temperature" }),
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
    /* @__PURE__ */ v.jsxs("label", { className: Ia, children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Top-p" }),
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
    /* @__PURE__ */ v.jsxs("label", { className: Ia, children: [
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Seed" }),
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
const WD = ["cancelled", "failed", "partial"];
function eN({ runs: n, deploymentId: a }) {
  const l = Ui(), [s, o] = x.useState(null), [c, d] = x.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ v.jsx("p", { className: Jt, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await dh(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      d(nN(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    c && /* @__PURE__ */ v.jsx("p", { className: Ir, children: c }),
    /* @__PURE__ */ v.jsx("ul", { className: Cd, children: n.map((p) => {
      const m = WD.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ v.jsxs("li", { children: [
        /* @__PURE__ */ v.jsxs(rs, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          " ",
          /* @__PURE__ */ v.jsx("span", { className: tN(p.status), children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: ti,
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
function tN(n) {
  return n === "failed" ? mh : hh;
}
function nN(n) {
  return n instanceof Vi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function aN({ deploymentId: n, initialVoiceAssetId: a, onChange: l }) {
  const [s, o] = x.useState([]), [c, d] = x.useState(a ?? "");
  x.useEffect(() => {
    au(n).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [n]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await Cw(n, m), l?.(m);
  }
  return /* @__PURE__ */ v.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ v.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ v.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function iN(n) {
  const a = Ui(), [l, s] = x.useState("idle"), [o, c] = x.useState(null), [d, h] = x.useState(/* @__PURE__ */ new Map()), [p, m] = x.useState(null), [y, b] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = x.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), b(null);
    try {
      const Q = await zw(n.deploymentId, n.createPayload);
      c(Q.runId), s("running"), S.current?.(), S.current = mv(
        n.deploymentId,
        Q.runId,
        (ee) => L0(ee, h, s, b, n.deploymentId, Q.runId),
        () => s("error")
      );
    } catch (Q) {
      s("error"), m(yd(Q));
    }
  }, [n.deploymentId, n.createPayload]), R = x.useCallback(async () => {
    if (o)
      try {
        await Ow(n.deploymentId, o);
      } catch (Q) {
        m(yd(Q));
      }
  }, [n.deploymentId, o]), w = Array.from(d.values()).sort((Q, ee) => Q.globalIndex - ee.globalIndex), D = l === "starting" || l === "running", z = y?.status === "partial", B = w.filter((Q) => Q.status === "failed"), U = (() => {
    if (l !== "terminal" || B.length === 0) return null;
    const Q = /* @__PURE__ */ new Map();
    for (const W of B) {
      const ie = W.failureCategory ?? "unknown";
      Q.set(ie, (Q.get(ie) ?? 0) + 1);
    }
    let ee = "unknown", j = 0;
    for (const [W, ie] of Q)
      ie > j && (ee = W, j = ie);
    const Z = w.length;
    return { category: ee, count: j, total: Z };
  })(), V = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, $ = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ v.jsxs("div", { children: [
    p && /* @__PURE__ */ v.jsxs(
      "div",
      {
        className: Ir,
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
          $ && /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              className: ti,
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Ia, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: iu,
          disabled: !n.canGenerate || D,
          onClick: T,
          children: l === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: qb,
          disabled: !D,
          onClick: R,
          children: "Cancel"
        }
      )
    ] }),
    U && /* @__PURE__ */ v.jsxs("div", { className: Ir, role: "alert", children: [
      /* @__PURE__ */ v.jsxs("strong", { children: [
        "Run failed — ",
        U.count,
        " of ",
        U.total,
        " segments failed with ",
        /* @__PURE__ */ v.jsx("code", { children: U.category })
      ] }),
      V[U.category] && /* @__PURE__ */ v.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: V[U.category] })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ v.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: ti,
        children: "Download ZIP"
      }
    ),
    z && y && /* @__PURE__ */ v.jsxs("div", { className: kb, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ v.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: ti,
          onClick: async () => {
            try {
              const Q = await dh(n.deploymentId, y.runId);
              c(Q.runId), h(/* @__PURE__ */ new Map()), b(null), s("running"), S.current?.(), S.current = mv(
                n.deploymentId,
                Q.runId,
                (ee) => L0(ee, h, s, b, n.deploymentId, Q.runId),
                () => s("error")
              );
            } catch (Q) {
              m(yd(Q)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    w.length > 0 && /* @__PURE__ */ v.jsxs("table", { className: yC, children: [
      /* @__PURE__ */ v.jsx("thead", { children: /* @__PURE__ */ v.jsxs("tr", { children: [
        /* @__PURE__ */ v.jsx("th", { className: Ka, children: "#" }),
        /* @__PURE__ */ v.jsx("th", { className: Ka, children: "Status" }),
        /* @__PURE__ */ v.jsx("th", { className: Ka, children: "Duration" }),
        /* @__PURE__ */ v.jsx("th", { className: Ka, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ v.jsx("tbody", { children: w.map((Q) => /* @__PURE__ */ v.jsxs("tr", { className: gC, children: [
        /* @__PURE__ */ v.jsx("td", { className: Ka, children: Q.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ v.jsx("td", { className: Ka, children: /* @__PURE__ */ v.jsx("span", { className: lN(Q.status), children: Q.status }) }),
        /* @__PURE__ */ v.jsx("td", { className: Ka, children: Q.durationMs ? `${Q.durationMs} ms` : "—" }),
        /* @__PURE__ */ v.jsx("td", { className: Ka, children: Q.failureCategory ?? "" })
      ] }, Q.globalIndex)) })
    ] })
  ] });
}
async function L0(n, a, l, s, o, c) {
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
        const d = await fh(o, c);
        s(d);
      } catch {
      }
      return;
  }
}
function lN(n) {
  switch (n) {
    case "completed":
      return Yb;
    case "running":
      return hh;
    case "failed":
      return mh;
    default:
      return Pb;
  }
}
function yd(n) {
  return n instanceof Vi || n instanceof Error ? n.message : "unknown error";
}
function rN(n) {
  const a = Ui(), { attributions: l, unresolved: s, predictedFilenames: o } = x.useMemo(
    () => sN(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsx(
      "textarea",
      {
        className: pC,
        value: n.value,
        onChange: (c) => n.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: Ir, role: "alert", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((c) => /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: ti,
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
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Parsed lines" }),
      /* @__PURE__ */ v.jsx("ul", { className: Cd, children: l.map((c) => /* @__PURE__ */ v.jsxs("li", { children: [
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
      /* @__PURE__ */ v.jsx("span", { className: Jt, children: "Predicted filenames" }),
      /* @__PURE__ */ v.jsx("ul", { className: Cd, children: o.map((c) => /* @__PURE__ */ v.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function sN(n, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((y, b) => {
    const S = y.trim();
    if (!S) return;
    const T = b + 1, R = S.match(s);
    let w = "Narrator", D = S;
    if (R && R.groups) {
      const V = (R.groups.body ?? "").trim(), $ = (R.groups.rest ?? "").trim();
      w = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", D = $;
    }
    m += 1;
    const z = w.toLowerCase(), B = (d.get(z) ?? 0) + 1;
    d.set(z, B);
    const U = w === "Narrator" || l.has(z);
    U || c.add(w), o.push({ lineNumber: T, character: w, text: D, hasMapping: U }), h.push(
      `${m.toString().padStart(3, "0")}_${oN(w)}_${B.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function oN(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function uN(n) {
  const a = n.workflowCustomised ?? !1, l = n.unmappableFields ?? [];
  return /* @__PURE__ */ v.jsxs("div", { className: cC, children: [
    /* @__PURE__ */ v.jsxs("header", { className: hC, children: [
      /* @__PURE__ */ v.jsx("h1", { className: mC, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ v.jsxs("section", { className: kb, "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ v.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: fC, children: [
      /* @__PURE__ */ v.jsxs("section", { className: _r, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Lr, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: _r, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Lr, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: dC, children: [
      /* @__PURE__ */ v.jsxs("section", { className: _r, "aria-label": "Run", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Lr, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: _r, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Lr, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: _r, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ v.jsx("h2", { className: Lr, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function cN() {
  const { deployment: n, mappings: a, runs: l, workflow: s } = ls(), [o, c] = x.useState(""), [d, h] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = x.useState(n.defaultSpeedFactor ?? 1), [y, b] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = x.useState({}), [R, w] = x.useState("use_cache"), [D, z] = x.useState(n.defaultVoiceAssetId != null), B = x.useMemo(
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
  ), U = x.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const $ of a)
      V.set($.characterName.toLowerCase(), $);
    return V;
  }, [a]);
  return /* @__PURE__ */ v.jsx(
    uN,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ v.jsx(bC, { deployment: n }),
      scriptEditor: /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ v.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ v.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (V) => z(V.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ v.jsx(
            aN,
            {
              deploymentId: n.deploymentId,
              initialVoiceAssetId: n.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ v.jsx(
          rN,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: U,
            deploymentId: n.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ v.jsx(
        XD,
        {
          value: y,
          onChange: b,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ v.jsx(
        JD,
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
        iN,
        {
          deploymentId: n.deploymentId,
          createPayload: B,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ v.jsx(eN, { runs: l, deploymentId: n.deploymentId })
    }
  );
}
const U0 = 32, V0 = -30, B0 = -6, H0 = 0.5, q0 = 2;
class Cu extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function fN(n, a, l) {
  const s = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = `${Bi}${s}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l)
  });
  if (c.status === 409) {
    const d = await c.json().catch(() => null), h = d?.error?.current_digest ?? "", p = d?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Cu(h, p);
  }
  if (!c.ok) {
    const h = (await c.json().catch(() => null))?.error?.message ?? `apply failed: ${c.status}`;
    throw new Error(h);
  }
  return await c.json();
}
async function dN(n, a, l, s) {
  const o = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(l)}/edit`, c = `${Bi}${o}`, d = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s)
  });
  if (d.status === 409) {
    const h = await d.json().catch(() => null), p = h?.error?.current_digest ?? "", m = h?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Cu(p, m);
  }
  if (!d.ok) {
    const p = (await d.json().catch(() => null))?.error?.message ?? `apply failed: ${d.status}`;
    throw new Error(p);
  }
  return await d.json();
}
async function hN(n, a, l) {
  const s = `${Bi}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: l })
  });
  if (!o.ok) {
    const d = (await o.json().catch(() => null))?.error?.message ?? `preview failed: ${o.status}`;
    throw new Error(d);
  }
  return o.blob();
}
async function mN(n, a, l, s = 50) {
  const o = `${Bi}/audit/${encodeURIComponent(a)}/${encodeURIComponent(l)}?deploymentId=${encodeURIComponent(n)}&limit=${encodeURIComponent(String(s))}`, c = await fetch(o, {
    method: "GET",
    headers: { accept: "application/json" }
  });
  if (!c.ok) {
    const d = await c.json().catch(() => null), h = d?.error?.message ?? d?.message ?? `audit fetch failed: ${c.status}`;
    throw new Error(h);
  }
  return await c.json();
}
function Vl() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function _1(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > U0)
    return {
      message: `Chain exceeds the maximum of ${U0} operations.`
    };
  for (const l of n.ops) {
    const s = pN(l, a);
    if (s) return s;
  }
  return null;
}
function pN(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return yN(n.id, n.start_ms, n.end_ms, a);
    case "normalize":
      return n.target_lufs < V0 || n.target_lufs > B0 ? {
        opId: n.id,
        message: `Normalize target must be between ${V0} and ${B0} LUFS.`
      } : null;
    case "speed":
      return n.factor < H0 || n.factor > q0 ? {
        opId: n.id,
        message: `Speed factor must be between ${H0}× and ${q0}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return n.duration_ms < 1 ? { opId: n.id, message: "Fade duration must be at least 1 ms." } : null;
  }
}
function yN(n, a, l, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && l > s ? { opId: n, message: "End extends past source duration." } : null;
}
function gN(n, a) {
  const [l, s] = x.useState({
    peaks: null,
    isLoading: !0,
    error: null
  }), o = x.useRef("");
  return x.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const c = `${n}::${a}`;
    if (o.current === c) return;
    o.current = c;
    let d = !1;
    return s({ peaks: null, isLoading: !0, error: null }), vN(n, a).then((h) => {
      d || s({ peaks: h, isLoading: !1, error: null });
    }).catch((h) => {
      if (d) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => {
      d = !0;
    };
  }, [n, a]), l;
}
async function vN(n, a) {
  const l = await fetch(n);
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const s = await l.arrayBuffer(), c = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(s.slice(0));
  return bN(c, a);
}
function bN(n, a) {
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
const k0 = "(prefers-reduced-motion: reduce)";
function SN() {
  const [n, a] = x.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(k0).matches);
  return x.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const l = window.matchMedia(k0), s = (o) => a(o.matches);
    return l.addEventListener("change", s), () => l.removeEventListener("change", s);
  }, []), n;
}
var xN = "mquzal0", EN = "mquzal1", P0 = "mquzal2", Y0 = "mquzal3", G0 = "mquzal4", TN = "mquzal5", F0 = "mquzal6", $0 = "mquzal7";
const RN = 120, wN = 720;
function L1(n) {
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
    width: y = wN,
    height: b = RN
  } = n, S = x.useRef(null), T = x.useRef(null), R = x.useRef(null), w = gN(a, y), D = SN();
  x.useEffect(() => {
    CN(S.current, w.peaks, y, b);
  }, [w.peaks, y, b]);
  const z = x.useCallback(
    (j) => {
      const Z = T.current?.getBoundingClientRect();
      if (!Z || Z.width <= 0) return 0;
      const W = Math.max(0, Math.min(1, (j - Z.left) / Z.width));
      return Math.round(W * l);
    },
    [l]
  );
  x.useEffect(() => {
    const j = (W) => {
      if (!R.current) return;
      const ie = z(W.clientX);
      R.current === "start" ? c(Ho(ie, 0, o - 1)) : d(Ho(ie, s + 1, l));
    }, Z = () => {
      R.current = null;
    };
    return window.addEventListener("pointermove", j), window.addEventListener("pointerup", Z), () => {
      window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", Z);
    };
  }, [z, l, o, s, c, d]);
  const B = (j) => (Z) => {
    Z.preventDefault(), R.current = j;
  }, U = (j) => {
    !m || j.target.dataset.handle || m(z(j.clientX));
  }, V = (j) => (Z) => {
    const W = Z.shiftKey ? 100 : Z.ctrlKey ? 1 : 10;
    let ie = 0;
    if (Z.key === "ArrowLeft") ie = -W;
    else if (Z.key === "ArrowRight") ie = W;
    else return;
    Z.preventDefault(), j === "start" ? c(Ho(s + ie, 0, o - 1)) : d(Ho(o + ie, s + 1, l));
  }, $ = gd(s, l), Q = gd(o, l), ee = gd(p, l);
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      ref: T,
      className: xN,
      style: { height: b },
      onPointerDown: U,
      children: [
        /* @__PURE__ */ v.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: b,
            className: EN,
            "aria-label": "Audio waveform"
          }
        ),
        w.isLoading && /* @__PURE__ */ v.jsx("div", { className: $0, children: "Decoding waveform…" }),
        w.error && /* @__PURE__ */ v.jsx("div", { className: $0, role: "alert", children: w.error }),
        /* @__PURE__ */ v.jsx("div", { className: F0, style: { left: 0, width: `${$}%` } }),
        /* @__PURE__ */ v.jsx(
          "div",
          {
            className: F0,
            style: { left: `${Q}%`, right: 0, width: `${100 - Q}%` }
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: P0,
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
              /* @__PURE__ */ v.jsx("span", { className: Y0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: G0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: P0,
            style: { left: `${Q}%` },
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
              /* @__PURE__ */ v.jsx("span", { className: Y0, "aria-hidden": "true" }),
              /* @__PURE__ */ v.jsx("span", { className: G0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ v.jsx(
          "div",
          {
            className: TN,
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
function gd(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function Ho(n, a, l) {
  return Math.max(a, Math.min(l, n));
}
function CN(n, a, l, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = MN(n, "--color-primary", "#ba9eff");
  const d = Math.min(a.length, l);
  for (let h = 0; h < d; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function MN(n, a, l) {
  return getComputedStyle(n).getPropertyValue(a).trim() || l;
}
var AN = "r8lfsm0", jN = "r8lfsm1", DN = "r8lfsm2", NN = "r8lfsm3", zN = "r8lfsm4", ON = "r8lfsm5", _N = "r8lfsm6", LN = "r8lfsm7", UN = "r8lfsm8", VN = "r8lfsm9", BN = "r8lfsma", HN = "r8lfsmb";
const X0 = -16, qN = 80, kN = 720;
function PN(n) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: d, onCancel: h } = n, p = s.durationMs ?? 0, [m, y] = x.useState(() => K0(p)), [b, S] = x.useState(!1), [T, R] = x.useState(null), [w, D] = x.useState(!1), z = x.useRef(null);
  x.useEffect(() => {
    y(K0(p)), S(!1), R(null);
  }, [s.utteranceId, p]), x.useEffect(() => {
    z.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const B = x.useCallback(
    (ie) => {
      ie.key === "Escape" && (ie.stopPropagation(), h());
    },
    [h]
  ), U = x.useMemo(
    () => m.ops.find((ie) => ie.mode === "trim"),
    [m.ops]
  ), V = U?.start_ms ?? 0, $ = U?.end_ms ?? Math.max(1, p), Q = x.useCallback((ie, K) => {
    y((Y) => YN(Y, "trim", (re) => ({
      ...re,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(ie)),
      end_ms: Math.max(Math.floor(ie) + 1, Math.floor(K))
    })));
  }, []), ee = x.useCallback((ie) => Q(ie, $), [$, Q]), j = x.useCallback((ie) => Q(V, ie), [V, Q]), Z = x.useCallback((ie) => {
    S(ie), y((K) => {
      const Y = K.ops.filter((re) => re.mode !== "normalize");
      if (ie) {
        const re = {
          id: Vl(),
          mode: "normalize",
          target_lufs: X0
        };
        return { ...K, ops: [...Y, re] };
      }
      return { ...K, ops: Y };
    });
  }, []), W = x.useCallback(async () => {
    const ie = _1(m, p);
    if (ie) {
      R(ie.message);
      return;
    }
    R(null), D(!0);
    try {
      const K = await dN(a, l, s.utteranceId, {
        chain: m
      });
      c(K);
    } catch (K) {
      const Y = K instanceof Cu ? "Edit chain has changed in another tab. Reload to continue." : K instanceof Error ? K.message : "apply failed";
      R(Y), d(Y);
    } finally {
      D(!1);
    }
  }, [m, p, a, l, s.utteranceId, c, d]);
  return /* @__PURE__ */ v.jsxs("div", { className: AN, ref: z, onKeyDown: B, children: [
    /* @__PURE__ */ v.jsxs("header", { className: jN, children: [
      /* @__PURE__ */ v.jsx("h4", { className: DN, children: "Edit segment" }),
      /* @__PURE__ */ v.jsxs("span", { className: NN, children: [
        "Source · ",
        qo(p)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      L1,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: V,
        endMs: $,
        onChangeStart: ee,
        onChangeEnd: j,
        height: qN,
        width: kN
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: zN, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: ON, children: [
        qo(V),
        " → ",
        qo($),
        " · ",
        qo($ - V)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: _N, children: /* @__PURE__ */ v.jsxs("label", { className: LN, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "checkbox",
          checked: b,
          onChange: (ie) => Z(ie.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ v.jsxs("span", { children: [
        "Normalize to ",
        X0.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { className: UN, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: VN,
          onClick: () => void W(),
          disabled: w,
          children: w ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: BN,
          onClick: h,
          disabled: w,
          children: "Cancel"
        }
      )
    ] }),
    T && /* @__PURE__ */ v.jsx("div", { className: HN, role: "alert", "aria-live": "polite", children: T })
  ] });
}
function K0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Vl(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function YN(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Vl(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function qo(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var GN = "jq2zyb3", FN = "jq2zyb4", $N = "jq2zyb5", XN = "jq2zyb6", KN = "jq2zyb7", QN = "jq2zyb8", IN = "jq2zyb9", ZN = "jq2zyba", JN = "jq2zybb", WN = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, ez = "jq2zybj", tz = "jq2zybk", nz = "jq2zybl", az = "jq2zybm", iz = "jq2zybn jq2zybm", lz = "jq2zybo", rz = "jq2zybp", sz = "jq2zybq", oz = "jq2zybr", uz = "jq2zybs", cz = "jq2zybt", fz = "jq2zybu", dz = "jq2zybv", hz = "jq2zybw", mz = "jq2zybx", pz = "jq2zyby", yz = "jq2zybz", gz = "jq2zyb10", vz = "jq2zyb11", bz = "jq2zyb12", Sz = "jq2zyb13", xz = "jq2zyb14", Ez = "jq2zyb15", Tz = "jq2zyb16", Rz = "jq2zyb17", wz = "jq2zyb18", Cz = "jq2zyb19", Mz = { queued: "jq2zyb1b jq2zyb1a", running: "jq2zyb1c jq2zyb1a", completed: "jq2zyb1d jq2zyb1a", failed: "jq2zyb1e jq2zyb1a", cancelled: "jq2zyb1f jq2zyb1a" }, Az = "jq2zyb1g", jz = "jq2zyb1h", Q0 = "jq2zyb1i", Dz = "jq2zyb1j", Nz = "jq2zyb1k", zz = "jq2zyb1l", Oz = "jq2zyb1m";
const _z = ["cancelled", "failed", "partial"], Lz = 2600;
function Uz() {
  const { run: n } = ls(), a = Ui(), [l, s] = x.useState(n), [o, c] = x.useState(!1), [d, h] = x.useState(null), [p, m] = x.useState(null), [y, b] = x.useState(null);
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!y) return;
    const V = setTimeout(() => b(null), Lz);
    return () => clearTimeout(V);
  }, [y]);
  const S = x.useMemo(() => Hz(l), [l]), T = _z.includes(l.status) && l.kind === "batch", R = (l.exportZipStaleAt ?? null) !== null, w = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: V } = await dh(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${V}`);
      } catch (V) {
        h(Pz(V));
      } finally {
        c(!1);
      }
    }
  }, D = x.useCallback((V) => {
    m(($) => $ === V ? null : V);
  }, []), z = x.useCallback(() => {
    m(null);
  }, []), B = (V, $) => {
    s((Q) => Bz(Q, V, $)), m(null), b("Segment edited");
  }, U = x.useCallback((V) => {
    b(V);
  }, []);
  return /* @__PURE__ */ v.jsxs("main", { className: GN, children: [
    /* @__PURE__ */ v.jsxs("div", { className: FN, children: [
      /* @__PURE__ */ v.jsxs("header", { className: $N, children: [
        /* @__PURE__ */ v.jsxs("p", { className: XN, children: [
          l.deploymentId ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
            /* @__PURE__ */ v.jsx(rs, { to: `/${l.deploymentId}/recipe`, className: KN, children: "← Back to recipe" }),
            /* @__PURE__ */ v.jsx("span", { className: QN, children: "·" })
          ] }) : null,
          /* @__PURE__ */ v.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: IN, children: [
          /* @__PURE__ */ v.jsxs("h1", { className: ZN, children: [
            qz(l.kind),
            /* @__PURE__ */ v.jsx("span", { className: JN, children: l.runId })
          ] }),
          /* @__PURE__ */ v.jsx("span", { className: WN[l.status], children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: ez, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ v.jsx(ko, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ v.jsx(ko, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ v.jsx(
          ko,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ v.jsx(
          ko,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      T && /* @__PURE__ */ v.jsxs("section", { className: rz, "aria-label": "Resume run", children: [
        /* @__PURE__ */ v.jsxs("div", { className: sz, children: [
          /* @__PURE__ */ v.jsx("p", { className: oz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ v.jsx("p", { className: uz, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            type: "button",
            className: cz,
            disabled: o,
            onClick: () => void w(),
            children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run"
          }
        ),
        d && /* @__PURE__ */ v.jsx("p", { className: fz, role: "alert", children: d })
      ] }),
      /* @__PURE__ */ v.jsxs("section", { className: dz, "aria-label": "Utterances", children: [
        /* @__PURE__ */ v.jsxs("div", { className: hz, children: [
          /* @__PURE__ */ v.jsx("h2", { className: mz, children: "Utterances" }),
          S.completed > 0 && /* @__PURE__ */ v.jsxs("span", { className: pz, children: [
            /* @__PURE__ */ v.jsx("span", { className: yz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("ul", { className: gz, children: l.utterances.map((V) => {
          const $ = p === V.utteranceId, Q = V.status === "completed" && V.audioArtifactRef !== null && V.audioArtifactRef !== void 0, ee = V.derivedArtifactRef ?? V.audioArtifactRef ?? null, j = ee ? `/api/v1/artifacts/${encodeURIComponent(ee)}/download` : "", Z = (V.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ v.jsxs("li", { className: bz, children: [
            /* @__PURE__ */ v.jsxs("div", { className: vz, children: [
              /* @__PURE__ */ v.jsxs("span", { className: Ez, children: [
                "#",
                V.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ v.jsx("span", { className: Tz, title: V.characterDisplay, children: V.characterDisplay }),
              /* @__PURE__ */ v.jsx("span", { className: Rz, title: V.text, children: V.text }),
              /* @__PURE__ */ v.jsxs("span", { className: wz, children: [
                V.cacheHit && /* @__PURE__ */ v.jsx("span", { className: Cz, children: "cached" }),
                Z && /* @__PURE__ */ v.jsx("span", { className: Sz, children: "edited" }),
                V.durationMs ? /* @__PURE__ */ v.jsx("span", { children: kz(V.durationMs) }) : null,
                /* @__PURE__ */ v.jsx("span", { className: Mz[V.status], children: V.status }),
                Q && /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: xz,
                    onClick: () => D(V.utteranceId),
                    "aria-expanded": $,
                    "aria-label": $ ? "Close segment editor" : "Edit segment",
                    children: $ ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            $ && j && l.deploymentId && /* @__PURE__ */ v.jsx(
              PN,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: V,
                audioUrl: j,
                onApplied: (W) => B(V.utteranceId, W),
                onError: U,
                onCancel: z
              }
            )
          ] }, V.utteranceId);
        }) })
      ] }),
      Vz(l, R)
    ] }),
    y && /* @__PURE__ */ v.jsx("div", { className: Oz, role: "status", "aria-live": "polite", children: y })
  ] });
}
function Vz(n, a) {
  if (!n.exportArtifactRef && !a) return null;
  const s = !!n.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ v.jsx("div", { className: Az, children: a ? /* @__PURE__ */ v.jsxs("div", { className: Dz, children: [
    /* @__PURE__ */ v.jsx("p", { className: Nz, children: s }),
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: zz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ v.jsx("span", { className: Q0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ v.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: jz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ v.jsx("span", { className: Q0, children: "↓" })
      ]
    }
  ) : null });
}
function Bz(n, a, l) {
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
function ko({ label: n, value: a, mono: l, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: tz,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ v.jsx("span", { className: nz, children: n }),
        /* @__PURE__ */ v.jsx("span", { className: l ? iz : az, children: a }),
        o !== void 0 && /* @__PURE__ */ v.jsx("span", { className: lz, "aria-hidden": "true" })
      ]
    }
  );
}
function Hz(n) {
  const a = n.utterances.length, l = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function qz(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function kz(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Pz(n) {
  return n instanceof Vi ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var Yz = "pcphqj2", Gz = "pcphqj3", Fz = "pcphqj4", $z = "pcphqj5", Xz = "pcphqj6", Kz = "pcphqj7", Qz = "pcphqj8", Iz = "pcphqj9", I0 = "pcphqja", Zz = "pcphqjb", Z0 = "pcphqjc", Jz = "pcphqjd", Wz = "pcphqje", e3 = "pcphqjf pcphqje", t3 = "pcphqjg", n3 = "pcphqjh", a3 = "pcphqji", i3 = "pcphqjj", l3 = "pcphqjk pcphqjj", r3 = "pcphqjl pcphqjj", s3 = "pcphqjm pcphqjj", o3 = "pcphqjn", vd = "pcphqjo", bd = "pcphqjp", u3 = "pcphqjq", c3 = "pcphqjr", f3 = "pcphqjs", d3 = "pcphqjt", h3 = "pcphqju";
function m3() {
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
  }, []), /* @__PURE__ */ v.jsx("main", { className: Yz, children: /* @__PURE__ */ v.jsxs("div", { className: Gz, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Fz, children: [
      /* @__PURE__ */ v.jsx("p", { className: $z, children: "Runtime" }),
      /* @__PURE__ */ v.jsxs("div", { className: Xz, children: [
        /* @__PURE__ */ v.jsx("h1", { className: Kz, children: "Queue" }),
        /* @__PURE__ */ v.jsx("span", { className: Qz, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ v.jsx("p", { className: Iz, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ v.jsx("section", { className: h3, role: "alert", children: l }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ v.jsx("section", { className: I0, children: /* @__PURE__ */ v.jsxs("div", { className: u3, children: [
      /* @__PURE__ */ v.jsx("span", { className: c3, children: "○" }),
      /* @__PURE__ */ v.jsx("p", { className: f3, children: "Queue is quiet" }),
      /* @__PURE__ */ v.jsx("p", { className: d3, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ v.jsx("section", { className: I0, "aria-label": "Queued runs", children: /* @__PURE__ */ v.jsx("ul", { className: Zz, children: n.map((o) => {
      const c = o.position === 1;
      return /* @__PURE__ */ v.jsxs(
        "li",
        {
          className: c ? `${Z0} ${Jz}` : Z0,
          children: [
            /* @__PURE__ */ v.jsx("span", { className: c ? e3 : Wz, children: o.position }),
            /* @__PURE__ */ v.jsxs("span", { className: t3, children: [
              /* @__PURE__ */ v.jsx("span", { className: n3, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ v.jsx("span", { className: a3, children: o.runId })
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: p3(o.kind), children: y3(o.kind) }),
            /* @__PURE__ */ v.jsx("span", { className: o3, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: vd, children: g3(o.etaSeconds) }),
              /* @__PURE__ */ v.jsx("span", { className: bd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: vd, children: o.utteranceTotal }),
              /* @__PURE__ */ v.jsx("span", { className: bd, children: "lines" })
            ] }) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx("span", { className: vd, children: "—" }),
              /* @__PURE__ */ v.jsx("span", { className: bd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function p3(n) {
  switch (n) {
    case "batch":
      return l3;
    case "test_line":
      return r3;
    case "resume":
      return s3;
    default:
      return i3;
  }
}
function y3(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function g3(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), l = n % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function v3() {
  const { deploymentId: n, prefillCharacterName: a } = ls(), l = Ui(), [s, o] = x.useState(a), [c, d] = x.useState(""), [h, p] = x.useState("none"), [m, y] = x.useState(!1), [b, S] = x.useState(null), T = x.useRef(null);
  x.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const R = async (w) => {
    w.preventDefault(), y(!0), S(null);
    try {
      await Hb(n, {
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
var b3 = "_1oor31e0", S3 = "_1oor31e1", x3 = "_1oor31e2", E3 = "_1oor31e3", T3 = "_1oor31e4", R3 = "_1oor31e5", w3 = "_1oor31e6", C3 = "_1oor31e7", M3 = "_1oor31e8", A3 = "_1oor31e9";
const j3 = 8;
function D3(n) {
  const { entries: a, loading: l, error: s } = n;
  return /* @__PURE__ */ v.jsxs("div", { className: b3, "aria-busy": !!l, children: [
    s && /* @__PURE__ */ v.jsx("div", { className: M3, role: "alert", children: s }),
    l && !s && /* @__PURE__ */ v.jsx("div", { className: A3, "aria-live": "polite", children: "Loading edit history…" }),
    !l && !s && a.length === 0 && /* @__PURE__ */ v.jsx("div", { className: C3, children: "No edits yet" }),
    !l && !s && a.length > 0 && /* @__PURE__ */ v.jsx("ul", { className: S3, children: a.map((o) => /* @__PURE__ */ v.jsxs("li", { className: x3, children: [
      /* @__PURE__ */ v.jsx("span", { className: E3, children: z3(o.recorded_at) }),
      /* @__PURE__ */ v.jsx("span", { className: T3, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ v.jsx("span", { className: R3, title: o.digest_after, children: N3(o.digest_after) }),
      /* @__PURE__ */ v.jsx("span", { className: w3, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function N3(n) {
  return n ? `${n.slice(0, j3)}…` : "—";
}
function z3(n) {
  const a = new Date(n);
  return Number.isNaN(a.getTime()) ? n : a.toLocaleString();
}
var J0 = "_1c63kaw0", O3 = "_1c63kaw1", _3 = "_1c63kaw2", L3 = "_1c63kaw3", U3 = "_1c63kaw4", V3 = "_1c63kaw5", B3 = "_1c63kaw6", H3 = "_1c63kaw7";
function q3({ chain: n, onRemoveOp: a }) {
  return n.ops.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: J0, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ v.jsx("span", { className: O3, children: "No edits yet" }) }) : /* @__PURE__ */ v.jsx("ol", { className: J0, "data-testid": "edit-chain-list", children: n.ops.map((l, s) => /* @__PURE__ */ v.jsxs("li", { className: _3, children: [
    /* @__PURE__ */ v.jsxs("span", { className: L3, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ v.jsxs("span", { className: U3, children: [
      /* @__PURE__ */ v.jsx("span", { className: V3, children: W0(l) }),
      /* @__PURE__ */ v.jsx("span", { className: B3, children: k3(l) })
    ] }),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: H3,
        onClick: () => a(l.id),
        "aria-label": `Remove ${W0(l)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, l.id)) });
}
function W0(n) {
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
function k3(n) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${eb(n.start_ms)} → ${eb(n.end_ms)}`;
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
function eb(n) {
  return !Number.isFinite(n) || n < 0 ? "0.00s" : `${(n / 1e3).toFixed(2)}s`;
}
var P3 = "_1o3ytop0", Y3 = "_1o3ytop1", G3 = "_1o3ytop2", F3 = "_1o3ytop3", Sd = "_1o3ytop4", $3 = "_1o3ytop5", X3 = "_1o3ytop6", tb = "_1o3ytop7", K3 = "_1o3ytop8", Q3 = "_1o3ytope", I3 = "_1o3ytopf", Z3 = "_1o3ytopg", J3 = "_1o3ytoph", W3 = "_1o3ytopi", eO = "_1o3ytopj", tO = "_1o3ytopk", nO = "_1o3ytopl", aO = "_1o3ytopm", iO = "_1o3ytopn", lO = "_1o3ytopo", rO = "_1o3ytopp";
const nb = -16;
function sO(n) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, d = x.useMemo(
    () => oO(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = x.useState(() => xd(c)), [m, y] = x.useState(null), [b, S] = x.useState(null), [T, R] = x.useState(!1), [w, D] = x.useState(!1), [z, B] = x.useState(!1), [U, V] = x.useState(null), [$, Q] = x.useState([]), [ee, j] = x.useState([]), [Z, W] = x.useState(!1), [ie, K] = x.useState(null), [Y, re] = x.useState(0), te = x.useRef(null), O = x.useMemo(
    () => h.ops.some((Ee) => Ee.mode === "normalize"),
    [h.ops]
  );
  x.useEffect(() => {
    p(xd(c)), y(null), B(!1), Q([]);
  }, [a.voiceAssetId, c]), x.useEffect(() => {
    let Ee = !1;
    return W(!0), K(null), mN(l, "voice_asset", a.voiceAssetId, 50).then((we) => {
      Ee || j(we.entries);
    }).catch((we) => {
      if (Ee) return;
      const Ke = we instanceof Error ? we.message : "audit fetch failed";
      K(Ke);
    }).finally(() => {
      Ee || W(!1);
    }), () => {
      Ee = !0;
    };
  }, [l, a.voiceAssetId, Y]), x.useEffect(() => () => {
    b && URL.revokeObjectURL(b);
  }, [b]);
  const ne = h.ops.find((Ee) => Ee.mode === "trim"), se = h.ops.find((Ee) => Ee.mode === "normalize"), ue = ne?.start_ms ?? 0, Se = ne?.end_ms ?? Math.max(1, c), A = x.useCallback((Ee, we) => {
    p((Ke) => ab(Ke, "trim", (Ft) => ({
      ...Ft,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(Ee)),
      end_ms: Math.max(Math.floor(Ee) + 1, Math.floor(we))
    })));
  }, []), F = x.useCallback(
    (Ee) => A(Ee, Se),
    [Se, A]
  ), le = x.useCallback(
    (Ee) => A(ue, Ee),
    [ue, A]
  ), ce = x.useCallback(
    (Ee) => {
      p((we) => {
        const Ke = we.ops.filter((Ft) => Ft.mode !== "normalize");
        if (Ee) {
          const Ft = {
            id: Vl(),
            mode: "normalize",
            target_lufs: nb
          };
          return { ...we, ops: [...Ke, Ft] };
        }
        return { ...we, ops: Ke };
      });
    },
    []
  ), Re = x.useCallback((Ee) => {
    const we = h.ops.findIndex((Kn) => Kn.id === Ee);
    if (we === -1) return;
    const Ke = h.ops[we];
    if (!Ke) return;
    const Ft = [...h.ops.slice(0, we), ...h.ops.slice(we + 1)];
    p({ ...h, ops: Ft }), Q((Kn) => [...Kn, { op: Ke, index: we }]);
  }, [h]), Me = x.useCallback(() => {
    const Ee = $[$.length - 1];
    if (!Ee) return;
    const we = Math.min(Ee.index, h.ops.length), Ke = [
      ...h.ops.slice(0, we),
      Ee.op,
      ...h.ops.slice(we)
    ];
    p({ ...h, ops: Ke }), Q($.slice(0, -1));
  }, [h, $]), je = x.useCallback(() => {
    const Ee = _1(h, c);
    return Ee ? (y(Ee.message), !1) : (y(null), !0);
  }, [h, c]), ft = x.useCallback(async () => {
    if (je()) {
      D(!0);
      try {
        const Ee = await hN(a.voiceAssetId, l, h);
        b && URL.revokeObjectURL(b);
        const we = URL.createObjectURL(Ee);
        S(we), B(!0), requestAnimationFrame(() => te.current?.play().catch(() => {
        }));
      } catch (Ee) {
        const we = Ee instanceof Error ? Ee.message : "preview failed";
        y(we), o(we);
      } finally {
        D(!1);
      }
    }
  }, [je, a.voiceAssetId, l, h, b, o]), Fe = x.useCallback(async () => {
    if (je()) {
      R(!0);
      try {
        const Ee = await fN(a.voiceAssetId, l, {
          chain: h
        });
        y(null), V(Ee.measured_lufs ?? null), Q([]), s(Ee), re((we) => we + 1);
      } catch (Ee) {
        const we = Ee instanceof Cu ? "Edit chain has changed in another tab. Reload to continue." : Ee instanceof Error ? Ee.message : "apply failed";
        y(we), o(we);
      } finally {
        R(!1);
      }
    }
  }, [je, a.voiceAssetId, l, h, s, o]), Xn = x.useCallback(() => {
    p(xd(c)), y(null), V(null), B(!1), Q([]), re((Ee) => Ee + 1), b && (URL.revokeObjectURL(b), S(null));
  }, [c, b]), ba = x.useCallback((Ee) => {
    p((we) => ab(we, "normalize", (Ke) => ({
      ...Ke,
      mode: "normalize",
      target_lufs: Ee
    })));
  }, []);
  return /* @__PURE__ */ v.jsxs("div", { className: P3, children: [
    /* @__PURE__ */ v.jsxs("header", { className: Y3, children: [
      /* @__PURE__ */ v.jsxs("h3", { className: G3, children: [
        "Edit · ",
        a.displayName
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: F3, children: [
        "Source · ",
        Po(c)
      ] })
    ] }),
    /* @__PURE__ */ v.jsx(
      L1,
      {
        audioUrl: d,
        durationMs: Math.max(1, c),
        startMs: ue,
        endMs: Se,
        onChangeStart: F,
        onChangeEnd: le
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: Sd, children: [
      /* @__PURE__ */ v.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ v.jsxs("span", { className: $3, children: [
        Po(ue),
        " → ",
        Po(Se),
        " · ",
        Po(Se - ue)
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: X3, children: [
      /* @__PURE__ */ v.jsxs("div", { className: tb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Sd, children: [
          /* @__PURE__ */ v.jsx("span", { children: "Normalize loudness" }),
          O && se && /* @__PURE__ */ v.jsxs("span", { className: tO, children: [
            "target ",
            se.target_lufs.toFixed(1),
            " LUFS",
            U !== null && ` · measured ${U.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: K3, children: [
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "checkbox",
              checked: O,
              onChange: (Ee) => ce(Ee.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ v.jsxs("span", { children: [
            "Target ",
            nb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        O && se && /* @__PURE__ */ v.jsx(
          "input",
          {
            type: "range",
            className: aO,
            min: -30,
            max: -6,
            step: 0.5,
            value: se.target_lufs,
            onChange: (Ee) => ba(Number(Ee.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: tb, children: [
        /* @__PURE__ */ v.jsxs("span", { className: Sd, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ v.jsx(q3, { chain: h, onRemoveOp: Re })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: Q3, children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: Z3,
          onClick: () => void ft(),
          disabled: w || T,
          children: w ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: I3,
          onClick: () => void Fe(),
          disabled: T || w,
          children: T ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: J3,
          onClick: Xn,
          disabled: T || w,
          children: "Reset"
        }
      ),
      $.length > 0 && /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: W3,
          onClick: Me,
          disabled: T || w,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            $.length,
            ")"
          ]
        }
      ),
      z && /* @__PURE__ */ v.jsx(
        "span",
        {
          className: rO,
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
        ref: te,
        src: b,
        controls: !0,
        className: nO,
        "aria-label": "Edit preview"
      }
    ),
    m && /* @__PURE__ */ v.jsx("div", { className: eO, role: "alert", "aria-live": "polite", children: m }),
    /* @__PURE__ */ v.jsxs("details", { className: iO, children: [
      /* @__PURE__ */ v.jsxs("summary", { className: lO, children: [
        "Edit history",
        ee.length > 0 ? ` · ${ee.length}` : ""
      ] }),
      /* @__PURE__ */ v.jsx(
        D3,
        {
          entries: ee,
          loading: Z,
          error: ie
        }
      )
    ] })
  ] });
}
function xd(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Vl(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function ab(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Vl(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function Po(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function oO(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var uO = "go9vi12", cO = "go9vi13", fO = "go9vi14", dO = "go9vi15", hO = "go9vi16", mO = "go9vi17", pO = "go9vi18", yO = "go9vi19", gO = "go9vi1a go9vi19", vO = "go9vi1b", bO = "go9vi1c", SO = "go9vi1d", xO = "go9vi1e", EO = "go9vi1f", TO = "go9vi1g", RO = "go9vi1h", wO = "go9vi1i", CO = "go9vi1j", MO = "go9vi1k", pu = "go9vi1l", Ci = "go9vi1m", Hr = "go9vi1n", Dl = "go9vi1o", AO = "go9vi1p go9vi1o", jO = "go9vi1q", DO = "go9vi1r go9vi1q", NO = "go9vi1s go9vi1q", zO = "go9vi1t", OO = "go9vi1u", _O = "go9vi1v", LO = "go9vi1w", UO = "go9vi1x", VO = "go9vi1y", U1 = "go9vi1z", V1 = "go9vi110", ib = "go9vi111 go9vi110", BO = "go9vi112 go9vi110", HO = "go9vi113", qO = "go9vi114", kO = "go9vi115", PO = "go9vi116 go9vi1o", YO = "go9vi117", GO = "go9vi118";
const FO = ["none", "audio_ref", "vector_preset", "qwen_template"];
function $O() {
  const { deployment: n, mappings: a, voiceAssets: l } = ls(), [s, o] = x.useState(a), [c, d] = x.useState(l), [h, p] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = x.useState(""), [b, S] = x.useState(null), [T, R] = x.useState(null), w = x.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    for (const re of c) Y.set(re.voiceAssetId, re);
    return Y;
  }, [c]), D = x.useMemo(() => {
    const Y = m.trim().toLowerCase();
    return Y ? s.filter((re) => re.characterName.toLowerCase().includes(Y)) : s;
  }, [s, m]), z = x.useMemo(
    () => s.find((Y) => Y.mappingId === h) ?? null,
    [s, h]
  );
  x.useEffect(() => {
    o(a), d(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), x.useEffect(() => {
    if (!T) return;
    const Y = setTimeout(() => R(null), 2600);
    return () => clearTimeout(Y);
  }, [T]);
  const B = x.useCallback(async () => {
    const Y = await au(n.deploymentId);
    d(Y.voiceAssets);
  }, [n.deploymentId]), U = x.useCallback(
    (Y) => {
      o(
        (re) => re.map((te) => te.mappingId === h ? { ...te, ...Y } : te)
      );
    },
    [h]
  ), V = x.useCallback(
    async (Y) => {
      if (!z) return;
      const re = z;
      try {
        const te = await Mw(n.deploymentId, z.mappingId, Y);
        o((O) => O.map((ne) => ne.mappingId === te.mappingId ? te : ne));
      } catch (te) {
        o(
          (O) => O.map((ne) => ne.mappingId === re.mappingId ? re : ne)
        ), S(Mi(te));
      }
    },
    [z, n.deploymentId]
  ), $ = x.useCallback(async () => {
    const Y = c[0];
    if (!Y) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const re = JO(s), te = await Hb(n.deploymentId, {
        characterName: re,
        speakerVoiceAssetId: Y.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((O) => [...O, te]), p(te.mappingId);
    } catch (re) {
      S(Mi(re));
    }
  }, [n.deploymentId, c, s]), Q = x.useCallback(async () => {
    if (z && confirm(`Deactivate mapping for ${z.characterName}?`))
      try {
        await Aw(n.deploymentId, z.mappingId), o((Y) => Y.filter((re) => re.mappingId !== z.mappingId)), p(null), R(`Mapping for ${z.characterName} deactivated.`);
      } catch (Y) {
        S(Mi(Y));
      }
  }, [n.deploymentId, z]), ee = x.useCallback(
    async (Y, re, te) => {
      try {
        const O = await Lw(n.deploymentId, Y, re, te);
        return d((ne) => [O, ...ne]), R(`${O.displayName} uploaded.`), O;
      } catch (O) {
        return S(Mi(O)), null;
      }
    },
    [n.deploymentId]
  ), j = x.useCallback(async () => {
    try {
      const Y = await jw(n.deploymentId);
      i_(Y, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (Y) {
      S(Mi(Y));
    }
  }, [n.deploymentId]), Z = x.useCallback(
    async (Y, re) => {
      try {
        const te = await Dw(
          n.deploymentId,
          Y.mappings,
          re
        );
        R(
          `Imported ${te.created.length} • skipped ${te.skipped.length} • replaced ${te.replaced.length}.`
        );
        const O = await au(n.deploymentId);
        d(O.voiceAssets);
      } catch (te) {
        S(Mi(te));
      }
    },
    [n.deploymentId]
  ), W = x.useCallback(
    async (Y) => {
      await B(), R("Edit applied.");
    },
    [B]
  ), ie = x.useCallback((Y) => {
    S(Y);
  }, []), K = x.useCallback(
    async (Y, re) => {
      if (!z) return null;
      const te = Y.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await _w(n.deploymentId, {
          line: te,
          outputFormat: re
        })).runId };
      } catch (O) {
        return S(Mi(O)), null;
      }
    },
    [n.deploymentId, z]
  );
  return /* @__PURE__ */ v.jsxs("div", { className: uO, children: [
    /* @__PURE__ */ v.jsxs("aside", { className: cO, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ v.jsxs("header", { className: fO, children: [
        /* @__PURE__ */ v.jsxs("div", { children: [
          /* @__PURE__ */ v.jsx("h1", { className: dO, children: "Mappings" }),
          /* @__PURE__ */ v.jsxs("span", { className: hO, children: [
            s.length,
            " active · ",
            c.length,
            " voice",
            c.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("button", { type: "button", className: V1, onClick: $, children: "+ Add" })
      ] }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "search",
          className: mO,
          placeholder: "Search characters",
          value: m,
          onChange: (Y) => y(Y.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ v.jsx(ZO, { onExport: j, onImport: Z }),
      /* @__PURE__ */ v.jsx("div", { className: pO, children: D.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: EO, children: "No mappings yet. Click Add to create one." }) : D.map((Y) => {
        const re = w.get(Y.speakerVoiceAssetId), te = Y.mappingId === h;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: te ? gO : yO,
            onClick: () => p(Y.mappingId),
            "aria-pressed": te,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ v.jsx("span", { className: vO, "aria-hidden": "true", children: WO(Y.characterName) }),
              /* @__PURE__ */ v.jsxs("span", { className: bO, children: [
                /* @__PURE__ */ v.jsx("span", { className: SO, children: Y.characterName }),
                /* @__PURE__ */ v.jsxs("span", { className: xO, children: [
                  Y.defaultEmotionMode,
                  " · ",
                  re?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          Y.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ v.jsxs("section", { className: TO, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ v.jsx(O2, { children: T && /* @__PURE__ */ v.jsx(
        Gh.div,
        {
          className: qO,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }),
      b && /* @__PURE__ */ v.jsx("div", { className: HO, role: "alert", children: b }),
      z ? /* @__PURE__ */ v.jsx(
        KO,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          onNameChange: (Y) => {
            U({ characterName: Y });
          },
          onNameBlur: (Y) => {
            Y !== z.characterName && Y.trim() && V({ characterName: Y.trim() });
          },
          onSpeakerChange: (Y) => {
            U({ speakerVoiceAssetId: Y }), V({ speakerVoiceAssetId: Y });
          },
          onModeChange: (Y) => {
            U({ defaultEmotionMode: Y }), V({ defaultEmotionMode: Y });
          },
          onQwenChange: (Y) => {
            U({ defaultQwenTemplate: Y });
          },
          onQwenBlur: (Y) => {
            V({ defaultQwenTemplate: Y });
          },
          onSpeedChange: (Y) => {
            U({ defaultSpeedFactor: Y });
          },
          onSpeedCommit: (Y) => {
            V({ defaultSpeedFactor: Y });
          },
          onEmotionVoiceChange: (Y) => {
            const re = Y || null;
            U({ defaultEmotionVoiceAssetId: re }), V({ defaultEmotionVoiceAssetId: re });
          },
          onDelete: Q,
          onUploadVoice: async (Y, re, te) => {
            const O = await ee(Y, re, te);
            return O && te === "speaker" && (U({ speakerVoiceAssetId: O.voiceAssetId }), V({ speakerVoiceAssetId: O.voiceAssetId })), await B(), O;
          },
          onTestLine: K,
          onEditChainPersisted: W,
          onEditError: ie
        }
      ) : /* @__PURE__ */ v.jsx(
        XO,
        {
          voiceCount: c.length,
          onUploadVoice: async (Y) => {
            await ee(Y, Y.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function XO({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ v.jsxs("div", { className: pu, style: { padding: "3rem 2rem" }, children: [
    /* @__PURE__ */ v.jsxs("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ v.jsx(
        "h2",
        {
          style: {
            fontFamily: "var(--font-display, var(--font))",
            fontSize: "1.4rem",
            margin: "0 0 0.75rem",
            color: "var(--text)"
          },
          children: "Upload your first voice"
        }
      ),
      /* @__PURE__ */ v.jsxs(
        "p",
        {
          style: {
            fontFamily: "var(--font)",
            fontSize: "1rem",
            color: "var(--text-muted)",
            maxWidth: "44ch",
            margin: "0 auto",
            lineHeight: 1.5
          },
          children: [
            "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
            /* @__PURE__ */ v.jsx("strong", { children: "+ Add" }),
            " ",
            "on the left to map a character to it."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v.jsx(
      B1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ v.jsx("div", { className: pu, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ v.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ v.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function KO(n) {
  const { mapping: a, voiceAssets: l } = n, s = l.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((R) => R.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = x.useState(""), [h, p] = x.useState("mp3"), [m, y] = x.useState("idle"), [b, S] = x.useState(null), T = x.useCallback(async () => {
    y("running"), S(null);
    const R = await n.onTestLine(c, h);
    if (!R) {
      y("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: w } = R;
    for (let D = 0; D < 60; D += 1) {
      await new Promise((z) => setTimeout(z, 500));
      try {
        const z = await fh(n.deploymentId, w);
        if (z.status === "completed") {
          y("done");
          return;
        }
        if (z.status === "failed" || z.status === "cancelled") {
          y("error"), S(`Run ${z.status}.`);
          return;
        }
      } catch (z) {
        y("error"), S(z instanceof Error ? z.message : "unknown error");
        return;
      }
    }
    y("error"), S("test-line timed out after 30s");
  }, [n.onTestLine, n.deploymentId, c, h]);
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsxs("header", { className: RO, children: [
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx("span", { className: CO, children: "Character" }),
        /* @__PURE__ */ v.jsx("h2", { className: wO, children: a.characterName })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: U1, children: /* @__PURE__ */ v.jsx("button", { type: "button", className: BO, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: kO, children: [
      /* @__PURE__ */ v.jsx(
        "input",
        {
          type: "text",
          className: PO,
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
          className: Dl,
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
          className: V1,
          onClick: () => void T(),
          disabled: m === "running",
          children: m === "running" ? "Synthesising…" : "Test this line"
        }
      ),
      m === "done" && /* @__PURE__ */ v.jsx("span", { style: { marginLeft: 12, color: "var(--color-success, #4caf50)" }, children: "Synthesised — see host logs for the output file path." }),
      m === "error" && b && /* @__PURE__ */ v.jsx("span", { style: { marginLeft: 12, color: "var(--color-error, crimson)" }, children: b })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: MO, children: [
      /* @__PURE__ */ v.jsxs("div", { className: pu, children: [
        /* @__PURE__ */ v.jsxs("label", { className: Hr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Ci, children: "Character name" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              className: Dl,
              value: a.characterName,
              onChange: (R) => n.onNameChange(R.currentTarget.value),
              onBlur: (R) => n.onNameBlur(R.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: Hr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Ci, children: "Emotion mode" }),
          /* @__PURE__ */ v.jsx(
            "select",
            {
              className: Dl,
              value: a.defaultEmotionMode,
              onChange: (R) => n.onModeChange(R.currentTarget.value),
              children: FO.map((R) => /* @__PURE__ */ v.jsx("option", { value: R, children: e_(R) }, R))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ v.jsxs("label", { className: Hr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Ci, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ v.jsx(
            "textarea",
            {
              className: AO,
              value: a.defaultQwenTemplate ?? "",
              onChange: (R) => n.onQwenChange(R.currentTarget.value),
              onBlur: (R) => n.onQwenBlur(R.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ v.jsxs("label", { className: Hr, children: [
          /* @__PURE__ */ v.jsx("span", { className: Ci, children: "Emotion reference" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              className: Dl,
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
        /* @__PURE__ */ v.jsxs("label", { className: Hr, children: [
          /* @__PURE__ */ v.jsxs("span", { className: Ci, children: [
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
      /* @__PURE__ */ v.jsxs("div", { className: pu, children: [
        /* @__PURE__ */ v.jsx("span", { className: Ci, children: "Speaker reference" }),
        /* @__PURE__ */ v.jsx(
          QO,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ v.jsx(lb, { voice: s }),
        /* @__PURE__ */ v.jsx(
          B1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => n.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ v.jsx(
          sO,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
          /* @__PURE__ */ v.jsx("span", { className: Ci, children: "Emotion reference voice" }),
          /* @__PURE__ */ v.jsx(lb, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function QO({
  value: n,
  voices: a,
  onChange: l
}) {
  return /* @__PURE__ */ v.jsxs(
    "select",
    {
      className: Dl,
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
function lb({ voice: n }) {
  const a = t_(n.durationMs ?? null);
  return /* @__PURE__ */ v.jsxs("div", { children: [
    /* @__PURE__ */ v.jsxs("div", { className: zO, children: [
      /* @__PURE__ */ v.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ v.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ v.jsx("span", { children: n_(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ v.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ v.jsxs("div", { className: OO, children: [
      /* @__PURE__ */ v.jsx("div", { className: _O, children: /* @__PURE__ */ v.jsx(
        Gh.div,
        {
          className: LO,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }),
      a && /* @__PURE__ */ v.jsx(
        "span",
        {
          className: a.level === "warn" ? UO : VO,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ v.jsx(IO, { seed: n.contentSha256 })
  ] });
}
function IO({ seed: n }) {
  const a = x.useMemo(() => a_(n, 48), [n]);
  return /* @__PURE__ */ v.jsx("div", { className: YO, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ v.jsx(
    "span",
    {
      className: GO,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    s
  )) });
}
function B1({
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
      className: o ? NO : l ? DO : jO,
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
function ZO({
  onExport: n,
  onImport: a
}) {
  const [l, s] = x.useState("error"), o = x.useRef(null);
  return /* @__PURE__ */ v.jsxs("div", { className: U1, children: [
    /* @__PURE__ */ v.jsx("button", { type: "button", className: ib, onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ v.jsx(
      "input",
      {
        ref: o,
        type: "file",
        accept: "application/json,.json",
        style: { display: "none" },
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
    /* @__PURE__ */ v.jsx("button", { type: "button", className: ib, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ v.jsxs(
      "select",
      {
        className: Dl,
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
function JO(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let l = n.length + 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function WO(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function e_(n) {
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
function t_(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function n_(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function a_(n, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function i_(n, a) {
  const l = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Mi(n) {
  return n instanceof Vi || n instanceof Error ? n.message : "unknown error";
}
function l_() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await ww();
        return { deployments: n };
      },
      Component: tC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = Tl(n, "deploymentId");
        return OT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = Tl(n, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          dv(a),
          hv(a),
          Nw(a, { limit: 10 }),
          Uw(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: cN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = Tl(n, "deploymentId"), l = Tl(n, "runId");
        return { run: await fh(a, l) };
      },
      Component: Uz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = Tl(n, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          dv(a),
          hv(a),
          au(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: $O
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const l = Tl(n, "deploymentId"), s = new URL(a.url);
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
function Tl(n, a) {
  const l = n[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const Id = "emotion-tts-app", r_ = "ext-event", rb = "emotion-tts-stylesheet";
function s_() {
  if (typeof document > "u" || document.getElementById(rb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = rb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
s_();
class o_ extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = iT.createRoot(this), this.paint();
  }
  attributeChangedCallback() {
    this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null;
  }
  set hostContext(a) {
    this.ctx = a, this.paint();
  }
  get hostContext() {
    return this.ctx;
  }
  paint() {
    if (!this.root || !this.isConnected) return;
    const a = this.resolveInitialEntry(), l = qR(l_(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ v.jsx(x.StrictMode, { children: /* @__PURE__ */ v.jsx(PR, { router: l }) })
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
      new CustomEvent(r_, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function u_() {
  typeof customElements > "u" || customElements.get(Id) || customElements.define(Id, o_);
}
typeof customElements < "u" && !customElements.get(Id) && u_();
export {
  u_ as register
};
//# sourceMappingURL=emotion-tts.js.map
