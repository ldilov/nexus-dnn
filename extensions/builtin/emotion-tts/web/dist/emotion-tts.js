function CE(t, a) {
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
function Dx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nf = { exports: {} }, Ki = {};
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
function TE() {
  if (ly) return Ki;
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
  return Ki.Fragment = a, Ki.jsx = s, Ki.jsxs = s, Ki;
}
var oy;
function RE() {
  return oy || (oy = 1, nf.exports = TE()), nf.exports;
}
var c = RE(), af = { exports: {} }, He = {};
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
function _E() {
  if (cy) return He;
  cy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
  function S(_) {
    return _ === null || typeof _ != "object" ? null : (_ = w && _[w] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, T = Object.assign, R = {};
  function N(_, ae, re) {
    this.props = _, this.context = ae, this.refs = R, this.updater = re || j;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(_, ae) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, ae, "setState");
  }, N.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function D() {
  }
  D.prototype = N.prototype;
  function O(_, ae, re) {
    this.props = _, this.context = ae, this.refs = R, this.updater = re || j;
  }
  var C = O.prototype = new D();
  C.constructor = O, T(C, N.prototype), C.isPureReactComponent = !0;
  var V = Array.isArray;
  function Q() {
  }
  var te = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function F(_, ae, re) {
    var G = re.ref;
    return {
      $$typeof: t,
      type: _,
      key: ae,
      ref: G !== void 0 ? G : null,
      props: re
    };
  }
  function k(_, ae) {
    return F(_.type, ae, _.props);
  }
  function I(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function J(_) {
    var ae = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(re) {
      return ae[re];
    });
  }
  var he = /\/+/g;
  function K(_, ae) {
    return typeof _ == "object" && _ !== null && _.key != null ? J("" + _.key) : ae.toString(36);
  }
  function ie(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(Q, Q) : (_.status = "pending", _.then(
          function(ae) {
            _.status === "pending" && (_.status = "fulfilled", _.value = ae);
          },
          function(ae) {
            _.status === "pending" && (_.status = "rejected", _.reason = ae);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function A(_, ae, re, G, U) {
    var W = typeof _;
    (W === "undefined" || W === "boolean") && (_ = null);
    var ue = !1;
    if (_ === null) ue = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          ue = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case t:
            case a:
              ue = !0;
              break;
            case b:
              return ue = _._init, A(
                ue(_._payload),
                ae,
                re,
                G,
                U
              );
          }
      }
    if (ue)
      return U = U(_), ue = G === "" ? "." + K(_, 0) : G, V(U) ? (re = "", ue != null && (re = ue.replace(he, "$&/") + "/"), A(U, ae, re, "", function(Ge) {
        return Ge;
      })) : U != null && (I(U) && (U = k(
        U,
        re + (U.key == null || _ && _.key === U.key ? "" : ("" + U.key).replace(
          he,
          "$&/"
        ) + "/") + ue
      )), ae.push(U)), 1;
    ue = 0;
    var ve = G === "" ? "." : G + ":";
    if (V(_))
      for (var Ce = 0; Ce < _.length; Ce++)
        G = _[Ce], W = ve + K(G, Ce), ue += A(
          G,
          ae,
          re,
          W,
          U
        );
    else if (Ce = S(_), typeof Ce == "function")
      for (_ = Ce.call(_), Ce = 0; !(G = _.next()).done; )
        G = G.value, W = ve + K(G, Ce++), ue += A(
          G,
          ae,
          re,
          W,
          U
        );
    else if (W === "object") {
      if (typeof _.then == "function")
        return A(
          ie(_),
          ae,
          re,
          G,
          U
        );
      throw ae = String(_), Error(
        "Objects are not valid as a React child (found: " + (ae === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : ae) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ue;
  }
  function Y(_, ae, re) {
    if (_ == null) return _;
    var G = [], U = 0;
    return A(_, G, "", "", function(W) {
      return ae.call(re, W, U++);
    }), G;
  }
  function $(_) {
    if (_._status === -1) {
      var ae = _._result;
      ae = ae(), ae.then(
        function(re) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = re);
        },
        function(re) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = re);
        }
      ), _._status === -1 && (_._status = 0, _._result = ae);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var q = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var ae = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(ae)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, oe = {
    map: Y,
    forEach: function(_, ae, re) {
      Y(
        _,
        function() {
          ae.apply(this, arguments);
        },
        re
      );
    },
    count: function(_) {
      var ae = 0;
      return Y(_, function() {
        ae++;
      }), ae;
    },
    toArray: function(_) {
      return Y(_, function(ae) {
        return ae;
      }) || [];
    },
    only: function(_) {
      if (!I(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return He.Activity = v, He.Children = oe, He.Component = N, He.Fragment = s, He.Profiler = o, He.PureComponent = O, He.StrictMode = i, He.Suspense = y, He.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, He.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return te.H.useMemoCache(_);
    }
  }, He.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, He.cacheSignal = function() {
    return null;
  }, He.cloneElement = function(_, ae, re) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var G = T({}, _.props), U = _.key;
    if (ae != null)
      for (W in ae.key !== void 0 && (U = "" + ae.key), ae)
        !M.call(ae, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ae.ref === void 0 || (G[W] = ae[W]);
    var W = arguments.length - 2;
    if (W === 1) G.children = re;
    else if (1 < W) {
      for (var ue = Array(W), ve = 0; ve < W; ve++)
        ue[ve] = arguments[ve + 2];
      G.children = ue;
    }
    return F(_.type, U, G);
  }, He.createContext = function(_) {
    return _ = {
      $$typeof: f,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: u,
      _context: _
    }, _;
  }, He.createElement = function(_, ae, re) {
    var G, U = {}, W = null;
    if (ae != null)
      for (G in ae.key !== void 0 && (W = "" + ae.key), ae)
        M.call(ae, G) && G !== "key" && G !== "__self" && G !== "__source" && (U[G] = ae[G]);
    var ue = arguments.length - 2;
    if (ue === 1) U.children = re;
    else if (1 < ue) {
      for (var ve = Array(ue), Ce = 0; Ce < ue; Ce++)
        ve[Ce] = arguments[Ce + 2];
      U.children = ve;
    }
    if (_ && _.defaultProps)
      for (G in ue = _.defaultProps, ue)
        U[G] === void 0 && (U[G] = ue[G]);
    return F(_, W, U);
  }, He.createRef = function() {
    return { current: null };
  }, He.forwardRef = function(_) {
    return { $$typeof: p, render: _ };
  }, He.isValidElement = I, He.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: $
    };
  }, He.memo = function(_, ae) {
    return {
      $$typeof: m,
      type: _,
      compare: ae === void 0 ? null : ae
    };
  }, He.startTransition = function(_) {
    var ae = te.T, re = {};
    te.T = re;
    try {
      var G = _(), U = te.S;
      U !== null && U(re, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(Q, q);
    } catch (W) {
      q(W);
    } finally {
      ae !== null && re.types !== null && (ae.types = re.types), te.T = ae;
    }
  }, He.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, He.use = function(_) {
    return te.H.use(_);
  }, He.useActionState = function(_, ae, re) {
    return te.H.useActionState(_, ae, re);
  }, He.useCallback = function(_, ae) {
    return te.H.useCallback(_, ae);
  }, He.useContext = function(_) {
    return te.H.useContext(_);
  }, He.useDebugValue = function() {
  }, He.useDeferredValue = function(_, ae) {
    return te.H.useDeferredValue(_, ae);
  }, He.useEffect = function(_, ae) {
    return te.H.useEffect(_, ae);
  }, He.useEffectEvent = function(_) {
    return te.H.useEffectEvent(_);
  }, He.useId = function() {
    return te.H.useId();
  }, He.useImperativeHandle = function(_, ae, re) {
    return te.H.useImperativeHandle(_, ae, re);
  }, He.useInsertionEffect = function(_, ae) {
    return te.H.useInsertionEffect(_, ae);
  }, He.useLayoutEffect = function(_, ae) {
    return te.H.useLayoutEffect(_, ae);
  }, He.useMemo = function(_, ae) {
    return te.H.useMemo(_, ae);
  }, He.useOptimistic = function(_, ae) {
    return te.H.useOptimistic(_, ae);
  }, He.useReducer = function(_, ae, re) {
    return te.H.useReducer(_, ae, re);
  }, He.useRef = function(_) {
    return te.H.useRef(_);
  }, He.useState = function(_) {
    return te.H.useState(_);
  }, He.useSyncExternalStore = function(_, ae, re) {
    return te.H.useSyncExternalStore(
      _,
      ae,
      re
    );
  }, He.useTransition = function() {
    return te.H.useTransition();
  }, He.version = "19.2.5", He;
}
var uy;
function Dh() {
  return uy || (uy = 1, af.exports = _E()), af.exports;
}
var g = Dh();
const xe = /* @__PURE__ */ Dx(g), ME = /* @__PURE__ */ CE({
  __proto__: null,
  default: xe
}, [g]);
var rf = { exports: {} }, Xi = {}, sf = { exports: {} }, lf = {};
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
function AE() {
  return dy || (dy = 1, (function(t) {
    function a(A, Y) {
      var $ = A.length;
      A.push(Y);
      e: for (; 0 < $; ) {
        var q = $ - 1 >>> 1, oe = A[q];
        if (0 < o(oe, Y))
          A[q] = Y, A[$] = oe, $ = q;
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
        e: for (var q = 0, oe = A.length, _ = oe >>> 1; q < _; ) {
          var ae = 2 * (q + 1) - 1, re = A[ae], G = ae + 1, U = A[G];
          if (0 > o(re, $))
            G < oe && 0 > o(U, re) ? (A[q] = U, A[G] = $, q = G) : (A[q] = re, A[ae] = $, q = ae);
          else if (G < oe && 0 > o(U, $))
            A[q] = U, A[G] = $, q = G;
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
    var y = [], m = [], b = 1, v = null, w = 3, S = !1, j = !1, T = !1, R = !1, N = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function C(A) {
      for (var Y = s(m); Y !== null; ) {
        if (Y.callback === null) i(m);
        else if (Y.startTime <= A)
          i(m), Y.sortIndex = Y.expirationTime, a(y, Y);
        else break;
        Y = s(m);
      }
    }
    function V(A) {
      if (T = !1, C(A), !j)
        if (s(y) !== null)
          j = !0, Q || (Q = !0, J());
        else {
          var Y = s(m);
          Y !== null && ie(V, Y.startTime - A);
        }
    }
    var Q = !1, te = -1, M = 5, F = -1;
    function k() {
      return R ? !0 : !(t.unstable_now() - F < M);
    }
    function I() {
      if (R = !1, Q) {
        var A = t.unstable_now();
        F = A;
        var Y = !0;
        try {
          e: {
            j = !1, T && (T = !1, D(te), te = -1), S = !0;
            var $ = w;
            try {
              t: {
                for (C(A), v = s(y); v !== null && !(v.expirationTime > A && k()); ) {
                  var q = v.callback;
                  if (typeof q == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var oe = q(
                      v.expirationTime <= A
                    );
                    if (A = t.unstable_now(), typeof oe == "function") {
                      v.callback = oe, C(A), Y = !0;
                      break t;
                    }
                    v === s(y) && i(y), C(A);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) Y = !0;
                else {
                  var _ = s(m);
                  _ !== null && ie(
                    V,
                    _.startTime - A
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
          Y ? J() : Q = !1;
        }
      }
    }
    var J;
    if (typeof O == "function")
      J = function() {
        O(I);
      };
    else if (typeof MessageChannel < "u") {
      var he = new MessageChannel(), K = he.port2;
      he.port1.onmessage = I, J = function() {
        K.postMessage(null);
      };
    } else
      J = function() {
        N(I, 0);
      };
    function ie(A, Y) {
      te = N(function() {
        A(t.unstable_now());
      }, Y);
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
      var q = t.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? q + $ : q) : $ = q, A) {
        case 1:
          var oe = -1;
          break;
        case 2:
          oe = 250;
          break;
        case 5:
          oe = 1073741823;
          break;
        case 4:
          oe = 1e4;
          break;
        default:
          oe = 5e3;
      }
      return oe = $ + oe, A = {
        id: b++,
        callback: Y,
        priorityLevel: A,
        startTime: $,
        expirationTime: oe,
        sortIndex: -1
      }, $ > q ? (A.sortIndex = $, a(m, A), s(y) === null && A === s(m) && (T ? (D(te), te = -1) : T = !0, ie(V, $ - q))) : (A.sortIndex = oe, a(y, A), j || S || (j = !0, Q || (Q = !0, J()))), A;
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
  })(lf)), lf;
}
var fy;
function DE() {
  return fy || (fy = 1, sf.exports = AE()), sf.exports;
}
var of = { exports: {} }, bn = {};
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
function kE() {
  if (hy) return bn;
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
  return bn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, bn.createPortal = function(y, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(y, m, null, b);
  }, bn.flushSync = function(y) {
    var m = f.T, b = i.p;
    try {
      if (f.T = null, i.p = 2, y) return y();
    } finally {
      f.T = m, i.p = b, i.d.f();
    }
  }, bn.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, i.d.C(y, m));
  }, bn.prefetchDNS = function(y) {
    typeof y == "string" && i.d.D(y);
  }, bn.preinit = function(y, m) {
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
  }, bn.preinitModule = function(y, m) {
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
  }, bn.preload = function(y, m) {
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
  }, bn.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        i.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else i.d.m(y);
  }, bn.requestFormReset = function(y) {
    i.d.r(y);
  }, bn.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, bn.useFormState = function(y, m, b) {
    return f.H.useFormState(y, m, b);
  }, bn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, bn.version = "19.2.5", bn;
}
var my;
function kx() {
  if (my) return of.exports;
  my = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), of.exports = kE(), of.exports;
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
function zE() {
  if (py) return Xi;
  py = 1;
  var t = DE(), a = Dh(), s = kx();
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), O = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), F = Symbol.for("react.activity"), k = Symbol.for("react.memo_cache_sentinel"), I = Symbol.iterator;
  function J(e) {
    return e === null || typeof e != "object" ? null : (e = I && e[I] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var he = Symbol.for("react.client.reference");
  function K(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === he ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case N:
        return "Profiler";
      case R:
        return "StrictMode";
      case V:
        return "Suspense";
      case Q:
        return "SuspenseList";
      case F:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case O:
          return e.displayName || "Context";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
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
  var ie = Array.isArray, A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, q = [], oe = -1;
  function _(e) {
    return { current: e };
  }
  function ae(e) {
    0 > oe || (e.current = q[oe], q[oe] = null, oe--);
  }
  function re(e, n) {
    oe++, q[oe] = e.current, e.current = n;
  }
  var G = _(null), U = _(null), W = _(null), ue = _(null);
  function ve(e, n) {
    switch (re(W, n), re(U, e), re(G, null), n.nodeType) {
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
    ae(G), re(G, e);
  }
  function Ce() {
    ae(G), ae(U), ae(W);
  }
  function Ge(e) {
    e.memoizedState !== null && re(ue, e);
    var n = G.current, r = Av(n, e.type);
    n !== r && (re(U, e), re(G, r));
  }
  function Ee(e) {
    U.current === e && (ae(G), ae(U)), ue.current === e && (ae(ue), Fi._currentValue = $);
  }
  var Ze, Ie;
  function Pe(e) {
    if (Ze === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        Ze = n && n[1] || "", Ie = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ze + e + Ie;
  }
  var cn = !1;
  function Ct(e, n) {
    if (!e || cn) return "";
    cn = !0;
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
                } catch (le) {
                  var se = le;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (le) {
                  se = le;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (le) {
                se = le;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (le) {
            if (le && se && typeof le.stack == "string")
              return [le.stack, se.stack];
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
                  var de = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && de.includes("<anonymous>") && (de = de.replace("<anonymous>", e.displayName)), de;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      cn = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Pe(r) : "";
  }
  function Tt(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Pe(e.type);
      case 16:
        return Pe("Lazy");
      case 13:
        return e.child !== n && n !== null ? Pe("Suspense Fallback") : Pe("Suspense");
      case 19:
        return Pe("SuspenseList");
      case 0:
      case 15:
        return Ct(e.type, !1);
      case 11:
        return Ct(e.type.render, !1);
      case 1:
        return Ct(e.type, !0);
      case 31:
        return Pe("Activity");
      default:
        return "";
    }
  }
  function Vt(e) {
    try {
      var n = "", r = null;
      do
        n += Tt(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var kt = Object.prototype.hasOwnProperty, sn = t.unstable_scheduleCallback, Xt = t.unstable_cancelCallback, Rt = t.unstable_shouldYield, $t = t.unstable_requestPaint, _t = t.unstable_now, we = t.unstable_getCurrentPriorityLevel, Le = t.unstable_ImmediatePriority, Xe = t.unstable_UserBlockingPriority, ot = t.unstable_NormalPriority, Ut = t.unstable_LowPriority, zt = t.unstable_IdlePriority, qn = t.log, un = t.unstable_setDisableYieldValue, gn = null, vt = null;
  function mt(e) {
    if (typeof qn == "function" && un(e), vt && typeof vt.setStrictMode == "function")
      try {
        vt.setStrictMode(gn, e);
      } catch {
      }
  }
  var ce = Math.clz32 ? Math.clz32 : H, Ue = Math.log, ze = Math.LN2;
  function H(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ue(e) / ze | 0) | 0;
  }
  var pe = 256, ye = 262144, qe = 4194304;
  function Je(e) {
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
  function Me(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = Je(l) : (x &= E, x !== 0 ? d = Je(x) : r || (r = E & ~e, r !== 0 && (d = Je(r))))) : (E = l & ~h, E !== 0 ? d = Je(E) : x !== 0 ? d = Je(x) : r || (r = l & ~e, r !== 0 && (d = Je(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function Ve(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Fe(e, n) {
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
  function It() {
    var e = qe;
    return qe <<= 1, (qe & 62914560) === 0 && (qe = 4194304), e;
  }
  function wn(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function ct(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Ft(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, ne = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var de = 31 - ce(r), me = 1 << de;
      E[de] = 0, L[de] = -1;
      var se = ne[de];
      if (se !== null)
        for (ne[de] = null, de = 0; de < se.length; de++) {
          var le = se[de];
          le !== null && (le.lane &= -536870913);
        }
      r &= ~me;
    }
    l !== 0 && sa(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function sa(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - ce(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function vn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - ce(r), d = 1 << l;
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
  function Z(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ge() {
    var e = Y.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ey(e.type));
  }
  function be(e, n) {
    var r = Y.p;
    try {
      return Y.p = e, n();
    } finally {
      Y.p = r;
    }
  }
  var Re = Math.random().toString(36).slice(2), Se = "__reactFiber$" + Re, je = "__reactProps$" + Re, Ae = "__reactContainer$" + Re, Ne = "__reactEvents$" + Re, $e = "__reactListeners$" + Re, ke = "__reactHandles$" + Re, ut = "__reactResources$" + Re, We = "__reactMarker$" + Re;
  function wt(e) {
    delete e[Se], delete e[je], delete e[Ne], delete e[$e], delete e[ke];
  }
  function yt(e) {
    var n = e[Se];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ae] || r[Se]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Uv(e); e !== null; ) {
            if (r = e[Se]) return r;
            e = Uv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Ot(e) {
    if (e = e[Se] || e[Ae]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function nt(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Qt(e) {
    var n = e[ut];
    return n || (n = e[ut] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Nt(e) {
    e[We] = !0;
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
    return kt.call(Tr, e) ? !0 : kt.call(ma, e) ? !1 : Cr.test(e) ? Tr[e] = !0 : (ma[e] = !0, !1);
  }
  function et(e, n, r) {
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
  function Yt(e, n, r) {
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
  function yn(e, n, r, l) {
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
  function Mt(e) {
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
      var n = Mt(e) ? "checked" : "value";
      e._valueTracker = ns(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Ml(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = Mt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Al(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var xw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      xw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Qc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Zt(n)) : e.value !== "" + Zt(n) && (e.value = "" + Zt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Zc(e, x, Zt(n)) : r != null ? Zc(e, x, Zt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Zt(E) : e.removeAttribute("name");
  }
  function Em(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        as(e);
        return;
      }
      r = r != null ? "" + Zt(r) : "", n = n != null ? "" + Zt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), as(e);
  }
  function Zc(e, n, r) {
    n === "number" && Al(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function rs(e, n, r, l) {
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
  function Nm(e, n, r) {
    if (n != null && (n = "" + Zt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Zt(r) : "";
  }
  function Cm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(i(92));
        if (ie(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = Zt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), as(e);
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
  var Sw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Tm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || Sw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
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
  function Jc(e) {
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
  var ww = /* @__PURE__ */ new Map([
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
  ]), jw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dl(e) {
    return jw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var Wc = null;
  function eu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var is = null, ls = null;
  function _m(e) {
    var n = Ot(e);
    if (n && (e = n.stateNode)) {
      var r = e[je] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Qc(
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
                var d = l[je] || null;
                if (!d) throw Error(i(90));
                Qc(
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
              l = r[n], l.form === e.form && Ml(l);
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
  var tu = !1;
  function Mm(e, n, r) {
    if (tu) return e(n, r);
    tu = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (tu = !1, (is !== null || ls !== null) && (xo(), is && (n = is, e = ls, ls = is = null, _m(n), e)))
        for (n = 0; n < e.length; n++) _m(e[n]);
    }
  }
  function li(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[je] || null;
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nu = !1;
  if (ja)
    try {
      var oi = {};
      Object.defineProperty(oi, "passive", {
        get: function() {
          nu = !0;
        }
      }), window.addEventListener("test", oi, oi), window.removeEventListener("test", oi, oi);
    } catch {
      nu = !1;
    }
  var Ya = null, au = null, kl = null;
  function Am() {
    if (kl) return kl;
    var e, n = au, r = n.length, l, d = "value" in Ya ? Ya.value : Ya.textContent, h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && n[r - l] === d[h - l]; l++) ;
    return kl = d.slice(e, 1 < l ? 1 - l : void 0);
  }
  function zl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ol() {
    return !0;
  }
  function Dm() {
    return !1;
  }
  function En(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Ol : Dm, this.isPropagationStopped = Dm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ol);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ol);
      },
      persist: function() {
      },
      isPersistent: Ol
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
  }, Ll = En(Rr), ci = v({}, Rr, { view: 0, detail: 0 }), Ew = En(ci), ru, su, ui, $l = v({}, ci, {
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
    getModifierState: lu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ui && (ui && e.type === "mousemove" ? (ru = e.screenX - ui.screenX, su = e.screenY - ui.screenY) : su = ru = 0, ui = e), ru);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : su;
    }
  }), km = En($l), Nw = v({}, $l, { dataTransfer: 0 }), Cw = En(Nw), Tw = v({}, ci, { relatedTarget: 0 }), iu = En(Tw), Rw = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _w = En(Rw), Mw = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Aw = En(Mw), Dw = v({}, Rr, { data: 0 }), zm = En(Dw), kw = {
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
  }, zw = {
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
  }, Ow = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Lw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Ow[e]) ? !!n[e] : !1;
  }
  function lu() {
    return Lw;
  }
  var $w = v({}, ci, {
    key: function(e) {
      if (e.key) {
        var n = kw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = zl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? zw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: lu,
    charCode: function(e) {
      return e.type === "keypress" ? zl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? zl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Uw = En($w), Bw = v({}, $l, {
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
  }), Om = En(Bw), Vw = v({}, ci, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: lu
  }), Iw = En(Vw), Hw = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qw = En(Hw), Fw = v({}, $l, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yw = En(Fw), Gw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Pw = En(Gw), Kw = [9, 13, 27, 32], ou = ja && "CompositionEvent" in window, di = null;
  ja && "documentMode" in document && (di = document.documentMode);
  var Xw = ja && "TextEvent" in window && !di, Lm = ja && (!ou || di && 8 < di && 11 >= di), $m = " ", Um = !1;
  function Bm(e, n) {
    switch (e) {
      case "keyup":
        return Kw.indexOf(n.keyCode) !== -1;
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
  function Qw(e, n) {
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
  function Zw(e, n) {
    if (os)
      return e === "compositionend" || !ou && Bm(e, n) ? (e = Am(), kl = au = Ya = null, os = !1, e) : null;
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
  var Jw = {
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
    return n === "input" ? !!Jw[e.type] : n === "textarea";
  }
  function Hm(e, n, r, l) {
    is ? ls ? ls.push(l) : ls = [l] : is = l, n = To(n, "onChange"), 0 < n.length && (r = new Ll(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var fi = null, hi = null;
  function Ww(e) {
    Ev(e, 0);
  }
  function Ul(e) {
    var n = nt(e);
    if (Ml(n)) return e;
  }
  function qm(e, n) {
    if (e === "change") return n;
  }
  var Fm = !1;
  if (ja) {
    var cu;
    if (ja) {
      var uu = "oninput" in document;
      if (!uu) {
        var Ym = document.createElement("div");
        Ym.setAttribute("oninput", "return;"), uu = typeof Ym.oninput == "function";
      }
      cu = uu;
    } else cu = !1;
    Fm = cu && (!document.documentMode || 9 < document.documentMode);
  }
  function Gm() {
    fi && (fi.detachEvent("onpropertychange", Pm), hi = fi = null);
  }
  function Pm(e) {
    if (e.propertyName === "value" && Ul(hi)) {
      var n = [];
      Hm(
        n,
        hi,
        e,
        eu(e)
      ), Mm(Ww, n);
    }
  }
  function ej(e, n, r) {
    e === "focusin" ? (Gm(), fi = n, hi = r, fi.attachEvent("onpropertychange", Pm)) : e === "focusout" && Gm();
  }
  function tj(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ul(hi);
  }
  function nj(e, n) {
    if (e === "click") return Ul(n);
  }
  function aj(e, n) {
    if (e === "input" || e === "change")
      return Ul(n);
  }
  function rj(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var zn = typeof Object.is == "function" ? Object.is : rj;
  function mi(e, n) {
    if (zn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!kt.call(n, d) || !zn(e[d], n[d]))
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
    for (var n = Al(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Al(e.document);
    }
    return n;
  }
  function du(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var sj = ja && "documentMode" in document && 11 >= document.documentMode, cs = null, fu = null, pi = null, hu = !1;
  function Jm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    hu || cs == null || cs !== Al(l) || (l = cs, "selectionStart" in l && du(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), pi && mi(pi, l) || (pi = l, l = To(fu, "onSelect"), 0 < l.length && (n = new Ll(
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
  }, mu = {}, Wm = {};
  ja && (Wm = document.createElement("div").style, "AnimationEvent" in window || (delete us.animationend.animation, delete us.animationiteration.animation, delete us.animationstart.animation), "TransitionEvent" in window || delete us.transitionend.transition);
  function Mr(e) {
    if (mu[e]) return mu[e];
    if (!us[e]) return e;
    var n = us[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Wm)
        return mu[e] = n[r];
    return e;
  }
  var ep = Mr("animationend"), tp = Mr("animationiteration"), np = Mr("animationstart"), ij = Mr("transitionrun"), lj = Mr("transitionstart"), oj = Mr("transitioncancel"), ap = Mr("transitionend"), rp = /* @__PURE__ */ new Map(), pu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pu.push("scrollEnd");
  function la(e, n) {
    rp.set(e, n), ln(n, [e]);
  }
  var Bl = typeof reportError == "function" ? reportError : function(e) {
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
  }, Yn = [], ds = 0, gu = 0;
  function Vl() {
    for (var e = ds, n = gu = ds = 0; n < e; ) {
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
  function Il(e, n, r, l) {
    Yn[ds++] = e, Yn[ds++] = n, Yn[ds++] = r, Yn[ds++] = l, gu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function vu(e, n, r, l) {
    return Il(e, n, r, l), Hl(e);
  }
  function Ar(e, n) {
    return Il(e, null, null, n), Hl(e);
  }
  function sp(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - ce(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Hl(e) {
    if (50 < $i)
      throw $i = 0, Cd = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fs = {};
  function cj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function On(e, n, r, l) {
    return new cj(e, n, r, l);
  }
  function yu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = On(
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
  function ql(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") yu(e) && (x = 1);
    else if (typeof e == "string")
      x = mE(
        e,
        r,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case F:
          return e = On(31, r, n, d), e.elementType = F, e.lanes = h, e;
        case T:
          return Dr(r.children, d, h, n);
        case R:
          x = 8, d |= 24;
          break;
        case N:
          return e = On(12, r, n, d | 2), e.elementType = N, e.lanes = h, e;
        case V:
          return e = On(13, r, n, d), e.elementType = V, e.lanes = h, e;
        case Q:
          return e = On(19, r, n, d), e.elementType = Q, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
                x = 10;
                break e;
              case D:
                x = 9;
                break e;
              case C:
                x = 11;
                break e;
              case te:
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
    return n = On(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
    return e = On(7, e, l, n), e.lanes = r, e;
  }
  function bu(e, n, r) {
    return e = On(6, e, null, n), e.lanes = r, e;
  }
  function lp(e) {
    var n = On(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function xu(e, n, r) {
    return n = On(
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
        stack: Vt(n)
      }, op.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Vt(n)
    };
  }
  var hs = [], ms = 0, Fl = null, gi = 0, Pn = [], Kn = 0, Ga = null, pa = 1, ga = "";
  function Na(e, n) {
    hs[ms++] = gi, hs[ms++] = Fl, Fl = e, gi = n;
  }
  function cp(e, n, r) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, Ga = e;
    var l = pa;
    e = ga;
    var d = 32 - ce(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - ce(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, pa = 1 << 32 - ce(n) + d | r << d | l, ga = h + e;
    } else
      pa = 1 << h | r << d | l, ga = e;
  }
  function Su(e) {
    e.return !== null && (Na(e, 1), cp(e, 1, 0));
  }
  function wu(e) {
    for (; e === Fl; )
      Fl = hs[--ms], hs[ms] = null, gi = hs[--ms], hs[ms] = null;
    for (; e === Ga; )
      Ga = Pn[--Kn], Pn[Kn] = null, ga = Pn[--Kn], Pn[Kn] = null, pa = Pn[--Kn], Pn[Kn] = null;
  }
  function up(e, n) {
    Pn[Kn++] = pa, Pn[Kn++] = ga, Pn[Kn++] = Ga, pa = n.id, ga = n.overflow, Ga = e;
  }
  var dn = null, At = null, lt = !1, Pa = null, Xn = !1, ju = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vi(Gn(n, e)), ju;
  }
  function dp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Se] = e, n[je] = l, r) {
      case "dialog":
        rt("cancel", n), rt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        rt("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Bi.length; r++)
          rt(Bi[r], n);
        break;
      case "source":
        rt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        rt("error", n), rt("load", n);
        break;
      case "details":
        rt("toggle", n);
        break;
      case "input":
        rt("invalid", n), Em(
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
        rt("invalid", n);
        break;
      case "textarea":
        rt("invalid", n), Cm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Rv(n.textContent, r) ? (l.popover != null && (rt("beforetoggle", n), rt("toggle", n)), l.onScroll != null && rt("scroll", n), l.onScrollEnd != null && rt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function fp(e) {
    for (dn = e.return; dn; )
      switch (dn.tag) {
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
          dn = dn.return;
      }
  }
  function ps(e) {
    if (e !== dn) return !1;
    if (!lt) return fp(e), lt = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Id(e.type, e.memoizedProps)), r = !r), r && At && Ka(e), fp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      At = $v(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      At = $v(e);
    } else
      n === 27 ? (n = At, or(e.type) ? (e = Gd, Gd = null, At = e) : At = n) : At = dn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    At = dn = null, lt = !1;
  }
  function Eu() {
    var e = Pa;
    return e !== null && (Rn === null ? Rn = e : Rn.push.apply(
      Rn,
      e
    ), Pa = null), e;
  }
  function vi(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var Nu = _(null), zr = null, Ca = null;
  function Xa(e, n, r) {
    re(Nu, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Nu.current, ae(Nu);
  }
  function Cu(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Tu(e, n, r, l) {
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
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), Cu(
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
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), Cu(x, r, e), x = null;
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
          zn(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ue.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Fi) : e = [Fi]);
      }
      d = d.return;
    }
    e !== null && Tu(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Yl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zn(
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
  function fn(e) {
    return hp(zr, e);
  }
  function Gl(e, n) {
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
  var uj = typeof AbortController < "u" ? AbortController : function() {
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
  }, dj = t.unstable_scheduleCallback, fj = t.unstable_NormalPriority, Jt = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ru() {
    return {
      controller: new uj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yi(e) {
    e.refCount--, e.refCount === 0 && dj(fj, function() {
      e.controller.abort();
    });
  }
  var bi = null, _u = 0, vs = 0, ys = null;
  function hj(e, n) {
    if (bi === null) {
      var r = bi = [];
      _u = 0, vs = Dd(), ys = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return _u++, n.then(mp, mp), n;
  }
  function mp() {
    if (--_u === 0 && bi !== null) {
      ys !== null && (ys.status = "fulfilled");
      var e = bi;
      bi = null, vs = 0, ys = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function mj(e, n) {
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
    Jg = _t(), typeof n == "object" && n !== null && typeof n.then == "function" && hj(e, n), pp !== null && pp(e, n);
  };
  var Lr = _(null);
  function Mu() {
    var e = Lr.current;
    return e !== null ? e : jt.pooledCache;
  }
  function Pl(e, n) {
    n === null ? re(Lr, Lr.current) : re(Lr, n.pool);
  }
  function gp() {
    var e = Mu();
    return e === null ? null : { parent: Jt._currentValue, pool: e };
  }
  var bs = Error(i(460)), Au = Error(i(474)), Kl = Error(i(542)), Xl = { then: function() {
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
          if (e = jt, e !== null && 100 < e.shellSuspendCounter)
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
    if (e === bs || e === Kl)
      throw Error(i(483));
  }
  var xs = null, xi = 0;
  function Ql(e) {
    var n = xi;
    return xi += 1, xs === null && (xs = []), yp(xs, e, n);
  }
  function Si(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Zl(e, n) {
    throw n.$$typeof === w ? Error(i(525)) : (e = Object.prototype.toString.call(n), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function Sp(e) {
    function n(X, B) {
      if (e) {
        var ee = X.deletions;
        ee === null ? (X.deletions = [B], X.flags |= 16) : ee.push(B);
      }
    }
    function r(X, B) {
      if (!e) return null;
      for (; B !== null; )
        n(X, B), B = B.sibling;
      return null;
    }
    function l(X) {
      for (var B = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? B.set(X.key, X) : B.set(X.index, X), X = X.sibling;
      return B;
    }
    function d(X, B) {
      return X = Ea(X, B), X.index = 0, X.sibling = null, X;
    }
    function h(X, B, ee) {
      return X.index = ee, e ? (ee = X.alternate, ee !== null ? (ee = ee.index, ee < B ? (X.flags |= 67108866, B) : ee) : (X.flags |= 67108866, B)) : (X.flags |= 1048576, B);
    }
    function x(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, B, ee, fe) {
      return B === null || B.tag !== 6 ? (B = bu(ee, X.mode, fe), B.return = X, B) : (B = d(B, ee), B.return = X, B);
    }
    function L(X, B, ee, fe) {
      var Oe = ee.type;
      return Oe === T ? de(
        X,
        B,
        ee.props.children,
        fe,
        ee.key
      ) : B !== null && (B.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === M && $r(Oe) === B.type) ? (B = d(B, ee.props), Si(B, ee), B.return = X, B) : (B = ql(
        ee.type,
        ee.key,
        ee.props,
        null,
        X.mode,
        fe
      ), Si(B, ee), B.return = X, B);
    }
    function ne(X, B, ee, fe) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== ee.containerInfo || B.stateNode.implementation !== ee.implementation ? (B = xu(ee, X.mode, fe), B.return = X, B) : (B = d(B, ee.children || []), B.return = X, B);
    }
    function de(X, B, ee, fe, Oe) {
      return B === null || B.tag !== 7 ? (B = Dr(
        ee,
        X.mode,
        fe,
        Oe
      ), B.return = X, B) : (B = d(B, ee), B.return = X, B);
    }
    function me(X, B, ee) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = bu(
          "" + B,
          X.mode,
          ee
        ), B.return = X, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return ee = ql(
              B.type,
              B.key,
              B.props,
              null,
              X.mode,
              ee
            ), Si(ee, B), ee.return = X, ee;
          case j:
            return B = xu(
              B,
              X.mode,
              ee
            ), B.return = X, B;
          case M:
            return B = $r(B), me(X, B, ee);
        }
        if (ie(B) || J(B))
          return B = Dr(
            B,
            X.mode,
            ee,
            null
          ), B.return = X, B;
        if (typeof B.then == "function")
          return me(X, Ql(B), ee);
        if (B.$$typeof === O)
          return me(
            X,
            Gl(X, B),
            ee
          );
        Zl(X, B);
      }
      return null;
    }
    function se(X, B, ee, fe) {
      var Oe = B !== null ? B.key : null;
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return Oe !== null ? null : E(X, B, "" + ee, fe);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            return ee.key === Oe ? L(X, B, ee, fe) : null;
          case j:
            return ee.key === Oe ? ne(X, B, ee, fe) : null;
          case M:
            return ee = $r(ee), se(X, B, ee, fe);
        }
        if (ie(ee) || J(ee))
          return Oe !== null ? null : de(X, B, ee, fe, null);
        if (typeof ee.then == "function")
          return se(
            X,
            B,
            Ql(ee),
            fe
          );
        if (ee.$$typeof === O)
          return se(
            X,
            B,
            Gl(X, ee),
            fe
          );
        Zl(X, ee);
      }
      return null;
    }
    function le(X, B, ee, fe, Oe) {
      if (typeof fe == "string" && fe !== "" || typeof fe == "number" || typeof fe == "bigint")
        return X = X.get(ee) || null, E(B, X, "" + fe, Oe);
      if (typeof fe == "object" && fe !== null) {
        switch (fe.$$typeof) {
          case S:
            return X = X.get(
              fe.key === null ? ee : fe.key
            ) || null, L(B, X, fe, Oe);
          case j:
            return X = X.get(
              fe.key === null ? ee : fe.key
            ) || null, ne(B, X, fe, Oe);
          case M:
            return fe = $r(fe), le(
              X,
              B,
              ee,
              fe,
              Oe
            );
        }
        if (ie(fe) || J(fe))
          return X = X.get(ee) || null, de(B, X, fe, Oe, null);
        if (typeof fe.then == "function")
          return le(
            X,
            B,
            ee,
            Ql(fe),
            Oe
          );
        if (fe.$$typeof === O)
          return le(
            X,
            B,
            ee,
            Gl(B, fe),
            Oe
          );
        Zl(B, fe);
      }
      return null;
    }
    function Te(X, B, ee, fe) {
      for (var Oe = null, dt = null, De = B, Ke = B = 0, it = null; De !== null && Ke < ee.length; Ke++) {
        De.index > Ke ? (it = De, De = null) : it = De.sibling;
        var ft = se(
          X,
          De,
          ee[Ke],
          fe
        );
        if (ft === null) {
          De === null && (De = it);
          break;
        }
        e && De && ft.alternate === null && n(X, De), B = h(ft, B, Ke), dt === null ? Oe = ft : dt.sibling = ft, dt = ft, De = it;
      }
      if (Ke === ee.length)
        return r(X, De), lt && Na(X, Ke), Oe;
      if (De === null) {
        for (; Ke < ee.length; Ke++)
          De = me(X, ee[Ke], fe), De !== null && (B = h(
            De,
            B,
            Ke
          ), dt === null ? Oe = De : dt.sibling = De, dt = De);
        return lt && Na(X, Ke), Oe;
      }
      for (De = l(De); Ke < ee.length; Ke++)
        it = le(
          De,
          X,
          Ke,
          ee[Ke],
          fe
        ), it !== null && (e && it.alternate !== null && De.delete(
          it.key === null ? Ke : it.key
        ), B = h(
          it,
          B,
          Ke
        ), dt === null ? Oe = it : dt.sibling = it, dt = it);
      return e && De.forEach(function(hr) {
        return n(X, hr);
      }), lt && Na(X, Ke), Oe;
    }
    function Be(X, B, ee, fe) {
      if (ee == null) throw Error(i(151));
      for (var Oe = null, dt = null, De = B, Ke = B = 0, it = null, ft = ee.next(); De !== null && !ft.done; Ke++, ft = ee.next()) {
        De.index > Ke ? (it = De, De = null) : it = De.sibling;
        var hr = se(X, De, ft.value, fe);
        if (hr === null) {
          De === null && (De = it);
          break;
        }
        e && De && hr.alternate === null && n(X, De), B = h(hr, B, Ke), dt === null ? Oe = hr : dt.sibling = hr, dt = hr, De = it;
      }
      if (ft.done)
        return r(X, De), lt && Na(X, Ke), Oe;
      if (De === null) {
        for (; !ft.done; Ke++, ft = ee.next())
          ft = me(X, ft.value, fe), ft !== null && (B = h(ft, B, Ke), dt === null ? Oe = ft : dt.sibling = ft, dt = ft);
        return lt && Na(X, Ke), Oe;
      }
      for (De = l(De); !ft.done; Ke++, ft = ee.next())
        ft = le(De, X, Ke, ft.value, fe), ft !== null && (e && ft.alternate !== null && De.delete(ft.key === null ? Ke : ft.key), B = h(ft, B, Ke), dt === null ? Oe = ft : dt.sibling = ft, dt = ft);
      return e && De.forEach(function(NE) {
        return n(X, NE);
      }), lt && Na(X, Ke), Oe;
    }
    function St(X, B, ee, fe) {
      if (typeof ee == "object" && ee !== null && ee.type === T && ee.key === null && (ee = ee.props.children), typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            e: {
              for (var Oe = ee.key; B !== null; ) {
                if (B.key === Oe) {
                  if (Oe = ee.type, Oe === T) {
                    if (B.tag === 7) {
                      r(
                        X,
                        B.sibling
                      ), fe = d(
                        B,
                        ee.props.children
                      ), fe.return = X, X = fe;
                      break e;
                    }
                  } else if (B.elementType === Oe || typeof Oe == "object" && Oe !== null && Oe.$$typeof === M && $r(Oe) === B.type) {
                    r(
                      X,
                      B.sibling
                    ), fe = d(B, ee.props), Si(fe, ee), fe.return = X, X = fe;
                    break e;
                  }
                  r(X, B);
                  break;
                } else n(X, B);
                B = B.sibling;
              }
              ee.type === T ? (fe = Dr(
                ee.props.children,
                X.mode,
                fe,
                ee.key
              ), fe.return = X, X = fe) : (fe = ql(
                ee.type,
                ee.key,
                ee.props,
                null,
                X.mode,
                fe
              ), Si(fe, ee), fe.return = X, X = fe);
            }
            return x(X);
          case j:
            e: {
              for (Oe = ee.key; B !== null; ) {
                if (B.key === Oe)
                  if (B.tag === 4 && B.stateNode.containerInfo === ee.containerInfo && B.stateNode.implementation === ee.implementation) {
                    r(
                      X,
                      B.sibling
                    ), fe = d(B, ee.children || []), fe.return = X, X = fe;
                    break e;
                  } else {
                    r(X, B);
                    break;
                  }
                else n(X, B);
                B = B.sibling;
              }
              fe = xu(ee, X.mode, fe), fe.return = X, X = fe;
            }
            return x(X);
          case M:
            return ee = $r(ee), St(
              X,
              B,
              ee,
              fe
            );
        }
        if (ie(ee))
          return Te(
            X,
            B,
            ee,
            fe
          );
        if (J(ee)) {
          if (Oe = J(ee), typeof Oe != "function") throw Error(i(150));
          return ee = Oe.call(ee), Be(
            X,
            B,
            ee,
            fe
          );
        }
        if (typeof ee.then == "function")
          return St(
            X,
            B,
            Ql(ee),
            fe
          );
        if (ee.$$typeof === O)
          return St(
            X,
            B,
            Gl(X, ee),
            fe
          );
        Zl(X, ee);
      }
      return typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint" ? (ee = "" + ee, B !== null && B.tag === 6 ? (r(X, B.sibling), fe = d(B, ee), fe.return = X, X = fe) : (r(X, B), fe = bu(ee, X.mode, fe), fe.return = X, X = fe), x(X)) : r(X, B);
    }
    return function(X, B, ee, fe) {
      try {
        xi = 0;
        var Oe = St(
          X,
          B,
          ee,
          fe
        );
        return xs = null, Oe;
      } catch (De) {
        if (De === bs || De === Kl) throw De;
        var dt = On(29, De, null, X.mode);
        return dt.lanes = fe, dt.return = X, dt;
      } finally {
      }
    };
  }
  var Br = Sp(!0), wp = Sp(!1), Qa = !1;
  function Du(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ku(e, n) {
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
    if (l = l.shared, (ht & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Hl(e), sp(e, null, r), n;
    }
    return Il(e, l, n, r), Hl(e);
  }
  function wi(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, vn(e, r);
    }
  }
  function zu(e, n) {
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
  var Ou = !1;
  function ji() {
    if (Ou) {
      var e = ys;
      if (e !== null) throw e;
    }
  }
  function Ei(e, n, r, l) {
    Ou = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, ne = L.next;
      L.next = null, x === null ? h = ne : x.next = ne, x = L;
      var de = e.alternate;
      de !== null && (de = de.updateQueue, E = de.lastBaseUpdate, E !== x && (E === null ? de.firstBaseUpdate = ne : E.next = ne, de.lastBaseUpdate = L));
    }
    if (h !== null) {
      var me = d.baseState;
      x = 0, de = ne = L = null, E = h;
      do {
        var se = E.lane & -536870913, le = se !== E.lane;
        if (le ? (st & se) === se : (l & se) === se) {
          se !== 0 && se === vs && (Ou = !0), de !== null && (de = de.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Te = e, Be = E;
            se = n;
            var St = r;
            switch (Be.tag) {
              case 1:
                if (Te = Be.payload, typeof Te == "function") {
                  me = Te.call(St, me, se);
                  break e;
                }
                me = Te;
                break e;
              case 3:
                Te.flags = Te.flags & -65537 | 128;
              case 0:
                if (Te = Be.payload, se = typeof Te == "function" ? Te.call(St, me, se) : Te, se == null) break e;
                me = v({}, me, se);
                break e;
              case 2:
                Qa = !0;
            }
          }
          se = E.callback, se !== null && (e.flags |= 64, le && (e.flags |= 8192), le = d.callbacks, le === null ? d.callbacks = [se] : le.push(se));
        } else
          le = {
            lane: se,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, de === null ? (ne = de = le, L = me) : de = de.next = le, x |= se;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          le = E, E = le.next, le.next = null, d.lastBaseUpdate = le, d.shared.pending = null;
        }
      } while (!0);
      de === null && (L = me), d.baseState = L, d.firstBaseUpdate = ne, d.lastBaseUpdate = de, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = me;
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
  var Ss = _(null), Jl = _(0);
  function Np(e, n) {
    e = La, re(Jl, e), re(Ss, n), La = e | n.baseLanes;
  }
  function Lu() {
    re(Jl, La), re(Ss, Ss.current);
  }
  function $u() {
    La = Jl.current, ae(Ss), ae(Jl);
  }
  var Ln = _(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    re(Gt, Gt.current & 1), re(Ln, e), Qn === null && (n === null || Ss.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Uu(e) {
    re(Gt, Gt.current), re(Ln, e), Qn === null && (Qn = e);
  }
  function Cp(e) {
    e.tag === 22 ? (re(Gt, Gt.current), re(Ln, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    re(Gt, Gt.current), re(Ln, Ln.current);
  }
  function $n(e) {
    ae(Ln), Qn === e && (Qn = null), ae(Gt);
  }
  var Gt = _(0);
  function Wl(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Fd(r) || Yd(r)))
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
  var Ra = 0, Ye = null, bt = null, Wt = null, eo = !1, ws = !1, Vr = !1, to = 0, Ni = 0, js = null, pj = 0;
  function Ht() {
    throw Error(i(321));
  }
  function Bu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!zn(e[r], n[r])) return !1;
    return !0;
  }
  function Vu(e, n, r, l, d, h) {
    return Ra = h, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, A.H = e === null || e.memoizedState === null ? cg : td, Vr = !1, h = r(l, d), Vr = !1, ws && (h = Rp(
      n,
      r,
      l,
      d
    )), Tp(e), h;
  }
  function Tp(e) {
    A.H = Ri;
    var n = bt !== null && bt.next !== null;
    if (Ra = 0, Wt = bt = Ye = null, eo = !1, Ni = 0, js = null, n) throw Error(i(300));
    e === null || en || (e = e.dependencies, e !== null && Yl(e) && (en = !0));
  }
  function Rp(e, n, r, l) {
    Ye = e;
    var d = 0;
    do {
      if (ws && (js = null), Ni = 0, ws = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Wt = bt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      A.H = ug, h = n(r, l);
    } while (ws);
    return h;
  }
  function gj() {
    var e = A.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ci(n) : n, e = e.useState()[0], (bt !== null ? bt.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function Iu() {
    var e = to !== 0;
    return to = 0, e;
  }
  function Hu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function qu(e) {
    if (eo) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      eo = !1;
    }
    Ra = 0, Wt = bt = Ye = null, ws = !1, Ni = to = 0, js = null;
  }
  function jn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Wt === null ? Ye.memoizedState = Wt = e : Wt = Wt.next = e, Wt;
  }
  function Pt() {
    if (bt === null) {
      var e = Ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = bt.next;
    var n = Wt === null ? Ye.memoizedState : Wt.next;
    if (n !== null)
      Wt = n, bt = e;
    else {
      if (e === null)
        throw Ye.alternate === null ? Error(i(467)) : Error(i(310));
      bt = e, e = {
        memoizedState: bt.memoizedState,
        baseState: bt.baseState,
        baseQueue: bt.baseQueue,
        queue: bt.queue,
        next: null
      }, Wt === null ? Ye.memoizedState = Wt = e : Wt = Wt.next = e;
    }
    return Wt;
  }
  function no() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ci(e) {
    var n = Ni;
    return Ni += 1, js === null && (js = []), e = yp(js, e, n), n = Ye, (Wt === null ? n.memoizedState : Wt.next) === null && (n = n.alternate, A.H = n === null || n.memoizedState === null ? cg : td), e;
  }
  function ao(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ci(e);
      if (e.$$typeof === O) return fn(e);
    }
    throw Error(i(438, String(e)));
  }
  function Fu(e) {
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
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = no(), Ye.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = k;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ro(e) {
    var n = Pt();
    return Yu(n, bt, e);
  }
  function Yu(e, n, r) {
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
      var E = x = null, L = null, ne = n, de = !1;
      do {
        var me = ne.lane & -536870913;
        if (me !== ne.lane ? (st & me) === me : (Ra & me) === me) {
          var se = ne.revertLane;
          if (se === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ne.action,
              hasEagerState: ne.hasEagerState,
              eagerState: ne.eagerState,
              next: null
            }), me === vs && (de = !0);
          else if ((Ra & se) === se) {
            ne = ne.next, se === vs && (de = !0);
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
            }, L === null ? (E = L = me, x = h) : L = L.next = me, Ye.lanes |= se, ar |= se;
          me = ne.action, Vr && r(h, me), h = ne.hasEagerState ? ne.eagerState : r(h, me);
        } else
          se = {
            lane: me,
            revertLane: ne.revertLane,
            gesture: ne.gesture,
            action: ne.action,
            hasEagerState: ne.hasEagerState,
            eagerState: ne.eagerState,
            next: null
          }, L === null ? (E = L = se, x = h) : L = L.next = se, Ye.lanes |= me, ar |= me;
        ne = ne.next;
      } while (ne !== null && ne !== n);
      if (L === null ? x = h : L.next = E, !zn(h, e.memoizedState) && (en = !0, de && (r = ys, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Gu(e) {
    var n = Pt(), r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      zn(h, n.memoizedState) || (en = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function _p(e, n, r) {
    var l = Ye, d = Pt(), h = lt;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !zn(
      (bt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, en = !0), d = d.queue, Xu(Dp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Wt !== null && Wt.memoizedState.tag & 1) {
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
      ), jt === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || Mp(l, n, r);
    }
    return r;
  }
  function Mp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ye.updateQueue, n === null ? (n = no(), Ye.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
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
      return !zn(e, r);
    } catch {
      return !0;
    }
  }
  function zp(e) {
    var n = Ar(e, 2);
    n !== null && _n(n, e, 2);
  }
  function Pu(e) {
    var n = jn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        mt(!0);
        try {
          r();
        } finally {
          mt(!1);
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
    return e.baseState = r, Yu(
      e,
      bt,
      typeof l == "function" ? l : _a
    );
  }
  function vj(e, n, r, l, d) {
    if (lo(e)) throw Error(i(485));
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
        Ku(e, n, ne);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), A.T = h;
      }
    } else
      try {
        h = r(d, l), $p(e, n, h);
      } catch (ne) {
        Ku(e, n, ne);
      }
  }
  function $p(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Up(e, n, l);
      },
      function(l) {
        return Ku(e, n, l);
      }
    ) : Up(e, n, r);
  }
  function Up(e, n, r) {
    n.status = "fulfilled", n.value = r, Bp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Lp(e, r)));
  }
  function Ku(e, n, r) {
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
      var r = jt.formState;
      if (r !== null) {
        e: {
          var l = Ye;
          if (lt) {
            if (At) {
              t: {
                for (var d = At, h = Xn; d.nodeType !== 8; ) {
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
                At = Zn(
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
      lastRenderedReducer: Vp,
      lastRenderedState: n
    }, r.queue = l, r = ig.bind(
      null,
      Ye,
      l
    ), l.dispatch = r, l = Pu(!1), h = ed.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = jn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = vj.bind(
      null,
      Ye,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Hp(e) {
    var n = Pt();
    return qp(n, bt, e);
  }
  function qp(e, n, r) {
    if (n = Yu(
      e,
      n,
      Vp
    )[0], e = ro(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ci(n);
      } catch (x) {
        throw x === bs ? Kl : x;
      }
    else l = n;
    n = Pt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Ye.flags |= 2048, Es(
      9,
      { destroy: void 0 },
      yj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function yj(e, n) {
    e.action = n;
  }
  function Fp(e) {
    var n = Pt(), r = bt;
    if (r !== null)
      return qp(n, r, e);
    Pt(), n = n.memoizedState, r = Pt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Es(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = no(), Ye.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Yp() {
    return Pt().memoizedState;
  }
  function so(e, n, r, l) {
    var d = jn();
    Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function io(e, n, r, l) {
    var d = Pt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    bt !== null && l !== null && Bu(l, bt.memoizedState.deps) ? d.memoizedState = Es(n, h, r, l) : (Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Gp(e, n) {
    so(8390656, 8, e, n);
  }
  function Xu(e, n) {
    io(2048, 8, e, n);
  }
  function bj(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = no(), Ye.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Pp(e) {
    var n = Pt().memoizedState;
    return bj({ ref: n, nextImpl: e }), function() {
      if ((ht & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Kp(e, n) {
    return io(4, 2, e, n);
  }
  function Xp(e, n) {
    return io(4, 4, e, n);
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
    r = r != null ? r.concat([e]) : null, io(4, 4, Qp.bind(null, n, e), r);
  }
  function Qu() {
  }
  function Jp(e, n) {
    var r = Pt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Bu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Wp(e, n) {
    var r = Pt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Bu(n, l[1]))
      return l[0];
    if (l = e(), Vr) {
      mt(!0);
      try {
        e();
      } finally {
        mt(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function Zu(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (st & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = ev(), Ye.lanes |= e, ar |= e, r);
  }
  function eg(e, n, r, l) {
    return zn(r, n) ? r : Ss.current !== null ? (e = Zu(e, r, l), zn(e, n) || (en = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (st & 261930) === 0 ? (en = !0, e.memoizedState = r) : (e = ev(), Ye.lanes |= e, ar |= e, n);
  }
  function tg(e, n, r, l, d) {
    var h = Y.p;
    Y.p = h !== 0 && 8 > h ? h : 8;
    var x = A.T, E = {};
    A.T = E, ed(e, !1, n, r);
    try {
      var L = d(), ne = A.S;
      if (ne !== null && ne(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var de = mj(
          L,
          l
        );
        Ti(
          e,
          n,
          de,
          Vn(e)
        );
      } else
        Ti(
          e,
          n,
          l,
          Vn(e)
        );
    } catch (me) {
      Ti(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: me },
        Vn()
      );
    } finally {
      Y.p = h, x !== null && E.types !== null && (x.types = E.types), A.T = x;
    }
  }
  function xj() {
  }
  function Ju(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = ng(e).queue;
    tg(
      e,
      d,
      n,
      $,
      r === null ? xj : function() {
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
    n.next === null && (n = e.alternate.memoizedState), Ti(
      e,
      n.next.queue,
      {},
      Vn()
    );
  }
  function Wu() {
    return fn(Fi);
  }
  function rg() {
    return Pt().memoizedState;
  }
  function sg() {
    return Pt().memoizedState;
  }
  function Sj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Vn();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (_n(l, n, r), wi(l, n, r)), n = { cache: Ru() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function wj(e, n, r) {
    var l = Vn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(e) ? lg(n, r) : (r = vu(e, n, r, l), r !== null && (_n(r, e, l), og(r, n, l)));
  }
  function ig(e, n, r) {
    var l = Vn();
    Ti(e, n, r, l);
  }
  function Ti(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (lo(e)) lg(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, zn(E, x))
            return Il(e, n, d, 0), jt === null && Vl(), !1;
        } catch {
        } finally {
        }
      if (r = vu(e, n, d, l), r !== null)
        return _n(r, e, l), og(r, n, l), !0;
    }
    return !1;
  }
  function ed(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Dd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(e)) {
      if (n) throw Error(i(479));
    } else
      n = vu(
        e,
        r,
        l,
        2
      ), n !== null && _n(n, e, 2);
  }
  function lo(e) {
    var n = e.alternate;
    return e === Ye || n !== null && n === Ye;
  }
  function lg(e, n) {
    ws = eo = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function og(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, vn(e, r);
    }
  }
  var Ri = {
    readContext: fn,
    use: ao,
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
  Ri.useEffectEvent = Ht;
  var cg = {
    readContext: fn,
    use: ao,
    useCallback: function(e, n) {
      return jn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: fn,
    useEffect: Gp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        Qp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return so(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      so(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = jn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Vr) {
        mt(!0);
        try {
          e();
        } finally {
          mt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = jn();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          mt(!0);
          try {
            r(n);
          } finally {
            mt(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = wj.bind(
        null,
        Ye,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = jn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Pu(e);
      var n = e.queue, r = ig.bind(null, Ye, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Qu,
    useDeferredValue: function(e, n) {
      var r = jn();
      return Zu(r, e, n);
    },
    useTransition: function() {
      var e = Pu(!1);
      return e = tg.bind(
        null,
        Ye,
        e.queue,
        !0,
        !1
      ), jn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Ye, d = jn();
      if (lt) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), jt === null)
          throw Error(i(349));
        (st & 127) !== 0 || Mp(l, n, r);
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
      var e = jn(), n = jt.identifierPrefix;
      if (lt) {
        var r = ga, l = pa;
        r = (l & ~(1 << 32 - ce(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = to++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = pj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Wu,
    useFormState: Ip,
    useActionState: Ip,
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
      return n.queue = r, n = ed.bind(
        null,
        Ye,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Fu,
    useCacheRefresh: function() {
      return jn().memoizedState = Sj.bind(
        null,
        Ye
      );
    },
    useEffectEvent: function(e) {
      var n = jn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((ht & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, td = {
    readContext: fn,
    use: ao,
    useCallback: Jp,
    useContext: fn,
    useEffect: Xu,
    useImperativeHandle: Zp,
    useInsertionEffect: Kp,
    useLayoutEffect: Xp,
    useMemo: Wp,
    useReducer: ro,
    useRef: Yp,
    useState: function() {
      return ro(_a);
    },
    useDebugValue: Qu,
    useDeferredValue: function(e, n) {
      var r = Pt();
      return eg(
        r,
        bt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = ro(_a)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ci(e),
        n
      ];
    },
    useSyncExternalStore: _p,
    useId: rg,
    useHostTransitionStatus: Wu,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e, n) {
      var r = Pt();
      return Op(r, bt, e, n);
    },
    useMemoCache: Fu,
    useCacheRefresh: sg
  };
  td.useEffectEvent = Pp;
  var ug = {
    readContext: fn,
    use: ao,
    useCallback: Jp,
    useContext: fn,
    useEffect: Xu,
    useImperativeHandle: Zp,
    useInsertionEffect: Kp,
    useLayoutEffect: Xp,
    useMemo: Wp,
    useReducer: Gu,
    useRef: Yp,
    useState: function() {
      return Gu(_a);
    },
    useDebugValue: Qu,
    useDeferredValue: function(e, n) {
      var r = Pt();
      return bt === null ? Zu(r, e, n) : eg(
        r,
        bt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Gu(_a)[0], n = Pt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ci(e),
        n
      ];
    },
    useSyncExternalStore: _p,
    useId: rg,
    useHostTransitionStatus: Wu,
    useFormState: Fp,
    useActionState: Fp,
    useOptimistic: function(e, n) {
      var r = Pt();
      return bt !== null ? Op(r, bt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Fu,
    useCacheRefresh: sg
  };
  ug.useEffectEvent = Pp;
  function nd(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var ad = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = Vn(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (_n(n, e, l), wi(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = Vn(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (_n(n, e, l), wi(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Vn(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (_n(n, e, r), wi(n, e, r));
    }
  };
  function dg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !mi(r, l) || !mi(d, h) : !0;
  }
  function fg(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && ad.enqueueReplaceState(n, n.state, null);
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
    Bl(e);
  }
  function mg(e) {
    console.error(e);
  }
  function pg(e) {
    Bl(e);
  }
  function oo(e, n) {
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
  function rd(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      oo(e, n);
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
  function jj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && gs(
        n,
        r,
        d,
        !0
      ), r = Ln.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? So() : r.alternate === null && qt === 0 && (qt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Xl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), _d(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Xl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), _d(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return _d(e, l, d), So(), !1;
    }
    if (lt)
      return n = Ln.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== ju && (e = Error(i(422), { cause: l }), vi(Gn(e, r)))) : (l !== ju && (n = Error(i(423), {
        cause: l
      }), vi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = rd(
        e.stateNode,
        l,
        d
      ), zu(e, d), qt !== 4 && (qt = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), Li === null ? Li = [h] : Li.push(h), qt !== 4 && (qt = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = rd(r.stateNode, l, e), zu(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = vg(d), yg(
              d,
              e,
              r,
              l
            ), zu(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var sd = Error(i(461)), en = !1;
  function hn(e, n, r, l) {
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
    return Or(n), l = Vu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Iu(), e !== null && !en ? (Hu(e, n, d), Ma(e, n, d)) : (lt && E && Su(n), n.flags |= 1, hn(e, n, l, d), n.child);
  }
  function xg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !yu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, Sg(
        e,
        n,
        h,
        l,
        d
      )) : (e = ql(
        r.type,
        null,
        l,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !hd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : mi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function Sg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (mi(h, l) && e.ref === n.ref)
        if (en = !1, n.pendingProps = l = h, hd(e, d))
          (e.flags & 131072) !== 0 && (en = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return id(
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
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Pl(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Np(n, h) : Lu(), Cp(n);
      else
        return l = n.lanes = 536870912, jg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Pl(n, h.cachePool), Np(n, h), er(), n.memoizedState = null) : (e !== null && Pl(n, null), Lu(), er());
    return hn(e, n, d, r), n.child;
  }
  function _i(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function jg(e, n, r, l, d) {
    var h = Mu();
    return h = h === null ? null : { parent: Jt._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Pl(n, null), Lu(), Cp(n), e !== null && gs(e, n, l, !0), n.childLanes = d, null;
  }
  function co(e, n) {
    return n = fo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function Eg(e, n, r) {
    return Br(n, e.child, null, r), e = co(n, n.pendingProps), e.flags |= 2, $n(n), n.memoizedState = null, e;
  }
  function Ej(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (lt) {
        if (l.mode === "hidden")
          return e = co(n, l), n.lanes = 536870912, _i(null, e);
        if (Uu(n), (e = At) ? (e = Lv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = lp(e), r.return = n, n.child = r, dn = n, At = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return co(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Uu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = Eg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (en || gs(e, n, r, !1), d = (r & e.childLanes) !== 0, en || d) {
        if (l = jt, l !== null && (x = z(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), _n(l, e, x), sd;
        So(), n = Eg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, At = Zn(x.nextSibling), dn = n, lt = !0, Pa = null, Xn = !1, e !== null && up(n, e), n = co(n, l), n.flags |= 4096;
      return n;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function uo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function id(e, n, r, l, d) {
    return Or(n), r = Vu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Iu(), e !== null && !en ? (Hu(e, n, d), Ma(e, n, d)) : (lt && l && Su(n), n.flags |= 1, hn(e, n, r, d), n.child);
  }
  function Ng(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = Rp(
      n,
      l,
      r,
      d
    ), Tp(e), l = Iu(), e !== null && !en ? (Hu(e, n, h), Ma(e, n, h)) : (lt && l && Su(n), n.flags |= 1, hn(e, n, r, h), n.child);
  }
  function Cg(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = fs, x = r.contextType;
      typeof x == "object" && x !== null && (h = fn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = ad, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Du(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? fn(x) : fs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (nd(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && ad.enqueueReplaceState(h, h.state, null), Ei(n, l, h, d), ji(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Ir(r, E);
      h.props = L;
      var ne = h.context, de = r.contextType;
      x = fs, typeof de == "object" && de !== null && (x = fn(de));
      var me = r.getDerivedStateFromProps;
      de = typeof me == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, de || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ne !== x) && fg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var se = n.memoizedState;
      h.state = se, Ei(n, l, h, d), ji(), ne = n.memoizedState, E || se !== ne || Qa ? (typeof me == "function" && (nd(
        n,
        r,
        me,
        l
      ), ne = n.memoizedState), (L = Qa || dg(
        n,
        r,
        L,
        l,
        se,
        ne,
        x
      )) ? (de || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ne), h.props = l, h.state = ne, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, ku(e, n), x = n.memoizedProps, de = Ir(r, x), h.props = de, me = n.pendingProps, se = h.context, ne = r.contextType, L = fs, typeof ne == "object" && ne !== null && (L = fn(ne)), E = r.getDerivedStateFromProps, (ne = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== me || se !== L) && fg(
        n,
        h,
        l,
        L
      ), Qa = !1, se = n.memoizedState, h.state = se, Ei(n, l, h, d), ji();
      var le = n.memoizedState;
      x !== me || se !== le || Qa || e !== null && e.dependencies !== null && Yl(e.dependencies) ? (typeof E == "function" && (nd(
        n,
        r,
        E,
        l
      ), le = n.memoizedState), (de = Qa || dg(
        n,
        r,
        de,
        l,
        se,
        le,
        L
      ) || e !== null && e.dependencies !== null && Yl(e.dependencies)) ? (ne || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, le, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        le,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = le), h.props = l, h.state = le, h.context = L, l = de) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, uo(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = Br(
      n,
      e.child,
      null,
      d
    ), n.child = Br(
      n,
      null,
      r,
      d
    )) : hn(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function Tg(e, n, r, l) {
    return kr(), n.flags |= 256, hn(e, n, r, l), n.child;
  }
  var ld = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function od(e) {
    return { baseLanes: e, cachePool: gp() };
  }
  function cd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Bn), e;
  }
  function Rg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Gt.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (lt) {
        if (d ? Wa(n) : er(), (e = At) ? (e = Lv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: pa, overflow: ga } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = lp(e), r.return = n, n.child = r, dn = n, At = null)) : e = null, e === null) throw Ka(n);
        return Yd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = fo(
        { mode: "hidden", children: E },
        d
      ), l = Dr(
        l,
        d,
        r,
        null
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = od(r), l.childLanes = cd(
        e,
        x,
        r
      ), n.memoizedState = ld, _i(null, l)) : (Wa(n), ud(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = dd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = fo(
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
        ), l = n.child, l.memoizedState = od(r), l.childLanes = cd(
          e,
          x,
          r
        ), n.memoizedState = ld, n = _i(null, l));
      else if (Wa(n), Yd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ne = x.dgst;
        x = ne, l = Error(i(419)), l.stack = "", l.digest = x, vi({ value: l, source: null, stack: null }), n = dd(
          e,
          n,
          r
        );
      } else if (en || gs(e, n, r, !1), x = (r & e.childLanes) !== 0, en || x) {
        if (x = jt, x !== null && (l = z(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), _n(x, e, l), sd;
        Fd(E) || So(), n = dd(
          e,
          n,
          r
        );
      } else
        Fd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, At = Zn(
          E.nextSibling
        ), dn = n, lt = !0, Pa = null, Xn = !1, e !== null && up(n, e), n = ud(
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
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, _i(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = od(r) : (d = E.cachePool, d !== null ? (L = Jt._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = gp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = cd(
      e,
      x,
      r
    ), n.memoizedState = ld, _i(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function ud(e, n) {
    return n = fo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function fo(e, n) {
    return e = On(22, e, null, n), e.lanes = 0, e;
  }
  function dd(e, n, r) {
    return Br(n, e.child, null, r), e = ud(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function _g(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Cu(e.return, n, r);
  }
  function fd(e, n, r, l, d, h) {
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
    var x = Gt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, re(Gt, x), hn(e, n, l, r), l = lt ? gi : 0, !E && e !== null && (e.flags & 128) !== 0)
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
          e = r.alternate, e !== null && Wl(e) === null && (d = r), r = r.sibling;
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), fd(
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
          if (e = d.alternate, e !== null && Wl(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = r, r = d, d = e;
        }
        fd(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        fd(
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
  function hd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Yl(e)));
  }
  function Nj(e, n, r) {
    switch (n.tag) {
      case 3:
        ve(n, n.stateNode.containerInfo), Xa(n, Jt, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        Ge(n);
        break;
      case 4:
        ve(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, Uu(n), null;
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
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), re(Gt, Gt.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, wg(
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
  function Ag(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        en = !0;
      else {
        if (!hd(e, r) && (n.flags & 128) === 0)
          return en = !1, Nj(
            e,
            n,
            r
          );
        en = (e.flags & 131072) !== 0;
      }
    else
      en = !1, lt && (n.flags & 1048576) !== 0 && cp(n, gi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = $r(n.elementType), n.type = e, typeof e == "function")
            yu(e) ? (l = Ir(e, l), n.tag = 1, n = Cg(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = id(
              null,
              n,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === C) {
                n.tag = 11, n = bg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === te) {
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
        return id(
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
          if (ve(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          d = h.element, ku(e, n), Ei(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Jt, l), l !== h.cache && Tu(
            n,
            [Jt],
            r,
            !0
          ), ji(), l = x.element, h.isDehydrated)
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
              ), vi(d), n = Tg(
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
              for (At = Zn(e.firstChild), dn = n, lt = !0, Pa = null, Xn = !0, r = wp(
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
            hn(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return uo(e, n), e === null ? (r = Hv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : lt || (r = n.type, e = n.pendingProps, l = Ro(
          W.current
        ).createElement(r), l[Se] = n, l[je] = e, mn(l, r, e), Nt(l), n.stateNode = l) : n.memoizedState = Hv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ge(n), e === null && lt && (l = n.stateNode = Bv(
          n.type,
          n.pendingProps,
          W.current
        ), dn = n, Xn = !0, d = At, or(n.type) ? (Gd = d, At = Zn(l.firstChild)) : At = d), hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), uo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && lt && ((d = l = At) && (l = tE(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, dn = n, At = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), Ge(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Id(d, h) ? l = null : x !== null && Id(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Vu(
          e,
          n,
          gj,
          null,
          null,
          r
        ), Fi._currentValue = d), uo(e, n), hn(e, n, l, r), n.child;
      case 6:
        return e === null && lt && ((e = r = At) && (r = nE(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, dn = n, At = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Rg(e, n, r);
      case 4:
        return ve(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          l,
          r
        ) : hn(e, n, l, r), n.child;
      case 11:
        return bg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return hn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return hn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), hn(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Or(n), d = fn(d), l = l(d), n.flags |= 1, hn(e, n, l, r), n.child;
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
        return Ej(e, n, r);
      case 22:
        return wg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = fn(Jt), e === null ? (d = Mu(), d === null && (d = jt, h = Ru(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Du(n), Xa(n, Jt, d)) : ((e.lanes & r) !== 0 && (ku(e, n), Ei(n, null, null, r), ji()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Jt, l)) : (l = h.cache, Xa(n, Jt, l), l !== d.cache && Tu(
          n,
          [Jt],
          r,
          !0
        ))), hn(
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
  function md(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (rv()) e.flags |= 8192;
        else
          throw Ur = Xl, Au;
    } else e.flags &= -16777217;
  }
  function Dg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Pv(n))
      if (rv()) e.flags |= 8192;
      else
        throw Ur = Xl, Au;
  }
  function ho(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? It() : 536870912, e.lanes |= n, Rs |= n);
  }
  function Mi(e, n) {
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
  function Dt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function Cj(e, n, r) {
    var l = n.pendingProps;
    switch (wu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Dt(n), null;
      case 1:
        return Dt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Jt), Ce(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ps(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Eu())), Dt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Dt(n), Dg(n, h)) : (Dt(n), md(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Dt(n), Dg(n, h)) : (Dt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Dt(n), md(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ee(n), r = W.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Dt(n), null;
          }
          e = G.current, ps(n) ? dp(n) : (e = Bv(d, l, r), n.stateNode = e, Aa(n));
        }
        return Dt(n), null;
      case 5:
        if (Ee(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Dt(n), null;
          }
          if (h = G.current, ps(n))
            dp(n);
          else {
            var x = Ro(
              W.current
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
            h[Se] = n, h[je] = l;
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
            e: switch (mn(h, d, l), d) {
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
        return Dt(n), md(
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
          if (e = W.current, ps(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = dn, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[Se] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Rv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Ro(e).createTextNode(
              l
            ), e[Se] = n, n.stateNode = e;
        }
        return Dt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = ps(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Dt(n), e = !1;
          } else
            r = Eu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Dt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = ps(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Dt(n), d = !1;
          } else
            d = Eu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? ($n(n), n) : ($n(n), null);
        }
        return $n(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), ho(n, n.updateQueue), Dt(n), null);
      case 4:
        return Ce(), e === null && Ld(n.stateNode.containerInfo), Dt(n), null;
      case 10:
        return Ta(n.type), Dt(n), null;
      case 19:
        if (ae(Gt), l = n.memoizedState, l === null) return Dt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Mi(l, !1);
          else {
            if (qt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = Wl(e), h !== null) {
                  for (n.flags |= 128, Mi(l, !1), e = h.updateQueue, n.updateQueue = e, ho(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    ip(r, e), r = r.sibling;
                  return re(
                    Gt,
                    Gt.current & 1 | 2
                  ), lt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && _t() > yo && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Wl(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, ho(n, e), Mi(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !lt)
                return Dt(n), null;
            } else
              2 * _t() - l.renderingStartTime > yo && r !== 536870912 && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = _t(), e.sibling = null, r = Gt.current, re(
          Gt,
          d ? r & 1 | 2 : r & 1
        ), lt && Na(n, l.treeForkCount), e) : (Dt(n), null);
      case 22:
      case 23:
        return $n(n), $u(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Dt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Dt(n), r = n.updateQueue, r !== null && ho(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ae(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Jt), Dt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Tj(e, n) {
    switch (wu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Jt), Ce(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ee(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($n(n), n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if ($n(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return ae(Gt), null;
      case 4:
        return Ce(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return $n(n), $u(), e !== null && ae(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Jt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kg(e, n) {
    switch (wu(n), n.tag) {
      case 3:
        Ta(Jt), Ce();
        break;
      case 26:
      case 27:
      case 5:
        Ee(n);
        break;
      case 4:
        Ce();
        break;
      case 31:
        n.memoizedState !== null && $n(n);
        break;
      case 13:
        $n(n);
        break;
      case 19:
        ae(Gt);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        $n(n), $u(), e !== null && ae(Lr);
        break;
      case 24:
        Ta(Jt);
    }
  }
  function Ai(e, n) {
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
      gt(n, n.return, E);
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
              } catch (de) {
                gt(
                  d,
                  L,
                  de
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (de) {
      gt(n, n.return, de);
    }
  }
  function zg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        Ep(n, r);
      } catch (l) {
        gt(e, e.return, l);
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
      gt(e, n, l);
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
      gt(e, n, d);
    }
  }
  function va(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          gt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          gt(e, n, d);
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
      gt(e, e.return, d);
    }
  }
  function pd(e, n, r) {
    try {
      var l = e.stateNode;
      Xj(l, e.type, r, n), l[je] = n;
    } catch (d) {
      gt(e, e.return, d);
    }
  }
  function $g(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function gd(e) {
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
  function vd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (vd(e, n, r), e = e.sibling; e !== null; )
        vd(e, n, r), e = e.sibling;
  }
  function mo(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (mo(e, n, r), e = e.sibling; e !== null; )
        mo(e, n, r), e = e.sibling;
  }
  function Ug(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      mn(n, l, r), n[Se] = e, n[je] = r;
    } catch (h) {
      gt(e, e.return, h);
    }
  }
  var Da = !1, tn = !1, yd = !1, Bg = typeof WeakSet == "function" ? WeakSet : Set, on = null;
  function Rj(e, n) {
    if (e = e.containerInfo, Bd = Oo, e = Zm(e), du(e)) {
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
            var x = 0, E = -1, L = -1, ne = 0, de = 0, me = e, se = null;
            t: for (; ; ) {
              for (var le; me !== r || d !== 0 && me.nodeType !== 3 || (E = x + d), me !== h || l !== 0 && me.nodeType !== 3 || (L = x + l), me.nodeType === 3 && (x += me.nodeValue.length), (le = me.firstChild) !== null; )
                se = me, me = le;
              for (; ; ) {
                if (me === e) break t;
                if (se === r && ++ne === d && (E = x), se === h && ++de === l && (L = x), (le = me.nextSibling) !== null) break;
                me = se, se = me.parentNode;
              }
              me = le;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Vd = { focusedElem: e, selectionRange: r }, Oo = !1, on = n; on !== null; )
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
                  var Te = Ir(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Te,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Be) {
                  gt(
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
                  qd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      qd(e);
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
        za(e, r), l & 4 && Ai(5, r);
        break;
      case 1:
        if (za(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              gt(r, r.return, x);
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
              gt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && zg(r), l & 512 && Di(r, r.return);
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
            gt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Ug(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Lg(r), l & 512 && Di(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && qg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Fg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = $j.bind(
          null,
          r
        ), aE(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Da, !l) {
          n = n !== null && n.memoizedState !== null || tn, d = Da;
          var h = tn;
          Da = l, (tn = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), Da = d, tn = h;
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
    n !== null && (e.alternate = null, Ig(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && wt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Lt = null, Nn = !1;
  function ka(e, n, r) {
    for (r = r.child; r !== null; )
      Hg(e, n, r), r = r.sibling;
  }
  function Hg(e, n, r) {
    if (vt && typeof vt.onCommitFiberUnmount == "function")
      try {
        vt.onCommitFiberUnmount(gn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        tn || va(r, n), ka(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        tn || va(r, n);
        var l = Lt, d = Nn;
        or(r.type) && (Lt = r.stateNode, Nn = !1), ka(
          e,
          n,
          r
        ), Ii(r.stateNode), Lt = l, Nn = d;
        break;
      case 5:
        tn || va(r, n);
      case 6:
        if (l = Lt, d = Nn, Lt = null, ka(
          e,
          n,
          r
        ), Lt = l, Nn = d, Lt !== null)
          if (Nn)
            try {
              (Lt.nodeType === 9 ? Lt.body : Lt.nodeName === "HTML" ? Lt.ownerDocument.body : Lt).removeChild(r.stateNode);
            } catch (h) {
              gt(
                r,
                n,
                h
              );
            }
          else
            try {
              Lt.removeChild(r.stateNode);
            } catch (h) {
              gt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Lt !== null && (Nn ? (e = Lt, zv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Ls(e)) : zv(Lt, r.stateNode));
        break;
      case 4:
        l = Lt, d = Nn, Lt = r.stateNode.containerInfo, Nn = !0, ka(
          e,
          n,
          r
        ), Lt = l, Nn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), tn || tr(4, r, n), ka(
          e,
          n,
          r
        );
        break;
      case 1:
        tn || (va(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && Og(
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
        tn = (l = tn) || r.memoizedState !== null, ka(
          e,
          n,
          r
        ), tn = l;
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
        gt(n, n.return, r);
      }
    }
  }
  function Fg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ls(e);
      } catch (r) {
        gt(n, n.return, r);
      }
  }
  function _j(e) {
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
  function po(e, n) {
    var r = _j(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Uj.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function Cn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                Lt = E.stateNode, Nn = !1;
                break e;
              }
              break;
            case 5:
              Lt = E.stateNode, Nn = !1;
              break e;
            case 3:
            case 4:
              Lt = E.stateNode.containerInfo, Nn = !0;
              break e;
          }
          E = E.return;
        }
        if (Lt === null) throw Error(i(160));
        Hg(h, x, d), Lt = null, Nn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
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
        Cn(n, e), Tn(e), l & 4 && (tr(3, e, e.return), Ai(3, e), tr(5, e, e.return));
        break;
      case 1:
        Cn(n, e), Tn(e), l & 512 && (tn || r === null || va(r, r.return)), l & 64 && Da && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = oa;
        if (Cn(n, e), Tn(e), l & 512 && (tn || r === null || va(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[We] || h[Se] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), mn(h, l, r), h[Se] = e, Nt(h), l = h;
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
                      h = d.createElement(l), mn(h, l, r), d.head.appendChild(h);
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
                      h = d.createElement(l), mn(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  h[Se] = e, Nt(h), l = h;
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
            )) : l === null && e.stateNode !== null && pd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        Cn(n, e), Tn(e), l & 512 && (tn || r === null || va(r, r.return)), r !== null && l & 4 && pd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (Cn(n, e), Tn(e), l & 512 && (tn || r === null || va(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ss(d, "");
          } catch (Te) {
            gt(e, e.return, Te);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, pd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (yd = !0);
        break;
      case 6:
        if (Cn(n, e), Tn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Te) {
            gt(e, e.return, Te);
          }
        }
        break;
      case 3:
        if (Ao = null, d = oa, oa = _o(n.containerInfo), Cn(n, e), oa = d, Tn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Ls(n.containerInfo);
          } catch (Te) {
            gt(e, e.return, Te);
          }
        yd && (yd = !1, Gg(e));
        break;
      case 4:
        l = oa, oa = _o(
          e.stateNode.containerInfo
        ), Cn(n, e), Tn(e), oa = l;
        break;
      case 12:
        Cn(n, e), Tn(e);
        break;
      case 31:
        Cn(n, e), Tn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
        break;
      case 13:
        Cn(n, e), Tn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (vo = _t()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ne = Da, de = tn;
        if (Da = ne || d, tn = de || L, Cn(n, e), tn = de, Da = ne, Tn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Da || tn || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var me = L.memoizedProps.style, se = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = se == null || typeof se == "boolean" ? "" : ("" + se).trim();
                  }
                } catch (Te) {
                  gt(L, L.return, Te);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Te) {
                  gt(L, L.return, Te);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var le = L.stateNode;
                  d ? Ov(le, !0) : Ov(L.stateNode, !1);
                } catch (Te) {
                  gt(L, L.return, Te);
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
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, po(e, r))));
        break;
      case 19:
        Cn(n, e), Tn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, po(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Cn(n, e), Tn(e);
    }
  }
  function Tn(e) {
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
            var d = r.stateNode, h = gd(e);
            mo(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ss(x, ""), r.flags &= -33);
            var E = gd(e);
            mo(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, ne = gd(e);
            vd(
              e,
              ne,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (de) {
        gt(e, e.return, de);
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
          Ii(n.stateNode);
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
          ), Ai(4, h);
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
              gt(l, l.return, ne);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  jp(L[d], E);
            } catch (ne) {
              gt(l, l.return, ne);
            }
          }
          r && x & 64 && zg(h), Di(h, h.return);
          break;
        case 27:
          Ug(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Lg(h), Di(h, h.return);
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
  function bd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && yi(r));
  }
  function xd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && yi(e));
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
        ), d & 2048 && Ai(9, n);
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
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && yi(e)));
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
            gt(n, n.return, L);
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
        ) : ki(e, n) : h._visibility & 2 ? ca(
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
        )), d & 2048 && bd(x, n);
        break;
      case 24:
        ca(
          e,
          n,
          r,
          l
        ), d & 2048 && xd(n.alternate, n);
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
          ), Ai(8, x);
          break;
        case 23:
          break;
        case 22:
          var de = x.stateNode;
          x.memoizedState !== null ? de._visibility & 2 ? Ns(
            h,
            x,
            E,
            L,
            d
          ) : ki(
            h,
            x
          ) : (de._visibility |= 2, Ns(
            h,
            x,
            E,
            L,
            d
          )), d && ne & 2048 && bd(
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
          ), d && ne & 2048 && xd(x.alternate, x);
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
  function ki(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, l = n, d = l.flags;
        switch (l.tag) {
          case 22:
            ki(r, l), d & 2048 && bd(
              l.alternate,
              l
            );
            break;
          case 24:
            ki(r, l), d & 2048 && xd(l.alternate, l);
            break;
          default:
            ki(r, l);
        }
        n = n.sibling;
      }
  }
  var zi = 8192;
  function Cs(e, n, r) {
    if (e.subtreeFlags & zi)
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
        ), e.flags & zi && e.memoizedState !== null && pE(
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
        oa = _o(e.stateNode.containerInfo), Cs(
          e,
          n,
          r
        ), oa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = zi, zi = 16777216, Cs(
          e,
          n,
          r
        ), zi = l) : Cs(
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
  function Oi(e) {
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
        Oi(e), e.flags & 2048 && tr(9, e, e.return);
        break;
      case 3:
        Oi(e);
        break;
      case 12:
        Oi(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, go(e)) : Oi(e);
        break;
      default:
        Oi(e);
    }
  }
  function go(e) {
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
          tr(8, n, n.return), go(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, go(n));
          break;
        default:
          go(n);
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
          yi(r.memoizedState.cache);
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
  var Mj = {
    getCacheForType: function(e) {
      var n = fn(Jt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return fn(Jt).controller.signal;
    }
  }, Aj = typeof WeakMap == "function" ? WeakMap : Map, ht = 0, jt = null, at = null, st = 0, pt = 0, Un = null, nr = !1, Ts = !1, Sd = !1, La = 0, qt = 0, ar = 0, qr = 0, wd = 0, Bn = 0, Rs = 0, Li = null, Rn = null, jd = !1, vo = 0, Jg = 0, yo = 1 / 0, bo = null, rr = null, rn = 0, sr = null, _s = null, $a = 0, Ed = 0, Nd = null, Wg = null, $i = 0, Cd = null;
  function Vn() {
    return (ht & 2) !== 0 && st !== 0 ? st & -st : A.T !== null ? Dd() : ge();
  }
  function ev() {
    if (Bn === 0)
      if ((st & 536870912) === 0 || lt) {
        var e = ye;
        ye <<= 1, (ye & 3932160) === 0 && (ye = 262144), Bn = e;
      } else Bn = 536870912;
    return e = Ln.current, e !== null && (e.flags |= 32), Bn;
  }
  function _n(e, n, r) {
    (e === jt && (pt === 2 || pt === 9) || e.cancelPendingCommit !== null) && (Ms(e, 0), ir(
      e,
      st,
      Bn,
      !1
    )), ct(e, r), ((ht & 2) === 0 || e !== jt) && (e === jt && ((ht & 2) === 0 && (qr |= r), qt === 4 && ir(
      e,
      st,
      Bn,
      !1
    )), ya(e));
  }
  function tv(e, n, r) {
    if ((ht & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || Ve(e, n), d = l ? zj(e, n) : Rd(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ts && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Dj(r)) {
          d = Rd(e, n, !1), h = !1;
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
              d = Li;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (Ms(E, x).flags |= 256), x = Rd(
                E,
                x,
                !1
              ), x !== 2) {
                if (Sd && !L) {
                  E.errorRecoveryDisabledLanes |= h, qr |= h, d = 4;
                  break e;
                }
                h = Rn, Rn = d, h !== null && (Rn === null ? Rn = h : Rn.push.apply(
                  Rn,
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
                Bn,
                !nr
              );
              break e;
            case 2:
              Rn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = vo + 300 - _t(), 10 < d)) {
            if (ir(
              l,
              n,
              Bn,
              !nr
            ), Me(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Dv(
              nv.bind(
                null,
                l,
                r,
                Rn,
                bo,
                jd,
                n,
                Bn,
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
            Rn,
            bo,
            jd,
            n,
            Bn,
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
  function nv(e, n, r, l, d, h, x, E, L, ne, de, me, se, le) {
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
      var Te = (h & 62914560) === h ? vo - _t() : (h & 4194048) === h ? Jg - _t() : 0;
      if (Te = gE(
        me,
        Te
      ), Te !== null) {
        $a = h, e.cancelPendingCommit = Te(
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
            de,
            me,
            null,
            se,
            le
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
  function Dj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!zn(h(), d)) return !1;
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
    n &= ~wd, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - ce(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && sa(e, r, n);
  }
  function xo() {
    return (ht & 6) === 0 ? (Ui(0), !1) : !0;
  }
  function Td() {
    if (at !== null) {
      if (pt === 0)
        var e = at.return;
      else
        e = at, Ca = zr = null, qu(e), xs = null, xi = 0, e = at;
      for (; e !== null; )
        kg(e.alternate, e), e = e.return;
      at = null;
    }
  }
  function Ms(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Jj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Td(), jt = e, at = r = Ea(e.current, null), st = n, pt = 0, Un = null, nr = !1, Ts = Ve(e, n), Sd = !1, Rs = Bn = wd = qr = ar = qt = 0, Rn = Li = null, jd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - ce(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Vl(), r;
  }
  function av(e, n) {
    Ye = null, A.H = Ri, n === bs || n === Kl ? (n = bp(), pt = 3) : n === Au ? (n = bp(), pt = 4) : pt = n === sd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Un = n, at === null && (qt = 1, oo(
      e,
      Gn(n, e.current)
    ));
  }
  function rv() {
    var e = Ln.current;
    return e === null ? !0 : (st & 4194048) === st ? Qn === null : (st & 62914560) === st || (st & 536870912) !== 0 ? e === Qn : !1;
  }
  function sv() {
    var e = A.H;
    return A.H = Ri, e === null ? Ri : e;
  }
  function iv() {
    var e = A.A;
    return A.A = Mj, e;
  }
  function So() {
    qt = 4, nr || (st & 4194048) !== st && Ln.current !== null || (Ts = !0), (ar & 134217727) === 0 && (qr & 134217727) === 0 || jt === null || ir(
      jt,
      st,
      Bn,
      !1
    );
  }
  function Rd(e, n, r) {
    var l = ht;
    ht |= 2;
    var d = sv(), h = iv();
    (jt !== e || st !== n) && (bo = null, Ms(e, n)), n = !1;
    var x = qt;
    e: do
      try {
        if (pt !== 0 && at !== null) {
          var E = at, L = Un;
          switch (pt) {
            case 8:
              Td(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ln.current === null && (n = !0);
              var ne = pt;
              if (pt = 0, Un = null, As(e, E, L, ne), r && Ts) {
                x = 0;
                break e;
              }
              break;
            default:
              ne = pt, pt = 0, Un = null, As(e, E, L, ne);
          }
        }
        kj(), x = qt;
        break;
      } catch (de) {
        av(e, de);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = zr = null, ht = l, A.H = d, A.A = h, at === null && (jt = null, st = 0, Vl()), x;
  }
  function kj() {
    for (; at !== null; ) lv(at);
  }
  function zj(e, n) {
    var r = ht;
    ht |= 2;
    var l = sv(), d = iv();
    jt !== e || st !== n ? (bo = null, yo = _t() + 500, Ms(e, n)) : Ts = Ve(
      e,
      n
    );
    e: do
      try {
        if (pt !== 0 && at !== null) {
          n = at;
          var h = Un;
          t: switch (pt) {
            case 1:
              pt = 0, Un = null, As(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (vp(h)) {
                pt = 0, Un = null, ov(n);
                break;
              }
              n = function() {
                pt !== 2 && pt !== 9 || jt !== e || (pt = 7), ya(e);
              }, h.then(n, n);
              break e;
            case 3:
              pt = 7;
              break e;
            case 4:
              pt = 5;
              break e;
            case 7:
              vp(h) ? (pt = 0, Un = null, ov(n)) : (pt = 0, Un = null, As(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (at.tag) {
                case 26:
                  x = at.memoizedState;
                case 5:
                case 27:
                  var E = at;
                  if (x ? Pv(x) : E.stateNode.complete) {
                    pt = 0, Un = null;
                    var L = E.sibling;
                    if (L !== null) at = L;
                    else {
                      var ne = E.return;
                      ne !== null ? (at = ne, wo(ne)) : at = null;
                    }
                    break t;
                  }
              }
              pt = 0, Un = null, As(e, n, h, 5);
              break;
            case 6:
              pt = 0, Un = null, As(e, n, h, 6);
              break;
            case 8:
              Td(), qt = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Oj();
        break;
      } catch (de) {
        av(e, de);
      }
    while (!0);
    return Ca = zr = null, A.H = l, A.A = d, ht = r, at !== null ? 0 : (jt = null, st = 0, Vl(), qt);
  }
  function Oj() {
    for (; at !== null && !Rt(); )
      lv(at);
  }
  function lv(e) {
    var n = Ag(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? wo(e) : at = n;
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
          st
        );
        break;
      case 11:
        n = Ng(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          st
        );
        break;
      case 5:
        qu(n);
      default:
        kg(r, n), n = at = ip(n, La), n = Ag(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? wo(e) : at = n;
  }
  function As(e, n, r, l) {
    Ca = zr = null, qu(n), xs = null, xi = 0;
    var d = n.return;
    try {
      if (jj(
        e,
        d,
        n,
        r,
        st
      )) {
        qt = 1, oo(
          e,
          Gn(r, e.current)
        ), at = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw at = d, h;
      qt = 1, oo(
        e,
        Gn(r, e.current)
      ), at = null;
      return;
    }
    n.flags & 32768 ? (lt || l === 1 ? e = !0 : Ts || (st & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ln.current, l !== null && l.tag === 13 && (l.flags |= 16384))), cv(n, e)) : wo(n);
  }
  function wo(e) {
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
      var r = Cj(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        at = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        at = n;
        return;
      }
      at = n = e;
    } while (n !== null);
    qt === 0 && (qt = 5);
  }
  function cv(e, n) {
    do {
      var r = Tj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, at = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        at = e;
        return;
      }
      at = e = r;
    } while (e !== null);
    qt = 6, at = null;
  }
  function uv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (rn !== 0);
    if ((ht & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= gu, Ft(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === jt && (at = jt = null, st = 0), _s = n, sr = e, $a = r, Ed = h, Nd = d, Wg = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Bj(ot, function() {
        return pv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, d = Y.p, Y.p = 2, x = ht, ht |= 4;
        try {
          Rj(e, n, r);
        } finally {
          ht = x, Y.p = d, A.T = l;
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
        var d = ht;
        ht |= 4;
        try {
          Yg(n, e);
          var h = Vd, x = Zm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Qm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && du(E)) {
              var ne = L.start, de = L.end;
              if (de === void 0 && (de = ne), "selectionStart" in E)
                E.selectionStart = ne, E.selectionEnd = Math.min(
                  de,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, se = me && me.defaultView || window;
                if (se.getSelection) {
                  var le = se.getSelection(), Te = E.textContent.length, Be = Math.min(L.start, Te), St = L.end === void 0 ? Be : Math.min(L.end, Te);
                  !le.extend && Be > St && (x = St, St = Be, Be = x);
                  var X = Xm(
                    E,
                    Be
                  ), B = Xm(
                    E,
                    St
                  );
                  if (X && B && (le.rangeCount !== 1 || le.anchorNode !== X.node || le.anchorOffset !== X.offset || le.focusNode !== B.node || le.focusOffset !== B.offset)) {
                    var ee = me.createRange();
                    ee.setStart(X.node, X.offset), le.removeAllRanges(), Be > St ? (le.addRange(ee), le.extend(B.node, B.offset)) : (ee.setEnd(B.node, B.offset), le.addRange(ee));
                  }
                }
              }
            }
            for (me = [], le = E; le = le.parentNode; )
              le.nodeType === 1 && me.push({
                element: le,
                left: le.scrollLeft,
                top: le.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < me.length; E++) {
              var fe = me[E];
              fe.element.scrollLeft = fe.left, fe.element.scrollTop = fe.top;
            }
          }
          Oo = !!Bd, Vd = Bd = null;
        } finally {
          ht = d, Y.p = l, A.T = r;
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
        var d = ht;
        ht |= 4;
        try {
          Vg(e, n.alternate, n);
        } finally {
          ht = d, Y.p = l, A.T = r;
        }
      }
      rn = 3;
    }
  }
  function hv() {
    if (rn === 4 || rn === 3) {
      rn = 0, $t();
      var e = sr, n = _s, r = $a, l = Wg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? rn = 5 : (rn = 0, _s = sr = null, mv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, vt && typeof vt.onCommitFiberRoot == "function")
        try {
          vt.onCommitFiberRoot(
            gn,
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
      ($a & 3) !== 0 && jo(), ya(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Cd ? $i++ : ($i = 0, Cd = e) : $i = 0, Ui(0);
    }
  }
  function mv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, yi(n)));
  }
  function jo() {
    return dv(), fv(), hv(), pv();
  }
  function pv() {
    if (rn !== 5) return !1;
    var e = sr, n = Ed;
    Ed = 0;
    var r = Z($a), l = A.T, d = Y.p;
    try {
      Y.p = 32 > r ? 32 : r, A.T = null, r = Nd, Nd = null;
      var h = sr, x = $a;
      if (rn = 0, _s = sr = null, $a = 0, (ht & 6) !== 0) throw Error(i(331));
      var E = ht;
      if (ht |= 4, Qg(h.current), Pg(
        h,
        h.current,
        x,
        r
      ), ht = E, Ui(0, !1), vt && typeof vt.onPostCommitFiberRoot == "function")
        try {
          vt.onPostCommitFiberRoot(gn, h);
        } catch {
        }
      return !0;
    } finally {
      Y.p = d, A.T = l, mv(e, n);
    }
  }
  function gv(e, n, r) {
    n = Gn(r, n), n = rd(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (ct(e, 2), ya(e));
  }
  function gt(e, n, r) {
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
            ), ct(l, 2), ya(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function _d(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Aj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (Sd = !0, d.add(r), e = Lj.bind(null, e, n, r), n.then(e, e));
  }
  function Lj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, jt === e && (st & r) === r && (qt === 4 || qt === 3 && (st & 62914560) === st && 300 > _t() - vo ? (ht & 2) === 0 && Ms(e, 0) : wd |= r, Rs === st && (Rs = 0)), ya(e);
  }
  function vv(e, n) {
    n === 0 && (n = It()), e = Ar(e, n), e !== null && (ct(e, n), ya(e));
  }
  function $j(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), vv(e, r);
  }
  function Uj(e, n) {
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
  function Bj(e, n) {
    return sn(e, n);
  }
  var Eo = null, Ds = null, Md = !1, No = !1, Ad = !1, lr = 0;
  function ya(e) {
    e !== Ds && e.next === null && (Ds === null ? Eo = Ds = e : Ds = Ds.next = e), No = !0, Md || (Md = !0, Ij());
  }
  function Ui(e, n) {
    if (!Ad && No) {
      Ad = !0;
      do
        for (var r = !1, l = Eo; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - ce(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, Sv(l, h));
          } else
            h = st, h = Me(
              l,
              l === jt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || Ve(l, h) || (r = !0, Sv(l, h));
          l = l.next;
        }
      while (r);
      Ad = !1;
    }
  }
  function Vj() {
    yv();
  }
  function yv() {
    No = Md = !1;
    var e = 0;
    lr !== 0 && Zj() && (e = lr);
    for (var n = _t(), r = null, l = Eo; l !== null; ) {
      var d = l.next, h = bv(l, n);
      h === 0 ? (l.next = null, r === null ? Eo = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (No = !0)), l = d;
    }
    rn !== 0 && rn !== 5 || Ui(e), lr !== 0 && (lr = 0);
  }
  function bv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - ce(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = Fe(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = jt, r = st, r = Me(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (pt === 2 || pt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Xt(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || Ve(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && Xt(l), Z(r)) {
        case 2:
        case 8:
          r = Xe;
          break;
        case 32:
          r = ot;
          break;
        case 268435456:
          r = zt;
          break;
        default:
          r = ot;
      }
      return l = xv.bind(null, e), r = sn(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && Xt(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function xv(e, n) {
    if (rn !== 0 && rn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (jo() && e.callbackNode !== r)
      return null;
    var l = st;
    return l = Me(
      e,
      e === jt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (tv(e, l, n), bv(e, _t()), e.callbackNode != null && e.callbackNode === r ? xv.bind(null, e) : null);
  }
  function Sv(e, n) {
    if (jo()) return null;
    tv(e, n, !0);
  }
  function Ij() {
    Wj(function() {
      (ht & 6) !== 0 ? sn(
        Le,
        Vj
      ) : yv();
    });
  }
  function Dd() {
    if (lr === 0) {
      var e = vs;
      e === 0 && (e = pe, pe <<= 1, (pe & 261888) === 0 && (pe = 256)), lr = e;
    }
    return lr;
  }
  function wv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Dl("" + e);
  }
  function jv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Hj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = wv(
        (d[je] || null).action
      ), x = l.submitter;
      x && (n = (n = x[je] || null) ? wv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
      var E = new Ll(
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
                  Ju(
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
                typeof h == "function" && (E.preventDefault(), L = x ? jv(d, x) : new FormData(d), Ju(
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
  for (var kd = 0; kd < pu.length; kd++) {
    var zd = pu[kd], qj = zd.toLowerCase(), Fj = zd[0].toUpperCase() + zd.slice(1);
    la(
      qj,
      "on" + Fj
    );
  }
  la(ep, "onAnimationEnd"), la(tp, "onAnimationIteration"), la(np, "onAnimationStart"), la("dblclick", "onDoubleClick"), la("focusin", "onFocus"), la("focusout", "onBlur"), la(ij, "onTransitionRun"), la(lj, "onTransitionStart"), la(oj, "onTransitionCancel"), la(ap, "onTransitionEnd"), ha("onMouseEnter", ["mouseout", "mouseover"]), ha("onMouseLeave", ["mouseout", "mouseover"]), ha("onPointerEnter", ["pointerout", "pointerover"]), ha("onPointerLeave", ["pointerout", "pointerover"]), ln(
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
  var Bi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Yj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bi)
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
            } catch (de) {
              Bl(de);
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
            } catch (de) {
              Bl(de);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function rt(e, n) {
    var r = n[Ne];
    r === void 0 && (r = n[Ne] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (Nv(n, e, 2, !1), r.add(l));
  }
  function Od(e, n, r) {
    var l = 0;
    n && (l |= 4), Nv(
      r,
      e,
      l,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Ld(e) {
    if (!e[Co]) {
      e[Co] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (Yj.has(r) || Od(r, !1, e), Od(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, Od("selectionchange", !1, n));
    }
  }
  function Nv(e, n, r, l) {
    switch (ey(n)) {
      case 2:
        var d = bE;
        break;
      case 8:
        d = xE;
        break;
      default:
        d = Zd;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !nu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function $d(e, n, r, l, d) {
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
            if (x = yt(E), x === null) return;
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
      var ne = h, de = eu(r), me = [];
      e: {
        var se = rp.get(e);
        if (se !== void 0) {
          var le = Ll, Te = e;
          switch (e) {
            case "keypress":
              if (zl(r) === 0) break e;
            case "keydown":
            case "keyup":
              le = Uw;
              break;
            case "focusin":
              Te = "focus", le = iu;
              break;
            case "focusout":
              Te = "blur", le = iu;
              break;
            case "beforeblur":
            case "afterblur":
              le = iu;
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
              le = km;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              le = Cw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              le = Iw;
              break;
            case ep:
            case tp:
            case np:
              le = _w;
              break;
            case ap:
              le = qw;
              break;
            case "scroll":
            case "scrollend":
              le = Ew;
              break;
            case "wheel":
              le = Yw;
              break;
            case "copy":
            case "cut":
            case "paste":
              le = Aw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              le = Om;
              break;
            case "toggle":
            case "beforetoggle":
              le = Pw;
          }
          var Be = (n & 4) !== 0, St = !Be && (e === "scroll" || e === "scrollend"), X = Be ? se !== null ? se + "Capture" : null : se;
          Be = [];
          for (var B = ne, ee; B !== null; ) {
            var fe = B;
            if (ee = fe.stateNode, fe = fe.tag, fe !== 5 && fe !== 26 && fe !== 27 || ee === null || X === null || (fe = li(B, X), fe != null && Be.push(
              Vi(B, fe, ee)
            )), St) break;
            B = B.return;
          }
          0 < Be.length && (se = new le(
            se,
            Te,
            null,
            r,
            de
          ), me.push({ event: se, listeners: Be }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (se = e === "mouseover" || e === "pointerover", le = e === "mouseout" || e === "pointerout", se && r !== Wc && (Te = r.relatedTarget || r.fromElement) && (yt(Te) || Te[Ae]))
            break e;
          if ((le || se) && (se = de.window === de ? de : (se = de.ownerDocument) ? se.defaultView || se.parentWindow : window, le ? (Te = r.relatedTarget || r.toElement, le = ne, Te = Te ? yt(Te) : null, Te !== null && (St = u(Te), Be = Te.tag, Te !== St || Be !== 5 && Be !== 27 && Be !== 6) && (Te = null)) : (le = null, Te = ne), le !== Te)) {
            if (Be = km, fe = "onMouseLeave", X = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Be = Om, fe = "onPointerLeave", X = "onPointerEnter", B = "pointer"), St = le == null ? se : nt(le), ee = Te == null ? se : nt(Te), se = new Be(
              fe,
              B + "leave",
              le,
              r,
              de
            ), se.target = St, se.relatedTarget = ee, fe = null, yt(de) === ne && (Be = new Be(
              X,
              B + "enter",
              Te,
              r,
              de
            ), Be.target = ee, Be.relatedTarget = St, fe = Be), St = fe, le && Te)
              t: {
                for (Be = Gj, X = le, B = Te, ee = 0, fe = X; fe; fe = Be(fe))
                  ee++;
                fe = 0;
                for (var Oe = B; Oe; Oe = Be(Oe))
                  fe++;
                for (; 0 < ee - fe; )
                  X = Be(X), ee--;
                for (; 0 < fe - ee; )
                  B = Be(B), fe--;
                for (; ee--; ) {
                  if (X === B || B !== null && X === B.alternate) {
                    Be = X;
                    break t;
                  }
                  X = Be(X), B = Be(B);
                }
                Be = null;
              }
            else Be = null;
            le !== null && Cv(
              me,
              se,
              le,
              Be,
              !1
            ), Te !== null && St !== null && Cv(
              me,
              St,
              Te,
              Be,
              !0
            );
          }
        }
        e: {
          if (se = ne ? nt(ne) : window, le = se.nodeName && se.nodeName.toLowerCase(), le === "select" || le === "input" && se.type === "file")
            var dt = qm;
          else if (Im(se))
            if (Fm)
              dt = aj;
            else {
              dt = tj;
              var De = ej;
            }
          else
            le = se.nodeName, !le || le.toLowerCase() !== "input" || se.type !== "checkbox" && se.type !== "radio" ? ne && Jc(ne.elementType) && (dt = qm) : dt = nj;
          if (dt && (dt = dt(e, ne))) {
            Hm(
              me,
              dt,
              r,
              de
            );
            break e;
          }
          De && De(e, se, ne), e === "focusout" && ne && se.type === "number" && ne.memoizedProps.value != null && Zc(se, "number", se.value);
        }
        switch (De = ne ? nt(ne) : window, e) {
          case "focusin":
            (Im(De) || De.contentEditable === "true") && (cs = De, fu = ne, pi = null);
            break;
          case "focusout":
            pi = fu = cs = null;
            break;
          case "mousedown":
            hu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hu = !1, Jm(me, r, de);
            break;
          case "selectionchange":
            if (sj) break;
          case "keydown":
          case "keyup":
            Jm(me, r, de);
        }
        var Ke;
        if (ou)
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
          os ? Bm(e, r) && (it = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (it = "onCompositionStart");
        it && (Lm && r.locale !== "ko" && (os || it !== "onCompositionStart" ? it === "onCompositionEnd" && os && (Ke = Am()) : (Ya = de, au = "value" in Ya ? Ya.value : Ya.textContent, os = !0)), De = To(ne, it), 0 < De.length && (it = new zm(
          it,
          e,
          null,
          r,
          de
        ), me.push({ event: it, listeners: De }), Ke ? it.data = Ke : (Ke = Vm(r), Ke !== null && (it.data = Ke)))), (Ke = Xw ? Qw(e, r) : Zw(e, r)) && (it = To(ne, "onBeforeInput"), 0 < it.length && (De = new zm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          de
        ), me.push({
          event: De,
          listeners: it
        }), De.data = Ke)), Hj(
          me,
          e,
          ne,
          r,
          de
        );
      }
      Ev(me, n);
    });
  }
  function Vi(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function To(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e, h = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || h === null || (d = li(e, r), d != null && l.unshift(
        Vi(e, d, h)
      ), d = li(e, n), d != null && l.push(
        Vi(e, d, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Gj(e) {
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
      E !== 5 && E !== 26 && E !== 27 || ne === null || (L = ne, d ? (ne = li(r, h), ne != null && x.unshift(
        Vi(r, ne, L)
      )) : d || (ne = li(r, h), ne != null && x.push(
        Vi(r, ne, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Pj = /\r\n?/g, Kj = /\u0000|\uFFFD/g;
  function Tv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Pj, `
`).replace(Kj, "");
  }
  function Rv(e, n) {
    return n = Tv(n), Tv(e) === n;
  }
  function xt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ss(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ss(e, "" + l);
        break;
      case "className":
        Yt(e, "class", l);
        break;
      case "tabIndex":
        Yt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Yt(e, r, l);
        break;
      case "style":
        Rm(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Yt(e, "data", l);
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
        l = Dl("" + l), e.setAttribute(r, l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && xt(e, n, "name", d.name, d, null), xt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), xt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), xt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (xt(e, n, "encType", d.encType, d, null), xt(e, n, "method", d.method, d, null), xt(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Dl("" + l), e.setAttribute(r, l);
        break;
      case "onClick":
        l != null && (e.onclick = wa);
        break;
      case "onScroll":
        l != null && rt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && rt("scrollend", e);
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
        r = Dl("" + l), e.setAttributeNS(
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
        rt("beforetoggle", e), rt("toggle", e), et(e, "popover", l);
        break;
      case "xlinkActuate":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        et(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = ww.get(r) || r, et(e, r, l));
    }
  }
  function Ud(e, n, r, l, d, h) {
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
        l != null && rt("scroll", e);
        break;
      case "onScrollEnd":
        l != null && rt("scrollend", e);
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
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[je] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : et(e, r, l);
          }
    }
  }
  function mn(e, n, r) {
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
        rt("error", e), rt("load", e);
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
                  xt(e, n, h, x, r, null);
              }
          }
        d && xt(e, n, "srcSet", r.srcSet, r, null), l && xt(e, n, "src", r.src, r, null);
        return;
      case "input":
        rt("invalid", e);
        var E = h = x = d = null, L = null, ne = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var de = r[l];
            if (de != null)
              switch (l) {
                case "name":
                  d = de;
                  break;
                case "type":
                  x = de;
                  break;
                case "checked":
                  L = de;
                  break;
                case "defaultChecked":
                  ne = de;
                  break;
                case "value":
                  h = de;
                  break;
                case "defaultValue":
                  E = de;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (de != null)
                    throw Error(i(137, n));
                  break;
                default:
                  xt(e, n, l, de, r, null);
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
        rt("invalid", e), l = x = h = null;
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
                xt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? rs(e, !!l, n, !1) : r != null && rs(e, !!l, r, !0);
        return;
      case "textarea":
        rt("invalid", e), h = d = l = null;
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
                xt(e, n, x, E, r, null);
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
                xt(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        rt("beforetoggle", e), rt("toggle", e), rt("cancel", e), rt("close", e);
        break;
      case "iframe":
      case "object":
        rt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bi.length; l++)
          rt(Bi[l], e);
        break;
      case "image":
        rt("error", e), rt("load", e);
        break;
      case "details":
        rt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        rt("error", e), rt("load", e);
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
                xt(e, n, ne, l, r, null);
            }
        return;
      default:
        if (Jc(n)) {
          for (de in r)
            r.hasOwnProperty(de) && (l = r[de], l !== void 0 && Ud(
              e,
              n,
              de,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && xt(e, n, E, l, r, null));
  }
  function Xj(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, ne = null, de = null;
        for (le in r) {
          var me = r[le];
          if (r.hasOwnProperty(le) && me != null)
            switch (le) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = me;
              default:
                l.hasOwnProperty(le) || xt(e, n, le, null, l, me);
            }
        }
        for (var se in l) {
          var le = l[se];
          if (me = r[se], l.hasOwnProperty(se) && (le != null || me != null))
            switch (se) {
              case "type":
                h = le;
                break;
              case "name":
                d = le;
                break;
              case "checked":
                ne = le;
                break;
              case "defaultChecked":
                de = le;
                break;
              case "value":
                x = le;
                break;
              case "defaultValue":
                E = le;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (le != null)
                  throw Error(i(137, n));
                break;
              default:
                le !== me && xt(
                  e,
                  n,
                  se,
                  le,
                  l,
                  me
                );
            }
        }
        Qc(
          e,
          x,
          E,
          L,
          ne,
          de,
          h,
          d
        );
        return;
      case "select":
        le = x = E = se = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                le = L;
              default:
                l.hasOwnProperty(h) || xt(
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
                se = h;
                break;
              case "defaultValue":
                E = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== L && xt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = le, se != null ? rs(e, !!r, se, !1) : !!l != !!r && (n != null ? rs(e, !!r, n, !0) : rs(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        le = se = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                se = d;
                break;
              case "defaultValue":
                le = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(i(91));
                break;
              default:
                d !== h && xt(e, n, x, d, l, h);
            }
        Nm(e, se, le);
        return;
      case "option":
        for (var Te in r)
          if (se = r[Te], r.hasOwnProperty(Te) && se != null && !l.hasOwnProperty(Te))
            switch (Te) {
              case "selected":
                e.selected = !1;
                break;
              default:
                xt(
                  e,
                  n,
                  Te,
                  null,
                  l,
                  se
                );
            }
        for (L in l)
          if (se = l[L], le = r[L], l.hasOwnProperty(L) && se !== le && (se != null || le != null))
            switch (L) {
              case "selected":
                e.selected = se && typeof se != "function" && typeof se != "symbol";
                break;
              default:
                xt(
                  e,
                  n,
                  L,
                  se,
                  l,
                  le
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
          se = r[Be], r.hasOwnProperty(Be) && se != null && !l.hasOwnProperty(Be) && xt(e, n, Be, null, l, se);
        for (ne in l)
          if (se = l[ne], le = r[ne], l.hasOwnProperty(ne) && se !== le && (se != null || le != null))
            switch (ne) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(i(137, n));
                break;
              default:
                xt(
                  e,
                  n,
                  ne,
                  se,
                  l,
                  le
                );
            }
        return;
      default:
        if (Jc(n)) {
          for (var St in r)
            se = r[St], r.hasOwnProperty(St) && se !== void 0 && !l.hasOwnProperty(St) && Ud(
              e,
              n,
              St,
              void 0,
              l,
              se
            );
          for (de in l)
            se = l[de], le = r[de], !l.hasOwnProperty(de) || se === le || se === void 0 && le === void 0 || Ud(
              e,
              n,
              de,
              se,
              l,
              le
            );
          return;
        }
    }
    for (var X in r)
      se = r[X], r.hasOwnProperty(X) && se != null && !l.hasOwnProperty(X) && xt(e, n, X, null, l, se);
    for (me in l)
      se = l[me], le = r[me], !l.hasOwnProperty(me) || se === le || se == null && le == null || xt(e, n, me, se, l, le);
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
  function Qj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && _v(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ne = L.startTime;
            if (ne > E) break;
            var de = L.transferSize, me = L.initiatorType;
            de && _v(me) && (L = L.responseEnd, x += de * (L < E ? 1 : (E - ne) / (L - ne)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Bd = null, Vd = null;
  function Ro(e) {
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
  function Id(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Hd = null;
  function Zj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Hd ? !1 : (Hd = e, !0) : (Hd = null, !1);
  }
  var Dv = typeof setTimeout == "function" ? setTimeout : void 0, Jj = typeof clearTimeout == "function" ? clearTimeout : void 0, kv = typeof Promise == "function" ? Promise : void 0, Wj = typeof queueMicrotask == "function" ? queueMicrotask : typeof kv < "u" ? function(e) {
    return kv.resolve(null).then(e).catch(eE);
  } : Dv;
  function eE(e) {
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
          Ii(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Ii(r);
          for (var h = r.firstChild; h; ) {
            var x = h.nextSibling, E = h.nodeName;
            h[We] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Ii(e.ownerDocument.body);
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
  function qd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qd(r), wt(r);
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
  function tE(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[We])
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
  function nE(e, n, r) {
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
  function Fd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Yd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function aE(e, n) {
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
  var Gd = null;
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
    switch (n = Ro(r), e) {
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
  function Ii(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    wt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), Vv = /* @__PURE__ */ new Set();
  function _o(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = Y.d;
  Y.d = {
    f: rE,
    r: sE,
    D: iE,
    C: lE,
    L: oE,
    m: cE,
    X: dE,
    S: uE,
    M: fE
  };
  function rE() {
    var e = Ua.f(), n = xo();
    return e || n;
  }
  function sE(e) {
    var n = Ot(e);
    n !== null && n.tag === 5 && n.type === "form" ? ag(n) : Ua.r(e);
  }
  var ks = typeof document > "u" ? null : document;
  function Iv(e, n, r) {
    var l = ks;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Vv.has(d) || (Vv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), mn(n, "link", e), Nt(n), l.head.appendChild(n)));
    }
  }
  function iE(e) {
    Ua.D(e), Iv("dns-prefetch", e, null);
  }
  function lE(e, n) {
    Ua.C(e, n), Iv("preconnect", e, n);
  }
  function oE(e, n, r) {
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
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Hi(h)) || n === "script" && l.querySelector(qi(h)) || (n = l.createElement("link"), mn(n, "link", e), Nt(n), l.head.appendChild(n)));
    }
  }
  function cE(e, n) {
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
            if (r.querySelector(qi(h)))
              return;
        }
        l = r.createElement("link"), mn(l, "link", e), Nt(l), r.head.appendChild(l);
      }
    }
  }
  function uE(e, n, r) {
    Ua.S(e, n, r);
    var l = ks;
    if (l && e) {
      var d = Qt(l).hoistableStyles, h = zs(e);
      n = n || "default";
      var x = d.get(h);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = l.querySelector(
          Hi(h)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Jn.get(h)) && Pd(e, r);
          var L = x = l.createElement("link");
          Nt(L), mn(L, "link", e), L._p = new Promise(function(ne, de) {
            L.onload = ne, L.onerror = de;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Mo(x, n, l);
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
  function dE(e, n) {
    Ua.X(e, n);
    var r = ks;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Kd(e, n), h = r.createElement("script"), Nt(h), mn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function fE(e, n) {
    Ua.M(e, n);
    var r = ks;
    if (r && e) {
      var l = Qt(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Kd(e, n), h = r.createElement("script"), Nt(h), mn(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Hv(e, n, r, l) {
    var d = (d = W.current) ? _o(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = zs(r.href), r = Qt(
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
          var h = Qt(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            Hi(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Jn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Jn.set(e, r), h || hE(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Os(r), r = Qt(
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
  function Hi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function hE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), mn(n, "link", r), Nt(n), e.head.appendChild(n));
  }
  function Os(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function qi(e) {
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
            return n.instance = l, Nt(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Nt(l), mn(l, "style", d), Mo(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = zs(r.href);
          var h = e.querySelector(
            Hi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, Nt(h), h;
          l = qv(r), (d = Jn.get(d)) && Pd(l, d), h = (e.ownerDocument || e).createElement("link"), Nt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), mn(h, "link", l), n.state.loading |= 4, Mo(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Os(r.src), (d = e.querySelector(
            qi(h)
          )) ? (n.instance = d, Nt(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Kd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Nt(d), mn(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, Mo(l, r.precedence, e));
    return n.instance;
  }
  function Mo(e, n, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = l.length ? l[l.length - 1] : null, h = d, x = 0; x < l.length; x++) {
      var E = l[x];
      if (E.dataset.precedence === n) h = E;
      else if (h !== d) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Pd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Kd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ao = null;
  function Yv(e, n, r) {
    if (Ao === null) {
      var l = /* @__PURE__ */ new Map(), d = Ao = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Ao, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[We] || h[Se] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
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
  function mE(e, n, r) {
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
  function pE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = zs(l.href), h = n.querySelector(
          Hi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Do.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Nt(h);
          return;
        }
        h = n.ownerDocument || n, l = qv(l), (d = Jn.get(d)) && Pd(l, d), h = h.createElement("link"), Nt(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), mn(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Do.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Xd = 0;
  function gE(e, n) {
    return e.stylesheets && e.count === 0 && zo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && zo(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Xd === 0 && (Xd = 62500 * Qj());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && zo(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Xd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(d);
      };
    } : null;
  }
  function Do() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) zo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ko = null;
  function zo(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ko = /* @__PURE__ */ new Map(), n.forEach(vE, e), ko = null, Do.call(e));
  }
  function vE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = ko.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), ko.set(e, r);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < d.length; h++) {
          var x = d[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), h = r.get(x) || l, h === l && r.set(null, d), r.set(x, d), this.count++, l = Do.bind(this), d.addEventListener("load", l), d.addEventListener("error", l), h ? h.parentNode.insertBefore(d, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Fi = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function yE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Kv(e, n, r, l, d, h, x, E, L, ne, de, me) {
    return e = new yE(
      e,
      n,
      r,
      x,
      L,
      ne,
      de,
      me,
      E
    ), n = 1, h === !0 && (n |= 24), h = On(3, null, null, n), e.current = h, h.stateNode = e, n = Ru(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Du(h), e;
  }
  function Xv(e) {
    return e ? (e = fs, e) : fs;
  }
  function Qv(e, n, r, l, d, h) {
    d = Xv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (_n(r, e, n), wi(r, e, n));
  }
  function Zv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Qd(e, n) {
    Zv(e, n), (e = e.alternate) && Zv(e, n);
  }
  function Jv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && _n(n, e, 67108864), Qd(e, 67108864);
    }
  }
  function Wv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Vn();
      n = P(n);
      var r = Ar(e, n);
      r !== null && _n(r, e, n), Qd(e, n);
    }
  }
  var Oo = !0;
  function bE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = Y.p;
    try {
      Y.p = 2, Zd(e, n, r, l);
    } finally {
      Y.p = h, A.T = d;
    }
  }
  function xE(e, n, r, l) {
    var d = A.T;
    A.T = null;
    var h = Y.p;
    try {
      Y.p = 8, Zd(e, n, r, l);
    } finally {
      Y.p = h, A.T = d;
    }
  }
  function Zd(e, n, r, l) {
    if (Oo) {
      var d = Jd(l);
      if (d === null)
        $d(
          e,
          n,
          l,
          Lo,
          r
        ), ty(e, l);
      else if (wE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ty(e, l), n & 4 && -1 < SE.indexOf(e)) {
        for (; d !== null; ) {
          var h = Ot(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = Je(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - ce(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ya(h), (ht & 6) === 0 && (yo = _t() + 500, Ui(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && _n(E, h, 2), xo(), Qd(h, 2);
            }
          if (h = Jd(l), h === null && $d(
            e,
            n,
            l,
            Lo,
            r
          ), h === d) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else
        $d(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function Jd(e) {
    return e = eu(e), Wd(e);
  }
  var Lo = null;
  function Wd(e) {
    if (Lo = null, e = yt(e), e !== null) {
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
    return Lo = e, null;
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
          case ot:
          case Ut:
            return 32;
          case zt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ef = !1, cr = null, ur = null, dr = null, Yi = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Map(), fr = [], SE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        Yi.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gi.delete(n.pointerId);
    }
  }
  function Pi(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [d]
    }, n !== null && (n = Ot(n), n !== null && Jv(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function wE(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return cr = Pi(
          cr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "dragenter":
        return ur = Pi(
          ur,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "mouseover":
        return dr = Pi(
          dr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "pointerover":
        var h = d.pointerId;
        return Yi.set(
          h,
          Pi(
            Yi.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
      case "gotpointercapture":
        return h = d.pointerId, Gi.set(
          h,
          Pi(
            Gi.get(h) || null,
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
    var n = yt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
              Wv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = p(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
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
  function $o(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = Jd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Wc = l, r.target.dispatchEvent(l), Wc = null;
      } else
        return n = Ot(r), n !== null && Jv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ay(e, n, r) {
    $o(e) && r.delete(n);
  }
  function jE() {
    ef = !1, cr !== null && $o(cr) && (cr = null), ur !== null && $o(ur) && (ur = null), dr !== null && $o(dr) && (dr = null), Yi.forEach(ay), Gi.forEach(ay);
  }
  function Uo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, ef || (ef = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      jE
    )));
  }
  var Bo = null;
  function ry(e) {
    Bo !== e && (Bo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Bo === e && (Bo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (Wd(l || r) === null)
              continue;
            break;
          }
          var h = Ot(r);
          h !== null && (e.splice(n, 3), n -= 3, Ju(
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
      return Uo(L, e);
    }
    cr !== null && Uo(cr, e), ur !== null && Uo(ur, e), dr !== null && Uo(dr, e), Yi.forEach(n), Gi.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      ny(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[je] || null;
        if (typeof h == "function")
          x || ry(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[je] || null)
              E = x.formAction;
            else if (Wd(d) !== null) continue;
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
  function tf(e) {
    this._internalRoot = e;
  }
  Vo.prototype.render = tf.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = Vn();
    Qv(r, l, e, n, null, null);
  }, Vo.prototype.unmount = tf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Qv(e.current, 2, null, e, null, null), xo(), n[Ae] = null;
    }
  };
  function Vo(e) {
    this._internalRoot = e;
  }
  Vo.prototype.unstable_scheduleHydration = function(e) {
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
  var EE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Io = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Io.isDisabled && Io.supportsFiber)
      try {
        gn = Io.inject(
          EE
        ), vt = Io;
      } catch {
      }
  }
  return Xi.createRoot = function(e, n) {
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
    ), e[Ae] = n.current, Ld(e), new tf(n);
  }, Xi.hydrateRoot = function(e, n, r) {
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
    ), n.context = Xv(null), r = n.current, l = Vn(), l = P(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, ct(n, r), ya(n), e[Ae] = n.current, Ld(e), new Vo(n);
  }, Xi.version = "19.2.5", Xi;
}
var gy;
function OE() {
  if (gy) return rf.exports;
  gy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), rf.exports = zE(), rf.exports;
}
var LE = OE();
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
var zx = (t) => {
  throw TypeError(t);
}, $E = (t, a, s) => a.has(t) || zx("Cannot " + s), cf = (t, a, s) => ($E(t, a, "read from private field"), s ? s.call(t) : a.get(t)), UE = (t, a, s) => a.has(t) ? zx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function vy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function BE(t = {}) {
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
  function b(S, j = null, T, R) {
    let N = Wf(
      o ? m().pathname : "/",
      S,
      j,
      T,
      R
    );
    return Kt(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), N;
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
      let T = vy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, T), i && p && p({ action: f, location: T, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let T = vy(S) ? S : b(S, j);
      o[u] = T, i && p && p({ action: f, location: T, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = y(u + S), T = o[j];
      u = j, p && p({ action: f, location: T, delta: S });
    },
    listen(S) {
      return p = S, () => {
        p = null;
      };
    }
  };
}
function tt(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Kt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function VE() {
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
    key: a && a.key || i || VE(),
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
function IE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), tt(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : xa(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var il, yy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (UE(this, il, /* @__PURE__ */ new Map()), t)
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
    if (cf(this, il).has(t))
      return cf(this, il).get(t);
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
    cf(this, il).set(t, a);
  }
};
il = /* @__PURE__ */ new WeakMap();
var HE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function qE(t) {
  return HE.has(
    t
  );
}
var FE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function YE(t) {
  return FE.has(
    t
  );
}
function GE(t) {
  return t.index === !0;
}
function ml(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let p = [...s, String(f)], y = typeof u.id == "string" ? u.id : p.join("-");
    if (tt(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), tt(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), GE(u)) {
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
      ), u.children && (m.children = ml(
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
  return ll(t, a, s, !1);
}
function ll(t, a, s, i) {
  let o = typeof a == "string" ? fa(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Ox(t);
  KE(f);
  let p = null;
  for (let y = 0; p == null && y < f.length; ++y) {
    let m = sN(u);
    p = aN(
      f[y],
      m,
      i
    );
  }
  return p;
}
function PE(t, a) {
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
function Ox(t, a = [], s = [], i = "", o = !1) {
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
      tt(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let v = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (tt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Ox(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: tN(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, p) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, p);
    else
      for (let y of Lx(f.path))
        u(f, p, !0, y);
  }), a;
}
function Lx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Lx(i.join("/")), p = [];
  return p.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && p.push(...f), p.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function KE(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : nN(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var XE = /^:[\w-]+$/, QE = 3, ZE = 2, JE = 1, WE = 10, eN = -2, xy = (t) => t === "*";
function tN(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(xy) && (i += eN), a && (i += ZE), s.filter((o) => !xy(o)).reduce(
    (o, u) => o + (XE.test(u) ? QE : u === "" ? JE : WE),
    i
  );
}
function nN(t, a) {
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
function aN(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let p = 0; p < i.length; ++p) {
    let y = i[p], m = p === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = bc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: m },
      b
    ), w = y.route;
    if (!v && m && s && !i[i.length - 1].route.index && (v = bc(
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
      pathnameBase: oN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function bc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = rN(
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
function rN(t, a = !1, s = !0) {
  Kt(
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
function sN(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Kt(
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
function iN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var $x = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, kh = (t) => $x.test(t);
function lN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? fa(t) : t, u;
  return s ? (s = Oh(s), s.startsWith("/") ? u = Sy(s.substring(1), "/") : u = Sy(s, a)) : u = a, {
    pathname: u,
    search: cN(i),
    hash: uN(o)
  };
}
function Sy(t, a) {
  let s = xc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function uf(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ux(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function zh(t) {
  let a = Ux(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Lc(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = fa(t) : (o = { ...t }, tt(
    !o.pathname || !o.pathname.includes("?"),
    uf("?", "pathname", "search", o)
  ), tt(
    !o.pathname || !o.pathname.includes("#"),
    uf("#", "pathname", "hash", o)
  ), tt(
    !o.search || !o.search.includes("#"),
    uf("#", "search", "hash", o)
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
  let y = lN(o, p), m = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (m || b) && (y.pathname += "/"), y;
}
var Oh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => Oh(t.join("/")), xc = (t) => t.replace(/\/+$/, ""), oN = (t) => xc(t).replace(/^\/*/, "/"), cN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, uN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, dN = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, $c = class {
  constructor(t, a, s, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function pl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function Sl(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return ea(a) || "/";
}
var Bx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Vx(t, a) {
  let s = t;
  if (typeof s != "string" || !$x.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Bx)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), p = aa(f.pathname, a);
      f.origin === u.origin && p != null ? s = p + f.search + f.hash : o = !0;
    } catch {
      Kt(
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
function fN(t, a) {
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
function hN(t, a) {
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
    let o = await Ix(
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
async function Ix(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, p = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Ix(t, a, s, i - 1), u = await f, tt(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
    request: mN(a),
    params: { ...i },
    unstable_pattern: o,
    context: pN(s)
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
function mN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function pN(t) {
  if (vN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var gN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function vN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === gN;
}
var Hx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], yN = new Set(
  Hx
), bN = [
  "GET",
  ...Hx
], xN = new Set(bN), qx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), SN = /* @__PURE__ */ new Set([307, 308]), df = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, wN = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Qi = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, jN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Fx = "remix-router-transitions", Yx = Symbol("ResetLoaderData");
function EN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  tt(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || jN, u = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    u = (P) => ({
      ...o(P),
      ...fN(
        z.map((Z) => Z.route).filter(Boolean),
        P
      )
    });
  }
  let f = {}, p = ml(
    t.routes,
    u,
    void 0,
    f
  ), y, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let b = t.dataStrategy || _N, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, T = null, R = null, N = t.hydrationData != null, D = yr(p, t.history.location, m), O = !1, C = null, V, Q;
  if (D == null && !t.patchRoutesOnNavigation) {
    let z = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: P, route: Z } = Ho(p);
    V = !0, Q = !V, D = P, C = { [Z.id]: z };
  } else if (D && !t.hydrationData && wn(
    D,
    p,
    t.history.location.pathname
  ).active && (D = null), D)
    if (D.some((z) => z.route.lazy))
      V = !1, Q = !V;
    else if (!D.some((z) => Lh(z.route)))
      V = !0, Q = !V;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, P = t.hydrationData ? t.hydrationData.errors : null, Z = D;
      if (P) {
        let ge = D.findIndex(
          (be) => P[be.route.id] !== void 0
        );
        Z = Z.slice(0, ge + 1);
      }
      Q = !1, V = !0, Z.forEach((ge) => {
        let be = Gx(ge.route, z, P);
        Q = Q || be.renderFallback, V = V && !be.shouldLoad;
      });
    }
  else {
    V = !1, Q = !V, D = [];
    let z = wn(
      null,
      p,
      t.history.location.pathname
    );
    z.active && z.matches && (O = !0, D = z.matches);
  }
  let te, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: D,
    initialized: V,
    renderFallback: Q,
    navigation: df,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || C,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, F = "POP", k = null, I = !1, J, he = !1, K = /* @__PURE__ */ new Map(), ie = null, A = !1, Y = !1, $ = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Map(), oe = 0, _ = -1, ae = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), ve, Ce = null;
  function Ge() {
    if (w = t.history.listen(
      ({ action: z, location: P, delta: Z }) => {
        if (ve) {
          ve(), ve = void 0;
          return;
        }
        Kt(
          ue.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ge = qe({
          currentLocation: M.location,
          nextLocation: P,
          historyAction: z
        });
        if (ge && Z != null) {
          let be = new Promise((Re) => {
            ve = Re;
          });
          t.history.go(Z * -1), ye(ge, {
            state: "blocked",
            location: P,
            proceed() {
              ye(ge, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), be.then(() => t.history.go(Z));
            },
            reset() {
              let Re = new Map(M.blockers);
              Re.set(ge, Qi), Ie({ blockers: Re });
            }
          }), k?.resolve(), k = null;
          return;
        }
        return Tt(z, P);
      }
    ), s) {
      PN(a, K);
      let z = () => KN(a, K);
      a.addEventListener("pagehide", z), ie = () => a.removeEventListener("pagehide", z);
    }
    return M.initialized || Tt("POP", M.location, {
      initialHydration: !0
    }), te;
  }
  function Ee() {
    w && w(), ie && ie(), S.clear(), J && J.abort(), M.fetchers.forEach((z, P) => gn(P)), M.blockers.forEach((z, P) => pe(P));
  }
  function Ze(z) {
    return S.add(z), () => S.delete(z);
  }
  function Ie(z, P = {}) {
    z.matches && (z.matches = z.matches.map((be) => {
      let Re = f[be.route.id], Se = be.route;
      return Se.element !== Re.element || Se.errorElement !== Re.errorElement || Se.hydrateFallbackElement !== Re.hydrateFallbackElement ? {
        ...be,
        route: Re
      } : be;
    })), M = {
      ...M,
      ...z
    };
    let Z = [], ge = [];
    M.fetchers.forEach((be, Re) => {
      be.state === "idle" && (W.has(Re) ? Z.push(Re) : ge.push(Re));
    }), W.forEach((be) => {
      !M.fetchers.has(be) && !q.has(be) && Z.push(be);
    }), [...S].forEach(
      (be) => be(M, {
        deletedFetchers: Z,
        newErrors: z.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), Z.forEach((be) => gn(be)), ge.forEach((be) => M.fetchers.delete(be));
  }
  function Pe(z, P, { flushSync: Z } = {}) {
    let ge = M.actionData != null && M.navigation.formMethod != null && xn(M.navigation.formMethod) && M.navigation.state === "loading" && z.state?._isRedirect !== !0, be;
    P.actionData ? Object.keys(P.actionData).length > 0 ? be = P.actionData : be = null : ge ? be = M.actionData : be = null;
    let Re = P.loaderData ? zy(
      M.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : M.loaderData, Se = M.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach(($e, ke) => Se.set(ke, Qi)));
    let je = A ? !1 : It(z, P.matches || M.matches), Ae = I === !0 || M.navigation.formMethod != null && xn(M.navigation.formMethod) && z.state?._isRedirect !== !0;
    y && (p = y, y = void 0), A || F === "POP" || (F === "PUSH" ? t.history.push(z, z.state) : F === "REPLACE" && t.history.replace(z, z.state));
    let Ne;
    if (F === "POP") {
      let $e = K.get(M.location.pathname);
      $e && $e.has(z.pathname) ? Ne = {
        currentLocation: M.location,
        nextLocation: z
      } : K.has(z.pathname) && (Ne = {
        currentLocation: z,
        nextLocation: M.location
      });
    } else if (he) {
      let $e = K.get(M.location.pathname);
      $e ? $e.add(z.pathname) : ($e = /* @__PURE__ */ new Set([z.pathname]), K.set(M.location.pathname, $e)), Ne = {
        currentLocation: M.location,
        nextLocation: z
      };
    }
    Ie(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: be,
        loaderData: Re,
        historyAction: F,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: df,
        revalidation: "idle",
        restoreScrollPosition: je,
        preventScrollReset: Ae,
        blockers: Se
      },
      {
        viewTransitionOpts: Ne,
        flushSync: Z === !0
      }
    ), F = "POP", I = !1, he = !1, A = !1, Y = !1, k?.resolve(), k = null, Ce?.resolve(), Ce = null;
  }
  async function cn(z, P) {
    if (k?.resolve(), k = null, typeof z == "number") {
      k || (k = Uy());
      let wt = k.promise;
      return t.history.go(z), wt;
    }
    let Z = eh(
      M.location,
      M.matches,
      m,
      z,
      P?.fromRouteId,
      P?.relative
    ), { path: ge, submission: be, error: Re } = Ey(
      !1,
      Z,
      P
    ), Se;
    P?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.unstable_mask == "string" ? fa(P.unstable_mask) : {
        ...M.location.unstable_mask,
        ...P.unstable_mask
      }
    });
    let je = M.location, Ae = Wf(
      je,
      ge,
      P && P.state,
      void 0,
      Se
    );
    Ae = {
      ...Ae,
      ...t.history.encodeLocation(Ae)
    };
    let Ne = P && P.replace != null ? P.replace : void 0, $e = "PUSH";
    Ne === !0 ? $e = "REPLACE" : Ne === !1 || be != null && xn(be.formMethod) && be.formAction === M.location.pathname + M.location.search && ($e = "REPLACE");
    let ke = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, ut = (P && P.flushSync) === !0, We = qe({
      currentLocation: je,
      nextLocation: Ae,
      historyAction: $e
    });
    if (We) {
      ye(We, {
        state: "blocked",
        location: Ae,
        proceed() {
          ye(We, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ae
          }), cn(z, P);
        },
        reset() {
          let wt = new Map(M.blockers);
          wt.set(We, Qi), Ie({ blockers: wt });
        }
      });
      return;
    }
    await Tt($e, Ae, {
      submission: be,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Re,
      preventScrollReset: ke,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: ut,
      callSiteDefaultShouldRevalidate: P && P.unstable_defaultShouldRevalidate
    });
  }
  function Ct() {
    Ce || (Ce = Uy()), ot(), Ie({ revalidation: "loading" });
    let z = Ce.promise;
    return M.navigation.state === "submitting" ? z : M.navigation.state === "idle" ? (Tt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), z) : (Tt(
      F || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: he === !0
      }
    ), z);
  }
  async function Tt(z, P, Z) {
    J && J.abort(), J = null, F = z, A = (Z && Z.startUninterruptedRevalidation) === !0, Fe(M.location, M.matches), I = (Z && Z.preventScrollReset) === !0, he = (Z && Z.enableViewTransition) === !0;
    let ge = y || p, be = Z && Z.overrideNavigation, Re = Z?.initialHydration && M.matches && M.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : yr(ge, P, m), Se = (Z && Z.flushSync) === !0;
    if (Re && M.initialized && !Y && $N(M.location, P) && !(Z && Z.submission && xn(Z.submission.formMethod))) {
      Pe(P, { matches: Re }, { flushSync: Se });
      return;
    }
    let je = wn(Re, ge, P.pathname);
    if (je.active && je.matches && (Re = je.matches), !Re) {
      let { error: yt, notFoundMatches: Ot, route: nt } = Je(
        P.pathname
      );
      Pe(
        P,
        {
          matches: Ot,
          loaderData: {},
          errors: {
            [nt.id]: yt
          }
        },
        { flushSync: Se }
      );
      return;
    }
    J = new AbortController();
    let Ae = Is(
      t.history,
      P,
      J.signal,
      Z && Z.submission
    ), Ne = t.getContext ? await t.getContext() : new yy(), $e;
    if (Z && Z.pendingError)
      $e = [
        br(Re).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && xn(Z.submission.formMethod)) {
      let yt = await Vt(
        Ae,
        P,
        Z.submission,
        Re,
        Ne,
        je.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Se }
      );
      if (yt.shortCircuited)
        return;
      if (yt.pendingActionResult) {
        let [Ot, nt] = yt.pendingActionResult;
        if (In(nt) && pl(nt.error) && nt.error.status === 404) {
          J = null, Pe(P, {
            matches: yt.matches,
            loaderData: {},
            errors: {
              [Ot]: nt.error
            }
          });
          return;
        }
      }
      Re = yt.matches || Re, $e = yt.pendingActionResult, be = ff(P, Z.submission), Se = !1, je.active = !1, Ae = Is(
        t.history,
        Ae.url,
        Ae.signal
      );
    }
    let {
      shortCircuited: ke,
      matches: ut,
      loaderData: We,
      errors: wt
    } = await kt(
      Ae,
      P,
      Re,
      Ne,
      je.active,
      be,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Se,
      $e,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    ke || (J = null, Pe(P, {
      matches: ut || Re,
      ...Oy($e),
      loaderData: We,
      errors: wt
    }));
  }
  async function Vt(z, P, Z, ge, be, Re, Se, je = {}) {
    ot();
    let Ae = YN(P, Z);
    if (Ie({ navigation: Ae }, { flushSync: je.flushSync === !0 }), Re) {
      let ke = await ct(
        ge,
        P.pathname,
        z.signal
      );
      if (ke.type === "aborted")
        return { shortCircuited: !0 };
      if (ke.type === "error") {
        if (ke.partialMatches.length === 0) {
          let { matches: We, route: wt } = Ho(p);
          return {
            matches: We,
            pendingActionResult: [
              wt.id,
              {
                type: "error",
                error: ke.error
              }
            ]
          };
        }
        let ut = br(ke.partialMatches).route.id;
        return {
          matches: ke.partialMatches,
          pendingActionResult: [
            ut,
            {
              type: "error",
              error: ke.error
            }
          ]
        };
      } else if (ke.matches)
        ge = ke.matches;
      else {
        let { notFoundMatches: ut, error: We, route: wt } = Je(
          P.pathname
        );
        return {
          matches: ut,
          pendingActionResult: [
            wt.id,
            {
              type: "error",
              error: We
            }
          ]
        };
      }
    }
    let Ne, $e = uc(ge, P);
    if (!$e.route.action && !$e.route.lazy)
      Ne = {
        type: "error",
        error: Wn(405, {
          method: z.method,
          pathname: P.pathname,
          routeId: $e.route.id
        })
      };
    else {
      let ke = Ps(
        u,
        f,
        z,
        P,
        ge,
        $e,
        Se ? [] : i,
        be
      ), ut = await Le(
        z,
        P,
        ke,
        be,
        null
      );
      if (Ne = ut[$e.route.id], !Ne) {
        for (let We of ge)
          if (ut[We.route.id]) {
            Ne = ut[We.route.id];
            break;
          }
      }
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(Ne)) {
      let ke;
      return je && je.replace != null ? ke = je.replace : ke = Ay(
        Ne.response.headers.get("Location"),
        new URL(z.url),
        m,
        t.history
      ) === M.location.pathname + M.location.search, await we(z, Ne, !0, {
        submission: Z,
        replace: ke
      }), { shortCircuited: !0 };
    }
    if (In(Ne)) {
      let ke = br(ge, $e.route.id);
      return (je && je.replace) !== !0 && (F = "PUSH"), {
        matches: ge,
        pendingActionResult: [
          ke.route.id,
          Ne,
          $e.route.id
        ]
      };
    }
    return {
      matches: ge,
      pendingActionResult: [$e.route.id, Ne]
    };
  }
  async function kt(z, P, Z, ge, be, Re, Se, je, Ae, Ne, $e, ke, ut) {
    let We = Re || ff(P, Se), wt = Se || je || $y(We), yt = !A && !Ne;
    if (be) {
      if (yt) {
        let Yt = sn(ke);
        Ie(
          {
            navigation: We,
            ...Yt !== void 0 ? { actionData: Yt } : {}
          },
          {
            flushSync: $e
          }
        );
      }
      let et = await ct(
        Z,
        P.pathname,
        z.signal
      );
      if (et.type === "aborted")
        return { shortCircuited: !0 };
      if (et.type === "error") {
        if (et.partialMatches.length === 0) {
          let { matches: yn, route: Zt } = Ho(p);
          return {
            matches: yn,
            loaderData: {},
            errors: {
              [Zt.id]: et.error
            }
          };
        }
        let Yt = br(et.partialMatches).route.id;
        return {
          matches: et.partialMatches,
          loaderData: {},
          errors: {
            [Yt]: et.error
          }
        };
      } else if (et.matches)
        Z = et.matches;
      else {
        let { error: Yt, notFoundMatches: yn, route: Zt } = Je(
          P.pathname
        );
        return {
          matches: yn,
          loaderData: {},
          errors: {
            [Zt.id]: Yt
          }
        };
      }
    }
    let Ot = y || p, { dsMatches: nt, revalidatingFetchers: Qt } = Ny(
      z,
      ge,
      u,
      f,
      t.history,
      M,
      Z,
      wt,
      P,
      Ne ? [] : i,
      Ne === !0,
      Y,
      $,
      W,
      G,
      re,
      Ot,
      m,
      t.patchRoutesOnNavigation != null,
      ke,
      ut
    );
    if (_ = ++oe, !t.dataStrategy && !nt.some((et) => et.shouldLoad) && !nt.some(
      (et) => et.route.middleware && et.route.middleware.length > 0
    ) && Qt.length === 0) {
      let et = Ue();
      return Pe(
        P,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: ke && In(ke[1]) ? { [ke[0]]: ke[1].error } : null,
          ...Oy(ke),
          ...et ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: $e }
      ), { shortCircuited: !0 };
    }
    if (yt) {
      let et = {};
      if (!be) {
        et.navigation = We;
        let Yt = sn(ke);
        Yt !== void 0 && (et.actionData = Yt);
      }
      Qt.length > 0 && (et.fetchers = Xt(Qt)), Ie(et, { flushSync: $e });
    }
    Qt.forEach((et) => {
      mt(et.key), et.controller && q.set(et.key, et.controller);
    });
    let Nt = () => Qt.forEach((et) => mt(et.key));
    J && J.signal.addEventListener(
      "abort",
      Nt
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Xe(
      nt,
      Qt,
      z,
      P,
      ge
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    J && J.signal.removeEventListener(
      "abort",
      Nt
    ), Qt.forEach((et) => q.delete(et.key));
    let ln = qo(Fa);
    if (ln)
      return await we(z, ln.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    if (ln = qo(ia), ln)
      return re.add(ln.key), await we(z, ln.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    let { loaderData: ha, errors: Cr } = ky(
      M,
      Z,
      Fa,
      ke,
      Qt,
      ia
    );
    Ne && M.errors && (Cr = { ...M.errors, ...Cr });
    let ma = Ue(), Tr = ze(_), ts = ma || Tr || Qt.length > 0;
    return {
      matches: Z,
      loaderData: ha,
      errors: Cr,
      ...ts ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function sn(z) {
    if (z && !In(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function Xt(z) {
    return z.forEach((P) => {
      let Z = M.fetchers.get(P.key), ge = Zi(
        void 0,
        Z ? Z.data : void 0
      );
      M.fetchers.set(P.key, ge);
    }), new Map(M.fetchers);
  }
  async function Rt(z, P, Z, ge) {
    mt(z);
    let be = (ge && ge.flushSync) === !0, Re = y || p, Se = eh(
      M.location,
      M.matches,
      m,
      Z,
      P,
      ge?.relative
    ), je = yr(Re, Se, m), Ae = wn(je, Re, Se);
    if (Ae.active && Ae.matches && (je = Ae.matches), !je) {
      zt(
        z,
        P,
        Wn(404, { pathname: Se }),
        { flushSync: be }
      );
      return;
    }
    let { path: Ne, submission: $e, error: ke } = Ey(
      !0,
      Se,
      ge
    );
    if (ke) {
      zt(z, P, ke, { flushSync: be });
      return;
    }
    let ut = t.getContext ? await t.getContext() : new yy(), We = (ge && ge.preventScrollReset) === !0;
    if ($e && xn($e.formMethod)) {
      await $t(
        z,
        P,
        Ne,
        je,
        ut,
        Ae.active,
        be,
        We,
        $e,
        ge && ge.unstable_defaultShouldRevalidate
      );
      return;
    }
    G.set(z, { routeId: P, path: Ne }), await _t(
      z,
      P,
      Ne,
      je,
      ut,
      Ae.active,
      be,
      We,
      $e
    );
  }
  async function $t(z, P, Z, ge, be, Re, Se, je, Ae, Ne) {
    ot(), G.delete(z);
    let $e = M.fetchers.get(z);
    Ut(z, GN(Ae, $e), {
      flushSync: Se
    });
    let ke = new AbortController(), ut = Is(
      t.history,
      Z,
      ke.signal,
      Ae
    );
    if (Re) {
      let Mt = await ct(
        ge,
        new URL(ut.url).pathname,
        ut.signal,
        z
      );
      if (Mt.type === "aborted")
        return;
      if (Mt.type === "error") {
        zt(z, P, Mt.error, { flushSync: Se });
        return;
      } else if (Mt.matches)
        ge = Mt.matches;
      else {
        zt(
          z,
          P,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let We = uc(ge, Z);
    if (!We.route.action && !We.route.lazy) {
      let Mt = Wn(405, {
        method: Ae.formMethod,
        pathname: Z,
        routeId: P
      });
      zt(z, P, Mt, { flushSync: Se });
      return;
    }
    q.set(z, ke);
    let wt = oe, yt = Ps(
      u,
      f,
      ut,
      Z,
      ge,
      We,
      i,
      be
    ), Ot = await Le(
      ut,
      Z,
      yt,
      be,
      z
    ), nt = Ot[We.route.id];
    if (!nt) {
      for (let Mt of yt)
        if (Ot[Mt.route.id]) {
          nt = Ot[Mt.route.id];
          break;
        }
    }
    if (ut.signal.aborted) {
      q.get(z) === ke && q.delete(z);
      return;
    }
    if (W.has(z)) {
      if (Gr(nt) || In(nt)) {
        Ut(z, Ba(void 0));
        return;
      }
    } else {
      if (Gr(nt))
        if (q.delete(z), _ > wt) {
          Ut(z, Ba(void 0));
          return;
        } else
          return re.add(z), Ut(z, Zi(Ae)), we(ut, nt, !1, {
            fetcherSubmission: Ae,
            preventScrollReset: je
          });
      if (In(nt)) {
        zt(z, P, nt.error);
        return;
      }
    }
    let Qt = M.navigation.location || M.location, Nt = Is(
      t.history,
      Qt,
      ke.signal
    ), Fa = y || p, ia = M.navigation.state !== "idle" ? yr(Fa, M.navigation.location, m) : M.matches;
    tt(ia, "Didn't find any matches after fetcher action");
    let ln = ++oe;
    ae.set(z, ln);
    let ha = Zi(Ae, nt.data);
    M.fetchers.set(z, ha);
    let { dsMatches: Cr, revalidatingFetchers: ma } = Ny(
      Nt,
      be,
      u,
      f,
      t.history,
      M,
      ia,
      Ae,
      Qt,
      i,
      !1,
      Y,
      $,
      W,
      G,
      re,
      Fa,
      m,
      t.patchRoutesOnNavigation != null,
      [We.route.id, nt],
      Ne
    );
    ma.filter((Mt) => Mt.key !== z).forEach((Mt) => {
      let ns = Mt.key, as = M.fetchers.get(ns), Ml = Zi(
        void 0,
        as ? as.data : void 0
      );
      M.fetchers.set(ns, Ml), mt(ns), Mt.controller && q.set(ns, Mt.controller);
    }), Ie({ fetchers: new Map(M.fetchers) });
    let Tr = () => ma.forEach((Mt) => mt(Mt.key));
    ke.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ts, fetcherResults: et } = await Xe(
      Cr,
      ma,
      Nt,
      Qt,
      be
    );
    if (ke.signal.aborted)
      return;
    if (ke.signal.removeEventListener(
      "abort",
      Tr
    ), ae.delete(z), q.delete(z), ma.forEach((Mt) => q.delete(Mt.key)), M.fetchers.has(z)) {
      let Mt = Ba(nt.data);
      M.fetchers.set(z, Mt);
    }
    let Yt = qo(ts);
    if (Yt)
      return we(
        Nt,
        Yt.result,
        !1,
        { preventScrollReset: je }
      );
    if (Yt = qo(et), Yt)
      return re.add(Yt.key), we(
        Nt,
        Yt.result,
        !1,
        { preventScrollReset: je }
      );
    let { loaderData: yn, errors: Zt } = ky(
      M,
      ia,
      ts,
      void 0,
      ma,
      et
    );
    ze(ln), M.navigation.state === "loading" && ln > _ ? (tt(F, "Expected pending action"), J && J.abort(), Pe(M.navigation.location, {
      matches: ia,
      loaderData: yn,
      errors: Zt,
      fetchers: new Map(M.fetchers)
    })) : (Ie({
      errors: Zt,
      loaderData: zy(
        M.loaderData,
        yn,
        ia,
        Zt
      ),
      fetchers: new Map(M.fetchers)
    }), Y = !1);
  }
  async function _t(z, P, Z, ge, be, Re, Se, je, Ae) {
    let Ne = M.fetchers.get(z);
    Ut(
      z,
      Zi(
        Ae,
        Ne ? Ne.data : void 0
      ),
      { flushSync: Se }
    );
    let $e = new AbortController(), ke = Is(
      t.history,
      Z,
      $e.signal
    );
    if (Re) {
      let nt = await ct(
        ge,
        new URL(ke.url).pathname,
        ke.signal,
        z
      );
      if (nt.type === "aborted")
        return;
      if (nt.type === "error") {
        zt(z, P, nt.error, { flushSync: Se });
        return;
      } else if (nt.matches)
        ge = nt.matches;
      else {
        zt(
          z,
          P,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let ut = uc(ge, Z);
    q.set(z, $e);
    let We = oe, wt = Ps(
      u,
      f,
      ke,
      Z,
      ge,
      ut,
      i,
      be
    ), yt = await Le(
      ke,
      Z,
      wt,
      be,
      z
    ), Ot = yt[ut.route.id];
    if (!Ot) {
      for (let nt of ge)
        if (yt[nt.route.id]) {
          Ot = yt[nt.route.id];
          break;
        }
    }
    if (q.get(z) === $e && q.delete(z), !ke.signal.aborted) {
      if (W.has(z)) {
        Ut(z, Ba(void 0));
        return;
      }
      if (Gr(Ot))
        if (_ > We) {
          Ut(z, Ba(void 0));
          return;
        } else {
          re.add(z), await we(ke, Ot, !1, {
            preventScrollReset: je
          });
          return;
        }
      if (In(Ot)) {
        zt(z, P, Ot.error);
        return;
      }
      Ut(z, Ba(Ot.data));
    }
  }
  async function we(z, P, Z, {
    submission: ge,
    fetcherSubmission: be,
    preventScrollReset: Re,
    replace: Se
  } = {}) {
    Z || (k?.resolve(), k = null), P.response.headers.has("X-Remix-Revalidate") && (Y = !0);
    let je = P.response.headers.get("Location");
    tt(je, "Expected a Location header on the redirect Response"), je = Ay(
      je,
      new URL(z.url),
      m,
      t.history
    );
    let Ae = Wf(M.location, je, {
      _isRedirect: !0
    });
    if (s) {
      let wt = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        wt = !0;
      else if (kh(je)) {
        const yt = IE(je, !0);
        wt = // Hard reload if it's an absolute URL to a new origin
        yt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(yt.pathname, m) == null;
      }
      if (wt) {
        Se ? a.location.replace(je) : a.location.assign(je);
        return;
      }
    }
    J = null;
    let Ne = Se === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: $e, formAction: ke, formEncType: ut } = M.navigation;
    !ge && !be && $e && ke && ut && (ge = $y(M.navigation));
    let We = ge || be;
    if (SN.has(P.response.status) && We && xn(We.formMethod))
      await Tt(Ne, Ae, {
        submission: {
          ...We,
          formAction: je
        },
        // Preserve these flags across redirects
        preventScrollReset: Re || I,
        enableViewTransition: Z ? he : void 0
      });
    else {
      let wt = ff(
        Ae,
        ge
      );
      await Tt(Ne, Ae, {
        overrideNavigation: wt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: be,
        // Preserve these flags across redirects
        preventScrollReset: Re || I,
        enableViewTransition: Z ? he : void 0
      });
    }
  }
  async function Le(z, P, Z, ge, be) {
    let Re, Se = {};
    try {
      Re = await AN(
        b,
        z,
        P,
        Z,
        be,
        ge,
        !1
      );
    } catch (je) {
      return Z.filter((Ae) => Ae.shouldLoad).forEach((Ae) => {
        Se[Ae.route.id] = {
          type: "error",
          error: je
        };
      }), Se;
    }
    if (z.signal.aborted)
      return Se;
    if (!xn(z.method))
      for (let je of Z) {
        if (Re[je.route.id]?.type === "error")
          break;
        !Re.hasOwnProperty(je.route.id) && !M.loaderData.hasOwnProperty(je.route.id) && (!M.errors || !M.errors.hasOwnProperty(je.route.id)) && je.shouldCallHandler() && (Re[je.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${je.route.id}`
          )
        });
      }
    for (let [je, Ae] of Object.entries(Re))
      if (IN(Ae)) {
        let Ne = Ae.result;
        Se[je] = {
          type: "redirect",
          response: ON(
            Ne,
            z,
            je,
            Z,
            m
          )
        };
      } else
        Se[je] = await zN(Ae);
    return Se;
  }
  async function Xe(z, P, Z, ge, be) {
    let Re = Le(
      Z,
      ge,
      z,
      be,
      null
    ), Se = Promise.all(
      P.map(async (Ne) => {
        if (Ne.matches && Ne.match && Ne.request && Ne.controller) {
          let ke = (await Le(
            Ne.request,
            Ne.path,
            Ne.matches,
            be,
            Ne.key
          ))[Ne.match.route.id];
          return { [Ne.key]: ke };
        } else
          return Promise.resolve({
            [Ne.key]: {
              type: "error",
              error: Wn(404, {
                pathname: Ne.path
              })
            }
          });
      })
    ), je = await Re, Ae = (await Se).reduce(
      (Ne, $e) => Object.assign(Ne, $e),
      {}
    );
    return {
      loaderResults: je,
      fetcherResults: Ae
    };
  }
  function ot() {
    Y = !0, G.forEach((z, P) => {
      q.has(P) && $.add(P), mt(P);
    });
  }
  function Ut(z, P, Z = {}) {
    M.fetchers.set(z, P), Ie(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function zt(z, P, Z, ge = {}) {
    let be = br(M.matches, P);
    gn(z), Ie(
      {
        errors: {
          [be.route.id]: Z
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (ge && ge.flushSync) === !0 }
    );
  }
  function qn(z) {
    return U.set(z, (U.get(z) || 0) + 1), W.has(z) && W.delete(z), M.fetchers.get(z) || wN;
  }
  function un(z, P) {
    mt(z, P?.reason), Ut(z, Ba(null));
  }
  function gn(z) {
    let P = M.fetchers.get(z);
    q.has(z) && !(P && P.state === "loading" && ae.has(z)) && mt(z), G.delete(z), ae.delete(z), re.delete(z), W.delete(z), $.delete(z), M.fetchers.delete(z);
  }
  function vt(z) {
    let P = (U.get(z) || 0) - 1;
    P <= 0 ? (U.delete(z), W.add(z)) : U.set(z, P), Ie({ fetchers: new Map(M.fetchers) });
  }
  function mt(z, P) {
    let Z = q.get(z);
    Z && (Z.abort(P), q.delete(z));
  }
  function ce(z) {
    for (let P of z) {
      let Z = qn(P), ge = Ba(Z.data);
      M.fetchers.set(P, ge);
    }
  }
  function Ue() {
    let z = [], P = !1;
    for (let Z of re) {
      let ge = M.fetchers.get(Z);
      tt(ge, `Expected fetcher: ${Z}`), ge.state === "loading" && (re.delete(Z), z.push(Z), P = !0);
    }
    return ce(z), P;
  }
  function ze(z) {
    let P = [];
    for (let [Z, ge] of ae)
      if (ge < z) {
        let be = M.fetchers.get(Z);
        tt(be, `Expected fetcher: ${Z}`), be.state === "loading" && (mt(Z), ae.delete(Z), P.push(Z));
      }
    return ce(P), P.length > 0;
  }
  function H(z, P) {
    let Z = M.blockers.get(z) || Qi;
    return ue.get(z) !== P && ue.set(z, P), Z;
  }
  function pe(z) {
    M.blockers.delete(z), ue.delete(z);
  }
  function ye(z, P) {
    let Z = M.blockers.get(z) || Qi;
    tt(
      Z.state === "unblocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "proceeding" || Z.state === "blocked" && P.state === "unblocked" || Z.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${P.state}`
    );
    let ge = new Map(M.blockers);
    ge.set(z, P), Ie({ blockers: ge });
  }
  function qe({
    currentLocation: z,
    nextLocation: P,
    historyAction: Z
  }) {
    if (ue.size === 0)
      return;
    ue.size > 1 && Kt(!1, "A router only supports one blocker at a time");
    let ge = Array.from(ue.entries()), [be, Re] = ge[ge.length - 1], Se = M.blockers.get(be);
    if (!(Se && Se.state === "proceeding") && Re({ currentLocation: z, nextLocation: P, historyAction: Z }))
      return be;
  }
  function Je(z) {
    let P = Wn(404, { pathname: z }), Z = y || p, { matches: ge, route: be } = Ho(Z);
    return { notFoundMatches: ge, route: be, error: P };
  }
  function Me(z, P, Z) {
    if (j = z, R = P, T = Z || null, !N && M.navigation === df) {
      N = !0;
      let ge = It(M.location, M.matches);
      ge != null && Ie({ restoreScrollPosition: ge });
    }
    return () => {
      j = null, R = null, T = null;
    };
  }
  function Ve(z, P) {
    return T && T(
      z,
      P.map((ge) => PE(ge, M.loaderData))
    ) || z.key;
  }
  function Fe(z, P) {
    if (j && R) {
      let Z = Ve(z, P);
      j[Z] = R();
    }
  }
  function It(z, P) {
    if (j) {
      let Z = Ve(z, P), ge = j[Z];
      if (typeof ge == "number")
        return ge;
    }
    return null;
  }
  function wn(z, P, Z) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: ll(
            P,
            Z,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          P,
          Z,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function ct(z, P, Z, ge) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let be = z;
    for (; ; ) {
      let Re = y == null, Se = y || p, je = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: P,
          matches: be,
          fetcherKey: ge,
          patch: ($e, ke) => {
            Z.aborted || Cy(
              $e,
              ke,
              Se,
              je,
              u,
              !1
            );
          }
        });
      } catch ($e) {
        return { type: "error", error: $e, partialMatches: be };
      } finally {
        Re && !Z.aborted && (p = [...p]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Ae = yr(Se, P, m), Ne = null;
      if (Ae) {
        if (Object.keys(Ae[0].params).length === 0)
          return { type: "success", matches: Ae };
        if (Ne = ll(
          Se,
          P,
          m,
          !0
        ), !(Ne && be.length < Ne.length && Ft(
          be,
          Ne.slice(0, be.length)
        )))
          return { type: "success", matches: Ae };
      }
      if (Ne || (Ne = ll(
        Se,
        P,
        m,
        !0
      )), !Ne || Ft(be, Ne))
        return { type: "success", matches: null };
      be = Ne;
    }
  }
  function Ft(z, P) {
    return z.length === P.length && z.every((Z, ge) => Z.route.id === P[ge].route.id);
  }
  function sa(z) {
    f = {}, y = ml(
      z,
      u,
      void 0,
      f
    );
  }
  function vn(z, P, Z = !1) {
    let ge = y == null;
    Cy(
      z,
      P,
      y || p,
      f,
      u,
      Z
    ), ge && (p = [...p], Ie({}));
  }
  return te = {
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
    subscribe: Ze,
    enableScrollRestoration: Me,
    navigate: cn,
    fetch: Rt,
    revalidate: Ct,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: qn,
    resetFetcher: un,
    deleteFetcher: vt,
    dispose: Ee,
    getBlocker: H,
    deleteBlocker: pe,
    patchRoutes: vn,
    _internalFetchControllers: q,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: sa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      Ie(z);
    }
  }, t.unstable_instrumentations && (te = hN(
    te,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), te;
}
function NN(t) {
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
  let y = Lc(
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
  return s !== "/" && (y.pathname = iN({ basename: s, pathname: y.pathname })), xa(y);
}
function Ey(t, a, s) {
  if (!s || !NN(s))
    return { path: a };
  if (s.formMethod && !FN(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = Wx(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!xn(u))
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
      if (!xn(u))
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
  tt(
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
  if (xn(m.formMethod))
    return { path: a, submission: m };
  let b = fa(a);
  return t && b.search && Uh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: xa(b), submission: m };
}
function Ny(t, a, s, i, o, u, f, p, y, m, b, v, w, S, j, T, R, N, D, O, C) {
  let V = O ? In(O[1]) ? O[1].error : O[1].data : void 0, Q = o.createURL(u.location), te = o.createURL(y), M;
  if (b && u.errors) {
    let ie = Object.keys(u.errors)[0];
    M = f.findIndex((A) => A.route.id === ie);
  } else if (O && In(O[1])) {
    let ie = O[0];
    M = f.findIndex((A) => A.route.id === ie) - 1;
  }
  let F = O ? O[1].statusCode : void 0, k = F && F >= 400, I = {
    currentUrl: Q,
    currentParams: u.matches[0]?.params || {},
    nextUrl: te,
    nextParams: f[0].params,
    ...p,
    actionResult: V,
    actionStatus: F
  }, J = Sl(f), he = f.map((ie, A) => {
    let { route: Y } = ie, $ = null;
    if (M != null && A > M)
      $ = !1;
    else if (Y.lazy)
      $ = !0;
    else if (!Lh(Y))
      $ = !1;
    else if (b) {
      let { shouldLoad: ae } = Gx(
        Y,
        u.loaderData,
        u.errors
      );
      $ = ae;
    } else CN(u.loaderData, u.matches[A], ie) && ($ = !0);
    if ($ !== null)
      return th(
        s,
        i,
        t,
        y,
        J,
        ie,
        m,
        a,
        $
      );
    let q = !1;
    typeof C == "boolean" ? q = C : k ? q = !1 : (v || Q.pathname + Q.search === te.pathname + te.search || Q.search !== te.search || TN(u.matches[A], ie)) && (q = !0);
    let oe = {
      ...I,
      defaultShouldRevalidate: q
    }, _ = ul(ie, oe);
    return th(
      s,
      i,
      t,
      y,
      J,
      ie,
      m,
      a,
      _,
      oe,
      C
    );
  }), K = [];
  return j.forEach((ie, A) => {
    if (b || !f.some((G) => G.route.id === ie.routeId) || S.has(A))
      return;
    let Y = u.fetchers.get(A), $ = Y && Y.state !== "idle" && Y.data === void 0, q = yr(R, ie.path, N);
    if (!q) {
      if (D && $)
        return;
      K.push({
        key: A,
        routeId: ie.routeId,
        path: ie.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (T.has(A))
      return;
    let oe = uc(q, ie.path), _ = new AbortController(), ae = Is(
      o,
      ie.path,
      _.signal
    ), re = null;
    if (w.has(A))
      w.delete(A), re = Ps(
        s,
        i,
        ae,
        ie.path,
        q,
        oe,
        m,
        a
      );
    else if ($)
      v && (re = Ps(
        s,
        i,
        ae,
        ie.path,
        q,
        oe,
        m,
        a
      ));
    else {
      let G;
      typeof C == "boolean" ? G = C : k ? G = !1 : G = v;
      let U = {
        ...I,
        defaultShouldRevalidate: G
      };
      ul(oe, U) && (re = Ps(
        s,
        i,
        ae,
        ie.path,
        q,
        oe,
        m,
        a,
        U
      ));
    }
    re && K.push({
      key: A,
      routeId: ie.routeId,
      path: ie.path,
      matches: re,
      match: oe,
      request: ae,
      controller: _
    });
  }), { dsMatches: he, revalidatingFetchers: K };
}
function Lh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Gx(t, a, s) {
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
function CN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function TN(t, a) {
  let s = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function ul(t, a) {
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
    tt(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), f = m.children;
  } else
    f = s;
  let p = [], y = [];
  if (a.forEach((m) => {
    let b = f.find(
      (v) => Px(m, v)
    );
    b ? y.push({ existingRoute: b, newRoute: m }) : p.push(m);
  }), p.length > 0) {
    let m = ml(
      p,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...m);
  }
  if (u && y.length > 0)
    for (let m = 0; m < y.length; m++) {
      let { existingRoute: b, newRoute: v } = y[m], w = b, [S] = ml(
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
function Px(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => Px(s, o))
  ) ?? !1 : !1;
}
var Ty = /* @__PURE__ */ new WeakMap(), Kx = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (tt(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
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
    let m = qE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      Kt(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      Kt(
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
function RN(t, a, s, i, o) {
  let u = s[t.id];
  if (tt(u, "No route found in manifest"), !t.lazy)
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
      tt(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let T = w[j];
        if (T === void 0)
          continue;
        let R = YE(j), D = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        R ? Kt(
          !R,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : D ? Kt(
          !D,
          `Route "${u.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : S[j] = T;
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
    let v = Kx({
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
async function _N(t) {
  return t.matches.some((a) => a.route.middleware) ? Xx(t, () => _y(t)) : _y(t);
}
function Xx(t, a) {
  return MN(
    t,
    a,
    (i) => {
      if (qN(i))
        throw i;
      return i;
    },
    BN,
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
async function MN(t, a, s, i, o) {
  let { matches: u, ...f } = t, p = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await Qx(
    f,
    p,
    a,
    s,
    i,
    o
  );
}
async function Qx(t, a, s, i, o, u, f = 0) {
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
      return v = { value: await Qx(
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
function Zx(t, a, s, i, o) {
  let u = Kx({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = RN(
    i.route,
    xn(s.method) ? "action" : "loader",
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
  let v = !1, w = Zx(
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
      return v = !0, m ? typeof b == "boolean" ? ul(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? ul(u, {
        ...m,
        defaultShouldRevalidate: S
      }) : ul(u, m) : y;
    },
    resolve(S) {
      let { lazy: j, loader: T, middleware: R } = u.route, N = v || y || S && !xn(s.method) && (j || T), D = R && R.length > 0 && !T && !j;
      return N && (xn(s.method) || !D) ? DN({
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
function Ps(t, a, s, i, o, u, f, p, y = null) {
  return o.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: Zx(
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
    Sl(o),
    m,
    f,
    p,
    !0,
    y
  ));
}
async function AN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: Jx(a, s),
    unstable_pattern: Sl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, m = await t({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return Xx(v, () => b({
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
async function DN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: p
}) {
  let y, m, b = xn(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, T = new Promise((D, O) => j = O);
    m = () => j(), t.signal.addEventListener("abort", m);
    let R = (D) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Jx(t, a),
        unstable_pattern: s,
        params: i.params,
        context: p
      },
      ...D !== void 0 ? [D] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (f ? f((O) => R(O)) : R()) };
      } catch (D) {
        return { type: "error", result: D };
      }
    })();
    return Promise.race([N, T]);
  };
  try {
    let S = b ? i.route.action : i.route.loader;
    if (o || u)
      if (S) {
        let j, [T] = await Promise.all([
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
        y = T;
      } else {
        await o;
        let j = b ? i.route.action : i.route.loader;
        if (j)
          [y] = await Promise.all([w(j), u]);
        else if (v === "action") {
          let T = new URL(t.url), R = T.pathname + T.search;
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
      let j = new URL(t.url), T = j.pathname + j.search;
      throw Wn(404, {
        pathname: T
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return y;
}
async function kN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function zN(t) {
  let { result: a, type: s } = t;
  if ($h(a)) {
    let i;
    try {
      i = await kN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new $c(a.status, a.statusText, i),
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
    error: UN(a),
    statusCode: pl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: pl(a) ? a.status : void 0
  } : Ly(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function ON(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (tt(
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
  let o = t.createURL(Wx(a)).toString(), u = { signal: s };
  if (i && xn(i.formMethod)) {
    let { formMethod: f, formEncType: p } = i;
    u.method = f.toUpperCase(), p === "application/json" ? (u.headers = new Headers({ "Content-Type": p }), u.body = JSON.stringify(i.json)) : p === "text/plain" ? u.body = i.text : p === "application/x-www-form-urlencoded" && i.formData ? u.body = nh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function Jx(t, a) {
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
function LN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, p, y = !1, m = {}, b = s && In(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (tt(
      !Gr(S),
      "Cannot handle redirect results in processLoaderData"
    ), In(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let T = br(t, w);
        f[T.route.id] == null && (f[T.route.id] = j);
      }
      i || (u[w] = Yx), y || (y = !0, p = pl(S.error) ? S.error.status : 500), S.headers && (m[w] = S.headers);
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
  let { loaderData: f, errors: p } = LN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((m) => m.shouldLoad)).forEach((y) => {
    let { key: m, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let w = u[m];
    if (tt(w, "Did not find corresponding fetcher result"), In(w)) {
      let S = br(t.matches, b?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: w.error
      }), t.fetchers.delete(m);
    } else if (Gr(w))
      tt(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(m, S);
    }
  }), { loaderData: f, errors: p };
}
function zy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== Yx).reduce((u, [f, p]) => (u[f] = p, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function Oy(t) {
  return t ? In(t[1]) ? {
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
function Ho(t) {
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
  return t === 400 ? (f = "Bad Request", i && a && s ? p = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (p = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", p = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", p = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? p = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (p = `Invalid request method "${i.toUpperCase()}"`)), new $c(
    t || 500,
    f,
    new Error(p),
    !0
  );
}
function qo(t) {
  let a = Object.entries(t);
  for (let s = a.length - 1; s >= 0; s--) {
    let [i, o] = a[s];
    if (Gr(o))
      return { key: i, result: o };
  }
}
function Wx(t) {
  let a = typeof t == "string" ? fa(t) : t;
  return xa({ ...a, hash: "" });
}
function $N(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function UN(t) {
  return new $c(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function BN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && VN(s)
  );
}
function VN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function IN(t) {
  return $h(t.result) && qx.has(t.result.status);
}
function In(t) {
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
function HN(t) {
  return qx.has(t);
}
function qN(t) {
  return $h(t) && HN(t.status) && t.headers.has("Location");
}
function FN(t) {
  return xN.has(t.toUpperCase());
}
function xn(t) {
  return yN.has(t.toUpperCase());
}
function Uh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function uc(t, a) {
  let s = typeof a == "string" ? fa(a).search : a.search;
  if (t[t.length - 1].route.index && Uh(s || ""))
    return t[t.length - 1];
  let i = Ux(t);
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
function ff(t, a) {
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
function YN(t, a) {
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
function Zi(t, a) {
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
function GN(t, a) {
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
function PN(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      Fx
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function KN(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        Fx,
        JSON.stringify(s)
      );
    } catch (i) {
      Kt(
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
var wl = g.createContext(null);
wl.displayName = "DataRouterState";
var e1 = g.createContext(!1);
function t1() {
  return g.useContext(e1);
}
var Bh = g.createContext({
  isTransitioning: !1
});
Bh.displayName = "ViewTransition";
var n1 = g.createContext(
  /* @__PURE__ */ new Map()
);
n1.displayName = "Fetchers";
var XN = g.createContext(null);
XN.displayName = "Await";
var ra = g.createContext(
  null
);
ra.displayName = "Navigation";
var Uc = g.createContext(
  null
);
Uc.displayName = "Location";
var Ha = g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ha.displayName = "Route";
var Vh = g.createContext(null);
Vh.displayName = "RouteError";
var a1 = "REACT_ROUTER_ERROR", QN = "REDIRECT", ZN = "ROUTE_ERROR_RESPONSE";
function JN(t) {
  if (t.startsWith(`${a1}:${QN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function WN(t) {
  if (t.startsWith(
    `${a1}:${ZN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new $c(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function eC(t, { relative: a } = {}) {
  tt(
    jl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = El(t, { relative: a }), p = u;
  return s !== "/" && (p = u === "/" ? s : ea([s, u])), i.createHref({ pathname: p, search: f, hash: o });
}
function jl() {
  return g.useContext(Uc) != null;
}
function qa() {
  return tt(
    jl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(Uc).location;
}
var r1 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function s1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ei() {
  let { isDataRoute: t } = g.useContext(Ha);
  return t ? fC() : tC();
}
function tC() {
  tt(
    jl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(es), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(Ha), { pathname: o } = qa(), u = JSON.stringify(zh(i)), f = g.useRef(!1);
  return s1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, m = {}) => {
      if (Kt(f.current, r1), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Lc(
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
function El(t, { relative: a } = {}) {
  let { matches: s } = g.useContext(Ha), { pathname: i } = qa(), o = JSON.stringify(zh(s));
  return g.useMemo(
    () => Lc(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function nC(t, a, s) {
  tt(
    jl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(Ha), u = o[o.length - 1], f = u ? u.params : {}, p = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let R = m && m.path || "";
    o1(
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
  return Kt(
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Kt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), lC(
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
function aC() {
  let t = dC(), a = pl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var rC = /* @__PURE__ */ g.createElement(aC, null), i1 = class extends g.Component {
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
      const s = WN(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(Ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Vh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(sC, { error: t }, a) : a;
  }
};
i1.contextType = e1;
var hf = /* @__PURE__ */ new WeakMap();
function sC({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = JN(a.digest);
    if (i) {
      let o = hf.get(a);
      if (o) throw o;
      let u = Vx(i.location, s);
      if (Bx && !hf.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw hf.set(a, f), f;
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
function iC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(es);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(Ha.Provider, { value: t }, s);
}
function lC(t, a = [], s) {
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
    tt(
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
      unstable_pattern: Sl(i.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, T = null, R = null;
      i && (S = u && v.route.id ? u[v.route.id] : void 0, T = v.route.errorElement || rC, f && (p < 0 && w === 0 ? (o1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, R = null) : p === w && (j = !0, R = v.route.hydrateFallbackElement || null)));
      let N = a.concat(o.slice(0, w + 1)), D = () => {
        let O;
        return S ? O = T : j ? O = R : v.route.Component ? O = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? O = v.route.element : O = b, /* @__PURE__ */ g.createElement(
          iC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: N,
              isDataRoute: i != null
            },
            children: O
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ g.createElement(
        i1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: T,
          error: S,
          children: D(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: m
        }
      ) : D();
    },
    null
  );
}
function Ih(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function oC(t) {
  let a = g.useContext(es);
  return tt(a, Ih(t)), a;
}
function l1(t) {
  let a = g.useContext(wl);
  return tt(a, Ih(t)), a;
}
function cC(t) {
  let a = g.useContext(Ha);
  return tt(a, Ih(t)), a;
}
function Bc(t) {
  let a = cC(t), s = a.matches[a.matches.length - 1];
  return tt(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function uC() {
  return Bc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Nl() {
  let t = l1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Bc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function dC() {
  let t = g.useContext(Vh), a = l1(
    "useRouteError"
    /* UseRouteError */
  ), s = Bc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function fC() {
  let { router: t } = oC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Bc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return s1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Kt(s.current, r1), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var By = {};
function o1(t, a, s) {
  !a && !By[t] && (By[t] = !0, Kt(!1, s));
}
var Vy = {};
function Iy(t, a) {
  !t && !Vy[a] && (Vy[a] = !0, console.warn(a));
}
var hC = "useOptimistic", Hy = ME[hC], mC = () => {
};
function pC(t) {
  return Hy ? Hy(t) : [t, mC];
}
function gC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Kt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: g.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Kt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: g.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Kt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: g.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var vC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function yC(t, a) {
  return EN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: BE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: vC,
    mapRouteProperties: gC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var bC = class {
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
function xC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = t1() || i;
  let [u, f] = g.useState(t.state), [p, y] = pC(u), [m, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [T, R] = g.useState(), [N, D] = g.useState(), O = g.useRef(/* @__PURE__ */ new Map()), C = g.useCallback(
    (F, { deletedFetchers: k, newErrors: I, flushSync: J, viewTransitionOpts: he }) => {
      I && s && Object.values(I).forEach(
        (ie) => s(ie, {
          location: F.location,
          params: F.matches[0]?.params ?? {},
          unstable_pattern: Sl(F.matches)
        })
      ), F.fetchers.forEach((ie, A) => {
        ie.data !== void 0 && O.current.set(A, ie.data);
      }), k.forEach((ie) => O.current.delete(ie)), Iy(
        J === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let K = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Iy(
        he == null || K,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !he || !K) {
        a && J ? a(() => f(F)) : i === !1 ? f(F) : g.startTransition(() => {
          i === !0 && y((ie) => qy(ie, F)), f(F);
        });
        return;
      }
      if (a && J) {
        a(() => {
          T && (S?.resolve(), T.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: he.currentLocation,
            nextLocation: he.nextLocation
          });
        });
        let ie = t.window.document.startViewTransition(() => {
          a(() => f(F));
        });
        ie.finished.finally(() => {
          a(() => {
            j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => R(ie));
        return;
      }
      T ? (S?.resolve(), T.skipTransition(), D({
        state: F,
        currentLocation: he.currentLocation,
        nextLocation: he.nextLocation
      })) : (b(F), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: he.currentLocation,
        nextLocation: he.nextLocation
      }));
    },
    [
      t.window,
      a,
      T,
      S,
      i,
      y,
      s
    ]
  );
  g.useLayoutEffect(() => t.subscribe(C), [t, C]);
  let V = p.initialized;
  g.useLayoutEffect(() => {
    !V && t.state.initialized && C(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [V, C, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new bC());
  }, [v]), g.useEffect(() => {
    if (S && m && t.window) {
      let F = m, k = S.promise, I = t.window.document.startViewTransition(async () => {
        i === !1 ? f(F) : g.startTransition(() => {
          i === !0 && y((J) => qy(J, F)), f(F);
        }), await k;
      });
      I.finished.finally(() => {
        j(void 0), R(void 0), b(void 0), w({ isTransitioning: !1 });
      }), R(I);
    }
  }, [
    m,
    S,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    S && m && p.location.key === m.location.key && S.resolve();
  }, [S, T, p.location, m]), g.useEffect(() => {
    !v.isTransitioning && N && (b(N.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), D(void 0));
  }, [v.isTransitioning, N]);
  let Q = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (F) => t.navigate(F),
    push: (F, k, I) => t.navigate(F, {
      state: k,
      preventScrollReset: I?.preventScrollReset
    }),
    replace: (F, k, I) => t.navigate(F, {
      replace: !0,
      state: k,
      preventScrollReset: I?.preventScrollReset
    })
  }), [t]), te = t.basename || "/", M = g.useMemo(
    () => ({
      router: t,
      navigator: Q,
      static: !1,
      basename: te,
      onError: s
    }),
    [t, Q, te, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(es.Provider, { value: M }, /* @__PURE__ */ g.createElement(wl.Provider, { value: p }, /* @__PURE__ */ g.createElement(n1.Provider, { value: O.current }, /* @__PURE__ */ g.createElement(Bh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    jC,
    {
      basename: te,
      location: p.location,
      navigationType: p.historyAction,
      navigator: Q,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      SC,
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
var SC = g.memo(wC);
function wC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return nC(t, void 0, { state: s, isStatic: i, onError: o });
}
function jC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  tt(
    !jl(),
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
  } = s, T = g.useMemo(() => {
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
  return Kt(
    T != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Uc.Provider, { children: a, value: T }));
}
var dc = "get", fc = "application/x-www-form-urlencoded";
function Vc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function EC(t) {
  return Vc(t) && t.tagName.toLowerCase() === "button";
}
function NC(t) {
  return Vc(t) && t.tagName.toLowerCase() === "form";
}
function CC(t) {
  return Vc(t) && t.tagName.toLowerCase() === "input";
}
function TC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function RC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !TC(t);
}
var Fo = null;
function _C() {
  if (Fo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Fo = !1;
    } catch {
      Fo = !0;
    }
  return Fo;
}
var MC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function mf(t) {
  return t != null && !MC.has(t) ? (Kt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${fc}"`
  ), null) : t;
}
function AC(t, a) {
  let s, i, o, u, f;
  if (NC(t)) {
    let p = t.getAttribute("action");
    i = p ? aa(p, a) : null, s = t.getAttribute("method") || dc, o = mf(t.getAttribute("enctype")) || fc, u = new FormData(t);
  } else if (EC(t) || CC(t) && (t.type === "submit" || t.type === "image")) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || p.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || p.getAttribute("method") || dc, o = mf(t.getAttribute("formenctype")) || mf(p.getAttribute("enctype")) || fc, u = new FormData(p, t), !_C()) {
      let { name: m, type: b, value: v } = t;
      if (b === "image") {
        let w = m ? `${m}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else m && u.append(m, v);
    }
  } else {
    if (Vc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = dc, i = null, o = fc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Hh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function c1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${xc(a)}/_root.${i}` : o.pathname = `${xc(o.pathname)}.${i}`, o;
}
async function DC(t, a) {
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
function kC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function zC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await DC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return UC(
    i.flat(1).filter(kC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
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
function OC(t, a, { includeHydrateFallback: s } = {}) {
  return LC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function LC(t) {
  return [...new Set(t)];
}
function $C(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function UC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify($C(o));
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
function BC() {
  let t = g.useContext(wl);
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
function VC(t, a) {
  let s = g.useContext(Fh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: p, onBlur: y, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let T = (N) => {
        N.forEach((D) => {
          f(D.isIntersecting);
        });
      }, R = new IntersectionObserver(T, { threshold: 0.5 });
      return w.current && R.observe(w.current), () => {
        R.disconnect();
      };
    }
  }, [t]), g.useEffect(() => {
    if (i) {
      let T = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(T);
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
      onFocus: Ji(p, S),
      onBlur: Ji(y, j),
      onMouseEnter: Ji(m, S),
      onMouseLeave: Ji(b, j),
      onTouchStart: Ji(v, S)
    }
  ] : [!1, w, {}];
}
function Ji(t, a) {
  return (s) => {
    t && t(s), s.defaultPrevented || a(s);
  };
}
function IC({ page: t, ...a }) {
  let s = t1(), { router: i } = qh(), o = g.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement(qC, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(FC, { page: t, matches: o, ...a }) : null;
}
function HC(t) {
  let { manifest: a, routeModules: s } = Yh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return zC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function qC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o } = Yh(), { basename: u } = qh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let p = c1(
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
function FC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o, manifest: u, routeModules: f } = Yh(), { basename: p } = qh(), { loaderData: y, matches: m } = BC(), b = g.useMemo(
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
    let T = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((D) => {
      let O = u.routes[D.route.id];
      !O || !O.hasLoader || (!b.some((C) => C.route.id === D.route.id) && D.route.id in y && f[D.route.id]?.shouldRevalidate || O.hasClientLoader ? R = !0 : T.add(D.route.id));
    }), T.size === 0)
      return [];
    let N = c1(
      t,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && T.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((D) => T.has(D.route.id)).map((D) => D.route.id).join(",")
    ), [N.pathname + N.search];
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
    () => OC(v, u),
    [v, u]
  ), j = HC(v);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, w.map((T) => /* @__PURE__ */ g.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...s })), S.map((T) => /* @__PURE__ */ g.createElement("link", { key: T, rel: "modulepreload", href: T, ...s })), j.map(({ key: T, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ g.createElement(
      "link",
      {
        key: T,
        nonce: s.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function YC(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var GC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  GC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var u1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Gh = g.forwardRef(
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
  }, T) {
    let { basename: R, navigator: N, unstable_useTransitions: D } = g.useContext(ra), O = typeof b == "string" && u1.test(b), C = Vx(b, R);
    b = C.to;
    let V = eC(b, { relative: o }), Q = qa(), te = null;
    if (p) {
      let ie = Lc(
        p,
        [],
        Q.unstable_mask ? Q.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (ie.pathname = ie.pathname === "/" ? R : ea([R, ie.pathname])), te = N.createHref(ie);
    }
    let [M, F, k] = VC(
      i,
      j
    ), I = QC(b, {
      replace: f,
      unstable_mask: p,
      state: y,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: D
    });
    function J(ie) {
      a && a(ie), ie.defaultPrevented || I(ie);
    }
    let he = !(C.isExternal || u), K = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...k,
          href: (he ? te : void 0) || C.absoluteURL || V,
          onClick: he ? J : a,
          ref: YC(T, F),
          target: m,
          "data-discover": !O && s === "render" ? "true" : void 0
        }
      )
    );
    return M && !O ? /* @__PURE__ */ g.createElement(g.Fragment, null, K, /* @__PURE__ */ g.createElement(IC, { page: V })) : K;
  }
);
Gh.displayName = "Link";
var PC = g.forwardRef(
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
    let v = El(f, { relative: m.relative }), w = qa(), S = g.useContext(wl), { navigator: j, basename: T } = g.useContext(ra), R = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tT(v) && p === !0, N = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, D = w.pathname, O = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (D = D.toLowerCase(), O = O ? O.toLowerCase() : null, N = N.toLowerCase()), O && T && (O = aa(O, T) || O);
    const C = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let V = D === N || !o && D.startsWith(N) && D.charAt(C) === "/", Q = O != null && (O === N || !o && O.startsWith(N) && O.charAt(N.length) === "/"), te = {
      isActive: V,
      isPending: Q,
      isTransitioning: R
    }, M = V ? a : void 0, F;
    typeof i == "function" ? F = i(te) : F = [
      i,
      V ? "active" : null,
      Q ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let k = typeof u == "function" ? u(te) : u;
    return /* @__PURE__ */ g.createElement(
      Gh,
      {
        ...m,
        "aria-current": M,
        className: F,
        ref: b,
        style: k,
        to: f,
        viewTransition: p
      },
      typeof y == "function" ? y(te) : y
    );
  }
);
PC.displayName = "NavLink";
var KC = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = dc,
    action: p,
    onSubmit: y,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: T } = g.useContext(ra), R = WC(), N = eT(p, { relative: m }), D = f.toLowerCase() === "get" ? "get" : "post", O = typeof p == "string" && u1.test(p), C = (V) => {
      if (y && y(V), V.defaultPrevented) return;
      V.preventDefault();
      let Q = V.nativeEvent.submitter, te = Q?.getAttribute("formmethod") || f, M = () => R(Q || V.currentTarget, {
        fetcherKey: a,
        method: te,
        navigate: s,
        replace: o,
        state: u,
        relative: m,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      T && s !== !1 ? g.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: D,
        action: N,
        onSubmit: i ? y : C,
        ...S,
        "data-discover": !O && t === "render" ? "true" : void 0
      }
    );
  }
);
KC.displayName = "Form";
function XC(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function d1(t) {
  let a = g.useContext(es);
  return tt(a, XC(t)), a;
}
function QC(t, {
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
  let b = ei(), v = qa(), w = El(t, { relative: f });
  return g.useCallback(
    (S) => {
      if (RC(S, a)) {
        S.preventDefault();
        let j = s !== void 0 ? s : xa(v) === xa(w), T = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: p,
          unstable_defaultShouldRevalidate: y
        });
        m ? g.startTransition(() => T()) : T();
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
var ZC = 0, JC = () => `__${String(++ZC)}__`;
function WC() {
  let { router: t } = d1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = uC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: p, method: y, encType: m, formData: b, body: v } = AC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || JC();
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
function eT(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(Ha);
  tt(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...El(t || ".", { relative: a }) }, f = qa();
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
function tT(t, { relative: a } = {}) {
  let s = g.useContext(Bh);
  tt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = d1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = El(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return bc(o.pathname, f) != null || bc(o.pathname, u) != null;
}
class ti extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const Sa = "/api/v1/extensions/nexus.audio.emotiontts";
async function Et(t, a) {
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
    throw new ti(
      i.status,
      o?.category ?? "unknown",
      o?.message ?? i.statusText,
      o?.requestId
    );
  }
  if (i.status !== 204)
    return await i.json();
}
function nT(t, a, s) {
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
async function aT() {
  return Et("/deployments");
}
async function Yy(t) {
  return Et(`/deployments/${t}`);
}
async function rT(t, a) {
  return Et(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Gy(t) {
  return Et(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Ph(t, a) {
  return Et("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function dl(t, a, s) {
  return Et(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function f1(t, a) {
  await Et(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function sT(t) {
  return Et(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function iT(t, a, s = "error") {
  return Et("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function lT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return Et(`/deployments/${t}/runs${o}`);
}
async function oT(t, a) {
  return Et(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Kh(t, a) {
  return Et(`/deployments/${t}/runs/${a}`);
}
async function cT(t, a) {
  return Et(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function h1(t, a) {
  return Et(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function uT(t, a) {
  return Et(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Py(t, a, s, i) {
  return nT(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i
  );
}
async function Xs(t) {
  return Et(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function Sc(t, a, s, i, o) {
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
async function dT(t, a) {
  await Et(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function fT(t, a, s) {
  return Et(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function hT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${Sa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function mT(t) {
  return Et(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var pT = "mux0i60", gT = "mux0i61", vT = "mux0i62", yT = "mux0i63";
function Ic({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: pT, children: [
    /* @__PURE__ */ c.jsx("span", { className: gT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: vT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: yT, children: s }) : null
  ] });
}
var bT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, xT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, ST = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, wT = "zwn3019";
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
  const y = [bT[t], ST[a], xT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...p, children: o });
}
function jT({ children: t, className: a }) {
  const s = [wT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Xr = "vrkn5p0", ET = "_93p6291", NT = "_93p6292", CT = "_93p6293", TT = "_93p6294", RT = "_93p6295", _T = "_93p6296", MT = "_93p6297", AT = "_93p6298", DT = "_93p6299", kT = "_93p629a", zT = "_93p629b", OT = "_93p629c", LT = "_93p629d", $T = "_93p629e";
const UT = "nexus-host-navigate";
function BT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function VT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(UT, {
      detail: s
    })
  );
}
function IT() {
  const { deployments: t } = Nl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: ET, children: [
    /* @__PURE__ */ c.jsxs("header", { className: NT, children: [
      /* @__PURE__ */ c.jsx("p", { className: CT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: TT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: RT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: _T, children: [
        /* @__PURE__ */ c.jsx("span", { className: MT, children: t.length }),
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
        className: AT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Ic,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: DT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: BT(s.deploymentId),
              onClick: (i) => VT(i, s.deploymentId),
              className: kT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: zT, "aria-hidden": "true", children: HT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: OT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: LT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: $T, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function HT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Xh = kx();
const qT = /* @__PURE__ */ Dx(Xh);
function FT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const YT = (t) => {
  switch (t) {
    case "success":
      return KT;
    case "info":
      return QT;
    case "warning":
      return XT;
    case "error":
      return ZT;
    default:
      return null;
  }
}, GT = Array(12).fill(0), PT = ({ visible: t, className: a }) => /* @__PURE__ */ xe.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-spinner"
}, GT.map((s, i) => /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), KT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), XT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), QT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), ZT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), JT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ xe.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ xe.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), WT = () => {
  const [t, a] = xe.useState(document.hidden);
  return xe.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ah = 1;
class eR {
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
        ], xe.isValidElement(m))
          u = !1, this.create({
            id: i,
            type: "default",
            message: m
          });
        else if (nR(m) && !m.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${m.status}`) : s.error, w = typeof s.description == "function" ? await s.description(`HTTP error! status: ${m.status}`) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
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
          const v = typeof s.error == "function" ? await s.error(m) : s.error, w = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
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
          const v = typeof s.success == "function" ? await s.success(m) : s.success, w = typeof s.description == "function" ? await s.description(m) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
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
          const b = typeof s.error == "function" ? await s.error(m) : s.error, v = typeof s.description == "function" ? await s.description(m) : s.description, S = typeof b == "object" && !xe.isValidElement(b) ? b : {
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
const An = new eR(), tR = (t, a) => {
  const s = a?.id || ah++;
  return An.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, nR = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", aR = tR, rR = () => An.toasts, sR = () => An.getActiveToasts(), pn = Object.assign(aR, {
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
  getHistory: rR,
  getToasts: sR
});
FT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Yo(t) {
  return t.label !== void 0;
}
const iR = 3, lR = "24px", oR = "16px", Ky = 4e3, cR = 356, uR = 14, dR = 45, fR = 200;
function ba(...t) {
  return t.filter(Boolean).join(" ");
}
function hR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const mR = (t) => {
  var a, s, i, o, u, f, p, y, m;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: T, heights: R, index: N, toasts: D, expanded: O, removeToast: C, defaultRichColors: V, closeButton: Q, style: te, cancelButtonStyle: M, actionButtonStyle: F, className: k = "", descriptionClassName: I = "", duration: J, position: he, gap: K, expandByDefault: ie, classNames: A, icons: Y, closeButtonAriaLabel: $ = "Close toast" } = t, [q, oe] = xe.useState(null), [_, ae] = xe.useState(null), [re, G] = xe.useState(!1), [U, W] = xe.useState(!1), [ue, ve] = xe.useState(!1), [Ce, Ge] = xe.useState(!1), [Ee, Ze] = xe.useState(!1), [Ie, Pe] = xe.useState(0), [cn, Ct] = xe.useState(0), Tt = xe.useRef(v.duration || J || Ky), Vt = xe.useRef(null), kt = xe.useRef(null), sn = N === 0, Xt = N + 1 <= T, Rt = v.type, $t = v.dismissible !== !1, _t = v.className || "", we = v.descriptionClassName || "", Le = xe.useMemo(() => R.findIndex((Me) => Me.toastId === v.id) || 0, [
    R,
    v.id
  ]), Xe = xe.useMemo(() => {
    var Me;
    return (Me = v.closeButton) != null ? Me : Q;
  }, [
    v.closeButton,
    Q
  ]), ot = xe.useMemo(() => v.duration || J || Ky, [
    v.duration,
    J
  ]), Ut = xe.useRef(0), zt = xe.useRef(0), qn = xe.useRef(0), un = xe.useRef(null), [gn, vt] = he.split("-"), mt = xe.useMemo(() => R.reduce((Me, Ve, Fe) => Fe >= Le ? Me : Me + Ve.height, 0), [
    R,
    Le
  ]), ce = WT(), Ue = v.invert || b, ze = Rt === "loading";
  zt.current = xe.useMemo(() => Le * K + mt, [
    Le,
    mt
  ]), xe.useEffect(() => {
    Tt.current = ot;
  }, [
    ot
  ]), xe.useEffect(() => {
    G(!0);
  }, []), xe.useEffect(() => {
    const Me = kt.current;
    if (Me) {
      const Ve = Me.getBoundingClientRect().height;
      return Ct(Ve), j((Fe) => [
        {
          toastId: v.id,
          height: Ve,
          position: v.position
        },
        ...Fe
      ]), () => j((Fe) => Fe.filter((It) => It.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), xe.useLayoutEffect(() => {
    if (!re) return;
    const Me = kt.current, Ve = Me.style.height;
    Me.style.height = "auto";
    const Fe = Me.getBoundingClientRect().height;
    Me.style.height = Ve, Ct(Fe), j((It) => It.find((ct) => ct.toastId === v.id) ? It.map((ct) => ct.toastId === v.id ? {
      ...ct,
      height: Fe
    } : ct) : [
      {
        toastId: v.id,
        height: Fe,
        position: v.position
      },
      ...It
    ]);
  }, [
    re,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const H = xe.useCallback(() => {
    W(!0), Pe(zt.current), j((Me) => Me.filter((Ve) => Ve.toastId !== v.id)), setTimeout(() => {
      C(v);
    }, fR);
  }, [
    v,
    C,
    j,
    zt
  ]);
  xe.useEffect(() => {
    if (v.promise && Rt === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Me;
    return O || S || ce ? (() => {
      if (qn.current < Ut.current) {
        const It = (/* @__PURE__ */ new Date()).getTime() - Ut.current;
        Tt.current = Tt.current - It;
      }
      qn.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Tt.current !== 1 / 0 && (Ut.current = (/* @__PURE__ */ new Date()).getTime(), Me = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), H();
      }, Tt.current));
    })(), () => clearTimeout(Me);
  }, [
    O,
    S,
    v,
    Rt,
    ce,
    H
  ]), xe.useEffect(() => {
    v.delete && (H(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    H,
    v.delete
  ]);
  function pe() {
    var Me;
    if (Y?.loading) {
      var Ve;
      return /* @__PURE__ */ xe.createElement("div", {
        className: ba(A?.loader, v == null || (Ve = v.classNames) == null ? void 0 : Ve.loader, "sonner-loader"),
        "data-visible": Rt === "loading"
      }, Y.loading);
    }
    return /* @__PURE__ */ xe.createElement(PT, {
      className: ba(A?.loader, v == null || (Me = v.classNames) == null ? void 0 : Me.loader),
      visible: Rt === "loading"
    });
  }
  const ye = v.icon || Y?.[Rt] || YT(Rt);
  var qe, Je;
  return /* @__PURE__ */ xe.createElement("li", {
    tabIndex: 0,
    ref: kt,
    className: ba(k, _t, A?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, A?.default, A?.[Rt], v == null || (s = v.classNames) == null ? void 0 : s[Rt]),
    "data-sonner-toast": "",
    "data-rich-colors": (qe = v.richColors) != null ? qe : V,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": re,
    "data-promise": !!v.promise,
    "data-swiped": Ee,
    "data-removed": U,
    "data-visible": Xt,
    "data-y-position": gn,
    "data-x-position": vt,
    "data-index": N,
    "data-front": sn,
    "data-swiping": ue,
    "data-dismissible": $t,
    "data-type": Rt,
    "data-invert": Ue,
    "data-swipe-out": Ce,
    "data-swipe-direction": _,
    "data-expanded": !!(O || ie && re),
    "data-testid": v.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": D.length - N,
      "--offset": `${U ? Ie : zt.current}px`,
      "--initial-height": ie ? "auto" : `${cn}px`,
      ...te,
      ...v.style
    },
    onDragEnd: () => {
      ve(!1), oe(null), un.current = null;
    },
    onPointerDown: (Me) => {
      Me.button !== 2 && (ze || !$t || (Vt.current = /* @__PURE__ */ new Date(), Pe(zt.current), Me.target.setPointerCapture(Me.pointerId), Me.target.tagName !== "BUTTON" && (ve(!0), un.current = {
        x: Me.clientX,
        y: Me.clientY
      })));
    },
    onPointerUp: () => {
      var Me, Ve, Fe;
      if (Ce || !$t) return;
      un.current = null;
      const It = Number(((Me = kt.current) == null ? void 0 : Me.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((Ve = kt.current) == null ? void 0 : Ve.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), ct = (/* @__PURE__ */ new Date()).getTime() - ((Fe = Vt.current) == null ? void 0 : Fe.getTime()), Ft = q === "x" ? It : wn, sa = Math.abs(Ft) / ct;
      if (Math.abs(Ft) >= dR || sa > 0.11) {
        Pe(zt.current), v.onDismiss == null || v.onDismiss.call(v, v), ae(q === "x" ? It > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), H(), Ge(!0);
        return;
      } else {
        var vn, z;
        (vn = kt.current) == null || vn.style.setProperty("--swipe-amount-x", "0px"), (z = kt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      Ze(!1), ve(!1), oe(null);
    },
    onPointerMove: (Me) => {
      var Ve, Fe, It;
      if (!un.current || !$t || ((Ve = window.getSelection()) == null ? void 0 : Ve.toString().length) > 0) return;
      const ct = Me.clientY - un.current.y, Ft = Me.clientX - un.current.x;
      var sa;
      const vn = (sa = t.swipeDirections) != null ? sa : hR(he);
      !q && (Math.abs(Ft) > 1 || Math.abs(ct) > 1) && oe(Math.abs(Ft) > Math.abs(ct) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const P = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (q === "y") {
        if (vn.includes("top") || vn.includes("bottom"))
          if (vn.includes("top") && ct < 0 || vn.includes("bottom") && ct > 0)
            z.y = ct;
          else {
            const Z = ct * P(ct);
            z.y = Math.abs(Z) < Math.abs(ct) ? Z : ct;
          }
      } else if (q === "x" && (vn.includes("left") || vn.includes("right")))
        if (vn.includes("left") && Ft < 0 || vn.includes("right") && Ft > 0)
          z.x = Ft;
        else {
          const Z = Ft * P(Ft);
          z.x = Math.abs(Z) < Math.abs(Ft) ? Z : Ft;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && Ze(!0), (Fe = kt.current) == null || Fe.style.setProperty("--swipe-amount-x", `${z.x}px`), (It = kt.current) == null || It.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Xe && !v.jsx && Rt !== "loading" ? /* @__PURE__ */ xe.createElement("button", {
    "aria-label": $,
    "data-disabled": ze,
    "data-close-button": !0,
    onClick: ze || !$t ? () => {
    } : () => {
      H(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ba(A?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (Je = Y?.close) != null ? Je : JT) : null, (Rt || v.icon || v.promise) && v.icon !== null && (Y?.[Rt] !== null || v.icon) ? /* @__PURE__ */ xe.createElement("div", {
    "data-icon": "",
    className: ba(A?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || pe() : null, v.type !== "loading" ? ye : null) : null, /* @__PURE__ */ xe.createElement("div", {
    "data-content": "",
    className: ba(A?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ xe.createElement("div", {
    "data-title": "",
    className: ba(A?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ xe.createElement("div", {
    "data-description": "",
    className: ba(I, we, A?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ xe.isValidElement(v.cancel) ? v.cancel : v.cancel && Yo(v.cancel) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (Me) => {
      Yo(v.cancel) && $t && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Me), H());
    },
    className: ba(A?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ xe.isValidElement(v.action) ? v.action : v.action && Yo(v.action) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || F,
    onClick: (Me) => {
      Yo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Me), !Me.defaultPrevented && H());
    },
    className: ba(A?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function Xy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function pR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", p = u ? oR : lR;
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
const gR = /* @__PURE__ */ xe.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: y, className: m, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: T, visibleToasts: R = iR, toastOptions: N, dir: D = Xy(), gap: O = uR, icons: C, containerAriaLabel: V = "Notifications" } = a, [Q, te] = xe.useState([]), M = xe.useMemo(() => i ? Q.filter((re) => re.toasterId === i) : Q.filter((re) => !re.toasterId), [
    Q,
    i
  ]), F = xe.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((re) => re.position).map((re) => re.position)))), [
    M,
    u
  ]), [k, I] = xe.useState([]), [J, he] = xe.useState(!1), [K, ie] = xe.useState(!1), [A, Y] = xe.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), $ = xe.useRef(null), q = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), oe = xe.useRef(null), _ = xe.useRef(!1), ae = xe.useCallback((re) => {
    te((G) => {
      var U;
      return (U = G.find((W) => W.id === re.id)) != null && U.delete || An.dismiss(re.id), G.filter(({ id: W }) => W !== re.id);
    });
  }, []);
  return xe.useEffect(() => An.subscribe((re) => {
    if (re.dismiss) {
      requestAnimationFrame(() => {
        te((G) => G.map((U) => U.id === re.id ? {
          ...U,
          delete: !0
        } : U));
      });
      return;
    }
    setTimeout(() => {
      qT.flushSync(() => {
        te((G) => {
          const U = G.findIndex((W) => W.id === re.id);
          return U !== -1 ? [
            ...G.slice(0, U),
            {
              ...G[U],
              ...re
            },
            ...G.slice(U + 1)
          ] : [
            re,
            ...G
          ];
        });
      });
    });
  }), [
    Q
  ]), xe.useEffect(() => {
    if (w !== "system") {
      Y(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? Y("dark") : Y("light")), typeof window > "u") return;
    const re = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      re.addEventListener("change", ({ matches: G }) => {
        Y(G ? "dark" : "light");
      });
    } catch {
      re.addListener(({ matches: U }) => {
        try {
          Y(U ? "dark" : "light");
        } catch (W) {
          console.error(W);
        }
      });
    }
  }, [
    w
  ]), xe.useEffect(() => {
    Q.length <= 1 && he(!1);
  }, [
    Q
  ]), xe.useEffect(() => {
    const re = (G) => {
      var U;
      if (f.every((ve) => G[ve] || G.code === ve)) {
        var ue;
        he(!0), (ue = $.current) == null || ue.focus();
      }
      G.code === "Escape" && (document.activeElement === $.current || (U = $.current) != null && U.contains(document.activeElement)) && he(!1);
    };
    return document.addEventListener("keydown", re), () => document.removeEventListener("keydown", re);
  }, [
    f
  ]), xe.useEffect(() => {
    if ($.current)
      return () => {
        oe.current && (oe.current.focus({
          preventScroll: !0
        }), oe.current = null, _.current = !1);
      };
  }, [
    $.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ xe.createElement("section", {
    ref: s,
    "aria-label": `${V} ${q}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, F.map((re, G) => {
    var U;
    const [W, ue] = re.split("-");
    return M.length ? /* @__PURE__ */ xe.createElement("ol", {
      key: re,
      dir: D === "auto" ? Xy() : D,
      tabIndex: -1,
      ref: $,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": A,
      "data-y-position": W,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((U = k[0]) == null ? void 0 : U.height) || 0}px`,
        "--width": `${cR}px`,
        "--gap": `${O}px`,
        ...T,
        ...pR(b, v)
      },
      onBlur: (ve) => {
        _.current && !ve.currentTarget.contains(ve.relatedTarget) && (_.current = !1, oe.current && (oe.current.focus({
          preventScroll: !0
        }), oe.current = null));
      },
      onFocus: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || _.current || (_.current = !0, oe.current = ve.relatedTarget);
      },
      onMouseEnter: () => he(!0),
      onMouseMove: () => he(!0),
      onMouseLeave: () => {
        K || he(!1);
      },
      onDragEnd: () => he(!1),
      onPointerDown: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || ie(!0);
      },
      onPointerUp: () => ie(!1)
    }, M.filter((ve) => !ve.position && G === 0 || ve.position === re).map((ve, Ce) => {
      var Ge, Ee;
      return /* @__PURE__ */ xe.createElement(mR, {
        key: ve.id,
        icons: C,
        index: Ce,
        toast: ve,
        defaultRichColors: S,
        duration: (Ge = N?.duration) != null ? Ge : j,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Ee = N?.closeButton) != null ? Ee : y,
        interacting: K,
        position: re,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: ae,
        toasts: M.filter((Ze) => Ze.position == ve.position),
        heights: k.filter((Ze) => Ze.position == ve.position),
        setHeights: I,
        expandByDefault: p,
        gap: O,
        expanded: J,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Qy = 32, Zy = -30, Jy = -6, Wy = 0.5, e0 = 2, t0 = -24, n0 = 24, a0 = -12, r0 = 12, s0 = -12, i0 = 12, l0 = -60, o0 = -20;
class Qs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function m1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${Sa}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const p = await f.json().catch(() => null), y = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qs(y, m);
  }
  if (!f.ok)
    throw new Error(await Hc(f, "apply"));
  return await f.json();
}
async function vR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${Sa}${u}`, p = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const y = await p.json().catch(() => null), m = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qs(m, b);
  }
  if (!p.ok)
    throw new Error(await Hc(p, "apply"));
  return await p.json();
}
async function yR(t, a, s = {}) {
  const i = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function bR(t, a, s, i = {}) {
  const o = `${Sa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Hc(u, "preview"));
  return u.blob();
}
async function hc(t, a, s, i = 50, o = {}) {
  const u = `${Sa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Hc(f, "audit fetch"));
  return await f.json();
}
function kn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function p1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Qy)
    return {
      message: `Chain exceeds the maximum of ${Qy} operations.`
    };
  for (const s of t.ops) {
    const i = xR(s, a);
    if (i) return i;
  }
  return null;
}
function xR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return SR(t.id, t.start_ms, t.end_ms, a);
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
function SR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Hc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var wR = "g5r6d10", jR = "g5r6d11", ER = "g5r6d12", NR = "g5r6d13", CR = "g5r6d14", TR = "g5r6d15", RR = "g5r6d1a", _R = "g5r6d1b", MR = "g5r6d1c", AR = "g5r6d1d", DR = "g5r6d1e", kR = "g5r6d1g", zR = "g5r6d1h", OR = "g5r6d1i", LR = "g5r6d1j", $R = "g5r6d1k", UR = "g5r6d1l", BR = "g5r6d1m", VR = "g5r6d1n", IR = "g5r6d1o", c0 = "g5r6d1p", HR = "g5r6d1q", qR = "g5r6d1r", FR = "g5r6d1s", YR = "g5r6d1t", GR = "g5r6d1u", u0 = "g5r6d1v", d0 = "g5r6d1w", PR = "g5r6d1x", KR = "g5r6d1y", Ys = "g5r6d1z", XR = "g5r6d110", f0 = "g5r6d111", QR = "g5r6d112", ZR = "g5r6d113", mr = "g5r6d114", JR = "g5r6d119", WR = "a6ki8u0", e_ = "a6ki8u1", t_ = "a6ki8u2", n_ = "a6ki8u3", a_ = "a6ki8u4", r_ = "a6ki8u5", s_ = "a6ki8u6", pf = "a6ki8u7", i_ = "a6ki8u8", l_ = "a6ki8u9", o_ = "a6ki8ua", c_ = "a6ki8ub", u_ = "a6ki8uc", d_ = "a6ki8ud", f_ = "a6ki8ue", h_ = "a6ki8uf", m_ = "a6ki8ug", p_ = "a6ki8uh", g_ = "_1lguv7x0", v_ = "_1lguv7x1", y_ = "_1lguv7x2", b_ = "_1lguv7x3", x_ = "_1lguv7x4", S_ = "_1lguv7x5", w_ = "_1lguv7x6", j_ = "_1lguv7x7", E_ = "_1lguv7x8", N_ = "_1lguv7x9", C_ = "_1lguv7xa", T_ = "_1lguv7xb", R_ = "_1lguv7xc", h0 = "_1lguv7xd", __ = "_1lguv7xe", M_ = "_1lguv7xf", A_ = "_1lguv7xg", D_ = "_1lguv7xh", g1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, v1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, k_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, z_ = "_4ydn54f";
function Qe({
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
    g1[t],
    v1[a],
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
  const [b, v] = g.useState(!1), [w, S] = g.useState(t.displayName), j = g.useRef(null), T = g.useMemo(() => L_(t.contentSha256), [t.contentSha256]), R = g.useMemo(() => $_(T, O_), [T]), N = g.useMemo(() => hT(t), [t]);
  g.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const C = j.current;
    C && (i && N ? C.play().catch(() => {
    }) : (C.pause(), C.currentTime = 0));
  }, [i, N]);
  const D = async () => {
    const C = w.trim();
    if (!C || C === t.displayName) {
      v(!1), S(t.displayName);
      return;
    }
    try {
      await u(C);
    } finally {
      v(!1);
    }
  }, O = `${U_(t.durationMs)} · ${B_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: g_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: v_, children: [
      /* @__PURE__ */ c.jsx("span", { className: y_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: b_, children: [
        b ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: S_,
            value: w,
            autoFocus: !0,
            onChange: (C) => S(C.target.value),
            onBlur: () => {
              D();
            },
            onKeyDown: (C) => {
              C.key === "Enter" ? (C.preventDefault(), C.currentTarget.blur()) : C.key === "Escape" && (v(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: x_,
            onDoubleClick: () => v(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: w_, children: O })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: j_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: E_,
        "data-playing": i ? "true" : "false",
        disabled: N == null,
        title: N ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: N_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: C_, "aria-hidden": "true", children: R.map((C, V) => /* @__PURE__ */ c.jsx("span", { className: T_, style: { height: `${Math.round(C * 100)}%` } }, V)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: R_, children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: h0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((C) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: __,
            style: { color: C.color, borderColor: C.color },
            children: C.characterName
          },
          C.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: h0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: M_, children: [
        y && /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Create character from this voice",
            "aria-label": "Create character from this voice",
            onClick: y,
            children: "＋"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Qe,
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
          Qe,
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
          Qe,
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
    ] }),
    N && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: j,
        src: N,
        preload: "none",
        className: D_,
        onEnded: m
      }
    )
  ] });
}
var I_ = "_17eol302", H_ = "_17eol303", q_ = "_17eol304", F_ = "_17eol305", Y_ = "_17eol306", G_ = "_17eol307", Go = "_17eol308", P_ = "_17eol309", K_ = "_17eol30a", X_ = "_17eol30b", Q_ = "_17eol30c", Z_ = "_17eol30d", m0 = "_17eol30e", J_ = "_17eol30g";
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
  const [o, u] = g.useState("idle"), [f, p] = g.useState(null), [y, m] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, T] = g.useState(!1), R = g.useRef(null), N = g.useRef(null), D = g.useRef([]), O = g.useRef(0), C = g.useRef(null), V = g.useRef(null), Q = g.useRef({ mime: "audio/webm", ext: "webm" }), te = g.useRef(null), M = g.useRef(null), F = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return F.current = document.activeElement ?? null, requestAnimationFrame(() => {
        te.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        F.current?.focus?.();
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
      const $ = te.current;
      if (!$) return;
      const q = $.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (q.length === 0) return;
      const oe = q[0], _ = q[q.length - 1], ae = document.activeElement;
      Y.shiftKey ? (ae === oe || ae === $) && (Y.preventDefault(), _.focus()) : ae === _ && (Y.preventDefault(), oe.focus());
    },
    []
  ), I = g.useCallback(() => {
    if (N.current) {
      for (const Y of N.current.getTracks()) Y.stop();
      N.current = null;
    }
    C.current != null && (window.clearInterval(C.current), C.current = null);
  }, []), J = g.useCallback(() => {
    I(), b && URL.revokeObjectURL(b), v(null), D.current = [], V.current = null, m(0), p(null), u("idle");
  }, [b, I]);
  if (g.useEffect(() => {
    t || (J(), S(a));
  }, [t, a, J]), g.useEffect(() => () => {
    I(), b && URL.revokeObjectURL(b);
  }, [b, I]), !t) return null;
  const he = async () => {
    p(null), u("preparing");
    try {
      const Y = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      N.current = Y;
      const $ = W_();
      Q.current = $;
      const q = $.mime ? new MediaRecorder(Y, { mimeType: $.mime }) : new MediaRecorder(Y);
      R.current = q, D.current = [], q.ondataavailable = (oe) => {
        oe.data && oe.data.size > 0 && D.current.push(oe.data);
      }, q.onstop = () => {
        const oe = $.mime || "audio/webm", _ = new Blob(D.current, { type: oe }), ae = new File([_], `${w || a || "recording"}.${$.ext}`, {
          type: oe
        });
        V.current = ae;
        const re = URL.createObjectURL(_);
        v(re), u("ready"), I();
      }, q.start(), O.current = Date.now(), m(0), C.current = window.setInterval(() => {
        m(Date.now() - O.current);
      }, 200), u("recording");
    } catch (Y) {
      const $ = Y instanceof Error ? Y.message : "could not access microphone";
      p($), u($.toLowerCase().includes("denied") ? "denied" : "error"), I();
    }
  }, K = () => {
    const Y = R.current;
    Y && Y.state !== "inactive" && Y.stop(), C.current != null && (window.clearInterval(C.current), C.current = null);
  }, ie = async () => {
    const Y = V.current;
    if (!Y) return;
    const $ = (w || a).trim();
    if (!$) {
      p("Name cannot be empty");
      return;
    }
    T(!0);
    try {
      await i(Y, $), s();
    } catch (q) {
      p(q instanceof Error ? q.message : "upload failed");
    } finally {
      T(!1);
    }
  }, A = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: I_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: te,
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
              ref: M,
              type: "button",
              className: Go,
              "data-tone": "danger",
              onClick: () => {
                he();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: m0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Go, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Go,
              "data-tone": "danger",
              "data-active": "true",
              onClick: K,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: m0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Go,
              onClick: () => {
                J();
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
          /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Qe,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                ie();
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
  const [f, p] = g.useState(""), [y, m] = g.useState("all"), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, T] = g.useState(!1), [R, N] = g.useState(!1), D = g.useRef(null), O = g.useCallback(
    (K) => "upload",
    []
  ), C = g.useMemo(() => {
    const K = f.trim().toLowerCase();
    return a.filter((ie) => {
      const A = O(ie);
      return !(y === "uploaded" && A !== "upload" || y === "preset" && A !== "preset" || K && !ie.displayName.toLowerCase().includes(K));
    });
  }, [a, f, y, O]), V = g.useMemo(
    () => a.filter((K) => O(K) === "upload").length,
    [a, O]
  ), Q = g.useCallback(
    (K) => {
      const ie = [], A = /* @__PURE__ */ new Set();
      for (const Y of s)
        Y.speakerVoiceAssetId === K && (A.has(Y.characterName) || (A.add(Y.characterName), ie.push({
          characterName: Y.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[Y.characterName] ?? "#ba9eff"
        })));
      return ie;
    },
    [s, i]
  ), te = g.useCallback(
    async (K) => {
      const ie = Array.from(K).slice(0, 8);
      if (ie.length !== 0) {
        N(!0);
        try {
          const A = [];
          for (const Y of ie) {
            if (!Y.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(Y.name)) {
              pn.error(`${Y.name}: not an audio file`);
              continue;
            }
            const $ = Y.name.replace(/\.[^.]+$/, "");
            try {
              const q = await Sc(t, Y, $, "speaker");
              A.push(q), pn.success(`Added ${q.displayName}`);
            } catch (q) {
              pn.error(q instanceof Error ? q.message : `${Y.name}: upload failed`);
            }
          }
          A.length > 0 && o([...A, ...a]);
        } finally {
          N(!1);
        }
      }
    },
    [t, a, o]
  ), M = (K) => {
    K.preventDefault(), v(!1), K.dataTransfer?.files && te(K.dataTransfer.files);
  }, F = g.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const ie = await fetch(K);
        if (!ie.ok) throw new Error(`fetch failed: ${ie.status}`);
        const A = await ie.blob(), Y = K.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([A], Y, { type: A.type || "audio/wav" });
        await te([$]);
      } catch (ie) {
        pn.error(ie instanceof Error ? ie.message : "could not fetch URL");
      }
  }, [te]), k = g.useCallback(
    async (K, ie) => {
      try {
        const A = await fT(t, K, ie);
        o(
          a.map((Y) => Y.voiceAssetId === K ? A : Y)
        ), pn.success(`Renamed to ${A.displayName}`);
      } catch (A) {
        pn.error(A instanceof Error ? A.message : "rename failed");
      }
    },
    [t, a, o]
  ), I = g.useCallback((K) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(K), pn.success("Copied name")) : pn.error("Clipboard unavailable");
  }, []), J = g.useCallback(
    async (K) => {
      if (window.confirm(`Delete "${K.displayName}"? Mappings using it will reset.`))
        try {
          await dT(t, K.voiceAssetId), o(a.filter((A) => A.voiceAssetId !== K.voiceAssetId)), pn.success(`Deleted ${K.displayName}`);
        } catch (A) {
          pn.error(A instanceof Error ? A.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: WR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: e_,
        "data-over": b ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), v(!0);
        },
        onDragLeave: () => v(!1),
        onDrop: M,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: t_, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: n_, children: [
            /* @__PURE__ */ c.jsxs("div", { className: a_, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: r_, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: s_, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: pf,
                  onClick: () => D.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: pf,
                  onClick: () => {
                    F();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: pf,
                  onClick: () => T(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            Qe,
            {
              variant: "primary",
              size: "md",
              disabled: R,
              onClick: () => D.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: D,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: p_,
              onChange: (K) => {
                K.target.files && (te(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: i_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: l_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: o_,
            value: f,
            onChange: (K) => p(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: c_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, ie]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: u_,
          "data-active": y === K ? "true" : "false",
          onClick: () => m(K),
          children: ie
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: h_, children: [
        /* @__PURE__ */ c.jsx("span", { className: m_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          V,
          " uploaded"
        ] })
      ] })
    ] }),
    C.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: f_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: d_, children: C.map((K) => {
      const ie = O(K);
      return /* @__PURE__ */ c.jsx(
        V_,
        {
          asset: K,
          presentation: ie,
          usedBy: Q(K.voiceAssetId),
          isPlaying: w === K.voiceAssetId,
          onTogglePlay: () => S((A) => A === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (A) => k(K.voiceAssetId, A),
          onCopyName: () => I(K.displayName),
          onDelete: ie === "upload" ? () => void J(K) : void 0,
          onCreateCharacter: u ? () => u(K) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      t2,
      {
        open: j,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => T(!1),
        onSubmit: async (K, ie) => {
          await he(K, ie);
        }
      }
    )
  ] });
  async function he(K, ie) {
    N(!0);
    try {
      const A = await Sc(t, K, ie, "speaker");
      o([A, ...a]), pn.success(`Recorded ${A.displayName}`);
    } catch (A) {
      throw pn.error(A instanceof Error ? A.message : "upload failed"), A;
    } finally {
      N(!1);
    }
  }
}
async function a2(t) {
  return Et(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function r2(t, a, s) {
  return Et("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function s2(t, a) {
  await Et(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var p0 = "_190jlds0", i2 = "_190jlds1", l2 = "_190jlds2", o2 = "_190jlds3", c2 = "_190jlds4", u2 = "_190jlds5", d2 = "_190jlds6", f2 = "_190jlds7", h2 = "_190jlds8", m2 = "_190jlds9", g0 = "_190jldsa", p2 = "_190jldsb", v0 = "_190jldsc", g2 = "_190jldsd", v2 = "_190jldse", y2 = "_190jldsf";
function b2({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => $s(a[0])), [p, y] = g.useState([]), [m, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [T, R] = g.useState(null), N = g.useMemo(
    () => a.find((C) => $s(C) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((C) => $s(C) === u) || f($s(a[0])));
  }, [a, u]), g.useEffect(() => {
    if (!N) {
      y([]);
      return;
    }
    let C = !1;
    return b(!0), w(null), hc(t, N.kind, N.id, 50).then((V) => {
      C || y(V.entries);
    }).catch((V) => {
      C || w(V instanceof Error ? V.message : "audit fetch failed");
    }).finally(() => {
      C || b(!1);
    }), () => {
      C = !0;
    };
  }, [t, N]);
  const D = g.useCallback(() => {
    if (!N) return;
    const C = {
      deploymentId: t,
      targetKind: N.kind,
      targetId: N.id,
      targetLabel: N.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: p
    }, V = new Blob([JSON.stringify(C, null, 2)], {
      type: "application/json"
    }), Q = URL.createObjectURL(V), te = document.createElement("a");
    te.href = Q, te.download = `audit-${N.kind}-${N.id}-${Date.now()}.json`, document.body.appendChild(te), te.click(), document.body.removeChild(te), URL.revokeObjectURL(Q);
  }, [t, p, N]), O = g.useCallback(async () => {
    if (!(!N || !s) && window.confirm(
      `Revert "${N.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(N);
        const C = await hc(t, N.kind, N.id, 50);
        y(C.entries);
      } catch (C) {
        w(C instanceof Error ? C.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, N]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: p0, children: /* @__PURE__ */ c.jsx("p", { className: v0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: p0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: i2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: l2, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: g0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: o2,
            value: u,
            onChange: (C) => f(C.target.value),
            children: a.map((C) => /* @__PURE__ */ c.jsxs("option", { value: $s(C), children: [
              C.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              C.label
            ] }, $s(C)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: c2, children: [
        /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: D,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void O(),
            disabled: S || !N,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: v2, children: v }),
    m && !v && /* @__PURE__ */ c.jsx("div", { className: y2, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: v0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: g2, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: u2, children: p.map((C) => {
      const V = i && N && !!C.chain_snapshot_json && C.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: d2, children: [
        /* @__PURE__ */ c.jsx("span", { className: f2, children: x2(C.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: h2, children: C.operation_count === 0 ? "cleared" : `${C.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: m2, title: C.digest_after, children: [
          C.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: g0, children: C.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: p2,
            style: {
              background: `color-mix(in oklab, ${C.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: C.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: C.digest_before === "" || !C.digest_before ? "create" : C.operation_count === 0 ? "clear" : "update"
          }
        ),
        V && /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "xs",
            disabled: S || T !== null,
            onClick: async () => {
              if (!(!N || !C.chain_snapshot_json) && !(T !== null || S) && window.confirm(
                `Replay this ${C.operation_count}-op chain on "${N.label}"? A new audit entry will be written.`
              )) {
                R(C.entry_id);
                try {
                  await i(N, C.chain_snapshot_json, C);
                  const Q = await hc(
                    t,
                    N.kind,
                    N.id,
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
            children: T === C.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, C.entry_id);
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
var S2 = "_1uzgubz0", w2 = "_1uzgubz1", j2 = "_1uzgubz2", E2 = "_1uzgubz3", N2 = "_1uzgubz4", C2 = "_1uzgubz5", T2 = "_1uzgubz6", R2 = "_1uzgubz7", y0 = "_1uzgubz8", _2 = "_1uzgubz9", y1 = "_1uzgubza", b1 = "_1uzgubzb", M2 = "_1uzgubzc", A2 = "_1uzgubzd", gf = "_1uzgubze", vf = "_1uzgubzf", D2 = "_1uzgubzg", k2 = "_1uzgubzh", b0 = "_1uzgubzi", x0 = "_1uzgubzj", S0 = "_1uzgubzk", w0 = "_1uzgubzl", j0 = "_1uzgubzm", z2 = "_1uzgubzn", O2 = "_1uzgubzo", L2 = "_1uzgubzp", $2 = "_1uzgubzq";
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
  onClearMapping: v
}) {
  const [w, S] = g.useState(!1), j = i ? o.find((D) => D.voiceAssetId === i.speakerVoiceAssetId) : null, T = i?.defaultVectorPresetId ? u.find((D) => D.presetId === i.defaultVectorPresetId) ?? null : null, R = (t[0] ?? "?").toUpperCase(), N = i !== null;
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
              children: R
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
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: y0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                E0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: y0, children: T.presetName }),
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
              className: `${_2} ${N ? y1 : b1}`,
              children: N ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: A2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: gf, children: [
        /* @__PURE__ */ c.jsx("span", { className: vf, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${D2}${w ? ` ${k2}` : ""}`,
            onDragEnter: (D) => {
              D.preventDefault(), S(!0);
            },
            onDragOver: (D) => D.preventDefault(),
            onDragLeave: () => S(!1),
            onDrop: (D) => {
              D.preventDefault(), S(!1);
              const O = D.dataTransfer.files?.[0];
              O && b && b(O);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (D) => {
                    const O = D.target.files?.[0];
                    O && b && b(O);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: gf, children: [
        /* @__PURE__ */ c.jsx("span", { className: vf, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: b0, children: o.map((D) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${x0}${i?.speakerVoiceAssetId === D.voiceAssetId ? ` ${S0}` : ""}`,
            onClick: () => y(D.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: w0, children: D.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: j0, children: [
                D.durationMs != null ? E0(D.durationMs) : "—",
                " ",
                "·",
                " ",
                D.sampleRate ? `${D.sampleRate} Hz` : "—"
              ] })
            ]
          },
          D.voiceAssetId
        )) })
      ] }),
      u.length > 0 && m && /* @__PURE__ */ c.jsxs("div", { className: gf, children: [
        /* @__PURE__ */ c.jsx("span", { className: vf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: b0, children: u.map((D) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${x0}${i?.defaultVectorPresetId === D.presetId ? ` ${S0}` : ""}`,
            onClick: () => m(D.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: w0, children: D.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: j0, children: "preset · vector" })
            ]
          },
          D.presetId
        )) })
      ] }),
      N && v && /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function E0(t) {
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
        className: `${O2} ${o ? y1 : b1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: L2, children: s })
  ] });
}
async function wc() {
  return Et("/runtime/health");
}
async function V2() {
  await Et("/runtime/start", { method: "POST" });
}
async function I2() {
  return Et("/runtime/stop", { method: "POST" });
}
function x1(t) {
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
var S1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, w1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, q2 = "_13bb4njb";
function Jr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const p = s && t !== "faint", y = [S1[a], w1[t], p ? q2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const F2 = 4e3;
function Y2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null);
  g.useEffect(() => {
    let p = !1;
    const y = async () => {
      try {
        const b = await wc();
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
  return /* @__PURE__ */ c.jsxs("output", { className: XR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Jr, { tone: G2(u), pulse: u === "starting" || u === "installing", children: x1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: P2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "VRAM" }),
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
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const jc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, qc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ia = 1e-3;
function X2(t, a, s) {
  for (const i of Object.keys(jc)) {
    const o = jc[i];
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
const j1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function E1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !j1.has(u.mode))
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
function N1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => j1.has(s.mode))
  };
  return Q2(a);
}
var lM = "_1rsa80i0", oM = "_1rsa80i1", cM = "_1rsa80i2", uM = "_1rsa80i3", dM = "_1rsa80i4", fM = "_1rsa80i5", hM = "_1rsa80i6", mM = "_1rsa80i7", pM = "_1rsa80i8", gM = "_1rsa80i9";
const C1 = ["flat", "warm", "bright", "voice", "telephone"], Wi = -12, Po = 12, vM = 0.5;
function yM(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, p = (m) => {
    const b = jc[m];
    u(b.low, b.mid, b.high, m);
  }, y = (m, b) => {
    const v = { low: a, mid: s, high: i, [m]: b }, w = xM(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: lM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: oM, role: "group", "aria-label": "EQ presets", children: [
      C1.map((m) => /* @__PURE__ */ c.jsx(
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
        yf,
        {
          label: "Low",
          value: a,
          onChange: (m) => y("low", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        yf,
        {
          label: "Mid",
          value: s,
          onChange: (m) => y("mid", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        yf,
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
function yf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - Wi) / (Po - Wi) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: fM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: hM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: Wi,
        max: Po,
        step: vM,
        value: a,
        disabled: i,
        className: pM,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": Wi,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: mM, children: bM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: gM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Wi }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function bM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const bf = 1e-3;
function xM(t, a, s) {
  for (const i of C1) {
    const o = jc[i];
    if (Math.abs(o.low - t) < bf && Math.abs(o.mid - a) < bf && Math.abs(o.high - s) < bf)
      return i;
  }
  return "custom";
}
var SM = "_85bhwb0", wM = "_85bhwb1", N0 = "_85bhwb2", jM = "_85bhwb3", EM = "_85bhwb4", NM = "_85bhwb5", CM = "_85bhwb6", TM = "_85bhwb7";
const Ko = 0.5, xf = 2, RM = 0.05;
function _M(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, p = (s - Ko) / (xf - Ko) * 100, y = g.useId(), m = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: SM, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: wM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: N0,
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
          className: N0,
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
          min: Ko,
          max: xf,
          step: RM,
          value: s,
          disabled: f,
          className: EM,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": xf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: NM, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: CM, children: [
      /* @__PURE__ */ c.jsx(
        Qe,
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
var MM = "kgszk50", AM = "kgszk51", C0 = "kgszk52", DM = "kgszk53", kM = "kgszk54", T1 = "kgszk55", zM = "kgszk56", OM = "kgszk58", Qh = "kgszk59", R1 = "kgszk5a", Zh = "kgszk5b", LM = "kgszk5c", $M = "kgszk5d", UM = "kgszk5e", T0 = "kgszk5f", R0 = "kgszk5g", _0 = "kgszk5h", BM = "kgszk5i", VM = "kgszk5j", IM = "kgszk5l", gl = "kgszk5m", vl = "kgszk5n";
const HM = -24, qM = 24, FM = 0.5, YM = -12, GM = 12, PM = 0.5, KM = -30, XM = -6, QM = -12, ZM = 0, Xo = -60, Sf = -20;
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
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: DM, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: C0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: C0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: kM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      M0,
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
    /* @__PURE__ */ c.jsxs("div", { className: gl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        yM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (S, j, T, R) => b({ eq3: { low: S, mid: j, high: T, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: gl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "Speed" }),
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
      M0,
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
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(qc),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Qe, { variant: "primary", size: "md", onClick: y, disabled: p, children: m })
    ] }) : null
  ] });
}
function M0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: p, onChange: y, disabled: m } = t, b = (p - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: T1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: zM, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: OM, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: R1, children: s })
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
  return /* @__PURE__ */ c.jsxs("div", { className: gl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Normalize" }),
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: T1, children: [
      /* @__PURE__ */ c.jsx("span", { className: R1, children: "Target" }),
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
  return /* @__PURE__ */ c.jsxs("div", { className: gl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: UM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: T0, children: [
        /* @__PURE__ */ c.jsx("label", { className: R0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: _0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: T0, children: [
        /* @__PURE__ */ c.jsx("label", { className: R0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: _0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function eA({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Xo) / (Sf - Xo) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: gl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Silence trim" }),
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
          min: Xo,
          max: Sf,
          step: 1,
          value: a,
          disabled: i || !t,
          className: Zh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Xo,
          "aria-valuemax": Sf,
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
var sA = "skdk4g0", iA = "skdk4g1", A0 = "skdk4g2", lA = "skdk4g3", oA = "skdk4g4", cA = "skdk4g5", uA = "skdk4g6", dA = "skdk4g7", fA = "skdk4g8", hA = "skdk4g9", mA = "skdk4ga", pA = "skdk4gb", gA = "skdk4gc", vA = "skdk4gd", D0 = "skdk4ge", k0 = "skdk4gf", yA = "skdk4gg", z0 = "skdk4gh", O0 = "skdk4gi", bA = "skdk4gj", xA = "skdk4gk", SA = "skdk4gl", L0 = "skdk4gm", wA = "skdk4gn", jA = "skdk4gp", EA = "skdk4gq", NA = "skdk4gr", CA = "skdk4gs", TA = "skdk4gt", RA = "skdk4gu", _A = "skdk4gv", $0 = "skdk4gw", MA = "skdk4gx", AA = "skdk4gy", DA = "skdk4gz", kA = "skdk4g10", zA = "cgsfgh1", OA = "cgsfgh2", LA = "cgsfgh3", $A = "cgsfgh4", UA = "cgsfgh5", BA = "cgsfgh6", VA = "cgsfgh7", IA = "cgsfgh8", HA = "cgsfgh9", qA = "cgsfgha", FA = "cgsfghb", YA = "cgsfghc", GA = "cgsfghd", PA = "cgsfghe", KA = "cgsfghm", XA = "cgsfghn", QA = "cgsfgho", ZA = "cgsfghp";
const an = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], yl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Zs = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, _1 = 0.05;
function JA(t) {
  let a = null, s = -1 / 0;
  for (const i of an) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= _1 ? null : a;
}
function M1(t, a = 3) {
  return an.map((s) => ({ key: s, label: yl[s], value: t[s] })).filter((s) => s.value > _1).sort((s, i) => i.value - s.value).slice(0, a);
}
function WA(t) {
  let a = 0;
  for (const s of an) a += t[s] * t[s];
  return Math.sqrt(a);
}
function U0(t) {
  const a = M1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? wf(s.label) : `${wf(s.label)} + ${i.label.toLowerCase()}`;
}
function wf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Wr(t) {
  const a = { ...Zs };
  for (const s of an) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const B0 = 0.05, V0 = 0.2, e3 = 22, t3 = 320, jf = 0.78;
function Ef(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function n3(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [p, y] = g.useState(null), [m, b] = g.useState(null), v = g.useRef(null), w = g.useRef(a), S = g.useRef(o), j = g.useRef(null), T = g.useRef(0);
  S.current = o, g.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const R = g.useCallback(
    (F) => {
      const k = Wr(F);
      f(k), w.current = k, s(k);
    },
    [s]
  ), N = g.useCallback((F) => {
    const k = Wr(F);
    f(k), w.current = k;
  }, []), D = g.useCallback(
    (F) => {
      const k = v.current;
      if (!k || S.current) return;
      const I = F.clientX - k.centerX, J = F.clientY - k.centerY, he = i / 2 * jf, K = Ef(I, J, k.angle, he), ie = { ...w.current, [k.axis]: K };
      N(ie);
    },
    [i, N]
  ), O = g.useCallback(
    (F) => {
      const k = v.current;
      if (k) {
        if (window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), S.current) {
          const I = F.clientX - k.centerX, J = F.clientY - k.centerY, he = i / 2 * jf, K = Ef(I, J, k.angle, he), ie = { ...w.current, [k.axis]: K };
          v.current = null, R(ie);
          return;
        }
        v.current = null, R(w.current);
      }
    },
    [R, D, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [D, O]);
  const C = g.useCallback((F, k) => {
    S.current || (T.current += 1, b({ x: F, y: k, key: T.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, t3));
  }, []), V = g.useCallback(
    (F, k, I, J, he) => {
      const K = I.getBoundingClientRect(), ie = K.left + K.width / 2, A = K.top + K.height / 2, $ = an.indexOf(F) / an.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: F,
        pointerId: k,
        centerX: ie,
        centerY: A,
        angle: $
      }, y(F), J !== void 0 && he !== void 0) {
        const q = J - ie, oe = he - A, _ = i / 2 * jf, ae = Ef(q, oe, $, _), re = { ...w.current, [F]: ae };
        S.current ? R(re) : N(re);
      }
      window.addEventListener("pointermove", D), window.addEventListener("pointerup", O), window.addEventListener("pointercancel", O);
    },
    [R, D, O, i, N]
  ), Q = g.useCallback(
    (F, k) => {
      k.preventDefault();
      const I = k.currentTarget, J = I.ownerSVGElement ?? I;
      V(F, k.pointerId, J);
    },
    [V]
  ), te = g.useCallback(
    (F) => {
      const k = F.currentTarget, I = k instanceof SVGSVGElement ? k : k.ownerSVGElement ?? k, J = I.getBoundingClientRect(), he = J.left + J.width / 2, K = J.top + J.height / 2, ie = F.clientX - he, A = F.clientY - K;
      if (Math.sqrt(ie * ie + A * A) < 8) return;
      let $ = Math.atan2(A, ie) * 180 / Math.PI;
      $ = (($ + 90) % 360 + 360) % 360;
      let q = null, oe = 999;
      for (let re = 0; re < an.length; re++) {
        const G = an[re];
        if (!G) continue;
        const U = re / an.length * 360, W = Math.abs((U - $ + 540) % 360 - 180);
        W < oe && (oe = W, q = G);
      }
      if (!q || oe > e3) return;
      F.preventDefault();
      const _ = (F.clientX - J.left) / J.width * i, ae = (F.clientY - J.top) / J.height * i;
      C(_, ae), V(q, F.pointerId, I, F.clientX, F.clientY);
    },
    [V, i, C]
  ), M = g.useCallback(
    (F, k) => {
      const I = w.current[F];
      let J = I;
      switch (k.key) {
        case "ArrowUp":
        case "ArrowRight":
          J = I + B0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          J = I - B0;
          break;
        case "PageUp":
          J = I + V0;
          break;
        case "PageDown":
          J = I - V0;
          break;
        case "Home":
          J = 0;
          break;
        case "End":
          J = 1;
          break;
        default:
          return;
      }
      k.preventDefault(), y(F), R({ ...w.current, [F]: J });
    },
    [R]
  );
  return {
    liveVec: u,
    activeAxis: p,
    setActiveAxis: y,
    onPointerDown: Q,
    onKeyDown: M,
    onSurfacePointerDown: te,
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
  const u = n3({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, p = s / 2, y = s / 2 * 0.78, m = g.useMemo(() => s3(f, p, y), [f, p, y]), b = g.useMemo(() => an.map((v, w) => {
    const S = mc(u.liveVec[v]), j = m[w];
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
        an.map((v, w) => {
          const S = m[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, T = p + S.dy * 1.18, R = u.activeAxis === v;
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
                y: T,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: yl[v]
              }
            )
          ] }, v);
        }),
        an.map((v, w) => {
          const S = mc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = m[w];
          if (!j) return null;
          const T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${VA}${T ? ` ${IA}` : ""}`,
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
        !i && an.map((v, w) => {
          const S = mc(u.liveVec[v]), j = m[w];
          if (!j) return null;
          const T = f + j.dx * S, R = p + j.dy * S, N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: HA,
                cx: T,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${yl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (D) => u.onPointerDown(v, D),
                onKeyDown: (D) => u.onKeyDown(v, D),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${qA}${N ? ` ${FA}` : ""}`,
                cx: T,
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
  return an.map((i, o) => {
    const u = o / an.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function mc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function i3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => an.map((f, p) => {
    const y = mc(t[f]), m = p / an.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(m) * o * y, v = i + Math.sin(m) * o * y;
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
const I0 = 0.05, H0 = 0.2;
function p3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), p = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, T) => {
      const R = Math.max(0, Math.min(1, T));
      a(Wr({ ...t, [j]: R }));
    },
    [a, t]
  ), m = g.useCallback((j, T) => {
    const R = p.current.get(j);
    return !R || R.width <= 0 ? 0 : (T - R.left) / R.width;
  }, []), b = g.useCallback(
    (j, T) => {
      if (s) return;
      T.preventDefault();
      const R = T.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && p.current.set(j, R.getBoundingClientRect()), T.currentTarget.setPointerCapture(T.pointerId), f.current = j, u(j), y(j, m(j, T.clientX));
    },
    [s, y, m]
  ), v = g.useCallback(
    (j, T) => {
      s || i || f.current === j && y(j, m(j, T.clientX));
    },
    [s, i, y, m]
  ), w = g.useCallback(
    (j, T) => {
      if (f.current === j) {
        try {
          T.currentTarget.releasePointerCapture(T.pointerId);
        } catch {
        }
        f.current = null, p.current.delete(j);
      }
    },
    []
  ), S = g.useCallback(
    (j, T) => {
      if (s) return;
      const R = t[j] ?? 0;
      let N = R;
      switch (T.key) {
        case "ArrowRight":
        case "ArrowUp":
          N = R + I0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          N = R - I0;
          break;
        case "PageUp":
          N = R + H0;
          break;
        case "PageDown":
          N = R - H0;
          break;
        case "Home":
          N = 0;
          break;
        case "End":
          N = 1;
          break;
        default:
          return;
      }
      T.preventDefault(), u(j), y(j, N);
    },
    [s, y, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: l3, role: "group", "aria-label": "Emotion axis sliders", children: an.map((j) => {
    const T = g3(t[j] ?? 0), R = T > 0.05, N = o === j, D = yl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${o3}${R ? ` ${c3}` : ""}${N ? ` ${u3}` : ""}`,
        role: "slider",
        "aria-label": `${D} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(T.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (O) => b(j, O),
        onPointerMove: (O) => v(j, O),
        onPointerUp: (O) => w(j, O),
        onPointerCancel: (O) => w(j, O),
        onKeyDown: (O) => S(j, O),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: d3, children: D }),
          /* @__PURE__ */ c.jsx("span", { className: f3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: h3,
              style: { width: `${T * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: m3, children: T.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function g3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var q0 = "gvwvwg0", v3 = "gvwvwg2", y3 = "gvwvwg3", b3 = "gvwvwg8", x3 = "gvwvwg9", S3 = "gvwvwga", w3 = "gvwvwgb", j3 = "gvwvwgc", E3 = "gvwvwgd", N3 = "gvwvwge";
function C3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsx("span", { className: v3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: y3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
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
function Nf(t) {
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
  if (!a) return { ...Zs };
  const i = a.split(/\s+/).some((f) => _3.includes(f)) ? 1.2 : 1, o = M3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Zs };
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
      A3.some((N) => new RegExp(`\\b${N}\\b`).test(R)) || (p += 1);
    }
    if (p > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return an.every((f) => u[f] === 0) && (u.calm = 0.4), Wr(u);
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
  const u = t.mode ?? "emotion_vector", f = u === "none" || u === "audio_ref" ? "emotion_vector" : u, p = g.useMemo(() => O3(t.vector), [t.vector]), y = t.emotionAlpha ?? 1, [m, b] = g.useState(null), [v, w] = g.useState(!1), [S, j] = g.useState(null), [T, R] = g.useState(""), [N, D] = g.useState(!1), O = g.useRef(!0);
  g.useEffect(() => (O.current = !0, () => {
    O.current = !1;
  }), []), g.useEffect(() => {
    N || R(U0(p));
  }, [p, N]);
  const C = ($) => {
    a({ ...t, mode: $ });
  }, V = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Nf($)
    }), S && j(null);
  }, Q = () => {
    V(Wr(Zs));
  }, te = ($) => {
    const q = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: q });
  }, M = async () => {
    const $ = T.trim();
    if ($) {
      w(!0), b(null);
      try {
        const q = await r2(s, $, Nf(p));
        if (!O.current) return;
        o(
          L3([q, ...i.filter((oe) => oe.presetId !== q.presetId)])
        ), j(q.presetId), D(!1);
      } catch (q) {
        O.current && b(F0(q));
      } finally {
        O.current && w(!1);
      }
    }
  }, F = async ($) => {
    const q = [...i];
    o(i.filter((oe) => oe.presetId !== $)), S === $ && j(null);
    try {
      await s2(s, $);
    } catch (oe) {
      O.current && (o(q), b(F0(oe)));
    }
  }, k = ($) => {
    j($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, I = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, J = JA(p), he = WA(p), K = M1(p, 3), ie = K.length > 0 && T.trim().length > 0 && !v, A = U0(p) || "name your preset…", Y = f !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: sA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: iA, children: [
      /* @__PURE__ */ c.jsx("span", { className: A0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: lA, role: "radiogroup", "aria-label": "Emotion mode", children: k3.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": f === $.id,
          className: `${oA}${f === $.id ? ` ${cA}` : ""}`,
          onClick: () => C($.id),
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
          onChange: ($) => I($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: SA, children: [
        /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const q = D3($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Nf(q)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: L0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: L0, children: [
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
          onChange: V,
          readOnly: Y
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${c0} ${dA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: fA, children: [
          /* @__PURE__ */ c.jsx("span", { className: A0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: hA, children: J ? yl[J].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: mA, children: [
            "‖v‖ = ",
            he.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(p3, { vec: p, onChange: V, readOnly: Y }),
        /* @__PURE__ */ c.jsx("div", { className: pA, children: /* @__PURE__ */ c.jsxs(
          Qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: Q,
            disabled: Y || he < 1e-3,
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
      /* @__PURE__ */ c.jsxs("div", { className: D0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: k0, children: "Alpha" }),
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
            className: z0,
            style: { "--fill": `${y * 10}%` },
            onChange: ($) => te(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: O0, children: [
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
              /* @__PURE__ */ c.jsx("div", { className: _A, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${$0} ${AA}`, children: "no axes set" }) : K.map(($) => /* @__PURE__ */ c.jsxs("span", { className: $0, children: [
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
                    value: T,
                    disabled: K.length === 0 || v,
                    onChange: ($) => {
                      R($.target.value), D(!0);
                    },
                    onKeyDown: ($) => {
                      $.key === "Enter" && ie && M();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Qe,
                  {
                    variant: "primary",
                    disabled: !ie,
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
        C3,
        {
          presets: i,
          activePresetId: S,
          onSelect: k,
          onDelete: F
        }
      )
    ] }),
    f === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: D0, children: [
      /* @__PURE__ */ c.jsx("span", { className: k0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: y,
          className: z0,
          style: { "--fill": `${y * 10}%` },
          onChange: ($) => te(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: O0, children: [
        (y * 100).toFixed(0),
        "%"
      ] })
    ] }),
    m && /* @__PURE__ */ c.jsx("div", { className: wA, children: m })
  ] });
}
function O3(t) {
  if (!t || !Array.isArray(t)) return Wr(Zs);
  const a = { ...Zs };
  return an.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function L3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function F0(t) {
  return t instanceof ti || t instanceof Error ? t.message : "Unknown error";
}
var $3 = "_5u1uau0", el = "_5u1uau1", U3 = "_5u1uau2", Bs = "_5u1uau3", tl = "_5u1uau4", B3 = "_5u1uau5", Cf = "_5u1uau6", V3 = "_5u1uau7", I3 = "_5u1uau8", H3 = "_5u1uau9", q3 = "_5u1uaua", F3 = "_5u1uaub", Y3 = "_5u1uauc", G3 = "_5u1uaud", P3 = "_5u1uaue", Y0 = "_5u1uauf", G0 = "_5u1uaug", K3 = "_5u1uauh";
const Tf = [
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
], X3 = ["mp3", "wav", "flac"], Qo = 0.5, Rf = 2, Q3 = 0.05, Z3 = 0.8, J3 = 0.8, P0 = 42;
function Zo(t, a, s) {
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
  const y = g.useId(), m = g.useId(), b = g.useId(), v = g.useId(), w = g.useId(), S = (V, Q) => {
    p({ ...f, [V]: Q });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", T = (V) => {
    if (V !== j)
      if (V === "random") {
        const Q = { ...f };
        delete Q.seed, p(Q);
      } else {
        const Q = Zo(f, "seed", P0);
        p({ ...f, seed: Q });
      }
  }, R = Tf.find((V) => V.id === o) ?? Tf[0], N = (s - Qo) / (Rf - Qo) * 100, D = Zo(f, "temperature", Z3), O = Zo(f, "top_p", J3), C = Zo(f, "seed", P0);
  return /* @__PURE__ */ c.jsxs("div", { className: $3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Bs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: B3,
          value: t,
          onChange: (V) => a(V.currentTarget.value),
          children: X3.map((V) => /* @__PURE__ */ c.jsx("option", { value: V, children: V }, V))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: Bs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${tl} ${V3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: I3,
            min: Qo,
            max: Rf,
            step: Q3,
            value: s,
            style: { "--range-pct": `${N}%` },
            onChange: (V) => i(Number(V.currentTarget.value)),
            "aria-valuemin": Qo,
            "aria-valuemax": Rf,
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
      /* @__PURE__ */ c.jsx("div", { className: q3, children: Tf.map((V) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === V.id,
          className: F3,
          onClick: () => u(V.id),
          title: V.help,
          children: V.label
        },
        V.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: Y3, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: G3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bs, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Cf,
          min: 0,
          max: 2,
          step: 0.05,
          value: D,
          onChange: (V) => S("temperature", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Bs, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Cf,
          min: 0,
          max: 1,
          step: 0.05,
          value: O,
          onChange: (V) => S("top_p", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${tl} ${P3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${Y0} ${j === "fixed" ? G0 : ""}`,
                onClick: () => T("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "random",
                className: `${Y0} ${j === "random" ? G0 : ""}`,
                onClick: () => T("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            j === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: w,
                type: "number",
                className: Cf,
                step: 1,
                value: C,
                onChange: (V) => S("seed", Math.trunc(Number(V.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: K3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var e5 = "iv43qk0", K0 = "iv43qk1", t5 = "iv43qk2", X0 = "iv43qk3", n5 = "iv43qk4", a5 = "iv43qk5", r5 = "iv43qk6", s5 = "iv43qk7", i5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, l5 = "iv43qkd", o5 = "iv43qke", _f = "iv43qkf", Mf = "iv43qkg";
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
      /* @__PURE__ */ c.jsxs("span", { className: _f, children: [
        /* @__PURE__ */ c.jsx("span", { className: Mf, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: _f, children: [
        /* @__PURE__ */ c.jsx("span", { className: Mf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: _f, children: [
        /* @__PURE__ */ c.jsx("span", { className: Mf, children: u }),
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
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${K0} ${t5}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: X0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: r5, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: K0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: X0, children: String(t.idx + 1).padStart(2, "0") }),
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
      Af,
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
      Af,
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
      Af,
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
function Af({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: p }) {
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
var Q0 = "_17fbpt30", Z0 = "_17fbpt31", J0 = "_17fbpt32", A5 = "_17fbpt33", D5 = "_17fbpt34", k5 = "_17fbpt35", W0 = "_17fbpt36", z5 = "_17fbpt37", O5 = "_17fbpt38";
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
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Q0, children: [
    /* @__PURE__ */ c.jsx("header", { className: Z0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: J0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: z5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: O5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Q0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: Z0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: J0,
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
          /* @__PURE__ */ c.jsx("span", { className: `${S1.sm} ${w1[L5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: W0, children: U5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: W0, children: u.kind })
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
const A1 = g.createContext({});
function Wh(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const B5 = typeof window < "u", D1 = B5 ? g.useLayoutEffect : g.useEffect, Fc = /* @__PURE__ */ g.createContext(null);
function V5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function I5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const wr = (t, a, s) => s > a ? a : s < t ? t : s;
function eb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Cl = () => {
}, Js = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Cl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(eb(a, s));
}, Js = (t, a, s) => {
  if (!t)
    throw new Error(eb(a, s));
});
const jr = {}, k1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function H5(t) {
  return typeof t == "object" && t !== null;
}
const z1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function O1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ni = /* @__NO_SIDE_EFFECTS__ */ (t) => t, q5 = (t, a) => (s) => a(t(s)), Yc = (...t) => t.reduce(q5), L1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class $1 {
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
function U1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const B1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, F5 = 1e-7, Y5 = 12;
function G5(t, a, s, i, o) {
  let u, f, p = 0;
  do
    f = a + (s - a) / 2, u = B1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > F5 && ++p < Y5);
  return f;
}
function Tl(t, a, s, i) {
  if (t === a && s === i)
    return ni;
  const o = (u) => G5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : B1(o(u), a, i);
}
const V1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, I1 = (t) => (a) => 1 - t(1 - a), H1 = /* @__PURE__ */ Tl(0.33, 1.53, 0.69, 0.99), em = /* @__PURE__ */ I1(H1), q1 = /* @__PURE__ */ V1(em), F1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * em(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), tm = (t) => 1 - Math.sin(Math.acos(t)), P5 = I1(tm), Y1 = V1(tm), K5 = /* @__PURE__ */ Tl(0.42, 0, 1, 1), X5 = /* @__PURE__ */ Tl(0, 0, 0.58, 1), G1 = /* @__PURE__ */ Tl(0.42, 0, 0.58, 1), Q5 = (t) => Array.isArray(t) && typeof t[0] != "number", P1 = (t) => Array.isArray(t) && typeof t[0] == "number", tb = {
  linear: ni,
  easeIn: K5,
  easeInOut: G1,
  easeOut: X5,
  circIn: tm,
  circInOut: Y1,
  circOut: P5,
  backIn: em,
  backInOut: q1,
  backOut: H1,
  anticipate: F1
}, Z5 = (t) => typeof t == "string", nb = (t) => {
  if (P1(t)) {
    Js(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return Tl(a, s, i, o);
  } else if (Z5(t))
    return Js(tb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), tb[t];
  return t;
}, Jo = [
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
function K1(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = Jo.reduce((O, C) => (O[C] = J5(u), O), {}), { setup: p, read: y, resolveKeyframes: m, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, T = () => {
    const O = jr.useManualTiming, C = O ? o.timestamp : performance.now();
    s = !1, O || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(C - o.timestamp, W5), 1)), o.timestamp = C, o.isProcessing = !0, p.process(o), y.process(o), m.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(T));
  }, R = () => {
    s = !0, i = !0, o.isProcessing || t(T);
  };
  return { schedule: Jo.reduce((O, C) => {
    const V = f[C];
    return O[C] = (Q, te = !1, M = !1) => (s || R(), V.schedule(Q, te, M)), O;
  }, {}), cancel: (O) => {
    for (let C = 0; C < Jo.length; C++)
      f[Jo[C]].cancel(O);
  }, state: o, steps: f };
}
const { schedule: na, cancel: sh, state: Ec } = /* @__PURE__ */ K1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ni, !0);
let pc;
function eD() {
  pc = void 0;
}
const Hn = {
  now: () => (pc === void 0 && Hn.set(Ec.isProcessing || jr.useManualTiming ? Ec.timestamp : performance.now()), pc),
  set: (t) => {
    pc = t, queueMicrotask(eD);
  }
}, X1 = (t) => (a) => typeof a == "string" && a.startsWith(t), Q1 = /* @__PURE__ */ X1("--"), tD = /* @__PURE__ */ X1("var(--"), nm = (t) => tD(t) ? nD.test(t.split("/*")[0].trim()) : !1, nD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ab(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ai = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, bl = {
  ...ai,
  transform: (t) => wr(0, 1, t)
}, Wo = {
  ...ai,
  default: 1
}, fl = (t) => Math.round(t * 1e5) / 1e5, am = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function aD(t) {
  return t == null;
}
const rD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, rm = (t, a) => (s) => !!(typeof s == "string" && rD.test(s) && s.startsWith(t) || a && !aD(s) && Object.prototype.hasOwnProperty.call(s, a)), Z1 = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, p] = i.match(am);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, sD = (t) => wr(0, 255, t), Df = {
  ...ai,
  transform: (t) => Math.round(sD(t))
}, Pr = {
  test: /* @__PURE__ */ rm("rgb", "red"),
  parse: /* @__PURE__ */ Z1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + Df.transform(t) + ", " + Df.transform(a) + ", " + Df.transform(s) + ", " + fl(bl.transform(i)) + ")"
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
}, Rl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Rl("deg"), Ks = /* @__PURE__ */ Rl("%"), _e = /* @__PURE__ */ Rl("px"), lD = /* @__PURE__ */ Rl("vh"), oD = /* @__PURE__ */ Rl("vw"), rb = {
  ...Ks,
  parse: (t) => Ks.parse(t) / 100,
  transform: (t) => Ks.transform(t * 100)
}, Gs = {
  test: /* @__PURE__ */ rm("hsl", "hue"),
  parse: /* @__PURE__ */ Z1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Ks.transform(fl(a)) + ", " + Ks.transform(fl(s)) + ", " + fl(bl.transform(i)) + ")"
}, nn = {
  test: (t) => Pr.test(t) || ih.test(t) || Gs.test(t),
  parse: (t) => Pr.test(t) ? Pr.parse(t) : Gs.test(t) ? Gs.parse(t) : ih.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Pr.transform(t) : Gs.transform(t),
  getAnimatableNone: (t) => {
    const a = nn.parse(t);
    return a.alpha = 0, nn.transform(a);
  }
}, cD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function uD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(am)?.length || 0) + (t.match(cD)?.length || 0) > 0;
}
const J1 = "number", W1 = "color", dD = "var", fD = "var(", sb = "${}", hD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ws(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const p = a.replace(hD, (y) => (nn.test(y) ? (i.color.push(u), o.push(W1), s.push(nn.parse(y))) : y.startsWith(fD) ? (i.var.push(u), o.push(dD), s.push(y)) : (i.number.push(u), o.push(J1), s.push(parseFloat(y))), ++u, sb)).split(sb);
  return { values: s, split: p, indexes: i, types: o };
}
function mD(t) {
  return Ws(t).values;
}
function eS({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === J1 ? o += fl(i[u]) : f === W1 ? o += nn.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function pD(t) {
  return eS(Ws(t));
}
const gD = (t) => typeof t == "number" ? 0 : nn.test(t) ? nn.getAnimatableNone(t) : t, vD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : gD(t);
function yD(t) {
  const a = Ws(t);
  return eS(a)(a.values.map((i, o) => vD(i, a.split[o])));
}
const da = {
  test: uD,
  parse: mD,
  createTransformer: pD,
  getAnimatableNone: yD
};
function kf(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function bD({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const p = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - p;
    o = kf(y, p, t + 1 / 3), u = kf(y, p, t), f = kf(y, p, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function Nc(t, a) {
  return (s) => s > 0 ? a : t;
}
const _l = (t, a, s) => t + (a - t) * s, zf = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, xD = [ih, Pr, Gs], SD = (t) => xD.find((a) => a.test(t));
function ib(t) {
  const a = SD(t);
  if (Cl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Gs && (s = bD(s)), s;
}
const lb = (t, a) => {
  const s = ib(t), i = ib(a);
  if (!s || !i)
    return Nc(t, a);
  const o = { ...s };
  return (u) => (o.red = zf(s.red, i.red, u), o.green = zf(s.green, i.green, u), o.blue = zf(s.blue, i.blue, u), o.alpha = _l(s.alpha, i.alpha, u), Pr.transform(o));
}, lh = /* @__PURE__ */ new Set(["none", "hidden"]);
function wD(t, a) {
  return lh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function jD(t, a) {
  return (s) => _l(t, a, s);
}
function sm(t) {
  return typeof t == "number" ? jD : typeof t == "string" ? nm(t) ? Nc : nn.test(t) ? lb : CD : Array.isArray(t) ? tS : typeof t == "object" ? nn.test(t) ? lb : ED : Nc;
}
function tS(t, a) {
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
  const s = da.createTransformer(a), i = Ws(t), o = Ws(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? lh.has(t) && !o.values.length || lh.has(a) && !i.values.length ? wD(t, a) : Yc(tS(ND(i, o), o.values), s) : (Cl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Nc(t, a));
};
function nS(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? _l(t, a, s) : sm(t)(t, a);
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
    now: () => Ec.isProcessing ? Ec.timestamp : Hn.now()
  };
}, aS = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Cc = 2e4;
function im(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < Cc; )
    a += s, i = t.next(a);
  return a >= Cc ? 1 / 0 : a;
}
function RD(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(im(i), Cc);
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
const Of = 1e-3;
function AD({ duration: t = Bt.duration, bounce: a = Bt.bounce, velocity: s = Bt.velocity, mass: i = Bt.mass }) {
  let o, u;
  Cl(t <= /* @__PURE__ */ ta(Bt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(Bt.minDamping, Bt.maxDamping, f), t = wr(Bt.minDuration, Bt.maxDuration, /* @__PURE__ */ ua(t)), f < 1 ? (o = (m) => {
    const b = m * f, v = b * t, w = b - s, S = oh(m, f), j = Math.exp(-v);
    return Of - w / S * j;
  }, u = (m) => {
    const v = m * f * t, w = v * s + s, S = Math.pow(f, 2) * Math.pow(m, 2) * t, j = Math.exp(-v), T = oh(Math.pow(m, 2), f);
    return (-o(m) + Of > 0 ? -1 : 1) * ((w - S) * j) / T;
  }) : (o = (m) => {
    const b = Math.exp(-m * t), v = (m - s) * t + 1;
    return -Of + b * v;
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
function ob(t, a) {
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
  if (!ob(t, kD) && ob(t, DD))
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
function Tc(t = Bt.visualDuration, a = Bt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], p = { done: !1, value: u }, { stiffness: y, damping: m, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = zD({
    ...s,
    velocity: -/* @__PURE__ */ ua(s.velocity || 0)
  }), j = w || 0, T = m / (2 * Math.sqrt(y * b)), R = f - u, N = /* @__PURE__ */ ua(Math.sqrt(y / b)), D = Math.abs(R) < 5;
  i || (i = D ? Bt.restSpeed.granular : Bt.restSpeed.default), o || (o = D ? Bt.restDelta.granular : Bt.restDelta.default);
  let O, C, V, Q, te, M;
  if (T < 1)
    V = oh(N, T), Q = (j + T * N * R) / V, O = (k) => {
      const I = Math.exp(-T * N * k);
      return f - I * (Q * Math.sin(V * k) + R * Math.cos(V * k));
    }, te = T * N * Q + R * V, M = T * N * R - Q * V, C = (k) => Math.exp(-T * N * k) * (te * Math.sin(V * k) + M * Math.cos(V * k));
  else if (T === 1) {
    O = (I) => f - Math.exp(-N * I) * (R + (j + N * R) * I);
    const k = j + N * R;
    C = (I) => Math.exp(-N * I) * (N * k * I - j);
  } else {
    const k = N * Math.sqrt(T * T - 1);
    O = (K) => {
      const ie = Math.exp(-T * N * K), A = Math.min(k * K, 300);
      return f - ie * ((j + T * N * R) * Math.sinh(A) + k * R * Math.cosh(A)) / k;
    };
    const I = (j + T * N * R) / k, J = T * N * I - R * k, he = T * N * R - I * k;
    C = (K) => {
      const ie = Math.exp(-T * N * K), A = Math.min(k * K, 300);
      return ie * (J * Math.sinh(A) + he * Math.cosh(A));
    };
  }
  const F = {
    calculatedDuration: S && v || null,
    velocity: (k) => /* @__PURE__ */ ta(C(k)),
    next: (k) => {
      if (!S && T < 1) {
        const J = Math.exp(-T * N * k), he = Math.sin(V * k), K = Math.cos(V * k), ie = f - J * (Q * he + R * K), A = /* @__PURE__ */ ta(J * (te * he + M * K));
        return p.done = Math.abs(A) <= i && Math.abs(f - ie) <= o, p.value = p.done ? f : ie, p;
      }
      const I = O(k);
      if (S)
        p.done = k >= v;
      else {
        const J = /* @__PURE__ */ ta(C(k));
        p.done = Math.abs(J) <= i && Math.abs(f - I) <= o;
      }
      return p.value = p.done ? f : I, p;
    },
    toString: () => {
      const k = Math.min(im(F), Cc), I = aS((J) => F.next(k * J).value, k, 30);
      return k + "ms " + I;
    },
    toTransition: () => {
    }
  };
  return F;
}
Tc.applyToOptions = (t) => {
  const a = RD(t, 100, Tc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const OD = 5;
function rS(t, a, s) {
  const i = Math.max(a - OD, 0);
  return U1(s - t(i), a - i);
}
function ch({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: p, max: y, restDelta: m = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (M) => p !== void 0 && M < p || y !== void 0 && M > y, j = (M) => p === void 0 ? y : y === void 0 || Math.abs(p - M) < Math.abs(y - M) ? p : y;
  let T = s * a;
  const R = v + T, N = f === void 0 ? R : f(R);
  N !== R && (T = N - v);
  const D = (M) => -T * Math.exp(-M / i), O = (M) => N + D(M), C = (M) => {
    const F = D(M), k = O(M);
    w.done = Math.abs(F) <= m, w.value = w.done ? N : k;
  };
  let V, Q;
  const te = (M) => {
    S(w.value) && (V = M, Q = Tc({
      keyframes: [w.value, j(w.value)],
      velocity: rS(O, M, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: m,
      restSpeed: b
    }));
  };
  return te(0), {
    calculatedDuration: null,
    next: (M) => {
      let F = !1;
      return !Q && V === void 0 && (F = !0, C(M), te(M)), V !== void 0 && M >= V ? Q.next(M - V) : (!F && C(M), w);
    }
  };
}
function LD(t, a, s) {
  const i = [], o = s || jr.mix || nS, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let p = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ni : a;
      p = Yc(y, p);
    }
    i.push(p);
  }
  return i;
}
function $D(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Js(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
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
    const w = /* @__PURE__ */ L1(t[v], t[v + 1], b);
    return p[v](w);
  };
  return s ? (b) => m(wr(t[0], t[u - 1], b)) : m;
}
function UD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ L1(0, a, i);
    t.push(_l(s, 1, o));
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
  return t.map(() => a || G1).splice(0, t.length - 1);
}
function hl({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = Q5(i) ? i.map(nb) : nb(i), u = {
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
function Gc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(HD), p = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !p || i === void 0 ? u[p] : i;
}
const qD = {
  decay: ch,
  inertia: ch,
  tween: hl,
  keyframes: hl,
  spring: Tc
};
function sS(t) {
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
class Rc extends lm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== Hn.now() && this.tick(Hn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    sS(a);
    const { type: s = hl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: p } = a;
    const y = s || hl;
    y !== hl && typeof p[0] != "number" && (this.mixKeyframes = Yc(FD, nS(p[0], p[1])), p = [0, 100]);
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
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: T, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const N = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? N < 0 : N > o;
    this.currentTime = Math.max(N, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, C = i;
    if (v) {
      const M = Math.min(this.currentTime, o) / p;
      let F = Math.floor(M), k = M % 1;
      !k && M >= 1 && (k = 1), k === 1 && F--, F = Math.min(F, v + 1), !!(F % 2) && (w === "reverse" ? (k = 1 - k, S && (k -= S / p)) : w === "mirror" && (C = f)), O = wr(0, 1, k) * p;
    }
    let V;
    D ? (this.delayState.value = b[0], V = this.delayState) : V = C.next(O), u && !D && (V.value = u(V.value));
    let { done: Q } = V;
    !D && y !== null && (Q = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const te = this.holdTime === null && (this.state === "finished" || this.state === "running" && Q);
    return te && j !== ch && (V.value = Gc(b, this.options, R, this.speed)), T && T(V.value), te && this.finish(), V;
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
    return rS((i) => this.generator.next(i).value, a, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const s = this.playbackSpeed !== a;
    s && this.driver && this.updateTime(Hn.now()), this.playbackSpeed = a, s && this.driver && (this.time = /* @__PURE__ */ ua(this.currentTime));
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
    this.state = "paused", this.updateTime(Hn.now()), this.holdTime = this.currentTime;
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
}, dh = (t) => (t = t % 360, t < 0 && (t += 360), t), cb = uh, ub = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), db = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), PD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ub,
  scaleY: db,
  scale: (t) => (ub(t) + db(t)) / 2,
  rotateX: (t) => dh(Kr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => dh(Kr(Math.atan2(-t[2], t[0]))),
  rotateZ: cb,
  rotate: cb,
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
const ri = [
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
], si = new Set(ri), fb = (t) => t === ai || t === _e, QD = /* @__PURE__ */ new Set(["x", "y", "z"]), ZD = ri.filter((t) => !QD.has(t));
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
function iS() {
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
function lS() {
  Qr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ph = !0);
  });
}
function WD() {
  gh = !0, lS(), iS(), gh = !1;
}
class om {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), mh || (mh = !0, na.read(lS), na.resolveKeyframes(iS))) : (this.readKeyframes(), this.complete());
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
function oS(t, a, s) {
  ek(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const tk = {};
function cS(t, a) {
  const s = /* @__PURE__ */ O1(t);
  return () => tk[a] ?? s();
}
const nk = /* @__PURE__ */ cS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), uS = /* @__PURE__ */ cS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, hb = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ol([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ol([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ol([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ol([0.33, 1.53, 0.69, 0.99])
};
function dS(t, a) {
  if (t)
    return typeof t == "function" ? uS() ? aS(t, a) : "ease-out" : P1(t) ? ol(t) : Array.isArray(t) ? t.map((s) => dS(s, a) || hb.easeOut) : hb[t];
}
function ak(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: p = "easeOut", times: y } = {}, m = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = dS(p, o);
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
function fS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function rk({ type: t, ...a }) {
  return fS(t) && uS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class hS extends lm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: p, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Js(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = rk(a);
    this.animation = ak(s, i, o, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Gc(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), oS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && nk() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ni) : o(this);
  }
}
const mS = {
  anticipate: F1,
  backInOut: q1,
  circInOut: Y1
};
function sk(t) {
  return t in mS;
}
function ik(t) {
  typeof t.ease == "string" && sk(t.ease) && (t.ease = mS[t.ease]);
}
const Lf = 10;
class lk extends hS {
  constructor(a) {
    ik(a), sS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const p = new Rc({
      ...f,
      autoplay: !1
    }), y = Math.max(Lf, Hn.now() - this.startTime), m = wr(0, Lf, y - Lf), b = p.sample(y).value, { name: v } = this.options;
    u && v && oS(u, v, b), s.setWithVelocity(p.sample(Math.max(0, y - m)).value, b, m), p.stop();
  }
}
const mb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
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
  const u = t[t.length - 1], f = mb(o, a), p = mb(u, a);
  return Cl(f === p, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !p ? !1 : ok(t) || (s === "spring" || fS(s)) && i;
}
function vh(t) {
  t.duration = 0, t.type = "keyframes";
}
const pS = /* @__PURE__ */ new Set([
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
]), hk = /* @__PURE__ */ O1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function mk(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: p } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return hk() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (pS.has(s) || fk.has(s) && dk(p)) && (s !== "transform" || !b) && /**
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
    }, this.createdAt = Hn.now();
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
    this.keyframeResolver = new S(p, (j, T, R) => this.onKeyframesResolved(j, T, w, !R), y, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: p, delay: y, isHandoff: m, onUpdate: b } = i;
    this.resolvedAt = Hn.now();
    let v = !0;
    ck(a, u, f, p) || (v = !1, (jr.instantAnimations || !y) && b?.(Gc(a, i, s)), a[0] = a[a.length - 1], vh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > pk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !m && mk(S), T = S.motionValue?.owner?.current;
    let R;
    if (j)
      try {
        R = new lk({
          ...S,
          element: T
        });
      } catch {
        R = new Rc(S);
      }
    else
      R = new Rc(S);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(ni), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
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
function gS(t, a, s, i = 0, o = 1) {
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
function vS(t, a, s = 1) {
  Js(s <= bk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = yk(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return k1(f) ? parseFloat(f) : f;
  }
  return nm(o) ? vS(o, a, s + 1) : o;
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
}, Ek = (t, { keyframes: a }) => a.length > 2 ? wk : si.has(t) ? t.startsWith("scale") ? Sk(a[1]) : xk : jk;
function yS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function bS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? yS(s, t) : s;
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
  const p = bS(i, t) || {}, y = p.delay || i.delay || 0;
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
    const w = Gc(b.keyframes, p);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new Rc(b) : new gk(b);
};
function pb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function cm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = pb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = pb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Zr(t, a, s) {
  const i = t.getProps();
  return cm(i, a, s !== void 0 ? s : i.custom, t);
}
const xS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ri
]), gb = 30, Rk = (t) => !isNaN(parseFloat(t));
class _k {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const o = Hn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = s.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Hn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = Rk(this.current));
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
    this.events[a] || (this.events[a] = new $1());
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
    const a = Hn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > gb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, gb);
    return U1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
function _c(t, a) {
  return new _k(t, a);
}
const yh = (t) => Array.isArray(t);
function Mk(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, _c(s));
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
const Sn = (t) => !!(t && t.getVelocity);
function kk(t) {
  return !!(Sn(t) && t.add);
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
const Ok = "framerAppearId", SS = "data-" + um(Ok);
function Lk(t) {
  return t.props[SS];
}
function $k({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function wS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...p } = a;
  const y = t.getDefaultTransition();
  u = u ? yS(u, y) : y;
  const m = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in p) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = p[w];
    if (j === void 0 || v && $k(v, w))
      continue;
    const T = {
      delay: s,
      ...bS(u || {}, w)
    }, R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === R && !T.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let N = !1;
    if (window.MotionHandoffAnimation) {
      const C = Lk(t);
      if (C) {
        const V = window.MotionHandoffAnimation(C, w, na);
        V !== null && (T.startTime = V, N = !0);
      }
    }
    zk(t, w);
    const D = m ?? t.shouldReduceMotion;
    S.start(Tk(w, S, j, D && xS.has(w) ? { type: !1 } : T, t, N));
    const O = S.animation;
    O && b.push(O);
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
  const u = i ? () => Promise.all(wS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
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
      delay: s + (typeof i == "function" ? 0 : i) + gS(t.variantChildren, y, i, o, u)
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
    i = Promise.all(wS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const Vk = {
  test: (t) => t === "auto",
  parse: (t) => t
}, jS = (t) => (a) => a.test(t), ES = [ai, _e, Ks, vr, oD, lD, Vk], vb = (t) => ES.find(jS(t));
function Ik(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || z1(t) : !0;
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
}, yb = {
  ...ai,
  transform: Math.round
}, Yk = {
  rotate: vr,
  rotateX: vr,
  rotateY: vr,
  rotateZ: vr,
  scale: Wo,
  scaleX: Wo,
  scaleY: Wo,
  scaleZ: Wo,
  skew: vr,
  skewX: vr,
  skewY: vr,
  distance: _e,
  translateX: _e,
  translateY: _e,
  translateZ: _e,
  x: _e,
  y: _e,
  z: _e,
  perspective: _e,
  transformPerspective: _e,
  opacity: bl,
  originX: rb,
  originY: rb,
  originZ: _e
}, dm = {
  // Border props
  borderWidth: _e,
  borderTopWidth: _e,
  borderRightWidth: _e,
  borderBottomWidth: _e,
  borderLeftWidth: _e,
  borderRadius: _e,
  borderTopLeftRadius: _e,
  borderTopRightRadius: _e,
  borderBottomRightRadius: _e,
  borderBottomLeftRadius: _e,
  // Positioning props
  width: _e,
  maxWidth: _e,
  height: _e,
  maxHeight: _e,
  top: _e,
  right: _e,
  bottom: _e,
  left: _e,
  inset: _e,
  insetBlock: _e,
  insetBlockStart: _e,
  insetBlockEnd: _e,
  insetInline: _e,
  insetInlineStart: _e,
  insetInlineEnd: _e,
  // Spacing props
  padding: _e,
  paddingTop: _e,
  paddingRight: _e,
  paddingBottom: _e,
  paddingLeft: _e,
  paddingBlock: _e,
  paddingBlockStart: _e,
  paddingBlockEnd: _e,
  paddingInline: _e,
  paddingInlineStart: _e,
  paddingInlineEnd: _e,
  margin: _e,
  marginTop: _e,
  marginRight: _e,
  marginBottom: _e,
  marginLeft: _e,
  marginBlock: _e,
  marginBlockStart: _e,
  marginBlockEnd: _e,
  marginInline: _e,
  marginInlineStart: _e,
  marginInlineEnd: _e,
  // Typography
  fontSize: _e,
  // Misc
  backgroundPositionX: _e,
  backgroundPositionY: _e,
  ...Yk,
  zIndex: yb,
  // SVG
  fillOpacity: bl,
  strokeOpacity: bl,
  numOctaves: yb
}, Gk = {
  ...dm,
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
}, NS = (t) => Gk[t], Pk = /* @__PURE__ */ new Set([xh, Sh]);
function CS(t, a) {
  let s = NS(t);
  return Pk.has(s) || (s = da), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const Kk = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Xk(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !Kk.has(u) && Ws(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = CS(s, o);
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
        const w = vS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !xS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = vb(o), p = vb(u), y = ab(o), m = ab(u);
    if (y !== m && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (fb(f) && fb(p))
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
const TS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function gc(t) {
  return H5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Jk } = /* @__PURE__ */ K1(queueMicrotask, !1), Wk = {
  y: !1
};
function ez() {
  return Wk.y;
}
function RS(t, a) {
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
  const [i, o, u] = RS(t, s);
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
    }, T = (R) => {
      if (!tz(R))
        return;
      y = !1;
      const N = a(f, R);
      typeof N == "function" && (m = N, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", T, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const _S = (t, a) => a ? t === a ? !0 : _S(t, a.parentElement) : !1, az = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, rz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function sz(t) {
  return rz.has(t.tagName) || t.isContentEditable === !0;
}
const vc = /* @__PURE__ */ new WeakSet();
function bb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function $f(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const iz = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = bb(() => {
    if (vc.has(s))
      return;
    $f(s, "down");
    const o = bb(() => {
      $f(s, "up");
    }), u = () => $f(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function xb(t) {
  return az(t) && !0;
}
const Sb = /* @__PURE__ */ new WeakSet();
function lz(t, a, s = {}) {
  const [i, o, u] = RS(t, s), f = (p) => {
    const y = p.currentTarget;
    if (!xb(p) || Sb.has(p))
      return;
    vc.add(y), s.stopPropagation && Sb.add(p);
    const m = a(y, p), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), vc.has(y) && vc.delete(y), xb(S) && typeof m == "function" && m(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || _S(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((p) => {
    (s.useGlobalTarget ? window : p).addEventListener("pointerdown", f, o), gc(p) && (p.addEventListener("focus", (m) => iz(m, o)), !sz(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), u;
}
const oz = [...ES, nn, da], cz = (t) => oz.find(jS(t)), wb = () => ({ min: 0, max: 0 }), MS = () => ({
  x: wb(),
  y: wb()
}), uz = /* @__PURE__ */ new WeakMap();
function Pc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function xl(t) {
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
function Kc(t) {
  return Pc(t.animate) || hm.some((a) => xl(t[a]));
}
function AS(t) {
  return !!(Kc(t) || t.variants);
}
function dz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (Sn(o))
      t.addValue(i, o);
    else if (Sn(u))
      t.addValue(i, _c(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, _c(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const Mc = { current: null }, mm = { current: !1 }, fz = typeof window < "u";
function DS() {
  if (mm.current = !0, !!fz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Mc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Mc.current = !1;
}
const jb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Ac = {};
function kS(t) {
  Ac = t;
}
function hz() {
  return Ac;
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
      const S = Hn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = s.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Kc(s), this.isVariantNode = AS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const S in w) {
      const j = w[S];
      m[S] !== void 0 && Sn(j) && j.set(m[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, uz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (mm.current || DS(), this.shouldReduceMotion = Mc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && pS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: y, ease: m, duration: b } = s.accelerate, v = new hS({
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
    const i = si.has(a);
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
    for (a in Ac) {
      const s = Ac[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : MS();
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
    for (let i = 0; i < jb.length; i++) {
      const o = jb[i];
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
    return i === void 0 && s !== void 0 && (i = _c(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (k1(i) || z1(i)) ? i = parseFloat(i) : !cz(i) && da.test(s) && (i = CS(a, s)), this.setBaseTarget(a, Sn(i) ? i.get() : i)), Sn(i) ? i.get() : i;
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
    return o !== void 0 && !Sn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new $1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Jk.render(this.render);
  }
}
class zS extends mz {
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
    Sn(a) && (this.childSubscription = a.on("change", (s) => {
      this.current && (this.current.textContent = `${s}`);
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
}, bz = ri.length;
function xz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < bz; u++) {
    const f = ri[u], p = t[f];
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
      const m = TS(p, dm[f]);
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
    if (si.has(y)) {
      f = !0;
      continue;
    } else if (Q1(y)) {
      o[y] = m;
      continue;
    } else {
      const b = TS(m, dm[y]);
      y.startsWith("origin") ? (p = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = xz(a, t.transform, s) : i.transform && (i.transform = "none")), p) {
    const { originX: y = "50%", originY: m = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${m} ${b}`;
  }
}
function OS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function Eb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const nl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (_e.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = Eb(t, a.target.x), i = Eb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, Sz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = da.parse(t);
    if (o.length > 5)
      return i;
    const u = da.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, p = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= p, o[1 + f] /= y;
    const m = _l(p, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), u(o);
  }
}, wz = {
  borderRadius: {
    ...nl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: nl,
  borderTopRightRadius: nl,
  borderBottomLeftRadius: nl,
  borderBottomRightRadius: nl,
  boxShadow: Sz
};
function LS(t, { layout: a, layoutId: s }) {
  return si.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!wz[t] || t === "opacity");
}
function gm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (Sn(i[f]) || o && Sn(o[f]) || LS(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function jz(t) {
  return window.getComputedStyle(t);
}
class Ez extends zS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = OS;
  }
  readValueFromInstance(a, s) {
    if (si.has(s))
      return this.projection?.isProjecting ? fh(s) : KD(a, s);
    {
      const i = jz(a), o = (Q1(s) ? i.getPropertyValue(s) : i[s]) || 0;
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
function $S(t, {
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
const US = /* @__PURE__ */ new Set([
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
]), BS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function _z(t, a, s, i) {
  OS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(US.has(o) ? o : um(o), a.attrs[o]);
}
function VS(t, a, s) {
  const i = gm(t, a, s);
  for (const o in t)
    if (Sn(t[o]) || Sn(a[o])) {
      const u = ri.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Mz extends zS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = MS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (si.has(s)) {
      const i = NS(s);
      return i && i.default || 0;
    }
    return s = US.has(s) ? s : um(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return VS(a, s, i);
  }
  build(a, s, i) {
    $S(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    _z(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = BS(a.tagName), super.mount(a);
  }
}
const Az = hm.length;
function IS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? IS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Az; s++) {
    const i = hm[s], o = t.props[i];
    (xl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function HS(t, a) {
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
  let a = zz(t), s = Nb(), i = !0, o = !1;
  const u = (m) => (b, v) => {
    const w = Zr(t, v, m === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...T } = w;
      b = { ...b, ...T, ...j };
    }
    return b;
  };
  function f(m) {
    a = m(t);
  }
  function p(m) {
    const { props: b } = t, v = IS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let N = 0; N < kz; N++) {
      const D = Dz[N], O = s[D], C = b[D] !== void 0 ? b[D] : v[D], V = xl(C), Q = D === m ? O.isActive : null;
      Q === !1 && (T = N);
      let te = C === v[D] && C !== b[D] && V;
      if (te && (i || o) && t.manuallyAnimateOnMount && (te = !1), O.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !O.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !C && !O.prevProp || // Or if the prop doesn't define an animation
      Pc(C) || typeof C == "boolean")
        continue;
      if (D === "exit" && O.isActive && Q !== !0) {
        O.prevResolvedValues && (j = {
          ...j,
          ...O.prevResolvedValues
        });
        continue;
      }
      const M = Lz(O.prevProp, C);
      let F = M || // If we're making this variant active, we want to always make it active
      D === m && O.isActive && !te && V || // If we removed a higher-priority variant (i is in reverse order)
      N > T && V, k = !1;
      const I = Array.isArray(C) ? C : [C];
      let J = I.reduce(u(D), {});
      Q === !1 && (J = {});
      const { prevResolvedValues: he = {} } = O, K = {
        ...he,
        ...J
      }, ie = ($) => {
        F = !0, S.has($) && (k = !0, S.delete($)), O.needsAnimating[$] = !0;
        const q = t.getValue($);
        q && (q.liveStyle = !1);
      };
      for (const $ in K) {
        const q = J[$], oe = he[$];
        if (j.hasOwnProperty($))
          continue;
        let _ = !1;
        yh(q) && yh(oe) ? _ = !HS(q, oe) : _ = q !== oe, _ ? q != null ? ie($) : S.add($) : q !== void 0 && S.has($) ? ie($) : O.protectedKeys[$] = !0;
      }
      O.prevProp = C, O.prevResolvedValues = J, O.isActive && (j = { ...j, ...J }), (i || o) && t.blockInitialAnimation && (F = !1);
      const A = te && M;
      F && (!A || k) && w.push(...I.map(($) => {
        const q = { type: D };
        if (typeof $ == "string" && (i || o) && !A && t.manuallyAnimateOnMount && t.parent) {
          const { parent: oe } = t, _ = Zr(oe, $);
          if (oe.enteringChildren && _) {
            const { delayChildren: ae } = _.transition || {};
            q.delay = gS(oe.enteringChildren, t, ae);
          }
        }
        return {
          animation: $,
          options: q
        };
      }));
    }
    if (S.size) {
      const N = {};
      if (typeof b.initial != "boolean") {
        const D = Zr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        D && D.transition && (N.transition = D.transition);
      }
      S.forEach((D) => {
        const O = t.getBaseTarget(D), C = t.getValue(D);
        C && (C.liveStyle = !0), N[D] = O ?? null;
      }), w.push({ animation: N });
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
      s = Nb(), o = !0;
    }
  };
}
function Lz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !HS(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Nb() {
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
function Cb(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function $z(t) {
  return Sn(t) ? t.get() : t;
}
const vm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Tb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Uz(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Tb(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Tb(t[o], null);
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
    if (gc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = gc(i) && i.offsetWidth || 0, u = gc(i) && i.offsetHeight || 0, f = getComputedStyle(s), p = this.props.sizeRef.current;
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
    const { width: w, height: S, top: j, left: T, right: R, bottom: N } = y.current;
    if (a || u === !1 || !p.current || !w || !S)
      return;
    const D = s === "left" ? `left: ${T}` : `right: ${R}`, O = i === "bottom" ? `bottom: ${N}` : `top: ${j}`;
    p.current.dataset.motionPopId = f;
    const C = document.createElement("style");
    m && (C.nonce = m);
    const V = o ?? document.head;
    return V.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${D}px !important;
            ${O}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), V.contains(C) && V.removeChild(C);
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
      for (const T of b.values())
        if (!T)
          return;
      i && i();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [s, b, i]);
  return u && w && (S = { ...S }), g.useMemo(() => {
    b.forEach((j, T) => b.set(T, !1));
  }, [s]), g.useEffect(() => {
    !s && !b.size && i && i();
  }, [s]), t = c.jsx(Iz, { pop: f === "popLayout", isPresent: s, anchorX: p, anchorY: y, root: m, children: t }), c.jsx(Fc.Provider, { value: S, children: t });
};
function qz() {
  return /* @__PURE__ */ new Map();
}
function Fz(t = !0) {
  const a = g.useContext(Fc);
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
const ec = (t) => t.key || "";
function Rb(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const qS = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: p = "left", anchorY: y = "top", root: m }) => {
  const [b, v] = Fz(f), w = g.useMemo(() => Rb(t), [t]), S = f && !b ? [] : w.map(ec), j = g.useRef(!0), T = g.useRef(w), R = Wh(() => /* @__PURE__ */ new Map()), N = g.useRef(/* @__PURE__ */ new Set()), [D, O] = g.useState(w), [C, V] = g.useState(w);
  D1(() => {
    j.current = !1, T.current = w;
    for (let M = 0; M < C.length; M++) {
      const F = ec(C[M]);
      S.includes(F) ? (R.delete(F), N.current.delete(F)) : R.get(F) !== !0 && R.set(F, !1);
    }
  }, [C, S.length, S.join("-")]);
  const Q = [];
  if (w !== D) {
    let M = [...w];
    for (let F = 0; F < C.length; F++) {
      const k = C[F], I = ec(k);
      S.includes(I) || (M.splice(F, 0, k), Q.push(k));
    }
    return u === "wait" && Q.length && (M = Q), V(Rb(M)), O(w), null;
  }
  const { forceRender: te } = g.useContext(A1);
  return c.jsx(c.Fragment, { children: C.map((M) => {
    const F = ec(M), k = f && !b ? !1 : w === C || S.includes(F), I = () => {
      if (N.current.has(F))
        return;
      if (R.has(F))
        N.current.add(F), R.set(F, !0);
      else
        return;
      let J = !0;
      R.forEach((he) => {
        he || (J = !1);
      }), J && (te?.(), V(T.current), f && v?.(), i && i());
    };
    return c.jsx(Hz, { isPresent: k, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: m, onExitComplete: k ? void 0 : I, anchorX: p, anchorY: y, children: M }, F);
  }) });
}, ym = g.createContext({ strict: !1 }), _b = {
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
let Mb = !1;
function Yz() {
  if (Mb)
    return;
  const t = {};
  for (const a in _b)
    t[a] = {
      isEnabled: (s) => _b[a].some((i) => !!s[i])
    };
  kS(t), Mb = !0;
}
function FS() {
  return Yz(), hz();
}
function wh(t) {
  const a = FS();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  kS(a);
}
function bm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Uf(a)), o = g.useRef(void 0);
  if (!Uf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, wh(f);
  }
  return g.useEffect(() => {
    Uf(a) && a().then(({ renderer: u, ...f }) => {
      wh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(ym.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Uf(t) {
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
function Dc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Gz.has(t);
}
let YS = (t) => !Dc(t);
function Pz(t) {
  typeof t == "function" && (YS = (a) => a.startsWith("on") ? !Dc(a) : t(a));
}
try {
  Pz(require("@emotion/is-prop-valid").default);
} catch {
}
function Kz(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || Sn(t[o]) || (YS(o) || s === !0 && Dc(o) || !a && !Dc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Xc = /* @__PURE__ */ g.createContext({});
function Xz(t, a) {
  if (Kc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || xl(s) ? s : void 0,
      animate: xl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function Qz(t) {
  const { initial: a, animate: s } = Xz(t, g.useContext(Xc));
  return g.useMemo(() => ({ initial: a, animate: s }), [Ab(a), Ab(s)]);
}
function Ab(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const xm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function GS(t, a, s) {
  for (const i in a)
    !Sn(a[i]) && !LS(i, s) && (t[i] = a[i]);
}
function Zz({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = xm();
    return pm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function Jz(t, a) {
  const s = t.style || {}, i = {};
  return GS(i, s, t), Object.assign(i, Zz(t, a)), i;
}
function Wz(t, a) {
  const s = {}, i = Jz(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const PS = () => ({
  ...xm(),
  attrs: {}
});
function e4(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = PS();
    return $S(u, a, BS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    GS(u, t.style, t), o.style = { ...u, ...o.style };
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
  const y = (f ?? Sm(t) ? e4 : Wz)(a, i, o, t), m = Kz(a, typeof t == "string", u), b = t !== g.Fragment ? { ...m, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => Sn(v) ? v.get() : v, [v]);
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
  const y = Kc(t), m = AS(t);
  a && m && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), p === void 0 && (p = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? p : f;
  if (v && typeof v != "boolean" && !Pc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = cm(t, w[S]);
      if (j) {
        const { transitionEnd: T, transition: R, ...N } = j;
        for (const D in N) {
          let O = N[D];
          if (Array.isArray(O)) {
            const C = b ? O.length - 1 : 0;
            O = O[C];
          }
          O !== null && (o[D] = O);
        }
        for (const D in T)
          o[D] = T[D];
      }
    }
  }
  return o;
}
const KS = (t) => (a, s) => {
  const i = g.useContext(Xc), o = g.useContext(Fc), u = () => a4(t, a, i, o);
  return s ? u() : Wh(u);
}, s4 = /* @__PURE__ */ KS({
  scrapeMotionValuesFromProps: gm,
  createRenderState: xm
}), i4 = /* @__PURE__ */ KS({
  scrapeMotionValuesFromProps: VS,
  createRenderState: PS
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
  const { visualElement: f } = g.useContext(Xc), p = g.useContext(ym), y = g.useContext(Fc), m = g.useContext(vm), b = m.reducedMotion, v = m.skipAnimations, w = g.useRef(null), S = g.useRef(!1);
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
  const j = w.current, T = g.useContext(c4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && f4(w.current, s, o, T);
  const R = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && R.current && j.update(s, y);
  });
  const N = s[SS], D = g.useRef(!!N && typeof window < "u" && !window.MotionHandoffIsComplete?.(N) && window.MotionHasOptimisedAnimation?.(N));
  return D1(() => {
    S.current = !0, j && (R.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), D.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!D.current && j.animationState && j.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(N);
    }), D.current = !1), j.enteringChildren = void 0);
  }), j;
}
function f4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: p, layoutScroll: y, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : XS(t.parent)), t.projection.setOptions({
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
function XS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : XS(t.parent);
}
function Bf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && wh(i);
  const u = s ? s === "svg" : Sm(t), f = u ? i4 : s4;
  function p(m, b) {
    let v;
    const w = {
      ...g.useContext(vm),
      ...m,
      layoutId: h4(m)
    }, { isStatic: S } = w, j = Qz(m), T = f(m, S);
    if (!S && typeof window < "u") {
      m4();
      const R = p4(w);
      v = R.MeasureLayout, j.visualElement = d4(t, T, w, o, R.ProjectionNode, u);
    }
    return c.jsxs(Xc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, n4(t, m, o4(T, j.visualElement, b), T, S, a, u)] });
  }
  p.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(p);
  return y[l4] = t, y;
}
function h4({ layoutId: t }) {
  const a = g.useContext(A1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function m4(t, a) {
  g.useContext(ym).strict;
}
function p4(t) {
  const a = FS(), { drag: s, layout: i } = a;
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
    return Bf;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => Bf(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, Bf(f, void 0, t, a)), s.get(f))
  });
}
const wm = /* @__PURE__ */ g4(), v4 = (t, a) => a.isSVG ?? Sm(t) ? new Mz(a) : new Ez(a, {
  allowProjection: t !== g.Fragment
});
class y4 extends ii {
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
    Pc(a) && (this.unmountControls = a.subscribe(this.node));
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
class x4 extends ii {
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
function QS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Db(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, QS(a)));
}
class w4 extends ii {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = nz(a, (s, i) => (Db(this.node, i, "Start"), (o) => Db(this.node, o, "End"))));
  }
  unmount() {
  }
}
class j4 extends ii {
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
    this.unmount = Yc(Cb(this.node.current, "focus", () => this.onFocus()), Cb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function kb(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, QS(a)));
}
class E4 extends ii {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = lz(a, (o, u) => (kb(this.node, u, "Start"), (f, { success: p }) => kb(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const jh = /* @__PURE__ */ new WeakMap(), Vf = /* @__PURE__ */ new WeakMap(), N4 = (t) => {
  const a = jh.get(t.target);
  a && a(t);
}, C4 = (t) => {
  t.forEach(N4);
};
function T4({ root: t, ...a }) {
  const s = t || document;
  Vf.has(s) || Vf.set(s, {});
  const i = Vf.get(s), o = JSON.stringify(a);
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
class M4 extends ii {
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
  !mm.current && DS();
  const [t] = g.useState(Mc.current);
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
function ZS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Nh, a), () => window.removeEventListener(Nh, a);
}
var $4 = "wksjad0", U4 = "wksjad1", B4 = "wksjad2", V4 = "wksjad3", I4 = "wksjad4", H4 = "wksjad5", q4 = "wksjad6", F4 = "wksjad7", Y4 = "wksjad8", G4 = "wksjad9", P4 = "wksjada", K4 = "wksjadb", X4 = "wksjadc", Q4 = "wksjadd", Z4 = "wksjade", J4 = "wksjadf", W4 = "wksjadg", If = "wksjadh", eO = "wksjadi", tO = "wksjadj", nO = "wksjadk", aO = "wksjadl", rO = "wksjadm", sO = "wksjadn";
const Ch = 5, iO = 5e-3;
function JS(t, a = "") {
  return `${Sa}/deployments/${t}/artifacts${a}`;
}
function lO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [p, y] = g.useState(0), m = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    m.current?.abort();
    const w = new AbortController();
    return m.current = w, o(!0), f(null), fetch(`${JS(t)}?limit=${Ch}`, {
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
  }, [t, p]), g.useEffect(() => ZS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: p };
}
function oO(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Xs(t).then(({ voiceAssets: u }) => {
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
    /* @__PURE__ */ c.jsx(bm, { features: jm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: F4, children: /* @__PURE__ */ c.jsx(qS, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, T = JS(
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
                    (N) => N === S.utteranceId ? null : S.utteranceId
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
                    /* @__PURE__ */ c.jsx("span", { className: If, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: eO, children: R })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: If, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: tO, children: uO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > iO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: If, "aria-hidden": "true", children: "·" }),
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
                  href: T,
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
                src: T,
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
function WS() {
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
  const t = WS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function ew(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = WS(), o = () => {
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
const tw = 360;
var mO = "_1s59p180", pO = "_1s59p181", gO = "_1s59p182", vO = "_1s59p183", yO = "_1s59p184", bO = "_1s59p185", xO = "_1s59p186", SO = "_1s59p188", wO = "_1s59p189", zb = "_1s59p18a", jO = "_1s59p18c", EO = "_1s59p18d", NO = "_1s59p18e", CO = "_1s59p18f", TO = "_1s59p18g", RO = "_1s59p18i";
function _O(t) {
  const a = ei(), [s, i] = g.useState("idle"), [o, u] = g.useState(null), [f, p] = g.useState(/* @__PURE__ */ new Map()), [y, m] = g.useState(null), [b, v] = g.useState(null), w = g.useRef(null);
  g.useEffect(() => () => {
    w.current?.();
  }, []), g.useEffect(() => {
    O4({ busy: s === "starting" || s === "running" });
  }, [s]);
  const S = g.useCallback(
    (q) => {
      const oe = q.status;
      (oe === "completed" || oe === "partial") && pn.success(
        oe === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), j = g.useCallback(async () => {
    i("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const q = await oT(t.deploymentId, t.createPayload);
      u(q.runId), i("running"), w.current?.(), w.current = Py(
        t.deploymentId,
        q.runId,
        (oe) => Ob(
          oe,
          p,
          i,
          (_) => {
            v(_), S(_);
          },
          t.deploymentId,
          q.runId
        ),
        () => i("error")
      );
    } catch (q) {
      i("error"), m(Hf(q));
    }
  }, [t.deploymentId, t.createPayload, S]);
  g.useEffect(() => L4(() => {
    (s === "idle" || s === "terminal" || s === "error") && j();
  }), [s, j]);
  const T = g.useCallback(async () => {
    if (o)
      try {
        await cT(t.deploymentId, o);
      } catch (q) {
        m(Hf(q));
      }
  }, [t.deploymentId, o]), R = Array.from(f.values()).sort((q, oe) => q.globalIndex - oe.globalIndex), N = s === "starting" || s === "running", D = b?.status === "partial", O = R.filter((q) => q.status === "running").length, C = R.filter((q) => q.status === "completed").length, V = s === "starting" || s === "running" || R.length > 0, Q = R.filter((q) => q.status === "failed"), te = (() => {
    if (s !== "terminal" || Q.length === 0) return null;
    const q = /* @__PURE__ */ new Map();
    for (const re of Q) {
      const G = re.failureCategory ?? "unknown";
      q.set(G, (q.get(G) ?? 0) + 1);
    }
    let oe = "unknown", _ = 0;
    for (const [re, G] of q)
      G > _ && (oe = re, _ = G);
    const ae = R.length;
    return { category: oe, count: _, total: ae };
  })(), M = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, F = "Check the run detail page for the per-segment error log.", k = y?.toLowerCase().includes("unmapped") ?? !1, I = t.diagnostics ?? [], J = I.find((q) => q.status === "fail"), he = s === "starting" ? "Starting…" : s === "running" ? "Generating…" : "Generate", K = !t.canGenerate || N || !!J, ie = s === "starting" || s === "running", A = ie ? "running" : K ? "blocked" : "idle", $ = !ew(tw) || ie;
  return /* @__PURE__ */ c.jsxs("div", { className: mO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: pO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: vO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: yO, children: [
          /* @__PURE__ */ c.jsx("span", { className: gO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          V && /* @__PURE__ */ c.jsxs("span", { className: TO, children: [
            /* @__PURE__ */ c.jsx("span", { className: RO, "aria-hidden": "true" }),
            O > 0 ? `${O} in flight` : `${C} done`
          ] })
        ] }),
        I.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: bO, "aria-label": "Pre-flight checks", children: I.map((q) => /* @__PURE__ */ c.jsxs("li", { className: xO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: SO,
              "data-status": q.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: wO, children: q.label }),
          q.detail && /* @__PURE__ */ c.jsx("span", { className: zb, children: q.detail })
        ] }, q.label)) }) : /* @__PURE__ */ c.jsx("span", { className: zb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: jO, "data-state": A, children: [
        $ ? /* @__PURE__ */ c.jsxs(
          Qe,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: K,
            loading: ie,
            children: [
              !ie && /* @__PURE__ */ c.jsx("span", { className: EO, "aria-hidden": "true", children: "▶" }),
              he
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: NO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: CO, children: "↑" })
        ] }),
        N && /* @__PURE__ */ c.jsx(
          Qe,
          {
            variant: "ghost",
            size: "xs",
            onClick: T,
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
          k && /* @__PURE__ */ c.jsx(
            Qe,
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
    te && /* @__PURE__ */ c.jsxs(Dn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        te.count,
        " of ",
        te.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: te.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: M[te.category] ?? F })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${g1.secondary} ${v1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    D && b && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "secondary",
          disabled: !!J,
          onClick: async () => {
            try {
              const q = await h1(t.deploymentId, b.runId);
              u(q.runId), p(/* @__PURE__ */ new Map()), v(null), i("running"), w.current?.(), w.current = Py(
                t.deploymentId,
                q.runId,
                (oe) => Ob(oe, p, i, v, t.deploymentId, q.runId),
                () => i("error")
              );
            } catch (q) {
              m(Hf(q)), i("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: QR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: R.map((q) => /* @__PURE__ */ c.jsxs("tr", { className: ZR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: q.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Jr, { tone: MO(q.status), children: q.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: q.durationMs ? `${q.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: q.failureCategory ?? "" })
      ] }, q.globalIndex)) })
    ] })
  ] });
}
async function Ob(t, a, s, i, o, u) {
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
function MO(t) {
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
function Hf(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const AO = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Lb = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], $b = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
];
function DO(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function kO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function zO(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? [] : a.map((s, i) => {
    const o = Lb[i % Lb.length], u = $b[i % $b.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: DO(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: kO(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function nw(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function OO(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = nw(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s;
}
function LO(t, a) {
  const s = t.find((i) => nw(i.presetName) === a);
  return s ? s.vector : null;
}
function $O(t) {
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
function UO(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function BO(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function qf(t, a) {
  return [...a].sort((s, i) => Rh(t, s) - Rh(t, i)).map((s) => BO(t, s)).join("").trim();
}
function Ub(t, a) {
  return Math.min(...a.segIds.map((s) => Rh(t, s)));
}
function aw(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Bb(t, a) {
  return a.every((s) => !aw(t, s));
}
function rw(t, a) {
  return [...a].sort((s, i) => Ub(t, s) - Ub(t, i));
}
function VO(t, a) {
  const s = {};
  return rw(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function IO(t) {
  return Th(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function HO(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
const cl = {
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
function tc(t, a) {
  return t.find((s) => s.id === a) ?? t[0] ?? cl;
}
function Vb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var qO = "_171z55w1", FO = "_171z55w2", YO = "_171z55w3", Ff = "_171z55w4", GO = "_171z55w5", PO = "_171z55w6", KO = "_171z55w7", XO = "_171z55w8", QO = "_171z55w9", ZO = "_171z55wa", JO = "_171z55wb", WO = "_171z55wc", eL = "_171z55wd", tL = "_171z55we", nL = "_171z55wh", aL = "_171z55wi", Ib = "_171z55wj", Hb = "_171z55wk _171z55wj", rL = "_171z55wl", sL = "_171z55wm", iL = "_171z55wn", lL = "_171z55wo", qb = "_171z55wp", Fb = "_171z55wq", oL = "_171z55wr", cL = "_171z55ws", uL = "_171z55wt", dL = "_171z55wu", fL = "_171z55wv", hL = "_171z55ww", mL = "_171z55wx", pL = "_171z55wy", gL = "_171z55wz", vL = "_171z55w10", yL = "_171z55w11", bL = "_171z55w12", xL = "_171z55w13", SL = "_171z55w14", Yb = "_171z55w15", wL = "_171z55w16", jL = "_171z55w17", EL = "_171z55w18", NL = "_171z55w19", CL = "_171z55w1a", TL = "_171z55w1b", RL = "_171z55w1c", _L = "_171z55w1d", ML = "_171z55w1e", AL = "_171z55w1f", DL = "_171z55w1g", kL = "_171z55w1h", zL = "_171z55w1i", OL = "_171z55w1j", LL = "_171z55w1k", $L = "_171z55w1l", UL = "_171z55w1m", BL = "_171z55w1n", VL = "_171z55w1o", IL = "_171z55w1p", HL = "_171z55w1q", qL = "_171z55w1r";
function FL({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i,
  mappings: o,
  onQueueChange: u
}) {
  const f = g.useMemo(() => zO(t), [t]), p = g.useMemo(() => OO(a), [a]), y = s, m = g.useMemo(() => $O(y), [y]), b = f[0]?.id ?? "", v = p[0]?.id ?? "", [w, S] = g.useState("voice"), [j, T] = g.useState(""), R = g.useMemo(
    () => ZL(o, f),
    [o, f]
  ), [N, D] = g.useState([]), [O, C] = g.useState([]), [V, Q] = g.useState(null), [te, M] = g.useState(null), [F, k] = g.useState(b), [I, J] = g.useState(v), [he, K] = g.useState(null), [ie, A] = g.useState(null), [Y, $] = g.useState(null), [q, oe] = g.useState(null), [_, ae] = g.useState(!1), re = g.useRef(null), G = g.useRef(null), U = g.useRef(/* @__PURE__ */ new Map()), W = g.useRef(null), ue = g.useRef(1e3), ve = g.useCallback(() => (ue.current += 1, `job-${ue.current}`), []), Ce = g.useMemo(() => {
    const H = /* @__PURE__ */ new Map();
    return Th(m).forEach((pe, ye) => H.set(pe.id, ye)), H;
  }, [m]), Ge = g.useCallback((H) => Ce.get(H) ?? Number.MAX_SAFE_INTEGER, [Ce]);
  g.useEffect(() => {
    const H = new Set(Th(m).map((pe) => pe.id));
    D((pe) => {
      const ye = pe.filter((qe) => qe.segIds.every((Je) => H.has(Je)));
      return ye.length === pe.length ? pe : ye;
    });
  }, [m]);
  const Ee = g.useCallback((H) => {
    const pe = re.current;
    if (!pe || !H) return { top: 60, left: 0 };
    const ye = H.getBoundingClientRect(), qe = pe.getBoundingClientRect();
    let Je = ye.left - qe.left + pe.scrollLeft;
    const Me = ye.bottom - qe.top + pe.scrollTop + 10, Ve = Math.max(0, pe.clientWidth - 318);
    return Je = Math.max(0, Math.min(Je, Ve)), { top: Me, left: Je };
  }, []), Ze = g.useCallback(() => {
    C([]), Q(null), M(null), K(null);
  }, []), Ie = g.useCallback(
    (H, pe) => {
      const ye = [...H.segIds].sort((Je, Me) => Ge(Je) - Ge(Me))[0];
      if (!ye) return;
      const qe = pe ?? U.current.get(ye) ?? null;
      M(H.id), C([...H.segIds]), Q(ye), k(H.voiceId), J(H.emotion), K(Ee(qe)), $(H.id);
    },
    [Ge, Ee]
  ), Pe = g.useCallback(
    (H, pe, ye) => {
      const qe = aw(N, H);
      if (qe) {
        Ie(qe, pe);
        return;
      }
      const Je = Ee(pe);
      if (ye && V != null && te == null) {
        const Me = Ge(V), Ve = Ge(H), Fe = UO(m, Math.min(Me, Ve), Math.max(Me, Ve));
        if (Bb(N, Fe)) {
          C(Fe), M(null), K(Je);
          return;
        }
      }
      C([H]), Q(H), M(null), K(Je);
    },
    [N, m, V, te, Ee, Ie, Ge]
  ), cn = g.useCallback(() => {
    if (te) {
      D(
        (ye) => ye.map(
          (qe) => qe.id === te ? { ...qe, voiceId: F, emotion: I, status: "queued" } : qe
        )
      ), $(te), C([]), Q(null), M(null), K(null);
      return;
    }
    if (O.length === 0 || !Bb(N, O)) return;
    const H = ve(), pe = { id: H, segIds: [...O], voiceId: F, emotion: I, status: "queued" };
    D((ye) => [...ye, pe]), $(H), C([]), Q(null), K(null);
  }, [te, O, N, F, I, ve]), Ct = g.useCallback((H) => {
    D((pe) => pe.filter((ye) => ye.id !== H)), $((pe) => pe === H ? null : pe), oe((pe) => pe === H ? null : pe), C([]), Q(null), M(null), K(null);
  }, []), Tt = g.useCallback((H) => {
    oe((pe) => pe === H ? null : H);
  }, []), Vt = g.useCallback((H) => {
    G.current?.scrollBy({ left: H * 280, behavior: "smooth" });
  }, []), kt = g.useCallback(
    (H) => {
      if (p.length === 0) return;
      const pe = p.findIndex((qe) => qe.id === I), ye = p[(pe + H + p.length) % p.length];
      J(ye.id), W.current?.querySelector(`[data-emotion="${ye.id}"]`)?.focus();
    },
    [p, I]
  ), sn = he ? te ?? O[0] ?? "new" : null;
  g.useEffect(() => {
    if (sn == null) return;
    const H = requestAnimationFrame(() => {
      W.current?.querySelector(`[data-voice="${F}"]`)?.focus();
    });
    return () => cancelAnimationFrame(H);
  }, [sn]);
  const Xt = g.useCallback(
    (H) => {
      H.key === "Escape" && (H.preventDefault(), Ze());
    },
    [Ze]
  ), Rt = g.useMemo(() => {
    const H = /* @__PURE__ */ new Map();
    for (const pe of N) for (const ye of pe.segIds) H.set(ye, pe);
    return H;
  }, [N]), $t = g.useMemo(() => rw(m, N), [m, N]), _t = g.useMemo(
    () => $t.map((H) => {
      const pe = LO(a, H.emotion);
      return {
        text: qf(m, H.segIds),
        voice_asset_id: H.voiceId,
        speaker_label: (tc(f, H.voiceId) ?? cl).name,
        emotion: pe ? { mode: "emotion_vector", vector: pe } : null
      };
    }),
    [$t, m, f, a]
  ), we = g.useRef(null);
  g.useEffect(() => {
    const H = JSON.stringify(_t);
    H !== we.current && (we.current = H, u?.(_t));
  }, [_t, u]);
  const Le = g.useMemo(() => {
    const H = /* @__PURE__ */ new Map();
    for (const pe of N) {
      const ye = [...pe.segIds].sort((qe, Je) => Ge(qe) - Ge(Je))[0];
      ye && H.set(pe.id, ye);
    }
    return H;
  }, [N, Ge]), Xe = g.useMemo(() => VO(m, N), [m, N]), ot = g.useMemo(() => {
    const H = /* @__PURE__ */ new Set();
    for (const pe of N) for (const ye of pe.segIds) H.add(ye);
    return H.size;
  }, [N]), Ut = g.useMemo(() => IO(m), [m]), zt = HO(N), qn = tc(f, F) ?? cl, [un, gn] = g.useState(null), vt = j.trim().toLowerCase(), mt = g.useMemo(
    () => f.filter(
      (H) => !vt || H.name.toLowerCase().includes(vt) || H.role.toLowerCase().includes(vt)
    ),
    [f, vt]
  ), ce = g.useMemo(
    () => R.filter(
      (H) => !vt || H.name.toLowerCase().includes(vt) || (H.voice?.name.toLowerCase().includes(vt) ?? !1)
    ),
    [R, vt]
  ), Ue = w === "character" ? `${ce.length} character${ce.length === 1 ? "" : "s"}` : `${mt.length} voice${mt.length === 1 ? "" : "s"}`, ze = (H) => H.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: YO, children: [
    /* @__PURE__ */ c.jsxs("div", { style: YL, children: [
      /* @__PURE__ */ c.jsxs("span", { className: GO, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: ot }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Ut }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: KO,
          "aria-pressed": _,
          onClick: () => ae((H) => !H),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: _ ? "check" : "edit" }),
            _ ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    _ ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (H) => i(H.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: KL
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: re,
        className: PO,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (H) => {
          H.shiftKey && H.preventDefault();
        },
        onClick: () => {
          he && Ze();
        },
        children: [
          m.map((H) => /* @__PURE__ */ c.jsx("p", { className: XO, children: H.segs.map((pe) => {
            const ye = Rt.get(pe.id), qe = O.includes(pe.id), Je = !!ye && (ie === ye.id || Y === ye.id), Me = !!ye && Le.get(ye.id) === pe.id, Ve = ye ? tc(f, ye.voiceId) : null;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              Me && Ve && /* @__PURE__ */ c.jsx("span", { className: ZO, style: QL(Ve), "aria-hidden": "true", children: Ve.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Fe) => {
                    Fe && U.current.set(pe.id, Fe);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": qe || !!ye,
                  "aria-label": ye ? `${Ve?.name ?? "voice"} · ${pe.text.trim()}` : pe.text.trim(),
                  className: QO,
                  style: XL(qe, Ve, Je, pe.kind),
                  onClick: (Fe) => {
                    Fe.stopPropagation(), Pe(pe.id, Fe.currentTarget, Fe.shiftKey);
                  },
                  onKeyDown: (Fe) => {
                    (Fe.key === "Enter" || Fe.key === " ") && (Fe.preventDefault(), Pe(pe.id, Fe.currentTarget, Fe.shiftKey));
                  },
                  onMouseEnter: ye ? () => A(ye.id) : void 0,
                  onMouseLeave: ye ? () => A(null) : void 0,
                  children: pe.text
                }
              )
            ] }, pe.id);
          }) }, H.id)),
          he && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: W,
              className: JO,
              role: "dialog",
              "aria-label": te ? "Edit casting" : "Cast voice",
              style: { top: he.top, left: he.left },
              onClick: ze,
              onMouseDown: ze,
              onKeyDown: Xt,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: WO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: eL, children: te ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: tL,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: Ze,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: nL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: aL, role: "radiogroup", "aria-label": "Cast source", children: [
                    /* @__PURE__ */ c.jsx(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": w === "voice",
                        className: w === "voice" ? Hb : Ib,
                        onClick: () => {
                          S("voice"), T("");
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
                        className: w === "character" ? Hb : Ib,
                        onClick: () => {
                          S("character"), T("");
                        },
                        children: "Characters"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: rL, children: Ue })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: sL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: JL, children: "search" }),
                  /* @__PURE__ */ c.jsx(
                    "input",
                    {
                      className: iL,
                      value: j,
                      onChange: (H) => T(H.target.value),
                      placeholder: w === "character" ? "Search characters…" : "Search voices…",
                      "aria-label": w === "character" ? "Search characters" : "Search voices"
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: lL, role: "radiogroup", "aria-label": w === "character" ? "Character" : "Voice", children: [
                  w === "voice" && mt.map((H) => {
                    const pe = un == null && F === H.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": pe,
                        className: qb,
                        style: Gb(H, pe),
                        onClick: () => {
                          k(H.id), gn(null);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Pb(H), children: H.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Fb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Kb(pe), children: H.name }),
                            /* @__PURE__ */ c.jsx("span", { style: WL, children: H.role })
                          ] }),
                          pe && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: H.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      H.id
                    );
                  }),
                  w === "character" && ce.map((H) => {
                    const pe = H.voice ?? cl, ye = un === H.id;
                    return /* @__PURE__ */ c.jsxs(
                      "button",
                      {
                        type: "button",
                        role: "radio",
                        "aria-checked": ye,
                        className: qb,
                        style: Gb(pe, ye),
                        onClick: () => {
                          k(H.voiceId), gn(H.id);
                        },
                        children: [
                          /* @__PURE__ */ c.jsx("span", { style: Pb(pe), children: pe.initial }),
                          /* @__PURE__ */ c.jsxs("span", { className: Fb, children: [
                            /* @__PURE__ */ c.jsx("span", { style: Kb(ye), children: H.name }),
                            /* @__PURE__ */ c.jsx("span", { style: e6, children: pe.name })
                          ] }),
                          ye && /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 18, color: pe.color, flexShrink: 0 }, children: "check" })
                        ]
                      },
                      H.id
                    );
                  }),
                  (w === "voice" && mt.length === 0 || w === "character" && ce.length === 0) && /* @__PURE__ */ c.jsx("div", { className: oL, children: w === "character" ? R.length === 0 ? "No characters mapped yet." : `No matches for “${j}”` : f.length === 0 ? "No voices yet — add voice assets." : `No matches for “${j}”` })
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: cL }),
                /* @__PURE__ */ c.jsxs("div", { className: uL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Ff, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: dL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (H) => {
                        H.key === "ArrowRight" || H.key === "ArrowDown" ? (H.preventDefault(), kt(1)) : (H.key === "ArrowLeft" || H.key === "ArrowUp") && (H.preventDefault(), kt(-1));
                      },
                      children: p.map((H) => {
                        const pe = I === H.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": pe,
                            "data-emotion": H.id,
                            tabIndex: pe ? 0 : -1,
                            className: fL,
                            style: t6(qn, pe),
                            onClick: () => J(H.id),
                            children: H.label
                          },
                          H.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: hL, children: /* @__PURE__ */ c.jsx("span", { className: mL, children: qf(m, O) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: pL, children: [
                  te && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: gL,
                      "aria-label": "Remove casting",
                      onClick: () => te && Ct(te),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: n6(qn),
                      onClick: cn,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        te ? "Update" : "Cast"
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
    /* @__PURE__ */ c.jsxs("div", { className: vL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: yL, children: [
        /* @__PURE__ */ c.jsxs("div", { className: bL, children: [
          /* @__PURE__ */ c.jsx("span", { className: Ff, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: xL, children: N.length }),
          zt && /* @__PURE__ */ c.jsx("span", { className: SL, children: zt })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsxs("span", { "aria-live": "polite", style: GL, children: [
            /* @__PURE__ */ c.jsx("span", { style: PL }),
            "Live"
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Yb, "aria-label": "Scroll segments left", onClick: () => Vt(-1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Yb, "aria-label": "Scroll segments right", onClick: () => Vt(1), disabled: N.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: G, className: wL, children: [
        $t.map((H) => {
          const pe = tc(f, H.voiceId) ?? cl, ye = AO[H.status], qe = Y === H.id || ie === H.id, Je = q === H.id, Me = qf(m, H.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${pe.name} ${Xe[H.id]} — ${Vb(p, H.emotion)} — ${ye.label}`,
              className: jL,
              style: a6(pe, qe),
              onClick: () => Ie(H),
              onKeyDown: (Ve) => {
                (Ve.key === "Enter" || Ve.key === " ") && (Ve.preventDefault(), Ie(H));
              },
              onMouseEnter: () => A(H.id),
              onMouseLeave: () => A(null),
              onFocus: () => $(H.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: EL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: NL, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: pe.color }, children: pe.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: CL, children: pe.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: TL, children: Xe[H.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: RL, children: Me }),
                /* @__PURE__ */ c.jsxs("div", { className: _L, children: [
                  /* @__PURE__ */ c.jsx("span", { style: r6(pe), children: Vb(p, H.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: ML, children: [
                    /* @__PURE__ */ c.jsx("span", { style: s6(ye) }),
                    /* @__PURE__ */ c.jsx("span", { style: i6(ye, H.status), children: ye.label })
                  ] })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: AL, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: DL,
                      "aria-label": Je ? "Pause preview" : "Preview audio",
                      onClick: (Ve) => {
                        Ve.stopPropagation(), Tt(H.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: Je ? "pause_circle" : "play_circle" }),
                        Je ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: kL,
                      "aria-label": `Remove ${Xe[H.id]}`,
                      onClick: (Ve) => {
                        Ve.stopPropagation(), Ct(H.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                Je && /* @__PURE__ */ c.jsx("div", { className: zL, children: /* @__PURE__ */ c.jsx("div", { style: l6(pe) }) })
              ]
            },
            H.id
          );
        }),
        N.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: OL, children: [
          /* @__PURE__ */ c.jsx("span", { className: LL, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: $L, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: UL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: BL, children: [
        /* @__PURE__ */ c.jsx("span", { className: Ff, style: { fontSize: 9.5, marginBottom: 0 }, children: "Voices" }),
        /* @__PURE__ */ c.jsx("div", { className: VL, children: f.map((H) => {
          const pe = N.some((ye) => ye.voiceId === H.id);
          return /* @__PURE__ */ c.jsxs("span", { className: IL, style: { border: `1px solid ${pe ? `rgba(${H.rgb},0.35)` : "rgba(70,72,74,0.3)"}` }, children: [
            /* @__PURE__ */ c.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: H.color, boxShadow: pe ? `0 0 8px rgba(${H.rgb},0.7)` : "none", flexShrink: 0 } }),
            /* @__PURE__ */ c.jsx("span", { className: HL, style: { color: pe ? "var(--on-surface)" : "var(--on-surface-variant)" }, children: H.lib })
          ] }, H.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: qL, children: [
        "Cast every phrase, then ",
        /* @__PURE__ */ c.jsx("strong", { children: "Generate" }),
        " from the top bar."
      ] })
    ] })
  ] });
}
const YL = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, GL = {
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
}, PL = { width: 6, height: 6, borderRadius: 999, background: "var(--acid-green, #22c55e)", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }, KL = {
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
function XL(t, a, s, i) {
  const o = { borderRadius: 4, padding: "1.5px 1px", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, u = "186,158,255";
  if (t) return { ...o, background: `rgba(${u},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${u},0.55)`, color: "var(--on-surface)" };
  if (a) {
    const f = s ? `, inset 0 0 0 1px rgba(${a.rgb},0.8)` : "";
    return { ...o, background: `rgba(${a.rgb},${s ? 0.22 : 0.12})`, boxShadow: `inset 0 -2px 0 ${a.color}${f}`, color: "var(--on-surface)" };
  }
  return { ...o, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function QL(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function ZL(t, a) {
  return t ? [...t.values()].filter((s) => s.isActive).map((s) => ({
    id: s.mappingId,
    name: s.characterName,
    voiceId: s.speakerVoiceAssetId,
    voice: a.find((i) => i.id === s.speakerVoiceAssetId) ?? null
  })) : [];
}
function Gb(t, a) {
  return a ? {
    border: `1px solid rgba(${t.rgb},0.5)`,
    background: `rgba(${t.rgb},0.12)`
  } : {};
}
function Pb(t) {
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
function Kb(t) {
  return {
    fontSize: 12,
    fontWeight: 600,
    color: t ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
}
const JL = { position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--on-surface-muted)", pointerEvents: "none" }, WL = { fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, e6 = { fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.02em", color: "var(--on-surface-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
function t6(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function n6(t) {
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
function a6(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function r6(t) {
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
function s6(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${FO} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function i6(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function l6(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${qO} 1.1s linear infinite` };
}
var o6 = "xq3iim0", c6 = "xq3iim1", u6 = "xq3iim2", d6 = "xq3iim3", f6 = "xq3iim4", h6 = "xq3iim5", m6 = "xq3iim6", p6 = "xq3iim7", g6 = "xq3iim8", v6 = "xq3iim9", y6 = "xq3iima", b6 = "xq3iimb", x6 = "xq3iimc", S6 = "xq3iimd", w6 = "xq3iime", j6 = "xq3iimf", E6 = "xq3iimg", N6 = "xq3iimh", C6 = "xq3iimi", T6 = "xq3iimj", R6 = "xq3iimk", Xb = "xq3iiml";
function _6({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [p, y] = g.useState(!0), [m, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), T = g.useRef(null), R = g.useRef(null);
  g.useEffect(() => {
    let C = !1;
    return y(!0), Xs(t).then(({ voiceAssets: V }) => {
      C || o(V);
    }).catch((V) => {
      C || w(V instanceof Error ? V.message : "Failed to load voices");
    }).finally(() => {
      C || y(!1);
    }), () => {
      C = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!S) return;
    const C = (Q) => {
      T.current && (Q.target instanceof Node && T.current.contains(Q.target) || j(!1));
    }, V = (Q) => {
      Q.key === "Escape" && (j(!1), R.current?.focus());
    };
    return document.addEventListener("mousedown", C), document.addEventListener("keydown", V), () => {
      document.removeEventListener("mousedown", C), document.removeEventListener("keydown", V);
    };
  }, [S]);
  const N = g.useCallback(
    async (C) => {
      b(!0), w(null);
      const V = u, Q = C === u ? null : C;
      f(Q), j(!1);
      try {
        await rT(t, Q), s?.(Q);
      } catch (te) {
        f(V), w(te instanceof Error ? te.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), D = g.useMemo(
    () => i.find((C) => C.voiceAssetId === u) ?? null,
    [i, u]
  ), O = g.useMemo(() => {
    const C = [], V = [];
    for (const Q of i)
      Q.kind === "speaker" || Q.kind === "mixed" ? C.push(Q) : V.push(Q);
    return { uploaded: C, other: V };
  }, [i]);
  return p ? /* @__PURE__ */ c.jsx("span", { className: Xb, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Xb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: T, className: o6, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: R,
        type: "button",
        className: `${c6} ${S ? u6 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: m,
        onClick: () => j((C) => !C),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: d6, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: f6, children: [
            /* @__PURE__ */ c.jsx("span", { className: h6, children: D ? D.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: m6, children: D ? sw(D) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: p6, "aria-hidden": "true", children: M6.map((C, V) => /* @__PURE__ */ c.jsx("i", { style: { height: `${C * 100}%` } }, V)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${g6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: v6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: y6, children: /* @__PURE__ */ c.jsx("span", { className: b6, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: x6, role: "alert", children: v }),
          O.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Qb, { label: "Uploaded", children: O.uploaded.map((C) => /* @__PURE__ */ c.jsx(
            Zb,
            {
              voice: C,
              selected: u === C.voiceAssetId,
              onSelect: () => void N(C.voiceAssetId)
            },
            C.voiceAssetId
          )) }),
          O.other.length > 0 && /* @__PURE__ */ c.jsx(Qb, { label: "Other", children: O.other.map((C) => /* @__PURE__ */ c.jsx(
            Zb,
            {
              voice: C,
              selected: u === C.voiceAssetId,
              onSelect: () => void N(C.voiceAssetId)
            },
            C.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function Qb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: S6, children: [
    /* @__PURE__ */ c.jsx("div", { className: w6, children: t }),
    a
  ] });
}
function Zb({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${j6} ${a ? E6 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: N6, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: C6, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: T6, children: sw(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${R6}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const M6 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function sw(t) {
  const a = [];
  return t.durationMs != null && a.push(A6(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function A6(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const Jb = [
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
function D6(t) {
  const a = ei(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: p } = g.useMemo(
    () => z6(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, m = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: m ? YR : HR, children: [
      !m && /* @__PURE__ */ c.jsx("div", { ref: s, className: qR, "aria-hidden": "true", children: i.map((b, v) => k6(b, v, p)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: m ? GR : FR,
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
        Qe,
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
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Parsed lines" }),
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
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: f0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function k6(t, a, s) {
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
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? u0 : `${u0} ${PR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: KR, children: [
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
function z6(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), y = [], m = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const T = S.trim();
    if (!T) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const R = j + 1, N = T.match(i);
    let D = "Narrator", O = T, C, V = !1;
    if (N?.groups) {
      V = !0;
      const F = (N.groups.body ?? "").trim(), k = (N.groups.rest ?? "").trim();
      D = ((F.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", C = (F.includes("|") ? F.slice(F.indexOf("|") + 1) : "").trim() || void 0, O = k;
    }
    w += 1;
    const Q = D.toLowerCase(), te = (p.get(Q) ?? 0) + 1;
    p.set(Q, te);
    const M = D === "Narrator" || s.has(Q);
    if (M || f.add(D), D !== "Narrator" && !m.has(Q) && (m.set(Q, Jb[b % Jb.length] ?? "currentColor"), b += 1), V) {
      const F = { kind: "character", raw: S, character: D, text: O, hasMapping: M };
      C !== void 0 && (F.override = C), o.push(F);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: R, character: D, text: O, hasMapping: M }), y.push(
      `${w.toString().padStart(3, "0")}_${O6(D)}_${te.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: m
  };
}
function O6(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Wb = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], iw = 1e-3;
function L6(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function $6() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function U6(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function lw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function ow(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function B6(t) {
  const a = [];
  for (let s = 0; s < Wb.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < iw || a.push(`${Wb[s]}=${ow(lw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function V6(t, a) {
  const s = L6(t.character) || "Narrator", i = U6(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const p = a.get(t.presetId);
    if (p) {
      const y = B6(p.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = lw(t.alpha);
  return Math.abs(u - 1) >= iw && o.push(`emotion_alpha:${ow(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function cw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = V6(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: $6(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var I6 = "_1827s3t2", H6 = "_1827s3t3", q6 = "_1827s3t4", F6 = "_1827s3t5", Y6 = "_1827s3t6", G6 = "_1827s3t7", P6 = "_1827s3t8", K6 = "_1827s3t9", X6 = "_1827s3ta", Q6 = "_1827s3tb", Z6 = "_1827s3td _1827s3tc", J6 = "_1827s3te _1827s3tc", W6 = "_1827s3tf", e8 = "_1827s3tg", t8 = "_1827s3th", n8 = "_1827s3ti _1827s3tc", a8 = "_1827s3tj", r8 = "_1827s3tk", s8 = "_1827s3tl", i8 = "_1827s3tm", l8 = "_1827s3tn", o8 = "_1827s3to", c8 = "_1827s3tp", u8 = "_1827s3tq", d8 = "_1827s3tr", f8 = "_1827s3ts", h8 = "_1827s3tt", m8 = "_1827s3tu";
function p8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), p = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), m = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), T = g.useRef(null), R = g.useRef(null), [N, D] = g.useState(null), [O, C] = g.useState(null), [V, Q] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? p.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? m.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && R.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const te = t.filter((U) => U.text.trim().length > 0).length, M = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ue = W.character.trim(), ve = ue.toLowerCase();
      !ve || ve === "narrator" || i.has(ve) || U.has(ve) || U.set(ve, ue);
    }
    return Array.from(U.values()).sort((W, ue) => W.localeCompare(ue));
  }, [t, i]), F = M.length, k = g.useRef(F), [I, J] = g.useState(0);
  g.useEffect(() => {
    F > k.current && J((U) => U + 1), k.current = F;
  }, [F]), g.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const U = (ue) => {
      if (!R.current || !T.current) return;
      const ve = ue.target;
      R.current.contains(ve) || T.current.contains(ve) || j(!1);
    }, W = (ue) => {
      ue.key === "Escape" && (j(!1), T.current?.focus());
    };
    return document.addEventListener("mousedown", U), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", W);
    };
  }, [S]);
  const he = g.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    return i.forEach((W) => U.add(W.characterName)), Array.from(U).sort((W, ue) => W.localeCompare(ue));
  }, [i]), K = g.useCallback(
    (U, W) => {
      a(t.map((ue) => ue.id === U ? { ...ue, ...W } : ue));
    },
    [t, a]
  ), ie = g.useRef(t);
  g.useEffect(() => {
    ie.current = t;
  }, [t]);
  const A = g.useCallback(
    (U) => {
      const W = t.findIndex((Ze) => Ze.id === U);
      if (W < 0) return;
      const ue = t[W];
      if (!ue) return;
      const ve = W > 0 ? t[W - 1]?.id ?? null : null, Ce = t.filter((Ze) => Ze.id !== U);
      a(Ce);
      const Ge = ue.character.trim() || `Line ${W + 1}`;
      pn(`Removed ${Ge}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const Ze = ie.current;
            if (Ze.some((Ct) => Ct.id === ue.id)) return;
            const Ie = [...Ze], Pe = ve ? Ze.findIndex((Ct) => Ct.id === ve) : -1, cn = Pe >= 0 ? Pe + 1 : 0;
            Ie.splice(cn, 0, ue), a(Ie);
          }
        },
        duration: 5e3
      });
      const Ee = `Removed line ${W + 1}, now ${Ce.length} ${Ce.length === 1 ? "line" : "lines"}`;
      if (Q((Ze) => Ze === Ee ? `${Ee}​` : Ee), Ce.length === 0)
        w({ kind: "addBtn" });
      else {
        const Ze = W < Ce.length ? W : Ce.length - 1, Ie = Ce[Ze];
        w(Ie ? { kind: "remove", rowId: Ie.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), Y = g.useCallback(
    (U) => {
      const W = Yr();
      let ue;
      if (U === null)
        ue = [...t, W];
      else {
        const ve = t.findIndex((Ce) => Ce.id === U);
        ue = ve < 0 ? [...t, W] : [...t.slice(0, ve + 1), W, ...t.slice(ve + 1)];
      }
      a(ue), w({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), $ = g.useCallback(
    (U, W) => {
      const ue = t.findIndex((Pe) => Pe.id === U);
      if (ue < 0) return;
      const ve = ue + W;
      if (ve < 0 || ve >= t.length) return;
      const Ce = [...t], Ge = Ce[ue], Ee = Ce[ve];
      if (!Ge || !Ee) return;
      Ce[ue] = Ee, Ce[ve] = Ge, a(Ce);
      const Ie = `Moved ${Ge.character.trim() || `Line ${ue + 1}`} to position ${ve + 1} of ${Ce.length}`;
      Q((Pe) => Pe === Ie ? `${Ie}​` : Ie);
    },
    [t, a]
  ), q = g.useCallback(
    (U, W) => {
      U.key === "Enter" && !U.shiftKey ? (U.preventDefault(), Y(W)) : U.altKey && U.key === "ArrowUp" ? (U.preventDefault(), $(W, -1)) : U.altKey && U.key === "ArrowDown" && (U.preventDefault(), $(W, 1));
    },
    [Y, $]
  ), oe = g.useCallback((U, W) => {
    D(W), U.dataTransfer.effectAllowed = "move", U.dataTransfer.setData("text/plain", W);
  }, []), _ = g.useCallback((U, W) => {
    N && (U.preventDefault(), U.dataTransfer.dropEffect = "move", O !== W && C(W));
  }, [N, O]), ae = g.useCallback(
    (U, W) => {
      U.preventDefault();
      const ue = N ?? U.dataTransfer.getData("text/plain");
      if (D(null), C(null), !ue || ue === W) return;
      const ve = t.findIndex((Pe) => Pe.id === ue), Ce = t.findIndex((Pe) => Pe.id === W);
      if (ve < 0 || Ce < 0) return;
      const Ge = [...t], [Ee] = Ge.splice(ve, 1);
      if (!Ee) return;
      Ge.splice(Ce, 0, Ee), a(Ge);
      const Ie = `Moved ${Ee.character.trim() || `Line ${ve + 1}`} to position ${Ce + 1} of ${Ge.length}`;
      Q((Pe) => Pe === Ie ? `${Ie}​` : Ie);
    },
    [t, a, N]
  ), re = g.useCallback(() => {
    D(null), C(null);
  }, []), G = g.useCallback(
    (U) => {
      const W = t.find((ue) => ue.character.trim().toLowerCase() === U.toLowerCase());
      W && w({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: I6, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: H6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: q6, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: h8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: F6, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: Y6, children: te.toString().padStart(2, "0") }),
        " lines",
        F > 0 && /* @__PURE__ */ c.jsxs("span", { className: r8, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: T,
              type: "button",
              className: m8,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((U) => !U),
              children: [
                "⚠ ",
                F,
                " unmapped"
              ]
            },
            I
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: R,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: s8,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: i8, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: l8, children: M.map((U) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: o8,
                    onClick: () => G(U),
                    children: U
                  }
                ) }, U)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: d8, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: G6, children: t.map((U, W) => {
      const ue = U.character.trim() || `line ${W + 1}`, ve = i.has(U.character.trim().toLowerCase()), Ce = N === U.id, Ge = O === U.id && N !== U.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: P6,
          "data-mapped": ve || void 0,
          "data-dragging": Ce || void 0,
          "data-drag-over": Ge || void 0,
          onDragOver: (Ee) => _(Ee, U.id),
          onDrop: (Ee) => ae(Ee, U.id),
          onDragEnd: re,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: K6,
                draggable: !0,
                "aria-label": `Drag to reorder ${ue}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ee) => oe(Ee, U.id),
                onKeyDown: (Ee) => {
                  Ee.altKey && Ee.key === "ArrowUp" ? (Ee.preventDefault(), $(U.id, -1)) : Ee.altKey && Ee.key === "ArrowDown" && (Ee.preventDefault(), $(U.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Q6, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ee) => {
                  Ee ? b.current.set(U.id, Ee) : b.current.delete(U.id);
                },
                type: "text",
                value: U.character,
                onChange: (Ee) => K(U.id, { character: Ee.target.value }),
                placeholder: "Character",
                className: Z6,
                "aria-label": `Character name for ${ue}`,
                list: he.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: U.presetId ?? "",
                onChange: (Ee) => K(U.id, { presetId: Ee.target.value === "" ? null : Ee.target.value }),
                className: J6,
                "aria-label": `Emotion preset for ${ue}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ee) => /* @__PURE__ */ c.jsx("option", { value: Ee.presetId, children: Ee.presetName }, Ee.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: W6, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: U.alpha,
                  onChange: (Ee) => K(U.id, { alpha: Number.parseFloat(Ee.target.value) }),
                  className: e8,
                  "aria-label": `Emotion intensity for ${ue}`,
                  "aria-valuetext": `${Math.round(U.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: t8,
                  "aria-hidden": "true",
                  "data-hot": U.alpha >= 0.85 || void 0,
                  children: (Math.round(U.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ee) => {
                  Ee ? y.current.set(U.id, Ee) : y.current.delete(U.id);
                },
                type: "text",
                value: U.text,
                onChange: (Ee) => K(U.id, { text: Ee.target.value }),
                onKeyDown: (Ee) => q(Ee, U.id),
                placeholder: "Line text…",
                className: n8,
                "aria-label": `Line text for ${ue}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ee) => {
                  Ee ? m.current.set(U.id, Ee) : m.current.delete(U.id);
                },
                type: "button",
                className: a8,
                "aria-label": `Remove ${ue}`,
                title: "Remove this line",
                onClick: () => A(U.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: X6,
                "aria-label": `Insert line after ${ue}`,
                title: "Insert line below",
                onClick: () => Y(U.id),
                tabIndex: -1,
                children: /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "＋" })
              }
            )
          ]
        },
        U.id
      );
    }) }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: p,
        type: "button",
        className: c8,
        onClick: () => Y(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: u8, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    he.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: he.map((U) => /* @__PURE__ */ c.jsx("option", { value: U }, U)) }),
    /* @__PURE__ */ c.jsx("div", { className: f8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: V })
  ] });
}
var g8 = "fmg0gf0", v8 = "fmg0gf1", ex = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], y8 = Hs;
function b8({
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
  return /* @__PURE__ */ c.jsx("div", { className: g8, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, p) => {
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
        className: y ? ex.active : ex.idle,
        onClick: () => {
          m || a(f.id);
        },
        onKeyDown: (v) => u(v, p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: v8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const x8 = [
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
function S8(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const T of x8) {
    const R = f[T];
    typeof R == "string" && (u[T] = R);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const p = t.value.slice(0, a), y = s.createTextNode(p.replace(/ /g, " ")), m = s.createElement("span");
  m.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(m), s.body.appendChild(i);
  const b = m.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const uw = {
  character: "@",
  emotion: "/"
}, dw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), w8 = /[\p{L}\p{N}_-]/u, j8 = /[^\p{L}\p{N}_-]+/gu;
function fw(t) {
  return t ? w8.test(t) : !1;
}
function E8(t) {
  return t.replace(j8, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function N8(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function kc(t, a) {
  const s = N8(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function zc(t) {
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
    const f = t[i], p = f === "@" || f === "/", y = i === 0 ? "" : kc(t, yc(t, i)), m = i === 0 || y !== "" && dw.has(y);
    if (p && m) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = kc(t, b);
        if (w && fw(w))
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
function yc(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function C8(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = yc(t, a), i = "";
  for (; s >= 0; ) {
    const o = kc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : kc(t, yc(t, s));
      return s === 0 || f !== "" && dw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!fw(o)) return null;
    i = o + i;
    const u = yc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var T8 = "_1d2ofoy5", R8 = "_1d2ofoy6", _8 = "_1d2ofoy8 _1d2ofoy7", M8 = "_1d2ofoy9 _1d2ofoy7", A8 = "_1d2ofoya", D8 = "_1d2ofoyb", k8 = "_1d2ofoyc", z8 = "_1d2ofoye", O8 = "_1d2ofoyf", L8 = "_1d2ofoyg", $8 = "_1d2ofoyh", U8 = "_1d2ofoyi", B8 = "_1d2ofoyj", nc = "_1d2ofoyk", V8 = "_1d2ofoyl";
const I8 = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function H8({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), p = g.useId(), y = `${p}-opt`, [m, b] = g.useState(null), v = g.useMemo(() => zc(t), [t]), w = g.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    o.forEach((I) => k.set(I.characterName.toLowerCase(), I.characterName));
    for (const I of s) {
      const J = I.toLowerCase();
      k.has(J) || k.set(J, I);
    }
    return Array.from(k.values()).sort((I, J) => I.localeCompare(J));
  }, [s, o]), S = g.useMemo(() => {
    if (!m) return [];
    const k = m.query.toLowerCase();
    if (m.kind === "character")
      return w.filter((he) => he.toLowerCase().includes(k)).slice(0, 8).map((he) => {
        const K = o.get(he.toLowerCase());
        return { value: he, hint: K ? "mapped" : "unmapped" };
      });
    const I = /* @__PURE__ */ new Set(), J = [];
    for (const he of i) {
      const K = he.presetName.toLowerCase();
      if (K.includes(k) && !I.has(K) && (I.add(K), J.push({ value: he.presetName, hint: "vector" }), J.length >= 8))
        break;
    }
    return J;
  }, [m, w, o, i]), j = g.useCallback((k, I, J) => {
    if (I < 0) return null;
    const he = C8(k, I);
    if (!he) return null;
    const K = u.current, ie = K ? S8(K, I) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: he.start,
      query: he.query,
      kind: he.kind,
      selected: J && J.kind === he.kind ? J.selected : 0,
      caretTop: ie.top,
      caretLeft: ie.left,
      caretHeight: ie.height
    };
  }, []), T = g.useCallback(() => {
    const k = u.current;
    if (!k) {
      b(null);
      return;
    }
    const I = k.selectionStart;
    if (I !== k.selectionEnd) {
      b(null);
      return;
    }
    b((J) => j(t, I, J));
  }, [t, j]);
  g.useEffect(() => {
    if (!m) return;
    const k = S.length, I = k === 0 ? 0 : Math.min(m.selected, k - 1);
    m.selected !== I && b({ ...m, selected: I });
  }, [m, S]), g.useLayoutEffect(() => {
    const k = f.current, I = u.current;
    !k || !I || (k.scrollTop = I.scrollTop, k.scrollLeft = I.scrollLeft);
  }), g.useEffect(() => {
    const k = u.current, I = f.current;
    if (!k || !I) return;
    const J = () => {
      I.scrollTop = k.scrollTop, I.scrollLeft = k.scrollLeft;
    };
    return k.addEventListener("scroll", J, { passive: !0 }), () => k.removeEventListener("scroll", J);
  }, []);
  const R = g.useCallback(
    (k) => {
      const I = k.target.value;
      a(I);
      const J = k.target;
      requestAnimationFrame(() => {
        const he = J.selectionStart;
        if (he !== J.selectionEnd) {
          b(null);
          return;
        }
        b((K) => j(I, he, K));
      });
    },
    [a, j]
  ), N = g.useCallback(() => {
    T();
  }, [T]), D = g.useCallback(
    (k, I) => {
      if (!m) return;
      const J = uw[m.kind], he = m.triggerStart + 1 + m.query.length, K = t.slice(0, m.triggerStart), ie = t.slice(he), A = E8(k);
      if (!A) return;
      const Y = `${J}${A} `, $ = `${K}${Y}${ie}`;
      a($);
      const q = K.length + Y.length;
      b(null), I.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(q, q));
      });
    },
    [m, t, a]
  ), O = g.useCallback(
    (k) => {
      if (m) {
        if (k.key === "Escape") {
          k.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (k.key === "ArrowDown")
            k.preventDefault(), b((I) => I && { ...I, selected: (I.selected + 1) % S.length });
          else if (k.key === "ArrowUp")
            k.preventDefault(), b(
              (I) => I && { ...I, selected: (I.selected - 1 + S.length) % S.length }
            );
          else if (k.key === "Enter") {
            const I = S[m.selected];
            I && (k.preventDefault(), D(I.value, { advanceFocus: !1 }));
          } else if (k.key === "Tab") {
            const I = S[m.selected];
            I && D(I.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [m, S, D]
  ), C = g.useRef(null), [V, Q] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!m) {
      Q(null);
      return;
    }
    const k = C.current, I = u.current;
    if (!k || !I) return;
    const J = k.offsetWidth, he = I.clientWidth, K = Math.max(0, he - J - 8), ie = Math.max(0, m.caretLeft);
    Q(Math.min(ie, K));
  }, [m]);
  const te = m?.kind === "character" ? "Character" : "Emotion preset", M = m && S.length > 0 ? `${y}-${m.selected}` : void 0, F = !m || S.length > 0 ? null : m.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${m.query}". Type a different name or pick from Mappings.` : m.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${m.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: T8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: R8, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: _8, "aria-hidden": "true", children: q8(v, m?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: M8,
          value: t,
          onChange: R,
          onSelect: N,
          onKeyDown: O,
          placeholder: I8,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": m && S.length > 0 ? p : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      m && (S.length > 0 || F) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: C,
          className: z8,
          style: {
            top: `${m.caretTop + m.caretHeight + 6}px`,
            left: `${V ?? Math.max(0, m.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: O8, "aria-hidden": "true", children: te }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: p,
                role: "listbox",
                "aria-label": te,
                className: L8,
                children: S.map((k, I) => {
                  const J = `${y}-${I}`, he = I === m.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: J,
                      role: "option",
                      "aria-selected": he,
                      "data-active": he || void 0,
                      className: $8,
                      onMouseDown: (K) => {
                        K.preventDefault(), D(k.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: k.value }),
                        k.hint && /* @__PURE__ */ c.jsx("span", { className: U8, children: k.hint })
                      ]
                    },
                    `${k.value}-${I}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: p, role: "status", className: V8, children: F })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: B8, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: nc, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: nc, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: nc, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: nc, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function q8(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: A8, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: k8,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: D8, children: uw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var F8 = "_5o8xvy0", Y8 = "_5o8xvy1", G8 = "_5o8xvy2", P8 = "_5o8xvy3", Yf = "_5o8xvy4", K8 = "_5o8xvy5", X8 = "_3f2ar0", Q8 = "_3f2ar1", Z8 = "_3f2ar2", J8 = "_3f2ar3", W8 = "_3f2ar4", e$ = "_3f2ar6", al = "_3f2ar7", rl = "_3f2ar8", sl = "_3f2ar9", tx = "_3f2ara", nx = "_3f2arb";
function t$({ label: t, glyph: a = "?", children: s }) {
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
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: X8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: Q8,
        "aria-expanded": i,
        "aria-controls": p,
        onClick: () => o((m) => !m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Z8, "aria-hidden": "true", children: a }),
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
        className: J8,
        children: s
      }
    )
  ] });
}
var n$ = "_1dxb1dg0", ax = "_1dxb1dg1", a$ = "_1dxb1dg2", r$ = "_1dxb1dg3", s$ = "_1dxb1dg4";
function i$() {
  return /* @__PURE__ */ c.jsxs(t$, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: W8, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: e$, children: [
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: sl, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: sl, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: sl, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: sl, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: sl, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: tx, children: [
      /* @__PURE__ */ c.jsx("span", { className: nx, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: tx, children: [
      /* @__PURE__ */ c.jsx("span", { className: nx, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function l$() {
  return /* @__PURE__ */ c.jsxs("ul", { className: n$, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: ax, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: ax, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: a$, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: r$, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: s$, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function o$({
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
  voiceAssets: T,
  onQueueChange: R
}) {
  const N = t === "quick", D = t === "rows", O = t === "story", C = t === "storyboard", V = O || C, Q = y8.find((I) => I.id === t)?.description ?? "", te = D ? u.reduce((I, J) => I + J.text.length, 0) : V ? p.length : i.length, M = D ? u.map((I) => I.text).join(" ") : V ? p : i, F = M.trim() ? M.trim().split(/\s+/).length : 0, k = D ? u.filter((I) => I.text.trim().length > 0).length : (V ? p : i).trim() ? (V ? p : i).trim().split(/\r?\n/).filter((I) => I.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: F8, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${Y8} ${N ? G8 : ""}`,
        "data-quick-on": N || void 0,
        children: [
          /* @__PURE__ */ c.jsx(b8, { value: t, onChange: a }),
          N && /* @__PURE__ */ c.jsx(
            _6,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: P8, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: te.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: k.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: F.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !D && /* @__PURE__ */ c.jsx(i$, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: K8, "aria-live": "polite", children: Q }),
    C ? /* @__PURE__ */ c.jsx(
      FL,
      {
        voiceAssets: T,
        presets: j,
        storyText: p,
        onStoryTextChange: y,
        mappings: v,
        onQueueChange: R
      }
    ) : D ? /* @__PURE__ */ c.jsx(
      p8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : O ? /* @__PURE__ */ c.jsx(
      H8,
      {
        value: p,
        onChange: y,
        characters: m,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      D6,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: N
      }
    ),
    !N && !D && !O && !C && /* @__PURE__ */ c.jsx(l$, {})
  ] });
}
function c$({
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
function rx(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function u$(t, a, s, i) {
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
    return { script: cw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const p = f.text.trim();
      if (!p) continue;
      const y = f.character.trim(), m = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${sx(y)}`), m && b.push(`/${sx(m.presetName)}`), b.push(p), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = zc(s.storyText), u = [];
    for (const p of o)
      p.kind === "text" && u.push(p.value);
    return { script: u.join("").split(/\r?\n/).map((p) => p.replace(/[ \t]+/g, " ").trim()).filter((p) => p.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = zc(s.storyText), u = /* @__PURE__ */ new Map();
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
          const T = w[j];
          T !== void 0 && f.push({
            ...Yr(),
            character: "",
            presetId: null,
            alpha: 1,
            text: T
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
function sx(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Gf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], d$ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function f$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(d$);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const p = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? h$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function h$(t) {
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
function m$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function p$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Gf[s % Gf.length] ?? Gf[0]);
  }
  return a;
}
function g$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var v$ = "_1snzz30", y$ = "_1snzz31", b$ = "_1snzz33", x$ = "_1snzz34", S$ = "_1snzz36", ix = "_1snzz3b", lx = "_1snzz3c", ox = "_1snzz3d";
const w$ = "ext-action-invoke", j$ = "emotion-tts.run";
function E$() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(w$, {
      detail: { id: j$ },
      bubbles: !1
    })
  ), !0) : !1;
}
const N$ = 4e3;
function C$({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, p] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let Y = !1;
    const $ = async () => {
      try {
        const oe = await wc();
        Y || (y.current = oe, i(oe));
      } catch {
      }
    };
    $();
    const q = window.setInterval($, N$);
    return () => {
      Y = !0, window.clearInterval(q);
    };
  }, []), g.useEffect(() => ZS((Y) => {
    p(!!Y.busy);
  }), []);
  const m = g.useCallback(() => {
    z4();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), E$();
  }, []), T = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", R = o || w, N = o || w, D = N ? "transitioning" : v ? "running" : "stopped", O = !a || f || !S, C = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", V = S && a && !f, Q = v ? "ready" : w || o ? "busy" : "off", te = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", M = Q === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const F = "rgba(28, 30, 34, 0.94)", k = "#ba9eff", I = "#8455ef", J = "#1a0a3a", he = "#f0f0f3", K = "#aaabae", ie = "#22c55e", A = v ? "◼" : "⏻";
  return Xh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: v$,
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
          background: F,
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
              className: y$,
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
                color: Q === "ready" ? ie : Q === "busy" ? k : K,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Q === "ready" ? "rgba(34, 197, 94, 0.4)" : Q === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: b$,
                    "data-pulse": M ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Q === "ready" ? `0 0 8px ${ie}` : Q === "busy" ? `0 0 8px ${k}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                te
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: lx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: x$,
                "data-state": D,
                onClick: j,
                disabled: R,
                "aria-label": T,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: D === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: D === "running" ? ie : he,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${D === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: N ? /* @__PURE__ */ c.jsx("span", { className: ix, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: A })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: ox, role: "tooltip", children: T })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: lx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: S$,
                "data-ready": V ? "true" : "false",
                onClick: m,
                disabled: O,
                "aria-label": C,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: O ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${k} 0%, ${I} 100%)`,
                  color: O ? K : J,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: O ? "not-allowed" : "pointer",
                  boxShadow: O ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: ix, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: ox, role: "tooltip", children: C })
          ] })
        ]
      }
    ),
    document.body
  );
}
function T$(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = R$(t.deployment.displayName, t.deployment.deploymentId), o = ew(tw), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: wR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: jR, children: [
      /* @__PURE__ */ c.jsx("div", { className: NR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: ER, children: /* @__PURE__ */ c.jsx("h1", { className: CR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: TR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Dn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: UR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: RR, children: [
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
    /* @__PURE__ */ c.jsx(C$, { visible: o, canGenerate: u }),
    typeof document < "u" && Xh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: BR,
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
function R$(t, a) {
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
  return /* @__PURE__ */ c.jsxs("section", { className: _R, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: MR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: kR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: AR, children: [
            /* @__PURE__ */ c.jsx("span", { className: zR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: OR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: LR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: DR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: $R,
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
        className: i === "split" ? IR : VR,
        children: u
      }
    )
  ] });
}
const Mn = {
  success(t) {
    pn.success(t);
  },
  error(t) {
    pn.error(t);
  }
}, _h = "__recipe";
function _$(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function M$(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== _h && (a[s] = t[s]);
  return a;
}
function A$() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = Nl(), [o, u] = g.useState(a), [f, p] = g.useState([]), [y, m] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(qc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? _$(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), T = g.useMemo(() => {
    const ce = j[_h];
    return typeof ce == "object" && ce !== null ? ce : {};
  }, [j]), [R, N] = g.useState(""), [D, O] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [C, V] = g.useState(t.defaultSpeedFactor ?? 1), [Q, te] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, F] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...M$(j)
  })), [k, I] = g.useState(() => {
    const ce = T.cachePolicy;
    return ce === "use_cache" || ce === "force_regenerate" || ce === "read_only_cache" ? ce : "use_cache";
  }), [J, he] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [K, ie] = g.useState(() => {
    const ce = T.editorMode;
    return ce === "quick" || ce === "rows" || ce === "story" || ce === "storyboard" ? ce : typeof T.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), A = K === "quick", [Y, $] = g.useState(() => [Yr()]), q = 1e5, [oe, _] = g.useState(() => {
    const ce = T.storyText;
    return typeof ce == "string" ? ce : "";
  }), ae = g.useRef(!1), re = g.useCallback((ce) => {
    ce.length > q && !ae.current && (ae.current = !0, Mn.error(
      `Story text is over ${Math.round(q / 1e3)} KB — large scripts may slow down save and rendering.`
    )), ce.length <= q && (ae.current = !1), _(ce);
  }, []), [G, U] = g.useState(y5), [W, ue] = g.useState([]), ve = g.useRef(R), Ce = g.useRef(Y), Ge = g.useRef(oe), Ee = g.useRef(y);
  g.useEffect(() => {
    ve.current = R;
  }, [R]), g.useEffect(() => {
    Ce.current = Y;
  }, [Y]), g.useEffect(() => {
    Ge.current = oe;
  }, [oe]), g.useEffect(() => {
    Ee.current = y;
  }, [y]);
  const [Ze, Ie] = g.useState(""), Pe = g.useCallback(
    (ce) => {
      ie((Ue) => {
        if (ce === Ue) return Ue;
        const ze = {
          script: ve.current,
          rows: Ce.current,
          storyText: Ge.current
        }, H = rx(ce, ze), pe = rx(Ue, ze);
        if (!H && pe) {
          const ye = u$(Ue, ce, ze, Ee.current);
          if (ye) {
            const qe = { ...ze }, Je = document.activeElement;
            ye.script !== void 0 && N(ye.script), ye.rows !== void 0 && $(ye.rows), ye.storyText !== void 0 && re(ye.storyText);
            const Me = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, Ve = (Ft) => Ft.split(/\r?\n/).filter((sa) => sa.trim().length > 0).length, Fe = ye.rows !== void 0 ? ye.rows.length : ye.script !== void 0 ? Ve(ye.script) : ye.storyText !== void 0 ? Ve(ye.storyText) : 0, It = Fe === 1 ? "line" : "lines", wn = Fe > 0 ? ` (${Fe} ${It})` : "", ct = `Switched to ${Me[ce]} mode${Fe > 0 ? `, ${Fe} ${It}` : ""}.`;
            Ie((Ft) => Ft === ct ? `${ct}​` : ct), pn(`Switched to ${Me[ce]}${wn} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  N(qe.script), $([...qe.rows]), re(qe.storyText), ie(Ue), Je && typeof Je.focus == "function" && requestAnimationFrame(() => Je.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return ce;
      });
    },
    [re]
  );
  g.useEffect(() => {
    let ce = !1;
    return Xs(t.deploymentId).then((Ue) => {
      ce || p(Ue.voiceAssets);
    }).catch(() => {
    }), a2(t.deploymentId).then((Ue) => {
      ce || m(
        [...Ue.presets].sort((ze, H) => H.updatedAt - ze.updatedAt)
      );
    }).catch(() => {
    }), () => {
      ce = !0;
    };
  }, [t.deploymentId]);
  const cn = g.useRef(!0);
  g.useEffect(() => {
    if (cn.current) {
      cn.current = !1;
      return;
    }
    const ce = window.setTimeout(() => {
      const Ue = {
        ...M,
        [_h]: {
          editorMode: K,
          quickMode: A,
          cachePolicy: k,
          storyText: oe
        }
      };
      Et(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: D,
          defaultSpeedFactor: C,
          defaultGenerationOverrides: Ue
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(ce);
  }, [
    t.deploymentId,
    D,
    C,
    k,
    K,
    A,
    oe,
    M
  ]);
  const Ct = g.useMemo(() => K === "rows" ? cw(Y, y) : K === "story" ? oe : R, [K, Y, y, R, oe]), Tt = g.useMemo(() => f$(Ct), [Ct]), Vt = g.useMemo(() => {
    if (K !== "story") return m$(Tt);
    const ce = /* @__PURE__ */ new Set(), Ue = [];
    for (const ze of zc(oe))
      ze.kind === "character" && (ce.has(ze.value) || (ce.add(ze.value), Ue.push(ze.value)));
    return Ue;
  }, [K, Tt, oe]), kt = g.useMemo(() => p$(Vt), [Vt]), sn = g.useMemo(() => g$(Tt), [Tt]), Xt = g.useMemo(() => {
    const ce = /* @__PURE__ */ new Map();
    for (const Ue of o)
      ce.set(Ue.characterName.toLowerCase(), Ue);
    return ce;
  }, [o]), Rt = g.useMemo(() => A && J ? 0 : Vt.filter((ce) => !Xt.has(ce.toLowerCase())).length, [Vt, Xt, A, J]), $t = g.useCallback(
    async (ce, Ue) => {
      const ze = Xt.get(ce.toLowerCase());
      try {
        if (ze) {
          const H = await dl(t.deploymentId, ze.mappingId, Ue);
          u(
            (pe) => pe.map((ye) => ye.mappingId === H.mappingId ? H : ye)
          ), Mn.success(`Updated mapping for ${ce}`);
        } else if (Ue.speakerVoiceAssetId) {
          const H = await Ph(t.deploymentId, {
            ...Ue,
            characterName: ce,
            speakerVoiceAssetId: Ue.speakerVoiceAssetId
          });
          u((pe) => [...pe, H]), Mn.success(`Mapped ${ce} to voice`);
        }
      } catch (H) {
        Mn.error(H instanceof Error ? H.message : "mapping failed");
      }
    },
    [Xt, t.deploymentId]
  ), _t = g.useCallback(
    async (ce) => {
      const Ue = Xt.get(ce.toLowerCase());
      if (Ue)
        try {
          await f1(t.deploymentId, Ue.mappingId), u((ze) => ze.filter((H) => H.mappingId !== Ue.mappingId)), Mn.success(`Cleared mapping for ${ce}`);
        } catch (ze) {
          Mn.error(ze instanceof Error ? ze.message : "clear failed");
        }
    },
    [Xt, t.deploymentId]
  ), we = g.useCallback(
    async (ce, Ue) => {
      try {
        const ze = await Sc(
          t.deploymentId,
          Ue,
          Ue.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((H) => [ze, ...H]), await $t(ce, { speakerVoiceAssetId: ze.voiceAssetId });
      } catch (ze) {
        Mn.error(ze instanceof Error ? ze.message : "upload failed");
      }
    },
    [t.deploymentId, $t]
  ), Le = g.useCallback(
    (ce) => {
      $t(ce.displayName, { speakerVoiceAssetId: ce.voiceAssetId });
    },
    [$t]
  ), Xe = g.useCallback((ce) => {
    S(ce);
  }, []), ot = g.useMemo(() => {
    const ce = [], Ue = /* @__PURE__ */ new Set();
    for (const ze of o) {
      const H = ze.speakerVoiceAssetId;
      if (!H || Ue.has(H)) continue;
      Ue.add(H);
      const ye = f.find((qe) => qe.voiceAssetId === H)?.displayName ?? `${ze.characterName} · ${H.slice(0, 8)}`;
      ce.push({ kind: "voice_asset", id: H, label: ye });
    }
    for (const ze of f)
      Ue.has(ze.voiceAssetId) || (Ue.add(ze.voiceAssetId), ce.push({ kind: "voice_asset", id: ze.voiceAssetId, label: ze.displayName }));
    return ce;
  }, [o, f]), Ut = g.useCallback(
    async (ce, Ue) => {
      if (ce.kind !== "voice_asset") {
        Mn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let ze;
      try {
        const H = JSON.parse(Ue);
        if (typeof H != "object" || H === null || H.version !== 1 || !Array.isArray(H.ops))
          throw new Error("snapshot is not a valid EditChain");
        ze = H;
      } catch (H) {
        Mn.error(
          H instanceof Error ? `Audit snapshot is malformed: ${H.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const H = await m1(ce.id, t.deploymentId, {
          chain: ze
        }), pe = o.filter((ye) => ye.speakerVoiceAssetId === ce.id);
        await Promise.all(
          pe.map(
            (ye) => dl(t.deploymentId, ye.mappingId, {
              voiceAssetChainDigest: H.chain_digest
            }).catch(() => null)
          )
        ), u(
          (ye) => ye.map(
            (qe) => qe.speakerVoiceAssetId === ce.id ? { ...qe, voiceAssetChainDigest: H.chain_digest } : qe
          )
        ), Mn.success(`Reverted ${ce.label} to a prior chain`);
      } catch (H) {
        Mn.error(H instanceof Error ? H.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), zt = g.useCallback(
    async (ce) => {
      if (ce.kind !== "voice_asset") {
        Mn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await yR(ce.id, t.deploymentId);
        const Ue = o.filter((ze) => ze.speakerVoiceAssetId === ce.id);
        await Promise.all(
          Ue.map(
            (ze) => dl(t.deploymentId, ze.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (ze) => ze.map(
            (H) => H.speakerVoiceAssetId === ce.id ? { ...H, voiceAssetChainDigest: null } : H
          )
        ), Mn.success(`Cleared edit chain on ${ce.label}`);
      } catch (Ue) {
        Mn.error(Ue instanceof Error ? Ue.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), qn = g.useMemo(
    () => ({
      script: Ct,
      parserMode: K === "quick" ? "raw_text" : K === "story" ? "story" : "dialogue",
      outputFormat: D,
      speedFactor: C,
      globalEmotion: { ...Q, emotionAlpha: G.intensity },
      generation: M,
      cachePolicy: k,
      ...K === "storyboard" && W.length > 0 ? {
        prebuiltSegments: W.map(
          (ce) => ce.emotion ? { ...ce, emotion: { ...ce.emotion, emotionAlpha: G.intensity } } : ce
        )
      } : {}
    }),
    [Ct, K, D, C, G.intensity, Q, M, k, W]
  ), un = g.useMemo(
    () => c$({
      script: Ct,
      quickMode: A,
      defaultVoiceAssetId: J,
      characters: Vt,
      unmappedCount: Rt,
      globalEmotion: Q,
      performance: G
    }),
    [Ct, A, J, Vt, Rt, Q, G]
  ), gn = g.useMemo(
    () => un.filter((ce) => ce.id !== "performance").map((ce) => ({
      label: ce.label,
      status: ce.status === "ok" ? "ok" : ce.status === "warn" ? "warn" : "ok",
      detail: ce.detail
    })),
    [un]
  ), vt = K === "storyboard" && W.length > 0, mt = Ct.trim().length > 0 || vt;
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(gR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: Ze
      }
    ),
    /* @__PURE__ */ c.jsx(
      T$,
      {
        deployment: t,
        canGenerate: mt,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(Y2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          _O,
          {
            deploymentId: t.deploymentId,
            createPayload: qn,
            canGenerate: mt,
            diagnostics: gn
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          cO,
          {
            deploymentId: t.deploymentId,
            speedFactor: C
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          o$,
          {
            editorMode: K,
            onEditorModeChange: Pe,
            deployment: t,
            script: R,
            onScriptChange: N,
            rows: Y,
            onRowsChange: $,
            storyText: oe,
            onStoryTextChange: re,
            storyCharacters: Vt,
            outputFormat: D,
            mappingsByLower: Xt,
            defaultVoiceAssetId: J,
            onDefaultVoiceAssetIdChange: he,
            presets: y,
            voiceAssets: f,
            onQueueChange: ue
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(c5, { lines: Tt, characterColors: kt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          n2,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: kt,
            onVoiceAssetsChange: p,
            onCreateCharacterFromVoice: Le
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(B2, { unmappedCount: Rt, totalCount: Vt.length, children: Vt.map((ce) => {
          const Ue = Xt.get(ce.toLowerCase()) ?? null, ze = kt[ce] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: JR, children: /* @__PURE__ */ c.jsx(
            U2,
            {
              characterName: ce,
              color: ze,
              lineCount: sn[ce] ?? 0,
              mapping: Ue,
              voiceAssets: f,
              presets: y,
              active: b === ce,
              onToggle: () => v((H) => H === ce ? null : ce),
              onAssignVoiceAsset: (H) => $t(ce, { speakerVoiceAssetId: H }),
              onAssignPreset: (H) => $t(ce, { defaultVectorPresetId: H }),
              onUploadFile: (H) => we(ce, H),
              onClearMapping: () => _t(ce)
            }
          ) }, ce);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          z3,
          {
            value: Q,
            onChange: te,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: m
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            b5,
            {
              value: { ...G, pace: C },
              onChange: (ce) => {
                U(ce), ce.pace !== C && V(ce.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Jh,
            {
              state: w,
              onChange: Xe,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(M5, { checks: un }),
          /* @__PURE__ */ c.jsx(
            W3,
            {
              outputFormat: D,
              onOutputFormatChange: O,
              speedFactor: C,
              onSpeedFactorChange: V,
              cachePolicy: k,
              onCachePolicyChange: I,
              generation: M,
              onGenerationChange: F
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx($5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          b2,
          {
            deploymentId: t.deploymentId,
            targets: ot,
            onRevertToIdentity: zt,
            onRevertToChain: Ut
          }
        )
      }
    )
  ] });
}
const cx = /* @__PURE__ */ new Map();
function D$(t, a) {
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
    const o = `${t}::${a}`, u = cx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), k$(t, a, f.signal).then((p) => {
      f.signal.aborted || (cx.set(o, p), i({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (f.signal.aborted) return;
      const y = p instanceof Error ? p.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function k$(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return z$(f, a);
}
function z$(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let p = 0; p < s; p += 1) f.push(t.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const y = p * o, m = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < m; v += 1) {
      let w = 0;
      for (let j = 0; j < s; j += 1) {
        const T = f[j];
        T && (w += Math.abs(T[v] ?? 0));
      }
      const S = w / s;
      S > b && (b = S);
    }
    u[p] = b;
  }
  return u;
}
const ux = "(prefers-reduced-motion: reduce)";
function O$() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(ux).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(ux), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var L$ = "mquzal0", $$ = "mquzal1", dx = "mquzal2", fx = "mquzal3", hx = "mquzal4", U$ = "mquzal5", mx = "mquzal6", px = "mquzal7";
const B$ = 120, V$ = 720;
function hw(t) {
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
    width: b = V$,
    height: v = B$
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), T = D$(a, b), R = O$();
  g.useEffect(() => {
    I$(w.current, T.peaks, b, v);
  }, [T.peaks, b, v]);
  const N = g.useCallback(
    (M) => {
      const F = S.current?.getBoundingClientRect();
      if (!F || F.width <= 0) return 0;
      const k = Math.max(0, Math.min(1, (M - F.left) / F.width));
      return Math.round(k * s);
    },
    [s]
  );
  g.useEffect(() => {
    const M = (k) => {
      if (!j.current) return;
      const I = N(k.clientX);
      j.current === "start" ? u(ac(I, 0, o - 1)) : f(ac(I, i + 1, s));
    }, F = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", F), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", F);
    };
  }, [N, s, o, i, u, f]);
  const D = (M) => (F) => {
    F.preventDefault(), F.stopPropagation(), j.current = M;
  }, O = (M) => {
    !m || M.target.closest("[data-handle]") || m(N(M.clientX));
  }, C = (M) => (F) => {
    const k = F.shiftKey ? 100 : F.ctrlKey ? 1 : 10;
    let I = 0;
    if (F.key === "ArrowLeft") I = -k;
    else if (F.key === "ArrowRight") I = k;
    else return;
    F.preventDefault(), M === "start" ? u(ac(i + I, 0, o - 1)) : f(ac(o + I, i + 1, s));
  }, V = Pf(i, s), Q = Pf(o, s), te = Pf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: L$,
      style: { height: v },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: $$,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ c.jsx("div", { className: px, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ c.jsx("div", { className: px, role: "alert", children: T.error }),
        /* @__PURE__ */ c.jsx("div", { className: mx, style: { left: 0, width: `${V}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: mx,
            style: { left: `${Q}%`, right: 0, width: `${100 - Q}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: dx,
            style: { left: `${V}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: D("start"),
            onKeyDown: C("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: fx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: hx, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: dx,
            style: { left: `${Q}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: D("end"),
            onKeyDown: C("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: fx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: hx, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: U$,
            style: {
              left: `${te}%`,
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
function ac(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function I$(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = H$(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let p = 0; p < f; p += 1) {
    const y = a[p] ?? 0, m = Math.max(1, y * (i - 4));
    o.fillRect(p, u - m / 2, 1, m);
  }
}
function H$(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var q$ = "r8lfsm0", F$ = "r8lfsm1", Y$ = "r8lfsm2", G$ = "r8lfsm3", P$ = "r8lfsm4", K$ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, X$ = "_1b1zchy3", Q$ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, Z$ = "_1b1zchy6", J$ = "_1b1zchy7";
const mw = g.createContext("standalone");
function pw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [K$[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(mw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function gw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(mw), f = [X$, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: Q$[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: Z$, children: a }) : null,
    s
  ] });
}
function vw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [J$, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const gx = -16, W$ = 80, eU = 720;
function tU(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: p } = t, y = i.durationMs ?? 0, [m, b] = g.useState(() => vx(y)), [v, w] = g.useState(qc), [S, j] = g.useState(!1), [T, R] = g.useState(!1), [N, D] = g.useState(null), [O, C] = g.useState(!1), V = g.useRef(null), Q = g.useRef(null), te = g.useRef(null);
  g.useEffect(() => {
    const $ = vx(y);
    b($), w(N1($)), R(!1), D(null), te.current = null;
  }, [i.utteranceId, y]);
  const M = g.useCallback(($) => {
    w($), b((q) => E1(q, $));
  }, []);
  g.useEffect(() => () => Q.current?.abort(), []), g.useEffect(() => {
    V.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const F = g.useCallback(
    ($) => {
      $.key === "Escape" && ($.stopPropagation(), p());
    },
    [p]
  ), k = g.useMemo(
    () => m.ops.find(($) => $.mode === "trim"),
    [m.ops]
  ), I = k?.start_ms ?? 0, J = k?.end_ms ?? Math.max(1, y), he = g.useCallback(($, q) => {
    b((oe) => nU(oe, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor($)),
      end_ms: Math.max(Math.floor($) + 1, Math.floor(q))
    })));
  }, []), K = g.useCallback(($) => he($, J), [J, he]), ie = g.useCallback(($) => he(I, $), [I, he]), A = g.useCallback(($) => {
    R($), b((q) => {
      const oe = q.ops.filter((_) => _.mode !== "normalize");
      if ($) {
        const _ = {
          id: kn(),
          mode: "normalize",
          target_lufs: gx
        };
        return { ...q, ops: [...oe, _] };
      }
      return { ...q, ops: oe };
    });
  }, []), Y = g.useCallback(async () => {
    const $ = p1(m, y);
    if ($) {
      D($.message);
      return;
    }
    if (D(null), O) return;
    Q.current?.abort();
    const q = new AbortController();
    Q.current = q, C(!0);
    try {
      const oe = te.current ?? void 0, _ = await vR(
        a,
        s,
        i.utteranceId,
        oe ? { chain: m, digest_before: oe } : { chain: m },
        { signal: q.signal }
      );
      if (q.signal.aborted) return;
      te.current = _.chain_digest, u(_);
    } catch (oe) {
      if (q.signal.aborted) return;
      oe instanceof Qs && (te.current = oe.currentDigest || null);
      const _ = oe instanceof Qs ? "Edit chain has changed in another tab. Reload to continue." : oe instanceof Error ? oe.message : "apply failed";
      D(_), f(_);
    } finally {
      q.signal.aborted || C(!1);
    }
  }, [m, y, O, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(pw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: V, onKeyDown: F, children: [
    /* @__PURE__ */ c.jsx(gw, { title: "Edit segment", meta: `Source · ${rc(y)}` }),
    /* @__PURE__ */ c.jsx(
      hw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: I,
        endMs: J,
        onChangeStart: K,
        onChangeEnd: ie,
        height: W$,
        width: eU
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: q$, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: F$, children: [
        rc(I),
        " → ",
        rc(J),
        " · ",
        rc(J - I)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Y$, children: [
      /* @__PURE__ */ c.jsxs("label", { className: G$, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: ($) => A($.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          gx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: P$,
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
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(vw, { children: [
      /* @__PURE__ */ c.jsx(Qe, { size: "sm", onClick: () => void Y(), disabled: O, children: O ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: p, disabled: O, children: "Cancel" })
    ] }),
    N && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: N })
  ] }) });
}
function vx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: kn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function nU(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: kn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function rc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var aU = "jq2zyb2", rU = "jq2zyb3", sU = "jq2zyb4", iU = "jq2zyb5", lU = "jq2zyb6", oU = "jq2zyb7", cU = "jq2zyb8", uU = "jq2zyb9", dU = "jq2zyba", fU = "jq2zybb", hU = "jq2zybc", mU = "jq2zybd", pU = "jq2zybe", gU = "jq2zybf jq2zybe", vU = "jq2zybg", yU = "jq2zybh", bU = "jq2zybi", xU = "jq2zybj", SU = "jq2zybk", wU = "jq2zybl", jU = "jq2zybm", EU = "jq2zybn", NU = "jq2zybo", CU = "jq2zybp", TU = "jq2zybq", RU = "jq2zybr", _U = "jq2zybs", MU = "jq2zybt", AU = "jq2zybu", DU = "jq2zybv", kU = "jq2zybw", zU = "jq2zybx", OU = "jq2zyby", yx = "jq2zybz", LU = "jq2zyb10", $U = "jq2zyb11", UU = "jq2zyb12";
const BU = ["cancelled", "failed", "partial"], VU = 2600;
function IU() {
  const { run: t } = Nl(), a = ei(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, p] = g.useState(null), [y, m] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const C = setTimeout(() => v(null), VU);
    return () => clearTimeout(C);
  }, [b]);
  const w = g.useMemo(() => FU(s), [s]), S = BU.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, T = async () => {
    if (s.deploymentId) {
      u(!0), p(null);
      try {
        const { runId: C } = await h1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${C}`);
      } catch (C) {
        p(PU(C));
      } finally {
        u(!1);
      }
    }
  }, R = g.useCallback((C) => {
    m((V) => V === C ? null : C);
  }, []), N = g.useCallback(() => {
    m(null);
  }, []), D = (C, V) => {
    i((Q) => qU(Q, C, V)), m(null), v({ message: "Segment edited", severity: "success" });
  }, O = g.useCallback((C) => {
    v({ message: C, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: aU, children: [
    /* @__PURE__ */ c.jsxs("div", { className: rU, children: [
      /* @__PURE__ */ c.jsxs("header", { className: sU, children: [
        /* @__PURE__ */ c.jsxs("p", { className: iU, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Gh, { to: `/${s.deploymentId}/recipe`, className: lU, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: oU, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: cU, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: uU, children: [
            YU(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: dU, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Jr, { size: "md", tone: KU(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: fU, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(sc, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(sc, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          sc,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          sc,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: yU, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: bU, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: xU, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: SU, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Qe, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: wU, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(jT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: jU, children: [
            /* @__PURE__ */ c.jsx("span", { className: EU, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: NU, children: s.utterances.map((C) => {
          const V = y === C.utteranceId, Q = C.status === "completed" && C.audioArtifactRef !== null && C.audioArtifactRef !== void 0, te = C.derivedArtifactRef ?? C.audioArtifactRef ?? null, M = te ? `/api/v1/artifacts/${encodeURIComponent(te)}/download` : "", F = (C.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: TU, children: [
            /* @__PURE__ */ c.jsxs("div", { className: CU, children: [
              /* @__PURE__ */ c.jsxs("span", { className: _U, children: [
                "#",
                C.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: MU, title: C.characterDisplay, children: C.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: AU, title: C.text, children: C.text }),
              /* @__PURE__ */ c.jsxs("span", { className: DU, children: [
                C.cacheHit && /* @__PURE__ */ c.jsx("span", { className: kU, children: "cached" }),
                F && /* @__PURE__ */ c.jsx("span", { className: RU, children: "edited" }),
                C.durationMs ? /* @__PURE__ */ c.jsx("span", { children: GU(C.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Jr, { tone: XU(C.status), children: C.status }),
                Q && /* @__PURE__ */ c.jsx(
                  Qe,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(C.utteranceId),
                    "aria-expanded": V,
                    "aria-label": V ? "Close segment editor" : "Edit segment",
                    children: V ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            V && M && s.deploymentId && /* @__PURE__ */ c.jsx(
              tU,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: C,
                audioUrl: M,
                onApplied: (k) => D(C.utteranceId, k),
                onError: O,
                onCancel: N
              }
            )
          ] }, C.utteranceId);
        }) })
      ] }),
      HU(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: UU,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function HU(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: zU, children: a ? /* @__PURE__ */ c.jsxs("div", { className: LU, children: [
    /* @__PURE__ */ c.jsx("p", { className: $U, children: i }),
    /* @__PURE__ */ c.jsxs(
      Qe,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: yx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: OU,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: yx, children: "↓" })
      ]
    }
  ) : null });
}
function qU(t, a, s) {
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
function sc({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: hU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: mU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? gU : pU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: vU, "aria-hidden": "true" })
      ]
    }
  );
}
function FU(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function YU(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function GU(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function PU(t) {
  return t instanceof ti ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function KU(t) {
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
function XU(t) {
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
var QU = "pcphqj2", ZU = "pcphqj3", JU = "pcphqj4", WU = "pcphqj5", e9 = "pcphqj6", t9 = "pcphqj7", n9 = "pcphqj8", a9 = "pcphqj9", r9 = "pcphqja", bx = "pcphqjb", s9 = "pcphqjc", i9 = "pcphqjd", l9 = "pcphqje pcphqjd", o9 = "pcphqjf", c9 = "pcphqjg", u9 = "pcphqjh", d9 = "pcphqji", f9 = "pcphqjj pcphqji", h9 = "pcphqjk pcphqji", m9 = "pcphqjl pcphqji", p9 = "pcphqjm", Kf = "pcphqjn", Xf = "pcphqjo";
function g9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const p = await Et("/runtime/queue");
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: QU, children: /* @__PURE__ */ c.jsxs("div", { className: ZU, children: [
    /* @__PURE__ */ c.jsxs("header", { className: JU, children: [
      /* @__PURE__ */ c.jsx("p", { className: WU, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: e9, children: [
        /* @__PURE__ */ c.jsx("h1", { className: t9, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: n9, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: a9, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(Ic, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: r9, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${bx} ${s9}` : bx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? l9 : i9, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: o9, children: [
                /* @__PURE__ */ c.jsx("span", { className: c9, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: u9, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: v9(o.kind), children: y9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: p9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: b9(o.etaSeconds) }),
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
function v9(t) {
  switch (t) {
    case "batch":
      return f9;
    case "test_line":
      return h9;
    case "resume":
      return m9;
    default:
      return d9;
  }
}
function y9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function b9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function x9() {
  const { deploymentId: t, prefillCharacterName: a } = Nl(), s = ei(), [i, o] = g.useState(a), [u, f] = g.useState(""), [p, y] = g.useState("none"), [m, b] = g.useState(!1), [v, w] = g.useState(null), S = g.useRef(null);
  g.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), b(!0), w(null);
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
            onChange: (T) => o(T.currentTarget.value),
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
            onChange: (T) => f(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: p, onChange: (T) => y(T.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Qe, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: v })
    ] })
  ] });
}
var S9 = "_1oor31e0", w9 = "_1oor31e1", j9 = "_1oor31e2", E9 = "_1oor31e3", N9 = "_1oor31e4", C9 = "_1oor31e5", T9 = "_1oor31e6", R9 = "_1oor31e7", _9 = "_1oor31e8";
const M9 = 8;
function A9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: S9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: _9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: R9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: w9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: j9, children: [
      /* @__PURE__ */ c.jsx("span", { className: E9, children: k9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: N9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: C9, title: o.digest_after, children: D9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: T9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function D9(t) {
  return t ? `${t.slice(0, M9)}…` : "—";
}
function k9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var xx = "_1c63kaw0", z9 = "_1c63kaw1", O9 = "_1c63kaw2", L9 = "_1c63kaw3", $9 = "_1c63kaw4", U9 = "_1c63kaw5", B9 = "_1c63kaw6";
function V9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: xx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: z9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: xx, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: O9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: L9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: $9, children: [
      /* @__PURE__ */ c.jsx("span", { className: U9, children: Sx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: B9, children: I9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Qe,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${Sx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function Sx(t) {
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
function I9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${wx(t.start_ms)} → ${wx(t.end_ms)}`;
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
function wx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var ic = "_1o3ytop0", Zf = "_1o3ytop1", jx = "_1o3ytop2", H9 = "_1o3ytop3", q9 = "_1o3ytop4", F9 = "_1o3ytop5", Y9 = "_1o3ytop6", G9 = "_1o3ytop7", lc = "_1o3ytop8", P9 = "_1o3ytop9", K9 = "_1o3ytopf", X9 = "_1o3ytopg", Q9 = "_1o3ytoph", Z9 = "_1o3ytopi", J9 = "_1o3ytopj", W9 = "_1o3ytopk", eB = "_1t0zy2f0", tB = "_1t0zy2f1", nB = "_1t0zy2f2";
function aB({ content: t, children: a, delayMs: s = 350 }) {
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
  return /* @__PURE__ */ c.jsxs("span", { className: eB, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: nB, children: t })
  ] });
}
function oc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(aB, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: tB, children: "?" }) });
}
const Ex = -16;
function rB(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, p = g.useMemo(
    () => sB(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, m] = g.useState(() => Jf(f)), [b, v] = g.useState(qc), [w, S] = g.useState(!1), [j, T] = g.useState(null), [R, N] = g.useState(null), [D, O] = g.useState(!1), [C, V] = g.useState(!1), [Q, te] = g.useState(!1), [M, F] = g.useState(null), [k, I] = g.useState([]), [J, he] = g.useState(null), [K, ie] = g.useState([]), [A, Y] = g.useState(!1), [$, q] = g.useState(null), [oe, _] = g.useState(0), ae = g.useRef(null), re = g.useRef(null), G = g.useRef(null), U = g.useRef(null), W = g.useRef(null), ue = g.useRef(0), ve = g.useMemo(
    () => y.ops.some((we) => we.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const we = Jf(f);
    m(we), v(N1(we)), T(null), te(!1), I([]), he(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Ce = g.useCallback((we) => {
    v(we), m((Le) => E1(Le, we));
  }, []);
  g.useEffect(() => {
    U.current?.abort();
    const we = new AbortController();
    return U.current = we, Y(!0), q(null), hc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: we.signal
    }).then((Le) => {
      we.signal.aborted || ie(Le.entries);
    }).catch((Le) => {
      if (we.signal.aborted) return;
      const Xe = Le instanceof Error ? Le.message : "audit fetch failed";
      q(Xe);
    }).finally(() => {
      we.signal.aborted || Y(!1);
    }), () => we.abort();
  }, [s, a.voiceAssetId, oe]), g.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), g.useEffect(() => () => {
    re.current?.abort(), G.current?.abort(), U.current?.abort();
  }, []);
  const Ge = y.ops.find((we) => we.mode === "trim"), Ee = y.ops.find((we) => we.mode === "normalize"), Ze = Ge?.start_ms ?? 0, Ie = Ge?.end_ms ?? Math.max(1, f), Pe = g.useCallback((we, Le) => {
    m(
      (Xe) => Nx(
        Xe,
        "trim",
        (ot) => ({
          ...ot,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(we)),
          end_ms: Math.max(Math.floor(we) + 1, Math.floor(Le))
        })
      )
    );
  }, []), cn = g.useCallback(
    (we) => Pe(we, Ie),
    [Ie, Pe]
  ), Ct = g.useCallback(
    (we) => Pe(Ze, we),
    [Ze, Pe]
  ), Tt = g.useCallback((we) => {
    m((Le) => {
      const Xe = Le.ops.filter((ot) => ot.mode !== "normalize");
      if (we) {
        const ot = {
          id: kn(),
          mode: "normalize",
          target_lufs: Ex
        };
        return { ...Le, ops: [...Xe, ot] };
      }
      return { ...Le, ops: Xe };
    });
  }, []), Vt = g.useCallback(
    (we) => {
      const Le = y.ops.findIndex((Ut) => Ut.id === we);
      if (Le === -1) return;
      const Xe = y.ops[Le];
      if (!Xe) return;
      const ot = [...y.ops.slice(0, Le), ...y.ops.slice(Le + 1)];
      m({ ...y, ops: ot }), I((Ut) => [...Ut, { op: Xe, index: Le }]);
    },
    [y]
  ), kt = g.useCallback(() => {
    const we = k[k.length - 1];
    if (!we) return;
    const Le = Math.min(we.index, y.ops.length), Xe = [...y.ops.slice(0, Le), we.op, ...y.ops.slice(Le)];
    m({ ...y, ops: Xe }), I(k.slice(0, -1));
  }, [y, k]), sn = g.useCallback(() => {
    const we = p1(y, f);
    return we ? (T(we.message), !1) : (T(null), !0);
  }, [y, f]), Xt = g.useCallback(async () => {
    if (!sn() || D) return;
    re.current?.abort();
    const we = new AbortController();
    re.current = we;
    const Le = ++ue.current;
    V(!0);
    try {
      const Xe = await bR(a.voiceAssetId, s, y, {
        signal: we.signal
      });
      if (we.signal.aborted || Le !== ue.current) return;
      R && URL.revokeObjectURL(R);
      const ot = URL.createObjectURL(Xe);
      N(ot), te(!0), requestAnimationFrame(() => ae.current?.play().catch(() => {
      }));
    } catch (Xe) {
      if (we.signal.aborted) return;
      const ot = Xe instanceof Error ? Xe.message : "preview failed";
      T(ot), u(ot);
    } finally {
      we.signal.aborted || V(!1);
    }
  }, [sn, D, a.voiceAssetId, s, y, R, u]), Rt = g.useCallback(async () => {
    if (!sn() || C || D) return;
    if (i.length > 1) {
      const Le = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${Le}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    re.current?.abort(), G.current?.abort();
    const we = new AbortController();
    G.current = we, O(!0);
    try {
      const Le = W.current ?? void 0, Xe = await m1(
        a.voiceAssetId,
        s,
        Le ? { chain: y, digest_before: Le } : { chain: y },
        { signal: we.signal }
      );
      if (we.signal.aborted) return;
      W.current = Xe.chain_digest, he(Xe.chain_digest), T(null), F(Xe.measured_lufs ?? null), I([]), o(Xe), _((ot) => ot + 1);
    } catch (Le) {
      if (we.signal.aborted) return;
      const Xe = Le instanceof Qs;
      Le instanceof Qs && (W.current = Le.currentDigest || null);
      const ot = Xe ? "Edit chain has changed in another tab. Reload to continue." : Le instanceof Error ? Le.message : "apply failed";
      T(ot), u(ot);
    } finally {
      we.signal.aborted || O(!1);
    }
  }, [
    sn,
    C,
    D,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), $t = g.useCallback(() => {
    re.current?.abort(), m(Jf(f)), T(null), F(null), te(!1), I([]), _((we) => we + 1), R && (URL.revokeObjectURL(R), N(null));
  }, [f, R]), _t = g.useCallback((we) => {
    m(
      (Le) => Nx(
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
  return /* @__PURE__ */ c.jsxs(pw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      gw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${cc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      hw,
      {
        audioUrl: p,
        durationMs: Math.max(1, f),
        startMs: Ze,
        endMs: Ie,
        onChangeStart: cn,
        onChangeEnd: Ct
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          oc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: jx, children: [
        cc(Ze),
        " → ",
        cc(Ie),
        " · ",
        cc(Ie - Ze)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: G9, children: [
      /* @__PURE__ */ c.jsxs("div", { className: lc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              oc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          ve && Ee && /* @__PURE__ */ c.jsxs("span", { className: K9, children: [
            "target ",
            Ee.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: P9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ve,
              onChange: (we) => Tt(we.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Ex.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ve && Ee && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: Q9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ee.target_lufs,
            onChange: (we) => _t(Number(we.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: lc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              oc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: jx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(V9, { chain: y, onRemoveOp: Vt })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: lc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: H9,
            onClick: () => S((we) => !we),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: q9, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: F9, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                oc,
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
            onChange: Ce,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      J && /* @__PURE__ */ c.jsx("div", { className: lc, children: /* @__PURE__ */ c.jsxs("span", { className: ic, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: Y9, title: J, children: [
          J.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(vw, { children: [
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "secondary",
          onClick: () => void Xt(),
          disabled: C || D,
          children: C ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          onClick: () => void Rt(),
          disabled: D || C,
          children: D ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Qe,
        {
          variant: "ghost",
          onClick: $t,
          disabled: D || C,
          children: "Reset"
        }
      ),
      k.length > 0 && /* @__PURE__ */ c.jsxs(
        Qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: kt,
          disabled: D || C,
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
          className: W9,
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
        ref: ae,
        src: R,
        controls: !0,
        className: X9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Dn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: Z9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: J9, children: [
        "Edit history",
        K.length > 0 ? ` · ${K.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        A9,
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
function Nx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: kn(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function cc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function sB(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var iB = "go9vi12", lB = "go9vi13", oB = "go9vi14", cB = "go9vi15", uB = "go9vi16", dB = "go9vi17", fB = "go9vi18", hB = "go9vi19", mB = "go9vi1a", pB = "go9vi1b go9vi1a", gB = "go9vi1c", vB = "go9vi1d", yB = "go9vi1e", bB = "go9vi1f", xB = "go9vi1g", SB = "go9vi1h", wB = "go9vi1i", jB = "go9vi1j", Cx = "go9vi1k", EB = "go9vi1l", NB = "go9vi1m", CB = "go9vi1n", Oc = "go9vi1o", TB = "go9vi1q", RB = "go9vi1r go9vi1q", _B = "go9vi1s go9vi1q", MB = "go9vi1t", AB = "go9vi1u", DB = "go9vi1v", kB = "go9vi1w", yw = "go9vi1x", zB = "go9vi1y", OB = "go9vi1z", LB = "go9vi110 go9vi1o", $B = "go9vi111", UB = "go9vi112", BB = "go9vi113", VB = "go9vi114", IB = "go9vi115", HB = "go9vi116";
function qB() {
  const { deployment: t, mappings: a, voiceAssets: s } = Nl(), i = ei(), [o, u] = g.useState(a), [f, p] = g.useState(s), [y, m] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, T] = g.useState(null), [R, N] = g.useState(null), [D, O] = g.useState(null), [C, V] = g.useState(0), Q = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), te = g.useCallback((G) => {
    O(G), window.setTimeout(() => {
      O((U) => U === G ? null : U);
    }, 1600);
  }, []), M = g.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const U of f) G.set(U.voiceAssetId, U);
    return G;
  }, [f]), F = g.useMemo(() => {
    const G = b.trim().toLowerCase();
    return G ? o.filter((U) => U.characterName.toLowerCase().includes(G)) : o;
  }, [o, b]), k = g.useMemo(
    () => o.find((G) => G.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), p(s), m(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const G = setTimeout(() => T(null), 2600);
    return () => clearTimeout(G);
  }, [j]);
  const I = g.useCallback(async () => {
    const G = await Xs(t.deploymentId);
    p(G.voiceAssets);
  }, [t.deploymentId]), J = g.useCallback(
    (G) => {
      u(
        (U) => U.map((W) => W.mappingId === y ? { ...W, ...G } : W)
      );
    },
    [y]
  ), he = g.useCallback(
    async (G) => {
      if (!k) return;
      const U = k;
      try {
        const W = await dl(t.deploymentId, k.mappingId, G);
        u((ue) => ue.map((ve) => ve.mappingId === W.mappingId ? W : ve)), Object.prototype.hasOwnProperty.call(G, "characterName") && te(W.mappingId);
      } catch (W) {
        u(
          (ue) => ue.map((ve) => ve.mappingId === U.mappingId ? U : ve)
        ), S(gr(W));
      }
    },
    [k, t.deploymentId, te]
  ), K = g.useCallback(async () => {
    const G = f[0];
    if (!G) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = QB(o), W = await Ph(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: G.voiceAssetId
      });
      u((ue) => [...ue, W]), m(W.mappingId), V((ue) => ue + 1);
    } catch (U) {
      S(gr(U));
    }
  }, [t.deploymentId, f, o]), ie = g.useCallback(() => {
    k && N({ id: k.mappingId, name: k.characterName });
  }, [k]), A = g.useCallback(async () => {
    if (!R) return;
    const { id: G, name: U } = R;
    N(null);
    try {
      await f1(t.deploymentId, G), u((W) => W.filter((ue) => ue.mappingId !== G)), m(null), T(`Mapping for ${U} deactivated.`);
    } catch (W) {
      S(gr(W));
    }
  }, [t.deploymentId, R]), Y = g.useCallback(
    async (G, U, W) => {
      try {
        const ue = await Sc(t.deploymentId, G, U, W);
        return p((ve) => [ue, ...ve]), T(`${ue.displayName} uploaded.`), ue;
      } catch (ue) {
        return S(gr(ue)), null;
      }
    },
    [t.deploymentId]
  ), $ = g.useCallback(async () => {
    try {
      const G = await sT(t.deploymentId);
      t7(G, `${t.deploymentId}-mappings.json`), T("Mappings exported to JSON.");
    } catch (G) {
      S(gr(G));
    }
  }, [t.deploymentId]), q = g.useCallback(
    async (G, U) => {
      try {
        const W = await iT(
          t.deploymentId,
          G.mappings,
          U
        );
        T(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const ue = await Xs(t.deploymentId);
        p(ue.voiceAssets);
      } catch (W) {
        S(gr(W));
      }
    },
    [t.deploymentId]
  ), oe = g.useCallback(
    async (G) => {
      if (await I(), k && G.chain_digest)
        try {
          const U = await dl(t.deploymentId, k.mappingId, {
            voiceAssetChainDigest: G.chain_digest
          });
          u(
            (W) => W.map((ue) => ue.mappingId === U.mappingId ? U : ue)
          );
        } catch (U) {
          S(gr(U));
        }
      T("Edit applied.");
    },
    [I, k, t.deploymentId]
  ), _ = g.useCallback((G) => {
    S(G);
  }, []), ae = g.useCallback(
    async (G, U) => {
      if (!k) return null;
      const W = G.trim() || `[${k.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await uT(t.deploymentId, {
          line: W,
          outputFormat: U
        })).runId };
      } catch (ue) {
        return S(gr(ue)), null;
      }
    },
    [t.deploymentId, k]
  ), re = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: iB, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: lB, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: oB,
          onClick: Q,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: cB, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: uB, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: dB, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            re
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Qe, { variant: "primary", size: "sm", onClick: K, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: fB,
          placeholder: "Search characters",
          value: b,
          onChange: (G) => v(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(XB, { onExport: $, onImport: q, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: hB, children: F.length === 0 ? /* @__PURE__ */ c.jsx(
        Ic,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : F.map((G) => {
        const U = M.get(G.speakerVoiceAssetId), W = G.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? pB : mB,
            onClick: () => m(G.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: gB, "aria-hidden": "true", children: ZB(G.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: vB, children: [
                /* @__PURE__ */ c.jsx("span", { className: yB, children: G.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: bB, children: U?.displayName ?? "no voice" })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: xB, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(bm, { features: jm, children: /* @__PURE__ */ c.jsx(qS, { children: j && /* @__PURE__ */ c.jsx(
        wm.div,
        {
          className: zB,
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
        /* @__PURE__ */ c.jsx(Qe, { variant: "danger", size: "sm", onClick: () => void A(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Qe, { variant: "ghost", size: "sm", onClick: () => N(null), children: "Cancel" })
      ] }),
      k ? /* @__PURE__ */ c.jsx(
        YB,
        {
          deploymentId: t.deploymentId,
          mapping: k,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (G) => {
            J({ characterName: G });
          },
          onNameSave: (G) => {
            const U = G.trim();
            U && he({ characterName: U });
          },
          savedHint: D === k.mappingId,
          autoFocusNonce: C,
          onSpeakerChange: (G) => {
            J({ speakerVoiceAssetId: G }), he({ speakerVoiceAssetId: G });
          },
          onDelete: ie,
          onUploadVoice: async (G, U, W) => {
            const ue = await Y(G, U, W);
            return ue && W === "speaker" && (J({ speakerVoiceAssetId: ue.voiceAssetId }), he({ speakerVoiceAssetId: ue.voiceAssetId })), await I(), ue;
          },
          onTestLine: ae,
          onEditChainPersisted: oe,
          onEditError: _
        },
        k.mappingId
      ) : /* @__PURE__ */ c.jsx(
        FB,
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
function FB({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: BB, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: VB, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: IB, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      bw,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Va, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Ic,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function YB(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((N) => N.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (N) => N.isActive && N.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((N) => N.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, p] = g.useState(""), [y, m] = g.useState("mp3"), [b, v] = g.useState("idle"), [w, S] = g.useState(null), j = g.useRef(!1), T = g.useRef(null);
  g.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), g.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const N = T.current;
    N && (N.focus(), N.select());
  }, [t.autoFocusNonce]);
  const R = g.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const N = await t.onTestLine(f, y);
    if (j.current) return;
    if (!N) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: D } = N;
    for (let O = 0; O < 60; O += 1) {
      if (await new Promise((C) => setTimeout(C, 500)), j.current) return;
      try {
        const C = await Kh(t.deploymentId, D);
        if (j.current) return;
        if (C.status === "completed") {
          v("done");
          return;
        }
        if (C.status === "failed" || C.status === "cancelled") {
          v("error"), S(`Run ${C.status}.`);
          return;
        }
      } catch (C) {
        if (j.current) return;
        v("error"), S(C instanceof Error ? C.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: SB, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: wB, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: yw, children: /* @__PURE__ */ c.jsx(Qe, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: OB,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: LB,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (N) => p(N.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Oc,
              value: y,
              onChange: (N) => m(N.currentTarget.value),
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
            Qe,
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
    /* @__PURE__ */ c.jsxs("div", { className: jB, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: CB, children: [
          /* @__PURE__ */ c.jsxs("span", { className: EB, children: [
            /* @__PURE__ */ c.jsx("span", { className: Cx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: NB,
                role: "status",
                "aria-live": "polite",
                children: "✓ Saved"
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: T,
              className: Oc,
              value: a.characterName,
              onChange: (N) => t.onNameChange(N.currentTarget.value),
              onBlur: (N) => t.onNameSave(N.currentTarget.value),
              onKeyDown: (N) => {
                N.key === "Enter" && (N.preventDefault(), N.currentTarget.blur());
              },
              placeholder: "Type a name and press Enter"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Xr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Cx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          GB,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(PB, { voice: o }),
        /* @__PURE__ */ c.jsx(
          bw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (N) => t.onUploadVoice(N, N.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          rB,
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
function GB({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Oc,
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
function PB({ voice: t }) {
  const a = JB(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: MB, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: WB(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: AB, children: [
      /* @__PURE__ */ c.jsx("div", { className: DB, children: /* @__PURE__ */ c.jsx(bm, { features: jm, children: /* @__PURE__ */ c.jsx(
        wm.div,
        {
          className: kB,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(KB, { seed: t.contentSha256 })
  ] });
}
function KB({ seed: t }) {
  const a = g.useMemo(() => e7(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: $B, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: UB,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function bw({
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
      className: o ? _B : s ? RB : TB,
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
function XB({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: yw, children: [
    /* @__PURE__ */ c.jsx(Qe, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: HB,
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
    /* @__PURE__ */ c.jsx(Qe, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: Oc,
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
function QB(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function ZB(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function JB(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function WB(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function e7(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function t7(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
function n7() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await aT();
        return { deployments: t };
      },
      Component: IT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return dN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Yy(a),
          Gy(a),
          lT(a, { limit: 10 }),
          mT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: A$
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Kh(a, s) };
      },
      Component: IU
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Yy(a),
          Gy(a),
          Xs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: qB
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
      Component: x9
    },
    {
      path: "/runtime/queue",
      Component: g9
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const Tx = "ext-actions-request", a7 = "ext-actions-declare", r7 = "ext-action-state", Rx = "ext-action-invoke", Mh = "emotion-tts:navigate", qs = "emotion-tts.run", _x = "emotion-tts.mappings", s7 = 4e3;
function i7(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return l7(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: _x,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(a7, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, p = () => {
    t.dispatchEvent(
      new CustomEvent(r7, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), m = (j) => {
    const T = j.detail?.id;
    T === qs ? b() : T === _x && t.dispatchEvent(
      new CustomEvent(Mh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", T = j === "ready" || j === "running" || j === "starting";
    i = !0, p();
    try {
      T ? await I2() : await V2();
      try {
        s = await wc();
      } catch {
      }
    } catch {
    } finally {
      i = !1, p();
    }
  };
  t.addEventListener(Tx, y), t.addEventListener(Rx, m);
  let v = !1;
  const w = async () => {
    try {
      const j = await wc();
      if (v) return;
      s = j, p();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), s7);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(Tx, y), t.removeEventListener(Rx, m);
    }
  };
}
function l7(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qs,
    label: x1(t),
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
const Ah = "emotion-tts-app", o7 = "ext-event", Mx = "emotion-tts-stylesheet", Ax = ["accent", "density", "card"];
function c7(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function u7() {
  if (typeof document > "u" || document.getElementById(Mx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Mx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
u7();
class d7 extends HTMLElement {
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
    this.root = LE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Mh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = i7(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
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
    for (const a of Ax) {
      const s = c7(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Ax.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = yC(n7(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(xC, { router: s }) })
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
      new CustomEvent(o7, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function f7() {
  typeof customElements > "u" || customElements.get(Ah) || customElements.define(Ah, d7);
}
typeof customElements < "u" && !customElements.get(Ah) && f7();
export {
  f7 as register
};
//# sourceMappingURL=emotion-tts.js.map
