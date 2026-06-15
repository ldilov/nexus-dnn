function yE(t, a) {
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
function Nx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var tf = { exports: {} }, Ki = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sy;
function bE() {
  if (sy) return Ki;
  sy = 1;
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
var iy;
function xE() {
  return iy || (iy = 1, tf.exports = bE()), tf.exports;
}
var c = xE(), nf = { exports: {} }, qe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ly;
function SE() {
  if (ly) return qe;
  ly = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), w = Symbol.iterator;
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
  var H = Array.isArray;
  function Q() {
  }
  var ie = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function I(_, ne, J) {
    var G = J.ref;
    return {
      $$typeof: t,
      type: _,
      key: ne,
      ref: G !== void 0 ? G : null,
      props: J
    };
  }
  function D(_, ne) {
    return I(_.type, ne, _.props);
  }
  function q(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function te(_) {
    var ne = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(J) {
      return ne[J];
    });
  }
  var X = /\/+/g;
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
        switch (typeof _.status == "string" ? _.then(Q, Q) : (_.status = "pending", _.then(
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
  function k(_, ne, J, G, U) {
    var W = typeof _;
    (W === "undefined" || W === "boolean") && (_ = null);
    var de = !1;
    if (_ === null) de = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          de = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case t:
            case a:
              de = !0;
              break;
            case b:
              return de = _._init, k(
                de(_._payload),
                ne,
                J,
                G,
                U
              );
          }
      }
    if (de)
      return U = U(_), de = G === "" ? "." + le(_, 0) : G, H(U) ? (J = "", de != null && (J = de.replace(X, "$&/") + "/"), k(U, ne, J, "", function(rt) {
        return rt;
      })) : U != null && (q(U) && (U = D(
        U,
        J + (U.key == null || _ && _.key === U.key ? "" : ("" + U.key).replace(
          X,
          "$&/"
        ) + "/") + de
      )), ne.push(U)), 1;
    de = 0;
    var ve = G === "" ? "." : G + ":";
    if (H(_))
      for (var Te = 0; Te < _.length; Te++)
        G = _[Te], W = ve + le(G, Te), de += k(
          G,
          ne,
          J,
          W,
          U
        );
    else if (Te = S(_), typeof Te == "function")
      for (_ = Te.call(_), Te = 0; !(G = _.next()).done; )
        G = G.value, W = ve + le(G, Te++), de += k(
          G,
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
          G,
          U
        );
      throw ne = String(_), Error(
        "Objects are not valid as a React child (found: " + (ne === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : ne) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return de;
  }
  function $(_, ne, J) {
    if (_ == null) return _;
    var G = [], U = 0;
    return k(_, G, "", "", function(W) {
      return ne.call(J, W, U++);
    }), G;
  }
  function F(_) {
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
  var Y = typeof reportError == "function" ? reportError : function(_) {
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
  }, ue = {
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
      if (!q(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return qe.Activity = g, qe.Children = ue, qe.Component = T, qe.Fragment = s, qe.Profiler = o, qe.PureComponent = z, qe.StrictMode = i, qe.Suspense = y, qe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, qe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ie.H.useMemoCache(_);
    }
  }, qe.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, qe.cacheSignal = function() {
    return null;
  }, qe.cloneElement = function(_, ne, J) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var G = N({}, _.props), U = _.key;
    if (ne != null)
      for (W in ne.key !== void 0 && (U = "" + ne.key), ne)
        !A.call(ne, W) || W === "key" || W === "__self" || W === "__source" || W === "ref" && ne.ref === void 0 || (G[W] = ne[W]);
    var W = arguments.length - 2;
    if (W === 1) G.children = J;
    else if (1 < W) {
      for (var de = Array(W), ve = 0; ve < W; ve++)
        de[ve] = arguments[ve + 2];
      G.children = de;
    }
    return I(_.type, U, G);
  }, qe.createContext = function(_) {
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
  }, qe.createElement = function(_, ne, J) {
    var G, U = {}, W = null;
    if (ne != null)
      for (G in ne.key !== void 0 && (W = "" + ne.key), ne)
        A.call(ne, G) && G !== "key" && G !== "__self" && G !== "__source" && (U[G] = ne[G]);
    var de = arguments.length - 2;
    if (de === 1) U.children = J;
    else if (1 < de) {
      for (var ve = Array(de), Te = 0; Te < de; Te++)
        ve[Te] = arguments[Te + 2];
      U.children = ve;
    }
    if (_ && _.defaultProps)
      for (G in de = _.defaultProps, de)
        U[G] === void 0 && (U[G] = de[G]);
    return I(_, W, U);
  }, qe.createRef = function() {
    return { current: null };
  }, qe.forwardRef = function(_) {
    return { $$typeof: m, render: _ };
  }, qe.isValidElement = q, qe.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: F
    };
  }, qe.memo = function(_, ne) {
    return {
      $$typeof: p,
      type: _,
      compare: ne === void 0 ? null : ne
    };
  }, qe.startTransition = function(_) {
    var ne = ie.T, J = {};
    ie.T = J;
    try {
      var G = _(), U = ie.S;
      U !== null && U(J, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(Q, Y);
    } catch (W) {
      Y(W);
    } finally {
      ne !== null && J.types !== null && (ne.types = J.types), ie.T = ne;
    }
  }, qe.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, qe.use = function(_) {
    return ie.H.use(_);
  }, qe.useActionState = function(_, ne, J) {
    return ie.H.useActionState(_, ne, J);
  }, qe.useCallback = function(_, ne) {
    return ie.H.useCallback(_, ne);
  }, qe.useContext = function(_) {
    return ie.H.useContext(_);
  }, qe.useDebugValue = function() {
  }, qe.useDeferredValue = function(_, ne) {
    return ie.H.useDeferredValue(_, ne);
  }, qe.useEffect = function(_, ne) {
    return ie.H.useEffect(_, ne);
  }, qe.useEffectEvent = function(_) {
    return ie.H.useEffectEvent(_);
  }, qe.useId = function() {
    return ie.H.useId();
  }, qe.useImperativeHandle = function(_, ne, J) {
    return ie.H.useImperativeHandle(_, ne, J);
  }, qe.useInsertionEffect = function(_, ne) {
    return ie.H.useInsertionEffect(_, ne);
  }, qe.useLayoutEffect = function(_, ne) {
    return ie.H.useLayoutEffect(_, ne);
  }, qe.useMemo = function(_, ne) {
    return ie.H.useMemo(_, ne);
  }, qe.useOptimistic = function(_, ne) {
    return ie.H.useOptimistic(_, ne);
  }, qe.useReducer = function(_, ne, J) {
    return ie.H.useReducer(_, ne, J);
  }, qe.useRef = function(_) {
    return ie.H.useRef(_);
  }, qe.useState = function(_) {
    return ie.H.useState(_);
  }, qe.useSyncExternalStore = function(_, ne, J) {
    return ie.H.useSyncExternalStore(
      _,
      ne,
      J
    );
  }, qe.useTransition = function() {
    return ie.H.useTransition();
  }, qe.version = "19.2.5", qe;
}
var oy;
function Mh() {
  return oy || (oy = 1, nf.exports = SE()), nf.exports;
}
var v = Mh();
const xe = /* @__PURE__ */ Nx(v), wE = /* @__PURE__ */ yE({
  __proto__: null,
  default: xe
}, [v]);
var af = { exports: {} }, Xi = {}, rf = { exports: {} }, sf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cy;
function jE() {
  return cy || (cy = 1, (function(t) {
    function a(k, $) {
      var F = k.length;
      k.push($);
      e: for (; 0 < F; ) {
        var Y = F - 1 >>> 1, ue = k[Y];
        if (0 < o(ue, $))
          k[Y] = $, k[F] = ue, F = Y;
        else break e;
      }
    }
    function s(k) {
      return k.length === 0 ? null : k[0];
    }
    function i(k) {
      if (k.length === 0) return null;
      var $ = k[0], F = k.pop();
      if (F !== $) {
        k[0] = F;
        e: for (var Y = 0, ue = k.length, _ = ue >>> 1; Y < _; ) {
          var ne = 2 * (Y + 1) - 1, J = k[ne], G = ne + 1, U = k[G];
          if (0 > o(J, F))
            G < ue && 0 > o(U, J) ? (k[Y] = U, k[G] = F, Y = G) : (k[Y] = J, k[ne] = F, Y = ne);
          else if (G < ue && 0 > o(U, F))
            k[Y] = U, k[G] = F, Y = G;
          else break e;
        }
      }
      return $;
    }
    function o(k, $) {
      var F = k.sortIndex - $.sortIndex;
      return F !== 0 ? F : k.id - $.id;
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
    var y = [], p = [], b = 1, g = null, w = 3, S = !1, j = !1, N = !1, C = !1, T = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function R(k) {
      for (var $ = s(p); $ !== null; ) {
        if ($.callback === null) i(p);
        else if ($.startTime <= k)
          i(p), $.sortIndex = $.expirationTime, a(y, $);
        else break;
        $ = s(p);
      }
    }
    function H(k) {
      if (N = !1, R(k), !j)
        if (s(y) !== null)
          j = !0, Q || (Q = !0, te());
        else {
          var $ = s(p);
          $ !== null && re(H, $.startTime - k);
        }
    }
    var Q = !1, ie = -1, A = 5, I = -1;
    function D() {
      return C ? !0 : !(t.unstable_now() - I < A);
    }
    function q() {
      if (C = !1, Q) {
        var k = t.unstable_now();
        I = k;
        var $ = !0;
        try {
          e: {
            j = !1, N && (N = !1, M(ie), ie = -1), S = !0;
            var F = w;
            try {
              t: {
                for (R(k), g = s(y); g !== null && !(g.expirationTime > k && D()); ) {
                  var Y = g.callback;
                  if (typeof Y == "function") {
                    g.callback = null, w = g.priorityLevel;
                    var ue = Y(
                      g.expirationTime <= k
                    );
                    if (k = t.unstable_now(), typeof ue == "function") {
                      g.callback = ue, R(k), $ = !0;
                      break t;
                    }
                    g === s(y) && i(y), R(k);
                  } else i(y);
                  g = s(y);
                }
                if (g !== null) $ = !0;
                else {
                  var _ = s(p);
                  _ !== null && re(
                    H,
                    _.startTime - k
                  ), $ = !1;
                }
              }
              break e;
            } finally {
              g = null, w = F, S = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? te() : Q = !1;
        }
      }
    }
    var te;
    if (typeof z == "function")
      te = function() {
        z(q);
      };
    else if (typeof MessageChannel < "u") {
      var X = new MessageChannel(), le = X.port2;
      X.port1.onmessage = q, te = function() {
        le.postMessage(null);
      };
    } else
      te = function() {
        T(q, 0);
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
      var F = w;
      w = $;
      try {
        return k();
      } finally {
        w = F;
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
      var F = w;
      w = k;
      try {
        return $();
      } finally {
        w = F;
      }
    }, t.unstable_scheduleCallback = function(k, $, F) {
      var Y = t.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? Y + F : Y) : F = Y, k) {
        case 1:
          var ue = -1;
          break;
        case 2:
          ue = 250;
          break;
        case 5:
          ue = 1073741823;
          break;
        case 4:
          ue = 1e4;
          break;
        default:
          ue = 5e3;
      }
      return ue = F + ue, k = {
        id: b++,
        callback: $,
        priorityLevel: k,
        startTime: F,
        expirationTime: ue,
        sortIndex: -1
      }, F > Y ? (k.sortIndex = F, a(p, k), s(y) === null && k === s(p) && (N ? (M(ie), ie = -1) : N = !0, re(H, F - Y))) : (k.sortIndex = ue, a(y, k), j || S || (j = !0, Q || (Q = !0, te()))), k;
    }, t.unstable_shouldYield = D, t.unstable_wrapCallback = function(k) {
      var $ = w;
      return function() {
        var F = w;
        w = $;
        try {
          return k.apply(this, arguments);
        } finally {
          w = F;
        }
      };
    };
  })(sf)), sf;
}
var uy;
function EE() {
  return uy || (uy = 1, rf.exports = jE()), rf.exports;
}
var lf = { exports: {} }, pn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dy;
function NE() {
  if (dy) return pn;
  dy = 1;
  var t = Mh();
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
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: g == null ? null : "" + g,
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
      var b = p.as, g = m(b, p.crossOrigin), w = typeof p.integrity == "string" ? p.integrity : void 0, S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? i.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: g,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && i.d.X(y, {
        crossOrigin: g,
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
      var b = p.as, g = m(b, p.crossOrigin);
      i.d.L(y, b, {
        crossOrigin: g,
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
var fy;
function Cx() {
  if (fy) return lf.exports;
  fy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), lf.exports = NE(), lf.exports;
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
var hy;
function CE() {
  if (hy) return Xi;
  hy = 1;
  var t = EE(), a = Mh(), s = Cx();
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
  var g = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), z = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), q = Symbol.iterator;
  function te(e) {
    return e === null || typeof e != "object" ? null : (e = q && e[q] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var X = Symbol.for("react.client.reference");
  function le(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === X ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case C:
        return "StrictMode";
      case H:
        return "Suspense";
      case Q:
        return "SuspenseList";
      case I:
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
  var re = Array.isArray, k = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Y = [], ue = -1;
  function _(e) {
    return { current: e };
  }
  function ne(e) {
    0 > ue || (e.current = Y[ue], Y[ue] = null, ue--);
  }
  function J(e, n) {
    ue++, Y[ue] = e.current, e.current = n;
  }
  var G = _(null), U = _(null), W = _(null), de = _(null);
  function ve(e, n) {
    switch (J(W, n), J(U, e), J(G, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Rv(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Rv(n), e = _v(n, e);
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
    ne(G), J(G, e);
  }
  function Te() {
    ne(G), ne(U), ne(W);
  }
  function rt(e) {
    e.memoizedState !== null && J(de, e);
    var n = G.current, r = _v(n, e.type);
    n !== r && (J(U, e), J(G, r));
  }
  function Ee(e) {
    U.current === e && (ne(G), ne(U)), de.current === e && (ne(de), Fi._currentValue = F);
  }
  var Ze, Ie;
  function Ve(e) {
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
              var pe = function() {
                throw Error();
              };
              if (Object.defineProperty(pe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(pe, []);
                } catch (oe) {
                  var se = oe;
                }
                Reflect.construct(e, [], pe);
              } else {
                try {
                  pe.call();
                } catch (oe) {
                  se = oe;
                }
                e.call(pe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (oe) {
                se = oe;
              }
              (pe = e()) && typeof pe.catch == "function" && pe.catch(function() {
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
                  var fe = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", e.displayName)), fe;
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
  function Dt(e, n) {
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
        n += Dt(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var dt = Object.prototype.hasOwnProperty, Qt = t.unstable_scheduleCallback, un = t.unstable_cancelCallback, Rt = t.unstable_shouldYield, tn = t.unstable_requestPaint, _t = t.unstable_now, V = t.unstable_getCurrentPriorityLevel, ce = t.unstable_ImmediatePriority, ye = t.unstable_UserBlockingPriority, ze = t.unstable_NormalPriority, Fe = t.unstable_LowPriority, st = t.unstable_IdlePriority, he = t.log, je = t.unstable_setDisableYieldValue, Oe = null, Ce = null;
  function ft(e) {
    if (typeof he == "function" && je(e), Ce && typeof Ce.setStrictMode == "function")
      try {
        Ce.setStrictMode(Oe, e);
      } catch {
      }
  }
  var He = Math.clz32 ? Math.clz32 : yn, dn = Math.log, Hn = Math.LN2;
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
      var fe = 31 - He(r), pe = 1 << fe;
      E[fe] = 0, L[fe] = -1;
      var se = ae[fe];
      if (se !== null)
        for (ae[fe] = null, fe = 0; fe < se.length; fe++) {
          var oe = se[fe];
          oe !== null && (oe.lane &= -536870913);
        }
      r &= ~pe;
    }
    l !== 0 && Sa(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function Sa(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - He(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function hn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - He(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function O(e, n) {
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
    var e = $.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Jv(e.type));
  }
  function be(e, n) {
    var r = $.p;
    try {
      return $.p = e, n();
    } finally {
      $.p = r;
    }
  }
  var _e = Math.random().toString(36).slice(2), Se = "__reactFiber$" + _e, we = "__reactProps$" + _e, Ae = "__reactContainer$" + _e, Ne = "__reactEvents$" + _e, $e = "__reactListeners$" + _e, ke = "__reactHandles$" + _e, it = "__reactResources$" + _e, Ke = "__reactMarker$" + _e;
  function xt(e) {
    delete e[Se], delete e[we], delete e[Ne], delete e[$e], delete e[ke];
  }
  function gt(e) {
    var n = e[Se];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ae] || r[Se]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Lv(e); e !== null; ) {
            if (r = e[Se]) return r;
            e = Lv(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Mt(e) {
    if (e = e[Se] || e[Ae]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Je(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(i(33));
  }
  function Ht(e) {
    var n = e[it];
    return n || (n = e[it] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Et(e) {
    e[Ke] = !0;
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
  function Xe(e, n, r) {
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
  var fw = /[\n"\\]/g;
  function Fn(e) {
    return e.replace(
      fw,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Xc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + qt(n)) : e.value !== "" + qt(n) && (e.value = "" + qt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Qc(e, x, qt(n)) : r != null ? Qc(e, x, qt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + qt(E) : e.removeAttribute("name");
  }
  function wm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        as(e);
        return;
      }
      r = r != null ? "" + qt(r) : "", n = n != null ? "" + qt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), as(e);
  }
  function Qc(e, n, r) {
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
  function jm(e, n, r) {
    if (n != null && (n = "" + qt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + qt(r) : "";
  }
  function Em(e, n, r, l) {
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
  var hw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Nm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || hw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function Cm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(i(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Nm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Nm(e, h, n[h]);
  }
  function Zc(e) {
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
  var mw = /* @__PURE__ */ new Map([
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
  ]), pw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Al(e) {
    return pw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var Jc = null;
  function Wc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var is = null, ls = null;
  function Tm(e) {
    var n = Mt(e);
    if (n && (e = n.stateNode)) {
      var r = e[we] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Xc(
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
                var d = l[we] || null;
                if (!d) throw Error(i(90));
                Xc(
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
          jm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && rs(e, !!r.multiple, n, !1);
      }
    }
  }
  var eu = !1;
  function Rm(e, n, r) {
    if (eu) return e(n, r);
    eu = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (eu = !1, (is !== null || ls !== null) && (bo(), is && (n = is, e = ls, ls = is = null, Tm(n), e)))
        for (n = 0; n < e.length; n++) Tm(e[n]);
    }
  }
  function li(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[we] || null;
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), tu = !1;
  if (ja)
    try {
      var oi = {};
      Object.defineProperty(oi, "passive", {
        get: function() {
          tu = !0;
        }
      }), window.addEventListener("test", oi, oi), window.removeEventListener("test", oi, oi);
    } catch {
      tu = !1;
    }
  var Ya = null, nu = null, Dl = null;
  function _m() {
    if (Dl) return Dl;
    var e, n = nu, r = n.length, l, d = "value" in Ya ? Ya.value : Ya.textContent, h = d.length;
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
  function Mm() {
    return !1;
  }
  function xn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? zl : Mm, this.isPropagationStopped = Mm, this;
    }
    return g(n.prototype, {
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
  }, Ol = xn(Rr), ci = g({}, Rr, { view: 0, detail: 0 }), gw = xn(ci), au, ru, ui, Ll = g({}, ci, {
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
    getModifierState: iu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ui && (ui && e.type === "mousemove" ? (au = e.screenX - ui.screenX, ru = e.screenY - ui.screenY) : ru = au = 0, ui = e), au);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ru;
    }
  }), Am = xn(Ll), vw = g({}, Ll, { dataTransfer: 0 }), yw = xn(vw), bw = g({}, ci, { relatedTarget: 0 }), su = xn(bw), xw = g({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Sw = xn(xw), ww = g({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), jw = xn(ww), Ew = g({}, Rr, { data: 0 }), Dm = xn(Ew), Nw = {
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
  }, Cw = {
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
  }, Tw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Rw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = Tw[e]) ? !!n[e] : !1;
  }
  function iu() {
    return Rw;
  }
  var _w = g({}, ci, {
    key: function(e) {
      if (e.key) {
        var n = Nw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: iu,
    charCode: function(e) {
      return e.type === "keypress" ? kl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? kl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Mw = xn(_w), Aw = g({}, Ll, {
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
  }), km = xn(Aw), Dw = g({}, ci, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: iu
  }), kw = xn(Dw), zw = g({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ow = xn(zw), Lw = g({}, Ll, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $w = xn(Lw), Uw = g({}, Rr, {
    newState: 0,
    oldState: 0
  }), Bw = xn(Uw), Vw = [9, 13, 27, 32], lu = ja && "CompositionEvent" in window, di = null;
  ja && "documentMode" in document && (di = document.documentMode);
  var Iw = ja && "TextEvent" in window && !di, zm = ja && (!lu || di && 8 < di && 11 >= di), Om = " ", Lm = !1;
  function $m(e, n) {
    switch (e) {
      case "keyup":
        return Vw.indexOf(n.keyCode) !== -1;
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
  function Um(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var os = !1;
  function Hw(e, n) {
    switch (e) {
      case "compositionend":
        return Um(n);
      case "keypress":
        return n.which !== 32 ? null : (Lm = !0, Om);
      case "textInput":
        return e = n.data, e === Om && Lm ? null : e;
      default:
        return null;
    }
  }
  function qw(e, n) {
    if (os)
      return e === "compositionend" || !lu && $m(e, n) ? (e = _m(), Dl = nu = Ya = null, os = !1, e) : null;
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
        return zm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Fw = {
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
  function Bm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Fw[e.type] : n === "textarea";
  }
  function Vm(e, n, r, l) {
    is ? ls ? ls.push(l) : ls = [l] : is = l, n = Co(n, "onChange"), 0 < n.length && (r = new Ol(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var fi = null, hi = null;
  function Yw(e) {
    wv(e, 0);
  }
  function $l(e) {
    var n = Je(e);
    if (_l(n)) return e;
  }
  function Im(e, n) {
    if (e === "change") return n;
  }
  var Hm = !1;
  if (ja) {
    var ou;
    if (ja) {
      var cu = "oninput" in document;
      if (!cu) {
        var qm = document.createElement("div");
        qm.setAttribute("oninput", "return;"), cu = typeof qm.oninput == "function";
      }
      ou = cu;
    } else ou = !1;
    Hm = ou && (!document.documentMode || 9 < document.documentMode);
  }
  function Fm() {
    fi && (fi.detachEvent("onpropertychange", Ym), hi = fi = null);
  }
  function Ym(e) {
    if (e.propertyName === "value" && $l(hi)) {
      var n = [];
      Vm(
        n,
        hi,
        e,
        Wc(e)
      ), Rm(Yw, n);
    }
  }
  function Gw(e, n, r) {
    e === "focusin" ? (Fm(), fi = n, hi = r, fi.attachEvent("onpropertychange", Ym)) : e === "focusout" && Fm();
  }
  function Pw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $l(hi);
  }
  function Kw(e, n) {
    if (e === "click") return $l(n);
  }
  function Xw(e, n) {
    if (e === "input" || e === "change")
      return $l(n);
  }
  function Qw(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var kn = typeof Object.is == "function" ? Object.is : Qw;
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
  function Gm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Pm(e, n) {
    var r = Gm(e);
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
      r = Gm(r);
    }
  }
  function Km(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Km(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Xm(e) {
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
  function uu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Zw = ja && "documentMode" in document && 11 >= document.documentMode, cs = null, du = null, pi = null, fu = !1;
  function Qm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    fu || cs == null || cs !== Ml(l) || (l = cs, "selectionStart" in l && uu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), pi && mi(pi, l) || (pi = l, l = Co(du, "onSelect"), 0 < l.length && (n = new Ol(
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
  }, hu = {}, Zm = {};
  ja && (Zm = document.createElement("div").style, "AnimationEvent" in window || (delete us.animationend.animation, delete us.animationiteration.animation, delete us.animationstart.animation), "TransitionEvent" in window || delete us.transitionend.transition);
  function Mr(e) {
    if (hu[e]) return hu[e];
    if (!us[e]) return e;
    var n = us[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Zm)
        return hu[e] = n[r];
    return e;
  }
  var Jm = Mr("animationend"), Wm = Mr("animationiteration"), ep = Mr("animationstart"), Jw = Mr("transitionrun"), Ww = Mr("transitionstart"), ej = Mr("transitioncancel"), tp = Mr("transitionend"), np = /* @__PURE__ */ new Map(), mu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  mu.push("scrollEnd");
  function ia(e, n) {
    np.set(e, n), Wt(n, [e]);
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
  }, Yn = [], ds = 0, pu = 0;
  function Bl() {
    for (var e = ds, n = pu = ds = 0; n < e; ) {
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
      h !== 0 && ap(r, d, h);
    }
  }
  function Vl(e, n, r, l) {
    Yn[ds++] = e, Yn[ds++] = n, Yn[ds++] = r, Yn[ds++] = l, pu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function gu(e, n, r, l) {
    return Vl(e, n, r, l), Il(e);
  }
  function Ar(e, n) {
    return Vl(e, null, null, n), Il(e);
  }
  function ap(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - He(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Il(e) {
    if (50 < $i)
      throw $i = 0, Nd = null, Error(i(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fs = {};
  function tj(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zn(e, n, r, l) {
    return new tj(e, n, r, l);
  }
  function vu(e) {
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
  function rp(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Hl(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") vu(e) && (x = 1);
    else if (typeof e == "string")
      x = iE(
        e,
        r,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case I:
          return e = zn(31, r, n, d), e.elementType = I, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
        case C:
          x = 8, d |= 24;
          break;
        case T:
          return e = zn(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case H:
          return e = zn(13, r, n, d), e.elementType = H, e.lanes = h, e;
        case Q:
          return e = zn(19, r, n, d), e.elementType = Q, e.lanes = h, e;
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
  function yu(e, n, r) {
    return e = zn(6, e, null, n), e.lanes = r, e;
  }
  function sp(e) {
    var n = zn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function bu(e, n, r) {
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
  var ip = /* @__PURE__ */ new WeakMap();
  function Gn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = ip.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Mn(n)
      }, ip.set(e, n), n);
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
  function lp(e, n, r) {
    Pn[Kn++] = ma, Pn[Kn++] = pa, Pn[Kn++] = Ga, Ga = e;
    var l = ma;
    e = pa;
    var d = 32 - He(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - He(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, ma = 1 << 32 - He(n) + d | r << d | l, pa = h + e;
    } else
      ma = 1 << h | r << d | l, pa = e;
  }
  function xu(e) {
    e.return !== null && (Na(e, 1), lp(e, 1, 0));
  }
  function Su(e) {
    for (; e === ql; )
      ql = hs[--ms], hs[ms] = null, gi = hs[--ms], hs[ms] = null;
    for (; e === Ga; )
      Ga = Pn[--Kn], Pn[Kn] = null, pa = Pn[--Kn], Pn[Kn] = null, ma = Pn[--Kn], Pn[Kn] = null;
  }
  function op(e, n) {
    Pn[Kn++] = ma, Pn[Kn++] = pa, Pn[Kn++] = Ga, ma = n.id, pa = n.overflow, Ga = e;
  }
  var rn = null, Ct = null, at = !1, Pa = null, Xn = !1, wu = Error(i(519));
  function Ka(e) {
    var n = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vi(Gn(n, e)), wu;
  }
  function cp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Se] = e, n[we] = l, r) {
      case "dialog":
        et("cancel", n), et("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        et("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Bi.length; r++)
          et(Bi[r], n);
        break;
      case "source":
        et("error", n);
        break;
      case "img":
      case "image":
      case "link":
        et("error", n), et("load", n);
        break;
      case "details":
        et("toggle", n);
        break;
      case "input":
        et("invalid", n), wm(
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
        et("invalid", n);
        break;
      case "textarea":
        et("invalid", n), Em(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || Cv(n.textContent, r) ? (l.popover != null && (et("beforetoggle", n), et("toggle", n)), l.onScroll != null && et("scroll", n), l.onScrollEnd != null && et("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function up(e) {
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
    if (!at) return up(e), at = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Vd(e.type, e.memoizedProps)), r = !r), r && Ct && Ka(e), up(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ct = Ov(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      Ct = Ov(e);
    } else
      n === 27 ? (n = Ct, or(e.type) ? (e = Yd, Yd = null, Ct = e) : Ct = n) : Ct = rn ? Zn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    Ct = rn = null, at = !1;
  }
  function ju() {
    var e = Pa;
    return e !== null && (En === null ? En = e : En.push.apply(
      En,
      e
    ), Pa = null), e;
  }
  function vi(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var Eu = _(null), zr = null, Ca = null;
  function Xa(e, n, r) {
    J(Eu, n._currentValue), n._currentValue = r;
  }
  function Ta(e) {
    e._currentValue = Eu.current, ne(Eu);
  }
  function Nu(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Cu(e, n, r, l) {
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
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), Nu(
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
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), Nu(x, r, e), x = null;
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
      } else if (d === de.current) {
        if (x = d.alternate, x === null) throw Error(i(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Fi) : e = [Fi]);
      }
      d = d.return;
    }
    e !== null && Cu(
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
    return dp(zr, e);
  }
  function Yl(e, n) {
    return zr === null && Or(e), dp(e, n);
  }
  function dp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ca === null) {
      if (e === null) throw Error(i(308));
      Ca = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ca = Ca.next = n;
    return r;
  }
  var nj = typeof AbortController < "u" ? AbortController : function() {
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
  }, aj = t.unstable_scheduleCallback, rj = t.unstable_NormalPriority, Ft = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tu() {
    return {
      controller: new nj(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function yi(e) {
    e.refCount--, e.refCount === 0 && aj(rj, function() {
      e.controller.abort();
    });
  }
  var bi = null, Ru = 0, vs = 0, ys = null;
  function sj(e, n) {
    if (bi === null) {
      var r = bi = [];
      Ru = 0, vs = Ad(), ys = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Ru++, n.then(fp, fp), n;
  }
  function fp() {
    if (--Ru === 0 && bi !== null) {
      ys !== null && (ys.status = "fulfilled");
      var e = bi;
      bi = null, vs = 0, ys = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function ij(e, n) {
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
  var hp = k.S;
  k.S = function(e, n) {
    Qg = _t(), typeof n == "object" && n !== null && typeof n.then == "function" && sj(e, n), hp !== null && hp(e, n);
  };
  var Lr = _(null);
  function _u() {
    var e = Lr.current;
    return e !== null ? e : St.pooledCache;
  }
  function Gl(e, n) {
    n === null ? J(Lr, Lr.current) : J(Lr, n.pool);
  }
  function mp() {
    var e = _u();
    return e === null ? null : { parent: Ft._currentValue, pool: e };
  }
  var bs = Error(i(460)), Mu = Error(i(474)), Pl = Error(i(542)), Kl = { then: function() {
  } };
  function pp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function gp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, yp(e), e;
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
            throw e = n.reason, yp(e), e;
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
  function vp() {
    if (Ur === null) throw Error(i(459));
    var e = Ur;
    return Ur = null, e;
  }
  function yp(e) {
    if (e === bs || e === Pl)
      throw Error(i(483));
  }
  var xs = null, xi = 0;
  function Xl(e) {
    var n = xi;
    return xi += 1, xs === null && (xs = []), gp(xs, e, n);
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
  function bp(e) {
    function n(K, B) {
      if (e) {
        var ee = K.deletions;
        ee === null ? (K.deletions = [B], K.flags |= 16) : ee.push(B);
      }
    }
    function r(K, B) {
      if (!e) return null;
      for (; B !== null; )
        n(K, B), B = B.sibling;
      return null;
    }
    function l(K) {
      for (var B = /* @__PURE__ */ new Map(); K !== null; )
        K.key !== null ? B.set(K.key, K) : B.set(K.index, K), K = K.sibling;
      return B;
    }
    function d(K, B) {
      return K = Ea(K, B), K.index = 0, K.sibling = null, K;
    }
    function h(K, B, ee) {
      return K.index = ee, e ? (ee = K.alternate, ee !== null ? (ee = ee.index, ee < B ? (K.flags |= 67108866, B) : ee) : (K.flags |= 67108866, B)) : (K.flags |= 1048576, B);
    }
    function x(K) {
      return e && K.alternate === null && (K.flags |= 67108866), K;
    }
    function E(K, B, ee, me) {
      return B === null || B.tag !== 6 ? (B = yu(ee, K.mode, me), B.return = K, B) : (B = d(B, ee), B.return = K, B);
    }
    function L(K, B, ee, me) {
      var Le = ee.type;
      return Le === N ? fe(
        K,
        B,
        ee.props.children,
        me,
        ee.key
      ) : B !== null && (B.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === A && $r(Le) === B.type) ? (B = d(B, ee.props), Si(B, ee), B.return = K, B) : (B = Hl(
        ee.type,
        ee.key,
        ee.props,
        null,
        K.mode,
        me
      ), Si(B, ee), B.return = K, B);
    }
    function ae(K, B, ee, me) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== ee.containerInfo || B.stateNode.implementation !== ee.implementation ? (B = bu(ee, K.mode, me), B.return = K, B) : (B = d(B, ee.children || []), B.return = K, B);
    }
    function fe(K, B, ee, me, Le) {
      return B === null || B.tag !== 7 ? (B = Dr(
        ee,
        K.mode,
        me,
        Le
      ), B.return = K, B) : (B = d(B, ee), B.return = K, B);
    }
    function pe(K, B, ee) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = yu(
          "" + B,
          K.mode,
          ee
        ), B.return = K, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return ee = Hl(
              B.type,
              B.key,
              B.props,
              null,
              K.mode,
              ee
            ), Si(ee, B), ee.return = K, ee;
          case j:
            return B = bu(
              B,
              K.mode,
              ee
            ), B.return = K, B;
          case A:
            return B = $r(B), pe(K, B, ee);
        }
        if (re(B) || te(B))
          return B = Dr(
            B,
            K.mode,
            ee,
            null
          ), B.return = K, B;
        if (typeof B.then == "function")
          return pe(K, Xl(B), ee);
        if (B.$$typeof === z)
          return pe(
            K,
            Yl(K, B),
            ee
          );
        Ql(K, B);
      }
      return null;
    }
    function se(K, B, ee, me) {
      var Le = B !== null ? B.key : null;
      if (typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint")
        return Le !== null ? null : E(K, B, "" + ee, me);
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            return ee.key === Le ? L(K, B, ee, me) : null;
          case j:
            return ee.key === Le ? ae(K, B, ee, me) : null;
          case A:
            return ee = $r(ee), se(K, B, ee, me);
        }
        if (re(ee) || te(ee))
          return Le !== null ? null : fe(K, B, ee, me, null);
        if (typeof ee.then == "function")
          return se(
            K,
            B,
            Xl(ee),
            me
          );
        if (ee.$$typeof === z)
          return se(
            K,
            B,
            Yl(K, ee),
            me
          );
        Ql(K, ee);
      }
      return null;
    }
    function oe(K, B, ee, me, Le) {
      if (typeof me == "string" && me !== "" || typeof me == "number" || typeof me == "bigint")
        return K = K.get(ee) || null, E(B, K, "" + me, Le);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case S:
            return K = K.get(
              me.key === null ? ee : me.key
            ) || null, L(B, K, me, Le);
          case j:
            return K = K.get(
              me.key === null ? ee : me.key
            ) || null, ae(B, K, me, Le);
          case A:
            return me = $r(me), oe(
              K,
              B,
              ee,
              me,
              Le
            );
        }
        if (re(me) || te(me))
          return K = K.get(ee) || null, fe(B, K, me, Le, null);
        if (typeof me.then == "function")
          return oe(
            K,
            B,
            ee,
            Xl(me),
            Le
          );
        if (me.$$typeof === z)
          return oe(
            K,
            B,
            ee,
            Yl(B, me),
            Le
          );
        Ql(B, me);
      }
      return null;
    }
    function Re(K, B, ee, me) {
      for (var Le = null, lt = null, De = B, Ge = B = 0, nt = null; De !== null && Ge < ee.length; Ge++) {
        De.index > Ge ? (nt = De, De = null) : nt = De.sibling;
        var ot = se(
          K,
          De,
          ee[Ge],
          me
        );
        if (ot === null) {
          De === null && (De = nt);
          break;
        }
        e && De && ot.alternate === null && n(K, De), B = h(ot, B, Ge), lt === null ? Le = ot : lt.sibling = ot, lt = ot, De = nt;
      }
      if (Ge === ee.length)
        return r(K, De), at && Na(K, Ge), Le;
      if (De === null) {
        for (; Ge < ee.length; Ge++)
          De = pe(K, ee[Ge], me), De !== null && (B = h(
            De,
            B,
            Ge
          ), lt === null ? Le = De : lt.sibling = De, lt = De);
        return at && Na(K, Ge), Le;
      }
      for (De = l(De); Ge < ee.length; Ge++)
        nt = oe(
          De,
          K,
          Ge,
          ee[Ge],
          me
        ), nt !== null && (e && nt.alternate !== null && De.delete(
          nt.key === null ? Ge : nt.key
        ), B = h(
          nt,
          B,
          Ge
        ), lt === null ? Le = nt : lt.sibling = nt, lt = nt);
      return e && De.forEach(function(hr) {
        return n(K, hr);
      }), at && Na(K, Ge), Le;
    }
    function Be(K, B, ee, me) {
      if (ee == null) throw Error(i(151));
      for (var Le = null, lt = null, De = B, Ge = B = 0, nt = null, ot = ee.next(); De !== null && !ot.done; Ge++, ot = ee.next()) {
        De.index > Ge ? (nt = De, De = null) : nt = De.sibling;
        var hr = se(K, De, ot.value, me);
        if (hr === null) {
          De === null && (De = nt);
          break;
        }
        e && De && hr.alternate === null && n(K, De), B = h(hr, B, Ge), lt === null ? Le = hr : lt.sibling = hr, lt = hr, De = nt;
      }
      if (ot.done)
        return r(K, De), at && Na(K, Ge), Le;
      if (De === null) {
        for (; !ot.done; Ge++, ot = ee.next())
          ot = pe(K, ot.value, me), ot !== null && (B = h(ot, B, Ge), lt === null ? Le = ot : lt.sibling = ot, lt = ot);
        return at && Na(K, Ge), Le;
      }
      for (De = l(De); !ot.done; Ge++, ot = ee.next())
        ot = oe(De, K, Ge, ot.value, me), ot !== null && (e && ot.alternate !== null && De.delete(ot.key === null ? Ge : ot.key), B = h(ot, B, Ge), lt === null ? Le = ot : lt.sibling = ot, lt = ot);
      return e && De.forEach(function(vE) {
        return n(K, vE);
      }), at && Na(K, Ge), Le;
    }
    function bt(K, B, ee, me) {
      if (typeof ee == "object" && ee !== null && ee.type === N && ee.key === null && (ee = ee.props.children), typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case S:
            e: {
              for (var Le = ee.key; B !== null; ) {
                if (B.key === Le) {
                  if (Le = ee.type, Le === N) {
                    if (B.tag === 7) {
                      r(
                        K,
                        B.sibling
                      ), me = d(
                        B,
                        ee.props.children
                      ), me.return = K, K = me;
                      break e;
                    }
                  } else if (B.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === A && $r(Le) === B.type) {
                    r(
                      K,
                      B.sibling
                    ), me = d(B, ee.props), Si(me, ee), me.return = K, K = me;
                    break e;
                  }
                  r(K, B);
                  break;
                } else n(K, B);
                B = B.sibling;
              }
              ee.type === N ? (me = Dr(
                ee.props.children,
                K.mode,
                me,
                ee.key
              ), me.return = K, K = me) : (me = Hl(
                ee.type,
                ee.key,
                ee.props,
                null,
                K.mode,
                me
              ), Si(me, ee), me.return = K, K = me);
            }
            return x(K);
          case j:
            e: {
              for (Le = ee.key; B !== null; ) {
                if (B.key === Le)
                  if (B.tag === 4 && B.stateNode.containerInfo === ee.containerInfo && B.stateNode.implementation === ee.implementation) {
                    r(
                      K,
                      B.sibling
                    ), me = d(B, ee.children || []), me.return = K, K = me;
                    break e;
                  } else {
                    r(K, B);
                    break;
                  }
                else n(K, B);
                B = B.sibling;
              }
              me = bu(ee, K.mode, me), me.return = K, K = me;
            }
            return x(K);
          case A:
            return ee = $r(ee), bt(
              K,
              B,
              ee,
              me
            );
        }
        if (re(ee))
          return Re(
            K,
            B,
            ee,
            me
          );
        if (te(ee)) {
          if (Le = te(ee), typeof Le != "function") throw Error(i(150));
          return ee = Le.call(ee), Be(
            K,
            B,
            ee,
            me
          );
        }
        if (typeof ee.then == "function")
          return bt(
            K,
            B,
            Xl(ee),
            me
          );
        if (ee.$$typeof === z)
          return bt(
            K,
            B,
            Yl(K, ee),
            me
          );
        Ql(K, ee);
      }
      return typeof ee == "string" && ee !== "" || typeof ee == "number" || typeof ee == "bigint" ? (ee = "" + ee, B !== null && B.tag === 6 ? (r(K, B.sibling), me = d(B, ee), me.return = K, K = me) : (r(K, B), me = yu(ee, K.mode, me), me.return = K, K = me), x(K)) : r(K, B);
    }
    return function(K, B, ee, me) {
      try {
        xi = 0;
        var Le = bt(
          K,
          B,
          ee,
          me
        );
        return xs = null, Le;
      } catch (De) {
        if (De === bs || De === Pl) throw De;
        var lt = zn(29, De, null, K.mode);
        return lt.lanes = me, lt.return = K, lt;
      } finally {
      }
    };
  }
  var Br = bp(!0), xp = bp(!1), Qa = !1;
  function Au(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Du(e, n) {
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
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Il(e), ap(e, null, r), n;
    }
    return Vl(e, l, n, r), Il(e);
  }
  function wi(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, hn(e, r);
    }
  }
  function ku(e, n) {
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
  var zu = !1;
  function ji() {
    if (zu) {
      var e = ys;
      if (e !== null) throw e;
    }
  }
  function Ei(e, n, r, l) {
    zu = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, ae = L.next;
      L.next = null, x === null ? h = ae : x.next = ae, x = L;
      var fe = e.alternate;
      fe !== null && (fe = fe.updateQueue, E = fe.lastBaseUpdate, E !== x && (E === null ? fe.firstBaseUpdate = ae : E.next = ae, fe.lastBaseUpdate = L));
    }
    if (h !== null) {
      var pe = d.baseState;
      x = 0, fe = ae = L = null, E = h;
      do {
        var se = E.lane & -536870913, oe = se !== E.lane;
        if (oe ? (tt & se) === se : (l & se) === se) {
          se !== 0 && se === vs && (zu = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Re = e, Be = E;
            se = n;
            var bt = r;
            switch (Be.tag) {
              case 1:
                if (Re = Be.payload, typeof Re == "function") {
                  pe = Re.call(bt, pe, se);
                  break e;
                }
                pe = Re;
                break e;
              case 3:
                Re.flags = Re.flags & -65537 | 128;
              case 0:
                if (Re = Be.payload, se = typeof Re == "function" ? Re.call(bt, pe, se) : Re, se == null) break e;
                pe = g({}, pe, se);
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
          }, fe === null ? (ae = fe = oe, L = pe) : fe = fe.next = oe, x |= se;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          oe = E, E = oe.next, oe.next = null, d.lastBaseUpdate = oe, d.shared.pending = null;
        }
      } while (!0);
      fe === null && (L = pe), d.baseState = L, d.firstBaseUpdate = ae, d.lastBaseUpdate = fe, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = pe;
    }
  }
  function Sp(e, n) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(n);
  }
  function wp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        Sp(r[e], n);
  }
  var Ss = _(null), Zl = _(0);
  function jp(e, n) {
    e = La, J(Zl, e), J(Ss, n), La = e | n.baseLanes;
  }
  function Ou() {
    J(Zl, La), J(Ss, Ss.current);
  }
  function Lu() {
    La = Zl.current, ne(Ss), ne(Zl);
  }
  var On = _(null), Qn = null;
  function Wa(e) {
    var n = e.alternate;
    J(Ut, Ut.current & 1), J(On, e), Qn === null && (n === null || Ss.current !== null || n.memoizedState !== null) && (Qn = e);
  }
  function $u(e) {
    J(Ut, Ut.current), J(On, e), Qn === null && (Qn = e);
  }
  function Ep(e) {
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
        if (r !== null && (r = r.dehydrated, r === null || qd(r) || Fd(r)))
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
  var Ra = 0, Ye = null, vt = null, Yt = null, Wl = !1, ws = !1, Vr = !1, eo = 0, Ni = 0, js = null, lj = 0;
  function Ot() {
    throw Error(i(321));
  }
  function Uu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!kn(e[r], n[r])) return !1;
    return !0;
  }
  function Bu(e, n, r, l, d, h) {
    return Ra = h, Ye = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, k.H = e === null || e.memoizedState === null ? lg : ed, Vr = !1, h = r(l, d), Vr = !1, ws && (h = Cp(
      n,
      r,
      l,
      d
    )), Np(e), h;
  }
  function Np(e) {
    k.H = Ri;
    var n = vt !== null && vt.next !== null;
    if (Ra = 0, Yt = vt = Ye = null, Wl = !1, Ni = 0, js = null, n) throw Error(i(300));
    e === null || Gt || (e = e.dependencies, e !== null && Fl(e) && (Gt = !0));
  }
  function Cp(e, n, r, l) {
    Ye = e;
    var d = 0;
    do {
      if (ws && (js = null), Ni = 0, ws = !1, 25 <= d) throw Error(i(301));
      if (d += 1, Yt = vt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      k.H = og, h = n(r, l);
    } while (ws);
    return h;
  }
  function oj() {
    var e = k.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ci(n) : n, e = e.useState()[0], (vt !== null ? vt.memoizedState : null) !== e && (Ye.flags |= 1024), n;
  }
  function Vu() {
    var e = eo !== 0;
    return eo = 0, e;
  }
  function Iu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Hu(e) {
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
    return Ni += 1, js === null && (js = []), e = gp(js, e, n), n = Ye, (Yt === null ? n.memoizedState : Yt.next) === null && (n = n.alternate, k.H = n === null || n.memoizedState === null ? lg : ed), e;
  }
  function no(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ci(e);
      if (e.$$typeof === z) return sn(e);
    }
    throw Error(i(438, String(e)));
  }
  function qu(e) {
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
    return Fu(n, vt, e);
  }
  function Fu(e, n, r) {
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
      var E = x = null, L = null, ae = n, fe = !1;
      do {
        var pe = ae.lane & -536870913;
        if (pe !== ae.lane ? (tt & pe) === pe : (Ra & pe) === pe) {
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
            }), pe === vs && (fe = !0);
          else if ((Ra & se) === se) {
            ae = ae.next, se === vs && (fe = !0);
            continue;
          } else
            pe = {
              lane: 0,
              revertLane: ae.revertLane,
              gesture: null,
              action: ae.action,
              hasEagerState: ae.hasEagerState,
              eagerState: ae.eagerState,
              next: null
            }, L === null ? (E = L = pe, x = h) : L = L.next = pe, Ye.lanes |= se, ar |= se;
          pe = ae.action, Vr && r(h, pe), h = ae.hasEagerState ? ae.eagerState : r(h, pe);
        } else
          se = {
            lane: pe,
            revertLane: ae.revertLane,
            gesture: ae.gesture,
            action: ae.action,
            hasEagerState: ae.hasEagerState,
            eagerState: ae.eagerState,
            next: null
          }, L === null ? (E = L = se, x = h) : L = L.next = se, Ye.lanes |= pe, ar |= pe;
        ae = ae.next;
      } while (ae !== null && ae !== n);
      if (L === null ? x = h : L.next = E, !kn(h, e.memoizedState) && (Gt = !0, fe && (r = ys, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Yu(e) {
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
  function Tp(e, n, r) {
    var l = Ye, d = Bt(), h = at;
    if (h) {
      if (r === void 0) throw Error(i(407));
      r = r();
    } else r = n();
    var x = !kn(
      (vt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, Gt = !0), d = d.queue, Ku(Mp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Yt !== null && Yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        _p.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), St === null) throw Error(i(349));
      h || (Ra & 127) !== 0 || Rp(l, n, r);
    }
    return r;
  }
  function Rp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ye.updateQueue, n === null ? (n = to(), Ye.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function _p(e, n, r, l) {
    n.value = r, n.getSnapshot = l, Ap(n) && Dp(e);
  }
  function Mp(e, n, r) {
    return r(function() {
      Ap(n) && Dp(e);
    });
  }
  function Ap(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !kn(e, r);
    } catch {
      return !0;
    }
  }
  function Dp(e) {
    var n = Ar(e, 2);
    n !== null && Nn(n, e, 2);
  }
  function Gu(e) {
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
  function kp(e, n, r, l) {
    return e.baseState = r, Fu(
      e,
      vt,
      typeof l == "function" ? l : _a
    );
  }
  function cj(e, n, r, l, d) {
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
      k.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, zp(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function zp(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = k.T, x = {};
      k.T = x;
      try {
        var E = r(d, l), L = k.S;
        L !== null && L(x, E), Op(e, n, E);
      } catch (ae) {
        Pu(e, n, ae);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), k.T = h;
      }
    } else
      try {
        h = r(d, l), Op(e, n, h);
      } catch (ae) {
        Pu(e, n, ae);
      }
  }
  function Op(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Lp(e, n, l);
      },
      function(l) {
        return Pu(e, n, l);
      }
    ) : Lp(e, n, r);
  }
  function Lp(e, n, r) {
    n.status = "fulfilled", n.value = r, $p(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, zp(e, r)));
  }
  function Pu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, $p(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function $p(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Up(e, n) {
    return n;
  }
  function Bp(e, n) {
    if (at) {
      var r = St.formState;
      if (r !== null) {
        e: {
          var l = Ye;
          if (at) {
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
      lastRenderedReducer: Up,
      lastRenderedState: n
    }, r.queue = l, r = rg.bind(
      null,
      Ye,
      l
    ), l.dispatch = r, l = Gu(!1), h = Wu.bind(
      null,
      Ye,
      !1,
      l.queue
    ), l = bn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = cj.bind(
      null,
      Ye,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Vp(e) {
    var n = Bt();
    return Ip(n, vt, e);
  }
  function Ip(e, n, r) {
    if (n = Fu(
      e,
      n,
      Up
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
      uj.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function uj(e, n) {
    e.action = n;
  }
  function Hp(e) {
    var n = Bt(), r = vt;
    if (r !== null)
      return Ip(n, r, e);
    Bt(), n = n.memoizedState, r = Bt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Es(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Ye.updateQueue, n === null && (n = to(), Ye.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function qp() {
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
    vt !== null && l !== null && Uu(l, vt.memoizedState.deps) ? d.memoizedState = Es(n, h, r, l) : (Ye.flags |= e, d.memoizedState = Es(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Fp(e, n) {
    ro(8390656, 8, e, n);
  }
  function Ku(e, n) {
    so(2048, 8, e, n);
  }
  function dj(e) {
    Ye.flags |= 4;
    var n = Ye.updateQueue;
    if (n === null)
      n = to(), Ye.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Yp(e) {
    var n = Bt().memoizedState;
    return dj({ ref: n, nextImpl: e }), function() {
      if ((ut & 2) !== 0) throw Error(i(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Gp(e, n) {
    return so(4, 2, e, n);
  }
  function Pp(e, n) {
    return so(4, 4, e, n);
  }
  function Kp(e, n) {
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
  function Xp(e, n, r) {
    r = r != null ? r.concat([e]) : null, so(4, 4, Kp.bind(null, n, e), r);
  }
  function Xu() {
  }
  function Qp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Uu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Zp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Uu(n, l[1]))
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
  function Qu(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (tt & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Jg(), Ye.lanes |= e, ar |= e, r);
  }
  function Jp(e, n, r, l) {
    return kn(r, n) ? r : Ss.current !== null ? (e = Qu(e, r, l), kn(e, n) || (Gt = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (tt & 261930) === 0 ? (Gt = !0, e.memoizedState = r) : (e = Jg(), Ye.lanes |= e, ar |= e, n);
  }
  function Wp(e, n, r, l, d) {
    var h = $.p;
    $.p = h !== 0 && 8 > h ? h : 8;
    var x = k.T, E = {};
    k.T = E, Wu(e, !1, n, r);
    try {
      var L = d(), ae = k.S;
      if (ae !== null && ae(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var fe = ij(
          L,
          l
        );
        Ti(
          e,
          n,
          fe,
          Bn(e)
        );
      } else
        Ti(
          e,
          n,
          l,
          Bn(e)
        );
    } catch (pe) {
      Ti(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: pe },
        Bn()
      );
    } finally {
      $.p = h, x !== null && E.types !== null && (x.types = E.types), k.T = x;
    }
  }
  function fj() {
  }
  function Zu(e, n, r, l) {
    if (e.tag !== 5) throw Error(i(476));
    var d = eg(e).queue;
    Wp(
      e,
      d,
      n,
      F,
      r === null ? fj : function() {
        return tg(e), r(l);
      }
    );
  }
  function eg(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _a,
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
        lastRenderedReducer: _a,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function tg(e) {
    var n = eg(e);
    n.next === null && (n = e.alternate.memoizedState), Ti(
      e,
      n.next.queue,
      {},
      Bn()
    );
  }
  function Ju() {
    return sn(Fi);
  }
  function ng() {
    return Bt().memoizedState;
  }
  function ag() {
    return Bt().memoizedState;
  }
  function hj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Bn();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Nn(l, n, r), wi(l, n, r)), n = { cache: Tu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function mj(e, n, r) {
    var l = Bn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e) ? sg(n, r) : (r = gu(e, n, r, l), r !== null && (Nn(r, e, l), ig(r, n, l)));
  }
  function rg(e, n, r) {
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
    if (io(e)) sg(n, d);
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
      if (r = gu(e, n, d, l), r !== null)
        return Nn(r, e, l), ig(r, n, l), !0;
    }
    return !1;
  }
  function Wu(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Ad(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, io(e)) {
      if (n) throw Error(i(479));
    } else
      n = gu(
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
  function sg(e, n) {
    ws = Wl = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function ig(e, n, r) {
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
  var lg = {
    readContext: sn,
    use: no,
    useCallback: function(e, n) {
      return bn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: sn,
    useEffect: Fp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, ro(
        4194308,
        4,
        Kp.bind(null, n, e),
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
      }, l.queue = e, e = e.dispatch = mj.bind(
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
      e = Gu(e);
      var n = e.queue, r = rg.bind(null, Ye, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Xu,
    useDeferredValue: function(e, n) {
      var r = bn();
      return Qu(r, e, n);
    },
    useTransition: function() {
      var e = Gu(!1);
      return e = Wp.bind(
        null,
        Ye,
        e.queue,
        !0,
        !1
      ), bn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Ye, d = bn();
      if (at) {
        if (r === void 0)
          throw Error(i(407));
        r = r();
      } else {
        if (r = n(), St === null)
          throw Error(i(349));
        (tt & 127) !== 0 || Rp(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Fp(Mp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Es(
        9,
        { destroy: void 0 },
        _p.bind(
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
      if (at) {
        var r = pa, l = ma;
        r = (l & ~(1 << 32 - He(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = eo++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = lj++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Ju,
    useFormState: Bp,
    useActionState: Bp,
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
      return n.queue = r, n = Wu.bind(
        null,
        Ye,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: qu,
    useCacheRefresh: function() {
      return bn().memoizedState = hj.bind(
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
  }, ed = {
    readContext: sn,
    use: no,
    useCallback: Qp,
    useContext: sn,
    useEffect: Ku,
    useImperativeHandle: Xp,
    useInsertionEffect: Gp,
    useLayoutEffect: Pp,
    useMemo: Zp,
    useReducer: ao,
    useRef: qp,
    useState: function() {
      return ao(_a);
    },
    useDebugValue: Xu,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return Jp(
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
    useSyncExternalStore: Tp,
    useId: ng,
    useHostTransitionStatus: Ju,
    useFormState: Vp,
    useActionState: Vp,
    useOptimistic: function(e, n) {
      var r = Bt();
      return kp(r, vt, e, n);
    },
    useMemoCache: qu,
    useCacheRefresh: ag
  };
  ed.useEffectEvent = Yp;
  var og = {
    readContext: sn,
    use: no,
    useCallback: Qp,
    useContext: sn,
    useEffect: Ku,
    useImperativeHandle: Xp,
    useInsertionEffect: Gp,
    useLayoutEffect: Pp,
    useMemo: Zp,
    useReducer: Yu,
    useRef: qp,
    useState: function() {
      return Yu(_a);
    },
    useDebugValue: Xu,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return vt === null ? Qu(r, e, n) : Jp(
        r,
        vt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Yu(_a)[0], n = Bt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ci(e),
        n
      ];
    },
    useSyncExternalStore: Tp,
    useId: ng,
    useHostTransitionStatus: Ju,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e, n) {
      var r = Bt();
      return vt !== null ? kp(r, vt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: qu,
    useCacheRefresh: ag
  };
  og.useEffectEvent = Yp;
  function td(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : g({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var nd = {
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
  function cg(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !mi(r, l) || !mi(d, h) : !0;
  }
  function ug(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && nd.enqueueReplaceState(n, n.state, null);
  }
  function Ir(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var l in n)
        l !== "ref" && (r[l] = n[l]);
    }
    if (e = e.defaultProps) {
      r === n && (r = g({}, r));
      for (var d in e)
        r[d] === void 0 && (r[d] = e[d]);
    }
    return r;
  }
  function dg(e) {
    Ul(e);
  }
  function fg(e) {
    console.error(e);
  }
  function hg(e) {
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
  function mg(e, n, r) {
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
  function ad(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      lo(e, n);
    }, r;
  }
  function pg(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function gg(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        mg(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      mg(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function pj(e, n, r, l, d) {
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
            return Qn === null ? xo() : r.alternate === null && Lt === 0 && (Lt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Rd(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Rd(e, l, d)), !1;
        }
        throw Error(i(435, r.tag));
      }
      return Rd(e, l, d), xo(), !1;
    }
    if (at)
      return n = On.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== wu && (e = Error(i(422), { cause: l }), vi(Gn(e, r)))) : (l !== wu && (n = Error(i(423), {
        cause: l
      }), vi(
        Gn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Gn(l, r), d = ad(
        e.stateNode,
        l,
        d
      ), ku(e, d), Lt !== 4 && (Lt = 2)), !1;
    var h = Error(i(520), { cause: l });
    if (h = Gn(h, r), Li === null ? Li = [h] : Li.push(h), Lt !== 4 && (Lt = 2), n === null) return !0;
    l = Gn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = ad(r.stateNode, l, e), ku(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = pg(d), gg(
              d,
              e,
              r,
              l
            ), ku(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var rd = Error(i(461)), Gt = !1;
  function ln(e, n, r, l) {
    n.child = e === null ? xp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function vg(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return Or(n), l = Bu(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Vu(), e !== null && !Gt ? (Iu(e, n, d), Ma(e, n, d)) : (at && E && xu(n), n.flags |= 1, ln(e, n, l, d), n.child);
  }
  function yg(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !vu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, bg(
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
    if (h = e.child, !fd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : mi, r(x, l) && e.ref === n.ref)
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function bg(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (mi(h, l) && e.ref === n.ref)
        if (Gt = !1, n.pendingProps = l = h, fd(e, d))
          (e.flags & 131072) !== 0 && (Gt = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return sd(
      e,
      n,
      r,
      l,
      d
    );
  }
  function xg(e, n, r, l) {
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
        return Sg(
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
        ), h !== null ? jp(n, h) : Ou(), Ep(n);
      else
        return l = n.lanes = 536870912, Sg(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Gl(n, h.cachePool), jp(n, h), er(), n.memoizedState = null) : (e !== null && Gl(n, null), Ou(), er());
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
  function Sg(e, n, r, l, d) {
    var h = _u();
    return h = h === null ? null : { parent: Ft._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Gl(n, null), Ou(), Ep(n), e !== null && gs(e, n, l, !0), n.childLanes = d, null;
  }
  function oo(e, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function wg(e, n, r) {
    return Br(n, e.child, null, r), e = oo(n, n.pendingProps), e.flags |= 2, Ln(n), n.memoizedState = null, e;
  }
  function gj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (at) {
        if (l.mode === "hidden")
          return e = oo(n, l), n.lanes = 536870912, _i(null, e);
        if ($u(n), (e = Ct) ? (e = zv(
          e,
          Xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = sp(e), r.return = n, n.child = r, rn = n, Ct = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if ($u(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = wg(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(i(558));
      else if (Gt || gs(e, n, r, !1), d = (r & e.childLanes) !== 0, Gt || d) {
        if (l = St, l !== null && (x = O(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), Nn(l, e, x), rd;
        xo(), n = wg(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, Ct = Zn(x.nextSibling), rn = n, at = !0, Pa = null, Xn = !1, e !== null && op(n, e), n = oo(n, l), n.flags |= 4096;
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
  function sd(e, n, r, l, d) {
    return Or(n), r = Bu(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Vu(), e !== null && !Gt ? (Iu(e, n, d), Ma(e, n, d)) : (at && l && xu(n), n.flags |= 1, ln(e, n, r, d), n.child);
  }
  function jg(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = Cp(
      n,
      l,
      r,
      d
    ), Np(e), l = Vu(), e !== null && !Gt ? (Iu(e, n, h), Ma(e, n, h)) : (at && l && xu(n), n.flags |= 1, ln(e, n, r, h), n.child);
  }
  function Eg(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = fs, x = r.contextType;
      typeof x == "object" && x !== null && (h = sn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = nd, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Au(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? sn(x) : fs, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (td(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && nd.enqueueReplaceState(h, h.state, null), Ei(n, l, h, d), ji(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Ir(r, E);
      h.props = L;
      var ae = h.context, fe = r.contextType;
      x = fs, typeof fe == "object" && fe !== null && (x = sn(fe));
      var pe = r.getDerivedStateFromProps;
      fe = typeof pe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, fe || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || ae !== x) && ug(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var se = n.memoizedState;
      h.state = se, Ei(n, l, h, d), ji(), ae = n.memoizedState, E || se !== ae || Qa ? (typeof pe == "function" && (td(
        n,
        r,
        pe,
        l
      ), ae = n.memoizedState), (L = Qa || cg(
        n,
        r,
        L,
        l,
        se,
        ae,
        x
      )) ? (fe || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = ae), h.props = l, h.state = ae, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Du(e, n), x = n.memoizedProps, fe = Ir(r, x), h.props = fe, pe = n.pendingProps, se = h.context, ae = r.contextType, L = fs, typeof ae == "object" && ae !== null && (L = sn(ae)), E = r.getDerivedStateFromProps, (ae = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== pe || se !== L) && ug(
        n,
        h,
        l,
        L
      ), Qa = !1, se = n.memoizedState, h.state = se, Ei(n, l, h, d), ji();
      var oe = n.memoizedState;
      x !== pe || se !== oe || Qa || e !== null && e.dependencies !== null && Fl(e.dependencies) ? (typeof E == "function" && (td(
        n,
        r,
        E,
        l
      ), oe = n.memoizedState), (fe = Qa || cg(
        n,
        r,
        fe,
        l,
        se,
        oe,
        L
      ) || e !== null && e.dependencies !== null && Fl(e.dependencies)) ? (ae || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, oe, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        oe,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = oe), h.props = l, h.state = oe, h.context = L, l = fe) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && se === e.memoizedState || (n.flags |= 1024), l = !1);
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
  function Ng(e, n, r, l) {
    return kr(), n.flags |= 256, ln(e, n, r, l), n.child;
  }
  var id = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ld(e) {
    return { baseLanes: e, cachePool: mp() };
  }
  function od(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Un), e;
  }
  function Cg(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (Ut.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (at) {
        if (d ? Wa(n) : er(), (e = Ct) ? (e = zv(
          e,
          Xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = sp(e), r.return = n, n.child = r, rn = n, Ct = null)) : e = null, e === null) throw Ka(n);
        return Fd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
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
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = ld(r), l.childLanes = od(
        e,
        x,
        r
      ), n.memoizedState = id, _i(null, l)) : (Wa(n), cd(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = ud(
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
        ), l = n.child, l.memoizedState = ld(r), l.childLanes = od(
          e,
          x,
          r
        ), n.memoizedState = id, n = _i(null, l));
      else if (Wa(n), Fd(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var ae = x.dgst;
        x = ae, l = Error(i(419)), l.stack = "", l.digest = x, vi({ value: l, source: null, stack: null }), n = ud(
          e,
          n,
          r
        );
      } else if (Gt || gs(e, n, r, !1), x = (r & e.childLanes) !== 0, Gt || x) {
        if (x = St, x !== null && (l = O(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), Nn(x, e, l), rd;
        qd(E) || xo(), n = ud(
          e,
          n,
          r
        );
      } else
        qd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, Ct = Zn(
          E.nextSibling
        ), rn = n, at = !0, Pa = null, Xn = !1, e !== null && op(n, e), n = cd(
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
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, _i(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = ld(r) : (d = E.cachePool, d !== null ? (L = Ft._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = mp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = od(
      e,
      x,
      r
    ), n.memoizedState = id, _i(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function cd(e, n) {
    return n = uo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function uo(e, n) {
    return e = zn(22, e, null, n), e.lanes = 0, e;
  }
  function ud(e, n, r) {
    return Br(n, e.child, null, r), e = cd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Tg(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Nu(e.return, n, r);
  }
  function dd(e, n, r, l, d, h) {
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
  function Rg(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = Ut.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, J(Ut, x), ln(e, n, l, r), l = at ? gi : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Tg(e, r, n);
        else if (e.tag === 19)
          Tg(e, r, n);
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
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), dd(
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
        dd(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        dd(
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
  function fd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Fl(e)));
  }
  function vj(e, n, r) {
    switch (n.tag) {
      case 3:
        ve(n, n.stateNode.containerInfo), Xa(n, Ft, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        rt(n);
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
          return n.flags |= 128, $u(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? Cg(e, n, r) : (Wa(n), e = Ma(
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
            return Rg(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), J(Ut, Ut.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, xg(
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
  function _g(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Gt = !0;
      else {
        if (!fd(e, r) && (n.flags & 128) === 0)
          return Gt = !1, vj(
            e,
            n,
            r
          );
        Gt = (e.flags & 131072) !== 0;
      }
    else
      Gt = !1, at && (n.flags & 1048576) !== 0 && lp(n, gi, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = $r(n.elementType), n.type = e, typeof e == "function")
            vu(e) ? (l = Ir(e, l), n.tag = 1, n = Eg(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = sd(
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
                n.tag = 11, n = vg(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === ie) {
                n.tag = 14, n = yg(
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
        return sd(
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
        ), Eg(
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
          d = h.element, Du(e, n), Ei(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Ft, l), l !== h.cache && Cu(
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
              n = Ng(
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
              ), vi(d), n = Ng(
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
              for (Ct = Zn(e.firstChild), rn = n, at = !0, Pa = null, Xn = !0, r = xp(
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
        return co(e, n), e === null ? (r = Vv(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : at || (r = n.type, e = n.pendingProps, l = To(
          W.current
        ).createElement(r), l[Se] = n, l[we] = e, on(l, r, e), Et(l), n.stateNode = l) : n.memoizedState = Vv(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return rt(n), e === null && at && (l = n.stateNode = $v(
          n.type,
          n.pendingProps,
          W.current
        ), rn = n, Xn = !0, d = Ct, or(n.type) ? (Yd = d, Ct = Zn(l.firstChild)) : Ct = d), ln(
          e,
          n,
          n.pendingProps.children,
          r
        ), co(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && at && ((d = l = Ct) && (l = Pj(
          l,
          n.type,
          n.pendingProps,
          Xn
        ), l !== null ? (n.stateNode = l, rn = n, Ct = Zn(l.firstChild), Xn = !1, d = !0) : d = !1), d || Ka(n)), rt(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Vd(d, h) ? l = null : x !== null && Vd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = Bu(
          e,
          n,
          oj,
          null,
          null,
          r
        ), Fi._currentValue = d), co(e, n), ln(e, n, l, r), n.child;
      case 6:
        return e === null && at && ((e = r = Ct) && (r = Kj(
          r,
          n.pendingProps,
          Xn
        ), r !== null ? (n.stateNode = r, rn = n, Ct = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return Cg(e, n, r);
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
        return vg(
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
        return yg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return bg(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Rg(e, n, r);
      case 31:
        return gj(e, n, r);
      case 22:
        return xg(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = sn(Ft), e === null ? (d = _u(), d === null && (d = St, h = Tu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Au(n), Xa(n, Ft, d)) : ((e.lanes & r) !== 0 && (Du(e, n), Ei(n, null, null, r), ji()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Ft, l)) : (l = h.cache, Xa(n, Ft, l), l !== d.cache && Cu(
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
  function hd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (nv()) e.flags |= 8192;
        else
          throw Ur = Kl, Mu;
    } else e.flags &= -16777217;
  }
  function Mg(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Yv(n))
      if (nv()) e.flags |= 8192;
      else
        throw Ur = Kl, Mu;
  }
  function fo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Zt() : 536870912, e.lanes |= n, Rs |= n);
  }
  function Mi(e, n) {
    if (!at)
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
  function yj(e, n, r) {
    var l = n.pendingProps;
    switch (Su(n), n.tag) {
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
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ta(Ft), Te(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ps(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, ju())), Tt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Tt(n), Mg(n, h)) : (Tt(n), hd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Tt(n), Mg(n, h)) : (Tt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Tt(n), hd(
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
            return Tt(n), null;
          }
          e = G.current, ps(n) ? cp(n) : (e = $v(d, l, r), n.stateNode = e, Aa(n));
        }
        return Tt(n), null;
      case 5:
        if (Ee(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(i(166));
            return Tt(n), null;
          }
          if (h = G.current, ps(n))
            cp(n);
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
            h[Se] = n, h[we] = l;
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
        return Tt(n), hd(
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
            e[Se] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || Cv(e.nodeValue, r)), e || Ka(n, !0);
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
            r = ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
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
            d = ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Ln(n), n) : (Ln(n), null);
        }
        return Ln(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), fo(n, n.updateQueue), Tt(n), null);
      case 4:
        return Te(), e === null && Od(n.stateNode.containerInfo), Tt(n), null;
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
                    rp(r, e), r = r.sibling;
                  return J(
                    Ut,
                    Ut.current & 1 | 2
                  ), at && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && _t() > vo && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Jl(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, fo(n, e), Mi(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !at)
                return Tt(n), null;
            } else
              2 * _t() - l.renderingStartTime > vo && r !== 536870912 && (n.flags |= 128, d = !0, Mi(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = _t(), e.sibling = null, r = Ut.current, J(
          Ut,
          d ? r & 1 | 2 : r & 1
        ), at && Na(n, l.treeForkCount), e) : (Tt(n), null);
      case 22:
      case 23:
        return Ln(n), Lu(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Tt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Tt(n), r = n.updateQueue, r !== null && fo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && ne(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ta(Ft), Tt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function bj(e, n) {
    switch (Su(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ta(Ft), Te(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ee(n), null;
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
        return Te(), null;
      case 10:
        return Ta(n.type), null;
      case 22:
      case 23:
        return Ln(n), Lu(), e !== null && ne(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ta(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ag(e, n) {
    switch (Su(n), n.tag) {
      case 3:
        Ta(Ft), Te();
        break;
      case 26:
      case 27:
      case 5:
        Ee(n);
        break;
      case 4:
        Te();
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
        Ln(n), Lu(), e !== null && ne(Lr);
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
              } catch (fe) {
                mt(
                  d,
                  L,
                  fe
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (fe) {
      mt(n, n.return, fe);
    }
  }
  function Dg(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        wp(n, r);
      } catch (l) {
        mt(e, e.return, l);
      }
    }
  }
  function kg(e, n, r) {
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
  function zg(e) {
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
  function md(e, n, r) {
    try {
      var l = e.stateNode;
      Ij(l, e.type, r, n), l[we] = n;
    } catch (d) {
      mt(e, e.return, d);
    }
  }
  function Og(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function pd(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Og(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function gd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (gd(e, n, r), e = e.sibling; e !== null; )
        gd(e, n, r), e = e.sibling;
  }
  function ho(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (ho(e, n, r), e = e.sibling; e !== null; )
        ho(e, n, r), e = e.sibling;
  }
  function Lg(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      on(n, l, r), n[Se] = e, n[we] = r;
    } catch (h) {
      mt(e, e.return, h);
    }
  }
  var Da = !1, Pt = !1, vd = !1, $g = typeof WeakSet == "function" ? WeakSet : Set, en = null;
  function xj(e, n) {
    if (e = e.containerInfo, Ud = zo, e = Xm(e), uu(e)) {
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
            var x = 0, E = -1, L = -1, ae = 0, fe = 0, pe = e, se = null;
            t: for (; ; ) {
              for (var oe; pe !== r || d !== 0 && pe.nodeType !== 3 || (E = x + d), pe !== h || l !== 0 && pe.nodeType !== 3 || (L = x + l), pe.nodeType === 3 && (x += pe.nodeValue.length), (oe = pe.firstChild) !== null; )
                se = pe, pe = oe;
              for (; ; ) {
                if (pe === e) break t;
                if (se === r && ++ae === d && (E = x), se === h && ++fe === l && (L = x), (oe = pe.nextSibling) !== null) break;
                pe = se, se = pe.parentNode;
              }
              pe = oe;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Bd = { focusedElem: e, selectionRange: r }, zo = !1, en = n; en !== null; )
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
                  var Re = Ir(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Re,
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
                  Hd(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Hd(e);
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
  function Ug(e, n, r) {
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
        l & 64 && Dg(r), l & 512 && Di(r, r.return);
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
            wp(e, n);
          } catch (x) {
            mt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Lg(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && zg(r), l & 512 && Di(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Ig(e, r);
        break;
      case 13:
        za(e, r), l & 4 && Hg(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = _j.bind(
          null,
          r
        ), Xj(e, r))));
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
  function Bg(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Bg(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && xt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var At = null, Sn = !1;
  function ka(e, n, r) {
    for (r = r.child; r !== null; )
      Vg(e, n, r), r = r.sibling;
  }
  function Vg(e, n, r) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function")
      try {
        Ce.onCommitFiberUnmount(Oe, r);
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
        var l = At, d = Sn;
        or(r.type) && (At = r.stateNode, Sn = !1), ka(
          e,
          n,
          r
        ), Ii(r.stateNode), At = l, Sn = d;
        break;
      case 5:
        Pt || ga(r, n);
      case 6:
        if (l = At, d = Sn, At = null, ka(
          e,
          n,
          r
        ), At = l, Sn = d, At !== null)
          if (Sn)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(r.stateNode);
            } catch (h) {
              mt(
                r,
                n,
                h
              );
            }
          else
            try {
              At.removeChild(r.stateNode);
            } catch (h) {
              mt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        At !== null && (Sn ? (e = At, Dv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Ls(e)) : Dv(At, r.stateNode));
        break;
      case 4:
        l = At, d = Sn, At = r.stateNode.containerInfo, Sn = !0, ka(
          e,
          n,
          r
        ), At = l, Sn = d;
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
        Pt || (ga(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && kg(
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
  function Ig(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ls(e);
      } catch (r) {
        mt(n, n.return, r);
      }
    }
  }
  function Hg(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ls(e);
      } catch (r) {
        mt(n, n.return, r);
      }
  }
  function Sj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new $g()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new $g()), n;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function mo(e, n) {
    var r = Sj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = Mj.bind(null, e, l);
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
                At = E.stateNode, Sn = !1;
                break e;
              }
              break;
            case 5:
              At = E.stateNode, Sn = !1;
              break e;
            case 3:
            case 4:
              At = E.stateNode.containerInfo, Sn = !0;
              break e;
          }
          E = E.return;
        }
        if (At === null) throw Error(i(160));
        Vg(h, x, d), At = null, Sn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        qg(n, e), n = n.sibling;
  }
  var la = null;
  function qg(e, n) {
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
                      h = d.getElementsByTagName("title")[0], (!h || h[Ke] || h[Se] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), on(h, l, r), h[Se] = e, Et(h), l = h;
                      break e;
                    case "link":
                      var x = qv(
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
                      if (x = qv(
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
                Fv(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Hv(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Fv(
              d,
              e.type,
              e.stateNode
            ) : Hv(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && md(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        wn(n, e), jn(e), l & 512 && (Pt || r === null || ga(r, r.return)), r !== null && l & 4 && md(
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
          } catch (Re) {
            mt(e, e.return, Re);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, md(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (vd = !0);
        break;
      case 6:
        if (wn(n, e), jn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Re) {
            mt(e, e.return, Re);
          }
        }
        break;
      case 3:
        if (Mo = null, d = la, la = Ro(n.containerInfo), wn(n, e), la = d, jn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Ls(n.containerInfo);
          } catch (Re) {
            mt(e, e.return, Re);
          }
        vd && (vd = !1, Fg(e));
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
        wn(n, e), jn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (go = _t()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, ae = Da, fe = Pt;
        if (Da = ae || d, Pt = fe || L, wn(n, e), Pt = fe, Da = ae, jn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Da || Pt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var pe = L.memoizedProps.style, se = pe != null && pe.hasOwnProperty("display") ? pe.display : null;
                    E.style.display = se == null || typeof se == "boolean" ? "" : ("" + se).trim();
                  }
                } catch (Re) {
                  mt(L, L.return, Re);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Re) {
                  mt(L, L.return, Re);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var oe = L.stateNode;
                  d ? kv(oe, !0) : kv(L.stateNode, !1);
                } catch (Re) {
                  mt(L, L.return, Re);
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
          if (Og(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(i(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = pd(e);
            ho(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ss(x, ""), r.flags &= -33);
            var E = pd(e);
            ho(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, ae = pd(e);
            gd(
              e,
              ae,
              L
            );
            break;
          default:
            throw Error(i(161));
        }
      } catch (fe) {
        mt(e, e.return, fe);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Fg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Fg(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ug(e, n.alternate, n), n = n.sibling;
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
          typeof r.componentWillUnmount == "function" && kg(
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
                  Sp(L[d], E);
            } catch (ae) {
              mt(l, l.return, ae);
            }
          }
          r && x & 64 && Dg(h), Di(h, h.return);
          break;
        case 27:
          Lg(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && zg(h), Di(h, h.return);
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
          ), r && x & 4 && Ig(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && Hg(d, h);
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
  function yd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && yi(r));
  }
  function bd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && yi(e));
  }
  function oa(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Yg(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Yg(e, n, r, l) {
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
        )), d & 2048 && yd(x, n);
        break;
      case 24:
        oa(
          e,
          n,
          r,
          l
        ), d & 2048 && bd(n.alternate, n);
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
          var fe = x.stateNode;
          x.memoizedState !== null ? fe._visibility & 2 ? Ns(
            h,
            x,
            E,
            L,
            d
          ) : ki(
            h,
            x
          ) : (fe._visibility |= 2, Ns(
            h,
            x,
            E,
            L,
            d
          )), d && ae & 2048 && yd(
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
          ), d && ae & 2048 && bd(x.alternate, x);
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
            ki(r, l), d & 2048 && yd(
              l.alternate,
              l
            );
            break;
          case 24:
            ki(r, l), d & 2048 && bd(l.alternate, l);
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
        Gg(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Gg(e, n, r) {
    switch (e.tag) {
      case 26:
        Cs(
          e,
          n,
          r
        ), e.flags & zi && e.memoizedState !== null && lE(
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
  function Pg(e) {
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
          en = l, Xg(
            l,
            e
          );
        }
      Pg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Kg(e), e = e.sibling;
  }
  function Kg(e) {
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
          en = l, Xg(
            l,
            e
          );
        }
      Pg(e);
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
  function Xg(e, n) {
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
          if (Bg(l), l === r) {
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
  var wj = {
    getCacheForType: function(e) {
      var n = sn(Ft), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return sn(Ft).controller.signal;
    }
  }, jj = typeof WeakMap == "function" ? WeakMap : Map, ut = 0, St = null, We = null, tt = 0, ht = 0, $n = null, nr = !1, Ts = !1, xd = !1, La = 0, Lt = 0, ar = 0, qr = 0, Sd = 0, Un = 0, Rs = 0, Li = null, En = null, wd = !1, go = 0, Qg = 0, vo = 1 / 0, yo = null, rr = null, Jt = 0, sr = null, _s = null, $a = 0, jd = 0, Ed = null, Zg = null, $i = 0, Nd = null;
  function Bn() {
    return (ut & 2) !== 0 && tt !== 0 ? tt & -tt : k.T !== null ? Ad() : ge();
  }
  function Jg() {
    if (Un === 0)
      if ((tt & 536870912) === 0 || at) {
        var e = nn;
        nn <<= 1, (nn & 3932160) === 0 && (nn = 262144), Un = e;
      } else Un = 536870912;
    return e = On.current, e !== null && (e.flags |= 32), Un;
  }
  function Nn(e, n, r) {
    (e === St && (ht === 2 || ht === 9) || e.cancelPendingCommit !== null) && (Ms(e, 0), ir(
      e,
      tt,
      Un,
      !1
    )), pt(e, r), ((ut & 2) === 0 || e !== St) && (e === St && ((ut & 2) === 0 && (qr |= r), Lt === 4 && ir(
      e,
      tt,
      Un,
      !1
    )), va(e));
  }
  function Wg(e, n, r) {
    if ((ut & 6) !== 0) throw Error(i(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ct(e, n), d = l ? Cj(e, n) : Td(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ts && !l && ir(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !Ej(r)) {
          d = Td(e, n, !1), h = !1;
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
              if (L && (Ms(E, x).flags |= 256), x = Td(
                E,
                x,
                !1
              ), x !== 2) {
                if (xd && !L) {
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
          if ((n & 62914560) === n && (d = go + 300 - _t(), 10 < d)) {
            if (ir(
              l,
              n,
              Un,
              !nr
            ), Ue(l, 0, !0) !== 0) break e;
            $a = n, l.timeoutHandle = Mv(
              ev.bind(
                null,
                l,
                r,
                En,
                yo,
                wd,
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
          ev(
            l,
            r,
            En,
            yo,
            wd,
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
  function ev(e, n, r, l, d, h, x, E, L, ae, fe, pe, se, oe) {
    if (e.timeoutHandle = -1, pe = n.subtreeFlags, pe & 8192 || (pe & 16785408) === 16785408) {
      pe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wa
      }, Gg(
        n,
        h,
        pe
      );
      var Re = (h & 62914560) === h ? go - _t() : (h & 4194048) === h ? Qg - _t() : 0;
      if (Re = oE(
        pe,
        Re
      ), Re !== null) {
        $a = h, e.cancelPendingCommit = Re(
          ov.bind(
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
            fe,
            pe,
            null,
            se,
            oe
          )
        ), ir(e, h, x, !ae);
        return;
      }
    }
    ov(
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
  function Ej(e) {
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
    n &= ~Sd, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - He(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && Sa(e, r, n);
  }
  function bo() {
    return (ut & 6) === 0 ? (Ui(0), !1) : !0;
  }
  function Cd() {
    if (We !== null) {
      if (ht === 0)
        var e = We.return;
      else
        e = We, Ca = zr = null, Hu(e), xs = null, xi = 0, e = We;
      for (; e !== null; )
        Ag(e.alternate, e), e = e.return;
      We = null;
    }
  }
  function Ms(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Fj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), $a = 0, Cd(), St = e, We = r = Ea(e.current, null), tt = n, ht = 0, $n = null, nr = !1, Ts = ct(e, n), xd = !1, Rs = Un = Sd = qr = ar = Lt = 0, En = Li = null, wd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - He(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Bl(), r;
  }
  function tv(e, n) {
    Ye = null, k.H = Ri, n === bs || n === Pl ? (n = vp(), ht = 3) : n === Mu ? (n = vp(), ht = 4) : ht = n === rd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, $n = n, We === null && (Lt = 1, lo(
      e,
      Gn(n, e.current)
    ));
  }
  function nv() {
    var e = On.current;
    return e === null ? !0 : (tt & 4194048) === tt ? Qn === null : (tt & 62914560) === tt || (tt & 536870912) !== 0 ? e === Qn : !1;
  }
  function av() {
    var e = k.H;
    return k.H = Ri, e === null ? Ri : e;
  }
  function rv() {
    var e = k.A;
    return k.A = wj, e;
  }
  function xo() {
    Lt = 4, nr || (tt & 4194048) !== tt && On.current !== null || (Ts = !0), (ar & 134217727) === 0 && (qr & 134217727) === 0 || St === null || ir(
      St,
      tt,
      Un,
      !1
    );
  }
  function Td(e, n, r) {
    var l = ut;
    ut |= 2;
    var d = av(), h = rv();
    (St !== e || tt !== n) && (yo = null, Ms(e, n)), n = !1;
    var x = Lt;
    e: do
      try {
        if (ht !== 0 && We !== null) {
          var E = We, L = $n;
          switch (ht) {
            case 8:
              Cd(), x = 6;
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
        Nj(), x = Lt;
        break;
      } catch (fe) {
        tv(e, fe);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ca = zr = null, ut = l, k.H = d, k.A = h, We === null && (St = null, tt = 0, Bl()), x;
  }
  function Nj() {
    for (; We !== null; ) sv(We);
  }
  function Cj(e, n) {
    var r = ut;
    ut |= 2;
    var l = av(), d = rv();
    St !== e || tt !== n ? (yo = null, vo = _t() + 500, Ms(e, n)) : Ts = ct(
      e,
      n
    );
    e: do
      try {
        if (ht !== 0 && We !== null) {
          n = We;
          var h = $n;
          t: switch (ht) {
            case 1:
              ht = 0, $n = null, As(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (pp(h)) {
                ht = 0, $n = null, iv(n);
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
              pp(h) ? (ht = 0, $n = null, iv(n)) : (ht = 0, $n = null, As(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (We.tag) {
                case 26:
                  x = We.memoizedState;
                case 5:
                case 27:
                  var E = We;
                  if (x ? Yv(x) : E.stateNode.complete) {
                    ht = 0, $n = null;
                    var L = E.sibling;
                    if (L !== null) We = L;
                    else {
                      var ae = E.return;
                      ae !== null ? (We = ae, So(ae)) : We = null;
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
              Cd(), Lt = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        Tj();
        break;
      } catch (fe) {
        tv(e, fe);
      }
    while (!0);
    return Ca = zr = null, k.H = l, k.A = d, ut = r, We !== null ? 0 : (St = null, tt = 0, Bl(), Lt);
  }
  function Tj() {
    for (; We !== null && !Rt(); )
      sv(We);
  }
  function sv(e) {
    var n = _g(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? So(e) : We = n;
  }
  function iv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = jg(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          tt
        );
        break;
      case 11:
        n = jg(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          tt
        );
        break;
      case 5:
        Hu(n);
      default:
        Ag(r, n), n = We = rp(n, La), n = _g(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? So(e) : We = n;
  }
  function As(e, n, r, l) {
    Ca = zr = null, Hu(n), xs = null, xi = 0;
    var d = n.return;
    try {
      if (pj(
        e,
        d,
        n,
        r,
        tt
      )) {
        Lt = 1, lo(
          e,
          Gn(r, e.current)
        ), We = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw We = d, h;
      Lt = 1, lo(
        e,
        Gn(r, e.current)
      ), We = null;
      return;
    }
    n.flags & 32768 ? (at || l === 1 ? e = !0 : Ts || (tt & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = On.current, l !== null && l.tag === 13 && (l.flags |= 16384))), lv(n, e)) : So(n);
  }
  function So(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        lv(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = yj(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        We = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        We = n;
        return;
      }
      We = n = e;
    } while (n !== null);
    Lt === 0 && (Lt = 5);
  }
  function lv(e, n) {
    do {
      var r = bj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, We = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        We = e;
        return;
      }
      We = e = r;
    } while (e !== null);
    Lt = 6, We = null;
  }
  function ov(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      wo();
    while (Jt !== 0);
    if ((ut & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === e.current) throw Error(i(177));
      if (h = n.lanes | n.childLanes, h |= pu, an(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === St && (We = St = null, tt = 0), _s = n, sr = e, $a = r, jd = h, Ed = d, Zg = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Aj(ze, function() {
        return hv(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null, d = $.p, $.p = 2, x = ut, ut |= 4;
        try {
          xj(e, n, r);
        } finally {
          ut = x, $.p = d, k.T = l;
        }
      }
      Jt = 1, cv(), uv(), dv();
    }
  }
  function cv() {
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
          qg(n, e);
          var h = Bd, x = Xm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Km(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && uu(E)) {
              var ae = L.start, fe = L.end;
              if (fe === void 0 && (fe = ae), "selectionStart" in E)
                E.selectionStart = ae, E.selectionEnd = Math.min(
                  fe,
                  E.value.length
                );
              else {
                var pe = E.ownerDocument || document, se = pe && pe.defaultView || window;
                if (se.getSelection) {
                  var oe = se.getSelection(), Re = E.textContent.length, Be = Math.min(L.start, Re), bt = L.end === void 0 ? Be : Math.min(L.end, Re);
                  !oe.extend && Be > bt && (x = bt, bt = Be, Be = x);
                  var K = Pm(
                    E,
                    Be
                  ), B = Pm(
                    E,
                    bt
                  );
                  if (K && B && (oe.rangeCount !== 1 || oe.anchorNode !== K.node || oe.anchorOffset !== K.offset || oe.focusNode !== B.node || oe.focusOffset !== B.offset)) {
                    var ee = pe.createRange();
                    ee.setStart(K.node, K.offset), oe.removeAllRanges(), Be > bt ? (oe.addRange(ee), oe.extend(B.node, B.offset)) : (ee.setEnd(B.node, B.offset), oe.addRange(ee));
                  }
                }
              }
            }
            for (pe = [], oe = E; oe = oe.parentNode; )
              oe.nodeType === 1 && pe.push({
                element: oe,
                left: oe.scrollLeft,
                top: oe.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < pe.length; E++) {
              var me = pe[E];
              me.element.scrollLeft = me.left, me.element.scrollTop = me.top;
            }
          }
          zo = !!Ud, Bd = Ud = null;
        } finally {
          ut = d, $.p = l, k.T = r;
        }
      }
      e.current = n, Jt = 2;
    }
  }
  function uv() {
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
          Ug(e, n.alternate, n);
        } finally {
          ut = d, $.p = l, k.T = r;
        }
      }
      Jt = 3;
    }
  }
  function dv() {
    if (Jt === 4 || Jt === 3) {
      Jt = 0, tn();
      var e = sr, n = _s, r = $a, l = Zg;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Jt = 5 : (Jt = 0, _s = sr = null, fv(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, Ce && typeof Ce.onCommitFiberRoot == "function")
        try {
          Ce.onCommitFiberRoot(
            Oe,
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
      ($a & 3) !== 0 && wo(), va(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Nd ? $i++ : ($i = 0, Nd = e) : $i = 0, Ui(0);
    }
  }
  function fv(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, yi(n)));
  }
  function wo() {
    return cv(), uv(), dv(), hv();
  }
  function hv() {
    if (Jt !== 5) return !1;
    var e = sr, n = jd;
    jd = 0;
    var r = Z($a), l = k.T, d = $.p;
    try {
      $.p = 32 > r ? 32 : r, k.T = null, r = Ed, Ed = null;
      var h = sr, x = $a;
      if (Jt = 0, _s = sr = null, $a = 0, (ut & 6) !== 0) throw Error(i(331));
      var E = ut;
      if (ut |= 4, Kg(h.current), Yg(
        h,
        h.current,
        x,
        r
      ), ut = E, Ui(0, !1), Ce && typeof Ce.onPostCommitFiberRoot == "function")
        try {
          Ce.onPostCommitFiberRoot(Oe, h);
        } catch {
        }
      return !0;
    } finally {
      $.p = d, k.T = l, fv(e, n);
    }
  }
  function mv(e, n, r) {
    n = Gn(r, n), n = ad(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (pt(e, 2), va(e));
  }
  function mt(e, n, r) {
    if (e.tag === 3)
      mv(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          mv(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Gn(r, e), r = pg(2), l = Ja(n, r, 2), l !== null && (gg(
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
  function Rd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new jj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (xd = !0, d.add(r), e = Rj.bind(null, e, n, r), n.then(e, e));
  }
  function Rj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, St === e && (tt & r) === r && (Lt === 4 || Lt === 3 && (tt & 62914560) === tt && 300 > _t() - go ? (ut & 2) === 0 && Ms(e, 0) : Sd |= r, Rs === tt && (Rs = 0)), va(e);
  }
  function pv(e, n) {
    n === 0 && (n = Zt()), e = Ar(e, n), e !== null && (pt(e, n), va(e));
  }
  function _j(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), pv(e, r);
  }
  function Mj(e, n) {
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
    l !== null && l.delete(n), pv(e, r);
  }
  function Aj(e, n) {
    return Qt(e, n);
  }
  var jo = null, Ds = null, _d = !1, Eo = !1, Md = !1, lr = 0;
  function va(e) {
    e !== Ds && e.next === null && (Ds === null ? jo = Ds = e : Ds = Ds.next = e), Eo = !0, _d || (_d = !0, kj());
  }
  function Ui(e, n) {
    if (!Md && Eo) {
      Md = !0;
      do
        for (var r = !1, l = jo; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - He(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, bv(l, h));
          } else
            h = tt, h = Ue(
              l,
              l === St ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || ct(l, h) || (r = !0, bv(l, h));
          l = l.next;
        }
      while (r);
      Md = !1;
    }
  }
  function Dj() {
    gv();
  }
  function gv() {
    Eo = _d = !1;
    var e = 0;
    lr !== 0 && qj() && (e = lr);
    for (var n = _t(), r = null, l = jo; l !== null; ) {
      var d = l.next, h = vv(l, n);
      h === 0 ? (l.next = null, r === null ? jo = d : r.next = d, d === null && (Ds = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Eo = !0)), l = d;
    }
    Jt !== 0 && Jt !== 5 || Ui(e), lr !== 0 && (lr = 0);
  }
  function vv(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - He(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = zt(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = St, r = tt, r = Ue(
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
          r = ye;
          break;
        case 32:
          r = ze;
          break;
        case 268435456:
          r = st;
          break;
        default:
          r = ze;
      }
      return l = yv.bind(null, e), r = Qt(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && un(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function yv(e, n) {
    if (Jt !== 0 && Jt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (wo() && e.callbackNode !== r)
      return null;
    var l = tt;
    return l = Ue(
      e,
      e === St ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Wg(e, l, n), vv(e, _t()), e.callbackNode != null && e.callbackNode === r ? yv.bind(null, e) : null);
  }
  function bv(e, n) {
    if (wo()) return null;
    Wg(e, n, !0);
  }
  function kj() {
    Yj(function() {
      (ut & 6) !== 0 ? Qt(
        ce,
        Dj
      ) : gv();
    });
  }
  function Ad() {
    if (lr === 0) {
      var e = vs;
      e === 0 && (e = qn, qn <<= 1, (qn & 261888) === 0 && (qn = 256)), lr = e;
    }
    return lr;
  }
  function xv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Al("" + e);
  }
  function Sv(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function zj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = xv(
        (d[we] || null).action
      ), x = l.submitter;
      x && (n = (n = x[we] || null) ? xv(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
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
                  var L = x ? Sv(d, x) : new FormData(d);
                  Zu(
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
                typeof h == "function" && (E.preventDefault(), L = x ? Sv(d, x) : new FormData(d), Zu(
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
  for (var Dd = 0; Dd < mu.length; Dd++) {
    var kd = mu[Dd], Oj = kd.toLowerCase(), Lj = kd[0].toUpperCase() + kd.slice(1);
    ia(
      Oj,
      "on" + Lj
    );
  }
  ia(Jm, "onAnimationEnd"), ia(Wm, "onAnimationIteration"), ia(ep, "onAnimationStart"), ia("dblclick", "onDoubleClick"), ia("focusin", "onFocus"), ia("focusout", "onBlur"), ia(Jw, "onTransitionRun"), ia(Ww, "onTransitionStart"), ia(ej, "onTransitionCancel"), ia(tp, "onTransitionEnd"), fa("onMouseEnter", ["mouseout", "mouseover"]), fa("onMouseLeave", ["mouseout", "mouseover"]), fa("onPointerEnter", ["pointerout", "pointerover"]), fa("onPointerLeave", ["pointerout", "pointerover"]), Wt(
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
  ), $j = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bi)
  );
  function wv(e, n) {
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
            } catch (fe) {
              Ul(fe);
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
            } catch (fe) {
              Ul(fe);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function et(e, n) {
    var r = n[Ne];
    r === void 0 && (r = n[Ne] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (jv(n, e, 2, !1), r.add(l));
  }
  function zd(e, n, r) {
    var l = 0;
    n && (l |= 4), jv(
      r,
      e,
      l,
      n
    );
  }
  var No = "_reactListening" + Math.random().toString(36).slice(2);
  function Od(e) {
    if (!e[No]) {
      e[No] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && ($j.has(r) || zd(r, !1, e), zd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[No] || (n[No] = !0, zd("selectionchange", !1, n));
    }
  }
  function jv(e, n, r, l) {
    switch (Jv(n)) {
      case 2:
        var d = dE;
        break;
      case 8:
        d = fE;
        break;
      default:
        d = Qd;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !tu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Ld(e, n, r, l, d) {
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
    Rm(function() {
      var ae = h, fe = Wc(r), pe = [];
      e: {
        var se = np.get(e);
        if (se !== void 0) {
          var oe = Ol, Re = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Mw;
              break;
            case "focusin":
              Re = "focus", oe = su;
              break;
            case "focusout":
              Re = "blur", oe = su;
              break;
            case "beforeblur":
            case "afterblur":
              oe = su;
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
              oe = Am;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = yw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = kw;
              break;
            case Jm:
            case Wm:
            case ep:
              oe = Sw;
              break;
            case tp:
              oe = Ow;
              break;
            case "scroll":
            case "scrollend":
              oe = gw;
              break;
            case "wheel":
              oe = $w;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = jw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = km;
              break;
            case "toggle":
            case "beforetoggle":
              oe = Bw;
          }
          var Be = (n & 4) !== 0, bt = !Be && (e === "scroll" || e === "scrollend"), K = Be ? se !== null ? se + "Capture" : null : se;
          Be = [];
          for (var B = ae, ee; B !== null; ) {
            var me = B;
            if (ee = me.stateNode, me = me.tag, me !== 5 && me !== 26 && me !== 27 || ee === null || K === null || (me = li(B, K), me != null && Be.push(
              Vi(B, me, ee)
            )), bt) break;
            B = B.return;
          }
          0 < Be.length && (se = new oe(
            se,
            Re,
            null,
            r,
            fe
          ), pe.push({ event: se, listeners: Be }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (se = e === "mouseover" || e === "pointerover", oe = e === "mouseout" || e === "pointerout", se && r !== Jc && (Re = r.relatedTarget || r.fromElement) && (gt(Re) || Re[Ae]))
            break e;
          if ((oe || se) && (se = fe.window === fe ? fe : (se = fe.ownerDocument) ? se.defaultView || se.parentWindow : window, oe ? (Re = r.relatedTarget || r.toElement, oe = ae, Re = Re ? gt(Re) : null, Re !== null && (bt = u(Re), Be = Re.tag, Re !== bt || Be !== 5 && Be !== 27 && Be !== 6) && (Re = null)) : (oe = null, Re = ae), oe !== Re)) {
            if (Be = Am, me = "onMouseLeave", K = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Be = km, me = "onPointerLeave", K = "onPointerEnter", B = "pointer"), bt = oe == null ? se : Je(oe), ee = Re == null ? se : Je(Re), se = new Be(
              me,
              B + "leave",
              oe,
              r,
              fe
            ), se.target = bt, se.relatedTarget = ee, me = null, gt(fe) === ae && (Be = new Be(
              K,
              B + "enter",
              Re,
              r,
              fe
            ), Be.target = ee, Be.relatedTarget = bt, me = Be), bt = me, oe && Re)
              t: {
                for (Be = Uj, K = oe, B = Re, ee = 0, me = K; me; me = Be(me))
                  ee++;
                me = 0;
                for (var Le = B; Le; Le = Be(Le))
                  me++;
                for (; 0 < ee - me; )
                  K = Be(K), ee--;
                for (; 0 < me - ee; )
                  B = Be(B), me--;
                for (; ee--; ) {
                  if (K === B || B !== null && K === B.alternate) {
                    Be = K;
                    break t;
                  }
                  K = Be(K), B = Be(B);
                }
                Be = null;
              }
            else Be = null;
            oe !== null && Ev(
              pe,
              se,
              oe,
              Be,
              !1
            ), Re !== null && bt !== null && Ev(
              pe,
              bt,
              Re,
              Be,
              !0
            );
          }
        }
        e: {
          if (se = ae ? Je(ae) : window, oe = se.nodeName && se.nodeName.toLowerCase(), oe === "select" || oe === "input" && se.type === "file")
            var lt = Im;
          else if (Bm(se))
            if (Hm)
              lt = Xw;
            else {
              lt = Pw;
              var De = Gw;
            }
          else
            oe = se.nodeName, !oe || oe.toLowerCase() !== "input" || se.type !== "checkbox" && se.type !== "radio" ? ae && Zc(ae.elementType) && (lt = Im) : lt = Kw;
          if (lt && (lt = lt(e, ae))) {
            Vm(
              pe,
              lt,
              r,
              fe
            );
            break e;
          }
          De && De(e, se, ae), e === "focusout" && ae && se.type === "number" && ae.memoizedProps.value != null && Qc(se, "number", se.value);
        }
        switch (De = ae ? Je(ae) : window, e) {
          case "focusin":
            (Bm(De) || De.contentEditable === "true") && (cs = De, du = ae, pi = null);
            break;
          case "focusout":
            pi = du = cs = null;
            break;
          case "mousedown":
            fu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            fu = !1, Qm(pe, r, fe);
            break;
          case "selectionchange":
            if (Zw) break;
          case "keydown":
          case "keyup":
            Qm(pe, r, fe);
        }
        var Ge;
        if (lu)
          e: {
            switch (e) {
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
          os ? $m(e, r) && (nt = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (nt = "onCompositionStart");
        nt && (zm && r.locale !== "ko" && (os || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && os && (Ge = _m()) : (Ya = fe, nu = "value" in Ya ? Ya.value : Ya.textContent, os = !0)), De = Co(ae, nt), 0 < De.length && (nt = new Dm(
          nt,
          e,
          null,
          r,
          fe
        ), pe.push({ event: nt, listeners: De }), Ge ? nt.data = Ge : (Ge = Um(r), Ge !== null && (nt.data = Ge)))), (Ge = Iw ? Hw(e, r) : qw(e, r)) && (nt = Co(ae, "onBeforeInput"), 0 < nt.length && (De = new Dm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          fe
        ), pe.push({
          event: De,
          listeners: nt
        }), De.data = Ge)), zj(
          pe,
          e,
          ae,
          r,
          fe
        );
      }
      wv(pe, n);
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
  function Uj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ev(e, n, r, l, d) {
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
  var Bj = /\r\n?/g, Vj = /\u0000|\uFFFD/g;
  function Nv(e) {
    return (typeof e == "string" ? e : "" + e).replace(Bj, `
`).replace(Vj, "");
  }
  function Cv(e, n) {
    return n = Nv(n), Nv(e) === n;
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
        Cm(e, l, h);
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
        l != null && et("scroll", e);
        break;
      case "onScrollEnd":
        l != null && et("scrollend", e);
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
        et("beforetoggle", e), et("toggle", e), Xe(e, "popover", l);
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
        Xe(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = mw.get(r) || r, Xe(e, r, l));
    }
  }
  function $d(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        Cm(e, l, h);
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
        l != null && et("scroll", e);
        break;
      case "onScrollEnd":
        l != null && et("scrollend", e);
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
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[we] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : Xe(e, r, l);
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
        et("error", e), et("load", e);
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
        et("invalid", e);
        var E = h = x = d = null, L = null, ae = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var fe = r[l];
            if (fe != null)
              switch (l) {
                case "name":
                  d = fe;
                  break;
                case "type":
                  x = fe;
                  break;
                case "checked":
                  L = fe;
                  break;
                case "defaultChecked":
                  ae = fe;
                  break;
                case "value":
                  h = fe;
                  break;
                case "defaultValue":
                  E = fe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (fe != null)
                    throw Error(i(137, n));
                  break;
                default:
                  yt(e, n, l, fe, r, null);
              }
          }
        wm(
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
        et("invalid", e), l = x = h = null;
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
        et("invalid", e), h = d = l = null;
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
        Em(e, l, d, h);
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
        et("beforetoggle", e), et("toggle", e), et("cancel", e), et("close", e);
        break;
      case "iframe":
      case "object":
        et("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bi.length; l++)
          et(Bi[l], e);
        break;
      case "image":
        et("error", e), et("load", e);
        break;
      case "details":
        et("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        et("error", e), et("load", e);
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
        if (Zc(n)) {
          for (fe in r)
            r.hasOwnProperty(fe) && (l = r[fe], l !== void 0 && $d(
              e,
              n,
              fe,
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
  function Ij(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, ae = null, fe = null;
        for (oe in r) {
          var pe = r[oe];
          if (r.hasOwnProperty(oe) && pe != null)
            switch (oe) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = pe;
              default:
                l.hasOwnProperty(oe) || yt(e, n, oe, null, l, pe);
            }
        }
        for (var se in l) {
          var oe = l[se];
          if (pe = r[se], l.hasOwnProperty(se) && (oe != null || pe != null))
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
                fe = oe;
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
                oe !== pe && yt(
                  e,
                  n,
                  se,
                  oe,
                  l,
                  pe
                );
            }
        }
        Xc(
          e,
          x,
          E,
          L,
          ae,
          fe,
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
        jm(e, se, oe);
        return;
      case "option":
        for (var Re in r)
          if (se = r[Re], r.hasOwnProperty(Re) && se != null && !l.hasOwnProperty(Re))
            switch (Re) {
              case "selected":
                e.selected = !1;
                break;
              default:
                yt(
                  e,
                  n,
                  Re,
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
        if (Zc(n)) {
          for (var bt in r)
            se = r[bt], r.hasOwnProperty(bt) && se !== void 0 && !l.hasOwnProperty(bt) && $d(
              e,
              n,
              bt,
              void 0,
              l,
              se
            );
          for (fe in l)
            se = l[fe], oe = r[fe], !l.hasOwnProperty(fe) || se === oe || se === void 0 && oe === void 0 || $d(
              e,
              n,
              fe,
              se,
              l,
              oe
            );
          return;
        }
    }
    for (var K in r)
      se = r[K], r.hasOwnProperty(K) && se != null && !l.hasOwnProperty(K) && yt(e, n, K, null, l, se);
    for (pe in l)
      se = l[pe], oe = r[pe], !l.hasOwnProperty(pe) || se === oe || se == null && oe == null || yt(e, n, pe, se, l, oe);
  }
  function Tv(e) {
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
  function Hj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Tv(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], ae = L.startTime;
            if (ae > E) break;
            var fe = L.transferSize, pe = L.initiatorType;
            fe && Tv(pe) && (L = L.responseEnd, x += fe * (L < E ? 1 : (E - ae) / (L - ae)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ud = null, Bd = null;
  function To(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Rv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _v(e, n) {
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
  function Vd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Id = null;
  function qj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Id ? !1 : (Id = e, !0) : (Id = null, !1);
  }
  var Mv = typeof setTimeout == "function" ? setTimeout : void 0, Fj = typeof clearTimeout == "function" ? clearTimeout : void 0, Av = typeof Promise == "function" ? Promise : void 0, Yj = typeof queueMicrotask == "function" ? queueMicrotask : typeof Av < "u" ? function(e) {
    return Av.resolve(null).then(e).catch(Gj);
  } : Mv;
  function Gj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function Dv(e, n) {
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
            h[Ke] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Ii(e.ownerDocument.body);
      r = d;
    } while (r);
    Ls(n);
  }
  function kv(e, n) {
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
  function Hd(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hd(r), xt(r);
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
  function Pj(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ke])
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
  function Kj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function zv(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Zn(e.nextSibling), e === null)) return null;
    return e;
  }
  function qd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Fd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Xj(e, n) {
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
  var Yd = null;
  function Ov(e) {
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
  function Lv(e) {
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
  function $v(e, n, r) {
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
  var Jn = /* @__PURE__ */ new Map(), Uv = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ua = $.d;
  $.d = {
    f: Qj,
    r: Zj,
    D: Jj,
    C: Wj,
    L: eE,
    m: tE,
    X: aE,
    S: nE,
    M: rE
  };
  function Qj() {
    var e = Ua.f(), n = bo();
    return e || n;
  }
  function Zj(e) {
    var n = Mt(e);
    n !== null && n.tag === 5 && n.type === "form" ? tg(n) : Ua.r(e);
  }
  var ks = typeof document > "u" ? null : document;
  function Bv(e, n, r) {
    var l = ks;
    if (l && typeof n == "string" && n) {
      var d = Fn(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Uv.has(d) || (Uv.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), on(n, "link", e), Et(n), l.head.appendChild(n)));
    }
  }
  function Jj(e) {
    Ua.D(e), Bv("dns-prefetch", e, null);
  }
  function Wj(e, n) {
    Ua.C(e, n), Bv("preconnect", e, n);
  }
  function eE(e, n, r) {
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
      Jn.has(h) || (e = g(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Jn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(Hi(h)) || n === "script" && l.querySelector(qi(h)) || (n = l.createElement("link"), on(n, "link", e), Et(n), l.head.appendChild(n)));
    }
  }
  function tE(e, n) {
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
      if (!Jn.has(h) && (e = g({ rel: "modulepreload", href: e }, n), Jn.set(h, e), r.querySelector(d) === null)) {
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
  function nE(e, n, r) {
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
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Jn.get(h)) && Gd(e, r);
          var L = x = l.createElement("link");
          Et(L), on(L, "link", e), L._p = new Promise(function(ae, fe) {
            L.onload = ae, L.onerror = fe;
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
  function aE(e, n) {
    Ua.X(e, n);
    var r = ks;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = g({ src: e, async: !0 }, n), (n = Jn.get(d)) && Pd(e, n), h = r.createElement("script"), Et(h), on(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function rE(e, n) {
    Ua.M(e, n);
    var r = ks;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Os(e), h = l.get(d);
      h || (h = r.querySelector(qi(d)), h || (e = g({ src: e, async: !0, type: "module" }, n), (n = Jn.get(d)) && Pd(e, n), h = r.createElement("script"), Et(h), on(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Vv(e, n, r, l) {
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
          }, Jn.set(e, r), h || sE(
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
  function Iv(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function sE(e, n, r, l) {
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
  function Hv(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Fn(r.href) + '"]'
          );
          if (l)
            return n.instance = l, Et(l), l;
          var d = g({}, r, {
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
          l = Iv(r), (d = Jn.get(d)) && Gd(l, d), h = (e.ownerDocument || e).createElement("link"), Et(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), on(h, "link", l), n.state.loading |= 4, _o(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Os(r.src), (d = e.querySelector(
            qi(h)
          )) ? (n.instance = d, Et(d), d) : (l = r, (d = Jn.get(h)) && (l = g({}, r), Pd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), Et(d), on(d, "link", l), e.head.appendChild(d), n.instance = d);
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
  function Gd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Pd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Mo = null;
  function qv(e, n, r) {
    if (Mo === null) {
      var l = /* @__PURE__ */ new Map(), d = Mo = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Mo, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[Ke] || h[Se] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Fv(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function iE(e, n, r) {
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
  function Yv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function lE(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = zs(l.href), h = n.querySelector(
          Hi(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ao.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, Et(h);
          return;
        }
        h = n.ownerDocument || n, l = Iv(l), (d = Jn.get(d)) && Gd(l, d), h = h.createElement("link"), Et(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), on(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Ao.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Kd = 0;
  function oE(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Kd === 0 && (Kd = 62500 * Hj());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Kd ? 50 : 800) + n
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Do = /* @__PURE__ */ new Map(), n.forEach(cE, e), Do = null, Ao.call(e));
  }
  function cE(e, n) {
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
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function uE(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Dn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dn(0), this.hiddenUpdates = Dn(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Gv(e, n, r, l, d, h, x, E, L, ae, fe, pe) {
    return e = new uE(
      e,
      n,
      r,
      x,
      L,
      ae,
      fe,
      pe,
      E
    ), n = 1, h === !0 && (n |= 24), h = zn(3, null, null, n), e.current = h, h.stateNode = e, n = Tu(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Au(h), e;
  }
  function Pv(e) {
    return e ? (e = fs, e) : fs;
  }
  function Kv(e, n, r, l, d, h) {
    d = Pv(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Nn(r, e, n), wi(r, e, n));
  }
  function Xv(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Xd(e, n) {
    Xv(e, n), (e = e.alternate) && Xv(e, n);
  }
  function Qv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && Nn(n, e, 67108864), Xd(e, 67108864);
    }
  }
  function Zv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Bn();
      n = P(n);
      var r = Ar(e, n);
      r !== null && Nn(r, e, n), Xd(e, n);
    }
  }
  var zo = !0;
  function dE(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = $.p;
    try {
      $.p = 2, Qd(e, n, r, l);
    } finally {
      $.p = h, k.T = d;
    }
  }
  function fE(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = $.p;
    try {
      $.p = 8, Qd(e, n, r, l);
    } finally {
      $.p = h, k.T = d;
    }
  }
  function Qd(e, n, r, l) {
    if (zo) {
      var d = Zd(l);
      if (d === null)
        Ld(
          e,
          n,
          l,
          Oo,
          r
        ), Wv(e, l);
      else if (mE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (Wv(e, l), n & 4 && -1 < hE.indexOf(e)) {
        for (; d !== null; ) {
          var h = Mt(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = fn(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - He(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    va(h), (ut & 6) === 0 && (vo = _t() + 500, Ui(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && Nn(E, h, 2), bo(), Xd(h, 2);
            }
          if (h = Zd(l), h === null && Ld(
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
        Ld(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function Zd(e) {
    return e = Wc(e), Jd(e);
  }
  var Oo = null;
  function Jd(e) {
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
  function Jv(e) {
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
        switch (V()) {
          case ce:
            return 2;
          case ye:
            return 8;
          case ze:
          case Fe:
            return 32;
          case st:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wd = !1, cr = null, ur = null, dr = null, Yi = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Map(), fr = [], hE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Wv(e, n) {
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
    }, n !== null && (n = Mt(n), n !== null && Qv(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function mE(e, n, r, l, d) {
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
  function ey(e) {
    var n = gt(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
              Zv(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, be(e.priority, function() {
              Zv(r);
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
      var r = Zd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Jc = l, r.target.dispatchEvent(l), Jc = null;
      } else
        return n = Mt(r), n !== null && Qv(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function ty(e, n, r) {
    Lo(e) && r.delete(n);
  }
  function pE() {
    Wd = !1, cr !== null && Lo(cr) && (cr = null), ur !== null && Lo(ur) && (ur = null), dr !== null && Lo(dr) && (dr = null), Yi.forEach(ty), Gi.forEach(ty);
  }
  function $o(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Wd || (Wd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      pE
    )));
  }
  var Uo = null;
  function ny(e) {
    Uo !== e && (Uo = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        Uo === e && (Uo = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (Jd(l || r) === null)
              continue;
            break;
          }
          var h = Mt(r);
          h !== null && (e.splice(n, 3), n -= 3, Zu(
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
      ey(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[we] || null;
        if (typeof h == "function")
          x || ny(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[we] || null)
              E = x.formAction;
            else if (Jd(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), ny(r);
        }
      }
  }
  function ay() {
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
  function ef(e) {
    this._internalRoot = e;
  }
  Bo.prototype.render = ef.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(i(409));
    var r = n.current, l = Bn();
    Kv(r, l, e, n, null, null);
  }, Bo.prototype.unmount = ef.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Kv(e.current, 2, null, e, null, null), bo(), n[Ae] = null;
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
      fr.splice(r, 0, e), r === 0 && ey(e);
    }
  };
  var ry = a.version;
  if (ry !== "19.2.5")
    throw Error(
      i(
        527,
        ry,
        "19.2.5"
      )
    );
  $.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var gE = {
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
        Oe = Vo.inject(
          gE
        ), Ce = Vo;
      } catch {
      }
  }
  return Xi.createRoot = function(e, n) {
    if (!o(e)) throw Error(i(299));
    var r = !1, l = "", d = dg, h = fg, x = hg;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Gv(
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
      ay
    ), e[Ae] = n.current, Od(e), new ef(n);
  }, Xi.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(i(299));
    var l = !1, d = "", h = dg, x = fg, E = hg, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Gv(
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
      ay
    ), n.context = Pv(null), r = n.current, l = Bn(), l = P(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, pt(n, r), va(n), e[Ae] = n.current, Od(e), new Bo(n);
  }, Xi.version = "19.2.5", Xi;
}
var my;
function TE() {
  if (my) return af.exports;
  my = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), af.exports = CE(), af.exports;
}
var RE = TE();
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
var Tx = (t) => {
  throw TypeError(t);
}, _E = (t, a, s) => a.has(t) || Tx("Cannot " + s), of = (t, a, s) => (_E(t, a, "read from private field"), s ? s.call(t) : a.get(t)), ME = (t, a, s) => a.has(t) ? Tx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, s);
function py(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function AE(t = {}) {
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
    let T = Zf(
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
  function g(S) {
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
    createHref: g,
    createURL(S) {
      return new URL(g(S), "http://localhost");
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
      let N = py(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), i && m && m({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = py(S) ? S : b(S, j);
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
function Qe(t, a) {
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
function DE() {
  return Math.random().toString(36).substring(2, 10);
}
function Zf(t, a, s = null, i, o) {
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
    key: a && a.key || i || DE(),
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
function kE(t, a = !1) {
  let s = "http://localhost";
  typeof window < "u" && (s = window.location.origin !== "null" ? window.location.origin : window.location.href), Qe(s, "No window.location.(origin|href) available to create URL");
  let i = typeof t == "string" ? t : ba(t);
  return i = i.replace(/ $/, "%20"), !a && i.startsWith("//") && (i = s + i), new URL(i, s);
}
var il, gy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (ME(this, il, /* @__PURE__ */ new Map()), t)
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
    if (of(this, il).has(t))
      return of(this, il).get(t);
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
    of(this, il).set(t, a);
  }
};
il = /* @__PURE__ */ new WeakMap();
var zE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function OE(t) {
  return zE.has(
    t
  );
}
var LE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function $E(t) {
  return LE.has(
    t
  );
}
function UE(t) {
  return t.index === !0;
}
function hl(t, a, s = [], i = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...s, String(f)], y = typeof u.id == "string" ? u.id : m.join("-");
    if (Qe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Qe(
      o || !i[y],
      `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
    ), UE(u)) {
      let p = {
        ...u,
        id: y
      };
      return i[y] = vy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: y,
        children: void 0
      };
      return i[y] = vy(
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
function vy(t, a) {
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
  let f = Rx(t);
  VE(f);
  let m = null;
  for (let y = 0; m == null && y < f.length; ++y) {
    let p = ZE(u);
    m = XE(
      f[y],
      p,
      i
    );
  }
  return m;
}
function BE(t, a) {
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
function Rx(t, a = [], s = [], i = "", o = !1) {
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
      Qe(
        b.relativePath.startsWith(i),
        `Absolute route path "${b.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(i.length);
    }
    let g = ea([i, b.relativePath]), w = s.concat(b);
    f.children && f.children.length > 0 && (Qe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${g}".`
    ), Rx(
      f.children,
      a,
      w,
      g,
      y
    )), !(f.path == null && !f.index) && a.push({
      path: g,
      score: PE(g, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let y of _x(f.path))
        u(f, m, !0, y);
  }), a;
}
function _x(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [s, ...i] = a, o = s.endsWith("?"), u = s.replace(/\?$/, "");
  if (i.length === 0)
    return o ? [u, ""] : [u];
  let f = _x(i.join("/")), m = [];
  return m.push(
    ...f.map(
      (y) => y === "" ? u : [u, y].join("/")
    )
  ), o && m.push(...f), m.map(
    (y) => t.startsWith("/") && y === "" ? "/" : y
  );
}
function VE(t) {
  t.sort(
    (a, s) => a.score !== s.score ? s.score - a.score : KE(
      a.routesMeta.map((i) => i.childrenIndex),
      s.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var IE = /^:[\w-]+$/, HE = 3, qE = 2, FE = 1, YE = 10, GE = -2, yy = (t) => t === "*";
function PE(t, a) {
  let s = t.split("/"), i = s.length;
  return s.some(yy) && (i += GE), a && (i += qE), s.filter((o) => !yy(o)).reduce(
    (o, u) => o + (IE.test(u) ? HE : u === "" ? FE : YE),
    i
  );
}
function KE(t, a) {
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
function XE(t, a, s = !1) {
  let { routesMeta: i } = t, o = {}, u = "/", f = [];
  for (let m = 0; m < i.length; ++m) {
    let y = i[m], p = m === i.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", g = yc(
      { path: y.relativePath, caseSensitive: y.caseSensitive, end: p },
      b
    ), w = y.route;
    if (!g && p && s && !i[i.length - 1].route.index && (g = yc(
      {
        path: y.relativePath,
        caseSensitive: y.caseSensitive,
        end: !1
      },
      b
    )), !g)
      return null;
    Object.assign(o, g.params), f.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: ea([u, g.pathname]),
      pathnameBase: eN(
        ea([u, g.pathnameBase])
      ),
      route: w
    }), g.pathnameBase !== "/" && (u = ea([u, g.pathnameBase]));
  }
  return f;
}
function yc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [s, i] = QE(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(s);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: i.reduce(
      (p, { paramName: b, isOptional: g }, w) => {
        if (b === "*") {
          let j = m[w] || "";
          f = u.slice(0, u.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const S = m[w];
        return g && !S ? p[b] = void 0 : p[b] = (S || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: u,
    pathnameBase: f,
    pattern: t
  };
}
function QE(t, a = !1, s = !0) {
  Vt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let i = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, m, y, p, b) => {
      if (i.push({ paramName: m, isOptional: y != null }), y) {
        let g = b.charAt(p + f.length);
        return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (i.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : s ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), i];
}
function ZE(t) {
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
function JE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : ea([t, a]);
}
var Mx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ah = (t) => Mx.test(t);
function WE(t, a = "/") {
  let {
    pathname: s,
    search: i = "",
    hash: o = ""
  } = typeof t == "string" ? da(t) : t, u;
  return s ? (s = kh(s), s.startsWith("/") ? u = by(s.substring(1), "/") : u = by(s, a)) : u = a, {
    pathname: u,
    search: tN(i),
    hash: nN(o)
  };
}
function by(t, a) {
  let s = bc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? s.length > 1 && s.pop() : o !== "." && s.push(o);
  }), s.length > 1 ? s.join("/") : "/";
}
function cf(t, a, s, i) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ax(t) {
  return t.filter(
    (a, s) => s === 0 || a.route.path && a.route.path.length > 0
  );
}
function Dh(t) {
  let a = Ax(t);
  return a.map(
    (s, i) => i === a.length - 1 ? s.pathname : s.pathnameBase
  );
}
function Oc(t, a, s, i = !1) {
  let o;
  typeof t == "string" ? o = da(t) : (o = { ...t }, Qe(
    !o.pathname || !o.pathname.includes("?"),
    cf("?", "pathname", "search", o)
  ), Qe(
    !o.pathname || !o.pathname.includes("#"),
    cf("#", "pathname", "hash", o)
  ), Qe(
    !o.search || !o.search.includes("#"),
    cf("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, m;
  if (f == null)
    m = s;
  else {
    let g = a.length - 1;
    if (!i && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), g -= 1;
      o.pathname = w.join("/");
    }
    m = g >= 0 ? a[g] : "/";
  }
  let y = WE(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && s.endsWith("/");
  return !y.pathname.endsWith("/") && (p || b) && (y.pathname += "/"), y;
}
var kh = (t) => t.replace(/\/\/+/g, "/"), ea = (t) => kh(t.join("/")), bc = (t) => t.replace(/\/+$/, ""), eN = (t) => bc(t).replace(/^\/*/, "/"), tN = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, nN = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, aN = (t, a = 302) => {
  let s = a;
  typeof s == "number" ? s = { status: s } : typeof s.status > "u" && (s.status = 302);
  let i = new Headers(s.headers);
  return i.set("Location", t), new Response(null, { ...s, headers: i });
}, Lc = class {
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
var Dx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function kx(t, a) {
  let s = t;
  if (typeof s != "string" || !Mx.test(s))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: s
    };
  let i = s, o = !1;
  if (Dx)
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
function rN(t, a) {
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
        (...y) => xy(y[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[xr] = f, i[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && s.middleware.length > 0 && (i.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Fs(
      s.middleware,
      u,
      (...m) => xy(m[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), i;
}
function sN(t, a) {
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
          ...Sy(t, m ?? {})
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
        ...Sy(t, y ?? {})
      };
    });
    o && (o[xr] = i, t.fetch = o);
  }
  return t;
}
function Fs(t, a, s) {
  return t.length === 0 ? null : async (...i) => {
    let o = await zx(
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
async function zx(t, a, s, i) {
  let o = t[i], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = zx(t, a, s, i - 1), u = await f, Qe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
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
function xy(t) {
  let { request: a, context: s, params: i, unstable_pattern: o } = t;
  return {
    request: iN(a),
    params: { ...i },
    unstable_pattern: o,
    context: lN(s)
  };
}
function Sy(t, a) {
  return {
    currentUrl: ba(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function iN(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function lN(t) {
  if (cN(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var oN = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function cN(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === oN;
}
var Ox = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], uN = new Set(
  Ox
), dN = [
  "GET",
  ...Ox
], fN = new Set(dN), Lx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), hN = /* @__PURE__ */ new Set([307, 308]), uf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, mN = {
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
}, pN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), $x = "remix-router-transitions", Ux = Symbol("ResetLoaderData");
function gN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, s = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Qe(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let i = t.hydrationRouteProperties || [], o = t.mapRouteProperties || pN, u = o;
  if (t.unstable_instrumentations) {
    let O = t.unstable_instrumentations;
    u = (P) => ({
      ...o(P),
      ...rN(
        O.map((Z) => Z.route).filter(Boolean),
        P
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
  let b = t.dataStrategy || SN, g = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, C = null, T = t.hydrationData != null, M = yr(m, t.history.location, p), z = !1, R = null, H, Q;
  if (M == null && !t.patchRoutesOnNavigation) {
    let O = Wn(404, {
      pathname: t.history.location.pathname
    }), { matches: P, route: Z } = Io(m);
    H = !0, Q = !H, M = P, R = { [Z.id]: O };
  } else if (M && !t.hydrationData && Dn(
    M,
    m,
    t.history.location.pathname
  ).active && (M = null), M)
    if (M.some((O) => O.route.lazy))
      H = !1, Q = !H;
    else if (!M.some((O) => zh(O.route)))
      H = !0, Q = !H;
    else {
      let O = t.hydrationData ? t.hydrationData.loaderData : null, P = t.hydrationData ? t.hydrationData.errors : null, Z = M;
      if (P) {
        let ge = M.findIndex(
          (be) => P[be.route.id] !== void 0
        );
        Z = Z.slice(0, ge + 1);
      }
      Q = !1, H = !0, Z.forEach((ge) => {
        let be = Bx(ge.route, O, P);
        Q = Q || be.renderFallback, H = H && !be.shouldLoad;
      });
    }
  else {
    H = !1, Q = !H, M = [];
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
    initialized: H,
    renderFallback: Q,
    navigation: uf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || R,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", D = null, q = !1, te, X = !1, le = /* @__PURE__ */ new Map(), re = null, k = !1, $ = !1, F = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Map(), ue = 0, _ = -1, ne = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), de = /* @__PURE__ */ new Map(), ve, Te = null;
  function rt() {
    if (w = t.history.listen(
      ({ action: O, location: P, delta: Z }) => {
        if (ve) {
          ve(), ve = void 0;
          return;
        }
        Vt(
          de.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ge = An({
          currentLocation: A.location,
          nextLocation: P,
          historyAction: O
        });
        if (ge && Z != null) {
          let be = new Promise((_e) => {
            ve = _e;
          });
          t.history.go(Z * -1), nn(ge, {
            state: "blocked",
            location: P,
            proceed() {
              nn(ge, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: P
              }), be.then(() => t.history.go(Z));
            },
            reset() {
              let _e = new Map(A.blockers);
              _e.set(ge, Qi), Ie({ blockers: _e });
            }
          }), D?.resolve(), D = null;
          return;
        }
        return Dt(O, P);
      }
    ), s) {
      BN(a, le);
      let O = () => VN(a, le);
      a.addEventListener("pagehide", O), re = () => a.removeEventListener("pagehide", O);
    }
    return A.initialized || Dt("POP", A.location, {
      initialHydration: !0
    }), ie;
  }
  function Ee() {
    w && w(), re && re(), S.clear(), te && te.abort(), A.fetchers.forEach((O, P) => Oe(P)), A.blockers.forEach((O, P) => qn(P));
  }
  function Ze(O) {
    return S.add(O), () => S.delete(O);
  }
  function Ie(O, P = {}) {
    O.matches && (O.matches = O.matches.map((be) => {
      let _e = f[be.route.id], Se = be.route;
      return Se.element !== _e.element || Se.errorElement !== _e.errorElement || Se.hydrateFallbackElement !== _e.hydrateFallbackElement ? {
        ...be,
        route: _e
      } : be;
    })), A = {
      ...A,
      ...O
    };
    let Z = [], ge = [];
    A.fetchers.forEach((be, _e) => {
      be.state === "idle" && (W.has(_e) ? Z.push(_e) : ge.push(_e));
    }), W.forEach((be) => {
      !A.fetchers.has(be) && !Y.has(be) && Z.push(be);
    }), [...S].forEach(
      (be) => be(A, {
        deletedFetchers: Z,
        newErrors: O.errors ?? null,
        viewTransitionOpts: P.viewTransitionOpts,
        flushSync: P.flushSync === !0
      })
    ), Z.forEach((be) => Oe(be)), ge.forEach((be) => A.fetchers.delete(be));
  }
  function Ve(O, P, { flushSync: Z } = {}) {
    let ge = A.actionData != null && A.navigation.formMethod != null && gn(A.navigation.formMethod) && A.navigation.state === "loading" && O.state?._isRedirect !== !0, be;
    P.actionData ? Object.keys(P.actionData).length > 0 ? be = P.actionData : be = null : ge ? be = A.actionData : be = null;
    let _e = P.loaderData ? Dy(
      A.loaderData,
      P.loaderData,
      P.matches || [],
      P.errors
    ) : A.loaderData, Se = A.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach(($e, ke) => Se.set(ke, Qi)));
    let we = k ? !1 : Zt(O, P.matches || A.matches), Ae = q === !0 || A.navigation.formMethod != null && gn(A.navigation.formMethod) && O.state?._isRedirect !== !0;
    y && (m = y, y = void 0), k || I === "POP" || (I === "PUSH" ? t.history.push(O, O.state) : I === "REPLACE" && t.history.replace(O, O.state));
    let Ne;
    if (I === "POP") {
      let $e = le.get(A.location.pathname);
      $e && $e.has(O.pathname) ? Ne = {
        currentLocation: A.location,
        nextLocation: O
      } : le.has(O.pathname) && (Ne = {
        currentLocation: O,
        nextLocation: A.location
      });
    } else if (X) {
      let $e = le.get(A.location.pathname);
      $e ? $e.add(O.pathname) : ($e = /* @__PURE__ */ new Set([O.pathname]), le.set(A.location.pathname, $e)), Ne = {
        currentLocation: A.location,
        nextLocation: O
      };
    }
    Ie(
      {
        ...P,
        // matches, errors, fetchers go through as-is
        actionData: be,
        loaderData: _e,
        historyAction: I,
        location: O,
        initialized: !0,
        renderFallback: !1,
        navigation: uf,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: Ae,
        blockers: Se
      },
      {
        viewTransitionOpts: Ne,
        flushSync: Z === !0
      }
    ), I = "POP", q = !1, X = !1, k = !1, $ = !1, D?.resolve(), D = null, Te?.resolve(), Te = null;
  }
  async function It(O, P) {
    if (D?.resolve(), D = null, typeof O == "number") {
      D || (D = Ly());
      let xt = D.promise;
      return t.history.go(O), xt;
    }
    let Z = Jf(
      A.location,
      A.matches,
      p,
      O,
      P?.fromRouteId,
      P?.relative
    ), { path: ge, submission: be, error: _e } = wy(
      !1,
      Z,
      P
    ), Se;
    P?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof P.unstable_mask == "string" ? da(P.unstable_mask) : {
        ...A.location.unstable_mask,
        ...P.unstable_mask
      }
    });
    let we = A.location, Ae = Zf(
      we,
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
    Ne === !0 ? $e = "REPLACE" : Ne === !1 || be != null && gn(be.formMethod) && be.formAction === A.location.pathname + A.location.search && ($e = "REPLACE");
    let ke = P && "preventScrollReset" in P ? P.preventScrollReset === !0 : void 0, it = (P && P.flushSync) === !0, Ke = An({
      currentLocation: we,
      nextLocation: Ae,
      historyAction: $e
    });
    if (Ke) {
      nn(Ke, {
        state: "blocked",
        location: Ae,
        proceed() {
          nn(Ke, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ae
          }), It(O, P);
        },
        reset() {
          let xt = new Map(A.blockers);
          xt.set(Ke, Qi), Ie({ blockers: xt });
        }
      });
      return;
    }
    await Dt($e, Ae, {
      submission: be,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: _e,
      preventScrollReset: ke,
      replace: P && P.replace,
      enableViewTransition: P && P.viewTransition,
      flushSync: it,
      callSiteDefaultShouldRevalidate: P && P.unstable_defaultShouldRevalidate
    });
  }
  function jt() {
    Te || (Te = Ly()), ze(), Ie({ revalidation: "loading" });
    let O = Te.promise;
    return A.navigation.state === "submitting" ? O : A.navigation.state === "idle" ? (Dt(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), O) : (Dt(
      I || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: X === !0
      }
    ), O);
  }
  async function Dt(O, P, Z) {
    te && te.abort(), te = null, I = O, k = (Z && Z.startUninterruptedRevalidation) === !0, zt(A.location, A.matches), q = (Z && Z.preventScrollReset) === !0, X = (Z && Z.enableViewTransition) === !0;
    let ge = y || m, be = Z && Z.overrideNavigation, _e = Z?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : yr(ge, P, p), Se = (Z && Z.flushSync) === !0;
    if (_e && A.initialized && !$ && _N(A.location, P) && !(Z && Z.submission && gn(Z.submission.formMethod))) {
      Ve(P, { matches: _e }, { flushSync: Se });
      return;
    }
    let we = Dn(_e, ge, P.pathname);
    if (we.active && we.matches && (_e = we.matches), !_e) {
      let { error: gt, notFoundMatches: Mt, route: Je } = fn(
        P.pathname
      );
      Ve(
        P,
        {
          matches: Mt,
          loaderData: {},
          errors: {
            [Je.id]: gt
          }
        },
        { flushSync: Se }
      );
      return;
    }
    te = new AbortController();
    let Ae = Is(
      t.history,
      P,
      te.signal,
      Z && Z.submission
    ), Ne = t.getContext ? await t.getContext() : new gy(), $e;
    if (Z && Z.pendingError)
      $e = [
        br(_e).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && gn(Z.submission.formMethod)) {
      let gt = await Mn(
        Ae,
        P,
        Z.submission,
        _e,
        Ne,
        we.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Se }
      );
      if (gt.shortCircuited)
        return;
      if (gt.pendingActionResult) {
        let [Mt, Je] = gt.pendingActionResult;
        if (Vn(Je) && ml(Je.error) && Je.error.status === 404) {
          te = null, Ve(P, {
            matches: gt.matches,
            loaderData: {},
            errors: {
              [Mt]: Je.error
            }
          });
          return;
        }
      }
      _e = gt.matches || _e, $e = gt.pendingActionResult, be = df(P, Z.submission), Se = !1, we.active = !1, Ae = Is(
        t.history,
        Ae.url,
        Ae.signal
      );
    }
    let {
      shortCircuited: ke,
      matches: it,
      loaderData: Ke,
      errors: xt
    } = await dt(
      Ae,
      P,
      _e,
      Ne,
      we.active,
      be,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Se,
      $e,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    ke || (te = null, Ve(P, {
      matches: it || _e,
      ...ky($e),
      loaderData: Ke,
      errors: xt
    }));
  }
  async function Mn(O, P, Z, ge, be, _e, Se, we = {}) {
    ze();
    let Ae = $N(P, Z);
    if (Ie({ navigation: Ae }, { flushSync: we.flushSync === !0 }), _e) {
      let ke = await pt(
        ge,
        P.pathname,
        O.signal
      );
      if (ke.type === "aborted")
        return { shortCircuited: !0 };
      if (ke.type === "error") {
        if (ke.partialMatches.length === 0) {
          let { matches: Ke, route: xt } = Io(m);
          return {
            matches: Ke,
            pendingActionResult: [
              xt.id,
              {
                type: "error",
                error: ke.error
              }
            ]
          };
        }
        let it = br(ke.partialMatches).route.id;
        return {
          matches: ke.partialMatches,
          pendingActionResult: [
            it,
            {
              type: "error",
              error: ke.error
            }
          ]
        };
      } else if (ke.matches)
        ge = ke.matches;
      else {
        let { notFoundMatches: it, error: Ke, route: xt } = fn(
          P.pathname
        );
        return {
          matches: it,
          pendingActionResult: [
            xt.id,
            {
              type: "error",
              error: Ke
            }
          ]
        };
      }
    }
    let Ne, $e = cc(ge, P);
    if (!$e.route.action && !$e.route.lazy)
      Ne = {
        type: "error",
        error: Wn(405, {
          method: O.method,
          pathname: P.pathname,
          routeId: $e.route.id
        })
      };
    else {
      let ke = Ps(
        u,
        f,
        O,
        P,
        ge,
        $e,
        Se ? [] : i,
        be
      ), it = await ce(
        O,
        P,
        ke,
        be,
        null
      );
      if (Ne = it[$e.route.id], !Ne) {
        for (let Ke of ge)
          if (it[Ke.route.id]) {
            Ne = it[Ke.route.id];
            break;
          }
      }
      if (O.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(Ne)) {
      let ke;
      return we && we.replace != null ? ke = we.replace : ke = _y(
        Ne.response.headers.get("Location"),
        new URL(O.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await V(O, Ne, !0, {
        submission: Z,
        replace: ke
      }), { shortCircuited: !0 };
    }
    if (Vn(Ne)) {
      let ke = br(ge, $e.route.id);
      return (we && we.replace) !== !0 && (I = "PUSH"), {
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
  async function dt(O, P, Z, ge, be, _e, Se, we, Ae, Ne, $e, ke, it) {
    let Ke = _e || df(P, Se), xt = Se || we || Oy(Ke), gt = !k && !Ne;
    if (be) {
      if (gt) {
        let $t = Qt(ke);
        Ie(
          {
            navigation: Ke,
            ...$t !== void 0 ? { actionData: $t } : {}
          },
          {
            flushSync: $e
          }
        );
      }
      let Xe = await pt(
        Z,
        P.pathname,
        O.signal
      );
      if (Xe.type === "aborted")
        return { shortCircuited: !0 };
      if (Xe.type === "error") {
        if (Xe.partialMatches.length === 0) {
          let { matches: mn, route: qt } = Io(m);
          return {
            matches: mn,
            loaderData: {},
            errors: {
              [qt.id]: Xe.error
            }
          };
        }
        let $t = br(Xe.partialMatches).route.id;
        return {
          matches: Xe.partialMatches,
          loaderData: {},
          errors: {
            [$t]: Xe.error
          }
        };
      } else if (Xe.matches)
        Z = Xe.matches;
      else {
        let { error: $t, notFoundMatches: mn, route: qt } = fn(
          P.pathname
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
    let Mt = y || m, { dsMatches: Je, revalidatingFetchers: Ht } = jy(
      O,
      ge,
      u,
      f,
      t.history,
      A,
      Z,
      xt,
      P,
      Ne ? [] : i,
      Ne === !0,
      $,
      F,
      W,
      G,
      J,
      Mt,
      p,
      t.patchRoutesOnNavigation != null,
      ke,
      it
    );
    if (_ = ++ue, !t.dataStrategy && !Je.some((Xe) => Xe.shouldLoad) && !Je.some(
      (Xe) => Xe.route.middleware && Xe.route.middleware.length > 0
    ) && Ht.length === 0) {
      let Xe = dn();
      return Ve(
        P,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: ke && Vn(ke[1]) ? { [ke[0]]: ke[1].error } : null,
          ...ky(ke),
          ...Xe ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: $e }
      ), { shortCircuited: !0 };
    }
    if (gt) {
      let Xe = {};
      if (!be) {
        Xe.navigation = Ke;
        let $t = Qt(ke);
        $t !== void 0 && (Xe.actionData = $t);
      }
      Ht.length > 0 && (Xe.fetchers = un(Ht)), Ie(Xe, { flushSync: $e });
    }
    Ht.forEach((Xe) => {
      ft(Xe.key), Xe.controller && Y.set(Xe.key, Xe.controller);
    });
    let Et = () => Ht.forEach((Xe) => ft(Xe.key));
    te && te.signal.addEventListener(
      "abort",
      Et
    );
    let { loaderResults: Fa, fetcherResults: sa } = await ye(
      Je,
      Ht,
      O,
      P,
      ge
    );
    if (O.signal.aborted)
      return { shortCircuited: !0 };
    te && te.signal.removeEventListener(
      "abort",
      Et
    ), Ht.forEach((Xe) => Y.delete(Xe.key));
    let Wt = Ho(Fa);
    if (Wt)
      return await V(O, Wt.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    if (Wt = Ho(sa), Wt)
      return J.add(Wt.key), await V(O, Wt.result, !0, {
        replace: Ae
      }), { shortCircuited: !0 };
    let { loaderData: fa, errors: Cr } = Ay(
      A,
      Z,
      Fa,
      ke,
      Ht,
      sa
    );
    Ne && A.errors && (Cr = { ...A.errors, ...Cr });
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
    return O.forEach((P) => {
      let Z = A.fetchers.get(P.key), ge = Zi(
        void 0,
        Z ? Z.data : void 0
      );
      A.fetchers.set(P.key, ge);
    }), new Map(A.fetchers);
  }
  async function Rt(O, P, Z, ge) {
    ft(O);
    let be = (ge && ge.flushSync) === !0, _e = y || m, Se = Jf(
      A.location,
      A.matches,
      p,
      Z,
      P,
      ge?.relative
    ), we = yr(_e, Se, p), Ae = Dn(we, _e, Se);
    if (Ae.active && Ae.matches && (we = Ae.matches), !we) {
      st(
        O,
        P,
        Wn(404, { pathname: Se }),
        { flushSync: be }
      );
      return;
    }
    let { path: Ne, submission: $e, error: ke } = wy(
      !0,
      Se,
      ge
    );
    if (ke) {
      st(O, P, ke, { flushSync: be });
      return;
    }
    let it = t.getContext ? await t.getContext() : new gy(), Ke = (ge && ge.preventScrollReset) === !0;
    if ($e && gn($e.formMethod)) {
      await tn(
        O,
        P,
        Ne,
        we,
        it,
        Ae.active,
        be,
        Ke,
        $e,
        ge && ge.unstable_defaultShouldRevalidate
      );
      return;
    }
    G.set(O, { routeId: P, path: Ne }), await _t(
      O,
      P,
      Ne,
      we,
      it,
      Ae.active,
      be,
      Ke,
      $e
    );
  }
  async function tn(O, P, Z, ge, be, _e, Se, we, Ae, Ne) {
    ze(), G.delete(O);
    let $e = A.fetchers.get(O);
    Fe(O, UN(Ae, $e), {
      flushSync: Se
    });
    let ke = new AbortController(), it = Is(
      t.history,
      Z,
      ke.signal,
      Ae
    );
    if (_e) {
      let Nt = await pt(
        ge,
        new URL(it.url).pathname,
        it.signal,
        O
      );
      if (Nt.type === "aborted")
        return;
      if (Nt.type === "error") {
        st(O, P, Nt.error, { flushSync: Se });
        return;
      } else if (Nt.matches)
        ge = Nt.matches;
      else {
        st(
          O,
          P,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let Ke = cc(ge, Z);
    if (!Ke.route.action && !Ke.route.lazy) {
      let Nt = Wn(405, {
        method: Ae.formMethod,
        pathname: Z,
        routeId: P
      });
      st(O, P, Nt, { flushSync: Se });
      return;
    }
    Y.set(O, ke);
    let xt = ue, gt = Ps(
      u,
      f,
      it,
      Z,
      ge,
      Ke,
      i,
      be
    ), Mt = await ce(
      it,
      Z,
      gt,
      be,
      O
    ), Je = Mt[Ke.route.id];
    if (!Je) {
      for (let Nt of gt)
        if (Mt[Nt.route.id]) {
          Je = Mt[Nt.route.id];
          break;
        }
    }
    if (it.signal.aborted) {
      Y.get(O) === ke && Y.delete(O);
      return;
    }
    if (W.has(O)) {
      if (Gr(Je) || Vn(Je)) {
        Fe(O, Ba(void 0));
        return;
      }
    } else {
      if (Gr(Je))
        if (Y.delete(O), _ > xt) {
          Fe(O, Ba(void 0));
          return;
        } else
          return J.add(O), Fe(O, Zi(Ae)), V(it, Je, !1, {
            fetcherSubmission: Ae,
            preventScrollReset: we
          });
      if (Vn(Je)) {
        st(O, P, Je.error);
        return;
      }
    }
    let Ht = A.navigation.location || A.location, Et = Is(
      t.history,
      Ht,
      ke.signal
    ), Fa = y || m, sa = A.navigation.state !== "idle" ? yr(Fa, A.navigation.location, p) : A.matches;
    Qe(sa, "Didn't find any matches after fetcher action");
    let Wt = ++ue;
    ne.set(O, Wt);
    let fa = Zi(Ae, Je.data);
    A.fetchers.set(O, fa);
    let { dsMatches: Cr, revalidatingFetchers: ha } = jy(
      Et,
      be,
      u,
      f,
      t.history,
      A,
      sa,
      Ae,
      Ht,
      i,
      !1,
      $,
      F,
      W,
      G,
      J,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [Ke.route.id, Je],
      Ne
    );
    ha.filter((Nt) => Nt.key !== O).forEach((Nt) => {
      let ns = Nt.key, as = A.fetchers.get(ns), _l = Zi(
        void 0,
        as ? as.data : void 0
      );
      A.fetchers.set(ns, _l), ft(ns), Nt.controller && Y.set(ns, Nt.controller);
    }), Ie({ fetchers: new Map(A.fetchers) });
    let Tr = () => ha.forEach((Nt) => ft(Nt.key));
    ke.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ts, fetcherResults: Xe } = await ye(
      Cr,
      ha,
      Et,
      Ht,
      be
    );
    if (ke.signal.aborted)
      return;
    if (ke.signal.removeEventListener(
      "abort",
      Tr
    ), ne.delete(O), Y.delete(O), ha.forEach((Nt) => Y.delete(Nt.key)), A.fetchers.has(O)) {
      let Nt = Ba(Je.data);
      A.fetchers.set(O, Nt);
    }
    let $t = Ho(ts);
    if ($t)
      return V(
        Et,
        $t.result,
        !1,
        { preventScrollReset: we }
      );
    if ($t = Ho(Xe), $t)
      return J.add($t.key), V(
        Et,
        $t.result,
        !1,
        { preventScrollReset: we }
      );
    let { loaderData: mn, errors: qt } = Ay(
      A,
      sa,
      ts,
      void 0,
      ha,
      Xe
    );
    Hn(Wt), A.navigation.state === "loading" && Wt > _ ? (Qe(I, "Expected pending action"), te && te.abort(), Ve(A.navigation.location, {
      matches: sa,
      loaderData: mn,
      errors: qt,
      fetchers: new Map(A.fetchers)
    })) : (Ie({
      errors: qt,
      loaderData: Dy(
        A.loaderData,
        mn,
        sa,
        qt
      ),
      fetchers: new Map(A.fetchers)
    }), $ = !1);
  }
  async function _t(O, P, Z, ge, be, _e, Se, we, Ae) {
    let Ne = A.fetchers.get(O);
    Fe(
      O,
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
    if (_e) {
      let Je = await pt(
        ge,
        new URL(ke.url).pathname,
        ke.signal,
        O
      );
      if (Je.type === "aborted")
        return;
      if (Je.type === "error") {
        st(O, P, Je.error, { flushSync: Se });
        return;
      } else if (Je.matches)
        ge = Je.matches;
      else {
        st(
          O,
          P,
          Wn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let it = cc(ge, Z);
    Y.set(O, $e);
    let Ke = ue, xt = Ps(
      u,
      f,
      ke,
      Z,
      ge,
      it,
      i,
      be
    ), gt = await ce(
      ke,
      Z,
      xt,
      be,
      O
    ), Mt = gt[it.route.id];
    if (!Mt) {
      for (let Je of ge)
        if (gt[Je.route.id]) {
          Mt = gt[Je.route.id];
          break;
        }
    }
    if (Y.get(O) === $e && Y.delete(O), !ke.signal.aborted) {
      if (W.has(O)) {
        Fe(O, Ba(void 0));
        return;
      }
      if (Gr(Mt))
        if (_ > Ke) {
          Fe(O, Ba(void 0));
          return;
        } else {
          J.add(O), await V(ke, Mt, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (Vn(Mt)) {
        st(O, P, Mt.error);
        return;
      }
      Fe(O, Ba(Mt.data));
    }
  }
  async function V(O, P, Z, {
    submission: ge,
    fetcherSubmission: be,
    preventScrollReset: _e,
    replace: Se
  } = {}) {
    Z || (D?.resolve(), D = null), P.response.headers.has("X-Remix-Revalidate") && ($ = !0);
    let we = P.response.headers.get("Location");
    Qe(we, "Expected a Location header on the redirect Response"), we = _y(
      we,
      new URL(O.url),
      p,
      t.history
    );
    let Ae = Zf(A.location, we, {
      _isRedirect: !0
    });
    if (s) {
      let xt = !1;
      if (P.response.headers.has("X-Remix-Reload-Document"))
        xt = !0;
      else if (Ah(we)) {
        const gt = kE(we, !0);
        xt = // Hard reload if it's an absolute URL to a new origin
        gt.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        aa(gt.pathname, p) == null;
      }
      if (xt) {
        Se ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    te = null;
    let Ne = Se === !0 || P.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: $e, formAction: ke, formEncType: it } = A.navigation;
    !ge && !be && $e && ke && it && (ge = Oy(A.navigation));
    let Ke = ge || be;
    if (hN.has(P.response.status) && Ke && gn(Ke.formMethod))
      await Dt(Ne, Ae, {
        submission: {
          ...Ke,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: _e || q,
        enableViewTransition: Z ? X : void 0
      });
    else {
      let xt = df(
        Ae,
        ge
      );
      await Dt(Ne, Ae, {
        overrideNavigation: xt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: be,
        // Preserve these flags across redirects
        preventScrollReset: _e || q,
        enableViewTransition: Z ? X : void 0
      });
    }
  }
  async function ce(O, P, Z, ge, be) {
    let _e, Se = {};
    try {
      _e = await jN(
        b,
        O,
        P,
        Z,
        be,
        ge,
        !1
      );
    } catch (we) {
      return Z.filter((Ae) => Ae.shouldLoad).forEach((Ae) => {
        Se[Ae.route.id] = {
          type: "error",
          error: we
        };
      }), Se;
    }
    if (O.signal.aborted)
      return Se;
    if (!gn(O.method))
      for (let we of Z) {
        if (_e[we.route.id]?.type === "error")
          break;
        !_e.hasOwnProperty(we.route.id) && !A.loaderData.hasOwnProperty(we.route.id) && (!A.errors || !A.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (_e[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, Ae] of Object.entries(_e))
      if (kN(Ae)) {
        let Ne = Ae.result;
        Se[we] = {
          type: "redirect",
          response: TN(
            Ne,
            O,
            we,
            Z,
            p
          )
        };
      } else
        Se[we] = await CN(Ae);
    return Se;
  }
  async function ye(O, P, Z, ge, be) {
    let _e = ce(
      Z,
      ge,
      O,
      be,
      null
    ), Se = Promise.all(
      P.map(async (Ne) => {
        if (Ne.matches && Ne.match && Ne.request && Ne.controller) {
          let ke = (await ce(
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
    ), we = await _e, Ae = (await Se).reduce(
      (Ne, $e) => Object.assign(Ne, $e),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: Ae
    };
  }
  function ze() {
    $ = !0, G.forEach((O, P) => {
      Y.has(P) && F.add(P), ft(P);
    });
  }
  function Fe(O, P, Z = {}) {
    A.fetchers.set(O, P), Ie(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function st(O, P, Z, ge = {}) {
    let be = br(A.matches, P);
    Oe(O), Ie(
      {
        errors: {
          [be.route.id]: Z
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ge && ge.flushSync) === !0 }
    );
  }
  function he(O) {
    return U.set(O, (U.get(O) || 0) + 1), W.has(O) && W.delete(O), A.fetchers.get(O) || mN;
  }
  function je(O, P) {
    ft(O, P?.reason), Fe(O, Ba(null));
  }
  function Oe(O) {
    let P = A.fetchers.get(O);
    Y.has(O) && !(P && P.state === "loading" && ne.has(O)) && ft(O), G.delete(O), ne.delete(O), J.delete(O), W.delete(O), F.delete(O), A.fetchers.delete(O);
  }
  function Ce(O) {
    let P = (U.get(O) || 0) - 1;
    P <= 0 ? (U.delete(O), W.add(O)) : U.set(O, P), Ie({ fetchers: new Map(A.fetchers) });
  }
  function ft(O, P) {
    let Z = Y.get(O);
    Z && (Z.abort(P), Y.delete(O));
  }
  function He(O) {
    for (let P of O) {
      let Z = he(P), ge = Ba(Z.data);
      A.fetchers.set(P, ge);
    }
  }
  function dn() {
    let O = [], P = !1;
    for (let Z of J) {
      let ge = A.fetchers.get(Z);
      Qe(ge, `Expected fetcher: ${Z}`), ge.state === "loading" && (J.delete(Z), O.push(Z), P = !0);
    }
    return He(O), P;
  }
  function Hn(O) {
    let P = [];
    for (let [Z, ge] of ne)
      if (ge < O) {
        let be = A.fetchers.get(Z);
        Qe(be, `Expected fetcher: ${Z}`), be.state === "loading" && (ft(Z), ne.delete(Z), P.push(Z));
      }
    return He(P), P.length > 0;
  }
  function yn(O, P) {
    let Z = A.blockers.get(O) || Qi;
    return de.get(O) !== P && de.set(O, P), Z;
  }
  function qn(O) {
    A.blockers.delete(O), de.delete(O);
  }
  function nn(O, P) {
    let Z = A.blockers.get(O) || Qi;
    Qe(
      Z.state === "unblocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "blocked" || Z.state === "blocked" && P.state === "proceeding" || Z.state === "blocked" && P.state === "unblocked" || Z.state === "proceeding" && P.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${P.state}`
    );
    let ge = new Map(A.blockers);
    ge.set(O, P), Ie({ blockers: ge });
  }
  function An({
    currentLocation: O,
    nextLocation: P,
    historyAction: Z
  }) {
    if (de.size === 0)
      return;
    de.size > 1 && Vt(!1, "A router only supports one blocker at a time");
    let ge = Array.from(de.entries()), [be, _e] = ge[ge.length - 1], Se = A.blockers.get(be);
    if (!(Se && Se.state === "proceeding") && _e({ currentLocation: O, nextLocation: P, historyAction: Z }))
      return be;
  }
  function fn(O) {
    let P = Wn(404, { pathname: O }), Z = y || m, { matches: ge, route: be } = Io(Z);
    return { notFoundMatches: ge, route: be, error: P };
  }
  function Ue(O, P, Z) {
    if (j = O, C = P, N = Z || null, !T && A.navigation === uf) {
      T = !0;
      let ge = Zt(A.location, A.matches);
      ge != null && Ie({ restoreScrollPosition: ge });
    }
    return () => {
      j = null, C = null, N = null;
    };
  }
  function ct(O, P) {
    return N && N(
      O,
      P.map((ge) => BE(ge, A.loaderData))
    ) || O.key;
  }
  function zt(O, P) {
    if (j && C) {
      let Z = ct(O, P);
      j[Z] = C();
    }
  }
  function Zt(O, P) {
    if (j) {
      let Z = ct(O, P), ge = j[Z];
      if (typeof ge == "number")
        return ge;
    }
    return null;
  }
  function Dn(O, P, Z) {
    if (t.patchRoutesOnNavigation)
      if (O) {
        if (Object.keys(O[0].params).length > 0)
          return { active: !0, matches: ll(
            P,
            Z,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          P,
          Z,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function pt(O, P, Z, ge) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: O };
    let be = O;
    for (; ; ) {
      let _e = y == null, Se = y || m, we = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: P,
          matches: be,
          fetcherKey: ge,
          patch: ($e, ke) => {
            Z.aborted || Ey(
              $e,
              ke,
              Se,
              we,
              u,
              !1
            );
          }
        });
      } catch ($e) {
        return { type: "error", error: $e, partialMatches: be };
      } finally {
        _e && !Z.aborted && (m = [...m]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Ae = yr(Se, P, p), Ne = null;
      if (Ae) {
        if (Object.keys(Ae[0].params).length === 0)
          return { type: "success", matches: Ae };
        if (Ne = ll(
          Se,
          P,
          p,
          !0
        ), !(Ne && be.length < Ne.length && an(
          be,
          Ne.slice(0, be.length)
        )))
          return { type: "success", matches: Ae };
      }
      if (Ne || (Ne = ll(
        Se,
        P,
        p,
        !0
      )), !Ne || an(be, Ne))
        return { type: "success", matches: null };
      be = Ne;
    }
  }
  function an(O, P) {
    return O.length === P.length && O.every((Z, ge) => Z.route.id === P[ge].route.id);
  }
  function Sa(O) {
    f = {}, y = hl(
      O,
      u,
      void 0,
      f
    );
  }
  function hn(O, P, Z = !1) {
    let ge = y == null;
    Ey(
      O,
      P,
      y || m,
      f,
      u,
      Z
    ), ge && (m = [...m], Ie({}));
  }
  return ie = {
    get basename() {
      return p;
    },
    get future() {
      return g;
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
    initialize: rt,
    subscribe: Ze,
    enableScrollRestoration: Ue,
    navigate: It,
    fetch: Rt,
    revalidate: jt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (O) => t.history.createHref(O),
    encodeLocation: (O) => t.history.encodeLocation(O),
    getFetcher: he,
    resetFetcher: je,
    deleteFetcher: Ce,
    dispose: Ee,
    getBlocker: yn,
    deleteBlocker: qn,
    patchRoutes: hn,
    _internalFetchControllers: Y,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: Sa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(O) {
      Ie(O);
    }
  }, t.unstable_instrumentations && (ie = sN(
    ie,
    t.unstable_instrumentations.map((O) => O.router).filter(Boolean)
  )), ie;
}
function vN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Jf(t, a, s, i, o, u) {
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
  let y = Oc(
    i || ".",
    Dh(f),
    aa(t.pathname, s) || t.pathname,
    u === "path"
  );
  if (i == null && (y.search = t.search, y.hash = t.hash), (i == null || i === "" || i === ".") && m) {
    let p = Lh(y.search);
    if (m.route.index && !p)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(y.search), g = b.getAll("index");
      b.delete("index"), g.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      y.search = w ? `?${w}` : "";
    }
  }
  return s !== "/" && (y.pathname = JE({ basename: s, pathname: y.pathname })), ba(y);
}
function wy(t, a, s) {
  if (!s || !vN(s))
    return { path: a };
  if (s.formMethod && !LN(s.formMethod))
    return {
      path: a,
      error: Wn(405, { method: s.formMethod })
    };
  let i = () => ({
    path: a,
    error: Wn(400, { type: "invalid-body" })
  }), u = (s.formMethod || "get").toUpperCase(), f = Gx(a);
  if (s.body !== void 0) {
    if (s.formEncType === "text/plain") {
      if (!gn(u))
        return i();
      let g = typeof s.body == "string" ? s.body : s.body instanceof FormData || s.body instanceof URLSearchParams ? (
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
          text: g
        }
      };
    } else if (s.formEncType === "application/json") {
      if (!gn(u))
        return i();
      try {
        let g = typeof s.body == "string" ? JSON.parse(s.body) : s.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: s.formEncType,
            formData: void 0,
            json: g,
            text: void 0
          }
        };
      } catch {
        return i();
      }
    }
  }
  Qe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, y;
  if (s.formData)
    m = eh(s.formData), y = s.formData;
  else if (s.body instanceof FormData)
    m = eh(s.body), y = s.body;
  else if (s.body instanceof URLSearchParams)
    m = s.body, y = My(m);
  else if (s.body == null)
    m = new URLSearchParams(), y = new FormData();
  else
    try {
      m = new URLSearchParams(s.body), y = My(m);
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
  return t && b.search && Lh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: ba(b), submission: p };
}
function jy(t, a, s, i, o, u, f, m, y, p, b, g, w, S, j, N, C, T, M, z, R) {
  let H = z ? Vn(z[1]) ? z[1].error : z[1].data : void 0, Q = o.createURL(u.location), ie = o.createURL(y), A;
  if (b && u.errors) {
    let re = Object.keys(u.errors)[0];
    A = f.findIndex((k) => k.route.id === re);
  } else if (z && Vn(z[1])) {
    let re = z[0];
    A = f.findIndex((k) => k.route.id === re) - 1;
  }
  let I = z ? z[1].statusCode : void 0, D = I && I >= 400, q = {
    currentUrl: Q,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ie,
    nextParams: f[0].params,
    ...m,
    actionResult: H,
    actionStatus: I
  }, te = xl(f), X = f.map((re, k) => {
    let { route: $ } = re, F = null;
    if (A != null && k > A)
      F = !1;
    else if ($.lazy)
      F = !0;
    else if (!zh($))
      F = !1;
    else if (b) {
      let { shouldLoad: ne } = Bx(
        $,
        u.loaderData,
        u.errors
      );
      F = ne;
    } else yN(u.loaderData, u.matches[k], re) && (F = !0);
    if (F !== null)
      return Wf(
        s,
        i,
        t,
        y,
        te,
        re,
        p,
        a,
        F
      );
    let Y = !1;
    typeof R == "boolean" ? Y = R : D ? Y = !1 : (g || Q.pathname + Q.search === ie.pathname + ie.search || Q.search !== ie.search || bN(u.matches[k], re)) && (Y = !0);
    let ue = {
      ...q,
      defaultShouldRevalidate: Y
    }, _ = cl(re, ue);
    return Wf(
      s,
      i,
      t,
      y,
      te,
      re,
      p,
      a,
      _,
      ue,
      R
    );
  }), le = [];
  return j.forEach((re, k) => {
    if (b || !f.some((G) => G.route.id === re.routeId) || S.has(k))
      return;
    let $ = u.fetchers.get(k), F = $ && $.state !== "idle" && $.data === void 0, Y = yr(C, re.path, T);
    if (!Y) {
      if (M && F)
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
    let ue = cc(Y, re.path), _ = new AbortController(), ne = Is(
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
        Y,
        ue,
        p,
        a
      );
    else if (F)
      g && (J = Ps(
        s,
        i,
        ne,
        re.path,
        Y,
        ue,
        p,
        a
      ));
    else {
      let G;
      typeof R == "boolean" ? G = R : D ? G = !1 : G = g;
      let U = {
        ...q,
        defaultShouldRevalidate: G
      };
      cl(ue, U) && (J = Ps(
        s,
        i,
        ne,
        re.path,
        Y,
        ue,
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
      match: ue,
      request: ne,
      controller: _
    });
  }), { dsMatches: X, revalidatingFetchers: le };
}
function zh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Bx(t, a, s) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!zh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && t.id in a, o = s != null && s[t.id] !== void 0;
  if (!i && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !o;
  return { shouldLoad: u, renderFallback: u };
}
function yN(t, a, s) {
  let i = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    s.route.id !== a.route.id
  ), o = !t.hasOwnProperty(s.route.id);
  return i || o;
}
function bN(t, a) {
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
function Ey(t, a, s, i, o, u) {
  let f;
  if (t) {
    let p = i[t];
    Qe(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), f = p.children;
  } else
    f = s;
  let m = [], y = [];
  if (a.forEach((p) => {
    let b = f.find(
      (g) => Vx(p, g)
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
      let { existingRoute: b, newRoute: g } = y[p], w = b, [S] = hl(
        [g],
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
function Vx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (s, i) => a.children?.some((o) => Vx(s, o))
  ) ?? !1 : !1;
}
var Ny = /* @__PURE__ */ new WeakMap(), Ix = ({
  key: t,
  route: a,
  manifest: s,
  mapRouteProperties: i
}) => {
  let o = s[a.id];
  if (Qe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = Ny.get(o);
  f || (f = {}, Ny.set(o, f));
  let m = f[t];
  if (m)
    return m;
  let y = (async () => {
    let p = OE(t), g = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      Vt(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (g)
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
}, Cy = /* @__PURE__ */ new WeakMap();
function xN(t, a, s, i, o) {
  let u = s[t.id];
  if (Qe(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = Cy.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let g = (async () => {
      Qe(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let C = $E(j), M = u[j] !== void 0 && // This property isn't static since it should always be updated based
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
    return Cy.set(u, g), g.catch(() => {
    }), {
      lazyRoutePromise: g,
      lazyHandlerPromise: g
    };
  }
  let f = Object.keys(t.lazy), m = [], y;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let g = Ix({
      key: b,
      route: t,
      manifest: s,
      mapRouteProperties: i
    });
    g && (m.push(g), b === a && (y = g));
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
async function Ty(t) {
  let a = t.matches.filter((o) => o.shouldLoad), s = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    s[a[u].route.id] = o;
  }), s;
}
async function SN(t) {
  return t.matches.some((a) => a.route.middleware) ? Hx(t, () => Ty(t)) : Ty(t);
}
function Hx(t, a) {
  return wN(
    t,
    a,
    (i) => {
      if (ON(i))
        throw i;
      return i;
    },
    AN,
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
async function wN(t, a, s, i, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await qx(
    f,
    m,
    a,
    s,
    i,
    o
  );
}
async function qx(t, a, s, i, o, u, f = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = a[f];
  if (!y)
    return await s();
  let [p, b] = y, g, w = async () => {
    if (g)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return g = { value: await qx(
        t,
        a,
        s,
        i,
        o,
        u,
        f + 1
      ) }, g.value;
    } catch (S) {
      return g = { value: await u(S, p, g) }, g.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? i(S) : void 0;
    return o(j) ? j : g ? j ?? g.value : (g = { value: await w() }, g.value);
  } catch (S) {
    return await u(S, p, g);
  }
}
function Fx(t, a, s, i, o) {
  let u = Ix({
    key: "middleware",
    route: i.route,
    manifest: a,
    mapRouteProperties: t
  }), f = xN(
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
function Wf(t, a, s, i, o, u, f, m, y, p = null, b) {
  let g = !1, w = Fx(
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
      return g = !0, p ? typeof b == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: S
      }) : cl(u, p) : y;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: C } = u.route, T = g || y || S && !gn(s.method) && (j || N), M = C && C.length > 0 && !N && !j;
      return T && (gn(s.method) || !M) ? EN({
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
    _lazyPromises: Fx(
      t,
      a,
      s,
      p,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Wf(
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
async function jN(t, a, s, i, o, u, f) {
  i.some((b) => b._lazyPromises?.middleware) && await Promise.all(i.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Yx(a, s),
    unstable_pattern: xl(i),
    params: i[0].params,
    context: u,
    matches: i
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let g = m;
      return Hx(g, () => b({
        ...g,
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
async function EN({
  request: t,
  path: a,
  unstable_pattern: s,
  match: i,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: m
}) {
  let y, p, b = gn(t.method), g = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((M, z) => j = z);
    p = () => j(), t.signal.addEventListener("abort", p);
    let C = (M) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${i.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Yx(t, a),
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
        else if (g === "action") {
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
async function NN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function CN(t) {
  let { result: a, type: s } = t;
  if (Oh(a)) {
    let i;
    try {
      i = await NN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return s === "error" ? {
      type: "error",
      error: new Lc(a.status, a.statusText, i),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: i,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return s === "error" ? zy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: MN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : zy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function TN(t, a, s, i, o) {
  let u = t.headers.get("Location");
  if (Qe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Ah(u)) {
    let f = i.slice(
      0,
      i.findIndex((m) => m.route.id === s) + 1
    );
    u = Jf(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var Ry = [
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
function _y(t, a, s, i) {
  if (Ah(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Ry.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = aa(u.pathname, s) != null;
    if (u.origin === a.origin && f)
      return kh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = i.createURL(t);
    if (Ry.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Is(t, a, s, i) {
  let o = t.createURL(Gx(a)).toString(), u = { signal: s };
  if (i && gn(i.formMethod)) {
    let { formMethod: f, formEncType: m } = i;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(i.json)) : m === "text/plain" ? u.body = i.text : m === "application/x-www-form-urlencoded" && i.formData ? u.body = eh(i.formData) : u.body = i.formData;
  }
  return new Request(o, u);
}
function Yx(t, a) {
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
function eh(t) {
  let a = new URLSearchParams();
  for (let [s, i] of t.entries())
    a.append(s, typeof i == "string" ? i : i.name);
  return a;
}
function My(t) {
  let a = new FormData();
  for (let [s, i] of t.entries())
    a.append(s, i);
  return a;
}
function RN(t, a, s, i = !1, o = !1) {
  let u = {}, f = null, m, y = !1, p = {}, b = s && Vn(s[1]) ? s[1].error : void 0;
  return t.forEach((g) => {
    if (!(g.route.id in a))
      return;
    let w = g.route.id, S = a[w];
    if (Qe(
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
      i || (u[w] = Ux), y || (y = !0, m = ml(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !y && (m = S.statusCode), S.headers && (p[w] = S.headers);
  }), b !== void 0 && s && (f = { [s[0]]: b }, s[2] && (u[s[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Ay(t, a, s, i, o, u) {
  let { loaderData: f, errors: m } = RN(
    a,
    s,
    i
  );
  return o.filter((y) => !y.matches || y.matches.some((p) => p.shouldLoad)).forEach((y) => {
    let { key: p, match: b, controller: g } = y;
    if (g && g.signal.aborted)
      return;
    let w = u[p];
    if (Qe(w, "Did not find corresponding fetcher result"), Vn(w)) {
      let S = br(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Gr(w))
      Qe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: f, errors: m };
}
function Dy(t, a, s, i) {
  let o = Object.entries(a).filter(([, u]) => u !== Ux).reduce((u, [f, m]) => (u[f] = m, u), {});
  for (let u of s) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), i && i.hasOwnProperty(f))
      break;
  }
  return o;
}
function ky(t) {
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
  return t === 400 ? (f = "Bad Request", i && a && s ? m = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${s}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", m = `Route "${s}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", i && a && s ? m = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${s}", so there is no way to handle the request.` : i && (m = `Invalid request method "${i.toUpperCase()}"`)), new Lc(
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
function Gx(t) {
  let a = typeof t == "string" ? da(t) : t;
  return ba({ ...a, hash: "" });
}
function _N(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function MN(t) {
  return new Lc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function AN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, s]) => typeof a == "string" && DN(s)
  );
}
function DN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function kN(t) {
  return Oh(t.result) && Lx.has(t.result.status);
}
function Vn(t) {
  return t.type === "error";
}
function Gr(t) {
  return (t && t.type) === "redirect";
}
function zy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Oh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function zN(t) {
  return Lx.has(t);
}
function ON(t) {
  return Oh(t) && zN(t.status) && t.headers.has("Location");
}
function LN(t) {
  return fN.has(t.toUpperCase());
}
function gn(t) {
  return uN.has(t.toUpperCase());
}
function Lh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function cc(t, a) {
  let s = typeof a == "string" ? da(a).search : a.search;
  if (t[t.length - 1].route.index && Lh(s || ""))
    return t[t.length - 1];
  let i = Ax(t);
  return i[i.length - 1];
}
function Oy(t) {
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
function df(t, a) {
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
function $N(t, a) {
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
function UN(t, a) {
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
function BN(t, a) {
  try {
    let s = t.sessionStorage.getItem(
      $x
    );
    if (s) {
      let i = JSON.parse(s);
      for (let [o, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function VN(t, a) {
  if (a.size > 0) {
    let s = {};
    for (let [i, o] of a)
      s[i] = [...o];
    try {
      t.sessionStorage.setItem(
        $x,
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
function Ly() {
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
var es = v.createContext(null);
es.displayName = "DataRouter";
var Sl = v.createContext(null);
Sl.displayName = "DataRouterState";
var Px = v.createContext(!1);
function Kx() {
  return v.useContext(Px);
}
var $h = v.createContext({
  isTransitioning: !1
});
$h.displayName = "ViewTransition";
var Xx = v.createContext(
  /* @__PURE__ */ new Map()
);
Xx.displayName = "Fetchers";
var IN = v.createContext(null);
IN.displayName = "Await";
var ra = v.createContext(
  null
);
ra.displayName = "Navigation";
var $c = v.createContext(
  null
);
$c.displayName = "Location";
var Ha = v.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ha.displayName = "Route";
var Uh = v.createContext(null);
Uh.displayName = "RouteError";
var Qx = "REACT_ROUTER_ERROR", HN = "REDIRECT", qN = "ROUTE_ERROR_RESPONSE";
function FN(t) {
  if (t.startsWith(`${Qx}:${HN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function YN(t) {
  if (t.startsWith(
    `${Qx}:${qN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Lc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function GN(t, { relative: a } = {}) {
  Qe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: i } = v.useContext(ra), { hash: o, pathname: u, search: f } = jl(t, { relative: a }), m = u;
  return s !== "/" && (m = u === "/" ? s : ea([s, u])), i.createHref({ pathname: m, search: f, hash: o });
}
function wl() {
  return v.useContext($c) != null;
}
function qa() {
  return Qe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), v.useContext($c).location;
}
var Zx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Jx(t) {
  v.useContext(ra).static || v.useLayoutEffect(t);
}
function ei() {
  let { isDataRoute: t } = v.useContext(Ha);
  return t ? rC() : PN();
}
function PN() {
  Qe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = v.useContext(es), { basename: a, navigator: s } = v.useContext(ra), { matches: i } = v.useContext(Ha), { pathname: o } = qa(), u = JSON.stringify(Dh(i)), f = v.useRef(!1);
  return Jx(() => {
    f.current = !0;
  }), v.useCallback(
    (y, p = {}) => {
      if (Vt(f.current, Zx), !f.current) return;
      if (typeof y == "number") {
        s.go(y);
        return;
      }
      let b = Oc(
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
v.createContext(null);
function jl(t, { relative: a } = {}) {
  let { matches: s } = v.useContext(Ha), { pathname: i } = qa(), o = JSON.stringify(Dh(s));
  return v.useMemo(
    () => Oc(
      t,
      JSON.parse(o),
      i,
      a === "path"
    ),
    [t, o, i, a]
  );
}
function KN(t, a, s) {
  Qe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: i } = v.useContext(ra), { matches: o } = v.useContext(Ha), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", y = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let C = p && p.path || "";
    t1(
      m,
      !p || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let b = qa(), g;
  g = b;
  let w = g.pathname || "/", S = w;
  if (y !== "/") {
    let C = y.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let j = yr(t, { pathname: S });
  return Vt(
    p || j != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), Vt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), WN(
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
function XN() {
  let t = aC(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), s = t instanceof Error ? t.stack : null, i = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: i }, u = { padding: "2px 4px", backgroundColor: i }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ v.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ v.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ v.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ v.createElement("h3", { style: { fontStyle: "italic" } }, a), s ? /* @__PURE__ */ v.createElement("pre", { style: o }, s) : null, f);
}
var QN = /* @__PURE__ */ v.createElement(XN, null), Wx = class extends v.Component {
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
      const s = YN(t.digest);
      s && (t = s);
    }
    let a = t !== void 0 ? /* @__PURE__ */ v.createElement(Ha.Provider, { value: this.props.routeContext }, /* @__PURE__ */ v.createElement(
      Uh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ v.createElement(ZN, { error: t }, a) : a;
  }
};
Wx.contextType = Px;
var ff = /* @__PURE__ */ new WeakMap();
function ZN({
  children: t,
  error: a
}) {
  let { basename: s } = v.useContext(ra);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = FN(a.digest);
    if (i) {
      let o = ff.get(a);
      if (o) throw o;
      let u = kx(i.location, s);
      if (Dx && !ff.get(a))
        if (u.isExternal || i.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: i.replace
            })
          );
          throw ff.set(a, f), f;
        }
      return /* @__PURE__ */ v.createElement(
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
function JN({ routeContext: t, match: a, children: s }) {
  let i = v.useContext(es);
  return i && i.static && i.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ v.createElement(Ha.Provider, { value: t }, s);
}
function WN(t, a = [], s) {
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
      (g) => g.route.id && u?.[g.route.id] !== void 0
    );
    Qe(
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
      let g = o[b];
      if ((g.route.HydrateFallback || g.route.hydrateFallbackElement) && (m = b), g.route.id) {
        let { loaderData: w, errors: S } = i, j = g.route.loader && !w.hasOwnProperty(g.route.id) && (!S || S[g.route.id] === void 0);
        if (g.route.lazy || j) {
          s.isStatic && (f = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let y = s?.onError, p = i && y ? (b, g) => {
    y(b, {
      location: i.location,
      params: i.matches?.[0]?.params ?? {},
      unstable_pattern: xl(i.matches),
      errorInfo: g
    });
  } : void 0;
  return o.reduceRight(
    (b, g, w) => {
      let S, j = !1, N = null, C = null;
      i && (S = u && g.route.id ? u[g.route.id] : void 0, N = g.route.errorElement || QN, f && (m < 0 && w === 0 ? (t1(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, C = null) : m === w && (j = !0, C = g.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), M = () => {
        let z;
        return S ? z = N : j ? z = C : g.route.Component ? z = /* @__PURE__ */ v.createElement(g.route.Component, null) : g.route.element ? z = g.route.element : z = b, /* @__PURE__ */ v.createElement(
          JN,
          {
            match: g,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: i != null
            },
            children: z
          }
        );
      };
      return i && (g.route.ErrorBoundary || g.route.errorElement || w === 0) ? /* @__PURE__ */ v.createElement(
        Wx,
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
function Bh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function eC(t) {
  let a = v.useContext(es);
  return Qe(a, Bh(t)), a;
}
function e1(t) {
  let a = v.useContext(Sl);
  return Qe(a, Bh(t)), a;
}
function tC(t) {
  let a = v.useContext(Ha);
  return Qe(a, Bh(t)), a;
}
function Uc(t) {
  let a = tC(t), s = a.matches[a.matches.length - 1];
  return Qe(
    s.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), s.route.id;
}
function nC() {
  return Uc(
    "useRouteId"
    /* UseRouteId */
  );
}
function El() {
  let t = e1(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Uc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function aC() {
  let t = v.useContext(Uh), a = e1(
    "useRouteError"
    /* UseRouteError */
  ), s = Uc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[s];
}
function rC() {
  let { router: t } = eC(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Uc(
    "useNavigate"
    /* UseNavigateStable */
  ), s = v.useRef(!1);
  return Jx(() => {
    s.current = !0;
  }), v.useCallback(
    async (o, u = {}) => {
      Vt(s.current, Zx), s.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var $y = {};
function t1(t, a, s) {
  !a && !$y[t] && ($y[t] = !0, Vt(!1, s));
}
var Uy = {};
function By(t, a) {
  !t && !Uy[a] && (Uy[a] = !0, console.warn(a));
}
var sC = "useOptimistic", Vy = wE[sC], iC = () => {
};
function lC(t) {
  return Vy ? Vy(t) : [t, iC];
}
function oC(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Vt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: v.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Vt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: v.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Vt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: v.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var cC = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function uC(t, a) {
  return gN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: AE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: cC,
    mapRouteProperties: oC,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var dC = class {
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
function fC({
  router: t,
  flushSync: a,
  onError: s,
  unstable_useTransitions: i
}) {
  i = Kx() || i;
  let [u, f] = v.useState(t.state), [m, y] = lC(u), [p, b] = v.useState(), [g, w] = v.useState({
    isTransitioning: !1
  }), [S, j] = v.useState(), [N, C] = v.useState(), [T, M] = v.useState(), z = v.useRef(/* @__PURE__ */ new Map()), R = v.useCallback(
    (I, { deletedFetchers: D, newErrors: q, flushSync: te, viewTransitionOpts: X }) => {
      q && s && Object.values(q).forEach(
        (re) => s(re, {
          location: I.location,
          params: I.matches[0]?.params ?? {},
          unstable_pattern: xl(I.matches)
        })
      ), I.fetchers.forEach((re, k) => {
        re.data !== void 0 && z.current.set(k, re.data);
      }), D.forEach((re) => z.current.delete(re)), By(
        te === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (By(
        X == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !X || !le) {
        a && te ? a(() => f(I)) : i === !1 ? f(I) : v.startTransition(() => {
          i === !0 && y((re) => Iy(re, I)), f(I);
        });
        return;
      }
      if (a && te) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: X.currentLocation,
            nextLocation: X.nextLocation
          });
        });
        let re = t.window.document.startViewTransition(() => {
          a(() => f(I));
        });
        re.finished.finally(() => {
          a(() => {
            j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(re));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), M({
        state: I,
        currentLocation: X.currentLocation,
        nextLocation: X.nextLocation
      })) : (b(I), w({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: X.currentLocation,
        nextLocation: X.nextLocation
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
  v.useLayoutEffect(() => t.subscribe(R), [t, R]);
  let H = m.initialized;
  v.useLayoutEffect(() => {
    !H && t.state.initialized && R(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [H, R, t.state]), v.useEffect(() => {
    g.isTransitioning && !g.flushSync && j(new dC());
  }, [g]), v.useEffect(() => {
    if (S && p && t.window) {
      let I = p, D = S.promise, q = t.window.document.startViewTransition(async () => {
        i === !1 ? f(I) : v.startTransition(() => {
          i === !0 && y((te) => Iy(te, I)), f(I);
        }), await D;
      });
      q.finished.finally(() => {
        j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
      }), C(q);
    }
  }, [
    p,
    S,
    t.window,
    i,
    y
  ]), v.useEffect(() => {
    S && p && m.location.key === p.location.key && S.resolve();
  }, [S, N, m.location, p]), v.useEffect(() => {
    !g.isTransitioning && T && (b(T.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), M(void 0));
  }, [g.isTransitioning, T]);
  let Q = v.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (I) => t.navigate(I),
    push: (I, D, q) => t.navigate(I, {
      state: D,
      preventScrollReset: q?.preventScrollReset
    }),
    replace: (I, D, q) => t.navigate(I, {
      replace: !0,
      state: D,
      preventScrollReset: q?.preventScrollReset
    })
  }), [t]), ie = t.basename || "/", A = v.useMemo(
    () => ({
      router: t,
      navigator: Q,
      static: !1,
      basename: ie,
      onError: s
    }),
    [t, Q, ie, s]
  );
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(es.Provider, { value: A }, /* @__PURE__ */ v.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ v.createElement(Xx.Provider, { value: z.current }, /* @__PURE__ */ v.createElement($h.Provider, { value: g }, /* @__PURE__ */ v.createElement(
    pC,
    {
      basename: ie,
      location: m.location,
      navigationType: m.historyAction,
      navigator: Q,
      unstable_useTransitions: i
    },
    /* @__PURE__ */ v.createElement(
      hC,
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
function Iy(t, a) {
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
var hC = v.memo(mC);
function mC({
  routes: t,
  future: a,
  state: s,
  isStatic: i,
  onError: o
}) {
  return KN(t, void 0, { state: s, isStatic: i, onError: o });
}
function pC({
  basename: t = "/",
  children: a = null,
  location: s,
  navigationType: i = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  Qe(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), y = v.useMemo(
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
    hash: g = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = s, N = v.useMemo(() => {
    let C = aa(p, m);
    return C == null ? null : {
      location: {
        pathname: C,
        search: b,
        hash: g,
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
    g,
    w,
    S,
    i,
    j
  ]);
  return Vt(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${g}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ v.createElement(ra.Provider, { value: y }, /* @__PURE__ */ v.createElement($c.Provider, { children: a, value: N }));
}
var uc = "get", dc = "application/x-www-form-urlencoded";
function Bc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function gC(t) {
  return Bc(t) && t.tagName.toLowerCase() === "button";
}
function vC(t) {
  return Bc(t) && t.tagName.toLowerCase() === "form";
}
function yC(t) {
  return Bc(t) && t.tagName.toLowerCase() === "input";
}
function bC(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function xC(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !bC(t);
}
var qo = null;
function SC() {
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
var wC = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function hf(t) {
  return t != null && !wC.has(t) ? (Vt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${dc}"`
  ), null) : t;
}
function jC(t, a) {
  let s, i, o, u, f;
  if (vC(t)) {
    let m = t.getAttribute("action");
    i = m ? aa(m, a) : null, s = t.getAttribute("method") || uc, o = hf(t.getAttribute("enctype")) || dc, u = new FormData(t);
  } else if (gC(t) || yC(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = t.getAttribute("formaction") || m.getAttribute("action");
    if (i = y ? aa(y, a) : null, s = t.getAttribute("formmethod") || m.getAttribute("method") || uc, o = hf(t.getAttribute("formenctype")) || hf(m.getAttribute("enctype")) || dc, u = new FormData(m, t), !SC()) {
      let { name: p, type: b, value: g } = t;
      if (b === "image") {
        let w = p ? `${p}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else p && u.append(p, g);
    }
  } else {
    if (Bc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    s = uc, i = null, o = dc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: i, method: s.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Vh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function n1(t, a, s, i) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return s ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${i}` : o.pathname = `${o.pathname}.${i}` : o.pathname === "/" ? o.pathname = `_root.${i}` : a && aa(o.pathname, a) === "/" ? o.pathname = `${bc(a)}/_root.${i}` : o.pathname = `${bc(o.pathname)}.${i}`, o;
}
async function EC(t, a) {
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
function NC(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function CC(t, a, s) {
  let i = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await EC(u, s);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return MC(
    i.flat(1).filter(NC).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Hy(t, a, s, i, o, u) {
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
      let g = y.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: s[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: y.params,
        defaultShouldRevalidate: !0
      });
      if (typeof g == "boolean")
        return g;
    }
    return !0;
  }) : [];
}
function TC(t, a, { includeHydrateFallback: s } = {}) {
  return RC(
    t.map((i) => {
      let o = a.routes[i.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), s && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function RC(t) {
  return [...new Set(t)];
}
function _C(t) {
  let a = {}, s = Object.keys(t).sort();
  for (let i of s)
    a[i] = t[i];
  return a;
}
function MC(t, a) {
  let s = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((i, o) => {
    let u = JSON.stringify(_C(o));
    return s.has(u) || (s.add(u), i.push({ key: u, link: o })), i;
  }, []);
}
function Ih() {
  let t = v.useContext(es);
  return Vh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function AC() {
  let t = v.useContext(Sl);
  return Vh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Hh = v.createContext(void 0);
Hh.displayName = "FrameworkContext";
function qh() {
  let t = v.useContext(Hh);
  return Vh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function DC(t, a) {
  let s = v.useContext(Hh), [i, o] = v.useState(!1), [u, f] = v.useState(!1), { onFocus: m, onBlur: y, onMouseEnter: p, onMouseLeave: b, onTouchStart: g } = a, w = v.useRef(null);
  v.useEffect(() => {
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
  }, [t]), v.useEffect(() => {
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
      onTouchStart: Ji(g, S)
    }
  ] : [!1, w, {}];
}
function Ji(t, a) {
  return (s) => {
    t && t(s), s.defaultPrevented || a(s);
  };
}
function kC({ page: t, ...a }) {
  let s = Kx(), { router: i } = Ih(), o = v.useMemo(
    () => yr(i.routes, t, i.basename),
    [i.routes, t, i.basename]
  );
  return o ? s ? /* @__PURE__ */ v.createElement(OC, { page: t, matches: o, ...a }) : /* @__PURE__ */ v.createElement(LC, { page: t, matches: o, ...a }) : null;
}
function zC(t) {
  let { manifest: a, routeModules: s } = qh(), [i, o] = v.useState([]);
  return v.useEffect(() => {
    let u = !1;
    return CC(t, a, s).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, s]), i;
}
function OC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o } = qh(), { basename: u } = Ih(), f = v.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let m = n1(
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
  return /* @__PURE__ */ v.createElement(v.Fragment, null, f.map((m) => /* @__PURE__ */ v.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...s })));
}
function LC({
  page: t,
  matches: a,
  ...s
}) {
  let i = qa(), { future: o, manifest: u, routeModules: f } = qh(), { basename: m } = Ih(), { loaderData: y, matches: p } = AC(), b = v.useMemo(
    () => Hy(
      t,
      a,
      p,
      u,
      i,
      "data"
    ),
    [t, a, p, u, i]
  ), g = v.useMemo(
    () => Hy(
      t,
      a,
      p,
      u,
      i,
      "assets"
    ),
    [t, a, p, u, i]
  ), w = v.useMemo(() => {
    if (t === i.pathname + i.search + i.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((M) => {
      let z = u.routes[M.route.id];
      !z || !z.hasLoader || (!b.some((R) => R.route.id === M.route.id) && M.route.id in y && f[M.route.id]?.shouldRevalidate || z.hasClientLoader ? C = !0 : N.add(M.route.id));
    }), N.size === 0)
      return [];
    let T = n1(
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
  ]), S = v.useMemo(
    () => TC(g, u),
    [g, u]
  ), j = zC(g);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, w.map((N) => /* @__PURE__ */ v.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...s })), S.map((N) => /* @__PURE__ */ v.createElement("link", { key: N, rel: "modulepreload", href: N, ...s })), j.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ v.createElement(
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
function $C(...t) {
  return (a) => {
    t.forEach((s) => {
      typeof s == "function" ? s(a) : s != null && (s.current = a);
    });
  };
}
var UC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  UC && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var a1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Fh = v.forwardRef(
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
    preventScrollReset: g,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: C, navigator: T, unstable_useTransitions: M } = v.useContext(ra), z = typeof b == "string" && a1.test(b), R = kx(b, C);
    b = R.to;
    let H = GN(b, { relative: o }), Q = qa(), ie = null;
    if (m) {
      let re = Oc(
        m,
        [],
        Q.unstable_mask ? Q.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (re.pathname = re.pathname === "/" ? C : ea([C, re.pathname])), ie = T.createHref(re);
    }
    let [A, I, D] = DC(
      i,
      j
    ), q = HC(b, {
      replace: f,
      unstable_mask: m,
      state: y,
      target: p,
      preventScrollReset: g,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: M
    });
    function te(re) {
      a && a(re), re.defaultPrevented || q(re);
    }
    let X = !(R.isExternal || u), le = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ v.createElement(
        "a",
        {
          ...j,
          ...D,
          href: (X ? ie : void 0) || R.absoluteURL || H,
          onClick: X ? te : a,
          ref: $C(N, I),
          target: p,
          "data-discover": !z && s === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ v.createElement(v.Fragment, null, le, /* @__PURE__ */ v.createElement(kC, { page: H })) : le;
  }
);
Fh.displayName = "Link";
var BC = v.forwardRef(
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
    let g = jl(f, { relative: p.relative }), w = qa(), S = v.useContext(Sl), { navigator: j, basename: N } = v.useContext(ra), C = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    PC(g) && m === !0, T = j.encodeLocation ? j.encodeLocation(g).pathname : g.pathname, M = w.pathname, z = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    s || (M = M.toLowerCase(), z = z ? z.toLowerCase() : null, T = T.toLowerCase()), z && N && (z = aa(z, N) || z);
    const R = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let H = M === T || !o && M.startsWith(T) && M.charAt(R) === "/", Q = z != null && (z === T || !o && z.startsWith(T) && z.charAt(T.length) === "/"), ie = {
      isActive: H,
      isPending: Q,
      isTransitioning: C
    }, A = H ? a : void 0, I;
    typeof i == "function" ? I = i(ie) : I = [
      i,
      H ? "active" : null,
      Q ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let D = typeof u == "function" ? u(ie) : u;
    return /* @__PURE__ */ v.createElement(
      Fh,
      {
        ...p,
        "aria-current": A,
        className: I,
        ref: b,
        style: D,
        to: f,
        viewTransition: m
      },
      typeof y == "function" ? y(ie) : y
    );
  }
);
BC.displayName = "NavLink";
var VC = v.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: s,
    reloadDocument: i,
    replace: o,
    state: u,
    method: f = uc,
    action: m,
    onSubmit: y,
    relative: p,
    preventScrollReset: b,
    viewTransition: g,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = v.useContext(ra), C = YC(), T = GC(m, { relative: p }), M = f.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && a1.test(m), R = (H) => {
      if (y && y(H), H.defaultPrevented) return;
      H.preventDefault();
      let Q = H.nativeEvent.submitter, ie = Q?.getAttribute("formmethod") || f, A = () => C(Q || H.currentTarget, {
        fetcherKey: a,
        method: ie,
        navigate: s,
        replace: o,
        state: u,
        relative: p,
        preventScrollReset: b,
        viewTransition: g,
        unstable_defaultShouldRevalidate: w
      });
      N && s !== !1 ? v.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ v.createElement(
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
VC.displayName = "Form";
function IC(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function r1(t) {
  let a = v.useContext(es);
  return Qe(a, IC(t)), a;
}
function HC(t, {
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
  let b = ei(), g = qa(), w = jl(t, { relative: f });
  return v.useCallback(
    (S) => {
      if (xC(S, a)) {
        S.preventDefault();
        let j = s !== void 0 ? s : ba(g) === ba(w), N = () => b(t, {
          replace: j,
          unstable_mask: i,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: m,
          unstable_defaultShouldRevalidate: y
        });
        p ? v.startTransition(() => N()) : N();
      }
    },
    [
      g,
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
var qC = 0, FC = () => `__${String(++qC)}__`;
function YC() {
  let { router: t } = r1(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = v.useContext(ra), s = nC(), i = t.fetch, o = t.navigate;
  return v.useCallback(
    async (u, f = {}) => {
      let { action: m, method: y, encType: p, formData: b, body: g } = jC(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || FC();
        await i(w, s, f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: g,
          formMethod: f.method || y,
          formEncType: f.encType || p,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: g,
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
function GC(t, { relative: a } = {}) {
  let { basename: s } = v.useContext(ra), i = v.useContext(Ha);
  Qe(i, "useFormAction must be used inside a RouteContext");
  let [o] = i.matches.slice(-1), u = { ...jl(t || ".", { relative: a }) }, f = qa();
  if (t == null) {
    u.search = f.search;
    let m = new URLSearchParams(u.search), y = m.getAll("index");
    if (y.some((b) => b === "")) {
      m.delete("index"), y.filter((g) => g).forEach((g) => m.append("index", g));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), s !== "/" && (u.pathname = u.pathname === "/" ? s : ea([s, u.pathname])), ba(u);
}
function PC(t, { relative: a } = {}) {
  let s = v.useContext($h);
  Qe(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = r1(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!s.isTransitioning)
    return !1;
  let u = aa(s.currentLocation.pathname, i) || s.currentLocation.pathname, f = aa(s.nextLocation.pathname, i) || s.nextLocation.pathname;
  return yc(o.pathname, f) != null || yc(o.pathname, u) != null;
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
function KC(t, a, s) {
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
async function XC() {
  return wt("/deployments");
}
async function qy(t) {
  return wt(`/deployments/${t}`);
}
async function QC(t, a) {
  return wt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Fy(t) {
  return wt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Yh(t, a) {
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
async function s1(t, a) {
  await wt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ZC(t) {
  return wt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function JC(t, a, s = "error") {
  return wt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: s })
  });
}
async function WC(t, a = {}) {
  const s = new URLSearchParams();
  a.limit && s.set("limit", String(a.limit)), a.status && s.set("status", a.status);
  const i = s.toString(), o = i ? `?${i}` : "";
  return wt(`/deployments/${t}/runs${o}`);
}
async function eT(t, a) {
  return wt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Gh(t, a) {
  return wt(`/deployments/${t}/runs/${a}`);
}
async function tT(t, a) {
  return wt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function i1(t, a) {
  return wt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function nT(t, a) {
  return wt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Yy(t, a, s, i) {
  return KC(
    `/deployments/${t}/runs/${a}/progress`,
    s,
    i
  );
}
async function Xs(t) {
  return wt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function xc(t, a, s, i, o) {
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
async function aT(t, a) {
  await wt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function rT(t, a, s) {
  return wt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: s })
    }
  );
}
function sT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${xa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function iT(t) {
  return wt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var lT = "mux0i60", oT = "mux0i61", cT = "mux0i62", uT = "mux0i63";
function Vc({ count: t = "0", title: a, hint: s }) {
  return /* @__PURE__ */ c.jsxs("div", { className: lT, children: [
    /* @__PURE__ */ c.jsx("span", { className: oT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: cT, children: a }),
    s ? /* @__PURE__ */ c.jsx("p", { className: uT, children: s }) : null
  ] });
}
var dT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, fT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, hT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, mT = "zwn3019";
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
  const y = [dT[t], hT[a], fT[s], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(i, { className: y, style: f, "data-elevation": s, ...m, children: o });
}
function pT({ children: t, className: a }) {
  const s = [mT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, children: t });
}
var Xr = "vrkn5p0", gT = "_93p6291", vT = "_93p6292", yT = "_93p6293", bT = "_93p6294", xT = "_93p6295", ST = "_93p6296", wT = "_93p6297", jT = "_93p6298", ET = "_93p6299", NT = "_93p629a", CT = "_93p629b", TT = "_93p629c", RT = "_93p629d", _T = "_93p629e";
const MT = "nexus-host-navigate";
function AT(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function DT(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const s = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(MT, {
      detail: s
    })
  );
}
function kT() {
  const { deployments: t } = El(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: gT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: vT, children: [
      /* @__PURE__ */ c.jsx("p", { className: yT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: bT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: xT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: ST, children: [
        /* @__PURE__ */ c.jsx("span", { className: wT, children: t.length }),
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
        className: jT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Vc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: ET, children: t.map((s) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: AT(s.deploymentId),
              onClick: (i) => DT(i, s.deploymentId),
              className: NT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: CT, "aria-hidden": "true", children: zT(s.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: TT, children: s.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: RT, children: s.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: _T, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, s.deploymentId)) })
        ]
      }
    )
  ] });
}
function zT(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Ph = Cx();
const OT = /* @__PURE__ */ Nx(Ph);
function LT(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
}
const $T = (t) => {
  switch (t) {
    case "success":
      return VT;
    case "info":
      return HT;
    case "warning":
      return IT;
    case "error":
      return qT;
    default:
      return null;
  }
}, UT = Array(12).fill(0), BT = ({ visible: t, className: a }) => /* @__PURE__ */ xe.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-spinner"
}, UT.map((s, i) => /* @__PURE__ */ xe.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${i}`
})))), VT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), IT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), HT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), qT = /* @__PURE__ */ xe.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ xe.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), FT = /* @__PURE__ */ xe.createElement("svg", {
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
})), YT = () => {
  const [t, a] = xe.useState(document.hidden);
  return xe.useEffect(() => {
    const s = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", s), () => window.removeEventListener("visibilitychange", s);
  }, []), t;
};
let th = 1;
class GT {
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
      const { message: i, ...o } = a, u = typeof a?.id == "number" || ((s = a.id) == null ? void 0 : s.length) > 0 ? a.id : th++, f = this.toasts.find((y) => y.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (KT(p) && !p.ok) {
          u = !1;
          const g = typeof s.error == "function" ? await s.error(`HTTP error! status: ${p.status}`) : s.error, w = typeof s.description == "function" ? await s.description(`HTTP error! status: ${p.status}`) : s.description, j = typeof g == "object" && !xe.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (p instanceof Error) {
          u = !1;
          const g = typeof s.error == "function" ? await s.error(p) : s.error, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof g == "object" && !xe.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: i,
            type: "error",
            description: w,
            ...j
          });
        } else if (s.success !== void 0) {
          u = !1;
          const g = typeof s.success == "function" ? await s.success(p) : s.success, w = typeof s.description == "function" ? await s.description(p) : s.description, j = typeof g == "object" && !xe.isValidElement(g) ? g : {
            message: g
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
          const b = typeof s.error == "function" ? await s.error(p) : s.error, g = typeof s.description == "function" ? await s.description(p) : s.description, S = typeof b == "object" && !xe.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: i,
            type: "error",
            description: g,
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
      const i = s?.id || th++;
      return this.create({
        jsx: a(i),
        id: i,
        ...s
      }), i;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Tn = new GT(), PT = (t, a) => {
  const s = a?.id || th++;
  return Tn.addToast({
    title: t,
    ...a,
    id: s
  }), s;
}, KT = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", XT = PT, QT = () => Tn.toasts, ZT = () => Tn.getActiveToasts(), cn = Object.assign(XT, {
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
  getHistory: QT,
  getToasts: ZT
});
LT("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Fo(t) {
  return t.label !== void 0;
}
const JT = 3, WT = "24px", eR = "16px", Gy = 4e3, tR = 356, nR = 14, aR = 45, rR = 200;
function ya(...t) {
  return t.filter(Boolean).join(" ");
}
function sR(t) {
  const [a, s] = t.split("-"), i = [];
  return a && i.push(a), s && i.push(s), i;
}
const iR = (t) => {
  var a, s, i, o, u, f, m, y, p;
  const { invert: b, toast: g, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: C, index: T, toasts: M, expanded: z, removeToast: R, defaultRichColors: H, closeButton: Q, style: ie, cancelButtonStyle: A, actionButtonStyle: I, className: D = "", descriptionClassName: q = "", duration: te, position: X, gap: le, expandByDefault: re, classNames: k, icons: $, closeButtonAriaLabel: F = "Close toast" } = t, [Y, ue] = xe.useState(null), [_, ne] = xe.useState(null), [J, G] = xe.useState(!1), [U, W] = xe.useState(!1), [de, ve] = xe.useState(!1), [Te, rt] = xe.useState(!1), [Ee, Ze] = xe.useState(!1), [Ie, Ve] = xe.useState(0), [It, jt] = xe.useState(0), Dt = xe.useRef(g.duration || te || Gy), Mn = xe.useRef(null), dt = xe.useRef(null), Qt = T === 0, un = T + 1 <= N, Rt = g.type, tn = g.dismissible !== !1, _t = g.className || "", V = g.descriptionClassName || "", ce = xe.useMemo(() => C.findIndex((Ue) => Ue.toastId === g.id) || 0, [
    C,
    g.id
  ]), ye = xe.useMemo(() => {
    var Ue;
    return (Ue = g.closeButton) != null ? Ue : Q;
  }, [
    g.closeButton,
    Q
  ]), ze = xe.useMemo(() => g.duration || te || Gy, [
    g.duration,
    te
  ]), Fe = xe.useRef(0), st = xe.useRef(0), he = xe.useRef(0), je = xe.useRef(null), [Oe, Ce] = X.split("-"), ft = xe.useMemo(() => C.reduce((Ue, ct, zt) => zt >= ce ? Ue : Ue + ct.height, 0), [
    C,
    ce
  ]), He = YT(), dn = g.invert || b, Hn = Rt === "loading";
  st.current = xe.useMemo(() => ce * le + ft, [
    ce,
    ft
  ]), xe.useEffect(() => {
    Dt.current = ze;
  }, [
    ze
  ]), xe.useEffect(() => {
    G(!0);
  }, []), xe.useEffect(() => {
    const Ue = dt.current;
    if (Ue) {
      const ct = Ue.getBoundingClientRect().height;
      return jt(ct), j((zt) => [
        {
          toastId: g.id,
          height: ct,
          position: g.position
        },
        ...zt
      ]), () => j((zt) => zt.filter((Zt) => Zt.toastId !== g.id));
    }
  }, [
    j,
    g.id
  ]), xe.useLayoutEffect(() => {
    if (!J) return;
    const Ue = dt.current, ct = Ue.style.height;
    Ue.style.height = "auto";
    const zt = Ue.getBoundingClientRect().height;
    Ue.style.height = ct, jt(zt), j((Zt) => Zt.find((pt) => pt.toastId === g.id) ? Zt.map((pt) => pt.toastId === g.id ? {
      ...pt,
      height: zt
    } : pt) : [
      {
        toastId: g.id,
        height: zt,
        position: g.position
      },
      ...Zt
    ]);
  }, [
    J,
    g.title,
    g.description,
    j,
    g.id,
    g.jsx,
    g.action,
    g.cancel
  ]);
  const yn = xe.useCallback(() => {
    W(!0), Ve(st.current), j((Ue) => Ue.filter((ct) => ct.toastId !== g.id)), setTimeout(() => {
      R(g);
    }, rR);
  }, [
    g,
    R,
    j,
    st
  ]);
  xe.useEffect(() => {
    if (g.promise && Rt === "loading" || g.duration === 1 / 0 || g.type === "loading") return;
    let Ue;
    return z || S || He ? (() => {
      if (he.current < Fe.current) {
        const Zt = (/* @__PURE__ */ new Date()).getTime() - Fe.current;
        Dt.current = Dt.current - Zt;
      }
      he.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      Dt.current !== 1 / 0 && (Fe.current = (/* @__PURE__ */ new Date()).getTime(), Ue = setTimeout(() => {
        g.onAutoClose == null || g.onAutoClose.call(g, g), yn();
      }, Dt.current));
    })(), () => clearTimeout(Ue);
  }, [
    z,
    S,
    g,
    Rt,
    He,
    yn
  ]), xe.useEffect(() => {
    g.delete && (yn(), g.onDismiss == null || g.onDismiss.call(g, g));
  }, [
    yn,
    g.delete
  ]);
  function qn() {
    var Ue;
    if ($?.loading) {
      var ct;
      return /* @__PURE__ */ xe.createElement("div", {
        className: ya(k?.loader, g == null || (ct = g.classNames) == null ? void 0 : ct.loader, "sonner-loader"),
        "data-visible": Rt === "loading"
      }, $.loading);
    }
    return /* @__PURE__ */ xe.createElement(BT, {
      className: ya(k?.loader, g == null || (Ue = g.classNames) == null ? void 0 : Ue.loader),
      visible: Rt === "loading"
    });
  }
  const nn = g.icon || $?.[Rt] || $T(Rt);
  var An, fn;
  return /* @__PURE__ */ xe.createElement("li", {
    tabIndex: 0,
    ref: dt,
    className: ya(D, _t, k?.toast, g == null || (a = g.classNames) == null ? void 0 : a.toast, k?.default, k?.[Rt], g == null || (s = g.classNames) == null ? void 0 : s[Rt]),
    "data-sonner-toast": "",
    "data-rich-colors": (An = g.richColors) != null ? An : H,
    "data-styled": !(g.jsx || g.unstyled || w),
    "data-mounted": J,
    "data-promise": !!g.promise,
    "data-swiped": Ee,
    "data-removed": U,
    "data-visible": un,
    "data-y-position": Oe,
    "data-x-position": Ce,
    "data-index": T,
    "data-front": Qt,
    "data-swiping": de,
    "data-dismissible": tn,
    "data-type": Rt,
    "data-invert": dn,
    "data-swipe-out": Te,
    "data-swipe-direction": _,
    "data-expanded": !!(z || re && J),
    "data-testid": g.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": M.length - T,
      "--offset": `${U ? Ie : st.current}px`,
      "--initial-height": re ? "auto" : `${It}px`,
      ...ie,
      ...g.style
    },
    onDragEnd: () => {
      ve(!1), ue(null), je.current = null;
    },
    onPointerDown: (Ue) => {
      Ue.button !== 2 && (Hn || !tn || (Mn.current = /* @__PURE__ */ new Date(), Ve(st.current), Ue.target.setPointerCapture(Ue.pointerId), Ue.target.tagName !== "BUTTON" && (ve(!0), je.current = {
        x: Ue.clientX,
        y: Ue.clientY
      })));
    },
    onPointerUp: () => {
      var Ue, ct, zt;
      if (Te || !tn) return;
      je.current = null;
      const Zt = Number(((Ue = dt.current) == null ? void 0 : Ue.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), Dn = Number(((ct = dt.current) == null ? void 0 : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), pt = (/* @__PURE__ */ new Date()).getTime() - ((zt = Mn.current) == null ? void 0 : zt.getTime()), an = Y === "x" ? Zt : Dn, Sa = Math.abs(an) / pt;
      if (Math.abs(an) >= aR || Sa > 0.11) {
        Ve(st.current), g.onDismiss == null || g.onDismiss.call(g, g), ne(Y === "x" ? Zt > 0 ? "right" : "left" : Dn > 0 ? "down" : "up"), yn(), rt(!0);
        return;
      } else {
        var hn, O;
        (hn = dt.current) == null || hn.style.setProperty("--swipe-amount-x", "0px"), (O = dt.current) == null || O.style.setProperty("--swipe-amount-y", "0px");
      }
      Ze(!1), ve(!1), ue(null);
    },
    onPointerMove: (Ue) => {
      var ct, zt, Zt;
      if (!je.current || !tn || ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0) return;
      const pt = Ue.clientY - je.current.y, an = Ue.clientX - je.current.x;
      var Sa;
      const hn = (Sa = t.swipeDirections) != null ? Sa : sR(X);
      !Y && (Math.abs(an) > 1 || Math.abs(pt) > 1) && ue(Math.abs(an) > Math.abs(pt) ? "x" : "y");
      let O = {
        x: 0,
        y: 0
      };
      const P = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (Y === "y") {
        if (hn.includes("top") || hn.includes("bottom"))
          if (hn.includes("top") && pt < 0 || hn.includes("bottom") && pt > 0)
            O.y = pt;
          else {
            const Z = pt * P(pt);
            O.y = Math.abs(Z) < Math.abs(pt) ? Z : pt;
          }
      } else if (Y === "x" && (hn.includes("left") || hn.includes("right")))
        if (hn.includes("left") && an < 0 || hn.includes("right") && an > 0)
          O.x = an;
        else {
          const Z = an * P(an);
          O.x = Math.abs(Z) < Math.abs(an) ? Z : an;
        }
      (Math.abs(O.x) > 0 || Math.abs(O.y) > 0) && Ze(!0), (zt = dt.current) == null || zt.style.setProperty("--swipe-amount-x", `${O.x}px`), (Zt = dt.current) == null || Zt.style.setProperty("--swipe-amount-y", `${O.y}px`);
    }
  }, ye && !g.jsx && Rt !== "loading" ? /* @__PURE__ */ xe.createElement("button", {
    "aria-label": F,
    "data-disabled": Hn,
    "data-close-button": !0,
    onClick: Hn || !tn ? () => {
    } : () => {
      yn(), g.onDismiss == null || g.onDismiss.call(g, g);
    },
    className: ya(k?.closeButton, g == null || (i = g.classNames) == null ? void 0 : i.closeButton)
  }, (fn = $?.close) != null ? fn : FT) : null, (Rt || g.icon || g.promise) && g.icon !== null && ($?.[Rt] !== null || g.icon) ? /* @__PURE__ */ xe.createElement("div", {
    "data-icon": "",
    className: ya(k?.icon, g == null || (o = g.classNames) == null ? void 0 : o.icon)
  }, g.promise || g.type === "loading" && !g.icon ? g.icon || qn() : null, g.type !== "loading" ? nn : null) : null, /* @__PURE__ */ xe.createElement("div", {
    "data-content": "",
    className: ya(k?.content, g == null || (u = g.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ xe.createElement("div", {
    "data-title": "",
    className: ya(k?.title, g == null || (f = g.classNames) == null ? void 0 : f.title)
  }, g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title), g.description ? /* @__PURE__ */ xe.createElement("div", {
    "data-description": "",
    className: ya(q, V, k?.description, g == null || (m = g.classNames) == null ? void 0 : m.description)
  }, typeof g.description == "function" ? g.description() : g.description) : null), /* @__PURE__ */ xe.isValidElement(g.cancel) ? g.cancel : g.cancel && Fo(g.cancel) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: g.cancelButtonStyle || A,
    onClick: (Ue) => {
      Fo(g.cancel) && tn && (g.cancel.onClick == null || g.cancel.onClick.call(g.cancel, Ue), yn());
    },
    className: ya(k?.cancelButton, g == null || (y = g.classNames) == null ? void 0 : y.cancelButton)
  }, g.cancel.label) : null, /* @__PURE__ */ xe.isValidElement(g.action) ? g.action : g.action && Fo(g.action) ? /* @__PURE__ */ xe.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: g.actionButtonStyle || I,
    onClick: (Ue) => {
      Fo(g.action) && (g.action.onClick == null || g.action.onClick.call(g.action, Ue), !Ue.defaultPrevented && yn());
    },
    className: ya(k?.actionButton, g == null || (p = g.classNames) == null ? void 0 : p.actionButton)
  }, g.action.label) : null);
};
function Py() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function lR(t, a) {
  const s = {};
  return [
    t,
    a
  ].forEach((i, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? eR : WT;
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
const oR = /* @__PURE__ */ xe.forwardRef(function(a, s) {
  const { id: i, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: y, className: p, offset: b, mobileOffset: g, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: C = JT, toastOptions: T, dir: M = Py(), gap: z = nR, icons: R, containerAriaLabel: H = "Notifications" } = a, [Q, ie] = xe.useState([]), A = xe.useMemo(() => i ? Q.filter((J) => J.toasterId === i) : Q.filter((J) => !J.toasterId), [
    Q,
    i
  ]), I = xe.useMemo(() => Array.from(new Set([
    u
  ].concat(A.filter((J) => J.position).map((J) => J.position)))), [
    A,
    u
  ]), [D, q] = xe.useState([]), [te, X] = xe.useState(!1), [le, re] = xe.useState(!1), [k, $] = xe.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), F = xe.useRef(null), Y = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ue = xe.useRef(null), _ = xe.useRef(!1), ne = xe.useCallback((J) => {
    ie((G) => {
      var U;
      return (U = G.find((W) => W.id === J.id)) != null && U.delete || Tn.dismiss(J.id), G.filter(({ id: W }) => W !== J.id);
    });
  }, []);
  return xe.useEffect(() => Tn.subscribe((J) => {
    if (J.dismiss) {
      requestAnimationFrame(() => {
        ie((G) => G.map((U) => U.id === J.id ? {
          ...U,
          delete: !0
        } : U));
      });
      return;
    }
    setTimeout(() => {
      OT.flushSync(() => {
        ie((G) => {
          const U = G.findIndex((W) => W.id === J.id);
          return U !== -1 ? [
            ...G.slice(0, U),
            {
              ...G[U],
              ...J
            },
            ...G.slice(U + 1)
          ] : [
            J,
            ...G
          ];
        });
      });
    });
  }), [
    Q
  ]), xe.useEffect(() => {
    if (w !== "system") {
      $(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? $("dark") : $("light")), typeof window > "u") return;
    const J = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      J.addEventListener("change", ({ matches: G }) => {
        $(G ? "dark" : "light");
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
    Q.length <= 1 && X(!1);
  }, [
    Q
  ]), xe.useEffect(() => {
    const J = (G) => {
      var U;
      if (f.every((ve) => G[ve] || G.code === ve)) {
        var de;
        X(!0), (de = F.current) == null || de.focus();
      }
      G.code === "Escape" && (document.activeElement === F.current || (U = F.current) != null && U.contains(document.activeElement)) && X(!1);
    };
    return document.addEventListener("keydown", J), () => document.removeEventListener("keydown", J);
  }, [
    f
  ]), xe.useEffect(() => {
    if (F.current)
      return () => {
        ue.current && (ue.current.focus({
          preventScroll: !0
        }), ue.current = null, _.current = !1);
      };
  }, [
    F.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ xe.createElement("section", {
    ref: s,
    "aria-label": `${H} ${Y}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((J, G) => {
    var U;
    const [W, de] = J.split("-");
    return A.length ? /* @__PURE__ */ xe.createElement("ol", {
      key: J,
      dir: M === "auto" ? Py() : M,
      tabIndex: -1,
      ref: F,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": k,
      "data-y-position": W,
      "data-x-position": de,
      style: {
        "--front-toast-height": `${((U = D[0]) == null ? void 0 : U.height) || 0}px`,
        "--width": `${tR}px`,
        "--gap": `${z}px`,
        ...N,
        ...lR(b, g)
      },
      onBlur: (ve) => {
        _.current && !ve.currentTarget.contains(ve.relatedTarget) && (_.current = !1, ue.current && (ue.current.focus({
          preventScroll: !0
        }), ue.current = null));
      },
      onFocus: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || _.current || (_.current = !0, ue.current = ve.relatedTarget);
      },
      onMouseEnter: () => X(!0),
      onMouseMove: () => X(!0),
      onMouseLeave: () => {
        le || X(!1);
      },
      onDragEnd: () => X(!1),
      onPointerDown: (ve) => {
        ve.target instanceof HTMLElement && ve.target.dataset.dismissible === "false" || re(!0);
      },
      onPointerUp: () => re(!1)
    }, A.filter((ve) => !ve.position && G === 0 || ve.position === J).map((ve, Te) => {
      var rt, Ee;
      return /* @__PURE__ */ xe.createElement(iR, {
        key: ve.id,
        icons: R,
        index: Te,
        toast: ve,
        defaultRichColors: S,
        duration: (rt = T?.duration) != null ? rt : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (Ee = T?.closeButton) != null ? Ee : y,
        interacting: le,
        position: J,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: ne,
        toasts: A.filter((Ze) => Ze.position == ve.position),
        heights: D.filter((Ze) => Ze.position == ve.position),
        setHeights: q,
        expandByDefault: m,
        gap: z,
        expanded: te,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Ky = 32, Xy = -30, Qy = -6, Zy = 0.5, Jy = 2, Wy = -24, e0 = 24, t0 = -12, n0 = 12, a0 = -12, r0 = 12, s0 = -60, i0 = -20;
class Qs extends Error {
  constructor(a, s) {
    super(s), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function l1(t, a, s, i = {}) {
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
    throw new Error(await Ic(f, "apply"));
  return await f.json();
}
async function cR(t, a, s, i, o = {}) {
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
    throw new Error(await Ic(m, "apply"));
  return await m.json();
}
async function uR(t, a, s = {}) {
  const i = `${xa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(i, {
    method: "DELETE",
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function dR(t, a, s, i = {}) {
  const o = `${xa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: s }),
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Ic(u, "preview"));
  return u.blob();
}
async function fc(t, a, s, i = 50, o = {}) {
  const u = `${xa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(s)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(i))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Ic(f, "audit fetch"));
  return await f.json();
}
function _n() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function o1(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Ky)
    return {
      message: `Chain exceeds the maximum of ${Ky} operations.`
    };
  for (const s of t.ops) {
    const i = fR(s, a);
    if (i) return i;
  }
  return null;
}
function fR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return hR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Xy || t.target_lufs > Qy ? {
        opId: t.id,
        message: `Normalize target must be between ${Xy} and ${Qy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Zy || t.factor > Jy ? {
        opId: t.id,
        message: `Speed factor must be between ${Zy}× and ${Jy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Wy || t.gain_db > e0 ? {
        opId: t.id,
        message: `Volume must be between ${Wy} and ${e0} dB.`
      } : null;
    case "eq3":
      for (const [s, i] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (i < t0 || i > n0)
          return {
            opId: t.id,
            message: `EQ ${s} must be between ${t0} and ${n0} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < a0 || t.semitones > r0 ? {
        opId: t.id,
        message: `Pitch must be between ${a0} and ${r0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < s0 || t.threshold_db > i0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${s0} and ${i0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function hR(t, a, s, i) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : s <= a ? { opId: t, message: "End must be greater than start." } : i > 0 && s > i ? { opId: t, message: "End extends past source duration." } : null;
}
async function Ic(t, a) {
  const s = await t.json().catch(() => null);
  return s?.error?.message ?? s?.message ?? `${a} failed: ${t.status}`;
}
var mR = "g5r6d10", pR = "g5r6d11", gR = "g5r6d12", vR = "g5r6d13", yR = "g5r6d14", bR = "g5r6d15", xR = "g5r6d1a", SR = "g5r6d1b", wR = "g5r6d1c", jR = "g5r6d1d", ER = "g5r6d1e", NR = "g5r6d1g", CR = "g5r6d1h", TR = "g5r6d1i", RR = "g5r6d1j", _R = "g5r6d1k", MR = "g5r6d1l", AR = "g5r6d1m", DR = "g5r6d1n", kR = "g5r6d1o", l0 = "g5r6d1p", zR = "g5r6d1q", OR = "g5r6d1r", LR = "g5r6d1s", $R = "g5r6d1t", UR = "g5r6d1u", o0 = "g5r6d1v", c0 = "g5r6d1w", BR = "g5r6d1x", VR = "g5r6d1y", Ys = "g5r6d1z", IR = "g5r6d110", u0 = "g5r6d111", HR = "g5r6d112", qR = "g5r6d113", mr = "g5r6d114", FR = "g5r6d119", YR = "a6ki8u0", GR = "a6ki8u1", PR = "a6ki8u2", KR = "a6ki8u3", XR = "a6ki8u4", QR = "a6ki8u5", ZR = "a6ki8u6", mf = "a6ki8u7", JR = "a6ki8u8", WR = "a6ki8u9", e_ = "a6ki8ua", t_ = "a6ki8ub", n_ = "a6ki8uc", a_ = "a6ki8ud", r_ = "a6ki8ue", s_ = "a6ki8uf", i_ = "a6ki8ug", l_ = "a6ki8uh", o_ = "_1lguv7x0", c_ = "_1lguv7x1", u_ = "_1lguv7x2", d_ = "_1lguv7x3", f_ = "_1lguv7x4", h_ = "_1lguv7x5", m_ = "_1lguv7x6", p_ = "_1lguv7x7", g_ = "_1lguv7x8", v_ = "_1lguv7x9", y_ = "_1lguv7xa", b_ = "_1lguv7xb", x_ = "_1lguv7xc", d0 = "_1lguv7xd", S_ = "_1lguv7xe", w_ = "_1lguv7xf", j_ = "_1lguv7xg", E_ = "_1lguv7xh", c1 = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, u1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, N_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, C_ = "_4ydn54f";
function Pe({
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
    c1[t],
    u1[a],
    o ? N_[a] : null,
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
        i ? /* @__PURE__ */ c.jsx("span", { className: C_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const T_ = 28;
function R_(t) {
  if (!t) return 1;
  let a = 0;
  for (let s = 0; s < Math.min(t.length, 12); s++)
    a = a * 33 + t.charCodeAt(s) >>> 0;
  return a || 1;
}
function __(t, a) {
  const s = new Array(a);
  let i = t;
  for (let o = 0; o < a; o++) {
    i = (i * 9301 + 49297) % 233280;
    const u = i / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    s[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return s;
}
function M_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function A_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function D_({
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
  const [p, b] = v.useState(!1), [g, w] = v.useState(t.displayName), S = v.useRef(null), j = v.useMemo(() => R_(t.contentSha256), [t.contentSha256]), N = v.useMemo(() => __(j, T_), [j]), C = v.useMemo(() => sT(t), [t]);
  v.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), v.useEffect(() => {
    const z = S.current;
    z && (i && C ? z.play().catch(() => {
    }) : (z.pause(), z.currentTime = 0));
  }, [i, C]);
  const T = async () => {
    const z = g.trim();
    if (!z || z === t.displayName) {
      b(!1), w(t.displayName);
      return;
    }
    try {
      await u(z);
    } finally {
      b(!1);
    }
  }, M = `${M_(t.durationMs)} · ${A_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: o_, "data-playing": i ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: c_, children: [
      /* @__PURE__ */ c.jsx("span", { className: u_, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: d_, children: [
        p ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: h_,
            value: g,
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
            className: f_,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: m_, children: M })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: p_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: g_,
        "data-playing": i ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": i ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: v_, "aria-hidden": "true", children: i ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: y_, "aria-hidden": "true", children: N.map((z, R) => /* @__PURE__ */ c.jsx("span", { className: b_, style: { height: `${Math.round(z * 100)}%` } }, R)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: x_, children: [
      s.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: d0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        s.map((z) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: S_,
            style: { color: z.color, borderColor: z.color },
            children: z.characterName
          },
          z.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: d0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: w_, children: [
        /* @__PURE__ */ c.jsx(
          Pe,
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
          Pe,
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
          Pe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: j_,
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
        className: E_,
        onEnded: y
      }
    )
  ] });
}
var k_ = "_17eol302", z_ = "_17eol303", O_ = "_17eol304", L_ = "_17eol305", $_ = "_17eol306", U_ = "_17eol307", Yo = "_17eol308", B_ = "_17eol309", V_ = "_17eol30a", I_ = "_17eol30b", H_ = "_17eol30c", q_ = "_17eol30d", f0 = "_17eol30e", F_ = "_17eol30g";
function Y_() {
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
function G_(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function P_({
  open: t,
  defaultName: a,
  onClose: s,
  onSubmit: i
}) {
  const [o, u] = v.useState("idle"), [f, m] = v.useState(null), [y, p] = v.useState(0), [b, g] = v.useState(null), [w, S] = v.useState(a), [j, N] = v.useState(!1), C = v.useRef(null), T = v.useRef(null), M = v.useRef([]), z = v.useRef(0), R = v.useRef(null), H = v.useRef(null), Q = v.useRef({ mime: "audio/webm", ext: "webm" }), ie = v.useRef(null), A = v.useRef(null), I = v.useRef(null);
  v.useEffect(() => {
    if (t)
      return I.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ie.current?.scrollIntoView({ behavior: "smooth", block: "center" }), A.current?.focus();
      }), () => {
        I.current?.focus?.();
      };
  }, [t]), v.useEffect(() => {
    if (!t) return;
    const $ = (F) => {
      F.key === "Escape" && s();
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [t, s]);
  const D = v.useCallback(
    ($) => {
      if ($.key !== "Tab") return;
      const F = ie.current;
      if (!F) return;
      const Y = F.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (Y.length === 0) return;
      const ue = Y[0], _ = Y[Y.length - 1], ne = document.activeElement;
      $.shiftKey ? (ne === ue || ne === F) && ($.preventDefault(), _.focus()) : ne === _ && ($.preventDefault(), ue.focus());
    },
    []
  ), q = v.useCallback(() => {
    if (T.current) {
      for (const $ of T.current.getTracks()) $.stop();
      T.current = null;
    }
    R.current != null && (window.clearInterval(R.current), R.current = null);
  }, []), te = v.useCallback(() => {
    q(), b && URL.revokeObjectURL(b), g(null), M.current = [], H.current = null, p(0), m(null), u("idle");
  }, [b, q]);
  if (v.useEffect(() => {
    t || (te(), S(a));
  }, [t, a, te]), v.useEffect(() => () => {
    q(), b && URL.revokeObjectURL(b);
  }, [b, q]), !t) return null;
  const X = async () => {
    m(null), u("preparing");
    try {
      const $ = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = $;
      const F = Y_();
      Q.current = F;
      const Y = F.mime ? new MediaRecorder($, { mimeType: F.mime }) : new MediaRecorder($);
      C.current = Y, M.current = [], Y.ondataavailable = (ue) => {
        ue.data && ue.data.size > 0 && M.current.push(ue.data);
      }, Y.onstop = () => {
        const ue = F.mime || "audio/webm", _ = new Blob(M.current, { type: ue }), ne = new File([_], `${w || a || "recording"}.${F.ext}`, {
          type: ue
        });
        H.current = ne;
        const J = URL.createObjectURL(_);
        g(J), u("ready"), q();
      }, Y.start(), z.current = Date.now(), p(0), R.current = window.setInterval(() => {
        p(Date.now() - z.current);
      }, 200), u("recording");
    } catch ($) {
      const F = $ instanceof Error ? $.message : "could not access microphone";
      m(F), u(F.toLowerCase().includes("denied") ? "denied" : "error"), q();
    }
  }, le = () => {
    const $ = C.current;
    $ && $.state !== "inactive" && $.stop(), R.current != null && (window.clearInterval(R.current), R.current = null);
  }, re = async () => {
    const $ = H.current;
    if (!$) return;
    const F = (w || a).trim();
    if (!F) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await i($, F), s();
    } catch (Y) {
      m(Y instanceof Error ? Y.message : "upload failed");
    } finally {
      N(!1);
    }
  }, k = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: k_, role: "presentation", onClick: s, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ie,
      className: z_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: ($) => $.stopPropagation(),
      onKeyDown: D,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: O_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: L_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: $_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: k
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: H_, "aria-live": "polite", children: G_(y) }),
        /* @__PURE__ */ c.jsxs("div", { className: U_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: A,
              type: "button",
              className: Yo,
              "data-tone": "danger",
              onClick: () => {
                X();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: f0, "aria-hidden": "true" }),
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
                /* @__PURE__ */ c.jsx("span", { className: f0, "aria-hidden": "true" }),
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
        b && /* @__PURE__ */ c.jsx("audio", { className: q_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: B_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: V_,
              value: w,
              onChange: ($) => S($.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: I_, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: F_, children: [
          /* @__PURE__ */ c.jsx(Pe, { variant: "ghost", size: "md", onClick: s, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Pe,
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
function K_({
  deploymentId: t,
  voiceAssets: a,
  mappings: s,
  characterColors: i,
  onVoiceAssetsChange: o
}) {
  const [u, f] = v.useState(""), [m, y] = v.useState("all"), [p, b] = v.useState(!1), [g, w] = v.useState(null), [S, j] = v.useState(!1), [N, C] = v.useState(!1), T = v.useRef(null), M = v.useCallback(
    (X) => "upload",
    []
  ), z = v.useMemo(() => {
    const X = u.trim().toLowerCase();
    return a.filter((le) => {
      const re = M(le);
      return !(m === "uploaded" && re !== "upload" || m === "preset" && re !== "preset" || X && !le.displayName.toLowerCase().includes(X));
    });
  }, [a, u, m, M]), R = v.useMemo(
    () => a.filter((X) => M(X) === "upload").length,
    [a, M]
  ), H = v.useCallback(
    (X) => {
      const le = [], re = /* @__PURE__ */ new Set();
      for (const k of s)
        k.speakerVoiceAssetId === X && (re.has(k.characterName) || (re.add(k.characterName), le.push({
          characterName: k.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: i[k.characterName] ?? "#ba9eff"
        })));
      return le;
    },
    [s, i]
  ), Q = v.useCallback(
    async (X) => {
      const le = Array.from(X).slice(0, 8);
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
              const F = await xc(t, k, $, "speaker");
              re.push(F), cn.success(`Added ${F.displayName}`);
            } catch (F) {
              cn.error(F instanceof Error ? F.message : `${k.name}: upload failed`);
            }
          }
          re.length > 0 && o([...re, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), ie = (X) => {
    X.preventDefault(), b(!1), X.dataTransfer?.files && Q(X.dataTransfer.files);
  }, A = v.useCallback(async () => {
    const X = window.prompt("Paste an audio URL (https://…)");
    if (X)
      try {
        const le = await fetch(X);
        if (!le.ok) throw new Error(`fetch failed: ${le.status}`);
        const re = await le.blob(), k = X.split("/").pop()?.split("?")[0] ?? "voice.wav", $ = new File([re], k, { type: re.type || "audio/wav" });
        await Q([$]);
      } catch (le) {
        cn.error(le instanceof Error ? le.message : "could not fetch URL");
      }
  }, [Q]), I = v.useCallback(
    async (X, le) => {
      try {
        const re = await rT(t, X, le);
        o(
          a.map((k) => k.voiceAssetId === X ? re : k)
        ), cn.success(`Renamed to ${re.displayName}`);
      } catch (re) {
        cn.error(re instanceof Error ? re.message : "rename failed");
      }
    },
    [t, a, o]
  ), D = v.useCallback((X) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(X), cn.success("Copied name")) : cn.error("Clipboard unavailable");
  }, []), q = v.useCallback(
    async (X) => {
      if (window.confirm(`Delete "${X.displayName}"? Mappings using it will reset.`))
        try {
          await aT(t, X.voiceAssetId), o(a.filter((re) => re.voiceAssetId !== X.voiceAssetId)), cn.success(`Deleted ${X.displayName}`);
        } catch (re) {
          cn.error(re instanceof Error ? re.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: YR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: GR,
        "data-over": p ? "true" : "false",
        onDragOver: (X) => {
          X.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ie,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: PR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: KR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: XR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: QR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: ZR, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: mf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: mf,
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
                  className: mf,
                  onClick: () => j(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            Pe,
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
              className: l_,
              onChange: (X) => {
                X.target.files && (Q(X.target.files), X.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: JR, children: [
      /* @__PURE__ */ c.jsxs("label", { className: WR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: e_,
            value: u,
            onChange: (X) => f(X.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: t_, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([X, le]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: n_,
          "data-active": m === X ? "true" : "false",
          onClick: () => y(X),
          children: le
        },
        X
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: s_, children: [
        /* @__PURE__ */ c.jsx("span", { className: i_, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          R,
          " uploaded"
        ] })
      ] })
    ] }),
    z.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: r_, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: a_, children: z.map((X) => {
      const le = M(X);
      return /* @__PURE__ */ c.jsx(
        D_,
        {
          asset: X,
          presentation: le,
          usedBy: H(X.voiceAssetId),
          isPlaying: g === X.voiceAssetId,
          onTogglePlay: () => w((re) => re === X.voiceAssetId ? null : X.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (re) => I(X.voiceAssetId, re),
          onCopyName: () => D(X.displayName),
          onDelete: le === "upload" ? () => void q(X) : void 0
        },
        X.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      P_,
      {
        open: S,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (X, le) => {
          await te(X, le);
        }
      }
    )
  ] });
  async function te(X, le) {
    C(!0);
    try {
      const re = await xc(t, X, le, "speaker");
      o([re, ...a]), cn.success(`Recorded ${re.displayName}`);
    } catch (re) {
      throw cn.error(re instanceof Error ? re.message : "upload failed"), re;
    } finally {
      C(!1);
    }
  }
}
async function X_(t) {
  return wt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function Q_(t, a, s) {
  return wt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: s })
  });
}
async function Z_(t, a) {
  await wt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var h0 = "_190jlds0", J_ = "_190jlds1", W_ = "_190jlds2", e2 = "_190jlds3", t2 = "_190jlds4", n2 = "_190jlds5", a2 = "_190jlds6", r2 = "_190jlds7", s2 = "_190jlds8", i2 = "_190jlds9", m0 = "_190jldsa", l2 = "_190jldsb", p0 = "_190jldsc", o2 = "_190jldsd", c2 = "_190jldse", u2 = "_190jldsf";
function d2({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: s,
  onRevertToChain: i,
  emptyHint: o
}) {
  const [u, f] = v.useState(() => $s(a[0])), [m, y] = v.useState([]), [p, b] = v.useState(!1), [g, w] = v.useState(null), [S, j] = v.useState(!1), [N, C] = v.useState(null), T = v.useMemo(
    () => a.find((R) => $s(R) === u) ?? a[0],
    [a, u]
  );
  v.useEffect(() => {
    a.length && (a.some((R) => $s(R) === u) || f($s(a[0])));
  }, [a, u]), v.useEffect(() => {
    if (!T) {
      y([]);
      return;
    }
    let R = !1;
    return b(!0), w(null), fc(t, T.kind, T.id, 50).then((H) => {
      R || y(H.entries);
    }).catch((H) => {
      R || w(H instanceof Error ? H.message : "audit fetch failed");
    }).finally(() => {
      R || b(!1);
    }), () => {
      R = !0;
    };
  }, [t, T]);
  const M = v.useCallback(() => {
    if (!T) return;
    const R = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, H = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), Q = URL.createObjectURL(H), ie = document.createElement("a");
    ie.href = Q, ie.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ie), ie.click(), document.body.removeChild(ie), URL.revokeObjectURL(Q);
  }, [t, m, T]), z = v.useCallback(async () => {
    if (!(!T || !s) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await s(T);
        const R = await fc(t, T.kind, T.id, 50);
        y(R.entries);
      } catch (R) {
        w(R instanceof Error ? R.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, s, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: h0, children: /* @__PURE__ */ c.jsx("p", { className: p0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: h0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: J_, children: [
      /* @__PURE__ */ c.jsxs("div", { className: W_, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: m0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: e2,
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
      /* @__PURE__ */ c.jsxs("div", { className: t2, children: [
        /* @__PURE__ */ c.jsx(
          Pe,
          {
            variant: "ghost",
            size: "sm",
            onClick: M,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        s && /* @__PURE__ */ c.jsx(
          Pe,
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
    g && /* @__PURE__ */ c.jsx("div", { className: c2, children: g }),
    p && !g && /* @__PURE__ */ c.jsx("div", { className: u2, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !g && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: p0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: o2, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !g && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: n2, children: m.map((R) => {
      const H = i && T && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: a2, children: [
        /* @__PURE__ */ c.jsx("span", { className: r2, children: f2(R.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: s2, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: i2, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: m0, children: R.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: l2,
            style: {
              background: `color-mix(in oklab, ${R.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: R.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: R.digest_before === "" || !R.digest_before ? "create" : R.operation_count === 0 ? "clear" : "update"
          }
        ),
        H && /* @__PURE__ */ c.jsx(
          Pe,
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
                  const Q = await fc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  y(Q.entries);
                } catch (Q) {
                  w(Q instanceof Error ? Q.message : "revert failed");
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
function f2(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var h2 = "_1uzgubz0", m2 = "_1uzgubz1", p2 = "_1uzgubz2", g2 = "_1uzgubz3", v2 = "_1uzgubz4", y2 = "_1uzgubz5", b2 = "_1uzgubz6", x2 = "_1uzgubz7", g0 = "_1uzgubz8", S2 = "_1uzgubz9", d1 = "_1uzgubza", f1 = "_1uzgubzb", w2 = "_1uzgubzc", j2 = "_1uzgubzd", pf = "_1uzgubze", gf = "_1uzgubzf", E2 = "_1uzgubzg", N2 = "_1uzgubzh", v0 = "_1uzgubzi", y0 = "_1uzgubzj", b0 = "_1uzgubzk", x0 = "_1uzgubzl", S0 = "_1uzgubzm", C2 = "_1uzgubzn", T2 = "_1uzgubzo", R2 = "_1uzgubzp", _2 = "_1uzgubzq";
function M2({
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
  onClearMapping: g
}) {
  const [w, S] = v.useState(!1), j = i ? o.find((M) => M.voiceAssetId === i.speakerVoiceAssetId) : null, N = i?.defaultVectorPresetId ? u.find((M) => M.presetId === i.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), T = i !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${h2}${f ? ` ${m2}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: p2,
        onClick: m,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: g2,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: v2, children: [
            /* @__PURE__ */ c.jsx("span", { className: y2, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: b2, children: [
              s,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: x2, children: [
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: g0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                w0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: g0, children: N.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            i?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: w2, children: [
              "chain · ",
              i.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${S2} ${T ? d1 : f1}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: j2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: pf, children: [
        /* @__PURE__ */ c.jsx("span", { className: gf, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${E2}${w ? ` ${N2}` : ""}`,
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
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: pf, children: [
        /* @__PURE__ */ c.jsx("span", { className: gf, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: v0, children: o.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${y0}${i?.speakerVoiceAssetId === M.voiceAssetId ? ` ${b0}` : ""}`,
            onClick: () => y(M.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: x0, children: M.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: S0, children: [
                M.durationMs != null ? w0(M.durationMs) : "—",
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
      u.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: pf, children: [
        /* @__PURE__ */ c.jsx("span", { className: gf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: v0, children: u.map((M) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${y0}${i?.defaultVectorPresetId === M.presetId ? ` ${b0}` : ""}`,
            onClick: () => p(M.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: x0, children: M.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: S0, children: "preset · vector" })
            ]
          },
          M.presetId
        )) })
      ] }),
      T && g && /* @__PURE__ */ c.jsx(Pe, { variant: "ghost", size: "sm", onClick: g, children: "Clear mapping →" })
    ] })
  ] });
}
function w0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return `${s}:${i.toString().padStart(2, "0")}`;
}
function A2({
  unmappedCount: t,
  totalCount: a,
  children: s,
  emptyHint: i
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: _2, children: i ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: C2, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${T2} ${o ? d1 : f1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: R2, children: s })
  ] });
}
async function Sc() {
  return wt("/runtime/health");
}
async function D2() {
  await wt("/runtime/start", { method: "POST" });
}
async function k2() {
  return wt("/runtime/stop", { method: "POST" });
}
function h1(t) {
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
var z2 = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function Rn({
  severity: t,
  children: a,
  role: s,
  ariaLive: i,
  className: o,
  style: u
}) {
  const f = [z2[t], o].filter(Boolean).join(" "), m = s ?? (t === "error" ? "alert" : "status"), y = i ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": y, style: u, children: a });
}
var m1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, p1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, O2 = "_13bb4njb";
function Jr({
  tone: t,
  size: a = "sm",
  pulse: s = !1,
  children: i,
  className: o,
  style: u,
  title: f
}) {
  const m = s && t !== "faint", y = [m1[a], p1[t], m ? O2 : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: y, style: u, title: f, children: i });
}
const L2 = 4e3;
function $2({ deployment: t }) {
  const [a, s] = v.useState(null), [i, o] = v.useState(null);
  v.useEffect(() => {
    let m = !1;
    const y = async () => {
      try {
        const b = await Sc();
        m || (s(b), o(null));
      } catch (b) {
        m || o(V2(b));
      }
    };
    y();
    const p = setInterval(y, L2);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", f = i?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: IR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Jr, { tone: U2(u), pulse: u === "starting" || u === "installing", children: h1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Ys, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: B2(a.uptimeSeconds) }),
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
function U2(t) {
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
function B2(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function V2(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const wc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Hc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ia = 1e-3;
function I2(t, a, s) {
  for (const i of Object.keys(wc)) {
    const o = wc[i];
    if (Math.abs(o.low - t) < Ia && Math.abs(o.mid - a) < Ia && Math.abs(o.high - s) < Ia)
      return i;
  }
  return "custom";
}
function H2(t) {
  let a = F2();
  for (const s of t.ops)
    a = q2(a, s);
  return a;
}
function q2(t, a) {
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
          preset: I2(a.low_db, a.mid_db, a.high_db)
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
function F2() {
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
function Y2(t, a) {
  const s = Er(t, "gain");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = { id: _n(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(s, i) };
}
function G2(t, a, s, i) {
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
function P2(t, a) {
  const s = Er(t, "speed");
  if (Math.abs(a - 1) < Ia) return { ...t, ops: s };
  const i = { id: _n(), mode: "speed", factor: a };
  return { ...t, ops: Nr(s, i) };
}
function K2(t, a) {
  const s = Er(t, "pitch_shift");
  if (Math.abs(a) < Ia) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(s, i) };
}
function X2(t, a, s) {
  const i = Er(t, "normalize");
  if (a === "off") return { ...t, ops: i };
  const o = {
    id: _n(),
    mode: "normalize",
    target_lufs: s
  };
  return { ...t, ops: Nr(i, o) };
}
function Q2(t, a) {
  const s = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function Z2(t, a) {
  const s = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: s };
  const i = {
    id: _n(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(s, i) };
}
function J2(t, a, s) {
  const i = Er(t, "silence_strip");
  if (!a) return { ...t, ops: i };
  const o = {
    id: _n(),
    mode: "silence_strip",
    threshold_db: s
  };
  return { ...t, ops: Nr(i, o) };
}
const g1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function v1(t, a) {
  const s = {
    ...t,
    ops: t.ops.filter((u) => !g1.has(u.mode))
  };
  let o = Y2({ version: 1, ops: [] }, a.volumeDb);
  return o = G2(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = P2(o, a.speed.value)), o = K2(o, a.pitchSt), o = X2(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = Q2(o, a.fade.inS), o = Z2(o, a.fade.outS), o = J2(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...s, ops: [...s.ops, ...o.ops] };
}
function y1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((s) => g1.has(s.mode))
  };
  return H2(a);
}
var W2 = "_1rsa80i0", eM = "_1rsa80i1", tM = "_1rsa80i2", nM = "_1rsa80i3", aM = "_1rsa80i4", rM = "_1rsa80i5", sM = "_1rsa80i6", iM = "_1rsa80i7", lM = "_1rsa80i8", oM = "_1rsa80i9";
const b1 = ["flat", "warm", "bright", "voice", "telephone"], Wi = -12, Go = 12, cM = 0.5;
function uM(t) {
  const { low: a, mid: s, high: i, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = wc[p];
    u(b.low, b.mid, b.high, p);
  }, y = (p, b) => {
    const g = { low: a, mid: s, high: i, [p]: b }, w = fM(g.low, g.mid, g.high);
    u(g.low, g.mid, g.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: W2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: eM, role: "group", "aria-label": "EQ presets", children: [
      b1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: tM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: nM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: aM, children: [
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Low",
          value: a,
          onChange: (p) => y("low", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Mid",
          value: s,
          onChange: (p) => y("mid", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
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
function vf({ label: t, value: a, onChange: s, disabled: i }) {
  const o = (a - Wi) / (Go - Wi) * 100, u = v.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: rM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: sM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: Wi,
        max: Go,
        step: cM,
        value: a,
        disabled: i,
        className: lM,
        style: { "--fill": `${o}%` },
        onChange: (f) => s(Number(f.target.value)),
        "aria-valuemin": Wi,
        "aria-valuemax": Go,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: iM, children: dM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: oM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Wi }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Go
      ] })
    ] })
  ] });
}
function dM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const yf = 1e-3;
function fM(t, a, s) {
  for (const i of b1) {
    const o = wc[i];
    if (Math.abs(o.low - t) < yf && Math.abs(o.mid - a) < yf && Math.abs(o.high - s) < yf)
      return i;
  }
  return "custom";
}
var hM = "_85bhwb0", mM = "_85bhwb1", j0 = "_85bhwb2", pM = "_85bhwb3", gM = "_85bhwb4", vM = "_85bhwb5", yM = "_85bhwb6", bM = "_85bhwb7";
const Po = 0.5, bf = 2, xM = 0.05;
function SM(t) {
  const { mode: a, value: s, supportsSynthSpeed: i, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (s - Po) / (bf - Po) * 100, y = v.useId(), p = (g) => o(g, s), b = (g) => o(a, g);
  return /* @__PURE__ */ c.jsxs("div", { className: hM, children: [
    i ? /* @__PURE__ */ c.jsxs("div", { className: mM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: j0,
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
          className: j0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: pM, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: y,
          type: "range",
          min: Po,
          max: bf,
          step: xM,
          value: s,
          disabled: f,
          className: gM,
          style: { "--fill": `${m}%` },
          onChange: (g) => b(Number(g.target.value)),
          "aria-valuemin": Po,
          "aria-valuemax": bf,
          "aria-valuenow": s,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: vM, children: `${s.toFixed(2)}×` })
    ] }),
    a === "synth" && i ? /* @__PURE__ */ c.jsxs("div", { className: yM, children: [
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: bM, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var wM = "kgszk50", jM = "kgszk51", E0 = "kgszk52", EM = "kgszk53", NM = "kgszk54", x1 = "kgszk55", CM = "kgszk56", TM = "kgszk58", Kh = "kgszk59", S1 = "kgszk5a", Xh = "kgszk5b", RM = "kgszk5c", _M = "kgszk5d", MM = "kgszk5e", N0 = "kgszk5f", C0 = "kgszk5g", T0 = "kgszk5h", AM = "kgszk5i", DM = "kgszk5j", kM = "kgszk5l", pl = "kgszk5m", gl = "kgszk5n";
const zM = -24, OM = 24, LM = 0.5, $M = -12, UM = 12, BM = 0.5, VM = -30, IM = -6, HM = -12, qM = 0, Ko = -60, xf = -20;
function Qh(t) {
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
  }, g = PM(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: wM, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: jM, children: [
      g.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: EM, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: E0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: g.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: E0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: NM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      R0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: zM,
        max: OM,
        step: LM,
        format: KM,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: gl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        uM,
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
        SM,
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
      R0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: $M,
        max: UM,
        step: BM,
        format: XM,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      FM,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      YM,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      GM,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    y ? /* @__PURE__ */ c.jsxs("div", { className: kM, children: [
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => s(Hc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Pe, { variant: "primary", size: "md", onClick: y, disabled: m, children: p })
    ] }) : null
  ] });
}
function R0(t) {
  const { label: a, sub: s, min: i, max: o, step: u, format: f, value: m, onChange: y, disabled: p } = t, b = (m - i) / (o - i) * 100, g = v.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: x1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: CM, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: TM, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: S1, children: s })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: g,
        type: "range",
        min: i,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: Xh,
        style: { "--fill": `${b}%` },
        onChange: (w) => y(Number(w.target.value)),
        "aria-valuemin": i,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Kh, children: f(m) })
  ] });
}
function FM({ normalize: t, onChange: a, disabled: s }) {
  const o = t.mode === "loudness" ? { min: VM, max: IM, step: 0.5, suffix: "LUFS" } : { min: HM, max: qM, step: 0.5, suffix: "dB" }, u = QM(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (y) => {
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
    /* @__PURE__ */ c.jsx("div", { className: RM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((y) => {
      const p = y === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: _M,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: x1, children: [
      /* @__PURE__ */ c.jsx("span", { className: S1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: s,
          className: Xh,
          style: { "--fill": `${f}%` },
          onChange: (y) => a({ mode: t.mode, targetDbOrLufs: Number(y.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Kh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function YM({ inS: t, outS: a, onChange: s, disabled: i }) {
  const o = v.useId(), u = v.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: gl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: MM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: N0, children: [
        /* @__PURE__ */ c.jsx("label", { className: C0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: i,
            className: T0,
            onChange: (f) => s(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: N0, children: [
        /* @__PURE__ */ c.jsx("label", { className: C0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: i,
            className: T0,
            onChange: (f) => s(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function GM({ enabled: t, thresholdDb: a, onChange: s, disabled: i }) {
  const o = (a - Ko) / (xf - Ko) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: gl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: AM, children: [
      /* @__PURE__ */ c.jsxs("label", { className: DM, children: [
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
          max: xf,
          step: 1,
          value: a,
          disabled: i || !t,
          className: Xh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => s(t, Number(u.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": xf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Kh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Us = 1e-3;
function PM(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Us && a.push("gain"), (Math.abs(t.eq3.low) >= Us || Math.abs(t.eq3.mid) >= Us || Math.abs(t.eq3.high) >= Us) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Us && a.push("speed"), Math.abs(t.pitchSt) >= Us && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function KM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function XM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function QM(t, a, s) {
  return Number.isFinite(t) ? Math.max(a, Math.min(s, t)) : a;
}
var ZM = "skdk4g0", JM = "skdk4g1", _0 = "skdk4g2", WM = "skdk4g3", eA = "skdk4g4", tA = "skdk4g5", nA = "skdk4g6", aA = "skdk4g7", rA = "skdk4g8", sA = "skdk4g9", iA = "skdk4ga", lA = "skdk4gb", oA = "skdk4gc", cA = "skdk4gd", M0 = "skdk4ge", A0 = "skdk4gf", uA = "skdk4gg", D0 = "skdk4gh", k0 = "skdk4gi", dA = "skdk4gj", fA = "skdk4gk", hA = "skdk4gl", z0 = "skdk4gm", mA = "skdk4gn", O0 = "skdk4go", pA = "skdk4gp", gA = "skdk4gq", vA = "skdk4gr", yA = "skdk4gs", bA = "skdk4gt", xA = "skdk4gu", SA = "skdk4gv", L0 = "skdk4gw", wA = "skdk4gx", jA = "skdk4gy", EA = "skdk4gz", NA = "skdk4g10", CA = "cgsfgh1", TA = "cgsfgh2", RA = "cgsfgh3", _A = "cgsfgh4", MA = "cgsfgh5", AA = "cgsfgh6", DA = "cgsfgh7", kA = "cgsfgh8", zA = "cgsfgh9", OA = "cgsfgha", LA = "cgsfghb", $A = "cgsfghc", UA = "cgsfghd", BA = "cgsfghe", VA = "cgsfghm", IA = "cgsfghn", HA = "cgsfgho", qA = "cgsfghp";
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
}, w1 = 0.05;
function FA(t) {
  let a = null, s = -1 / 0;
  for (const i of Xt) {
    const o = t[i];
    o > s && (s = o, a = i);
  }
  return !a || s <= w1 ? null : a;
}
function j1(t, a = 3) {
  return Xt.map((s) => ({ key: s, label: vl[s], value: t[s] })).filter((s) => s.value > w1).sort((s, i) => i.value - s.value).slice(0, a);
}
function YA(t) {
  let a = 0;
  for (const s of Xt) a += t[s] * t[s];
  return Math.sqrt(a);
}
function $0(t) {
  const a = j1(t, 2), s = a[0];
  if (!s) return "";
  const i = a[1];
  return !i || s.value - i.value > 0.25 ? Sf(s.label) : `${Sf(s.label)} + ${i.label.toLowerCase()}`;
}
function Sf(t) {
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
const U0 = 0.05, B0 = 0.2, GA = 22, PA = 320, wf = 0.78;
function jf(t, a, s, i) {
  const o = Math.cos(s), u = Math.sin(s), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / i));
}
function KA(t) {
  const { vec: a, onChange: s, size: i, reduceMotion: o = !1 } = t, [u, f] = v.useState(a), [m, y] = v.useState(null), [p, b] = v.useState(null), g = v.useRef(null), w = v.useRef(a), S = v.useRef(o), j = v.useRef(null), N = v.useRef(0);
  S.current = o, v.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const C = v.useCallback(
    (I) => {
      const D = Wr(I);
      f(D), w.current = D, s(D);
    },
    [s]
  ), T = v.useCallback((I) => {
    const D = Wr(I);
    f(D), w.current = D;
  }, []), M = v.useCallback(
    (I) => {
      const D = g.current;
      if (!D || S.current) return;
      const q = I.clientX - D.centerX, te = I.clientY - D.centerY, X = i / 2 * wf, le = jf(q, te, D.angle, X), re = { ...w.current, [D.axis]: le };
      T(re);
    },
    [i, T]
  ), z = v.useCallback(
    (I) => {
      const D = g.current;
      if (D) {
        if (window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), S.current) {
          const q = I.clientX - D.centerX, te = I.clientY - D.centerY, X = i / 2 * wf, le = jf(q, te, D.angle, X), re = { ...w.current, [D.axis]: le };
          g.current = null, C(re);
          return;
        }
        g.current = null, C(w.current);
      }
    },
    [C, M, i]
  );
  v.useEffect(() => () => {
    window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), g.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [M, z]);
  const R = v.useCallback((I, D) => {
    S.current || (N.current += 1, b({ x: I, y: D, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, PA));
  }, []), H = v.useCallback(
    (I, D, q, te, X) => {
      const le = q.getBoundingClientRect(), re = le.left + le.width / 2, k = le.top + le.height / 2, F = Xt.indexOf(I) / Xt.length * Math.PI * 2 - Math.PI / 2;
      if (g.current = {
        axis: I,
        pointerId: D,
        centerX: re,
        centerY: k,
        angle: F
      }, y(I), te !== void 0 && X !== void 0) {
        const Y = te - re, ue = X - k, _ = i / 2 * wf, ne = jf(Y, ue, F, _), J = { ...w.current, [I]: ne };
        S.current ? C(J) : T(J);
      }
      window.addEventListener("pointermove", M), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [C, M, z, i, T]
  ), Q = v.useCallback(
    (I, D) => {
      D.preventDefault();
      const q = D.currentTarget, te = q.ownerSVGElement ?? q;
      H(I, D.pointerId, te);
    },
    [H]
  ), ie = v.useCallback(
    (I) => {
      const D = I.currentTarget, q = D instanceof SVGSVGElement ? D : D.ownerSVGElement ?? D, te = q.getBoundingClientRect(), X = te.left + te.width / 2, le = te.top + te.height / 2, re = I.clientX - X, k = I.clientY - le;
      if (Math.sqrt(re * re + k * k) < 8) return;
      let F = Math.atan2(k, re) * 180 / Math.PI;
      F = ((F + 90) % 360 + 360) % 360;
      let Y = null, ue = 999;
      for (let J = 0; J < Xt.length; J++) {
        const G = Xt[J];
        if (!G) continue;
        const U = J / Xt.length * 360, W = Math.abs((U - F + 540) % 360 - 180);
        W < ue && (ue = W, Y = G);
      }
      if (!Y || ue > GA) return;
      I.preventDefault();
      const _ = (I.clientX - te.left) / te.width * i, ne = (I.clientY - te.top) / te.height * i;
      R(_, ne), H(Y, I.pointerId, q, I.clientX, I.clientY);
    },
    [H, i, R]
  ), A = v.useCallback(
    (I, D) => {
      const q = w.current[I];
      let te = q;
      switch (D.key) {
        case "ArrowUp":
        case "ArrowRight":
          te = q + U0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          te = q - U0;
          break;
        case "PageUp":
          te = q + B0;
          break;
        case "PageDown":
          te = q - B0;
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
      D.preventDefault(), y(I), C({ ...w.current, [I]: te });
    },
    [C]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: y,
    onPointerDown: Q,
    onKeyDown: A,
    onSurfacePointerDown: ie,
    surfacePing: p
  };
}
const XA = [0.25, 0.5, 0.75, 1];
function QA({
  vec: t,
  onChange: a,
  size: s = 360,
  readOnly: i = !1,
  reduceMotion: o = !1
}) {
  const u = KA({ vec: t, onChange: a, size: s, reduceMotion: o }), f = s / 2, m = s / 2, y = s / 2 * 0.78, p = v.useMemo(() => ZA(f, m, y), [f, m, y]), b = v.useMemo(() => Xt.map((g, w) => {
    const S = hc(u.liveVec[g]), j = p[w];
    return j ? `${f + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: CA, children: /* @__PURE__ */ c.jsx("div", { className: TA, style: { width: s, height: s }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: RA,
      viewBox: `0 0 ${s} ${s}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: i ? void 0 : u.onSurfacePointerDown,
      style: i ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        XA.map((g) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: _A,
            cx: f,
            cy: m,
            r: y * g
          },
          g
        )),
        Xt.map((g, w) => {
          const S = p[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = m + S.dy * 1.18, C = u.activeAxis === g;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: MA,
                x1: f,
                y1: m,
                x2: f + S.dx,
                y2: m + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${UA}${C ? ` ${BA}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: vl[g]
              }
            )
          ] }, g);
        }),
        Xt.map((g, w) => {
          const S = hc(u.liveVec[g]);
          if (S <= 0.01) return null;
          const j = p[w];
          if (!j) return null;
          const N = u.activeAxis === g;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${DA}${N ? ` ${kA}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * S,
              y2: m + j.dy * S
            },
            `petal-${g}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: AA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: $A,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !i && Xt.map((g, w) => {
          const S = hc(u.liveVec[g]), j = p[w];
          if (!j) return null;
          const N = f + j.dx * S, C = m + j.dy * S, T = u.activeAxis === g;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: zA,
                cx: N,
                cy: C,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${vl[g]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (M) => u.onPointerDown(g, M),
                onKeyDown: (M) => u.onKeyDown(g, M),
                onFocus: () => u.setActiveAxis(g),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${OA}${T ? ` ${LA}` : ""}`,
                cx: N,
                cy: C,
                r: 6
              }
            )
          ] }, g);
        })
      ]
    }
  ) }) });
}
function ZA(t, a, s) {
  return Xt.map((i, o) => {
    const u = o / Xt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * s,
      dy: Math.sin(u) * s
    };
  });
}
function hc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function JA({ vec: t, size: a = 36 }) {
  const s = a / 2, i = a / 2, o = a / 2 * 0.86, u = v.useMemo(() => Xt.map((f, m) => {
    const y = hc(t[f]), p = m / Xt.length * Math.PI * 2 - Math.PI / 2, b = s + Math.cos(p) * o * y, g = i + Math.sin(p) * o * y;
    return `${b},${g}`;
  }).join(" "), [s, i, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: VA, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: IA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: HA, cx: s, cy: i, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: qA, points: u })
      ]
    }
  ) });
}
var WA = "_1jqr3aj0", e3 = "_1jqr3aj1", t3 = "_1jqr3aj2", n3 = "_1jqr3aj3", a3 = "_1jqr3aj4", r3 = "_1jqr3aj5", s3 = "_1jqr3aj6", i3 = "_1jqr3aj7";
const V0 = 0.05, I0 = 0.2;
function l3({
  vec: t,
  onChange: a,
  readOnly: s = !1,
  reduceMotion: i = !1
}) {
  const [o, u] = v.useState(null), f = v.useRef(null), m = v.useRef(/* @__PURE__ */ new Map()), y = v.useCallback(
    (j, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Wr({ ...t, [j]: C }));
    },
    [a, t]
  ), p = v.useCallback((j, N) => {
    const C = m.current.get(j);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), b = v.useCallback(
    (j, N) => {
      if (s) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && m.current.set(j, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), y(j, p(j, N.clientX));
    },
    [s, y, p]
  ), g = v.useCallback(
    (j, N) => {
      s || i || f.current === j && y(j, p(j, N.clientX));
    },
    [s, i, y, p]
  ), w = v.useCallback(
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
  ), S = v.useCallback(
    (j, N) => {
      if (s) return;
      const C = t[j] ?? 0;
      let T = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = C + V0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = C - V0;
          break;
        case "PageUp":
          T = C + I0;
          break;
        case "PageDown":
          T = C - I0;
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
  return /* @__PURE__ */ c.jsx("div", { className: WA, role: "group", "aria-label": "Emotion axis sliders", children: Xt.map((j) => {
    const N = o3(t[j] ?? 0), C = N > 0.05, T = o === j, M = vl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${e3}${C ? ` ${t3}` : ""}${T ? ` ${n3}` : ""}`,
        role: "slider",
        "aria-label": `${M} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": s,
        disabled: s,
        onPointerDown: (z) => b(j, z),
        onPointerMove: (z) => g(j, z),
        onPointerUp: (z) => w(j, z),
        onPointerCancel: (z) => w(j, z),
        onKeyDown: (z) => S(j, z),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: a3, children: M }),
          /* @__PURE__ */ c.jsx("span", { className: r3, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: s3,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: i3, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function o3(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var H0 = "gvwvwg0", c3 = "gvwvwg2", u3 = "gvwvwg3", d3 = "gvwvwg8", f3 = "gvwvwg9", h3 = "gvwvwga", m3 = "gvwvwgb", p3 = "gvwvwgc", g3 = "gvwvwgd", v3 = "gvwvwge";
function y3({
  presets: t,
  activePresetId: a,
  onSelect: s,
  onDelete: i
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: H0, children: [
    /* @__PURE__ */ c.jsx("span", { className: c3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: u3, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: H0, children: [
    /* @__PURE__ */ c.jsx("span", { className: v3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: d3, children: t.map((o) => {
      const u = b3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${f3}${f ? ` ${m3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: h3,
                onClick: () => s(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(JA, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: p3, children: o.presetName })
                ]
              }
            ),
            i && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: g3,
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
const nh = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function b3(t) {
  const a = nh.reduce(
    (i, o) => ({ ...i, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const s = nh.reduce(
    (i, o, u) => ({ ...i, [o]: t.vector[u] ?? 0 }),
    a
  );
  return Wr(s);
}
function Ef(t) {
  return nh.map((a) => t[a] ?? 0);
}
const x3 = [
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
], S3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], w3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], j3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function E3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Zs };
  const i = a.split(/\s+/).some((f) => S3.includes(f)) ? 1.2 : 1, o = w3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Zs };
  for (const f of x3) {
    let m = 0;
    for (const y of f.keywords) {
      const p = y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), g = new RegExp(`\\b${p}\\b`).exec(a);
      if (!g) continue;
      const w = g.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), C = S.slice(j >= 0 ? j : 0).slice(-30);
      j3.some((T) => new RegExp(`\\b${T}\\b`).test(C)) || (m += 1);
    }
    if (m > 0) {
      const y = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * i * o;
      u[f.axis] = Math.min(1, y);
    }
  }
  return Xt.every((f) => u[f] === 0) && (u.calm = 0.4), Wr(u);
}
const N3 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function C3({
  value: t,
  onChange: a,
  deploymentId: s,
  presets: i,
  onPresetsChange: o
}) {
  const u = t.mode ?? "none", f = v.useMemo(() => T3(t.vector), [t.vector]), m = t.emotionAlpha ?? 1, [y, p] = v.useState(null), [b, g] = v.useState(!1), [w, S] = v.useState(null), [j, N] = v.useState(""), [C, T] = v.useState(!1), M = v.useRef(!0);
  v.useEffect(() => (M.current = !0, () => {
    M.current = !1;
  }), []), v.useEffect(() => {
    C || N($0(f));
  }, [f, C]);
  const z = ($) => {
    a({ ...t, mode: $ });
  }, R = ($) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: Ef($)
    }), w && S(null);
  }, H = () => {
    R(Wr(Zs));
  }, Q = ($) => {
    const F = Math.max(0, Math.min(10, Number.isFinite($) ? $ : 1));
    a({ ...t, emotionAlpha: F });
  }, ie = async () => {
    const $ = j.trim();
    if ($) {
      g(!0), p(null);
      try {
        const F = await Q_(s, $, Ef(f));
        if (!M.current) return;
        o(
          R3([F, ...i.filter((Y) => Y.presetId !== F.presetId)])
        ), S(F.presetId), T(!1);
      } catch (F) {
        M.current && p(q0(F));
      } finally {
        M.current && g(!1);
      }
    }
  }, A = async ($) => {
    const F = [...i];
    o(i.filter((Y) => Y.presetId !== $)), w === $ && S(null);
    try {
      await Z_(s, $);
    } catch (Y) {
      M.current && (o(F), p(q0(Y)));
    }
  }, I = ($) => {
    S($.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: $.vector
    });
  }, D = ($) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: $ });
  }, q = FA(f), te = YA(f), X = j1(f, 3), le = X.length > 0 && j.trim().length > 0 && !b, re = $0(f) || "name your preset…", k = u !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: ZM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: JM, children: [
      /* @__PURE__ */ c.jsx("span", { className: _0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: WM, role: "radiogroup", "aria-label": "Emotion mode", children: N3.map(($) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": u === $.id,
          className: `${eA}${u === $.id ? ` ${tA}` : ""}`,
          onClick: () => z($.id),
          children: $.label
        },
        $.id
      )) })
    ] }),
    u === "none" && /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    u === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: O0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: dA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: fA,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: ($) => D($.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: hA, children: [
        /* @__PURE__ */ c.jsx(
          Pe,
          {
            variant: "secondary",
            onClick: () => {
              const $ = (t.qwenTemplate ?? "").trim();
              if (!$) return;
              const F = E3($);
              a({
                ...t,
                mode: "emotion_vector",
                vector: Ef(F)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: z0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: z0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (u === "emotion_vector" || u === "none" || u === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: cA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${l0} ${nA}`, children: /* @__PURE__ */ c.jsx(
        QA,
        {
          vec: f,
          onChange: R,
          readOnly: k
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${l0} ${aA}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: rA, children: [
          /* @__PURE__ */ c.jsx("span", { className: _0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: sA, children: q ? vl[q].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: iA, children: [
            "‖v‖ = ",
            te.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(l3, { vec: f, onChange: R, readOnly: k }),
        /* @__PURE__ */ c.jsx("div", { className: lA, children: /* @__PURE__ */ c.jsxs(
          Pe,
          {
            variant: "ghost",
            size: "sm",
            onClick: H,
            disabled: k || te < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: oA,
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
      /* @__PURE__ */ c.jsxs("div", { className: M0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: A0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: uA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: m,
            className: D0,
            style: { "--fill": `${m * 10}%` },
            onChange: ($) => Q(Number($.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: k0, children: [
          (m * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${pA}${X.length === 0 ? ` ${gA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: vA, children: [
              /* @__PURE__ */ c.jsx("span", { className: yA, children: "Save current as preset" }),
              X.length === 0 && /* @__PURE__ */ c.jsx("span", { className: bA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: xA, children: [
              /* @__PURE__ */ c.jsx("div", { className: SA, children: X.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${L0} ${jA}`, children: "no axes set" }) : X.map(($) => /* @__PURE__ */ c.jsxs("span", { className: L0, children: [
                $.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: wA, children: $.value.toFixed(2) })
              ] }, $.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: EA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: NA,
                    placeholder: re,
                    value: j,
                    disabled: X.length === 0 || b,
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
                  Pe,
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
        y3,
        {
          presets: i,
          activePresetId: w,
          onSelect: I,
          onDelete: A
        }
      )
    ] }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: M0, children: [
      /* @__PURE__ */ c.jsx("span", { className: A0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: m,
          className: D0,
          style: { "--fill": `${m * 10}%` },
          onChange: ($) => Q(Number($.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: k0, children: [
        (m * 100).toFixed(0),
        "%"
      ] })
    ] }),
    y && /* @__PURE__ */ c.jsx("div", { className: mA, children: y })
  ] });
}
function T3(t) {
  if (!t || !Array.isArray(t)) return Wr(Zs);
  const a = { ...Zs };
  return Xt.forEach((s, i) => {
    const o = t[i];
    a[s] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function R3(t) {
  return [...t].sort((a, s) => s.updatedAt - a.updatedAt);
}
function q0(t) {
  return t instanceof ti || t instanceof Error ? t.message : "Unknown error";
}
var _3 = "_5u1uau0", el = "_5u1uau1", M3 = "_5u1uau2", Bs = "_5u1uau3", tl = "_5u1uau4", A3 = "_5u1uau5", Nf = "_5u1uau6", D3 = "_5u1uau7", k3 = "_5u1uau8", z3 = "_5u1uau9", O3 = "_5u1uaua", L3 = "_5u1uaub", $3 = "_5u1uauc", U3 = "_5u1uaud", B3 = "_5u1uaue", F0 = "_5u1uauf", Y0 = "_5u1uaug", V3 = "_5u1uauh";
const Cf = [
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
], I3 = ["mp3", "wav", "flac"], Xo = 0.5, Tf = 2, H3 = 0.05, q3 = 0.8, F3 = 0.8, G0 = 42;
function Qo(t, a, s) {
  const i = t[a];
  if (typeof i == "number" && Number.isFinite(i)) return i;
  if (typeof i == "string") {
    const o = Number(i);
    if (Number.isFinite(o)) return o;
  }
  return s;
}
function Y3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: s,
  onSpeedFactorChange: i,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: m
}) {
  const y = v.useId(), p = v.useId(), b = v.useId(), g = v.useId(), w = v.useId(), S = (H, Q) => {
    m({ ...f, [H]: Q });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (H) => {
    if (H !== j)
      if (H === "random") {
        const Q = { ...f };
        delete Q.seed, m(Q);
      } else {
        const Q = Qo(f, "seed", G0);
        m({ ...f, seed: Q });
      }
  }, C = Cf.find((H) => H.id === o) ?? Cf[0], T = (s - Xo) / (Tf - Xo) * 100, M = Qo(f, "temperature", q3), z = Qo(f, "top_p", F3), R = Qo(f, "seed", G0);
  return /* @__PURE__ */ c.jsxs("div", { className: _3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: y, className: Bs, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: y,
          className: A3,
          value: t,
          onChange: (H) => a(H.currentTarget.value),
          children: I3.map((H) => /* @__PURE__ */ c.jsx("option", { value: H, children: H }, H))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Bs, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${tl} ${D3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: k3,
            min: Xo,
            max: Tf,
            step: H3,
            value: s,
            style: { "--range-pct": `${T}%` },
            onChange: (H) => i(Number(H.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": Tf,
            "aria-valuenow": s
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: z3, children: [
          s.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: M3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: O3, children: Cf.map((H) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === H.id,
          className: L3,
          onClick: () => u(H.id),
          title: H.help,
          children: H.label
        },
        H.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: $3, "aria-live": "polite", children: C.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: U3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bs, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Nf,
          min: 0,
          max: 2,
          step: 0.05,
          value: M,
          onChange: (H) => S("temperature", Number(H.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: Bs, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: g,
          type: "number",
          className: Nf,
          min: 0,
          max: 1,
          step: 0.05,
          value: z,
          onChange: (H) => S("top_p", Number(H.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bs, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${tl} ${B3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${F0} ${j === "fixed" ? Y0 : ""}`,
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
                className: `${F0} ${j === "random" ? Y0 : ""}`,
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
                className: Nf,
                step: 1,
                value: R,
                onChange: (H) => S("seed", Math.trunc(Number(H.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: V3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var G3 = "iv43qk0", P0 = "iv43qk1", P3 = "iv43qk2", K0 = "iv43qk3", K3 = "iv43qk4", X3 = "iv43qk5", Q3 = "iv43qk6", Z3 = "iv43qk7", J3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, W3 = "iv43qkd", e5 = "iv43qke", Rf = "iv43qkf", _f = "iv43qkg";
function t5({
  lines: t,
  characterColors: a,
  onLineClick: s
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: W3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const i = t.length, o = t.filter((f) => f.character !== null).length, u = i - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: e5, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Rf, children: [
        /* @__PURE__ */ c.jsx("span", { className: _f, children: i }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Rf, children: [
        /* @__PURE__ */ c.jsx("span", { className: _f, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Rf, children: [
        /* @__PURE__ */ c.jsx("span", { className: _f, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: G3, children: t.map((f) => /* @__PURE__ */ c.jsx(
      n5,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...s ? { onClick: () => s(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function n5({ line: t, color: a, onClick: s }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${P0} ${P3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: K0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: Q3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: P0,
      onClick: s,
      style: s ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: K0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: K3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: X3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${Z3} ${J3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var a5 = "_46z95i0", r5 = "_46z95i1", s5 = "_46z95i2", i5 = "_46z95i3", l5 = "_46z95i4", o5 = "_46z95i5", c5 = "_46z95i6";
const u5 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function d5({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: a5, children: [
    /* @__PURE__ */ c.jsx(
      Mf,
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
      Mf,
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
      Mf,
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
function Mf({ label: t, sub: a, min: s, max: i, step: o, format: u, value: f, onChange: m }) {
  const y = (f - s) / (i - s) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: r5, children: [
    /* @__PURE__ */ c.jsxs("div", { className: s5, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: i5, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: l5, children: a })
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
        className: o5,
        style: { "--fill": `${y}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: c5, children: u(f) })
  ] });
}
var f5 = "qe93dj0", h5 = "qe93dj1", m5 = "qe93dj2", p5 = "qe93dj3", g5 = "qe93dj4", v5 = "qe93dj5", y5 = "qe93dj6", b5 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, x5 = "qe93dja", S5 = "qe93djb";
function w5({ checks: t }) {
  const a = t.filter((s) => s.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: f5, children: [
    /* @__PURE__ */ c.jsxs("header", { className: h5, children: [
      /* @__PURE__ */ c.jsx("span", { className: m5, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: p5, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: g5, children: t.map((s) => /* @__PURE__ */ c.jsxs("li", { className: v5, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${y5} ${b5[s.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: x5, children: s.label }),
      s.detail && /* @__PURE__ */ c.jsx("span", { className: S5, children: s.detail })
    ] }, s.id)) })
  ] });
}
var X0 = "_17fbpt30", Q0 = "_17fbpt31", Z0 = "_17fbpt32", j5 = "_17fbpt33", E5 = "_17fbpt34", N5 = "_17fbpt35", J0 = "_17fbpt36", C5 = "_17fbpt37", T5 = "_17fbpt38";
const R5 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function _5({
  runs: t,
  deploymentId: a,
  onOpenQueue: s,
  onOpenRun: i,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: X0, children: [
    /* @__PURE__ */ c.jsx("header", { className: Q0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: Z0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: s ? (u) => {
          u.preventDefault(), s();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: C5, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: T5, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: X0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: Q0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: Z0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: s ? (u) => {
            u.preventDefault(), s();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: j5, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: E5,
        onClick: i ? () => i(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: N5, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${m1.sm} ${p1[R5[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: J0, children: M5(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: J0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function M5(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, s = new Date(a * 1e3);
  if (Number.isNaN(s.getTime())) return "—";
  const o = Date.now() - s.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : s.toISOString().slice(0, 16).replace("T", " ");
}
const E1 = v.createContext({});
function Zh(t) {
  const a = v.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const A5 = typeof window < "u", N1 = A5 ? v.useLayoutEffect : v.useEffect, qc = /* @__PURE__ */ v.createContext(null);
function D5(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function k5(t, a) {
  const s = t.indexOf(a);
  s > -1 && t.splice(s, 1);
}
const wr = (t, a, s) => s > a ? a : s < t ? t : s;
function W0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Nl = () => {
}, Js = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Nl = (t, a, s) => {
  !t && typeof console < "u" && console.warn(W0(a, s));
}, Js = (t, a, s) => {
  if (!t)
    throw new Error(W0(a, s));
});
const jr = {}, C1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function z5(t) {
  return typeof t == "object" && t !== null;
}
const T1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function R1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ni = /* @__NO_SIDE_EFFECTS__ */ (t) => t, O5 = (t, a) => (s) => a(t(s)), Fc = (...t) => t.reduce(O5), _1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, s) => {
  const i = a - t;
  return i === 0 ? 1 : (s - t) / i;
};
class M1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return D5(this.subscriptions, a), () => k5(this.subscriptions, a);
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
function A1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const D1 = (t, a, s) => (((1 - 3 * s + 3 * a) * t + (3 * s - 6 * a)) * t + 3 * a) * t, L5 = 1e-7, $5 = 12;
function U5(t, a, s, i, o) {
  let u, f, m = 0;
  do
    f = a + (s - a) / 2, u = D1(f, i, o) - t, u > 0 ? s = f : a = f;
  while (Math.abs(u) > L5 && ++m < $5);
  return f;
}
function Cl(t, a, s, i) {
  if (t === a && s === i)
    return ni;
  const o = (u) => U5(u, 0, 1, t, s);
  return (u) => u === 0 || u === 1 ? u : D1(o(u), a, i);
}
const k1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, z1 = (t) => (a) => 1 - t(1 - a), O1 = /* @__PURE__ */ Cl(0.33, 1.53, 0.69, 0.99), Jh = /* @__PURE__ */ z1(O1), L1 = /* @__PURE__ */ k1(Jh), $1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Jh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Wh = (t) => 1 - Math.sin(Math.acos(t)), B5 = z1(Wh), U1 = k1(Wh), V5 = /* @__PURE__ */ Cl(0.42, 0, 1, 1), I5 = /* @__PURE__ */ Cl(0, 0, 0.58, 1), B1 = /* @__PURE__ */ Cl(0.42, 0, 0.58, 1), H5 = (t) => Array.isArray(t) && typeof t[0] != "number", V1 = (t) => Array.isArray(t) && typeof t[0] == "number", eb = {
  linear: ni,
  easeIn: V5,
  easeInOut: B1,
  easeOut: I5,
  circIn: Wh,
  circInOut: U1,
  circOut: B5,
  backIn: Jh,
  backInOut: L1,
  backOut: O1,
  anticipate: $1
}, q5 = (t) => typeof t == "string", tb = (t) => {
  if (V1(t)) {
    Js(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, s, i, o] = t;
    return Cl(a, s, i, o);
  } else if (q5(t))
    return Js(eb[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), eb[t];
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
function F5(t, a) {
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
    schedule: (b, g = !1, w = !1) => {
      const j = w && o ? s : i;
      return g && f.add(b), j.add(b), b;
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
      const g = s;
      s = i, i = g, s.forEach(y), s.clear(), o = !1, u && (u = !1, p.process(b));
    }
  };
  return p;
}
const Y5 = 40;
function I1(t, a) {
  let s = !1, i = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, f = Zo.reduce((z, R) => (z[R] = F5(u), z), {}), { setup: m, read: y, resolveKeyframes: p, preUpdate: b, update: g, preRender: w, render: S, postRender: j } = f, N = () => {
    const z = jr.useManualTiming, R = z ? o.timestamp : performance.now();
    s = !1, z || (o.delta = i ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, Y5), 1)), o.timestamp = R, o.isProcessing = !0, m.process(o), y.process(o), p.process(o), b.process(o), g.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, s && a && (i = !1, t(N));
  }, C = () => {
    s = !0, i = !0, o.isProcessing || t(N);
  };
  return { schedule: Zo.reduce((z, R) => {
    const H = f[R];
    return z[R] = (Q, ie = !1, A = !1) => (s || C(), H.schedule(Q, ie, A)), z;
  }, {}), cancel: (z) => {
    for (let R = 0; R < Zo.length; R++)
      f[Zo[R]].cancel(z);
  }, state: o, steps: f };
}
const { schedule: na, cancel: ah, state: jc } = /* @__PURE__ */ I1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ni, !0);
let mc;
function G5() {
  mc = void 0;
}
const In = {
  now: () => (mc === void 0 && In.set(jc.isProcessing || jr.useManualTiming ? jc.timestamp : performance.now()), mc),
  set: (t) => {
    mc = t, queueMicrotask(G5);
  }
}, H1 = (t) => (a) => typeof a == "string" && a.startsWith(t), q1 = /* @__PURE__ */ H1("--"), P5 = /* @__PURE__ */ H1("var(--"), em = (t) => P5(t) ? K5.test(t.split("/*")[0].trim()) : !1, K5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function nb(t) {
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
}, dl = (t) => Math.round(t * 1e5) / 1e5, tm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function X5(t) {
  return t == null;
}
const Q5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, nm = (t, a) => (s) => !!(typeof s == "string" && Q5.test(s) && s.startsWith(t) || a && !X5(s) && Object.prototype.hasOwnProperty.call(s, a)), F1 = (t, a, s) => (i) => {
  if (typeof i != "string")
    return i;
  const [o, u, f, m] = i.match(tm);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [s]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, Z5 = (t) => wr(0, 255, t), Af = {
  ...ai,
  transform: (t) => Math.round(Z5(t))
}, Pr = {
  test: /* @__PURE__ */ nm("rgb", "red"),
  parse: /* @__PURE__ */ F1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: s, alpha: i = 1 }) => "rgba(" + Af.transform(t) + ", " + Af.transform(a) + ", " + Af.transform(s) + ", " + dl(yl.transform(i)) + ")"
};
function J5(t) {
  let a = "", s = "", i = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), s = t.substring(3, 5), i = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), s = t.substring(2, 3), i = t.substring(3, 4), o = t.substring(4, 5), a += a, s += s, i += i, o += o), {
    red: parseInt(a, 16),
    green: parseInt(s, 16),
    blue: parseInt(i, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const rh = {
  test: /* @__PURE__ */ nm("#"),
  parse: J5,
  transform: Pr.transform
}, Tl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), vr = /* @__PURE__ */ Tl("deg"), Ks = /* @__PURE__ */ Tl("%"), Me = /* @__PURE__ */ Tl("px"), W5 = /* @__PURE__ */ Tl("vh"), eD = /* @__PURE__ */ Tl("vw"), ab = {
  ...Ks,
  parse: (t) => Ks.parse(t) / 100,
  transform: (t) => Ks.transform(t * 100)
}, Gs = {
  test: /* @__PURE__ */ nm("hsl", "hue"),
  parse: /* @__PURE__ */ F1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: s, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Ks.transform(dl(a)) + ", " + Ks.transform(dl(s)) + ", " + dl(yl.transform(i)) + ")"
}, Kt = {
  test: (t) => Pr.test(t) || rh.test(t) || Gs.test(t),
  parse: (t) => Pr.test(t) ? Pr.parse(t) : Gs.test(t) ? Gs.parse(t) : rh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Pr.transform(t) : Gs.transform(t),
  getAnimatableNone: (t) => {
    const a = Kt.parse(t);
    return a.alpha = 0, Kt.transform(a);
  }
}, tD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function nD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(tm)?.length || 0) + (t.match(tD)?.length || 0) > 0;
}
const Y1 = "number", G1 = "color", aD = "var", rD = "var(", rb = "${}", sD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ws(t) {
  const a = t.toString(), s = [], i = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(sD, (y) => (Kt.test(y) ? (i.color.push(u), o.push(G1), s.push(Kt.parse(y))) : y.startsWith(rD) ? (i.var.push(u), o.push(aD), s.push(y)) : (i.number.push(u), o.push(Y1), s.push(parseFloat(y))), ++u, rb)).split(rb);
  return { values: s, split: m, indexes: i, types: o };
}
function iD(t) {
  return Ws(t).values;
}
function P1({ split: t, types: a }) {
  const s = t.length;
  return (i) => {
    let o = "";
    for (let u = 0; u < s; u++)
      if (o += t[u], i[u] !== void 0) {
        const f = a[u];
        f === Y1 ? o += dl(i[u]) : f === G1 ? o += Kt.transform(i[u]) : o += i[u];
      }
    return o;
  };
}
function lD(t) {
  return P1(Ws(t));
}
const oD = (t) => typeof t == "number" ? 0 : Kt.test(t) ? Kt.getAnimatableNone(t) : t, cD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : oD(t);
function uD(t) {
  const a = Ws(t);
  return P1(a)(a.values.map((i, o) => cD(i, a.split[o])));
}
const ua = {
  test: nD,
  parse: iD,
  createTransformer: lD,
  getAnimatableNone: uD
};
function Df(t, a, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? t + (a - t) * 6 * s : s < 1 / 2 ? a : s < 2 / 3 ? t + (a - t) * (2 / 3 - s) * 6 : t;
}
function dD({ hue: t, saturation: a, lightness: s, alpha: i }) {
  t /= 360, a /= 100, s /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = s;
  else {
    const m = s < 0.5 ? s * (1 + a) : s + a - s * a, y = 2 * s - m;
    o = Df(y, m, t + 1 / 3), u = Df(y, m, t), f = Df(y, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: i
  };
}
function Ec(t, a) {
  return (s) => s > 0 ? a : t;
}
const Rl = (t, a, s) => t + (a - t) * s, kf = (t, a, s) => {
  const i = t * t, o = s * (a * a - i) + i;
  return o < 0 ? 0 : Math.sqrt(o);
}, fD = [rh, Pr, Gs], hD = (t) => fD.find((a) => a.test(t));
function sb(t) {
  const a = hD(t);
  if (Nl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let s = a.parse(t);
  return a === Gs && (s = dD(s)), s;
}
const ib = (t, a) => {
  const s = sb(t), i = sb(a);
  if (!s || !i)
    return Ec(t, a);
  const o = { ...s };
  return (u) => (o.red = kf(s.red, i.red, u), o.green = kf(s.green, i.green, u), o.blue = kf(s.blue, i.blue, u), o.alpha = Rl(s.alpha, i.alpha, u), Pr.transform(o));
}, sh = /* @__PURE__ */ new Set(["none", "hidden"]);
function mD(t, a) {
  return sh.has(t) ? (s) => s <= 0 ? t : a : (s) => s >= 1 ? a : t;
}
function pD(t, a) {
  return (s) => Rl(t, a, s);
}
function am(t) {
  return typeof t == "number" ? pD : typeof t == "string" ? em(t) ? Ec : Kt.test(t) ? ib : yD : Array.isArray(t) ? K1 : typeof t == "object" ? Kt.test(t) ? ib : gD : Ec;
}
function K1(t, a) {
  const s = [...t], i = s.length, o = t.map((u, f) => am(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < i; f++)
      s[f] = o[f](u);
    return s;
  };
}
function gD(t, a) {
  const s = { ...t, ...a }, i = {};
  for (const o in s)
    t[o] !== void 0 && a[o] !== void 0 && (i[o] = am(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in i)
      s[u] = i[u](o);
    return s;
  };
}
function vD(t, a) {
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][i[u]], m = t.values[f] ?? 0;
    s[o] = m, i[u]++;
  }
  return s;
}
const yD = (t, a) => {
  const s = ua.createTransformer(a), i = Ws(t), o = Ws(a);
  return i.indexes.var.length === o.indexes.var.length && i.indexes.color.length === o.indexes.color.length && i.indexes.number.length >= o.indexes.number.length ? sh.has(t) && !o.values.length || sh.has(a) && !i.values.length ? mD(t, a) : Fc(K1(vD(i, o), o.values), s) : (Nl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ec(t, a));
};
function X1(t, a, s) {
  return typeof t == "number" && typeof a == "number" && typeof s == "number" ? Rl(t, a, s) : am(t)(t, a);
}
const bD = (t) => {
  const a = ({ timestamp: s }) => t(s);
  return {
    start: (s = !0) => na.update(a, s),
    stop: () => ah(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => jc.isProcessing ? jc.timestamp : In.now()
  };
}, Q1 = (t, a, s = 10) => {
  let i = "";
  const o = Math.max(Math.round(a / s), 2);
  for (let u = 0; u < o; u++)
    i += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Nc = 2e4;
function rm(t) {
  let a = 0;
  const s = 50;
  let i = t.next(a);
  for (; !i.done && a < Nc; )
    a += s, i = t.next(a);
  return a >= Nc ? 1 / 0 : a;
}
function xD(t, a = 100, s) {
  const i = s({ ...t, keyframes: [0, a] }), o = Math.min(rm(i), Nc);
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
function ih(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const SD = 12;
function wD(t, a, s) {
  let i = s;
  for (let o = 1; o < SD; o++)
    i = i - t(i) / a(i);
  return i;
}
const zf = 1e-3;
function jD({ duration: t = kt.duration, bounce: a = kt.bounce, velocity: s = kt.velocity, mass: i = kt.mass }) {
  let o, u;
  Nl(t <= /* @__PURE__ */ ta(kt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(kt.minDamping, kt.maxDamping, f), t = wr(kt.minDuration, kt.maxDuration, /* @__PURE__ */ ca(t)), f < 1 ? (o = (p) => {
    const b = p * f, g = b * t, w = b - s, S = ih(p, f), j = Math.exp(-g);
    return zf - w / S * j;
  }, u = (p) => {
    const g = p * f * t, w = g * s + s, S = Math.pow(f, 2) * Math.pow(p, 2) * t, j = Math.exp(-g), N = ih(Math.pow(p, 2), f);
    return (-o(p) + zf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), g = (p - s) * t + 1;
    return -zf + b * g;
  }, u = (p) => {
    const b = Math.exp(-p * t), g = (s - p) * (t * t);
    return b * g;
  });
  const m = 5 / t, y = wD(o, u, m);
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
const ED = ["duration", "bounce"], ND = ["stiffness", "damping", "mass"];
function lb(t, a) {
  return a.some((s) => t[s] !== void 0);
}
function CD(t) {
  let a = {
    velocity: kt.velocity,
    stiffness: kt.stiffness,
    damping: kt.damping,
    mass: kt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!lb(t, ND) && lb(t, ED))
    if (a.velocity = 0, t.visualDuration) {
      const s = t.visualDuration, i = 2 * Math.PI / (s * 1.2), o = i * i, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: kt.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const s = jD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...s,
        mass: kt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Cc(t = kt.visualDuration, a = kt.bounce) {
  const s = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: i, restDelta: o } = s;
  const u = s.keyframes[0], f = s.keyframes[s.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: y, damping: p, mass: b, duration: g, velocity: w, isResolvedFromDuration: S } = CD({
    ...s,
    velocity: -/* @__PURE__ */ ca(s.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(y * b)), C = f - u, T = /* @__PURE__ */ ca(Math.sqrt(y / b)), M = Math.abs(C) < 5;
  i || (i = M ? kt.restSpeed.granular : kt.restSpeed.default), o || (o = M ? kt.restDelta.granular : kt.restDelta.default);
  let z, R, H, Q, ie, A;
  if (N < 1)
    H = ih(T, N), Q = (j + N * T * C) / H, z = (D) => {
      const q = Math.exp(-N * T * D);
      return f - q * (Q * Math.sin(H * D) + C * Math.cos(H * D));
    }, ie = N * T * Q + C * H, A = N * T * C - Q * H, R = (D) => Math.exp(-N * T * D) * (ie * Math.sin(H * D) + A * Math.cos(H * D));
  else if (N === 1) {
    z = (q) => f - Math.exp(-T * q) * (C + (j + T * C) * q);
    const D = j + T * C;
    R = (q) => Math.exp(-T * q) * (T * D * q - j);
  } else {
    const D = T * Math.sqrt(N * N - 1);
    z = (le) => {
      const re = Math.exp(-N * T * le), k = Math.min(D * le, 300);
      return f - re * ((j + N * T * C) * Math.sinh(k) + D * C * Math.cosh(k)) / D;
    };
    const q = (j + N * T * C) / D, te = N * T * q - C * D, X = N * T * C - q * D;
    R = (le) => {
      const re = Math.exp(-N * T * le), k = Math.min(D * le, 300);
      return re * (te * Math.sinh(k) + X * Math.cosh(k));
    };
  }
  const I = {
    calculatedDuration: S && g || null,
    velocity: (D) => /* @__PURE__ */ ta(R(D)),
    next: (D) => {
      if (!S && N < 1) {
        const te = Math.exp(-N * T * D), X = Math.sin(H * D), le = Math.cos(H * D), re = f - te * (Q * X + C * le), k = /* @__PURE__ */ ta(te * (ie * X + A * le));
        return m.done = Math.abs(k) <= i && Math.abs(f - re) <= o, m.value = m.done ? f : re, m;
      }
      const q = z(D);
      if (S)
        m.done = D >= g;
      else {
        const te = /* @__PURE__ */ ta(R(D));
        m.done = Math.abs(te) <= i && Math.abs(f - q) <= o;
      }
      return m.value = m.done ? f : q, m;
    },
    toString: () => {
      const D = Math.min(rm(I), Nc), q = Q1((te) => I.next(D * te).value, D, 30);
      return D + "ms " + q;
    },
    toTransition: () => {
    }
  };
  return I;
}
Cc.applyToOptions = (t) => {
  const a = xD(t, 100, Cc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ta(a.duration), t.type = "keyframes", t;
};
const TD = 5;
function Z1(t, a, s) {
  const i = Math.max(a - TD, 0);
  return A1(s - t(i), a - i);
}
function lh({ keyframes: t, velocity: a = 0, power: s = 0.8, timeConstant: i = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: y, restDelta: p = 0.5, restSpeed: b }) {
  const g = t[0], w = {
    done: !1,
    value: g
  }, S = (A) => m !== void 0 && A < m || y !== void 0 && A > y, j = (A) => m === void 0 ? y : y === void 0 || Math.abs(m - A) < Math.abs(y - A) ? m : y;
  let N = s * a;
  const C = g + N, T = f === void 0 ? C : f(C);
  T !== C && (N = T - g);
  const M = (A) => -N * Math.exp(-A / i), z = (A) => T + M(A), R = (A) => {
    const I = M(A), D = z(A);
    w.done = Math.abs(I) <= p, w.value = w.done ? T : D;
  };
  let H, Q;
  const ie = (A) => {
    S(w.value) && (H = A, Q = Cc({
      keyframes: [w.value, j(w.value)],
      velocity: Z1(z, A, w.value),
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
      let I = !1;
      return !Q && H === void 0 && (I = !0, R(A), ie(A)), H !== void 0 && A >= H ? Q.next(A - H) : (!I && R(A), w);
    }
  };
}
function RD(t, a, s) {
  const i = [], o = s || jr.mix || X1, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let m = o(t[f], t[f + 1]);
    if (a) {
      const y = Array.isArray(a) ? a[f] || ni : a;
      m = Fc(y, m);
    }
    i.push(m);
  }
  return i;
}
function _D(t, a, { clamp: s = !0, ease: i, mixer: o } = {}) {
  const u = t.length;
  if (Js(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = RD(a, i, o), y = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let g = 0;
    if (y > 1)
      for (; g < t.length - 2 && !(b < t[g + 1]); g++)
        ;
    const w = /* @__PURE__ */ _1(t[g], t[g + 1], b);
    return m[g](w);
  };
  return s ? (b) => p(wr(t[0], t[u - 1], b)) : p;
}
function MD(t, a) {
  const s = t[t.length - 1];
  for (let i = 1; i <= a; i++) {
    const o = /* @__PURE__ */ _1(0, a, i);
    t.push(Rl(s, 1, o));
  }
}
function AD(t) {
  const a = [0];
  return MD(a, t.length - 1), a;
}
function DD(t, a) {
  return t.map((s) => s * a);
}
function kD(t, a) {
  return t.map(() => a || B1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: s, ease: i = "easeInOut" }) {
  const o = H5(i) ? i.map(tb) : tb(i), u = {
    done: !1,
    value: a[0]
  }, f = DD(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === a.length ? s : AD(a),
    t
  ), m = _D(f, a, {
    ease: Array.isArray(o) ? o : kD(a, o)
  });
  return {
    calculatedDuration: t,
    next: (y) => (u.value = m(y), u.done = y >= t, u)
  };
}
const zD = (t) => t !== null;
function Yc(t, { repeat: a, repeatType: s = "loop" }, i, o = 1) {
  const u = t.filter(zD), m = o < 0 || a && s !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || i === void 0 ? u[m] : i;
}
const OD = {
  decay: lh,
  inertia: lh,
  tween: fl,
  keyframes: fl,
  spring: Cc
};
function J1(t) {
  typeof t.type == "string" && (t.type = OD[t.type]);
}
class sm {
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
const LD = (t) => t / 100;
class Tc extends sm {
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
    J1(a);
    const { type: s = fl, repeat: i = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const y = s || fl;
    y !== fl && typeof m[0] != "number" && (this.mixKeyframes = Fc(LD, X1(m[0], m[1])), m = [0, 100]);
    const p = y({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = y({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = rm(p));
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
    const { delay: p = 0, keyframes: b, repeat: g, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), s ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), M = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, R = i;
    if (g) {
      const A = Math.min(this.currentTime, o) / m;
      let I = Math.floor(A), D = A % 1;
      !D && A >= 1 && (D = 1), D === 1 && I--, I = Math.min(I, g + 1), !!(I % 2) && (w === "reverse" ? (D = 1 - D, S && (D -= S / m)) : w === "mirror" && (R = f)), z = wr(0, 1, D) * m;
    }
    let H;
    M ? (this.delayState.value = b[0], H = this.delayState) : H = R.next(z), u && !M && (H.value = u(H.value));
    let { done: Q } = H;
    !M && y !== null && (Q = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ie = this.holdTime === null && (this.state === "finished" || this.state === "running" && Q);
    return ie && j !== lh && (H.value = Yc(b, this.options, C, this.speed)), N && N(H.value), ie && this.finish(), H;
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
    return Z1((i) => this.generator.next(i).value, a, s);
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
    const { driver: a = bD, startTime: s } = this.options;
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
function $D(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Kr = (t) => t * 180 / Math.PI, oh = (t) => {
  const a = Kr(Math.atan2(t[1], t[0]));
  return ch(a);
}, UD = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: oh,
  rotateZ: oh,
  skewX: (t) => Kr(Math.atan(t[1])),
  skewY: (t) => Kr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, ch = (t) => (t = t % 360, t < 0 && (t += 360), t), ob = oh, cb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), ub = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), BD = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: cb,
  scaleY: ub,
  scale: (t) => (cb(t) + ub(t)) / 2,
  rotateX: (t) => ch(Kr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => ch(Kr(Math.atan2(-t[2], t[0]))),
  rotateZ: ob,
  rotate: ob,
  skewX: (t) => Kr(Math.atan(t[4])),
  skewY: (t) => Kr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function uh(t) {
  return t.includes("scale") ? 1 : 0;
}
function dh(t, a) {
  if (!t || t === "none")
    return uh(a);
  const s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, o;
  if (s)
    i = BD, o = s;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = UD, o = m;
  }
  if (!o)
    return uh(a);
  const u = i[a], f = o[1].split(",").map(ID);
  return typeof u == "function" ? u(f) : f[u];
}
const VD = (t, a) => {
  const { transform: s = "none" } = getComputedStyle(t);
  return dh(s, a);
};
function ID(t) {
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
], si = new Set(ri), db = (t) => t === ai || t === Me, HD = /* @__PURE__ */ new Set(["x", "y", "z"]), qD = ri.filter((t) => !HD.has(t));
function FD(t) {
  const a = [];
  return qD.forEach((s) => {
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
  x: (t, { transform: a }) => dh(a, "x"),
  y: (t, { transform: a }) => dh(a, "y")
};
Sr.translateX = Sr.x;
Sr.translateY = Sr.y;
const Qr = /* @__PURE__ */ new Set();
let fh = !1, hh = !1, mh = !1;
function W1() {
  if (hh) {
    const t = Array.from(Qr).filter((i) => i.needsMeasurement), a = new Set(t.map((i) => i.element)), s = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      const o = FD(i);
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
  hh = !1, fh = !1, Qr.forEach((t) => t.complete(mh)), Qr.clear();
}
function eS() {
  Qr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (hh = !0);
  });
}
function YD() {
  mh = !0, eS(), W1(), mh = !1;
}
class im {
  constructor(a, s, i, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = s, this.name = i, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), fh || (fh = !0, na.read(eS), na.resolveKeyframes(W1))) : (this.readKeyframes(), this.complete());
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
    $D(a);
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
const GD = (t) => t.startsWith("--");
function tS(t, a, s) {
  GD(a) ? t.style.setProperty(a, s) : t.style[a] = s;
}
const PD = {};
function nS(t, a) {
  const s = /* @__PURE__ */ R1(t);
  return () => PD[a] ?? s();
}
const KD = /* @__PURE__ */ nS(() => window.ScrollTimeline !== void 0, "scrollTimeline"), aS = /* @__PURE__ */ nS(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, s, i]) => `cubic-bezier(${t}, ${a}, ${s}, ${i})`, fb = {
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
function rS(t, a) {
  if (t)
    return typeof t == "function" ? aS() ? Q1(t, a) : "ease-out" : V1(t) ? ol(t) : Array.isArray(t) ? t.map((s) => rS(s, a) || fb.easeOut) : fb[t];
}
function XD(t, a, s, { delay: i = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: y } = {}, p = void 0) {
  const b = {
    [a]: s
  };
  y && (b.offset = y);
  const g = rS(m, o);
  Array.isArray(g) && (b.easing = g);
  const w = {
    delay: i,
    duration: o,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (w.pseudoElement = p), t.animate(b, w);
}
function sS(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function QD({ type: t, ...a }) {
  return sS(t) && aS() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class iS extends sm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: s, name: i, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: y } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Js(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = QD(a);
    this.animation = XD(s, i, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Yc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), tS(s, i, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && KD() ? (this.animation.timeline = a, s && (this.animation.rangeStart = s), i && (this.animation.rangeEnd = i), ni) : o(this);
  }
}
const lS = {
  anticipate: $1,
  backInOut: L1,
  circInOut: U1
};
function ZD(t) {
  return t in lS;
}
function JD(t) {
  typeof t.ease == "string" && ZD(t.ease) && (t.ease = lS[t.ease]);
}
const Of = 10;
class WD extends iS {
  constructor(a) {
    JD(a), J1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new Tc({
      ...f,
      autoplay: !1
    }), y = Math.max(Of, In.now() - this.startTime), p = wr(0, Of, y - Of), b = m.sample(y).value, { name: g } = this.options;
    u && g && tS(u, g, b), s.setWithVelocity(m.sample(Math.max(0, y - p)).value, b, p), m.stop();
  }
}
const hb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ua.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function ek(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let s = 0; s < t.length; s++)
    if (t[s] !== a)
      return !0;
}
function tk(t, a, s, i) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = hb(o, a), m = hb(u, a);
  return Nl(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : ek(t) || (s === "spring" || sS(s)) && i;
}
function ph(t) {
  t.duration = 0, t.type = "keyframes";
}
const oS = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), nk = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function ak(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && nk.test(t[a]))
      return !0;
  return !1;
}
const rk = /* @__PURE__ */ new Set([
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
]), sk = /* @__PURE__ */ R1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ik(t) {
  const { motionValue: a, name: s, repeatDelay: i, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return sk() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (oS.has(s) || rk.has(s) && ak(m)) && (s !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !i && o !== "mirror" && u !== 0 && f !== "inertia";
}
const lk = 40;
class ok extends sm {
  constructor({ autoplay: a = !0, delay: s = 0, type: i = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: m, name: y, motionValue: p, element: b, ...g }) {
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
      ...g
    }, S = b?.KeyframeResolver || im;
    this.keyframeResolver = new S(m, (j, N, C) => this.onKeyframesResolved(j, N, w, !C), y, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, s, i, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: m, delay: y, isHandoff: p, onUpdate: b } = i;
    this.resolvedAt = In.now();
    let g = !0;
    tk(a, u, f, m) || (g = !1, (jr.instantAnimations || !y) && b?.(Yc(a, i, s)), a[0] = a[a.length - 1], ph(i), i.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > lk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...i,
      keyframes: a
    }, j = g && !p && ik(S), N = S.motionValue?.owner?.current;
    let C;
    if (j)
      try {
        C = new WD({
          ...S,
          element: N
        });
      } catch {
        C = new Tc(S);
      }
    else
      C = new Tc(S);
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
    return this._animation || (this.keyframeResolver?.resume(), YD()), this._animation;
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
function cS(t, a, s, i = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * i;
  return typeof s == "function" ? s(u, f) : o === 1 ? u * i : m - u * i;
}
const ck = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function uk(t) {
  const a = ck.exec(t);
  if (!a)
    return [,];
  const [, s, i, o] = a;
  return [`--${s ?? i}`, o];
}
const dk = 4;
function uS(t, a, s = 1) {
  Js(s <= dk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, o] = uk(t);
  if (!i)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(i);
  if (u) {
    const f = u.trim();
    return C1(f) ? parseFloat(f) : f;
  }
  return em(o) ? uS(o, a, s + 1) : o;
}
const fk = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, hk = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), mk = {
  type: "keyframes",
  duration: 0.8
}, pk = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, gk = (t, { keyframes: a }) => a.length > 2 ? mk : si.has(t) ? t.startsWith("scale") ? hk(a[1]) : fk : pk;
function dS(t, a) {
  if (t?.inherit && a) {
    const { inherit: s, ...i } = t;
    return { ...a, ...i };
  }
  return t;
}
function fS(t, a) {
  const s = t?.[a] ?? t?.default ?? t;
  return s !== t ? dS(s, t) : s;
}
const vk = /* @__PURE__ */ new Set([
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
function yk(t) {
  for (const a in t)
    if (!vk.has(a))
      return !0;
  return !1;
}
const bk = (t, a, s, i = {}, o, u) => (f) => {
  const m = fS(i, t) || {}, y = m.delay || i.delay || 0;
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
  yk(m) || Object.assign(b, gk(t, b)), b.duration && (b.duration = /* @__PURE__ */ ta(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ta(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let g = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (ph(b), b.delay === 0 && (g = !0)), (jr.instantAnimations || jr.skipAnimations || o?.shouldSkipAnimations) && (g = !0, ph(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, g && !u && a.get() !== void 0) {
    const w = Yc(b.keyframes, m);
    if (w !== void 0) {
      na.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Tc(b) : new ok(b);
};
function mb(t) {
  const a = [{}, {}];
  return t?.values.forEach((s, i) => {
    a[0][i] = s.get(), a[1][i] = s.getVelocity();
  }), a;
}
function lm(t, a, s, i) {
  if (typeof a == "function") {
    const [o, u] = mb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = mb(i);
    a = a(s !== void 0 ? s : t.custom, o, u);
  }
  return a;
}
function Zr(t, a, s) {
  const i = t.getProps();
  return lm(i, a, s !== void 0 ? s : i.custom, t);
}
const hS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ri
]), pb = 30, xk = (t) => !isNaN(parseFloat(t));
class Sk {
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
    this.current = a, this.updatedAt = In.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = xk(this.current));
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
    this.events[a] || (this.events[a] = new M1());
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > pb)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, pb);
    return A1(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
function Rc(t, a) {
  return new Sk(t, a);
}
const gh = (t) => Array.isArray(t);
function wk(t, a, s) {
  t.hasValue(a) ? t.getValue(a).set(s) : t.addValue(a, Rc(s));
}
function jk(t) {
  return gh(t) ? t[t.length - 1] || 0 : t;
}
function Ek(t, a) {
  const s = Zr(t, a);
  let { transitionEnd: i = {}, transition: o = {}, ...u } = s || {};
  u = { ...u, ...i };
  for (const f in u) {
    const m = jk(u[f]);
    wk(t, f, m);
  }
}
const vn = (t) => !!(t && t.getVelocity);
function Nk(t) {
  return !!(vn(t) && t.add);
}
function Ck(t, a) {
  const s = t.getValue("willChange");
  if (Nk(s))
    return s.add(a);
  if (!s && jr.WillChange) {
    const i = new jr.WillChange("auto");
    t.addValue("willChange", i), i.add(a);
  }
}
function om(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const Tk = "framerAppearId", mS = "data-" + om(Tk);
function Rk(t) {
  return t.props[mS];
}
function _k({ protectedKeys: t, needsAnimating: a }, s) {
  const i = t.hasOwnProperty(s) && a[s] !== !0;
  return a[s] = !1, i;
}
function pS(t, a, { delay: s = 0, transitionOverride: i, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const y = t.getDefaultTransition();
  u = u ? dS(u, y) : y;
  const p = u?.reduceMotion;
  i && (u = i);
  const b = [], g = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || g && _k(g, w))
      continue;
    const N = {
      delay: s,
      ...fS(u || {}, w)
    }, C = S.get();
    if (C !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === C && !N.velocity) {
      na.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const R = Rk(t);
      if (R) {
        const H = window.MotionHandoffAnimation(R, w, na);
        H !== null && (N.startTime = H, T = !0);
      }
    }
    Ck(t, w);
    const M = p ?? t.shouldReduceMotion;
    S.start(bk(w, S, j, M && hS.has(w) ? { type: !1 } : N, t, T));
    const z = S.animation;
    z && b.push(z);
  }
  if (f) {
    const w = () => na.update(() => {
      f && Ek(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function vh(t, a, s = {}) {
  const i = Zr(t, a, s.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = i || {};
  s.transitionOverride && (o = s.transitionOverride);
  const u = i ? () => Promise.all(pS(t, i, s)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: g } = o;
    return Mk(t, a, y, p, b, g, s);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [y, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return y().then(() => p());
  } else
    return Promise.all([u(), f(s.delay)]);
}
function Mk(t, a, s = 0, i = 0, o = 0, u = 1, f) {
  const m = [];
  for (const y of t.variantChildren)
    y.notify("AnimationStart", a), m.push(vh(y, a, {
      ...f,
      delay: s + (typeof i == "function" ? 0 : i) + cS(t.variantChildren, y, i, o, u)
    }).then(() => y.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function Ak(t, a, s = {}) {
  t.notify("AnimationStart", a);
  let i;
  if (Array.isArray(a)) {
    const o = a.map((u) => vh(t, u, s));
    i = Promise.all(o);
  } else if (typeof a == "string")
    i = vh(t, a, s);
  else {
    const o = typeof a == "function" ? Zr(t, a, s.custom) : a;
    i = Promise.all(pS(t, o, s));
  }
  return i.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const Dk = {
  test: (t) => t === "auto",
  parse: (t) => t
}, gS = (t) => (a) => a.test(t), vS = [ai, Me, Ks, vr, eD, W5, Dk], gb = (t) => vS.find(gS(t));
function kk(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || T1(t) : !0;
}
const zk = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Ok(t) {
  const [a, s] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [i] = s.match(tm) || [];
  if (!i)
    return t;
  const o = s.replace(i, "");
  let u = zk.has(a) ? 1 : 0;
  return i !== s && (u *= 100), a + "(" + u + o + ")";
}
const Lk = /\b([a-z-]*)\(.*?\)/gu, yh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = t.match(Lk);
    return a ? a.map(Ok).join(" ") : t;
  }
}, bh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = ua.parse(t);
    return ua.createTransformer(t)(a.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, vb = {
  ...ai,
  transform: Math.round
}, $k = {
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
  distance: Me,
  translateX: Me,
  translateY: Me,
  translateZ: Me,
  x: Me,
  y: Me,
  z: Me,
  perspective: Me,
  transformPerspective: Me,
  opacity: yl,
  originX: ab,
  originY: ab,
  originZ: Me
}, cm = {
  // Border props
  borderWidth: Me,
  borderTopWidth: Me,
  borderRightWidth: Me,
  borderBottomWidth: Me,
  borderLeftWidth: Me,
  borderRadius: Me,
  borderTopLeftRadius: Me,
  borderTopRightRadius: Me,
  borderBottomRightRadius: Me,
  borderBottomLeftRadius: Me,
  // Positioning props
  width: Me,
  maxWidth: Me,
  height: Me,
  maxHeight: Me,
  top: Me,
  right: Me,
  bottom: Me,
  left: Me,
  inset: Me,
  insetBlock: Me,
  insetBlockStart: Me,
  insetBlockEnd: Me,
  insetInline: Me,
  insetInlineStart: Me,
  insetInlineEnd: Me,
  // Spacing props
  padding: Me,
  paddingTop: Me,
  paddingRight: Me,
  paddingBottom: Me,
  paddingLeft: Me,
  paddingBlock: Me,
  paddingBlockStart: Me,
  paddingBlockEnd: Me,
  paddingInline: Me,
  paddingInlineStart: Me,
  paddingInlineEnd: Me,
  margin: Me,
  marginTop: Me,
  marginRight: Me,
  marginBottom: Me,
  marginLeft: Me,
  marginBlock: Me,
  marginBlockStart: Me,
  marginBlockEnd: Me,
  marginInline: Me,
  marginInlineStart: Me,
  marginInlineEnd: Me,
  // Typography
  fontSize: Me,
  // Misc
  backgroundPositionX: Me,
  backgroundPositionY: Me,
  ...$k,
  zIndex: vb,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: vb
}, Uk = {
  ...cm,
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
  filter: yh,
  WebkitFilter: yh,
  mask: bh,
  WebkitMask: bh
}, yS = (t) => Uk[t], Bk = /* @__PURE__ */ new Set([yh, bh]);
function bS(t, a) {
  let s = yS(t);
  return Bk.has(s) || (s = ua), s.getAnimatableNone ? s.getAnimatableNone(a) : void 0;
}
const Vk = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Ik(t, a, s) {
  let i = 0, o;
  for (; i < t.length && !o; ) {
    const u = t[i];
    typeof u == "string" && !Vk.has(u) && Ws(u).values.length && (o = t[i]), i++;
  }
  if (o && s)
    for (const u of a)
      t[u] = bS(s, o);
}
class Hk extends im {
  constructor(a, s, i, o, u) {
    super(a, s, i, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: s, name: i } = this;
    if (!s || !s.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let g = a[b];
      if (typeof g == "string" && (g = g.trim(), em(g))) {
        const w = uS(g, s.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !hS.has(i) || a.length !== 2)
      return;
    const [o, u] = a, f = gb(o), m = gb(u), y = nb(o), p = nb(u);
    if (y !== p && Sr[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (db(f) && db(m))
        for (let b = 0; b < a.length; b++) {
          const g = a[b];
          typeof g == "string" && (a[b] = parseFloat(g));
        }
      else Sr[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: s } = this, i = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || kk(a[o])) && i.push(o);
    i.length && Ik(a, i, s);
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
function qk(t, a, s) {
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
const xS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function pc(t) {
  return z5(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Fk } = /* @__PURE__ */ I1(queueMicrotask, !1), Yk = {
  y: !1
};
function Gk() {
  return Yk.y;
}
function SS(t, a) {
  const s = qk(t), i = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: i.signal
  };
  return [s, o, () => i.abort()];
}
function Pk(t) {
  return !(t.pointerType === "touch" || Gk());
}
function Kk(t, a, s = {}) {
  const [i, o, u] = SS(t, s);
  return i.forEach((f) => {
    let m = !1, y = !1, p;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, g = (C) => {
      p && (p(C), p = void 0), b();
    }, w = (C) => {
      m = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), y && (y = !1, g(C));
    }, S = () => {
      m = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (C) => {
      if (C.pointerType !== "touch") {
        if (m) {
          y = !0;
          return;
        }
        g(C);
      }
    }, N = (C) => {
      if (!Pk(C))
        return;
      y = !1;
      const T = a(f, C);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const wS = (t, a) => a ? t === a ? !0 : wS(t, a.parentElement) : !1, Xk = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Qk = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Zk(t) {
  return Qk.has(t.tagName) || t.isContentEditable === !0;
}
const gc = /* @__PURE__ */ new WeakSet();
function yb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Lf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Jk = (t, a) => {
  const s = t.currentTarget;
  if (!s)
    return;
  const i = yb(() => {
    if (gc.has(s))
      return;
    Lf(s, "down");
    const o = yb(() => {
      Lf(s, "up");
    }), u = () => Lf(s, "cancel");
    s.addEventListener("keyup", o, a), s.addEventListener("blur", u, a);
  });
  s.addEventListener("keydown", i, a), s.addEventListener("blur", () => s.removeEventListener("keydown", i), a);
};
function bb(t) {
  return Xk(t) && !0;
}
const xb = /* @__PURE__ */ new WeakSet();
function Wk(t, a, s = {}) {
  const [i, o, u] = SS(t, s), f = (m) => {
    const y = m.currentTarget;
    if (!bb(m) || xb.has(m))
      return;
    gc.add(y), s.stopPropagation && xb.add(m);
    const p = a(y, m), b = (S, j) => {
      window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", w), gc.has(y) && gc.delete(y), bb(S) && typeof p == "function" && p(S, { success: j });
    }, g = (S) => {
      b(S, y === window || y === document || s.useGlobalTarget || wS(y, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", g, o), window.addEventListener("pointercancel", w, o);
  };
  return i.forEach((m) => {
    (s.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), pc(m) && (m.addEventListener("focus", (p) => Jk(p, o)), !Zk(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const ez = [...vS, Kt, ua], tz = (t) => ez.find(gS(t)), Sb = () => ({ min: 0, max: 0 }), jS = () => ({
  x: Sb(),
  y: Sb()
}), nz = /* @__PURE__ */ new WeakMap();
function Gc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const um = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], dm = ["initial", ...um];
function Pc(t) {
  return Gc(t.animate) || dm.some((a) => bl(t[a]));
}
function ES(t) {
  return !!(Pc(t) || t.variants);
}
function az(t, a, s) {
  for (const i in a) {
    const o = a[i], u = s[i];
    if (vn(o))
      t.addValue(i, o);
    else if (vn(u))
      t.addValue(i, Rc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(i)) {
        const f = t.getValue(i);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(i);
        t.addValue(i, Rc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const i in s)
    a[i] === void 0 && t.removeValue(i);
  return a;
}
const _c = { current: null }, fm = { current: !1 }, rz = typeof window < "u";
function NS() {
  if (fm.current = !0, !!rz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => _c.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      _c.current = !1;
}
const wb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Mc = {};
function CS(t) {
  Mc = t;
}
function sz() {
  return Mc;
}
class iz {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = im, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = In.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, na.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = s.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = s, this.presenceContext = i, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Pc(s), this.isVariantNode = ES(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: g, ...w } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const S in w) {
      const j = w[S];
      p[S] !== void 0 && vn(j) && j.set(p[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = a, nz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (fm.current || NS(), this.shouldReduceMotion = _c.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ah(this.notifyUpdate), ah(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), s.accelerate && oS.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: y, ease: p, duration: b } = s.accelerate, g = new iS({
        element: this.current,
        name: a,
        keyframes: m,
        times: y,
        ease: p,
        duration: /* @__PURE__ */ ta(b)
      }), w = f(g);
      this.valueSubscriptions.set(a, () => {
        w(), g.cancel();
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
    for (a in Mc) {
      const s = Mc[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : jS();
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
    for (let i = 0; i < wb.length; i++) {
      const o = wb[i];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = az(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i === void 0 && s !== void 0 && (i = Rc(s === null ? void 0 : s, { owner: this }), this.addValue(a, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, s) {
    let i = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return i != null && (typeof i == "string" && (C1(i) || T1(i)) ? i = parseFloat(i) : !tz(i) && ua.test(s) && (i = bS(a, s)), this.setBaseTarget(a, vn(i) ? i.get() : i)), vn(i) ? i.get() : i;
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
      const u = lm(this.props, s, this.presenceContext?.custom);
      u && (i = u[a]);
    }
    if (s && i !== void 0)
      return i;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !vn(o) ? o : this.initialValues[a] !== void 0 && i === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, s) {
    return this.events[a] || (this.events[a] = new M1()), this.events[a].add(s);
  }
  notify(a, ...s) {
    this.events[a] && this.events[a].notify(...s);
  }
  scheduleRenderMicrotask() {
    Fk.render(this.render);
  }
}
class TS extends iz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Hk;
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
function lz({ top: t, left: a, right: s, bottom: i }) {
  return {
    x: { min: a, max: s },
    y: { min: t, max: i }
  };
}
function oz(t, a) {
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
function cz(t, a) {
  return lz(oz(t.getBoundingClientRect(), a));
}
const uz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, dz = ri.length;
function fz(t, a, s) {
  let i = "", o = !0;
  for (let u = 0; u < dz; u++) {
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
      const p = xS(m, cm[f]);
      if (!y) {
        o = !1;
        const b = uz[f] || f;
        i += `${b}(${p}) `;
      }
      s && (a[f] = p);
    }
  }
  return i = i.trim(), s ? i = s(a, o ? "" : i) : o && (i = "none"), i;
}
function hm(t, a, s) {
  const { style: i, vars: o, transformOrigin: u } = t;
  let f = !1, m = !1;
  for (const y in a) {
    const p = a[y];
    if (si.has(y)) {
      f = !0;
      continue;
    } else if (q1(y)) {
      o[y] = p;
      continue;
    } else {
      const b = xS(p, cm[y]);
      y.startsWith("origin") ? (m = !0, u[y] = b) : i[y] = b;
    }
  }
  if (a.transform || (f || s ? i.transform = fz(a, t.transform, s) : i.transform && (i.transform = "none")), m) {
    const { originX: y = "50%", originY: p = "50%", originZ: b = 0 } = u;
    i.transformOrigin = `${y} ${p} ${b}`;
  }
}
function RS(t, { style: a, vars: s }, i, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, i);
  for (f in s)
    u.setProperty(f, s[f]);
}
function jb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const nl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (Me.test(t))
        t = parseFloat(t);
      else
        return t;
    const s = jb(t, a.target.x), i = jb(t, a.target.y);
    return `${s}% ${i}%`;
  }
}, hz = {
  correct: (t, { treeScale: a, projectionDelta: s }) => {
    const i = t, o = ua.parse(t);
    if (o.length > 5)
      return i;
    const u = ua.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = s.x.scale * a.x, y = s.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= y;
    const p = Rl(m, y, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, mz = {
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
  boxShadow: hz
};
function _S(t, { layout: a, layoutId: s }) {
  return si.has(t) || t.startsWith("origin") || (a || s !== void 0) && (!!mz[t] || t === "opacity");
}
function mm(t, a, s) {
  const i = t.style, o = a?.style, u = {};
  if (!i)
    return u;
  for (const f in i)
    (vn(i[f]) || o && vn(o[f]) || _S(f, t) || s?.getValue(f)?.liveStyle !== void 0) && (u[f] = i[f]);
  return u;
}
function pz(t) {
  return window.getComputedStyle(t);
}
class gz extends TS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = RS;
  }
  readValueFromInstance(a, s) {
    if (si.has(s))
      return this.projection?.isProjecting ? uh(s) : VD(a, s);
    {
      const i = pz(a), o = (q1(s) ? i.getPropertyValue(s) : i[s]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: s }) {
    return cz(a, s);
  }
  build(a, s, i) {
    hm(a, s, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return mm(a, s, i);
  }
}
const vz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, yz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function bz(t, a, s = 1, i = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? vz : yz;
  t[u.offset] = `${-i}`, t[u.array] = `${a} ${s}`;
}
const xz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function MS(t, {
  attrX: a,
  attrY: s,
  attrScale: i,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, y, p, b) {
  if (hm(t, m, p), y) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: g, style: w } = t;
  g.transform && (w.transform = g.transform, delete g.transform), (w.transform || g.transformOrigin) && (w.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete g.transformBox);
  for (const S of xz)
    g[S] !== void 0 && (w[S] = g[S], delete g[S]);
  a !== void 0 && (g.x = a), s !== void 0 && (g.y = s), i !== void 0 && (g.scale = i), o !== void 0 && bz(g, o, u, f, !1);
}
const AS = /* @__PURE__ */ new Set([
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
]), DS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Sz(t, a, s, i) {
  RS(t, a, void 0, i);
  for (const o in a.attrs)
    t.setAttribute(AS.has(o) ? o : om(o), a.attrs[o]);
}
function kS(t, a, s) {
  const i = mm(t, a, s);
  for (const o in t)
    if (vn(t[o]) || vn(a[o])) {
      const u = ri.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      i[u] = t[o];
    }
  return i;
}
class wz extends TS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = jS;
  }
  getBaseTargetFromProps(a, s) {
    return a[s];
  }
  readValueFromInstance(a, s) {
    if (si.has(s)) {
      const i = yS(s);
      return i && i.default || 0;
    }
    return s = AS.has(s) ? s : om(s), a.getAttribute(s);
  }
  scrapeMotionValuesFromProps(a, s, i) {
    return kS(a, s, i);
  }
  build(a, s, i) {
    MS(a, s, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(a, s, i, o) {
    Sz(a, s, i, o);
  }
  mount(a) {
    this.isSVGTag = DS(a.tagName), super.mount(a);
  }
}
const jz = dm.length;
function zS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const s = t.parent ? zS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (s.initial = t.props.initial), s;
  }
  const a = {};
  for (let s = 0; s < jz; s++) {
    const i = dm[s], o = t.props[i];
    (bl(o) || o === !1) && (a[i] = o);
  }
  return a;
}
function OS(t, a) {
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
const Ez = [...um].reverse(), Nz = um.length;
function Cz(t) {
  return (a) => Promise.all(a.map(({ animation: s, options: i }) => Ak(t, s, i)));
}
function Tz(t) {
  let a = Cz(t), s = Eb(), i = !0, o = !1;
  const u = (p) => (b, g) => {
    const w = Zr(t, g, p === "exit" ? t.presenceContext?.custom : void 0);
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
    const { props: b } = t, g = zS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < Nz; T++) {
      const M = Ez[T], z = s[M], R = b[M] !== void 0 ? b[M] : g[M], H = bl(R), Q = M === p ? z.isActive : null;
      Q === !1 && (N = T);
      let ie = R === g[M] && R !== b[M] && H;
      if (ie && (i || o) && t.manuallyAnimateOnMount && (ie = !1), z.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && Q === null || // If we didn't and don't have any defined prop for this animation type
      !R && !z.prevProp || // Or if the prop doesn't define an animation
      Gc(R) || typeof R == "boolean")
        continue;
      if (M === "exit" && z.isActive && Q !== !0) {
        z.prevResolvedValues && (j = {
          ...j,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = Rz(z.prevProp, R);
      let I = A || // If we're making this variant active, we want to always make it active
      M === p && z.isActive && !ie && H || // If we removed a higher-priority variant (i is in reverse order)
      T > N && H, D = !1;
      const q = Array.isArray(R) ? R : [R];
      let te = q.reduce(u(M), {});
      Q === !1 && (te = {});
      const { prevResolvedValues: X = {} } = z, le = {
        ...X,
        ...te
      }, re = (F) => {
        I = !0, S.has(F) && (D = !0, S.delete(F)), z.needsAnimating[F] = !0;
        const Y = t.getValue(F);
        Y && (Y.liveStyle = !1);
      };
      for (const F in le) {
        const Y = te[F], ue = X[F];
        if (j.hasOwnProperty(F))
          continue;
        let _ = !1;
        gh(Y) && gh(ue) ? _ = !OS(Y, ue) : _ = Y !== ue, _ ? Y != null ? re(F) : S.add(F) : Y !== void 0 && S.has(F) ? re(F) : z.protectedKeys[F] = !0;
      }
      z.prevProp = R, z.prevResolvedValues = te, z.isActive && (j = { ...j, ...te }), (i || o) && t.blockInitialAnimation && (I = !1);
      const k = ie && A;
      I && (!k || D) && w.push(...q.map((F) => {
        const Y = { type: M };
        if (typeof F == "string" && (i || o) && !k && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ue } = t, _ = Zr(ue, F);
          if (ue.enteringChildren && _) {
            const { delayChildren: ne } = _.transition || {};
            Y.delay = cS(ue.enteringChildren, t, ne);
          }
        }
        return {
          animation: F,
          options: Y
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
    const g = m(p);
    for (const w in s)
      s[w].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: m,
    setActive: y,
    setAnimateFunction: f,
    getState: () => s,
    reset: () => {
      s = Eb(), o = !0;
    }
  };
}
function Rz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !OS(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Eb() {
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
function Nb(t, a, s, i = { passive: !0 }) {
  return t.addEventListener(a, s, i), () => t.removeEventListener(a, s);
}
function _z(t) {
  return vn(t) ? t.get() : t;
}
const pm = v.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Cb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function Mz(...t) {
  return (a) => {
    let s = !1;
    const i = t.map((o) => {
      const u = Cb(o, a);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let o = 0; o < i.length; o++) {
          const u = i[o];
          typeof u == "function" ? u() : Cb(t[o], null);
        }
      };
  };
}
function Az(...t) {
  return v.useCallback(Mz(...t), t);
}
class Dz extends v.Component {
  getSnapshotBeforeUpdate(a) {
    const s = this.props.childRef.current;
    if (pc(s) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const i = s.offsetParent, o = pc(i) && i.offsetWidth || 0, u = pc(i) && i.offsetHeight || 0, f = getComputedStyle(s), m = this.props.sizeRef.current;
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
function kz({ children: t, isPresent: a, anchorX: s, anchorY: i, root: o, pop: u }) {
  const f = v.useId(), m = v.useRef(null), y = v.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = v.useContext(pm), b = t.props?.ref ?? t?.ref, g = Az(m, b);
  return v.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: C, bottom: T } = y.current;
    if (a || u === !1 || !m.current || !w || !S)
      return;
    const M = s === "left" ? `left: ${N}` : `right: ${C}`, z = i === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const R = document.createElement("style");
    p && (R.nonce = p);
    const H = o ?? document.head;
    return H.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${M}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), H.contains(R) && H.removeChild(R);
    };
  }, [a]), c.jsx(Dz, { isPresent: a, childRef: m, sizeRef: y, pop: u, children: u === !1 ? t : v.cloneElement(t, { ref: g }) });
}
const zz = ({ children: t, initial: a, isPresent: s, onExitComplete: i, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: y, root: p }) => {
  const b = Zh(Oz), g = v.useId();
  let w = !0, S = v.useMemo(() => (w = !1, {
    id: g,
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
  return u && w && (S = { ...S }), v.useMemo(() => {
    b.forEach((j, N) => b.set(N, !1));
  }, [s]), v.useEffect(() => {
    !s && !b.size && i && i();
  }, [s]), t = c.jsx(kz, { pop: f === "popLayout", isPresent: s, anchorX: m, anchorY: y, root: p, children: t }), c.jsx(qc.Provider, { value: S, children: t });
};
function Oz() {
  return /* @__PURE__ */ new Map();
}
function Lz(t = !0) {
  const a = v.useContext(qc);
  if (a === null)
    return [!0, null];
  const { isPresent: s, onExitComplete: i, register: o } = a, u = v.useId();
  v.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const f = v.useCallback(() => t && i && i(u), [u, i, t]);
  return !s && i ? [!1, f] : [!0];
}
const Wo = (t) => t.key || "";
function Tb(t) {
  const a = [];
  return v.Children.forEach(t, (s) => {
    v.isValidElement(s) && a.push(s);
  }), a;
}
const LS = ({ children: t, custom: a, initial: s = !0, onExitComplete: i, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: y = "top", root: p }) => {
  const [b, g] = Lz(f), w = v.useMemo(() => Tb(t), [t]), S = f && !b ? [] : w.map(Wo), j = v.useRef(!0), N = v.useRef(w), C = Zh(() => /* @__PURE__ */ new Map()), T = v.useRef(/* @__PURE__ */ new Set()), [M, z] = v.useState(w), [R, H] = v.useState(w);
  N1(() => {
    j.current = !1, N.current = w;
    for (let A = 0; A < R.length; A++) {
      const I = Wo(R[A]);
      S.includes(I) ? (C.delete(I), T.current.delete(I)) : C.get(I) !== !0 && C.set(I, !1);
    }
  }, [R, S.length, S.join("-")]);
  const Q = [];
  if (w !== M) {
    let A = [...w];
    for (let I = 0; I < R.length; I++) {
      const D = R[I], q = Wo(D);
      S.includes(q) || (A.splice(I, 0, D), Q.push(D));
    }
    return u === "wait" && Q.length && (A = Q), H(Tb(A)), z(w), null;
  }
  const { forceRender: ie } = v.useContext(E1);
  return c.jsx(c.Fragment, { children: R.map((A) => {
    const I = Wo(A), D = f && !b ? !1 : w === R || S.includes(I), q = () => {
      if (T.current.has(I))
        return;
      if (C.has(I))
        T.current.add(I), C.set(I, !0);
      else
        return;
      let te = !0;
      C.forEach((X) => {
        X || (te = !1);
      }), te && (ie?.(), H(N.current), f && g?.(), i && i());
    };
    return c.jsx(zz, { isPresent: D, initial: !j.current || s ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: D ? void 0 : q, anchorX: m, anchorY: y, children: A }, I);
  }) });
}, gm = v.createContext({ strict: !1 }), Rb = {
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
let _b = !1;
function $z() {
  if (_b)
    return;
  const t = {};
  for (const a in Rb)
    t[a] = {
      isEnabled: (s) => Rb[a].some((i) => !!s[i])
    };
  CS(t), _b = !0;
}
function $S() {
  return $z(), sz();
}
function xh(t) {
  const a = $S();
  for (const s in t)
    a[s] = {
      ...a[s],
      ...t[s]
    };
  CS(a);
}
function vm({ children: t, features: a, strict: s = !1 }) {
  const [, i] = v.useState(!$f(a)), o = v.useRef(void 0);
  if (!$f(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, xh(f);
  }
  return v.useEffect(() => {
    $f(a) && a().then(({ renderer: u, ...f }) => {
      xh(f), o.current = u, i(!0);
    });
  }, []), c.jsx(gm.Provider, { value: { renderer: o.current, strict: s }, children: t });
}
function $f(t) {
  return typeof t == "function";
}
const Uz = /* @__PURE__ */ new Set([
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
function Ac(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Uz.has(t);
}
let US = (t) => !Ac(t);
function Bz(t) {
  typeof t == "function" && (US = (a) => a.startsWith("on") ? !Ac(a) : t(a));
}
try {
  Bz(require("@emotion/is-prop-valid").default);
} catch {
}
function Vz(t, a, s) {
  const i = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || vn(t[o]) || (US(o) || s === !0 && Ac(o) || !a && !Ac(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (i[o] = t[o]);
  return i;
}
const Kc = /* @__PURE__ */ v.createContext({});
function Iz(t, a) {
  if (Pc(t)) {
    const { initial: s, animate: i } = t;
    return {
      initial: s === !1 || bl(s) ? s : void 0,
      animate: bl(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function Hz(t) {
  const { initial: a, animate: s } = Iz(t, v.useContext(Kc));
  return v.useMemo(() => ({ initial: a, animate: s }), [Mb(a), Mb(s)]);
}
function Mb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const ym = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function BS(t, a, s) {
  for (const i in a)
    !vn(a[i]) && !_S(i, s) && (t[i] = a[i]);
}
function qz({ transformTemplate: t }, a) {
  return v.useMemo(() => {
    const s = ym();
    return hm(s, a, t), Object.assign({}, s.vars, s.style);
  }, [a]);
}
function Fz(t, a) {
  const s = t.style || {}, i = {};
  return BS(i, s, t), Object.assign(i, qz(t, a)), i;
}
function Yz(t, a) {
  const s = {}, i = Fz(t, a);
  return t.drag && t.dragListener !== !1 && (s.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = i, s;
}
const VS = () => ({
  ...ym(),
  attrs: {}
});
function Gz(t, a, s, i) {
  const o = v.useMemo(() => {
    const u = VS();
    return MS(u, a, DS(i), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    BS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const Pz = [
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
function bm(t) {
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
      !!(Pz.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Kz(t, a, s, { latestValues: i }, o, u = !1, f) {
  const y = (f ?? bm(t) ? Gz : Yz)(a, i, o, t), p = Vz(a, typeof t == "string", u), b = t !== v.Fragment ? { ...p, ...y, ref: s } : {}, { children: g } = a, w = v.useMemo(() => vn(g) ? g.get() : g, [g]);
  return v.createElement(t, {
    ...b,
    children: w
  });
}
function Xz({ scrapeMotionValuesFromProps: t, createRenderState: a }, s, i, o) {
  return {
    latestValues: Qz(s, i, o, t),
    renderState: a()
  };
}
function Qz(t, a, s, i) {
  const o = {}, u = i(t, {});
  for (const w in u)
    o[w] = _z(u[w]);
  let { initial: f, animate: m } = t;
  const y = Pc(t), p = ES(t);
  a && p && !y && t.inherit !== !1 && (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let b = s ? s.initial === !1 : !1;
  b = b || f === !1;
  const g = b ? m : f;
  if (g && typeof g != "boolean" && !Gc(g)) {
    const w = Array.isArray(g) ? g : [g];
    for (let S = 0; S < w.length; S++) {
      const j = lm(t, w[S]);
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
const IS = (t) => (a, s) => {
  const i = v.useContext(Kc), o = v.useContext(qc), u = () => Xz(t, a, i, o);
  return s ? u() : Zh(u);
}, Zz = /* @__PURE__ */ IS({
  scrapeMotionValuesFromProps: mm,
  createRenderState: ym
}), Jz = /* @__PURE__ */ IS({
  scrapeMotionValuesFromProps: kS,
  createRenderState: VS
}), Wz = Symbol.for("motionComponentSymbol");
function e4(t, a, s) {
  const i = v.useRef(s);
  v.useInsertionEffect(() => {
    i.current = s;
  });
  const o = v.useRef(null);
  return v.useCallback((u) => {
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
const t4 = v.createContext({});
function n4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function a4(t, a, s, i, o, u) {
  const { visualElement: f } = v.useContext(Kc), m = v.useContext(gm), y = v.useContext(qc), p = v.useContext(pm), b = p.reducedMotion, g = p.skipAnimations, w = v.useRef(null), S = v.useRef(!1);
  i = i || m.renderer, !w.current && i && (w.current = i(t, {
    visualState: a,
    parent: f,
    props: s,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: g,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = v.useContext(t4);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && r4(w.current, s, o, N);
  const C = v.useRef(!1);
  v.useInsertionEffect(() => {
    j && C.current && j.update(s, y);
  });
  const T = s[mS], M = v.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return N1(() => {
    S.current = !0, j && (C.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), M.current && j.animationState && j.animationState.animateChanges());
  }), v.useEffect(() => {
    j && (!M.current && j.animationState && j.animationState.animateChanges(), M.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), M.current = !1), j.enteringChildren = void 0);
  }), j;
}
function r4(t, a, s, i) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: y, layoutRoot: p, layoutAnchor: b, layoutCrossfade: g } = a;
  t.projection = new s(t.latestValues, a["data-framer-portal-id"] ? void 0 : HS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && n4(m),
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
    crossfade: g,
    layoutScroll: y,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function HS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : HS(t.parent);
}
function Uf(t, { forwardMotionProps: a = !1, type: s } = {}, i, o) {
  i && xh(i);
  const u = s ? s === "svg" : bm(t), f = u ? Jz : Zz;
  function m(p, b) {
    let g;
    const w = {
      ...v.useContext(pm),
      ...p,
      layoutId: s4(p)
    }, { isStatic: S } = w, j = Hz(p), N = f(p, S);
    if (!S && typeof window < "u") {
      i4();
      const C = l4(w);
      g = C.MeasureLayout, j.visualElement = a4(t, N, w, o, C.ProjectionNode, u);
    }
    return c.jsxs(Kc.Provider, { value: j, children: [g && j.visualElement ? c.jsx(g, { visualElement: j.visualElement, ...w }) : null, Kz(t, p, e4(N, j.visualElement, b), N, S, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const y = v.forwardRef(m);
  return y[Wz] = t, y;
}
function s4({ layoutId: t }) {
  const a = v.useContext(E1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function i4(t, a) {
  v.useContext(gm).strict;
}
function l4(t) {
  const a = $S(), { drag: s, layout: i } = a;
  if (!s && !i)
    return {};
  const o = { ...s, ...i };
  return {
    MeasureLayout: s?.isEnabled(t) || i?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function o4(t, a) {
  if (typeof Proxy > "u")
    return Uf;
  const s = /* @__PURE__ */ new Map(), i = (u, f) => Uf(u, f, t, a), o = (u, f) => i(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? i : (s.has(f) || s.set(f, Uf(f, void 0, t, a)), s.get(f))
  });
}
const xm = /* @__PURE__ */ o4(), c4 = (t, a) => a.isSVG ?? bm(t) ? new wz(a) : new gz(a, {
  allowProjection: t !== v.Fragment
});
class u4 extends ii {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Tz(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Gc(a) && (this.unmountControls = a.subscribe(this.node));
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
let d4 = 0;
class f4 extends ii {
  constructor() {
    super(...arguments), this.id = d4++, this.isExitComplete = !1;
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
            for (const g in b)
              this.node.getValue(g)?.jump(b[g]);
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
const h4 = {
  animation: {
    Feature: u4
  },
  exit: {
    Feature: f4
  }
};
function qS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Ab(t, a, s) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", s === "Start");
  const o = "onHover" + s, u = i[o];
  u && na.postRender(() => u(a, qS(a)));
}
class m4 extends ii {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Kk(a, (s, i) => (Ab(this.node, i, "Start"), (o) => Ab(this.node, o, "End"))));
  }
  unmount() {
  }
}
class p4 extends ii {
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
    this.unmount = Fc(Nb(this.node.current, "focus", () => this.onFocus()), Nb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Db(t, a, s) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", s === "Start");
  const o = "onTap" + (s === "End" ? "" : s), u = i[o];
  u && na.postRender(() => u(a, qS(a)));
}
class g4 extends ii {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: s, propagate: i } = this.node.props;
    this.unmount = Wk(a, (o, u) => (Db(this.node, u, "Start"), (f, { success: m }) => Db(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: i?.tap === !1
    });
  }
  unmount() {
  }
}
const Sh = /* @__PURE__ */ new WeakMap(), Bf = /* @__PURE__ */ new WeakMap(), v4 = (t) => {
  const a = Sh.get(t.target);
  a && a(t);
}, y4 = (t) => {
  t.forEach(v4);
};
function b4({ root: t, ...a }) {
  const s = t || document;
  Bf.has(s) || Bf.set(s, {});
  const i = Bf.get(s), o = JSON.stringify(a);
  return i[o] || (i[o] = new IntersectionObserver(y4, { root: t, ...a })), i[o];
}
function x4(t, a, s) {
  const i = b4(a);
  return Sh.set(t, s), i.observe(t), () => {
    Sh.delete(t), i.unobserve(t);
  };
}
const S4 = {
  some: 0,
  all: 1
};
class w4 extends ii {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: s, margin: i, amount: o = "some", once: u } = a, f = {
      root: s ? s.current : void 0,
      rootMargin: i,
      threshold: typeof o == "number" ? o : S4[o]
    }, m = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: g } = this.node.getProps(), w = p ? b : g;
      w && w(y);
    };
    this.stopObserver = x4(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(j4(a, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function j4({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (s) => t[s] !== a[s];
}
const E4 = {
  inView: {
    Feature: w4
  },
  tap: {
    Feature: g4
  },
  focus: {
    Feature: p4
  },
  hover: {
    Feature: m4
  }
}, Sm = {
  renderer: c4,
  ...h4,
  ...E4
};
function N4() {
  !fm.current && NS();
  const [t] = v.useState(_c.current);
  return t;
}
const wh = "emotion-tts:trigger-generate", jh = "emotion-tts:run-state";
function C4() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(wh));
}
function T4(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(jh, { detail: t }));
}
function R4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(wh, t), () => window.removeEventListener(wh, t));
}
function FS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (s) => {
    const i = s.detail;
    i && t(i);
  };
  return window.addEventListener(jh, a), () => window.removeEventListener(jh, a);
}
var _4 = "wksjad0", M4 = "wksjad1", A4 = "wksjad2", D4 = "wksjad3", k4 = "wksjad4", z4 = "wksjad5", O4 = "wksjad6", L4 = "wksjad7", $4 = "wksjad8", U4 = "wksjad9", B4 = "wksjada", V4 = "wksjadb", I4 = "wksjadc", H4 = "wksjadd", q4 = "wksjade", F4 = "wksjadf", Y4 = "wksjadg", Vf = "wksjadh", G4 = "wksjadi", P4 = "wksjadj", K4 = "wksjadk", X4 = "wksjadl", Q4 = "wksjadm", Z4 = "wksjadn";
const Eh = 5, J4 = 5e-3;
function YS(t, a = "") {
  return `${xa}/deployments/${t}/artifacts${a}`;
}
function W4(t) {
  const [a, s] = v.useState([]), [i, o] = v.useState(!1), [u, f] = v.useState(null), [m, y] = v.useState(0), p = v.useRef(null), b = v.useRef(!1), g = v.useCallback(() => y((w) => w + 1), []);
  return v.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), f(null), fetch(`${YS(t)}?limit=${Eh}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || s(j.artifacts.slice(0, Eh));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, m]), v.useEffect(() => FS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && g();
  }), [g]), { rows: a, loading: i, error: u, refetch: g, tick: m };
}
function eO(t, a) {
  const [s, i] = v.useState(() => /* @__PURE__ */ new Map());
  return v.useEffect(() => {
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
function tO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: s, loading: i, error: o, refetch: u, tick: f } = W4(t), m = eO(t, f), [y, p] = v.useState(null), b = N4(), g = v.useCallback(() => {
    p(null), u();
  }, [u]), w = s;
  return !i && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: _4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: M4, children: [
      /* @__PURE__ */ c.jsx("span", { className: A4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: D4, children: [
        /* @__PURE__ */ c.jsx("span", { className: k4, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: z4, children: [
          "last ",
          Eh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: O4,
            onClick: g,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: Z4, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(vm, { features: Sm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: L4, children: /* @__PURE__ */ c.jsx(LS, { initial: !1, children: w.map((S) => {
      const j = y === S.utteranceId, N = YS(
        t,
        `/${S.utteranceId}/download`
      ), C = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        xm.li,
        {
          className: $4,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: U4, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: B4,
                  onClick: () => p(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: V4, children: [
                /* @__PURE__ */ c.jsxs("div", { className: I4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: H4, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: q4, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: F4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Y4, children: aO(S.finishedAt) }),
                  C && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: G4, children: C })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: P4, children: nO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > J4 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: K4, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: X4,
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
                className: Q4,
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
function nO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), s = Math.floor(a / 60), i = a % 60;
  return s > 0 ? `${s}:${i.toString().padStart(2, "0")}` : `${i}s`;
}
function aO(t) {
  if (!t) return "—";
  const s = Math.floor(Date.now() / 1e3) - t;
  return s < 0 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : s < 86400 ? `${Math.floor(s / 3600)}h ago` : s < 604800 ? `${Math.floor(s / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function rO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function GS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const s = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(s.overflowY) || /(auto|scroll|overlay)/.test(s.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function sO() {
  if (typeof window > "u") return;
  const t = GS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function PS(t) {
  const [a, s] = v.useState(!1);
  return v.useEffect(() => {
    if (typeof window > "u") return;
    const i = GS(), o = () => {
      const f = i.reduce((m, y) => {
        const p = rO(y);
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
const KS = 360;
var iO = "_1s59p180", lO = "_1s59p181", oO = "_1s59p182", cO = "_1s59p183", uO = "_1s59p184", dO = "_1s59p185", fO = "_1s59p186", hO = "_1s59p188", mO = "_1s59p189", kb = "_1s59p18a", pO = "_1s59p18c", gO = "_1s59p18d", vO = "_1s59p18e", yO = "_1s59p18f", bO = "_1s59p18g", xO = "_1s59p18i";
function SO(t) {
  const a = ei(), [s, i] = v.useState("idle"), [o, u] = v.useState(null), [f, m] = v.useState(/* @__PURE__ */ new Map()), [y, p] = v.useState(null), [b, g] = v.useState(null), w = v.useRef(null);
  v.useEffect(() => () => {
    w.current?.();
  }, []), v.useEffect(() => {
    T4({ busy: s === "starting" || s === "running" });
  }, [s]);
  const S = v.useCallback(
    (Y) => {
      const ue = Y.status;
      (ue === "completed" || ue === "partial") && cn.success(
        ue === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), j = v.useCallback(async () => {
    i("starting"), p(null), m(/* @__PURE__ */ new Map()), g(null);
    try {
      const Y = await eT(t.deploymentId, t.createPayload);
      u(Y.runId), i("running"), w.current?.(), w.current = Yy(
        t.deploymentId,
        Y.runId,
        (ue) => zb(
          ue,
          m,
          i,
          (_) => {
            g(_), S(_);
          },
          t.deploymentId,
          Y.runId
        ),
        () => i("error")
      );
    } catch (Y) {
      i("error"), p(If(Y));
    }
  }, [t.deploymentId, t.createPayload, S]);
  v.useEffect(() => R4(() => {
    (s === "idle" || s === "terminal" || s === "error") && j();
  }), [s, j]);
  const N = v.useCallback(async () => {
    if (o)
      try {
        await tT(t.deploymentId, o);
      } catch (Y) {
        p(If(Y));
      }
  }, [t.deploymentId, o]), C = Array.from(f.values()).sort((Y, ue) => Y.globalIndex - ue.globalIndex), T = s === "starting" || s === "running", M = b?.status === "partial", z = C.filter((Y) => Y.status === "running").length, R = C.filter((Y) => Y.status === "completed").length, H = s === "starting" || s === "running" || C.length > 0, Q = C.filter((Y) => Y.status === "failed"), ie = (() => {
    if (s !== "terminal" || Q.length === 0) return null;
    const Y = /* @__PURE__ */ new Map();
    for (const J of Q) {
      const G = J.failureCategory ?? "unknown";
      Y.set(G, (Y.get(G) ?? 0) + 1);
    }
    let ue = "unknown", _ = 0;
    for (const [J, G] of Y)
      G > _ && (ue = J, _ = G);
    const ne = C.length;
    return { category: ue, count: _, total: ne };
  })(), A = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, I = "Check the run detail page for the per-segment error log.", D = y?.toLowerCase().includes("unmapped") ?? !1, q = t.diagnostics ?? [], te = q.find((Y) => Y.status === "fail"), X = s === "starting" ? "Starting…" : s === "running" ? "Generating…" : "Generate", le = !t.canGenerate || T || !!te, re = s === "starting" || s === "running", k = re ? "running" : le ? "blocked" : "idle", F = !PS(KS) || re;
  return /* @__PURE__ */ c.jsxs("div", { className: iO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: lO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: cO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: uO, children: [
          /* @__PURE__ */ c.jsx("span", { className: oO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          H && /* @__PURE__ */ c.jsxs("span", { className: bO, children: [
            /* @__PURE__ */ c.jsx("span", { className: xO, "aria-hidden": "true" }),
            z > 0 ? `${z} in flight` : `${R} done`
          ] })
        ] }),
        q.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: dO, "aria-label": "Pre-flight checks", children: q.map((Y) => /* @__PURE__ */ c.jsxs("li", { className: fO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: hO,
              "data-status": Y.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: mO, children: Y.label }),
          Y.detail && /* @__PURE__ */ c.jsx("span", { className: kb, children: Y.detail })
        ] }, Y.label)) }) : /* @__PURE__ */ c.jsx("span", { className: kb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: pO, "data-state": k, children: [
        F ? /* @__PURE__ */ c.jsxs(
          Pe,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: le,
            loading: re,
            children: [
              !re && /* @__PURE__ */ c.jsx("span", { className: gO, "aria-hidden": "true", children: "▶" }),
              X
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: vO, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: yO, children: "↑" })
        ] }),
        T && /* @__PURE__ */ c.jsx(
          Pe,
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
            Pe,
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
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: A[ie.category] ?? I })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${c1.secondary} ${u1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    M && b && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          variant: "secondary",
          disabled: !!te,
          onClick: async () => {
            try {
              const Y = await i1(t.deploymentId, b.runId);
              u(Y.runId), m(/* @__PURE__ */ new Map()), g(null), i("running"), w.current?.(), w.current = Yy(
                t.deploymentId,
                Y.runId,
                (ue) => zb(ue, m, i, g, t.deploymentId, Y.runId),
                () => i("error")
              );
            } catch (Y) {
              p(If(Y)), i("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: HR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: C.map((Y) => /* @__PURE__ */ c.jsxs("tr", { className: qR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Jr, { tone: wO(Y.status), children: Y.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.durationMs ? `${Y.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.failureCategory ?? "" })
      ] }, Y.globalIndex)) })
    ] })
  ] });
}
async function zb(t, a, s, i, o, u) {
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
        const f = await Gh(o, u);
        i(f);
      } catch {
      }
      return;
  }
}
function wO(t) {
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
function If(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
const jO = {
  queued: { label: "Queued", color: "var(--outline, #747578)", glow: "rgba(116,117,120,0)", pulse: !1 },
  rendering: { label: "Rendering", color: "var(--primary, #ba9eff)", glow: "rgba(186,158,255,0.6)", pulse: !0 },
  ready: { label: "Ready", color: "var(--acid-green, #22c55e)", glow: "rgba(34,197,94,0.6)", pulse: !1 },
  failed: { label: "Failed", color: "var(--error, #ff6e84)", glow: "rgba(255,110,132,0.5)", pulse: !1 }
}, Ob = [
  { color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e" },
  { color: "#9093ff", rgb: "144,147,255", onColor: "#080079" },
  { color: "#ff8439", rgb: "255,132,57", onColor: "#471a00" },
  { color: "#21c7d9", rgb: "33,199,217", onColor: "#00363c" },
  { color: "#34d399", rgb: "52,211,153", onColor: "#003824" },
  { color: "#e879f9", rgb: "232,121,249", onColor: "#3b0a45" }
], Lb = [
  "record_voice_over",
  "graphic_eq",
  "mic_external_on",
  "interpreter_mode",
  "voice_chat",
  "spatial_audio"
], EO = [
  { id: "aether", name: "Aether", role: "Protagonist", icon: "record_voice_over", color: "#ba9eff", rgb: "186,158,255", onColor: "#2b006e", initial: "A", lib: "Aether_v4" },
  { id: "vesper", name: "Vesper", role: "Narrator", icon: "graphic_eq", color: "#9093ff", rgb: "144,147,255", onColor: "#080079", initial: "V", lib: "Vesper_Base" },
  { id: "luminous", name: "Luminous", role: "Antagonist", icon: "mic_external_on", color: "#ff8439", rgb: "255,132,57", onColor: "#471a00", initial: "L", lib: "Lumin_Synth" }
], NO = [
  { id: "neutral", label: "Neutral" },
  { id: "calm", label: "Calm" },
  { id: "tense", label: "Tense" },
  { id: "intense", label: "Intense" }
], CO = `The chronometer flashed red, reflecting off the graphite console. “We have approximately thirty seconds before the hull breaches,” she stated, her voice devoid of panic — a purely mathematical assessment of their impending doom.

Kael didn’t look up from the diagnostic panel. “Divert auxiliary power from life support to the forward deflectors.”

“That will reduce atmospheric integrity by forty percent.”

“If the hull breaches, it’s reduced by a hundred percent,” he shot back, his fingers flying across the haptic interface. The ship shuddered violently, throwing sparks from the overhead conduits.`;
function TO(t) {
  return t === 0 ? "Lead" : t === 1 ? "Support" : "Voice";
}
function RO(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function _O(t) {
  const a = t.filter((s) => s.isActive && (s.kind === "speaker" || s.kind === "mixed"));
  return a.length === 0 ? EO : a.map((s, i) => {
    const o = Ob[i % Ob.length], u = Lb[i % Lb.length];
    return {
      id: s.voiceAssetId,
      name: s.displayName || `Voice ${i + 1}`,
      role: TO(i),
      icon: u,
      color: o.color,
      rgb: o.rgb,
      onColor: o.onColor,
      initial: RO(s.displayName || "V"),
      lib: s.displayName || s.voiceAssetId
    };
  });
}
function MO(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
function AO(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    const o = MO(i.presetName);
    a.has(o) || (a.add(o), s.push({ id: o, label: i.presetName }));
  }
  return s.length > 0 ? s : NO;
}
function DO(t) {
  const a = t.split(/\n\s*\n/), s = [];
  let i = 0;
  for (const o of a) {
    if (!o.trim()) continue;
    const u = o.match(/\S+\s*/g) ?? [o];
    let f = !1;
    const m = u.map((y, p) => {
      const b = f || /[“”"]/.test(y) ? "dialogue" : "narration";
      for (const g of y)
        g === "“" ? f = !0 : g === "”" ? f = !1 : g === '"' && (f = !f);
      return { id: `p${i}s${p}`, text: y, kind: b };
    });
    s.push({ id: `p${i}`, segs: m }), i += 1;
  }
  return s;
}
function Nh(t) {
  const a = [];
  for (const s of t) for (const i of s.segs) a.push(i);
  return a;
}
function Ch(t, a) {
  let s = 0;
  for (const i of t)
    for (const o of i.segs) {
      if (o.id === a) return s;
      s += 1;
    }
  return Number.MAX_SAFE_INTEGER;
}
function kO(t, a, s) {
  const i = [];
  let o = 0;
  for (const u of t)
    for (const f of u.segs)
      o >= a && o <= s && i.push(f.id), o += 1;
  return i;
}
function zO(t, a) {
  for (const s of t) for (const i of s.segs) if (i.id === a) return i.text;
  return "";
}
function $b(t, a) {
  return [...a].sort((s, i) => Ch(t, s) - Ch(t, i)).map((s) => zO(t, s)).join("").trim();
}
function Ub(t, a) {
  return Math.min(...a.segIds.map((s) => Ch(t, s)));
}
function XS(t, a) {
  return t.find((s) => s.segIds.includes(a));
}
function Bb(t, a) {
  return a.every((s) => !XS(t, s));
}
function QS(t, a) {
  return [...a].sort((s, i) => Ub(t, s) - Ub(t, i));
}
function OO(t, a) {
  const s = {};
  return QS(t, a).forEach((i, o) => {
    s[i.id] = `SEG-${String(o + 1).padStart(3, "0")}`;
  }), s;
}
function LO(t) {
  return Nh(t).reduce(
    (a, s) => a + s.text.trim().split(/\s+/).filter(Boolean).length,
    0
  );
}
function $O(t) {
  const a = { queued: 0, rendering: 0, ready: 0, failed: 0 };
  for (const i of t) a[i.status] += 1;
  const s = [];
  return a.queued && s.push(`${a.queued} queued`), a.rendering && s.push(`${a.rendering} rendering`), a.ready && s.push(`${a.ready} ready`), a.failed && s.push(`${a.failed} failed`), s.join("  ·  ");
}
function ec(t, a) {
  return t.find((s) => s.id === a) ?? t[0];
}
function Vb(t, a) {
  return t.find((s) => s.id === a)?.label ?? a;
}
var UO = "_171z55w1", BO = "_171z55w2", VO = "_171z55w3", Hf = "_171z55w4", IO = "_171z55w5", HO = "_171z55w6", qO = "_171z55w7", FO = "_171z55w8", YO = "_171z55w9", GO = "_171z55wa", PO = "_171z55wb", KO = "_171z55wc", XO = "_171z55wd", QO = "_171z55we", ZO = "_171z55wf", JO = "_171z55wg", WO = "_171z55wh", eL = "_171z55wi", tL = "_171z55wj", nL = "_171z55wk", aL = "_171z55wl", rL = "_171z55wm", sL = "_171z55wn", iL = "_171z55wo", lL = "_171z55wp", oL = "_171z55wq", cL = "_171z55wr", uL = "_171z55ws", dL = "_171z55wt", Ib = "_171z55wu", fL = "_171z55wv", hL = "_171z55ww", mL = "_171z55wx", pL = "_171z55wy", gL = "_171z55wz", vL = "_171z55w10", yL = "_171z55w11", bL = "_171z55w12", xL = "_171z55w13", SL = "_171z55w14", wL = "_171z55w15", jL = "_171z55w16", EL = "_171z55w17", NL = "_171z55w18", CL = "_171z55w19", TL = "_171z55w1a", RL = "_171z55w1b", _L = "_171z55w1c", ML = "_171z55w1d", AL = "_171z55w1e", DL = "_171z55w1f", kL = "_171z55w1g";
function zL({
  voiceAssets: t,
  presets: a,
  storyText: s,
  onStoryTextChange: i
}) {
  const o = v.useMemo(() => _O(t), [t]), u = v.useMemo(() => AO(a), [a]), f = s.trim().length > 0 ? s : CO, m = v.useMemo(() => DO(f), [f]), y = o[0].id, p = u[0].id, [b, g] = v.useState([]), [w, S] = v.useState([]), [j, N] = v.useState(null), [C, T] = v.useState(null), [M, z] = v.useState(y), [R, H] = v.useState(p), [Q, ie] = v.useState(null), [A, I] = v.useState(null), [D, q] = v.useState(null), [te, X] = v.useState(null), [le, re] = v.useState(!1), k = v.useRef(null), $ = v.useRef(null), F = v.useRef(/* @__PURE__ */ new Map()), Y = v.useRef(null), ue = v.useRef(1e3), _ = v.useCallback(() => (ue.current += 1, `job-${ue.current}`), []), ne = v.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    return Nh(m).forEach((ce, ye) => V.set(ce.id, ye)), V;
  }, [m]), J = v.useCallback((V) => ne.get(V) ?? Number.MAX_SAFE_INTEGER, [ne]);
  v.useEffect(() => {
    const V = new Set(Nh(m).map((ce) => ce.id));
    g((ce) => {
      const ye = ce.filter((ze) => ze.segIds.every((Fe) => V.has(Fe)));
      return ye.length === ce.length ? ce : ye;
    });
  }, [m]);
  const G = v.useCallback((V) => {
    const ce = k.current;
    if (!ce || !V) return { top: 60, left: 0 };
    const ye = V.getBoundingClientRect(), ze = ce.getBoundingClientRect();
    let Fe = ye.left - ze.left + ce.scrollLeft;
    const st = ye.bottom - ze.top + ce.scrollTop + 10, he = Math.max(0, ce.clientWidth - 318);
    return Fe = Math.max(0, Math.min(Fe, he)), { top: st, left: Fe };
  }, []), U = v.useCallback(() => {
    S([]), N(null), T(null), ie(null);
  }, []), W = v.useCallback(
    (V, ce) => {
      const ye = [...V.segIds].sort((Fe, st) => J(Fe) - J(st))[0], ze = ce ?? F.current.get(ye) ?? null;
      T(V.id), S([...V.segIds]), N(ye), z(V.voiceId), H(V.emotion), ie(G(ze)), q(V.id);
    },
    [J, G]
  ), de = v.useCallback(
    (V, ce, ye) => {
      const ze = XS(b, V);
      if (ze) {
        W(ze, ce);
        return;
      }
      const Fe = G(ce);
      if (ye && j != null && C == null) {
        const st = J(j), he = J(V), je = kO(m, Math.min(st, he), Math.max(st, he));
        if (Bb(b, je)) {
          S(je), T(null), ie(Fe);
          return;
        }
      }
      S([V]), N(V), T(null), ie(Fe);
    },
    [b, m, j, C, G, W, J]
  ), ve = v.useCallback(() => {
    if (C) {
      g(
        (ye) => ye.map(
          (ze) => ze.id === C ? { ...ze, voiceId: M, emotion: R, status: "queued" } : ze
        )
      ), q(C), S([]), N(null), T(null), ie(null);
      return;
    }
    if (w.length === 0 || !Bb(b, w)) return;
    const V = _(), ce = { id: V, segIds: [...w], voiceId: M, emotion: R, status: "queued" };
    g((ye) => [...ye, ce]), q(V), S([]), N(null), ie(null);
  }, [C, w, b, M, R, _]), Te = v.useCallback((V) => {
    g((ce) => ce.filter((ye) => ye.id !== V)), q((ce) => ce === V ? null : ce), X((ce) => ce === V ? null : ce), S([]), N(null), T(null), ie(null);
  }, []), rt = v.useCallback((V) => {
    X((ce) => ce === V ? null : V);
  }, []), Ee = v.useCallback((V) => {
    $.current?.scrollBy({ left: V * 280, behavior: "smooth" });
  }, []), Ze = v.useCallback(
    (V) => {
      const ce = o.findIndex((ze) => ze.id === M), ye = o[(ce + V + o.length) % o.length];
      z(ye.id), Y.current?.querySelector(`[data-voice="${ye.id}"]`)?.focus();
    },
    [o, M]
  ), Ie = v.useCallback(
    (V) => {
      const ce = u.findIndex((ze) => ze.id === R), ye = u[(ce + V + u.length) % u.length];
      H(ye.id), Y.current?.querySelector(`[data-emotion="${ye.id}"]`)?.focus();
    },
    [u, R]
  ), Ve = Q ? C ?? w[0] ?? "new" : null;
  v.useEffect(() => {
    if (Ve == null) return;
    const V = requestAnimationFrame(() => {
      Y.current?.querySelector(`[data-voice="${M}"]`)?.focus();
    });
    return () => cancelAnimationFrame(V);
  }, [Ve]);
  const It = v.useCallback(
    (V) => {
      V.key === "Escape" && (V.preventDefault(), U());
    },
    [U]
  ), jt = v.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const ce of b) for (const ye of ce.segIds) V.set(ye, ce);
    return V;
  }, [b]), Dt = v.useMemo(() => QS(m, b), [m, b]), Mn = v.useMemo(() => {
    const V = /* @__PURE__ */ new Map();
    for (const ce of b) {
      const ye = [...ce.segIds].sort((ze, Fe) => J(ze) - J(Fe))[0];
      ye && V.set(ce.id, ye);
    }
    return V;
  }, [b, J]), dt = v.useMemo(() => OO(m, b), [m, b]), Qt = v.useMemo(() => {
    const V = /* @__PURE__ */ new Set();
    for (const ce of b) for (const ye of ce.segIds) V.add(ye);
    return V.size;
  }, [b]), un = v.useMemo(() => LO(m), [m]), Rt = $O(b), tn = ec(o, M), _t = (V) => V.stopPropagation();
  return /* @__PURE__ */ c.jsxs("div", { className: VO, children: [
    /* @__PURE__ */ c.jsxs("div", { style: OL, children: [
      /* @__PURE__ */ c.jsxs("span", { className: IO, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: Qt }),
          " cast"
        ] }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("strong", { children: un }),
          " words"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: qO,
          "aria-pressed": le,
          onClick: () => re((V) => !V),
          children: [
            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: le ? "check" : "edit" }),
            le ? "Done" : "Edit text"
          ]
        }
      )
    ] }),
    le ? /* @__PURE__ */ c.jsx(
      "textarea",
      {
        value: s,
        onChange: (V) => i(V.target.value),
        placeholder: "Paste or write your script, then switch back to cast each phrase.",
        "aria-label": "Storyboard script text",
        style: BL
      }
    ) : /* @__PURE__ */ c.jsxs(
      "div",
      {
        ref: k,
        className: HO,
        role: "group",
        "aria-label": "Story script — select a phrase to cast a voice",
        onMouseDown: (V) => {
          V.shiftKey && V.preventDefault();
        },
        onClick: () => {
          Q && U();
        },
        children: [
          m.map((V) => /* @__PURE__ */ c.jsx("p", { className: FO, children: V.segs.map((ce) => {
            const ye = jt.get(ce.id), ze = w.includes(ce.id), Fe = !!ye && (A === ye.id || D === ye.id), st = !!ye && Mn.get(ye.id) === ce.id, he = ye ? ec(o, ye.voiceId) : null;
            return /* @__PURE__ */ c.jsxs("span", { children: [
              st && he && /* @__PURE__ */ c.jsx("span", { className: GO, style: IL(he), "aria-hidden": "true", children: he.initial }),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  ref: (je) => {
                    je && F.current.set(ce.id, je);
                  },
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": ze || !!ye,
                  "aria-label": ye ? `${ec(o, ye.voiceId).name} · ${ce.text.trim()}` : ce.text.trim(),
                  className: YO,
                  style: VL(ze, he, Fe, ce.kind),
                  onClick: (je) => {
                    je.stopPropagation(), de(ce.id, je.currentTarget, je.shiftKey);
                  },
                  onKeyDown: (je) => {
                    (je.key === "Enter" || je.key === " ") && (je.preventDefault(), de(ce.id, je.currentTarget, je.shiftKey));
                  },
                  onMouseEnter: ye ? () => I(ye.id) : void 0,
                  onMouseLeave: ye ? () => I(null) : void 0,
                  children: ce.text
                }
              )
            ] }, ce.id);
          }) }, V.id)),
          Q && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: Y,
              className: PO,
              role: "dialog",
              "aria-label": C ? "Edit casting" : "Cast voice",
              style: { top: Q.top, left: Q.left },
              onClick: _t,
              onMouseDown: _t,
              onKeyDown: It,
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: KO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: XO, children: C ? "Edit casting" : "Cast voice" }),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: QO,
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
                    onKeyDown: (V) => {
                      V.key === "ArrowRight" || V.key === "ArrowDown" ? (V.preventDefault(), Ze(1)) : (V.key === "ArrowLeft" || V.key === "ArrowUp") && (V.preventDefault(), Ze(-1));
                    },
                    children: o.map((V) => {
                      const ce = M === V.id;
                      return /* @__PURE__ */ c.jsxs(
                        "button",
                        {
                          type: "button",
                          role: "radio",
                          "aria-checked": ce,
                          "data-voice": V.id,
                          tabIndex: ce ? 0 : -1,
                          className: JO,
                          style: HL(V, ce),
                          onClick: () => z(V.id),
                          children: [
                            /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 19, color: ce ? V.color : "var(--on-surface-variant, #c4c7c5)" }, children: V.icon }),
                            /* @__PURE__ */ c.jsx("span", { style: { fontSize: 11, fontWeight: 600, color: ce ? "var(--on-surface, #e3e3e3)" : "var(--on-surface-variant, #c4c7c5)" }, children: V.name }),
                            /* @__PURE__ */ c.jsx("span", { style: LL, children: V.role })
                          ]
                        },
                        V.id
                      );
                    })
                  }
                ),
                /* @__PURE__ */ c.jsx("div", { className: WO }),
                /* @__PURE__ */ c.jsxs("div", { className: eL, children: [
                  /* @__PURE__ */ c.jsx("span", { className: Hf, style: { fontSize: 9.5, marginBottom: 0 }, children: "Emotion" }),
                  /* @__PURE__ */ c.jsx(
                    "div",
                    {
                      className: tL,
                      role: "radiogroup",
                      "aria-label": "Emotion",
                      onKeyDown: (V) => {
                        V.key === "ArrowRight" || V.key === "ArrowDown" ? (V.preventDefault(), Ie(1)) : (V.key === "ArrowLeft" || V.key === "ArrowUp") && (V.preventDefault(), Ie(-1));
                      },
                      children: u.map((V) => {
                        const ce = R === V.id;
                        return /* @__PURE__ */ c.jsx(
                          "button",
                          {
                            type: "button",
                            role: "radio",
                            "aria-checked": ce,
                            "data-emotion": V.id,
                            tabIndex: ce ? 0 : -1,
                            className: nL,
                            style: qL(tn, ce),
                            onClick: () => H(V.id),
                            children: V.label
                          },
                          V.id
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ c.jsx("div", { className: aL, children: /* @__PURE__ */ c.jsx("span", { className: rL, children: $b(m, w) }) }),
                /* @__PURE__ */ c.jsxs("div", { className: sL, children: [
                  C && /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: iL,
                      "aria-label": "Remove casting",
                      onClick: () => C && Te(C),
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "delete" })
                    }
                  ),
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      style: FL(tn),
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
          /* @__PURE__ */ c.jsx("span", { className: Hf, style: { marginBottom: 0 }, children: "Assigned segments" }),
          /* @__PURE__ */ c.jsx("span", { className: uL, children: b.length }),
          Rt && /* @__PURE__ */ c.jsx("span", { className: dL, children: Rt })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ c.jsxs("span", { "aria-live": "polite", style: $L, children: [
            /* @__PURE__ */ c.jsx("span", { style: UL }),
            "Live"
          ] }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Ib, "aria-label": "Scroll segments left", onClick: () => Ee(-1), disabled: b.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_left" }) }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: Ib, "aria-label": "Scroll segments right", onClick: () => Ee(1), disabled: b.length === 0, children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 18 }, "aria-hidden": "true", children: "chevron_right" }) })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { ref: $, className: fL, children: [
        Dt.map((V) => {
          const ce = ec(o, V.voiceId), ye = jO[V.status], ze = D === V.id || A === V.id, Fe = te === V.id, st = $b(m, V.segIds);
          return /* @__PURE__ */ c.jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `${ce.name} ${dt[V.id]} — ${Vb(u, V.emotion)} — ${ye.label}`,
              className: hL,
              style: YL(ce, ze),
              onClick: () => W(V),
              onKeyDown: (he) => {
                (he.key === "Enter" || he.key === " ") && (he.preventDefault(), W(V));
              },
              onMouseEnter: () => I(V.id),
              onMouseLeave: () => I(null),
              onFocus: () => q(V.id),
              children: [
                /* @__PURE__ */ c.jsxs("div", { className: mL, children: [
                  /* @__PURE__ */ c.jsxs("div", { className: pL, children: [
                    /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", "aria-hidden": "true", style: { fontSize: 17, color: ce.color }, children: ce.icon }),
                    /* @__PURE__ */ c.jsx("span", { className: gL, children: ce.name })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: vL, children: dt[V.id] })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: yL, children: st }),
                /* @__PURE__ */ c.jsxs("div", { className: bL, children: [
                  /* @__PURE__ */ c.jsx("span", { style: GL(ce), children: Vb(u, V.emotion) }),
                  /* @__PURE__ */ c.jsxs("span", { className: xL, children: [
                    /* @__PURE__ */ c.jsx("span", { style: PL(ye) }),
                    /* @__PURE__ */ c.jsx("span", { style: KL(ye, V.status), children: ye.label })
                  ] })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: SL, children: [
                  /* @__PURE__ */ c.jsxs(
                    "button",
                    {
                      type: "button",
                      className: wL,
                      "aria-label": Fe ? "Pause preview" : "Preview audio",
                      onClick: (he) => {
                        he.stopPropagation(), rt(V.id);
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: Fe ? "pause_circle" : "play_circle" }),
                        Fe ? "Playing" : "Preview"
                      ]
                    }
                  ),
                  /* @__PURE__ */ c.jsx(
                    "button",
                    {
                      type: "button",
                      className: jL,
                      "aria-label": `Remove ${dt[V.id]}`,
                      onClick: (he) => {
                        he.stopPropagation(), Te(V.id);
                      },
                      children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", style: { fontSize: 16 }, "aria-hidden": "true", children: "close" })
                    }
                  )
                ] }),
                Fe && /* @__PURE__ */ c.jsx("div", { className: EL, children: /* @__PURE__ */ c.jsx("div", { style: XL(ce) }) })
              ]
            },
            V.id
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
        /* @__PURE__ */ c.jsx("span", { className: Hf, style: { fontSize: 9.5, marginBottom: 0 }, children: "Voices" }),
        /* @__PURE__ */ c.jsx("div", { className: ML, children: o.map((V) => {
          const ce = b.some((ye) => ye.voiceId === V.id);
          return /* @__PURE__ */ c.jsxs("span", { className: AL, style: { border: `1px solid ${ce ? `rgba(${V.rgb},0.35)` : "rgba(70,72,74,0.3)"}` }, children: [
            /* @__PURE__ */ c.jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: V.color, boxShadow: ce ? `0 0 8px rgba(${V.rgb},0.7)` : "none", flexShrink: 0 } }),
            /* @__PURE__ */ c.jsx("span", { className: DL, style: { color: ce ? "var(--on-surface)" : "var(--on-surface-variant)" }, children: V.lib })
          ] }, V.id);
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
const OL = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, LL = { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--on-surface-muted)" }, $L = {
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
}, UL = { width: 6, height: 6, borderRadius: 999, background: "var(--acid-green, #22c55e)", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }, BL = {
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
function VL(t, a, s, i) {
  const o = { borderRadius: 4, padding: "1.5px 1px", cursor: "pointer", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }, u = "186,158,255";
  if (t) return { ...o, background: `rgba(${u},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${u},0.55)`, color: "var(--on-surface)" };
  if (a) {
    const f = s ? `, inset 0 0 0 1px rgba(${a.rgb},0.8)` : "";
    return { ...o, background: `rgba(${a.rgb},${s ? 0.22 : 0.12})`, boxShadow: `inset 0 -2px 0 ${a.color}${f}`, color: "var(--on-surface)" };
  }
  return { ...o, color: i === "dialogue" ? "var(--on-surface)" : "var(--on-surface-variant)" };
}
function IL(t) {
  return { color: t.color, background: `rgba(${t.rgb},0.18)`, boxShadow: `inset 0 0 0 1px rgba(${t.rgb},0.45)` };
}
function HL(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.6)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))"
  };
}
function qL(t, a) {
  return {
    border: `1px solid ${a ? `rgba(${t.rgb},0.45)` : "rgba(120,124,128,0.35)"}`,
    background: a ? `rgba(${t.rgb},0.14)` : "var(--surface-raised, rgba(255,255,255,0.05))",
    color: a ? t.color : "var(--on-surface-variant, #c4c7c5)"
  };
}
function FL(t) {
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
function YL(t, a) {
  return {
    background: a ? "var(--surface-high, #1d2023)" : "var(--surface-low, #111416)",
    transform: a ? "translateY(-2px)" : "none",
    boxShadow: a ? `inset 3px 0 0 ${t.color}, 0 0 0 1px rgba(${t.rgb},0.4), 0 12px 28px rgba(0,0,0,0.5)` : `inset 3px 0 0 ${t.color}`
  };
}
function GL(t) {
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
function PL(t) {
  return {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: t.color,
    boxShadow: `0 0 8px ${t.glow}`,
    animation: t.pulse ? `${BO} 1.5s ease-in-out infinite` : "none",
    flexShrink: 0
  };
}
function KL(t, a) {
  return { fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500, color: a === "queued" ? "var(--on-surface-variant)" : t.color };
}
function XL(t) {
  return { position: "absolute", top: 0, bottom: 0, width: "30%", background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, animation: `${UO} 1.1s linear infinite` };
}
var QL = "xq3iim0", ZL = "xq3iim1", JL = "xq3iim2", WL = "xq3iim3", e6 = "xq3iim4", t6 = "xq3iim5", n6 = "xq3iim6", a6 = "xq3iim7", r6 = "xq3iim8", s6 = "xq3iim9", i6 = "xq3iima", l6 = "xq3iimb", o6 = "xq3iimc", c6 = "xq3iimd", u6 = "xq3iime", d6 = "xq3iimf", f6 = "xq3iimg", h6 = "xq3iimh", m6 = "xq3iimi", p6 = "xq3iimj", g6 = "xq3iimk", Hb = "xq3iiml";
function v6({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: s
}) {
  const [i, o] = v.useState([]), [u, f] = v.useState(a), [m, y] = v.useState(!0), [p, b] = v.useState(!1), [g, w] = v.useState(null), [S, j] = v.useState(!1), N = v.useRef(null), C = v.useRef(null);
  v.useEffect(() => {
    let R = !1;
    return y(!0), Xs(t).then(({ voiceAssets: H }) => {
      R || o(H);
    }).catch((H) => {
      R || w(H instanceof Error ? H.message : "Failed to load voices");
    }).finally(() => {
      R || y(!1);
    }), () => {
      R = !0;
    };
  }, [t]), v.useEffect(() => {
    if (!S) return;
    const R = (Q) => {
      N.current && (Q.target instanceof Node && N.current.contains(Q.target) || j(!1));
    }, H = (Q) => {
      Q.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", H), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", H);
    };
  }, [S]);
  const T = v.useCallback(
    async (R) => {
      b(!0), w(null);
      const H = u, Q = R === u ? null : R;
      f(Q), j(!1);
      try {
        await QC(t, Q), s?.(Q);
      } catch (ie) {
        f(H), w(ie instanceof Error ? ie.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, s, u]
  ), M = v.useMemo(
    () => i.find((R) => R.voiceAssetId === u) ?? null,
    [i, u]
  ), z = v.useMemo(() => {
    const R = [], H = [];
    for (const Q of i)
      Q.kind === "speaker" || Q.kind === "mixed" ? R.push(Q) : H.push(Q);
    return { uploaded: R, other: H };
  }, [i]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: Hb, children: "Loading voices…" }) : i.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Hb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: QL, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: C,
        type: "button",
        className: `${ZL} ${S ? JL : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((R) => !R),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: WL, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: e6, children: [
            /* @__PURE__ */ c.jsx("span", { className: t6, children: M ? M.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: n6, children: M ? ZS(M) : `${i.length} voice${i.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: a6, "aria-hidden": "true", children: y6.map((R, H) => /* @__PURE__ */ c.jsx("i", { style: { height: `${R * 100}%` } }, H)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${r6}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: s6,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: i6, children: /* @__PURE__ */ c.jsx("span", { className: l6, children: "Select voice" }) }),
          g && /* @__PURE__ */ c.jsx("div", { className: o6, role: "alert", children: g }),
          z.uploaded.length > 0 && /* @__PURE__ */ c.jsx(qb, { label: "Uploaded", children: z.uploaded.map((R) => /* @__PURE__ */ c.jsx(
            Fb,
            {
              voice: R,
              selected: u === R.voiceAssetId,
              onSelect: () => void T(R.voiceAssetId)
            },
            R.voiceAssetId
          )) }),
          z.other.length > 0 && /* @__PURE__ */ c.jsx(qb, { label: "Other", children: z.other.map((R) => /* @__PURE__ */ c.jsx(
            Fb,
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
function qb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: c6, children: [
    /* @__PURE__ */ c.jsx("div", { className: u6, children: t }),
    a
  ] });
}
function Fb({ voice: t, selected: a, onSelect: s }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${d6} ${a ? f6 : ""}`,
      onClick: s,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: h6, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: m6, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: p6, children: ZS(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${g6}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const y6 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function ZS(t) {
  const a = [];
  return t.durationMs != null && a.push(b6(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function b6(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const s = Math.floor(a / 60), i = Math.round(a - s * 60);
  return `${s}:${i.toString().padStart(2, "0")}`;
}
const Yb = [
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
function x6(t) {
  const a = ei(), s = v.useRef(null), { tokens: i, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = v.useMemo(
    () => w6(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), y = (b) => {
    const g = s.current;
    g && (g.scrollTop = b.currentTarget.scrollTop, g.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? $R : zR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: s, className: OR, "aria-hidden": "true", children: i.map((b, g) => S6(b, g, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? UR : LR,
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
        Pe,
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
      /* @__PURE__ */ c.jsx("ul", { className: u0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("ul", { className: u0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function S6(t, a, s) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: c0, children: t.raw }),
      `
`
    ] }, a);
  const i = s.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? o0 : `${o0} ${BR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: i }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: VR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: c0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function w6(t, a, s) {
  const i = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), y = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const g = t.split(/\r?\n/);
  let w = 0;
  return g.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const C = j + 1, T = N.match(i);
    let M = "Narrator", z = N, R, H = !1;
    if (T?.groups) {
      H = !0;
      const I = (T.groups.body ?? "").trim(), D = (T.groups.rest ?? "").trim();
      M = ((I.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (I.includes("|") ? I.slice(I.indexOf("|") + 1) : "").trim() || void 0, z = D;
    }
    w += 1;
    const Q = M.toLowerCase(), ie = (m.get(Q) ?? 0) + 1;
    m.set(Q, ie);
    const A = M === "Narrator" || s.has(Q);
    if (A || f.add(M), M !== "Narrator" && !p.has(Q) && (p.set(Q, Yb[b % Yb.length] ?? "currentColor"), b += 1), H) {
      const I = { kind: "character", raw: S, character: M, text: z, hasMapping: A };
      R !== void 0 && (I.override = R), o.push(I);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: C, character: M, text: z, hasMapping: A }), y.push(
      `${w.toString().padStart(3, "0")}_${j6(M)}_${ie.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: y,
    characterColor: p
  };
}
function j6(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Gb = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], JS = 1e-3;
function E6(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function N6() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function C6(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function WS(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function ew(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function T6(t) {
  const a = [];
  for (let s = 0; s < Gb.length; s += 1) {
    const i = t[s];
    typeof i == "number" && (Math.abs(i) < JS || a.push(`${Gb[s]}=${ew(WS(i))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function R6(t, a) {
  const s = E6(t.character) || "Narrator", i = C6(t.text);
  if (!i) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const y = T6(m.vector);
      y && o.push(`emotion_vector:${y}`);
    }
  }
  const u = WS(t.alpha);
  return Math.abs(u - 1) >= JS && o.push(`emotion_alpha:${ew(u)}`), `${o.length > 0 ? `[${s}|${o.join("|")}]` : `[${s}]`} ${i}`;
}
function tw(t, a) {
  const s = /* @__PURE__ */ new Map();
  for (const o of a) s.set(o.presetId, o);
  const i = [];
  for (const o of t) {
    const u = R6(o, s);
    u && i.push(u);
  }
  return i.join(`
`);
}
function Yr() {
  return {
    id: N6(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var _6 = "_1827s3t2", M6 = "_1827s3t3", A6 = "_1827s3t4", D6 = "_1827s3t5", k6 = "_1827s3t6", z6 = "_1827s3t7", O6 = "_1827s3t8", L6 = "_1827s3t9", $6 = "_1827s3ta", U6 = "_1827s3tb", B6 = "_1827s3td _1827s3tc", V6 = "_1827s3te _1827s3tc", I6 = "_1827s3tf", H6 = "_1827s3tg", q6 = "_1827s3th", F6 = "_1827s3ti _1827s3tc", Y6 = "_1827s3tj", G6 = "_1827s3tk", P6 = "_1827s3tl", K6 = "_1827s3tm", X6 = "_1827s3tn", Q6 = "_1827s3to", Z6 = "_1827s3tp", J6 = "_1827s3tq", W6 = "_1827s3tr", e8 = "_1827s3ts", t8 = "_1827s3tt", n8 = "_1827s3tu";
function a8({
  rows: t,
  onRowsChange: a,
  presets: s,
  mappingsByLower: i
}) {
  const o = v.useId(), u = v.useId(), f = v.useId(), m = v.useRef(null), y = v.useRef(/* @__PURE__ */ new Map()), p = v.useRef(/* @__PURE__ */ new Map()), b = v.useRef(/* @__PURE__ */ new Map()), [g, w] = v.useState(null), [S, j] = v.useState(!1), N = v.useRef(null), C = v.useRef(null), [T, M] = v.useState(null), [z, R] = v.useState(null), [H, Q] = v.useState("");
  v.useEffect(() => {
    g && (g.kind === "addBtn" ? m.current?.focus() : g.kind === "text" && g.rowId ? y.current.get(g.rowId)?.focus() : g.kind === "remove" && g.rowId ? p.current.get(g.rowId)?.focus() : g.kind === "character" && g.rowId ? b.current.get(g.rowId)?.focus() : g.kind === "unmappedFirstItem" && C.current?.querySelector("button")?.focus(), w(null));
  }, [g]);
  const ie = t.filter((U) => U.text.trim().length > 0).length, A = v.useMemo(() => {
    const U = /* @__PURE__ */ new Map();
    for (const W of t) {
      const de = W.character.trim(), ve = de.toLowerCase();
      !ve || ve === "narrator" || i.has(ve) || U.has(ve) || U.set(ve, de);
    }
    return Array.from(U.values()).sort((W, de) => W.localeCompare(de));
  }, [t, i]), I = A.length, D = v.useRef(I), [q, te] = v.useState(0);
  v.useEffect(() => {
    I > D.current && te((U) => U + 1), D.current = I;
  }, [I]), v.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const U = (de) => {
      if (!C.current || !N.current) return;
      const ve = de.target;
      C.current.contains(ve) || N.current.contains(ve) || j(!1);
    }, W = (de) => {
      de.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", U), document.addEventListener("keydown", W), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", W);
    };
  }, [S]);
  const X = v.useMemo(() => {
    const U = /* @__PURE__ */ new Set();
    return i.forEach((W) => U.add(W.characterName)), Array.from(U).sort((W, de) => W.localeCompare(de));
  }, [i]), le = v.useCallback(
    (U, W) => {
      a(t.map((de) => de.id === U ? { ...de, ...W } : de));
    },
    [t, a]
  ), re = v.useRef(t);
  v.useEffect(() => {
    re.current = t;
  }, [t]);
  const k = v.useCallback(
    (U) => {
      const W = t.findIndex((Ze) => Ze.id === U);
      if (W < 0) return;
      const de = t[W];
      if (!de) return;
      const ve = W > 0 ? t[W - 1]?.id ?? null : null, Te = t.filter((Ze) => Ze.id !== U);
      a(Te);
      const rt = de.character.trim() || `Line ${W + 1}`;
      cn(`Removed ${rt}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const Ze = re.current;
            if (Ze.some((jt) => jt.id === de.id)) return;
            const Ie = [...Ze], Ve = ve ? Ze.findIndex((jt) => jt.id === ve) : -1, It = Ve >= 0 ? Ve + 1 : 0;
            Ie.splice(It, 0, de), a(Ie);
          }
        },
        duration: 5e3
      });
      const Ee = `Removed line ${W + 1}, now ${Te.length} ${Te.length === 1 ? "line" : "lines"}`;
      if (Q((Ze) => Ze === Ee ? `${Ee}​` : Ee), Te.length === 0)
        w({ kind: "addBtn" });
      else {
        const Ze = W < Te.length ? W : Te.length - 1, Ie = Te[Ze];
        w(Ie ? { kind: "remove", rowId: Ie.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), $ = v.useCallback(
    (U) => {
      const W = Yr();
      let de;
      if (U === null)
        de = [...t, W];
      else {
        const ve = t.findIndex((Te) => Te.id === U);
        de = ve < 0 ? [...t, W] : [...t.slice(0, ve + 1), W, ...t.slice(ve + 1)];
      }
      a(de), w({ kind: "text", rowId: W.id });
    },
    [t, a]
  ), F = v.useCallback(
    (U, W) => {
      const de = t.findIndex((Ve) => Ve.id === U);
      if (de < 0) return;
      const ve = de + W;
      if (ve < 0 || ve >= t.length) return;
      const Te = [...t], rt = Te[de], Ee = Te[ve];
      if (!rt || !Ee) return;
      Te[de] = Ee, Te[ve] = rt, a(Te);
      const Ie = `Moved ${rt.character.trim() || `Line ${de + 1}`} to position ${ve + 1} of ${Te.length}`;
      Q((Ve) => Ve === Ie ? `${Ie}​` : Ie);
    },
    [t, a]
  ), Y = v.useCallback(
    (U, W) => {
      U.key === "Enter" && !U.shiftKey ? (U.preventDefault(), $(W)) : U.altKey && U.key === "ArrowUp" ? (U.preventDefault(), F(W, -1)) : U.altKey && U.key === "ArrowDown" && (U.preventDefault(), F(W, 1));
    },
    [$, F]
  ), ue = v.useCallback((U, W) => {
    M(W), U.dataTransfer.effectAllowed = "move", U.dataTransfer.setData("text/plain", W);
  }, []), _ = v.useCallback((U, W) => {
    T && (U.preventDefault(), U.dataTransfer.dropEffect = "move", z !== W && R(W));
  }, [T, z]), ne = v.useCallback(
    (U, W) => {
      U.preventDefault();
      const de = T ?? U.dataTransfer.getData("text/plain");
      if (M(null), R(null), !de || de === W) return;
      const ve = t.findIndex((Ve) => Ve.id === de), Te = t.findIndex((Ve) => Ve.id === W);
      if (ve < 0 || Te < 0) return;
      const rt = [...t], [Ee] = rt.splice(ve, 1);
      if (!Ee) return;
      rt.splice(Te, 0, Ee), a(rt);
      const Ie = `Moved ${Ee.character.trim() || `Line ${ve + 1}`} to position ${Te + 1} of ${rt.length}`;
      Q((Ve) => Ve === Ie ? `${Ie}​` : Ie);
    },
    [t, a, T]
  ), J = v.useCallback(() => {
    M(null), R(null);
  }, []), G = v.useCallback(
    (U) => {
      const W = t.find((de) => de.character.trim().toLowerCase() === U.toLowerCase());
      W && w({ kind: "character", rowId: W.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: _6, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: M6, children: [
      /* @__PURE__ */ c.jsxs("span", { className: A6, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: t8, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: D6, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: k6, children: ie.toString().padStart(2, "0") }),
        " lines",
        I > 0 && /* @__PURE__ */ c.jsxs("span", { className: G6, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: n8,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j((U) => !U),
              children: [
                "⚠ ",
                I,
                " unmapped"
              ]
            },
            q
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: C,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: P6,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: K6, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: X6, children: A.map((U) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: Q6,
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
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: W6, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: z6, children: t.map((U, W) => {
      const de = U.character.trim() || `line ${W + 1}`, ve = i.has(U.character.trim().toLowerCase()), Te = T === U.id, rt = z === U.id && T !== U.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: O6,
          "data-mapped": ve || void 0,
          "data-dragging": Te || void 0,
          "data-drag-over": rt || void 0,
          onDragOver: (Ee) => _(Ee, U.id),
          onDrop: (Ee) => ne(Ee, U.id),
          onDragEnd: J,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: L6,
                draggable: !0,
                "aria-label": `Drag to reorder ${de}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (Ee) => ue(Ee, U.id),
                onKeyDown: (Ee) => {
                  Ee.altKey && Ee.key === "ArrowUp" ? (Ee.preventDefault(), F(U.id, -1)) : Ee.altKey && Ee.key === "ArrowDown" && (Ee.preventDefault(), F(U.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: U6, "aria-hidden": "true", children: (W + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (Ee) => {
                  Ee ? b.current.set(U.id, Ee) : b.current.delete(U.id);
                },
                type: "text",
                value: U.character,
                onChange: (Ee) => le(U.id, { character: Ee.target.value }),
                placeholder: "Character",
                className: B6,
                "aria-label": `Character name for ${de}`,
                list: X.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: U.presetId ?? "",
                onChange: (Ee) => le(U.id, { presetId: Ee.target.value === "" ? null : Ee.target.value }),
                className: V6,
                "aria-label": `Emotion preset for ${de}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  s.map((Ee) => /* @__PURE__ */ c.jsx("option", { value: Ee.presetId, children: Ee.presetName }, Ee.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: I6, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: U.alpha,
                  onChange: (Ee) => le(U.id, { alpha: Number.parseFloat(Ee.target.value) }),
                  className: H6,
                  "aria-label": `Emotion intensity for ${de}`,
                  "aria-valuetext": `${Math.round(U.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: q6,
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
                onChange: (Ee) => le(U.id, { text: Ee.target.value }),
                onKeyDown: (Ee) => Y(Ee, U.id),
                placeholder: "Line text…",
                className: F6,
                "aria-label": `Line text for ${de}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (Ee) => {
                  Ee ? p.current.set(U.id, Ee) : p.current.delete(U.id);
                },
                type: "button",
                className: Y6,
                "aria-label": `Remove ${de}`,
                title: "Remove this line",
                onClick: () => k(U.id),
                children: "✕"
              }
            ),
            W < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: $6,
                "aria-label": `Insert line after ${de}`,
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
        className: Z6,
        onClick: () => $(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: J6, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    X.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: X.map((U) => /* @__PURE__ */ c.jsx("option", { value: U }, U)) }),
    /* @__PURE__ */ c.jsx("div", { className: e8, role: "status", "aria-live": "polite", "aria-atomic": "true", children: H })
  ] });
}
var r8 = "fmg0gf0", s8 = "fmg0gf1", Pb = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hs = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
  { id: "storyboard", label: "Storyboard", glyph: "04", description: "Click words to cast voice + emotion in bulk · shift-click to extend a range" }
], i8 = Hs;
function l8({
  value: t,
  onChange: a,
  storyDisabled: s = !1
}) {
  const i = v.useRef([]), o = v.useCallback(
    (f, m) => {
      const y = Hs.length;
      let p = f;
      for (let g = 1; g <= y; g += 1) {
        const w = (f + m * g + y) % y, S = Hs[w];
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
  ), u = v.useCallback(
    (f, m) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(m, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(m, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Hs.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: r8, role: "radiogroup", "aria-label": "Editor mode", children: Hs.map((f, m) => {
    const y = f.id === t, p = f.id === "story" && s, b = p ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (g) => {
          i.current[m] = g;
        },
        type: "button",
        role: "radio",
        "aria-checked": y,
        "aria-disabled": p || void 0,
        tabIndex: y ? 0 : -1,
        title: p ? `${f.description} — coming soon` : f.description,
        className: y ? Pb.active : Pb.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (g) => u(g, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: s8, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const o8 = [
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
function c8(t, a) {
  const s = t.ownerDocument;
  if (!s) return { top: 0, left: 0, height: 0 };
  const i = s.createElement("div"), o = s.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = i.style, f = o;
  for (const N of o8) {
    const C = f[N];
    typeof C == "string" && (u[N] = C);
  }
  i.style.position = "absolute", i.style.visibility = "hidden", i.style.overflow = "hidden", i.style.top = "0", i.style.left = "-9999px", i.style.whiteSpace = "pre-wrap", i.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), y = s.createTextNode(m.replace(/ /g, " ")), p = s.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", i.appendChild(y), i.appendChild(p), s.body.appendChild(i);
  const b = p.getBoundingClientRect(), g = i.getBoundingClientRect(), w = b.top - g.top - t.scrollTop, S = b.left - g.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return s.body.removeChild(i), { top: w, left: S, height: j };
}
const nw = {
  character: "@",
  emotion: "/"
}, aw = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), u8 = /[\p{L}\p{N}_-]/u, d8 = /[^\p{L}\p{N}_-]+/gu;
function rw(t) {
  return t ? u8.test(t) : !1;
}
function f8(t) {
  return t.replace(d8, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function h8(t, a) {
  if (a >= t.length) return 0;
  const s = t.charCodeAt(a);
  if (s >= 55296 && s <= 56319 && a + 1 < t.length) {
    const i = t.charCodeAt(a + 1);
    if (i >= 56320 && i <= 57343) return 2;
  }
  return 1;
}
function Dc(t, a) {
  const s = h8(t, a);
  return s === 0 ? "" : t.slice(a, a + s);
}
function kc(t) {
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
    const f = t[i], m = f === "@" || f === "/", y = i === 0 ? "" : Dc(t, vc(t, i)), p = i === 0 || y !== "" && aw.has(y);
    if (m && p) {
      let b = i + 1, g = "";
      for (; b < o; ) {
        const w = Dc(t, b);
        if (w && rw(w))
          g += w, b += w.length;
        else
          break;
      }
      if (g) {
        u(i), a.push({
          kind: f === "@" ? "character" : "emotion",
          start: i,
          end: b,
          value: g
        }), s = b, i = b;
        continue;
      }
    }
    i += 1;
  }
  return u(o), a;
}
function vc(t, a) {
  if (a <= 0) return -1;
  const s = t.charCodeAt(a - 1);
  if (s >= 56320 && s <= 57343 && a >= 2) {
    const i = t.charCodeAt(a - 2);
    if (i >= 55296 && i <= 56319) return a - 2;
  }
  return a - 1;
}
function m8(t, a) {
  if (a <= 0 || a > t.length) return null;
  let s = vc(t, a), i = "";
  for (; s >= 0; ) {
    const o = Dc(t, s);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = s === 0 ? "" : Dc(t, vc(t, s));
      return s === 0 || f !== "" && aw.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: s,
        query: i
      } : null;
    }
    if (!rw(o)) return null;
    i = o + i;
    const u = vc(t, s);
    if (u < 0) break;
    s = u;
  }
  return null;
}
var p8 = "_1d2ofoy5", g8 = "_1d2ofoy6", v8 = "_1d2ofoy8 _1d2ofoy7", y8 = "_1d2ofoy9 _1d2ofoy7", b8 = "_1d2ofoya", x8 = "_1d2ofoyb", S8 = "_1d2ofoyc", w8 = "_1d2ofoye", j8 = "_1d2ofoyf", E8 = "_1d2ofoyg", N8 = "_1d2ofoyh", C8 = "_1d2ofoyi", T8 = "_1d2ofoyj", tc = "_1d2ofoyk", R8 = "_1d2ofoyl";
const _8 = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function M8({
  value: t,
  onChange: a,
  characters: s,
  presets: i,
  mappingsByLower: o
}) {
  const u = v.useRef(null), f = v.useRef(null), m = v.useId(), y = `${m}-opt`, [p, b] = v.useState(null), g = v.useMemo(() => kc(t), [t]), w = v.useMemo(() => {
    const D = /* @__PURE__ */ new Map();
    o.forEach((q) => D.set(q.characterName.toLowerCase(), q.characterName));
    for (const q of s) {
      const te = q.toLowerCase();
      D.has(te) || D.set(te, q);
    }
    return Array.from(D.values()).sort((q, te) => q.localeCompare(te));
  }, [s, o]), S = v.useMemo(() => {
    if (!p) return [];
    const D = p.query.toLowerCase();
    if (p.kind === "character")
      return w.filter((X) => X.toLowerCase().includes(D)).slice(0, 8).map((X) => {
        const le = o.get(X.toLowerCase());
        return { value: X, hint: le ? "mapped" : "unmapped" };
      });
    const q = /* @__PURE__ */ new Set(), te = [];
    for (const X of i) {
      const le = X.presetName.toLowerCase();
      if (le.includes(D) && !q.has(le) && (q.add(le), te.push({ value: X.presetName, hint: "vector" }), te.length >= 8))
        break;
    }
    return te;
  }, [p, w, o, i]), j = v.useCallback((D, q, te) => {
    if (q < 0) return null;
    const X = m8(D, q);
    if (!X) return null;
    const le = u.current, re = le ? c8(le, q) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: X.start,
      query: X.query,
      kind: X.kind,
      selected: te && te.kind === X.kind ? te.selected : 0,
      caretTop: re.top,
      caretLeft: re.left,
      caretHeight: re.height
    };
  }, []), N = v.useCallback(() => {
    const D = u.current;
    if (!D) {
      b(null);
      return;
    }
    const q = D.selectionStart;
    if (q !== D.selectionEnd) {
      b(null);
      return;
    }
    b((te) => j(t, q, te));
  }, [t, j]);
  v.useEffect(() => {
    if (!p) return;
    const D = S.length, q = D === 0 ? 0 : Math.min(p.selected, D - 1);
    p.selected !== q && b({ ...p, selected: q });
  }, [p, S]), v.useLayoutEffect(() => {
    const D = f.current, q = u.current;
    !D || !q || (D.scrollTop = q.scrollTop, D.scrollLeft = q.scrollLeft);
  }), v.useEffect(() => {
    const D = u.current, q = f.current;
    if (!D || !q) return;
    const te = () => {
      q.scrollTop = D.scrollTop, q.scrollLeft = D.scrollLeft;
    };
    return D.addEventListener("scroll", te, { passive: !0 }), () => D.removeEventListener("scroll", te);
  }, []);
  const C = v.useCallback(
    (D) => {
      const q = D.target.value;
      a(q);
      const te = D.target;
      requestAnimationFrame(() => {
        const X = te.selectionStart;
        if (X !== te.selectionEnd) {
          b(null);
          return;
        }
        b((le) => j(q, X, le));
      });
    },
    [a, j]
  ), T = v.useCallback(() => {
    N();
  }, [N]), M = v.useCallback(
    (D, q) => {
      if (!p) return;
      const te = nw[p.kind], X = p.triggerStart + 1 + p.query.length, le = t.slice(0, p.triggerStart), re = t.slice(X), k = f8(D);
      if (!k) return;
      const $ = `${te}${k} `, F = `${le}${$}${re}`;
      a(F);
      const Y = le.length + $.length;
      b(null), q.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(Y, Y));
      });
    },
    [p, t, a]
  ), z = v.useCallback(
    (D) => {
      if (p) {
        if (D.key === "Escape") {
          D.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (D.key === "ArrowDown")
            D.preventDefault(), b((q) => q && { ...q, selected: (q.selected + 1) % S.length });
          else if (D.key === "ArrowUp")
            D.preventDefault(), b(
              (q) => q && { ...q, selected: (q.selected - 1 + S.length) % S.length }
            );
          else if (D.key === "Enter") {
            const q = S[p.selected];
            q && (D.preventDefault(), M(q.value, { advanceFocus: !1 }));
          } else if (D.key === "Tab") {
            const q = S[p.selected];
            q && M(q.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, S, M]
  ), R = v.useRef(null), [H, Q] = v.useState(null);
  v.useLayoutEffect(() => {
    if (!p) {
      Q(null);
      return;
    }
    const D = R.current, q = u.current;
    if (!D || !q) return;
    const te = D.offsetWidth, X = q.clientWidth, le = Math.max(0, X - te - 8), re = Math.max(0, p.caretLeft);
    Q(Math.min(re, le));
  }, [p]);
  const ie = p?.kind === "character" ? "Character" : "Emotion preset", A = p && S.length > 0 ? `${y}-${p.selected}` : void 0, I = !p || S.length > 0 ? null : p.kind === "emotion" ? i.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: p8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: g8, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: v8, "aria-hidden": "true", children: A8(g, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: y8,
          value: t,
          onChange: C,
          onSelect: T,
          onKeyDown: z,
          placeholder: _8,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && S.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": A
        }
      ),
      p && (S.length > 0 || I) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: R,
          className: w8,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${H ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: j8, "aria-hidden": "true", children: ie }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ie,
                className: E8,
                children: S.map((D, q) => {
                  const te = `${y}-${q}`, X = q === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: te,
                      role: "option",
                      "aria-selected": X,
                      "data-active": X || void 0,
                      className: N8,
                      onMouseDown: (le) => {
                        le.preventDefault(), M(D.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: D.value }),
                        D.hint && /* @__PURE__ */ c.jsx("span", { className: C8, children: D.hint })
                      ]
                    },
                    `${D.value}-${q}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: R8, children: I })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: T8, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: tc, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: tc, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: tc, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: tc, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function A8(t, a) {
  return t.map((s, i) => {
    if (s.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: b8, children: s.value }, `${s.start}-${i}`);
    const o = s.kind, u = a !== null && s.start === a, f = s.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: S8,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: x8, children: nw[o] }),
          f
        ]
      },
      `${s.start}-${i}`
    );
  });
}
var D8 = "_5o8xvy0", k8 = "_5o8xvy1", z8 = "_5o8xvy2", O8 = "_5o8xvy3", qf = "_5o8xvy4", L8 = "_5o8xvy5", $8 = "_3f2ar0", U8 = "_3f2ar1", B8 = "_3f2ar2", V8 = "_3f2ar3", I8 = "_3f2ar4", H8 = "_3f2ar6", al = "_3f2ar7", rl = "_3f2ar8", sl = "_3f2ar9", Kb = "_3f2ara", Xb = "_3f2arb";
function q8({ label: t, glyph: a = "?", children: s }) {
  const [i, o] = v.useState(!1), u = v.useRef(null), f = v.useId(), m = `${f}-content`, y = v.useCallback(() => o(!1), []);
  return v.useEffect(() => {
    if (!i) return;
    const p = (g) => {
      u.current && (g.target instanceof Node && u.current.contains(g.target) || y());
    }, b = (g) => {
      g.key === "Escape" && y();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [i, y]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: $8, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: U8,
        "aria-expanded": i,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: B8, "aria-hidden": "true", children: a }),
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
        className: V8,
        children: s
      }
    )
  ] });
}
var F8 = "_1dxb1dg0", Qb = "_1dxb1dg1", Y8 = "_1dxb1dg2", G8 = "_1dxb1dg3", P8 = "_1dxb1dg4";
function K8() {
  return /* @__PURE__ */ c.jsxs(q8, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: I8, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: H8, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: Kb, children: [
      /* @__PURE__ */ c.jsx("span", { className: Xb, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Kb, children: [
      /* @__PURE__ */ c.jsx("span", { className: Xb, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function X8() {
  return /* @__PURE__ */ c.jsxs("ul", { className: F8, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Qb, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Qb, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Y8, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: G8, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: P8, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function Q8({
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
  mappingsByLower: g,
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j,
  voiceAssets: N
}) {
  const C = t === "quick", T = t === "rows", M = t === "story", z = t === "storyboard", R = M || z, H = i8.find((D) => D.id === t)?.description ?? "", Q = T ? u.reduce((D, q) => D + q.text.length, 0) : R ? m.length : i.length, ie = T ? u.map((D) => D.text).join(" ") : R ? m : i, A = ie.trim() ? ie.trim().split(/\s+/).length : 0, I = T ? u.filter((D) => D.text.trim().length > 0).length : (R ? m : i).trim() ? (R ? m : i).trim().split(/\r?\n/).filter((D) => D.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: D8, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${k8} ${C ? z8 : ""}`,
        "data-quick-on": C || void 0,
        children: [
          /* @__PURE__ */ c.jsx(l8, { value: t, onChange: a }),
          C && /* @__PURE__ */ c.jsx(
            v6,
            {
              deploymentId: s.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: O8, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: Q.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: I.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: A.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !T && /* @__PURE__ */ c.jsx(K8, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: L8, "aria-live": "polite", children: H }),
    z ? /* @__PURE__ */ c.jsx(
      zL,
      {
        voiceAssets: N,
        presets: j,
        storyText: m,
        onStoryTextChange: y
      }
    ) : T ? /* @__PURE__ */ c.jsx(
      a8,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: g
      }
    ) : M ? /* @__PURE__ */ c.jsx(
      M8,
      {
        value: m,
        onChange: y,
        characters: p,
        presets: j,
        mappingsByLower: g
      }
    ) : /* @__PURE__ */ c.jsx(
      x6,
      {
        value: i,
        onChange: o,
        outputFormat: b,
        mappings: g,
        deploymentId: s.deploymentId,
        quickMode: C
      }
    ),
    !C && !T && !M && !z && /* @__PURE__ */ c.jsx(X8, {})
  ] });
}
function Z8({
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
    const p = u.vector, b = Array.isArray(p) && p.some((g) => Math.abs(g) > 0.01);
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
function Zb(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((s) => s.text.trim().length > 0 || s.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function J8(t, a, s, i) {
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
    return { script: tw(s.rows, i) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of i) o.set(f.presetId, f);
    const u = [];
    for (const f of s.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const y = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      y && b.push(`@${Jb(y)}`), p && b.push(`/${Jb(p.presetName)}`), b.push(m), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = kc(s.storyText), u = [];
    for (const m of o)
      m.kind === "text" && u.push(m.value);
    return { script: u.join("").split(/\r?\n/).map((m) => m.replace(/[ \t]+/g, " ").trim()).filter((m) => m.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = kc(s.storyText), u = /* @__PURE__ */ new Map();
    for (const w of i) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let m = "", y = null, p = "", b = !1;
    const g = () => {
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
        b && g(), m = w.value, y = null, b = !0;
      else if (w.kind === "emotion") {
        b && g();
        const S = u.get(w.value.toLowerCase());
        y = S ? S.presetId : null, b = !0;
      } else
        p += w.value, b = !0;
    return g(), { rows: f.length > 0 ? f : [Yr()] };
  }
  return null;
}
function Jb(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const Ff = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], W8 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function e$(t) {
  const a = [];
  if (!t) return a;
  const s = t.split(/\r?\n/);
  for (let i = 0; i < s.length; i += 1) {
    const u = (s[i] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(W8);
    if (!f || !f.groups) {
      a.push({ idx: i, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", y = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), g = p.trim();
    if (!g) {
      a.push({ idx: i, character: null, text: y || u, override: null });
      continue;
    }
    const w = g.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? t$(S) : null;
    a.push({
      idx: i,
      character: w,
      text: y,
      override: j
    });
  }
  return a;
}
function t$(t) {
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
function n$(t) {
  const a = /* @__PURE__ */ new Set(), s = [];
  for (const i of t) {
    if (!i.character) continue;
    const o = i.character.toLowerCase();
    a.has(o) || (a.add(o), s.push(i.character));
  }
  return s;
}
function a$(t) {
  const a = {};
  for (let s = 0; s < t.length; s += 1) {
    const i = t[s];
    i && (a[i] = Ff[s % Ff.length] ?? Ff[0]);
  }
  return a;
}
function r$(t) {
  const a = {};
  for (const s of t)
    s.character && (a[s.character] = (a[s.character] ?? 0) + 1);
  return a;
}
var s$ = "_1snzz30", i$ = "_1snzz31", l$ = "_1snzz33", o$ = "_1snzz34", c$ = "_1snzz36", Wb = "_1snzz3b", ex = "_1snzz3c", tx = "_1snzz3d";
const u$ = "ext-action-invoke", d$ = "emotion-tts.run";
function f$() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(u$, {
      detail: { id: d$ },
      bubbles: !1
    })
  ), !0) : !1;
}
const h$ = 4e3;
function m$({ visible: t, canGenerate: a }) {
  const [s, i] = v.useState(null), [o, u] = v.useState(!1), [f, m] = v.useState(!1), y = v.useRef(null);
  v.useEffect(() => {
    let $ = !1;
    const F = async () => {
      try {
        const ue = await Sc();
        $ || (y.current = ue, i(ue));
      } catch {
      }
    };
    F();
    const Y = window.setInterval(F, h$);
    return () => {
      $ = !0, window.clearInterval(Y);
    };
  }, []), v.useEffect(() => FS(($) => {
    m(!!$.busy);
  }), []);
  const p = v.useCallback(() => {
    C4();
  }, []), b = s?.badge ?? "not_installed", g = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = g;
  v.useEffect(() => {
    o && (w || g) && u(!1);
  }, [o, w, g]);
  const j = v.useCallback(() => {
    u(!0), f$();
  }, []), N = g ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", C = o || w, T = o || w, M = T ? "transitioning" : g ? "running" : "stopped", z = !a || f || !S, R = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", H = S && a && !f, Q = g ? "ready" : w || o ? "busy" : "off", ie = g ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", A = Q === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const I = "rgba(28, 30, 34, 0.94)", D = "#ba9eff", q = "#8455ef", te = "#1a0a3a", X = "#f0f0f3", le = "#aaabae", re = "#22c55e", k = g ? "◼" : "⏻";
  return Ph.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: s$,
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
          background: I,
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
              className: i$,
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
                color: Q === "ready" ? re : Q === "busy" ? D : le,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${Q === "ready" ? "rgba(34, 197, 94, 0.4)" : Q === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: l$,
                    "data-pulse": A ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: Q === "ready" ? `0 0 8px ${re}` : Q === "busy" ? `0 0 8px ${D}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ie
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: ex, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: o$,
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
                  color: M === "running" ? re : X,
                  fontSize: "16px",
                  cursor: C ? "not-allowed" : "pointer",
                  opacity: C ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${M === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: Wb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: k })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: tx, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: ex, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: c$,
                "data-ready": H ? "true" : "false",
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
                  background: z ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${D} 0%, ${q} 100%)`,
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
                  f ? /* @__PURE__ */ c.jsx("span", { className: Wb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: tx, role: "tooltip", children: R })
          ] })
        ]
      }
    ),
    document.body
  );
}
function p$(t) {
  const a = t.workflowCustomised ?? !1, s = t.unmappableFields ?? [], i = g$(t.deployment.displayName, t.deployment.deploymentId), o = PS(KS), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: mR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: pR, children: [
      /* @__PURE__ */ c.jsx("div", { className: vR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: gR, children: /* @__PURE__ */ c.jsx("h1", { className: yR, children: i }) }),
      /* @__PURE__ */ c.jsx("p", { className: bR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      s.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${s.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: MR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: xR, children: [
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
    /* @__PURE__ */ c.jsx(m$, { visible: o, canGenerate: u }),
    typeof document < "u" && Ph.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: AR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: sO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function g$(t, a) {
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
  const [f, m] = v.useState(o), y = `${s}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: SR, "aria-labelledby": s, children: [
    /* @__PURE__ */ c.jsx("header", { className: wR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: NR,
        "aria-expanded": !f,
        "aria-controls": y,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: jR, children: [
            /* @__PURE__ */ c.jsx("span", { className: CR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: TR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: RR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: s, className: ER, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: _R,
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
        className: i === "split" ? kR : DR,
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
}, Th = "__recipe";
function v$(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function y$(t) {
  const a = {};
  for (const s of Object.keys(t))
    s !== Th && (a[s] = t[s]);
  return a;
}
function b$() {
  const { deployment: t, mappings: a, runs: s, workflow: i } = El(), [o, u] = v.useState(a), [f, m] = v.useState([]), [y, p] = v.useState([]), [b, g] = v.useState(null), [w, S] = v.useState(Hc), j = v.useMemo(
    () => t.defaultGenerationOverridesJson ? v$(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = v.useMemo(() => {
    const he = j[Th];
    return typeof he == "object" && he !== null ? he : {};
  }, [j]), [C, T] = v.useState(""), [M, z] = v.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [R, H] = v.useState(t.defaultSpeedFactor ?? 1), [Q, ie] = v.useState({
    mode: "none",
    emotionAlpha: 1
  }), [A, I] = v.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...y$(j)
  })), [D, q] = v.useState(() => {
    const he = N.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [te, X] = v.useState(
    t.defaultVoiceAssetId ?? null
  ), [le, re] = v.useState(() => {
    const he = N.editorMode;
    return he === "quick" || he === "rows" || he === "story" || he === "storyboard" ? he : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), k = le === "quick", [$, F] = v.useState(() => [Yr()]), Y = 1e5, [ue, _] = v.useState(() => {
    const he = N.storyText;
    return typeof he == "string" ? he : "";
  }), ne = v.useRef(!1), J = v.useCallback((he) => {
    he.length > Y && !ne.current && (ne.current = !0, Cn.error(
      `Story text is over ${Math.round(Y / 1e3)} KB — large scripts may slow down save and rendering.`
    )), he.length <= Y && (ne.current = !1), _(he);
  }, []), [G, U] = v.useState(u5), W = v.useRef(C), de = v.useRef($), ve = v.useRef(ue), Te = v.useRef(y);
  v.useEffect(() => {
    W.current = C;
  }, [C]), v.useEffect(() => {
    de.current = $;
  }, [$]), v.useEffect(() => {
    ve.current = ue;
  }, [ue]), v.useEffect(() => {
    Te.current = y;
  }, [y]);
  const [rt, Ee] = v.useState(""), Ze = v.useCallback(
    (he) => {
      re((je) => {
        if (he === je) return je;
        const Oe = {
          script: W.current,
          rows: de.current,
          storyText: ve.current
        }, Ce = Zb(he, Oe), ft = Zb(je, Oe);
        if (!Ce && ft) {
          const He = J8(je, he, Oe, Te.current);
          if (He) {
            const dn = { ...Oe }, Hn = document.activeElement;
            He.script !== void 0 && T(He.script), He.rows !== void 0 && F(He.rows), He.storyText !== void 0 && J(He.storyText);
            const yn = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story",
              storyboard: "Storyboard"
            }, qn = (ct) => ct.split(/\r?\n/).filter((zt) => zt.trim().length > 0).length, nn = He.rows !== void 0 ? He.rows.length : He.script !== void 0 ? qn(He.script) : He.storyText !== void 0 ? qn(He.storyText) : 0, An = nn === 1 ? "line" : "lines", fn = nn > 0 ? ` (${nn} ${An})` : "", Ue = `Switched to ${yn[he]} mode${nn > 0 ? `, ${nn} ${An}` : ""}.`;
            Ee((ct) => ct === Ue ? `${Ue}​` : Ue), cn(`Switched to ${yn[he]}${fn} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(dn.script), F([...dn.rows]), J(dn.storyText), re(je), Hn && typeof Hn.focus == "function" && requestAnimationFrame(() => Hn.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return he;
      });
    },
    [J]
  );
  v.useEffect(() => {
    let he = !1;
    return Xs(t.deploymentId).then((je) => {
      he || m(je.voiceAssets);
    }).catch(() => {
    }), X_(t.deploymentId).then((je) => {
      he || p(
        [...je.presets].sort((Oe, Ce) => Ce.updatedAt - Oe.updatedAt)
      );
    }).catch(() => {
    }), () => {
      he = !0;
    };
  }, [t.deploymentId]);
  const Ie = v.useRef(!0);
  v.useEffect(() => {
    if (Ie.current) {
      Ie.current = !1;
      return;
    }
    const he = window.setTimeout(() => {
      const je = {
        ...A,
        [Th]: {
          editorMode: le,
          quickMode: k,
          cachePolicy: D,
          storyText: ue
        }
      };
      wt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: M,
          defaultSpeedFactor: R,
          defaultGenerationOverrides: je
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    M,
    R,
    D,
    le,
    k,
    ue,
    A
  ]);
  const Ve = v.useMemo(() => le === "rows" ? tw($, y) : le === "story" ? ue : C, [le, $, y, C, ue]), It = v.useMemo(() => e$(Ve), [Ve]), jt = v.useMemo(() => {
    if (le !== "story") return n$(It);
    const he = /* @__PURE__ */ new Set(), je = [];
    for (const Oe of kc(ue))
      Oe.kind === "character" && (he.has(Oe.value) || (he.add(Oe.value), je.push(Oe.value)));
    return je;
  }, [le, It, ue]), Dt = v.useMemo(() => a$(jt), [jt]), Mn = v.useMemo(() => r$(It), [It]), dt = v.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const je of o)
      he.set(je.characterName.toLowerCase(), je);
    return he;
  }, [o]), Qt = v.useMemo(() => k && te ? 0 : jt.filter((he) => !dt.has(he.toLowerCase())).length, [jt, dt, k, te]), un = v.useCallback(
    async (he, je) => {
      const Oe = dt.get(he.toLowerCase());
      try {
        if (Oe) {
          const Ce = await ul(t.deploymentId, Oe.mappingId, je);
          u(
            (ft) => ft.map((He) => He.mappingId === Ce.mappingId ? Ce : He)
          ), Cn.success(`Updated mapping for ${he}`);
        } else if (je.speakerVoiceAssetId) {
          const Ce = await Yh(t.deploymentId, {
            ...je,
            characterName: he,
            speakerVoiceAssetId: je.speakerVoiceAssetId
          });
          u((ft) => [...ft, Ce]), Cn.success(`Mapped ${he} to voice`);
        }
      } catch (Ce) {
        Cn.error(Ce instanceof Error ? Ce.message : "mapping failed");
      }
    },
    [dt, t.deploymentId]
  ), Rt = v.useCallback(
    async (he) => {
      const je = dt.get(he.toLowerCase());
      if (je)
        try {
          await s1(t.deploymentId, je.mappingId), u((Oe) => Oe.filter((Ce) => Ce.mappingId !== je.mappingId)), Cn.success(`Cleared mapping for ${he}`);
        } catch (Oe) {
          Cn.error(Oe instanceof Error ? Oe.message : "clear failed");
        }
    },
    [dt, t.deploymentId]
  ), tn = v.useCallback(
    async (he, je) => {
      try {
        const Oe = await xc(
          t.deploymentId,
          je,
          je.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Ce) => [Oe, ...Ce]), await un(he, { speakerVoiceAssetId: Oe.voiceAssetId });
      } catch (Oe) {
        Cn.error(Oe instanceof Error ? Oe.message : "upload failed");
      }
    },
    [t.deploymentId, un]
  ), _t = v.useCallback((he) => {
    S(he);
  }, []), V = v.useMemo(() => {
    const he = [], je = /* @__PURE__ */ new Set();
    for (const Oe of o) {
      const Ce = Oe.speakerVoiceAssetId;
      if (!Ce || je.has(Ce)) continue;
      je.add(Ce);
      const He = f.find((dn) => dn.voiceAssetId === Ce)?.displayName ?? `${Oe.characterName} · ${Ce.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: Ce, label: He });
    }
    for (const Oe of f)
      je.has(Oe.voiceAssetId) || (je.add(Oe.voiceAssetId), he.push({ kind: "voice_asset", id: Oe.voiceAssetId, label: Oe.displayName }));
    return he;
  }, [o, f]), ce = v.useCallback(
    async (he, je) => {
      if (he.kind !== "voice_asset") {
        Cn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Oe;
      try {
        const Ce = JSON.parse(je);
        if (typeof Ce != "object" || Ce === null || Ce.version !== 1 || !Array.isArray(Ce.ops))
          throw new Error("snapshot is not a valid EditChain");
        Oe = Ce;
      } catch (Ce) {
        Cn.error(
          Ce instanceof Error ? `Audit snapshot is malformed: ${Ce.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Ce = await l1(he.id, t.deploymentId, {
          chain: Oe
        }), ft = o.filter((He) => He.speakerVoiceAssetId === he.id);
        await Promise.all(
          ft.map(
            (He) => ul(t.deploymentId, He.mappingId, {
              voiceAssetChainDigest: Ce.chain_digest
            }).catch(() => null)
          )
        ), u(
          (He) => He.map(
            (dn) => dn.speakerVoiceAssetId === he.id ? { ...dn, voiceAssetChainDigest: Ce.chain_digest } : dn
          )
        ), Cn.success(`Reverted ${he.label} to a prior chain`);
      } catch (Ce) {
        Cn.error(Ce instanceof Error ? Ce.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), ye = v.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        Cn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await uR(he.id, t.deploymentId);
        const je = o.filter((Oe) => Oe.speakerVoiceAssetId === he.id);
        await Promise.all(
          je.map(
            (Oe) => ul(t.deploymentId, Oe.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (Oe) => Oe.map(
            (Ce) => Ce.speakerVoiceAssetId === he.id ? { ...Ce, voiceAssetChainDigest: null } : Ce
          )
        ), Cn.success(`Cleared edit chain on ${he.label}`);
      } catch (je) {
        Cn.error(je instanceof Error ? je.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), ze = v.useMemo(
    () => ({
      script: Ve,
      parserMode: le === "quick" ? "raw_text" : le === "story" ? "story" : "dialogue",
      outputFormat: M,
      speedFactor: R,
      globalEmotion: { ...Q, emotionAlpha: G.intensity },
      generation: A,
      cachePolicy: D
    }),
    [Ve, le, M, R, G.intensity, Q, A, D]
  ), Fe = v.useMemo(
    () => Z8({
      script: Ve,
      quickMode: k,
      defaultVoiceAssetId: te,
      characters: jt,
      unmappedCount: Qt,
      globalEmotion: Q,
      performance: G
    }),
    [Ve, k, te, jt, Qt, Q, G]
  ), st = v.useMemo(
    () => Fe.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [Fe]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(oR, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: rt
      }
    ),
    /* @__PURE__ */ c.jsx(
      p$,
      {
        deployment: t,
        canGenerate: Ve.trim().length > 0,
        workflowCustomised: i.workflow.customised,
        unmappableFields: i.unmappableFields,
        hero: /* @__PURE__ */ c.jsx($2, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          SO,
          {
            deploymentId: t.deploymentId,
            createPayload: ze,
            canGenerate: Ve.trim().length > 0,
            diagnostics: st
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          tO,
          {
            deploymentId: t.deploymentId,
            speedFactor: R
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          Q8,
          {
            editorMode: le,
            onEditorModeChange: Ze,
            deployment: t,
            script: C,
            onScriptChange: T,
            rows: $,
            onRowsChange: F,
            storyText: ue,
            onStoryTextChange: J,
            storyCharacters: jt,
            outputFormat: M,
            mappingsByLower: dt,
            defaultVoiceAssetId: te,
            onDefaultVoiceAssetIdChange: X,
            presets: y,
            voiceAssets: f
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(t5, { lines: It, characterColors: Dt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          K_,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: Dt,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(A2, { unmappedCount: Qt, totalCount: jt.length, children: jt.map((he) => {
          const je = dt.get(he.toLowerCase()) ?? null, Oe = Dt[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: FR, children: /* @__PURE__ */ c.jsx(
            M2,
            {
              characterName: he,
              color: Oe,
              lineCount: Mn[he] ?? 0,
              mapping: je,
              voiceAssets: f,
              presets: y,
              active: b === he,
              onToggle: () => g((Ce) => Ce === he ? null : he),
              onAssignVoiceAsset: (Ce) => un(he, { speakerVoiceAssetId: Ce }),
              onAssignPreset: (Ce) => un(he, { defaultVectorPresetId: Ce }),
              onUploadFile: (Ce) => tn(he, Ce),
              onClearMapping: () => Rt(he)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          C3,
          {
            value: Q,
            onChange: ie,
            deploymentId: t.deploymentId,
            presets: y,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            d5,
            {
              value: { ...G, pace: R },
              onChange: (he) => {
                U(he), he.pace !== R && H(he.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Qh,
            {
              state: w,
              onChange: _t,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(w5, { checks: Fe }),
          /* @__PURE__ */ c.jsx(
            Y3,
            {
              outputFormat: M,
              onOutputFormatChange: z,
              speedFactor: R,
              onSpeedFactorChange: H,
              cachePolicy: D,
              onCachePolicyChange: q,
              generation: A,
              onGenerationChange: I
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(_5, { runs: s, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          d2,
          {
            deploymentId: t.deploymentId,
            targets: V,
            onRevertToIdentity: ye,
            onRevertToChain: ce
          }
        )
      }
    )
  ] });
}
const nx = /* @__PURE__ */ new Map();
function x$(t, a) {
  const [s, i] = v.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return v.useEffect(() => {
    if (!t || a <= 0) {
      i({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, u = nx.get(o);
    if (u) {
      i({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return i({ peaks: null, isLoading: !0, error: null }), S$(t, a, f.signal).then((m) => {
      f.signal.aborted || (nx.set(o, m), i({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const y = m instanceof Error ? m.message : "decode failed";
      i({ peaks: null, isLoading: !1, error: y });
    }), () => f.abort();
  }, [t, a]), s;
}
async function S$(t, a, s) {
  const i = await fetch(t, { signal: s });
  if (!i.ok) throw new Error(`failed to load audio (${i.status})`);
  const o = await i.arrayBuffer();
  if (s.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return w$(f, a);
}
function w$(t, a) {
  const s = t.numberOfChannels, i = t.length, o = Math.max(1, Math.floor(i / a)), u = new Float32Array(a), f = [];
  for (let m = 0; m < s; m += 1) f.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const y = m * o, p = Math.min(i, y + o);
    let b = 0;
    for (let g = y; g < p; g += 1) {
      let w = 0;
      for (let j = 0; j < s; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[g] ?? 0));
      }
      const S = w / s;
      S > b && (b = S);
    }
    u[m] = b;
  }
  return u;
}
const ax = "(prefers-reduced-motion: reduce)";
function j$() {
  const [t, a] = v.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(ax).matches);
  return v.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const s = window.matchMedia(ax), i = (o) => a(o.matches);
    return s.addEventListener("change", i), () => s.removeEventListener("change", i);
  }, []), t;
}
var E$ = "mquzal0", N$ = "mquzal1", rx = "mquzal2", sx = "mquzal3", ix = "mquzal4", C$ = "mquzal5", lx = "mquzal6", ox = "mquzal7";
const T$ = 120, R$ = 720;
function sw(t) {
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
    width: b = R$,
    height: g = T$
  } = t, w = v.useRef(null), S = v.useRef(null), j = v.useRef(null), N = x$(a, b), C = j$();
  v.useEffect(() => {
    _$(w.current, N.peaks, b, g);
  }, [N.peaks, b, g]);
  const T = v.useCallback(
    (A) => {
      const I = S.current?.getBoundingClientRect();
      if (!I || I.width <= 0) return 0;
      const D = Math.max(0, Math.min(1, (A - I.left) / I.width));
      return Math.round(D * s);
    },
    [s]
  );
  v.useEffect(() => {
    const A = (D) => {
      if (!j.current) return;
      const q = T(D.clientX);
      j.current === "start" ? u(nc(q, 0, o - 1)) : f(nc(q, i + 1, s));
    }, I = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", I);
    };
  }, [T, s, o, i, u, f]);
  const M = (A) => (I) => {
    I.preventDefault(), I.stopPropagation(), j.current = A;
  }, z = (A) => {
    !p || A.target.closest("[data-handle]") || p(T(A.clientX));
  }, R = (A) => (I) => {
    const D = I.shiftKey ? 100 : I.ctrlKey ? 1 : 10;
    let q = 0;
    if (I.key === "ArrowLeft") q = -D;
    else if (I.key === "ArrowRight") q = D;
    else return;
    I.preventDefault(), A === "start" ? u(nc(i + q, 0, o - 1)) : f(nc(o + q, i + 1, s));
  }, H = Yf(i, s), Q = Yf(o, s), ie = Yf(y, s);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: E$,
      style: { height: g },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: g,
            className: N$,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: ox, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: ox, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: lx, style: { left: 0, width: `${H}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: lx,
            style: { left: `${Q}%`, right: 0, width: `${100 - Q}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: rx,
            style: { left: `${H}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: sx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: ix, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: rx,
            style: { left: `${Q}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: sx, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: ix, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: C$,
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
function Yf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function nc(t, a, s) {
  return Math.max(a, Math.min(s, t));
}
function _$(t, a, s, i) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, s, i), !a || a.length === 0)) return;
  const u = i / 2;
  o.fillStyle = M$(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, s);
  for (let m = 0; m < f; m += 1) {
    const y = a[m] ?? 0, p = Math.max(1, y * (i - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function M$(t, a, s) {
  return getComputedStyle(t).getPropertyValue(a).trim() || s;
}
var A$ = "r8lfsm0", D$ = "r8lfsm1", k$ = "r8lfsm2", z$ = "r8lfsm3", O$ = "r8lfsm4", L$ = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, $$ = "_1b1zchy3", U$ = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, B$ = "_1b1zchy6", V$ = "_1b1zchy7";
const iw = v.createContext("standalone");
function lw({
  variant: t = "standalone",
  children: a,
  className: s,
  style: i,
  ...o
}) {
  const u = [L$[t], s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(iw.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: i, ...o, children: a }) });
}
function ow({
  title: t,
  meta: a,
  children: s,
  className: i,
  titleId: o
}) {
  const u = v.useContext(iw), f = [$$, i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: U$[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: B$, children: a }) : null,
    s
  ] });
}
function cw({
  children: t,
  className: a,
  role: s = "group"
}) {
  const i = [V$, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, role: s, children: t });
}
const cx = -16, I$ = 80, H$ = 720;
function q$(t) {
  const { deploymentId: a, runId: s, utterance: i, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, y = i.durationMs ?? 0, [p, b] = v.useState(() => ux(y)), [g, w] = v.useState(Hc), [S, j] = v.useState(!1), [N, C] = v.useState(!1), [T, M] = v.useState(null), [z, R] = v.useState(!1), H = v.useRef(null), Q = v.useRef(null), ie = v.useRef(null);
  v.useEffect(() => {
    const F = ux(y);
    b(F), w(y1(F)), C(!1), M(null), ie.current = null;
  }, [i.utteranceId, y]);
  const A = v.useCallback((F) => {
    w(F), b((Y) => v1(Y, F));
  }, []);
  v.useEffect(() => () => Q.current?.abort(), []), v.useEffect(() => {
    H.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [i.utteranceId]);
  const I = v.useCallback(
    (F) => {
      F.key === "Escape" && (F.stopPropagation(), m());
    },
    [m]
  ), D = v.useMemo(
    () => p.ops.find((F) => F.mode === "trim"),
    [p.ops]
  ), q = D?.start_ms ?? 0, te = D?.end_ms ?? Math.max(1, y), X = v.useCallback((F, Y) => {
    b((ue) => F$(ue, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(F)),
      end_ms: Math.max(Math.floor(F) + 1, Math.floor(Y))
    })));
  }, []), le = v.useCallback((F) => X(F, te), [te, X]), re = v.useCallback((F) => X(q, F), [q, X]), k = v.useCallback((F) => {
    C(F), b((Y) => {
      const ue = Y.ops.filter((_) => _.mode !== "normalize");
      if (F) {
        const _ = {
          id: _n(),
          mode: "normalize",
          target_lufs: cx
        };
        return { ...Y, ops: [...ue, _] };
      }
      return { ...Y, ops: ue };
    });
  }, []), $ = v.useCallback(async () => {
    const F = o1(p, y);
    if (F) {
      M(F.message);
      return;
    }
    if (M(null), z) return;
    Q.current?.abort();
    const Y = new AbortController();
    Q.current = Y, R(!0);
    try {
      const ue = ie.current ?? void 0, _ = await cR(
        a,
        s,
        i.utteranceId,
        ue ? { chain: p, digest_before: ue } : { chain: p },
        { signal: Y.signal }
      );
      if (Y.signal.aborted) return;
      ie.current = _.chain_digest, u(_);
    } catch (ue) {
      if (Y.signal.aborted) return;
      ue instanceof Qs && (ie.current = ue.currentDigest || null);
      const _ = ue instanceof Qs ? "Edit chain has changed in another tab. Reload to continue." : ue instanceof Error ? ue.message : "apply failed";
      M(_), f(_);
    } finally {
      Y.signal.aborted || R(!1);
    }
  }, [p, y, z, a, s, i.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(lw, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: H, onKeyDown: I, children: [
    /* @__PURE__ */ c.jsx(ow, { title: "Edit segment", meta: `Source · ${ac(y)}` }),
    /* @__PURE__ */ c.jsx(
      sw,
      {
        audioUrl: o,
        durationMs: Math.max(1, y),
        startMs: q,
        endMs: te,
        onChangeStart: le,
        onChangeEnd: re,
        height: I$,
        width: H$
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: A$, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: D$, children: [
        ac(q),
        " → ",
        ac(te),
        " · ",
        ac(te - q)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: k$, children: [
      /* @__PURE__ */ c.jsxs("label", { className: z$, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (F) => k(F.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          cx.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: O$,
          onClick: () => j((F) => !F),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      Qh,
      {
        state: g,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(cw, { children: [
      /* @__PURE__ */ c.jsx(Pe, { size: "sm", onClick: () => void $(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Pe, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: T })
  ] }) });
}
function ux(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function F$(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function ac(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var Y$ = "jq2zyb2", G$ = "jq2zyb3", P$ = "jq2zyb4", K$ = "jq2zyb5", X$ = "jq2zyb6", Q$ = "jq2zyb7", Z$ = "jq2zyb8", J$ = "jq2zyb9", W$ = "jq2zyba", eU = "jq2zybb", tU = "jq2zybc", nU = "jq2zybd", aU = "jq2zybe", rU = "jq2zybf jq2zybe", sU = "jq2zybg", iU = "jq2zybh", lU = "jq2zybi", oU = "jq2zybj", cU = "jq2zybk", uU = "jq2zybl", dU = "jq2zybm", fU = "jq2zybn", hU = "jq2zybo", mU = "jq2zybp", pU = "jq2zybq", gU = "jq2zybr", vU = "jq2zybs", yU = "jq2zybt", bU = "jq2zybu", xU = "jq2zybv", SU = "jq2zybw", wU = "jq2zybx", jU = "jq2zyby", dx = "jq2zybz", EU = "jq2zyb10", NU = "jq2zyb11", CU = "jq2zyb12";
const TU = ["cancelled", "failed", "partial"], RU = 2600;
function _U() {
  const { run: t } = El(), a = ei(), [s, i] = v.useState(t), [o, u] = v.useState(!1), [f, m] = v.useState(null), [y, p] = v.useState(null), [b, g] = v.useState(
    null
  );
  v.useEffect(() => {
    i(t);
  }, [t]), v.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => g(null), RU);
    return () => clearTimeout(R);
  }, [b]);
  const w = v.useMemo(() => DU(s), [s]), S = TU.includes(s.status) && s.kind === "batch", j = (s.exportZipStaleAt ?? null) !== null, N = async () => {
    if (s.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: R } = await i1(s.deploymentId, s.runId);
        a(`/${s.deploymentId}/runs/${R}`);
      } catch (R) {
        m(OU(R));
      } finally {
        u(!1);
      }
    }
  }, C = v.useCallback((R) => {
    p((H) => H === R ? null : R);
  }, []), T = v.useCallback(() => {
    p(null);
  }, []), M = (R, H) => {
    i((Q) => AU(Q, R, H)), p(null), g({ message: "Segment edited", severity: "success" });
  }, z = v.useCallback((R) => {
    g({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: Y$, children: [
    /* @__PURE__ */ c.jsxs("div", { className: G$, children: [
      /* @__PURE__ */ c.jsxs("header", { className: P$, children: [
        /* @__PURE__ */ c.jsxs("p", { className: K$, children: [
          s.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Fh, { to: `/${s.deploymentId}/recipe`, className: X$, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: Q$, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: Z$, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: J$, children: [
            kU(s.kind),
            /* @__PURE__ */ c.jsx("span", { className: W$, children: s.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Jr, { size: "md", tone: LU(s.status), pulse: s.status === "running", children: s.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: eU, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(rc, { label: "Format", value: s.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(rc, { label: "Speed", value: `${s.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          rc,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          rc,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: iU, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: lU, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: oU, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: cU, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Pe, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: uU, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(pT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: dU, children: [
            /* @__PURE__ */ c.jsx("span", { className: fU, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: hU, children: s.utterances.map((R) => {
          const H = y === R.utteranceId, Q = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, ie = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, A = ie ? `/api/v1/artifacts/${encodeURIComponent(ie)}/download` : "", I = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: pU, children: [
            /* @__PURE__ */ c.jsxs("div", { className: mU, children: [
              /* @__PURE__ */ c.jsxs("span", { className: vU, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: yU, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: bU, title: R.text, children: R.text }),
              /* @__PURE__ */ c.jsxs("span", { className: xU, children: [
                R.cacheHit && /* @__PURE__ */ c.jsx("span", { className: SU, children: "cached" }),
                I && /* @__PURE__ */ c.jsx("span", { className: gU, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ c.jsx("span", { children: zU(R.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Jr, { tone: $U(R.status), children: R.status }),
                Q && /* @__PURE__ */ c.jsx(
                  Pe,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => C(R.utteranceId),
                    "aria-expanded": H,
                    "aria-label": H ? "Close segment editor" : "Edit segment",
                    children: H ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            H && A && s.deploymentId && /* @__PURE__ */ c.jsx(
              q$,
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
      MU(s, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: CU,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function MU(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const i = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: wU, children: a ? /* @__PURE__ */ c.jsxs("div", { className: EU, children: [
    /* @__PURE__ */ c.jsx("p", { className: NU, children: i }),
    /* @__PURE__ */ c.jsxs(
      Pe,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: dx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: jU,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: dx, children: "↓" })
      ]
    }
  ) : null });
}
function AU(t, a, s) {
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
function rc({ label: t, value: a, mono: s, progress: i }) {
  const o = i !== void 0 ? Math.min(1, Math.max(0, i)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: tU,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: nU, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: s ? rU : aU, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: sU, "aria-hidden": "true" })
      ]
    }
  );
}
function DU(t) {
  const a = t.utterances.length, s = t.utterances.filter((f) => f.status === "completed").length, i = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = s > 0 ? Math.round(o / s * 100) : 0;
  return { total: a, completed: s, failed: i, cached: o, cacheRatio: u };
}
function kU(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function zU(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function OU(t) {
  return t instanceof ti ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function LU(t) {
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
function $U(t) {
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
var UU = "pcphqj2", BU = "pcphqj3", VU = "pcphqj4", IU = "pcphqj5", HU = "pcphqj6", qU = "pcphqj7", FU = "pcphqj8", YU = "pcphqj9", GU = "pcphqja", fx = "pcphqjb", PU = "pcphqjc", KU = "pcphqjd", XU = "pcphqje pcphqjd", QU = "pcphqjf", ZU = "pcphqjg", JU = "pcphqjh", WU = "pcphqji", e9 = "pcphqjj pcphqji", t9 = "pcphqjk pcphqji", n9 = "pcphqjl pcphqji", a9 = "pcphqjm", Gf = "pcphqjn", Pf = "pcphqjo";
function r9() {
  const [t, a] = v.useState(null), [s, i] = v.useState(null);
  return v.useEffect(() => {
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: UU, children: /* @__PURE__ */ c.jsxs("div", { className: BU, children: [
    /* @__PURE__ */ c.jsxs("header", { className: VU, children: [
      /* @__PURE__ */ c.jsx("p", { className: IU, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: HU, children: [
        /* @__PURE__ */ c.jsx("h1", { className: qU, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: FU, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: YU, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    s ? /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: s }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(Vc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: GU, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${fx} ${PU}` : fx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? XU : KU, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: QU, children: [
                /* @__PURE__ */ c.jsx("span", { className: ZU, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: JU, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: s9(o.kind), children: i9(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: a9, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: l9(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Pf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Pf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Pf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function s9(t) {
  switch (t) {
    case "batch":
      return e9;
    case "test_line":
      return t9;
    case "resume":
      return n9;
    default:
      return WU;
  }
}
function i9(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function l9(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), s = t % 60;
  return s === 0 ? `${a}m` : `${a}m ${s}s`;
}
function o9() {
  const { deploymentId: t, prefillCharacterName: a } = El(), s = ei(), [i, o] = v.useState(a), [u, f] = v.useState(""), [m, y] = v.useState("none"), [p, b] = v.useState(!1), [g, w] = v.useState(null), S = v.useRef(null);
  v.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Yh(t, {
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
      /* @__PURE__ */ c.jsx(Pe, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      g && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: g })
    ] })
  ] });
}
var c9 = "_1oor31e0", u9 = "_1oor31e1", d9 = "_1oor31e2", f9 = "_1oor31e3", h9 = "_1oor31e4", m9 = "_1oor31e5", p9 = "_1oor31e6", g9 = "_1oor31e7", v9 = "_1oor31e8";
const y9 = 8;
function b9(t) {
  const { entries: a, loading: s, error: i } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: c9, "aria-busy": !!s, children: [
    i && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: i }),
    s && !i && /* @__PURE__ */ c.jsx("div", { className: v9, "aria-live": "polite", children: "Loading edit history…" }),
    !s && !i && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: g9, children: "No edits yet" }),
    !s && !i && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: u9, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: d9, children: [
      /* @__PURE__ */ c.jsx("span", { className: f9, children: S9(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: h9, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: m9, title: o.digest_after, children: x9(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: p9, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function x9(t) {
  return t ? `${t.slice(0, y9)}…` : "—";
}
function S9(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var hx = "_1c63kaw0", w9 = "_1c63kaw1", j9 = "_1c63kaw2", E9 = "_1c63kaw3", N9 = "_1c63kaw4", C9 = "_1c63kaw5", T9 = "_1c63kaw6";
function R9({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: hx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: w9, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: hx, "data-testid": "edit-chain-list", children: t.ops.map((s, i) => /* @__PURE__ */ c.jsxs("li", { className: j9, children: [
    /* @__PURE__ */ c.jsxs("span", { className: E9, "aria-hidden": "true", children: [
      i + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: N9, children: [
      /* @__PURE__ */ c.jsx("span", { className: C9, children: mx(s) }),
      /* @__PURE__ */ c.jsx("span", { className: T9, children: _9(s) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Pe,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(s.id),
        "aria-label": `Remove ${mx(s)} (position ${i + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, s.id)) });
}
function mx(t) {
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
function _9(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${px(t.start_ms)} → ${px(t.end_ms)}`;
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
      return `${Kf(t.low_db)} / ${Kf(t.mid_db)} / ${Kf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Kf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function px(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var sc = "_1o3ytop0", Xf = "_1o3ytop1", gx = "_1o3ytop2", M9 = "_1o3ytop3", A9 = "_1o3ytop4", D9 = "_1o3ytop5", k9 = "_1o3ytop6", z9 = "_1o3ytop7", ic = "_1o3ytop8", O9 = "_1o3ytop9", L9 = "_1o3ytopf", $9 = "_1o3ytopg", U9 = "_1o3ytoph", B9 = "_1o3ytopi", V9 = "_1o3ytopj", I9 = "_1o3ytopk", H9 = "_1t0zy2f0", q9 = "_1t0zy2f1", F9 = "_1t0zy2f2";
function Y9({ content: t, children: a, delayMs: s = 350 }) {
  const [i, o] = v.useState(!1), u = v.useId(), f = v.useRef(null), m = v.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), y = v.useCallback(() => {
    m(), f.current = window.setTimeout(() => o(!0), s);
  }, [m, s]), p = v.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (v.useEffect(() => () => m(), [m]), v.useEffect(() => {
    if (!i) return;
    const g = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", g), () => window.removeEventListener("keydown", g);
  }, [i]), !v.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: y,
    onMouseLeave: p,
    onFocus: y,
    onBlur: p,
    "aria-describedby": i ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: H9, children: [
    v.cloneElement(a, b),
    i && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: F9, children: t })
  ] });
}
function lc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(Y9, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: q9, children: "?" }) });
}
const vx = -16;
function G9(t) {
  const {
    voiceAsset: a,
    deploymentId: s,
    affectedCharacterNames: i = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = v.useMemo(
    () => P9(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [y, p] = v.useState(() => Qf(f)), [b, g] = v.useState(Hc), [w, S] = v.useState(!1), [j, N] = v.useState(null), [C, T] = v.useState(null), [M, z] = v.useState(!1), [R, H] = v.useState(!1), [Q, ie] = v.useState(!1), [A, I] = v.useState(null), [D, q] = v.useState([]), [te, X] = v.useState(null), [le, re] = v.useState([]), [k, $] = v.useState(!1), [F, Y] = v.useState(null), [ue, _] = v.useState(0), ne = v.useRef(null), J = v.useRef(null), G = v.useRef(null), U = v.useRef(null), W = v.useRef(null), de = v.useRef(0), ve = v.useMemo(
    () => y.ops.some((V) => V.mode === "normalize"),
    [y.ops]
  );
  v.useEffect(() => {
    const V = Qf(f);
    p(V), g(y1(V)), N(null), ie(!1), q([]), X(null), W.current = null;
  }, [a.voiceAssetId, f]);
  const Te = v.useCallback((V) => {
    g(V), p((ce) => v1(ce, V));
  }, []);
  v.useEffect(() => {
    U.current?.abort();
    const V = new AbortController();
    return U.current = V, $(!0), Y(null), fc(s, "voice_asset", a.voiceAssetId, 50, {
      signal: V.signal
    }).then((ce) => {
      V.signal.aborted || re(ce.entries);
    }).catch((ce) => {
      if (V.signal.aborted) return;
      const ye = ce instanceof Error ? ce.message : "audit fetch failed";
      Y(ye);
    }).finally(() => {
      V.signal.aborted || $(!1);
    }), () => V.abort();
  }, [s, a.voiceAssetId, ue]), v.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), v.useEffect(() => () => {
    J.current?.abort(), G.current?.abort(), U.current?.abort();
  }, []);
  const rt = y.ops.find((V) => V.mode === "trim"), Ee = y.ops.find((V) => V.mode === "normalize"), Ze = rt?.start_ms ?? 0, Ie = rt?.end_ms ?? Math.max(1, f), Ve = v.useCallback((V, ce) => {
    p(
      (ye) => yx(
        ye,
        "trim",
        (ze) => ({
          ...ze,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(V)),
          end_ms: Math.max(Math.floor(V) + 1, Math.floor(ce))
        })
      )
    );
  }, []), It = v.useCallback(
    (V) => Ve(V, Ie),
    [Ie, Ve]
  ), jt = v.useCallback(
    (V) => Ve(Ze, V),
    [Ze, Ve]
  ), Dt = v.useCallback((V) => {
    p((ce) => {
      const ye = ce.ops.filter((ze) => ze.mode !== "normalize");
      if (V) {
        const ze = {
          id: _n(),
          mode: "normalize",
          target_lufs: vx
        };
        return { ...ce, ops: [...ye, ze] };
      }
      return { ...ce, ops: ye };
    });
  }, []), Mn = v.useCallback(
    (V) => {
      const ce = y.ops.findIndex((Fe) => Fe.id === V);
      if (ce === -1) return;
      const ye = y.ops[ce];
      if (!ye) return;
      const ze = [...y.ops.slice(0, ce), ...y.ops.slice(ce + 1)];
      p({ ...y, ops: ze }), q((Fe) => [...Fe, { op: ye, index: ce }]);
    },
    [y]
  ), dt = v.useCallback(() => {
    const V = D[D.length - 1];
    if (!V) return;
    const ce = Math.min(V.index, y.ops.length), ye = [...y.ops.slice(0, ce), V.op, ...y.ops.slice(ce)];
    p({ ...y, ops: ye }), q(D.slice(0, -1));
  }, [y, D]), Qt = v.useCallback(() => {
    const V = o1(y, f);
    return V ? (N(V.message), !1) : (N(null), !0);
  }, [y, f]), un = v.useCallback(async () => {
    if (!Qt() || M) return;
    J.current?.abort();
    const V = new AbortController();
    J.current = V;
    const ce = ++de.current;
    H(!0);
    try {
      const ye = await dR(a.voiceAssetId, s, y, {
        signal: V.signal
      });
      if (V.signal.aborted || ce !== de.current) return;
      C && URL.revokeObjectURL(C);
      const ze = URL.createObjectURL(ye);
      T(ze), ie(!0), requestAnimationFrame(() => ne.current?.play().catch(() => {
      }));
    } catch (ye) {
      if (V.signal.aborted) return;
      const ze = ye instanceof Error ? ye.message : "preview failed";
      N(ze), u(ze);
    } finally {
      V.signal.aborted || H(!1);
    }
  }, [Qt, M, a.voiceAssetId, s, y, C, u]), Rt = v.useCallback(async () => {
    if (!Qt() || R || M) return;
    if (i.length > 1) {
      const ce = i.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${i.length} characters: ${ce}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    J.current?.abort(), G.current?.abort();
    const V = new AbortController();
    G.current = V, z(!0);
    try {
      const ce = W.current ?? void 0, ye = await l1(
        a.voiceAssetId,
        s,
        ce ? { chain: y, digest_before: ce } : { chain: y },
        { signal: V.signal }
      );
      if (V.signal.aborted) return;
      W.current = ye.chain_digest, X(ye.chain_digest), N(null), I(ye.measured_lufs ?? null), q([]), o(ye), _((ze) => ze + 1);
    } catch (ce) {
      if (V.signal.aborted) return;
      const ye = ce instanceof Qs;
      ce instanceof Qs && (W.current = ce.currentDigest || null);
      const ze = ye ? "Edit chain has changed in another tab. Reload to continue." : ce instanceof Error ? ce.message : "apply failed";
      N(ze), u(ze);
    } finally {
      V.signal.aborted || z(!1);
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
  ]), tn = v.useCallback(() => {
    J.current?.abort(), p(Qf(f)), N(null), I(null), ie(!1), q([]), _((V) => V + 1), C && (URL.revokeObjectURL(C), T(null));
  }, [f, C]), _t = v.useCallback((V) => {
    p(
      (ce) => yx(
        ce,
        "normalize",
        (ye) => ({
          ...ye,
          mode: "normalize",
          target_lufs: V
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(lw, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      ow,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${oc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      sw,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: Ze,
        endMs: Ie,
        onChangeStart: It,
        onChangeEnd: jt
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: sc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Xf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          lc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: gx, children: [
        oc(Ze),
        " → ",
        oc(Ie),
        " · ",
        oc(Ie - Ze)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: z9, children: [
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: sc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Xf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              lc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          ve && Ee && /* @__PURE__ */ c.jsxs("span", { className: L9, children: [
            "target ",
            Ee.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: O9, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: ve,
              onChange: (V) => Dt(V.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            vx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        ve && Ee && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: U9,
            min: -30,
            max: -6,
            step: 0.5,
            value: Ee.target_lufs,
            onChange: (V) => _t(Number(V.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: sc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Xf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              lc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: gx, children: y.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(R9, { chain: y, onRemoveOp: Mn })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: M9,
            onClick: () => S((V) => !V),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: A9, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: D9, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                lc,
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
          Qh,
          {
            state: b,
            onChange: Te,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      te && /* @__PURE__ */ c.jsx("div", { className: ic, children: /* @__PURE__ */ c.jsxs("span", { className: sc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: k9, title: te, children: [
          te.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(cw, { children: [
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          variant: "secondary",
          onClick: () => void un(),
          disabled: R || M,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          onClick: () => void Rt(),
          disabled: M || R,
          children: M ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Pe,
        {
          variant: "ghost",
          onClick: tn,
          disabled: M || R,
          children: "Reset"
        }
      ),
      D.length > 0 && /* @__PURE__ */ c.jsxs(
        Pe,
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
      Q && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: I9,
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
        className: $9,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: B9, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: V9, children: [
        "Edit history",
        le.length > 0 ? ` · ${le.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        b9,
        {
          entries: le,
          loading: k,
          error: F
        }
      )
    ] })
  ] });
}
function Qf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function yx(t, a, s) {
  const i = t.ops.findIndex((u) => u.mode === a);
  if (i === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, s(u)] };
  }
  const o = [...t.ops];
  return o[i] = s(o[i]), { ...t, ops: o };
}
function oc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function P9(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var K9 = "go9vi12", X9 = "go9vi13", Q9 = "go9vi14", Z9 = "go9vi15", J9 = "go9vi16", W9 = "go9vi17", eB = "go9vi18", tB = "go9vi19", nB = "go9vi1a", aB = "go9vi1b go9vi1a", rB = "go9vi1c", sB = "go9vi1d", iB = "go9vi1e", lB = "go9vi1f", oB = "go9vi1g", cB = "go9vi1h", uB = "go9vi1i", dB = "go9vi1j", bx = "go9vi1k", fB = "go9vi1l", hB = "go9vi1m", mB = "go9vi1n", zc = "go9vi1o", pB = "go9vi1q", gB = "go9vi1r go9vi1q", vB = "go9vi1s go9vi1q", yB = "go9vi1t", bB = "go9vi1u", xB = "go9vi1v", SB = "go9vi1w", uw = "go9vi1x", wB = "go9vi1y", jB = "go9vi1z", EB = "go9vi110 go9vi1o", NB = "go9vi111", CB = "go9vi112", TB = "go9vi113", RB = "go9vi114", _B = "go9vi115", MB = "go9vi116";
function AB() {
  const { deployment: t, mappings: a, voiceAssets: s } = El(), i = ei(), [o, u] = v.useState(a), [f, m] = v.useState(s), [y, p] = v.useState(
    a[0]?.mappingId ?? null
  ), [b, g] = v.useState(""), [w, S] = v.useState(null), [j, N] = v.useState(null), [C, T] = v.useState(null), [M, z] = v.useState(null), [R, H] = v.useState(0), Q = v.useCallback(() => {
    i(`/${t.deploymentId}/recipe`);
  }, [i, t.deploymentId]), ie = v.useCallback((G) => {
    z(G), window.setTimeout(() => {
      z((U) => U === G ? null : U);
    }, 1600);
  }, []), A = v.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const U of f) G.set(U.voiceAssetId, U);
    return G;
  }, [f]), I = v.useMemo(() => {
    const G = b.trim().toLowerCase();
    return G ? o.filter((U) => U.characterName.toLowerCase().includes(G)) : o;
  }, [o, b]), D = v.useMemo(
    () => o.find((G) => G.mappingId === y) ?? null,
    [o, y]
  );
  v.useEffect(() => {
    u(a), m(s), p(a[0]?.mappingId ?? null);
  }, [a, s]), v.useEffect(() => {
    if (!j) return;
    const G = setTimeout(() => N(null), 2600);
    return () => clearTimeout(G);
  }, [j]);
  const q = v.useCallback(async () => {
    const G = await Xs(t.deploymentId);
    m(G.voiceAssets);
  }, [t.deploymentId]), te = v.useCallback(
    (G) => {
      u(
        (U) => U.map((W) => W.mappingId === y ? { ...W, ...G } : W)
      );
    },
    [y]
  ), X = v.useCallback(
    async (G) => {
      if (!D) return;
      const U = D;
      try {
        const W = await ul(t.deploymentId, D.mappingId, G);
        u((de) => de.map((ve) => ve.mappingId === W.mappingId ? W : ve)), Object.prototype.hasOwnProperty.call(G, "characterName") && ie(W.mappingId);
      } catch (W) {
        u(
          (de) => de.map((ve) => ve.mappingId === U.mappingId ? U : ve)
        ), S(gr(W));
      }
    },
    [D, t.deploymentId, ie]
  ), le = v.useCallback(async () => {
    const G = f[0];
    if (!G) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = UB(o), W = await Yh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: G.voiceAssetId
      });
      u((de) => [...de, W]), p(W.mappingId), H((de) => de + 1);
    } catch (U) {
      S(gr(U));
    }
  }, [t.deploymentId, f, o]), re = v.useCallback(() => {
    D && T({ id: D.mappingId, name: D.characterName });
  }, [D]), k = v.useCallback(async () => {
    if (!C) return;
    const { id: G, name: U } = C;
    T(null);
    try {
      await s1(t.deploymentId, G), u((W) => W.filter((de) => de.mappingId !== G)), p(null), N(`Mapping for ${U} deactivated.`);
    } catch (W) {
      S(gr(W));
    }
  }, [t.deploymentId, C]), $ = v.useCallback(
    async (G, U, W) => {
      try {
        const de = await xc(t.deploymentId, G, U, W);
        return m((ve) => [de, ...ve]), N(`${de.displayName} uploaded.`), de;
      } catch (de) {
        return S(gr(de)), null;
      }
    },
    [t.deploymentId]
  ), F = v.useCallback(async () => {
    try {
      const G = await ZC(t.deploymentId);
      qB(G, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (G) {
      S(gr(G));
    }
  }, [t.deploymentId]), Y = v.useCallback(
    async (G, U) => {
      try {
        const W = await JC(
          t.deploymentId,
          G.mappings,
          U
        );
        N(
          `Imported ${W.created.length} • skipped ${W.skipped.length} • replaced ${W.replaced.length}.`
        );
        const de = await Xs(t.deploymentId);
        m(de.voiceAssets);
      } catch (W) {
        S(gr(W));
      }
    },
    [t.deploymentId]
  ), ue = v.useCallback(
    async (G) => {
      if (await q(), D && G.chain_digest)
        try {
          const U = await ul(t.deploymentId, D.mappingId, {
            voiceAssetChainDigest: G.chain_digest
          });
          u(
            (W) => W.map((de) => de.mappingId === U.mappingId ? U : de)
          );
        } catch (U) {
          S(gr(U));
        }
      N("Edit applied.");
    },
    [q, D, t.deploymentId]
  ), _ = v.useCallback((G) => {
    S(G);
  }, []), ne = v.useCallback(
    async (G, U) => {
      if (!D) return null;
      const W = G.trim() || `[${D.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await nT(t.deploymentId, {
          line: W,
          outputFormat: U
        })).runId };
      } catch (de) {
        return S(gr(de)), null;
      }
    },
    [t.deploymentId, D]
  ), J = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: K9, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: X9, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: Q9,
          onClick: Q,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: Z9, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: J9, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: W9, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            J
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Pe, { variant: "primary", size: "sm", onClick: le, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: eB,
          placeholder: "Search characters",
          value: b,
          onChange: (G) => g(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx($B, { onExport: F, onImport: Y, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: tB, children: I.length === 0 ? /* @__PURE__ */ c.jsx(
        Vc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : I.map((G) => {
        const U = A.get(G.speakerVoiceAssetId), W = G.mappingId === y;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: W ? aB : nB,
            onClick: () => p(G.mappingId),
            "aria-pressed": W,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: rB, "aria-hidden": "true", children: BB(G.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: sB, children: [
                /* @__PURE__ */ c.jsx("span", { className: iB, children: G.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: lB, children: U?.displayName ?? "no voice" })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: oB, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(vm, { features: Sm, children: /* @__PURE__ */ c.jsx(LS, { children: j && /* @__PURE__ */ c.jsx(
        xm.div,
        {
          className: wB,
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
        /* @__PURE__ */ c.jsx(Pe, { variant: "danger", size: "sm", onClick: () => void k(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Pe, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      D ? /* @__PURE__ */ c.jsx(
        kB,
        {
          deploymentId: t.deploymentId,
          mapping: D,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (G) => {
            te({ characterName: G });
          },
          onNameSave: (G) => {
            const U = G.trim();
            U && X({ characterName: U });
          },
          savedHint: M === D.mappingId,
          autoFocusNonce: R,
          onSpeakerChange: (G) => {
            te({ speakerVoiceAssetId: G }), X({ speakerVoiceAssetId: G });
          },
          onDelete: re,
          onUploadVoice: async (G, U, W) => {
            const de = await $(G, U, W);
            return de && W === "speaker" && (te({ speakerVoiceAssetId: de.voiceAssetId }), X({ speakerVoiceAssetId: de.voiceAssetId })), await q(), de;
          },
          onTestLine: ne,
          onEditChainPersisted: ue,
          onEditError: _
        },
        D.mappingId
      ) : /* @__PURE__ */ c.jsx(
        DB,
        {
          voiceCount: f.length,
          onUploadVoice: async (G) => {
            await $(G, G.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function DB({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: TB, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: RB, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: _B, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      dw,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (s) => (await a(s), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Va, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Vc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function kB(t) {
  const { mapping: a, voiceAssets: s, allMappings: i } = t, o = s.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = v.useMemo(
    () => i.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [i, a.speakerVoiceAssetId]
  ), [f, m] = v.useState(""), [y, p] = v.useState("mp3"), [b, g] = v.useState("idle"), [w, S] = v.useState(null), j = v.useRef(!1), N = v.useRef(null);
  v.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), v.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const T = N.current;
    T && (T.focus(), T.select());
  }, [t.autoFocusNonce]);
  const C = v.useCallback(async () => {
    j.current = !1, g("running"), S(null);
    const T = await t.onTestLine(f, y);
    if (j.current) return;
    if (!T) {
      g("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: M } = T;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((R) => setTimeout(R, 500)), j.current) return;
      try {
        const R = await Gh(t.deploymentId, M);
        if (j.current) return;
        if (R.status === "completed") {
          g("done");
          return;
        }
        if (R.status === "failed" || R.status === "cancelled") {
          g("error"), S(`Run ${R.status}.`);
          return;
        }
      } catch (R) {
        if (j.current) return;
        g("error"), S(R instanceof Error ? R.message : "unknown error");
        return;
      }
    }
    j.current || (g("error"), S("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, f, y]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: cB, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: uB, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: uw, children: /* @__PURE__ */ c.jsx(Pe, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: jB,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: EB,
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
              className: zc,
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
            Pe,
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
    /* @__PURE__ */ c.jsxs("div", { className: dB, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: mB, children: [
          /* @__PURE__ */ c.jsxs("span", { className: fB, children: [
            /* @__PURE__ */ c.jsx("span", { className: bx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: hB,
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
              className: zc,
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
        /* @__PURE__ */ c.jsx("span", { className: bx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          zB,
          {
            value: a.speakerVoiceAssetId,
            voices: s,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(OB, { voice: o }),
        /* @__PURE__ */ c.jsx(
          dw,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          G9,
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
function zB({
  value: t,
  voices: a,
  onChange: s
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: zc,
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
function OB({ voice: t }) {
  const a = VB(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: yB, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: IB(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: bB, children: [
      /* @__PURE__ */ c.jsx("div", { className: xB, children: /* @__PURE__ */ c.jsx(vm, { features: Sm, children: /* @__PURE__ */ c.jsx(
        xm.div,
        {
          className: SB,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(LB, { seed: t.contentSha256 })
  ] });
}
function LB({ seed: t }) {
  const a = v.useMemo(() => HB(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: NB, "aria-hidden": "true", children: a.map((s, i) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: CB,
      style: { height: `${Math.max(6, s * 100)}%` }
    },
    `${t}-${i}`
  )) });
}
function dw({
  label: t,
  onFile: a
}) {
  const [s, i] = v.useState(!1), [o, u] = v.useState(!1), f = v.useRef(null), m = v.useCallback(
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
      className: o ? vB : s ? gB : pB,
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
function $B({
  onExport: t,
  onImport: a,
  onParseError: s
}) {
  const [i, o] = v.useState("error"), u = v.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: uw, children: [
    /* @__PURE__ */ c.jsx(Pe, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: MB,
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
    /* @__PURE__ */ c.jsx(Pe, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: zc,
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
function UB(t) {
  const a = new Set(t.map((i) => i.characterName.toLowerCase()));
  let s = 1;
  for (; a.has(`character ${s}`); ) s += 1;
  return `Character ${s}`;
}
function BB(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function VB(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function IB(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function HB(t, a) {
  const s = [];
  for (let i = 0; i < a; i += 1) {
    const o = t.charCodeAt(i % t.length);
    s.push((o * 31 + i * 7) % 100 / 100);
  }
  return s;
}
function qB(t, a) {
  const s = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), i = URL.createObjectURL(s), o = document.createElement("a");
  o.href = i, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(i);
}
function gr(t) {
  return t instanceof ti || t instanceof Error ? t.message : "unknown error";
}
function FB() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await XC();
        return { deployments: t };
      },
      Component: kT
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId");
        return aN(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { runs: o }, u] = await Promise.all([
          qy(a),
          Fy(a),
          WC(a, { limit: 10 }),
          iT(a)
        ]);
        return { deployment: s, mappings: i, runs: o, workflow: u };
      },
      Component: b$
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), s = Vs(t, "runId");
        return { run: await Gh(a, s) };
      },
      Component: _U
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vs(t, "deploymentId"), [s, { mappings: i }, { voiceAssets: o }] = await Promise.all([
          qy(a),
          Fy(a),
          Xs(a)
        ]);
        return { deployment: s, mappings: i, voiceAssets: o };
      },
      Component: AB
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
      Component: o9
    },
    {
      path: "/runtime/queue",
      Component: r9
    }
  ];
}
function Vs(t, a) {
  const s = t[a];
  if (!s)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return s;
}
const xx = "ext-actions-request", YB = "ext-actions-declare", GB = "ext-action-state", Sx = "ext-action-invoke", Rh = "emotion-tts:navigate", qs = "emotion-tts.run", wx = "emotion-tts.mappings", PB = 4e3;
function KB(t, a) {
  let s = null, i = !1;
  const o = () => {
    const j = s?.badge ?? "not_installed";
    return XB(j, i);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: wx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(YB, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(GB, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, y = () => f(), p = (j) => {
    const N = j.detail?.id;
    N === qs ? b() : N === wx && t.dispatchEvent(
      new CustomEvent(Rh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = s?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    i = !0, m();
    try {
      N ? await k2() : await D2();
      try {
        s = await Sc();
      } catch {
      }
    } catch {
    } finally {
      i = !1, m();
    }
  };
  t.addEventListener(xx, y), t.addEventListener(Sx, p);
  let g = !1;
  const w = async () => {
    try {
      const j = await Sc();
      if (g) return;
      s = j, m();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), PB);
  return f(), {
    dispose: () => {
      g = !0, window.clearInterval(S), t.removeEventListener(xx, y), t.removeEventListener(Sx, p);
    }
  };
}
function XB(t, a) {
  const s = t === "ready" || t === "running" || t === "starting", i = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qs,
    label: s ? "Stopping…" : "Starting…",
    icon: s ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qs,
    label: h1(t),
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
const _h = "emotion-tts-app", QB = "ext-event", jx = "emotion-tts-stylesheet", Ex = ["accent", "density", "card"];
function ZB(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function JB() {
  if (typeof document > "u" || document.getElementById(jx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = jx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
JB();
class WB extends HTMLElement {
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
    this.root = RE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Rh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = KB(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (s) => {
      const i = s.detail?.path;
      i && this.router && this.router.navigate(i);
    };
    this.navigateListener = a, this.addEventListener(Rh, a);
  }
  syncTweaksFromBody() {
    for (const a of Ex) {
      const s = ZB(a);
      s === void 0 ? delete this.dataset[a] : this.dataset[a] !== s && (this.dataset[a] = s);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: Ex.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), s = uC(FB(), { initialEntries: [a] });
    this.router = s, this.root.render(
      /* @__PURE__ */ c.jsx(v.StrictMode, { children: /* @__PURE__ */ c.jsx(fC, { router: s }) })
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
      new CustomEvent(QB, {
        detail: { topic: a, payload: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function e7() {
  typeof customElements > "u" || customElements.get(_h) || customElements.define(_h, WB);
}
typeof customElements < "u" && !customElements.get(_h) && e7();
export {
  e7 as register
};
//# sourceMappingURL=emotion-tts.js.map
