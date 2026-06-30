function e0(n, r) {
  for (var s = 0; s < r.length; s++) {
    const o = r[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const f in o)
        if (f !== "default" && !(f in n)) {
          const d = Object.getOwnPropertyDescriptor(o, f);
          d && Object.defineProperty(n, f, d.get ? d : {
            enumerable: !0,
            get: () => o[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function ny(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var rc = { exports: {} }, ur = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hm;
function t0() {
  if (Hm) return ur;
  Hm = 1;
  var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function s(o, f, d) {
    var m = null;
    if (d !== void 0 && (m = "" + d), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      d = {};
      for (var g in f)
        g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, {
      $$typeof: n,
      type: o,
      key: m,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return ur.Fragment = r, ur.jsx = s, ur.jsxs = s, ur;
}
var Gm;
function a0() {
  return Gm || (Gm = 1, rc.exports = t0()), rc.exports;
}
var b = a0(), uc = { exports: {} }, we = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qm;
function l0() {
  if (qm) return we;
  qm = 1;
  var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), m = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), h = Symbol.for("react.activity"), D = Symbol.iterator;
  function _(T) {
    return T === null || typeof T != "object" ? null : (T = D && T[D] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, X = Object.assign, k = {};
  function $(T, H, q) {
    this.props = T, this.context = H, this.refs = k, this.updater = q || C;
  }
  $.prototype.isReactComponent = {}, $.prototype.setState = function(T, H) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, H, "setState");
  }, $.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function P() {
  }
  P.prototype = $.prototype;
  function I(T, H, q) {
    this.props = T, this.context = H, this.refs = k, this.updater = q || C;
  }
  var pe = I.prototype = new P();
  pe.constructor = I, X(pe, $.prototype), pe.isPureReactComponent = !0;
  var me = Array.isArray;
  function te() {
  }
  var F = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function Se(T, H, q) {
    var J = q.ref;
    return {
      $$typeof: n,
      type: T,
      key: H,
      ref: J !== void 0 ? J : null,
      props: q
    };
  }
  function ce(T, H) {
    return Se(T.type, H, T.props);
  }
  function Ue(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function ve(T) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(q) {
      return H[q];
    });
  }
  var qe = /\/+/g;
  function De(T, H) {
    return typeof T == "object" && T !== null && T.key != null ? ve("" + T.key) : H.toString(36);
  }
  function Le(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(te, te) : (T.status = "pending", T.then(
          function(H) {
            T.status === "pending" && (T.status = "fulfilled", T.value = H);
          },
          function(H) {
            T.status === "pending" && (T.status = "rejected", T.reason = H);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function M(T, H, q, J, ee) {
    var oe = typeof T;
    (oe === "undefined" || oe === "boolean") && (T = null);
    var Re = !1;
    if (T === null) Re = !0;
    else
      switch (oe) {
        case "bigint":
        case "string":
        case "number":
          Re = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case r:
              Re = !0;
              break;
            case S:
              return Re = T._init, M(
                Re(T._payload),
                H,
                q,
                J,
                ee
              );
          }
      }
    if (Re)
      return ee = ee(T), Re = J === "" ? "." + De(T, 0) : J, me(ee) ? (q = "", Re != null && (q = Re.replace(qe, "$&/") + "/"), M(ee, H, q, "", function(fa) {
        return fa;
      })) : ee != null && (Ue(ee) && (ee = ce(
        ee,
        q + (ee.key == null || T && T.key === ee.key ? "" : ("" + ee.key).replace(
          qe,
          "$&/"
        ) + "/") + Re
      )), H.push(ee)), 1;
    Re = 0;
    var Te = J === "" ? "." : J + ":";
    if (me(T))
      for (var Ye = 0; Ye < T.length; Ye++)
        J = T[Ye], oe = Te + De(J, Ye), Re += M(
          J,
          H,
          q,
          oe,
          ee
        );
    else if (Ye = _(T), typeof Ye == "function")
      for (T = Ye.call(T), Ye = 0; !(J = T.next()).done; )
        J = J.value, oe = Te + De(J, Ye++), Re += M(
          J,
          H,
          q,
          oe,
          ee
        );
    else if (oe === "object") {
      if (typeof T.then == "function")
        return M(
          Le(T),
          H,
          q,
          J,
          ee
        );
      throw H = String(T), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Re;
  }
  function V(T, H, q) {
    if (T == null) return T;
    var J = [], ee = 0;
    return M(T, J, "", "", function(oe) {
      return H.call(q, oe, ee++);
    }), J;
  }
  function ne(T) {
    if (T._status === -1) {
      var H = T._result;
      H = H(), H.then(
        function(q) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = q);
        },
        function(q) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = q);
        }
      ), T._status === -1 && (T._status = 0, T._result = H);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var re = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, de = {
    map: V,
    forEach: function(T, H, q) {
      V(
        T,
        function() {
          H.apply(this, arguments);
        },
        q
      );
    },
    count: function(T) {
      var H = 0;
      return V(T, function() {
        H++;
      }), H;
    },
    toArray: function(T) {
      return V(T, function(H) {
        return H;
      }) || [];
    },
    only: function(T) {
      if (!Ue(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return we.Activity = h, we.Children = de, we.Component = $, we.Fragment = s, we.Profiler = f, we.PureComponent = I, we.StrictMode = o, we.Suspense = y, we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, we.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return F.H.useMemoCache(T);
    }
  }, we.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, we.cacheSignal = function() {
    return null;
  }, we.cloneElement = function(T, H, q) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var J = X({}, T.props), ee = T.key;
    if (H != null)
      for (oe in H.key !== void 0 && (ee = "" + H.key), H)
        !A.call(H, oe) || oe === "key" || oe === "__self" || oe === "__source" || oe === "ref" && H.ref === void 0 || (J[oe] = H[oe]);
    var oe = arguments.length - 2;
    if (oe === 1) J.children = q;
    else if (1 < oe) {
      for (var Re = Array(oe), Te = 0; Te < oe; Te++)
        Re[Te] = arguments[Te + 2];
      J.children = Re;
    }
    return Se(T.type, ee, J);
  }, we.createContext = function(T) {
    return T = {
      $$typeof: m,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: d,
      _context: T
    }, T;
  }, we.createElement = function(T, H, q) {
    var J, ee = {}, oe = null;
    if (H != null)
      for (J in H.key !== void 0 && (oe = "" + H.key), H)
        A.call(H, J) && J !== "key" && J !== "__self" && J !== "__source" && (ee[J] = H[J]);
    var Re = arguments.length - 2;
    if (Re === 1) ee.children = q;
    else if (1 < Re) {
      for (var Te = Array(Re), Ye = 0; Ye < Re; Ye++)
        Te[Ye] = arguments[Ye + 2];
      ee.children = Te;
    }
    if (T && T.defaultProps)
      for (J in Re = T.defaultProps, Re)
        ee[J] === void 0 && (ee[J] = Re[J]);
    return Se(T, oe, ee);
  }, we.createRef = function() {
    return { current: null };
  }, we.forwardRef = function(T) {
    return { $$typeof: g, render: T };
  }, we.isValidElement = Ue, we.lazy = function(T) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: T },
      _init: ne
    };
  }, we.memo = function(T, H) {
    return {
      $$typeof: v,
      type: T,
      compare: H === void 0 ? null : H
    };
  }, we.startTransition = function(T) {
    var H = F.T, q = {};
    F.T = q;
    try {
      var J = T(), ee = F.S;
      ee !== null && ee(q, J), typeof J == "object" && J !== null && typeof J.then == "function" && J.then(te, re);
    } catch (oe) {
      re(oe);
    } finally {
      H !== null && q.types !== null && (H.types = q.types), F.T = H;
    }
  }, we.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, we.use = function(T) {
    return F.H.use(T);
  }, we.useActionState = function(T, H, q) {
    return F.H.useActionState(T, H, q);
  }, we.useCallback = function(T, H) {
    return F.H.useCallback(T, H);
  }, we.useContext = function(T) {
    return F.H.useContext(T);
  }, we.useDebugValue = function() {
  }, we.useDeferredValue = function(T, H) {
    return F.H.useDeferredValue(T, H);
  }, we.useEffect = function(T, H) {
    return F.H.useEffect(T, H);
  }, we.useEffectEvent = function(T) {
    return F.H.useEffectEvent(T);
  }, we.useId = function() {
    return F.H.useId();
  }, we.useImperativeHandle = function(T, H, q) {
    return F.H.useImperativeHandle(T, H, q);
  }, we.useInsertionEffect = function(T, H) {
    return F.H.useInsertionEffect(T, H);
  }, we.useLayoutEffect = function(T, H) {
    return F.H.useLayoutEffect(T, H);
  }, we.useMemo = function(T, H) {
    return F.H.useMemo(T, H);
  }, we.useOptimistic = function(T, H) {
    return F.H.useOptimistic(T, H);
  }, we.useReducer = function(T, H, q) {
    return F.H.useReducer(T, H, q);
  }, we.useRef = function(T) {
    return F.H.useRef(T);
  }, we.useState = function(T) {
    return F.H.useState(T);
  }, we.useSyncExternalStore = function(T, H, q) {
    return F.H.useSyncExternalStore(
      T,
      H,
      q
    );
  }, we.useTransition = function() {
    return F.H.useTransition();
  }, we.version = "19.2.7", we;
}
var Ym;
function Uc() {
  return Ym || (Ym = 1, uc.exports = l0()), uc.exports;
}
var E = Uc();
const W = /* @__PURE__ */ ny(E), n0 = /* @__PURE__ */ e0({
  __proto__: null,
  default: W
}, [E]);
var sc = { exports: {} }, sr = {}, oc = { exports: {} }, cc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xm;
function i0() {
  return Xm || (Xm = 1, (function(n) {
    function r(M, V) {
      var ne = M.length;
      M.push(V);
      e: for (; 0 < ne; ) {
        var re = ne - 1 >>> 1, de = M[re];
        if (0 < f(de, V))
          M[re] = V, M[ne] = de, ne = re;
        else break e;
      }
    }
    function s(M) {
      return M.length === 0 ? null : M[0];
    }
    function o(M) {
      if (M.length === 0) return null;
      var V = M[0], ne = M.pop();
      if (ne !== V) {
        M[0] = ne;
        e: for (var re = 0, de = M.length, T = de >>> 1; re < T; ) {
          var H = 2 * (re + 1) - 1, q = M[H], J = H + 1, ee = M[J];
          if (0 > f(q, ne))
            J < de && 0 > f(ee, q) ? (M[re] = ee, M[J] = ne, re = J) : (M[re] = q, M[H] = ne, re = H);
          else if (J < de && 0 > f(ee, ne))
            M[re] = ee, M[J] = ne, re = J;
          else break e;
        }
      }
      return V;
    }
    function f(M, V) {
      var ne = M.sortIndex - V.sortIndex;
      return ne !== 0 ? ne : M.id - V.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      n.unstable_now = function() {
        return d.now();
      };
    } else {
      var m = Date, g = m.now();
      n.unstable_now = function() {
        return m.now() - g;
      };
    }
    var y = [], v = [], S = 1, h = null, D = 3, _ = !1, C = !1, X = !1, k = !1, $ = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
    function pe(M) {
      for (var V = s(v); V !== null; ) {
        if (V.callback === null) o(v);
        else if (V.startTime <= M)
          o(v), V.sortIndex = V.expirationTime, r(y, V);
        else break;
        V = s(v);
      }
    }
    function me(M) {
      if (X = !1, pe(M), !C)
        if (s(y) !== null)
          C = !0, te || (te = !0, ve());
        else {
          var V = s(v);
          V !== null && Le(me, V.startTime - M);
        }
    }
    var te = !1, F = -1, A = 5, Se = -1;
    function ce() {
      return k ? !0 : !(n.unstable_now() - Se < A);
    }
    function Ue() {
      if (k = !1, te) {
        var M = n.unstable_now();
        Se = M;
        var V = !0;
        try {
          e: {
            C = !1, X && (X = !1, P(F), F = -1), _ = !0;
            var ne = D;
            try {
              t: {
                for (pe(M), h = s(y); h !== null && !(h.expirationTime > M && ce()); ) {
                  var re = h.callback;
                  if (typeof re == "function") {
                    h.callback = null, D = h.priorityLevel;
                    var de = re(
                      h.expirationTime <= M
                    );
                    if (M = n.unstable_now(), typeof de == "function") {
                      h.callback = de, pe(M), V = !0;
                      break t;
                    }
                    h === s(y) && o(y), pe(M);
                  } else o(y);
                  h = s(y);
                }
                if (h !== null) V = !0;
                else {
                  var T = s(v);
                  T !== null && Le(
                    me,
                    T.startTime - M
                  ), V = !1;
                }
              }
              break e;
            } finally {
              h = null, D = ne, _ = !1;
            }
            V = void 0;
          }
        } finally {
          V ? ve() : te = !1;
        }
      }
    }
    var ve;
    if (typeof I == "function")
      ve = function() {
        I(Ue);
      };
    else if (typeof MessageChannel < "u") {
      var qe = new MessageChannel(), De = qe.port2;
      qe.port1.onmessage = Ue, ve = function() {
        De.postMessage(null);
      };
    } else
      ve = function() {
        $(Ue, 0);
      };
    function Le(M, V) {
      F = $(function() {
        M(n.unstable_now());
      }, V);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, n.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < M ? Math.floor(1e3 / M) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, n.unstable_next = function(M) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = D;
      }
      var ne = D;
      D = V;
      try {
        return M();
      } finally {
        D = ne;
      }
    }, n.unstable_requestPaint = function() {
      k = !0;
    }, n.unstable_runWithPriority = function(M, V) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var ne = D;
      D = M;
      try {
        return V();
      } finally {
        D = ne;
      }
    }, n.unstable_scheduleCallback = function(M, V, ne) {
      var re = n.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? re + ne : re) : ne = re, M) {
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
      return de = ne + de, M = {
        id: S++,
        callback: V,
        priorityLevel: M,
        startTime: ne,
        expirationTime: de,
        sortIndex: -1
      }, ne > re ? (M.sortIndex = ne, r(v, M), s(y) === null && M === s(v) && (X ? (P(F), F = -1) : X = !0, Le(me, ne - re))) : (M.sortIndex = de, r(y, M), C || _ || (C = !0, te || (te = !0, ve()))), M;
    }, n.unstable_shouldYield = ce, n.unstable_wrapCallback = function(M) {
      var V = D;
      return function() {
        var ne = D;
        D = V;
        try {
          return M.apply(this, arguments);
        } finally {
          D = ne;
        }
      };
    };
  })(cc)), cc;
}
var Vm;
function r0() {
  return Vm || (Vm = 1, oc.exports = i0()), oc.exports;
}
var fc = { exports: {} }, Bt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qm;
function u0() {
  if (Qm) return Bt;
  Qm = 1;
  var n = Uc();
  function r(y) {
    var v = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        v += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + y + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var o = {
    d: {
      f: s,
      r: function() {
        throw Error(r(522));
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
  }, f = Symbol.for("react.portal");
  function d(y, v, S) {
    var h = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: h == null ? null : "" + h,
      children: y,
      containerInfo: v,
      implementation: S
    };
  }
  var m = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, v) {
    if (y === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Bt.createPortal = function(y, v) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(r(299));
    return d(y, v, null, S);
  }, Bt.flushSync = function(y) {
    var v = m.T, S = o.p;
    try {
      if (m.T = null, o.p = 2, y) return y();
    } finally {
      m.T = v, o.p = S, o.d.f();
    }
  }, Bt.preconnect = function(y, v) {
    typeof y == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, o.d.C(y, v));
  }, Bt.prefetchDNS = function(y) {
    typeof y == "string" && o.d.D(y);
  }, Bt.preinit = function(y, v) {
    if (typeof y == "string" && v && typeof v.as == "string") {
      var S = v.as, h = g(S, v.crossOrigin), D = typeof v.integrity == "string" ? v.integrity : void 0, _ = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      S === "style" ? o.d.S(
        y,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: h,
          integrity: D,
          fetchPriority: _
        }
      ) : S === "script" && o.d.X(y, {
        crossOrigin: h,
        integrity: D,
        fetchPriority: _,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Bt.preinitModule = function(y, v) {
    if (typeof y == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var S = g(
            v.as,
            v.crossOrigin
          );
          o.d.M(y, {
            crossOrigin: S,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && o.d.M(y);
  }, Bt.preload = function(y, v) {
    if (typeof y == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var S = v.as, h = g(S, v.crossOrigin);
      o.d.L(y, S, {
        crossOrigin: h,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Bt.preloadModule = function(y, v) {
    if (typeof y == "string")
      if (v) {
        var S = g(v.as, v.crossOrigin);
        o.d.m(y, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: S,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else o.d.m(y);
  }, Bt.requestFormReset = function(y) {
    o.d.r(y);
  }, Bt.unstable_batchedUpdates = function(y, v) {
    return y(v);
  }, Bt.useFormState = function(y, v, S) {
    return m.H.useFormState(y, v, S);
  }, Bt.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Bt.version = "19.2.7", Bt;
}
var Zm;
function iy() {
  if (Zm) return fc.exports;
  Zm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), fc.exports = u0(), fc.exports;
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
var km;
function s0() {
  if (km) return sr;
  km = 1;
  var n = r0(), r = Uc(), s = iy();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (d(e) !== e)
      throw Error(o(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
      var i = a.return;
      if (i === null) break;
      var u = i.alternate;
      if (u === null) {
        if (l = i.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (i.child === u.child) {
        for (u = i.child; u; ) {
          if (u === a) return y(i), e;
          if (u === l) return y(i), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== l.return) a = i, l = u;
      else {
        for (var c = !1, p = i.child; p; ) {
          if (p === a) {
            c = !0, a = i, l = u;
            break;
          }
          if (p === l) {
            c = !0, l = i, a = u;
            break;
          }
          p = p.sibling;
        }
        if (!c) {
          for (p = u.child; p; ) {
            if (p === a) {
              c = !0, a = u, l = i;
              break;
            }
            if (p === l) {
              c = !0, l = u, a = i;
              break;
            }
            p = p.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (a.alternate !== l) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : t;
  }
  function S(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = S(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var h = Object.assign, D = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), X = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), I = Symbol.for("react.context"), pe = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), Se = Symbol.for("react.activity"), ce = Symbol.for("react.memo_cache_sentinel"), Ue = Symbol.iterator;
  function ve(e) {
    return e === null || typeof e != "object" ? null : (e = Ue && e[Ue] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var qe = Symbol.for("react.client.reference");
  function De(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === qe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case X:
        return "Fragment";
      case $:
        return "Profiler";
      case k:
        return "StrictMode";
      case me:
        return "Suspense";
      case te:
        return "SuspenseList";
      case Se:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case C:
          return "Portal";
        case I:
          return e.displayName || "Context";
        case P:
          return (e._context.displayName || "Context") + ".Consumer";
        case pe:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case F:
          return t = e.displayName || null, t !== null ? t : De(e.type) || "Memo";
        case A:
          t = e._payload, e = e._init;
          try {
            return De(e(t));
          } catch {
          }
      }
    return null;
  }
  var Le = Array.isArray, M = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ne = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, re = [], de = -1;
  function T(e) {
    return { current: e };
  }
  function H(e) {
    0 > de || (e.current = re[de], re[de] = null, de--);
  }
  function q(e, t) {
    de++, re[de] = e.current, e.current = t;
  }
  var J = T(null), ee = T(null), oe = T(null), Re = T(null);
  function Te(e, t) {
    switch (q(oe, t), q(ee, e), q(J, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? um(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = um(t), e = sm(t, e);
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
    H(J), q(J, e);
  }
  function Ye() {
    H(J), H(ee), H(oe);
  }
  function fa(e) {
    e.memoizedState !== null && q(Re, e);
    var t = J.current, a = sm(t, e.type);
    t !== a && (q(ee, e), q(J, a));
  }
  function Aa(e) {
    ee.current === e && (H(J), H(ee)), Re.current === e && (H(Re), lr._currentValue = ne);
  }
  var da, dt;
  function wt(e) {
    if (da === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        da = t && t[1] || "", dt = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + da + e + dt;
  }
  var Rl = !1;
  function Tl(e, t) {
    if (!e || Rl) return "";
    Rl = !0;
    var a = Error.prepareStackTrace;
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
                } catch (B) {
                  var L = B;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (B) {
                  L = B;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                L = B;
              }
              (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
              });
            }
          } catch (B) {
            if (B && L && typeof B.stack == "string")
              return [B.stack, L.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      i && i.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = l.DetermineComponentFrameRoot(), c = u[0], p = u[1];
      if (c && p) {
        var R = c.split(`
`), U = p.split(`
`);
        for (i = l = 0; l < R.length && !R[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; i < U.length && !U[i].includes(
          "DetermineComponentFrameRoot"
        ); )
          i++;
        if (l === R.length || i === U.length)
          for (l = R.length - 1, i = U.length - 1; 1 <= l && 0 <= i && R[l] !== U[i]; )
            i--;
        for (; 1 <= l && 0 <= i; l--, i--)
          if (R[l] !== U[i]) {
            if (l !== 1 || i !== 1)
              do
                if (l--, i--, 0 > i || R[l] !== U[i]) {
                  var G = `
` + R[l].replace(" at new ", " at ");
                  return e.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", e.displayName)), G;
                }
              while (1 <= l && 0 <= i);
            break;
          }
      }
    } finally {
      Rl = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? wt(a) : "";
  }
  function Gt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return wt(e.type);
      case 16:
        return wt("Lazy");
      case 13:
        return e.child !== t && t !== null ? wt("Suspense Fallback") : wt("Suspense");
      case 19:
        return wt("SuspenseList");
      case 0:
      case 15:
        return Tl(e.type, !1);
      case 11:
        return Tl(e.type.render, !1);
      case 1:
        return Tl(e.type, !0);
      case 31:
        return wt("Activity");
      default:
        return "";
    }
  }
  function tn(e) {
    try {
      var t = "", a = null;
      do
        t += Gt(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var qt = Object.prototype.hasOwnProperty, _l = n.unstable_scheduleCallback, an = n.unstable_cancelCallback, At = n.unstable_shouldYield, Qa = n.unstable_requestPaint, Mt = n.unstable_now, Ma = n.unstable_getCurrentPriorityLevel, ea = n.unstable_ImmediatePriority, ln = n.unstable_UserBlockingPriority, za = n.unstable_NormalPriority, Yt = n.unstable_LowPriority, xt = n.unstable_IdlePriority, _n = n.log, Za = n.unstable_setDisableYieldValue, Da = null, zt = null;
  function ht(e) {
    if (typeof _n == "function" && Za(e), zt && typeof zt.setStrictMode == "function")
      try {
        zt.setStrictMode(Da, e);
      } catch {
      }
  }
  var Rt = Math.clz32 ? Math.clz32 : ha, wn = Math.log, wl = Math.LN2;
  function ha(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (wn(e) / wl | 0) | 0;
  }
  var tl = 256, Ca = 262144, ka = 4194304;
  function Zt(e) {
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
  function xe(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var i = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var p = l & 134217727;
    return p !== 0 ? (l = p & ~u, l !== 0 ? i = Zt(l) : (c &= p, c !== 0 ? i = Zt(c) : a || (a = p & ~e, a !== 0 && (i = Zt(a))))) : (p = l & ~u, p !== 0 ? i = Zt(p) : c !== 0 ? i = Zt(c) : a || (a = l & ~e, a !== 0 && (i = Zt(a)))), i === 0 ? 0 : t !== 0 && t !== i && (t & u) === 0 && (u = i & -i, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : i;
  }
  function at(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function gt(e, t) {
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
  function Tt() {
    var e = ka;
    return ka <<= 1, (ka & 62914560) === 0 && (ka = 4194304), e;
  }
  function ta(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Ie(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Dt(e, t, a, l, i, u) {
    var c = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var p = e.entanglements, R = e.expirationTimes, U = e.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var G = 31 - Rt(a), Q = 1 << G;
      p[G] = 0, R[G] = -1;
      var L = U[G];
      if (L !== null)
        for (U[G] = null, G = 0; G < L.length; G++) {
          var B = L[G];
          B !== null && (B.lane &= -536870913);
        }
      a &= ~Q;
    }
    l !== 0 && al(e, l, 0), u !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function al(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Rt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Lt(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - Rt(a), i = 1 << l;
      i & t | e[l] & t && (e[l] |= t), a &= ~i;
    }
  }
  function x(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : N(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function N(e) {
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
  function j(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Z() {
    var e = V.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Dm(e.type));
  }
  function K(e, t) {
    var a = V.p;
    try {
      return V.p = e, t();
    } finally {
      V.p = a;
    }
  }
  var ue = Math.random().toString(36).slice(2), ae = "__reactFiber$" + ue, ie = "__reactProps$" + ue, le = "__reactContainer$" + ue, ye = "__reactEvents$" + ue, ge = "__reactListeners$" + ue, Ne = "__reactHandles$" + ue, Ee = "__reactResources$" + ue, Ce = "__reactMarker$" + ue;
  function Qe(e) {
    delete e[ae], delete e[ie], delete e[ye], delete e[ge], delete e[Ne];
  }
  function it(e) {
    var t = e[ae];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[le] || a[ae]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = vm(e); e !== null; ) {
            if (a = e[ae]) return a;
            e = vm(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Je(e) {
    if (e = e[ae] || e[le]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Xe(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function mt(e) {
    var t = e[Ee];
    return t || (t = e[Ee] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ve(e) {
    e[Ce] = !0;
  }
  var Nl = /* @__PURE__ */ new Set(), ja = {};
  function kt(e, t) {
    Xt(e, t), Xt(e + "Capture", t);
  }
  function Xt(e, t) {
    for (ja[e] = t, e = 0; e < t.length; e++)
      Nl.add(t[e]);
  }
  var ma = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Nn = {}, Oa = {};
  function An(e) {
    return qt.call(Oa, e) ? !0 : qt.call(Nn, e) ? !1 : ma.test(e) ? Oa[e] = !0 : (Nn[e] = !0, !1);
  }
  function ll(e, t, a) {
    if (An(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
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
        e.setAttribute(t, "" + a);
      }
  }
  function nl(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function _e(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + l);
    }
  }
  function lt(e) {
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
  function aa(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ua(e, t, a) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var i = l.get, u = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(c) {
          a = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(c) {
          a = "" + c;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Mn(e) {
    if (!e._valueTracker) {
      var t = aa(e) ? "checked" : "value";
      e._valueTracker = Ua(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function zn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = aa(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  function $e(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var il = /[\n"\\]/g;
  function Vt(e) {
    return e.replace(
      il,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function bi(e, t, a, l, i, u, c, p) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + lt(t)) : e.value !== "" + lt(t) && (e.value = "" + lt(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? es(e, c, lt(t)) : a != null ? es(e, c, lt(a)) : l != null && e.removeAttribute("value"), i == null && u != null && (e.defaultChecked = !!u), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.name = "" + lt(p) : e.removeAttribute("name");
  }
  function ef(e, t, a, l, i, u, c, p) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Mn(e);
        return;
      }
      a = a != null ? "" + lt(a) : "", t = t != null ? "" + lt(t) : a, p || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? i, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = p ? e.checked : !!l, e.defaultChecked = !!l, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), Mn(e);
  }
  function es(e, t, a) {
    t === "number" && $e(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function Dn(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < a.length; i++)
        t["$" + a[i]] = !0;
      for (a = 0; a < e.length; a++)
        i = t.hasOwnProperty("$" + e[a].value), e[a].selected !== i && (e[a].selected = i), i && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + lt(a), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === a) {
          e[i].selected = !0, l && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function tf(e, t, a) {
    if (t != null && (t = "" + lt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + lt(a) : "";
  }
  function af(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (Le(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = lt(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Mn(e);
  }
  function Cn(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var $y = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function lf(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || $y.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function nf(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var i in t)
        l = t[i], t.hasOwnProperty(i) && a[i] !== l && lf(e, i, l);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && lf(e, u, t[u]);
  }
  function ts(e) {
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
  var Fy = /* @__PURE__ */ new Map([
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
  ]), Wy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Tr(e) {
    return Wy.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function rl() {
  }
  var as = null;
  function ls(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var jn = null, On = null;
  function rf(e) {
    var t = Je(e);
    if (t && (e = t.stateNode)) {
      var a = e[ie] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (bi(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var i = l[ie] || null;
                if (!i) throw Error(o(90));
                bi(
                  l,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              l = a[t], l.form === e.form && zn(l);
          }
          break e;
        case "textarea":
          tf(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Dn(e, !!a.multiple, t, !1);
      }
    }
  }
  var ns = !1;
  function uf(e, t, a) {
    if (ns) return e(t, a);
    ns = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (ns = !1, (jn !== null || On !== null) && (fu(), jn && (t = jn, e = On, On = jn = null, rf(t), e)))
        for (t = 0; t < e.length; t++) rf(e[t]);
    }
  }
  function Si(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[ie] || null;
    if (l === null) return null;
    a = l[t];
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
    if (a && typeof a != "function")
      throw Error(
        o(231, t, typeof a)
      );
    return a;
  }
  var ul = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), is = !1;
  if (ul)
    try {
      var Ei = {};
      Object.defineProperty(Ei, "passive", {
        get: function() {
          is = !0;
        }
      }), window.addEventListener("test", Ei, Ei), window.removeEventListener("test", Ei, Ei);
    } catch {
      is = !1;
    }
  var Al = null, rs = null, _r = null;
  function sf() {
    if (_r) return _r;
    var e, t = rs, a = t.length, l, i = "value" in Al ? Al.value : Al.textContent, u = i.length;
    for (e = 0; e < a && t[e] === i[e]; e++) ;
    var c = a - e;
    for (l = 1; l <= c && t[a - l] === i[u - l]; l++) ;
    return _r = i.slice(e, 1 < l ? 1 - l : void 0);
  }
  function wr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Nr() {
    return !0;
  }
  function of() {
    return !1;
  }
  function Kt(e) {
    function t(a, l, i, u, c) {
      this._reactName = a, this._targetInst = i, this.type = l, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var p in e)
        e.hasOwnProperty(p) && (a = e[p], this[p] = a ? a(u) : u[p]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Nr : of, this.isPropagationStopped = of, this;
    }
    return h(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Nr);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Nr);
      },
      persist: function() {
      },
      isPersistent: Nr
    }), t;
  }
  var nn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ar = Kt(nn), xi = h({}, nn, { view: 0, detail: 0 }), Iy = Kt(xi), us, ss, Ri, Mr = h({}, xi, {
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
    getModifierState: cs,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ri && (Ri && e.type === "mousemove" ? (us = e.screenX - Ri.screenX, ss = e.screenY - Ri.screenY) : ss = us = 0, Ri = e), us);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ss;
    }
  }), cf = Kt(Mr), Py = h({}, Mr, { dataTransfer: 0 }), eg = Kt(Py), tg = h({}, xi, { relatedTarget: 0 }), os = Kt(tg), ag = h({}, nn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lg = Kt(ag), ng = h({}, nn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ig = Kt(ng), rg = h({}, nn, { data: 0 }), ff = Kt(rg), ug = {
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
  }, sg = {
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
  }, og = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function cg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = og[e]) ? !!t[e] : !1;
  }
  function cs() {
    return cg;
  }
  var fg = h({}, xi, {
    key: function(e) {
      if (e.key) {
        var t = ug[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = wr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? sg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cs,
    charCode: function(e) {
      return e.type === "keypress" ? wr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? wr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), dg = Kt(fg), hg = h({}, Mr, {
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
  }), df = Kt(hg), mg = h({}, xi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cs
  }), vg = Kt(mg), yg = h({}, nn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), gg = Kt(yg), pg = h({}, Mr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), bg = Kt(pg), Sg = h({}, nn, {
    newState: 0,
    oldState: 0
  }), Eg = Kt(Sg), xg = [9, 13, 27, 32], fs = ul && "CompositionEvent" in window, Ti = null;
  ul && "documentMode" in document && (Ti = document.documentMode);
  var Rg = ul && "TextEvent" in window && !Ti, hf = ul && (!fs || Ti && 8 < Ti && 11 >= Ti), mf = " ", vf = !1;
  function yf(e, t) {
    switch (e) {
      case "keyup":
        return xg.indexOf(t.keyCode) !== -1;
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
  function gf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Un = !1;
  function Tg(e, t) {
    switch (e) {
      case "compositionend":
        return gf(t);
      case "keypress":
        return t.which !== 32 ? null : (vf = !0, mf);
      case "textInput":
        return e = t.data, e === mf && vf ? null : e;
      default:
        return null;
    }
  }
  function _g(e, t) {
    if (Un)
      return e === "compositionend" || !fs && yf(e, t) ? (e = sf(), _r = rs = Al = null, Un = !1, e) : null;
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
        return hf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var wg = {
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
  function pf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wg[e.type] : t === "textarea";
  }
  function bf(e, t, a, l) {
    jn ? On ? On.push(l) : On = [l] : jn = l, t = pu(t, "onChange"), 0 < t.length && (a = new Ar(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var _i = null, wi = null;
  function Ng(e) {
    tm(e, 0);
  }
  function zr(e) {
    var t = Xe(e);
    if (zn(t)) return e;
  }
  function Sf(e, t) {
    if (e === "change") return t;
  }
  var Ef = !1;
  if (ul) {
    var ds;
    if (ul) {
      var hs = "oninput" in document;
      if (!hs) {
        var xf = document.createElement("div");
        xf.setAttribute("oninput", "return;"), hs = typeof xf.oninput == "function";
      }
      ds = hs;
    } else ds = !1;
    Ef = ds && (!document.documentMode || 9 < document.documentMode);
  }
  function Rf() {
    _i && (_i.detachEvent("onpropertychange", Tf), wi = _i = null);
  }
  function Tf(e) {
    if (e.propertyName === "value" && zr(wi)) {
      var t = [];
      bf(
        t,
        wi,
        e,
        ls(e)
      ), uf(Ng, t);
    }
  }
  function Ag(e, t, a) {
    e === "focusin" ? (Rf(), _i = t, wi = a, _i.attachEvent("onpropertychange", Tf)) : e === "focusout" && Rf();
  }
  function Mg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return zr(wi);
  }
  function zg(e, t) {
    if (e === "click") return zr(t);
  }
  function Dg(e, t) {
    if (e === "input" || e === "change")
      return zr(t);
  }
  function Cg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var la = typeof Object.is == "function" ? Object.is : Cg;
  function Ni(e, t) {
    if (la(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var i = a[l];
      if (!qt.call(t, i) || !la(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function _f(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function wf(e, t) {
    var a = _f(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= t && l >= t)
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = _f(a);
    }
  }
  function Nf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Af(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = $e(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = $e(e.document);
    }
    return t;
  }
  function ms(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var jg = ul && "documentMode" in document && 11 >= document.documentMode, Ln = null, vs = null, Ai = null, ys = !1;
  function Mf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    ys || Ln == null || Ln !== $e(l) || (l = Ln, "selectionStart" in l && ms(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ai && Ni(Ai, l) || (Ai = l, l = pu(vs, "onSelect"), 0 < l.length && (t = new Ar(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Ln)));
  }
  function rn(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Bn = {
    animationend: rn("Animation", "AnimationEnd"),
    animationiteration: rn("Animation", "AnimationIteration"),
    animationstart: rn("Animation", "AnimationStart"),
    transitionrun: rn("Transition", "TransitionRun"),
    transitionstart: rn("Transition", "TransitionStart"),
    transitioncancel: rn("Transition", "TransitionCancel"),
    transitionend: rn("Transition", "TransitionEnd")
  }, gs = {}, zf = {};
  ul && (zf = document.createElement("div").style, "AnimationEvent" in window || (delete Bn.animationend.animation, delete Bn.animationiteration.animation, delete Bn.animationstart.animation), "TransitionEvent" in window || delete Bn.transitionend.transition);
  function un(e) {
    if (gs[e]) return gs[e];
    if (!Bn[e]) return e;
    var t = Bn[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in zf)
        return gs[e] = t[a];
    return e;
  }
  var Df = un("animationend"), Cf = un("animationiteration"), jf = un("animationstart"), Og = un("transitionrun"), Ug = un("transitionstart"), Lg = un("transitioncancel"), Of = un("transitionend"), Uf = /* @__PURE__ */ new Map(), ps = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ps.push("scrollEnd");
  function La(e, t) {
    Uf.set(e, t), kt(t, [e]);
  }
  var Dr = typeof reportError == "function" ? reportError : function(e) {
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
  }, va = [], Hn = 0, bs = 0;
  function Cr() {
    for (var e = Hn, t = bs = Hn = 0; t < e; ) {
      var a = va[t];
      va[t++] = null;
      var l = va[t];
      va[t++] = null;
      var i = va[t];
      va[t++] = null;
      var u = va[t];
      if (va[t++] = null, l !== null && i !== null) {
        var c = l.pending;
        c === null ? i.next = i : (i.next = c.next, c.next = i), l.pending = i;
      }
      u !== 0 && Lf(a, i, u);
    }
  }
  function jr(e, t, a, l) {
    va[Hn++] = e, va[Hn++] = t, va[Hn++] = a, va[Hn++] = l, bs |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ss(e, t, a, l) {
    return jr(e, t, a, l), Or(e);
  }
  function sn(e, t) {
    return jr(e, null, null, t), Or(e);
  }
  function Lf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var i = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (i = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, i && t !== null && (i = 31 - Rt(a), e = u.hiddenUpdates, l = e[i], l === null ? e[i] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function Or(e) {
    if (50 < Fi)
      throw Fi = 0, zo = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Gn = {};
  function Bg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function na(e, t, a, l) {
    return new Bg(e, t, a, l);
  }
  function Es(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function sl(e, t) {
    var a = e.alternate;
    return a === null ? (a = na(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Bf(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ur(e, t, a, l, i, u) {
    var c = 0;
    if (l = e, typeof e == "function") Es(e) && (c = 1);
    else if (typeof e == "string")
      c = Xp(
        e,
        a,
        J.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Se:
          return e = na(31, a, t, i), e.elementType = Se, e.lanes = u, e;
        case X:
          return on(a.children, i, u, t);
        case k:
          c = 8, i |= 24;
          break;
        case $:
          return e = na(12, a, t, i | 2), e.elementType = $, e.lanes = u, e;
        case me:
          return e = na(13, a, t, i), e.elementType = me, e.lanes = u, e;
        case te:
          return e = na(19, a, t, i), e.elementType = te, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case I:
                c = 10;
                break e;
              case P:
                c = 9;
                break e;
              case pe:
                c = 11;
                break e;
              case F:
                c = 14;
                break e;
              case A:
                c = 16, l = null;
                break e;
            }
          c = 29, a = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = na(c, a, t, i), t.elementType = e, t.type = l, t.lanes = u, t;
  }
  function on(e, t, a, l) {
    return e = na(7, e, l, t), e.lanes = a, e;
  }
  function xs(e, t, a) {
    return e = na(6, e, null, t), e.lanes = a, e;
  }
  function Hf(e) {
    var t = na(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Rs(e, t, a) {
    return t = na(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Gf = /* @__PURE__ */ new WeakMap();
  function ya(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Gf.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: tn(t)
      }, Gf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: tn(t)
    };
  }
  var qn = [], Yn = 0, Lr = null, Mi = 0, ga = [], pa = 0, Ml = null, Ka = 1, Ja = "";
  function ol(e, t) {
    qn[Yn++] = Mi, qn[Yn++] = Lr, Lr = e, Mi = t;
  }
  function qf(e, t, a) {
    ga[pa++] = Ka, ga[pa++] = Ja, ga[pa++] = Ml, Ml = e;
    var l = Ka;
    e = Ja;
    var i = 32 - Rt(l) - 1;
    l &= ~(1 << i), a += 1;
    var u = 32 - Rt(t) + i;
    if (30 < u) {
      var c = i - i % 5;
      u = (l & (1 << c) - 1).toString(32), l >>= c, i -= c, Ka = 1 << 32 - Rt(t) + i | a << i | l, Ja = u + e;
    } else
      Ka = 1 << u | a << i | l, Ja = e;
  }
  function Ts(e) {
    e.return !== null && (ol(e, 1), qf(e, 1, 0));
  }
  function _s(e) {
    for (; e === Lr; )
      Lr = qn[--Yn], qn[Yn] = null, Mi = qn[--Yn], qn[Yn] = null;
    for (; e === Ml; )
      Ml = ga[--pa], ga[pa] = null, Ja = ga[--pa], ga[pa] = null, Ka = ga[--pa], ga[pa] = null;
  }
  function Yf(e, t) {
    ga[pa++] = Ka, ga[pa++] = Ja, ga[pa++] = Ml, Ka = t.id, Ja = t.overflow, Ml = e;
  }
  var Ct = null, rt = null, Ge = !1, zl = null, ba = !1, ws = Error(o(519));
  function Dl(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw zi(ya(t, e)), ws;
  }
  function Xf(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[ae] = e, t[ie] = l, a) {
      case "dialog":
        Oe("cancel", t), Oe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Ii.length; a++)
          Oe(Ii[a], t);
        break;
      case "source":
        Oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Oe("error", t), Oe("load", t);
        break;
      case "details":
        Oe("toggle", t);
        break;
      case "input":
        Oe("invalid", t), ef(
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
        Oe("invalid", t);
        break;
      case "textarea":
        Oe("invalid", t), af(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || im(t.textContent, a) ? (l.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)), l.onScroll != null && Oe("scroll", t), l.onScrollEnd != null && Oe("scrollend", t), l.onClick != null && (t.onclick = rl), t = !0) : t = !1, t || Dl(e, !0);
  }
  function Vf(e) {
    for (Ct = e.return; Ct; )
      switch (Ct.tag) {
        case 5:
        case 31:
        case 13:
          ba = !1;
          return;
        case 27:
        case 3:
          ba = !0;
          return;
        default:
          Ct = Ct.return;
      }
  }
  function Xn(e) {
    if (e !== Ct) return !1;
    if (!Ge) return Vf(e), Ge = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Zo(e.type, e.memoizedProps)), a = !a), a && rt && Dl(e), Vf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      rt = mm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      rt = mm(e);
    } else
      t === 27 ? (t = rt, Zl(e.type) ? (e = Fo, Fo = null, rt = e) : rt = t) : rt = Ct ? Ea(e.stateNode.nextSibling) : null;
    return !0;
  }
  function cn() {
    rt = Ct = null, Ge = !1;
  }
  function Ns() {
    var e = zl;
    return e !== null && (Wt === null ? Wt = e : Wt.push.apply(
      Wt,
      e
    ), zl = null), e;
  }
  function zi(e) {
    zl === null ? zl = [e] : zl.push(e);
  }
  var As = T(null), fn = null, cl = null;
  function Cl(e, t, a) {
    q(As, t._currentValue), t._currentValue = a;
  }
  function fl(e) {
    e._currentValue = As.current, H(As);
  }
  function Ms(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function zs(e, t, a, l) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var u = i.dependencies;
      if (u !== null) {
        var c = i.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var p = u;
          u = i;
          for (var R = 0; R < t.length; R++)
            if (p.context === t[R]) {
              u.lanes |= a, p = u.alternate, p !== null && (p.lanes |= a), Ms(
                u.return,
                a,
                e
              ), l || (c = null);
              break e;
            }
          u = p.next;
        }
      } else if (i.tag === 18) {
        if (c = i.return, c === null) throw Error(o(341));
        c.lanes |= a, u = c.alternate, u !== null && (u.lanes |= a), Ms(c, a, e), c = null;
      } else c = i.child;
      if (c !== null) c.return = i;
      else
        for (c = i; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (i = c.sibling, i !== null) {
            i.return = c.return, c = i;
            break;
          }
          c = c.return;
        }
      i = c;
    }
  }
  function Vn(e, t, a, l) {
    e = null;
    for (var i = t, u = !1; i !== null; ) {
      if (!u) {
        if ((i.flags & 524288) !== 0) u = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var c = i.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var p = i.type;
          la(i.pendingProps.value, c.value) || (e !== null ? e.push(p) : e = [p]);
        }
      } else if (i === Re.current) {
        if (c = i.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(lr) : e = [lr]);
      }
      i = i.return;
    }
    e !== null && zs(
      t,
      e,
      a,
      l
    ), t.flags |= 262144;
  }
  function Br(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!la(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function dn(e) {
    fn = e, cl = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function jt(e) {
    return Qf(fn, e);
  }
  function Hr(e, t) {
    return fn === null && dn(e), Qf(e, t);
  }
  function Qf(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, cl === null) {
      if (e === null) throw Error(o(308));
      cl = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else cl = cl.next = t;
    return a;
  }
  var Hg = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, Gg = n.unstable_scheduleCallback, qg = n.unstable_NormalPriority, pt = {
    $$typeof: I,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ds() {
    return {
      controller: new Hg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Di(e) {
    e.refCount--, e.refCount === 0 && Gg(qg, function() {
      e.controller.abort();
    });
  }
  var Ci = null, Cs = 0, Qn = 0, Zn = null;
  function Yg(e, t) {
    if (Ci === null) {
      var a = Ci = [];
      Cs = 0, Qn = Lo(), Zn = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Cs++, t.then(Zf, Zf), t;
  }
  function Zf() {
    if (--Cs === 0 && Ci !== null) {
      Zn !== null && (Zn.status = "fulfilled");
      var e = Ci;
      Ci = null, Qn = 0, Zn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Xg(e, t) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        a.push(i);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var i = 0; i < a.length; i++) (0, a[i])(t);
      },
      function(i) {
        for (l.status = "rejected", l.reason = i, i = 0; i < a.length; i++)
          (0, a[i])(void 0);
      }
    ), l;
  }
  var kf = M.S;
  M.S = function(e, t) {
    Mh = Mt(), typeof t == "object" && t !== null && typeof t.then == "function" && Yg(e, t), kf !== null && kf(e, t);
  };
  var hn = T(null);
  function js() {
    var e = hn.current;
    return e !== null ? e : nt.pooledCache;
  }
  function Gr(e, t) {
    t === null ? q(hn, hn.current) : q(hn, t.pool);
  }
  function Kf() {
    var e = js();
    return e === null ? null : { parent: pt._currentValue, pool: e };
  }
  var kn = Error(o(460)), Os = Error(o(474)), qr = Error(o(542)), Yr = { then: function() {
  } };
  function Jf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function $f(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(rl, rl), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Wf(e), e;
      default:
        if (typeof t.status == "string") t.then(rl, rl);
        else {
          if (e = nt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "fulfilled", i.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var i = t;
                i.status = "rejected", i.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Wf(e), e;
        }
        throw vn = t, kn;
    }
  }
  function mn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (vn = a, kn) : a;
    }
  }
  var vn = null;
  function Ff() {
    if (vn === null) throw Error(o(459));
    var e = vn;
    return vn = null, e;
  }
  function Wf(e) {
    if (e === kn || e === qr)
      throw Error(o(483));
  }
  var Kn = null, ji = 0;
  function Xr(e) {
    var t = ji;
    return ji += 1, Kn === null && (Kn = []), $f(Kn, e, t);
  }
  function Oi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Vr(e, t) {
    throw t.$$typeof === D ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function If(e) {
    function t(z, w) {
      if (e) {
        var O = z.deletions;
        O === null ? (z.deletions = [w], z.flags |= 16) : O.push(w);
      }
    }
    function a(z, w) {
      if (!e) return null;
      for (; w !== null; )
        t(z, w), w = w.sibling;
      return null;
    }
    function l(z) {
      for (var w = /* @__PURE__ */ new Map(); z !== null; )
        z.key !== null ? w.set(z.key, z) : w.set(z.index, z), z = z.sibling;
      return w;
    }
    function i(z, w) {
      return z = sl(z, w), z.index = 0, z.sibling = null, z;
    }
    function u(z, w, O) {
      return z.index = O, e ? (O = z.alternate, O !== null ? (O = O.index, O < w ? (z.flags |= 67108866, w) : O) : (z.flags |= 67108866, w)) : (z.flags |= 1048576, w);
    }
    function c(z) {
      return e && z.alternate === null && (z.flags |= 67108866), z;
    }
    function p(z, w, O, Y) {
      return w === null || w.tag !== 6 ? (w = xs(O, z.mode, Y), w.return = z, w) : (w = i(w, O), w.return = z, w);
    }
    function R(z, w, O, Y) {
      var he = O.type;
      return he === X ? G(
        z,
        w,
        O.props.children,
        Y,
        O.key
      ) : w !== null && (w.elementType === he || typeof he == "object" && he !== null && he.$$typeof === A && mn(he) === w.type) ? (w = i(w, O.props), Oi(w, O), w.return = z, w) : (w = Ur(
        O.type,
        O.key,
        O.props,
        null,
        z.mode,
        Y
      ), Oi(w, O), w.return = z, w);
    }
    function U(z, w, O, Y) {
      return w === null || w.tag !== 4 || w.stateNode.containerInfo !== O.containerInfo || w.stateNode.implementation !== O.implementation ? (w = Rs(O, z.mode, Y), w.return = z, w) : (w = i(w, O.children || []), w.return = z, w);
    }
    function G(z, w, O, Y, he) {
      return w === null || w.tag !== 7 ? (w = on(
        O,
        z.mode,
        Y,
        he
      ), w.return = z, w) : (w = i(w, O), w.return = z, w);
    }
    function Q(z, w, O) {
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return w = xs(
          "" + w,
          z.mode,
          O
        ), w.return = z, w;
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case _:
            return O = Ur(
              w.type,
              w.key,
              w.props,
              null,
              z.mode,
              O
            ), Oi(O, w), O.return = z, O;
          case C:
            return w = Rs(
              w,
              z.mode,
              O
            ), w.return = z, w;
          case A:
            return w = mn(w), Q(z, w, O);
        }
        if (Le(w) || ve(w))
          return w = on(
            w,
            z.mode,
            O,
            null
          ), w.return = z, w;
        if (typeof w.then == "function")
          return Q(z, Xr(w), O);
        if (w.$$typeof === I)
          return Q(
            z,
            Hr(z, w),
            O
          );
        Vr(z, w);
      }
      return null;
    }
    function L(z, w, O, Y) {
      var he = w !== null ? w.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return he !== null ? null : p(z, w, "" + O, Y);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case _:
            return O.key === he ? R(z, w, O, Y) : null;
          case C:
            return O.key === he ? U(z, w, O, Y) : null;
          case A:
            return O = mn(O), L(z, w, O, Y);
        }
        if (Le(O) || ve(O))
          return he !== null ? null : G(z, w, O, Y, null);
        if (typeof O.then == "function")
          return L(
            z,
            w,
            Xr(O),
            Y
          );
        if (O.$$typeof === I)
          return L(
            z,
            w,
            Hr(z, O),
            Y
          );
        Vr(z, O);
      }
      return null;
    }
    function B(z, w, O, Y, he) {
      if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
        return z = z.get(O) || null, p(w, z, "" + Y, he);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case _:
            return z = z.get(
              Y.key === null ? O : Y.key
            ) || null, R(w, z, Y, he);
          case C:
            return z = z.get(
              Y.key === null ? O : Y.key
            ) || null, U(w, z, Y, he);
          case A:
            return Y = mn(Y), B(
              z,
              w,
              O,
              Y,
              he
            );
        }
        if (Le(Y) || ve(Y))
          return z = z.get(O) || null, G(w, z, Y, he, null);
        if (typeof Y.then == "function")
          return B(
            z,
            w,
            O,
            Xr(Y),
            he
          );
        if (Y.$$typeof === I)
          return B(
            z,
            w,
            O,
            Hr(w, Y),
            he
          );
        Vr(w, Y);
      }
      return null;
    }
    function se(z, w, O, Y) {
      for (var he = null, Ze = null, fe = w, Me = w = 0, He = null; fe !== null && Me < O.length; Me++) {
        fe.index > Me ? (He = fe, fe = null) : He = fe.sibling;
        var ke = L(
          z,
          fe,
          O[Me],
          Y
        );
        if (ke === null) {
          fe === null && (fe = He);
          break;
        }
        e && fe && ke.alternate === null && t(z, fe), w = u(ke, w, Me), Ze === null ? he = ke : Ze.sibling = ke, Ze = ke, fe = He;
      }
      if (Me === O.length)
        return a(z, fe), Ge && ol(z, Me), he;
      if (fe === null) {
        for (; Me < O.length; Me++)
          fe = Q(z, O[Me], Y), fe !== null && (w = u(
            fe,
            w,
            Me
          ), Ze === null ? he = fe : Ze.sibling = fe, Ze = fe);
        return Ge && ol(z, Me), he;
      }
      for (fe = l(fe); Me < O.length; Me++)
        He = B(
          fe,
          z,
          Me,
          O[Me],
          Y
        ), He !== null && (e && He.alternate !== null && fe.delete(
          He.key === null ? Me : He.key
        ), w = u(
          He,
          w,
          Me
        ), Ze === null ? he = He : Ze.sibling = He, Ze = He);
      return e && fe.forEach(function(Fl) {
        return t(z, Fl);
      }), Ge && ol(z, Me), he;
    }
    function be(z, w, O, Y) {
      if (O == null) throw Error(o(151));
      for (var he = null, Ze = null, fe = w, Me = w = 0, He = null, ke = O.next(); fe !== null && !ke.done; Me++, ke = O.next()) {
        fe.index > Me ? (He = fe, fe = null) : He = fe.sibling;
        var Fl = L(z, fe, ke.value, Y);
        if (Fl === null) {
          fe === null && (fe = He);
          break;
        }
        e && fe && Fl.alternate === null && t(z, fe), w = u(Fl, w, Me), Ze === null ? he = Fl : Ze.sibling = Fl, Ze = Fl, fe = He;
      }
      if (ke.done)
        return a(z, fe), Ge && ol(z, Me), he;
      if (fe === null) {
        for (; !ke.done; Me++, ke = O.next())
          ke = Q(z, ke.value, Y), ke !== null && (w = u(ke, w, Me), Ze === null ? he = ke : Ze.sibling = ke, Ze = ke);
        return Ge && ol(z, Me), he;
      }
      for (fe = l(fe); !ke.done; Me++, ke = O.next())
        ke = B(fe, z, Me, ke.value, Y), ke !== null && (e && ke.alternate !== null && fe.delete(ke.key === null ? Me : ke.key), w = u(ke, w, Me), Ze === null ? he = ke : Ze.sibling = ke, Ze = ke);
      return e && fe.forEach(function(Pp) {
        return t(z, Pp);
      }), Ge && ol(z, Me), he;
    }
    function tt(z, w, O, Y) {
      if (typeof O == "object" && O !== null && O.type === X && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case _:
            e: {
              for (var he = O.key; w !== null; ) {
                if (w.key === he) {
                  if (he = O.type, he === X) {
                    if (w.tag === 7) {
                      a(
                        z,
                        w.sibling
                      ), Y = i(
                        w,
                        O.props.children
                      ), Y.return = z, z = Y;
                      break e;
                    }
                  } else if (w.elementType === he || typeof he == "object" && he !== null && he.$$typeof === A && mn(he) === w.type) {
                    a(
                      z,
                      w.sibling
                    ), Y = i(w, O.props), Oi(Y, O), Y.return = z, z = Y;
                    break e;
                  }
                  a(z, w);
                  break;
                } else t(z, w);
                w = w.sibling;
              }
              O.type === X ? (Y = on(
                O.props.children,
                z.mode,
                Y,
                O.key
              ), Y.return = z, z = Y) : (Y = Ur(
                O.type,
                O.key,
                O.props,
                null,
                z.mode,
                Y
              ), Oi(Y, O), Y.return = z, z = Y);
            }
            return c(z);
          case C:
            e: {
              for (he = O.key; w !== null; ) {
                if (w.key === he)
                  if (w.tag === 4 && w.stateNode.containerInfo === O.containerInfo && w.stateNode.implementation === O.implementation) {
                    a(
                      z,
                      w.sibling
                    ), Y = i(w, O.children || []), Y.return = z, z = Y;
                    break e;
                  } else {
                    a(z, w);
                    break;
                  }
                else t(z, w);
                w = w.sibling;
              }
              Y = Rs(O, z.mode, Y), Y.return = z, z = Y;
            }
            return c(z);
          case A:
            return O = mn(O), tt(
              z,
              w,
              O,
              Y
            );
        }
        if (Le(O))
          return se(
            z,
            w,
            O,
            Y
          );
        if (ve(O)) {
          if (he = ve(O), typeof he != "function") throw Error(o(150));
          return O = he.call(O), be(
            z,
            w,
            O,
            Y
          );
        }
        if (typeof O.then == "function")
          return tt(
            z,
            w,
            Xr(O),
            Y
          );
        if (O.$$typeof === I)
          return tt(
            z,
            w,
            Hr(z, O),
            Y
          );
        Vr(z, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, w !== null && w.tag === 6 ? (a(z, w.sibling), Y = i(w, O), Y.return = z, z = Y) : (a(z, w), Y = xs(O, z.mode, Y), Y.return = z, z = Y), c(z)) : a(z, w);
    }
    return function(z, w, O, Y) {
      try {
        ji = 0;
        var he = tt(
          z,
          w,
          O,
          Y
        );
        return Kn = null, he;
      } catch (fe) {
        if (fe === kn || fe === qr) throw fe;
        var Ze = na(29, fe, null, z.mode);
        return Ze.lanes = Y, Ze.return = z, Ze;
      } finally {
      }
    };
  }
  var yn = If(!0), Pf = If(!1), jl = !1;
  function Us(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ls(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ol(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ul(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ke & 2) !== 0) {
      var i = l.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), l.pending = t, t = Or(e), Lf(e, null, a), t;
    }
    return jr(e, l, t, a), Or(e);
  }
  function Ui(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Lt(e, a);
    }
  }
  function Bs(e, t) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var i = null, u = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          u === null ? i = u = c : u = u.next = c, a = a.next;
        } while (a !== null);
        u === null ? i = u = t : u = u.next = t;
      } else i = u = t;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var Hs = !1;
  function Li() {
    if (Hs) {
      var e = Zn;
      if (e !== null) throw e;
    }
  }
  function Bi(e, t, a, l) {
    Hs = !1;
    var i = e.updateQueue;
    jl = !1;
    var u = i.firstBaseUpdate, c = i.lastBaseUpdate, p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var R = p, U = R.next;
      R.next = null, c === null ? u = U : c.next = U, c = R;
      var G = e.alternate;
      G !== null && (G = G.updateQueue, p = G.lastBaseUpdate, p !== c && (p === null ? G.firstBaseUpdate = U : p.next = U, G.lastBaseUpdate = R));
    }
    if (u !== null) {
      var Q = i.baseState;
      c = 0, G = U = R = null, p = u;
      do {
        var L = p.lane & -536870913, B = L !== p.lane;
        if (B ? (Be & L) === L : (l & L) === L) {
          L !== 0 && L === Qn && (Hs = !0), G !== null && (G = G.next = {
            lane: 0,
            tag: p.tag,
            payload: p.payload,
            callback: null,
            next: null
          });
          e: {
            var se = e, be = p;
            L = t;
            var tt = a;
            switch (be.tag) {
              case 1:
                if (se = be.payload, typeof se == "function") {
                  Q = se.call(tt, Q, L);
                  break e;
                }
                Q = se;
                break e;
              case 3:
                se.flags = se.flags & -65537 | 128;
              case 0:
                if (se = be.payload, L = typeof se == "function" ? se.call(tt, Q, L) : se, L == null) break e;
                Q = h({}, Q, L);
                break e;
              case 2:
                jl = !0;
            }
          }
          L = p.callback, L !== null && (e.flags |= 64, B && (e.flags |= 8192), B = i.callbacks, B === null ? i.callbacks = [L] : B.push(L));
        } else
          B = {
            lane: L,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null
          }, G === null ? (U = G = B, R = Q) : G = G.next = B, c |= L;
        if (p = p.next, p === null) {
          if (p = i.shared.pending, p === null)
            break;
          B = p, p = B.next, B.next = null, i.lastBaseUpdate = B, i.shared.pending = null;
        }
      } while (!0);
      G === null && (R = Q), i.baseState = R, i.firstBaseUpdate = U, i.lastBaseUpdate = G, u === null && (i.shared.lanes = 0), ql |= c, e.lanes = c, e.memoizedState = Q;
    }
  }
  function ed(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function td(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        ed(a[e], t);
  }
  var Jn = T(null), Qr = T(0);
  function ad(e, t) {
    e = Sl, q(Qr, e), q(Jn, t), Sl = e | t.baseLanes;
  }
  function Gs() {
    q(Qr, Sl), q(Jn, Jn.current);
  }
  function qs() {
    Sl = Qr.current, H(Jn), H(Qr);
  }
  var ia = T(null), Sa = null;
  function Ll(e) {
    var t = e.alternate;
    q(vt, vt.current & 1), q(ia, e), Sa === null && (t === null || Jn.current !== null || t.memoizedState !== null) && (Sa = e);
  }
  function Ys(e) {
    q(vt, vt.current), q(ia, e), Sa === null && (Sa = e);
  }
  function ld(e) {
    e.tag === 22 ? (q(vt, vt.current), q(ia, e), Sa === null && (Sa = e)) : Bl();
  }
  function Bl() {
    q(vt, vt.current), q(ia, ia.current);
  }
  function ra(e) {
    H(ia), Sa === e && (Sa = null), H(vt);
  }
  var vt = T(0);
  function Zr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Jo(a) || $o(a)))
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
  var dl = 0, Ae = null, Pe = null, bt = null, kr = !1, $n = !1, gn = !1, Kr = 0, Hi = 0, Fn = null, Vg = 0;
  function ot() {
    throw Error(o(321));
  }
  function Xs(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!la(e[a], t[a])) return !1;
    return !0;
  }
  function Vs(e, t, a, l, i, u) {
    return dl = u, Ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, M.H = e === null || e.memoizedState === null ? qd : no, gn = !1, u = a(l, i), gn = !1, $n && (u = id(
      t,
      a,
      l,
      i
    )), nd(e), u;
  }
  function nd(e) {
    M.H = Yi;
    var t = Pe !== null && Pe.next !== null;
    if (dl = 0, bt = Pe = Ae = null, kr = !1, Hi = 0, Fn = null, t) throw Error(o(300));
    e === null || St || (e = e.dependencies, e !== null && Br(e) && (St = !0));
  }
  function id(e, t, a, l) {
    Ae = e;
    var i = 0;
    do {
      if ($n && (Fn = null), Hi = 0, $n = !1, 25 <= i) throw Error(o(301));
      if (i += 1, bt = Pe = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      M.H = Yd, u = t(a, l);
    } while ($n);
    return u;
  }
  function Qg() {
    var e = M.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Gi(t) : t, e = e.useState()[0], (Pe !== null ? Pe.memoizedState : null) !== e && (Ae.flags |= 1024), t;
  }
  function Qs() {
    var e = Kr !== 0;
    return Kr = 0, e;
  }
  function Zs(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function ks(e) {
    if (kr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      kr = !1;
    }
    dl = 0, bt = Pe = Ae = null, $n = !1, Hi = Kr = 0, Fn = null;
  }
  function Qt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return bt === null ? Ae.memoizedState = bt = e : bt = bt.next = e, bt;
  }
  function yt() {
    if (Pe === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Pe.next;
    var t = bt === null ? Ae.memoizedState : bt.next;
    if (t !== null)
      bt = t, Pe = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(o(467)) : Error(o(310));
      Pe = e, e = {
        memoizedState: Pe.memoizedState,
        baseState: Pe.baseState,
        baseQueue: Pe.baseQueue,
        queue: Pe.queue,
        next: null
      }, bt === null ? Ae.memoizedState = bt = e : bt = bt.next = e;
    }
    return bt;
  }
  function Jr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Gi(e) {
    var t = Hi;
    return Hi += 1, Fn === null && (Fn = []), e = $f(Fn, e, t), t = Ae, (bt === null ? t.memoizedState : bt.next) === null && (t = t.alternate, M.H = t === null || t.memoizedState === null ? qd : no), e;
  }
  function $r(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Gi(e);
      if (e.$$typeof === I) return jt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Ks(e) {
    var t = null, a = Ae.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = Ae.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Jr(), Ae.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = ce;
    return t.index++, a;
  }
  function hl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fr(e) {
    var t = yt();
    return Js(t, Pe, e);
  }
  function Js(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var i = e.baseQueue, u = l.pending;
    if (u !== null) {
      if (i !== null) {
        var c = i.next;
        i.next = u.next, u.next = c;
      }
      t.baseQueue = i = u, l.pending = null;
    }
    if (u = e.baseState, i === null) e.memoizedState = u;
    else {
      t = i.next;
      var p = c = null, R = null, U = t, G = !1;
      do {
        var Q = U.lane & -536870913;
        if (Q !== U.lane ? (Be & Q) === Q : (dl & Q) === Q) {
          var L = U.revertLane;
          if (L === 0)
            R !== null && (R = R.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), Q === Qn && (G = !0);
          else if ((dl & L) === L) {
            U = U.next, L === Qn && (G = !0);
            continue;
          } else
            Q = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, R === null ? (p = R = Q, c = u) : R = R.next = Q, Ae.lanes |= L, ql |= L;
          Q = U.action, gn && a(u, Q), u = U.hasEagerState ? U.eagerState : a(u, Q);
        } else
          L = {
            lane: Q,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, R === null ? (p = R = L, c = u) : R = R.next = L, Ae.lanes |= Q, ql |= Q;
        U = U.next;
      } while (U !== null && U !== t);
      if (R === null ? c = u : R.next = p, !la(u, e.memoizedState) && (St = !0, G && (a = Zn, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = c, e.baseQueue = R, l.lastRenderedState = u;
    }
    return i === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function $s(e) {
    var t = yt(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, i = a.pending, u = t.memoizedState;
    if (i !== null) {
      a.pending = null;
      var c = i = i.next;
      do
        u = e(u, c.action), c = c.next;
      while (c !== i);
      la(u, t.memoizedState) || (St = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function rd(e, t, a) {
    var l = Ae, i = yt(), u = Ge;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !la(
      (Pe || i).memoizedState,
      a
    );
    if (c && (i.memoizedState = a, St = !0), i = i.queue, Is(od.bind(null, l, i, e), [
      e
    ]), i.getSnapshot !== t || c || bt !== null && bt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Wn(
        9,
        { destroy: void 0 },
        sd.bind(
          null,
          l,
          i,
          a,
          t
        ),
        null
      ), nt === null) throw Error(o(349));
      u || (dl & 127) !== 0 || ud(l, t, a);
    }
    return a;
  }
  function ud(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ae.updateQueue, t === null ? (t = Jr(), Ae.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function sd(e, t, a, l) {
    t.value = a, t.getSnapshot = l, cd(t) && fd(e);
  }
  function od(e, t, a) {
    return a(function() {
      cd(t) && fd(e);
    });
  }
  function cd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !la(e, a);
    } catch {
      return !0;
    }
  }
  function fd(e) {
    var t = sn(e, 2);
    t !== null && It(t, e, 2);
  }
  function Fs(e) {
    var t = Qt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), gn) {
        ht(!0);
        try {
          a();
        } finally {
          ht(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: hl,
      lastRenderedState: e
    }, t;
  }
  function dd(e, t, a, l) {
    return e.baseState = a, Js(
      e,
      Pe,
      typeof l == "function" ? l : hl
    );
  }
  function Zg(e, t, a, l, i) {
    if (Pr(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: i,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      M.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, hd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function hd(e, t) {
    var a = t.action, l = t.payload, i = e.state;
    if (t.isTransition) {
      var u = M.T, c = {};
      M.T = c;
      try {
        var p = a(i, l), R = M.S;
        R !== null && R(c, p), md(e, t, p);
      } catch (U) {
        Ws(e, t, U);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), M.T = u;
      }
    } else
      try {
        u = a(i, l), md(e, t, u);
      } catch (U) {
        Ws(e, t, U);
      }
  }
  function md(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        vd(e, t, l);
      },
      function(l) {
        return Ws(e, t, l);
      }
    ) : vd(e, t, a);
  }
  function vd(e, t, a) {
    t.status = "fulfilled", t.value = a, yd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, hd(e, a)));
  }
  function Ws(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, yd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function yd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function gd(e, t) {
    return t;
  }
  function pd(e, t) {
    if (Ge) {
      var a = nt.formState;
      if (a !== null) {
        e: {
          var l = Ae;
          if (Ge) {
            if (rt) {
              t: {
                for (var i = rt, u = ba; i.nodeType !== 8; ) {
                  if (!u) {
                    i = null;
                    break t;
                  }
                  if (i = Ea(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                u = i.data, i = u === "F!" || u === "F" ? i : null;
              }
              if (i) {
                rt = Ea(
                  i.nextSibling
                ), l = i.data === "F!";
                break e;
              }
            }
            Dl(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = Qt(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gd,
      lastRenderedState: t
    }, a.queue = l, a = Bd.bind(
      null,
      Ae,
      l
    ), l.dispatch = a, l = Fs(!1), u = lo.bind(
      null,
      Ae,
      !1,
      l.queue
    ), l = Qt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = i, a = Zg.bind(
      null,
      Ae,
      i,
      u,
      a
    ), i.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function bd(e) {
    var t = yt();
    return Sd(t, Pe, e);
  }
  function Sd(e, t, a) {
    if (t = Js(
      e,
      t,
      gd
    )[0], e = Fr(hl)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Gi(t);
      } catch (c) {
        throw c === kn ? qr : c;
      }
    else l = t;
    t = yt();
    var i = t.queue, u = i.dispatch;
    return a !== t.memoizedState && (Ae.flags |= 2048, Wn(
      9,
      { destroy: void 0 },
      kg.bind(null, i, a),
      null
    )), [l, u, e];
  }
  function kg(e, t) {
    e.action = t;
  }
  function Ed(e) {
    var t = yt(), a = Pe;
    if (a !== null)
      return Sd(t, a, e);
    yt(), t = t.memoizedState, a = yt();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function Wn(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = Ae.updateQueue, t === null && (t = Jr(), Ae.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function xd() {
    return yt().memoizedState;
  }
  function Wr(e, t, a, l) {
    var i = Qt();
    Ae.flags |= e, i.memoizedState = Wn(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Ir(e, t, a, l) {
    var i = yt();
    l = l === void 0 ? null : l;
    var u = i.memoizedState.inst;
    Pe !== null && l !== null && Xs(l, Pe.memoizedState.deps) ? i.memoizedState = Wn(t, u, a, l) : (Ae.flags |= e, i.memoizedState = Wn(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Rd(e, t) {
    Wr(8390656, 8, e, t);
  }
  function Is(e, t) {
    Ir(2048, 8, e, t);
  }
  function Kg(e) {
    Ae.flags |= 4;
    var t = Ae.updateQueue;
    if (t === null)
      t = Jr(), Ae.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Td(e) {
    var t = yt().memoizedState;
    return Kg({ ref: t, nextImpl: e }), function() {
      if ((Ke & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function _d(e, t) {
    return Ir(4, 2, e, t);
  }
  function wd(e, t) {
    return Ir(4, 4, e, t);
  }
  function Nd(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Ad(e, t, a) {
    a = a != null ? a.concat([e]) : null, Ir(4, 4, Nd.bind(null, t, e), a);
  }
  function Ps() {
  }
  function Md(e, t) {
    var a = yt();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Xs(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function zd(e, t) {
    var a = yt();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Xs(t, l[1]))
      return l[0];
    if (l = e(), gn) {
      ht(!0);
      try {
        e();
      } finally {
        ht(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function eo(e, t, a) {
    return a === void 0 || (dl & 1073741824) !== 0 && (Be & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = Dh(), Ae.lanes |= e, ql |= e, a);
  }
  function Dd(e, t, a, l) {
    return la(a, t) ? a : Jn.current !== null ? (e = eo(e, a, l), la(e, t) || (St = !0), e) : (dl & 42) === 0 || (dl & 1073741824) !== 0 && (Be & 261930) === 0 ? (St = !0, e.memoizedState = a) : (e = Dh(), Ae.lanes |= e, ql |= e, t);
  }
  function Cd(e, t, a, l, i) {
    var u = V.p;
    V.p = u !== 0 && 8 > u ? u : 8;
    var c = M.T, p = {};
    M.T = p, lo(e, !1, t, a);
    try {
      var R = i(), U = M.S;
      if (U !== null && U(p, R), R !== null && typeof R == "object" && typeof R.then == "function") {
        var G = Xg(
          R,
          l
        );
        qi(
          e,
          t,
          G,
          oa(e)
        );
      } else
        qi(
          e,
          t,
          l,
          oa(e)
        );
    } catch (Q) {
      qi(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Q },
        oa()
      );
    } finally {
      V.p = u, c !== null && p.types !== null && (c.types = p.types), M.T = c;
    }
  }
  function Jg() {
  }
  function to(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var i = jd(e).queue;
    Cd(
      e,
      i,
      t,
      ne,
      a === null ? Jg : function() {
        return Od(e), a(l);
      }
    );
  }
  function jd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hl,
        lastRenderedState: ne
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hl,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Od(e) {
    var t = jd(e);
    t.next === null && (t = e.alternate.memoizedState), qi(
      e,
      t.next.queue,
      {},
      oa()
    );
  }
  function ao() {
    return jt(lr);
  }
  function Ud() {
    return yt().memoizedState;
  }
  function Ld() {
    return yt().memoizedState;
  }
  function $g(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = oa();
          e = Ol(a);
          var l = Ul(t, e, a);
          l !== null && (It(l, t, a), Ui(l, t, a)), t = { cache: Ds() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Fg(e, t, a) {
    var l = oa();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Pr(e) ? Hd(t, a) : (a = Ss(e, t, a, l), a !== null && (It(a, e, l), Gd(a, t, l)));
  }
  function Bd(e, t, a) {
    var l = oa();
    qi(e, t, a, l);
  }
  function qi(e, t, a, l) {
    var i = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Pr(e)) Hd(t, i);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, p = u(c, a);
          if (i.hasEagerState = !0, i.eagerState = p, la(p, c))
            return jr(e, t, i, 0), nt === null && Cr(), !1;
        } catch {
        } finally {
        }
      if (a = Ss(e, t, i, l), a !== null)
        return It(a, e, l), Gd(a, t, l), !0;
    }
    return !1;
  }
  function lo(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Lo(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Pr(e)) {
      if (t) throw Error(o(479));
    } else
      t = Ss(
        e,
        a,
        l,
        2
      ), t !== null && It(t, e, 2);
  }
  function Pr(e) {
    var t = e.alternate;
    return e === Ae || t !== null && t === Ae;
  }
  function Hd(e, t) {
    $n = kr = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Gd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Lt(e, a);
    }
  }
  var Yi = {
    readContext: jt,
    use: $r,
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
  Yi.useEffectEvent = ot;
  var qd = {
    readContext: jt,
    use: $r,
    useCallback: function(e, t) {
      return Qt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: jt,
    useEffect: Rd,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Wr(
        4194308,
        4,
        Nd.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Wr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Wr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = Qt();
      t = t === void 0 ? null : t;
      var l = e();
      if (gn) {
        ht(!0);
        try {
          e();
        } finally {
          ht(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = Qt();
      if (a !== void 0) {
        var i = a(t);
        if (gn) {
          ht(!0);
          try {
            a(t);
          } finally {
            ht(!1);
          }
        }
      } else i = t;
      return l.memoizedState = l.baseState = i, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i
      }, l.queue = e, e = e.dispatch = Fg.bind(
        null,
        Ae,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = Qt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Fs(e);
      var t = e.queue, a = Bd.bind(null, Ae, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Ps,
    useDeferredValue: function(e, t) {
      var a = Qt();
      return eo(a, e, t);
    },
    useTransition: function() {
      var e = Fs(!1);
      return e = Cd.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), Qt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = Ae, i = Qt();
      if (Ge) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), nt === null)
          throw Error(o(349));
        (Be & 127) !== 0 || ud(l, t, a);
      }
      i.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return i.queue = u, Rd(od.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, Wn(
        9,
        { destroy: void 0 },
        sd.bind(
          null,
          l,
          u,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = Qt(), t = nt.identifierPrefix;
      if (Ge) {
        var a = Ja, l = Ka;
        a = (l & ~(1 << 32 - Rt(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Kr++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Vg++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: ao,
    useFormState: pd,
    useActionState: pd,
    useOptimistic: function(e) {
      var t = Qt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = lo.bind(
        null,
        Ae,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Ks,
    useCacheRefresh: function() {
      return Qt().memoizedState = $g.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var t = Qt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Ke & 2) !== 0)
          throw Error(o(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, no = {
    readContext: jt,
    use: $r,
    useCallback: Md,
    useContext: jt,
    useEffect: Is,
    useImperativeHandle: Ad,
    useInsertionEffect: _d,
    useLayoutEffect: wd,
    useMemo: zd,
    useReducer: Fr,
    useRef: xd,
    useState: function() {
      return Fr(hl);
    },
    useDebugValue: Ps,
    useDeferredValue: function(e, t) {
      var a = yt();
      return Dd(
        a,
        Pe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Fr(hl)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Gi(e),
        t
      ];
    },
    useSyncExternalStore: rd,
    useId: Ud,
    useHostTransitionStatus: ao,
    useFormState: bd,
    useActionState: bd,
    useOptimistic: function(e, t) {
      var a = yt();
      return dd(a, Pe, e, t);
    },
    useMemoCache: Ks,
    useCacheRefresh: Ld
  };
  no.useEffectEvent = Td;
  var Yd = {
    readContext: jt,
    use: $r,
    useCallback: Md,
    useContext: jt,
    useEffect: Is,
    useImperativeHandle: Ad,
    useInsertionEffect: _d,
    useLayoutEffect: wd,
    useMemo: zd,
    useReducer: $s,
    useRef: xd,
    useState: function() {
      return $s(hl);
    },
    useDebugValue: Ps,
    useDeferredValue: function(e, t) {
      var a = yt();
      return Pe === null ? eo(a, e, t) : Dd(
        a,
        Pe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = $s(hl)[0], t = yt().memoizedState;
      return [
        typeof e == "boolean" ? e : Gi(e),
        t
      ];
    },
    useSyncExternalStore: rd,
    useId: Ud,
    useHostTransitionStatus: ao,
    useFormState: Ed,
    useActionState: Ed,
    useOptimistic: function(e, t) {
      var a = yt();
      return Pe !== null ? dd(a, Pe, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Ks,
    useCacheRefresh: Ld
  };
  Yd.useEffectEvent = Td;
  function io(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : h({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var ro = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = oa(), i = Ol(l);
      i.payload = t, a != null && (i.callback = a), t = Ul(e, i, l), t !== null && (It(t, e, l), Ui(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = oa(), i = Ol(l);
      i.tag = 1, i.payload = t, a != null && (i.callback = a), t = Ul(e, i, l), t !== null && (It(t, e, l), Ui(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = oa(), l = Ol(a);
      l.tag = 2, t != null && (l.callback = t), t = Ul(e, l, a), t !== null && (It(t, e, a), Ui(t, e, a));
    }
  };
  function Xd(e, t, a, l, i, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, c) : t.prototype && t.prototype.isPureReactComponent ? !Ni(a, l) || !Ni(i, u) : !0;
  }
  function Vd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && ro.enqueueReplaceState(t, t.state, null);
  }
  function pn(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = h({}, a));
      for (var i in e)
        a[i] === void 0 && (a[i] = e[i]);
    }
    return a;
  }
  function Qd(e) {
    Dr(e);
  }
  function Zd(e) {
    console.error(e);
  }
  function kd(e) {
    Dr(e);
  }
  function eu(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Kd(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function uo(e, t, a) {
    return a = Ol(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      eu(e, t);
    }, a;
  }
  function Jd(e) {
    return e = Ol(e), e.tag = 3, e;
  }
  function $d(e, t, a, l) {
    var i = a.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var u = l.value;
      e.payload = function() {
        return i(u);
      }, e.callback = function() {
        Kd(t, a, l);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      Kd(t, a, l), typeof i != "function" && (Yl === null ? Yl = /* @__PURE__ */ new Set([this]) : Yl.add(this));
      var p = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: p !== null ? p : ""
      });
    });
  }
  function Wg(e, t, a, l, i) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && Vn(
        t,
        a,
        i,
        !0
      ), a = ia.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return Sa === null ? du() : a.alternate === null && ct === 0 && (ct = 3), a.flags &= -257, a.flags |= 65536, a.lanes = i, l === Yr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), jo(e, l, i)), !1;
          case 22:
            return a.flags |= 65536, l === Yr ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), jo(e, l, i)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return jo(e, l, i), du(), !1;
    }
    if (Ge)
      return t = ia.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, l !== ws && (e = Error(o(422), { cause: l }), zi(ya(e, a)))) : (l !== ws && (t = Error(o(423), {
        cause: l
      }), zi(
        ya(t, a)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, l = ya(l, a), i = uo(
        e.stateNode,
        l,
        i
      ), Bs(e, i), ct !== 4 && (ct = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = ya(u, a), $i === null ? $i = [u] : $i.push(u), ct !== 4 && (ct = 2), t === null) return !0;
    l = ya(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = i & -i, a.lanes |= e, e = uo(a.stateNode, l, e), Bs(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Yl === null || !Yl.has(u))))
            return a.flags |= 65536, i &= -i, a.lanes |= i, i = Jd(i), $d(
              i,
              e,
              a,
              l
            ), Bs(a, i), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var so = Error(o(461)), St = !1;
  function Ot(e, t, a, l) {
    t.child = e === null ? Pf(t, null, a, l) : yn(
      t,
      e.child,
      a,
      l
    );
  }
  function Fd(e, t, a, l, i) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var c = {};
      for (var p in l)
        p !== "ref" && (c[p] = l[p]);
    } else c = l;
    return dn(t), l = Vs(
      e,
      t,
      a,
      c,
      u,
      i
    ), p = Qs(), e !== null && !St ? (Zs(e, t, i), ml(e, t, i)) : (Ge && p && Ts(t), t.flags |= 1, Ot(e, t, l, i), t.child);
  }
  function Wd(e, t, a, l, i) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !Es(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, Id(
        e,
        t,
        u,
        l,
        i
      )) : (e = Ur(
        a.type,
        null,
        l,
        t,
        t.mode,
        i
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !go(e, i)) {
      var c = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Ni, a(c, l) && e.ref === t.ref)
        return ml(e, t, i);
    }
    return t.flags |= 1, e = sl(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Id(e, t, a, l, i) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ni(u, l) && e.ref === t.ref)
        if (St = !1, t.pendingProps = l = u, go(e, i))
          (e.flags & 131072) !== 0 && (St = !0);
        else
          return t.lanes = e.lanes, ml(e, t, i);
    }
    return oo(
      e,
      t,
      a,
      l,
      i
    );
  }
  function Pd(e, t, a, l) {
    var i = l.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | a : a, e !== null) {
          for (l = t.child = e.child, i = 0; l !== null; )
            i = i | l.lanes | l.childLanes, l = l.sibling;
          l = i & ~u;
        } else l = 0, t.child = null;
        return eh(
          e,
          t,
          u,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Gr(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? ad(t, u) : Gs(), ld(t);
      else
        return l = t.lanes = 536870912, eh(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Gr(t, u.cachePool), ad(t, u), Bl(), t.memoizedState = null) : (e !== null && Gr(t, null), Gs(), Bl());
    return Ot(e, t, i, a), t.child;
  }
  function Xi(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function eh(e, t, a, l, i) {
    var u = js();
    return u = u === null ? null : { parent: pt._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Gr(t, null), Gs(), ld(t), e !== null && Vn(e, t, l, !0), t.childLanes = i, null;
  }
  function tu(e, t) {
    return t = lu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function th(e, t, a) {
    return yn(t, e.child, null, a), e = tu(t, t.pendingProps), e.flags |= 2, ra(t), t.memoizedState = null, e;
  }
  function Ig(e, t, a) {
    var l = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ge) {
        if (l.mode === "hidden")
          return e = tu(t, l), t.lanes = 536870912, Xi(null, e);
        if (Ys(t), (e = rt) ? (e = hm(
          e,
          ba
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ml !== null ? { id: Ka, overflow: Ja } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Hf(e), a.return = t, t.child = a, Ct = t, rt = null)) : e = null, e === null) throw Dl(t);
        return t.lanes = 536870912, null;
      }
      return tu(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Ys(t), i)
        if (t.flags & 256)
          t.flags &= -257, t = th(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (St || Vn(e, t, a, !1), i = (a & e.childLanes) !== 0, St || i) {
        if (l = nt, l !== null && (c = x(l, a), c !== 0 && c !== u.retryLane))
          throw u.retryLane = c, sn(e, c), It(l, e, c), so;
        du(), t = th(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, rt = Ea(c.nextSibling), Ct = t, Ge = !0, zl = null, ba = !1, e !== null && Yf(t, e), t = tu(t, l), t.flags |= 4096;
      return t;
    }
    return e = sl(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function au(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function oo(e, t, a, l, i) {
    return dn(t), a = Vs(
      e,
      t,
      a,
      l,
      void 0,
      i
    ), l = Qs(), e !== null && !St ? (Zs(e, t, i), ml(e, t, i)) : (Ge && l && Ts(t), t.flags |= 1, Ot(e, t, a, i), t.child);
  }
  function ah(e, t, a, l, i, u) {
    return dn(t), t.updateQueue = null, a = id(
      t,
      l,
      a,
      i
    ), nd(e), l = Qs(), e !== null && !St ? (Zs(e, t, u), ml(e, t, u)) : (Ge && l && Ts(t), t.flags |= 1, Ot(e, t, a, u), t.child);
  }
  function lh(e, t, a, l, i) {
    if (dn(t), t.stateNode === null) {
      var u = Gn, c = a.contextType;
      typeof c == "object" && c !== null && (u = jt(c)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ro, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, Us(t), c = a.contextType, u.context = typeof c == "object" && c !== null ? jt(c) : Gn, u.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (io(
        t,
        a,
        c,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ro.enqueueReplaceState(u, u.state, null), Bi(t, l, u, i), Li(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var p = t.memoizedProps, R = pn(a, p);
      u.props = R;
      var U = u.context, G = a.contextType;
      c = Gn, typeof G == "object" && G !== null && (c = jt(G));
      var Q = a.getDerivedStateFromProps;
      G = typeof Q == "function" || typeof u.getSnapshotBeforeUpdate == "function", p = t.pendingProps !== p, G || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p || U !== c) && Vd(
        t,
        u,
        l,
        c
      ), jl = !1;
      var L = t.memoizedState;
      u.state = L, Bi(t, l, u, i), Li(), U = t.memoizedState, p || L !== U || jl ? (typeof Q == "function" && (io(
        t,
        a,
        Q,
        l
      ), U = t.memoizedState), (R = jl || Xd(
        t,
        a,
        R,
        l,
        L,
        U,
        c
      )) ? (G || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = U), u.props = l, u.state = U, u.context = c, l = R) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Ls(e, t), c = t.memoizedProps, G = pn(a, c), u.props = G, Q = t.pendingProps, L = u.context, U = a.contextType, R = Gn, typeof U == "object" && U !== null && (R = jt(U)), p = a.getDerivedStateFromProps, (U = typeof p == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== Q || L !== R) && Vd(
        t,
        u,
        l,
        R
      ), jl = !1, L = t.memoizedState, u.state = L, Bi(t, l, u, i), Li();
      var B = t.memoizedState;
      c !== Q || L !== B || jl || e !== null && e.dependencies !== null && Br(e.dependencies) ? (typeof p == "function" && (io(
        t,
        a,
        p,
        l
      ), B = t.memoizedState), (G = jl || Xd(
        t,
        a,
        G,
        l,
        L,
        B,
        R
      ) || e !== null && e.dependencies !== null && Br(e.dependencies)) ? (U || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, B, R), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        B,
        R
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = B), u.props = l, u.state = B, u.context = R, l = G) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && L === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && L === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, au(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = yn(
      t,
      e.child,
      null,
      i
    ), t.child = yn(
      t,
      null,
      a,
      i
    )) : Ot(e, t, a, i), t.memoizedState = u.state, e = t.child) : e = ml(
      e,
      t,
      i
    ), e;
  }
  function nh(e, t, a, l) {
    return cn(), t.flags |= 256, Ot(e, t, a, l), t.child;
  }
  var co = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function fo(e) {
    return { baseLanes: e, cachePool: Kf() };
  }
  function ho(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= sa), e;
  }
  function ih(e, t, a) {
    var l = t.pendingProps, i = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (vt.current & 2) !== 0), c && (i = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ge) {
        if (i ? Ll(t) : Bl(), (e = rt) ? (e = hm(
          e,
          ba
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ml !== null ? { id: Ka, overflow: Ja } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Hf(e), a.return = t, t.child = a, Ct = t, rt = null)) : e = null, e === null) throw Dl(t);
        return $o(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var p = l.children;
      return l = l.fallback, i ? (Bl(), i = t.mode, p = lu(
        { mode: "hidden", children: p },
        i
      ), l = on(
        l,
        i,
        a,
        null
      ), p.return = t, l.return = t, p.sibling = l, t.child = p, l = t.child, l.memoizedState = fo(a), l.childLanes = ho(
        e,
        c,
        a
      ), t.memoizedState = co, Xi(null, l)) : (Ll(t), mo(t, p));
    }
    var R = e.memoizedState;
    if (R !== null && (p = R.dehydrated, p !== null)) {
      if (u)
        t.flags & 256 ? (Ll(t), t.flags &= -257, t = vo(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (Bl(), t.child = e.child, t.flags |= 128, t = null) : (Bl(), p = l.fallback, i = t.mode, l = lu(
          { mode: "visible", children: l.children },
          i
        ), p = on(
          p,
          i,
          a,
          null
        ), p.flags |= 2, l.return = t, p.return = t, l.sibling = p, t.child = l, yn(
          t,
          e.child,
          null,
          a
        ), l = t.child, l.memoizedState = fo(a), l.childLanes = ho(
          e,
          c,
          a
        ), t.memoizedState = co, t = Xi(null, l));
      else if (Ll(t), $o(p)) {
        if (c = p.nextSibling && p.nextSibling.dataset, c) var U = c.dgst;
        c = U, l = Error(o(419)), l.stack = "", l.digest = c, zi({ value: l, source: null, stack: null }), t = vo(
          e,
          t,
          a
        );
      } else if (St || Vn(e, t, a, !1), c = (a & e.childLanes) !== 0, St || c) {
        if (c = nt, c !== null && (l = x(c, a), l !== 0 && l !== R.retryLane))
          throw R.retryLane = l, sn(e, l), It(c, e, l), so;
        Jo(p) || du(), t = vo(
          e,
          t,
          a
        );
      } else
        Jo(p) ? (t.flags |= 192, t.child = e.child, t = null) : (e = R.treeContext, rt = Ea(
          p.nextSibling
        ), Ct = t, Ge = !0, zl = null, ba = !1, e !== null && Yf(t, e), t = mo(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return i ? (Bl(), p = l.fallback, i = t.mode, R = e.child, U = R.sibling, l = sl(R, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = R.subtreeFlags & 65011712, U !== null ? p = sl(
      U,
      p
    ) : (p = on(
      p,
      i,
      a,
      null
    ), p.flags |= 2), p.return = t, l.return = t, l.sibling = p, t.child = l, Xi(null, l), l = t.child, p = e.child.memoizedState, p === null ? p = fo(a) : (i = p.cachePool, i !== null ? (R = pt._currentValue, i = i.parent !== R ? { parent: R, pool: R } : i) : i = Kf(), p = {
      baseLanes: p.baseLanes | a,
      cachePool: i
    }), l.memoizedState = p, l.childLanes = ho(
      e,
      c,
      a
    ), t.memoizedState = co, Xi(e.child, l)) : (Ll(t), a = e.child, e = a.sibling, a = sl(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function mo(e, t) {
    return t = lu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function lu(e, t) {
    return e = na(22, e, null, t), e.lanes = 0, e;
  }
  function vo(e, t, a) {
    return yn(t, e.child, null, a), e = mo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function rh(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Ms(e.return, t, a);
  }
  function yo(e, t, a, l, i, u) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: i,
      treeForkCount: u
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = l, c.tail = a, c.tailMode = i, c.treeForkCount = u);
  }
  function uh(e, t, a) {
    var l = t.pendingProps, i = l.revealOrder, u = l.tail;
    l = l.children;
    var c = vt.current, p = (c & 2) !== 0;
    if (p ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, q(vt, c), Ot(e, t, l, a), l = Ge ? Mi : 0, !p && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && rh(e, a, t);
        else if (e.tag === 19)
          rh(e, a, t);
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
    switch (i) {
      case "forwards":
        for (a = t.child, i = null; a !== null; )
          e = a.alternate, e !== null && Zr(e) === null && (i = a), a = a.sibling;
        a = i, a === null ? (i = t.child, t.child = null) : (i = a.sibling, a.sibling = null), yo(
          t,
          !1,
          i,
          a,
          u,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && Zr(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = a, a = i, i = e;
        }
        yo(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        yo(
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
  function ml(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ql |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (Vn(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = sl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = sl(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function go(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Br(e)));
  }
  function Pg(e, t, a) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo), Cl(t, pt, e.memoizedState.cache), cn();
        break;
      case 27:
      case 5:
        fa(t);
        break;
      case 4:
        Te(t, t.stateNode.containerInfo);
        break;
      case 10:
        Cl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ys(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Ll(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? ih(e, t, a) : (Ll(t), e = ml(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        Ll(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (l = (a & t.childLanes) !== 0, l || (Vn(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), i) {
          if (l)
            return uh(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), q(vt, vt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Pd(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        Cl(t, pt, e.memoizedState.cache);
    }
    return ml(e, t, a);
  }
  function sh(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        St = !0;
      else {
        if (!go(e, a) && (t.flags & 128) === 0)
          return St = !1, Pg(
            e,
            t,
            a
          );
        St = (e.flags & 131072) !== 0;
      }
    else
      St = !1, Ge && (t.flags & 1048576) !== 0 && qf(t, Mi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = mn(t.elementType), t.type = e, typeof e == "function")
            Es(e) ? (l = pn(e, l), t.tag = 1, t = lh(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = oo(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === pe) {
                t.tag = 11, t = Fd(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (i === F) {
                t.tag = 14, t = Wd(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              }
            }
            throw t = De(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return oo(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, i = pn(
          l,
          t.pendingProps
        ), lh(
          e,
          t,
          l,
          i,
          a
        );
      case 3:
        e: {
          if (Te(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          i = u.element, Ls(e, t), Bi(t, l, null, a);
          var c = t.memoizedState;
          if (l = c.cache, Cl(t, pt, l), l !== u.cache && zs(
            t,
            [pt],
            a,
            !0
          ), Li(), l = c.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = nh(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== i) {
              i = ya(
                Error(o(424)),
                t
              ), zi(i), t = nh(
                e,
                t,
                l,
                a
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
              for (rt = Ea(e.firstChild), Ct = t, Ge = !0, zl = null, ba = !0, a = Pf(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (cn(), l === i) {
              t = ml(
                e,
                t,
                a
              );
              break e;
            }
            Ot(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return au(e, t), e === null ? (a = bm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : Ge || (a = t.type, e = t.pendingProps, l = bu(
          oe.current
        ).createElement(a), l[ae] = t, l[ie] = e, Ut(l, a, e), Ve(l), t.stateNode = l) : t.memoizedState = bm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return fa(t), e === null && Ge && (l = t.stateNode = ym(
          t.type,
          t.pendingProps,
          oe.current
        ), Ct = t, ba = !0, i = rt, Zl(t.type) ? (Fo = i, rt = Ea(l.firstChild)) : rt = i), Ot(
          e,
          t,
          t.pendingProps.children,
          a
        ), au(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ge && ((i = l = rt) && (l = Mp(
          l,
          t.type,
          t.pendingProps,
          ba
        ), l !== null ? (t.stateNode = l, Ct = t, rt = Ea(l.firstChild), ba = !1, i = !0) : i = !1), i || Dl(t)), fa(t), i = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, l = u.children, Zo(i, u) ? l = null : c !== null && Zo(i, c) && (t.flags |= 32), t.memoizedState !== null && (i = Vs(
          e,
          t,
          Qg,
          null,
          null,
          a
        ), lr._currentValue = i), au(e, t), Ot(e, t, l, a), t.child;
      case 6:
        return e === null && Ge && ((e = a = rt) && (a = zp(
          a,
          t.pendingProps,
          ba
        ), a !== null ? (t.stateNode = a, Ct = t, rt = null, e = !0) : e = !1), e || Dl(t)), null;
      case 13:
        return ih(e, t, a);
      case 4:
        return Te(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = yn(
          t,
          null,
          l,
          a
        ) : Ot(e, t, l, a), t.child;
      case 11:
        return Fd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return Ot(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return Ot(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Ot(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return l = t.pendingProps, Cl(t, t.type, l.value), Ot(e, t, l.children, a), t.child;
      case 9:
        return i = t.type._context, l = t.pendingProps.children, dn(t), i = jt(i), l = l(i), t.flags |= 1, Ot(e, t, l, a), t.child;
      case 14:
        return Wd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Id(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return uh(e, t, a);
      case 31:
        return Ig(e, t, a);
      case 22:
        return Pd(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return dn(t), l = jt(pt), e === null ? (i = js(), i === null && (i = nt, u = Ds(), i.pooledCache = u, u.refCount++, u !== null && (i.pooledCacheLanes |= a), i = u), t.memoizedState = { parent: l, cache: i }, Us(t), Cl(t, pt, i)) : ((e.lanes & a) !== 0 && (Ls(e, t), Bi(t, null, null, a), Li()), i = e.memoizedState, u = t.memoizedState, i.parent !== l ? (i = { parent: l, cache: l }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Cl(t, pt, l)) : (l = u.cache, Cl(t, pt, l), l !== i.cache && zs(
          t,
          [pt],
          a,
          !0
        ))), Ot(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function vl(e) {
    e.flags |= 4;
  }
  function po(e, t, a, l, i) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Uh()) e.flags |= 8192;
        else
          throw vn = Yr, Os;
    } else e.flags &= -16777217;
  }
  function oh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Tm(t))
      if (Uh()) e.flags |= 8192;
      else
        throw vn = Yr, Os;
  }
  function nu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Tt() : 536870912, e.lanes |= t, ti |= t);
  }
  function Vi(e, t) {
    if (!Ge)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function ut(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var i = e.child; i !== null; )
        a |= i.lanes | i.childLanes, l |= i.subtreeFlags & 65011712, l |= i.flags & 65011712, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        a |= i.lanes | i.childLanes, l |= i.subtreeFlags, l |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function ep(e, t, a) {
    var l = t.pendingProps;
    switch (_s(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ut(t), null;
      case 1:
        return ut(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), fl(pt), Ye(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Xn(t) ? vl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ns())), ut(t), null;
      case 26:
        var i = t.type, u = t.memoizedState;
        return e === null ? (vl(t), u !== null ? (ut(t), oh(t, u)) : (ut(t), po(
          t,
          i,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (vl(t), ut(t), oh(t, u)) : (ut(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && vl(t), ut(t), po(
          t,
          i,
          e,
          l,
          a
        )), null;
      case 27:
        if (Aa(t), a = oe.current, i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && vl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return ut(t), null;
          }
          e = J.current, Xn(t) ? Xf(t) : (e = ym(i, l, a), t.stateNode = e, vl(t));
        }
        return ut(t), null;
      case 5:
        if (Aa(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && vl(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return ut(t), null;
          }
          if (u = J.current, Xn(t))
            Xf(t);
          else {
            var c = bu(
              oe.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof l.is == "string" ? c.createElement("select", {
                      is: l.is
                    }) : c.createElement("select"), l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                    break;
                  default:
                    u = typeof l.is == "string" ? c.createElement(i, { is: l.is }) : c.createElement(i);
                }
            }
            u[ae] = t, u[ie] = l;
            e: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break e;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break e;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = u;
            e: switch (Ut(u, i, l), i) {
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
            l && vl(t);
          }
        }
        return ut(t), po(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && vl(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = oe.current, Xn(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, i = Ct, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  l = i.memoizedProps;
              }
            e[ae] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || im(e.nodeValue, a)), e || Dl(t, !0);
          } else
            e = bu(e).createTextNode(
              l
            ), e[ae] = t, t.stateNode = e;
        }
        return ut(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Xn(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ae] = t;
            } else
              cn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ut(t), e = !1;
          } else
            a = Ns(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (ra(t), t) : (ra(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return ut(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = Xn(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(o(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(o(317));
              i[ae] = t;
            } else
              cn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ut(t), i = !1;
          } else
            i = Ns(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (ra(t), t) : (ra(t), null);
        }
        return ra(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, i = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== i && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), nu(t, t.updateQueue), ut(t), null);
      case 4:
        return Ye(), e === null && qo(t.stateNode.containerInfo), ut(t), null;
      case 10:
        return fl(t.type), ut(t), null;
      case 19:
        if (H(vt), l = t.memoizedState, l === null) return ut(t), null;
        if (i = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (i) Vi(l, !1);
          else {
            if (ct !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Zr(e), u !== null) {
                  for (t.flags |= 128, Vi(l, !1), e = u.updateQueue, t.updateQueue = e, nu(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Bf(a, e), a = a.sibling;
                  return q(
                    vt,
                    vt.current & 1 | 2
                  ), Ge && ol(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Mt() > ou && (t.flags |= 128, i = !0, Vi(l, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = Zr(u), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, nu(t, e), Vi(l, !0), l.tail === null && l.tailMode === "hidden" && !u.alternate && !Ge)
                return ut(t), null;
            } else
              2 * Mt() - l.renderingStartTime > ou && a !== 536870912 && (t.flags |= 128, i = !0, Vi(l, !1), t.lanes = 4194304);
          l.isBackwards ? (u.sibling = t.child, t.child = u) : (e = l.last, e !== null ? e.sibling = u : t.child = u, l.last = u);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Mt(), e.sibling = null, a = vt.current, q(
          vt,
          i ? a & 1 | 2 : a & 1
        ), Ge && ol(t, l.treeForkCount), e) : (ut(t), null);
      case 22:
      case 23:
        return ra(t), qs(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (ut(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ut(t), a = t.updateQueue, a !== null && nu(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && H(hn), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), fl(pt), ut(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function tp(e, t) {
    switch (_s(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return fl(pt), Ye(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Aa(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ra(t), t.alternate === null)
            throw Error(o(340));
          cn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (ra(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          cn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return H(vt), null;
      case 4:
        return Ye(), null;
      case 10:
        return fl(t.type), null;
      case 22:
      case 23:
        return ra(t), qs(), e !== null && H(hn), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return fl(pt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ch(e, t) {
    switch (_s(t), t.tag) {
      case 3:
        fl(pt), Ye();
        break;
      case 26:
      case 27:
      case 5:
        Aa(t);
        break;
      case 4:
        Ye();
        break;
      case 31:
        t.memoizedState !== null && ra(t);
        break;
      case 13:
        ra(t);
        break;
      case 19:
        H(vt);
        break;
      case 10:
        fl(t.type);
        break;
      case 22:
      case 23:
        ra(t), qs(), e !== null && H(hn);
        break;
      case 24:
        fl(pt);
    }
  }
  function Qi(e, t) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var u = a.create, c = a.inst;
            l = u(), c.destroy = l;
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (p) {
      We(t, t.return, p);
    }
  }
  function Hl(e, t, a) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            var c = l.inst, p = c.destroy;
            if (p !== void 0) {
              c.destroy = void 0, i = t;
              var R = a, U = p;
              try {
                U();
              } catch (G) {
                We(
                  i,
                  R,
                  G
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (G) {
      We(t, t.return, G);
    }
  }
  function fh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        td(t, a);
      } catch (l) {
        We(e, e.return, l);
      }
    }
  }
  function dh(e, t, a) {
    a.props = pn(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      We(e, t, l);
    }
  }
  function Zi(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
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
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (i) {
      We(e, t, i);
    }
  }
  function $a(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (i) {
          We(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (i) {
          We(e, t, i);
        }
      else a.current = null;
  }
  function hh(e) {
    var t = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (i) {
      We(e, e.return, i);
    }
  }
  function bo(e, t, a) {
    try {
      var l = e.stateNode;
      Rp(l, e.type, a, t), l[ie] = t;
    } catch (i) {
      We(e, e.return, i);
    }
  }
  function mh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zl(e.type) || e.tag === 4;
  }
  function So(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || mh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Zl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Eo(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = rl));
    else if (l !== 4 && (l === 27 && Zl(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Eo(e, t, a), e = e.sibling; e !== null; )
        Eo(e, t, a), e = e.sibling;
  }
  function iu(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && Zl(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (iu(e, t, a), e = e.sibling; e !== null; )
        iu(e, t, a), e = e.sibling;
  }
  function vh(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      Ut(t, l, a), t[ae] = e, t[ie] = a;
    } catch (u) {
      We(e, e.return, u);
    }
  }
  var yl = !1, Et = !1, xo = !1, yh = typeof WeakSet == "function" ? WeakSet : Set, Nt = null;
  function ap(e, t) {
    if (e = e.containerInfo, Vo = wu, e = Af(e), ms(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var i = l.anchorOffset, u = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, u.nodeType;
            } catch {
              a = null;
              break e;
            }
            var c = 0, p = -1, R = -1, U = 0, G = 0, Q = e, L = null;
            t: for (; ; ) {
              for (var B; Q !== a || i !== 0 && Q.nodeType !== 3 || (p = c + i), Q !== u || l !== 0 && Q.nodeType !== 3 || (R = c + l), Q.nodeType === 3 && (c += Q.nodeValue.length), (B = Q.firstChild) !== null; )
                L = Q, Q = B;
              for (; ; ) {
                if (Q === e) break t;
                if (L === a && ++U === i && (p = c), L === u && ++G === l && (R = c), (B = Q.nextSibling) !== null) break;
                Q = L, L = Q.parentNode;
              }
              Q = B;
            }
            a = p === -1 || R === -1 ? null : { start: p, end: R };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Qo = { focusedElem: e, selectionRange: a }, wu = !1, Nt = t; Nt !== null; )
      if (t = Nt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Nt = e;
      else
        for (; Nt !== null; ) {
          switch (t = Nt, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  i = e[a], i.ref.impl = i.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, a = t, i = u.memoizedProps, u = u.memoizedState, l = a.stateNode;
                try {
                  var se = pn(
                    a.type,
                    i
                  );
                  e = l.getSnapshotBeforeUpdate(
                    se,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (be) {
                  We(
                    a,
                    a.return,
                    be
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Ko(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ko(e);
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
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Nt = e;
            break;
          }
          Nt = t.return;
        }
  }
  function gh(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        pl(e, a), l & 4 && Qi(5, a);
        break;
      case 1:
        if (pl(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              We(a, a.return, c);
            }
          else {
            var i = pn(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                i,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              We(
                a,
                a.return,
                c
              );
            }
          }
        l & 64 && fh(a), l & 512 && Zi(a, a.return);
        break;
      case 3:
        if (pl(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            td(e, t);
          } catch (c) {
            We(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && l & 4 && vh(a);
      case 26:
      case 5:
        pl(e, a), t === null && l & 4 && hh(a), l & 512 && Zi(a, a.return);
        break;
      case 12:
        pl(e, a);
        break;
      case 31:
        pl(e, a), l & 4 && Sh(e, a);
        break;
      case 13:
        pl(e, a), l & 4 && Eh(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = fp.bind(
          null,
          a
        ), Dp(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || yl, !l) {
          t = t !== null && t.memoizedState !== null || Et, i = yl;
          var u = Et;
          yl = l, (Et = t) && !u ? bl(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : pl(e, a), yl = i, Et = u;
        }
        break;
      case 30:
        break;
      default:
        pl(e, a);
    }
  }
  function ph(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, ph(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Qe(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var st = null, Jt = !1;
  function gl(e, t, a) {
    for (a = a.child; a !== null; )
      bh(e, t, a), a = a.sibling;
  }
  function bh(e, t, a) {
    if (zt && typeof zt.onCommitFiberUnmount == "function")
      try {
        zt.onCommitFiberUnmount(Da, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Et || $a(a, t), gl(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Et || $a(a, t);
        var l = st, i = Jt;
        Zl(a.type) && (st = a.stateNode, Jt = !1), gl(
          e,
          t,
          a
        ), er(a.stateNode), st = l, Jt = i;
        break;
      case 5:
        Et || $a(a, t);
      case 6:
        if (l = st, i = Jt, st = null, gl(
          e,
          t,
          a
        ), st = l, Jt = i, st !== null)
          if (Jt)
            try {
              (st.nodeType === 9 ? st.body : st.nodeName === "HTML" ? st.ownerDocument.body : st).removeChild(a.stateNode);
            } catch (u) {
              We(
                a,
                t,
                u
              );
            }
          else
            try {
              st.removeChild(a.stateNode);
            } catch (u) {
              We(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        st !== null && (Jt ? (e = st, fm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), oi(e)) : fm(st, a.stateNode));
        break;
      case 4:
        l = st, i = Jt, st = a.stateNode.containerInfo, Jt = !0, gl(
          e,
          t,
          a
        ), st = l, Jt = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Hl(2, a, t), Et || Hl(4, a, t), gl(
          e,
          t,
          a
        );
        break;
      case 1:
        Et || ($a(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && dh(
          a,
          t,
          l
        )), gl(
          e,
          t,
          a
        );
        break;
      case 21:
        gl(
          e,
          t,
          a
        );
        break;
      case 22:
        Et = (l = Et) || a.memoizedState !== null, gl(
          e,
          t,
          a
        ), Et = l;
        break;
      default:
        gl(
          e,
          t,
          a
        );
    }
  }
  function Sh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        oi(e);
      } catch (a) {
        We(t, t.return, a);
      }
    }
  }
  function Eh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        oi(e);
      } catch (a) {
        We(t, t.return, a);
      }
  }
  function lp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new yh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new yh()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ru(e, t) {
    var a = lp(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var i = dp.bind(null, e, l);
        l.then(i, i);
      }
    });
  }
  function $t(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var i = a[l], u = e, c = t, p = c;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (Zl(p.type)) {
                st = p.stateNode, Jt = !1;
                break e;
              }
              break;
            case 5:
              st = p.stateNode, Jt = !1;
              break e;
            case 3:
            case 4:
              st = p.stateNode.containerInfo, Jt = !0;
              break e;
          }
          p = p.return;
        }
        if (st === null) throw Error(o(160));
        bh(u, c, i), st = null, Jt = !1, u = i.alternate, u !== null && (u.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        xh(t, e), t = t.sibling;
  }
  var Ba = null;
  function xh(e, t) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $t(t, e), Ft(e), l & 4 && (Hl(3, e, e.return), Qi(3, e), Hl(5, e, e.return));
        break;
      case 1:
        $t(t, e), Ft(e), l & 512 && (Et || a === null || $a(a, a.return)), l & 64 && yl && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var i = Ba;
        if ($t(t, e), Ft(e), l & 512 && (Et || a === null || $a(a, a.return)), l & 4) {
          var u = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, i = i.ownerDocument || i;
                  t: switch (l) {
                    case "title":
                      u = i.getElementsByTagName("title")[0], (!u || u[Ce] || u[ae] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = i.createElement(l), i.head.insertBefore(
                        u,
                        i.querySelector("head > title")
                      )), Ut(u, l, a), u[ae] = e, Ve(u), l = u;
                      break e;
                    case "link":
                      var c = xm(
                        "link",
                        "href",
                        i
                      ).get(l + (a.href || ""));
                      if (c) {
                        for (var p = 0; p < c.length; p++)
                          if (u = c[p], u.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && u.getAttribute("rel") === (a.rel == null ? null : a.rel) && u.getAttribute("title") === (a.title == null ? null : a.title) && u.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            c.splice(p, 1);
                            break t;
                          }
                      }
                      u = i.createElement(l), Ut(u, l, a), i.head.appendChild(u);
                      break;
                    case "meta":
                      if (c = xm(
                        "meta",
                        "content",
                        i
                      ).get(l + (a.content || ""))) {
                        for (p = 0; p < c.length; p++)
                          if (u = c[p], u.getAttribute("content") === (a.content == null ? null : "" + a.content) && u.getAttribute("name") === (a.name == null ? null : a.name) && u.getAttribute("property") === (a.property == null ? null : a.property) && u.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && u.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            c.splice(p, 1);
                            break t;
                          }
                      }
                      u = i.createElement(l), Ut(u, l, a), i.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, l));
                  }
                  u[ae] = e, Ve(u), l = u;
                }
                e.stateNode = l;
              } else
                Rm(
                  i,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Em(
                i,
                l,
                e.memoizedProps
              );
          else
            u !== l ? (u === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : u.count--, l === null ? Rm(
              i,
              e.type,
              e.stateNode
            ) : Em(
              i,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && bo(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        $t(t, e), Ft(e), l & 512 && (Et || a === null || $a(a, a.return)), a !== null && l & 4 && bo(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if ($t(t, e), Ft(e), l & 512 && (Et || a === null || $a(a, a.return)), e.flags & 32) {
          i = e.stateNode;
          try {
            Cn(i, "");
          } catch (se) {
            We(e, e.return, se);
          }
        }
        l & 4 && e.stateNode != null && (i = e.memoizedProps, bo(
          e,
          i,
          a !== null ? a.memoizedProps : i
        )), l & 1024 && (xo = !0);
        break;
      case 6:
        if ($t(t, e), Ft(e), l & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          l = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = l;
          } catch (se) {
            We(e, e.return, se);
          }
        }
        break;
      case 3:
        if (xu = null, i = Ba, Ba = Su(t.containerInfo), $t(t, e), Ba = i, Ft(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            oi(t.containerInfo);
          } catch (se) {
            We(e, e.return, se);
          }
        xo && (xo = !1, Rh(e));
        break;
      case 4:
        l = Ba, Ba = Su(
          e.stateNode.containerInfo
        ), $t(t, e), Ft(e), Ba = l;
        break;
      case 12:
        $t(t, e), Ft(e);
        break;
      case 31:
        $t(t, e), Ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ru(e, l)));
        break;
      case 13:
        $t(t, e), Ft(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (su = Mt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ru(e, l)));
        break;
      case 22:
        i = e.memoizedState !== null;
        var R = a !== null && a.memoizedState !== null, U = yl, G = Et;
        if (yl = U || i, Et = G || R, $t(t, e), Et = G, yl = U, Ft(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (a === null || R || yl || Et || bn(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                R = a = t;
                try {
                  if (u = R.stateNode, i)
                    c = u.style, typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                  else {
                    p = R.stateNode;
                    var Q = R.memoizedProps.style, L = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    p.style.display = L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (se) {
                  We(R, R.return, se);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                R = t;
                try {
                  R.stateNode.nodeValue = i ? "" : R.memoizedProps;
                } catch (se) {
                  We(R, R.return, se);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                R = t;
                try {
                  var B = R.stateNode;
                  i ? dm(B, !0) : dm(R.stateNode, !1);
                } catch (se) {
                  We(R, R.return, se);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, ru(e, a))));
        break;
      case 19:
        $t(t, e), Ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ru(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        $t(t, e), Ft(e);
    }
  }
  function Ft(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (mh(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var i = a.stateNode, u = So(e);
            iu(e, u, i);
            break;
          case 5:
            var c = a.stateNode;
            a.flags & 32 && (Cn(c, ""), a.flags &= -33);
            var p = So(e);
            iu(e, p, c);
            break;
          case 3:
          case 4:
            var R = a.stateNode.containerInfo, U = So(e);
            Eo(
              e,
              U,
              R
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (G) {
        We(e, e.return, G);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Rh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Rh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function pl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        gh(e, t.alternate, t), t = t.sibling;
  }
  function bn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Hl(4, t, t.return), bn(t);
          break;
        case 1:
          $a(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && dh(
            t,
            t.return,
            a
          ), bn(t);
          break;
        case 27:
          er(t.stateNode);
        case 26:
        case 5:
          $a(t, t.return), bn(t);
          break;
        case 22:
          t.memoizedState === null && bn(t);
          break;
        case 30:
          bn(t);
          break;
        default:
          bn(t);
      }
      e = e.sibling;
    }
  }
  function bl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, i = e, u = t, c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          bl(
            i,
            u,
            a
          ), Qi(4, u);
          break;
        case 1:
          if (bl(
            i,
            u,
            a
          ), l = u, i = l.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (U) {
              We(l, l.return, U);
            }
          if (l = u, i = l.updateQueue, i !== null) {
            var p = l.stateNode;
            try {
              var R = i.shared.hiddenCallbacks;
              if (R !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < R.length; i++)
                  ed(R[i], p);
            } catch (U) {
              We(l, l.return, U);
            }
          }
          a && c & 64 && fh(u), Zi(u, u.return);
          break;
        case 27:
          vh(u);
        case 26:
        case 5:
          bl(
            i,
            u,
            a
          ), a && l === null && c & 4 && hh(u), Zi(u, u.return);
          break;
        case 12:
          bl(
            i,
            u,
            a
          );
          break;
        case 31:
          bl(
            i,
            u,
            a
          ), a && c & 4 && Sh(i, u);
          break;
        case 13:
          bl(
            i,
            u,
            a
          ), a && c & 4 && Eh(i, u);
          break;
        case 22:
          u.memoizedState === null && bl(
            i,
            u,
            a
          ), Zi(u, u.return);
          break;
        case 30:
          break;
        default:
          bl(
            i,
            u,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Ro(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Di(a));
  }
  function To(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Di(e));
  }
  function Ha(e, t, a, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Th(
          e,
          t,
          a,
          l
        ), t = t.sibling;
  }
  function Th(e, t, a, l) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ha(
          e,
          t,
          a,
          l
        ), i & 2048 && Qi(9, t);
        break;
      case 1:
        Ha(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Ha(
          e,
          t,
          a,
          l
        ), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Di(e)));
        break;
      case 12:
        if (i & 2048) {
          Ha(
            e,
            t,
            a,
            l
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, c = u.id, p = u.onPostCommit;
            typeof p == "function" && p(
              c,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (R) {
            We(t, t.return, R);
          }
        } else
          Ha(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Ha(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Ha(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, c = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Ha(
          e,
          t,
          a,
          l
        ) : ki(e, t) : u._visibility & 2 ? Ha(
          e,
          t,
          a,
          l
        ) : (u._visibility |= 2, In(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), i & 2048 && Ro(c, t);
        break;
      case 24:
        Ha(
          e,
          t,
          a,
          l
        ), i & 2048 && To(t.alternate, t);
        break;
      default:
        Ha(
          e,
          t,
          a,
          l
        );
    }
  }
  function In(e, t, a, l, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, p = a, R = l, U = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          In(
            u,
            c,
            p,
            R,
            i
          ), Qi(8, c);
          break;
        case 23:
          break;
        case 22:
          var G = c.stateNode;
          c.memoizedState !== null ? G._visibility & 2 ? In(
            u,
            c,
            p,
            R,
            i
          ) : ki(
            u,
            c
          ) : (G._visibility |= 2, In(
            u,
            c,
            p,
            R,
            i
          )), i && U & 2048 && Ro(
            c.alternate,
            c
          );
          break;
        case 24:
          In(
            u,
            c,
            p,
            R,
            i
          ), i && U & 2048 && To(c.alternate, c);
          break;
        default:
          In(
            u,
            c,
            p,
            R,
            i
          );
      }
      t = t.sibling;
    }
  }
  function ki(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, i = l.flags;
        switch (l.tag) {
          case 22:
            ki(a, l), i & 2048 && Ro(
              l.alternate,
              l
            );
            break;
          case 24:
            ki(a, l), i & 2048 && To(l.alternate, l);
            break;
          default:
            ki(a, l);
        }
        t = t.sibling;
      }
  }
  var Ki = 8192;
  function Pn(e, t, a) {
    if (e.subtreeFlags & Ki)
      for (e = e.child; e !== null; )
        _h(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function _h(e, t, a) {
    switch (e.tag) {
      case 26:
        Pn(
          e,
          t,
          a
        ), e.flags & Ki && e.memoizedState !== null && Vp(
          a,
          Ba,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Pn(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var l = Ba;
        Ba = Su(e.stateNode.containerInfo), Pn(
          e,
          t,
          a
        ), Ba = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ki, Ki = 16777216, Pn(
          e,
          t,
          a
        ), Ki = l) : Pn(
          e,
          t,
          a
        ));
        break;
      default:
        Pn(
          e,
          t,
          a
        );
    }
  }
  function wh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ji(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Nt = l, Ah(
            l,
            e
          );
        }
      wh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Nh(e), e = e.sibling;
  }
  function Nh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ji(e), e.flags & 2048 && Hl(9, e, e.return);
        break;
      case 3:
        Ji(e);
        break;
      case 12:
        Ji(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, uu(e)) : Ji(e);
        break;
      default:
        Ji(e);
    }
  }
  function uu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Nt = l, Ah(
            l,
            e
          );
        }
      wh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Hl(8, t, t.return), uu(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, uu(t));
          break;
        default:
          uu(t);
      }
      e = e.sibling;
    }
  }
  function Ah(e, t) {
    for (; Nt !== null; ) {
      var a = Nt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Hl(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Di(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, Nt = l;
      else
        e: for (a = e; Nt !== null; ) {
          l = Nt;
          var i = l.sibling, u = l.return;
          if (ph(l), l === a) {
            Nt = null;
            break e;
          }
          if (i !== null) {
            i.return = u, Nt = i;
            break e;
          }
          Nt = u;
        }
    }
  }
  var np = {
    getCacheForType: function(e) {
      var t = jt(pt), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return jt(pt).controller.signal;
    }
  }, ip = typeof WeakMap == "function" ? WeakMap : Map, Ke = 0, nt = null, je = null, Be = 0, Fe = 0, ua = null, Gl = !1, ei = !1, _o = !1, Sl = 0, ct = 0, ql = 0, Sn = 0, wo = 0, sa = 0, ti = 0, $i = null, Wt = null, No = !1, su = 0, Mh = 0, ou = 1 / 0, cu = null, Yl = null, _t = 0, Xl = null, ai = null, El = 0, Ao = 0, Mo = null, zh = null, Fi = 0, zo = null;
  function oa() {
    return (Ke & 2) !== 0 && Be !== 0 ? Be & -Be : M.T !== null ? Lo() : Z();
  }
  function Dh() {
    if (sa === 0)
      if ((Be & 536870912) === 0 || Ge) {
        var e = Ca;
        Ca <<= 1, (Ca & 3932160) === 0 && (Ca = 262144), sa = e;
      } else sa = 536870912;
    return e = ia.current, e !== null && (e.flags |= 32), sa;
  }
  function It(e, t, a) {
    (e === nt && (Fe === 2 || Fe === 9) || e.cancelPendingCommit !== null) && (li(e, 0), Vl(
      e,
      Be,
      sa,
      !1
    )), Ie(e, a), ((Ke & 2) === 0 || e !== nt) && (e === nt && ((Ke & 2) === 0 && (Sn |= a), ct === 4 && Vl(
      e,
      Be,
      sa,
      !1
    )), Fa(e));
  }
  function Ch(e, t, a) {
    if ((Ke & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || at(e, t), i = l ? sp(e, t) : Co(e, t, !0), u = l;
    do {
      if (i === 0) {
        ei && !l && Vl(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !rp(a)) {
          i = Co(e, t, !1), u = !1;
          continue;
        }
        if (i === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = e.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            e: {
              var p = e;
              i = $i;
              var R = p.current.memoizedState.isDehydrated;
              if (R && (li(p, c).flags |= 256), c = Co(
                p,
                c,
                !1
              ), c !== 2) {
                if (_o && !R) {
                  p.errorRecoveryDisabledLanes |= u, Sn |= u, i = 4;
                  break e;
                }
                u = Wt, Wt = i, u !== null && (Wt === null ? Wt = u : Wt.push.apply(
                  Wt,
                  u
                ));
              }
              i = c;
            }
            if (u = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          li(e, 0), Vl(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, u = i, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Vl(
                l,
                t,
                sa,
                !Gl
              );
              break e;
            case 2:
              Wt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (i = su + 300 - Mt(), 10 < i)) {
            if (Vl(
              l,
              t,
              sa,
              !Gl
            ), xe(l, 0, !0) !== 0) break e;
            El = t, l.timeoutHandle = om(
              jh.bind(
                null,
                l,
                a,
                Wt,
                cu,
                No,
                t,
                sa,
                Sn,
                ti,
                Gl,
                u,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break e;
          }
          jh(
            l,
            a,
            Wt,
            cu,
            No,
            t,
            sa,
            Sn,
            ti,
            Gl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Fa(e);
  }
  function jh(e, t, a, l, i, u, c, p, R, U, G, Q, L, B) {
    if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
      Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: rl
      }, _h(
        t,
        u,
        Q
      );
      var se = (u & 62914560) === u ? su - Mt() : (u & 4194048) === u ? Mh - Mt() : 0;
      if (se = Qp(
        Q,
        se
      ), se !== null) {
        El = u, e.cancelPendingCommit = se(
          Yh.bind(
            null,
            e,
            t,
            u,
            a,
            l,
            i,
            c,
            p,
            R,
            G,
            Q,
            null,
            L,
            B
          )
        ), Vl(e, u, c, !U);
        return;
      }
    }
    Yh(
      e,
      t,
      u,
      a,
      l,
      i,
      c,
      p,
      R
    );
  }
  function rp(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var i = a[l], u = i.getSnapshot;
          i = i.value;
          try {
            if (!la(u(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
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
  function Vl(e, t, a, l) {
    t &= ~wo, t &= ~Sn, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var u = 31 - Rt(i), c = 1 << u;
      l[u] = -1, i &= ~c;
    }
    a !== 0 && al(e, a, t);
  }
  function fu() {
    return (Ke & 6) === 0 ? (Wi(0), !1) : !0;
  }
  function Do() {
    if (je !== null) {
      if (Fe === 0)
        var e = je.return;
      else
        e = je, cl = fn = null, ks(e), Kn = null, ji = 0, e = je;
      for (; e !== null; )
        ch(e.alternate, e), e = e.return;
      je = null;
    }
  }
  function li(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, wp(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), El = 0, Do(), nt = e, je = a = sl(e.current, null), Be = t, Fe = 0, ua = null, Gl = !1, ei = at(e, t), _o = !1, ti = sa = wo = Sn = ql = ct = 0, Wt = $i = null, No = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var i = 31 - Rt(l), u = 1 << i;
        t |= e[i], l &= ~u;
      }
    return Sl = t, Cr(), a;
  }
  function Oh(e, t) {
    Ae = null, M.H = Yi, t === kn || t === qr ? (t = Ff(), Fe = 3) : t === Os ? (t = Ff(), Fe = 4) : Fe = t === so ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ua = t, je === null && (ct = 1, eu(
      e,
      ya(t, e.current)
    ));
  }
  function Uh() {
    var e = ia.current;
    return e === null ? !0 : (Be & 4194048) === Be ? Sa === null : (Be & 62914560) === Be || (Be & 536870912) !== 0 ? e === Sa : !1;
  }
  function Lh() {
    var e = M.H;
    return M.H = Yi, e === null ? Yi : e;
  }
  function Bh() {
    var e = M.A;
    return M.A = np, e;
  }
  function du() {
    ct = 4, Gl || (Be & 4194048) !== Be && ia.current !== null || (ei = !0), (ql & 134217727) === 0 && (Sn & 134217727) === 0 || nt === null || Vl(
      nt,
      Be,
      sa,
      !1
    );
  }
  function Co(e, t, a) {
    var l = Ke;
    Ke |= 2;
    var i = Lh(), u = Bh();
    (nt !== e || Be !== t) && (cu = null, li(e, t)), t = !1;
    var c = ct;
    e: do
      try {
        if (Fe !== 0 && je !== null) {
          var p = je, R = ua;
          switch (Fe) {
            case 8:
              Do(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ia.current === null && (t = !0);
              var U = Fe;
              if (Fe = 0, ua = null, ni(e, p, R, U), a && ei) {
                c = 0;
                break e;
              }
              break;
            default:
              U = Fe, Fe = 0, ua = null, ni(e, p, R, U);
          }
        }
        up(), c = ct;
        break;
      } catch (G) {
        Oh(e, G);
      }
    while (!0);
    return t && e.shellSuspendCounter++, cl = fn = null, Ke = l, M.H = i, M.A = u, je === null && (nt = null, Be = 0, Cr()), c;
  }
  function up() {
    for (; je !== null; ) Hh(je);
  }
  function sp(e, t) {
    var a = Ke;
    Ke |= 2;
    var l = Lh(), i = Bh();
    nt !== e || Be !== t ? (cu = null, ou = Mt() + 500, li(e, t)) : ei = at(
      e,
      t
    );
    e: do
      try {
        if (Fe !== 0 && je !== null) {
          t = je;
          var u = ua;
          t: switch (Fe) {
            case 1:
              Fe = 0, ua = null, ni(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Jf(u)) {
                Fe = 0, ua = null, Gh(t);
                break;
              }
              t = function() {
                Fe !== 2 && Fe !== 9 || nt !== e || (Fe = 7), Fa(e);
              }, u.then(t, t);
              break e;
            case 3:
              Fe = 7;
              break e;
            case 4:
              Fe = 5;
              break e;
            case 7:
              Jf(u) ? (Fe = 0, ua = null, Gh(t)) : (Fe = 0, ua = null, ni(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (je.tag) {
                case 26:
                  c = je.memoizedState;
                case 5:
                case 27:
                  var p = je;
                  if (c ? Tm(c) : p.stateNode.complete) {
                    Fe = 0, ua = null;
                    var R = p.sibling;
                    if (R !== null) je = R;
                    else {
                      var U = p.return;
                      U !== null ? (je = U, hu(U)) : je = null;
                    }
                    break t;
                  }
              }
              Fe = 0, ua = null, ni(e, t, u, 5);
              break;
            case 6:
              Fe = 0, ua = null, ni(e, t, u, 6);
              break;
            case 8:
              Do(), ct = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        op();
        break;
      } catch (G) {
        Oh(e, G);
      }
    while (!0);
    return cl = fn = null, M.H = l, M.A = i, Ke = a, je !== null ? 0 : (nt = null, Be = 0, Cr(), ct);
  }
  function op() {
    for (; je !== null && !At(); )
      Hh(je);
  }
  function Hh(e) {
    var t = sh(e.alternate, e, Sl);
    e.memoizedProps = e.pendingProps, t === null ? hu(e) : je = t;
  }
  function Gh(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = ah(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Be
        );
        break;
      case 11:
        t = ah(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Be
        );
        break;
      case 5:
        ks(t);
      default:
        ch(a, t), t = je = Bf(t, Sl), t = sh(a, t, Sl);
    }
    e.memoizedProps = e.pendingProps, t === null ? hu(e) : je = t;
  }
  function ni(e, t, a, l) {
    cl = fn = null, ks(t), Kn = null, ji = 0;
    var i = t.return;
    try {
      if (Wg(
        e,
        i,
        t,
        a,
        Be
      )) {
        ct = 1, eu(
          e,
          ya(a, e.current)
        ), je = null;
        return;
      }
    } catch (u) {
      if (i !== null) throw je = i, u;
      ct = 1, eu(
        e,
        ya(a, e.current)
      ), je = null;
      return;
    }
    t.flags & 32768 ? (Ge || l === 1 ? e = !0 : ei || (Be & 536870912) !== 0 ? e = !1 : (Gl = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = ia.current, l !== null && l.tag === 13 && (l.flags |= 16384))), qh(t, e)) : hu(t);
  }
  function hu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        qh(
          t,
          Gl
        );
        return;
      }
      e = t.return;
      var a = ep(
        t.alternate,
        t,
        Sl
      );
      if (a !== null) {
        je = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        je = t;
        return;
      }
      je = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function qh(e, t) {
    do {
      var a = tp(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, je = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        je = e;
        return;
      }
      je = e = a;
    } while (e !== null);
    ct = 6, je = null;
  }
  function Yh(e, t, a, l, i, u, c, p, R) {
    e.cancelPendingCommit = null;
    do
      mu();
    while (_t !== 0);
    if ((Ke & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (u = t.lanes | t.childLanes, u |= bs, Dt(
        e,
        a,
        u,
        c,
        p,
        R
      ), e === nt && (je = nt = null, Be = 0), ai = t, Xl = e, El = a, Ao = u, Mo = i, zh = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, hp(za, function() {
        return kh(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = M.T, M.T = null, i = V.p, V.p = 2, c = Ke, Ke |= 4;
        try {
          ap(e, t, a);
        } finally {
          Ke = c, V.p = i, M.T = l;
        }
      }
      _t = 1, Xh(), Vh(), Qh();
    }
  }
  function Xh() {
    if (_t === 1) {
      _t = 0;
      var e = Xl, t = ai, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = M.T, M.T = null;
        var l = V.p;
        V.p = 2;
        var i = Ke;
        Ke |= 4;
        try {
          xh(t, e);
          var u = Qo, c = Af(e.containerInfo), p = u.focusedElem, R = u.selectionRange;
          if (c !== p && p && p.ownerDocument && Nf(
            p.ownerDocument.documentElement,
            p
          )) {
            if (R !== null && ms(p)) {
              var U = R.start, G = R.end;
              if (G === void 0 && (G = U), "selectionStart" in p)
                p.selectionStart = U, p.selectionEnd = Math.min(
                  G,
                  p.value.length
                );
              else {
                var Q = p.ownerDocument || document, L = Q && Q.defaultView || window;
                if (L.getSelection) {
                  var B = L.getSelection(), se = p.textContent.length, be = Math.min(R.start, se), tt = R.end === void 0 ? be : Math.min(R.end, se);
                  !B.extend && be > tt && (c = tt, tt = be, be = c);
                  var z = wf(
                    p,
                    be
                  ), w = wf(
                    p,
                    tt
                  );
                  if (z && w && (B.rangeCount !== 1 || B.anchorNode !== z.node || B.anchorOffset !== z.offset || B.focusNode !== w.node || B.focusOffset !== w.offset)) {
                    var O = Q.createRange();
                    O.setStart(z.node, z.offset), B.removeAllRanges(), be > tt ? (B.addRange(O), B.extend(w.node, w.offset)) : (O.setEnd(w.node, w.offset), B.addRange(O));
                  }
                }
              }
            }
            for (Q = [], B = p; B = B.parentNode; )
              B.nodeType === 1 && Q.push({
                element: B,
                left: B.scrollLeft,
                top: B.scrollTop
              });
            for (typeof p.focus == "function" && p.focus(), p = 0; p < Q.length; p++) {
              var Y = Q[p];
              Y.element.scrollLeft = Y.left, Y.element.scrollTop = Y.top;
            }
          }
          wu = !!Vo, Qo = Vo = null;
        } finally {
          Ke = i, V.p = l, M.T = a;
        }
      }
      e.current = t, _t = 2;
    }
  }
  function Vh() {
    if (_t === 2) {
      _t = 0;
      var e = Xl, t = ai, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = M.T, M.T = null;
        var l = V.p;
        V.p = 2;
        var i = Ke;
        Ke |= 4;
        try {
          gh(e, t.alternate, t);
        } finally {
          Ke = i, V.p = l, M.T = a;
        }
      }
      _t = 3;
    }
  }
  function Qh() {
    if (_t === 4 || _t === 3) {
      _t = 0, Qa();
      var e = Xl, t = ai, a = El, l = zh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? _t = 5 : (_t = 0, ai = Xl = null, Zh(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (i === 0 && (Yl = null), j(a), t = t.stateNode, zt && typeof zt.onCommitFiberRoot == "function")
        try {
          zt.onCommitFiberRoot(
            Da,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = M.T, i = V.p, V.p = 2, M.T = null;
        try {
          for (var u = e.onRecoverableError, c = 0; c < l.length; c++) {
            var p = l[c];
            u(p.value, {
              componentStack: p.stack
            });
          }
        } finally {
          M.T = t, V.p = i;
        }
      }
      (El & 3) !== 0 && mu(), Fa(e), i = e.pendingLanes, (a & 261930) !== 0 && (i & 42) !== 0 ? e === zo ? Fi++ : (Fi = 0, zo = e) : Fi = 0, Wi(0);
    }
  }
  function Zh(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Di(t)));
  }
  function mu() {
    return Xh(), Vh(), Qh(), kh();
  }
  function kh() {
    if (_t !== 5) return !1;
    var e = Xl, t = Ao;
    Ao = 0;
    var a = j(El), l = M.T, i = V.p;
    try {
      V.p = 32 > a ? 32 : a, M.T = null, a = Mo, Mo = null;
      var u = Xl, c = El;
      if (_t = 0, ai = Xl = null, El = 0, (Ke & 6) !== 0) throw Error(o(331));
      var p = Ke;
      if (Ke |= 4, Nh(u.current), Th(
        u,
        u.current,
        c,
        a
      ), Ke = p, Wi(0, !1), zt && typeof zt.onPostCommitFiberRoot == "function")
        try {
          zt.onPostCommitFiberRoot(Da, u);
        } catch {
        }
      return !0;
    } finally {
      V.p = i, M.T = l, Zh(e, t);
    }
  }
  function Kh(e, t, a) {
    t = ya(a, t), t = uo(e.stateNode, t, 2), e = Ul(e, t, 2), e !== null && (Ie(e, 2), Fa(e));
  }
  function We(e, t, a) {
    if (e.tag === 3)
      Kh(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Kh(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Yl === null || !Yl.has(l))) {
            e = ya(a, e), a = Jd(2), l = Ul(t, a, 2), l !== null && ($d(
              a,
              l,
              t,
              e
            ), Ie(l, 2), Fa(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function jo(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new ip();
      var i = /* @__PURE__ */ new Set();
      l.set(t, i);
    } else
      i = l.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), l.set(t, i));
    i.has(a) || (_o = !0, i.add(a), e = cp.bind(null, e, t, a), t.then(e, e));
  }
  function cp(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, nt === e && (Be & a) === a && (ct === 4 || ct === 3 && (Be & 62914560) === Be && 300 > Mt() - su ? (Ke & 2) === 0 && li(e, 0) : wo |= a, ti === Be && (ti = 0)), Fa(e);
  }
  function Jh(e, t) {
    t === 0 && (t = Tt()), e = sn(e, t), e !== null && (Ie(e, t), Fa(e));
  }
  function fp(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Jh(e, a);
  }
  function dp(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, i = e.memoizedState;
        i !== null && (a = i.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(t), Jh(e, a);
  }
  function hp(e, t) {
    return _l(e, t);
  }
  var vu = null, ii = null, Oo = !1, yu = !1, Uo = !1, Ql = 0;
  function Fa(e) {
    e !== ii && e.next === null && (ii === null ? vu = ii = e : ii = ii.next = e), yu = !0, Oo || (Oo = !0, vp());
  }
  function Wi(e, t) {
    if (!Uo && yu) {
      Uo = !0;
      do
        for (var a = !1, l = vu; l !== null; ) {
          if (e !== 0) {
            var i = l.pendingLanes;
            if (i === 0) var u = 0;
            else {
              var c = l.suspendedLanes, p = l.pingedLanes;
              u = (1 << 31 - Rt(42 | e) + 1) - 1, u &= i & ~(c & ~p), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, Ih(l, u));
          } else
            u = Be, u = xe(
              l,
              l === nt ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || at(l, u) || (a = !0, Ih(l, u));
          l = l.next;
        }
      while (a);
      Uo = !1;
    }
  }
  function mp() {
    $h();
  }
  function $h() {
    yu = Oo = !1;
    var e = 0;
    Ql !== 0 && _p() && (e = Ql);
    for (var t = Mt(), a = null, l = vu; l !== null; ) {
      var i = l.next, u = Fh(l, t);
      u === 0 ? (l.next = null, a === null ? vu = i : a.next = i, i === null && (ii = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (yu = !0)), l = i;
    }
    _t !== 0 && _t !== 5 || Wi(e), Ql !== 0 && (Ql = 0);
  }
  function Fh(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - Rt(u), p = 1 << c, R = i[c];
      R === -1 ? ((p & a) === 0 || (p & l) !== 0) && (i[c] = gt(p, t)) : R <= t && (e.expiredLanes |= p), u &= ~p;
    }
    if (t = nt, a = Be, a = xe(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (Fe === 2 || Fe === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && an(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || at(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && an(l), j(a)) {
        case 2:
        case 8:
          a = ln;
          break;
        case 32:
          a = za;
          break;
        case 268435456:
          a = xt;
          break;
        default:
          a = za;
      }
      return l = Wh.bind(null, e), a = _l(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && an(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Wh(e, t) {
    if (_t !== 0 && _t !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (mu() && e.callbackNode !== a)
      return null;
    var l = Be;
    return l = xe(
      e,
      e === nt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Ch(e, l, t), Fh(e, Mt()), e.callbackNode != null && e.callbackNode === a ? Wh.bind(null, e) : null);
  }
  function Ih(e, t) {
    if (mu()) return null;
    Ch(e, t, !0);
  }
  function vp() {
    Np(function() {
      (Ke & 6) !== 0 ? _l(
        ea,
        mp
      ) : $h();
    });
  }
  function Lo() {
    if (Ql === 0) {
      var e = Qn;
      e === 0 && (e = tl, tl <<= 1, (tl & 261888) === 0 && (tl = 256)), Ql = e;
    }
    return Ql;
  }
  function Ph(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Tr("" + e);
  }
  function em(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function yp(e, t, a, l, i) {
    if (t === "submit" && a && a.stateNode === i) {
      var u = Ph(
        (i[ie] || null).action
      ), c = l.submitter;
      c && (t = (t = c[ie] || null) ? Ph(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var p = new Ar(
        "action",
        "action",
        null,
        l,
        i
      );
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ql !== 0) {
                  var R = c ? em(i, c) : new FormData(i);
                  to(
                    a,
                    {
                      pending: !0,
                      data: R,
                      method: i.method,
                      action: u
                    },
                    null,
                    R
                  );
                }
              } else
                typeof u == "function" && (p.preventDefault(), R = c ? em(i, c) : new FormData(i), to(
                  a,
                  {
                    pending: !0,
                    data: R,
                    method: i.method,
                    action: u
                  },
                  u,
                  R
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var Bo = 0; Bo < ps.length; Bo++) {
    var Ho = ps[Bo], gp = Ho.toLowerCase(), pp = Ho[0].toUpperCase() + Ho.slice(1);
    La(
      gp,
      "on" + pp
    );
  }
  La(Df, "onAnimationEnd"), La(Cf, "onAnimationIteration"), La(jf, "onAnimationStart"), La("dblclick", "onDoubleClick"), La("focusin", "onFocus"), La("focusout", "onBlur"), La(Og, "onTransitionRun"), La(Ug, "onTransitionStart"), La(Lg, "onTransitionCancel"), La(Of, "onTransitionEnd"), Xt("onMouseEnter", ["mouseout", "mouseover"]), Xt("onMouseLeave", ["mouseout", "mouseover"]), Xt("onPointerEnter", ["pointerout", "pointerover"]), Xt("onPointerLeave", ["pointerout", "pointerover"]), kt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), kt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), kt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), kt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), kt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), kt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ii = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), bp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ii)
  );
  function tm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], i = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = l.length - 1; 0 <= c; c--) {
            var p = l[c], R = p.instance, U = p.currentTarget;
            if (p = p.listener, R !== u && i.isPropagationStopped())
              break e;
            u = p, i.currentTarget = U;
            try {
              u(i);
            } catch (G) {
              Dr(G);
            }
            i.currentTarget = null, u = R;
          }
        else
          for (c = 0; c < l.length; c++) {
            if (p = l[c], R = p.instance, U = p.currentTarget, p = p.listener, R !== u && i.isPropagationStopped())
              break e;
            u = p, i.currentTarget = U;
            try {
              u(i);
            } catch (G) {
              Dr(G);
            }
            i.currentTarget = null, u = R;
          }
      }
    }
  }
  function Oe(e, t) {
    var a = t[ye];
    a === void 0 && (a = t[ye] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (am(t, e, 2, !1), a.add(l));
  }
  function Go(e, t, a) {
    var l = 0;
    t && (l |= 4), am(
      a,
      e,
      l,
      t
    );
  }
  var gu = "_reactListening" + Math.random().toString(36).slice(2);
  function qo(e) {
    if (!e[gu]) {
      e[gu] = !0, Nl.forEach(function(a) {
        a !== "selectionchange" && (bp.has(a) || Go(a, !1, e), Go(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gu] || (t[gu] = !0, Go("selectionchange", !1, t));
    }
  }
  function am(e, t, a, l) {
    switch (Dm(t)) {
      case 2:
        var i = Kp;
        break;
      case 8:
        i = Jp;
        break;
      default:
        i = tc;
    }
    a = i.bind(
      null,
      t,
      a,
      e
    ), i = void 0, !is || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), l ? i !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, a, !0) : i !== void 0 ? e.addEventListener(t, a, {
      passive: i
    }) : e.addEventListener(t, a, !1);
  }
  function Yo(e, t, a, l, i) {
    var u = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var c = l.tag;
        if (c === 3 || c === 4) {
          var p = l.stateNode.containerInfo;
          if (p === i) break;
          if (c === 4)
            for (c = l.return; c !== null; ) {
              var R = c.tag;
              if ((R === 3 || R === 4) && c.stateNode.containerInfo === i)
                return;
              c = c.return;
            }
          for (; p !== null; ) {
            if (c = it(p), c === null) return;
            if (R = c.tag, R === 5 || R === 6 || R === 26 || R === 27) {
              l = u = c;
              continue e;
            }
            p = p.parentNode;
          }
        }
        l = l.return;
      }
    uf(function() {
      var U = u, G = ls(a), Q = [];
      e: {
        var L = Uf.get(e);
        if (L !== void 0) {
          var B = Ar, se = e;
          switch (e) {
            case "keypress":
              if (wr(a) === 0) break e;
            case "keydown":
            case "keyup":
              B = dg;
              break;
            case "focusin":
              se = "focus", B = os;
              break;
            case "focusout":
              se = "blur", B = os;
              break;
            case "beforeblur":
            case "afterblur":
              B = os;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = cf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = eg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = vg;
              break;
            case Df:
            case Cf:
            case jf:
              B = lg;
              break;
            case Of:
              B = gg;
              break;
            case "scroll":
            case "scrollend":
              B = Iy;
              break;
            case "wheel":
              B = bg;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = ig;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = df;
              break;
            case "toggle":
            case "beforetoggle":
              B = Eg;
          }
          var be = (t & 4) !== 0, tt = !be && (e === "scroll" || e === "scrollend"), z = be ? L !== null ? L + "Capture" : null : L;
          be = [];
          for (var w = U, O; w !== null; ) {
            var Y = w;
            if (O = Y.stateNode, Y = Y.tag, Y !== 5 && Y !== 26 && Y !== 27 || O === null || z === null || (Y = Si(w, z), Y != null && be.push(
              Pi(w, Y, O)
            )), tt) break;
            w = w.return;
          }
          0 < be.length && (L = new B(
            L,
            se,
            null,
            a,
            G
          ), Q.push({ event: L, listeners: be }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (L = e === "mouseover" || e === "pointerover", B = e === "mouseout" || e === "pointerout", L && a !== as && (se = a.relatedTarget || a.fromElement) && (it(se) || se[le]))
            break e;
          if ((B || L) && (L = G.window === G ? G : (L = G.ownerDocument) ? L.defaultView || L.parentWindow : window, B ? (se = a.relatedTarget || a.toElement, B = U, se = se ? it(se) : null, se !== null && (tt = d(se), be = se.tag, se !== tt || be !== 5 && be !== 27 && be !== 6) && (se = null)) : (B = null, se = U), B !== se)) {
            if (be = cf, Y = "onMouseLeave", z = "onMouseEnter", w = "mouse", (e === "pointerout" || e === "pointerover") && (be = df, Y = "onPointerLeave", z = "onPointerEnter", w = "pointer"), tt = B == null ? L : Xe(B), O = se == null ? L : Xe(se), L = new be(
              Y,
              w + "leave",
              B,
              a,
              G
            ), L.target = tt, L.relatedTarget = O, Y = null, it(G) === U && (be = new be(
              z,
              w + "enter",
              se,
              a,
              G
            ), be.target = O, be.relatedTarget = tt, Y = be), tt = Y, B && se)
              t: {
                for (be = Sp, z = B, w = se, O = 0, Y = z; Y; Y = be(Y))
                  O++;
                Y = 0;
                for (var he = w; he; he = be(he))
                  Y++;
                for (; 0 < O - Y; )
                  z = be(z), O--;
                for (; 0 < Y - O; )
                  w = be(w), Y--;
                for (; O--; ) {
                  if (z === w || w !== null && z === w.alternate) {
                    be = z;
                    break t;
                  }
                  z = be(z), w = be(w);
                }
                be = null;
              }
            else be = null;
            B !== null && lm(
              Q,
              L,
              B,
              be,
              !1
            ), se !== null && tt !== null && lm(
              Q,
              tt,
              se,
              be,
              !0
            );
          }
        }
        e: {
          if (L = U ? Xe(U) : window, B = L.nodeName && L.nodeName.toLowerCase(), B === "select" || B === "input" && L.type === "file")
            var Ze = Sf;
          else if (pf(L))
            if (Ef)
              Ze = Dg;
            else {
              Ze = Mg;
              var fe = Ag;
            }
          else
            B = L.nodeName, !B || B.toLowerCase() !== "input" || L.type !== "checkbox" && L.type !== "radio" ? U && ts(U.elementType) && (Ze = Sf) : Ze = zg;
          if (Ze && (Ze = Ze(e, U))) {
            bf(
              Q,
              Ze,
              a,
              G
            );
            break e;
          }
          fe && fe(e, L, U), e === "focusout" && U && L.type === "number" && U.memoizedProps.value != null && es(L, "number", L.value);
        }
        switch (fe = U ? Xe(U) : window, e) {
          case "focusin":
            (pf(fe) || fe.contentEditable === "true") && (Ln = fe, vs = U, Ai = null);
            break;
          case "focusout":
            Ai = vs = Ln = null;
            break;
          case "mousedown":
            ys = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ys = !1, Mf(Q, a, G);
            break;
          case "selectionchange":
            if (jg) break;
          case "keydown":
          case "keyup":
            Mf(Q, a, G);
        }
        var Me;
        if (fs)
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
          Un ? yf(e, a) && (He = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (He = "onCompositionStart");
        He && (hf && a.locale !== "ko" && (Un || He !== "onCompositionStart" ? He === "onCompositionEnd" && Un && (Me = sf()) : (Al = G, rs = "value" in Al ? Al.value : Al.textContent, Un = !0)), fe = pu(U, He), 0 < fe.length && (He = new ff(
          He,
          e,
          null,
          a,
          G
        ), Q.push({ event: He, listeners: fe }), Me ? He.data = Me : (Me = gf(a), Me !== null && (He.data = Me)))), (Me = Rg ? Tg(e, a) : _g(e, a)) && (He = pu(U, "onBeforeInput"), 0 < He.length && (fe = new ff(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          G
        ), Q.push({
          event: fe,
          listeners: He
        }), fe.data = Me)), yp(
          Q,
          e,
          U,
          a,
          G
        );
      }
      tm(Q, t);
    });
  }
  function Pi(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function pu(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var i = e, u = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || u === null || (i = Si(e, a), i != null && l.unshift(
        Pi(e, i, u)
      ), i = Si(e, t), i != null && l.push(
        Pi(e, i, u)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Sp(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function lm(e, t, a, l, i) {
    for (var u = t._reactName, c = []; a !== null && a !== l; ) {
      var p = a, R = p.alternate, U = p.stateNode;
      if (p = p.tag, R !== null && R === l) break;
      p !== 5 && p !== 26 && p !== 27 || U === null || (R = U, i ? (U = Si(a, u), U != null && c.unshift(
        Pi(a, U, R)
      )) : i || (U = Si(a, u), U != null && c.push(
        Pi(a, U, R)
      ))), a = a.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var Ep = /\r\n?/g, xp = /\u0000|\uFFFD/g;
  function nm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ep, `
`).replace(xp, "");
  }
  function im(e, t) {
    return t = nm(t), nm(e) === t;
  }
  function et(e, t, a, l, i, u) {
    switch (a) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || Cn(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && Cn(e, "" + l);
        break;
      case "className":
        nl(e, "class", l);
        break;
      case "tabIndex":
        nl(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        nl(e, a, l);
        break;
      case "style":
        nf(e, l, u);
        break;
      case "data":
        if (t !== "object") {
          nl(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = Tr("" + l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (a === "formAction" ? (t !== "input" && et(e, t, "name", i.name, i, null), et(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), et(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), et(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (et(e, t, "encType", i.encType, i, null), et(e, t, "method", i.method, i, null), et(e, t, "target", i.target, i, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = Tr("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = rl);
        break;
      case "onScroll":
        l != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (i.children != null) throw Error(o(60));
            e.innerHTML = a;
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
        a = Tr("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        Oe("beforetoggle", e), Oe("toggle", e), ll(e, "popover", l);
        break;
      case "xlinkActuate":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        _e(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        _e(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        _e(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        _e(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ll(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Fy.get(a) || a, ll(e, a, l));
    }
  }
  function Xo(e, t, a, l, i, u) {
    switch (a) {
      case "style":
        nf(e, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (i.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Cn(e, l) : (typeof l == "number" || typeof l == "bigint") && Cn(e, "" + l);
        break;
      case "onScroll":
        l != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Oe("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = rl);
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
        if (!ja.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (i = a.endsWith("Capture"), t = a.slice(2, i ? a.length - 7 : void 0), u = e[ie] || null, u = u != null ? u[a] : null, typeof u == "function" && e.removeEventListener(t, u, i), typeof l == "function")) {
              typeof u != "function" && u !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, l, i);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ll(e, a, l);
          }
    }
  }
  function Ut(e, t, a) {
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
        Oe("error", e), Oe("load", e);
        var l = !1, i = !1, u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var c = a[u];
            if (c != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  et(e, t, u, c, a, null);
              }
          }
        i && et(e, t, "srcSet", a.srcSet, a, null), l && et(e, t, "src", a.src, a, null);
        return;
      case "input":
        Oe("invalid", e);
        var p = u = c = i = null, R = null, U = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var G = a[l];
            if (G != null)
              switch (l) {
                case "name":
                  i = G;
                  break;
                case "type":
                  c = G;
                  break;
                case "checked":
                  R = G;
                  break;
                case "defaultChecked":
                  U = G;
                  break;
                case "value":
                  u = G;
                  break;
                case "defaultValue":
                  p = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(o(137, t));
                  break;
                default:
                  et(e, t, l, G, a, null);
              }
          }
        ef(
          e,
          u,
          p,
          R,
          U,
          c,
          i,
          !1
        );
        return;
      case "select":
        Oe("invalid", e), l = c = u = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (p = a[i], p != null))
            switch (i) {
              case "value":
                u = p;
                break;
              case "defaultValue":
                c = p;
                break;
              case "multiple":
                l = p;
              default:
                et(e, t, i, p, a, null);
            }
        t = u, a = c, e.multiple = !!l, t != null ? Dn(e, !!l, t, !1) : a != null && Dn(e, !!l, a, !0);
        return;
      case "textarea":
        Oe("invalid", e), u = i = l = null;
        for (c in a)
          if (a.hasOwnProperty(c) && (p = a[c], p != null))
            switch (c) {
              case "value":
                l = p;
                break;
              case "defaultValue":
                i = p;
                break;
              case "children":
                u = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(o(91));
                break;
              default:
                et(e, t, c, p, a, null);
            }
        af(e, l, i, u);
        return;
      case "option":
        for (R in a)
          if (a.hasOwnProperty(R) && (l = a[R], l != null))
            switch (R) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                et(e, t, R, l, a, null);
            }
        return;
      case "dialog":
        Oe("beforetoggle", e), Oe("toggle", e), Oe("cancel", e), Oe("close", e);
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ii.length; l++)
          Oe(Ii[l], e);
        break;
      case "image":
        Oe("error", e), Oe("load", e);
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Oe("error", e), Oe("load", e);
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
        for (U in a)
          if (a.hasOwnProperty(U) && (l = a[U], l != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                et(e, t, U, l, a, null);
            }
        return;
      default:
        if (ts(t)) {
          for (G in a)
            a.hasOwnProperty(G) && (l = a[G], l !== void 0 && Xo(
              e,
              t,
              G,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (p in a)
      a.hasOwnProperty(p) && (l = a[p], l != null && et(e, t, p, l, a, null));
  }
  function Rp(e, t, a, l) {
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
        var i = null, u = null, c = null, p = null, R = null, U = null, G = null;
        for (B in a) {
          var Q = a[B];
          if (a.hasOwnProperty(B) && Q != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                R = Q;
              default:
                l.hasOwnProperty(B) || et(e, t, B, null, l, Q);
            }
        }
        for (var L in l) {
          var B = l[L];
          if (Q = a[L], l.hasOwnProperty(L) && (B != null || Q != null))
            switch (L) {
              case "type":
                u = B;
                break;
              case "name":
                i = B;
                break;
              case "checked":
                U = B;
                break;
              case "defaultChecked":
                G = B;
                break;
              case "value":
                c = B;
                break;
              case "defaultValue":
                p = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(o(137, t));
                break;
              default:
                B !== Q && et(
                  e,
                  t,
                  L,
                  B,
                  l,
                  Q
                );
            }
        }
        bi(
          e,
          c,
          p,
          R,
          U,
          G,
          u,
          i
        );
        return;
      case "select":
        B = c = p = L = null;
        for (u in a)
          if (R = a[u], a.hasOwnProperty(u) && R != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                B = R;
              default:
                l.hasOwnProperty(u) || et(
                  e,
                  t,
                  u,
                  null,
                  l,
                  R
                );
            }
        for (i in l)
          if (u = l[i], R = a[i], l.hasOwnProperty(i) && (u != null || R != null))
            switch (i) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                p = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== R && et(
                  e,
                  t,
                  i,
                  u,
                  l,
                  R
                );
            }
        t = p, a = c, l = B, L != null ? Dn(e, !!a, L, !1) : !!l != !!a && (t != null ? Dn(e, !!a, t, !0) : Dn(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        B = L = null;
        for (p in a)
          if (i = a[p], a.hasOwnProperty(p) && i != null && !l.hasOwnProperty(p))
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                et(e, t, p, null, l, i);
            }
        for (c in l)
          if (i = l[c], u = a[c], l.hasOwnProperty(c) && (i != null || u != null))
            switch (c) {
              case "value":
                L = i;
                break;
              case "defaultValue":
                B = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                i !== u && et(e, t, c, i, l, u);
            }
        tf(e, L, B);
        return;
      case "option":
        for (var se in a)
          if (L = a[se], a.hasOwnProperty(se) && L != null && !l.hasOwnProperty(se))
            switch (se) {
              case "selected":
                e.selected = !1;
                break;
              default:
                et(
                  e,
                  t,
                  se,
                  null,
                  l,
                  L
                );
            }
        for (R in l)
          if (L = l[R], B = a[R], l.hasOwnProperty(R) && L !== B && (L != null || B != null))
            switch (R) {
              case "selected":
                e.selected = L && typeof L != "function" && typeof L != "symbol";
                break;
              default:
                et(
                  e,
                  t,
                  R,
                  L,
                  l,
                  B
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
        for (var be in a)
          L = a[be], a.hasOwnProperty(be) && L != null && !l.hasOwnProperty(be) && et(e, t, be, null, l, L);
        for (U in l)
          if (L = l[U], B = a[U], l.hasOwnProperty(U) && L !== B && (L != null || B != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null)
                  throw Error(o(137, t));
                break;
              default:
                et(
                  e,
                  t,
                  U,
                  L,
                  l,
                  B
                );
            }
        return;
      default:
        if (ts(t)) {
          for (var tt in a)
            L = a[tt], a.hasOwnProperty(tt) && L !== void 0 && !l.hasOwnProperty(tt) && Xo(
              e,
              t,
              tt,
              void 0,
              l,
              L
            );
          for (G in l)
            L = l[G], B = a[G], !l.hasOwnProperty(G) || L === B || L === void 0 && B === void 0 || Xo(
              e,
              t,
              G,
              L,
              l,
              B
            );
          return;
        }
    }
    for (var z in a)
      L = a[z], a.hasOwnProperty(z) && L != null && !l.hasOwnProperty(z) && et(e, t, z, null, l, L);
    for (Q in l)
      L = l[Q], B = a[Q], !l.hasOwnProperty(Q) || L === B || L == null && B == null || et(e, t, Q, L, l, B);
  }
  function rm(e) {
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
  function Tp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var i = a[l], u = i.transferSize, c = i.initiatorType, p = i.duration;
        if (u && p && rm(c)) {
          for (c = 0, p = i.responseEnd, l += 1; l < a.length; l++) {
            var R = a[l], U = R.startTime;
            if (U > p) break;
            var G = R.transferSize, Q = R.initiatorType;
            G && rm(Q) && (R = R.responseEnd, c += G * (R < p ? 1 : (p - U) / (R - U)));
          }
          if (--l, t += 8 * (u + c) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Vo = null, Qo = null;
  function bu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function um(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function sm(e, t) {
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
  function Zo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ko = null;
  function _p() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ko ? !1 : (ko = e, !0) : (ko = null, !1);
  }
  var om = typeof setTimeout == "function" ? setTimeout : void 0, wp = typeof clearTimeout == "function" ? clearTimeout : void 0, cm = typeof Promise == "function" ? Promise : void 0, Np = typeof queueMicrotask == "function" ? queueMicrotask : typeof cm < "u" ? function(e) {
    return cm.resolve(null).then(e).catch(Ap);
  } : om;
  function Ap(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Zl(e) {
    return e === "head";
  }
  function fm(e, t) {
    var a = t, l = 0;
    do {
      var i = a.nextSibling;
      if (e.removeChild(a), i && i.nodeType === 8)
        if (a = i.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(i), oi(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          er(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, er(a);
          for (var u = a.firstChild; u; ) {
            var c = u.nextSibling, p = u.nodeName;
            u[Ce] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = c;
          }
        } else
          a === "body" && er(e.ownerDocument.body);
      a = i;
    } while (a);
    oi(t);
  }
  function dm(e, t) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), l && l.nodeType === 8)
        if (a = l.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = l;
    } while (a);
  }
  function Ko(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ko(a), Qe(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Mp(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var i = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ce])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Ea(e.nextSibling), e === null) break;
    }
    return null;
  }
  function zp(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Ea(e.nextSibling), e === null)) return null;
    return e;
  }
  function hm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ea(e.nextSibling), e === null)) return null;
    return e;
  }
  function Jo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function $o(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Dp(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Ea(e) {
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
  var Fo = null;
  function mm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Ea(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function vm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ym(e, t, a) {
    switch (t = bu(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function er(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Qe(e);
  }
  var xa = /* @__PURE__ */ new Map(), gm = /* @__PURE__ */ new Set();
  function Su(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var xl = V.d;
  V.d = {
    f: Cp,
    r: jp,
    D: Op,
    C: Up,
    L: Lp,
    m: Bp,
    X: Gp,
    S: Hp,
    M: qp
  };
  function Cp() {
    var e = xl.f(), t = fu();
    return e || t;
  }
  function jp(e) {
    var t = Je(e);
    t !== null && t.tag === 5 && t.type === "form" ? Od(t) : xl.r(e);
  }
  var ri = typeof document > "u" ? null : document;
  function pm(e, t, a) {
    var l = ri;
    if (l && typeof t == "string" && t) {
      var i = Vt(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof a == "string" && (i += '[crossorigin="' + a + '"]'), gm.has(i) || (gm.add(i), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(i) === null && (t = l.createElement("link"), Ut(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function Op(e) {
    xl.D(e), pm("dns-prefetch", e, null);
  }
  function Up(e, t) {
    xl.C(e, t), pm("preconnect", e, t);
  }
  function Lp(e, t, a) {
    xl.L(e, t, a);
    var l = ri;
    if (l && e && t) {
      var i = 'link[rel="preload"][as="' + Vt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (i += '[imagesrcset="' + Vt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (i += '[imagesizes="' + Vt(
        a.imageSizes
      ) + '"]')) : i += '[href="' + Vt(e) + '"]';
      var u = i;
      switch (t) {
        case "style":
          u = ui(e);
          break;
        case "script":
          u = si(e);
      }
      xa.has(u) || (e = h(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), xa.set(u, e), l.querySelector(i) !== null || t === "style" && l.querySelector(tr(u)) || t === "script" && l.querySelector(ar(u)) || (t = l.createElement("link"), Ut(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function Bp(e, t) {
    xl.m(e, t);
    var a = ri;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + Vt(l) + '"][href="' + Vt(e) + '"]', u = i;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = si(e);
      }
      if (!xa.has(u) && (e = h({ rel: "modulepreload", href: e }, t), xa.set(u, e), a.querySelector(i) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(ar(u)))
              return;
        }
        l = a.createElement("link"), Ut(l, "link", e), Ve(l), a.head.appendChild(l);
      }
    }
  }
  function Hp(e, t, a) {
    xl.S(e, t, a);
    var l = ri;
    if (l && e) {
      var i = mt(l).hoistableStyles, u = ui(e);
      t = t || "default";
      var c = i.get(u);
      if (!c) {
        var p = { loading: 0, preload: null };
        if (c = l.querySelector(
          tr(u)
        ))
          p.loading = 5;
        else {
          e = h(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = xa.get(u)) && Wo(e, a);
          var R = c = l.createElement("link");
          Ve(R), Ut(R, "link", e), R._p = new Promise(function(U, G) {
            R.onload = U, R.onerror = G;
          }), R.addEventListener("load", function() {
            p.loading |= 1;
          }), R.addEventListener("error", function() {
            p.loading |= 2;
          }), p.loading |= 4, Eu(c, t, l);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: p
        }, i.set(u, c);
      }
    }
  }
  function Gp(e, t) {
    xl.X(e, t);
    var a = ri;
    if (a && e) {
      var l = mt(a).hoistableScripts, i = si(e), u = l.get(i);
      u || (u = a.querySelector(ar(i)), u || (e = h({ src: e, async: !0 }, t), (t = xa.get(i)) && Io(e, t), u = a.createElement("script"), Ve(u), Ut(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(i, u));
    }
  }
  function qp(e, t) {
    xl.M(e, t);
    var a = ri;
    if (a && e) {
      var l = mt(a).hoistableScripts, i = si(e), u = l.get(i);
      u || (u = a.querySelector(ar(i)), u || (e = h({ src: e, async: !0, type: "module" }, t), (t = xa.get(i)) && Io(e, t), u = a.createElement("script"), Ve(u), Ut(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(i, u));
    }
  }
  function bm(e, t, a, l) {
    var i = (i = oe.current) ? Su(i) : null;
    if (!i) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = ui(a.href), a = mt(
          i
        ).hoistableStyles, l = a.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = ui(a.href);
          var u = mt(
            i
          ).hoistableStyles, c = u.get(e);
          if (c || (i = i.ownerDocument || i, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = i.querySelector(
            tr(e)
          )) && !u._p && (c.instance = u, c.state.loading = 5), xa.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, xa.set(e, a), u || Yp(
            i,
            e,
            a,
            c.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return c;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = si(a), a = mt(
          i
        ).hoistableScripts, l = a.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function ui(e) {
    return 'href="' + Vt(e) + '"';
  }
  function tr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Sm(e) {
    return h({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Yp(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Ut(t, "link", a), Ve(t), e.head.appendChild(t));
  }
  function si(e) {
    return '[src="' + Vt(e) + '"]';
  }
  function ar(e) {
    return "script[async]" + e;
  }
  function Em(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Vt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Ve(l), l;
          var i = h({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ve(l), Ut(l, "style", i), Eu(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          i = ui(a.href);
          var u = e.querySelector(
            tr(i)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ve(u), u;
          l = Sm(a), (i = xa.get(i)) && Wo(l, i), u = (e.ownerDocument || e).createElement("link"), Ve(u);
          var c = u;
          return c._p = new Promise(function(p, R) {
            c.onload = p, c.onerror = R;
          }), Ut(u, "link", l), t.state.loading |= 4, Eu(u, a.precedence, e), t.instance = u;
        case "script":
          return u = si(a.src), (i = e.querySelector(
            ar(u)
          )) ? (t.instance = i, Ve(i), i) : (l = a, (i = xa.get(u)) && (l = h({}, a), Io(l, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ve(i), Ut(i, "link", l), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Eu(l, a.precedence, e));
    return t.instance;
  }
  function Eu(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = l.length ? l[l.length - 1] : null, u = i, c = 0; c < l.length; c++) {
      var p = l[c];
      if (p.dataset.precedence === t) u = p;
      else if (u !== i) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function Wo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Io(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var xu = null;
  function xm(e, t, a) {
    if (xu === null) {
      var l = /* @__PURE__ */ new Map(), i = xu = /* @__PURE__ */ new Map();
      i.set(a, l);
    } else
      i = xu, l = i.get(a), l || (l = /* @__PURE__ */ new Map(), i.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), i = 0; i < a.length; i++) {
      var u = a[i];
      if (!(u[Ce] || u[ae] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var p = l.get(c);
        p ? p.push(u) : l.set(c, [u]);
      }
    }
    return l;
  }
  function Rm(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Xp(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
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
  function Tm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Vp(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var i = ui(l.href), u = t.querySelector(
          tr(i)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ru.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, Ve(u);
          return;
        }
        u = t.ownerDocument || t, l = Sm(l), (i = xa.get(i)) && Wo(l, i), u = u.createElement("link"), Ve(u);
        var c = u;
        c._p = new Promise(function(p, R) {
          c.onload = p, c.onerror = R;
        }), Ut(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ru.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Po = 0;
  function Qp(e, t) {
    return e.stylesheets && e.count === 0 && _u(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && _u(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Po === 0 && (Po = 62500 * Tp());
      var i = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && _u(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Po ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(i);
      };
    } : null;
  }
  function Ru() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _u(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Tu = null;
  function _u(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Tu = /* @__PURE__ */ new Map(), t.forEach(Zp, e), Tu = null, Ru.call(e));
  }
  function Zp(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Tu.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Tu.set(e, a);
        for (var i = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < i.length; u++) {
          var c = i[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), l = c);
        }
        l && a.set(null, l);
      }
      i = t.instance, c = i.getAttribute("data-precedence"), u = a.get(c) || l, u === l && a.set(null, i), a.set(c, i), this.count++, l = Ru.bind(this), i.addEventListener("load", l), i.addEventListener("error", l), u ? u.parentNode.insertBefore(i, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var lr = {
    $$typeof: I,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0
  };
  function kp(e, t, a, l, i, u, c, p, R) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ta(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ta(0), this.hiddenUpdates = ta(null), this.identifierPrefix = l, this.onUncaughtError = i, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = R, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function _m(e, t, a, l, i, u, c, p, R, U, G, Q) {
    return e = new kp(
      e,
      t,
      a,
      c,
      R,
      U,
      G,
      Q,
      p
    ), t = 1, u === !0 && (t |= 24), u = na(3, null, null, t), e.current = u, u.stateNode = e, t = Ds(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, Us(u), e;
  }
  function wm(e) {
    return e ? (e = Gn, e) : Gn;
  }
  function Nm(e, t, a, l, i, u) {
    i = wm(i), l.context === null ? l.context = i : l.pendingContext = i, l = Ol(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Ul(e, l, t), a !== null && (It(a, e, t), Ui(a, e, t));
  }
  function Am(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ec(e, t) {
    Am(e, t), (e = e.alternate) && Am(e, t);
  }
  function Mm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = sn(e, 67108864);
      t !== null && It(t, e, 67108864), ec(e, 67108864);
    }
  }
  function zm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = oa();
      t = N(t);
      var a = sn(e, t);
      a !== null && It(a, e, t), ec(e, t);
    }
  }
  var wu = !0;
  function Kp(e, t, a, l) {
    var i = M.T;
    M.T = null;
    var u = V.p;
    try {
      V.p = 2, tc(e, t, a, l);
    } finally {
      V.p = u, M.T = i;
    }
  }
  function Jp(e, t, a, l) {
    var i = M.T;
    M.T = null;
    var u = V.p;
    try {
      V.p = 8, tc(e, t, a, l);
    } finally {
      V.p = u, M.T = i;
    }
  }
  function tc(e, t, a, l) {
    if (wu) {
      var i = ac(l);
      if (i === null)
        Yo(
          e,
          t,
          l,
          Nu,
          a
        ), Cm(e, l);
      else if (Fp(
        i,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Cm(e, l), t & 4 && -1 < $p.indexOf(e)) {
        for (; i !== null; ) {
          var u = Je(i);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = Zt(u.pendingLanes);
                  if (c !== 0) {
                    var p = u;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; c; ) {
                      var R = 1 << 31 - Rt(c);
                      p.entanglements[1] |= R, c &= ~R;
                    }
                    Fa(u), (Ke & 6) === 0 && (ou = Mt() + 500, Wi(0));
                  }
                }
                break;
              case 31:
              case 13:
                p = sn(u, 2), p !== null && It(p, u, 2), fu(), ec(u, 2);
            }
          if (u = ac(l), u === null && Yo(
            e,
            t,
            l,
            Nu,
            a
          ), u === i) break;
          i = u;
        }
        i !== null && l.stopPropagation();
      } else
        Yo(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function ac(e) {
    return e = ls(e), lc(e);
  }
  var Nu = null;
  function lc(e) {
    if (Nu = null, e = it(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = g(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Nu = e, null;
  }
  function Dm(e) {
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
        switch (Ma()) {
          case ea:
            return 2;
          case ln:
            return 8;
          case za:
          case Yt:
            return 32;
          case xt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nc = !1, kl = null, Kl = null, Jl = null, nr = /* @__PURE__ */ new Map(), ir = /* @__PURE__ */ new Map(), $l = [], $p = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Cm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        kl = null;
        break;
      case "dragenter":
      case "dragleave":
        Kl = null;
        break;
      case "mouseover":
      case "mouseout":
        Jl = null;
        break;
      case "pointerover":
      case "pointerout":
        nr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ir.delete(t.pointerId);
    }
  }
  function rr(e, t, a, l, i, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [i]
    }, t !== null && (t = Je(t), t !== null && Mm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function Fp(e, t, a, l, i) {
    switch (t) {
      case "focusin":
        return kl = rr(
          kl,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "dragenter":
        return Kl = rr(
          Kl,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "mouseover":
        return Jl = rr(
          Jl,
          e,
          t,
          a,
          l,
          i
        ), !0;
      case "pointerover":
        var u = i.pointerId;
        return nr.set(
          u,
          rr(
            nr.get(u) || null,
            e,
            t,
            a,
            l,
            i
          )
        ), !0;
      case "gotpointercapture":
        return u = i.pointerId, ir.set(
          u,
          rr(
            ir.get(u) || null,
            e,
            t,
            a,
            l,
            i
          )
        ), !0;
    }
    return !1;
  }
  function jm(e) {
    var t = it(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = m(a), t !== null) {
            e.blockedOn = t, K(e.priority, function() {
              zm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = g(a), t !== null) {
            e.blockedOn = t, K(e.priority, function() {
              zm(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Au(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ac(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        as = l, a.target.dispatchEvent(l), as = null;
      } else
        return t = Je(a), t !== null && Mm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function Om(e, t, a) {
    Au(e) && a.delete(t);
  }
  function Wp() {
    nc = !1, kl !== null && Au(kl) && (kl = null), Kl !== null && Au(Kl) && (Kl = null), Jl !== null && Au(Jl) && (Jl = null), nr.forEach(Om), ir.forEach(Om);
  }
  function Mu(e, t) {
    e.blockedOn === t && (e.blockedOn = null, nc || (nc = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      Wp
    )));
  }
  var zu = null;
  function Um(e) {
    zu !== e && (zu = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        zu === e && (zu = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], i = e[t + 2];
          if (typeof l != "function") {
            if (lc(l || a) === null)
              continue;
            break;
          }
          var u = Je(a);
          u !== null && (e.splice(t, 3), t -= 3, to(
            u,
            {
              pending: !0,
              data: i,
              method: a.method,
              action: l
            },
            l,
            i
          ));
        }
      }
    ));
  }
  function oi(e) {
    function t(R) {
      return Mu(R, e);
    }
    kl !== null && Mu(kl, e), Kl !== null && Mu(Kl, e), Jl !== null && Mu(Jl, e), nr.forEach(t), ir.forEach(t);
    for (var a = 0; a < $l.length; a++) {
      var l = $l[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < $l.length && (a = $l[0], a.blockedOn === null); )
      jm(a), a.blockedOn === null && $l.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var i = a[l], u = a[l + 1], c = i[ie] || null;
        if (typeof u == "function")
          c || Um(a);
        else if (c) {
          var p = null;
          if (u && u.hasAttribute("formAction")) {
            if (i = u, c = u[ie] || null)
              p = c.formAction;
            else if (lc(i) !== null) continue;
          } else p = c.action;
          typeof p == "function" ? a[l + 1] = p : (a.splice(l, 3), l -= 3), Um(a);
        }
      }
  }
  function Lm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return i = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      i !== null && (i(), i = null), l || setTimeout(a, 20);
    }
    function a() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, i = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
      };
    }
  }
  function ic(e) {
    this._internalRoot = e;
  }
  Du.prototype.render = ic.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = oa();
    Nm(a, l, e, t, null, null);
  }, Du.prototype.unmount = ic.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Nm(e.current, 2, null, e, null, null), fu(), t[le] = null;
    }
  };
  function Du(e) {
    this._internalRoot = e;
  }
  Du.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Z();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < $l.length && t !== 0 && t < $l[a].priority; a++) ;
      $l.splice(a, 0, e), a === 0 && jm(e);
    }
  };
  var Bm = r.version;
  if (Bm !== "19.2.7")
    throw Error(
      o(
        527,
        Bm,
        "19.2.7"
      )
    );
  V.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = v(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Ip = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cu.isDisabled && Cu.supportsFiber)
      try {
        Da = Cu.inject(
          Ip
        ), zt = Cu;
      } catch {
      }
  }
  return sr.createRoot = function(e, t) {
    if (!f(e)) throw Error(o(299));
    var a = !1, l = "", i = Qd, u = Zd, c = kd;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = _m(
      e,
      1,
      !1,
      null,
      null,
      a,
      l,
      null,
      i,
      u,
      c,
      Lm
    ), e[le] = t.current, qo(e), new ic(t);
  }, sr.hydrateRoot = function(e, t, a) {
    if (!f(e)) throw Error(o(299));
    var l = !1, i = "", u = Qd, c = Zd, p = kd, R = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (p = a.onRecoverableError), a.formState !== void 0 && (R = a.formState)), t = _m(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      i,
      R,
      u,
      c,
      p,
      Lm
    ), t.context = wm(null), a = t.current, l = oa(), l = N(l), i = Ol(l), i.callback = null, Ul(a, i, l), a = l, t.current.lanes = a, Ie(t, a), Fa(t), e[le] = t.current, qo(e), new Du(t);
  }, sr.version = "19.2.7", sr;
}
var Km;
function o0() {
  if (Km) return sc.exports;
  Km = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), sc.exports = s0(), sc.exports;
}
var c0 = o0();
/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var ry = (n) => {
  throw TypeError(n);
}, uy = (n, r, s) => r.has(n) || ry("Cannot " + s), Ra = (n, r, s) => (uy(n, r, "read from private field"), s ? s.call(n) : r.get(n)), dr = (n, r, s) => r.has(n) ? ry("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(n) : r.set(n, s), Wa = (n, r, s, o) => (uy(n, r, "write to private field"), r.set(n, s), s), Ju = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i, Lc = /^[\\/]{2}/;
function sy(n, r) {
  return r + n.replace(/\\/g, "/");
}
function Jm(n) {
  return typeof n == "object" && n != null && "pathname" in n && "search" in n && "hash" in n && "state" in n && "key" in n;
}
function f0(n = {}) {
  let { initialEntries: r = ["/"], initialIndex: s, v5Compat: o = !1 } = n, f;
  f = r.map(
    (_, C) => S(
      _,
      typeof _ == "string" ? null : _.state,
      C === 0 ? "default" : void 0,
      typeof _ == "string" ? void 0 : _.mask
    )
  );
  let d = y(
    s ?? f.length - 1
  ), m = "POP", g = null;
  function y(_) {
    return Math.min(Math.max(_, 0), f.length - 1);
  }
  function v() {
    return f[d];
  }
  function S(_, C = null, X, k) {
    let $ = Rc(
      f ? v().pathname : "/",
      _,
      C,
      X,
      k
    );
    return ft(
      $.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        _
      )}`
    ), $;
  }
  function h(_) {
    return typeof _ == "string" ? _ : el(_);
  }
  return {
    get index() {
      return d;
    },
    get action() {
      return m;
    },
    get location() {
      return v();
    },
    createHref: h,
    createURL(_) {
      return new URL(h(_), "http://localhost");
    },
    encodeLocation(_) {
      let C = typeof _ == "string" ? Ya(_) : _;
      return {
        pathname: C.pathname || "",
        search: C.search || "",
        hash: C.hash || ""
      };
    },
    push(_, C) {
      m = "PUSH";
      let X = Jm(_) ? _ : S(_, C);
      d += 1, f.splice(d, f.length, X), o && g && g({ action: m, location: X, delta: 1 });
    },
    replace(_, C) {
      m = "REPLACE";
      let X = Jm(_) ? _ : S(_, C);
      f[d] = X, o && g && g({ action: m, location: X, delta: 0 });
    },
    go(_) {
      m = "POP";
      let C = y(d + _), X = f[C];
      d = C, g && g({ action: m, location: X, delta: _ });
    },
    listen(_) {
      return g = _, () => {
        g = null;
      };
    }
  };
}
function ze(n, r) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(r);
}
function ft(n, r) {
  if (!n) {
    typeof console < "u" && console.warn(r);
    try {
      throw new Error(r);
    } catch {
    }
  }
}
function d0() {
  return Math.random().toString(36).substring(2, 10);
}
function Rc(n, r, s = null, o, f) {
  return {
    pathname: typeof n == "string" ? n : n.pathname,
    search: "",
    hash: "",
    ...typeof r == "string" ? Ya(r) : r,
    state: s,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: r && r.key || o || d0(),
    mask: f
  };
}
function el({
  pathname: n = "/",
  search: r = "",
  hash: s = ""
}) {
  return r && r !== "?" && (n += r.charAt(0) === "?" ? r : "?" + r), s && s !== "#" && (n += s.charAt(0) === "#" ? s : "#" + s), n;
}
function Ya(n) {
  let r = {};
  if (n) {
    let s = n.indexOf("#");
    s >= 0 && (r.hash = n.substring(s), n = n.substring(0, s));
    let o = n.indexOf("?");
    o >= 0 && (r.search = n.substring(o), n = n.substring(0, o)), n && (r.pathname = n);
  }
  return r;
}
function h0(n, r, s = !1) {
  let o = "http://localhost";
  n && (o = n.location.origin !== "null" ? n.location.origin : n.location.href), ze(o, "No window.location.(origin|href) available to create URL");
  let f = typeof r == "string" ? r : el(r);
  return f = f.replace(/ $/, "%20"), !s && Lc.test(f) && (f = o + f), new URL(f, o);
}
var hr, $m = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(n) {
    if (dr(this, hr, /* @__PURE__ */ new Map()), n)
      for (let [r, s] of n)
        this.set(r, s);
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
    if (Ra(this, hr).has(n))
      return Ra(this, hr).get(n);
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
  set(n, r) {
    Ra(this, hr).set(n, r);
  }
};
hr = /* @__PURE__ */ new WeakMap();
var m0 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function v0(n) {
  return m0.has(
    n
  );
}
var y0 = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function g0(n) {
  return y0.has(
    n
  );
}
function p0(n) {
  return n.index === !0;
}
function yr(n, r, s = [], o = {}, f = !1) {
  return n.map((d, m) => {
    let g = [...s, String(m)], y = typeof d.id == "string" ? d.id : g.join("-");
    if (ze(
      d.index !== !0 || !d.children,
      "Cannot specify children on an index route"
    ), ze(
      f || !o[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), p0(d)) {
      let v = {
        ...d,
        id: y
      };
      return o[y] = Fm(
        v,
        r(v)
      ), v;
    } else {
      let v = {
        ...d,
        id: y,
        children: void 0
      };
      return o[y] = Fm(
        v,
        r(v)
      ), d.children && (v.children = yr(
        d.children,
        r,
        g,
        o,
        f
      )), v;
    }
  });
}
function Fm(n, r) {
  return Object.assign(n, {
    ...r,
    ...typeof r.lazy == "object" && r.lazy != null ? {
      lazy: {
        ...n.lazy,
        ...r.lazy
      }
    } : {}
  });
}
function oy(n, r, s = "/") {
  return Ga(n, r, s, !1);
}
function Ga(n, r, s, o, f) {
  let d = typeof r == "string" ? Ya(r) : r, m = wa(d.pathname || "/", s);
  if (m == null)
    return null;
  let g = f ?? Gu(n), y = null, v = z0(m);
  for (let S = 0; y == null && S < g.length; ++S)
    y = M0(
      g[S],
      v,
      o
    );
  return y;
}
function b0(n, r) {
  let { route: s, pathname: o, params: f } = n;
  return {
    id: s.id,
    pathname: o,
    params: f,
    data: r[s.id],
    loaderData: r[s.id],
    handle: s.handle
  };
}
function Gu(n) {
  let r = cy(n);
  return S0(r), r;
}
function cy(n, r = [], s = [], o = "", f = !1) {
  let d = (m, g, y = f, v) => {
    let S = {
      relativePath: v === void 0 ? m.path || "" : v,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: g,
      route: m
    };
    if (S.relativePath.startsWith("/")) {
      if (!S.relativePath.startsWith(o) && y)
        return;
      ze(
        S.relativePath.startsWith(o),
        `Absolute route path "${S.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), S.relativePath = S.relativePath.slice(o.length);
    }
    let h = _a([o, S.relativePath]), D = s.concat(S);
    m.children && m.children.length > 0 && (ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      m.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
    ), cy(
      m.children,
      r,
      D,
      h,
      y
    )), !(m.path == null && !m.index) && r.push({
      path: h,
      score: N0(h, m.index),
      routesMeta: D.map((_, C) => {
        let [X, k] = hy(
          _.relativePath,
          _.caseSensitive,
          C === D.length - 1
        );
        return {
          ..._,
          matcher: X,
          compiledParams: k
        };
      })
    });
  };
  return n.forEach((m, g) => {
    if (m.path === "" || !m.path?.includes("?"))
      d(m, g);
    else
      for (let y of fy(m.path))
        d(m, g, !0, y);
  }), r;
}
function fy(n) {
  let r = n.split("/");
  if (r.length === 0) return [];
  let [s, ...o] = r, f = s.endsWith("?"), d = s.replace(/\?$/, "");
  if (o.length === 0)
    return f ? [d, ""] : [d];
  let m = fy(o.join("/")), g = [];
  return g.push(
    ...m.map(
      (y) => y === "" ? d : [d, y].join("/")
    )
  ), f && g.push(...m), g.map(
    (y) => n.startsWith("/") && y === "" ? "/" : y
  );
}
function S0(n) {
  n.sort(
    (r, s) => r.score !== s.score ? s.score - r.score : A0(
      r.routesMeta.map((o) => o.childrenIndex),
      s.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var E0 = /^:[\w-]+$/, x0 = 3, R0 = 2, T0 = 1, _0 = 10, w0 = -2, Wm = (n) => n === "*";
function N0(n, r) {
  let s = n.split("/"), o = s.length;
  return s.some(Wm) && (o += w0), r && (o += R0), s.filter((f) => !Wm(f)).reduce(
    (f, d) => f + (E0.test(d) ? x0 : d === "" ? T0 : _0),
    o
  );
}
function A0(n, r) {
  return n.length === r.length && n.slice(0, -1).every((o, f) => o === r[f]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    n[n.length - 1] - r[r.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function M0(n, r, s = !1) {
  let { routesMeta: o } = n, f = {}, d = "/", m = [];
  for (let g = 0; g < o.length; ++g) {
    let y = o[g], v = g === o.length - 1, S = d === "/" ? r : r.slice(d.length) || "/", h = {
      path: y.relativePath,
      caseSensitive: y.caseSensitive,
      end: v
    }, D = (
      // Use precomputed matcher if it exists
      y.matcher && y.compiledParams ? dy(
        h,
        S,
        y.matcher,
        y.compiledParams
      ) : Zu(h, S)
    ), _ = y.route;
    if (!D && v && s && !o[o.length - 1].route.index && (D = Zu(
      {
        path: y.relativePath,
        caseSensitive: y.caseSensitive,
        end: !1
      },
      S
    )), !D)
      return null;
    Object.assign(f, D.params), m.push({
      // TODO: Can this as be avoided?
      params: f,
      pathname: _a([d, D.pathname]),
      pathnameBase: j0(
        _a([d, D.pathnameBase])
      ),
      route: _
    }), D.pathnameBase !== "/" && (d = _a([d, D.pathnameBase]));
  }
  return m;
}
function Zu(n, r) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [s, o] = hy(
    n.path,
    n.caseSensitive,
    n.end
  );
  return dy(n, r, s, o);
}
function dy(n, r, s, o) {
  let f = r.match(s);
  if (!f) return null;
  let d = f[0], m = d.replace(/(.)\/+$/, "$1"), g = f.slice(1);
  return {
    params: o.reduce(
      (v, { paramName: S, isOptional: h }, D) => {
        if (S === "*") {
          let C = g[D] || "";
          m = d.slice(0, d.length - C.length).replace(/(.)\/+$/, "$1");
        }
        const _ = g[D];
        return h && !_ ? v[S] = void 0 : v[S] = (_ || "").replace(/%2F/g, "/"), v;
      },
      {}
    ),
    pathname: d,
    pathnameBase: m,
    pattern: n
  };
}
function hy(n, r = !1, s = !0) {
  ft(
    n === "*" || !n.endsWith("*") || n.endsWith("/*"),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  );
  let o = [], f = "^" + n.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (m, g, y, v, S) => {
      if (o.push({ paramName: g, isOptional: y != null }), y) {
        let h = S.charAt(v + m.length);
        return h && h !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return n.endsWith("*") ? (o.push({ paramName: "*" }), f += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? f += "\\/*$" : n !== "" && n !== "/" && (f += "(?:(?=\\/|$))"), [new RegExp(f, r ? void 0 : "i"), o];
}
function z0(n) {
  try {
    return n.split("/").map((r) => decodeURIComponent(r).replace(/\//g, "%2F")).join("/");
  } catch (r) {
    return ft(
      !1,
      `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`
    ), n;
  }
}
function wa(n, r) {
  if (r === "/") return n;
  if (!n.toLowerCase().startsWith(r.toLowerCase()))
    return null;
  let s = r.endsWith("/") ? r.length - 1 : r.length, o = n.charAt(s);
  return o && o !== "/" ? null : n.slice(s) || "/";
}
function D0({
  basename: n,
  pathname: r
}) {
  return r === "/" ? n : _a([n, r]);
}
var Bc = (n) => Ju.test(n);
function C0(n, r = "/") {
  let {
    pathname: s,
    search: o = "",
    hash: f = ""
  } = typeof n == "string" ? Ya(n) : n, d;
  return s ? (s = Gc(s), s.startsWith("/") ? d = Im(s.substring(1), "/") : d = Im(s, r)) : d = r, {
    pathname: d,
    search: O0(o),
    hash: U0(f)
  };
}
function Im(n, r) {
  let s = ku(r).split("/");
  return n.split("/").forEach((f) => {
    f === ".." ? s.length > 1 && s.pop() : f !== "." && s.push(f);
  }), s.length > 1 ? s.join("/") : "/";
}
function dc(n, r, s, o) {
  return `Cannot include a '${n}' character in a manually specified \`to.${r}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function my(n) {
  return n.filter(
    (r, s) => s === 0 || r.route.path && r.route.path.length > 0
  );
}
function Hc(n) {
  let r = my(n);
  return r.map(
    (s, o) => o === r.length - 1 ? s.pathname : s.pathnameBase
  );
}
function $u(n, r, s, o = !1) {
  let f;
  typeof n == "string" ? f = Ya(n) : (f = { ...n }, ze(
    !f.pathname || !f.pathname.includes("?"),
    dc("?", "pathname", "search", f)
  ), ze(
    !f.pathname || !f.pathname.includes("#"),
    dc("#", "pathname", "hash", f)
  ), ze(
    !f.search || !f.search.includes("#"),
    dc("#", "search", "hash", f)
  ));
  let d = n === "" || f.pathname === "", m = d ? "/" : f.pathname, g;
  if (m == null)
    g = s;
  else {
    let h = r.length - 1;
    if (!o && m.startsWith("..")) {
      let D = m.split("/");
      for (; D[0] === ".."; )
        D.shift(), h -= 1;
      f.pathname = D.join("/");
    }
    g = h >= 0 ? r[h] : "/";
  }
  let y = C0(f, g), v = m && m !== "/" && m.endsWith("/"), S = (d || m === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (v || S) && (y.pathname += "/"), y;
}
var Gc = (n) => n.replace(/[\\/]{2,}/g, "/"), _a = (n) => Gc(n.join("/")), ku = (n) => n.replace(/\/+$/, ""), j0 = (n) => ku(n).replace(/^\/*/, "/"), O0 = (n) => !n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n, U0 = (n) => !n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n, Pm = (n, r = 302) => {
  let s = r;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let o = new Headers(s.headers);
  return o.set("Location", n), new Response(null, { ...s, headers: o });
}, Fu = class {
  constructor(n, r, s, o = !1) {
    this.status = n, this.statusText = r || "", this.internal = o, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function gr(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.internal == "boolean" && "data" in n;
}
function pr(n) {
  let r = n.map((s) => s.route.path).filter(Boolean);
  return _a(r) || "/";
}
var vy = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function yy(n, r) {
  let s = n;
  if (typeof s != "string" || !Ju.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let o = s, f = !1;
  if (vy)
    try {
      let d = new URL(window.location.href), m = Lc.test(s) ? new URL(sy(s, d.protocol)) : new URL(s), g = wa(m.pathname, r);
      m.origin === d.origin && g != null ? s = g + m.search + m.hash : f = !0;
    } catch {
      ft(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: o,
    isExternal: f,
    to: s
  };
}
var Pl = Symbol("Uninstrumented");
function L0(n, r) {
  let s = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  n.forEach(
    (f) => f({
      id: r.id,
      index: r.index,
      path: r.path,
      instrument(d) {
        let m = Object.keys(s);
        for (let g of m)
          d[g] && s[g].push(d[g]);
      }
    })
  );
  let o = {};
  if (typeof r.lazy == "function" && s.lazy.length > 0) {
    let f = mi(s.lazy, r.lazy, () => {
    });
    f && (o.lazy = f);
  }
  if (typeof r.lazy == "object") {
    let f = r.lazy;
    ["middleware", "loader", "action"].forEach((d) => {
      let m = f[d], g = s[`lazy.${d}`];
      if (typeof m == "function" && g.length > 0) {
        let y = mi(g, m, () => {
        });
        y && (o.lazy = Object.assign(o.lazy || {}, {
          [d]: y
        }));
      }
    });
  }
  return ["loader", "action"].forEach((f) => {
    let d = r[f];
    if (typeof d == "function" && s[f].length > 0) {
      let m = d[Pl] ?? d, g = mi(
        s[f],
        m,
        (...y) => ev(y[0])
      );
      g && (f === "loader" && m.hydrate === !0 && (g.hydrate = !0), g[Pl] = m, o[f] = g);
    }
  }), r.middleware && r.middleware.length > 0 && s.middleware.length > 0 && (o.middleware = r.middleware.map((f) => {
    let d = f[Pl] ?? f, m = mi(
      s.middleware,
      d,
      (...g) => ev(g[0])
    );
    return m ? (m[Pl] = d, m) : f;
  })), o;
}
function B0(n, r) {
  let s = {
    navigate: [],
    fetch: []
  };
  if (r.forEach(
    (o) => o({
      instrument(f) {
        let d = Object.keys(f);
        for (let m of d)
          f[m] && s[m].push(f[m]);
      }
    })
  ), s.navigate.length > 0) {
    let o = n.navigate[Pl] ?? n.navigate, f = mi(
      s.navigate,
      o,
      (...d) => {
        let [m, g] = d;
        return {
          to: typeof m == "number" || typeof m == "string" ? m : m ? el(m) : ".",
          ...tv(n, g ?? {})
        };
      }
    );
    f && (f[Pl] = o, n.navigate = f);
  }
  if (s.fetch.length > 0) {
    let o = n.fetch[Pl] ?? n.fetch, f = mi(s.fetch, o, (...d) => {
      let [m, , g, y] = d;
      return {
        href: g ?? ".",
        fetcherKey: m,
        ...tv(n, y ?? {})
      };
    });
    f && (f[Pl] = o, n.fetch = f);
  }
  return n;
}
function mi(n, r, s) {
  return n.length === 0 ? null : async (...o) => {
    let f = await gy(
      n,
      s(...o),
      () => r(...o),
      n.length - 1
    );
    if (f.type === "error")
      throw f.value;
    return f.value;
  };
}
async function gy(n, r, s, o) {
  let f = n[o], d;
  if (f) {
    let m, g = async () => (m ? console.error("You cannot call instrumented handlers more than once") : m = gy(n, r, s, o - 1), d = await m, ze(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? { status: "error", error: d.value } : { status: "success", error: void 0 });
    try {
      await f(g, r);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    m || await g(), await m;
  } else
    try {
      d = { type: "success", value: await s() };
    } catch (m) {
      d = { type: "error", value: m };
    }
  return d || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function ev(n) {
  let { request: r, context: s, params: o, pattern: f } = n;
  return {
    request: H0(r),
    params: { ...o },
    pattern: f,
    context: G0(s)
  };
}
function tv(n, r) {
  return {
    currentUrl: el(n.state.location),
    ..."formMethod" in r ? { formMethod: r.formMethod } : {},
    ..."formEncType" in r ? { formEncType: r.formEncType } : {},
    ..."formData" in r ? { formData: r.formData } : {},
    ..."body" in r ? { body: r.body } : {}
  };
}
function H0(n) {
  return {
    method: n.method,
    url: n.url,
    headers: {
      get: (...r) => n.headers.get(...r)
    }
  };
}
function G0(n) {
  if (Y0(n)) {
    let r = { ...n };
    return Object.freeze(r), r;
  } else
    return {
      get: (r) => n.get(r)
    };
}
var q0 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Y0(n) {
  if (n === null || typeof n != "object")
    return !1;
  const r = Object.getPrototypeOf(n);
  return r === Object.prototype || r === null || Object.getOwnPropertyNames(r).sort().join("\0") === q0;
}
var py = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], X0 = new Set(
  py
), V0 = [
  "GET",
  ...py
], Q0 = new Set(V0), by = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Z0 = /* @__PURE__ */ new Set([307, 308]), hc = {
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
}, k0 = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, or = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, K0 = (n) => ({
  hasErrorBoundary: !!n.hasErrorBoundary
}), Sy = "remix-router-transitions", Ey = Symbol("ResetLoaderData"), En, ci, Wl, fi, J0 = class {
  constructor(n) {
    dr(this, En), dr(this, ci), dr(this, Wl), dr(this, fi), Wa(this, En, n), Wa(this, ci, Gu(n));
  }
  /** The stable route tree */
  get stableRoutes() {
    return Ra(this, En);
  }
  /** The in-flight route tree if one is active, otherwise the stable tree */
  get activeRoutes() {
    return Ra(this, Wl) ?? Ra(this, En);
  }
  /** Pre-computed branches */
  get branches() {
    return Ra(this, fi) ?? Ra(this, ci);
  }
  get hasHMRRoutes() {
    return Ra(this, Wl) != null;
  }
  /** Replace the stable route tree and recompute its branches */
  setRoutes(n) {
    Wa(this, En, n), Wa(this, ci, Gu(n));
  }
  /** Set a new in-flight route tree and recompute its branches */
  setHmrRoutes(n) {
    Wa(this, Wl, n), Wa(this, fi, Gu(n));
  }
  /** Commit in-flight routes/branches to the stable slot and clear in-flight */
  commitHmrRoutes() {
    Ra(this, Wl) && (Wa(this, En, Ra(this, Wl)), Wa(this, ci, Ra(this, fi)), Wa(this, Wl, void 0), Wa(this, fi, void 0));
  }
};
En = /* @__PURE__ */ new WeakMap();
ci = /* @__PURE__ */ new WeakMap();
Wl = /* @__PURE__ */ new WeakMap();
fi = /* @__PURE__ */ new WeakMap();
function $0(n) {
  const r = n.window ? n.window : typeof window < "u" ? window : void 0, s = typeof r < "u" && typeof r.document < "u" && typeof r.document.createElement < "u";
  ze(
    n.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let o = n.hydrationRouteProperties || [], f = n.mapRouteProperties || K0, d = f;
  if (n.instrumentations) {
    let x = n.instrumentations;
    d = (N) => ({
      ...f(N),
      ...L0(
        x.map((j) => j.route).filter(Boolean),
        N
      )
    });
  }
  let m = {}, g = new J0(
    yr(
      n.routes,
      d,
      void 0,
      m
    )
  ), y = n.basename || "/";
  y.startsWith("/") || (y = `/${y}`);
  let v = n.dataStrategy || eb, S = {
    ...n.future
  }, h = null, D = /* @__PURE__ */ new Set(), _ = null, C = null, X = null, k = null, $ = n.hydrationData != null, P = Ga(
    g.activeRoutes,
    n.history.location,
    y,
    !1,
    g.branches
  ), I = !1, pe = null, me, te;
  if (P == null && !n.patchRoutesOnNavigation) {
    let x = Ta(404, {
      pathname: n.history.location.pathname
    }), { matches: N, route: j } = ju(g.activeRoutes);
    me = !0, te = !me, P = N, pe = { [j.id]: x };
  } else if (P && !n.hydrationData && ta(
    P,
    g.activeRoutes,
    n.history.location.pathname
  ).active && (P = null), P)
    if (P.some((x) => x.route.lazy))
      me = !1, te = !me;
    else if (!P.some((x) => qc(x.route)))
      me = !0, te = !me;
    else {
      let x = n.hydrationData ? n.hydrationData.loaderData : null, N = n.hydrationData ? n.hydrationData.errors : null, j = P;
      if (N) {
        let Z = P.findIndex(
          (K) => N[K.route.id] !== void 0
        );
        j = j.slice(0, Z + 1);
      }
      te = !1, me = !0, j.forEach((Z) => {
        let K = xy(Z.route, x, N);
        te = te || K.renderFallback, me = me && !K.shouldLoad;
      });
    }
  else {
    me = !1, te = !me, P = [];
    let x = ta(
      null,
      g.activeRoutes,
      n.history.location.pathname
    );
    x.active && x.matches && (I = !0, P = x.matches);
  }
  let F, A = {
    historyAction: n.history.action,
    location: n.history.location,
    matches: P,
    initialized: me,
    renderFallback: te,
    navigation: hc,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: n.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: n.hydrationData && n.hydrationData.loaderData || {},
    actionData: n.hydrationData && n.hydrationData.actionData || null,
    errors: n.hydrationData && n.hydrationData.errors || pe,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, Se = "POP", ce = null, Ue = !1, ve, qe = !1, De = /* @__PURE__ */ new Map(), Le = null, M = !1, V = !1, ne = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Map(), de = 0, T = -1, H = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map(), oe = /* @__PURE__ */ new Set(), Re = /* @__PURE__ */ new Map(), Te, Ye = null;
  function fa() {
    if (h = n.history.listen(
      ({ action: x, location: N, delta: j }) => {
        if (Te) {
          Te(), Te = void 0;
          return;
        }
        ft(
          Re.size === 0 || j != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let Z = ka({
          currentLocation: A.location,
          nextLocation: N,
          historyAction: x
        });
        if (Z && j != null) {
          let K = new Promise((ue) => {
            Te = ue;
          });
          n.history.go(j * -1), Ca(Z, {
            state: "blocked",
            location: N,
            proceed() {
              Ca(Z, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: N
              }), K.then(() => n.history.go(j));
            },
            reset() {
              let ue = new Map(A.blockers);
              ue.set(Z, or), dt({ blockers: ue });
            }
          }), ce?.resolve(), ce = null;
          return;
        }
        return Gt(x, N);
      }
    ), s) {
      bb(r, De);
      let x = () => Sb(r, De);
      r.addEventListener("pagehide", x), Le = () => r.removeEventListener("pagehide", x);
    }
    return A.initialized || Gt("POP", A.location, {
      initialHydration: !0
    }), F;
  }
  function Aa() {
    h && h(), Le && Le(), D.clear(), ve && ve.abort(), A.fetchers.forEach((x, N) => Da(A.fetchers, N)), A.blockers.forEach((x, N) => tl(N));
  }
  function da(x) {
    if (D.add(x), _) {
      let { newErrors: N } = _;
      _ = null, x(A, {
        deletedFetchers: [],
        newErrors: N,
        viewTransitionOpts: void 0,
        flushSync: !1
      });
    }
    return () => D.delete(x);
  }
  function dt(x, N = {}) {
    x.matches && (x.matches = x.matches.map((K) => {
      let ue = m[K.route.id], ae = K.route;
      return ae.element !== ue.element || ae.errorElement !== ue.errorElement || ae.hydrateFallbackElement !== ue.hydrateFallbackElement ? {
        ...K,
        route: ue
      } : K;
    })), A = {
      ...A,
      ...x
    };
    let j = [], Z = [];
    A.fetchers.forEach((K, ue) => {
      K.state === "idle" && (oe.has(ue) ? j.push(ue) : Z.push(ue));
    }), oe.forEach((K) => {
      !A.fetchers.has(K) && !re.has(K) && j.push(K);
    }), D.size === 0 && (_ = { newErrors: x.errors ?? null }), [...D].forEach(
      (K) => K(A, {
        deletedFetchers: j,
        newErrors: x.errors ?? null,
        viewTransitionOpts: N.viewTransitionOpts,
        flushSync: N.flushSync === !0
      })
    ), j.forEach((K) => Da(A.fetchers, K)), Z.forEach((K) => A.fetchers.delete(K));
  }
  function wt(x, N, { flushSync: j } = {}) {
    let Z = A.actionData != null && A.navigation.formMethod != null && Ht(A.navigation.formMethod) && A.navigation.state === "loading" && x.state?._isRedirect !== !0, K;
    N.actionData ? Object.keys(N.actionData).length > 0 ? K = N.actionData : K = null : Z ? K = A.actionData : K = null;
    let ue = N.loaderData ? fv(
      A.loaderData,
      N.loaderData,
      N.matches || [],
      N.errors
    ) : A.loaderData, ae = A.blockers;
    ae.size > 0 && (ae = new Map(ae), ae.forEach((ge, Ne) => ae.set(Ne, or)));
    let ie = M ? !1 : Tt(x, N.matches || A.matches), le = Ue === !0 || A.navigation.formMethod != null && Ht(A.navigation.formMethod) && x.state?._isRedirect !== !0;
    g.commitHmrRoutes(), M || Se === "POP" || (Se === "PUSH" ? n.history.push(x, x.state) : Se === "REPLACE" && n.history.replace(x, x.state));
    let ye;
    if (Se === "POP") {
      let ge = De.get(A.location.pathname);
      ge && ge.has(x.pathname) ? ye = {
        currentLocation: A.location,
        nextLocation: x
      } : De.has(x.pathname) && (ye = {
        currentLocation: x,
        nextLocation: A.location
      });
    } else if (qe) {
      let ge = De.get(A.location.pathname);
      ge ? ge.add(x.pathname) : (ge = /* @__PURE__ */ new Set([x.pathname]), De.set(A.location.pathname, ge)), ye = {
        currentLocation: A.location,
        nextLocation: x
      };
    }
    dt(
      {
        ...N,
        // matches, errors, fetchers go through as-is
        actionData: K,
        loaderData: ue,
        historyAction: Se,
        location: x,
        initialized: !0,
        renderFallback: !1,
        navigation: hc,
        revalidation: "idle",
        restoreScrollPosition: ie,
        preventScrollReset: le,
        blockers: ae
      },
      {
        viewTransitionOpts: ye,
        flushSync: j === !0
      }
    ), Se = "POP", Ue = !1, qe = !1, M = !1, V = !1, ce?.resolve(), ce = null, Ye?.resolve(), Ye = null;
  }
  async function Rl(x, N) {
    if (ce?.resolve(), ce = null, typeof x == "number") {
      ce || (ce = vv());
      let Qe = ce.promise;
      return n.history.go(x), Qe;
    }
    let j = Tc(
      A.location,
      A.matches,
      y,
      x,
      N?.fromRouteId,
      N?.relative
    ), { path: Z, submission: K, error: ue } = av(
      !1,
      j,
      N
    ), ae;
    N?.mask && (ae = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof N.mask == "string" ? Ya(N.mask) : {
        ...A.location.mask,
        ...N.mask
      }
    });
    let ie = A.location, le = Rc(
      ie,
      Z,
      N && N.state,
      void 0,
      ae
    );
    le = {
      ...le,
      ...n.history.encodeLocation(le)
    };
    let ye = N && N.replace != null ? N.replace : void 0, ge = "PUSH";
    ye === !0 ? ge = "REPLACE" : ye === !1 || K != null && Ht(K.formMethod) && K.formAction === A.location.pathname + A.location.search && (ge = "REPLACE");
    let Ne = N && "preventScrollReset" in N ? N.preventScrollReset === !0 : void 0, Ee = (N && N.flushSync) === !0, Ce = ka({
      currentLocation: ie,
      nextLocation: le,
      historyAction: ge
    });
    if (Ce) {
      Ca(Ce, {
        state: "blocked",
        location: le,
        proceed() {
          Ca(Ce, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: le
          }), Rl(x, N);
        },
        reset() {
          let Qe = new Map(A.blockers);
          Qe.set(Ce, or), dt({ blockers: Qe });
        }
      });
      return;
    }
    await Gt(ge, le, {
      submission: K,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: ue,
      preventScrollReset: Ne,
      replace: N && N.replace,
      enableViewTransition: N && N.viewTransition,
      flushSync: Ee,
      callSiteDefaultShouldRevalidate: N && N.defaultShouldRevalidate
    });
  }
  function Tl() {
    Ye || (Ye = vv()), za(), dt({ revalidation: "loading" });
    let x = Ye.promise;
    return A.navigation.state === "submitting" ? x : A.navigation.state === "idle" ? (Gt(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), x) : (Gt(
      Se || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: qe === !0
      }
    ), x);
  }
  async function Gt(x, N, j) {
    ve && ve.abort(), ve = null, Se = x, M = (j && j.startUninterruptedRevalidation) === !0, gt(A.location, A.matches), Ue = (j && j.preventScrollReset) === !0, qe = (j && j.enableViewTransition) === !0;
    let Z = g.activeRoutes, K = j?.initialHydration && A.matches && A.matches.length > 0 && !I ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : Ga(
      Z,
      N,
      y,
      !1,
      g.branches
    ), ue = (j && j.flushSync) === !0;
    if (K && A.initialized && !V && ob(A.location, N) && !(j && j.submission && Ht(j.submission.formMethod))) {
      wt(N, { matches: K }, { flushSync: ue });
      return;
    }
    let ae = ta(K, Z, N.pathname);
    if (ae.active && ae.matches && (K = ae.matches), !K) {
      let { error: Je, notFoundMatches: Xe, route: mt } = Zt(
        N.pathname
      );
      wt(
        N,
        {
          matches: Xe,
          loaderData: {},
          errors: {
            [mt.id]: Je
          }
        },
        { flushSync: ue }
      );
      return;
    }
    let ie = j && j.overrideNavigation ? {
      ...j.overrideNavigation,
      matches: K,
      historyAction: x
    } : void 0;
    ve = new AbortController();
    let le = di(
      n.history,
      N,
      ve.signal,
      j && j.submission
    ), ye = n.getContext ? await n.getContext() : new $m(), ge;
    if (j && j.pendingError)
      ge = [
        Il(K).route.id,
        { type: "error", error: j.pendingError }
      ];
    else if (j && j.submission && Ht(j.submission.formMethod)) {
      let Je = await tn(
        le,
        N,
        j.submission,
        K,
        x,
        ye,
        ae.active,
        j && j.initialHydration === !0,
        { replace: j.replace, flushSync: ue }
      );
      if (Je.shortCircuited)
        return;
      if (Je.pendingActionResult) {
        let [Xe, mt] = Je.pendingActionResult;
        if (ca(mt) && gr(mt.error) && mt.error.status === 404) {
          ve = null, wt(N, {
            matches: Je.matches,
            loaderData: {},
            errors: {
              [Xe]: mt.error
            }
          });
          return;
        }
      }
      K = Je.matches || K, ge = Je.pendingActionResult, ie = mc(
        N,
        K,
        x,
        j.submission
      ), ue = !1, ae.active = !1, le = di(
        n.history,
        le.url,
        le.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Ee,
      loaderData: Ce,
      errors: Qe,
      workingFetchers: it
    } = await qt(
      le,
      N,
      K,
      x,
      ye,
      ae.active,
      ie,
      j && j.submission,
      j && j.fetcherSubmission,
      j && j.replace,
      j && j.initialHydration === !0,
      ue,
      ge,
      j && j.callSiteDefaultShouldRevalidate
    );
    Ne || (ve = null, wt(N, {
      matches: Ee || K,
      ...dv(ge),
      loaderData: Ce,
      errors: Qe,
      ...it ? { fetchers: it } : {}
    }));
  }
  async function tn(x, N, j, Z, K, ue, ae, ie, le = {}) {
    za();
    let ye = gb(
      N,
      Z,
      K,
      j
    );
    if (dt({ navigation: ye }, { flushSync: le.flushSync === !0 }), ae) {
      let Ee = await Ie(
        Z,
        N.pathname,
        x.signal
      );
      if (Ee.type === "aborted")
        return { shortCircuited: !0 };
      if (Ee.type === "error") {
        if (Ee.partialMatches.length === 0) {
          let { matches: Qe, route: it } = ju(
            g.activeRoutes
          );
          return {
            matches: Qe,
            pendingActionResult: [
              it.id,
              {
                type: "error",
                error: Ee.error
              }
            ]
          };
        }
        let Ce = Il(Ee.partialMatches).route.id;
        return {
          matches: Ee.partialMatches,
          pendingActionResult: [
            Ce,
            {
              type: "error",
              error: Ee.error
            }
          ]
        };
      } else if (Ee.matches)
        Z = Ee.matches;
      else {
        let { notFoundMatches: Ce, error: Qe, route: it } = Zt(
          N.pathname
        );
        return {
          matches: Ce,
          pendingActionResult: [
            it.id,
            {
              type: "error",
              error: Qe
            }
          ]
        };
      }
    }
    let ge, Ne = qu(Z, N);
    if (!Ne.route.action && !Ne.route.lazy)
      ge = {
        type: "error",
        error: Ta(405, {
          method: x.method,
          pathname: N.pathname,
          routeId: Ne.route.id
        })
      };
    else {
      let Ee = vi(
        d,
        m,
        x,
        N,
        Z,
        Ne,
        ie ? [] : o,
        ue
      ), Ce = await ea(
        x,
        N,
        Ee,
        ue,
        null
      );
      if (ge = Ce[Ne.route.id], !ge) {
        for (let Qe of Z)
          if (Ce[Qe.route.id]) {
            ge = Ce[Qe.route.id];
            break;
          }
      }
      if (x.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (xn(ge)) {
      let Ee;
      return le && le.replace != null ? Ee = le.replace : Ee = sv(
        ge.response.headers.get("Location"),
        new URL(x.url),
        y,
        n.history
      ) === A.location.pathname + A.location.search, await Ma(x, ge, !0, {
        submission: j,
        replace: Ee
      }), { shortCircuited: !0 };
    }
    if (ca(ge)) {
      let Ee = Il(Z, Ne.route.id);
      return (le && le.replace) !== !0 && (Se = "PUSH"), {
        matches: Z,
        pendingActionResult: [
          Ee.route.id,
          ge,
          Ne.route.id
        ]
      };
    }
    return {
      matches: Z,
      pendingActionResult: [Ne.route.id, ge]
    };
  }
  async function qt(x, N, j, Z, K, ue, ae, ie, le, ye, ge, Ne, Ee, Ce) {
    let Qe = ae || mc(N, j, Z, ie), it = ie || le || mv(Qe), Je = !M && !ge;
    if (ue) {
      if (Je) {
        let lt = _l(Ee);
        dt(
          {
            navigation: Qe,
            ...lt !== void 0 ? { actionData: lt } : {}
          },
          {
            flushSync: Ne
          }
        );
      }
      let _e = await Ie(
        j,
        N.pathname,
        x.signal
      );
      if (_e.type === "aborted")
        return { shortCircuited: !0 };
      if (_e.type === "error") {
        if (_e.partialMatches.length === 0) {
          let { matches: aa, route: Ua } = ju(
            g.activeRoutes
          );
          return {
            matches: aa,
            loaderData: {},
            errors: {
              [Ua.id]: _e.error
            }
          };
        }
        let lt = Il(_e.partialMatches).route.id;
        return {
          matches: _e.partialMatches,
          loaderData: {},
          errors: {
            [lt]: _e.error
          }
        };
      } else if (_e.matches)
        j = _e.matches;
      else {
        let { error: lt, notFoundMatches: aa, route: Ua } = Zt(
          N.pathname
        );
        return {
          matches: aa,
          loaderData: {},
          errors: {
            [Ua.id]: lt
          }
        };
      }
    }
    let Xe = g.activeRoutes, { dsMatches: mt, revalidatingFetchers: Ve } = lv(
      x,
      K,
      d,
      m,
      n.history,
      A,
      j,
      it,
      N,
      ge ? [] : o,
      ge === !0,
      V,
      ne,
      oe,
      J,
      q,
      Xe,
      y,
      n.patchRoutesOnNavigation != null,
      g.branches,
      Ee,
      Ce
    );
    if (T = ++de, !n.dataStrategy && !mt.some((_e) => _e.shouldLoad) && !mt.some(
      (_e) => _e.route.middleware && _e.route.middleware.length > 0
    ) && Ve.length === 0) {
      let _e = new Map(A.fetchers), lt = wn(_e);
      return wt(
        N,
        {
          matches: j,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ee && ca(Ee[1]) ? { [Ee[0]]: Ee[1].error } : null,
          ...dv(Ee),
          ...lt ? { fetchers: _e } : {}
        },
        { flushSync: Ne }
      ), { shortCircuited: !0 };
    }
    if (Je) {
      let _e = {};
      if (!ue) {
        _e.navigation = Qe;
        let lt = _l(Ee);
        lt !== void 0 && (_e.actionData = lt);
      }
      Ve.length > 0 && (_e.fetchers = an(Ve)), dt(_e, { flushSync: Ne });
    }
    Ve.forEach((_e) => {
      ht(_e.key), _e.controller && re.set(_e.key, _e.controller);
    });
    let Nl = () => Ve.forEach((_e) => ht(_e.key));
    ve && ve.signal.addEventListener(
      "abort",
      Nl
    );
    let { loaderResults: ja, fetcherResults: kt } = await ln(
      mt,
      Ve,
      x,
      N,
      K
    );
    if (x.signal.aborted)
      return { shortCircuited: !0 };
    ve && ve.signal.removeEventListener(
      "abort",
      Nl
    ), Ve.forEach((_e) => re.delete(_e.key));
    let Xt = Ou(ja);
    if (Xt)
      return await Ma(x, Xt.result, !0, {
        replace: ye
      }), { shortCircuited: !0 };
    if (Xt = Ou(kt), Xt)
      return q.add(Xt.key), await Ma(x, Xt.result, !0, {
        replace: ye
      }), { shortCircuited: !0 };
    let ma = new Map(A.fetchers), { loaderData: Nn, errors: Oa } = cv(
      A,
      j,
      ja,
      Ee,
      Ve,
      kt,
      ma
    );
    ge && A.errors && (Oa = { ...A.errors, ...Oa });
    let An = wn(ma), ll = wl(
      T,
      ma
    ), nl = An || ll || Ve.length > 0;
    return {
      matches: j,
      loaderData: Nn,
      errors: Oa,
      ...nl ? { workingFetchers: ma } : {}
    };
  }
  function _l(x) {
    if (x && !ca(x[1]))
      return {
        [x[0]]: x[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function an(x) {
    let N = new Map(A.fetchers);
    return x.forEach((j) => {
      let Z = N.get(j.key), K = cr(
        void 0,
        Z ? Z.data : void 0
      );
      N.set(j.key, K);
    }), N;
  }
  async function At(x, N, j, Z) {
    ht(x);
    let K = (Z && Z.flushSync) === !0, ue = g.activeRoutes, ae = Tc(
      A.location,
      A.matches,
      y,
      j,
      N,
      Z?.relative
    ), ie = Ga(
      ue,
      ae,
      y,
      !1,
      g.branches
    ), le = ta(ie, ue, ae);
    if (le.active && le.matches && (ie = le.matches), !ie) {
      xt(
        x,
        N,
        Ta(404, { pathname: ae }),
        { flushSync: K }
      );
      return;
    }
    let { path: ye, submission: ge, error: Ne } = av(
      !0,
      ae,
      Z
    );
    if (Ne) {
      xt(x, N, Ne, { flushSync: K });
      return;
    }
    let Ee = n.getContext ? await n.getContext() : new $m(), Ce = (Z && Z.preventScrollReset) === !0;
    if (ge && Ht(ge.formMethod)) {
      await Qa(
        x,
        N,
        ye,
        ie,
        Ee,
        le.active,
        K,
        Ce,
        ge,
        Z && Z.defaultShouldRevalidate
      );
      return;
    }
    J.set(x, { routeId: N, path: ye }), await Mt(
      x,
      N,
      ye,
      ie,
      Ee,
      le.active,
      K,
      Ce,
      ge
    );
  }
  async function Qa(x, N, j, Z, K, ue, ae, ie, le, ye) {
    za(), J.delete(x);
    let ge = A.fetchers.get(x);
    Yt(x, pb(le, ge), {
      flushSync: ae
    });
    let Ne = new AbortController(), Ee = di(
      n.history,
      j,
      Ne.signal,
      le
    );
    if (ue) {
      let $e = await Ie(
        Z,
        new URL(Ee.url).pathname,
        Ee.signal,
        x
      );
      if ($e.type === "aborted")
        return;
      if ($e.type === "error") {
        xt(x, N, $e.error, { flushSync: ae });
        return;
      } else if ($e.matches)
        Z = $e.matches;
      else {
        xt(
          x,
          N,
          Ta(404, { pathname: j }),
          { flushSync: ae }
        );
        return;
      }
    }
    let Ce = qu(Z, j);
    if (!Ce.route.action && !Ce.route.lazy) {
      let $e = Ta(405, {
        method: le.formMethod,
        pathname: j,
        routeId: N
      });
      xt(x, N, $e, { flushSync: ae });
      return;
    }
    re.set(x, Ne);
    let Qe = de, it = vi(
      d,
      m,
      Ee,
      j,
      Z,
      Ce,
      o,
      K
    ), Je = await ea(
      Ee,
      j,
      it,
      K,
      x
    ), Xe = Je[Ce.route.id];
    if (!Xe) {
      for (let $e of it)
        if (Je[$e.route.id]) {
          Xe = Je[$e.route.id];
          break;
        }
    }
    if (Ee.signal.aborted) {
      re.get(x) === Ne && re.delete(x);
      return;
    }
    if (oe.has(x)) {
      if (xn(Xe) || ca(Xe)) {
        Yt(x, Pa(void 0));
        return;
      }
    } else {
      if (xn(Xe))
        if (re.delete(x), T > Qe) {
          Yt(x, Pa(void 0));
          return;
        } else
          return q.add(x), Yt(x, cr(le)), Ma(Ee, Xe, !1, {
            fetcherSubmission: le,
            preventScrollReset: ie
          });
      if (ca(Xe)) {
        xt(x, N, Xe.error);
        return;
      }
    }
    let mt = A.navigation.location || A.location, Ve = di(
      n.history,
      mt,
      Ne.signal
    ), Nl = g.activeRoutes, ja = A.navigation.state !== "idle" ? Ga(
      Nl,
      A.navigation.location,
      y,
      !1,
      g.branches
    ) : A.matches;
    ze(ja, "Didn't find any matches after fetcher action");
    let kt = ++de;
    H.set(x, kt);
    let { dsMatches: Xt, revalidatingFetchers: ma } = lv(
      Ve,
      K,
      d,
      m,
      n.history,
      A,
      ja,
      le,
      mt,
      o,
      !1,
      V,
      ne,
      oe,
      J,
      q,
      Nl,
      y,
      n.patchRoutesOnNavigation != null,
      g.branches,
      [Ce.route.id, Xe],
      ye
    ), Nn = cr(le, Xe.data), Oa = new Map(A.fetchers);
    Oa.set(x, Nn), ma.filter(($e) => $e.key !== x).forEach(($e) => {
      let il = $e.key, Vt = Oa.get(il), bi = cr(
        void 0,
        Vt ? Vt.data : void 0
      );
      Oa.set(il, bi), ht(il), $e.controller && re.set(il, $e.controller);
    }), dt({ fetchers: Oa });
    let An = () => ma.forEach(($e) => ht($e.key));
    Ne.signal.addEventListener(
      "abort",
      An
    );
    let { loaderResults: ll, fetcherResults: nl } = await ln(
      Xt,
      ma,
      Ve,
      mt,
      K
    );
    if (Ne.signal.aborted)
      return;
    Ne.signal.removeEventListener(
      "abort",
      An
    ), H.delete(x), re.delete(x), ma.forEach(($e) => re.delete($e.key));
    let _e = A.fetchers.has(x), lt = ($e) => {
      if (!_e) return $e;
      let il = new Map($e.fetchers);
      return il.set(x, Pa(Xe.data)), { ...$e, fetchers: il };
    }, aa = Ou(ll);
    if (aa)
      return A = lt(A), Ma(
        Ve,
        aa.result,
        !1,
        { preventScrollReset: ie }
      );
    if (aa = Ou(nl), aa)
      return q.add(aa.key), A = lt(A), Ma(
        Ve,
        aa.result,
        !1,
        { preventScrollReset: ie }
      );
    let Ua = new Map(A.fetchers);
    _e && Ua.set(x, Pa(Xe.data));
    let { loaderData: Mn, errors: zn } = cv(
      A,
      ja,
      ll,
      void 0,
      ma,
      nl,
      Ua
    );
    wl(kt, Ua), A.navigation.state === "loading" && kt > T ? (ze(Se, "Expected pending action"), ve && ve.abort(), wt(A.navigation.location, {
      matches: ja,
      loaderData: Mn,
      errors: zn,
      fetchers: Ua
    })) : (dt({
      errors: zn,
      loaderData: fv(
        A.loaderData,
        Mn,
        ja,
        zn
      ),
      fetchers: Ua
    }), V = !1);
  }
  async function Mt(x, N, j, Z, K, ue, ae, ie, le) {
    let ye = A.fetchers.get(x);
    Yt(
      x,
      cr(
        le,
        ye ? ye.data : void 0
      ),
      { flushSync: ae }
    );
    let ge = new AbortController(), Ne = di(
      n.history,
      j,
      ge.signal
    );
    if (ue) {
      let Xe = await Ie(
        Z,
        new URL(Ne.url).pathname,
        Ne.signal,
        x
      );
      if (Xe.type === "aborted")
        return;
      if (Xe.type === "error") {
        xt(x, N, Xe.error, { flushSync: ae });
        return;
      } else if (Xe.matches)
        Z = Xe.matches;
      else {
        xt(
          x,
          N,
          Ta(404, { pathname: j }),
          { flushSync: ae }
        );
        return;
      }
    }
    let Ee = qu(Z, j);
    re.set(x, ge);
    let Ce = de, Qe = vi(
      d,
      m,
      Ne,
      j,
      Z,
      Ee,
      o,
      K
    ), it = await ea(
      Ne,
      j,
      Qe,
      K,
      x
    ), Je = it[Ee.route.id];
    if (!Je) {
      for (let Xe of Z)
        if (it[Xe.route.id]) {
          Je = it[Xe.route.id];
          break;
        }
    }
    if (re.get(x) === ge && re.delete(x), !Ne.signal.aborted) {
      if (oe.has(x)) {
        Yt(x, Pa(void 0));
        return;
      }
      if (xn(Je))
        if (T > Ce) {
          Yt(x, Pa(void 0));
          return;
        } else {
          q.add(x), await Ma(Ne, Je, !1, {
            preventScrollReset: ie
          });
          return;
        }
      if (ca(Je)) {
        xt(x, N, Je.error);
        return;
      }
      Yt(x, Pa(Je.data));
    }
  }
  async function Ma(x, N, j, {
    submission: Z,
    fetcherSubmission: K,
    preventScrollReset: ue,
    replace: ae
  } = {}) {
    j || (ce?.resolve(), ce = null), N.response.headers.has("X-Remix-Revalidate") && (V = !0);
    let ie = N.response.headers.get("Location");
    ze(ie, "Expected a Location header on the redirect Response"), ie = sv(
      ie,
      new URL(x.url),
      y,
      n.history
    );
    let le = Rc(A.location, ie, {
      _isRedirect: !0
    });
    if (s) {
      let Qe = !1;
      if (N.response.headers.has("X-Remix-Reload-Document"))
        Qe = !0;
      else if (Bc(ie)) {
        const it = h0(r, ie, !0);
        Qe = // Hard reload if it's an absolute URL to a new origin
        it.origin !== r.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        wa(it.pathname, y) == null;
      }
      if (Qe) {
        ae ? r.location.replace(ie) : r.location.assign(ie);
        return;
      }
    }
    ve = null;
    let ye = ae === !0 || N.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: ge, formAction: Ne, formEncType: Ee } = A.navigation;
    !Z && !K && ge && Ne && Ee && (Z = mv(A.navigation));
    let Ce = Z || K;
    if (Z0.has(N.response.status) && Ce && Ht(Ce.formMethod))
      await Gt(ye, le, {
        submission: {
          ...Ce,
          formAction: ie
        },
        // Preserve these flags across redirects
        preventScrollReset: ue || Ue,
        enableViewTransition: j ? qe : void 0
      });
    else {
      let Qe = mc(
        le,
        [],
        ye,
        Z
      );
      await Gt(ye, le, {
        overrideNavigation: Qe,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: K,
        // Preserve these flags across redirects
        preventScrollReset: ue || Ue,
        enableViewTransition: j ? qe : void 0
      });
    }
  }
  async function ea(x, N, j, Z, K) {
    let ue, ae = {};
    try {
      ue = await ab(
        v,
        x,
        N,
        j,
        K,
        Z,
        !1
      );
    } catch (ie) {
      return j.filter((le) => le.shouldLoad).forEach((le) => {
        ae[le.route.id] = {
          type: "error",
          error: ie
        };
      }), ae;
    }
    if (x.signal.aborted)
      return ae;
    if (!Ht(x.method))
      for (let ie of j) {
        if (ue[ie.route.id]?.type === "error")
          break;
        !ue.hasOwnProperty(ie.route.id) && !A.loaderData.hasOwnProperty(ie.route.id) && (!A.errors || !A.errors.hasOwnProperty(ie.route.id)) && ie.shouldCallHandler() && (ue[ie.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ie.route.id}`
          )
        });
      }
    for (let [ie, le] of Object.entries(ue))
      if (hb(le)) {
        let ye = le.result;
        ae[ie] = {
          type: "redirect",
          response: rb(
            ye,
            x,
            ie,
            j,
            y
          )
        };
      } else
        ae[ie] = await ib(le);
    return ae;
  }
  async function ln(x, N, j, Z, K) {
    let ue = ea(
      j,
      Z,
      x,
      K,
      null
    ), ae = Promise.all(
      N.map(async (ye) => {
        if (ye.matches && ye.match && ye.request && ye.controller) {
          let Ne = (await ea(
            ye.request,
            ye.path,
            ye.matches,
            K,
            ye.key
          ))[ye.match.route.id];
          return { [ye.key]: Ne };
        } else
          return Promise.resolve({
            [ye.key]: {
              type: "error",
              error: Ta(404, {
                pathname: ye.path
              })
            }
          });
      })
    ), ie = await ue, le = (await ae).reduce(
      (ye, ge) => Object.assign(ye, ge),
      {}
    );
    return {
      loaderResults: ie,
      fetcherResults: le
    };
  }
  function za() {
    V = !0, J.forEach((x, N) => {
      re.has(N) && ne.add(N), ht(N);
    });
  }
  function Yt(x, N, j = {}) {
    let Z = new Map(A.fetchers);
    Z.set(x, N), dt(
      { fetchers: Z },
      { flushSync: (j && j.flushSync) === !0 }
    );
  }
  function xt(x, N, j, Z = {}) {
    let K = Il(A.matches, N), ue = new Map(A.fetchers);
    Da(ue, x), dt(
      {
        errors: {
          [K.route.id]: j
        },
        fetchers: ue
      },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function _n(x) {
    return ee.set(x, (ee.get(x) || 0) + 1), oe.has(x) && oe.delete(x), A.fetchers.get(x) || k0;
  }
  function Za(x, N) {
    ht(x, N?.reason), Yt(x, Pa(null));
  }
  function Da(x, N) {
    let j = A.fetchers.get(N);
    re.has(N) && !(j && j.state === "loading" && H.has(N)) && ht(N), J.delete(N), H.delete(N), q.delete(N), oe.delete(N), ne.delete(N), x.delete(N);
  }
  function zt(x) {
    let N = (ee.get(x) || 0) - 1;
    N <= 0 ? (ee.delete(x), oe.add(x)) : ee.set(x, N), dt({ fetchers: new Map(A.fetchers) });
  }
  function ht(x, N) {
    let j = re.get(x);
    j && (j.abort(N), re.delete(x));
  }
  function Rt(x, N) {
    for (let j of x) {
      let Z = N.get(j);
      ze(Z, `Expected fetcher: ${j}`);
      let K = Pa(Z.data);
      N.set(j, K);
    }
  }
  function wn(x) {
    let N = [], j = !1;
    for (let Z of q) {
      let K = x.get(Z);
      ze(K, `Expected fetcher: ${Z}`), K.state === "loading" && (q.delete(Z), N.push(Z), j = !0);
    }
    return Rt(N, x), j;
  }
  function wl(x, N) {
    let j = [];
    for (let [Z, K] of H)
      if (K < x) {
        let ue = N.get(Z);
        ze(ue, `Expected fetcher: ${Z}`), ue.state === "loading" && (ht(Z), H.delete(Z), j.push(Z));
      }
    return Rt(j, N), j.length > 0;
  }
  function ha(x, N) {
    let j = A.blockers.get(x) || or;
    return Re.get(x) !== N && Re.set(x, N), j;
  }
  function tl(x) {
    A.blockers.delete(x), Re.delete(x);
  }
  function Ca(x, N) {
    let j = A.blockers.get(x) || or;
    ze(
      j.state === "unblocked" && N.state === "blocked" || j.state === "blocked" && N.state === "blocked" || j.state === "blocked" && N.state === "proceeding" || j.state === "blocked" && N.state === "unblocked" || j.state === "proceeding" && N.state === "unblocked",
      `Invalid blocker state transition: ${j.state} -> ${N.state}`
    );
    let Z = new Map(A.blockers);
    Z.set(x, N), dt({ blockers: Z });
  }
  function ka({
    currentLocation: x,
    nextLocation: N,
    historyAction: j
  }) {
    if (Re.size === 0)
      return;
    Re.size > 1 && ft(!1, "A router only supports one blocker at a time");
    let Z = Array.from(Re.entries()), [K, ue] = Z[Z.length - 1], ae = A.blockers.get(K);
    if (!(ae && ae.state === "proceeding") && ue({ currentLocation: x, nextLocation: N, historyAction: j }))
      return K;
  }
  function Zt(x) {
    let N = Ta(404, { pathname: x }), j = g.activeRoutes, { matches: Z, route: K } = ju(j);
    return { notFoundMatches: Z, route: K, error: N };
  }
  function xe(x, N, j) {
    if (C = x, k = N, X = j || null, !$ && A.navigation === hc) {
      $ = !0;
      let Z = Tt(A.location, A.matches);
      Z != null && dt({ restoreScrollPosition: Z });
    }
    return () => {
      C = null, k = null, X = null;
    };
  }
  function at(x, N) {
    return X && X(
      x,
      N.map((Z) => b0(Z, A.loaderData))
    ) || x.key;
  }
  function gt(x, N) {
    if (C && k) {
      let j = at(x, N);
      C[j] = k();
    }
  }
  function Tt(x, N) {
    if (C) {
      let j = at(x, N), Z = C[j];
      if (typeof Z == "number")
        return Z;
    }
    return null;
  }
  function ta(x, N, j) {
    if (n.patchRoutesOnNavigation) {
      let Z = g.branches;
      if (x) {
        if (Object.keys(x[0].params).length > 0)
          return { active: !0, matches: Ga(
            N,
            j,
            y,
            !0,
            Z
          ) };
      } else
        return { active: !0, matches: Ga(
          N,
          j,
          y,
          !0,
          Z
        ) || [] };
    }
    return { active: !1, matches: null };
  }
  async function Ie(x, N, j, Z) {
    if (!n.patchRoutesOnNavigation)
      return { type: "success", matches: x };
    let K = x;
    for (; ; ) {
      let ue = m;
      try {
        await n.patchRoutesOnNavigation({
          signal: j,
          path: N,
          matches: K,
          fetcherKey: Z,
          patch: (ye, ge) => {
            j.aborted || nv(
              ye,
              ge,
              g,
              ue,
              d,
              !1
            );
          }
        });
      } catch (ye) {
        return { type: "error", error: ye, partialMatches: K };
      }
      if (j.aborted)
        return { type: "aborted" };
      let ae = g.branches, ie = Ga(
        g.activeRoutes,
        N,
        y,
        !1,
        ae
      ), le = null;
      if (ie) {
        if (Object.keys(ie[0].params).length === 0)
          return { type: "success", matches: ie };
        if (le = Ga(
          g.activeRoutes,
          N,
          y,
          !0,
          ae
        ), !(le && K.length < le.length && Dt(
          K,
          le.slice(0, K.length)
        )))
          return { type: "success", matches: ie };
      }
      if (le || (le = Ga(
        g.activeRoutes,
        N,
        y,
        !0,
        ae
      )), !le || Dt(K, le))
        return { type: "success", matches: null };
      K = le;
    }
  }
  function Dt(x, N) {
    return x.length === N.length && x.every((j, Z) => j.route.id === N[Z].route.id);
  }
  function al(x) {
    m = {}, g.setHmrRoutes(
      yr(
        x,
        d,
        void 0,
        m
      )
    );
  }
  function Lt(x, N, j = !1) {
    nv(
      x,
      N,
      g,
      m,
      d,
      j
    ), g.hasHMRRoutes || dt({});
  }
  return F = {
    get basename() {
      return y;
    },
    get future() {
      return S;
    },
    get state() {
      return A;
    },
    get routes() {
      return g.stableRoutes;
    },
    get branches() {
      return g.branches;
    },
    get manifest() {
      return m;
    },
    get window() {
      return r;
    },
    initialize: fa,
    subscribe: da,
    enableScrollRestoration: xe,
    navigate: Rl,
    fetch: At,
    revalidate: Tl,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (x) => n.history.createHref(x),
    encodeLocation: (x) => n.history.encodeLocation(x),
    getFetcher: _n,
    resetFetcher: Za,
    deleteFetcher: zt,
    dispose: Aa,
    getBlocker: ha,
    deleteBlocker: tl,
    patchRoutes: Lt,
    _internalFetchControllers: re,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: al,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(x) {
      dt(x);
    }
  }, n.instrumentations && (F = B0(
    F,
    n.instrumentations.map((x) => x.router).filter(Boolean)
  )), F;
}
function F0(n) {
  return n != null && ("formData" in n && n.formData != null || "body" in n && n.body !== void 0);
}
function Tc(n, r, s, o, f, d) {
  let m, g;
  if (f) {
    m = [];
    for (let v of r)
      if (m.push(v), v.route.id === f) {
        g = v;
        break;
      }
  } else
    m = r, g = r[r.length - 1];
  let y = $u(
    o || ".",
    Hc(m),
    wa(n.pathname, s) || n.pathname,
    d === "path"
  );
  if (o == null && (y.search = n.search, y.hash = n.hash), (o == null || o === "" || o === ".") && g) {
    let v = Xc(y.search);
    if (g.route.index && !v)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!g.route.index && v) {
      let S = new URLSearchParams(y.search), h = S.getAll("index");
      S.delete("index"), h.filter((_) => _).forEach((_) => S.append("index", _));
      let D = S.toString();
      y.search = D ? `?${D}` : "";
    }
  }
  return s !== "/" && (y.pathname = D0({ basename: s, pathname: y.pathname })), el(y);
}
function av(n, r, s) {
  if (!s || !F0(s))
    return { path: r };
  if (s.formMethod && !yb(s.formMethod))
    return {
      path: r,
      error: Ta(405, { method: s.formMethod })
    };
  let o = () => ({
    path: r,
    error: Ta(400, { type: "invalid-body" })
  }), d = (s.formMethod || "get").toUpperCase(), m = My(r);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!Ht(d))
        return o();
      let h = typeof s.body == "string" ? s.body : s.body instanceof FormData || s.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(s.body.entries()).reduce(
          (D, [_, C]) => `${D}${_}=${C}
`,
          ""
        )
      ) : String(s.body);
      return {
        path: r,
        submission: {
          formMethod: d,
          formAction: m,
          formEncType: s.formEncType,
          formData: void 0,
          json: void 0,
          text: h
        }
      };
    } else if (s.formEncType === "application/json") {
      if (!Ht(d))
        return o();
      try {
        let h = typeof s.body == "string" ? JSON.parse(s.body) : s.body;
        return {
          path: r,
          submission: {
            formMethod: d,
            formAction: m,
            formEncType: s.formEncType,
            formData: void 0,
            json: h,
            text: void 0
          }
        };
      } catch {
        return o();
      }
    }
  }
  ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let g, y;
  if (s.formData)
    g = Nc(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    g = Nc(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    g = s.body, y = ov(g);
  else if (s.body == null)
    g = new URLSearchParams(), y = new FormData();
  else
    try {
      g = new URLSearchParams(s.body), y = ov(g);
    } catch {
      return o();
    }
  let v = {
    formMethod: d,
    formAction: m,
    formEncType: s && s.formEncType || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0
  };
  if (Ht(v.formMethod))
    return { path: r, submission: v };
  let S = Ya(r);
  return n && S.search && Xc(S.search) && g.append("index", ""), S.search = `?${g}`, { path: el(S), submission: v };
}
function lv(n, r, s, o, f, d, m, g, y, v, S, h, D, _, C, X, k, $, P, I, pe, me) {
  let te = pe ? ca(pe[1]) ? pe[1].error : pe[1].data : void 0, F = f.createURL(d.location), A = f.createURL(y), Se;
  if (S && d.errors) {
    let M = Object.keys(d.errors)[0];
    Se = m.findIndex((V) => V.route.id === M);
  } else if (pe && ca(pe[1])) {
    let M = pe[0];
    Se = m.findIndex((V) => V.route.id === M) - 1;
  }
  let ce = pe ? pe[1].statusCode : void 0, Ue = ce && ce >= 400, ve = {
    currentUrl: F,
    currentParams: d.matches[0]?.params || {},
    nextUrl: A,
    nextParams: m[0].params,
    ...g,
    actionResult: te,
    actionStatus: ce
  }, qe = pr(m), De = m.map((M, V) => {
    let { route: ne } = M, re = null;
    if (Se != null && V > Se)
      re = !1;
    else if (ne.lazy)
      re = !0;
    else if (!qc(ne))
      re = !1;
    else if (S) {
      let { shouldLoad: q } = xy(
        ne,
        d.loaderData,
        d.errors
      );
      re = q;
    } else W0(d.loaderData, d.matches[V], M) && (re = !0);
    if (re !== null)
      return _c(
        s,
        o,
        n,
        y,
        qe,
        M,
        v,
        r,
        re
      );
    let de = !1;
    typeof me == "boolean" ? de = me : Ue ? de = !1 : (h || F.pathname + F.search === A.pathname + A.search || F.search !== A.search || I0(d.matches[V], M)) && (de = !0);
    let T = {
      ...ve,
      defaultShouldRevalidate: de
    }, H = mr(M, T);
    return _c(
      s,
      o,
      n,
      y,
      qe,
      M,
      v,
      r,
      H,
      T,
      me
    );
  }), Le = [];
  return C.forEach((M, V) => {
    if (S || !m.some((ee) => ee.route.id === M.routeId) || _.has(V))
      return;
    let ne = d.fetchers.get(V), re = ne && ne.state !== "idle" && ne.data === void 0, de = Ga(
      k,
      M.path,
      $ ?? "/",
      !1,
      I
    );
    if (!de) {
      if (P && re)
        return;
      Le.push({
        key: V,
        routeId: M.routeId,
        path: M.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (X.has(V))
      return;
    let T = qu(de, M.path), H = new AbortController(), q = di(
      f,
      M.path,
      H.signal
    ), J = null;
    if (D.has(V))
      D.delete(V), J = vi(
        s,
        o,
        q,
        M.path,
        de,
        T,
        v,
        r
      );
    else if (re)
      h && (J = vi(
        s,
        o,
        q,
        M.path,
        de,
        T,
        v,
        r
      ));
    else {
      let ee;
      typeof me == "boolean" ? ee = me : Ue ? ee = !1 : ee = h;
      let oe = {
        ...ve,
        defaultShouldRevalidate: ee
      };
      mr(T, oe) && (J = vi(
        s,
        o,
        q,
        M.path,
        de,
        T,
        v,
        r,
        oe
      ));
    }
    J && Le.push({
      key: V,
      routeId: M.routeId,
      path: M.path,
      matches: J,
      match: T,
      request: q,
      controller: H
    });
  }), { dsMatches: De, revalidatingFetchers: Le };
}
function qc(n) {
  return n.loader != null || n.middleware != null && n.middleware.length > 0;
}
function xy(n, r, s) {
  if (n.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!qc(n))
    return { shouldLoad: !1, renderFallback: !1 };
  let o = r != null && n.id in r, f = s != null && s[n.id] !== void 0;
  if (!o && f)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof n.loader == "function" && n.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !o };
  let d = !o && !f;
  return { shouldLoad: d, renderFallback: d };
}
function W0(n, r, s) {
  let o = (
    // [a] -> [a, b]
    !r || // [a, b] -> [a, c]
    s.route.id !== r.route.id
  ), f = !n.hasOwnProperty(s.route.id);
  return o || f;
}
function I0(n, r) {
  let s = n.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    n.pathname !== r.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && n.params["*"] !== r.params["*"]
  );
}
function mr(n, r) {
  if (n.route.shouldRevalidate) {
    let s = n.route.shouldRevalidate(r);
    if (typeof s == "boolean")
      return s;
  }
  return r.defaultShouldRevalidate;
}
function nv(n, r, s, o, f, d) {
  let m;
  if (n) {
    let v = o[n];
    ze(
      v,
      `No route found to patch children into: routeId = ${n}`
    ), v.children || (v.children = []), m = v.children;
  } else
    m = s.activeRoutes;
  let g = [], y = [];
  if (r.forEach((v) => {
    let S = m.find(
      (h) => Ry(v, h)
    );
    S ? y.push({ existingRoute: S, newRoute: v }) : g.push(v);
  }), g.length > 0) {
    let v = yr(
      g,
      f,
      [n || "_", "patch", String(m?.length || "0")],
      o
    );
    m.push(...v);
  }
  if (d && y.length > 0)
    for (let v = 0; v < y.length; v++) {
      let { existingRoute: S, newRoute: h } = y[v], D = S, [_] = yr(
        [h],
        f,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(D, {
        element: _.element ? _.element : D.element,
        errorElement: _.errorElement ? _.errorElement : D.errorElement,
        hydrateFallbackElement: _.hydrateFallbackElement ? _.hydrateFallbackElement : D.hydrateFallbackElement
      });
    }
  s.hasHMRRoutes || s.setRoutes([...s.activeRoutes]);
}
function Ry(n, r) {
  return "id" in n && "id" in r && n.id === r.id ? !0 : n.index === r.index && n.path === r.path && n.caseSensitive === r.caseSensitive ? (!n.children || n.children.length === 0) && (!r.children || r.children.length === 0) ? !0 : n.children?.every(
    (s, o) => r.children?.some((f) => Ry(s, f))
  ) ?? !1 : !1;
}
var iv = /* @__PURE__ */ new WeakMap(), Ty = ({
  key: n,
  route: r,
  manifest: s,
  mapRouteProperties: o
}) => {
  let f = s[r.id];
  if (ze(f, "No route found in manifest"), !f.lazy || typeof f.lazy != "object")
    return;
  let d = f.lazy[n];
  if (!d)
    return;
  let m = iv.get(f);
  m || (m = {}, iv.set(f, m));
  let g = m[n];
  if (g)
    return g;
  let y = (async () => {
    let v = v0(n), h = f[n] !== void 0 && n !== "hasErrorBoundary";
    if (v)
      ft(
        !v,
        "Route property " + n + " is not a supported lazy route property. This property will be ignored."
      ), m[n] = Promise.resolve();
    else if (h)
      ft(
        !1,
        `Route "${f.id}" has a static property "${n}" defined. The lazy property will be ignored.`
      );
    else {
      let D = await d();
      D != null && (Object.assign(f, { [n]: D }), Object.assign(f, o(f)));
    }
    typeof f.lazy == "object" && (f.lazy[n] = void 0, Object.values(f.lazy).every((D) => D === void 0) && (f.lazy = void 0));
  })();
  return m[n] = y, y;
}, rv = /* @__PURE__ */ new WeakMap();
function P0(n, r, s, o, f) {
  let d = s[n.id];
  if (ze(d, "No route found in manifest"), !n.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof n.lazy == "function") {
    let S = rv.get(d);
    if (S)
      return {
        lazyRoutePromise: S,
        lazyHandlerPromise: S
      };
    let h = (async () => {
      ze(
        typeof n.lazy == "function",
        "No lazy route function found"
      );
      let D = await n.lazy(), _ = {};
      for (let C in D) {
        let X = D[C];
        if (X === void 0)
          continue;
        let k = g0(C), P = d[C] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        C !== "hasErrorBoundary";
        k ? ft(
          !k,
          "Route property " + C + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : P ? ft(
          !P,
          `Route "${d.id}" has a static property "${C}" defined but its lazy function is also returning a value for this property. The lazy route property "${C}" will be ignored.`
        ) : _[C] = X;
      }
      Object.assign(d, _), Object.assign(d, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...o(d),
        lazy: void 0
      });
    })();
    return rv.set(d, h), h.catch(() => {
    }), {
      lazyRoutePromise: h,
      lazyHandlerPromise: h
    };
  }
  let m = Object.keys(n.lazy), g = [], y;
  for (let S of m) {
    if (f && f.includes(S))
      continue;
    let h = Ty({
      key: S,
      route: n,
      manifest: s,
      mapRouteProperties: o
    });
    h && (g.push(h), S === r && (y = h));
  }
  let v = g.length > 0 ? Promise.all(g).then(() => {
  }) : void 0;
  return v?.catch(() => {
  }), y?.catch(() => {
  }), {
    lazyRoutePromise: v,
    lazyHandlerPromise: y
  };
}
async function uv(n) {
  let r = n.matches.filter((f) => f.shouldLoad), s = {};
  return (await Promise.all(r.map((f) => f.resolve()))).forEach((f, d) => {
    s[r[d].route.id] = f;
  }), s;
}
async function eb(n) {
  return n.matches.some((r) => r.route.middleware) ? _y(n, () => uv(n)) : uv(n);
}
function _y(n, r) {
  return tb(
    n,
    r,
    (o) => {
      if (vb(o))
        throw o;
      return o;
    },
    fb,
    s
  );
  function s(o, f, d) {
    if (d)
      return Promise.resolve(
        Object.assign(d.value, {
          [f]: { type: "error", result: o }
        })
      );
    {
      let { matches: m } = n, g = Math.min(
        // Throwing route
        Math.max(
          m.findIndex((v) => v.route.id === f),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          m.findIndex((v) => v.shouldCallHandler()),
          0
        )
      ), y = Il(
        m,
        m[g].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: o }
      });
    }
  }
}
async function tb(n, r, s, o, f) {
  let { matches: d, ...m } = n, g = d.flatMap(
    (v) => v.route.middleware ? v.route.middleware.map((S) => [v.route.id, S]) : []
  );
  return await wy(
    m,
    g,
    r,
    s,
    o,
    f
  );
}
async function wy(n, r, s, o, f, d, m = 0) {
  let { request: g } = n;
  if (g.signal.aborted)
    throw g.signal.reason ?? new Error(`Request aborted: ${g.method} ${g.url}`);
  let y = r[m];
  if (!y)
    return await s();
  let [v, S] = y, h, D = async () => {
    if (h)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return h = { value: await wy(
        n,
        r,
        s,
        o,
        f,
        d,
        m + 1
      ) }, h.value;
    } catch (_) {
      return h = { value: await d(_, v, h) }, h.value;
    }
  };
  try {
    let _ = await S(n, D), C = _ != null ? o(_) : void 0;
    return f(C) ? C : h ? C ?? h.value : (h = { value: await D() }, h.value);
  } catch (_) {
    return await d(_, v, h);
  }
}
function Ny(n, r, s, o, f) {
  let d = Ty({
    key: "middleware",
    route: o.route,
    manifest: r,
    mapRouteProperties: n
  }), m = P0(
    o.route,
    Ht(s.method) ? "action" : "loader",
    r,
    n,
    f
  );
  return {
    middleware: d,
    route: m.lazyRoutePromise,
    handler: m.lazyHandlerPromise
  };
}
function _c(n, r, s, o, f, d, m, g, y, v = null, S) {
  let h = !1, D = Ny(
    n,
    r,
    s,
    d,
    m
  );
  return {
    ...d,
    _lazyPromises: D,
    shouldLoad: y,
    shouldRevalidateArgs: v,
    shouldCallHandler(_) {
      return h = !0, v ? typeof S == "boolean" ? mr(d, {
        ...v,
        defaultShouldRevalidate: S
      }) : typeof _ == "boolean" ? mr(d, {
        ...v,
        defaultShouldRevalidate: _
      }) : mr(d, v) : y;
    },
    resolve(_) {
      let { lazy: C, loader: X, middleware: k } = d.route, $ = h || y || _ && !Ht(s.method) && (C || X), P = k && k.length > 0 && !X && !C;
      return $ && (Ht(s.method) || !P) ? lb({
        request: s,
        path: o,
        pattern: f,
        match: d,
        lazyHandlerPromise: D?.handler,
        lazyRoutePromise: D?.route,
        handlerOverride: _,
        scopedContext: g
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function vi(n, r, s, o, f, d, m, g, y = null) {
  return f.map((v) => v.route.id !== d.route.id ? {
    ...v,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: Ny(
      n,
      r,
      s,
      v,
      m
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : _c(
    n,
    r,
    s,
    o,
    pr(f),
    v,
    m,
    g,
    !0,
    y
  ));
}
async function ab(n, r, s, o, f, d, m) {
  o.some((S) => S._lazyPromises?.middleware) && await Promise.all(o.map((S) => S._lazyPromises?.middleware));
  let g = {
    request: r,
    url: Ay(r, s),
    pattern: pr(o),
    params: o[0].params,
    context: d,
    matches: o
  }, v = await n({
    ...g,
    fetcherKey: f,
    runClientMiddleware: (S) => {
      let h = g;
      return _y(h, () => S({
        ...h,
        fetcherKey: f,
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
      o.flatMap((S) => [
        S._lazyPromises?.handler,
        S._lazyPromises?.route
      ])
    );
  } catch {
  }
  return v;
}
async function lb({
  request: n,
  path: r,
  pattern: s,
  match: o,
  lazyHandlerPromise: f,
  lazyRoutePromise: d,
  handlerOverride: m,
  scopedContext: g
}) {
  let y, v, S = Ht(n.method), h = S ? "action" : "loader", D = (_) => {
    let C, X = new Promise((P, I) => C = I);
    v = () => C(), n.signal.addEventListener("abort", v);
    let k = (P) => typeof _ != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${h}" [routeId: ${o.route.id}]`
      )
    ) : _(
      {
        request: n,
        url: Ay(n, r),
        pattern: s,
        params: o.params,
        context: g
      },
      ...P !== void 0 ? [P] : []
    ), $ = (async () => {
      try {
        return { type: "data", result: await (m ? m((I) => k(I)) : k()) };
      } catch (P) {
        return { type: "error", result: P };
      }
    })();
    return Promise.race([$, X]);
  };
  try {
    let _ = S ? o.route.action : o.route.loader;
    if (f || d)
      if (_) {
        let C, [X] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          D(_).catch((k) => {
            C = k;
          }),
          // Ensure all lazy route promises are resolved before continuing
          f,
          d
        ]);
        if (C !== void 0)
          throw C;
        y = X;
      } else {
        await f;
        let C = S ? o.route.action : o.route.loader;
        if (C)
          [y] = await Promise.all([D(C), d]);
        else if (h === "action") {
          let X = new URL(n.url), k = X.pathname + X.search;
          throw Ta(405, {
            method: n.method,
            pathname: k,
            routeId: o.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (_)
      y = await D(_);
    else {
      let C = new URL(n.url), X = C.pathname + C.search;
      throw Ta(404, {
        pathname: X
      });
    }
  } catch (_) {
    return { type: "error", result: _ };
  } finally {
    v && n.signal.removeEventListener("abort", v);
  }
  return y;
}
async function nb(n) {
  let r = n.headers.get("Content-Type");
  return r && /\bapplication\/json\b/.test(r) ? n.body == null ? null : n.json() : n.text();
}
async function ib(n) {
  let { result: r, type: s } = n;
  if (Yc(r)) {
    let o;
    try {
      o = await nb(r);
    } catch (f) {
      return { type: "error", error: f };
    }
    return s === "error" ? {
      type: "error",
      error: new Fu(r.status, r.statusText, o),
      statusCode: r.status,
      headers: r.headers
    } : {
      type: "data",
      data: o,
      statusCode: r.status,
      headers: r.headers
    };
  }
  return s === "error" ? hv(r) ? r.data instanceof Error ? {
    type: "error",
    error: r.data,
    statusCode: r.init?.status,
    headers: r.init?.headers ? new Headers(r.init.headers) : void 0
  } : {
    type: "error",
    error: cb(r),
    statusCode: gr(r) ? r.status : void 0,
    headers: r.init?.headers ? new Headers(r.init.headers) : void 0
  } : {
    type: "error",
    error: r,
    statusCode: gr(r) ? r.status : void 0
  } : hv(r) ? {
    type: "data",
    data: r.data,
    statusCode: r.init?.status,
    headers: r.init?.headers ? new Headers(r.init.headers) : void 0
  } : { type: "data", data: r };
}
function rb(n, r, s, o, f) {
  let d = n.headers.get("Location");
  if (ze(
    d,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Bc(d)) {
    let m = o.slice(
      0,
      o.findIndex((g) => g.route.id === s) + 1
    );
    d = Tc(
      new URL(r.url),
      m,
      f,
      d
    ), n.headers.set("Location", d);
  }
  return n;
}
var ub = [
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
function wc(n) {
  try {
    return ub.includes(new URL(n).protocol);
  } catch {
    return !1;
  }
}
function sv(n, r, s, o) {
  if (Bc(n)) {
    let f = n, d = Lc.test(f) ? new URL(
      sy(f, r.protocol)
    ) : new URL(f);
    if (wc(d.toString()))
      throw new Error("Invalid redirect location");
    let m = wa(d.pathname, s) != null;
    if (d.origin === r.origin && m)
      return Gc(d.pathname) + d.search + d.hash;
  }
  try {
    let f = o.createURL(n);
    if (wc(f.toString()))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return n;
}
function di(n, r, s, o) {
  let f = n.createURL(My(r)).toString(), d = { signal: s };
  if (o && Ht(o.formMethod)) {
    let { formMethod: m, formEncType: g } = o;
    d.method = m.toUpperCase(), g === "application/json" ? (d.headers = new Headers({ "Content-Type": g }), d.body = JSON.stringify(o.json)) : g === "text/plain" ? d.body = o.text : g === "application/x-www-form-urlencoded" && o.formData ? d.body = Nc(o.formData) : d.body = o.formData;
  }
  return new Request(f, d);
}
function Ay(n, r) {
  let s = new URL(n.url), o = typeof r == "string" ? Ya(r) : r;
  if (s.pathname = o.pathname || "/", o.search) {
    let f = new URLSearchParams(o.search), d = f.getAll("index");
    f.delete("index");
    for (let m of d.filter(Boolean))
      f.append("index", m);
    s.search = f.size ? `?${f.toString()}` : "";
  } else
    s.search = "";
  return s.hash = o.hash || "", s;
}
function Nc(n) {
  let r = new URLSearchParams();
  for (let [s, o] of n.entries())
    r.append(s, typeof o == "string" ? o : o.name);
  return r;
}
function ov(n) {
  let r = new FormData();
  for (let [s, o] of n.entries())
    r.append(s, o);
  return r;
}
function sb(n, r, s, o = !1, f = !1) {
  let d = {}, m = null, g, y = !1, v = {}, S = s && ca(s[1]) ? s[1].error : void 0;
  return n.forEach((h) => {
    if (!(h.route.id in r))
      return;
    let D = h.route.id, _ = r[D];
    if (ze(
      !xn(_),
      "Cannot handle redirect results in processLoaderData"
    ), ca(_)) {
      let C = _.error;
      if (S !== void 0 && (C = S, S = void 0), m = m || {}, f)
        m[D] = C;
      else {
        let X = Il(n, D);
        m[X.route.id] == null && (m[X.route.id] = C);
      }
      o || (d[D] = Ey), y || (y = !0, g = gr(_.error) ? _.error.status : 500), _.headers && (v[D] = _.headers);
    } else
      d[D] = _.data, _.statusCode && _.statusCode !== 200 && !y && (g = _.statusCode), _.headers && (v[D] = _.headers);
  }), S !== void 0 && s && (m = { [s[0]]: S }, s[2] && (d[s[2]] = void 0)), {
    loaderData: d,
    errors: m,
    statusCode: g || 200,
    loaderHeaders: v
  };
}
function cv(n, r, s, o, f, d, m) {
  let { loaderData: g, errors: y } = sb(
    r,
    s,
    o
  );
  return f.filter((v) => !v.matches || v.matches.some((S) => S.shouldLoad)).forEach((v) => {
    let { key: S, match: h, controller: D } = v;
    if (D && D.signal.aborted)
      return;
    let _ = d[S];
    if (ze(_, "Did not find corresponding fetcher result"), ca(_)) {
      let C = Il(n.matches, h?.route.id);
      y && y[C.route.id] || (y = {
        ...y,
        [C.route.id]: _.error
      }), m.delete(S);
    } else if (xn(_))
      ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let C = Pa(_.data);
      m.set(S, C);
    }
  }), { loaderData: g, errors: y };
}
function fv(n, r, s, o) {
  let f = Object.entries(r).filter(([, d]) => d !== Ey).reduce((d, [m, g]) => (d[m] = g, d), {});
  for (let d of s) {
    let m = d.route.id;
    if (!r.hasOwnProperty(m) && n.hasOwnProperty(m) && d.route.loader && (f[m] = n[m]), o && o.hasOwnProperty(m))
      break;
  }
  return f;
}
function dv(n) {
  return n ? ca(n[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [n[0]]: n[1].data
    }
  } : {};
}
function Il(n, r) {
  return (r ? n.slice(0, n.findIndex((o) => o.route.id === r) + 1) : [...n]).reverse().find((o) => o.route.hasErrorBoundary === !0) || n[0];
}
function ju(n) {
  let r = n.length === 1 ? n[0] : n.find((s) => s.index || !s.path || s.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route: r
      }
    ],
    route: r
  };
}
function Ta(n, {
  pathname: r,
  routeId: s,
  method: o,
  type: f,
  message: d
} = {}) {
  let m = "Unknown Server Error", g = "Unknown @remix-run/router error";
  return n === 400 ? (m = "Bad Request", o && r && s ? g = `You made a ${o} request to "${r}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : f === "invalid-body" && (g = "Unable to encode submission body")) : n === 403 ? (m = "Forbidden", g = `Route "${s}" does not match URL "${r}"`) : n === 404 ? (m = "Not Found", g = `No route matches URL "${r}"`) : n === 405 && (m = "Method Not Allowed", o && r && s ? g = `You made a ${o.toUpperCase()} request to "${r}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : o && (g = `Invalid request method "${o.toUpperCase()}"`)), new Fu(
    n || 500,
    m,
    new Error(g),
    !0
  );
}
function Ou(n) {
  let r = Object.entries(n);
  for (let s = r.length - 1; s >= 0; s--) {
    let [o, f] = r[s];
    if (xn(f))
      return { key: o, result: f };
  }
}
function My(n) {
  let r = typeof n == "string" ? Ya(n) : n;
  return el({ ...r, hash: "" });
}
function ob(n, r) {
  return n.pathname !== r.pathname || n.search !== r.search ? !1 : n.hash === "" ? r.hash !== "" : n.hash === r.hash ? !0 : r.hash !== "";
}
function cb(n) {
  return new Fu(
    n.init?.status ?? 500,
    n.init?.statusText ?? "Internal Server Error",
    n.data
  );
}
function fb(n) {
  return n != null && typeof n == "object" && Object.entries(n).every(
    ([r, s]) => typeof r == "string" && db(s)
  );
}
function db(n) {
  return n != null && typeof n == "object" && "type" in n && "result" in n && (n.type === "data" || n.type === "error");
}
function hb(n) {
  return Yc(n.result) && by.has(n.result.status);
}
function ca(n) {
  return n.type === "error";
}
function xn(n) {
  return (n && n.type) === "redirect";
}
function hv(n) {
  return typeof n == "object" && n != null && "type" in n && "data" in n && "init" in n && n.type === "DataWithResponseInit";
}
function Yc(n) {
  return n != null && typeof n.status == "number" && typeof n.statusText == "string" && typeof n.headers == "object" && typeof n.body < "u";
}
function mb(n) {
  return by.has(n);
}
function vb(n) {
  return Yc(n) && mb(n.status) && n.headers.has("Location");
}
function yb(n) {
  return Q0.has(n.toUpperCase());
}
function Ht(n) {
  return X0.has(n.toUpperCase());
}
function Xc(n) {
  return new URLSearchParams(n).getAll("index").some((r) => r === "");
}
function qu(n, r) {
  let s = typeof r == "string" ? Ya(r).search : r.search;
  if (n[n.length - 1].route.index && Xc(s || ""))
    return n[n.length - 1];
  let o = my(n);
  return o[o.length - 1];
}
function mv(n) {
  let { formMethod: r, formAction: s, formEncType: o, text: f, formData: d, json: m } = n;
  if (!(!r || !s || !o)) {
    if (f != null)
      return {
        formMethod: r,
        formAction: s,
        formEncType: o,
        formData: void 0,
        json: void 0,
        text: f
      };
    if (d != null)
      return {
        formMethod: r,
        formAction: s,
        formEncType: o,
        formData: d,
        json: void 0,
        text: void 0
      };
    if (m !== void 0)
      return {
        formMethod: r,
        formAction: s,
        formEncType: o,
        formData: void 0,
        json: m,
        text: void 0
      };
  }
}
function mc(n, r, s, o) {
  return o ? {
    state: "loading",
    location: n,
    matches: r,
    historyAction: s,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
  } : {
    state: "loading",
    location: n,
    matches: r,
    historyAction: s,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function gb(n, r, s, o) {
  return {
    state: "submitting",
    location: n,
    matches: r,
    historyAction: s,
    formMethod: o.formMethod,
    formAction: o.formAction,
    formEncType: o.formEncType,
    formData: o.formData,
    json: o.json,
    text: o.text
  };
}
function cr(n, r) {
  return n ? {
    state: "loading",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
    data: r
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: r
  };
}
function pb(n, r) {
  return {
    state: "submitting",
    formMethod: n.formMethod,
    formAction: n.formAction,
    formEncType: n.formEncType,
    formData: n.formData,
    json: n.json,
    text: n.text,
    data: r ? r.data : void 0
  };
}
function Pa(n) {
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
function bb(n, r) {
  try {
    let s = n.sessionStorage.getItem(
      Sy
    );
    if (s) {
      let o = JSON.parse(s);
      for (let [f, d] of Object.entries(o || {}))
        d && Array.isArray(d) && r.set(f, new Set(d || []));
    }
  } catch {
  }
}
function Sb(n, r) {
  if (r.size > 0) {
    let s = {};
    for (let [o, f] of r)
      s[o] = [...f];
    try {
      n.sessionStorage.setItem(
        Sy,
        JSON.stringify(s)
      );
    } catch (o) {
      ft(
        !1,
        `Failed to save applied view transitions in sessionStorage (${o}).`
      );
    }
  }
}
function vv() {
  let n, r, s = new Promise((o, f) => {
    n = async (d) => {
      o(d);
      try {
        await s;
      } catch {
      }
    }, r = async (d) => {
      f(d);
      try {
        await s;
      } catch {
      }
    };
  });
  return {
    promise: s,
    //@ts-ignore
    resolve: n,
    //@ts-ignore
    reject: r
  };
}
var Rn = E.createContext(null);
Rn.displayName = "DataRouter";
var br = E.createContext(null);
br.displayName = "DataRouterState";
var zy = E.createContext(!1);
function Dy() {
  return E.useContext(zy);
}
var Vc = E.createContext({
  isTransitioning: !1
});
Vc.displayName = "ViewTransition";
var Cy = E.createContext(
  /* @__PURE__ */ new Map()
);
Cy.displayName = "Fetchers";
var Eb = E.createContext(null);
Eb.displayName = "Await";
var Na = E.createContext(
  null
);
Na.displayName = "Navigation";
var Wu = E.createContext(
  null
);
Wu.displayName = "Location";
var Xa = E.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Xa.displayName = "Route";
var Qc = E.createContext(null);
Qc.displayName = "RouteError";
var jy = "REACT_ROUTER_ERROR", xb = "REDIRECT", Rb = "ROUTE_ERROR_RESPONSE";
function Tb(n) {
  if (n.startsWith(`${jy}:${xb}:{`))
    try {
      let r = JSON.parse(n.slice(28));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string" && typeof r.location == "string" && typeof r.reloadDocument == "boolean" && typeof r.replace == "boolean")
        return r;
    } catch {
    }
}
function _b(n) {
  if (n.startsWith(
    `${jy}:${Rb}:{`
  ))
    try {
      let r = JSON.parse(n.slice(40));
      if (typeof r == "object" && r && typeof r.status == "number" && typeof r.statusText == "string")
        return new Fu(
          r.status,
          r.statusText,
          r.data
        );
    } catch {
    }
}
function wb(n, { relative: r } = {}) {
  ze(
    Sr(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: o } = E.useContext(Na), { hash: f, pathname: d, search: m } = Er(n, { relative: r }), g = d;
  return s !== "/" && (g = d === "/" ? s : _a([s, d])), o.createHref({ pathname: g, search: m, hash: f });
}
function Sr() {
  return E.useContext(Wu) != null;
}
function Va() {
  return ze(
    Sr(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), E.useContext(Wu).location;
}
var Oy = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Uy(n) {
  E.useContext(Na).static || E.useLayoutEffect(n);
}
function Zc() {
  let { isDataRoute: n } = E.useContext(Xa);
  return n ? Xb() : Nb();
}
function Nb() {
  ze(
    Sr(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let n = E.useContext(Rn), { basename: r, navigator: s } = E.useContext(Na), { matches: o } = E.useContext(Xa), { pathname: f } = Va(), d = JSON.stringify(Hc(o)), m = E.useRef(!1);
  return Uy(() => {
    m.current = !0;
  }), E.useCallback(
    (y, v = {}) => {
      if (ft(m.current, Oy), !m.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let S = $u(
        y,
        JSON.parse(d),
        f,
        v.relative === "path"
      );
      n == null && r !== "/" && (S.pathname = S.pathname === "/" ? r : _a([r, S.pathname])), (v.replace ? s.replace : s.push)(
        S,
        v.state,
        v
      );
    },
    [
      r,
      s,
      d,
      f,
      n
    ]
  );
}
var Ab = E.createContext(null);
function Mb(n) {
  let r = E.useContext(Xa).outlet;
  return E.useMemo(
    () => r && /* @__PURE__ */ E.createElement(Ab.Provider, { value: n }, r),
    [r, n]
  );
}
function zb() {
  let { matches: n } = E.useContext(Xa);
  return n[n.length - 1]?.params ?? {};
}
function Er(n, { relative: r } = {}) {
  let { matches: s } = E.useContext(Xa), { pathname: o } = Va(), f = JSON.stringify(Hc(s));
  return E.useMemo(
    () => $u(
      n,
      JSON.parse(f),
      o,
      r === "path"
    ),
    [n, f, o, r]
  );
}
function Db(n, r, s) {
  ze(
    Sr(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: o } = E.useContext(Na), { matches: f } = E.useContext(Xa), d = f[f.length - 1], m = d ? d.params : {}, g = d ? d.pathname : "/", y = d ? d.pathnameBase : "/", v = d && d.route;
  {
    let k = v && v.path || "";
    By(
      g,
      !v || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k === "/" ? "*" : `${k}/*`}">.`
    );
  }
  let S = Va(), h;
  h = S;
  let D = h.pathname || "/", _ = D;
  if (y !== "/") {
    let k = y.replace(/^\//, "").split("/");
    _ = "/" + D.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let C = s && s.state.matches.length ? (
    // If we're in a data router, use the matches we've already identified but ensure
    // we have the latest route instances from the manifest in case elements have changed
    s.state.matches.map(
      (k) => Object.assign(k, {
        route: s.manifest[k.route.id] || k.route
      })
    )
  ) : oy(n, { pathname: _ });
  return ft(
    v || C != null,
    `No routes matched location "${h.pathname}${h.search}${h.hash}" `
  ), ft(
    C == null || C[C.length - 1].route.element !== void 0 || C[C.length - 1].route.Component !== void 0 || C[C.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${h.pathname}${h.search}${h.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), Lb(
    C && C.map(
      (k) => Object.assign({}, k, {
        params: Object.assign({}, m, k.params),
        pathname: _a([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            k.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : k.pathname
        ]),
        pathnameBase: k.pathnameBase === "/" ? y : _a([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          o.encodeLocation ? o.encodeLocation(
            k.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : k.pathnameBase
        ])
      })
    ),
    f,
    s
  );
}
function Cb() {
  let n = Yb(), r = gr(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n), s = n instanceof Error ? n.stack : null, o = "rgba(200,200,200, 0.5)", f = { padding: "0.5rem", backgroundColor: o }, d = { padding: "2px 4px", backgroundColor: o }, m = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    n
  ), m = /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ E.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ E.createElement("code", { style: d }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ E.createElement("code", { style: d }, "errorElement"), " prop on your route.")), /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ E.createElement("h3", { style: { fontStyle: "italic" } }, r), s ? /* @__PURE__ */ E.createElement("pre", { style: f }, s) : null, m);
}
var jb = /* @__PURE__ */ E.createElement(Cb, null), Ly = class extends E.Component {
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
  static getDerivedStateFromProps(n, r) {
    return r.location !== n.location || r.revalidation !== "idle" && n.revalidation === "idle" ? {
      error: n.error,
      location: n.location,
      revalidation: n.revalidation
    } : {
      error: n.error !== void 0 ? n.error : r.error,
      location: r.location,
      revalidation: n.revalidation || r.revalidation
    };
  }
  componentDidCatch(n, r) {
    this.props.onError ? this.props.onError(n, r) : console.error(
      "React Router caught the following error during render",
      n
    );
  }
  render() {
    let n = this.state.error;
    if (this.context && typeof n == "object" && n && "digest" in n && typeof n.digest == "string") {
      const s = _b(n.digest);
      s && (n = s);
    }
    let r = n !== void 0 ? /* @__PURE__ */ E.createElement(Xa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ E.createElement(
      Qc.Provider,
      {
        value: n,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ E.createElement(Ob, { error: n }, r) : r;
  }
};
Ly.contextType = zy;
var vc = /* @__PURE__ */ new WeakMap();
function Ob({
  children: n,
  error: r
}) {
  let { basename: s } = E.useContext(Na);
  if (typeof r == "object" && r && "digest" in r && typeof r.digest == "string") {
    let o = Tb(r.digest);
    if (o) {
      let f = vc.get(r);
      if (f) throw f;
      let d = yy(o.location, s), m = d.absoluteURL || d.to;
      if (wc(m))
        throw new Error("Invalid redirect location");
      if (vy && !vc.get(r))
        if (d.isExternal || o.reloadDocument)
          window.location.href = m;
        else {
          const g = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(d.to, {
              replace: o.replace
            })
          );
          throw vc.set(r, g), g;
        }
      return /* @__PURE__ */ E.createElement("meta", { httpEquiv: "refresh", content: `0;url=${m}` });
    }
  }
  return n;
}
function Ub({ routeContext: n, match: r, children: s }) {
  let o = E.useContext(Rn);
  return o && o.static && o.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ E.createElement(Xa.Provider, { value: n }, s);
}
function Lb(n, r = [], s) {
  let o = s?.state;
  if (n == null) {
    if (!o)
      return null;
    if (o.errors)
      n = o.matches;
    else if (r.length === 0 && !o.initialized && o.matches.length > 0)
      n = o.matches;
    else
      return null;
  }
  let f = n, d = o?.errors;
  if (d != null) {
    let S = f.findIndex(
      (h) => h.route.id && d?.[h.route.id] !== void 0
    );
    ze(
      S >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        d
      ).join(",")}`
    ), f = f.slice(
      0,
      Math.min(f.length, S + 1)
    );
  }
  let m = !1, g = -1;
  if (s && o) {
    m = o.renderFallback;
    for (let S = 0; S < f.length; S++) {
      let h = f[S];
      if ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (g = S), h.route.id) {
        let { loaderData: D, errors: _ } = o, C = h.route.loader && !D.hasOwnProperty(h.route.id) && (!_ || _[h.route.id] === void 0);
        if (h.route.lazy || C) {
          s.isStatic && (m = !0), g >= 0 ? f = f.slice(0, g + 1) : f = [f[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, v = o && y ? (S, h) => {
    y(S, {
      location: o.location,
      params: o.matches?.[0]?.params ?? {},
      pattern: pr(o.matches),
      errorInfo: h
    });
  } : void 0;
  return f.reduceRight(
    (S, h, D) => {
      let _, C = !1, X = null, k = null;
      o && (_ = d && h.route.id ? d[h.route.id] : void 0, X = h.route.errorElement || jb, m && (g < 0 && D === 0 ? (By(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), C = !0, k = null) : g === D && (C = !0, k = h.route.hydrateFallbackElement || null)));
      let $ = r.concat(f.slice(0, D + 1)), P = () => {
        let I;
        return _ ? I = X : C ? I = k : h.route.Component ? I = /* @__PURE__ */ E.createElement(h.route.Component, null) : h.route.element ? I = h.route.element : I = S, /* @__PURE__ */ E.createElement(
          Ub,
          {
            match: h,
            routeContext: {
              outlet: S,
              matches: $,
              isDataRoute: o != null
            },
            children: I
          }
        );
      };
      return o && (h.route.ErrorBoundary || h.route.errorElement || D === 0) ? /* @__PURE__ */ E.createElement(
        Ly,
        {
          location: o.location,
          revalidation: o.revalidation,
          component: X,
          error: _,
          children: P(),
          routeContext: { outlet: null, matches: $, isDataRoute: !0 },
          onError: v
        }
      ) : P();
    },
    null
  );
}
function kc(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Bb(n) {
  let r = E.useContext(Rn);
  return ze(r, kc(n)), r;
}
function Hb(n) {
  let r = E.useContext(br);
  return ze(r, kc(n)), r;
}
function Gb(n) {
  let r = E.useContext(Xa);
  return ze(r, kc(n)), r;
}
function Kc(n) {
  let r = Gb(n), s = r.matches[r.matches.length - 1];
  return ze(
    s.route.id,
    `${n} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function qb() {
  return Kc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Yb() {
  let n = E.useContext(Qc), r = Hb(
    "useRouteError"
    /* UseRouteError */
  ), s = Kc(
    "useRouteError"
    /* UseRouteError */
  );
  return n !== void 0 ? n : r.errors?.[s];
}
function Xb() {
  let { router: n } = Bb(
    "useNavigate"
    /* UseNavigateStable */
  ), r = Kc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = E.useRef(!1);
  return Uy(() => {
    s.current = !0;
  }), E.useCallback(
    async (f, d = {}) => {
      ft(s.current, Oy), s.current && (typeof f == "number" ? await n.navigate(f) : await n.navigate(f, { fromRouteId: r, ...d }));
    },
    [n, r]
  );
}
var yv = {};
function By(n, r, s) {
  !r && !yv[n] && (yv[n] = !0, ft(!1, s));
}
var gv = {};
function pv(n, r) {
  !n && !gv[r] && (gv[r] = !0, console.warn(r));
}
var Vb = "useOptimistic", bv = n0[Vb], Qb = () => {
};
function Zb(n) {
  return bv ? bv(n) : [n, Qb];
}
function kb(n) {
  let r = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: n.hasErrorBoundary || n.ErrorBoundary != null || n.errorElement != null
  };
  return n.Component && (n.element && ft(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(r, {
    element: E.createElement(n.Component),
    Component: void 0
  })), n.HydrateFallback && (n.hydrateFallbackElement && ft(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(r, {
    hydrateFallbackElement: E.createElement(n.HydrateFallback),
    HydrateFallback: void 0
  })), n.ErrorBoundary && (n.errorElement && ft(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(r, {
    errorElement: E.createElement(n.ErrorBoundary),
    ErrorBoundary: void 0
  })), r;
}
var Kb = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function Jb(n, r) {
  return $0({
    basename: r?.basename,
    getContext: r?.getContext,
    future: r?.future,
    history: f0({
      initialEntries: r?.initialEntries,
      initialIndex: r?.initialIndex
    }),
    hydrationData: r?.hydrationData,
    routes: n,
    hydrationRouteProperties: Kb,
    mapRouteProperties: kb,
    dataStrategy: r?.dataStrategy,
    patchRoutesOnNavigation: r?.patchRoutesOnNavigation,
    instrumentations: r?.instrumentations
  }).initialize();
}
var $b = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((n, r) => {
      this.resolve = (s) => {
        this.status === "pending" && (this.status = "resolved", n(s));
      }, this.reject = (s) => {
        this.status === "pending" && (this.status = "rejected", r(s));
      };
    });
  }
};
function Fb({
  router: n,
  flushSync: r,
  onError: s,
  useTransitions: o
}) {
  o = Dy() || o;
  let [d, m] = E.useState(n.state), [g, y] = Zb(d), [v, S] = E.useState(), [h, D] = E.useState({
    isTransitioning: !1
  }), [_, C] = E.useState(), [X, k] = E.useState(), [$, P] = E.useState(), I = E.useRef(/* @__PURE__ */ new Map()), pe = E.useCallback(
    (A, { deletedFetchers: Se, newErrors: ce, flushSync: Ue, viewTransitionOpts: ve }) => {
      ce && s && Object.values(ce).forEach(
        (De) => s(De, {
          location: A.location,
          params: A.matches[0]?.params ?? {},
          pattern: pr(A.matches)
        })
      ), A.fetchers.forEach((De, Le) => {
        De.data !== void 0 && I.current.set(Le, De.data);
      }), Se.forEach((De) => I.current.delete(De)), pv(
        Ue === !1 || r != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let qe = n.window != null && n.window.document != null && typeof n.window.document.startViewTransition == "function";
      if (pv(
        ve == null || qe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !ve || !qe) {
        r && Ue ? r(() => m(A)) : o === !1 ? m(A) : E.startTransition(() => {
          o === !0 && y((De) => Sv(De, A)), m(A);
        });
        return;
      }
      if (r && Ue) {
        r(() => {
          X && (_?.resolve(), X.skipTransition()), D({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: ve.currentLocation,
            nextLocation: ve.nextLocation
          });
        });
        let De = n.window.document.startViewTransition(() => {
          r(() => m(A));
        });
        De.finished.finally(() => {
          r(() => {
            C(void 0), k(void 0), S(void 0), D({ isTransitioning: !1 });
          });
        }), r(() => k(De));
        return;
      }
      X ? (_?.resolve(), X.skipTransition(), P({
        state: A,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      })) : (S(A), D({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: ve.currentLocation,
        nextLocation: ve.nextLocation
      }));
    },
    [
      n.window,
      r,
      X,
      _,
      o,
      y,
      s
    ]
  );
  E.useLayoutEffect(() => n.subscribe(pe), [n, pe]), E.useEffect(() => {
    h.isTransitioning && !h.flushSync && C(new $b());
  }, [h]), E.useEffect(() => {
    if (_ && v && n.window) {
      let A = v, Se = _.promise, ce = n.window.document.startViewTransition(async () => {
        o === !1 ? m(A) : E.startTransition(() => {
          o === !0 && y((Ue) => Sv(Ue, A)), m(A);
        }), await Se;
      });
      ce.finished.finally(() => {
        C(void 0), k(void 0), S(void 0), D({ isTransitioning: !1 });
      }), k(ce);
    }
  }, [
    v,
    _,
    n.window,
    o,
    y
  ]), E.useEffect(() => {
    _ && v && g.location.key === v.location.key && _.resolve();
  }, [_, X, g.location, v]), E.useEffect(() => {
    !h.isTransitioning && $ && (S($.state), D({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: $.currentLocation,
      nextLocation: $.nextLocation
    }), P(void 0));
  }, [h.isTransitioning, $]);
  let me = E.useMemo(() => ({
    createHref: n.createHref,
    encodeLocation: n.encodeLocation,
    go: (A) => n.navigate(A),
    push: (A, Se, ce) => n.navigate(A, {
      state: Se,
      preventScrollReset: ce?.preventScrollReset
    }),
    replace: (A, Se, ce) => n.navigate(A, {
      replace: !0,
      state: Se,
      preventScrollReset: ce?.preventScrollReset
    })
  }), [n]), te = n.basename || "/", F = E.useMemo(
    () => ({
      router: n,
      navigator: me,
      static: !1,
      basename: te,
      onError: s
    }),
    [n, me, te, s]
  );
  return /* @__PURE__ */ E.createElement(E.Fragment, null, /* @__PURE__ */ E.createElement(Rn.Provider, { value: F }, /* @__PURE__ */ E.createElement(br.Provider, { value: g }, /* @__PURE__ */ E.createElement(Cy.Provider, { value: I.current }, /* @__PURE__ */ E.createElement(Vc.Provider, { value: h }, /* @__PURE__ */ E.createElement(
    e1,
    {
      basename: te,
      location: g.location,
      navigationType: g.historyAction,
      navigator: me,
      useTransitions: o
    },
    /* @__PURE__ */ E.createElement(
      Wb,
      {
        routes: n.routes,
        manifest: n.manifest,
        future: n.future,
        state: g,
        isStatic: !1,
        onError: s
      }
    )
  ))))), null);
}
function Sv(n, r) {
  return {
    // Don't surface "current location specific" stuff mid-navigation
    // (historyAction, location, matches, loaderData, errors, initialized,
    // restoreScroll, preventScrollReset, blockers, etc.)
    ...n,
    // Only surface "pending/in-flight stuff"
    // (navigation, revalidation, actionData, fetchers, )
    navigation: r.navigation.state !== "idle" ? r.navigation : n.navigation,
    revalidation: r.revalidation !== "idle" ? r.revalidation : n.revalidation,
    actionData: r.navigation.state !== "submitting" ? r.actionData : n.actionData,
    fetchers: r.fetchers
  };
}
var Wb = E.memo(Ib);
function Ib({
  routes: n,
  manifest: r,
  future: s,
  state: o,
  isStatic: f,
  onError: d
}) {
  return Db(n, void 0, {
    manifest: r,
    state: o,
    isStatic: f,
    onError: d
  });
}
function Pb(n) {
  return Mb(n.context);
}
function e1({
  basename: n = "/",
  children: r = null,
  location: s,
  navigationType: o = "POP",
  navigator: f,
  static: d = !1,
  useTransitions: m
}) {
  ze(
    !Sr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let g = n.replace(/^\/*/, "/"), y = E.useMemo(
    () => ({
      basename: g,
      navigator: f,
      static: d,
      useTransitions: m,
      future: {}
    }),
    [g, f, d, m]
  );
  typeof s == "string" && (s = Ya(s));
  let {
    pathname: v = "/",
    search: S = "",
    hash: h = "",
    state: D = null,
    key: _ = "default",
    mask: C
  } = s, X = E.useMemo(() => {
    let k = wa(v, g);
    return k == null ? null : {
      location: {
        pathname: k,
        search: S,
        hash: h,
        state: D,
        key: _,
        mask: C
      },
      navigationType: o
    };
  }, [g, v, S, h, D, _, o, C]);
  return ft(
    X != null,
    `<Router basename="${g}"> is not able to match the URL "${v}${S}${h}" because it does not start with the basename, so the <Router> won't render anything.`
  ), X == null ? null : /* @__PURE__ */ E.createElement(Na.Provider, { value: y }, /* @__PURE__ */ E.createElement(Wu.Provider, { children: r, value: X }));
}
var Yu = "get", Xu = "application/x-www-form-urlencoded";
function Iu(n) {
  return typeof HTMLElement < "u" && n instanceof HTMLElement;
}
function t1(n) {
  return Iu(n) && n.tagName.toLowerCase() === "button";
}
function a1(n) {
  return Iu(n) && n.tagName.toLowerCase() === "form";
}
function l1(n) {
  return Iu(n) && n.tagName.toLowerCase() === "input";
}
function n1(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function i1(n, r) {
  return n.button === 0 && // Ignore everything but left clicks
  (!r || r === "_self") && // Let browser handle "target=_blank" etc.
  !n1(n);
}
function Ac(n = "") {
  return new URLSearchParams(
    typeof n == "string" || Array.isArray(n) || n instanceof URLSearchParams ? n : Object.keys(n).reduce((r, s) => {
      let o = n[s];
      return r.concat(
        Array.isArray(o) ? o.map((f) => [s, f]) : [[s, o]]
      );
    }, [])
  );
}
function r1(n, r) {
  let s = Ac(n);
  return r && r.forEach((o, f) => {
    s.has(f) || r.getAll(f).forEach((d) => {
      s.append(f, d);
    });
  }), s;
}
var Uu = null;
function u1() {
  if (Uu === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Uu = !1;
    } catch {
      Uu = !0;
    }
  return Uu;
}
var s1 = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function yc(n) {
  return n != null && !s1.has(n) ? (ft(
    !1,
    `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Xu}"`
  ), null) : n;
}
function o1(n, r) {
  let s, o, f, d, m;
  if (a1(n)) {
    let g = n.getAttribute("action");
    o = g ? wa(g, r) : null, s = n.getAttribute("method") || Yu, f = yc(n.getAttribute("enctype")) || Xu, d = new FormData(n);
  } else if (t1(n) || l1(n) && (n.type === "submit" || n.type === "image")) {
    let g = n.form;
    if (g == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = n.getAttribute("formaction") || g.getAttribute("action");
    if (o = y ? wa(y, r) : null, s = n.getAttribute("formmethod") || g.getAttribute("method") || Yu, f = yc(n.getAttribute("formenctype")) || yc(g.getAttribute("enctype")) || Xu, d = new FormData(g, n), !u1()) {
      let { name: v, type: S, value: h } = n;
      if (S === "image") {
        let D = v ? `${v}.` : "";
        d.append(`${D}x`, "0"), d.append(`${D}y`, "0");
      } else v && d.append(v, h);
    }
  } else {
    if (Iu(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = Yu, o = null, f = Xu, m = n;
  }
  return d && f === "text/plain" && (m = d, d = void 0), { action: o, method: s.toLowerCase(), encType: f, formData: d, body: m };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Jc(n, r) {
  if (n === !1 || n === null || typeof n > "u")
    throw new Error(r);
}
function Hy(n, r, s, o) {
  let f = typeof n == "string" ? new URL(
    n,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : n;
  return s ? f.pathname.endsWith("/") ? f.pathname = `${f.pathname}_.${o}` : f.pathname = `${f.pathname}.${o}` : f.pathname === "/" ? f.pathname = `_root.${o}` : r && wa(f.pathname, r) === "/" ? f.pathname = `${ku(r)}/_root.${o}` : f.pathname = `${ku(f.pathname)}.${o}`, f;
}
async function c1(n, r) {
  if (n.id in r)
    return r[n.id];
  try {
    let s = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      n.module
    );
    return r[n.id] = s, s;
  } catch (s) {
    return console.error(
      `Error loading route module \`${n.module}\`, reloading page...`
    ), console.error(s), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function f1(n) {
  return n == null ? !1 : n.href == null ? n.rel === "preload" && typeof n.imageSrcSet == "string" && typeof n.imageSizes == "string" : typeof n.rel == "string" && typeof n.href == "string";
}
async function d1(n, r, s) {
  let o = await Promise.all(
    n.map(async (f) => {
      let d = r.routes[f.route.id];
      if (d) {
        let m = await c1(d, s);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return y1(
    o.flat(1).filter(f1).filter((f) => f.rel === "stylesheet" || f.rel === "preload").map(
      (f) => f.rel === "stylesheet" ? { ...f, rel: "prefetch", as: "style" } : { ...f, rel: "prefetch" }
    )
  );
}
function Ev(n, r, s, o, f, d) {
  let m = (y, v) => s[v] ? y.route.id !== s[v].route.id : !0, g = (y, v) => (
    // param change, /users/123 -> /users/456
    s[v].pathname !== y.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s[v].route.path?.endsWith("*") && s[v].params["*"] !== y.params["*"]
  );
  return d === "assets" ? r.filter(
    (y, v) => m(y, v) || g(y, v)
  ) : d === "data" ? r.filter((y, v) => {
    let S = o.routes[y.route.id];
    if (!S || !S.hasLoader)
      return !1;
    if (m(y, v) || g(y, v))
      return !0;
    if (y.route.shouldRevalidate) {
      let h = y.route.shouldRevalidate({
        currentUrl: new URL(
          f.pathname + f.search + f.hash,
          window.origin
        ),
        currentParams: s[0]?.params || {},
        nextUrl: new URL(n, window.origin),
        nextParams: y.params,
        defaultShouldRevalidate: !0
      });
      if (typeof h == "boolean")
        return h;
    }
    return !0;
  }) : [];
}
function h1(n, r, { includeHydrateFallback: s } = {}) {
  return m1(
    n.map((o) => {
      let f = r.routes[o.route.id];
      if (!f) return [];
      let d = [f.module];
      return f.clientActionModule && (d = d.concat(f.clientActionModule)), f.clientLoaderModule && (d = d.concat(f.clientLoaderModule)), s && f.hydrateFallbackModule && (d = d.concat(f.hydrateFallbackModule)), f.imports && (d = d.concat(f.imports)), d;
    }).flat(1)
  );
}
function m1(n) {
  return [...new Set(n)];
}
function v1(n) {
  let r = {}, s = Object.keys(n).sort();
  for (let o of s)
    r[o] = n[o];
  return r;
}
function y1(n, r) {
  let s = /* @__PURE__ */ new Set();
  return new Set(r), n.reduce((o, f) => {
    let d = JSON.stringify(v1(f));
    return s.has(d) || (s.add(d), o.push({ key: d, link: f })), o;
  }, []);
}
function $c() {
  let n = E.useContext(Rn);
  return Jc(
    n,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), n;
}
function g1() {
  let n = E.useContext(br);
  return Jc(
    n,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), n;
}
var Fc = E.createContext(void 0);
Fc.displayName = "FrameworkContext";
function Pu() {
  let n = E.useContext(Fc);
  return Jc(
    n,
    "You must render this element inside a <HydratedRouter> element"
  ), n;
}
function p1(n, r) {
  let s = E.useContext(Fc), [o, f] = E.useState(!1), [d, m] = E.useState(!1), { onFocus: g, onBlur: y, onMouseEnter: v, onMouseLeave: S, onTouchStart: h } = r, D = E.useRef(null);
  E.useEffect(() => {
    if (n === "render" && m(!0), n === "viewport") {
      let X = ($) => {
        $.forEach((P) => {
          m(P.isIntersecting);
        });
      }, k = new IntersectionObserver(X, { threshold: 0.5 });
      return D.current && k.observe(D.current), () => {
        k.disconnect();
      };
    }
  }, [n]), E.useEffect(() => {
    if (o) {
      let X = setTimeout(() => {
        m(!0);
      }, 100);
      return () => {
        clearTimeout(X);
      };
    }
  }, [o]);
  let _ = () => {
    f(!0);
  }, C = () => {
    f(!1), m(!1);
  };
  return s ? n !== "intent" ? [d, D, {}] : [
    d,
    D,
    {
      onFocus: fr(g, _),
      onBlur: fr(y, C),
      onMouseEnter: fr(v, _),
      onMouseLeave: fr(S, C),
      onTouchStart: fr(h, _)
    }
  ] : [!1, D, {}];
}
function fr(n, r) {
  return (s) => {
    n && n(s), s.defaultPrevented || r(s);
  };
}
function b1({ page: n, ...r }) {
  let s = Dy(), { nonce: o } = Pu(), { router: f } = $c(), d = E.useMemo(
    () => oy(f.routes, n, f.basename),
    [f.routes, n, f.basename]
  );
  return d ? (r.nonce == null && o && (r = { ...r, nonce: o }), s ? /* @__PURE__ */ E.createElement(E1, { page: n, matches: d, ...r }) : /* @__PURE__ */ E.createElement(x1, { page: n, matches: d, ...r })) : null;
}
function S1(n) {
  let { manifest: r, routeModules: s } = Pu(), [o, f] = E.useState([]);
  return E.useEffect(() => {
    let d = !1;
    return d1(n, r, s).then(
      (m) => {
        d || f(m);
      }
    ), () => {
      d = !0;
    };
  }, [n, r, s]), o;
}
function E1({
  page: n,
  matches: r,
  ...s
}) {
  let o = Va(), { future: f } = Pu(), { basename: d } = $c(), m = E.useMemo(() => {
    if (n === o.pathname + o.search + o.hash)
      return [];
    let g = Hy(
      n,
      d,
      f.v8_trailingSlashAwareDataRequests,
      "rsc"
    ), y = !1, v = [];
    for (let S of r)
      typeof S.route.shouldRevalidate == "function" ? y = !0 : v.push(S.route.id);
    return y && v.length > 0 && g.searchParams.set("_routes", v.join(",")), [g.pathname + g.search];
  }, [
    d,
    f.v8_trailingSlashAwareDataRequests,
    n,
    o,
    r
  ]);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, m.map((g) => /* @__PURE__ */ E.createElement("link", { key: g, rel: "prefetch", as: "fetch", href: g, ...s })));
}
function x1({
  page: n,
  matches: r,
  ...s
}) {
  let o = Va(), { future: f, manifest: d, routeModules: m } = Pu(), { basename: g } = $c(), { loaderData: y, matches: v } = g1(), S = E.useMemo(
    () => Ev(
      n,
      r,
      v,
      d,
      o,
      "data"
    ),
    [n, r, v, d, o]
  ), h = E.useMemo(
    () => Ev(
      n,
      r,
      v,
      d,
      o,
      "assets"
    ),
    [n, r, v, d, o]
  ), D = E.useMemo(() => {
    if (n === o.pathname + o.search + o.hash)
      return [];
    let X = /* @__PURE__ */ new Set(), k = !1;
    if (r.forEach((P) => {
      let I = d.routes[P.route.id];
      !I || !I.hasLoader || (!S.some((pe) => pe.route.id === P.route.id) && P.route.id in y && m[P.route.id]?.shouldRevalidate || I.hasClientLoader ? k = !0 : X.add(P.route.id));
    }), X.size === 0)
      return [];
    let $ = Hy(
      n,
      g,
      f.v8_trailingSlashAwareDataRequests,
      "data"
    );
    return k && X.size > 0 && $.searchParams.set(
      "_routes",
      r.filter((P) => X.has(P.route.id)).map((P) => P.route.id).join(",")
    ), [$.pathname + $.search];
  }, [
    g,
    f.v8_trailingSlashAwareDataRequests,
    y,
    o,
    d,
    S,
    r,
    n,
    m
  ]), _ = E.useMemo(
    () => h1(h, d),
    [h, d]
  ), C = S1(h);
  return /* @__PURE__ */ E.createElement(E.Fragment, null, D.map((X) => /* @__PURE__ */ E.createElement("link", { key: X, rel: "prefetch", as: "fetch", href: X, ...s })), _.map((X) => /* @__PURE__ */ E.createElement("link", { key: X, rel: "modulepreload", href: X, ...s })), C.map(({ key: X, link: k }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ E.createElement(
      "link",
      {
        key: X,
        nonce: s.nonce,
        ...k,
        crossOrigin: k.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function R1(...n) {
  return (r) => {
    n.forEach((s) => {
      typeof s == "function" ? s(r) : s != null && (s.current = r);
    });
  };
}
var T1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  T1 && (window.__reactRouterVersion = // @ts-expect-error
  "7.18.0");
} catch {
}
var Gy = E.forwardRef(
  function({
    onClick: r,
    discover: s = "render",
    prefetch: o = "none",
    relative: f,
    reloadDocument: d,
    replace: m,
    mask: g,
    state: y,
    target: v,
    to: S,
    preventScrollReset: h,
    viewTransition: D,
    defaultShouldRevalidate: _,
    ...C
  }, X) {
    let { basename: k, navigator: $, useTransitions: P } = E.useContext(Na), I = typeof S == "string" && Ju.test(S), pe = yy(S, k);
    S = pe.to;
    let me = wb(S, { relative: f }), te = Va(), F = null;
    if (g) {
      let Le = $u(
        g,
        [],
        te.mask ? te.mask.pathname : "/",
        !0
      );
      k !== "/" && (Le.pathname = Le.pathname === "/" ? k : _a([k, Le.pathname])), F = $.createHref(Le);
    }
    let [A, Se, ce] = p1(
      o,
      C
    ), Ue = A1(S, {
      replace: m,
      mask: g,
      state: y,
      target: v,
      preventScrollReset: h,
      relative: f,
      viewTransition: D,
      defaultShouldRevalidate: _,
      useTransitions: P
    });
    function ve(Le) {
      r && r(Le), Le.defaultPrevented || Ue(Le);
    }
    let qe = !(pe.isExternal || d), De = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ E.createElement(
        "a",
        {
          ...C,
          ...ce,
          href: (qe ? F : void 0) || pe.absoluteURL || me,
          onClick: qe ? ve : r,
          ref: R1(X, Se),
          target: v,
          "data-discover": !I && s === "render" ? "true" : void 0
        }
      )
    );
    return A && !I ? /* @__PURE__ */ E.createElement(E.Fragment, null, De, /* @__PURE__ */ E.createElement(b1, { page: me })) : De;
  }
);
Gy.displayName = "Link";
var _1 = E.forwardRef(
  function({
    "aria-current": r = "page",
    caseSensitive: s = !1,
    className: o = "",
    end: f = !1,
    style: d,
    to: m,
    viewTransition: g,
    children: y,
    ...v
  }, S) {
    let h = Er(m, { relative: v.relative }), D = Va(), _ = E.useContext(br), { navigator: C, basename: X } = E.useContext(Na), k = _ != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    O1(h) && g === !0, $ = C.encodeLocation ? C.encodeLocation(h).pathname : h.pathname, P = D.pathname, I = _ && _.navigation && _.navigation.location ? _.navigation.location.pathname : null;
    s || (P = P.toLowerCase(), I = I ? I.toLowerCase() : null, $ = $.toLowerCase()), I && X && (I = wa(I, X) || I);
    const pe = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
    let me = P === $ || !f && P.startsWith($) && P.charAt(pe) === "/", te = I != null && (I === $ || !f && I.startsWith($) && I.charAt($.length) === "/"), F = {
      isActive: me,
      isPending: te,
      isTransitioning: k
    }, A = me ? r : void 0, Se;
    typeof o == "function" ? Se = o(F) : Se = [
      o,
      me ? "active" : null,
      te ? "pending" : null,
      k ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let ce = typeof d == "function" ? d(F) : d;
    return /* @__PURE__ */ E.createElement(
      Gy,
      {
        ...v,
        "aria-current": A,
        className: Se,
        ref: S,
        style: ce,
        to: m,
        viewTransition: g
      },
      typeof y == "function" ? y(F) : y
    );
  }
);
_1.displayName = "NavLink";
var w1 = E.forwardRef(
  ({
    discover: n = "render",
    fetcherKey: r,
    navigate: s,
    reloadDocument: o,
    replace: f,
    state: d,
    method: m = Yu,
    action: g,
    onSubmit: y,
    relative: v,
    preventScrollReset: S,
    viewTransition: h,
    defaultShouldRevalidate: D,
    ..._
  }, C) => {
    let { useTransitions: X } = E.useContext(Na), k = C1(), $ = j1(g, { relative: v }), P = m.toLowerCase() === "get" ? "get" : "post", I = typeof g == "string" && Ju.test(g), pe = (me) => {
      if (y && y(me), me.defaultPrevented) return;
      me.preventDefault();
      let te = me.nativeEvent.submitter, F = te?.getAttribute("formmethod") || m, A = () => k(te || me.currentTarget, {
        fetcherKey: r,
        method: F,
        navigate: s,
        replace: f,
        state: d,
        relative: v,
        preventScrollReset: S,
        viewTransition: h,
        defaultShouldRevalidate: D
      });
      X && s !== !1 ? E.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ E.createElement(
      "form",
      {
        ref: C,
        method: P,
        action: $,
        onSubmit: o ? y : pe,
        ..._,
        "data-discover": !I && n === "render" ? "true" : void 0
      }
    );
  }
);
w1.displayName = "Form";
function N1(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function qy(n) {
  let r = E.useContext(Rn);
  return ze(r, N1(n)), r;
}
function A1(n, {
  target: r,
  replace: s,
  mask: o,
  state: f,
  preventScrollReset: d,
  relative: m,
  viewTransition: g,
  defaultShouldRevalidate: y,
  useTransitions: v
} = {}) {
  let S = Zc(), h = Va(), D = Er(n, { relative: m });
  return E.useCallback(
    (_) => {
      if (i1(_, r)) {
        _.preventDefault();
        let C = s !== void 0 ? s : el(h) === el(D), X = () => S(n, {
          replace: C,
          mask: o,
          state: f,
          preventScrollReset: d,
          relative: m,
          viewTransition: g,
          defaultShouldRevalidate: y
        });
        v ? E.startTransition(() => X()) : X();
      }
    },
    [
      h,
      S,
      D,
      s,
      o,
      f,
      r,
      n,
      d,
      m,
      g,
      y,
      v
    ]
  );
}
function M1(n) {
  ft(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let r = E.useRef(Ac(n)), s = E.useRef(!1), o = Va(), f = E.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      r1(
        o.search,
        s.current ? null : r.current
      )
    ),
    [o.search]
  ), d = Zc(), m = E.useCallback(
    (g, y) => {
      const v = Ac(
        typeof g == "function" ? g(new URLSearchParams(f)) : g
      );
      s.current = !0, d("?" + v, y);
    },
    [d, f]
  );
  return [f, m];
}
var z1 = 0, D1 = () => `__${String(++z1)}__`;
function C1() {
  let { router: n } = qy(
    "useSubmit"
    /* UseSubmit */
  ), { basename: r } = E.useContext(Na), s = qb(), o = n.fetch, f = n.navigate;
  return E.useCallback(
    async (d, m = {}) => {
      let { action: g, method: y, encType: v, formData: S, body: h } = o1(
        d,
        r
      );
      if (m.navigate === !1) {
        let D = m.fetcherKey || D1();
        await o(D, s, m.action || g, {
          defaultShouldRevalidate: m.defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: S,
          body: h,
          formMethod: m.method || y,
          formEncType: m.encType || v,
          flushSync: m.flushSync
        });
      } else
        await f(m.action || g, {
          defaultShouldRevalidate: m.defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: S,
          body: h,
          formMethod: m.method || y,
          formEncType: m.encType || v,
          replace: m.replace,
          state: m.state,
          fromRouteId: s,
          flushSync: m.flushSync,
          viewTransition: m.viewTransition
        });
    },
    [o, f, r, s]
  );
}
function j1(n, { relative: r } = {}) {
  let { basename: s } = E.useContext(Na), o = E.useContext(Xa);
  ze(o, "useFormAction must be used inside a RouteContext");
  let [f] = o.matches.slice(-1), d = { ...Er(n || ".", { relative: r }) }, m = Va();
  if (n == null) {
    d.search = m.search;
    let g = new URLSearchParams(d.search), y = g.getAll("index");
    if (y.some((S) => S === "")) {
      g.delete("index"), y.filter((h) => h).forEach((h) => g.append("index", h));
      let S = g.toString();
      d.search = S ? `?${S}` : "";
    }
  }
  return (!n || n === ".") && f.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (d.pathname = d.pathname === "/" ? s : _a([s, d.pathname])), el(d);
}
function O1(n, { relative: r } = {}) {
  let s = E.useContext(Vc);
  ze(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = qy(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), f = Er(n, { relative: r });
  if (!s.isTransitioning)
    return !1;
  let d = wa(s.currentLocation.pathname, o) || s.currentLocation.pathname, m = wa(s.nextLocation.pathname, o) || s.nextLocation.pathname;
  return Zu(f.pathname, m) != null || Zu(f.pathname, d) != null;
}
const Mc = "faceavatar:trigger-generate", zc = "faceavatar:generate-state";
function U1() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Mc));
}
function L1(n) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(zc, { detail: n }));
}
function B1(n) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Mc, n), () => window.removeEventListener(Mc, n));
}
function H1(n) {
  if (typeof window > "u") return () => {
  };
  const r = (s) => {
    const o = s.detail;
    o && n(o);
  };
  return window.addEventListener(zc, r), () => window.removeEventListener(zc, r);
}
const xv = "ext-actions-request", G1 = "ext-actions-declare", q1 = "ext-action-state", Rv = "ext-action-invoke", Tv = "faceavatar:navigate", _v = "faceavatar.generate";
function Y1(n, r) {
  let s = !1, o = !1;
  const f = () => ({
    id: _v,
    label: s ? "Generating…" : "Generate",
    icon: s ? "hourglass_top" : "deployed_code",
    tone: "primary",
    state: s ? "loading" : o ? "disabled" : "idle",
    tooltip: o ? "Upload an input image before generating" : "Generate a 3D mesh from the input image"
  }), d = () => ({
    primary: f()
  }), m = () => {
    n.dispatchEvent(
      new CustomEvent(G1, { detail: { actions: d() }, bubbles: !1 })
    );
  }, g = () => {
    n.dispatchEvent(
      new CustomEvent(q1, { detail: { action: f() }, bubbles: !1 })
    );
  }, y = () => m(), v = (h) => {
    h.detail?.id === _v && U1();
  }, S = H1((h) => {
    s = h.busy, o = h.blocked, g();
  });
  return n.addEventListener(xv, y), n.addEventListener(Rv, v), m(), {
    dispose: () => {
      S(), n.removeEventListener(xv, y), n.removeEventListener(Rv, v);
    }
  };
}
var X1 = iy();
const V1 = /* @__PURE__ */ ny(X1);
function Q1(n) {
  if (typeof document > "u") return;
  let r = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", r.appendChild(s), s.styleSheet ? s.styleSheet.cssText = n : s.appendChild(document.createTextNode(n));
}
const Z1 = (n) => {
  switch (n) {
    case "success":
      return J1;
    case "info":
      return F1;
    case "warning":
      return $1;
    case "error":
      return W1;
    default:
      return null;
  }
}, k1 = Array(12).fill(0), K1 = ({ visible: n, className: r }) => /* @__PURE__ */ W.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    r
  ].filter(Boolean).join(" "),
  "data-visible": n
}, /* @__PURE__ */ W.createElement("div", {
  className: "sonner-spinner"
}, k1.map((s, o) => /* @__PURE__ */ W.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${o}`
})))), J1 = /* @__PURE__ */ W.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ W.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), $1 = /* @__PURE__ */ W.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ W.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), F1 = /* @__PURE__ */ W.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ W.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), W1 = /* @__PURE__ */ W.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ W.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), I1 = /* @__PURE__ */ W.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ W.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ W.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), P1 = () => {
  const [n, r] = W.useState(document.hidden);
  return W.useEffect(() => {
    const s = () => {
      r(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), n;
};
let Dc = 1;
class eS {
  constructor() {
    this.subscribe = (r) => (this.subscribers.push(r), () => {
      const s = this.subscribers.indexOf(r);
      this.subscribers.splice(s, 1);
    }), this.publish = (r) => {
      this.subscribers.forEach((s) => s(r));
    }, this.addToast = (r) => {
      this.publish(r), this.toasts = [
        ...this.toasts,
        r
      ];
    }, this.create = (r) => {
      var s;
      const { message: o, ...f } = r, d = typeof r?.id == "number" || ((s = r.id) == null ? void 0 : s.length) > 0 ? r.id : Dc++, m = this.toasts.find((y) => y.id === d), g = r.dismissible === void 0 ? !0 : r.dismissible;
      return this.dismissedToasts.has(d) && this.dismissedToasts.delete(d), m ? this.toasts = this.toasts.map((y) => y.id === d ? (this.publish({
        ...y,
        ...r,
        id: d,
        title: o
      }), {
        ...y,
        ...r,
        id: d,
        dismissible: g,
        title: o
      }) : y) : this.addToast({
        title: o,
        ...f,
        dismissible: g,
        id: d
      }), d;
    }, this.dismiss = (r) => (r ? (this.dismissedToasts.add(r), requestAnimationFrame(() => this.subscribers.forEach((s) => s({
      id: r,
      dismiss: !0
    })))) : this.toasts.forEach((s) => {
      this.subscribers.forEach((o) => o({
        id: s.id,
        dismiss: !0
      }));
    }), r), this.message = (r, s) => this.create({
      ...s,
      message: r
    }), this.error = (r, s) => this.create({
      ...s,
      message: r,
      type: "error"
    }), this.success = (r, s) => this.create({
      ...s,
      type: "success",
      message: r
    }), this.info = (r, s) => this.create({
      ...s,
      type: "info",
      message: r
    }), this.warning = (r, s) => this.create({
      ...s,
      type: "warning",
      message: r
    }), this.loading = (r, s) => this.create({
      ...s,
      type: "loading",
      message: r
    }), this.promise = (r, s) => {
      if (!s)
        return;
      let o;
      s.loading !== void 0 && (o = this.create({
        ...s,
        promise: r,
        type: "loading",
        message: s.loading,
        description: typeof s.description != "function" ? s.description : void 0
      }));
      const f = Promise.resolve(r instanceof Function ? r() : r);
      let d = o !== void 0, m;
      const g = f.then(async (v) => {
        if (m = [
          "resolve",
          v
        ], W.isValidElement(v))
          d = !1, this.create({
            id: o,
            type: "default",
            message: v
          });
        else if (aS(v) && !v.ok) {
          d = !1;
          const h = typeof s.error == "function" ? await s.error(`HTTP error! status: ${v.status}`) : s.error, D = typeof s.description == "function" ? await s.description(`HTTP error! status: ${v.status}`) : s.description, C = typeof h == "object" && !W.isValidElement(h) ? h : {
            message: h
          };
          this.create({
            id: o,
            type: "error",
            description: D,
            ...C
          });
        } else if (v instanceof Error) {
          d = !1;
          const h = typeof s.error == "function" ? await s.error(v) : s.error, D = typeof s.description == "function" ? await s.description(v) : s.description, C = typeof h == "object" && !W.isValidElement(h) ? h : {
            message: h
          };
          this.create({
            id: o,
            type: "error",
            description: D,
            ...C
          });
        } else if (s.success !== void 0) {
          d = !1;
          const h = typeof s.success == "function" ? await s.success(v) : s.success, D = typeof s.description == "function" ? await s.description(v) : s.description, C = typeof h == "object" && !W.isValidElement(h) ? h : {
            message: h
          };
          this.create({
            id: o,
            type: "success",
            description: D,
            ...C
          });
        }
      }).catch(async (v) => {
        if (m = [
          "reject",
          v
        ], s.error !== void 0) {
          d = !1;
          const S = typeof s.error == "function" ? await s.error(v) : s.error, h = typeof s.description == "function" ? await s.description(v) : s.description, _ = typeof S == "object" && !W.isValidElement(S) ? S : {
            message: S
          };
          this.create({
            id: o,
            type: "error",
            description: h,
            ..._
          });
        }
      }).finally(() => {
        d && (this.dismiss(o), o = void 0), s.finally == null || s.finally.call(s);
      }), y = () => new Promise((v, S) => g.then(() => m[0] === "reject" ? S(m[1]) : v(m[1])).catch(S));
      return typeof o != "string" && typeof o != "number" ? {
        unwrap: y
      } : Object.assign(o, {
        unwrap: y
      });
    }, this.custom = (r, s) => {
      const o = s?.id || Dc++;
      return this.create({
        jsx: r(o),
        id: o,
        ...s
      }), o;
    }, this.getActiveToasts = () => this.toasts.filter((r) => !this.dismissedToasts.has(r.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Pt = new eS(), tS = (n, r) => {
  const s = r?.id || Dc++;
  return Pt.addToast({
    title: n,
    ...r,
    id: s
  }), s;
}, aS = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", lS = tS, nS = () => Pt.toasts, iS = () => Pt.getActiveToasts(), qa = Object.assign(lS, {
  success: Pt.success,
  info: Pt.info,
  warning: Pt.warning,
  error: Pt.error,
  custom: Pt.custom,
  message: Pt.message,
  promise: Pt.promise,
  dismiss: Pt.dismiss,
  loading: Pt.loading
}, {
  getHistory: nS,
  getToasts: iS
});
Q1("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Lu(n) {
  return n.label !== void 0;
}
const rS = 3, uS = "24px", sS = "16px", wv = 4e3, oS = 356, cS = 14, fS = 45, dS = 200;
function Ia(...n) {
  return n.filter(Boolean).join(" ");
}
function hS(n) {
  const [r, s] = n.split("-"), o = [];
  return r && o.push(r), s && o.push(s), o;
}
const mS = (n) => {
  var r, s, o, f, d, m, g, y, v;
  const { invert: S, toast: h, unstyled: D, interacting: _, setHeights: C, visibleToasts: X, heights: k, index: $, toasts: P, expanded: I, removeToast: pe, defaultRichColors: me, closeButton: te, style: F, cancelButtonStyle: A, actionButtonStyle: Se, className: ce = "", descriptionClassName: Ue = "", duration: ve, position: qe, gap: De, expandByDefault: Le, classNames: M, icons: V, closeButtonAriaLabel: ne = "Close toast" } = n, [re, de] = W.useState(null), [T, H] = W.useState(null), [q, J] = W.useState(!1), [ee, oe] = W.useState(!1), [Re, Te] = W.useState(!1), [Ye, fa] = W.useState(!1), [Aa, da] = W.useState(!1), [dt, wt] = W.useState(0), [Rl, Tl] = W.useState(0), Gt = W.useRef(h.duration || ve || wv), tn = W.useRef(null), qt = W.useRef(null), _l = $ === 0, an = $ + 1 <= X, At = h.type, Qa = h.dismissible !== !1, Mt = h.className || "", Ma = h.descriptionClassName || "", ea = W.useMemo(() => k.findIndex((xe) => xe.toastId === h.id) || 0, [
    k,
    h.id
  ]), ln = W.useMemo(() => {
    var xe;
    return (xe = h.closeButton) != null ? xe : te;
  }, [
    h.closeButton,
    te
  ]), za = W.useMemo(() => h.duration || ve || wv, [
    h.duration,
    ve
  ]), Yt = W.useRef(0), xt = W.useRef(0), _n = W.useRef(0), Za = W.useRef(null), [Da, zt] = qe.split("-"), ht = W.useMemo(() => k.reduce((xe, at, gt) => gt >= ea ? xe : xe + at.height, 0), [
    k,
    ea
  ]), Rt = P1(), wn = h.invert || S, wl = At === "loading";
  xt.current = W.useMemo(() => ea * De + ht, [
    ea,
    ht
  ]), W.useEffect(() => {
    Gt.current = za;
  }, [
    za
  ]), W.useEffect(() => {
    J(!0);
  }, []), W.useEffect(() => {
    const xe = qt.current;
    if (xe) {
      const at = xe.getBoundingClientRect().height;
      return Tl(at), C((gt) => [
        {
          toastId: h.id,
          height: at,
          position: h.position
        },
        ...gt
      ]), () => C((gt) => gt.filter((Tt) => Tt.toastId !== h.id));
    }
  }, [
    C,
    h.id
  ]), W.useLayoutEffect(() => {
    if (!q) return;
    const xe = qt.current, at = xe.style.height;
    xe.style.height = "auto";
    const gt = xe.getBoundingClientRect().height;
    xe.style.height = at, Tl(gt), C((Tt) => Tt.find((Ie) => Ie.toastId === h.id) ? Tt.map((Ie) => Ie.toastId === h.id ? {
      ...Ie,
      height: gt
    } : Ie) : [
      {
        toastId: h.id,
        height: gt,
        position: h.position
      },
      ...Tt
    ]);
  }, [
    q,
    h.title,
    h.description,
    C,
    h.id,
    h.jsx,
    h.action,
    h.cancel
  ]);
  const ha = W.useCallback(() => {
    oe(!0), wt(xt.current), C((xe) => xe.filter((at) => at.toastId !== h.id)), setTimeout(() => {
      pe(h);
    }, dS);
  }, [
    h,
    pe,
    C,
    xt
  ]);
  W.useEffect(() => {
    if (h.promise && At === "loading" || h.duration === 1 / 0 || h.type === "loading") return;
    let xe;
    return I || _ || Rt ? (() => {
      if (_n.current < Yt.current) {
        const Tt = (/* @__PURE__ */ new Date()).getTime() - Yt.current;
        Gt.current = Gt.current - Tt;
      }
      _n.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Gt.current !== 1 / 0 && (Yt.current = (/* @__PURE__ */ new Date()).getTime(), xe = setTimeout(() => {
        h.onAutoClose == null || h.onAutoClose.call(h, h), ha();
      }, Gt.current));
    })(), () => clearTimeout(xe);
  }, [
    I,
    _,
    h,
    At,
    Rt,
    ha
  ]), W.useEffect(() => {
    h.delete && (ha(), h.onDismiss == null || h.onDismiss.call(h, h));
  }, [
    ha,
    h.delete
  ]);
  function tl() {
    var xe;
    if (V?.loading) {
      var at;
      return /* @__PURE__ */ W.createElement("div", {
        className: Ia(M?.loader, h == null || (at = h.classNames) == null ? void 0 : at.loader, "sonner-loader"),
        "data-visible": At === "loading"
      }, V.loading);
    }
    return /* @__PURE__ */ W.createElement(K1, {
      className: Ia(M?.loader, h == null || (xe = h.classNames) == null ? void 0 : xe.loader),
      visible: At === "loading"
    });
  }
  const Ca = h.icon || V?.[At] || Z1(At);
  var ka, Zt;
  return /* @__PURE__ */ W.createElement("li", {
    tabIndex: 0,
    ref: qt,
    className: Ia(ce, Mt, M?.toast, h == null || (r = h.classNames) == null ? void 0 : r.toast, M?.default, M?.[At], h == null || (s = h.classNames) == null ? void 0 : s[At]),
    "data-sonner-toast": "",
    "data-rich-colors": (ka = h.richColors) != null ? ka : me,
    "data-styled": !(h.jsx || h.unstyled || D),
    "data-mounted": q,
    "data-promise": !!h.promise,
    "data-swiped": Aa,
    "data-removed": ee,
    "data-visible": an,
    "data-y-position": Da,
    "data-x-position": zt,
    "data-index": $,
    "data-front": _l,
    "data-swiping": Re,
    "data-dismissible": Qa,
    "data-type": At,
    "data-invert": wn,
    "data-swipe-out": Ye,
    "data-swipe-direction": T,
    "data-expanded": !!(I || Le && q),
    "data-testid": h.testId,
    style: {
      "--index": $,
      "--toasts-before": $,
      "--z-index": P.length - $,
      "--offset": `${ee ? dt : xt.current}px`,
      "--initial-height": Le ? "auto" : `${Rl}px`,
      ...F,
      ...h.style
    },
    onDragEnd: () => {
      Te(!1), de(null), Za.current = null;
    },
    onPointerDown: (xe) => {
      xe.button !== 2 && (wl || !Qa || (tn.current = /* @__PURE__ */ new Date(), wt(xt.current), xe.target.setPointerCapture(xe.pointerId), xe.target.tagName !== "BUTTON" && (Te(!0), Za.current = {
        x: xe.clientX,
        y: xe.clientY
      })));
    },
    onPointerUp: () => {
      var xe, at, gt;
      if (Ye || !Qa) return;
      Za.current = null;
      const Tt = Number(((xe = qt.current) == null ? void 0 : xe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), ta = Number(((at = qt.current) == null ? void 0 : at.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), Ie = (/* @__PURE__ */ new Date()).getTime() - ((gt = tn.current) == null ? void 0 : gt.getTime()), Dt = re === "x" ? Tt : ta, al = Math.abs(Dt) / Ie;
      if (Math.abs(Dt) >= fS || al > 0.11) {
        wt(xt.current), h.onDismiss == null || h.onDismiss.call(h, h), H(re === "x" ? Tt > 0 ? "right" : "left" : ta > 0 ? "down" : "up"), ha(), fa(!0);
        return;
      } else {
        var Lt, x;
        (Lt = qt.current) == null || Lt.style.setProperty("--swipe-amount-x", "0px"), (x = qt.current) == null || x.style.setProperty("--swipe-amount-y", "0px");
      }
      da(!1), Te(!1), de(null);
    },
    onPointerMove: (xe) => {
      var at, gt, Tt;
      if (!Za.current || !Qa || ((at = window.getSelection()) == null ? void 0 : at.toString().length) > 0) return;
      const Ie = xe.clientY - Za.current.y, Dt = xe.clientX - Za.current.x;
      var al;
      const Lt = (al = n.swipeDirections) != null ? al : hS(qe);
      !re && (Math.abs(Dt) > 1 || Math.abs(Ie) > 1) && de(Math.abs(Dt) > Math.abs(Ie) ? "x" : "y");
      let x = {
        x: 0,
        y: 0
      };
      const N = (j) => 1 / (1.5 + Math.abs(j) / 20);
      if (re === "y") {
        if (Lt.includes("top") || Lt.includes("bottom"))
          if (Lt.includes("top") && Ie < 0 || Lt.includes("bottom") && Ie > 0)
            x.y = Ie;
          else {
            const j = Ie * N(Ie);
            x.y = Math.abs(j) < Math.abs(Ie) ? j : Ie;
          }
      } else if (re === "x" && (Lt.includes("left") || Lt.includes("right")))
        if (Lt.includes("left") && Dt < 0 || Lt.includes("right") && Dt > 0)
          x.x = Dt;
        else {
          const j = Dt * N(Dt);
          x.x = Math.abs(j) < Math.abs(Dt) ? j : Dt;
        }
      (Math.abs(x.x) > 0 || Math.abs(x.y) > 0) && da(!0), (gt = qt.current) == null || gt.style.setProperty("--swipe-amount-x", `${x.x}px`), (Tt = qt.current) == null || Tt.style.setProperty("--swipe-amount-y", `${x.y}px`);
    }
  }, ln && !h.jsx && At !== "loading" ? /* @__PURE__ */ W.createElement("button", {
    "aria-label": ne,
    "data-disabled": wl,
    "data-close-button": !0,
    onClick: wl || !Qa ? () => {
    } : () => {
      ha(), h.onDismiss == null || h.onDismiss.call(h, h);
    },
    className: Ia(M?.closeButton, h == null || (o = h.classNames) == null ? void 0 : o.closeButton)
  }, (Zt = V?.close) != null ? Zt : I1) : null, (At || h.icon || h.promise) && h.icon !== null && (V?.[At] !== null || h.icon) ? /* @__PURE__ */ W.createElement("div", {
    "data-icon": "",
    className: Ia(M?.icon, h == null || (f = h.classNames) == null ? void 0 : f.icon)
  }, h.promise || h.type === "loading" && !h.icon ? h.icon || tl() : null, h.type !== "loading" ? Ca : null) : null, /* @__PURE__ */ W.createElement("div", {
    "data-content": "",
    className: Ia(M?.content, h == null || (d = h.classNames) == null ? void 0 : d.content)
  }, /* @__PURE__ */ W.createElement("div", {
    "data-title": "",
    className: Ia(M?.title, h == null || (m = h.classNames) == null ? void 0 : m.title)
  }, h.jsx ? h.jsx : typeof h.title == "function" ? h.title() : h.title), h.description ? /* @__PURE__ */ W.createElement("div", {
    "data-description": "",
    className: Ia(Ue, Ma, M?.description, h == null || (g = h.classNames) == null ? void 0 : g.description)
  }, typeof h.description == "function" ? h.description() : h.description) : null), /* @__PURE__ */ W.isValidElement(h.cancel) ? h.cancel : h.cancel && Lu(h.cancel) ? /* @__PURE__ */ W.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: h.cancelButtonStyle || A,
    onClick: (xe) => {
      Lu(h.cancel) && Qa && (h.cancel.onClick == null || h.cancel.onClick.call(h.cancel, xe), ha());
    },
    className: Ia(M?.cancelButton, h == null || (y = h.classNames) == null ? void 0 : y.cancelButton)
  }, h.cancel.label) : null, /* @__PURE__ */ W.isValidElement(h.action) ? h.action : h.action && Lu(h.action) ? /* @__PURE__ */ W.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: h.actionButtonStyle || Se,
    onClick: (xe) => {
      Lu(h.action) && (h.action.onClick == null || h.action.onClick.call(h.action, xe), !xe.defaultPrevented && ha());
    },
    className: Ia(M?.actionButton, h == null || (v = h.classNames) == null ? void 0 : v.actionButton)
  }, h.action.label) : null);
};
function Nv() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function vS(n, r) {
  const s = {};
  return [
    n,
    r
  ].forEach((o, f) => {
    const d = f === 1, m = d ? "--mobile-offset" : "--offset", g = d ? sS : uS;
    function y(v) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((S) => {
        s[`${m}-${S}`] = typeof v == "number" ? `${v}px` : v;
      });
    }
    typeof o == "number" || typeof o == "string" ? y(o) : typeof o == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((v) => {
      o[v] === void 0 ? s[`${m}-${v}`] = g : s[`${m}-${v}`] = typeof o[v] == "number" ? `${o[v]}px` : o[v];
    }) : y(g);
  }), s;
}
const yS = /* @__PURE__ */ W.forwardRef(function(r, s) {
  const { id: o, invert: f, position: d = "bottom-right", hotkey: m = [
    "altKey",
    "KeyT"
  ], expand: g, closeButton: y, className: v, offset: S, mobileOffset: h, theme: D = "light", richColors: _, duration: C, style: X, visibleToasts: k = rS, toastOptions: $, dir: P = Nv(), gap: I = cS, icons: pe, containerAriaLabel: me = "Notifications" } = r, [te, F] = W.useState([]), A = W.useMemo(() => o ? te.filter((q) => q.toasterId === o) : te.filter((q) => !q.toasterId), [
    te,
    o
  ]), Se = W.useMemo(() => Array.from(new Set([
    d
  ].concat(A.filter((q) => q.position).map((q) => q.position)))), [
    A,
    d
  ]), [ce, Ue] = W.useState([]), [ve, qe] = W.useState(!1), [De, Le] = W.useState(!1), [M, V] = W.useState(D !== "system" ? D : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), ne = W.useRef(null), re = m.join("+").replace(/Key/g, "").replace(/Digit/g, ""), de = W.useRef(null), T = W.useRef(!1), H = W.useCallback((q) => {
    F((J) => {
      var ee;
      return (ee = J.find((oe) => oe.id === q.id)) != null && ee.delete || Pt.dismiss(q.id), J.filter(({ id: oe }) => oe !== q.id);
    });
  }, []);
  return W.useEffect(() => Pt.subscribe((q) => {
    if (q.dismiss) {
      requestAnimationFrame(() => {
        F((J) => J.map((ee) => ee.id === q.id ? {
          ...ee,
          delete: !0
        } : ee));
      });
      return;
    }
    setTimeout(() => {
      V1.flushSync(() => {
        F((J) => {
          const ee = J.findIndex((oe) => oe.id === q.id);
          return ee !== -1 ? [
            ...J.slice(0, ee),
            {
              ...J[ee],
              ...q
            },
            ...J.slice(ee + 1)
          ] : [
            q,
            ...J
          ];
        });
      });
    });
  }), [
    te
  ]), W.useEffect(() => {
    if (D !== "system") {
      V(D);
      return;
    }
    if (D === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? V("dark") : V("light")), typeof window > "u") return;
    const q = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      q.addEventListener("change", ({ matches: J }) => {
        V(J ? "dark" : "light");
      });
    } catch {
      q.addListener(({ matches: ee }) => {
        try {
          V(ee ? "dark" : "light");
        } catch (oe) {
          console.error(oe);
        }
      });
    }
  }, [
    D
  ]), W.useEffect(() => {
    te.length <= 1 && qe(!1);
  }, [
    te
  ]), W.useEffect(() => {
    const q = (J) => {
      var ee;
      if (m.every((Te) => J[Te] || J.code === Te)) {
        var Re;
        qe(!0), (Re = ne.current) == null || Re.focus();
      }
      J.code === "Escape" && (document.activeElement === ne.current || (ee = ne.current) != null && ee.contains(document.activeElement)) && qe(!1);
    };
    return document.addEventListener("keydown", q), () => document.removeEventListener("keydown", q);
  }, [
    m
  ]), W.useEffect(() => {
    if (ne.current)
      return () => {
        de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null, T.current = !1);
      };
  }, [
    ne.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ W.createElement("section", {
    ref: s,
    "aria-label": `${me} ${re}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, Se.map((q, J) => {
    var ee;
    const [oe, Re] = q.split("-");
    return A.length ? /* @__PURE__ */ W.createElement("ol", {
      key: q,
      dir: P === "auto" ? Nv() : P,
      tabIndex: -1,
      ref: ne,
      className: v,
      "data-sonner-toaster": !0,
      "data-sonner-theme": M,
      "data-y-position": oe,
      "data-x-position": Re,
      style: {
        "--front-toast-height": `${((ee = ce[0]) == null ? void 0 : ee.height) || 0}px`,
        "--width": `${oS}px`,
        "--gap": `${I}px`,
        ...X,
        ...vS(S, h)
      },
      onBlur: (Te) => {
        T.current && !Te.currentTarget.contains(Te.relatedTarget) && (T.current = !1, de.current && (de.current.focus({
          preventScroll: !0
        }), de.current = null));
      },
      onFocus: (Te) => {
        Te.target instanceof HTMLElement && Te.target.dataset.dismissible === "false" || T.current || (T.current = !0, de.current = Te.relatedTarget);
      },
      onMouseEnter: () => qe(!0),
      onMouseMove: () => qe(!0),
      onMouseLeave: () => {
        De || qe(!1);
      },
      onDragEnd: () => qe(!1),
      onPointerDown: (Te) => {
        Te.target instanceof HTMLElement && Te.target.dataset.dismissible === "false" || Le(!0);
      },
      onPointerUp: () => Le(!1)
    }, A.filter((Te) => !Te.position && J === 0 || Te.position === q).map((Te, Ye) => {
      var fa, Aa;
      return /* @__PURE__ */ W.createElement(mS, {
        key: Te.id,
        icons: pe,
        index: Ye,
        toast: Te,
        defaultRichColors: _,
        duration: (fa = $?.duration) != null ? fa : C,
        className: $?.className,
        descriptionClassName: $?.descriptionClassName,
        invert: f,
        visibleToasts: k,
        closeButton: (Aa = $?.closeButton) != null ? Aa : y,
        interacting: De,
        position: q,
        style: $?.style,
        unstyled: $?.unstyled,
        classNames: $?.classNames,
        cancelButtonStyle: $?.cancelButtonStyle,
        actionButtonStyle: $?.actionButtonStyle,
        closeButtonAriaLabel: $?.closeButtonAriaLabel,
        removeToast: H,
        toasts: A.filter((da) => da.position == Te.position),
        heights: ce.filter((da) => da.position == Te.position),
        setHeights: Ue,
        expandByDefault: g,
        gap: I,
        expanded: ve,
        swipeDirections: r.swipeDirections
      });
    })) : null;
  }));
});
var gS = { primary: "_1c3b6fr1 _1c3b6fr0", secondary: "_1c3b6fr2 _1c3b6fr0", ghost: "_1c3b6fr3 _1c3b6fr0", danger: "_1c3b6fr4 _1c3b6fr0" }, pS = { sm: "_1c3b6fr5", md: "_1c3b6fr6", lg: "_1c3b6fr7" }, bS = "_1c3b6fr9";
function en({
  variant: n = "primary",
  size: r = "md",
  type: s = "button",
  loading: o = !1,
  disabled: f,
  children: d,
  className: m,
  ...g
}) {
  const y = [gS[n], pS[r], m].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs(
    "button",
    {
      type: s,
      className: y,
      disabled: o || f,
      "aria-busy": o || void 0,
      ...g,
      children: [
        o ? /* @__PURE__ */ b.jsx("span", { className: bS, "aria-hidden": "true" }) : null,
        d
      ]
    }
  );
}
var SS = "gy73ua0", ES = "gy73ua1", xS = "gy73ua2", RS = "gy73ua3", TS = "gy73ua4", _S = "gy73ua5", wS = "gy73ua6", NS = "gy73ua7", AS = "gy73ua8";
const MS = {
  default: "",
  raised: ES,
  inset: xS
};
function vr({
  eyebrow: n,
  title: r,
  description: s,
  actions: o,
  children: f,
  className: d,
  elevation: m = "default"
}) {
  const g = [SS, MS[m], d].filter(Boolean).join(" "), y = !!(n || r || o);
  return /* @__PURE__ */ b.jsxs("section", { className: g, children: [
    y && /* @__PURE__ */ b.jsxs("header", { className: RS, children: [
      /* @__PURE__ */ b.jsxs("div", { className: TS, children: [
        n && /* @__PURE__ */ b.jsx("span", { className: wS, children: n }),
        r && /* @__PURE__ */ b.jsx("span", { className: NS, children: r }),
        s && /* @__PURE__ */ b.jsx("span", { className: AS, children: s })
      ] }),
      o && /* @__PURE__ */ b.jsx("div", { className: _S, children: o })
    ] }),
    f
  ] });
}
class Tn extends Error {
  constructor(r, s, o, f) {
    super(o), this.status = r, this.category = s, this.requestId = f, this.name = "ExtensionApiError";
  }
}
const xr = "/api/v1/extensions/nexus.3d.faceavatar";
async function pi(n, r) {
  const s = n.startsWith("http") ? n : `${xr}${n}`, o = await fetch(s, {
    ...r,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...r?.headers ?? {}
    }
  });
  if (!o.ok) {
    let f = null;
    try {
      f = await o.json();
    } catch {
      f = null;
    }
    throw new Tn(
      o.status,
      f?.category ?? "unknown",
      f?.message ?? o.statusText,
      f?.requestId
    );
  }
  if (o.status !== 204)
    return await o.json();
}
function zS(n, r, s) {
  const o = n.startsWith("http") ? n : `${xr}${n}`, f = new EventSource(o);
  return f.onmessage = (d) => {
    if (d.data)
      try {
        r(JSON.parse(d.data));
      } catch {
      }
  }, f.onerror = (d) => {
  }, () => f.close();
}
const DS = {
  seed: 0,
  expression: "neutral",
  texture: !0,
  crop: "bust",
  arc_iters: 600,
  residency: "balanced"
}, hi = {
  seed: 0,
  seam: "neck",
  keep_hair: !0,
  blend_ring: 0.35,
  align: "landmark",
  texture_blend: !0,
  arc_iters: 600,
  residency: "balanced"
}, gi = [
  "fit",
  "align",
  "weld",
  "texture",
  "glb"
];
function Wc() {
  const n = {};
  for (const r of gi) n[r] = "idle";
  return n;
}
const yi = {
  phase: "idle",
  stage: null,
  step: 0,
  totalSteps: 0,
  overallFraction: 0,
  stageStates: Wc(),
  glbRef: null,
  thumbnailRef: null,
  inputImageRef: null,
  metadata: null,
  errorCode: null,
  errorMessage: null
};
function Vu(n = null) {
  return {
    ...yi,
    stageStates: Wc(),
    phase: "running",
    inputImageRef: n
  };
}
function Ic(n) {
  return gi.includes(n);
}
function CS(n, r) {
  if (!Ic(r)) return n;
  const s = { ...n };
  let o = !1;
  for (const f of gi)
    f === r ? (s[f] = "active", o = !0) : o || (s[f] = "done");
  return s;
}
function jS(n, r, s) {
  const o = s > 0 ? Math.min(1, r / s) : 0, f = Ic(n) ? gi.indexOf(n) : 0, d = 1 / gi.length;
  return Math.min(0.99, d * (f + o));
}
function OS(n, r) {
  switch (r.method) {
    case "faceavatar.generate.progress": {
      const { stage: s, step: o, total: f } = r.params, d = jS(s, o, f);
      return {
        ...n,
        phase: "running",
        stage: s,
        step: o,
        totalSteps: f,
        overallFraction: Math.max(n.overallFraction, d),
        stageStates: CS(n.stageStates, s)
      };
    }
    case "faceavatar.generate.done": {
      const s = Wc();
      for (const o of gi) s[o] = "done";
      return {
        ...n,
        phase: "done",
        overallFraction: 1,
        stageStates: s,
        glbRef: r.params.glbRef,
        thumbnailRef: null,
        metadata: r.params.metadata ?? null
      };
    }
    case "faceavatar.generate.error": {
      const s = { ...n.stageStates };
      return n.stage && Ic(n.stage) && (s[n.stage] = "error"), {
        ...n,
        phase: "error",
        stageStates: s,
        errorCode: r.params.code,
        errorMessage: r.params.message
      };
    }
    default:
      return n;
  }
}
function Av(n) {
  return { ...n, phase: "cancelled" };
}
async function US(n) {
  return pi("/generate/start", {
    method: "POST",
    body: JSON.stringify(n)
  });
}
async function LS(n) {
  return pi(`/generate/jobs/${encodeURIComponent(n)}/cancel`, {
    method: "POST",
    body: "{}"
  });
}
function BS(n, r, s) {
  return zS(
    `/generate/jobs/${encodeURIComponent(n)}/events`,
    r
  );
}
async function HS(n) {
  return pi("/graft/start", {
    method: "POST",
    body: JSON.stringify(n)
  });
}
async function GS(n = 25) {
  return pi(`/generate/jobs?limit=${n}`);
}
async function Mv(n) {
  return pi(`/generate/jobs/${encodeURIComponent(n)}`);
}
async function qS(n) {
  await pi(`/generate/jobs/${encodeURIComponent(n)}`, { method: "DELETE" });
}
const Pc = "nexus.3d.faceavatar.active-job";
function zv(n) {
  try {
    sessionStorage.setItem(Pc, JSON.stringify({ jobId: n }));
  } catch {
  }
}
function Bu() {
  try {
    sessionStorage.removeItem(Pc);
  } catch {
  }
}
function gc() {
  try {
    const n = sessionStorage.getItem(Pc);
    if (!n) return null;
    const r = JSON.parse(n);
    return typeof r.jobId == "string" ? r.jobId : null;
  } catch {
    return null;
  }
}
function pc(n) {
  return n.status === "succeeded" ? {
    ...yi,
    phase: "done",
    overallFraction: 1,
    glbRef: n.glbRef,
    thumbnailRef: null,
    inputImageRef: n.inputImageRef,
    metadata: n.metadata
  } : n.status === "failed" ? {
    ...yi,
    phase: "error",
    errorCode: n.errorCode,
    errorMessage: n.errorMessage
  } : n.status === "cancelled" ? { ...yi, phase: "cancelled" } : Vu();
}
const Yy = E.createContext(null);
function YS({ children: n }) {
  const [r, s] = E.useState(() => ({ ...DS })), [o, f] = E.useState(null), [d, m] = E.useState(null), [g, y] = E.useState(yi), v = E.useRef(null), S = E.useRef(g);
  S.current = g;
  const h = E.useCallback((te) => {
    v.current?.(), v.current = BS(te, (F) => {
      y((A) => OS(A, F));
    });
  }, []), D = E.useCallback(
    (te, F) => {
      s((A) => ({ ...A, [te]: F }));
    },
    []
  ), _ = E.useCallback((te) => {
    s((F) => ({ ...F, ...te }));
  }, []), C = E.useCallback((te, F) => {
    f(te), m(F);
  }, []), X = E.useCallback(() => {
    f(null), m(null);
  }, []), k = E.useCallback(() => {
    v.current?.(), v.current = null, Bu(), y(yi);
  }, []), $ = E.useCallback(async () => {
    if (!o) return;
    v.current?.();
    const te = { image: o, params: r }, { jobId: F } = await US(te);
    y(Vu(o)), zv(F), h(F);
  }, [o, r, h]), P = E.useCallback(
    async (te, F, A) => {
      v.current?.();
      const Se = { base_mesh: te, image: F, params: A }, { jobId: ce } = await HS(Se);
      y(Vu(F)), zv(ce), h(ce);
    },
    [h]
  ), I = E.useCallback(async () => {
    const te = gc();
    if (!te) {
      y((A) => Av(A));
      return;
    }
    const { status: F } = await LS(te);
    F !== "cancelling" && (v.current?.(), v.current = null, Bu(), y((A) => Av(A)));
  }, []), pe = E.useCallback(async (te) => {
    v.current?.(), v.current = null;
    try {
      const F = await Mv(te.id);
      y(pc(F));
    } catch {
      y(pc(te));
    }
  }, []);
  E.useEffect(() => {
    (g.phase === "done" || g.phase === "error" || g.phase === "cancelled") && Bu();
  }, [g.phase]), E.useEffect(() => {
    const te = () => {
      if (S.current.phase !== "running") return;
      const ce = gc();
      ce && h(ce);
    }, F = () => {
      document.visibilityState === "visible" && te();
    }, A = () => te();
    return document.addEventListener("visibilitychange", F), window.addEventListener("focus", A), () => {
      document.removeEventListener("visibilitychange", F), window.removeEventListener("focus", A);
    };
  }, [h]), E.useEffect(() => {
    const te = gc();
    if (!te) return;
    let F = !1;
    return Mv(te).then((A) => {
      if (!F) {
        if (A.status === "queued" || A.status === "running") {
          y(Vu()), h(te);
          return;
        }
        Bu(), y(pc(A));
      }
    }).catch(() => {
    }), () => {
      F = !0;
    };
  }, [h]), E.useEffect(() => () => {
    v.current?.(), v.current = null;
  }, []);
  const me = E.useMemo(
    () => ({
      params: r,
      imageRef: o,
      imageName: d,
      generate: g,
      updateParam: D,
      applyParams: _,
      setImage: C,
      clearImage: X,
      startJob: $,
      startGraft: P,
      cancelJob: I,
      resetGenerate: k,
      showJobResult: pe
    }),
    [
      r,
      o,
      d,
      g,
      D,
      _,
      C,
      X,
      $,
      P,
      I,
      k,
      pe
    ]
  );
  return /* @__PURE__ */ b.jsx(Yy.Provider, { value: me, children: n });
}
function Rr() {
  const n = E.useContext(Yy);
  if (!n)
    throw new Error("useGenerateRequest must be used within GenerateRequestProvider");
  return n;
}
function XS() {
  const { imageRef: n, generate: r, startJob: s, cancelJob: o } = Rr(), f = !n, d = r.phase === "running", m = E.useCallback(async () => {
    if (f) {
      qa.error("Upload an input image before generating.");
      return;
    }
    try {
      await s(), qa.success("Generation started.");
    } catch (y) {
      const v = y instanceof Tn ? y.message : "Could not start the generation.";
      qa.error(v);
    }
  }, [f, s]), g = E.useCallback(async () => {
    try {
      await o();
    } catch {
      qa.error("Could not cancel the generation.");
    }
  }, [o]);
  return E.useEffect(() => B1(() => void m()), [m]), E.useEffect(() => {
    L1({ busy: d, blocked: f });
  }, [d, f]), { blocked: f, busy: d, submit: m, cancel: g };
}
function Xy(n) {
  const [r, s] = E.useState([]), [o, f] = E.useState(!0), [d, m] = E.useState(0), g = E.useCallback(() => m((v) => v + 1), []), y = E.useCallback(async (v) => {
    s((S) => S.filter((h) => h.id !== v)), await qS(v);
  }, []);
  return E.useEffect(() => {
    let v = !1;
    return f(!0), GS().then((S) => {
      v || s(S.jobs);
    }).catch(() => {
    }).finally(() => {
      v || f(!1);
    }), () => {
      v = !0;
    };
  }, [d, n]), { jobs: r, loading: o, reload: g, remove: y };
}
var VS = "_17ga1mb0", QS = "_17ga1mb1", ZS = "_17ga1mb2", kS = "_17ga1mb3", Vy = "_17ga1mb4", KS = "_17ga1mb5", JS = "_17ga1mb7 _17ga1mb6", $S = "_17ga1mb8 _17ga1mb6", Dv = "_17ga1mb9", FS = "_17ga1mba", WS = "_17ga1mbb", IS = "_17ga1mbc", PS = "_17ga1mbd";
function Cv({
  spec: n,
  value: r,
  error: s,
  onChange: o,
  disabled: f = !1
}) {
  const d = E.useId(), m = `${d}-help`, g = s ? `${d}-error` : m;
  return /* @__PURE__ */ b.jsxs("div", { className: VS, children: [
    /* @__PURE__ */ b.jsxs("div", { className: QS, children: [
      /* @__PURE__ */ b.jsx("label", { className: ZS, htmlFor: d, children: n.label }),
      n.control === "slider" && /* @__PURE__ */ b.jsx("span", { className: kS, children: tE(r, n.step) })
    ] }),
    eE(n, r, o, d, g, s !== void 0, f),
    /* @__PURE__ */ b.jsx("span", { id: m, className: Vy, children: n.help }),
    s && /* @__PURE__ */ b.jsx("span", { id: `${d}-error`, role: "alert", className: KS, children: s })
  ] });
}
function eE(n, r, s, o, f, d, m) {
  switch (n.control) {
    case "toggle": {
      const g = !!r;
      return /* @__PURE__ */ b.jsxs("div", { className: WS, children: [
        /* @__PURE__ */ b.jsx(
          "button",
          {
            type: "button",
            id: o,
            role: "switch",
            "aria-checked": g,
            "aria-describedby": f,
            disabled: m,
            className: IS,
            onClick: () => s(!g),
            children: /* @__PURE__ */ b.jsx("span", { className: PS, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: Vy, children: g ? "On" : "Off" })
      ] });
    }
    case "select":
      return /* @__PURE__ */ b.jsx(
        "select",
        {
          id: o,
          "aria-describedby": f,
          "aria-invalid": d || void 0,
          disabled: m,
          className: [$S, d ? Dv : ""].filter(Boolean).join(" "),
          value: String(r ?? n.default ?? ""),
          onChange: (g) => s(n.numeric ? Number(g.target.value) : g.target.value),
          children: n.options?.map((g) => /* @__PURE__ */ b.jsx("option", { value: g.value, children: g.label }, g.value))
        }
      );
    case "slider": {
      const g = jv(r, n), y = n.min ?? 0, v = n.max ?? 100, h = { "--faceavatar-slider-fill": `${v > y ? (g - y) / (v - y) * 100 : 0}%` };
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: o,
          type: "range",
          "aria-describedby": f,
          "aria-invalid": d || void 0,
          disabled: m,
          className: FS,
          style: h,
          min: n.min,
          max: n.max,
          step: n.step,
          value: g,
          onChange: (D) => s(Number(D.target.value))
        }
      );
    }
    default:
      return /* @__PURE__ */ b.jsx(
        "input",
        {
          id: o,
          type: "number",
          inputMode: "numeric",
          "aria-describedby": f,
          "aria-invalid": d || void 0,
          disabled: m,
          className: [JS, d ? Dv : ""].filter(Boolean).join(" "),
          min: n.min,
          max: n.max,
          step: n.step,
          value: jv(r, n),
          onChange: (g) => s(Number(g.target.value))
        }
      );
  }
}
function jv(n, r) {
  return typeof n == "number" && Number.isFinite(n) ? n : typeof r.default == "number" ? r.default : r.min ?? 0;
}
function tE(n, r) {
  return typeof n != "number" ? "—" : r === void 0 || r >= 1 ? Number.isInteger(n) ? String(n) : n.toFixed(2) : n.toFixed(r >= 0.1 ? 1 : 2);
}
const Qy = [
  {
    key: "seed",
    label: "Seed",
    help: "Deterministic seed. 0 draws a fresh fit each run.",
    control: "number",
    min: 0,
    max: 2147483647,
    step: 1,
    default: 0
  },
  {
    key: "expression",
    label: "Expression",
    help: "Neutral resets the FLAME expression; Source copies the photo's expression.",
    control: "select",
    default: "neutral",
    options: [
      { value: "neutral", label: "Neutral" },
      { value: "source", label: "From photo" }
    ]
  },
  {
    key: "crop",
    label: "Crop",
    help: "Bust includes the neck/shoulders; Head is tighter to the face.",
    control: "select",
    default: "bust",
    options: [
      { value: "bust", label: "Bust" },
      { value: "head", label: "Head only" }
    ]
  },
  {
    key: "arc_iters",
    label: "Identity iters",
    help: "Arc2Avatar per-photo optimization steps. More = sharper identity, slower.",
    control: "slider",
    min: 100,
    max: 1500,
    step: 50,
    default: 600,
    advanced: !0
  },
  {
    key: "residency",
    label: "Residency",
    help: "Balanced keeps weights resident; Low VRAM offloads between stages.",
    control: "select",
    default: "balanced",
    advanced: !0,
    options: [
      { value: "balanced", label: "Balanced" },
      { value: "low_vram", label: "Low VRAM" }
    ]
  }
], aE = Qy.filter(
  (n) => !n.advanced
), lE = Qy.filter(
  (n) => n.advanced
);
function nE(n, r) {
  return n.gate ? n.gate.in.includes(String(r[n.gate.key])) : !0;
}
const iE = [{ id: "fast", label: "Fast", hint: "Quick identity pass", params: { arc_iters: 250, crop: "bust", expression: "neutral" } }, { id: "balanced", label: "Balanced", hint: "Default quality", params: { arc_iters: 600, crop: "bust", expression: "neutral" } }, { id: "max", label: "Max identity", hint: "Sharpest likeness", params: { arc_iters: 1200, crop: "bust", expression: "source" } }], rE = {
  presets: iE
}, uE = ["arc_iters", "crop", "expression"], Zy = rE.presets.map((n) => ({
  id: n.id,
  label: n.label,
  hint: n.hint,
  params: n.params
}));
function sE(n) {
  for (const r of Zy)
    if (uE.every((s) => n[s] === r.params[s]))
      return r.id;
  return null;
}
var oE = "vsm0490", cE = "vsm0491", fE = "vsm0492", dE = "vsm0493", hE = "vsm0494", mE = "vsm0495", vE = "vsm0496", yE = "vsm0497", gE = "vsm0498";
function pE(n, r) {
  const s = r.split(",").map((d) => d.trim().toLowerCase()).filter(Boolean);
  if (s.length === 0) return !0;
  const o = n.name.toLowerCase(), f = n.type.toLowerCase();
  return s.some((d) => d.startsWith(".") ? o.endsWith(d) : d.endsWith("/*") ? f.startsWith(d.slice(0, -1)) : f === d);
}
function bE(n, r, s) {
  return r && !pE(n, r) ? `"${n.name}" is not an accepted file type.` : s !== void 0 && n.size > s ? `"${n.name}" exceeds the maximum size.` : null;
}
function SE({
  accept: n,
  maxSizeBytes: r,
  disabled: s = !1,
  label: o,
  hint: f,
  ariaLabel: d,
  className: m,
  renderPreview: g,
  onFile: y
}) {
  const v = E.useRef(null), S = E.useId(), h = E.useId(), [D, _] = E.useState(!1), [C, X] = E.useState(null), [k, $] = E.useState(null), P = E.useCallback(
    (ce) => {
      const Ue = ce?.[0];
      if (!Ue) return;
      const ve = bE(Ue, n, r);
      if (ve) {
        X(ve);
        return;
      }
      X(null), $(Ue), y(Ue);
    },
    [n, r, y]
  ), I = E.useCallback(() => {
    s || v.current?.click();
  }, [s]), pe = E.useCallback(
    (ce) => {
      s || (ce.key === "Enter" || ce.key === " ") && (ce.preventDefault(), I());
    },
    [s, I]
  ), me = E.useCallback(
    (ce) => {
      ce.preventDefault(), _(!1), !s && P(ce.dataTransfer.files);
    },
    [s, P]
  ), te = E.useCallback(
    (ce) => {
      ce.preventDefault(), s || _(!0);
    },
    [s]
  ), F = E.useCallback((ce) => {
    ce.preventDefault(), _(!1);
  }, []), A = [f ? h : null, C ? S : null].filter(Boolean).join(" "), Se = [
    oE,
    D ? cE : "",
    s ? fE : "",
    C !== null ? dE : "",
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { children: [
    /* @__PURE__ */ b.jsxs(
      "div",
      {
        role: "button",
        tabIndex: s ? -1 : 0,
        "aria-label": d ?? "image dropzone",
        "aria-disabled": s,
        "aria-describedby": A || void 0,
        className: Se,
        onClick: I,
        onKeyDown: pe,
        onDrop: me,
        onDragOver: te,
        onDragLeave: F,
        children: [
          /* @__PURE__ */ b.jsx(
            "input",
            {
              ref: v,
              type: "file",
              className: hE,
              accept: n,
              disabled: s,
              tabIndex: -1,
              onChange: (ce) => P(ce.target.files)
            }
          ),
          g && k ? /* @__PURE__ */ b.jsx("div", { className: gE, children: g(k) }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
            /* @__PURE__ */ b.jsx("span", { className: mE, children: o ?? (D ? "Drop to upload" : "Drop an image or click to browse") }),
            f && /* @__PURE__ */ b.jsx("span", { id: h, className: vE, children: f })
          ] })
        ]
      }
    ),
    C && /* @__PURE__ */ b.jsx("div", { id: S, role: "alert", className: yE, children: C })
  ] });
}
function EE(n) {
  const [r, s] = E.useState(null);
  return E.useEffect(() => {
    if (!n) {
      s(null);
      return;
    }
    const o = URL.createObjectURL(n);
    return s(o), () => URL.revokeObjectURL(o);
  }, [n]), r;
}
async function xE(n) {
  const r = new FormData();
  r.append("file", n);
  const s = await fetch(`${xr}/uploads`, { method: "POST", body: r });
  if (!s.ok) {
    let o = null;
    try {
      o = await s.json();
    } catch {
      o = null;
    }
    throw new Tn(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  return await s.json();
}
var RE = "_1tj7cwb0", TE = "_1tj7cwb1", _E = "_1tj7cwb2", wE = "_1tj7cwb3", NE = "_1tj7cwb4", AE = "_1tj7cwb5", ME = "_1tj7cwb7";
const zE = 32 * 1024 * 1024, DE = "image/png,image/jpeg,image/webp";
function ky() {
  const { imageRef: n, imageName: r, setImage: s, clearImage: o } = Rr(), [f, d] = E.useState(null), [m, g] = E.useState(!1), y = EE(f), v = E.useCallback(
    async (h) => {
      d(h), g(!0);
      try {
        const { ref: D } = await xE(h);
        s(D, h.name);
      } catch (D) {
        const _ = D instanceof Tn ? D.message : "Upload failed — try again.";
        qa.error(_), d(null);
      } finally {
        g(!1);
      }
    },
    [s]
  ), S = E.useCallback(() => {
    d(null), o();
  }, [o]);
  return n && r ? /* @__PURE__ */ b.jsx("div", { className: RE, children: /* @__PURE__ */ b.jsxs("div", { className: TE, children: [
    y ? /* @__PURE__ */ b.jsx("img", { className: _E, src: y, alt: r }) : null,
    /* @__PURE__ */ b.jsxs("div", { className: wE, children: [
      /* @__PURE__ */ b.jsx("span", { className: NE, children: r }),
      /* @__PURE__ */ b.jsx("span", { className: AE, children: n })
    ] }),
    /* @__PURE__ */ b.jsx(en, { variant: "ghost", size: "sm", onClick: S, children: "Replace" })
  ] }) }) : /* @__PURE__ */ b.jsx(
    SE,
    {
      accept: DE,
      maxSizeBytes: zE,
      disabled: m,
      ariaLabel: "input image",
      label: m ? "Uploading…" : "Drop an image or click to browse",
      hint: "PNG, JPEG or WebP · single subject on a clean background works best",
      onFile: (h) => void v(h),
      renderPreview: (h) => y ? /* @__PURE__ */ b.jsx("img", { className: ME, src: y, alt: h.name }) : null
    }
  );
}
var CE = "f2qq300", jE = "f2qq301", OE = "f2qq302", UE = "f2qq303", LE = "f2qq304", BE = "f2qq305", HE = "f2qq306", GE = "f2qq307", qE = "f2qq308", YE = "f2qq309";
function XE({ presets: n, activeId: r, disabled: s, onApply: o }) {
  const [f, d] = E.useState(!1), m = E.useRef(null), g = n.find((y) => y.id === r)?.label ?? "Custom";
  return E.useEffect(() => {
    if (!f) return;
    function y(v) {
      m.current && !m.current.contains(v.target) && d(!1);
    }
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [f]), /* @__PURE__ */ b.jsxs("div", { className: CE, ref: m, children: [
    /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        className: jE,
        disabled: s,
        "aria-haspopup": "menu",
        "aria-expanded": f,
        onClick: () => d((y) => !y),
        children: [
          /* @__PURE__ */ b.jsx("span", { className: OE, "aria-hidden": "true", children: "tune" }),
          /* @__PURE__ */ b.jsx("span", { className: UE, children: "Presets" }),
          /* @__PURE__ */ b.jsx("span", { className: LE, children: g }),
          /* @__PURE__ */ b.jsx("span", { className: BE, "data-open": f, "aria-hidden": "true", children: "expand_more" })
        ]
      }
    ),
    f && /* @__PURE__ */ b.jsx("div", { className: HE, role: "menu", "aria-label": "Quality presets", children: n.map((y) => /* @__PURE__ */ b.jsxs(
      "button",
      {
        type: "button",
        role: "menuitemradio",
        "aria-checked": y.id === r,
        className: GE,
        "data-active": y.id === r,
        disabled: s,
        onClick: () => {
          o(y), d(!1);
        },
        children: [
          /* @__PURE__ */ b.jsx("span", { className: qE, children: y.label }),
          /* @__PURE__ */ b.jsx("span", { className: YE, children: y.hint })
        ]
      },
      y.id
    )) })
  ] });
}
var VE = "_1dsr1910", bc = "_1dsr1911", Ov = "_1dsr1912", QE = "_1dsr1913", ZE = "_1dsr1914", kE = "_1dsr1915", KE = "_1dsr1916", JE = "_1dsr1917", $E = "_1dsr1918", FE = "_1dsr1919", WE = "_1dsr191a", IE = "_1dsr191b", PE = "_1dsr191c", ex = "_1dsr191d";
const tx = /* @__PURE__ */ new Set(["expression", "crop", "residency"]);
function ax() {
  const { params: n, generate: r, updateParam: s, applyParams: o } = Rr(), f = r.phase === "running", [d, m] = E.useState(!1), g = E.useId(), y = sE(n);
  return /* @__PURE__ */ b.jsxs("div", { className: VE, children: [
    /* @__PURE__ */ b.jsx("span", { className: bc, children: "Input photo" }),
    /* @__PURE__ */ b.jsx(ky, {}),
    /* @__PURE__ */ b.jsx("span", { className: bc, children: "Identity preset" }),
    /* @__PURE__ */ b.jsx(
      XE,
      {
        presets: Zy,
        activeId: y,
        disabled: f,
        onApply: (S) => o(S.params)
      }
    ),
    /* @__PURE__ */ b.jsx("span", { className: bc, children: "Generation" }),
    /* @__PURE__ */ b.jsx("div", { className: Ov, children: aE.map((S) => /* @__PURE__ */ b.jsx(
      Cv,
      {
        spec: S,
        value: n[S.key],
        disabled: f,
        onChange: (h) => v(S.key, h)
      },
      S.key
    )) }),
    /* @__PURE__ */ b.jsxs("div", { className: QE, children: [
      /* @__PURE__ */ b.jsxs("div", { className: ZE, children: [
        /* @__PURE__ */ b.jsx("span", { className: kE, children: "Project photo as texture" }),
        /* @__PURE__ */ b.jsx("span", { className: KE, children: "On back-projects the real photo onto the head for likeness. Off exports an untextured FLAME head." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": !!n.texture,
          "aria-label": "Project photo as texture",
          disabled: f,
          className: JE,
          onClick: () => s("texture", !n.texture),
          children: /* @__PURE__ */ b.jsx("span", { className: $E, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("section", { className: FE, children: [
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          type: "button",
          className: IE,
          "aria-expanded": d,
          "aria-controls": g,
          onClick: () => m((S) => !S),
          children: [
            /* @__PURE__ */ b.jsx("span", { className: PE, children: "Advanced / Quality" }),
            /* @__PURE__ */ b.jsx("span", { className: ex, "data-open": d, "aria-hidden": "true", children: "expand_more" })
          ]
        }
      ),
      d && /* @__PURE__ */ b.jsx("div", { id: g, className: WE, children: /* @__PURE__ */ b.jsx("div", { className: Ov, children: lE.map((S) => /* @__PURE__ */ b.jsx(
        Cv,
        {
          spec: S,
          value: n[S.key],
          disabled: f || !nE(S, n),
          onChange: (h) => v(S.key, h)
        },
        S.key
      )) }) })
    ] })
  ] });
  function v(S, h) {
    if (tx.has(S) && typeof h == "string") {
      s(S, h);
      return;
    }
    typeof h == "number" && s(S, h);
  }
}
var lx = "_1unwwa10", nx = "_1unwwa11", ix = "_1unwwa12";
function Cc({ title: n, detail: r, action: s, className: o }) {
  const f = [lx, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsxs("div", { className: f, children: [
    /* @__PURE__ */ b.jsx("span", { className: nx, children: n }),
    r && /* @__PURE__ */ b.jsx("span", { className: ix, children: r }),
    s
  ] });
}
const Uv = {
  1: {
    title: "Worker failed to start",
    hint: "The Face Avatar worker could not launch. Check that the backend is installed and the GPU is available."
  },
  2: {
    title: "Input image rejected",
    hint: "The uploaded photo could not be decoded. Use a PNG or JPEG with a clear, front-facing face."
  },
  73: {
    title: "Out of GPU memory",
    hint: "The Face Avatar worker ran out of VRAM. Lower the identity iters or switch residency to Low VRAM."
  }
};
function rx(n, r) {
  return n !== null && Uv[n] ? Uv[n] : {
    title: "Generation failed",
    hint: r ?? "The worker reported an unexpected error. Check the logs and try again."
  };
}
var Sc = "xrzg940", ux = "xrzg941", sx = "xrzg943", ox = "xrzg944", cx = "xrzg945", fx = "xrzg946", dx = "xrzg947", hx = "xrzg948", mx = "xrzg949", vx = "xrzg94a", Qu = "xrzg94b", yx = "xrzg94c", gx = "xrzg94d", px = "xrzg94e", bx = "xrzg94f", Sx = "xrzg94g", Ex = "xrzg94h", xx = "xrzg94i", Rx = "xrzg94j", Tx = "xrzg94k", _x = "xrzg94l", wx = "xrzg94m", Nx = "xrzg94n";
const Ax = {
  fit: "Fitting identity (Arc2Avatar)…",
  align: "Aligning to base mesh…",
  weld: "Welding face shell…",
  texture: "Projecting photo texture…",
  glb: "Exporting GLB…"
};
function Ky({
  state: n,
  onCancel: r,
  onReset: s
}) {
  const [o, f] = E.useState(!1);
  E.useEffect(() => {
    n.phase !== "running" && f(!1);
  }, [n.phase]);
  const d = E.useCallback(() => {
    f(!0), r();
  }, [r]);
  if (n.phase === "idle")
    return /* @__PURE__ */ b.jsx(
      Cc,
      {
        title: "No active generation",
        detail: "Upload an input image and start a generation to see live progress here."
      }
    );
  if (n.phase === "error") {
    const g = rx(n.errorCode, n.errorMessage);
    return /* @__PURE__ */ b.jsxs("div", { className: Sc, children: [
      /* @__PURE__ */ b.jsxs("div", { className: yx, role: "alert", children: [
        /* @__PURE__ */ b.jsx("span", { className: gx, children: g.title }),
        /* @__PURE__ */ b.jsx("span", { className: px, children: g.hint })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: Qu, children: /* @__PURE__ */ b.jsx(en, { variant: "secondary", onClick: s, children: "Dismiss" }) })
    ] });
  }
  if (n.phase === "cancelled")
    return /* @__PURE__ */ b.jsxs("div", { className: Sc, children: [
      /* @__PURE__ */ b.jsx(
        Cc,
        {
          title: "Generation cancelled",
          detail: "The generation was stopped before completion."
        }
      ),
      /* @__PURE__ */ b.jsx("div", { className: Qu, children: /* @__PURE__ */ b.jsx(en, { variant: "secondary", onClick: s, children: "Reset" }) })
    ] });
  if (n.phase === "done")
    return /* @__PURE__ */ b.jsx(Mx, { state: n, onReset: s });
  const m = Math.round(n.overallFraction * 100);
  return /* @__PURE__ */ b.jsxs("div", { className: Sc, children: [
    /* @__PURE__ */ b.jsxs("output", { className: ux, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx("span", { className: sx, "aria-hidden": "true" }),
      zx(n)
    ] }),
    /* @__PURE__ */ b.jsx(
      "div",
      {
        className: ox,
        role: "progressbar",
        "aria-label": "overall progress",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": m,
        children: /* @__PURE__ */ b.jsx(
          "div",
          {
            className: cx,
            style: { transform: `scaleX(${Math.max(0.02, n.overallFraction)})` }
          }
        )
      }
    ),
    /* @__PURE__ */ b.jsxs("div", { className: fx, "aria-live": "polite", children: [
      /* @__PURE__ */ b.jsx(Ec, { label: "Overall", value: `${m}%` }),
      /* @__PURE__ */ b.jsx(Ec, { label: "Stage", value: n.stage ? Jy(n.stage) : "—", accent: !0 }),
      /* @__PURE__ */ b.jsx(
        Ec,
        {
          label: "Step",
          value: n.totalSteps ? `${n.step} / ${n.totalSteps}` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsx("div", { className: Qu, children: /* @__PURE__ */ b.jsx(en, { variant: "danger", onClick: d, loading: o, disabled: o, children: o ? "Cancelling…" : "Cancel generation" }) })
  ] });
}
function Mx({
  state: n,
  onReset: r
}) {
  return /* @__PURE__ */ b.jsxs("output", { className: bx, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Sx, children: [
      /* @__PURE__ */ b.jsx("span", { className: Ex, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx("span", { className: xx, children: "Head ready" })
    ] }),
    /* @__PURE__ */ b.jsx("p", { className: Rx, children: "Preview, orbit and download the GLB from the stage above." }),
    /* @__PURE__ */ b.jsx(Dx, { metadata: n.metadata, glbRef: n.glbRef }),
    /* @__PURE__ */ b.jsx("div", { className: Qu, children: /* @__PURE__ */ b.jsx(en, { variant: "secondary", onClick: r, children: "New generation" }) })
  ] });
}
function Jy(n) {
  return n.replace(/[_-]+/g, " ");
}
function zx(n) {
  return n.stage ? Ax[n.stage] ?? `${Jy(n.stage)}…` : "Starting worker…";
}
function Ec({
  label: n,
  value: r,
  accent: s = !1
}) {
  return /* @__PURE__ */ b.jsxs("div", { className: dx, children: [
    /* @__PURE__ */ b.jsx("span", { className: hx, children: n }),
    /* @__PURE__ */ b.jsx(
      "span",
      {
        className: [mx, s ? vx : ""].filter(Boolean).join(" "),
        children: r
      }
    )
  ] });
}
function Dx({
  metadata: n,
  glbRef: r
}) {
  const s = [];
  if (n) {
    const o = n.mesh?.vertices, f = n.mesh?.faces;
    typeof o == "number" && s.push(["Vertices", o.toLocaleString()]), typeof f == "number" && s.push(["Faces", f.toLocaleString()]), typeof n.textured == "boolean" && s.push(["Texture", n.textured ? "baked" : "none"]), typeof n.identity_score == "number" && s.push(["Identity", n.identity_score.toFixed(2)]), typeof n.attention_backend == "string" && s.push(["Attention", n.attention_backend]), typeof n.compute_cap == "string" && s.push(["Compute cap", n.compute_cap]);
    const d = Cx(n.stage_timings);
    d !== null && s.push(["Duration", `${(d / 1e3).toFixed(1)}s`]), typeof n.sha256 == "string" && s.push(["sha256", `${n.sha256.slice(0, 16)}…`]);
  }
  return r && s.push(["Artifact", r]), s.length === 0 ? null : /* @__PURE__ */ b.jsx("div", { className: Tx, children: s.map(([o, f]) => /* @__PURE__ */ b.jsxs("div", { className: _x, children: [
    /* @__PURE__ */ b.jsx("span", { className: wx, children: o }),
    /* @__PURE__ */ b.jsx("span", { className: Nx, children: f })
  ] }, o)) });
}
function Cx(n) {
  if (!n) return null;
  const r = Object.values(n).filter((s) => typeof s == "number");
  return r.length === 0 ? null : r.reduce((s, o) => s + o, 0);
}
var jx = { neutral: "ohw9fj1 ohw9fj0", accent: "ohw9fj2 ohw9fj0", warning: "ohw9fj3 ohw9fj0", success: "ohw9fj4 ohw9fj0" };
function Ox({ tone: n = "neutral", children: r, className: s }) {
  const o = [jx[n], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ b.jsx("span", { className: o, children: r });
}
function Ku(n) {
  if (!n) return null;
  const r = n.split("/").map(encodeURIComponent).join("/");
  return `${xr}/media/${r}`;
}
var Ux = "_1as5pun0", Lx = "_1as5pun1", Bx = "_1as5pun3", Hx = "_1as5pun4", Gx = "_1as5pun5", qx = "_1as5pun6", Yx = "_1as5pun7", Xx = "_1as5pun8", Vx = "_1as5pun9", Qx = "_1as5punb _1as5puna", Zx = "_1as5punc", kx = "_1as5pund _1as5puna", Kx = "_1as5pune";
const Jx = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral"
};
function $x({ jobs: n, onOpen: r, onDelete: s }) {
  return n.length === 0 ? /* @__PURE__ */ b.jsx(
    Cc,
    {
      title: "No heads yet",
      detail: "Completed generations appear here with their preview, parameters and a GLB download."
    }
  ) : /* @__PURE__ */ b.jsx("div", { className: Ux, children: n.map((o) => {
    const f = Ku(o.glbRef);
    return /* @__PURE__ */ b.jsxs("div", { className: Lx, children: [
      /* @__PURE__ */ b.jsx("span", { className: Bx, "aria-hidden": "true", children: "3D" }),
      /* @__PURE__ */ b.jsxs("button", { type: "button", className: Hx, onClick: () => r(o), children: [
        /* @__PURE__ */ b.jsxs("span", { className: Gx, children: [
          /* @__PURE__ */ b.jsx("span", { className: qx, children: o.id }),
          /* @__PURE__ */ b.jsx("span", { className: Yx, children: Wx(o) })
        ] }),
        /* @__PURE__ */ b.jsxs("span", { className: Xx, children: [
          /* @__PURE__ */ b.jsx(
            "time",
            {
              className: Vx,
              dateTime: o.createdAt,
              title: Ix(o.createdAt),
              children: Px(o.createdAt)
            }
          ),
          /* @__PURE__ */ b.jsx(Ox, { tone: Jx[o.status], children: o.status })
        ] })
      ] }),
      /* @__PURE__ */ b.jsxs(
        "a",
        {
          className: [Qx, f ? "" : Zx].filter(Boolean).join(" "),
          href: f ?? void 0,
          download: f ? `${o.glbRef}.glb` : void 0,
          "aria-disabled": f ? void 0 : !0,
          tabIndex: f ? 0 : -1,
          "aria-label": `Download GLB for ${o.id}`,
          title: "Download GLB",
          children: [
            /* @__PURE__ */ b.jsx("svg", { viewBox: "0 0 24 24", width: "16", height: "16", "aria-hidden": "true", children: /* @__PURE__ */ b.jsx(
              "path",
              {
                d: "M12 3v12m0 0l-4-4m4 4l4-4M5 21h14",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "none"
              }
            ) }),
            /* @__PURE__ */ b.jsx("span", { className: Kx, children: "Download GLB" })
          ]
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          className: kx,
          "aria-label": `Delete ${o.id} from history`,
          title: "Delete from history",
          onClick: () => s(o),
          children: /* @__PURE__ */ b.jsxs("svg", { viewBox: "0 0 24 24", width: "15", height: "15", "aria-hidden": "true", children: [
            /* @__PURE__ */ b.jsx("title", { children: "delete" }),
            /* @__PURE__ */ b.jsx(
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
    ] }, o.id);
  }) });
}
const Fx = E.memo($x);
function Wx(n) {
  const r = n.params, s = [n.kind === "graft" ? "graft" : "generate"];
  typeof r.seed == "number" && s.push(`seed ${r.seed}`), typeof r.arc_iters == "number" && s.push(`${r.arc_iters} iters`);
  const o = n.metadata?.mesh?.faces;
  return typeof o == "number" && s.push(`${o.toLocaleString()} faces`), s.join(" · ") || "—";
}
function Ix(n) {
  const r = new Date(n);
  return Number.isNaN(r.getTime()) ? n : r.toLocaleString();
}
function Px(n) {
  const r = new Date(n), s = r.getTime();
  if (Number.isNaN(s)) return "";
  const o = Date.now() - s;
  if (o < 0) return "just now";
  const f = Math.floor(o / 6e4);
  if (f < 1) return "just now";
  if (f < 60) return `${f}m ago`;
  const d = Math.floor(f / 60);
  if (d < 24) return `${d}h ago`;
  const m = Math.floor(d / 24);
  return m < 7 ? `${m}d ago` : r.toLocaleDateString();
}
var e2 = "_1ec7xm60", t2 = "_1ec7xm61", a2 = "_1ec7xm63", l2 = "_1ec7xm64", n2 = "_1ec7xm65", i2 = "_1ec7xm66 _1ec7xm65", r2 = "_1ec7xm67", u2 = "_1ec7xm68", s2 = "_1ec7xm69", o2 = "_1ec7xm6a", c2 = "_1ec7xm6b", f2 = "_1ec7xm6c", d2 = "_1ec7xm6e _1ec7xm6d", h2 = "_1ec7xm6f _1ec7xm6d";
const m2 = ["neutral", "aces"], v2 = {
  neutral: "Neutral",
  aces: "ACES"
}, y2 = 0.4, g2 = 2, p2 = 1;
function jc({ url: n, alt: r, className: s }) {
  const [o, f] = E.useState(
    () => typeof customElements < "u" && !!customElements.get("model-viewer")
  ), [d, m] = E.useState(!1), [g, y] = E.useState(p2), [v, S] = E.useState("neutral"), h = E.useRef(null), D = E.useId();
  return E.useEffect(() => {
    let _ = !1;
    if (!o)
      return import("./model-viewer-CRo-xH2b.js").then(() => {
        _ || f(!0);
      }).catch(() => {
      }), () => {
        _ = !0;
      };
  }, [o]), E.useEffect(() => {
    m(!1);
    const _ = h.current;
    if (!o || !_ || _.getAttribute("src") !== n) return;
    const C = () => m(!0);
    return _.addEventListener("load", C), () => _.removeEventListener("load", C);
  }, [o, n]), /* @__PURE__ */ b.jsxs("div", { className: [e2, s].filter(Boolean).join(" "), children: [
    o ? /* @__PURE__ */ b.jsx(
      "model-viewer",
      {
        ref: h,
        className: t2,
        src: n,
        alt: r,
        "camera-controls": !0,
        "auto-rotate": !0,
        "environment-image": "neutral",
        "tone-mapping": v,
        "shadow-intensity": "1",
        exposure: g.toFixed(2)
      }
    ) : null,
    o && d ? /* @__PURE__ */ b.jsxs("div", { className: l2, children: [
      /* @__PURE__ */ b.jsxs("div", { className: [n2, u2].join(" "), children: [
        /* @__PURE__ */ b.jsx("label", { className: s2, htmlFor: D, children: "Exposure" }),
        /* @__PURE__ */ b.jsx(
          "input",
          {
            id: D,
            className: c2,
            type: "range",
            min: y2,
            max: g2,
            step: 0.05,
            value: g,
            onChange: (_) => y(Number(_.target.value))
          }
        ),
        /* @__PURE__ */ b.jsx("span", { className: o2, children: g.toFixed(2) })
      ] }),
      /* @__PURE__ */ b.jsxs("fieldset", { className: i2, children: [
        /* @__PURE__ */ b.jsx("legend", { className: r2, children: "Tone" }),
        /* @__PURE__ */ b.jsx("div", { className: f2, children: m2.map((_) => {
          const C = _ === v;
          return /* @__PURE__ */ b.jsx(
            "button",
            {
              type: "button",
              className: C ? h2 : d2,
              "aria-pressed": C,
              onClick: () => S(_),
              children: v2[_]
            },
            _
          );
        }) })
      ] })
    ] }) : null,
    o && d ? null : /* @__PURE__ */ b.jsx("span", { className: a2, "aria-hidden": "true", children: "Loading mesh…" })
  ] });
}
var b2 = "mh0c2i0", S2 = "mh0c2i1", E2 = "mh0c2i2", x2 = "mh0c2i3", R2 = "mh0c2i4", T2 = "mh0c2i5", _2 = "mh0c2i6", w2 = "mh0c2i7", N2 = "mh0c2i8", A2 = "mh0c2i9", M2 = "mh0c2ib", Lv = "mh0c2ic", z2 = "mh0c2id", D2 = "mh0c2ie", C2 = "mh0c2if", j2 = "mh0c2ig", O2 = "mh0c2ih", U2 = "mh0c2ii", L2 = "mh0c2ij", B2 = "mh0c2ik", H2 = "mh0c2il", G2 = "mh0c2im", q2 = "mh0c2in", Bv = "mh0c2io", Y2 = "mh0c2ip", Hv = "mh0c2iq", X2 = "mh0c2ir";
function V2({ state: n }) {
  const r = n.phase === "done" ? Ku(n.glbRef) : null, s = Q2(n.phase), o = Z2(n), f = n.glbRef ? `${n.glbRef}.glb` : "head.glb";
  return /* @__PURE__ */ b.jsxs("section", { className: b2, "aria-label": "Head preview", children: [
    /* @__PURE__ */ b.jsx("div", { className: S2, children: r ? /* @__PURE__ */ b.jsx(jc, { url: r, alt: "Generated 3D head preview", className: E2 }) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
      /* @__PURE__ */ b.jsx("div", { className: x2, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsx("span", { className: R2, children: "OUTPUT · GLB HEAD" }),
      /* @__PURE__ */ b.jsxs("div", { className: T2, children: [
        /* @__PURE__ */ b.jsx("span", { className: _2, "aria-hidden": "true", children: "deployed_code" }),
        /* @__PURE__ */ b.jsx("span", { className: w2, children: s.hint })
      ] })
    ] }) }),
    /* @__PURE__ */ b.jsxs("div", { className: N2, children: [
      /* @__PURE__ */ b.jsxs("div", { className: A2, children: [
        /* @__PURE__ */ b.jsx("span", { className: [M2, s.dot].join(" "), "aria-hidden": "true" }),
        /* @__PURE__ */ b.jsx("span", { className: j2, children: s.title })
      ] }),
      /* @__PURE__ */ b.jsx("span", { className: O2, title: n.glbRef ?? void 0, children: n.glbRef ?? "—" }),
      /* @__PURE__ */ b.jsxs("div", { className: U2, children: [
        /* @__PURE__ */ b.jsx(Hu, { label: "Format", value: o.format }),
        /* @__PURE__ */ b.jsx(Hu, { label: "Triangles", value: o.tris }),
        /* @__PURE__ */ b.jsx(Hu, { label: "Vertices", value: o.verts }),
        o.identity ? /* @__PURE__ */ b.jsx(Hu, { label: "Identity", value: o.identity }) : null
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: G2, children: /* @__PURE__ */ b.jsx("div", { className: q2, children: r ? /* @__PURE__ */ b.jsxs(
        "a",
        {
          className: [Bv, X2].join(" "),
          href: r,
          download: f,
          children: [
            /* @__PURE__ */ b.jsx("span", { className: Hv, "aria-hidden": "true", children: "download" }),
            "Download GLB"
          ]
        }
      ) : /* @__PURE__ */ b.jsxs(
        "span",
        {
          className: [Bv, Y2].join(" "),
          "aria-disabled": "true",
          children: [
            /* @__PURE__ */ b.jsx("span", { className: Hv, "aria-hidden": "true", children: "download" }),
            "Download GLB"
          ]
        }
      ) }) })
    ] })
  ] });
}
function Hu({ label: n, value: r }) {
  return /* @__PURE__ */ b.jsxs("div", { className: L2, children: [
    /* @__PURE__ */ b.jsx("span", { className: B2, children: n }),
    /* @__PURE__ */ b.jsx("span", { className: H2, children: r })
  ] });
}
function Q2(n) {
  switch (n) {
    case "running":
      return {
        title: "Generating…",
        hint: "Fitting the identity head — the preview appears here when it lands.",
        dot: z2
      };
    case "done":
      return { title: "Head ready", hint: "", dot: D2 };
    case "error":
      return {
        title: "Generation failed",
        hint: "See the progress panel for details, then try again.",
        dot: C2
      };
    case "cancelled":
      return {
        title: "Cancelled",
        hint: "Run a generation to preview the head.",
        dot: Lv
      };
    default:
      return {
        title: "No head yet",
        hint: "Run a generation to preview the head.",
        dot: Lv
      };
  }
}
function Z2(n) {
  if (n.phase !== "done") return { format: "—", tris: "—", verts: "—", identity: null };
  const r = n.metadata, s = r?.mesh?.faces, o = r?.mesh?.vertices, f = r?.identity_score;
  return {
    format: typeof r?.textured == "boolean" ? r.textured ? "GLB · textured" : "GLB · mesh only" : "GLB",
    tris: typeof s == "number" ? s.toLocaleString() : "—",
    verts: typeof o == "number" ? o.toLocaleString() : "—",
    identity: typeof f == "number" ? f.toFixed(2) : null
  };
}
var k2 = "_1s0gbg70", K2 = "_1s0gbg71", Gv = "_1s0gbg72", J2 = "_1s0gbg73";
function $2() {
  const { generate: n, resetGenerate: r, showJobResult: s } = Rr(), { blocked: o, busy: f, submit: d, cancel: m } = XS(), g = Xy(n.phase), y = E.useCallback(
    (S) => {
      s(S);
    },
    [s]
  ), v = E.useCallback(
    async (S) => {
      try {
        await g.remove(S.id);
      } catch {
        qa.error("Could not delete that generation."), g.reload();
      }
    },
    [g]
  );
  return /* @__PURE__ */ b.jsxs("div", { className: k2, children: [
    /* @__PURE__ */ b.jsx(V2, { state: n }),
    /* @__PURE__ */ b.jsxs("div", { className: K2, children: [
      /* @__PURE__ */ b.jsxs("div", { className: Gv, children: [
        /* @__PURE__ */ b.jsxs(
          vr,
          {
            eyebrow: "OPERATOR · FACEAVATAR.GENERATE_HEAD",
            title: "New head",
            description: "One photo in, one identity head GLB out.",
            children: [
              /* @__PURE__ */ b.jsx(ax, {}),
              /* @__PURE__ */ b.jsx("div", { className: J2, children: f ? /* @__PURE__ */ b.jsx(en, { variant: "danger", onClick: () => void m(), children: "Cancel generation" }) : /* @__PURE__ */ b.jsx(en, { onClick: () => void d(), disabled: o, children: "Generate" }) })
            ]
          }
        ),
        /* @__PURE__ */ b.jsx(vr, { elevation: "raised", title: "Progress", description: "Live state mirrors the worker.", children: /* @__PURE__ */ b.jsx(
          Ky,
          {
            state: n,
            onCancel: () => void m(),
            onReset: r
          }
        ) })
      ] }),
      /* @__PURE__ */ b.jsx("div", { className: Gv, children: /* @__PURE__ */ b.jsx(vr, { title: "History", description: "Past generations and their GLB downloads.", children: /* @__PURE__ */ b.jsx(Fx, { jobs: g.jobs, onOpen: y, onDelete: v }) }) })
    ] })
  ] });
}
async function F2(n) {
  const r = new FormData();
  r.append("file", n);
  const s = await fetch(`${xr}/uploads`, { method: "POST", body: r });
  if (!s.ok) {
    let o = null;
    try {
      o = await s.json();
    } catch {
      o = null;
    }
    throw new Tn(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  return await s.json();
}
var W2 = "_1mef6060", I2 = "_1mef6061", P2 = "_1mef6062", eR = "_1mef6063", tR = "_1mef6064", aR = "_1mef6065", lR = "_1mef6066", nR = "_1mef6067", iR = "_1mef6068";
const rR = "model/gltf-binary,.glb", qv = "__upload__";
function uR({
  value: n,
  label: r,
  onSelect: s,
  onClear: o,
  disabled: f = !1
}) {
  const d = Xy("head-refine"), m = E.useRef(null), [g, y] = E.useState(!1), v = E.useMemo(
    () => d.jobs.filter((C) => C.kind === "generate" && C.status === "succeeded" && C.glbRef),
    [d.jobs]
  ), S = E.useCallback(() => m.current?.click(), []), h = E.useCallback(
    async (C) => {
      const X = C.target.files?.[0];
      if (C.target.value = "", !!X) {
        y(!0);
        try {
          const { ref: k } = await F2(X);
          s(k, X.name);
        } catch (k) {
          const $ = k instanceof Tn ? k.message : "GLB upload failed — try again.";
          qa.error($);
        } finally {
          y(!1);
        }
      }
    },
    [s]
  ), D = E.useCallback(
    (C) => {
      const X = C.target.value;
      if (X === qv) {
        S();
        return;
      }
      if (X === "") {
        o();
        return;
      }
      s(X, Yv(v.find((k) => k.glbRef === X)));
    },
    [v, o, S, s]
  ), _ = n !== null && !v.some((C) => C.glbRef === n);
  return /* @__PURE__ */ b.jsxs("div", { className: W2, children: [
    /* @__PURE__ */ b.jsx("label", { className: I2, htmlFor: "faceavatar-base-mesh", children: "Base mesh" }),
    /* @__PURE__ */ b.jsxs(
      "select",
      {
        id: "faceavatar-base-mesh",
        className: P2,
        value: _ ? "" : n ?? "",
        disabled: f || g,
        onChange: D,
        children: [
          /* @__PURE__ */ b.jsx("option", { value: "", children: g ? "Uploading…" : "Select a recent head…" }),
          v.map((C) => /* @__PURE__ */ b.jsx("option", { value: C.glbRef ?? "", children: Yv(C) }, C.id)),
          /* @__PURE__ */ b.jsx("option", { value: qv, children: "Upload a GLB…" })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx(
      "input",
      {
        ref: m,
        type: "file",
        className: eR,
        accept: rR,
        tabIndex: -1,
        onChange: (C) => void h(C)
      }
    ),
    n ? /* @__PURE__ */ b.jsxs("div", { className: tR, children: [
      /* @__PURE__ */ b.jsx("span", { className: aR, "aria-hidden": "true", children: "deployed_code" }),
      /* @__PURE__ */ b.jsx("span", { className: lR, title: n, children: r ?? n }),
      /* @__PURE__ */ b.jsx("button", { type: "button", className: nR, onClick: o, disabled: f, children: "Clear" })
    ] }) : /* @__PURE__ */ b.jsx("span", { className: iR, children: "Pick a recent Face Avatar head, or upload any GLB." })
  ] });
}
function Yv(n) {
  if (!n) return "head.glb";
  const r = n.metadata?.mesh?.faces, s = typeof r == "number" ? ` · ${r.toLocaleString()} faces` : "";
  return `${n.id}${s}`;
}
var sR = "_1laj8an0", Xv = "_1laj8an1", Vv = "_1laj8an2", Qv = "_1laj8an3", Zv = "_1laj8an4", oR = "_1laj8an5", cR = "_1laj8an6";
function fR({ baseMeshRef: n, state: r }) {
  const s = Ku(n), o = r.phase === "done" ? Ku(r.glbRef) : null, f = r.glbRef ? `${r.glbRef}.glb` : "grafted-head.glb";
  return /* @__PURE__ */ b.jsxs("div", { className: sR, children: [
    /* @__PURE__ */ b.jsxs("div", { className: Xv, children: [
      /* @__PURE__ */ b.jsx("span", { className: Vv, children: "Before · base mesh" }),
      s ? /* @__PURE__ */ b.jsx(jc, { url: s, alt: "Base mesh", className: Qv }) : /* @__PURE__ */ b.jsx("div", { className: Zv, children: "Pick a base mesh to preview." })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Xv, children: [
      /* @__PURE__ */ b.jsx("span", { className: Vv, children: "After · identity graft" }),
      o ? /* @__PURE__ */ b.jsx(jc, { url: o, alt: "Grafted identity head", className: Qv }) : /* @__PURE__ */ b.jsx("div", { className: Zv, children: dR(r.phase) }),
      o ? /* @__PURE__ */ b.jsxs("a", { className: oR, href: o, download: f, children: [
        /* @__PURE__ */ b.jsx("span", { className: cR, "aria-hidden": "true", children: "download" }),
        "Download GLB"
      ] }) : null
    ] })
  ] });
}
function dR(n) {
  switch (n) {
    case "running":
      return "Grafting the identity face — the result appears here when it lands.";
    case "error":
      return "Graft failed — see the progress panel, then try again.";
    case "cancelled":
      return "Graft cancelled.";
    default:
      return "Run a refine to weld the identity head.";
  }
}
var hR = "_18skq2i0", kv = "_18skq2i1", mR = "_18skq2i2", xc = "_18skq2i3", vR = "_18skq2i4", yR = "_18skq2i5", Kv = "_18skq2i6", gR = "_18skq2i7", Jv = "_18skq2i8", $v = "_18skq2i9", Fv = "_18skq2ia", Wv = "_18skq2ib", Iv = "_18skq2ic", Pv = "_18skq2id";
function pR({ handle: n, disabled: r = !1 }) {
  const { form: s, setSeam: o, setKeepHair: f, setBlendRing: d, setAlign: m, setTextureBlend: g } = n;
  return /* @__PURE__ */ b.jsxs("div", { className: hR, children: [
    /* @__PURE__ */ b.jsxs("label", { className: kv, children: [
      /* @__PURE__ */ b.jsx("span", { className: xc, children: "Seam" }),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Kv,
          "aria-label": "Seam",
          value: s.seam,
          disabled: r,
          onChange: (y) => o(y.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: "neck", children: "Neck" }),
            /* @__PURE__ */ b.jsx("option", { value: "hairline", children: "Hairline" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: kv, children: [
      /* @__PURE__ */ b.jsx("span", { className: xc, children: "Align" }),
      /* @__PURE__ */ b.jsxs(
        "select",
        {
          className: Kv,
          "aria-label": "Align",
          value: s.align,
          disabled: r,
          onChange: (y) => m(y.target.value),
          children: [
            /* @__PURE__ */ b.jsx("option", { value: "landmark", children: "Landmark (auto)" }),
            /* @__PURE__ */ b.jsx("option", { value: "manual", children: "Manual" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("label", { className: mR, children: [
      /* @__PURE__ */ b.jsxs("span", { className: vR, children: [
        /* @__PURE__ */ b.jsx("span", { className: xc, children: "Blend ring" }),
        /* @__PURE__ */ b.jsx("span", { className: yR, children: s.blendRing.toFixed(2) })
      ] }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          className: gR,
          type: "range",
          "aria-label": "Blend ring",
          min: 0,
          max: 1,
          step: 0.05,
          value: s.blendRing,
          disabled: r,
          onChange: (y) => d(Number(y.target.value))
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Jv, children: [
      /* @__PURE__ */ b.jsxs("div", { className: $v, children: [
        /* @__PURE__ */ b.jsx("span", { className: Fv, children: "Keep hair / back" }),
        /* @__PURE__ */ b.jsx("span", { className: Wv, children: "Retain the base mesh's hair and back of head." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s.keepHair,
          "aria-label": "Keep hair",
          disabled: r,
          className: Iv,
          onClick: () => f(!s.keepHair),
          children: /* @__PURE__ */ b.jsx("span", { className: Pv, "aria-hidden": "true" })
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: Jv, children: [
      /* @__PURE__ */ b.jsxs("div", { className: $v, children: [
        /* @__PURE__ */ b.jsx("span", { className: Fv, children: "Blend textures" }),
        /* @__PURE__ */ b.jsx("span", { className: Wv, children: "Match albedo across the seam between the two meshes." })
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": s.textureBlend,
          "aria-label": "Blend textures",
          disabled: r,
          className: Iv,
          onClick: () => g(!s.textureBlend),
          children: /* @__PURE__ */ b.jsx("span", { className: Pv, "aria-hidden": "true" })
        }
      )
    ] })
  ] });
}
const bR = {
  seam: hi.seam,
  keepHair: hi.keep_hair,
  blendRing: hi.blend_ring,
  align: hi.align,
  textureBlend: hi.texture_blend
};
function SR(n) {
  return {
    ...hi,
    seam: n.seam,
    keep_hair: n.keepHair,
    blend_ring: ER(n.blendRing),
    align: n.align,
    texture_blend: n.textureBlend
  };
}
function ER(n) {
  return Number.isNaN(n) ? 0 : Math.min(1, Math.max(0, n));
}
function xR() {
  const [n, r] = E.useState(bR), s = E.useCallback((g) => r((y) => ({ ...y, seam: g })), []), o = E.useCallback((g) => r((y) => ({ ...y, keepHair: g })), []), f = E.useCallback((g) => r((y) => ({ ...y, blendRing: g })), []), d = E.useCallback((g) => r((y) => ({ ...y, align: g })), []), m = E.useCallback(
    (g) => r((y) => ({ ...y, textureBlend: g })),
    []
  );
  return { form: n, setSeam: s, setKeepHair: o, setBlendRing: f, setAlign: d, setTextureBlend: m };
}
var RR = "_16x46bt0", TR = "_16x46bt1", ey = "_16x46bt2", _R = "_16x46bt3", ty = "_16x46bt4", wR = "_16x46bt5";
function NR() {
  const { imageRef: n, generate: r, startGraft: s, cancelJob: o, resetGenerate: f } = Rr(), d = xR(), [m, g] = E.useState(null), [y, v] = E.useState(null), [S, h] = E.useState(!1), [D] = M1();
  E.useEffect(() => {
    const I = D.get("baseMesh");
    I && !m && (g(I), v(I));
  }, [D, m]);
  const _ = r.phase === "running", C = !m || !n || _, X = E.useCallback((I, pe) => {
    g(I), v(pe);
  }, []), k = E.useCallback(() => {
    g(null), v(null);
  }, []), $ = E.useCallback(async () => {
    if (!m || !n) {
      qa.error("Pick a base mesh and upload a photo before refining.");
      return;
    }
    h(!0);
    try {
      await s(m, n, SR(d.form)), qa.success("Head refine started.");
    } catch (I) {
      const pe = I instanceof Tn ? I.message : "Could not start the head refine.";
      qa.error(pe);
    } finally {
      h(!1);
    }
  }, [m, n, d.form, s]), P = E.useCallback(async () => {
    try {
      await o();
    } catch {
      qa.error("Could not cancel the head refine.");
    }
  }, [o]);
  return /* @__PURE__ */ b.jsxs("div", { className: RR, children: [
    /* @__PURE__ */ b.jsx(fR, { baseMeshRef: m, state: r }),
    /* @__PURE__ */ b.jsxs("div", { className: TR, children: [
      /* @__PURE__ */ b.jsx("div", { className: ey, children: /* @__PURE__ */ b.jsxs(
        vr,
        {
          eyebrow: "OPERATOR · FACEAVATAR.GRAFT_HEAD",
          title: "Refine head",
          description: "Weld a photo's identity face onto a base mesh.",
          children: [
            /* @__PURE__ */ b.jsxs("div", { className: _R, children: [
              /* @__PURE__ */ b.jsx(
                uR,
                {
                  value: m,
                  label: y,
                  onSelect: X,
                  onClear: k,
                  disabled: _
                }
              ),
              /* @__PURE__ */ b.jsx("span", { className: ty, children: "Identity photo" }),
              /* @__PURE__ */ b.jsx(ky, {}),
              /* @__PURE__ */ b.jsx("span", { className: ty, children: "Graft controls" }),
              /* @__PURE__ */ b.jsx(pR, { handle: d, disabled: _ })
            ] }),
            /* @__PURE__ */ b.jsx("div", { className: wR, children: /* @__PURE__ */ b.jsx(en, { onClick: () => void $(), disabled: C, loading: S, children: "Refine head" }) })
          ]
        }
      ) }),
      /* @__PURE__ */ b.jsx("div", { className: ey, children: /* @__PURE__ */ b.jsx(vr, { elevation: "raised", title: "Progress", description: "Live state mirrors the worker.", children: /* @__PURE__ */ b.jsx(
        Ky,
        {
          state: r,
          onCancel: () => void P(),
          onReset: f
        }
      ) }) })
    ] })
  ] });
}
var AR = "r9dntz0", MR = "r9dntz2 r9dntz1", zR = "r9dntz3 r9dntz1";
const DR = [
  { segment: "generate", label: "Generate" },
  { segment: "head-refine", label: "Head refine" }
];
function CR({ active: n }) {
  const r = Zc(), o = zb().deploymentId ?? "default";
  return /* @__PURE__ */ b.jsx("div", { className: AR, role: "tablist", "aria-label": "View", children: DR.map((f) => {
    const d = f.segment === n;
    return /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": d,
        className: d ? zR : MR,
        onClick: () => r(`/${o}/${f.segment}`),
        children: f.label
      },
      f.segment
    );
  }) });
}
var jR = "_45mi1i0", OR = "_45mi1i1", UR = "_45mi1i2", LR = "_45mi1i3", BR = "_45mi1i4", HR = "_45mi1i5", GR = "_45mi1i6", qR = "_45mi1i7";
function YR() {
  const r = Va().pathname.endsWith("/head-refine") ? "head-refine" : "generate";
  return /* @__PURE__ */ b.jsxs(YS, { children: [
    /* @__PURE__ */ b.jsxs("div", { className: jR, children: [
      /* @__PURE__ */ b.jsx("div", { className: OR, "aria-hidden": "true" }),
      /* @__PURE__ */ b.jsxs("header", { className: UR, children: [
        /* @__PURE__ */ b.jsxs("div", { className: LR, children: [
          /* @__PURE__ */ b.jsx("span", { className: BR, children: "GENERATIVE SURFACE · PHOTO TO 3D HEAD" }),
          /* @__PURE__ */ b.jsx("h1", { className: HR, children: "Face Avatar" }),
          /* @__PURE__ */ b.jsx("p", { className: GR, children: "Turn one photo of a person into an identity-preserving 3D head, or graft that identity face onto an existing base mesh. Non-commercial models (FLAME / Arc2Avatar)." })
        ] }),
        /* @__PURE__ */ b.jsx(CR, { active: r })
      ] }),
      /* @__PURE__ */ b.jsx("main", { className: qR, children: /* @__PURE__ */ b.jsx(Pb, {}) })
    ] }),
    /* @__PURE__ */ b.jsx(yS, { position: "bottom-right", theme: "dark", richColors: !0 })
  ] });
}
function XR(n) {
  return n === "faceavatar_head_refine" ? "head-refine" : "generate";
}
function VR() {
  return [
    {
      path: "/",
      loader: () => Pm("/default/generate")
    },
    {
      path: "/:deploymentId",
      Component: YR,
      children: [
        {
          index: !0,
          loader: ({ params: n }) => Pm(`/${QR(n, "deploymentId")}/generate`)
        },
        { path: "generate", Component: $2 },
        { path: "head-refine", Component: NR }
      ]
    }
  ];
}
function QR(n, r) {
  const s = n[r];
  if (!s)
    throw new Response(`Missing path parameter: ${r}`, { status: 400 });
  return s;
}
const Oc = "faceavatar-app", ZR = "ext-event", ay = "faceavatar-stylesheet", ly = ["accent", "density", "card"];
function kR(n) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[n];
}
function KR() {
  if (typeof document > "u" || document.getElementById(ay)) return;
  const n = new URL("./faceavatar.css", import.meta.url).href, r = document.createElement("link");
  r.id = ay, r.rel = "stylesheet", r.href = n, document.head.appendChild(r);
}
KR();
class JR extends HTMLElement {
  root = null;
  ctx = null;
  observer = null;
  actionBridge = null;
  actionBridgeDeploymentId = null;
  router = null;
  navigateListener = null;
  paintedEntry = null;
  static get observedAttributes() {
    return ["route", "deployment-id", "recipe"];
  }
  connectedCallback() {
    this.root = c0.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Tv, this.navigateListener), this.navigateListener = null), this.router = null, this.paintedEntry = null;
  }
  refreshActionBridge() {
    const r = this.getAttribute("deployment-id");
    r && r !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = Y1(this), this.actionBridgeDeploymentId = r) : !r && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const r = (s) => {
      const o = s.detail?.path;
      o && this.router && this.router.navigate(o);
    };
    this.navigateListener = r, this.addEventListener(Tv, r);
  }
  syncTweaksFromBody() {
    for (const r of ly) {
      const s = kR(r);
      s === void 0 ? delete this.dataset[r] : this.dataset[r] !== s && (this.dataset[r] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: ly.map((r) => `data-${r}`)
    }));
  }
  set hostContext(r) {
    this.ctx = r, this.paint();
  }
  get hostContext() {
    return this.ctx;
  }
  paint() {
    if (!this.root || !this.isConnected) return;
    const r = this.resolveInitialEntry();
    if (this.router && this.paintedEntry === r) return;
    const s = Jb(VR(), { initialEntries: [r] });
    this.router = s, this.paintedEntry = r, this.root.render(
      /* @__PURE__ */ b.jsx(E.StrictMode, { children: /* @__PURE__ */ b.jsx(Fb, { router: s }) })
    );
  }
  resolveInitialEntry() {
    const r = this.getAttribute("route");
    if (r && r.length > 0) return r;
    const s = this.getAttribute("deployment-id"), o = XR(this.getAttribute("recipe"));
    return s && s.length > 0 ? `/${s}/${o}` : "/";
  }
  emitHostEvent(r, s) {
    this.dispatchEvent(
      new CustomEvent(ZR, {
        detail: { topic: r, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function $R() {
  typeof customElements > "u" || customElements.get(Oc) || customElements.define(Oc, JR);
}
typeof customElements < "u" && !customElements.get(Oc) && $R();
export {
  $R as register
};
//# sourceMappingURL=faceavatar.js.map
