function kE(n, a) {
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
function PE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Hf = { exports: {} }, Dr = {};
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
function YE() {
  if (Ag) return Dr;
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
  return Dr.Fragment = a, Dr.jsx = l, Dr.jsxs = l, Dr;
}
var jg;
function GE() {
  return jg || (jg = 1, Hf.exports = YE()), Hf.exports;
}
var b = GE(), qf = { exports: {} }, Me = {};
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
function FE() {
  if (Dg) return Me;
  Dg = 1;
  var n = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function T(M) {
    return M === null || typeof M != "object" ? null : (M = S && M[S] || M["@@iterator"], typeof M == "function" ? M : null);
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
  function z(M, G, ie) {
    this.props = M, this.context = G, this.refs = D, this.updater = ie || R;
  }
  z.prototype.isReactComponent = {}, z.prototype.setState = function(M, G) {
    if (typeof M != "object" && typeof M != "function" && M != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, M, G, "setState");
  }, z.prototype.forceUpdate = function(M) {
    this.updater.enqueueForceUpdate(this, M, "forceUpdate");
  };
  function B() {
  }
  B.prototype = z.prototype;
  function L(M, G, ie) {
    this.props = M, this.context = G, this.refs = D, this.updater = ie || R;
  }
  var V = L.prototype = new B();
  V.constructor = L, C(V, z.prototype), V.isPureReactComponent = !0;
  var K = Array.isArray;
  function ee() {
  }
  var J = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function X(M, G, ie) {
    var fe = ie.ref;
    return {
      $$typeof: n,
      type: M,
      key: G,
      ref: fe !== void 0 ? fe : null,
      props: ie
    };
  }
  function Q(M, G) {
    return X(M.type, G, M.props);
  }
  function ue(M) {
    return typeof M == "object" && M !== null && M.$$typeof === n;
  }
  function I(M) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + M.replace(/[=:]/g, function(ie) {
      return G[ie];
    });
  }
  var F = /\/+/g;
  function oe(M, G) {
    return typeof M == "object" && M !== null && M.key != null ? I("" + M.key) : G.toString(36);
  }
  function te(M) {
    switch (M.status) {
      case "fulfilled":
        return M.value;
      case "rejected":
        throw M.reason;
      default:
        switch (typeof M.status == "string" ? M.then(ee, ee) : (M.status = "pending", M.then(
          function(G) {
            M.status === "pending" && (M.status = "fulfilled", M.value = G);
          },
          function(G) {
            M.status === "pending" && (M.status = "rejected", M.reason = G);
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
  function O(M, G, ie, fe, Te) {
    var Ce = typeof M;
    (Ce === "undefined" || Ce === "boolean") && (M = null);
    var je = !1;
    if (M === null) je = !0;
    else
      switch (Ce) {
        case "bigint":
        case "string":
        case "number":
          je = !0;
          break;
        case "object":
          switch (M.$$typeof) {
            case n:
            case a:
              je = !0;
              break;
            case y:
              return je = M._init, O(
                je(M._payload),
                G,
                ie,
                fe,
                Te
              );
          }
      }
    if (je)
      return Te = Te(M), je = fe === "" ? "." + oe(M, 0) : fe, K(Te) ? (ie = "", je != null && (ie = je.replace(F, "$&/") + "/"), O(Te, G, ie, "", function(ti) {
        return ti;
      })) : Te != null && (ue(Te) && (Te = Q(
        Te,
        ie + (Te.key == null || M && M.key === Te.key ? "" : ("" + Te.key).replace(
          F,
          "$&/"
        ) + "/") + je
      )), G.push(Te)), 1;
    je = 0;
    var mt = fe === "" ? "." : fe + ":";
    if (K(M))
      for (var Qe = 0; Qe < M.length; Qe++)
        fe = M[Qe], Ce = mt + oe(fe, Qe), je += O(
          fe,
          G,
          ie,
          Ce,
          Te
        );
    else if (Qe = T(M), typeof Qe == "function")
      for (M = Qe.call(M), Qe = 0; !(fe = M.next()).done; )
        fe = fe.value, Ce = mt + oe(fe, Qe++), je += O(
          fe,
          G,
          ie,
          Ce,
          Te
        );
    else if (Ce === "object") {
      if (typeof M.then == "function")
        return O(
          te(M),
          G,
          ie,
          fe,
          Te
        );
      throw G = String(M), Error(
        "Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return je;
  }
  function ne(M, G, ie) {
    if (M == null) return M;
    var fe = [], Te = 0;
    return O(M, fe, "", "", function(Ce) {
      return G.call(ie, Ce, Te++);
    }), fe;
  }
  function se(M) {
    if (M._status === -1) {
      var G = M._result;
      G = G(), G.then(
        function(ie) {
          (M._status === 0 || M._status === -1) && (M._status = 1, M._result = ie);
        },
        function(ie) {
          (M._status === 0 || M._status === -1) && (M._status = 2, M._result = ie);
        }
      ), M._status === -1 && (M._status = 0, M._result = G);
    }
    if (M._status === 1) return M._result.default;
    throw M._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(M) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var G = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof M == "object" && M !== null && typeof M.message == "string" ? String(M.message) : String(M),
        error: M
      });
      if (!window.dispatchEvent(G)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", M);
      return;
    }
    console.error(M);
  }, le = {
    map: ne,
    forEach: function(M, G, ie) {
      ne(
        M,
        function() {
          G.apply(this, arguments);
        },
        ie
      );
    },
    count: function(M) {
      var G = 0;
      return ne(M, function() {
        G++;
      }), G;
    },
    toArray: function(M) {
      return ne(M, function(G) {
        return G;
      }) || [];
    },
    only: function(M) {
      if (!ue(M))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return M;
    }
  };
  return Me.Activity = v, Me.Children = le, Me.Component = z, Me.Fragment = l, Me.Profiler = o, Me.PureComponent = L, Me.StrictMode = s, Me.Suspense = p, Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, Me.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(M) {
      return J.H.useMemoCache(M);
    }
  }, Me.cache = function(M) {
    return function() {
      return M.apply(null, arguments);
    };
  }, Me.cacheSignal = function() {
    return null;
  }, Me.cloneElement = function(M, G, ie) {
    if (M == null)
      throw Error(
        "The argument must be a React element, but you passed " + M + "."
      );
    var fe = C({}, M.props), Te = M.key;
    if (G != null)
      for (Ce in G.key !== void 0 && (Te = "" + G.key), G)
        !j.call(G, Ce) || Ce === "key" || Ce === "__self" || Ce === "__source" || Ce === "ref" && G.ref === void 0 || (fe[Ce] = G[Ce]);
    var Ce = arguments.length - 2;
    if (Ce === 1) fe.children = ie;
    else if (1 < Ce) {
      for (var je = Array(Ce), mt = 0; mt < Ce; mt++)
        je[mt] = arguments[mt + 2];
      fe.children = je;
    }
    return X(M.type, Te, fe);
  }, Me.createContext = function(M) {
    return M = {
      $$typeof: d,
      _currentValue: M,
      _currentValue2: M,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, M.Provider = M, M.Consumer = {
      $$typeof: c,
      _context: M
    }, M;
  }, Me.createElement = function(M, G, ie) {
    var fe, Te = {}, Ce = null;
    if (G != null)
      for (fe in G.key !== void 0 && (Ce = "" + G.key), G)
        j.call(G, fe) && fe !== "key" && fe !== "__self" && fe !== "__source" && (Te[fe] = G[fe]);
    var je = arguments.length - 2;
    if (je === 1) Te.children = ie;
    else if (1 < je) {
      for (var mt = Array(je), Qe = 0; Qe < je; Qe++)
        mt[Qe] = arguments[Qe + 2];
      Te.children = mt;
    }
    if (M && M.defaultProps)
      for (fe in je = M.defaultProps, je)
        Te[fe] === void 0 && (Te[fe] = je[fe]);
    return X(M, Ce, Te);
  }, Me.createRef = function() {
    return { current: null };
  }, Me.forwardRef = function(M) {
    return { $$typeof: h, render: M };
  }, Me.isValidElement = ue, Me.lazy = function(M) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: M },
      _init: se
    };
  }, Me.memo = function(M, G) {
    return {
      $$typeof: m,
      type: M,
      compare: G === void 0 ? null : G
    };
  }, Me.startTransition = function(M) {
    var G = J.T, ie = {};
    J.T = ie;
    try {
      var fe = M(), Te = J.S;
      Te !== null && Te(ie, fe), typeof fe == "object" && fe !== null && typeof fe.then == "function" && fe.then(ee, ce);
    } catch (Ce) {
      ce(Ce);
    } finally {
      G !== null && ie.types !== null && (G.types = ie.types), J.T = G;
    }
  }, Me.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, Me.use = function(M) {
    return J.H.use(M);
  }, Me.useActionState = function(M, G, ie) {
    return J.H.useActionState(M, G, ie);
  }, Me.useCallback = function(M, G) {
    return J.H.useCallback(M, G);
  }, Me.useContext = function(M) {
    return J.H.useContext(M);
  }, Me.useDebugValue = function() {
  }, Me.useDeferredValue = function(M, G) {
    return J.H.useDeferredValue(M, G);
  }, Me.useEffect = function(M, G) {
    return J.H.useEffect(M, G);
  }, Me.useEffectEvent = function(M) {
    return J.H.useEffectEvent(M);
  }, Me.useId = function() {
    return J.H.useId();
  }, Me.useImperativeHandle = function(M, G, ie) {
    return J.H.useImperativeHandle(M, G, ie);
  }, Me.useInsertionEffect = function(M, G) {
    return J.H.useInsertionEffect(M, G);
  }, Me.useLayoutEffect = function(M, G) {
    return J.H.useLayoutEffect(M, G);
  }, Me.useMemo = function(M, G) {
    return J.H.useMemo(M, G);
  }, Me.useOptimistic = function(M, G) {
    return J.H.useOptimistic(M, G);
  }, Me.useReducer = function(M, G, ie) {
    return J.H.useReducer(M, G, ie);
  }, Me.useRef = function(M) {
    return J.H.useRef(M);
  }, Me.useState = function(M) {
    return J.H.useState(M);
  }, Me.useSyncExternalStore = function(M, G, ie) {
    return J.H.useSyncExternalStore(
      M,
      G,
      ie
    );
  }, Me.useTransition = function() {
    return J.H.useTransition();
  }, Me.version = "19.2.5", Me;
}
var Ng;
function Id() {
  return Ng || (Ng = 1, qf.exports = FE()), qf.exports;
}
var x = Id();
const XE = /* @__PURE__ */ PE(x), $E = /* @__PURE__ */ kE({
  __proto__: null,
  default: XE
}, [x]);
var kf = { exports: {} }, Nr = {}, Pf = { exports: {} }, Yf = {};
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
function KE() {
  return zg || (zg = 1, (function(n) {
    function a(O, ne) {
      var se = O.length;
      O.push(ne);
      e: for (; 0 < se; ) {
        var ce = se - 1 >>> 1, le = O[ce];
        if (0 < o(le, ne))
          O[ce] = ne, O[se] = le, se = ce;
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
        e: for (var ce = 0, le = O.length, M = le >>> 1; ce < M; ) {
          var G = 2 * (ce + 1) - 1, ie = O[G], fe = G + 1, Te = O[fe];
          if (0 > o(ie, se))
            fe < le && 0 > o(Te, ie) ? (O[ce] = Te, O[fe] = se, ce = fe) : (O[ce] = ie, O[G] = se, ce = G);
          else if (fe < le && 0 > o(Te, se))
            O[ce] = Te, O[fe] = se, ce = fe;
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
    var p = [], m = [], y = 1, v = null, S = 3, T = !1, R = !1, C = !1, D = !1, z = typeof setTimeout == "function" ? setTimeout : null, B = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function V(O) {
      for (var ne = l(m); ne !== null; ) {
        if (ne.callback === null) s(m);
        else if (ne.startTime <= O)
          s(m), ne.sortIndex = ne.expirationTime, a(p, ne);
        else break;
        ne = l(m);
      }
    }
    function K(O) {
      if (C = !1, V(O), !R)
        if (l(p) !== null)
          R = !0, ee || (ee = !0, I());
        else {
          var ne = l(m);
          ne !== null && te(K, ne.startTime - O);
        }
    }
    var ee = !1, J = -1, j = 5, X = -1;
    function Q() {
      return D ? !0 : !(n.unstable_now() - X < j);
    }
    function ue() {
      if (D = !1, ee) {
        var O = n.unstable_now();
        X = O;
        var ne = !0;
        try {
          e: {
            R = !1, C && (C = !1, B(J), J = -1), T = !0;
            var se = S;
            try {
              t: {
                for (V(O), v = l(p); v !== null && !(v.expirationTime > O && Q()); ) {
                  var ce = v.callback;
                  if (typeof ce == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var le = ce(
                      v.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof le == "function") {
                      v.callback = le, V(O), ne = !0;
                      break t;
                    }
                    v === l(p) && s(p), V(O);
                  } else s(p);
                  v = l(p);
                }
                if (v !== null) ne = !0;
                else {
                  var M = l(m);
                  M !== null && te(
                    K,
                    M.startTime - O
                  ), ne = !1;
                }
              }
              break e;
            } finally {
              v = null, S = se, T = !1;
            }
            ne = void 0;
          }
        } finally {
          ne ? I() : ee = !1;
        }
      }
    }
    var I;
    if (typeof L == "function")
      I = function() {
        L(ue);
      };
    else if (typeof MessageChannel < "u") {
      var F = new MessageChannel(), oe = F.port2;
      F.port1.onmessage = ue, I = function() {
        oe.postMessage(null);
      };
    } else
      I = function() {
        z(ue, 0);
      };
    function te(O, ne) {
      J = z(function() {
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
      var ce = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? ce + se : ce) : se = ce, O) {
        case 1:
          var le = -1;
          break;
        case 2:
          le = 250;
          break;
        case 5:
          le = 1073741823;
          break;
        case 4:
          le = 1e4;
          break;
        default:
          le = 5e3;
      }
      return le = se + le, O = {
        id: y++,
        callback: ne,
        priorityLevel: O,
        startTime: se,
        expirationTime: le,
        sortIndex: -1
      }, se > ce ? (O.sortIndex = se, a(m, O), l(p) === null && O === l(m) && (C ? (B(J), J = -1) : C = !0, te(K, se - ce))) : (O.sortIndex = le, a(p, O), R || T || (R = !0, ee || (ee = !0, I()))), O;
    }, n.unstable_shouldYield = Q, n.unstable_wrapCallback = function(O) {
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
function QE() {
  return Og || (Og = 1, Pf.exports = KE()), Pf.exports;
}
var Gf = { exports: {} }, Ut = {};
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
function ZE() {
  if (_g) return Ut;
  _g = 1;
  var n = Id();
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
      var y = m.as, v = h(y, m.crossOrigin), S = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: T
        }
      ) : y === "script" && s.d.X(p, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: T,
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
var Lg;
function IE() {
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
  return n(), Gf.exports = ZE(), Gf.exports;
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
function JE() {
  if (Ug) return Nr;
  Ug = 1;
  var n = QE(), a = Id(), l = IE();
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
  var v = Object.assign, S = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), L = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), Q = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = ue && e[ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var F = Symbol.for("react.client.reference");
  function oe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === F ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case z:
        return "Profiler";
      case D:
        return "StrictMode";
      case K:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case X:
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
        case J:
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
  var te = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ce = [], le = -1;
  function M(e) {
    return { current: e };
  }
  function G(e) {
    0 > le || (e.current = ce[le], ce[le] = null, le--);
  }
  function ie(e, t) {
    le++, ce[le] = e.current, e.current = t;
  }
  var fe = M(null), Te = M(null), Ce = M(null), je = M(null);
  function mt(e, t) {
    switch (ie(Ce, t), ie(Te, e), ie(fe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Iy(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Iy(t), e = Jy(t, e);
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
    G(fe), ie(fe, e);
  }
  function Qe() {
    G(fe), G(Te), G(Ce);
  }
  function ti(e) {
    e.memoizedState !== null && ie(je, e);
    var t = fe.current, i = Jy(t, e.type);
    t !== i && (ie(Te, e), ie(fe, i));
  }
  function Li(e) {
    Te.current === e && (G(fe), G(Te)), je.current === e && (G(je), Mr._currentValue = se);
  }
  var Vl, Et;
  function Yt(e) {
    if (Vl === void 0)
      try {
        throw Error();
      } catch (i) {
        var t = i.stack.trim().match(/\n( *(at )?)/);
        Vl = t && t[1] || "", Et = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Vl + e + Et;
  }
  var Ui = !1;
  function Bl(e, t) {
    if (!e || Ui) return "";
    Ui = !0;
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
                } catch (Y) {
                  var P = Y;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch (Y) {
                  P = Y;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                P = Y;
              }
              (W = e()) && typeof W.catch == "function" && W.catch(function() {
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
        var w = g.split(`
`), q = E.split(`
`);
        for (u = r = 0; r < w.length && !w[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; u < q.length && !q[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (r === w.length || u === q.length)
          for (r = w.length - 1, u = q.length - 1; 1 <= r && 0 <= u && w[r] !== q[u]; )
            u--;
        for (; 1 <= r && 0 <= u; r--, u--)
          if (w[r] !== q[u]) {
            if (r !== 1 || u !== 1)
              do
                if (r--, u--, 0 > u || w[r] !== q[u]) {
                  var $ = `
` + w[r].replace(" at new ", " at ");
                  return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), $;
                }
              while (1 <= r && 0 <= u);
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
        return Bl(e.type, !1);
      case 11:
        return Bl(e.type.render, !1);
      case 1:
        return Bl(e.type, !0);
      case 31:
        return Yt("Activity");
      default:
        return "";
    }
  }
  function hs(e) {
    try {
      var t = "", i = null;
      do
        t += Xn(e, i), i = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Hl = Object.prototype.hasOwnProperty, Vi = n.unstable_scheduleCallback, ql = n.unstable_cancelCallback, wu = n.unstable_shouldYield, Au = n.unstable_requestPaint, Bt = n.unstable_now, $n = n.unstable_getCurrentPriorityLevel, ya = n.unstable_ImmediatePriority, kl = n.unstable_UserBlockingPriority, ga = n.unstable_NormalPriority, Tn = n.unstable_LowPriority, sn = n.unstable_IdlePriority, ms = n.log, ju = n.unstable_setDisableYieldValue, Kn = null, Ht = null;
  function Ct(e) {
    if (typeof ms == "function" && ju(e), Ht && typeof Ht.setStrictMode == "function")
      try {
        Ht.setStrictMode(Kn, e);
      } catch {
      }
  }
  var _t = Math.clz32 ? Math.clz32 : Du, ps = Math.log, ys = Math.LN2;
  function Du(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ps(e) / ys | 0) | 0;
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
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var u = 0, f = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~f, r !== 0 ? u = Rn(r) : (g &= E, g !== 0 ? u = Rn(g) : i || (i = E & ~e, i !== 0 && (u = Rn(i))))) : (E = r & ~f, E !== 0 ? u = Rn(E) : g !== 0 ? u = Rn(g) : i || (i = r & ~e, i !== 0 && (u = Rn(i)))), u === 0 ? 0 : t !== 0 && t !== u && (t & f) === 0 && (f = u & -u, i = t & -t, f >= i || f === 32 && (i & 4194048) !== 0) ? t : u;
  }
  function va(e, t) {
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
  function Pl() {
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
  function gs(e, t, i, r, u, f) {
    var g = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var E = e.entanglements, w = e.expirationTimes, q = e.hiddenUpdates;
    for (i = g & ~i; 0 < i; ) {
      var $ = 31 - _t(i), W = 1 << $;
      E[$] = 0, w[$] = -1;
      var P = q[$];
      if (P !== null)
        for (q[$] = null, $ = 0; $ < P.length; $++) {
          var Y = P[$];
          Y !== null && (Y.lane &= -536870913);
        }
      i &= ~W;
    }
    r !== 0 && vs(e, r, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(g & ~t));
  }
  function vs(e, t, i) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - _t(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | i & 261930;
  }
  function bs(e, t) {
    var i = e.entangledLanes |= t;
    for (e = e.entanglements; i; ) {
      var r = 31 - _t(i), u = 1 << r;
      u & t | e[r] & t && (e[r] |= t), i &= ~u;
    }
  }
  function A(e, t) {
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
  function re(e, t) {
    var i = ne.p;
    try {
      return ne.p = e, t();
    } finally {
      ne.p = i;
    }
  }
  var ye = Math.random().toString(36).slice(2), de = "__reactFiber$" + ye, he = "__reactProps$" + ye, ve = "__reactContainer$" + ye, me = "__reactEvents$" + ye, Ee = "__reactListeners$" + ye, Se = "__reactHandles$" + ye, He = "__reactResources$" + ye, De = "__reactMarker$" + ye;
  function Ze(e) {
    delete e[de], delete e[he], delete e[me], delete e[Ee], delete e[Se];
  }
  function Fe(e) {
    var t = e[de];
    if (t) return t;
    for (var i = e.parentNode; i; ) {
      if (t = i[ve] || i[de]) {
        if (i = t.alternate, t.child !== null || i !== null && i.child !== null)
          for (e = lg(e); e !== null; ) {
            if (i = e[de]) return i;
            e = lg(e);
          }
        return t;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function lt(e) {
    if (e = e[de] || e[ve]) {
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
  var Sa = /* @__PURE__ */ new Set(), Cn = {};
  function Mt(e, t) {
    _n(e, t), _n(e + "Capture", t);
  }
  function _n(e, t) {
    for (Cn[e] = t, e = 0; e < t.length; e++)
      Sa.add(t[e]);
  }
  var ii = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ln = {}, li = {};
  function Hi(e) {
    return Hl.call(li, e) ? !0 : Hl.call(Ln, e) ? !1 : ii.test(e) ? li[e] = !0 : (Ln[e] = !0, !1);
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
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
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
  function Lt(e, t, i, r) {
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
  function Ss(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var i = t.getValue(), r = "";
    return e && (r = et(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== i ? (t.setValue(e), !0) : !1;
  }
  function xs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Lx = /[\n"\\]/g;
  function on(e) {
    return e.replace(
      Lx,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function zu(e, t, i, r, u, f, g, E) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + yt(t)) : e.value !== "" + yt(t) && (e.value = "" + yt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Ou(e, g, yt(t)) : i != null ? Ou(e, g, yt(i)) : r != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + yt(E) : e.removeAttribute("name");
  }
  function Fh(e, t, i, r, u, f, g, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), t != null || i != null) {
      if (!(f !== "submit" && f !== "reset" || t != null)) {
        ki(e);
        return;
      }
      i = i != null ? "" + yt(i) : "", t = t != null ? "" + yt(t) : i, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? u, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), ki(e);
  }
  function Ou(e, t, i) {
    t === "number" && xs(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Pi(e, t, i, r) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < i.length; u++)
        t["$" + i[u]] = !0;
      for (i = 0; i < e.length; i++)
        u = t.hasOwnProperty("$" + e[i].value), e[i].selected !== u && (e[i].selected = u), u && r && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + yt(i), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === i) {
          e[u].selected = !0, r && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xh(e, t, i) {
    if (t != null && (t = "" + yt(t), t !== e.value && (e.value = t), i == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = i != null ? "" + yt(i) : "";
  }
  function $h(e, t, i, r) {
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
    i = yt(t), e.defaultValue = i, r = e.textContent, r === i && r !== "" && r !== null && (e.value = r), ki(e);
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
  var Ux = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Kh(e, t, i) {
    var r = t.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, i) : typeof i != "number" || i === 0 || Ux.has(t) ? t === "float" ? e.cssFloat = i : e[t] = ("" + i).trim() : e[t] = i + "px";
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
  var Vx = /* @__PURE__ */ new Map([
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
  ]), Bx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Es(e) {
    return Bx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Zn() {
  }
  var Lu = null;
  function Uu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Gi = null, Fi = null;
  function Zh(e) {
    var t = lt(e);
    if (t && (e = t.stateNode)) {
      var i = e[he] || null;
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
              'input[name="' + on(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < i.length; t++) {
              var r = i[t];
              if (r !== e && r.form === e.form) {
                var u = r[he] || null;
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
              r = i[t], r.form === e.form && Ss(r);
          }
          break e;
        case "textarea":
          Xh(e, i.value, i.defaultValue);
          break e;
        case "select":
          t = i.value, t != null && Pi(e, !!i.multiple, t, !1);
      }
    }
  }
  var Vu = !1;
  function Ih(e, t, i) {
    if (Vu) return e(t, i);
    Vu = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Vu = !1, (Gi !== null || Fi !== null) && (uo(), Gi && (t = Gi, e = Fi, Fi = Gi = null, Zh(t), e)))
        for (t = 0; t < e.length; t++) Zh(e[t]);
    }
  }
  function Yl(e, t) {
    var i = e.stateNode;
    if (i === null) return null;
    var r = i[he] || null;
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
  var In = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bu = !1;
  if (In)
    try {
      var Gl = {};
      Object.defineProperty(Gl, "passive", {
        get: function() {
          Bu = !0;
        }
      }), window.addEventListener("test", Gl, Gl), window.removeEventListener("test", Gl, Gl);
    } catch {
      Bu = !1;
    }
  var xa = null, Hu = null, Ts = null;
  function Jh() {
    if (Ts) return Ts;
    var e, t = Hu, i = t.length, r, u = "value" in xa ? xa.value : xa.textContent, f = u.length;
    for (e = 0; e < i && t[e] === u[e]; e++) ;
    var g = i - e;
    for (r = 1; r <= g && t[i - r] === u[f - r]; r++) ;
    return Ts = u.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Rs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Cs() {
    return !0;
  }
  function Wh() {
    return !1;
  }
  function Gt(e) {
    function t(i, r, u, f, g) {
      this._reactName = i, this._targetInst = u, this.type = r, this.nativeEvent = f, this.target = g, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (i = e[E], this[E] = i ? i(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Cs : Wh, this.isPropagationStopped = Wh, this;
    }
    return v(t.prototype, {
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
  }, Ms = Gt(ri), Fl = v({}, ri, { view: 0, detail: 0 }), Hx = Gt(Fl), qu, ku, Xl, ws = v({}, Fl, {
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
      return "movementX" in e ? e.movementX : (e !== Xl && (Xl && e.type === "mousemove" ? (qu = e.screenX - Xl.screenX, ku = e.screenY - Xl.screenY) : ku = qu = 0, Xl = e), qu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ku;
    }
  }), em = Gt(ws), qx = v({}, ws, { dataTransfer: 0 }), kx = Gt(qx), Px = v({}, Fl, { relatedTarget: 0 }), Pu = Gt(Px), Yx = v({}, ri, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Gx = Gt(Yx), Fx = v({}, ri, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Xx = Gt(Fx), $x = v({}, ri, { data: 0 }), tm = Gt($x), Kx = {
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
  }, Qx = {
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
  }, Zx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ix(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Zx[e]) ? !!t[e] : !1;
  }
  function Yu() {
    return Ix;
  }
  var Jx = v({}, Fl, {
    key: function(e) {
      if (e.key) {
        var t = Kx[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Rs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Qx[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? Rs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Rs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Wx = Gt(Jx), e1 = v({}, ws, {
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
  }), nm = Gt(e1), t1 = v({}, Fl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yu
  }), n1 = Gt(t1), a1 = v({}, ri, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), i1 = Gt(a1), l1 = v({}, ws, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), r1 = Gt(l1), s1 = v({}, ri, {
    newState: 0,
    oldState: 0
  }), o1 = Gt(s1), u1 = [9, 13, 27, 32], Gu = In && "CompositionEvent" in window, $l = null;
  In && "documentMode" in document && ($l = document.documentMode);
  var c1 = In && "TextEvent" in window && !$l, am = In && (!Gu || $l && 8 < $l && 11 >= $l), im = " ", lm = !1;
  function rm(e, t) {
    switch (e) {
      case "keyup":
        return u1.indexOf(t.keyCode) !== -1;
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
  var Xi = !1;
  function f1(e, t) {
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
  function d1(e, t) {
    if (Xi)
      return e === "compositionend" || !Gu && rm(e, t) ? (e = Jh(), Ts = Hu = xa = null, Xi = !1, e) : null;
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
  var h1 = {
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
    return t === "input" ? !!h1[e.type] : t === "textarea";
  }
  function um(e, t, i, r) {
    Gi ? Fi ? Fi.push(r) : Fi = [r] : Gi = r, t = go(t, "onChange"), 0 < t.length && (i = new Ms(
      "onChange",
      "change",
      null,
      i,
      r
    ), e.push({ event: i, listeners: t }));
  }
  var Kl = null, Ql = null;
  function m1(e) {
    Fy(e, 0);
  }
  function As(e) {
    var t = Oe(e);
    if (Ss(t)) return e;
  }
  function cm(e, t) {
    if (e === "change") return t;
  }
  var fm = !1;
  if (In) {
    var Fu;
    if (In) {
      var Xu = "oninput" in document;
      if (!Xu) {
        var dm = document.createElement("div");
        dm.setAttribute("oninput", "return;"), Xu = typeof dm.oninput == "function";
      }
      Fu = Xu;
    } else Fu = !1;
    fm = Fu && (!document.documentMode || 9 < document.documentMode);
  }
  function hm() {
    Kl && (Kl.detachEvent("onpropertychange", mm), Ql = Kl = null);
  }
  function mm(e) {
    if (e.propertyName === "value" && As(Ql)) {
      var t = [];
      um(
        t,
        Ql,
        e,
        Uu(e)
      ), Ih(m1, t);
    }
  }
  function p1(e, t, i) {
    e === "focusin" ? (hm(), Kl = t, Ql = i, Kl.attachEvent("onpropertychange", mm)) : e === "focusout" && hm();
  }
  function y1(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Ql);
  }
  function g1(e, t) {
    if (e === "click") return As(t);
  }
  function v1(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function b1(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : b1;
  function Zl(e, t) {
    if (Jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var i = Object.keys(e), r = Object.keys(t);
    if (i.length !== r.length) return !1;
    for (r = 0; r < i.length; r++) {
      var u = i[r];
      if (!Hl.call(t, u) || !Jt(e[u], t[u]))
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
  function $u(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var S1 = In && "documentMode" in document && 11 >= document.documentMode, $i = null, Ku = null, Il = null, Qu = !1;
  function bm(e, t, i) {
    var r = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Qu || $i == null || $i !== xs(r) || (r = $i, "selectionStart" in r && $u(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), Il && Zl(Il, r) || (Il = r, r = go(Ku, "onSelect"), 0 < r.length && (t = new Ms(
      "onSelect",
      "select",
      null,
      t,
      i
    ), e.push({ event: t, listeners: r }), t.target = $i)));
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
  }, Zu = {}, Sm = {};
  In && (Sm = document.createElement("div").style, "AnimationEvent" in window || (delete Ki.animationend.animation, delete Ki.animationiteration.animation, delete Ki.animationstart.animation), "TransitionEvent" in window || delete Ki.transitionend.transition);
  function oi(e) {
    if (Zu[e]) return Zu[e];
    if (!Ki[e]) return e;
    var t = Ki[e], i;
    for (i in t)
      if (t.hasOwnProperty(i) && i in Sm)
        return Zu[e] = t[i];
    return e;
  }
  var xm = oi("animationend"), Em = oi("animationiteration"), Tm = oi("animationstart"), x1 = oi("transitionrun"), E1 = oi("transitionstart"), T1 = oi("transitioncancel"), Rm = oi("transitionend"), Cm = /* @__PURE__ */ new Map(), Iu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Iu.push("scrollEnd");
  function Mn(e, t) {
    Cm.set(e, t), Mt(t, [e]);
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
  }, un = [], Qi = 0, Ju = 0;
  function Ds() {
    for (var e = Qi, t = Ju = Qi = 0; t < e; ) {
      var i = un[t];
      un[t++] = null;
      var r = un[t];
      un[t++] = null;
      var u = un[t];
      un[t++] = null;
      var f = un[t];
      if (un[t++] = null, r !== null && u !== null) {
        var g = r.pending;
        g === null ? u.next = u : (u.next = g.next, g.next = u), r.pending = u;
      }
      f !== 0 && Mm(i, u, f);
    }
  }
  function Ns(e, t, i, r) {
    un[Qi++] = e, un[Qi++] = t, un[Qi++] = i, un[Qi++] = r, Ju |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Wu(e, t, i, r) {
    return Ns(e, t, i, r), zs(e);
  }
  function ui(e, t) {
    return Ns(e, null, null, t), zs(e);
  }
  function Mm(e, t, i) {
    e.lanes |= i;
    var r = e.alternate;
    r !== null && (r.lanes |= i);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= i, r = f.alternate, r !== null && (r.childLanes |= i), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && t !== null && (u = 31 - _t(i), e = f.hiddenUpdates, r = e[u], r === null ? e[u] = [t] : r.push(t), t.lane = i | 536870912), f) : null;
  }
  function zs(e) {
    if (50 < br)
      throw br = 0, uf = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zi = {};
  function R1(e, t, i, r) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Wt(e, t, i, r) {
    return new R1(e, t, i, r);
  }
  function ec(e) {
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
  function Os(e, t, i, r, u, f) {
    var g = 0;
    if (r = e, typeof e == "function") ec(e) && (g = 1);
    else if (typeof e == "string")
      g = jE(
        e,
        i,
        fe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case X:
          return e = Wt(31, i, t, u), e.elementType = X, e.lanes = f, e;
        case C:
          return ci(i.children, u, f, t);
        case D:
          g = 8, u |= 24;
          break;
        case z:
          return e = Wt(12, i, t, u | 2), e.elementType = z, e.lanes = f, e;
        case K:
          return e = Wt(13, i, t, u), e.elementType = K, e.lanes = f, e;
        case ee:
          return e = Wt(19, i, t, u), e.elementType = ee, e.lanes = f, e;
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
              case J:
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
    return t = Wt(g, i, t, u), t.elementType = e, t.type = r, t.lanes = f, t;
  }
  function ci(e, t, i, r) {
    return e = Wt(7, e, r, t), e.lanes = i, e;
  }
  function tc(e, t, i) {
    return e = Wt(6, e, null, t), e.lanes = i, e;
  }
  function Am(e) {
    var t = Wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function nc(e, t, i) {
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
  var jm = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var i = jm.get(e);
      return i !== void 0 ? i : (t = {
        value: e,
        source: t,
        stack: hs(t)
      }, jm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: hs(t)
    };
  }
  var Ii = [], Ji = 0, _s = null, Jl = 0, fn = [], dn = 0, Ea = null, Un = 1, Vn = "";
  function Wn(e, t) {
    Ii[Ji++] = Jl, Ii[Ji++] = _s, _s = e, Jl = t;
  }
  function Dm(e, t, i) {
    fn[dn++] = Un, fn[dn++] = Vn, fn[dn++] = Ea, Ea = e;
    var r = Un;
    e = Vn;
    var u = 32 - _t(r) - 1;
    r &= ~(1 << u), i += 1;
    var f = 32 - _t(t) + u;
    if (30 < f) {
      var g = u - u % 5;
      f = (r & (1 << g) - 1).toString(32), r >>= g, u -= g, Un = 1 << 32 - _t(t) + u | i << u | r, Vn = f + e;
    } else
      Un = 1 << f | i << u | r, Vn = e;
  }
  function ac(e) {
    e.return !== null && (Wn(e, 1), Dm(e, 1, 0));
  }
  function ic(e) {
    for (; e === _s; )
      _s = Ii[--Ji], Ii[Ji] = null, Jl = Ii[--Ji], Ii[Ji] = null;
    for (; e === Ea; )
      Ea = fn[--dn], fn[dn] = null, Vn = fn[--dn], fn[dn] = null, Un = fn[--dn], fn[dn] = null;
  }
  function Nm(e, t) {
    fn[dn++] = Un, fn[dn++] = Vn, fn[dn++] = Ea, Un = t.id, Vn = t.overflow, Ea = e;
  }
  var At = null, tt = null, Be = !1, Ta = null, hn = !1, lc = Error(s(519));
  function Ra(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wl(cn(t, e)), lc;
  }
  function zm(e) {
    var t = e.stateNode, i = e.type, r = e.memoizedProps;
    switch (t[de] = e, t[he] = r, i) {
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
        for (i = 0; i < xr.length; i++)
          Le(xr[i], t);
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
        Le("invalid", t), Fh(
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
        Le("invalid", t);
        break;
      case "textarea":
        Le("invalid", t), $h(t, r.value, r.defaultValue, r.children);
    }
    i = r.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || t.textContent === "" + i || r.suppressHydrationWarning === !0 || Qy(t.textContent, i) ? (r.popover != null && (Le("beforetoggle", t), Le("toggle", t)), r.onScroll != null && Le("scroll", t), r.onScrollEnd != null && Le("scrollend", t), r.onClick != null && (t.onclick = Zn), t = !0) : t = !1, t || Ra(e, !0);
  }
  function Om(e) {
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
    if (!Be) return Om(e), Be = !0, !1;
    var t = e.tag, i;
    if ((i = t !== 3 && t !== 27) && ((i = t === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || Rf(e.type, e.memoizedProps)), i = !i), i && tt && Ra(e), Om(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = ig(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      tt = ig(e);
    } else
      t === 27 ? (t = tt, Ba(e.type) ? (e = jf, jf = null, tt = e) : tt = t) : tt = At ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fi() {
    tt = At = null, Be = !1;
  }
  function rc() {
    var e = Ta;
    return e !== null && (Kt === null ? Kt = e : Kt.push.apply(
      Kt,
      e
    ), Ta = null), e;
  }
  function Wl(e) {
    Ta === null ? Ta = [e] : Ta.push(e);
  }
  var sc = M(null), di = null, ea = null;
  function Ca(e, t, i) {
    ie(sc, t._currentValue), t._currentValue = i;
  }
  function ta(e) {
    e._currentValue = sc.current, G(sc);
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
          for (var w = 0; w < t.length; w++)
            if (E.context === t[w]) {
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
  function el(e, t, i, r) {
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
          Jt(u.pendingProps.value, g.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === je.current) {
        if (g = u.alternate, g === null) throw Error(s(387));
        g.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Mr) : e = [Mr]);
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
  function Ls(e) {
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
    return _m(di, e);
  }
  function Us(e, t) {
    return di === null && hi(e), _m(e, t);
  }
  function _m(e, t) {
    var i = t._currentValue;
    if (t = { context: t, memoizedValue: i, next: null }, ea === null) {
      if (e === null) throw Error(s(308));
      ea = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ea = ea.next = t;
    return i;
  }
  var C1 = typeof AbortController < "u" ? AbortController : function() {
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
  }, M1 = n.unstable_scheduleCallback, w1 = n.unstable_NormalPriority, gt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function cc() {
    return {
      controller: new C1(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function er(e) {
    e.refCount--, e.refCount === 0 && M1(w1, function() {
      e.controller.abort();
    });
  }
  var tr = null, fc = 0, tl = 0, nl = null;
  function A1(e, t) {
    if (tr === null) {
      var i = tr = [];
      fc = 0, tl = pf(), nl = {
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
    if (--fc === 0 && tr !== null) {
      nl !== null && (nl.status = "fulfilled");
      var e = tr;
      tr = null, tl = 0, nl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function j1(e, t) {
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
    by = Bt(), typeof t == "object" && t !== null && typeof t.then == "function" && A1(e, t), Um !== null && Um(e, t);
  };
  var mi = M(null);
  function dc() {
    var e = mi.current;
    return e !== null ? e : Ie.pooledCache;
  }
  function Vs(e, t) {
    t === null ? ie(mi, mi.current) : ie(mi, t.pool);
  }
  function Vm() {
    var e = dc();
    return e === null ? null : { parent: gt._currentValue, pool: e };
  }
  var al = Error(s(460)), hc = Error(s(474)), Bs = Error(s(542)), Hs = { then: function() {
  } };
  function Bm(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Hm(e, t, i) {
    switch (i = e[i], i === void 0 ? e.push(t) : i !== t && (t.then(Zn, Zn), t = i), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, km(e), e;
      default:
        if (typeof t.status == "string") t.then(Zn, Zn);
        else {
          if (e = Ie, e !== null && 100 < e.shellSuspendCounter)
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
  function qm() {
    if (yi === null) throw Error(s(459));
    var e = yi;
    return yi = null, e;
  }
  function km(e) {
    if (e === al || e === Bs)
      throw Error(s(483));
  }
  var il = null, nr = 0;
  function qs(e) {
    var t = nr;
    return nr += 1, il === null && (il = []), Hm(il, e, t);
  }
  function ar(e, t) {
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
  function Pm(e) {
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
      return U = Jn(U, N), U.index = 0, U.sibling = null, U;
    }
    function f(U, N, H) {
      return U.index = H, e ? (H = U.alternate, H !== null ? (H = H.index, H < N ? (U.flags |= 67108866, N) : H) : (U.flags |= 67108866, N)) : (U.flags |= 1048576, N);
    }
    function g(U) {
      return e && U.alternate === null && (U.flags |= 67108866), U;
    }
    function E(U, N, H, Z) {
      return N === null || N.tag !== 6 ? (N = tc(H, U.mode, Z), N.return = U, N) : (N = u(N, H), N.return = U, N);
    }
    function w(U, N, H, Z) {
      var xe = H.type;
      return xe === C ? $(
        U,
        N,
        H.props.children,
        Z,
        H.key
      ) : N !== null && (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && pi(xe) === N.type) ? (N = u(N, H.props), ar(N, H), N.return = U, N) : (N = Os(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        Z
      ), ar(N, H), N.return = U, N);
    }
    function q(U, N, H, Z) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== H.containerInfo || N.stateNode.implementation !== H.implementation ? (N = nc(H, U.mode, Z), N.return = U, N) : (N = u(N, H.children || []), N.return = U, N);
    }
    function $(U, N, H, Z, xe) {
      return N === null || N.tag !== 7 ? (N = ci(
        H,
        U.mode,
        Z,
        xe
      ), N.return = U, N) : (N = u(N, H), N.return = U, N);
    }
    function W(U, N, H) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = tc(
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
            ), ar(H, N), H.return = U, H;
          case R:
            return N = nc(
              N,
              U.mode,
              H
            ), N.return = U, N;
          case j:
            return N = pi(N), W(U, N, H);
        }
        if (te(N) || I(N))
          return N = ci(
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
    function P(U, N, H, Z) {
      var xe = N !== null ? N.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return xe !== null ? null : E(U, N, "" + H, Z);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            return H.key === xe ? w(U, N, H, Z) : null;
          case R:
            return H.key === xe ? q(U, N, H, Z) : null;
          case j:
            return H = pi(H), P(U, N, H, Z);
        }
        if (te(H) || I(H))
          return xe !== null ? null : $(U, N, H, Z, null);
        if (typeof H.then == "function")
          return P(
            U,
            N,
            qs(H),
            Z
          );
        if (H.$$typeof === L)
          return P(
            U,
            N,
            Us(U, H),
            Z
          );
        ks(U, H);
      }
      return null;
    }
    function Y(U, N, H, Z, xe) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return U = U.get(H) || null, E(N, U, "" + Z, xe);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case T:
            return U = U.get(
              Z.key === null ? H : Z.key
            ) || null, w(N, U, Z, xe);
          case R:
            return U = U.get(
              Z.key === null ? H : Z.key
            ) || null, q(N, U, Z, xe);
          case j:
            return Z = pi(Z), Y(
              U,
              N,
              H,
              Z,
              xe
            );
        }
        if (te(Z) || I(Z))
          return U = U.get(H) || null, $(N, U, Z, xe, null);
        if (typeof Z.then == "function")
          return Y(
            U,
            N,
            H,
            qs(Z),
            xe
          );
        if (Z.$$typeof === L)
          return Y(
            U,
            N,
            H,
            Us(N, Z),
            xe
          );
        ks(N, Z);
      }
      return null;
    }
    function pe(U, N, H, Z) {
      for (var xe = null, qe = null, be = N, Ae = N = 0, Ve = null; be !== null && Ae < H.length; Ae++) {
        be.index > Ae ? (Ve = be, be = null) : Ve = be.sibling;
        var ke = P(
          U,
          be,
          H[Ae],
          Z
        );
        if (ke === null) {
          be === null && (be = Ve);
          break;
        }
        e && be && ke.alternate === null && t(U, be), N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke, be = Ve;
      }
      if (Ae === H.length)
        return i(U, be), Be && Wn(U, Ae), xe;
      if (be === null) {
        for (; Ae < H.length; Ae++)
          be = W(U, H[Ae], Z), be !== null && (N = f(
            be,
            N,
            Ae
          ), qe === null ? xe = be : qe.sibling = be, qe = be);
        return Be && Wn(U, Ae), xe;
      }
      for (be = r(be); Ae < H.length; Ae++)
        Ve = Y(
          be,
          U,
          Ae,
          H[Ae],
          Z
        ), Ve !== null && (e && Ve.alternate !== null && be.delete(
          Ve.key === null ? Ae : Ve.key
        ), N = f(
          Ve,
          N,
          Ae
        ), qe === null ? xe = Ve : qe.sibling = Ve, qe = Ve);
      return e && be.forEach(function(Ya) {
        return t(U, Ya);
      }), Be && Wn(U, Ae), xe;
    }
    function Re(U, N, H, Z) {
      if (H == null) throw Error(s(151));
      for (var xe = null, qe = null, be = N, Ae = N = 0, Ve = null, ke = H.next(); be !== null && !ke.done; Ae++, ke = H.next()) {
        be.index > Ae ? (Ve = be, be = null) : Ve = be.sibling;
        var Ya = P(U, be, ke.value, Z);
        if (Ya === null) {
          be === null && (be = Ve);
          break;
        }
        e && be && Ya.alternate === null && t(U, be), N = f(Ya, N, Ae), qe === null ? xe = Ya : qe.sibling = Ya, qe = Ya, be = Ve;
      }
      if (ke.done)
        return i(U, be), Be && Wn(U, Ae), xe;
      if (be === null) {
        for (; !ke.done; Ae++, ke = H.next())
          ke = W(U, ke.value, Z), ke !== null && (N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke);
        return Be && Wn(U, Ae), xe;
      }
      for (be = r(be); !ke.done; Ae++, ke = H.next())
        ke = Y(be, U, Ae, ke.value, Z), ke !== null && (e && ke.alternate !== null && be.delete(ke.key === null ? Ae : ke.key), N = f(ke, N, Ae), qe === null ? xe = ke : qe.sibling = ke, qe = ke);
      return e && be.forEach(function(qE) {
        return t(U, qE);
      }), Be && Wn(U, Ae), xe;
    }
    function Ke(U, N, H, Z) {
      if (typeof H == "object" && H !== null && H.type === C && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            e: {
              for (var xe = H.key; N !== null; ) {
                if (N.key === xe) {
                  if (xe = H.type, xe === C) {
                    if (N.tag === 7) {
                      i(
                        U,
                        N.sibling
                      ), Z = u(
                        N,
                        H.props.children
                      ), Z.return = U, U = Z;
                      break e;
                    }
                  } else if (N.elementType === xe || typeof xe == "object" && xe !== null && xe.$$typeof === j && pi(xe) === N.type) {
                    i(
                      U,
                      N.sibling
                    ), Z = u(N, H.props), ar(Z, H), Z.return = U, U = Z;
                    break e;
                  }
                  i(U, N);
                  break;
                } else t(U, N);
                N = N.sibling;
              }
              H.type === C ? (Z = ci(
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
              ), ar(Z, H), Z.return = U, U = Z);
            }
            return g(U);
          case R:
            e: {
              for (xe = H.key; N !== null; ) {
                if (N.key === xe)
                  if (N.tag === 4 && N.stateNode.containerInfo === H.containerInfo && N.stateNode.implementation === H.implementation) {
                    i(
                      U,
                      N.sibling
                    ), Z = u(N, H.children || []), Z.return = U, U = Z;
                    break e;
                  } else {
                    i(U, N);
                    break;
                  }
                else t(U, N);
                N = N.sibling;
              }
              Z = nc(H, U.mode, Z), Z.return = U, U = Z;
            }
            return g(U);
          case j:
            return H = pi(H), Ke(
              U,
              N,
              H,
              Z
            );
        }
        if (te(H))
          return pe(
            U,
            N,
            H,
            Z
          );
        if (I(H)) {
          if (xe = I(H), typeof xe != "function") throw Error(s(150));
          return H = xe.call(H), Re(
            U,
            N,
            H,
            Z
          );
        }
        if (typeof H.then == "function")
          return Ke(
            U,
            N,
            qs(H),
            Z
          );
        if (H.$$typeof === L)
          return Ke(
            U,
            N,
            Us(U, H),
            Z
          );
        ks(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, N !== null && N.tag === 6 ? (i(U, N.sibling), Z = u(N, H), Z.return = U, U = Z) : (i(U, N), Z = tc(H, U.mode, Z), Z.return = U, U = Z), g(U)) : i(U, N);
    }
    return function(U, N, H, Z) {
      try {
        nr = 0;
        var xe = Ke(
          U,
          N,
          H,
          Z
        );
        return il = null, xe;
      } catch (be) {
        if (be === al || be === Bs) throw be;
        var qe = Wt(29, be, null, U.mode);
        return qe.lanes = Z, qe.return = U, qe;
      } finally {
      }
    };
  }
  var gi = Pm(!0), Ym = Pm(!1), Ma = !1;
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
  function wa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Aa(e, t, i) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Pe & 2) !== 0) {
      var u = r.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), r.pending = t, t = zs(e), Mm(e, null, i), t;
    }
    return Ns(e, r, t, i), zs(e);
  }
  function ir(e, t, i) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (i & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, bs(e, i);
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
  function lr() {
    if (gc) {
      var e = nl;
      if (e !== null) throw e;
    }
  }
  function rr(e, t, i, r) {
    gc = !1;
    var u = e.updateQueue;
    Ma = !1;
    var f = u.firstBaseUpdate, g = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var w = E, q = w.next;
      w.next = null, g === null ? f = q : g.next = q, g = w;
      var $ = e.alternate;
      $ !== null && ($ = $.updateQueue, E = $.lastBaseUpdate, E !== g && (E === null ? $.firstBaseUpdate = q : E.next = q, $.lastBaseUpdate = w));
    }
    if (f !== null) {
      var W = u.baseState;
      g = 0, $ = q = w = null, E = f;
      do {
        var P = E.lane & -536870913, Y = P !== E.lane;
        if (Y ? (Ue & P) === P : (r & P) === P) {
          P !== 0 && P === tl && (gc = !0), $ !== null && ($ = $.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var pe = e, Re = E;
            P = t;
            var Ke = i;
            switch (Re.tag) {
              case 1:
                if (pe = Re.payload, typeof pe == "function") {
                  W = pe.call(Ke, W, P);
                  break e;
                }
                W = pe;
                break e;
              case 3:
                pe.flags = pe.flags & -65537 | 128;
              case 0:
                if (pe = Re.payload, P = typeof pe == "function" ? pe.call(Ke, W, P) : pe, P == null) break e;
                W = v({}, W, P);
                break e;
              case 2:
                Ma = !0;
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
          }, $ === null ? (q = $ = Y, w = W) : $ = $.next = Y, g |= P;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          Y = E, E = Y.next, Y.next = null, u.lastBaseUpdate = Y, u.shared.pending = null;
        }
      } while (!0);
      $ === null && (w = W), u.baseState = w, u.firstBaseUpdate = q, u.lastBaseUpdate = $, f === null && (u.shared.lanes = 0), Oa |= g, e.lanes = g, e.memoizedState = W;
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
  var ll = M(null), Ps = M(0);
  function Xm(e, t) {
    e = ca, ie(Ps, e), ie(ll, t), ca = e | t.baseLanes;
  }
  function vc() {
    ie(Ps, ca), ie(ll, ll.current);
  }
  function bc() {
    ca = Ps.current, G(ll), G(Ps);
  }
  var en = M(null), mn = null;
  function ja(e) {
    var t = e.alternate;
    ie(ft, ft.current & 1), ie(en, e), mn === null && (t === null || ll.current !== null || t.memoizedState !== null) && (mn = e);
  }
  function Sc(e) {
    ie(ft, ft.current), ie(en, e), mn === null && (mn = e);
  }
  function $m(e) {
    e.tag === 22 ? (ie(ft, ft.current), ie(en, e), mn === null && (mn = e)) : Da();
  }
  function Da() {
    ie(ft, ft.current), ie(en, en.current);
  }
  function tn(e) {
    G(en), mn === e && (mn = null), G(ft);
  }
  var ft = M(0);
  function Ys(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var i = t.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || wf(i) || Af(i)))
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
  var na = 0, we = null, Xe = null, vt = null, Gs = !1, rl = !1, vi = !1, Fs = 0, sr = 0, sl = null, D1 = 0;
  function ot() {
    throw Error(s(321));
  }
  function xc(e, t) {
    if (t === null) return !1;
    for (var i = 0; i < t.length && i < e.length; i++)
      if (!Jt(e[i], t[i])) return !1;
    return !0;
  }
  function Ec(e, t, i, r, u, f) {
    return na = f, we = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Dp : Vc, vi = !1, f = i(r, u), vi = !1, rl && (f = Qm(
      t,
      i,
      r,
      u
    )), Km(e), f;
  }
  function Km(e) {
    O.H = cr;
    var t = Xe !== null && Xe.next !== null;
    if (na = 0, vt = Xe = we = null, Gs = !1, sr = 0, sl = null, t) throw Error(s(300));
    e === null || bt || (e = e.dependencies, e !== null && Ls(e) && (bt = !0));
  }
  function Qm(e, t, i, r) {
    we = e;
    var u = 0;
    do {
      if (rl && (sl = null), sr = 0, rl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, vt = Xe = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = Np, f = t(i, r);
    } while (rl);
    return f;
  }
  function N1() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? or(t) : t, e = e.useState()[0], (Xe !== null ? Xe.memoizedState : null) !== e && (we.flags |= 1024), t;
  }
  function Tc() {
    var e = Fs !== 0;
    return Fs = 0, e;
  }
  function Rc(e, t, i) {
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
    na = 0, vt = Xe = we = null, rl = !1, sr = Fs = 0, sl = null;
  }
  function qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vt === null ? we.memoizedState = vt = e : vt = vt.next = e, vt;
  }
  function dt() {
    if (Xe === null) {
      var e = we.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xe.next;
    var t = vt === null ? we.memoizedState : vt.next;
    if (t !== null)
      vt = t, Xe = e;
    else {
      if (e === null)
        throw we.alternate === null ? Error(s(467)) : Error(s(310));
      Xe = e, e = {
        memoizedState: Xe.memoizedState,
        baseState: Xe.baseState,
        baseQueue: Xe.baseQueue,
        queue: Xe.queue,
        next: null
      }, vt === null ? we.memoizedState = vt = e : vt = vt.next = e;
    }
    return vt;
  }
  function Xs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function or(e) {
    var t = sr;
    return sr += 1, sl === null && (sl = []), e = Hm(sl, e, t), t = we, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Dp : Vc), e;
  }
  function $s(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return or(e);
      if (e.$$typeof === L) return jt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Mc(e) {
    var t = null, i = we.updateQueue;
    if (i !== null && (t = i.memoCache), t == null) {
      var r = we.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), i === null && (i = Xs(), we.updateQueue = i), i.memoCache = t, i = t.data[t.index], i === void 0)
      for (i = t.data[t.index] = Array(e), r = 0; r < e; r++)
        i[r] = Q;
    return t.index++, i;
  }
  function aa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ks(e) {
    var t = dt();
    return wc(t, Xe, e);
  }
  function wc(e, t, i) {
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
      var E = g = null, w = null, q = t, $ = !1;
      do {
        var W = q.lane & -536870913;
        if (W !== q.lane ? (Ue & W) === W : (na & W) === W) {
          var P = q.revertLane;
          if (P === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), W === tl && ($ = !0);
          else if ((na & P) === P) {
            q = q.next, P === tl && ($ = !0);
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
            }, w === null ? (E = w = W, g = f) : w = w.next = W, we.lanes |= P, Oa |= P;
          W = q.action, vi && i(f, W), f = q.hasEagerState ? q.eagerState : i(f, W);
        } else
          P = {
            lane: W,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, w === null ? (E = w = P, g = f) : w = w.next = P, we.lanes |= W, Oa |= W;
        q = q.next;
      } while (q !== null && q !== t);
      if (w === null ? g = f : w.next = E, !Jt(f, e.memoizedState) && (bt = !0, $ && (i = nl, i !== null)))
        throw i;
      e.memoizedState = f, e.baseState = g, e.baseQueue = w, r.lastRenderedState = f;
    }
    return u === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function Ac(e) {
    var t = dt(), i = t.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = e;
    var r = i.dispatch, u = i.pending, f = t.memoizedState;
    if (u !== null) {
      i.pending = null;
      var g = u = u.next;
      do
        f = e(f, g.action), g = g.next;
      while (g !== u);
      Jt(f, t.memoizedState) || (bt = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), i.lastRenderedState = f;
    }
    return [f, r];
  }
  function Zm(e, t, i) {
    var r = we, u = dt(), f = Be;
    if (f) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = t();
    var g = !Jt(
      (Xe || u).memoizedState,
      i
    );
    if (g && (u.memoizedState = i, bt = !0), u = u.queue, Nc(Wm.bind(null, r, u, e), [
      e
    ]), u.getSnapshot !== t || g || vt !== null && vt.memoizedState.tag & 1) {
      if (r.flags |= 2048, ol(
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
      ), Ie === null) throw Error(s(349));
      f || (na & 127) !== 0 || Im(r, t, i);
    }
    return i;
  }
  function Im(e, t, i) {
    e.flags |= 16384, e = { getSnapshot: t, value: i }, t = we.updateQueue, t === null ? (t = Xs(), we.updateQueue = t, t.stores = [e]) : (i = t.stores, i === null ? t.stores = [e] : i.push(e));
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
      return !Jt(e, i);
    } catch {
      return !0;
    }
  }
  function tp(e) {
    var t = ui(e, 2);
    t !== null && Qt(t, e, 2);
  }
  function jc(e) {
    var t = qt();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), vi) {
        Ct(!0);
        try {
          i();
        } finally {
          Ct(!1);
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
  function np(e, t, i, r) {
    return e.baseState = i, wc(
      e,
      Xe,
      typeof r == "function" ? r : aa
    );
  }
  function z1(e, t, i, r, u) {
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
        var E = i(u, r), w = O.S;
        w !== null && w(g, E), ip(e, t, E);
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
    if (Be) {
      var i = Ie.formState;
      if (i !== null) {
        e: {
          var r = we;
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
                ), r = u.data === "F!";
                break e;
              }
            }
            Ra(r);
          }
          r = !1;
        }
        r && (t = i[0]);
      }
    }
    return i = qt(), i.memoizedState = i.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sp,
      lastRenderedState: t
    }, i.queue = r, i = wp.bind(
      null,
      we,
      r
    ), r.dispatch = i, r = jc(!1), f = Uc.bind(
      null,
      we,
      !1,
      r.queue
    ), r = qt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = u, i = z1.bind(
      null,
      we,
      u,
      f,
      i
    ), u.dispatch = i, r.memoizedState = e, [t, i, !1];
  }
  function up(e) {
    var t = dt();
    return cp(t, Xe, e);
  }
  function cp(e, t, i) {
    if (t = wc(
      e,
      t,
      sp
    )[0], e = Ks(aa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = or(t);
      } catch (g) {
        throw g === al ? Bs : g;
      }
    else r = t;
    t = dt();
    var u = t.queue, f = u.dispatch;
    return i !== t.memoizedState && (we.flags |= 2048, ol(
      9,
      { destroy: void 0 },
      O1.bind(null, u, i),
      null
    )), [r, f, e];
  }
  function O1(e, t) {
    e.action = t;
  }
  function fp(e) {
    var t = dt(), i = Xe;
    if (i !== null)
      return cp(t, i, e);
    dt(), t = t.memoizedState, i = dt();
    var r = i.queue.dispatch;
    return i.memoizedState = e, [t, r, !1];
  }
  function ol(e, t, i, r) {
    return e = { tag: e, create: i, deps: r, inst: t, next: null }, t = we.updateQueue, t === null && (t = Xs(), we.updateQueue = t), i = t.lastEffect, i === null ? t.lastEffect = e.next = e : (r = i.next, i.next = e, e.next = r, t.lastEffect = e), e;
  }
  function dp() {
    return dt().memoizedState;
  }
  function Qs(e, t, i, r) {
    var u = qt();
    we.flags |= e, u.memoizedState = ol(
      1 | t,
      { destroy: void 0 },
      i,
      r === void 0 ? null : r
    );
  }
  function Zs(e, t, i, r) {
    var u = dt();
    r = r === void 0 ? null : r;
    var f = u.memoizedState.inst;
    Xe !== null && r !== null && xc(r, Xe.memoizedState.deps) ? u.memoizedState = ol(t, f, i, r) : (we.flags |= e, u.memoizedState = ol(
      1 | t,
      f,
      i,
      r
    ));
  }
  function hp(e, t) {
    Qs(8390656, 8, e, t);
  }
  function Nc(e, t) {
    Zs(2048, 8, e, t);
  }
  function _1(e) {
    we.flags |= 4;
    var t = we.updateQueue;
    if (t === null)
      t = Xs(), we.updateQueue = t, t.events = [e];
    else {
      var i = t.events;
      i === null ? t.events = [e] : i.push(e);
    }
  }
  function mp(e) {
    var t = dt().memoizedState;
    return _1({ ref: t, nextImpl: e }), function() {
      if ((Pe & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function pp(e, t) {
    return Zs(4, 2, e, t);
  }
  function yp(e, t) {
    return Zs(4, 4, e, t);
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
    i = i != null ? i.concat([e]) : null, Zs(4, 4, gp.bind(null, t, e), i);
  }
  function zc() {
  }
  function bp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    return t !== null && xc(t, r[1]) ? r[0] : (i.memoizedState = [e, t], e);
  }
  function Sp(e, t) {
    var i = dt();
    t = t === void 0 ? null : t;
    var r = i.memoizedState;
    if (t !== null && xc(t, r[1]))
      return r[0];
    if (r = e(), vi) {
      Ct(!0);
      try {
        e();
      } finally {
        Ct(!1);
      }
    }
    return i.memoizedState = [r, t], r;
  }
  function Oc(e, t, i) {
    return i === void 0 || (na & 1073741824) !== 0 && (Ue & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = i, e = xy(), we.lanes |= e, Oa |= e, i);
  }
  function xp(e, t, i, r) {
    return Jt(i, t) ? i : ll.current !== null ? (e = Oc(e, i, r), Jt(e, t) || (bt = !0), e) : (na & 42) === 0 || (na & 1073741824) !== 0 && (Ue & 261930) === 0 ? (bt = !0, e.memoizedState = i) : (e = xy(), we.lanes |= e, Oa |= e, t);
  }
  function Ep(e, t, i, r, u) {
    var f = ne.p;
    ne.p = f !== 0 && 8 > f ? f : 8;
    var g = O.T, E = {};
    O.T = E, Uc(e, !1, t, i);
    try {
      var w = u(), q = O.S;
      if (q !== null && q(E, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var $ = j1(
          w,
          r
        );
        ur(
          e,
          t,
          $,
          ln(e)
        );
      } else
        ur(
          e,
          t,
          r,
          ln(e)
        );
    } catch (W) {
      ur(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: W },
        ln()
      );
    } finally {
      ne.p = f, g !== null && E.types !== null && (g.types = E.types), O.T = g;
    }
  }
  function L1() {
  }
  function _c(e, t, i, r) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Tp(e).queue;
    Ep(
      e,
      u,
      t,
      se,
      i === null ? L1 : function() {
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
        lastRenderedReducer: aa,
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
        lastRenderedReducer: aa,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Rp(e) {
    var t = Tp(e);
    t.next === null && (t = e.alternate.memoizedState), ur(
      e,
      t.next.queue,
      {},
      ln()
    );
  }
  function Lc() {
    return jt(Mr);
  }
  function Cp() {
    return dt().memoizedState;
  }
  function Mp() {
    return dt().memoizedState;
  }
  function U1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var i = ln();
          e = wa(i);
          var r = Aa(t, e, i);
          r !== null && (Qt(r, t, i), ir(r, t, i)), t = { cache: cc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function V1(e, t, i) {
    var r = ln();
    i = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Is(e) ? Ap(t, i) : (i = Wu(e, t, i, r), i !== null && (Qt(i, e, r), jp(i, t, r)));
  }
  function wp(e, t, i) {
    var r = ln();
    ur(e, t, i, r);
  }
  function ur(e, t, i, r) {
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
          if (u.hasEagerState = !0, u.eagerState = E, Jt(E, g))
            return Ns(e, t, u, 0), Ie === null && Ds(), !1;
        } catch {
        } finally {
        }
      if (i = Wu(e, t, u, r), i !== null)
        return Qt(i, e, r), jp(i, t, r), !0;
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
      ), t !== null && Qt(t, e, 2);
  }
  function Is(e) {
    var t = e.alternate;
    return e === we || t !== null && t === we;
  }
  function Ap(e, t) {
    rl = Gs = !0;
    var i = e.pending;
    i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
  }
  function jp(e, t, i) {
    if ((i & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, i |= r, t.lanes = i, bs(e, i);
    }
  }
  var cr = {
    readContext: jt,
    use: $s,
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
  cr.useEffectEvent = ot;
  var Dp = {
    readContext: jt,
    use: $s,
    useCallback: function(e, t) {
      return qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: jt,
    useEffect: hp,
    useImperativeHandle: function(e, t, i) {
      i = i != null ? i.concat([e]) : null, Qs(
        4194308,
        4,
        gp.bind(null, t, e),
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
      var i = qt();
      t = t === void 0 ? null : t;
      var r = e();
      if (vi) {
        Ct(!0);
        try {
          e();
        } finally {
          Ct(!1);
        }
      }
      return i.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, i) {
      var r = qt();
      if (i !== void 0) {
        var u = i(t);
        if (vi) {
          Ct(!0);
          try {
            i(t);
          } finally {
            Ct(!1);
          }
        }
      } else u = t;
      return r.memoizedState = r.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, r.queue = e, e = e.dispatch = V1.bind(
        null,
        we,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = jc(e);
      var t = e.queue, i = wp.bind(null, we, t);
      return t.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = qt();
      return Oc(i, e, t);
    },
    useTransition: function() {
      var e = jc(!1);
      return e = Ep.bind(
        null,
        we,
        e.queue,
        !0,
        !1
      ), qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, i) {
      var r = we, u = qt();
      if (Be) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = t(), Ie === null)
          throw Error(s(349));
        (Ue & 127) !== 0 || Im(r, t, i);
      }
      u.memoizedState = i;
      var f = { value: i, getSnapshot: t };
      return u.queue = f, hp(Wm.bind(null, r, f, e), [
        e
      ]), r.flags |= 2048, ol(
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
      var e = qt(), t = Ie.identifierPrefix;
      if (Be) {
        var i = Vn, r = Un;
        i = (r & ~(1 << 32 - _t(r) - 1)).toString(32) + i, t = "_" + t + "R_" + i, i = Fs++, 0 < i && (t += "H" + i.toString(32)), t += "_";
      } else
        i = D1++, t = "_" + t + "r_" + i.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Lc,
    useFormState: op,
    useActionState: op,
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
      return t.queue = i, t = Uc.bind(
        null,
        we,
        !0,
        i
      ), i.dispatch = t, [e, t];
    },
    useMemoCache: Mc,
    useCacheRefresh: function() {
      return qt().memoizedState = U1.bind(
        null,
        we
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
  }, Vc = {
    readContext: jt,
    use: $s,
    useCallback: bp,
    useContext: jt,
    useEffect: Nc,
    useImperativeHandle: vp,
    useInsertionEffect: pp,
    useLayoutEffect: yp,
    useMemo: Sp,
    useReducer: Ks,
    useRef: dp,
    useState: function() {
      return Ks(aa);
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return xp(
        i,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ks(aa)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : or(e),
        t
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Lc,
    useFormState: up,
    useActionState: up,
    useOptimistic: function(e, t) {
      var i = dt();
      return np(i, Xe, e, t);
    },
    useMemoCache: Mc,
    useCacheRefresh: Mp
  };
  Vc.useEffectEvent = mp;
  var Np = {
    readContext: jt,
    use: $s,
    useCallback: bp,
    useContext: jt,
    useEffect: Nc,
    useImperativeHandle: vp,
    useInsertionEffect: pp,
    useLayoutEffect: yp,
    useMemo: Sp,
    useReducer: Ac,
    useRef: dp,
    useState: function() {
      return Ac(aa);
    },
    useDebugValue: zc,
    useDeferredValue: function(e, t) {
      var i = dt();
      return Xe === null ? Oc(i, e, t) : xp(
        i,
        Xe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ac(aa)[0], t = dt().memoizedState;
      return [
        typeof e == "boolean" ? e : or(e),
        t
      ];
    },
    useSyncExternalStore: Zm,
    useId: Cp,
    useHostTransitionStatus: Lc,
    useFormState: fp,
    useActionState: fp,
    useOptimistic: function(e, t) {
      var i = dt();
      return Xe !== null ? np(i, Xe, e, t) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Mc,
    useCacheRefresh: Mp
  };
  Np.useEffectEvent = mp;
  function Bc(e, t, i, r) {
    t = e.memoizedState, i = i(r, t), i = i == null ? t : v({}, t, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Hc = {
    enqueueSetState: function(e, t, i) {
      e = e._reactInternals;
      var r = ln(), u = wa(r);
      u.payload = t, i != null && (u.callback = i), t = Aa(e, u, r), t !== null && (Qt(t, e, r), ir(t, e, r));
    },
    enqueueReplaceState: function(e, t, i) {
      e = e._reactInternals;
      var r = ln(), u = wa(r);
      u.tag = 1, u.payload = t, i != null && (u.callback = i), t = Aa(e, u, r), t !== null && (Qt(t, e, r), ir(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var i = ln(), r = wa(i);
      r.tag = 2, t != null && (r.callback = t), t = Aa(e, r, i), t !== null && (Qt(t, e, i), ir(t, e, i));
    }
  };
  function zp(e, t, i, r, u, f, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, f, g) : t.prototype && t.prototype.isPureReactComponent ? !Zl(i, r) || !Zl(u, f) : !0;
  }
  function Op(e, t, i, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, r), t.state !== e && Hc.enqueueReplaceState(t, t.state, null);
  }
  function bi(e, t) {
    var i = t;
    if ("ref" in t) {
      i = {};
      for (var r in t)
        r !== "ref" && (i[r] = t[r]);
    }
    if (e = e.defaultProps) {
      i === t && (i = v({}, i));
      for (var u in e)
        i[u] === void 0 && (i[u] = e[u]);
    }
    return i;
  }
  function _p(e) {
    js(e);
  }
  function Lp(e) {
    console.error(e);
  }
  function Up(e) {
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
    return i = wa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Js(e, t);
    }, i;
  }
  function Bp(e) {
    return e = wa(e), e.tag = 3, e;
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
      Vp(t, i, r), typeof u != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function B1(e, t, i, r, u) {
    if (i.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = i.alternate, t !== null && el(
        t,
        i,
        u,
        !0
      ), i = en.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return mn === null ? co() : i.alternate === null && ut === 0 && (ut = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, r === Hs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? i.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), df(e, r, u)), !1;
          case 22:
            return i.flags |= 65536, r === Hs ? i.flags |= 16384 : (t = i.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, i.updateQueue = t) : (i = t.retryQueue, i === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : i.add(r)), df(e, r, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return df(e, r, u), co(), !1;
    }
    if (Be)
      return t = en.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, r !== lc && (e = Error(s(422), { cause: r }), Wl(cn(e, i)))) : (r !== lc && (t = Error(s(423), {
        cause: r
      }), Wl(
        cn(t, i)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, r = cn(r, i), u = qc(
        e.stateNode,
        r,
        u
      ), yc(e, u), ut !== 4 && (ut = 2)), !1;
    var f = Error(s(520), { cause: r });
    if (f = cn(f, i), vr === null ? vr = [f] : vr.push(f), ut !== 4 && (ut = 2), t === null) return !0;
    r = cn(r, i), i = t;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = u & -u, i.lanes |= e, e = qc(i.stateNode, r, e), yc(i, e), !1;
        case 1:
          if (t = i.type, f = i.stateNode, (i.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (_a === null || !_a.has(f))))
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
  var kc = Error(s(461)), bt = !1;
  function Dt(e, t, i, r) {
    t.child = e === null ? Ym(t, null, i, r) : gi(
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
    return hi(t), r = Ec(
      e,
      t,
      i,
      g,
      f,
      u
    ), E = Tc(), e !== null && !bt ? (Rc(e, t, u), ia(e, t, u)) : (Be && E && ac(t), t.flags |= 1, Dt(e, t, r, u), t.child);
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
      )) : (e = Os(
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
      if (i = i.compare, i = i !== null ? i : Zl, i(g, r) && e.ref === t.ref)
        return ia(e, t, u);
    }
    return t.flags |= 1, e = Jn(f, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Pp(e, t, i, r, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (Zl(f, r) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = r = f, Qc(e, u))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, ia(e, t, u);
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
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Vs(
          t,
          f !== null ? f.cachePool : null
        ), f !== null ? Xm(t, f) : vc(), $m(t);
      else
        return r = t.lanes = 536870912, Gp(
          e,
          t,
          f !== null ? f.baseLanes | i : i,
          i,
          r
        );
    } else
      f !== null ? (Vs(t, f.cachePool), Xm(t, f), Da(), t.memoizedState = null) : (e !== null && Vs(t, null), vc(), Da());
    return Dt(e, t, u, i), t.child;
  }
  function fr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Gp(e, t, i, r, u) {
    var f = dc();
    return f = f === null ? null : { parent: gt._currentValue, pool: f }, t.memoizedState = {
      baseLanes: i,
      cachePool: f
    }, e !== null && Vs(t, null), vc(), $m(t), e !== null && el(e, t, r, !0), t.childLanes = u, null;
  }
  function Ws(e, t) {
    return t = to(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Fp(e, t, i) {
    return gi(t, e.child, null, i), e = Ws(t, t.pendingProps), e.flags |= 2, tn(t), t.memoizedState = null, e;
  }
  function H1(e, t, i) {
    var r = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Be) {
        if (r.mode === "hidden")
          return e = Ws(t, r), t.lanes = 536870912, fr(null, e);
        if (Sc(t), (e = tt) ? (e = ag(
          e,
          hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Vn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Am(e), i.return = t, t.child = i, At = t, tt = null)) : e = null, e === null) throw Ra(t);
        return t.lanes = 536870912, null;
      }
      return Ws(t, r);
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
      else if (bt || el(e, t, i, !1), u = (i & e.childLanes) !== 0, bt || u) {
        if (r = Ie, r !== null && (g = A(r, i), g !== 0 && g !== f.retryLane))
          throw f.retryLane = g, ui(e, g), Qt(r, e, g), kc;
        co(), t = Fp(
          e,
          t,
          i
        );
      } else
        e = f.treeContext, tt = pn(g.nextSibling), At = t, Be = !0, Ta = null, hn = !1, e !== null && Nm(t, e), t = Ws(t, r), t.flags |= 4096;
      return t;
    }
    return e = Jn(e.child, {
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
  function Pc(e, t, i, r, u) {
    return hi(t), i = Ec(
      e,
      t,
      i,
      r,
      void 0,
      u
    ), r = Tc(), e !== null && !bt ? (Rc(e, t, u), ia(e, t, u)) : (Be && r && ac(t), t.flags |= 1, Dt(e, t, i, u), t.child);
  }
  function Xp(e, t, i, r, u, f) {
    return hi(t), t.updateQueue = null, i = Qm(
      t,
      r,
      i,
      u
    ), Km(e), r = Tc(), e !== null && !bt ? (Rc(e, t, f), ia(e, t, f)) : (Be && r && ac(t), t.flags |= 1, Dt(e, t, i, f), t.child);
  }
  function $p(e, t, i, r, u) {
    if (hi(t), t.stateNode === null) {
      var f = Zi, g = i.contextType;
      typeof g == "object" && g !== null && (f = jt(g)), f = new i(r, f), t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Hc, t.stateNode = f, f._reactInternals = t, f = t.stateNode, f.props = r, f.state = t.memoizedState, f.refs = {}, mc(t), g = i.contextType, f.context = typeof g == "object" && g !== null ? jt(g) : Zi, f.state = t.memoizedState, g = i.getDerivedStateFromProps, typeof g == "function" && (Bc(
        t,
        i,
        g,
        r
      ), f.state = t.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (g = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), g !== f.state && Hc.enqueueReplaceState(f, f.state, null), rr(t, r, f, u), lr(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      f = t.stateNode;
      var E = t.memoizedProps, w = bi(i, E);
      f.props = w;
      var q = f.context, $ = i.contextType;
      g = Zi, typeof $ == "object" && $ !== null && (g = jt($));
      var W = i.getDerivedStateFromProps;
      $ = typeof W == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, $ || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || q !== g) && Op(
        t,
        f,
        r,
        g
      ), Ma = !1;
      var P = t.memoizedState;
      f.state = P, rr(t, r, f, u), lr(), q = t.memoizedState, E || P !== q || Ma ? (typeof W == "function" && (Bc(
        t,
        i,
        W,
        r
      ), q = t.memoizedState), (w = Ma || zp(
        t,
        i,
        w,
        r,
        P,
        q,
        g
      )) ? ($ || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = q), f.props = r, f.state = q, f.context = g, r = w) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      f = t.stateNode, pc(e, t), g = t.memoizedProps, $ = bi(i, g), f.props = $, W = t.pendingProps, P = f.context, q = i.contextType, w = Zi, typeof q == "object" && q !== null && (w = jt(q)), E = i.getDerivedStateFromProps, (q = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (g !== W || P !== w) && Op(
        t,
        f,
        r,
        w
      ), Ma = !1, P = t.memoizedState, f.state = P, rr(t, r, f, u), lr();
      var Y = t.memoizedState;
      g !== W || P !== Y || Ma || e !== null && e.dependencies !== null && Ls(e.dependencies) ? (typeof E == "function" && (Bc(
        t,
        i,
        E,
        r
      ), Y = t.memoizedState), ($ = Ma || zp(
        t,
        i,
        $,
        r,
        P,
        Y,
        w
      ) || e !== null && e.dependencies !== null && Ls(e.dependencies)) ? (q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(r, Y, w), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        r,
        Y,
        w
      )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = Y), f.props = r, f.state = Y, f.context = w, r = $) : (typeof f.componentDidUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && P === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return f = r, eo(e, t), r = (t.flags & 128) !== 0, f || r ? (f = t.stateNode, i = r && typeof i.getDerivedStateFromError != "function" ? null : f.render(), t.flags |= 1, e !== null && r ? (t.child = gi(
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
  function Kp(e, t, i, r) {
    return fi(), t.flags |= 256, Dt(e, t, i, r), t.child;
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
    return e = e !== null ? e.childLanes & ~i : 0, t && (e |= an), e;
  }
  function Qp(e, t, i) {
    var r = t.pendingProps, u = !1, f = (t.flags & 128) !== 0, g;
    if ((g = f) || (g = e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0), g && (u = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Be) {
        if (u ? ja(t) : Da(), (e = tt) ? (e = ag(
          e,
          hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Vn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Am(e), i.return = t, t.child = i, At = t, tt = null)) : e = null, e === null) throw Ra(t);
        return Af(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, u ? (Da(), u = t.mode, E = to(
        { mode: "hidden", children: E },
        u
      ), r = ci(
        r,
        u,
        i,
        null
      ), E.return = t, r.return = t, E.sibling = r, t.child = E, r = t.child, r.memoizedState = Gc(i), r.childLanes = Fc(
        e,
        g,
        i
      ), t.memoizedState = Yc, fr(null, r)) : (ja(t), Xc(t, E));
    }
    var w = e.memoizedState;
    if (w !== null && (E = w.dehydrated, E !== null)) {
      if (f)
        t.flags & 256 ? (ja(t), t.flags &= -257, t = $c(
          e,
          t,
          i
        )) : t.memoizedState !== null ? (Da(), t.child = e.child, t.flags |= 128, t = null) : (Da(), E = r.fallback, u = t.mode, r = to(
          { mode: "visible", children: r.children },
          u
        ), E = ci(
          E,
          u,
          i,
          null
        ), E.flags |= 2, r.return = t, E.return = t, r.sibling = E, t.child = r, gi(
          t,
          e.child,
          null,
          i
        ), r = t.child, r.memoizedState = Gc(i), r.childLanes = Fc(
          e,
          g,
          i
        ), t.memoizedState = Yc, t = fr(null, r));
      else if (ja(t), Af(E)) {
        if (g = E.nextSibling && E.nextSibling.dataset, g) var q = g.dgst;
        g = q, r = Error(s(419)), r.stack = "", r.digest = g, Wl({ value: r, source: null, stack: null }), t = $c(
          e,
          t,
          i
        );
      } else if (bt || el(e, t, i, !1), g = (i & e.childLanes) !== 0, bt || g) {
        if (g = Ie, g !== null && (r = A(g, i), r !== 0 && r !== w.retryLane))
          throw w.retryLane = r, ui(e, r), Qt(g, e, r), kc;
        wf(E) || co(), t = $c(
          e,
          t,
          i
        );
      } else
        wf(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = w.treeContext, tt = pn(
          E.nextSibling
        ), At = t, Be = !0, Ta = null, hn = !1, e !== null && Nm(t, e), t = Xc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Da(), E = r.fallback, u = t.mode, w = e.child, q = w.sibling, r = Jn(w, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = w.subtreeFlags & 65011712, q !== null ? E = Jn(
      q,
      E
    ) : (E = ci(
      E,
      u,
      i,
      null
    ), E.flags |= 2), E.return = t, r.return = t, r.sibling = E, t.child = r, fr(null, r), r = t.child, E = e.child.memoizedState, E === null ? E = Gc(i) : (u = E.cachePool, u !== null ? (w = gt._currentValue, u = u.parent !== w ? { parent: w, pool: w } : u) : u = Vm(), E = {
      baseLanes: E.baseLanes | i,
      cachePool: u
    }), r.memoizedState = E, r.childLanes = Fc(
      e,
      g,
      i
    ), t.memoizedState = Yc, fr(e.child, r)) : (ja(t), i = e.child, e = i.sibling, i = Jn(i, {
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
    return e = Wt(22, e, null, t), e.lanes = 0, e;
  }
  function $c(e, t, i) {
    return gi(t, e.child, null, i), e = Xc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Zp(e, t, i) {
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
  function Ip(e, t, i) {
    var r = t.pendingProps, u = r.revealOrder, f = r.tail;
    r = r.children;
    var g = ft.current, E = (g & 2) !== 0;
    if (E ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, ie(ft, g), Dt(e, t, r, i), r = Be ? Jl : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Zp(e, i, t);
        else if (e.tag === 19)
          Zp(e, i, t);
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
          if (e = u.alternate, e !== null && Ys(e) === null) {
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
  function Qc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ls(e)));
  }
  function q1(e, t, i) {
    switch (t.tag) {
      case 3:
        mt(t, t.stateNode.containerInfo), Ca(t, gt, e.memoizedState.cache), fi();
        break;
      case 27:
      case 5:
        ti(t);
        break;
      case 4:
        mt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ca(
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
          return r.dehydrated !== null ? (ja(t), t.flags |= 128, null) : (i & t.child.childLanes) !== 0 ? Qp(e, t, i) : (ja(t), e = ia(
            e,
            t,
            i
          ), e !== null ? e.sibling : null);
        ja(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (r = (i & t.childLanes) !== 0, r || (el(
          e,
          t,
          i,
          !1
        ), r = (i & t.childLanes) !== 0), u) {
          if (r)
            return Ip(
              e,
              t,
              i
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ie(ft, ft.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, Yp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        Ca(t, gt, e.memoizedState.cache);
    }
    return ia(e, t, i);
  }
  function Jp(e, t, i) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        bt = !0;
      else {
        if (!Qc(e, i) && (t.flags & 128) === 0)
          return bt = !1, q1(
            e,
            t,
            i
          );
        bt = (e.flags & 131072) !== 0;
      }
    else
      bt = !1, Be && (t.flags & 1048576) !== 0 && Dm(t, Jl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = pi(t.elementType), t.type = e, typeof e == "function")
            ec(e) ? (r = bi(e, r), t.tag = 1, t = $p(
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
              } else if (u === J) {
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
            throw t = oe(e) || e, Error(s(306, t, ""));
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
        return r = t.type, u = bi(
          r,
          t.pendingProps
        ), $p(
          e,
          t,
          r,
          u,
          i
        );
      case 3:
        e: {
          if (mt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          r = t.pendingProps;
          var f = t.memoizedState;
          u = f.element, pc(e, t), rr(t, r, null, i);
          var g = t.memoizedState;
          if (r = g.cache, Ca(t, gt, r), r !== f.cache && uc(
            t,
            [gt],
            i,
            !0
          ), lr(), r = g.element, f.isDehydrated)
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
              u = cn(
                Error(s(424)),
                t
              ), Wl(u), t = Kp(
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
              for (tt = pn(e.firstChild), At = t, Be = !0, Ta = null, hn = !0, i = Ym(
                t,
                null,
                r,
                i
              ), t.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (fi(), r === u) {
              t = ia(
                e,
                t,
                i
              );
              break e;
            }
            Dt(e, t, r, i);
          }
          t = t.child;
        }
        return t;
      case 26:
        return eo(e, t), e === null ? (i = ug(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = i : Be || (i = t.type, e = t.pendingProps, r = vo(
          Ce.current
        ).createElement(i), r[de] = t, r[he] = e, Nt(r, i, e), We(r), t.stateNode = r) : t.memoizedState = ug(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ti(t), e === null && Be && (r = t.stateNode = rg(
          t.type,
          t.pendingProps,
          Ce.current
        ), At = t, hn = !0, u = tt, Ba(t.type) ? (jf = u, tt = pn(r.firstChild)) : tt = u), Dt(
          e,
          t,
          t.pendingProps.children,
          i
        ), eo(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Be && ((u = r = tt) && (r = yE(
          r,
          t.type,
          t.pendingProps,
          hn
        ), r !== null ? (t.stateNode = r, At = t, tt = pn(r.firstChild), hn = !1, u = !0) : u = !1), u || Ra(t)), ti(t), u = t.type, f = t.pendingProps, g = e !== null ? e.memoizedProps : null, r = f.children, Rf(u, f) ? r = null : g !== null && Rf(u, g) && (t.flags |= 32), t.memoizedState !== null && (u = Ec(
          e,
          t,
          N1,
          null,
          null,
          i
        ), Mr._currentValue = u), eo(e, t), Dt(e, t, r, i), t.child;
      case 6:
        return e === null && Be && ((e = i = tt) && (i = gE(
          i,
          t.pendingProps,
          hn
        ), i !== null ? (t.stateNode = i, At = t, tt = null, e = !0) : e = !1), e || Ra(t)), null;
      case 13:
        return Qp(e, t, i);
      case 4:
        return mt(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = gi(
          t,
          null,
          r,
          i
        ) : Dt(e, t, r, i), t.child;
      case 11:
        return qp(
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
        return r = t.pendingProps, Ca(t, t.type, r.value), Dt(e, t, r.children, i), t.child;
      case 9:
        return u = t.type._context, r = t.pendingProps.children, hi(t), u = jt(u), r = r(u), t.flags |= 1, Dt(e, t, r, i), t.child;
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
        return Ip(e, t, i);
      case 31:
        return H1(e, t, i);
      case 22:
        return Yp(
          e,
          t,
          i,
          t.pendingProps
        );
      case 24:
        return hi(t), r = jt(gt), e === null ? (u = dc(), u === null && (u = Ie, f = cc(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= i), u = f), t.memoizedState = { parent: r, cache: u }, mc(t), Ca(t, gt, u)) : ((e.lanes & i) !== 0 && (pc(e, t), rr(t, null, null, i), lr()), u = e.memoizedState, f = t.memoizedState, u.parent !== r ? (u = { parent: r, cache: r }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Ca(t, gt, r)) : (r = f.cache, Ca(t, gt, r), r !== u.cache && uc(
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
  function Zc(e, t, i, r, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Cy()) e.flags |= 8192;
        else
          throw yi = Hs, hc;
    } else e.flags &= -16777217;
  }
  function Wp(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !mg(t))
      if (Cy()) e.flags |= 8192;
      else
        throw yi = Hs, hc;
  }
  function no(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Pl() : 536870912, e.lanes |= t, dl |= t);
  }
  function dr(e, t) {
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
          for (var r = null; i !== null; )
            i.alternate !== null && (r = i), i = i.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function nt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, i = 0, r = 0;
    if (t)
      for (var u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags & 65011712, r |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        i |= u.lanes | u.childLanes, r |= u.subtreeFlags, r |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= r, e.childLanes = i, t;
  }
  function k1(e, t, i) {
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
        return nt(t), null;
      case 1:
        return nt(t), null;
      case 3:
        return i = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ta(gt), Qe(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Wi(t) ? la(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rc())), nt(t), null;
      case 26:
        var u = t.type, f = t.memoizedState;
        return e === null ? (la(t), f !== null ? (nt(t), Wp(t, f)) : (nt(t), Zc(
          t,
          u,
          null,
          r,
          i
        ))) : f ? f !== e.memoizedState ? (la(t), nt(t), Wp(t, f)) : (nt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && la(t), nt(t), Zc(
          t,
          u,
          e,
          r,
          i
        )), null;
      case 27:
        if (Li(t), i = Ce.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          e = fe.current, Wi(t) ? zm(t) : (e = rg(u, r, i), t.stateNode = e, la(t));
        }
        return nt(t), null;
      case 5:
        if (Li(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(s(166));
            return nt(t), null;
          }
          if (f = fe.current, Wi(t))
            zm(t);
          else {
            var g = vo(
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
            f[de] = t, f[he] = r;
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
            e: switch (Nt(f, u, r), u) {
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
        return nt(t), Zc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          i
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && la(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Ce.current, Wi(t)) {
            if (e = t.stateNode, i = t.memoizedProps, r = null, u = At, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  r = u.memoizedProps;
              }
            e[de] = t, e = !!(e.nodeValue === i || r !== null && r.suppressHydrationWarning === !0 || Qy(e.nodeValue, i)), e || Ra(t, !0);
          } else
            e = vo(e).createTextNode(
              r
            ), e[de] = t, t.stateNode = e;
        }
        return nt(t), null;
      case 31:
        if (i = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = Wi(t), i !== null) {
            if (e === null) {
              if (!r) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[de] = t;
            } else
              fi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), e = !1;
          } else
            i = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return nt(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Wi(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[de] = t;
            } else
              fi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            nt(t), u = !1;
          } else
            u = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (tn(t), t) : (tn(t), null);
        }
        return tn(t), (t.flags & 128) !== 0 ? (t.lanes = i, t) : (i = r !== null, e = e !== null && e.memoizedState !== null, i && (r = t.child, u = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (u = r.alternate.memoizedState.cachePool.pool), f = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (f = r.memoizedState.cachePool.pool), f !== u && (r.flags |= 2048)), i !== e && i && (t.child.flags |= 8192), no(t, t.updateQueue), nt(t), null);
      case 4:
        return Qe(), e === null && bf(t.stateNode.containerInfo), nt(t), null;
      case 10:
        return ta(t.type), nt(t), null;
      case 19:
        if (G(ft), r = t.memoizedState, r === null) return nt(t), null;
        if (u = (t.flags & 128) !== 0, f = r.rendering, f === null)
          if (u) dr(r, !1);
          else {
            if (ut !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (f = Ys(e), f !== null) {
                  for (t.flags |= 128, dr(r, !1), e = f.updateQueue, t.updateQueue = e, no(t, e), t.subtreeFlags = 0, e = i, i = t.child; i !== null; )
                    wm(i, e), i = i.sibling;
                  return ie(
                    ft,
                    ft.current & 1 | 2
                  ), Be && Wn(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Bt() > so && (t.flags |= 128, u = !0, dr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Ys(f), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, no(t, e), dr(r, !0), r.tail === null && r.tailMode === "hidden" && !f.alternate && !Be)
                return nt(t), null;
            } else
              2 * Bt() - r.renderingStartTime > so && i !== 536870912 && (t.flags |= 128, u = !0, dr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (f.sibling = t.child, t.child = f) : (e = r.last, e !== null ? e.sibling = f : t.child = f, r.last = f);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Bt(), e.sibling = null, i = ft.current, ie(
          ft,
          u ? i & 1 | 2 : i & 1
        ), Be && Wn(t, r.treeForkCount), e) : (nt(t), null);
      case 22:
      case 23:
        return tn(t), bc(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (i & 536870912) !== 0 && (t.flags & 128) === 0 && (nt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : nt(t), i = t.updateQueue, i !== null && no(t, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== i && (t.flags |= 2048), e !== null && G(mi), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ta(gt), nt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function P1(e, t) {
    switch (ic(t), t.tag) {
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
        return G(ft), null;
      case 4:
        return Qe(), null;
      case 10:
        return ta(t.type), null;
      case 22:
      case 23:
        return tn(t), bc(), e !== null && G(mi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ta(gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ey(e, t) {
    switch (ic(t), t.tag) {
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
        G(ft);
        break;
      case 10:
        ta(t.type);
        break;
      case 22:
      case 23:
        tn(t), bc(), e !== null && G(mi);
        break;
      case 24:
        ta(gt);
    }
  }
  function hr(e, t) {
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
      Ge(t, t.return, E);
    }
  }
  function Na(e, t, i) {
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
              var w = i, q = E;
              try {
                q();
              } catch ($) {
                Ge(
                  u,
                  w,
                  $
                );
              }
            }
          }
          r = r.next;
        } while (r !== f);
      }
    } catch ($) {
      Ge(t, t.return, $);
    }
  }
  function ty(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var i = e.stateNode;
      try {
        Fm(t, i);
      } catch (r) {
        Ge(e, e.return, r);
      }
    }
  }
  function ny(e, t, i) {
    i.props = bi(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (r) {
      Ge(e, t, r);
    }
  }
  function mr(e, t) {
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
      Ge(e, t, u);
    }
  }
  function Bn(e, t) {
    var i = e.ref, r = e.refCleanup;
    if (i !== null)
      if (typeof r == "function")
        try {
          r();
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
      Ge(e, e.return, u);
    }
  }
  function Ic(e, t, i) {
    try {
      var r = e.stateNode;
      cE(r, e.type, i, t), r[he] = t;
    } catch (u) {
      Ge(e, e.return, u);
    }
  }
  function iy(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ba(e.type) || e.tag === 4;
  }
  function Jc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || iy(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ba(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wc(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, t) : (t = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, t.appendChild(e), i = i._reactRootContainer, i != null || t.onclick !== null || (t.onclick = Zn));
    else if (r !== 4 && (r === 27 && Ba(e.type) && (i = e.stateNode, t = null), e = e.child, e !== null))
      for (Wc(e, t, i), e = e.sibling; e !== null; )
        Wc(e, t, i), e = e.sibling;
  }
  function ao(e, t, i) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? i.insertBefore(e, t) : i.appendChild(e);
    else if (r !== 4 && (r === 27 && Ba(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (ao(e, t, i), e = e.sibling; e !== null; )
        ao(e, t, i), e = e.sibling;
  }
  function ly(e) {
    var t = e.stateNode, i = e.memoizedProps;
    try {
      for (var r = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Nt(t, r, i), t[de] = e, t[he] = i;
    } catch (f) {
      Ge(e, e.return, f);
    }
  }
  var ra = !1, St = !1, ef = !1, ry = typeof WeakSet == "function" ? WeakSet : Set, wt = null;
  function Y1(e, t) {
    if (e = e.containerInfo, Ef = Co, e = vm(e), $u(e)) {
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
            var g = 0, E = -1, w = -1, q = 0, $ = 0, W = e, P = null;
            t: for (; ; ) {
              for (var Y; W !== i || u !== 0 && W.nodeType !== 3 || (E = g + u), W !== f || r !== 0 && W.nodeType !== 3 || (w = g + r), W.nodeType === 3 && (g += W.nodeValue.length), (Y = W.firstChild) !== null; )
                P = W, W = Y;
              for (; ; ) {
                if (W === e) break t;
                if (P === i && ++q === u && (E = g), P === f && ++$ === r && (w = g), (Y = W.nextSibling) !== null) break;
                W = P, P = W.parentNode;
              }
              W = Y;
            }
            i = E === -1 || w === -1 ? null : { start: E, end: w };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Tf = { focusedElem: e, selectionRange: i }, Co = !1, wt = t; wt !== null; )
      if (t = wt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, wt = e;
      else
        for (; wt !== null; ) {
          switch (t = wt, f = t.alternate, e = t.flags, t.tag) {
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
                  var pe = bi(
                    i.type,
                    u
                  );
                  e = r.getSnapshotBeforeUpdate(
                    pe,
                    f
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
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
            e.return = t.return, wt = e;
            break;
          }
          wt = t.return;
        }
  }
  function sy(e, t, i) {
    var r = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        oa(e, i), r & 4 && hr(5, i);
        break;
      case 1:
        if (oa(e, i), r & 4)
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
        r & 64 && ty(i), r & 512 && mr(i, i.return);
        break;
      case 3:
        if (oa(e, i), r & 64 && (e = i.updateQueue, e !== null)) {
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
            Ge(i, i.return, g);
          }
        }
        break;
      case 27:
        t === null && r & 4 && ly(i);
      case 26:
      case 5:
        oa(e, i), t === null && r & 4 && ay(i), r & 512 && mr(i, i.return);
        break;
      case 12:
        oa(e, i);
        break;
      case 31:
        oa(e, i), r & 4 && cy(e, i);
        break;
      case 13:
        oa(e, i), r & 4 && fy(e, i), r & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = J1.bind(
          null,
          i
        ), vE(e, i))));
        break;
      case 22:
        if (r = i.memoizedState !== null || ra, !r) {
          t = t !== null && t.memoizedState !== null || St, u = ra;
          var f = St;
          ra = r, (St = t) && !f ? ua(
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
  function oy(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, oy(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ze(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, Ft = !1;
  function sa(e, t, i) {
    for (i = i.child; i !== null; )
      uy(e, t, i), i = i.sibling;
  }
  function uy(e, t, i) {
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
        var r = rt, u = Ft;
        Ba(i.type) && (rt = i.stateNode, Ft = !1), sa(
          e,
          t,
          i
        ), Tr(i.stateNode), rt = r, Ft = u;
        break;
      case 5:
        St || Bn(i, t);
      case 6:
        if (r = rt, u = Ft, rt = null, sa(
          e,
          t,
          i
        ), rt = r, Ft = u, rt !== null)
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
        rt !== null && (Ft ? (e = rt, tg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), Sl(e)) : tg(rt, i.stateNode));
        break;
      case 4:
        r = rt, u = Ft, rt = i.stateNode.containerInfo, Ft = !0, sa(
          e,
          t,
          i
        ), rt = r, Ft = u;
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
        St || (Bn(i, t), r = i.stateNode, typeof r.componentWillUnmount == "function" && ny(
          i,
          t,
          r
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
        St = (r = St) || i.memoizedState !== null, sa(
          e,
          t,
          i
        ), St = r;
        break;
      default:
        sa(
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
        Sl(e);
      } catch (i) {
        Ge(t, t.return, i);
      }
    }
  }
  function fy(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Sl(e);
      } catch (i) {
        Ge(t, t.return, i);
      }
  }
  function G1(e) {
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
  function io(e, t) {
    var i = G1(e);
    t.forEach(function(r) {
      if (!i.has(r)) {
        i.add(r);
        var u = W1.bind(null, e, r);
        r.then(u, u);
      }
    });
  }
  function Xt(e, t) {
    var i = t.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var u = i[r], f = e, g = t, E = g;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (Ba(E.type)) {
                rt = E.stateNode, Ft = !1;
                break e;
              }
              break;
            case 5:
              rt = E.stateNode, Ft = !1;
              break e;
            case 3:
            case 4:
              rt = E.stateNode.containerInfo, Ft = !0;
              break e;
          }
          E = E.return;
        }
        if (rt === null) throw Error(s(160));
        uy(f, g, u), rt = null, Ft = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        dy(t, e), t = t.sibling;
  }
  var wn = null;
  function dy(e, t) {
    var i = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Xt(t, e), $t(e), r & 4 && (Na(3, e, e.return), hr(3, e), Na(5, e, e.return));
        break;
      case 1:
        Xt(t, e), $t(e), r & 512 && (St || i === null || Bn(i, i.return)), r & 64 && ra && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? r : i.concat(r))));
        break;
      case 26:
        var u = wn;
        if (Xt(t, e), $t(e), r & 512 && (St || i === null || Bn(i, i.return)), r & 4) {
          var f = i !== null ? i.memoizedState : null;
          if (r = e.memoizedState, i === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, i = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (r) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[De] || f[de] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(r), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), Nt(f, r, i), f[de] = e, We(f), r = f;
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
                      f = u.createElement(r), Nt(f, r, i), u.head.appendChild(f);
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
                      f = u.createElement(r), Nt(f, r, i), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(s(468, r));
                  }
                  f[de] = e, We(f), r = f;
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
            )) : r === null && e.stateNode !== null && Ic(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Xt(t, e), $t(e), r & 512 && (St || i === null || Bn(i, i.return)), i !== null && r & 4 && Ic(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Xt(t, e), $t(e), r & 512 && (St || i === null || Bn(i, i.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Yi(u, "");
          } catch (pe) {
            Ge(e, e.return, pe);
          }
        }
        r & 4 && e.stateNode != null && (u = e.memoizedProps, Ic(
          e,
          u,
          i !== null ? i.memoizedProps : u
        )), r & 1024 && (ef = !0);
        break;
      case 6:
        if (Xt(t, e), $t(e), r & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          r = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = r;
          } catch (pe) {
            Ge(e, e.return, pe);
          }
        }
        break;
      case 3:
        if (xo = null, u = wn, wn = bo(t.containerInfo), Xt(t, e), wn = u, $t(e), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Sl(t.containerInfo);
          } catch (pe) {
            Ge(e, e.return, pe);
          }
        ef && (ef = !1, hy(e));
        break;
      case 4:
        r = wn, wn = bo(
          e.stateNode.containerInfo
        ), Xt(t, e), $t(e), wn = r;
        break;
      case 12:
        Xt(t, e), $t(e);
        break;
      case 31:
        Xt(t, e), $t(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
        break;
      case 13:
        Xt(t, e), $t(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (ro = Bt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var w = i !== null && i.memoizedState !== null, q = ra, $ = St;
        if (ra = q || u, St = $ || w, Xt(t, e), St = $, ra = q, $t(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (i === null || w || ra || St || Si(e)), i = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (i === null) {
                w = i = t;
                try {
                  if (f = w.stateNode, u)
                    g = f.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    E = w.stateNode;
                    var W = w.memoizedProps.style, P = W != null && W.hasOwnProperty("display") ? W.display : null;
                    E.style.display = P == null || typeof P == "boolean" ? "" : ("" + P).trim();
                  }
                } catch (pe) {
                  Ge(w, w.return, pe);
                }
              }
            } else if (t.tag === 6) {
              if (i === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = u ? "" : w.memoizedProps;
                } catch (pe) {
                  Ge(w, w.return, pe);
                }
              }
            } else if (t.tag === 18) {
              if (i === null) {
                w = t;
                try {
                  var Y = w.stateNode;
                  u ? ng(Y, !0) : ng(w.stateNode, !1);
                } catch (pe) {
                  Ge(w, w.return, pe);
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
        Xt(t, e), $t(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, io(e, r)));
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
            ao(e, f, u);
            break;
          case 5:
            var g = i.stateNode;
            i.flags & 32 && (Yi(g, ""), i.flags &= -33);
            var E = Jc(e);
            ao(e, E, g);
            break;
          case 3:
          case 4:
            var w = i.stateNode.containerInfo, q = Jc(e);
            Wc(
              e,
              q,
              w
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch ($) {
        Ge(e, e.return, $);
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
  function oa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        sy(e, t.alternate, t), t = t.sibling;
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
          typeof i.componentWillUnmount == "function" && ny(
            t,
            t.return,
            i
          ), Si(t);
          break;
        case 27:
          Tr(t.stateNode);
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
      var r = t.alternate, u = e, f = t, g = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          ua(
            u,
            f,
            i
          ), hr(4, f);
          break;
        case 1:
          if (ua(
            u,
            f,
            i
          ), r = f, u = r.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (q) {
              Ge(r, r.return, q);
            }
          if (r = f, u = r.updateQueue, u !== null) {
            var E = r.stateNode;
            try {
              var w = u.shared.hiddenCallbacks;
              if (w !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < w.length; u++)
                  Gm(w[u], E);
            } catch (q) {
              Ge(r, r.return, q);
            }
          }
          i && g & 64 && ty(f), mr(f, f.return);
          break;
        case 27:
          ly(f);
        case 26:
        case 5:
          ua(
            u,
            f,
            i
          ), i && r === null && g & 4 && ay(f), mr(f, f.return);
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
          ), i && g & 4 && cy(u, f);
          break;
        case 13:
          ua(
            u,
            f,
            i
          ), i && g & 4 && fy(u, f);
          break;
        case 22:
          f.memoizedState === null && ua(
            u,
            f,
            i
          ), mr(f, f.return);
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
  function tf(e, t) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && er(i));
  }
  function nf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && er(e));
  }
  function An(e, t, i, r) {
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
        An(
          e,
          t,
          i,
          r
        ), u & 2048 && hr(9, t);
        break;
      case 1:
        An(
          e,
          t,
          i,
          r
        );
        break;
      case 3:
        An(
          e,
          t,
          i,
          r
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && er(e)));
        break;
      case 12:
        if (u & 2048) {
          An(
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
          } catch (w) {
            Ge(t, t.return, w);
          }
        } else
          An(
            e,
            t,
            i,
            r
          );
        break;
      case 31:
        An(
          e,
          t,
          i,
          r
        );
        break;
      case 13:
        An(
          e,
          t,
          i,
          r
        );
        break;
      case 23:
        break;
      case 22:
        f = t.stateNode, g = t.alternate, t.memoizedState !== null ? f._visibility & 2 ? An(
          e,
          t,
          i,
          r
        ) : pr(e, t) : f._visibility & 2 ? An(
          e,
          t,
          i,
          r
        ) : (f._visibility |= 2, ul(
          e,
          t,
          i,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && tf(g, t);
        break;
      case 24:
        An(
          e,
          t,
          i,
          r
        ), u & 2048 && nf(t.alternate, t);
        break;
      default:
        An(
          e,
          t,
          i,
          r
        );
    }
  }
  function ul(e, t, i, r, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var f = e, g = t, E = i, w = r, q = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          ul(
            f,
            g,
            E,
            w,
            u
          ), hr(8, g);
          break;
        case 23:
          break;
        case 22:
          var $ = g.stateNode;
          g.memoizedState !== null ? $._visibility & 2 ? ul(
            f,
            g,
            E,
            w,
            u
          ) : pr(
            f,
            g
          ) : ($._visibility |= 2, ul(
            f,
            g,
            E,
            w,
            u
          )), u && q & 2048 && tf(
            g.alternate,
            g
          );
          break;
        case 24:
          ul(
            f,
            g,
            E,
            w,
            u
          ), u && q & 2048 && nf(g.alternate, g);
          break;
        default:
          ul(
            f,
            g,
            E,
            w,
            u
          );
      }
      t = t.sibling;
    }
  }
  function pr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var i = e, r = t, u = r.flags;
        switch (r.tag) {
          case 22:
            pr(i, r), u & 2048 && tf(
              r.alternate,
              r
            );
            break;
          case 24:
            pr(i, r), u & 2048 && nf(r.alternate, r);
            break;
          default:
            pr(i, r);
        }
        t = t.sibling;
      }
  }
  var yr = 8192;
  function cl(e, t, i) {
    if (e.subtreeFlags & yr)
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
        cl(
          e,
          t,
          i
        ), e.flags & yr && e.memoizedState !== null && DE(
          i,
          wn,
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
        var r = wn;
        wn = bo(e.stateNode.containerInfo), cl(
          e,
          t,
          i
        ), wn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = yr, yr = 16777216, cl(
          e,
          t,
          i
        ), yr = r) : cl(
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
  function yy(e) {
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
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          wt = r, vy(
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
        gr(e), e.flags & 2048 && Na(9, e, e.return);
        break;
      case 3:
        gr(e);
        break;
      case 12:
        gr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, lo(e)) : gr(e);
        break;
      default:
        gr(e);
    }
  }
  function lo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          wt = r, vy(
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
          Na(8, t, t.return), lo(t);
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
  function vy(e, t) {
    for (; wt !== null; ) {
      var i = wt;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, i, t);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var r = i.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          er(i.memoizedState.cache);
      }
      if (r = i.child, r !== null) r.return = i, wt = r;
      else
        e: for (i = e; wt !== null; ) {
          r = wt;
          var u = r.sibling, f = r.return;
          if (oy(r), r === i) {
            wt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, wt = u;
            break e;
          }
          wt = f;
        }
    }
  }
  var F1 = {
    getCacheForType: function(e) {
      var t = jt(gt), i = t.data.get(e);
      return i === void 0 && (i = e(), t.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return jt(gt).controller.signal;
    }
  }, X1 = typeof WeakMap == "function" ? WeakMap : Map, Pe = 0, Ie = null, _e = null, Ue = 0, Ye = 0, nn = null, za = !1, fl = !1, af = !1, ca = 0, ut = 0, Oa = 0, xi = 0, lf = 0, an = 0, dl = 0, vr = null, Kt = null, rf = !1, ro = 0, by = 0, so = 1 / 0, oo = null, _a = null, Tt = 0, La = null, hl = null, fa = 0, sf = 0, of = null, Sy = null, br = 0, uf = null;
  function ln() {
    return (Pe & 2) !== 0 && Ue !== 0 ? Ue & -Ue : O.T !== null ? pf() : ae();
  }
  function xy() {
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
  function Ey(e, t, i) {
    if ((Pe & 6) !== 0) throw Error(s(327));
    var r = !i && (t & 127) === 0 && (t & e.expiredLanes) === 0 || va(e, t), u = r ? Q1(e, t) : ff(e, t, !0), f = r;
    do {
      if (u === 0) {
        fl && !r && Ua(e, t, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, f && !$1(i)) {
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
              u = vr;
              var w = E.current.memoizedState.isDehydrated;
              if (w && (ml(E, g).flags |= 256), g = ff(
                E,
                g,
                !1
              ), g !== 2) {
                if (af && !w) {
                  E.errorRecoveryDisabledLanes |= f, xi |= f, u = 4;
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
          switch (r = e, f = u, f) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ua(
                r,
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
          if ((t & 62914560) === t && (u = ro + 300 - Bt(), 10 < u)) {
            if (Ua(
              r,
              t,
              an,
              !za
            ), Bi(r, 0, !0) !== 0) break e;
            fa = t, r.timeoutHandle = Wy(
              Ty.bind(
                null,
                r,
                i,
                Kt,
                oo,
                rf,
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
          Ty(
            r,
            i,
            Kt,
            oo,
            rf,
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
  function Ty(e, t, i, r, u, f, g, E, w, q, $, W, P, Y) {
    if (e.timeoutHandle = -1, W = t.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Zn
      }, py(
        t,
        f,
        W
      );
      var pe = (f & 62914560) === f ? ro - Bt() : (f & 4194048) === f ? by - Bt() : 0;
      if (pe = NE(
        W,
        pe
      ), pe !== null) {
        fa = f, e.cancelPendingCommit = pe(
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
            w,
            $,
            W,
            null,
            P,
            Y
          )
        ), Ua(e, f, g, !q);
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
      w
    );
  }
  function $1(e) {
    for (var t = e; ; ) {
      var i = t.tag;
      if ((i === 0 || i === 11 || i === 15) && t.flags & 16384 && (i = t.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var r = 0; r < i.length; r++) {
          var u = i[r], f = u.getSnapshot;
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
  function Ua(e, t, i, r) {
    t &= ~lf, t &= ~xi, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var f = 31 - _t(u), g = 1 << f;
      r[f] = -1, u &= ~g;
    }
    i !== 0 && vs(e, i, t);
  }
  function uo() {
    return (Pe & 6) === 0 ? (Sr(0), !1) : !0;
  }
  function cf() {
    if (_e !== null) {
      if (Ye === 0)
        var e = _e.return;
      else
        e = _e, ea = di = null, Cc(e), il = null, nr = 0, e = _e;
      for (; e !== null; )
        ey(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function ml(e, t) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, hE(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), fa = 0, cf(), Ie = e, _e = i = Jn(e.current, null), Ue = t, Ye = 0, nn = null, za = !1, fl = va(e, t), af = !1, dl = an = lf = xi = Oa = ut = 0, Kt = vr = null, rf = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var u = 31 - _t(r), f = 1 << u;
        t |= e[u], r &= ~f;
      }
    return ca = t, Ds(), i;
  }
  function Ry(e, t) {
    we = null, O.H = cr, t === al || t === Bs ? (t = qm(), Ye = 3) : t === hc ? (t = qm(), Ye = 4) : Ye = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, nn = t, _e === null && (ut = 1, Js(
      e,
      cn(t, e.current)
    ));
  }
  function Cy() {
    var e = en.current;
    return e === null ? !0 : (Ue & 4194048) === Ue ? mn === null : (Ue & 62914560) === Ue || (Ue & 536870912) !== 0 ? e === mn : !1;
  }
  function My() {
    var e = O.H;
    return O.H = cr, e === null ? cr : e;
  }
  function wy() {
    var e = O.A;
    return O.A = F1, e;
  }
  function co() {
    ut = 4, za || (Ue & 4194048) !== Ue && en.current !== null || (fl = !0), (Oa & 134217727) === 0 && (xi & 134217727) === 0 || Ie === null || Ua(
      Ie,
      Ue,
      an,
      !1
    );
  }
  function ff(e, t, i) {
    var r = Pe;
    Pe |= 2;
    var u = My(), f = wy();
    (Ie !== e || Ue !== t) && (oo = null, ml(e, t)), t = !1;
    var g = ut;
    e: do
      try {
        if (Ye !== 0 && _e !== null) {
          var E = _e, w = nn;
          switch (Ye) {
            case 8:
              cf(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              en.current === null && (t = !0);
              var q = Ye;
              if (Ye = 0, nn = null, pl(e, E, w, q), i && fl) {
                g = 0;
                break e;
              }
              break;
            default:
              q = Ye, Ye = 0, nn = null, pl(e, E, w, q);
          }
        }
        K1(), g = ut;
        break;
      } catch ($) {
        Ry(e, $);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ea = di = null, Pe = r, O.H = u, O.A = f, _e === null && (Ie = null, Ue = 0, Ds()), g;
  }
  function K1() {
    for (; _e !== null; ) Ay(_e);
  }
  function Q1(e, t) {
    var i = Pe;
    Pe |= 2;
    var r = My(), u = wy();
    Ie !== e || Ue !== t ? (oo = null, so = Bt() + 500, ml(e, t)) : fl = va(
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
              if (Bm(f)) {
                Ye = 0, nn = null, jy(t);
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
              Bm(f) ? (Ye = 0, nn = null, jy(t)) : (Ye = 0, nn = null, pl(e, t, f, 7));
              break;
            case 5:
              var g = null;
              switch (_e.tag) {
                case 26:
                  g = _e.memoizedState;
                case 5:
                case 27:
                  var E = _e;
                  if (g ? mg(g) : E.stateNode.complete) {
                    Ye = 0, nn = null;
                    var w = E.sibling;
                    if (w !== null) _e = w;
                    else {
                      var q = E.return;
                      q !== null ? (_e = q, fo(q)) : _e = null;
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
              cf(), ut = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Z1();
        break;
      } catch ($) {
        Ry(e, $);
      }
    while (!0);
    return ea = di = null, O.H = r, O.A = u, Pe = i, _e !== null ? 0 : (Ie = null, Ue = 0, Ds(), ut);
  }
  function Z1() {
    for (; _e !== null && !wu(); )
      Ay(_e);
  }
  function Ay(e) {
    var t = Jp(e.alternate, e, ca);
    e.memoizedProps = e.pendingProps, t === null ? fo(e) : _e = t;
  }
  function jy(e) {
    var t = e, i = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Xp(
          i,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ue
        );
        break;
      case 11:
        t = Xp(
          i,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ue
        );
        break;
      case 5:
        Cc(t);
      default:
        ey(i, t), t = _e = wm(t, ca), t = Jp(i, t, ca);
    }
    e.memoizedProps = e.pendingProps, t === null ? fo(e) : _e = t;
  }
  function pl(e, t, i, r) {
    ea = di = null, Cc(t), il = null, nr = 0;
    var u = t.return;
    try {
      if (B1(
        e,
        u,
        t,
        i,
        Ue
      )) {
        ut = 1, Js(
          e,
          cn(i, e.current)
        ), _e = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw _e = u, f;
      ut = 1, Js(
        e,
        cn(i, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (Be || r === 1 ? e = !0 : fl || (Ue & 536870912) !== 0 ? e = !1 : (za = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = en.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Dy(t, e)) : fo(t);
  }
  function fo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Dy(
          t,
          za
        );
        return;
      }
      e = t.return;
      var i = k1(
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
  function Dy(e, t) {
    do {
      var i = P1(e.alternate, e);
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
  function Ny(e, t, i, r, u, f, g, E, w) {
    e.cancelPendingCommit = null;
    do
      ho();
    while (Tt !== 0);
    if ((Pe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (f = t.lanes | t.childLanes, f |= Ju, gs(
        e,
        i,
        f,
        g,
        E,
        w
      ), e === Ie && (_e = Ie = null, Ue = 0), hl = t, La = e, fa = i, sf = f, of = u, Sy = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, eE(ga, function() {
        return Uy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null, u = ne.p, ne.p = 2, g = Pe, Pe |= 4;
        try {
          Y1(e, t, i);
        } finally {
          Pe = g, ne.p = u, O.T = r;
        }
      }
      Tt = 1, zy(), Oy(), _y();
    }
  }
  function zy() {
    if (Tt === 1) {
      Tt = 0;
      var e = La, t = hl, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          dy(t, e);
          var f = Tf, g = vm(e.containerInfo), E = f.focusedElem, w = f.selectionRange;
          if (g !== E && E && E.ownerDocument && gm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (w !== null && $u(E)) {
              var q = w.start, $ = w.end;
              if ($ === void 0 && ($ = q), "selectionStart" in E)
                E.selectionStart = q, E.selectionEnd = Math.min(
                  $,
                  E.value.length
                );
              else {
                var W = E.ownerDocument || document, P = W && W.defaultView || window;
                if (P.getSelection) {
                  var Y = P.getSelection(), pe = E.textContent.length, Re = Math.min(w.start, pe), Ke = w.end === void 0 ? Re : Math.min(w.end, pe);
                  !Y.extend && Re > Ke && (g = Ke, Ke = Re, Re = g);
                  var U = ym(
                    E,
                    Re
                  ), N = ym(
                    E,
                    Ke
                  );
                  if (U && N && (Y.rangeCount !== 1 || Y.anchorNode !== U.node || Y.anchorOffset !== U.offset || Y.focusNode !== N.node || Y.focusOffset !== N.offset)) {
                    var H = W.createRange();
                    H.setStart(U.node, U.offset), Y.removeAllRanges(), Re > Ke ? (Y.addRange(H), Y.extend(N.node, N.offset)) : (H.setEnd(N.node, N.offset), Y.addRange(H));
                  }
                }
              }
            }
            for (W = [], Y = E; Y = Y.parentNode; )
              Y.nodeType === 1 && W.push({
                element: Y,
                left: Y.scrollLeft,
                top: Y.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < W.length; E++) {
              var Z = W[E];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          Co = !!Ef, Tf = Ef = null;
        } finally {
          Pe = u, ne.p = r, O.T = i;
        }
      }
      e.current = t, Tt = 2;
    }
  }
  function Oy() {
    if (Tt === 2) {
      Tt = 0;
      var e = La, t = hl, i = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var r = ne.p;
        ne.p = 2;
        var u = Pe;
        Pe |= 4;
        try {
          sy(e, t.alternate, t);
        } finally {
          Pe = u, ne.p = r, O.T = i;
        }
      }
      Tt = 3;
    }
  }
  function _y() {
    if (Tt === 4 || Tt === 3) {
      Tt = 0, Au();
      var e = La, t = hl, i = fa, r = Sy;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Tt = 5 : (Tt = 0, hl = La = null, Ly(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (_a = null), k(i), t = t.stateNode, Ht && typeof Ht.onCommitFiberRoot == "function")
        try {
          Ht.onCommitFiberRoot(
            Kn,
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
      (fa & 3) !== 0 && ho(), Hn(e), u = e.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? e === uf ? br++ : (br = 0, uf = e) : br = 0, Sr(0);
    }
  }
  function Ly(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, er(t)));
  }
  function ho() {
    return zy(), Oy(), _y(), Uy();
  }
  function Uy() {
    if (Tt !== 5) return !1;
    var e = La, t = sf;
    sf = 0;
    var i = k(fa), r = O.T, u = ne.p;
    try {
      ne.p = 32 > i ? 32 : i, O.T = null, i = of, of = null;
      var f = La, g = fa;
      if (Tt = 0, hl = La = null, fa = 0, (Pe & 6) !== 0) throw Error(s(331));
      var E = Pe;
      if (Pe |= 4, gy(f.current), my(
        f,
        f.current,
        g,
        i
      ), Pe = E, Sr(0, !1), Ht && typeof Ht.onPostCommitFiberRoot == "function")
        try {
          Ht.onPostCommitFiberRoot(Kn, f);
        } catch {
        }
      return !0;
    } finally {
      ne.p = u, O.T = r, Ly(e, t);
    }
  }
  function Vy(e, t, i) {
    t = cn(i, t), t = qc(e.stateNode, t, 2), e = Aa(e, t, 2), e !== null && (On(e, 2), Hn(e));
  }
  function Ge(e, t, i) {
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
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (_a === null || !_a.has(r))) {
            e = cn(i, e), i = Bp(2), r = Aa(t, i, 2), r !== null && (Hp(
              i,
              r,
              t,
              e
            ), On(r, 2), Hn(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function df(e, t, i) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new X1();
      var u = /* @__PURE__ */ new Set();
      r.set(t, u);
    } else
      u = r.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), r.set(t, u));
    u.has(i) || (af = !0, u.add(i), e = I1.bind(null, e, t, i), t.then(e, e));
  }
  function I1(e, t, i) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Ie === e && (Ue & i) === i && (ut === 4 || ut === 3 && (Ue & 62914560) === Ue && 300 > Bt() - ro ? (Pe & 2) === 0 && ml(e, 0) : lf |= i, dl === Ue && (dl = 0)), Hn(e);
  }
  function By(e, t) {
    t === 0 && (t = Pl()), e = ui(e, t), e !== null && (On(e, t), Hn(e));
  }
  function J1(e) {
    var t = e.memoizedState, i = 0;
    t !== null && (i = t.retryLane), By(e, i);
  }
  function W1(e, t) {
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
  function eE(e, t) {
    return Vi(e, t);
  }
  var mo = null, yl = null, hf = !1, po = !1, mf = !1, Va = 0;
  function Hn(e) {
    e !== yl && e.next === null && (yl === null ? mo = yl = e : yl = yl.next = e), po = !0, hf || (hf = !0, nE());
  }
  function Sr(e, t) {
    if (!mf && po) {
      mf = !0;
      do
        for (var i = !1, r = mo; r !== null; ) {
          if (e !== 0) {
            var u = r.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var g = r.suspendedLanes, E = r.pingedLanes;
              f = (1 << 31 - _t(42 | e) + 1) - 1, f &= u & ~(g & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (i = !0, Py(r, f));
          } else
            f = Ue, f = Bi(
              r,
              r === Ie ? f : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (f & 3) === 0 || va(r, f) || (i = !0, Py(r, f));
          r = r.next;
        }
      while (i);
      mf = !1;
    }
  }
  function tE() {
    Hy();
  }
  function Hy() {
    po = hf = !1;
    var e = 0;
    Va !== 0 && dE() && (e = Va);
    for (var t = Bt(), i = null, r = mo; r !== null; ) {
      var u = r.next, f = qy(r, t);
      f === 0 ? (r.next = null, i === null ? mo = u : i.next = u, u === null && (yl = i)) : (i = r, (e !== 0 || (f & 3) !== 0) && (po = !0)), r = u;
    }
    Tt !== 0 && Tt !== 5 || Sr(e), Va !== 0 && (Va = 0);
  }
  function qy(e, t) {
    for (var i = e.suspendedLanes, r = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var g = 31 - _t(f), E = 1 << g, w = u[g];
      w === -1 ? ((E & i) === 0 || (E & r) !== 0) && (u[g] = Nu(E, t)) : w <= t && (e.expiredLanes |= E), f &= ~E;
    }
    if (t = Ie, i = Ue, i = Bi(
      e,
      e === t ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, i === 0 || e === t && (Ye === 2 || Ye === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && ql(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || va(e, i)) {
      if (t = i & -i, t === e.callbackPriority) return t;
      switch (r !== null && ql(r), k(i)) {
        case 2:
        case 8:
          i = kl;
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
      return r = ky.bind(null, e), i = Vi(i, r), e.callbackPriority = t, e.callbackNode = i, t;
    }
    return r !== null && r !== null && ql(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function ky(e, t) {
    if (Tt !== 0 && Tt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (ho() && e.callbackNode !== i)
      return null;
    var r = Ue;
    return r = Bi(
      e,
      e === Ie ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (Ey(e, r, t), qy(e, Bt()), e.callbackNode != null && e.callbackNode === i ? ky.bind(null, e) : null);
  }
  function Py(e, t) {
    if (ho()) return null;
    Ey(e, t, !0);
  }
  function nE() {
    mE(function() {
      (Pe & 6) !== 0 ? Vi(
        ya,
        tE
      ) : Hy();
    });
  }
  function pf() {
    if (Va === 0) {
      var e = tl;
      e === 0 && (e = ni, ni <<= 1, (ni & 261888) === 0 && (ni = 256)), Va = e;
    }
    return Va;
  }
  function Yy(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Es("" + e);
  }
  function Gy(e, t) {
    var i = t.ownerDocument.createElement("input");
    return i.name = t.name, i.value = t.value, e.id && i.setAttribute("form", e.id), t.parentNode.insertBefore(i, t), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function aE(e, t, i, r, u) {
    if (t === "submit" && i && i.stateNode === u) {
      var f = Yy(
        (u[he] || null).action
      ), g = r.submitter;
      g && (t = (t = g[he] || null) ? Yy(t.formAction) : g.getAttribute("formAction"), t !== null && (f = t, g = null));
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
                if (Va !== 0) {
                  var w = g ? Gy(u, g) : new FormData(u);
                  _c(
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
                typeof f == "function" && (E.preventDefault(), w = g ? Gy(u, g) : new FormData(u), _c(
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
  for (var yf = 0; yf < Iu.length; yf++) {
    var gf = Iu[yf], iE = gf.toLowerCase(), lE = gf[0].toUpperCase() + gf.slice(1);
    Mn(
      iE,
      "on" + lE
    );
  }
  Mn(xm, "onAnimationEnd"), Mn(Em, "onAnimationIteration"), Mn(Tm, "onAnimationStart"), Mn("dblclick", "onDoubleClick"), Mn("focusin", "onFocus"), Mn("focusout", "onBlur"), Mn(x1, "onTransitionRun"), Mn(E1, "onTransitionStart"), Mn(T1, "onTransitionCancel"), Mn(Rm, "onTransitionEnd"), _n("onMouseEnter", ["mouseout", "mouseover"]), _n("onMouseLeave", ["mouseout", "mouseover"]), _n("onPointerEnter", ["pointerout", "pointerover"]), _n("onPointerLeave", ["pointerout", "pointerover"]), Mt(
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
  var xr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), rE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xr)
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
            var E = r[g], w = E.instance, q = E.currentTarget;
            if (E = E.listener, w !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = q;
            try {
              f(u);
            } catch ($) {
              js($);
            }
            u.currentTarget = null, f = w;
          }
        else
          for (g = 0; g < r.length; g++) {
            if (E = r[g], w = E.instance, q = E.currentTarget, E = E.listener, w !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = q;
            try {
              f(u);
            } catch ($) {
              js($);
            }
            u.currentTarget = null, f = w;
          }
      }
    }
  }
  function Le(e, t) {
    var i = t[me];
    i === void 0 && (i = t[me] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    i.has(r) || (Xy(t, e, 2, !1), i.add(r));
  }
  function vf(e, t, i) {
    var r = 0;
    t && (r |= 4), Xy(
      i,
      e,
      r,
      t
    );
  }
  var yo = "_reactListening" + Math.random().toString(36).slice(2);
  function bf(e) {
    if (!e[yo]) {
      e[yo] = !0, Sa.forEach(function(i) {
        i !== "selectionchange" && (rE.has(i) || vf(i, !1, e), vf(i, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yo] || (t[yo] = !0, vf("selectionchange", !1, t));
    }
  }
  function Xy(e, t, i, r) {
    switch (xg(t)) {
      case 2:
        var u = _E;
        break;
      case 8:
        u = LE;
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
              var w = g.tag;
              if ((w === 3 || w === 4) && g.stateNode.containerInfo === u)
                return;
              g = g.return;
            }
          for (; E !== null; ) {
            if (g = Fe(E), g === null) return;
            if (w = g.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              r = f = g;
              continue e;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    Ih(function() {
      var q = f, $ = Uu(i), W = [];
      e: {
        var P = Cm.get(e);
        if (P !== void 0) {
          var Y = Ms, pe = e;
          switch (e) {
            case "keypress":
              if (Rs(i) === 0) break e;
            case "keydown":
            case "keyup":
              Y = Wx;
              break;
            case "focusin":
              pe = "focus", Y = Pu;
              break;
            case "focusout":
              pe = "blur", Y = Pu;
              break;
            case "beforeblur":
            case "afterblur":
              Y = Pu;
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
              Y = em;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = kx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = n1;
              break;
            case xm:
            case Em:
            case Tm:
              Y = Gx;
              break;
            case Rm:
              Y = i1;
              break;
            case "scroll":
            case "scrollend":
              Y = Hx;
              break;
            case "wheel":
              Y = r1;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = Xx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = nm;
              break;
            case "toggle":
            case "beforetoggle":
              Y = o1;
          }
          var Re = (t & 4) !== 0, Ke = !Re && (e === "scroll" || e === "scrollend"), U = Re ? P !== null ? P + "Capture" : null : P;
          Re = [];
          for (var N = q, H; N !== null; ) {
            var Z = N;
            if (H = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || H === null || U === null || (Z = Yl(N, U), Z != null && Re.push(
              Er(N, Z, H)
            )), Ke) break;
            N = N.return;
          }
          0 < Re.length && (P = new Y(
            P,
            pe,
            null,
            i,
            $
          ), W.push({ event: P, listeners: Re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (P = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", P && i !== Lu && (pe = i.relatedTarget || i.fromElement) && (Fe(pe) || pe[ve]))
            break e;
          if ((Y || P) && (P = $.window === $ ? $ : (P = $.ownerDocument) ? P.defaultView || P.parentWindow : window, Y ? (pe = i.relatedTarget || i.toElement, Y = q, pe = pe ? Fe(pe) : null, pe !== null && (Ke = c(pe), Re = pe.tag, pe !== Ke || Re !== 5 && Re !== 27 && Re !== 6) && (pe = null)) : (Y = null, pe = q), Y !== pe)) {
            if (Re = em, Z = "onMouseLeave", U = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (Re = nm, Z = "onPointerLeave", U = "onPointerEnter", N = "pointer"), Ke = Y == null ? P : Oe(Y), H = pe == null ? P : Oe(pe), P = new Re(
              Z,
              N + "leave",
              Y,
              i,
              $
            ), P.target = Ke, P.relatedTarget = H, Z = null, Fe($) === q && (Re = new Re(
              U,
              N + "enter",
              pe,
              i,
              $
            ), Re.target = H, Re.relatedTarget = Ke, Z = Re), Ke = Z, Y && pe)
              t: {
                for (Re = sE, U = Y, N = pe, H = 0, Z = U; Z; Z = Re(Z))
                  H++;
                Z = 0;
                for (var xe = N; xe; xe = Re(xe))
                  Z++;
                for (; 0 < H - Z; )
                  U = Re(U), H--;
                for (; 0 < Z - H; )
                  N = Re(N), Z--;
                for (; H--; ) {
                  if (U === N || N !== null && U === N.alternate) {
                    Re = U;
                    break t;
                  }
                  U = Re(U), N = Re(N);
                }
                Re = null;
              }
            else Re = null;
            Y !== null && $y(
              W,
              P,
              Y,
              Re,
              !1
            ), pe !== null && Ke !== null && $y(
              W,
              Ke,
              pe,
              Re,
              !0
            );
          }
        }
        e: {
          if (P = q ? Oe(q) : window, Y = P.nodeName && P.nodeName.toLowerCase(), Y === "select" || Y === "input" && P.type === "file")
            var qe = cm;
          else if (om(P))
            if (fm)
              qe = v1;
            else {
              qe = y1;
              var be = p1;
            }
          else
            Y = P.nodeName, !Y || Y.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? q && _u(q.elementType) && (qe = cm) : qe = g1;
          if (qe && (qe = qe(e, q))) {
            um(
              W,
              qe,
              i,
              $
            );
            break e;
          }
          be && be(e, P, q), e === "focusout" && q && P.type === "number" && q.memoizedProps.value != null && Ou(P, "number", P.value);
        }
        switch (be = q ? Oe(q) : window, e) {
          case "focusin":
            (om(be) || be.contentEditable === "true") && ($i = be, Ku = q, Il = null);
            break;
          case "focusout":
            Il = Ku = $i = null;
            break;
          case "mousedown":
            Qu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Qu = !1, bm(W, i, $);
            break;
          case "selectionchange":
            if (S1) break;
          case "keydown":
          case "keyup":
            bm(W, i, $);
        }
        var Ae;
        if (Gu)
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
          Xi ? rm(e, i) && (Ve = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (Ve = "onCompositionStart");
        Ve && (am && i.locale !== "ko" && (Xi || Ve !== "onCompositionStart" ? Ve === "onCompositionEnd" && Xi && (Ae = Jh()) : (xa = $, Hu = "value" in xa ? xa.value : xa.textContent, Xi = !0)), be = go(q, Ve), 0 < be.length && (Ve = new tm(
          Ve,
          e,
          null,
          i,
          $
        ), W.push({ event: Ve, listeners: be }), Ae ? Ve.data = Ae : (Ae = sm(i), Ae !== null && (Ve.data = Ae)))), (Ae = c1 ? f1(e, i) : d1(e, i)) && (Ve = go(q, "onBeforeInput"), 0 < Ve.length && (be = new tm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          $
        ), W.push({
          event: be,
          listeners: Ve
        }), be.data = Ae)), aE(
          W,
          e,
          q,
          i,
          $
        );
      }
      Fy(W, t);
    });
  }
  function Er(e, t, i) {
    return {
      instance: e,
      listener: t,
      currentTarget: i
    };
  }
  function go(e, t) {
    for (var i = t + "Capture", r = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = Yl(e, i), u != null && r.unshift(
        Er(e, u, f)
      ), u = Yl(e, t), u != null && r.push(
        Er(e, u, f)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function sE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $y(e, t, i, r, u) {
    for (var f = t._reactName, g = []; i !== null && i !== r; ) {
      var E = i, w = E.alternate, q = E.stateNode;
      if (E = E.tag, w !== null && w === r) break;
      E !== 5 && E !== 26 && E !== 27 || q === null || (w = q, u ? (q = Yl(i, f), q != null && g.unshift(
        Er(i, q, w)
      )) : u || (q = Yl(i, f), q != null && g.push(
        Er(i, q, w)
      ))), i = i.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var oE = /\r\n?/g, uE = /\u0000|\uFFFD/g;
  function Ky(e) {
    return (typeof e == "string" ? e : "" + e).replace(oE, `
`).replace(uE, "");
  }
  function Qy(e, t) {
    return t = Ky(t), Ky(e) === t;
  }
  function $e(e, t, i, r, u, f) {
    switch (i) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Yi(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Yi(e, "" + r);
        break;
      case "className":
        ct(e, "class", r);
        break;
      case "tabIndex":
        ct(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ct(e, i, r);
        break;
      case "style":
        Qh(e, r, f);
        break;
      case "data":
        if (t !== "object") {
          ct(e, "data", r);
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
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(i);
          break;
        }
        r = Es("" + r), e.setAttribute(i, r);
        break;
      case "onClick":
        r != null && (e.onclick = Zn);
        break;
      case "onScroll":
        r != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Le("scrollend", e);
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
        Le("beforetoggle", e), Le("toggle", e), Ne(e, "popover", r);
        break;
      case "xlinkActuate":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        Lt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        Lt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Ne(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Vx.get(i) || i, Ne(e, i, r));
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
        typeof r == "string" ? Yi(e, r) : (typeof r == "number" || typeof r == "bigint") && Yi(e, "" + r);
        break;
      case "onScroll":
        r != null && Le("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Le("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Zn);
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
        if (!Cn.hasOwnProperty(i))
          e: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), t = i.slice(2, u ? i.length - 7 : void 0), f = e[he] || null, f = f != null ? f[i] : null, typeof f == "function" && e.removeEventListener(t, f, u), typeof r == "function")) {
              typeof f != "function" && f !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(t, r, u);
              break e;
            }
            i in e ? e[i] = r : r === !0 ? e.setAttribute(i, "") : Ne(e, i, r);
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
                  $e(e, t, f, g, i, null);
              }
          }
        u && $e(e, t, "srcSet", i.srcSet, i, null), r && $e(e, t, "src", i.src, i, null);
        return;
      case "input":
        Le("invalid", e);
        var E = f = g = u = null, w = null, q = null;
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
                  w = $;
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
                  $e(e, t, r, $, i, null);
              }
          }
        Fh(
          e,
          f,
          E,
          w,
          q,
          g,
          u,
          !1
        );
        return;
      case "select":
        Le("invalid", e), r = g = f = null;
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
                $e(e, t, u, E, i, null);
            }
        t = f, i = g, e.multiple = !!r, t != null ? Pi(e, !!r, t, !1) : i != null && Pi(e, !!r, i, !0);
        return;
      case "textarea":
        Le("invalid", e), f = u = r = null;
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
                $e(e, t, g, E, i, null);
            }
        $h(e, r, u, f);
        return;
      case "option":
        for (w in i)
          if (i.hasOwnProperty(w) && (r = i[w], r != null))
            switch (w) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                $e(e, t, w, r, i, null);
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
        for (r = 0; r < xr.length; r++)
          Le(xr[r], e);
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
        for (q in i)
          if (i.hasOwnProperty(q) && (r = i[q], r != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                $e(e, t, q, r, i, null);
            }
        return;
      default:
        if (_u(t)) {
          for ($ in i)
            i.hasOwnProperty($) && (r = i[$], r !== void 0 && xf(
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
      i.hasOwnProperty(E) && (r = i[E], r != null && $e(e, t, E, r, i, null));
  }
  function cE(e, t, i, r) {
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
        var u = null, f = null, g = null, E = null, w = null, q = null, $ = null;
        for (Y in i) {
          var W = i[Y];
          if (i.hasOwnProperty(Y) && W != null)
            switch (Y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = W;
              default:
                r.hasOwnProperty(Y) || $e(e, t, Y, null, r, W);
            }
        }
        for (var P in r) {
          var Y = r[P];
          if (W = i[P], r.hasOwnProperty(P) && (Y != null || W != null))
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
                $ = Y;
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
                  throw Error(s(137, t));
                break;
              default:
                Y !== W && $e(
                  e,
                  t,
                  P,
                  Y,
                  r,
                  W
                );
            }
        }
        zu(
          e,
          g,
          E,
          w,
          q,
          $,
          f,
          u
        );
        return;
      case "select":
        Y = g = E = P = null;
        for (f in i)
          if (w = i[f], i.hasOwnProperty(f) && w != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                Y = w;
              default:
                r.hasOwnProperty(f) || $e(
                  e,
                  t,
                  f,
                  null,
                  r,
                  w
                );
            }
        for (u in r)
          if (f = r[u], w = i[u], r.hasOwnProperty(u) && (f != null || w != null))
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
                f !== w && $e(
                  e,
                  t,
                  u,
                  f,
                  r,
                  w
                );
            }
        t = E, i = g, r = Y, P != null ? Pi(e, !!i, P, !1) : !!r != !!i && (t != null ? Pi(e, !!i, t, !0) : Pi(e, !!i, i ? [] : "", !1));
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
                $e(e, t, E, null, r, u);
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
                u !== f && $e(e, t, g, u, r, f);
            }
        Xh(e, P, Y);
        return;
      case "option":
        for (var pe in i)
          if (P = i[pe], i.hasOwnProperty(pe) && P != null && !r.hasOwnProperty(pe))
            switch (pe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                $e(
                  e,
                  t,
                  pe,
                  null,
                  r,
                  P
                );
            }
        for (w in r)
          if (P = r[w], Y = i[w], r.hasOwnProperty(w) && P !== Y && (P != null || Y != null))
            switch (w) {
              case "selected":
                e.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                $e(
                  e,
                  t,
                  w,
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
        for (var Re in i)
          P = i[Re], i.hasOwnProperty(Re) && P != null && !r.hasOwnProperty(Re) && $e(e, t, Re, null, r, P);
        for (q in r)
          if (P = r[q], Y = i[q], r.hasOwnProperty(q) && P !== Y && (P != null || Y != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, t));
                break;
              default:
                $e(
                  e,
                  t,
                  q,
                  P,
                  r,
                  Y
                );
            }
        return;
      default:
        if (_u(t)) {
          for (var Ke in i)
            P = i[Ke], i.hasOwnProperty(Ke) && P !== void 0 && !r.hasOwnProperty(Ke) && xf(
              e,
              t,
              Ke,
              void 0,
              r,
              P
            );
          for ($ in r)
            P = r[$], Y = i[$], !r.hasOwnProperty($) || P === Y || P === void 0 && Y === void 0 || xf(
              e,
              t,
              $,
              P,
              r,
              Y
            );
          return;
        }
    }
    for (var U in i)
      P = i[U], i.hasOwnProperty(U) && P != null && !r.hasOwnProperty(U) && $e(e, t, U, null, r, P);
    for (W in r)
      P = r[W], Y = i[W], !r.hasOwnProperty(W) || P === Y || P == null && Y == null || $e(e, t, W, P, r, Y);
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
  function fE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, i = performance.getEntriesByType("resource"), r = 0; r < i.length; r++) {
        var u = i[r], f = u.transferSize, g = u.initiatorType, E = u.duration;
        if (f && E && Zy(g)) {
          for (g = 0, E = u.responseEnd, r += 1; r < i.length; r++) {
            var w = i[r], q = w.startTime;
            if (q > E) break;
            var $ = w.transferSize, W = w.initiatorType;
            $ && Zy(W) && (w = w.responseEnd, g += $ * (w < E ? 1 : (E - q) / (w - q)));
          }
          if (--r, t += 8 * (f + g) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ef = null, Tf = null;
  function vo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Iy(e) {
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
  var Cf = null;
  function dE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Cf ? !1 : (Cf = e, !0) : (Cf = null, !1);
  }
  var Wy = typeof setTimeout == "function" ? setTimeout : void 0, hE = typeof clearTimeout == "function" ? clearTimeout : void 0, eg = typeof Promise == "function" ? Promise : void 0, mE = typeof queueMicrotask == "function" ? queueMicrotask : typeof eg < "u" ? function(e) {
    return eg.resolve(null).then(e).catch(pE);
  } : Wy;
  function pE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ba(e) {
    return e === "head";
  }
  function tg(e, t) {
    var i = t, r = 0;
    do {
      var u = i.nextSibling;
      if (e.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (r === 0) {
            e.removeChild(u), Sl(t);
            return;
          }
          r--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          r++;
        else if (i === "html")
          Tr(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, Tr(i);
          for (var f = i.firstChild; f; ) {
            var g = f.nextSibling, E = f.nodeName;
            f[De] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || i.removeChild(f), f = g;
          }
        } else
          i === "body" && Tr(e.ownerDocument.body);
      i = u;
    } while (i);
    Sl(t);
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
  function Mf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var i = t;
      switch (t = t.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Mf(i), Ze(i);
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
  function yE(e, t, i, r) {
    for (; e.nodeType === 1; ) {
      var u = i;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
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
  function gE(e, t, i) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function ag(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = pn(e.nextSibling), e === null)) return null;
    return e;
  }
  function wf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Af(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function vE(e, t) {
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
  var jf = null;
  function ig(e) {
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
  function Tr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ze(e);
  }
  var yn = /* @__PURE__ */ new Map(), sg = /* @__PURE__ */ new Set();
  function bo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var da = ne.d;
  ne.d = {
    f: bE,
    r: SE,
    D: xE,
    C: EE,
    L: TE,
    m: RE,
    X: ME,
    S: CE,
    M: wE
  };
  function bE() {
    var e = da.f(), t = uo();
    return e || t;
  }
  function SE(e) {
    var t = lt(e);
    t !== null && t.tag === 5 && t.type === "form" ? Rp(t) : da.r(e);
  }
  var gl = typeof document > "u" ? null : document;
  function og(e, t, i) {
    var r = gl;
    if (r && typeof t == "string" && t) {
      var u = on(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), sg.has(u) || (sg.add(u), e = { rel: e, crossOrigin: i, href: t }, r.querySelector(u) === null && (t = r.createElement("link"), Nt(t, "link", e), We(t), r.head.appendChild(t)));
    }
  }
  function xE(e) {
    da.D(e), og("dns-prefetch", e, null);
  }
  function EE(e, t) {
    da.C(e, t), og("preconnect", e, t);
  }
  function TE(e, t, i) {
    da.L(e, t, i);
    var r = gl;
    if (r && e && t) {
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
      ), yn.set(f, e), r.querySelector(u) !== null || t === "style" && r.querySelector(Rr(f)) || t === "script" && r.querySelector(Cr(f)) || (t = r.createElement("link"), Nt(t, "link", e), We(t), r.head.appendChild(t)));
    }
  }
  function RE(e, t) {
    da.m(e, t);
    var i = gl;
    if (i && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + on(r) + '"][href="' + on(e) + '"]', f = u;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = bl(e);
      }
      if (!yn.has(f) && (e = v({ rel: "modulepreload", href: e }, t), yn.set(f, e), i.querySelector(u) === null)) {
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
        r = i.createElement("link"), Nt(r, "link", e), We(r), i.head.appendChild(r);
      }
    }
  }
  function CE(e, t, i) {
    da.S(e, t, i);
    var r = gl;
    if (r && e) {
      var u = pt(r).hoistableStyles, f = vl(e);
      t = t || "default";
      var g = u.get(f);
      if (!g) {
        var E = { loading: 0, preload: null };
        if (g = r.querySelector(
          Rr(f)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            i
          ), (i = yn.get(f)) && Df(e, i);
          var w = g = r.createElement("link");
          We(w), Nt(w, "link", e), w._p = new Promise(function(q, $) {
            w.onload = q, w.onerror = $;
          }), w.addEventListener("load", function() {
            E.loading |= 1;
          }), w.addEventListener("error", function() {
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
  function ME(e, t) {
    da.X(e, t);
    var i = gl;
    if (i && e) {
      var r = pt(i).hoistableScripts, u = bl(e), f = r.get(u);
      f || (f = i.querySelector(Cr(u)), f || (e = v({ src: e, async: !0 }, t), (t = yn.get(u)) && Nf(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function wE(e, t) {
    da.M(e, t);
    var i = gl;
    if (i && e) {
      var r = pt(i).hoistableScripts, u = bl(e), f = r.get(u);
      f || (f = i.querySelector(Cr(u)), f || (e = v({ src: e, async: !0, type: "module" }, t), (t = yn.get(u)) && Nf(e, t), f = i.createElement("script"), We(f), Nt(f, "link", e), i.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, r.set(u, f));
    }
  }
  function ug(e, t, i, r) {
    var u = (u = Ce.current) ? bo(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (t = vl(i.href), i = pt(
          u
        ).hoistableStyles, r = i.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
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
            Rr(e)
          )) && !f._p && (g.instance = f, g.state.loading = 5), yn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, yn.set(e, i), f || AE(
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
        return t = i.async, i = i.src, typeof i == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = bl(i), i = pt(
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
  function vl(e) {
    return 'href="' + on(e) + '"';
  }
  function Rr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function cg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function AE(e, t, i, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), Nt(t, "link", i), We(t), e.head.appendChild(t));
  }
  function bl(e) {
    return '[src="' + on(e) + '"]';
  }
  function Cr(e) {
    return "script[async]" + e;
  }
  function fg(e, t, i) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + on(i.href) + '"]'
          );
          if (r)
            return t.instance = r, We(r), r;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), We(r), Nt(r, "style", u), So(r, i.precedence, e), t.instance = r;
        case "stylesheet":
          u = vl(i.href);
          var f = e.querySelector(
            Rr(u)
          );
          if (f)
            return t.state.loading |= 4, t.instance = f, We(f), f;
          r = cg(i), (u = yn.get(u)) && Df(r, u), f = (e.ownerDocument || e).createElement("link"), We(f);
          var g = f;
          return g._p = new Promise(function(E, w) {
            g.onload = E, g.onerror = w;
          }), Nt(f, "link", r), t.state.loading |= 4, So(f, i.precedence, e), t.instance = f;
        case "script":
          return f = bl(i.src), (u = e.querySelector(
            Cr(f)
          )) ? (t.instance = u, We(u), u) : (r = i, (u = yn.get(f)) && (r = v({}, i), Nf(r, u)), e = e.ownerDocument || e, u = e.createElement("script"), We(u), Nt(u, "link", r), e.head.appendChild(u), t.instance = u);
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
  function Df(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Nf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var xo = null;
  function dg(e, t, i) {
    if (xo === null) {
      var r = /* @__PURE__ */ new Map(), u = xo = /* @__PURE__ */ new Map();
      u.set(i, r);
    } else
      u = xo, r = u.get(i), r || (r = /* @__PURE__ */ new Map(), u.set(i, r));
    if (r.has(e)) return r;
    for (r.set(e, null), i = i.getElementsByTagName(e), u = 0; u < i.length; u++) {
      var f = i[u];
      if (!(f[De] || f[de] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
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
  function jE(e, t, i) {
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
  function DE(e, t, i, r) {
    if (i.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = vl(r.href), f = t.querySelector(
          Rr(u)
        );
        if (f) {
          t = f._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Eo.bind(e), t.then(e, e)), i.state.loading |= 4, i.instance = f, We(f);
          return;
        }
        f = t.ownerDocument || t, r = cg(r), (u = yn.get(u)) && Df(r, u), f = f.createElement("link"), We(f);
        var g = f;
        g._p = new Promise(function(E, w) {
          g.onload = E, g.onerror = w;
        }), Nt(f, "link", r), i.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, t), (t = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = Eo.bind(e), t.addEventListener("load", i), t.addEventListener("error", i));
    }
  }
  var zf = 0;
  function NE(e, t) {
    return e.stylesheets && e.count === 0 && Ro(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var r = setTimeout(function() {
        if (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + t);
      0 < e.imgBytes && zf === 0 && (zf = 62500 * fE());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ro(e, e.stylesheets), e.unsuspend)) {
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, To = /* @__PURE__ */ new Map(), t.forEach(zE, e), To = null, Eo.call(e));
  }
  function zE(e, t) {
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
  function OE(e, t, i, r, u, f, g, E, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ba(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ba(0), this.hiddenUpdates = ba(null), this.identifierPrefix = r, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function pg(e, t, i, r, u, f, g, E, w, q, $, W) {
    return e = new OE(
      e,
      t,
      i,
      g,
      w,
      q,
      $,
      W,
      E
    ), t = 1, f === !0 && (t |= 24), f = Wt(3, null, null, t), e.current = f, f.stateNode = e, t = cc(), t.refCount++, e.pooledCache = t, t.refCount++, f.memoizedState = {
      element: r,
      isDehydrated: i,
      cache: t
    }, mc(f), e;
  }
  function yg(e) {
    return e ? (e = Zi, e) : Zi;
  }
  function gg(e, t, i, r, u, f) {
    u = yg(u), r.context === null ? r.context = u : r.pendingContext = u, r = wa(t), r.payload = { element: i }, f = f === void 0 ? null : f, f !== null && (r.callback = f), i = Aa(e, r, t), i !== null && (Qt(i, e, t), ir(i, e, t));
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
      var t = ui(e, 67108864);
      t !== null && Qt(t, e, 67108864), Of(e, 67108864);
    }
  }
  function Sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ln();
      t = _(t);
      var i = ui(e, t);
      i !== null && Qt(i, e, t), Of(e, t);
    }
  }
  var Co = !0;
  function _E(e, t, i, r) {
    var u = O.T;
    O.T = null;
    var f = ne.p;
    try {
      ne.p = 2, _f(e, t, i, r);
    } finally {
      ne.p = f, O.T = u;
    }
  }
  function LE(e, t, i, r) {
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
    if (Co) {
      var u = Lf(r);
      if (u === null)
        Sf(
          e,
          t,
          r,
          Mo,
          i
        ), Eg(e, r);
      else if (VE(
        u,
        e,
        t,
        i,
        r
      ))
        r.stopPropagation();
      else if (Eg(e, r), t & 4 && -1 < UE.indexOf(e)) {
        for (; u !== null; ) {
          var f = lt(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var g = Rn(f.pendingLanes);
                  if (g !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; g; ) {
                      var w = 1 << 31 - _t(g);
                      E.entanglements[1] |= w, g &= ~w;
                    }
                    Hn(f), (Pe & 6) === 0 && (so = Bt() + 500, Sr(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = ui(f, 2), E !== null && Qt(E, f, 2), uo(), Of(f, 2);
            }
          if (f = Lf(r), f === null && Sf(
            e,
            t,
            r,
            Mo,
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
  var Mo = null;
  function Uf(e) {
    if (Mo = null, e = Fe(e), e !== null) {
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
    return Mo = e, null;
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
        switch ($n()) {
          case ya:
            return 2;
          case kl:
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
  var Vf = !1, Ha = null, qa = null, ka = null, wr = /* @__PURE__ */ new Map(), Ar = /* @__PURE__ */ new Map(), Pa = [], UE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Eg(e, t) {
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
        Ar.delete(t.pointerId);
    }
  }
  function jr(e, t, i, r, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: t,
      domEventName: i,
      eventSystemFlags: r,
      nativeEvent: f,
      targetContainers: [u]
    }, t !== null && (t = lt(t), t !== null && bg(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function VE(e, t, i, r, u) {
    switch (t) {
      case "focusin":
        return Ha = jr(
          Ha,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "dragenter":
        return qa = jr(
          qa,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "mouseover":
        return ka = jr(
          ka,
          e,
          t,
          i,
          r,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return wr.set(
          f,
          jr(
            wr.get(f) || null,
            e,
            t,
            i,
            r,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Ar.set(
          f,
          jr(
            Ar.get(f) || null,
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
    var t = Fe(e.target);
    if (t !== null) {
      var i = c(t);
      if (i !== null) {
        if (t = i.tag, t === 13) {
          if (t = d(i), t !== null) {
            e.blockedOn = t, re(e.priority, function() {
              Sg(i);
            });
            return;
          }
        } else if (t === 31) {
          if (t = h(i), t !== null) {
            e.blockedOn = t, re(e.priority, function() {
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
  function wo(e) {
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
        return t = lt(i), t !== null && bg(t), e.blockedOn = i, !1;
      t.shift();
    }
    return !0;
  }
  function Rg(e, t, i) {
    wo(e) && i.delete(t);
  }
  function BE() {
    Vf = !1, Ha !== null && wo(Ha) && (Ha = null), qa !== null && wo(qa) && (qa = null), ka !== null && wo(ka) && (ka = null), wr.forEach(Rg), Ar.forEach(Rg);
  }
  function Ao(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Vf || (Vf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      BE
    )));
  }
  var jo = null;
  function Cg(e) {
    jo !== e && (jo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        jo === e && (jo = null);
        for (var t = 0; t < e.length; t += 3) {
          var i = e[t], r = e[t + 1], u = e[t + 2];
          if (typeof r != "function") {
            if (Uf(r || i) === null)
              continue;
            break;
          }
          var f = lt(i);
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
  function Sl(e) {
    function t(w) {
      return Ao(w, e);
    }
    Ha !== null && Ao(Ha, e), qa !== null && Ao(qa, e), ka !== null && Ao(ka, e), wr.forEach(t), Ar.forEach(t);
    for (var i = 0; i < Pa.length; i++) {
      var r = Pa[i];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Pa.length && (i = Pa[0], i.blockedOn === null); )
      Tg(i), i.blockedOn === null && Pa.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (r = 0; r < i.length; r += 3) {
        var u = i[r], f = i[r + 1], g = u[he] || null;
        if (typeof f == "function")
          g || Cg(i);
        else if (g) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, g = f[he] || null)
              E = g.formAction;
            else if (Uf(u) !== null) continue;
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
  Do.prototype.render = Bf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var i = t.current, r = ln();
    gg(i, r, e, t, null, null);
  }, Do.prototype.unmount = Bf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      gg(e.current, 2, null, e, null, null), uo(), t[ve] = null;
    }
  };
  function Do(e) {
    this._internalRoot = e;
  }
  Do.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ae();
      e = { blockedOn: null, target: e, priority: t };
      for (var i = 0; i < Pa.length && t !== 0 && t < Pa[i].priority; i++) ;
      Pa.splice(i, 0, e), i === 0 && Tg(e);
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
  ne.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var HE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var No = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!No.isDisabled && No.supportsFiber)
      try {
        Kn = No.inject(
          HE
        ), Ht = No;
      } catch {
      }
  }
  return Nr.createRoot = function(e, t) {
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
      Mg
    ), e[ve] = t.current, bf(e), new Bf(t);
  }, Nr.hydrateRoot = function(e, t, i) {
    if (!o(e)) throw Error(s(299));
    var r = !1, u = "", f = _p, g = Lp, E = Up, w = null;
    return i != null && (i.unstable_strictMode === !0 && (r = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (f = i.onUncaughtError), i.onCaughtError !== void 0 && (g = i.onCaughtError), i.onRecoverableError !== void 0 && (E = i.onRecoverableError), i.formState !== void 0 && (w = i.formState)), t = pg(
      e,
      1,
      !0,
      t,
      i ?? null,
      r,
      u,
      w,
      f,
      g,
      E,
      Mg
    ), t.context = yg(null), i = t.current, r = ln(), r = _(r), u = wa(r), u.callback = null, Aa(i, u, r), i = r, t.current.lanes = i, On(t, i), Hn(t), e[ve] = t.current, bf(e), new Do(t);
  }, Nr.version = "19.2.5", Nr;
}
var Vg;
function WE() {
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
  return n(), kf.exports = JE(), kf.exports;
}
var eT = WE();
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
var ab = (n) => {
  throw TypeError(n);
}, tT = (n, a, l) => a.has(n) || ab("Cannot " + l), Ff = (n, a, l) => (tT(n, a, "read from private field"), l ? l.call(n) : a.get(n)), nT = (n, a, l) => a.has(n) ? ab("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, l);
function Bg(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function aT(n = {}) {
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
  function y(T, R = null, C, D) {
    let z = Ed(
      o ? m().pathname : "/",
      T,
      R,
      C,
      D
    );
    return ht(
      z.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        T
      )}`
    ), z;
  }
  function v(T) {
    return typeof T == "string" ? T : Gn(T);
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
    createURL(T) {
      return new URL(v(T), "http://localhost");
    },
    encodeLocation(T) {
      let R = typeof T == "string" ? zn(T) : T;
      return {
        pathname: R.pathname || "",
        search: R.search || "",
        hash: R.hash || ""
      };
    },
    push(T, R) {
      d = "PUSH";
      let C = Bg(T) ? T : y(T, R);
      c += 1, o.splice(c, o.length, C), s && h && h({ action: d, location: C, delta: 1 });
    },
    replace(T, R) {
      d = "REPLACE";
      let C = Bg(T) ? T : y(T, R);
      o[c] = C, s && h && h({ action: d, location: C, delta: 0 });
    },
    go(T) {
      d = "POP";
      let R = p(c + T), C = o[R];
      c = R, h && h({ action: d, location: C, delta: T });
    },
    listen(T) {
      return h = T, () => {
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
function iT() {
  return Math.random().toString(36).substring(2, 10);
}
function Ed(n, a, l = null, s, o) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? zn(a) : a,
    state: l,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || iT(),
    unstable_mask: o
  };
}
function Gn({
  pathname: n = "/",
  search: a = "",
  hash: l = ""
}) {
  return a && a !== "?" && (n += a.charAt(0) === "?" ? a : "?" + a), l && l !== "#" && (n += l.charAt(0) === "#" ? l : "#" + l), n;
}
function zn(n) {
  let a = {};
  if (n) {
    let l = n.indexOf("#");
    l >= 0 && (a.hash = n.substring(l), n = n.substring(0, l));
    let s = n.indexOf("?");
    s >= 0 && (a.search = n.substring(s), n = n.substring(0, s)), n && (a.pathname = n);
  }
  return a;
}
function lT(n, a = !1) {
  let l = "http://localhost";
  typeof window < "u" && (l = window.location.origin !== "null" ? window.location.origin : window.location.href), ze(l, "No window.location.(origin|href) available to create URL");
  let s = typeof n == "string" ? n : Gn(n);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = l + s), new URL(s, l);
}
var kr, Hg = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (nT(this, kr, /* @__PURE__ */ new Map()), n)
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
    if (Ff(this, kr).has(n))
      return Ff(this, kr).get(n);
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
    Ff(this, kr).set(n, a);
  }
};
kr = /* @__PURE__ */ new WeakMap();
var rT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function sT(n) {
  return rT.has(
    n
  );
}
var oT = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function uT(n) {
  return oT.has(
    n
  );
}
function cT(n) {
  return n.index === !0;
}
function Qr(n, a, l = [], s = {}, o = !1) {
  return n.map((c, d) => {
    let h = [...l, String(d)], p = typeof c.id == "string" ? c.id : h.join("-");
    if (ze(
      c.index !== !0 || !c.children,
      "Cannot specify children on an index route"
    ), ze(
      o || !s[p],
      `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`
    ), cT(c)) {
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
      ), c.children && (m.children = Qr(
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
function $a(n, a, l = "/") {
  return Pr(n, a, l, !1);
}
function Pr(n, a, l, s) {
  let o = typeof a == "string" ? zn(a) : a, c = xn(o.pathname || "/", l);
  if (c == null)
    return null;
  let d = ib(n);
  dT(d);
  let h = null;
  for (let p = 0; h == null && p < d.length; ++p) {
    let m = TT(c);
    h = xT(
      d[p],
      m,
      s
    );
  }
  return h;
}
function fT(n, a) {
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
function ib(n, a = [], l = [], s = "", o = !1) {
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
    let v = bn([s, y.relativePath]), S = l.concat(y);
    d.children && d.children.length > 0 && (ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      d.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), ib(
      d.children,
      a,
      S,
      v,
      p
    )), !(d.path == null && !d.index) && a.push({
      path: v,
      score: bT(v, d.index),
      routesMeta: S
    });
  };
  return n.forEach((d, h) => {
    if (d.path === "" || !d.path?.includes("?"))
      c(d, h);
    else
      for (let p of lb(d.path))
        c(d, h, !0, p);
  }), a;
}
function lb(n) {
  let a = n.split("/");
  if (a.length === 0) return [];
  let [l, ...s] = a, o = l.endsWith("?"), c = l.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [c, ""] : [c];
  let d = lb(s.join("/")), h = [];
  return h.push(
    ...d.map(
      (p) => p === "" ? c : [c, p].join("/")
    )
  ), o && h.push(...d), h.map(
    (p) => n.startsWith("/") && p === "" ? "/" : p
  );
}
function dT(n) {
  n.sort(
    (a, l) => a.score !== l.score ? l.score - a.score : ST(
      a.routesMeta.map((s) => s.childrenIndex),
      l.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var hT = /^:[\w-]+$/, mT = 3, pT = 2, yT = 1, gT = 10, vT = -2, kg = (n) => n === "*";
function bT(n, a) {
  let l = n.split("/"), s = l.length;
  return l.some(kg) && (s += vT), a && (s += pT), l.filter((o) => !kg(o)).reduce(
    (o, c) => o + (hT.test(c) ? mT : c === "" ? yT : gT),
    s
  );
}
function ST(n, a) {
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
function xT(n, a, l = !1) {
  let { routesMeta: s } = n, o = {}, c = "/", d = [];
  for (let h = 0; h < s.length; ++h) {
    let p = s[h], m = h === s.length - 1, y = c === "/" ? a : a.slice(c.length) || "/", v = tu(
      { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      y
    ), S = p.route;
    if (!v && m && l && !s[s.length - 1].route.index && (v = tu(
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
      pathnameBase: MT(
        bn([c, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (c = bn([c, v.pathnameBase]));
  }
  return d;
}
function tu(n, a) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [l, s] = ET(
    n.path,
    n.caseSensitive,
    n.end
  ), o = a.match(l);
  if (!o) return null;
  let c = o[0], d = c.replace(/(.)\/+$/, "$1"), h = o.slice(1);
  return {
    params: s.reduce(
      (m, { paramName: y, isOptional: v }, S) => {
        if (y === "*") {
          let R = h[S] || "";
          d = c.slice(0, c.length - R.length).replace(/(.)\/+$/, "$1");
        }
        const T = h[S];
        return v && !T ? m[y] = void 0 : m[y] = (T || "").replace(/%2F/g, "/"), m;
      },
      {}
    ),
    pathname: c,
    pathnameBase: d,
    pattern: n
  };
}
function ET(n, a = !1, l = !0) {
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
  return n.endsWith("*") ? (s.push({ paramName: "*" }), o += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : l ? o += "\\/*$" : n !== "" && n !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function TT(n) {
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
  let l = a.endsWith("/") ? a.length - 1 : a.length, s = n.charAt(l);
  return s && s !== "/" ? null : n.slice(l) || "/";
}
function RT({
  basename: n,
  pathname: a
}) {
  return a === "/" ? n : bn([n, a]);
}
var rb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Jd = (n) => rb.test(n);
function CT(n, a = "/") {
  let {
    pathname: l,
    search: s = "",
    hash: o = ""
  } = typeof n == "string" ? zn(n) : n, c;
  return l ? (l = eh(l), l.startsWith("/") ? c = Pg(l.substring(1), "/") : c = Pg(l, a)) : c = a, {
    pathname: c,
    search: wT(s),
    hash: AT(o)
  };
}
function Pg(n, a) {
  let l = nu(a).split("/");
  return n.split("/").forEach((o) => {
    o === ".." ? l.length > 1 && l.pop() : o !== "." && l.push(o);
  }), l.length > 1 ? l.join("/") : "/";
}
function Xf(n, a, l, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function sb(n) {
  return n.filter(
    (a, l) => l === 0 || a.route.path && a.route.path.length > 0
  );
}
function Wd(n) {
  let a = sb(n);
  return a.map(
    (l, s) => s === a.length - 1 ? l.pathname : l.pathnameBase
  );
}
function yu(n, a, l, s = !1) {
  let o;
  typeof n == "string" ? o = zn(n) : (o = { ...n }, ze(
    !o.pathname || !o.pathname.includes("?"),
    Xf("?", "pathname", "search", o)
  ), ze(
    !o.pathname || !o.pathname.includes("#"),
    Xf("#", "pathname", "hash", o)
  ), ze(
    !o.search || !o.search.includes("#"),
    Xf("#", "search", "hash", o)
  ));
  let c = n === "" || o.pathname === "", d = c ? "/" : o.pathname, h;
  if (d == null)
    h = l;
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
  let p = CT(o, h), m = d && d !== "/" && d.endsWith("/"), y = (c || d === ".") && l.endsWith("/");
  return !p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p;
}
var eh = (n) => n.replace(/\/\/+/g, "/"), bn = (n) => eh(n.join("/")), nu = (n) => n.replace(/\/+$/, ""), MT = (n) => nu(n).replace(/^\/*/, "/"), wT = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, AT = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, jT = (n, a = 302) => {
  let l = a;
  typeof l == "number" ? l = { status: l } : typeof l.status > "u" && (l.status = 302);
  let s = new Headers(l.headers);
  return s.set("Location", n), new Response(null, { ...l, headers: s });
}, gu = class {
  constructor(n, a, l, s = !1) {
    this.status = n, this.statusText = a || "", this.internal = s, l instanceof Error ? (this.data = l.toString(), this.error = l) : this.data = l;
  }
};
function Zr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function ns(n) {
  let a = n.map((l) => l.route.path).filter(Boolean);
  return bn(a) || "/";
}
var ob = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ub(n, a) {
  let l = n;
  if (typeof l != "string" || !rb.test(l))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: l
    };
  let s = l, o = !1;
  if (ob)
    try {
      let c = new URL(window.location.href), d = l.startsWith("//") ? new URL(c.protocol + l) : new URL(l), h = xn(d.pathname, a);
      d.origin === c.origin && h != null ? l = h + d.search + d.hash : o = !0;
    } catch {
      ht(
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
var Qa = Symbol("Uninstrumented");
function DT(n, a) {
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
    let o = Rl(l.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((c) => {
      let d = o[c], h = l[`lazy.${c}`];
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
    if (typeof c == "function" && l[o].length > 0) {
      let d = c[Qa] ?? c, h = Rl(
        l[o],
        d,
        (...p) => Yg(p[0])
      );
      h && (o === "loader" && d.hydrate === !0 && (h.hydrate = !0), h[Qa] = d, s[o] = h);
    }
  }), a.middleware && a.middleware.length > 0 && l.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let c = o[Qa] ?? o, d = Rl(
      l.middleware,
      c,
      (...h) => Yg(h[0])
    );
    return d ? (d[Qa] = c, d) : o;
  })), s;
}
function NT(n, a) {
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
    let s = n.navigate[Qa] ?? n.navigate, o = Rl(
      l.navigate,
      s,
      (...c) => {
        let [d, h] = c;
        return {
          to: typeof d == "number" || typeof d == "string" ? d : d ? Gn(d) : ".",
          ...Gg(n, h ?? {})
        };
      }
    );
    o && (o[Qa] = s, n.navigate = o);
  }
  if (l.fetch.length > 0) {
    let s = n.fetch[Qa] ?? n.fetch, o = Rl(l.fetch, s, (...c) => {
      let [d, , h, p] = c;
      return {
        href: h ?? ".",
        fetcherKey: d,
        ...Gg(n, p ?? {})
      };
    });
    o && (o[Qa] = s, n.fetch = o);
  }
  return n;
}
function Rl(n, a, l) {
  return n.length === 0 ? null : async (...s) => {
    let o = await cb(
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
async function cb(n, a, l, s) {
  let o = n[s], c;
  if (o) {
    let d, h = async () => (d ? console.error("You cannot call instrumented handlers more than once") : d = cb(n, a, l, s - 1), c = await d, ze(c, "Expected a result"), c.type === "error" && c.value instanceof Error ? { status: "error", error: c.value } : { status: "success", error: void 0 });
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
    request: zT(a),
    params: { ...s },
    unstable_pattern: o,
    context: OT(l)
  };
}
function Gg(n, a) {
  return {
    currentUrl: Gn(n.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function zT(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...a) => n.headers.get(...a)
    }
  };
}
function OT(n) {
  if (LT(n)) {
    let a = { ...n };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => n.get(a)
    };
}
var _T = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function LT(n) {
  if (n === null || typeof n != "object")
    return !1;
  const a = Object.getPrototypeOf(n);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === _T;
}
var fb = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], UT = new Set(
  fb
), VT = [
  "GET",
  ...fb
], BT = new Set(VT), db = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), HT = /* @__PURE__ */ new Set([307, 308]), $f = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, qT = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, zr = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, kT = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), hb = "remix-router-transitions", mb = Symbol("ResetLoaderData");
function PT(n) {
  const a = n.window ? n.window : typeof window < "u" ? window : void 0, l = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = n.hydrationRouteProperties || [], o = n.mapRouteProperties || kT, c = o;
  if (n.unstable_instrumentations) {
    let A = n.unstable_instrumentations;
    c = (_) => ({
      ...o(_),
      ...DT(
        A.map((k) => k.route).filter(Boolean),
        _
      )
    });
  }
  let d = {}, h = Qr(
    n.routes,
    c,
    void 0,
    d
  ), p, m = n.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let y = n.dataStrategy || $T, v = {
    unstable_passThroughRequests: !1,
    ...n.future
  }, S = null, T = /* @__PURE__ */ new Set(), R = null, C = null, D = null, z = n.hydrationData != null, B = $a(h, n.history.location, m), L = !1, V = null, K, ee;
  if (B == null && !n.patchRoutesOnNavigation) {
    let A = gn(404, {
      pathname: n.history.location.pathname
    }), { matches: _, route: k } = zo(h);
    K = !0, ee = !K, B = _, V = { [k.id]: A };
  } else if (B && !n.hydrationData && ba(
    B,
    h,
    n.history.location.pathname
  ).active && (B = null), B)
    if (B.some((A) => A.route.lazy))
      K = !1, ee = !K;
    else if (!B.some((A) => th(A.route)))
      K = !0, ee = !K;
    else {
      let A = n.hydrationData ? n.hydrationData.loaderData : null, _ = n.hydrationData ? n.hydrationData.errors : null, k = B;
      if (_) {
        let ae = B.findIndex(
          (re) => _[re.route.id] !== void 0
        );
        k = k.slice(0, ae + 1);
      }
      ee = !1, K = !0, k.forEach((ae) => {
        let re = pb(ae.route, A, _);
        ee = ee || re.renderFallback, K = K && !re.shouldLoad;
      });
    }
  else {
    K = !1, ee = !K, B = [];
    let A = ba(
      null,
      h,
      n.history.location.pathname
    );
    A.active && A.matches && (L = !0, B = A.matches);
  }
  let J, j = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: B,
    initialized: K,
    renderFallback: ee,
    navigation: $f,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || V,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, X = "POP", Q = null, ue = !1, I, F = !1, oe = /* @__PURE__ */ new Map(), te = null, O = !1, ne = !1, se = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), le = 0, M = -1, G = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Set(), fe = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), Ce = /* @__PURE__ */ new Set(), je = /* @__PURE__ */ new Map(), mt, Qe = null;
  function ti() {
    if (S = n.history.listen(
      ({ action: A, location: _, delta: k }) => {
        if (mt) {
          mt(), mt = void 0;
          return;
        }
        ht(
          je.size === 0 || k != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = ai({
          currentLocation: j.location,
          nextLocation: _,
          historyAction: A
        });
        if (ae && k != null) {
          let re = new Promise((ye) => {
            mt = ye;
          });
          n.history.go(k * -1), Qn(ae, {
            state: "blocked",
            location: _,
            proceed() {
              Qn(ae, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: _
              }), re.then(() => n.history.go(k));
            },
            reset() {
              let ye = new Map(j.blockers);
              ye.set(ae, zr), Et({ blockers: ye });
            }
          }), Q?.resolve(), Q = null;
          return;
        }
        return Xn(A, _);
      }
    ), l) {
      fR(a, oe);
      let A = () => dR(a, oe);
      a.addEventListener("pagehide", A), te = () => a.removeEventListener("pagehide", A);
    }
    return j.initialized || Xn("POP", j.location, {
      initialHydration: !0
    }), J;
  }
  function Li() {
    S && S(), te && te(), T.clear(), I && I.abort(), j.fetchers.forEach((A, _) => Kn(_)), j.blockers.forEach((A, _) => ni(_));
  }
  function Vl(A) {
    return T.add(A), () => T.delete(A);
  }
  function Et(A, _ = {}) {
    A.matches && (A.matches = A.matches.map((re) => {
      let ye = d[re.route.id], de = re.route;
      return de.element !== ye.element || de.errorElement !== ye.errorElement || de.hydrateFallbackElement !== ye.hydrateFallbackElement ? {
        ...re,
        route: ye
      } : re;
    })), j = {
      ...j,
      ...A
    };
    let k = [], ae = [];
    j.fetchers.forEach((re, ye) => {
      re.state === "idle" && (Ce.has(ye) ? k.push(ye) : ae.push(ye));
    }), Ce.forEach((re) => {
      !j.fetchers.has(re) && !ce.has(re) && k.push(re);
    }), [...T].forEach(
      (re) => re(j, {
        deletedFetchers: k,
        newErrors: A.errors ?? null,
        viewTransitionOpts: _.viewTransitionOpts,
        flushSync: _.flushSync === !0
      })
    ), k.forEach((re) => Kn(re)), ae.forEach((re) => j.fetchers.delete(re));
  }
  function Yt(A, _, { flushSync: k } = {}) {
    let ae = j.actionData != null && j.navigation.formMethod != null && Vt(j.navigation.formMethod) && j.navigation.state === "loading" && A.state?._isRedirect !== !0, re;
    _.actionData ? Object.keys(_.actionData).length > 0 ? re = _.actionData : re = null : ae ? re = j.actionData : re = null;
    let ye = _.loaderData ? tv(
      j.loaderData,
      _.loaderData,
      _.matches || [],
      _.errors
    ) : j.loaderData, de = j.blockers;
    de.size > 0 && (de = new Map(de), de.forEach((Ee, Se) => de.set(Se, zr)));
    let he = O ? !1 : Pl(A, _.matches || j.matches), ve = ue === !0 || j.navigation.formMethod != null && Vt(j.navigation.formMethod) && A.state?._isRedirect !== !0;
    p && (h = p, p = void 0), O || X === "POP" || (X === "PUSH" ? n.history.push(A, A.state) : X === "REPLACE" && n.history.replace(A, A.state));
    let me;
    if (X === "POP") {
      let Ee = oe.get(j.location.pathname);
      Ee && Ee.has(A.pathname) ? me = {
        currentLocation: j.location,
        nextLocation: A
      } : oe.has(A.pathname) && (me = {
        currentLocation: A,
        nextLocation: j.location
      });
    } else if (F) {
      let Ee = oe.get(j.location.pathname);
      Ee ? Ee.add(A.pathname) : (Ee = /* @__PURE__ */ new Set([A.pathname]), oe.set(j.location.pathname, Ee)), me = {
        currentLocation: j.location,
        nextLocation: A
      };
    }
    Et(
      {
        ..._,
        // matches, errors, fetchers go through as-is
        actionData: re,
        loaderData: ye,
        historyAction: X,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: $f,
        revalidation: "idle",
        restoreScrollPosition: he,
        preventScrollReset: ve,
        blockers: de
      },
      {
        viewTransitionOpts: me,
        flushSync: k === !0
      }
    ), X = "POP", ue = !1, F = !1, O = !1, ne = !1, Q?.resolve(), Q = null, Qe?.resolve(), Qe = null;
  }
  async function Ui(A, _) {
    if (Q?.resolve(), Q = null, typeof A == "number") {
      Q || (Q = lv());
      let Ze = Q.promise;
      return n.history.go(A), Ze;
    }
    let k = Td(
      j.location,
      j.matches,
      m,
      A,
      _?.fromRouteId,
      _?.relative
    ), { path: ae, submission: re, error: ye } = Fg(
      !1,
      k,
      _
    ), de;
    _?.unstable_mask && (de = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof _.unstable_mask == "string" ? zn(_.unstable_mask) : {
        ...j.location.unstable_mask,
        ..._.unstable_mask
      }
    });
    let he = j.location, ve = Ed(
      he,
      ae,
      _ && _.state,
      void 0,
      de
    );
    ve = {
      ...ve,
      ...n.history.encodeLocation(ve)
    };
    let me = _ && _.replace != null ? _.replace : void 0, Ee = "PUSH";
    me === !0 ? Ee = "REPLACE" : me === !1 || re != null && Vt(re.formMethod) && re.formAction === j.location.pathname + j.location.search && (Ee = "REPLACE");
    let Se = _ && "preventScrollReset" in _ ? _.preventScrollReset === !0 : void 0, He = (_ && _.flushSync) === !0, De = ai({
      currentLocation: he,
      nextLocation: ve,
      historyAction: Ee
    });
    if (De) {
      Qn(De, {
        state: "blocked",
        location: ve,
        proceed() {
          Qn(De, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ve
          }), Ui(A, _);
        },
        reset() {
          let Ze = new Map(j.blockers);
          Ze.set(De, zr), Et({ blockers: Ze });
        }
      });
      return;
    }
    await Xn(Ee, ve, {
      submission: re,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: ye,
      preventScrollReset: Se,
      replace: _ && _.replace,
      enableViewTransition: _ && _.viewTransition,
      flushSync: He,
      callSiteDefaultShouldRevalidate: _ && _.unstable_defaultShouldRevalidate
    });
  }
  function Bl() {
    Qe || (Qe = lv()), ga(), Et({ revalidation: "loading" });
    let A = Qe.promise;
    return j.navigation.state === "submitting" ? A : j.navigation.state === "idle" ? (Xn(j.historyAction, j.location, {
      startUninterruptedRevalidation: !0
    }), A) : (Xn(
      X || j.historyAction,
      j.navigation.location,
      {
        overrideNavigation: j.navigation,
        // Proxy through any rending view transition
        enableViewTransition: F === !0
      }
    ), A);
  }
  async function Xn(A, _, k) {
    I && I.abort(), I = null, X = A, O = (k && k.startUninterruptedRevalidation) === !0, Nu(j.location, j.matches), ue = (k && k.preventScrollReset) === !0, F = (k && k.enableViewTransition) === !0;
    let ae = p || h, re = k && k.overrideNavigation, ye = k?.initialHydration && j.matches && j.matches.length > 0 && !L ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      j.matches
    ) : $a(ae, _, m), de = (k && k.flushSync) === !0;
    if (ye && j.initialized && !ne && tR(j.location, _) && !(k && k.submission && Vt(k.submission.formMethod))) {
      Yt(_, { matches: ye }, { flushSync: de });
      return;
    }
    let he = ba(ye, ae, _.pathname);
    if (he.active && he.matches && (ye = he.matches), !ye) {
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
        { flushSync: de }
      );
      return;
    }
    I = new AbortController();
    let ve = El(
      n.history,
      _,
      I.signal,
      k && k.submission
    ), me = n.getContext ? await n.getContext() : new Hg(), Ee;
    if (k && k.pendingError)
      Ee = [
        Ka(ye).route.id,
        { type: "error", error: k.pendingError }
      ];
    else if (k && k.submission && Vt(k.submission.formMethod)) {
      let Fe = await hs(
        ve,
        _,
        k.submission,
        ye,
        me,
        he.active,
        k && k.initialHydration === !0,
        { replace: k.replace, flushSync: de }
      );
      if (Fe.shortCircuited)
        return;
      if (Fe.pendingActionResult) {
        let [lt, Oe] = Fe.pendingActionResult;
        if (rn(Oe) && Zr(Oe.error) && Oe.error.status === 404) {
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
      ye = Fe.matches || ye, Ee = Fe.pendingActionResult, re = Kf(_, k.submission), de = !1, he.active = !1, ve = El(
        n.history,
        ve.url,
        ve.signal
      );
    }
    let {
      shortCircuited: Se,
      matches: He,
      loaderData: De,
      errors: Ze
    } = await Hl(
      ve,
      _,
      ye,
      me,
      he.active,
      re,
      k && k.submission,
      k && k.fetcherSubmission,
      k && k.replace,
      k && k.initialHydration === !0,
      de,
      Ee,
      k && k.callSiteDefaultShouldRevalidate
    );
    Se || (I = null, Yt(_, {
      matches: He || ye,
      ...nv(Ee),
      loaderData: De,
      errors: Ze
    }));
  }
  async function hs(A, _, k, ae, re, ye, de, he = {}) {
    ga();
    let ve = uR(_, k);
    if (Et({ navigation: ve }, { flushSync: he.flushSync === !0 }), ye) {
      let Se = await On(
        ae,
        _.pathname,
        A.signal
      );
      if (Se.type === "aborted")
        return { shortCircuited: !0 };
      if (Se.type === "error") {
        if (Se.partialMatches.length === 0) {
          let { matches: De, route: Ze } = zo(h);
          return {
            matches: De,
            pendingActionResult: [
              Ze.id,
              {
                type: "error",
                error: Se.error
              }
            ]
          };
        }
        let He = Ka(Se.partialMatches).route.id;
        return {
          matches: Se.partialMatches,
          pendingActionResult: [
            He,
            {
              type: "error",
              error: Se.error
            }
          ]
        };
      } else if (Se.matches)
        ae = Se.matches;
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
    let me, Ee = Yo(ae, _);
    if (!Ee.route.action && !Ee.route.lazy)
      me = {
        type: "error",
        error: gn(405, {
          method: A.method,
          pathname: _.pathname,
          routeId: Ee.route.id
        })
      };
    else {
      let Se = jl(
        c,
        d,
        A,
        _,
        ae,
        Ee,
        de ? [] : s,
        re
      ), He = await ya(
        A,
        _,
        Se,
        re,
        null
      );
      if (me = He[Ee.route.id], !me) {
        for (let De of ae)
          if (He[De.route.id]) {
            me = He[De.route.id];
            break;
          }
      }
      if (A.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Mi(me)) {
      let Se;
      return he && he.replace != null ? Se = he.replace : Se = Jg(
        me.response.headers.get("Location"),
        new URL(A.url),
        m,
        n.history
      ) === j.location.pathname + j.location.search, await $n(A, me, !0, {
        submission: k,
        replace: Se
      }), { shortCircuited: !0 };
    }
    if (rn(me)) {
      let Se = Ka(ae, Ee.route.id);
      return (he && he.replace) !== !0 && (X = "PUSH"), {
        matches: ae,
        pendingActionResult: [
          Se.route.id,
          me,
          Ee.route.id
        ]
      };
    }
    return {
      matches: ae,
      pendingActionResult: [Ee.route.id, me]
    };
  }
  async function Hl(A, _, k, ae, re, ye, de, he, ve, me, Ee, Se, He) {
    let De = ye || Kf(_, de), Ze = de || he || iv(De), Fe = !O && !me;
    if (re) {
      if (Fe) {
        let ct = Vi(Se);
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
        k,
        _.pathname,
        A.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: Lt, route: yt } = zo(h);
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
        k = Ne.matches;
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
    let lt = p || h, { dsMatches: Oe, revalidatingFetchers: pt } = Xg(
      A,
      ae,
      c,
      d,
      n.history,
      j,
      k,
      Ze,
      _,
      me ? [] : s,
      me === !0,
      ne,
      se,
      Ce,
      fe,
      ie,
      lt,
      m,
      n.patchRoutesOnNavigation != null,
      Se,
      He
    );
    if (M = ++le, !n.dataStrategy && !Oe.some((Ne) => Ne.shouldLoad) && !Oe.some(
      (Ne) => Ne.route.middleware && Ne.route.middleware.length > 0
    ) && pt.length === 0) {
      let Ne = ps();
      return Yt(
        _,
        {
          matches: k,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Se && rn(Se[1]) ? { [Se[0]]: Se[1].error } : null,
          ...nv(Se),
          ...Ne ? { fetchers: new Map(j.fetchers) } : {}
        },
        { flushSync: Ee }
      ), { shortCircuited: !0 };
    }
    if (Fe) {
      let Ne = {};
      if (!re) {
        Ne.navigation = De;
        let ct = Vi(Se);
        ct !== void 0 && (Ne.actionData = ct);
      }
      pt.length > 0 && (Ne.fetchers = ql(pt)), Et(Ne, { flushSync: Ee });
    }
    pt.forEach((Ne) => {
      Ct(Ne.key), Ne.controller && ce.set(Ne.key, Ne.controller);
    });
    let We = () => pt.forEach((Ne) => Ct(Ne.key));
    I && I.signal.addEventListener(
      "abort",
      We
    );
    let { loaderResults: Sa, fetcherResults: Cn } = await kl(
      Oe,
      pt,
      A,
      _,
      ae
    );
    if (A.signal.aborted)
      return { shortCircuited: !0 };
    I && I.signal.removeEventListener(
      "abort",
      We
    ), pt.forEach((Ne) => ce.delete(Ne.key));
    let Mt = Oo(Sa);
    if (Mt)
      return await $n(A, Mt.result, !0, {
        replace: ve
      }), { shortCircuited: !0 };
    if (Mt = Oo(Cn), Mt)
      return ie.add(Mt.key), await $n(A, Mt.result, !0, {
        replace: ve
      }), { shortCircuited: !0 };
    let { loaderData: _n, errors: ii } = ev(
      j,
      k,
      Sa,
      Se,
      pt,
      Cn
    );
    me && j.errors && (ii = { ...j.errors, ...ii });
    let Ln = ps(), li = ys(M), Hi = Ln || li || pt.length > 0;
    return {
      matches: k,
      loaderData: _n,
      errors: ii,
      ...Hi ? { fetchers: new Map(j.fetchers) } : {}
    };
  }
  function Vi(A) {
    if (A && !rn(A[1]))
      return {
        [A[0]]: A[1].data
      };
    if (j.actionData)
      return Object.keys(j.actionData).length === 0 ? null : j.actionData;
  }
  function ql(A) {
    return A.forEach((_) => {
      let k = j.fetchers.get(_.key), ae = Or(
        void 0,
        k ? k.data : void 0
      );
      j.fetchers.set(_.key, ae);
    }), new Map(j.fetchers);
  }
  async function wu(A, _, k, ae) {
    Ct(A);
    let re = (ae && ae.flushSync) === !0, ye = p || h, de = Td(
      j.location,
      j.matches,
      m,
      k,
      _,
      ae?.relative
    ), he = $a(ye, de, m), ve = ba(he, ye, de);
    if (ve.active && ve.matches && (he = ve.matches), !he) {
      sn(
        A,
        _,
        gn(404, { pathname: de }),
        { flushSync: re }
      );
      return;
    }
    let { path: me, submission: Ee, error: Se } = Fg(
      !0,
      de,
      ae
    );
    if (Se) {
      sn(A, _, Se, { flushSync: re });
      return;
    }
    let He = n.getContext ? await n.getContext() : new Hg(), De = (ae && ae.preventScrollReset) === !0;
    if (Ee && Vt(Ee.formMethod)) {
      await Au(
        A,
        _,
        me,
        he,
        He,
        ve.active,
        re,
        De,
        Ee,
        ae && ae.unstable_defaultShouldRevalidate
      );
      return;
    }
    fe.set(A, { routeId: _, path: me }), await Bt(
      A,
      _,
      me,
      he,
      He,
      ve.active,
      re,
      De,
      Ee
    );
  }
  async function Au(A, _, k, ae, re, ye, de, he, ve, me) {
    ga(), fe.delete(A);
    let Ee = j.fetchers.get(A);
    Tn(A, cR(ve, Ee), {
      flushSync: de
    });
    let Se = new AbortController(), He = El(
      n.history,
      k,
      Se.signal,
      ve
    );
    if (ye) {
      let et = await On(
        ae,
        new URL(He.url).pathname,
        He.signal,
        A
      );
      if (et.type === "aborted")
        return;
      if (et.type === "error") {
        sn(A, _, et.error, { flushSync: de });
        return;
      } else if (et.matches)
        ae = et.matches;
      else {
        sn(
          A,
          _,
          gn(404, { pathname: k }),
          { flushSync: de }
        );
        return;
      }
    }
    let De = Yo(ae, k);
    if (!De.route.action && !De.route.lazy) {
      let et = gn(405, {
        method: ve.formMethod,
        pathname: k,
        routeId: _
      });
      sn(A, _, et, { flushSync: de });
      return;
    }
    ce.set(A, Se);
    let Ze = le, Fe = jl(
      c,
      d,
      He,
      k,
      ae,
      De,
      s,
      re
    ), lt = await ya(
      He,
      k,
      Fe,
      re,
      A
    ), Oe = lt[De.route.id];
    if (!Oe) {
      for (let et of Fe)
        if (lt[et.route.id]) {
          Oe = lt[et.route.id];
          break;
        }
    }
    if (He.signal.aborted) {
      ce.get(A) === Se && ce.delete(A);
      return;
    }
    if (Ce.has(A)) {
      if (Mi(Oe) || rn(Oe)) {
        Tn(A, ha(void 0));
        return;
      }
    } else {
      if (Mi(Oe))
        if (ce.delete(A), M > Ze) {
          Tn(A, ha(void 0));
          return;
        } else
          return ie.add(A), Tn(A, Or(ve)), $n(He, Oe, !1, {
            fetcherSubmission: ve,
            preventScrollReset: he
          });
      if (rn(Oe)) {
        sn(A, _, Oe.error);
        return;
      }
    }
    let pt = j.navigation.location || j.location, We = El(
      n.history,
      pt,
      Se.signal
    ), Sa = p || h, Cn = j.navigation.state !== "idle" ? $a(Sa, j.navigation.location, m) : j.matches;
    ze(Cn, "Didn't find any matches after fetcher action");
    let Mt = ++le;
    G.set(A, Mt);
    let _n = Or(ve, Oe.data);
    j.fetchers.set(A, _n);
    let { dsMatches: ii, revalidatingFetchers: Ln } = Xg(
      We,
      re,
      c,
      d,
      n.history,
      j,
      Cn,
      ve,
      pt,
      s,
      !1,
      ne,
      se,
      Ce,
      fe,
      ie,
      Sa,
      m,
      n.patchRoutesOnNavigation != null,
      [De.route.id, Oe],
      me
    );
    Ln.filter((et) => et.key !== A).forEach((et) => {
      let qi = et.key, ki = j.fetchers.get(qi), Ss = Or(
        void 0,
        ki ? ki.data : void 0
      );
      j.fetchers.set(qi, Ss), Ct(qi), et.controller && ce.set(qi, et.controller);
    }), Et({ fetchers: new Map(j.fetchers) });
    let li = () => Ln.forEach((et) => Ct(et.key));
    Se.signal.addEventListener(
      "abort",
      li
    );
    let { loaderResults: Hi, fetcherResults: Ne } = await kl(
      ii,
      Ln,
      We,
      pt,
      re
    );
    if (Se.signal.aborted)
      return;
    if (Se.signal.removeEventListener(
      "abort",
      li
    ), G.delete(A), ce.delete(A), Ln.forEach((et) => ce.delete(et.key)), j.fetchers.has(A)) {
      let et = ha(Oe.data);
      j.fetchers.set(A, et);
    }
    let ct = Oo(Hi);
    if (ct)
      return $n(
        We,
        ct.result,
        !1,
        { preventScrollReset: he }
      );
    if (ct = Oo(Ne), ct)
      return ie.add(ct.key), $n(
        We,
        ct.result,
        !1,
        { preventScrollReset: he }
      );
    let { loaderData: Lt, errors: yt } = ev(
      j,
      Cn,
      Hi,
      void 0,
      Ln,
      Ne
    );
    ys(Mt), j.navigation.state === "loading" && Mt > M ? (ze(X, "Expected pending action"), I && I.abort(), Yt(j.navigation.location, {
      matches: Cn,
      loaderData: Lt,
      errors: yt,
      fetchers: new Map(j.fetchers)
    })) : (Et({
      errors: yt,
      loaderData: tv(
        j.loaderData,
        Lt,
        Cn,
        yt
      ),
      fetchers: new Map(j.fetchers)
    }), ne = !1);
  }
  async function Bt(A, _, k, ae, re, ye, de, he, ve) {
    let me = j.fetchers.get(A);
    Tn(
      A,
      Or(
        ve,
        me ? me.data : void 0
      ),
      { flushSync: de }
    );
    let Ee = new AbortController(), Se = El(
      n.history,
      k,
      Ee.signal
    );
    if (ye) {
      let Oe = await On(
        ae,
        new URL(Se.url).pathname,
        Se.signal,
        A
      );
      if (Oe.type === "aborted")
        return;
      if (Oe.type === "error") {
        sn(A, _, Oe.error, { flushSync: de });
        return;
      } else if (Oe.matches)
        ae = Oe.matches;
      else {
        sn(
          A,
          _,
          gn(404, { pathname: k }),
          { flushSync: de }
        );
        return;
      }
    }
    let He = Yo(ae, k);
    ce.set(A, Ee);
    let De = le, Ze = jl(
      c,
      d,
      Se,
      k,
      ae,
      He,
      s,
      re
    ), Fe = await ya(
      Se,
      k,
      Ze,
      re,
      A
    ), lt = Fe[He.route.id];
    if (!lt) {
      for (let Oe of ae)
        if (Fe[Oe.route.id]) {
          lt = Fe[Oe.route.id];
          break;
        }
    }
    if (ce.get(A) === Ee && ce.delete(A), !Se.signal.aborted) {
      if (Ce.has(A)) {
        Tn(A, ha(void 0));
        return;
      }
      if (Mi(lt))
        if (M > De) {
          Tn(A, ha(void 0));
          return;
        } else {
          ie.add(A), await $n(Se, lt, !1, {
            preventScrollReset: he
          });
          return;
        }
      if (rn(lt)) {
        sn(A, _, lt.error);
        return;
      }
      Tn(A, ha(lt.data));
    }
  }
  async function $n(A, _, k, {
    submission: ae,
    fetcherSubmission: re,
    preventScrollReset: ye,
    replace: de
  } = {}) {
    k || (Q?.resolve(), Q = null), _.response.headers.has("X-Remix-Revalidate") && (ne = !0);
    let he = _.response.headers.get("Location");
    ze(he, "Expected a Location header on the redirect Response"), he = Jg(
      he,
      new URL(A.url),
      m,
      n.history
    );
    let ve = Ed(j.location, he, {
      _isRedirect: !0
    });
    if (l) {
      let Ze = !1;
      if (_.response.headers.has("X-Remix-Reload-Document"))
        Ze = !0;
      else if (Jd(he)) {
        const Fe = lT(he, !0);
        Ze = // Hard reload if it's an absolute URL to a new origin
        Fe.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        xn(Fe.pathname, m) == null;
      }
      if (Ze) {
        de ? a.location.replace(he) : a.location.assign(he);
        return;
      }
    }
    I = null;
    let me = de === !0 || _.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Ee, formAction: Se, formEncType: He } = j.navigation;
    !ae && !re && Ee && Se && He && (ae = iv(j.navigation));
    let De = ae || re;
    if (HT.has(_.response.status) && De && Vt(De.formMethod))
      await Xn(me, ve, {
        submission: {
          ...De,
          formAction: he
        },
        // Preserve these flags across redirects
        preventScrollReset: ye || ue,
        enableViewTransition: k ? F : void 0
      });
    else {
      let Ze = Kf(
        ve,
        ae
      );
      await Xn(me, ve, {
        overrideNavigation: Ze,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: re,
        // Preserve these flags across redirects
        preventScrollReset: ye || ue,
        enableViewTransition: k ? F : void 0
      });
    }
  }
  async function ya(A, _, k, ae, re) {
    let ye, de = {};
    try {
      ye = await QT(
        y,
        A,
        _,
        k,
        re,
        ae,
        !1
      );
    } catch (he) {
      return k.filter((ve) => ve.shouldLoad).forEach((ve) => {
        de[ve.route.id] = {
          type: "error",
          error: he
        };
      }), de;
    }
    if (A.signal.aborted)
      return de;
    if (!Vt(A.method))
      for (let he of k) {
        if (ye[he.route.id]?.type === "error")
          break;
        !ye.hasOwnProperty(he.route.id) && !j.loaderData.hasOwnProperty(he.route.id) && (!j.errors || !j.errors.hasOwnProperty(he.route.id)) && he.shouldCallHandler() && (ye[he.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${he.route.id}`
          )
        });
      }
    for (let [he, ve] of Object.entries(ye))
      if (lR(ve)) {
        let me = ve.result;
        de[he] = {
          type: "redirect",
          response: WT(
            me,
            A,
            he,
            k,
            m
          )
        };
      } else
        de[he] = await JT(ve);
    return de;
  }
  async function kl(A, _, k, ae, re) {
    let ye = ya(
      k,
      ae,
      A,
      re,
      null
    ), de = Promise.all(
      _.map(async (me) => {
        if (me.matches && me.match && me.request && me.controller) {
          let Se = (await ya(
            me.request,
            me.path,
            me.matches,
            re,
            me.key
          ))[me.match.route.id];
          return { [me.key]: Se };
        } else
          return Promise.resolve({
            [me.key]: {
              type: "error",
              error: gn(404, {
                pathname: me.path
              })
            }
          });
      })
    ), he = await ye, ve = (await de).reduce(
      (me, Ee) => Object.assign(me, Ee),
      {}
    );
    return {
      loaderResults: he,
      fetcherResults: ve
    };
  }
  function ga() {
    ne = !0, fe.forEach((A, _) => {
      ce.has(_) && se.add(_), Ct(_);
    });
  }
  function Tn(A, _, k = {}) {
    j.fetchers.set(A, _), Et(
      { fetchers: new Map(j.fetchers) },
      { flushSync: (k && k.flushSync) === !0 }
    );
  }
  function sn(A, _, k, ae = {}) {
    let re = Ka(j.matches, _);
    Kn(A), Et(
      {
        errors: {
          [re.route.id]: k
        },
        fetchers: new Map(j.fetchers)
      },
      { flushSync: (ae && ae.flushSync) === !0 }
    );
  }
  function ms(A) {
    return Te.set(A, (Te.get(A) || 0) + 1), Ce.has(A) && Ce.delete(A), j.fetchers.get(A) || qT;
  }
  function ju(A, _) {
    Ct(A, _?.reason), Tn(A, ha(null));
  }
  function Kn(A) {
    let _ = j.fetchers.get(A);
    ce.has(A) && !(_ && _.state === "loading" && G.has(A)) && Ct(A), fe.delete(A), G.delete(A), ie.delete(A), Ce.delete(A), se.delete(A), j.fetchers.delete(A);
  }
  function Ht(A) {
    let _ = (Te.get(A) || 0) - 1;
    _ <= 0 ? (Te.delete(A), Ce.add(A)) : Te.set(A, _), Et({ fetchers: new Map(j.fetchers) });
  }
  function Ct(A, _) {
    let k = ce.get(A);
    k && (k.abort(_), ce.delete(A));
  }
  function _t(A) {
    for (let _ of A) {
      let k = ms(_), ae = ha(k.data);
      j.fetchers.set(_, ae);
    }
  }
  function ps() {
    let A = [], _ = !1;
    for (let k of ie) {
      let ae = j.fetchers.get(k);
      ze(ae, `Expected fetcher: ${k}`), ae.state === "loading" && (ie.delete(k), A.push(k), _ = !0);
    }
    return _t(A), _;
  }
  function ys(A) {
    let _ = [];
    for (let [k, ae] of G)
      if (ae < A) {
        let re = j.fetchers.get(k);
        ze(re, `Expected fetcher: ${k}`), re.state === "loading" && (Ct(k), G.delete(k), _.push(k));
      }
    return _t(_), _.length > 0;
  }
  function Du(A, _) {
    let k = j.blockers.get(A) || zr;
    return je.get(A) !== _ && je.set(A, _), k;
  }
  function ni(A) {
    j.blockers.delete(A), je.delete(A);
  }
  function Qn(A, _) {
    let k = j.blockers.get(A) || zr;
    ze(
      k.state === "unblocked" && _.state === "blocked" || k.state === "blocked" && _.state === "blocked" || k.state === "blocked" && _.state === "proceeding" || k.state === "blocked" && _.state === "unblocked" || k.state === "proceeding" && _.state === "unblocked",
      `Invalid blocker state transition: ${k.state} -> ${_.state}`
    );
    let ae = new Map(j.blockers);
    ae.set(A, _), Et({ blockers: ae });
  }
  function ai({
    currentLocation: A,
    nextLocation: _,
    historyAction: k
  }) {
    if (je.size === 0)
      return;
    je.size > 1 && ht(!1, "A router only supports one blocker at a time");
    let ae = Array.from(je.entries()), [re, ye] = ae[ae.length - 1], de = j.blockers.get(re);
    if (!(de && de.state === "proceeding") && ye({ currentLocation: A, nextLocation: _, historyAction: k }))
      return re;
  }
  function Rn(A) {
    let _ = gn(404, { pathname: A }), k = p || h, { matches: ae, route: re } = zo(k);
    return { notFoundMatches: ae, route: re, error: _ };
  }
  function Bi(A, _, k) {
    if (R = A, D = _, C = k || null, !z && j.navigation === $f) {
      z = !0;
      let ae = Pl(j.location, j.matches);
      ae != null && Et({ restoreScrollPosition: ae });
    }
    return () => {
      R = null, D = null, C = null;
    };
  }
  function va(A, _) {
    return C && C(
      A,
      _.map((ae) => fT(ae, j.loaderData))
    ) || A.key;
  }
  function Nu(A, _) {
    if (R && D) {
      let k = va(A, _);
      R[k] = D();
    }
  }
  function Pl(A, _) {
    if (R) {
      let k = va(A, _), ae = R[k];
      if (typeof ae == "number")
        return ae;
    }
    return null;
  }
  function ba(A, _, k) {
    if (n.patchRoutesOnNavigation)
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: Pr(
            _,
            k,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: Pr(
          _,
          k,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function On(A, _, k, ae) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: A };
    let re = A;
    for (; ; ) {
      let ye = p == null, de = p || h, he = d;
      try {
        await n.patchRoutesOnNavigation({
          signal: k,
          path: _,
          matches: re,
          fetcherKey: ae,
          patch: (Ee, Se) => {
            k.aborted || $g(
              Ee,
              Se,
              de,
              he,
              c,
              !1
            );
          }
        });
      } catch (Ee) {
        return { type: "error", error: Ee, partialMatches: re };
      } finally {
        ye && !k.aborted && (h = [...h]);
      }
      if (k.aborted)
        return { type: "aborted" };
      let ve = $a(de, _, m), me = null;
      if (ve) {
        if (Object.keys(ve[0].params).length === 0)
          return { type: "success", matches: ve };
        if (me = Pr(
          de,
          _,
          m,
          !0
        ), !(me && re.length < me.length && gs(
          re,
          me.slice(0, re.length)
        )))
          return { type: "success", matches: ve };
      }
      if (me || (me = Pr(
        de,
        _,
        m,
        !0
      )), !me || gs(re, me))
        return { type: "success", matches: null };
      re = me;
    }
  }
  function gs(A, _) {
    return A.length === _.length && A.every((k, ae) => k.route.id === _[ae].route.id);
  }
  function vs(A) {
    d = {}, p = Qr(
      A,
      c,
      void 0,
      d
    );
  }
  function bs(A, _, k = !1) {
    let ae = p == null;
    $g(
      A,
      _,
      p || h,
      d,
      c,
      k
    ), ae && (h = [...h], Et({}));
  }
  return J = {
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
    subscribe: Vl,
    enableScrollRestoration: Bi,
    navigate: Ui,
    fetch: wu,
    revalidate: Bl,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (A) => n.history.createHref(A),
    encodeLocation: (A) => n.history.encodeLocation(A),
    getFetcher: ms,
    resetFetcher: ju,
    deleteFetcher: Ht,
    dispose: Li,
    getBlocker: Du,
    deleteBlocker: ni,
    patchRoutes: bs,
    _internalFetchControllers: ce,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: vs,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
      Et(A);
    }
  }, n.unstable_instrumentations && (J = NT(
    J,
    n.unstable_instrumentations.map((A) => A.router).filter(Boolean)
  )), J;
}
function YT(n) {
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
    xn(n.pathname, l) || n.pathname,
    c === "path"
  );
  if (s == null && (p.search = n.search, p.hash = n.hash), (s == null || s === "" || s === ".") && h) {
    let m = ah(p.search);
    if (h.route.index && !m)
      p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search), v = y.getAll("index");
      y.delete("index"), v.filter((T) => T).forEach((T) => y.append("index", T));
      let S = y.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return l !== "/" && (p.pathname = RT({ basename: l, pathname: p.pathname })), Gn(p);
}
function Fg(n, a, l) {
  if (!l || !YT(l))
    return { path: a };
  if (l.formMethod && !oR(l.formMethod))
    return {
      path: a,
      error: gn(405, { method: l.formMethod })
    };
  let s = () => ({
    path: a,
    error: gn(400, { type: "invalid-body" })
  }), c = (l.formMethod || "get").toUpperCase(), d = Eb(a);
  if (l.body !== void 0) {
    if (l.formEncType === "text/plain") {
      if (!Vt(c))
        return s();
      let v = typeof l.body == "string" ? l.body : l.body instanceof FormData || l.body instanceof URLSearchParams ? (
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
          text: v
        }
      };
    } else if (l.formEncType === "application/json") {
      if (!Vt(c))
        return s();
      try {
        let v = typeof l.body == "string" ? JSON.parse(l.body) : l.body;
        return {
          path: a,
          submission: {
            formMethod: c,
            formAction: d,
            formEncType: l.formEncType,
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
  if (l.formData)
    h = Cd(l.formData), p = l.formData;
  else if (l.body instanceof FormData)
    h = Cd(l.body), p = l.body;
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
  if (Vt(m.formMethod))
    return { path: a, submission: m };
  let y = zn(a);
  return n && y.search && ah(y.search) && h.append("index", ""), y.search = `?${h}`, { path: Gn(y), submission: m };
}
function Xg(n, a, l, s, o, c, d, h, p, m, y, v, S, T, R, C, D, z, B, L, V) {
  let K = L ? rn(L[1]) ? L[1].error : L[1].data : void 0, ee = o.createURL(c.location), J = o.createURL(p), j;
  if (y && c.errors) {
    let te = Object.keys(c.errors)[0];
    j = d.findIndex((O) => O.route.id === te);
  } else if (L && rn(L[1])) {
    let te = L[0];
    j = d.findIndex((O) => O.route.id === te) - 1;
  }
  let X = L ? L[1].statusCode : void 0, Q = X && X >= 400, ue = {
    currentUrl: ee,
    currentParams: c.matches[0]?.params || {},
    nextUrl: J,
    nextParams: d[0].params,
    ...h,
    actionResult: K,
    actionStatus: X
  }, I = ns(d), F = d.map((te, O) => {
    let { route: ne } = te, se = null;
    if (j != null && O > j)
      se = !1;
    else if (ne.lazy)
      se = !0;
    else if (!th(ne))
      se = !1;
    else if (y) {
      let { shouldLoad: G } = pb(
        ne,
        c.loaderData,
        c.errors
      );
      se = G;
    } else GT(c.loaderData, c.matches[O], te) && (se = !0);
    if (se !== null)
      return Rd(
        l,
        s,
        n,
        p,
        I,
        te,
        m,
        a,
        se
      );
    let ce = !1;
    typeof V == "boolean" ? ce = V : Q ? ce = !1 : (v || ee.pathname + ee.search === J.pathname + J.search || ee.search !== J.search || FT(c.matches[O], te)) && (ce = !0);
    let le = {
      ...ue,
      defaultShouldRevalidate: ce
    }, M = Gr(te, le);
    return Rd(
      l,
      s,
      n,
      p,
      I,
      te,
      m,
      a,
      M,
      le,
      V
    );
  }), oe = [];
  return R.forEach((te, O) => {
    if (y || !d.some((fe) => fe.route.id === te.routeId) || T.has(O))
      return;
    let ne = c.fetchers.get(O), se = ne && ne.state !== "idle" && ne.data === void 0, ce = $a(D, te.path, z);
    if (!ce) {
      if (B && se)
        return;
      oe.push({
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
    if (C.has(O))
      return;
    let le = Yo(ce, te.path), M = new AbortController(), G = El(
      o,
      te.path,
      M.signal
    ), ie = null;
    if (S.has(O))
      S.delete(O), ie = jl(
        l,
        s,
        G,
        te.path,
        ce,
        le,
        m,
        a
      );
    else if (se)
      v && (ie = jl(
        l,
        s,
        G,
        te.path,
        ce,
        le,
        m,
        a
      ));
    else {
      let fe;
      typeof V == "boolean" ? fe = V : Q ? fe = !1 : fe = v;
      let Te = {
        ...ue,
        defaultShouldRevalidate: fe
      };
      Gr(le, Te) && (ie = jl(
        l,
        s,
        G,
        te.path,
        ce,
        le,
        m,
        a,
        Te
      ));
    }
    ie && oe.push({
      key: O,
      routeId: te.routeId,
      path: te.path,
      matches: ie,
      match: le,
      request: G,
      controller: M
    });
  }), { dsMatches: F, revalidatingFetchers: oe };
}
function th(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function pb(n, a, l) {
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
function GT(n, a, l) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    l.route.id !== a.route.id
  ), o = !n.hasOwnProperty(l.route.id);
  return s || o;
}
function FT(n, a) {
  let l = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    l != null && l.endsWith("*") && n.params["*"] !== a.params["*"]
  );
}
function Gr(n, a) {
  if (n.route.shouldRevalidate) {
    let l = n.route.shouldRevalidate(a);
    if (typeof l == "boolean")
      return l;
  }
  return a.defaultShouldRevalidate;
}
function $g(n, a, l, s, o, c) {
  let d;
  if (n) {
    let m = s[n];
    ze(
      m,
      `No route found to patch children into: routeId = ${n}`
    ), m.children || (m.children = []), d = m.children;
  } else
    d = l;
  let h = [], p = [];
  if (a.forEach((m) => {
    let y = d.find(
      (v) => yb(m, v)
    );
    y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
  }), h.length > 0) {
    let m = Qr(
      h,
      o,
      [n || "_", "patch", String(d?.length || "0")],
      s
    );
    d.push(...m);
  }
  if (c && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: v } = p[m], S = y, [T] = Qr(
        [v],
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
function yb(n, a) {
  return "id" in n && "id" in a && n.id === a.id ? !0 : n.index === a.index && n.path === a.path && n.caseSensitive === a.caseSensitive ? (!n.children || n.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : n.children?.every(
    (l, s) => a.children?.some((o) => yb(l, o))
  ) ?? !1 : !1;
}
var Kg = /* @__PURE__ */ new WeakMap(), gb = ({
  key: n,
  route: a,
  manifest: l,
  mapRouteProperties: s
}) => {
  let o = l[a.id];
  if (ze(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
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
    let m = sT(n), v = o[n] !== void 0 && n !== "hasErrorBoundary";
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
}, Qg = /* @__PURE__ */ new WeakMap();
function XT(n, a, l, s, o) {
  let c = l[n.id];
  if (ze(c, "No route found in manifest"), !n.lazy)
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
    let v = (async () => {
      ze(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let S = await n.lazy(), T = {};
      for (let R in S) {
        let C = S[R];
        if (C === void 0)
          continue;
        let D = uT(R), B = c[R] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        R !== "hasErrorBoundary";
        D ? ht(
          !D,
          "Route property " + R + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : B ? ht(
          !B,
          `Route "${c.id}" has a static property "${R}" defined but its lazy function is also returning a value for this property. The lazy route property "${R}" will be ignored.`
        ) : T[R] = C;
      }
      Object.assign(c, T), Object.assign(c, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(c),
        lazy: void 0
      });
    })();
    return Qg.set(c, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let d = Object.keys(n.lazy), h = [], p;
  for (let y of d) {
    if (o && o.includes(y))
      continue;
    let v = gb({
      key: y,
      route: n,
      manifest: l,
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
async function Zg(n) {
  let a = n.matches.filter((o) => o.shouldLoad), l = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, c) => {
    l[a[c].route.id] = o;
  }), l;
}
async function $T(n) {
  return n.matches.some((a) => a.route.middleware) ? vb(n, () => Zg(n)) : Zg(n);
}
function vb(n, a) {
  return KT(
    n,
    a,
    (s) => {
      if (sR(s))
        throw s;
      return s;
    },
    aR,
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
async function KT(n, a, l, s, o) {
  let { matches: c, ...d } = n, h = c.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
  );
  return await bb(
    d,
    h,
    a,
    l,
    s,
    o
  );
}
async function bb(n, a, l, s, o, c, d = 0) {
  let { request: h } = n;
  if (h.signal.aborted)
    throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[d];
  if (!p)
    return await l();
  let [m, y] = p, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await bb(
        n,
        a,
        l,
        s,
        o,
        c,
        d + 1
      ) }, v.value;
    } catch (T) {
      return v = { value: await c(T, m, v) }, v.value;
    }
  };
  try {
    let T = await y(n, S), R = T != null ? s(T) : void 0;
    return o(R) ? R : v ? R ?? v.value : (v = { value: await S() }, v.value);
  } catch (T) {
    return await c(T, m, v);
  }
}
function Sb(n, a, l, s, o) {
  let c = gb({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: n
  }), d = XT(
    s.route,
    Vt(l.method) ? "action" : "loader",
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
  let v = !1, S = Sb(
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
      return v = !0, m ? typeof y == "boolean" ? Gr(c, {
        ...m,
        defaultShouldRevalidate: y
      }) : typeof T == "boolean" ? Gr(c, {
        ...m,
        defaultShouldRevalidate: T
      }) : Gr(c, m) : p;
    },
    resolve(T) {
      let { lazy: R, loader: C, middleware: D } = c.route, z = v || p || T && !Vt(l.method) && (R || C), B = D && D.length > 0 && !C && !R;
      return z && (Vt(l.method) || !B) ? ZT({
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
function jl(n, a, l, s, o, c, d, h, p = null) {
  return o.map((m) => m.route.id !== c.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: p,
    shouldCallHandler: () => !1,
    _lazyPromises: Sb(
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
    ns(o),
    m,
    d,
    h,
    !0,
    p
  ));
}
async function QT(n, a, l, s, o, c, d) {
  s.some((y) => y._lazyPromises?.middleware) && await Promise.all(s.map((y) => y._lazyPromises?.middleware));
  let h = {
    request: a,
    unstable_url: xb(a, l),
    unstable_pattern: ns(s),
    params: s[0].params,
    context: c,
    matches: s
  }, m = await n({
    ...h,
    fetcherKey: o,
    runClientMiddleware: (y) => {
      let v = h;
      return vb(v, () => y({
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
async function ZT({
  request: n,
  path: a,
  unstable_pattern: l,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: c,
  handlerOverride: d,
  scopedContext: h
}) {
  let p, m, y = Vt(n.method), v = y ? "action" : "loader", S = (T) => {
    let R, C = new Promise((B, L) => R = L);
    m = () => R(), n.signal.addEventListener("abort", m);
    let D = (B) => typeof T != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : T(
      {
        request: n,
        unstable_url: xb(n, a),
        unstable_pattern: l,
        params: s.params,
        context: h
      },
      ...B !== void 0 ? [B] : []
    ), z = (async () => {
      try {
        return { type: "data", result: await (d ? d((L) => D(L)) : D()) };
      } catch (B) {
        return { type: "error", result: B };
      }
    })();
    return Promise.race([z, C]);
  };
  try {
    let T = y ? s.route.action : s.route.loader;
    if (o || c)
      if (T) {
        let R, [C] = await Promise.all([
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
    else if (T)
      p = await S(T);
    else {
      let R = new URL(n.url), C = R.pathname + R.search;
      throw gn(404, {
        pathname: C
      });
    }
  } catch (T) {
    return { type: "error", result: T };
  } finally {
    m && n.signal.removeEventListener("abort", m);
  }
  return p;
}
async function IT(n) {
  let a = n.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? n.body == null ? null : n.json() : n.text();
}
async function JT(n) {
  let { result: a, type: l } = n;
  if (nh(a)) {
    let s;
    try {
      s = await IT(a);
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
    error: nR(a),
    statusCode: Zr(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: Zr(a) ? a.status : void 0
  } : av(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function WT(n, a, l, s, o) {
  let c = n.headers.get("Location");
  if (ze(
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
var Ig = [
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
    if (Ig.includes(c.protocol))
      throw new Error("Invalid redirect location");
    let d = xn(c.pathname, l) != null;
    if (c.origin === a.origin && d)
      return eh(c.pathname) + c.search + c.hash;
  }
  try {
    let o = s.createURL(n);
    if (Ig.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function El(n, a, l, s) {
  let o = n.createURL(Eb(a)).toString(), c = { signal: l };
  if (s && Vt(s.formMethod)) {
    let { formMethod: d, formEncType: h } = s;
    c.method = d.toUpperCase(), h === "application/json" ? (c.headers = new Headers({ "Content-Type": h }), c.body = JSON.stringify(s.json)) : h === "text/plain" ? c.body = s.text : h === "application/x-www-form-urlencoded" && s.formData ? c.body = Cd(s.formData) : c.body = s.formData;
  }
  return new Request(o, c);
}
function xb(n, a) {
  let l = new URL(n.url), s = typeof a == "string" ? zn(a) : a;
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
function Cd(n) {
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
function eR(n, a, l, s = !1, o = !1) {
  let c = {}, d = null, h, p = !1, m = {}, y = l && rn(l[1]) ? l[1].error : void 0;
  return n.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, T = a[S];
    if (ze(
      !Mi(T),
      "Cannot handle redirect results in processLoaderData"
    ), rn(T)) {
      let R = T.error;
      if (y !== void 0 && (R = y, y = void 0), d = d || {}, o)
        d[S] = R;
      else {
        let C = Ka(n, S);
        d[C.route.id] == null && (d[C.route.id] = R);
      }
      s || (c[S] = mb), p || (p = !0, h = Zr(T.error) ? T.error.status : 500), T.headers && (m[S] = T.headers);
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
  let { loaderData: d, errors: h } = eR(
    a,
    l,
    s
  );
  return o.filter((p) => !p.matches || p.matches.some((m) => m.shouldLoad)).forEach((p) => {
    let { key: m, match: y, controller: v } = p;
    if (v && v.signal.aborted)
      return;
    let S = c[m];
    if (ze(S, "Did not find corresponding fetcher result"), rn(S)) {
      let T = Ka(n.matches, y?.route.id);
      h && h[T.route.id] || (h = {
        ...h,
        [T.route.id]: S.error
      }), n.fetchers.delete(m);
    } else if (Mi(S))
      ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let T = ha(S.data);
      n.fetchers.set(m, T);
    }
  }), { loaderData: d, errors: h };
}
function tv(n, a, l, s) {
  let o = Object.entries(a).filter(([, c]) => c !== mb).reduce((c, [d, h]) => (c[d] = h, c), {});
  for (let c of l) {
    let d = c.route.id;
    if (!a.hasOwnProperty(d) && n.hasOwnProperty(d) && c.route.loader && (o[d] = n[d]), s && s.hasOwnProperty(d))
      break;
  }
  return o;
}
function nv(n) {
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
function gn(n, {
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
function Oo(n) {
  let a = Object.entries(n);
  for (let l = a.length - 1; l >= 0; l--) {
    let [s, o] = a[l];
    if (Mi(o))
      return { key: s, result: o };
  }
}
function Eb(n) {
  let a = typeof n == "string" ? zn(n) : n;
  return Gn({ ...a, hash: "" });
}
function tR(n, a) {
  return n.pathname !== a.pathname || n.search !== a.search ? !1 : n.hash === "" ? a.hash !== "" : n.hash === a.hash ? !0 : a.hash !== "";
}
function nR(n) {
  return new gu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function aR(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([a, l]) => typeof a == "string" && iR(l)
  );
}
function iR(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function lR(n) {
  return nh(n.result) && db.has(n.result.status);
}
function rn(n) {
  return n.type === "error";
}
function Mi(n) {
  return (n && n.type) === "redirect";
}
function av(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function nh(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function rR(n) {
  return db.has(n);
}
function sR(n) {
  return nh(n) && rR(n.status) && n.headers.has("Location");
}
function oR(n) {
  return BT.has(n.toUpperCase());
}
function Vt(n) {
  return UT.has(n.toUpperCase());
}
function ah(n) {
  return new URLSearchParams(n).getAll("index").some((a) => a === "");
}
function Yo(n, a) {
  let l = typeof a == "string" ? zn(a).search : a.search;
  if (n[n.length - 1].route.index && ah(l || ""))
    return n[n.length - 1];
  let s = sb(n);
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
function uR(n, a) {
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
function Or(n, a) {
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
function cR(n, a) {
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
function fR(n, a) {
  try {
    let l = n.sessionStorage.getItem(
      hb
    );
    if (l) {
      let s = JSON.parse(l);
      for (let [o, c] of Object.entries(s || {}))
        c && Array.isArray(c) && a.set(o, new Set(c || []));
    }
  } catch {
  }
}
function dR(n, a) {
  if (a.size > 0) {
    let l = {};
    for (let [s, o] of a)
      l[s] = [...o];
    try {
      n.sessionStorage.setItem(
        hb,
        JSON.stringify(l)
      );
    } catch (s) {
      ht(
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
var zi = x.createContext(null);
zi.displayName = "DataRouter";
var as = x.createContext(null);
as.displayName = "DataRouterState";
var Tb = x.createContext(!1);
function Rb() {
  return x.useContext(Tb);
}
var ih = x.createContext({
  isTransitioning: !1
});
ih.displayName = "ViewTransition";
var Cb = x.createContext(
  /* @__PURE__ */ new Map()
);
Cb.displayName = "Fetchers";
var hR = x.createContext(null);
hR.displayName = "Await";
var En = x.createContext(
  null
);
En.displayName = "Navigation";
var vu = x.createContext(
  null
);
vu.displayName = "Location";
var ma = x.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
ma.displayName = "Route";
var lh = x.createContext(null);
lh.displayName = "RouteError";
var Mb = "REACT_ROUTER_ERROR", mR = "REDIRECT", pR = "ROUTE_ERROR_RESPONSE";
function yR(n) {
  if (n.startsWith(`${Mb}:${mR}:{`))
    try {
      let a = JSON.parse(n.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function gR(n) {
  if (n.startsWith(
    `${Mb}:${pR}:{`
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
function vR(n, { relative: a } = {}) {
  ze(
    is(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: l, navigator: s } = x.useContext(En), { hash: o, pathname: c, search: d } = ls(n, { relative: a }), h = c;
  return l !== "/" && (h = c === "/" ? l : bn([l, c])), s.createHref({ pathname: h, search: d, hash: o });
}
function is() {
  return x.useContext(vu) != null;
}
function pa() {
  return ze(
    is(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), x.useContext(vu).location;
}
var wb = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ab(n) {
  x.useContext(En).static || x.useLayoutEffect(n);
}
function Oi() {
  let { isDataRoute: n } = x.useContext(ma);
  return n ? DR() : bR();
}
function bR() {
  ze(
    is(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = x.useContext(zi), { basename: a, navigator: l } = x.useContext(En), { matches: s } = x.useContext(ma), { pathname: o } = pa(), c = JSON.stringify(Wd(s)), d = x.useRef(!1);
  return Ab(() => {
    d.current = !0;
  }), x.useCallback(
    (p, m = {}) => {
      if (ht(d.current, wb), !d.current) return;
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
      n == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : bn([a, y.pathname])), (m.replace ? l.replace : l.push)(
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
function ls(n, { relative: a } = {}) {
  let { matches: l } = x.useContext(ma), { pathname: s } = pa(), o = JSON.stringify(Wd(l));
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
function SR(n, a, l) {
  ze(
    is(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = x.useContext(En), { matches: o } = x.useContext(ma), c = o[o.length - 1], d = c ? c.params : {}, h = c ? c.pathname : "/", p = c ? c.pathnameBase : "/", m = c && c.route;
  {
    let D = m && m.path || "";
    Nb(
      h,
      !m || D.endsWith("*") || D.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D === "/" ? "*" : `${D}/*`}">.`
    );
  }
  let y = pa(), v;
  v = y;
  let S = v.pathname || "/", T = S;
  if (p !== "/") {
    let D = p.replace(/^\//, "").split("/");
    T = "/" + S.replace(/^\//, "").split("/").slice(D.length).join("/");
  }
  let R = $a(n, { pathname: T });
  return ht(
    m || R != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), ht(
    R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), CR(
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
    l
  );
}
function xR() {
  let n = jR(), a = Zr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), l = n instanceof Error ? n.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, c = { padding: "2px 4px", backgroundColor: s }, d = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), d = /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ x.createElement("code", { style: c }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ x.createElement("code", { style: c }, "errorElement"), " prop on your route.")), /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ x.createElement("h3", { style: { fontStyle: "italic" } }, a), l ? /* @__PURE__ */ x.createElement("pre", { style: o }, l) : null, d);
}
var ER = /* @__PURE__ */ x.createElement(xR, null), jb = class extends x.Component {
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
      const l = gR(n.digest);
      l && (n = l);
    }
    let a = n !== void 0 ? /* @__PURE__ */ x.createElement(ma.Provider, { value: this.props.routeContext }, /* @__PURE__ */ x.createElement(
      lh.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ x.createElement(TR, { error: n }, a) : a;
  }
};
jb.contextType = Tb;
var Qf = /* @__PURE__ */ new WeakMap();
function TR({
  children: n,
  error: a
}) {
  let { basename: l } = x.useContext(En);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = yR(a.digest);
    if (s) {
      let o = Qf.get(a);
      if (o) throw o;
      let c = ub(s.location, l);
      if (ob && !Qf.get(a))
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
function RR({ routeContext: n, match: a, children: l }) {
  let s = x.useContext(zi);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ x.createElement(ma.Provider, { value: n }, l);
}
function CR(n, a = [], l) {
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
  if (l && s) {
    d = s.renderFallback;
    for (let y = 0; y < o.length; y++) {
      let v = o[y];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = y), v.route.id) {
        let { loaderData: S, errors: T } = s, R = v.route.loader && !S.hasOwnProperty(v.route.id) && (!T || T[v.route.id] === void 0);
        if (v.route.lazy || R) {
          l.isStatic && (d = !0), h >= 0 ? o = o.slice(0, h + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let p = l?.onError, m = s && p ? (y, v) => {
    p(y, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: ns(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (y, v, S) => {
      let T, R = !1, C = null, D = null;
      s && (T = c && v.route.id ? c[v.route.id] : void 0, C = v.route.errorElement || ER, d && (h < 0 && S === 0 ? (Nb(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), R = !0, D = null) : h === S && (R = !0, D = v.route.hydrateFallbackElement || null)));
      let z = a.concat(o.slice(0, S + 1)), B = () => {
        let L;
        return T ? L = C : R ? L = D : v.route.Component ? L = /* @__PURE__ */ x.createElement(v.route.Component, null) : v.route.element ? L = v.route.element : L = y, /* @__PURE__ */ x.createElement(
          RR,
          {
            match: v,
            routeContext: {
              outlet: y,
              matches: z,
              isDataRoute: s != null
            },
            children: L
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ x.createElement(
        jb,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
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
function MR(n) {
  let a = x.useContext(zi);
  return ze(a, rh(n)), a;
}
function Db(n) {
  let a = x.useContext(as);
  return ze(a, rh(n)), a;
}
function wR(n) {
  let a = x.useContext(ma);
  return ze(a, rh(n)), a;
}
function bu(n) {
  let a = wR(n), l = a.matches[a.matches.length - 1];
  return ze(
    l.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), l.route.id;
}
function AR() {
  return bu(
    "useRouteId"
    /* UseRouteId */
  );
}
function rs() {
  let n = Db(
    "useLoaderData"
    /* UseLoaderData */
  ), a = bu(
    "useLoaderData"
    /* UseLoaderData */
  );
  return n.loaderData[a];
}
function jR() {
  let n = x.useContext(lh), a = Db(
    "useRouteError"
    /* UseRouteError */
  ), l = bu(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : a.errors?.[l];
}
function DR() {
  let { router: n } = MR(
    "useNavigate"
    /* UseNavigateStable */
  ), a = bu(
    "useNavigate"
    /* UseNavigateStable */
  ), l = x.useRef(!1);
  return Ab(() => {
    l.current = !0;
  }), x.useCallback(
    async (o, c = {}) => {
      ht(l.current, wb), l.current && (typeof o == "number" ? await n.navigate(o) : await n.navigate(o, { fromRouteId: a, ...c }));
    },
    [n, a]
  );
}
var rv = {};
function Nb(n, a, l) {
  !a && !rv[n] && (rv[n] = !0, ht(!1, l));
}
var sv = {};
function ov(n, a) {
  !n && !sv[a] && (sv[a] = !0, console.warn(a));
}
var NR = "useOptimistic", uv = $E[NR], zR = () => {
};
function OR(n) {
  return uv ? uv(n) : [n, zR];
}
function _R(n) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && ht(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: x.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && ht(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: x.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && ht(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: x.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var LR = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function UR(n, a) {
  return PT({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aT({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: n,
    hydrationRouteProperties: LR,
    mapRouteProperties: _R,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var VR = class {
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
function BR({
  router: n,
  flushSync: a,
  onError: l,
  unstable_useTransitions: s
}) {
  s = Rb() || s;
  let [c, d] = x.useState(n.state), [h, p] = OR(c), [m, y] = x.useState(), [v, S] = x.useState({
    isTransitioning: !1
  }), [T, R] = x.useState(), [C, D] = x.useState(), [z, B] = x.useState(), L = x.useRef(/* @__PURE__ */ new Map()), V = x.useCallback(
    (X, { deletedFetchers: Q, newErrors: ue, flushSync: I, viewTransitionOpts: F }) => {
      ue && l && Object.values(ue).forEach(
        (te) => l(te, {
          location: X.location,
          params: X.matches[0]?.params ?? {},
          unstable_pattern: ns(X.matches)
        })
      ), X.fetchers.forEach((te, O) => {
        te.data !== void 0 && L.current.set(O, te.data);
      }), Q.forEach((te) => L.current.delete(te)), ov(
        I === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (ov(
        F == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !F || !oe) {
        a && I ? a(() => d(X)) : s === !1 ? d(X) : x.startTransition(() => {
          s === !0 && p((te) => cv(te, X)), d(X);
        });
        return;
      }
      if (a && I) {
        a(() => {
          C && (T?.resolve(), C.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: F.currentLocation,
            nextLocation: F.nextLocation
          });
        });
        let te = n.window.document.startViewTransition(() => {
          a(() => d(X));
        });
        te.finished.finally(() => {
          a(() => {
            R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => D(te));
        return;
      }
      C ? (T?.resolve(), C.skipTransition(), B({
        state: X,
        currentLocation: F.currentLocation,
        nextLocation: F.nextLocation
      })) : (y(X), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: F.currentLocation,
        nextLocation: F.nextLocation
      }));
    },
    [
      n.window,
      a,
      C,
      T,
      s,
      p,
      l
    ]
  );
  x.useLayoutEffect(() => n.subscribe(V), [n, V]);
  let K = h.initialized;
  x.useLayoutEffect(() => {
    !K && n.state.initialized && V(n.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [K, V, n.state]), x.useEffect(() => {
    v.isTransitioning && !v.flushSync && R(new VR());
  }, [v]), x.useEffect(() => {
    if (T && m && n.window) {
      let X = m, Q = T.promise, ue = n.window.document.startViewTransition(async () => {
        s === !1 ? d(X) : x.startTransition(() => {
          s === !0 && p((I) => cv(I, X)), d(X);
        }), await Q;
      });
      ue.finished.finally(() => {
        R(void 0), D(void 0), y(void 0), S({ isTransitioning: !1 });
      }), D(ue);
    }
  }, [
    m,
    T,
    n.window,
    s,
    p
  ]), x.useEffect(() => {
    T && m && h.location.key === m.location.key && T.resolve();
  }, [T, C, h.location, m]), x.useEffect(() => {
    !v.isTransitioning && z && (y(z.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: z.currentLocation,
      nextLocation: z.nextLocation
    }), B(void 0));
  }, [v.isTransitioning, z]);
  let ee = x.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (X) => n.navigate(X),
    push: (X, Q, ue) => n.navigate(X, {
      state: Q,
      preventScrollReset: ue?.preventScrollReset
    }),
    replace: (X, Q, ue) => n.navigate(X, {
      replace: !0,
      state: Q,
      preventScrollReset: ue?.preventScrollReset
    })
  }), [n]), J = n.basename || "/", j = x.useMemo(
    () => ({
      router: n,
      navigator: ee,
      static: !1,
      basename: J,
      onError: l
    }),
    [n, ee, J, l]
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(zi.Provider, { value: j }, /* @__PURE__ */ x.createElement(as.Provider, { value: h }, /* @__PURE__ */ x.createElement(Cb.Provider, { value: L.current }, /* @__PURE__ */ x.createElement(ih.Provider, { value: v }, /* @__PURE__ */ x.createElement(
    kR,
    {
      basename: J,
      location: h.location,
      navigationType: h.historyAction,
      navigator: ee,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ x.createElement(
      HR,
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
var HR = x.memo(qR);
function qR({
  routes: n,
  future: a,
  state: l,
  isStatic: s,
  onError: o
}) {
  return SR(n, void 0, { state: l, isStatic: s, onError: o });
}
function kR({
  basename: n = "/",
  children: a = null,
  location: l,
  navigationType: s = "POP",
  navigator: o,
  static: c = !1,
  unstable_useTransitions: d
}) {
  ze(
    !is(),
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
  typeof l == "string" && (l = zn(l));
  let {
    pathname: m = "/",
    search: y = "",
    hash: v = "",
    state: S = null,
    key: T = "default",
    unstable_mask: R
  } = l, C = x.useMemo(() => {
    let D = xn(m, h);
    return D == null ? null : {
      location: {
        pathname: D,
        search: y,
        hash: v,
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
    v,
    S,
    T,
    s,
    R
  ]);
  return ht(
    C != null,
    `<Router basename="${h}"> is not able to match the URL "${m}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), C == null ? null : /* @__PURE__ */ x.createElement(En.Provider, { value: p }, /* @__PURE__ */ x.createElement(vu.Provider, { children: a, value: C }));
}
var Go = "get", Fo = "application/x-www-form-urlencoded";
function Su(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function PR(n) {
  return Su(n) && n.tagName.toLowerCase() === "button";
}
function YR(n) {
  return Su(n) && n.tagName.toLowerCase() === "form";
}
function GR(n) {
  return Su(n) && n.tagName.toLowerCase() === "input";
}
function FR(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function XR(n, a) {
  return n.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !FR(n);
}
var _o = null;
function $R() {
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
var KR = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Zf(n) {
  return n != null && !KR.has(n) ? (ht(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fo}"`
  ), null) : n;
}
function QR(n, a) {
  let l, s, o, c, d;
  if (YR(n)) {
    let h = n.getAttribute("action");
    s = h ? xn(h, a) : null, l = n.getAttribute("method") || Go, o = Zf(n.getAttribute("enctype")) || Fo, c = new FormData(n);
  } else if (PR(n) || GR(n) && (n.type === "submit" || n.type === "image")) {
    let h = n.form;
    if (h == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let p = n.getAttribute("formaction") || h.getAttribute("action");
    if (s = p ? xn(p, a) : null, l = n.getAttribute("formmethod") || h.getAttribute("method") || Go, o = Zf(n.getAttribute("formenctype")) || Zf(h.getAttribute("enctype")) || Fo, c = new FormData(h, n), !$R()) {
      let { name: m, type: y, value: v } = n;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        c.append(`${S}x`, "0"), c.append(`${S}y`, "0");
      } else m && c.append(m, v);
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
function zb(n, a, l, s) {
  let o = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return l ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && xn(o.pathname, a) === "/" ? o.pathname = `${nu(a)}/_root.${s}` : o.pathname = `${nu(o.pathname)}.${s}`, o;
}
async function ZR(n, a) {
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
function IR(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function JR(n, a, l) {
  let s = await Promise.all(
    n.map(async (o) => {
      let c = a.routes[o.route.id];
      if (c) {
        let d = await ZR(c, l);
        return d.links ? d.links() : [];
      }
      return [];
    })
  );
  return nC(
    s.flat(1).filter(IR).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
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
      let v = p.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: l[0]?.params || {},
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
function WR(n, a, { includeHydrateFallback: l } = {}) {
  return eC(
    n.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let c = [o.module];
      return o.clientActionModule && (c = c.concat(o.clientActionModule)), o.clientLoaderModule && (c = c.concat(o.clientLoaderModule)), l && o.hydrateFallbackModule && (c = c.concat(o.hydrateFallbackModule)), o.imports && (c = c.concat(o.imports)), c;
    }).flat(1)
  );
}
function eC(n) {
  return [...new Set(n)];
}
function tC(n) {
  let a = {}, l = Object.keys(n).sort();
  for (let s of l)
    a[s] = n[s];
  return a;
}
function nC(n, a) {
  let l = /* @__PURE__ */ new Set();
  return new Set(a), n.reduce((s, o) => {
    let c = JSON.stringify(tC(o));
    return l.has(c) || (l.add(c), s.push({ key: c, link: o })), s;
  }, []);
}
function oh() {
  let n = x.useContext(zi);
  return sh(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function aC() {
  let n = x.useContext(as);
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
function iC(n, a) {
  let l = x.useContext(uh), [s, o] = x.useState(!1), [c, d] = x.useState(!1), { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: v } = a, S = x.useRef(null);
  x.useEffect(() => {
    if (n === "render" && d(!0), n === "viewport") {
      let C = (z) => {
        z.forEach((B) => {
          d(B.isIntersecting);
        });
      }, D = new IntersectionObserver(C, { threshold: 0.5 });
      return S.current && D.observe(S.current), () => {
        D.disconnect();
      };
    }
  }, [n]), x.useEffect(() => {
    if (s) {
      let C = setTimeout(() => {
        d(!0);
      }, 100);
      return () => {
        clearTimeout(C);
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
      onFocus: _r(h, T),
      onBlur: _r(p, R),
      onMouseEnter: _r(m, T),
      onMouseLeave: _r(y, R),
      onTouchStart: _r(v, T)
    }
  ] : [!1, S, {}];
}
function _r(n, a) {
  return (l) => {
    n && n(l), l.defaultPrevented || a(l);
  };
}
function lC({ page: n, ...a }) {
  let l = Rb(), { router: s } = oh(), o = x.useMemo(
    () => $a(s.routes, n, s.basename),
    [s.routes, n, s.basename]
  );
  return o ? l ? /* @__PURE__ */ x.createElement(sC, { page: n, matches: o, ...a }) : /* @__PURE__ */ x.createElement(oC, { page: n, matches: o, ...a }) : null;
}
function rC(n) {
  let { manifest: a, routeModules: l } = ch(), [s, o] = x.useState([]);
  return x.useEffect(() => {
    let c = !1;
    return JR(n, a, l).then(
      (d) => {
        c || o(d);
      }
    ), () => {
      c = !0;
    };
  }, [n, a, l]), s;
}
function sC({
  page: n,
  matches: a,
  ...l
}) {
  let s = pa(), { future: o } = ch(), { basename: c } = oh(), d = x.useMemo(() => {
    if (n === s.pathname + s.search + s.hash)
      return [];
    let h = zb(
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
function oC({
  page: n,
  matches: a,
  ...l
}) {
  let s = pa(), { future: o, manifest: c, routeModules: d } = ch(), { basename: h } = oh(), { loaderData: p, matches: m } = aC(), y = x.useMemo(
    () => fv(
      n,
      a,
      m,
      c,
      s,
      "data"
    ),
    [n, a, m, c, s]
  ), v = x.useMemo(
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
    let C = /* @__PURE__ */ new Set(), D = !1;
    if (a.forEach((B) => {
      let L = c.routes[B.route.id];
      !L || !L.hasLoader || (!y.some((V) => V.route.id === B.route.id) && B.route.id in p && d[B.route.id]?.shouldRevalidate || L.hasClientLoader ? D = !0 : C.add(B.route.id));
    }), C.size === 0)
      return [];
    let z = zb(
      n,
      h,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return D && C.size > 0 && z.searchParams.set(
      "_routes",
      a.filter((B) => C.has(B.route.id)).map((B) => B.route.id).join(",")
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
    () => WR(v, c),
    [v, c]
  ), R = rC(v);
  return /* @__PURE__ */ x.createElement(x.Fragment, null, S.map((C) => /* @__PURE__ */ x.createElement("link", { key: C, rel: "prefetch", as: "fetch", href: C, ...l })), T.map((C) => /* @__PURE__ */ x.createElement("link", { key: C, rel: "modulepreload", href: C, ...l })), R.map(({ key: C, link: D }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ x.createElement(
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
function uC(...n) {
  return (a) => {
    n.forEach((l) => {
      typeof l == "function" ? l(a) : l != null && (l.current = a);
    });
  };
}
var cC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  cC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Ob = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ss = x.forwardRef(
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
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: T,
    ...R
  }, C) {
    let { basename: D, navigator: z, unstable_useTransitions: B } = x.useContext(En), L = typeof y == "string" && Ob.test(y), V = ub(y, D);
    y = V.to;
    let K = vR(y, { relative: o }), ee = pa(), J = null;
    if (h) {
      let te = yu(
        h,
        [],
        ee.unstable_mask ? ee.unstable_mask.pathname : "/",
        !0
      );
      D !== "/" && (te.pathname = te.pathname === "/" ? D : bn([D, te.pathname])), J = z.createHref(te);
    }
    let [j, X, Q] = iC(
      s,
      R
    ), ue = mC(y, {
      replace: d,
      unstable_mask: h,
      state: p,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: T,
      unstable_useTransitions: B
    });
    function I(te) {
      a && a(te), te.defaultPrevented || ue(te);
    }
    let F = !(V.isExternal || c), oe = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ x.createElement(
        "a",
        {
          ...R,
          ...Q,
          href: (F ? J : void 0) || V.absoluteURL || K,
          onClick: F ? I : a,
          ref: uC(C, X),
          target: m,
          "data-discover": !L && l === "render" ? "true" : void 0
        }
      )
    );
    return j && !L ? /* @__PURE__ */ x.createElement(x.Fragment, null, oe, /* @__PURE__ */ x.createElement(lC, { page: K })) : oe;
  }
);
ss.displayName = "Link";
var fC = x.forwardRef(
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
    let v = ls(d, { relative: m.relative }), S = pa(), T = x.useContext(as), { navigator: R, basename: C } = x.useContext(En), D = T != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bC(v) && h === !0, z = R.encodeLocation ? R.encodeLocation(v).pathname : v.pathname, B = S.pathname, L = T && T.navigation && T.navigation.location ? T.navigation.location.pathname : null;
    l || (B = B.toLowerCase(), L = L ? L.toLowerCase() : null, z = z.toLowerCase()), L && C && (L = xn(L, C) || L);
    const V = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
    let K = B === z || !o && B.startsWith(z) && B.charAt(V) === "/", ee = L != null && (L === z || !o && L.startsWith(z) && L.charAt(z.length) === "/"), J = {
      isActive: K,
      isPending: ee,
      isTransitioning: D
    }, j = K ? a : void 0, X;
    typeof s == "function" ? X = s(J) : X = [
      s,
      K ? "active" : null,
      ee ? "pending" : null,
      D ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let Q = typeof c == "function" ? c(J) : c;
    return /* @__PURE__ */ x.createElement(
      ss,
      {
        ...m,
        "aria-current": j,
        className: X,
        ref: y,
        style: Q,
        to: d,
        viewTransition: h
      },
      typeof p == "function" ? p(J) : p
    );
  }
);
fC.displayName = "NavLink";
var dC = x.forwardRef(
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
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...T
  }, R) => {
    let { unstable_useTransitions: C } = x.useContext(En), D = gC(), z = vC(h, { relative: m }), B = d.toLowerCase() === "get" ? "get" : "post", L = typeof h == "string" && Ob.test(h), V = (K) => {
      if (p && p(K), K.defaultPrevented) return;
      K.preventDefault();
      let ee = K.nativeEvent.submitter, J = ee?.getAttribute("formmethod") || d, j = () => D(ee || K.currentTarget, {
        fetcherKey: a,
        method: J,
        navigate: l,
        replace: o,
        state: c,
        relative: m,
        preventScrollReset: y,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      C && l !== !1 ? x.startTransition(() => j()) : j();
    };
    return /* @__PURE__ */ x.createElement(
      "form",
      {
        ref: R,
        method: B,
        action: z,
        onSubmit: s ? p : V,
        ...T,
        "data-discover": !L && n === "render" ? "true" : void 0
      }
    );
  }
);
dC.displayName = "Form";
function hC(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function _b(n) {
  let a = x.useContext(zi);
  return ze(a, hC(n)), a;
}
function mC(n, {
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
  let y = Oi(), v = pa(), S = ls(n, { relative: d });
  return x.useCallback(
    (T) => {
      if (XR(T, a)) {
        T.preventDefault();
        let R = l !== void 0 ? l : Gn(v) === Gn(S), C = () => y(n, {
          replace: R,
          unstable_mask: s,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: h,
          unstable_defaultShouldRevalidate: p
        });
        m ? x.startTransition(() => C()) : C();
      }
    },
    [
      v,
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
var pC = 0, yC = () => `__${String(++pC)}__`;
function gC() {
  let { router: n } = _b(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = x.useContext(En), l = AR(), s = n.fetch, o = n.navigate;
  return x.useCallback(
    async (c, d = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: v } = QR(
        c,
        a
      );
      if (d.navigate === !1) {
        let S = d.fetcherKey || yC();
        await s(S, l, d.action || h, {
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
          fromRouteId: l,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition
        });
    },
    [s, o, a, l]
  );
}
function vC(n, { relative: a } = {}) {
  let { basename: l } = x.useContext(En), s = x.useContext(ma);
  ze(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), c = { ...ls(n || ".", { relative: a }) }, d = pa();
  if (n == null) {
    c.search = d.search;
    let h = new URLSearchParams(c.search), p = h.getAll("index");
    if (p.some((y) => y === "")) {
      h.delete("index"), p.filter((v) => v).forEach((v) => h.append("index", v));
      let y = h.toString();
      c.search = y ? `?${y}` : "";
    }
  }
  return (!n || n === ".") && o.route.index && (c.search = c.search ? c.search.replace(/^\?/, "?index&") : "?index"), l !== "/" && (c.pathname = c.pathname === "/" ? l : bn([l, c.pathname])), Gn(c);
}
function bC(n, { relative: a } = {}) {
  let l = x.useContext(ih);
  ze(
    l != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = _b(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = ls(n, { relative: a });
  if (!l.isTransitioning)
    return !1;
  let c = xn(l.currentLocation.pathname, s) || l.currentLocation.pathname, d = xn(l.nextLocation.pathname, s) || l.nextLocation.pathname;
  return tu(o.pathname, d) != null || tu(o.pathname, c) != null;
}
class _i extends Error {
  constructor(a, l, s, o) {
    super(s), this.status = a, this.category = l, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const zl = "/api/v1/extensions/nexus.audio.emotiontts";
async function it(n, a) {
  const l = n.startsWith("http") ? n : `${zl}${n}`, s = await fetch(l, {
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
function SC(n, a, l) {
  const s = n.startsWith("http") ? n : `${zl}${n}`, o = new EventSource(s);
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
async function xC() {
  return it("/deployments");
}
async function dv(n) {
  return it(`/deployments/${n}`);
}
async function EC(n, a) {
  return it(`/deployments/${n}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function hv(n) {
  return it(`/mappings?deploymentId=${encodeURIComponent(n)}`);
}
async function Lb(n, a) {
  return it("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: n })
  });
}
async function TC(n, a, l) {
  return it(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    {
      method: "PATCH",
      body: JSON.stringify(l)
    }
  );
}
async function RC(n, a) {
  await it(
    `/mappings/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
async function CC(n) {
  return it(`/mappings/export?deploymentId=${encodeURIComponent(n)}`);
}
async function MC(n, a, l = "error") {
  return it("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: n, mappings: a, conflictStrategy: l })
  });
}
async function wC(n, a = {}) {
  const l = new URLSearchParams();
  a.limit && l.set("limit", String(a.limit)), a.status && l.set("status", a.status);
  const s = l.toString(), o = s ? `?${s}` : "";
  return it(`/deployments/${n}/runs${o}`);
}
async function AC(n, a) {
  return it(`/deployments/${n}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function fh(n, a) {
  return it(`/deployments/${n}/runs/${a}`);
}
async function jC(n, a) {
  return it(`/deployments/${n}/runs/${a}/cancel`, { method: "POST" });
}
async function dh(n, a) {
  return it(`/deployments/${n}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function DC(n, a) {
  return it(`/deployments/${n}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function mv(n, a, l, s) {
  return SC(
    `/deployments/${n}/runs/${a}/progress`,
    l,
    s
  );
}
async function au(n) {
  return it(`/voice-assets?deploymentId=${encodeURIComponent(n)}`);
}
async function NC(n, a, l, s, o) {
  const c = new FormData();
  c.append("deploymentId", n), c.append("displayName", l), c.append("kind", s), c.append("audio", a);
  const d = await fetch(`${zl}/voice-assets`, {
    method: "POST",
    body: c
  });
  if (!d.ok)
    throw new Error(`upload failed: ${d.status}`);
  return await d.json();
}
async function zC(n) {
  return it(`/workflow?deploymentId=${encodeURIComponent(n)}`);
}
var OC = "_93p6291", _C = "_93p6292", LC = "_93p6293", UC = "_93p6294", VC = "_93p6295", BC = "_93p6296", HC = "_93p6297", qC = "_93p6298", kC = "_93p6299", PC = "_93p629a", YC = "_93p629b", GC = "_93p629c", FC = "_93p629d", XC = "_93p629e", $C = "_93p629f", KC = "_93p629g", QC = "_93p629h", ZC = "_93p629i";
function IC() {
  const { deployments: n } = rs();
  return /* @__PURE__ */ b.jsxs("main", { className: OC, children: [
    /* @__PURE__ */ b.jsxs("header", { className: _C, children: [
      /* @__PURE__ */ b.jsx("p", { className: LC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ b.jsxs("h1", { className: UC, children: [
        "Direct your characters.",
        /* @__PURE__ */ b.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: VC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: BC, children: [
      /* @__PURE__ */ b.jsx("h2", { className: HC, children: "Deployments" }),
      n.length === 0 ? /* @__PURE__ */ b.jsxs("div", { className: XC, children: [
        /* @__PURE__ */ b.jsx("span", { className: $C, "aria-hidden": "true", children: "◈" }),
        /* @__PURE__ */ b.jsx("p", { className: KC, children: "No deployments yet" }),
        /* @__PURE__ */ b.jsx("p", { className: QC, children: "A deployment is a named character-cast that binds voices, presets, and the runtime settings for a script. Create your first one from the host shell." }),
        /* @__PURE__ */ b.jsx("p", { className: ZC, children: "Host shell → Extensions → EmotionTTS → New" })
      ] }) : /* @__PURE__ */ b.jsx("ul", { className: qC, children: n.map((a) => /* @__PURE__ */ b.jsx("li", { children: /* @__PURE__ */ b.jsxs(ss, { to: `/${a.deploymentId}/recipe`, className: kC, children: [
        /* @__PURE__ */ b.jsx("span", { className: PC, "aria-hidden": "true", children: JC(a.displayName) }),
        /* @__PURE__ */ b.jsxs("span", { children: [
          /* @__PURE__ */ b.jsx("span", { className: YC, children: a.displayName }),
          /* @__PURE__ */ b.jsx("span", { className: GC, children: a.deploymentId })
        ] }),
        /* @__PURE__ */ b.jsx("span", { className: FC, "aria-hidden": "true", children: "→" })
      ] }) }, a.deploymentId)) })
    ] })
  ] });
}
function JC(n) {
  const a = n.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
const WC = "huggingface/IndexTeam/IndexTTS-2";
async function eM(n) {
  const a = await fetch(`/api/v1/model-store/families/${encodeURIComponent(n)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" }
  });
  if (!a.ok)
    throw new Error(`Model download start failed: ${a.status}`);
  return await a.json();
}
async function tM() {
  return it("/runtime/health");
}
async function nM() {
  await it("/runtime/start", { method: "POST" });
}
async function aM() {
  return it("/runtime/stop", { method: "POST" });
}
async function iM() {
  await it("/runtime/restart", { method: "POST" });
}
function lM(n) {
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
var rM = "g5r6d10", sM = "g5r6d11", oM = "g5r6d12", Lr = "g5r6d13", Ur = "g5r6d14", uM = "g5r6d15", cM = "g5r6d16", fM = "g5r6d17", Zt = "g5r6d18", Xa = "g5r6d19", iu = "g5r6d1b g5r6d1a", Ia = "g5r6d1c g5r6d1a", Ub = "g5r6d1d g5r6d1a", Vb = "g5r6d1e", Ir = "g5r6d1f", Md = "g5r6d1g", dM = "g5r6d1h", hM = "g5r6d1i", Ga = "g5r6d1j", Bb = "g5r6d1k", Hb = "g5r6d1l g5r6d1k", hh = "g5r6d1m g5r6d1k", mh = "g5r6d1n g5r6d1k";
const mM = 4e3;
function pM({ deployment: n }) {
  const a = Oi(), [l, s] = x.useState(null), [o, c] = x.useState(null), [d, h] = x.useState(!1);
  x.useEffect(() => {
    let D = !1;
    const z = async () => {
      try {
        const L = await tM();
        D || (s(L), c(null));
      } catch (L) {
        D || c(Vr(L));
      }
    };
    z();
    const B = setInterval(z, mM);
    return () => {
      D = !0, clearInterval(B);
    };
  }, []);
  const p = x.useCallback(async () => {
    h(!0), c(null);
    try {
      await nM();
    } catch (D) {
      c(Vr(D));
    } finally {
      h(!1);
    }
  }, []), m = x.useCallback(async () => {
    h(!0);
    try {
      await aM();
    } catch (D) {
      c(Vr(D));
    } finally {
      h(!1);
    }
  }, []), y = x.useCallback(async () => {
    h(!0);
    try {
      await iM();
    } catch (D) {
      c(Vr(D));
    } finally {
      h(!1);
    }
  }, []), v = x.useCallback(async () => {
    h(!0);
    try {
      await eM(WC);
    } catch (D) {
      c(Vr(D));
    } finally {
      h(!1);
    }
  }, []), S = l?.badge ?? "not_installed", T = S === "stopped" || S === "not_installed", R = S === "ready" || S === "running" || S === "starting", C = o?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { className: Xa, role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Runtime" }),
    /* @__PURE__ */ b.jsx("span", { children: n.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Badge" }),
    /* @__PURE__ */ b.jsx("span", { className: yM(S), children: lM(S) }),
    l && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Uptime" }),
      /* @__PURE__ */ b.jsx("span", { children: gM(l.uptimeSeconds) }),
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "VRAM" }),
      /* @__PURE__ */ b.jsxs("span", { children: [
        l.vramUsedMb,
        " / ",
        l.vramTotalMb,
        " MB"
      ] })
    ] }),
    T && /* @__PURE__ */ b.jsx("button", { type: "button", className: iu, disabled: d, onClick: p, children: "Install / Start runtime" }),
    R && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("button", { type: "button", className: Ub, disabled: d, onClick: m, children: "Stop backend" }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: Ia, disabled: d, onClick: y, children: "Restart" })
    ] }),
    C && /* @__PURE__ */ b.jsx("button", { type: "button", className: iu, disabled: d, onClick: v, children: "Download IndexTTS-2 model" }),
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
    o && !C && /* @__PURE__ */ b.jsx("span", { className: Ir, children: o })
  ] });
}
function yM(n) {
  switch (n) {
    case "ready":
    case "running":
      return Hb;
    case "starting":
    case "stopping":
    case "installing":
      return hh;
    case "failed":
      return mh;
    default:
      return Bb;
  }
}
function gM(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60);
  return a < 60 ? `${a}m ${n % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function Vr(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
async function vM(n) {
  return it(`/presets?deploymentId=${encodeURIComponent(n)}`);
}
async function bM(n, a, l) {
  return it("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: n, presetName: a, vector: l })
  });
}
async function SM(n, a) {
  await it(
    `/presets/${a}?deploymentId=${encodeURIComponent(n)}`,
    { method: "DELETE" }
  );
}
var xM = "wfqeb50", EM = "wfqeb51", TM = "wfqeb52", RM = "wfqeb53", CM = "wfqeb54", MM = "wfqeb55 wfqeb54", wM = "wfqeb56", AM = "wfqeb57", qb = "wfqeb58", kb = "wfqeb59", Pb = "wfqeb5a", jM = "wfqeb5b", DM = "wfqeb5c", pv = "wfqeb5d", NM = "wfqeb5e wfqeb5d", zM = "wfqeb5f wfqeb5d", OM = "wfqeb5g", _M = "wfqeb5h", If = "wfqeb5i", LM = "wfqeb5j", UM = "wfqeb5k", VM = "wfqeb5l", BM = "wfqeb5m";
const ph = x.createContext({});
function yh(n) {
  const a = x.useRef(null);
  return a.current === null && (a.current = n()), a.current;
}
const HM = typeof window < "u", Yb = HM ? x.useLayoutEffect : x.useEffect, xu = /* @__PURE__ */ x.createContext(null);
function gh(n, a) {
  n.indexOf(a) === -1 && n.push(a);
}
function lu(n, a) {
  const l = n.indexOf(a);
  l > -1 && n.splice(l, 1);
}
const Fn = (n, a, l) => l > a ? a : l < n ? n : l;
function yv(n, a) {
  return a ? `${n}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : n;
}
let os = () => {
}, Ni = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (os = (n, a, l) => {
  !n && typeof console < "u" && console.warn(yv(a, l));
}, Ni = (n, a, l) => {
  if (!n)
    throw new Error(yv(a, l));
});
const Ja = {}, Gb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Fb(n) {
  return typeof n == "object" && n !== null;
}
const Xb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function $b(n) {
  let a;
  return () => (a === void 0 && (a = n()), a);
}
const Sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, qM = (n, a) => (l) => a(n(l)), us = (...n) => n.reduce(qM), Jr = /* @__NO_SIDE_EFFECTS__ */ (n, a, l) => {
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
const It = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, vn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3;
function Kb(n, a) {
  return a ? n * (1e3 / a) : 0;
}
const Qb = (n, a, l) => (((1 - 3 * l + 3 * a) * n + (3 * l - 6 * a)) * n + 3 * a) * n, kM = 1e-7, PM = 12;
function YM(n, a, l, s, o) {
  let c, d, h = 0;
  do
    d = a + (l - a) / 2, c = Qb(d, s, o) - n, c > 0 ? l = d : a = d;
  while (Math.abs(c) > kM && ++h < PM);
  return d;
}
function cs(n, a, l, s) {
  if (n === a && l === s)
    return Sn;
  const o = (c) => YM(c, 0, 1, n, l);
  return (c) => c === 0 || c === 1 ? c : Qb(o(c), a, s);
}
const Zb = (n) => (a) => a <= 0.5 ? n(2 * a) / 2 : (2 - n(2 * (1 - a))) / 2, Ib = (n) => (a) => 1 - n(1 - a), Jb = /* @__PURE__ */ cs(0.33, 1.53, 0.69, 0.99), bh = /* @__PURE__ */ Ib(Jb), Wb = /* @__PURE__ */ Zb(bh), eS = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * bh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Sh = (n) => 1 - Math.sin(Math.acos(n)), tS = Ib(Sh), nS = Zb(Sh), GM = /* @__PURE__ */ cs(0.42, 0, 1, 1), FM = /* @__PURE__ */ cs(0, 0, 0.58, 1), aS = /* @__PURE__ */ cs(0.42, 0, 0.58, 1), XM = (n) => Array.isArray(n) && typeof n[0] != "number", iS = (n) => Array.isArray(n) && typeof n[0] == "number", gv = {
  linear: Sn,
  easeIn: GM,
  easeInOut: aS,
  easeOut: FM,
  circIn: Sh,
  circInOut: nS,
  circOut: tS,
  backIn: bh,
  backInOut: Wb,
  backOut: Jb,
  anticipate: eS
}, $M = (n) => typeof n == "string", vv = (n) => {
  if (iS(n)) {
    Ni(n.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, l, s, o] = n;
    return cs(a, l, s, o);
  } else if ($M(n))
    return Ni(gv[n] !== void 0, `Invalid easing type '${n}'`, "invalid-easing-type"), gv[n];
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
function KM(n, a) {
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
    schedule: (y, v = !1, S = !1) => {
      const R = S && o ? l : s;
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
      const v = l;
      l = s, s = v, l.forEach(p), l.clear(), o = !1, c && (c = !1, m.process(y));
    }
  };
  return m;
}
const QM = 40;
function lS(n, a) {
  let l = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, d = Lo.reduce((L, V) => (L[V] = KM(c), L), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: y, update: v, preRender: S, render: T, postRender: R } = d, C = () => {
    const L = Ja.useManualTiming, V = L ? o.timestamp : performance.now();
    l = !1, L || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(V - o.timestamp, QM), 1)), o.timestamp = V, o.isProcessing = !0, h.process(o), p.process(o), m.process(o), y.process(o), v.process(o), S.process(o), T.process(o), R.process(o), o.isProcessing = !1, l && a && (s = !1, n(C));
  }, D = () => {
    l = !0, s = !0, o.isProcessing || n(C);
  };
  return { schedule: Lo.reduce((L, V) => {
    const K = d[V];
    return L[V] = (ee, J = !1, j = !1) => (l || D(), K.schedule(ee, J, j)), L;
  }, {}), cancel: (L) => {
    for (let V = 0; V < Lo.length; V++)
      d[Lo[V]].cancel(L);
  }, state: o, steps: d };
}
const { schedule: Je, cancel: Wa, state: zt, steps: Jf } = /* @__PURE__ */ lS(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Sn, !0);
let Xo;
function ZM() {
  Xo = void 0;
}
const kt = {
  now: () => (Xo === void 0 && kt.set(zt.isProcessing || Ja.useManualTiming ? zt.timestamp : performance.now()), Xo),
  set: (n) => {
    Xo = n, queueMicrotask(ZM);
  }
}, rS = (n) => (a) => typeof a == "string" && a.startsWith(n), sS = /* @__PURE__ */ rS("--"), IM = /* @__PURE__ */ rS("var(--"), xh = (n) => IM(n) ? JM.test(n.split("/*")[0].trim()) : !1, JM = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function bv(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Ol = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, Wr = {
  ...Ol,
  transform: (n) => Fn(0, 1, n)
}, Uo = {
  ...Ol,
  default: 1
}, Fr = (n) => Math.round(n * 1e5) / 1e5, Eh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function WM(n) {
  return n == null;
}
const ew = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Th = (n, a) => (l) => !!(typeof l == "string" && ew.test(l) && l.startsWith(n) || a && !WM(l) && Object.prototype.hasOwnProperty.call(l, a)), oS = (n, a, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, c, d, h] = s.match(Eh);
  return {
    [n]: parseFloat(o),
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, tw = (n) => Fn(0, 255, n), Wf = {
  ...Ol,
  transform: (n) => Math.round(tw(n))
}, wi = {
  test: /* @__PURE__ */ Th("rgb", "red"),
  parse: /* @__PURE__ */ oS("red", "green", "blue"),
  transform: ({ red: n, green: a, blue: l, alpha: s = 1 }) => "rgba(" + Wf.transform(n) + ", " + Wf.transform(a) + ", " + Wf.transform(l) + ", " + Fr(Wr.transform(s)) + ")"
};
function nw(n) {
  let a = "", l = "", s = "", o = "";
  return n.length > 5 ? (a = n.substring(1, 3), l = n.substring(3, 5), s = n.substring(5, 7), o = n.substring(7, 9)) : (a = n.substring(1, 2), l = n.substring(2, 3), s = n.substring(3, 4), o = n.substring(4, 5), a += a, l += l, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const wd = {
  test: /* @__PURE__ */ Th("#"),
  parse: nw,
  transform: wi.transform
}, fs = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (a) => typeof a == "string" && a.endsWith(n) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${n}`
}), Fa = /* @__PURE__ */ fs("deg"), Yn = /* @__PURE__ */ fs("%"), ge = /* @__PURE__ */ fs("px"), aw = /* @__PURE__ */ fs("vh"), iw = /* @__PURE__ */ fs("vw"), Sv = {
  ...Yn,
  parse: (n) => Yn.parse(n) / 100,
  transform: (n) => Yn.transform(n * 100)
}, Cl = {
  test: /* @__PURE__ */ Th("hsl", "hue"),
  parse: /* @__PURE__ */ oS("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: a, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(n) + ", " + Yn.transform(Fr(a)) + ", " + Yn.transform(Fr(l)) + ", " + Fr(Wr.transform(s)) + ")"
}, xt = {
  test: (n) => wi.test(n) || wd.test(n) || Cl.test(n),
  parse: (n) => wi.test(n) ? wi.parse(n) : Cl.test(n) ? Cl.parse(n) : wd.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? wi.transform(n) : Cl.transform(n),
  getAnimatableNone: (n) => {
    const a = xt.parse(n);
    return a.alpha = 0, xt.transform(a);
  }
}, lw = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function rw(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Eh)?.length || 0) + (n.match(lw)?.length || 0) > 0;
}
const uS = "number", cS = "color", sw = "var", ow = "var(", xv = "${}", uw = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Dl(n) {
  const a = n.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const h = a.replace(uw, (p) => (xt.test(p) ? (s.color.push(c), o.push(cS), l.push(xt.parse(p))) : p.startsWith(ow) ? (s.var.push(c), o.push(sw), l.push(p)) : (s.number.push(c), o.push(uS), l.push(parseFloat(p))), ++c, xv)).split(xv);
  return { values: l, split: h, indexes: s, types: o };
}
function cw(n) {
  return Dl(n).values;
}
function fS({ split: n, types: a }) {
  const l = n.length;
  return (s) => {
    let o = "";
    for (let c = 0; c < l; c++)
      if (o += n[c], s[c] !== void 0) {
        const d = a[c];
        d === uS ? o += Fr(s[c]) : d === cS ? o += xt.transform(s[c]) : o += s[c];
      }
    return o;
  };
}
function fw(n) {
  return fS(Dl(n));
}
const dw = (n) => typeof n == "number" ? 0 : xt.test(n) ? xt.getAnimatableNone(n) : n, hw = (n, a) => typeof n == "number" ? a?.trim().endsWith("/") ? n : 0 : dw(n);
function mw(n) {
  const a = Dl(n);
  return fS(a)(a.values.map((s, o) => hw(s, a.split[o])));
}
const Nn = {
  test: rw,
  parse: cw,
  createTransformer: fw,
  getAnimatableNone: mw
};
function ed(n, a, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? n + (a - n) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? n + (a - n) * (2 / 3 - l) * 6 : n;
}
function pw({ hue: n, saturation: a, lightness: l, alpha: s }) {
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
const at = (n, a, l) => n + (a - n) * l, td = (n, a, l) => {
  const s = n * n, o = l * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, yw = [wd, wi, Cl], gw = (n) => yw.find((a) => a.test(n));
function Ev(n) {
  const a = gw(n);
  if (os(!!a, `'${n}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let l = a.parse(n);
  return a === Cl && (l = pw(l)), l;
}
const Tv = (n, a) => {
  const l = Ev(n), s = Ev(a);
  if (!l || !s)
    return ru(n, a);
  const o = { ...l };
  return (c) => (o.red = td(l.red, s.red, c), o.green = td(l.green, s.green, c), o.blue = td(l.blue, s.blue, c), o.alpha = at(l.alpha, s.alpha, c), wi.transform(o));
}, Ad = /* @__PURE__ */ new Set(["none", "hidden"]);
function vw(n, a) {
  return Ad.has(n) ? (l) => l <= 0 ? n : a : (l) => l >= 1 ? a : n;
}
function bw(n, a) {
  return (l) => at(n, a, l);
}
function Rh(n) {
  return typeof n == "number" ? bw : typeof n == "string" ? xh(n) ? ru : xt.test(n) ? Tv : Ew : Array.isArray(n) ? dS : typeof n == "object" ? xt.test(n) ? Tv : Sw : ru;
}
function dS(n, a) {
  const l = [...n], s = l.length, o = n.map((c, d) => Rh(c)(c, a[d]));
  return (c) => {
    for (let d = 0; d < s; d++)
      l[d] = o[d](c);
    return l;
  };
}
function Sw(n, a) {
  const l = { ...n, ...a }, s = {};
  for (const o in l)
    n[o] !== void 0 && a[o] !== void 0 && (s[o] = Rh(n[o])(n[o], a[o]));
  return (o) => {
    for (const c in s)
      l[c] = s[c](o);
    return l;
  };
}
function xw(n, a) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const c = a.types[o], d = n.indexes[c][s[c]], h = n.values[d] ?? 0;
    l[o] = h, s[c]++;
  }
  return l;
}
const Ew = (n, a) => {
  const l = Nn.createTransformer(a), s = Dl(n), o = Dl(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? Ad.has(n) && !o.values.length || Ad.has(a) && !s.values.length ? vw(n, a) : us(dS(xw(s, o), o.values), l) : (os(!0, `Complex values '${n}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ru(n, a));
};
function hS(n, a, l) {
  return typeof n == "number" && typeof a == "number" && typeof l == "number" ? at(n, a, l) : Rh(n)(n, a);
}
const Tw = (n) => {
  const a = ({ timestamp: l }) => n(l);
  return {
    start: (l = !0) => Je.update(a, l),
    stop: () => Wa(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => zt.isProcessing ? zt.timestamp : kt.now()
  };
}, mS = (n, a, l = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / l), 2);
  for (let c = 0; c < o; c++)
    s += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, su = 2e4;
function Ch(n) {
  let a = 0;
  const l = 50;
  let s = n.next(a);
  for (; !s.done && a < su; )
    a += l, s = n.next(a);
  return a >= su ? 1 / 0 : a;
}
function Rw(n, a = 100, l) {
  const s = l({ ...n, keyframes: [0, a] }), o = Math.min(Ch(s), su);
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
function jd(n, a) {
  return n * Math.sqrt(1 - a * a);
}
const Cw = 12;
function Mw(n, a, l) {
  let s = l;
  for (let o = 1; o < Cw; o++)
    s = s - n(s) / a(s);
  return s;
}
const nd = 1e-3;
function ww({ duration: n = st.duration, bounce: a = st.bounce, velocity: l = st.velocity, mass: s = st.mass }) {
  let o, c;
  os(n <= /* @__PURE__ */ It(st.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let d = 1 - a;
  d = Fn(st.minDamping, st.maxDamping, d), n = Fn(st.minDuration, st.maxDuration, /* @__PURE__ */ vn(n)), d < 1 ? (o = (m) => {
    const y = m * d, v = y * n, S = y - l, T = jd(m, d), R = Math.exp(-v);
    return nd - S / T * R;
  }, c = (m) => {
    const v = m * d * n, S = v * l + l, T = Math.pow(d, 2) * Math.pow(m, 2) * n, R = Math.exp(-v), C = jd(Math.pow(m, 2), d);
    return (-o(m) + nd > 0 ? -1 : 1) * ((S - T) * R) / C;
  }) : (o = (m) => {
    const y = Math.exp(-m * n), v = (m - l) * n + 1;
    return -nd + y * v;
  }, c = (m) => {
    const y = Math.exp(-m * n), v = (l - m) * (n * n);
    return y * v;
  });
  const h = 5 / n, p = Mw(o, c, h);
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
const Aw = ["duration", "bounce"], jw = ["stiffness", "damping", "mass"];
function Rv(n, a) {
  return a.some((l) => n[l] !== void 0);
}
function Dw(n) {
  let a = {
    velocity: st.velocity,
    stiffness: st.stiffness,
    damping: st.damping,
    mass: st.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Rv(n, jw) && Rv(n, Aw))
    if (a.velocity = 0, n.visualDuration) {
      const l = n.visualDuration, s = 2 * Math.PI / (l * 1.2), o = s * s, c = 2 * Fn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: st.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const l = ww({ ...n, velocity: 0 });
      a = {
        ...a,
        ...l,
        mass: st.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function ou(n = st.visualDuration, a = st.bounce) {
  const l = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: a
  } : n;
  let { restSpeed: s, restDelta: o } = l;
  const c = l.keyframes[0], d = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: y, duration: v, velocity: S, isResolvedFromDuration: T } = Dw({
    ...l,
    velocity: -/* @__PURE__ */ vn(l.velocity || 0)
  }), R = S || 0, C = m / (2 * Math.sqrt(p * y)), D = d - c, z = /* @__PURE__ */ vn(Math.sqrt(p / y)), B = Math.abs(D) < 5;
  s || (s = B ? st.restSpeed.granular : st.restSpeed.default), o || (o = B ? st.restDelta.granular : st.restDelta.default);
  let L, V, K, ee, J, j;
  if (C < 1)
    K = jd(z, C), ee = (R + C * z * D) / K, L = (Q) => {
      const ue = Math.exp(-C * z * Q);
      return d - ue * (ee * Math.sin(K * Q) + D * Math.cos(K * Q));
    }, J = C * z * ee + D * K, j = C * z * D - ee * K, V = (Q) => Math.exp(-C * z * Q) * (J * Math.sin(K * Q) + j * Math.cos(K * Q));
  else if (C === 1) {
    L = (ue) => d - Math.exp(-z * ue) * (D + (R + z * D) * ue);
    const Q = R + z * D;
    V = (ue) => Math.exp(-z * ue) * (z * Q * ue - R);
  } else {
    const Q = z * Math.sqrt(C * C - 1);
    L = (oe) => {
      const te = Math.exp(-C * z * oe), O = Math.min(Q * oe, 300);
      return d - te * ((R + C * z * D) * Math.sinh(O) + Q * D * Math.cosh(O)) / Q;
    };
    const ue = (R + C * z * D) / Q, I = C * z * ue - D * Q, F = C * z * D - ue * Q;
    V = (oe) => {
      const te = Math.exp(-C * z * oe), O = Math.min(Q * oe, 300);
      return te * (I * Math.sinh(O) + F * Math.cosh(O));
    };
  }
  const X = {
    calculatedDuration: T && v || null,
    velocity: (Q) => /* @__PURE__ */ It(V(Q)),
    next: (Q) => {
      if (!T && C < 1) {
        const I = Math.exp(-C * z * Q), F = Math.sin(K * Q), oe = Math.cos(K * Q), te = d - I * (ee * F + D * oe), O = /* @__PURE__ */ It(I * (J * F + j * oe));
        return h.done = Math.abs(O) <= s && Math.abs(d - te) <= o, h.value = h.done ? d : te, h;
      }
      const ue = L(Q);
      if (T)
        h.done = Q >= v;
      else {
        const I = /* @__PURE__ */ It(V(Q));
        h.done = Math.abs(I) <= s && Math.abs(d - ue) <= o;
      }
      return h.value = h.done ? d : ue, h;
    },
    toString: () => {
      const Q = Math.min(Ch(X), su), ue = mS((I) => X.next(Q * I).value, Q, 30);
      return Q + "ms " + ue;
    },
    toTransition: () => {
    }
  };
  return X;
}
ou.applyToOptions = (n) => {
  const a = Rw(n, 100, ou);
  return n.ease = a.ease, n.duration = /* @__PURE__ */ It(a.duration), n.type = "keyframes", n;
};
const Nw = 5;
function pS(n, a, l) {
  const s = Math.max(a - Nw, 0);
  return Kb(l - n(s), a - s);
}
function Dd({ keyframes: n, velocity: a = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: d, min: h, max: p, restDelta: m = 0.5, restSpeed: y }) {
  const v = n[0], S = {
    done: !1,
    value: v
  }, T = (j) => h !== void 0 && j < h || p !== void 0 && j > p, R = (j) => h === void 0 ? p : p === void 0 || Math.abs(h - j) < Math.abs(p - j) ? h : p;
  let C = l * a;
  const D = v + C, z = d === void 0 ? D : d(D);
  z !== D && (C = z - v);
  const B = (j) => -C * Math.exp(-j / s), L = (j) => z + B(j), V = (j) => {
    const X = B(j), Q = L(j);
    S.done = Math.abs(X) <= m, S.value = S.done ? z : Q;
  };
  let K, ee;
  const J = (j) => {
    T(S.value) && (K = j, ee = ou({
      keyframes: [S.value, R(S.value)],
      velocity: pS(L, j, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: m,
      restSpeed: y
    }));
  };
  return J(0), {
    calculatedDuration: null,
    next: (j) => {
      let X = !1;
      return !ee && K === void 0 && (X = !0, V(j), J(j)), K !== void 0 && j >= K ? ee.next(j - K) : (!X && V(j), S);
    }
  };
}
function zw(n, a, l) {
  const s = [], o = l || Ja.mix || hS, c = n.length - 1;
  for (let d = 0; d < c; d++) {
    let h = o(n[d], n[d + 1]);
    if (a) {
      const p = Array.isArray(a) ? a[d] || Sn : a;
      h = us(p, h);
    }
    s.push(h);
  }
  return s;
}
function Ow(n, a, { clamp: l = !0, ease: s, mixer: o } = {}) {
  const c = n.length;
  if (Ni(c === a.length, "Both input and output ranges must be the same length", "range-length"), c === 1)
    return () => a[0];
  if (c === 2 && a[0] === a[1])
    return () => a[1];
  const d = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), a = [...a].reverse());
  const h = zw(a, s, o), p = h.length, m = (y) => {
    if (d && y < n[0])
      return a[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(y < n[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ Jr(n[v], n[v + 1], y);
    return h[v](S);
  };
  return l ? (y) => m(Fn(n[0], n[c - 1], y)) : m;
}
function _w(n, a) {
  const l = n[n.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ Jr(0, a, s);
    n.push(at(l, 1, o));
  }
}
function Lw(n) {
  const a = [0];
  return _w(a, n.length - 1), a;
}
function Uw(n, a) {
  return n.map((l) => l * a);
}
function Vw(n, a) {
  return n.map(() => a || aS).splice(0, n.length - 1);
}
function Xr({ duration: n = 300, keyframes: a, times: l, ease: s = "easeInOut" }) {
  const o = XM(s) ? s.map(vv) : vv(s), c = {
    done: !1,
    value: a[0]
  }, d = Uw(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === a.length ? l : Lw(a),
    n
  ), h = Ow(d, a, {
    ease: Array.isArray(o) ? o : Vw(a, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = h(p), c.done = p >= n, c)
  };
}
const Bw = (n) => n !== null;
function Eu(n, { repeat: a, repeatType: l = "loop" }, s, o = 1) {
  const c = n.filter(Bw), h = o < 0 || a && l !== "loop" && a % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const Hw = {
  decay: Dd,
  inertia: Dd,
  tween: Xr,
  keyframes: Xr,
  spring: ou
};
function yS(n) {
  typeof n.type == "string" && (n.type = Hw[n.type]);
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
const qw = (n) => n / 100;
class uu extends Mh {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== kt.now() && this.tick(kt.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    yS(a);
    const { type: l = Xr, repeat: s = 0, repeatDelay: o = 0, repeatType: c, velocity: d = 0 } = a;
    let { keyframes: h } = a;
    const p = l || Xr;
    p !== Xr && typeof h[0] != "number" && (this.mixKeyframes = us(qw, hS(h[0], h[1])), h = [0, 100]);
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
    const { delay: m = 0, keyframes: y, repeat: v, repeatType: S, repeatDelay: T, type: R, onUpdate: C, finalKeyframe: D } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), l ? this.currentTime = a : this.updateTime(a);
    const z = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), B = this.playbackSpeed >= 0 ? z < 0 : z > o;
    this.currentTime = Math.max(z, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let L = this.currentTime, V = s;
    if (v) {
      const j = Math.min(this.currentTime, o) / h;
      let X = Math.floor(j), Q = j % 1;
      !Q && j >= 1 && (Q = 1), Q === 1 && X--, X = Math.min(X, v + 1), !!(X % 2) && (S === "reverse" ? (Q = 1 - Q, T && (Q -= T / h)) : S === "mirror" && (V = d)), L = Fn(0, 1, Q) * h;
    }
    let K;
    B ? (this.delayState.value = y[0], K = this.delayState) : K = V.next(L), c && !B && (K.value = c(K.value));
    let { done: ee } = K;
    !B && p !== null && (ee = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const J = this.holdTime === null && (this.state === "finished" || this.state === "running" && ee);
    return J && R !== Dd && (K.value = Eu(y, this.options, D, this.speed)), C && C(K.value), J && this.finish(), K;
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
    const l = this.generator.next(a).value;
    return pS((s) => this.generator.next(s).value, a, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const l = this.playbackSpeed !== a;
    l && this.driver && this.updateTime(kt.now()), this.playbackSpeed = a, l && this.driver && (this.time = /* @__PURE__ */ vn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = Tw, startTime: l } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
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
function kw(n) {
  for (let a = 1; a < n.length; a++)
    n[a] ?? (n[a] = n[a - 1]);
}
const Ai = (n) => n * 180 / Math.PI, Nd = (n) => {
  const a = Ai(Math.atan2(n[1], n[0]));
  return zd(a);
}, Pw = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Nd,
  rotateZ: Nd,
  skewX: (n) => Ai(Math.atan(n[1])),
  skewY: (n) => Ai(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, zd = (n) => (n = n % 360, n < 0 && (n += 360), n), Cv = Nd, Mv = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), wv = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), Yw = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Mv,
  scaleY: wv,
  scale: (n) => (Mv(n) + wv(n)) / 2,
  rotateX: (n) => zd(Ai(Math.atan2(n[6], n[5]))),
  rotateY: (n) => zd(Ai(Math.atan2(-n[2], n[0]))),
  rotateZ: Cv,
  rotate: Cv,
  skewX: (n) => Ai(Math.atan(n[4])),
  skewY: (n) => Ai(Math.atan(n[1])),
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
    s = Yw, o = l;
  else {
    const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Pw, o = h;
  }
  if (!o)
    return Od(a);
  const c = s[a], d = o[1].split(",").map(Fw);
  return typeof c == "function" ? c(d) : d[c];
}
const Gw = (n, a) => {
  const { transform: l = "none" } = getComputedStyle(n);
  return _d(l, a);
};
function Fw(n) {
  return parseFloat(n.trim());
}
const _l = [
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
], Ll = new Set(_l), Av = (n) => n === Ol || n === ge, Xw = /* @__PURE__ */ new Set(["x", "y", "z"]), $w = _l.filter((n) => !Xw.has(n));
function Kw(n) {
  const a = [];
  return $w.forEach((l) => {
    const s = n.getValue(l);
    s !== void 0 && (a.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), a;
}
const Za = {
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
Za.translateX = Za.x;
Za.translateY = Za.y;
const ji = /* @__PURE__ */ new Set();
let Ld = !1, Ud = !1, Vd = !1;
function gS() {
  if (Ud) {
    const n = Array.from(ji).filter((s) => s.needsMeasurement), a = new Set(n.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = Kw(s);
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
  Ud = !1, Ld = !1, ji.forEach((n) => n.complete(Vd)), ji.clear();
}
function vS() {
  ji.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Ud = !0);
  });
}
function Qw() {
  Vd = !0, vS(), gS(), Vd = !1;
}
class wh {
  constructor(a, l, s, o, c, d = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = l, this.name = s, this.motionValue = o, this.element = c, this.isAsync = d;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ji.add(this), Ld || (Ld = !0, Je.read(vS), Je.resolveKeyframes(gS))) : (this.readKeyframes(), this.complete());
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
    kw(a);
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
const Zw = (n) => n.startsWith("--");
function bS(n, a, l) {
  Zw(a) ? n.style.setProperty(a, l) : n.style[a] = l;
}
const Iw = {};
function SS(n, a) {
  const l = /* @__PURE__ */ $b(n);
  return () => Iw[a] ?? l();
}
const Jw = /* @__PURE__ */ SS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), xS = /* @__PURE__ */ SS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Yr = ([n, a, l, s]) => `cubic-bezier(${n}, ${a}, ${l}, ${s})`, jv = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Yr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Yr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Yr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Yr([0.33, 1.53, 0.69, 0.99])
};
function ES(n, a) {
  if (n)
    return typeof n == "function" ? xS() ? mS(n, a) : "ease-out" : iS(n) ? Yr(n) : Array.isArray(n) ? n.map((l) => ES(l, a) || jv.easeOut) : jv[n];
}
function Ww(n, a, l, { delay: s = 0, duration: o = 300, repeat: c = 0, repeatType: d = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const y = {
    [a]: l
  };
  p && (y.offset = p);
  const v = ES(h, o);
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
function TS(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function eA({ type: n, ...a }) {
  return TS(n) && xS() ? n.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class RS extends Mh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: l, name: s, keyframes: o, pseudoElement: c, allowFlatten: d = !1, finalKeyframe: h, onComplete: p } = a;
    this.isPseudoElement = !!c, this.allowFlatten = d, this.options = a, Ni(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = eA(a);
    this.animation = Ww(l, s, o, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const y = Eu(o, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), bS(l, s, y), this.animation.cancel();
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
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ It(a), l && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && Jw() ? (this.animation.timeline = a, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), Sn) : o(this);
  }
}
const CS = {
  anticipate: eS,
  backInOut: Wb,
  circInOut: nS
};
function tA(n) {
  return n in CS;
}
function nA(n) {
  typeof n.ease == "string" && tA(n.ease) && (n.ease = CS[n.ease]);
}
const ad = 10;
class aA extends RS {
  constructor(a) {
    nA(a), yS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    }), p = Math.max(ad, kt.now() - this.startTime), m = Fn(0, ad, p - ad), y = h.sample(p).value, { name: v } = this.options;
    c && v && bS(c, v, y), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, y, m), h.stop();
  }
}
const Dv = (n, a) => a === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Nn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function iA(n) {
  const a = n[0];
  if (n.length === 1)
    return !0;
  for (let l = 0; l < n.length; l++)
    if (n[l] !== a)
      return !0;
}
function lA(n, a, l, s) {
  const o = n[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const c = n[n.length - 1], d = Dv(o, a), h = Dv(c, a);
  return os(d === h, `You are trying to animate ${a} from "${o}" to "${c}". "${d ? c : o}" is not an animatable value.`, "value-not-animatable"), !d || !h ? !1 : iA(n) || (l === "spring" || TS(l)) && s;
}
function Bd(n) {
  n.duration = 0, n.type = "keyframes";
}
const MS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), rA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function sA(n) {
  for (let a = 0; a < n.length; a++)
    if (typeof n[a] == "string" && rA.test(n[a]))
      return !0;
  return !1;
}
const oA = /* @__PURE__ */ new Set([
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
]), uA = /* @__PURE__ */ $b(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function cA(n) {
  const { motionValue: a, name: l, repeatDelay: s, repeatType: o, damping: c, type: d, keyframes: h } = n;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = a.owner.getProps();
  return uA() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (MS.has(l) || oA.has(l) && sA(h)) && (l !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && c !== 0 && d !== "inertia";
}
const fA = 40;
class dA extends Mh {
  constructor({ autoplay: a = !0, delay: l = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: d = "loop", keyframes: h, name: p, motionValue: m, element: y, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = kt.now();
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
      ...v
    }, T = y?.KeyframeResolver || wh;
    this.keyframeResolver = new T(h, (R, C, D) => this.onKeyframesResolved(R, C, S, !D), p, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, l, s, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: d, velocity: h, delay: p, isHandoff: m, onUpdate: y } = s;
    this.resolvedAt = kt.now();
    let v = !0;
    lA(a, c, d, h) || (v = !1, (Ja.instantAnimations || !p) && y?.(Eu(a, s, l)), a[0] = a[a.length - 1], Bd(s), s.repeat = 0);
    const T = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > fA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: a
    }, R = v && !m && cA(T), C = T.motionValue?.owner?.current;
    let D;
    if (R)
      try {
        D = new aA({
          ...T,
          element: C
        });
      } catch {
        D = new uu(T);
      }
    else
      D = new uu(T);
    D.finished.then(() => {
      this.notifyFinished();
    }).catch(Sn), this.pendingTimeline && (this.stopTimeline = D.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = D;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, l) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Qw()), this._animation;
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
function wS(n, a, l, s = 0, o = 1) {
  const c = Array.from(n).sort((m, y) => m.sortNodePosition(y)).indexOf(a), d = n.size, h = (d - 1) * s;
  return typeof l == "function" ? l(c, d) : o === 1 ? c * s : h - c * s;
}
const hA = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function mA(n) {
  const a = hA.exec(n);
  if (!a)
    return [,];
  const [, l, s, o] = a;
  return [`--${l ?? s}`, o];
}
const pA = 4;
function AS(n, a, l = 1) {
  Ni(l <= pA, `Max CSS variable fallback depth detected in property "${n}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = mA(n);
  if (!s)
    return;
  const c = window.getComputedStyle(a).getPropertyValue(s);
  if (c) {
    const d = c.trim();
    return Gb(d) ? parseFloat(d) : d;
  }
  return xh(o) ? AS(o, a, l + 1) : o;
}
const yA = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, gA = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), vA = {
  type: "keyframes",
  duration: 0.8
}, bA = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, SA = (n, { keyframes: a }) => a.length > 2 ? vA : Ll.has(n) ? n.startsWith("scale") ? gA(a[1]) : yA : bA;
function jS(n, a) {
  if (n?.inherit && a) {
    const { inherit: l, ...s } = n;
    return { ...a, ...s };
  }
  return n;
}
function Ah(n, a) {
  const l = n?.[a] ?? n?.default ?? n;
  return l !== n ? jS(l, n) : l;
}
const xA = /* @__PURE__ */ new Set([
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
function EA(n) {
  for (const a in n)
    if (!xA.has(a))
      return !0;
  return !1;
}
const jh = (n, a, l, s = {}, o, c) => (d) => {
  const h = Ah(s, n) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ It(p);
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
  EA(h) || Object.assign(y, SA(n, y)), y.duration && (y.duration = /* @__PURE__ */ It(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ It(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let v = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Bd(y), y.delay === 0 && (v = !0)), (Ja.instantAnimations || Ja.skipAnimations || o?.shouldSkipAnimations) && (v = !0, Bd(y), y.delay = 0), y.allowFlatten = !h.type && !h.ease, v && !c && a.get() !== void 0) {
    const S = Eu(y.keyframes, h);
    if (S !== void 0) {
      Je.update(() => {
        y.onUpdate(S), y.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new uu(y) : new dA(y);
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
function Di(n, a, l) {
  const s = n.getProps();
  return Dh(s, a, l !== void 0 ? l : s.custom, n);
}
const DS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ..._l
]), zv = 30, TA = (n) => !isNaN(parseFloat(n));
class RA {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = kt.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = l.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = kt.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = TA(this.current));
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
    const a = kt.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > zv)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, zv);
    return Kb(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function Nl(n, a) {
  return new RA(n, a);
}
const Hd = (n) => Array.isArray(n);
function CA(n, a, l) {
  n.hasValue(a) ? n.getValue(a).set(l) : n.addValue(a, Nl(l));
}
function MA(n) {
  return Hd(n) ? n[n.length - 1] || 0 : n;
}
function wA(n, a) {
  const l = Di(n, a);
  let { transitionEnd: s = {}, transition: o = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const d in c) {
    const h = MA(c[d]);
    CA(n, d, h);
  }
}
const Ot = (n) => !!(n && n.getVelocity);
function AA(n) {
  return !!(Ot(n) && n.add);
}
function qd(n, a) {
  const l = n.getValue("willChange");
  if (AA(l))
    return l.add(a);
  if (!l && Ja.WillChange) {
    const s = new Ja.WillChange("auto");
    n.addValue("willChange", s), s.add(a);
  }
}
function Nh(n) {
  return n.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const jA = "framerAppearId", NS = "data-" + Nh(jA);
function zS(n) {
  return n.props[NS];
}
function DA({ protectedKeys: n, needsAnimating: a }, l) {
  const s = n.hasOwnProperty(l) && a[l] !== !0;
  return a[l] = !1, s;
}
function OS(n, a, { delay: l = 0, transitionOverride: s, type: o } = {}) {
  let { transition: c, transitionEnd: d, ...h } = a;
  const p = n.getDefaultTransition();
  c = c ? jS(c, p) : p;
  const m = c?.reduceMotion;
  s && (c = s);
  const y = [], v = o && n.animationState && n.animationState.getState()[o];
  for (const S in h) {
    const T = n.getValue(S, n.latestValues[S] ?? null), R = h[S];
    if (R === void 0 || v && DA(v, S))
      continue;
    const C = {
      delay: l,
      ...Ah(c || {}, S)
    }, D = T.get();
    if (D !== void 0 && !T.isAnimating() && !Array.isArray(R) && R === D && !C.velocity) {
      Je.update(() => T.set(R));
      continue;
    }
    let z = !1;
    if (window.MotionHandoffAnimation) {
      const V = zS(n);
      if (V) {
        const K = window.MotionHandoffAnimation(V, S, Je);
        K !== null && (C.startTime = K, z = !0);
      }
    }
    qd(n, S);
    const B = m ?? n.shouldReduceMotion;
    T.start(jh(S, T, R, B && DS.has(S) ? { type: !1 } : C, n, z));
    const L = T.animation;
    L && y.push(L);
  }
  if (d) {
    const S = () => Je.update(() => {
      d && wA(n, d);
    });
    y.length ? Promise.all(y).then(S) : S();
  }
  return y;
}
function kd(n, a, l = {}) {
  const s = Di(n, a, l.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (o = l.transitionOverride);
  const c = s ? () => Promise.all(OS(n, s, l)) : () => Promise.resolve(), d = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: v } = o;
    return NA(n, a, p, m, y, v, l);
  } : () => Promise.resolve(), { when: h } = o;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, d] : [d, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), d(l.delay)]);
}
function NA(n, a, l = 0, s = 0, o = 0, c = 1, d) {
  const h = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", a), h.push(kd(p, a, {
      ...d,
      delay: l + (typeof s == "function" ? 0 : s) + wS(n.variantChildren, p, s, o, c)
    }).then(() => p.notify("AnimationComplete", a)));
  return Promise.all(h);
}
function zA(n, a, l = {}) {
  n.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((c) => kd(n, c, l));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = kd(n, a, l);
  else {
    const o = typeof a == "function" ? Di(n, a, l.custom) : a;
    s = Promise.all(OS(n, o, l));
  }
  return s.then(() => {
    n.notify("AnimationComplete", a);
  });
}
const OA = {
  test: (n) => n === "auto",
  parse: (n) => n
}, _S = (n) => (a) => a.test(n), LS = [Ol, ge, Yn, Fa, iw, aw, OA], Ov = (n) => LS.find(_S(n));
function _A(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Xb(n) : !0;
}
const LA = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function UA(n) {
  const [a, l] = n.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return n;
  const [s] = l.match(Eh) || [];
  if (!s)
    return n;
  const o = l.replace(s, "");
  let c = LA.has(a) ? 1 : 0;
  return s !== l && (c *= 100), a + "(" + c + o + ")";
}
const VA = /\b([a-z-]*)\(.*?\)/gu, Pd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = n.match(VA);
    return a ? a.map(UA).join(" ") : n;
  }
}, Yd = {
  ...Nn,
  getAnimatableNone: (n) => {
    const a = Nn.parse(n);
    return Nn.createTransformer(n)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, _v = {
  ...Ol,
  transform: Math.round
}, BA = {
  rotate: Fa,
  rotateX: Fa,
  rotateY: Fa,
  rotateZ: Fa,
  scale: Uo,
  scaleX: Uo,
  scaleY: Uo,
  scaleZ: Uo,
  skew: Fa,
  skewX: Fa,
  skewY: Fa,
  distance: ge,
  translateX: ge,
  translateY: ge,
  translateZ: ge,
  x: ge,
  y: ge,
  z: ge,
  perspective: ge,
  transformPerspective: ge,
  opacity: Wr,
  originX: Sv,
  originY: Sv,
  originZ: ge
}, zh = {
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
  ...BA,
  zIndex: _v,
  // SVG
  fillOpacity: Wr,
  strokeOpacity: Wr,
  numOctaves: _v
}, HA = {
  ...zh,
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
  filter: Pd,
  WebkitFilter: Pd,
  mask: Yd,
  WebkitMask: Yd
}, US = (n) => HA[n], qA = /* @__PURE__ */ new Set([Pd, Yd]);
function VS(n, a) {
  let l = US(n);
  return qA.has(l) || (l = Nn), l.getAnimatableNone ? l.getAnimatableNone(a) : void 0;
}
const kA = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function PA(n, a, l) {
  let s = 0, o;
  for (; s < n.length && !o; ) {
    const c = n[s];
    typeof c == "string" && !kA.has(c) && Dl(c).values.length && (o = n[s]), s++;
  }
  if (o && l)
    for (const c of a)
      n[c] = VS(l, o);
}
class YA extends wh {
  constructor(a, l, s, o, c) {
    super(a, l, s, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: l, name: s } = this;
    if (!l || !l.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < a.length; y++) {
      let v = a[y];
      if (typeof v == "string" && (v = v.trim(), xh(v))) {
        const S = AS(v, l.current);
        S !== void 0 && (a[y] = S), y === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !DS.has(s) || a.length !== 2)
      return;
    const [o, c] = a, d = Ov(o), h = Ov(c), p = bv(o), m = bv(c);
    if (p !== m && Za[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (d !== h)
      if (Av(d) && Av(h))
        for (let y = 0; y < a.length; y++) {
          const v = a[y];
          typeof v == "string" && (a[y] = parseFloat(v));
        }
      else Za[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: l } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || _A(a[o])) && s.push(o);
    s.length && PA(a, s, l);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: l, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Za[s](a.measureViewportBox(), window.getComputedStyle(a.current)), l[0] = this.measuredOrigin;
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
    s[c] = Za[l](a.measureViewportBox(), window.getComputedStyle(a.current)), d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      a.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
function BS(n, a, l) {
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
const HS = (n, a) => a && typeof n == "number" ? a.transform(n) : n;
function $o(n) {
  return Fb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Oh } = /* @__PURE__ */ lS(queueMicrotask, !1), Dn = {
  x: !1,
  y: !1
};
function qS() {
  return Dn.x || Dn.y;
}
function GA(n) {
  return n === "x" || n === "y" ? Dn[n] ? null : (Dn[n] = !0, () => {
    Dn[n] = !1;
  }) : Dn.x || Dn.y ? null : (Dn.x = Dn.y = !0, () => {
    Dn.x = Dn.y = !1;
  });
}
function kS(n, a) {
  const l = BS(n), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [l, o, () => s.abort()];
}
function FA(n) {
  return !(n.pointerType === "touch" || qS());
}
function XA(n, a, l = {}) {
  const [s, o, c] = kS(n, l);
  return s.forEach((d) => {
    let h = !1, p = !1, m;
    const y = () => {
      d.removeEventListener("pointerleave", R);
    }, v = (D) => {
      m && (m(D), m = void 0), y();
    }, S = (D) => {
      h = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), p && (p = !1, v(D));
    }, T = () => {
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
      if (!FA(D))
        return;
      p = !1;
      const z = a(d, D);
      typeof z == "function" && (m = z, d.addEventListener("pointerleave", R, o));
    };
    d.addEventListener("pointerenter", C, o), d.addEventListener("pointerdown", T, o);
  }), c;
}
const PS = (n, a) => a ? n === a ? !0 : PS(n, a.parentElement) : !1, _h = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, $A = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function KA(n) {
  return $A.has(n.tagName) || n.isContentEditable === !0;
}
const QA = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function ZA(n) {
  return QA.has(n.tagName) || n.isContentEditable === !0;
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
const IA = (n, a) => {
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
  return _h(n) && !qS();
}
const Vv = /* @__PURE__ */ new WeakSet();
function JA(n, a, l = {}) {
  const [s, o, c] = kS(n, l), d = (h) => {
    const p = h.currentTarget;
    if (!Uv(h) || Vv.has(h))
      return;
    Ko.add(p), l.stopPropagation && Vv.add(h);
    const m = a(p, h), y = (T, R) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), Ko.has(p) && Ko.delete(p), Uv(T) && typeof m == "function" && m(T, { success: R });
    }, v = (T) => {
      y(T, p === window || p === document || l.useGlobalTarget || PS(p, T.target));
    }, S = (T) => {
      y(T, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", d, o), $o(h) && (h.addEventListener("focus", (m) => IA(m, o)), !KA(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function Lh(n) {
  return Fb(n) && "ownerSVGElement" in n;
}
const Qo = /* @__PURE__ */ new WeakMap();
let Zo;
const YS = (n, a, l) => (s, o) => o && o[0] ? o[0][n + "Size"] : Lh(s) && "getBBox" in s ? s.getBBox()[a] : s[l], WA = /* @__PURE__ */ YS("inline", "width", "offsetWidth"), ej = /* @__PURE__ */ YS("block", "height", "offsetHeight");
function tj({ target: n, borderBoxSize: a }) {
  Qo.get(n)?.forEach((l) => {
    l(n, {
      get width() {
        return WA(n, a);
      },
      get height() {
        return ej(n, a);
      }
    });
  });
}
function nj(n) {
  n.forEach(tj);
}
function aj() {
  typeof ResizeObserver > "u" || (Zo = new ResizeObserver(nj));
}
function ij(n, a) {
  Zo || aj();
  const l = BS(n);
  return l.forEach((s) => {
    let o = Qo.get(s);
    o || (o = /* @__PURE__ */ new Set(), Qo.set(s, o)), o.add(a), Zo?.observe(s);
  }), () => {
    l.forEach((s) => {
      const o = Qo.get(s);
      o?.delete(a), o?.size || Zo?.unobserve(s);
    });
  };
}
const Io = /* @__PURE__ */ new Set();
let Ml;
function lj() {
  Ml = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Io.forEach((a) => a(n));
  }, window.addEventListener("resize", Ml);
}
function rj(n) {
  return Io.add(n), Ml || lj(), () => {
    Io.delete(n), !Io.size && typeof Ml == "function" && (window.removeEventListener("resize", Ml), Ml = void 0);
  };
}
function Bv(n, a) {
  return typeof n == "function" ? rj(n) : ij(n, a);
}
function sj(n) {
  return Lh(n) && n.tagName === "svg";
}
const oj = [...LS, xt, Nn], uj = (n) => oj.find(_S(n)), Hv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), wl = () => ({
  x: Hv(),
  y: Hv()
}), qv = () => ({ min: 0, max: 0 }), Rt = () => ({
  x: qv(),
  y: qv()
}), cj = /* @__PURE__ */ new WeakMap();
function Tu(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function es(n) {
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
  return Tu(n.animate) || Vh.some((a) => es(n[a]));
}
function GS(n) {
  return !!(Ru(n) || n.variants);
}
function fj(n, a, l) {
  for (const s in a) {
    const o = a[s], c = l[s];
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
  for (const s in l)
    a[s] === void 0 && n.removeValue(s);
  return a;
}
const cu = { current: null }, Bh = { current: !1 }, dj = typeof window < "u";
function FS() {
  if (Bh.current = !0, !!dj)
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
function XS(n) {
  fu = n;
}
function hj() {
  return fu;
}
class mj {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = wh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = kt.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Je.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = y, this.parent = a, this.props = l, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!d, this.isControllingVariants = Ru(l), this.isVariantNode = GS(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in S) {
      const R = S[T];
      m[T] !== void 0 && Ot(R) && R.set(m[T]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = a, cj.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Bh.current || FS(), this.shouldReduceMotion = cu.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Wa(this.notifyUpdate), Wa(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), l.accelerate && MS.has(a) && this.current instanceof HTMLElement) {
      const { factory: d, keyframes: h, times: p, ease: m, duration: y } = l.accelerate, v = new RS({
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
    const s = Ll.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = l.on("change", (d) => {
      this.latestValues[a] = d, this.props.onUpdate && Je.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Rt();
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
    this.prevMotionValues = fj(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = Nl(l === null ? void 0 : l, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, l) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (Gb(s) || Xb(s)) ? s = parseFloat(s) : !uj(s) && Nn.test(l) && (s = VS(a, l)), this.setBaseTarget(a, Ot(s) ? s.get() : s)), Ot(s) ? s.get() : s;
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
    return o !== void 0 && !Ot(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
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
class $S extends mj {
  constructor() {
    super(...arguments), this.KeyframeResolver = YA;
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
    Ot(a) && (this.childSubscription = a.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
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
function KS({ top: n, left: a, right: l, bottom: s }) {
  return {
    x: { min: a, max: l },
    y: { min: n, max: s }
  };
}
function pj({ x: n, y: a }) {
  return { top: a.min, right: n.max, bottom: a.max, left: n.min };
}
function yj(n, a) {
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
function Ci(n) {
  return Gd(n) || QS(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function QS(n) {
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
function ZS(n, { x: a, y: l }) {
  Fd(n.x, a.translate, a.scale, a.originPoint), Fd(n.y, l.translate, l.scale, l.originPoint);
}
const Gv = 0.999999999999, Fv = 1.0000000000001;
function gj(n, a, l, s = !1) {
  const o = l.length;
  if (!o)
    return;
  a.x = a.y = 1;
  let c, d;
  for (let h = 0; h < o; h++) {
    c = l[h], d = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (kn(n.x, -c.scroll.offset.x), kn(n.y, -c.scroll.offset.y)), d && (a.x *= d.x.scale, a.y *= d.y.scale, ZS(n, d)), s && Ci(c.latestValues) && Jo(n, c.latestValues, c.layout?.layoutBox));
  }
  a.x < Fv && a.x > Gv && (a.x = 1), a.y < Fv && a.y > Gv && (a.y = 1);
}
function kn(n, a) {
  n.min += a, n.max += a;
}
function Xv(n, a, l, s, o = 0.5) {
  const c = at(n.min, n.max, o);
  Fd(n, a, l, c, s);
}
function $v(n, a) {
  return typeof n == "string" ? parseFloat(n) / 100 * (a.max - a.min) : n;
}
function Jo(n, a, l) {
  const s = l ?? n;
  Xv(n.x, $v(a.x, s.x), a.scaleX, a.scale, a.originX), Xv(n.y, $v(a.y, s.y), a.scaleY, a.scale, a.originY);
}
function IS(n, a) {
  return KS(yj(n.getBoundingClientRect(), a));
}
function vj(n, a, l) {
  const s = IS(n, l), { scroll: o } = a;
  return o && (kn(s.x, o.offset.x), kn(s.y, o.offset.y)), s;
}
const bj = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Sj = _l.length;
function xj(n, a, l) {
  let s = "", o = !0;
  for (let c = 0; c < Sj; c++) {
    const d = _l[c], h = n[d];
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
      const m = HS(h, zh[d]);
      if (!p) {
        o = !1;
        const y = bj[d] || d;
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
    if (Ll.has(p)) {
      d = !0;
      continue;
    } else if (sS(p)) {
      o[p] = m;
      continue;
    } else {
      const y = HS(m, zh[p]);
      p.startsWith("origin") ? (h = !0, c[p] = y) : s[p] = y;
    }
  }
  if (a.transform || (d || l ? s.transform = xj(a, n.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: y = 0 } = c;
    s.transformOrigin = `${p} ${m} ${y}`;
  }
}
function JS(n, { style: a, vars: l }, s, o) {
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
const Br = {
  correct: (n, a) => {
    if (!a.target)
      return n;
    if (typeof n == "string")
      if (ge.test(n))
        n = parseFloat(n);
      else
        return n;
    const l = Kv(n, a.target.x), s = Kv(n, a.target.y);
    return `${l}% ${s}%`;
  }
}, Ej = {
  correct: (n, { treeScale: a, projectionDelta: l }) => {
    const s = n, o = Nn.parse(n);
    if (o.length > 5)
      return s;
    const c = Nn.createTransformer(n), d = typeof o[0] != "number" ? 1 : 0, h = l.x.scale * a.x, p = l.y.scale * a.y;
    o[0 + d] /= h, o[1 + d] /= p;
    const m = at(h, p, 0.5);
    return typeof o[2 + d] == "number" && (o[2 + d] /= m), typeof o[3 + d] == "number" && (o[3 + d] /= m), c(o);
  }
}, Xd = {
  borderRadius: {
    ...Br,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Br,
  borderTopRightRadius: Br,
  borderBottomLeftRadius: Br,
  borderBottomRightRadius: Br,
  boxShadow: Ej
};
function WS(n, { layout: a, layoutId: l }) {
  return Ll.has(n) || n.startsWith("origin") || (a || l !== void 0) && (!!Xd[n] || n === "opacity");
}
function qh(n, a, l) {
  const s = n.style, o = a?.style, c = {};
  if (!s)
    return c;
  for (const d in s)
    (Ot(s[d]) || o && Ot(o[d]) || WS(d, n) || l?.getValue(d)?.liveStyle !== void 0) && (c[d] = s[d]);
  return c;
}
function Tj(n) {
  return window.getComputedStyle(n);
}
class Rj extends $S {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = JS;
  }
  readValueFromInstance(a, l) {
    if (Ll.has(l))
      return this.projection?.isProjecting ? Od(l) : Gw(a, l);
    {
      const s = Tj(a), o = (sS(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: l }) {
    return IS(a, l);
  }
  build(a, l, s) {
    Hh(a, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return qh(a, l, s);
  }
}
const Cj = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Mj = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function wj(n, a, l = 1, s = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? Cj : Mj;
  n[c.offset] = `${-s}`, n[c.array] = `${a} ${l}`;
}
const Aj = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function ex(n, {
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
  const { attrs: v, style: S } = n;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = y?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of Aj)
    v[T] !== void 0 && (S[T] = v[T], delete v[T]);
  a !== void 0 && (v.x = a), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), o !== void 0 && wj(v, o, c, d, !1);
}
const tx = /* @__PURE__ */ new Set([
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
]), nx = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function jj(n, a, l, s) {
  JS(n, a, void 0, s);
  for (const o in a.attrs)
    n.setAttribute(tx.has(o) ? o : Nh(o), a.attrs[o]);
}
function ax(n, a, l) {
  const s = qh(n, a, l);
  for (const o in n)
    if (Ot(n[o]) || Ot(a[o])) {
      const c = _l.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[c] = n[o];
    }
  return s;
}
class Dj extends $S {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Rt;
  }
  getBaseTargetFromProps(a, l) {
    return a[l];
  }
  readValueFromInstance(a, l) {
    if (Ll.has(l)) {
      const s = US(l);
      return s && s.default || 0;
    }
    return l = tx.has(l) ? l : Nh(l), a.getAttribute(l);
  }
  scrapeMotionValuesFromProps(a, l, s) {
    return ax(a, l, s);
  }
  build(a, l, s) {
    ex(a, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, l, s, o) {
    jj(a, l, s, o);
  }
  mount(a) {
    this.isSVGTag = nx(a.tagName), super.mount(a);
  }
}
const Nj = Vh.length;
function ix(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const l = n.parent ? ix(n.parent) || {} : {};
    return n.props.initial !== void 0 && (l.initial = n.props.initial), l;
  }
  const a = {};
  for (let l = 0; l < Nj; l++) {
    const s = Vh[l], o = n.props[s];
    (es(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function lx(n, a) {
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
const zj = [...Uh].reverse(), Oj = Uh.length;
function _j(n) {
  return (a) => Promise.all(a.map(({ animation: l, options: s }) => zA(n, l, s)));
}
function Lj(n) {
  let a = _j(n), l = Qv(), s = !0, o = !1;
  const c = (m) => (y, v) => {
    const S = Di(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (S) {
      const { transition: T, transitionEnd: R, ...C } = S;
      y = { ...y, ...C, ...R };
    }
    return y;
  };
  function d(m) {
    a = m(n);
  }
  function h(m) {
    const { props: y } = n, v = ix(n.parent) || {}, S = [], T = /* @__PURE__ */ new Set();
    let R = {}, C = 1 / 0;
    for (let z = 0; z < Oj; z++) {
      const B = zj[z], L = l[B], V = y[B] !== void 0 ? y[B] : v[B], K = es(V), ee = B === m ? L.isActive : null;
      ee === !1 && (C = z);
      let J = V === v[B] && V !== y[B] && K;
      if (J && (s || o) && n.manuallyAnimateOnMount && (J = !1), L.protectedKeys = { ...R }, // If it isn't active and hasn't *just* been set as inactive
      !L.isActive && ee === null || // If we didn't and don't have any defined prop for this animation type
      !V && !L.prevProp || // Or if the prop doesn't define an animation
      Tu(V) || typeof V == "boolean")
        continue;
      if (B === "exit" && L.isActive && ee !== !0) {
        L.prevResolvedValues && (R = {
          ...R,
          ...L.prevResolvedValues
        });
        continue;
      }
      const j = Uj(L.prevProp, V);
      let X = j || // If we're making this variant active, we want to always make it active
      B === m && L.isActive && !J && K || // If we removed a higher-priority variant (i is in reverse order)
      z > C && K, Q = !1;
      const ue = Array.isArray(V) ? V : [V];
      let I = ue.reduce(c(B), {});
      ee === !1 && (I = {});
      const { prevResolvedValues: F = {} } = L, oe = {
        ...F,
        ...I
      }, te = (se) => {
        X = !0, T.has(se) && (Q = !0, T.delete(se)), L.needsAnimating[se] = !0;
        const ce = n.getValue(se);
        ce && (ce.liveStyle = !1);
      };
      for (const se in oe) {
        const ce = I[se], le = F[se];
        if (R.hasOwnProperty(se))
          continue;
        let M = !1;
        Hd(ce) && Hd(le) ? M = !lx(ce, le) : M = ce !== le, M ? ce != null ? te(se) : T.add(se) : ce !== void 0 && T.has(se) ? te(se) : L.protectedKeys[se] = !0;
      }
      L.prevProp = V, L.prevResolvedValues = I, L.isActive && (R = { ...R, ...I }), (s || o) && n.blockInitialAnimation && (X = !1);
      const O = J && j;
      X && (!O || Q) && S.push(...ue.map((se) => {
        const ce = { type: B };
        if (typeof se == "string" && (s || o) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: le } = n, M = Di(le, se);
          if (le.enteringChildren && M) {
            const { delayChildren: G } = M.transition || {};
            ce.delay = wS(le.enteringChildren, n, G);
          }
        }
        return {
          animation: se,
          options: ce
        };
      }));
    }
    if (T.size) {
      const z = {};
      if (typeof y.initial != "boolean") {
        const B = Di(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        B && B.transition && (z.transition = B.transition);
      }
      T.forEach((B) => {
        const L = n.getBaseTarget(B), V = n.getValue(B);
        V && (V.liveStyle = !0), z[B] = L ?? null;
      }), S.push({ animation: z });
    }
    let D = !!S.length;
    return s && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (D = !1), s = !1, o = !1, D ? a(S) : Promise.resolve();
  }
  function p(m, y) {
    if (l[m].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((S) => S.animationState?.setActive(m, y)), l[m].isActive = y;
    const v = h(m);
    for (const S in l)
      l[S].protectedKeys = {};
    return v;
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
function Uj(n, a) {
  return typeof a == "string" ? a !== n : Array.isArray(a) ? !lx(a, n) : !1;
}
function Ei(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Qv() {
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
function $d(n, a) {
  n.min = a.min, n.max = a.max;
}
function jn(n, a) {
  $d(n.x, a.x), $d(n.y, a.y);
}
function Zv(n, a) {
  n.translate = a.translate, n.scale = a.scale, n.originPoint = a.originPoint, n.origin = a.origin;
}
const rx = 1e-4, Vj = 1 - rx, Bj = 1 + rx, sx = 0.01, Hj = 0 - sx, qj = 0 + sx;
function Pt(n) {
  return n.max - n.min;
}
function kj(n, a, l) {
  return Math.abs(n - a) <= l;
}
function Iv(n, a, l, s = 0.5) {
  n.origin = s, n.originPoint = at(a.min, a.max, n.origin), n.scale = Pt(l) / Pt(a), n.translate = at(l.min, l.max, n.origin) - n.originPoint, (n.scale >= Vj && n.scale <= Bj || isNaN(n.scale)) && (n.scale = 1), (n.translate >= Hj && n.translate <= qj || isNaN(n.translate)) && (n.translate = 0);
}
function $r(n, a, l, s) {
  Iv(n.x, a.x, l.x, s ? s.originX : void 0), Iv(n.y, a.y, l.y, s ? s.originY : void 0);
}
function Jv(n, a, l, s = 0) {
  const o = s ? at(l.min, l.max, s) : l.min;
  n.min = o + a.min, n.max = n.min + Pt(a);
}
function Pj(n, a, l, s) {
  Jv(n.x, a.x, l.x, s?.x), Jv(n.y, a.y, l.y, s?.y);
}
function Wv(n, a, l, s = 0) {
  const o = s ? at(l.min, l.max, s) : l.min;
  n.min = a.min - o, n.max = n.min + Pt(a);
}
function hu(n, a, l, s) {
  Wv(n.x, a.x, l.x, s?.x), Wv(n.y, a.y, l.y, s?.y);
}
function e0(n, a, l, s, o) {
  return n -= a, n = du(n, 1 / l, s), o !== void 0 && (n = du(n, 1 / o, s)), n;
}
function Yj(n, a = 0, l = 1, s = 0.5, o, c = n, d = n) {
  if (Yn.test(a) && (a = parseFloat(a), a = at(d.min, d.max, a / 100) - d.min), typeof a != "number")
    return;
  let h = at(c.min, c.max, s);
  n === c && (h -= a), n.min = e0(n.min, a, l, h, o), n.max = e0(n.max, a, l, h, o);
}
function t0(n, a, [l, s, o], c, d) {
  Yj(n, a[l], a[s], a[o], a.scale, c, d);
}
const Gj = ["x", "scaleX", "originX"], Fj = ["y", "scaleY", "originY"];
function n0(n, a, l, s) {
  t0(n.x, a, Gj, l ? l.x : void 0, s ? s.x : void 0), t0(n.y, a, Fj, l ? l.y : void 0, s ? s.y : void 0);
}
function a0(n) {
  return n.translate === 0 && n.scale === 1;
}
function ox(n) {
  return a0(n.x) && a0(n.y);
}
function i0(n, a) {
  return n.min === a.min && n.max === a.max;
}
function Xj(n, a) {
  return i0(n.x, a.x) && i0(n.y, a.y);
}
function l0(n, a) {
  return Math.round(n.min) === Math.round(a.min) && Math.round(n.max) === Math.round(a.max);
}
function ux(n, a) {
  return l0(n.x, a.x) && l0(n.y, a.y);
}
function r0(n) {
  return Pt(n.x) / Pt(n.y);
}
function s0(n, a) {
  return n.translate === a.translate && n.scale === a.scale && n.originPoint === a.originPoint;
}
function qn(n) {
  return [n("x"), n("y")];
}
function $j(n, a, l) {
  let s = "";
  const o = n.x.translate / a.x, c = n.y.translate / a.y, d = l?.z || 0;
  if ((o || c || d) && (s = `translate3d(${o}px, ${c}px, ${d}px) `), (a.x !== 1 || a.y !== 1) && (s += `scale(${1 / a.x}, ${1 / a.y}) `), l) {
    const { transformPerspective: m, rotate: y, rotateX: v, rotateY: S, skewX: T, skewY: R } = l;
    m && (s = `perspective(${m}px) ${s}`), y && (s += `rotate(${y}deg) `), v && (s += `rotateX(${v}deg) `), S && (s += `rotateY(${S}deg) `), T && (s += `skewX(${T}deg) `), R && (s += `skewY(${R}deg) `);
  }
  const h = n.x.scale * a.x, p = n.y.scale * a.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const cx = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius"
], Kj = cx.length, o0 = (n) => typeof n == "string" ? parseFloat(n) : n, u0 = (n) => typeof n == "number" || ge.test(n);
function Qj(n, a, l, s, o, c) {
  o ? (n.opacity = at(0, l.opacity ?? 1, Zj(s)), n.opacityExit = at(a.opacity ?? 1, 0, Ij(s))) : c && (n.opacity = at(a.opacity ?? 1, l.opacity ?? 1, s));
  for (let d = 0; d < Kj; d++) {
    const h = cx[d];
    let p = c0(a, h), m = c0(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || u0(p) === u0(m) ? (n[h] = Math.max(at(o0(p), o0(m), s), 0), (Yn.test(m) || Yn.test(p)) && (n[h] += "%")) : n[h] = m;
  }
  (a.rotate || l.rotate) && (n.rotate = at(a.rotate || 0, l.rotate || 0, s));
}
function c0(n, a) {
  return n[a] !== void 0 ? n[a] : n.borderRadius;
}
const Zj = /* @__PURE__ */ fx(0, 0.5, tS), Ij = /* @__PURE__ */ fx(0.5, 0.95, Sn);
function fx(n, a, l) {
  return (s) => s < n ? 0 : s > a ? 1 : l(/* @__PURE__ */ Jr(n, a, s));
}
function Jj(n, a, l) {
  const s = Ot(n) ? n : Nl(n);
  return s.start(jh("", s, a, l)), s.animation;
}
function ts(n, a, l, s = { passive: !0 }) {
  return n.addEventListener(a, l, s), () => n.removeEventListener(a, l);
}
const Wj = (n, a) => n.depth - a.depth;
class e2 {
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
    this.isDirty && this.children.sort(Wj), this.isDirty = !1, this.children.forEach(a);
  }
}
function t2(n, a) {
  const l = kt.now(), s = ({ timestamp: o }) => {
    const c = o - l;
    c >= a && (Wa(s), n(c - a));
  };
  return Je.setup(s, !0), () => Wa(s);
}
function Wo(n) {
  return Ot(n) ? n.get() : n;
}
class n2 {
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
}, rd = ["", "X", "Y", "Z"], a2 = 1e3;
let i2 = 0;
function sd(n, a, l, s) {
  const { latestValues: o } = a;
  o[n] && (l[n] = o[n], a.setStaticValue(n, 0), s && (s[n] = 0));
}
function dx(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: a } = n.options;
  if (!a)
    return;
  const l = zS(a);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Je, !(o || c));
  }
  const { parent: s } = n;
  s && !s.hasCheckedOptimisedAppear && dx(s);
}
function hx({ attachResizeListener: n, defaultParent: a, measureScroll: l, checkIsScrollRoot: s, resetTransform: o }) {
  return class {
    constructor(d = {}, h = a?.()) {
      this.id = i2++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(s2), this.nodes.forEach(h2), this.nodes.forEach(m2), this.nodes.forEach(o2);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = d, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new e2());
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
      this.isSVG = Lh(d) && !sj(d), this.instance = d;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(d), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), n) {
        let y, v = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Je.read(() => {
          v = window.innerWidth;
        }), n(d, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, y && y(), y = t2(S, 250), eu.hasAnimatedSinceResize && (eu.hasAnimatedSinceResize = !1, this.nodes.forEach(h0)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: v, hasRelativeLayoutChanged: S, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const R = this.options.transition || m.getDefaultTransition() || b2, { onLayoutAnimationStart: C, onLayoutAnimationComplete: D } = m.getProps(), z = !this.targetLayout || !ux(this.targetLayout, T), B = !v && S;
        if (this.options.layoutRoot || this.resumeFrom || B || v && (z || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const L = {
            ...Ah(R, "layout"),
            onPlay: C,
            onComplete: D
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (L.delay = 0, L.type = !1), this.startAnimation(L), this.setAnimationOrigin(y, B);
        } else
          v || h0(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(p2), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && dx(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(c2), this.nodes.forEach(f0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(d0);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(f2), this.nodes.forEach(d2), this.nodes.forEach(l2), this.nodes.forEach(r2)) : this.nodes.forEach(d0), this.clearAllSnapshots();
      const h = kt.now();
      zt.delta = Fn(0, 1e3 / 60, h - zt.timestamp), zt.timestamp = h, zt.isProcessing = !0, Jf.update.process(zt), Jf.preRender.process(zt), Jf.render.process(zt), zt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Oh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(u2), this.sharedNodes.forEach(y2);
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
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const d = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !ox(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      d && this.instance && (h || Ci(this.latestValues) || y) && (o(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(d = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return d && (p = this.removeTransform(p)), S2(p), {
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
      if (!(this.scroll?.wasRoot || this.path.some(x2))) {
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
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (kn(m.x, -v.scroll.offset.x), kn(m.y, -v.scroll.offset.y)), Ci(v.latestValues) && Jo(m, v.latestValues, v.layout?.layoutBox);
      }
      return Ci(this.latestValues) && Jo(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(d) {
      const h = Rt();
      jn(h, d);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ci(m.latestValues))
          continue;
        let y;
        m.instance && (Gd(m.latestValues) && m.updateSnapshot(), y = Rt(), jn(y, m.measurePageBox())), n0(h, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return Ci(this.latestValues) && n0(h, this.latestValues), h;
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
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Rt(), this.targetWithTransforms = Rt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Pj(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : jn(this.target, this.layout.layoutBox), ZS(this.target, this.targetDelta)) : jn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Gd(this.parent.latestValues) || QS(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(d, h, p) {
      this.relativeParent = d, this.linkedParentVersion = d.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Rt(), this.relativeTargetOrigin = Rt(), hu(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), jn(this.relativeTarget, this.relativeTargetOrigin);
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
      gj(this.layoutCorrected, this.treeScale, this.path, h), d.layout && !d.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (d.target = d.layout.layoutBox, d.targetWithTransforms = Rt());
      const { target: T } = d;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Zv(this.prevProjectionDelta.x, this.projectionDelta.x), Zv(this.prevProjectionDelta.y, this.projectionDelta.y)), $r(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== S || !s0(this.projectionDelta.x, this.prevProjectionDelta.x) || !s0(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = wl(), this.projectionDelta = wl(), this.projectionDeltaWithTransform = wl();
    }
    setAnimationOrigin(d, h = !1) {
      const p = this.snapshot, m = p ? p.latestValues : {}, y = { ...this.latestValues }, v = wl();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const S = Rt(), T = p ? p.source : void 0, R = this.layout ? this.layout.source : void 0, C = T !== R, D = this.getStack(), z = !D || D.members.length <= 1, B = !!(C && !z && this.options.crossfade === !0 && !this.path.some(v2));
      this.animationProgress = 0;
      let L;
      this.mixTargetDelta = (V) => {
        const K = V / 1e3;
        m0(v.x, d.x, K), m0(v.y, d.y, K), this.setTargetDelta(v), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (hu(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), g2(this.relativeTarget, this.relativeTargetOrigin, S, K), L && Xj(this.relativeTarget, L) && (this.isProjectionDirty = !1), L || (L = Rt()), jn(L, this.relativeTarget)), C && (this.animationValues = y, Qj(y, m, this.latestValues, K, B, z)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = K;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Wa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Je.update(() => {
        eu.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Nl(0)), this.motionValue.jump(0, !1), this.currentAnimation = Jj(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(a2), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: y } = d;
      if (!(!h || !p || !m)) {
        if (this !== d && this.layout && m && mx(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || Rt();
          const v = Pt(this.layout.layoutBox.x);
          p.x.min = d.target.x.min, p.x.max = p.x.min + v;
          const S = Pt(this.layout.layoutBox.y);
          p.y.min = d.target.y.min, p.y.max = p.y.min + S;
        }
        jn(h, p), Jo(h, y), $r(this.projectionDeltaWithTransform, this.layoutCorrected, h, y);
      }
    }
    registerSharedNode(d, h) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new n2()), this.sharedNodes.get(d).add(h);
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
        this.options.layoutId && (d.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, d.pointerEvents = Wo(h?.pointerEvents) || ""), this.hasProjected && !Ci(this.latestValues) && (d.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      d.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = $j(this.projectionDeltaWithTransform, this.treeScale, y);
      p && (v = p(y, v)), d.transform = v;
      const { x: S, y: T } = this.projectionDelta;
      d.transformOrigin = `${S.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? d.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : d.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const R in Xd) {
        if (y[R] === void 0)
          continue;
        const { correct: C, applyTo: D, isCSSVariable: z } = Xd[R], B = v === "none" ? y[R] : C(y[R], m);
        if (D) {
          const L = D.length;
          for (let V = 0; V < L; V++)
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
function l2(n) {
  n.updateLayout();
}
function r2(n) {
  const a = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && a && n.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = n.layout, { animationType: o } = n.options, c = a.source !== n.layout.source;
    if (o === "size")
      qn((y) => {
        const v = c ? a.measuredBox[y] : a.layoutBox[y], S = Pt(v);
        v.min = l[y].min, v.max = v.min + S;
      });
    else if (o === "x" || o === "y") {
      const y = o === "x" ? "y" : "x";
      $d(c ? a.measuredBox[y] : a.layoutBox[y], l[y]);
    } else mx(o, a.layoutBox, l) && qn((y) => {
      const v = c ? a.measuredBox[y] : a.layoutBox[y], S = Pt(l[y]);
      v.max = v.min + S, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + S);
    });
    const d = wl();
    $r(d, l, a.layoutBox);
    const h = wl();
    c ? $r(h, n.applyTransform(s, !0), a.measuredBox) : $r(h, l, a.layoutBox);
    const p = !ox(d);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: v, layout: S } = y;
        if (v && S) {
          const T = n.options.layoutAnchor || void 0, R = Rt();
          hu(R, a.layoutBox, v.layoutBox, T);
          const C = Rt();
          hu(C, l, S.layoutBox, T), ux(R, C) || (m = !0), y.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = R, n.relativeParent = y);
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
function s2(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function o2(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function u2(n) {
  n.clearSnapshot();
}
function f0(n) {
  n.clearMeasurements();
}
function c2(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function d0(n) {
  n.isLayoutDirty = !1;
}
function f2(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function d2(n) {
  const { visualElement: a } = n.options;
  a && a.getProps().onBeforeLayoutMeasure && a.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function h0(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function h2(n) {
  n.resolveTargetDelta();
}
function m2(n) {
  n.calcProjection();
}
function p2(n) {
  n.resetSkewAndRotation();
}
function y2(n) {
  n.removeLeadSnapshot();
}
function m0(n, a, l) {
  n.translate = at(a.translate, 0, l), n.scale = at(a.scale, 1, l), n.origin = a.origin, n.originPoint = a.originPoint;
}
function p0(n, a, l, s) {
  n.min = at(a.min, l.min, s), n.max = at(a.max, l.max, s);
}
function g2(n, a, l, s) {
  p0(n.x, a.x, l.x, s), p0(n.y, a.y, l.y, s);
}
function v2(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const b2 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, y0 = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), g0 = y0("applewebkit/") && !y0("chrome/") ? Math.round : Sn;
function v0(n) {
  n.min = g0(n.min), n.max = g0(n.max);
}
function S2(n) {
  v0(n.x), v0(n.y);
}
function mx(n, a, l) {
  return n === "position" || n === "preserve-aspect" && !kj(r0(a), r0(l), 0.2);
}
function x2(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const E2 = hx({
  attachResizeListener: (n, a) => ts(n, "resize", a),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), od = {
  current: void 0
}, px = hx({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!od.current) {
      const n = new E2({});
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
function T2(...n) {
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
function R2(...n) {
  return x.useCallback(T2(...n), n);
}
class C2 extends x.Component {
  getSnapshotBeforeUpdate(a) {
    const l = this.props.childRef.current;
    if ($o(l) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, o = $o(s) && s.offsetWidth || 0, c = $o(s) && s.offsetHeight || 0, d = getComputedStyle(l), h = this.props.sizeRef.current;
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
function M2({ children: n, isPresent: a, anchorX: l, anchorY: s, root: o, pop: c }) {
  const d = x.useId(), h = x.useRef(null), p = x.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = x.useContext(kh), y = n.props?.ref ?? n?.ref, v = R2(h, y);
  return x.useInsertionEffect(() => {
    const { width: S, height: T, top: R, left: C, right: D, bottom: z } = p.current;
    if (a || c === !1 || !h.current || !S || !T)
      return;
    const B = l === "left" ? `left: ${C}` : `right: ${D}`, L = s === "bottom" ? `bottom: ${z}` : `top: ${R}`;
    h.current.dataset.motionPopId = d;
    const V = document.createElement("style");
    m && (V.nonce = m);
    const K = o ?? document.head;
    return K.appendChild(V), V.sheet && V.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${T}px !important;
            ${B}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), K.contains(V) && K.removeChild(V);
    };
  }, [a]), b.jsx(C2, { isPresent: a, childRef: h, sizeRef: p, pop: c, children: c === !1 ? n : x.cloneElement(n, { ref: v }) });
}
const w2 = ({ children: n, initial: a, isPresent: l, onExitComplete: s, custom: o, presenceAffectsLayout: c, mode: d, anchorX: h, anchorY: p, root: m }) => {
  const y = yh(A2), v = x.useId();
  let S = !0, T = x.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: l,
    custom: o,
    onExitComplete: (R) => {
      y.set(R, !0);
      for (const C of y.values())
        if (!C)
          return;
      s && s();
    },
    register: (R) => (y.set(R, !1), () => y.delete(R))
  }), [l, y, s]);
  return c && S && (T = { ...T }), x.useMemo(() => {
    y.forEach((R, C) => y.set(C, !1));
  }, [l]), x.useEffect(() => {
    !l && !y.size && s && s();
  }, [l]), n = b.jsx(M2, { pop: d === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: n }), b.jsx(xu.Provider, { value: T, children: n });
};
function A2() {
  return /* @__PURE__ */ new Map();
}
function yx(n = !0) {
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
const Vo = (n) => n.key || "";
function S0(n) {
  const a = [];
  return x.Children.forEach(n, (l) => {
    x.isValidElement(l) && a.push(l);
  }), a;
}
const j2 = ({ children: n, custom: a, initial: l = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: d = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [y, v] = yx(d), S = x.useMemo(() => S0(n), [n]), T = d && !y ? [] : S.map(Vo), R = x.useRef(!0), C = x.useRef(S), D = yh(() => /* @__PURE__ */ new Map()), z = x.useRef(/* @__PURE__ */ new Set()), [B, L] = x.useState(S), [V, K] = x.useState(S);
  Yb(() => {
    R.current = !1, C.current = S;
    for (let j = 0; j < V.length; j++) {
      const X = Vo(V[j]);
      T.includes(X) ? (D.delete(X), z.current.delete(X)) : D.get(X) !== !0 && D.set(X, !1);
    }
  }, [V, T.length, T.join("-")]);
  const ee = [];
  if (S !== B) {
    let j = [...S];
    for (let X = 0; X < V.length; X++) {
      const Q = V[X], ue = Vo(Q);
      T.includes(ue) || (j.splice(X, 0, Q), ee.push(Q));
    }
    return c === "wait" && ee.length && (j = ee), K(S0(j)), L(S), null;
  }
  const { forceRender: J } = x.useContext(ph);
  return b.jsx(b.Fragment, { children: V.map((j) => {
    const X = Vo(j), Q = d && !y ? !1 : S === V || T.includes(X), ue = () => {
      if (z.current.has(X))
        return;
      if (D.has(X))
        z.current.add(X), D.set(X, !0);
      else
        return;
      let I = !0;
      D.forEach((F) => {
        F || (I = !1);
      }), I && (J?.(), K(C.current), d && v?.(), s && s());
    };
    return b.jsx(w2, { isPresent: Q, initial: !R.current || l ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: c, root: m, onExitComplete: Q ? void 0 : ue, anchorX: h, anchorY: p, children: j }, X);
  }) });
}, gx = x.createContext({ strict: !1 }), x0 = {
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
function D2() {
  if (E0)
    return;
  const n = {};
  for (const a in x0)
    n[a] = {
      isEnabled: (l) => x0[a].some((s) => !!l[s])
    };
  XS(n), E0 = !0;
}
function vx() {
  return D2(), hj();
}
function N2(n) {
  const a = vx();
  for (const l in n)
    a[l] = {
      ...a[l],
      ...n[l]
    };
  XS(a);
}
const z2 = /* @__PURE__ */ new Set([
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
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || z2.has(n);
}
let bx = (n) => !mu(n);
function O2(n) {
  typeof n == "function" && (bx = (a) => a.startsWith("on") ? !mu(a) : n(a));
}
try {
  O2(require("@emotion/is-prop-valid").default);
} catch {
}
function _2(n, a, l) {
  const s = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ot(n[o]) || (bx(o) || l === !0 && mu(o) || !a && !mu(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (s[o] = n[o]);
  return s;
}
const Cu = /* @__PURE__ */ x.createContext({});
function L2(n, a) {
  if (Ru(n)) {
    const { initial: l, animate: s } = n;
    return {
      initial: l === !1 || es(l) ? l : void 0,
      animate: es(s) ? s : void 0
    };
  }
  return n.inherit !== !1 ? a : {};
}
function U2(n) {
  const { initial: a, animate: l } = L2(n, x.useContext(Cu));
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
function Sx(n, a, l) {
  for (const s in a)
    !Ot(a[s]) && !WS(s, l) && (n[s] = a[s]);
}
function V2({ transformTemplate: n }, a) {
  return x.useMemo(() => {
    const l = Ph();
    return Hh(l, a, n), Object.assign({}, l.vars, l.style);
  }, [a]);
}
function B2(n, a) {
  const l = n.style || {}, s = {};
  return Sx(s, l, n), Object.assign(s, V2(n, a)), s;
}
function H2(n, a) {
  const l = {}, s = B2(n, a);
  return n.drag && n.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const xx = () => ({
  ...Ph(),
  attrs: {}
});
function q2(n, a, l, s) {
  const o = x.useMemo(() => {
    const c = xx();
    return ex(c, a, nx(s), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [a]);
  if (n.style) {
    const c = {};
    Sx(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const k2 = [
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
      !!(k2.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function P2(n, a, l, { latestValues: s }, o, c = !1, d) {
  const p = (d ?? Yh(n) ? q2 : H2)(a, s, o, n), m = _2(a, typeof n == "string", c), y = n !== x.Fragment ? { ...m, ...p, ref: l } : {}, { children: v } = a, S = x.useMemo(() => Ot(v) ? v.get() : v, [v]);
  return x.createElement(n, {
    ...y,
    children: S
  });
}
function Y2({ scrapeMotionValuesFromProps: n, createRenderState: a }, l, s, o) {
  return {
    latestValues: G2(l, s, o, n),
    renderState: a()
  };
}
function G2(n, a, l, s) {
  const o = {}, c = s(n, {});
  for (const S in c)
    o[S] = Wo(c[S]);
  let { initial: d, animate: h } = n;
  const p = Ru(n), m = GS(n);
  a && m && !p && n.inherit !== !1 && (d === void 0 && (d = a.initial), h === void 0 && (h = a.animate));
  let y = l ? l.initial === !1 : !1;
  y = y || d === !1;
  const v = y ? h : d;
  if (v && typeof v != "boolean" && !Tu(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let T = 0; T < S.length; T++) {
      const R = Dh(n, S[T]);
      if (R) {
        const { transitionEnd: C, transition: D, ...z } = R;
        for (const B in z) {
          let L = z[B];
          if (Array.isArray(L)) {
            const V = y ? L.length - 1 : 0;
            L = L[V];
          }
          L !== null && (o[B] = L);
        }
        for (const B in C)
          o[B] = C[B];
      }
    }
  }
  return o;
}
const Ex = (n) => (a, l) => {
  const s = x.useContext(Cu), o = x.useContext(xu), c = () => Y2(n, a, s, o);
  return l ? c() : yh(c);
}, F2 = /* @__PURE__ */ Ex({
  scrapeMotionValuesFromProps: qh,
  createRenderState: Ph
}), X2 = /* @__PURE__ */ Ex({
  scrapeMotionValuesFromProps: ax,
  createRenderState: xx
}), $2 = Symbol.for("motionComponentSymbol");
function K2(n, a, l) {
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
const Tx = x.createContext({});
function Tl(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
function Q2(n, a, l, s, o, c) {
  const { visualElement: d } = x.useContext(Cu), h = x.useContext(gx), p = x.useContext(xu), m = x.useContext(kh), y = m.reducedMotion, v = m.skipAnimations, S = x.useRef(null), T = x.useRef(!1);
  s = s || h.renderer, !S.current && s && (S.current = s(n, {
    visualState: a,
    parent: d,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: v,
    isSVG: c
  }), T.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const R = S.current, C = x.useContext(Tx);
  R && !R.projection && o && (R.type === "html" || R.type === "svg") && Z2(S.current, l, o, C);
  const D = x.useRef(!1);
  x.useInsertionEffect(() => {
    R && D.current && R.update(l, p);
  });
  const z = l[NS], B = x.useRef(!!z && typeof window < "u" && !window.MotionHandoffIsComplete?.(z) && window.MotionHasOptimisedAnimation?.(z));
  return Yb(() => {
    T.current = !0, R && (D.current = !0, window.MotionIsMounted = !0, R.updateFeatures(), R.scheduleRenderMicrotask(), B.current && R.animationState && R.animationState.animateChanges());
  }), x.useEffect(() => {
    R && (!B.current && R.animationState && R.animationState.animateChanges(), B.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(z);
    }), B.current = !1), R.enteringChildren = void 0);
  }), R;
}
function Z2(n, a, l, s) {
  const { layoutId: o, layout: c, drag: d, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: y, layoutCrossfade: v } = a;
  n.projection = new l(n.latestValues, a["data-framer-portal-id"] ? void 0 : Rx(n.parent)), n.projection.setOptions({
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
function Rx(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : Rx(n.parent);
}
function ud(n, { forwardMotionProps: a = !1, type: l } = {}, s, o) {
  s && N2(s);
  const c = l ? l === "svg" : Yh(n), d = c ? X2 : F2;
  function h(m, y) {
    let v;
    const S = {
      ...x.useContext(kh),
      ...m,
      layoutId: I2(m)
    }, { isStatic: T } = S, R = U2(m), C = d(m, T);
    if (!T && typeof window < "u") {
      J2();
      const D = W2(S);
      v = D.MeasureLayout, R.visualElement = Q2(n, C, S, o, D.ProjectionNode, c);
    }
    return b.jsxs(Cu.Provider, { value: R, children: [v && R.visualElement ? b.jsx(v, { visualElement: R.visualElement, ...S }) : null, P2(n, m, K2(C, R.visualElement, y), C, T, a, c)] });
  }
  h.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = x.forwardRef(h);
  return p[$2] = n, p;
}
function I2({ layoutId: n }) {
  const a = x.useContext(ph).id;
  return a && n !== void 0 ? a + "-" + n : n;
}
function J2(n, a) {
  x.useContext(gx).strict;
}
function W2(n) {
  const a = vx(), { drag: l, layout: s } = a;
  if (!l && !s)
    return {};
  const o = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(n) || s?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function eD(n, a) {
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
const tD = (n, a) => a.isSVG ?? Yh(n) ? new Dj(a) : new Rj(a, {
  allowProjection: n !== x.Fragment
});
class nD extends ei {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Lj(a));
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
let aD = 0;
class iD extends ei {
  constructor() {
    super(...arguments), this.id = aD++, this.isExitComplete = !1;
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
const lD = {
  animation: {
    Feature: nD
  },
  exit: {
    Feature: iD
  }
};
function ds(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const rD = (n) => (a) => _h(a) && n(a, ds(a));
function Kr(n, a, l, s) {
  return ts(n, a, rD(l), s);
}
const Cx = ({ current: n }) => n ? n.ownerDocument.defaultView : null, R0 = (n, a) => Math.abs(n - a);
function sD(n, a) {
  const l = R0(n.x, a.x), s = R0(n.y, a.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const C0 = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Mx {
  constructor(a, l, { transformPagePoint: s, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: d = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (T) => {
      this.handleScroll(T.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Bo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const T = cd(this.lastMoveEventInfo, this.history), R = this.startEvent !== null, C = sD(T.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!R && !C)
        return;
      const { point: D } = T, { timestamp: z } = zt;
      this.history.push({ ...D, timestamp: z });
      const { onStart: B, onMove: L } = this.handlers;
      R || (B && B(this.lastMoveEvent, T), this.startEvent = this.lastMoveEvent), L && L(this.lastMoveEvent, T);
    }, this.handlePointerMove = (T, R) => {
      this.lastMoveEvent = T, this.lastRawMoveEventInfo = R, this.lastMoveEventInfo = Bo(R, this.transformPagePoint), Je.update(this.updatePoint, !0);
    }, this.handlePointerUp = (T, R) => {
      this.end();
      const { onEnd: C, onSessionEnd: D, resumeAnimation: z } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && z && z(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const B = cd(T.type === "pointercancel" ? this.lastMoveEventInfo : Bo(R, this.transformPagePoint), this.history);
      this.startEvent && C && C(T, B), D && D(T, B);
    }, !_h(a))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = d, this.contextWindow = o || window;
    const p = ds(a), m = Bo(p, this.transformPagePoint), { point: y } = m, { timestamp: v } = zt;
    this.history = [{ ...y, timestamp: v }];
    const { onSessionStart: S } = l;
    S && S(a, cd(m, this.history)), this.removeListeners = us(Kr(this.contextWindow, "pointermove", this.handlePointerMove), Kr(this.contextWindow, "pointerup", this.handlePointerUp), Kr(this.contextWindow, "pointercancel", this.handlePointerUp)), h && this.startScrollTracking(h);
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(a, o), Je.update(this.updatePoint, !0));
  }
  updateHandlers(a) {
    this.handlers = a;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Wa(this.updatePoint);
  }
}
function Bo(n, a) {
  return a ? { point: a(n.point) } : n;
}
function M0(n, a) {
  return { x: n.x - a.x, y: n.y - a.y };
}
function cd({ point: n }, a) {
  return {
    point: n,
    delta: M0(n, wx(a)),
    offset: M0(n, oD(a)),
    velocity: uD(a, 0.1)
  };
}
function oD(n) {
  return n[0];
}
function wx(n) {
  return n[n.length - 1];
}
function uD(n, a) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let l = n.length - 1, s = null;
  const o = wx(n);
  for (; l >= 0 && (s = n[l], !(o.timestamp - s.timestamp > /* @__PURE__ */ It(a))); )
    l--;
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
function cD(n, { min: a, max: l }, s) {
  return a !== void 0 && n < a ? n = s ? at(a, n, s.min) : Math.max(n, a) : l !== void 0 && n > l && (n = s ? at(l, n, s.max) : Math.min(n, l)), n;
}
function w0(n, a, l) {
  return {
    min: a !== void 0 ? n.min + a : void 0,
    max: l !== void 0 ? n.max + l - (n.max - n.min) : void 0
  };
}
function fD(n, { top: a, left: l, bottom: s, right: o }) {
  return {
    x: w0(n.x, l, o),
    y: w0(n.y, a, s)
  };
}
function A0(n, a) {
  let l = a.min - n.min, s = a.max - n.max;
  return a.max - a.min < n.max - n.min && ([l, s] = [s, l]), { min: l, max: s };
}
function dD(n, a) {
  return {
    x: A0(n.x, a.x),
    y: A0(n.y, a.y)
  };
}
function hD(n, a) {
  let l = 0.5;
  const s = Pt(n), o = Pt(a);
  return o > s ? l = /* @__PURE__ */ Jr(a.min, a.max - s, n.min) : s > o && (l = /* @__PURE__ */ Jr(n.min, n.max - o, a.min)), Fn(0, 1, l);
}
function mD(n, a) {
  const l = {};
  return a.min !== void 0 && (l.min = a.min - n.min), a.max !== void 0 && (l.max = a.max - n.min), l;
}
const Kd = 0.35;
function pD(n = Kd) {
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
const yD = /* @__PURE__ */ new WeakMap();
class gD {
  constructor(a) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Rt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = a;
  }
  start(a, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(ds(v).point), this.stopAnimation();
    }, d = (v, S) => {
      const { drag: T, dragPropagation: R, onDragStart: C } = this.getProps();
      if (T && !R && (this.openDragLock && this.openDragLock(), this.openDragLock = GA(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), qn((z) => {
        let B = this.getAxisMotionValue(z).get() || 0;
        if (Yn.test(B)) {
          const { projection: L } = this.visualElement;
          if (L && L.layout) {
            const V = L.layout.layoutBox[z];
            V && (B = Pt(V) * (parseFloat(B) / 100));
          }
        }
        this.originPoint[z] = B;
      }), C && Je.update(() => C(v, S), !1, !0), qd(this.visualElement, "transform");
      const { animationState: D } = this.visualElement;
      D && D.setActive("whileDrag", !0);
    }, h = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S;
      const { dragPropagation: T, dragDirectionLock: R, onDirectionLock: C, onDrag: D } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: z } = S;
      if (R && this.currentDirection === null) {
        this.currentDirection = bD(z), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, z), this.updateAxis("y", S.point, z), this.visualElement.render(), D && Je.update(() => D(v, S), !1, !0);
    }, p = (v, S) => {
      this.latestPointerEvent = v, this.latestPanInfo = S, this.stop(v, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new Mx(a, {
      onSessionStart: c,
      onStart: d,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: s,
      contextWindow: Cx(this.visualElement),
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
    h && Je.postRender(() => h(s, o));
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
    this.constraints && this.constraints[a] && (d = cD(d, this.constraints[a], this.elastic[a])), c.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: a, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    a && Tl(a) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : a && s ? this.constraints = fD(s.layoutBox, a) : this.constraints = !1, this.elastic = pD(l), o !== this.constraints && !Tl(a) && s && this.constraints && !this.hasMutatedConstraints && qn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = mD(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: a, onMeasureDragConstraints: l } = this.getProps();
    if (!a || !Tl(a))
      return !1;
    const s = a.current;
    Ni(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    const c = vj(s, o.root, this.visualElement.getTransformPagePoint());
    let d = dD(o.layout.layoutBox, c);
    if (l) {
      const h = l(pj(d));
      this.hasMutatedConstraints = !!h, h && (d = KS(h));
    }
    return d;
  }
  startAnimation(a) {
    const { drag: l, dragMomentum: s, dragElastic: o, dragTransition: c, dragSnapToOrigin: d, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = qn((y) => {
      if (!Ho(y, l, this.currentDirection))
        return;
      let v = p && p[y] || {};
      (d === !0 || d === y) && (v = { min: 0, max: 0 });
      const S = o ? 200 : 1e6, T = o ? 40 : 1e7, R = {
        type: "inertia",
        velocity: s ? a[y] : 0,
        bounceStiffness: S,
        bounceDamping: T,
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
  startAxisValueAnimation(a, l) {
    const s = this.getAxisMotionValue(a);
    return qd(this.visualElement, a), s.start(jh(a, s, 0, l, this.visualElement, !1));
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
    const l = `_drag${a.toUpperCase()}`, s = this.visualElement.getProps(), o = s[l];
    return o || this.visualElement.getValue(a, (s.initial ? s.initial[a] : void 0) || 0);
  }
  snapToCursor(a) {
    qn((l) => {
      const { drag: s } = this.getProps();
      if (!Ho(l, s, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(l);
      if (o && o.layout) {
        const { min: d, max: h } = o.layout.layoutBox[l], p = c.get() || 0;
        c.set(a[l] - at(d, h, 0.5) + p);
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
    if (!Tl(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    qn((d) => {
      const h = this.getAxisMotionValue(d);
      if (h && this.constraints !== !1) {
        const p = h.get();
        o[d] = hD({ min: p, max: p }, this.constraints[d]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), qn((d) => {
      if (!Ho(d, a, null))
        return;
      const h = this.getAxisMotionValue(d), { min: p, max: m } = this.constraints[d];
      h.set(at(p, m, o[d]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    yD.set(this.visualElement, this);
    const a = this.visualElement.current, l = Kr(a, "pointerdown", (m) => {
      const { drag: y, dragListener: v = !0 } = this.getProps(), S = m.target, T = S !== a && ZA(S);
      y && v && !T && this.start(m);
    });
    let s;
    const o = () => {
      const { dragConstraints: m } = this.getProps();
      Tl(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = vD(a, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, d = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Je.read(o);
    const h = ts(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (qn((v) => {
        const S = this.getAxisMotionValue(v);
        S && (this.originPoint[v] += m[v].translate, S.set(S.get() + m[v].translate));
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
function vD(n, a, l) {
  const s = Bv(n, N0(l)), o = Bv(a, N0(l));
  return () => {
    s(), o();
  };
}
function Ho(n, a, l) {
  return (a === !0 || a === n) && (l === null || l === n);
}
function bD(n, a = 10) {
  let l = null;
  return Math.abs(n.y) > a ? l = "y" : Math.abs(n.x) > a && (l = "x"), l;
}
class SD extends ei {
  constructor(a) {
    super(a), this.removeGroupControls = Sn, this.removeListeners = Sn, this.controls = new gD(a);
  }
  mount() {
    const { dragControls: a } = this.node.getProps();
    a && (this.removeGroupControls = a.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Sn;
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
  n && Je.update(() => n(a, l), !1, !0);
};
class xD extends ei {
  constructor() {
    super(...arguments), this.removePointerDownListener = Sn;
  }
  onPointerDown(a) {
    this.session = new Mx(a, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Cx(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: a, onPanStart: l, onPan: s, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: fd(a),
      onStart: fd(l),
      onMove: fd(s),
      onEnd: (c, d) => {
        delete this.session, o && Je.postRender(() => o(c, d));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Kr(this.node.current, "pointerdown", (a) => this.onPointerDown(a));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let dd = !1;
class ED extends x.Component {
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
    }), dd = !0, o || a.layoutDependency !== l || l === void 0 || a.isPresent !== c ? d.willUpdate() : this.safeToRemove(), a.isPresent !== c && (c ? d.promote() : d.relegate() || Je.postRender(() => {
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
function Ax(n) {
  const [a, l] = yx(), s = x.useContext(ph);
  return b.jsx(ED, { ...n, layoutGroup: s, switchLayoutGroup: x.useContext(Tx), isPresent: a, safeToRemove: l });
}
const TD = {
  pan: {
    Feature: xD
  },
  drag: {
    Feature: SD,
    ProjectionNode: px,
    MeasureLayout: Ax
  }
};
function z0(n, a, l) {
  const { props: s } = n;
  n.animationState && s.whileHover && n.animationState.setActive("whileHover", l === "Start");
  const o = "onHover" + l, c = s[o];
  c && Je.postRender(() => c(a, ds(a)));
}
class RD extends ei {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = XA(a, (l, s) => (z0(this.node, s, "Start"), (o) => z0(this.node, o, "End"))));
  }
  unmount() {
  }
}
class CD extends ei {
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
    this.unmount = us(ts(this.node.current, "focus", () => this.onFocus()), ts(this.node.current, "blur", () => this.onBlur()));
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
  c && Je.postRender(() => c(a, ds(a)));
}
class MD extends ei {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = JA(a, (o, c) => (O0(this.node, c, "Start"), (d, { success: h }) => O0(this.node, d, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Qd = /* @__PURE__ */ new WeakMap(), hd = /* @__PURE__ */ new WeakMap(), wD = (n) => {
  const a = Qd.get(n.target);
  a && a(n);
}, AD = (n) => {
  n.forEach(wD);
};
function jD({ root: n, ...a }) {
  const l = n || document;
  hd.has(l) || hd.set(l, {});
  const s = hd.get(l), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(AD, { root: n, ...a })), s[o];
}
function DD(n, a, l) {
  const s = jD(a);
  return Qd.set(n, l), s.observe(n), () => {
    Qd.delete(n), s.unobserve(n);
  };
}
const ND = {
  some: 0,
  all: 1
};
class zD extends ei {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: l, margin: s, amount: o = "some", once: c } = a, d = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : ND[o]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: v } = this.node.getProps(), S = m ? y : v;
      S && S(p);
    };
    this.stopObserver = DD(this.node.current, d, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(OD(a, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function OD({ viewport: n = {} }, { viewport: a = {} } = {}) {
  return (l) => n[l] !== a[l];
}
const _D = {
  inView: {
    Feature: zD
  },
  tap: {
    Feature: MD
  },
  focus: {
    Feature: CD
  },
  hover: {
    Feature: RD
  }
}, LD = {
  layout: {
    ProjectionNode: px,
    MeasureLayout: Ax
  }
}, UD = {
  ...lD,
  ..._D,
  ...TD,
  ...LD
}, Gh = /* @__PURE__ */ eD(UD, tD);
function VD() {
  !Bh.current && FS();
  const [n] = x.useState(cu.current);
  return n;
}
const Hr = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function BD({ vector: n, pulseKey: a, size: l = 220 }) {
  const s = VD(), o = l / 2, c = l / 2, d = l / 2 - 28, h = Hr.length, p = Hr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h, R = Math.max(0, Math.min(1, n[S] ?? 0));
    return { x: o + Math.cos(T) * d * R, y: c + Math.sin(T) * d * R };
  }), m = Hr.map((v, S) => {
    const T = -Math.PI / 2 + 2 * Math.PI * S / h;
    return { x: o + Math.cos(T) * d, y: c + Math.sin(T) * d, angle: T };
  }), y = p.map((v) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      width: l,
      height: l,
      viewBox: `0 0 ${l} ${l}`,
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
        m.map((v, S) => /* @__PURE__ */ b.jsx(
          "text",
          {
            x: o + Math.cos(v.angle) * (d + 16),
            y: c + Math.sin(v.angle) * (d + 16) + 3,
            textAnchor: "middle",
            fontSize: 10,
            fill: "currentColor",
            opacity: 0.72,
            children: Hr[S]
          },
          Hr[S]
        ))
      ]
    }
  );
}
const HD = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function qD({ vector: n, onChange: a, disabled: l = !1 }) {
  const s = (o, c) => {
    const d = Math.max(0, Math.min(1, Number.isFinite(c) ? c : 0)), h = [...n];
    h[o] = d, a(h);
  };
  return /* @__PURE__ */ b.jsx("div", { className: wM, role: "group", "aria-label": "Emotion axes", children: HD.map((o, c) => /* @__PURE__ */ b.jsxs("div", { className: AM, children: [
    /* @__PURE__ */ b.jsx("label", { htmlFor: `emo-slider-${c}`, className: qb, children: o }),
    /* @__PURE__ */ b.jsx(
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
        className: kb
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
        disabled: l,
        onChange: (d) => s(c, Number(d.currentTarget.value)),
        className: Pb,
        "aria-label": `${o} numeric value`
      }
    )
  ] }, o)) });
}
const kD = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
], jx = [0, 0, 0, 0, 0, 0, 0, 0], PD = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;
function YD({ value: n, onChange: a, deploymentId: l }) {
  const s = n.mode ?? "none", o = GD(n.vector), c = n.emotionAlpha ?? 1, [d, h] = x.useState([]), [p, m] = x.useState(null), [y, v] = x.useState(""), [S, T] = x.useState(""), [R, C] = x.useState(0), [D, z] = x.useState(!1), B = x.useRef(!0);
  x.useEffect(() => (B.current = !0, () => {
    B.current = !1;
  }), []), x.useEffect(() => {
    let I = !1;
    return m(null), vM(l).then((F) => {
      I || h(_0(F.presets));
    }).catch((F) => {
      I || m(md(F));
    }), () => {
      I = !0;
    };
  }, [l]);
  const L = x.useMemo(
    () => d.find((I) => I.presetId === S) ?? null,
    [d, S]
  ), V = (I) => {
    a({ ...n, mode: I });
  }, K = (I) => {
    a({ ...n, mode: "emotion_vector", vector: I }), L && !XD(L.vector, I) && T("");
  }, ee = (I) => {
    const F = Math.max(0, Math.min(1, Number.isFinite(I) ? I : 1));
    a({ ...n, emotionAlpha: F });
  }, J = (I) => {
    const F = d.find((oe) => oe.presetId === I);
    F && (T(I), a({ ...n, mode: "emotion_vector", vector: F.vector }), C((oe) => oe + 1));
  }, j = async () => {
    const I = y.trim();
    if (I) {
      z(!0), m(null);
      try {
        const F = await bM(l, I, o);
        if (!B.current) return;
        h((oe) => _0([F, ...oe.filter((te) => te.presetId !== F.presetId)])), T(F.presetId), v(""), C((oe) => oe + 1);
      } catch (F) {
        B.current && m(md(F));
      } finally {
        B.current && z(!1);
      }
    }
  }, X = async (I) => {
    const F = d;
    h((oe) => oe.filter((te) => te.presetId !== I)), S === I && T("");
    try {
      await SM(l, I);
    } catch (oe) {
      B.current && (h(F), m(md(oe)));
    }
  }, Q = () => K(jx), ue = () => {
    const I = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100);
    K(I), C((F) => F + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: xM, children: [
    /* @__PURE__ */ b.jsxs("div", { className: EM, children: [
      /* @__PURE__ */ b.jsx(BD, { vector: o, pulseKey: R }),
      /* @__PURE__ */ b.jsx("span", { className: If, children: $D(s, L?.presetName) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: TM, children: [
      /* @__PURE__ */ b.jsx("div", { className: RM, role: "radiogroup", "aria-label": "Emotion source", children: kD.map((I) => /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === I.id,
          className: s === I.id ? MM : CM,
          onClick: () => V(I.id),
          children: I.label
        },
        I.id
      )) }),
      s === "emotion_vector" && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsxs("div", { className: jM, children: [
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: DM,
              value: S,
              onChange: (I) => J(I.currentTarget.value),
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
              className: zM,
              onClick: () => void X(S),
              disabled: D,
              children: "Delete preset"
            }
          ),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: pv, onClick: Q, children: "Reset" }),
          /* @__PURE__ */ b.jsx("button", { type: "button", className: pv, onClick: ue, children: "Random" })
        ] }),
        /* @__PURE__ */ b.jsx(qD, { vector: o, onChange: K }),
        /* @__PURE__ */ b.jsxs(
          "form",
          {
            className: LM,
            onSubmit: (I) => {
              I.preventDefault(), j();
            },
            children: [
              /* @__PURE__ */ b.jsx(
                "input",
                {
                  type: "text",
                  className: UM,
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
                  className: NM,
                  disabled: D || y.trim().length === 0,
                  children: "Save preset"
                }
              )
            ]
          }
        )
      ] }),
      s === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { children: [
        /* @__PURE__ */ b.jsxs("span", { className: If, children: [
          "Qwen template — use ",
          "{seg}",
          " for the line text."
        ] }),
        /* @__PURE__ */ b.jsx(
          "textarea",
          {
            className: _M,
            value: n.qwenTemplate ?? "",
            onChange: (I) => a({ ...n, mode: "qwen_template", qwenTemplate: I.currentTarget.value }),
            rows: 4
          }
        )
      ] }),
      s === "audio_ref" && /* @__PURE__ */ b.jsx("p", { className: If, children: "Audio references are attached per character in the mapping editor — the global panel only toggles the mode." }),
      s !== "none" && /* @__PURE__ */ b.jsxs("div", { className: OM, children: [
        /* @__PURE__ */ b.jsx("span", { className: qb, children: "alpha" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: c,
            className: kb,
            onChange: (I) => ee(Number(I.currentTarget.value)),
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
            className: Pb,
            onChange: (I) => ee(Number(I.currentTarget.value)),
            "aria-label": "Emotion alpha numeric"
          }
        )
      ] }),
      p && /* @__PURE__ */ b.jsx("p", { className: VM, children: p }),
      /* @__PURE__ */ b.jsx("pre", { className: BM, children: PD })
    ] })
  ] });
}
function GD(n) {
  return !n || n.length !== 8 ? [...jx] : n.map((a) => FD(a));
}
function FD(n) {
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
}
function XD(n, a) {
  for (let l = 0; l < 8; l += 1) {
    const s = n[l] ?? 0, o = a[l] ?? 0;
    if (Math.abs(s - o) > 1e-6) return !1;
  }
  return !0;
}
function _0(n) {
  return [...n].sort((a, l) => l.updatedAt - a.updatedAt);
}
function $D(n, a) {
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
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
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
function KD({
  outputFormat: n,
  onOutputFormatChange: a,
  speedFactor: l,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: c,
  generation: d,
  onGenerationChange: h
}) {
  const p = (y, v) => {
    h({ ...d, [y]: v });
  }, m = pd.find((y) => y.id === o) ?? pd[0];
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
          value: l,
          onChange: (y) => s(Number(y.currentTarget.value))
        }
      ),
      /* @__PURE__ */ b.jsxs("output", { children: [
        l.toFixed(2),
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
          pd.map((y) => /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": o === y.id,
              className: o === y.id ? iu : Ia,
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
const QD = ["cancelled", "failed", "partial"];
function ZD({ runs: n, deploymentId: a }) {
  const l = Oi(), [s, o] = x.useState(null), [c, d] = x.useState(null);
  if (n.length === 0)
    return /* @__PURE__ */ b.jsx("p", { className: Zt, children: "No runs yet." });
  const h = async (p) => {
    o(p), d(null);
    try {
      const { runId: m } = await dh(a, p);
      l(`/${a}/runs/${m}`);
    } catch (m) {
      d(JD(m));
    } finally {
      o(null);
    }
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    c && /* @__PURE__ */ b.jsx("p", { className: Ir, children: c }),
    /* @__PURE__ */ b.jsx("ul", { className: Md, children: n.map((p) => {
      const m = QD.includes(p.status) && p.kind === "batch";
      return /* @__PURE__ */ b.jsxs("li", { children: [
        /* @__PURE__ */ b.jsxs(ss, { to: `/${a}/runs/${p.runId}`, children: [
          p.kind,
          " · ",
          p.status,
          " · ",
          new Date(p.queuedAt * 1e3).toLocaleString()
        ] }),
        m && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          " ",
          /* @__PURE__ */ b.jsx("span", { className: ID(p.status), children: "partial — resumable" }),
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
function ID(n) {
  return n === "failed" ? mh : hh;
}
function JD(n) {
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
function WD({ deploymentId: n, initialVoiceAssetId: a, onChange: l }) {
  const [s, o] = x.useState([]), [c, d] = x.useState(a ?? "");
  x.useEffect(() => {
    au(n).then(({ voiceAssets: p }) => o(p)).catch(() => o([]));
  }, [n]);
  async function h(p) {
    const m = p.target.value || null;
    d(m ?? ""), await EC(n, m), l?.(m);
  }
  return /* @__PURE__ */ b.jsxs("select", { value: c, onChange: h, children: [
    /* @__PURE__ */ b.jsx("option", { value: "", children: "— choose voice —" }),
    s.map((p) => /* @__PURE__ */ b.jsx("option", { value: p.voiceAssetId, children: p.displayName }, p.voiceAssetId))
  ] });
}
function eN(n) {
  const a = Oi(), [l, s] = x.useState("idle"), [o, c] = x.useState(null), [d, h] = x.useState(/* @__PURE__ */ new Map()), [p, m] = x.useState(null), [y, v] = x.useState(null), S = x.useRef(null);
  x.useEffect(() => () => {
    S.current?.();
  }, []);
  const T = x.useCallback(async () => {
    s("starting"), m(null), h(/* @__PURE__ */ new Map()), v(null);
    try {
      const ee = await AC(n.deploymentId, n.createPayload);
      c(ee.runId), s("running"), S.current?.(), S.current = mv(
        n.deploymentId,
        ee.runId,
        (J) => L0(J, h, s, v, n.deploymentId, ee.runId),
        () => s("error")
      );
    } catch (ee) {
      s("error"), m(yd(ee));
    }
  }, [n.deploymentId, n.createPayload]), R = x.useCallback(async () => {
    if (o)
      try {
        await jC(n.deploymentId, o);
      } catch (ee) {
        m(yd(ee));
      }
  }, [n.deploymentId, o]), C = Array.from(d.values()).sort((ee, J) => ee.globalIndex - J.globalIndex), D = l === "starting" || l === "running", z = y?.status === "partial", B = C.filter((ee) => ee.status === "failed"), L = (() => {
    if (l !== "terminal" || B.length === 0) return null;
    const ee = /* @__PURE__ */ new Map();
    for (const Q of B) {
      const ue = Q.failureCategory ?? "unknown";
      ee.set(ue, (ee.get(ue) ?? 0) + 1);
    }
    let J = "unknown", j = 0;
    for (const [Q, ue] of ee)
      ue > j && (J = Q, j = ue);
    const X = C.length;
    return { category: J, count: j, total: X };
  })(), V = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, K = p?.toLowerCase().includes("unmapped") ?? !1;
  return /* @__PURE__ */ b.jsxs("div", { children: [
    p && /* @__PURE__ */ b.jsxs(
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
          /* @__PURE__ */ b.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ b.jsx("span", { children: p }),
          K && /* @__PURE__ */ b.jsx(
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
          className: iu,
          disabled: !n.canGenerate || D,
          onClick: T,
          children: l === "running" ? "Running…" : "Generate + Export ZIP"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Ub,
          disabled: !D,
          onClick: R,
          children: "Cancel"
        }
      )
    ] }),
    L && /* @__PURE__ */ b.jsxs("div", { className: Ir, role: "alert", children: [
      /* @__PURE__ */ b.jsxs("strong", { children: [
        "Run failed — ",
        L.count,
        " of ",
        L.total,
        " segments failed with ",
        /* @__PURE__ */ b.jsx("code", { children: L.category })
      ] }),
      V[L.category] && /* @__PURE__ */ b.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: V[L.category] })
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
    z && y && /* @__PURE__ */ b.jsxs("div", { className: Vb, style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ b.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: Ia,
          onClick: async () => {
            try {
              const ee = await dh(n.deploymentId, y.runId);
              c(ee.runId), h(/* @__PURE__ */ new Map()), v(null), s("running"), S.current?.(), S.current = mv(
                n.deploymentId,
                ee.runId,
                (J) => L0(J, h, s, v, n.deploymentId, ee.runId),
                () => s("error")
              );
            } catch (ee) {
              m(yd(ee)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ b.jsxs("table", { className: dM, children: [
      /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "#" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Status" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Duration" }),
        /* @__PURE__ */ b.jsx("th", { className: Ga, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ b.jsx("tbody", { children: C.map((ee) => /* @__PURE__ */ b.jsxs("tr", { className: hM, children: [
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: ee.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: /* @__PURE__ */ b.jsx("span", { className: tN(ee.status), children: ee.status }) }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: ee.durationMs ? `${ee.durationMs} ms` : "—" }),
        /* @__PURE__ */ b.jsx("td", { className: Ga, children: ee.failureCategory ?? "" })
      ] }, ee.globalIndex)) })
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
function tN(n) {
  switch (n) {
    case "completed":
      return Hb;
    case "running":
      return hh;
    case "failed":
      return mh;
    default:
      return Bb;
  }
}
function yd(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
function nN(n) {
  const a = Oi(), { attributions: l, unresolved: s, predictedFilenames: o } = x.useMemo(
    () => aN(n.value, n.outputFormat, n.mappings),
    [n.value, n.outputFormat, n.mappings]
  );
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsx(
      "textarea",
      {
        className: fM,
        value: n.value,
        onChange: (c) => n.onChange(c.currentTarget.value),
        placeholder: `[Bob] Hey there
[Alice] Hello
...`,
        "aria-label": "Dialogue script",
        spellCheck: !1
      }
    ),
    s.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: Ir, role: "alert", children: [
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
    l.length > 0 && /* @__PURE__ */ b.jsxs("div", { children: [
      /* @__PURE__ */ b.jsx("span", { className: Zt, children: "Parsed lines" }),
      /* @__PURE__ */ b.jsx("ul", { className: Md, children: l.map((c) => /* @__PURE__ */ b.jsxs("li", { children: [
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
      /* @__PURE__ */ b.jsx("ul", { className: Md, children: o.map((c) => /* @__PURE__ */ b.jsx("li", { children: c }, c)) })
    ] })
  ] });
}
function aN(n, a, l) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map(), h = [], p = n.split(/\r?\n/);
  let m = 0;
  return p.forEach((y, v) => {
    const S = y.trim();
    if (!S) return;
    const T = v + 1, R = S.match(s);
    let C = "Narrator", D = S;
    if (R && R.groups) {
      const V = (R.groups.body ?? "").trim(), K = (R.groups.rest ?? "").trim();
      C = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", D = K;
    }
    m += 1;
    const z = C.toLowerCase(), B = (d.get(z) ?? 0) + 1;
    d.set(z, B);
    const L = C === "Narrator" || l.has(z);
    L || c.add(C), o.push({ lineNumber: T, character: C, text: D, hasMapping: L }), h.push(
      `${m.toString().padStart(3, "0")}_${iN(C)}_${B.toString().padStart(3, "0")}.${a}`
    );
  }), {
    attributions: o,
    unresolved: Array.from(c),
    predictedFilenames: h
  };
}
function iN(n) {
  const a = n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
function lN(n) {
  const a = n.workflowCustomised ?? !1, l = n.unmappableFields ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: rM, children: [
    /* @__PURE__ */ b.jsxs("header", { className: uM, children: [
      /* @__PURE__ */ b.jsx("h1", { className: cM, children: n.deployment.displayName }),
      n.header
    ] }),
    a && /* @__PURE__ */ b.jsxs("section", { className: Vb, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("strong", { children: "Workflow customised." }),
      " ",
      l.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${l.join(", ")}.`,
      " ",
      /* @__PURE__ */ b.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: sM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: Lr, "aria-label": "Dialogue script", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Ur, children: "Script" }),
        n.scriptEditor
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Lr, "aria-label": "Generation settings", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Ur, children: "Settings" }),
        n.settingsPanel
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: oM, children: [
      /* @__PURE__ */ b.jsxs("section", { className: Lr, "aria-label": "Run", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Ur, children: "Run" }),
        n.runPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Lr, "aria-label": "Emotion panel", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Ur, children: "Emotion" }),
        n.emotionPanel
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: Lr, "aria-label": "Recent runs", children: [
        /* @__PURE__ */ b.jsx("h2", { className: Ur, children: "Recent runs" }),
        n.historyPanel
      ] })
    ] })
  ] });
}
function rN() {
  const { deployment: n, mappings: a, runs: l, workflow: s } = rs(), [o, c] = x.useState(""), [d, h] = x.useState(
    n.defaultOutputFormat ?? "mp3"
  ), [p, m] = x.useState(n.defaultSpeedFactor ?? 1), [y, v] = x.useState({
    mode: "none",
    emotionAlpha: 1
  }), [S, T] = x.useState({}), [R, C] = x.useState("use_cache"), [D, z] = x.useState(n.defaultVoiceAssetId != null), B = x.useMemo(
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
    for (const K of a)
      V.set(K.characterName.toLowerCase(), K);
    return V;
  }, [a]);
  return /* @__PURE__ */ b.jsx(
    lN,
    {
      deployment: n,
      workflowCustomised: s.workflow.customised,
      unmappableFields: s.unmappableFields,
      header: /* @__PURE__ */ b.jsx(pM, { deployment: n }),
      scriptEditor: /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
          /* @__PURE__ */ b.jsxs("label", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ b.jsx(
              "input",
              {
                type: "checkbox",
                checked: D,
                onChange: (V) => z(V.target.checked)
              }
            ),
            "Quick mode (no character mapping required)"
          ] }),
          D && /* @__PURE__ */ b.jsx(
            WD,
            {
              deploymentId: n.deploymentId,
              initialVoiceAssetId: n.defaultVoiceAssetId ?? null
            }
          )
        ] }),
        /* @__PURE__ */ b.jsx(
          nN,
          {
            value: o,
            onChange: c,
            outputFormat: d,
            mappings: L,
            deploymentId: n.deploymentId
          }
        )
      ] }),
      emotionPanel: /* @__PURE__ */ b.jsx(
        YD,
        {
          value: y,
          onChange: v,
          deploymentId: n.deploymentId
        }
      ),
      settingsPanel: /* @__PURE__ */ b.jsx(
        KD,
        {
          outputFormat: d,
          onOutputFormatChange: h,
          speedFactor: p,
          onSpeedFactorChange: m,
          cachePolicy: R,
          onCachePolicyChange: C,
          generation: S,
          onGenerationChange: T
        }
      ),
      runPanel: /* @__PURE__ */ b.jsx(
        eN,
        {
          deploymentId: n.deploymentId,
          createPayload: B,
          canGenerate: o.trim().length > 0
        }
      ),
      historyPanel: /* @__PURE__ */ b.jsx(ZD, { runs: l, deploymentId: n.deploymentId })
    }
  );
}
const U0 = 32, V0 = -30, B0 = -6, H0 = 0.5, q0 = 2;
class Mu extends Error {
  constructor(a, l) {
    super(l), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function sN(n, a, l) {
  const s = `/voice-assets/${encodeURIComponent(n)}/edit?deploymentId=${encodeURIComponent(a)}`, o = `${zl}${s}`, c = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l)
  });
  if (c.status === 409) {
    const d = await c.json().catch(() => null), h = d?.error?.current_digest ?? "", p = d?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Mu(h, p);
  }
  if (!c.ok) {
    const h = (await c.json().catch(() => null))?.error?.message ?? `apply failed: ${c.status}`;
    throw new Error(h);
  }
  return await c.json();
}
async function oN(n, a, l, s) {
  const o = `/deployments/${encodeURIComponent(n)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(l)}/edit`, c = `${zl}${o}`, d = await fetch(c, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s)
  });
  if (d.status === 409) {
    const h = await d.json().catch(() => null), p = h?.error?.current_digest ?? "", m = h?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Mu(p, m);
  }
  if (!d.ok) {
    const p = (await d.json().catch(() => null))?.error?.message ?? `apply failed: ${d.status}`;
    throw new Error(p);
  }
  return await d.json();
}
async function uN(n, a, l) {
  const s = `${zl}/voice-assets/${encodeURIComponent(n)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
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
function Ul() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Dx(n, a) {
  if (n.version !== 1)
    return { message: "Unsupported chain version." };
  if (n.ops.length > U0)
    return {
      message: `Chain exceeds the maximum of ${U0} operations.`
    };
  for (const l of n.ops) {
    const s = cN(l, a);
    if (s) return s;
  }
  return null;
}
function cN(n, a) {
  switch (n.mode) {
    case "trim":
    case "crop":
    case "mute":
      return fN(n.id, n.start_ms, n.end_ms, a);
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
function fN(n, a, l, s) {
  return a < 0 ? { opId: n, message: "Start must be ≥ 0 ms." } : l <= a ? { opId: n, message: "End must be greater than start." } : s > 0 && l > s ? { opId: n, message: "End extends past source duration." } : null;
}
function dN(n, a) {
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
    return s({ peaks: null, isLoading: !0, error: null }), hN(n, a).then((h) => {
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
async function hN(n, a) {
  const l = await fetch(n);
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const s = await l.arrayBuffer(), c = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(s.slice(0));
  return mN(c, a);
}
function mN(n, a) {
  const l = n.numberOfChannels, s = n.length, o = Math.max(1, Math.floor(s / a)), c = new Float32Array(a), d = [];
  for (let h = 0; h < l; h += 1) d.push(n.getChannelData(h));
  for (let h = 0; h < a; h += 1) {
    const p = h * o, m = Math.min(s, p + o);
    let y = 0;
    for (let v = p; v < m; v += 1) {
      let S = 0;
      for (let R = 0; R < l; R += 1) {
        const C = d[R];
        C && (S += Math.abs(C[v] ?? 0));
      }
      const T = S / l;
      T > y && (y = T);
    }
    c[h] = y;
  }
  return c;
}
var pN = "mquzal0", yN = "mquzal1", k0 = "mquzal2", P0 = "mquzal3", Y0 = "mquzal4", gN = "mquzal5", G0 = "mquzal6", F0 = "mquzal7";
const vN = 120, bN = 720;
function Nx(n) {
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
    width: y = bN,
    height: v = vN
  } = n, S = x.useRef(null), T = x.useRef(null), R = x.useRef(null), C = dN(a, y);
  x.useEffect(() => {
    SN(S.current, C.peaks, y, v);
  }, [C.peaks, y, v]);
  const D = x.useCallback(
    (J) => {
      const j = T.current?.getBoundingClientRect();
      if (!j || j.width <= 0) return 0;
      const X = Math.max(0, Math.min(1, (J - j.left) / j.width));
      return Math.round(X * l);
    },
    [l]
  );
  x.useEffect(() => {
    const J = (X) => {
      if (!R.current) return;
      const Q = D(X.clientX);
      R.current === "start" ? c(qo(Q, 0, o - 1)) : d(qo(Q, s + 1, l));
    }, j = () => {
      R.current = null;
    };
    return window.addEventListener("pointermove", J), window.addEventListener("pointerup", j), () => {
      window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", j);
    };
  }, [D, l, o, s, c, d]);
  const z = (J) => (j) => {
    j.preventDefault(), R.current = J;
  }, B = (J) => {
    !m || J.target.dataset.handle || m(D(J.clientX));
  }, L = (J) => (j) => {
    const X = j.shiftKey ? 100 : j.ctrlKey ? 1 : 10;
    let Q = 0;
    if (j.key === "ArrowLeft") Q = -X;
    else if (j.key === "ArrowRight") Q = X;
    else return;
    j.preventDefault(), J === "start" ? c(qo(s + Q, 0, o - 1)) : d(qo(o + Q, s + 1, l));
  }, V = gd(s, l), K = gd(o, l), ee = gd(p, l);
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      ref: T,
      className: pN,
      style: { height: v },
      onPointerDown: B,
      children: [
        /* @__PURE__ */ b.jsx(
          "canvas",
          {
            ref: S,
            width: y,
            height: v,
            className: yN,
            "aria-label": "Audio waveform"
          }
        ),
        C.isLoading && /* @__PURE__ */ b.jsx("div", { className: F0, children: "Decoding waveform…" }),
        C.error && /* @__PURE__ */ b.jsx("div", { className: F0, role: "alert", children: C.error }),
        /* @__PURE__ */ b.jsx("div", { className: G0, style: { left: 0, width: `${V}%` } }),
        /* @__PURE__ */ b.jsx(
          "div",
          {
            className: G0,
            style: { left: `${K}%`, right: 0, width: `${100 - K}%` }
          }
        ),
        /* @__PURE__ */ b.jsxs(
          "div",
          {
            className: k0,
            style: { left: `${V}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: z("start"),
            onKeyDown: L("start"),
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
            style: { left: `${K}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": l,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: z("end"),
            onKeyDown: L("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ b.jsx("span", { className: P0, "aria-hidden": "true" }),
              /* @__PURE__ */ b.jsx("span", { className: Y0, "aria-hidden": "true" })
            ]
          }
        ),
        h && /* @__PURE__ */ b.jsx("div", { className: gN, style: { left: `${ee}%` }, "aria-hidden": "true" })
      ]
    }
  );
}
function gd(n, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, n / a * 100));
}
function qo(n, a, l) {
  return Math.max(a, Math.min(l, n));
}
function SN(n, a, l, s) {
  if (!n) return;
  const o = n.getContext("2d");
  if (!o || (o.clearRect(0, 0, l, s), !a || a.length === 0)) return;
  const c = s / 2;
  o.fillStyle = xN(n, "--color-primary", "#ba9eff");
  const d = Math.min(a.length, l);
  for (let h = 0; h < d; h += 1) {
    const p = a[h] ?? 0, m = Math.max(1, p * (s - 4));
    o.fillRect(h, c - m / 2, 1, m);
  }
}
function xN(n, a, l) {
  return getComputedStyle(n).getPropertyValue(a).trim() || l;
}
var EN = "r8lfsm0", TN = "r8lfsm1", RN = "r8lfsm2", CN = "r8lfsm3", MN = "r8lfsm4", wN = "r8lfsm5", AN = "r8lfsm6", jN = "r8lfsm7", DN = "r8lfsm8", NN = "r8lfsm9", zN = "r8lfsma", ON = "r8lfsmb";
const X0 = -16, _N = 80, LN = 720;
function UN(n) {
  const { deploymentId: a, runId: l, utterance: s, audioUrl: o, onApplied: c, onError: d, onCancel: h } = n, p = s.durationMs ?? 0, [m, y] = x.useState(() => $0(p)), [v, S] = x.useState(!1), [T, R] = x.useState(null), [C, D] = x.useState(!1);
  x.useEffect(() => {
    y($0(p)), S(!1), R(null);
  }, [s.utteranceId, p]);
  const z = x.useMemo(
    () => m.ops.find((X) => X.mode === "trim"),
    [m.ops]
  ), B = z?.start_ms ?? 0, L = z?.end_ms ?? Math.max(1, p), V = x.useCallback((X, Q) => {
    y((ue) => VN(ue, "trim", (I) => ({
      ...I,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(X)),
      end_ms: Math.max(Math.floor(X) + 1, Math.floor(Q))
    })));
  }, []), K = x.useCallback((X) => V(X, L), [L, V]), ee = x.useCallback((X) => V(B, X), [B, V]), J = x.useCallback((X) => {
    S(X), y((Q) => {
      const ue = Q.ops.filter((I) => I.mode !== "normalize");
      if (X) {
        const I = {
          id: Ul(),
          mode: "normalize",
          target_lufs: X0
        };
        return { ...Q, ops: [...ue, I] };
      }
      return { ...Q, ops: ue };
    });
  }, []), j = x.useCallback(async () => {
    const X = Dx(m, p);
    if (X) {
      R(X.message);
      return;
    }
    R(null), D(!0);
    try {
      const Q = await oN(a, l, s.utteranceId, {
        chain: m
      });
      c(Q);
    } catch (Q) {
      const ue = Q instanceof Mu ? "Edit chain has changed in another tab. Reload to continue." : Q instanceof Error ? Q.message : "apply failed";
      R(ue), d(ue);
    } finally {
      D(!1);
    }
  }, [m, p, a, l, s.utteranceId, c, d]);
  return /* @__PURE__ */ b.jsxs("div", { className: EN, children: [
    /* @__PURE__ */ b.jsxs("header", { className: TN, children: [
      /* @__PURE__ */ b.jsx("h4", { className: RN, children: "Edit segment" }),
      /* @__PURE__ */ b.jsxs("span", { className: CN, children: [
        "Source · ",
        ko(p)
      ] })
    ] }),
    /* @__PURE__ */ b.jsx(
      Nx,
      {
        audioUrl: o,
        durationMs: Math.max(1, p),
        startMs: B,
        endMs: L,
        onChangeStart: K,
        onChangeEnd: ee,
        height: _N,
        width: LN
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: MN, children: [
      /* @__PURE__ */ b.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ b.jsxs("span", { className: wN, children: [
        ko(B),
        " → ",
        ko(L),
        " · ",
        ko(L - B)
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("div", { className: AN, children: /* @__PURE__ */ b.jsxs("label", { className: jN, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "checkbox",
          checked: v,
          onChange: (X) => J(X.currentTarget.checked),
          "aria-label": "Toggle loudness normalization"
        }
      ),
      /* @__PURE__ */ b.jsxs("span", { children: [
        "Normalize to ",
        X0.toFixed(0),
        " LUFS (broadcast-friendly)"
      ] })
    ] }) }),
    /* @__PURE__ */ b.jsxs("div", { className: DN, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: NN,
          onClick: () => void j(),
          disabled: C,
          children: C ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: zN,
          onClick: h,
          disabled: C,
          children: "Cancel"
        }
      )
    ] }),
    T && /* @__PURE__ */ b.jsx("div", { className: ON, role: "alert", "aria-live": "polite", children: T })
  ] });
}
function $0(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Ul(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function VN(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Ul(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function ko(n) {
  return !Number.isFinite(n) || n < 0 ? "0.0s" : n < 1e3 ? `${Math.round(n)} ms` : `${(Math.round(n / 100) / 10).toFixed(1)}s`;
}
var BN = "jq2zyb3", HN = "jq2zyb4", qN = "jq2zyb5", kN = "jq2zyb6", PN = "jq2zyb7", YN = "jq2zyb8", GN = "jq2zyb9", FN = "jq2zyba", XN = "jq2zybb", $N = { queued: "jq2zybd jq2zybc", running: "jq2zybe jq2zybc", completed: "jq2zybf jq2zybc", failed: "jq2zybg jq2zybc", cancelled: "jq2zybh jq2zybc", partial: "jq2zybi jq2zybc" }, KN = "jq2zybj", QN = "jq2zybk", ZN = "jq2zybl", IN = "jq2zybm", JN = "jq2zybn jq2zybm", WN = "jq2zybo", ez = "jq2zybp", tz = "jq2zybq", nz = "jq2zybr", az = "jq2zybs", iz = "jq2zybt", lz = "jq2zybu", rz = "jq2zybv", sz = "jq2zybw", oz = "jq2zybx", uz = "jq2zyby", cz = "jq2zybz", fz = "jq2zyb10", dz = "jq2zyb11", hz = "jq2zyb12", mz = "jq2zyb13", pz = "jq2zyb14", yz = "jq2zyb15", gz = "jq2zyb16", vz = "jq2zyb17", bz = "jq2zyb18", Sz = "jq2zyb19", xz = { queued: "jq2zyb1b jq2zyb1a", running: "jq2zyb1c jq2zyb1a", completed: "jq2zyb1d jq2zyb1a", failed: "jq2zyb1e jq2zyb1a", cancelled: "jq2zyb1f jq2zyb1a" }, Ez = "jq2zyb1g", Tz = "jq2zyb1h", K0 = "jq2zyb1i", Rz = "jq2zyb1j", Cz = "jq2zyb1k", Mz = "jq2zyb1l", wz = "jq2zyb1m";
const Az = ["cancelled", "failed", "partial"], jz = 2600;
function Dz() {
  const { run: n } = rs(), a = Oi(), [l, s] = x.useState(n), [o, c] = x.useState(!1), [d, h] = x.useState(null), [p, m] = x.useState(null), [y, v] = x.useState(null);
  x.useEffect(() => {
    s(n);
  }, [n]), x.useEffect(() => {
    if (!y) return;
    const V = setTimeout(() => v(null), jz);
    return () => clearTimeout(V);
  }, [y]);
  const S = x.useMemo(() => Oz(l), [l]), T = Az.includes(l.status) && l.kind === "batch", R = (l.exportZipStaleAt ?? null) !== null, C = async () => {
    if (l.deploymentId) {
      c(!0), h(null);
      try {
        const { runId: V } = await dh(l.deploymentId, l.runId);
        a(`/${l.deploymentId}/runs/${V}`);
      } catch (V) {
        h(Uz(V));
      } finally {
        c(!1);
      }
    }
  }, D = x.useCallback((V) => {
    m((K) => K === V ? null : V);
  }, []), z = x.useCallback(() => {
    m(null);
  }, []), B = x.useCallback(
    (V, K) => {
      s((ee) => zz(ee, V, K)), m(null), v("Segment edited");
    },
    []
  ), L = x.useCallback((V) => {
    v(V);
  }, []);
  return /* @__PURE__ */ b.jsxs("main", { className: BN, children: [
    /* @__PURE__ */ b.jsxs("div", { className: HN, children: [
      /* @__PURE__ */ b.jsxs("header", { className: qN, children: [
        /* @__PURE__ */ b.jsxs("p", { className: kN, children: [
          l.deploymentId ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx(ss, { to: `/${l.deploymentId}/recipe`, className: PN, children: "← Back to recipe" }),
            /* @__PURE__ */ b.jsx("span", { className: YN, children: "·" })
          ] }) : null,
          /* @__PURE__ */ b.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ b.jsxs("div", { className: GN, children: [
          /* @__PURE__ */ b.jsxs("h1", { className: FN, children: [
            _z(l.kind),
            /* @__PURE__ */ b.jsx("span", { className: XN, children: l.runId })
          ] }),
          /* @__PURE__ */ b.jsx("span", { className: $N[l.status], children: l.status })
        ] })
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: KN, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ b.jsx(Po, { label: "Format", value: l.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ b.jsx(Po, { label: "Speed", value: `${l.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ b.jsx(
          Po,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ b.jsx(
          Po,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      T && /* @__PURE__ */ b.jsxs("section", { className: ez, "aria-label": "Resume run", children: [
        /* @__PURE__ */ b.jsxs("div", { className: tz, children: [
          /* @__PURE__ */ b.jsx("p", { className: nz, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ b.jsx("p", { className: az, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            className: iz,
            disabled: o,
            onClick: () => void C(),
            children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run"
          }
        ),
        d && /* @__PURE__ */ b.jsx("p", { className: lz, role: "alert", children: d })
      ] }),
      /* @__PURE__ */ b.jsxs("section", { className: rz, "aria-label": "Utterances", children: [
        /* @__PURE__ */ b.jsxs("div", { className: sz, children: [
          /* @__PURE__ */ b.jsx("h2", { className: oz, children: "Utterances" }),
          S.completed > 0 && /* @__PURE__ */ b.jsxs("span", { className: uz, children: [
            /* @__PURE__ */ b.jsx("span", { className: cz, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("ul", { className: fz, children: l.utterances.map((V) => {
          const K = p === V.utteranceId, ee = V.status === "completed" && V.audioArtifactRef !== null && V.audioArtifactRef !== void 0, J = V.derivedArtifactRef ?? V.audioArtifactRef ?? null, j = J ? `/api/v1/artifacts/${encodeURIComponent(J)}/download` : "", X = (V.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ b.jsxs("li", { className: hz, children: [
            /* @__PURE__ */ b.jsxs("div", { className: dz, children: [
              /* @__PURE__ */ b.jsxs("span", { className: yz, children: [
                "#",
                V.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ b.jsx("span", { className: gz, title: V.characterDisplay, children: V.characterDisplay }),
              /* @__PURE__ */ b.jsx("span", { className: vz, title: V.text, children: V.text }),
              /* @__PURE__ */ b.jsxs("span", { className: bz, children: [
                V.cacheHit && /* @__PURE__ */ b.jsx("span", { className: Sz, children: "cached" }),
                X && /* @__PURE__ */ b.jsx("span", { className: mz, children: "edited" }),
                V.durationMs ? /* @__PURE__ */ b.jsx("span", { children: Lz(V.durationMs) }) : null,
                /* @__PURE__ */ b.jsx("span", { className: xz[V.status], children: V.status }),
                ee && /* @__PURE__ */ b.jsx(
                  "button",
                  {
                    type: "button",
                    className: pz,
                    onClick: () => D(V.utteranceId),
                    "aria-expanded": K,
                    "aria-label": K ? "Close segment editor" : "Edit segment",
                    children: K ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            K && j && l.deploymentId && /* @__PURE__ */ b.jsx(
              UN,
              {
                deploymentId: l.deploymentId,
                runId: l.runId,
                utterance: V,
                audioUrl: j,
                onApplied: (Q) => B(V.utteranceId, Q),
                onError: L,
                onCancel: z
              }
            )
          ] }, V.utteranceId);
        }) })
      ] }),
      Nz(l, R)
    ] }),
    y && /* @__PURE__ */ b.jsx("div", { className: wz, role: "status", "aria-live": "polite", children: y })
  ] });
}
function Nz(n, a) {
  return !n.exportArtifactRef && !a ? null : /* @__PURE__ */ b.jsx("div", { className: Ez, children: a ? /* @__PURE__ */ b.jsxs("div", { className: Rz, children: [
    /* @__PURE__ */ b.jsx("p", { className: Cz, children: "Edits since last export" }),
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: Mz,
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ b.jsx("span", { className: K0, children: "↻" })
        ]
      }
    )
  ] }) : n.exportArtifactRef ? /* @__PURE__ */ b.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${n.exportArtifactRef}/download`,
      download: !0,
      className: Tz,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ b.jsx("span", { className: K0, children: "↓" })
      ]
    }
  ) : null });
}
function zz(n, a, l) {
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
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: QN,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ b.jsx("span", { className: ZN, children: n }),
        /* @__PURE__ */ b.jsx("span", { className: l ? JN : IN, children: a }),
        o !== void 0 && /* @__PURE__ */ b.jsx("span", { className: WN, "aria-hidden": "true" })
      ]
    }
  );
}
function Oz(n) {
  const a = n.utterances.length, l = n.utterances.filter((d) => d.status === "completed").length, s = n.utterances.filter(
    (d) => d.status === "failed" || d.status === "cancelled"
  ).length, o = n.utterances.filter((d) => d.cacheHit).length, c = l > 0 ? Math.round(o / l * 100) : 0;
  return { total: a, completed: l, failed: s, cached: o, cacheRatio: c };
}
function _z(n) {
  switch (n) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Lz(n) {
  return n < 1e3 ? `${n} ms` : `${(n / 1e3).toFixed(n < 1e4 ? 2 : 1)} s`;
}
function Uz(n) {
  return n instanceof _i ? `${n.category}: ${n.message}` : n instanceof Error ? n.message : "Unexpected error";
}
var Vz = "pcphqj2", Bz = "pcphqj3", Hz = "pcphqj4", qz = "pcphqj5", kz = "pcphqj6", Pz = "pcphqj7", Yz = "pcphqj8", Gz = "pcphqj9", Q0 = "pcphqja", Fz = "pcphqjb", Z0 = "pcphqjc", Xz = "pcphqjd", $z = "pcphqje", Kz = "pcphqjf pcphqje", Qz = "pcphqjg", Zz = "pcphqjh", Iz = "pcphqji", Jz = "pcphqjj", Wz = "pcphqjk pcphqjj", eO = "pcphqjl pcphqjj", tO = "pcphqjm pcphqjj", nO = "pcphqjn", vd = "pcphqjo", bd = "pcphqjp", aO = "pcphqjq", iO = "pcphqjr", lO = "pcphqjs", rO = "pcphqjt", sO = "pcphqju";
function oO() {
  const [n, a] = x.useState(null), [l, s] = x.useState(null);
  return x.useEffect(() => {
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
  }, []), /* @__PURE__ */ b.jsx("main", { className: Vz, children: /* @__PURE__ */ b.jsxs("div", { className: Bz, children: [
    /* @__PURE__ */ b.jsxs("header", { className: Hz, children: [
      /* @__PURE__ */ b.jsx("p", { className: qz, children: "Runtime" }),
      /* @__PURE__ */ b.jsxs("div", { className: kz, children: [
        /* @__PURE__ */ b.jsx("h1", { className: Pz, children: "Queue" }),
        /* @__PURE__ */ b.jsx("span", { className: Yz, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ b.jsx("p", { className: Gz, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    l ? /* @__PURE__ */ b.jsx("section", { className: sO, role: "alert", children: l }) : n === null ? null : n.length === 0 ? /* @__PURE__ */ b.jsx("section", { className: Q0, children: /* @__PURE__ */ b.jsxs("div", { className: aO, children: [
      /* @__PURE__ */ b.jsx("span", { className: iO, children: "○" }),
      /* @__PURE__ */ b.jsx("p", { className: lO, children: "Queue is quiet" }),
      /* @__PURE__ */ b.jsx("p", { className: rO, children: "No runs are pending. Start a synthesis from a deployment's recipe surface." })
    ] }) }) : /* @__PURE__ */ b.jsx("section", { className: Q0, "aria-label": "Queued runs", children: /* @__PURE__ */ b.jsx("ul", { className: Fz, children: n.map((o) => {
      const c = o.position === 1;
      return /* @__PURE__ */ b.jsxs(
        "li",
        {
          className: c ? `${Z0} ${Xz}` : Z0,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: c ? Kz : $z, children: o.position }),
            /* @__PURE__ */ b.jsxs("span", { className: Qz, children: [
              /* @__PURE__ */ b.jsx("span", { className: Zz, children: o.deploymentName ?? o.deploymentId }),
              /* @__PURE__ */ b.jsx("span", { className: Iz, children: o.runId })
            ] }),
            /* @__PURE__ */ b.jsx("span", { className: uO(o.kind), children: cO(o.kind) }),
            /* @__PURE__ */ b.jsx("span", { className: nO, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: vd, children: fO(o.etaSeconds) }),
              /* @__PURE__ */ b.jsx("span", { className: bd, children: "eta" })
            ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: vd, children: o.utteranceTotal }),
              /* @__PURE__ */ b.jsx("span", { className: bd, children: "lines" })
            ] }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
              /* @__PURE__ */ b.jsx("span", { className: vd, children: "—" }),
              /* @__PURE__ */ b.jsx("span", { className: bd, children: "pending" })
            ] }) })
          ]
        },
        o.runId
      );
    }) }) })
  ] }) });
}
function uO(n) {
  switch (n) {
    case "batch":
      return Wz;
    case "test_line":
      return eO;
    case "resume":
      return tO;
    default:
      return Jz;
  }
}
function cO(n) {
  switch (n) {
    case "test_line":
      return "test line";
    default:
      return n;
  }
}
function fO(n) {
  if (n < 60) return `${n}s`;
  const a = Math.floor(n / 60), l = n % 60;
  return l === 0 ? `${a}m` : `${a}m ${l}s`;
}
function dO() {
  const { deploymentId: n, prefillCharacterName: a } = rs(), l = Oi(), [s, o] = x.useState(a), [c, d] = x.useState(""), [h, p] = x.useState("none"), [m, y] = x.useState(!1), [v, S] = x.useState(null), T = x.useRef(null);
  x.useEffect(() => {
    T.current?.scrollIntoView({ behavior: "smooth", block: "center" }), T.current?.focus();
  }, []);
  const R = async (C) => {
    C.preventDefault(), y(!0), S(null);
    try {
      await Lb(n, {
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
  return /* @__PURE__ */ b.jsxs("main", { children: [
    /* @__PURE__ */ b.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ b.jsxs("form", { onSubmit: R, children: [
      /* @__PURE__ */ b.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ b.jsx(
          "input",
          {
            ref: T,
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
var hO = "_1o3ytop0", mO = "_1o3ytop1", pO = "_1o3ytop2", yO = "_1o3ytop3", Sd = "_1o3ytop4", gO = "_1o3ytop5", vO = "_1o3ytop6", I0 = "_1o3ytop7", bO = "_1o3ytop8", SO = "_1o3ytop9", xO = "_1o3ytopa", EO = "_1o3ytopb", TO = "_1o3ytopc", RO = "_1o3ytopd", CO = "_1o3ytope", MO = "_1o3ytopf", wO = "_1o3ytopg", AO = "_1o3ytoph", jO = "_1o3ytopi", DO = "_1o3ytopj", NO = "_1o3ytopk", zO = "_1o3ytopl";
const J0 = -16;
function OO(n) {
  const { voiceAsset: a, deploymentId: l, onChainPersisted: s, onError: o } = n, c = a.durationMs ?? 0, d = x.useMemo(
    () => LO(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [h, p] = x.useState(() => xd(c)), [m, y] = x.useState(!1), [v, S] = x.useState(null), [T, R] = x.useState(null), [C, D] = x.useState(!1), [z, B] = x.useState(!1), [L, V] = x.useState(null), K = x.useRef(null);
  x.useEffect(() => {
    p(xd(c)), y(!1), S(null);
  }, [a.voiceAssetId, c]), x.useEffect(() => () => {
    T && URL.revokeObjectURL(T);
  }, [T]);
  const ee = h.ops.find((le) => le.mode === "trim"), J = h.ops.find((le) => le.mode === "normalize"), j = ee?.start_ms ?? 0, X = ee?.end_ms ?? Math.max(1, c), Q = x.useCallback((le, M) => {
    p((G) => W0(G, "trim", (ie) => ({
      ...ie,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(le)),
      end_ms: Math.max(Math.floor(le) + 1, Math.floor(M))
    })));
  }, []), ue = x.useCallback(
    (le) => Q(le, X),
    [X, Q]
  ), I = x.useCallback(
    (le) => Q(j, le),
    [j, Q]
  ), F = x.useCallback(
    (le) => {
      y(le), p((M) => {
        const G = M.ops.filter((ie) => ie.mode !== "normalize");
        if (le) {
          const ie = {
            id: Ul(),
            mode: "normalize",
            target_lufs: J0
          };
          return { ...M, ops: [...G, ie] };
        }
        return { ...M, ops: G };
      });
    },
    []
  ), oe = x.useCallback((le) => {
    p((M) => ({ ...M, ops: M.ops.filter((G) => G.id !== le) }));
  }, []), te = x.useCallback(() => {
    const le = Dx(h, c);
    return le ? (S(le.message), !1) : (S(null), !0);
  }, [h, c]), O = x.useCallback(async () => {
    if (te()) {
      B(!0);
      try {
        const le = await uN(a.voiceAssetId, l, h);
        T && URL.revokeObjectURL(T);
        const M = URL.createObjectURL(le);
        R(M), requestAnimationFrame(() => K.current?.play().catch(() => {
        }));
      } catch (le) {
        const M = le instanceof Error ? le.message : "preview failed";
        S(M), o(M);
      } finally {
        B(!1);
      }
    }
  }, [te, a.voiceAssetId, l, h, T, o]), ne = x.useCallback(async () => {
    if (te()) {
      D(!0);
      try {
        const le = await sN(a.voiceAssetId, l, {
          chain: h
        });
        S(null), V(le.measured_lufs ?? null), s(le);
      } catch (le) {
        const M = le instanceof Mu ? "Edit chain has changed in another tab. Reload to continue." : le instanceof Error ? le.message : "apply failed";
        S(M), o(M);
      } finally {
        D(!1);
      }
    }
  }, [te, a.voiceAssetId, l, h, s, o]), se = x.useCallback(() => {
    p(xd(c)), y(!1), S(null), V(null), T && (URL.revokeObjectURL(T), R(null));
  }, [c, T]), ce = x.useCallback((le) => {
    p((M) => W0(M, "normalize", (G) => ({
      ...G,
      mode: "normalize",
      target_lufs: le
    })));
  }, []);
  return /* @__PURE__ */ b.jsxs("div", { className: hO, children: [
    /* @__PURE__ */ b.jsxs("header", { className: mO, children: [
      /* @__PURE__ */ b.jsxs("h3", { className: pO, children: [
        "Edit · ",
        a.displayName
      ] }),
      /* @__PURE__ */ b.jsxs("span", { className: yO, children: [
        "Source · ",
        Pn(c)
      ] })
    ] }),
    /* @__PURE__ */ b.jsx(
      Nx,
      {
        audioUrl: d,
        durationMs: Math.max(1, c),
        startMs: j,
        endMs: X,
        onChangeStart: ue,
        onChangeEnd: I
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: Sd, children: [
      /* @__PURE__ */ b.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ b.jsxs("span", { className: gO, children: [
        Pn(j),
        " → ",
        Pn(X),
        " · ",
        Pn(X - j)
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: vO, children: [
      /* @__PURE__ */ b.jsxs("div", { className: I0, children: [
        /* @__PURE__ */ b.jsxs("span", { className: Sd, children: [
          /* @__PURE__ */ b.jsx("span", { children: "Normalize loudness" }),
          m && J && /* @__PURE__ */ b.jsxs("span", { className: DO, children: [
            "target ",
            J.target_lufs.toFixed(1),
            " LUFS",
            L !== null && ` · measured ${L.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: bO, children: [
          /* @__PURE__ */ b.jsx(
            "input",
            {
              type: "checkbox",
              checked: m,
              onChange: (le) => F(le.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ b.jsxs("span", { children: [
            "Target ",
            J0.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        m && J && /* @__PURE__ */ b.jsx(
          "input",
          {
            type: "range",
            className: zO,
            min: -30,
            max: -6,
            step: 0.5,
            value: J.target_lufs,
            onChange: (le) => ce(Number(le.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: I0, children: [
        /* @__PURE__ */ b.jsxs("span", { className: Sd, children: [
          "Operations · ",
          h.ops.length
        ] }),
        /* @__PURE__ */ b.jsx("div", { className: SO, children: h.ops.length === 0 ? /* @__PURE__ */ b.jsx("span", { className: TO, children: "No operations yet." }) : h.ops.map((le) => /* @__PURE__ */ b.jsxs("div", { className: xO, children: [
          /* @__PURE__ */ b.jsx("span", { className: EO, children: _O(le) }),
          /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: RO,
              onClick: () => oe(le.id),
              "aria-label": `Remove ${le.mode} operation`,
              children: "Remove"
            }
          )
        ] }, le.id)) })
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: CO, children: [
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: wO,
          onClick: () => void O(),
          disabled: z || C,
          children: z ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: MO,
          onClick: () => void ne(),
          disabled: C || z,
          children: C ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: AO,
          onClick: se,
          disabled: C || z,
          children: "Reset"
        }
      )
    ] }),
    T && /* @__PURE__ */ b.jsx(
      "audio",
      {
        ref: K,
        src: T,
        controls: !0,
        className: NO,
        "aria-label": "Edit preview"
      }
    ),
    v && /* @__PURE__ */ b.jsx("div", { className: jO, role: "alert", "aria-live": "polite", children: v })
  ] });
}
function xd(n) {
  return n <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Ul(),
    mode: "trim",
    start_ms: 0,
    end_ms: n
  }] };
}
function W0(n, a, l) {
  const s = n.ops.findIndex((c) => c.mode === a);
  if (s === -1) {
    const c = { id: Ul(), mode: a };
    return { ...n, ops: [...n.ops, l(c)] };
  }
  const o = [...n.ops];
  return o[s] = l(o[s]), { ...n, ops: o };
}
function _O(n) {
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
function LO(n) {
  return n.startsWith("http://") || n.startsWith("https://") || n.startsWith("/") ? n : `/api/v1/artifacts/${encodeURIComponent(n)}`;
}
var UO = "go9vi12", VO = "go9vi13", BO = "go9vi14", HO = "go9vi15", qO = "go9vi16", kO = "go9vi17", PO = "go9vi18", YO = "go9vi19", GO = "go9vi1a go9vi19", FO = "go9vi1b", XO = "go9vi1c", $O = "go9vi1d", KO = "go9vi1e", QO = "go9vi1f", ZO = "go9vi1g", IO = "go9vi1h", JO = "go9vi1i", WO = "go9vi1j", e3 = "go9vi1k", pu = "go9vi1l", Ti = "go9vi1m", qr = "go9vi1n", Al = "go9vi1o", t3 = "go9vi1p go9vi1o", n3 = "go9vi1q", a3 = "go9vi1r go9vi1q", i3 = "go9vi1s go9vi1q", l3 = "go9vi1t", r3 = "go9vi1u", s3 = "go9vi1v", o3 = "go9vi1w", u3 = "go9vi1x", c3 = "go9vi1y", zx = "go9vi1z", Ox = "go9vi110", eb = "go9vi111 go9vi110", f3 = "go9vi112 go9vi110", d3 = "go9vi113", h3 = "go9vi114", m3 = "go9vi115", p3 = "go9vi116 go9vi1o", y3 = "go9vi117", g3 = "go9vi118";
const v3 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function b3() {
  const { deployment: n, mappings: a, voiceAssets: l } = rs(), [s, o] = x.useState(a), [c, d] = x.useState(l), [h, p] = x.useState(
    a[0]?.mappingId ?? null
  ), [m, y] = x.useState(""), [v, S] = x.useState(null), [T, R] = x.useState(null), C = x.useMemo(() => {
    const F = /* @__PURE__ */ new Map();
    for (const oe of c) F.set(oe.voiceAssetId, oe);
    return F;
  }, [c]), D = x.useMemo(() => {
    const F = m.trim().toLowerCase();
    return F ? s.filter((oe) => oe.characterName.toLowerCase().includes(F)) : s;
  }, [s, m]), z = x.useMemo(
    () => s.find((F) => F.mappingId === h) ?? null,
    [s, h]
  );
  x.useEffect(() => {
    o(a), d(l), p(a[0]?.mappingId ?? null);
  }, [a, l]), x.useEffect(() => {
    if (!T) return;
    const F = setTimeout(() => R(null), 2600);
    return () => clearTimeout(F);
  }, [T]);
  const B = x.useCallback(async () => {
    const F = await au(n.deploymentId);
    d(F.voiceAssets);
  }, [n.deploymentId]), L = x.useCallback(
    (F) => {
      o(
        (oe) => oe.map((te) => te.mappingId === h ? { ...te, ...F } : te)
      );
    },
    [h]
  ), V = x.useCallback(
    async (F) => {
      if (!z) return;
      const oe = z;
      try {
        const te = await TC(n.deploymentId, z.mappingId, F);
        o((O) => O.map((ne) => ne.mappingId === te.mappingId ? te : ne));
      } catch (te) {
        o(
          (O) => O.map((ne) => ne.mappingId === oe.mappingId ? oe : ne)
        ), S(Ri(te));
      }
    },
    [z, n.deploymentId]
  ), K = x.useCallback(async () => {
    const F = c[0];
    if (!F) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const oe = C3(s), te = await Lb(n.deploymentId, {
        characterName: oe,
        speakerVoiceAssetId: F.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((O) => [...O, te]), p(te.mappingId);
    } catch (oe) {
      S(Ri(oe));
    }
  }, [n.deploymentId, c, s]), ee = x.useCallback(async () => {
    if (z && confirm(`Deactivate mapping for ${z.characterName}?`))
      try {
        await RC(n.deploymentId, z.mappingId), o((F) => F.filter((oe) => oe.mappingId !== z.mappingId)), p(null), R(`Mapping for ${z.characterName} deactivated.`);
      } catch (F) {
        S(Ri(F));
      }
  }, [n.deploymentId, z]), J = x.useCallback(
    async (F, oe, te) => {
      try {
        const O = await NC(n.deploymentId, F, oe, te);
        return d((ne) => [O, ...ne]), R(`${O.displayName} uploaded.`), O;
      } catch (O) {
        return S(Ri(O)), null;
      }
    },
    [n.deploymentId]
  ), j = x.useCallback(async () => {
    try {
      const F = await CC(n.deploymentId);
      N3(F, `${n.deploymentId}-mappings.json`), R("Mappings exported to JSON.");
    } catch (F) {
      S(Ri(F));
    }
  }, [n.deploymentId]), X = x.useCallback(
    async (F, oe) => {
      try {
        const te = await MC(
          n.deploymentId,
          F.mappings,
          oe
        );
        R(
          `Imported ${te.created.length} • skipped ${te.skipped.length} • replaced ${te.replaced.length}.`
        );
        const O = await au(n.deploymentId);
        d(O.voiceAssets);
      } catch (te) {
        S(Ri(te));
      }
    },
    [n.deploymentId]
  ), Q = x.useCallback(
    async (F) => {
      await B(), R("Edit applied.");
    },
    [B]
  ), ue = x.useCallback((F) => {
    S(F);
  }, []), I = x.useCallback(
    async (F, oe) => {
      if (!z) return null;
      const te = F.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await DC(n.deploymentId, {
          line: te,
          outputFormat: oe
        })).runId };
      } catch (O) {
        return S(Ri(O)), null;
      }
    },
    [n.deploymentId, z]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: UO, children: [
    /* @__PURE__ */ b.jsxs("aside", { className: VO, "aria-label": "Character mappings", children: [
      /* @__PURE__ */ b.jsxs("header", { className: BO, children: [
        /* @__PURE__ */ b.jsxs("div", { children: [
          /* @__PURE__ */ b.jsx("h1", { className: HO, children: "Mappings" }),
          /* @__PURE__ */ b.jsxs("span", { className: qO, children: [
            s.length,
            " active · ",
            c.length,
            " voice",
            c.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ b.jsx("button", { type: "button", className: Ox, onClick: K, children: "+ Add" })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "search",
          className: kO,
          placeholder: "Search characters",
          value: m,
          onChange: (F) => y(F.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ b.jsx(R3, { onExport: j, onImport: X }),
      /* @__PURE__ */ b.jsx("div", { className: PO, children: D.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: QO, children: "No mappings yet. Click Add to create one." }) : D.map((F) => {
        const oe = C.get(F.speakerVoiceAssetId), te = F.mappingId === h;
        return /* @__PURE__ */ b.jsxs(
          "button",
          {
            type: "button",
            className: te ? GO : YO,
            onClick: () => p(F.mappingId),
            "aria-pressed": te,
            children: [
              /* @__PURE__ */ b.jsx("span", { className: FO, "aria-hidden": "true", children: M3(F.characterName) }),
              /* @__PURE__ */ b.jsxs("span", { className: XO, children: [
                /* @__PURE__ */ b.jsx("span", { className: $O, children: F.characterName }),
                /* @__PURE__ */ b.jsxs("span", { className: KO, children: [
                  F.defaultEmotionMode,
                  " · ",
                  oe?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          F.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: ZO, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ b.jsx(j2, { children: T && /* @__PURE__ */ b.jsx(
        Gh.div,
        {
          className: h3,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: T
        },
        T
      ) }),
      v && /* @__PURE__ */ b.jsx("div", { className: d3, role: "alert", children: v }),
      z ? /* @__PURE__ */ b.jsx(
        x3,
        {
          deploymentId: n.deploymentId,
          mapping: z,
          voiceAssets: c,
          onNameChange: (F) => {
            L({ characterName: F });
          },
          onNameBlur: (F) => {
            F !== z.characterName && F.trim() && V({ characterName: F.trim() });
          },
          onSpeakerChange: (F) => {
            L({ speakerVoiceAssetId: F }), V({ speakerVoiceAssetId: F });
          },
          onModeChange: (F) => {
            L({ defaultEmotionMode: F }), V({ defaultEmotionMode: F });
          },
          onQwenChange: (F) => {
            L({ defaultQwenTemplate: F });
          },
          onQwenBlur: (F) => {
            V({ defaultQwenTemplate: F });
          },
          onSpeedChange: (F) => {
            L({ defaultSpeedFactor: F });
          },
          onSpeedCommit: (F) => {
            V({ defaultSpeedFactor: F });
          },
          onEmotionVoiceChange: (F) => {
            const oe = F || null;
            L({ defaultEmotionVoiceAssetId: oe }), V({ defaultEmotionVoiceAssetId: oe });
          },
          onDelete: ee,
          onUploadVoice: async (F, oe, te) => {
            const O = await J(F, oe, te);
            return O && te === "speaker" && (L({ speakerVoiceAssetId: O.voiceAssetId }), V({ speakerVoiceAssetId: O.voiceAssetId })), await B(), O;
          },
          onTestLine: I,
          onEditChainPersisted: Q,
          onEditError: ue
        }
      ) : /* @__PURE__ */ b.jsx(
        S3,
        {
          voiceCount: c.length,
          onUploadVoice: async (F) => {
            await J(F, F.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function S3({ voiceCount: n, onUploadVoice: a }) {
  return n === 0 ? /* @__PURE__ */ b.jsxs("div", { className: pu, style: { padding: "3rem 2rem" }, children: [
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
      _x,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (l) => (await a(l), null)
      }
    )
  ] }) : /* @__PURE__ */ b.jsx("div", { className: pu, style: { textAlign: "center", padding: "4rem" }, children: /* @__PURE__ */ b.jsxs("p", { style: { fontFamily: "var(--font)", fontSize: "1.1rem", color: "var(--text-muted)" }, children: [
    "Select a character on the left, or click ",
    /* @__PURE__ */ b.jsx("strong", { children: "+ Add" }),
    " to create one."
  ] }) });
}
function x3(n) {
  const { mapping: a, voiceAssets: l } = n, s = l.find((R) => R.voiceAssetId === a.speakerVoiceAssetId) ?? null, o = l.find((R) => R.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [c, d] = x.useState(""), [h, p] = x.useState("mp3"), [m, y] = x.useState("idle"), [v, S] = x.useState(null), T = x.useCallback(async () => {
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
        const z = await fh(n.deploymentId, C);
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
    /* @__PURE__ */ b.jsxs("header", { className: IO, children: [
      /* @__PURE__ */ b.jsxs("div", { children: [
        /* @__PURE__ */ b.jsx("span", { className: WO, children: "Character" }),
        /* @__PURE__ */ b.jsx("h2", { className: JO, children: a.characterName })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: zx, children: /* @__PURE__ */ b.jsx("button", { type: "button", className: f3, onClick: n.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: m3, children: [
      /* @__PURE__ */ b.jsx(
        "input",
        {
          type: "text",
          className: p3,
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
          className: Ox,
          onClick: () => void T(),
          disabled: m === "running",
          children: m === "running" ? "Synthesising…" : "Test this line"
        }
      ),
      m === "done" && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-success, #4caf50)" }, children: "Synthesised — see host logs for the output file path." }),
      m === "error" && v && /* @__PURE__ */ b.jsx("span", { style: { marginLeft: 12, color: "var(--color-error, crimson)" }, children: v })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: e3, children: [
      /* @__PURE__ */ b.jsxs("div", { className: pu, children: [
        /* @__PURE__ */ b.jsxs("label", { className: qr, children: [
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
        /* @__PURE__ */ b.jsxs("label", { className: qr, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion mode" }),
          /* @__PURE__ */ b.jsx(
            "select",
            {
              className: Al,
              value: a.defaultEmotionMode,
              onChange: (R) => n.onModeChange(R.currentTarget.value),
              children: v3.map((R) => /* @__PURE__ */ b.jsx("option", { value: R, children: w3(R) }, R))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ b.jsxs("label", { className: qr, children: [
          /* @__PURE__ */ b.jsxs("span", { className: Ti, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ b.jsx(
            "textarea",
            {
              className: t3,
              value: a.defaultQwenTemplate ?? "",
              onChange: (R) => n.onQwenChange(R.currentTarget.value),
              onBlur: (R) => n.onQwenBlur(R.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ b.jsxs("label", { className: qr, children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference" }),
          /* @__PURE__ */ b.jsxs(
            "select",
            {
              className: Al,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (R) => n.onEmotionVoiceChange(R.currentTarget.value),
              children: [
                /* @__PURE__ */ b.jsx("option", { value: "", children: "— none —" }),
                l.map((R) => /* @__PURE__ */ b.jsxs("option", { value: R.voiceAssetId, children: [
                  R.displayName,
                  " · ",
                  R.kind
                ] }, R.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ b.jsxs("label", { className: qr, children: [
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
      /* @__PURE__ */ b.jsxs("div", { className: pu, children: [
        /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Speaker reference" }),
        /* @__PURE__ */ b.jsx(
          E3,
          {
            value: a.speakerVoiceAssetId,
            voices: l,
            onChange: n.onSpeakerChange
          }
        ),
        s && /* @__PURE__ */ b.jsx(tb, { voice: s }),
        /* @__PURE__ */ b.jsx(
          _x,
          {
            label: s ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (R) => n.onUploadVoice(R, R.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        s && /* @__PURE__ */ b.jsx(
          OO,
          {
            voiceAsset: s,
            deploymentId: n.deploymentId,
            onChainPersisted: n.onEditChainPersisted,
            onError: n.onEditError
          }
        ),
        o && /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
          /* @__PURE__ */ b.jsx("span", { className: Ti, children: "Emotion reference voice" }),
          /* @__PURE__ */ b.jsx(tb, { voice: o })
        ] })
      ] })
    ] })
  ] });
}
function E3({
  value: n,
  voices: a,
  onChange: l
}) {
  return /* @__PURE__ */ b.jsxs(
    "select",
    {
      className: Al,
      value: n,
      onChange: (s) => l(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ b.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ b.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function tb({ voice: n }) {
  const a = A3(n.durationMs ?? null);
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs("div", { className: l3, children: [
      /* @__PURE__ */ b.jsx("span", { children: n.displayName }),
      /* @__PURE__ */ b.jsx("span", { children: n.kind }),
      n.durationMs != null && /* @__PURE__ */ b.jsx("span", { children: j3(n.durationMs) }),
      n.sampleRate && /* @__PURE__ */ b.jsxs("span", { children: [
        n.sampleRate,
        " Hz"
      ] })
    ] }),
    n.durationMs != null && /* @__PURE__ */ b.jsxs("div", { className: r3, children: [
      /* @__PURE__ */ b.jsx("div", { className: s3, children: /* @__PURE__ */ b.jsx(
        Gh.div,
        {
          className: o3,
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
          className: a.level === "warn" ? u3 : c3,
          children: a.message
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx(T3, { seed: n.contentSha256 })
  ] });
}
function T3({ seed: n }) {
  const a = x.useMemo(() => D3(n, 48), [n]);
  return /* @__PURE__ */ b.jsx("div", { className: y3, "aria-hidden": "true", children: a.map((l, s) => /* @__PURE__ */ b.jsx(
    "span",
    {
      className: g3,
      style: { height: `${Math.max(6, l * 100)}%` }
    },
    s
  )) });
}
function _x({
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
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: o ? i3 : l ? a3 : n3,
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
function R3({
  onExport: n,
  onImport: a
}) {
  const [l, s] = x.useState("error"), o = x.useRef(null);
  return /* @__PURE__ */ b.jsxs("div", { className: zx, children: [
    /* @__PURE__ */ b.jsx("button", { type: "button", className: eb, onClick: n, children: "Export JSON" }),
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
              a(p, l);
            } catch {
              alert("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ b.jsx("button", { type: "button", className: eb, onClick: () => o.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        className: Al,
        value: l,
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
function C3(n) {
  const a = new Set(n.map((s) => s.characterName.toLowerCase()));
  let l = n.length + 1;
  for (; a.has(`character ${l}`); ) l += 1;
  return `Character ${l}`;
}
function M3(n) {
  const a = n.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function w3(n) {
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
function A3(n) {
  return n == null ? null : n < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : n > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : n > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function j3(n) {
  return n < 1e3 ? `${n} ms` : `${Math.round(n / 100) / 10}s`;
}
function D3(n, a) {
  const l = [];
  for (let s = 0; s < a; s += 1) {
    const o = n.charCodeAt(s % n.length);
    l.push((o * 31 + s * 7) % 100 / 100);
  }
  return l;
}
function N3(n, a) {
  const l = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), s = URL.createObjectURL(l), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function Ri(n) {
  return n instanceof _i || n instanceof Error ? n.message : "unknown error";
}
function z3() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: n } = await xC();
        return { deployments: n };
      },
      Component: IC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId");
        return jT(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), [l, { mappings: s }, { runs: o }, c] = await Promise.all([
          dv(a),
          hv(a),
          wC(a, { limit: 10 }),
          zC(a)
        ]);
        return { deployment: l, mappings: s, runs: o, workflow: c };
      },
      Component: rN
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), l = xl(n, "runId");
        return { run: await fh(a, l) };
      },
      Component: Dz
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: n }) => {
        const a = xl(n, "deploymentId"), [l, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          dv(a),
          hv(a),
          au(a)
        ]);
        return { deployment: l, mappings: s, voiceAssets: o };
      },
      Component: b3
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: n, request: a }) => {
        const l = xl(n, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: l,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: dO
    },
    {
      path: "/runtime/queue",
      Component: oO
    }
  ];
}
function xl(n, a) {
  const l = n[a];
  if (!l)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return l;
}
const Zd = "emotion-tts-app", O3 = "ext-event", nb = "emotion-tts-stylesheet";
function _3() {
  if (typeof document > "u" || document.getElementById(nb)) return;
  const n = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = nb, a.rel = "stylesheet", a.href = n, document.head.appendChild(a);
}
_3();
class L3 extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  static get observedAttributes() {
    return ["route", "deployment-id"];
  }
  connectedCallback() {
    this.root = eT.createRoot(this), this.paint();
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
    const a = this.resolveInitialEntry(), l = UR(z3(), { initialEntries: [a] });
    this.root.render(
      /* @__PURE__ */ b.jsx(x.StrictMode, { children: /* @__PURE__ */ b.jsx(BR, { router: l }) })
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
      new CustomEvent(O3, {
        detail: { topic: a, payload: l },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function U3() {
  typeof customElements > "u" || customElements.get(Zd) || customElements.define(Zd, L3);
}
typeof customElements < "u" && !customElements.get(Zd) && U3();
export {
  U3 as register
};
//# sourceMappingURL=emotion-tts.js.map
