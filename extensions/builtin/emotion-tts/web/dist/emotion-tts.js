function xE(t, a) {
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
function Tx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var rf = { exports: {} }, Ki = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iy;
function SE() {
  if (iy) return Ki;
  iy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function s(i, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
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
var ly;
function wE() {
  return ly || (ly = 1, rf.exports = SE()), rf.exports;
}
var c = wE(), sf = { exports: {} }, Fe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oy;
function jE() {
  if (oy) return Fe;
  oy = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
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
  }, N = Object.assign, C = {};
  function T(_, ne, J) {
    this.props = _, this.context = ne, this.refs = C, this.updater = J || j;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(_, ne) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, ne, "setState");
  }, T.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function M() {
  }
  M.prototype = T.prototype;
  function z(_, ne, J) {
    this.props = _, this.context = ne, this.refs = C, this.updater = J || j;
  }
  var R = z.prototype = new M();
  R.constructor = z, N(R, T.prototype), R.isPureReactComponent = !0;
  var I = Array.isArray;
  function X() {
  }
  var ie = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function V(_, ne, J) {
    var Y = J.ref;
    return {
      $$typeof: t,
      type: _,
      key: ne,
      ref: Y !== void 0 ? Y : null,
      props: J
    };
  }
  function D(_, ne) {
    return V(_.type, ne, _.props);
  }
  function H(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function te(_) {
    var ne = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(J) {
      return ne[J];
    });
  }
  var K = /\/+/g;
  function le(_, ne) {
    return typeof _ == "object" && _ !== null && _.key != null ? te("" + _.key) : ne.toString(36);
  }
  function re(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(X, X) : (_.status = "pending", _.then(
          function(ne) {
            _.status === "pending" && (_.status = "fulfilled", _.value = ne);
          },
          function(ne) {
            _.status === "pending" && (_.status = "rejected", _.reason = ne);
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
  function k(_, ne, J, Y, U) {
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
              return ue = _._init, k(
                ue(_._payload),
                ne,
                J,
                Y,
                U
              );
          }
      }
    if (ue)
      return U = U(_), ue = Y === "" ? "." + le(_, 0) : Y, I(U) ? (J = "", ue != null && (J = ue.replace(K, "$&/") + "/"), k(U, ne, J, "", function(st) {
        return st;
      })) : U != null && (H(U) && (U = D(
        U,
        J + (U.key == null || _ && _.key === U.key ? "" : ("" + U.key).replace(
          K,
          "$&/"
        ) + "/") + ue
      )), ne.push(U)), 1;
    ue = 0;
    var ve = Y === "" ? "." : Y + ":";
    if (I(_))
      for (var _e = 0; _e < _.length; _e++)
        Y = _[_e], W = ve + le(Y, _e), ue += k(
          Y,
          ne,
          J,
          W,
          U
        );
    else if (_e = S(_), typeof _e == "function")
      for (_ = _e.call(_), _e = 0; !(Y = _.next()).done; )
        Y = Y.value, W = ve + le(Y, _e++), ue += k(
          Y,
          ne,
          J,
          W,
          U
        );
    else if (W === "object") {
      if (typeof _.then == "function")
        return k(
          re(_),
          ne,
          J,
          Y,
          U
        );
      throw ne = String(_), Error(
        "Objects are not valid as a React child (found: " + (ne === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : ne) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ue;
  }
  function $(_, ne, J) {
    if (_ == null) return _;
    var Y = [], U = 0;
    return k(_, Y, "", "", function(W) {
      return ne.call(J, W, U++);
    }), Y;
  }
  function q(_) {
    if (_._status === -1) {
      var ne = _._result;
      ne = ne(), ne.then(
        function(J) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = J);
        },
        function(J) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = J);
        }
      ), _._status === -1 && (_._status = 0, _._result = ne);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var F = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var ne = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(ne)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, ce = {
    map: $,
    forEach: function(_, ne, J) {
      $(
        _,
        function() {
          ne.apply(this, arguments);
        },
        J
      );
    },
    count: function(_) {
      var ne = 0;
      return $(_, function() {
        ne++;
      }), ne;
    },
    toArray: function(_) {
      return $(_, function(ne) {
        return ne;
      }) || [];
    },
    only: function(_) {
      if (!H(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return Fe.Activity = v, Fe.Children = ce, Fe.Component = T, Fe.Fragment = s, Fe.Profiler = o, Fe.PureComponent = z, Fe.StrictMode = i, Fe.Suspense = y, Fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, Fe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ie.H.useMemoCache(_);
    }
  }, Fe.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, Fe.cacheSignal = function() {
    return null;
  }, Fe.cloneElement = function(_, ne, J) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var Y = N({}, _.props), U = _.key;
    if (ne != null)
      for (W in ne.key !== void 0 && (U = "" + ne.key), ne)
        !A.call(ne, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ne.ref === void 0 || (Y[W] = ne[W]);
    var W = arguments.length - 2;
    if (W === 1) Y.children = J;
    else if (1 < W) {
      for (var ue = Array(W), ve = 0; ve < W; ve++)
        ue[ve] = arguments[ve + 2];
      Y.children = ue;
    }
    return V(_.type, U, Y);
  }, Fe.createContext = function(_) {
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
  }, Fe.createElement = function(_, ne, J) {
    var Y, U = {}, W = null;
    if (ne != null)
      for (Y in ne.key !== void 0 && (W = "" + ne.key), ne)
        A.call(ne, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (U[Y] = ne[Y]);
    var ue = arguments.length - 2;
    if (ue === 1) U.children = J;
    else if (1 < ue) {
      for (var ve = Array(ue), _e = 0; _e < ue; _e++)
        ve[_e] = arguments[_e + 2];
      U.children = ve;
    }
    if (_ && _.defaultProps)
      for (Y in ue = _.defaultProps, ue)
        U[Y] === void 0 && (U[Y] = ue[Y]);
    return V(_, W, U);
  }, Fe.createRef = function() {
    return { current: null };
  }, Fe.forwardRef = function(_) {
    return { $$typeof: m, render: _ };
  }, Fe.isValidElement = H, Fe.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: q
    };
  }, Fe.memo = function(_, ne) {
    return {
      $$typeof: p,
      type: _,
      compare: ne === void 0 ? null : ne
    };
  }, Fe.startTransition = function(_) {
    var ne = ie.T, J = {};
    ie.T = J;
    try {
      var Y = _(), U = ie.S;
      U !== null && U(J, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(X, F);
    } catch (W) {
      F(W);
    } finally {
      ne !== null && J.types !== null && (ne.types = J.types), ie.T = ne;
    }
  }, Fe.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, Fe.use = function(_) {
    return ie.H.use(_);
  }, Fe.useActionState = function(_, ne, J) {
    return ie.H.useActionState(_, ne, J);
  }, Fe.useCallback = function(_, ne) {
    return ie.H.useCallback(_, ne);
  }, Fe.useContext = function(_) {
    return ie.H.useContext(_);
  }, Fe.useDebugValue = function() {
  }, Fe.useDeferredValue = function(_, ne) {
    return ie.H.useDeferredValue(_, ne);
  }, Fe.useEffect = function(_, ne) {
    return ie.H.useEffect(_, ne);
  }, Fe.useEffectEvent = function(_) {
    return ie.H.useEffectEvent(_);
  }, Fe.useId = function() {
    return ie.H.useId();
  }, Fe.useImperativeHandle = function(_, ne, J) {
    return ie.H.useImperativeHandle(_, ne, J);
  }, Fe.useInsertionEffect = function(_, ne) {
    return ie.H.useInsertionEffect(_, ne);
  }, Fe.useLayoutEffect = function(_, ne) {
    return ie.H.useLayoutEffect(_, ne);
  }, Fe.useMemo = function(_, ne) {
    return ie.H.useMemo(_, ne);
  }, Fe.useOptimistic = function(_, ne) {
    return ie.H.useOptimistic(_, ne);
  }, Fe.useReducer = function(_, ne, J) {
    return ie.H.useReducer(_, ne, J);
  }, Fe.useRef = function(_) {
    return ie.H.useRef(_);
  }, Fe.useState = function(_) {
    return ie.H.useState(_);
  }, Fe.useSyncExternalStore = function(_, ne, J) {
    return ie.H.useSyncExternalStore(
      _,
      ne,
      J
    );
  }, Fe.useTransition = function() {
    return ie.H.useTransition();
  }, Fe.version = "19.2.5", Fe;
}
var cy;
function Ah() {
  return cy || (cy = 1, sf.exports = jE()), sf.exports;
}
var g = Ah();
const xe = /* @__PURE__ */ Tx(g), EE = /* @__PURE__ */ xE({
  __proto__: null,
  default: xe
}, [g]);
var lf = { exports: {} }, Xi = {}, of = { exports: {} }, cf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uy;
function NE() {
  return uy || (uy = 1, (function(t) {
    function a(k, $) {
      var q = k.length;
      k.push($);
      e: for (; 0 < q; ) {
        var F = q - 1 >>> 1, ce = k[F];
        if (0 < o(ce, $))
          k[F] = $, k[q] = ce, q = F;
        else break e;
      }
    }
    function s(k) {
      return k.length === 0 ? null : k[0];
    }
    function i(k) {
      if (k.length === 0) return null;
      var $ = k[0], q = k.pop();
      if (q !== $) {
        k[0] = q;
        e: for (var F = 0, ce = k.length, _ = ce >>> 1; F < _; ) {
          var ne = 2 * (F + 1) - 1, J = k[ne], Y = ne + 1, U = k[Y];
          if (0 > o(J, q))
            Y < ce && 0 > o(U, J) ? (k[F] = U, k[Y] = q, F = Y) : (k[F] = J, k[ne] = q, F = ne);
          else if (Y < ce && 0 > o(U, q))
            k[F] = U, k[Y] = q, F = Y;
          else break e;
        }
      }
      return $;
    }
    function o(k, $) {
      var q = k.sortIndex - $.sortIndex;
      return q !== 0 ? q : k.id - $.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      t.unstable_now = function() {
        return u.now();
      };
    } else {
      var f = Date, m = f.now();
      t.unstable_now = function() {
        return f.now() - m;
      };
    }
    var y = [], p = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, C = !1, T = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function R(k) {
      for (var $ = s(p); $ !== null; ) {
        if ($.callback === null) i(p);
        else if ($.startTime <= k)
          i(p), $.sortIndex = $.expirationTime, a(y, $);
        else break;
        $ = s(p);
      }
    }
    function I(k) {
      if (N = !1, R(k), !j)
        if (s(y) !== null)
          j = !0, X || (X = !0, te());
        else {
          var $ = s(p);
          $ !== null && re(I, $.startTime - k);
        }
    }
    var X = !1, ie = -1, A = 5, V = -1;
    function D() {
      return C ? !0 : !(t.unstable_now() - V < A);
    }
    function H() {
      if (C = !1, X) {
        var k = t.unstable_now();
        V = k;
        var $ = !0;
        try {
          e: {
            j = !1, N && (N = !1, M(ie), ie = -1), S = !0;
            var q = w;
            try {
              t: {
                for (R(k), v = s(y); v !== null && !(v.expirationTime > k && D()); ) {
                  var F = v.callback;
                  if (typeof F == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var ce = F(
                      v.expirationTime <= k
                    );
                    if (k = t.unstable_now(), typeof ce == "function") {
                      v.callback = ce, R(k), $ = !0;
                      break t;
                    }
                    v === s(y) && i(y), R(k);
                  } else i(y);
                  v = s(y);
                }
                if (v !== null) $ = !0;
                else {
                  var _ = s(p);
                  _ !== null && re(
                    I,
                    _.startTime - k
                  ), $ = !1;
                }
              }
              break e;
            } finally {
              v = null, w = q, S = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? te() : X = !1;
        }
      }
    }
    var te;
    if (typeof z == "function")
      te = function() {
        z(H);
      };
    else if (typeof MessageChannel < "u") {
      var K = new MessageChannel(), le = K.port2;
      K.port1.onmessage = H, te = function() {
        le.postMessage(null);
      };
    } else
      te = function() {
        T(H, 0);
      };
    function re(k, $) {
      ie = T(function() {
        k(t.unstable_now());
      }, $);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(k) {
      k.callback = null;
    }, t.unstable_forceFrameRate = function(k) {
      0 > k || 125 < k ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < k ? Math.floor(1e3 / k) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(k) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = w;
      }
      var q = w;
      w = $;
      try {
        return k();
      } finally {
        w = q;
      }
    }, t.unstable_requestPaint = function() {
      C = !0;
    }, t.unstable_runWithPriority = function(k, $) {
      switch (k) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          k = 3;
      }
      var q = w;
      w = k;
      try {
        return $();
      } finally {
        w = q;
      }
    }, t.unstable_scheduleCallback = function(k, $, q) {
      var F = t.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? F + q : F) : q = F, k) {
        case 1:
          var ce = -1;
          break;
        case 2:
          ce = 250;
          break;
        case 5:
          ce = 1073741823;
          break;
        case 4:
          ce = 1e4;
          break;
        default:
          ce = 5e3;
      }
      return ce = q + ce, k = {
        id: b++,
        callback: $,
        priorityLevel: k,
        startTime: q,
        expirationTime: ce,
        sortIndex: -1
      }, q > F ? (k.sortIndex = q, a(p, k), s(y) === null && k === s(p) && (N ? (M(ie), ie = -1) : N = !0, re(I, q - F))) : (k.sortIndex = ce, a(y, k), j || S || (j = !0, X || (X = !0, te()))), k;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(k) {
      var $ = w;
      return function() {
        var q = w;
        w = $;
        try {
          return k.apply(this, arguments);
        } finally {
          w = q;
        }
      };
    };
  })(cf)), cf;
}
var dy;
function CE() {
  return dy || (dy = 1, of.exports = NE()), of.exports;
}
var uf = { exports: {} }, pn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fy;
function TE() {
  if (fy) return pn;
  fy = 1;
  var t = Ah();
  function a(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + y + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(y, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: p,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(y, p) {
    if (y === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, pn.createPortal = function(y, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(y, p, null, b);
  }, pn.flushSync = function(y) {
    var p = f.T, b = i.p;
    try {
      if (f.T = null, i.p = 2, y) return y();
    } finally {
      f.T = p, i.p = b, i.d.f();
    }
  }, pn.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, i.d.C(y, p));
  }, pn.prefetchDNS = function(y) {
    typeof y == "string" && i.d.D(y);
  }, pn.preinit = function(y, p) {
    if (typeof y == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), w = typeof p.integrity == "string" ? p.integrity : void 0, S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, pn.preinitModule = function(y, p) {
    if (typeof y == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          i.d.M(y, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && i.d.M(y);
  }, pn.preload = function(y, p) {
    if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      i.d.L(y, b, {
        crossOrigin: v,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, pn.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        i.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else i.d.m(y);
  }, pn.requestFormReset = function(y) {
    i.d.r(y);
  }, pn.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, pn.useFormState = function(y, p, b) {
    return f.H.useFormState(y, p, b);
  }, pn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, pn.version = "19.2.5", pn;
}
var hy;
function Rx() {
  if (hy) return uf.exports;
  hy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), uf.exports = TE(), uf.exports;
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
var my;
function RE() {
  if (my) return Xi;
  my = 1;
  var t = CE(), a = Ah(), s = Rx();
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
  function m(e) {
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
  function p(e) {
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), z = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), V = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), H = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object" ? null : (e = H && e[H] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var K = Symbol.for("react.client.reference");
  function le(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === K ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case C:
        return "StrictMode";
      case I:
        return "Suspense";
      case X:
        return "SuspenseList";
      case V:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case M:
          return (e._context.displayName || "Context") + ".Consumer";
        case R:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return n = e.displayName || null, n !== null ? n : le(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return le(e(n));
          } catch {
          }
      }
    return null;
  }
  var re = Array.isArray, k = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, F = [], ce = -1;
  function _(e) {
    return { current: e };
  }
  function ne(e) {
    0 > ce || (e.current = F[ce], F[ce] = null, ce--);
  }
  function J(e, n) {
    ce++, F[ce] = e.current, e.current = n;
  }
  var Y = _(null), U = _(null), W = _(null), ue = _(null);
  function ve(e, n) {
    switch (J(W, n), J(U, e), J(Y, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? _v(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = _v(n), e = Mv(n, e);
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
    ne(Y), J(Y, e);
  }
  function _e() {
    ne(Y), ne(U), ne(W);
  }
  function st(e) {
    e.memoizedState !== null && J(ue, e);
    var n = Y.current, r = Mv(n, e.type);
    n !== r && (J(U, e), J(Y, r));
  }
  function Ce(e) {
    U.current === e && (ne(Y), ne(U)), ue.current === e && (ne(ue), Fi._currentValue = q);
  }
  var Je, He;
  function Ve(e) {
    if (Je === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        Je = n && n[1] || "", He = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Je + e + He;
  }
  var It = !1;
  function jt(e, n) {
    if (!e || It) return "";
    It = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var he = function() {
                throw Error();
              };
              if (Object.defineProperty(he.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(he, []);
                } catch (oe) {
                  var se = oe;
                }
                Reflect.construct(e, [], he);
              } else {
                try {
                  he.call();
                } catch (oe) {
                  se = oe;
                }
                e.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                se = oe;
              }
              (he = e()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (oe) {
            if (oe && se && typeof oe.stack == "string")
              return [oe.stack, se.stack];
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
`), ae = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < ae.length && !ae[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === ae.length)
          for (l = L.length - 1, d = ae.length - 1; 1 <= l && 0 <= d && L[l] !== ae[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== ae[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== ae[d]) {
                  var de = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && de.includes("<anonymous>") && (de = de.replace("<anonymous>", e.displayName)), de;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      It = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? Ve(r) : "";
  }
  function At(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ve(e.type);
      case 16:
        return Ve("Lazy");
      case 13:
        return e.child !== n && n !== null ? Ve("Suspense Fallback") : Ve("Suspense");
      case 19:
        return Ve("SuspenseList");
      case 0:
      case 15:
        return jt(e.type, !1);
      case 11:
        return jt(e.type.render, !1);
      case 1:
        return jt(e.type, !0);
      case 31:
        return Ve("Activity");
      default:
        return "";
    }
  }
  function Mn(e) {
    try {
      var n = "", r = null;
      do
        n += At(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var dt = Object.prototype.hasOwnProperty, Qt = t.unstable_scheduleCallback, un = t.unstable_cancelCallback, Dt = t.unstable_shouldYield, tn = t.unstable_requestPaint, Rt = t.unstable_now, we = t.unstable_getCurrentPriorityLevel, Q = t.unstable_ImmediatePriority, me = t.unstable_UserBlockingPriority, be = t.unstable_NormalPriority, Ie = t.unstable_LowPriority, Ge = t.unstable_IdlePriority, pe = t.log, Ee = t.unstable_setDisableYieldValue, Ne = null, Re = null;
  function ft(e) {
    if (typeof pe == "function" && Ee(e), Re && typeof Re.setStrictMode == "function")
      try {
        Re.setStrictMode(Ne, e);
      } catch {
      }
  }
  var qe = Math.clz32 ? Math.clz32 : yn, dn = Math.log, Hn = Math.LN2;
  function yn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (dn(e) / Hn | 0) | 0;
  }
  var qn = 256, nn = 262144, An = 4194304;
  function fn(e) {
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
  function Ue(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = fn(l) : (x &= E, x !== 0 ? d = fn(x) : r || (r = E & ~e, r !== 0 && (d = fn(r))))) : (E = l & ~h, E !== 0 ? d = fn(E) : x !== 0 ? d = fn(x) : r || (r = l & ~e, r !== 0 && (d = fn(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function ct(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function zt(e, n) {
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
  function Zt() {
    var e = An;
    return An <<= 1, (An & 62914560) === 0 && (An = 4194304), e;
  }
  function Dn(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function pt(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function an(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, ae = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var de = 31 - qe(r), he = 1 << de;
      E[de] = 0, L[de] = -1;
      var se = ae[de];
      if (se !== null)
        for (ae[de] = null, de = 0; de < se.length; de++) {
          var oe = se[de];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~he;
    }
    l !== 0 && Sa(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function Sa(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - qe(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function hn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - qe(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function O(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : G(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function G(e) {
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
    var e = $.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Wv(e.type));
  }
  function ye(e, n) {
    var r = $.p;
    try {
      return $.p = e, n();
    } finally {
      $.p = r;
    }
  }
  var Ae = Math.random().toString(36).slice(2), Se = "__reactFiber$" + Ae, je = "__reactProps$" + Ae, ke = "__reactContainer$" + Ae, Te = "__reactEvents$" + Ae, $e = "__reactListeners$" + Ae, Oe = "__reactHandles$" + Ae, it = "__reactResources$" + Ae, Xe = "__reactMarker$" + Ae;
  function xt(e) {
    delete e[Se], delete e[je], delete e[Te], delete e[$e], delete e[Oe];
  }
  function gt(e) {
    var n = e[Se];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[ke] || r[Se]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = $v(e); e !== null; ) {
            if (r = e[Se]) return r;
            e = $v(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function _t(e) {
    if (e = e[Se] || e[ke]) {
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
  function Ht(e) {
    var n = e[it];
    return n || (n = e[it] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Et(e) {
    e[Xe] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), sa = {};
  function Wt(e, n) {
    fa(e, n), fa(e + "Capture", n);
  }
  function fa(e, n) {
    for (sa[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Cr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ha = {}, Tr = {};
  function ts(e) {
    return dt.call(Tr, e) ? !0 : dt.call(ha, e) ? !1 : Cr.test(e) ? Tr[e] = !0 : (ha[e] = !0, !1);
  }
  function Qe(e, n, r) {
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
  function $t(e, n, r) {
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
  function mn(e, n, r, l) {
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
  function qt(e) {
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
  function Nt(e) {
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
      var n = Nt(e) ? "checked" : "value";
      e._valueTracker = ns(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function _l(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), l = "";
    return e && (l = Nt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Ml(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var mw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      mw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Jc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + qt(n)) : e.value !== "" + qt(n) && (e.value = "" + qt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Wc(e, x, qt(n)) : r != null ? Wc(e, x, qt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + qt(E) : e.removeAttribute("name");
  }
  function jm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        as(e);
        return;
      }
      r = r != null ? "" + qt(r) : "", n = n != null ? "" + qt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), as(e);
  }
  function Wc(e, n, r) {
    n === "number" && Ml(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function rs(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + qt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function Em(e, n, r) {
    if (n != null && (n = "" + qt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + qt(r) : "";
  }
  function Nm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(i(92));
        if (re(l)) {
          if (1 < l.length) throw Error(i(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = qt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), as(e);
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
  var pw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || pw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function Tm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Cm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Cm(e, h, n[h]);
  }
  function eu(e) {
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
  var gw = /* @__PURE__ */ new Map([
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
  ]), vw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Al(e) {
    return vw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var tu = null;
  function nu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var is = null, ls = null;
  function Rm(e) {
    var n = _t(e);
    if (n && (e = n.stateNode)) {
      var r = e[je] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Jc(
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
                Jc(
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
              l = r[n], l.form === e.form && _l(l);
          }
          break e;
        case "textarea":
          Em(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && rs(e, !!r.multiple, n, !1);
      }
    }
  }
  var au = !1;
  function _m(e, n, r) {
    if (au) return e(n, r);
    au = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (au = !1, (is !== null || ls !== null) && (bo(), is && (n = is, e = ls, ls = is = null, Rm(n), e)))
        for (n = 0; n < e.length; n++) Rm(e[n]);
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ru = !1;
  if (ja)
    try {
      var oi = {};
      Object.defineProperty(oi, "passive", {
        get: function() {
          ru = !0;
        }
      }), window.addEventListener("test", oi, oi), window.removeEventListener("test", oi, oi);
    } catch {
      ru = !1;
    }
  var Ya = null, su = null, Dl = null;
  function Mm() {
    if (Dl) return Dl;
    var e, n = su, r = n.length, l, d = "value" in Ya ? Ya.value : Ya.textContent, h = d.length;
    for (e = 0; e < r && n[e] === d[e]; e++) ;
    var x = r - e;
    for (l = 1; l <= x && n[r - l] === d[h - l]; l++) ;
    return Dl = d.slice(e, 1 < l ? 1 - l : void 0);
  }
  function kl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function zl() {
    return !0;
  }
  function Am() {
    return !1;
  }
  function xn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? zl : Am, this.isPropagationStopped = Am, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = zl);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = zl);
      },
      persist: function() {
      },
      isPersistent: zl
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
  }, Ol = xn(Rr), ci = v({}, Rr, { view: 0, detail: 0 }), yw = xn(ci), iu, lu, ui, Ll = v({}, ci, {
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
    getModifierState: cu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ui && (ui && e.type === "mousemove" ? (iu = e.screenX - ui.screenX, lu = e.screenY - ui.screenY) : lu = iu = 0, ui = e), iu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : lu;
    }
  }), Dm = xn(Ll), bw = v({}, Ll, { dataTransfer: 0 }), xw = xn(bw), Sw = v({}, ci, { relatedTarget: 0 }), ou = xn(Sw), ww = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jw = xn(ww), Ew = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Nw = xn(Ew), Cw = v({}, Rr, { data: 0 }), km = xn(Cw), Tw = {
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
  }, Rw = {
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
  }, _w = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Mw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = _w[e]) ? !!n[e] : !1;
  }
  function cu() {
    return Mw;
  }
  var Aw = v({}, ci, {
    key: function(e) {
      if (e.key) {
        var n = Tw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cu,
    charCode: function(e) {
      return e.type === "keypress" ? kl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? kl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Dw = xn(Aw), kw = v({}, Ll, {
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
  }), zm = xn(kw), zw = v({}, ci, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cu
  }), Ow = xn(zw), Lw = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), $w = xn(Lw), Uw = v({}, Ll, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Bw = xn(Uw), Vw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Iw = xn(Vw), Hw = [9, 13, 27, 32], uu = ja && "CompositionEvent" in window, di = null;
  ja && "documentMode" in document && (di = document.documentMode);
  var qw = ja && "TextEvent" in window && !di, Om = ja && (!uu || di && 8 < di && 11 >= di), Lm = " ", $m = !1;
  function Um(e, n) {
    switch (e) {
      case "keyup":
        return Hw.indexOf(n.keyCode) !== -1;
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
  function Bm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var os = !1;
  function Fw(e, n) {
    switch (e) {
      case "compositionend":
        return Bm(n);
      case "keypress":
        return n.which !== 32 ? null : ($m = !0, Lm);
      case "textInput":
        return e = n.data, e === Lm && $m ? null : e;
      default:
        return null;
    }
  }
  function Yw(e, n) {
    if (os)
      return e === "compositionend" || !uu && Um(e, n) ? (e = Mm(), Dl = su = Ya = null, os = !1, e) : null;
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
        return Om && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Gw = {
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
  function Vm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Gw[e.type] : n === "textarea";
  }
  function Im(e, n, r, l) {
    is ? ls ? ls.push(l) : ls = [l] : is = l, n = Co(n, "onChange"), 0 < n.length && (r = new Ol(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var fi = null, hi = null;
  function Pw(e) {
    jv(e, 0);
  }
  function $l(e) {
    var n = We(e);
    if (_l(n)) return e;
  }
  function Hm(e, n) {
    if (e === "change") return n;
  }
  var qm = !1;
  if (ja) {
    var du;
    if (ja) {
      var fu = "oninput" in document;
      if (!fu) {
        var Fm = document.createElement("div");
        Fm.setAttribute("oninput", "return;"), fu = typeof Fm.oninput == "function";
      }
      du = fu;
    } else du = !1;
    qm = du && (!document.documentMode || 9 < document.documentMode);
  }
  function Ym() {
    fi && (fi.detachEvent("onpropertychange", Gm), hi = fi = null);
  }
  function Gm(e) {
    if (e.propertyName === "value" && $l(hi)) {
      var n = [];
      Im(
        n,
        hi,
        e,
        nu(e)
      ), _m(Pw, n);
    }
  }
  function Kw(e, n, r) {
    e === "focusin" ? (Ym(), fi = n, hi = r, fi.attachEvent("onpropertychange", Gm)) : e === "focusout" && Ym();
  }
  function Xw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $l(hi);
  }
  function Qw(e, n) {
    if (e === "click") return $l(n);
  }
  function Zw(e, n) {
    if (e === "input" || e === "change")
      return $l(n);
  }
  function Jw(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var kn = typeof Object.is == "function" ? Object.is : Jw;
  function mi(e, n) {
    if (kn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!dt.call(n, d) || !kn(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Pm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Km(e, n) {
    var r = Pm(e);
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
      r = Pm(r);
    }
  }
  function Xm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Xm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Qm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Ml(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Ml(e.document);
    }
    return n;
  }
  function hu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Ww = ja && "documentMode" in document && 11 >= document.documentMode, cs = null, mu = null, pi = null, pu = !1;
  function Zm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    pu || cs == null || cs !== Ml(l) || (l = cs, "selectionStart" in l && hu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), pi && mi(pi, l) || (pi = l, l = Co(mu, "onSelect"), 0 < l.length && (n = new Ol(
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
  }, gu = {}, Jm = {};
  ja && (Jm = document.createElement("div").style, "AnimationEvent" in window || (delete us.animationend.animation, delete us.animationiteration.animation, delete us.animationstart.animation), "TransitionEvent" in window || delete us.transitionend.transition);
  function Mr(e) {
    if (gu[e]) return gu[e];
    if (!us[e]) return e;
    var n = us[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Jm)
        return gu[e] = n[r];
    return e;
  }
  var Wm = Mr("animationend"), ep = Mr("animationiteration"), tp = Mr("animationstart"), ej = Mr("transitionrun"), tj = Mr("transitionstart"), nj = Mr("transitioncancel"), np = Mr("transitionend"), ap = /* @__PURE__ */ new Map(), vu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vu.push("scrollEnd");
  function ia(e, n) {
    ap.set(e, n), Wt(n, [e]);
  }
  var Ul = typeof reportError == "function" ? reportError : function(e) {
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
  }, Yn = [], ds = 0, yu = 0;
  function Bl() {
    for (var e = ds, n = yu = ds = 0; n < e; ) {
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
      h !== 0 && rp(r, d, h);
    }
  }
  function Vl(e, n, r, l) {
    Yn[ds++] = e, Yn[ds++] = n, Yn[ds++] = r, Yn[ds++] = l, yu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function bu(e, n, r, l) {
    return Vl(e, n, r, l), Il(e);
  }
  function Ar(e, n) {
    return Vl(e, null, null, n), Il(e);
  }
  function rp(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - qe(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Il(e) {
    if (50 < $i)
      throw $i = 0, Rd = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fs = {};
  function aj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zn(e, n, r, l) {
    return new aj(e, n, r, l);
  }
  function xu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = zn(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function sp(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Hl(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") xu(e) && (x = 1);
    else if (typeof e == "string")
      x = oE(
        e,
        r,
        Y.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case V:
          return e = zn(31, r, n, d), e.elementType = V, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
        case C:
          x = 8, d |= 24;
          break;
        case T:
          return e = zn(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case I:
          return e = zn(13, r, n, d), e.elementType = I, e.lanes = h, e;
        case X:
          return e = zn(19, r, n, d), e.elementType = X, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                x = 10;
                break e;
              case M:
                x = 9;
                break e;
              case R:
                x = 11;
                break e;
              case ie:
                x = 14;
                break e;
              case A:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = zn(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
    return e = zn(7, e, l, n), e.lanes = r, e;
  }
  function Su(e, n, r) {
    return e = zn(6, e, null, n), e.lanes = r, e;
  }
  function ip(e) {
    var n = zn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function wu(e, n, r) {
    return n = zn(
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
  var lp = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = lp.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Mn(n)
      }, lp.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Mn(n)
    };
  }
  var hs = [], ms = 0, ql = null, gi = 0, Pn = [], Kn = 0, Ga = null, ma = 1, pa = "";
  function Na(e, n) {
    hs[ms++] = gi, hs[ms++] = ql, ql = e, gi = n;
  }
  function op(e, n, r) {
    Pn[Kn++] = ma, Pn[Kn++] = pa, Pn[Kn++] = Ga, Ga = e;
    var l = ma;
    e = pa;
    var d = 32 - qe(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - qe(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, ma = 1 << 32 - qe(n) + d | r << d | l, pa = h + e;
    } else
      ma = 1 << h | r << d | l, pa = e;
  }
  function ju(e) {
    e.return !== null && (Na(e, 1), op(e, 1, 0));
  }
  function Eu(e) {
    for (; e === ql; )
      ql = hs[--ms], hs[ms] = null, gi = hs[--ms], hs[ms] = null;
    for (; e === Ga; )
      Ga = Pn[--Kn], Pn[Kn] = null, pa = Pn[--Kn], Pn[Kn] = null, ma = Pn[--Kn], Pn[Kn] = null;
  }
  function cp(e, n) {
    Pn[Kn++] = ma, Pn[Kn++] = pa, Pn[Kn++] = Ga, ma = n.id, pa = n.overflow, Ga = e;
  }
  var rn = null, Ct = null, rt = !1, Pa = null, Xn = !1, Nu = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vi(Gn(n, e)), Nu;
  }
  function up(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Se] = e, n[je] = l, r) {
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
        for (r = 0; r < Bi.length; r++)
          tt(Bi[r], n);
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
        tt("invalid", n), jm(
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
        tt("invalid", n), Nm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Tv(n.textContent, r) ? (l.popover != null && (tt("beforetoggle", n), tt("toggle", n)), l.onScroll != null && tt("scroll", n), l.onScrollEnd != null && tt("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function dp(e) {
    for (rn = e.return; rn; )
      switch (rn.tag) {
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
          rn = rn.return;
      }
  }
  function ps(e) {
    if (e !== rn) return !1;
    if (!rt) return dp(e), rt = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || qd(e.type, e.memoizedProps)), r = !r), r && Ct && Ka(e), dp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ct = Lv(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ct = Lv(e);
    } else
      n === 27 ? (n = Ct, or(e.type) ? (e = Kd, Kd = null, Ct = e) : Ct = n) : Ct = rn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    Ct = rn = null, rt = !1;
  }
  function Cu() {
    var e = Pa;
    return e !== null && (En === null ? En = e : En.push.apply(
      En,
      e
    ), Pa = null), e;
  }
  function vi(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var Tu = _(null), zr = null, Ca = null;
  function Xa(e, n, r) {
    J(Tu, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Tu.current, ne(Tu);
  }
  function Ru(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function _u(e, n, r, l) {
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
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), Ru(
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
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), Ru(x, r, e), x = null;
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
          kn(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ue.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Fi) : e = [Fi]);
      }
      d = d.return;
    }
    e !== null && _u(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Fl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!kn(
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
  function sn(e) {
    return fp(zr, e);
  }
  function Yl(e, n) {
    return zr === null && Or(e), fp(e, n);
  }
  function fp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var rj = typeof AbortController < "u" ? AbortController : function() {
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
  }, sj = t.unstable_scheduleCallback, ij = t.unstable_NormalPriority, Ft = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mu() {
    return {
      controller: new rj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yi(e) {
    e.refCount--, e.refCount === 0 && sj(ij, function() {
      e.controller.abort();
    });
  }
  var bi = null, Au = 0, vs = 0, ys = null;
  function lj(e, n) {
    if (bi === null) {
      var r = bi = [];
      Au = 0, vs = zd(), ys = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Au++, n.then(hp, hp), n;
  }
  function hp() {
    if (--Au === 0 && bi !== null) {
      ys !== null && (ys.status = "fulfilled");
      var e = bi;
      bi = null, vs = 0, ys = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function oj(e, n) {
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
  var mp = k.S;
  k.S = function(e, n) {
    Zg = Rt(), typeof n == "object" && n !== null && typeof n.then == "function" && lj(e, n), mp !== null && mp(e, n);
  };
  var Lr = _(null);
  function Du() {
    var e = Lr.current;
    return e !== null ? e : St.pooledCache;
  }
  function Gl(e, n) {
    n === null ? J(Lr, Lr.current) : J(Lr, n.pool);
  }
  function pp() {
    var e = Du();
    return e === null ? null : { parent: Ft._currentValue, pool: e };
  }
  var bs = Error(i(460)), ku = Error(i(474)), Pl = Error(i(542)), Kl = { then: function() {
  } };
  function gp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function vp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, bp(e), e;
      default:
        if (typeof n.status == "string") n.then(wa, wa);
        else {
          if (e = St, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = n.reason, bp(e), e;
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
  function yp() {
    if (Ur === null) throw Error(i(459));
    var e = Ur;
    return Ur = null, e;
  }
  function bp(e) {
    if (e === bs || e === Pl)
      throw Error(i(483));
  }
  var xs = null, xi = 0;
  function Xl(e) {
    var n = xi;
    return xi += 1, xs === null && (xs = []), vp(xs, e, n);
  }
  function Si(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Ql(e, n) {
    throw n.$$typeof === w ? Error(i(525)) : (e = Object.prototype.toString.call(n), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function xp(e) {
    function n(P, B) {
      if (e) {
        var ee = P.deletions;
        ee === null ? (P.deletions = [B], P.flags |= 16) : ee.push(B);
      }
    }
    function r(P, B) {
      if (!e) return null;
      for (; B !== null; )
        n(P, B), B = B.sibling;
      return null;
    }
    function l(P) {
      for (var B = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? B.set(P.key, P) : B.set(P.index, P), P = P.sibling;
      return B;
    }
    function d(P, B) {
      return P = Ea(P, B), P.index = 0, P.sibling = null, P;
    }
    function h(P, B, ee) {
      return P.index = ee, e ? (ee = P.alternate, ee !== null ? (ee = ee.index, ee < B ? (P.flags |= 67108866, B) : ee) : (P.flags |= 67108866, B)) : (P.flags |= 1048576, B);
    }
    function x(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function E(P, B, ee, fe) {
      return B === null || B.tag !== 6 ? (B = Su(ee, P.mode, fe), B.return = P, B) : (B = d(B, ee), B.return = P, B);
    }
    function L(P, B, ee, fe) {
      var Le = ee.type;
      return Le === N ? de(
        P,
        B,
        ee.props.children,
        fe,
        ee.key
      ) : B !== null && (B.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === A && $r(Le) === B.type) ? (B = d(B, ee.props), Si(B, ee), B.return = P, B) : (B = Hl(
        ee.type,
        ee.key,
        ee.props,
        null,
        P.mode,
        fe
      ), Si(B, ee), B.return = P, B);
    }
    function ae(P, B, ee, fe) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== ee.containerInfo || B.stateNode.implementation !== ee.implementation ? (B = wu(ee, P.mode, fe), B.return = P, B) : (B = d(B, ee.children || []), B.return = P, B);
    }
    function de(P, B, ee, fe, Le) {
      return B === null || B.tag !== 7 ? (B = Dr(
        ee,
        P.mode,
        fe,
        Le
      ), B.return = P, B) : (B = d(B, ee), B.return = P, B);
    }
    function he(P, B, ee) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = Su(
          "" + B,
          P.mode,
          ee
        ), B.return = P, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return ee = Hl(
              B.type,
              B.key,
              B.props,
              null,
              P.mode,
              ee
            ), Si(ee, B), ee.return = P, ee;
          case j:
            return B = wu(
              B,
              P.mode,
              ee
            ), B.return = P, B;
          case A:
            return B = $r(B), he(P, B, ee);
        }
        if (re(B) || te(B))
          return B = Dr(
            B,
            P.mode,
            ee,
            null
          ), B.return = P, B;
        if (typeof B.then == "function")
          return he(P, Xl(B), ee);
        if (B.$$typeof === z)
          return he(
            P,
            Yl(P, B),
            ee
          );
        Ql(P, B);
      }
      return null;
    }
    function se(P, B, ee, fe) {
      var Le = B !== null ? B.key : null;
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return Le !== null ? null : E(P, B, "" + ee, fe);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            return ee.key === Le ? L(P, B, ee, fe) : null;
          case j:
            return ee.key === Le ? ae(P, B, ee, fe) : null;
          case A:
            return ee = $r(ee), se(P, B, ee, fe);
        }
        if (re(ee) || te(ee))
          return Le !== null ? null : de(P, B, ee, fe, null);
        if (typeof ee.then == "function")
          return se(
            P,
            B,
            Xl(ee),
            fe
          );
        if (ee.$$typeof === z)
          return se(
            P,
            B,
            Yl(P, ee),
            fe
          );
        Ql(P, ee);
      }
      return null;
    }
    function oe(P, B, ee, fe, Le) {
      if (typeof fe == "string" && fe !== "" || typeof fe == "number" || typeof fe == "bigint")
        return P = P.get(ee) || null, E(B, P, "" + fe, Le);
      if (typeof fe == "object" && fe !== null) {
        switch (fe.$$typeof) {
          case S:
            return P = P.get(
              fe.key === null ? ee : fe.key
            ) || null, L(B, P, fe, Le);
          case j:
            return P = P.get(
              fe.key === null ? ee : fe.key
            ) || null, ae(B, P, fe, Le);
          case A:
            return fe = $r(fe), oe(
              P,
              B,
              ee,
              fe,
              Le
            );
        }
        if (re(fe) || te(fe))
          return P = P.get(ee) || null, de(B, P, fe, Le, null);
        if (typeof fe.then == "function")
          return oe(
            P,
            B,
            ee,
            Xl(fe),
            Le
          );
        if (fe.$$typeof === z)
          return oe(
            P,
            B,
            ee,
            Yl(B, fe),
            Le
          );
        Ql(B, fe);
      }
      return null;
    }
    function Me(P, B, ee, fe) {
      for (var Le = null, lt = null, ze = B, Pe = B = 0, at = null; ze !== null && Pe < ee.length; Pe++) {
        ze.index > Pe ? (at = ze, ze = null) : at = ze.sibling;
        var ot = se(
          P,
          ze,
          ee[Pe],
          fe
        );
        if (ot === null) {
          ze === null && (ze = at);
          break;
        }
        e && ze && ot.alternate === null && n(P, ze), B = h(ot, B, Pe), lt === null ? Le = ot : lt.sibling = ot, lt = ot, ze = at;
      }
      if (Pe === ee.length)
        return r(P, ze), rt && Na(P, Pe), Le;
      if (ze === null) {
        for (; Pe < ee.length; Pe++)
          ze = he(P, ee[Pe], fe), ze !== null && (B = h(
            ze,
            B,
            Pe
          ), lt === null ? Le = ze : lt.sibling = ze, lt = ze);
        return rt && Na(P, Pe), Le;
      }
      for (ze = l(ze); Pe < ee.length; Pe++)
        at = oe(
          ze,
          P,
          Pe,
          ee[Pe],
          fe
        ), at !== null && (e && at.alternate !== null && ze.delete(
          at.key === null ? Pe : at.key
        ), B = h(
          at,
          B,
          Pe
        ), lt === null ? Le = at : lt.sibling = at, lt = at);
      return e && ze.forEach(function(hr) {
        return n(P, hr);
      }), rt && Na(P, Pe), Le;
    }
    function Be(P, B, ee, fe) {
      if (ee == null) throw Error(i(151));
      for (var Le = null, lt = null, ze = B, Pe = B = 0, at = null, ot = ee.next(); ze !== null && !ot.done; Pe++, ot = ee.next()) {
        ze.index > Pe ? (at = ze, ze = null) : at = ze.sibling;
        var hr = se(P, ze, ot.value, fe);
        if (hr === null) {
          ze === null && (ze = at);
          break;
        }
        e && ze && hr.alternate === null && n(P, ze), B = h(hr, B, Pe), lt === null ? Le = hr : lt.sibling = hr, lt = hr, ze = at;
      }
      if (ot.done)
        return r(P, ze), rt && Na(P, Pe), Le;
      if (ze === null) {
        for (; !ot.done; Pe++, ot = ee.next())
          ot = he(P, ot.value, fe), ot !== null && (B = h(ot, B, Pe), lt === null ? Le = ot : lt.sibling = ot, lt = ot);
        return rt && Na(P, Pe), Le;
      }
      for (ze = l(ze); !ot.done; Pe++, ot = ee.next())
        ot = oe(ze, P, Pe, ot.value, fe), ot !== null && (e && ot.alternate !== null && ze.delete(ot.key === null ? Pe : ot.key), B = h(ot, B, Pe), lt === null ? Le = ot : lt.sibling = ot, lt = ot);
      return e && ze.forEach(function(bE) {
        return n(P, bE);
      }), rt && Na(P, Pe), Le;
    }
    function bt(P, B, ee, fe) {
      if (typeof ee == "object" && ee !== null && ee.type === N && ee.key === null && (ee = ee.props.children), typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            e: {
              for (var Le = ee.key; B !== null; ) {
                if (B.key === Le) {
                  if (Le = ee.type, Le === N) {
                    if (B.tag === 7) {
                      r(
                        P,
                        B.sibling
                      ), fe = d(
                        B,
                        ee.props.children
                      ), fe.return = P, P = fe;
                      break e;
                    }
                  } else if (B.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === A && $r(Le) === B.type) {
                    r(
                      P,
                      B.sibling
                    ), fe = d(B, ee.props), Si(fe, ee), fe.return = P, P = fe;
                    break e;
                  }
                  r(P, B);
                  break;
                } else n(P, B);
                B = B.sibling;
              }
              ee.type === N ? (fe = Dr(
                ee.props.children,
                P.mode,
                fe,
                ee.key
              ), fe.return = P, P = fe) : (fe = Hl(
                ee.type,
                ee.key,
                ee.props,
                null,
                P.mode,
                fe
              ), Si(fe, ee), fe.return = P, P = fe);
            }
            return x(P);
          case j:
            e: {
              for (Le = ee.key; B !== null; ) {
                if (B.key === Le)
                  if (B.tag === 4 && B.stateNode.containerInfo === ee.containerInfo && B.stateNode.implementation === ee.implementation) {
                    r(
                      P,
                      B.sibling
                    ), fe = d(B, ee.children || []), fe.return = P, P = fe;
                    break e;
                  } else {
                    r(P, B);
                    break;
                  }
                else n(P, B);
                B = B.sibling;
              }
              fe = wu(ee, P.mode, fe), fe.return = P, P = fe;
            }
            return x(P);
          case A:
            return ee = $r(ee), bt(
              P,
              B,
              ee,
              fe
            );
        }
        if (re(ee))
          return Me(
            P,
            B,
            ee,
            fe
          );
        if (te(ee)) {
          if (Le = te(ee), typeof Le != "function") throw Error(i(150));
          return ee = Le.call(ee), Be(
            P,
            B,
            ee,
            fe
          );
        }
        if (typeof ee.then == "function")
          return bt(
            P,
            B,
            Xl(ee),
            fe
          );
        if (ee.$$typeof === z)
          return bt(
            P,
            B,
            Yl(P, ee),
            fe
          );
        Ql(P, ee);
      }
      return typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint" ? (ee = "" + ee, B !== null && B.tag === 6 ? (r(P, B.sibling), fe = d(B, ee), fe.return = P, P = fe) : (r(P, B), fe = Su(ee, P.mode, fe), fe.return = P, P = fe), x(P)) : r(P, B);
    }
    return function(P, B, ee, fe) {
      try {
        xi = 0;
        var Le = bt(
          P,
          B,
          ee,
          fe
        );
        return xs = null, Le;
      } catch (ze) {
        if (ze === bs || ze === Pl) throw ze;
        var lt = zn(29, ze, null, P.mode);
        return lt.lanes = fe, lt.return = P, lt;
      } finally {
      }
    };
  }
  var Br = xp(!0), Sp = xp(!1), Qa = !1;
  function zu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ou(e, n) {
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
    if (l = l.shared, (ut & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Il(e), rp(e, null, r), n;
    }
    return Vl(e, l, n, r), Il(e);
  }
  function wi(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, hn(e, r);
    }
  }
  function Lu(e, n) {
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
  var $u = !1;
  function ji() {
    if ($u) {
      var e = ys;
      if (e !== null) throw e;
    }
  }
  function Ei(e, n, r, l) {
    $u = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, ae = L.next;
      L.next = null, x === null ? h = ae : x.next = ae, x = L;
      var de = e.alternate;
      de !== null && (de = de.updateQueue, E = de.lastBaseUpdate, E !== x && (E === null ? de.firstBaseUpdate = ae : E.next = ae, de.lastBaseUpdate = L));
    }
    if (h !== null) {
      var he = d.baseState;
      x = 0, de = ae = L = null, E = h;
      do {
        var se = E.lane & -536870913, oe = se !== E.lane;
        if (oe ? (nt & se) === se : (l & se) === se) {
          se !== 0 && se === vs && ($u = !0), de !== null && (de = de.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Me = e, Be = E;
            se = n;
            var bt = r;
            switch (Be.tag) {
              case 1:
                if (Me = Be.payload, typeof Me == "function") {
                  he = Me.call(bt, he, se);
                  break e;
                }
                he = Me;
                break e;
              case 3:
                Me.flags = Me.flags & -65537 | 128;
              case 0:
                if (Me = Be.payload, se = typeof Me == "function" ? Me.call(bt, he, se) : Me, se == null) break e;
                he = v({}, he, se);
                break e;
              case 2:
                Qa = !0;
            }
          }
          se = E.callback, se !== null && (e.flags |= 64, oe && (e.flags |= 8192), oe = d.callbacks, oe === null ? d.callbacks = [se] : oe.push(se));
        } else
          oe = {
            lane: se,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, de === null ? (ae = de = oe, L = he) : de = de.next = oe, x |= se;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      de === null && (L = he), d.baseState = L, d.firstBaseUpdate = ae, d.lastBaseUpdate = de, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = he;
    }
  }
  function wp(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function jp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        wp(r[e], n);
  }
  var Ss = _(null), Zl = _(0);
  function Ep(e, n) {
    e = La, J(Zl, e), J(Ss, n), La = e | n.baseLanes;
  }
  function Uu() {
    J(Zl, La), J(Ss, Ss.current);
  }
  function Bu() {
    La = Zl.current, ne(Ss), ne(Zl);
  }
  var On = _(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    J(Ut, Ut.current & 1), J(On, e), Qn === null && (n === null || Ss.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function Vu(e) {
    J(Ut, Ut.current), J(On, e), Qn === null && (Qn = e);
  }
  function Np(e) {
    e.tag === 22 ? (J(Ut, Ut.current), J(On, e), Qn === null && (Qn = e)) : er();
  }
  function er() {
    J(Ut, Ut.current), J(On, On.current);
  }
  function Ln(e) {
    ne(On), Qn === e && (Qn = null), ne(Ut);
  }
  var Ut = _(0);
  function Jl(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Gd(r) || Pd(r)))
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
  var Ra = 0, Ye = null, vt = null, Yt = null, Wl = !1, ws = !1, Vr = !1, eo = 0, Ni = 0, js = null, cj = 0;
  function Ot() {
    throw Error(i(321));
  }
  function Iu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!kn(e[r], n[r])) return !1;
    return !0;
  }
  function Hu(e, n, r, l, d, h) {
    return Ra = h, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, k.H = e === null || e.memoizedState === null ? og : ad, Vr = !1, h = r(l, d), Vr = !1, ws && (h = Tp(
      n,
      r,
      l,
      d
    )), Cp(e), h;
  }
  function Cp(e) {
    k.H = Ri;
    var n = vt !== null && vt.next !== null;
    if (Ra = 0, Yt = vt = Ye = null, Wl = !1, Ni = 0, js = null, n) throw Error(i(300));
    e === null || Gt || (e = e.dependencies, e !== null && Fl(e) && (Gt = !0));
  }
  function Tp(e, n, r, l) {
    Ye = e;
    var d = 0;
    do {
      if (ws && (js = null), Ni = 0, ws = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Yt = vt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      k.H = cg, h = n(r, l);
    } while (ws);
    return h;
  }
  function uj() {
    var e = k.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ci(n) : n, e = e.useState()[0], (vt !== null ? vt.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function qu() {
    var e = eo !== 0;
    return eo = 0, e;
  }
  function Fu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Yu(e) {
    if (Wl) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      Wl = !1;
    }
    Ra = 0, Yt = vt = Ye = null, ws = !1, Ni = eo = 0, js = null;
  }
  function bn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Yt === null ? Ye.memoizedState = Yt = e : Yt = Yt.next = e, Yt;
  }
  function Bt() {
    if (vt === null) {
      var e = Ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = vt.next;
    var n = Yt === null ? Ye.memoizedState : Yt.next;
    if (n !== null)
      Yt = n, vt = e;
    else {
      if (e === null)
        throw Ye.alternate === null ? Error(i(467)) : Error(i(310));
      vt = e, e = {
        memoizedState: vt.memoizedState,
        baseState: vt.baseState,
        baseQueue: vt.baseQueue,
        queue: vt.queue,
        next: null
      }, Yt === null ? Ye.memoizedState = Yt = e : Yt = Yt.next = e;
    }
    return Yt;
  }
  function to() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ci(e) {
    var n = Ni;
    return Ni += 1, js === null && (js = []), e = vp(js, e, n), n = Ye, (Yt === null ? n.memoizedState : Yt.next) === null && (n = n.alternate, k.H = n === null || n.memoizedState === null ? og : ad), e;
  }
  function no(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ci(e);
      if (e.$$typeof === z) return sn(e);
    }
    throw Error(i(438, String(e)));
  }
  function Gu(e) {
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
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = to(), Ye.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = D;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ao(e) {
    var n = Bt();
    return Pu(n, vt, e);
  }
  function Pu(e, n, r) {
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
      var E = x = null, L = null, ae = n, de = !1;
      do {
        var he = ae.lane & -536870913;
        if (he !== ae.lane ? (nt & he) === he : (Ra & he) === he) {
          var se = ae.revertLane;
          if (se === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }), he === vs && (de = !0);
          else if ((Ra & se) === se) {
            ae = ae.next, se === vs && (de = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: ae.revertLane,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }, L === null ? (E = L = he, x = h) : L = L.next = he, Ye.lanes |= se, ar |= se;
          he = ae.action, Vr && r(h, he), h = ae.hasEagerState ? ae.eagerState : r(h, he);
        } else
          se = {
            lane: he,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, L === null ? (E = L = se, x = h) : L = L.next = se, Ye.lanes |= he, ar |= he;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if (L === null ? x = h : L.next = E, !kn(h, e.memoizedState) && (Gt = !0, de && (r = ys, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Ku(e) {
    var n = Bt(), r = n.queue;
    if (r === null) throw Error(i(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      kn(h, n.memoizedState) || (Gt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function Rp(e, n, r) {
    var l = Ye, d = Bt(), h = rt;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !kn(
      (vt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, Gt = !0), d = d.queue, Zu(Ap.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Yt !== null && Yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        Mp.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), St === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || _p(l, n, r);
    }
    return r;
  }
  function _p(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ye.updateQueue, n === null ? (n = to(), Ye.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Mp(e, n, r, l) {
    n.value = r, n.getSnapshot = l, Dp(n) && kp(e);
  }
  function Ap(e, n, r) {
    return r(function() {
      Dp(n) && kp(e);
    });
  }
  function Dp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !kn(e, r);
    } catch {
      return !0;
    }
  }
  function kp(e) {
    var n = Ar(e, 2);
    n !== null && Nn(n, e, 2);
  }
  function Xu(e) {
    var n = bn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        ft(!0);
        try {
          r();
        } finally {
          ft(!1);
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
  function zp(e, n, r, l) {
    return e.baseState = r, Pu(
      e,
      vt,
      typeof l == "function" ? l : _a
    );
  }
  function dj(e, n, r, l, d) {
    if (io(e)) throw Error(i(485));
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
      k.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Op(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Op(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = k.T, x = {};
      k.T = x;
      try {
        var E = r(d, l), L = k.S;
        L !== null && L(x, E), Lp(e, n, E);
      } catch (ae) {
        Qu(e, n, ae);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), k.T = h;
      }
    } else
      try {
        h = r(d, l), Lp(e, n, h);
      } catch (ae) {
        Qu(e, n, ae);
      }
  }
  function Lp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        $p(e, n, l);
      },
      function(l) {
        return Qu(e, n, l);
      }
    ) : $p(e, n, r);
  }
  function $p(e, n, r) {
    n.status = "fulfilled", n.value = r, Up(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Op(e, r)));
  }
  function Qu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, Up(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function Up(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Bp(e, n) {
    return n;
  }
  function Vp(e, n) {
    if (rt) {
      var r = St.formState;
      if (r !== null) {
        e: {
          var l = Ye;
          if (rt) {
            if (Ct) {
              t: {
                for (var d = Ct, h = Xn; d.nodeType !== 8; ) {
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
                Ct = Zn(
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
    return r = bn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bp,
      lastRenderedState: n
    }, r.queue = l, r = sg.bind(
      null,
      Ye,
      l
    ), l.dispatch = r, l = Xu(!1), h = nd.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = bn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = dj.bind(
      null,
      Ye,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Ip(e) {
    var n = Bt();
    return Hp(n, vt, e);
  }
  function Hp(e, n, r) {
    if (n = Pu(
      e,
      n,
      Bp
    )[0], e = ao(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ci(n);
      } catch (x) {
        throw x === bs ? Pl : x;
      }
    else l = n;
    n = Bt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Ye.flags |= 2048, Es(
      9,
      { destroy: void 0 },
      fj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function fj(e, n) {
    e.action = n;
  }
  function qp(e) {
    var n = Bt(), r = vt;
    if (r !== null)
      return Hp(n, r, e);
    Bt(), n = n.memoizedState, r = Bt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Es(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = to(), Ye.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Fp() {
    return Bt().memoizedState;
  }
  function ro(e, n, r, l) {
    var d = bn();
    Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function so(e, n, r, l) {
    var d = Bt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    vt !== null && l !== null && Iu(l, vt.memoizedState.deps) ? d.memoizedState = Es(n, h, r, l) : (Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Yp(e, n) {
    ro(8390656, 8, e, n);
  }
  function Zu(e, n) {
    so(2048, 8, e, n);
  }
  function hj(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = to(), Ye.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Gp(e) {
    var n = Bt().memoizedState;
    return hj({ ref: n, nextImpl: e }), function() {
      if ((ut & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Pp(e, n) {
    return so(4, 2, e, n);
  }
  function Kp(e, n) {
    return so(4, 4, e, n);
  }
  function Xp(e, n) {
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
  function Qp(e, n, r) {
    r = r != null ? r.concat([e]) : null, so(4, 4, Xp.bind(null, n, e), r);
  }
  function Ju() {
  }
  function Zp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Iu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Jp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Iu(n, l[1]))
      return l[0];
    if (l = e(), Vr) {
      ft(!0);
      try {
        e();
      } finally {
        ft(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function Wu(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (nt & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Wg(), Ye.lanes |= e, ar |= e, r);
  }
  function Wp(e, n, r, l) {
    return kn(r, n) ? r : Ss.current !== null ? (e = Wu(e, r, l), kn(e, n) || (Gt = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (nt & 261930) === 0 ? (Gt = !0, e.memoizedState = r) : (e = Wg(), Ye.lanes |= e, ar |= e, n);
  }
  function eg(e, n, r, l, d) {
    var h = $.p;
    $.p = h !== 0 && 8 > h ? h : 8;
    var x = k.T, E = {};
    k.T = E, nd(e, !1, n, r);
    try {
      var L = d(), ae = k.S;
      if (ae !== null && ae(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var de = oj(
          L,
          l
        );
        Ti(
          e,
          n,
          de,
          Bn(e)
        );
      } else
        Ti(
          e,
          n,
          l,
          Bn(e)
        );
    } catch (he) {
      Ti(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        Bn()
      );
    } finally {
      $.p = h, x !== null && E.types !== null && (x.types = E.types), k.T = x;
    }
  }
  function mj() {
  }
  function ed(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = tg(e).queue;
    eg(
      e,
      d,
      n,
      q,
      r === null ? mj : function() {
        return ng(e), r(l);
      }
    );
  }
  function tg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: q,
      baseState: q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
        lastRenderedState: q
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
  function ng(e) {
    var n = tg(e);
    n.next === null && (n = e.alternate.memoizedState), Ti(
      e,
      n.next.queue,
      {},
      Bn()
    );
  }
  function td() {
    return sn(Fi);
  }
  function ag() {
    return Bt().memoizedState;
  }
  function rg() {
    return Bt().memoizedState;
  }
  function pj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Bn();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Nn(l, n, r), wi(l, n, r)), n = { cache: Mu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function gj(e, n, r) {
    var l = Bn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e) ? ig(n, r) : (r = bu(e, n, r, l), r !== null && (Nn(r, e, l), lg(r, n, l)));
  }
  function sg(e, n, r) {
    var l = Bn();
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
    if (io(e)) ig(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, kn(E, x))
            return Vl(e, n, d, 0), St === null && Bl(), !1;
        } catch {
        } finally {
        }
      if (r = bu(e, n, d, l), r !== null)
        return Nn(r, e, l), lg(r, n, l), !0;
    }
    return !1;
  }
  function nd(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: zd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e)) {
      if (n) throw Error(i(479));
    } else
      n = bu(
        e,
        r,
        l,
        2
      ), n !== null && Nn(n, e, 2);
  }
  function io(e) {
    var n = e.alternate;
    return e === Ye || n !== null && n === Ye;
  }
  function ig(e, n) {
    ws = Wl = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function lg(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, hn(e, r);
    }
  }
  var Ri = {
    readContext: sn,
    use: no,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot
  };
  Ri.useEffectEvent = Ot;
  var og = {
    readContext: sn,
    use: no,
    useCallback: function(e, n) {
      return bn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: sn,
    useEffect: Yp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, ro(
        4194308,
        4,
        Xp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return ro(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      ro(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = bn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Vr) {
        ft(!0);
        try {
          e();
        } finally {
          ft(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = bn();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          ft(!0);
          try {
            r(n);
          } finally {
            ft(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = gj.bind(
        null,
        Ye,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = bn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Xu(e);
      var n = e.queue, r = sg.bind(null, Ye, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Ju,
    useDeferredValue: function(e, n) {
      var r = bn();
      return Wu(r, e, n);
    },
    useTransition: function() {
      var e = Xu(!1);
      return e = eg.bind(
        null,
        Ye,
        e.queue,
        !0,
        !1
      ), bn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Ye, d = bn();
      if (rt) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), St === null)
          throw Error(i(349));
        (nt & 127) !== 0 || _p(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Yp(Ap.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        Mp.bind(
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
      var e = bn(), n = St.identifierPrefix;
      if (rt) {
        var r = pa, l = ma;
        r = (l & ~(1 << 32 - qe(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = eo++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = cj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: td,
    useFormState: Vp,
    useActionState: Vp,
    useOptimistic: function(e) {
      var n = bn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = nd.bind(
        null,
        Ye,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Gu,
    useCacheRefresh: function() {
      return bn().memoizedState = pj.bind(
        null,
        Ye
      );
    },
    useEffectEvent: function(e) {
      var n = bn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((ut & 2) !== 0)
          throw Error(i(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, ad = {
    readContext: sn,
    use: no,
    useCallback: Zp,
    useContext: sn,
    useEffect: Zu,
    useImperativeHandle: Qp,
    useInsertionEffect: Pp,
    useLayoutEffect: Kp,
    useMemo: Jp,
    useReducer: ao,
    useRef: Fp,
    useState: function() {
      return ao(_a);
    },
    useDebugValue: Ju,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return Wp(
        r,
        vt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = ao(_a)[0], n = Bt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ci(e),
        n
      ];
    },
    useSyncExternalStore: Rp,
    useId: ag,
    useHostTransitionStatus: td,
    useFormState: Ip,
    useActionState: Ip,
    useOptimistic: function(e, n) {
      var r = Bt();
      return zp(r, vt, e, n);
    },
    useMemoCache: Gu,
    useCacheRefresh: rg
  };
  ad.useEffectEvent = Gp;
  var cg = {
    readContext: sn,
    use: no,
    useCallback: Zp,
    useContext: sn,
    useEffect: Zu,
    useImperativeHandle: Qp,
    useInsertionEffect: Pp,
    useLayoutEffect: Kp,
    useMemo: Jp,
    useReducer: Ku,
    useRef: Fp,
    useState: function() {
      return Ku(_a);
    },
    useDebugValue: Ju,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return vt === null ? Wu(r, e, n) : Wp(
        r,
        vt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Ku(_a)[0], n = Bt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ci(e),
        n
      ];
    },
    useSyncExternalStore: Rp,
    useId: ag,
    useHostTransitionStatus: td,
    useFormState: qp,
    useActionState: qp,
    useOptimistic: function(e, n) {
      var r = Bt();
      return vt !== null ? zp(r, vt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Gu,
    useCacheRefresh: rg
  };
  cg.useEffectEvent = Gp;
  function rd(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var sd = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = Bn(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Nn(n, e, l), wi(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = Bn(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Nn(n, e, l), wi(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Bn(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (Nn(n, e, r), wi(n, e, r));
    }
  };
  function ug(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !mi(r, l) || !mi(d, h) : !0;
  }
  function dg(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && sd.enqueueReplaceState(n, n.state, null);
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
  function fg(e) {
    Ul(e);
  }
  function hg(e) {
    console.error(e);
  }
  function mg(e) {
    Ul(e);
  }
  function lo(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function pg(e, n, r) {
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
  function id(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      lo(e, n);
    }, r;
  }
  function gg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function vg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        pg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      pg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function vj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && gs(
        n,
        r,
        d,
        !0
      ), r = On.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Qn === null ? xo() : r.alternate === null && Lt === 0 && (Lt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Ad(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Ad(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return Ad(e, l, d), xo(), !1;
    }
    if (rt)
      return n = On.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Nu && (e = Error(i(422), { cause: l }), vi(Gn(e, r)))) : (l !== Nu && (n = Error(i(423), {
        cause: l
      }), vi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = id(
        e.stateNode,
        l,
        d
      ), Lu(e, d), Lt !== 4 && (Lt = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), Li === null ? Li = [h] : Li.push(h), Lt !== 4 && (Lt = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = id(r.stateNode, l, e), Lu(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = gg(d), vg(
              d,
              e,
              r,
              l
            ), Lu(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var ld = Error(i(461)), Gt = !1;
  function ln(e, n, r, l) {
    n.child = e === null ? Sp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function yg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return Or(n), l = Hu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = qu(), e !== null && !Gt ? (Fu(e, n, d), Ma(e, n, d)) : (rt && E && ju(n), n.flags |= 1, ln(e, n, l, d), n.child);
  }
  function bg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !xu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, xg(
        e,
        n,
        h,
        l,
        d
      )) : (e = Hl(
        r.type,
        null,
        l,
        n,
        n.mode,
        d
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (h = e.child, !pd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : mi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function xg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (mi(h, l) && e.ref === n.ref)
        if (Gt = !1, n.pendingProps = l = h, pd(e, d))
          (e.flags & 131072) !== 0 && (Gt = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return od(
      e,
      n,
      r,
      l,
      d
    );
  }
  function Sg(e, n, r, l) {
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
        return wg(
          e,
          n,
          h,
          r,
          l
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Gl(
          n,
          h !== null ? h.cachePool : null
        ), h !== null ? Ep(n, h) : Uu(), Np(n);
      else
        return l = n.lanes = 536870912, wg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Gl(n, h.cachePool), Ep(n, h), er(), n.memoizedState = null) : (e !== null && Gl(n, null), Uu(), er());
    return ln(e, n, d, r), n.child;
  }
  function _i(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function wg(e, n, r, l, d) {
    var h = Du();
    return h = h === null ? null : { parent: Ft._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Gl(n, null), Uu(), Np(n), e !== null && gs(e, n, l, !0), n.childLanes = d, null;
  }
  function oo(e, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function jg(e, n, r) {
    return Br(n, e.child, null, r), e = oo(n, n.pendingProps), e.flags |= 2, Ln(n), n.memoizedState = null, e;
  }
  function yj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (rt) {
        if (l.mode === "hidden")
          return e = oo(n, l), n.lanes = 536870912, _i(null, e);
        if (Vu(n), (e = Ct) ? (e = Ov(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = ip(e), r.return = n, n.child = r, rn = n, Ct = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Vu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = jg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (Gt || gs(e, n, r, !1), d = (r & e.childLanes) !== 0, Gt || d) {
        if (l = St, l !== null && (x = O(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), Nn(l, e, x), ld;
        xo(), n = jg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Ct = Zn(x.nextSibling), rn = n, rt = !0, Pa = null, Xn = !1, e !== null && cp(n, e), n = oo(n, l), n.flags |= 4096;
      return n;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function co(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(i(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function od(e, n, r, l, d) {
    return Or(n), r = Hu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = qu(), e !== null && !Gt ? (Fu(e, n, d), Ma(e, n, d)) : (rt && l && ju(n), n.flags |= 1, ln(e, n, r, d), n.child);
  }
  function Eg(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = Tp(
      n,
      l,
      r,
      d
    ), Cp(e), l = qu(), e !== null && !Gt ? (Fu(e, n, h), Ma(e, n, h)) : (rt && l && ju(n), n.flags |= 1, ln(e, n, r, h), n.child);
  }
  function Ng(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = fs, x = r.contextType;
      typeof x == "object" && x !== null && (h = sn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = sd, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, zu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? sn(x) : fs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (rd(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && sd.enqueueReplaceState(h, h.state, null), Ei(n, l, h, d), ji(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Ir(r, E);
      h.props = L;
      var ae = h.context, de = r.contextType;
      x = fs, typeof de == "object" && de !== null && (x = sn(de));
      var he = r.getDerivedStateFromProps;
      de = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, de || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ae !== x) && dg(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var se = n.memoizedState;
      h.state = se, Ei(n, l, h, d), ji(), ae = n.memoizedState, E || se !== ae || Qa ? (typeof he == "function" && (rd(
        n,
        r,
        he,
        l
      ), ae = n.memoizedState), (L = Qa || ug(
        n,
        r,
        L,
        l,
        se,
        ae,
        x
      )) ? (de || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ae), h.props = l, h.state = ae, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Ou(e, n), x = n.memoizedProps, de = Ir(r, x), h.props = de, he = n.pendingProps, se = h.context, ae = r.contextType, L = fs, typeof ae == "object" && ae !== null && (L = sn(ae)), E = r.getDerivedStateFromProps, (ae = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== he || se !== L) && dg(
        n,
        h,
        l,
        L
      ), Qa = !1, se = n.memoizedState, h.state = se, Ei(n, l, h, d), ji();
      var oe = n.memoizedState;
      x !== he || se !== oe || Qa || e !== null && e.dependencies !== null && Fl(e.dependencies) ? (typeof E == "function" && (rd(
        n,
        r,
        E,
        l
      ), oe = n.memoizedState), (de = Qa || ug(
        n,
        r,
        de,
        l,
        se,
        oe,
        L
      ) || e !== null && e.dependencies !== null && Fl(e.dependencies)) ? (ae || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = L, l = de) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), l = !1);
    }
    return h = l, co(e, n), l = (n.flags & 128) !== 0, h || l ? (h = n.stateNode, r = l && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, e !== null && l ? (n.child = Br(
      n,
      e.child,
      null,
      d
    ), n.child = Br(
      n,
      null,
      r,
      d
    )) : ln(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function Cg(e, n, r, l) {
    return kr(), n.flags |= 256, ln(e, n, r, l), n.child;
  }
  var cd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ud(e) {
    return { baseLanes: e, cachePool: pp() };
  }
  function dd(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Un), e;
  }
  function Tg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Ut.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (rt) {
        if (d ? Wa(n) : er(), (e = Ct) ? (e = Ov(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = ip(e), r.return = n, n.child = r, rn = n, Ct = null)) : e = null, e === null) throw Ka(n);
        return Pd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = l.children;
      return l = l.fallback, d ? (er(), d = n.mode, E = uo(
        { mode: "hidden", children: E },
        d
      ), l = Dr(
        l,
        d,
        r,
        null
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = ud(r), l.childLanes = dd(
        e,
        x,
        r
      ), n.memoizedState = cd, _i(null, l)) : (Wa(n), fd(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = hd(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (er(), n.child = e.child, n.flags |= 128, n = null) : (er(), E = l.fallback, d = n.mode, l = uo(
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
        ), l = n.child, l.memoizedState = ud(r), l.childLanes = dd(
          e,
          x,
          r
        ), n.memoizedState = cd, n = _i(null, l));
      else if (Wa(n), Pd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ae = x.dgst;
        x = ae, l = Error(i(419)), l.stack = "", l.digest = x, vi({ value: l, source: null, stack: null }), n = hd(
          e,
          n,
          r
        );
      } else if (Gt || gs(e, n, r, !1), x = (r & e.childLanes) !== 0, Gt || x) {
        if (x = St, x !== null && (l = O(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), Nn(x, e, l), ld;
        Gd(E) || xo(), n = hd(
          e,
          n,
          r
        );
      } else
        Gd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Ct = Zn(
          E.nextSibling
        ), rn = n, rt = !0, Pa = null, Xn = !1, e !== null && cp(n, e), n = fd(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, ae = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, ae !== null ? E = Ea(
      ae,
      E
    ) : (E = Dr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, _i(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = ud(r) : (d = E.cachePool, d !== null ? (L = Ft._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = pp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = dd(
      e,
      x,
      r
    ), n.memoizedState = cd, _i(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function fd(e, n) {
    return n = uo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function uo(e, n) {
    return e = zn(22, e, null, n), e.lanes = 0, e;
  }
  function hd(e, n, r) {
    return Br(n, e.child, null, r), e = fd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Rg(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Ru(e.return, n, r);
  }
  function md(e, n, r, l, d, h) {
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
  function _g(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = Ut.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, J(Ut, x), ln(e, n, l, r), l = rt ? gi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Rg(e, r, n);
        else if (e.tag === 19)
          Rg(e, r, n);
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
          e = r.alternate, e !== null && Jl(e) === null && (d = r), r = r.sibling;
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), md(
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
          if (e = d.alternate, e !== null && Jl(e) === null) {
            n.child = d;
            break;
          }
          e = d.sibling, d.sibling = r, r = d, d = e;
        }
        md(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        md(
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
  function pd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Fl(e)));
  }
  function bj(e, n, r) {
    switch (n.tag) {
      case 3:
        ve(n, n.stateNode.containerInfo), Xa(n, Ft, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        st(n);
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
          return n.flags |= 128, Vu(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? Tg(e, n, r) : (Wa(n), e = Ma(
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
            return _g(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), J(Ut, Ut.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, Sg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Ft, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function Mg(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Gt = !0;
      else {
        if (!pd(e, r) && (n.flags & 128) === 0)
          return Gt = !1, bj(
            e,
            n,
            r
          );
        Gt = (e.flags & 131072) !== 0;
      }
    else
      Gt = !1, rt && (n.flags & 1048576) !== 0 && op(n, gi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = $r(n.elementType), n.type = e, typeof e == "function")
            xu(e) ? (l = Ir(e, l), n.tag = 1, n = Ng(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = od(
              null,
              n,
              e,
              l,
              r
            ));
          else {
            if (e != null) {
              var d = e.$$typeof;
              if (d === R) {
                n.tag = 11, n = yg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === ie) {
                n.tag = 14, n = bg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = le(e) || e, Error(i(306, n, ""));
          }
        }
        return n;
      case 0:
        return od(
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
        ), Ng(
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
          d = h.element, Ou(e, n), Ei(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Ft, l), l !== h.cache && _u(
            n,
            [Ft],
            r,
            !0
          ), ji(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Cg(
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
              ), vi(d), n = Cg(
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
              for (Ct = Zn(e.firstChild), rn = n, rt = !0, Pa = null, Xn = !0, r = Sp(
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
            ln(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return co(e, n), e === null ? (r = Iv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : rt || (r = n.type, e = n.pendingProps, l = To(
          W.current
        ).createElement(r), l[Se] = n, l[je] = e, on(l, r, e), Et(l), n.stateNode = l) : n.memoizedState = Iv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return st(n), e === null && rt && (l = n.stateNode = Uv(
          n.type,
          n.pendingProps,
          W.current
        ), rn = n, Xn = !0, d = Ct, or(n.type) ? (Kd = d, Ct = Zn(l.firstChild)) : Ct = d), ln(
          e,
          n,
          n.pendingProps.children,
          r
        ), co(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && rt && ((d = l = Ct) && (l = Xj(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, rn = n, Ct = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), st(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, qd(d, h) ? l = null : x !== null && qd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Hu(
          e,
          n,
          uj,
          null,
          null,
          r
        ), Fi._currentValue = d), co(e, n), ln(e, n, l, r), n.child;
      case 6:
        return e === null && rt && ((e = r = Ct) && (r = Qj(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, rn = n, Ct = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Tg(e, n, r);
      case 4:
        return ve(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          l,
          r
        ) : ln(e, n, l, r), n.child;
      case 11:
        return yg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return ln(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return ln(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return ln(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), ln(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Or(n), d = sn(d), l = l(d), n.flags |= 1, ln(e, n, l, r), n.child;
      case 14:
        return bg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return xg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return _g(e, n, r);
      case 31:
        return yj(e, n, r);
      case 22:
        return Sg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = sn(Ft), e === null ? (d = Du(), d === null && (d = St, h = Mu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, zu(n), Xa(n, Ft, d)) : ((e.lanes & r) !== 0 && (Ou(e, n), Ei(n, null, null, r), ji()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Ft, l)) : (l = h.cache, Xa(n, Ft, l), l !== d.cache && _u(
          n,
          [Ft],
          r,
          !0
        ))), ln(
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
  function gd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (av()) e.flags |= 8192;
        else
          throw Ur = Kl, ku;
    } else e.flags &= -16777217;
  }
  function Ag(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Gv(n))
      if (av()) e.flags |= 8192;
      else
        throw Ur = Kl, ku;
  }
  function fo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Zt() : 536870912, e.lanes |= n, Rs |= n);
  }
  function Mi(e, n) {
    if (!rt)
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
  function Tt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function xj(e, n, r) {
    var l = n.pendingProps;
    switch (Eu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Tt(n), null;
      case 1:
        return Tt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Ft), _e(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ps(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Cu())), Tt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Tt(n), Ag(n, h)) : (Tt(n), gd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Tt(n), Ag(n, h)) : (Tt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Tt(n), gd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (Ce(n), r = W.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Tt(n), null;
          }
          e = Y.current, ps(n) ? up(n) : (e = Uv(d, l, r), n.stateNode = e, Aa(n));
        }
        return Tt(n), null;
      case 5:
        if (Ce(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Tt(n), null;
          }
          if (h = Y.current, ps(n))
            up(n);
          else {
            var x = To(
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
            e: switch (on(h, d, l), d) {
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
        return Tt(n), gd(
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
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = rn, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[Se] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Tv(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = To(e).createTextNode(
              l
            ), e[Se] = n, n.stateNode = e;
        }
        return Tt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = ps(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(i(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Tt(n), e = !1;
          } else
            r = Cu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Tt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = ps(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(i(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(i(317));
              d[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Tt(n), d = !1;
          } else
            d = Cu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
        }
        return Ln(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), fo(n, n.updateQueue), Tt(n), null);
      case 4:
        return _e(), e === null && Ud(n.stateNode.containerInfo), Tt(n), null;
      case 10:
        return Ta(n.type), Tt(n), null;
      case 19:
        if (ne(Ut), l = n.memoizedState, l === null) return Tt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Mi(l, !1);
          else {
            if (Lt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = Jl(e), h !== null) {
                  for (n.flags |= 128, Mi(l, !1), e = h.updateQueue, n.updateQueue = e, fo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    sp(r, e), r = r.sibling;
                  return J(
                    Ut,
                    Ut.current & 1 | 2
                  ), rt && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Rt() > vo && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Jl(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, fo(n, e), Mi(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !rt)
                return Tt(n), null;
            } else
              2 * Rt() - l.renderingStartTime > vo && r !== 536870912 && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Rt(), e.sibling = null, r = Ut.current, J(
          Ut,
          d ? r & 1 | 2 : r & 1
        ), rt && Na(n, l.treeForkCount), e) : (Tt(n), null);
      case 22:
      case 23:
        return Ln(n), Bu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Tt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Tt(n), r = n.updateQueue, r !== null && fo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ne(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Ft), Tt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function Sj(e, n) {
    switch (Eu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Ft), _e(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ce(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Ln(n), n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Ln(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(i(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return ne(Ut), null;
      case 4:
        return _e(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Ln(n), Bu(), e !== null && ne(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Dg(e, n) {
    switch (Eu(n), n.tag) {
      case 3:
        Ta(Ft), _e();
        break;
      case 26:
      case 27:
      case 5:
        Ce(n);
        break;
      case 4:
        _e();
        break;
      case 31:
        n.memoizedState !== null && Ln(n);
        break;
      case 13:
        Ln(n);
        break;
      case 19:
        ne(Ut);
        break;
      case 10:
        Ta(n.type);
        break;
      case 22:
      case 23:
        Ln(n), Bu(), e !== null && ne(Lr);
        break;
      case 24:
        Ta(Ft);
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
      mt(n, n.return, E);
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
              var L = r, ae = E;
              try {
                ae();
              } catch (de) {
                mt(
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
      mt(n, n.return, de);
    }
  }
  function kg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        jp(n, r);
      } catch (l) {
        mt(e, e.return, l);
      }
    }
  }
  function zg(e, n, r) {
    r.props = Ir(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      mt(e, n, l);
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
      mt(e, n, d);
    }
  }
  function ga(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          mt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          mt(e, n, d);
        }
      else r.current = null;
  }
  function Og(e) {
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
      mt(e, e.return, d);
    }
  }
  function vd(e, n, r) {
    try {
      var l = e.stateNode;
      qj(l, e.type, r, n), l[je] = n;
    } catch (d) {
      mt(e, e.return, d);
    }
  }
  function Lg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function yd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Lg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function bd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (bd(e, n, r), e = e.sibling; e !== null; )
        bd(e, n, r), e = e.sibling;
  }
  function ho(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (ho(e, n, r), e = e.sibling; e !== null; )
        ho(e, n, r), e = e.sibling;
  }
  function $g(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      on(n, l, r), n[Se] = e, n[je] = r;
    } catch (h) {
      mt(e, e.return, h);
    }
  }
  var Da = !1, Pt = !1, xd = !1, Ug = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function wj(e, n) {
    if (e = e.containerInfo, Id = zo, e = Qm(e), hu(e)) {
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
            var x = 0, E = -1, L = -1, ae = 0, de = 0, he = e, se = null;
            t: for (; ; ) {
              for (var oe; he !== r || d !== 0 && he.nodeType !== 3 || (E = x + d), he !== h || l !== 0 && he.nodeType !== 3 || (L = x + l), he.nodeType === 3 && (x += he.nodeValue.length), (oe = he.firstChild) !== null; )
                se = he, he = oe;
              for (; ; ) {
                if (he === e) break t;
                if (se === r && ++ae === d && (E = x), se === h && ++de === l && (L = x), (oe = he.nextSibling) !== null) break;
                he = se, se = he.parentNode;
              }
              he = oe;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Hd = { focusedElem: e, selectionRange: r }, zo = !1, en = n; en !== null; )
      if (n = en, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, en = e;
      else
        for (; en !== null; ) {
          switch (n = en, h = n.alternate, e = n.flags, n.tag) {
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
                } catch (Be) {
                  mt(
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
                  Yd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Yd(e);
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
            e.return = n.return, en = e;
            break;
          }
          en = n.return;
        }
  }
  function Bg(e, n, r) {
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
              mt(r, r.return, x);
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
              mt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && kg(r), l & 512 && Di(r, r.return);
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
            jp(e, n);
          } catch (x) {
            mt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && $g(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Og(r), l & 512 && Di(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Hg(e, r);
        break;
      case 13:
        za(e, r), l & 4 && qg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = Aj.bind(
          null,
          r
        ), Zj(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Da, !l) {
          n = n !== null && n.memoizedState !== null || Pt, d = Da;
          var h = Pt;
          Da = l, (Pt = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), Da = d, Pt = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Vg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Vg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && xt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Mt = null, Sn = !1;
  function ka(e, n, r) {
    for (r = r.child; r !== null; )
      Ig(e, n, r), r = r.sibling;
  }
  function Ig(e, n, r) {
    if (Re && typeof Re.onCommitFiberUnmount == "function")
      try {
        Re.onCommitFiberUnmount(Ne, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Pt || ga(r, n), ka(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Pt || ga(r, n);
        var l = Mt, d = Sn;
        or(r.type) && (Mt = r.stateNode, Sn = !1), ka(
          e,
          n,
          r
        ), Ii(r.stateNode), Mt = l, Sn = d;
        break;
      case 5:
        Pt || ga(r, n);
      case 6:
        if (l = Mt, d = Sn, Mt = null, ka(
          e,
          n,
          r
        ), Mt = l, Sn = d, Mt !== null)
          if (Sn)
            try {
              (Mt.nodeType === 9 ? Mt.body : Mt.nodeName === "HTML" ? Mt.ownerDocument.body : Mt).removeChild(r.stateNode);
            } catch (h) {
              mt(
                r,
                n,
                h
              );
            }
          else
            try {
              Mt.removeChild(r.stateNode);
            } catch (h) {
              mt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Mt !== null && (Sn ? (e = Mt, kv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Ls(e)) : kv(Mt, r.stateNode));
        break;
      case 4:
        l = Mt, d = Sn, Mt = r.stateNode.containerInfo, Sn = !0, ka(
          e,
          n,
          r
        ), Mt = l, Sn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), Pt || tr(4, r, n), ka(
          e,
          n,
          r
        );
        break;
      case 1:
        Pt || (ga(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && zg(
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
        Pt = (l = Pt) || r.memoizedState !== null, ka(
          e,
          n,
          r
        ), Pt = l;
        break;
      default:
        ka(
          e,
          n,
          r
        );
    }
  }
  function Hg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ls(e);
      } catch (r) {
        mt(n, n.return, r);
      }
    }
  }
  function qg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ls(e);
      } catch (r) {
        mt(n, n.return, r);
      }
  }
  function jj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new Ug()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new Ug()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function mo(e, n) {
    var r = jj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Dj.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function wn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                Mt = E.stateNode, Sn = !1;
                break e;
              }
              break;
            case 5:
              Mt = E.stateNode, Sn = !1;
              break e;
            case 3:
            case 4:
              Mt = E.stateNode.containerInfo, Sn = !0;
              break e;
          }
          E = E.return;
        }
        if (Mt === null) throw Error(i(160));
        Ig(h, x, d), Mt = null, Sn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Fg(n, e), n = n.sibling;
  }
  var la = null;
  function Fg(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        wn(n, e), jn(e), l & 4 && (tr(3, e, e.return), Ai(3, e), tr(5, e, e.return));
        break;
      case 1:
        wn(n, e), jn(e), l & 512 && (Pt || r === null || ga(r, r.return)), l & 64 && Da && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = la;
        if (wn(n, e), jn(e), l & 512 && (Pt || r === null || ga(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[Xe] || h[Se] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), on(h, l, r), h[Se] = e, Et(h), l = h;
                      break e;
                    case "link":
                      var x = Fv(
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
                      h = d.createElement(l), on(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Fv(
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
                      h = d.createElement(l), on(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(i(468, l));
                  }
                  h[Se] = e, Et(h), l = h;
                }
                e.stateNode = l;
              } else
                Yv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = qv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Yv(
              d,
              e.type,
              e.stateNode
            ) : qv(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && vd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        wn(n, e), jn(e), l & 512 && (Pt || r === null || ga(r, r.return)), r !== null && l & 4 && vd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (wn(n, e), jn(e), l & 512 && (Pt || r === null || ga(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ss(d, "");
          } catch (Me) {
            mt(e, e.return, Me);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, vd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (xd = !0);
        break;
      case 6:
        if (wn(n, e), jn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Me) {
            mt(e, e.return, Me);
          }
        }
        break;
      case 3:
        if (Mo = null, d = la, la = Ro(n.containerInfo), wn(n, e), la = d, jn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Ls(n.containerInfo);
          } catch (Me) {
            mt(e, e.return, Me);
          }
        xd && (xd = !1, Yg(e));
        break;
      case 4:
        l = la, la = Ro(
          e.stateNode.containerInfo
        ), wn(n, e), jn(e), la = l;
        break;
      case 12:
        wn(n, e), jn(e);
        break;
      case 31:
        wn(n, e), jn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 13:
        wn(n, e), jn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (go = Rt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ae = Da, de = Pt;
        if (Da = ae || d, Pt = de || L, wn(n, e), Pt = de, Da = ae, jn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Da || Pt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var he = L.memoizedProps.style, se = he != null && he.hasOwnProperty("display") ? he.display : null;
                    E.style.display = se == null || typeof se == "boolean" ? "" : ("" + se).trim();
                  }
                } catch (Me) {
                  mt(L, L.return, Me);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Me) {
                  mt(L, L.return, Me);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? zv(oe, !0) : zv(L.stateNode, !1);
                } catch (Me) {
                  mt(L, L.return, Me);
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
        l & 4 && (l = e.updateQueue, l !== null && (r = l.retryQueue, r !== null && (l.retryQueue = null, mo(e, r))));
        break;
      case 19:
        wn(n, e), jn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        wn(n, e), jn(e);
    }
  }
  function jn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (Lg(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = yd(e);
            ho(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ss(x, ""), r.flags &= -33);
            var E = yd(e);
            ho(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, ae = yd(e);
            bd(
              e,
              ae,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (de) {
        mt(e, e.return, de);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Yg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Yg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Bg(e, n.alternate, n), n = n.sibling;
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
          ga(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && zg(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          Ii(n.stateNode);
        case 26:
        case 5:
          ga(n, n.return), Hr(n);
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
            } catch (ae) {
              mt(l, l.return, ae);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  wp(L[d], E);
            } catch (ae) {
              mt(l, l.return, ae);
            }
          }
          r && x & 64 && kg(h), Di(h, h.return);
          break;
        case 27:
          $g(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Og(h), Di(h, h.return);
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
          ), r && x & 4 && Hg(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && qg(d, h);
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
  function Sd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && yi(r));
  }
  function wd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && yi(e));
  }
  function oa(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Gg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Gg(e, n, r, l) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        oa(
          e,
          n,
          r,
          l
        ), d & 2048 && Ai(9, n);
        break;
      case 1:
        oa(
          e,
          n,
          r,
          l
        );
        break;
      case 3:
        oa(
          e,
          n,
          r,
          l
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && yi(e)));
        break;
      case 12:
        if (d & 2048) {
          oa(
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
            mt(n, n.return, L);
          }
        } else
          oa(
            e,
            n,
            r,
            l
          );
        break;
      case 31:
        oa(
          e,
          n,
          r,
          l
        );
        break;
      case 13:
        oa(
          e,
          n,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, x = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? oa(
          e,
          n,
          r,
          l
        ) : ki(e, n) : h._visibility & 2 ? oa(
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
        )), d & 2048 && Sd(x, n);
        break;
      case 24:
        oa(
          e,
          n,
          r,
          l
        ), d & 2048 && wd(n.alternate, n);
        break;
      default:
        oa(
          e,
          n,
          r,
          l
        );
    }
  }
  function Ns(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, ae = x.flags;
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
          )), d && ae & 2048 && Sd(
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
          ), d && ae & 2048 && wd(x.alternate, x);
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
            ki(r, l), d & 2048 && Sd(
              l.alternate,
              l
            );
            break;
          case 24:
            ki(r, l), d & 2048 && wd(l.alternate, l);
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
        Pg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Pg(e, n, r) {
    switch (e.tag) {
      case 26:
        Cs(
          e,
          n,
          r
        ), e.flags & zi && e.memoizedState !== null && cE(
          r,
          la,
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
        var l = la;
        la = Ro(e.stateNode.containerInfo), Cs(
          e,
          n,
          r
        ), la = l;
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
  function Kg(e) {
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
          en = l, Qg(
            l,
            e
          );
        }
      Kg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Xg(e), e = e.sibling;
  }
  function Xg(e) {
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
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, po(e)) : Oi(e);
        break;
      default:
        Oi(e);
    }
  }
  function po(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          en = l, Qg(
            l,
            e
          );
        }
      Kg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          tr(8, n, n.return), po(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, po(n));
          break;
        default:
          po(n);
      }
      e = e.sibling;
    }
  }
  function Qg(e, n) {
    for (; en !== null; ) {
      var r = en;
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
      if (l = r.child, l !== null) l.return = r, en = l;
      else
        e: for (r = e; en !== null; ) {
          l = en;
          var d = l.sibling, h = l.return;
          if (Vg(l), l === r) {
            en = null;
            break e;
          }
          if (d !== null) {
            d.return = h, en = d;
            break e;
          }
          en = h;
        }
    }
  }
  var Ej = {
    getCacheForType: function(e) {
      var n = sn(Ft), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return sn(Ft).controller.signal;
    }
  }, Nj = typeof WeakMap == "function" ? WeakMap : Map, ut = 0, St = null, et = null, nt = 0, ht = 0, $n = null, nr = !1, Ts = !1, jd = !1, La = 0, Lt = 0, ar = 0, qr = 0, Ed = 0, Un = 0, Rs = 0, Li = null, En = null, Nd = !1, go = 0, Zg = 0, vo = 1 / 0, yo = null, rr = null, Jt = 0, sr = null, _s = null, $a = 0, Cd = 0, Td = null, Jg = null, $i = 0, Rd = null;
  function Bn() {
    return (ut & 2) !== 0 && nt !== 0 ? nt & -nt : k.T !== null ? zd() : ge();
  }
  function Wg() {
    if (Un === 0)
      if ((nt & 536870912) === 0 || rt) {
        var e = nn;
        nn <<= 1, (nn & 3932160) === 0 && (nn = 262144), Un = e;
      } else Un = 536870912;
    return e = On.current, e !== null && (e.flags |= 32), Un;
  }
  function Nn(e, n, r) {
    (e === St && (ht === 2 || ht === 9) || e.cancelPendingCommit !== null) && (Ms(e, 0), ir(
      e,
      nt,
      Un,
      !1
    )), pt(e, r), ((ut & 2) === 0 || e !== St) && (e === St && ((ut & 2) === 0 && (qr |= r), Lt === 4 && ir(
      e,
      nt,
      Un,
      !1
    )), va(e));
  }
  function ev(e, n, r) {
    if ((ut & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ct(e, n), d = l ? Rj(e, n) : Md(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ts && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Cj(r)) {
          d = Md(e, n, !1), h = !1;
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
              if (L && (Ms(E, x).flags |= 256), x = Md(
                E,
                x,
                !1
              ), x !== 2) {
                if (jd && !L) {
                  E.errorRecoveryDisabledLanes |= h, qr |= h, d = 4;
                  break e;
                }
                h = En, En = d, h !== null && (En === null ? En = h : En.push.apply(
                  En,
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
                Un,
                !nr
              );
              break e;
            case 2:
              En = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && (d = go + 300 - Rt(), 10 < d)) {
            if (ir(
              l,
              n,
              Un,
              !nr
            ), Ue(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Av(
              tv.bind(
                null,
                l,
                r,
                En,
                yo,
                Nd,
                n,
                Un,
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
          tv(
            l,
            r,
            En,
            yo,
            Nd,
            n,
            Un,
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
    va(e);
  }
  function tv(e, n, r, l, d, h, x, E, L, ae, de, he, se, oe) {
    if (e.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wa
      }, Pg(
        n,
        h,
        he
      );
      var Me = (h & 62914560) === h ? go - Rt() : (h & 4194048) === h ? Zg - Rt() : 0;
      if (Me = uE(
        he,
        Me
      ), Me !== null) {
        $a = h, e.cancelPendingCommit = Me(
          cv.bind(
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
            he,
            null,
            se,
            oe
          )
        ), ir(e, h, x, !ae);
        return;
      }
    }
    cv(
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
  function Cj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!kn(h(), d)) return !1;
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
    n &= ~Ed, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - qe(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && Sa(e, r, n);
  }
  function bo() {
    return (ut & 6) === 0 ? (Ui(0), !1) : !0;
  }
  function _d() {
    if (et !== null) {
      if (ht === 0)
        var e = et.return;
      else
        e = et, Ca = zr = null, Yu(e), xs = null, xi = 0, e = et;
      for (; e !== null; )
        Dg(e.alternate, e), e = e.return;
      et = null;
    }
  }
  function Ms(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Gj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, _d(), St = e, et = r = Ea(e.current, null), nt = n, ht = 0, $n = null, nr = !1, Ts = ct(e, n), jd = !1, Rs = Un = Ed = qr = ar = Lt = 0, En = Li = null, Nd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - qe(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Bl(), r;
  }
  function nv(e, n) {
    Ye = null, k.H = Ri, n === bs || n === Pl ? (n = yp(), ht = 3) : n === ku ? (n = yp(), ht = 4) : ht = n === ld ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, $n = n, et === null && (Lt = 1, lo(
      e,
      Gn(n, e.current)
    ));
  }
  function av() {
    var e = On.current;
    return e === null ? !0 : (nt & 4194048) === nt ? Qn === null : (nt & 62914560) === nt || (nt & 536870912) !== 0 ? e === Qn : !1;
  }
  function rv() {
    var e = k.H;
    return k.H = Ri, e === null ? Ri : e;
  }
  function sv() {
    var e = k.A;
    return k.A = Ej, e;
  }
  function xo() {
    Lt = 4, nr || (nt & 4194048) !== nt && On.current !== null || (Ts = !0), (ar & 134217727) === 0 && (qr & 134217727) === 0 || St === null || ir(
      St,
      nt,
      Un,
      !1
    );
  }
  function Md(e, n, r) {
    var l = ut;
    ut |= 2;
    var d = rv(), h = sv();
    (St !== e || nt !== n) && (yo = null, Ms(e, n)), n = !1;
    var x = Lt;
    e: do
      try {
        if (ht !== 0 && et !== null) {
          var E = et, L = $n;
          switch (ht) {
            case 8:
              _d(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              On.current === null && (n = !0);
              var ae = ht;
              if (ht = 0, $n = null, As(e, E, L, ae), r && Ts) {
                x = 0;
                break e;
              }
              break;
            default:
              ae = ht, ht = 0, $n = null, As(e, E, L, ae);
          }
        }
        Tj(), x = Lt;
        break;
      } catch (de) {
        nv(e, de);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = zr = null, ut = l, k.H = d, k.A = h, et === null && (St = null, nt = 0, Bl()), x;
  }
  function Tj() {
    for (; et !== null; ) iv(et);
  }
  function Rj(e, n) {
    var r = ut;
    ut |= 2;
    var l = rv(), d = sv();
    St !== e || nt !== n ? (yo = null, vo = Rt() + 500, Ms(e, n)) : Ts = ct(
      e,
      n
    );
    e: do
      try {
        if (ht !== 0 && et !== null) {
          n = et;
          var h = $n;
          t: switch (ht) {
            case 1:
              ht = 0, $n = null, As(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (gp(h)) {
                ht = 0, $n = null, lv(n);
                break;
              }
              n = function() {
                ht !== 2 && ht !== 9 || St !== e || (ht = 7), va(e);
              }, h.then(n, n);
              break e;
            case 3:
              ht = 7;
              break e;
            case 4:
              ht = 5;
              break e;
            case 7:
              gp(h) ? (ht = 0, $n = null, lv(n)) : (ht = 0, $n = null, As(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (et.tag) {
                case 26:
                  x = et.memoizedState;
                case 5:
                case 27:
                  var E = et;
                  if (x ? Gv(x) : E.stateNode.complete) {
                    ht = 0, $n = null;
                    var L = E.sibling;
                    if (L !== null) et = L;
                    else {
                      var ae = E.return;
                      ae !== null ? (et = ae, So(ae)) : et = null;
                    }
                    break t;
                  }
              }
              ht = 0, $n = null, As(e, n, h, 5);
              break;
            case 6:
              ht = 0, $n = null, As(e, n, h, 6);
              break;
            case 8:
              _d(), Lt = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        _j();
        break;
      } catch (de) {
        nv(e, de);
      }
    while (!0);
    return Ca = zr = null, k.H = l, k.A = d, ut = r, et !== null ? 0 : (St = null, nt = 0, Bl(), Lt);
  }
  function _j() {
    for (; et !== null && !Dt(); )
      iv(et);
  }
  function iv(e) {
    var n = Mg(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? So(e) : et = n;
  }
  function lv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Eg(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          nt
        );
        break;
      case 11:
        n = Eg(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          nt
        );
        break;
      case 5:
        Yu(n);
      default:
        Dg(r, n), n = et = sp(n, La), n = Mg(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? So(e) : et = n;
  }
  function As(e, n, r, l) {
    Ca = zr = null, Yu(n), xs = null, xi = 0;
    var d = n.return;
    try {
      if (vj(
        e,
        d,
        n,
        r,
        nt
      )) {
        Lt = 1, lo(
          e,
          Gn(r, e.current)
        ), et = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw et = d, h;
      Lt = 1, lo(
        e,
        Gn(r, e.current)
      ), et = null;
      return;
    }
    n.flags & 32768 ? (rt || l === 1 ? e = !0 : Ts || (nt & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = On.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ov(n, e)) : So(n);
  }
  function So(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        ov(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = xj(
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
    Lt === 0 && (Lt = 5);
  }
  function ov(e, n) {
    do {
      var r = Sj(e.alternate, e);
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
    Lt = 6, et = null;
  }
  function cv(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      wo();
    while (Jt !== 0);
    if ((ut & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= yu, an(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === St && (et = St = null, nt = 0), _s = n, sr = e, $a = r, Cd = h, Td = d, Jg = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, kj(be, function() {
        return mv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null, d = $.p, $.p = 2, x = ut, ut |= 4;
        try {
          wj(e, n, r);
        } finally {
          ut = x, $.p = d, k.T = l;
        }
      }
      Jt = 1, uv(), dv(), fv();
    }
  }
  function uv() {
    if (Jt === 1) {
      Jt = 0;
      var e = sr, n = _s, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = k.T, k.T = null;
        var l = $.p;
        $.p = 2;
        var d = ut;
        ut |= 4;
        try {
          Fg(n, e);
          var h = Hd, x = Qm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Xm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && hu(E)) {
              var ae = L.start, de = L.end;
              if (de === void 0 && (de = ae), "selectionStart" in E)
                E.selectionStart = ae, E.selectionEnd = Math.min(
                  de,
                  E.value.length
                );
              else {
                var he = E.ownerDocument || document, se = he && he.defaultView || window;
                if (se.getSelection) {
                  var oe = se.getSelection(), Me = E.textContent.length, Be = Math.min(L.start, Me), bt = L.end === void 0 ? Be : Math.min(L.end, Me);
                  !oe.extend && Be > bt && (x = bt, bt = Be, Be = x);
                  var P = Km(
                    E,
                    Be
                  ), B = Km(
                    E,
                    bt
                  );
                  if (P && B && (oe.rangeCount !== 1 || oe.anchorNode !== P.node || oe.anchorOffset !== P.offset || oe.focusNode !== B.node || oe.focusOffset !== B.offset)) {
                    var ee = he.createRange();
                    ee.setStart(P.node, P.offset), oe.removeAllRanges(), Be > bt ? (oe.addRange(ee), oe.extend(B.node, B.offset)) : (ee.setEnd(B.node, B.offset), oe.addRange(ee));
                  }
                }
              }
            }
            for (he = [], oe = E; oe = oe.parentNode; )
              oe.nodeType === 1 && he.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < he.length; E++) {
              var fe = he[E];
              fe.element.scrollLeft = fe.left, fe.element.scrollTop = fe.top;
            }
          }
          zo = !!Id, Hd = Id = null;
        } finally {
          ut = d, $.p = l, k.T = r;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function dv() {
    if (Jt === 2) {
      Jt = 0;
      var e = sr, n = _s, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = k.T, k.T = null;
        var l = $.p;
        $.p = 2;
        var d = ut;
        ut |= 4;
        try {
          Bg(e, n.alternate, n);
        } finally {
          ut = d, $.p = l, k.T = r;
        }
      }
      Jt = 3;
    }
  }
  function fv() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, tn();
      var e = sr, n = _s, r = $a, l = Jg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, _s = sr = null, hv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, Re && typeof Re.onCommitFiberRoot == "function")
        try {
          Re.onCommitFiberRoot(
            Ne,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = k.T, d = $.p, $.p = 2, k.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          k.T = n, $.p = d;
        }
      }
      ($a & 3) !== 0 && wo(), va(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Rd ? $i++ : ($i = 0, Rd = e) : $i = 0, Ui(0);
    }
  }
  function hv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, yi(n)));
  }
  function wo() {
    return uv(), dv(), fv(), mv();
  }
  function mv() {
    if (Jt !== 5) return !1;
    var e = sr, n = Cd;
    Cd = 0;
    var r = Z($a), l = k.T, d = $.p;
    try {
      $.p = 32 > r ? 32 : r, k.T = null, r = Td, Td = null;
      var h = sr, x = $a;
      if (Jt = 0, _s = sr = null, $a = 0, (ut & 6) !== 0) throw Error(i(331));
      var E = ut;
      if (ut |= 4, Xg(h.current), Gg(
        h,
        h.current,
        x,
        r
      ), ut = E, Ui(0, !1), Re && typeof Re.onPostCommitFiberRoot == "function")
        try {
          Re.onPostCommitFiberRoot(Ne, h);
        } catch {
        }
      return !0;
    } finally {
      $.p = d, k.T = l, hv(e, n);
    }
  }
  function pv(e, n, r) {
    n = Gn(r, n), n = id(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (pt(e, 2), va(e));
  }
  function mt(e, n, r) {
    if (e.tag === 3)
      pv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          pv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = gg(2), l = Ja(n, r, 2), l !== null && (vg(
              r,
              l,
              n,
              e
            ), pt(l, 2), va(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Ad(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Nj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (jd = !0, d.add(r), e = Mj.bind(null, e, n, r), n.then(e, e));
  }
  function Mj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, St === e && (nt & r) === r && (Lt === 4 || Lt === 3 && (nt & 62914560) === nt && 300 > Rt() - go ? (ut & 2) === 0 && Ms(e, 0) : Ed |= r, Rs === nt && (Rs = 0)), va(e);
  }
  function gv(e, n) {
    n === 0 && (n = Zt()), e = Ar(e, n), e !== null && (pt(e, n), va(e));
  }
  function Aj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), gv(e, r);
  }
  function Dj(e, n) {
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
    l !== null && l.delete(n), gv(e, r);
  }
  function kj(e, n) {
    return Qt(e, n);
  }
  var jo = null, Ds = null, Dd = !1, Eo = !1, kd = !1, lr = 0;
  function va(e) {
    e !== Ds && e.next === null && (Ds === null ? jo = Ds = e : Ds = Ds.next = e), Eo = !0, Dd || (Dd = !0, Oj());
  }
  function Ui(e, n) {
    if (!kd && Eo) {
      kd = !0;
      do
        for (var r = !1, l = jo; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - qe(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, xv(l, h));
          } else
            h = nt, h = Ue(
              l,
              l === St ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || ct(l, h) || (r = !0, xv(l, h));
          l = l.next;
        }
      while (r);
      kd = !1;
    }
  }
  function zj() {
    vv();
  }
  function vv() {
    Eo = Dd = !1;
    var e = 0;
    lr !== 0 && Yj() && (e = lr);
    for (var n = Rt(), r = null, l = jo; l !== null; ) {
      var d = l.next, h = yv(l, n);
      h === 0 ? (l.next = null, r === null ? jo = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Eo = !0)), l = d;
    }
    Jt !== 0 && Jt !== 5 || Ui(e), lr !== 0 && (lr = 0);
  }
  function yv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - qe(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = zt(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = St, r = nt, r = Ue(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (ht === 2 || ht === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && un(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ct(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && un(l), Z(r)) {
        case 2:
        case 8:
          r = me;
          break;
        case 32:
          r = be;
          break;
        case 268435456:
          r = Ge;
          break;
        default:
          r = be;
      }
      return l = bv.bind(null, e), r = Qt(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && un(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function bv(e, n) {
    if (Jt !== 0 && Jt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (wo() && e.callbackNode !== r)
      return null;
    var l = nt;
    return l = Ue(
      e,
      e === St ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (ev(e, l, n), yv(e, Rt()), e.callbackNode != null && e.callbackNode === r ? bv.bind(null, e) : null);
  }
  function xv(e, n) {
    if (wo()) return null;
    ev(e, n, !0);
  }
  function Oj() {
    Pj(function() {
      (ut & 6) !== 0 ? Qt(
        Q,
        zj
      ) : vv();
    });
  }
  function zd() {
    if (lr === 0) {
      var e = vs;
      e === 0 && (e = qn, qn <<= 1, (qn & 261888) === 0 && (qn = 256)), lr = e;
    }
    return lr;
  }
  function Sv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Al("" + e);
  }
  function wv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Lj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = Sv(
        (d[je] || null).action
      ), x = l.submitter;
      x && (n = (n = x[je] || null) ? Sv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
      var E = new Ol(
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
                  var L = x ? wv(d, x) : new FormData(d);
                  ed(
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
                typeof h == "function" && (E.preventDefault(), L = x ? wv(d, x) : new FormData(d), ed(
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
  for (var Od = 0; Od < vu.length; Od++) {
    var Ld = vu[Od], $j = Ld.toLowerCase(), Uj = Ld[0].toUpperCase() + Ld.slice(1);
    ia(
      $j,
      "on" + Uj
    );
  }
  ia(Wm, "onAnimationEnd"), ia(ep, "onAnimationIteration"), ia(tp, "onAnimationStart"), ia("dblclick", "onDoubleClick"), ia("focusin", "onFocus"), ia("focusout", "onBlur"), ia(ej, "onTransitionRun"), ia(tj, "onTransitionStart"), ia(nj, "onTransitionCancel"), ia(np, "onTransitionEnd"), fa("onMouseEnter", ["mouseout", "mouseover"]), fa("onMouseLeave", ["mouseout", "mouseover"]), fa("onPointerEnter", ["pointerout", "pointerover"]), fa("onPointerLeave", ["pointerout", "pointerover"]), Wt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Wt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Wt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Wt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Wt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Wt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Bj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bi)
  );
  function jv(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], L = E.instance, ae = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ae;
            try {
              h(d);
            } catch (de) {
              Ul(de);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, ae = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = ae;
            try {
              h(d);
            } catch (de) {
              Ul(de);
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
    r.has(l) || (Ev(n, e, 2, !1), r.add(l));
  }
  function $d(e, n, r) {
    var l = 0;
    n && (l |= 4), Ev(
      r,
      e,
      l,
      n
    );
  }
  var No = "_reactListening" + Math.random().toString(36).slice(2);
  function Ud(e) {
    if (!e[No]) {
      e[No] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (Bj.has(r) || $d(r, !1, e), $d(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[No] || (n[No] = !0, $d("selectionchange", !1, n));
    }
  }
  function Ev(e, n, r, l) {
    switch (Wv(n)) {
      case 2:
        var d = hE;
        break;
      case 8:
        d = mE;
        break;
      default:
        d = Wd;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !ru || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Bd(e, n, r, l, d) {
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
            if (x = gt(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    _m(function() {
      var ae = h, de = nu(r), he = [];
      e: {
        var se = ap.get(e);
        if (se !== void 0) {
          var oe = Ol, Me = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Dw;
              break;
            case "focusin":
              Me = "focus", oe = ou;
              break;
            case "focusout":
              Me = "blur", oe = ou;
              break;
            case "beforeblur":
            case "afterblur":
              oe = ou;
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
              oe = Dm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = xw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = Ow;
              break;
            case Wm:
            case ep:
            case tp:
              oe = jw;
              break;
            case np:
              oe = $w;
              break;
            case "scroll":
            case "scrollend":
              oe = yw;
              break;
            case "wheel":
              oe = Bw;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Nw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = zm;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Iw;
          }
          var Be = (n & 4) !== 0, bt = !Be && (e === "scroll" || e === "scrollend"), P = Be ? se !== null ? se + "Capture" : null : se;
          Be = [];
          for (var B = ae, ee; B !== null; ) {
            var fe = B;
            if (ee = fe.stateNode, fe = fe.tag, fe !== 5 && fe !== 26 && fe !== 27 || ee === null || P === null || (fe = li(B, P), fe != null && Be.push(
              Vi(B, fe, ee)
            )), bt) break;
            B = B.return;
          }
          0 < Be.length && (se = new oe(
            se,
            Me,
            null,
            r,
            de
          ), he.push({ event: se, listeners: Be }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (se = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", se && r !== tu && (Me = r.relatedTarget || r.fromElement) && (gt(Me) || Me[ke]))
            break e;
          if ((oe || se) && (se = de.window === de ? de : (se = de.ownerDocument) ? se.defaultView || se.parentWindow : window, oe ? (Me = r.relatedTarget || r.toElement, oe = ae, Me = Me ? gt(Me) : null, Me !== null && (bt = u(Me), Be = Me.tag, Me !== bt || Be !== 5 && Be !== 27 && Be !== 6) && (Me = null)) : (oe = null, Me = ae), oe !== Me)) {
            if (Be = Dm, fe = "onMouseLeave", P = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Be = zm, fe = "onPointerLeave", P = "onPointerEnter", B = "pointer"), bt = oe == null ? se : We(oe), ee = Me == null ? se : We(Me), se = new Be(
              fe,
              B + "leave",
              oe,
              r,
              de
            ), se.target = bt, se.relatedTarget = ee, fe = null, gt(de) === ae && (Be = new Be(
              P,
              B + "enter",
              Me,
              r,
              de
            ), Be.target = ee, Be.relatedTarget = bt, fe = Be), bt = fe, oe && Me)
              t: {
                for (Be = Vj, P = oe, B = Me, ee = 0, fe = P; fe; fe = Be(fe))
                  ee++;
                fe = 0;
                for (var Le = B; Le; Le = Be(Le))
                  fe++;
                for (; 0 < ee - fe; )
                  P = Be(P), ee--;
                for (; 0 < fe - ee; )
                  B = Be(B), fe--;
                for (; ee--; ) {
                  if (P === B || B !== null && P === B.alternate) {
                    Be = P;
                    break t;
                  }
                  P = Be(P), B = Be(B);
                }
                Be = null;
              }
            else Be = null;
            oe !== null && Nv(
              he,
              se,
              oe,
              Be,
              !1
            ), Me !== null && bt !== null && Nv(
              he,
              bt,
              Me,
              Be,
              !0
            );
          }
        }
        e: {
          if (se = ae ? We(ae) : window, oe = se.nodeName && se.nodeName.toLowerCase(), oe === "select" || oe === "input" && se.type === "file")
            var lt = Hm;
          else if (Vm(se))
            if (qm)
              lt = Zw;
            else {
              lt = Xw;
              var ze = Kw;
            }
          else
            oe = se.nodeName, !oe || oe.toLowerCase() !== "input" || se.type !== "checkbox" && se.type !== "radio" ? ae && eu(ae.elementType) && (lt = Hm) : lt = Qw;
          if (lt && (lt = lt(e, ae))) {
            Im(
              he,
              lt,
              r,
              de
            );
            break e;
          }
          ze && ze(e, se, ae), e === "focusout" && ae && se.type === "number" && ae.memoizedProps.value != null && Wc(se, "number", se.value);
        }
        switch (ze = ae ? We(ae) : window, e) {
          case "focusin":
            (Vm(ze) || ze.contentEditable === "true") && (cs = ze, mu = ae, pi = null);
            break;
          case "focusout":
            pi = mu = cs = null;
            break;
          case "mousedown":
            pu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pu = !1, Zm(he, r, de);
            break;
          case "selectionchange":
            if (Ww) break;
          case "keydown":
          case "keyup":
            Zm(he, r, de);
        }
        var Pe;
        if (uu)
          e: {
            switch (e) {
              case "compositionstart":
                var at = "onCompositionStart";
                break e;
              case "compositionend":
                at = "onCompositionEnd";
                break e;
              case "compositionupdate":
                at = "onCompositionUpdate";
                break e;
            }
            at = void 0;
          }
        else
          os ? Um(e, r) && (at = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (at = "onCompositionStart");
        at && (Om && r.locale !== "ko" && (os || at !== "onCompositionStart" ? at === "onCompositionEnd" && os && (Pe = Mm()) : (Ya = de, su = "value" in Ya ? Ya.value : Ya.textContent, os = !0)), ze = Co(ae, at), 0 < ze.length && (at = new km(
          at,
          e,
          null,
          r,
          de
        ), he.push({ event: at, listeners: ze }), Pe ? at.data = Pe : (Pe = Bm(r), Pe !== null && (at.data = Pe)))), (Pe = qw ? Fw(e, r) : Yw(e, r)) && (at = Co(ae, "onBeforeInput"), 0 < at.length && (ze = new km(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          de
        ), he.push({
          event: ze,
          listeners: at
        }), ze.data = Pe)), Lj(
          he,
          e,
          ae,
          r,
          de
        );
      }
      jv(he, n);
    });
  }
  function Vi(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Co(e, n) {
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
  function Vj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Nv(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, ae = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || ae === null || (L = ae, d ? (ae = li(r, h), ae != null && x.unshift(
        Vi(r, ae, L)
      )) : d || (ae = li(r, h), ae != null && x.push(
        Vi(r, ae, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Ij = /\r\n?/g, Hj = /\u0000|\uFFFD/g;
  function Cv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ij, `
`).replace(Hj, "");
  }
  function Tv(e, n) {
    return n = Cv(n), Cv(e) === n;
  }
  function yt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ss(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ss(e, "" + l);
        break;
      case "className":
        $t(e, "class", l);
        break;
      case "tabIndex":
        $t(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        $t(e, r, l);
        break;
      case "style":
        Tm(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          $t(e, "data", l);
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
        l = Al("" + l), e.setAttribute(r, l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && yt(e, n, "name", d.name, d, null), yt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), yt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), yt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (yt(e, n, "encType", d.encType, d, null), yt(e, n, "method", d.method, d, null), yt(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Al("" + l), e.setAttribute(r, l);
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
        r = Al("" + l), e.setAttributeNS(
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
        tt("beforetoggle", e), tt("toggle", e), Qe(e, "popover", l);
        break;
      case "xlinkActuate":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        mn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        mn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        mn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        mn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Qe(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = gw.get(r) || r, Qe(e, r, l));
    }
  }
  function Vd(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        Tm(e, l, h);
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
        if (!sa.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[je] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : Qe(e, r, l);
          }
    }
  }
  function on(e, n, r) {
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
                  yt(e, n, h, x, r, null);
              }
          }
        d && yt(e, n, "srcSet", r.srcSet, r, null), l && yt(e, n, "src", r.src, r, null);
        return;
      case "input":
        tt("invalid", e);
        var E = h = x = d = null, L = null, ae = null;
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
                  ae = de;
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
                  yt(e, n, l, de, r, null);
              }
          }
        jm(
          e,
          h,
          E,
          L,
          ae,
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
                yt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? rs(e, !!l, n, !1) : r != null && rs(e, !!l, r, !0);
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
                yt(e, n, x, E, r, null);
            }
        Nm(e, l, d, h);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                yt(e, n, L, l, r, null);
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
        for (l = 0; l < Bi.length; l++)
          tt(Bi[l], e);
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
        for (ae in r)
          if (r.hasOwnProperty(ae) && (l = r[ae], l != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                yt(e, n, ae, l, r, null);
            }
        return;
      default:
        if (eu(n)) {
          for (de in r)
            r.hasOwnProperty(de) && (l = r[de], l !== void 0 && Vd(
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
      r.hasOwnProperty(E) && (l = r[E], l != null && yt(e, n, E, l, r, null));
  }
  function qj(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, ae = null, de = null;
        for (oe in r) {
          var he = r[oe];
          if (r.hasOwnProperty(oe) && he != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = he;
              default:
                l.hasOwnProperty(oe) || yt(e, n, oe, null, l, he);
            }
        }
        for (var se in l) {
          var oe = l[se];
          if (he = r[se], l.hasOwnProperty(se) && (oe != null || he != null))
            switch (se) {
              case "type":
                h = oe;
                break;
              case "name":
                d = oe;
                break;
              case "checked":
                ae = oe;
                break;
              case "defaultChecked":
                de = oe;
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
                oe !== he && yt(
                  e,
                  n,
                  se,
                  oe,
                  l,
                  he
                );
            }
        }
        Jc(
          e,
          x,
          E,
          L,
          ae,
          de,
          h,
          d
        );
        return;
      case "select":
        oe = x = E = se = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                oe = L;
              default:
                l.hasOwnProperty(h) || yt(
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
                h !== L && yt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = oe, se != null ? rs(e, !!r, se, !1) : !!l != !!r && (n != null ? rs(e, !!r, n, !0) : rs(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        oe = se = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                yt(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                se = d;
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
                d !== h && yt(e, n, x, d, l, h);
            }
        Em(e, se, oe);
        return;
      case "option":
        for (var Me in r)
          if (se = r[Me], r.hasOwnProperty(Me) && se != null && !l.hasOwnProperty(Me))
            switch (Me) {
              case "selected":
                e.selected = !1;
                break;
              default:
                yt(
                  e,
                  n,
                  Me,
                  null,
                  l,
                  se
                );
            }
        for (L in l)
          if (se = l[L], oe = r[L], l.hasOwnProperty(L) && se !== oe && (se != null || oe != null))
            switch (L) {
              case "selected":
                e.selected = se && typeof se != "function" && typeof se != "symbol";
                break;
              default:
                yt(
                  e,
                  n,
                  L,
                  se,
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
        for (var Be in r)
          se = r[Be], r.hasOwnProperty(Be) && se != null && !l.hasOwnProperty(Be) && yt(e, n, Be, null, l, se);
        for (ae in l)
          if (se = l[ae], oe = r[ae], l.hasOwnProperty(ae) && se !== oe && (se != null || oe != null))
            switch (ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(i(137, n));
                break;
              default:
                yt(
                  e,
                  n,
                  ae,
                  se,
                  l,
                  oe
                );
            }
        return;
      default:
        if (eu(n)) {
          for (var bt in r)
            se = r[bt], r.hasOwnProperty(bt) && se !== void 0 && !l.hasOwnProperty(bt) && Vd(
              e,
              n,
              bt,
              void 0,
              l,
              se
            );
          for (de in l)
            se = l[de], oe = r[de], !l.hasOwnProperty(de) || se === oe || se === void 0 && oe === void 0 || Vd(
              e,
              n,
              de,
              se,
              l,
              oe
            );
          return;
        }
    }
    for (var P in r)
      se = r[P], r.hasOwnProperty(P) && se != null && !l.hasOwnProperty(P) && yt(e, n, P, null, l, se);
    for (he in l)
      se = l[he], oe = r[he], !l.hasOwnProperty(he) || se === oe || se == null && oe == null || yt(e, n, he, se, l, oe);
  }
  function Rv(e) {
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
  function Fj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Rv(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ae = L.startTime;
            if (ae > E) break;
            var de = L.transferSize, he = L.initiatorType;
            de && Rv(he) && (L = L.responseEnd, x += de * (L < E ? 1 : (E - ae) / (L - ae)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Id = null, Hd = null;
  function To(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function _v(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Mv(e, n) {
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
  function qd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Fd = null;
  function Yj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Fd ? !1 : (Fd = e, !0) : (Fd = null, !1);
  }
  var Av = typeof setTimeout == "function" ? setTimeout : void 0, Gj = typeof clearTimeout == "function" ? clearTimeout : void 0, Dv = typeof Promise == "function" ? Promise : void 0, Pj = typeof queueMicrotask == "function" ? queueMicrotask : typeof Dv < "u" ? function(e) {
    return Dv.resolve(null).then(e).catch(Kj);
  } : Av;
  function Kj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function kv(e, n) {
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
            h[Xe] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Ii(e.ownerDocument.body);
      r = d;
    } while (r);
    Ls(n);
  }
  function zv(e, n) {
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
  function Yd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yd(r), xt(r);
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
  function Xj(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Xe])
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
  function Qj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ov(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Gd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Pd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Zj(e, n) {
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
  var Kd = null;
  function Lv(e) {
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
  function $v(e) {
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
  function Uv(e, n, r) {
    switch (n = To(r), e) {
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
    xt(e);
  }
  var Jn = /* @__PURE__ */ new Map(), Bv = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = $.d;
  $.d = {
    f: Jj,
    r: Wj,
    D: eE,
    C: tE,
    L: nE,
    m: aE,
    X: sE,
    S: rE,
    M: iE
  };
  function Jj() {
    var e = Ua.f(), n = bo();
    return e || n;
  }
  function Wj(e) {
    var n = _t(e);
    n !== null && n.tag === 5 && n.type === "form" ? ng(n) : Ua.r(e);
  }
  var ks = typeof document > "u" ? null : document;
  function Vv(e, n, r) {
    var l = ks;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Bv.has(d) || (Bv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), on(n, "link", e), Et(n), l.head.appendChild(n)));
    }
  }
  function eE(e) {
    Ua.D(e), Vv("dns-prefetch", e, null);
  }
  function tE(e, n) {
    Ua.C(e, n), Vv("preconnect", e, n);
  }
  function nE(e, n, r) {
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
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Hi(h)) || n === "script" && l.querySelector(qi(h)) || (n = l.createElement("link"), on(n, "link", e), Et(n), l.head.appendChild(n)));
    }
  }
  function aE(e, n) {
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
        l = r.createElement("link"), on(l, "link", e), Et(l), r.head.appendChild(l);
      }
    }
  }
  function rE(e, n, r) {
    Ua.S(e, n, r);
    var l = ks;
    if (l && e) {
      var d = Ht(l).hoistableStyles, h = zs(e);
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
          ), (r = Jn.get(h)) && Xd(e, r);
          var L = x = l.createElement("link");
          Et(L), on(L, "link", e), L._p = new Promise(function(ae, de) {
            L.onload = ae, L.onerror = de;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, _o(x, n, l);
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
  function sE(e, n) {
    Ua.X(e, n);
    var r = ks;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = v({ src: e, async: !0 }, n), (n = Jn.get(d)) && Qd(e, n), h = r.createElement("script"), Et(h), on(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function iE(e, n) {
    Ua.M(e, n);
    var r = ks;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Qd(e, n), h = r.createElement("script"), Et(h), on(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Iv(e, n, r, l) {
    var d = (d = W.current) ? Ro(d) : null;
    if (!d) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = zs(r.href), r = Ht(
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
          var h = Ht(
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
          }, Jn.set(e, r), h || lE(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Os(r), r = Ht(
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
  function Hv(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function lE(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), on(n, "link", r), Et(n), e.head.appendChild(n));
  }
  function Os(e) {
    return '[src="' + Fn(e) + '"]';
  }
  function qi(e) {
    return "script[async]" + e;
  }
  function qv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Fn(r.href) + '"]'
          );
          if (l)
            return n.instance = l, Et(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Et(l), on(l, "style", d), _o(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = zs(r.href);
          var h = e.querySelector(
            Hi(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, Et(h), h;
          l = Hv(r), (d = Jn.get(d)) && Xd(l, d), h = (e.ownerDocument || e).createElement("link"), Et(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), on(h, "link", l), n.state.loading |= 4, _o(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Os(r.src), (d = e.querySelector(
            qi(h)
          )) ? (n.instance = d, Et(d), d) : (l = r, (d = Jn.get(h)) && (l = v({}, r), Qd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Et(d), on(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, _o(l, r.precedence, e));
    return n.instance;
  }
  function _o(e, n, r) {
    for (var l = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), d = l.length ? l[l.length - 1] : null, h = d, x = 0; x < l.length; x++) {
      var E = l[x];
      if (E.dataset.precedence === n) h = E;
      else if (h !== d) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Xd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Qd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Mo = null;
  function Fv(e, n, r) {
    if (Mo === null) {
      var l = /* @__PURE__ */ new Map(), d = Mo = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Mo, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[Xe] || h[Se] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Yv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function oE(e, n, r) {
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
  function Gv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function cE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = zs(l.href), h = n.querySelector(
          Hi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ao.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Et(h);
          return;
        }
        h = n.ownerDocument || n, l = Hv(l), (d = Jn.get(d)) && Xd(l, d), h = h.createElement("link"), Et(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), on(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Ao.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Zd = 0;
  function uE(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Zd === 0 && (Zd = 62500 * Fj());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Zd ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(d);
      };
    } : null;
  }
  function Ao() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ko(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Do = null;
  function ko(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Do = /* @__PURE__ */ new Map(), n.forEach(dE, e), Do = null, Ao.call(e));
  }
  function dE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Do.get(e);
      if (r) var l = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Do.set(e, r);
        for (var d = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < d.length; h++) {
          var x = d[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), l = x);
        }
        l && r.set(null, l);
      }
      d = n.instance, x = d.getAttribute("data-precedence"), h = r.get(x) || l, h === l && r.set(null, d), r.set(x, d), this.count++, l = Ao.bind(this), d.addEventListener("load", l), d.addEventListener("error", l), h ? h.parentNode.insertBefore(d, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(d, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Fi = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function fE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Dn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dn(0), this.hiddenUpdates = Dn(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Pv(e, n, r, l, d, h, x, E, L, ae, de, he) {
    return e = new fE(
      e,
      n,
      r,
      x,
      L,
      ae,
      de,
      he,
      E
    ), n = 1, h === !0 && (n |= 24), h = zn(3, null, null, n), e.current = h, h.stateNode = e, n = Mu(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, zu(h), e;
  }
  function Kv(e) {
    return e ? (e = fs, e) : fs;
  }
  function Xv(e, n, r, l, d, h) {
    d = Kv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Nn(r, e, n), wi(r, e, n));
  }
  function Qv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Jd(e, n) {
    Qv(e, n), (e = e.alternate) && Qv(e, n);
  }
  function Zv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && Nn(n, e, 67108864), Jd(e, 67108864);
    }
  }
  function Jv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Bn();
      n = G(n);
      var r = Ar(e, n);
      r !== null && Nn(r, e, n), Jd(e, n);
    }
  }
  var zo = !0;
  function hE(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = $.p;
    try {
      $.p = 2, Wd(e, n, r, l);
    } finally {
      $.p = h, k.T = d;
    }
  }
  function mE(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = $.p;
    try {
      $.p = 8, Wd(e, n, r, l);
    } finally {
      $.p = h, k.T = d;
    }
  }
  function Wd(e, n, r, l) {
    if (zo) {
      var d = ef(l);
      if (d === null)
        Bd(
          e,
          n,
          l,
          Oo,
          r
        ), ey(e, l);
      else if (gE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (ey(e, l), n & 4 && -1 < pE.indexOf(e)) {
        for (; d !== null; ) {
          var h = _t(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = fn(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - qe(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    va(h), (ut & 6) === 0 && (vo = Rt() + 500, Ui(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && Nn(E, h, 2), bo(), Jd(h, 2);
            }
          if (h = ef(l), h === null && Bd(
            e,
            n,
            l,
            Oo,
            r
          ), h === d) break;
          d = h;
        }
        d !== null && l.stopPropagation();
      } else
        Bd(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function ef(e) {
    return e = nu(e), tf(e);
  }
  var Oo = null;
  function tf(e) {
    if (Oo = null, e = gt(e), e !== null) {
      var n = u(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = f(n), e !== null) return e;
          e = null;
        } else if (r === 31) {
          if (e = m(n), e !== null) return e;
          e = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          e = null;
        } else n !== e && (e = null);
      }
    }
    return Oo = e, null;
  }
  function Wv(e) {
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
          case Q:
            return 2;
          case me:
            return 8;
          case be:
          case Ie:
            return 32;
          case Ge:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nf = !1, cr = null, ur = null, dr = null, Yi = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Map(), fr = [], pE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ey(e, n) {
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
    }, n !== null && (n = _t(n), n !== null && Zv(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function gE(e, n, r, l, d) {
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
  function ty(e) {
    var n = gt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, ye(e.priority, function() {
              Jv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, ye(e.priority, function() {
              Jv(r);
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
  function Lo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = ef(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        tu = l, r.target.dispatchEvent(l), tu = null;
      } else
        return n = _t(r), n !== null && Zv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ny(e, n, r) {
    Lo(e) && r.delete(n);
  }
  function vE() {
    nf = !1, cr !== null && Lo(cr) && (cr = null), ur !== null && Lo(ur) && (ur = null), dr !== null && Lo(dr) && (dr = null), Yi.forEach(ny), Gi.forEach(ny);
  }
  function $o(e, n) {
    e.blockedOn === n && (e.blockedOn = null, nf || (nf = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      vE
    )));
  }
  var Uo = null;
  function ay(e) {
    Uo !== e && (Uo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Uo === e && (Uo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (tf(l || r) === null)
              continue;
            break;
          }
          var h = _t(r);
          h !== null && (e.splice(n, 3), n -= 3, ed(
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
      return $o(L, e);
    }
    cr !== null && $o(cr, e), ur !== null && $o(ur, e), dr !== null && $o(dr, e), Yi.forEach(n), Gi.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      ty(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[je] || null;
        if (typeof h == "function")
          x || ay(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[je] || null)
              E = x.formAction;
            else if (tf(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), ay(r);
        }
      }
  }
  function ry() {
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
  function af(e) {
    this._internalRoot = e;
  }
  Bo.prototype.render = af.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = Bn();
    Xv(r, l, e, n, null, null);
  }, Bo.prototype.unmount = af.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Xv(e.current, 2, null, e, null, null), bo(), n[ke] = null;
    }
  };
  function Bo(e) {
    this._internalRoot = e;
  }
  Bo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ge();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && ty(e);
    }
  };
  var sy = a.version;
  if (sy !== "19.2.5")
    throw Error(
      i(
        527,
        sy,
        "19.2.5"
      )
    );
  $.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var yE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vo.isDisabled && Vo.supportsFiber)
      try {
        Ne = Vo.inject(
          yE
        ), Re = Vo;
      } catch {
      }
  }
  return Xi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = fg, h = hg, x = mg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Pv(
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
      ry
    ), e[ke] = n.current, Ud(e), new af(n);
  }, Xi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = fg, x = hg, E = mg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Pv(
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
      ry
    ), n.context = Kv(null), r = n.current, l = Bn(), l = G(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, pt(n, r), va(n), e[ke] = n.current, Ud(e), new Bo(n);
  }, Xi.version = "19.2.5", Xi;
}
var py;
function _E() {
  if (py) return lf.exports;
  py = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), lf.exports = RE(), lf.exports;
}
var ME = _E();
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
var _x = (t) => {
  throw TypeError(t);
}, AE = (t, a, s) => a.has(t) || _x("Cannot " + s), df = (t, a, s) => (AE(t, a, "read from private field"), s ? s.call(t) : a.get(t)), DE = (t, a, s) => a.has(t) ? _x("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function gy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function kE(t = {}) {
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
  ), f = "POP", m = null;
  function y(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function b(S, j = null, N, C) {
    let T = Wf(
      o ? p().pathname : "/",
      S,
      j,
      N,
      C
    );
    return Vt(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), T;
  }
  function v(S) {
    return typeof S == "string" ? S : ba(S);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return f;
    },
    get location() {
      return p();
    },
    createHref: v,
    createURL(S) {
      return new URL(v(S), "http://localhost");
    },
    encodeLocation(S) {
      let j = typeof S == "string" ? da(S) : S;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(S, j) {
      f = "PUSH";
      let N = gy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), i && m && m({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = gy(S) ? S : b(S, j);
      o[u] = N, i && m && m({ action: f, location: N, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = y(u + S), N = o[j];
      u = j, m && m({ action: f, location: N, delta: S });
    },
    listen(S) {
      return m = S, () => {
        m = null;
      };
    }
  };
}
function Ze(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Vt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function zE() {
  return Math.random().toString(36).substring(2, 10);
}
function Wf(t, a, s = null, i, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? da(a) : a,
    state: s,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || i || zE(),
    unstable_mask: o
  };
}
function ba({
  pathname: t = "/",
  search: a = "",
  hash: s = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), s && s !== "#" && (t += s.charAt(0) === "#" ? s : "#" + s), t;
}
function da(t) {
  let a = {};
  if (t) {
    let s = t.indexOf("#");
    s >= 0 && (a.hash = t.substring(s), t = t.substring(0, s));
    let i = t.indexOf("?");
    i >= 0 && (a.search = t.substring(i), t = t.substring(0, i)), t && (a.pathname = t);
  }
  return a;
}
function OE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), Ze(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : ba(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var il, vy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (DE(this, il, /* @__PURE__ */ new Map()), t)
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
    if (df(this, il).has(t))
      return df(this, il).get(t);
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
    df(this, il).set(t, a);
  }
};
il = /* @__PURE__ */ new WeakMap();
var LE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function $E(t) {
  return LE.has(
    t
  );
}
var UE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function BE(t) {
  return UE.has(
    t
  );
}
function VE(t) {
  return t.index === !0;
}
function hl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...s, String(f)], y = typeof u.id == "string" ? u.id : m.join("-");
    if (Ze(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ze(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), VE(u)) {
      let p = {
        ...u,
        id: y
      };
      return i[y] = yy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = yy(
        p,
        a(p)
      ), u.children && (p.children = hl(
        u.children,
        a,
        m,
        i,
        o
      )), p;
    }
  });
}
function yy(t, a) {
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
  let o = typeof a == "string" ? da(a) : a, u = aa(o.pathname || "/", s);
  if (u == null)
    return null;
  let f = Mx(t);
  HE(f);
  let m = null;
  for (let y = 0; m == null && y < f.length; ++y) {
    let p = WE(u);
    m = ZE(
      f[y],
      p,
      i
    );
  }
  return m;
}
function IE(t, a) {
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
function Mx(t, a = [], s = [], i = "", o = !1) {
  let u = (f, m, y = o, p) => {
    let b = {
      relativePath: p === void 0 ? f.path || "" : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: m,
      route: f
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(i) && y)
        return;
      Ze(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let v = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (Ze(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), Mx(
      f.children,
      a,
      w,
      v,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: XE(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let y of Ax(f.path))
        u(f, m, !0, y);
  }), a;
}
function Ax(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = Ax(i.join("/")), m = [];
  return m.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && m.push(...f), m.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function HE(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : QE(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var qE = /^:[\w-]+$/, FE = 3, YE = 2, GE = 1, PE = 10, KE = -2, by = (t) => t === "*";
function XE(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(by) && (i += KE), a && (i += YE), s.filter((o) => !by(o)).reduce(
    (o, u) => o + (qE.test(u) ? FE : u === "" ? GE : PE),
    i
  );
}
function QE(t, a) {
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
function ZE(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let m = 0; m < i.length; ++m) {
    let y = i[m], p = m === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = Sc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: p },
      b
    ), w = y.route;
    if (!v && p && s && !i[i.length - 1].route.index && (v = Sc(
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
      pathnameBase: nN(
        ea([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = ea([u, v.pathnameBase]));
  }
  return f;
}
function Sc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = JE(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: i.reduce(
      (p, { paramName: b, isOptional: v }, w) => {
        if (b === "*") {
          let j = m[w] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const S = m[w];
        return v && !S ? p[b] = void 0 : p[b] = (S || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function JE(t, a = !1, s = !0) {
  Vt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, m, y, p, b) => {
      if (i.push({ paramName: m, isOptional: y != null }), y) {
        let v = b.charAt(p + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), i];
}
function WE(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Vt(
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
function eN({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Dx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Dh = (t) => Dx.test(t);
function tN(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? da(t) : t, u;
  return s ? (s = zh(s), s.startsWith("/") ? u = xy(s.substring(1), "/") : u = xy(s, a)) : u = a, {
    pathname: u,
    search: aN(i),
    hash: rN(o)
  };
}
function xy(t, a) {
  let s = wc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function ff(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function kx(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function kh(t) {
  let a = kx(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Uc(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = da(t) : (o = { ...t }, Ze(
    !o.pathname || !o.pathname.includes("?"),
    ff("?", "pathname", "search", o)
  ), Ze(
    !o.pathname || !o.pathname.includes("#"),
    ff("#", "pathname", "hash", o)
  ), Ze(
    !o.search || !o.search.includes("#"),
    ff("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, m;
  if (f == null)
    m = s;
  else {
    let v = a.length - 1;
    if (!i && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let y = tN(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (p || b) && (y.pathname += "/"), y;
}
var zh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => zh(t.join("/")), wc = (t) => t.replace(/\/+$/, ""), nN = (t) => wc(t).replace(/^\/*/, "/"), aN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, rN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, sN = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, Bc = class {
  constructor(t, a, s, i = !1) {
    this.status = t, this.statusText = a || "", this.internal = i, s instanceof Error ? (this.data = s.toString(), this.error = s) : this.data = s;
  }
};
function ml(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((s) => s.route.path).filter(Boolean);
  return ea(a) || "/";
}
var zx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ox(t, a) {
  let s = t;
  if (typeof s != "string" || !Dx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (zx)
    try {
      let u = new URL(window.location.href), f = s.startsWith("//") ? new URL(u.protocol + s) : new URL(s), m = aa(f.pathname, a);
      f.origin === u.origin && m != null ? s = m + f.search + f.hash : o = !0;
    } catch {
      Vt(
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
function iN(t, a) {
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
        for (let m of f)
          u[m] && s[m].push(u[m]);
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
      let f = o[u], m = s[`lazy.${u}`];
      if (typeof f == "function" && m.length > 0) {
        let y = Fs(m, f, () => {
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
      let f = u[xr] ?? u, m = Fs(
        s[o],
        f,
        (...y) => Sy(y[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[xr] = f, i[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Fs(
      s.middleware,
      u,
      (...m) => Sy(m[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), i;
}
function lN(t, a) {
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
        let [f, m] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? ba(f) : ".",
          ...wy(t, m ?? {})
        };
      }
    );
    o && (o[xr] = i, t.navigate = o);
  }
  if (s.fetch.length > 0) {
    let i = t.fetch[xr] ?? t.fetch, o = Fs(s.fetch, i, (...u) => {
      let [f, , m, y] = u;
      return {
        href: m ?? ".",
        fetcherKey: f,
        ...wy(t, y ?? {})
      };
    });
    o && (o[xr] = i, t.fetch = o);
  }
  return t;
}
function Fs(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await Lx(
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
async function Lx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Lx(t, a, s, i - 1), u = await f, Ze(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    f || await m(), await f;
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
function Sy(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: oN(a),
    params: { ...i },
    unstable_pattern: o,
    context: cN(s)
  };
}
function wy(t, a) {
  return {
    currentUrl: ba(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function oN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function cN(t) {
  if (dN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var uN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function dN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === uN;
}
var $x = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], fN = new Set(
  $x
), hN = [
  "GET",
  ...$x
], mN = new Set(hN), Ux = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), pN = /* @__PURE__ */ new Set([307, 308]), hf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, gN = {
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
}, vN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Bx = "remix-router-transitions", Vx = Symbol("ResetLoaderData");
function yN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ze(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || vN, u = o;
  if (t.unstable_instrumentations) {
    let O = t.unstable_instrumentations;
    u = (G) => ({
      ...o(G),
      ...iN(
        O.map((Z) => Z.route).filter(Boolean),
        G
      )
    });
  }
  let f = {}, m = hl(
    t.routes,
    u,
    void 0,
    f
  ), y, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || jN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, C = null, T = t.hydrationData != null, M = yr(m, t.history.location, p), z = !1, R = null, I, X;
  if (M == null && !t.patchRoutesOnNavigation) {
    let O = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: G, route: Z } = Io(m);
    I = !0, X = !I, M = G, R = { [Z.id]: O };
  } else if (M && !t.hydrationData && Dn(
    M,
    m,
    t.history.location.pathname
  ).active && (M = null), M)
    if (M.some((O) => O.route.lazy))
      I = !1, X = !I;
    else if (!M.some((O) => Oh(O.route)))
      I = !0, X = !I;
    else {
      let O = t.hydrationData ? t.hydrationData.loaderData : null, G = t.hydrationData ? t.hydrationData.errors : null, Z = M;
      if (G) {
        let ge = M.findIndex(
          (ye) => G[ye.route.id] !== void 0
        );
        Z = Z.slice(0, ge + 1);
      }
      X = !1, I = !0, Z.forEach((ge) => {
        let ye = Ix(ge.route, O, G);
        X = X || ye.renderFallback, I = I && !ye.shouldLoad;
      });
    }
  else {
    I = !1, X = !I, M = [];
    let O = Dn(
      null,
      m,
      t.history.location.pathname
    );
    O.active && O.matches && (z = !0, M = O.matches);
  }
  let ie, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: M,
    initialized: I,
    renderFallback: X,
    navigation: hf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || R,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, V = "POP", D = null, H = !1, te, K = !1, le = /* @__PURE__ */ new Map(), re = null, k = !1, $ = !1, q = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), ce = 0, _ = -1, ne = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), ve, _e = null;
  function st() {
    if (w = t.history.listen(
      ({ action: O, location: G, delta: Z }) => {
        if (ve) {
          ve(), ve = void 0;
          return;
        }
        Vt(
          ue.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ge = An({
          currentLocation: A.location,
          nextLocation: G,
          historyAction: O
        });
        if (ge && Z != null) {
          let ye = new Promise((Ae) => {
            ve = Ae;
          });
          t.history.go(Z * -1), nn(ge, {
            state: "blocked",
            location: G,
            proceed() {
              nn(ge, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: G
              }), ye.then(() => t.history.go(Z));
            },
            reset() {
              let Ae = new Map(A.blockers);
              Ae.set(ge, Qi), He({ blockers: Ae });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return At(O, G);
      }
    ), s) {
      IN(a, le);
      let O = () => HN(a, le);
      a.addEventListener("pagehide", O), re = () => a.removeEventListener("pagehide", O);
    }
    return A.initialized || At("POP", A.location, {
      initialHydration: !0
    }), ie;
  }
  function Ce() {
    w && w(), re && re(), S.clear(), te && te.abort(), A.fetchers.forEach((O, G) => Ne(G)), A.blockers.forEach((O, G) => qn(G));
  }
  function Je(O) {
    return S.add(O), () => S.delete(O);
  }
  function He(O, G = {}) {
    O.matches && (O.matches = O.matches.map((ye) => {
      let Ae = f[ye.route.id], Se = ye.route;
      return Se.element !== Ae.element || Se.errorElement !== Ae.errorElement || Se.hydrateFallbackElement !== Ae.hydrateFallbackElement ? {
        ...ye,
        route: Ae
      } : ye;
    })), A = {
      ...A,
      ...O
    };
    let Z = [], ge = [];
    A.fetchers.forEach((ye, Ae) => {
      ye.state === "idle" && (W.has(Ae) ? Z.push(Ae) : ge.push(Ae));
    }), W.forEach((ye) => {
      !A.fetchers.has(ye) && !F.has(ye) && Z.push(ye);
    }), [...S].forEach(
      (ye) => ye(A, {
        deletedFetchers: Z,
        newErrors: O.errors ?? null,
        viewTransitionOpts: G.viewTransitionOpts,
        flushSync: G.flushSync === !0
      })
    ), Z.forEach((ye) => Ne(ye)), ge.forEach((ye) => A.fetchers.delete(ye));
  }
  function Ve(O, G, { flushSync: Z } = {}) {
    let ge = A.actionData != null && A.navigation.formMethod != null && gn(A.navigation.formMethod) && A.navigation.state === "loading" && O.state?._isRedirect !== !0, ye;
    G.actionData ? Object.keys(G.actionData).length > 0 ? ye = G.actionData : ye = null : ge ? ye = A.actionData : ye = null;
    let Ae = G.loaderData ? ky(
      A.loaderData,
      G.loaderData,
      G.matches || [],
      G.errors
    ) : A.loaderData, Se = A.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach(($e, Oe) => Se.set(Oe, Qi)));
    let je = k ? !1 : Zt(O, G.matches || A.matches), ke = H === !0 || A.navigation.formMethod != null && gn(A.navigation.formMethod) && O.state?._isRedirect !== !0;
    y && (m = y, y = void 0), k || V === "POP" || (V === "PUSH" ? t.history.push(O, O.state) : V === "REPLACE" && t.history.replace(O, O.state));
    let Te;
    if (V === "POP") {
      let $e = le.get(A.location.pathname);
      $e && $e.has(O.pathname) ? Te = {
        currentLocation: A.location,
        nextLocation: O
      } : le.has(O.pathname) && (Te = {
        currentLocation: O,
        nextLocation: A.location
      });
    } else if (K) {
      let $e = le.get(A.location.pathname);
      $e ? $e.add(O.pathname) : ($e = /* @__PURE__ */ new Set([O.pathname]), le.set(A.location.pathname, $e)), Te = {
        currentLocation: A.location,
        nextLocation: O
      };
    }
    He(
      {
        ...G,
        // matches, errors, fetchers go through as-is
        actionData: ye,
        loaderData: Ae,
        historyAction: V,
        location: O,
        initialized: !0,
        renderFallback: !1,
        navigation: hf,
        revalidation: "idle",
        restoreScrollPosition: je,
        preventScrollReset: ke,
        blockers: Se
      },
      {
        viewTransitionOpts: Te,
        flushSync: Z === !0
      }
    ), V = "POP", H = !1, K = !1, k = !1, $ = !1, D?.resolve(), D = null, _e?.resolve(), _e = null;
  }
  async function It(O, G) {
    if (D?.resolve(), D = null, typeof O == "number") {
      D || (D = $y());
      let xt = D.promise;
      return t.history.go(O), xt;
    }
    let Z = eh(
      A.location,
      A.matches,
      p,
      O,
      G?.fromRouteId,
      G?.relative
    ), { path: ge, submission: ye, error: Ae } = jy(
      !1,
      Z,
      G
    ), Se;
    G?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof G.unstable_mask == "string" ? da(G.unstable_mask) : {
        ...A.location.unstable_mask,
        ...G.unstable_mask
      }
    });
    let je = A.location, ke = Wf(
      je,
      ge,
      G && G.state,
      void 0,
      Se
    );
    ke = {
      ...ke,
      ...t.history.encodeLocation(ke)
    };
    let Te = G && G.replace != null ? G.replace : void 0, $e = "PUSH";
    Te === !0 ? $e = "REPLACE" : Te === !1 || ye != null && gn(ye.formMethod) && ye.formAction === A.location.pathname + A.location.search && ($e = "REPLACE");
    let Oe = G && "preventScrollReset" in G ? G.preventScrollReset === !0 : void 0, it = (G && G.flushSync) === !0, Xe = An({
      currentLocation: je,
      nextLocation: ke,
      historyAction: $e
    });
    if (Xe) {
      nn(Xe, {
        state: "blocked",
        location: ke,
        proceed() {
          nn(Xe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ke
          }), It(O, G);
        },
        reset() {
          let xt = new Map(A.blockers);
          xt.set(Xe, Qi), He({ blockers: xt });
        }
      });
      return;
    }
    await At($e, ke, {
      submission: ye,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ae,
      preventScrollReset: Oe,
      replace: G && G.replace,
      enableViewTransition: G && G.viewTransition,
      flushSync: it,
      callSiteDefaultShouldRevalidate: G && G.unstable_defaultShouldRevalidate
    });
  }
  function jt() {
    _e || (_e = $y()), be(), He({ revalidation: "loading" });
    let O = _e.promise;
    return A.navigation.state === "submitting" ? O : A.navigation.state === "idle" ? (At(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), O) : (At(
      V || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: K === !0
      }
    ), O);
  }
  async function At(O, G, Z) {
    te && te.abort(), te = null, V = O, k = (Z && Z.startUninterruptedRevalidation) === !0, zt(A.location, A.matches), H = (Z && Z.preventScrollReset) === !0, K = (Z && Z.enableViewTransition) === !0;
    let ge = y || m, ye = Z && Z.overrideNavigation, Ae = Z?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : yr(ge, G, p), Se = (Z && Z.flushSync) === !0;
    if (Ae && A.initialized && !$ && AN(A.location, G) && !(Z && Z.submission && gn(Z.submission.formMethod))) {
      Ve(G, { matches: Ae }, { flushSync: Se });
      return;
    }
    let je = Dn(Ae, ge, G.pathname);
    if (je.active && je.matches && (Ae = je.matches), !Ae) {
      let { error: gt, notFoundMatches: _t, route: We } = fn(
        G.pathname
      );
      Ve(
        G,
        {
          matches: _t,
          loaderData: {},
          errors: {
            [We.id]: gt
          }
        },
        { flushSync: Se }
      );
      return;
    }
    te = new AbortController();
    let ke = Is(
      t.history,
      G,
      te.signal,
      Z && Z.submission
    ), Te = t.getContext ? await t.getContext() : new vy(), $e;
    if (Z && Z.pendingError)
      $e = [
        br(Ae).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && gn(Z.submission.formMethod)) {
      let gt = await Mn(
        ke,
        G,
        Z.submission,
        Ae,
        Te,
        je.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Se }
      );
      if (gt.shortCircuited)
        return;
      if (gt.pendingActionResult) {
        let [_t, We] = gt.pendingActionResult;
        if (Vn(We) && ml(We.error) && We.error.status === 404) {
          te = null, Ve(G, {
            matches: gt.matches,
            loaderData: {},
            errors: {
              [_t]: We.error
            }
          });
          return;
        }
      }
      Ae = gt.matches || Ae, $e = gt.pendingActionResult, ye = mf(G, Z.submission), Se = !1, je.active = !1, ke = Is(
        t.history,
        ke.url,
        ke.signal
      );
    }
    let {
      shortCircuited: Oe,
      matches: it,
      loaderData: Xe,
      errors: xt
    } = await dt(
      ke,
      G,
      Ae,
      Te,
      je.active,
      ye,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Se,
      $e,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    Oe || (te = null, Ve(G, {
      matches: it || Ae,
      ...zy($e),
      loaderData: Xe,
      errors: xt
    }));
  }
  async function Mn(O, G, Z, ge, ye, Ae, Se, je = {}) {
    be();
    let ke = BN(G, Z);
    if (He({ navigation: ke }, { flushSync: je.flushSync === !0 }), Ae) {
      let Oe = await pt(
        ge,
        G.pathname,
        O.signal
      );
      if (Oe.type === "aborted")
        return { shortCircuited: !0 };
      if (Oe.type === "error") {
        if (Oe.partialMatches.length === 0) {
          let { matches: Xe, route: xt } = Io(m);
          return {
            matches: Xe,
            pendingActionResult: [
              xt.id,
              {
                type: "error",
                error: Oe.error
              }
            ]
          };
        }
        let it = br(Oe.partialMatches).route.id;
        return {
          matches: Oe.partialMatches,
          pendingActionResult: [
            it,
            {
              type: "error",
              error: Oe.error
            }
          ]
        };
      } else if (Oe.matches)
        ge = Oe.matches;
      else {
        let { notFoundMatches: it, error: Xe, route: xt } = fn(
          G.pathname
        );
        return {
          matches: it,
          pendingActionResult: [
            xt.id,
            {
              type: "error",
              error: Xe
            }
          ]
        };
      }
    }
    let Te, $e = dc(ge, G);
    if (!$e.route.action && !$e.route.lazy)
      Te = {
        type: "error",
        error: Wn(405, {
          method: O.method,
          pathname: G.pathname,
          routeId: $e.route.id
        })
      };
    else {
      let Oe = Ps(
        u,
        f,
        O,
        G,
        ge,
        $e,
        Se ? [] : i,
        ye
      ), it = await Q(
        O,
        G,
        Oe,
        ye,
        null
      );
      if (Te = it[$e.route.id], !Te) {
        for (let Xe of ge)
          if (it[Xe.route.id]) {
            Te = it[Xe.route.id];
            break;
          }
      }
      if (O.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(Te)) {
      let Oe;
      return je && je.replace != null ? Oe = je.replace : Oe = My(
        Te.response.headers.get("Location"),
        new URL(O.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await we(O, Te, !0, {
        submission: Z,
        replace: Oe
      }), { shortCircuited: !0 };
    }
    if (Vn(Te)) {
      let Oe = br(ge, $e.route.id);
      return (je && je.replace) !== !0 && (V = "PUSH"), {
        matches: ge,
        pendingActionResult: [
          Oe.route.id,
          Te,
          $e.route.id
        ]
      };
    }
    return {
      matches: ge,
      pendingActionResult: [$e.route.id, Te]
    };
  }
  async function dt(O, G, Z, ge, ye, Ae, Se, je, ke, Te, $e, Oe, it) {
    let Xe = Ae || mf(G, Se), xt = Se || je || Ly(Xe), gt = !k && !Te;
    if (ye) {
      if (gt) {
        let $t = Qt(Oe);
        He(
          {
            navigation: Xe,
            ...$t !== void 0 ? { actionData: $t } : {}
          },
          {
            flushSync: $e
          }
        );
      }
      let Qe = await pt(
        Z,
        G.pathname,
        O.signal
      );
      if (Qe.type === "aborted")
        return { shortCircuited: !0 };
      if (Qe.type === "error") {
        if (Qe.partialMatches.length === 0) {
          let { matches: mn, route: qt } = Io(m);
          return {
            matches: mn,
            loaderData: {},
            errors: {
              [qt.id]: Qe.error
            }
          };
        }
        let $t = br(Qe.partialMatches).route.id;
        return {
          matches: Qe.partialMatches,
          loaderData: {},
          errors: {
            [$t]: Qe.error
          }
        };
      } else if (Qe.matches)
        Z = Qe.matches;
      else {
        let { error: $t, notFoundMatches: mn, route: qt } = fn(
          G.pathname
        );
        return {
          matches: mn,
          loaderData: {},
          errors: {
            [qt.id]: $t
          }
        };
      }
    }
    let _t = y || m, { dsMatches: We, revalidatingFetchers: Ht } = Ey(
      O,
      ge,
      u,
      f,
      t.history,
      A,
      Z,
      xt,
      G,
      Te ? [] : i,
      Te === !0,
      $,
      q,
      W,
      Y,
      J,
      _t,
      p,
      t.patchRoutesOnNavigation != null,
      Oe,
      it
    );
    if (_ = ++ce, !t.dataStrategy && !We.some((Qe) => Qe.shouldLoad) && !We.some(
      (Qe) => Qe.route.middleware && Qe.route.middleware.length > 0
    ) && Ht.length === 0) {
      let Qe = dn();
      return Ve(
        G,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Oe && Vn(Oe[1]) ? { [Oe[0]]: Oe[1].error } : null,
          ...zy(Oe),
          ...Qe ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: $e }
      ), { shortCircuited: !0 };
    }
    if (gt) {
      let Qe = {};
      if (!ye) {
        Qe.navigation = Xe;
        let $t = Qt(Oe);
        $t !== void 0 && (Qe.actionData = $t);
      }
      Ht.length > 0 && (Qe.fetchers = un(Ht)), He(Qe, { flushSync: $e });
    }
    Ht.forEach((Qe) => {
      ft(Qe.key), Qe.controller && F.set(Qe.key, Qe.controller);
    });
    let Et = () => Ht.forEach((Qe) => ft(Qe.key));
    te && te.signal.addEventListener(
      "abort",
      Et
    );
    let { loaderResults: Fa, fetcherResults: sa } = await me(
      We,
      Ht,
      O,
      G,
      ge
    );
    if (O.signal.aborted)
      return { shortCircuited: !0 };
    te && te.signal.removeEventListener(
      "abort",
      Et
    ), Ht.forEach((Qe) => F.delete(Qe.key));
    let Wt = Ho(Fa);
    if (Wt)
      return await we(O, Wt.result, !0, {
        replace: ke
      }), { shortCircuited: !0 };
    if (Wt = Ho(sa), Wt)
      return J.add(Wt.key), await we(O, Wt.result, !0, {
        replace: ke
      }), { shortCircuited: !0 };
    let { loaderData: fa, errors: Cr } = Dy(
      A,
      Z,
      Fa,
      Oe,
      Ht,
      sa
    );
    Te && A.errors && (Cr = { ...A.errors, ...Cr });
    let ha = dn(), Tr = Hn(_), ts = ha || Tr || Ht.length > 0;
    return {
      matches: Z,
      loaderData: fa,
      errors: Cr,
      ...ts ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function Qt(O) {
    if (O && !Vn(O[1]))
      return {
        [O[0]]: O[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function un(O) {
    return O.forEach((G) => {
      let Z = A.fetchers.get(G.key), ge = Zi(
        void 0,
        Z ? Z.data : void 0
      );
      A.fetchers.set(G.key, ge);
    }), new Map(A.fetchers);
  }
  async function Dt(O, G, Z, ge) {
    ft(O);
    let ye = (ge && ge.flushSync) === !0, Ae = y || m, Se = eh(
      A.location,
      A.matches,
      p,
      Z,
      G,
      ge?.relative
    ), je = yr(Ae, Se, p), ke = Dn(je, Ae, Se);
    if (ke.active && ke.matches && (je = ke.matches), !je) {
      Ge(
        O,
        G,
        Wn(404, { pathname: Se }),
        { flushSync: ye }
      );
      return;
    }
    let { path: Te, submission: $e, error: Oe } = jy(
      !0,
      Se,
      ge
    );
    if (Oe) {
      Ge(O, G, Oe, { flushSync: ye });
      return;
    }
    let it = t.getContext ? await t.getContext() : new vy(), Xe = (ge && ge.preventScrollReset) === !0;
    if ($e && gn($e.formMethod)) {
      await tn(
        O,
        G,
        Te,
        je,
        it,
        ke.active,
        ye,
        Xe,
        $e,
        ge && ge.unstable_defaultShouldRevalidate
      );
      return;
    }
    Y.set(O, { routeId: G, path: Te }), await Rt(
      O,
      G,
      Te,
      je,
      it,
      ke.active,
      ye,
      Xe,
      $e
    );
  }
  async function tn(O, G, Z, ge, ye, Ae, Se, je, ke, Te) {
    be(), Y.delete(O);
    let $e = A.fetchers.get(O);
    Ie(O, VN(ke, $e), {
      flushSync: Se
    });
    let Oe = new AbortController(), it = Is(
      t.history,
      Z,
      Oe.signal,
      ke
    );
    if (Ae) {
      let Nt = await pt(
        ge,
        new URL(it.url).pathname,
        it.signal,
        O
      );
      if (Nt.type === "aborted")
        return;
      if (Nt.type === "error") {
        Ge(O, G, Nt.error, { flushSync: Se });
        return;
      } else if (Nt.matches)
        ge = Nt.matches;
      else {
        Ge(
          O,
          G,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let Xe = dc(ge, Z);
    if (!Xe.route.action && !Xe.route.lazy) {
      let Nt = Wn(405, {
        method: ke.formMethod,
        pathname: Z,
        routeId: G
      });
      Ge(O, G, Nt, { flushSync: Se });
      return;
    }
    F.set(O, Oe);
    let xt = ce, gt = Ps(
      u,
      f,
      it,
      Z,
      ge,
      Xe,
      i,
      ye
    ), _t = await Q(
      it,
      Z,
      gt,
      ye,
      O
    ), We = _t[Xe.route.id];
    if (!We) {
      for (let Nt of gt)
        if (_t[Nt.route.id]) {
          We = _t[Nt.route.id];
          break;
        }
    }
    if (it.signal.aborted) {
      F.get(O) === Oe && F.delete(O);
      return;
    }
    if (W.has(O)) {
      if (Gr(We) || Vn(We)) {
        Ie(O, Ba(void 0));
        return;
      }
    } else {
      if (Gr(We))
        if (F.delete(O), _ > xt) {
          Ie(O, Ba(void 0));
          return;
        } else
          return J.add(O), Ie(O, Zi(ke)), we(it, We, !1, {
            fetcherSubmission: ke,
            preventScrollReset: je
          });
      if (Vn(We)) {
        Ge(O, G, We.error);
        return;
      }
    }
    let Ht = A.navigation.location || A.location, Et = Is(
      t.history,
      Ht,
      Oe.signal
    ), Fa = y || m, sa = A.navigation.state !== "idle" ? yr(Fa, A.navigation.location, p) : A.matches;
    Ze(sa, "Didn't find any matches after fetcher action");
    let Wt = ++ce;
    ne.set(O, Wt);
    let fa = Zi(ke, We.data);
    A.fetchers.set(O, fa);
    let { dsMatches: Cr, revalidatingFetchers: ha } = Ey(
      Et,
      ye,
      u,
      f,
      t.history,
      A,
      sa,
      ke,
      Ht,
      i,
      !1,
      $,
      q,
      W,
      Y,
      J,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [Xe.route.id, We],
      Te
    );
    ha.filter((Nt) => Nt.key !== O).forEach((Nt) => {
      let ns = Nt.key, as = A.fetchers.get(ns), _l = Zi(
        void 0,
        as ? as.data : void 0
      );
      A.fetchers.set(ns, _l), ft(ns), Nt.controller && F.set(ns, Nt.controller);
    }), He({ fetchers: new Map(A.fetchers) });
    let Tr = () => ha.forEach((Nt) => ft(Nt.key));
    Oe.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ts, fetcherResults: Qe } = await me(
      Cr,
      ha,
      Et,
      Ht,
      ye
    );
    if (Oe.signal.aborted)
      return;
    if (Oe.signal.removeEventListener(
      "abort",
      Tr
    ), ne.delete(O), F.delete(O), ha.forEach((Nt) => F.delete(Nt.key)), A.fetchers.has(O)) {
      let Nt = Ba(We.data);
      A.fetchers.set(O, Nt);
    }
    let $t = Ho(ts);
    if ($t)
      return we(
        Et,
        $t.result,
        !1,
        { preventScrollReset: je }
      );
    if ($t = Ho(Qe), $t)
      return J.add($t.key), we(
        Et,
        $t.result,
        !1,
        { preventScrollReset: je }
      );
    let { loaderData: mn, errors: qt } = Dy(
      A,
      sa,
      ts,
      void 0,
      ha,
      Qe
    );
    Hn(Wt), A.navigation.state === "loading" && Wt > _ ? (Ze(V, "Expected pending action"), te && te.abort(), Ve(A.navigation.location, {
      matches: sa,
      loaderData: mn,
      errors: qt,
      fetchers: new Map(A.fetchers)
    })) : (He({
      errors: qt,
      loaderData: ky(
        A.loaderData,
        mn,
        sa,
        qt
      ),
      fetchers: new Map(A.fetchers)
    }), $ = !1);
  }
  async function Rt(O, G, Z, ge, ye, Ae, Se, je, ke) {
    let Te = A.fetchers.get(O);
    Ie(
      O,
      Zi(
        ke,
        Te ? Te.data : void 0
      ),
      { flushSync: Se }
    );
    let $e = new AbortController(), Oe = Is(
      t.history,
      Z,
      $e.signal
    );
    if (Ae) {
      let We = await pt(
        ge,
        new URL(Oe.url).pathname,
        Oe.signal,
        O
      );
      if (We.type === "aborted")
        return;
      if (We.type === "error") {
        Ge(O, G, We.error, { flushSync: Se });
        return;
      } else if (We.matches)
        ge = We.matches;
      else {
        Ge(
          O,
          G,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let it = dc(ge, Z);
    F.set(O, $e);
    let Xe = ce, xt = Ps(
      u,
      f,
      Oe,
      Z,
      ge,
      it,
      i,
      ye
    ), gt = await Q(
      Oe,
      Z,
      xt,
      ye,
      O
    ), _t = gt[it.route.id];
    if (!_t) {
      for (let We of ge)
        if (gt[We.route.id]) {
          _t = gt[We.route.id];
          break;
        }
    }
    if (F.get(O) === $e && F.delete(O), !Oe.signal.aborted) {
      if (W.has(O)) {
        Ie(O, Ba(void 0));
        return;
      }
      if (Gr(_t))
        if (_ > Xe) {
          Ie(O, Ba(void 0));
          return;
        } else {
          J.add(O), await we(Oe, _t, !1, {
            preventScrollReset: je
          });
          return;
        }
      if (Vn(_t)) {
        Ge(O, G, _t.error);
        return;
      }
      Ie(O, Ba(_t.data));
    }
  }
  async function we(O, G, Z, {
    submission: ge,
    fetcherSubmission: ye,
    preventScrollReset: Ae,
    replace: Se
  } = {}) {
    Z || (D?.resolve(), D = null), G.response.headers.has("X-Remix-Revalidate") && ($ = !0);
    let je = G.response.headers.get("Location");
    Ze(je, "Expected a Location header on the redirect Response"), je = My(
      je,
      new URL(O.url),
      p,
      t.history
    );
    let ke = Wf(A.location, je, {
      _isRedirect: !0
    });
    if (s) {
      let xt = !1;
      if (G.response.headers.has("X-Remix-Reload-Document"))
        xt = !0;
      else if (Dh(je)) {
        const gt = OE(je, !0);
        xt = // Hard reload if it's an absolute URL to a new origin
        gt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(gt.pathname, p) == null;
      }
      if (xt) {
        Se ? a.location.replace(je) : a.location.assign(je);
        return;
      }
    }
    te = null;
    let Te = Se === !0 || G.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: $e, formAction: Oe, formEncType: it } = A.navigation;
    !ge && !ye && $e && Oe && it && (ge = Ly(A.navigation));
    let Xe = ge || ye;
    if (pN.has(G.response.status) && Xe && gn(Xe.formMethod))
      await At(Te, ke, {
        submission: {
          ...Xe,
          formAction: je
        },
        // Preserve these flags across redirects
        preventScrollReset: Ae || H,
        enableViewTransition: Z ? K : void 0
      });
    else {
      let xt = mf(
        ke,
        ge
      );
      await At(Te, ke, {
        overrideNavigation: xt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ye,
        // Preserve these flags across redirects
        preventScrollReset: Ae || H,
        enableViewTransition: Z ? K : void 0
      });
    }
  }
  async function Q(O, G, Z, ge, ye) {
    let Ae, Se = {};
    try {
      Ae = await NN(
        b,
        O,
        G,
        Z,
        ye,
        ge,
        !1
      );
    } catch (je) {
      return Z.filter((ke) => ke.shouldLoad).forEach((ke) => {
        Se[ke.route.id] = {
          type: "error",
          error: je
        };
      }), Se;
    }
    if (O.signal.aborted)
      return Se;
    if (!gn(O.method))
      for (let je of Z) {
        if (Ae[je.route.id]?.type === "error")
          break;
        !Ae.hasOwnProperty(je.route.id) && !A.loaderData.hasOwnProperty(je.route.id) && (!A.errors || !A.errors.hasOwnProperty(je.route.id)) && je.shouldCallHandler() && (Ae[je.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${je.route.id}`
          )
        });
      }
    for (let [je, ke] of Object.entries(Ae))
      if (ON(ke)) {
        let Te = ke.result;
        Se[je] = {
          type: "redirect",
          response: _N(
            Te,
            O,
            je,
            Z,
            p
          )
        };
      } else
        Se[je] = await RN(ke);
    return Se;
  }
  async function me(O, G, Z, ge, ye) {
    let Ae = Q(
      Z,
      ge,
      O,
      ye,
      null
    ), Se = Promise.all(
      G.map(async (Te) => {
        if (Te.matches && Te.match && Te.request && Te.controller) {
          let Oe = (await Q(
            Te.request,
            Te.path,
            Te.matches,
            ye,
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
    ), je = await Ae, ke = (await Se).reduce(
      (Te, $e) => Object.assign(Te, $e),
      {}
    );
    return {
      loaderResults: je,
      fetcherResults: ke
    };
  }
  function be() {
    $ = !0, Y.forEach((O, G) => {
      F.has(G) && q.add(G), ft(G);
    });
  }
  function Ie(O, G, Z = {}) {
    A.fetchers.set(O, G), He(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function Ge(O, G, Z, ge = {}) {
    let ye = br(A.matches, G);
    Ne(O), He(
      {
        errors: {
          [ye.route.id]: Z
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ge && ge.flushSync) === !0 }
    );
  }
  function pe(O) {
    return U.set(O, (U.get(O) || 0) + 1), W.has(O) && W.delete(O), A.fetchers.get(O) || gN;
  }
  function Ee(O, G) {
    ft(O, G?.reason), Ie(O, Ba(null));
  }
  function Ne(O) {
    let G = A.fetchers.get(O);
    F.has(O) && !(G && G.state === "loading" && ne.has(O)) && ft(O), Y.delete(O), ne.delete(O), J.delete(O), W.delete(O), q.delete(O), A.fetchers.delete(O);
  }
  function Re(O) {
    let G = (U.get(O) || 0) - 1;
    G <= 0 ? (U.delete(O), W.add(O)) : U.set(O, G), He({ fetchers: new Map(A.fetchers) });
  }
  function ft(O, G) {
    let Z = F.get(O);
    Z && (Z.abort(G), F.delete(O));
  }
  function qe(O) {
    for (let G of O) {
      let Z = pe(G), ge = Ba(Z.data);
      A.fetchers.set(G, ge);
    }
  }
  function dn() {
    let O = [], G = !1;
    for (let Z of J) {
      let ge = A.fetchers.get(Z);
      Ze(ge, `Expected fetcher: ${Z}`), ge.state === "loading" && (J.delete(Z), O.push(Z), G = !0);
    }
    return qe(O), G;
  }
  function Hn(O) {
    let G = [];
    for (let [Z, ge] of ne)
      if (ge < O) {
        let ye = A.fetchers.get(Z);
        Ze(ye, `Expected fetcher: ${Z}`), ye.state === "loading" && (ft(Z), ne.delete(Z), G.push(Z));
      }
    return qe(G), G.length > 0;
  }
  function yn(O, G) {
    let Z = A.blockers.get(O) || Qi;
    return ue.get(O) !== G && ue.set(O, G), Z;
  }
  function qn(O) {
    A.blockers.delete(O), ue.delete(O);
  }
  function nn(O, G) {
    let Z = A.blockers.get(O) || Qi;
    Ze(
      Z.state === "unblocked" && G.state === "blocked" || Z.state === "blocked" && G.state === "blocked" || Z.state === "blocked" && G.state === "proceeding" || Z.state === "blocked" && G.state === "unblocked" || Z.state === "proceeding" && G.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${G.state}`
    );
    let ge = new Map(A.blockers);
    ge.set(O, G), He({ blockers: ge });
  }
  function An({
    currentLocation: O,
    nextLocation: G,
    historyAction: Z
  }) {
    if (ue.size === 0)
      return;
    ue.size > 1 && Vt(!1, "A router only supports one blocker at a time");
    let ge = Array.from(ue.entries()), [ye, Ae] = ge[ge.length - 1], Se = A.blockers.get(ye);
    if (!(Se && Se.state === "proceeding") && Ae({ currentLocation: O, nextLocation: G, historyAction: Z }))
      return ye;
  }
  function fn(O) {
    let G = Wn(404, { pathname: O }), Z = y || m, { matches: ge, route: ye } = Io(Z);
    return { notFoundMatches: ge, route: ye, error: G };
  }
  function Ue(O, G, Z) {
    if (j = O, C = G, N = Z || null, !T && A.navigation === hf) {
      T = !0;
      let ge = Zt(A.location, A.matches);
      ge != null && He({ restoreScrollPosition: ge });
    }
    return () => {
      j = null, C = null, N = null;
    };
  }
  function ct(O, G) {
    return N && N(
      O,
      G.map((ge) => IE(ge, A.loaderData))
    ) || O.key;
  }
  function zt(O, G) {
    if (j && C) {
      let Z = ct(O, G);
      j[Z] = C();
    }
  }
  function Zt(O, G) {
    if (j) {
      let Z = ct(O, G), ge = j[Z];
      if (typeof ge == "number")
        return ge;
    }
    return null;
  }
  function Dn(O, G, Z) {
    if (t.patchRoutesOnNavigation)
      if (O) {
        if (Object.keys(O[0].params).length > 0)
          return { active: !0, matches: ll(
            G,
            Z,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          G,
          Z,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function pt(O, G, Z, ge) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: O };
    let ye = O;
    for (; ; ) {
      let Ae = y == null, Se = y || m, je = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: G,
          matches: ye,
          fetcherKey: ge,
          patch: ($e, Oe) => {
            Z.aborted || Ny(
              $e,
              Oe,
              Se,
              je,
              u,
              !1
            );
          }
        });
      } catch ($e) {
        return { type: "error", error: $e, partialMatches: ye };
      } finally {
        Ae && !Z.aborted && (m = [...m]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let ke = yr(Se, G, p), Te = null;
      if (ke) {
        if (Object.keys(ke[0].params).length === 0)
          return { type: "success", matches: ke };
        if (Te = ll(
          Se,
          G,
          p,
          !0
        ), !(Te && ye.length < Te.length && an(
          ye,
          Te.slice(0, ye.length)
        )))
          return { type: "success", matches: ke };
      }
      if (Te || (Te = ll(
        Se,
        G,
        p,
        !0
      )), !Te || an(ye, Te))
        return { type: "success", matches: null };
      ye = Te;
    }
  }
  function an(O, G) {
    return O.length === G.length && O.every((Z, ge) => Z.route.id === G[ge].route.id);
  }
  function Sa(O) {
    f = {}, y = hl(
      O,
      u,
      void 0,
      f
    );
  }
  function hn(O, G, Z = !1) {
    let ge = y == null;
    Ny(
      O,
      G,
      y || m,
      f,
      u,
      Z
    ), ge && (m = [...m], He({}));
  }
  return ie = {
    get basename() {
      return p;
    },
    get future() {
      return v;
    },
    get state() {
      return A;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: st,
    subscribe: Je,
    enableScrollRestoration: Ue,
    navigate: It,
    fetch: Dt,
    revalidate: jt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (O) => t.history.createHref(O),
    encodeLocation: (O) => t.history.encodeLocation(O),
    getFetcher: pe,
    resetFetcher: Ee,
    deleteFetcher: Re,
    dispose: Ce,
    getBlocker: yn,
    deleteBlocker: qn,
    patchRoutes: hn,
    _internalFetchControllers: F,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: Sa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(O) {
      He(O);
    }
  }, t.unstable_instrumentations && (ie = lN(
    ie,
    t.unstable_instrumentations.map((O) => O.router).filter(Boolean)
  )), ie;
}
function bN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function eh(t, a, s, i, o, u) {
  let f, m;
  if (o) {
    f = [];
    for (let p of a)
      if (f.push(p), p.route.id === o) {
        m = p;
        break;
      }
  } else
    f = a, m = a[a.length - 1];
  let y = Uc(
    i || ".",
    kh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && m) {
    let p = $h(y.search);
    if (m.route.index && !p)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(y.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      y.search = w ? `?${w}` : "";
    }
  }
  return s !== "/" && (y.pathname = eN({ basename: s, pathname: y.pathname })), ba(y);
}
function jy(t, a, s) {
  if (!s || !bN(s))
    return { path: a };
  if (s.formMethod && !UN(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = Kx(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!gn(u))
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
      if (!gn(u))
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
  Ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, y;
  if (s.formData)
    m = nh(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    m = nh(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    m = s.body, y = Ay(m);
  else if (s.body == null)
    m = new URLSearchParams(), y = new FormData();
  else
    try {
      m = new URLSearchParams(s.body), y = Ay(m);
    } catch {
      return i();
    }
  let p = {
    formMethod: u,
    formAction: f,
    formEncType: s && s.formEncType || "application/x-www-form-urlencoded",
    formData: y,
    json: void 0,
    text: void 0
  };
  if (gn(p.formMethod))
    return { path: a, submission: p };
  let b = da(a);
  return t && b.search && $h(b.search) && m.append("index", ""), b.search = `?${m}`, { path: ba(b), submission: p };
}
function Ey(t, a, s, i, o, u, f, m, y, p, b, v, w, S, j, N, C, T, M, z, R) {
  let I = z ? Vn(z[1]) ? z[1].error : z[1].data : void 0, X = o.createURL(u.location), ie = o.createURL(y), A;
  if (b && u.errors) {
    let re = Object.keys(u.errors)[0];
    A = f.findIndex((k) => k.route.id === re);
  } else if (z && Vn(z[1])) {
    let re = z[0];
    A = f.findIndex((k) => k.route.id === re) - 1;
  }
  let V = z ? z[1].statusCode : void 0, D = V && V >= 400, H = {
    currentUrl: X,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ie,
    nextParams: f[0].params,
    ...m,
    actionResult: I,
    actionStatus: V
  }, te = xl(f), K = f.map((re, k) => {
    let { route: $ } = re, q = null;
    if (A != null && k > A)
      q = !1;
    else if ($.lazy)
      q = !0;
    else if (!Oh($))
      q = !1;
    else if (b) {
      let { shouldLoad: ne } = Ix(
        $,
        u.loaderData,
        u.errors
      );
      q = ne;
    } else xN(u.loaderData, u.matches[k], re) && (q = !0);
    if (q !== null)
      return th(
        s,
        i,
        t,
        y,
        te,
        re,
        p,
        a,
        q
      );
    let F = !1;
    typeof R == "boolean" ? F = R : D ? F = !1 : (v || X.pathname + X.search === ie.pathname + ie.search || X.search !== ie.search || SN(u.matches[k], re)) && (F = !0);
    let ce = {
      ...H,
      defaultShouldRevalidate: F
    }, _ = cl(re, ce);
    return th(
      s,
      i,
      t,
      y,
      te,
      re,
      p,
      a,
      _,
      ce,
      R
    );
  }), le = [];
  return j.forEach((re, k) => {
    if (b || !f.some((Y) => Y.route.id === re.routeId) || S.has(k))
      return;
    let $ = u.fetchers.get(k), q = $ && $.state !== "idle" && $.data === void 0, F = yr(C, re.path, T);
    if (!F) {
      if (M && q)
        return;
      le.push({
        key: k,
        routeId: re.routeId,
        path: re.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(k))
      return;
    let ce = dc(F, re.path), _ = new AbortController(), ne = Is(
      o,
      re.path,
      _.signal
    ), J = null;
    if (w.has(k))
      w.delete(k), J = Ps(
        s,
        i,
        ne,
        re.path,
        F,
        ce,
        p,
        a
      );
    else if (q)
      v && (J = Ps(
        s,
        i,
        ne,
        re.path,
        F,
        ce,
        p,
        a
      ));
    else {
      let Y;
      typeof R == "boolean" ? Y = R : D ? Y = !1 : Y = v;
      let U = {
        ...H,
        defaultShouldRevalidate: Y
      };
      cl(ce, U) && (J = Ps(
        s,
        i,
        ne,
        re.path,
        F,
        ce,
        p,
        a,
        U
      ));
    }
    J && le.push({
      key: k,
      routeId: re.routeId,
      path: re.path,
      matches: J,
      match: ce,
      request: ne,
      controller: _
    });
  }), { dsMatches: K, revalidatingFetchers: le };
}
function Oh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Ix(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Oh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function xN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function SN(t, a) {
  let s = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s != null && s.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function cl(t, a) {
  if (t.route.shouldRevalidate) {
    let s = t.route.shouldRevalidate(a);
    if (typeof s == "boolean")
      return s;
  }
  return a.defaultShouldRevalidate;
}
function Ny(t, a, s, i, o, u) {
  let f;
  if (t) {
    let p = i[t];
    Ze(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), f = p.children;
  } else
    f = s;
  let m = [], y = [];
  if (a.forEach((p) => {
    let b = f.find(
      (v) => Hx(p, v)
    );
    b ? y.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hl(
      m,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      i
    );
    f.push(...p);
  }
  if (u && y.length > 0)
    for (let p = 0; p < y.length; p++) {
      let { existingRoute: b, newRoute: v } = y[p], w = b, [S] = hl(
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
function Hx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => Hx(s, o))
  ) ?? !1 : !1;
}
var Cy = /* @__PURE__ */ new WeakMap(), qx = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (Ze(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = Cy.get(o);
  f || (f = {}, Cy.set(o, f));
  let m = f[t];
  if (m)
    return m;
  let y = (async () => {
    let p = $E(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      Vt(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      Vt(
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
}, Ty = /* @__PURE__ */ new WeakMap();
function wN(t, a, s, i, o) {
  let u = s[t.id];
  if (Ze(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = Ty.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Ze(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let C = BE(j), M = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        C ? Vt(
          !C,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : M ? Vt(
          !M,
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
    return Ty.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), m = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = qx({
      key: b,
      route: t,
      manifest: s,
      mapRouteProperties: i
    });
    v && (m.push(v), b === a && (y = v));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), y?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: y
  };
}
async function Ry(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function jN(t) {
  return t.matches.some((a) => a.route.middleware) ? Fx(t, () => Ry(t)) : Ry(t);
}
function Fx(t, a) {
  return EN(
    t,
    a,
    (i) => {
      if ($N(i))
        throw i;
      return i;
    },
    kN,
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
      let { matches: f } = t, m = Math.min(
        // Throwing route
        Math.max(
          f.findIndex((p) => p.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          f.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), y = br(
        f,
        f[m].route.id
      ).route.id;
      return Promise.resolve({
        [y]: { type: "error", result: i }
      });
    }
  }
}
async function EN(t, a, s, i, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await Yx(
    f,
    m,
    a,
    s,
    i,
    o
  );
}
async function Yx(t, a, s, i, o, u, f = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [p, b] = y, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await Yx(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await u(S, p, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? i(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await u(S, p, v);
  }
}
function Gx(t, a, s, i, o) {
  let u = qx({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = wN(
    i.route,
    gn(s.method) ? "action" : "loader",
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
function th(t, a, s, i, o, u, f, m, y, p = null, b) {
  let v = !1, w = Gx(
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
    shouldRevalidateArgs: p,
    shouldCallHandler(S) {
      return v = !0, p ? typeof b == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: S
      }) : cl(u, p) : y;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: C } = u.route, T = v || y || S && !gn(s.method) && (j || N), M = C && C.length > 0 && !N && !j;
      return T && (gn(s.method) || !M) ? CN({
        request: s,
        path: i,
        unstable_pattern: o,
        match: u,
        lazyHandlerPromise: w?.handler,
        lazyRoutePromise: w?.route,
        handlerOverride: S,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Ps(t, a, s, i, o, u, f, m, y = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: y,
    shouldCallHandler: () => !1,
    _lazyPromises: Gx(
      t,
      a,
      s,
      p,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : th(
    t,
    a,
    s,
    i,
    xl(o),
    p,
    f,
    m,
    !0,
    y
  ));
}
async function NN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Px(a, s),
    unstable_pattern: xl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return Fx(v, () => b({
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
  return p;
}
async function CN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: m
}) {
  let y, p, b = gn(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((M, z) => j = z);
    p = () => j(), t.signal.addEventListener("abort", p);
    let C = (M) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Px(t, a),
        unstable_pattern: s,
        params: i.params,
        context: m
      },
      ...M !== void 0 ? [M] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((z) => C(z)) : C()) };
      } catch (M) {
        return { type: "error", result: M };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let S = b ? i.route.action : i.route.loader;
    if (o || u)
      if (S) {
        let j, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          w(S).catch((C) => {
            j = C;
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
          let N = new URL(t.url), C = N.pathname + N.search;
          throw Wn(405, {
            method: t.method,
            pathname: C,
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
    p && t.signal.removeEventListener("abort", p);
  }
  return y;
}
async function TN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function RN(t) {
  let { result: a, type: s } = t;
  if (Lh(a)) {
    let i;
    try {
      i = await TN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new Bc(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return s === "error" ? Oy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: DN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : Oy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function _N(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (Ze(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Dh(u)) {
    let f = i.slice(
      0,
      i.findIndex((m) => m.route.id === s) + 1
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
function My(t, a, s, i) {
  if (Dh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (_y.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return zh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (_y.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Is(t, a, s, i) {
  let o = t.createURL(Kx(a)).toString(), u = { signal: s };
  if (i && gn(i.formMethod)) {
    let { formMethod: f, formEncType: m } = i;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(i.json)) : m === "text/plain" ? u.body = i.text : m === "application/x-www-form-urlencoded" && i.formData ? u.body = nh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function Px(t, a) {
  let s = new URL(t.url), i = typeof a == "string" ? da(a) : a;
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
function Ay(t) {
  let a = new FormData();
  for (let [s, i] of t.entries())
    a.append(s, i);
  return a;
}
function MN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, m, y = !1, p = {}, b = s && Vn(s[1]) ? s[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Ze(
      !Gr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Vn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      i || (u[w] = Vx), y || (y = !0, m = ml(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !y && (m = S.statusCode), S.headers && (p[w] = S.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Dy(t, a, s, i, o, u) {
  let { loaderData: f, errors: m } = MN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((p) => p.shouldLoad)).forEach((y) => {
    let { key: p, match: b, controller: v } = y;
    if (v && v.signal.aborted)
      return;
    let w = u[p];
    if (Ze(w, "Did not find corresponding fetcher result"), Vn(w)) {
      let S = br(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Gr(w))
      Ze(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: f, errors: m };
}
function ky(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== Vx).reduce((u, [f, m]) => (u[f] = m, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function zy(t) {
  return t ? Vn(t[1]) ? {
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
function Io(t) {
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
  let f = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", i && a && s ? m = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", m = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? m = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (m = `Invalid request method "${i.toUpperCase()}"`)), new Bc(
    t || 500,
    f,
    new Error(m),
    !0
  );
}
function Ho(t) {
  let a = Object.entries(t);
  for (let s = a.length - 1; s >= 0; s--) {
    let [i, o] = a[s];
    if (Gr(o))
      return { key: i, result: o };
  }
}
function Kx(t) {
  let a = typeof t == "string" ? da(t) : t;
  return ba({ ...a, hash: "" });
}
function AN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function DN(t) {
  return new Bc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function kN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && zN(s)
  );
}
function zN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function ON(t) {
  return Lh(t.result) && Ux.has(t.result.status);
}
function Vn(t) {
  return t.type === "error";
}
function Gr(t) {
  return (t && t.type) === "redirect";
}
function Oy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Lh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function LN(t) {
  return Ux.has(t);
}
function $N(t) {
  return Lh(t) && LN(t.status) && t.headers.has("Location");
}
function UN(t) {
  return mN.has(t.toUpperCase());
}
function gn(t) {
  return fN.has(t.toUpperCase());
}
function $h(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function dc(t, a) {
  let s = typeof a == "string" ? da(a).search : a.search;
  if (t[t.length - 1].route.index && $h(s || ""))
    return t[t.length - 1];
  let i = kx(t);
  return i[i.length - 1];
}
function Ly(t) {
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
function mf(t, a) {
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
function BN(t, a) {
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
function VN(t, a) {
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
function IN(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      Bx
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function HN(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        Bx,
        JSON.stringify(s)
      );
    } catch (i) {
      Vt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${i}).`
      );
    }
  }
}
function $y() {
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
var Sl = g.createContext(null);
Sl.displayName = "DataRouterState";
var Xx = g.createContext(!1);
function Qx() {
  return g.useContext(Xx);
}
var Uh = g.createContext({
  isTransitioning: !1
});
Uh.displayName = "ViewTransition";
var Zx = g.createContext(
  /* @__PURE__ */ new Map()
);
Zx.displayName = "Fetchers";
var qN = g.createContext(null);
qN.displayName = "Await";
var ra = g.createContext(
  null
);
ra.displayName = "Navigation";
var Vc = g.createContext(
  null
);
Vc.displayName = "Location";
var Ha = g.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ha.displayName = "Route";
var Bh = g.createContext(null);
Bh.displayName = "RouteError";
var Jx = "REACT_ROUTER_ERROR", FN = "REDIRECT", YN = "ROUTE_ERROR_RESPONSE";
function GN(t) {
  if (t.startsWith(`${Jx}:${FN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function PN(t) {
  if (t.startsWith(
    `${Jx}:${YN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Bc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function KN(t, { relative: a } = {}) {
  Ze(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = g.useContext(ra), { hash: o, pathname: u, search: f } = jl(t, { relative: a }), m = u;
  return s !== "/" && (m = u === "/" ? s : ea([s, u])), i.createHref({ pathname: m, search: f, hash: o });
}
function wl() {
  return g.useContext(Vc) != null;
}
function qa() {
  return Ze(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), g.useContext(Vc).location;
}
var Wx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function e1(t) {
  g.useContext(ra).static || g.useLayoutEffect(t);
}
function ei() {
  let { isDataRoute: t } = g.useContext(Ha);
  return t ? iC() : XN();
}
function XN() {
  Ze(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = g.useContext(es), { basename: a, navigator: s } = g.useContext(ra), { matches: i } = g.useContext(Ha), { pathname: o } = qa(), u = JSON.stringify(kh(i)), f = g.useRef(!1);
  return e1(() => {
    f.current = !0;
  }), g.useCallback(
    (y, p = {}) => {
      if (Vt(f.current, Wx), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Uc(
        y,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : ea([a, b.pathname])), (p.replace ? s.replace : s.push)(
        b,
        p.state,
        p
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
function jl(t, { relative: a } = {}) {
  let { matches: s } = g.useContext(Ha), { pathname: i } = qa(), o = JSON.stringify(kh(s));
  return g.useMemo(
    () => Uc(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function QN(t, a, s) {
  Ze(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = g.useContext(ra), { matches: o } = g.useContext(Ha), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let C = p && p.path || "";
    a1(
      m,
      !p || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let b = qa(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (y !== "/") {
    let C = y.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let j = yr(t, { pathname: S });
  return Vt(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Vt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), tC(
    j && j.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, f, C.params),
        pathname: ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? y : ea([
          y,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          i.encodeLocation ? i.encodeLocation(
            C.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathnameBase
        ])
      })
    ),
    o,
    s
  );
}
function ZN() {
  let t = sC(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ g.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ g.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ g.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ g.createElement("pre", { style: o }, s) : null, f);
}
var JN = /* @__PURE__ */ g.createElement(ZN, null), t1 = class extends g.Component {
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
      const s = PN(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ g.createElement(Ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ g.createElement(
      Bh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ g.createElement(WN, { error: t }, a) : a;
  }
};
t1.contextType = Xx;
var pf = /* @__PURE__ */ new WeakMap();
function WN({
  children: t,
  error: a
}) {
  let { basename: s } = g.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = GN(a.digest);
    if (i) {
      let o = pf.get(a);
      if (o) throw o;
      let u = Ox(i.location, s);
      if (zx && !pf.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw pf.set(a, f), f;
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
function eC({ routeContext: t, match: a, children: s }) {
  let i = g.useContext(es);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ g.createElement(Ha.Provider, { value: t }, s);
}
function tC(t, a = [], s) {
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
    Ze(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        u
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let f = !1, m = -1;
  if (s && i) {
    f = i.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: w, errors: S } = i, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || j) {
          s.isStatic && (f = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, p = i && y ? (b, v) => {
    y(b, {
      location: i.location,
      params: i.matches?.[0]?.params ?? {},
      unstable_pattern: xl(i.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, N = null, C = null;
      i && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || JN, f && (m < 0 && w === 0 ? (a1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, C = null) : m === w && (j = !0, C = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), M = () => {
        let z;
        return S ? z = N : j ? z = C : v.route.Component ? z = /* @__PURE__ */ g.createElement(v.route.Component, null) : v.route.element ? z = v.route.element : z = b, /* @__PURE__ */ g.createElement(
          eC,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: i != null
            },
            children: z
          }
        );
      };
      return i && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ g.createElement(
        t1,
        {
          location: i.location,
          revalidation: i.revalidation,
          component: N,
          error: S,
          children: M(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : M();
    },
    null
  );
}
function Vh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function nC(t) {
  let a = g.useContext(es);
  return Ze(a, Vh(t)), a;
}
function n1(t) {
  let a = g.useContext(Sl);
  return Ze(a, Vh(t)), a;
}
function aC(t) {
  let a = g.useContext(Ha);
  return Ze(a, Vh(t)), a;
}
function Ic(t) {
  let a = aC(t), s = a.matches[a.matches.length - 1];
  return Ze(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function rC() {
  return Ic(
    "useRouteId"
    /* UseRouteId */
  );
}
function El() {
  let t = n1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Ic(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function sC() {
  let t = g.useContext(Bh), a = n1(
    "useRouteError"
    /* UseRouteError */
  ), s = Ic(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function iC() {
  let { router: t } = nC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Ic(
    "useNavigate"
    /* UseNavigateStable */
  ), s = g.useRef(!1);
  return e1(() => {
    s.current = !0;
  }), g.useCallback(
    async (o, u = {}) => {
      Vt(s.current, Wx), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var Uy = {};
function a1(t, a, s) {
  !a && !Uy[t] && (Uy[t] = !0, Vt(!1, s));
}
var By = {};
function Vy(t, a) {
  !t && !By[a] && (By[a] = !0, console.warn(a));
}
var lC = "useOptimistic", Iy = EE[lC], oC = () => {
};
function cC(t) {
  return Iy ? Iy(t) : [t, oC];
}
function uC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Vt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: g.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Vt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: g.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Vt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: g.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var dC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function fC(t, a) {
  return yN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: kE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: dC,
    mapRouteProperties: uC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var hC = class {
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
function mC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = Qx() || i;
  let [u, f] = g.useState(t.state), [m, y] = cC(u), [p, b] = g.useState(), [v, w] = g.useState({
    isTransitioning: !1
  }), [S, j] = g.useState(), [N, C] = g.useState(), [T, M] = g.useState(), z = g.useRef(/* @__PURE__ */ new Map()), R = g.useCallback(
    (V, { deletedFetchers: D, newErrors: H, flushSync: te, viewTransitionOpts: K }) => {
      H && s && Object.values(H).forEach(
        (re) => s(re, {
          location: V.location,
          params: V.matches[0]?.params ?? {},
          unstable_pattern: xl(V.matches)
        })
      ), V.fetchers.forEach((re, k) => {
        re.data !== void 0 && z.current.set(k, re.data);
      }), D.forEach((re) => z.current.delete(re)), Vy(
        te === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Vy(
        K == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !le) {
        a && te ? a(() => f(V)) : i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((re) => Hy(re, V)), f(V);
        });
        return;
      }
      if (a && te) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let re = t.window.document.startViewTransition(() => {
          a(() => f(V));
        });
        re.finished.finally(() => {
          a(() => {
            j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(re));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), M({
        state: V,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (b(V), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
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
  g.useLayoutEffect(() => t.subscribe(R), [t, R]);
  let I = m.initialized;
  g.useLayoutEffect(() => {
    !I && t.state.initialized && R(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [I, R, t.state]), g.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new hC());
  }, [v]), g.useEffect(() => {
    if (S && p && t.window) {
      let V = p, D = S.promise, H = t.window.document.startViewTransition(async () => {
        i === !1 ? f(V) : g.startTransition(() => {
          i === !0 && y((te) => Hy(te, V)), f(V);
        }), await D;
      });
      H.finished.finally(() => {
        j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
      }), C(H);
    }
  }, [
    p,
    S,
    t.window,
    i,
    y
  ]), g.useEffect(() => {
    S && p && m.location.key === p.location.key && S.resolve();
  }, [S, N, m.location, p]), g.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), M(void 0));
  }, [v.isTransitioning, T]);
  let X = g.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (V) => t.navigate(V),
    push: (V, D, H) => t.navigate(V, {
      state: D,
      preventScrollReset: H?.preventScrollReset
    }),
    replace: (V, D, H) => t.navigate(V, {
      replace: !0,
      state: D,
      preventScrollReset: H?.preventScrollReset
    })
  }), [t]), ie = t.basename || "/", A = g.useMemo(
    () => ({
      router: t,
      navigator: X,
      static: !1,
      basename: ie,
      onError: s
    }),
    [t, X, ie, s]
  );
  return /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement(es.Provider, { value: A }, /* @__PURE__ */ g.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ g.createElement(Zx.Provider, { value: z.current }, /* @__PURE__ */ g.createElement(Uh.Provider, { value: v }, /* @__PURE__ */ g.createElement(
    vC,
    {
      basename: ie,
      location: m.location,
      navigationType: m.historyAction,
      navigator: X,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ g.createElement(
      pC,
      {
        routes: t.routes,
        future: t.future,
        state: m,
        isStatic: !1,
        onError: s
      }
    )
  ))))), null);
}
function Hy(t, a) {
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
var pC = g.memo(gC);
function gC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return QN(t, void 0, { state: s, isStatic: i, onError: o });
}
function vC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  Ze(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), y = g.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [m, o, u, f]
  );
  typeof s == "string" && (s = da(s));
  let {
    pathname: p = "/",
    search: b = "",
    hash: v = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = s, N = g.useMemo(() => {
    let C = aa(p, m);
    return C == null ? null : {
      location: {
        pathname: C,
        search: b,
        hash: v,
        state: w,
        key: S,
        unstable_mask: j
      },
      navigationType: i
    };
  }, [
    m,
    p,
    b,
    v,
    w,
    S,
    i,
    j
  ]);
  return Vt(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ g.createElement(ra.Provider, { value: y }, /* @__PURE__ */ g.createElement(Vc.Provider, { children: a, value: N }));
}
var fc = "get", hc = "application/x-www-form-urlencoded";
function Hc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function yC(t) {
  return Hc(t) && t.tagName.toLowerCase() === "button";
}
function bC(t) {
  return Hc(t) && t.tagName.toLowerCase() === "form";
}
function xC(t) {
  return Hc(t) && t.tagName.toLowerCase() === "input";
}
function SC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function wC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !SC(t);
}
var qo = null;
function jC() {
  if (qo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), qo = !1;
    } catch {
      qo = !0;
    }
  return qo;
}
var EC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function gf(t) {
  return t != null && !EC.has(t) ? (Vt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${hc}"`
  ), null) : t;
}
function NC(t, a) {
  let s, i, o, u, f;
  if (bC(t)) {
    let m = t.getAttribute("action");
    i = m ? aa(m, a) : null, s = t.getAttribute("method") || fc, o = gf(t.getAttribute("enctype")) || hc, u = new FormData(t);
  } else if (yC(t) || xC(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || fc, o = gf(t.getAttribute("formenctype")) || gf(m.getAttribute("enctype")) || hc, u = new FormData(m, t), !jC()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let w = p ? `${p}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else p && u.append(p, v);
    }
  } else {
    if (Hc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = fc, i = null, o = hc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ih(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function r1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${wc(a)}/_root.${i}` : o.pathname = `${wc(o.pathname)}.${i}`, o;
}
async function CC(t, a) {
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
function TC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function RC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await CC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return DC(
    i.flat(1).filter(TC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function qy(t, a, s, i, o, u) {
  let f = (y, p) => s[p] ? y.route.id !== s[p].route.id : !0, m = (y, p) => (
    // param change, /users/123 -> /users/456
    s[p].pathname !== y.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    s[p].route.path?.endsWith("*") && s[p].params["*"] !== y.params["*"]
  );
  return u === "assets" ? a.filter(
    (y, p) => f(y, p) || m(y, p)
  ) : u === "data" ? a.filter((y, p) => {
    let b = i.routes[y.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(y, p) || m(y, p))
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
function _C(t, a, { includeHydrateFallback: s } = {}) {
  return MC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function MC(t) {
  return [...new Set(t)];
}
function AC(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function DC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(AC(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function Hh() {
  let t = g.useContext(es);
  return Ih(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function kC() {
  let t = g.useContext(Sl);
  return Ih(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var qh = g.createContext(void 0);
qh.displayName = "FrameworkContext";
function Fh() {
  let t = g.useContext(qh);
  return Ih(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function zC(t, a) {
  let s = g.useContext(qh), [i, o] = g.useState(!1), [u, f] = g.useState(!1), { onFocus: m, onBlur: y, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, w = g.useRef(null);
  g.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((M) => {
          f(M.isIntersecting);
        });
      }, C = new IntersectionObserver(N, { threshold: 0.5 });
      return w.current && C.observe(w.current), () => {
        C.disconnect();
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
      onFocus: Ji(m, S),
      onBlur: Ji(y, j),
      onMouseEnter: Ji(p, S),
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
function OC({ page: t, ...a }) {
  let s = Qx(), { router: i } = Hh(), o = g.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ g.createElement($C, { page: t, matches: o, ...a }) : /* @__PURE__ */ g.createElement(UC, { page: t, matches: o, ...a }) : null;
}
function LC(t) {
  let { manifest: a, routeModules: s } = Fh(), [i, o] = g.useState([]);
  return g.useEffect(() => {
    let u = !1;
    return RC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function $C({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o } = Fh(), { basename: u } = Hh(), f = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let m = r1(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), y = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? y = !0 : p.push(b.route.id);
    return y && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    i,
    a
  ]);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, f.map((m) => /* @__PURE__ */ g.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...s })));
}
function UC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o, manifest: u, routeModules: f } = Fh(), { basename: m } = Hh(), { loaderData: y, matches: p } = kC(), b = g.useMemo(
    () => qy(
      t,
      a,
      p,
      u,
      i,
      "data"
    ),
    [t, a, p, u, i]
  ), v = g.useMemo(
    () => qy(
      t,
      a,
      p,
      u,
      i,
      "assets"
    ),
    [t, a, p, u, i]
  ), w = g.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((M) => {
      let z = u.routes[M.route.id];
      !z || !z.hasLoader || (!b.some((R) => R.route.id === M.route.id) && M.route.id in y && f[M.route.id]?.shouldRevalidate || z.hasClientLoader ? C = !0 : N.add(M.route.id));
    }), N.size === 0)
      return [];
    let T = r1(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((M) => N.has(M.route.id)).map((M) => M.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    y,
    i,
    u,
    b,
    a,
    t,
    f
  ]), S = g.useMemo(
    () => _C(v, u),
    [v, u]
  ), j = LC(v);
  return /* @__PURE__ */ g.createElement(g.Fragment, null, w.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...s })), S.map((N) => /* @__PURE__ */ g.createElement("link", { key: N, rel: "modulepreload", href: N, ...s })), j.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ g.createElement(
      "link",
      {
        key: N,
        nonce: s.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? s.crossOrigin
      }
    )
  )));
}
function BC(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var VC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  VC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var s1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Yh = g.forwardRef(
  function({
    onClick: a,
    discover: s = "render",
    prefetch: i = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: m,
    state: y,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: C, navigator: T, unstable_useTransitions: M } = g.useContext(ra), z = typeof b == "string" && s1.test(b), R = Ox(b, C);
    b = R.to;
    let I = KN(b, { relative: o }), X = qa(), ie = null;
    if (m) {
      let re = Uc(
        m,
        [],
        X.unstable_mask ? X.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (re.pathname = re.pathname === "/" ? C : ea([C, re.pathname])), ie = T.createHref(re);
    }
    let [A, V, D] = zC(
      i,
      j
    ), H = FC(b, {
      replace: f,
      unstable_mask: m,
      state: y,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: M
    });
    function te(re) {
      a && a(re), re.defaultPrevented || H(re);
    }
    let K = !(R.isExternal || u), le = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ g.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (K ? ie : void 0) || R.absoluteURL || I,
          onClick: K ? te : a,
          ref: BC(N, V),
          target: p,
          "data-discover": !z && s === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ g.createElement(g.Fragment, null, le, /* @__PURE__ */ g.createElement(OC, { page: I })) : le;
  }
);
Yh.displayName = "Link";
var IC = g.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: s = !1,
    className: i = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: m,
    children: y,
    ...p
  }, b) {
    let v = jl(f, { relative: p.relative }), w = qa(), S = g.useContext(Sl), { navigator: j, basename: N } = g.useContext(ra), C = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    XC(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, M = w.pathname, z = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (M = M.toLowerCase(), z = z ? z.toLowerCase() : null, T = T.toLowerCase()), z && N && (z = aa(z, N) || z);
    const R = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let I = M === T || !o && M.startsWith(T) && M.charAt(R) === "/", X = z != null && (z === T || !o && z.startsWith(T) && z.charAt(T.length) === "/"), ie = {
      isActive: I,
      isPending: X,
      isTransitioning: C
    }, A = I ? a : void 0, V;
    typeof i == "function" ? V = i(ie) : V = [
      i,
      I ? "active" : null,
      X ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(ie) : u;
    return /* @__PURE__ */ g.createElement(
      Yh,
      {
        ...p,
        "aria-current": A,
        className: V,
        ref: b,
        style: D,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(ie) : y
    );
  }
);
IC.displayName = "NavLink";
var HC = g.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = fc,
    action: m,
    onSubmit: y,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = g.useContext(ra), C = PC(), T = KC(m, { relative: p }), M = f.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && s1.test(m), R = (I) => {
      if (y && y(I), I.defaultPrevented) return;
      I.preventDefault();
      let X = I.nativeEvent.submitter, ie = X?.getAttribute("formmethod") || f, A = () => C(X || I.currentTarget, {
        fetcherKey: a,
        method: ie,
        navigate: s,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && s !== !1 ? g.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ g.createElement(
      "form",
      {
        ref: j,
        method: M,
        action: T,
        onSubmit: i ? y : R,
        ...S,
        "data-discover": !z && t === "render" ? "true" : void 0
      }
    );
  }
);
HC.displayName = "Form";
function qC(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function i1(t) {
  let a = g.useContext(es);
  return Ze(a, qC(t)), a;
}
function FC(t, {
  target: a,
  replace: s,
  unstable_mask: i,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: m,
  unstable_defaultShouldRevalidate: y,
  unstable_useTransitions: p
} = {}) {
  let b = ei(), v = qa(), w = jl(t, { relative: f });
  return g.useCallback(
    (S) => {
      if (wC(S, a)) {
        S.preventDefault();
        let j = s !== void 0 ? s : ba(v) === ba(w), N = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: m,
          unstable_defaultShouldRevalidate: y
        });
        p ? g.startTransition(() => N()) : N();
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
      m,
      y,
      p
    ]
  );
}
var YC = 0, GC = () => `__${String(++YC)}__`;
function PC() {
  let { router: t } = i1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = g.useContext(ra), s = rC(), i = t.fetch, o = t.navigate;
  return g.useCallback(
    async (u, f = {}) => {
      let { action: m, method: y, encType: p, formData: b, body: v } = NC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || GC();
        await i(w, s, f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || p,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || y,
          formEncType: f.encType || p,
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
function KC(t, { relative: a } = {}) {
  let { basename: s } = g.useContext(ra), i = g.useContext(Ha);
  Ze(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...jl(t || ".", { relative: a }) }, f = qa();
  if (t == null) {
    u.search = f.search;
    let m = new URLSearchParams(u.search), y = m.getAll("index");
    if (y.some((b) => b === "")) {
      m.delete("index"), y.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), ba(u);
}
function XC(t, { relative: a } = {}) {
  let s = g.useContext(Uh);
  Ze(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = i1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return Sc(o.pathname, f) != null || Sc(o.pathname, u) != null;
}
class ti extends Error {
  constructor(a, s, i, o) {
    super(i), this.status = a, this.category = s, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const xa = "/api/v1/extensions/nexus.audio.emotiontts";
async function wt(t, a) {
  const s = t.startsWith("http") ? t : `${xa}${t}`, i = await fetch(s, {
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
function QC(t, a, s) {
  const i = t.startsWith("http") ? t : `${xa}${t}`, o = new EventSource(i);
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
async function ZC() {
  return wt("/deployments");
}
async function Fy(t) {
  return wt(`/deployments/${t}`);
}
async function JC(t, a) {
  return wt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Yy(t) {
  return wt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Gh(t, a) {
  return wt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ul(t, a, s) {
  return wt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(s)
    }
  );
}
async function l1(t, a) {
  await wt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function WC(t) {
  return wt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function eT(t, a, s = "error") {
  return wt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function tT(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return wt(`/deployments/${t}/runs${o}`);
}
async function nT(t, a) {
  return wt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Ph(t, a) {
  return wt(`/deployments/${t}/runs/${a}`);
}
async function aT(t, a) {
  return wt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function o1(t, a) {
  return wt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function rT(t, a) {
  return wt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Gy(t, a, s, i) {
  return QC(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i
  );
}
async function Xs(t) {
  return wt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function jc(t, a, s, i, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", s), u.append("kind", i), u.append("audio", a);
  const f = await fetch(`${xa}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function sT(t, a) {
  await wt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function iT(t, a, s) {
  return wt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function lT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${xa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function oT(t) {
  return wt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var cT = "mux0i60", uT = "mux0i61", dT = "mux0i62", fT = "mux0i63";
function qc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: cT, children: [
    /* @__PURE__ */ c.jsx("span", { className: uT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: dT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: fT, children: s }) : null
  ] });
}
var hT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, mT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, pT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, gT = "zwn3019";
function Va({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: s = "subtle",
  as: i = "section",
  children: o,
  className: u,
  style: f,
  ...m
}) {
  const y = [hT[t], pT[a], mT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
}
function vT({ children: t, className: a }) {
  const s = [gT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Xr = "vrkn5p0", yT = "_93p6291", bT = "_93p6292", xT = "_93p6293", ST = "_93p6294", wT = "_93p6295", jT = "_93p6296", ET = "_93p6297", NT = "_93p6298", CT = "_93p6299", TT = "_93p629a", RT = "_93p629b", _T = "_93p629c", MT = "_93p629d", AT = "_93p629e";
const DT = "nexus-host-navigate";
function kT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function zT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(DT, {
      detail: s
    })
  );
}
function OT() {
  const { deployments: t } = El(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: yT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: bT, children: [
      /* @__PURE__ */ c.jsx("p", { className: xT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: ST, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: wT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: jT, children: [
        /* @__PURE__ */ c.jsx("span", { className: ET, children: t.length }),
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
        className: NT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            qc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: CT, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: kT(s.deploymentId),
              onClick: (i) => zT(i, s.deploymentId),
              className: TT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: RT, "aria-hidden": "true", children: LT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: _T, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: MT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: AT, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function LT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Kh = Rx();
const $T = /* @__PURE__ */ Tx(Kh);
function UT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const BT = (t) => {
  switch (t) {
    case "success":
      return HT;
    case "info":
      return FT;
    case "warning":
      return qT;
    case "error":
      return YT;
    default:
      return null;
  }
}, VT = Array(12).fill(0), IT = ({ visible: t, className: a }) => /* @__PURE__ */ xe.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-spinner"
}, VT.map((s, i) => /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), HT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), qT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), FT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), YT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), GT = /* @__PURE__ */ xe.createElement("svg", {
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
})), PT = () => {
  const [t, a] = xe.useState(document.hidden);
  return xe.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let ah = 1;
class KT {
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
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : ah++, f = this.toasts.find((y) => y.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((y) => y.id === u ? (this.publish({
        ...y,
        ...a,
        id: u,
        title: i
      }), {
        ...y,
        ...a,
        id: u,
        dismissible: m,
        title: i
      }) : y) : this.addToast({
        title: i,
        ...o,
        dismissible: m,
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
      const m = o.then(async (p) => {
        if (f = [
          "resolve",
          p
        ], xe.isValidElement(p))
          u = !1, this.create({
            id: i,
            type: "default",
            message: p
          });
        else if (QT(p) && !p.ok) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(`HTTP error! status: ${p.status}`) : s.error, w = typeof s.description == "function" ? await s.description(`HTTP error! status: ${p.status}`) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (p instanceof Error) {
          u = !1;
          const v = typeof s.error == "function" ? await s.error(p) : s.error, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
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
          const v = typeof s.success == "function" ? await s.success(p) : s.success, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof v == "object" && !xe.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: i,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (p) => {
        if (f = [
          "reject",
          p
        ], s.error !== void 0) {
          u = !1;
          const b = typeof s.error == "function" ? await s.error(p) : s.error, v = typeof s.description == "function" ? await s.description(p) : s.description, S = typeof b == "object" && !xe.isValidElement(b) ? b : {
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
      }), y = () => new Promise((p, b) => m.then(() => f[0] === "reject" ? b(f[1]) : p(f[1])).catch(b));
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
const Tn = new KT(), XT = (t, a) => {
  const s = a?.id || ah++;
  return Tn.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, QT = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", ZT = XT, JT = () => Tn.toasts, WT = () => Tn.getActiveToasts(), cn = Object.assign(ZT, {
  success: Tn.success,
  info: Tn.info,
  warning: Tn.warning,
  error: Tn.error,
  custom: Tn.custom,
  message: Tn.message,
  promise: Tn.promise,
  dismiss: Tn.dismiss,
  loading: Tn.loading
}, {
  getHistory: JT,
  getToasts: WT
});
UT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Fo(t) {
  return t.label !== void 0;
}
const eR = 3, tR = "24px", nR = "16px", Py = 4e3, aR = 356, rR = 14, sR = 45, iR = 200;
function ya(...t) {
  return t.filter(Boolean).join(" ");
}
function lR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const oR = (t) => {
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: C, index: T, toasts: M, expanded: z, removeToast: R, defaultRichColors: I, closeButton: X, style: ie, cancelButtonStyle: A, actionButtonStyle: V, className: D = "", descriptionClassName: H = "", duration: te, position: K, gap: le, expandByDefault: re, classNames: k, icons: $, closeButtonAriaLabel: q = "Close toast" } = t, [F, ce] = xe.useState(null), [_, ne] = xe.useState(null), [J, Y] = xe.useState(!1), [U, W] = xe.useState(!1), [ue, ve] = xe.useState(!1), [_e, st] = xe.useState(!1), [Ce, Je] = xe.useState(!1), [He, Ve] = xe.useState(0), [It, jt] = xe.useState(0), At = xe.useRef(v.duration || te || Py), Mn = xe.useRef(null), dt = xe.useRef(null), Qt = T === 0, un = T + 1 <= N, Dt = v.type, tn = v.dismissible !== !1, Rt = v.className || "", we = v.descriptionClassName || "", Q = xe.useMemo(() => C.findIndex((Ue) => Ue.toastId === v.id) || 0, [
    C,
    v.id
  ]), me = xe.useMemo(() => {
    var Ue;
    return (Ue = v.closeButton) != null ? Ue : X;
  }, [
    v.closeButton,
    X
  ]), be = xe.useMemo(() => v.duration || te || Py, [
    v.duration,
    te
  ]), Ie = xe.useRef(0), Ge = xe.useRef(0), pe = xe.useRef(0), Ee = xe.useRef(null), [Ne, Re] = K.split("-"), ft = xe.useMemo(() => C.reduce((Ue, ct, zt) => zt >= Q ? Ue : Ue + ct.height, 0), [
    C,
    Q
  ]), qe = PT(), dn = v.invert || b, Hn = Dt === "loading";
  Ge.current = xe.useMemo(() => Q * le + ft, [
    Q,
    ft
  ]), xe.useEffect(() => {
    At.current = be;
  }, [
    be
  ]), xe.useEffect(() => {
    Y(!0);
  }, []), xe.useEffect(() => {
    const Ue = dt.current;
    if (Ue) {
      const ct = Ue.getBoundingClientRect().height;
      return jt(ct), j((zt) => [
        {
          toastId: v.id,
          height: ct,
          position: v.position
        },
        ...zt
      ]), () => j((zt) => zt.filter((Zt) => Zt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), xe.useLayoutEffect(() => {
    if (!J) return;
    const Ue = dt.current, ct = Ue.style.height;
    Ue.style.height = "auto";
    const zt = Ue.getBoundingClientRect().height;
    Ue.style.height = ct, jt(zt), j((Zt) => Zt.find((pt) => pt.toastId === v.id) ? Zt.map((pt) => pt.toastId === v.id ? {
      ...pt,
      height: zt
    } : pt) : [
      {
        toastId: v.id,
        height: zt,
        position: v.position
      },
      ...Zt
    ]);
  }, [
    J,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const yn = xe.useCallback(() => {
    W(!0), Ve(Ge.current), j((Ue) => Ue.filter((ct) => ct.toastId !== v.id)), setTimeout(() => {
      R(v);
    }, iR);
  }, [
    v,
    R,
    j,
    Ge
  ]);
  xe.useEffect(() => {
    if (v.promise && Dt === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Ue;
    return z || S || qe ? (() => {
      if (pe.current < Ie.current) {
        const Zt = (/* @__PURE__ */ new Date()).getTime() - Ie.current;
        At.current = At.current - Zt;
      }
      pe.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      At.current !== 1 / 0 && (Ie.current = (/* @__PURE__ */ new Date()).getTime(), Ue = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), yn();
      }, At.current));
    })(), () => clearTimeout(Ue);
  }, [
    z,
    S,
    v,
    Dt,
    qe,
    yn
  ]), xe.useEffect(() => {
    v.delete && (yn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    yn,
    v.delete
  ]);
  function qn() {
    var Ue;
    if ($?.loading) {
      var ct;
      return /* @__PURE__ */ xe.createElement("div", {
        className: ya(k?.loader, v == null || (ct = v.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": Dt === "loading"
      }, $.loading);
    }
    return /* @__PURE__ */ xe.createElement(IT, {
      className: ya(k?.loader, v == null || (Ue = v.classNames) == null ? void 0 : Ue.loader),
      visible: Dt === "loading"
    });
  }
  const nn = v.icon || $?.[Dt] || BT(Dt);
  var An, fn;
  return /* @__PURE__ */ xe.createElement("li", {
    tabIndex: 0,
    ref: dt,
    className: ya(D, Rt, k?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, k?.default, k?.[Dt], v == null || (s = v.classNames) == null ? void 0 : s[Dt]),
    "data-sonner-toast": "",
    "data-rich-colors": (An = v.richColors) != null ? An : I,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": J,
    "data-promise": !!v.promise,
    "data-swiped": Ce,
    "data-removed": U,
    "data-visible": un,
    "data-y-position": Ne,
    "data-x-position": Re,
    "data-index": T,
    "data-front": Qt,
    "data-swiping": ue,
    "data-dismissible": tn,
    "data-type": Dt,
    "data-invert": dn,
    "data-swipe-out": _e,
    "data-swipe-direction": _,
    "data-expanded": !!(z || re && J),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": M.length - T,
      "--offset": `${U ? He : Ge.current}px`,
      "--initial-height": re ? "auto" : `${It}px`,
      ...ie,
      ...v.style
    },
    onDragEnd: () => {
      ve(!1), ce(null), Ee.current = null;
    },
    onPointerDown: (Ue) => {
      Ue.button !== 2 && (Hn || !tn || (Mn.current = /* @__PURE__ */ new Date(), Ve(Ge.current), Ue.target.setPointerCapture(Ue.pointerId), Ue.target.tagName !== "BUTTON" && (ve(!0), Ee.current = {
        x: Ue.clientX,
        y: Ue.clientY
      })));
    },
    onPointerUp: () => {
      var Ue, ct, zt;
      if (_e || !tn) return;
      Ee.current = null;
      const Zt = Number(((Ue = dt.current) == null ? void 0 : Ue.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Dn = Number(((ct = dt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((zt = Mn.current) == null ? void 0 : zt.getTime()), an = F === "x" ? Zt : Dn, Sa = Math.abs(an) / pt;
      if (Math.abs(an) >= sR || Sa > 0.11) {
        Ve(Ge.current), v.onDismiss == null || v.onDismiss.call(v, v), ne(F === "x" ? Zt > 0 ? "right" : "left" : Dn > 0 ? "down" : "up"), yn(), st(!0);
        return;
      } else {
        var hn, O;
        (hn = dt.current) == null || hn.style.setProperty("--swipe-amount-x", "0px"), (O = dt.current) == null || O.style.setProperty("--swipe-amount-y", "0px");
      }
      Je(!1), ve(!1), ce(null);
    },
    onPointerMove: (Ue) => {
      var ct, zt, Zt;
      if (!Ee.current || !tn || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const pt = Ue.clientY - Ee.current.y, an = Ue.clientX - Ee.current.x;
      var Sa;
      const hn = (Sa = t.swipeDirections) != null ? Sa : lR(K);
      !F && (Math.abs(an) > 1 || Math.abs(pt) > 1) && ce(Math.abs(an) > Math.abs(pt) ? "x" : "y");
      let O = {
        x: 0,
        y: 0
      };
      const G = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (F === "y") {
        if (hn.includes("top") || hn.includes("bottom"))
          if (hn.includes("top") && pt < 0 || hn.includes("bottom") && pt > 0)
            O.y = pt;
          else {
            const Z = pt * G(pt);
            O.y = Math.abs(Z) < Math.abs(pt) ? Z : pt;
          }
      } else if (F === "x" && (hn.includes("left") || hn.includes("right")))
        if (hn.includes("left") && an < 0 || hn.includes("right") && an > 0)
          O.x = an;
        else {
          const Z = an * G(an);
          O.x = Math.abs(Z) < Math.abs(an) ? Z : an;
        }
      (Math.abs(O.x) > 0 || Math.abs(O.y) > 0) && Je(!0), (zt = dt.current) == null || zt.style.setProperty("--swipe-amount-x", `${O.x}px`), (Zt = dt.current) == null || Zt.style.setProperty("--swipe-amount-y", `${O.y}px`);
    }
  }, me && !v.jsx && Dt !== "loading" ? /* @__PURE__ */ xe.createElement("button", {
    "aria-label": q,
    "data-disabled": Hn,
    "data-close-button": !0,
    onClick: Hn || !tn ? () => {
    } : () => {
      yn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ya(k?.closeButton, v == null || (i = v.classNames) == null ? void 0 : i.closeButton)
  }, (fn = $?.close) != null ? fn : GT) : null, (Dt || v.icon || v.promise) && v.icon !== null && ($?.[Dt] !== null || v.icon) ? /* @__PURE__ */ xe.createElement("div", {
    "data-icon": "",
    className: ya(k?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || qn() : null, v.type !== "loading" ? nn : null) : null, /* @__PURE__ */ xe.createElement("div", {
    "data-content": "",
    className: ya(k?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ xe.createElement("div", {
    "data-title": "",
    className: ya(k?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ xe.createElement("div", {
    "data-description": "",
    className: ya(H, we, k?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ xe.isValidElement(v.cancel) ? v.cancel : v.cancel && Fo(v.cancel) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || A,
    onClick: (Ue) => {
      Fo(v.cancel) && tn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Ue), yn());
    },
    className: ya(k?.cancelButton, v == null || (y = v.classNames) == null ? void 0 : y.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ xe.isValidElement(v.action) ? v.action : v.action && Fo(v.action) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || V,
    onClick: (Ue) => {
      Fo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Ue), !Ue.defaultPrevented && yn());
    },
    className: ya(k?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Ky() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function cR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? nR : tR;
    function y(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        s[`${f}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof i == "number" || typeof i == "string" ? y(i) : typeof i == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      i[p] === void 0 ? s[`${f}-${p}`] = m : s[`${f}-${p}`] = typeof i[p] == "number" ? `${i[p]}px` : i[p];
    }) : y(m);
  }), s;
}
const uR = /* @__PURE__ */ xe.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: C = eR, toastOptions: T, dir: M = Ky(), gap: z = rR, icons: R, containerAriaLabel: I = "Notifications" } = a, [X, ie] = xe.useState([]), A = xe.useMemo(() => i ? X.filter((J) => J.toasterId === i) : X.filter((J) => !J.toasterId), [
    X,
    i
  ]), V = xe.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((J) => J.position).map((J) => J.position)))), [
    A,
    u
  ]), [D, H] = xe.useState([]), [te, K] = xe.useState(!1), [le, re] = xe.useState(!1), [k, $] = xe.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = xe.useRef(null), F = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ce = xe.useRef(null), _ = xe.useRef(!1), ne = xe.useCallback((J) => {
    ie((Y) => {
      var U;
      return (U = Y.find((W) => W.id === J.id)) != null && U.delete || Tn.dismiss(J.id), Y.filter(({ id: W }) => W !== J.id);
    });
  }, []);
  return xe.useEffect(() => Tn.subscribe((J) => {
    if (J.dismiss) {
      requestAnimationFrame(() => {
        ie((Y) => Y.map((U) => U.id === J.id ? {
          ...U,
          delete: !0
        } : U));
      });
      return;
    }
    setTimeout(() => {
      $T.flushSync(() => {
        ie((Y) => {
          const U = Y.findIndex((W) => W.id === J.id);
          return U !== -1 ? [
            ...Y.slice(0, U),
            {
              ...Y[U],
              ...J
            },
            ...Y.slice(U + 1)
          ] : [
            J,
            ...Y
          ];
        });
      });
    });
  }), [
    X
  ]), xe.useEffect(() => {
    if (w !== "system") {
      $(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? $("dark") : $("light")), typeof window > "u") return;
    const J = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      J.addEventListener("change", ({ matches: Y }) => {
        $(Y ? "dark" : "light");
      });
    } catch {
      J.addListener(({ matches: U }) => {
        try {
          $(U ? "dark" : "light");
        } catch (W) {
          console.error(W);
        }
      });
    }
  }, [
    w
  ]), xe.useEffect(() => {
    X.length <= 1 && K(!1);
  }, [
    X
  ]), xe.useEffect(() => {
    const J = (Y) => {
      var U;
      if (f.every((ve) => Y[ve] || Y.code === ve)) {
        var ue;
        K(!0), (ue = q.current) == null || ue.focus();
      }
      Y.code === "Escape" && (document.activeElement === q.current || (U = q.current) != null && U.contains(document.activeElement)) && K(!1);
    };
    return document.addEventListener("keydown", J), () => document.removeEventListener("keydown", J);
  }, [
    f
  ]), xe.useEffect(() => {
    if (q.current)
      return () => {
        ce.current && (ce.current.focus({
          preventScroll: !0
        }), ce.current = null, _.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ xe.createElement("section", {
    ref: s,
    "aria-label": `${I} ${F}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, V.map((J, Y) => {
    var U;
    const [W, ue] = J.split("-");
    return A.length ? /* @__PURE__ */ xe.createElement("ol", {
      key: J,
      dir: M === "auto" ? Ky() : M,
      tabIndex: -1,
      ref: q,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": k,
      "data-y-position": W,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${((U = D[0]) == null ? void 0 : U.height) || 0}px`,
        "--width": `${aR}px`,
        "--gap": `${z}px`,
        ...N,
        ...cR(b, v)
      },
      onBlur: (ve) => {
        _.current && !ve.currentTarget.contains(ve.relatedTarget) && (_.current = !1, ce.current && (ce.current.focus({
          preventScroll: !0
        }), ce.current = null));
      },
      onFocus: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || _.current || (_.current = !0, ce.current = ve.relatedTarget);
      },
      onMouseEnter: () => K(!0),
      onMouseMove: () => K(!0),
      onMouseLeave: () => {
        le || K(!1);
      },
      onDragEnd: () => K(!1),
      onPointerDown: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || re(!0);
      },
      onPointerUp: () => re(!1)
    }, A.filter((ve) => !ve.position && Y === 0 || ve.position === J).map((ve, _e) => {
      var st, Ce;
      return /* @__PURE__ */ xe.createElement(oR, {
        key: ve.id,
        icons: R,
        index: _e,
        toast: ve,
        defaultRichColors: S,
        duration: (st = T?.duration) != null ? st : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (Ce = T?.closeButton) != null ? Ce : y,
        interacting: le,
        position: J,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ne,
        toasts: A.filter((Je) => Je.position == ve.position),
        heights: D.filter((Je) => Je.position == ve.position),
        setHeights: H,
        expandByDefault: m,
        gap: z,
        expanded: te,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Xy = 32, Qy = -30, Zy = -6, Jy = 0.5, Wy = 2, e0 = -24, t0 = 24, n0 = -12, a0 = 12, r0 = -12, s0 = 12, i0 = -60, l0 = -20;
class Qs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function c1(t, a, s, i = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${xa}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (f.status === 409) {
    const m = await f.json().catch(() => null), y = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qs(y, p);
  }
  if (!f.ok)
    throw new Error(await Fc(f, "apply"));
  return await f.json();
}
async function dR(t, a, s, i, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(s)}/edit`, f = `${xa}${u}`, m = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const y = await m.json().catch(() => null), p = y?.error?.current_digest ?? "", b = y?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qs(p, b);
  }
  if (!m.ok)
    throw new Error(await Fc(m, "apply"));
  return await m.json();
}
async function fR(t, a, s = {}) {
  const i = `${xa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function hR(t, a, s, i = {}) {
  const o = `${xa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Fc(u, "preview"));
  return u.blob();
}
async function mc(t, a, s, i = 50, o = {}) {
  const u = `${xa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Fc(f, "audit fetch"));
  return await f.json();
}
function _n() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function u1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Xy)
    return {
      message: `Chain exceeds the maximum of ${Xy} operations.`
    };
  for (const s of t.ops) {
    const i = mR(s, a);
    if (i) return i;
  }
  return null;
}
function mR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return pR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Qy || t.target_lufs > Zy ? {
        opId: t.id,
        message: `Normalize target must be between ${Qy} and ${Zy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Jy || t.factor > Wy ? {
        opId: t.id,
        message: `Speed factor must be between ${Jy}× and ${Wy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < e0 || t.gain_db > t0 ? {
        opId: t.id,
        message: `Volume must be between ${e0} and ${t0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < n0 || i > a0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${n0} and ${a0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < r0 || t.semitones > s0 ? {
        opId: t.id,
        message: `Pitch must be between ${r0} and ${s0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < i0 || t.threshold_db > l0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${i0} and ${l0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function pR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Fc(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var gR = "g5r6d10", vR = "g5r6d11", yR = "g5r6d12", bR = "g5r6d13", xR = "g5r6d14", SR = "g5r6d15", wR = "g5r6d1a", jR = "g5r6d1b", ER = "g5r6d1c", NR = "g5r6d1d", CR = "g5r6d1e", TR = "g5r6d1g", RR = "g5r6d1h", _R = "g5r6d1i", MR = "g5r6d1j", AR = "g5r6d1k", DR = "g5r6d1l", kR = "g5r6d1m", zR = "g5r6d1n", OR = "g5r6d1o", o0 = "g5r6d1p", LR = "g5r6d1q", $R = "g5r6d1r", UR = "g5r6d1s", BR = "g5r6d1t", VR = "g5r6d1u", c0 = "g5r6d1v", u0 = "g5r6d1w", IR = "g5r6d1x", HR = "g5r6d1y", Ys = "g5r6d1z", qR = "g5r6d110", d0 = "g5r6d111", FR = "g5r6d112", YR = "g5r6d113", mr = "g5r6d114", GR = "g5r6d119", PR = "a6ki8u0", KR = "a6ki8u1", XR = "a6ki8u2", QR = "a6ki8u3", ZR = "a6ki8u4", JR = "a6ki8u5", WR = "a6ki8u6", vf = "a6ki8u7", e_ = "a6ki8u8", t_ = "a6ki8u9", n_ = "a6ki8ua", a_ = "a6ki8ub", r_ = "a6ki8uc", s_ = "a6ki8ud", i_ = "a6ki8ue", l_ = "a6ki8uf", o_ = "a6ki8ug", c_ = "a6ki8uh", u_ = "_1lguv7x0", d_ = "_1lguv7x1", f_ = "_1lguv7x2", h_ = "_1lguv7x3", m_ = "_1lguv7x4", p_ = "_1lguv7x5", g_ = "_1lguv7x6", v_ = "_1lguv7x7", y_ = "_1lguv7x8", b_ = "_1lguv7x9", x_ = "_1lguv7xa", S_ = "_1lguv7xb", w_ = "_1lguv7xc", f0 = "_1lguv7xd", j_ = "_1lguv7xe", E_ = "_1lguv7xf", N_ = "_1lguv7xg", C_ = "_1lguv7xh", d1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, f1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, T_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, R_ = "_4ydn54f";
function Ke({
  variant: t = "primary",
  size: a = "md",
  type: s = "button",
  loading: i = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: m,
  style: y,
  ...p
}) {
  const b = [
    d1[t],
    f1[a],
    o ? T_[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: s,
      className: b,
      style: y,
      disabled: i || u,
      "aria-busy": i || void 0,
      ...p,
      children: [
        i ? /* @__PURE__ */ c.jsx("span", { className: R_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const __ = 28;
function M_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function A_(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function D_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function k_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function z_({
  asset: t,
  presentation: a,
  usedBy: s,
  isPlaying: i,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: m,
  onPlaybackEnded: y
}) {
  const [p, b] = g.useState(!1), [v, w] = g.useState(t.displayName), S = g.useRef(null), j = g.useMemo(() => M_(t.contentSha256), [t.contentSha256]), N = g.useMemo(() => A_(j, __), [j]), C = g.useMemo(() => lT(t), [t]);
  g.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), g.useEffect(() => {
    const z = S.current;
    z && (i && C ? z.play().catch(() => {
    }) : (z.pause(), z.currentTime = 0));
  }, [i, C]);
  const T = async () => {
    const z = v.trim();
    if (!z || z === t.displayName) {
      b(!1), w(t.displayName);
      return;
    }
    try {
      await u(z);
    } finally {
      b(!1);
    }
  }, M = `${D_(t.durationMs)} · ${k_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: u_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: d_, children: [
      /* @__PURE__ */ c.jsx("span", { className: f_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: h_, children: [
        p ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: p_,
            value: v,
            autoFocus: !0,
            onChange: (z) => w(z.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (z) => {
              z.key === "Enter" ? (z.preventDefault(), z.currentTarget.blur()) : z.key === "Escape" && (b(!1), w(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: m_,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: g_, children: M })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: v_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: y_,
        "data-playing": i ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: b_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: x_, "aria-hidden": "true", children: N.map((z, R) => /* @__PURE__ */ c.jsx("span", { className: S_, style: { height: `${Math.round(z * 100)}%` } }, R)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: w_, children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: f0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((z) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: j_,
            style: { color: z.color, borderColor: z.color },
            children: z.characterName
          },
          z.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: f0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: E_, children: [
        /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Rename",
            "aria-label": "Rename voice",
            onClick: () => b(!0),
            children: "✎"
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ke,
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
        m && /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: N_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    C && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: S,
        src: C,
        preload: "none",
        className: C_,
        onEnded: y
      }
    )
  ] });
}
var O_ = "_17eol302", L_ = "_17eol303", $_ = "_17eol304", U_ = "_17eol305", B_ = "_17eol306", V_ = "_17eol307", Yo = "_17eol308", I_ = "_17eol309", H_ = "_17eol30a", q_ = "_17eol30b", F_ = "_17eol30c", Y_ = "_17eol30d", h0 = "_17eol30e", G_ = "_17eol30g";
function P_() {
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
function K_(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function X_({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = g.useState("idle"), [f, m] = g.useState(null), [y, p] = g.useState(0), [b, v] = g.useState(null), [w, S] = g.useState(a), [j, N] = g.useState(!1), C = g.useRef(null), T = g.useRef(null), M = g.useRef([]), z = g.useRef(0), R = g.useRef(null), I = g.useRef(null), X = g.useRef({ mime: "audio/webm", ext: "webm" }), ie = g.useRef(null), A = g.useRef(null), V = g.useRef(null);
  g.useEffect(() => {
    if (t)
      return V.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ie.current?.scrollIntoView({ behavior: "smooth", block: "center" }), A.current?.focus();
      }), () => {
        V.current?.focus?.();
      };
  }, [t]), g.useEffect(() => {
    if (!t) return;
    const $ = (q) => {
      q.key === "Escape" && s();
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [t, s]);
  const D = g.useCallback(
    ($) => {
      if ($.key !== "Tab") return;
      const q = ie.current;
      if (!q) return;
      const F = q.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (F.length === 0) return;
      const ce = F[0], _ = F[F.length - 1], ne = document.activeElement;
      $.shiftKey ? (ne === ce || ne === q) && ($.preventDefault(), _.focus()) : ne === _ && ($.preventDefault(), ce.focus());
    },
    []
  ), H = g.useCallback(() => {
    if (T.current) {
      for (const $ of T.current.getTracks()) $.stop();
      T.current = null;
    }
    R.current != null && (window.clearInterval(R.current), R.current = null);
  }, []), te = g.useCallback(() => {
    H(), b && URL.revokeObjectURL(b), v(null), M.current = [], I.current = null, p(0), m(null), u("idle");
  }, [b, H]);
  if (g.useEffect(() => {
    t || (te(), S(a));
  }, [t, a, te]), g.useEffect(() => () => {
    H(), b && URL.revokeObjectURL(b);
  }, [b, H]), !t) return null;
  const K = async () => {
    m(null), u("preparing");
    try {
      const $ = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = $;
      const q = P_();
      X.current = q;
      const F = q.mime ? new MediaRecorder($, { mimeType: q.mime }) : new MediaRecorder($);
      C.current = F, M.current = [], F.ondataavailable = (ce) => {
        ce.data && ce.data.size > 0 && M.current.push(ce.data);
      }, F.onstop = () => {
        const ce = q.mime || "audio/webm", _ = new Blob(M.current, { type: ce }), ne = new File([_], `${w || a || "recording"}.${q.ext}`, {
          type: ce
        });
        I.current = ne;
        const J = URL.createObjectURL(_);
        v(J), u("ready"), H();
      }, F.start(), z.current = Date.now(), p(0), R.current = window.setInterval(() => {
        p(Date.now() - z.current);
      }, 200), u("recording");
    } catch ($) {
      const q = $ instanceof Error ? $.message : "could not access microphone";
      m(q), u(q.toLowerCase().includes("denied") ? "denied" : "error"), H();
    }
  }, le = () => {
    const $ = C.current;
    $ && $.state !== "inactive" && $.stop(), R.current != null && (window.clearInterval(R.current), R.current = null);
  }, re = async () => {
    const $ = I.current;
    if (!$) return;
    const q = (w || a).trim();
    if (!q) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await i($, q), s();
    } catch (F) {
      m(F instanceof Error ? F.message : "upload failed");
    } finally {
      N(!1);
    }
  }, k = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: O_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ie,
      className: L_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: ($) => $.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: $_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: U_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: B_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: k
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: F_, "aria-live": "polite", children: K_(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: A,
              type: "button",
              className: Yo,
              "data-tone": "danger",
              onClick: () => {
                K();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: h0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ c.jsx("button", { type: "button", className: Yo, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ c.jsxs(
            "button",
            {
              type: "button",
              className: Yo,
              "data-tone": "danger",
              "data-active": "true",
              onClick: le,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: h0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Yo,
              onClick: () => {
                te();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: Y_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: I_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: H_,
              value: w,
              onChange: ($) => S($.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: q_, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: G_, children: [
          /* @__PURE__ */ c.jsx(Ke, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Ke,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                re();
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
function Q_({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o
}) {
  const [u, f] = g.useState(""), [m, y] = g.useState("all"), [p, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [N, C] = g.useState(!1), T = g.useRef(null), M = g.useCallback(
    (K) => "upload",
    []
  ), z = g.useMemo(() => {
    const K = u.trim().toLowerCase();
    return a.filter((le) => {
      const re = M(le);
      return !(m === "uploaded" && re !== "upload" || m === "preset" && re !== "preset" || K && !le.displayName.toLowerCase().includes(K));
    });
  }, [a, u, m, M]), R = g.useMemo(
    () => a.filter((K) => M(K) === "upload").length,
    [a, M]
  ), I = g.useCallback(
    (K) => {
      const le = [], re = /* @__PURE__ */ new Set();
      for (const k of s)
        k.speakerVoiceAssetId === K && (re.has(k.characterName) || (re.add(k.characterName), le.push({
          characterName: k.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[k.characterName] ?? "#ba9eff"
        })));
      return le;
    },
    [s, i]
  ), X = g.useCallback(
    async (K) => {
      const le = Array.from(K).slice(0, 8);
      if (le.length !== 0) {
        C(!0);
        try {
          const re = [];
          for (const k of le) {
            if (!k.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(k.name)) {
              cn.error(`${k.name}: not an audio file`);
              continue;
            }
            const $ = k.name.replace(/\.[^.]+$/, "");
            try {
              const q = await jc(t, k, $, "speaker");
              re.push(q), cn.success(`Added ${q.displayName}`);
            } catch (q) {
              cn.error(q instanceof Error ? q.message : `${k.name}: upload failed`);
            }
          }
          re.length > 0 && o([...re, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), ie = (K) => {
    K.preventDefault(), b(!1), K.dataTransfer?.files && X(K.dataTransfer.files);
  }, A = g.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const le = await fetch(K);
        if (!le.ok) throw new Error(`fetch failed: ${le.status}`);
        const re = await le.blob(), k = K.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([re], k, { type: re.type || "audio/wav" });
        await X([$]);
      } catch (le) {
        cn.error(le instanceof Error ? le.message : "could not fetch URL");
      }
  }, [X]), V = g.useCallback(
    async (K, le) => {
      try {
        const re = await iT(t, K, le);
        o(
          a.map((k) => k.voiceAssetId === K ? re : k)
        ), cn.success(`Renamed to ${re.displayName}`);
      } catch (re) {
        cn.error(re instanceof Error ? re.message : "rename failed");
      }
    },
    [t, a, o]
  ), D = g.useCallback((K) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(K), cn.success("Copied name")) : cn.error("Clipboard unavailable");
  }, []), H = g.useCallback(
    async (K) => {
      if (window.confirm(`Delete "${K.displayName}"? Mappings using it will reset.`))
        try {
          await sT(t, K.voiceAssetId), o(a.filter((re) => re.voiceAssetId !== K.voiceAssetId)), cn.success(`Deleted ${K.displayName}`);
        } catch (re) {
          cn.error(re instanceof Error ? re.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: PR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: KR,
        "data-over": p ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ie,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: XR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: QR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: ZR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: JR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: WR, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: vf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: vf,
                  onClick: () => {
                    A();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: vf,
                  onClick: () => j(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            Ke,
            {
              variant: "primary",
              size: "md",
              disabled: N,
              onClick: () => T.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: T,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: c_,
              onChange: (K) => {
                K.target.files && (X(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: e_, children: [
      /* @__PURE__ */ c.jsxs("label", { className: t_, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: n_,
            value: u,
            onChange: (K) => f(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: a_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, le]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: r_,
          "data-active": m === K ? "true" : "false",
          onClick: () => y(K),
          children: le
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: l_, children: [
        /* @__PURE__ */ c.jsx("span", { className: o_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          R,
          " uploaded"
        ] })
      ] })
    ] }),
    z.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: i_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: s_, children: z.map((K) => {
      const le = M(K);
      return /* @__PURE__ */ c.jsx(
        z_,
        {
          asset: K,
          presentation: le,
          usedBy: I(K.voiceAssetId),
          isPlaying: v === K.voiceAssetId,
          onTogglePlay: () => w((re) => re === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (re) => V(K.voiceAssetId, re),
          onCopyName: () => D(K.displayName),
          onDelete: le === "upload" ? () => void H(K) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      X_,
      {
        open: S,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (K, le) => {
          await te(K, le);
        }
      }
    )
  ] });
  async function te(K, le) {
    C(!0);
    try {
      const re = await jc(t, K, le, "speaker");
      o([re, ...a]), cn.success(`Recorded ${re.displayName}`);
    } catch (re) {
      throw cn.error(re instanceof Error ? re.message : "upload failed"), re;
    } finally {
      C(!1);
    }
  }
}
async function Z_(t) {
  return wt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function J_(t, a, s) {
  return wt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function W_(t, a) {
  await wt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var m0 = "_190jlds0", e2 = "_190jlds1", t2 = "_190jlds2", n2 = "_190jlds3", a2 = "_190jlds4", r2 = "_190jlds5", s2 = "_190jlds6", i2 = "_190jlds7", l2 = "_190jlds8", o2 = "_190jlds9", p0 = "_190jldsa", c2 = "_190jldsb", g0 = "_190jldsc", u2 = "_190jldsd", d2 = "_190jldse", f2 = "_190jldsf";
function h2({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = g.useState(() => $s(a[0])), [m, y] = g.useState([]), [p, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), [N, C] = g.useState(null), T = g.useMemo(
    () => a.find((R) => $s(R) === u) ?? a[0],
    [a, u]
  );
  g.useEffect(() => {
    a.length && (a.some((R) => $s(R) === u) || f($s(a[0])));
  }, [a, u]), g.useEffect(() => {
    if (!T) {
      y([]);
      return;
    }
    let R = !1;
    return b(!0), w(null), mc(t, T.kind, T.id, 50).then((I) => {
      R || y(I.entries);
    }).catch((I) => {
      R || w(I instanceof Error ? I.message : "audit fetch failed");
    }).finally(() => {
      R || b(!1);
    }), () => {
      R = !0;
    };
  }, [t, T]);
  const M = g.useCallback(() => {
    if (!T) return;
    const R = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, I = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), X = URL.createObjectURL(I), ie = document.createElement("a");
    ie.href = X, ie.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ie), ie.click(), document.body.removeChild(ie), URL.revokeObjectURL(X);
  }, [t, m, T]), z = g.useCallback(async () => {
    if (!(!T || !s) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(T);
        const R = await mc(t, T.kind, T.id, 50);
        y(R.entries);
      } catch (R) {
        w(R instanceof Error ? R.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: m0, children: /* @__PURE__ */ c.jsx("p", { className: g0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: m0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: e2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: t2, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: p0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: n2,
            value: u,
            onChange: (R) => f(R.target.value),
            children: a.map((R) => /* @__PURE__ */ c.jsxs("option", { value: $s(R), children: [
              R.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              R.label
            ] }, $s(R)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: a2, children: [
        /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "sm",
            onClick: M,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void z(),
            disabled: S || !T,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: d2, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: f2, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: g0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: u2, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: r2, children: m.map((R) => {
      const I = i && T && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: s2, children: [
        /* @__PURE__ */ c.jsx("span", { className: i2, children: m2(R.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: l2, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: o2, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: p0, children: R.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: c2,
            style: {
              background: `color-mix(in oklab, ${R.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: R.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: R.digest_before === "" || !R.digest_before ? "create" : R.operation_count === 0 ? "clear" : "update"
          }
        ),
        I && /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "xs",
            disabled: S || N !== null,
            onClick: async () => {
              if (!(!T || !R.chain_snapshot_json) && !(N !== null || S) && window.confirm(
                `Replay this ${R.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                C(R.entry_id);
                try {
                  await i(T, R.chain_snapshot_json, R);
                  const X = await mc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  y(X.entries);
                } catch (X) {
                  w(X instanceof Error ? X.message : "revert failed");
                } finally {
                  C(null);
                }
              }
            },
            children: N === R.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, R.entry_id);
    }) })
  ] });
}
function $s(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function m2(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var p2 = "_1uzgubz0", g2 = "_1uzgubz1", v2 = "_1uzgubz2", y2 = "_1uzgubz3", b2 = "_1uzgubz4", x2 = "_1uzgubz5", S2 = "_1uzgubz6", w2 = "_1uzgubz7", v0 = "_1uzgubz8", j2 = "_1uzgubz9", h1 = "_1uzgubza", m1 = "_1uzgubzb", E2 = "_1uzgubzc", N2 = "_1uzgubzd", yf = "_1uzgubze", bf = "_1uzgubzf", C2 = "_1uzgubzg", T2 = "_1uzgubzh", y0 = "_1uzgubzi", b0 = "_1uzgubzj", x0 = "_1uzgubzk", S0 = "_1uzgubzl", w0 = "_1uzgubzm", R2 = "_1uzgubzn", _2 = "_1uzgubzo", M2 = "_1uzgubzp", A2 = "_1uzgubzq";
function D2({
  characterName: t,
  color: a,
  lineCount: s,
  mapping: i,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: m,
  onAssignVoiceAsset: y,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [w, S] = g.useState(!1), j = i ? o.find((M) => M.voiceAssetId === i.speakerVoiceAssetId) : null, N = i?.defaultVectorPresetId ? u.find((M) => M.presetId === i.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), T = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${p2}${f ? ` ${g2}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: v2,
        onClick: m,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: y2,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: b2, children: [
            /* @__PURE__ */ c.jsx("span", { className: x2, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: S2, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: w2, children: [
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: v0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                j0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: v0, children: N.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: E2, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${j2} ${T ? h1 : m1}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: N2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: yf, children: [
        /* @__PURE__ */ c.jsx("span", { className: bf, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${C2}${w ? ` ${T2}` : ""}`,
            onDragEnter: (M) => {
              M.preventDefault(), S(!0);
            },
            onDragOver: (M) => M.preventDefault(),
            onDragLeave: () => S(!1),
            onDrop: (M) => {
              M.preventDefault(), S(!1);
              const z = M.dataTransfer.files?.[0];
              z && b && b(z);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (M) => {
                    const z = M.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: yf, children: [
        /* @__PURE__ */ c.jsx("span", { className: bf, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: y0, children: o.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${b0}${i?.speakerVoiceAssetId === M.voiceAssetId ? ` ${x0}` : ""}`,
            onClick: () => y(M.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: S0, children: M.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: w0, children: [
                M.durationMs != null ? j0(M.durationMs) : "—",
                " ",
                "·",
                " ",
                M.sampleRate ? `${M.sampleRate} Hz` : "—"
              ] })
            ]
          },
          M.voiceAssetId
        )) })
      ] }),
      u.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: yf, children: [
        /* @__PURE__ */ c.jsx("span", { className: bf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: y0, children: u.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${b0}${i?.defaultVectorPresetId === M.presetId ? ` ${x0}` : ""}`,
            onClick: () => p(M.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: S0, children: M.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: w0, children: "preset · vector" })
            ]
          },
          M.presetId
        )) })
      ] }),
      T && v && /* @__PURE__ */ c.jsx(Ke, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function j0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function k2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: A2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: R2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${_2} ${o ? h1 : m1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: M2, children: s })
  ] });
}
async function Ec() {
  return wt("/runtime/health");
}
async function z2() {
  await wt("/runtime/start", { method: "POST" });
}
async function O2() {
  return wt("/runtime/stop", { method: "POST" });
}
function p1(t) {
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
var L2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Rn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [L2[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var g1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, v1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, $2 = "_13bb4njb";
function Jr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [g1[a], v1[t], m ? $2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const U2 = 4e3;
function B2({ deployment: t }) {
  const [a, s] = g.useState(null), [i, o] = g.useState(null);
  g.useEffect(() => {
    let m = !1;
    const y = async () => {
      try {
        const b = await Ec();
        m || (s(b), o(null));
      } catch (b) {
        m || o(H2(b));
      }
    };
    y();
    const p = setInterval(y, U2);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", f = i?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: qR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Jr, { tone: V2(u), pulse: u === "starting" || u === "installing", children: p1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: I2(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    f && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "IndexTTS-2 model is not installed." }),
      " ",
      "Open ",
      /* @__PURE__ */ c.jsx("em", { children: "Settings → Dependencies → Install all" }),
      " to download the required artifacts, then retry."
    ] }),
    i && !f && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: i })
  ] });
}
function V2(t) {
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
function I2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function H2(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const Nc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Yc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ia = 1e-3;
function q2(t, a, s) {
  for (const i of Object.keys(Nc)) {
    const o = Nc[i];
    if (Math.abs(o.low - t) < Ia && Math.abs(o.mid - a) < Ia && Math.abs(o.high - s) < Ia)
      return i;
  }
  return "custom";
}
function F2(t) {
  let a = G2();
  for (const s of t.ops)
    a = Y2(a, s);
  return a;
}
function Y2(t, a) {
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
          preset: q2(a.low_db, a.mid_db, a.high_db)
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
function G2() {
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
function P2(t, a) {
  const s = Er(t, "gain");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = { id: _n(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(s, i) };
}
function K2(t, a, s, i) {
  const o = Er(t, "eq3");
  if (Math.abs(a) < Ia && Math.abs(s) < Ia && Math.abs(i) < Ia)
    return { ...t, ops: o };
  const u = {
    id: _n(),
    mode: "eq3",
    low_db: a,
    mid_db: s,
    high_db: i
  };
  return { ...t, ops: Nr(o, u) };
}
function X2(t, a) {
  const s = Er(t, "speed");
  if (Math.abs(a - 1) < Ia) return { ...t, ops: s };
  const i = { id: _n(), mode: "speed", factor: a };
  return { ...t, ops: Nr(s, i) };
}
function Q2(t, a) {
  const s = Er(t, "pitch_shift");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(s, i) };
}
function Z2(t, a, s) {
  const i = Er(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: _n(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Nr(i, o) };
}
function J2(t, a) {
  const s = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function W2(t, a) {
  const s = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function eM(t, a, s) {
  const i = Er(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: _n(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Nr(i, o) };
}
const y1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function b1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !y1.has(u.mode))
  };
  let o = P2({ version: 1, ops: [] }, a.volumeDb);
  return o = K2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = X2(o, a.speed.value)), o = Q2(o, a.pitchSt), o = Z2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = J2(o, a.fade.inS), o = W2(o, a.fade.outS), o = eM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function x1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => y1.has(s.mode))
  };
  return F2(a);
}
var tM = "_1rsa80i0", nM = "_1rsa80i1", aM = "_1rsa80i2", rM = "_1rsa80i3", sM = "_1rsa80i4", iM = "_1rsa80i5", lM = "_1rsa80i6", oM = "_1rsa80i7", cM = "_1rsa80i8", uM = "_1rsa80i9";
const S1 = ["flat", "warm", "bright", "voice", "telephone"], Wi = -12, Go = 12, dM = 0.5;
function fM(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Nc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const v = { low: a, mid: s, high: i, [p]: b }, w = mM(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: tM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: nM, role: "group", "aria-label": "EQ presets", children: [
      S1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: aM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: rM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: sM, children: [
      /* @__PURE__ */ c.jsx(
        xf,
        {
          label: "Low",
          value: a,
          onChange: (p) => y("low", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        xf,
        {
          label: "Mid",
          value: s,
          onChange: (p) => y("mid", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        xf,
        {
          label: "High",
          value: i,
          onChange: (p) => y("high", p),
          disabled: f
        }
      )
    ] })
  ] });
}
function xf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - Wi) / (Go - Wi) * 100, u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: iM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: lM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: Wi,
        max: Go,
        step: dM,
        value: a,
        disabled: i,
        className: cM,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": Wi,
        "aria-valuemax": Go,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: oM, children: hM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: uM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Wi }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Go
      ] })
    ] })
  ] });
}
function hM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const Sf = 1e-3;
function mM(t, a, s) {
  for (const i of S1) {
    const o = Nc[i];
    if (Math.abs(o.low - t) < Sf && Math.abs(o.mid - a) < Sf && Math.abs(o.high - s) < Sf)
      return i;
  }
  return "custom";
}
var pM = "_85bhwb0", gM = "_85bhwb1", E0 = "_85bhwb2", vM = "_85bhwb3", yM = "_85bhwb4", bM = "_85bhwb5", xM = "_85bhwb6", SM = "_85bhwb7";
const Po = 0.5, wf = 2, wM = 0.05;
function jM(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Po) / (wf - Po) * 100, y = g.useId(), p = (v) => o(v, s), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: pM, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: gM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: E0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: f,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: E0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: vM, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Po,
          max: wf,
          step: wM,
          value: s,
          disabled: f,
          className: yM,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Po,
          "aria-valuemax": wf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: bM, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: xM, children: [
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: SM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var EM = "kgszk50", NM = "kgszk51", N0 = "kgszk52", CM = "kgszk53", TM = "kgszk54", w1 = "kgszk55", RM = "kgszk56", _M = "kgszk58", Xh = "kgszk59", j1 = "kgszk5a", Qh = "kgszk5b", MM = "kgszk5c", AM = "kgszk5d", DM = "kgszk5e", C0 = "kgszk5f", T0 = "kgszk5g", R0 = "kgszk5h", kM = "kgszk5i", zM = "kgszk5j", OM = "kgszk5l", pl = "kgszk5m", gl = "kgszk5n";
const LM = -24, $M = 24, UM = 0.5, BM = -12, VM = 12, IM = 0.5, HM = -30, qM = -6, FM = -12, YM = 0, Ko = -60, jf = -20;
function Zh(t) {
  const {
    state: a,
    onChange: s,
    supportsSynthSpeed: i,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: m = !1,
    onApply: y,
    applyLabel: p = "Apply edit"
  } = t, b = (S) => {
    s({ ...a, ...S });
  }, v = XM(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: EM, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: NM, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: CM, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: N0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: N0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: TM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      _0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: LM,
        max: $M,
        step: UM,
        format: QM,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: gl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        fM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (S, j, N, C) => b({ eq3: { low: S, mid: j, high: N, preset: C } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: gl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        jM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: i,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      _0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: BM,
        max: VM,
        step: IM,
        format: ZM,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      GM,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      PM,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      KM,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: OM, children: [
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Yc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Ke, { variant: "primary", size: "md", onClick: y, disabled: m, children: p })
    ] }) : null
  ] });
}
function _0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: m, onChange: y, disabled: p } = t, b = (m - i) / (o - i) * 100, v = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: w1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: RM, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: _M, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: j1, children: s })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: i,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: Qh,
        style: { "--fill": `${b}%` },
        onChange: (w) => y(Number(w.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Xh, children: f(m) })
  ] });
}
function GM({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: HM, max: qM, step: 0.5, suffix: "LUFS" } : { min: FM, max: YM, step: 0.5, suffix: "dB" }, u = JM(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
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
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: gl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: MM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: AM,
          "data-active": t.mode === y,
          disabled: s || p,
          onClick: () => m(y),
          title: p ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            y,
            p ? " (soon)" : ""
          ]
        },
        y
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: w1, children: [
      /* @__PURE__ */ c.jsx("span", { className: j1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: Qh,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Xh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function PM({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = g.useId(), u = g.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: gl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: DM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: C0, children: [
        /* @__PURE__ */ c.jsx("label", { className: T0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: R0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: C0, children: [
        /* @__PURE__ */ c.jsx("label", { className: T0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: R0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function KM({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Ko) / (jf - Ko) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: gl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: kM, children: [
      /* @__PURE__ */ c.jsxs("label", { className: zM, children: [
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
          min: Ko,
          max: jf,
          step: 1,
          value: a,
          disabled: i || !t,
          className: Qh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": jf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Xh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Us = 1e-3;
function XM(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Us && a.push("gain"), (Math.abs(t.eq3.low) >= Us || Math.abs(t.eq3.mid) >= Us || Math.abs(t.eq3.high) >= Us) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Us && a.push("speed"), Math.abs(t.pitchSt) >= Us && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function QM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function ZM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function JM(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var WM = "skdk4g0", eA = "skdk4g1", M0 = "skdk4g2", tA = "skdk4g3", nA = "skdk4g4", aA = "skdk4g5", rA = "skdk4g6", sA = "skdk4g7", iA = "skdk4g8", lA = "skdk4g9", oA = "skdk4ga", cA = "skdk4gb", uA = "skdk4gc", dA = "skdk4gd", A0 = "skdk4ge", D0 = "skdk4gf", fA = "skdk4gg", k0 = "skdk4gh", z0 = "skdk4gi", hA = "skdk4gj", mA = "skdk4gk", pA = "skdk4gl", O0 = "skdk4gm", gA = "skdk4gn", L0 = "skdk4go", vA = "skdk4gp", yA = "skdk4gq", bA = "skdk4gr", xA = "skdk4gs", SA = "skdk4gt", wA = "skdk4gu", jA = "skdk4gv", $0 = "skdk4gw", EA = "skdk4gx", NA = "skdk4gy", CA = "skdk4gz", TA = "skdk4g10", RA = "cgsfgh1", _A = "cgsfgh2", MA = "cgsfgh3", AA = "cgsfgh4", DA = "cgsfgh5", kA = "cgsfgh6", zA = "cgsfgh7", OA = "cgsfgh8", LA = "cgsfgh9", $A = "cgsfgha", UA = "cgsfghb", BA = "cgsfghc", VA = "cgsfghd", IA = "cgsfghe", HA = "cgsfghm", qA = "cgsfghn", FA = "cgsfgho", YA = "cgsfghp";
const Xt = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], vl = {
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
}, E1 = 0.05;
function GA(t) {
  let a = null, s = -1 / 0;
  for (const i of Xt) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= E1 ? null : a;
}
function N1(t, a = 3) {
  return Xt.map((s) => ({ key: s, label: vl[s], value: t[s] })).filter((s) => s.value > E1).sort((s, i) => i.value - s.value).slice(0, a);
}
function PA(t) {
  let a = 0;
  for (const s of Xt) a += t[s] * t[s];
  return Math.sqrt(a);
}
function U0(t) {
  const a = N1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? Ef(s.label) : `${Ef(s.label)} + ${i.label.toLowerCase()}`;
}
function Ef(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Wr(t) {
  const a = { ...Zs };
  for (const s of Xt) {
    const i = t[s];
    a[s] = Number.isFinite(i) ? Math.max(0, Math.min(1, i)) : 0;
  }
  return a;
}
const B0 = 0.05, V0 = 0.2, KA = 22, XA = 320, Nf = 0.78;
function Cf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function QA(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = g.useState(a), [m, y] = g.useState(null), [p, b] = g.useState(null), v = g.useRef(null), w = g.useRef(a), S = g.useRef(o), j = g.useRef(null), N = g.useRef(0);
  S.current = o, g.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const C = g.useCallback(
    (V) => {
      const D = Wr(V);
      f(D), w.current = D, s(D);
    },
    [s]
  ), T = g.useCallback((V) => {
    const D = Wr(V);
    f(D), w.current = D;
  }, []), M = g.useCallback(
    (V) => {
      const D = v.current;
      if (!D || S.current) return;
      const H = V.clientX - D.centerX, te = V.clientY - D.centerY, K = i / 2 * Nf, le = Cf(H, te, D.angle, K), re = { ...w.current, [D.axis]: le };
      T(re);
    },
    [i, T]
  ), z = g.useCallback(
    (V) => {
      const D = v.current;
      if (D) {
        if (window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), S.current) {
          const H = V.clientX - D.centerX, te = V.clientY - D.centerY, K = i / 2 * Nf, le = Cf(H, te, D.angle, K), re = { ...w.current, [D.axis]: le };
          v.current = null, C(re);
          return;
        }
        v.current = null, C(w.current);
      }
    },
    [C, M, i]
  );
  g.useEffect(() => () => {
    window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [M, z]);
  const R = g.useCallback((V, D) => {
    S.current || (N.current += 1, b({ x: V, y: D, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, XA));
  }, []), I = g.useCallback(
    (V, D, H, te, K) => {
      const le = H.getBoundingClientRect(), re = le.left + le.width / 2, k = le.top + le.height / 2, q = Xt.indexOf(V) / Xt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: V,
        pointerId: D,
        centerX: re,
        centerY: k,
        angle: q
      }, y(V), te !== void 0 && K !== void 0) {
        const F = te - re, ce = K - k, _ = i / 2 * Nf, ne = Cf(F, ce, q, _), J = { ...w.current, [V]: ne };
        S.current ? C(J) : T(J);
      }
      window.addEventListener("pointermove", M), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [C, M, z, i, T]
  ), X = g.useCallback(
    (V, D) => {
      D.preventDefault();
      const H = D.currentTarget, te = H.ownerSVGElement ?? H;
      I(V, D.pointerId, te);
    },
    [I]
  ), ie = g.useCallback(
    (V) => {
      const D = V.currentTarget, H = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, te = H.getBoundingClientRect(), K = te.left + te.width / 2, le = te.top + te.height / 2, re = V.clientX - K, k = V.clientY - le;
      if (Math.sqrt(re * re + k * k) < 8) return;
      let q = Math.atan2(k, re) * 180 / Math.PI;
      q = ((q + 90) % 360 + 360) % 360;
      let F = null, ce = 999;
      for (let J = 0; J < Xt.length; J++) {
        const Y = Xt[J];
        if (!Y) continue;
        const U = J / Xt.length * 360, W = Math.abs((U - q + 540) % 360 - 180);
        W < ce && (ce = W, F = Y);
      }
      if (!F || ce > KA) return;
      V.preventDefault();
      const _ = (V.clientX - te.left) / te.width * i, ne = (V.clientY - te.top) / te.height * i;
      R(_, ne), I(F, V.pointerId, H, V.clientX, V.clientY);
    },
    [I, i, R]
  ), A = g.useCallback(
    (V, D) => {
      const H = w.current[V];
      let te = H;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          te = H + B0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          te = H - B0;
          break;
        case "PageUp":
          te = H + V0;
          break;
        case "PageDown":
          te = H - V0;
          break;
        case "Home":
          te = 0;
          break;
        case "End":
          te = 1;
          break;
        default:
          return;
      }
      D.preventDefault(), y(V), C({ ...w.current, [V]: te });
    },
    [C]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: y,
    onPointerDown: X,
    onKeyDown: A,
    onSurfacePointerDown: ie,
    surfacePing: p
  };
}
const ZA = [0.25, 0.5, 0.75, 1];
function JA({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = QA({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = g.useMemo(() => WA(f, m, y), [f, m, y]), b = g.useMemo(() => Xt.map((v, w) => {
    const S = pc(u.liveVec[v]), j = p[w];
    return j ? `${f + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: RA, children: /* @__PURE__ */ c.jsx("div", { className: _A, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: MA,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        ZA.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: AA,
            cx: f,
            cy: m,
            r: y * v
          },
          v
        )),
        Xt.map((v, w) => {
          const S = p[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = m + S.dy * 1.18, C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: DA,
                x1: f,
                y1: m,
                x2: f + S.dx,
                y2: m + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${VA}${C ? ` ${IA}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: vl[v]
              }
            )
          ] }, v);
        }),
        Xt.map((v, w) => {
          const S = pc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = p[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${zA}${N ? ` ${OA}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * S,
              y2: m + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: kA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: BA,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && Xt.map((v, w) => {
          const S = pc(u.liveVec[v]), j = p[w];
          if (!j) return null;
          const N = f + j.dx * S, C = m + j.dy * S, T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: LA,
                cx: N,
                cy: C,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${vl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (M) => u.onPointerDown(v, M),
                onKeyDown: (M) => u.onKeyDown(v, M),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${$A}${T ? ` ${UA}` : ""}`,
                cx: N,
                cy: C,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function WA(t, a, s) {
  return Xt.map((i, o) => {
    const u = o / Xt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function pc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function e3({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = g.useMemo(() => Xt.map((f, m) => {
    const y = pc(t[f]), p = m / Xt.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, v = i + Math.sin(p) * o * y;
    return `${b},${v}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: HA, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: qA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: FA, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: YA, points: u })
      ]
    }
  ) });
}
var t3 = "_1jqr3aj0", n3 = "_1jqr3aj1", a3 = "_1jqr3aj2", r3 = "_1jqr3aj3", s3 = "_1jqr3aj4", i3 = "_1jqr3aj5", l3 = "_1jqr3aj6", o3 = "_1jqr3aj7";
const I0 = 0.05, H0 = 0.2;
function c3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = g.useState(null), f = g.useRef(null), m = g.useRef(/* @__PURE__ */ new Map()), y = g.useCallback(
    (j, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Wr({ ...t, [j]: C }));
    },
    [a, t]
  ), p = g.useCallback((j, N) => {
    const C = m.current.get(j);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), b = g.useCallback(
    (j, N) => {
      if (s) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && m.current.set(j, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), y(j, p(j, N.clientX));
    },
    [s, y, p]
  ), v = g.useCallback(
    (j, N) => {
      s || i || f.current === j && y(j, p(j, N.clientX));
    },
    [s, i, y, p]
  ), w = g.useCallback(
    (j, N) => {
      if (f.current === j) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        f.current = null, m.current.delete(j);
      }
    },
    []
  ), S = g.useCallback(
    (j, N) => {
      if (s) return;
      const C = t[j] ?? 0;
      let T = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = C + I0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = C - I0;
          break;
        case "PageUp":
          T = C + H0;
          break;
        case "PageDown":
          T = C - H0;
          break;
        case "Home":
          T = 0;
          break;
        case "End":
          T = 1;
          break;
        default:
          return;
      }
      N.preventDefault(), u(j), y(j, T);
    },
    [s, y, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: t3, role: "group", "aria-label": "Emotion axis sliders", children: Xt.map((j) => {
    const N = u3(t[j] ?? 0), C = N > 0.05, T = o === j, M = vl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${n3}${C ? ` ${a3}` : ""}${T ? ` ${r3}` : ""}`,
        role: "slider",
        "aria-label": `${M} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (z) => b(j, z),
        onPointerMove: (z) => v(j, z),
        onPointerUp: (z) => w(j, z),
        onPointerCancel: (z) => w(j, z),
        onKeyDown: (z) => S(j, z),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: s3, children: M }),
          /* @__PURE__ */ c.jsx("span", { className: i3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: l3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: o3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function u3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var q0 = "gvwvwg0", d3 = "gvwvwg2", f3 = "gvwvwg3", h3 = "gvwvwg8", m3 = "gvwvwg9", p3 = "gvwvwga", g3 = "gvwvwgb", v3 = "gvwvwgc", y3 = "gvwvwgd", b3 = "gvwvwge";
function x3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsx("span", { className: d3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: f3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsx("span", { className: b3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: h3, children: t.map((o) => {
      const u = S3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${m3}${f ? ` ${g3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: p3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(e3, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: v3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: y3,
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
function S3(t) {
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
function Tf(t) {
  return rh.map((a) => t[a] ?? 0);
}
const w3 = [
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
], j3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], E3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], N3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function C3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Zs };
  const i = a.split(/\s+/).some((f) => j3.includes(f)) ? 1.2 : 1, o = E3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Zs };
  for (const f of w3) {
    let m = 0;
    for (const y of f.keywords) {
      const p = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), C = S.slice(j >= 0 ? j : 0).slice(-30);
      N3.some((T) => new RegExp(`\\b${T}\\b`).test(C)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return Xt.every((f) => u[f] === 0) && (u.calm = 0.4), Wr(u);
}
const T3 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function R3({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "none", f = g.useMemo(() => _3(t.vector), [t.vector]), m = t.emotionAlpha ?? 1, [y, p] = g.useState(null), [b, v] = g.useState(!1), [w, S] = g.useState(null), [j, N] = g.useState(""), [C, T] = g.useState(!1), M = g.useRef(!0);
  g.useEffect(() => (M.current = !0, () => {
    M.current = !1;
  }), []), g.useEffect(() => {
    C || N(U0(f));
  }, [f, C]);
  const z = ($) => {
    a({ ...t, mode: $ });
  }, R = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Tf($)
    }), w && S(null);
  }, I = () => {
    R(Wr(Zs));
  }, X = ($) => {
    const q = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: q });
  }, ie = async () => {
    const $ = j.trim();
    if ($) {
      v(!0), p(null);
      try {
        const q = await J_(s, $, Tf(f));
        if (!M.current) return;
        o(
          M3([q, ...i.filter((F) => F.presetId !== q.presetId)])
        ), S(q.presetId), T(!1);
      } catch (q) {
        M.current && p(F0(q));
      } finally {
        M.current && v(!1);
      }
    }
  }, A = async ($) => {
    const q = [...i];
    o(i.filter((F) => F.presetId !== $)), w === $ && S(null);
    try {
      await W_(s, $);
    } catch (F) {
      M.current && (o(q), p(F0(F)));
    }
  }, V = ($) => {
    S($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, D = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, H = GA(f), te = PA(f), K = N1(f, 3), le = K.length > 0 && j.trim().length > 0 && !b, re = U0(f) || "name your preset…", k = u !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: WM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: eA, children: [
      /* @__PURE__ */ c.jsx("span", { className: M0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: tA, role: "radiogroup", "aria-label": "Emotion mode", children: T3.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": u === $.id,
          className: `${nA}${u === $.id ? ` ${aA}` : ""}`,
          onClick: () => z($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    u === "none" && /* @__PURE__ */ c.jsxs("div", { className: L0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    u === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: L0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: hA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: mA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => D($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: pA, children: [
        /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const q = C3($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Tf(q)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: O0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: O0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (u === "emotion_vector" || u === "none" || u === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: dA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${o0} ${rA}`, children: /* @__PURE__ */ c.jsx(
        JA,
        {
          vec: f,
          onChange: R,
          readOnly: k
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${o0} ${sA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: iA, children: [
          /* @__PURE__ */ c.jsx("span", { className: M0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: lA, children: H ? vl[H].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: oA, children: [
            "‖v‖ = ",
            te.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(c3, { vec: f, onChange: R, readOnly: k }),
        /* @__PURE__ */ c.jsx("div", { className: cA, children: /* @__PURE__ */ c.jsxs(
          Ke,
          {
            variant: "ghost",
            size: "sm",
            onClick: I,
            disabled: k || te < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: uA,
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
    u === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: A0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: D0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: fA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: m,
            className: k0,
            style: { "--fill": `${m * 10}%` },
            onChange: ($) => X(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: z0, children: [
          (m * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${vA}${K.length === 0 ? ` ${yA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: bA, children: [
              /* @__PURE__ */ c.jsx("span", { className: xA, children: "Save current as preset" }),
              K.length === 0 && /* @__PURE__ */ c.jsx("span", { className: SA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: wA, children: [
              /* @__PURE__ */ c.jsx("div", { className: jA, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${$0} ${NA}`, children: "no axes set" }) : K.map(($) => /* @__PURE__ */ c.jsxs("span", { className: $0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: EA, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: CA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: TA,
                    placeholder: re,
                    value: j,
                    disabled: K.length === 0 || b,
                    onChange: ($) => {
                      N($.target.value), T(!0);
                    },
                    onKeyDown: ($) => {
                      $.key === "Enter" && le && ie();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Ke,
                  {
                    variant: "primary",
                    disabled: !le,
                    onClick: ie,
                    children: b ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        x3,
        {
          presets: i,
          activePresetId: w,
          onSelect: V,
          onDelete: A
        }
      )
    ] }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: A0, children: [
      /* @__PURE__ */ c.jsx("span", { className: D0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: m,
          className: k0,
          style: { "--fill": `${m * 10}%` },
          onChange: ($) => X(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: z0, children: [
        (m * 100).toFixed(0),
        "%"
      ] })
    ] }),
    y && /* @__PURE__ */ c.jsx("div", { className: gA, children: y })
  ] });
}
function _3(t) {
  if (!t || !Array.isArray(t)) return Wr(Zs);
  const a = { ...Zs };
  return Xt.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function M3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function F0(t) {
  return t instanceof ti || t instanceof Error ? t.message : "Unknown error";
}
var A3 = "_5u1uau0", el = "_5u1uau1", D3 = "_5u1uau2", Bs = "_5u1uau3", tl = "_5u1uau4", k3 = "_5u1uau5", Rf = "_5u1uau6", z3 = "_5u1uau7", O3 = "_5u1uau8", L3 = "_5u1uau9", $3 = "_5u1uaua", U3 = "_5u1uaub", B3 = "_5u1uauc", V3 = "_5u1uaud", I3 = "_5u1uaue", Y0 = "_5u1uauf", G0 = "_5u1uaug", H3 = "_5u1uauh";
const _f = [
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
], q3 = ["mp3", "wav", "flac"], Xo = 0.5, Mf = 2, F3 = 0.05, Y3 = 0.8, G3 = 0.8, P0 = 42;
function Qo(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function P3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: m
}) {
  const y = g.useId(), p = g.useId(), b = g.useId(), v = g.useId(), w = g.useId(), S = (I, X) => {
    m({ ...f, [I]: X });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (I) => {
    if (I !== j)
      if (I === "random") {
        const X = { ...f };
        delete X.seed, m(X);
      } else {
        const X = Qo(f, "seed", P0);
        m({ ...f, seed: X });
      }
  }, C = _f.find((I) => I.id === o) ?? _f[0], T = (s - Xo) / (Mf - Xo) * 100, M = Qo(f, "temperature", Y3), z = Qo(f, "top_p", G3), R = Qo(f, "seed", P0);
  return /* @__PURE__ */ c.jsxs("div", { className: A3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Bs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: k3,
          value: t,
          onChange: (I) => a(I.currentTarget.value),
          children: q3.map((I) => /* @__PURE__ */ c.jsx("option", { value: I, children: I }, I))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Bs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${tl} ${z3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: O3,
            min: Xo,
            max: Mf,
            step: F3,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (I) => i(Number(I.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": Mf,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: L3, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: D3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: $3, children: _f.map((I) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === I.id,
          className: U3,
          onClick: () => u(I.id),
          title: I.help,
          children: I.label
        },
        I.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: B3, "aria-live": "polite", children: C.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: V3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bs, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Rf,
          min: 0,
          max: 2,
          step: 0.05,
          value: M,
          onChange: (I) => S("temperature", Number(I.currentTarget.value))
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
          className: Rf,
          min: 0,
          max: 1,
          step: 0.05,
          value: z,
          onChange: (I) => S("top_p", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${tl} ${I3}`,
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
                className: `${Y0} ${j === "random" ? G0 : ""}`,
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
                className: Rf,
                step: 1,
                value: R,
                onChange: (I) => S("seed", Math.trunc(Number(I.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: H3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var K3 = "iv43qk0", K0 = "iv43qk1", X3 = "iv43qk2", X0 = "iv43qk3", Q3 = "iv43qk4", Z3 = "iv43qk5", J3 = "iv43qk6", W3 = "iv43qk7", e5 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, t5 = "iv43qkd", n5 = "iv43qke", Af = "iv43qkf", Df = "iv43qkg";
function a5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: t5, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: n5, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Af, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Af, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Af, children: [
        /* @__PURE__ */ c.jsx("span", { className: Df, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: K3, children: t.map((f) => /* @__PURE__ */ c.jsx(
      r5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function r5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${K0} ${X3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: X0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: J3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: K0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: X0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: Q3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: Z3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${W3} ${e5[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var s5 = "_46z95i0", i5 = "_46z95i1", l5 = "_46z95i2", o5 = "_46z95i3", c5 = "_46z95i4", u5 = "_46z95i5", d5 = "_46z95i6";
const f5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function h5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: s5, children: [
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
function kf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: m }) {
  const y = (f - s) / (i - s) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: i5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: l5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: o5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: c5, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: s,
        max: i,
        step: o,
        value: f,
        className: u5,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: d5, children: u(f) })
  ] });
}
var m5 = "qe93dj0", p5 = "qe93dj1", g5 = "qe93dj2", v5 = "qe93dj3", y5 = "qe93dj4", b5 = "qe93dj5", x5 = "qe93dj6", S5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, w5 = "qe93dja", j5 = "qe93djb";
function E5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: m5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: p5, children: [
      /* @__PURE__ */ c.jsx("span", { className: g5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: v5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: y5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: b5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${x5} ${S5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: w5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: j5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var Q0 = "_17fbpt30", Z0 = "_17fbpt31", J0 = "_17fbpt32", N5 = "_17fbpt33", C5 = "_17fbpt34", T5 = "_17fbpt35", W0 = "_17fbpt36", R5 = "_17fbpt37", _5 = "_17fbpt38";
const M5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function A5({
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
    /* @__PURE__ */ c.jsx("p", { className: R5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: _5, children: o ?? "Hit Generate to enqueue a batch." })
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
    /* @__PURE__ */ c.jsx("ul", { className: N5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: C5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: T5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${g1.sm} ${v1[M5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: W0, children: D5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: W0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function D5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const C1 = g.createContext({});
function Jh(t) {
  const a = g.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const k5 = typeof window < "u", T1 = k5 ? g.useLayoutEffect : g.useEffect, Gc = /* @__PURE__ */ g.createContext(null);
function z5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function O5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const wr = (t, a, s) => s > a ? a : s < t ? t : s;
function eb(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Nl = () => {
}, Js = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Nl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(eb(a, s));
}, Js = (t, a, s) => {
  if (!t)
    throw new Error(eb(a, s));
});
const jr = {}, R1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function L5(t) {
  return typeof t == "object" && t !== null;
}
const _1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function M1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ni = /* @__NO_SIDE_EFFECTS__ */ (t) => t, $5 = (t, a) => (s) => a(t(s)), Pc = (...t) => t.reduce($5), A1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class D1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return z5(this.subscriptions, a), () => O5(this.subscriptions, a);
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
const ta = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ca = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function k1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const z1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, U5 = 1e-7, B5 = 12;
function V5(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = z1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > U5 && ++m < B5);
  return f;
}
function Cl(t, a, s, i) {
  if (t === a && s === i)
    return ni;
  const o = (u) => V5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : z1(o(u), a, i);
}
const O1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, L1 = (t) => (a) => 1 - t(1 - a), $1 = /* @__PURE__ */ Cl(0.33, 1.53, 0.69, 0.99), Wh = /* @__PURE__ */ L1($1), U1 = /* @__PURE__ */ O1(Wh), B1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Wh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), em = (t) => 1 - Math.sin(Math.acos(t)), I5 = L1(em), V1 = O1(em), H5 = /* @__PURE__ */ Cl(0.42, 0, 1, 1), q5 = /* @__PURE__ */ Cl(0, 0, 0.58, 1), I1 = /* @__PURE__ */ Cl(0.42, 0, 0.58, 1), F5 = (t) => Array.isArray(t) && typeof t[0] != "number", H1 = (t) => Array.isArray(t) && typeof t[0] == "number", tb = {
  linear: ni,
  easeIn: H5,
  easeInOut: I1,
  easeOut: q5,
  circIn: em,
  circInOut: V1,
  circOut: I5,
  backIn: Wh,
  backInOut: U1,
  backOut: $1,
  anticipate: B1
}, Y5 = (t) => typeof t == "string", nb = (t) => {
  if (H1(t)) {
    Js(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return Cl(a, s, i, o);
  } else if (Y5(t))
    return Js(tb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), tb[t];
  return t;
}, Zo = [
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
function G5(t, a) {
  let s = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function y(b) {
    f.has(b) && (p.schedule(b), t()), b(m);
  }
  const p = {
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
      if (m = b, o) {
        u = !0;
        return;
      }
      o = !0;
      const v = s;
      s = i, i = v, s.forEach(y), s.clear(), o = !1, u && (u = !1, p.process(b));
    }
  };
  return p;
}
const P5 = 40;
function q1(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = Zo.reduce((z, R) => (z[R] = G5(u), z), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const z = jr.useManualTiming, R = z ? o.timestamp : performance.now();
    s = !1, z || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, P5), 1)), o.timestamp = R, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, C = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: Zo.reduce((z, R) => {
    const I = f[R];
    return z[R] = (X, ie = !1, A = !1) => (s || C(), I.schedule(X, ie, A)), z;
  }, {}), cancel: (z) => {
    for (let R = 0; R < Zo.length; R++)
      f[Zo[R]].cancel(z);
  }, state: o, steps: f };
}
const { schedule: na, cancel: sh, state: Cc } = /* @__PURE__ */ q1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ni, !0);
let gc;
function K5() {
  gc = void 0;
}
const In = {
  now: () => (gc === void 0 && In.set(Cc.isProcessing || jr.useManualTiming ? Cc.timestamp : performance.now()), gc),
  set: (t) => {
    gc = t, queueMicrotask(K5);
  }
}, F1 = (t) => (a) => typeof a == "string" && a.startsWith(t), Y1 = /* @__PURE__ */ F1("--"), X5 = /* @__PURE__ */ F1("var(--"), tm = (t) => X5(t) ? Q5.test(t.split("/*")[0].trim()) : !1, Q5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ab(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ai = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...ai,
  transform: (t) => wr(0, 1, t)
}, Jo = {
  ...ai,
  default: 1
}, dl = (t) => Math.round(t * 1e5) / 1e5, nm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Z5(t) {
  return t == null;
}
const J5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, am = (t, a) => (s) => !!(typeof s == "string" && J5.test(s) && s.startsWith(t) || a && !Z5(s) && Object.prototype.hasOwnProperty.call(s, a)), G1 = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(nm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, W5 = (t) => wr(0, 255, t), zf = {
  ...ai,
  transform: (t) => Math.round(W5(t))
}, Pr = {
  test: /* @__PURE__ */ am("rgb", "red"),
  parse: /* @__PURE__ */ G1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + zf.transform(t) + ", " + zf.transform(a) + ", " + zf.transform(s) + ", " + dl(yl.transform(i)) + ")"
};
function eD(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const ih = {
  test: /* @__PURE__ */ am("#"),
  parse: eD,
  transform: Pr.transform
}, Tl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Tl("deg"), Ks = /* @__PURE__ */ Tl("%"), De = /* @__PURE__ */ Tl("px"), tD = /* @__PURE__ */ Tl("vh"), nD = /* @__PURE__ */ Tl("vw"), rb = {
  ...Ks,
  parse: (t) => Ks.parse(t) / 100,
  transform: (t) => Ks.transform(t * 100)
}, Gs = {
  test: /* @__PURE__ */ am("hsl", "hue"),
  parse: /* @__PURE__ */ G1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Ks.transform(dl(a)) + ", " + Ks.transform(dl(s)) + ", " + dl(yl.transform(i)) + ")"
}, Kt = {
  test: (t) => Pr.test(t) || ih.test(t) || Gs.test(t),
  parse: (t) => Pr.test(t) ? Pr.parse(t) : Gs.test(t) ? Gs.parse(t) : ih.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Pr.transform(t) : Gs.transform(t),
  getAnimatableNone: (t) => {
    const a = Kt.parse(t);
    return a.alpha = 0, Kt.transform(a);
  }
}, aD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function rD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(nm)?.length || 0) + (t.match(aD)?.length || 0) > 0;
}
const P1 = "number", K1 = "color", sD = "var", iD = "var(", sb = "${}", lD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ws(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(lD, (y) => (Kt.test(y) ? (i.color.push(u), o.push(K1), s.push(Kt.parse(y))) : y.startsWith(iD) ? (i.var.push(u), o.push(sD), s.push(y)) : (i.number.push(u), o.push(P1), s.push(parseFloat(y))), ++u, sb)).split(sb);
  return { values: s, split: m, indexes: i, types: o };
}
function oD(t) {
  return Ws(t).values;
}
function X1({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === P1 ? o += dl(i[u]) : f === K1 ? o += Kt.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function cD(t) {
  return X1(Ws(t));
}
const uD = (t) => typeof t == "number" ? 0 : Kt.test(t) ? Kt.getAnimatableNone(t) : t, dD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : uD(t);
function fD(t) {
  const a = Ws(t);
  return X1(a)(a.values.map((i, o) => dD(i, a.split[o])));
}
const ua = {
  test: rD,
  parse: oD,
  createTransformer: cD,
  getAnimatableNone: fD
};
function Of(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function hD({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const m = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - m;
    o = Of(y, m, t + 1 / 3), u = Of(y, m, t), f = Of(y, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function Tc(t, a) {
  return (s) => s > 0 ? a : t;
}
const Rl = (t, a, s) => t + (a - t) * s, Lf = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, mD = [ih, Pr, Gs], pD = (t) => mD.find((a) => a.test(t));
function ib(t) {
  const a = pD(t);
  if (Nl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Gs && (s = hD(s)), s;
}
const lb = (t, a) => {
  const s = ib(t), i = ib(a);
  if (!s || !i)
    return Tc(t, a);
  const o = { ...s };
  return (u) => (o.red = Lf(s.red, i.red, u), o.green = Lf(s.green, i.green, u), o.blue = Lf(s.blue, i.blue, u), o.alpha = Rl(s.alpha, i.alpha, u), Pr.transform(o));
}, lh = /* @__PURE__ */ new Set(["none", "hidden"]);
function gD(t, a) {
  return lh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function vD(t, a) {
  return (s) => Rl(t, a, s);
}
function rm(t) {
  return typeof t == "number" ? vD : typeof t == "string" ? tm(t) ? Tc : Kt.test(t) ? lb : xD : Array.isArray(t) ? Q1 : typeof t == "object" ? Kt.test(t) ? lb : yD : Tc;
}
function Q1(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => rm(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function yD(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = rm(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function bD(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const xD = (t, a) => {
  const s = ua.createTransformer(a), i = Ws(t), o = Ws(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? lh.has(t) && !o.values.length || lh.has(a) && !i.values.length ? gD(t, a) : Pc(Q1(bD(i, o), o.values), s) : (Nl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Tc(t, a));
};
function Z1(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Rl(t, a, s) : rm(t)(t, a);
}
const SD = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => na.update(a, s),
    stop: () => sh(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Cc.isProcessing ? Cc.timestamp : In.now()
  };
}, J1 = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Rc = 2e4;
function sm(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < Rc; )
    a += s, i = t.next(a);
  return a >= Rc ? 1 / 0 : a;
}
function wD(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(sm(i), Rc);
  return {
    type: "keyframes",
    ease: (u) => i.next(o * u).value / a,
    duration: /* @__PURE__ */ ca(o)
  };
}
const kt = {
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
const jD = 12;
function ED(t, a, s) {
  let i = s;
  for (let o = 1; o < jD; o++)
    i = i - t(i) / a(i);
  return i;
}
const $f = 1e-3;
function ND({ duration: t = kt.duration, bounce: a = kt.bounce, velocity: s = kt.velocity, mass: i = kt.mass }) {
  let o, u;
  Nl(t <= /* @__PURE__ */ ta(kt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(kt.minDamping, kt.maxDamping, f), t = wr(kt.minDuration, kt.maxDuration, /* @__PURE__ */ ca(t)), f < 1 ? (o = (p) => {
    const b = p * f, v = b * t, w = b - s, S = oh(p, f), j = Math.exp(-v);
    return $f - w / S * j;
  }, u = (p) => {
    const v = p * f * t, w = v * s + s, S = Math.pow(f, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), N = oh(Math.pow(p, 2), f);
    return (-o(p) + $f > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - s) * t + 1;
    return -$f + b * v;
  }, u = (p) => {
    const b = Math.exp(-p * t), v = (s - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, y = ED(o, u, m);
  if (t = /* @__PURE__ */ ta(t), isNaN(y))
    return {
      stiffness: kt.stiffness,
      damping: kt.damping,
      duration: t
    };
  {
    const p = Math.pow(y, 2) * i;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(i * p),
      duration: t
    };
  }
}
const CD = ["duration", "bounce"], TD = ["stiffness", "damping", "mass"];
function ob(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function RD(t) {
  let a = {
    velocity: kt.velocity,
    stiffness: kt.stiffness,
    damping: kt.damping,
    mass: kt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ob(t, TD) && ob(t, CD))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: kt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = ND({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: kt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function _c(t = kt.visualDuration, a = kt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = RD({
    ...s,
    velocity: -/* @__PURE__ */ ca(s.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(y * b)), C = f - u, T = /* @__PURE__ */ ca(Math.sqrt(y / b)), M = Math.abs(C) < 5;
  i || (i = M ? kt.restSpeed.granular : kt.restSpeed.default), o || (o = M ? kt.restDelta.granular : kt.restDelta.default);
  let z, R, I, X, ie, A;
  if (N < 1)
    I = oh(T, N), X = (j + N * T * C) / I, z = (D) => {
      const H = Math.exp(-N * T * D);
      return f - H * (X * Math.sin(I * D) + C * Math.cos(I * D));
    }, ie = N * T * X + C * I, A = N * T * C - X * I, R = (D) => Math.exp(-N * T * D) * (ie * Math.sin(I * D) + A * Math.cos(I * D));
  else if (N === 1) {
    z = (H) => f - Math.exp(-T * H) * (C + (j + T * C) * H);
    const D = j + T * C;
    R = (H) => Math.exp(-T * H) * (T * D * H - j);
  } else {
    const D = T * Math.sqrt(N * N - 1);
    z = (le) => {
      const re = Math.exp(-N * T * le), k = Math.min(D * le, 300);
      return f - re * ((j + N * T * C) * Math.sinh(k) + D * C * Math.cosh(k)) / D;
    };
    const H = (j + N * T * C) / D, te = N * T * H - C * D, K = N * T * C - H * D;
    R = (le) => {
      const re = Math.exp(-N * T * le), k = Math.min(D * le, 300);
      return re * (te * Math.sinh(k) + K * Math.cosh(k));
    };
  }
  const V = {
    calculatedDuration: S && v || null,
    velocity: (D) => /* @__PURE__ */ ta(R(D)),
    next: (D) => {
      if (!S && N < 1) {
        const te = Math.exp(-N * T * D), K = Math.sin(I * D), le = Math.cos(I * D), re = f - te * (X * K + C * le), k = /* @__PURE__ */ ta(te * (ie * K + A * le));
        return m.done = Math.abs(k) <= i && Math.abs(f - re) <= o, m.value = m.done ? f : re, m;
      }
      const H = z(D);
      if (S)
        m.done = D >= v;
      else {
        const te = /* @__PURE__ */ ta(R(D));
        m.done = Math.abs(te) <= i && Math.abs(f - H) <= o;
      }
      return m.value = m.done ? f : H, m;
    },
    toString: () => {
      const D = Math.min(sm(V), Rc), H = J1((te) => V.next(D * te).value, D, 30);
      return D + "ms " + H;
    },
    toTransition: () => {
    }
  };
  return V;
}
_c.applyToOptions = (t) => {
  const a = wD(t, 100, _c);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const _D = 5;
function W1(t, a, s) {
  const i = Math.max(a - _D, 0);
  return k1(s - t(i), a - i);
}
function ch({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: y, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (A) => m !== void 0 && A < m || y !== void 0 && A > y, j = (A) => m === void 0 ? y : y === void 0 || Math.abs(m - A) < Math.abs(y - A) ? m : y;
  let N = s * a;
  const C = v + N, T = f === void 0 ? C : f(C);
  T !== C && (N = T - v);
  const M = (A) => -N * Math.exp(-A / i), z = (A) => T + M(A), R = (A) => {
    const V = M(A), D = z(A);
    w.done = Math.abs(V) <= p, w.value = w.done ? T : D;
  };
  let I, X;
  const ie = (A) => {
    S(w.value) && (I = A, X = _c({
      keyframes: [w.value, j(w.value)],
      velocity: W1(z, A, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ie(0), {
    calculatedDuration: null,
    next: (A) => {
      let V = !1;
      return !X && I === void 0 && (V = !0, R(A), ie(A)), I !== void 0 && A >= I ? X.next(A - I) : (!V && R(A), w);
    }
  };
}
function MD(t, a, s) {
  const i = [], o = s || jr.mix || Z1, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let m = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ni : a;
      m = Pc(y, m);
    }
    i.push(m);
  }
  return i;
}
function AD(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Js(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = MD(a, i, o), y = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (y > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ A1(t[v], t[v + 1], b);
    return m[v](w);
  };
  return s ? (b) => p(wr(t[0], t[u - 1], b)) : p;
}
function DD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ A1(0, a, i);
    t.push(Rl(s, 1, o));
  }
}
function kD(t) {
  const a = [0];
  return DD(a, t.length - 1), a;
}
function zD(t, a) {
  return t.map((s) => s * a);
}
function OD(t, a) {
  return t.map(() => a || I1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = F5(i) ? i.map(nb) : nb(i), u = {
    done: !1,
    value: a[0]
  }, f = zD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : kD(a),
    t
  ), m = AD(f, a, {
    ease: Array.isArray(o) ? o : OD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const LD = (t) => t !== null;
function Kc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(LD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const $D = {
  decay: ch,
  inertia: ch,
  tween: fl,
  keyframes: fl,
  spring: _c
};
function eS(t) {
  typeof t.type == "string" && (t.type = $D[t.type]);
}
class im {
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
const UD = (t) => t / 100;
class Mc extends im {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== In.now() && this.tick(In.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    eS(a);
    const { type: s = fl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || fl;
    y !== fl && typeof m[0] != "number" && (this.mixKeyframes = Pc(UD, Z1(m[0], m[1])), m = [0, 100]);
    const p = y({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = sm(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (i + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const s = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(a, s = !1) {
    const { generator: i, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: m, calculatedDuration: y } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), M = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, R = i;
    if (v) {
      const A = Math.min(this.currentTime, o) / m;
      let V = Math.floor(A), D = A % 1;
      !D && A >= 1 && (D = 1), D === 1 && V--, V = Math.min(V, v + 1), !!(V % 2) && (w === "reverse" ? (D = 1 - D, S && (D -= S / m)) : w === "mirror" && (R = f)), z = wr(0, 1, D) * m;
    }
    let I;
    M ? (this.delayState.value = b[0], I = this.delayState) : I = R.next(z), u && !M && (I.value = u(I.value));
    let { done: X } = I;
    !M && y !== null && (X = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ie = this.holdTime === null && (this.state === "finished" || this.state === "running" && X);
    return ie && j !== ch && (I.value = Kc(b, this.options, C, this.speed)), N && N(I.value), ie && this.finish(), I;
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
    return /* @__PURE__ */ ca(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ca(a);
  }
  get time() {
    return /* @__PURE__ */ ca(this.currentTime);
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
    return W1((i) => this.generator.next(i).value, a, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const s = this.playbackSpeed !== a;
    s && this.driver && this.updateTime(In.now()), this.playbackSpeed = a, s && this.driver && (this.time = /* @__PURE__ */ ca(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = SD, startTime: s } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = s ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(In.now()), this.holdTime = this.currentTime;
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
function BD(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Kr = (t) => t * 180 / Math.PI, uh = (t) => {
  const a = Kr(Math.atan2(t[1], t[0]));
  return dh(a);
}, VD = {
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
}, dh = (t) => (t = t % 360, t < 0 && (t += 360), t), cb = uh, ub = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), db = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), ID = {
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
    i = ID, o = s;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = VD, o = m;
  }
  if (!o)
    return fh(a);
  const u = i[a], f = o[1].split(",").map(qD);
  return typeof u == "function" ? u(f) : f[u];
}
const HD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return hh(s, a);
};
function qD(t) {
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
], si = new Set(ri), fb = (t) => t === ai || t === De, FD = /* @__PURE__ */ new Set(["x", "y", "z"]), YD = ri.filter((t) => !FD.has(t));
function GD(t) {
  const a = [];
  return YD.forEach((s) => {
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
function tS() {
  if (ph) {
    const t = Array.from(Qr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = GD(i);
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
function nS() {
  Qr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ph = !0);
  });
}
function PD() {
  gh = !0, nS(), tS(), gh = !1;
}
class lm {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), mh || (mh = !0, na.read(nS), na.resolveKeyframes(tS))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: s, element: i, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (i && s) {
        const m = i.readValue(s, f);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    BD(a);
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
const KD = (t) => t.startsWith("--");
function aS(t, a, s) {
  KD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const XD = {};
function rS(t, a) {
  const s = /* @__PURE__ */ M1(t);
  return () => XD[a] ?? s();
}
const QD = /* @__PURE__ */ rS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), sS = /* @__PURE__ */ rS(() => {
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
function iS(t, a) {
  if (t)
    return typeof t == "function" ? sS() ? J1(t, a) : "ease-out" : H1(t) ? ol(t) : Array.isArray(t) ? t.map((s) => iS(s, a) || hb.easeOut) : hb[t];
}
function ZD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const v = iS(m, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: i,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (w.pseudoElement = p), t.animate(b, w);
}
function lS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function JD({ type: t, ...a }) {
  return lS(t) && sS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class oS extends im {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Js(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = JD(a);
    this.animation = ZD(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Kc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), aS(s, i, b), this.animation.cancel();
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
    return /* @__PURE__ */ ca(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ca(a);
  }
  get time() {
    return /* @__PURE__ */ ca(Number(this.animation.currentTime) || 0);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && QD() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ni) : o(this);
  }
}
const cS = {
  anticipate: B1,
  backInOut: U1,
  circInOut: V1
};
function WD(t) {
  return t in cS;
}
function ek(t) {
  typeof t.ease == "string" && WD(t.ease) && (t.ease = cS[t.ease]);
}
const Uf = 10;
class tk extends oS {
  constructor(a) {
    ek(a), eS(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new Mc({
      ...f,
      autoplay: !1
    }), y = Math.max(Uf, In.now() - this.startTime), p = wr(0, Uf, y - Uf), b = m.sample(y).value, { name: v } = this.options;
    u && v && aS(u, v, b), s.setWithVelocity(m.sample(Math.max(0, y - p)).value, b, p), m.stop();
  }
}
const mb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ua.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function nk(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function ak(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = mb(o, a), m = mb(u, a);
  return Nl(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : nk(t) || (s === "spring" || lS(s)) && i;
}
function vh(t) {
  t.duration = 0, t.type = "keyframes";
}
const uS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), rk = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function sk(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && rk.test(t[a]))
      return !0;
  return !1;
}
const ik = /* @__PURE__ */ new Set([
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
]), lk = /* @__PURE__ */ M1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ok(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return lk() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (uS.has(s) || ik.has(s) && sk(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const ck = 40;
class uk extends im {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: m, name: y, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = In.now();
    const w = {
      autoplay: a,
      delay: s,
      type: i,
      repeat: o,
      repeatDelay: u,
      repeatType: f,
      name: y,
      motionValue: p,
      element: b,
      ...v
    }, S = b?.KeyframeResolver || lm;
    this.keyframeResolver = new S(m, (j, N, C) => this.onKeyframesResolved(j, N, w, !C), y, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: m, delay: y, isHandoff: p, onUpdate: b } = i;
    this.resolvedAt = In.now();
    let v = !0;
    ak(a, u, f, m) || (v = !1, (jr.instantAnimations || !y) && b?.(Kc(a, i, s)), a[0] = a[a.length - 1], vh(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > ck ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = v && !p && ok(S), N = S.motionValue?.owner?.current;
    let C;
    if (j)
      try {
        C = new tk({
          ...S,
          element: N
        });
      } catch {
        C = new Mc(S);
      }
    else
      C = new Mc(S);
    C.finished.then(() => {
      this.notifyFinished();
    }).catch(ni), this.pendingTimeline && (this.stopTimeline = C.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = C;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, s) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), PD()), this._animation;
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
function dS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
}
const dk = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function fk(t) {
  const a = dk.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const hk = 4;
function fS(t, a, s = 1) {
  Js(s <= hk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = fk(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return R1(f) ? parseFloat(f) : f;
  }
  return tm(o) ? fS(o, a, s + 1) : o;
}
const mk = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, pk = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), gk = {
  type: "keyframes",
  duration: 0.8
}, vk = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, yk = (t, { keyframes: a }) => a.length > 2 ? gk : si.has(t) ? t.startsWith("scale") ? pk(a[1]) : mk : vk;
function hS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function mS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? hS(s, t) : s;
}
const bk = /* @__PURE__ */ new Set([
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
function xk(t) {
  for (const a in t)
    if (!bk.has(a))
      return !0;
  return !1;
}
const Sk = (t, a, s, i = {}, o, u) => (f) => {
  const m = mS(i, t) || {}, y = m.delay || i.delay || 0;
  let { elapsed: p = 0 } = i;
  p = p - /* @__PURE__ */ ta(y);
  const b = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (w) => {
      a.set(w), m.onUpdate && m.onUpdate(w);
    },
    onComplete: () => {
      f(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: u ? void 0 : o
  };
  xk(m) || Object.assign(b, yk(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (vh(b), b.delay === 0 && (v = !0)), (jr.instantAnimations || jr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, vh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const w = Kc(b.keyframes, m);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Mc(b) : new uk(b);
};
function pb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function om(t, a, s, i) {
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
  return om(i, a, s !== void 0 ? s : i.custom, t);
}
const pS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ri
]), gb = 30, wk = (t) => !isNaN(parseFloat(t));
class jk {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const o = In.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = s.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = In.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = wk(this.current));
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
    this.events[a] || (this.events[a] = new D1());
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
    const a = In.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > gb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, gb);
    return k1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
function Ac(t, a) {
  return new jk(t, a);
}
const yh = (t) => Array.isArray(t);
function Ek(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, Ac(s));
}
function Nk(t) {
  return yh(t) ? t[t.length - 1] || 0 : t;
}
function Ck(t, a) {
  const s = Zr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const m = Nk(u[f]);
    Ek(t, f, m);
  }
}
const vn = (t) => !!(t && t.getVelocity);
function Tk(t) {
  return !!(vn(t) && t.add);
}
function Rk(t, a) {
  const s = t.getValue("willChange");
  if (Tk(s))
    return s.add(a);
  if (!s && jr.WillChange) {
    const i = new jr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function cm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const _k = "framerAppearId", gS = "data-" + cm(_k);
function Mk(t) {
  return t.props[gS];
}
function Ak({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function vS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const y = t.getDefaultTransition();
  u = u ? hS(u, y) : y;
  const p = u?.reduceMotion;
  i && (u = i);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || v && Ak(v, w))
      continue;
    const N = {
      delay: s,
      ...mS(u || {}, w)
    }, C = S.get();
    if (C !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === C && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const R = Mk(t);
      if (R) {
        const I = window.MotionHandoffAnimation(R, w, na);
        I !== null && (N.startTime = I, T = !0);
      }
    }
    Rk(t, w);
    const M = p ?? t.shouldReduceMotion;
    S.start(Sk(w, S, j, M && pS.has(w) ? { type: !1 } : N, t, T));
    const z = S.animation;
    z && b.push(z);
  }
  if (f) {
    const w = () => na.update(() => {
      f && Ck(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function bh(t, a, s = {}) {
  const i = Zr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(vS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return Dk(t, a, y, p, b, v, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function Dk(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(bh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + dS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function kk(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => bh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = bh(t, a, s);
  else {
    const o = typeof a == "function" ? Zr(t, a, s.custom) : a;
    i = Promise.all(vS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const zk = {
  test: (t) => t === "auto",
  parse: (t) => t
}, yS = (t) => (a) => a.test(t), bS = [ai, De, Ks, vr, nD, tD, zk], vb = (t) => bS.find(yS(t));
function Ok(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || _1(t) : !0;
}
const Lk = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function $k(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(nm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = Lk.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const Uk = /\b([a-z-]*)\(.*?\)/gu, xh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = t.match(Uk);
    return a ? a.map($k).join(" ") : t;
  }
}, Sh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = ua.parse(t);
    return ua.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, yb = {
  ...ai,
  transform: Math.round
}, Bk = {
  rotate: vr,
  rotateX: vr,
  rotateY: vr,
  rotateZ: vr,
  scale: Jo,
  scaleX: Jo,
  scaleY: Jo,
  scaleZ: Jo,
  skew: vr,
  skewX: vr,
  skewY: vr,
  distance: De,
  translateX: De,
  translateY: De,
  translateZ: De,
  x: De,
  y: De,
  z: De,
  perspective: De,
  transformPerspective: De,
  opacity: yl,
  originX: rb,
  originY: rb,
  originZ: De
}, um = {
  // Border props
  borderWidth: De,
  borderTopWidth: De,
  borderRightWidth: De,
  borderBottomWidth: De,
  borderLeftWidth: De,
  borderRadius: De,
  borderTopLeftRadius: De,
  borderTopRightRadius: De,
  borderBottomRightRadius: De,
  borderBottomLeftRadius: De,
  // Positioning props
  width: De,
  maxWidth: De,
  height: De,
  maxHeight: De,
  top: De,
  right: De,
  bottom: De,
  left: De,
  inset: De,
  insetBlock: De,
  insetBlockStart: De,
  insetBlockEnd: De,
  insetInline: De,
  insetInlineStart: De,
  insetInlineEnd: De,
  // Spacing props
  padding: De,
  paddingTop: De,
  paddingRight: De,
  paddingBottom: De,
  paddingLeft: De,
  paddingBlock: De,
  paddingBlockStart: De,
  paddingBlockEnd: De,
  paddingInline: De,
  paddingInlineStart: De,
  paddingInlineEnd: De,
  margin: De,
  marginTop: De,
  marginRight: De,
  marginBottom: De,
  marginLeft: De,
  marginBlock: De,
  marginBlockStart: De,
  marginBlockEnd: De,
  marginInline: De,
  marginInlineStart: De,
  marginInlineEnd: De,
  // Typography
  fontSize: De,
  // Misc
  backgroundPositionX: De,
  backgroundPositionY: De,
  ...Bk,
  zIndex: yb,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: yb
}, Vk = {
  ...um,
  // Color props
  color: Kt,
  backgroundColor: Kt,
  outlineColor: Kt,
  fill: Kt,
  stroke: Kt,
  // Border props
  borderColor: Kt,
  borderTopColor: Kt,
  borderRightColor: Kt,
  borderBottomColor: Kt,
  borderLeftColor: Kt,
  filter: xh,
  WebkitFilter: xh,
  mask: Sh,
  WebkitMask: Sh
}, xS = (t) => Vk[t], Ik = /* @__PURE__ */ new Set([xh, Sh]);
function SS(t, a) {
  let s = xS(t);
  return Ik.has(s) || (s = ua), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const Hk = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function qk(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !Hk.has(u) && Ws(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = SS(s, o);
}
class Fk extends lm {
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
      if (typeof v == "string" && (v = v.trim(), tm(v))) {
        const w = fS(v, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !pS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = vb(o), m = vb(u), y = ab(o), p = ab(u);
    if (y !== p && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (fb(f) && fb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || Ok(a[o])) && i.push(o);
    i.length && qk(a, i, s);
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
    i[u] = Sr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, y]) => {
      a.getValue(m).set(y);
    }), this.resolveNoneKeyframes();
  }
}
function Yk(t, a, s) {
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
const wS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function vc(t) {
  return L5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Gk } = /* @__PURE__ */ q1(queueMicrotask, !1), Pk = {
  y: !1
};
function Kk() {
  return Pk.y;
}
function jS(t, a) {
  const s = Yk(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function Xk(t) {
  return !(t.pointerType === "touch" || Kk());
}
function Qk(t, a, s = {}) {
  const [i, o, u] = jS(t, s);
  return i.forEach((f) => {
    let m = !1, y = !1, p;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (C) => {
      p && (p(C), p = void 0), b();
    }, w = (C) => {
      m = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), y && (y = !1, v(C));
    }, S = () => {
      m = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (C) => {
      if (C.pointerType !== "touch") {
        if (m) {
          y = !0;
          return;
        }
        v(C);
      }
    }, N = (C) => {
      if (!Xk(C))
        return;
      y = !1;
      const T = a(f, C);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const ES = (t, a) => a ? t === a ? !0 : ES(t, a.parentElement) : !1, Zk = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Jk = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Wk(t) {
  return Jk.has(t.tagName) || t.isContentEditable === !0;
}
const yc = /* @__PURE__ */ new WeakSet();
function bb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Bf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const ez = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = bb(() => {
    if (yc.has(s))
      return;
    Bf(s, "down");
    const o = bb(() => {
      Bf(s, "up");
    }), u = () => Bf(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function xb(t) {
  return Zk(t) && !0;
}
const Sb = /* @__PURE__ */ new WeakSet();
function tz(t, a, s = {}) {
  const [i, o, u] = jS(t, s), f = (m) => {
    const y = m.currentTarget;
    if (!xb(m) || Sb.has(m))
      return;
    yc.add(y), s.stopPropagation && Sb.add(m);
    const p = a(y, m), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), yc.has(y) && yc.delete(y), xb(S) && typeof p == "function" && p(S, { success: j });
    }, v = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || ES(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((m) => {
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), vc(m) && (m.addEventListener("focus", (p) => ez(p, o)), !Wk(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const nz = [...bS, Kt, ua], az = (t) => nz.find(yS(t)), wb = () => ({ min: 0, max: 0 }), NS = () => ({
  x: wb(),
  y: wb()
}), rz = /* @__PURE__ */ new WeakMap();
function Xc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const dm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], fm = ["initial", ...dm];
function Qc(t) {
  return Xc(t.animate) || fm.some((a) => bl(t[a]));
}
function CS(t) {
  return !!(Qc(t) || t.variants);
}
function sz(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (vn(o))
      t.addValue(i, o);
    else if (vn(u))
      t.addValue(i, Ac(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, Ac(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const Dc = { current: null }, hm = { current: !1 }, iz = typeof window < "u";
function TS() {
  if (hm.current = !0, !!iz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Dc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Dc.current = !1;
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
let kc = {};
function RS(t) {
  kc = t;
}
function lz() {
  return kc;
}
class oz {
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
  constructor({ parent: a, props: s, presenceContext: i, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: m }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = lm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = In.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = s.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Qc(s), this.isVariantNode = CS(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const S in w) {
      const j = w[S];
      p[S] !== void 0 && vn(j) && j.set(p[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, rz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (hm.current || TS(), this.shouldReduceMotion = Dc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && uS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: y, ease: p, duration: b } = s.accelerate, v = new oS({
        element: this.current,
        name: a,
        keyframes: m,
        times: y,
        ease: p,
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
    for (a in kc) {
      const s = kc[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : NS();
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
    this.prevMotionValues = sz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && s !== void 0 && (i = Ac(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (R1(i) || _1(i)) ? i = parseFloat(i) : !az(i) && ua.test(s) && (i = SS(a, s)), this.setBaseTarget(a, vn(i) ? i.get() : i)), vn(i) ? i.get() : i;
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
      const u = om(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !vn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new D1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Gk.render(this.render);
  }
}
class _S extends oz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Fk;
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
    vn(a) && (this.childSubscription = a.on("change", (s) => {
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
function cz({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function uz(t, a) {
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
function dz(t, a) {
  return cz(uz(t.getBoundingClientRect(), a));
}
const fz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, hz = ri.length;
function mz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < hz; u++) {
    const f = ri[u], m = t[f];
    if (m === void 0)
      continue;
    let y = !0;
    if (typeof m == "number")
      y = m === (f.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      y = f.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!y || s) {
      const p = wS(m, um[f]);
      if (!y) {
        o = !1;
        const b = fz[f] || f;
        i += `${b}(${p}) `;
      }
      s && (a[f] = p);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function mm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, m = !1;
  for (const y in a) {
    const p = a[y];
    if (si.has(y)) {
      f = !0;
      continue;
    } else if (Y1(y)) {
      o[y] = p;
      continue;
    } else {
      const b = wS(p, um[y]);
      y.startsWith("origin") ? (m = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = mz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
    const { originX: y = "50%", originY: p = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${p} ${b}`;
  }
}
function MS(t, { style: a, vars: s }, i, o) {
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
      if (De.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = Eb(t, a.target.x), i = Eb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, pz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = ua.parse(t);
    if (o.length > 5)
      return i;
    const u = ua.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = Rl(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, gz = {
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
  boxShadow: pz
};
function AS(t, { layout: a, layoutId: s }) {
  return si.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!gz[t] || t === "opacity");
}
function pm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (vn(i[f]) || o && vn(o[f]) || AS(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function vz(t) {
  return window.getComputedStyle(t);
}
class yz extends _S {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = MS;
  }
  readValueFromInstance(a, s) {
    if (si.has(s))
      return this.projection?.isProjecting ? fh(s) : HD(a, s);
    {
      const i = vz(a), o = (Y1(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return dz(a, s);
  }
  build(a, s, i) {
    mm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return pm(a, s, i);
  }
}
const bz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, xz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Sz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? bz : xz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const wz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function DS(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, y, p, b) {
  if (mm(t, m, p), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of wz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), s !== void 0 && (v.y = s), i !== void 0 && (v.scale = i), o !== void 0 && Sz(v, o, u, f, !1);
}
const kS = /* @__PURE__ */ new Set([
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
]), zS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function jz(t, a, s, i) {
  MS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(kS.has(o) ? o : cm(o), a.attrs[o]);
}
function OS(t, a, s) {
  const i = pm(t, a, s);
  for (const o in t)
    if (vn(t[o]) || vn(a[o])) {
      const u = ri.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class Ez extends _S {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = NS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (si.has(s)) {
      const i = xS(s);
      return i && i.default || 0;
    }
    return s = kS.has(s) ? s : cm(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return OS(a, s, i);
  }
  build(a, s, i) {
    DS(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    jz(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = zS(a.tagName), super.mount(a);
  }
}
const Nz = fm.length;
function LS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? LS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < Nz; s++) {
    const i = fm[s], o = t.props[i];
    (bl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function $S(t, a) {
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
const Cz = [...dm].reverse(), Tz = dm.length;
function Rz(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => kk(t, s, i)));
}
function _z(t) {
  let a = Rz(t), s = Nb(), i = !0, o = !1;
  const u = (p) => (b, v) => {
    const w = Zr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...N } = w;
      b = { ...b, ...N, ...j };
    }
    return b;
  };
  function f(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = LS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < Tz; T++) {
      const M = Cz[T], z = s[M], R = b[M] !== void 0 ? b[M] : v[M], I = bl(R), X = M === p ? z.isActive : null;
      X === !1 && (N = T);
      let ie = R === v[M] && R !== b[M] && I;
      if (ie && (i || o) && t.manuallyAnimateOnMount && (ie = !1), z.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && X === null || // If we didn't and don't have any defined prop for this animation type
      !R && !z.prevProp || // Or if the prop doesn't define an animation
      Xc(R) || typeof R == "boolean")
        continue;
      if (M === "exit" && z.isActive && X !== !0) {
        z.prevResolvedValues && (j = {
          ...j,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = Mz(z.prevProp, R);
      let V = A || // If we're making this variant active, we want to always make it active
      M === p && z.isActive && !ie && I || // If we removed a higher-priority variant (i is in reverse order)
      T > N && I, D = !1;
      const H = Array.isArray(R) ? R : [R];
      let te = H.reduce(u(M), {});
      X === !1 && (te = {});
      const { prevResolvedValues: K = {} } = z, le = {
        ...K,
        ...te
      }, re = (q) => {
        V = !0, S.has(q) && (D = !0, S.delete(q)), z.needsAnimating[q] = !0;
        const F = t.getValue(q);
        F && (F.liveStyle = !1);
      };
      for (const q in le) {
        const F = te[q], ce = K[q];
        if (j.hasOwnProperty(q))
          continue;
        let _ = !1;
        yh(F) && yh(ce) ? _ = !$S(F, ce) : _ = F !== ce, _ ? F != null ? re(q) : S.add(q) : F !== void 0 && S.has(q) ? re(q) : z.protectedKeys[q] = !0;
      }
      z.prevProp = R, z.prevResolvedValues = te, z.isActive && (j = { ...j, ...te }), (i || o) && t.blockInitialAnimation && (V = !1);
      const k = ie && A;
      V && (!k || D) && w.push(...H.map((q) => {
        const F = { type: M };
        if (typeof q == "string" && (i || o) && !k && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ce } = t, _ = Zr(ce, q);
          if (ce.enteringChildren && _) {
            const { delayChildren: ne } = _.transition || {};
            F.delay = dS(ce.enteringChildren, t, ne);
          }
        }
        return {
          animation: q,
          options: F
        };
      }));
    }
    if (S.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const M = Zr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        M && M.transition && (T.transition = M.transition);
      }
      S.forEach((M) => {
        const z = t.getBaseTarget(M), R = t.getValue(M);
        R && (R.liveStyle = !0), T[M] = z ?? null;
      }), w.push({ animation: T });
    }
    let C = !!w.length;
    return i && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (C = !1), i = !1, o = !1, C ? a(w) : Promise.resolve();
  }
  function y(p, b) {
    if (s[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(p, b)), s[p].isActive = b;
    const v = m(p);
    for (const w in s)
      s[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Nb(), o = !0;
    }
  };
}
function Mz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !$S(a, t) : !1;
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
function Az(t) {
  return vn(t) ? t.get() : t;
}
const gm = g.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Tb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Dz(...t) {
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
function kz(...t) {
  return g.useCallback(Dz(...t), t);
}
class zz extends g.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (vc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = vc(i) && i.offsetWidth || 0, u = vc(i) && i.offsetHeight || 0, f = getComputedStyle(s), m = this.props.sizeRef.current;
      m.height = parseFloat(f.height), m.width = parseFloat(f.width), m.top = s.offsetTop, m.left = s.offsetLeft, m.right = o - m.width - m.left, m.bottom = u - m.height - m.top;
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
function Oz({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = g.useId(), m = g.useRef(null), y = g.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = g.useContext(gm), b = t.props?.ref ?? t?.ref, v = kz(m, b);
  return g.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: C, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !w || !S)
      return;
    const M = s === "left" ? `left: ${N}` : `right: ${C}`, z = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const R = document.createElement("style");
    p && (R.nonce = p);
    const I = o ?? document.head;
    return I.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${M}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), I.contains(R) && I.removeChild(R);
    };
  }, [a]), c.jsx(zz, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : g.cloneElement(t, { ref: v }) });
}
const Lz = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
  const b = Jh($z), v = g.useId();
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
  }, [s]), t = c.jsx(Oz, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(Gc.Provider, { value: S, children: t });
};
function $z() {
  return /* @__PURE__ */ new Map();
}
function Uz(t = !0) {
  const a = g.useContext(Gc);
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
const Wo = (t) => t.key || "";
function Rb(t) {
  const a = [];
  return g.Children.forEach(t, (s) => {
    g.isValidElement(s) && a.push(s);
  }), a;
}
const US = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, v] = Uz(f), w = g.useMemo(() => Rb(t), [t]), S = f && !b ? [] : w.map(Wo), j = g.useRef(!0), N = g.useRef(w), C = Jh(() => /* @__PURE__ */ new Map()), T = g.useRef(/* @__PURE__ */ new Set()), [M, z] = g.useState(w), [R, I] = g.useState(w);
  T1(() => {
    j.current = !1, N.current = w;
    for (let A = 0; A < R.length; A++) {
      const V = Wo(R[A]);
      S.includes(V) ? (C.delete(V), T.current.delete(V)) : C.get(V) !== !0 && C.set(V, !1);
    }
  }, [R, S.length, S.join("-")]);
  const X = [];
  if (w !== M) {
    let A = [...w];
    for (let V = 0; V < R.length; V++) {
      const D = R[V], H = Wo(D);
      S.includes(H) || (A.splice(V, 0, D), X.push(D));
    }
    return u === "wait" && X.length && (A = X), I(Rb(A)), z(w), null;
  }
  const { forceRender: ie } = g.useContext(C1);
  return c.jsx(c.Fragment, { children: R.map((A) => {
    const V = Wo(A), D = f && !b ? !1 : w === R || S.includes(V), H = () => {
      if (T.current.has(V))
        return;
      if (C.has(V))
        T.current.add(V), C.set(V, !0);
      else
        return;
      let te = !0;
      C.forEach((K) => {
        K || (te = !1);
      }), te && (ie?.(), I(N.current), f && v?.(), i && i());
    };
    return c.jsx(Lz, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: D ? void 0 : H, anchorX: m, anchorY: y, children: A }, V);
  }) });
}, vm = g.createContext({ strict: !1 }), _b = {
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
function Bz() {
  if (Mb)
    return;
  const t = {};
  for (const a in _b)
    t[a] = {
      isEnabled: (s) => _b[a].some((i) => !!s[i])
    };
  RS(t), Mb = !0;
}
function BS() {
  return Bz(), lz();
}
function wh(t) {
  const a = BS();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  RS(a);
}
function ym({ children: t, features: a, strict: s = !1 }) {
  const [, i] = g.useState(!Vf(a)), o = g.useRef(void 0);
  if (!Vf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, wh(f);
  }
  return g.useEffect(() => {
    Vf(a) && a().then(({ renderer: u, ...f }) => {
      wh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(vm.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function Vf(t) {
  return typeof t == "function";
}
const Vz = /* @__PURE__ */ new Set([
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
function zc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Vz.has(t);
}
let VS = (t) => !zc(t);
function Iz(t) {
  typeof t == "function" && (VS = (a) => a.startsWith("on") ? !zc(a) : t(a));
}
try {
  Iz(require("@emotion/is-prop-valid").default);
} catch {
}
function Hz(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || vn(t[o]) || (VS(o) || s === !0 && zc(o) || !a && !zc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Zc = /* @__PURE__ */ g.createContext({});
function qz(t, a) {
  if (Qc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || bl(s) ? s : void 0,
      animate: bl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function Fz(t) {
  const { initial: a, animate: s } = qz(t, g.useContext(Zc));
  return g.useMemo(() => ({ initial: a, animate: s }), [Ab(a), Ab(s)]);
}
function Ab(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const bm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function IS(t, a, s) {
  for (const i in a)
    !vn(a[i]) && !AS(i, s) && (t[i] = a[i]);
}
function Yz({ transformTemplate: t }, a) {
  return g.useMemo(() => {
    const s = bm();
    return mm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function Gz(t, a) {
  const s = t.style || {}, i = {};
  return IS(i, s, t), Object.assign(i, Yz(t, a)), i;
}
function Pz(t, a) {
  const s = {}, i = Gz(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const HS = () => ({
  ...bm(),
  attrs: {}
});
function Kz(t, a, s, i) {
  const o = g.useMemo(() => {
    const u = HS();
    return DS(u, a, zS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    IS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const Xz = [
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
function xm(t) {
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
      !!(Xz.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Qz(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? xm(t) ? Kz : Pz)(a, i, o, t), p = Hz(a, typeof t == "string", u), b = t !== g.Fragment ? { ...p, ...y, ref: s } : {}, { children: v } = a, w = g.useMemo(() => vn(v) ? v.get() : v, [v]);
  return g.createElement(t, {
    ...b,
    children: w
  });
}
function Zz({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: Jz(s, i, o, t),
    renderState: a()
  };
}
function Jz(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = Az(u[w]);
  let { initial: f, animate: m } = t;
  const y = Qc(t), p = CS(t);
  a && p && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? m : f;
  if (v && typeof v != "boolean" && !Xc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = om(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: C, ...T } = j;
        for (const M in T) {
          let z = T[M];
          if (Array.isArray(z)) {
            const R = b ? z.length - 1 : 0;
            z = z[R];
          }
          z !== null && (o[M] = z);
        }
        for (const M in N)
          o[M] = N[M];
      }
    }
  }
  return o;
}
const qS = (t) => (a, s) => {
  const i = g.useContext(Zc), o = g.useContext(Gc), u = () => Zz(t, a, i, o);
  return s ? u() : Jh(u);
}, Wz = /* @__PURE__ */ qS({
  scrapeMotionValuesFromProps: pm,
  createRenderState: bm
}), e4 = /* @__PURE__ */ qS({
  scrapeMotionValuesFromProps: OS,
  createRenderState: HS
}), t4 = Symbol.for("motionComponentSymbol");
function n4(t, a, s) {
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
        const m = f(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const a4 = g.createContext({});
function r4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function s4(t, a, s, i, o, u) {
  const { visualElement: f } = g.useContext(Zc), m = g.useContext(vm), y = g.useContext(Gc), p = g.useContext(gm), b = p.reducedMotion, v = p.skipAnimations, w = g.useRef(null), S = g.useRef(!1);
  i = i || m.renderer, !w.current && i && (w.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = g.useContext(a4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && i4(w.current, s, o, N);
  const C = g.useRef(!1);
  g.useInsertionEffect(() => {
    j && C.current && j.update(s, y);
  });
  const T = s[gS], M = g.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return T1(() => {
    S.current = !0, j && (C.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), M.current && j.animationState && j.animationState.animateChanges());
  }), g.useEffect(() => {
    j && (!M.current && j.animationState && j.animationState.animateChanges(), M.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), M.current = !1), j.enteringChildren = void 0);
  }), j;
}
function i4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : FS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && r4(m),
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
    layoutRoot: p,
    layoutAnchor: b
  });
}
function FS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : FS(t.parent);
}
function If(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && wh(i);
  const u = s ? s === "svg" : xm(t), f = u ? e4 : Wz;
  function m(p, b) {
    let v;
    const w = {
      ...g.useContext(gm),
      ...p,
      layoutId: l4(p)
    }, { isStatic: S } = w, j = Fz(p), N = f(p, S);
    if (!S && typeof window < "u") {
      o4();
      const C = c4(w);
      v = C.MeasureLayout, j.visualElement = s4(t, N, w, o, C.ProjectionNode, u);
    }
    return c.jsxs(Zc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, Qz(t, p, n4(N, j.visualElement, b), N, S, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = g.forwardRef(m);
  return y[t4] = t, y;
}
function l4({ layoutId: t }) {
  const a = g.useContext(C1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function o4(t, a) {
  g.useContext(vm).strict;
}
function c4(t) {
  const a = BS(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function u4(t, a) {
  if (typeof Proxy > "u")
    return If;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => If(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, If(f, void 0, t, a)), s.get(f))
  });
}
const Sm = /* @__PURE__ */ u4(), d4 = (t, a) => a.isSVG ?? xm(t) ? new Ez(a) : new yz(a, {
  allowProjection: t !== g.Fragment
});
class f4 extends ii {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = _z(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Xc(a) && (this.unmountControls = a.subscribe(this.node));
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
let h4 = 0;
class m4 extends ii {
  constructor() {
    super(...arguments), this.id = h4++, this.isExitComplete = !1;
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
          const m = Zr(this.node, u, f);
          if (m) {
            const { transition: y, transitionEnd: p, ...b } = m;
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
const p4 = {
  animation: {
    Feature: f4
  },
  exit: {
    Feature: m4
  }
};
function YS(t) {
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
  u && na.postRender(() => u(a, YS(a)));
}
class g4 extends ii {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Qk(a, (s, i) => (Db(this.node, i, "Start"), (o) => Db(this.node, o, "End"))));
  }
  unmount() {
  }
}
class v4 extends ii {
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
    this.unmount = Pc(Cb(this.node.current, "focus", () => this.onFocus()), Cb(this.node.current, "blur", () => this.onBlur()));
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
  u && na.postRender(() => u(a, YS(a)));
}
class y4 extends ii {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = tz(a, (o, u) => (kb(this.node, u, "Start"), (f, { success: m }) => kb(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const jh = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), b4 = (t) => {
  const a = jh.get(t.target);
  a && a(t);
}, x4 = (t) => {
  t.forEach(b4);
};
function S4({ root: t, ...a }) {
  const s = t || document;
  Hf.has(s) || Hf.set(s, {});
  const i = Hf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(x4, { root: t, ...a })), i[o];
}
function w4(t, a, s) {
  const i = S4(a);
  return jh.set(t, s), i.observe(t), () => {
    jh.delete(t), i.unobserve(t);
  };
}
const j4 = {
  some: 0,
  all: 1
};
class E4 extends ii {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : j4[o]
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = p ? b : v;
      w && w(y);
    };
    this.stopObserver = w4(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(N4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function N4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const C4 = {
  inView: {
    Feature: E4
  },
  tap: {
    Feature: y4
  },
  focus: {
    Feature: v4
  },
  hover: {
    Feature: g4
  }
}, wm = {
  renderer: d4,
  ...p4,
  ...C4
};
function T4() {
  !hm.current && TS();
  const [t] = g.useState(Dc.current);
  return t;
}
const Eh = "emotion-tts:trigger-generate", Nh = "emotion-tts:run-state";
function R4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Eh));
}
function _4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Nh, { detail: t }));
}
function M4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Eh, t), () => window.removeEventListener(Eh, t));
}
function GS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(Nh, a), () => window.removeEventListener(Nh, a);
}
var A4 = "wksjad0", D4 = "wksjad1", k4 = "wksjad2", z4 = "wksjad3", O4 = "wksjad4", L4 = "wksjad5", $4 = "wksjad6", U4 = "wksjad7", B4 = "wksjad8", V4 = "wksjad9", I4 = "wksjada", H4 = "wksjadb", q4 = "wksjadc", F4 = "wksjadd", Y4 = "wksjade", G4 = "wksjadf", P4 = "wksjadg", qf = "wksjadh", K4 = "wksjadi", X4 = "wksjadj", Q4 = "wksjadk", Z4 = "wksjadl", J4 = "wksjadm", W4 = "wksjadn";
const Ch = 5, eO = 5e-3;
function PS(t, a = "") {
  return `${xa}/deployments/${t}/artifacts${a}`;
}
function tO(t) {
  const [a, s] = g.useState([]), [i, o] = g.useState(!1), [u, f] = g.useState(null), [m, y] = g.useState(0), p = g.useRef(null), b = g.useRef(!1), v = g.useCallback(() => y((w) => w + 1), []);
  return g.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), f(null), fetch(`${PS(t)}?limit=${Ch}`, {
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
  }, [t, m]), g.useEffect(() => GS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: i, error: u, refetch: v, tick: m };
}
function nO(t, a) {
  const [s, i] = g.useState(() => /* @__PURE__ */ new Map());
  return g.useEffect(() => {
    let o = !1;
    return Xs(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const m of u)
        f.set(m.voiceAssetId, m.displayName);
      i(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), s;
}
function aO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = tO(t), m = nO(t, f), [y, p] = g.useState(null), b = T4(), v = g.useCallback(() => {
    p(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: A4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: D4, children: [
      /* @__PURE__ */ c.jsx("span", { className: k4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: z4, children: [
        /* @__PURE__ */ c.jsx("span", { className: O4, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: L4, children: [
          "last ",
          Ch
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: $4,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: W4, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(ym, { features: wm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: U4, children: /* @__PURE__ */ c.jsx(US, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = PS(
        t,
        `/${S.utteranceId}/download`
      ), C = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        Sm.li,
        {
          className: B4,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: V4, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: I4,
                  onClick: () => p(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: H4, children: [
                /* @__PURE__ */ c.jsxs("div", { className: q4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: F4, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: Y4, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: G4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: P4, children: sO(S.finishedAt) }),
                  C && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: qf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: K4, children: C })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: qf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: X4, children: rO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > eO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: qf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: Q4, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: Z4,
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
                className: J4,
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
function rO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function sO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function iO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function KS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function lO() {
  if (typeof window > "u") return;
  const t = KS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function XS(t) {
  const [a, s] = g.useState(!1);
  return g.useEffect(() => {
    if (typeof window > "u") return;
    const i = KS(), o = () => {
      const f = i.reduce((m, y) => {
        const p = iO(y);
        return p > m ? p : m;
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
const QS = 360;
var oO = "_1s59p180", cO = "_1s59p181", uO = "_1s59p182", dO = "_1s59p183", fO = "_1s59p184", hO = "_1s59p185", mO = "_1s59p186", pO = "_1s59p188", gO = "_1s59p189", zb = "_1s59p18a", vO = "_1s59p18c", yO = "_1s59p18d", bO = "_1s59p18e", xO = "_1s59p18f", SO = "_1s59p18g", wO = "_1s59p18i";
function jO(t) {
  const a = ei(), [s, i] = g.useState("idle"), [o, u] = g.useState(null), [f, m] = g.useState(/* @__PURE__ */ new Map()), [y, p] = g.useState(null), [b, v] = g.useState(null), w = g.useRef(null);
  g.useEffect(() => () => {
    w.current?.();
  }, []), g.useEffect(() => {
    _4({ busy: s === "starting" || s === "running" });
  }, [s]);
  const S = g.useCallback(
    (F) => {
      const ce = F.status;
      (ce === "completed" || ce === "partial") && cn.success(
        ce === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
    i("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const F = await nT(t.deploymentId, t.createPayload);
      u(F.runId), i("running"), w.current?.(), w.current = Gy(
        t.deploymentId,
        F.runId,
        (ce) => Ob(
          ce,
          m,
          i,
          (_) => {
            v(_), S(_);
          },
          t.deploymentId,
          F.runId
        ),
        () => i("error")
      );
    } catch (F) {
      i("error"), p(Ff(F));
    }
  }, [t.deploymentId, t.createPayload, S]);
  g.useEffect(() => M4(() => {
    (s === "idle" || s === "terminal" || s === "error") && j();
  }), [s, j]);
  const N = g.useCallback(async () => {
    if (o)
      try {
        await aT(t.deploymentId, o);
      } catch (F) {
        p(Ff(F));
      }
  }, [t.deploymentId, o]), C = Array.from(f.values()).sort((F, ce) => F.globalIndex - ce.globalIndex), T = s === "starting" || s === "running", M = b?.status === "partial", z = C.filter((F) => F.status === "running").length, R = C.filter((F) => F.status === "completed").length, I = s === "starting" || s === "running" || C.length > 0, X = C.filter((F) => F.status === "failed"), ie = (() => {
    if (s !== "terminal" || X.length === 0) return null;
    const F = /* @__PURE__ */ new Map();
    for (const J of X) {
      const Y = J.failureCategory ?? "unknown";
      F.set(Y, (F.get(Y) ?? 0) + 1);
    }
    let ce = "unknown", _ = 0;
    for (const [J, Y] of F)
      Y > _ && (ce = J, _ = Y);
    const ne = C.length;
    return { category: ce, count: _, total: ne };
  })(), A = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, V = "Check the run detail page for the per-segment error log.", D = y?.toLowerCase().includes("unmapped") ?? !1, H = t.diagnostics ?? [], te = H.find((F) => F.status === "fail"), K = s === "starting" ? "Starting…" : s === "running" ? "Generating…" : "Generate", le = !t.canGenerate || T || !!te, re = s === "starting" || s === "running", k = re ? "running" : le ? "blocked" : "idle", q = !XS(QS) || re;
  return /* @__PURE__ */ c.jsxs("div", { className: oO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: cO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: dO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: fO, children: [
          /* @__PURE__ */ c.jsx("span", { className: uO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          I && /* @__PURE__ */ c.jsxs("span", { className: SO, children: [
            /* @__PURE__ */ c.jsx("span", { className: wO, "aria-hidden": "true" }),
            z > 0 ? `${z} in flight` : `${R} done`
          ] })
        ] }),
        H.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: hO, "aria-label": "Pre-flight checks", children: H.map((F) => /* @__PURE__ */ c.jsxs("li", { className: mO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: pO,
              "data-status": F.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: gO, children: F.label }),
          F.detail && /* @__PURE__ */ c.jsx("span", { className: zb, children: F.detail })
        ] }, F.label)) }) : /* @__PURE__ */ c.jsx("span", { className: zb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: vO, "data-state": k, children: [
        q ? /* @__PURE__ */ c.jsxs(
          Ke,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: le,
            loading: re,
            children: [
              !re && /* @__PURE__ */ c.jsx("span", { className: yO, "aria-hidden": "true", children: "▶" }),
              K
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: bO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: xO, children: "↑" })
        ] }),
        T && /* @__PURE__ */ c.jsx(
          Ke,
          {
            variant: "ghost",
            size: "xs",
            onClick: N,
            "aria-label": "Cancel current run",
            children: "Cancel"
          }
        )
      ] })
    ] }),
    y && /* @__PURE__ */ c.jsxs(
      Rn,
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
          D && /* @__PURE__ */ c.jsx(
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
    ie && /* @__PURE__ */ c.jsxs(Rn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ie.count,
        " of ",
        ie.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ie.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: A[ie.category] ?? V })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${d1.secondary} ${f1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    M && b && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          variant: "secondary",
          disabled: !!te,
          onClick: async () => {
            try {
              const F = await o1(t.deploymentId, b.runId);
              u(F.runId), m(/* @__PURE__ */ new Map()), v(null), i("running"), w.current?.(), w.current = Gy(
                t.deploymentId,
                F.runId,
                (ce) => Ob(ce, m, i, v, t.deploymentId, F.runId),
                () => i("error")
              );
            } catch (F) {
              p(Ff(F)), i("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: FR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: C.map((F) => /* @__PURE__ */ c.jsxs("tr", { className: YR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: F.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Jr, { tone: EO(F.status), children: F.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: F.durationMs ? `${F.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: F.failureCategory ?? "" })
      ] }, F.globalIndex)) })
    ] })
  ] });
}
async function Ob(t, a, s, i, o, u) {
  switch (t.type) {
    case "segment_started":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((f) => {
        const m = new Map(f);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "failed",
          failureCategory: t.failureCategory
        }), m;
      });
      return;
    case "run_terminal":
      s("terminal");
      try {
        const f = await Ph(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function EO(t) {
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
function Ff(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const NO = {
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
], CO = [
  { id: "aether", name: "Aether", role: "Protagonist", icon: "record_voice_over", color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e", initial: "A", lib: "Aether_v4" },
  { id: "vesper", name: "Vesper", role: "Narrator", icon: "graphic_eq", color: "#9093ff", rgb: "144,147,255", onColor: "#080079", initial: "V", lib: "Vesper_Base" },
  { id: "luminous", name: "Luminous", role: "Antagonist", icon: "mic_external_on", color: "#ff8439", rgb: "255,132,57", onColor: "#471a00", initial: "L", lib: "Lumin_Synth" }
], TO = [
  { id: "neutral", label: "Neutral" },
  { id: "calm", label: "Calm" },
  { id: "tense", label: "Tense" },
  { id: "intense", label: "Intense" }
], RO = `The chronometer flashed red, reflecting off the graphite console. “We have approximately thirty seconds before the hull breaches,” she stated, her voice devoid of panic — a purely mathematical assessment of their impending doom.

Kael didn’t look up from the diagnostic panel. “Divert auxiliary power from life support to the forward deflectors.”

“That will reduce atmospheric integrity by forty percent.”

“If the hull breaches, it’s reduced by a hundred percent,” he shot back, his fingers flying across the haptic interface. The ship shuddered violently, throwing sparks from the overhead conduits.`;
function _O(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function MO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function AO(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? CO : a.map((s, i) => {
    const o = Lb[i % Lb.length], u = $b[i % $b.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: _O(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: MO(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function DO(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function kO(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = DO(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s.length > 0 ? s : TO;
}
const ec = /[^.!?…”’"]*(?:[.!?…][\s”’"]*|[”’"]+\s*|$)/g;
function zO(t) {
  const a = t.split(/\n\s*\n/), s = [];
  let i = 0;
  for (const o of a) {
    if (!o.trim()) continue;
    const u = [];
    let f = 0, m;
    for (ec.lastIndex = 0; (m = ec.exec(o)) !== null; ) {
      const y = m[0];
      if (y === "") {
        if (ec.lastIndex >= o.length) break;
        ec.lastIndex += 1;
        continue;
      }
      if (y.trim().length === 0) continue;
      const p = /[“”"]/.test(y) ? "dialogue" : "narration";
      u.push({ id: `p${i}s${f}`, text: y, kind: p }), f += 1;
    }
    u.length === 0 && u.push({ id: `p${i}s0`, text: o, kind: /[“”"]/.test(o) ? "dialogue" : "narration" }), s.push({ id: `p${i}`, segs: u }), i += 1;
  }
  return s;
}
function bc(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function Th(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function OO(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function LO(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function Ub(t, a) {
  return [...a].sort((s, i) => Th(t, s) - Th(t, i)).map((s) => LO(t, s)).join("").trim();
}
function Bb(t, a) {
  return Math.min(...a.segIds.map((s) => Th(t, s)));
}
function ZS(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Vb(t, a) {
  return a.every((s) => !ZS(t, s));
}
function JS(t, a) {
  return [...a].sort((s, i) => Bb(t, s) - Bb(t, i));
}
function $O(t, a) {
  const s = {};
  return JS(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function UO(t) {
  return bc(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function BO(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
function tc(t, a) {
  return t.find((s) => s.id === a) ?? t[0];
}
function Ib(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var VO = "_171z55w1", IO = "_171z55w2", HO = "_171z55w3", nc = "_171z55w4", qO = "_171z55w5", FO = "_171z55w6", YO = "_171z55w7", GO = "_171z55w8", PO = "_171z55w9", KO = "_171z55wa", XO = "_171z55wb", QO = "_171z55wc", Hb = "_171z55wd", ZO = "_171z55we", JO = "_171z55wf", WO = "_171z55wg", eL = "_171z55wh", tL = "_171z55wi", nL = "_171z55wj", aL = "_171z55wk", rL = "_171z55wl", sL = "_171z55wm", iL = "_171z55wn", lL = "_171z55wo", oL = "_171z55wp", cL = "_171z55wq", uL = "_171z55wr", dL = "_171z55ws", qb = "_171z55wt", fL = "_171z55wu", hL = "_171z55wv", mL = "_171z55ww", pL = "_171z55wx", gL = "_171z55wy", vL = "_171z55wz", yL = "_171z55w10", bL = "_171z55w11", xL = "_171z55w12", SL = "_171z55w13", wL = "_171z55w14", jL = "_171z55w15", EL = "_171z55w16", NL = "_171z55w17", CL = "_171z55w18", TL = "_171z55w19", RL = "_171z55w1a", _L = "_171z55w1b", ML = "_171z55w1c", AL = "_171z55w1d", DL = "_171z55w1e", kL = "_171z55w1f";
function zL({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i
}) {
  const o = g.useMemo(() => AO(t), [t]), u = g.useMemo(() => kO(a), [a]), f = s.trim().length > 0 ? s : RO, m = g.useMemo(() => zO(f), [f]), y = o[0].id, p = u[0].id, [b, v] = g.useState([]), [w, S] = g.useState([]), [j, N] = g.useState(null), [C, T] = g.useState(null), [M, z] = g.useState(y), [R, I] = g.useState(p), [X, ie] = g.useState(null), [A, V] = g.useState(null), [D, H] = g.useState(null), [te, K] = g.useState(null), [le, re] = g.useState(!1), k = g.useRef(null), $ = g.useRef(null), q = g.useRef(/* @__PURE__ */ new Map()), F = g.useRef(null), ce = g.useRef(1e3), _ = g.useCallback(() => (ce.current += 1, `job-${ce.current}`), []), ne = g.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    return bc(m).forEach((me, be) => Q.set(me.id, be)), Q;
  }, [m]), J = g.useCallback((Q) => ne.get(Q) ?? Number.MAX_SAFE_INTEGER, [ne]);
  g.useEffect(() => {
    const Q = new Set(bc(m).map((me) => me.id));
    v((me) => {
      const be = me.filter((Ie) => Ie.segIds.every((Ge) => Q.has(Ge)));
      return be.length === me.length ? me : be;
    });
  }, [m]);
  const Y = g.useCallback((Q) => {
    const me = k.current;
    if (!me || !Q) return { top: 60, left: 0 };
    const be = Q.getBoundingClientRect(), Ie = me.getBoundingClientRect();
    let Ge = be.left - Ie.left + me.scrollLeft;
    const pe = be.bottom - Ie.top + me.scrollTop + 10, Ee = Math.max(0, me.clientWidth - 318);
    return Ge = Math.max(0, Math.min(Ge, Ee)), { top: pe, left: Ge };
  }, []), U = g.useCallback(() => {
    S([]), N(null), T(null), ie(null);
  }, []), W = g.useCallback(
    (Q, me) => {
      const be = [...Q.segIds].sort((Ge, pe) => J(Ge) - J(pe))[0], Ie = me ?? q.current.get(be) ?? null;
      T(Q.id), S([...Q.segIds]), N(be), z(Q.voiceId), I(Q.emotion), ie(Y(Ie)), H(Q.id);
    },
    [J, Y]
  ), ue = g.useCallback(
    (Q, me, be) => {
      const Ie = ZS(b, Q);
      if (Ie) {
        W(Ie, me);
        return;
      }
      const Ge = Y(me);
      if (be && j != null && C == null) {
        const pe = J(j), Ee = J(Q), Ne = OO(m, Math.min(pe, Ee), Math.max(pe, Ee));
        if (Vb(b, Ne)) {
          S(Ne), T(null), ie(Ge);
          return;
        }
      }
      S([Q]), N(Q), T(null), ie(Ge);
    },
    [b, m, j, C, Y, W, J]
  ), ve = g.useCallback(() => {
    if (C) {
      v(
        (be) => be.map(
          (Ie) => Ie.id === C ? { ...Ie, voiceId: M, emotion: R, status: "queued" } : Ie
        )
      ), H(C), S([]), N(null), T(null), ie(null);
      return;
    }
    if (w.length === 0 || !Vb(b, w)) return;
    const Q = _(), me = { id: Q, segIds: [...w], voiceId: M, emotion: R, status: "queued" };
    v((be) => [...be, me]), H(Q), S([]), N(null), ie(null);
  }, [C, w, b, M, R, _]), _e = g.useCallback((Q) => {
    v((me) => me.filter((be) => be.id !== Q)), H((me) => me === Q ? null : me), K((me) => me === Q ? null : me), S([]), N(null), T(null), ie(null);
  }, []), st = g.useCallback((Q) => {
    K((me) => me === Q ? null : Q);
  }, []), Ce = g.useCallback((Q) => {
    $.current?.scrollBy({ left: Q * 280, behavior: "smooth" });
  }, []), Je = g.useCallback(
    (Q) => {
      const me = o.findIndex((Ie) => Ie.id === M), be = o[(me + Q + o.length) % o.length];
      z(be.id), F.current?.querySelector(`[data-voice="${be.id}"]`)?.focus();
    },
    [o, M]
  ), He = g.useCallback(
    (Q) => {
      const me = u.findIndex((Ie) => Ie.id === R), be = u[(me + Q + u.length) % u.length];
      I(be.id), F.current?.querySelector(`[data-emotion="${be.id}"]`)?.focus();
    },
    [u, R]
  ), Ve = X ? C ?? w[0] ?? "new" : null;
  g.useEffect(() => {
    if (Ve == null) return;
    const Q = requestAnimationFrame(() => {
      F.current?.querySelector(`[data-voice="${M}"]`)?.focus();
    });
    return () => cancelAnimationFrame(Q);
  }, [Ve]);
  const It = g.useCallback(
    (Q) => {
      Q.key === "Escape" && (Q.preventDefault(), U());
    },
    [U]
  ), jt = g.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    for (const me of b) for (const be of me.segIds) Q.set(be, me);
    return Q;
  }, [b]), At = g.useMemo(() => JS(m, b), [m, b]), Mn = g.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    for (const me of b) {
      const be = [...me.segIds].sort((Ie, Ge) => J(Ie) - J(Ge))[0];
      be && Q.set(me.id, be);
    }
    return Q;
  }, [b, J]), dt = g.useMemo(() => $O(m, b), [m, b]), Qt = g.useMemo(() => {
    const Q = /* @__PURE__ */ new Set();
    for (const me of b) for (const be of me.segIds) Q.add(be);
    return Q.size;
  }, [b]), un = g.useMemo(() => bc(m).length, [m]), Dt = g.useMemo(() => UO(m), [m]), tn = BO(b), Rt = tc(o, M), we = (Q) => Q.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: HO, children: [
    /* @__PURE__ */ c.jsxs("div", { style: OL, children: [
      /* @__PURE__ */ c.jsx("span", { className: nc, children: "Storyboard · click a phrase to cast it · shift-click to extend" }),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: Hb,
          style: { width: 30, height: 30 },
          "aria-pressed": le,
          title: le ? "Done editing text" : "Edit script text",
          onClick: () => re((Q) => !Q),
          children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: le ? "check" : "edit" })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("div", { style: LL, children: /* @__PURE__ */ c.jsxs("span", { className: qO, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("strong", { children: Qt }),
        " cast"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("strong", { children: un }),
        " phrases"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("strong", { children: Dt }),
        " words"
      ] })
    ] }) }),
    le ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (Q) => i(Q.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: VL
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: k,
        className: FO,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onClick: () => {
          X && U();
        },
        children: [
          m.map((Q) => /* @__PURE__ */ c.jsx("p", { className: YO, children: Q.segs.map((me) => {
            const be = jt.get(me.id), Ie = w.includes(me.id), Ge = !!be && (A === be.id || D === be.id), pe = !!be && Mn.get(be.id) === me.id, Ee = be ? tc(o, be.voiceId) : null;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              pe && Ee && /* @__PURE__ */ c.jsx("span", { className: PO, style: HL(Ee), "aria-hidden": "true", children: Ee.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (Ne) => {
                    Ne && q.current.set(me.id, Ne);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": Ie || !!be,
                  "aria-label": be ? `${tc(o, be.voiceId).name} · ${me.text.trim()}` : me.text.trim(),
                  className: GO,
                  style: IL(Ie, Ee, Ge, me.kind),
                  onClick: (Ne) => {
                    Ne.stopPropagation(), ue(me.id, Ne.currentTarget, Ne.shiftKey);
                  },
                  onKeyDown: (Ne) => {
                    (Ne.key === "Enter" || Ne.key === " ") && (Ne.preventDefault(), ue(me.id, Ne.currentTarget, Ne.shiftKey));
                  },
                  onMouseEnter: be ? () => V(be.id) : void 0,
                  onMouseLeave: be ? () => V(null) : void 0,
                  children: me.text
                }
              )
            ] }, me.id);
          }) }, Q.id)),
          X && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: F,
              className: KO,
              role: "dialog",
              "aria-label": C ? "Edit casting" : "Cast voice",
              style: { top: X.top, left: X.left },
              onClick: we,
              onMouseDown: we,
              onKeyDown: It,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: XO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: QO, children: C ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: Hb,
                      style: { width: 24, height: 24 },
                      "aria-label": "Cancel",
                      onClick: U,
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx(
                  "div",
                  {
                    className: ZO,
                    role: "radiogroup",
                    "aria-label": "Voice",
                    onKeyDown: (Q) => {
                      Q.key === "ArrowRight" || Q.key === "ArrowDown" ? (Q.preventDefault(), Je(1)) : (Q.key === "ArrowLeft" || Q.key === "ArrowUp") && (Q.preventDefault(), Je(-1));
                    },
                    children: o.map((Q) => {
                      const me = M === Q.id;
                      return /* @__PURE__ */ c.jsxs(
                        "button",
                        {
                          type: "button",
                          role: "radio",
                          "aria-checked": me,
                          "data-voice": Q.id,
                          tabIndex: me ? 0 : -1,
                          className: JO,
                          style: qL(Q, me),
                          onClick: () => z(Q.id),
                          children: [
                            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 19, color: me ? Q.color : "var(--on-surface-variant)" }, children: Q.icon }),
                            /* @__PURE__ */ c.jsx("span", { style: { fontSize: 11, fontWeight: 600, color: me ? "var(--on-surface)" : "var(--on-surface-variant)" }, children: Q.name }),
                            /* @__PURE__ */ c.jsx("span", { style: $L, children: Q.role })
                          ]
                        },
                        Q.id
                      );
                    })
                  }
                ),
                /* @__PURE__ */ c.jsx("div", { className: WO }),
                /* @__PURE__ */ c.jsxs("div", { className: eL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: nc, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: tL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (Q) => {
                        Q.key === "ArrowRight" || Q.key === "ArrowDown" ? (Q.preventDefault(), He(1)) : (Q.key === "ArrowLeft" || Q.key === "ArrowUp") && (Q.preventDefault(), He(-1));
                      },
                      children: u.map((Q) => {
                        const me = R === Q.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": me,
                            "data-emotion": Q.id,
                            tabIndex: me ? 0 : -1,
                            className: nL,
                            style: FL(Rt, me),
                            onClick: () => I(Q.id),
                            children: Q.label
                          },
                          Q.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: aL, children: /* @__PURE__ */ c.jsx("span", { className: rL, children: Ub(m, w) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: sL, children: [
                  C && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: iL,
                      "aria-label": "Remove casting",
                      onClick: () => C && _e(C),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: YL(Rt),
                      onClick: ve,
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 17 }, "aria-hidden": "true", children: "check" }),
                        C ? "Update" : "Cast"
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
    /* @__PURE__ */ c.jsxs("div", { className: lL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: oL, children: [
        /* @__PURE__ */ c.jsxs("div", { className: cL, children: [
          /* @__PURE__ */ c.jsx("span", { className: nc, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: uL, children: b.length }),
          tn && /* @__PURE__ */ c.jsx("span", { className: dL, children: tn })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsxs("span", { "aria-live": "polite", style: UL, children: [
            /* @__PURE__ */ c.jsx("span", { style: BL }),
            "Live"
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: qb, "aria-label": "Scroll segments left", onClick: () => Ce(-1), disabled: b.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: qb, "aria-label": "Scroll segments right", onClick: () => Ce(1), disabled: b.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: $, className: fL, children: [
        At.map((Q) => {
          const me = tc(o, Q.voiceId), be = NO[Q.status], Ie = D === Q.id || A === Q.id, Ge = te === Q.id, pe = Ub(m, Q.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${me.name} ${dt[Q.id]} — ${Ib(u, Q.emotion)} — ${be.label}`,
              className: hL,
              style: GL(me, Ie),
              onClick: () => W(Q),
              onKeyDown: (Ee) => {
                (Ee.key === "Enter" || Ee.key === " ") && (Ee.preventDefault(), W(Q));
              },
              onMouseEnter: () => V(Q.id),
              onMouseLeave: () => V(null),
              onFocus: () => H(Q.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: mL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: pL, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: me.color }, children: me.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: gL, children: me.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: vL, children: dt[Q.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: yL, children: pe }),
                /* @__PURE__ */ c.jsxs("div", { className: bL, children: [
                  /* @__PURE__ */ c.jsx("span", { style: PL(me), children: Ib(u, Q.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: xL, children: [
                    /* @__PURE__ */ c.jsx("span", { style: KL(be) }),
                    /* @__PURE__ */ c.jsx("span", { style: XL(be, Q.status), children: be.label })
                  ] })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: SL, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: wL,
                      "aria-label": Ge ? "Pause preview" : "Preview audio",
                      onClick: (Ee) => {
                        Ee.stopPropagation(), st(Q.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: Ge ? "pause_circle" : "play_circle" }),
                        Ge ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: jL,
                      "aria-label": `Remove ${dt[Q.id]}`,
                      onClick: (Ee) => {
                        Ee.stopPropagation(), _e(Q.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                Ge && /* @__PURE__ */ c.jsx("div", { className: EL, children: /* @__PURE__ */ c.jsx("div", { style: QL(me) }) })
              ]
            },
            Q.id
          );
        }),
        b.length === 0 && /* @__PURE__ */ c.jsxs("div", { className: NL, children: [
          /* @__PURE__ */ c.jsx("span", { className: CL, children: "0" }),
          /* @__PURE__ */ c.jsx("span", { className: TL, children: "No segments cast yet. Select a phrase above to begin." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: RL, children: [
      /* @__PURE__ */ c.jsxs("div", { className: _L, children: [
        /* @__PURE__ */ c.jsx("span", { className: nc, style: { fontSize: 9.5, marginBottom: 0 }, children: "Voices" }),
        /* @__PURE__ */ c.jsx("div", { className: ML, children: o.map((Q) => {
          const me = b.some((be) => be.voiceId === Q.id);
          return /* @__PURE__ */ c.jsxs("span", { className: AL, style: { border: `1px solid ${me ? `rgba(${Q.rgb},0.35)` : "rgba(70,72,74,0.3)"}` }, children: [
            /* @__PURE__ */ c.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: Q.color, boxShadow: me ? `0 0 8px rgba(${Q.rgb},0.7)` : "none", flexShrink: 0 } }),
            /* @__PURE__ */ c.jsx("span", { className: DL, style: { color: me ? "var(--on-surface)" : "var(--on-surface-variant)" }, children: Q.lib })
          ] }, Q.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: kL, children: [
        "Cast every phrase, then ",
        /* @__PURE__ */ c.jsx("strong", { children: "Generate" }),
        " from the top bar."
      ] })
    ] })
  ] });
}
const OL = { display: "flex", alignItems: "center", justifyContent: "space-between" }, LL = { display: "flex" }, $L = { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, UL = {
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
}, BL = { width: 6, height: 6, borderRadius: 999, background: "var(--acid-green, #22c55e)", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }, VL = {
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
function IL(t, a, s, i) {
  const o = { borderRadius: 4, padding: "1.5px 1px", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, u = "186,158,255";
  if (t) return { ...o, background: `rgba(${u},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${u},0.55)`, color: "var(--on-surface)" };
  if (a) {
    const f = s ? `, inset 0 0 0 1px rgba(${a.rgb},0.8)` : "";
    return { ...o, background: `rgba(${a.rgb},${s ? 0.22 : 0.12})`, boxShadow: `inset 0 -2px 0 ${a.color}${f}`, color: "var(--on-surface)" };
  }
  return { ...o, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function HL(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function qL(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.6)` : "rgba(70,72,74,0.4)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-floor, #000)"
  };
}
function FL(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(70,72,74,0.4)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-floor, #000)",
    color: a ? t.color : "var(--on-surface-variant)"
  };
}
function YL(t) {
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
function GL(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function PL(t) {
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
function KL(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${IO} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function XL(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function QL(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${VO} 1.1s linear infinite` };
}
var ZL = "xq3iim0", JL = "xq3iim1", WL = "xq3iim2", e6 = "xq3iim3", t6 = "xq3iim4", n6 = "xq3iim5", a6 = "xq3iim6", r6 = "xq3iim7", s6 = "xq3iim8", i6 = "xq3iim9", l6 = "xq3iima", o6 = "xq3iimb", c6 = "xq3iimc", u6 = "xq3iimd", d6 = "xq3iime", f6 = "xq3iimf", h6 = "xq3iimg", m6 = "xq3iimh", p6 = "xq3iimi", g6 = "xq3iimj", v6 = "xq3iimk", Fb = "xq3iiml";
function y6({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = g.useState([]), [u, f] = g.useState(a), [m, y] = g.useState(!0), [p, b] = g.useState(!1), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), C = g.useRef(null);
  g.useEffect(() => {
    let R = !1;
    return y(!0), Xs(t).then(({ voiceAssets: I }) => {
      R || o(I);
    }).catch((I) => {
      R || w(I instanceof Error ? I.message : "Failed to load voices");
    }).finally(() => {
      R || y(!1);
    }), () => {
      R = !0;
    };
  }, [t]), g.useEffect(() => {
    if (!S) return;
    const R = (X) => {
      N.current && (X.target instanceof Node && N.current.contains(X.target) || j(!1));
    }, I = (X) => {
      X.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", I), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", I);
    };
  }, [S]);
  const T = g.useCallback(
    async (R) => {
      b(!0), w(null);
      const I = u, X = R === u ? null : R;
      f(X), j(!1);
      try {
        await JC(t, X), s?.(X);
      } catch (ie) {
        f(I), w(ie instanceof Error ? ie.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), M = g.useMemo(
    () => i.find((R) => R.voiceAssetId === u) ?? null,
    [i, u]
  ), z = g.useMemo(() => {
    const R = [], I = [];
    for (const X of i)
      X.kind === "speaker" || X.kind === "mixed" ? R.push(X) : I.push(X);
    return { uploaded: R, other: I };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: Fb, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Fb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: ZL, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: C,
        type: "button",
        className: `${JL} ${S ? WL : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((R) => !R),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: e6, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: t6, children: [
            /* @__PURE__ */ c.jsx("span", { className: n6, children: M ? M.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: a6, children: M ? WS(M) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: r6, "aria-hidden": "true", children: b6.map((R, I) => /* @__PURE__ */ c.jsx("i", { style: { height: `${R * 100}%` } }, I)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${s6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: i6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: l6, children: /* @__PURE__ */ c.jsx("span", { className: o6, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: c6, role: "alert", children: v }),
          z.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Yb, { label: "Uploaded", children: z.uploaded.map((R) => /* @__PURE__ */ c.jsx(
            Gb,
            {
              voice: R,
              selected: u === R.voiceAssetId,
              onSelect: () => void T(R.voiceAssetId)
            },
            R.voiceAssetId
          )) }),
          z.other.length > 0 && /* @__PURE__ */ c.jsx(Yb, { label: "Other", children: z.other.map((R) => /* @__PURE__ */ c.jsx(
            Gb,
            {
              voice: R,
              selected: u === R.voiceAssetId,
              onSelect: () => void T(R.voiceAssetId)
            },
            R.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function Yb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: u6, children: [
    /* @__PURE__ */ c.jsx("div", { className: d6, children: t }),
    a
  ] });
}
function Gb({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${f6} ${a ? h6 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: m6, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: p6, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: g6, children: WS(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${v6}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const b6 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function WS(t) {
  const a = [];
  return t.durationMs != null && a.push(x6(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function x6(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const Pb = [
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
function S6(t) {
  const a = ei(), s = g.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = g.useMemo(
    () => j6(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const v = s.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? BR : LR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: $R, "aria-hidden": "true", children: i.map((b, v) => w6(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? VR : UR,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: p ? void 0 : y,
          placeholder: p ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ c.jsxs(Rn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((b) => /* @__PURE__ */ c.jsxs(
        Ke,
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
      /* @__PURE__ */ c.jsx("ul", { className: d0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("ul", { className: d0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function w6(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: u0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? c0 : `${c0} ${IR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: HR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: u0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function j6(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), y = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const C = j + 1, T = N.match(i);
    let M = "Narrator", z = N, R, I = !1;
    if (T?.groups) {
      I = !0;
      const V = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      M = ((V.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (V.includes("|") ? V.slice(V.indexOf("|") + 1) : "").trim() || void 0, z = D;
    }
    w += 1;
    const X = M.toLowerCase(), ie = (m.get(X) ?? 0) + 1;
    m.set(X, ie);
    const A = M === "Narrator" || s.has(X);
    if (A || f.add(M), M !== "Narrator" && !p.has(X) && (p.set(X, Pb[b % Pb.length] ?? "currentColor"), b += 1), I) {
      const V = { kind: "character", raw: S, character: M, text: z, hasMapping: A };
      R !== void 0 && (V.override = R), o.push(V);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: C, character: M, text: z, hasMapping: A }), y.push(
      `${w.toString().padStart(3, "0")}_${E6(M)}_${ie.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function E6(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Kb = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], ew = 1e-3;
function N6(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function C6() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function T6(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function tw(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function nw(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function R6(t) {
  const a = [];
  for (let s = 0; s < Kb.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < ew || a.push(`${Kb[s]}=${nw(tw(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function _6(t, a) {
  const s = N6(t.character) || "Narrator", i = T6(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = R6(m.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = tw(t.alpha);
  return Math.abs(u - 1) >= ew && o.push(`emotion_alpha:${nw(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function aw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = _6(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: C6(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var M6 = "_1827s3t2", A6 = "_1827s3t3", D6 = "_1827s3t4", k6 = "_1827s3t5", z6 = "_1827s3t6", O6 = "_1827s3t7", L6 = "_1827s3t8", $6 = "_1827s3t9", U6 = "_1827s3ta", B6 = "_1827s3tb", V6 = "_1827s3td _1827s3tc", I6 = "_1827s3te _1827s3tc", H6 = "_1827s3tf", q6 = "_1827s3tg", F6 = "_1827s3th", Y6 = "_1827s3ti _1827s3tc", G6 = "_1827s3tj", P6 = "_1827s3tk", K6 = "_1827s3tl", X6 = "_1827s3tm", Q6 = "_1827s3tn", Z6 = "_1827s3to", J6 = "_1827s3tp", W6 = "_1827s3tq", e8 = "_1827s3tr", t8 = "_1827s3ts", n8 = "_1827s3tt", a8 = "_1827s3tu";
function r8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = g.useId(), u = g.useId(), f = g.useId(), m = g.useRef(null), y = g.useRef(/* @__PURE__ */ new Map()), p = g.useRef(/* @__PURE__ */ new Map()), b = g.useRef(/* @__PURE__ */ new Map()), [v, w] = g.useState(null), [S, j] = g.useState(!1), N = g.useRef(null), C = g.useRef(null), [T, M] = g.useState(null), [z, R] = g.useState(null), [I, X] = g.useState("");
  g.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? y.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && C.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const ie = t.filter((U) => U.text.trim().length > 0).length, A = g.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const W of t) {
      const ue = W.character.trim(), ve = ue.toLowerCase();
      !ve || ve === "narrator" || i.has(ve) || U.has(ve) || U.set(ve, ue);
    }
    return Array.from(U.values()).sort((W, ue) => W.localeCompare(ue));
  }, [t, i]), V = A.length, D = g.useRef(V), [H, te] = g.useState(0);
  g.useEffect(() => {
    V > D.current && te((U) => U + 1), D.current = V;
  }, [V]), g.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const U = (ue) => {
      if (!C.current || !N.current) return;
      const ve = ue.target;
      C.current.contains(ve) || N.current.contains(ve) || j(!1);
    }, W = (ue) => {
      ue.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", U), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", W);
    };
  }, [S]);
  const K = g.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    return i.forEach((W) => U.add(W.characterName)), Array.from(U).sort((W, ue) => W.localeCompare(ue));
  }, [i]), le = g.useCallback(
    (U, W) => {
      a(t.map((ue) => ue.id === U ? { ...ue, ...W } : ue));
    },
    [t, a]
  ), re = g.useRef(t);
  g.useEffect(() => {
    re.current = t;
  }, [t]);
  const k = g.useCallback(
    (U) => {
      const W = t.findIndex((Je) => Je.id === U);
      if (W < 0) return;
      const ue = t[W];
      if (!ue) return;
      const ve = W > 0 ? t[W - 1]?.id ?? null : null, _e = t.filter((Je) => Je.id !== U);
      a(_e);
      const st = ue.character.trim() || `Line ${W + 1}`;
      cn(`Removed ${st}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const Je = re.current;
            if (Je.some((jt) => jt.id === ue.id)) return;
            const He = [...Je], Ve = ve ? Je.findIndex((jt) => jt.id === ve) : -1, It = Ve >= 0 ? Ve + 1 : 0;
            He.splice(It, 0, ue), a(He);
          }
        },
        duration: 5e3
      });
      const Ce = `Removed line ${W + 1}, now ${_e.length} ${_e.length === 1 ? "line" : "lines"}`;
      if (X((Je) => Je === Ce ? `${Ce}​` : Ce), _e.length === 0)
        w({ kind: "addBtn" });
      else {
        const Je = W < _e.length ? W : _e.length - 1, He = _e[Je];
        w(He ? { kind: "remove", rowId: He.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), $ = g.useCallback(
    (U) => {
      const W = Yr();
      let ue;
      if (U === null)
        ue = [...t, W];
      else {
        const ve = t.findIndex((_e) => _e.id === U);
        ue = ve < 0 ? [...t, W] : [...t.slice(0, ve + 1), W, ...t.slice(ve + 1)];
      }
      a(ue), w({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), q = g.useCallback(
    (U, W) => {
      const ue = t.findIndex((Ve) => Ve.id === U);
      if (ue < 0) return;
      const ve = ue + W;
      if (ve < 0 || ve >= t.length) return;
      const _e = [...t], st = _e[ue], Ce = _e[ve];
      if (!st || !Ce) return;
      _e[ue] = Ce, _e[ve] = st, a(_e);
      const He = `Moved ${st.character.trim() || `Line ${ue + 1}`} to position ${ve + 1} of ${_e.length}`;
      X((Ve) => Ve === He ? `${He}​` : He);
    },
    [t, a]
  ), F = g.useCallback(
    (U, W) => {
      U.key === "Enter" && !U.shiftKey ? (U.preventDefault(), $(W)) : U.altKey && U.key === "ArrowUp" ? (U.preventDefault(), q(W, -1)) : U.altKey && U.key === "ArrowDown" && (U.preventDefault(), q(W, 1));
    },
    [$, q]
  ), ce = g.useCallback((U, W) => {
    M(W), U.dataTransfer.effectAllowed = "move", U.dataTransfer.setData("text/plain", W);
  }, []), _ = g.useCallback((U, W) => {
    T && (U.preventDefault(), U.dataTransfer.dropEffect = "move", z !== W && R(W));
  }, [T, z]), ne = g.useCallback(
    (U, W) => {
      U.preventDefault();
      const ue = T ?? U.dataTransfer.getData("text/plain");
      if (M(null), R(null), !ue || ue === W) return;
      const ve = t.findIndex((Ve) => Ve.id === ue), _e = t.findIndex((Ve) => Ve.id === W);
      if (ve < 0 || _e < 0) return;
      const st = [...t], [Ce] = st.splice(ve, 1);
      if (!Ce) return;
      st.splice(_e, 0, Ce), a(st);
      const He = `Moved ${Ce.character.trim() || `Line ${ve + 1}`} to position ${_e + 1} of ${st.length}`;
      X((Ve) => Ve === He ? `${He}​` : He);
    },
    [t, a, T]
  ), J = g.useCallback(() => {
    M(null), R(null);
  }, []), Y = g.useCallback(
    (U) => {
      const W = t.find((ue) => ue.character.trim().toLowerCase() === U.toLowerCase());
      W && w({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: M6, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: A6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: D6, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: n8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: k6, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: z6, children: ie.toString().padStart(2, "0") }),
        " lines",
        V > 0 && /* @__PURE__ */ c.jsxs("span", { className: P6, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: a8,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((U) => !U),
              children: [
                "⚠ ",
                V,
                " unmapped"
              ]
            },
            H
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: C,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: K6,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: X6, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: Q6, children: A.map((U) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: Z6,
                    onClick: () => Y(U),
                    children: U
                  }
                ) }, U)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: e8, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: O6, children: t.map((U, W) => {
      const ue = U.character.trim() || `line ${W + 1}`, ve = i.has(U.character.trim().toLowerCase()), _e = T === U.id, st = z === U.id && T !== U.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: L6,
          "data-mapped": ve || void 0,
          "data-dragging": _e || void 0,
          "data-drag-over": st || void 0,
          onDragOver: (Ce) => _(Ce, U.id),
          onDrop: (Ce) => ne(Ce, U.id),
          onDragEnd: J,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: $6,
                draggable: !0,
                "aria-label": `Drag to reorder ${ue}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ce) => ce(Ce, U.id),
                onKeyDown: (Ce) => {
                  Ce.altKey && Ce.key === "ArrowUp" ? (Ce.preventDefault(), q(U.id, -1)) : Ce.altKey && Ce.key === "ArrowDown" && (Ce.preventDefault(), q(U.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: B6, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ce) => {
                  Ce ? b.current.set(U.id, Ce) : b.current.delete(U.id);
                },
                type: "text",
                value: U.character,
                onChange: (Ce) => le(U.id, { character: Ce.target.value }),
                placeholder: "Character",
                className: V6,
                "aria-label": `Character name for ${ue}`,
                list: K.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: U.presetId ?? "",
                onChange: (Ce) => le(U.id, { presetId: Ce.target.value === "" ? null : Ce.target.value }),
                className: I6,
                "aria-label": `Emotion preset for ${ue}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ce) => /* @__PURE__ */ c.jsx("option", { value: Ce.presetId, children: Ce.presetName }, Ce.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: H6, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: U.alpha,
                  onChange: (Ce) => le(U.id, { alpha: Number.parseFloat(Ce.target.value) }),
                  className: q6,
                  "aria-label": `Emotion intensity for ${ue}`,
                  "aria-valuetext": `${Math.round(U.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: F6,
                  "aria-hidden": "true",
                  "data-hot": U.alpha >= 0.85 || void 0,
                  children: (Math.round(U.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ce) => {
                  Ce ? y.current.set(U.id, Ce) : y.current.delete(U.id);
                },
                type: "text",
                value: U.text,
                onChange: (Ce) => le(U.id, { text: Ce.target.value }),
                onKeyDown: (Ce) => F(Ce, U.id),
                placeholder: "Line text…",
                className: Y6,
                "aria-label": `Line text for ${ue}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ce) => {
                  Ce ? p.current.set(U.id, Ce) : p.current.delete(U.id);
                },
                type: "button",
                className: G6,
                "aria-label": `Remove ${ue}`,
                title: "Remove this line",
                onClick: () => k(U.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: U6,
                "aria-label": `Insert line after ${ue}`,
                title: "Insert line below",
                onClick: () => $(U.id),
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
        ref: m,
        type: "button",
        className: J6,
        onClick: () => $(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: W6, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    K.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: K.map((U) => /* @__PURE__ */ c.jsx("option", { value: U }, U)) }),
    /* @__PURE__ */ c.jsx("div", { className: t8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: I })
  ] });
}
var s8 = "fmg0gf0", i8 = "fmg0gf1", Xb = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click phrases to cast voice + emotion in bulk" }
], l8 = Hs;
function o8({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = g.useRef([]), o = g.useCallback(
    (f, m) => {
      const y = Hs.length;
      let p = f;
      for (let v = 1; v <= y; v += 1) {
        const w = (f + m * v + y) % y, S = Hs[w];
        if (!S) continue;
        if (!(S.id === "story" && s)) {
          p = w;
          break;
        }
      }
      const b = Hs[p];
      b && (a(b.id), i.current[p]?.focus());
    },
    [a, s]
  ), u = g.useCallback(
    (f, m) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(m, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(m, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Hs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: s8, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, m) => {
    const y = f.id === t, p = f.id === "story" && s, b = p ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          i.current[m] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": y,
        "aria-disabled": p || void 0,
        tabIndex: y ? 0 : -1,
        title: p ? `${f.description} — coming soon` : f.description,
        className: y ? Xb.active : Xb.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (v) => u(v, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: i8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const c8 = [
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
function u8(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of c8) {
    const C = f[N];
    typeof C == "string" && (u[N] = C);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), y = s.createTextNode(m.replace(/ /g, " ")), p = s.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(p), s.body.appendChild(i);
  const b = p.getBoundingClientRect(), v = i.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const rw = {
  character: "@",
  emotion: "/"
}, sw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), d8 = /[\p{L}\p{N}_-]/u, f8 = /[^\p{L}\p{N}_-]+/gu;
function iw(t) {
  return t ? d8.test(t) : !1;
}
function h8(t) {
  return t.replace(f8, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function m8(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Oc(t, a) {
  const s = m8(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function Lc(t) {
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
    const f = t[i], m = f === "@" || f === "/", y = i === 0 ? "" : Oc(t, xc(t, i)), p = i === 0 || y !== "" && sw.has(y);
    if (m && p) {
      let b = i + 1, v = "";
      for (; b < o; ) {
        const w = Oc(t, b);
        if (w && iw(w))
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
function xc(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function p8(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = xc(t, a), i = "";
  for (; s >= 0; ) {
    const o = Oc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Oc(t, xc(t, s));
      return s === 0 || f !== "" && sw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!iw(o)) return null;
    i = o + i;
    const u = xc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var g8 = "_1d2ofoy5", v8 = "_1d2ofoy6", y8 = "_1d2ofoy8 _1d2ofoy7", b8 = "_1d2ofoy9 _1d2ofoy7", x8 = "_1d2ofoya", S8 = "_1d2ofoyb", w8 = "_1d2ofoyc", j8 = "_1d2ofoye", E8 = "_1d2ofoyf", N8 = "_1d2ofoyg", C8 = "_1d2ofoyh", T8 = "_1d2ofoyi", R8 = "_1d2ofoyj", ac = "_1d2ofoyk", _8 = "_1d2ofoyl";
const M8 = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function A8({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = g.useRef(null), f = g.useRef(null), m = g.useId(), y = `${m}-opt`, [p, b] = g.useState(null), v = g.useMemo(() => Lc(t), [t]), w = g.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((H) => D.set(H.characterName.toLowerCase(), H.characterName));
    for (const H of s) {
      const te = H.toLowerCase();
      D.has(te) || D.set(te, H);
    }
    return Array.from(D.values()).sort((H, te) => H.localeCompare(te));
  }, [s, o]), S = g.useMemo(() => {
    if (!p) return [];
    const D = p.query.toLowerCase();
    if (p.kind === "character")
      return w.filter((K) => K.toLowerCase().includes(D)).slice(0, 8).map((K) => {
        const le = o.get(K.toLowerCase());
        return { value: K, hint: le ? "mapped" : "unmapped" };
      });
    const H = /* @__PURE__ */ new Set(), te = [];
    for (const K of i) {
      const le = K.presetName.toLowerCase();
      if (le.includes(D) && !H.has(le) && (H.add(le), te.push({ value: K.presetName, hint: "vector" }), te.length >= 8))
        break;
    }
    return te;
  }, [p, w, o, i]), j = g.useCallback((D, H, te) => {
    if (H < 0) return null;
    const K = p8(D, H);
    if (!K) return null;
    const le = u.current, re = le ? u8(le, H) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: K.start,
      query: K.query,
      kind: K.kind,
      selected: te && te.kind === K.kind ? te.selected : 0,
      caretTop: re.top,
      caretLeft: re.left,
      caretHeight: re.height
    };
  }, []), N = g.useCallback(() => {
    const D = u.current;
    if (!D) {
      b(null);
      return;
    }
    const H = D.selectionStart;
    if (H !== D.selectionEnd) {
      b(null);
      return;
    }
    b((te) => j(t, H, te));
  }, [t, j]);
  g.useEffect(() => {
    if (!p) return;
    const D = S.length, H = D === 0 ? 0 : Math.min(p.selected, D - 1);
    p.selected !== H && b({ ...p, selected: H });
  }, [p, S]), g.useLayoutEffect(() => {
    const D = f.current, H = u.current;
    !D || !H || (D.scrollTop = H.scrollTop, D.scrollLeft = H.scrollLeft);
  }), g.useEffect(() => {
    const D = u.current, H = f.current;
    if (!D || !H) return;
    const te = () => {
      H.scrollTop = D.scrollTop, H.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", te, { passive: !0 }), () => D.removeEventListener("scroll", te);
  }, []);
  const C = g.useCallback(
    (D) => {
      const H = D.target.value;
      a(H);
      const te = D.target;
      requestAnimationFrame(() => {
        const K = te.selectionStart;
        if (K !== te.selectionEnd) {
          b(null);
          return;
        }
        b((le) => j(H, K, le));
      });
    },
    [a, j]
  ), T = g.useCallback(() => {
    N();
  }, [N]), M = g.useCallback(
    (D, H) => {
      if (!p) return;
      const te = rw[p.kind], K = p.triggerStart + 1 + p.query.length, le = t.slice(0, p.triggerStart), re = t.slice(K), k = h8(D);
      if (!k) return;
      const $ = `${te}${k} `, q = `${le}${$}${re}`;
      a(q);
      const F = le.length + $.length;
      b(null), H.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(F, F));
      });
    },
    [p, t, a]
  ), z = g.useCallback(
    (D) => {
      if (p) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((H) => H && { ...H, selected: (H.selected + 1) % S.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (H) => H && { ...H, selected: (H.selected - 1 + S.length) % S.length }
            );
          else if (D.key === "Enter") {
            const H = S[p.selected];
            H && (D.preventDefault(), M(H.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const H = S[p.selected];
            H && M(H.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, S, M]
  ), R = g.useRef(null), [I, X] = g.useState(null);
  g.useLayoutEffect(() => {
    if (!p) {
      X(null);
      return;
    }
    const D = R.current, H = u.current;
    if (!D || !H) return;
    const te = D.offsetWidth, K = H.clientWidth, le = Math.max(0, K - te - 8), re = Math.max(0, p.caretLeft);
    X(Math.min(re, le));
  }, [p]);
  const ie = p?.kind === "character" ? "Character" : "Emotion preset", A = p && S.length > 0 ? `${y}-${p.selected}` : void 0, V = !p || S.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: g8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: v8, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: y8, "aria-hidden": "true", children: D8(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: b8,
          value: t,
          onChange: C,
          onSelect: T,
          onKeyDown: z,
          placeholder: M8,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && S.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": A
        }
      ),
      p && (S.length > 0 || V) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: R,
          className: j8,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${I ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: E8, "aria-hidden": "true", children: ie }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ie,
                className: N8,
                children: S.map((D, H) => {
                  const te = `${y}-${H}`, K = H === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: te,
                      role: "option",
                      "aria-selected": K,
                      "data-active": K || void 0,
                      className: C8,
                      onMouseDown: (le) => {
                        le.preventDefault(), M(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: T8, children: D.hint })
                      ]
                    },
                    `${D.value}-${H}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: _8, children: V })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: R8, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ac, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ac, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ac, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ac, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function D8(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: x8, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: w8,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: S8, children: rw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var k8 = "_5o8xvy0", z8 = "_5o8xvy1", O8 = "_5o8xvy2", L8 = "_5o8xvy3", Yf = "_5o8xvy4", $8 = "_5o8xvy5", U8 = "_3f2ar0", B8 = "_3f2ar1", V8 = "_3f2ar2", I8 = "_3f2ar3", H8 = "_3f2ar4", q8 = "_3f2ar6", al = "_3f2ar7", rl = "_3f2ar8", sl = "_3f2ar9", Qb = "_3f2ara", Zb = "_3f2arb";
function F8({ label: t, glyph: a = "?", children: s }) {
  const [i, o] = g.useState(!1), u = g.useRef(null), f = g.useId(), m = `${f}-content`, y = g.useCallback(() => o(!1), []);
  return g.useEffect(() => {
    if (!i) return;
    const p = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || y());
    }, b = (v) => {
      v.key === "Escape" && y();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: U8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: B8,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: V8, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    i && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": f,
        className: I8,
        children: s
      }
    )
  ] });
}
var Y8 = "_1dxb1dg0", Jb = "_1dxb1dg1", G8 = "_1dxb1dg2", P8 = "_1dxb1dg3", K8 = "_1dxb1dg4";
function X8() {
  return /* @__PURE__ */ c.jsxs(F8, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: H8, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: q8, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: Qb, children: [
      /* @__PURE__ */ c.jsx("span", { className: Zb, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Qb, children: [
      /* @__PURE__ */ c.jsx("span", { className: Zb, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function Q8() {
  return /* @__PURE__ */ c.jsxs("ul", { className: Y8, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Jb, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Jb, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: G8, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: P8, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: K8, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function Z8({
  editorMode: t,
  onEditorModeChange: a,
  deployment: s,
  script: i,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: m,
  onStoryTextChange: y,
  storyCharacters: p,
  outputFormat: b,
  mappingsByLower: v,
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j,
  voiceAssets: N
}) {
  const C = t === "quick", T = t === "rows", M = t === "story", z = t === "storyboard", R = M || z, I = l8.find((D) => D.id === t)?.description ?? "", X = T ? u.reduce((D, H) => D + H.text.length, 0) : R ? m.length : i.length, ie = T ? u.map((D) => D.text).join(" ") : R ? m : i, A = ie.trim() ? ie.trim().split(/\s+/).length : 0, V = T ? u.filter((D) => D.text.trim().length > 0).length : (R ? m : i).trim() ? (R ? m : i).trim().split(/\r?\n/).filter((D) => D.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: k8, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${z8} ${C ? O8 : ""}`,
        "data-quick-on": C || void 0,
        children: [
          /* @__PURE__ */ c.jsx(o8, { value: t, onChange: a }),
          C && /* @__PURE__ */ c.jsx(
            y6,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: L8, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: X.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: V.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Yf, children: A.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !T && /* @__PURE__ */ c.jsx(X8, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: $8, "aria-live": "polite", children: I }),
    z ? /* @__PURE__ */ c.jsx(
      zL,
      {
        voiceAssets: N,
        presets: j,
        storyText: m,
        onStoryTextChange: y
      }
    ) : T ? /* @__PURE__ */ c.jsx(
      r8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : M ? /* @__PURE__ */ c.jsx(
      A8,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      S6,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: s.deploymentId,
        quickMode: C
      }
    ),
    !C && !T && !M && !z && /* @__PURE__ */ c.jsx(Q8, {})
  ] });
}
function J8({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: s,
  characters: i,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const m = [], y = t.trim();
  if (!y)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = y.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${y.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: s ? "ok" : "warn",
    label: "Quick voice",
    detail: s ? "default voice set" : "no default voice"
  }) : i.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${i.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), u.mode === "qwen_template" && !u.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (u.mode === "emotion_vector") {
    const p = u.vector, b = Array.isArray(p) && p.some((v) => Math.abs(v) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else u.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(f.intensity * 100)}% · pace ${f.pace.toFixed(2)}× · pitch ${f.pitchSt >= 0 ? "+" : ""}${f.pitchSt.toFixed(1)}st`
  }), m;
}
function Wb(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function W8(t, a, s, i) {
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
    return { script: aw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const y = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${ex(y)}`), p && b.push(`/${ex(p.presetName)}`), b.push(m), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Lc(s.storyText), u = [];
    for (const m of o)
      m.kind === "text" && u.push(m.value);
    return { script: u.join("").split(/\r?\n/).map((m) => m.replace(/[ \t]+/g, " ").trim()).filter((m) => m.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = Lc(s.storyText), u = /* @__PURE__ */ new Map();
    for (const w of i) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let m = "", y = null, p = "", b = !1;
    const v = () => {
      const w = p.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (p = "", w.length === 0) return;
      const S = w[0];
      if (S !== void 0) {
        f.push({
          ...Yr(),
          character: m,
          presetId: y,
          alpha: 1,
          text: S
        });
        for (let j = 1; j < w.length; j += 1) {
          const N = w[j];
          N !== void 0 && f.push({
            ...Yr(),
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
        b && v(), m = w.value, y = null, b = !0;
      else if (w.kind === "emotion") {
        b && v();
        const S = u.get(w.value.toLowerCase());
        y = S ? S.presetId : null, b = !0;
      } else
        p += w.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Yr()] };
  }
  return null;
}
function ex(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Gf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], e$ = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function t$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(e$);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? n$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function n$(t) {
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
function a$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function r$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Gf[s % Gf.length] ?? Gf[0]);
  }
  return a;
}
function s$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var i$ = "_1snzz30", l$ = "_1snzz31", o$ = "_1snzz33", c$ = "_1snzz34", u$ = "_1snzz36", tx = "_1snzz3b", nx = "_1snzz3c", ax = "_1snzz3d";
const d$ = "ext-action-invoke", f$ = "emotion-tts.run";
function h$() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(d$, {
      detail: { id: f$ },
      bubbles: !1
    })
  ), !0) : !1;
}
const m$ = 4e3;
function p$({ visible: t, canGenerate: a }) {
  const [s, i] = g.useState(null), [o, u] = g.useState(!1), [f, m] = g.useState(!1), y = g.useRef(null);
  g.useEffect(() => {
    let $ = !1;
    const q = async () => {
      try {
        const ce = await Ec();
        $ || (y.current = ce, i(ce));
      } catch {
      }
    };
    q();
    const F = window.setInterval(q, m$);
    return () => {
      $ = !0, window.clearInterval(F);
    };
  }, []), g.useEffect(() => GS(($) => {
    m(!!$.busy);
  }), []);
  const p = g.useCallback(() => {
    R4();
  }, []), b = s?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  g.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = g.useCallback(() => {
    u(!0), h$();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", C = o || w, T = o || w, M = T ? "transitioning" : v ? "running" : "stopped", z = !a || f || !S, R = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", I = S && a && !f, X = v ? "ready" : w || o ? "busy" : "off", ie = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", A = X === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const V = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", H = "#8455ef", te = "#1a0a3a", K = "#f0f0f3", le = "#aaabae", re = "#22c55e", k = v ? "◼" : "⏻";
  return Kh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: i$,
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
              className: l$,
              "data-tone": X,
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
                color: X === "ready" ? re : X === "busy" ? D : le,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${X === "ready" ? "rgba(34, 197, 94, 0.4)" : X === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: o$,
                    "data-pulse": A ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: X === "ready" ? `0 0 8px ${re}` : X === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ie
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: nx, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: c$,
                "data-state": M,
                onClick: j,
                disabled: C,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: M === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: M === "running" ? re : K,
                  fontSize: "16px",
                  cursor: C ? "not-allowed" : "pointer",
                  opacity: C ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${M === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: tx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: k })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: ax, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: nx, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: u$,
                "data-ready": I ? "true" : "false",
                onClick: p,
                disabled: z,
                "aria-label": R,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: z ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${D} 0%, ${H} 100%)`,
                  color: z ? le : te,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: z ? "not-allowed" : "pointer",
                  boxShadow: z ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  f ? /* @__PURE__ */ c.jsx("span", { className: tx, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: ax, role: "tooltip", children: R })
          ] })
        ]
      }
    ),
    document.body
  );
}
function g$(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = v$(t.deployment.displayName, t.deployment.deploymentId), o = XS(QS), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: gR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: vR, children: [
      /* @__PURE__ */ c.jsx("div", { className: bR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: yR, children: /* @__PURE__ */ c.jsx("h1", { className: xR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: SR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: DR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: wR, children: [
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
    /* @__PURE__ */ c.jsx(p$, { visible: o, canGenerate: u }),
    typeof document < "u" && Kh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: kR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: lO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function v$(t, a) {
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
  const [f, m] = g.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: jR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: ER, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: TR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: NR, children: [
            /* @__PURE__ */ c.jsx("span", { className: RR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: _R, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: MR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: CR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: AR,
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
        className: i === "split" ? OR : zR,
        children: u
      }
    )
  ] });
}
const Cn = {
  success(t) {
    cn.success(t);
  },
  error(t) {
    cn.error(t);
  }
}, Rh = "__recipe";
function y$(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function b$(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Rh && (a[s] = t[s]);
  return a;
}
function x$() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = El(), [o, u] = g.useState(a), [f, m] = g.useState([]), [y, p] = g.useState([]), [b, v] = g.useState(null), [w, S] = g.useState(Yc), j = g.useMemo(
    () => t.defaultGenerationOverridesJson ? y$(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = g.useMemo(() => {
    const pe = j[Rh];
    return typeof pe == "object" && pe !== null ? pe : {};
  }, [j]), [C, T] = g.useState(""), [M, z] = g.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [R, I] = g.useState(t.defaultSpeedFactor ?? 1), [X, ie] = g.useState({
    mode: "none",
    emotionAlpha: 1
  }), [A, V] = g.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...b$(j)
  })), [D, H] = g.useState(() => {
    const pe = N.cachePolicy;
    return pe === "use_cache" || pe === "force_regenerate" || pe === "read_only_cache" ? pe : "use_cache";
  }), [te, K] = g.useState(
    t.defaultVoiceAssetId ?? null
  ), [le, re] = g.useState(() => {
    const pe = N.editorMode;
    return pe === "quick" || pe === "rows" || pe === "story" || pe === "storyboard" ? pe : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), k = le === "quick", [$, q] = g.useState(() => [Yr()]), F = 1e5, [ce, _] = g.useState(() => {
    const pe = N.storyText;
    return typeof pe == "string" ? pe : "";
  }), ne = g.useRef(!1), J = g.useCallback((pe) => {
    pe.length > F && !ne.current && (ne.current = !0, Cn.error(
      `Story text is over ${Math.round(F / 1e3)} KB — large scripts may slow down save and rendering.`
    )), pe.length <= F && (ne.current = !1), _(pe);
  }, []), [Y, U] = g.useState(f5), W = g.useRef(C), ue = g.useRef($), ve = g.useRef(ce), _e = g.useRef(y);
  g.useEffect(() => {
    W.current = C;
  }, [C]), g.useEffect(() => {
    ue.current = $;
  }, [$]), g.useEffect(() => {
    ve.current = ce;
  }, [ce]), g.useEffect(() => {
    _e.current = y;
  }, [y]);
  const [st, Ce] = g.useState(""), Je = g.useCallback(
    (pe) => {
      re((Ee) => {
        if (pe === Ee) return Ee;
        const Ne = {
          script: W.current,
          rows: ue.current,
          storyText: ve.current
        }, Re = Wb(pe, Ne), ft = Wb(Ee, Ne);
        if (!Re && ft) {
          const qe = W8(Ee, pe, Ne, _e.current);
          if (qe) {
            const dn = { ...Ne }, Hn = document.activeElement;
            qe.script !== void 0 && T(qe.script), qe.rows !== void 0 && q(qe.rows), qe.storyText !== void 0 && J(qe.storyText);
            const yn = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, qn = (ct) => ct.split(/\r?\n/).filter((zt) => zt.trim().length > 0).length, nn = qe.rows !== void 0 ? qe.rows.length : qe.script !== void 0 ? qn(qe.script) : qe.storyText !== void 0 ? qn(qe.storyText) : 0, An = nn === 1 ? "line" : "lines", fn = nn > 0 ? ` (${nn} ${An})` : "", Ue = `Switched to ${yn[pe]} mode${nn > 0 ? `, ${nn} ${An}` : ""}.`;
            Ce((ct) => ct === Ue ? `${Ue}​` : Ue), cn(`Switched to ${yn[pe]}${fn} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(dn.script), q([...dn.rows]), J(dn.storyText), re(Ee), Hn && typeof Hn.focus == "function" && requestAnimationFrame(() => Hn.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return pe;
      });
    },
    [J]
  );
  g.useEffect(() => {
    let pe = !1;
    return Xs(t.deploymentId).then((Ee) => {
      pe || m(Ee.voiceAssets);
    }).catch(() => {
    }), Z_(t.deploymentId).then((Ee) => {
      pe || p(
        [...Ee.presets].sort((Ne, Re) => Re.updatedAt - Ne.updatedAt)
      );
    }).catch(() => {
    }), () => {
      pe = !0;
    };
  }, [t.deploymentId]);
  const He = g.useRef(!0);
  g.useEffect(() => {
    if (He.current) {
      He.current = !1;
      return;
    }
    const pe = window.setTimeout(() => {
      const Ee = {
        ...A,
        [Rh]: {
          editorMode: le,
          quickMode: k,
          cachePolicy: D,
          storyText: ce
        }
      };
      wt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: M,
          defaultSpeedFactor: R,
          defaultGenerationOverrides: Ee
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(pe);
  }, [
    t.deploymentId,
    M,
    R,
    D,
    le,
    k,
    ce,
    A
  ]);
  const Ve = g.useMemo(() => le === "rows" ? aw($, y) : le === "story" ? ce : C, [le, $, y, C, ce]), It = g.useMemo(() => t$(Ve), [Ve]), jt = g.useMemo(() => {
    if (le !== "story") return a$(It);
    const pe = /* @__PURE__ */ new Set(), Ee = [];
    for (const Ne of Lc(ce))
      Ne.kind === "character" && (pe.has(Ne.value) || (pe.add(Ne.value), Ee.push(Ne.value)));
    return Ee;
  }, [le, It, ce]), At = g.useMemo(() => r$(jt), [jt]), Mn = g.useMemo(() => s$(It), [It]), dt = g.useMemo(() => {
    const pe = /* @__PURE__ */ new Map();
    for (const Ee of o)
      pe.set(Ee.characterName.toLowerCase(), Ee);
    return pe;
  }, [o]), Qt = g.useMemo(() => k && te ? 0 : jt.filter((pe) => !dt.has(pe.toLowerCase())).length, [jt, dt, k, te]), un = g.useCallback(
    async (pe, Ee) => {
      const Ne = dt.get(pe.toLowerCase());
      try {
        if (Ne) {
          const Re = await ul(t.deploymentId, Ne.mappingId, Ee);
          u(
            (ft) => ft.map((qe) => qe.mappingId === Re.mappingId ? Re : qe)
          ), Cn.success(`Updated mapping for ${pe}`);
        } else if (Ee.speakerVoiceAssetId) {
          const Re = await Gh(t.deploymentId, {
            ...Ee,
            characterName: pe,
            speakerVoiceAssetId: Ee.speakerVoiceAssetId
          });
          u((ft) => [...ft, Re]), Cn.success(`Mapped ${pe} to voice`);
        }
      } catch (Re) {
        Cn.error(Re instanceof Error ? Re.message : "mapping failed");
      }
    },
    [dt, t.deploymentId]
  ), Dt = g.useCallback(
    async (pe) => {
      const Ee = dt.get(pe.toLowerCase());
      if (Ee)
        try {
          await l1(t.deploymentId, Ee.mappingId), u((Ne) => Ne.filter((Re) => Re.mappingId !== Ee.mappingId)), Cn.success(`Cleared mapping for ${pe}`);
        } catch (Ne) {
          Cn.error(Ne instanceof Error ? Ne.message : "clear failed");
        }
    },
    [dt, t.deploymentId]
  ), tn = g.useCallback(
    async (pe, Ee) => {
      try {
        const Ne = await jc(
          t.deploymentId,
          Ee,
          Ee.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Re) => [Ne, ...Re]), await un(pe, { speakerVoiceAssetId: Ne.voiceAssetId });
      } catch (Ne) {
        Cn.error(Ne instanceof Error ? Ne.message : "upload failed");
      }
    },
    [t.deploymentId, un]
  ), Rt = g.useCallback((pe) => {
    S(pe);
  }, []), we = g.useMemo(() => {
    const pe = [], Ee = /* @__PURE__ */ new Set();
    for (const Ne of o) {
      const Re = Ne.speakerVoiceAssetId;
      if (!Re || Ee.has(Re)) continue;
      Ee.add(Re);
      const qe = f.find((dn) => dn.voiceAssetId === Re)?.displayName ?? `${Ne.characterName} · ${Re.slice(0, 8)}`;
      pe.push({ kind: "voice_asset", id: Re, label: qe });
    }
    for (const Ne of f)
      Ee.has(Ne.voiceAssetId) || (Ee.add(Ne.voiceAssetId), pe.push({ kind: "voice_asset", id: Ne.voiceAssetId, label: Ne.displayName }));
    return pe;
  }, [o, f]), Q = g.useCallback(
    async (pe, Ee) => {
      if (pe.kind !== "voice_asset") {
        Cn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ne;
      try {
        const Re = JSON.parse(Ee);
        if (typeof Re != "object" || Re === null || Re.version !== 1 || !Array.isArray(Re.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ne = Re;
      } catch (Re) {
        Cn.error(
          Re instanceof Error ? `Audit snapshot is malformed: ${Re.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Re = await c1(pe.id, t.deploymentId, {
          chain: Ne
        }), ft = o.filter((qe) => qe.speakerVoiceAssetId === pe.id);
        await Promise.all(
          ft.map(
            (qe) => ul(t.deploymentId, qe.mappingId, {
              voiceAssetChainDigest: Re.chain_digest
            }).catch(() => null)
          )
        ), u(
          (qe) => qe.map(
            (dn) => dn.speakerVoiceAssetId === pe.id ? { ...dn, voiceAssetChainDigest: Re.chain_digest } : dn
          )
        ), Cn.success(`Reverted ${pe.label} to a prior chain`);
      } catch (Re) {
        Cn.error(Re instanceof Error ? Re.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), me = g.useCallback(
    async (pe) => {
      if (pe.kind !== "voice_asset") {
        Cn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await fR(pe.id, t.deploymentId);
        const Ee = o.filter((Ne) => Ne.speakerVoiceAssetId === pe.id);
        await Promise.all(
          Ee.map(
            (Ne) => ul(t.deploymentId, Ne.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (Ne) => Ne.map(
            (Re) => Re.speakerVoiceAssetId === pe.id ? { ...Re, voiceAssetChainDigest: null } : Re
          )
        ), Cn.success(`Cleared edit chain on ${pe.label}`);
      } catch (Ee) {
        Cn.error(Ee instanceof Error ? Ee.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), be = g.useMemo(
    () => ({
      script: Ve,
      parserMode: le === "quick" ? "raw_text" : le === "story" ? "story" : "dialogue",
      outputFormat: M,
      speedFactor: R,
      globalEmotion: { ...X, emotionAlpha: Y.intensity },
      generation: A,
      cachePolicy: D
    }),
    [Ve, le, M, R, Y.intensity, X, A, D]
  ), Ie = g.useMemo(
    () => J8({
      script: Ve,
      quickMode: k,
      defaultVoiceAssetId: te,
      characters: jt,
      unmappedCount: Qt,
      globalEmotion: X,
      performance: Y
    }),
    [Ve, k, te, jt, Qt, X, Y]
  ), Ge = g.useMemo(
    () => Ie.filter((pe) => pe.id !== "performance").map((pe) => ({
      label: pe.label,
      status: pe.status === "ok" ? "ok" : pe.status === "warn" ? "warn" : "fail",
      detail: pe.detail
    })),
    [Ie]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(uR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: st
      }
    ),
    /* @__PURE__ */ c.jsx(
      g$,
      {
        deployment: t,
        canGenerate: Ve.trim().length > 0,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(B2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          jO,
          {
            deploymentId: t.deploymentId,
            createPayload: be,
            canGenerate: Ve.trim().length > 0,
            diagnostics: Ge
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          aO,
          {
            deploymentId: t.deploymentId,
            speedFactor: R
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          Z8,
          {
            editorMode: le,
            onEditorModeChange: Je,
            deployment: t,
            script: C,
            onScriptChange: T,
            rows: $,
            onRowsChange: q,
            storyText: ce,
            onStoryTextChange: J,
            storyCharacters: jt,
            outputFormat: M,
            mappingsByLower: dt,
            defaultVoiceAssetId: te,
            onDefaultVoiceAssetIdChange: K,
            presets: y,
            voiceAssets: f
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(a5, { lines: It, characterColors: At }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          Q_,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: At,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(k2, { unmappedCount: Qt, totalCount: jt.length, children: jt.map((pe) => {
          const Ee = dt.get(pe.toLowerCase()) ?? null, Ne = At[pe] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: GR, children: /* @__PURE__ */ c.jsx(
            D2,
            {
              characterName: pe,
              color: Ne,
              lineCount: Mn[pe] ?? 0,
              mapping: Ee,
              voiceAssets: f,
              presets: y,
              active: b === pe,
              onToggle: () => v((Re) => Re === pe ? null : pe),
              onAssignVoiceAsset: (Re) => un(pe, { speakerVoiceAssetId: Re }),
              onAssignPreset: (Re) => un(pe, { defaultVectorPresetId: Re }),
              onUploadFile: (Re) => tn(pe, Re),
              onClearMapping: () => Dt(pe)
            }
          ) }, pe);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          R3,
          {
            value: X,
            onChange: ie,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            h5,
            {
              value: { ...Y, pace: R },
              onChange: (pe) => {
                U(pe), pe.pace !== R && I(pe.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Zh,
            {
              state: w,
              onChange: Rt,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(E5, { checks: Ie }),
          /* @__PURE__ */ c.jsx(
            P3,
            {
              outputFormat: M,
              onOutputFormatChange: z,
              speedFactor: R,
              onSpeedFactorChange: I,
              cachePolicy: D,
              onCachePolicyChange: H,
              generation: A,
              onGenerationChange: V
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(A5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          h2,
          {
            deploymentId: t.deploymentId,
            targets: we,
            onRevertToIdentity: me,
            onRevertToChain: Q
          }
        )
      }
    )
  ] });
}
const rx = /* @__PURE__ */ new Map();
function S$(t, a) {
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
    const o = `${t}::${a}`, u = rx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), w$(t, a, f.signal).then((m) => {
      f.signal.aborted || (rx.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function w$(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return j$(f, a);
}
function j$(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let m = 0; m < s; m += 1) f.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const y = m * o, p = Math.min(i, y + o);
    let b = 0;
    for (let v = y; v < p; v += 1) {
      let w = 0;
      for (let j = 0; j < s; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / s;
      S > b && (b = S);
    }
    u[m] = b;
  }
  return u;
}
const sx = "(prefers-reduced-motion: reduce)";
function E$() {
  const [t, a] = g.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(sx).matches);
  return g.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(sx), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var N$ = "mquzal0", C$ = "mquzal1", ix = "mquzal2", lx = "mquzal3", ox = "mquzal4", T$ = "mquzal5", cx = "mquzal6", ux = "mquzal7";
const R$ = 120, _$ = 720;
function lw(t) {
  const {
    audioUrl: a,
    durationMs: s,
    startMs: i,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: m = !1,
    playbackPositionMs: y = 0,
    onSeek: p,
    width: b = _$,
    height: v = R$
  } = t, w = g.useRef(null), S = g.useRef(null), j = g.useRef(null), N = S$(a, b), C = E$();
  g.useEffect(() => {
    M$(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = g.useCallback(
    (A) => {
      const V = S.current?.getBoundingClientRect();
      if (!V || V.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (A - V.left) / V.width));
      return Math.round(D * s);
    },
    [s]
  );
  g.useEffect(() => {
    const A = (D) => {
      if (!j.current) return;
      const H = T(D.clientX);
      j.current === "start" ? u(rc(H, 0, o - 1)) : f(rc(H, i + 1, s));
    }, V = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", V), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", V);
    };
  }, [T, s, o, i, u, f]);
  const M = (A) => (V) => {
    V.preventDefault(), V.stopPropagation(), j.current = A;
  }, z = (A) => {
    !p || A.target.closest("[data-handle]") || p(T(A.clientX));
  }, R = (A) => (V) => {
    const D = V.shiftKey ? 100 : V.ctrlKey ? 1 : 10;
    let H = 0;
    if (V.key === "ArrowLeft") H = -D;
    else if (V.key === "ArrowRight") H = D;
    else return;
    V.preventDefault(), A === "start" ? u(rc(i + H, 0, o - 1)) : f(rc(o + H, i + 1, s));
  }, I = Pf(i, s), X = Pf(o, s), ie = Pf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: N$,
      style: { height: v },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: C$,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: ux, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: ux, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: cx, style: { left: 0, width: `${I}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: cx,
            style: { left: `${X}%`, right: 0, width: `${100 - X}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: ix,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": i,
            tabIndex: 0,
            onPointerDown: M("start"),
            onKeyDown: R("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: lx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: ox, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: ix,
            style: { left: `${X}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": s,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: M("end"),
            onKeyDown: R("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: lx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: ox, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: T$,
            style: {
              left: `${ie}%`,
              transition: C ? "none" : void 0
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
function rc(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function M$(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = A$(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function A$(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var D$ = "r8lfsm0", k$ = "r8lfsm1", z$ = "r8lfsm2", O$ = "r8lfsm3", L$ = "r8lfsm4", $$ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, U$ = "_1b1zchy3", B$ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, V$ = "_1b1zchy6", I$ = "_1b1zchy7";
const ow = g.createContext("standalone");
function cw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [$$[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(ow.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function uw({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = g.useContext(ow), f = [U$, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: B$[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: V$, children: a }) : null,
    s
  ] });
}
function dw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [I$, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const dx = -16, H$ = 80, q$ = 720;
function F$(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = g.useState(() => fx(y)), [v, w] = g.useState(Yc), [S, j] = g.useState(!1), [N, C] = g.useState(!1), [T, M] = g.useState(null), [z, R] = g.useState(!1), I = g.useRef(null), X = g.useRef(null), ie = g.useRef(null);
  g.useEffect(() => {
    const q = fx(y);
    b(q), w(x1(q)), C(!1), M(null), ie.current = null;
  }, [i.utteranceId, y]);
  const A = g.useCallback((q) => {
    w(q), b((F) => b1(F, q));
  }, []);
  g.useEffect(() => () => X.current?.abort(), []), g.useEffect(() => {
    I.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const V = g.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), m());
    },
    [m]
  ), D = g.useMemo(
    () => p.ops.find((q) => q.mode === "trim"),
    [p.ops]
  ), H = D?.start_ms ?? 0, te = D?.end_ms ?? Math.max(1, y), K = g.useCallback((q, F) => {
    b((ce) => Y$(ce, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(F))
    })));
  }, []), le = g.useCallback((q) => K(q, te), [te, K]), re = g.useCallback((q) => K(H, q), [H, K]), k = g.useCallback((q) => {
    C(q), b((F) => {
      const ce = F.ops.filter((_) => _.mode !== "normalize");
      if (q) {
        const _ = {
          id: _n(),
          mode: "normalize",
          target_lufs: dx
        };
        return { ...F, ops: [...ce, _] };
      }
      return { ...F, ops: ce };
    });
  }, []), $ = g.useCallback(async () => {
    const q = u1(p, y);
    if (q) {
      M(q.message);
      return;
    }
    if (M(null), z) return;
    X.current?.abort();
    const F = new AbortController();
    X.current = F, R(!0);
    try {
      const ce = ie.current ?? void 0, _ = await dR(
        a,
        s,
        i.utteranceId,
        ce ? { chain: p, digest_before: ce } : { chain: p },
        { signal: F.signal }
      );
      if (F.signal.aborted) return;
      ie.current = _.chain_digest, u(_);
    } catch (ce) {
      if (F.signal.aborted) return;
      ce instanceof Qs && (ie.current = ce.currentDigest || null);
      const _ = ce instanceof Qs ? "Edit chain has changed in another tab. Reload to continue." : ce instanceof Error ? ce.message : "apply failed";
      M(_), f(_);
    } finally {
      F.signal.aborted || R(!1);
    }
  }, [p, y, z, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(cw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: I, onKeyDown: V, children: [
    /* @__PURE__ */ c.jsx(uw, { title: "Edit segment", meta: `Source · ${sc(y)}` }),
    /* @__PURE__ */ c.jsx(
      lw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: H,
        endMs: te,
        onChangeStart: le,
        onChangeEnd: re,
        height: H$,
        width: q$
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: D$, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: k$, children: [
        sc(H),
        " → ",
        sc(te),
        " · ",
        sc(te - H)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: z$, children: [
      /* @__PURE__ */ c.jsxs("label", { className: O$, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (q) => k(q.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          dx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: L$,
          onClick: () => j((q) => !q),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      Zh,
      {
        state: v,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(dw, { children: [
      /* @__PURE__ */ c.jsx(Ke, { size: "sm", onClick: () => void $(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Ke, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: T })
  ] }) });
}
function fx(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Y$(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function sc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var G$ = "jq2zyb2", P$ = "jq2zyb3", K$ = "jq2zyb4", X$ = "jq2zyb5", Q$ = "jq2zyb6", Z$ = "jq2zyb7", J$ = "jq2zyb8", W$ = "jq2zyb9", eU = "jq2zyba", tU = "jq2zybb", nU = "jq2zybc", aU = "jq2zybd", rU = "jq2zybe", sU = "jq2zybf jq2zybe", iU = "jq2zybg", lU = "jq2zybh", oU = "jq2zybi", cU = "jq2zybj", uU = "jq2zybk", dU = "jq2zybl", fU = "jq2zybm", hU = "jq2zybn", mU = "jq2zybo", pU = "jq2zybp", gU = "jq2zybq", vU = "jq2zybr", yU = "jq2zybs", bU = "jq2zybt", xU = "jq2zybu", SU = "jq2zybv", wU = "jq2zybw", jU = "jq2zybx", EU = "jq2zyby", hx = "jq2zybz", NU = "jq2zyb10", CU = "jq2zyb11", TU = "jq2zyb12";
const RU = ["cancelled", "failed", "partial"], _U = 2600;
function MU() {
  const { run: t } = El(), a = ei(), [s, i] = g.useState(t), [o, u] = g.useState(!1), [f, m] = g.useState(null), [y, p] = g.useState(null), [b, v] = g.useState(
    null
  );
  g.useEffect(() => {
    i(t);
  }, [t]), g.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => v(null), _U);
    return () => clearTimeout(R);
  }, [b]);
  const w = g.useMemo(() => kU(s), [s]), S = RU.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: R } = await o1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${R}`);
      } catch (R) {
        m(LU(R));
      } finally {
        u(!1);
      }
    }
  }, C = g.useCallback((R) => {
    p((I) => I === R ? null : R);
  }, []), T = g.useCallback(() => {
    p(null);
  }, []), M = (R, I) => {
    i((X) => DU(X, R, I)), p(null), v({ message: "Segment edited", severity: "success" });
  }, z = g.useCallback((R) => {
    v({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: G$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: P$, children: [
      /* @__PURE__ */ c.jsxs("header", { className: K$, children: [
        /* @__PURE__ */ c.jsxs("p", { className: X$, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Yh, { to: `/${s.deploymentId}/recipe`, className: Q$, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: Z$, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: J$, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: W$, children: [
            zU(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: eU, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Jr, { size: "md", tone: $U(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: tU, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(ic, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(ic, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          ic,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ic,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: lU, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: oU, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: cU, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: uU, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Ke, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: dU, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(vT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: fU, children: [
            /* @__PURE__ */ c.jsx("span", { className: hU, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: mU, children: s.utterances.map((R) => {
          const I = y === R.utteranceId, X = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, ie = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, A = ie ? `/api/v1/artifacts/${encodeURIComponent(ie)}/download` : "", V = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: gU, children: [
            /* @__PURE__ */ c.jsxs("div", { className: pU, children: [
              /* @__PURE__ */ c.jsxs("span", { className: yU, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: bU, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: xU, title: R.text, children: R.text }),
              /* @__PURE__ */ c.jsxs("span", { className: SU, children: [
                R.cacheHit && /* @__PURE__ */ c.jsx("span", { className: wU, children: "cached" }),
                V && /* @__PURE__ */ c.jsx("span", { className: vU, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ c.jsx("span", { children: OU(R.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Jr, { tone: UU(R.status), children: R.status }),
                X && /* @__PURE__ */ c.jsx(
                  Ke,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => C(R.utteranceId),
                    "aria-expanded": I,
                    "aria-label": I ? "Close segment editor" : "Edit segment",
                    children: I ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            I && A && s.deploymentId && /* @__PURE__ */ c.jsx(
              F$,
              {
                deploymentId: s.deploymentId,
                runId: s.runId,
                utterance: R,
                audioUrl: A,
                onApplied: (D) => M(R.utteranceId, D),
                onError: z,
                onCancel: T
              }
            )
          ] }, R.utteranceId);
        }) })
      ] }),
      AU(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: TU,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function AU(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: jU, children: a ? /* @__PURE__ */ c.jsxs("div", { className: NU, children: [
    /* @__PURE__ */ c.jsx("p", { className: CU, children: i }),
    /* @__PURE__ */ c.jsxs(
      Ke,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: hx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: EU,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: hx, children: "↓" })
      ]
    }
  ) : null });
}
function DU(t, a, s) {
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
function ic({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: nU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: aU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? sU : rU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: iU, "aria-hidden": "true" })
      ]
    }
  );
}
function kU(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function zU(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function OU(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function LU(t) {
  return t instanceof ti ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function $U(t) {
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
function UU(t) {
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
var BU = "pcphqj2", VU = "pcphqj3", IU = "pcphqj4", HU = "pcphqj5", qU = "pcphqj6", FU = "pcphqj7", YU = "pcphqj8", GU = "pcphqj9", PU = "pcphqja", mx = "pcphqjb", KU = "pcphqjc", XU = "pcphqjd", QU = "pcphqje pcphqjd", ZU = "pcphqjf", JU = "pcphqjg", WU = "pcphqjh", e9 = "pcphqji", t9 = "pcphqjj pcphqji", n9 = "pcphqjk pcphqji", a9 = "pcphqjl pcphqji", r9 = "pcphqjm", Kf = "pcphqjn", Xf = "pcphqjo";
function s9() {
  const [t, a] = g.useState(null), [s, i] = g.useState(null);
  return g.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await wt("/runtime/queue");
        o || (a(m.entries), i(null));
      } catch (m) {
        o || i(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: BU, children: /* @__PURE__ */ c.jsxs("div", { className: VU, children: [
    /* @__PURE__ */ c.jsxs("header", { className: IU, children: [
      /* @__PURE__ */ c.jsx("p", { className: HU, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: qU, children: [
        /* @__PURE__ */ c.jsx("h1", { className: FU, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: YU, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: GU, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(qc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: PU, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${mx} ${KU}` : mx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? QU : XU, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: ZU, children: [
                /* @__PURE__ */ c.jsx("span", { className: JU, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: WU, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: i9(o.kind), children: l9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: r9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Kf, children: o9(o.etaSeconds) }),
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
function i9(t) {
  switch (t) {
    case "batch":
      return t9;
    case "test_line":
      return n9;
    case "resume":
      return a9;
    default:
      return e9;
  }
}
function l9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function o9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function c9() {
  const { deploymentId: t, prefillCharacterName: a } = El(), s = ei(), [i, o] = g.useState(a), [u, f] = g.useState(""), [m, y] = g.useState("none"), [p, b] = g.useState(!1), [v, w] = g.useState(null), S = g.useRef(null);
  g.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Gh(t, {
        characterName: i,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
      }), s(`/${t}/recipe`);
    } catch (C) {
      w(C instanceof Error ? C.message : "failed");
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
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (N) => y(N.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Ke, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: v })
    ] })
  ] });
}
var u9 = "_1oor31e0", d9 = "_1oor31e1", f9 = "_1oor31e2", h9 = "_1oor31e3", m9 = "_1oor31e4", p9 = "_1oor31e5", g9 = "_1oor31e6", v9 = "_1oor31e7", y9 = "_1oor31e8";
const b9 = 8;
function x9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: u9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: y9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: v9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: d9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: f9, children: [
      /* @__PURE__ */ c.jsx("span", { className: h9, children: w9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: m9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: p9, title: o.digest_after, children: S9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: g9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function S9(t) {
  return t ? `${t.slice(0, b9)}…` : "—";
}
function w9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var px = "_1c63kaw0", j9 = "_1c63kaw1", E9 = "_1c63kaw2", N9 = "_1c63kaw3", C9 = "_1c63kaw4", T9 = "_1c63kaw5", R9 = "_1c63kaw6";
function _9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: px, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: j9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: px, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: E9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: N9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: C9, children: [
      /* @__PURE__ */ c.jsx("span", { className: T9, children: gx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: R9, children: M9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Ke,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${gx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function gx(t) {
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
function M9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${vx(t.start_ms)} → ${vx(t.end_ms)}`;
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
function vx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var lc = "_1o3ytop0", Zf = "_1o3ytop1", yx = "_1o3ytop2", A9 = "_1o3ytop3", D9 = "_1o3ytop4", k9 = "_1o3ytop5", z9 = "_1o3ytop6", O9 = "_1o3ytop7", oc = "_1o3ytop8", L9 = "_1o3ytop9", $9 = "_1o3ytopf", U9 = "_1o3ytopg", B9 = "_1o3ytoph", V9 = "_1o3ytopi", I9 = "_1o3ytopj", H9 = "_1o3ytopk", q9 = "_1t0zy2f0", F9 = "_1t0zy2f1", Y9 = "_1t0zy2f2";
function G9({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = g.useState(!1), u = g.useId(), f = g.useRef(null), m = g.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = g.useCallback(() => {
    m(), f.current = window.setTimeout(() => o(!0), s);
  }, [m, s]), p = g.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (g.useEffect(() => () => m(), [m]), g.useEffect(() => {
    if (!i) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i]), !g.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: y,
    onMouseLeave: p,
    onFocus: y,
    onBlur: p,
    "aria-describedby": i ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: q9, children: [
    g.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: Y9, children: t })
  ] });
}
function cc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(G9, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: F9, children: "?" }) });
}
const bx = -16;
function P9(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = g.useMemo(
    () => K9(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = g.useState(() => Jf(f)), [b, v] = g.useState(Yc), [w, S] = g.useState(!1), [j, N] = g.useState(null), [C, T] = g.useState(null), [M, z] = g.useState(!1), [R, I] = g.useState(!1), [X, ie] = g.useState(!1), [A, V] = g.useState(null), [D, H] = g.useState([]), [te, K] = g.useState(null), [le, re] = g.useState([]), [k, $] = g.useState(!1), [q, F] = g.useState(null), [ce, _] = g.useState(0), ne = g.useRef(null), J = g.useRef(null), Y = g.useRef(null), U = g.useRef(null), W = g.useRef(null), ue = g.useRef(0), ve = g.useMemo(
    () => y.ops.some((we) => we.mode === "normalize"),
    [y.ops]
  );
  g.useEffect(() => {
    const we = Jf(f);
    p(we), v(x1(we)), N(null), ie(!1), H([]), K(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const _e = g.useCallback((we) => {
    v(we), p((Q) => b1(Q, we));
  }, []);
  g.useEffect(() => {
    U.current?.abort();
    const we = new AbortController();
    return U.current = we, $(!0), F(null), mc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: we.signal
    }).then((Q) => {
      we.signal.aborted || re(Q.entries);
    }).catch((Q) => {
      if (we.signal.aborted) return;
      const me = Q instanceof Error ? Q.message : "audit fetch failed";
      F(me);
    }).finally(() => {
      we.signal.aborted || $(!1);
    }), () => we.abort();
  }, [s, a.voiceAssetId, ce]), g.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), g.useEffect(() => () => {
    J.current?.abort(), Y.current?.abort(), U.current?.abort();
  }, []);
  const st = y.ops.find((we) => we.mode === "trim"), Ce = y.ops.find((we) => we.mode === "normalize"), Je = st?.start_ms ?? 0, He = st?.end_ms ?? Math.max(1, f), Ve = g.useCallback((we, Q) => {
    p(
      (me) => xx(
        me,
        "trim",
        (be) => ({
          ...be,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(we)),
          end_ms: Math.max(Math.floor(we) + 1, Math.floor(Q))
        })
      )
    );
  }, []), It = g.useCallback(
    (we) => Ve(we, He),
    [He, Ve]
  ), jt = g.useCallback(
    (we) => Ve(Je, we),
    [Je, Ve]
  ), At = g.useCallback((we) => {
    p((Q) => {
      const me = Q.ops.filter((be) => be.mode !== "normalize");
      if (we) {
        const be = {
          id: _n(),
          mode: "normalize",
          target_lufs: bx
        };
        return { ...Q, ops: [...me, be] };
      }
      return { ...Q, ops: me };
    });
  }, []), Mn = g.useCallback(
    (we) => {
      const Q = y.ops.findIndex((Ie) => Ie.id === we);
      if (Q === -1) return;
      const me = y.ops[Q];
      if (!me) return;
      const be = [...y.ops.slice(0, Q), ...y.ops.slice(Q + 1)];
      p({ ...y, ops: be }), H((Ie) => [...Ie, { op: me, index: Q }]);
    },
    [y]
  ), dt = g.useCallback(() => {
    const we = D[D.length - 1];
    if (!we) return;
    const Q = Math.min(we.index, y.ops.length), me = [...y.ops.slice(0, Q), we.op, ...y.ops.slice(Q)];
    p({ ...y, ops: me }), H(D.slice(0, -1));
  }, [y, D]), Qt = g.useCallback(() => {
    const we = u1(y, f);
    return we ? (N(we.message), !1) : (N(null), !0);
  }, [y, f]), un = g.useCallback(async () => {
    if (!Qt() || M) return;
    J.current?.abort();
    const we = new AbortController();
    J.current = we;
    const Q = ++ue.current;
    I(!0);
    try {
      const me = await hR(a.voiceAssetId, s, y, {
        signal: we.signal
      });
      if (we.signal.aborted || Q !== ue.current) return;
      C && URL.revokeObjectURL(C);
      const be = URL.createObjectURL(me);
      T(be), ie(!0), requestAnimationFrame(() => ne.current?.play().catch(() => {
      }));
    } catch (me) {
      if (we.signal.aborted) return;
      const be = me instanceof Error ? me.message : "preview failed";
      N(be), u(be);
    } finally {
      we.signal.aborted || I(!1);
    }
  }, [Qt, M, a.voiceAssetId, s, y, C, u]), Dt = g.useCallback(async () => {
    if (!Qt() || R || M) return;
    if (i.length > 1) {
      const Q = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${Q}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    J.current?.abort(), Y.current?.abort();
    const we = new AbortController();
    Y.current = we, z(!0);
    try {
      const Q = W.current ?? void 0, me = await c1(
        a.voiceAssetId,
        s,
        Q ? { chain: y, digest_before: Q } : { chain: y },
        { signal: we.signal }
      );
      if (we.signal.aborted) return;
      W.current = me.chain_digest, K(me.chain_digest), N(null), V(me.measured_lufs ?? null), H([]), o(me), _((be) => be + 1);
    } catch (Q) {
      if (we.signal.aborted) return;
      const me = Q instanceof Qs;
      Q instanceof Qs && (W.current = Q.currentDigest || null);
      const be = me ? "Edit chain has changed in another tab. Reload to continue." : Q instanceof Error ? Q.message : "apply failed";
      N(be), u(be);
    } finally {
      we.signal.aborted || z(!1);
    }
  }, [
    Qt,
    R,
    M,
    i,
    a.voiceAssetId,
    s,
    y,
    o,
    u
  ]), tn = g.useCallback(() => {
    J.current?.abort(), p(Jf(f)), N(null), V(null), ie(!1), H([]), _((we) => we + 1), C && (URL.revokeObjectURL(C), T(null));
  }, [f, C]), Rt = g.useCallback((we) => {
    p(
      (Q) => xx(
        Q,
        "normalize",
        (me) => ({
          ...me,
          mode: "normalize",
          target_lufs: we
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(cw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      uw,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${uc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      lw,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: Je,
        endMs: He,
        onChangeStart: It,
        onChangeEnd: jt
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: lc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          cc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: yx, children: [
        uc(Je),
        " → ",
        uc(He),
        " · ",
        uc(He - Je)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: O9, children: [
      /* @__PURE__ */ c.jsxs("div", { className: oc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: lc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              cc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          ve && Ce && /* @__PURE__ */ c.jsxs("span", { className: $9, children: [
            "target ",
            Ce.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: L9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ve,
              onChange: (we) => At(we.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            bx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ve && Ce && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: B9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ce.target_lufs,
            onChange: (we) => Rt(Number(we.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: oc, children: [
        /* @__PURE__ */ c.jsxs("span", { className: lc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Zf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              cc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: yx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(_9, { chain: y, onRemoveOp: Mn })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: oc, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: A9,
            onClick: () => S((we) => !we),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: D9, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: k9, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                cc,
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
          Zh,
          {
            state: b,
            onChange: _e,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      te && /* @__PURE__ */ c.jsx("div", { className: oc, children: /* @__PURE__ */ c.jsxs("span", { className: lc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: z9, title: te, children: [
          te.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(dw, { children: [
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          variant: "secondary",
          onClick: () => void un(),
          disabled: R || M,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          onClick: () => void Dt(),
          disabled: M || R,
          children: M ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Ke,
        {
          variant: "ghost",
          onClick: tn,
          disabled: M || R,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Ke,
        {
          variant: "ghost",
          size: "sm",
          onClick: dt,
          disabled: M || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            D.length,
            ")"
          ]
        }
      ),
      X && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: H9,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    C && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: ne,
        src: C,
        controls: !0,
        className: U9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: V9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: I9, children: [
        "Edit history",
        le.length > 0 ? ` · ${le.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        x9,
        {
          entries: le,
          loading: k,
          error: q
        }
      )
    ] })
  ] });
}
function Jf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function xx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function uc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function K9(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var X9 = "go9vi12", Q9 = "go9vi13", Z9 = "go9vi14", J9 = "go9vi15", W9 = "go9vi16", eB = "go9vi17", tB = "go9vi18", nB = "go9vi19", aB = "go9vi1a", rB = "go9vi1b go9vi1a", sB = "go9vi1c", iB = "go9vi1d", lB = "go9vi1e", oB = "go9vi1f", cB = "go9vi1g", uB = "go9vi1h", dB = "go9vi1i", fB = "go9vi1j", Sx = "go9vi1k", hB = "go9vi1l", mB = "go9vi1m", pB = "go9vi1n", $c = "go9vi1o", gB = "go9vi1q", vB = "go9vi1r go9vi1q", yB = "go9vi1s go9vi1q", bB = "go9vi1t", xB = "go9vi1u", SB = "go9vi1v", wB = "go9vi1w", fw = "go9vi1x", jB = "go9vi1y", EB = "go9vi1z", NB = "go9vi110 go9vi1o", CB = "go9vi111", TB = "go9vi112", RB = "go9vi113", _B = "go9vi114", MB = "go9vi115", AB = "go9vi116";
function DB() {
  const { deployment: t, mappings: a, voiceAssets: s } = El(), i = ei(), [o, u] = g.useState(a), [f, m] = g.useState(s), [y, p] = g.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = g.useState(""), [w, S] = g.useState(null), [j, N] = g.useState(null), [C, T] = g.useState(null), [M, z] = g.useState(null), [R, I] = g.useState(0), X = g.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ie = g.useCallback((Y) => {
    z(Y), window.setTimeout(() => {
      z((U) => U === Y ? null : U);
    }, 1600);
  }, []), A = g.useMemo(() => {
    const Y = /* @__PURE__ */ new Map();
    for (const U of f) Y.set(U.voiceAssetId, U);
    return Y;
  }, [f]), V = g.useMemo(() => {
    const Y = b.trim().toLowerCase();
    return Y ? o.filter((U) => U.characterName.toLowerCase().includes(Y)) : o;
  }, [o, b]), D = g.useMemo(
    () => o.find((Y) => Y.mappingId === y) ?? null,
    [o, y]
  );
  g.useEffect(() => {
    u(a), m(s), p(a[0]?.mappingId ?? null);
  }, [a, s]), g.useEffect(() => {
    if (!j) return;
    const Y = setTimeout(() => N(null), 2600);
    return () => clearTimeout(Y);
  }, [j]);
  const H = g.useCallback(async () => {
    const Y = await Xs(t.deploymentId);
    m(Y.voiceAssets);
  }, [t.deploymentId]), te = g.useCallback(
    (Y) => {
      u(
        (U) => U.map((W) => W.mappingId === y ? { ...W, ...Y } : W)
      );
    },
    [y]
  ), K = g.useCallback(
    async (Y) => {
      if (!D) return;
      const U = D;
      try {
        const W = await ul(t.deploymentId, D.mappingId, Y);
        u((ue) => ue.map((ve) => ve.mappingId === W.mappingId ? W : ve)), Object.prototype.hasOwnProperty.call(Y, "characterName") && ie(W.mappingId);
      } catch (W) {
        u(
          (ue) => ue.map((ve) => ve.mappingId === U.mappingId ? U : ve)
        ), S(gr(W));
      }
    },
    [D, t.deploymentId, ie]
  ), le = g.useCallback(async () => {
    const Y = f[0];
    if (!Y) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = BB(o), W = await Gh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: Y.voiceAssetId
      });
      u((ue) => [...ue, W]), p(W.mappingId), I((ue) => ue + 1);
    } catch (U) {
      S(gr(U));
    }
  }, [t.deploymentId, f, o]), re = g.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), k = g.useCallback(async () => {
    if (!C) return;
    const { id: Y, name: U } = C;
    T(null);
    try {
      await l1(t.deploymentId, Y), u((W) => W.filter((ue) => ue.mappingId !== Y)), p(null), N(`Mapping for ${U} deactivated.`);
    } catch (W) {
      S(gr(W));
    }
  }, [t.deploymentId, C]), $ = g.useCallback(
    async (Y, U, W) => {
      try {
        const ue = await jc(t.deploymentId, Y, U, W);
        return m((ve) => [ue, ...ve]), N(`${ue.displayName} uploaded.`), ue;
      } catch (ue) {
        return S(gr(ue)), null;
      }
    },
    [t.deploymentId]
  ), q = g.useCallback(async () => {
    try {
      const Y = await WC(t.deploymentId);
      FB(Y, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (Y) {
      S(gr(Y));
    }
  }, [t.deploymentId]), F = g.useCallback(
    async (Y, U) => {
      try {
        const W = await eT(
          t.deploymentId,
          Y.mappings,
          U
        );
        N(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const ue = await Xs(t.deploymentId);
        m(ue.voiceAssets);
      } catch (W) {
        S(gr(W));
      }
    },
    [t.deploymentId]
  ), ce = g.useCallback(
    async (Y) => {
      if (await H(), D && Y.chain_digest)
        try {
          const U = await ul(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: Y.chain_digest
          });
          u(
            (W) => W.map((ue) => ue.mappingId === U.mappingId ? U : ue)
          );
        } catch (U) {
          S(gr(U));
        }
      N("Edit applied.");
    },
    [H, D, t.deploymentId]
  ), _ = g.useCallback((Y) => {
    S(Y);
  }, []), ne = g.useCallback(
    async (Y, U) => {
      if (!D) return null;
      const W = Y.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await rT(t.deploymentId, {
          line: W,
          outputFormat: U
        })).runId };
      } catch (ue) {
        return S(gr(ue)), null;
      }
    },
    [t.deploymentId, D]
  ), J = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: X9, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: Q9, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: Z9,
          onClick: X,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: J9, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: W9, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: eB, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            J
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Ke, { variant: "primary", size: "sm", onClick: le, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: tB,
          placeholder: "Search characters",
          value: b,
          onChange: (Y) => v(Y.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(UB, { onExport: q, onImport: F, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: nB, children: V.length === 0 ? /* @__PURE__ */ c.jsx(
        qc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : V.map((Y) => {
        const U = A.get(Y.speakerVoiceAssetId), W = Y.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? rB : aB,
            onClick: () => p(Y.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: sB, "aria-hidden": "true", children: VB(Y.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: iB, children: [
                /* @__PURE__ */ c.jsx("span", { className: lB, children: Y.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: oB, children: U?.displayName ?? "no voice" })
              ] })
            ]
          },
          Y.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: cB, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(ym, { features: wm, children: /* @__PURE__ */ c.jsx(US, { children: j && /* @__PURE__ */ c.jsx(
        Sm.div,
        {
          className: jB,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      w && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: w }),
      C && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          C.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(Ke, { variant: "danger", size: "sm", onClick: () => void k(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Ke, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        zB,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (Y) => {
            te({ characterName: Y });
          },
          onNameSave: (Y) => {
            const U = Y.trim();
            U && K({ characterName: U });
          },
          savedHint: M === D.mappingId,
          autoFocusNonce: R,
          onSpeakerChange: (Y) => {
            te({ speakerVoiceAssetId: Y }), K({ speakerVoiceAssetId: Y });
          },
          onDelete: re,
          onUploadVoice: async (Y, U, W) => {
            const ue = await $(Y, U, W);
            return ue && W === "speaker" && (te({ speakerVoiceAssetId: ue.voiceAssetId }), K({ speakerVoiceAssetId: ue.voiceAssetId })), await H(), ue;
          },
          onTestLine: ne,
          onEditChainPersisted: ce,
          onEditError: _
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        kB,
        {
          voiceCount: f.length,
          onUploadVoice: async (Y) => {
            await $(Y, Y.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function kB({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: RB, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: _B, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: MB, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      hw,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Va, { density: "airy", children: /* @__PURE__ */ c.jsx(
    qc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function zB(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = g.useMemo(
    () => i.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, m] = g.useState(""), [y, p] = g.useState("mp3"), [b, v] = g.useState("idle"), [w, S] = g.useState(null), j = g.useRef(!1), N = g.useRef(null);
  g.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), g.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const T = N.current;
    T && (T.focus(), T.select());
  }, [t.autoFocusNonce]);
  const C = g.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const T = await t.onTestLine(f, y);
    if (j.current) return;
    if (!T) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: M } = T;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((R) => setTimeout(R, 500)), j.current) return;
      try {
        const R = await Ph(t.deploymentId, M);
        if (j.current) return;
        if (R.status === "completed") {
          v("done");
          return;
        }
        if (R.status === "failed" || R.status === "cancelled") {
          v("error"), S(`Run ${R.status}.`);
          return;
        }
      } catch (R) {
        if (j.current) return;
        v("error"), S(R instanceof Error ? R.message : "unknown error");
        return;
      }
    }
    j.current || (v("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: uB, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: dB, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: fw, children: /* @__PURE__ */ c.jsx(Ke, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: EB,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: NB,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (T) => m(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: $c,
              value: y,
              onChange: (T) => p(T.currentTarget.value),
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
            Ke,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void C(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Jr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(Jr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: fB, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: pB, children: [
          /* @__PURE__ */ c.jsxs("span", { className: hB, children: [
            /* @__PURE__ */ c.jsx("span", { className: Sx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: mB,
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
              className: $c,
              value: a.characterName,
              onChange: (T) => t.onNameChange(T.currentTarget.value),
              onBlur: (T) => t.onNameSave(T.currentTarget.value),
              onKeyDown: (T) => {
                T.key === "Enter" && (T.preventDefault(), T.currentTarget.blur());
              },
              placeholder: "Type a name and press Enter"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Xr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Sx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          OB,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(LB, { voice: o }),
        /* @__PURE__ */ c.jsx(
          hw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          P9,
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
function OB({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: $c,
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
function LB({ voice: t }) {
  const a = IB(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: bB, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: HB(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: xB, children: [
      /* @__PURE__ */ c.jsx("div", { className: SB, children: /* @__PURE__ */ c.jsx(ym, { features: wm, children: /* @__PURE__ */ c.jsx(
        Sm.div,
        {
          className: wB,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx($B, { seed: t.contentSha256 })
  ] });
}
function $B({ seed: t }) {
  const a = g.useMemo(() => qB(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: CB, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: TB,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function hw({
  label: t,
  onFile: a
}) {
  const [s, i] = g.useState(!1), [o, u] = g.useState(!1), f = g.useRef(null), m = g.useCallback(
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
      className: o ? yB : s ? vB : gB,
      onDragOver: (y) => {
        y.preventDefault(), i(!0);
      },
      onDragLeave: () => i(!1),
      onDrop: (y) => {
        y.preventDefault(), i(!1);
        const p = y.dataTransfer.files?.[0];
        p && m(p);
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
              const p = y.currentTarget.files?.[0];
              p && m(p), y.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function UB({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = g.useState("error"), u = g.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: fw, children: [
    /* @__PURE__ */ c.jsx(Ke, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: AB,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const m = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!m)
            try {
              const y = await m.text(), p = JSON.parse(y);
              a(p, i);
            } catch {
              s("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx(Ke, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: $c,
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
function BB(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function VB(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function IB(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function HB(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function qB(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function FB(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
function YB() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await ZC();
        return { deployments: t };
      },
      Component: OT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return sN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          Fy(a),
          Yy(a),
          tT(a, { limit: 10 }),
          oT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: x$
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Ph(a, s) };
      },
      Component: MU
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          Fy(a),
          Yy(a),
          Xs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: DB
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
      Component: c9
    },
    {
      path: "/runtime/queue",
      Component: s9
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const wx = "ext-actions-request", GB = "ext-actions-declare", PB = "ext-action-state", jx = "ext-action-invoke", _h = "emotion-tts:navigate", qs = "emotion-tts.run", Ex = "emotion-tts.mappings", KB = 4e3;
function XB(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return QB(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: Ex,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(GB, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(PB, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), p = (j) => {
    const N = j.detail?.id;
    N === qs ? b() : N === Ex && t.dispatchEvent(
      new CustomEvent(_h, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, m();
    try {
      N ? await O2() : await z2();
      try {
        s = await Ec();
      } catch {
      }
    } catch {
    } finally {
      i = !1, m();
    }
  };
  t.addEventListener(wx, y), t.addEventListener(jx, p);
  let v = !1;
  const w = async () => {
    try {
      const j = await Ec();
      if (v) return;
      s = j, m();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), KB);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(wx, y), t.removeEventListener(jx, p);
    }
  };
}
function QB(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qs,
    label: p1(t),
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
const Mh = "emotion-tts-app", ZB = "ext-event", Nx = "emotion-tts-stylesheet", Cx = ["accent", "density", "card"];
function JB(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function WB() {
  if (typeof document > "u" || document.getElementById(Nx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = Nx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
WB();
class e7 extends HTMLElement {
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
    this.root = ME.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(_h, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = XB(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(_h, a);
  }
  syncTweaksFromBody() {
    for (const a of Cx) {
      const s = JB(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Cx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = fC(YB(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(g.StrictMode, { children: /* @__PURE__ */ c.jsx(mC, { router: s }) })
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
      new CustomEvent(ZB, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function t7() {
  typeof customElements > "u" || customElements.get(Mh) || customElements.define(Mh, e7);
}
typeof customElements < "u" && !customElements.get(Mh) && t7();
export {
  t7 as register
};
//# sourceMappingURL=emotion-tts.js.map
