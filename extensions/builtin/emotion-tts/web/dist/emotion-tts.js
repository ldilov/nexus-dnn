function LE(n, a) {
  for (var r = 0; r < a.length; r++) {
    const s = a[r];
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
function UE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Uf = { exports: {} }, Ar = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mg;
function VE() {
  if (Mg) return Ar;
  Mg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function r(s, o, c) {
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
  return Ar.Fragment = a, Ar.jsx = r, Ar.jsxs = r, Ar;
}
var Cg;
function BE() {
  return Cg || (Cg = 1, Uf.exports = VE()), Uf.exports;
}
var b = BE(), Vf = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ag;
function HE() {
  if (Ag) return Me;
  Ag = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function E(A) {
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
  }, C = Object.assign, D = {};
  function z(A, F, re) {
    this.props = A, this.context = F, this.refs = D, this.updater = re || R;
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
  function V() {
  }
  V.prototype = z.prototype;
  function U(A, F, re) {
    this.props = A, this.context = F, this.refs = D, this.updater = re || R;
  }
  var G = U.prototype = new V();
  G.constructor = U, C(G, z.prototype), G.isPureReactComponent = !0;
  var J = Array.isArray;
  function W() {
  }
  var te = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function Z(A, F, re) {
    var ce = re.ref;
    return {
      $$typeof: n,
      type: A,
      key: F,
      ref: ce !== void 0 ? ce : null,
      props: re
    };
  }
  function ne(A, F) {
    return Z(A.type, F, A.props);
  }
  function ue(A) {
    return typeof A == "object" && A !== null && A.$$typeof === n;
  }
  function I(A) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(re) {
      return F[re];
    });
  }
  var Y = /\/+/g;
  function oe(A, F) {
    return typeof A == "object" && A !== null && A.key != null ? I("" + A.key) : F.toString(36);
  }
  function ee(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(W, W) : (A.status = "pending", A.then(
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
  function O(A, F, re, ce, Te) {
    var we = typeof A;
    (we === "undefined" || we === "boolean") && (A = null);
    var je = !1;
    if (A === null) je = !0;
    else
      switch (we) {
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
                re,
                ce,
                Te
              );
          }
      }
    if (je)
      return Te = Te(A), je = ce === "" ? "." + oe(A, 0) : ce, J(Te) ? (re = "", je != null && (re = je.replace(Y, "$&/") + "/"), O(Te, F, re, "", function(ti) {
        return ti;
      })) : Te != null && (ue(Te) && (Te = ne(
        Te,
        re + (Te.key == null || A && A.key === Te.key ? "" : ("" + Te.key).replace(
          Y,
          "$&/"
        ) + "/") + je
      )), F.push(Te)), 1;
    je = 0;
    var mt = ce === "" ? "." : ce + ":";
    if (J(A))
      for (var Qe = 0; Qe < A.length; Qe++)
        ce = A[Qe], we = mt + oe(ce, Qe), je += O(
          ce,
          F,
          re,
          we,
          Te
        );
    else if (Qe = E(A), typeof Qe == "function")
      for (A = Qe.call(A), Qe = 0; !(ce = A.next()).done; )
        ce = ce.value, we = mt + oe(ce, Qe++), je += O(
          ce,
          F,
          re,
          we,
          Te
        );
    else if (we === "object") {
      if (typeof A.then == "function")
        return O(
          ee(A),
          F,
          re,
          ce,
          Te
        );
      throw F = String(A), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return je;
  }
  function ae(A, F, re) {
    if (A == null) return A;
    var ce = [], Te = 0;
    return O(A, ce, "", "", function(we) {
      return F.call(re, we, Te++);
    }), ce;
  }
  function $(A) {
    if (A._status === -1) {
      var F = A._result;
      F = F(), F.then(
        function(re) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = re);
        },
        function(re) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = re);
        }
      ), A._status === -1 && (A._status = 0, A._result = F);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var le = typeof reportError == "function" ? reportError : function(A) {
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
    map: ae,
    forEach: function(A, F, re) {
      ae(
        A,
        function() {
          F.apply(this, arguments);
        },
        re
      );
    },
    count: function(A) {
      var F = 0;
      return ae(A, function() {
        F++;
      }), F;
    },
    toArray: function(A) {
      return ae(A, function(F) {
        return F;
      }) || [];
    },
    only: function(A) {
      if (!ue(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return Me.Activity = v, Me.Children = Se, Me.Component = z, Me.Fragment = r, Me.Profiler = o, Me.PureComponent = U, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return te.H.useMemoCache(A);
    }
  }, Me.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(A, F, re) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var ce = C({}, A.props), Te = A.key;
    if (F != null)
      for (we in F.key !== void 0 && (Te = "" + F.key), F)
        !j.call(F, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && F.ref === void 0 || (ce[we] = F[we]);
    var we = arguments.length - 2;
    if (we === 1) ce.children = re;
    else if (1 < we) {
      for (var je = Array(we), mt = 0; mt < we; mt++)
        je[mt] = arguments[mt + 2];
      ce.children = je;
    }
    return Z(A.type, Te, ce);
  }, Me.createContext = function(A) {
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
  }, Me.createElement = function(A, F, re) {
    var ce, Te = {}, we = null;
    if (F != null)
      for (ce in F.key !== void 0 && (we = "" + F.key), F)
        j.call(F, ce) && ce !== "key" && ce !== "__self" && ce !== "__source" && (Te[ce] = F[ce]);
    var je = arguments.length - 2;
    if (je === 1) Te.children = re;
    else if (1 < je) {
      for (var mt = Array(je), Qe = 0; Qe < je; Qe++)
        mt[Qe] = arguments[Qe + 2];
      Te.children = mt;
    }
    if (A && A.defaultProps)
      for (ce in je = A.defaultProps, je)
        Te[ce] === void 0 && (Te[ce] = je[ce]);
    return Z(A, we, Te);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(A) {
    return { $$typeof: h, render: A };
  }, Me.isValidElement = ue, Me.lazy = function(A) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: A },
      _init: $
    };
  }, Me.memo = function(A, F) {
    return {
      $$typeof: m,
      type: A,
      compare: F === void 0 ? null : F
    };
  }, Me.startTransition = function(A) {
    var F = te.T, re = {};
    te.T = re;
    try {
      var ce = A(), Te = te.S;
      Te !== null && Te(re, ce), typeof ce == "object" && ce !== null && typeof ce.then == "function" && ce.then(W, le);
    } catch (we) {
      le(we);
    } finally {
      F !== null && re.types !== null && (F.types = re.types), te.T = F;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, Me.use = function(A) {
    return te.H.use(A);
  }, Me.useActionState = function(A, F, re) {
    return te.H.useActionState(A, F, re);
  }, Me.useCallback = function(A, F) {
    return te.H.useCallback(A, F);
  }, Me.useContext = function(A) {
    return te.H.useContext(A);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(A, F) {
    return te.H.useDeferredValue(A, F);
  }, Me.useEffect = function(A, F) {
    return te.H.useEffect(A, F);
  }, Me.useEffectEvent = function(A) {
    return te.H.useEffectEvent(A);
  }, Me.useId = function() {
    return te.H.useId();
  }, Me.useImperativeHandle = function(A, F, re) {
    return te.H.useImperativeHandle(A, F, re);
  }, Me.useInsertionEffect = function(A, F) {
    return te.H.useInsertionEffect(A, F);
  }, Me.useLayoutEffect = function(A, F) {
    return te.H.useLayoutEffect(A, F);
  }, Me.useMemo = function(A, F) {
    return te.H.useMemo(A, F);
  }, Me.useOptimistic = function(A, F) {
    return te.H.useOptimistic(A, F);
  }, Me.useReducer = function(A, F, re) {
    return te.H.useReducer(A, F, re);
  }, Me.useRef = function(A) {
    return te.H.useRef(A);
  }, Me.useState = function(A) {
    return te.H.useState(A);
  }, Me.useSyncExternalStore = function(A, F, re) {
    return te.H.useSyncExternalStore(
      A,
      F,
      re
    );
  }, Me.useTransition = function() {
    return te.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var jg;
function Kd() {
  return jg || (jg = 1, Vf.exports = HE()), Vf.exports;
}
var T = Kd();
const qE = /* @__PURE__ */ UE(T), kE = /* @__PURE__ */ LE({
  __proto__: null,
  default: qE
}, [T]);
var Bf = { exports: {} }, jr = {}, Hf = { exports: {} }, qf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dg;
function PE() {
  return Dg || (Dg = 1, (function(n) {
    function a(O, ae) {
      var $ = O.length;
      O.push(ae);
      e: for (; 0 < $; ) {
        var le = $ - 1 >>> 1, Se = O[le];
        if (0 < o(Se, ae))
          O[le] = ae, O[$] = Se, $ = le;
        else break e;
      }
    }
    function r(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var ae = O[0], $ = O.pop();
      if ($ !== ae) {
        O[0] = $;
        e: for (var le = 0, Se = O.length, A = Se >>> 1; le < A; ) {
          var F = 2 * (le + 1) - 1, re = O[F], ce = F + 1, Te = O[ce];
          if (0 > o(re, $))
            ce < Se && 0 > o(Te, re) ? (O[le] = Te, O[ce] = $, le = ce) : (O[le] = re, O[F] = $, le = F);
          else if (ce < Se && 0 > o(Te, $))
            O[le] = Te, O[ce] = $, le = ce;
          else break e;
        }
      }
      return ae;
    }
    function o(O, ae) {
      var $ = O.sortIndex - ae.sortIndex;
      return $ !== 0 ? $ : O.id - ae.id;
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
    var p = [], m = [], y = 1, v = null, S = 3, E = !1, R = !1, C = !1, D = !1, z = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, U = typeof setImmediate < "u" ? setImmediate : null;
    function G(O) {
      for (var ae = r(m); ae !== null; ) {
        if (ae.callback === null) s(m);
        else if (ae.startTime <= O)
          s(m), ae.sortIndex = ae.expirationTime, a(p, ae);
        else break;
        ae = r(m);
      }
    }
    function J(O) {
      if (C = !1, G(O), !R)
        if (r(p) !== null)
          R = !0, W || (W = !0, I());
        else {
          var ae = r(m);
          ae !== null && ee(J, ae.startTime - O);
        }
    }
    var W = !1, te = -1, j = 5, Z = -1;
    function ne() {
      return D ? !0 : !(n.unstable_now() - Z < j);
    }
    function ue() {
      if (D = !1, W) {
        var O = n.unstable_now();
        Z = O;
        var ae = !0;
        try {
          e: {
            R = !1, C && (C = !1, V(te), te = -1), E = !0;
            var $ = S;
            try {
              t: {
                for (G(O), v = r(p); v !== null && !(v.expirationTime > O && ne()); ) {
                  var le = v.callback;
                  if (typeof le == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Se = le(
                      v.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof Se == "function") {
                      v.callback = Se, G(O), ae = !0;
                      break t;
                    }
                    v === r(p) && s(p), G(O);
                  } else s(p);
                  v = r(p);
                }
                if (v !== null) ae = !0;
                else {
                  var A = r(m);
                  A !== null && ee(
                    J,
                    A.startTime - O
                  ), ae = !1;
                }
              }
              break e;
            } finally {
              v = null, S = $, E = !1;
            }
            ae = void 0;
          }
        } finally {
          ae ? I() : W = !1;
        }
      }
    }
    var I;
    if (typeof U == "function")
      I = function() {
        U(ue);
      };
    else if (typeof MessageChannel < "u") {
      var Y = new MessageChannel(), oe = Y.port2;
      Y.port1.onmessage = ue, I = function() {
        oe.postMessage(null);
      };
    } else
      I = function() {
        z(ue, 0);
      };
    function ee(O, ae) {
      te = z(function() {
        O(n.unstable_now());
      }, ae);
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
          var ae = 3;
          break;
        default:
          ae = S;
      }
      var $ = S;
      S = ae;
      try {
        return O();
      } finally {
        S = $;
      }
    }, n.unstable_requestPaint = function() {
      D = !0;
    }, n.unstable_runWithPriority = function(O, ae) {
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
      var $ = S;
      S = O;
      try {
        return ae();
      } finally {
        S = $;
      }
    }, n.unstable_scheduleCallback = function(O, ae, $) {
      var le = n.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? le + $ : le) : $ = le, O) {
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
      return Se = $ + Se, O = {
        id: y++,
        callback: ae,
        priorityLevel: O,
        startTime: $,
        expirationTime: Se,
        sortIndex: -1
      }, $ > le ? (O.sortIndex = $, a(m, O), r(p) === null && O === r(m) && (C ? (V(te), te = -1) : C = !0, ee(J, $ - le))) : (O.sortIndex = Se, a(p, O), R || E || (R = !0, W || (W = !0, I()))), O;
    }, n.unstable_shouldYield = ne, n.unstable_wrapCallback = function(O) {
      var ae = S;
      return function() {
        var $ = S;
        S = ae;
        try {
          return O.apply(this, arguments);
        } finally {
          S = $;
        }
      };
    };
  })(qf)), qf;
}
var Ng;
function YE() {
  return Ng || (Ng = 1, Hf.exports = PE()), Hf.exports;
}
var kf = { exports: {} }, Ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zg;
function GE() {
  if (zg) return Ut;
  zg = 1;
  var n = Kd();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var s = {
    d: {
      f: r,
      r: function() {
        throw Error(a(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function c(p, m, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
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
  return Ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ut.createPortal = function(p, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return c(p, m, null, y);
  }, Ut.flushSync = function(p) {
    var m = d.T, y = s.p;
    try {
      if (d.T = null, s.p = 2, p) return p();
    } finally {
      d.T = m, s.p = y, s.d.f();
    }
  }, Ut.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Ut.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Ut.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var y = m.as, v = h(y, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, E = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: E
        }
      ) : y === "script" && s.d.X(p, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: E,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Ut.preinitModule = function(p, m) {
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
  }, Ut.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, v = h(y, m.crossOrigin);
      s.d.L(p, y, {
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
  }, Ut.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var y = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, Ut.requestFormReset = function(p) {
    s.d.r(p);
  }, Ut.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, Ut.useFormState = function(p, m, y) {
    return d.H.useFormState(p, m, y);
  }, Ut.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Ut.version = "19.2.5", Ut;
}
var Og;
function FE() {
  if (Og) return kf.exports;
  Og = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), kf.exports = GE(), kf.exports;
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
var _g;
function XE() {
  if (_g) return jr;
  _g = 1;
  var n = YE(), a = Kd(), r = FE();
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
    for (var i = e, l = t; ; ) {
      var u = i.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (l = u.return, l !== null) {
          i = l;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === i) return p(u), e;
          if (f === l) return p(u), t;
          f = f.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== l.return) i = u, l = f;
      else {
        for (var g = !1, x = u.child; x; ) {
          if (x === i) {
            g = !0, i = u, l = f;
            break;
          }
          if (x === l) {
            g = !0, l = u, i = f;
            break;
          }
          x = x.sibling;
        }
        if (!g) {
          for (x = f.child; x; ) {
            if (x === i) {
              g = !0, i = f, l = u;
              break;
            }
            if (x === l) {
              g = !0, l = f, i = u;
              break;
            }
            x = x.sibling;
          }
          if (!g) throw Error(s(189));
        }
      }
      if (i.alternate !== l) throw Error(s(190));
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
  var v = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), U = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), Z = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = ue && e[ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = Symbol.for("react.client.reference");
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Y ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case z:
        return "Profiler";
      case D:
        return "StrictMode";
      case J:
        return "Suspense";
      case W:
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
        case V:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return t = e.displayName || null, t !== null ? t : oe(e.type) || "Memo";
        case j:
          t = e._payload, e = e._init;
          try {
            return oe(e(t));
          } catch {
          }
      }
    return null;
  }
  var ee = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, le = [], Se = -1;
  function A(e) {
    return { current: e };
  }
  function F(e) {
    0 > Se || (e.current = le[Se], le[Se] = null, Se--);
  }
  function re(e, t) {
    Se++, le[Se] = e.current, e.current = t;
  }
  var ce = A(null), Te = A(null), we = A(null), je = A(null);
  function mt(e, t) {
    switch (re(we, t), re(Te, e), re(ce, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Qy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Qy(t), e = Zy(t, e);
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
    F(ce), re(ce, e);
  }
  function Qe() {
    F(ce), F(Te), F(we);
  }
  function ti(e) {
    e.memoizedState !== null && re(je, e);
    var t = ce.current, i = Zy(t, e.type);
    t !== i && (re(Te, e), re(ce, i));
  }
  function Li(e) {
    Te.current === e && (F(ce), F(Te)), je.current === e && (F(je), Rr._currentValue = $);
  }
  var Ll, Et;
  function Yt(e) {
    if (Ll === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        Ll = t && t[1] || "", Et = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ll + e + Et;
  }
  var Ui = !1;
  function Ul(e, t) {
    if (!e || Ui) return "";
    Ui = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Q = function() {
                throw Error();
              };
              if (Object.defineProperty(Q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Q, []);
                } catch (P) {
                  var k = P;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (P) {
                  k = P;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                k = P;
              }
              (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
              });
            }
          } catch (P) {
            if (P && k && typeof P.stack == "string")
              return [P.stack, k.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = l.DetermineComponentFrameRoot(), g = f[0], x = f[1];
      if (g && x) {
        var w = g.split(`
`), H = x.split(`
`);
        for (u = l = 0; l < w.length && !w[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < H.length && !H[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === w.length || u === H.length)
          for (l = w.length - 1, u = H.length - 1; 1 <= l && 0 <= u && w[l] !== H[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (w[l] !== H[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || w[l] !== H[u]) {
                  var X = `
` + w[l].replace(" at new ", " at ");
                  return e.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", e.displayName)), X;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      Ui = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Yt(i) : "";
  }
  function Xn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Yt(e.type);
      case 16:
        return Yt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Yt("Suspense Fallback") : Yt("Suspense");
      case 19:
        return Yt("SuspenseList");
      case 0:
      case 15:
        return Ul(e.type, !1);
      case 11:
        return Ul(e.type.render, !1);
      case 1:
        return Ul(e.type, !0);
      case 31:
        return Yt("Activity");
      default:
        return "";
    }
  }
  function ds(e) {
    try {
      var t = "", i = null;
      do
        t += Xn(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Vl = Object.prototype.hasOwnProperty, Vi = n.unstable_scheduleCallback, Bl = n.unstable_cancelCallback, Ru = n.unstable_shouldYield, wu = n.unstable_requestPaint, Bt = n.unstable_now, $n = n.unstable_getCurrentPriorityLevel, ya = n.unstable_ImmediatePriority, Hl = n.unstable_UserBlockingPriority, ga = n.unstable_NormalPriority, Tn = n.unstable_LowPriority, sn = n.unstable_IdlePriority, hs = n.log, Mu = n.unstable_setDisableYieldValue, Kn = null, Ht = null;
  function wt(e) {
    if (typeof hs == "function" && Mu(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(Kn, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : Cu, ms = Math.log, ps = Math.LN2;
  function Cu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ms(e) / ps | 0) | 0;
  }
  var ni = 256, Qn = 262144, ai = 4194304;
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
  function Bi(e, t, i) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var x = l & 134217727;
    return x !== 0 ? (l = x & ~f, l !== 0 ? u = Rn(l) : (g &= x, g !== 0 ? u = Rn(g) : i || (i = x & ~e, i !== 0 && (u = Rn(i))))) : (x = l & ~f, x !== 0 ? u = Rn(x) : g !== 0 ? u = Rn(g) : i || (i = l & ~e, i !== 0 && (u = Rn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, i = t & -t, f >= i || f === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function va(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Au(e, t) {
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
  function ql() {
    var e = ai;
    return ai <<= 1, (ai & 62914560) === 0 && (ai = 4194304), e;
  }
  function ba(e) {
    for (var t = [], i = 0; 31 > i; i++) t.push(e);
    return t;
  }
  function On(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ys(e, t, i, l, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var x = e.entanglements, w = e.expirationTimes, H = e.hiddenUpdates;
    for (i = g & ~i; 0 < i; ) {
      var X = 31 - _t(i), Q = 1 << X;
      x[X] = 0, w[X] = -1;
      var k = H[X];
      if (k !== null)
        for (H[X] = null, X = 0; X < k.length; X++) {
          var P = k[X];
          P !== null && (P.lane &= -536870913);
        }
      i &= ~Q;
    }
    l !== 0 && gs(e, l, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~t));
  }
  function gs(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - _t(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | i & 261930;
  }
  function vs(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var l = 31 - _t(i), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), i &= ~u;
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
  function q(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ie() {
    var e = ae.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : bg(e.type));
  }
  function se(e, t) {
    var i = ae.p;
    try {
      return ae.p = e, t();
    } finally {
      ae.p = i;
    }
  }
  var pe = Math.random().toString(36).slice(2), fe = "__reactFiber$" + pe, de = "__reactProps$" + pe, ge = "__reactContainer$" + pe, he = "__reactEvents$" + pe, Ee = "__reactListeners$" + pe, be = "__reactHandles$" + pe, He = "__reactResources$" + pe, De = "__reactMarker$" + pe;
  function Ze(e) {
    delete e[fe], delete e[de], delete e[he], delete e[Ee], delete e[be];
  }
  function Fe(e) {
    var t = e[fe];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ge] || i[fe]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = ag(e); e !== null; ) {
            if (i = e[fe]) return i;
            e = ag(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function lt(e) {
    if (e = e[fe] || e[ge]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Oe(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function pt(e) {
    var t = e[He];
    return t || (t = e[He] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function We(e) {
    e[De] = !0;
  }
  var Sa = /* @__PURE__ */ new Set(), wn = {};
  function Mt(e, t) {
    _n(e, t), _n(e + "Capture", t);
  }
  function _n(e, t) {
    for (wn[e] = t, e = 0; e < t.length; e++)
      Sa.add(t[e]);
  }
  var ii = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ln = {}, li = {};
  function Hi(e) {
    return Vl.call(li, e) ? !0 : Vl.call(Ln, e) ? !1 : ii.test(e) ? li[e] = !0 : (Ln[e] = !0, !1);
  }
  function Ne(e, t, i) {
    if (Hi(t))
      if (i === null) e.removeAttribute(t);
      else {
        switch (typeof i) {
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
        e.setAttribute(t, "" + i);
      }
  }
  function ct(e, t, i) {
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
  function Lt(e, t, i, l) {
    if (l === null) e.removeAttribute(i);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(t, i, "" + l);
    }
  }
  function yt(e) {
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
  function et(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function qi(e, t, i) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, f = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(g) {
          i = "" + g, f.call(this, g);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
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
  function ki(e) {
    if (!e._valueTracker) {
      var t = et(e) ? "checked" : "value";
      e._valueTracker = qi(
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
    var i = t.getValue(), l = "";
    return e && (l = et(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== i ? (t.setValue(e), !0) : !1;
  }
  function Ss(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var j1 = /[\n"\\]/g;
  function on(e) {
    return e.replace(
      j1,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ju(e, t, i, l, u, f, g, x) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Du(e, g, yt(t)) : i != null ? Du(e, g, yt(i)) : l != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + yt(x) : e.removeAttribute("name");
  }
  function Yh(e, t, i, l, u, f, g, x) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ki(e);
        return;
      }
      i = i != null ? "" + yt(i) : "", t = t != null ? "" + yt(t) : i, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = x ? e.checked : !!l, e.defaultChecked = !!l, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), ki(e);
  }
  function Du(e, t, i) {
    t === "number" && Ss(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Pi(e, t, i, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && l && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + yt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gh(e, t, i) {
    if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + yt(i) : "";
  }
  function Fh(e, t, i, l) {
    if (t == null) {
      if (l != null) {
        if (i != null) throw Error(s(92));
        if (ee(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        i = l;
      }
      i == null && (i = ""), t = i;
    }
    i = yt(t), e.defaultValue = i, l = e.textContent, l === i && l !== "" && l !== null && (e.value = l), ki(e);
  }
  function Yi(e, t) {
    if (t) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var D1 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Xh(e, t, i) {
    var l = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, i) : typeof i != "number" || i === 0 || D1.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
  }
  function $h(e, t, i) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, i != null) {
      for (var l in i)
        !i.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && i[u] !== l && Xh(e, u, l);
    } else
      for (var f in t)
        t.hasOwnProperty(f) && Xh(e, f, t[f]);
  }
  function Nu(e) {
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
  var N1 = /* @__PURE__ */ new Map([
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
  ]), z1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xs(e) {
    return z1.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Zn() {
  }
  var zu = null;
  function Ou(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Gi = null, Fi = null;
  function Kh(e) {
    var t = lt(e);
    if (t && (e = t.stateNode)) {
      var i = e[de] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ju(
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
              'input[name="' + on(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var l = i[t];
              if (l !== e && l.form === e.form) {
                var u = l[de] || null;
                if (!u) throw Error(s(90));
                ju(
                  l,
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
              l = i[t], l.form === e.form && bs(l);
          }
          break e;
        case "textarea":
          Gh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Pi(e, !!i.multiple, t, !1);
      }
    }
  }
  var _u = !1;
  function Qh(e, t, i) {
    if (_u) return e(t, i);
    _u = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (_u = !1, (Gi !== null || Fi !== null) && (oo(), Gi && (t = Gi, e = Fi, Fi = Gi = null, Kh(t), e)))
        for (t = 0; t < e.length; t++) Kh(e[t]);
    }
  }
  function kl(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var l = i[de] || null;
    if (l === null) return null;
    i = l[t];
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
    if (i && typeof i != "function")
      throw Error(
        s(231, t, typeof i)
      );
    return i;
  }
  var In = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lu = !1;
  if (In)
    try {
      var Pl = {};
      Object.defineProperty(Pl, "passive", {
        get: function() {
          Lu = !0;
        }
      }), window.addEventListener("test", Pl, Pl), window.removeEventListener("test", Pl, Pl);
    } catch {
      Lu = !1;
    }
  var xa = null, Uu = null, Es = null;
  function Zh() {
    if (Es) return Es;
    var e, t = Uu, i = t.length, l, u = "value" in xa ? xa.value : xa.textContent, f = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var g = i - e;
    for (l = 1; l <= g && t[i - l] === u[f - l]; l++) ;
    return Es = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Ts(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Rs() {
    return !0;
  }
  function Ih() {
    return !1;
  }
  function Gt(e) {
    function t(i, l, u, f, g) {
      this._reactName = i, this._targetInst = u, this.type = l, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (i = e[x], this[x] = i ? i(f) : f[x]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Rs : Ih, this.isPropagationStopped = Ih, this;
    }
    return v(t.prototype, {
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
  var ri = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ws = Gt(ri), Yl = v({}, ri, { view: 0, detail: 0 }), O1 = Gt(Yl), Vu, Bu, Gl, Ms = v({}, Yl, {
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
    getModifierState: qu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Gl && (Gl && e.type === "mousemove" ? (Vu = e.screenX - Gl.screenX, Bu = e.screenY - Gl.screenY) : Bu = Vu = 0, Gl = e), Vu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Bu;
    }
  }), Jh = Gt(Ms), _1 = v({}, Ms, { dataTransfer: 0 }), L1 = Gt(_1), U1 = v({}, Yl, { relatedTarget: 0 }), Hu = Gt(U1), V1 = v({}, ri, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), B1 = Gt(V1), H1 = v({}, ri, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), q1 = Gt(H1), k1 = v({}, ri, { data: 0 }), Wh = Gt(k1), P1 = {
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
  }, Y1 = {
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
  }, G1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function F1(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = G1[e]) ? !!t[e] : !1;
  }
  function qu() {
    return F1;
  }
  var X1 = v({}, Yl, {
    key: function(e) {
      if (e.key) {
        var t = P1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ts(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Y1[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: qu,
    charCode: function(e) {
      return e.type === "keypress" ? Ts(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ts(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), $1 = Gt(X1), K1 = v({}, Ms, {
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
  }), em = Gt(K1), Q1 = v({}, Yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: qu
  }), Z1 = Gt(Q1), I1 = v({}, ri, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), J1 = Gt(I1), W1 = v({}, Ms, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ex = Gt(W1), tx = v({}, ri, {
    newState: 0,
    oldState: 0
  }), nx = Gt(tx), ax = [9, 13, 27, 32], ku = In && "CompositionEvent" in window, Fl = null;
  In && "documentMode" in document && (Fl = document.documentMode);
  var ix = In && "TextEvent" in window && !Fl, tm = In && (!ku || Fl && 8 < Fl && 11 >= Fl), nm = " ", am = !1;
  function im(e, t) {
    switch (e) {
      case "keyup":
        return ax.indexOf(t.keyCode) !== -1;
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
  function lm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Xi = !1;
  function lx(e, t) {
    switch (e) {
      case "compositionend":
        return lm(t);
      case "keypress":
        return t.which !== 32 ? null : (am = !0, nm);
      case "textInput":
        return e = t.data, e === nm && am ? null : e;
      default:
        return null;
    }
  }
  function rx(e, t) {
    if (Xi)
      return e === "compositionend" || !ku && im(e, t) ? (e = Zh(), Es = Uu = xa = null, Xi = !1, e) : null;
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
        return tm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var sx = {
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
  function rm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!sx[e.type] : t === "textarea";
  }
  function sm(e, t, i, l) {
    Gi ? Fi ? Fi.push(l) : Fi = [l] : Gi = l, t = yo(t, "onChange"), 0 < t.length && (i = new ws(
      "onChange",
      "change",
      null,
      i,
      l
    ), e.push({ event: i, listeners: t }));
  }
  var Xl = null, $l = null;
  function ox(e) {
    Yy(e, 0);
  }
  function Cs(e) {
    var t = Oe(e);
    if (bs(t)) return e;
  }
  function om(e, t) {
    if (e === "change") return t;
  }
  var um = !1;
  if (In) {
    var Pu;
    if (In) {
      var Yu = "oninput" in document;
      if (!Yu) {
        var cm = document.createElement("div");
        cm.setAttribute("oninput", "return;"), Yu = typeof cm.oninput == "function";
      }
      Pu = Yu;
    } else Pu = !1;
    um = Pu && (!document.documentMode || 9 < document.documentMode);
  }
  function fm() {
    Xl && (Xl.detachEvent("onpropertychange", dm), $l = Xl = null);
  }
  function dm(e) {
    if (e.propertyName === "value" && Cs($l)) {
      var t = [];
      sm(
        t,
        $l,
        e,
        Ou(e)
      ), Qh(ox, t);
    }
  }
  function ux(e, t, i) {
    e === "focusin" ? (fm(), Xl = t, $l = i, Xl.attachEvent("onpropertychange", dm)) : e === "focusout" && fm();
  }
  function cx(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Cs($l);
  }
  function fx(e, t) {
    if (e === "click") return Cs(t);
  }
  function dx(e, t) {
    if (e === "input" || e === "change")
      return Cs(t);
  }
  function hx(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : hx;
  function Kl(e, t) {
    if (Jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), l = Object.keys(t);
    if (i.length !== l.length) return !1;
    for (l = 0; l < i.length; l++) {
      var u = i[l];
      if (!Vl.call(t, u) || !Jt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function hm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function mm(e, t) {
    var i = hm(e);
    e = 0;
    for (var l; i; ) {
      if (i.nodeType === 3) {
        if (l = e + i.textContent.length, e <= t && l >= t)
          return { node: i, offset: t - e };
        e = l;
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
      i = hm(i);
    }
  }
  function pm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? pm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ym(e) {
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
  function Gu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var mx = In && "documentMode" in document && 11 >= document.documentMode, $i = null, Fu = null, Ql = null, Xu = !1;
  function gm(e, t, i) {
    var l = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Xu || $i == null || $i !== Ss(l) || (l = $i, "selectionStart" in l && Gu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ql && Kl(Ql, l) || (Ql = l, l = yo(Fu, "onSelect"), 0 < l.length && (t = new ws(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: l }), t.target = $i)));
  }
  function si(e, t) {
    var i = {};
    return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
  }
  var Ki = {
    animationend: si("Animation", "AnimationEnd"),
    animationiteration: si("Animation", "AnimationIteration"),
    animationstart: si("Animation", "AnimationStart"),
    transitionrun: si("Transition", "TransitionRun"),
    transitionstart: si("Transition", "TransitionStart"),
    transitioncancel: si("Transition", "TransitionCancel"),
    transitionend: si("Transition", "TransitionEnd")
  }, $u = {}, vm = {};
  In && (vm = document.createElement("div").style, "AnimationEvent" in window || (delete Ki.animationend.animation, delete Ki.animationiteration.animation, delete Ki.animationstart.animation), "TransitionEvent" in window || delete Ki.transitionend.transition);
  function oi(e) {
    if ($u[e]) return $u[e];
    if (!Ki[e]) return e;
    var t = Ki[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in vm)
        return $u[e] = t[i];
    return e;
  }
  var bm = oi("animationend"), Sm = oi("animationiteration"), xm = oi("animationstart"), px = oi("transitionrun"), yx = oi("transitionstart"), gx = oi("transitioncancel"), Em = oi("transitionend"), Tm = /* @__PURE__ */ new Map(), Ku = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ku.push("scrollEnd");
  function Mn(e, t) {
    Tm.set(e, t), Mt(t, [e]);
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
  }, un = [], Qi = 0, Qu = 0;
  function js() {
    for (var e = Qi, t = Qu = Qi = 0; t < e; ) {
      var i = un[t];
      un[t++] = null;
      var l = un[t];
      un[t++] = null;
      var u = un[t];
      un[t++] = null;
      var f = un[t];
      if (un[t++] = null, l !== null && u !== null) {
        var g = l.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), l.pending = u;
      }
      f !== 0 && Rm(i, u, f);
    }
  }
  function Ds(e, t, i, l) {
    un[Qi++] = e, un[Qi++] = t, un[Qi++] = i, un[Qi++] = l, Qu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Zu(e, t, i, l) {
    return Ds(e, t, i, l), Ns(e);
  }
  function ui(e, t) {
    return Ds(e, null, null, t), Ns(e);
  }
  function Rm(e, t, i) {
    e.lanes |= i;
    var l = e.alternate;
    l !== null && (l.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, l = f.alternate, l !== null && (l.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - _t(i), e = f.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = i | 536870912), f) : null;
  }
  function Ns(e) {
    if (50 < gr)
      throw gr = 0, rf = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zi = {};
  function vx(e, t, i, l) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Wt(e, t, i, l) {
    return new vx(e, t, i, l);
  }
  function Iu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Jn(e, t) {
    var i = e.alternate;
    return i === null ? (i = Wt(
      e.tag,
      t,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, t = e.dependencies, i.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function wm(e, t) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, t = i.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function zs(e, t, i, l, u, f) {
    var g = 0;
    if (l = e, typeof e == "function") Iu(e) && (g = 1);
    else if (typeof e == "string")
      g = TE(
        e,
        i,
        ce.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Z:
          return e = Wt(31, i, t, u), e.elementType = Z, e.lanes = f, e;
        case C:
          return ci(i.children, u, f, t);
        case D:
          g = 8, u |= 24;
          break;
        case z:
          return e = Wt(12, i, t, u | 2), e.elementType = z, e.lanes = f, e;
        case J:
          return e = Wt(13, i, t, u), e.elementType = J, e.lanes = f, e;
        case W:
          return e = Wt(19, i, t, u), e.elementType = W, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case U:
                g = 10;
                break e;
              case V:
                g = 9;
                break e;
              case G:
                g = 11;
                break e;
              case te:
                g = 14;
                break e;
              case j:
                g = 16, l = null;
                break e;
            }
          g = 29, i = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Wt(g, i, t, u), t.elementType = e, t.type = l, t.lanes = f, t;
  }
  function ci(e, t, i, l) {
    return e = Wt(7, e, l, t), e.lanes = i, e;
  }
  function Ju(e, t, i) {
    return e = Wt(6, e, null, t), e.lanes = i, e;
  }
  function Mm(e) {
    var t = Wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Wu(e, t, i) {
    return t = Wt(
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
  var Cm = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = Cm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: ds(t)
      }, Cm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: ds(t)
    };
  }
  var Ii = [], Ji = 0, Os = null, Zl = 0, fn = [], dn = 0, Ea = null, Un = 1, Vn = "";
  function Wn(e, t) {
    Ii[Ji++] = Zl, Ii[Ji++] = Os, Os = e, Zl = t;
  }
  function Am(e, t, i) {
    fn[dn++] = Un, fn[dn++] = Vn, fn[dn++] = Ea, Ea = e;
    var l = Un;
    e = Vn;
    var u = 32 - _t(l) - 1;
    l &= ~(1 << u), i += 1;
    var f = 32 - _t(t) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (l & (1 << g) - 1).toString(32), l >>= g, u -= g, Un = 1 << 32 - _t(t) + u | i << u | l, Vn = f + e;
    } else
      Un = 1 << f | i << u | l, Vn = e;
  }
  function ec(e) {
    e.return !== null && (Wn(e, 1), Am(e, 1, 0));
  }
  function tc(e) {
    for (; e === Os; )
      Os = Ii[--Ji], Ii[Ji] = null, Zl = Ii[--Ji], Ii[Ji] = null;
    for (; e === Ea; )
      Ea = fn[--dn], fn[dn] = null, Vn = fn[--dn], fn[dn] = null, Un = fn[--dn], fn[dn] = null;
  }
  function jm(e, t) {
    fn[dn++] = Un, fn[dn++] = Vn, fn[dn++] = Ea, Un = t.id, Vn = t.overflow, Ea = e;
  }
  var At = null, tt = null, Be = !1, Ta = null, hn = !1, nc = Error(s(519));
  function Ra(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Il(cn(t, e)), nc;
  }
  function Dm(e) {
    var t = e.stateNode, i = e.type, l = e.memoizedProps;
    switch (t[fe] = e, t[de] = l, i) {
      case "dialog":
        Le("cancel", t), Le("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Le("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < br.length; i++)
          Le(br[i], t);
        break;
      case "source":
        Le("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Le("error", t), Le("load", t);
        break;
      case "details":
        Le("toggle", t);
        break;
      case "input":
        Le("invalid", t), Yh(
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
        Le("invalid", t);
        break;
      case "textarea":
        Le("invalid", t), Fh(t, l.value, l.defaultValue, l.children);
    }
    i = l.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || l.suppressHydrationWarning === !0 || $y(t.textContent, i) ? (l.popover != null && (Le("beforetoggle", t), Le("toggle", t)), l.onScroll != null && Le("scroll", t), l.onScrollEnd != null && Le("scrollend", t), l.onClick != null && (t.onclick = Zn), t = !0) : t = !1, t || Ra(e, !0);
  }
  function Nm(e) {
    for (At = e.return; At; )
      switch (At.tag) {
        case 5:
        case 31:
        case 13:
          hn = !1;
          return;
        case 27:
        case 3:
          hn = !0;
          return;
        default:
          At = At.return;
      }
  }
  function Wi(e) {
    if (e !== At) return !1;
    if (!Be) return Nm(e), Be = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || xf(e.type, e.memoizedProps)), i = !i), i && tt && Ra(e), Nm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = ng(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = ng(e);
    } else
      t === 27 ? (t = tt, Ba(e.type) ? (e = Mf, Mf = null, tt = e) : tt = t) : tt = At ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fi() {
    tt = At = null, Be = !1;
  }
  function ac() {
    var e = Ta;
    return e !== null && (Kt === null ? Kt = e : Kt.push.apply(
      Kt,
      e
    ), Ta = null), e;
  }
  function Il(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var ic = A(null), di = null, ea = null;
  function wa(e, t, i) {
    re(ic, t._currentValue), t._currentValue = i;
  }
  function ta(e) {
    e._currentValue = ic.current, F(ic);
  }
  function lc(e, t, i) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === i) break;
      e = e.return;
    }
  }
  function rc(e, t, i, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var g = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var x = f;
          f = u;
          for (var w = 0; w < t.length; w++)
            if (x.context === t[w]) {
              f.lanes |= i, x = f.alternate, x !== null && (x.lanes |= i), lc(
                f.return,
                i,
                e
              ), l || (g = null);
              break e;
            }
          f = x.next;
        }
      } else if (u.tag === 18) {
        if (g = u.return, g === null) throw Error(s(341));
        g.lanes |= i, f = g.alternate, f !== null && (f.lanes |= i), lc(g, i, e), g = null;
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
  function el(e, t, i, l) {
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
          var x = u.type;
          Jt(u.pendingProps.value, g.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (u === je.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Rr) : e = [Rr]);
      }
      u = u.return;
    }
    e !== null && rc(
      t,
      e,
      i,
      l
    ), t.flags |= 262144;
  }
  function _s(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Jt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function hi(e) {
    di = e, ea = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function jt(e) {
    return zm(di, e);
  }
  function Ls(e, t) {
    return di === null && hi(e), zm(e, t);
  }
  function zm(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, ea === null) {
      if (e === null) throw Error(s(308));
      ea = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ea = ea.next = t;
    return i;
  }
  var bx = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(i, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, Sx = n.unstable_scheduleCallback, xx = n.unstable_NormalPriority, gt = {
    $$typeof: U,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function sc() {
    return {
      controller: new bx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Jl(e) {
    e.refCount--, e.refCount === 0 && Sx(xx, function() {
      e.controller.abort();
    });
  }
  var Wl = null, oc = 0, tl = 0, nl = null;
  function Ex(e, t) {
    if (Wl === null) {
      var i = Wl = [];
      oc = 0, tl = df(), nl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          i.push(l);
        }
      };
    }
    return oc++, t.then(Om, Om), t;
  }
  function Om() {
    if (--oc === 0 && Wl !== null) {
      nl !== null && (nl.status = "fulfilled");
      var e = Wl;
      Wl = null, tl = 0, nl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Tx(e, t) {
    var i = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        i.push(u);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var u = 0; u < i.length; u++) (0, i[u])(t);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), l;
  }
  var _m = O.S;
  O.S = function(e, t) {
    gy = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && Ex(e, t), _m !== null && _m(e, t);
  };
  var mi = A(null);
  function uc() {
    var e = mi.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function Us(e, t) {
    t === null ? re(mi, mi.current) : re(mi, t.pool);
  }
  function Lm() {
    var e = uc();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var al = Error(s(460)), cc = Error(s(474)), Vs = Error(s(542)), Bs = { then: function() {
  } };
  function Um(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Vm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Zn, Zn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Hm(e), e;
      default:
        if (typeof t.status == "string") t.then(Zn, Zn);
        else {
          if (e = Ie, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Hm(e), e;
        }
        throw yi = t, al;
    }
  }
  function pi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (yi = i, al) : i;
    }
  }
  var yi = null;
  function Bm() {
    if (yi === null) throw Error(s(459));
    var e = yi;
    return yi = null, e;
  }
  function Hm(e) {
    if (e === al || e === Vs)
      throw Error(s(483));
  }
  var il = null, er = 0;
  function Hs(e) {
    var t = er;
    return er += 1, il === null && (il = []), Vm(il, e, t);
  }
  function tr(e, t) {
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
  function qm(e) {
    function t(L, N) {
      if (e) {
        var B = L.deletions;
        B === null ? (L.deletions = [N], L.flags |= 16) : B.push(N);
      }
    }
    function i(L, N) {
      if (!e) return null;
      for (; N !== null; )
        t(L, N), N = N.sibling;
      return null;
    }
    function l(L) {
      for (var N = /* @__PURE__ */ new Map(); L !== null; )
        L.key !== null ? N.set(L.key, L) : N.set(L.index, L), L = L.sibling;
      return N;
    }
    function u(L, N) {
      return L = Jn(L, N), L.index = 0, L.sibling = null, L;
    }
    function f(L, N, B) {
      return L.index = B, e ? (B = L.alternate, B !== null ? (B = B.index, B < N ? (L.flags |= 67108866, N) : B) : (L.flags |= 67108866, N)) : (L.flags |= 1048576, N);
    }
    function g(L) {
      return e && L.alternate === null && (L.flags |= 67108866), L;
    }
    function x(L, N, B, K) {
      return N === null || N.tag !== 6 ? (N = Ju(B, L.mode, K), N.return = L, N) : (N = u(N, B), N.return = L, N);
    }
    function w(L, N, B, K) {
      var xe = B.type;
      return xe === C ? X(
        L,
        N,
        B.props.children,
        K,
        B.key
      ) : N !== null && (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && pi(xe) === N.type) ? (N = u(N, B.props), tr(N, B), N.return = L, N) : (N = zs(
        B.type,
        B.key,
        B.props,
        null,
        L.mode,
        K
      ), tr(N, B), N.return = L, N);
    }
    function H(L, N, B, K) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== B.containerInfo || N.stateNode.implementation !== B.implementation ? (N = Wu(B, L.mode, K), N.return = L, N) : (N = u(N, B.children || []), N.return = L, N);
    }
    function X(L, N, B, K, xe) {
      return N === null || N.tag !== 7 ? (N = ci(
        B,
        L.mode,
        K,
        xe
      ), N.return = L, N) : (N = u(N, B), N.return = L, N);
    }
    function Q(L, N, B) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = Ju(
          "" + N,
          L.mode,
          B
        ), N.return = L, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case E:
            return B = zs(
              N.type,
              N.key,
              N.props,
              null,
              L.mode,
              B
            ), tr(B, N), B.return = L, B;
          case R:
            return N = Wu(
              N,
              L.mode,
              B
            ), N.return = L, N;
          case j:
            return N = pi(N), Q(L, N, B);
        }
        if (ee(N) || I(N))
          return N = ci(
            N,
            L.mode,
            B,
            null
          ), N.return = L, N;
        if (typeof N.then == "function")
          return Q(L, Hs(N), B);
        if (N.$$typeof === U)
          return Q(
            L,
            Ls(L, N),
            B
          );
        qs(L, N);
      }
      return null;
    }
    function k(L, N, B, K) {
      var xe = N !== null ? N.key : null;
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return xe !== null ? null : x(L, N, "" + B, K);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case E:
            return B.key === xe ? w(L, N, B, K) : null;
          case R:
            return B.key === xe ? H(L, N, B, K) : null;
          case j:
            return B = pi(B), k(L, N, B, K);
        }
        if (ee(B) || I(B))
          return xe !== null ? null : X(L, N, B, K, null);
        if (typeof B.then == "function")
          return k(
            L,
            N,
            Hs(B),
            K
          );
        if (B.$$typeof === U)
          return k(
            L,
            N,
            Ls(L, B),
            K
          );
        qs(L, B);
      }
      return null;
    }
    function P(L, N, B, K, xe) {
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return L = L.get(B) || null, x(N, L, "" + K, xe);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case E:
            return L = L.get(
              K.key === null ? B : K.key
            ) || null, w(N, L, K, xe);
          case R:
            return L = L.get(
              K.key === null ? B : K.key
            ) || null, H(N, L, K, xe);
          case j:
            return K = pi(K), P(
              L,
              N,
              B,
              K,
              xe
            );
        }
        if (ee(K) || I(K))
          return L = L.get(B) || null, X(N, L, K, xe, null);
        if (typeof K.then == "function")
          return P(
            L,
            N,
            B,
            Hs(K),
            xe
          );
        if (K.$$typeof === U)
          return P(
            L,
            N,
            B,
            Ls(N, K),
            xe
          );
        qs(N, K);
      }
      return null;
    }
    function me(L, N, B, K) {
      for (var xe = null, qe = null, ve = N, Ae = N = 0, Ve = null; ve !== null && Ae < B.length; Ae++) {
        ve.index > Ae ? (Ve = ve, ve = null) : Ve = ve.sibling;
        var ke = k(
          L,
          ve,
          B[Ae],
          K
        );
        if (ke === null) {
          ve === null && (ve = Ve);
          break;
        }
        e && ve && ke.alternate === null && t(L, ve), N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke, ve = Ve;
      }
      if (Ae === B.length)
        return i(L, ve), Be && Wn(L, Ae), xe;
      if (ve === null) {
        for (; Ae < B.length; Ae++)
          ve = Q(L, B[Ae], K), ve !== null && (N = f(
            ve,
            N,
            Ae
          ), qe === null ? xe = ve : qe.sibling = ve, qe = ve);
        return Be && Wn(L, Ae), xe;
      }
      for (ve = l(ve); Ae < B.length; Ae++)
        Ve = P(
          ve,
          L,
          Ae,
          B[Ae],
          K
        ), Ve !== null && (e && Ve.alternate !== null && ve.delete(
          Ve.key === null ? Ae : Ve.key
        ), N = f(
          Ve,
          N,
          Ae
        ), qe === null ? xe = Ve : qe.sibling = Ve, qe = Ve);
      return e && ve.forEach(function(Ya) {
        return t(L, Ya);
      }), Be && Wn(L, Ae), xe;
    }
    function Re(L, N, B, K) {
      if (B == null) throw Error(s(151));
      for (var xe = null, qe = null, ve = N, Ae = N = 0, Ve = null, ke = B.next(); ve !== null && !ke.done; Ae++, ke = B.next()) {
        ve.index > Ae ? (Ve = ve, ve = null) : Ve = ve.sibling;
        var Ya = k(L, ve, ke.value, K);
        if (Ya === null) {
          ve === null && (ve = Ve);
          break;
        }
        e && ve && Ya.alternate === null && t(L, ve), N = f(Ya, N, Ae), qe === null ? xe = Ya : qe.sibling = Ya, qe = Ya, ve = Ve;
      }
      if (ke.done)
        return i(L, ve), Be && Wn(L, Ae), xe;
      if (ve === null) {
        for (; !ke.done; Ae++, ke = B.next())
          ke = Q(L, ke.value, K), ke !== null && (N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke);
        return Be && Wn(L, Ae), xe;
      }
      for (ve = l(ve); !ke.done; Ae++, ke = B.next())
        ke = P(ve, L, Ae, ke.value, K), ke !== null && (e && ke.alternate !== null && ve.delete(ke.key === null ? Ae : ke.key), N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke);
      return e && ve.forEach(function(_E) {
        return t(L, _E);
      }), Be && Wn(L, Ae), xe;
    }
    function Ke(L, N, B, K) {
      if (typeof B == "object" && B !== null && B.type === C && B.key === null && (B = B.props.children), typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case E:
            e: {
              for (var xe = B.key; N !== null; ) {
                if (N.key === xe) {
                  if (xe = B.type, xe === C) {
                    if (N.tag === 7) {
                      i(
                        L,
                        N.sibling
                      ), K = u(
                        N,
                        B.props.children
                      ), K.return = L, L = K;
                      break e;
                    }
                  } else if (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && pi(xe) === N.type) {
                    i(
                      L,
                      N.sibling
                    ), K = u(N, B.props), tr(K, B), K.return = L, L = K;
                    break e;
                  }
                  i(L, N);
                  break;
                } else t(L, N);
                N = N.sibling;
              }
              B.type === C ? (K = ci(
                B.props.children,
                L.mode,
                K,
                B.key
              ), K.return = L, L = K) : (K = zs(
                B.type,
                B.key,
                B.props,
                null,
                L.mode,
                K
              ), tr(K, B), K.return = L, L = K);
            }
            return g(L);
          case R:
            e: {
              for (xe = B.key; N !== null; ) {
                if (N.key === xe)
                  if (N.tag === 4 && N.stateNode.containerInfo === B.containerInfo && N.stateNode.implementation === B.implementation) {
                    i(
                      L,
                      N.sibling
                    ), K = u(N, B.children || []), K.return = L, L = K;
                    break e;
                  } else {
                    i(L, N);
                    break;
                  }
                else t(L, N);
                N = N.sibling;
              }
              K = Wu(B, L.mode, K), K.return = L, L = K;
            }
            return g(L);
          case j:
            return B = pi(B), Ke(
              L,
              N,
              B,
              K
            );
        }
        if (ee(B))
          return me(
            L,
            N,
            B,
            K
          );
        if (I(B)) {
          if (xe = I(B), typeof xe != "function") throw Error(s(150));
          return B = xe.call(B), Re(
            L,
            N,
            B,
            K
          );
        }
        if (typeof B.then == "function")
          return Ke(
            L,
            N,
            Hs(B),
            K
          );
        if (B.$$typeof === U)
          return Ke(
            L,
            N,
            Ls(L, B),
            K
          );
        qs(L, B);
      }
      return typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint" ? (B = "" + B, N !== null && N.tag === 6 ? (i(L, N.sibling), K = u(N, B), K.return = L, L = K) : (i(L, N), K = Ju(B, L.mode, K), K.return = L, L = K), g(L)) : i(L, N);
    }
    return function(L, N, B, K) {
      try {
        er = 0;
        var xe = Ke(
          L,
          N,
          B,
          K
        );
        return il = null, xe;
      } catch (ve) {
        if (ve === al || ve === Vs) throw ve;
        var qe = Wt(29, ve, null, L.mode);
        return qe.lanes = K, qe.return = L, qe;
      } finally {
      }
    };
  }
  var gi = qm(!0), km = qm(!1), Ma = !1;
  function fc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function dc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ca(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Aa(e, t, i) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Pe & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Ns(e), Rm(e, null, i), t;
    }
    return Ds(e, l, t, i), Ns(e);
  }
  function nr(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, vs(e, i);
    }
  }
  function hc(e, t) {
    var i = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, i === l)) {
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
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = t : e.next = t, i.lastBaseUpdate = t;
  }
  var mc = !1;
  function ar() {
    if (mc) {
      var e = nl;
      if (e !== null) throw e;
    }
  }
  function ir(e, t, i, l) {
    mc = !1;
    var u = e.updateQueue;
    Ma = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, x = u.shared.pending;
    if (x !== null) {
      u.shared.pending = null;
      var w = x, H = w.next;
      w.next = null, g === null ? f = H : g.next = H, g = w;
      var X = e.alternate;
      X !== null && (X = X.updateQueue, x = X.lastBaseUpdate, x !== g && (x === null ? X.firstBaseUpdate = H : x.next = H, X.lastBaseUpdate = w));
    }
    if (f !== null) {
      var Q = u.baseState;
      g = 0, X = H = w = null, x = f;
      do {
        var k = x.lane & -536870913, P = k !== x.lane;
        if (P ? (Ue & k) === k : (l & k) === k) {
          k !== 0 && k === tl && (mc = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var me = e, Re = x;
            k = t;
            var Ke = i;
            switch (Re.tag) {
              case 1:
                if (me = Re.payload, typeof me == "function") {
                  Q = me.call(Ke, Q, k);
                  break e;
                }
                Q = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Re.payload, k = typeof me == "function" ? me.call(Ke, Q, k) : me, k == null) break e;
                Q = v({}, Q, k);
                break e;
              case 2:
                Ma = !0;
            }
          }
          k = x.callback, k !== null && (e.flags |= 64, P && (e.flags |= 8192), P = u.callbacks, P === null ? u.callbacks = [k] : P.push(k));
        } else
          P = {
            lane: k,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, X === null ? (H = X = P, w = Q) : X = X.next = P, g |= k;
        if (x = x.next, x === null) {
          if (x = u.shared.pending, x === null)
            break;
          P = x, x = P.next, P.next = null, u.lastBaseUpdate = P, u.shared.pending = null;
        }
      } while (!0);
      X === null && (w = Q), u.baseState = w, u.firstBaseUpdate = H, u.lastBaseUpdate = X, f === null && (u.shared.lanes = 0), Oa |= g, e.lanes = g, e.memoizedState = Q;
    }
  }
  function Pm(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Ym(e, t) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Pm(i[e], t);
  }
  var ll = A(null), ks = A(0);
  function Gm(e, t) {
    e = ca, re(ks, e), re(ll, t), ca = e | t.baseLanes;
  }
  function pc() {
    re(ks, ca), re(ll, ll.current);
  }
  function yc() {
    ca = ks.current, F(ll), F(ks);
  }
  var en = A(null), mn = null;
  function ja(e) {
    var t = e.alternate;
    re(ft, ft.current & 1), re(en, e), mn === null && (t === null || ll.current !== null || t.memoizedState !== null) && (mn = e);
  }
  function gc(e) {
    re(ft, ft.current), re(en, e), mn === null && (mn = e);
  }
  function Fm(e) {
    e.tag === 22 ? (re(ft, ft.current), re(en, e), mn === null && (mn = e)) : Da();
  }
  function Da() {
    re(ft, ft.current), re(en, en.current);
  }
  function tn(e) {
    F(en), mn === e && (mn = null), F(ft);
  }
  var ft = A(0);
  function Ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Rf(i) || wf(i)))
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
  var na = 0, Ce = null, Xe = null, vt = null, Ys = !1, rl = !1, vi = !1, Gs = 0, lr = 0, sl = null, Rx = 0;
  function ot() {
    throw Error(s(321));
  }
  function vc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Jt(e[i], t[i])) return !1;
    return !0;
  }
  function bc(e, t, i, l, u, f) {
    return na = f, Ce = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Ap : _c, vi = !1, f = i(l, u), vi = !1, rl && (f = $m(
      t,
      i,
      l,
      u
    )), Xm(e), f;
  }
  function Xm(e) {
    O.H = or;
    var t = Xe !== null && Xe.next !== null;
    if (na = 0, vt = Xe = Ce = null, Ys = !1, lr = 0, sl = null, t) throw Error(s(300));
    e === null || bt || (e = e.dependencies, e !== null && _s(e) && (bt = !0));
  }
  function $m(e, t, i, l) {
    Ce = e;
    var u = 0;
    do {
      if (rl && (sl = null), lr = 0, rl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, vt = Xe = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = jp, f = t(i, l);
    } while (rl);
    return f;
  }
  function wx() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? rr(t) : t, e = e.useState()[0], (Xe !== null ? Xe.memoizedState : null) !== e && (Ce.flags |= 1024), t;
  }
  function Sc() {
    var e = Gs !== 0;
    return Gs = 0, e;
  }
  function xc(e, t, i) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i;
  }
  function Ec(e) {
    if (Ys) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ys = !1;
    }
    na = 0, vt = Xe = Ce = null, rl = !1, lr = Gs = 0, sl = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vt === null ? Ce.memoizedState = vt = e : vt = vt.next = e, vt;
  }
  function dt() {
    if (Xe === null) {
      var e = Ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xe.next;
    var t = vt === null ? Ce.memoizedState : vt.next;
    if (t !== null)
      vt = t, Xe = e;
    else {
      if (e === null)
        throw Ce.alternate === null ? Error(s(467)) : Error(s(310));
      Xe = e, e = {
        memoizedState: Xe.memoizedState,
        baseState: Xe.baseState,
        baseQueue: Xe.baseQueue,
        queue: Xe.queue,
        next: null
      }, vt === null ? Ce.memoizedState = vt = e : vt = vt.next = e;
    }
    return vt;
  }
  function Fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function rr(e) {
    var t = lr;
    return lr += 1, sl === null && (sl = []), e = Vm(sl, e, t), t = Ce, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Ap : _c), e;
  }
  function Xs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return rr(e);
      if (e.$$typeof === U) return jt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Tc(e) {
    var t = null, i = Ce.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var l = Ce.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Fs(), Ce.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), l = 0; l < e; l++)
        i[l] = ne;
    return t.index++, i;
  }
  function aa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function $s(e) {
    var t = dt();
    return Rc(t, Xe, e);
  }
  function Rc(e, t, i) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = i;
    var u = e.baseQueue, f = l.pending;
    if (f !== null) {
      if (u !== null) {
        var g = u.next;
        u.next = f.next, f.next = g;
      }
      t.baseQueue = u = f, l.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      t = u.next;
      var x = g = null, w = null, H = t, X = !1;
      do {
        var Q = H.lane & -536870913;
        if (Q !== H.lane ? (Ue & Q) === Q : (na & Q) === Q) {
          var k = H.revertLane;
          if (k === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }), Q === tl && (X = !0);
          else if ((na & k) === k) {
            H = H.next, k === tl && (X = !0);
            continue;
          } else
            Q = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }, w === null ? (x = w = Q, g = f) : w = w.next = Q, Ce.lanes |= k, Oa |= k;
          Q = H.action, vi && i(f, Q), f = H.hasEagerState ? H.eagerState : i(f, Q);
        } else
          k = {
            lane: Q,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          }, w === null ? (x = w = k, g = f) : w = w.next = k, Ce.lanes |= Q, Oa |= Q;
        H = H.next;
      } while (H !== null && H !== t);
      if (w === null ? g = f : w.next = x, !Jt(f, e.memoizedState) && (bt = !0, X && (i = nl, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = g, e.baseQueue = w, l.lastRenderedState = f;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function wc(e) {
    var t = dt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var l = i.dispatch, u = i.pending, f = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      Jt(f, t.memoizedState) || (bt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), i.lastRenderedState = f;
    }
    return [f, l];
  }
  function Km(e, t, i) {
    var l = Ce, u = dt(), f = Be;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var g = !Jt(
      (Xe || u).memoizedState,
      i
    );
    if (g && (u.memoizedState = i, bt = !0), u = u.queue, Ac(Im.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || g || vt !== null && vt.memoizedState.tag & 1) {
      if (l.flags |= 2048, ol(
        9,
        { destroy: void 0 },
        Zm.bind(
          null,
          l,
          u,
          i,
          t
        ),
        null
      ), Ie === null) throw Error(s(349));
      f || (na & 127) !== 0 || Qm(l, t, i);
    }
    return i;
  }
  function Qm(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = Ce.updateQueue, t === null ? (t = Fs(), Ce.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
  }
  function Zm(e, t, i, l) {
    t.value = i, t.getSnapshot = l, Jm(t) && Wm(e);
  }
  function Im(e, t, i) {
    return i(function() {
      Jm(t) && Wm(e);
    });
  }
  function Jm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var i = t();
      return !Jt(e, i);
    } catch {
      return !0;
    }
  }
  function Wm(e) {
    var t = ui(e, 2);
    t !== null && Qt(t, e, 2);
  }
  function Mc(e) {
    var t = qt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), vi) {
        wt(!0);
        try {
          i();
        } finally {
          wt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: aa,
      lastRenderedState: e
    }, t;
  }
  function ep(e, t, i, l) {
    return e.baseState = i, Rc(
      e,
      Xe,
      typeof l == "function" ? l : aa
    );
  }
  function Mx(e, t, i, l, u) {
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
      O.T !== null ? i(!0) : f.isTransition = !1, l(f), i = t.pending, i === null ? (f.next = t.pending = f, tp(t, f)) : (f.next = i.next, t.pending = i.next = f);
    }
  }
  function tp(e, t) {
    var i = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var f = O.T, g = {};
      O.T = g;
      try {
        var x = i(u, l), w = O.S;
        w !== null && w(g, x), np(e, t, x);
      } catch (H) {
        Cc(e, t, H);
      } finally {
        f !== null && g.types !== null && (f.types = g.types), O.T = f;
      }
    } else
      try {
        f = i(u, l), np(e, t, f);
      } catch (H) {
        Cc(e, t, H);
      }
  }
  function np(e, t, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(l) {
        ap(e, t, l);
      },
      function(l) {
        return Cc(e, t, l);
      }
    ) : ap(e, t, i);
  }
  function ap(e, t, i) {
    t.status = "fulfilled", t.value = i, ip(t), e.state = i, t = e.pending, t !== null && (i = t.next, i === t ? e.pending = null : (i = i.next, t.next = i, tp(e, i)));
  }
  function Cc(e, t, i) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = i, ip(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function ip(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function lp(e, t) {
    return t;
  }
  function rp(e, t) {
    if (Be) {
      var i = Ie.formState;
      if (i !== null) {
        e: {
          var l = Ce;
          if (Be) {
            if (tt) {
              t: {
                for (var u = tt, f = hn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = pn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                tt = pn(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Ra(l);
          }
          l = !1;
        }
        l && (t = i[0]);
      }
    }
    return i = qt(), i.memoizedState = i.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lp,
      lastRenderedState: t
    }, i.queue = l, i = wp.bind(
      null,
      Ce,
      l
    ), l.dispatch = i, l = Mc(!1), f = Oc.bind(
      null,
      Ce,
      !1,
      l.queue
    ), l = qt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, i = Mx.bind(
      null,
      Ce,
      u,
      f,
      i
    ), u.dispatch = i, l.memoizedState = e, [t, i, !1];
  }
  function sp(e) {
    var t = dt();
    return op(t, Xe, e);
  }
  function op(e, t, i) {
    if (t = Rc(
      e,
      t,
      lp
    )[0], e = $s(aa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = rr(t);
      } catch (g) {
        throw g === al ? Vs : g;
      }
    else l = t;
    t = dt();
    var u = t.queue, f = u.dispatch;
    return i !== t.memoizedState && (Ce.flags |= 2048, ol(
      9,
      { destroy: void 0 },
      Cx.bind(null, u, i),
      null
    )), [l, f, e];
  }
  function Cx(e, t) {
    e.action = t;
  }
  function up(e) {
    var t = dt(), i = Xe;
    if (i !== null)
      return op(t, i, e);
    dt(), t = t.memoizedState, i = dt();
    var l = i.queue.dispatch;
    return i.memoizedState = e, [t, l, !1];
  }
  function ol(e, t, i, l) {
    return e = { tag: e, create: i, deps: l, inst: t, next: null }, t = Ce.updateQueue, t === null && (t = Fs(), Ce.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (l = i.next, i.next = e, e.next = l, t.lastEffect = e), e;
  }
  function cp() {
    return dt().memoizedState;
  }
  function Ks(e, t, i, l) {
    var u = qt();
    Ce.flags |= e, u.memoizedState = ol(
      1 | t,
      { destroy: void 0 },
      i,
      l === void 0 ? null : l
    );
  }
  function Qs(e, t, i, l) {
    var u = dt();
    l = l === void 0 ? null : l;
    var f = u.memoizedState.inst;
    Xe !== null && l !== null && vc(l, Xe.memoizedState.deps) ? u.memoizedState = ol(t, f, i, l) : (Ce.flags |= e, u.memoizedState = ol(
      1 | t,
      f,
      i,
      l
    ));
  }
  function fp(e, t) {
    Ks(8390656, 8, e, t);
  }
  function Ac(e, t) {
    Qs(2048, 8, e, t);
  }
  function Ax(e) {
    Ce.flags |= 4;
    var t = Ce.updateQueue;
    if (t === null)
      t = Fs(), Ce.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function dp(e) {
    var t = dt().memoizedState;
    return Ax({ ref: t, nextImpl: e }), function() {
      if ((Pe & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function hp(e, t) {
    return Qs(4, 2, e, t);
  }
  function mp(e, t) {
    return Qs(4, 4, e, t);
  }
  function pp(e, t) {
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
  function yp(e, t, i) {
    i = i != null ? i.concat([e]) : null, Qs(4, 4, pp.bind(null, t, e), i);
  }
  function jc() {
  }
  function gp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    return t !== null && vc(t, l[1]) ? l[0] : (i.memoizedState = [e, t], e);
  }
  function vp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var l = i.memoizedState;
    if (t !== null && vc(t, l[1]))
      return l[0];
    if (l = e(), vi) {
      wt(!0);
      try {
        e();
      } finally {
        wt(!1);
      }
    }
    return i.memoizedState = [l, t], l;
  }
  function Dc(e, t, i) {
    return i === void 0 || (na & 1073741824) !== 0 && (Ue & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = by(), Ce.lanes |= e, Oa |= e, i);
  }
  function bp(e, t, i, l) {
    return Jt(i, t) ? i : ll.current !== null ? (e = Dc(e, i, l), Jt(e, t) || (bt = !0), e) : (na & 42) === 0 || (na & 1073741824) !== 0 && (Ue & 261930) === 0 ? (bt = !0, e.memoizedState = i) : (e = by(), Ce.lanes |= e, Oa |= e, t);
  }
  function Sp(e, t, i, l, u) {
    var f = ae.p;
    ae.p = f !== 0 && 8 > f ? f : 8;
    var g = O.T, x = {};
    O.T = x, Oc(e, !1, t, i);
    try {
      var w = u(), H = O.S;
      if (H !== null && H(x, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var X = Tx(
          w,
          l
        );
        sr(
          e,
          t,
          X,
          ln(e)
        );
      } else
        sr(
          e,
          t,
          l,
          ln(e)
        );
    } catch (Q) {
      sr(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Q },
        ln()
      );
    } finally {
      ae.p = f, g !== null && x.types !== null && (g.types = x.types), O.T = g;
    }
  }
  function jx() {
  }
  function Nc(e, t, i, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = xp(e).queue;
    Sp(
      e,
      u,
      t,
      $,
      i === null ? jx : function() {
        return Ep(e), i(l);
      }
    );
  }
  function xp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: aa,
        lastRenderedState: $
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
        lastRenderedReducer: aa,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ep(e) {
    var t = xp(e);
    t.next === null && (t = e.alternate.memoizedState), sr(
      e,
      t.next.queue,
      {},
      ln()
    );
  }
  function zc() {
    return jt(Rr);
  }
  function Tp() {
    return dt().memoizedState;
  }
  function Rp() {
    return dt().memoizedState;
  }
  function Dx(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = ln();
          e = Ca(i);
          var l = Aa(t, e, i);
          l !== null && (Qt(l, t, i), nr(l, t, i)), t = { cache: sc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Nx(e, t, i) {
    var l = ln();
    i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zs(e) ? Mp(t, i) : (i = Zu(e, t, i, l), i !== null && (Qt(i, e, l), Cp(i, t, l)));
  }
  function wp(e, t, i) {
    var l = ln();
    sr(e, t, i, l);
  }
  function sr(e, t, i, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Zs(e)) Mp(t, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null))
        try {
          var g = t.lastRenderedState, x = f(g, i);
          if (u.hasEagerState = !0, u.eagerState = x, Jt(x, g))
            return Ds(e, t, u, 0), Ie === null && js(), !1;
        } catch {
        } finally {
        }
      if (i = Zu(e, t, u, l), i !== null)
        return Qt(i, e, l), Cp(i, t, l), !0;
    }
    return !1;
  }
  function Oc(e, t, i, l) {
    if (l = {
      lane: 2,
      revertLane: df(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Zs(e)) {
      if (t) throw Error(s(479));
    } else
      t = Zu(
        e,
        i,
        l,
        2
      ), t !== null && Qt(t, e, 2);
  }
  function Zs(e) {
    var t = e.alternate;
    return e === Ce || t !== null && t === Ce;
  }
  function Mp(e, t) {
    rl = Ys = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function Cp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, i |= l, t.lanes = i, vs(e, i);
    }
  }
  var or = {
    readContext: jt,
    use: Xs,
    useCallback: ot,
    useContext: ot,
    useEffect: ot,
    useImperativeHandle: ot,
    useLayoutEffect: ot,
    useInsertionEffect: ot,
    useMemo: ot,
    useReducer: ot,
    useRef: ot,
    useState: ot,
    useDebugValue: ot,
    useDeferredValue: ot,
    useTransition: ot,
    useSyncExternalStore: ot,
    useId: ot,
    useHostTransitionStatus: ot,
    useFormState: ot,
    useActionState: ot,
    useOptimistic: ot,
    useMemoCache: ot,
    useCacheRefresh: ot
  };
  or.useEffectEvent = ot;
  var Ap = {
    readContext: jt,
    use: Xs,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: jt,
    useEffect: fp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Ks(
        4194308,
        4,
        pp.bind(null, t, e),
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
      var i = qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (vi) {
        wt(!0);
        try {
          e();
        } finally {
          wt(!1);
        }
      }
      return i.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, i) {
      var l = qt();
      if (i !== void 0) {
        var u = i(t);
        if (vi) {
          wt(!0);
          try {
            i(t);
          } finally {
            wt(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = Nx.bind(
        null,
        Ce,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Mc(e);
      var t = e.queue, i = wp.bind(null, Ce, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: jc,
    useDeferredValue: function(e, t) {
      var i = qt();
      return Dc(i, e, t);
    },
    useTransition: function() {
      var e = Mc(!1);
      return e = Sp.bind(
        null,
        Ce,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var l = Ce, u = qt();
      if (Be) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), Ie === null)
          throw Error(s(349));
        (Ue & 127) !== 0 || Qm(l, t, i);
      }
      u.memoizedState = i;
      var f = { value: i, getSnapshot: t };
      return u.queue = f, fp(Im.bind(null, l, f, e), [
        e
      ]), l.flags |= 2048, ol(
        9,
        { destroy: void 0 },
        Zm.bind(
          null,
          l,
          f,
          i,
          t
        ),
        null
      ), i;
    },
    useId: function() {
      var e = qt(), t = Ie.identifierPrefix;
      if (Be) {
        var i = Vn, l = Un;
        i = (l & ~(1 << 32 - _t(l) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Gs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = Rx++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: zc,
    useFormState: rp,
    useActionState: rp,
    useOptimistic: function(e) {
      var t = qt();
      t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = i, t = Oc.bind(
        null,
        Ce,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Tc,
    useCacheRefresh: function() {
      return qt().memoizedState = Dx.bind(
        null,
        Ce
      );
    },
    useEffectEvent: function(e) {
      var t = qt(), i = { impl: e };
      return t.memoizedState = i, function() {
        if ((Pe & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, _c = {
    readContext: jt,
    use: Xs,
    useCallback: gp,
    useContext: jt,
    useEffect: Ac,
    useImperativeHandle: yp,
    useInsertionEffect: hp,
    useLayoutEffect: mp,
    useMemo: vp,
    useReducer: $s,
    useRef: cp,
    useState: function() {
      return $s(aa);
    },
    useDebugValue: jc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return bp(
        i,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = $s(aa)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : rr(e),
        t
      ];
    },
    useSyncExternalStore: Km,
    useId: Tp,
    useHostTransitionStatus: zc,
    useFormState: sp,
    useActionState: sp,
    useOptimistic: function(e, t) {
      var i = dt();
      return ep(i, Xe, e, t);
    },
    useMemoCache: Tc,
    useCacheRefresh: Rp
  };
  _c.useEffectEvent = dp;
  var jp = {
    readContext: jt,
    use: Xs,
    useCallback: gp,
    useContext: jt,
    useEffect: Ac,
    useImperativeHandle: yp,
    useInsertionEffect: hp,
    useLayoutEffect: mp,
    useMemo: vp,
    useReducer: wc,
    useRef: cp,
    useState: function() {
      return wc(aa);
    },
    useDebugValue: jc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return Xe === null ? Dc(i, e, t) : bp(
        i,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = wc(aa)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : rr(e),
        t
      ];
    },
    useSyncExternalStore: Km,
    useId: Tp,
    useHostTransitionStatus: zc,
    useFormState: up,
    useActionState: up,
    useOptimistic: function(e, t) {
      var i = dt();
      return Xe !== null ? ep(i, Xe, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Tc,
    useCacheRefresh: Rp
  };
  jp.useEffectEvent = dp;
  function Lc(e, t, i, l) {
    t = e.memoizedState, i = i(l, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Uc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Ca(l);
      u.payload = t, i != null && (u.callback = i), t = Aa(e, u, l), t !== null && (Qt(t, e, l), nr(t, e, l));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var l = ln(), u = Ca(l);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Aa(e, u, l), t !== null && (Qt(t, e, l), nr(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = ln(), l = Ca(i);
      l.tag = 2, t != null && (l.callback = t), t = Aa(e, l, i), t !== null && (Qt(t, e, i), nr(t, e, i));
    }
  };
  function Dp(e, t, i, l, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, f, g) : t.prototype && t.prototype.isPureReactComponent ? !Kl(i, l) || !Kl(u, f) : !0;
  }
  function Np(e, t, i, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, l), t.state !== e && Uc.enqueueReplaceState(t, t.state, null);
  }
  function bi(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var l in t)
        l !== "ref" && (i[l] = t[l]);
    }
    if (e = e.defaultProps) {
      i === t && (i = v({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function zp(e) {
    As(e);
  }
  function Op(e) {
    console.error(e);
  }
  function _p(e) {
    As(e);
  }
  function Is(e, t) {
    try {
      var i = e.onUncaughtError;
      i(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Lp(e, t, i) {
    try {
      var l = e.onCaughtError;
      l(i.value, {
        componentStack: i.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Vc(e, t, i) {
    return i = Ca(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Is(e, t);
    }, i;
  }
  function Up(e) {
    return e = Ca(e), e.tag = 3, e;
  }
  function Vp(e, t, i, l) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = l.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        Lp(t, i, l);
      };
    }
    var g = i.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      Lp(t, i, l), typeof u != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var x = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function zx(e, t, i, l, u) {
    if (i.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = i.alternate, t !== null && el(
        t,
        i,
        u,
        !0
      ), i = en.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return mn === null ? uo() : i.alternate === null && ut === 0 && (ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, l === Bs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), uf(e, l, u)), !1;
          case 22:
            return i.flags |= 65536, l === Bs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : i.add(l)), uf(e, l, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return uf(e, l, u), uo(), !1;
    }
    if (Be)
      return t = en.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== nc && (e = Error(s(422), { cause: l }), Il(cn(e, i)))) : (l !== nc && (t = Error(s(423), {
        cause: l
      }), Il(
        cn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = cn(l, i), u = Vc(
        e.stateNode,
        l,
        u
      ), hc(e, u), ut !== 4 && (ut = 2)), !1;
    var f = Error(s(520), { cause: l });
    if (f = cn(f, i), yr === null ? yr = [f] : yr.push(f), ut !== 4 && (ut = 2), t === null) return !0;
    l = cn(l, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = Vc(i.stateNode, l, e), hc(i, e), !1;
        case 1:
          if (t = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (_a === null || !_a.has(f))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Up(u), Vp(
              u,
              e,
              i,
              l
            ), hc(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var Bc = Error(s(461)), bt = !1;
  function Dt(e, t, i, l) {
    t.child = e === null ? km(t, null, i, l) : gi(
      t,
      e.child,
      i,
      l
    );
  }
  function Bp(e, t, i, l, u) {
    i = i.render;
    var f = t.ref;
    if ("ref" in l) {
      var g = {};
      for (var x in l)
        x !== "ref" && (g[x] = l[x]);
    } else g = l;
    return hi(t), l = bc(
      e,
      t,
      i,
      g,
      f,
      u
    ), x = Sc(), e !== null && !bt ? (xc(e, t, u), ia(e, t, u)) : (Be && x && ec(t), t.flags |= 1, Dt(e, t, l, u), t.child);
  }
  function Hp(e, t, i, l, u) {
    if (e === null) {
      var f = i.type;
      return typeof f == "function" && !Iu(f) && f.defaultProps === void 0 && i.compare === null ? (t.tag = 15, t.type = f, qp(
        e,
        t,
        f,
        l,
        u
      )) : (e = zs(
        i.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (f = e.child, !Xc(e, u)) {
      var g = f.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Kl, i(g, l) && e.ref === t.ref)
        return ia(e, t, u);
    }
    return t.flags |= 1, e = Jn(f, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function qp(e, t, i, l, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Kl(f, l) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = l = f, Xc(e, u))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, ia(e, t, u);
    }
    return Hc(
      e,
      t,
      i,
      l,
      u
    );
  }
  function kp(e, t, i, l) {
    var u = l.children, f = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | i : i, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~f;
        } else l = 0, t.child = null;
        return Pp(
          e,
          t,
          f,
          i,
          l
        );
      }
      if ((i & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Us(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? Gm(t, f) : pc(), Fm(t);
      else
        return l = t.lanes = 536870912, Pp(
          e,
          t,
          f !== null ? f.baseLanes | i : i,
          i,
          l
        );
    } else
      f !== null ? (Us(t, f.cachePool), Gm(t, f), Da(), t.memoizedState = null) : (e !== null && Us(t, null), pc(), Da());
    return Dt(e, t, u, i), t.child;
  }
  function ur(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Pp(e, t, i, l, u) {
    var f = uc();
    return f = f === null ? null : { parent: gt._currentValue, pool: f }, t.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && Us(t, null), pc(), Fm(t), e !== null && el(e, t, l, !0), t.childLanes = u, null;
  }
  function Js(e, t) {
    return t = eo(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Yp(e, t, i) {
    return gi(t, e.child, null, i), e = Js(t, t.pendingProps), e.flags |= 2, tn(t), t.memoizedState = null, e;
  }
  function Ox(e, t, i) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (l.mode === "hidden")
          return e = Js(t, l), t.lanes = 536870912, ur(null, e);
        if (gc(t), (e = tt) ? (e = tg(
          e,
          hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Vn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Mm(e), i.return = t, t.child = i, At = t, tt = null)) : e = null, e === null) throw Ra(t);
        return t.lanes = 536870912, null;
      }
      return Js(t, l);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var g = f.dehydrated;
      if (gc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Yp(
            e,
            t,
            i
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (bt || el(e, t, i, !1), u = (i & e.childLanes) !== 0, bt || u) {
        if (l = Ie, l !== null && (g = M(l, i), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, ui(e, g), Qt(l, e, g), Bc;
        uo(), t = Yp(
          e,
          t,
          i
        );
      } else
        e = f.treeContext, tt = pn(g.nextSibling), At = t, Be = !0, Ta = null, hn = !1, e !== null && jm(t, e), t = Js(t, l), t.flags |= 4096;
      return t;
    }
    return e = Jn(e.child, {
      mode: l.mode,
      children: l.children
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
  function Hc(e, t, i, l, u) {
    return hi(t), i = bc(
      e,
      t,
      i,
      l,
      void 0,
      u
    ), l = Sc(), e !== null && !bt ? (xc(e, t, u), ia(e, t, u)) : (Be && l && ec(t), t.flags |= 1, Dt(e, t, i, u), t.child);
  }
  function Gp(e, t, i, l, u, f) {
    return hi(t), t.updateQueue = null, i = $m(
      t,
      l,
      i,
      u
    ), Xm(e), l = Sc(), e !== null && !bt ? (xc(e, t, f), ia(e, t, f)) : (Be && l && ec(t), t.flags |= 1, Dt(e, t, i, f), t.child);
  }
  function Fp(e, t, i, l, u) {
    if (hi(t), t.stateNode === null) {
      var f = Zi, g = i.contextType;
      typeof g == "object" && g !== null && (f = jt(g)), f = new i(l, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Uc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = l, f.state = t.memoizedState, f.refs = {}, fc(t), g = i.contextType, f.context = typeof g == "object" && g !== null ? jt(g) : Zi, f.state = t.memoizedState, g = i.getDerivedStateFromProps, typeof g == "function" && (Lc(
        t,
        i,
        g,
        l
      ), f.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && Uc.enqueueReplaceState(f, f.state, null), ir(t, l, f, u), ar(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      f = t.stateNode;
      var x = t.memoizedProps, w = bi(i, x);
      f.props = w;
      var H = f.context, X = i.contextType;
      g = Zi, typeof X == "object" && X !== null && (g = jt(X));
      var Q = i.getDerivedStateFromProps;
      X = typeof Q == "function" || typeof f.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, X || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x || H !== g) && Np(
        t,
        f,
        l,
        g
      ), Ma = !1;
      var k = t.memoizedState;
      f.state = k, ir(t, l, f, u), ar(), H = t.memoizedState, x || k !== H || Ma ? (typeof Q == "function" && (Lc(
        t,
        i,
        Q,
        l
      ), H = t.memoizedState), (w = Ma || Dp(
        t,
        i,
        w,
        l,
        k,
        H,
        g
      )) ? (X || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = H), f.props = l, f.state = H, f.context = g, l = w) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      f = t.stateNode, dc(e, t), g = t.memoizedProps, X = bi(i, g), f.props = X, Q = t.pendingProps, k = f.context, H = i.contextType, w = Zi, typeof H == "object" && H !== null && (w = jt(H)), x = i.getDerivedStateFromProps, (H = typeof x == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== Q || k !== w) && Np(
        t,
        f,
        l,
        w
      ), Ma = !1, k = t.memoizedState, f.state = k, ir(t, l, f, u), ar();
      var P = t.memoizedState;
      g !== Q || k !== P || Ma || e !== null && e.dependencies !== null && _s(e.dependencies) ? (typeof x == "function" && (Lc(
        t,
        i,
        x,
        l
      ), P = t.memoizedState), (X = Ma || Dp(
        t,
        i,
        X,
        l,
        k,
        P,
        w
      ) || e !== null && e.dependencies !== null && _s(e.dependencies)) ? (H || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(l, P, w), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        l,
        P,
        w
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = P), f.props = l, f.state = P, f.context = w, l = X) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return f = l, Ws(e, t), l = (t.flags & 128) !== 0, f || l ? (f = t.stateNode, i = l && typeof i.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && l ? (t.child = gi(
      t,
      e.child,
      null,
      u
    ), t.child = gi(
      t,
      null,
      i,
      u
    )) : Dt(e, t, i, u), t.memoizedState = f.state, e = t.child) : e = ia(
      e,
      t,
      u
    ), e;
  }
  function Xp(e, t, i, l) {
    return fi(), t.flags |= 256, Dt(e, t, i, l), t.child;
  }
  var qc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(e) {
    return { baseLanes: e, cachePool: Lm() };
  }
  function Pc(e, t, i) {
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= an), e;
  }
  function $p(e, t, i) {
    var l = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), g && (u = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (u ? ja(t) : Da(), (e = tt) ? (e = tg(
          e,
          hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Vn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Mm(e), i.return = t, t.child = i, At = t, tt = null)) : e = null, e === null) throw Ra(t);
        return wf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = l.children;
      return l = l.fallback, u ? (Da(), u = t.mode, x = eo(
        { mode: "hidden", children: x },
        u
      ), l = ci(
        l,
        u,
        i,
        null
      ), x.return = t, l.return = t, x.sibling = l, t.child = x, l = t.child, l.memoizedState = kc(i), l.childLanes = Pc(
        e,
        g,
        i
      ), t.memoizedState = qc, ur(null, l)) : (ja(t), Yc(t, x));
    }
    var w = e.memoizedState;
    if (w !== null && (x = w.dehydrated, x !== null)) {
      if (f)
        t.flags & 256 ? (ja(t), t.flags &= -257, t = Gc(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Da(), t.child = e.child, t.flags |= 128, t = null) : (Da(), x = l.fallback, u = t.mode, l = eo(
          { mode: "visible", children: l.children },
          u
        ), x = ci(
          x,
          u,
          i,
          null
        ), x.flags |= 2, l.return = t, x.return = t, l.sibling = x, t.child = l, gi(
          t,
          e.child,
          null,
          i
        ), l = t.child, l.memoizedState = kc(i), l.childLanes = Pc(
          e,
          g,
          i
        ), t.memoizedState = qc, t = ur(null, l));
      else if (ja(t), wf(x)) {
        if (g = x.nextSibling && x.nextSibling.dataset, g) var H = g.dgst;
        g = H, l = Error(s(419)), l.stack = "", l.digest = g, Il({ value: l, source: null, stack: null }), t = Gc(
          e,
          t,
          i
        );
      } else if (bt || el(e, t, i, !1), g = (i & e.childLanes) !== 0, bt || g) {
        if (g = Ie, g !== null && (l = M(g, i), l !== 0 && l !== w.retryLane))
          throw w.retryLane = l, ui(e, l), Qt(g, e, l), Bc;
        Rf(x) || uo(), t = Gc(
          e,
          t,
          i
        );
      } else
        Rf(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = w.treeContext, tt = pn(
          x.nextSibling
        ), At = t, Be = !0, Ta = null, hn = !1, e !== null && jm(t, e), t = Yc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Da(), x = l.fallback, u = t.mode, w = e.child, H = w.sibling, l = Jn(w, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = w.subtreeFlags & 65011712, H !== null ? x = Jn(
      H,
      x
    ) : (x = ci(
      x,
      u,
      i,
      null
    ), x.flags |= 2), x.return = t, l.return = t, l.sibling = x, t.child = l, ur(null, l), l = t.child, x = e.child.memoizedState, x === null ? x = kc(i) : (u = x.cachePool, u !== null ? (w = gt._currentValue, u = u.parent !== w ? { parent: w, pool: w } : u) : u = Lm(), x = {
      baseLanes: x.baseLanes | i,
      cachePool: u
    }), l.memoizedState = x, l.childLanes = Pc(
      e,
      g,
      i
    ), t.memoizedState = qc, ur(e.child, l)) : (ja(t), i = e.child, e = i.sibling, i = Jn(i, {
      mode: "visible",
      children: l.children
    }), i.return = t, i.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = i, t.memoizedState = null, i);
  }
  function Yc(e, t) {
    return t = eo(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function eo(e, t) {
    return e = Wt(22, e, null, t), e.lanes = 0, e;
  }
  function Gc(e, t, i) {
    return gi(t, e.child, null, i), e = Yc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Kp(e, t, i) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), lc(e.return, t, i);
  }
  function Fc(e, t, i, l, u, f) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: i,
      tailMode: u,
      treeForkCount: f
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = l, g.tail = i, g.tailMode = u, g.treeForkCount = f);
  }
  function Qp(e, t, i) {
    var l = t.pendingProps, u = l.revealOrder, f = l.tail;
    l = l.children;
    var g = ft.current, x = (g & 2) !== 0;
    if (x ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, re(ft, g), Dt(e, t, l, i), l = Be ? Zl : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Kp(e, i, t);
        else if (e.tag === 19)
          Kp(e, i, t);
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
        i = u, i === null ? (u = t.child, t.child = null) : (u = i.sibling, i.sibling = null), Fc(
          t,
          !1,
          u,
          i,
          f,
          l
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
        Fc(
          t,
          !0,
          i,
          null,
          f,
          l
        );
        break;
      case "together":
        Fc(
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
  function ia(e, t, i) {
    if (e !== null && (t.dependencies = e.dependencies), Oa |= t.lanes, (i & t.childLanes) === 0)
      if (e !== null) {
        if (el(
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
      for (e = t.child, i = Jn(e, e.pendingProps), t.child = i, i.return = t; e.sibling !== null; )
        e = e.sibling, i = i.sibling = Jn(e, e.pendingProps), i.return = t;
      i.sibling = null;
    }
    return t.child;
  }
  function Xc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && _s(e)));
  }
  function _x(e, t, i) {
    switch (t.tag) {
      case 3:
        mt(t, t.stateNode.containerInfo), wa(t, gt, e.memoizedState.cache), fi();
        break;
      case 27:
      case 5:
        ti(t);
        break;
      case 4:
        mt(t, t.stateNode.containerInfo);
        break;
      case 10:
        wa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, gc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (ja(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? $p(e, t, i) : (ja(t), e = ia(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        ja(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (i & t.childLanes) !== 0, l || (el(
          e,
          t,
          i,
          !1
        ), l = (i & t.childLanes) !== 0), u) {
          if (l)
            return Qp(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), re(ft, ft.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, kp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        wa(t, gt, e.memoizedState.cache);
    }
    return ia(e, t, i);
  }
  function Zp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        bt = !0;
      else {
        if (!Xc(e, i) && (t.flags & 128) === 0)
          return bt = !1, _x(
            e,
            t,
            i
          );
        bt = (e.flags & 131072) !== 0;
      }
    else
      bt = !1, Be && (t.flags & 1048576) !== 0 && Am(t, Zl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = pi(t.elementType), t.type = e, typeof e == "function")
            Iu(e) ? (l = bi(e, l), t.tag = 1, t = Fp(
              null,
              t,
              e,
              l,
              i
            )) : (t.tag = 0, t = Hc(
              null,
              t,
              e,
              l,
              i
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === G) {
                t.tag = 11, t = Bp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              } else if (u === te) {
                t.tag = 14, t = Hp(
                  null,
                  t,
                  e,
                  l,
                  i
                );
                break e;
              }
            }
            throw t = oe(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Hc(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 1:
        return l = t.type, u = bi(
          l,
          t.pendingProps
        ), Fp(
          e,
          t,
          l,
          u,
          i
        );
      case 3:
        e: {
          if (mt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, dc(e, t), ir(t, l, null, i);
          var g = t.memoizedState;
          if (l = g.cache, wa(t, gt, l), l !== f.cache && rc(
            t,
            [gt],
            i,
            !0
          ), ar(), l = g.element, f.isDehydrated)
            if (f = {
              element: l,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
              t = Xp(
                e,
                t,
                l,
                i
              );
              break e;
            } else if (l !== u) {
              u = cn(
                Error(s(424)),
                t
              ), Il(u), t = Xp(
                e,
                t,
                l,
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
              for (tt = pn(e.firstChild), At = t, Be = !0, Ta = null, hn = !0, i = km(
                t,
                null,
                l,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (fi(), l === u) {
              t = ia(
                e,
                t,
                i
              );
              break e;
            }
            Dt(e, t, l, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ws(e, t), e === null ? (i = sg(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Be || (i = t.type, e = t.pendingProps, l = go(
          we.current
        ).createElement(i), l[fe] = t, l[de] = e, Nt(l, i, e), We(l), t.stateNode = l) : t.memoizedState = sg(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ti(t), e === null && Be && (l = t.stateNode = ig(
          t.type,
          t.pendingProps,
          we.current
        ), At = t, hn = !0, u = tt, Ba(t.type) ? (Mf = u, tt = pn(l.firstChild)) : tt = u), Dt(
          e,
          t,
          t.pendingProps.children,
          i
        ), Ws(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Be && ((u = l = tt) && (l = cE(
          l,
          t.type,
          t.pendingProps,
          hn
        ), l !== null ? (t.stateNode = l, At = t, tt = pn(l.firstChild), hn = !1, u = !0) : u = !1), u || Ra(t)), ti(t), u = t.type, f = t.pendingProps, g = e !== null ? e.memoizedProps : null, l = f.children, xf(u, f) ? l = null : g !== null && xf(u, g) && (t.flags |= 32), t.memoizedState !== null && (u = bc(
          e,
          t,
          wx,
          null,
          null,
          i
        ), Rr._currentValue = u), Ws(e, t), Dt(e, t, l, i), t.child;
      case 6:
        return e === null && Be && ((e = i = tt) && (i = fE(
          i,
          t.pendingProps,
          hn
        ), i !== null ? (t.stateNode = i, At = t, tt = null, e = !0) : e = !1), e || Ra(t)), null;
      case 13:
        return $p(e, t, i);
      case 4:
        return mt(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = gi(
          t,
          null,
          l,
          i
        ) : Dt(e, t, l, i), t.child;
      case 11:
        return Bp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 7:
        return Dt(
          e,
          t,
          t.pendingProps,
          i
        ), t.child;
      case 8:
        return Dt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 12:
        return Dt(
          e,
          t,
          t.pendingProps.children,
          i
        ), t.child;
      case 10:
        return l = t.pendingProps, wa(t, t.type, l.value), Dt(e, t, l.children, i), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, hi(t), u = jt(u), l = l(u), t.flags |= 1, Dt(e, t, l, i), t.child;
      case 14:
        return Hp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 15:
        return qp(
          e,
          t,
          t.type,
          t.pendingProps,
          i
        );
      case 19:
        return Qp(e, t, i);
      case 31:
        return Ox(e, t, i);
      case 22:
        return kp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return hi(t), l = jt(gt), e === null ? (u = uc(), u === null && (u = Ie, f = sc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), t.memoizedState = { parent: l, cache: u }, fc(t), wa(t, gt, u)) : ((e.lanes & i) !== 0 && (dc(e, t), ir(t, null, null, i), ar()), u = e.memoizedState, f = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), wa(t, gt, l)) : (l = f.cache, wa(t, gt, l), l !== u.cache && rc(
          t,
          [gt],
          i,
          !0
        ))), Dt(
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
  function la(e) {
    e.flags |= 4;
  }
  function $c(e, t, i, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ty()) e.flags |= 8192;
        else
          throw yi = Bs, cc;
    } else e.flags &= -16777217;
  }
  function Ip(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !dg(t))
      if (Ty()) e.flags |= 8192;
      else
        throw yi = Bs, cc;
  }
  function to(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ql() : 536870912, e.lanes |= t, dl |= t);
  }
  function cr(e, t) {
    if (!Be)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var l = null; i !== null; )
            i.alternate !== null && (l = i), i = i.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function nt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = i, t;
  }
  function Lx(e, t, i) {
    var l = t.pendingProps;
    switch (tc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return nt(t), null;
      case 1:
        return nt(t), null;
      case 3:
        return i = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ta(gt), Qe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Wi(t) ? la(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, ac())), nt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (la(t), f !== null ? (nt(t), Ip(t, f)) : (nt(t), $c(
          t,
          u,
          null,
          l,
          i
        ))) : f ? f !== e.memoizedState ? (la(t), nt(t), Ip(t, f)) : (nt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && la(t), nt(t), $c(
          t,
          u,
          e,
          l,
          i
        )), null;
      case 27:
        if (Li(t), i = we.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && la(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          e = ce.current, Wi(t) ? Dm(t) : (e = ig(u, l, i), t.stateNode = e, la(t));
        }
        return nt(t), null;
      case 5:
        if (Li(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && la(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          if (f = ce.current, Wi(t))
            Dm(t);
          else {
            var g = go(
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
                    f = typeof l.is == "string" ? g.createElement("select", {
                      is: l.is
                    }) : g.createElement("select"), l.multiple ? f.multiple = !0 : l.size && (f.size = l.size);
                    break;
                  default:
                    f = typeof l.is == "string" ? g.createElement(u, { is: l.is }) : g.createElement(u);
                }
            }
            f[fe] = t, f[de] = l;
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
            e: switch (Nt(f, u, l), u) {
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
            l && la(t);
          }
        }
        return nt(t), $c(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && la(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = we.current, Wi(t)) {
            if (e = t.stateNode, i = t.memoizedProps, l = null, u = At, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[fe] = t, e = !!(e.nodeValue === i || l !== null && l.suppressHydrationWarning === !0 || $y(e.nodeValue, i)), e || Ra(t, !0);
          } else
            e = go(e).createTextNode(
              l
            ), e[fe] = t, t.stateNode = e;
        }
        return nt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Wi(t), i !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[fe] = t;
            } else
              fi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), e = !1;
          } else
            i = ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return nt(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Wi(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[fe] = t;
            } else
              fi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), u = !1;
          } else
            u = ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
        }
        return tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = l !== null, e = e !== null && e.memoizedState !== null, i && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), f = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (f = l.memoizedState.cachePool.pool), f !== u && (l.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), to(t, t.updateQueue), nt(t), null);
      case 4:
        return Qe(), e === null && yf(t.stateNode.containerInfo), nt(t), null;
      case 10:
        return ta(t.type), nt(t), null;
      case 19:
        if (F(ft), l = t.memoizedState, l === null) return nt(t), null;
        if (u = (t.flags & 128) !== 0, f = l.rendering, f === null)
          if (u) cr(l, !1);
          else {
            if (ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = Ps(e), f !== null) {
                  for (t.flags |= 128, cr(l, !1), e = f.updateQueue, t.updateQueue = e, to(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    wm(i, e), i = i.sibling;
                  return re(
                    ft,
                    ft.current & 1 | 2
                  ), Be && Wn(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Bt() > ro && (t.flags |= 128, u = !0, cr(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ps(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, to(t, e), cr(l, !0), l.tail === null && l.tailMode === "hidden" && !f.alternate && !Be)
                return nt(t), null;
            } else
              2 * Bt() - l.renderingStartTime > ro && i !== 536870912 && (t.flags |= 128, u = !0, cr(l, !1), t.lanes = 4194304);
          l.isBackwards ? (f.sibling = t.child, t.child = f) : (e = l.last, e !== null ? e.sibling = f : t.child = f, l.last = f);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Bt(), e.sibling = null, i = ft.current, re(
          ft,
          u ? i & 1 | 2 : i & 1
        ), Be && Wn(t, l.treeForkCount), e) : (nt(t), null);
      case 22:
      case 23:
        return tn(t), yc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), i = t.updateQueue, i !== null && to(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== i && (t.flags |= 2048), e !== null && F(mi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ta(gt), nt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Ux(e, t) {
    switch (tc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ta(gt), Qe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Li(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (tn(t), t.alternate === null)
            throw Error(s(340));
          fi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (tn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          fi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return F(ft), null;
      case 4:
        return Qe(), null;
      case 10:
        return ta(t.type), null;
      case 22:
      case 23:
        return tn(t), yc(), e !== null && F(mi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ta(gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jp(e, t) {
    switch (tc(t), t.tag) {
      case 3:
        ta(gt), Qe();
        break;
      case 26:
      case 27:
      case 5:
        Li(t);
        break;
      case 4:
        Qe();
        break;
      case 31:
        t.memoizedState !== null && tn(t);
        break;
      case 13:
        tn(t);
        break;
      case 19:
        F(ft);
        break;
      case 10:
        ta(t.type);
        break;
      case 22:
      case 23:
        tn(t), yc(), e !== null && F(mi);
        break;
      case 24:
        ta(gt);
    }
  }
  function fr(e, t) {
    try {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            l = void 0;
            var f = i.create, g = i.inst;
            l = f(), g.destroy = l;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (x) {
      Ge(t, t.return, x);
    }
  }
  function Na(e, t, i) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        l = f;
        do {
          if ((l.tag & e) === e) {
            var g = l.inst, x = g.destroy;
            if (x !== void 0) {
              g.destroy = void 0, u = t;
              var w = i, H = x;
              try {
                H();
              } catch (X) {
                Ge(
                  u,
                  w,
                  X
                );
              }
            }
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (X) {
      Ge(t, t.return, X);
    }
  }
  function Wp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Ym(t, i);
      } catch (l) {
        Ge(e, e.return, l);
      }
    }
  }
  function ey(e, t, i) {
    i.props = bi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (l) {
      Ge(e, t, l);
    }
  }
  function dr(e, t) {
    try {
      var i = e.ref;
      if (i !== null) {
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
        typeof i == "function" ? e.refCleanup = i(l) : i.current = l;
      }
    } catch (u) {
      Ge(e, t, u);
    }
  }
  function Bn(e, t) {
    var i = e.ref, l = e.refCleanup;
    if (i !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Ge(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Ge(e, t, u);
        }
      else i.current = null;
  }
  function ty(e) {
    var t = e.type, i = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && l.focus();
          break e;
        case "img":
          i.src ? l.src = i.src : i.srcSet && (l.srcset = i.srcSet);
      }
    } catch (u) {
      Ge(e, e.return, u);
    }
  }
  function Kc(e, t, i) {
    try {
      var l = e.stateNode;
      iE(l, e.type, i, t), l[de] = t;
    } catch (u) {
      Ge(e, e.return, u);
    }
  }
  function ny(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ba(e.type) || e.tag === 4;
  }
  function Qc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ny(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ba(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Zc(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Zn));
    else if (l !== 4 && (l === 27 && Ba(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Zc(e, t, i), e = e.sibling; e !== null; )
        Zc(e, t, i), e = e.sibling;
  }
  function no(e, t, i) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (l !== 4 && (l === 27 && Ba(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (no(e, t, i), e = e.sibling; e !== null; )
        no(e, t, i), e = e.sibling;
  }
  function ay(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Nt(t, l, i), t[fe] = e, t[de] = i;
    } catch (f) {
      Ge(e, e.return, f);
    }
  }
  var ra = !1, St = !1, Ic = !1, iy = typeof WeakSet == "function" ? WeakSet : Set, Ct = null;
  function Vx(e, t) {
    if (e = e.containerInfo, bf = Ro, e = ym(e), Gu(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var l = i.getSelection && i.getSelection();
          if (l && l.rangeCount !== 0) {
            i = l.anchorNode;
            var u = l.anchorOffset, f = l.focusNode;
            l = l.focusOffset;
            try {
              i.nodeType, f.nodeType;
            } catch {
              i = null;
              break e;
            }
            var g = 0, x = -1, w = -1, H = 0, X = 0, Q = e, k = null;
            t: for (; ; ) {
              for (var P; Q !== i || u !== 0 && Q.nodeType !== 3 || (x = g + u), Q !== f || l !== 0 && Q.nodeType !== 3 || (w = g + l), Q.nodeType === 3 && (g += Q.nodeValue.length), (P = Q.firstChild) !== null; )
                k = Q, Q = P;
              for (; ; ) {
                if (Q === e) break t;
                if (k === i && ++H === u && (x = g), k === f && ++X === l && (w = g), (P = Q.nextSibling) !== null) break;
                Q = k, k = Q.parentNode;
              }
              Q = P;
            }
            i = x === -1 || w === -1 ? null : { start: x, end: w };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Sf = { focusedElem: e, selectionRange: i }, Ro = !1, Ct = t; Ct !== null; )
      if (t = Ct, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ct = e;
      else
        for (; Ct !== null; ) {
          switch (t = Ct, f = t.alternate, e = t.flags, t.tag) {
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
                e = void 0, i = t, u = f.memoizedProps, f = f.memoizedState, l = i.stateNode;
                try {
                  var me = bi(
                    i.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    me,
                    f
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Re) {
                  Ge(
                    i,
                    i.return,
                    Re
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Tf(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Tf(e);
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
            e.return = t.return, Ct = e;
            break;
          }
          Ct = t.return;
        }
  }
  function ly(e, t, i) {
    var l = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        oa(e, i), l & 4 && fr(5, i);
        break;
      case 1:
        if (oa(e, i), l & 4)
          if (e = i.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              Ge(i, i.return, g);
            }
          else {
            var u = bi(
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
              Ge(
                i,
                i.return,
                g
              );
            }
          }
        l & 64 && Wp(i), l & 512 && dr(i, i.return);
        break;
      case 3:
        if (oa(e, i), l & 64 && (e = i.updateQueue, e !== null)) {
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
            Ym(e, t);
          } catch (g) {
            Ge(i, i.return, g);
          }
        }
        break;
      case 27:
        t === null && l & 4 && ay(i);
      case 26:
      case 5:
        oa(e, i), t === null && l & 4 && ty(i), l & 512 && dr(i, i.return);
        break;
      case 12:
        oa(e, i);
        break;
      case 31:
        oa(e, i), l & 4 && oy(e, i);
        break;
      case 13:
        oa(e, i), l & 4 && uy(e, i), l & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = Xx.bind(
          null,
          i
        ), dE(e, i))));
        break;
      case 22:
        if (l = i.memoizedState !== null || ra, !l) {
          t = t !== null && t.memoizedState !== null || St, u = ra;
          var f = St;
          ra = l, (St = t) && !f ? ua(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : oa(e, i), ra = u, St = f;
        }
        break;
      case 30:
        break;
      default:
        oa(e, i);
    }
  }
  function ry(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ry(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ze(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, Ft = !1;
  function sa(e, t, i) {
    for (i = i.child; i !== null; )
      sy(e, t, i), i = i.sibling;
  }
  function sy(e, t, i) {
    if (Ht && typeof Ht.onCommitFiberUnmount == "function")
      try {
        Ht.onCommitFiberUnmount(Kn, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        St || Bn(i, t), sa(
          e,
          t,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        St || Bn(i, t);
        var l = rt, u = Ft;
        Ba(i.type) && (rt = i.stateNode, Ft = !1), sa(
          e,
          t,
          i
        ), xr(i.stateNode), rt = l, Ft = u;
        break;
      case 5:
        St || Bn(i, t);
      case 6:
        if (l = rt, u = Ft, rt = null, sa(
          e,
          t,
          i
        ), rt = l, Ft = u, rt !== null)
          if (Ft)
            try {
              (rt.nodeType === 9 ? rt.body : rt.nodeName === "HTML" ? rt.ownerDocument.body : rt).removeChild(i.stateNode);
            } catch (f) {
              Ge(
                i,
                t,
                f
              );
            }
          else
            try {
              rt.removeChild(i.stateNode);
            } catch (f) {
              Ge(
                i,
                t,
                f
              );
            }
        break;
      case 18:
        rt !== null && (Ft ? (e = rt, Wy(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Sl(e)) : Wy(rt, i.stateNode));
        break;
      case 4:
        l = rt, u = Ft, rt = i.stateNode.containerInfo, Ft = !0, sa(
          e,
          t,
          i
        ), rt = l, Ft = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Na(2, i, t), St || Na(4, i, t), sa(
          e,
          t,
          i
        );
        break;
      case 1:
        St || (Bn(i, t), l = i.stateNode, typeof l.componentWillUnmount == "function" && ey(
          i,
          t,
          l
        )), sa(
          e,
          t,
          i
        );
        break;
      case 21:
        sa(
          e,
          t,
          i
        );
        break;
      case 22:
        St = (l = St) || i.memoizedState !== null, sa(
          e,
          t,
          i
        ), St = l;
        break;
      default:
        sa(
          e,
          t,
          i
        );
    }
  }
  function oy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Sl(e);
      } catch (i) {
        Ge(t, t.return, i);
      }
    }
  }
  function uy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Sl(e);
      } catch (i) {
        Ge(t, t.return, i);
      }
  }
  function Bx(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new iy()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new iy()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ao(e, t) {
    var i = Bx(e);
    t.forEach(function(l) {
      if (!i.has(l)) {
        i.add(l);
        var u = $x.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function Xt(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var l = 0; l < i.length; l++) {
        var u = i[l], f = e, g = t, x = g;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (Ba(x.type)) {
                rt = x.stateNode, Ft = !1;
                break e;
              }
              break;
            case 5:
              rt = x.stateNode, Ft = !1;
              break e;
            case 3:
            case 4:
              rt = x.stateNode.containerInfo, Ft = !0;
              break e;
          }
          x = x.return;
        }
        if (rt === null) throw Error(s(160));
        sy(f, g, u), rt = null, Ft = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        cy(t, e), t = t.sibling;
  }
  var Cn = null;
  function cy(e, t) {
    var i = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xt(t, e), $t(e), l & 4 && (Na(3, e, e.return), fr(3, e), Na(5, e, e.return));
        break;
      case 1:
        Xt(t, e), $t(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 64 && ra && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? l : i.concat(l))));
        break;
      case 26:
        var u = Cn;
        if (Xt(t, e), $t(e), l & 512 && (St || i === null || Bn(i, i.return)), l & 4) {
          var f = i !== null ? i.memoizedState : null;
          if (l = e.memoizedState, i === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[De] || f[fe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(l), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Nt(f, l, i), f[fe] = e, We(f), l = f;
                      break e;
                    case "link":
                      var g = cg(
                        "link",
                        "href",
                        u
                      ).get(l + (i.href || ""));
                      if (g) {
                        for (var x = 0; x < g.length; x++)
                          if (f = g[x], f.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && f.getAttribute("rel") === (i.rel == null ? null : i.rel) && f.getAttribute("title") === (i.title == null ? null : i.title) && f.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), Nt(f, l, i), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (g = cg(
                        "meta",
                        "content",
                        u
                      ).get(l + (i.content || ""))) {
                        for (x = 0; x < g.length; x++)
                          if (f = g[x], f.getAttribute("content") === (i.content == null ? null : "" + i.content) && f.getAttribute("name") === (i.name == null ? null : i.name) && f.getAttribute("property") === (i.property == null ? null : i.property) && f.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && f.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      f = u.createElement(l), Nt(f, l, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  f[fe] = e, We(f), l = f;
                }
                e.stateNode = l;
              } else
                fg(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ug(
                u,
                l,
                e.memoizedProps
              );
          else
            f !== l ? (f === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : f.count--, l === null ? fg(
              u,
              e.type,
              e.stateNode
            ) : ug(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Kc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Xt(t, e), $t(e), l & 512 && (St || i === null || Bn(i, i.return)), i !== null && l & 4 && Kc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Xt(t, e), $t(e), l & 512 && (St || i === null || Bn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Yi(u, "");
          } catch (me) {
            Ge(e, e.return, me);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, Kc(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), l & 1024 && (Ic = !0);
        break;
      case 6:
        if (Xt(t, e), $t(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = l;
          } catch (me) {
            Ge(e, e.return, me);
          }
        }
        break;
      case 3:
        if (So = null, u = Cn, Cn = vo(t.containerInfo), Xt(t, e), Cn = u, $t(e), l & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Sl(t.containerInfo);
          } catch (me) {
            Ge(e, e.return, me);
          }
        Ic && (Ic = !1, fy(e));
        break;
      case 4:
        l = Cn, Cn = vo(
          e.stateNode.containerInfo
        ), Xt(t, e), $t(e), Cn = l;
        break;
      case 12:
        Xt(t, e), $t(e);
        break;
      case 31:
        Xt(t, e), $t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ao(e, l)));
        break;
      case 13:
        Xt(t, e), $t(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (lo = Bt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ao(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var w = i !== null && i.memoizedState !== null, H = ra, X = St;
        if (ra = H || u, St = X || w, Xt(t, e), St = X, ra = H, $t(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || w || ra || St || Si(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                w = i = t;
                try {
                  if (f = w.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    x = w.stateNode;
                    var Q = w.memoizedProps.style, k = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    x.style.display = k == null || typeof k == "boolean" ? "" : ("" + k).trim();
                  }
                } catch (me) {
                  Ge(w, w.return, me);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = u ? "" : w.memoizedProps;
                } catch (me) {
                  Ge(w, w.return, me);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                w = t;
                try {
                  var P = w.stateNode;
                  u ? eg(P, !0) : eg(w.stateNode, !1);
                } catch (me) {
                  Ge(w, w.return, me);
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
        l & 4 && (l = e.updateQueue, l !== null && (i = l.retryQueue, i !== null && (l.retryQueue = null, ao(e, i))));
        break;
      case 19:
        Xt(t, e), $t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ao(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Xt(t, e), $t(e);
    }
  }
  function $t(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var i, l = e.return; l !== null; ) {
          if (ny(l)) {
            i = l;
            break;
          }
          l = l.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, f = Qc(e);
            no(e, f, u);
            break;
          case 5:
            var g = i.stateNode;
            i.flags & 32 && (Yi(g, ""), i.flags &= -33);
            var x = Qc(e);
            no(e, x, g);
            break;
          case 3:
          case 4:
            var w = i.stateNode.containerInfo, H = Qc(e);
            Zc(
              e,
              H,
              w
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (X) {
        Ge(e, e.return, X);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function fy(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        fy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function oa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        ly(e, t.alternate, t), t = t.sibling;
  }
  function Si(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Na(4, t, t.return), Si(t);
          break;
        case 1:
          Bn(t, t.return);
          var i = t.stateNode;
          typeof i.componentWillUnmount == "function" && ey(
            t,
            t.return,
            i
          ), Si(t);
          break;
        case 27:
          xr(t.stateNode);
        case 26:
        case 5:
          Bn(t, t.return), Si(t);
          break;
        case 22:
          t.memoizedState === null && Si(t);
          break;
        case 30:
          Si(t);
          break;
        default:
          Si(t);
      }
      e = e.sibling;
    }
  }
  function ua(e, t, i) {
    for (i = i && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, f = t, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          ua(
            u,
            f,
            i
          ), fr(4, f);
          break;
        case 1:
          if (ua(
            u,
            f,
            i
          ), l = f, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (H) {
              Ge(l, l.return, H);
            }
          if (l = f, u = l.updateQueue, u !== null) {
            var x = l.stateNode;
            try {
              var w = u.shared.hiddenCallbacks;
              if (w !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < w.length; u++)
                  Pm(w[u], x);
            } catch (H) {
              Ge(l, l.return, H);
            }
          }
          i && g & 64 && Wp(f), dr(f, f.return);
          break;
        case 27:
          ay(f);
        case 26:
        case 5:
          ua(
            u,
            f,
            i
          ), i && l === null && g & 4 && ty(f), dr(f, f.return);
          break;
        case 12:
          ua(
            u,
            f,
            i
          );
          break;
        case 31:
          ua(
            u,
            f,
            i
          ), i && g & 4 && oy(u, f);
          break;
        case 13:
          ua(
            u,
            f,
            i
          ), i && g & 4 && uy(u, f);
          break;
        case 22:
          f.memoizedState === null && ua(
            u,
            f,
            i
          ), dr(f, f.return);
          break;
        case 30:
          break;
        default:
          ua(
            u,
            f,
            i
          );
      }
      t = t.sibling;
    }
  }
  function Jc(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Jl(i));
  }
  function Wc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Jl(e));
  }
  function An(e, t, i, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        dy(
          e,
          t,
          i,
          l
        ), t = t.sibling;
  }
  function dy(e, t, i, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        An(
          e,
          t,
          i,
          l
        ), u & 2048 && fr(9, t);
        break;
      case 1:
        An(
          e,
          t,
          i,
          l
        );
        break;
      case 3:
        An(
          e,
          t,
          i,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Jl(e)));
        break;
      case 12:
        if (u & 2048) {
          An(
            e,
            t,
            i,
            l
          ), e = t.stateNode;
          try {
            var f = t.memoizedProps, g = f.id, x = f.onPostCommit;
            typeof x == "function" && x(
              g,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (w) {
            Ge(t, t.return, w);
          }
        } else
          An(
            e,
            t,
            i,
            l
          );
        break;
      case 31:
        An(
          e,
          t,
          i,
          l
        );
        break;
      case 13:
        An(
          e,
          t,
          i,
          l
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, g = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? An(
          e,
          t,
          i,
          l
        ) : hr(e, t) : f._visibility & 2 ? An(
          e,
          t,
          i,
          l
        ) : (f._visibility |= 2, ul(
          e,
          t,
          i,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Jc(g, t);
        break;
      case 24:
        An(
          e,
          t,
          i,
          l
        ), u & 2048 && Wc(t.alternate, t);
        break;
      default:
        An(
          e,
          t,
          i,
          l
        );
    }
  }
  function ul(e, t, i, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, g = t, x = i, w = l, H = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          ul(
            f,
            g,
            x,
            w,
            u
          ), fr(8, g);
          break;
        case 23:
          break;
        case 22:
          var X = g.stateNode;
          g.memoizedState !== null ? X._visibility & 2 ? ul(
            f,
            g,
            x,
            w,
            u
          ) : hr(
            f,
            g
          ) : (X._visibility |= 2, ul(
            f,
            g,
            x,
            w,
            u
          )), u && H & 2048 && Jc(
            g.alternate,
            g
          );
          break;
        case 24:
          ul(
            f,
            g,
            x,
            w,
            u
          ), u && H & 2048 && Wc(g.alternate, g);
          break;
        default:
          ul(
            f,
            g,
            x,
            w,
            u
          );
      }
      t = t.sibling;
    }
  }
  function hr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            hr(i, l), u & 2048 && Jc(
              l.alternate,
              l
            );
            break;
          case 24:
            hr(i, l), u & 2048 && Wc(l.alternate, l);
            break;
          default:
            hr(i, l);
        }
        t = t.sibling;
      }
  }
  var mr = 8192;
  function cl(e, t, i) {
    if (e.subtreeFlags & mr)
      for (e = e.child; e !== null; )
        hy(
          e,
          t,
          i
        ), e = e.sibling;
  }
  function hy(e, t, i) {
    switch (e.tag) {
      case 26:
        cl(
          e,
          t,
          i
        ), e.flags & mr && e.memoizedState !== null && RE(
          i,
          Cn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        cl(
          e,
          t,
          i
        );
        break;
      case 3:
      case 4:
        var l = Cn;
        Cn = vo(e.stateNode.containerInfo), cl(
          e,
          t,
          i
        ), Cn = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = mr, mr = 16777216, cl(
          e,
          t,
          i
        ), mr = l) : cl(
          e,
          t,
          i
        ));
        break;
      default:
        cl(
          e,
          t,
          i
        );
    }
  }
  function my(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function pr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, yy(
            l,
            e
          );
        }
      my(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        py(e), e = e.sibling;
  }
  function py(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        pr(e), e.flags & 2048 && Na(9, e, e.return);
        break;
      case 3:
        pr(e);
        break;
      case 12:
        pr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, io(e)) : pr(e);
        break;
      default:
        pr(e);
    }
  }
  function io(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var l = t[i];
          Ct = l, yy(
            l,
            e
          );
        }
      my(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, t, t.return), io(t);
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
  function yy(e, t) {
    for (; Ct !== null; ) {
      var i = Ct;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var l = i.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Jl(i.memoizedState.cache);
      }
      if (l = i.child, l !== null) l.return = i, Ct = l;
      else
        e: for (i = e; Ct !== null; ) {
          l = Ct;
          var u = l.sibling, f = l.return;
          if (ry(l), l === i) {
            Ct = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Ct = u;
            break e;
          }
          Ct = f;
        }
    }
  }
  var Hx = {
    getCacheForType: function(e) {
      var t = jt(gt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return jt(gt).controller.signal;
    }
  }, qx = typeof WeakMap == "function" ? WeakMap : Map, Pe = 0, Ie = null, _e = null, Ue = 0, Ye = 0, nn = null, za = !1, fl = !1, ef = !1, ca = 0, ut = 0, Oa = 0, xi = 0, tf = 0, an = 0, dl = 0, yr = null, Kt = null, nf = !1, lo = 0, gy = 0, ro = 1 / 0, so = null, _a = null, Tt = 0, La = null, hl = null, fa = 0, af = 0, lf = null, vy = null, gr = 0, rf = null;
  function ln() {
    return (Pe & 2) !== 0 && Ue !== 0 ? Ue & -Ue : O.T !== null ? df() : ie();
  }
  function by() {
    if (an === 0)
      if ((Ue & 536870912) === 0 || Be) {
        var e = Qn;
        Qn <<= 1, (Qn & 3932160) === 0 && (Qn = 262144), an = e;
      } else an = 536870912;
    return e = en.current, e !== null && (e.flags |= 32), an;
  }
  function Qt(e, t, i) {
    (e === Ie && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null) && (ml(e, 0), Ua(
      e,
      Ue,
      an,
      !1
    )), On(e, i), ((Pe & 2) === 0 || e !== Ie) && (e === Ie && ((Pe & 2) === 0 && (xi |= i), ut === 4 && Ua(
      e,
      Ue,
      an,
      !1
    )), Hn(e));
  }
  function Sy(e, t, i) {
    if ((Pe & 6) !== 0) throw Error(s(327));
    var l = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || va(e, t), u = l ? Yx(e, t) : of(e, t, !0), f = l;
    do {
      if (u === 0) {
        fl && !l && Ua(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !kx(i)) {
          u = of(e, t, !1), f = !1;
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
              var x = e;
              u = yr;
              var w = x.current.memoizedState.isDehydrated;
              if (w && (ml(x, g).flags |= 256), g = of(
                x,
                g,
                !1
              ), g !== 2) {
                if (ef && !w) {
                  x.errorRecoveryDisabledLanes |= f, xi |= f, u = 4;
                  break e;
                }
                f = Kt, Kt = u, f !== null && (Kt === null ? Kt = f : Kt.push.apply(
                  Kt,
                  f
                ));
              }
              u = g;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          ml(e, 0), Ua(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, f = u, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ua(
                l,
                t,
                an,
                !za
              );
              break e;
            case 2:
              Kt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = lo + 300 - Bt(), 10 < u)) {
            if (Ua(
              l,
              t,
              an,
              !za
            ), Bi(l, 0, !0) !== 0) break e;
            fa = t, l.timeoutHandle = Iy(
              xy.bind(
                null,
                l,
                i,
                Kt,
                so,
                nf,
                t,
                an,
                xi,
                dl,
                za,
                f,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          xy(
            l,
            i,
            Kt,
            so,
            nf,
            t,
            an,
            xi,
            dl,
            za,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Hn(e);
  }
  function xy(e, t, i, l, u, f, g, x, w, H, X, Q, k, P) {
    if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
      Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Zn
      }, hy(
        t,
        f,
        Q
      );
      var me = (f & 62914560) === f ? lo - Bt() : (f & 4194048) === f ? gy - Bt() : 0;
      if (me = wE(
        Q,
        me
      ), me !== null) {
        fa = f, e.cancelPendingCommit = me(
          jy.bind(
            null,
            e,
            t,
            f,
            i,
            l,
            u,
            g,
            x,
            w,
            X,
            Q,
            null,
            k,
            P
          )
        ), Ua(e, f, g, !H);
        return;
      }
    }
    jy(
      e,
      t,
      f,
      i,
      l,
      u,
      g,
      x,
      w
    );
  }
  function kx(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var l = 0; l < i.length; l++) {
          var u = i[l], f = u.getSnapshot;
          u = u.value;
          try {
            if (!Jt(f(), u)) return !1;
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
  function Ua(e, t, i, l) {
    t &= ~tf, t &= ~xi, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - _t(u), g = 1 << f;
      l[f] = -1, u &= ~g;
    }
    i !== 0 && gs(e, i, t);
  }
  function oo() {
    return (Pe & 6) === 0 ? (vr(0), !1) : !0;
  }
  function sf() {
    if (_e !== null) {
      if (Ye === 0)
        var e = _e.return;
      else
        e = _e, ea = di = null, Ec(e), il = null, er = 0, e = _e;
      for (; e !== null; )
        Jp(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function ml(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, sE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), fa = 0, sf(), Ie = e, _e = i = Jn(e.current, null), Ue = t, Ye = 0, nn = null, za = !1, fl = va(e, t), ef = !1, dl = an = tf = xi = Oa = ut = 0, Kt = yr = null, nf = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - _t(l), f = 1 << u;
        t |= e[u], l &= ~f;
      }
    return ca = t, js(), i;
  }
  function Ey(e, t) {
    Ce = null, O.H = or, t === al || t === Vs ? (t = Bm(), Ye = 3) : t === cc ? (t = Bm(), Ye = 4) : Ye = t === Bc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, nn = t, _e === null && (ut = 1, Is(
      e,
      cn(t, e.current)
    ));
  }
  function Ty() {
    var e = en.current;
    return e === null ? !0 : (Ue & 4194048) === Ue ? mn === null : (Ue & 62914560) === Ue || (Ue & 536870912) !== 0 ? e === mn : !1;
  }
  function Ry() {
    var e = O.H;
    return O.H = or, e === null ? or : e;
  }
  function wy() {
    var e = O.A;
    return O.A = Hx, e;
  }
  function uo() {
    ut = 4, za || (Ue & 4194048) !== Ue && en.current !== null || (fl = !0), (Oa & 134217727) === 0 && (xi & 134217727) === 0 || Ie === null || Ua(
      Ie,
      Ue,
      an,
      !1
    );
  }
  function of(e, t, i) {
    var l = Pe;
    Pe |= 2;
    var u = Ry(), f = wy();
    (Ie !== e || Ue !== t) && (so = null, ml(e, t)), t = !1;
    var g = ut;
    e: do
      try {
        if (Ye !== 0 && _e !== null) {
          var x = _e, w = nn;
          switch (Ye) {
            case 8:
              sf(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              en.current === null && (t = !0);
              var H = Ye;
              if (Ye = 0, nn = null, pl(e, x, w, H), i && fl) {
                g = 0;
                break e;
              }
              break;
            default:
              H = Ye, Ye = 0, nn = null, pl(e, x, w, H);
          }
        }
        Px(), g = ut;
        break;
      } catch (X) {
        Ey(e, X);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ea = di = null, Pe = l, O.H = u, O.A = f, _e === null && (Ie = null, Ue = 0, js()), g;
  }
  function Px() {
    for (; _e !== null; ) My(_e);
  }
  function Yx(e, t) {
    var i = Pe;
    Pe |= 2;
    var l = Ry(), u = wy();
    Ie !== e || Ue !== t ? (so = null, ro = Bt() + 500, ml(e, t)) : fl = va(
      e,
      t
    );
    e: do
      try {
        if (Ye !== 0 && _e !== null) {
          t = _e;
          var f = nn;
          t: switch (Ye) {
            case 1:
              Ye = 0, nn = null, pl(e, t, f, 1);
              break;
            case 2:
            case 9:
              if (Um(f)) {
                Ye = 0, nn = null, Cy(t);
                break;
              }
              t = function() {
                Ye !== 2 && Ye !== 9 || Ie !== e || (Ye = 7), Hn(e);
              }, f.then(t, t);
              break e;
            case 3:
              Ye = 7;
              break e;
            case 4:
              Ye = 5;
              break e;
            case 7:
              Um(f) ? (Ye = 0, nn = null, Cy(t)) : (Ye = 0, nn = null, pl(e, t, f, 7));
              break;
            case 5:
              var g = null;
              switch (_e.tag) {
                case 26:
                  g = _e.memoizedState;
                case 5:
                case 27:
                  var x = _e;
                  if (g ? dg(g) : x.stateNode.complete) {
                    Ye = 0, nn = null;
                    var w = x.sibling;
                    if (w !== null) _e = w;
                    else {
                      var H = x.return;
                      H !== null ? (_e = H, co(H)) : _e = null;
                    }
                    break t;
                  }
              }
              Ye = 0, nn = null, pl(e, t, f, 5);
              break;
            case 6:
              Ye = 0, nn = null, pl(e, t, f, 6);
              break;
            case 8:
              sf(), ut = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Gx();
        break;
      } catch (X) {
        Ey(e, X);
      }
    while (!0);
    return ea = di = null, O.H = l, O.A = u, Pe = i, _e !== null ? 0 : (Ie = null, Ue = 0, js(), ut);
  }
  function Gx() {
    for (; _e !== null && !Ru(); )
      My(_e);
  }
  function My(e) {
    var t = Zp(e.alternate, e, ca);
    e.memoizedProps = e.pendingProps, t === null ? co(e) : _e = t;
  }
  function Cy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Gp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ue
        );
        break;
      case 11:
        t = Gp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ue
        );
        break;
      case 5:
        Ec(t);
      default:
        Jp(i, t), t = _e = wm(t, ca), t = Zp(i, t, ca);
    }
    e.memoizedProps = e.pendingProps, t === null ? co(e) : _e = t;
  }
  function pl(e, t, i, l) {
    ea = di = null, Ec(t), il = null, er = 0;
    var u = t.return;
    try {
      if (zx(
        e,
        u,
        t,
        i,
        Ue
      )) {
        ut = 1, Is(
          e,
          cn(i, e.current)
        ), _e = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw _e = u, f;
      ut = 1, Is(
        e,
        cn(i, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (Be || l === 1 ? e = !0 : fl || (Ue & 536870912) !== 0 ? e = !1 : (za = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = en.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Ay(t, e)) : co(t);
  }
  function co(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Ay(
          t,
          za
        );
        return;
      }
      e = t.return;
      var i = Lx(
        t.alternate,
        t,
        ca
      );
      if (i !== null) {
        _e = i;
        return;
      }
      if (t = t.sibling, t !== null) {
        _e = t;
        return;
      }
      _e = t = e;
    } while (t !== null);
    ut === 0 && (ut = 5);
  }
  function Ay(e, t) {
    do {
      var i = Ux(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, _e = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !t && (e = e.sibling, e !== null)) {
        _e = e;
        return;
      }
      _e = e = i;
    } while (e !== null);
    ut = 6, _e = null;
  }
  function jy(e, t, i, l, u, f, g, x, w) {
    e.cancelPendingCommit = null;
    do
      fo();
    while (Tt !== 0);
    if ((Pe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Qu, ys(
        e,
        i,
        f,
        g,
        x,
        w
      ), e === Ie && (_e = Ie = null, Ue = 0), hl = t, La = e, fa = i, af = f, lf = u, vy = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Kx(ga, function() {
        return _y(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = ae.p, ae.p = 2, g = Pe, Pe |= 4;
        try {
          Vx(e, t, i);
        } finally {
          Pe = g, ae.p = u, O.T = l;
        }
      }
      Tt = 1, Dy(), Ny(), zy();
    }
  }
  function Dy() {
    if (Tt === 1) {
      Tt = 0;
      var e = La, t = hl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var l = ae.p;
        ae.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          cy(t, e);
          var f = Sf, g = ym(e.containerInfo), x = f.focusedElem, w = f.selectionRange;
          if (g !== x && x && x.ownerDocument && pm(
            x.ownerDocument.documentElement,
            x
          )) {
            if (w !== null && Gu(x)) {
              var H = w.start, X = w.end;
              if (X === void 0 && (X = H), "selectionStart" in x)
                x.selectionStart = H, x.selectionEnd = Math.min(
                  X,
                  x.value.length
                );
              else {
                var Q = x.ownerDocument || document, k = Q && Q.defaultView || window;
                if (k.getSelection) {
                  var P = k.getSelection(), me = x.textContent.length, Re = Math.min(w.start, me), Ke = w.end === void 0 ? Re : Math.min(w.end, me);
                  !P.extend && Re > Ke && (g = Ke, Ke = Re, Re = g);
                  var L = mm(
                    x,
                    Re
                  ), N = mm(
                    x,
                    Ke
                  );
                  if (L && N && (P.rangeCount !== 1 || P.anchorNode !== L.node || P.anchorOffset !== L.offset || P.focusNode !== N.node || P.focusOffset !== N.offset)) {
                    var B = Q.createRange();
                    B.setStart(L.node, L.offset), P.removeAllRanges(), Re > Ke ? (P.addRange(B), P.extend(N.node, N.offset)) : (B.setEnd(N.node, N.offset), P.addRange(B));
                  }
                }
              }
            }
            for (Q = [], P = x; P = P.parentNode; )
              P.nodeType === 1 && Q.push({
                element: P,
                left: P.scrollLeft,
                top: P.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < Q.length; x++) {
              var K = Q[x];
              K.element.scrollLeft = K.left, K.element.scrollTop = K.top;
            }
          }
          Ro = !!bf, Sf = bf = null;
        } finally {
          Pe = u, ae.p = l, O.T = i;
        }
      }
      e.current = t, Tt = 2;
    }
  }
  function Ny() {
    if (Tt === 2) {
      Tt = 0;
      var e = La, t = hl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var l = ae.p;
        ae.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          ly(e, t.alternate, t);
        } finally {
          Pe = u, ae.p = l, O.T = i;
        }
      }
      Tt = 3;
    }
  }
  function zy() {
    if (Tt === 4 || Tt === 3) {
      Tt = 0, wu();
      var e = La, t = hl, i = fa, l = vy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Tt = 5 : (Tt = 0, hl = La = null, Oy(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (_a = null), q(i), t = t.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
        try {
          Ht.onCommitFiberRoot(
            Kn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, u = ae.p, ae.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, g = 0; g < l.length; g++) {
            var x = l[g];
            f(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          O.T = t, ae.p = u;
        }
      }
      (fa & 3) !== 0 && fo(), Hn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === rf ? gr++ : (gr = 0, rf = e) : gr = 0, vr(0);
    }
  }
  function Oy(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Jl(t)));
  }
  function fo() {
    return Dy(), Ny(), zy(), _y();
  }
  function _y() {
    if (Tt !== 5) return !1;
    var e = La, t = af;
    af = 0;
    var i = q(fa), l = O.T, u = ae.p;
    try {
      ae.p = 32 > i ? 32 : i, O.T = null, i = lf, lf = null;
      var f = La, g = fa;
      if (Tt = 0, hl = La = null, fa = 0, (Pe & 6) !== 0) throw Error(s(331));
      var x = Pe;
      if (Pe |= 4, py(f.current), dy(
        f,
        f.current,
        g,
        i
      ), Pe = x, vr(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(Kn, f);
        } catch {
        }
      return !0;
    } finally {
      ae.p = u, O.T = l, Oy(e, t);
    }
  }
  function Ly(e, t, i) {
    t = cn(i, t), t = Vc(e.stateNode, t, 2), e = Aa(e, t, 2), e !== null && (On(e, 2), Hn(e));
  }
  function Ge(e, t, i) {
    if (e.tag === 3)
      Ly(e, e, i);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ly(
            t,
            e,
            i
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (_a === null || !_a.has(l))) {
            e = cn(i, e), i = Up(2), l = Aa(t, i, 2), l !== null && (Vp(
              i,
              l,
              t,
              e
            ), On(l, 2), Hn(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function uf(e, t, i) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new qx();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(i) || (ef = !0, u.add(i), e = Fx.bind(null, e, t, i), t.then(e, e));
  }
  function Fx(e, t, i) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ie === e && (Ue & i) === i && (ut === 4 || ut === 3 && (Ue & 62914560) === Ue && 300 > Bt() - lo ? (Pe & 2) === 0 && ml(e, 0) : tf |= i, dl === Ue && (dl = 0)), Hn(e);
  }
  function Uy(e, t) {
    t === 0 && (t = ql()), e = ui(e, t), e !== null && (On(e, t), Hn(e));
  }
  function Xx(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), Uy(e, i);
  }
  function $x(e, t) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (i = u.retryLane);
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
    l !== null && l.delete(t), Uy(e, i);
  }
  function Kx(e, t) {
    return Vi(e, t);
  }
  var ho = null, yl = null, cf = !1, mo = !1, ff = !1, Va = 0;
  function Hn(e) {
    e !== yl && e.next === null && (yl === null ? ho = yl = e : yl = yl.next = e), mo = !0, cf || (cf = !0, Zx());
  }
  function vr(e, t) {
    if (!ff && mo) {
      ff = !0;
      do
        for (var i = !1, l = ho; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = l.suspendedLanes, x = l.pingedLanes;
              f = (1 << 31 - _t(42 | e) + 1) - 1, f &= u & ~(g & ~x), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, qy(l, f));
          } else
            f = Ue, f = Bi(
              l,
              l === Ie ? f : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (f & 3) === 0 || va(l, f) || (i = !0, qy(l, f));
          l = l.next;
        }
      while (i);
      ff = !1;
    }
  }
  function Qx() {
    Vy();
  }
  function Vy() {
    mo = cf = !1;
    var e = 0;
    Va !== 0 && rE() && (e = Va);
    for (var t = Bt(), i = null, l = ho; l !== null; ) {
      var u = l.next, f = By(l, t);
      f === 0 ? (l.next = null, i === null ? ho = u : i.next = u, u === null && (yl = i)) : (i = l, (e !== 0 || (f & 3) !== 0) && (mo = !0)), l = u;
    }
    Tt !== 0 && Tt !== 5 || vr(e), Va !== 0 && (Va = 0);
  }
  function By(e, t) {
    for (var i = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - _t(f), x = 1 << g, w = u[g];
      w === -1 ? ((x & i) === 0 || (x & l) !== 0) && (u[g] = Au(x, t)) : w <= t && (e.expiredLanes |= x), f &= ~x;
    }
    if (t = Ie, i = Ue, i = Bi(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, i === 0 || e === t && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Bl(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || va(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (l !== null && Bl(l), q(i)) {
        case 2:
        case 8:
          i = Hl;
          break;
        case 32:
          i = ga;
          break;
        case 268435456:
          i = sn;
          break;
        default:
          i = ga;
      }
      return l = Hy.bind(null, e), i = Vi(i, l), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return l !== null && l !== null && Bl(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Hy(e, t) {
    if (Tt !== 0 && Tt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (fo() && e.callbackNode !== i)
      return null;
    var l = Ue;
    return l = Bi(
      e,
      e === Ie ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Sy(e, l, t), By(e, Bt()), e.callbackNode != null && e.callbackNode === i ? Hy.bind(null, e) : null);
  }
  function qy(e, t) {
    if (fo()) return null;
    Sy(e, t, !0);
  }
  function Zx() {
    oE(function() {
      (Pe & 6) !== 0 ? Vi(
        ya,
        Qx
      ) : Vy();
    });
  }
  function df() {
    if (Va === 0) {
      var e = tl;
      e === 0 && (e = ni, ni <<= 1, (ni & 261888) === 0 && (ni = 256)), Va = e;
    }
    return Va;
  }
  function ky(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : xs("" + e);
  }
  function Py(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function Ix(e, t, i, l, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var f = ky(
        (u[de] || null).action
      ), g = l.submitter;
      g && (t = (t = g[de] || null) ? ky(t.formAction) : g.getAttribute("formAction"), t !== null && (f = t, g = null));
      var x = new ws(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Va !== 0) {
                  var w = g ? Py(u, g) : new FormData(u);
                  Nc(
                    i,
                    {
                      pending: !0,
                      data: w,
                      method: u.method,
                      action: f
                    },
                    null,
                    w
                  );
                }
              } else
                typeof f == "function" && (x.preventDefault(), w = g ? Py(u, g) : new FormData(u), Nc(
                  i,
                  {
                    pending: !0,
                    data: w,
                    method: u.method,
                    action: f
                  },
                  f,
                  w
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var hf = 0; hf < Ku.length; hf++) {
    var mf = Ku[hf], Jx = mf.toLowerCase(), Wx = mf[0].toUpperCase() + mf.slice(1);
    Mn(
      Jx,
      "on" + Wx
    );
  }
  Mn(bm, "onAnimationEnd"), Mn(Sm, "onAnimationIteration"), Mn(xm, "onAnimationStart"), Mn("dblclick", "onDoubleClick"), Mn("focusin", "onFocus"), Mn("focusout", "onBlur"), Mn(px, "onTransitionRun"), Mn(yx, "onTransitionStart"), Mn(gx, "onTransitionCancel"), Mn(Em, "onTransitionEnd"), _n("onMouseEnter", ["mouseout", "mouseover"]), _n("onMouseLeave", ["mouseout", "mouseover"]), _n("onPointerEnter", ["pointerout", "pointerover"]), _n("onPointerLeave", ["pointerout", "pointerover"]), Mt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Mt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Mt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Mt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Mt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Mt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var br = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), eE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(br)
  );
  function Yy(e, t) {
    t = (t & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var l = e[i], u = l.event;
      l = l.listeners;
      e: {
        var f = void 0;
        if (t)
          for (var g = l.length - 1; 0 <= g; g--) {
            var x = l[g], w = x.instance, H = x.currentTarget;
            if (x = x.listener, w !== f && u.isPropagationStopped())
              break e;
            f = x, u.currentTarget = H;
            try {
              f(u);
            } catch (X) {
              As(X);
            }
            u.currentTarget = null, f = w;
          }
        else
          for (g = 0; g < l.length; g++) {
            if (x = l[g], w = x.instance, H = x.currentTarget, x = x.listener, w !== f && u.isPropagationStopped())
              break e;
            f = x, u.currentTarget = H;
            try {
              f(u);
            } catch (X) {
              As(X);
            }
            u.currentTarget = null, f = w;
          }
      }
    }
  }
  function Le(e, t) {
    var i = t[he];
    i === void 0 && (i = t[he] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    i.has(l) || (Gy(t, e, 2, !1), i.add(l));
  }
  function pf(e, t, i) {
    var l = 0;
    t && (l |= 4), Gy(
      i,
      e,
      l,
      t
    );
  }
  var po = "_reactListening" + Math.random().toString(36).slice(2);
  function yf(e) {
    if (!e[po]) {
      e[po] = !0, Sa.forEach(function(i) {
        i !== "selectionchange" && (eE.has(i) || pf(i, !1, e), pf(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[po] || (t[po] = !0, pf("selectionchange", !1, t));
    }
  }
  function Gy(e, t, i, l) {
    switch (bg(t)) {
      case 2:
        var u = AE;
        break;
      case 8:
        u = jE;
        break;
      default:
        u = Nf;
    }
    i = u.bind(
      null,
      t,
      i,
      e
    ), u = void 0, !Lu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, i, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, i, !0) : u !== void 0 ? e.addEventListener(t, i, {
      passive: u
    }) : e.addEventListener(t, i, !1);
  }
  function gf(e, t, i, l, u) {
    var f = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var g = l.tag;
        if (g === 3 || g === 4) {
          var x = l.stateNode.containerInfo;
          if (x === u) break;
          if (g === 4)
            for (g = l.return; g !== null; ) {
              var w = g.tag;
              if ((w === 3 || w === 4) && g.stateNode.containerInfo === u)
                return;
              g = g.return;
            }
          for (; x !== null; ) {
            if (g = Fe(x), g === null) return;
            if (w = g.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              l = f = g;
              continue e;
            }
            x = x.parentNode;
          }
        }
        l = l.return;
      }
    Qh(function() {
      var H = f, X = Ou(i), Q = [];
      e: {
        var k = Tm.get(e);
        if (k !== void 0) {
          var P = ws, me = e;
          switch (e) {
            case "keypress":
              if (Ts(i) === 0) break e;
            case "keydown":
            case "keyup":
              P = $1;
              break;
            case "focusin":
              me = "focus", P = Hu;
              break;
            case "focusout":
              me = "blur", P = Hu;
              break;
            case "beforeblur":
            case "afterblur":
              P = Hu;
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
              P = Jh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = L1;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = Z1;
              break;
            case bm:
            case Sm:
            case xm:
              P = B1;
              break;
            case Em:
              P = J1;
              break;
            case "scroll":
            case "scrollend":
              P = O1;
              break;
            case "wheel":
              P = ex;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = q1;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = em;
              break;
            case "toggle":
            case "beforetoggle":
              P = nx;
          }
          var Re = (t & 4) !== 0, Ke = !Re && (e === "scroll" || e === "scrollend"), L = Re ? k !== null ? k + "Capture" : null : k;
          Re = [];
          for (var N = H, B; N !== null; ) {
            var K = N;
            if (B = K.stateNode, K = K.tag, K !== 5 && K !== 26 && K !== 27 || B === null || L === null || (K = kl(N, L), K != null && Re.push(
              Sr(N, K, B)
            )), Ke) break;
            N = N.return;
          }
          0 < Re.length && (k = new P(
            k,
            me,
            null,
            i,
            X
          ), Q.push({ event: k, listeners: Re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (k = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", k && i !== zu && (me = i.relatedTarget || i.fromElement) && (Fe(me) || me[ge]))
            break e;
          if ((P || k) && (k = X.window === X ? X : (k = X.ownerDocument) ? k.defaultView || k.parentWindow : window, P ? (me = i.relatedTarget || i.toElement, P = H, me = me ? Fe(me) : null, me !== null && (Ke = c(me), Re = me.tag, me !== Ke || Re !== 5 && Re !== 27 && Re !== 6) && (me = null)) : (P = null, me = H), P !== me)) {
            if (Re = Jh, K = "onMouseLeave", L = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (Re = em, K = "onPointerLeave", L = "onPointerEnter", N = "pointer"), Ke = P == null ? k : Oe(P), B = me == null ? k : Oe(me), k = new Re(
              K,
              N + "leave",
              P,
              i,
              X
            ), k.target = Ke, k.relatedTarget = B, K = null, Fe(X) === H && (Re = new Re(
              L,
              N + "enter",
              me,
              i,
              X
            ), Re.target = B, Re.relatedTarget = Ke, K = Re), Ke = K, P && me)
              t: {
                for (Re = tE, L = P, N = me, B = 0, K = L; K; K = Re(K))
                  B++;
                K = 0;
                for (var xe = N; xe; xe = Re(xe))
                  K++;
                for (; 0 < B - K; )
                  L = Re(L), B--;
                for (; 0 < K - B; )
                  N = Re(N), K--;
                for (; B--; ) {
                  if (L === N || N !== null && L === N.alternate) {
                    Re = L;
                    break t;
                  }
                  L = Re(L), N = Re(N);
                }
                Re = null;
              }
            else Re = null;
            P !== null && Fy(
              Q,
              k,
              P,
              Re,
              !1
            ), me !== null && Ke !== null && Fy(
              Q,
              Ke,
              me,
              Re,
              !0
            );
          }
        }
        e: {
          if (k = H ? Oe(H) : window, P = k.nodeName && k.nodeName.toLowerCase(), P === "select" || P === "input" && k.type === "file")
            var qe = om;
          else if (rm(k))
            if (um)
              qe = dx;
            else {
              qe = cx;
              var ve = ux;
            }
          else
            P = k.nodeName, !P || P.toLowerCase() !== "input" || k.type !== "checkbox" && k.type !== "radio" ? H && Nu(H.elementType) && (qe = om) : qe = fx;
          if (qe && (qe = qe(e, H))) {
            sm(
              Q,
              qe,
              i,
              X
            );
            break e;
          }
          ve && ve(e, k, H), e === "focusout" && H && k.type === "number" && H.memoizedProps.value != null && Du(k, "number", k.value);
        }
        switch (ve = H ? Oe(H) : window, e) {
          case "focusin":
            (rm(ve) || ve.contentEditable === "true") && ($i = ve, Fu = H, Ql = null);
            break;
          case "focusout":
            Ql = Fu = $i = null;
            break;
          case "mousedown":
            Xu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xu = !1, gm(Q, i, X);
            break;
          case "selectionchange":
            if (mx) break;
          case "keydown":
          case "keyup":
            gm(Q, i, X);
        }
        var Ae;
        if (ku)
          e: {
            switch (e) {
              case "compositionstart":
                var Ve = "onCompositionStart";
                break e;
              case "compositionend":
                Ve = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ve = "onCompositionUpdate";
                break e;
            }
            Ve = void 0;
          }
        else
          Xi ? im(e, i) && (Ve = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ve = "onCompositionStart");
        Ve && (tm && i.locale !== "ko" && (Xi || Ve !== "onCompositionStart" ? Ve === "onCompositionEnd" && Xi && (Ae = Zh()) : (xa = X, Uu = "value" in xa ? xa.value : xa.textContent, Xi = !0)), ve = yo(H, Ve), 0 < ve.length && (Ve = new Wh(
          Ve,
          e,
          null,
          i,
          X
        ), Q.push({ event: Ve, listeners: ve }), Ae ? Ve.data = Ae : (Ae = lm(i), Ae !== null && (Ve.data = Ae)))), (Ae = ix ? lx(e, i) : rx(e, i)) && (Ve = yo(H, "onBeforeInput"), 0 < Ve.length && (ve = new Wh(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          X
        ), Q.push({
          event: ve,
          listeners: Ve
        }), ve.data = Ae)), Ix(
          Q,
          e,
          H,
          i,
          X
        );
      }
      Yy(Q, t);
    });
  }
  function Sr(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function yo(e, t) {
    for (var i = t + "Capture", l = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = kl(e, i), u != null && l.unshift(
        Sr(e, u, f)
      ), u = kl(e, t), u != null && l.push(
        Sr(e, u, f)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function tE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Fy(e, t, i, l, u) {
    for (var f = t._reactName, g = []; i !== null && i !== l; ) {
      var x = i, w = x.alternate, H = x.stateNode;
      if (x = x.tag, w !== null && w === l) break;
      x !== 5 && x !== 26 && x !== 27 || H === null || (w = H, u ? (H = kl(i, f), H != null && g.unshift(
        Sr(i, H, w)
      )) : u || (H = kl(i, f), H != null && g.push(
        Sr(i, H, w)
      ))), i = i.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var nE = /\r\n?/g, aE = /\u0000|\uFFFD/g;
  function Xy(e) {
    return (typeof e == "string" ? e : "" + e).replace(nE, `
`).replace(aE, "");
  }
  function $y(e, t) {
    return t = Xy(t), Xy(e) === t;
  }
  function $e(e, t, i, l, u, f) {
    switch (i) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || Yi(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && Yi(e, "" + l);
        break;
      case "className":
        ct(e, "class", l);
        break;
      case "tabIndex":
        ct(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ct(e, i, l);
        break;
      case "style":
        $h(e, l, f);
        break;
      case "data":
        if (t !== "object") {
          ct(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = xs("" + l), e.setAttribute(i, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof f == "function" && (i === "formAction" ? (t !== "input" && $e(e, t, "name", u.name, u, null), $e(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), $e(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), $e(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : ($e(e, t, "encType", u.encType, u, null), $e(e, t, "method", u.method, u, null), $e(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(i);
          break;
        }
        l = xs("" + l), e.setAttribute(i, l);
        break;
      case "onClick":
        l != null && (e.onclick = Zn);
        break;
      case "onScroll":
        l != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
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
        i = xs("" + l), e.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "" + l) : e.removeAttribute(i);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(i, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(i, l) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(i) : e.setAttribute(i, l);
        break;
      case "popover":
        Le("beforetoggle", e), Le("toggle", e), Ne(e, "popover", l);
        break;
      case "xlinkActuate":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Ne(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = N1.get(i) || i, Ne(e, i, l));
    }
  }
  function vf(e, t, i, l, u, f) {
    switch (i) {
      case "style":
        $h(e, l, f);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (i = l.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Yi(e, l) : (typeof l == "number" || typeof l == "bigint") && Yi(e, "" + l);
        break;
      case "onScroll":
        l != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Le("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Zn);
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
        if (!wn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), f = e[de] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof l == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, l, u);
              break e;
            }
            i in e ? e[i] = l : l === !0 ? e.setAttribute(i, "") : Ne(e, i, l);
          }
    }
  }
  function Nt(e, t, i) {
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
        Le("error", e), Le("load", e);
        var l = !1, u = !1, f;
        for (f in i)
          if (i.hasOwnProperty(f)) {
            var g = i[f];
            if (g != null)
              switch (f) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  $e(e, t, f, g, i, null);
              }
          }
        u && $e(e, t, "srcSet", i.srcSet, i, null), l && $e(e, t, "src", i.src, i, null);
        return;
      case "input":
        Le("invalid", e);
        var x = f = g = u = null, w = null, H = null;
        for (l in i)
          if (i.hasOwnProperty(l)) {
            var X = i[l];
            if (X != null)
              switch (l) {
                case "name":
                  u = X;
                  break;
                case "type":
                  g = X;
                  break;
                case "checked":
                  w = X;
                  break;
                case "defaultChecked":
                  H = X;
                  break;
                case "value":
                  f = X;
                  break;
                case "defaultValue":
                  x = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null)
                    throw Error(s(137, t));
                  break;
                default:
                  $e(e, t, l, X, i, null);
              }
          }
        Yh(
          e,
          f,
          x,
          w,
          H,
          g,
          u,
          !1
        );
        return;
      case "select":
        Le("invalid", e), l = g = f = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (x = i[u], x != null))
            switch (u) {
              case "value":
                f = x;
                break;
              case "defaultValue":
                g = x;
                break;
              case "multiple":
                l = x;
              default:
                $e(e, t, u, x, i, null);
            }
        t = f, i = g, e.multiple = !!l, t != null ? Pi(e, !!l, t, !1) : i != null && Pi(e, !!l, i, !0);
        return;
      case "textarea":
        Le("invalid", e), f = u = l = null;
        for (g in i)
          if (i.hasOwnProperty(g) && (x = i[g], x != null))
            switch (g) {
              case "value":
                l = x;
                break;
              case "defaultValue":
                u = x;
                break;
              case "children":
                f = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(s(91));
                break;
              default:
                $e(e, t, g, x, i, null);
            }
        Fh(e, l, u, f);
        return;
      case "option":
        for (w in i)
          if (i.hasOwnProperty(w) && (l = i[w], l != null))
            switch (w) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                $e(e, t, w, l, i, null);
            }
        return;
      case "dialog":
        Le("beforetoggle", e), Le("toggle", e), Le("cancel", e), Le("close", e);
        break;
      case "iframe":
      case "object":
        Le("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < br.length; l++)
          Le(br[l], e);
        break;
      case "image":
        Le("error", e), Le("load", e);
        break;
      case "details":
        Le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Le("error", e), Le("load", e);
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
        for (H in i)
          if (i.hasOwnProperty(H) && (l = i[H], l != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                $e(e, t, H, l, i, null);
            }
        return;
      default:
        if (Nu(t)) {
          for (X in i)
            i.hasOwnProperty(X) && (l = i[X], l !== void 0 && vf(
              e,
              t,
              X,
              l,
              i,
              void 0
            ));
          return;
        }
    }
    for (x in i)
      i.hasOwnProperty(x) && (l = i[x], l != null && $e(e, t, x, l, i, null));
  }
  function iE(e, t, i, l) {
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
        var u = null, f = null, g = null, x = null, w = null, H = null, X = null;
        for (P in i) {
          var Q = i[P];
          if (i.hasOwnProperty(P) && Q != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = Q;
              default:
                l.hasOwnProperty(P) || $e(e, t, P, null, l, Q);
            }
        }
        for (var k in l) {
          var P = l[k];
          if (Q = i[k], l.hasOwnProperty(k) && (P != null || Q != null))
            switch (k) {
              case "type":
                f = P;
                break;
              case "name":
                u = P;
                break;
              case "checked":
                H = P;
                break;
              case "defaultChecked":
                X = P;
                break;
              case "value":
                g = P;
                break;
              case "defaultValue":
                x = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                P !== Q && $e(
                  e,
                  t,
                  k,
                  P,
                  l,
                  Q
                );
            }
        }
        ju(
          e,
          g,
          x,
          w,
          H,
          X,
          f,
          u
        );
        return;
      case "select":
        P = g = x = k = null;
        for (f in i)
          if (w = i[f], i.hasOwnProperty(f) && w != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                P = w;
              default:
                l.hasOwnProperty(f) || $e(
                  e,
                  t,
                  f,
                  null,
                  l,
                  w
                );
            }
        for (u in l)
          if (f = l[u], w = i[u], l.hasOwnProperty(u) && (f != null || w != null))
            switch (u) {
              case "value":
                k = f;
                break;
              case "defaultValue":
                x = f;
                break;
              case "multiple":
                g = f;
              default:
                f !== w && $e(
                  e,
                  t,
                  u,
                  f,
                  l,
                  w
                );
            }
        t = x, i = g, l = P, k != null ? Pi(e, !!i, k, !1) : !!l != !!i && (t != null ? Pi(e, !!i, t, !0) : Pi(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        P = k = null;
        for (x in i)
          if (u = i[x], i.hasOwnProperty(x) && u != null && !l.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                $e(e, t, x, null, l, u);
            }
        for (g in l)
          if (u = l[g], f = i[g], l.hasOwnProperty(g) && (u != null || f != null))
            switch (g) {
              case "value":
                k = u;
                break;
              case "defaultValue":
                P = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== f && $e(e, t, g, u, l, f);
            }
        Gh(e, k, P);
        return;
      case "option":
        for (var me in i)
          if (k = i[me], i.hasOwnProperty(me) && k != null && !l.hasOwnProperty(me))
            switch (me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                $e(
                  e,
                  t,
                  me,
                  null,
                  l,
                  k
                );
            }
        for (w in l)
          if (k = l[w], P = i[w], l.hasOwnProperty(w) && k !== P && (k != null || P != null))
            switch (w) {
              case "selected":
                e.selected = k && typeof k != "function" && typeof k != "symbol";
                break;
              default:
                $e(
                  e,
                  t,
                  w,
                  k,
                  l,
                  P
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
        for (var Re in i)
          k = i[Re], i.hasOwnProperty(Re) && k != null && !l.hasOwnProperty(Re) && $e(e, t, Re, null, l, k);
        for (H in l)
          if (k = l[H], P = i[H], l.hasOwnProperty(H) && k !== P && (k != null || P != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null)
                  throw Error(s(137, t));
                break;
              default:
                $e(
                  e,
                  t,
                  H,
                  k,
                  l,
                  P
                );
            }
        return;
      default:
        if (Nu(t)) {
          for (var Ke in i)
            k = i[Ke], i.hasOwnProperty(Ke) && k !== void 0 && !l.hasOwnProperty(Ke) && vf(
              e,
              t,
              Ke,
              void 0,
              l,
              k
            );
          for (X in l)
            k = l[X], P = i[X], !l.hasOwnProperty(X) || k === P || k === void 0 && P === void 0 || vf(
              e,
              t,
              X,
              k,
              l,
              P
            );
          return;
        }
    }
    for (var L in i)
      k = i[L], i.hasOwnProperty(L) && k != null && !l.hasOwnProperty(L) && $e(e, t, L, null, l, k);
    for (Q in l)
      k = l[Q], P = i[Q], !l.hasOwnProperty(Q) || k === P || k == null && P == null || $e(e, t, Q, k, l, P);
  }
  function Ky(e) {
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
  function lE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), l = 0; l < i.length; l++) {
        var u = i[l], f = u.transferSize, g = u.initiatorType, x = u.duration;
        if (f && x && Ky(g)) {
          for (g = 0, x = u.responseEnd, l += 1; l < i.length; l++) {
            var w = i[l], H = w.startTime;
            if (H > x) break;
            var X = w.transferSize, Q = w.initiatorType;
            X && Ky(Q) && (w = w.responseEnd, g += X * (w < x ? 1 : (x - H) / (w - H)));
          }
          if (--l, t += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var bf = null, Sf = null;
  function go(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Qy(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Zy(e, t) {
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
  function xf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ef = null;
  function rE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ef ? !1 : (Ef = e, !0) : (Ef = null, !1);
  }
  var Iy = typeof setTimeout == "function" ? setTimeout : void 0, sE = typeof clearTimeout == "function" ? clearTimeout : void 0, Jy = typeof Promise == "function" ? Promise : void 0, oE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Jy < "u" ? function(e) {
    return Jy.resolve(null).then(e).catch(uE);
  } : Iy;
  function uE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ba(e) {
    return e === "head";
  }
  function Wy(e, t) {
    var i = t, l = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (l === 0) {
            e.removeChild(u), Sl(t);
            return;
          }
          l--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          l++;
        else if (i === "html")
          xr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, xr(i);
          for (var f = i.firstChild; f; ) {
            var g = f.nextSibling, x = f.nodeName;
            f[De] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = g;
          }
        } else
          i === "body" && xr(e.ownerDocument.body);
      i = u;
    } while (i);
    Sl(t);
  }
  function eg(e, t) {
    var i = e;
    e = 0;
    do {
      var l = i.nextSibling;
      if (i.nodeType === 1 ? t ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (t ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), l && l.nodeType === 8)
        if (i = l.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = l;
    } while (i);
  }
  function Tf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Tf(i), Ze(i);
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
  function cE(e, t, i, l) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[De])
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
      if (e = pn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function fE(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function tg(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Rf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function wf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function dE(e, t) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || i.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), i.removeEventListener("DOMContentLoaded", l);
      };
      i.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function pn(e) {
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
  var Mf = null;
  function ng(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (t === 0)
            return pn(e.nextSibling);
          t--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ag(e) {
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
  function ig(e, t, i) {
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
  function xr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ze(e);
  }
  var yn = /* @__PURE__ */ new Map(), lg = /* @__PURE__ */ new Set();
  function vo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var da = ae.d;
  ae.d = {
    f: hE,
    r: mE,
    D: pE,
    C: yE,
    L: gE,
    m: vE,
    X: SE,
    S: bE,
    M: xE
  };
  function hE() {
    var e = da.f(), t = oo();
    return e || t;
  }
  function mE(e) {
    var t = lt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ep(t) : da.r(e);
  }
  var gl = typeof document > "u" ? null : document;
  function rg(e, t, i) {
    var l = gl;
    if (l && typeof t == "string" && t) {
      var u = on(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), lg.has(u) || (lg.add(u), e = { rel: e, crossOrigin: i, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function pE(e) {
    da.D(e), rg("dns-prefetch", e, null);
  }
  function yE(e, t) {
    da.C(e, t), rg("preconnect", e, t);
  }
  function gE(e, t, i) {
    da.L(e, t, i);
    var l = gl;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + on(t) + '"]';
      t === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + on(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + on(
        i.imageSizes
      ) + '"]')) : u += '[href="' + on(e) + '"]';
      var f = u;
      switch (t) {
        case "style":
          f = vl(e);
          break;
        case "script":
          f = bl(e);
      }
      yn.has(f) || (e = v(
        {
          rel: "preload",
          href: t === "image" && i && i.imageSrcSet ? void 0 : e,
          as: t
        },
        i
      ), yn.set(f, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Er(f)) || t === "script" && l.querySelector(Tr(f)) || (t = l.createElement("link"), Nt(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function vE(e, t) {
    da.m(e, t);
    var i = gl;
    if (i && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + on(l) + '"][href="' + on(e) + '"]', f = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = bl(e);
      }
      if (!yn.has(f) && (e = v({ rel: "modulepreload", href: e }, t), yn.set(f, e), i.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Tr(f)))
              return;
        }
        l = i.createElement("link"), Nt(l, "link", e), We(l), i.head.appendChild(l);
      }
    }
  }
  function bE(e, t, i) {
    da.S(e, t, i);
    var l = gl;
    if (l && e) {
      var u = pt(l).hoistableStyles, f = vl(e);
      t = t || "default";
      var g = u.get(f);
      if (!g) {
        var x = { loading: 0, preload: null };
        if (g = l.querySelector(
          Er(f)
        ))
          x.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yn.get(f)) && Cf(e, i);
          var w = g = l.createElement("link");
          We(w), Nt(w, "link", e), w._p = new Promise(function(H, X) {
            w.onload = H, w.onerror = X;
          }), w.addEventListener("load", function() {
            x.loading |= 1;
          }), w.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, bo(g, t, l);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: x
        }, u.set(f, g);
      }
    }
  }
  function SE(e, t) {
    da.X(e, t);
    var i = gl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = bl(e), f = l.get(u);
      f || (f = i.querySelector(Tr(u)), f || (e = v({ src: e, async: !0 }, t), (t = yn.get(u)) && Af(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function xE(e, t) {
    da.M(e, t);
    var i = gl;
    if (i && e) {
      var l = pt(i).hoistableScripts, u = bl(e), f = l.get(u);
      f || (f = i.querySelector(Tr(u)), f || (e = v({ src: e, async: !0, type: "module" }, t), (t = yn.get(u)) && Af(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, l.set(u, f));
    }
  }
  function sg(e, t, i, l) {
    var u = (u = we.current) ? vo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = vl(i.href), i = pt(
          u
        ).hoistableStyles, l = i.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = vl(i.href);
          var f = pt(
            u
          ).hoistableStyles, g = f.get(e);
          if (g || (u = u.ownerDocument || u, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, g), (f = u.querySelector(
            Er(e)
          )) && !f._p && (g.instance = f, g.state.loading = 5), yn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yn.set(e, i), f || EE(
            u,
            e,
            i,
            g.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return g;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = bl(i), i = pt(
          u
        ).hoistableScripts, l = i.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function vl(e) {
    return 'href="' + on(e) + '"';
  }
  function Er(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function og(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function EE(e, t, i, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Nt(t, "link", i), We(t), e.head.appendChild(t));
  }
  function bl(e) {
    return '[src="' + on(e) + '"]';
  }
  function Tr(e) {
    return "script[async]" + e;
  }
  function ug(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + on(i.href) + '"]'
          );
          if (l)
            return t.instance = l, We(l), l;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), We(l), Nt(l, "style", u), bo(l, i.precedence, e), t.instance = l;
        case "stylesheet":
          u = vl(i.href);
          var f = e.querySelector(
            Er(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, We(f), f;
          l = og(i), (u = yn.get(u)) && Cf(l, u), f = (e.ownerDocument || e).createElement("link"), We(f);
          var g = f;
          return g._p = new Promise(function(x, w) {
            g.onload = x, g.onerror = w;
          }), Nt(f, "link", l), t.state.loading |= 4, bo(f, i.precedence, e), t.instance = f;
        case "script":
          return f = bl(i.src), (u = e.querySelector(
            Tr(f)
          )) ? (t.instance = u, We(u), u) : (l = i, (u = yn.get(f)) && (l = v({}, i), Af(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), We(u), Nt(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, bo(l, i.precedence, e));
    return t.instance;
  }
  function bo(e, t, i) {
    for (var l = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, f = u, g = 0; g < l.length; g++) {
      var x = l[g];
      if (x.dataset.precedence === t) f = x;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = i.nodeType === 9 ? i.head : i, t.insertBefore(e, t.firstChild));
  }
  function Cf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Af(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var So = null;
  function cg(e, t, i) {
    if (So === null) {
      var l = /* @__PURE__ */ new Map(), u = So = /* @__PURE__ */ new Map();
      u.set(i, l);
    } else
      u = So, l = u.get(i), l || (l = /* @__PURE__ */ new Map(), u.set(i, l));
    if (l.has(e)) return l;
    for (l.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[De] || f[fe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = f.getAttribute(t) || "";
        g = e + g;
        var x = l.get(g);
        x ? x.push(f) : l.set(g, [f]);
      }
    }
    return l;
  }
  function fg(e, t, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function TE(e, t, i) {
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
  function dg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function RE(e, t, i, l) {
    if (i.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = vl(l.href), f = t.querySelector(
          Er(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = xo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = f, We(f);
          return;
        }
        f = t.ownerDocument || t, l = og(l), (u = yn.get(u)) && Cf(l, u), f = f.createElement("link"), We(f);
        var g = f;
        g._p = new Promise(function(x, w) {
          g.onload = x, g.onerror = w;
        }), Nt(f, "link", l), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = xo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var jf = 0;
  function wE(e, t) {
    return e.stylesheets && e.count === 0 && To(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var l = setTimeout(function() {
        if (e.stylesheets && To(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && jf === 0 && (jf = 62500 * lE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && To(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > jf ? 50 : 800) + t
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Eo = /* @__PURE__ */ new Map(), t.forEach(ME, e), Eo = null, xo.call(e));
  }
  function ME(e, t) {
    if (!(t.state.loading & 4)) {
      var i = Eo.get(e);
      if (i) var l = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Eo.set(e, i);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var g = u[f];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (i.set(g.dataset.precedence, g), l = g);
        }
        l && i.set(null, l);
      }
      u = t.instance, g = u.getAttribute("data-precedence"), f = i.get(g) || l, f === l && i.set(null, u), i.set(g, u), this.count++, l = xo.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Rr = {
    $$typeof: U,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function CE(e, t, i, l, u, f, g, x, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ba(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ba(0), this.hiddenUpdates = ba(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function hg(e, t, i, l, u, f, g, x, w, H, X, Q) {
    return e = new CE(
      e,
      t,
      i,
      g,
      w,
      H,
      X,
      Q,
      x
    ), t = 1, f === !0 && (t |= 24), f = Wt(3, null, null, t), e.current = f, f.stateNode = e, t = sc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: l,
      isDehydrated: i,
      cache: t
    }, fc(f), e;
  }
  function mg(e) {
    return e ? (e = Zi, e) : Zi;
  }
  function pg(e, t, i, l, u, f) {
    u = mg(u), l.context === null ? l.context = u : l.pendingContext = u, l = Ca(t), l.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (l.callback = f), i = Aa(e, l, t), i !== null && (Qt(i, e, t), nr(i, e, t));
  }
  function yg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < t ? i : t;
    }
  }
  function Df(e, t) {
    yg(e, t), (e = e.alternate) && yg(e, t);
  }
  function gg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ui(e, 67108864);
      t !== null && Qt(t, e, 67108864), Df(e, 67108864);
    }
  }
  function vg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ln();
      t = _(t);
      var i = ui(e, t);
      i !== null && Qt(i, e, t), Df(e, t);
    }
  }
  var Ro = !0;
  function AE(e, t, i, l) {
    var u = O.T;
    O.T = null;
    var f = ae.p;
    try {
      ae.p = 2, Nf(e, t, i, l);
    } finally {
      ae.p = f, O.T = u;
    }
  }
  function jE(e, t, i, l) {
    var u = O.T;
    O.T = null;
    var f = ae.p;
    try {
      ae.p = 8, Nf(e, t, i, l);
    } finally {
      ae.p = f, O.T = u;
    }
  }
  function Nf(e, t, i, l) {
    if (Ro) {
      var u = zf(l);
      if (u === null)
        gf(
          e,
          t,
          l,
          wo,
          i
        ), Sg(e, l);
      else if (NE(
        u,
        e,
        t,
        i,
        l
      ))
        l.stopPropagation();
      else if (Sg(e, l), t & 4 && -1 < DE.indexOf(e)) {
        for (; u !== null; ) {
          var f = lt(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = Rn(f.pendingLanes);
                  if (g !== 0) {
                    var x = f;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
                      var w = 1 << 31 - _t(g);
                      x.entanglements[1] |= w, g &= ~w;
                    }
                    Hn(f), (Pe & 6) === 0 && (ro = Bt() + 500, vr(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = ui(f, 2), x !== null && Qt(x, f, 2), oo(), Df(f, 2);
            }
          if (f = zf(l), f === null && gf(
            e,
            t,
            l,
            wo,
            i
          ), f === u) break;
          u = f;
        }
        u !== null && l.stopPropagation();
      } else
        gf(
          e,
          t,
          l,
          null,
          i
        );
    }
  }
  function zf(e) {
    return e = Ou(e), Of(e);
  }
  var wo = null;
  function Of(e) {
    if (wo = null, e = Fe(e), e !== null) {
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
  function bg(e) {
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
        switch ($n()) {
          case ya:
            return 2;
          case Hl:
            return 8;
          case ga:
          case Tn:
            return 32;
          case sn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var _f = !1, Ha = null, qa = null, ka = null, wr = /* @__PURE__ */ new Map(), Mr = /* @__PURE__ */ new Map(), Pa = [], DE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Sg(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ha = null;
        break;
      case "dragenter":
      case "dragleave":
        qa = null;
        break;
      case "mouseover":
      case "mouseout":
        ka = null;
        break;
      case "pointerover":
      case "pointerout":
        wr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mr.delete(t.pointerId);
    }
  }
  function Cr(e, t, i, l, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: l,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = lt(t), t !== null && gg(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function NE(e, t, i, l, u) {
    switch (t) {
      case "focusin":
        return Ha = Cr(
          Ha,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "dragenter":
        return qa = Cr(
          qa,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "mouseover":
        return ka = Cr(
          ka,
          e,
          t,
          i,
          l,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return wr.set(
          f,
          Cr(
            wr.get(f) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Mr.set(
          f,
          Cr(
            Mr.get(f) || null,
            e,
            t,
            i,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function xg(e) {
    var t = Fe(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, se(e.priority, function() {
              vg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, se(e.priority, function() {
              vg(i);
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
      var i = zf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var l = new i.constructor(
          i.type,
          i
        );
        zu = l, i.target.dispatchEvent(l), zu = null;
      } else
        return t = lt(i), t !== null && gg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Eg(e, t, i) {
    Mo(e) && i.delete(t);
  }
  function zE() {
    _f = !1, Ha !== null && Mo(Ha) && (Ha = null), qa !== null && Mo(qa) && (qa = null), ka !== null && Mo(ka) && (ka = null), wr.forEach(Eg), Mr.forEach(Eg);
  }
  function Co(e, t) {
    e.blockedOn === t && (e.blockedOn = null, _f || (_f = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      zE
    )));
  }
  var Ao = null;
  function Tg(e) {
    Ao !== e && (Ao = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ao === e && (Ao = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Of(l || i) === null)
              continue;
            break;
          }
          var f = lt(i);
          f !== null && (e.splice(t, 3), t -= 3, Nc(
            f,
            {
              pending: !0,
              data: u,
              method: i.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function Sl(e) {
    function t(w) {
      return Co(w, e);
    }
    Ha !== null && Co(Ha, e), qa !== null && Co(qa, e), ka !== null && Co(ka, e), wr.forEach(t), Mr.forEach(t);
    for (var i = 0; i < Pa.length; i++) {
      var l = Pa[i];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Pa.length && (i = Pa[0], i.blockedOn === null); )
      xg(i), i.blockedOn === null && Pa.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (l = 0; l < i.length; l += 3) {
        var u = i[l], f = i[l + 1], g = u[de] || null;
        if (typeof f == "function")
          g || Tg(i);
        else if (g) {
          var x = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[de] || null)
              x = g.formAction;
            else if (Of(u) !== null) continue;
          } else x = g.action;
          typeof x == "function" ? i[l + 1] = x : (i.splice(l, 3), l -= 3), Tg(i);
        }
      }
  }
  function Rg() {
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
      u !== null && (u(), u = null), l || setTimeout(i, 20);
    }
    function i() {
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
      var l = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(i, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Lf(e) {
    this._internalRoot = e;
  }
  jo.prototype.render = Lf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, l = ln();
    pg(i, l, e, t, null, null);
  }, jo.prototype.unmount = Lf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      pg(e.current, 2, null, e, null, null), oo(), t[ge] = null;
    }
  };
  function jo(e) {
    this._internalRoot = e;
  }
  jo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ie();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Pa.length && t !== 0 && t < Pa[i].priority; i++) ;
      Pa.splice(i, 0, e), i === 0 && xg(e);
    }
  };
  var wg = a.version;
  if (wg !== "19.2.5")
    throw Error(
      s(
        527,
        wg,
        "19.2.5"
      )
    );
  ae.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var OE = {
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
        Kn = Do.inject(
          OE
        ), Ht = Do;
      } catch {
      }
  }
  return jr.createRoot = function(e, t) {
    if (!o(e)) throw Error(s(299));
    var i = !1, l = "", u = zp, f = Op, g = _p;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = hg(
      e,
      1,
      !1,
      null,
      null,
      i,
      l,
      null,
      u,
      f,
      g,
      Rg
    ), e[ge] = t.current, yf(e), new Lf(t);
  }, jr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var l = !1, u = "", f = zp, g = Op, x = _p, w = null;
    return i != null && (i.unstable_strictMode === !0 && (l = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (g = i.onCaughtError), i.onRecoverableError !== void 0 && (x = i.onRecoverableError), i.formState !== void 0 && (w = i.formState)), t = hg(
      e,
      1,
      !0,
      t,
      i ?? null,
      l,
      u,
      w,
      f,
      g,
      x,
      Rg
    ), t.context = mg(null), i = t.current, l = ln(), l = _(l), u = Ca(l), u.callback = null, Aa(i, u, l), i = l, t.current.lanes = i, On(t, i), Hn(t), e[ge] = t.current, yf(e), new jo(t);
  }, jr.version = "19.2.5", jr;
}
var Lg;
function $E() {
  if (Lg) return Bf.exports;
  Lg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (a) {
        console.error(a);
      }
  }
  return n(), Bf.exports = XE(), Bf.exports;
}
var KE = $E();
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
var J0 = (n) => {
  throw TypeError(n);
}, QE = (n, a, r) => a.has(n) || J0("Cannot " + r), Pf = (n, a, r) => (QE(n, a, "read from private field"), r ? r.call(n) : a.get(n)), ZE = (n, a, r) => a.has(n) ? J0("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, r);
function Ug(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function IE(n = {}) {
  let { initialEntries: a = ["/"], initialIndex: r, v5Compat: s = !1 } = n, o;
  o = a.map(
    (E, R) => y(
      E,
      typeof E == "string" ? null : E.state,
      R === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let c = p(
    r ?? o.length - 1
  ), d = "POP", h = null;
  function p(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function m() {
    return o[c];
  }
  function y(E, R = null, C, D) {
    let z = bd(
      o ? m().pathname : "/",
      E,
      R,
      C,
      D
    );
    return ht(
      z.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), z;
  }
  function v(E) {
    return typeof E == "string" ? E : Gn(E);
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
    createHref: v,
    createURL(E) {
      return new URL(v(E), "http://localhost");
    },
    encodeLocation(E) {
      let R = typeof E == "string" ? zn(E) : E;
      return {
        pathname: R.pathname || "",
        search: R.search || "",
        hash: R.hash || ""
      };
    },
    push(E, R) {
      d = "PUSH";
      let C = Ug(E) ? E : y(E, R);
      c += 1, o.splice(c, o.length, C), s && h && h({ action: d, location: C, delta: 1 });
    },
    replace(E, R) {
      d = "REPLACE";
      let C = Ug(E) ? E : y(E, R);
      o[c] = C, s && h && h({ action: d, location: C, delta: 0 });
    },
    go(E) {
      d = "POP";
      let R = p(c + E), C = o[R];
      c = R, h && h({ action: d, location: C, delta: E });
    },
    listen(E) {
      return h = E, () => {
        h = null;
      };
    }
  };
}
function ze(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function ht(n, a) {
  if (!n) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function JE() {
  return Math.random().toString(36).substring(2, 10);
}
function bd(n, a, r = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? zn(a) : a,
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || JE(),
    unstable_mask: o
  };
}
function Gn({
  pathname: n = "/",
  search: a = "",
  hash: r = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), r && r !== "#" && (n += r.charAt(0) === "#" ? r : "#" + r), n;
}
function zn(n) {
  let a = {};
  if (n) {
    let r = n.indexOf("#");
    r >= 0 && (a.hash = n.substring(r), n = n.substring(0, r));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function WE(n, a = !1) {
  let r = "http://localhost";
  typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href), ze(r, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Gn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = r + s), new URL(s, r);
}
var Hr, Vg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (ZE(this, Hr, /* @__PURE__ */ new Map()), n)
      for (let [a, r] of n)
        this.set(a, r);
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
    if (Pf(this, Hr).has(n))
      return Pf(this, Hr).get(n);
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
    Pf(this, Hr).set(n, a);
  }
};
Hr = /* @__PURE__ */ new WeakMap();
var eT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function tT(n) {
  return eT.has(
    n
  );
}
var nT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function aT(n) {
  return nT.has(
    n
  );
}
function iT(n) {
  return n.index === !0;
}
function $r(n, a, r = [], s = {}, o = !1) {
  return n.map((c, d) => {
    let h = [...r, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (ze(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), ze(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), iT(c)) {
      let m = {
        ...c,
        id: p
      };
      return s[p] = Bg(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...c,
        id: p,
        children: void 0
      };
      return s[p] = Bg(
        m,
        a(m)
      ), c.children && (m.children = $r(
        c.children,
        a,
        h,
        s,
        o
      )), m;
    }
  });
}
function Bg(n, a) {
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
function $a(n, a, r = "/") {
  return qr(n, a, r, !1);
}
function qr(n, a, r, s) {
  let o = typeof a == "string" ? zn(a) : a, c = xn(o.pathname || "/", r);
  if (c == null)
    return null;
  let d = W0(n);
  rT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = gT(c);
    h = pT(
      d[p],
      m,
      s
    );
  }
  return h;
}
function lT(n, a) {
  let { route: r, pathname: s, params: o } = n;
  return {
    id: r.id,
    pathname: s,
    params: o,
    data: a[r.id],
    loaderData: a[r.id],
    handle: r.handle
  };
}
function W0(n, a = [], r = [], s = "", o = !1) {
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
      ze(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), y.relativePath = y.relativePath.slice(s.length);
    }
    let v = bn([s, y.relativePath]), S = r.concat(y);
    d.children && d.children.length > 0 && (ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), W0(
      d.children,
      a,
      S,
      v,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: v,
      score: hT(v, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of eb(d.path))
        c(d, h, !0, p);
  }), a;
}
function eb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [r, ...s] = a, o = r.endsWith("?"), c = r.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = eb(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function rT(n) {
  n.sort(
    (a, r) => a.score !== r.score ? r.score - a.score : mT(
      a.routesMeta.map((s) => s.childrenIndex),
      r.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var sT = /^:[\w-]+$/, oT = 3, uT = 2, cT = 1, fT = 10, dT = -2, Hg = (n) => n === "*";
function hT(n, a) {
  let r = n.split("/"), s = r.length;
  return r.some(Hg) && (s += dT), a && (s += uT), r.filter((o) => !Hg(o)).reduce(
    (o, c) => o + (sT.test(c) ? oT : c === "" ? cT : fT),
    s
  );
}
function mT(n, a) {
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
function pT(n, a, r = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", v = Wo(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), S = p.route;
    if (!v && m && r && !s[s.length - 1].route.index && (v = Wo(
      {
        path: p.relativePath,
        caseSensitive: p.caseSensitive,
        end: !1
      },
      y
    )), !v)
      return null;
    Object.assign(o, v.params), d.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: bn([c, v.pathname]),
      pathnameBase: ST(
        bn([c, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (c = bn([c, v.pathnameBase]));
  }
  return d;
}
function Wo(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [r, s] = yT(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(r);
  if (!o) return null;
  let c = o[0], d = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: y, isOptional: v }, S) => {
        if (y === "*") {
          let R = h[S] || "";
          d = c.slice(0, c.length - R.length).replace(/(.)\/+$/, "$1");
        }
        const E = h[S];
        return v && !E ? m[y] = void 0 : m[y] = (E || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: d,
    pattern: n
  };
}
function yT(n, a = !1, r = !0) {
  ht(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (d, h, p, m, y) => {
      if (s.push({ paramName: h, isOptional: p != null }), p) {
        let v = y.charAt(m + d.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function gT(n) {
  try {
    return n.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return ht(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), n;
  }
}
function xn(n, a) {
  if (a === "/") return n;
  if (!n.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(r);
  return s && s !== "/" ? null : n.slice(r) || "/";
}
function vT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : bn([n, a]);
}
var tb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Qd = (n) => tb.test(n);
function bT(n, a = "/") {
  let {
    pathname: r,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? zn(n) : n, c;
  return r ? (r = Id(r), r.startsWith("/") ? c = qg(r.substring(1), "/") : c = qg(r, a)) : c = a, {
    pathname: c,
    search: xT(s),
    hash: ET(o)
  };
}
function qg(n, a) {
  let r = eu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Yf(n, a, r, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function nb(n) {
  return n.filter(
    (a, r) => r === 0 || a.route.path && a.route.path.length > 0
  );
}
function Zd(n) {
  let a = nb(n);
  return a.map(
    (r, s) => s === a.length - 1 ? r.pathname : r.pathnameBase
  );
}
function mu(n, a, r, s = !1) {
  let o;
  typeof n == "string" ? o = zn(n) : (o = { ...n }, ze(
    !o.pathname || !o.pathname.includes("?"),
    Yf("?", "pathname", "search", o)
  ), ze(
    !o.pathname || !o.pathname.includes("#"),
    Yf("#", "pathname", "hash", o)
  ), ze(
    !o.search || !o.search.includes("#"),
    Yf("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", d = c ? "/" : o.pathname, h;
  if (d == null)
    h = r;
  else {
    let v = a.length - 1;
    if (!s && d.startsWith("..")) {
      let S = d.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    h = v >= 0 ? a[v] : "/";
  }
  let p = bT(o, h), m = d && d !== "/" && d.endsWith("/"), y = (c || d === ".") && r.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var Id = (n) => n.replace(/\/\/+/g, "/"), bn = (n) => Id(n.join("/")), eu = (n) => n.replace(/\/+$/, ""), ST = (n) => eu(n).replace(/^\/*/, "/"), xT = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, ET = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, TT = (n, a = 302) => {
  let r = a;
  typeof r == "number" ? r = { status: r } : typeof r.status > "u" && (r.status = 302);
  let s = new Headers(r.headers);
  return s.set("Location", n), new Response(null, { ...r, headers: s });
}, pu = class {
  constructor(n, a, r, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r;
  }
};
function Kr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function es(n) {
  let a = n.map((r) => r.route.path).filter(Boolean);
  return bn(a) || "/";
}
var ab = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ib(n, a) {
  let r = n;
  if (typeof r != "string" || !tb.test(r))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: r
    };
  let s = r, o = !1;
  if (ab)
    try {
      let c = new URL(window.location.href), d = r.startsWith("//") ? new URL(c.protocol + r) : new URL(r), h = xn(d.pathname, a);
      d.origin === c.origin && h != null ? r = h + d.search + d.hash : o = !0;
    } catch {
      ht(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: s,
    isExternal: o,
    to: r
  };
}
var Qa = Symbol("Uninstrumented");
function RT(n, a) {
  let r = {
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
        let d = Object.keys(r);
        for (let h of d)
          c[h] && r[h].push(c[h]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let o = Rl(r.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = r[`lazy.${c}`];
      if (typeof d == "function" && h.length > 0) {
        let p = Rl(h, d, () => {
        });
        p && (s.lazy = Object.assign(s.lazy || {}, {
          [c]: p
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let c = a[o];
    if (typeof c == "function" && r[o].length > 0) {
      let d = c[Qa] ?? c, h = Rl(
        r[o],
        d,
        (...p) => kg(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[Qa] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && r.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[Qa] ?? o, d = Rl(
      r.middleware,
      c,
      (...h) => kg(h[0])
    );
    return d ? (d[Qa] = c, d) : o;
  })), s;
}
function wT(n, a) {
  let r = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let c = Object.keys(o);
        for (let d of c)
          o[d] && r[d].push(o[d]);
      }
    })
  ), r.navigate.length > 0) {
    let s = n.navigate[Qa] ?? n.navigate, o = Rl(
      r.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Gn(d) : ".",
          ...Pg(n, h ?? {})
        };
      }
    );
    o && (o[Qa] = s, n.navigate = o);
  }
  if (r.fetch.length > 0) {
    let s = n.fetch[Qa] ?? n.fetch, o = Rl(r.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Pg(n, p ?? {})
      };
    });
    o && (o[Qa] = s, n.fetch = o);
  }
  return n;
}
function Rl(n, a, r) {
  return n.length === 0 ? null : async (...s) => {
    let o = await lb(
      n,
      r(...s),
      () => a(...s),
      n.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function lb(n, a, r, s) {
  let o = n[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = lb(n, a, r, s - 1), c = await d, ze(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
    try {
      await o(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    d || await h(), await d;
  } else
    try {
      c = { type: "success", value: await r() };
    } catch (d) {
      c = { type: "error", value: d };
    }
  return c || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function kg(n) {
  let { request: a, context: r, params: s, unstable_pattern: o } = n;
  return {
    request: MT(a),
    params: { ...s },
    unstable_pattern: o,
    context: CT(r)
  };
}
function Pg(n, a) {
  return {
    currentUrl: Gn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function MT(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function CT(n) {
  if (jT(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var AT = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function jT(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === AT;
}
var rb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], DT = new Set(
  rb
), NT = [
  "GET",
  ...rb
], zT = new Set(NT), sb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), OT = /* @__PURE__ */ new Set([307, 308]), Gf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, _T = {
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
}, LT = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), ob = "remix-router-transitions", ub = Symbol("ResetLoaderData");
function UT(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || LT, c = o;
  if (n.unstable_instrumentations) {
    let M = n.unstable_instrumentations;
    c = (_) => ({
      ...o(_),
      ...RT(
        M.map((q) => q.route).filter(Boolean),
        _
      )
    });
  }
  let d = {}, h = $r(
    n.routes,
    c,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = n.dataStrategy || kT, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, E = /* @__PURE__ */ new Set(), R = null, C = null, D = null, z = n.hydrationData != null, V = $a(h, n.history.location, m), U = !1, G = null, J, W;
  if (V == null && !n.patchRoutesOnNavigation) {
    let M = gn(404, {
      pathname: n.history.location.pathname
    }), { matches: _, route: q } = No(h);
    J = !0, W = !J, V = _, G = { [q.id]: M };
  } else if (V && !n.hydrationData && ba(
    V,
    h,
    n.history.location.pathname
  ).active && (V = null), V)
    if (V.some((M) => M.route.lazy))
      J = !1, W = !J;
    else if (!V.some((M) => Jd(M.route)))
      J = !0, W = !J;
    else {
      let M = n.hydrationData ? n.hydrationData.loaderData : null, _ = n.hydrationData ? n.hydrationData.errors : null, q = V;
      if (_) {
        let ie = V.findIndex(
          (se) => _[se.route.id] !== void 0
        );
        q = q.slice(0, ie + 1);
      }
      W = !1, J = !0, q.forEach((ie) => {
        let se = cb(ie.route, M, _);
        W = W || se.renderFallback, J = J && !se.shouldLoad;
      });
    }
  else {
    J = !1, W = !J, V = [];
    let M = ba(
      null,
      h,
      n.history.location.pathname
    );
    M.active && M.matches && (U = !0, V = M.matches);
  }
  let te, j = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: V,
    initialized: J,
    renderFallback: W,
    navigation: Gf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || G,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Z = "POP", ne = null, ue = !1, I, Y = !1, oe = /* @__PURE__ */ new Map(), ee = null, O = !1, ae = !1, $ = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), Se = 0, A = -1, F = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Set(), je = /* @__PURE__ */ new Map(), mt, Qe = null;
  function ti() {
    if (S = n.history.listen(
      ({ action: M, location: _, delta: q }) => {
        if (mt) {
          mt(), mt = void 0;
          return;
        }
        ht(
          je.size === 0 || q != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ie = ai({
          currentLocation: j.location,
          nextLocation: _,
          historyAction: M
        });
        if (ie && q != null) {
          let se = new Promise((pe) => {
            mt = pe;
          });
          n.history.go(q * -1), Qn(ie, {
            state: "blocked",
            location: _,
            proceed() {
              Qn(ie, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: _
              }), se.then(() => n.history.go(q));
            },
            reset() {
              let pe = new Map(j.blockers);
              pe.set(ie, Dr), Et({ blockers: pe });
            }
          }), ne?.resolve(), ne = null;
          return;
        }
        return Xn(M, _);
      }
    ), r) {
      lR(a, oe);
      let M = () => rR(a, oe);
      a.addEventListener("pagehide", M), ee = () => a.removeEventListener("pagehide", M);
    }
    return j.initialized || Xn("POP", j.location, {
      initialHydration: !0
    }), te;
  }
  function Li() {
    S && S(), ee && ee(), E.clear(), I && I.abort(), j.fetchers.forEach((M, _) => Kn(_)), j.blockers.forEach((M, _) => ni(_));
  }
  function Ll(M) {
    return E.add(M), () => E.delete(M);
  }
  function Et(M, _ = {}) {
    M.matches && (M.matches = M.matches.map((se) => {
      let pe = d[se.route.id], fe = se.route;
      return fe.element !== pe.element || fe.errorElement !== pe.errorElement || fe.hydrateFallbackElement !== pe.hydrateFallbackElement ? {
        ...se,
        route: pe
      } : se;
    })), j = {
      ...j,
      ...M
    };
    let q = [], ie = [];
    j.fetchers.forEach((se, pe) => {
      se.state === "idle" && (we.has(pe) ? q.push(pe) : ie.push(pe));
    }), we.forEach((se) => {
      !j.fetchers.has(se) && !le.has(se) && q.push(se);
    }), [...E].forEach(
      (se) => se(j, {
        deletedFetchers: q,
        newErrors: M.errors ?? null,
        viewTransitionOpts: _.viewTransitionOpts,
        flushSync: _.flushSync === !0
      })
    ), q.forEach((se) => Kn(se)), ie.forEach((se) => j.fetchers.delete(se));
  }
  function Yt(M, _, { flushSync: q } = {}) {
    let ie = j.actionData != null && j.navigation.formMethod != null && Vt(j.navigation.formMethod) && j.navigation.state === "loading" && M.state?._isRedirect !== !0, se;
    _.actionData ? Object.keys(_.actionData).length > 0 ? se = _.actionData : se = null : ie ? se = j.actionData : se = null;
    let pe = _.loaderData ? Wg(
      j.loaderData,
      _.loaderData,
      _.matches || [],
      _.errors
    ) : j.loaderData, fe = j.blockers;
    fe.size > 0 && (fe = new Map(fe), fe.forEach((Ee, be) => fe.set(be, Dr)));
    let de = O ? !1 : ql(M, _.matches || j.matches), ge = ue === !0 || j.navigation.formMethod != null && Vt(j.navigation.formMethod) && M.state?._isRedirect !== !0;
    p && (h = p, p = void 0), O || Z === "POP" || (Z === "PUSH" ? n.history.push(M, M.state) : Z === "REPLACE" && n.history.replace(M, M.state));
    let he;
    if (Z === "POP") {
      let Ee = oe.get(j.location.pathname);
      Ee && Ee.has(M.pathname) ? he = {
        currentLocation: j.location,
        nextLocation: M
      } : oe.has(M.pathname) && (he = {
        currentLocation: M,
        nextLocation: j.location
      });
    } else if (Y) {
      let Ee = oe.get(j.location.pathname);
      Ee ? Ee.add(M.pathname) : (Ee = /* @__PURE__ */ new Set([M.pathname]), oe.set(j.location.pathname, Ee)), he = {
        currentLocation: j.location,
        nextLocation: M
      };
    }
    Et(
      {
        ..._,
        // matches, errors, fetchers go through as-is
        actionData: se,
        loaderData: pe,
        historyAction: Z,
        location: M,
        initialized: !0,
        renderFallback: !1,
        navigation: Gf,
        revalidation: "idle",
        restoreScrollPosition: de,
        preventScrollReset: ge,
        blockers: fe
      },
      {
        viewTransitionOpts: he,
        flushSync: q === !0
      }
    ), Z = "POP", ue = !1, Y = !1, O = !1, ae = !1, ne?.resolve(), ne = null, Qe?.resolve(), Qe = null;
  }
  async function Ui(M, _) {
    if (ne?.resolve(), ne = null, typeof M == "number") {
      ne || (ne = av());
      let Ze = ne.promise;
      return n.history.go(M), Ze;
    }
    let q = Sd(
      j.location,
      j.matches,
      m,
      M,
      _?.fromRouteId,
      _?.relative
    ), { path: ie, submission: se, error: pe } = Yg(
      !1,
      q,
      _
    ), fe;
    _?.unstable_mask && (fe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof _.unstable_mask == "string" ? zn(_.unstable_mask) : {
        ...j.location.unstable_mask,
        ..._.unstable_mask
      }
    });
    let de = j.location, ge = bd(
      de,
      ie,
      _ && _.state,
      void 0,
      fe
    );
    ge = {
      ...ge,
      ...n.history.encodeLocation(ge)
    };
    let he = _ && _.replace != null ? _.replace : void 0, Ee = "PUSH";
    he === !0 ? Ee = "REPLACE" : he === !1 || se != null && Vt(se.formMethod) && se.formAction === j.location.pathname + j.location.search && (Ee = "REPLACE");
    let be = _ && "preventScrollReset" in _ ? _.preventScrollReset === !0 : void 0, He = (_ && _.flushSync) === !0, De = ai({
      currentLocation: de,
      nextLocation: ge,
      historyAction: Ee
    });
    if (De) {
      Qn(De, {
        state: "blocked",
        location: ge,
        proceed() {
          Qn(De, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ge
          }), Ui(M, _);
        },
        reset() {
          let Ze = new Map(j.blockers);
          Ze.set(De, Dr), Et({ blockers: Ze });
        }
      });
      return;
    }
    await Xn(Ee, ge, {
      submission: se,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: pe,
      preventScrollReset: be,
      replace: _ && _.replace,
      enableViewTransition: _ && _.viewTransition,
      flushSync: He,
      callSiteDefaultShouldRevalidate: _ && _.unstable_defaultShouldRevalidate
    });
  }
  function Ul() {
    Qe || (Qe = av()), ga(), Et({ revalidation: "loading" });
    let M = Qe.promise;
    return j.navigation.state === "submitting" ? M : j.navigation.state === "idle" ? (Xn(j.historyAction, j.location, {
      startUninterruptedRevalidation: !0
    }), M) : (Xn(
      Z || j.historyAction,
      j.navigation.location,
      {
        overrideNavigation: j.navigation,
        // Proxy through any rending view transition
        enableViewTransition: Y === !0
      }
    ), M);
  }
  async function Xn(M, _, q) {
    I && I.abort(), I = null, Z = M, O = (q && q.startUninterruptedRevalidation) === !0, Au(j.location, j.matches), ue = (q && q.preventScrollReset) === !0, Y = (q && q.enableViewTransition) === !0;
    let ie = p || h, se = q && q.overrideNavigation, pe = q?.initialHydration && j.matches && j.matches.length > 0 && !U ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      j.matches
    ) : $a(ie, _, m), fe = (q && q.flushSync) === !0;
    if (pe && j.initialized && !ae && QT(j.location, _) && !(q && q.submission && Vt(q.submission.formMethod))) {
      Yt(_, { matches: pe }, { flushSync: fe });
      return;
    }
    let de = ba(pe, ie, _.pathname);
    if (de.active && de.matches && (pe = de.matches), !pe) {
      let { error: Fe, notFoundMatches: lt, route: Oe } = Rn(
        _.pathname
      );
      Yt(
        _,
        {
          matches: lt,
          loaderData: {},
          errors: {
            [Oe.id]: Fe
          }
        },
        { flushSync: fe }
      );
      return;
    }
    I = new AbortController();
    let ge = El(
      n.history,
      _,
      I.signal,
      q && q.submission
    ), he = n.getContext ? await n.getContext() : new Vg(), Ee;
    if (q && q.pendingError)
      Ee = [
        Ka(pe).route.id,
        { type: "error", error: q.pendingError }
      ];
    else if (q && q.submission && Vt(q.submission.formMethod)) {
      let Fe = await ds(
        ge,
        _,
        q.submission,
        pe,
        he,
        de.active,
        q && q.initialHydration === !0,
        { replace: q.replace, flushSync: fe }
      );
      if (Fe.shortCircuited)
        return;
      if (Fe.pendingActionResult) {
        let [lt, Oe] = Fe.pendingActionResult;
        if (rn(Oe) && Kr(Oe.error) && Oe.error.status === 404) {
          I = null, Yt(_, {
            matches: Fe.matches,
            loaderData: {},
            errors: {
              [lt]: Oe.error
            }
          });
          return;
        }
      }
      pe = Fe.matches || pe, Ee = Fe.pendingActionResult, se = Ff(_, q.submission), fe = !1, de.active = !1, ge = El(
        n.history,
        ge.url,
        ge.signal
      );
    }
    let {
      shortCircuited: be,
      matches: He,
      loaderData: De,
      errors: Ze
    } = await Vl(
      ge,
      _,
      pe,
      he,
      de.active,
      se,
      q && q.submission,
      q && q.fetcherSubmission,
      q && q.replace,
      q && q.initialHydration === !0,
      fe,
      Ee,
      q && q.callSiteDefaultShouldRevalidate
    );
    be || (I = null, Yt(_, {
      matches: He || pe,
      ...ev(Ee),
      loaderData: De,
      errors: Ze
    }));
  }
  async function ds(M, _, q, ie, se, pe, fe, de = {}) {
    ga();
    let ge = aR(_, q);
    if (Et({ navigation: ge }, { flushSync: de.flushSync === !0 }), pe) {
      let be = await On(
        ie,
        _.pathname,
        M.signal
      );
      if (be.type === "aborted")
        return { shortCircuited: !0 };
      if (be.type === "error") {
        if (be.partialMatches.length === 0) {
          let { matches: De, route: Ze } = No(h);
          return {
            matches: De,
            pendingActionResult: [
              Ze.id,
              {
                type: "error",
                error: be.error
              }
            ]
          };
        }
        let He = Ka(be.partialMatches).route.id;
        return {
          matches: be.partialMatches,
          pendingActionResult: [
            He,
            {
              type: "error",
              error: be.error
            }
          ]
        };
      } else if (be.matches)
        ie = be.matches;
      else {
        let { notFoundMatches: He, error: De, route: Ze } = Rn(
          _.pathname
        );
        return {
          matches: He,
          pendingActionResult: [
            Ze.id,
            {
              type: "error",
              error: De
            }
          ]
        };
      }
    }
    let he, Ee = ko(ie, _);
    if (!Ee.route.action && !Ee.route.lazy)
      he = {
        type: "error",
        error: gn(405, {
          method: M.method,
          pathname: _.pathname,
          routeId: Ee.route.id
        })
      };
    else {
      let be = jl(
        c,
        d,
        M,
        _,
        ie,
        Ee,
        fe ? [] : s,
        se
      ), He = await ya(
        M,
        _,
        be,
        se,
        null
      );
      if (he = He[Ee.route.id], !he) {
        for (let De of ie)
          if (He[De.route.id]) {
            he = He[De.route.id];
            break;
          }
      }
      if (M.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Mi(he)) {
      let be;
      return de && de.replace != null ? be = de.replace : be = Zg(
        he.response.headers.get("Location"),
        new URL(M.url),
        m,
        n.history
      ) === j.location.pathname + j.location.search, await $n(M, he, !0, {
        submission: q,
        replace: be
      }), { shortCircuited: !0 };
    }
    if (rn(he)) {
      let be = Ka(ie, Ee.route.id);
      return (de && de.replace) !== !0 && (Z = "PUSH"), {
        matches: ie,
        pendingActionResult: [
          be.route.id,
          he,
          Ee.route.id
        ]
      };
    }
    return {
      matches: ie,
      pendingActionResult: [Ee.route.id, he]
    };
  }
  async function Vl(M, _, q, ie, se, pe, fe, de, ge, he, Ee, be, He) {
    let De = pe || Ff(_, fe), Ze = fe || de || nv(De), Fe = !O && !he;
    if (se) {
      if (Fe) {
        let ct = Vi(be);
        Et(
          {
            navigation: De,
            ...ct !== void 0 ? { actionData: ct } : {}
          },
          {
            flushSync: Ee
          }
        );
      }
      let Ne = await On(
        q,
        _.pathname,
        M.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: Lt, route: yt } = No(h);
          return {
            matches: Lt,
            loaderData: {},
            errors: {
              [yt.id]: Ne.error
            }
          };
        }
        let ct = Ka(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          loaderData: {},
          errors: {
            [ct]: Ne.error
          }
        };
      } else if (Ne.matches)
        q = Ne.matches;
      else {
        let { error: ct, notFoundMatches: Lt, route: yt } = Rn(
          _.pathname
        );
        return {
          matches: Lt,
          loaderData: {},
          errors: {
            [yt.id]: ct
          }
        };
      }
    }
    let lt = p || h, { dsMatches: Oe, revalidatingFetchers: pt } = Gg(
      M,
      ie,
      c,
      d,
      n.history,
      j,
      q,
      Ze,
      _,
      he ? [] : s,
      he === !0,
      ae,
      $,
      we,
      ce,
      re,
      lt,
      m,
      n.patchRoutesOnNavigation != null,
      be,
      He
    );
    if (A = ++Se, !n.dataStrategy && !Oe.some((Ne) => Ne.shouldLoad) && !Oe.some(
      (Ne) => Ne.route.middleware && Ne.route.middleware.length > 0
    ) && pt.length === 0) {
      let Ne = ms();
      return Yt(
        _,
        {
          matches: q,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: be && rn(be[1]) ? { [be[0]]: be[1].error } : null,
          ...ev(be),
          ...Ne ? { fetchers: new Map(j.fetchers) } : {}
        },
        { flushSync: Ee }
      ), { shortCircuited: !0 };
    }
    if (Fe) {
      let Ne = {};
      if (!se) {
        Ne.navigation = De;
        let ct = Vi(be);
        ct !== void 0 && (Ne.actionData = ct);
      }
      pt.length > 0 && (Ne.fetchers = Bl(pt)), Et(Ne, { flushSync: Ee });
    }
    pt.forEach((Ne) => {
      wt(Ne.key), Ne.controller && le.set(Ne.key, Ne.controller);
    });
    let We = () => pt.forEach((Ne) => wt(Ne.key));
    I && I.signal.addEventListener(
      "abort",
      We
    );
    let { loaderResults: Sa, fetcherResults: wn } = await Hl(
      Oe,
      pt,
      M,
      _,
      ie
    );
    if (M.signal.aborted)
      return { shortCircuited: !0 };
    I && I.signal.removeEventListener(
      "abort",
      We
    ), pt.forEach((Ne) => le.delete(Ne.key));
    let Mt = zo(Sa);
    if (Mt)
      return await $n(M, Mt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    if (Mt = zo(wn), Mt)
      return re.add(Mt.key), await $n(M, Mt.result, !0, {
        replace: ge
      }), { shortCircuited: !0 };
    let { loaderData: _n, errors: ii } = Jg(
      j,
      q,
      Sa,
      be,
      pt,
      wn
    );
    he && j.errors && (ii = { ...j.errors, ...ii });
    let Ln = ms(), li = ps(A), Hi = Ln || li || pt.length > 0;
    return {
      matches: q,
      loaderData: _n,
      errors: ii,
      ...Hi ? { fetchers: new Map(j.fetchers) } : {}
    };
  }
  function Vi(M) {
    if (M && !rn(M[1]))
      return {
        [M[0]]: M[1].data
      };
    if (j.actionData)
      return Object.keys(j.actionData).length === 0 ? null : j.actionData;
  }
  function Bl(M) {
    return M.forEach((_) => {
      let q = j.fetchers.get(_.key), ie = Nr(
        void 0,
        q ? q.data : void 0
      );
      j.fetchers.set(_.key, ie);
    }), new Map(j.fetchers);
  }
  async function Ru(M, _, q, ie) {
    wt(M);
    let se = (ie && ie.flushSync) === !0, pe = p || h, fe = Sd(
      j.location,
      j.matches,
      m,
      q,
      _,
      ie?.relative
    ), de = $a(pe, fe, m), ge = ba(de, pe, fe);
    if (ge.active && ge.matches && (de = ge.matches), !de) {
      sn(
        M,
        _,
        gn(404, { pathname: fe }),
        { flushSync: se }
      );
      return;
    }
    let { path: he, submission: Ee, error: be } = Yg(
      !0,
      fe,
      ie
    );
    if (be) {
      sn(M, _, be, { flushSync: se });
      return;
    }
    let He = n.getContext ? await n.getContext() : new Vg(), De = (ie && ie.preventScrollReset) === !0;
    if (Ee && Vt(Ee.formMethod)) {
      await wu(
        M,
        _,
        he,
        de,
        He,
        ge.active,
        se,
        De,
        Ee,
        ie && ie.unstable_defaultShouldRevalidate
      );
      return;
    }
    ce.set(M, { routeId: _, path: he }), await Bt(
      M,
      _,
      he,
      de,
      He,
      ge.active,
      se,
      De,
      Ee
    );
  }
  async function wu(M, _, q, ie, se, pe, fe, de, ge, he) {
    ga(), ce.delete(M);
    let Ee = j.fetchers.get(M);
    Tn(M, iR(ge, Ee), {
      flushSync: fe
    });
    let be = new AbortController(), He = El(
      n.history,
      q,
      be.signal,
      ge
    );
    if (pe) {
      let et = await On(
        ie,
        new URL(He.url).pathname,
        He.signal,
        M
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        sn(M, _, et.error, { flushSync: fe });
        return;
      } else if (et.matches)
        ie = et.matches;
      else {
        sn(
          M,
          _,
          gn(404, { pathname: q }),
          { flushSync: fe }
        );
        return;
      }
    }
    let De = ko(ie, q);
    if (!De.route.action && !De.route.lazy) {
      let et = gn(405, {
        method: ge.formMethod,
        pathname: q,
        routeId: _
      });
      sn(M, _, et, { flushSync: fe });
      return;
    }
    le.set(M, be);
    let Ze = Se, Fe = jl(
      c,
      d,
      He,
      q,
      ie,
      De,
      s,
      se
    ), lt = await ya(
      He,
      q,
      Fe,
      se,
      M
    ), Oe = lt[De.route.id];
    if (!Oe) {
      for (let et of Fe)
        if (lt[et.route.id]) {
          Oe = lt[et.route.id];
          break;
        }
    }
    if (He.signal.aborted) {
      le.get(M) === be && le.delete(M);
      return;
    }
    if (we.has(M)) {
      if (Mi(Oe) || rn(Oe)) {
        Tn(M, ha(void 0));
        return;
      }
    } else {
      if (Mi(Oe))
        if (le.delete(M), A > Ze) {
          Tn(M, ha(void 0));
          return;
        } else
          return re.add(M), Tn(M, Nr(ge)), $n(He, Oe, !1, {
            fetcherSubmission: ge,
            preventScrollReset: de
          });
      if (rn(Oe)) {
        sn(M, _, Oe.error);
        return;
      }
    }
    let pt = j.navigation.location || j.location, We = El(
      n.history,
      pt,
      be.signal
    ), Sa = p || h, wn = j.navigation.state !== "idle" ? $a(Sa, j.navigation.location, m) : j.matches;
    ze(wn, "Didn't find any matches after fetcher action");
    let Mt = ++Se;
    F.set(M, Mt);
    let _n = Nr(ge, Oe.data);
    j.fetchers.set(M, _n);
    let { dsMatches: ii, revalidatingFetchers: Ln } = Gg(
      We,
      se,
      c,
      d,
      n.history,
      j,
      wn,
      ge,
      pt,
      s,
      !1,
      ae,
      $,
      we,
      ce,
      re,
      Sa,
      m,
      n.patchRoutesOnNavigation != null,
      [De.route.id, Oe],
      he
    );
    Ln.filter((et) => et.key !== M).forEach((et) => {
      let qi = et.key, ki = j.fetchers.get(qi), bs = Nr(
        void 0,
        ki ? ki.data : void 0
      );
      j.fetchers.set(qi, bs), wt(qi), et.controller && le.set(qi, et.controller);
    }), Et({ fetchers: new Map(j.fetchers) });
    let li = () => Ln.forEach((et) => wt(et.key));
    be.signal.addEventListener(
      "abort",
      li
    );
    let { loaderResults: Hi, fetcherResults: Ne } = await Hl(
      ii,
      Ln,
      We,
      pt,
      se
    );
    if (be.signal.aborted)
      return;
    if (be.signal.removeEventListener(
      "abort",
      li
    ), F.delete(M), le.delete(M), Ln.forEach((et) => le.delete(et.key)), j.fetchers.has(M)) {
      let et = ha(Oe.data);
      j.fetchers.set(M, et);
    }
    let ct = zo(Hi);
    if (ct)
      return $n(
        We,
        ct.result,
        !1,
        { preventScrollReset: de }
      );
    if (ct = zo(Ne), ct)
      return re.add(ct.key), $n(
        We,
        ct.result,
        !1,
        { preventScrollReset: de }
      );
    let { loaderData: Lt, errors: yt } = Jg(
      j,
      wn,
      Hi,
      void 0,
      Ln,
      Ne
    );
    ps(Mt), j.navigation.state === "loading" && Mt > A ? (ze(Z, "Expected pending action"), I && I.abort(), Yt(j.navigation.location, {
      matches: wn,
      loaderData: Lt,
      errors: yt,
      fetchers: new Map(j.fetchers)
    })) : (Et({
      errors: yt,
      loaderData: Wg(
        j.loaderData,
        Lt,
        wn,
        yt
      ),
      fetchers: new Map(j.fetchers)
    }), ae = !1);
  }
  async function Bt(M, _, q, ie, se, pe, fe, de, ge) {
    let he = j.fetchers.get(M);
    Tn(
      M,
      Nr(
        ge,
        he ? he.data : void 0
      ),
      { flushSync: fe }
    );
    let Ee = new AbortController(), be = El(
      n.history,
      q,
      Ee.signal
    );
    if (pe) {
      let Oe = await On(
        ie,
        new URL(be.url).pathname,
        be.signal,
        M
      );
      if (Oe.type === "aborted")
        return;
      if (Oe.type === "error") {
        sn(M, _, Oe.error, { flushSync: fe });
        return;
      } else if (Oe.matches)
        ie = Oe.matches;
      else {
        sn(
          M,
          _,
          gn(404, { pathname: q }),
          { flushSync: fe }
        );
        return;
      }
    }
    let He = ko(ie, q);
    le.set(M, Ee);
    let De = Se, Ze = jl(
      c,
      d,
      be,
      q,
      ie,
      He,
      s,
      se
    ), Fe = await ya(
      be,
      q,
      Ze,
      se,
      M
    ), lt = Fe[He.route.id];
    if (!lt) {
      for (let Oe of ie)
        if (Fe[Oe.route.id]) {
          lt = Fe[Oe.route.id];
          break;
        }
    }
    if (le.get(M) === Ee && le.delete(M), !be.signal.aborted) {
      if (we.has(M)) {
        Tn(M, ha(void 0));
        return;
      }
      if (Mi(lt))
        if (A > De) {
          Tn(M, ha(void 0));
          return;
        } else {
          re.add(M), await $n(be, lt, !1, {
            preventScrollReset: de
          });
          return;
        }
      if (rn(lt)) {
        sn(M, _, lt.error);
        return;
      }
      Tn(M, ha(lt.data));
    }
  }
  async function $n(M, _, q, {
    submission: ie,
    fetcherSubmission: se,
    preventScrollReset: pe,
    replace: fe
  } = {}) {
    q || (ne?.resolve(), ne = null), _.response.headers.has("X-Remix-Revalidate") && (ae = !0);
    let de = _.response.headers.get("Location");
    ze(de, "Expected a Location header on the redirect Response"), de = Zg(
      de,
      new URL(M.url),
      m,
      n.history
    );
    let ge = bd(j.location, de, {
      _isRedirect: !0
    });
    if (r) {
      let Ze = !1;
      if (_.response.headers.has("X-Remix-Reload-Document"))
        Ze = !0;
      else if (Qd(de)) {
        const Fe = WE(de, !0);
        Ze = // Hard reload if it's an absolute URL to a new origin
        Fe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        xn(Fe.pathname, m) == null;
      }
      if (Ze) {
        fe ? a.location.replace(de) : a.location.assign(de);
        return;
      }
    }
    I = null;
    let he = fe === !0 || _.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ee, formAction: be, formEncType: He } = j.navigation;
    !ie && !se && Ee && be && He && (ie = nv(j.navigation));
    let De = ie || se;
    if (OT.has(_.response.status) && De && Vt(De.formMethod))
      await Xn(he, ge, {
        submission: {
          ...De,
          formAction: de
        },
        // Preserve these flags across redirects
        preventScrollReset: pe || ue,
        enableViewTransition: q ? Y : void 0
      });
    else {
      let Ze = Ff(
        ge,
        ie
      );
      await Xn(he, ge, {
        overrideNavigation: Ze,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: se,
        // Preserve these flags across redirects
        preventScrollReset: pe || ue,
        enableViewTransition: q ? Y : void 0
      });
    }
  }
  async function ya(M, _, q, ie, se) {
    let pe, fe = {};
    try {
      pe = await YT(
        y,
        M,
        _,
        q,
        se,
        ie,
        !1
      );
    } catch (de) {
      return q.filter((ge) => ge.shouldLoad).forEach((ge) => {
        fe[ge.route.id] = {
          type: "error",
          error: de
        };
      }), fe;
    }
    if (M.signal.aborted)
      return fe;
    if (!Vt(M.method))
      for (let de of q) {
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
      if (WT(ge)) {
        let he = ge.result;
        fe[de] = {
          type: "redirect",
          response: $T(
            he,
            M,
            de,
            q,
            m
          )
        };
      } else
        fe[de] = await XT(ge);
    return fe;
  }
  async function Hl(M, _, q, ie, se) {
    let pe = ya(
      q,
      ie,
      M,
      se,
      null
    ), fe = Promise.all(
      _.map(async (he) => {
        if (he.matches && he.match && he.request && he.controller) {
          let be = (await ya(
            he.request,
            he.path,
            he.matches,
            se,
            he.key
          ))[he.match.route.id];
          return { [he.key]: be };
        } else
          return Promise.resolve({
            [he.key]: {
              type: "error",
              error: gn(404, {
                pathname: he.path
              })
            }
          });
      })
    ), de = await pe, ge = (await fe).reduce(
      (he, Ee) => Object.assign(he, Ee),
      {}
    );
    return {
      loaderResults: de,
      fetcherResults: ge
    };
  }
  function ga() {
    ae = !0, ce.forEach((M, _) => {
      le.has(_) && $.add(_), wt(_);
    });
  }
  function Tn(M, _, q = {}) {
    j.fetchers.set(M, _), Et(
      { fetchers: new Map(j.fetchers) },
      { flushSync: (q && q.flushSync) === !0 }
    );
  }
  function sn(M, _, q, ie = {}) {
    let se = Ka(j.matches, _);
    Kn(M), Et(
      {
        errors: {
          [se.route.id]: q
        },
        fetchers: new Map(j.fetchers)
      },
      { flushSync: (ie && ie.flushSync) === !0 }
    );
  }
  function hs(M) {
    return Te.set(M, (Te.get(M) || 0) + 1), we.has(M) && we.delete(M), j.fetchers.get(M) || _T;
  }
  function Mu(M, _) {
    wt(M, _?.reason), Tn(M, ha(null));
  }
  function Kn(M) {
    let _ = j.fetchers.get(M);
    le.has(M) && !(_ && _.state === "loading" && F.has(M)) && wt(M), ce.delete(M), F.delete(M), re.delete(M), we.delete(M), $.delete(M), j.fetchers.delete(M);
  }
  function Ht(M) {
    let _ = (Te.get(M) || 0) - 1;
    _ <= 0 ? (Te.delete(M), we.add(M)) : Te.set(M, _), Et({ fetchers: new Map(j.fetchers) });
  }
  function wt(M, _) {
    let q = le.get(M);
    q && (q.abort(_), le.delete(M));
  }
  function _t(M) {
    for (let _ of M) {
      let q = hs(_), ie = ha(q.data);
      j.fetchers.set(_, ie);
    }
  }
  function ms() {
    let M = [], _ = !1;
    for (let q of re) {
      let ie = j.fetchers.get(q);
      ze(ie, `Expected fetcher: ${q}`), ie.state === "loading" && (re.delete(q), M.push(q), _ = !0);
    }
    return _t(M), _;
  }
  function ps(M) {
    let _ = [];
    for (let [q, ie] of F)
      if (ie < M) {
        let se = j.fetchers.get(q);
        ze(se, `Expected fetcher: ${q}`), se.state === "loading" && (wt(q), F.delete(q), _.push(q));
      }
    return _t(_), _.length > 0;
  }
  function Cu(M, _) {
    let q = j.blockers.get(M) || Dr;
    return je.get(M) !== _ && je.set(M, _), q;
  }
  function ni(M) {
    j.blockers.delete(M), je.delete(M);
  }
  function Qn(M, _) {
    let q = j.blockers.get(M) || Dr;
    ze(
      q.state === "unblocked" && _.state === "blocked" || q.state === "blocked" && _.state === "blocked" || q.state === "blocked" && _.state === "proceeding" || q.state === "blocked" && _.state === "unblocked" || q.state === "proceeding" && _.state === "unblocked",
      `Invalid blocker state transition: ${q.state} -> ${_.state}`
    );
    let ie = new Map(j.blockers);
    ie.set(M, _), Et({ blockers: ie });
  }
  function ai({
    currentLocation: M,
    nextLocation: _,
    historyAction: q
  }) {
    if (je.size === 0)
      return;
    je.size > 1 && ht(!1, "A router only supports one blocker at a time");
    let ie = Array.from(je.entries()), [se, pe] = ie[ie.length - 1], fe = j.blockers.get(se);
    if (!(fe && fe.state === "proceeding") && pe({ currentLocation: M, nextLocation: _, historyAction: q }))
      return se;
  }
  function Rn(M) {
    let _ = gn(404, { pathname: M }), q = p || h, { matches: ie, route: se } = No(q);
    return { notFoundMatches: ie, route: se, error: _ };
  }
  function Bi(M, _, q) {
    if (R = M, D = _, C = q || null, !z && j.navigation === Gf) {
      z = !0;
      let ie = ql(j.location, j.matches);
      ie != null && Et({ restoreScrollPosition: ie });
    }
    return () => {
      R = null, D = null, C = null;
    };
  }
  function va(M, _) {
    return C && C(
      M,
      _.map((ie) => lT(ie, j.loaderData))
    ) || M.key;
  }
  function Au(M, _) {
    if (R && D) {
      let q = va(M, _);
      R[q] = D();
    }
  }
  function ql(M, _) {
    if (R) {
      let q = va(M, _), ie = R[q];
      if (typeof ie == "number")
        return ie;
    }
    return null;
  }
  function ba(M, _, q) {
    if (n.patchRoutesOnNavigation)
      if (M) {
        if (Object.keys(M[0].params).length > 0)
          return { active: !0, matches: qr(
            _,
            q,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: qr(
          _,
          q,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function On(M, _, q, ie) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: M };
    let se = M;
    for (; ; ) {
      let pe = p == null, fe = p || h, de = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: q,
          path: _,
          matches: se,
          fetcherKey: ie,
          patch: (Ee, be) => {
            q.aborted || Fg(
              Ee,
              be,
              fe,
              de,
              c,
              !1
            );
          }
        });
      } catch (Ee) {
        return { type: "error", error: Ee, partialMatches: se };
      } finally {
        pe && !q.aborted && (h = [...h]);
      }
      if (q.aborted)
        return { type: "aborted" };
      let ge = $a(fe, _, m), he = null;
      if (ge) {
        if (Object.keys(ge[0].params).length === 0)
          return { type: "success", matches: ge };
        if (he = qr(
          fe,
          _,
          m,
          !0
        ), !(he && se.length < he.length && ys(
          se,
          he.slice(0, se.length)
        )))
          return { type: "success", matches: ge };
      }
      if (he || (he = qr(
        fe,
        _,
        m,
        !0
      )), !he || ys(se, he))
        return { type: "success", matches: null };
      se = he;
    }
  }
  function ys(M, _) {
    return M.length === _.length && M.every((q, ie) => q.route.id === _[ie].route.id);
  }
  function gs(M) {
    d = {}, p = $r(
      M,
      c,
      void 0,
      d
    );
  }
  function vs(M, _, q = !1) {
    let ie = p == null;
    Fg(
      M,
      _,
      p || h,
      d,
      c,
      q
    ), ie && (h = [...h], Et({}));
  }
  return te = {
    get basename() {
      return m;
    },
    get future() {
      return v;
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
    initialize: ti,
    subscribe: Ll,
    enableScrollRestoration: Bi,
    navigate: Ui,
    fetch: Ru,
    revalidate: Ul,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (M) => n.history.createHref(M),
    encodeLocation: (M) => n.history.encodeLocation(M),
    getFetcher: hs,
    resetFetcher: Mu,
    deleteFetcher: Ht,
    dispose: Li,
    getBlocker: Cu,
    deleteBlocker: ni,
    patchRoutes: vs,
    _internalFetchControllers: le,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: gs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(M) {
      Et(M);
    }
  }, n.unstable_instrumentations && (te = wT(
    te,
    n.unstable_instrumentations.map((M) => M.router).filter(Boolean)
  )), te;
}
function VT(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Sd(n, a, r, s, o, c) {
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
  let p = mu(
    s || ".",
    Zd(d),
    xn(n.pathname, r) || n.pathname,
    c === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = eh(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), v = y.getAll("index");
      y.delete("index"), v.filter((E) => E).forEach((E) => y.append("index", E));
      let S = y.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return r !== "/" && (p.pathname = vT({ basename: r, pathname: p.pathname })), Gn(p);
}
function Yg(n, a, r) {
  if (!r || !VT(r))
    return { path: a };
  if (r.formMethod && !nR(r.formMethod))
    return {
      path: a,
      error: gn(405, { method: r.formMethod })
    };
  let s = () => ({
    path: a,
    error: gn(400, { type: "invalid-body" })
  }), c = (r.formMethod || "get").toUpperCase(), d = gb(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Vt(c))
        return s();
      let v = typeof r.body == "string" ? r.body : r.body instanceof FormData || r.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(r.body.entries()).reduce(
          (S, [E, R]) => `${S}${E}=${R}
`,
          ""
        )
      ) : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: c,
          formAction: d,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!Vt(c))
        return s();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: d,
            formEncType: r.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (r.formData)
    h = Ed(r.formData), p = r.formData;
  else if (r.body instanceof FormData)
    h = Ed(r.body), p = r.body;
  else if (r.body instanceof URLSearchParams)
    h = r.body, p = Ig(h);
  else if (r.body == null)
    h = new URLSearchParams(), p = new FormData();
  else
    try {
      h = new URLSearchParams(r.body), p = Ig(h);
    } catch {
      return s();
    }
  let m = {
    formMethod: c,
    formAction: d,
    formEncType: r && r.formEncType || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (Vt(m.formMethod))
    return { path: a, submission: m };
  let y = zn(a);
  return n && y.search && eh(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Gn(y), submission: m };
}
function Gg(n, a, r, s, o, c, d, h, p, m, y, v, S, E, R, C, D, z, V, U, G) {
  let J = U ? rn(U[1]) ? U[1].error : U[1].data : void 0, W = o.createURL(c.location), te = o.createURL(p), j;
  if (y && c.errors) {
    let ee = Object.keys(c.errors)[0];
    j = d.findIndex((O) => O.route.id === ee);
  } else if (U && rn(U[1])) {
    let ee = U[0];
    j = d.findIndex((O) => O.route.id === ee) - 1;
  }
  let Z = U ? U[1].statusCode : void 0, ne = Z && Z >= 400, ue = {
    currentUrl: W,
    currentParams: c.matches[0]?.params || {},
    nextUrl: te,
    nextParams: d[0].params,
    ...h,
    actionResult: J,
    actionStatus: Z
  }, I = es(d), Y = d.map((ee, O) => {
    let { route: ae } = ee, $ = null;
    if (j != null && O > j)
      $ = !1;
    else if (ae.lazy)
      $ = !0;
    else if (!Jd(ae))
      $ = !1;
    else if (y) {
      let { shouldLoad: F } = cb(
        ae,
        c.loaderData,
        c.errors
      );
      $ = F;
    } else BT(c.loaderData, c.matches[O], ee) && ($ = !0);
    if ($ !== null)
      return xd(
        r,
        s,
        n,
        p,
        I,
        ee,
        m,
        a,
        $
      );
    let le = !1;
    typeof G == "boolean" ? le = G : ne ? le = !1 : (v || W.pathname + W.search === te.pathname + te.search || W.search !== te.search || HT(c.matches[O], ee)) && (le = !0);
    let Se = {
      ...ue,
      defaultShouldRevalidate: le
    }, A = Pr(ee, Se);
    return xd(
      r,
      s,
      n,
      p,
      I,
      ee,
      m,
      a,
      A,
      Se,
      G
    );
  }), oe = [];
  return R.forEach((ee, O) => {
    if (y || !d.some((ce) => ce.route.id === ee.routeId) || E.has(O))
      return;
    let ae = c.fetchers.get(O), $ = ae && ae.state !== "idle" && ae.data === void 0, le = $a(D, ee.path, z);
    if (!le) {
      if (V && $)
        return;
      oe.push({
        key: O,
        routeId: ee.routeId,
        path: ee.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (C.has(O))
      return;
    let Se = ko(le, ee.path), A = new AbortController(), F = El(
      o,
      ee.path,
      A.signal
    ), re = null;
    if (S.has(O))
      S.delete(O), re = jl(
        r,
        s,
        F,
        ee.path,
        le,
        Se,
        m,
        a
      );
    else if ($)
      v && (re = jl(
        r,
        s,
        F,
        ee.path,
        le,
        Se,
        m,
        a
      ));
    else {
      let ce;
      typeof G == "boolean" ? ce = G : ne ? ce = !1 : ce = v;
      let Te = {
        ...ue,
        defaultShouldRevalidate: ce
      };
      Pr(Se, Te) && (re = jl(
        r,
        s,
        F,
        ee.path,
        le,
        Se,
        m,
        a,
        Te
      ));
    }
    re && oe.push({
      key: O,
      routeId: ee.routeId,
      path: ee.path,
      matches: re,
      match: Se,
      request: F,
      controller: A
    });
  }), { dsMatches: Y, revalidatingFetchers: oe };
}
function Jd(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function cb(n, a, r) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Jd(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && n.id in a, o = r != null && r[n.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let c = !s && !o;
  return { shouldLoad: c, renderFallback: c };
}
function BT(n, a, r) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    r.route.id !== a.route.id
  ), o = !n.hasOwnProperty(r.route.id);
  return s || o;
}
function HT(n, a) {
  let r = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r != null && r.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Pr(n, a) {
  if (n.route.shouldRevalidate) {
    let r = n.route.shouldRevalidate(a);
    if (typeof r == "boolean")
      return r;
  }
  return a.defaultShouldRevalidate;
}
function Fg(n, a, r, s, o, c) {
  let d;
  if (n) {
    let m = s[n];
    ze(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = r;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = d.find(
      (v) => fb(m, v)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = $r(
      h,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: v } = p[m], S = y, [E] = $r(
        [v],
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
function fb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (r, s) => a.children?.some((o) => fb(r, o))
  ) ?? !1 : !1;
}
var Xg = /* @__PURE__ */ new WeakMap(), db = ({
  key: n,
  route: a,
  manifest: r,
  mapRouteProperties: s
}) => {
  let o = r[a.id];
  if (ze(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let c = o.lazy[n];
  if (!c)
    return;
  let d = Xg.get(o);
  d || (d = {}, Xg.set(o, d));
  let h = d[n];
  if (h)
    return h;
  let p = (async () => {
    let m = tT(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
    if (m)
      ht(
        !m,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), d[n] = Promise.resolve();
    else if (v)
      ht(
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
}, $g = /* @__PURE__ */ new WeakMap();
function qT(n, a, r, s, o) {
  let c = r[n.id];
  if (ze(c, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let y = $g.get(c);
    if (y)
      return {
        lazyRoutePromise: y,
        lazyHandlerPromise: y
      };
    let v = (async () => {
      ze(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), E = {};
      for (let R in S) {
        let C = S[R];
        if (C === void 0)
          continue;
        let D = aT(R), V = c[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        D ? ht(
          !D,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : V ? ht(
          !V,
          `Route "${c.id}" has a static property "${R}" defined but its lazy function is also returning a value for this property. The lazy route property "${R}" will be ignored.`
        ) : E[R] = C;
      }
      Object.assign(c, E), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return $g.set(c, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let y of d) {
    if (o && o.includes(y))
      continue;
    let v = db({
      key: y,
      route: n,
      manifest: r,
      mapRouteProperties: s
    });
    v && (h.push(v), y === a && (p = v));
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
async function Kg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), r = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    r[a[c].route.id] = o;
  }), r;
}
async function kT(n) {
  return n.matches.some((a) => a.route.middleware) ? hb(n, () => Kg(n)) : Kg(n);
}
function hb(n, a) {
  return PT(
    n,
    a,
    (s) => {
      if (tR(s))
        throw s;
      return s;
    },
    IT,
    r
  );
  function r(s, o, c) {
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
      ), p = Ka(
        d,
        d[h].route.id
      ).route.id;
      return Promise.resolve({
        [p]: { type: "error", result: s }
      });
    }
  }
}
async function PT(n, a, r, s, o) {
  let { matches: c, ...d } = n, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await mb(
    d,
    h,
    a,
    r,
    s,
    o
  );
}
async function mb(n, a, r, s, o, c, d = 0) {
  let { request: h } = n;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[d];
  if (!p)
    return await r();
  let [m, y] = p, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await mb(
        n,
        a,
        r,
        s,
        o,
        c,
        d + 1
      ) }, v.value;
    } catch (E) {
      return v = { value: await c(E, m, v) }, v.value;
    }
  };
  try {
    let E = await y(n, S), R = E != null ? s(E) : void 0;
    return o(R) ? R : v ? R ?? v.value : (v = { value: await S() }, v.value);
  } catch (E) {
    return await c(E, m, v);
  }
}
function pb(n, a, r, s, o) {
  let c = db({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = qT(
    s.route,
    Vt(r.method) ? "action" : "loader",
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
function xd(n, a, r, s, o, c, d, h, p, m = null, y) {
  let v = !1, S = pb(
    n,
    a,
    r,
    c,
    d
  );
  return {
    ...c,
    _lazyPromises: S,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(E) {
      return v = !0, m ? typeof y == "boolean" ? Pr(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof E == "boolean" ? Pr(c, {
        ...m,
        defaultShouldRevalidate: E
      }) : Pr(c, m) : p;
    },
    resolve(E) {
      let { lazy: R, loader: C, middleware: D } = c.route, z = v || p || E && !Vt(r.method) && (R || C), V = D && D.length > 0 && !C && !R;
      return z && (Vt(r.method) || !V) ? GT({
        request: r,
        path: s,
        unstable_pattern: o,
        match: c,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: h
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function jl(n, a, r, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: pb(
      n,
      a,
      r,
      m,
      d
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : xd(
    n,
    a,
    r,
    s,
    es(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function YT(n, a, r, s, o, c, d) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: yb(a, r),
    unstable_pattern: es(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let v = h;
      return hb(v, () => y({
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
      s.flatMap((y) => [
        y._lazyPromises?.handler,
        y._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function GT({
  request: n,
  path: a,
  unstable_pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, y = Vt(n.method), v = y ? "action" : "loader", S = (E) => {
    let R, C = new Promise((V, U) => R = U);
    m = () => R(), n.signal.addEventListener("abort", m);
    let D = (V) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : E(
      {
        request: n,
        unstable_url: yb(n, a),
        unstable_pattern: r,
        params: s.params,
        context: h
      },
      ...V !== void 0 ? [V] : []
    ), z = (async () => {
      try {
        return { type: "data", result: await (d ? d((U) => D(U)) : D()) };
      } catch (V) {
        return { type: "error", result: V };
      }
    })();
    return Promise.race([z, C]);
  };
  try {
    let E = y ? s.route.action : s.route.loader;
    if (o || c)
      if (E) {
        let R, [C] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(E).catch((D) => {
            R = D;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          c
        ]);
        if (R !== void 0)
          throw R;
        p = C;
      } else {
        await o;
        let R = y ? s.route.action : s.route.loader;
        if (R)
          [p] = await Promise.all([S(R), c]);
        else if (v === "action") {
          let C = new URL(n.url), D = C.pathname + C.search;
          throw gn(405, {
            method: n.method,
            pathname: D,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      p = await S(E);
    else {
      let R = new URL(n.url), C = R.pathname + R.search;
      throw gn(404, {
        pathname: C
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return p;
}
async function FT(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function XT(n) {
  let { result: a, type: r } = n;
  if (Wd(a)) {
    let s;
    try {
      s = await FT(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error" ? {
      type: "error",
      error: new pu(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return r === "error" ? tv(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: ZT(a),
    statusCode: Kr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Kr(a) ? a.status : void 0
  } : tv(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function $T(n, a, r, s, o) {
  let c = n.headers.get("Location");
  if (ze(
    c,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Qd(c)) {
    let d = s.slice(
      0,
      s.findIndex((h) => h.route.id === r) + 1
    );
    c = Sd(
      new URL(a.url),
      d,
      o,
      c
    ), n.headers.set("Location", c);
  }
  return n;
}
var Qg = [
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
function Zg(n, a, r, s) {
  if (Qd(n)) {
    let o = n, c = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Qg.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let d = xn(c.pathname, r) != null;
    if (c.origin === a.origin && d)
      return Id(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Qg.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function El(n, a, r, s) {
  let o = n.createURL(gb(a)).toString(), c = { signal: r };
  if (s && Vt(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Ed(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function yb(n, a) {
  let r = new URL(n.url), s = typeof a == "string" ? zn(a) : a;
  if (r.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), c = o.getAll("index");
    o.delete("index");
    for (let d of c.filter(Boolean))
      o.append("index", d);
    r.search = o.size ? `?${o.toString()}` : "";
  } else
    r.search = "";
  return r.hash = s.hash || "", r;
}
function Ed(n) {
  let a = new URLSearchParams();
  for (let [r, s] of n.entries())
    a.append(r, typeof s == "string" ? s : s.name);
  return a;
}
function Ig(n) {
  let a = new FormData();
  for (let [r, s] of n.entries())
    a.append(r, s);
  return a;
}
function KT(n, a, r, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, y = r && rn(r[1]) ? r[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, E = a[S];
    if (ze(
      !Mi(E),
      "Cannot handle redirect results in processLoaderData"
    ), rn(E)) {
      let R = E.error;
      if (y !== void 0 && (R = y, y = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let C = Ka(n, S);
        d[C.route.id] == null && (d[C.route.id] = R);
      }
      s || (c[S] = ub), p || (p = !0, h = Kr(E.error) ? E.error.status : 500), E.headers && (m[S] = E.headers);
    } else
      c[S] = E.data, E.statusCode && E.statusCode !== 200 && !p && (h = E.statusCode), E.headers && (m[S] = E.headers);
  }), y !== void 0 && r && (d = { [r[0]]: y }, r[2] && (c[r[2]] = void 0)), {
    loaderData: c,
    errors: d,
    statusCode: h || 200,
    loaderHeaders: m
  };
}
function Jg(n, a, r, s, o, c) {
  let { loaderData: d, errors: h } = KT(
    a,
    r,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let S = c[m];
    if (ze(S, "Did not find corresponding fetcher result"), rn(S)) {
      let E = Ka(n.matches, y?.route.id);
      h && h[E.route.id] || (h = {
        ...h,
        [E.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Mi(S))
      ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = ha(S.data);
      n.fetchers.set(m, E);
    }
  }), { loaderData: d, errors: h };
}
function Wg(n, a, r, s) {
  let o = Object.entries(a).filter(([, c]) => c !== ub).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of r) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && c.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function ev(n) {
  return n ? rn(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function Ka(n, a) {
  return (a ? n.slice(0, n.findIndex((s) => s.route.id === a) + 1) : [...n]).reverse().find((s) => s.route.hasErrorBoundary === !0) || n[0];
}
function No(n) {
  let a = n.length === 1 ? n[0] : n.find((r) => r.index || !r.path || r.path === "/") || {
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
function gn(n, {
  pathname: a,
  routeId: r,
  method: s,
  type: o,
  message: c
} = {}) {
  let d = "Unknown Server Error", h = "Unknown @remix-run/router error";
  return n === 400 ? (d = "Bad Request", s && a && r ? h = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.` : o === "invalid-body" && (h = "Unable to encode submission body")) : n === 403 ? (d = "Forbidden", h = `Route "${r}" does not match URL "${a}"`) : n === 404 ? (d = "Not Found", h = `No route matches URL "${a}"`) : n === 405 && (d = "Method Not Allowed", s && a && r ? h = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.` : s && (h = `Invalid request method "${s.toUpperCase()}"`)), new pu(
    n || 500,
    d,
    new Error(h),
    !0
  );
}
function zo(n) {
  let a = Object.entries(n);
  for (let r = a.length - 1; r >= 0; r--) {
    let [s, o] = a[r];
    if (Mi(o))
      return { key: s, result: o };
  }
}
function gb(n) {
  let a = typeof n == "string" ? zn(n) : n;
  return Gn({ ...a, hash: "" });
}
function QT(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function ZT(n) {
  return new pu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function IT(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, r]) => typeof a == "string" && JT(r)
  );
}
function JT(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function WT(n) {
  return Wd(n.result) && sb.has(n.result.status);
}
function rn(n) {
  return n.type === "error";
}
function Mi(n) {
  return (n && n.type) === "redirect";
}
function tv(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Wd(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function eR(n) {
  return sb.has(n);
}
function tR(n) {
  return Wd(n) && eR(n.status) && n.headers.has("Location");
}
function nR(n) {
  return zT.has(n.toUpperCase());
}
function Vt(n) {
  return DT.has(n.toUpperCase());
}
function eh(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function ko(n, a) {
  let r = typeof a == "string" ? zn(a).search : a.search;
  if (n[n.length - 1].route.index && eh(r || ""))
    return n[n.length - 1];
  let s = nb(n);
  return s[s.length - 1];
}
function nv(n) {
  let { formMethod: a, formAction: r, formEncType: s, text: o, formData: c, json: d } = n;
  if (!(!a || !r || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (c != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: c,
        json: void 0,
        text: void 0
      };
    if (d !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: d,
        text: void 0
      };
  }
}
function Ff(n, a) {
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
function aR(n, a) {
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
function Nr(n, a) {
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
function iR(n, a) {
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
function ha(n) {
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
function lR(n, a) {
  try {
    let r = n.sessionStorage.getItem(
      ob
    );
    if (r) {
      let s = JSON.parse(r);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function rR(n, a) {
  if (a.size > 0) {
    let r = {};
    for (let [s, o] of a)
      r[s] = [...o];
    try {
      n.sessionStorage.setItem(
        ob,
        JSON.stringify(r)
      );
    } catch (s) {
      ht(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function av() {
  let n, a, r = new Promise((s, o) => {
    n = async (c) => {
      s(c);
      try {
        await r;
      } catch {
      }
    }, a = async (c) => {
      o(c);
      try {
        await r;
      } catch {
      }
    };
  });
  return {
    promise: r,
    //@ts-ignore
    resolve: n,
    //@ts-ignore
    reject: a
  };
}
var zi = T.createContext(null);
zi.displayName = "DataRouter";
var ts = T.createContext(null);
ts.displayName = "DataRouterState";
var vb = T.createContext(!1);
function bb() {
  return T.useContext(vb);
}
var th = T.createContext({
  isTransitioning: !1
});
th.displayName = "ViewTransition";
var Sb = T.createContext(
  /* @__PURE__ */ new Map()
);
Sb.displayName = "Fetchers";
var sR = T.createContext(null);
sR.displayName = "Await";
var En = T.createContext(
  null
);
En.displayName = "Navigation";
var yu = T.createContext(
  null
);
yu.displayName = "Location";
var ma = T.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ma.displayName = "Route";
var nh = T.createContext(null);
nh.displayName = "RouteError";
var xb = "REACT_ROUTER_ERROR", oR = "REDIRECT", uR = "ROUTE_ERROR_RESPONSE";
function cR(n) {
  if (n.startsWith(`${xb}:${oR}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function fR(n) {
  if (n.startsWith(
    `${xb}:${uR}:{`
  ))
    try {
      let a = JSON.parse(n.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new pu(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function dR(n, { relative: a } = {}) {
  ze(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = T.useContext(En), { hash: o, pathname: c, search: d } = as(n, { relative: a }), h = c;
  return r !== "/" && (h = c === "/" ? r : bn([r, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function ns() {
  return T.useContext(yu) != null;
}
function pa() {
  return ze(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), T.useContext(yu).location;
}
var Eb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Tb(n) {
  T.useContext(En).static || T.useLayoutEffect(n);
}
function Oi() {
  let { isDataRoute: n } = T.useContext(ma);
  return n ? RR() : hR();
}
function hR() {
  ze(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = T.useContext(zi), { basename: a, navigator: r } = T.useContext(En), { matches: s } = T.useContext(ma), { pathname: o } = pa(), c = JSON.stringify(Zd(s)), d = T.useRef(!1);
  return Tb(() => {
    d.current = !0;
  }), T.useCallback(
    (p, m = {}) => {
      if (ht(d.current, Eb), !d.current) return;
      if (typeof p == "number") {
        r.go(p);
        return;
      }
      let y = mu(
        p,
        JSON.parse(c),
        o,
        m.relative === "path"
      );
      n == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : bn([a, y.pathname])), (m.replace ? r.replace : r.push)(
        y,
        m.state,
        m
      );
    },
    [
      a,
      r,
      c,
      o,
      n
    ]
  );
}
T.createContext(null);
function as(n, { relative: a } = {}) {
  let { matches: r } = T.useContext(ma), { pathname: s } = pa(), o = JSON.stringify(Zd(r));
  return T.useMemo(
    () => mu(
      n,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [n, o, s, a]
  );
}
function mR(n, a, r) {
  ze(
    ns(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = T.useContext(En), { matches: o } = T.useContext(ma), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    Mb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = pa(), v;
  v = y;
  let S = v.pathname || "/", E = S;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let R = $a(n, { pathname: E });
  return ht(
    m || R != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), ht(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), bR(
    R && R.map(
      (D) => Object.assign({}, D, {
        params: Object.assign({}, d, D.params),
        pathname: bn([
          p,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            D.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : D.pathname
        ]),
        pathnameBase: D.pathnameBase === "/" ? p : bn([
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
    r
  );
}
function pR() {
  let n = TR(), a = Kr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), r = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ T.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ T.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ T.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ T.createElement("h3", { style: { fontStyle: "italic" } }, a), r ? /* @__PURE__ */ T.createElement("pre", { style: o }, r) : null, d);
}
var yR = /* @__PURE__ */ T.createElement(pR, null), Rb = class extends T.Component {
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
      const r = fR(n.digest);
      r && (n = r);
    }
    let a = n !== void 0 ? /* @__PURE__ */ T.createElement(ma.Provider, { value: this.props.routeContext }, /* @__PURE__ */ T.createElement(
      nh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ T.createElement(gR, { error: n }, a) : a;
  }
};
Rb.contextType = vb;
var Xf = /* @__PURE__ */ new WeakMap();
function gR({
  children: n,
  error: a
}) {
  let { basename: r } = T.useContext(En);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = cR(a.digest);
    if (s) {
      let o = Xf.get(a);
      if (o) throw o;
      let c = ib(s.location, r);
      if (ab && !Xf.get(a))
        if (c.isExternal || s.reloadDocument)
          window.location.href = c.absoluteURL || c.to;
        else {
          const d = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(c.to, {
              replace: s.replace
            })
          );
          throw Xf.set(a, d), d;
        }
      return /* @__PURE__ */ T.createElement(
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
function vR({ routeContext: n, match: a, children: r }) {
  let s = T.useContext(zi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ T.createElement(ma.Provider, { value: n }, r);
}
function bR(n, a = [], r) {
  let s = r?.state;
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
      (v) => v.route.id && c?.[v.route.id] !== void 0
    );
    ze(
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
  if (r && s) {
    d = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let v = o[y];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = y), v.route.id) {
        let { loaderData: S, errors: E } = s, R = v.route.loader && !S.hasOwnProperty(v.route.id) && (!E || E[v.route.id] === void 0);
        if (v.route.lazy || R) {
          r.isStatic && (d = !0), h >= 0 ? o = o.slice(0, h + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = r?.onError, m = s && p ? (y, v) => {
    p(y, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: es(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (y, v, S) => {
      let E, R = !1, C = null, D = null;
      s && (E = c && v.route.id ? c[v.route.id] : void 0, C = v.route.errorElement || yR, d && (h < 0 && S === 0 ? (Mb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, D = null) : h === S && (R = !0, D = v.route.hydrateFallbackElement || null)));
      let z = a.concat(o.slice(0, S + 1)), V = () => {
        let U;
        return E ? U = C : R ? U = D : v.route.Component ? U = /* @__PURE__ */ T.createElement(v.route.Component, null) : v.route.element ? U = v.route.element : U = y, /* @__PURE__ */ T.createElement(
          vR,
          {
            match: v,
            routeContext: {
              outlet: y,
              matches: z,
              isDataRoute: s != null
            },
            children: U
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ T.createElement(
        Rb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
          error: E,
          children: V(),
          routeContext: { outlet: null, matches: z, isDataRoute: !0 },
          onError: m
        }
      ) : V();
    },
    null
  );
}
function ah(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function SR(n) {
  let a = T.useContext(zi);
  return ze(a, ah(n)), a;
}
function wb(n) {
  let a = T.useContext(ts);
  return ze(a, ah(n)), a;
}
function xR(n) {
  let a = T.useContext(ma);
  return ze(a, ah(n)), a;
}
function gu(n) {
  let a = xR(n), r = a.matches[a.matches.length - 1];
  return ze(
    r.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function ER() {
  return gu(
    "useRouteId"
    /* UseRouteId */
  );
}
function is() {
  let n = wb(
    "useLoaderData"
    /* UseLoaderData */
  ), a = gu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function TR() {
  let n = T.useContext(nh), a = wb(
    "useRouteError"
    /* UseRouteError */
  ), r = gu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[r];
}
function RR() {
  let { router: n } = SR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = gu(
    "useNavigate"
    /* UseNavigateStable */
  ), r = T.useRef(!1);
  return Tb(() => {
    r.current = !0;
  }), T.useCallback(
    async (o, c = {}) => {
      ht(r.current, Eb), r.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var iv = {};
function Mb(n, a, r) {
  !a && !iv[n] && (iv[n] = !0, ht(!1, r));
}
var lv = {};
function rv(n, a) {
  !n && !lv[a] && (lv[a] = !0, console.warn(a));
}
var wR = "useOptimistic", sv = kE[wR], MR = () => {
};
function CR(n) {
  return sv ? sv(n) : [n, MR];
}
function AR(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && ht(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: T.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: T.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: T.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var jR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function DR(n, a) {
  return UT({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: IE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: jR,
    mapRouteProperties: AR,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var NR = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, a) => {
      this.resolve = (r) => {
        this.status === "pending" && (this.status = "resolved", n(r));
      }, this.reject = (r) => {
        this.status === "pending" && (this.status = "rejected", a(r));
      };
    });
  }
};
function zR({
  router: n,
  flushSync: a,
  onError: r,
  unstable_useTransitions: s
}) {
  s = bb() || s;
  let [c, d] = T.useState(n.state), [h, p] = CR(c), [m, y] = T.useState(), [v, S] = T.useState({
    isTransitioning: !1
  }), [E, R] = T.useState(), [C, D] = T.useState(), [z, V] = T.useState(), U = T.useRef(/* @__PURE__ */ new Map()), G = T.useCallback(
    (Z, { deletedFetchers: ne, newErrors: ue, flushSync: I, viewTransitionOpts: Y }) => {
      ue && r && Object.values(ue).forEach(
        (ee) => r(ee, {
          location: Z.location,
          params: Z.matches[0]?.params ?? {},
          unstable_pattern: es(Z.matches)
        })
      ), Z.fetchers.forEach((ee, O) => {
        ee.data !== void 0 && U.current.set(O, ee.data);
      }), ne.forEach((ee) => U.current.delete(ee)), rv(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (rv(
        Y == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !Y || !oe) {
        a && I ? a(() => d(Z)) : s === !1 ? d(Z) : T.startTransition(() => {
          s === !0 && p((ee) => ov(ee, Z)), d(Z);
        });
        return;
      }
      if (a && I) {
        a(() => {
          C && (E?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: Y.currentLocation,
            nextLocation: Y.nextLocation
          });
        });
        let ee = n.window.document.startViewTransition(() => {
          a(() => d(Z));
        });
        ee.finished.finally(() => {
          a(() => {
            R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => D(ee));
        return;
      }
      C ? (E?.resolve(), C.skipTransition(), V({
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
      C,
      E,
      s,
      p,
      r
    ]
  );
  T.useLayoutEffect(() => n.subscribe(G), [n, G]);
  let J = h.initialized;
  T.useLayoutEffect(() => {
    !J && n.state.initialized && G(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [J, G, n.state]), T.useEffect(() => {
    v.isTransitioning && !v.flushSync && R(new NR());
  }, [v]), T.useEffect(() => {
    if (E && m && n.window) {
      let Z = m, ne = E.promise, ue = n.window.document.startViewTransition(async () => {
        s === !1 ? d(Z) : T.startTransition(() => {
          s === !0 && p((I) => ov(I, Z)), d(Z);
        }), await ne;
      });
      ue.finished.finally(() => {
        R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
      }), D(ue);
    }
  }, [
    m,
    E,
    n.window,
    s,
    p
  ]), T.useEffect(() => {
    E && m && h.location.key === m.location.key && E.resolve();
  }, [E, C, h.location, m]), T.useEffect(() => {
    !v.isTransitioning && z && (y(z.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: z.currentLocation,
      nextLocation: z.nextLocation
    }), V(void 0));
  }, [v.isTransitioning, z]);
  let W = T.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (Z) => n.navigate(Z),
    push: (Z, ne, ue) => n.navigate(Z, {
      state: ne,
      preventScrollReset: ue?.preventScrollReset
    }),
    replace: (Z, ne, ue) => n.navigate(Z, {
      replace: !0,
      state: ne,
      preventScrollReset: ue?.preventScrollReset
    })
  }), [n]), te = n.basename || "/", j = T.useMemo(
    () => ({
      router: n,
      navigator: W,
      static: !1,
      basename: te,
      onError: r
    }),
    [n, W, te, r]
  );
  return /* @__PURE__ */ T.createElement(T.Fragment, null, /* @__PURE__ */ T.createElement(zi.Provider, { value: j }, /* @__PURE__ */ T.createElement(ts.Provider, { value: h }, /* @__PURE__ */ T.createElement(Sb.Provider, { value: U.current }, /* @__PURE__ */ T.createElement(th.Provider, { value: v }, /* @__PURE__ */ T.createElement(
    LR,
    {
      basename: te,
      location: h.location,
      navigationType: h.historyAction,
      navigator: W,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ T.createElement(
      OR,
      {
        routes: n.routes,
        future: n.future,
        state: h,
        isStatic: !1,
        onError: r
      }
    )
  ))))), null);
}
function ov(n, a) {
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
var OR = T.memo(_R);
function _R({
  routes: n,
  future: a,
  state: r,
  isStatic: s,
  onError: o
}) {
  return mR(n, void 0, { state: r, isStatic: s, onError: o });
}
function LR({
  basename: n = "/",
  children: a = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  ze(
    !ns(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = n.replace(/^\/*/, "/"), p = T.useMemo(
    () => ({
      basename: h,
      navigator: o,
      static: c,
      unstable_useTransitions: d,
      future: {}
    }),
    [h, o, c, d]
  );
  typeof r == "string" && (r = zn(r));
  let {
    pathname: m = "/",
    search: y = "",
    hash: v = "",
    state: S = null,
    key: E = "default",
    unstable_mask: R
  } = r, C = T.useMemo(() => {
    let D = xn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: v,
        state: S,
        key: E,
        unstable_mask: R
      },
      navigationType: s
    };
  }, [
    h,
    m,
    y,
    v,
    S,
    E,
    s,
    R
  ]);
  return ht(
    C != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ T.createElement(En.Provider, { value: p }, /* @__PURE__ */ T.createElement(yu.Provider, { children: a, value: C }));
}
var Po = "get", Yo = "application/x-www-form-urlencoded";
function vu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function UR(n) {
  return vu(n) && n.tagName.toLowerCase() === "button";
}
function VR(n) {
  return vu(n) && n.tagName.toLowerCase() === "form";
}
function BR(n) {
  return vu(n) && n.tagName.toLowerCase() === "input";
}
function HR(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function qR(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !HR(n);
}
var Oo = null;
function kR() {
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
var PR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function $f(n) {
  return n != null && !PR.has(n) ? (ht(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Yo}"`
  ), null) : n;
}
function YR(n, a) {
  let r, s, o, c, d;
  if (VR(n)) {
    let h = n.getAttribute("action");
    s = h ? xn(h, a) : null, r = n.getAttribute("method") || Po, o = $f(n.getAttribute("enctype")) || Yo, c = new FormData(n);
  } else if (UR(n) || BR(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? xn(p, a) : null, r = n.getAttribute("formmethod") || h.getAttribute("method") || Po, o = $f(n.getAttribute("formenctype")) || $f(h.getAttribute("enctype")) || Yo, c = new FormData(h, n), !kR()) {
      let { name: m, type: y, value: v } = n;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, v);
    }
  } else {
    if (vu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Po, s = null, o = Yo, d = n;
  }
  return c && o === "text/plain" && (d = c, c = void 0), { action: s, method: r.toLowerCase(), encType: o, formData: c, body: d };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ih(n, a) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(a);
}
function Cb(n, a, r, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return r ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && xn(o.pathname, a) === "/" ? o.pathname = `${eu(a)}/_root.${s}` : o.pathname = `${eu(o.pathname)}.${s}`, o;
}
async function GR(n, a) {
  if (n.id in a)
    return a[n.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return a[n.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function FR(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function XR(n, a, r) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let d = await GR(c, r);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return ZR(
    s.flat(1).filter(FR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function uv(n, a, r, s, o, c) {
  let d = (p, m) => r[m] ? p.route.id !== r[m].route.id : !0, h = (p, m) => (
    // param change, /users/123 -> /users/456
    r[m].pathname !== p.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]
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
      let v = p.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: r[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: p.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function $R(n, a, { includeHydrateFallback: r } = {}) {
  return KR(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), r && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function KR(n) {
  return [...new Set(n)];
}
function QR(n) {
  let a = {}, r = Object.keys(n).sort();
  for (let s of r)
    a[s] = n[s];
  return a;
}
function ZR(n, a) {
  let r = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(QR(o));
    return r.has(c) || (r.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function lh() {
  let n = T.useContext(zi);
  return ih(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function IR() {
  let n = T.useContext(ts);
  return ih(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var rh = T.createContext(void 0);
rh.displayName = "FrameworkContext";
function sh() {
  let n = T.useContext(rh);
  return ih(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function JR(n, a) {
  let r = T.useContext(rh), [s, o] = T.useState(!1), [c, d] = T.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: v } = a, S = T.useRef(null);
  T.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let C = (z) => {
        z.forEach((V) => {
          d(V.isIntersecting);
        });
      }, D = new IntersectionObserver(C, { threshold: 0.5 });
      return S.current && D.observe(S.current), () => {
        D.disconnect();
      };
    }
  }, [n]), T.useEffect(() => {
    if (s) {
      let C = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(C);
      };
    }
  }, [s]);
  let E = () => {
    o(!0);
  }, R = () => {
    o(!1), d(!1);
  };
  return r ? n !== "intent" ? [c, S, {}] : [
    c,
    S,
    {
      onFocus: zr(h, E),
      onBlur: zr(p, R),
      onMouseEnter: zr(m, E),
      onMouseLeave: zr(y, R),
      onTouchStart: zr(v, E)
    }
  ] : [!1, S, {}];
}
function zr(n, a) {
  return (r) => {
    n && n(r), r.defaultPrevented || a(r);
  };
}
function WR({ page: n, ...a }) {
  let r = bb(), { router: s } = lh(), o = T.useMemo(
    () => $a(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? r ? /* @__PURE__ */ T.createElement(tw, { page: n, matches: o, ...a }) : /* @__PURE__ */ T.createElement(nw, { page: n, matches: o, ...a }) : null;
}
function ew(n) {
  let { manifest: a, routeModules: r } = sh(), [s, o] = T.useState([]);
  return T.useEffect(() => {
    let c = !1;
    return XR(n, a, r).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, r]), s;
}
function tw({
  page: n,
  matches: a,
  ...r
}) {
  let s = pa(), { future: o } = sh(), { basename: c } = lh(), d = T.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = Cb(
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
  return /* @__PURE__ */ T.createElement(T.Fragment, null, d.map((h) => /* @__PURE__ */ T.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })));
}
function nw({
  page: n,
  matches: a,
  ...r
}) {
  let s = pa(), { future: o, manifest: c, routeModules: d } = sh(), { basename: h } = lh(), { loaderData: p, matches: m } = IR(), y = T.useMemo(
    () => uv(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), v = T.useMemo(
    () => uv(
      n,
      a,
      m,
      c,
      s,
      "assets"
    ),
    [n, a, m, c, s]
  ), S = T.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let C = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((V) => {
      let U = c.routes[V.route.id];
      !U || !U.hasLoader || (!y.some((G) => G.route.id === V.route.id) && V.route.id in p && d[V.route.id]?.shouldRevalidate || U.hasClientLoader ? D = !0 : C.add(V.route.id));
    }), C.size === 0)
      return [];
    let z = Cb(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && C.size > 0 && z.searchParams.set(
      "_routes",
      a.filter((V) => C.has(V.route.id)).map((V) => V.route.id).join(",")
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
  ]), E = T.useMemo(
    () => $R(v, c),
    [v, c]
  ), R = ew(v);
  return /* @__PURE__ */ T.createElement(T.Fragment, null, S.map((C) => /* @__PURE__ */ T.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...r })), E.map((C) => /* @__PURE__ */ T.createElement("link", { key: C, rel: "modulepreload", href: C, ...r })), R.map(({ key: C, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ T.createElement(
      "link",
      {
        key: C,
        nonce: r.nonce,
        ...D,
        crossOrigin: D.crossOrigin ?? r.crossOrigin
      }
    )
  )));
}
function aw(...n) {
  return (a) => {
    n.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var iw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  iw && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Ab = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ls = T.forwardRef(
  function({
    onClick: a,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: c,
    replace: d,
    unstable_mask: h,
    state: p,
    target: m,
    to: y,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: E,
    ...R
  }, C) {
    let { basename: D, navigator: z, unstable_useTransitions: V } = T.useContext(En), U = typeof y == "string" && Ab.test(y), G = ib(y, D);
    y = G.to;
    let J = dR(y, { relative: o }), W = pa(), te = null;
    if (h) {
      let ee = mu(
        h,
        [],
        W.unstable_mask ? W.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (ee.pathname = ee.pathname === "/" ? D : bn([D, ee.pathname])), te = z.createHref(ee);
    }
    let [j, Z, ne] = JR(
      s,
      R
    ), ue = ow(y, {
      replace: d,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: V
    });
    function I(ee) {
      a && a(ee), ee.defaultPrevented || ue(ee);
    }
    let Y = !(G.isExternal || c), oe = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ T.createElement(
        "a",
        {
          ...R,
          ...ne,
          href: (Y ? te : void 0) || G.absoluteURL || J,
          onClick: Y ? I : a,
          ref: aw(C, Z),
          target: m,
          "data-discover": !U && r === "render" ? "true" : void 0
        }
      )
    );
    return j && !U ? /* @__PURE__ */ T.createElement(T.Fragment, null, oe, /* @__PURE__ */ T.createElement(WR, { page: J })) : oe;
  }
);
ls.displayName = "Link";
var lw = T.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: c,
    to: d,
    viewTransition: h,
    children: p,
    ...m
  }, y) {
    let v = as(d, { relative: m.relative }), S = pa(), E = T.useContext(ts), { navigator: R, basename: C } = T.useContext(En), D = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    hw(v) && h === !0, z = R.encodeLocation ? R.encodeLocation(v).pathname : v.pathname, V = S.pathname, U = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    r || (V = V.toLowerCase(), U = U ? U.toLowerCase() : null, z = z.toLowerCase()), U && C && (U = xn(U, C) || U);
    const G = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
    let J = V === z || !o && V.startsWith(z) && V.charAt(G) === "/", W = U != null && (U === z || !o && U.startsWith(z) && U.charAt(z.length) === "/"), te = {
      isActive: J,
      isPending: W,
      isTransitioning: D
    }, j = J ? a : void 0, Z;
    typeof s == "function" ? Z = s(te) : Z = [
      s,
      J ? "active" : null,
      W ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ne = typeof c == "function" ? c(te) : c;
    return /* @__PURE__ */ T.createElement(
      ls,
      {
        ...m,
        "aria-current": j,
        className: Z,
        ref: y,
        style: ne,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(te) : p
    );
  }
);
lw.displayName = "NavLink";
var rw = T.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: a,
    navigate: r,
    reloadDocument: s,
    replace: o,
    state: c,
    method: d = Po,
    action: h,
    onSubmit: p,
    relative: m,
    preventScrollReset: y,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, R) => {
    let { unstable_useTransitions: C } = T.useContext(En), D = fw(), z = dw(h, { relative: m }), V = d.toLowerCase() === "get" ? "get" : "post", U = typeof h == "string" && Ab.test(h), G = (J) => {
      if (p && p(J), J.defaultPrevented) return;
      J.preventDefault();
      let W = J.nativeEvent.submitter, te = W?.getAttribute("formmethod") || d, j = () => D(W || J.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: r,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: y,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      C && r !== !1 ? T.startTransition(() => j()) : j();
    };
    return /* @__PURE__ */ T.createElement(
      "form",
      {
        ref: R,
        method: V,
        action: z,
        onSubmit: s ? p : G,
        ...E,
        "data-discover": !U && n === "render" ? "true" : void 0
      }
    );
  }
);
rw.displayName = "Form";
function sw(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function jb(n) {
  let a = T.useContext(zi);
  return ze(a, sw(n)), a;
}
function ow(n, {
  target: a,
  replace: r,
  unstable_mask: s,
  state: o,
  preventScrollReset: c,
  relative: d,
  viewTransition: h,
  unstable_defaultShouldRevalidate: p,
  unstable_useTransitions: m
} = {}) {
  let y = Oi(), v = pa(), S = as(n, { relative: d });
  return T.useCallback(
    (E) => {
      if (qR(E, a)) {
        E.preventDefault();
        let R = r !== void 0 ? r : Gn(v) === Gn(S), C = () => y(n, {
          replace: R,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? T.startTransition(() => C()) : C();
      }
    },
    [
      v,
      y,
      S,
      r,
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
var uw = 0, cw = () => `__${String(++uw)}__`;
function fw() {
  let { router: n } = jb(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = T.useContext(En), r = ER(), s = n.fetch, o = n.navigate;
  return T.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: v } = YR(
        c,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || cw();
        await s(S, r, d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: y,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || m,
          flushSync: d.flushSync
        });
      } else
        await o(d.action || h, {
          unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
          preventScrollReset: d.preventScrollReset,
          formData: y,
          body: v,
          formMethod: d.method || p,
          formEncType: d.encType || m,
          replace: d.replace,
          state: d.state,
          fromRouteId: r,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition
        });
    },
    [s, o, a, r]
  );
}
function dw(n, { relative: a } = {}) {
  let { basename: r } = T.useContext(En), s = T.useContext(ma);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...as(n || ".", { relative: a }) }, d = pa();
  if (n == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((v) => v).forEach((v) => h.append("index", v));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (c.pathname = c.pathname === "/" ? r : bn([r, c.pathname])), Gn(c);
}
function hw(n, { relative: a } = {}) {
  let r = T.useContext(th);
  ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = jb(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = as(n, { relative: a });
  if (!r.isTransitioning)
    return !1;
  let c = xn(r.currentLocation.pathname, s) || r.currentLocation.pathname, d = xn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return Wo(o.pathname, d) != null || Wo(o.pathname, c) != null;
}
class _i extends Error {
  constructor(a, r, s, o) {
    super(s), this.status = a, this.category = r, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const rs = "/api/v1/extensions/nexus.audio.emotiontts";
async function it(n, a) {
  const r = n.startsWith("http") ? n : `${rs}${n}`, s = await fetch(r, {
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
    throw new _i(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function mw(n, a, r) {
  const s = n.startsWith("http") ? n : `${rs}${n}`, o = new EventSource(s);
  return o.onmessage = (c) => {
    if (c.data)
      try {
        a(JSON.parse(c.data));
      } catch {
      }
  }, o.onerror = (c) => {
    r?.(c);
  }, () => o.close();
}
async function pw() {
  return it("/deployments");
}
async function cv(n) {
  return it(`/deployments/${n}`);
}
async function yw(n, a) {
  return it(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function fv(n) {
  return it(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Db(n, a) {
  return it("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function gw(n, a, r) {
  return it(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(r)
    }
  );
}
async function vw(n, a) {
  await it(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function bw(n) {
  return it(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function Sw(n, a, r = "error") {
  return it("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: r })
  });
}
async function xw(n, a = {}) {
  const r = new URLSearchParams();
  a.limit && r.set("limit", String(a.limit)), a.status && r.set("status", a.status);
  const s = r.toString(), o = s ? `?${s}` : "";
  return it(`/deployments/${n}/runs${o}`);
}
async function Ew(n, a) {
  return it(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function oh(n, a) {
  return it(`/deployments/${n}/runs/${a}`);
}
async function Tw(n, a) {
  return it(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function uh(n, a) {
  return it(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function Rw(n, a) {
  return it(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function dv(n, a, r, s) {
  return mw(
    `/deployments/${n}/runs/${a}/progress`,
    r,
    s
  );
}
async function tu(n) {
  return it(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function ww(n, a, r, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", r), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${rs}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function Mw(n) {
  return it(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var Cw = "_93p6291", Aw = "_93p6292", jw = "_93p6293", Dw = "_93p6294", Nw = "_93p6295", zw = "_93p6296", Ow = "_93p6297", _w = "_93p6298", Lw = "_93p6299", Uw = "_93p629a", Vw = "_93p629b", Bw = "_93p629c", Hw = "_93p629d", qw = "_93p629e", kw = "_93p629f", Pw = "_93p629g", Yw = "_93p629h", Gw = "_93p629i";
function Fw() {
  const { deployments: n } = is();
  return /* @__PURE__ */ b.jsxs("main", { className: Cw, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Aw, children: [
      /* @__PURE__ */ b.jsx("p", { className: jw, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ b.jsxs("h1", { className: Dw, children: [
        "Direct your characters.",
        /* @__PURE__ */ b.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: Nw, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: zw, children: [
      /* @__PURE__ */ b.jsx("h2", { className: Ow, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: qw, children: [
        /* @__PURE__ */ b.jsx("span", { className: kw, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ b.jsx("p", { className: Pw, children: "No deployments yet" }),
        /* @__PURE__ */ b.jsx("p", { className: Yw, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ b.jsx("p", { className: Gw, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ b.jsx("ul", { className: _w, children: n.map((a) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(ls, { to: `/${a.deploymentId}/recipe`, className: Lw, children: [
        /* @__PURE__ */ b.jsx("span", { className: Uw, "aria-hidden": "true", children: Xw(a.displayName) }),
        /* @__PURE__ */ b.jsxs("span", { children: [
          /* @__PURE__ */ b.jsx("span", { className: Vw, children: a.displayName }),
          /* @__PURE__ */ b.jsx("span", { className: Bw, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: Hw, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function Xw(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const $w = "huggingface/IndexTeam/IndexTTS-2";
async function Kw(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function Qw() {
  return it("/runtime/health");
}
async function Zw() {
  await it("/runtime/start", { method: "POST" });
}
async function Iw() {
  return it("/runtime/stop", { method: "POST" });
}
async function Jw() {
  await it("/runtime/restart", { method: "POST" });
}
function Ww(n) {
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
var eM = "g5r6d10", tM = "g5r6d11", nM = "g5r6d12", Or = "g5r6d13", _r = "g5r6d14", aM = "g5r6d15", iM = "g5r6d16", lM = "g5r6d17", Zt = "g5r6d18", Xa = "g5r6d19", nu = "g5r6d1b g5r6d1a", Ia = "g5r6d1c g5r6d1a", Nb = "g5r6d1d g5r6d1a", zb = "g5r6d1e", Qr = "g5r6d1f", Td = "g5r6d1g", rM = "g5r6d1h", sM = "g5r6d1i", Ga = "g5r6d1j", Ob = "g5r6d1k", _b = "g5r6d1l g5r6d1k", ch = "g5r6d1m g5r6d1k", fh = "g5r6d1n g5r6d1k";
const oM = 4e3;
function uM({ deployment: n }) {
  const a = Oi(), [r, s] = T.useState(null), [o, c] = T.useState(null), [d, h] = T.useState(!1);
  T.useEffect(() => {
    let D = !1;
    const z = async () => {
      try {
        const U = await Qw();
        D || (s(U), c(null));
      } catch (U) {
        D || c(Lr(U));
      }
    };
    z();
    const V = setInterval(z, oM);
    return () => {
      D = !0, clearInterval(V);
    };
  }, []);
  const p = T.useCallback(async () => {
    h(!0), c(null);
    try {
      await Zw();
    } catch (D) {
      c(Lr(D));
    } finally {
      h(!1);
    }
  }, []), m = T.useCallback(async () => {
    h(!0);
    try {
      await Iw();
    } catch (D) {
      c(Lr(D));
    } finally {
      h(!1);
    }
  }, []), y = T.useCallback(async () => {
    h(!0);
    try {
      await Jw();
    } catch (D) {
      c(Lr(D));
    } finally {
      h(!1);
    }
  }, []), v = T.useCallback(async () => {
    h(!0);
    try {
      await Kw($w);
    } catch (D) {
      c(Lr(D));
    } finally {
      h(!1);
    }
  }, []), S = r?.badge ?? "not_installed", E = S === "stopped" || S === "not_installed", R = S === "ready" || S === "running" || S === "starting", C = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { className: Xa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Runtime" }),
    /* @__PURE__ */ b.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Badge" }),
    /* @__PURE__ */ b.jsx("span", { className: cM(S), children: Ww(S) }),
    r && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Uptime" }),
      /* @__PURE__ */ b.jsx("span", { children: fM(r.uptimeSeconds) }),
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "VRAM" }),
      /* @__PURE__ */ b.jsxs("span", { children: [
        r.vramUsedMb,
        " / ",
        r.vramTotalMb,
        " MB"
      ] })
    ] }),
    E && /* @__PURE__ */ b.jsx("button", { type: "button", className: nu, disabled: d, onClick: p, children: "Install / Start runtime" }),
    R && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("button", { type: "button", className: Nb, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: Ia, disabled: d, onClick: y, children: "Restart" })
    ] }),
    C && /* @__PURE__ */ b.jsx("button", { type: "button", className: nu, disabled: d, onClick: v, children: "Download IndexTTS-2 model" }),
    /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: Ia,
        onClick: () => a(`/${n.deploymentId}/mappings`),
        title: "Manage character → voice mappings (upload voice samples, edit emotion defaults)",
        children: "Mappings"
      }
    ),
    o && !C && /* @__PURE__ */ b.jsx("span", { className: Qr, children: o })
  ] });
}
function cM(n) {
  switch (n) {
    case "ready":
    case "running":
      return _b;
    case "starting":
    case "stopping":
    case "installing":
      return ch;
    case "failed":
      return fh;
    default:
      return Ob;
  }
}
function fM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Lr(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
async function dM(n) {
  return it(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function hM(n, a, r) {
  return it("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: r })
  });
}
async function mM(n, a) {
  await it(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var pM = "wfqeb50", yM = "wfqeb51", gM = "wfqeb52", vM = "wfqeb53", bM = "wfqeb54", SM = "wfqeb55 wfqeb54", xM = "wfqeb56", EM = "wfqeb57", Lb = "wfqeb58", Ub = "wfqeb59", Vb = "wfqeb5a", TM = "wfqeb5b", RM = "wfqeb5c", hv = "wfqeb5d", wM = "wfqeb5e wfqeb5d", MM = "wfqeb5f wfqeb5d", CM = "wfqeb5g", AM = "wfqeb5h", Kf = "wfqeb5i", jM = "wfqeb5j", DM = "wfqeb5k", NM = "wfqeb5l", zM = "wfqeb5m";
const dh = T.createContext({});
function hh(n) {
  const a = T.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const OM = typeof window < "u", Bb = OM ? T.useLayoutEffect : T.useEffect, bu = /* @__PURE__ */ T.createContext(null);
function mh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function au(n, a) {
  const r = n.indexOf(a);
  r > -1 && n.splice(r, 1);
}
const Fn = (n, a, r) => r > a ? a : r < n ? n : r;
function mv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let ss = () => {
}, Ni = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (ss = (n, a, r) => {
  !n && typeof console < "u" && console.warn(mv(a, r));
}, Ni = (n, a, r) => {
  if (!n)
    throw new Error(mv(a, r));
});
const Ja = {}, Hb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function qb(n) {
  return typeof n == "object" && n !== null;
}
const kb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function Pb(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, _M = (n, a) => (r) => a(n(r)), os = (...n) => n.reduce(_M), Zr = /* @__NO_SIDE_EFFECTS__ */ (n, a, r) => {
  const s = a - n;
  return s === 0 ? 1 : (r - n) / s;
};
class ph {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return mh(this.subscriptions, a), () => au(this.subscriptions, a);
  }
  notify(a, r, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, r, s);
      else
        for (let c = 0; c < o; c++) {
          const d = this.subscriptions[c];
          d && d(a, r, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const It = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, vn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Yb(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Gb = (n, a, r) => (((1 - 3 * r + 3 * a) * n + (3 * r - 6 * a)) * n + 3 * a) * n, LM = 1e-7, UM = 12;
function VM(n, a, r, s, o) {
  let c, d, h = 0;
  do
    d = a + (r - a) / 2, c = Gb(d, s, o) - n, c > 0 ? r = d : a = d;
  while (Math.abs(c) > LM && ++h < UM);
  return d;
}
function us(n, a, r, s) {
  if (n === a && r === s)
    return Sn;
  const o = (c) => VM(c, 0, 1, n, r);
  return (c) => c === 0 || c === 1 ? c : Gb(o(c), a, s);
}
const Fb = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Xb = (n) => (a) => 1 - n(1 - a), $b = /* @__PURE__ */ us(0.33, 1.53, 0.69, 0.99), yh = /* @__PURE__ */ Xb($b), Kb = /* @__PURE__ */ Fb(yh), Qb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * yh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), gh = (n) => 1 - Math.sin(Math.acos(n)), Zb = Xb(gh), Ib = Fb(gh), BM = /* @__PURE__ */ us(0.42, 0, 1, 1), HM = /* @__PURE__ */ us(0, 0, 0.58, 1), Jb = /* @__PURE__ */ us(0.42, 0, 0.58, 1), qM = (n) => Array.isArray(n) && typeof n[0] != "number", Wb = (n) => Array.isArray(n) && typeof n[0] == "number", pv = {
  linear: Sn,
  easeIn: BM,
  easeInOut: Jb,
  easeOut: HM,
  circIn: gh,
  circInOut: Ib,
  circOut: Zb,
  backIn: yh,
  backInOut: Kb,
  backOut: $b,
  anticipate: Qb
}, kM = (n) => typeof n == "string", yv = (n) => {
  if (Wb(n)) {
    Ni(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, r, s, o] = n;
    return us(a, r, s, o);
  } else if (kM(n))
    return Ni(pv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), pv[n];
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
function PM(n, a) {
  let r = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, c = !1;
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
    schedule: (y, v = !1, S = !1) => {
      const R = S && o ? r : s;
      return v && d.add(y), R.add(y), y;
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
      const v = r;
      r = s, s = v, r.forEach(p), r.clear(), o = !1, c && (c = !1, m.process(y));
    }
  };
  return m;
}
const YM = 40;
function eS(n, a) {
  let r = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => r = !0, d = _o.reduce((U, G) => (U[G] = PM(c), U), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: v, preRender: S, render: E, postRender: R } = d, C = () => {
    const U = Ja.useManualTiming, G = U ? o.timestamp : performance.now();
    r = !1, U || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(G - o.timestamp, YM), 1)), o.timestamp = G, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), v.process(o), S.process(o), E.process(o), R.process(o), o.isProcessing = !1, r && a && (s = !1, n(C));
  }, D = () => {
    r = !0, s = !0, o.isProcessing || n(C);
  };
  return { schedule: _o.reduce((U, G) => {
    const J = d[G];
    return U[G] = (W, te = !1, j = !1) => (r || D(), J.schedule(W, te, j)), U;
  }, {}), cancel: (U) => {
    for (let G = 0; G < _o.length; G++)
      d[_o[G]].cancel(U);
  }, state: o, steps: d };
}
const { schedule: Je, cancel: Wa, state: zt, steps: Qf } = /* @__PURE__ */ eS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Sn, !0);
let Go;
function GM() {
  Go = void 0;
}
const kt = {
  now: () => (Go === void 0 && kt.set(zt.isProcessing || Ja.useManualTiming ? zt.timestamp : performance.now()), Go),
  set: (n) => {
    Go = n, queueMicrotask(GM);
  }
}, tS = (n) => (a) => typeof a == "string" && a.startsWith(n), nS = /* @__PURE__ */ tS("--"), FM = /* @__PURE__ */ tS("var(--"), vh = (n) => FM(n) ? XM.test(n.split("/*")[0].trim()) : !1, XM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function gv(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const zl = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Ir = {
  ...zl,
  transform: (n) => Fn(0, 1, n)
}, Lo = {
  ...zl,
  default: 1
}, Yr = (n) => Math.round(n * 1e5) / 1e5, bh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function $M(n) {
  return n == null;
}
const KM = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Sh = (n, a) => (r) => !!(typeof r == "string" && KM.test(r) && r.startsWith(n) || a && !$M(r) && Object.prototype.hasOwnProperty.call(r, a)), aS = (n, a, r) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(bh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [r]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, QM = (n) => Fn(0, 255, n), Zf = {
  ...zl,
  transform: (n) => Math.round(QM(n))
}, Ci = {
  test: /* @__PURE__ */ Sh("rgb", "red"),
  parse: /* @__PURE__ */ aS("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: r, alpha: s = 1 }) => "rgba(" + Zf.transform(n) + ", " + Zf.transform(a) + ", " + Zf.transform(r) + ", " + Yr(Ir.transform(s)) + ")"
};
function ZM(n) {
  let a = "", r = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), r = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), r = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, r += r, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(r, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Rd = {
  test: /* @__PURE__ */ Sh("#"),
  parse: ZM,
  transform: Ci.transform
}, cs = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Fa = /* @__PURE__ */ cs("deg"), Yn = /* @__PURE__ */ cs("%"), ye = /* @__PURE__ */ cs("px"), IM = /* @__PURE__ */ cs("vh"), JM = /* @__PURE__ */ cs("vw"), vv = {
  ...Yn,
  parse: (n) => Yn.parse(n) / 100,
  transform: (n) => Yn.transform(n * 100)
}, wl = {
  test: /* @__PURE__ */ Sh("hsl", "hue"),
  parse: /* @__PURE__ */ aS("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: r, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Yn.transform(Yr(a)) + ", " + Yn.transform(Yr(r)) + ", " + Yr(Ir.transform(s)) + ")"
}, xt = {
  test: (n) => Ci.test(n) || Rd.test(n) || wl.test(n),
  parse: (n) => Ci.test(n) ? Ci.parse(n) : wl.test(n) ? wl.parse(n) : Rd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ci.transform(n) : wl.transform(n),
  getAnimatableNone: (n) => {
    const a = xt.parse(n);
    return a.alpha = 0, xt.transform(a);
  }
}, WM = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function eC(n) {
  return isNaN(n) && typeof n == "string" && (n.match(bh)?.length || 0) + (n.match(WM)?.length || 0) > 0;
}
const iS = "number", lS = "color", tC = "var", nC = "var(", bv = "${}", aC = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Dl(n) {
  const a = n.toString(), r = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(aC, (p) => (xt.test(p) ? (s.color.push(c), o.push(lS), r.push(xt.parse(p))) : p.startsWith(nC) ? (s.var.push(c), o.push(tC), r.push(p)) : (s.number.push(c), o.push(iS), r.push(parseFloat(p))), ++c, bv)).split(bv);
  return { values: r, split: h, indexes: s, types: o };
}
function iC(n) {
  return Dl(n).values;
}
function rS({ split: n, types: a }) {
  const r = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < r; c++)
      if (o += n[c], s[c] !== void 0) {
        const d = a[c];
        d === iS ? o += Yr(s[c]) : d === lS ? o += xt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function lC(n) {
  return rS(Dl(n));
}
const rC = (n) => typeof n == "number" ? 0 : xt.test(n) ? xt.getAnimatableNone(n) : n, sC = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : rC(n);
function oC(n) {
  const a = Dl(n);
  return rS(a)(a.values.map((s, o) => sC(s, a.split[o])));
}
const Nn = {
  test: eC,
  parse: iC,
  createTransformer: lC,
  getAnimatableNone: oC
};
function If(n, a, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + (a - n) * 6 * r : r < 1 / 2 ? a : r < 2 / 3 ? n + (a - n) * (2 / 3 - r) * 6 : n;
}
function uC({ hue: n, saturation: a, lightness: r, alpha: s }) {
  n /= 360, a /= 100, r /= 100;
  let o = 0, c = 0, d = 0;
  if (!a)
    o = c = d = r;
  else {
    const h = r < 0.5 ? r * (1 + a) : r + a - r * a, p = 2 * r - h;
    o = If(p, h, n + 1 / 3), c = If(p, h, n), d = If(p, h, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(d * 255),
    alpha: s
  };
}
function iu(n, a) {
  return (r) => r > 0 ? a : n;
}
const at = (n, a, r) => n + (a - n) * r, Jf = (n, a, r) => {
  const s = n * n, o = r * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, cC = [Rd, Ci, wl], fC = (n) => cC.find((a) => a.test(n));
function Sv(n) {
  const a = fC(n);
  if (ss(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let r = a.parse(n);
  return a === wl && (r = uC(r)), r;
}
const xv = (n, a) => {
  const r = Sv(n), s = Sv(a);
  if (!r || !s)
    return iu(n, a);
  const o = { ...r };
  return (c) => (o.red = Jf(r.red, s.red, c), o.green = Jf(r.green, s.green, c), o.blue = Jf(r.blue, s.blue, c), o.alpha = at(r.alpha, s.alpha, c), Ci.transform(o));
}, wd = /* @__PURE__ */ new Set(["none", "hidden"]);
function dC(n, a) {
  return wd.has(n) ? (r) => r <= 0 ? n : a : (r) => r >= 1 ? a : n;
}
function hC(n, a) {
  return (r) => at(n, a, r);
}
function xh(n) {
  return typeof n == "number" ? hC : typeof n == "string" ? vh(n) ? iu : xt.test(n) ? xv : yC : Array.isArray(n) ? sS : typeof n == "object" ? xt.test(n) ? xv : mC : iu;
}
function sS(n, a) {
  const r = [...n], s = r.length, o = n.map((c, d) => xh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      r[d] = o[d](c);
    return r;
  };
}
function mC(n, a) {
  const r = { ...n, ...a }, s = {};
  for (const o in r)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = xh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      r[c] = s[c](o);
    return r;
  };
}
function pC(n, a) {
  const r = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = n.indexes[c][s[c]], h = n.values[d] ?? 0;
    r[o] = h, s[c]++;
  }
  return r;
}
const yC = (n, a) => {
  const r = Nn.createTransformer(a), s = Dl(n), o = Dl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? wd.has(n) && !o.values.length || wd.has(a) && !s.values.length ? dC(n, a) : os(sS(pC(s, o), o.values), r) : (ss(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), iu(n, a));
};
function oS(n, a, r) {
  return typeof n == "number" && typeof a == "number" && typeof r == "number" ? at(n, a, r) : xh(n)(n, a);
}
const gC = (n) => {
  const a = ({ timestamp: r }) => n(r);
  return {
    start: (r = !0) => Je.update(a, r),
    stop: () => Wa(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => zt.isProcessing ? zt.timestamp : kt.now()
  };
}, uS = (n, a, r = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / r), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, lu = 2e4;
function Eh(n) {
  let a = 0;
  const r = 50;
  let s = n.next(a);
  for (; !s.done && a < lu; )
    a += r, s = n.next(a);
  return a >= lu ? 1 / 0 : a;
}
function vC(n, a = 100, r) {
  const s = r({ ...n, keyframes: [0, a] }), o = Math.min(Eh(s), lu);
  return {
    type: "keyframes",
    ease: (c) => s.next(o * c).value / a,
    duration: /* @__PURE__ */ vn(o)
  };
}
const st = {
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
const bC = 12;
function SC(n, a, r) {
  let s = r;
  for (let o = 1; o < bC; o++)
    s = s - n(s) / a(s);
  return s;
}
const Wf = 1e-3;
function xC({ duration: n = st.duration, bounce: a = st.bounce, velocity: r = st.velocity, mass: s = st.mass }) {
  let o, c;
  ss(n <= /* @__PURE__ */ It(st.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Fn(st.minDamping, st.maxDamping, d), n = Fn(st.minDuration, st.maxDuration, /* @__PURE__ */ vn(n)), d < 1 ? (o = (m) => {
    const y = m * d, v = y * n, S = y - r, E = Md(m, d), R = Math.exp(-v);
    return Wf - S / E * R;
  }, c = (m) => {
    const v = m * d * n, S = v * r + r, E = Math.pow(d, 2) * Math.pow(m, 2) * n, R = Math.exp(-v), C = Md(Math.pow(m, 2), d);
    return (-o(m) + Wf > 0 ? -1 : 1) * ((S - E) * R) / C;
  }) : (o = (m) => {
    const y = Math.exp(-m * n), v = (m - r) * n + 1;
    return -Wf + y * v;
  }, c = (m) => {
    const y = Math.exp(-m * n), v = (r - m) * (n * n);
    return y * v;
  });
  const h = 5 / n, p = SC(o, c, h);
  if (n = /* @__PURE__ */ It(n), isNaN(p))
    return {
      stiffness: st.stiffness,
      damping: st.damping,
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
const EC = ["duration", "bounce"], TC = ["stiffness", "damping", "mass"];
function Ev(n, a) {
  return a.some((r) => n[r] !== void 0);
}
function RC(n) {
  let a = {
    velocity: st.velocity,
    stiffness: st.stiffness,
    damping: st.damping,
    mass: st.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Ev(n, TC) && Ev(n, EC))
    if (a.velocity = 0, n.visualDuration) {
      const r = n.visualDuration, s = 2 * Math.PI / (r * 1.2), o = s * s, c = 2 * Fn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: st.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const r = xC({ ...n, velocity: 0 });
      a = {
        ...a,
        ...r,
        mass: st.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function ru(n = st.visualDuration, a = st.bounce) {
  const r = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = r;
  const c = r.keyframes[0], d = r.keyframes[r.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: v, velocity: S, isResolvedFromDuration: E } = RC({
    ...r,
    velocity: -/* @__PURE__ */ vn(r.velocity || 0)
  }), R = S || 0, C = m / (2 * Math.sqrt(p * y)), D = d - c, z = /* @__PURE__ */ vn(Math.sqrt(p / y)), V = Math.abs(D) < 5;
  s || (s = V ? st.restSpeed.granular : st.restSpeed.default), o || (o = V ? st.restDelta.granular : st.restDelta.default);
  let U, G, J, W, te, j;
  if (C < 1)
    J = Md(z, C), W = (R + C * z * D) / J, U = (ne) => {
      const ue = Math.exp(-C * z * ne);
      return d - ue * (W * Math.sin(J * ne) + D * Math.cos(J * ne));
    }, te = C * z * W + D * J, j = C * z * D - W * J, G = (ne) => Math.exp(-C * z * ne) * (te * Math.sin(J * ne) + j * Math.cos(J * ne));
  else if (C === 1) {
    U = (ue) => d - Math.exp(-z * ue) * (D + (R + z * D) * ue);
    const ne = R + z * D;
    G = (ue) => Math.exp(-z * ue) * (z * ne * ue - R);
  } else {
    const ne = z * Math.sqrt(C * C - 1);
    U = (oe) => {
      const ee = Math.exp(-C * z * oe), O = Math.min(ne * oe, 300);
      return d - ee * ((R + C * z * D) * Math.sinh(O) + ne * D * Math.cosh(O)) / ne;
    };
    const ue = (R + C * z * D) / ne, I = C * z * ue - D * ne, Y = C * z * D - ue * ne;
    G = (oe) => {
      const ee = Math.exp(-C * z * oe), O = Math.min(ne * oe, 300);
      return ee * (I * Math.sinh(O) + Y * Math.cosh(O));
    };
  }
  const Z = {
    calculatedDuration: E && v || null,
    velocity: (ne) => /* @__PURE__ */ It(G(ne)),
    next: (ne) => {
      if (!E && C < 1) {
        const I = Math.exp(-C * z * ne), Y = Math.sin(J * ne), oe = Math.cos(J * ne), ee = d - I * (W * Y + D * oe), O = /* @__PURE__ */ It(I * (te * Y + j * oe));
        return h.done = Math.abs(O) <= s && Math.abs(d - ee) <= o, h.value = h.done ? d : ee, h;
      }
      const ue = U(ne);
      if (E)
        h.done = ne >= v;
      else {
        const I = /* @__PURE__ */ It(G(ne));
        h.done = Math.abs(I) <= s && Math.abs(d - ue) <= o;
      }
      return h.value = h.done ? d : ue, h;
    },
    toString: () => {
      const ne = Math.min(Eh(Z), lu), ue = uS((I) => Z.next(ne * I).value, ne, 30);
      return ne + "ms " + ue;
    },
    toTransition: () => {
    }
  };
  return Z;
}
ru.applyToOptions = (n) => {
  const a = vC(n, 100, ru);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ It(a.duration), n.type = "keyframes", n;
};
const wC = 5;
function cS(n, a, r) {
  const s = Math.max(a - wC, 0);
  return Yb(r - n(s), a - s);
}
function Cd({ keyframes: n, velocity: a = 0, power: r = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, E = (j) => h !== void 0 && j < h || p !== void 0 && j > p, R = (j) => h === void 0 ? p : p === void 0 || Math.abs(h - j) < Math.abs(p - j) ? h : p;
  let C = r * a;
  const D = v + C, z = d === void 0 ? D : d(D);
  z !== D && (C = z - v);
  const V = (j) => -C * Math.exp(-j / s), U = (j) => z + V(j), G = (j) => {
    const Z = V(j), ne = U(j);
    S.done = Math.abs(Z) <= m, S.value = S.done ? z : ne;
  };
  let J, W;
  const te = (j) => {
    E(S.value) && (J = j, W = ru({
      keyframes: [S.value, R(S.value)],
      velocity: cS(U, j, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (j) => {
      let Z = !1;
      return !W && J === void 0 && (Z = !0, G(j), te(j)), J !== void 0 && j >= J ? W.next(j - J) : (!Z && G(j), S);
    }
  };
}
function MC(n, a, r) {
  const s = [], o = r || Ja.mix || oS, c = n.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Sn : a;
      h = os(p, h);
    }
    s.push(h);
  }
  return s;
}
function CC(n, a, { clamp: r = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Ni(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = MC(a, s, o), p = h.length, m = (y) => {
    if (d && y < n[0])
      return a[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(y < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Zr(n[v], n[v + 1], y);
    return h[v](S);
  };
  return r ? (y) => m(Fn(n[0], n[c - 1], y)) : m;
}
function AC(n, a) {
  const r = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Zr(0, a, s);
    n.push(at(r, 1, o));
  }
}
function jC(n) {
  const a = [0];
  return AC(a, n.length - 1), a;
}
function DC(n, a) {
  return n.map((r) => r * a);
}
function NC(n, a) {
  return n.map(() => a || Jb).splice(0, n.length - 1);
}
function Gr({ duration: n = 300, keyframes: a, times: r, ease: s = "easeInOut" }) {
  const o = qM(s) ? s.map(yv) : yv(s), c = {
    done: !1,
    value: a[0]
  }, d = DC(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    r && r.length === a.length ? r : jC(a),
    n
  ), h = CC(d, a, {
    ease: Array.isArray(o) ? o : NC(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = h(p), c.done = p >= n, c)
  };
}
const zC = (n) => n !== null;
function Su(n, { repeat: a, repeatType: r = "loop" }, s, o = 1) {
  const c = n.filter(zC), h = o < 0 || a && r !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const OC = {
  decay: Cd,
  inertia: Cd,
  tween: Gr,
  keyframes: Gr,
  spring: ru
};
function fS(n) {
  typeof n.type == "string" && (n.type = OC[n.type]);
}
class Th {
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
  then(a, r) {
    return this.finished.then(a, r);
  }
}
const _C = (n) => n / 100;
class su extends Th {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: r } = this.options;
      r && r.updatedAt !== kt.now() && this.tick(kt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    fS(a);
    const { type: r = Gr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = r || Gr;
    p !== Gr && typeof h[0] != "number" && (this.mixKeyframes = os(_C, oS(h[0], h[1])), h = [0, 100]);
    const m = p({ ...a, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...a,
      keyframes: [...h].reverse(),
      velocity: -d
    })), m.calculatedDuration === null && (m.calculatedDuration = Eh(m));
    const { calculatedDuration: y } = m;
    this.calculatedDuration = y, this.resolvedDuration = y + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const r = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = r;
  }
  tick(a, r = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: c, mirroredGenerator: d, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: y, repeat: v, repeatType: S, repeatDelay: E, type: R, onUpdate: C, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), r ? this.currentTime = a : this.updateTime(a);
    const z = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), V = this.playbackSpeed >= 0 ? z < 0 : z > o;
    this.currentTime = Math.max(z, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let U = this.currentTime, G = s;
    if (v) {
      const j = Math.min(this.currentTime, o) / h;
      let Z = Math.floor(j), ne = j % 1;
      !ne && j >= 1 && (ne = 1), ne === 1 && Z--, Z = Math.min(Z, v + 1), !!(Z % 2) && (S === "reverse" ? (ne = 1 - ne, E && (ne -= E / h)) : S === "mirror" && (G = d)), U = Fn(0, 1, ne) * h;
    }
    let J;
    V ? (this.delayState.value = y[0], J = this.delayState) : J = G.next(U), c && !V && (J.value = c(J.value));
    let { done: W } = J;
    !V && p !== null && (W = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && W);
    return te && R !== Cd && (J.value = Su(y, this.options, D, this.speed)), C && C(J.value), te && this.finish(), J;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, r) {
    return this.finished.then(a, r);
  }
  get duration() {
    return /* @__PURE__ */ vn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ vn(a);
  }
  get time() {
    return /* @__PURE__ */ vn(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ It(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const r = this.generator.next(a).value;
    return cS((s) => this.generator.next(s).value, a, r);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const r = this.playbackSpeed !== a;
    r && this.driver && this.updateTime(kt.now()), this.playbackSpeed = a, r && this.driver && (this.time = /* @__PURE__ */ vn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = gC, startTime: r } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = r ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(kt.now()), this.holdTime = this.currentTime;
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
function LC(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ai = (n) => n * 180 / Math.PI, Ad = (n) => {
  const a = Ai(Math.atan2(n[1], n[0]));
  return jd(a);
}, UC = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Ad,
  rotateZ: Ad,
  skewX: (n) => Ai(Math.atan(n[1])),
  skewY: (n) => Ai(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, jd = (n) => (n = n % 360, n < 0 && (n += 360), n), Tv = Ad, Rv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), wv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), VC = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Rv,
  scaleY: wv,
  scale: (n) => (Rv(n) + wv(n)) / 2,
  rotateX: (n) => jd(Ai(Math.atan2(n[6], n[5]))),
  rotateY: (n) => jd(Ai(Math.atan2(-n[2], n[0]))),
  rotateZ: Tv,
  rotate: Tv,
  skewX: (n) => Ai(Math.atan(n[4])),
  skewY: (n) => Ai(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Dd(n) {
  return n.includes("scale") ? 1 : 0;
}
function Nd(n, a) {
  if (!n || n === "none")
    return Dd(a);
  const r = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (r)
    s = VC, o = r;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = UC, o = h;
  }
  if (!o)
    return Dd(a);
  const c = s[a], d = o[1].split(",").map(HC);
  return typeof c == "function" ? c(d) : d[c];
}
const BC = (n, a) => {
  const { transform: r = "none" } = getComputedStyle(n);
  return Nd(r, a);
};
function HC(n) {
  return parseFloat(n.trim());
}
const Ol = [
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
], _l = new Set(Ol), Mv = (n) => n === zl || n === ye, qC = /* @__PURE__ */ new Set(["x", "y", "z"]), kC = Ol.filter((n) => !qC.has(n));
function PC(n) {
  const a = [];
  return kC.forEach((r) => {
    const s = n.getValue(r);
    s !== void 0 && (a.push([r, s.get()]), s.set(r.startsWith("scale") ? 1 : 0));
  }), a;
}
const Za = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: a = "0", paddingRight: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  height: ({ y: n }, { paddingTop: a = "0", paddingBottom: r = "0", boxSizing: s }) => {
    const o = n.max - n.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(r);
  },
  top: (n, { top: a }) => parseFloat(a),
  left: (n, { left: a }) => parseFloat(a),
  bottom: ({ y: n }, { top: a }) => parseFloat(a) + (n.max - n.min),
  right: ({ x: n }, { left: a }) => parseFloat(a) + (n.max - n.min),
  // Transform
  x: (n, { transform: a }) => Nd(a, "x"),
  y: (n, { transform: a }) => Nd(a, "y")
};
Za.translateX = Za.x;
Za.translateY = Za.y;
const ji = /* @__PURE__ */ new Set();
let zd = !1, Od = !1, _d = !1;
function dS() {
  if (Od) {
    const n = Array.from(ji).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), r = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = PC(s);
      o.length && (r.set(s, o), s.render());
    }), n.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = r.get(s);
      o && o.forEach(([c, d]) => {
        s.getValue(c)?.set(d);
      });
    }), n.forEach((s) => s.measureEndState()), n.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Od = !1, zd = !1, ji.forEach((n) => n.complete(_d)), ji.clear();
}
function hS() {
  ji.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Od = !0);
  });
}
function YC() {
  _d = !0, hS(), dS(), _d = !1;
}
class Rh {
  constructor(a, r, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = r, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ji.add(this), zd || (zd = !0, Je.read(hS), Je.resolveKeyframes(dS))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: r, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const c = o?.get(), d = a[a.length - 1];
      if (c !== void 0)
        a[0] = c;
      else if (s && r) {
        const h = s.readValue(r, d);
        h != null && (a[0] = h);
      }
      a[0] === void 0 && (a[0] = d), o && c === void 0 && o.set(a[0]);
    }
    LC(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), ji.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ji.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const GC = (n) => n.startsWith("--");
function mS(n, a, r) {
  GC(a) ? n.style.setProperty(a, r) : n.style[a] = r;
}
const FC = {};
function pS(n, a) {
  const r = /* @__PURE__ */ Pb(n);
  return () => FC[a] ?? r();
}
const XC = /* @__PURE__ */ pS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), yS = /* @__PURE__ */ pS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), kr = ([n, a, r, s]) => `cubic-bezier(${n}, ${a}, ${r}, ${s})`, Cv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ kr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ kr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ kr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ kr([0.33, 1.53, 0.69, 0.99])
};
function gS(n, a) {
  if (n)
    return typeof n == "function" ? yS() ? uS(n, a) : "ease-out" : Wb(n) ? kr(n) : Array.isArray(n) ? n.map((r) => gS(r, a) || Cv.easeOut) : Cv[n];
}
function $C(n, a, r, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: r
  };
  p && (y.offset = p);
  const v = gS(h, o);
  Array.isArray(v) && (y.easing = v);
  const S = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: d === "reverse" ? "alternate" : "normal"
  };
  return m && (S.pseudoElement = m), n.animate(y, S);
}
function vS(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function KC({ type: n, ...a }) {
  return vS(n) && yS() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class bS extends Th {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: r, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, Ni(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = KC(a);
    this.animation = $C(r, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = Su(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), mS(r, s, y), this.animation.cancel();
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
    return /* @__PURE__ */ vn(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ vn(a);
  }
  get time() {
    return /* @__PURE__ */ vn(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const r = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ It(a), r && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: r, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && XC() ? (this.animation.timeline = a, r && (this.animation.rangeStart = r), s && (this.animation.rangeEnd = s), Sn) : o(this);
  }
}
const SS = {
  anticipate: Qb,
  backInOut: Kb,
  circInOut: Ib
};
function QC(n) {
  return n in SS;
}
function ZC(n) {
  typeof n.ease == "string" && QC(n.ease) && (n.ease = SS[n.ease]);
}
const ed = 10;
class IC extends bS {
  constructor(a) {
    ZC(a), fS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: r, onUpdate: s, onComplete: o, element: c, ...d } = this.options;
    if (!r)
      return;
    if (a !== void 0) {
      r.set(a);
      return;
    }
    const h = new su({
      ...d,
      autoplay: !1
    }), p = Math.max(ed, kt.now() - this.startTime), m = Fn(0, ed, p - ed), y = h.sample(p).value, { name: v } = this.options;
    c && v && mS(c, v, y), r.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const Av = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Nn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function JC(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let r = 0; r < n.length; r++)
    if (n[r] !== a)
      return !0;
}
function WC(n, a, r, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], d = Av(o, a), h = Av(c, a);
  return ss(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : JC(n) || (r === "spring" || vS(r)) && s;
}
function Ld(n) {
  n.duration = 0, n.type = "keyframes";
}
const xS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), eA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function tA(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && eA.test(n[a]))
      return !0;
  return !1;
}
const nA = /* @__PURE__ */ new Set([
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
]), aA = /* @__PURE__ */ Pb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function iA(n) {
  const { motionValue: a, name: r, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return aA() && r && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (xS.has(r) || nA.has(r) && tA(h)) && (r !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const lA = 40;
class rA extends Th {
  constructor({ autoplay: a = !0, delay: r = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: y, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = kt.now();
    const S = {
      autoplay: a,
      delay: r,
      type: s,
      repeat: o,
      repeatDelay: c,
      repeatType: d,
      name: p,
      motionValue: m,
      element: y,
      ...v
    }, E = y?.KeyframeResolver || Rh;
    this.keyframeResolver = new E(h, (R, C, D) => this.onKeyframesResolved(R, C, S, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, r, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = kt.now();
    let v = !0;
    WC(a, c, d, h) || (v = !1, (Ja.instantAnimations || !p) && y?.(Su(a, s, r)), a[0] = a[a.length - 1], Ld(s), s.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > lA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: r,
      ...s,
      keyframes: a
    }, R = v && !m && iA(E), C = E.motionValue?.owner?.current;
    let D;
    if (R)
      try {
        D = new IC({
          ...E,
          element: C
        });
      } catch {
        D = new su(E);
      }
    else
      D = new su(E);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(Sn), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, r) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), YC()), this._animation;
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
function ES(n, a, r, s = 0, o = 1) {
  const c = Array.from(n).sort((m, y) => m.sortNodePosition(y)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof r == "function" ? r(c, d) : o === 1 ? c * s : h - c * s;
}
const sA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function oA(n) {
  const a = sA.exec(n);
  if (!a)
    return [,];
  const [, r, s, o] = a;
  return [`--${r ?? s}`, o];
}
const uA = 4;
function TS(n, a, r = 1) {
  Ni(r <= uA, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = oA(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return Hb(d) ? parseFloat(d) : d;
  }
  return vh(o) ? TS(o, a, r + 1) : o;
}
const cA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, fA = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), dA = {
  type: "keyframes",
  duration: 0.8
}, hA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, mA = (n, { keyframes: a }) => a.length > 2 ? dA : _l.has(n) ? n.startsWith("scale") ? fA(a[1]) : cA : hA;
function RS(n, a) {
  if (n?.inherit && a) {
    const { inherit: r, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function wh(n, a) {
  const r = n?.[a] ?? n?.default ?? n;
  return r !== n ? RS(r, n) : r;
}
const pA = /* @__PURE__ */ new Set([
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
function yA(n) {
  for (const a in n)
    if (!pA.has(a))
      return !0;
  return !1;
}
const Mh = (n, a, r, s = {}, o, c) => (d) => {
  const h = wh(s, n) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ It(p);
  const y = {
    keyframes: Array.isArray(r) ? r : [null, r],
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
  yA(h) || Object.assign(y, mA(n, y)), y.duration && (y.duration = /* @__PURE__ */ It(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ It(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let v = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Ld(y), y.delay === 0 && (v = !0)), (Ja.instantAnimations || Ja.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Ld(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, v && !c && a.get() !== void 0) {
    const S = Su(y.keyframes, h);
    if (S !== void 0) {
      Je.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new su(y) : new rA(y);
};
function jv(n) {
  const a = [{}, {}];
  return n?.values.forEach((r, s) => {
    a[0][s] = r.get(), a[1][s] = r.getVelocity();
  }), a;
}
function Ch(n, a, r, s) {
  if (typeof a == "function") {
    const [o, c] = jv(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  if (typeof a == "string" && (a = n.variants && n.variants[a]), typeof a == "function") {
    const [o, c] = jv(s);
    a = a(r !== void 0 ? r : n.custom, o, c);
  }
  return a;
}
function Di(n, a, r) {
  const s = n.getProps();
  return Ch(s, a, r !== void 0 ? r : s.custom, n);
}
const wS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ol
]), Dv = 30, gA = (n) => !isNaN(parseFloat(n));
class vA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, r = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = kt.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = r.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = kt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = gA(this.current));
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
  on(a, r) {
    this.events[a] || (this.events[a] = new ph());
    const s = this.events[a].add(r);
    return a === "change" ? () => {
      s(), Je.read(() => {
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
  attach(a, r) {
    this.passiveEffect = a, this.stopPassiveEffect = r;
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
  setWithVelocity(a, r, s) {
    this.set(r), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, r = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, r && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = kt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > Dv)
      return 0;
    const r = Math.min(this.updatedAt - this.prevUpdatedAt, Dv);
    return Yb(parseFloat(this.current) - parseFloat(this.prevFrameValue), r);
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
    return this.stop(), new Promise((r) => {
      this.hasAnimated = !0, this.animation = a(r), this.events.animationStart && this.events.animationStart.notify();
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
function Nl(n, a) {
  return new vA(n, a);
}
const Ud = (n) => Array.isArray(n);
function bA(n, a, r) {
  n.hasValue(a) ? n.getValue(a).set(r) : n.addValue(a, Nl(r));
}
function SA(n) {
  return Ud(n) ? n[n.length - 1] || 0 : n;
}
function xA(n, a) {
  const r = Di(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = r || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = SA(c[d]);
    bA(n, d, h);
  }
}
const Ot = (n) => !!(n && n.getVelocity);
function EA(n) {
  return !!(Ot(n) && n.add);
}
function Vd(n, a) {
  const r = n.getValue("willChange");
  if (EA(r))
    return r.add(a);
  if (!r && Ja.WillChange) {
    const s = new Ja.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Ah(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const TA = "framerAppearId", MS = "data-" + Ah(TA);
function CS(n) {
  return n.props[MS];
}
function RA({ protectedKeys: n, needsAnimating: a }, r) {
  const s = n.hasOwnProperty(r) && a[r] !== !0;
  return a[r] = !1, s;
}
function AS(n, a, { delay: r = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  c = c ? RS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const E = n.getValue(S, n.latestValues[S] ?? null), R = h[S];
    if (R === void 0 || v && RA(v, S))
      continue;
    const C = {
      delay: r,
      ...wh(c || {}, S)
    }, D = E.get();
    if (D !== void 0 && !E.isAnimating() && !Array.isArray(R) && R === D && !C.velocity) {
      Je.update(() => E.set(R));
      continue;
    }
    let z = !1;
    if (window.MotionHandoffAnimation) {
      const G = CS(n);
      if (G) {
        const J = window.MotionHandoffAnimation(G, S, Je);
        J !== null && (C.startTime = J, z = !0);
      }
    }
    Vd(n, S);
    const V = m ?? n.shouldReduceMotion;
    E.start(Mh(S, E, R, V && wS.has(S) ? { type: !1 } : C, n, z));
    const U = E.animation;
    U && y.push(U);
  }
  if (d) {
    const S = () => Je.update(() => {
      d && xA(n, d);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function Bd(n, a, r = {}) {
  const s = Di(n, a, r.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  r.transitionOverride && (o = r.transitionOverride);
  const c = s ? () => Promise.all(AS(n, s, r)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: v } = o;
    return wA(n, a, p, m, y, v, r);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(r.delay)]);
}
function wA(n, a, r = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(Bd(p, a, {
      ...d,
      delay: r + (typeof s == "function" ? 0 : s) + ES(n.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function MA(n, a, r = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => Bd(n, c, r));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = Bd(n, a, r);
  else {
    const o = typeof a == "function" ? Di(n, a, r.custom) : a;
    s = Promise.all(AS(n, o, r));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const CA = {
  test: (n) => n === "auto",
  parse: (n) => n
}, jS = (n) => (a) => a.test(n), DS = [zl, ye, Yn, Fa, JM, IM, CA], Nv = (n) => DS.find(jS(n));
function AA(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || kb(n) : !0;
}
const jA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function DA(n) {
  const [a, r] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = r.match(bh) || [];
  if (!s)
    return n;
  const o = r.replace(s, "");
  let c = jA.has(a) ? 1 : 0;
  return s !== r && (c *= 100), a + "(" + c + o + ")";
}
const NA = /\b([a-z-]*)\(.*?\)/gu, Hd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = n.match(NA);
    return a ? a.map(DA).join(" ") : n;
  }
}, qd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = Nn.parse(n);
    return Nn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, zv = {
  ...zl,
  transform: Math.round
}, zA = {
  rotate: Fa,
  rotateX: Fa,
  rotateY: Fa,
  rotateZ: Fa,
  scale: Lo,
  scaleX: Lo,
  scaleY: Lo,
  scaleZ: Lo,
  skew: Fa,
  skewX: Fa,
  skewY: Fa,
  distance: ye,
  translateX: ye,
  translateY: ye,
  translateZ: ye,
  x: ye,
  y: ye,
  z: ye,
  perspective: ye,
  transformPerspective: ye,
  opacity: Ir,
  originX: vv,
  originY: vv,
  originZ: ye
}, jh = {
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
  ...zA,
  zIndex: zv,
  // SVG
  fillOpacity: Ir,
  strokeOpacity: Ir,
  numOctaves: zv
}, OA = {
  ...jh,
  // Color props
  color: xt,
  backgroundColor: xt,
  outlineColor: xt,
  fill: xt,
  stroke: xt,
  // Border props
  borderColor: xt,
  borderTopColor: xt,
  borderRightColor: xt,
  borderBottomColor: xt,
  borderLeftColor: xt,
  filter: Hd,
  WebkitFilter: Hd,
  mask: qd,
  WebkitMask: qd
}, NS = (n) => OA[n], _A = /* @__PURE__ */ new Set([Hd, qd]);
function zS(n, a) {
  let r = NS(n);
  return _A.has(r) || (r = Nn), r.getAnimatableNone ? r.getAnimatableNone(a) : void 0;
}
const LA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function UA(n, a, r) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !LA.has(c) && Dl(c).values.length && (o = n[s]), s++;
  }
  if (o && r)
    for (const c of a)
      n[c] = zS(r, o);
}
class VA extends Rh {
  constructor(a, r, s, o, c) {
    super(a, r, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: r, name: s } = this;
    if (!r || !r.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < a.length; y++) {
      let v = a[y];
      if (typeof v == "string" && (v = v.trim(), vh(v))) {
        const S = TS(v, r.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !wS.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Nv(o), h = Nv(c), p = gv(o), m = gv(c);
    if (p !== m && Za[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (Mv(d) && Mv(h))
        for (let y = 0; y < a.length; y++) {
          const v = a[y];
          typeof v == "string" && (a[y] = parseFloat(v));
        }
      else Za[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: r } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || AA(a[o])) && s.push(o);
    s.length && UA(a, s, r);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: r, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Za[s](a.measureViewportBox(), window.getComputedStyle(a.current)), r[0] = this.measuredOrigin;
    const o = r[r.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: r, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(r);
    o && o.jump(this.measuredOrigin, !1);
    const c = s.length - 1, d = s[c];
    s[c] = Za[r](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function OS(n, a, r) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let s = document;
    const o = r?.[n] ?? s.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((s) => s != null);
}
const _S = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function Fo(n) {
  return qb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Dh } = /* @__PURE__ */ eS(queueMicrotask, !1), Dn = {
  x: !1,
  y: !1
};
function LS() {
  return Dn.x || Dn.y;
}
function BA(n) {
  return n === "x" || n === "y" ? Dn[n] ? null : (Dn[n] = !0, () => {
    Dn[n] = !1;
  }) : Dn.x || Dn.y ? null : (Dn.x = Dn.y = !0, () => {
    Dn.x = Dn.y = !1;
  });
}
function US(n, a) {
  const r = OS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [r, o, () => s.abort()];
}
function HA(n) {
  return !(n.pointerType === "touch" || LS());
}
function qA(n, a, r = {}) {
  const [s, o, c] = US(n, r);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const y = () => {
      d.removeEventListener("pointerleave", R);
    }, v = (D) => {
      m && (m(D), m = void 0), y();
    }, S = (D) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, v(D));
    }, E = () => {
      h = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, R = (D) => {
      if (D.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        v(D);
      }
    }, C = (D) => {
      if (!HA(D))
        return;
      p = !1;
      const z = a(d, D);
      typeof z == "function" && (m = z, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", C, o), d.addEventListener("pointerdown", E, o);
  }), c;
}
const VS = (n, a) => a ? n === a ? !0 : VS(n, a.parentElement) : !1, Nh = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, kA = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function PA(n) {
  return kA.has(n.tagName) || n.isContentEditable === !0;
}
const YA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function GA(n) {
  return YA.has(n.tagName) || n.isContentEditable === !0;
}
const Xo = /* @__PURE__ */ new WeakSet();
function Ov(n) {
  return (a) => {
    a.key === "Enter" && n(a);
  };
}
function td(n, a) {
  n.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const FA = (n, a) => {
  const r = n.currentTarget;
  if (!r)
    return;
  const s = Ov(() => {
    if (Xo.has(r))
      return;
    td(r, "down");
    const o = Ov(() => {
      td(r, "up");
    }), c = () => td(r, "cancel");
    r.addEventListener("keyup", o, a), r.addEventListener("blur", c, a);
  });
  r.addEventListener("keydown", s, a), r.addEventListener("blur", () => r.removeEventListener("keydown", s), a);
};
function _v(n) {
  return Nh(n) && !LS();
}
const Lv = /* @__PURE__ */ new WeakSet();
function XA(n, a, r = {}) {
  const [s, o, c] = US(n, r), d = (h) => {
    const p = h.currentTarget;
    if (!_v(h) || Lv.has(h))
      return;
    Xo.add(p), r.stopPropagation && Lv.add(h);
    const m = a(p, h), y = (E, R) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), Xo.has(p) && Xo.delete(p), _v(E) && typeof m == "function" && m(E, { success: R });
    }, v = (E) => {
      y(E, p === window || p === document || r.useGlobalTarget || VS(p, E.target));
    }, S = (E) => {
      y(E, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (r.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), Fo(h) && (h.addEventListener("focus", (m) => FA(m, o)), !PA(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function zh(n) {
  return qb(n) && "ownerSVGElement" in n;
}
const $o = /* @__PURE__ */ new WeakMap();
let Ko;
const BS = (n, a, r) => (s, o) => o && o[0] ? o[0][n + "Size"] : zh(s) && "getBBox" in s ? s.getBBox()[a] : s[r], $A = /* @__PURE__ */ BS("inline", "width", "offsetWidth"), KA = /* @__PURE__ */ BS("block", "height", "offsetHeight");
function QA({ target: n, borderBoxSize: a }) {
  $o.get(n)?.forEach((r) => {
    r(n, {
      get width() {
        return $A(n, a);
      },
      get height() {
        return KA(n, a);
      }
    });
  });
}
function ZA(n) {
  n.forEach(QA);
}
function IA() {
  typeof ResizeObserver > "u" || (Ko = new ResizeObserver(ZA));
}
function JA(n, a) {
  Ko || IA();
  const r = OS(n);
  return r.forEach((s) => {
    let o = $o.get(s);
    o || (o = /* @__PURE__ */ new Set(), $o.set(s, o)), o.add(a), Ko?.observe(s);
  }), () => {
    r.forEach((s) => {
      const o = $o.get(s);
      o?.delete(a), o?.size || Ko?.unobserve(s);
    });
  };
}
const Qo = /* @__PURE__ */ new Set();
let Ml;
function WA() {
  Ml = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Qo.forEach((a) => a(n));
  }, window.addEventListener("resize", Ml);
}
function ej(n) {
  return Qo.add(n), Ml || WA(), () => {
    Qo.delete(n), !Qo.size && typeof Ml == "function" && (window.removeEventListener("resize", Ml), Ml = void 0);
  };
}
function Uv(n, a) {
  return typeof n == "function" ? ej(n) : JA(n, a);
}
function tj(n) {
  return zh(n) && n.tagName === "svg";
}
const nj = [...DS, xt, Nn], aj = (n) => nj.find(jS(n)), Vv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Cl = () => ({
  x: Vv(),
  y: Vv()
}), Bv = () => ({ min: 0, max: 0 }), Rt = () => ({
  x: Bv(),
  y: Bv()
}), ij = /* @__PURE__ */ new WeakMap();
function xu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Jr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Oh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], _h = ["initial", ...Oh];
function Eu(n) {
  return xu(n.animate) || _h.some((a) => Jr(n[a]));
}
function HS(n) {
  return !!(Eu(n) || n.variants);
}
function lj(n, a, r) {
  for (const s in a) {
    const o = a[s], c = r[s];
    if (Ot(o))
      n.addValue(s, o);
    else if (Ot(c))
      n.addValue(s, Nl(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(s)) {
        const d = n.getValue(s);
        d.liveStyle === !0 ? d.jump(o) : d.hasAnimated || d.set(o);
      } else {
        const d = n.getStaticValue(s);
        n.addValue(s, Nl(d !== void 0 ? d : o, { owner: n }));
      }
  }
  for (const s in r)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const ou = { current: null }, Lh = { current: !1 }, rj = typeof window < "u";
function qS() {
  if (Lh.current = !0, !!rj)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), a = () => ou.current = n.matches;
      n.addEventListener("change", a), a();
    } else
      ou.current = !1;
}
const Hv = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let uu = {};
function kS(n) {
  uu = n;
}
function sj() {
  return uu;
}
class oj {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, r, s) {
    return {};
  }
  constructor({ parent: a, props: r, presenceContext: s, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: d, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Rh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = kt.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Je.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = r.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = r, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = Eu(r), this.isVariantNode = HS(r), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(r, {}, this);
    for (const E in S) {
      const R = S[E];
      m[E] !== void 0 && Ot(R) && R.set(m[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const r in this.initialValues)
        this.values.get(r)?.jump(this.initialValues[r]), this.latestValues[r] = this.initialValues[r];
    this.current = a, ij.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((r, s) => this.bindToMotionValue(s, r)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Lh.current || qS(), this.shouldReduceMotion = ou.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Wa(this.notifyUpdate), Wa(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const r = this.features[a];
      r && (r.unmount(), r.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, r) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), r.accelerate && xS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: y } = r.accelerate, v = new bS({
        element: this.current,
        name: a,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ It(y)
      }), S = d(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const s = _l.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = r.on("change", (d) => {
      this.latestValues[a] = d, this.props.onUpdate && Je.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, a, r)), this.valueSubscriptions.set(a, () => {
      o(), c && c(), r.owner && r.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in uu) {
      const r = uu[a];
      if (!r)
        continue;
      const { isEnabled: s, Feature: o } = r;
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Rt();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, r) {
    this.latestValues[a] = r;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, r) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = r;
    for (let s = 0; s < Hv.length; s++) {
      const o = Hv[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, d = a[c];
      d && (this.propEventSubscriptions[o] = this.on(o, d));
    }
    this.prevMotionValues = lj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const r = this.getClosestVariantNode();
    if (r)
      return r.variantChildren && r.variantChildren.add(a), () => r.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, r) {
    const s = this.values.get(a);
    r !== s && (s && this.removeValue(a), this.bindToMotionValue(a, r), this.values.set(a, r), this.latestValues[a] = r.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const r = this.valueSubscriptions.get(a);
    r && (r(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, r) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let s = this.values.get(a);
    return s === void 0 && r !== void 0 && (s = Nl(r === null ? void 0 : r, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, r) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Hb(s) || kb(s)) ? s = parseFloat(s) : !aj(s) && Nn.test(r) && (s = zS(a, r)), this.setBaseTarget(a, Ot(s) ? s.get() : s)), Ot(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, r) {
    this.baseTarget[a] = r;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: r } = this.props;
    let s;
    if (typeof r == "string" || typeof r == "object") {
      const c = Ch(this.props, r, this.presenceContext?.custom);
      c && (s = c[a]);
    }
    if (r && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !Ot(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, r) {
    return this.events[a] || (this.events[a] = new ph()), this.events[a].add(r);
  }
  notify(a, ...r) {
    this.events[a] && this.events[a].notify(...r);
  }
  scheduleRenderMicrotask() {
    Dh.render(this.render);
  }
}
class PS extends oj {
  constructor() {
    super(...arguments), this.KeyframeResolver = VA;
  }
  sortInstanceNodePosition(a, r) {
    return a.compareDocumentPosition(r) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, r) {
    const s = a.style;
    return s ? s[r] : void 0;
  }
  removeValueFromRenderState(a, { vars: r, style: s }) {
    delete r[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    Ot(a) && (this.childSubscription = a.on("change", (r) => {
      this.current && (this.current.textContent = `${r}`);
    }));
  }
}
class ei {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function YS({ top: n, left: a, right: r, bottom: s }) {
  return {
    x: { min: a, max: r },
    y: { min: n, max: s }
  };
}
function uj({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function cj(n, a) {
  if (!a)
    return n;
  const r = a({ x: n.left, y: n.top }), s = a({ x: n.right, y: n.bottom });
  return {
    top: r.y,
    left: r.x,
    bottom: s.y,
    right: s.x
  };
}
function nd(n) {
  return n === void 0 || n === 1;
}
function kd({ scale: n, scaleX: a, scaleY: r }) {
  return !nd(n) || !nd(a) || !nd(r);
}
function wi(n) {
  return kd(n) || GS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function GS(n) {
  return qv(n.x) || qv(n.y);
}
function qv(n) {
  return n && n !== "0%";
}
function cu(n, a, r) {
  const s = n - r, o = a * s;
  return r + o;
}
function kv(n, a, r, s, o) {
  return o !== void 0 && (n = cu(n, o, s)), cu(n, r, s) + a;
}
function Pd(n, a = 0, r = 1, s, o) {
  n.min = kv(n.min, a, r, s, o), n.max = kv(n.max, a, r, s, o);
}
function FS(n, { x: a, y: r }) {
  Pd(n.x, a.translate, a.scale, a.originPoint), Pd(n.y, r.translate, r.scale, r.originPoint);
}
const Pv = 0.999999999999, Yv = 1.0000000000001;
function fj(n, a, r, s = !1) {
  const o = r.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = r[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (kn(n.x, -c.scroll.offset.x), kn(n.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, FS(n, d)), s && wi(c.latestValues) && Zo(n, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Yv && a.x > Pv && (a.x = 1), a.y < Yv && a.y > Pv && (a.y = 1);
}
function kn(n, a) {
  n.min += a, n.max += a;
}
function Gv(n, a, r, s, o = 0.5) {
  const c = at(n.min, n.max, o);
  Pd(n, a, r, c, s);
}
function Fv(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Zo(n, a, r) {
  const s = r ?? n;
  Gv(n.x, Fv(a.x, s.x), a.scaleX, a.scale, a.originX), Gv(n.y, Fv(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function XS(n, a) {
  return YS(cj(n.getBoundingClientRect(), a));
}
function dj(n, a, r) {
  const s = XS(n, r), { scroll: o } = a;
  return o && (kn(s.x, o.offset.x), kn(s.y, o.offset.y)), s;
}
const hj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, mj = Ol.length;
function pj(n, a, r) {
  let s = "", o = !0;
  for (let c = 0; c < mj; c++) {
    const d = Ol[c], h = n[d];
    if (h === void 0)
      continue;
    let p = !0;
    if (typeof h == "number")
      p = h === (d.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(h);
      p = d.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!p || r) {
      const m = _S(h, jh[d]);
      if (!p) {
        o = !1;
        const y = hj[d] || d;
        s += `${y}(${m}) `;
      }
      r && (a[d] = m);
    }
  }
  return s = s.trim(), r ? s = r(a, o ? "" : s) : o && (s = "none"), s;
}
function Uh(n, a, r) {
  const { style: s, vars: o, transformOrigin: c } = n;
  let d = !1, h = !1;
  for (const p in a) {
    const m = a[p];
    if (_l.has(p)) {
      d = !0;
      continue;
    } else if (nS(p)) {
      o[p] = m;
      continue;
    } else {
      const y = _S(m, jh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (d || r ? s.transform = pj(a, n.transform, r) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function $S(n, { style: a, vars: r }, s, o) {
  const c = n.style;
  let d;
  for (d in a)
    c[d] = a[d];
  o?.applyProjectionStyles(c, s);
  for (d in r)
    c.setProperty(d, r[d]);
}
function Xv(n, a) {
  return a.max === a.min ? 0 : n / (a.max - a.min) * 100;
}
const Ur = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ye.test(n))
        n = parseFloat(n);
      else
        return n;
    const r = Xv(n, a.target.x), s = Xv(n, a.target.y);
    return `${r}% ${s}%`;
  }
}, yj = {
  correct: (n, { treeScale: a, projectionDelta: r }) => {
    const s = n, o = Nn.parse(n);
    if (o.length > 5)
      return s;
    const c = Nn.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = r.x.scale * a.x, p = r.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = at(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
  }
}, Yd = {
  borderRadius: {
    ...Ur,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Ur,
  borderTopRightRadius: Ur,
  borderBottomLeftRadius: Ur,
  borderBottomRightRadius: Ur,
  boxShadow: yj
};
function KS(n, { layout: a, layoutId: r }) {
  return _l.has(n) || n.startsWith("origin") || (a || r !== void 0) && (!!Yd[n] || n === "opacity");
}
function Vh(n, a, r) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Ot(s[d]) || o && Ot(o[d]) || KS(d, n) || r?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function gj(n) {
  return window.getComputedStyle(n);
}
class vj extends PS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = $S;
  }
  readValueFromInstance(a, r) {
    if (_l.has(r))
      return this.projection?.isProjecting ? Dd(r) : BC(a, r);
    {
      const s = gj(a), o = (nS(r) ? s.getPropertyValue(r) : s[r]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: r }) {
    return XS(a, r);
  }
  build(a, r, s) {
    Uh(a, r, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return Vh(a, r, s);
  }
}
const bj = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Sj = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function xj(n, a, r = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? bj : Sj;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${r}`;
}
const Ej = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function QS(n, {
  attrX: a,
  attrY: r,
  attrScale: s,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: d = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, y) {
  if (Uh(n, h, m), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete v.transformBox);
  for (const E of Ej)
    v[E] !== void 0 && (S[E] = v[E], delete v[E]);
  a !== void 0 && (v.x = a), r !== void 0 && (v.y = r), s !== void 0 && (v.scale = s), o !== void 0 && xj(v, o, c, d, !1);
}
const ZS = /* @__PURE__ */ new Set([
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
]), IS = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function Tj(n, a, r, s) {
  $S(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(ZS.has(o) ? o : Ah(o), a.attrs[o]);
}
function JS(n, a, r) {
  const s = Vh(n, a, r);
  for (const o in n)
    if (Ot(n[o]) || Ot(a[o])) {
      const c = Ol.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class Rj extends PS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Rt;
  }
  getBaseTargetFromProps(a, r) {
    return a[r];
  }
  readValueFromInstance(a, r) {
    if (_l.has(r)) {
      const s = NS(r);
      return s && s.default || 0;
    }
    return r = ZS.has(r) ? r : Ah(r), a.getAttribute(r);
  }
  scrapeMotionValuesFromProps(a, r, s) {
    return JS(a, r, s);
  }
  build(a, r, s) {
    QS(a, r, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, r, s, o) {
    Tj(a, r, s, o);
  }
  mount(a) {
    this.isSVGTag = IS(a.tagName), super.mount(a);
  }
}
const wj = _h.length;
function WS(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const r = n.parent ? WS(n.parent) || {} : {};
    return n.props.initial !== void 0 && (r.initial = n.props.initial), r;
  }
  const a = {};
  for (let r = 0; r < wj; r++) {
    const s = _h[r], o = n.props[s];
    (Jr(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function e1(n, a) {
  if (!Array.isArray(a))
    return !1;
  const r = a.length;
  if (r !== n.length)
    return !1;
  for (let s = 0; s < r; s++)
    if (a[s] !== n[s])
      return !1;
  return !0;
}
const Mj = [...Oh].reverse(), Cj = Oh.length;
function Aj(n) {
  return (a) => Promise.all(a.map(({ animation: r, options: s }) => MA(n, r, s)));
}
function jj(n) {
  let a = Aj(n), r = $v(), s = !0, o = !1;
  const c = (m) => (y, v) => {
    const S = Di(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: R, ...C } = S;
      y = { ...y, ...C, ...R };
    }
    return y;
  };
  function d(m) {
    a = m(n);
  }
  function h(m) {
    const { props: y } = n, v = WS(n.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let R = {}, C = 1 / 0;
    for (let z = 0; z < Cj; z++) {
      const V = Mj[z], U = r[V], G = y[V] !== void 0 ? y[V] : v[V], J = Jr(G), W = V === m ? U.isActive : null;
      W === !1 && (C = z);
      let te = G === v[V] && G !== y[V] && J;
      if (te && (s || o) && n.manuallyAnimateOnMount && (te = !1), U.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !U.isActive && W === null || // If we didn't and don't have any defined prop for this animation type
      !G && !U.prevProp || // Or if the prop doesn't define an animation
      xu(G) || typeof G == "boolean")
        continue;
      if (V === "exit" && U.isActive && W !== !0) {
        U.prevResolvedValues && (R = {
          ...R,
          ...U.prevResolvedValues
        });
        continue;
      }
      const j = Dj(U.prevProp, G);
      let Z = j || // If we're making this variant active, we want to always make it active
      V === m && U.isActive && !te && J || // If we removed a higher-priority variant (i is in reverse order)
      z > C && J, ne = !1;
      const ue = Array.isArray(G) ? G : [G];
      let I = ue.reduce(c(V), {});
      W === !1 && (I = {});
      const { prevResolvedValues: Y = {} } = U, oe = {
        ...Y,
        ...I
      }, ee = ($) => {
        Z = !0, E.has($) && (ne = !0, E.delete($)), U.needsAnimating[$] = !0;
        const le = n.getValue($);
        le && (le.liveStyle = !1);
      };
      for (const $ in oe) {
        const le = I[$], Se = Y[$];
        if (R.hasOwnProperty($))
          continue;
        let A = !1;
        Ud(le) && Ud(Se) ? A = !e1(le, Se) : A = le !== Se, A ? le != null ? ee($) : E.add($) : le !== void 0 && E.has($) ? ee($) : U.protectedKeys[$] = !0;
      }
      U.prevProp = G, U.prevResolvedValues = I, U.isActive && (R = { ...R, ...I }), (s || o) && n.blockInitialAnimation && (Z = !1);
      const O = te && j;
      Z && (!O || ne) && S.push(...ue.map(($) => {
        const le = { type: V };
        if (typeof $ == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: Se } = n, A = Di(Se, $);
          if (Se.enteringChildren && A) {
            const { delayChildren: F } = A.transition || {};
            le.delay = ES(Se.enteringChildren, n, F);
          }
        }
        return {
          animation: $,
          options: le
        };
      }));
    }
    if (E.size) {
      const z = {};
      if (typeof y.initial != "boolean") {
        const V = Di(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        V && V.transition && (z.transition = V.transition);
      }
      E.forEach((V) => {
        const U = n.getBaseTarget(V), G = n.getValue(V);
        G && (G.liveStyle = !0), z[V] = U ?? null;
      }), S.push({ animation: z });
    }
    let D = !!S.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (D = !1), s = !1, o = !1, D ? a(S) : Promise.resolve();
  }
  function p(m, y) {
    if (r[m].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(m, y)), r[m].isActive = y;
    const v = h(m);
    for (const S in r)
      r[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: h,
    setActive: p,
    setAnimateFunction: d,
    getState: () => r,
    reset: () => {
      r = $v(), o = !0;
    }
  };
}
function Dj(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !e1(a, n) : !1;
}
function Ei(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function $v() {
  return {
    animate: Ei(!0),
    whileInView: Ei(),
    whileHover: Ei(),
    whileTap: Ei(),
    whileDrag: Ei(),
    whileFocus: Ei(),
    exit: Ei()
  };
}
function Gd(n, a) {
  n.min = a.min, n.max = a.max;
}
function jn(n, a) {
  Gd(n.x, a.x), Gd(n.y, a.y);
}
function Kv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const t1 = 1e-4, Nj = 1 - t1, zj = 1 + t1, n1 = 0.01, Oj = 0 - n1, _j = 0 + n1;
function Pt(n) {
  return n.max - n.min;
}
function Lj(n, a, r) {
  return Math.abs(n - a) <= r;
}
function Qv(n, a, r, s = 0.5) {
  n.origin = s, n.originPoint = at(a.min, a.max, n.origin), n.scale = Pt(r) / Pt(a), n.translate = at(r.min, r.max, n.origin) - n.originPoint, (n.scale >= Nj && n.scale <= zj || isNaN(n.scale)) && (n.scale = 1), (n.translate >= Oj && n.translate <= _j || isNaN(n.translate)) && (n.translate = 0);
}
function Fr(n, a, r, s) {
  Qv(n.x, a.x, r.x, s ? s.originX : void 0), Qv(n.y, a.y, r.y, s ? s.originY : void 0);
}
function Zv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = o + a.min, n.max = n.min + Pt(a);
}
function Uj(n, a, r, s) {
  Zv(n.x, a.x, r.x, s?.x), Zv(n.y, a.y, r.y, s?.y);
}
function Iv(n, a, r, s = 0) {
  const o = s ? at(r.min, r.max, s) : r.min;
  n.min = a.min - o, n.max = n.min + Pt(a);
}
function fu(n, a, r, s) {
  Iv(n.x, a.x, r.x, s?.x), Iv(n.y, a.y, r.y, s?.y);
}
function Jv(n, a, r, s, o) {
  return n -= a, n = cu(n, 1 / r, s), o !== void 0 && (n = cu(n, 1 / o, s)), n;
}
function Vj(n, a = 0, r = 1, s = 0.5, o, c = n, d = n) {
  if (Yn.test(a) && (a = parseFloat(a), a = at(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = at(c.min, c.max, s);
  n === c && (h -= a), n.min = Jv(n.min, a, r, h, o), n.max = Jv(n.max, a, r, h, o);
}
function Wv(n, a, [r, s, o], c, d) {
  Vj(n, a[r], a[s], a[o], a.scale, c, d);
}
const Bj = ["x", "scaleX", "originX"], Hj = ["y", "scaleY", "originY"];
function e0(n, a, r, s) {
  Wv(n.x, a, Bj, r ? r.x : void 0, s ? s.x : void 0), Wv(n.y, a, Hj, r ? r.y : void 0, s ? s.y : void 0);
}
function t0(n) {
  return n.translate === 0 && n.scale === 1;
}
function a1(n) {
  return t0(n.x) && t0(n.y);
}
function n0(n, a) {
  return n.min === a.min && n.max === a.max;
}
function qj(n, a) {
  return n0(n.x, a.x) && n0(n.y, a.y);
}
function a0(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function i1(n, a) {
  return a0(n.x, a.x) && a0(n.y, a.y);
}
function i0(n) {
  return Pt(n.x) / Pt(n.y);
}
function l0(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function qn(n) {
  return [n("x"), n("y")];
}
function kj(n, a, r) {
  let s = "";
  const o = n.x.translate / a.x, c = n.y.translate / a.y, d = r?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), r) {
    const { transformPerspective: m, rotate: y, rotateX: v, rotateY: S, skewX: E, skewY: R } = r;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), v && (s += `rotateX(${v}deg) `), S && (s += `rotateY(${S}deg) `), E && (s += `skewX(${E}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const l1 = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], Pj = l1.length, r0 = (n) => typeof n == "string" ? parseFloat(n) : n, s0 = (n) => typeof n == "number" || ye.test(n);
function Yj(n, a, r, s, o, c) {
  o ? (n.opacity = at(0, r.opacity ?? 1, Gj(s)), n.opacityExit = at(a.opacity ?? 1, 0, Fj(s))) : c && (n.opacity = at(a.opacity ?? 1, r.opacity ?? 1, s));
  for (let d = 0; d < Pj; d++) {
    const h = l1[d];
    let p = o0(a, h), m = o0(r, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || s0(p) === s0(m) ? (n[h] = Math.max(at(r0(p), r0(m), s), 0), (Yn.test(m) || Yn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || r.rotate) && (n.rotate = at(a.rotate || 0, r.rotate || 0, s));
}
function o0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const Gj = /* @__PURE__ */ r1(0, 0.5, Zb), Fj = /* @__PURE__ */ r1(0.5, 0.95, Sn);
function r1(n, a, r) {
  return (s) => s < n ? 0 : s > a ? 1 : r(/* @__PURE__ */ Zr(n, a, s));
}
function Xj(n, a, r) {
  const s = Ot(n) ? n : Nl(n);
  return s.start(Mh("", s, a, r)), s.animation;
}
function Wr(n, a, r, s = { passive: !0 }) {
  return n.addEventListener(a, r, s), () => n.removeEventListener(a, r);
}
const $j = (n, a) => n.depth - a.depth;
class Kj {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(a) {
    mh(this.children, a), this.isDirty = !0;
  }
  remove(a) {
    au(this.children, a), this.isDirty = !0;
  }
  forEach(a) {
    this.isDirty && this.children.sort($j), this.isDirty = !1, this.children.forEach(a);
  }
}
function Qj(n, a) {
  const r = kt.now(), s = ({ timestamp: o }) => {
    const c = o - r;
    c >= a && (Wa(s), n(c - a));
  };
  return Je.setup(s, !0), () => Wa(s);
}
function Io(n) {
  return Ot(n) ? n.get() : n;
}
class Zj {
  constructor() {
    this.members = [];
  }
  add(a) {
    mh(this.members, a);
    for (let r = this.members.length - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s === a || s === this.lead || s === this.prevLead)
        continue;
      const o = s.instance;
      (!o || o.isConnected === !1) && !s.snapshot && (au(this.members, s), s.unmount());
    }
    a.scheduleRender();
  }
  remove(a) {
    if (au(this.members, a), a === this.prevLead && (this.prevLead = void 0), a === this.lead) {
      const r = this.members[this.members.length - 1];
      r && this.promote(r);
    }
  }
  relegate(a) {
    for (let r = this.members.indexOf(a) - 1; r >= 0; r--) {
      const s = this.members[r];
      if (s.isPresent !== !1 && s.instance?.isConnected !== !1)
        return this.promote(s), !0;
    }
    return !1;
  }
  promote(a, r) {
    const s = this.lead;
    if (a !== s && (this.prevLead = s, this.lead = a, a.show(), s)) {
      s.updateSnapshot(), a.scheduleRender();
      const { layoutDependency: o } = s.options, { layoutDependency: c } = a.options;
      (o === void 0 || o !== c) && (a.resumeFrom = s, r && (s.preserveOpacity = !0), s.snapshot && (a.snapshot = s.snapshot, a.snapshot.latestValues = s.animationValues || s.latestValues), a.root?.isUpdating && (a.isLayoutDirty = !0)), a.options.crossfade === !1 && s.hide();
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
const Jo = {
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
}, ad = ["", "X", "Y", "Z"], Ij = 1e3;
let Jj = 0;
function id(n, a, r, s) {
  const { latestValues: o } = a;
  o[n] && (r[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function s1(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const r = CS(a);
  if (window.MotionHasOptimisedAnimation(r, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(r, "transform", Je, !(o || c));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && s1(s);
}
function o1({ attachResizeListener: n, defaultParent: a, measureScroll: r, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = Jj++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(t2), this.nodes.forEach(s2), this.nodes.forEach(o2), this.nodes.forEach(n2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Kj());
    }
    addEventListener(d, h) {
      return this.eventHandlers.has(d) || this.eventHandlers.set(d, new ph()), this.eventHandlers.get(d).add(h);
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
      this.isSVG = zh(d) && !tj(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let y, v = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Je.read(() => {
          v = window.innerWidth;
        }), n(d, () => {
          const E = window.innerWidth;
          E !== v && (v = E, this.root.updateBlockedByResize = !0, y && y(), y = Qj(S, 250), Jo.hasAnimatedSinceResize && (Jo.hasAnimatedSinceResize = !1, this.nodes.forEach(f0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: v, hasRelativeLayoutChanged: S, layout: E }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || m.getDefaultTransition() || h2, { onLayoutAnimationStart: C, onLayoutAnimationComplete: D } = m.getProps(), z = !this.targetLayout || !i1(this.targetLayout, E), V = !v && S;
        if (this.options.layoutRoot || this.resumeFrom || V || v && (z || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const U = {
            ...wh(R, "layout"),
            onPlay: C,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (U.delay = 0, U.type = !1), this.startAnimation(U), this.setAnimationOrigin(y, V);
        } else
          v || f0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = E;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Wa(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(u2), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && s1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(i2), this.nodes.forEach(u0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(c0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(l2), this.nodes.forEach(r2), this.nodes.forEach(Wj), this.nodes.forEach(e2)) : this.nodes.forEach(c0), this.clearAllSnapshots();
      const h = kt.now();
      zt.delta = Fn(0, 1e3 / 60, h - zt.timestamp), zt.timestamp = h, zt.isProcessing = !0, Qf.update.process(zt), Qf.preRender.process(zt), Qf.render.process(zt), zt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Dh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(a2), this.sharedNodes.forEach(c2);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Je.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Je.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Pt(this.snapshot.measuredBox.x) && !Pt(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const d = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Rt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
          offset: r(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !a1(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || wi(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), m2(p), {
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
        return Rt();
      const h = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(p2))) {
        const { scroll: m } = this.root;
        m && (kn(h.x, m.offset.x), kn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(d) {
      const h = Rt();
      if (jn(h, d), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: y, options: v } = m;
        m !== this.root && y && v.layoutScroll && (y.wasRoot && jn(h, d), kn(h.x, y.offset.x), kn(h.y, y.offset.y));
      }
      return h;
    }
    applyTransform(d, h = !1, p) {
      const m = p || Rt();
      jn(m, d);
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (kn(m.x, -v.scroll.offset.x), kn(m.y, -v.scroll.offset.y)), wi(v.latestValues) && Zo(m, v.latestValues, v.layout?.layoutBox);
      }
      return wi(this.latestValues) && Zo(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = Rt();
      jn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!wi(m.latestValues))
          continue;
        let y;
        m.instance && (kd(m.latestValues) && m.updateSnapshot(), y = Rt(), jn(y, m.measurePageBox())), e0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return wi(this.latestValues) && e0(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== zt.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (!(d || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: y, layoutId: v } = this.options;
      if (!this.layout || !(y || v))
        return;
      this.resolvedRelativeTargetAt = zt.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Rt(), this.targetWithTransforms = Rt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Uj(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : jn(this.target, this.layout.layoutBox), FS(this.target, this.targetDelta)) : jn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || kd(this.parent.latestValues) || GS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Rt(), this.relativeTargetOrigin = Rt(), fu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), jn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const d = this.getLead(), h = !!this.resumingFrom || this !== d;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === zt.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      jn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, S = this.treeScale.y;
      fj(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Rt());
      const { target: E } = d;
      if (!E) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Kv(this.prevProjectionDelta.x, this.projectionDelta.x), Kv(this.prevProjectionDelta.y, this.projectionDelta.y)), Fr(this.projectionDelta, this.layoutCorrected, E, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== S || !l0(this.projectionDelta.x, this.prevProjectionDelta.x) || !l0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", E));
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
      this.prevProjectionDelta = Cl(), this.projectionDelta = Cl(), this.projectionDeltaWithTransform = Cl();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, v = Cl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = Rt(), E = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, C = E !== R, D = this.getStack(), z = !D || D.members.length <= 1, V = !!(C && !z && this.options.crossfade === !0 && !this.path.some(d2));
      this.animationProgress = 0;
      let U;
      this.mixTargetDelta = (G) => {
        const J = G / 1e3;
        d0(v.x, d.x, J), d0(v.y, d.y, J), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (fu(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), f2(this.relativeTarget, this.relativeTargetOrigin, S, J), U && qj(this.relativeTarget, U) && (this.isProjectionDirty = !1), U || (U = Rt()), jn(U, this.relativeTarget)), C && (this.animationValues = y, Yj(y, m, this.latestValues, J, V, z)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = J;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Wa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Je.update(() => {
        Jo.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Nl(0)), this.motionValue.jump(0, !1), this.currentAnimation = Xj(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Ij), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && u1(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || Rt();
          const v = Pt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + v;
          const S = Pt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        jn(h, p), Zo(h, y), Fr(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new Zj()), this.sharedNodes.get(d).add(h);
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
      p.z && id("z", d, m, this.animationValues);
      for (let y = 0; y < ad.length; y++)
        id(`rotate${ad[y]}`, d, m, this.animationValues), id(`skew${ad[y]}`, d, m, this.animationValues);
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
        this.needsReset = !1, d.visibility = "", d.opacity = "", d.pointerEvents = Io(h?.pointerEvents) || "", d.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Io(h?.pointerEvents) || ""), this.hasProjected && !wi(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = kj(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (v = p(y, v)), d.transform = v;
      const { x: S, y: E } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${E.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const R in Yd) {
        if (y[R] === void 0)
          continue;
        const { correct: C, applyTo: D, isCSSVariable: z } = Yd[R], V = v === "none" ? y[R] : C(y[R], m);
        if (D) {
          const U = D.length;
          for (let G = 0; G < U; G++)
            d[D[G]] = V;
        } else
          z ? this.options.visualElement.renderState.vars[R] = V : d[R] = V;
      }
      this.options.layoutId && (d.pointerEvents = m === this ? Io(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()), this.root.nodes.forEach(u0), this.root.sharedNodes.clear();
    }
  };
}
function Wj(n) {
  n.updateLayout();
}
function e2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: s } = n.layout, { animationType: o } = n.options, c = a.source !== n.layout.source;
    if (o === "size")
      qn((y) => {
        const v = c ? a.measuredBox[y] : a.layoutBox[y], S = Pt(v);
        v.min = r[y].min, v.max = v.min + S;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      Gd(c ? a.measuredBox[y] : a.layoutBox[y], r[y]);
    } else u1(o, a.layoutBox, r) && qn((y) => {
      const v = c ? a.measuredBox[y] : a.layoutBox[y], S = Pt(r[y]);
      v.max = v.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + S);
    });
    const d = Cl();
    Fr(d, r, a.layoutBox);
    const h = Cl();
    c ? Fr(h, n.applyTransform(s, !0), a.measuredBox) : Fr(h, r, a.layoutBox);
    const p = !a1(d);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: v, layout: S } = y;
        if (v && S) {
          const E = n.options.layoutAnchor || void 0, R = Rt();
          fu(R, a.layoutBox, v.layoutBox, E);
          const C = Rt();
          fu(C, r, S.layoutBox, E), i1(R, C) || (m = !0), y.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = R, n.relativeParent = y);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: r,
      snapshot: a,
      delta: h,
      layoutDelta: d,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (n.isLead()) {
    const { onExitComplete: r } = n.options;
    r && r();
  }
  n.options.transition = void 0;
}
function t2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function n2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function a2(n) {
  n.clearSnapshot();
}
function u0(n) {
  n.clearMeasurements();
}
function i2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function c0(n) {
  n.isLayoutDirty = !1;
}
function l2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function r2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function f0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function s2(n) {
  n.resolveTargetDelta();
}
function o2(n) {
  n.calcProjection();
}
function u2(n) {
  n.resetSkewAndRotation();
}
function c2(n) {
  n.removeLeadSnapshot();
}
function d0(n, a, r) {
  n.translate = at(a.translate, 0, r), n.scale = at(a.scale, 1, r), n.origin = a.origin, n.originPoint = a.originPoint;
}
function h0(n, a, r, s) {
  n.min = at(a.min, r.min, s), n.max = at(a.max, r.max, s);
}
function f2(n, a, r, s) {
  h0(n.x, a.x, r.x, s), h0(n.y, a.y, r.y, s);
}
function d2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const h2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, m0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), p0 = m0("applewebkit/") && !m0("chrome/") ? Math.round : Sn;
function y0(n) {
  n.min = p0(n.min), n.max = p0(n.max);
}
function m2(n) {
  y0(n.x), y0(n.y);
}
function u1(n, a, r) {
  return n === "position" || n === "preserve-aspect" && !Lj(i0(a), i0(r), 0.2);
}
function p2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const y2 = o1({
  attachResizeListener: (n, a) => Wr(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), ld = {
  current: void 0
}, c1 = o1({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!ld.current) {
      const n = new y2({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), ld.current = n;
    }
    return ld.current;
  },
  resetTransform: (n, a) => {
    n.style.transform = a !== void 0 ? a : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
}), Bh = T.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
});
function g0(n, a) {
  if (typeof n == "function")
    return n(a);
  n != null && (n.current = a);
}
function g2(...n) {
  return (a) => {
    let r = !1;
    const s = n.map((o) => {
      const c = g0(o, a);
      return !r && typeof c == "function" && (r = !0), c;
    });
    if (r)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const c = s[o];
          typeof c == "function" ? c() : g0(n[o], null);
        }
      };
  };
}
function v2(...n) {
  return T.useCallback(g2(...n), n);
}
class b2 extends T.Component {
  getSnapshotBeforeUpdate(a) {
    const r = this.props.childRef.current;
    if (Fo(r) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = r.offsetParent, o = Fo(s) && s.offsetWidth || 0, c = Fo(s) && s.offsetHeight || 0, d = getComputedStyle(r), h = this.props.sizeRef.current;
      h.height = parseFloat(d.height), h.width = parseFloat(d.width), h.top = r.offsetTop, h.left = r.offsetLeft, h.right = o - h.width - h.left, h.bottom = c - h.height - h.top;
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
function S2({ children: n, isPresent: a, anchorX: r, anchorY: s, root: o, pop: c }) {
  const d = T.useId(), h = T.useRef(null), p = T.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = T.useContext(Bh), y = n.props?.ref ?? n?.ref, v = v2(h, y);
  return T.useInsertionEffect(() => {
    const { width: S, height: E, top: R, left: C, right: D, bottom: z } = p.current;
    if (a || c === !1 || !h.current || !S || !E)
      return;
    const V = r === "left" ? `left: ${C}` : `right: ${D}`, U = s === "bottom" ? `bottom: ${z}` : `top: ${R}`;
    h.current.dataset.motionPopId = d;
    const G = document.createElement("style");
    m && (G.nonce = m);
    const J = o ?? document.head;
    return J.appendChild(G), G.sheet && G.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${V}px !important;
            ${U}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), J.contains(G) && J.removeChild(G);
    };
  }, [a]), b.jsx(b2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? n : T.cloneElement(n, { ref: v }) });
}
const x2 = ({ children: n, initial: a, isPresent: r, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const y = hh(E2), v = T.useId();
  let S = !0, E = T.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: r,
    custom: o,
    onExitComplete: (R) => {
      y.set(R, !0);
      for (const C of y.values())
        if (!C)
          return;
      s && s();
    },
    register: (R) => (y.set(R, !1), () => y.delete(R))
  }), [r, y, s]);
  return c && S && (E = { ...E }), T.useMemo(() => {
    y.forEach((R, C) => y.set(C, !1));
  }, [r]), T.useEffect(() => {
    !r && !y.size && s && s();
  }, [r]), n = b.jsx(S2, { pop: d === "popLayout", isPresent: r, anchorX: h, anchorY: p, root: m, children: n }), b.jsx(bu.Provider, { value: E, children: n });
};
function E2() {
  return /* @__PURE__ */ new Map();
}
function f1(n = !0) {
  const a = T.useContext(bu);
  if (a === null)
    return [!0, null];
  const { isPresent: r, onExitComplete: s, register: o } = a, c = T.useId();
  T.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const d = T.useCallback(() => n && s && s(c), [c, s, n]);
  return !r && s ? [!1, d] : [!0];
}
const Uo = (n) => n.key || "";
function v0(n) {
  const a = [];
  return T.Children.forEach(n, (r) => {
    T.isValidElement(r) && a.push(r);
  }), a;
}
const T2 = ({ children: n, custom: a, initial: r = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, v] = f1(d), S = T.useMemo(() => v0(n), [n]), E = d && !y ? [] : S.map(Uo), R = T.useRef(!0), C = T.useRef(S), D = hh(() => /* @__PURE__ */ new Map()), z = T.useRef(/* @__PURE__ */ new Set()), [V, U] = T.useState(S), [G, J] = T.useState(S);
  Bb(() => {
    R.current = !1, C.current = S;
    for (let j = 0; j < G.length; j++) {
      const Z = Uo(G[j]);
      E.includes(Z) ? (D.delete(Z), z.current.delete(Z)) : D.get(Z) !== !0 && D.set(Z, !1);
    }
  }, [G, E.length, E.join("-")]);
  const W = [];
  if (S !== V) {
    let j = [...S];
    for (let Z = 0; Z < G.length; Z++) {
      const ne = G[Z], ue = Uo(ne);
      E.includes(ue) || (j.splice(Z, 0, ne), W.push(ne));
    }
    return c === "wait" && W.length && (j = W), J(v0(j)), U(S), null;
  }
  const { forceRender: te } = T.useContext(dh);
  return b.jsx(b.Fragment, { children: G.map((j) => {
    const Z = Uo(j), ne = d && !y ? !1 : S === G || E.includes(Z), ue = () => {
      if (z.current.has(Z))
        return;
      if (D.has(Z))
        z.current.add(Z), D.set(Z, !0);
      else
        return;
      let I = !0;
      D.forEach((Y) => {
        Y || (I = !1);
      }), I && (te?.(), J(C.current), d && v?.(), s && s());
    };
    return b.jsx(x2, { isPresent: ne, initial: !R.current || r ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: ne ? void 0 : ue, anchorX: h, anchorY: p, children: j }, Z);
  }) });
}, d1 = T.createContext({ strict: !1 }), b0 = {
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
let S0 = !1;
function R2() {
  if (S0)
    return;
  const n = {};
  for (const a in b0)
    n[a] = {
      isEnabled: (r) => b0[a].some((s) => !!r[s])
    };
  kS(n), S0 = !0;
}
function h1() {
  return R2(), sj();
}
function w2(n) {
  const a = h1();
  for (const r in n)
    a[r] = {
      ...a[r],
      ...n[r]
    };
  kS(a);
}
const M2 = /* @__PURE__ */ new Set([
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
function du(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || M2.has(n);
}
let m1 = (n) => !du(n);
function C2(n) {
  typeof n == "function" && (m1 = (a) => a.startsWith("on") ? !du(a) : n(a));
}
try {
  C2(require("@emotion/is-prop-valid").default);
} catch {
}
function A2(n, a, r) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ot(n[o]) || (m1(o) || r === !0 && du(o) || !a && !du(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Tu = /* @__PURE__ */ T.createContext({});
function j2(n, a) {
  if (Eu(n)) {
    const { initial: r, animate: s } = n;
    return {
      initial: r === !1 || Jr(r) ? r : void 0,
      animate: Jr(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function D2(n) {
  const { initial: a, animate: r } = j2(n, T.useContext(Tu));
  return T.useMemo(() => ({ initial: a, animate: r }), [x0(a), x0(r)]);
}
function x0(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Hh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function p1(n, a, r) {
  for (const s in a)
    !Ot(a[s]) && !KS(s, r) && (n[s] = a[s]);
}
function N2({ transformTemplate: n }, a) {
  return T.useMemo(() => {
    const r = Hh();
    return Uh(r, a, n), Object.assign({}, r.vars, r.style);
  }, [a]);
}
function z2(n, a) {
  const r = n.style || {}, s = {};
  return p1(s, r, n), Object.assign(s, N2(n, a)), s;
}
function O2(n, a) {
  const r = {}, s = z2(n, a);
  return n.drag && n.dragListener !== !1 && (r.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (r.tabIndex = 0), r.style = s, r;
}
const y1 = () => ({
  ...Hh(),
  attrs: {}
});
function _2(n, a, r, s) {
  const o = T.useMemo(() => {
    const c = y1();
    return QS(c, a, IS(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    p1(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const L2 = [
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
function qh(n) {
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
      !!(L2.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function U2(n, a, r, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? qh(n) ? _2 : O2)(a, s, o, n), m = A2(a, typeof n == "string", c), y = n !== T.Fragment ? { ...m, ...p, ref: r } : {}, { children: v } = a, S = T.useMemo(() => Ot(v) ? v.get() : v, [v]);
  return T.createElement(n, {
    ...y,
    children: S
  });
}
function V2({ scrapeMotionValuesFromProps: n, createRenderState: a }, r, s, o) {
  return {
    latestValues: B2(r, s, o, n),
    renderState: a()
  };
}
function B2(n, a, r, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = Io(c[S]);
  let { initial: d, animate: h } = n;
  const p = Eu(n), m = HS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let y = r ? r.initial === !1 : !1;
  y = y || d === !1;
  const v = y ? h : d;
  if (v && typeof v != "boolean" && !xu(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let E = 0; E < S.length; E++) {
      const R = Ch(n, S[E]);
      if (R) {
        const { transitionEnd: C, transition: D, ...z } = R;
        for (const V in z) {
          let U = z[V];
          if (Array.isArray(U)) {
            const G = y ? U.length - 1 : 0;
            U = U[G];
          }
          U !== null && (o[V] = U);
        }
        for (const V in C)
          o[V] = C[V];
      }
    }
  }
  return o;
}
const g1 = (n) => (a, r) => {
  const s = T.useContext(Tu), o = T.useContext(bu), c = () => V2(n, a, s, o);
  return r ? c() : hh(c);
}, H2 = /* @__PURE__ */ g1({
  scrapeMotionValuesFromProps: Vh,
  createRenderState: Hh
}), q2 = /* @__PURE__ */ g1({
  scrapeMotionValuesFromProps: JS,
  createRenderState: y1
}), k2 = Symbol.for("motionComponentSymbol");
function P2(n, a, r) {
  const s = T.useRef(r);
  T.useInsertionEffect(() => {
    s.current = r;
  });
  const o = T.useRef(null);
  return T.useCallback((c) => {
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
const v1 = T.createContext({});
function Tl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function Y2(n, a, r, s, o, c) {
  const { visualElement: d } = T.useContext(Tu), h = T.useContext(d1), p = T.useContext(bu), m = T.useContext(Bh), y = m.reducedMotion, v = m.skipAnimations, S = T.useRef(null), E = T.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: r,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: v,
    isSVG: c
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const R = S.current, C = T.useContext(v1);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && G2(S.current, r, o, C);
  const D = T.useRef(!1);
  T.useInsertionEffect(() => {
    R && D.current && R.update(r, p);
  });
  const z = r[MS], V = T.useRef(!!z && typeof window < "u" && !window.MotionHandoffIsComplete?.(z) && window.MotionHasOptimisedAnimation?.(z));
  return Bb(() => {
    E.current = !0, R && (D.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), V.current && R.animationState && R.animationState.animateChanges());
  }), T.useEffect(() => {
    R && (!V.current && R.animationState && R.animationState.animateChanges(), V.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(z);
    }), V.current = !1), R.enteringChildren = void 0);
  }), R;
}
function G2(n, a, r, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: v } = a;
  n.projection = new r(n.latestValues, a["data-framer-portal-id"] ? void 0 : b1(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!d || h && Tl(h),
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
    crossfade: v,
    layoutScroll: p,
    layoutRoot: m,
    layoutAnchor: y
  });
}
function b1(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : b1(n.parent);
}
function rd(n, { forwardMotionProps: a = !1, type: r } = {}, s, o) {
  s && w2(s);
  const c = r ? r === "svg" : qh(n), d = c ? q2 : H2;
  function h(m, y) {
    let v;
    const S = {
      ...T.useContext(Bh),
      ...m,
      layoutId: F2(m)
    }, { isStatic: E } = S, R = D2(m), C = d(m, E);
    if (!E && typeof window < "u") {
      X2();
      const D = $2(S);
      v = D.MeasureLayout, R.visualElement = Y2(n, C, S, o, D.ProjectionNode, c);
    }
    return b.jsxs(Tu.Provider, { value: R, children: [v && R.visualElement ? b.jsx(v, { visualElement: R.visualElement, ...S }) : null, U2(n, m, P2(C, R.visualElement, y), C, E, a, c)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = T.forwardRef(h);
  return p[k2] = n, p;
}
function F2({ layoutId: n }) {
  const a = T.useContext(dh).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function X2(n, a) {
  T.useContext(d1).strict;
}
function $2(n) {
  const a = h1(), { drag: r, layout: s } = a;
  if (!r && !s)
    return {};
  const o = { ...r, ...s };
  return {
    MeasureLayout: r?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function K2(n, a) {
  if (typeof Proxy > "u")
    return rd;
  const r = /* @__PURE__ */ new Map(), s = (c, d) => rd(c, d, n, a), o = (c, d) => s(c, d);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, d) => d === "create" ? s : (r.has(d) || r.set(d, rd(d, void 0, n, a)), r.get(d))
  });
}
const Q2 = (n, a) => a.isSVG ?? qh(n) ? new Rj(a) : new vj(a, {
  allowProjection: n !== T.Fragment
});
class Z2 extends ei {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = jj(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    xu(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: r } = this.node.prevProps || {};
    a !== r && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let I2 = 0;
class J2 extends ei {
  constructor() {
    super(...arguments), this.id = I2++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: r } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: d } = this.node.getProps();
        if (typeof c == "string") {
          const h = Di(this.node, c, d);
          if (h) {
            const { transition: p, transitionEnd: m, ...y } = h;
            for (const v in y)
              this.node.getValue(v)?.jump(y[v]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const o = this.node.animationState.setActive("exit", !a);
    r && !a && o.then(() => {
      this.isExitComplete = !0, r(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: r } = this.node.presenceContext || {};
    r && r(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const W2 = {
  animation: {
    Feature: Z2
  },
  exit: {
    Feature: J2
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
const eD = (n) => (a) => Nh(a) && n(a, fs(a));
function Xr(n, a, r, s) {
  return Wr(n, a, eD(r), s);
}
const S1 = ({ current: n }) => n ? n.ownerDocument.defaultView : null, E0 = (n, a) => Math.abs(n - a);
function tD(n, a) {
  const r = E0(n.x, a.x), s = E0(n.y, a.y);
  return Math.sqrt(r ** 2 + s ** 2);
}
const T0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class x1 {
  constructor(a, r, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (E) => {
      this.handleScroll(E.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Vo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const E = sd(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, C = tD(E.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !C)
        return;
      const { point: D } = E, { timestamp: z } = zt;
      this.history.push({ ...D, timestamp: z });
      const { onStart: V, onMove: U } = this.handlers;
      R || (V && V(this.lastMoveEvent, E), this.startEvent = this.lastMoveEvent), U && U(this.lastMoveEvent, E);
    }, this.handlePointerMove = (E, R) => {
      this.lastMoveEvent = E, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = Vo(R, this.transformPagePoint), Je.update(this.updatePoint, !0);
    }, this.handlePointerUp = (E, R) => {
      this.end();
      const { onEnd: C, onSessionEnd: D, resumeAnimation: z } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && z && z(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const V = sd(E.type === "pointercancel" ? this.lastMoveEventInfo : Vo(R, this.transformPagePoint), this.history);
      this.startEvent && C && C(E, V), D && D(E, V);
    }, !Nh(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = r, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = fs(a), m = Vo(p, this.transformPagePoint), { point: y } = m, { timestamp: v } = zt;
    this.history = [{ ...y, timestamp: v }];
    const { onSessionStart: S } = r;
    S && S(a, sd(m, this.history)), this.removeListeners = os(Xr(this.contextWindow, "pointermove", this.handlePointerMove), Xr(this.contextWindow, "pointerup", this.handlePointerUp), Xr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(a) {
    let r = a.parentElement;
    for (; r; ) {
      const s = getComputedStyle(r);
      (T0.has(s.overflowX) || T0.has(s.overflowY)) && this.scrollPositions.set(r, {
        x: r.scrollLeft,
        y: r.scrollTop
      }), r = r.parentElement;
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
    const r = this.scrollPositions.get(a);
    if (!r)
      return;
    const s = a === window, o = s ? { x: window.scrollX, y: window.scrollY } : {
      x: a.scrollLeft,
      y: a.scrollTop
    }, c = { x: o.x - r.x, y: o.y - r.y };
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), Je.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Wa(this.updatePoint);
  }
}
function Vo(n, a) {
  return a ? { point: a(n.point) } : n;
}
function R0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function sd({ point: n }, a) {
  return {
    point: n,
    delta: R0(n, E1(a)),
    offset: R0(n, nD(a)),
    velocity: aD(a, 0.1)
  };
}
function nD(n) {
  return n[0];
}
function E1(n) {
  return n[n.length - 1];
}
function aD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let r = n.length - 1, s = null;
  const o = E1(n);
  for (; r >= 0 && (s = n[r], !(o.timestamp - s.timestamp > /* @__PURE__ */ It(a))); )
    r--;
  if (!s)
    return { x: 0, y: 0 };
  s === n[0] && n.length > 2 && o.timestamp - s.timestamp > /* @__PURE__ */ It(a) * 2 && (s = n[1]);
  const c = /* @__PURE__ */ vn(o.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const d = {
    x: (o.x - s.x) / c,
    y: (o.y - s.y) / c
  };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function iD(n, { min: a, max: r }, s) {
  return a !== void 0 && n < a ? n = s ? at(a, n, s.min) : Math.max(n, a) : r !== void 0 && n > r && (n = s ? at(r, n, s.max) : Math.min(n, r)), n;
}
function w0(n, a, r) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: r !== void 0 ? n.max + r - (n.max - n.min) : void 0
  };
}
function lD(n, { top: a, left: r, bottom: s, right: o }) {
  return {
    x: w0(n.x, r, o),
    y: w0(n.y, a, s)
  };
}
function M0(n, a) {
  let r = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([r, s] = [s, r]), { min: r, max: s };
}
function rD(n, a) {
  return {
    x: M0(n.x, a.x),
    y: M0(n.y, a.y)
  };
}
function sD(n, a) {
  let r = 0.5;
  const s = Pt(n), o = Pt(a);
  return o > s ? r = /* @__PURE__ */ Zr(a.min, a.max - s, n.min) : s > o && (r = /* @__PURE__ */ Zr(n.min, n.max - o, a.min)), Fn(0, 1, r);
}
function oD(n, a) {
  const r = {};
  return a.min !== void 0 && (r.min = a.min - n.min), a.max !== void 0 && (r.max = a.max - n.min), r;
}
const Fd = 0.35;
function uD(n = Fd) {
  return n === !1 ? n = 0 : n === !0 && (n = Fd), {
    x: C0(n, "left", "right"),
    y: C0(n, "top", "bottom")
  };
}
function C0(n, a, r) {
  return {
    min: A0(n, a),
    max: A0(n, r)
  };
}
function A0(n, a) {
  return typeof n == "number" ? n : n[a] || 0;
}
const cD = /* @__PURE__ */ new WeakMap();
class fD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Rt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: r = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (v) => {
      r && this.snapToCursor(fs(v).point), this.stopAnimation();
    }, d = (v, S) => {
      const { drag: E, dragPropagation: R, onDragStart: C } = this.getProps();
      if (E && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = BA(E), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), qn((z) => {
        let V = this.getAxisMotionValue(z).get() || 0;
        if (Yn.test(V)) {
          const { projection: U } = this.visualElement;
          if (U && U.layout) {
            const G = U.layout.layoutBox[z];
            G && (V = Pt(G) * (parseFloat(V) / 100));
          }
        }
        this.originPoint[z] = V;
      }), C && Je.update(() => C(v, S), !1, !0), Vd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S;
      const { dragPropagation: E, dragDirectionLock: R, onDirectionLock: C, onDrag: D } = this.getProps();
      if (!E && !this.openDragLock)
        return;
      const { offset: z } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = hD(z), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, z), this.updateAxis("y", S.point, z), this.visualElement.render(), D && Je.update(() => D(v, S), !1, !0);
    }, p = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S, this.stop(v, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new x1(a, {
      onSessionStart: c,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: S1(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(a, r) {
    const s = a || this.latestPointerEvent, o = r || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !o || !s)
      return;
    const { velocity: d } = o;
    this.startAnimation(d);
    const { onDragEnd: h } = this.getProps();
    h && Je.postRender(() => h(s, o));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: a, animationState: r } = this.visualElement;
    a && (a.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), r && r.setActive("whileDrag", !1);
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
  updateAxis(a, r, s) {
    const { drag: o } = this.getProps();
    if (!s || !Bo(a, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(a);
    let d = this.originPoint[a] + s[a];
    this.constraints && this.constraints[a] && (d = iD(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: r } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Tl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = lD(s.layoutBox, a) : this.constraints = !1, this.elastic = uD(r), o !== this.constraints && !Tl(a) && s && this.constraints && !this.hasMutatedConstraints && qn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = oD(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: r } = this.getProps();
    if (!a || !Tl(a))
      return !1;
    const s = a.current;
    Ni(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = dj(s, o.root, this.visualElement.getTransformPagePoint());
    let d = rD(o.layout.layoutBox, c);
    if (r) {
      const h = r(uj(d));
      this.hasMutatedConstraints = !!h, h && (d = YS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: r, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = qn((y) => {
      if (!Bo(y, r, this.currentDirection))
        return;
      let v = p && p[y] || {};
      (d === !0 || d === y) && (v = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, E = o ? 40 : 1e7, R = {
        type: "inertia",
        velocity: s ? a[y] : 0,
        bounceStiffness: S,
        bounceDamping: E,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...v
      };
      return this.startAxisValueAnimation(y, R);
    });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(a, r) {
    const s = this.getAxisMotionValue(a);
    return Vd(this.visualElement, a), s.start(Mh(a, s, 0, r, this.visualElement, !1));
  }
  stopAnimation() {
    qn((a) => this.getAxisMotionValue(a).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(a) {
    const r = `_drag${a.toUpperCase()}`, s = this.visualElement.getProps(), o = s[r];
    return o || this.visualElement.getValue(a, (s.initial ? s.initial[a] : void 0) || 0);
  }
  snapToCursor(a) {
    qn((r) => {
      const { drag: s } = this.getProps();
      if (!Bo(r, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(r);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[r], p = c.get() || 0;
        c.set(a[r] - at(d, h, 0.5) + p);
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
    const { drag: a, dragConstraints: r } = this.getProps(), { projection: s } = this.visualElement;
    if (!Tl(r) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    qn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = sD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), qn((d) => {
      if (!Bo(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(at(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    cD.set(this.visualElement, this);
    const a = this.visualElement.current, r = Xr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: v = !0 } = this.getProps(), S = m.target, E = S !== a && GA(S);
      y && v && !E && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      Tl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = dD(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Je.read(o);
    const h = Wr(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (qn((v) => {
        const S = this.getAxisMotionValue(v);
        S && (this.originPoint[v] += m[v].translate, S.set(S.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), r(), d(), p && p(), s && s();
    };
  }
  getProps() {
    const a = this.visualElement.getProps(), { drag: r = !1, dragDirectionLock: s = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: d = Fd, dragMomentum: h = !0 } = a;
    return {
      ...a,
      drag: r,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: d,
      dragMomentum: h
    };
  }
}
function j0(n) {
  let a = !0;
  return () => {
    if (a) {
      a = !1;
      return;
    }
    n();
  };
}
function dD(n, a, r) {
  const s = Uv(n, j0(r)), o = Uv(a, j0(r));
  return () => {
    s(), o();
  };
}
function Bo(n, a, r) {
  return (a === !0 || a === n) && (r === null || r === n);
}
function hD(n, a = 10) {
  let r = null;
  return Math.abs(n.y) > a ? r = "y" : Math.abs(n.x) > a && (r = "x"), r;
}
class mD extends ei {
  constructor(a) {
    super(a), this.removeGroupControls = Sn, this.removeListeners = Sn, this.controls = new fD(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Sn;
  }
  update() {
    const { dragControls: a } = this.node.getProps(), { dragControls: r } = this.node.prevProps || {};
    a !== r && (this.removeGroupControls(), a && (this.removeGroupControls = a.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const od = (n) => (a, r) => {
  n && Je.update(() => n(a, r), !1, !0);
};
class pD extends ei {
  constructor() {
    super(...arguments), this.removePointerDownListener = Sn;
  }
  onPointerDown(a) {
    this.session = new x1(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: S1(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: r, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: od(a),
      onStart: od(r),
      onMove: od(s),
      onEnd: (c, d) => {
        delete this.session, o && Je.postRender(() => o(c, d));
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
let ud = !1;
class yD extends T.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s, layoutId: o } = this.props, { projection: c } = a;
    c && (r.group && r.group.add(c), s && s.register && o && s.register(c), ud && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Jo.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(a) {
    const { layoutDependency: r, visualElement: s, drag: o, isPresent: c } = this.props, { projection: d } = s;
    return d && (d.isPresent = c, a.layoutDependency !== r && d.setOptions({
      ...d.options,
      layoutDependency: r
    }), ud = !0, o || a.layoutDependency !== r || r === void 0 || a.isPresent !== c ? d.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? d.promote() : d.relegate() || Je.postRender(() => {
      const h = d.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: a, layoutAnchor: r } = this.props, { projection: s } = a;
    s && (s.options.layoutAnchor = r, s.root.didUpdate(), Dh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: a, layoutGroup: r, switchLayoutGroup: s } = this.props, { projection: o } = a;
    ud = !0, o && (o.scheduleCheckAfterUnmount(), r && r.group && r.group.remove(o), s && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: a } = this.props;
    a && a();
  }
  render() {
    return null;
  }
}
function T1(n) {
  const [a, r] = f1(), s = T.useContext(dh);
  return b.jsx(yD, { ...n, layoutGroup: s, switchLayoutGroup: T.useContext(v1), isPresent: a, safeToRemove: r });
}
const gD = {
  pan: {
    Feature: pD
  },
  drag: {
    Feature: mD,
    ProjectionNode: c1,
    MeasureLayout: T1
  }
};
function D0(n, a, r) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", r === "Start");
  const o = "onHover" + r, c = s[o];
  c && Je.postRender(() => c(a, fs(a)));
}
class vD extends ei {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = qA(a, (r, s) => (D0(this.node, s, "Start"), (o) => D0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class bD extends ei {
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
    this.unmount = os(Wr(this.node.current, "focus", () => this.onFocus()), Wr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function N0(n, a, r) {
  const { props: s } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && s.whileTap && n.animationState.setActive("whileTap", r === "Start");
  const o = "onTap" + (r === "End" ? "" : r), c = s[o];
  c && Je.postRender(() => c(a, fs(a)));
}
class SD extends ei {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: r, propagate: s } = this.node.props;
    this.unmount = XA(a, (o, c) => (N0(this.node, c, "Start"), (d, { success: h }) => N0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: r,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Xd = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap(), xD = (n) => {
  const a = Xd.get(n.target);
  a && a(n);
}, ED = (n) => {
  n.forEach(xD);
};
function TD({ root: n, ...a }) {
  const r = n || document;
  cd.has(r) || cd.set(r, {});
  const s = cd.get(r), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(ED, { root: n, ...a })), s[o];
}
function RD(n, a, r) {
  const s = TD(a);
  return Xd.set(n, r), s.observe(n), () => {
    Xd.delete(n), s.unobserve(n);
  };
}
const wD = {
  some: 0,
  all: 1
};
class MD extends ei {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: r, margin: s, amount: o = "some", once: c } = a, d = {
      root: r ? r.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : wD[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: v } = this.node.getProps(), S = m ? y : v;
      S && S(p);
    };
    this.stopObserver = RD(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: r } = this.node;
    ["amount", "margin", "root"].some(CD(a, r)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function CD({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (r) => n[r] !== a[r];
}
const AD = {
  inView: {
    Feature: MD
  },
  tap: {
    Feature: SD
  },
  focus: {
    Feature: bD
  },
  hover: {
    Feature: vD
  }
}, jD = {
  layout: {
    ProjectionNode: c1,
    MeasureLayout: T1
  }
}, DD = {
  ...W2,
  ...AD,
  ...gD,
  ...jD
}, kh = /* @__PURE__ */ K2(DD, Q2);
function ND() {
  !Lh.current && qS();
  const [n] = T.useState(ou.current);
  return n;
}
const Vr = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function zD({ vector: n, pulseKey: a, size: r = 220 }) {
  const s = ND(), o = r / 2, c = r / 2, d = r / 2 - 28, h = Vr.length, p = Vr.map((v, S) => {
    const E = -Math.PI / 2 + 2 * Math.PI * S / h, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(E) * d * R, y: c + Math.sin(E) * d * R };
  }), m = Vr.map((v, S) => {
    const E = -Math.PI / 2 + 2 * Math.PI * S / h;
    return { x: o + Math.cos(E) * d, y: c + Math.sin(E) * d, angle: E };
  }), y = p.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      width: r,
      height: r,
      viewBox: `0 0 ${r} ${r}`,
      role: "img",
      "aria-label": "Emotion vector radar",
      children: [
        /* @__PURE__ */ b.jsxs("g", { stroke: "currentColor", strokeOpacity: 0.18, fill: "none", children: [
          [0.25, 0.5, 0.75, 1].map((v) => /* @__PURE__ */ b.jsx(
            "polygon",
            {
              points: m.map((S) => `${o + (S.x - o) * v},${c + (S.y - c) * v}`).join(" ")
            },
            v
          )),
          m.map((v, S) => /* @__PURE__ */ b.jsx("line", { x1: o, y1: c, x2: v.x, y2: v.y }, S))
        ] }),
        /* @__PURE__ */ b.jsx(
          kh.polygon,
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
        m.map((v, S) => /* @__PURE__ */ b.jsx(
          "text",
          {
            x: o + Math.cos(v.angle) * (d + 16),
            y: c + Math.sin(v.angle) * (d + 16) + 3,
            textAnchor: "middle",
            fontSize: 10,
            fill: "currentColor",
            opacity: 0.72,
            children: Vr[S]
          },
          Vr[S]
        ))
      ]
    }
  );
}
const OD = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function _D({ vector: n, onChange: a, disabled: r = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ b.jsx("div", { className: xM, role: "group", "aria-label": "Emotion axes", children: OD.map((o, c) => /* @__PURE__ */ b.jsxs("div", { className: EM, children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: `emo-slider-${c}`, className: Lb, children: o }),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        id: `emo-slider-${c}`,
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: n[c] ?? 0,
        disabled: r,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": n[c] ?? 0,
        className: Ub
      }
    ),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
        value: Number((n[c] ?? 0).toFixed(2)),
        disabled: r,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        className: Vb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const LD = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], R1 = [0, 0, 0, 0, 0, 0, 0, 0], UD = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function VD({ value: n, onChange: a, deploymentId: r }) {
  const s = n.mode ?? "none", o = BD(n.vector), c = n.emotionAlpha ?? 1, [d, h] = T.useState([]), [p, m] = T.useState(null), [y, v] = T.useState(""), [S, E] = T.useState(""), [R, C] = T.useState(0), [D, z] = T.useState(!1), V = T.useRef(!0);
  T.useEffect(() => (V.current = !0, () => {
    V.current = !1;
  }), []), T.useEffect(() => {
    let I = !1;
    return m(null), dM(r).then((Y) => {
      I || h(z0(Y.presets));
    }).catch((Y) => {
      I || m(fd(Y));
    }), () => {
      I = !0;
    };
  }, [r]);
  const U = T.useMemo(
    () => d.find((I) => I.presetId === S) ?? null,
    [d, S]
  ), G = (I) => {
    a({ ...n, mode: I });
  }, J = (I) => {
    a({ ...n, mode: "emotion_vector", vector: I }), U && !qD(U.vector, I) && E("");
  }, W = (I) => {
    const Y = Math.max(0, Math.min(1, Number.isFinite(I) ? I : 1));
    a({ ...n, emotionAlpha: Y });
  }, te = (I) => {
    const Y = d.find((oe) => oe.presetId === I);
    Y && (E(I), a({ ...n, mode: "emotion_vector", vector: Y.vector }), C((oe) => oe + 1));
  }, j = async () => {
    const I = y.trim();
    if (I) {
      z(!0), m(null);
      try {
        const Y = await hM(r, I, o);
        if (!V.current) return;
        h((oe) => z0([Y, ...oe.filter((ee) => ee.presetId !== Y.presetId)])), E(Y.presetId), v(""), C((oe) => oe + 1);
      } catch (Y) {
        V.current && m(fd(Y));
      } finally {
        V.current && z(!1);
      }
    }
  }, Z = async (I) => {
    const Y = d;
    h((oe) => oe.filter((ee) => ee.presetId !== I)), S === I && E("");
    try {
      await mM(r, I);
    } catch (oe) {
      V.current && (h(Y), m(fd(oe)));
    }
  }, ne = () => J(R1), ue = () => {
    const I = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    J(I), C((Y) => Y + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: pM, children: [
    /* @__PURE__ */ b.jsxs("div", { className: yM, children: [
      /* @__PURE__ */ b.jsx(zD, { vector: o, pulseKey: R }),
      /* @__PURE__ */ b.jsx("span", { className: Kf, children: kD(s, U?.presetName) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: gM, children: [
      /* @__PURE__ */ b.jsx("div", { className: vM, role: "radiogroup", "aria-label": "Emotion source", children: LD.map((I) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === I.id,
          className: s === I.id ? SM : bM,
          onClick: () => G(I.id),
          children: I.label
        },
        I.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsxs("div", { className: TM, children: [
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: RM,
              value: S,
              onChange: (I) => te(I.currentTarget.value),
              "aria-label": "Load preset",
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— Load preset —" }),
                d.map((I) => /* @__PURE__ */ b.jsx("option", { value: I.presetId, children: I.presetName }, I.presetId))
              ]
            }
          ),
          S && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: MM,
              onClick: () => void Z(S),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: hv, onClick: ne, children: "Reset" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: hv, onClick: ue, children: "Random" })
        ] }),
        /* @__PURE__ */ b.jsx(_D, { vector: o, onChange: J }),
        /* @__PURE__ */ b.jsxs(
          "form",
          {
            className: jM,
            onSubmit: (I) => {
              I.preventDefault(), j();
            },
            children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "text",
                  className: DM,
                  value: y,
                  placeholder: "Name current vector",
                  onChange: (I) => v(I.currentTarget.value),
                  maxLength: 120,
                  "aria-label": "Preset name"
                }
              ),
              /* @__PURE__ */ b.jsx(
                "button",
                {
                  type: "submit",
                  className: wM,
                  disabled: D || y.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { children: [
        /* @__PURE__ */ b.jsxs("span", { className: Kf, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            className: AM,
            value: n.qwenTemplate ?? "",
            onChange: (I) => a({ ...n, mode: "qwen_template", qwenTemplate: I.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ b.jsx("p", { className: Kf, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ b.jsxs("div", { className: CM, children: [
        /* @__PURE__ */ b.jsx("span", { className: Lb, children: "alpha" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: Ub,
            onChange: (I) => W(Number(I.currentTarget.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: Number(c.toFixed(2)),
            className: Vb,
            onChange: (I) => W(Number(I.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ b.jsx("p", { className: NM, children: p }),
      /* @__PURE__ */ b.jsx("pre", { className: zM, children: UD })
    ] })
  ] });
}
function BD(n) {
  return !n || n.length !== 8 ? [...R1] : n.map((a) => HD(a));
}
function HD(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function qD(n, a) {
  for (let r = 0; r < 8; r += 1) {
    const s = n[r] ?? 0, o = a[r] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function z0(n) {
  return [...n].sort((a, r) => r.updatedAt - a.updatedAt);
}
function kD(n, a) {
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
function fd(n) {
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
const dd = [
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
function PD({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: r,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: d,
  onGenerationChange: h
}) {
  const p = (y, v) => {
    h({ ...d, [y]: v });
  }, m = dd.find((y) => y.id === o) ?? dd[0];
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Format" }),
      /* @__PURE__ */ b.jsxs("select", { value: n, onChange: (y) => a(y.currentTarget.value), children: [
        /* @__PURE__ */ b.jsx("option", { value: "mp3", children: "mp3" }),
        /* @__PURE__ */ b.jsx("option", { value: "wav", children: "wav" }),
        /* @__PURE__ */ b.jsx("option", { value: "flac", children: "flac" })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Speed" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "range",
          min: 0.5,
          max: 2,
          step: 0.05,
          value: r,
          onChange: (y) => s(Number(y.currentTarget.value))
        }
      ),
      /* @__PURE__ */ b.jsxs("output", { children: [
        r.toFixed(2),
        "×"
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: Xa,
        role: "radiogroup",
        "aria-label": "Cache policy",
        children: [
          /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Cache" }),
          dd.map((y) => /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === y.id,
              className: o === y.id ? nu : Ia,
              onClick: () => c(y.id),
              title: y.help,
              children: y.label
            },
            y.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("p", { className: Zt, "aria-live": "polite", children: m.help }),
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Temperature" }),
      /* @__PURE__ */ b.jsx(
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
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Top-p" }),
      /* @__PURE__ */ b.jsx(
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
    /* @__PURE__ */ b.jsxs("label", { className: Xa, children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Seed" }),
      /* @__PURE__ */ b.jsx(
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
const YD = ["cancelled", "failed", "partial"];
function GD({ runs: n, deploymentId: a }) {
  const r = Oi(), [s, o] = T.useState(null), [c, d] = T.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ b.jsx("p", { className: Zt, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await uh(a, p);
      r(`/${a}/runs/${m}`);
    } catch (m) {
      d(XD(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    c && /* @__PURE__ */ b.jsx("p", { className: Qr, children: c }),
    /* @__PURE__ */ b.jsx("ul", { className: Td, children: n.map((p) => {
      const m = YD.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ b.jsxs("li", { children: [
        /* @__PURE__ */ b.jsxs(ls, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          " ",
          /* @__PURE__ */ b.jsx("span", { className: FD(p.status), children: "partial — resumable" }),
          " ",
          /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: Ia,
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
function FD(n) {
  return n === "failed" ? fh : ch;
}
function XD(n) {
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function $D({ deploymentId: n, initialVoiceAssetId: a, onChange: r }) {
  const [s, o] = T.useState([]), [c, d] = T.useState(a ?? "");
  T.useEffect(() => {
    tu(n).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [n]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await yw(n, m), r?.(m);
  }
  return /* @__PURE__ */ b.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ b.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ b.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function KD(n) {
  const a = Oi(), [r, s] = T.useState("idle"), [o, c] = T.useState(null), [d, h] = T.useState(/* @__PURE__ */ new Map()), [p, m] = T.useState(null), [y, v] = T.useState(null), S = T.useRef(null);
  T.useEffect(() => () => {
    S.current?.();
  }, []);
  const E = T.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), v(null);
    try {
      const W = await Ew(n.deploymentId, n.createPayload);
      c(W.runId), s("running"), S.current?.(), S.current = dv(
        n.deploymentId,
        W.runId,
        (te) => O0(te, h, s, v, n.deploymentId, W.runId),
        () => s("error")
      );
    } catch (W) {
      s("error"), m(hd(W));
    }
  }, [n.deploymentId, n.createPayload]), R = T.useCallback(async () => {
    if (o)
      try {
        await Tw(n.deploymentId, o);
      } catch (W) {
        m(hd(W));
      }
  }, [n.deploymentId, o]), C = Array.from(d.values()).sort((W, te) => W.globalIndex - te.globalIndex), D = r === "starting" || r === "running", z = y?.status === "partial", V = C.filter((W) => W.status === "failed"), U = (() => {
    if (r !== "terminal" || V.length === 0) return null;
    const W = /* @__PURE__ */ new Map();
    for (const ne of V) {
      const ue = ne.failureCategory ?? "unknown";
      W.set(ue, (W.get(ue) ?? 0) + 1);
    }
    let te = "unknown", j = 0;
    for (const [ne, ue] of W)
      ue > j && (te = ne, j = ue);
    const Z = C.length;
    return { category: te, count: j, total: Z };
  })(), G = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, J = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { children: [
    p && /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: Qr,
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
          /* @__PURE__ */ b.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ b.jsx("span", { children: p }),
          J && /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: Ia,
              onClick: () => a(`/${n.deploymentId}/mappings`),
              style: { alignSelf: "flex-start" },
              children: "Open Mappings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: Xa, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: nu,
          disabled: !n.canGenerate || D,
          onClick: E,
          children: r === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Nb,
          disabled: !D,
          onClick: R,
          children: "Cancel"
        }
      )
    ] }),
    U && /* @__PURE__ */ b.jsxs("div", { className: Qr, role: "alert", children: [
      /* @__PURE__ */ b.jsxs("strong", { children: [
        "Run failed — ",
        U.count,
        " of ",
        U.total,
        " segments failed with ",
        /* @__PURE__ */ b.jsx("code", { children: U.category })
      ] }),
      G[U.category] && /* @__PURE__ */ b.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: G[U.category] })
    ] }),
    y?.exportArtifactRef && /* @__PURE__ */ b.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${y.exportArtifactRef}/download`,
        download: !0,
        className: Ia,
        children: "Download ZIP"
      }
    ),
    z && y && /* @__PURE__ */ b.jsxs("div", { className: zb, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ b.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Ia,
          onClick: async () => {
            try {
              const W = await uh(n.deploymentId, y.runId);
              c(W.runId), h(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = dv(
                n.deploymentId,
                W.runId,
                (te) => O0(te, h, s, v, n.deploymentId, W.runId),
                () => s("error")
              );
            } catch (W) {
              m(hd(W)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ b.jsxs("table", { className: rM, children: [
      /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "#" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Status" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Duration" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ b.jsx("tbody", { children: C.map((W) => /* @__PURE__ */ b.jsxs("tr", { className: sM, children: [
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: W.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: /* @__PURE__ */ b.jsx("span", { className: QD(W.status), children: W.status }) }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: W.durationMs ? `${W.durationMs} ms` : "—" }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: W.failureCategory ?? "" })
      ] }, W.globalIndex)) })
    ] })
  ] });
}
async function O0(n, a, r, s, o, c) {
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
      r("terminal");
      try {
        const d = await oh(o, c);
        s(d);
      } catch {
      }
      return;
  }
}
function QD(n) {
  switch (n) {
    case "completed":
      return _b;
    case "running":
      return ch;
    case "failed":
      return fh;
    default:
      return Ob;
  }
}
function hd(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
function ZD(n) {
  const a = Oi(), { attributions: r, unresolved: s, predictedFilenames: o } = T.useMemo(
    () => ID(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: lM,
        value: n.value,
        onChange: (c) => n.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: Qr, role: "alert", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      s.map((c) => /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: Ia,
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
    r.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Parsed lines" }),
      /* @__PURE__ */ b.jsx("ul", { className: Td, children: r.map((c) => /* @__PURE__ */ b.jsxs("li", { children: [
        "#",
        c.lineNumber.toString().padStart(3, "0"),
        " [",
        c.character,
        "] ",
        c.text,
        !c.hasMapping && c.character !== "Narrator" && " — unresolved"
      ] }, c.lineNumber)) })
    ] }),
    o.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Predicted filenames" }),
      /* @__PURE__ */ b.jsx("ul", { className: Td, children: o.map((c) => /* @__PURE__ */ b.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function ID(n, a, r) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((y, v) => {
    const S = y.trim();
    if (!S) return;
    const E = v + 1, R = S.match(s);
    let C = "Narrator", D = S;
    if (R && R.groups) {
      const G = (R.groups.body ?? "").trim(), J = (R.groups.rest ?? "").trim();
      C = ((G.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", D = J;
    }
    m += 1;
    const z = C.toLowerCase(), V = (d.get(z) ?? 0) + 1;
    d.set(z, V);
    const U = C === "Narrator" || r.has(z);
    U || c.add(C), o.push({ lineNumber: E, character: C, text: D, hasMapping: U }), h.push(
      `${m.toString().padStart(3, "0")}_${JD(C)}_${V.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function JD(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function WD(n) {
  const a = n.workflowCustomised ?? !1, r = n.unmappableFields ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: eM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: aM, children: [
      /* @__PURE__ */ b.jsx("h1", { className: iM, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ b.jsxs("section", { className: zb, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Workflow customised." }),
      " ",
      r.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${r.join(", ")}.`,
      " ",
      /* @__PURE__ */ b.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: tM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: Or, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ b.jsx("h2", { className: _r, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Or, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ b.jsx("h2", { className: _r, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: nM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: Or, "aria-label": "Run", children: [
        /* @__PURE__ */ b.jsx("h2", { className: _r, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Or, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ b.jsx("h2", { className: _r, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Or, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ b.jsx("h2", { className: _r, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function eN() {
  const { deployment: n, mappings: a, runs: r, workflow: s } = is(), [o, c] = T.useState(""), [d, h] = T.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = T.useState(n.defaultSpeedFactor ?? 1), [y, v] = T.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, E] = T.useState({}), [R, C] = T.useState("use_cache"), [D, z] = T.useState(n.defaultVoiceAssetId != null), V = T.useMemo(
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
  ), U = T.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const J of a)
      G.set(J.characterName.toLowerCase(), J);
    return G;
  }, [a]);
  return /* @__PURE__ */ b.jsx(
    WD,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ b.jsx(uM, { deployment: n }),
      scriptEditor: /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ b.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ b.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (G) => z(G.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ b.jsx(
            $D,
            {
              deploymentId: n.deploymentId,
              initialVoiceAssetId: n.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ b.jsx(
          ZD,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: U,
            deploymentId: n.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ b.jsx(
        VD,
        {
          value: y,
          onChange: v,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ b.jsx(
        PD,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: R,
          onCachePolicyChange: C,
          generation: S,
          onGenerationChange: E
        }
      ),
      runPanel: /* @__PURE__ */ b.jsx(
        KD,
        {
          deploymentId: n.deploymentId,
          createPayload: V,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ b.jsx(GD, { runs: r, deploymentId: n.deploymentId })
    }
  );
}
var tN = "jq2zyb3", nN = "jq2zyb4", aN = "jq2zyb5", iN = "jq2zyb6", lN = "jq2zyb7", rN = "jq2zyb8", sN = "jq2zyb9", oN = "jq2zyba", uN = "jq2zybb", cN = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, fN = "jq2zybj", dN = "jq2zybk", hN = "jq2zybl", mN = "jq2zybm", pN = "jq2zybn jq2zybm", yN = "jq2zybo", gN = "jq2zybp", vN = "jq2zybq", bN = "jq2zybr", SN = "jq2zybs", xN = "jq2zybt", EN = "jq2zybu", TN = "jq2zybv", RN = "jq2zybw", wN = "jq2zybx", MN = "jq2zyby", CN = "jq2zybz", AN = "jq2zyb10", jN = "jq2zyb11", DN = "jq2zyb12", NN = "jq2zyb13", zN = "jq2zyb14", ON = "jq2zyb15", _N = "jq2zyb16", LN = { queued: "jq2zyb18 jq2zyb17", running: "jq2zyb19 jq2zyb17", completed: "jq2zyb1a jq2zyb17", failed: "jq2zyb1b jq2zyb17", cancelled: "jq2zyb1c jq2zyb17" }, UN = "jq2zyb1d", VN = "jq2zyb1e", BN = "jq2zyb1f";
const HN = ["cancelled", "failed", "partial"];
function qN() {
  const { run: n } = is(), a = Oi(), [r, s] = T.useState(!1), [o, c] = T.useState(null), d = T.useMemo(() => kN(n), [n]), h = HN.includes(n.status) && n.kind === "batch", p = async () => {
    if (n.deploymentId) {
      s(!0), c(null);
      try {
        const { runId: m } = await uh(n.deploymentId, n.runId);
        a(`/${n.deploymentId}/runs/${m}`);
      } catch (m) {
        c(GN(m));
      } finally {
        s(!1);
      }
    }
  };
  return /* @__PURE__ */ b.jsx("main", { className: tN, children: /* @__PURE__ */ b.jsxs("div", { className: nN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: aN, children: [
      /* @__PURE__ */ b.jsxs("p", { className: iN, children: [
        n.deploymentId ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx(ls, { to: `/${n.deploymentId}/recipe`, className: lN, children: "← Back to recipe" }),
          /* @__PURE__ */ b.jsx("span", { className: rN, children: "·" })
        ] }) : null,
        /* @__PURE__ */ b.jsx("span", { children: "Run detail" })
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: sN, children: [
        /* @__PURE__ */ b.jsxs("h1", { className: oN, children: [
          PN(n.kind),
          /* @__PURE__ */ b.jsx("span", { className: uN, children: n.runId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: cN[n.status], children: n.status })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: fN, "aria-label": "Run statistics", children: [
      /* @__PURE__ */ b.jsx(Ho, { label: "Format", value: n.outputFormat.toUpperCase(), mono: !0 }),
      /* @__PURE__ */ b.jsx(Ho, { label: "Speed", value: `${n.speedFactor.toFixed(2)}×`, mono: !0 }),
      /* @__PURE__ */ b.jsx(
        Ho,
        {
          label: "Completed",
          value: `${d.completed} / ${d.total}`,
          progress: d.total > 0 ? d.completed / d.total : 0
        }
      ),
      /* @__PURE__ */ b.jsx(
        Ho,
        {
          label: "Cache hit",
          value: `${d.cacheRatio}%`,
          progress: d.cacheRatio / 100
        }
      )
    ] }),
    h && /* @__PURE__ */ b.jsxs("section", { className: gN, "aria-label": "Resume run", children: [
      /* @__PURE__ */ b.jsxs("div", { className: vN, children: [
        /* @__PURE__ */ b.jsx("p", { className: bN, children: d.failed > 0 ? `${d.failed} line${d.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
        /* @__PURE__ */ b.jsx("p", { className: SN, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: xN,
          disabled: r,
          onClick: () => void p(),
          children: r ? "Resuming…" : d.failed > 0 ? "Rerun failed lines" : "Resume run"
        }
      ),
      o && /* @__PURE__ */ b.jsx("p", { className: EN, role: "alert", children: o })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: TN, "aria-label": "Utterances", children: [
      /* @__PURE__ */ b.jsxs("div", { className: RN, children: [
        /* @__PURE__ */ b.jsx("h2", { className: wN, children: "Utterances" }),
        d.completed > 0 && /* @__PURE__ */ b.jsxs("span", { className: MN, children: [
          /* @__PURE__ */ b.jsx("span", { className: CN, children: d.cached }),
          "/",
          d.completed,
          " from cache"
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("ul", { className: AN, children: n.utterances.map((m) => /* @__PURE__ */ b.jsxs("li", { className: jN, children: [
        /* @__PURE__ */ b.jsxs("span", { className: DN, children: [
          "#",
          m.globalIndex.toString().padStart(3, "0")
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: NN, title: m.characterDisplay, children: m.characterDisplay }),
        /* @__PURE__ */ b.jsx("span", { className: zN, title: m.text, children: m.text }),
        /* @__PURE__ */ b.jsxs("span", { className: ON, children: [
          m.cacheHit && /* @__PURE__ */ b.jsx("span", { className: _N, children: "cached" }),
          m.durationMs ? /* @__PURE__ */ b.jsx("span", { children: YN(m.durationMs) }) : null,
          /* @__PURE__ */ b.jsx("span", { className: LN[m.status], children: m.status })
        ] })
      ] }, m.utteranceId)) })
    ] }),
    n.exportArtifactRef && /* @__PURE__ */ b.jsx("div", { className: UN, children: /* @__PURE__ */ b.jsxs(
      "a",
      {
        href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
        download: !0,
        className: VN,
        children: [
          "Download ZIP ",
          /* @__PURE__ */ b.jsx("span", { className: BN, children: "↓" })
        ]
      }
    ) })
  ] }) });
}
function Ho({ label: n, value: a, mono: r, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: dN,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ b.jsx("span", { className: hN, children: n }),
        /* @__PURE__ */ b.jsx("span", { className: r ? pN : mN, children: a }),
        o !== void 0 && /* @__PURE__ */ b.jsx("span", { className: yN, "aria-hidden": "true" })
      ]
    }
  );
}
function kN(n) {
  const a = n.utterances.length, r = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, c = r > 0 ? Math.round(o / r * 100) : 0;
  return { total: a, completed: r, failed: s, cached: o, cacheRatio: c };
}
function PN(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function YN(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function GN(n) {
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var FN = "pcphqj2", XN = "pcphqj3", $N = "pcphqj4", KN = "pcphqj5", QN = "pcphqj6", ZN = "pcphqj7", IN = "pcphqj8", JN = "pcphqj9", _0 = "pcphqja", WN = "pcphqjb", L0 = "pcphqjc", ez = "pcphqjd", tz = "pcphqje", nz = "pcphqjf pcphqje", az = "pcphqjg", iz = "pcphqjh", lz = "pcphqji", rz = "pcphqjj", sz = "pcphqjk pcphqjj", oz = "pcphqjl pcphqjj", uz = "pcphqjm pcphqjj", cz = "pcphqjn", md = "pcphqjo", pd = "pcphqjp", fz = "pcphqjq", dz = "pcphqjr", hz = "pcphqjs", mz = "pcphqjt", pz = "pcphqju";
function yz() {
  const [n, a] = T.useState(null), [r, s] = T.useState(null);
  return T.useEffect(() => {
    let o = !1;
    const c = async () => {
      try {
        const h = await it("/runtime/queue");
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
  }, []), /* @__PURE__ */ b.jsx("main", { className: FN, children: /* @__PURE__ */ b.jsxs("div", { className: XN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: $N, children: [
      /* @__PURE__ */ b.jsx("p", { className: KN, children: "Runtime" }),
      /* @__PURE__ */ b.jsxs("div", { className: QN, children: [
        /* @__PURE__ */ b.jsx("h1", { className: ZN, children: "Queue" }),
        /* @__PURE__ */ b.jsx("span", { className: IN, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: JN, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    r ? /* @__PURE__ */ b.jsx("section", { className: pz, role: "alert", children: r }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ b.jsx("section", { className: _0, children: /* @__PURE__ */ b.jsxs("div", { className: fz, children: [
      /* @__PURE__ */ b.jsx("span", { className: dz, children: "○" }),
      /* @__PURE__ */ b.jsx("p", { className: hz, children: "Queue is quiet" }),
      /* @__PURE__ */ b.jsx("p", { className: mz, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ b.jsx("section", { className: _0, "aria-label": "Queued runs", children: /* @__PURE__ */ b.jsx("ul", { className: WN, children: n.map((o) => {
      const c = o.position === 1;
      return /* @__PURE__ */ b.jsxs(
        "li",
        {
          className: c ? `${L0} ${ez}` : L0,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: c ? nz : tz, children: o.position }),
            /* @__PURE__ */ b.jsxs("span", { className: az, children: [
              /* @__PURE__ */ b.jsx("span", { className: iz, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ b.jsx("span", { className: lz, children: o.runId })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: gz(o.kind), children: vz(o.kind) }),
            /* @__PURE__ */ b.jsx("span", { className: cz, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: md, children: bz(o.etaSeconds) }),
              /* @__PURE__ */ b.jsx("span", { className: pd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: md, children: o.utteranceTotal }),
              /* @__PURE__ */ b.jsx("span", { className: pd, children: "lines" })
            ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: md, children: "—" }),
              /* @__PURE__ */ b.jsx("span", { className: pd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function gz(n) {
  switch (n) {
    case "batch":
      return sz;
    case "test_line":
      return oz;
    case "resume":
      return uz;
    default:
      return rz;
  }
}
function vz(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function bz(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), r = n % 60;
  return r === 0 ? `${a}m` : `${a}m ${r}s`;
}
function Sz() {
  const { deploymentId: n, prefillCharacterName: a } = is(), r = Oi(), [s, o] = T.useState(a), [c, d] = T.useState(""), [h, p] = T.useState("none"), [m, y] = T.useState(!1), [v, S] = T.useState(null), E = T.useRef(null);
  T.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const R = async (C) => {
    C.preventDefault(), y(!0), S(null);
    try {
      await Db(n, {
        characterName: s,
        speakerVoiceAssetId: c,
        defaultEmotionMode: h
      }), r(`/${n}/recipe`);
    } catch (D) {
      S(D instanceof Error ? D.message : "failed");
    } finally {
      y(!1);
    }
  };
  return /* @__PURE__ */ b.jsxs("main", { children: [
    /* @__PURE__ */ b.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ b.jsxs("form", { onSubmit: R, children: [
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ b.jsx(
          "input",
          {
            ref: E,
            value: s,
            onChange: (C) => o(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ b.jsx(
          "input",
          {
            value: c,
            onChange: (C) => d(C.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ b.jsxs("select", { value: h, onChange: (C) => p(C.currentTarget.value), children: [
          /* @__PURE__ */ b.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ b.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ b.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ b.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ b.jsx("button", { type: "submit", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ b.jsx("p", { role: "alert", children: v })
    ] })
  ] });
}
const U0 = 32, V0 = -30, B0 = -6, H0 = 0.5, q0 = 2;
class w1 extends Error {
  constructor(a, r) {
    super(r), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function xz(n, a, r) {
  const s = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = `${rs}${s}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(r)
  });
  if (c.status === 409) {
    const d = await c.json().catch(() => null), h = d?.error?.current_digest ?? "", p = d?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new w1(h, p);
  }
  if (!c.ok) {
    const h = (await c.json().catch(() => null))?.error?.message ?? `apply failed: ${c.status}`;
    throw new Error(h);
  }
  return await c.json();
}
async function Ez(n, a, r) {
  const s = `${rs}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: r })
  });
  if (!o.ok) {
    const d = (await o.json().catch(() => null))?.error?.message ?? `preview failed: ${o.status}`;
    throw new Error(d);
  }
  return o.blob();
}
function Ph() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Tz(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > U0)
    return {
      message: `Chain exceeds the maximum of ${U0} operations.`
    };
  for (const r of n.ops) {
    const s = Rz(r, a);
    if (s) return s;
  }
  return null;
}
function Rz(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return wz(n.id, n.start_ms, n.end_ms, a);
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
function wz(n, a, r, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : r <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && r > s ? { opId: n, message: "End extends past source duration." } : null;
}
var Mz = { color: { accent: "var(--_13pk47p9)" } };
function Cz(n, a) {
  const [r, s] = T.useState({
    peaks: null,
    isLoading: !0,
    error: null
  }), o = T.useRef("");
  return T.useEffect(() => {
    if (!n || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const c = `${n}::${a}`;
    if (o.current === c) return;
    o.current = c;
    let d = !1;
    return s({ peaks: null, isLoading: !0, error: null }), Az(n, a).then((h) => {
      d || s({ peaks: h, isLoading: !1, error: null });
    }).catch((h) => {
      if (d) return;
      const p = h instanceof Error ? h.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: p });
    }), () => {
      d = !0;
    };
  }, [n, a]), r;
}
async function Az(n, a) {
  const r = await fetch(n);
  if (!r.ok) throw new Error(`failed to load audio (${r.status})`);
  const s = await r.arrayBuffer(), c = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(s.slice(0));
  return jz(c, a);
}
function jz(n, a) {
  const r = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), d = [];
  for (let h = 0; h < r; h += 1) d.push(n.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let v = p; v < m; v += 1) {
      let S = 0;
      for (let R = 0; R < r; R += 1) {
        const C = d[R];
        C && (S += Math.abs(C[v] ?? 0));
      }
      const E = S / r;
      E > y && (y = E);
    }
    c[h] = y;
  }
  return c;
}
var Dz = "mquzal0", Nz = "mquzal1", k0 = "mquzal2", P0 = "mquzal3", Y0 = "mquzal4", zz = "mquzal5", G0 = "mquzal6", F0 = "mquzal7";
const Oz = 120, _z = 720;
function Lz(n) {
  const {
    audioUrl: a,
    durationMs: r,
    startMs: s,
    endMs: o,
    onChangeStart: c,
    onChangeEnd: d,
    isPlaying: h = !1,
    playbackPositionMs: p = 0,
    onSeek: m,
    width: y = _z,
    height: v = Oz
  } = n, S = T.useRef(null), E = T.useRef(null), R = T.useRef(null), [, C] = T.useState(0), D = Cz(a, y);
  T.useEffect(() => {
    Uz(S.current, D.peaks, y, v);
  }, [D.peaks, y, v]);
  const z = T.useCallback(
    (j) => {
      const Z = E.current?.getBoundingClientRect();
      if (!Z || Z.width <= 0) return 0;
      const ne = Math.max(0, Math.min(1, (j - Z.left) / Z.width));
      return Math.round(ne * r);
    },
    [r]
  );
  T.useEffect(() => {
    const j = (ne) => {
      if (!R.current) return;
      const ue = z(ne.clientX);
      R.current === "start" ? c(qo(ue, 0, o - 1)) : d(qo(ue, s + 1, r)), C((I) => I + 1);
    }, Z = () => {
      R.current = null;
    };
    return window.addEventListener("pointermove", j), window.addEventListener("pointerup", Z), () => {
      window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", Z);
    };
  }, [z, r, o, s, c, d]);
  const V = (j) => (Z) => {
    Z.preventDefault(), R.current = j;
  }, U = (j) => {
    !m || j.target.dataset.handle || m(z(j.clientX));
  }, G = (j) => (Z) => {
    const ne = Z.shiftKey ? 100 : Z.ctrlKey ? 1 : 10;
    let ue = 0;
    if (Z.key === "ArrowLeft") ue = -ne;
    else if (Z.key === "ArrowRight") ue = ne;
    else return;
    Z.preventDefault(), j === "start" ? c(qo(s + ue, 0, o - 1)) : d(qo(o + ue, s + 1, r));
  }, J = yd(s, r), W = yd(o, r), te = yd(p, r);
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      ref: E,
      className: Dz,
      style: { height: v },
      onPointerDown: U,
      children: [
        /* @__PURE__ */ b.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: v,
            className: Nz,
            "aria-label": "Audio waveform"
          }
        ),
        D.isLoading && /* @__PURE__ */ b.jsx("div", { className: F0, children: "Decoding waveform…" }),
        D.error && /* @__PURE__ */ b.jsx("div", { className: F0, role: "alert", children: D.error }),
        /* @__PURE__ */ b.jsx("div", { className: G0, style: { left: 0, width: `${J}%` } }),
        /* @__PURE__ */ b.jsx(
          "div",
          {
            className: G0,
            style: { left: `${W}%`, right: 0, width: `${100 - W}%` }
          }
        ),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            className: k0,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: V("start"),
            onKeyDown: G("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ b.jsx("span", { className: P0, "aria-hidden": "true" }),
              /* @__PURE__ */ b.jsx("span", { className: Y0, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            className: k0,
            style: { left: `${W}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": r,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: V("end"),
            onKeyDown: G("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ b.jsx("span", { className: P0, "aria-hidden": "true" }),
              /* @__PURE__ */ b.jsx("span", { className: Y0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ b.jsx("div", { className: zz, style: { left: `${te}%` }, "aria-hidden": "true" })
      ]
    }
  );
}
function yd(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function qo(n, a, r) {
  return Math.max(a, Math.min(r, n));
}
function Uz(n, a, r, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, r, s), !a || a.length === 0)) return;
  const c = s / 2, d = Vz(n, Mz.color.accent);
  o.fillStyle = d;
  const h = Math.min(a.length, r);
  for (let p = 0; p < h; p += 1) {
    const m = a[p] ?? 0, y = Math.max(1, m * (s - 4));
    o.fillRect(p, c - y / 2, 1, y);
  }
}
function Vz(n, a) {
  return getComputedStyle(n).getPropertyValue("--color-primary").trim() || a;
}
var Bz = "_1o3ytop0", Hz = "_1o3ytop1", qz = "_1o3ytop2", kz = "_1o3ytop3", gd = "_1o3ytop4", Pz = "_1o3ytop5", Yz = "_1o3ytop6", X0 = "_1o3ytop7", Gz = "_1o3ytop8", Fz = "_1o3ytop9", Xz = "_1o3ytopa", $z = "_1o3ytopb", Kz = "_1o3ytopc", Qz = "_1o3ytopd", Zz = "_1o3ytope", Iz = "_1o3ytopf", Jz = "_1o3ytopg", Wz = "_1o3ytoph", eO = "_1o3ytopi", tO = "_1o3ytopj", nO = "_1o3ytopk", aO = "_1o3ytopl";
const $0 = -16;
function iO(n) {
  const { voiceAsset: a, deploymentId: r, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, d = T.useMemo(
    () => rO(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = T.useState(() => vd(c)), [m, y] = T.useState(!1), [v, S] = T.useState(null), [E, R] = T.useState(null), [C, D] = T.useState(!1), [z, V] = T.useState(!1), U = T.useRef(null);
  T.useEffect(() => {
    p(vd(c)), y(!1), S(null);
  }, [a.voiceAssetId, c]), T.useEffect(() => () => {
    E && URL.revokeObjectURL(E);
  }, [E]);
  const G = h.ops.find(($) => $.mode === "trim"), J = h.ops.find(($) => $.mode === "normalize"), W = G?.start_ms ?? 0, te = G?.end_ms ?? Math.max(1, c), j = T.useCallback(($, le) => {
    p((Se) => K0(Se, "trim", (A) => ({
      ...A,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(le))
    })));
  }, []), Z = T.useCallback(
    ($) => j($, te),
    [te, j]
  ), ne = T.useCallback(
    ($) => j(W, $),
    [W, j]
  ), ue = T.useCallback(
    ($) => {
      y($), p((le) => {
        const Se = le.ops.filter((A) => A.mode !== "normalize");
        if ($) {
          const A = {
            id: Ph(),
            mode: "normalize",
            target_lufs: $0
          };
          return { ...le, ops: [...Se, A] };
        }
        return { ...le, ops: Se };
      });
    },
    []
  ), I = T.useCallback(($) => {
    p((le) => ({ ...le, ops: le.ops.filter((Se) => Se.id !== $) }));
  }, []), Y = T.useCallback(() => {
    const $ = Tz(h, c);
    return $ ? (S($.message), !1) : (S(null), !0);
  }, [h, c]), oe = T.useCallback(async () => {
    if (Y()) {
      V(!0);
      try {
        const $ = await Ez(a.voiceAssetId, r, h);
        E && URL.revokeObjectURL(E);
        const le = URL.createObjectURL($);
        R(le), requestAnimationFrame(() => U.current?.play().catch(() => {
        }));
      } catch ($) {
        const le = $ instanceof Error ? $.message : "preview failed";
        S(le), o(le);
      } finally {
        V(!1);
      }
    }
  }, [Y, a.voiceAssetId, r, h, E, o]), ee = T.useCallback(async () => {
    if (Y()) {
      D(!0);
      try {
        const $ = await xz(a.voiceAssetId, r, {
          chain: h
        });
        S(null), s($);
      } catch ($) {
        const le = $ instanceof w1 ? "Edit chain has changed in another tab. Reload to continue." : $ instanceof Error ? $.message : "apply failed";
        S(le), o(le);
      } finally {
        D(!1);
      }
    }
  }, [Y, a.voiceAssetId, r, h, s, o]), O = T.useCallback(() => {
    p(vd(c)), y(!1), S(null), E && (URL.revokeObjectURL(E), R(null));
  }, [c, E]), ae = T.useCallback(($) => {
    p((le) => K0(le, "normalize", (Se) => ({
      ...Se,
      mode: "normalize",
      target_lufs: $
    })));
  }, []);
  return /* @__PURE__ */ b.jsxs("div", { className: Bz, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Hz, children: [
      /* @__PURE__ */ b.jsxs("h3", { className: qz, children: [
        "Edit · ",
        a.displayName
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: kz, children: [
        "Source · ",
        Pn(c)
      ] })
    ] }),
    /* @__PURE__ */ b.jsx(
      Lz,
      {
        audioUrl: d,
        durationMs: Math.max(1, c),
        startMs: W,
        endMs: te,
        onChangeStart: Z,
        onChangeEnd: ne
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: gd, children: [
      /* @__PURE__ */ b.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ b.jsxs("span", { className: Pz, children: [
        Pn(W),
        " → ",
        Pn(te),
        " · ",
        Pn(te - W)
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Yz, children: [
      /* @__PURE__ */ b.jsxs("div", { className: X0, children: [
        /* @__PURE__ */ b.jsxs("span", { className: gd, children: [
          /* @__PURE__ */ b.jsx("span", { children: "Normalize loudness" }),
          m && J && /* @__PURE__ */ b.jsxs("span", { className: tO, children: [
            J.target_lufs.toFixed(1),
            " LUFS"
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Gz, children: [
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "checkbox",
              checked: m,
              onChange: ($) => ue($.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ b.jsxs("span", { children: [
            "Target ",
            $0.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        m && J && /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            className: aO,
            min: -30,
            max: -6,
            step: 0.5,
            value: J.target_lufs,
            onChange: ($) => ae(Number($.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: X0, children: [
        /* @__PURE__ */ b.jsxs("span", { className: gd, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: Fz, children: h.ops.length === 0 ? /* @__PURE__ */ b.jsx("span", { className: Kz, children: "No operations yet." }) : h.ops.map(($) => /* @__PURE__ */ b.jsxs("div", { className: Xz, children: [
          /* @__PURE__ */ b.jsx("span", { className: $z, children: lO($) }),
          /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: Qz,
              onClick: () => I($.id),
              "aria-label": `Remove ${$.mode} operation`,
              children: "Remove"
            }
          )
        ] }, $.id)) })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Zz, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Jz,
          onClick: () => void oe(),
          disabled: z || C,
          children: z ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Iz,
          onClick: () => void ee(),
          disabled: C || z,
          children: C ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Wz,
          onClick: O,
          disabled: C || z,
          children: "Reset"
        }
      )
    ] }),
    E && /* @__PURE__ */ b.jsx(
      "audio",
      {
        ref: U,
        src: E,
        controls: !0,
        className: nO,
        "aria-label": "Edit preview"
      }
    ),
    v && /* @__PURE__ */ b.jsx("div", { className: eO, role: "alert", "aria-live": "polite", children: v })
  ] });
}
function vd(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Ph(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function K0(n, a, r) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Ph(), mode: a };
    return { ...n, ops: [...n.ops, r(c)] };
  }
  const o = [...n.ops];
  return o[s] = r(o[s]), { ...n, ops: o };
}
function lO(n) {
  switch (n.mode) {
    case "trim":
      return `Trim · ${Pn(n.start_ms)} → ${Pn(n.end_ms)}`;
    case "crop":
      return `Crop · ${Pn(n.start_ms)} → ${Pn(n.end_ms)}`;
    case "normalize":
      return `Normalize · ${n.target_lufs.toFixed(1)} LUFS`;
    case "speed":
      return `Speed · ${n.factor.toFixed(2)}×`;
    case "fade_in":
      return `Fade in · ${n.duration_ms} ms`;
    case "fade_out":
      return `Fade out · ${n.duration_ms} ms`;
    case "mute":
      return `Mute · ${Pn(n.start_ms)} → ${Pn(n.end_ms)}`;
  }
}
function Pn(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
function rO(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var sO = "go9vi12", oO = "go9vi13", uO = "go9vi14", cO = "go9vi15", fO = "go9vi16", dO = "go9vi17", hO = "go9vi18", mO = "go9vi19", pO = "go9vi1a go9vi19", yO = "go9vi1b", gO = "go9vi1c", vO = "go9vi1d", bO = "go9vi1e", SO = "go9vi1f", xO = "go9vi1g", EO = "go9vi1h", TO = "go9vi1i", RO = "go9vi1j", wO = "go9vi1k", hu = "go9vi1l", Ti = "go9vi1m", Br = "go9vi1n", Al = "go9vi1o", MO = "go9vi1p go9vi1o", CO = "go9vi1q", AO = "go9vi1r go9vi1q", jO = "go9vi1s go9vi1q", DO = "go9vi1t", NO = "go9vi1u", zO = "go9vi1v", OO = "go9vi1w", _O = "go9vi1x", LO = "go9vi1y", M1 = "go9vi1z", C1 = "go9vi110", Q0 = "go9vi111 go9vi110", UO = "go9vi112 go9vi110", VO = "go9vi113", BO = "go9vi114", HO = "go9vi115", qO = "go9vi116 go9vi1o", kO = "go9vi117", PO = "go9vi118";
const YO = ["none", "audio_ref", "vector_preset", "qwen_template"];
function GO() {
  const { deployment: n, mappings: a, voiceAssets: r } = is(), [s, o] = T.useState(a), [c, d] = T.useState(r), [h, p] = T.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = T.useState(""), [v, S] = T.useState(null), [E, R] = T.useState(null), C = T.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    for (const oe of c) Y.set(oe.voiceAssetId, oe);
    return Y;
  }, [c]), D = T.useMemo(() => {
    const Y = m.trim().toLowerCase();
    return Y ? s.filter((oe) => oe.characterName.toLowerCase().includes(Y)) : s;
  }, [s, m]), z = T.useMemo(
    () => s.find((Y) => Y.mappingId === h) ?? null,
    [s, h]
  );
  T.useEffect(() => {
    o(a), d(r), p(a[0]?.mappingId ?? null);
  }, [a, r]), T.useEffect(() => {
    if (!E) return;
    const Y = setTimeout(() => R(null), 2600);
    return () => clearTimeout(Y);
  }, [E]);
  const V = T.useCallback(async () => {
    const Y = await tu(n.deploymentId);
    d(Y.voiceAssets);
  }, [n.deploymentId]), U = T.useCallback(
    (Y) => {
      o(
        (oe) => oe.map((ee) => ee.mappingId === h ? { ...ee, ...Y } : ee)
      );
    },
    [h]
  ), G = T.useCallback(
    async (Y) => {
      if (!z) return;
      const oe = z;
      try {
        const ee = await gw(n.deploymentId, z.mappingId, Y);
        o((O) => O.map((ae) => ae.mappingId === ee.mappingId ? ee : ae));
      } catch (ee) {
        o(
          (O) => O.map((ae) => ae.mappingId === oe.mappingId ? oe : ae)
        ), S(Ri(ee));
      }
    },
    [z, n.deploymentId]
  ), J = T.useCallback(async () => {
    const Y = c[0];
    if (!Y) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const oe = ZO(s), ee = await Db(n.deploymentId, {
        characterName: oe,
        speakerVoiceAssetId: Y.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((O) => [...O, ee]), p(ee.mappingId);
    } catch (oe) {
      S(Ri(oe));
    }
  }, [n.deploymentId, c, s]), W = T.useCallback(async () => {
    if (z && confirm(`Deactivate mapping for ${z.characterName}?`))
      try {
        await vw(n.deploymentId, z.mappingId), o((Y) => Y.filter((oe) => oe.mappingId !== z.mappingId)), p(null), R(`Mapping for ${z.characterName} deactivated.`);
      } catch (Y) {
        S(Ri(Y));
      }
  }, [n.deploymentId, z]), te = T.useCallback(
    async (Y, oe, ee) => {
      try {
        const O = await ww(n.deploymentId, Y, oe, ee);
        return d((ae) => [O, ...ae]), R(`${O.displayName} uploaded.`), O;
      } catch (O) {
        return S(Ri(O)), null;
      }
    },
    [n.deploymentId]
  ), j = T.useCallback(async () => {
    try {
      const Y = await bw(n.deploymentId);
      n3(Y, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (Y) {
      S(Ri(Y));
    }
  }, [n.deploymentId]), Z = T.useCallback(
    async (Y, oe) => {
      try {
        const ee = await Sw(
          n.deploymentId,
          Y.mappings,
          oe
        );
        R(
          `Imported ${ee.created.length} • skipped ${ee.skipped.length} • replaced ${ee.replaced.length}.`
        );
        const O = await tu(n.deploymentId);
        d(O.voiceAssets);
      } catch (ee) {
        S(Ri(ee));
      }
    },
    [n.deploymentId]
  ), ne = T.useCallback(
    async (Y) => {
      await V(), R("Edit applied.");
    },
    [V]
  ), ue = T.useCallback((Y) => {
    S(Y);
  }, []), I = T.useCallback(
    async (Y, oe) => {
      if (!z) return null;
      const ee = Y.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await Rw(n.deploymentId, {
          line: ee,
          outputFormat: oe
        })).runId };
      } catch (O) {
        return S(Ri(O)), null;
      }
    },
    [n.deploymentId, z]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: sO, children: [
    /* @__PURE__ */ b.jsxs("aside", { className: oO, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ b.jsxs("header", { className: uO, children: [
        /* @__PURE__ */ b.jsxs("div", { children: [
          /* @__PURE__ */ b.jsx("h1", { className: cO, children: "Mappings" }),
          /* @__PURE__ */ b.jsxs("span", { className: fO, children: [
            s.length,
            " active · ",
            c.length,
            " voice",
            c.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("button", { type: "button", className: C1, onClick: J, children: "+ Add" })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "search",
          className: dO,
          placeholder: "Search characters",
          value: m,
          onChange: (Y) => y(Y.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ b.jsx(QO, { onExport: j, onImport: Z }),
      /* @__PURE__ */ b.jsx("div", { className: hO, children: D.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: SO, children: "No mappings yet. Click Add to create one." }) : D.map((Y) => {
        const oe = C.get(Y.speakerVoiceAssetId), ee = Y.mappingId === h;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: ee ? pO : mO,
            onClick: () => p(Y.mappingId),
            "aria-pressed": ee,
            children: [
              /* @__PURE__ */ b.jsx("span", { className: yO, "aria-hidden": "true", children: IO(Y.characterName) }),
              /* @__PURE__ */ b.jsxs("span", { className: gO, children: [
                /* @__PURE__ */ b.jsx("span", { className: vO, children: Y.characterName }),
                /* @__PURE__ */ b.jsxs("span", { className: bO, children: [
                  Y.defaultEmotionMode,
                  " · ",
                  oe?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          Y.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: xO, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ b.jsx(T2, { children: E && /* @__PURE__ */ b.jsx(
        kh.div,
        {
          className: BO,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }),
      v && /* @__PURE__ */ b.jsx("div", { className: VO, role: "alert", children: v }),
      z ? /* @__PURE__ */ b.jsx(
        XO,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          onNameChange: (Y) => {
            U({ characterName: Y });
          },
          onNameBlur: (Y) => {
            Y !== z.characterName && Y.trim() && G({ characterName: Y.trim() });
          },
          onSpeakerChange: (Y) => {
            U({ speakerVoiceAssetId: Y }), G({ speakerVoiceAssetId: Y });
          },
          onModeChange: (Y) => {
            U({ defaultEmotionMode: Y }), G({ defaultEmotionMode: Y });
          },
          onQwenChange: (Y) => {
            U({ defaultQwenTemplate: Y });
          },
          onQwenBlur: (Y) => {
            G({ defaultQwenTemplate: Y });
          },
          onSpeedChange: (Y) => {
            U({ defaultSpeedFactor: Y });
          },
          onSpeedCommit: (Y) => {
            G({ defaultSpeedFactor: Y });
          },
          onEmotionVoiceChange: (Y) => {
            const oe = Y || null;
            U({ defaultEmotionVoiceAssetId: oe }), G({ defaultEmotionVoiceAssetId: oe });
          },
          onDelete: W,
          onUploadVoice: async (Y, oe, ee) => {
            const O = await te(Y, oe, ee);
            return O && ee === "speaker" && (U({ speakerVoiceAssetId: O.voiceAssetId }), G({ speakerVoiceAssetId: O.voiceAssetId })), await V(), O;
          },
          onTestLine: I,
          onEditChainPersisted: ne,
          onEditError: ue
        }
      ) : /* @__PURE__ */ b.jsx(
        FO,
        {
          voiceCount: c.length,
          onUploadVoice: async (Y) => {
            await te(Y, Y.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function FO({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ b.jsxs("div", { className: hu, style: { padding: "3rem 2rem" }, children: [
    /* @__PURE__ */ b.jsxs("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ b.jsx(
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
      /* @__PURE__ */ b.jsxs(
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
            /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
            " ",
            "on the left to map a character to it."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(
      A1,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (r) => (await a(r), null)
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: hu, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ b.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function XO(n) {
  const { mapping: a, voiceAssets: r } = n, s = r.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = r.find((R) => R.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = T.useState(""), [h, p] = T.useState("mp3"), [m, y] = T.useState("idle"), [v, S] = T.useState(null), E = T.useCallback(async () => {
    y("running"), S(null);
    const R = await n.onTestLine(c, h);
    if (!R) {
      y("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: C } = R;
    for (let D = 0; D < 60; D += 1) {
      await new Promise((z) => setTimeout(z, 500));
      try {
        const z = await oh(n.deploymentId, C);
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
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs("header", { className: EO, children: [
      /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsx("span", { className: RO, children: "Character" }),
        /* @__PURE__ */ b.jsx("h2", { className: TO, children: a.characterName })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: M1, children: /* @__PURE__ */ b.jsx("button", { type: "button", className: UO, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: HO, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "text",
          className: qO,
          placeholder: `[${a.characterName}] This is a test of the voice.`,
          value: c,
          onChange: (R) => d(R.currentTarget.value),
          "aria-label": "Test-line text",
          disabled: m === "running"
        }
      ),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Al,
          value: h,
          onChange: (R) => p(R.currentTarget.value),
          "aria-label": "Test-line output format",
          disabled: m === "running",
          children: [
            /* @__PURE__ */ b.jsx("option", { value: "mp3", children: "mp3" }),
            /* @__PURE__ */ b.jsx("option", { value: "wav", children: "wav" }),
            /* @__PURE__ */ b.jsx("option", { value: "flac", children: "flac" })
          ]
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: C1,
          onClick: () => void E(),
          disabled: m === "running",
          children: m === "running" ? "Synthesising…" : "Test this line"
        }
      ),
      m === "done" && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-success, #4caf50)" }, children: "Synthesised — see host logs for the output file path." }),
      m === "error" && v && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-error, crimson)" }, children: v })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: wO, children: [
      /* @__PURE__ */ b.jsxs("div", { className: hu, children: [
        /* @__PURE__ */ b.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Character name" }),
          /* @__PURE__ */ b.jsx(
            "input",
            {
              className: Al,
              value: a.characterName,
              onChange: (R) => n.onNameChange(R.currentTarget.value),
              onBlur: (R) => n.onNameBlur(R.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion mode" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              className: Al,
              value: a.defaultEmotionMode,
              onChange: (R) => n.onModeChange(R.currentTarget.value),
              children: YO.map((R) => /* @__PURE__ */ b.jsx("option", { value: R, children: JO(R) }, R))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ b.jsxs("span", { className: Ti, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ b.jsx(
            "textarea",
            {
              className: MO,
              value: a.defaultQwenTemplate ?? "",
              onChange: (R) => n.onQwenChange(R.currentTarget.value),
              onBlur: (R) => n.onQwenBlur(R.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ b.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference" }),
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: Al,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (R) => n.onEmotionVoiceChange(R.currentTarget.value),
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— none —" }),
                r.map((R) => /* @__PURE__ */ b.jsxs("option", { value: R.voiceAssetId, children: [
                  R.displayName,
                  " · ",
                  R.kind
                ] }, R.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: Br, children: [
          /* @__PURE__ */ b.jsxs("span", { className: Ti, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ b.jsx(
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
      /* @__PURE__ */ b.jsxs("div", { className: hu, children: [
        /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Speaker reference" }),
        /* @__PURE__ */ b.jsx(
          $O,
          {
            value: a.speakerVoiceAssetId,
            voices: r,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ b.jsx(Z0, { voice: s }),
        /* @__PURE__ */ b.jsx(
          A1,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => n.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ b.jsx(
          iO,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference voice" }),
          /* @__PURE__ */ b.jsx(Z0, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function $O({
  value: n,
  voices: a,
  onChange: r
}) {
  return /* @__PURE__ */ b.jsxs(
    "select",
    {
      className: Al,
      value: n,
      onChange: (s) => r(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ b.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ b.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function Z0({ voice: n }) {
  const a = WO(n.durationMs ?? null);
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: DO, children: [
      /* @__PURE__ */ b.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ b.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ b.jsx("span", { children: e3(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ b.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ b.jsxs("div", { className: NO, children: [
      /* @__PURE__ */ b.jsx("div", { className: zO, children: /* @__PURE__ */ b.jsx(
        kh.div,
        {
          className: OO,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, n.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }),
      a && /* @__PURE__ */ b.jsx(
        "span",
        {
          className: a.level === "warn" ? _O : LO,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(KO, { seed: n.contentSha256 })
  ] });
}
function KO({ seed: n }) {
  const a = T.useMemo(() => t3(n, 48), [n]);
  return /* @__PURE__ */ b.jsx("div", { className: kO, "aria-hidden": "true", children: a.map((r, s) => /* @__PURE__ */ b.jsx(
    "span",
    {
      className: PO,
      style: { height: `${Math.max(6, r * 100)}%` }
    },
    s
  )) });
}
function A1({
  label: n,
  onFile: a
}) {
  const [r, s] = T.useState(!1), [o, c] = T.useState(!1), d = T.useRef(null), h = T.useCallback(
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
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: o ? jO : r ? AO : CO,
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
        /* @__PURE__ */ b.jsx(
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
function QO({
  onExport: n,
  onImport: a
}) {
  const [r, s] = T.useState("error"), o = T.useRef(null);
  return /* @__PURE__ */ b.jsxs("div", { className: M1, children: [
    /* @__PURE__ */ b.jsx("button", { type: "button", className: Q0, onClick: n, children: "Export JSON" }),
    /* @__PURE__ */ b.jsx(
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
              a(p, r);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ b.jsx("button", { type: "button", className: Q0, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        className: Al,
        value: r,
        onChange: (c) => s(c.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ b.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ b.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ b.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function ZO(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let r = n.length + 1;
  for (; a.has(`character ${r}`); ) r += 1;
  return `Character ${r}`;
}
function IO(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function JO(n) {
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
function WO(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function e3(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function t3(n, a) {
  const r = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    r.push((o * 31 + s * 7) % 100 / 100);
  }
  return r;
}
function n3(n, a) {
  const r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(r), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ri(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
function a3() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await pw();
        return { deployments: n };
      },
      Component: Fw
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId");
        return TT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), [r, { mappings: s }, { runs: o }, c] = await Promise.all([
          cv(a),
          fv(a),
          xw(a, { limit: 10 }),
          Mw(a)
        ]);
        return { deployment: r, mappings: s, runs: o, workflow: c };
      },
      Component: eN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), r = xl(n, "runId");
        return { run: await oh(a, r) };
      },
      Component: qN
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), [r, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          cv(a),
          fv(a),
          tu(a)
        ]);
        return { deployment: r, mappings: s, voiceAssets: o };
      },
      Component: GO
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const r = xl(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: r,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: Sz
    },
    {
      path: "/runtime/queue",
      Component: yz
    }
  ];
}
function xl(n, a) {
  const r = n[a];
  if (!r)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return r;
}
const $d = "emotion-tts-app", i3 = "ext-event", I0 = "emotion-tts-stylesheet";
function l3() {
  if (typeof document > "u" || document.getElementById(I0)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = I0, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
l3();
class r3 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = KE.createRoot(this), this.paint();
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
    const a = this.resolveInitialEntry(), r = DR(a3(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ b.jsx(T.StrictMode, { children: /* @__PURE__ */ b.jsx(zR, { router: r }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const r = this.getAttribute("deployment-id");
    return r && r.length > 0 ? `/${r}/recipe` : "/";
  }
  emitHostEvent(a, r) {
    this.dispatchEvent(
      new CustomEvent(i3, {
        detail: { topic: a, payload: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function s3() {
  typeof customElements > "u" || customElements.get($d) || customElements.define($d, r3);
}
typeof customElements < "u" && !customElements.get($d) && s3();
export {
  s3 as register
};
//# sourceMappingURL=emotion-tts.js.map
