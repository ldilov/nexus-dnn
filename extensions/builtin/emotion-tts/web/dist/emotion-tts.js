function sE(t, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const o in s)
        if (o !== "default" && !(o in t)) {
          const u = Object.getOwnPropertyDescriptor(s, o);
          u && Object.defineProperty(t, o, u.get ? u : {
            enumerable: !0,
            get: () => s[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function px(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ef = { exports: {} }, Ks = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function lE() {
  if (ny) return Ks;
  ny = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var p in o)
        p !== "key" && (u[p] = o[p]);
    } else u = o;
    return o = u.ref, {
      $$typeof: t,
      type: s,
      key: f,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return Ks.Fragment = a, Ks.jsx = i, Ks.jsxs = i, Ks;
}
var ay;
function oE() {
  return ay || (ay = 1, ef.exports = lE()), ef.exports;
}
var c = oE(), tf = { exports: {} }, Be = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ry;
function cE() {
  if (ry) return Be;
  ry = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
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
  function T(_, te, re) {
    this.props = _, this.context = te, this.refs = C, this.updater = re || j;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(_, te) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, te, "setState");
  }, T.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function A() {
  }
  A.prototype = T.prototype;
  function O(_, te, re) {
    this.props = _, this.context = te, this.refs = C, this.updater = re || j;
  }
  var R = O.prototype = new A();
  R.constructor = O, N(R, T.prototype), R.isPureReactComponent = !0;
  var H = Array.isArray;
  function X() {
  }
  var se = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function q(_, te, re) {
    var F = re.ref;
    return {
      $$typeof: t,
      type: _,
      key: te,
      ref: F !== void 0 ? F : null,
      props: re
    };
  }
  function z(_, te) {
    return q(_.type, te, _.props);
  }
  function Y(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function ee(_) {
    var te = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(re) {
      return te[re];
    });
  }
  var K = /\/+/g;
  function oe(_, te) {
    return typeof _ == "object" && _ !== null && _.key != null ? ee("" + _.key) : te.toString(36);
  }
  function ne(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(X, X) : (_.status = "pending", _.then(
          function(te) {
            _.status === "pending" && (_.status = "fulfilled", _.value = te);
          },
          function(te) {
            _.status === "pending" && (_.status = "rejected", _.reason = te);
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
  function k(_, te, re, F, $) {
    var ae = typeof _;
    (ae === "undefined" || ae === "boolean") && (_ = null);
    var de = !1;
    if (_ === null) de = !0;
    else
      switch (ae) {
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
                te,
                re,
                F,
                $
              );
          }
      }
    if (de)
      return $ = $(_), de = F === "" ? "." + oe(_, 0) : F, H($) ? (re = "", de != null && (re = de.replace(K, "$&/") + "/"), k($, te, re, "", function(Le) {
        return Le;
      })) : $ != null && (Y($) && ($ = z(
        $,
        re + ($.key == null || _ && _.key === $.key ? "" : ("" + $.key).replace(
          K,
          "$&/"
        ) + "/") + de
      )), te.push($)), 1;
    de = 0;
    var pe = F === "" ? "." : F + ":";
    if (H(_))
      for (var Me = 0; Me < _.length; Me++)
        F = _[Me], ae = pe + oe(F, Me), de += k(
          F,
          te,
          re,
          ae,
          $
        );
    else if (Me = S(_), typeof Me == "function")
      for (_ = Me.call(_), Me = 0; !(F = _.next()).done; )
        F = F.value, ae = pe + oe(F, Me++), de += k(
          F,
          te,
          re,
          ae,
          $
        );
    else if (ae === "object") {
      if (typeof _.then == "function")
        return k(
          ne(_),
          te,
          re,
          F,
          $
        );
      throw te = String(_), Error(
        "Objects are not valid as a React child (found: " + (te === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : te) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return de;
  }
  function U(_, te, re) {
    if (_ == null) return _;
    var F = [], $ = 0;
    return k(_, F, "", "", function(ae) {
      return te.call(re, ae, $++);
    }), F;
  }
  function V(_) {
    if (_._status === -1) {
      var te = _._result;
      te = te(), te.then(
        function(re) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = re);
        },
        function(re) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = re);
        }
      ), _._status === -1 && (_._status = 0, _._result = te);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var G = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var te = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(te)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, ce = {
    map: U,
    forEach: function(_, te, re) {
      U(
        _,
        function() {
          te.apply(this, arguments);
        },
        re
      );
    },
    count: function(_) {
      var te = 0;
      return U(_, function() {
        te++;
      }), te;
    },
    toArray: function(_) {
      return U(_, function(te) {
        return te;
      }) || [];
    },
    only: function(_) {
      if (!Y(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return Be.Activity = v, Be.Children = ce, Be.Component = T, Be.Fragment = i, Be.Profiler = o, Be.PureComponent = O, Be.StrictMode = s, Be.Suspense = g, Be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = se, Be.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return se.H.useMemoCache(_);
    }
  }, Be.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, Be.cacheSignal = function() {
    return null;
  }, Be.cloneElement = function(_, te, re) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var F = N({}, _.props), $ = _.key;
    if (te != null)
      for (ae in te.key !== void 0 && ($ = "" + te.key), te)
        !M.call(te, ae) || ae === "key" || ae === "__self" || ae === "__source" || ae === "ref" && te.ref === void 0 || (F[ae] = te[ae]);
    var ae = arguments.length - 2;
    if (ae === 1) F.children = re;
    else if (1 < ae) {
      for (var de = Array(ae), pe = 0; pe < ae; pe++)
        de[pe] = arguments[pe + 2];
      F.children = de;
    }
    return q(_.type, $, F);
  }, Be.createContext = function(_) {
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
  }, Be.createElement = function(_, te, re) {
    var F, $ = {}, ae = null;
    if (te != null)
      for (F in te.key !== void 0 && (ae = "" + te.key), te)
        M.call(te, F) && F !== "key" && F !== "__self" && F !== "__source" && ($[F] = te[F]);
    var de = arguments.length - 2;
    if (de === 1) $.children = re;
    else if (1 < de) {
      for (var pe = Array(de), Me = 0; Me < de; Me++)
        pe[Me] = arguments[Me + 2];
      $.children = pe;
    }
    if (_ && _.defaultProps)
      for (F in de = _.defaultProps, de)
        $[F] === void 0 && ($[F] = de[F]);
    return q(_, ae, $);
  }, Be.createRef = function() {
    return { current: null };
  }, Be.forwardRef = function(_) {
    return { $$typeof: p, render: _ };
  }, Be.isValidElement = Y, Be.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: V
    };
  }, Be.memo = function(_, te) {
    return {
      $$typeof: m,
      type: _,
      compare: te === void 0 ? null : te
    };
  }, Be.startTransition = function(_) {
    var te = se.T, re = {};
    se.T = re;
    try {
      var F = _(), $ = se.S;
      $ !== null && $(re, F), typeof F == "object" && F !== null && typeof F.then == "function" && F.then(X, G);
    } catch (ae) {
      G(ae);
    } finally {
      te !== null && re.types !== null && (te.types = re.types), se.T = te;
    }
  }, Be.unstable_useCacheRefresh = function() {
    return se.H.useCacheRefresh();
  }, Be.use = function(_) {
    return se.H.use(_);
  }, Be.useActionState = function(_, te, re) {
    return se.H.useActionState(_, te, re);
  }, Be.useCallback = function(_, te) {
    return se.H.useCallback(_, te);
  }, Be.useContext = function(_) {
    return se.H.useContext(_);
  }, Be.useDebugValue = function() {
  }, Be.useDeferredValue = function(_, te) {
    return se.H.useDeferredValue(_, te);
  }, Be.useEffect = function(_, te) {
    return se.H.useEffect(_, te);
  }, Be.useEffectEvent = function(_) {
    return se.H.useEffectEvent(_);
  }, Be.useId = function() {
    return se.H.useId();
  }, Be.useImperativeHandle = function(_, te, re) {
    return se.H.useImperativeHandle(_, te, re);
  }, Be.useInsertionEffect = function(_, te) {
    return se.H.useInsertionEffect(_, te);
  }, Be.useLayoutEffect = function(_, te) {
    return se.H.useLayoutEffect(_, te);
  }, Be.useMemo = function(_, te) {
    return se.H.useMemo(_, te);
  }, Be.useOptimistic = function(_, te) {
    return se.H.useOptimistic(_, te);
  }, Be.useReducer = function(_, te, re) {
    return se.H.useReducer(_, te, re);
  }, Be.useRef = function(_) {
    return se.H.useRef(_);
  }, Be.useState = function(_) {
    return se.H.useState(_);
  }, Be.useSyncExternalStore = function(_, te, re) {
    return se.H.useSyncExternalStore(
      _,
      te,
      re
    );
  }, Be.useTransition = function() {
    return se.H.useTransition();
  }, Be.version = "19.2.5", Be;
}
var iy;
function Ch() {
  return iy || (iy = 1, tf.exports = cE()), tf.exports;
}
var y = Ch();
const ye = /* @__PURE__ */ px(y), uE = /* @__PURE__ */ sE({
  __proto__: null,
  default: ye
}, [y]);
var nf = { exports: {} }, Xs = {}, af = { exports: {} }, rf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sy;
function dE() {
  return sy || (sy = 1, (function(t) {
    function a(k, U) {
      var V = k.length;
      k.push(U);
      e: for (; 0 < V; ) {
        var G = V - 1 >>> 1, ce = k[G];
        if (0 < o(ce, U))
          k[G] = U, k[V] = ce, V = G;
        else break e;
      }
    }
    function i(k) {
      return k.length === 0 ? null : k[0];
    }
    function s(k) {
      if (k.length === 0) return null;
      var U = k[0], V = k.pop();
      if (V !== U) {
        k[0] = V;
        e: for (var G = 0, ce = k.length, _ = ce >>> 1; G < _; ) {
          var te = 2 * (G + 1) - 1, re = k[te], F = te + 1, $ = k[F];
          if (0 > o(re, V))
            F < ce && 0 > o($, re) ? (k[G] = $, k[F] = V, G = F) : (k[G] = re, k[te] = V, G = te);
          else if (F < ce && 0 > o($, V))
            k[G] = $, k[F] = V, G = F;
          else break e;
        }
      }
      return U;
    }
    function o(k, U) {
      var V = k.sortIndex - U.sortIndex;
      return V !== 0 ? V : k.id - U.id;
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
    var g = [], m = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, C = !1, T = typeof setTimeout == "function" ? setTimeout : null, A = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function R(k) {
      for (var U = i(m); U !== null; ) {
        if (U.callback === null) s(m);
        else if (U.startTime <= k)
          s(m), U.sortIndex = U.expirationTime, a(g, U);
        else break;
        U = i(m);
      }
    }
    function H(k) {
      if (N = !1, R(k), !j)
        if (i(g) !== null)
          j = !0, X || (X = !0, ee());
        else {
          var U = i(m);
          U !== null && ne(H, U.startTime - k);
        }
    }
    var X = !1, se = -1, M = 5, q = -1;
    function z() {
      return C ? !0 : !(t.unstable_now() - q < M);
    }
    function Y() {
      if (C = !1, X) {
        var k = t.unstable_now();
        q = k;
        var U = !0;
        try {
          e: {
            j = !1, N && (N = !1, A(se), se = -1), S = !0;
            var V = w;
            try {
              t: {
                for (R(k), v = i(g); v !== null && !(v.expirationTime > k && z()); ) {
                  var G = v.callback;
                  if (typeof G == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var ce = G(
                      v.expirationTime <= k
                    );
                    if (k = t.unstable_now(), typeof ce == "function") {
                      v.callback = ce, R(k), U = !0;
                      break t;
                    }
                    v === i(g) && s(g), R(k);
                  } else s(g);
                  v = i(g);
                }
                if (v !== null) U = !0;
                else {
                  var _ = i(m);
                  _ !== null && ne(
                    H,
                    _.startTime - k
                  ), U = !1;
                }
              }
              break e;
            } finally {
              v = null, w = V, S = !1;
            }
            U = void 0;
          }
        } finally {
          U ? ee() : X = !1;
        }
      }
    }
    var ee;
    if (typeof O == "function")
      ee = function() {
        O(Y);
      };
    else if (typeof MessageChannel < "u") {
      var K = new MessageChannel(), oe = K.port2;
      K.port1.onmessage = Y, ee = function() {
        oe.postMessage(null);
      };
    } else
      ee = function() {
        T(Y, 0);
      };
    function ne(k, U) {
      se = T(function() {
        k(t.unstable_now());
      }, U);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(k) {
      k.callback = null;
    }, t.unstable_forceFrameRate = function(k) {
      0 > k || 125 < k ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < k ? Math.floor(1e3 / k) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, t.unstable_next = function(k) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = w;
      }
      var V = w;
      w = U;
      try {
        return k();
      } finally {
        w = V;
      }
    }, t.unstable_requestPaint = function() {
      C = !0;
    }, t.unstable_runWithPriority = function(k, U) {
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
      var V = w;
      w = k;
      try {
        return U();
      } finally {
        w = V;
      }
    }, t.unstable_scheduleCallback = function(k, U, V) {
      var G = t.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? G + V : G) : V = G, k) {
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
      return ce = V + ce, k = {
        id: b++,
        callback: U,
        priorityLevel: k,
        startTime: V,
        expirationTime: ce,
        sortIndex: -1
      }, V > G ? (k.sortIndex = V, a(m, k), i(g) === null && k === i(m) && (N ? (A(se), se = -1) : N = !0, ne(H, V - G))) : (k.sortIndex = ce, a(g, k), j || S || (j = !0, X || (X = !0, ee()))), k;
    }, t.unstable_shouldYield = z, t.unstable_wrapCallback = function(k) {
      var U = w;
      return function() {
        var V = w;
        w = U;
        try {
          return k.apply(this, arguments);
        } finally {
          w = V;
        }
      };
    };
  })(rf)), rf;
}
var ly;
function fE() {
  return ly || (ly = 1, af.exports = dE()), af.exports;
}
var sf = { exports: {} }, sn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oy;
function hE() {
  if (oy) return sn;
  oy = 1;
  var t = Ch();
  function a(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        m += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var s = {
    d: {
      f: i,
      r: function() {
        throw Error(a(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function u(g, m, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: m,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return sn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, sn.createPortal = function(g, m) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(a(299));
    return u(g, m, null, b);
  }, sn.flushSync = function(g) {
    var m = f.T, b = s.p;
    try {
      if (f.T = null, s.p = 2, g) return g();
    } finally {
      f.T = m, s.p = b, s.d.f();
    }
  }, sn.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(g, m));
  }, sn.prefetchDNS = function(g) {
    typeof g == "string" && s.d.D(g);
  }, sn.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin), w = typeof m.integrity == "string" ? m.integrity : void 0, S = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      b === "style" ? s.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && s.d.X(g, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, sn.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var b = p(
            m.as,
            m.crossOrigin
          );
          s.d.M(g, {
            crossOrigin: b,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(g);
  }, sn.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var b = m.as, v = p(b, m.crossOrigin);
      s.d.L(g, b, {
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
  }, sn.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var b = p(m.as, m.crossOrigin);
        s.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: b,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(g);
  }, sn.requestFormReset = function(g) {
    s.d.r(g);
  }, sn.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, sn.useFormState = function(g, m, b) {
    return f.H.useFormState(g, m, b);
  }, sn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, sn.version = "19.2.5", sn;
}
var cy;
function vx() {
  if (cy) return sf.exports;
  cy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), sf.exports = hE(), sf.exports;
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
var uy;
function mE() {
  if (uy) return Xs;
  uy = 1;
  var t = fE(), a = Ch(), i = vx();
  function s(e) {
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
  function g(e) {
    if (u(e) !== e)
      throw Error(s(188));
  }
  function m(e) {
    var n = e.alternate;
    if (!n) {
      if (n = u(e), n === null) throw Error(s(188));
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
          if (h === r) return g(d), e;
          if (h === l) return g(d), n;
          h = h.sibling;
        }
        throw Error(s(188));
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
          if (!x) throw Error(s(189));
        }
      }
      if (r.alternate !== l) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), A = Symbol.for("react.consumer"), O = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), se = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), z = Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = Y && e[Y] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var K = Symbol.for("react.client.reference");
  function oe(e) {
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
      case H:
        return "Suspense";
      case X:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case O:
          return e.displayName || "Context";
        case A:
          return (e._context.displayName || "Context") + ".Consumer";
        case R:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case se:
          return n = e.displayName || null, n !== null ? n : oe(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return oe(e(n));
          } catch {
          }
      }
    return null;
  }
  var ne = Array.isArray, k = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, G = [], ce = -1;
  function _(e) {
    return { current: e };
  }
  function te(e) {
    0 > ce || (e.current = G[ce], G[ce] = null, ce--);
  }
  function re(e, n) {
    ce++, G[ce] = e.current, e.current = n;
  }
  var F = _(null), $ = _(null), ae = _(null), de = _(null);
  function pe(e, n) {
    switch (re(ae, n), re($, e), re(F, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Ng(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Ng(n), e = Tg(n, e);
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
    te(F), re(F, e);
  }
  function Me() {
    te(F), te($), te(ae);
  }
  function Le(e) {
    e.memoizedState !== null && re(de, e);
    var n = F.current, r = Tg(n, e.type);
    n !== r && (re($, e), re(F, r));
  }
  function je(e) {
    $.current === e && (te(F), te($)), de.current === e && (te(de), Fs._currentValue = V);
  }
  var pt, Ue;
  function ut(e) {
    if (pt === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        pt = n && n[1] || "", Ue = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + pt + e + Ue;
  }
  var cn = !1;
  function zn(e, n) {
    if (!e || cn) return "";
    cn = !0;
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
                } catch (le) {
                  var ie = le;
                }
                Reflect.construct(e, [], he);
              } else {
                try {
                  he.call();
                } catch (le) {
                  ie = le;
                }
                e.call(he.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (le) {
                ie = le;
              }
              (he = e()) && typeof he.catch == "function" && he.catch(function() {
              });
            }
          } catch (le) {
            if (le && ie && typeof le.stack == "string")
              return [le.stack, ie.stack];
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
`), W = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < W.length && !W[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === W.length)
          for (l = L.length - 1, d = W.length - 1; 1 <= l && 0 <= d && L[l] !== W[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== W[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== W[d]) {
                  var ue = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      cn = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? ut(r) : "";
  }
  function It(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ut(e.type);
      case 16:
        return ut("Lazy");
      case 13:
        return e.child !== n && n !== null ? ut("Suspense Fallback") : ut("Suspense");
      case 19:
        return ut("SuspenseList");
      case 0:
      case 15:
        return zn(e.type, !1);
      case 11:
        return zn(e.type.render, !1);
      case 1:
        return zn(e.type, !0);
      case 31:
        return ut("Activity");
      default:
        return "";
    }
  }
  function Jn(e) {
    try {
      var n = "", r = null;
      do
        n += It(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Ft = Object.prototype.hasOwnProperty, un = t.unstable_scheduleCallback, Wn = t.unstable_cancelCallback, Ct = t.unstable_shouldYield, nn = t.unstable_requestPaint, Rt = t.unstable_now, Q = t.unstable_getCurrentPriorityLevel, ve = t.unstable_ImmediatePriority, xe = t.unstable_UserBlockingPriority, be = t.unstable_NormalPriority, rt = t.unstable_LowPriority, $e = t.unstable_IdlePriority, Xt = t.log, On = t.unstable_setDisableYieldValue, fn = null, _t = null;
  function wt(e) {
    if (typeof Xt == "function" && On(e), _t && typeof _t.setStrictMode == "function")
      try {
        _t.setStrictMode(fn, e);
      } catch {
      }
  }
  var jt = Math.clz32 ? Math.clz32 : Ln, qa = Math.log, Ia = Math.LN2;
  function Ln(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (qa(e) / Ia | 0) | 0;
  }
  var ya = 256, ea = 262144, oa = 4194304;
  function hn(e) {
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
  function Oe(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = hn(l) : (x &= E, x !== 0 ? d = hn(x) : r || (r = E & ~e, r !== 0 && (d = hn(r))))) : (E = l & ~h, E !== 0 ? d = hn(E) : x !== 0 ? d = hn(x) : r || (r = l & ~e, r !== 0 && (d = hn(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function dt(e, n) {
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
  function Yt() {
    var e = oa;
    return oa <<= 1, (oa & 62914560) === 0 && (oa = 4194304), e;
  }
  function jn(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function it(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Qt(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, W = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ue = 31 - jt(r), he = 1 << ue;
      E[ue] = 0, L[ue] = -1;
      var ie = W[ue];
      if (ie !== null)
        for (W[ue] = null, ue = 0; ue < ie.length; ue++) {
          var le = ie[ue];
          le !== null && (le.lane &= -536870913);
        }
      r &= ~he;
    }
    l !== 0 && ba(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function ba(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - jt(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function an(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - jt(r), d = 1 << l;
      d & n | e[l] & n && (e[l] |= n), r &= ~d;
    }
  }
  function D(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : I(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function I(e) {
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
  function me() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Xg(e.type));
  }
  function ge(e, n) {
    var r = U.p;
    try {
      return U.p = e, n();
    } finally {
      U.p = r;
    }
  }
  var Te = Math.random().toString(36).slice(2), Se = "__reactFiber$" + Te, we = "__reactProps$" + Te, Re = "__reactContainer$" + Te, Ee = "__reactEvents$" + Te, ke = "__reactListeners$" + Te, Ae = "__reactHandles$" + Te, Je = "__reactResources$" + Te, Ie = "__reactMarker$" + Te;
  function ft(e) {
    delete e[Se], delete e[we], delete e[Ee], delete e[ke], delete e[Ae];
  }
  function st(e) {
    var n = e[Se];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Re] || r[Se]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = kg(e); e !== null; ) {
            if (r = e[Se]) return r;
            e = kg(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function xt(e) {
    if (e = e[Se] || e[Re]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Ge(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ot(e) {
    var n = e[Je];
    return n || (n = e[Je] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function vt(e) {
    e[Ie] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ta = {};
  function Pt(e, n) {
    ca(e, n), ca(e + "Capture", n);
  }
  function ca(e, n) {
    for (ta[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ua = {}, Cr = {};
  function ei(e) {
    return Ft.call(Cr, e) ? !0 : Ft.call(ua, e) ? !1 : Tr.test(e) ? Cr[e] = !0 : (ua[e] = !0, !1);
  }
  function Fe(e, n, r) {
    if (ei(n))
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
  function Mt(e, n, r) {
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
  function rn(e, n, r, l) {
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
  function Lt(e) {
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
  function gt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ti(e, n, r) {
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
  function ni(e) {
    if (!e._valueTracker) {
      var n = gt(e) ? "checked" : "value";
      e._valueTracker = ti(
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
    return e && (l = gt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Ml(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ew = /[\n"\\]/g;
  function Un(e) {
    return e.replace(
      ew,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Kc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Lt(n)) : e.value !== "" + Lt(n) && (e.value = "" + Lt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Xc(e, x, Lt(n)) : r != null ? Xc(e, x, Lt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + Lt(E) : e.removeAttribute("name");
  }
  function bm(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        ni(e);
        return;
      }
      r = r != null ? "" + Lt(r) : "", n = n != null ? "" + Lt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ni(e);
  }
  function Xc(e, n, r) {
    n === "number" && Ml(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ai(e, n, r, l) {
    if (e = e.options, n) {
      n = {};
      for (var d = 0; d < r.length; d++)
        n["$" + r[d]] = !0;
      for (r = 0; r < e.length; r++)
        d = n.hasOwnProperty("$" + e[r].value), e[r].selected !== d && (e[r].selected = d), d && l && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Lt(r), n = null, d = 0; d < e.length; d++) {
        if (e[d].value === r) {
          e[d].selected = !0, l && (e[d].defaultSelected = !0);
          return;
        }
        n !== null || e[d].disabled || (n = e[d]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function xm(e, n, r) {
    if (n != null && (n = "" + Lt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Lt(r) : "";
  }
  function Sm(e, n, r, l) {
    if (n == null) {
      if (l != null) {
        if (r != null) throw Error(s(92));
        if (ne(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), n = r;
    }
    r = Lt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ni(e);
  }
  function ri(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var tw = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function wm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || tw.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function jm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && wm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && wm(e, h, n[h]);
  }
  function Qc(e) {
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
  var nw = /* @__PURE__ */ new Map([
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
  ]), aw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Al(e) {
    return aw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function xa() {
  }
  var Zc = null;
  function Jc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ii = null, si = null;
  function Em(e) {
    var n = xt(e);
    if (n && (e = n.stateNode)) {
      var r = e[we] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Kc(
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
              'input[name="' + Un(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var l = r[n];
              if (l !== e && l.form === e.form) {
                var d = l[we] || null;
                if (!d) throw Error(s(90));
                Kc(
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
          xm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ai(e, !!r.multiple, n, !1);
      }
    }
  }
  var Wc = !1;
  function Nm(e, n, r) {
    if (Wc) return e(n, r);
    Wc = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (Wc = !1, (ii !== null || si !== null) && (bo(), ii && (n = ii, e = si, si = ii = null, Em(n), e)))
        for (n = 0; n < e.length; n++) Em(e[n]);
    }
  }
  function ls(e, n) {
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
        s(231, n, typeof r)
      );
    return r;
  }
  var Sa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), eu = !1;
  if (Sa)
    try {
      var os = {};
      Object.defineProperty(os, "passive", {
        get: function() {
          eu = !0;
        }
      }), window.addEventListener("test", os, os), window.removeEventListener("test", os, os);
    } catch {
      eu = !1;
    }
  var Ya = null, tu = null, Dl = null;
  function Tm() {
    if (Dl) return Dl;
    var e, n = tu, r = n.length, l, d = "value" in Ya ? Ya.value : Ya.textContent, h = d.length;
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
  function Cm() {
    return !1;
  }
  function mn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? zl : Cm, this.isPropagationStopped = Cm, this;
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
  }, Ol = mn(Rr), cs = v({}, Rr, { view: 0, detail: 0 }), rw = mn(cs), nu, au, us, Ll = v({}, cs, {
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
      return "movementX" in e ? e.movementX : (e !== us && (us && e.type === "mousemove" ? (nu = e.screenX - us.screenX, au = e.screenY - us.screenY) : au = nu = 0, us = e), nu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : au;
    }
  }), Rm = mn(Ll), iw = v({}, Ll, { dataTransfer: 0 }), sw = mn(iw), lw = v({}, cs, { relatedTarget: 0 }), ru = mn(lw), ow = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cw = mn(ow), uw = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), dw = mn(uw), fw = v({}, Rr, { data: 0 }), _m = mn(fw), hw = {
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
  }, mw = {
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
  }, pw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = pw[e]) ? !!n[e] : !1;
  }
  function iu() {
    return vw;
  }
  var gw = v({}, cs, {
    key: function(e) {
      if (e.key) {
        var n = hw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mw[e.keyCode] || "Unidentified" : "";
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
  }), yw = mn(gw), bw = v({}, Ll, {
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
  }), Mm = mn(bw), xw = v({}, cs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: iu
  }), Sw = mn(xw), ww = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jw = mn(ww), Ew = v({}, Ll, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Nw = mn(Ew), Tw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Cw = mn(Tw), Rw = [9, 13, 27, 32], su = Sa && "CompositionEvent" in window, ds = null;
  Sa && "documentMode" in document && (ds = document.documentMode);
  var _w = Sa && "TextEvent" in window && !ds, Am = Sa && (!su || ds && 8 < ds && 11 >= ds), Dm = " ", km = !1;
  function zm(e, n) {
    switch (e) {
      case "keyup":
        return Rw.indexOf(n.keyCode) !== -1;
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
  function Om(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var li = !1;
  function Mw(e, n) {
    switch (e) {
      case "compositionend":
        return Om(n);
      case "keypress":
        return n.which !== 32 ? null : (km = !0, Dm);
      case "textInput":
        return e = n.data, e === Dm && km ? null : e;
      default:
        return null;
    }
  }
  function Aw(e, n) {
    if (li)
      return e === "compositionend" || !su && zm(e, n) ? (e = Tm(), Dl = tu = Ya = null, li = !1, e) : null;
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
        return Am && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Dw = {
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
  function Lm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Dw[e.type] : n === "textarea";
  }
  function Um(e, n, r, l) {
    ii ? si ? si.push(l) : si = [l] : ii = l, n = To(n, "onChange"), 0 < n.length && (r = new Ol(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var fs = null, hs = null;
  function kw(e) {
    bg(e, 0);
  }
  function Ul(e) {
    var n = Ge(e);
    if (_l(n)) return e;
  }
  function $m(e, n) {
    if (e === "change") return n;
  }
  var Bm = !1;
  if (Sa) {
    var lu;
    if (Sa) {
      var ou = "oninput" in document;
      if (!ou) {
        var Vm = document.createElement("div");
        Vm.setAttribute("oninput", "return;"), ou = typeof Vm.oninput == "function";
      }
      lu = ou;
    } else lu = !1;
    Bm = lu && (!document.documentMode || 9 < document.documentMode);
  }
  function Hm() {
    fs && (fs.detachEvent("onpropertychange", qm), hs = fs = null);
  }
  function qm(e) {
    if (e.propertyName === "value" && Ul(hs)) {
      var n = [];
      Um(
        n,
        hs,
        e,
        Jc(e)
      ), Nm(kw, n);
    }
  }
  function zw(e, n, r) {
    e === "focusin" ? (Hm(), fs = n, hs = r, fs.attachEvent("onpropertychange", qm)) : e === "focusout" && Hm();
  }
  function Ow(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ul(hs);
  }
  function Lw(e, n) {
    if (e === "click") return Ul(n);
  }
  function Uw(e, n) {
    if (e === "input" || e === "change")
      return Ul(n);
  }
  function $w(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var En = typeof Object.is == "function" ? Object.is : $w;
  function ms(e, n) {
    if (En(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!Ft.call(n, d) || !En(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function Im(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Fm(e, n) {
    var r = Im(e);
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
      r = Im(r);
    }
  }
  function Ym(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Ym(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Gm(e) {
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
  function cu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Bw = Sa && "documentMode" in document && 11 >= document.documentMode, oi = null, uu = null, ps = null, du = !1;
  function Pm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    du || oi == null || oi !== Ml(l) || (l = oi, "selectionStart" in l && cu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ps && ms(ps, l) || (ps = l, l = To(uu, "onSelect"), 0 < l.length && (n = new Ol(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: l }), n.target = oi)));
  }
  function _r(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ci = {
    animationend: _r("Animation", "AnimationEnd"),
    animationiteration: _r("Animation", "AnimationIteration"),
    animationstart: _r("Animation", "AnimationStart"),
    transitionrun: _r("Transition", "TransitionRun"),
    transitionstart: _r("Transition", "TransitionStart"),
    transitioncancel: _r("Transition", "TransitionCancel"),
    transitionend: _r("Transition", "TransitionEnd")
  }, fu = {}, Km = {};
  Sa && (Km = document.createElement("div").style, "AnimationEvent" in window || (delete ci.animationend.animation, delete ci.animationiteration.animation, delete ci.animationstart.animation), "TransitionEvent" in window || delete ci.transitionend.transition);
  function Mr(e) {
    if (fu[e]) return fu[e];
    if (!ci[e]) return e;
    var n = ci[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Km)
        return fu[e] = n[r];
    return e;
  }
  var Xm = Mr("animationend"), Qm = Mr("animationiteration"), Zm = Mr("animationstart"), Vw = Mr("transitionrun"), Hw = Mr("transitionstart"), qw = Mr("transitioncancel"), Jm = Mr("transitionend"), Wm = /* @__PURE__ */ new Map(), hu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hu.push("scrollEnd");
  function na(e, n) {
    Wm.set(e, n), Pt(n, [e]);
  }
  var $l = typeof reportError == "function" ? reportError : function(e) {
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
  }, $n = [], ui = 0, mu = 0;
  function Bl() {
    for (var e = ui, n = mu = ui = 0; n < e; ) {
      var r = $n[n];
      $n[n++] = null;
      var l = $n[n];
      $n[n++] = null;
      var d = $n[n];
      $n[n++] = null;
      var h = $n[n];
      if ($n[n++] = null, l !== null && d !== null) {
        var x = l.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), l.pending = d;
      }
      h !== 0 && ep(r, d, h);
    }
  }
  function Vl(e, n, r, l) {
    $n[ui++] = e, $n[ui++] = n, $n[ui++] = r, $n[ui++] = l, mu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function pu(e, n, r, l) {
    return Vl(e, n, r, l), Hl(e);
  }
  function Ar(e, n) {
    return Vl(e, null, null, n), Hl(e);
  }
  function ep(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - jt(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Hl(e) {
    if (50 < Us)
      throw Us = 0, Ed = null, Error(s(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var di = {};
  function Iw(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Nn(e, n, r, l) {
    return new Iw(e, n, r, l);
  }
  function vu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function wa(e, n) {
    var r = e.alternate;
    return r === null ? (r = Nn(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function tp(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function ql(e, n, r, l, d, h) {
    var x = 0;
    if (l = e, typeof e == "function") vu(e) && (x = 1);
    else if (typeof e == "string")
      x = Kj(
        e,
        r,
        F.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = Nn(31, r, n, d), e.elementType = q, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
        case C:
          x = 8, d |= 24;
          break;
        case T:
          return e = Nn(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case H:
          return e = Nn(13, r, n, d), e.elementType = H, e.lanes = h, e;
        case X:
          return e = Nn(19, r, n, d), e.elementType = X, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case O:
                x = 10;
                break e;
              case A:
                x = 9;
                break e;
              case R:
                x = 11;
                break e;
              case se:
                x = 14;
                break e;
              case M:
                x = 16, l = null;
                break e;
            }
          x = 29, r = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return n = Nn(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
    return e = Nn(7, e, l, n), e.lanes = r, e;
  }
  function gu(e, n, r) {
    return e = Nn(6, e, null, n), e.lanes = r, e;
  }
  function np(e) {
    var n = Nn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function yu(e, n, r) {
    return n = Nn(
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
  var ap = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = ap.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Jn(n)
      }, ap.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Jn(n)
    };
  }
  var fi = [], hi = 0, Il = null, vs = 0, Vn = [], Hn = 0, Ga = null, da = 1, fa = "";
  function ja(e, n) {
    fi[hi++] = vs, fi[hi++] = Il, Il = e, vs = n;
  }
  function rp(e, n, r) {
    Vn[Hn++] = da, Vn[Hn++] = fa, Vn[Hn++] = Ga, Ga = e;
    var l = da;
    e = fa;
    var d = 32 - jt(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - jt(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, da = 1 << 32 - jt(n) + d | r << d | l, fa = h + e;
    } else
      da = 1 << h | r << d | l, fa = e;
  }
  function bu(e) {
    e.return !== null && (ja(e, 1), rp(e, 1, 0));
  }
  function xu(e) {
    for (; e === Il; )
      Il = fi[--hi], fi[hi] = null, vs = fi[--hi], fi[hi] = null;
    for (; e === Ga; )
      Ga = Vn[--Hn], Vn[Hn] = null, fa = Vn[--Hn], Vn[Hn] = null, da = Vn[--Hn], Vn[Hn] = null;
  }
  function ip(e, n) {
    Vn[Hn++] = da, Vn[Hn++] = fa, Vn[Hn++] = Ga, da = n.id, fa = n.overflow, Ga = e;
  }
  var Zt = null, yt = null, Ze = !1, Pa = null, qn = !1, Su = Error(s(519));
  function Ka(e) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw gs(Bn(n, e)), Su;
  }
  function sp(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[Se] = e, n[we] = l, r) {
      case "dialog":
        Ke("cancel", n), Ke("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ke("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Bs.length; r++)
          Ke(Bs[r], n);
        break;
      case "source":
        Ke("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ke("error", n), Ke("load", n);
        break;
      case "details":
        Ke("toggle", n);
        break;
      case "input":
        Ke("invalid", n), bm(
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
        Ke("invalid", n);
        break;
      case "textarea":
        Ke("invalid", n), Sm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || jg(n.textContent, r) ? (l.popover != null && (Ke("beforetoggle", n), Ke("toggle", n)), l.onScroll != null && Ke("scroll", n), l.onScrollEnd != null && Ke("scrollend", n), l.onClick != null && (n.onclick = xa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function lp(e) {
    for (Zt = e.return; Zt; )
      switch (Zt.tag) {
        case 5:
        case 31:
        case 13:
          qn = !1;
          return;
        case 27:
        case 3:
          qn = !0;
          return;
        default:
          Zt = Zt.return;
      }
  }
  function mi(e) {
    if (e !== Zt) return !1;
    if (!Ze) return lp(e), Ze = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Bd(e.type, e.memoizedProps)), r = !r), r && yt && Ka(e), lp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      yt = Dg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      yt = Dg(e);
    } else
      n === 27 ? (n = yt, or(e.type) ? (e = Fd, Fd = null, yt = e) : yt = n) : yt = Zt ? Fn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    yt = Zt = null, Ze = !1;
  }
  function wu() {
    var e = Pa;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Pa = null), e;
  }
  function gs(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var ju = _(null), zr = null, Ea = null;
  function Xa(e, n, r) {
    re(ju, n._currentValue), n._currentValue = r;
  }
  function Na(e) {
    e._currentValue = ju.current, te(ju);
  }
  function Eu(e, n, r) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Nu(e, n, r, l) {
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
              h.lanes |= r, E = h.alternate, E !== null && (E.lanes |= r), Eu(
                h.return,
                r,
                e
              ), l || (x = null);
              break e;
            }
          h = E.next;
        }
      } else if (d.tag === 18) {
        if (x = d.return, x === null) throw Error(s(341));
        x.lanes |= r, h = x.alternate, h !== null && (h.lanes |= r), Eu(x, r, e), x = null;
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
  function pi(e, n, r, l) {
    e = null;
    for (var d = n, h = !1; d !== null; ) {
      if (!h) {
        if ((d.flags & 524288) !== 0) h = !0;
        else if ((d.flags & 262144) !== 0) break;
      }
      if (d.tag === 10) {
        var x = d.alternate;
        if (x === null) throw Error(s(387));
        if (x = x.memoizedProps, x !== null) {
          var E = d.type;
          En(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === de.current) {
        if (x = d.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== d.memoizedState.memoizedState && (e !== null ? e.push(Fs) : e = [Fs]);
      }
      d = d.return;
    }
    e !== null && Nu(
      n,
      e,
      r,
      l
    ), n.flags |= 262144;
  }
  function Fl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!En(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Or(e) {
    zr = e, Ea = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Jt(e) {
    return op(zr, e);
  }
  function Yl(e, n) {
    return zr === null && Or(e), op(e, n);
  }
  function op(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ea === null) {
      if (e === null) throw Error(s(308));
      Ea = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ea = Ea.next = n;
    return r;
  }
  var Fw = typeof AbortController < "u" ? AbortController : function() {
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
  }, Yw = t.unstable_scheduleCallback, Gw = t.unstable_NormalPriority, Ut = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tu() {
    return {
      controller: new Fw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ys(e) {
    e.refCount--, e.refCount === 0 && Yw(Gw, function() {
      e.controller.abort();
    });
  }
  var bs = null, Cu = 0, vi = 0, gi = null;
  function Pw(e, n) {
    if (bs === null) {
      var r = bs = [];
      Cu = 0, vi = Md(), gi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Cu++, n.then(cp, cp), n;
  }
  function cp() {
    if (--Cu === 0 && bs !== null) {
      gi !== null && (gi.status = "fulfilled");
      var e = bs;
      bs = null, vi = 0, gi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Kw(e, n) {
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
  var up = k.S;
  k.S = function(e, n) {
    Pv = Rt(), typeof n == "object" && n !== null && typeof n.then == "function" && Pw(e, n), up !== null && up(e, n);
  };
  var Lr = _(null);
  function Ru() {
    var e = Lr.current;
    return e !== null ? e : ht.pooledCache;
  }
  function Gl(e, n) {
    n === null ? re(Lr, Lr.current) : re(Lr, n.pool);
  }
  function dp() {
    var e = Ru();
    return e === null ? null : { parent: Ut._currentValue, pool: e };
  }
  var yi = Error(s(460)), _u = Error(s(474)), Pl = Error(s(542)), Kl = { then: function() {
  } };
  function fp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function hp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(xa, xa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, pp(e), e;
      default:
        if (typeof n.status == "string") n.then(xa, xa);
        else {
          if (e = ht, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
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
            throw e = n.reason, pp(e), e;
        }
        throw $r = n, yi;
    }
  }
  function Ur(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? ($r = r, yi) : r;
    }
  }
  var $r = null;
  function mp() {
    if ($r === null) throw Error(s(459));
    var e = $r;
    return $r = null, e;
  }
  function pp(e) {
    if (e === yi || e === Pl)
      throw Error(s(483));
  }
  var bi = null, xs = 0;
  function Xl(e) {
    var n = xs;
    return xs += 1, bi === null && (bi = []), hp(bi, e, n);
  }
  function Ss(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Ql(e, n) {
    throw n.$$typeof === w ? Error(s(525)) : (e = Object.prototype.toString.call(n), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function vp(e) {
    function n(P, B) {
      if (e) {
        var J = P.deletions;
        J === null ? (P.deletions = [B], P.flags |= 16) : J.push(B);
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
      return P = wa(P, B), P.index = 0, P.sibling = null, P;
    }
    function h(P, B, J) {
      return P.index = J, e ? (J = P.alternate, J !== null ? (J = J.index, J < B ? (P.flags |= 67108866, B) : J) : (P.flags |= 67108866, B)) : (P.flags |= 1048576, B);
    }
    function x(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function E(P, B, J, fe) {
      return B === null || B.tag !== 6 ? (B = gu(J, P.mode, fe), B.return = P, B) : (B = d(B, J), B.return = P, B);
    }
    function L(P, B, J, fe) {
      var De = J.type;
      return De === N ? ue(
        P,
        B,
        J.props.children,
        fe,
        J.key
      ) : B !== null && (B.elementType === De || typeof De == "object" && De !== null && De.$$typeof === M && Ur(De) === B.type) ? (B = d(B, J.props), Ss(B, J), B.return = P, B) : (B = ql(
        J.type,
        J.key,
        J.props,
        null,
        P.mode,
        fe
      ), Ss(B, J), B.return = P, B);
    }
    function W(P, B, J, fe) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== J.containerInfo || B.stateNode.implementation !== J.implementation ? (B = yu(J, P.mode, fe), B.return = P, B) : (B = d(B, J.children || []), B.return = P, B);
    }
    function ue(P, B, J, fe, De) {
      return B === null || B.tag !== 7 ? (B = Dr(
        J,
        P.mode,
        fe,
        De
      ), B.return = P, B) : (B = d(B, J), B.return = P, B);
    }
    function he(P, B, J) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = gu(
          "" + B,
          P.mode,
          J
        ), B.return = P, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return J = ql(
              B.type,
              B.key,
              B.props,
              null,
              P.mode,
              J
            ), Ss(J, B), J.return = P, J;
          case j:
            return B = yu(
              B,
              P.mode,
              J
            ), B.return = P, B;
          case M:
            return B = Ur(B), he(P, B, J);
        }
        if (ne(B) || ee(B))
          return B = Dr(
            B,
            P.mode,
            J,
            null
          ), B.return = P, B;
        if (typeof B.then == "function")
          return he(P, Xl(B), J);
        if (B.$$typeof === O)
          return he(
            P,
            Yl(P, B),
            J
          );
        Ql(P, B);
      }
      return null;
    }
    function ie(P, B, J, fe) {
      var De = B !== null ? B.key : null;
      if (typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint")
        return De !== null ? null : E(P, B, "" + J, fe);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case S:
            return J.key === De ? L(P, B, J, fe) : null;
          case j:
            return J.key === De ? W(P, B, J, fe) : null;
          case M:
            return J = Ur(J), ie(P, B, J, fe);
        }
        if (ne(J) || ee(J))
          return De !== null ? null : ue(P, B, J, fe, null);
        if (typeof J.then == "function")
          return ie(
            P,
            B,
            Xl(J),
            fe
          );
        if (J.$$typeof === O)
          return ie(
            P,
            B,
            Yl(P, J),
            fe
          );
        Ql(P, J);
      }
      return null;
    }
    function le(P, B, J, fe, De) {
      if (typeof fe == "string" && fe !== "" || typeof fe == "number" || typeof fe == "bigint")
        return P = P.get(J) || null, E(B, P, "" + fe, De);
      if (typeof fe == "object" && fe !== null) {
        switch (fe.$$typeof) {
          case S:
            return P = P.get(
              fe.key === null ? J : fe.key
            ) || null, L(B, P, fe, De);
          case j:
            return P = P.get(
              fe.key === null ? J : fe.key
            ) || null, W(B, P, fe, De);
          case M:
            return fe = Ur(fe), le(
              P,
              B,
              J,
              fe,
              De
            );
        }
        if (ne(fe) || ee(fe))
          return P = P.get(J) || null, ue(B, P, fe, De, null);
        if (typeof fe.then == "function")
          return le(
            P,
            B,
            J,
            Xl(fe),
            De
          );
        if (fe.$$typeof === O)
          return le(
            P,
            B,
            J,
            Yl(B, fe),
            De
          );
        Ql(B, fe);
      }
      return null;
    }
    function Ne(P, B, J, fe) {
      for (var De = null, We = null, _e = B, He = B = 0, Qe = null; _e !== null && He < J.length; He++) {
        _e.index > He ? (Qe = _e, _e = null) : Qe = _e.sibling;
        var et = ie(
          P,
          _e,
          J[He],
          fe
        );
        if (et === null) {
          _e === null && (_e = Qe);
          break;
        }
        e && _e && et.alternate === null && n(P, _e), B = h(et, B, He), We === null ? De = et : We.sibling = et, We = et, _e = Qe;
      }
      if (He === J.length)
        return r(P, _e), Ze && ja(P, He), De;
      if (_e === null) {
        for (; He < J.length; He++)
          _e = he(P, J[He], fe), _e !== null && (B = h(
            _e,
            B,
            He
          ), We === null ? De = _e : We.sibling = _e, We = _e);
        return Ze && ja(P, He), De;
      }
      for (_e = l(_e); He < J.length; He++)
        Qe = le(
          _e,
          P,
          He,
          J[He],
          fe
        ), Qe !== null && (e && Qe.alternate !== null && _e.delete(
          Qe.key === null ? He : Qe.key
        ), B = h(
          Qe,
          B,
          He
        ), We === null ? De = Qe : We.sibling = Qe, We = Qe);
      return e && _e.forEach(function(hr) {
        return n(P, hr);
      }), Ze && ja(P, He), De;
    }
    function ze(P, B, J, fe) {
      if (J == null) throw Error(s(151));
      for (var De = null, We = null, _e = B, He = B = 0, Qe = null, et = J.next(); _e !== null && !et.done; He++, et = J.next()) {
        _e.index > He ? (Qe = _e, _e = null) : Qe = _e.sibling;
        var hr = ie(P, _e, et.value, fe);
        if (hr === null) {
          _e === null && (_e = Qe);
          break;
        }
        e && _e && hr.alternate === null && n(P, _e), B = h(hr, B, He), We === null ? De = hr : We.sibling = hr, We = hr, _e = Qe;
      }
      if (et.done)
        return r(P, _e), Ze && ja(P, He), De;
      if (_e === null) {
        for (; !et.done; He++, et = J.next())
          et = he(P, et.value, fe), et !== null && (B = h(et, B, He), We === null ? De = et : We.sibling = et, We = et);
        return Ze && ja(P, He), De;
      }
      for (_e = l(_e); !et.done; He++, et = J.next())
        et = le(_e, P, He, et.value, fe), et !== null && (e && et.alternate !== null && _e.delete(et.key === null ? He : et.key), B = h(et, B, He), We === null ? De = et : We.sibling = et, We = et);
      return e && _e.forEach(function(iE) {
        return n(P, iE);
      }), Ze && ja(P, He), De;
    }
    function ct(P, B, J, fe) {
      if (typeof J == "object" && J !== null && J.type === N && J.key === null && (J = J.props.children), typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case S:
            e: {
              for (var De = J.key; B !== null; ) {
                if (B.key === De) {
                  if (De = J.type, De === N) {
                    if (B.tag === 7) {
                      r(
                        P,
                        B.sibling
                      ), fe = d(
                        B,
                        J.props.children
                      ), fe.return = P, P = fe;
                      break e;
                    }
                  } else if (B.elementType === De || typeof De == "object" && De !== null && De.$$typeof === M && Ur(De) === B.type) {
                    r(
                      P,
                      B.sibling
                    ), fe = d(B, J.props), Ss(fe, J), fe.return = P, P = fe;
                    break e;
                  }
                  r(P, B);
                  break;
                } else n(P, B);
                B = B.sibling;
              }
              J.type === N ? (fe = Dr(
                J.props.children,
                P.mode,
                fe,
                J.key
              ), fe.return = P, P = fe) : (fe = ql(
                J.type,
                J.key,
                J.props,
                null,
                P.mode,
                fe
              ), Ss(fe, J), fe.return = P, P = fe);
            }
            return x(P);
          case j:
            e: {
              for (De = J.key; B !== null; ) {
                if (B.key === De)
                  if (B.tag === 4 && B.stateNode.containerInfo === J.containerInfo && B.stateNode.implementation === J.implementation) {
                    r(
                      P,
                      B.sibling
                    ), fe = d(B, J.children || []), fe.return = P, P = fe;
                    break e;
                  } else {
                    r(P, B);
                    break;
                  }
                else n(P, B);
                B = B.sibling;
              }
              fe = yu(J, P.mode, fe), fe.return = P, P = fe;
            }
            return x(P);
          case M:
            return J = Ur(J), ct(
              P,
              B,
              J,
              fe
            );
        }
        if (ne(J))
          return Ne(
            P,
            B,
            J,
            fe
          );
        if (ee(J)) {
          if (De = ee(J), typeof De != "function") throw Error(s(150));
          return J = De.call(J), ze(
            P,
            B,
            J,
            fe
          );
        }
        if (typeof J.then == "function")
          return ct(
            P,
            B,
            Xl(J),
            fe
          );
        if (J.$$typeof === O)
          return ct(
            P,
            B,
            Yl(P, J),
            fe
          );
        Ql(P, J);
      }
      return typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint" ? (J = "" + J, B !== null && B.tag === 6 ? (r(P, B.sibling), fe = d(B, J), fe.return = P, P = fe) : (r(P, B), fe = gu(J, P.mode, fe), fe.return = P, P = fe), x(P)) : r(P, B);
    }
    return function(P, B, J, fe) {
      try {
        xs = 0;
        var De = ct(
          P,
          B,
          J,
          fe
        );
        return bi = null, De;
      } catch (_e) {
        if (_e === yi || _e === Pl) throw _e;
        var We = Nn(29, _e, null, P.mode);
        return We.lanes = fe, We.return = P, We;
      } finally {
      }
    };
  }
  var Br = vp(!0), gp = vp(!1), Qa = !1;
  function Mu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Au(e, n) {
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
    if (l = l.shared, (tt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Hl(e), ep(e, null, r), n;
    }
    return Vl(e, l, n, r), Hl(e);
  }
  function ws(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, an(e, r);
    }
  }
  function Du(e, n) {
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
  var ku = !1;
  function js() {
    if (ku) {
      var e = gi;
      if (e !== null) throw e;
    }
  }
  function Es(e, n, r, l) {
    ku = !1;
    var d = e.updateQueue;
    Qa = !1;
    var h = d.firstBaseUpdate, x = d.lastBaseUpdate, E = d.shared.pending;
    if (E !== null) {
      d.shared.pending = null;
      var L = E, W = L.next;
      L.next = null, x === null ? h = W : x.next = W, x = L;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== x && (E === null ? ue.firstBaseUpdate = W : E.next = W, ue.lastBaseUpdate = L));
    }
    if (h !== null) {
      var he = d.baseState;
      x = 0, ue = W = L = null, E = h;
      do {
        var ie = E.lane & -536870913, le = ie !== E.lane;
        if (le ? (Xe & ie) === ie : (l & ie) === ie) {
          ie !== 0 && ie === vi && (ku = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ne = e, ze = E;
            ie = n;
            var ct = r;
            switch (ze.tag) {
              case 1:
                if (Ne = ze.payload, typeof Ne == "function") {
                  he = Ne.call(ct, he, ie);
                  break e;
                }
                he = Ne;
                break e;
              case 3:
                Ne.flags = Ne.flags & -65537 | 128;
              case 0:
                if (Ne = ze.payload, ie = typeof Ne == "function" ? Ne.call(ct, he, ie) : Ne, ie == null) break e;
                he = v({}, he, ie);
                break e;
              case 2:
                Qa = !0;
            }
          }
          ie = E.callback, ie !== null && (e.flags |= 64, le && (e.flags |= 8192), le = d.callbacks, le === null ? d.callbacks = [ie] : le.push(ie));
        } else
          le = {
            lane: ie,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ue === null ? (W = ue = le, L = he) : ue = ue.next = le, x |= ie;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          le = E, E = le.next, le.next = null, d.lastBaseUpdate = le, d.shared.pending = null;
        }
      } while (!0);
      ue === null && (L = he), d.baseState = L, d.firstBaseUpdate = W, d.lastBaseUpdate = ue, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = he;
    }
  }
  function yp(e, n) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(n);
  }
  function bp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        yp(r[e], n);
  }
  var xi = _(null), Zl = _(0);
  function xp(e, n) {
    e = za, re(Zl, e), re(xi, n), za = e | n.baseLanes;
  }
  function zu() {
    re(Zl, za), re(xi, xi.current);
  }
  function Ou() {
    za = Zl.current, te(xi), te(Zl);
  }
  var Tn = _(null), In = null;
  function Wa(e) {
    var n = e.alternate;
    re(At, At.current & 1), re(Tn, e), In === null && (n === null || xi.current !== null || n.memoizedState !== null) && (In = e);
  }
  function Lu(e) {
    re(At, At.current), re(Tn, e), In === null && (In = e);
  }
  function Sp(e) {
    e.tag === 22 ? (re(At, At.current), re(Tn, e), In === null && (In = e)) : er();
  }
  function er() {
    re(At, At.current), re(Tn, Tn.current);
  }
  function Cn(e) {
    te(Tn), In === e && (In = null), te(At);
  }
  var At = _(0);
  function Jl(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || qd(r) || Id(r)))
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
  var Ta = 0, Ve = null, lt = null, $t = null, Wl = !1, Si = !1, Vr = !1, eo = 0, Ns = 0, wi = null, Xw = 0;
  function Nt() {
    throw Error(s(321));
  }
  function Uu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!En(e[r], n[r])) return !1;
    return !0;
  }
  function $u(e, n, r, l, d, h) {
    return Ta = h, Ve = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, k.H = e === null || e.memoizedState === null ? rv : Wu, Vr = !1, h = r(l, d), Vr = !1, Si && (h = jp(
      n,
      r,
      l,
      d
    )), wp(e), h;
  }
  function wp(e) {
    k.H = Rs;
    var n = lt !== null && lt.next !== null;
    if (Ta = 0, $t = lt = Ve = null, Wl = !1, Ns = 0, wi = null, n) throw Error(s(300));
    e === null || Bt || (e = e.dependencies, e !== null && Fl(e) && (Bt = !0));
  }
  function jp(e, n, r, l) {
    Ve = e;
    var d = 0;
    do {
      if (Si && (wi = null), Ns = 0, Si = !1, 25 <= d) throw Error(s(301));
      if (d += 1, $t = lt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      k.H = iv, h = n(r, l);
    } while (Si);
    return h;
  }
  function Qw() {
    var e = k.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ts(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ve.flags |= 1024), n;
  }
  function Bu() {
    var e = eo !== 0;
    return eo = 0, e;
  }
  function Vu(e, n, r) {
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
    Ta = 0, $t = lt = Ve = null, Si = !1, Ns = eo = 0, wi = null;
  }
  function dn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? Ve.memoizedState = $t = e : $t = $t.next = e, $t;
  }
  function Dt() {
    if (lt === null) {
      var e = Ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var n = $t === null ? Ve.memoizedState : $t.next;
    if (n !== null)
      $t = n, lt = e;
    else {
      if (e === null)
        throw Ve.alternate === null ? Error(s(467)) : Error(s(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, $t === null ? Ve.memoizedState = $t = e : $t = $t.next = e;
    }
    return $t;
  }
  function to() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ts(e) {
    var n = Ns;
    return Ns += 1, wi === null && (wi = []), e = hp(wi, e, n), n = Ve, ($t === null ? n.memoizedState : $t.next) === null && (n = n.alternate, k.H = n === null || n.memoizedState === null ? rv : Wu), e;
  }
  function no(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ts(e);
      if (e.$$typeof === O) return Jt(e);
    }
    throw Error(s(438, String(e)));
  }
  function qu(e) {
    var n = null, r = Ve.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = Ve.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = to(), Ve.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = z;
    return n.index++, r;
  }
  function Ca(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ao(e) {
    var n = Dt();
    return Iu(n, lt, e);
  }
  function Iu(e, n, r) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
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
      var E = x = null, L = null, W = n, ue = !1;
      do {
        var he = W.lane & -536870913;
        if (he !== W.lane ? (Xe & he) === he : (Ta & he) === he) {
          var ie = W.revertLane;
          if (ie === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            }), he === vi && (ue = !0);
          else if ((Ta & ie) === ie) {
            W = W.next, ie === vi && (ue = !0);
            continue;
          } else
            he = {
              lane: 0,
              revertLane: W.revertLane,
              gesture: null,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            }, L === null ? (E = L = he, x = h) : L = L.next = he, Ve.lanes |= ie, ar |= ie;
          he = W.action, Vr && r(h, he), h = W.hasEagerState ? W.eagerState : r(h, he);
        } else
          ie = {
            lane: he,
            revertLane: W.revertLane,
            gesture: W.gesture,
            action: W.action,
            hasEagerState: W.hasEagerState,
            eagerState: W.eagerState,
            next: null
          }, L === null ? (E = L = ie, x = h) : L = L.next = ie, Ve.lanes |= he, ar |= he;
        W = W.next;
      } while (W !== null && W !== n);
      if (L === null ? x = h : L.next = E, !En(h, e.memoizedState) && (Bt = !0, ue && (r = gi, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Fu(e) {
    var n = Dt(), r = n.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      En(h, n.memoizedState) || (Bt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function Ep(e, n, r) {
    var l = Ve, d = Dt(), h = Ze;
    if (h) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = n();
    var x = !En(
      (lt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, Bt = !0), d = d.queue, Pu(Cp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || $t !== null && $t.memoizedState.tag & 1) {
      if (l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        Tp.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), ht === null) throw Error(s(349));
      h || (Ta & 127) !== 0 || Np(l, n, r);
    }
    return r;
  }
  function Np(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ve.updateQueue, n === null ? (n = to(), Ve.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Tp(e, n, r, l) {
    n.value = r, n.getSnapshot = l, Rp(n) && _p(e);
  }
  function Cp(e, n, r) {
    return r(function() {
      Rp(n) && _p(e);
    });
  }
  function Rp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function _p(e) {
    var n = Ar(e, 2);
    n !== null && bn(n, e, 2);
  }
  function Yu(e) {
    var n = dn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        wt(!0);
        try {
          r();
        } finally {
          wt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ca,
      lastRenderedState: e
    }, n;
  }
  function Mp(e, n, r, l) {
    return e.baseState = r, Iu(
      e,
      lt,
      typeof l == "function" ? l : Ca
    );
  }
  function Zw(e, n, r, l, d) {
    if (so(e)) throw Error(s(485));
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
      k.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Ap(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Ap(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = k.T, x = {};
      k.T = x;
      try {
        var E = r(d, l), L = k.S;
        L !== null && L(x, E), Dp(e, n, E);
      } catch (W) {
        Gu(e, n, W);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), k.T = h;
      }
    } else
      try {
        h = r(d, l), Dp(e, n, h);
      } catch (W) {
        Gu(e, n, W);
      }
  }
  function Dp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        kp(e, n, l);
      },
      function(l) {
        return Gu(e, n, l);
      }
    ) : kp(e, n, r);
  }
  function kp(e, n, r) {
    n.status = "fulfilled", n.value = r, zp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Ap(e, r)));
  }
  function Gu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, zp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function zp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Op(e, n) {
    return n;
  }
  function Lp(e, n) {
    if (Ze) {
      var r = ht.formState;
      if (r !== null) {
        e: {
          var l = Ve;
          if (Ze) {
            if (yt) {
              t: {
                for (var d = yt, h = qn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (d = Fn(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break t;
                  }
                }
                h = d.data, d = h === "F!" || h === "F" ? d : null;
              }
              if (d) {
                yt = Fn(
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
    return r = dn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Op,
      lastRenderedState: n
    }, r.queue = l, r = tv.bind(
      null,
      Ve,
      l
    ), l.dispatch = r, l = Yu(!1), h = Ju.bind(
      null,
      Ve,
      !1,
      l.queue
    ), l = dn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = Zw.bind(
      null,
      Ve,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Up(e) {
    var n = Dt();
    return $p(n, lt, e);
  }
  function $p(e, n, r) {
    if (n = Iu(
      e,
      n,
      Op
    )[0], e = ao(Ca)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ts(n);
      } catch (x) {
        throw x === yi ? Pl : x;
      }
    else l = n;
    n = Dt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (Ve.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      Jw.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Jw(e, n) {
    e.action = n;
  }
  function Bp(e) {
    var n = Dt(), r = lt;
    if (r !== null)
      return $p(n, r, e);
    Dt(), n = n.memoizedState, r = Dt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function ji(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = Ve.updateQueue, n === null && (n = to(), Ve.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Vp() {
    return Dt().memoizedState;
  }
  function ro(e, n, r, l) {
    var d = dn();
    Ve.flags |= e, d.memoizedState = ji(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function io(e, n, r, l) {
    var d = Dt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    lt !== null && l !== null && Uu(l, lt.memoizedState.deps) ? d.memoizedState = ji(n, h, r, l) : (Ve.flags |= e, d.memoizedState = ji(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Hp(e, n) {
    ro(8390656, 8, e, n);
  }
  function Pu(e, n) {
    io(2048, 8, e, n);
  }
  function Ww(e) {
    Ve.flags |= 4;
    var n = Ve.updateQueue;
    if (n === null)
      n = to(), Ve.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function qp(e) {
    var n = Dt().memoizedState;
    return Ww({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Ip(e, n) {
    return io(4, 2, e, n);
  }
  function Fp(e, n) {
    return io(4, 4, e, n);
  }
  function Yp(e, n) {
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
  function Gp(e, n, r) {
    r = r != null ? r.concat([e]) : null, io(4, 4, Yp.bind(null, n, e), r);
  }
  function Ku() {
  }
  function Pp(e, n) {
    var r = Dt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Uu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Kp(e, n) {
    var r = Dt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Uu(n, l[1]))
      return l[0];
    if (l = e(), Vr) {
      wt(!0);
      try {
        e();
      } finally {
        wt(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function Xu(e, n, r) {
    return r === void 0 || (Ta & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Xv(), Ve.lanes |= e, ar |= e, r);
  }
  function Xp(e, n, r, l) {
    return En(r, n) ? r : xi.current !== null ? (e = Xu(e, r, l), En(e, n) || (Bt = !0), e) : (Ta & 42) === 0 || (Ta & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Bt = !0, e.memoizedState = r) : (e = Xv(), Ve.lanes |= e, ar |= e, n);
  }
  function Qp(e, n, r, l, d) {
    var h = U.p;
    U.p = h !== 0 && 8 > h ? h : 8;
    var x = k.T, E = {};
    k.T = E, Ju(e, !1, n, r);
    try {
      var L = d(), W = k.S;
      if (W !== null && W(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = Kw(
          L,
          l
        );
        Cs(
          e,
          n,
          ue,
          Mn(e)
        );
      } else
        Cs(
          e,
          n,
          l,
          Mn(e)
        );
    } catch (he) {
      Cs(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: he },
        Mn()
      );
    } finally {
      U.p = h, x !== null && E.types !== null && (x.types = E.types), k.T = x;
    }
  }
  function ej() {
  }
  function Qu(e, n, r, l) {
    if (e.tag !== 5) throw Error(s(476));
    var d = Zp(e).queue;
    Qp(
      e,
      d,
      n,
      V,
      r === null ? ej : function() {
        return Jp(e), r(l);
      }
    );
  }
  function Zp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ca,
        lastRenderedState: V
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
        lastRenderedReducer: Ca,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Jp(e) {
    var n = Zp(e);
    n.next === null && (n = e.alternate.memoizedState), Cs(
      e,
      n.next.queue,
      {},
      Mn()
    );
  }
  function Zu() {
    return Jt(Fs);
  }
  function Wp() {
    return Dt().memoizedState;
  }
  function ev() {
    return Dt().memoizedState;
  }
  function tj(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Mn();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (bn(l, n, r), ws(l, n, r)), n = { cache: Tu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function nj(e, n, r) {
    var l = Mn();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, so(e) ? nv(n, r) : (r = pu(e, n, r, l), r !== null && (bn(r, e, l), av(r, n, l)));
  }
  function tv(e, n, r) {
    var l = Mn();
    Cs(e, n, r, l);
  }
  function Cs(e, n, r, l) {
    var d = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (so(e)) nv(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, En(E, x))
            return Vl(e, n, d, 0), ht === null && Bl(), !1;
        } catch {
        } finally {
        }
      if (r = pu(e, n, d, l), r !== null)
        return bn(r, e, l), av(r, n, l), !0;
    }
    return !1;
  }
  function Ju(e, n, r, l) {
    if (l = {
      lane: 2,
      revertLane: Md(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, so(e)) {
      if (n) throw Error(s(479));
    } else
      n = pu(
        e,
        r,
        l,
        2
      ), n !== null && bn(n, e, 2);
  }
  function so(e) {
    var n = e.alternate;
    return e === Ve || n !== null && n === Ve;
  }
  function nv(e, n) {
    Si = Wl = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function av(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, an(e, r);
    }
  }
  var Rs = {
    readContext: Jt,
    use: no,
    useCallback: Nt,
    useContext: Nt,
    useEffect: Nt,
    useImperativeHandle: Nt,
    useLayoutEffect: Nt,
    useInsertionEffect: Nt,
    useMemo: Nt,
    useReducer: Nt,
    useRef: Nt,
    useState: Nt,
    useDebugValue: Nt,
    useDeferredValue: Nt,
    useTransition: Nt,
    useSyncExternalStore: Nt,
    useId: Nt,
    useHostTransitionStatus: Nt,
    useFormState: Nt,
    useActionState: Nt,
    useOptimistic: Nt,
    useMemoCache: Nt,
    useCacheRefresh: Nt
  };
  Rs.useEffectEvent = Nt;
  var rv = {
    readContext: Jt,
    use: no,
    useCallback: function(e, n) {
      return dn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: Jt,
    useEffect: Hp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, ro(
        4194308,
        4,
        Yp.bind(null, n, e),
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
      var r = dn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Vr) {
        wt(!0);
        try {
          e();
        } finally {
          wt(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = dn();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          wt(!0);
          try {
            r(n);
          } finally {
            wt(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = nj.bind(
        null,
        Ve,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = dn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Yu(e);
      var n = e.queue, r = tv.bind(null, Ve, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = dn();
      return Xu(r, e, n);
    },
    useTransition: function() {
      var e = Yu(!1);
      return e = Qp.bind(
        null,
        Ve,
        e.queue,
        !0,
        !1
      ), dn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = Ve, d = dn();
      if (Ze) {
        if (r === void 0)
          throw Error(s(407));
        r = r();
      } else {
        if (r = n(), ht === null)
          throw Error(s(349));
        (Xe & 127) !== 0 || Np(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Hp(Cp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        Tp.bind(
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
      var e = dn(), n = ht.identifierPrefix;
      if (Ze) {
        var r = fa, l = da;
        r = (l & ~(1 << 32 - jt(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = eo++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Xw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Zu,
    useFormState: Lp,
    useActionState: Lp,
    useOptimistic: function(e) {
      var n = dn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = Ju.bind(
        null,
        Ve,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: qu,
    useCacheRefresh: function() {
      return dn().memoizedState = tj.bind(
        null,
        Ve
      );
    },
    useEffectEvent: function(e) {
      var n = dn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((tt & 2) !== 0)
          throw Error(s(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Wu = {
    readContext: Jt,
    use: no,
    useCallback: Pp,
    useContext: Jt,
    useEffect: Pu,
    useImperativeHandle: Gp,
    useInsertionEffect: Ip,
    useLayoutEffect: Fp,
    useMemo: Kp,
    useReducer: ao,
    useRef: Vp,
    useState: function() {
      return ao(Ca);
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = Dt();
      return Xp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = ao(Ca)[0], n = Dt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ts(e),
        n
      ];
    },
    useSyncExternalStore: Ep,
    useId: Wp,
    useHostTransitionStatus: Zu,
    useFormState: Up,
    useActionState: Up,
    useOptimistic: function(e, n) {
      var r = Dt();
      return Mp(r, lt, e, n);
    },
    useMemoCache: qu,
    useCacheRefresh: ev
  };
  Wu.useEffectEvent = qp;
  var iv = {
    readContext: Jt,
    use: no,
    useCallback: Pp,
    useContext: Jt,
    useEffect: Pu,
    useImperativeHandle: Gp,
    useInsertionEffect: Ip,
    useLayoutEffect: Fp,
    useMemo: Kp,
    useReducer: Fu,
    useRef: Vp,
    useState: function() {
      return Fu(Ca);
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = Dt();
      return lt === null ? Xu(r, e, n) : Xp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Fu(Ca)[0], n = Dt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ts(e),
        n
      ];
    },
    useSyncExternalStore: Ep,
    useId: Wp,
    useHostTransitionStatus: Zu,
    useFormState: Bp,
    useActionState: Bp,
    useOptimistic: function(e, n) {
      var r = Dt();
      return lt !== null ? Mp(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: qu,
    useCacheRefresh: ev
  };
  iv.useEffectEvent = qp;
  function ed(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var td = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = Mn(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (bn(n, e, l), ws(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = Mn(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (bn(n, e, l), ws(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Mn(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (bn(n, e, r), ws(n, e, r));
    }
  };
  function sv(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !ms(r, l) || !ms(d, h) : !0;
  }
  function lv(e, n, r, l) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, l), n.state !== e && td.enqueueReplaceState(n, n.state, null);
  }
  function Hr(e, n) {
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
  function ov(e) {
    $l(e);
  }
  function cv(e) {
    console.error(e);
  }
  function uv(e) {
    $l(e);
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
  function dv(e, n, r) {
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
  function nd(e, n, r) {
    return r = Za(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      lo(e, n);
    }, r;
  }
  function fv(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function hv(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        dv(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      dv(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function aj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && pi(
        n,
        r,
        d,
        !0
      ), r = Tn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return In === null ? xo() : r.alternate === null && Tt === 0 && (Tt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Cd(e, l, d)), !1;
          case 22:
            return r.flags |= 65536, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([l]) : r.add(l)), Cd(e, l, d)), !1;
        }
        throw Error(s(435, r.tag));
      }
      return Cd(e, l, d), xo(), !1;
    }
    if (Ze)
      return n = Tn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Su && (e = Error(s(422), { cause: l }), gs(Bn(e, r)))) : (l !== Su && (n = Error(s(423), {
        cause: l
      }), gs(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Bn(l, r), d = nd(
        e.stateNode,
        l,
        d
      ), Du(e, d), Tt !== 4 && (Tt = 2)), !1;
    var h = Error(s(520), { cause: l });
    if (h = Bn(h, r), Ls === null ? Ls = [h] : Ls.push(h), Tt !== 4 && (Tt = 2), n === null) return !0;
    l = Bn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = nd(r.stateNode, l, e), Du(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = fv(d), hv(
              d,
              e,
              r,
              l
            ), Du(r, d), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var ad = Error(s(461)), Bt = !1;
  function Wt(e, n, r, l) {
    n.child = e === null ? gp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function mv(e, n, r, l, d) {
    r = r.render;
    var h = n.ref;
    if ("ref" in l) {
      var x = {};
      for (var E in l)
        E !== "ref" && (x[E] = l[E]);
    } else x = l;
    return Or(n), l = $u(
      e,
      n,
      r,
      x,
      h,
      d
    ), E = Bu(), e !== null && !Bt ? (Vu(e, n, d), Ra(e, n, d)) : (Ze && E && bu(n), n.flags |= 1, Wt(e, n, l, d), n.child);
  }
  function pv(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !vu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, vv(
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
    if (h = e.child, !dd(e, d)) {
      var x = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : ms, r(x, l) && e.ref === n.ref)
        return Ra(e, n, d);
    }
    return n.flags |= 1, e = wa(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function vv(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (ms(h, l) && e.ref === n.ref)
        if (Bt = !1, n.pendingProps = l = h, dd(e, d))
          (e.flags & 131072) !== 0 && (Bt = !0);
        else
          return n.lanes = e.lanes, Ra(e, n, d);
    }
    return rd(
      e,
      n,
      r,
      l,
      d
    );
  }
  function gv(e, n, r, l) {
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
        return yv(
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
        ), h !== null ? xp(n, h) : zu(), Sp(n);
      else
        return l = n.lanes = 536870912, yv(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Gl(n, h.cachePool), xp(n, h), er(), n.memoizedState = null) : (e !== null && Gl(n, null), zu(), er());
    return Wt(e, n, d, r), n.child;
  }
  function _s(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function yv(e, n, r, l, d) {
    var h = Ru();
    return h = h === null ? null : { parent: Ut._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Gl(n, null), zu(), Sp(n), e !== null && pi(e, n, l, !0), n.childLanes = d, null;
  }
  function oo(e, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function bv(e, n, r) {
    return Br(n, e.child, null, r), e = oo(n, n.pendingProps), e.flags |= 2, Cn(n), n.memoizedState = null, e;
  }
  function rj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ze) {
        if (l.mode === "hidden")
          return e = oo(n, l), n.lanes = 536870912, _s(null, e);
        if (Lu(n), (e = yt) ? (e = Ag(
          e,
          qn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: da, overflow: fa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = np(e), r.return = n, n.child = r, Zt = n, yt = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Lu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = bv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (Bt || pi(e, n, r, !1), d = (r & e.childLanes) !== 0, Bt || d) {
        if (l = ht, l !== null && (x = D(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), bn(l, e, x), ad;
        xo(), n = bv(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, yt = Fn(x.nextSibling), Zt = n, Ze = !0, Pa = null, qn = !1, e !== null && ip(n, e), n = oo(n, l), n.flags |= 4096;
      return n;
    }
    return e = wa(e.child, {
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
        throw Error(s(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function rd(e, n, r, l, d) {
    return Or(n), r = $u(
      e,
      n,
      r,
      l,
      void 0,
      d
    ), l = Bu(), e !== null && !Bt ? (Vu(e, n, d), Ra(e, n, d)) : (Ze && l && bu(n), n.flags |= 1, Wt(e, n, r, d), n.child);
  }
  function xv(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = jp(
      n,
      l,
      r,
      d
    ), wp(e), l = Bu(), e !== null && !Bt ? (Vu(e, n, h), Ra(e, n, h)) : (Ze && l && bu(n), n.flags |= 1, Wt(e, n, r, h), n.child);
  }
  function Sv(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = di, x = r.contextType;
      typeof x == "object" && x !== null && (h = Jt(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = td, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Mu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? Jt(x) : di, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (ed(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && td.enqueueReplaceState(h, h.state, null), Es(n, l, h, d), js(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Hr(r, E);
      h.props = L;
      var W = h.context, ue = r.contextType;
      x = di, typeof ue == "object" && ue !== null && (x = Jt(ue));
      var he = r.getDerivedStateFromProps;
      ue = typeof he == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ue || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || W !== x) && lv(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var ie = n.memoizedState;
      h.state = ie, Es(n, l, h, d), js(), W = n.memoizedState, E || ie !== W || Qa ? (typeof he == "function" && (ed(
        n,
        r,
        he,
        l
      ), W = n.memoizedState), (L = Qa || sv(
        n,
        r,
        L,
        l,
        ie,
        W,
        x
      )) ? (ue || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = W), h.props = l, h.state = W, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Au(e, n), x = n.memoizedProps, ue = Hr(r, x), h.props = ue, he = n.pendingProps, ie = h.context, W = r.contextType, L = di, typeof W == "object" && W !== null && (L = Jt(W)), E = r.getDerivedStateFromProps, (W = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== he || ie !== L) && lv(
        n,
        h,
        l,
        L
      ), Qa = !1, ie = n.memoizedState, h.state = ie, Es(n, l, h, d), js();
      var le = n.memoizedState;
      x !== he || ie !== le || Qa || e !== null && e.dependencies !== null && Fl(e.dependencies) ? (typeof E == "function" && (ed(
        n,
        r,
        E,
        l
      ), le = n.memoizedState), (ue = Qa || sv(
        n,
        r,
        ue,
        l,
        ie,
        le,
        L
      ) || e !== null && e.dependencies !== null && Fl(e.dependencies)) ? (W || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, le, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        le,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = le), h.props = l, h.state = le, h.context = L, l = ue) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && ie === e.memoizedState || (n.flags |= 1024), l = !1);
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
    )) : Wt(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ra(
      e,
      n,
      d
    ), e;
  }
  function wv(e, n, r, l) {
    return kr(), n.flags |= 256, Wt(e, n, r, l), n.child;
  }
  var id = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sd(e) {
    return { baseLanes: e, cachePool: dp() };
  }
  function ld(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= _n), e;
  }
  function jv(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (At.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ze) {
        if (d ? Wa(n) : er(), (e = yt) ? (e = Ag(
          e,
          qn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: da, overflow: fa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = np(e), r.return = n, n.child = r, Zt = n, yt = null)) : e = null, e === null) throw Ka(n);
        return Id(e) ? n.lanes = 32 : n.lanes = 536870912, null;
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
      ), E.return = n, l.return = n, E.sibling = l, n.child = E, l = n.child, l.memoizedState = sd(r), l.childLanes = ld(
        e,
        x,
        r
      ), n.memoizedState = id, _s(null, l)) : (Wa(n), od(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (h)
        n.flags & 256 ? (Wa(n), n.flags &= -257, n = cd(
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
        ), l = n.child, l.memoizedState = sd(r), l.childLanes = ld(
          e,
          x,
          r
        ), n.memoizedState = id, n = _s(null, l));
      else if (Wa(n), Id(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var W = x.dgst;
        x = W, l = Error(s(419)), l.stack = "", l.digest = x, gs({ value: l, source: null, stack: null }), n = cd(
          e,
          n,
          r
        );
      } else if (Bt || pi(e, n, r, !1), x = (r & e.childLanes) !== 0, Bt || x) {
        if (x = ht, x !== null && (l = D(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), bn(x, e, l), ad;
        qd(E) || xo(), n = cd(
          e,
          n,
          r
        );
      } else
        qd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, yt = Fn(
          E.nextSibling
        ), Zt = n, Ze = !0, Pa = null, qn = !1, e !== null && ip(n, e), n = od(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, W = L.sibling, l = wa(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, W !== null ? E = wa(
      W,
      E
    ) : (E = Dr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, _s(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = sd(r) : (d = E.cachePool, d !== null ? (L = Ut._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = dp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = ld(
      e,
      x,
      r
    ), n.memoizedState = id, _s(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = wa(r, {
      mode: "visible",
      children: l.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function od(e, n) {
    return n = uo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function uo(e, n) {
    return e = Nn(22, e, null, n), e.lanes = 0, e;
  }
  function cd(e, n, r) {
    return Br(n, e.child, null, r), e = od(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function Ev(e, n, r) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n), Eu(e.return, n, r);
  }
  function ud(e, n, r, l, d, h) {
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
  function Nv(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = At.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, re(At, x), Wt(e, n, l, r), l = Ze ? vs : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ev(e, r, n);
        else if (e.tag === 19)
          Ev(e, r, n);
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
        r = d, r === null ? (d = n.child, n.child = null) : (d = r.sibling, r.sibling = null), ud(
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
        ud(
          n,
          !0,
          r,
          null,
          h,
          l
        );
        break;
      case "together":
        ud(
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
  function Ra(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), ar |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (pi(
          e,
          n,
          r,
          !1
        ), (r & n.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && n.child !== e.child)
      throw Error(s(153));
    if (n.child !== null) {
      for (e = n.child, r = wa(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = wa(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function dd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Fl(e)));
  }
  function ij(e, n, r) {
    switch (n.tag) {
      case 3:
        pe(n, n.stateNode.containerInfo), Xa(n, Ut, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        Le(n);
        break;
      case 4:
        pe(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, Lu(n), null;
        break;
      case 13:
        var l = n.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? jv(e, n, r) : (Wa(n), e = Ra(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (pi(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return Nv(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), re(At, At.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, gv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Ut, e.memoizedState.cache);
    }
    return Ra(e, n, r);
  }
  function Tv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Bt = !0;
      else {
        if (!dd(e, r) && (n.flags & 128) === 0)
          return Bt = !1, ij(
            e,
            n,
            r
          );
        Bt = (e.flags & 131072) !== 0;
      }
    else
      Bt = !1, Ze && (n.flags & 1048576) !== 0 && rp(n, vs, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = Ur(n.elementType), n.type = e, typeof e == "function")
            vu(e) ? (l = Hr(e, l), n.tag = 1, n = Sv(
              null,
              n,
              e,
              l,
              r
            )) : (n.tag = 0, n = rd(
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
                n.tag = 11, n = mv(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === se) {
                n.tag = 14, n = pv(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = oe(e) || e, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return rd(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return l = n.type, d = Hr(
          l,
          n.pendingProps
        ), Sv(
          e,
          n,
          l,
          d,
          r
        );
      case 3:
        e: {
          if (pe(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = n.pendingProps;
          var h = n.memoizedState;
          d = h.element, Au(e, n), Es(n, l, null, r);
          var x = n.memoizedState;
          if (l = x.cache, Xa(n, Ut, l), l !== h.cache && Nu(
            n,
            [Ut],
            r,
            !0
          ), js(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = wv(
                e,
                n,
                l,
                r
              );
              break e;
            } else if (l !== d) {
              d = Bn(
                Error(s(424)),
                n
              ), gs(d), n = wv(
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
              for (yt = Fn(e.firstChild), Zt = n, Ze = !0, Pa = null, qn = !0, r = gp(
                n,
                null,
                l,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (kr(), l === d) {
              n = Ra(
                e,
                n,
                r
              );
              break e;
            }
            Wt(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return co(e, n), e === null ? (r = Ug(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ze || (r = n.type, e = n.pendingProps, l = Co(
          ae.current
        ).createElement(r), l[Se] = n, l[we] = e, en(l, r, e), vt(l), n.stateNode = l) : n.memoizedState = Ug(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Le(n), e === null && Ze && (l = n.stateNode = zg(
          n.type,
          n.pendingProps,
          ae.current
        ), Zt = n, qn = !0, d = yt, or(n.type) ? (Fd = d, yt = Fn(l.firstChild)) : yt = d), Wt(
          e,
          n,
          n.pendingProps.children,
          r
        ), co(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ze && ((d = l = yt) && (l = Oj(
          l,
          n.type,
          n.pendingProps,
          qn
        ), l !== null ? (n.stateNode = l, Zt = n, yt = Fn(l.firstChild), qn = !1, d = !0) : d = !1), d || Ka(n)), Le(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Bd(d, h) ? l = null : x !== null && Bd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = $u(
          e,
          n,
          Qw,
          null,
          null,
          r
        ), Fs._currentValue = d), co(e, n), Wt(e, n, l, r), n.child;
      case 6:
        return e === null && Ze && ((e = r = yt) && (r = Lj(
          r,
          n.pendingProps,
          qn
        ), r !== null ? (n.stateNode = r, Zt = n, yt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return jv(e, n, r);
      case 4:
        return pe(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          l,
          r
        ) : Wt(e, n, l, r), n.child;
      case 11:
        return mv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return Wt(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return Wt(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return Wt(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), Wt(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Or(n), d = Jt(d), l = l(d), n.flags |= 1, Wt(e, n, l, r), n.child;
      case 14:
        return pv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return vv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Nv(e, n, r);
      case 31:
        return rj(e, n, r);
      case 22:
        return gv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = Jt(Ut), e === null ? (d = Ru(), d === null && (d = ht, h = Tu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Mu(n), Xa(n, Ut, d)) : ((e.lanes & r) !== 0 && (Au(e, n), Es(n, null, null, r), js()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, Ut, l)) : (l = h.cache, Xa(n, Ut, l), l !== d.cache && Nu(
          n,
          [Ut],
          r,
          !0
        ))), Wt(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(s(156, n.tag));
  }
  function _a(e) {
    e.flags |= 4;
  }
  function fd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Wv()) e.flags |= 8192;
        else
          throw $r = Kl, _u;
    } else e.flags &= -16777217;
  }
  function Cv(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !qg(n))
      if (Wv()) e.flags |= 8192;
      else
        throw $r = Kl, _u;
  }
  function fo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Yt() : 536870912, e.lanes |= n, Ci |= n);
  }
  function Ms(e, n) {
    if (!Ze)
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
  function bt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function sj(e, n, r) {
    var l = n.pendingProps;
    switch (xu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return bt(n), null;
      case 1:
        return bt(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Na(Ut), Me(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (mi(n) ? _a(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, wu())), bt(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (_a(n), h !== null ? (bt(n), Cv(n, h)) : (bt(n), fd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (_a(n), bt(n), Cv(n, h)) : (bt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && _a(n), bt(n), fd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (je(n), r = ae.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && _a(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(s(166));
            return bt(n), null;
          }
          e = F.current, mi(n) ? sp(n) : (e = zg(d, l, r), n.stateNode = e, _a(n));
        }
        return bt(n), null;
      case 5:
        if (je(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && _a(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(s(166));
            return bt(n), null;
          }
          if (h = F.current, mi(n))
            sp(n);
          else {
            var x = Co(
              ae.current
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
            e: switch (en(h, d, l), d) {
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
            l && _a(n);
          }
        }
        return bt(n), fd(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== l && _a(n);
        else {
          if (typeof l != "string" && n.stateNode === null)
            throw Error(s(166));
          if (e = ae.current, mi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = Zt, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[Se] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || jg(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Co(e).createTextNode(
              l
            ), e[Se] = n, n.stateNode = e;
        }
        return bt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = mi(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), e = !1;
          } else
            r = wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Cn(n), n) : (Cn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return bt(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = mi(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(s(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(s(317));
              d[Se] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            bt(n), d = !1;
          } else
            d = wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (Cn(n), n) : (Cn(n), null);
        }
        return Cn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), fo(n, n.updateQueue), bt(n), null);
      case 4:
        return Me(), e === null && zd(n.stateNode.containerInfo), bt(n), null;
      case 10:
        return Na(n.type), bt(n), null;
      case 19:
        if (te(At), l = n.memoizedState, l === null) return bt(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ms(l, !1);
          else {
            if (Tt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = Jl(e), h !== null) {
                  for (n.flags |= 128, Ms(l, !1), e = h.updateQueue, n.updateQueue = e, fo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    tp(r, e), r = r.sibling;
                  return re(
                    At,
                    At.current & 1 | 2
                  ), Ze && ja(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Rt() > go && (n.flags |= 128, d = !0, Ms(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Jl(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, fo(n, e), Ms(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !Ze)
                return bt(n), null;
            } else
              2 * Rt() - l.renderingStartTime > go && r !== 536870912 && (n.flags |= 128, d = !0, Ms(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Rt(), e.sibling = null, r = At.current, re(
          At,
          d ? r & 1 | 2 : r & 1
        ), Ze && ja(n, l.treeForkCount), e) : (bt(n), null);
      case 22:
      case 23:
        return Cn(n), Ou(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (bt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : bt(n), r = n.updateQueue, r !== null && fo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && te(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Na(Ut), bt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function lj(e, n) {
    switch (xu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Na(Ut), Me(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return je(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Cn(n), n.alternate === null)
            throw Error(s(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Cn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return te(At), null;
      case 4:
        return Me(), null;
      case 10:
        return Na(n.type), null;
      case 22:
      case 23:
        return Cn(n), Ou(), e !== null && te(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Na(Ut), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Rv(e, n) {
    switch (xu(n), n.tag) {
      case 3:
        Na(Ut), Me();
        break;
      case 26:
      case 27:
      case 5:
        je(n);
        break;
      case 4:
        Me();
        break;
      case 31:
        n.memoizedState !== null && Cn(n);
        break;
      case 13:
        Cn(n);
        break;
      case 19:
        te(At);
        break;
      case 10:
        Na(n.type);
        break;
      case 22:
      case 23:
        Cn(n), Ou(), e !== null && te(Lr);
        break;
      case 24:
        Na(Ut);
    }
  }
  function As(e, n) {
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
      at(n, n.return, E);
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
              var L = r, W = E;
              try {
                W();
              } catch (ue) {
                at(
                  d,
                  L,
                  ue
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (ue) {
      at(n, n.return, ue);
    }
  }
  function _v(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        bp(n, r);
      } catch (l) {
        at(e, e.return, l);
      }
    }
  }
  function Mv(e, n, r) {
    r.props = Hr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      at(e, n, l);
    }
  }
  function Ds(e, n) {
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
      at(e, n, d);
    }
  }
  function ha(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          at(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          at(e, n, d);
        }
      else r.current = null;
  }
  function Av(e) {
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
      at(e, e.return, d);
    }
  }
  function hd(e, n, r) {
    try {
      var l = e.stateNode;
      _j(l, e.type, r, n), l[we] = n;
    } catch (d) {
      at(e, e.return, d);
    }
  }
  function Dv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function md(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Dv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && or(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function pd(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = xa));
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (pd(e, n, r), e = e.sibling; e !== null; )
        pd(e, n, r), e = e.sibling;
  }
  function ho(e, n, r) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (l !== 4 && (l === 27 && or(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (ho(e, n, r), e = e.sibling; e !== null; )
        ho(e, n, r), e = e.sibling;
  }
  function kv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      en(n, l, r), n[Se] = e, n[we] = r;
    } catch (h) {
      at(e, e.return, h);
    }
  }
  var Ma = !1, Vt = !1, vd = !1, zv = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function oj(e, n) {
    if (e = e.containerInfo, Ud = zo, e = Gm(e), cu(e)) {
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
            var x = 0, E = -1, L = -1, W = 0, ue = 0, he = e, ie = null;
            t: for (; ; ) {
              for (var le; he !== r || d !== 0 && he.nodeType !== 3 || (E = x + d), he !== h || l !== 0 && he.nodeType !== 3 || (L = x + l), he.nodeType === 3 && (x += he.nodeValue.length), (le = he.firstChild) !== null; )
                ie = he, he = le;
              for (; ; ) {
                if (he === e) break t;
                if (ie === r && ++W === d && (E = x), ie === h && ++ue === l && (L = x), (le = he.nextSibling) !== null) break;
                he = ie, ie = he.parentNode;
              }
              he = le;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for ($d = { focusedElem: e, selectionRange: r }, zo = !1, Kt = n; Kt !== null; )
      if (n = Kt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Kt = e;
      else
        for (; Kt !== null; ) {
          switch (n = Kt, h = n.alternate, e = n.flags, n.tag) {
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
                  var Ne = Hr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Ne,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ze) {
                  at(
                    r,
                    r.return,
                    ze
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, Kt = e;
            break;
          }
          Kt = n.return;
        }
  }
  function Ov(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Da(e, r), l & 4 && As(5, r);
        break;
      case 1:
        if (Da(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              at(r, r.return, x);
            }
          else {
            var d = Hr(
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
              at(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && _v(r), l & 512 && Ds(r, r.return);
        break;
      case 3:
        if (Da(e, r), l & 64 && (e = r.updateQueue, e !== null)) {
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
            bp(e, n);
          } catch (x) {
            at(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && kv(r);
      case 26:
      case 5:
        Da(e, r), n === null && l & 4 && Av(r), l & 512 && Ds(r, r.return);
        break;
      case 12:
        Da(e, r);
        break;
      case 31:
        Da(e, r), l & 4 && $v(e, r);
        break;
      case 13:
        Da(e, r), l & 4 && Bv(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = gj.bind(
          null,
          r
        ), Uj(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Ma, !l) {
          n = n !== null && n.memoizedState !== null || Vt, d = Ma;
          var h = Vt;
          Ma = l, (Vt = n) && !h ? ka(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Da(e, r), Ma = d, Vt = h;
        }
        break;
      case 30:
        break;
      default:
        Da(e, r);
    }
  }
  function Lv(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Lv(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && ft(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var St = null, pn = !1;
  function Aa(e, n, r) {
    for (r = r.child; r !== null; )
      Uv(e, n, r), r = r.sibling;
  }
  function Uv(e, n, r) {
    if (_t && typeof _t.onCommitFiberUnmount == "function")
      try {
        _t.onCommitFiberUnmount(fn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Vt || ha(r, n), Aa(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Vt || ha(r, n);
        var l = St, d = pn;
        or(r.type) && (St = r.stateNode, pn = !1), Aa(
          e,
          n,
          r
        ), Hs(r.stateNode), St = l, pn = d;
        break;
      case 5:
        Vt || ha(r, n);
      case 6:
        if (l = St, d = pn, St = null, Aa(
          e,
          n,
          r
        ), St = l, pn = d, St !== null)
          if (pn)
            try {
              (St.nodeType === 9 ? St.body : St.nodeName === "HTML" ? St.ownerDocument.body : St).removeChild(r.stateNode);
            } catch (h) {
              at(
                r,
                n,
                h
              );
            }
          else
            try {
              St.removeChild(r.stateNode);
            } catch (h) {
              at(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        St !== null && (pn ? (e = St, _g(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Oi(e)) : _g(St, r.stateNode));
        break;
      case 4:
        l = St, d = pn, St = r.stateNode.containerInfo, pn = !0, Aa(
          e,
          n,
          r
        ), St = l, pn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), Vt || tr(4, r, n), Aa(
          e,
          n,
          r
        );
        break;
      case 1:
        Vt || (ha(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && Mv(
          r,
          n,
          l
        )), Aa(
          e,
          n,
          r
        );
        break;
      case 21:
        Aa(
          e,
          n,
          r
        );
        break;
      case 22:
        Vt = (l = Vt) || r.memoizedState !== null, Aa(
          e,
          n,
          r
        ), Vt = l;
        break;
      default:
        Aa(
          e,
          n,
          r
        );
    }
  }
  function $v(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Oi(e);
      } catch (r) {
        at(n, n.return, r);
      }
    }
  }
  function Bv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Oi(e);
      } catch (r) {
        at(n, n.return, r);
      }
  }
  function cj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new zv()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new zv()), n;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function mo(e, n) {
    var r = cj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = yj.bind(null, e, l);
        l.then(d, d);
      }
    });
  }
  function vn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var l = 0; l < r.length; l++) {
        var d = r[l], h = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (or(E.type)) {
                St = E.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              St = E.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              St = E.stateNode.containerInfo, pn = !0;
              break e;
          }
          E = E.return;
        }
        if (St === null) throw Error(s(160));
        Uv(h, x, d), St = null, pn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Vv(n, e), n = n.sibling;
  }
  var aa = null;
  function Vv(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(n, e), gn(e), l & 4 && (tr(3, e, e.return), As(3, e), tr(5, e, e.return));
        break;
      case 1:
        vn(n, e), gn(e), l & 512 && (Vt || r === null || ha(r, r.return)), l & 64 && Ma && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = aa;
        if (vn(n, e), gn(e), l & 512 && (Vt || r === null || ha(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[Ie] || h[Se] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), en(h, l, r), h[Se] = e, vt(h), l = h;
                      break e;
                    case "link":
                      var x = Vg(
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
                      h = d.createElement(l), en(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Vg(
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
                      h = d.createElement(l), en(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  h[Se] = e, vt(h), l = h;
                }
                e.stateNode = l;
              } else
                Hg(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Bg(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Hg(
              d,
              e.type,
              e.stateNode
            ) : Bg(
              d,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && hd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        vn(n, e), gn(e), l & 512 && (Vt || r === null || ha(r, r.return)), r !== null && l & 4 && hd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (vn(n, e), gn(e), l & 512 && (Vt || r === null || ha(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ri(d, "");
          } catch (Ne) {
            at(e, e.return, Ne);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, hd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (vd = !0);
        break;
      case 6:
        if (vn(n, e), gn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Ne) {
            at(e, e.return, Ne);
          }
        }
        break;
      case 3:
        if (Mo = null, d = aa, aa = Ro(n.containerInfo), vn(n, e), aa = d, gn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Oi(n.containerInfo);
          } catch (Ne) {
            at(e, e.return, Ne);
          }
        vd && (vd = !1, Hv(e));
        break;
      case 4:
        l = aa, aa = Ro(
          e.stateNode.containerInfo
        ), vn(n, e), gn(e), aa = l;
        break;
      case 12:
        vn(n, e), gn(e);
        break;
      case 31:
        vn(n, e), gn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 13:
        vn(n, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (vo = Rt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, W = Ma, ue = Vt;
        if (Ma = W || d, Vt = ue || L, vn(n, e), Vt = ue, Ma = W, gn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Ma || Vt || qr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var he = L.memoizedProps.style, ie = he != null && he.hasOwnProperty("display") ? he.display : null;
                    E.style.display = ie == null || typeof ie == "boolean" ? "" : ("" + ie).trim();
                  }
                } catch (Ne) {
                  at(L, L.return, Ne);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Ne) {
                  at(L, L.return, Ne);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var le = L.stateNode;
                  d ? Mg(le, !0) : Mg(L.stateNode, !1);
                } catch (Ne) {
                  at(L, L.return, Ne);
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
        vn(n, e), gn(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vn(n, e), gn(e);
    }
  }
  function gn(e) {
    var n = e.flags;
    if (n & 2) {
      try {
        for (var r, l = e.return; l !== null; ) {
          if (Dv(l)) {
            r = l;
            break;
          }
          l = l.return;
        }
        if (r == null) throw Error(s(160));
        switch (r.tag) {
          case 27:
            var d = r.stateNode, h = md(e);
            ho(e, h, d);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ri(x, ""), r.flags &= -33);
            var E = md(e);
            ho(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, W = md(e);
            pd(
              e,
              W,
              L
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (ue) {
        at(e, e.return, ue);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Hv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Hv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Da(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ov(e, n.alternate, n), n = n.sibling;
  }
  function qr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          tr(4, n, n.return), qr(n);
          break;
        case 1:
          ha(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Mv(
            n,
            n.return,
            r
          ), qr(n);
          break;
        case 27:
          Hs(n.stateNode);
        case 26:
        case 5:
          ha(n, n.return), qr(n);
          break;
        case 22:
          n.memoizedState === null && qr(n);
          break;
        case 30:
          qr(n);
          break;
        default:
          qr(n);
      }
      e = e.sibling;
    }
  }
  function ka(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var l = n.alternate, d = e, h = n, x = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ka(
            d,
            h,
            r
          ), As(4, h);
          break;
        case 1:
          if (ka(
            d,
            h,
            r
          ), l = h, d = l.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (W) {
              at(l, l.return, W);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  yp(L[d], E);
            } catch (W) {
              at(l, l.return, W);
            }
          }
          r && x & 64 && _v(h), Ds(h, h.return);
          break;
        case 27:
          kv(h);
        case 26:
        case 5:
          ka(
            d,
            h,
            r
          ), r && l === null && x & 4 && Av(h), Ds(h, h.return);
          break;
        case 12:
          ka(
            d,
            h,
            r
          );
          break;
        case 31:
          ka(
            d,
            h,
            r
          ), r && x & 4 && $v(d, h);
          break;
        case 13:
          ka(
            d,
            h,
            r
          ), r && x & 4 && Bv(d, h);
          break;
        case 22:
          h.memoizedState === null && ka(
            d,
            h,
            r
          ), Ds(h, h.return);
          break;
        case 30:
          break;
        default:
          ka(
            d,
            h,
            r
          );
      }
      n = n.sibling;
    }
  }
  function gd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && ys(r));
  }
  function yd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ys(e));
  }
  function ra(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        qv(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function qv(e, n, r, l) {
    var d = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ra(
          e,
          n,
          r,
          l
        ), d & 2048 && As(9, n);
        break;
      case 1:
        ra(
          e,
          n,
          r,
          l
        );
        break;
      case 3:
        ra(
          e,
          n,
          r,
          l
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ys(e)));
        break;
      case 12:
        if (d & 2048) {
          ra(
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
            at(n, n.return, L);
          }
        } else
          ra(
            e,
            n,
            r,
            l
          );
        break;
      case 31:
        ra(
          e,
          n,
          r,
          l
        );
        break;
      case 13:
        ra(
          e,
          n,
          r,
          l
        );
        break;
      case 23:
        break;
      case 22:
        h = n.stateNode, x = n.alternate, n.memoizedState !== null ? h._visibility & 2 ? ra(
          e,
          n,
          r,
          l
        ) : ks(e, n) : h._visibility & 2 ? ra(
          e,
          n,
          r,
          l
        ) : (h._visibility |= 2, Ei(
          e,
          n,
          r,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && gd(x, n);
        break;
      case 24:
        ra(
          e,
          n,
          r,
          l
        ), d & 2048 && yd(n.alternate, n);
        break;
      default:
        ra(
          e,
          n,
          r,
          l
        );
    }
  }
  function Ei(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, W = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ei(
            h,
            x,
            E,
            L,
            d
          ), As(8, x);
          break;
        case 23:
          break;
        case 22:
          var ue = x.stateNode;
          x.memoizedState !== null ? ue._visibility & 2 ? Ei(
            h,
            x,
            E,
            L,
            d
          ) : ks(
            h,
            x
          ) : (ue._visibility |= 2, Ei(
            h,
            x,
            E,
            L,
            d
          )), d && W & 2048 && gd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ei(
            h,
            x,
            E,
            L,
            d
          ), d && W & 2048 && yd(x.alternate, x);
          break;
        default:
          Ei(
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
  function ks(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, l = n, d = l.flags;
        switch (l.tag) {
          case 22:
            ks(r, l), d & 2048 && gd(
              l.alternate,
              l
            );
            break;
          case 24:
            ks(r, l), d & 2048 && yd(l.alternate, l);
            break;
          default:
            ks(r, l);
        }
        n = n.sibling;
      }
  }
  var zs = 8192;
  function Ni(e, n, r) {
    if (e.subtreeFlags & zs)
      for (e = e.child; e !== null; )
        Iv(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Iv(e, n, r) {
    switch (e.tag) {
      case 26:
        Ni(
          e,
          n,
          r
        ), e.flags & zs && e.memoizedState !== null && Xj(
          r,
          aa,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ni(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = aa;
        aa = Ro(e.stateNode.containerInfo), Ni(
          e,
          n,
          r
        ), aa = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = zs, zs = 16777216, Ni(
          e,
          n,
          r
        ), zs = l) : Ni(
          e,
          n,
          r
        ));
        break;
      default:
        Ni(
          e,
          n,
          r
        );
    }
  }
  function Fv(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function Os(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          Kt = l, Gv(
            l,
            e
          );
        }
      Fv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Yv(e), e = e.sibling;
  }
  function Yv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Os(e), e.flags & 2048 && tr(9, e, e.return);
        break;
      case 3:
        Os(e);
        break;
      case 12:
        Os(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, po(e)) : Os(e);
        break;
      default:
        Os(e);
    }
  }
  function po(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var l = n[r];
          Kt = l, Gv(
            l,
            e
          );
        }
      Fv(e);
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
  function Gv(e, n) {
    for (; Kt !== null; ) {
      var r = Kt;
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
          ys(r.memoizedState.cache);
      }
      if (l = r.child, l !== null) l.return = r, Kt = l;
      else
        e: for (r = e; Kt !== null; ) {
          l = Kt;
          var d = l.sibling, h = l.return;
          if (Lv(l), l === r) {
            Kt = null;
            break e;
          }
          if (d !== null) {
            d.return = h, Kt = d;
            break e;
          }
          Kt = h;
        }
    }
  }
  var uj = {
    getCacheForType: function(e) {
      var n = Jt(Ut), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return Jt(Ut).controller.signal;
    }
  }, dj = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ht = null, Pe = null, Xe = 0, nt = 0, Rn = null, nr = !1, Ti = !1, bd = !1, za = 0, Tt = 0, ar = 0, Ir = 0, xd = 0, _n = 0, Ci = 0, Ls = null, yn = null, Sd = !1, vo = 0, Pv = 0, go = 1 / 0, yo = null, rr = null, Gt = 0, ir = null, Ri = null, Oa = 0, wd = 0, jd = null, Kv = null, Us = 0, Ed = null;
  function Mn() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : k.T !== null ? Md() : me();
  }
  function Xv() {
    if (_n === 0)
      if ((Xe & 536870912) === 0 || Ze) {
        var e = ea;
        ea <<= 1, (ea & 3932160) === 0 && (ea = 262144), _n = e;
      } else _n = 536870912;
    return e = Tn.current, e !== null && (e.flags |= 32), _n;
  }
  function bn(e, n, r) {
    (e === ht && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null) && (_i(e, 0), sr(
      e,
      Xe,
      _n,
      !1
    )), it(e, r), ((tt & 2) === 0 || e !== ht) && (e === ht && ((tt & 2) === 0 && (Ir |= r), Tt === 4 && sr(
      e,
      Xe,
      _n,
      !1
    )), ma(e));
  }
  function Qv(e, n, r) {
    if ((tt & 6) !== 0) throw Error(s(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || dt(e, n), d = l ? mj(e, n) : Td(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ti && !l && sr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !fj(r)) {
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
              d = Ls;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (_i(E, x).flags |= 256), x = Td(
                E,
                x,
                !1
              ), x !== 2) {
                if (bd && !L) {
                  E.errorRecoveryDisabledLanes |= h, Ir |= h, d = 4;
                  break e;
                }
                h = yn, yn = d, h !== null && (yn === null ? yn = h : yn.push.apply(
                  yn,
                  h
                ));
              }
              d = x;
            }
            if (h = !1, d !== 2) continue;
          }
        }
        if (d === 1) {
          _i(e, 0), sr(e, n, 0, !0);
          break;
        }
        e: {
          switch (l = e, h = d, h) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              sr(
                l,
                n,
                _n,
                !nr
              );
              break e;
            case 2:
              yn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (d = vo + 300 - Rt(), 10 < d)) {
            if (sr(
              l,
              n,
              _n,
              !nr
            ), Oe(l, 0, !0) !== 0) break e;
            Oa = n, l.timeoutHandle = Cg(
              Zv.bind(
                null,
                l,
                r,
                yn,
                yo,
                Sd,
                n,
                _n,
                Ir,
                Ci,
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
          Zv(
            l,
            r,
            yn,
            yo,
            Sd,
            n,
            _n,
            Ir,
            Ci,
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
    ma(e);
  }
  function Zv(e, n, r, l, d, h, x, E, L, W, ue, he, ie, le) {
    if (e.timeoutHandle = -1, he = n.subtreeFlags, he & 8192 || (he & 16785408) === 16785408) {
      he = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: xa
      }, Iv(
        n,
        h,
        he
      );
      var Ne = (h & 62914560) === h ? vo - Rt() : (h & 4194048) === h ? Pv - Rt() : 0;
      if (Ne = Qj(
        he,
        Ne
      ), Ne !== null) {
        Oa = h, e.cancelPendingCommit = Ne(
          ig.bind(
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
            ue,
            he,
            null,
            ie,
            le
          )
        ), sr(e, h, x, !W);
        return;
      }
    }
    ig(
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
  function fj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!En(h(), d)) return !1;
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
  function sr(e, n, r, l) {
    n &= ~xd, n &= ~Ir, e.suspendedLanes |= n, e.pingedLanes &= ~n, l && (e.warmLanes |= n), l = e.expirationTimes;
    for (var d = n; 0 < d; ) {
      var h = 31 - jt(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && ba(e, r, n);
  }
  function bo() {
    return (tt & 6) === 0 ? ($s(0), !1) : !0;
  }
  function Nd() {
    if (Pe !== null) {
      if (nt === 0)
        var e = Pe.return;
      else
        e = Pe, Ea = zr = null, Hu(e), bi = null, xs = 0, e = Pe;
      for (; e !== null; )
        Rv(e.alternate, e), e = e.return;
      Pe = null;
    }
  }
  function _i(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Dj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), Oa = 0, Nd(), ht = e, Pe = r = wa(e.current, null), Xe = n, nt = 0, Rn = null, nr = !1, Ti = dt(e, n), bd = !1, Ci = _n = xd = Ir = ar = Tt = 0, yn = Ls = null, Sd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - jt(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return za = n, Bl(), r;
  }
  function Jv(e, n) {
    Ve = null, k.H = Rs, n === yi || n === Pl ? (n = mp(), nt = 3) : n === _u ? (n = mp(), nt = 4) : nt = n === ad ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Rn = n, Pe === null && (Tt = 1, lo(
      e,
      Bn(n, e.current)
    ));
  }
  function Wv() {
    var e = Tn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? In === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === In : !1;
  }
  function eg() {
    var e = k.H;
    return k.H = Rs, e === null ? Rs : e;
  }
  function tg() {
    var e = k.A;
    return k.A = uj, e;
  }
  function xo() {
    Tt = 4, nr || (Xe & 4194048) !== Xe && Tn.current !== null || (Ti = !0), (ar & 134217727) === 0 && (Ir & 134217727) === 0 || ht === null || sr(
      ht,
      Xe,
      _n,
      !1
    );
  }
  function Td(e, n, r) {
    var l = tt;
    tt |= 2;
    var d = eg(), h = tg();
    (ht !== e || Xe !== n) && (yo = null, _i(e, n)), n = !1;
    var x = Tt;
    e: do
      try {
        if (nt !== 0 && Pe !== null) {
          var E = Pe, L = Rn;
          switch (nt) {
            case 8:
              Nd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Tn.current === null && (n = !0);
              var W = nt;
              if (nt = 0, Rn = null, Mi(e, E, L, W), r && Ti) {
                x = 0;
                break e;
              }
              break;
            default:
              W = nt, nt = 0, Rn = null, Mi(e, E, L, W);
          }
        }
        hj(), x = Tt;
        break;
      } catch (ue) {
        Jv(e, ue);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ea = zr = null, tt = l, k.H = d, k.A = h, Pe === null && (ht = null, Xe = 0, Bl()), x;
  }
  function hj() {
    for (; Pe !== null; ) ng(Pe);
  }
  function mj(e, n) {
    var r = tt;
    tt |= 2;
    var l = eg(), d = tg();
    ht !== e || Xe !== n ? (yo = null, go = Rt() + 500, _i(e, n)) : Ti = dt(
      e,
      n
    );
    e: do
      try {
        if (nt !== 0 && Pe !== null) {
          n = Pe;
          var h = Rn;
          t: switch (nt) {
            case 1:
              nt = 0, Rn = null, Mi(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (fp(h)) {
                nt = 0, Rn = null, ag(n);
                break;
              }
              n = function() {
                nt !== 2 && nt !== 9 || ht !== e || (nt = 7), ma(e);
              }, h.then(n, n);
              break e;
            case 3:
              nt = 7;
              break e;
            case 4:
              nt = 5;
              break e;
            case 7:
              fp(h) ? (nt = 0, Rn = null, ag(n)) : (nt = 0, Rn = null, Mi(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (Pe.tag) {
                case 26:
                  x = Pe.memoizedState;
                case 5:
                case 27:
                  var E = Pe;
                  if (x ? qg(x) : E.stateNode.complete) {
                    nt = 0, Rn = null;
                    var L = E.sibling;
                    if (L !== null) Pe = L;
                    else {
                      var W = E.return;
                      W !== null ? (Pe = W, So(W)) : Pe = null;
                    }
                    break t;
                  }
              }
              nt = 0, Rn = null, Mi(e, n, h, 5);
              break;
            case 6:
              nt = 0, Rn = null, Mi(e, n, h, 6);
              break;
            case 8:
              Nd(), Tt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        pj();
        break;
      } catch (ue) {
        Jv(e, ue);
      }
    while (!0);
    return Ea = zr = null, k.H = l, k.A = d, tt = r, Pe !== null ? 0 : (ht = null, Xe = 0, Bl(), Tt);
  }
  function pj() {
    for (; Pe !== null && !Ct(); )
      ng(Pe);
  }
  function ng(e) {
    var n = Tv(e.alternate, e, za);
    e.memoizedProps = e.pendingProps, n === null ? So(e) : Pe = n;
  }
  function ag(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = xv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = xv(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Xe
        );
        break;
      case 5:
        Hu(n);
      default:
        Rv(r, n), n = Pe = tp(n, za), n = Tv(r, n, za);
    }
    e.memoizedProps = e.pendingProps, n === null ? So(e) : Pe = n;
  }
  function Mi(e, n, r, l) {
    Ea = zr = null, Hu(n), bi = null, xs = 0;
    var d = n.return;
    try {
      if (aj(
        e,
        d,
        n,
        r,
        Xe
      )) {
        Tt = 1, lo(
          e,
          Bn(r, e.current)
        ), Pe = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw Pe = d, h;
      Tt = 1, lo(
        e,
        Bn(r, e.current)
      ), Pe = null;
      return;
    }
    n.flags & 32768 ? (Ze || l === 1 ? e = !0 : Ti || (Xe & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Tn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), rg(n, e)) : So(n);
  }
  function So(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        rg(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = sj(
        n.alternate,
        n,
        za
      );
      if (r !== null) {
        Pe = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        Pe = n;
        return;
      }
      Pe = n = e;
    } while (n !== null);
    Tt === 0 && (Tt = 5);
  }
  function rg(e, n) {
    do {
      var r = lj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Pe = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        Pe = e;
        return;
      }
      Pe = e = r;
    } while (e !== null);
    Tt = 6, Pe = null;
  }
  function ig(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      wo();
    while (Gt !== 0);
    if ((tt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      if (h = n.lanes | n.childLanes, h |= mu, Qt(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === ht && (Pe = ht = null, Xe = 0), Ri = n, ir = e, Oa = r, wd = h, jd = d, Kv = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, bj(be, function() {
        return ug(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null, d = U.p, U.p = 2, x = tt, tt |= 4;
        try {
          oj(e, n, r);
        } finally {
          tt = x, U.p = d, k.T = l;
        }
      }
      Gt = 1, sg(), lg(), og();
    }
  }
  function sg() {
    if (Gt === 1) {
      Gt = 0;
      var e = ir, n = Ri, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = k.T, k.T = null;
        var l = U.p;
        U.p = 2;
        var d = tt;
        tt |= 4;
        try {
          Vv(n, e);
          var h = $d, x = Gm(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Ym(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && cu(E)) {
              var W = L.start, ue = L.end;
              if (ue === void 0 && (ue = W), "selectionStart" in E)
                E.selectionStart = W, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var he = E.ownerDocument || document, ie = he && he.defaultView || window;
                if (ie.getSelection) {
                  var le = ie.getSelection(), Ne = E.textContent.length, ze = Math.min(L.start, Ne), ct = L.end === void 0 ? ze : Math.min(L.end, Ne);
                  !le.extend && ze > ct && (x = ct, ct = ze, ze = x);
                  var P = Fm(
                    E,
                    ze
                  ), B = Fm(
                    E,
                    ct
                  );
                  if (P && B && (le.rangeCount !== 1 || le.anchorNode !== P.node || le.anchorOffset !== P.offset || le.focusNode !== B.node || le.focusOffset !== B.offset)) {
                    var J = he.createRange();
                    J.setStart(P.node, P.offset), le.removeAllRanges(), ze > ct ? (le.addRange(J), le.extend(B.node, B.offset)) : (J.setEnd(B.node, B.offset), le.addRange(J));
                  }
                }
              }
            }
            for (he = [], le = E; le = le.parentNode; )
              le.nodeType === 1 && he.push({
                element: le,
                left: le.scrollLeft,
                top: le.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < he.length; E++) {
              var fe = he[E];
              fe.element.scrollLeft = fe.left, fe.element.scrollTop = fe.top;
            }
          }
          zo = !!Ud, $d = Ud = null;
        } finally {
          tt = d, U.p = l, k.T = r;
        }
      }
      e.current = n, Gt = 2;
    }
  }
  function lg() {
    if (Gt === 2) {
      Gt = 0;
      var e = ir, n = Ri, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = k.T, k.T = null;
        var l = U.p;
        U.p = 2;
        var d = tt;
        tt |= 4;
        try {
          Ov(e, n.alternate, n);
        } finally {
          tt = d, U.p = l, k.T = r;
        }
      }
      Gt = 3;
    }
  }
  function og() {
    if (Gt === 4 || Gt === 3) {
      Gt = 0, nn();
      var e = ir, n = Ri, r = Oa, l = Kv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Gt = 5 : (Gt = 0, Ri = ir = null, cg(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Z(r), n = n.stateNode, _t && typeof _t.onCommitFiberRoot == "function")
        try {
          _t.onCommitFiberRoot(
            fn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        n = k.T, d = U.p, U.p = 2, k.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < l.length; x++) {
            var E = l[x];
            h(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          k.T = n, U.p = d;
        }
      }
      (Oa & 3) !== 0 && wo(), ma(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Ed ? Us++ : (Us = 0, Ed = e) : Us = 0, $s(0);
    }
  }
  function cg(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, ys(n)));
  }
  function wo() {
    return sg(), lg(), og(), ug();
  }
  function ug() {
    if (Gt !== 5) return !1;
    var e = ir, n = wd;
    wd = 0;
    var r = Z(Oa), l = k.T, d = U.p;
    try {
      U.p = 32 > r ? 32 : r, k.T = null, r = jd, jd = null;
      var h = ir, x = Oa;
      if (Gt = 0, Ri = ir = null, Oa = 0, (tt & 6) !== 0) throw Error(s(331));
      var E = tt;
      if (tt |= 4, Yv(h.current), qv(
        h,
        h.current,
        x,
        r
      ), tt = E, $s(0, !1), _t && typeof _t.onPostCommitFiberRoot == "function")
        try {
          _t.onPostCommitFiberRoot(fn, h);
        } catch {
        }
      return !0;
    } finally {
      U.p = d, k.T = l, cg(e, n);
    }
  }
  function dg(e, n, r) {
    n = Bn(r, n), n = nd(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (it(e, 2), ma(e));
  }
  function at(e, n, r) {
    if (e.tag === 3)
      dg(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          dg(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Bn(r, e), r = fv(2), l = Ja(n, r, 2), l !== null && (hv(
              r,
              l,
              n,
              e
            ), it(l, 2), ma(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Cd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new dj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (bd = !0, d.add(r), e = vj.bind(null, e, n, r), n.then(e, e));
  }
  function vj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ht === e && (Xe & r) === r && (Tt === 4 || Tt === 3 && (Xe & 62914560) === Xe && 300 > Rt() - vo ? (tt & 2) === 0 && _i(e, 0) : xd |= r, Ci === Xe && (Ci = 0)), ma(e);
  }
  function fg(e, n) {
    n === 0 && (n = Yt()), e = Ar(e, n), e !== null && (it(e, n), ma(e));
  }
  function gj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), fg(e, r);
  }
  function yj(e, n) {
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
        throw Error(s(314));
    }
    l !== null && l.delete(n), fg(e, r);
  }
  function bj(e, n) {
    return un(e, n);
  }
  var jo = null, Ai = null, Rd = !1, Eo = !1, _d = !1, lr = 0;
  function ma(e) {
    e !== Ai && e.next === null && (Ai === null ? jo = Ai = e : Ai = Ai.next = e), Eo = !0, Rd || (Rd = !0, Sj());
  }
  function $s(e, n) {
    if (!_d && Eo) {
      _d = !0;
      do
        for (var r = !1, l = jo; l !== null; ) {
          if (e !== 0) {
            var d = l.pendingLanes;
            if (d === 0) var h = 0;
            else {
              var x = l.suspendedLanes, E = l.pingedLanes;
              h = (1 << 31 - jt(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, vg(l, h));
          } else
            h = Xe, h = Oe(
              l,
              l === ht ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || dt(l, h) || (r = !0, vg(l, h));
          l = l.next;
        }
      while (r);
      _d = !1;
    }
  }
  function xj() {
    hg();
  }
  function hg() {
    Eo = Rd = !1;
    var e = 0;
    lr !== 0 && Aj() && (e = lr);
    for (var n = Rt(), r = null, l = jo; l !== null; ) {
      var d = l.next, h = mg(l, n);
      h === 0 ? (l.next = null, r === null ? jo = d : r.next = d, d === null && (Ai = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Eo = !0)), l = d;
    }
    Gt !== 0 && Gt !== 5 || $s(e), lr !== 0 && (lr = 0);
  }
  function mg(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - jt(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = zt(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = ht, r = Xe, r = Oe(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (nt === 2 || nt === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Wn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || dt(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && Wn(l), Z(r)) {
        case 2:
        case 8:
          r = xe;
          break;
        case 32:
          r = be;
          break;
        case 268435456:
          r = $e;
          break;
        default:
          r = be;
      }
      return l = pg.bind(null, e), r = un(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && Wn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function pg(e, n) {
    if (Gt !== 0 && Gt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (wo() && e.callbackNode !== r)
      return null;
    var l = Xe;
    return l = Oe(
      e,
      e === ht ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Qv(e, l, n), mg(e, Rt()), e.callbackNode != null && e.callbackNode === r ? pg.bind(null, e) : null);
  }
  function vg(e, n) {
    if (wo()) return null;
    Qv(e, n, !0);
  }
  function Sj() {
    kj(function() {
      (tt & 6) !== 0 ? un(
        ve,
        xj
      ) : hg();
    });
  }
  function Md() {
    if (lr === 0) {
      var e = vi;
      e === 0 && (e = ya, ya <<= 1, (ya & 261888) === 0 && (ya = 256)), lr = e;
    }
    return lr;
  }
  function gg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Al("" + e);
  }
  function yg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function wj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = gg(
        (d[we] || null).action
      ), x = l.submitter;
      x && (n = (n = x[we] || null) ? gg(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
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
                  var L = x ? yg(d, x) : new FormData(d);
                  Qu(
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
                typeof h == "function" && (E.preventDefault(), L = x ? yg(d, x) : new FormData(d), Qu(
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
  for (var Ad = 0; Ad < hu.length; Ad++) {
    var Dd = hu[Ad], jj = Dd.toLowerCase(), Ej = Dd[0].toUpperCase() + Dd.slice(1);
    na(
      jj,
      "on" + Ej
    );
  }
  na(Xm, "onAnimationEnd"), na(Qm, "onAnimationIteration"), na(Zm, "onAnimationStart"), na("dblclick", "onDoubleClick"), na("focusin", "onFocus"), na("focusout", "onBlur"), na(Vw, "onTransitionRun"), na(Hw, "onTransitionStart"), na(qw, "onTransitionCancel"), na(Jm, "onTransitionEnd"), ca("onMouseEnter", ["mouseout", "mouseover"]), ca("onMouseLeave", ["mouseout", "mouseover"]), ca("onPointerEnter", ["pointerout", "pointerover"]), ca("onPointerLeave", ["pointerout", "pointerover"]), Pt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Pt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Pt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Pt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Pt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Pt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Nj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bs)
  );
  function bg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], L = E.instance, W = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = W;
            try {
              h(d);
            } catch (ue) {
              $l(ue);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, W = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = W;
            try {
              h(d);
            } catch (ue) {
              $l(ue);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function Ke(e, n) {
    var r = n[Ee];
    r === void 0 && (r = n[Ee] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (xg(n, e, 2, !1), r.add(l));
  }
  function kd(e, n, r) {
    var l = 0;
    n && (l |= 4), xg(
      r,
      e,
      l,
      n
    );
  }
  var No = "_reactListening" + Math.random().toString(36).slice(2);
  function zd(e) {
    if (!e[No]) {
      e[No] = !0, Fa.forEach(function(r) {
        r !== "selectionchange" && (Nj.has(r) || kd(r, !1, e), kd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[No] || (n[No] = !0, kd("selectionchange", !1, n));
    }
  }
  function xg(e, n, r, l) {
    switch (Xg(n)) {
      case 2:
        var d = Wj;
        break;
      case 8:
        d = eE;
        break;
      default:
        d = Xd;
    }
    r = d.bind(
      null,
      n,
      r,
      e
    ), d = void 0, !eu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (d = !0), l ? d !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: d
    }) : e.addEventListener(n, r, !0) : d !== void 0 ? e.addEventListener(n, r, {
      passive: d
    }) : e.addEventListener(n, r, !1);
  }
  function Od(e, n, r, l, d) {
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
            if (x = st(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    Nm(function() {
      var W = h, ue = Jc(r), he = [];
      e: {
        var ie = Wm.get(e);
        if (ie !== void 0) {
          var le = Ol, Ne = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              le = yw;
              break;
            case "focusin":
              Ne = "focus", le = ru;
              break;
            case "focusout":
              Ne = "blur", le = ru;
              break;
            case "beforeblur":
            case "afterblur":
              le = ru;
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
              le = Rm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              le = sw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              le = Sw;
              break;
            case Xm:
            case Qm:
            case Zm:
              le = cw;
              break;
            case Jm:
              le = jw;
              break;
            case "scroll":
            case "scrollend":
              le = rw;
              break;
            case "wheel":
              le = Nw;
              break;
            case "copy":
            case "cut":
            case "paste":
              le = dw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              le = Mm;
              break;
            case "toggle":
            case "beforetoggle":
              le = Cw;
          }
          var ze = (n & 4) !== 0, ct = !ze && (e === "scroll" || e === "scrollend"), P = ze ? ie !== null ? ie + "Capture" : null : ie;
          ze = [];
          for (var B = W, J; B !== null; ) {
            var fe = B;
            if (J = fe.stateNode, fe = fe.tag, fe !== 5 && fe !== 26 && fe !== 27 || J === null || P === null || (fe = ls(B, P), fe != null && ze.push(
              Vs(B, fe, J)
            )), ct) break;
            B = B.return;
          }
          0 < ze.length && (ie = new le(
            ie,
            Ne,
            null,
            r,
            ue
          ), he.push({ event: ie, listeners: ze }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ie = e === "mouseover" || e === "pointerover", le = e === "mouseout" || e === "pointerout", ie && r !== Zc && (Ne = r.relatedTarget || r.fromElement) && (st(Ne) || Ne[Re]))
            break e;
          if ((le || ie) && (ie = ue.window === ue ? ue : (ie = ue.ownerDocument) ? ie.defaultView || ie.parentWindow : window, le ? (Ne = r.relatedTarget || r.toElement, le = W, Ne = Ne ? st(Ne) : null, Ne !== null && (ct = u(Ne), ze = Ne.tag, Ne !== ct || ze !== 5 && ze !== 27 && ze !== 6) && (Ne = null)) : (le = null, Ne = W), le !== Ne)) {
            if (ze = Rm, fe = "onMouseLeave", P = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (ze = Mm, fe = "onPointerLeave", P = "onPointerEnter", B = "pointer"), ct = le == null ? ie : Ge(le), J = Ne == null ? ie : Ge(Ne), ie = new ze(
              fe,
              B + "leave",
              le,
              r,
              ue
            ), ie.target = ct, ie.relatedTarget = J, fe = null, st(ue) === W && (ze = new ze(
              P,
              B + "enter",
              Ne,
              r,
              ue
            ), ze.target = J, ze.relatedTarget = ct, fe = ze), ct = fe, le && Ne)
              t: {
                for (ze = Tj, P = le, B = Ne, J = 0, fe = P; fe; fe = ze(fe))
                  J++;
                fe = 0;
                for (var De = B; De; De = ze(De))
                  fe++;
                for (; 0 < J - fe; )
                  P = ze(P), J--;
                for (; 0 < fe - J; )
                  B = ze(B), fe--;
                for (; J--; ) {
                  if (P === B || B !== null && P === B.alternate) {
                    ze = P;
                    break t;
                  }
                  P = ze(P), B = ze(B);
                }
                ze = null;
              }
            else ze = null;
            le !== null && Sg(
              he,
              ie,
              le,
              ze,
              !1
            ), Ne !== null && ct !== null && Sg(
              he,
              ct,
              Ne,
              ze,
              !0
            );
          }
        }
        e: {
          if (ie = W ? Ge(W) : window, le = ie.nodeName && ie.nodeName.toLowerCase(), le === "select" || le === "input" && ie.type === "file")
            var We = $m;
          else if (Lm(ie))
            if (Bm)
              We = Uw;
            else {
              We = Ow;
              var _e = zw;
            }
          else
            le = ie.nodeName, !le || le.toLowerCase() !== "input" || ie.type !== "checkbox" && ie.type !== "radio" ? W && Qc(W.elementType) && (We = $m) : We = Lw;
          if (We && (We = We(e, W))) {
            Um(
              he,
              We,
              r,
              ue
            );
            break e;
          }
          _e && _e(e, ie, W), e === "focusout" && W && ie.type === "number" && W.memoizedProps.value != null && Xc(ie, "number", ie.value);
        }
        switch (_e = W ? Ge(W) : window, e) {
          case "focusin":
            (Lm(_e) || _e.contentEditable === "true") && (oi = _e, uu = W, ps = null);
            break;
          case "focusout":
            ps = uu = oi = null;
            break;
          case "mousedown":
            du = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            du = !1, Pm(he, r, ue);
            break;
          case "selectionchange":
            if (Bw) break;
          case "keydown":
          case "keyup":
            Pm(he, r, ue);
        }
        var He;
        if (su)
          e: {
            switch (e) {
              case "compositionstart":
                var Qe = "onCompositionStart";
                break e;
              case "compositionend":
                Qe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Qe = "onCompositionUpdate";
                break e;
            }
            Qe = void 0;
          }
        else
          li ? zm(e, r) && (Qe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Qe = "onCompositionStart");
        Qe && (Am && r.locale !== "ko" && (li || Qe !== "onCompositionStart" ? Qe === "onCompositionEnd" && li && (He = Tm()) : (Ya = ue, tu = "value" in Ya ? Ya.value : Ya.textContent, li = !0)), _e = To(W, Qe), 0 < _e.length && (Qe = new _m(
          Qe,
          e,
          null,
          r,
          ue
        ), he.push({ event: Qe, listeners: _e }), He ? Qe.data = He : (He = Om(r), He !== null && (Qe.data = He)))), (He = _w ? Mw(e, r) : Aw(e, r)) && (Qe = To(W, "onBeforeInput"), 0 < Qe.length && (_e = new _m(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ue
        ), he.push({
          event: _e,
          listeners: Qe
        }), _e.data = He)), wj(
          he,
          e,
          W,
          r,
          ue
        );
      }
      bg(he, n);
    });
  }
  function Vs(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function To(e, n) {
    for (var r = n + "Capture", l = []; e !== null; ) {
      var d = e, h = d.stateNode;
      if (d = d.tag, d !== 5 && d !== 26 && d !== 27 || h === null || (d = ls(e, r), d != null && l.unshift(
        Vs(e, d, h)
      ), d = ls(e, n), d != null && l.push(
        Vs(e, d, h)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Tj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Sg(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, W = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || W === null || (L = W, d ? (W = ls(r, h), W != null && x.unshift(
        Vs(r, W, L)
      )) : d || (W = ls(r, h), W != null && x.push(
        Vs(r, W, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Cj = /\r\n?/g, Rj = /\u0000|\uFFFD/g;
  function wg(e) {
    return (typeof e == "string" ? e : "" + e).replace(Cj, `
`).replace(Rj, "");
  }
  function jg(e, n) {
    return n = wg(n), wg(e) === n;
  }
  function ot(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ri(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ri(e, "" + l);
        break;
      case "className":
        Mt(e, "class", l);
        break;
      case "tabIndex":
        Mt(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Mt(e, r, l);
        break;
      case "style":
        jm(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Mt(e, "data", l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && ot(e, n, "name", d.name, d, null), ot(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), ot(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), ot(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (ot(e, n, "encType", d.encType, d, null), ot(e, n, "method", d.method, d, null), ot(e, n, "target", d.target, d, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(r);
          break;
        }
        l = Al("" + l), e.setAttribute(r, l);
        break;
      case "onClick":
        l != null && (e.onclick = xa);
        break;
      case "onScroll":
        l != null && Ke("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ke("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(s(60));
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
        Ke("beforetoggle", e), Ke("toggle", e), Fe(e, "popover", l);
        break;
      case "xlinkActuate":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        rn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        rn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Fe(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = nw.get(r) || r, Fe(e, r, l));
    }
  }
  function Ld(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        jm(e, l, h);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (r = l.__html, r != null) {
            if (d.children != null) throw Error(s(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ri(e, l) : (typeof l == "number" || typeof l == "bigint") && ri(e, "" + l);
        break;
      case "onScroll":
        l != null && Ke("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Ke("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = xa);
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
        if (!ta.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[we] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : Fe(e, r, l);
          }
    }
  }
  function en(e, n, r) {
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
        Ke("error", e), Ke("load", e);
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
                  throw Error(s(137, n));
                default:
                  ot(e, n, h, x, r, null);
              }
          }
        d && ot(e, n, "srcSet", r.srcSet, r, null), l && ot(e, n, "src", r.src, r, null);
        return;
      case "input":
        Ke("invalid", e);
        var E = h = x = d = null, L = null, W = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var ue = r[l];
            if (ue != null)
              switch (l) {
                case "name":
                  d = ue;
                  break;
                case "type":
                  x = ue;
                  break;
                case "checked":
                  L = ue;
                  break;
                case "defaultChecked":
                  W = ue;
                  break;
                case "value":
                  h = ue;
                  break;
                case "defaultValue":
                  E = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(s(137, n));
                  break;
                default:
                  ot(e, n, l, ue, r, null);
              }
          }
        bm(
          e,
          h,
          E,
          L,
          W,
          x,
          d,
          !1
        );
        return;
      case "select":
        Ke("invalid", e), l = x = h = null;
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
                ot(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? ai(e, !!l, n, !1) : r != null && ai(e, !!l, r, !0);
        return;
      case "textarea":
        Ke("invalid", e), h = d = l = null;
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
                if (E != null) throw Error(s(91));
                break;
              default:
                ot(e, n, x, E, r, null);
            }
        Sm(e, l, d, h);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ot(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        Ke("beforetoggle", e), Ke("toggle", e), Ke("cancel", e), Ke("close", e);
        break;
      case "iframe":
      case "object":
        Ke("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bs.length; l++)
          Ke(Bs[l], e);
        break;
      case "image":
        Ke("error", e), Ke("load", e);
        break;
      case "details":
        Ke("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ke("error", e), Ke("load", e);
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
        for (W in r)
          if (r.hasOwnProperty(W) && (l = r[W], l != null))
            switch (W) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                ot(e, n, W, l, r, null);
            }
        return;
      default:
        if (Qc(n)) {
          for (ue in r)
            r.hasOwnProperty(ue) && (l = r[ue], l !== void 0 && Ld(
              e,
              n,
              ue,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && ot(e, n, E, l, r, null));
  }
  function _j(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, W = null, ue = null;
        for (le in r) {
          var he = r[le];
          if (r.hasOwnProperty(le) && he != null)
            switch (le) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = he;
              default:
                l.hasOwnProperty(le) || ot(e, n, le, null, l, he);
            }
        }
        for (var ie in l) {
          var le = l[ie];
          if (he = r[ie], l.hasOwnProperty(ie) && (le != null || he != null))
            switch (ie) {
              case "type":
                h = le;
                break;
              case "name":
                d = le;
                break;
              case "checked":
                W = le;
                break;
              case "defaultChecked":
                ue = le;
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
                  throw Error(s(137, n));
                break;
              default:
                le !== he && ot(
                  e,
                  n,
                  ie,
                  le,
                  l,
                  he
                );
            }
        }
        Kc(
          e,
          x,
          E,
          L,
          W,
          ue,
          h,
          d
        );
        return;
      case "select":
        le = x = E = ie = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                le = L;
              default:
                l.hasOwnProperty(h) || ot(
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
                ie = h;
                break;
              case "defaultValue":
                E = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== L && ot(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = le, ie != null ? ai(e, !!r, ie, !1) : !!l != !!r && (n != null ? ai(e, !!r, n, !0) : ai(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        le = ie = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                ie = d;
                break;
              case "defaultValue":
                le = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(s(91));
                break;
              default:
                d !== h && ot(e, n, x, d, l, h);
            }
        xm(e, ie, le);
        return;
      case "option":
        for (var Ne in r)
          if (ie = r[Ne], r.hasOwnProperty(Ne) && ie != null && !l.hasOwnProperty(Ne))
            switch (Ne) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  n,
                  Ne,
                  null,
                  l,
                  ie
                );
            }
        for (L in l)
          if (ie = l[L], le = r[L], l.hasOwnProperty(L) && ie !== le && (ie != null || le != null))
            switch (L) {
              case "selected":
                e.selected = ie && typeof ie != "function" && typeof ie != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  L,
                  ie,
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
        for (var ze in r)
          ie = r[ze], r.hasOwnProperty(ze) && ie != null && !l.hasOwnProperty(ze) && ot(e, n, ze, null, l, ie);
        for (W in l)
          if (ie = l[W], le = r[W], l.hasOwnProperty(W) && ie !== le && (ie != null || le != null))
            switch (W) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(s(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  W,
                  ie,
                  l,
                  le
                );
            }
        return;
      default:
        if (Qc(n)) {
          for (var ct in r)
            ie = r[ct], r.hasOwnProperty(ct) && ie !== void 0 && !l.hasOwnProperty(ct) && Ld(
              e,
              n,
              ct,
              void 0,
              l,
              ie
            );
          for (ue in l)
            ie = l[ue], le = r[ue], !l.hasOwnProperty(ue) || ie === le || ie === void 0 && le === void 0 || Ld(
              e,
              n,
              ue,
              ie,
              l,
              le
            );
          return;
        }
    }
    for (var P in r)
      ie = r[P], r.hasOwnProperty(P) && ie != null && !l.hasOwnProperty(P) && ot(e, n, P, null, l, ie);
    for (he in l)
      ie = l[he], le = r[he], !l.hasOwnProperty(he) || ie === le || ie == null && le == null || ot(e, n, he, ie, l, le);
  }
  function Eg(e) {
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
  function Mj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && Eg(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], W = L.startTime;
            if (W > E) break;
            var ue = L.transferSize, he = L.initiatorType;
            ue && Eg(he) && (L = L.responseEnd, x += ue * (L < E ? 1 : (E - W) / (L - W)));
          }
          if (--l, n += 8 * (h + x) / (d.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Ud = null, $d = null;
  function Co(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ng(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Tg(e, n) {
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
  function Bd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Vd = null;
  function Aj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Vd ? !1 : (Vd = e, !0) : (Vd = null, !1);
  }
  var Cg = typeof setTimeout == "function" ? setTimeout : void 0, Dj = typeof clearTimeout == "function" ? clearTimeout : void 0, Rg = typeof Promise == "function" ? Promise : void 0, kj = typeof queueMicrotask == "function" ? queueMicrotask : typeof Rg < "u" ? function(e) {
    return Rg.resolve(null).then(e).catch(zj);
  } : Cg;
  function zj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function _g(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), Oi(n);
            return;
          }
          l--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          l++;
        else if (r === "html")
          Hs(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Hs(r);
          for (var h = r.firstChild; h; ) {
            var x = h.nextSibling, E = h.nodeName;
            h[Ie] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Hs(e.ownerDocument.body);
      r = d;
    } while (r);
    Oi(n);
  }
  function Mg(e, n) {
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
          Hd(r), ft(r);
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
  function Oj(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ie])
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
      if (e = Fn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Lj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Fn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ag(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Fn(e.nextSibling), e === null)) return null;
    return e;
  }
  function qd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Id(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Uj(e, n) {
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
  function Fn(e) {
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
  var Fd = null;
  function Dg(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return Fn(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function kg(e) {
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
  function zg(e, n, r) {
    switch (n = Co(r), e) {
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
  function Hs(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    ft(e);
  }
  var Yn = /* @__PURE__ */ new Map(), Og = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var La = U.d;
  U.d = {
    f: $j,
    r: Bj,
    D: Vj,
    C: Hj,
    L: qj,
    m: Ij,
    X: Yj,
    S: Fj,
    M: Gj
  };
  function $j() {
    var e = La.f(), n = bo();
    return e || n;
  }
  function Bj(e) {
    var n = xt(e);
    n !== null && n.tag === 5 && n.type === "form" ? Jp(n) : La.r(e);
  }
  var Di = typeof document > "u" ? null : document;
  function Lg(e, n, r) {
    var l = Di;
    if (l && typeof n == "string" && n) {
      var d = Un(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), Og.has(d) || (Og.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), en(n, "link", e), vt(n), l.head.appendChild(n)));
    }
  }
  function Vj(e) {
    La.D(e), Lg("dns-prefetch", e, null);
  }
  function Hj(e, n) {
    La.C(e, n), Lg("preconnect", e, n);
  }
  function qj(e, n, r) {
    La.L(e, n, r);
    var l = Di;
    if (l && e && n) {
      var d = 'link[rel="preload"][as="' + Un(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (d += '[imagesrcset="' + Un(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (d += '[imagesizes="' + Un(
        r.imageSizes
      ) + '"]')) : d += '[href="' + Un(e) + '"]';
      var h = d;
      switch (n) {
        case "style":
          h = ki(e);
          break;
        case "script":
          h = zi(e);
      }
      Yn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Yn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(qs(h)) || n === "script" && l.querySelector(Is(h)) || (n = l.createElement("link"), en(n, "link", e), vt(n), l.head.appendChild(n)));
    }
  }
  function Ij(e, n) {
    La.m(e, n);
    var r = Di;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + Un(l) + '"][href="' + Un(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = zi(e);
      }
      if (!Yn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Yn.set(h, e), r.querySelector(d) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Is(h)))
              return;
        }
        l = r.createElement("link"), en(l, "link", e), vt(l), r.head.appendChild(l);
      }
    }
  }
  function Fj(e, n, r) {
    La.S(e, n, r);
    var l = Di;
    if (l && e) {
      var d = Ot(l).hoistableStyles, h = ki(e);
      n = n || "default";
      var x = d.get(h);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = l.querySelector(
          qs(h)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Yn.get(h)) && Yd(e, r);
          var L = x = l.createElement("link");
          vt(L), en(L, "link", e), L._p = new Promise(function(W, ue) {
            L.onload = W, L.onerror = ue;
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
  function Yj(e, n) {
    La.X(e, n);
    var r = Di;
    if (r && e) {
      var l = Ot(r).hoistableScripts, d = zi(e), h = l.get(d);
      h || (h = r.querySelector(Is(d)), h || (e = v({ src: e, async: !0 }, n), (n = Yn.get(d)) && Gd(e, n), h = r.createElement("script"), vt(h), en(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Gj(e, n) {
    La.M(e, n);
    var r = Di;
    if (r && e) {
      var l = Ot(r).hoistableScripts, d = zi(e), h = l.get(d);
      h || (h = r.querySelector(Is(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Yn.get(d)) && Gd(e, n), h = r.createElement("script"), vt(h), en(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Ug(e, n, r, l) {
    var d = (d = ae.current) ? Ro(d) : null;
    if (!d) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = ki(r.href), r = Ot(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = ki(r.href);
          var h = Ot(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            qs(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Yn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Yn.set(e, r), h || Pj(
            d,
            e,
            r,
            x.state
          ))), n && l === null)
            throw Error(s(528, ""));
          return x;
        }
        if (n && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = zi(r), r = Ot(
          d
        ).hoistableScripts, l = r.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function ki(e) {
    return 'href="' + Un(e) + '"';
  }
  function qs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function $g(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Pj(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), en(n, "link", r), vt(n), e.head.appendChild(n));
  }
  function zi(e) {
    return '[src="' + Un(e) + '"]';
  }
  function Is(e) {
    return "script[async]" + e;
  }
  function Bg(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Un(r.href) + '"]'
          );
          if (l)
            return n.instance = l, vt(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), vt(l), en(l, "style", d), _o(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = ki(r.href);
          var h = e.querySelector(
            qs(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, vt(h), h;
          l = $g(r), (d = Yn.get(d)) && Yd(l, d), h = (e.ownerDocument || e).createElement("link"), vt(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), en(h, "link", l), n.state.loading |= 4, _o(h, r.precedence, e), n.instance = h;
        case "script":
          return h = zi(r.src), (d = e.querySelector(
            Is(h)
          )) ? (n.instance = d, vt(d), d) : (l = r, (d = Yn.get(h)) && (l = v({}, r), Gd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), vt(d), en(d, "link", l), e.head.appendChild(d), n.instance = d);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
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
  function Yd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function Gd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Mo = null;
  function Vg(e, n, r) {
    if (Mo === null) {
      var l = /* @__PURE__ */ new Map(), d = Mo = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Mo, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[Ie] || h[Se] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Hg(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Kj(e, n, r) {
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
  function qg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Xj(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = ki(l.href), h = n.querySelector(
          qs(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ao.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, vt(h);
          return;
        }
        h = n.ownerDocument || n, l = $g(l), (d = Yn.get(d)) && Yd(l, d), h = h.createElement("link"), vt(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), en(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Ao.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Pd = 0;
  function Qj(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Pd === 0 && (Pd = 62500 * Mj());
      var d = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Pd ? 50 : 800) + n
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Do = /* @__PURE__ */ new Map(), n.forEach(Zj, e), Do = null, Ao.call(e));
  }
  function Zj(e, n) {
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
  var Fs = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0
  };
  function Jj(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = jn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jn(0), this.hiddenUpdates = jn(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ig(e, n, r, l, d, h, x, E, L, W, ue, he) {
    return e = new Jj(
      e,
      n,
      r,
      x,
      L,
      W,
      ue,
      he,
      E
    ), n = 1, h === !0 && (n |= 24), h = Nn(3, null, null, n), e.current = h, h.stateNode = e, n = Tu(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Mu(h), e;
  }
  function Fg(e) {
    return e ? (e = di, e) : di;
  }
  function Yg(e, n, r, l, d, h) {
    d = Fg(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (bn(r, e, n), ws(r, e, n));
  }
  function Gg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Kd(e, n) {
    Gg(e, n), (e = e.alternate) && Gg(e, n);
  }
  function Pg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && bn(n, e, 67108864), Kd(e, 67108864);
    }
  }
  function Kg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mn();
      n = I(n);
      var r = Ar(e, n);
      r !== null && bn(r, e, n), Kd(e, n);
    }
  }
  var zo = !0;
  function Wj(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = U.p;
    try {
      U.p = 2, Xd(e, n, r, l);
    } finally {
      U.p = h, k.T = d;
    }
  }
  function eE(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = U.p;
    try {
      U.p = 8, Xd(e, n, r, l);
    } finally {
      U.p = h, k.T = d;
    }
  }
  function Xd(e, n, r, l) {
    if (zo) {
      var d = Qd(l);
      if (d === null)
        Od(
          e,
          n,
          l,
          Oo,
          r
        ), Qg(e, l);
      else if (nE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (Qg(e, l), n & 4 && -1 < tE.indexOf(e)) {
        for (; d !== null; ) {
          var h = xt(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = hn(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - jt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ma(h), (tt & 6) === 0 && (go = Rt() + 500, $s(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && bn(E, h, 2), bo(), Kd(h, 2);
            }
          if (h = Qd(l), h === null && Od(
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
        Od(
          e,
          n,
          l,
          null,
          r
        );
    }
  }
  function Qd(e) {
    return e = Jc(e), Zd(e);
  }
  var Oo = null;
  function Zd(e) {
    if (Oo = null, e = st(e), e !== null) {
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
    return Oo = e, null;
  }
  function Xg(e) {
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
        switch (Q()) {
          case ve:
            return 2;
          case xe:
            return 8;
          case be:
          case rt:
            return 32;
          case $e:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jd = !1, cr = null, ur = null, dr = null, Ys = /* @__PURE__ */ new Map(), Gs = /* @__PURE__ */ new Map(), fr = [], tE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Qg(e, n) {
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
        Ys.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gs.delete(n.pointerId);
    }
  }
  function Ps(e, n, r, l, d, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: l,
      nativeEvent: h,
      targetContainers: [d]
    }, n !== null && (n = xt(n), n !== null && Pg(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function nE(e, n, r, l, d) {
    switch (n) {
      case "focusin":
        return cr = Ps(
          cr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "dragenter":
        return ur = Ps(
          ur,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "mouseover":
        return dr = Ps(
          dr,
          e,
          n,
          r,
          l,
          d
        ), !0;
      case "pointerover":
        var h = d.pointerId;
        return Ys.set(
          h,
          Ps(
            Ys.get(h) || null,
            e,
            n,
            r,
            l,
            d
          )
        ), !0;
      case "gotpointercapture":
        return h = d.pointerId, Gs.set(
          h,
          Ps(
            Gs.get(h) || null,
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
  function Zg(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, ge(e.priority, function() {
              Kg(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = p(r), n !== null) {
            e.blockedOn = n, ge(e.priority, function() {
              Kg(r);
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
      var r = Qd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var l = new r.constructor(
          r.type,
          r
        );
        Zc = l, r.target.dispatchEvent(l), Zc = null;
      } else
        return n = xt(r), n !== null && Pg(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Jg(e, n, r) {
    Lo(e) && r.delete(n);
  }
  function aE() {
    Jd = !1, cr !== null && Lo(cr) && (cr = null), ur !== null && Lo(ur) && (ur = null), dr !== null && Lo(dr) && (dr = null), Ys.forEach(Jg), Gs.forEach(Jg);
  }
  function Uo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Jd || (Jd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      aE
    )));
  }
  var $o = null;
  function Wg(e) {
    $o !== e && ($o = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        $o === e && ($o = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], l = e[n + 1], d = e[n + 2];
          if (typeof l != "function") {
            if (Zd(l || r) === null)
              continue;
            break;
          }
          var h = xt(r);
          h !== null && (e.splice(n, 3), n -= 3, Qu(
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
  function Oi(e) {
    function n(L) {
      return Uo(L, e);
    }
    cr !== null && Uo(cr, e), ur !== null && Uo(ur, e), dr !== null && Uo(dr, e), Ys.forEach(n), Gs.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      Zg(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[we] || null;
        if (typeof h == "function")
          x || Wg(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[we] || null)
              E = x.formAction;
            else if (Zd(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), Wg(r);
        }
      }
  }
  function ey() {
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
  function Wd(e) {
    this._internalRoot = e;
  }
  Bo.prototype.render = Wd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var r = n.current, l = Mn();
    Yg(r, l, e, n, null, null);
  }, Bo.prototype.unmount = Wd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Yg(e.current, 2, null, e, null, null), bo(), n[Re] = null;
    }
  };
  function Bo(e) {
    this._internalRoot = e;
  }
  Bo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = me();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < fr.length && n !== 0 && n < fr[r].priority; r++) ;
      fr.splice(r, 0, e), r === 0 && Zg(e);
    }
  };
  var ty = a.version;
  if (ty !== "19.2.5")
    throw Error(
      s(
        527,
        ty,
        "19.2.5"
      )
    );
  U.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = m(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var rE = {
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
        fn = Vo.inject(
          rE
        ), _t = Vo;
      } catch {
      }
  }
  return Xs.createRoot = function(e, n) {
    if (!o(e)) throw Error(s(299));
    var r = !1, l = "", d = ov, h = cv, x = uv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Ig(
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
      ey
    ), e[Re] = n.current, zd(e), new Wd(n);
  }, Xs.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(s(299));
    var l = !1, d = "", h = ov, x = cv, E = uv, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Ig(
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
      ey
    ), n.context = Fg(null), r = n.current, l = Mn(), l = I(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, it(n, r), ma(n), e[Re] = n.current, zd(e), new Bo(n);
  }, Xs.version = "19.2.5", Xs;
}
var dy;
function pE() {
  if (dy) return nf.exports;
  dy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), nf.exports = mE(), nf.exports;
}
var vE = pE();
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
var gx = (t) => {
  throw TypeError(t);
}, gE = (t, a, i) => a.has(t) || gx("Cannot " + i), lf = (t, a, i) => (gE(t, a, "read from private field"), i ? i.call(t) : a.get(t)), yE = (t, a, i) => a.has(t) ? gx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function fy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function bE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: s = !1 } = t, o;
  o = a.map(
    (S, j) => b(
      S,
      typeof S == "string" ? null : S.state,
      j === 0 ? "default" : void 0,
      typeof S == "string" ? void 0 : S.unstable_mask
    )
  );
  let u = g(
    i ?? o.length - 1
  ), f = "POP", p = null;
  function g(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function m() {
    return o[u];
  }
  function b(S, j = null, N, C) {
    let T = Qf(
      o ? m().pathname : "/",
      S,
      j,
      N,
      C
    );
    return kt(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        S
      )}`
    ), T;
  }
  function v(S) {
    return typeof S == "string" ? S : va(S);
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
      let j = typeof S == "string" ? la(S) : S;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(S, j) {
      f = "PUSH";
      let N = fy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), s && p && p({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = fy(S) ? S : b(S, j);
      o[u] = N, s && p && p({ action: f, location: N, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = g(u + S), N = o[j];
      u = j, p && p({ action: f, location: N, delta: S });
    },
    listen(S) {
      return p = S, () => {
        p = null;
      };
    }
  };
}
function Ye(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function kt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function xE() {
  return Math.random().toString(36).substring(2, 10);
}
function Qf(t, a, i = null, s, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? la(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || xE(),
    unstable_mask: o
  };
}
function va({
  pathname: t = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function la(t) {
  let a = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && (a.hash = t.substring(i), t = t.substring(0, i));
    let s = t.indexOf("?");
    s >= 0 && (a.search = t.substring(s), t = t.substring(0, s)), t && (a.pathname = t);
  }
  return a;
}
function SE(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ye(i, "No window.location.(origin|href) available to create URL");
  let s = typeof t == "string" ? t : va(t);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var sl, hy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (yE(this, sl, /* @__PURE__ */ new Map()), t)
      for (let [a, i] of t)
        this.set(a, i);
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
    if (lf(this, sl).has(t))
      return lf(this, sl).get(t);
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
    lf(this, sl).set(t, a);
  }
};
sl = /* @__PURE__ */ new WeakMap();
var wE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function jE(t) {
  return wE.has(
    t
  );
}
var EE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function NE(t) {
  return EE.has(
    t
  );
}
function TE(t) {
  return t.index === !0;
}
function hl(t, a, i = [], s = {}, o = !1) {
  return t.map((u, f) => {
    let p = [...i, String(f)], g = typeof u.id == "string" ? u.id : p.join("-");
    if (Ye(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Ye(
      o || !s[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), TE(u)) {
      let m = {
        ...u,
        id: g
      };
      return s[g] = my(
        m,
        a(m)
      ), m;
    } else {
      let m = {
        ...u,
        id: g,
        children: void 0
      };
      return s[g] = my(
        m,
        a(m)
      ), u.children && (m.children = hl(
        u.children,
        a,
        p,
        s,
        o
      )), m;
    }
  });
}
function my(t, a) {
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
function yr(t, a, i = "/") {
  return ll(t, a, i, !1);
}
function ll(t, a, i, s) {
  let o = typeof a == "string" ? la(a) : a, u = Qn(o.pathname || "/", i);
  if (u == null)
    return null;
  let f = yx(t);
  RE(f);
  let p = null;
  for (let g = 0; p == null && g < f.length; ++g) {
    let m = BE(u);
    p = UE(
      f[g],
      m,
      s
    );
  }
  return p;
}
function CE(t, a) {
  let { route: i, pathname: s, params: o } = t;
  return {
    id: i.id,
    pathname: s,
    params: o,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function yx(t, a = [], i = [], s = "", o = !1) {
  let u = (f, p, g = o, m) => {
    let b = {
      relativePath: m === void 0 ? f.path || "" : m,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: p,
      route: f
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && g)
        return;
      Ye(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let v = Pn([s, b.relativePath]), w = i.concat(b);
    f.children && f.children.length > 0 && (Ye(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), yx(
      f.children,
      a,
      w,
      v,
      g
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: OE(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, p) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, p);
    else
      for (let g of bx(f.path))
        u(f, p, !0, g);
  }), a;
}
function bx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [u, ""] : [u];
  let f = bx(s.join("/")), p = [];
  return p.push(
    ...f.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), o && p.push(...f), p.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function RE(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : LE(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var _E = /^:[\w-]+$/, ME = 3, AE = 2, DE = 1, kE = 10, zE = -2, py = (t) => t === "*";
function OE(t, a) {
  let i = t.split("/"), s = i.length;
  return i.some(py) && (s += zE), a && (s += AE), i.filter((o) => !py(o)).reduce(
    (o, u) => o + (_E.test(u) ? ME : u === "" ? DE : kE),
    s
  );
}
function LE(t, a) {
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
function UE(t, a, i = !1) {
  let { routesMeta: s } = t, o = {}, u = "/", f = [];
  for (let p = 0; p < s.length; ++p) {
    let g = s[p], m = p === s.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = gc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: m },
      b
    ), w = g.route;
    if (!v && m && i && !s[s.length - 1].route.index && (v = gc(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), f.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Pn([u, v.pathname]),
      pathnameBase: qE(
        Pn([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = Pn([u, v.pathnameBase]));
  }
  return f;
}
function gc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, s] = $E(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), p = o.slice(1);
  return {
    params: s.reduce(
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
function $E(t, a = !1, i = !0) {
  kt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, p, g, m, b) => {
      if (s.push({ paramName: p, isOptional: g != null }), g) {
        let v = b.charAt(m + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (s.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function BE(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return kt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function Qn(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, s = t.charAt(i);
  return s && s !== "/" ? null : t.slice(i) || "/";
}
function VE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Pn([t, a]);
}
var xx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Rh = (t) => xx.test(t);
function HE(t, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof t == "string" ? la(t) : t, u;
  return i ? (i = Mh(i), i.startsWith("/") ? u = vy(i.substring(1), "/") : u = vy(i, a)) : u = a, {
    pathname: u,
    search: IE(s),
    hash: FE(o)
  };
}
function vy(t, a) {
  let i = yc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function of(t, a, i, s) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    s
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Sx(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function _h(t) {
  let a = Sx(t);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function zc(t, a, i, s = !1) {
  let o;
  typeof t == "string" ? o = la(t) : (o = { ...t }, Ye(
    !o.pathname || !o.pathname.includes("?"),
    of("?", "pathname", "search", o)
  ), Ye(
    !o.pathname || !o.pathname.includes("#"),
    of("#", "pathname", "hash", o)
  ), Ye(
    !o.search || !o.search.includes("#"),
    of("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, p;
  if (f == null)
    p = i;
  else {
    let v = a.length - 1;
    if (!s && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    p = v >= 0 ? a[v] : "/";
  }
  let g = HE(o, p), m = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (m || b) && (g.pathname += "/"), g;
}
var Mh = (t) => t.replace(/\/\/+/g, "/"), Pn = (t) => Mh(t.join("/")), yc = (t) => t.replace(/\/+$/, ""), qE = (t) => yc(t).replace(/^\/*/, "/"), IE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, FE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, YE = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let s = new Headers(i.headers);
  return s.set("Location", t), new Response(null, { ...i, headers: s });
}, Oc = class {
  constructor(t, a, i, s = !1) {
    this.status = t, this.statusText = a || "", this.internal = s, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ml(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Pn(a) || "/";
}
var wx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function jx(t, a) {
  let i = t;
  if (typeof i != "string" || !xx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (wx)
    try {
      let u = new URL(window.location.href), f = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), p = Qn(f.pathname, a);
      f.origin === u.origin && p != null ? i = p + f.search + f.hash : o = !0;
    } catch {
      kt(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: s,
    isExternal: o,
    to: i
  };
}
var xr = Symbol("Uninstrumented");
function GE(t, a) {
  let i = {
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
        let f = Object.keys(i);
        for (let p of f)
          u[p] && i[p].push(u[p]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Ii(i.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], p = i[`lazy.${u}`];
      if (typeof f == "function" && p.length > 0) {
        let g = Ii(p, f, () => {
        });
        g && (s.lazy = Object.assign(s.lazy || {}, {
          [u]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let u = a[o];
    if (typeof u == "function" && i[o].length > 0) {
      let f = u[xr] ?? u, p = Ii(
        i[o],
        f,
        (...g) => gy(g[0])
      );
      p && (o === "loader" && f.hydrate === !0 && (p.hydrate = !0), p[xr] = f, s[o] = p);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Ii(
      i.middleware,
      u,
      (...p) => gy(p[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), s;
}
function PE(t, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (s) => s({
      instrument(o) {
        let u = Object.keys(o);
        for (let f of u)
          o[f] && i[f].push(o[f]);
      }
    })
  ), i.navigate.length > 0) {
    let s = t.navigate[xr] ?? t.navigate, o = Ii(
      i.navigate,
      s,
      (...u) => {
        let [f, p] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? va(f) : ".",
          ...yy(t, p ?? {})
        };
      }
    );
    o && (o[xr] = s, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = t.fetch[xr] ?? t.fetch, o = Ii(i.fetch, s, (...u) => {
      let [f, , p, g] = u;
      return {
        href: p ?? ".",
        fetcherKey: f,
        ...yy(t, g ?? {})
      };
    });
    o && (o[xr] = s, t.fetch = o);
  }
  return t;
}
function Ii(t, a, i) {
  return t.length === 0 ? null : async (...s) => {
    let o = await Ex(
      t,
      i(...s),
      () => a(...s),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function Ex(t, a, i, s) {
  let o = t[s], u;
  if (o) {
    let f, p = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = Ex(t, a, i, s - 1), u = await f, Ye(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(p, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    f || await p(), await f;
  } else
    try {
      u = { type: "success", value: await i() };
    } catch (f) {
      u = { type: "error", value: f };
    }
  return u || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function gy(t) {
  let { request: a, context: i, params: s, unstable_pattern: o } = t;
  return {
    request: KE(a),
    params: { ...s },
    unstable_pattern: o,
    context: XE(i)
  };
}
function yy(t, a) {
  return {
    currentUrl: va(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function KE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function XE(t) {
  if (ZE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var QE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function ZE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === QE;
}
var Nx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], JE = new Set(
  Nx
), WE = [
  "GET",
  ...Nx
], eN = new Set(WE), Tx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), tN = /* @__PURE__ */ new Set([307, 308]), cf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, nN = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Qs = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, aN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Cx = "remix-router-transitions", Rx = Symbol("ResetLoaderData");
function rN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ye(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = t.hydrationRouteProperties || [], o = t.mapRouteProperties || aN, u = o;
  if (t.unstable_instrumentations) {
    let D = t.unstable_instrumentations;
    u = (I) => ({
      ...o(I),
      ...GE(
        D.map((Z) => Z.route).filter(Boolean),
        I
      )
    });
  }
  let f = {}, p = hl(
    t.routes,
    u,
    void 0,
    f
  ), g, m = t.basename || "/";
  m.startsWith("/") || (m = `/${m}`);
  let b = t.dataStrategy || cN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, C = null, T = t.hydrationData != null, A = yr(p, t.history.location, m), O = !1, R = null, H, X;
  if (A == null && !t.patchRoutesOnNavigation) {
    let D = Gn(404, {
      pathname: t.history.location.pathname
    }), { matches: I, route: Z } = Ho(p);
    H = !0, X = !H, A = I, R = { [Z.id]: D };
  } else if (A && !t.hydrationData && jn(
    A,
    p,
    t.history.location.pathname
  ).active && (A = null), A)
    if (A.some((D) => D.route.lazy))
      H = !1, X = !H;
    else if (!A.some((D) => Ah(D.route)))
      H = !0, X = !H;
    else {
      let D = t.hydrationData ? t.hydrationData.loaderData : null, I = t.hydrationData ? t.hydrationData.errors : null, Z = A;
      if (I) {
        let me = A.findIndex(
          (ge) => I[ge.route.id] !== void 0
        );
        Z = Z.slice(0, me + 1);
      }
      X = !1, H = !0, Z.forEach((me) => {
        let ge = _x(me.route, D, I);
        X = X || ge.renderFallback, H = H && !ge.shouldLoad;
      });
    }
  else {
    H = !1, X = !H, A = [];
    let D = jn(
      null,
      p,
      t.history.location.pathname
    );
    D.active && D.matches && (O = !0, A = D.matches);
  }
  let se, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: A,
    initialized: H,
    renderFallback: X,
    navigation: cf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || R,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", z = null, Y = !1, ee, K = !1, oe = /* @__PURE__ */ new Map(), ne = null, k = !1, U = !1, V = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), ce = 0, _ = -1, te = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), de = /* @__PURE__ */ new Map(), pe, Me = null;
  function Le() {
    if (w = t.history.listen(
      ({ action: D, location: I, delta: Z }) => {
        if (pe) {
          pe(), pe = void 0;
          return;
        }
        kt(
          de.size === 0 || Z != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let me = oa({
          currentLocation: M.location,
          nextLocation: I,
          historyAction: D
        });
        if (me && Z != null) {
          let ge = new Promise((Te) => {
            pe = Te;
          });
          t.history.go(Z * -1), ea(me, {
            state: "blocked",
            location: I,
            proceed() {
              ea(me, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: I
              }), ge.then(() => t.history.go(Z));
            },
            reset() {
              let Te = new Map(M.blockers);
              Te.set(me, Qs), Ue({ blockers: Te });
            }
          }), z?.resolve(), z = null;
          return;
        }
        return It(D, I);
      }
    ), i) {
      CN(a, oe);
      let D = () => RN(a, oe);
      a.addEventListener("pagehide", D), ne = () => a.removeEventListener("pagehide", D);
    }
    return M.initialized || It("POP", M.location, {
      initialHydration: !0
    }), se;
  }
  function je() {
    w && w(), ne && ne(), S.clear(), ee && ee.abort(), M.fetchers.forEach((D, I) => fn(I)), M.blockers.forEach((D, I) => ya(I));
  }
  function pt(D) {
    return S.add(D), () => S.delete(D);
  }
  function Ue(D, I = {}) {
    D.matches && (D.matches = D.matches.map((ge) => {
      let Te = f[ge.route.id], Se = ge.route;
      return Se.element !== Te.element || Se.errorElement !== Te.errorElement || Se.hydrateFallbackElement !== Te.hydrateFallbackElement ? {
        ...ge,
        route: Te
      } : ge;
    })), M = {
      ...M,
      ...D
    };
    let Z = [], me = [];
    M.fetchers.forEach((ge, Te) => {
      ge.state === "idle" && (ae.has(Te) ? Z.push(Te) : me.push(Te));
    }), ae.forEach((ge) => {
      !M.fetchers.has(ge) && !G.has(ge) && Z.push(ge);
    }), [...S].forEach(
      (ge) => ge(M, {
        deletedFetchers: Z,
        newErrors: D.errors ?? null,
        viewTransitionOpts: I.viewTransitionOpts,
        flushSync: I.flushSync === !0
      })
    ), Z.forEach((ge) => fn(ge)), me.forEach((ge) => M.fetchers.delete(ge));
  }
  function ut(D, I, { flushSync: Z } = {}) {
    let me = M.actionData != null && M.navigation.formMethod != null && ln(M.navigation.formMethod) && M.navigation.state === "loading" && D.state?._isRedirect !== !0, ge;
    I.actionData ? Object.keys(I.actionData).length > 0 ? ge = I.actionData : ge = null : me ? ge = M.actionData : ge = null;
    let Te = I.loaderData ? _y(
      M.loaderData,
      I.loaderData,
      I.matches || [],
      I.errors
    ) : M.loaderData, Se = M.blockers;
    Se.size > 0 && (Se = new Map(Se), Se.forEach((ke, Ae) => Se.set(Ae, Qs)));
    let we = k ? !1 : Yt(D, I.matches || M.matches), Re = Y === !0 || M.navigation.formMethod != null && ln(M.navigation.formMethod) && D.state?._isRedirect !== !0;
    g && (p = g, g = void 0), k || q === "POP" || (q === "PUSH" ? t.history.push(D, D.state) : q === "REPLACE" && t.history.replace(D, D.state));
    let Ee;
    if (q === "POP") {
      let ke = oe.get(M.location.pathname);
      ke && ke.has(D.pathname) ? Ee = {
        currentLocation: M.location,
        nextLocation: D
      } : oe.has(D.pathname) && (Ee = {
        currentLocation: D,
        nextLocation: M.location
      });
    } else if (K) {
      let ke = oe.get(M.location.pathname);
      ke ? ke.add(D.pathname) : (ke = /* @__PURE__ */ new Set([D.pathname]), oe.set(M.location.pathname, ke)), Ee = {
        currentLocation: M.location,
        nextLocation: D
      };
    }
    Ue(
      {
        ...I,
        // matches, errors, fetchers go through as-is
        actionData: ge,
        loaderData: Te,
        historyAction: q,
        location: D,
        initialized: !0,
        renderFallback: !1,
        navigation: cf,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: Re,
        blockers: Se
      },
      {
        viewTransitionOpts: Ee,
        flushSync: Z === !0
      }
    ), q = "POP", Y = !1, K = !1, k = !1, U = !1, z?.resolve(), z = null, Me?.resolve(), Me = null;
  }
  async function cn(D, I) {
    if (z?.resolve(), z = null, typeof D == "number") {
      z || (z = ky());
      let ft = z.promise;
      return t.history.go(D), ft;
    }
    let Z = Zf(
      M.location,
      M.matches,
      m,
      D,
      I?.fromRouteId,
      I?.relative
    ), { path: me, submission: ge, error: Te } = by(
      !1,
      Z,
      I
    ), Se;
    I?.unstable_mask && (Se = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof I.unstable_mask == "string" ? la(I.unstable_mask) : {
        ...M.location.unstable_mask,
        ...I.unstable_mask
      }
    });
    let we = M.location, Re = Qf(
      we,
      me,
      I && I.state,
      void 0,
      Se
    );
    Re = {
      ...Re,
      ...t.history.encodeLocation(Re)
    };
    let Ee = I && I.replace != null ? I.replace : void 0, ke = "PUSH";
    Ee === !0 ? ke = "REPLACE" : Ee === !1 || ge != null && ln(ge.formMethod) && ge.formAction === M.location.pathname + M.location.search && (ke = "REPLACE");
    let Ae = I && "preventScrollReset" in I ? I.preventScrollReset === !0 : void 0, Je = (I && I.flushSync) === !0, Ie = oa({
      currentLocation: we,
      nextLocation: Re,
      historyAction: ke
    });
    if (Ie) {
      ea(Ie, {
        state: "blocked",
        location: Re,
        proceed() {
          ea(Ie, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Re
          }), cn(D, I);
        },
        reset() {
          let ft = new Map(M.blockers);
          ft.set(Ie, Qs), Ue({ blockers: ft });
        }
      });
      return;
    }
    await It(ke, Re, {
      submission: ge,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Te,
      preventScrollReset: Ae,
      replace: I && I.replace,
      enableViewTransition: I && I.viewTransition,
      flushSync: Je,
      callSiteDefaultShouldRevalidate: I && I.unstable_defaultShouldRevalidate
    });
  }
  function zn() {
    Me || (Me = ky()), be(), Ue({ revalidation: "loading" });
    let D = Me.promise;
    return M.navigation.state === "submitting" ? D : M.navigation.state === "idle" ? (It(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), D) : (It(
      q || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: K === !0
      }
    ), D);
  }
  async function It(D, I, Z) {
    ee && ee.abort(), ee = null, q = D, k = (Z && Z.startUninterruptedRevalidation) === !0, zt(M.location, M.matches), Y = (Z && Z.preventScrollReset) === !0, K = (Z && Z.enableViewTransition) === !0;
    let me = g || p, ge = Z && Z.overrideNavigation, Te = Z?.initialHydration && M.matches && M.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : yr(me, I, m), Se = (Z && Z.flushSync) === !0;
    if (Te && M.initialized && !U && gN(M.location, I) && !(Z && Z.submission && ln(Z.submission.formMethod))) {
      ut(I, { matches: Te }, { flushSync: Se });
      return;
    }
    let we = jn(Te, me, I.pathname);
    if (we.active && we.matches && (Te = we.matches), !Te) {
      let { error: st, notFoundMatches: xt, route: Ge } = hn(
        I.pathname
      );
      ut(
        I,
        {
          matches: xt,
          loaderData: {},
          errors: {
            [Ge.id]: st
          }
        },
        { flushSync: Se }
      );
      return;
    }
    ee = new AbortController();
    let Re = Vi(
      t.history,
      I,
      ee.signal,
      Z && Z.submission
    ), Ee = t.getContext ? await t.getContext() : new hy(), ke;
    if (Z && Z.pendingError)
      ke = [
        br(Te).route.id,
        { type: "error", error: Z.pendingError }
      ];
    else if (Z && Z.submission && ln(Z.submission.formMethod)) {
      let st = await Jn(
        Re,
        I,
        Z.submission,
        Te,
        Ee,
        we.active,
        Z && Z.initialHydration === !0,
        { replace: Z.replace, flushSync: Se }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [xt, Ge] = st.pendingActionResult;
        if (An(Ge) && ml(Ge.error) && Ge.error.status === 404) {
          ee = null, ut(I, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [xt]: Ge.error
            }
          });
          return;
        }
      }
      Te = st.matches || Te, ke = st.pendingActionResult, ge = uf(I, Z.submission), Se = !1, we.active = !1, Re = Vi(
        t.history,
        Re.url,
        Re.signal
      );
    }
    let {
      shortCircuited: Ae,
      matches: Je,
      loaderData: Ie,
      errors: ft
    } = await Ft(
      Re,
      I,
      Te,
      Ee,
      we.active,
      ge,
      Z && Z.submission,
      Z && Z.fetcherSubmission,
      Z && Z.replace,
      Z && Z.initialHydration === !0,
      Se,
      ke,
      Z && Z.callSiteDefaultShouldRevalidate
    );
    Ae || (ee = null, ut(I, {
      matches: Je || Te,
      ...My(ke),
      loaderData: Ie,
      errors: ft
    }));
  }
  async function Jn(D, I, Z, me, ge, Te, Se, we = {}) {
    be();
    let Re = NN(I, Z);
    if (Ue({ navigation: Re }, { flushSync: we.flushSync === !0 }), Te) {
      let Ae = await it(
        me,
        I.pathname,
        D.signal
      );
      if (Ae.type === "aborted")
        return { shortCircuited: !0 };
      if (Ae.type === "error") {
        if (Ae.partialMatches.length === 0) {
          let { matches: Ie, route: ft } = Ho(p);
          return {
            matches: Ie,
            pendingActionResult: [
              ft.id,
              {
                type: "error",
                error: Ae.error
              }
            ]
          };
        }
        let Je = br(Ae.partialMatches).route.id;
        return {
          matches: Ae.partialMatches,
          pendingActionResult: [
            Je,
            {
              type: "error",
              error: Ae.error
            }
          ]
        };
      } else if (Ae.matches)
        me = Ae.matches;
      else {
        let { notFoundMatches: Je, error: Ie, route: ft } = hn(
          I.pathname
        );
        return {
          matches: Je,
          pendingActionResult: [
            ft.id,
            {
              type: "error",
              error: Ie
            }
          ]
        };
      }
    }
    let Ee, ke = oc(me, I);
    if (!ke.route.action && !ke.route.lazy)
      Ee = {
        type: "error",
        error: Gn(405, {
          method: D.method,
          pathname: I.pathname,
          routeId: ke.route.id
        })
      };
    else {
      let Ae = Pi(
        u,
        f,
        D,
        I,
        me,
        ke,
        Se ? [] : s,
        ge
      ), Je = await ve(
        D,
        I,
        Ae,
        ge,
        null
      );
      if (Ee = Je[ke.route.id], !Ee) {
        for (let Ie of me)
          if (Je[Ie.route.id]) {
            Ee = Je[Ie.route.id];
            break;
          }
      }
      if (D.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(Ee)) {
      let Ae;
      return we && we.replace != null ? Ae = we.replace : Ae = Ty(
        Ee.response.headers.get("Location"),
        new URL(D.url),
        m,
        t.history
      ) === M.location.pathname + M.location.search, await Q(D, Ee, !0, {
        submission: Z,
        replace: Ae
      }), { shortCircuited: !0 };
    }
    if (An(Ee)) {
      let Ae = br(me, ke.route.id);
      return (we && we.replace) !== !0 && (q = "PUSH"), {
        matches: me,
        pendingActionResult: [
          Ae.route.id,
          Ee,
          ke.route.id
        ]
      };
    }
    return {
      matches: me,
      pendingActionResult: [ke.route.id, Ee]
    };
  }
  async function Ft(D, I, Z, me, ge, Te, Se, we, Re, Ee, ke, Ae, Je) {
    let Ie = Te || uf(I, Se), ft = Se || we || Dy(Ie), st = !k && !Ee;
    if (ge) {
      if (st) {
        let Mt = un(Ae);
        Ue(
          {
            navigation: Ie,
            ...Mt !== void 0 ? { actionData: Mt } : {}
          },
          {
            flushSync: ke
          }
        );
      }
      let Fe = await it(
        Z,
        I.pathname,
        D.signal
      );
      if (Fe.type === "aborted")
        return { shortCircuited: !0 };
      if (Fe.type === "error") {
        if (Fe.partialMatches.length === 0) {
          let { matches: rn, route: Lt } = Ho(p);
          return {
            matches: rn,
            loaderData: {},
            errors: {
              [Lt.id]: Fe.error
            }
          };
        }
        let Mt = br(Fe.partialMatches).route.id;
        return {
          matches: Fe.partialMatches,
          loaderData: {},
          errors: {
            [Mt]: Fe.error
          }
        };
      } else if (Fe.matches)
        Z = Fe.matches;
      else {
        let { error: Mt, notFoundMatches: rn, route: Lt } = hn(
          I.pathname
        );
        return {
          matches: rn,
          loaderData: {},
          errors: {
            [Lt.id]: Mt
          }
        };
      }
    }
    let xt = g || p, { dsMatches: Ge, revalidatingFetchers: Ot } = xy(
      D,
      me,
      u,
      f,
      t.history,
      M,
      Z,
      ft,
      I,
      Ee ? [] : s,
      Ee === !0,
      U,
      V,
      ae,
      F,
      re,
      xt,
      m,
      t.patchRoutesOnNavigation != null,
      Ae,
      Je
    );
    if (_ = ++ce, !t.dataStrategy && !Ge.some((Fe) => Fe.shouldLoad) && !Ge.some(
      (Fe) => Fe.route.middleware && Fe.route.middleware.length > 0
    ) && Ot.length === 0) {
      let Fe = qa();
      return ut(
        I,
        {
          matches: Z,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ae && An(Ae[1]) ? { [Ae[0]]: Ae[1].error } : null,
          ...My(Ae),
          ...Fe ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: ke }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let Fe = {};
      if (!ge) {
        Fe.navigation = Ie;
        let Mt = un(Ae);
        Mt !== void 0 && (Fe.actionData = Mt);
      }
      Ot.length > 0 && (Fe.fetchers = Wn(Ot)), Ue(Fe, { flushSync: ke });
    }
    Ot.forEach((Fe) => {
      wt(Fe.key), Fe.controller && G.set(Fe.key, Fe.controller);
    });
    let vt = () => Ot.forEach((Fe) => wt(Fe.key));
    ee && ee.signal.addEventListener(
      "abort",
      vt
    );
    let { loaderResults: Fa, fetcherResults: ta } = await xe(
      Ge,
      Ot,
      D,
      I,
      me
    );
    if (D.signal.aborted)
      return { shortCircuited: !0 };
    ee && ee.signal.removeEventListener(
      "abort",
      vt
    ), Ot.forEach((Fe) => G.delete(Fe.key));
    let Pt = qo(Fa);
    if (Pt)
      return await Q(D, Pt.result, !0, {
        replace: Re
      }), { shortCircuited: !0 };
    if (Pt = qo(ta), Pt)
      return re.add(Pt.key), await Q(D, Pt.result, !0, {
        replace: Re
      }), { shortCircuited: !0 };
    let { loaderData: ca, errors: Tr } = Ry(
      M,
      Z,
      Fa,
      Ae,
      Ot,
      ta
    );
    Ee && M.errors && (Tr = { ...M.errors, ...Tr });
    let ua = qa(), Cr = Ia(_), ei = ua || Cr || Ot.length > 0;
    return {
      matches: Z,
      loaderData: ca,
      errors: Tr,
      ...ei ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function un(D) {
    if (D && !An(D[1]))
      return {
        [D[0]]: D[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function Wn(D) {
    return D.forEach((I) => {
      let Z = M.fetchers.get(I.key), me = Zs(
        void 0,
        Z ? Z.data : void 0
      );
      M.fetchers.set(I.key, me);
    }), new Map(M.fetchers);
  }
  async function Ct(D, I, Z, me) {
    wt(D);
    let ge = (me && me.flushSync) === !0, Te = g || p, Se = Zf(
      M.location,
      M.matches,
      m,
      Z,
      I,
      me?.relative
    ), we = yr(Te, Se, m), Re = jn(we, Te, Se);
    if (Re.active && Re.matches && (we = Re.matches), !we) {
      $e(
        D,
        I,
        Gn(404, { pathname: Se }),
        { flushSync: ge }
      );
      return;
    }
    let { path: Ee, submission: ke, error: Ae } = by(
      !0,
      Se,
      me
    );
    if (Ae) {
      $e(D, I, Ae, { flushSync: ge });
      return;
    }
    let Je = t.getContext ? await t.getContext() : new hy(), Ie = (me && me.preventScrollReset) === !0;
    if (ke && ln(ke.formMethod)) {
      await nn(
        D,
        I,
        Ee,
        we,
        Je,
        Re.active,
        ge,
        Ie,
        ke,
        me && me.unstable_defaultShouldRevalidate
      );
      return;
    }
    F.set(D, { routeId: I, path: Ee }), await Rt(
      D,
      I,
      Ee,
      we,
      Je,
      Re.active,
      ge,
      Ie,
      ke
    );
  }
  async function nn(D, I, Z, me, ge, Te, Se, we, Re, Ee) {
    be(), F.delete(D);
    let ke = M.fetchers.get(D);
    rt(D, TN(Re, ke), {
      flushSync: Se
    });
    let Ae = new AbortController(), Je = Vi(
      t.history,
      Z,
      Ae.signal,
      Re
    );
    if (Te) {
      let gt = await it(
        me,
        new URL(Je.url).pathname,
        Je.signal,
        D
      );
      if (gt.type === "aborted")
        return;
      if (gt.type === "error") {
        $e(D, I, gt.error, { flushSync: Se });
        return;
      } else if (gt.matches)
        me = gt.matches;
      else {
        $e(
          D,
          I,
          Gn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let Ie = oc(me, Z);
    if (!Ie.route.action && !Ie.route.lazy) {
      let gt = Gn(405, {
        method: Re.formMethod,
        pathname: Z,
        routeId: I
      });
      $e(D, I, gt, { flushSync: Se });
      return;
    }
    G.set(D, Ae);
    let ft = ce, st = Pi(
      u,
      f,
      Je,
      Z,
      me,
      Ie,
      s,
      ge
    ), xt = await ve(
      Je,
      Z,
      st,
      ge,
      D
    ), Ge = xt[Ie.route.id];
    if (!Ge) {
      for (let gt of st)
        if (xt[gt.route.id]) {
          Ge = xt[gt.route.id];
          break;
        }
    }
    if (Je.signal.aborted) {
      G.get(D) === Ae && G.delete(D);
      return;
    }
    if (ae.has(D)) {
      if (Yr(Ge) || An(Ge)) {
        rt(D, Ua(void 0));
        return;
      }
    } else {
      if (Yr(Ge))
        if (G.delete(D), _ > ft) {
          rt(D, Ua(void 0));
          return;
        } else
          return re.add(D), rt(D, Zs(Re)), Q(Je, Ge, !1, {
            fetcherSubmission: Re,
            preventScrollReset: we
          });
      if (An(Ge)) {
        $e(D, I, Ge.error);
        return;
      }
    }
    let Ot = M.navigation.location || M.location, vt = Vi(
      t.history,
      Ot,
      Ae.signal
    ), Fa = g || p, ta = M.navigation.state !== "idle" ? yr(Fa, M.navigation.location, m) : M.matches;
    Ye(ta, "Didn't find any matches after fetcher action");
    let Pt = ++ce;
    te.set(D, Pt);
    let ca = Zs(Re, Ge.data);
    M.fetchers.set(D, ca);
    let { dsMatches: Tr, revalidatingFetchers: ua } = xy(
      vt,
      ge,
      u,
      f,
      t.history,
      M,
      ta,
      Re,
      Ot,
      s,
      !1,
      U,
      V,
      ae,
      F,
      re,
      Fa,
      m,
      t.patchRoutesOnNavigation != null,
      [Ie.route.id, Ge],
      Ee
    );
    ua.filter((gt) => gt.key !== D).forEach((gt) => {
      let ti = gt.key, ni = M.fetchers.get(ti), _l = Zs(
        void 0,
        ni ? ni.data : void 0
      );
      M.fetchers.set(ti, _l), wt(ti), gt.controller && G.set(ti, gt.controller);
    }), Ue({ fetchers: new Map(M.fetchers) });
    let Cr = () => ua.forEach((gt) => wt(gt.key));
    Ae.signal.addEventListener(
      "abort",
      Cr
    );
    let { loaderResults: ei, fetcherResults: Fe } = await xe(
      Tr,
      ua,
      vt,
      Ot,
      ge
    );
    if (Ae.signal.aborted)
      return;
    if (Ae.signal.removeEventListener(
      "abort",
      Cr
    ), te.delete(D), G.delete(D), ua.forEach((gt) => G.delete(gt.key)), M.fetchers.has(D)) {
      let gt = Ua(Ge.data);
      M.fetchers.set(D, gt);
    }
    let Mt = qo(ei);
    if (Mt)
      return Q(
        vt,
        Mt.result,
        !1,
        { preventScrollReset: we }
      );
    if (Mt = qo(Fe), Mt)
      return re.add(Mt.key), Q(
        vt,
        Mt.result,
        !1,
        { preventScrollReset: we }
      );
    let { loaderData: rn, errors: Lt } = Ry(
      M,
      ta,
      ei,
      void 0,
      ua,
      Fe
    );
    Ia(Pt), M.navigation.state === "loading" && Pt > _ ? (Ye(q, "Expected pending action"), ee && ee.abort(), ut(M.navigation.location, {
      matches: ta,
      loaderData: rn,
      errors: Lt,
      fetchers: new Map(M.fetchers)
    })) : (Ue({
      errors: Lt,
      loaderData: _y(
        M.loaderData,
        rn,
        ta,
        Lt
      ),
      fetchers: new Map(M.fetchers)
    }), U = !1);
  }
  async function Rt(D, I, Z, me, ge, Te, Se, we, Re) {
    let Ee = M.fetchers.get(D);
    rt(
      D,
      Zs(
        Re,
        Ee ? Ee.data : void 0
      ),
      { flushSync: Se }
    );
    let ke = new AbortController(), Ae = Vi(
      t.history,
      Z,
      ke.signal
    );
    if (Te) {
      let Ge = await it(
        me,
        new URL(Ae.url).pathname,
        Ae.signal,
        D
      );
      if (Ge.type === "aborted")
        return;
      if (Ge.type === "error") {
        $e(D, I, Ge.error, { flushSync: Se });
        return;
      } else if (Ge.matches)
        me = Ge.matches;
      else {
        $e(
          D,
          I,
          Gn(404, { pathname: Z }),
          { flushSync: Se }
        );
        return;
      }
    }
    let Je = oc(me, Z);
    G.set(D, ke);
    let Ie = ce, ft = Pi(
      u,
      f,
      Ae,
      Z,
      me,
      Je,
      s,
      ge
    ), st = await ve(
      Ae,
      Z,
      ft,
      ge,
      D
    ), xt = st[Je.route.id];
    if (!xt) {
      for (let Ge of me)
        if (st[Ge.route.id]) {
          xt = st[Ge.route.id];
          break;
        }
    }
    if (G.get(D) === ke && G.delete(D), !Ae.signal.aborted) {
      if (ae.has(D)) {
        rt(D, Ua(void 0));
        return;
      }
      if (Yr(xt))
        if (_ > Ie) {
          rt(D, Ua(void 0));
          return;
        } else {
          re.add(D), await Q(Ae, xt, !1, {
            preventScrollReset: we
          });
          return;
        }
      if (An(xt)) {
        $e(D, I, xt.error);
        return;
      }
      rt(D, Ua(xt.data));
    }
  }
  async function Q(D, I, Z, {
    submission: me,
    fetcherSubmission: ge,
    preventScrollReset: Te,
    replace: Se
  } = {}) {
    Z || (z?.resolve(), z = null), I.response.headers.has("X-Remix-Revalidate") && (U = !0);
    let we = I.response.headers.get("Location");
    Ye(we, "Expected a Location header on the redirect Response"), we = Ty(
      we,
      new URL(D.url),
      m,
      t.history
    );
    let Re = Qf(M.location, we, {
      _isRedirect: !0
    });
    if (i) {
      let ft = !1;
      if (I.response.headers.has("X-Remix-Reload-Document"))
        ft = !0;
      else if (Rh(we)) {
        const st = SE(we, !0);
        ft = // Hard reload if it's an absolute URL to a new origin
        st.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Qn(st.pathname, m) == null;
      }
      if (ft) {
        Se ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    ee = null;
    let Ee = Se === !0 || I.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: ke, formAction: Ae, formEncType: Je } = M.navigation;
    !me && !ge && ke && Ae && Je && (me = Dy(M.navigation));
    let Ie = me || ge;
    if (tN.has(I.response.status) && Ie && ln(Ie.formMethod))
      await It(Ee, Re, {
        submission: {
          ...Ie,
          formAction: we
        },
        // Preserve these flags across redirects
        preventScrollReset: Te || Y,
        enableViewTransition: Z ? K : void 0
      });
    else {
      let ft = uf(
        Re,
        me
      );
      await It(Ee, Re, {
        overrideNavigation: ft,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ge,
        // Preserve these flags across redirects
        preventScrollReset: Te || Y,
        enableViewTransition: Z ? K : void 0
      });
    }
  }
  async function ve(D, I, Z, me, ge) {
    let Te, Se = {};
    try {
      Te = await dN(
        b,
        D,
        I,
        Z,
        ge,
        me,
        !1
      );
    } catch (we) {
      return Z.filter((Re) => Re.shouldLoad).forEach((Re) => {
        Se[Re.route.id] = {
          type: "error",
          error: we
        };
      }), Se;
    }
    if (D.signal.aborted)
      return Se;
    if (!ln(D.method))
      for (let we of Z) {
        if (Te[we.route.id]?.type === "error")
          break;
        !Te.hasOwnProperty(we.route.id) && !M.loaderData.hasOwnProperty(we.route.id) && (!M.errors || !M.errors.hasOwnProperty(we.route.id)) && we.shouldCallHandler() && (Te[we.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${we.route.id}`
          )
        });
      }
    for (let [we, Re] of Object.entries(Te))
      if (SN(Re)) {
        let Ee = Re.result;
        Se[we] = {
          type: "redirect",
          response: pN(
            Ee,
            D,
            we,
            Z,
            m
          )
        };
      } else
        Se[we] = await mN(Re);
    return Se;
  }
  async function xe(D, I, Z, me, ge) {
    let Te = ve(
      Z,
      me,
      D,
      ge,
      null
    ), Se = Promise.all(
      I.map(async (Ee) => {
        if (Ee.matches && Ee.match && Ee.request && Ee.controller) {
          let Ae = (await ve(
            Ee.request,
            Ee.path,
            Ee.matches,
            ge,
            Ee.key
          ))[Ee.match.route.id];
          return { [Ee.key]: Ae };
        } else
          return Promise.resolve({
            [Ee.key]: {
              type: "error",
              error: Gn(404, {
                pathname: Ee.path
              })
            }
          });
      })
    ), we = await Te, Re = (await Se).reduce(
      (Ee, ke) => Object.assign(Ee, ke),
      {}
    );
    return {
      loaderResults: we,
      fetcherResults: Re
    };
  }
  function be() {
    U = !0, F.forEach((D, I) => {
      G.has(I) && V.add(I), wt(I);
    });
  }
  function rt(D, I, Z = {}) {
    M.fetchers.set(D, I), Ue(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Z && Z.flushSync) === !0 }
    );
  }
  function $e(D, I, Z, me = {}) {
    let ge = br(M.matches, I);
    fn(D), Ue(
      {
        errors: {
          [ge.route.id]: Z
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (me && me.flushSync) === !0 }
    );
  }
  function Xt(D) {
    return $.set(D, ($.get(D) || 0) + 1), ae.has(D) && ae.delete(D), M.fetchers.get(D) || nN;
  }
  function On(D, I) {
    wt(D, I?.reason), rt(D, Ua(null));
  }
  function fn(D) {
    let I = M.fetchers.get(D);
    G.has(D) && !(I && I.state === "loading" && te.has(D)) && wt(D), F.delete(D), te.delete(D), re.delete(D), ae.delete(D), V.delete(D), M.fetchers.delete(D);
  }
  function _t(D) {
    let I = ($.get(D) || 0) - 1;
    I <= 0 ? ($.delete(D), ae.add(D)) : $.set(D, I), Ue({ fetchers: new Map(M.fetchers) });
  }
  function wt(D, I) {
    let Z = G.get(D);
    Z && (Z.abort(I), G.delete(D));
  }
  function jt(D) {
    for (let I of D) {
      let Z = Xt(I), me = Ua(Z.data);
      M.fetchers.set(I, me);
    }
  }
  function qa() {
    let D = [], I = !1;
    for (let Z of re) {
      let me = M.fetchers.get(Z);
      Ye(me, `Expected fetcher: ${Z}`), me.state === "loading" && (re.delete(Z), D.push(Z), I = !0);
    }
    return jt(D), I;
  }
  function Ia(D) {
    let I = [];
    for (let [Z, me] of te)
      if (me < D) {
        let ge = M.fetchers.get(Z);
        Ye(ge, `Expected fetcher: ${Z}`), ge.state === "loading" && (wt(Z), te.delete(Z), I.push(Z));
      }
    return jt(I), I.length > 0;
  }
  function Ln(D, I) {
    let Z = M.blockers.get(D) || Qs;
    return de.get(D) !== I && de.set(D, I), Z;
  }
  function ya(D) {
    M.blockers.delete(D), de.delete(D);
  }
  function ea(D, I) {
    let Z = M.blockers.get(D) || Qs;
    Ye(
      Z.state === "unblocked" && I.state === "blocked" || Z.state === "blocked" && I.state === "blocked" || Z.state === "blocked" && I.state === "proceeding" || Z.state === "blocked" && I.state === "unblocked" || Z.state === "proceeding" && I.state === "unblocked",
      `Invalid blocker state transition: ${Z.state} -> ${I.state}`
    );
    let me = new Map(M.blockers);
    me.set(D, I), Ue({ blockers: me });
  }
  function oa({
    currentLocation: D,
    nextLocation: I,
    historyAction: Z
  }) {
    if (de.size === 0)
      return;
    de.size > 1 && kt(!1, "A router only supports one blocker at a time");
    let me = Array.from(de.entries()), [ge, Te] = me[me.length - 1], Se = M.blockers.get(ge);
    if (!(Se && Se.state === "proceeding") && Te({ currentLocation: D, nextLocation: I, historyAction: Z }))
      return ge;
  }
  function hn(D) {
    let I = Gn(404, { pathname: D }), Z = g || p, { matches: me, route: ge } = Ho(Z);
    return { notFoundMatches: me, route: ge, error: I };
  }
  function Oe(D, I, Z) {
    if (j = D, C = I, N = Z || null, !T && M.navigation === cf) {
      T = !0;
      let me = Yt(M.location, M.matches);
      me != null && Ue({ restoreScrollPosition: me });
    }
    return () => {
      j = null, C = null, N = null;
    };
  }
  function dt(D, I) {
    return N && N(
      D,
      I.map((me) => CE(me, M.loaderData))
    ) || D.key;
  }
  function zt(D, I) {
    if (j && C) {
      let Z = dt(D, I);
      j[Z] = C();
    }
  }
  function Yt(D, I) {
    if (j) {
      let Z = dt(D, I), me = j[Z];
      if (typeof me == "number")
        return me;
    }
    return null;
  }
  function jn(D, I, Z) {
    if (t.patchRoutesOnNavigation)
      if (D) {
        if (Object.keys(D[0].params).length > 0)
          return { active: !0, matches: ll(
            I,
            Z,
            m,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          I,
          Z,
          m,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(D, I, Z, me) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: D };
    let ge = D;
    for (; ; ) {
      let Te = g == null, Se = g || p, we = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Z,
          path: I,
          matches: ge,
          fetcherKey: me,
          patch: (ke, Ae) => {
            Z.aborted || Sy(
              ke,
              Ae,
              Se,
              we,
              u,
              !1
            );
          }
        });
      } catch (ke) {
        return { type: "error", error: ke, partialMatches: ge };
      } finally {
        Te && !Z.aborted && (p = [...p]);
      }
      if (Z.aborted)
        return { type: "aborted" };
      let Re = yr(Se, I, m), Ee = null;
      if (Re) {
        if (Object.keys(Re[0].params).length === 0)
          return { type: "success", matches: Re };
        if (Ee = ll(
          Se,
          I,
          m,
          !0
        ), !(Ee && ge.length < Ee.length && Qt(
          ge,
          Ee.slice(0, ge.length)
        )))
          return { type: "success", matches: Re };
      }
      if (Ee || (Ee = ll(
        Se,
        I,
        m,
        !0
      )), !Ee || Qt(ge, Ee))
        return { type: "success", matches: null };
      ge = Ee;
    }
  }
  function Qt(D, I) {
    return D.length === I.length && D.every((Z, me) => Z.route.id === I[me].route.id);
  }
  function ba(D) {
    f = {}, g = hl(
      D,
      u,
      void 0,
      f
    );
  }
  function an(D, I, Z = !1) {
    let me = g == null;
    Sy(
      D,
      I,
      g || p,
      f,
      u,
      Z
    ), me && (p = [...p], Ue({}));
  }
  return se = {
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
    initialize: Le,
    subscribe: pt,
    enableScrollRestoration: Oe,
    navigate: cn,
    fetch: Ct,
    revalidate: zn,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (D) => t.history.createHref(D),
    encodeLocation: (D) => t.history.encodeLocation(D),
    getFetcher: Xt,
    resetFetcher: On,
    deleteFetcher: _t,
    dispose: je,
    getBlocker: Ln,
    deleteBlocker: ya,
    patchRoutes: an,
    _internalFetchControllers: G,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ba,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(D) {
      Ue(D);
    }
  }, t.unstable_instrumentations && (se = PE(
    se,
    t.unstable_instrumentations.map((D) => D.router).filter(Boolean)
  )), se;
}
function iN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Zf(t, a, i, s, o, u) {
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
  let g = zc(
    s || ".",
    _h(f),
    Qn(t.pathname, i) || t.pathname,
    u === "path"
  );
  if (s == null && (g.search = t.search, g.hash = t.hash), (s == null || s === "" || s === ".") && p) {
    let m = kh(g.search);
    if (p.route.index && !m)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && m) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      g.search = w ? `?${w}` : "";
    }
  }
  return i !== "/" && (g.pathname = VE({ basename: i, pathname: g.pathname })), va(g);
}
function by(t, a, i) {
  if (!i || !iN(i))
    return { path: a };
  if (i.formMethod && !EN(i.formMethod))
    return {
      path: a,
      error: Gn(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: Gn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), f = Lx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!ln(u))
        return s();
      let v = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (w, [S, j]) => `${w}${S}=${j}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: f,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!ln(u))
        return s();
      try {
        let v = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: f,
            formEncType: i.formEncType,
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
  Ye(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let p, g;
  if (i.formData)
    p = Wf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    p = Wf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    p = i.body, g = Cy(p);
  else if (i.body == null)
    p = new URLSearchParams(), g = new FormData();
  else
    try {
      p = new URLSearchParams(i.body), g = Cy(p);
    } catch {
      return s();
    }
  let m = {
    formMethod: u,
    formAction: f,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (ln(m.formMethod))
    return { path: a, submission: m };
  let b = la(a);
  return t && b.search && kh(b.search) && p.append("index", ""), b.search = `?${p}`, { path: va(b), submission: m };
}
function xy(t, a, i, s, o, u, f, p, g, m, b, v, w, S, j, N, C, T, A, O, R) {
  let H = O ? An(O[1]) ? O[1].error : O[1].data : void 0, X = o.createURL(u.location), se = o.createURL(g), M;
  if (b && u.errors) {
    let ne = Object.keys(u.errors)[0];
    M = f.findIndex((k) => k.route.id === ne);
  } else if (O && An(O[1])) {
    let ne = O[0];
    M = f.findIndex((k) => k.route.id === ne) - 1;
  }
  let q = O ? O[1].statusCode : void 0, z = q && q >= 400, Y = {
    currentUrl: X,
    currentParams: u.matches[0]?.params || {},
    nextUrl: se,
    nextParams: f[0].params,
    ...p,
    actionResult: H,
    actionStatus: q
  }, ee = xl(f), K = f.map((ne, k) => {
    let { route: U } = ne, V = null;
    if (M != null && k > M)
      V = !1;
    else if (U.lazy)
      V = !0;
    else if (!Ah(U))
      V = !1;
    else if (b) {
      let { shouldLoad: te } = _x(
        U,
        u.loaderData,
        u.errors
      );
      V = te;
    } else sN(u.loaderData, u.matches[k], ne) && (V = !0);
    if (V !== null)
      return Jf(
        i,
        s,
        t,
        g,
        ee,
        ne,
        m,
        a,
        V
      );
    let G = !1;
    typeof R == "boolean" ? G = R : z ? G = !1 : (v || X.pathname + X.search === se.pathname + se.search || X.search !== se.search || lN(u.matches[k], ne)) && (G = !0);
    let ce = {
      ...Y,
      defaultShouldRevalidate: G
    }, _ = cl(ne, ce);
    return Jf(
      i,
      s,
      t,
      g,
      ee,
      ne,
      m,
      a,
      _,
      ce,
      R
    );
  }), oe = [];
  return j.forEach((ne, k) => {
    if (b || !f.some((F) => F.route.id === ne.routeId) || S.has(k))
      return;
    let U = u.fetchers.get(k), V = U && U.state !== "idle" && U.data === void 0, G = yr(C, ne.path, T);
    if (!G) {
      if (A && V)
        return;
      oe.push({
        key: k,
        routeId: ne.routeId,
        path: ne.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(k))
      return;
    let ce = oc(G, ne.path), _ = new AbortController(), te = Vi(
      o,
      ne.path,
      _.signal
    ), re = null;
    if (w.has(k))
      w.delete(k), re = Pi(
        i,
        s,
        te,
        ne.path,
        G,
        ce,
        m,
        a
      );
    else if (V)
      v && (re = Pi(
        i,
        s,
        te,
        ne.path,
        G,
        ce,
        m,
        a
      ));
    else {
      let F;
      typeof R == "boolean" ? F = R : z ? F = !1 : F = v;
      let $ = {
        ...Y,
        defaultShouldRevalidate: F
      };
      cl(ce, $) && (re = Pi(
        i,
        s,
        te,
        ne.path,
        G,
        ce,
        m,
        a,
        $
      ));
    }
    re && oe.push({
      key: k,
      routeId: ne.routeId,
      path: ne.path,
      matches: re,
      match: ce,
      request: te,
      controller: _
    });
  }), { dsMatches: K, revalidatingFetchers: oe };
}
function Ah(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function _x(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Ah(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let u = !s && !o;
  return { shouldLoad: u, renderFallback: u };
}
function sN(t, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return s || o;
}
function lN(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function cl(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function Sy(t, a, i, s, o, u) {
  let f;
  if (t) {
    let m = s[t];
    Ye(
      m,
      `No route found to patch children into: routeId = ${t}`
    ), m.children || (m.children = []), f = m.children;
  } else
    f = i;
  let p = [], g = [];
  if (a.forEach((m) => {
    let b = f.find(
      (v) => Mx(m, v)
    );
    b ? g.push({ existingRoute: b, newRoute: m }) : p.push(m);
  }), p.length > 0) {
    let m = hl(
      p,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      s
    );
    f.push(...m);
  }
  if (u && g.length > 0)
    for (let m = 0; m < g.length; m++) {
      let { existingRoute: b, newRoute: v } = g[m], w = b, [S] = hl(
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
function Mx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, s) => a.children?.some((o) => Mx(i, o))
  ) ?? !1 : !1;
}
var wy = /* @__PURE__ */ new WeakMap(), Ax = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (Ye(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = wy.get(o);
  f || (f = {}, wy.set(o, f));
  let p = f[t];
  if (p)
    return p;
  let g = (async () => {
    let m = jE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (m)
      kt(
        !m,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), f[t] = Promise.resolve();
    else if (v)
      kt(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let w = await u();
      w != null && (Object.assign(o, { [t]: w }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((w) => w === void 0) && (o.lazy = void 0));
  })();
  return f[t] = g, g;
}, jy = /* @__PURE__ */ new WeakMap();
function oN(t, a, i, s, o) {
  let u = i[t.id];
  if (Ye(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = jy.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Ye(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let C = NE(j), A = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        C ? kt(
          !C,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : A ? kt(
          !A,
          `Route "${u.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : S[j] = N;
      }
      Object.assign(u, S), Object.assign(u, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...s(u),
        lazy: void 0
      });
    })();
    return jy.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), p = [], g;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = Ax({
      key: b,
      route: t,
      manifest: i,
      mapRouteProperties: s
    });
    v && (p.push(v), b === a && (g = v));
  }
  let m = p.length > 0 ? Promise.all(p).then(() => {
  }) : void 0;
  return m?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: m,
    lazyHandlerPromise: g
  };
}
async function Ey(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    i[a[u].route.id] = o;
  }), i;
}
async function cN(t) {
  return t.matches.some((a) => a.route.middleware) ? Dx(t, () => Ey(t)) : Ey(t);
}
function Dx(t, a) {
  return uN(
    t,
    a,
    (s) => {
      if (jN(s))
        throw s;
      return s;
    },
    bN,
    i
  );
  function i(s, o, u) {
    if (u)
      return Promise.resolve(
        Object.assign(u.value, {
          [o]: { type: "error", result: s }
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
      ), g = br(
        f,
        f[p].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: s }
      });
    }
  }
}
async function uN(t, a, i, s, o) {
  let { matches: u, ...f } = t, p = u.flatMap(
    (m) => m.route.middleware ? m.route.middleware.map((b) => [m.route.id, b]) : []
  );
  return await kx(
    f,
    p,
    a,
    i,
    s,
    o
  );
}
async function kx(t, a, i, s, o, u, f = 0) {
  let { request: p } = t;
  if (p.signal.aborted)
    throw p.signal.reason ?? new Error(`Request aborted: ${p.method} ${p.url}`);
  let g = a[f];
  if (!g)
    return await i();
  let [m, b] = g, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await kx(
        t,
        a,
        i,
        s,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await u(S, m, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? s(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await u(S, m, v);
  }
}
function zx(t, a, i, s, o) {
  let u = Ax({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: t
  }), f = oN(
    s.route,
    ln(i.method) ? "action" : "loader",
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
function Jf(t, a, i, s, o, u, f, p, g, m = null, b) {
  let v = !1, w = zx(
    t,
    a,
    i,
    u,
    f
  );
  return {
    ...u,
    _lazyPromises: w,
    shouldLoad: g,
    shouldRevalidateArgs: m,
    shouldCallHandler(S) {
      return v = !0, m ? typeof b == "boolean" ? cl(u, {
        ...m,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? cl(u, {
        ...m,
        defaultShouldRevalidate: S
      }) : cl(u, m) : g;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: C } = u.route, T = v || g || S && !ln(i.method) && (j || N), A = C && C.length > 0 && !N && !j;
      return T && (ln(i.method) || !A) ? fN({
        request: i,
        path: s,
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
function Pi(t, a, i, s, o, u, f, p, g = null) {
  return o.map((m) => m.route.id !== u.route.id ? {
    ...m,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: zx(
      t,
      a,
      i,
      m,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Jf(
    t,
    a,
    i,
    s,
    xl(o),
    m,
    f,
    p,
    !0,
    g
  ));
}
async function dN(t, a, i, s, o, u, f) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let p = {
    request: a,
    unstable_url: Ox(a, i),
    unstable_pattern: xl(s),
    params: s[0].params,
    context: u,
    matches: s
  }, m = await t({
    ...p,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = p;
      return Dx(v, () => b({
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
      s.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return m;
}
async function fN({
  request: t,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: p
}) {
  let g, m, b = ln(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((A, O) => j = O);
    m = () => j(), t.signal.addEventListener("abort", m);
    let C = (A) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: Ox(t, a),
        unstable_pattern: i,
        params: s.params,
        context: p
      },
      ...A !== void 0 ? [A] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (f ? f((O) => C(O)) : C()) };
      } catch (A) {
        return { type: "error", result: A };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let S = b ? s.route.action : s.route.loader;
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
        g = N;
      } else {
        await o;
        let j = b ? s.route.action : s.route.loader;
        if (j)
          [g] = await Promise.all([w(j), u]);
        else if (v === "action") {
          let N = new URL(t.url), C = N.pathname + N.search;
          throw Gn(405, {
            method: t.method,
            pathname: C,
            routeId: s.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (S)
      g = await w(S);
    else {
      let j = new URL(t.url), N = j.pathname + j.search;
      throw Gn(404, {
        pathname: N
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    m && t.signal.removeEventListener("abort", m);
  }
  return g;
}
async function hN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function mN(t) {
  let { result: a, type: i } = t;
  if (Dh(a)) {
    let s;
    try {
      s = await hN(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Oc(a.status, a.statusText, s),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: s,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Ay(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: yN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : Ay(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function pN(t, a, i, s, o) {
  let u = t.headers.get("Location");
  if (Ye(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Rh(u)) {
    let f = s.slice(
      0,
      s.findIndex((p) => p.route.id === i) + 1
    );
    u = Zf(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var Ny = [
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
function Ty(t, a, i, s) {
  if (Rh(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Ny.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = Qn(u.pathname, i) != null;
    if (u.origin === a.origin && f)
      return Mh(u.pathname) + u.search + u.hash;
  }
  try {
    let o = s.createURL(t);
    if (Ny.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Vi(t, a, i, s) {
  let o = t.createURL(Lx(a)).toString(), u = { signal: i };
  if (s && ln(s.formMethod)) {
    let { formMethod: f, formEncType: p } = s;
    u.method = f.toUpperCase(), p === "application/json" ? (u.headers = new Headers({ "Content-Type": p }), u.body = JSON.stringify(s.json)) : p === "text/plain" ? u.body = s.text : p === "application/x-www-form-urlencoded" && s.formData ? u.body = Wf(s.formData) : u.body = s.formData;
  }
  return new Request(o, u);
}
function Ox(t, a) {
  let i = new URL(t.url), s = typeof a == "string" ? la(a) : a;
  if (i.pathname = s.pathname || "/", s.search) {
    let o = new URLSearchParams(s.search), u = o.getAll("index");
    o.delete("index");
    for (let f of u.filter(Boolean))
      o.append("index", f);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = s.hash || "", i;
}
function Wf(t) {
  let a = new URLSearchParams();
  for (let [i, s] of t.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function Cy(t) {
  let a = new FormData();
  for (let [i, s] of t.entries())
    a.append(i, s);
  return a;
}
function vN(t, a, i, s = !1, o = !1) {
  let u = {}, f = null, p, g = !1, m = {}, b = i && An(i[1]) ? i[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Ye(
      !Yr(S),
      "Cannot handle redirect results in processLoaderData"
    ), An(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      s || (u[w] = Rx), g || (g = !0, p = ml(S.error) ? S.error.status : 500), S.headers && (m[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !g && (p = S.statusCode), S.headers && (m[w] = S.headers);
  }), b !== void 0 && i && (f = { [i[0]]: b }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: p || 200,
    loaderHeaders: m
  };
}
function Ry(t, a, i, s, o, u) {
  let { loaderData: f, errors: p } = vN(
    a,
    i,
    s
  );
  return o.filter((g) => !g.matches || g.matches.some((m) => m.shouldLoad)).forEach((g) => {
    let { key: m, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let w = u[m];
    if (Ye(w, "Did not find corresponding fetcher result"), An(w)) {
      let S = br(t.matches, b?.route.id);
      p && p[S.route.id] || (p = {
        ...p,
        [S.route.id]: w.error
      }), t.fetchers.delete(m);
    } else if (Yr(w))
      Ye(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ua(w.data);
      t.fetchers.set(m, S);
    }
  }), { loaderData: f, errors: p };
}
function _y(t, a, i, s) {
  let o = Object.entries(a).filter(([, u]) => u !== Rx).reduce((u, [f, p]) => (u[f] = p, u), {});
  for (let u of i) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), s && s.hasOwnProperty(f))
      break;
  }
  return o;
}
function My(t) {
  return t ? An(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function br(t, a) {
  return (a ? t.slice(0, t.findIndex((s) => s.route.id === a) + 1) : [...t]).reverse().find((s) => s.route.hasErrorBoundary === !0) || t[0];
}
function Ho(t) {
  let a = t.length === 1 ? t[0] : t.find((i) => i.index || !i.path || i.path === "/") || {
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
function Gn(t, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: u
} = {}) {
  let f = "Unknown Server Error", p = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", s && a && i ? p = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (p = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", p = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", p = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", s && a && i ? p = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (p = `Invalid request method "${s.toUpperCase()}"`)), new Oc(
    t || 500,
    f,
    new Error(p),
    !0
  );
}
function qo(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [s, o] = a[i];
    if (Yr(o))
      return { key: s, result: o };
  }
}
function Lx(t) {
  let a = typeof t == "string" ? la(t) : t;
  return va({ ...a, hash: "" });
}
function gN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function yN(t) {
  return new Oc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function bN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && xN(i)
  );
}
function xN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function SN(t) {
  return Dh(t.result) && Tx.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Yr(t) {
  return (t && t.type) === "redirect";
}
function Ay(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Dh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function wN(t) {
  return Tx.has(t);
}
function jN(t) {
  return Dh(t) && wN(t.status) && t.headers.has("Location");
}
function EN(t) {
  return eN.has(t.toUpperCase());
}
function ln(t) {
  return JE.has(t.toUpperCase());
}
function kh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function oc(t, a) {
  let i = typeof a == "string" ? la(a).search : a.search;
  if (t[t.length - 1].route.index && kh(i || ""))
    return t[t.length - 1];
  let s = Sx(t);
  return s[s.length - 1];
}
function Dy(t) {
  let { formMethod: a, formAction: i, formEncType: s, text: o, formData: u, json: f } = t;
  if (!(!a || !i || !s)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: u,
        json: void 0,
        text: void 0
      };
    if (f !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: s,
        formData: void 0,
        json: f,
        text: void 0
      };
  }
}
function uf(t, a) {
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
function NN(t, a) {
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
function Zs(t, a) {
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
function TN(t, a) {
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
function Ua(t) {
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
function CN(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      Cx
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, u] of Object.entries(s || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function RN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      t.sessionStorage.setItem(
        Cx,
        JSON.stringify(i)
      );
    } catch (s) {
      kt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function ky() {
  let t, a, i = new Promise((s, o) => {
    t = async (u) => {
      s(u);
      try {
        await i;
      } catch {
      }
    }, a = async (u) => {
      o(u);
      try {
        await i;
      } catch {
      }
    };
  });
  return {
    promise: i,
    //@ts-ignore
    resolve: t,
    //@ts-ignore
    reject: a
  };
}
var Wr = y.createContext(null);
Wr.displayName = "DataRouter";
var Sl = y.createContext(null);
Sl.displayName = "DataRouterState";
var Ux = y.createContext(!1);
function $x() {
  return y.useContext(Ux);
}
var zh = y.createContext({
  isTransitioning: !1
});
zh.displayName = "ViewTransition";
var Bx = y.createContext(
  /* @__PURE__ */ new Map()
);
Bx.displayName = "Fetchers";
var _N = y.createContext(null);
_N.displayName = "Await";
var Zn = y.createContext(
  null
);
Zn.displayName = "Navigation";
var Lc = y.createContext(
  null
);
Lc.displayName = "Location";
var Va = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Va.displayName = "Route";
var Oh = y.createContext(null);
Oh.displayName = "RouteError";
var Vx = "REACT_ROUTER_ERROR", MN = "REDIRECT", AN = "ROUTE_ERROR_RESPONSE";
function DN(t) {
  if (t.startsWith(`${Vx}:${MN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function kN(t) {
  if (t.startsWith(
    `${Vx}:${AN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Oc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function zN(t, { relative: a } = {}) {
  Ye(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = y.useContext(Zn), { hash: o, pathname: u, search: f } = jl(t, { relative: a }), p = u;
  return i !== "/" && (p = u === "/" ? i : Pn([i, u])), s.createHref({ pathname: p, search: f, hash: o });
}
function wl() {
  return y.useContext(Lc) != null;
}
function Ha() {
  return Ye(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(Lc).location;
}
var Hx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function qx(t) {
  y.useContext(Zn).static || y.useLayoutEffect(t);
}
function es() {
  let { isDataRoute: t } = y.useContext(Va);
  return t ? GN() : ON();
}
function ON() {
  Ye(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Zn), { matches: s } = y.useContext(Va), { pathname: o } = Ha(), u = JSON.stringify(_h(s)), f = y.useRef(!1);
  return qx(() => {
    f.current = !0;
  }), y.useCallback(
    (g, m = {}) => {
      if (kt(f.current, Hx), !f.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = zc(
        g,
        JSON.parse(u),
        o,
        m.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Pn([a, b.pathname])), (m.replace ? i.replace : i.push)(
        b,
        m.state,
        m
      );
    },
    [
      a,
      i,
      u,
      o,
      t
    ]
  );
}
y.createContext(null);
function jl(t, { relative: a } = {}) {
  let { matches: i } = y.useContext(Va), { pathname: s } = Ha(), o = JSON.stringify(_h(i));
  return y.useMemo(
    () => zc(
      t,
      JSON.parse(o),
      s,
      a === "path"
    ),
    [t, o, s, a]
  );
}
function LN(t, a, i) {
  Ye(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = y.useContext(Zn), { matches: o } = y.useContext(Va), u = o[o.length - 1], f = u ? u.params : {}, p = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", m = u && u.route;
  {
    let C = m && m.path || "";
    Yx(
      p,
      !m || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let b = Ha(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (g !== "/") {
    let C = g.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let j = yr(t, { pathname: S });
  return kt(
    m || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), kt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), HN(
    j && j.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, f, C.params),
        pathname: Pn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? g : Pn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            C.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function UN() {
  let t = YN(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, u = { padding: "2px 4px", backgroundColor: s }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, f);
}
var $N = /* @__PURE__ */ y.createElement(UN, null), Ix = class extends y.Component {
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
      const i = kN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement(Va.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Oh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(BN, { error: t }, a) : a;
  }
};
Ix.contextType = Ux;
var df = /* @__PURE__ */ new WeakMap();
function BN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Zn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = DN(a.digest);
    if (s) {
      let o = df.get(a);
      if (o) throw o;
      let u = jx(s.location, i);
      if (wx && !df.get(a))
        if (u.isExternal || s.reloadDocument)
          window.location.href = u.absoluteURL || u.to;
        else {
          const f = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(u.to, {
              replace: s.replace
            })
          );
          throw df.set(a, f), f;
        }
      return /* @__PURE__ */ y.createElement(
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
function VN({ routeContext: t, match: a, children: i }) {
  let s = y.useContext(Wr);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Va.Provider, { value: t }, i);
}
function HN(t, a = [], i) {
  let s = i?.state;
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
  let o = t, u = s?.errors;
  if (u != null) {
    let b = o.findIndex(
      (v) => v.route.id && u?.[v.route.id] !== void 0
    );
    Ye(
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
  if (i && s) {
    f = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (p = b), v.route.id) {
        let { loaderData: w, errors: S } = s, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || j) {
          i.isStatic && (f = !0), p >= 0 ? o = o.slice(0, p + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = i?.onError, m = s && g ? (b, v) => {
    g(b, {
      location: s.location,
      params: s.matches?.[0]?.params ?? {},
      unstable_pattern: xl(s.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, w) => {
      let S, j = !1, N = null, C = null;
      s && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || $N, f && (p < 0 && w === 0 ? (Yx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, C = null) : p === w && (j = !0, C = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), A = () => {
        let O;
        return S ? O = N : j ? O = C : v.route.Component ? O = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? O = v.route.element : O = b, /* @__PURE__ */ y.createElement(
          VN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: s != null
            },
            children: O
          }
        );
      };
      return s && (v.route.ErrorBoundary || v.route.errorElement || w === 0) ? /* @__PURE__ */ y.createElement(
        Ix,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: N,
          error: S,
          children: A(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: m
        }
      ) : A();
    },
    null
  );
}
function Lh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function qN(t) {
  let a = y.useContext(Wr);
  return Ye(a, Lh(t)), a;
}
function Fx(t) {
  let a = y.useContext(Sl);
  return Ye(a, Lh(t)), a;
}
function IN(t) {
  let a = y.useContext(Va);
  return Ye(a, Lh(t)), a;
}
function Uc(t) {
  let a = IN(t), i = a.matches[a.matches.length - 1];
  return Ye(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function FN() {
  return Uc(
    "useRouteId"
    /* UseRouteId */
  );
}
function El() {
  let t = Fx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Uc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function YN() {
  let t = y.useContext(Oh), a = Fx(
    "useRouteError"
    /* UseRouteError */
  ), i = Uc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function GN() {
  let { router: t } = qN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Uc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return qx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, u = {}) => {
      kt(i.current, Hx), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var zy = {};
function Yx(t, a, i) {
  !a && !zy[t] && (zy[t] = !0, kt(!1, i));
}
var Oy = {};
function Ly(t, a) {
  !t && !Oy[a] && (Oy[a] = !0, console.warn(a));
}
var PN = "useOptimistic", Uy = uE[PN], KN = () => {
};
function XN(t) {
  return Uy ? Uy(t) : [t, KN];
}
function QN(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && kt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && kt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && kt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var ZN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function JN(t, a) {
  return rN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: bE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: ZN,
    mapRouteProperties: QN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var WN = class {
  constructor() {
    this.status = "pending", this.promise = new Promise((t, a) => {
      this.resolve = (i) => {
        this.status === "pending" && (this.status = "resolved", t(i));
      }, this.reject = (i) => {
        this.status === "pending" && (this.status = "rejected", a(i));
      };
    });
  }
};
function eT({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = $x() || s;
  let [u, f] = y.useState(t.state), [p, g] = XN(u), [m, b] = y.useState(), [v, w] = y.useState({
    isTransitioning: !1
  }), [S, j] = y.useState(), [N, C] = y.useState(), [T, A] = y.useState(), O = y.useRef(/* @__PURE__ */ new Map()), R = y.useCallback(
    (q, { deletedFetchers: z, newErrors: Y, flushSync: ee, viewTransitionOpts: K }) => {
      Y && i && Object.values(Y).forEach(
        (ne) => i(ne, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: xl(q.matches)
        })
      ), q.fetchers.forEach((ne, k) => {
        ne.data !== void 0 && O.current.set(k, ne.data);
      }), z.forEach((ne) => O.current.delete(ne)), Ly(
        ee === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let oe = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Ly(
        K == null || oe,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !oe) {
        a && ee ? a(() => f(q)) : s === !1 ? f(q) : y.startTransition(() => {
          s === !0 && g((ne) => $y(ne, q)), f(q);
        });
        return;
      }
      if (a && ee) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let ne = t.window.document.startViewTransition(() => {
          a(() => f(q));
        });
        ne.finished.finally(() => {
          a(() => {
            j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(ne));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), A({
        state: q,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (b(q), w({
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
      s,
      g,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(R), [t, R]);
  let H = p.initialized;
  y.useLayoutEffect(() => {
    !H && t.state.initialized && R(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [H, R, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new WN());
  }, [v]), y.useEffect(() => {
    if (S && m && t.window) {
      let q = m, z = S.promise, Y = t.window.document.startViewTransition(async () => {
        s === !1 ? f(q) : y.startTransition(() => {
          s === !0 && g((ee) => $y(ee, q)), f(q);
        }), await z;
      });
      Y.finished.finally(() => {
        j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
      }), C(Y);
    }
  }, [
    m,
    S,
    t.window,
    s,
    g
  ]), y.useEffect(() => {
    S && m && p.location.key === m.location.key && S.resolve();
  }, [S, N, p.location, m]), y.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), w({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), A(void 0));
  }, [v.isTransitioning, T]);
  let X = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (q) => t.navigate(q),
    push: (q, z, Y) => t.navigate(q, {
      state: z,
      preventScrollReset: Y?.preventScrollReset
    }),
    replace: (q, z, Y) => t.navigate(q, {
      replace: !0,
      state: z,
      preventScrollReset: Y?.preventScrollReset
    })
  }), [t]), se = t.basename || "/", M = y.useMemo(
    () => ({
      router: t,
      navigator: X,
      static: !1,
      basename: se,
      onError: i
    }),
    [t, X, se, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: M }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: p }, /* @__PURE__ */ y.createElement(Bx.Provider, { value: O.current }, /* @__PURE__ */ y.createElement(zh.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    aT,
    {
      basename: se,
      location: p.location,
      navigationType: p.historyAction,
      navigator: X,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ y.createElement(
      tT,
      {
        routes: t.routes,
        future: t.future,
        state: p,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function $y(t, a) {
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
var tT = y.memo(nT);
function nT({
  routes: t,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return LN(t, void 0, { state: i, isStatic: s, onError: o });
}
function aT({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  Ye(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let p = t.replace(/^\/*/, "/"), g = y.useMemo(
    () => ({
      basename: p,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [p, o, u, f]
  );
  typeof i == "string" && (i = la(i));
  let {
    pathname: m = "/",
    search: b = "",
    hash: v = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = i, N = y.useMemo(() => {
    let C = Qn(m, p);
    return C == null ? null : {
      location: {
        pathname: C,
        search: b,
        hash: v,
        state: w,
        key: S,
        unstable_mask: j
      },
      navigationType: s
    };
  }, [
    p,
    m,
    b,
    v,
    w,
    S,
    s,
    j
  ]);
  return kt(
    N != null,
    `<Router basename="${p}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Zn.Provider, { value: g }, /* @__PURE__ */ y.createElement(Lc.Provider, { children: a, value: N }));
}
var cc = "get", uc = "application/x-www-form-urlencoded";
function $c(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function rT(t) {
  return $c(t) && t.tagName.toLowerCase() === "button";
}
function iT(t) {
  return $c(t) && t.tagName.toLowerCase() === "form";
}
function sT(t) {
  return $c(t) && t.tagName.toLowerCase() === "input";
}
function lT(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function oT(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !lT(t);
}
var Io = null;
function cT() {
  if (Io === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Io = !1;
    } catch {
      Io = !0;
    }
  return Io;
}
var uT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function ff(t) {
  return t != null && !uT.has(t) ? (kt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${uc}"`
  ), null) : t;
}
function dT(t, a) {
  let i, s, o, u, f;
  if (iT(t)) {
    let p = t.getAttribute("action");
    s = p ? Qn(p, a) : null, i = t.getAttribute("method") || cc, o = ff(t.getAttribute("enctype")) || uc, u = new FormData(t);
  } else if (rT(t) || sT(t) && (t.type === "submit" || t.type === "image")) {
    let p = t.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || p.getAttribute("action");
    if (s = g ? Qn(g, a) : null, i = t.getAttribute("formmethod") || p.getAttribute("method") || cc, o = ff(t.getAttribute("formenctype")) || ff(p.getAttribute("enctype")) || uc, u = new FormData(p, t), !cT()) {
      let { name: m, type: b, value: v } = t;
      if (b === "image") {
        let w = m ? `${m}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else m && u.append(m, v);
    }
  } else {
    if ($c(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = cc, s = null, o = uc, f = t;
  }
  return u && o === "text/plain" && (f = u, u = void 0), { action: s, method: i.toLowerCase(), encType: o, formData: u, body: f };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Uh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Gx(t, a, i, s) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && Qn(o.pathname, a) === "/" ? o.pathname = `${yc(a)}/_root.${s}` : o.pathname = `${yc(o.pathname)}.${s}`, o;
}
async function fT(t, a) {
  if (t.id in a)
    return a[t.id];
  try {
    let i = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      t.module
    );
    return a[t.id] = i, i;
  } catch (i) {
    return console.error(
      `Error loading route module \`${t.module}\`, reloading page...`
    ), console.error(i), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function hT(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function mT(t, a, i) {
  let s = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await fT(u, i);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return yT(
    s.flat(1).filter(hT).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function By(t, a, i, s, o, u) {
  let f = (g, m) => i[m] ? g.route.id !== i[m].route.id : !0, p = (g, m) => (
    // param change, /users/123 -> /users/456
    i[m].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[m].route.path?.endsWith("*") && i[m].params["*"] !== g.params["*"]
  );
  return u === "assets" ? a.filter(
    (g, m) => f(g, m) || p(g, m)
  ) : u === "data" ? a.filter((g, m) => {
    let b = s.routes[g.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(g, m) || p(g, m))
      return !0;
    if (g.route.shouldRevalidate) {
      let v = g.route.shouldRevalidate({
        currentUrl: new URL(
          o.pathname + o.search + o.hash,
          window.origin
        ),
        currentParams: i[0]?.params || {},
        nextUrl: new URL(t, window.origin),
        nextParams: g.params,
        defaultShouldRevalidate: !0
      });
      if (typeof v == "boolean")
        return v;
    }
    return !0;
  }) : [];
}
function pT(t, a, { includeHydrateFallback: i } = {}) {
  return vT(
    t.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function vT(t) {
  return [...new Set(t)];
}
function gT(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let s of i)
    a[s] = t[s];
  return a;
}
function yT(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((s, o) => {
    let u = JSON.stringify(gT(o));
    return i.has(u) || (i.add(u), s.push({ key: u, link: o })), s;
  }, []);
}
function $h() {
  let t = y.useContext(Wr);
  return Uh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function bT() {
  let t = y.useContext(Sl);
  return Uh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Bh = y.createContext(void 0);
Bh.displayName = "FrameworkContext";
function Vh() {
  let t = y.useContext(Bh);
  return Uh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function xT(t, a) {
  let i = y.useContext(Bh), [s, o] = y.useState(!1), [u, f] = y.useState(!1), { onFocus: p, onBlur: g, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = a, w = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && f(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((A) => {
          f(A.isIntersecting);
        });
      }, C = new IntersectionObserver(N, { threshold: 0.5 });
      return w.current && C.observe(w.current), () => {
        C.disconnect();
      };
    }
  }, [t]), y.useEffect(() => {
    if (s) {
      let N = setTimeout(() => {
        f(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [s]);
  let S = () => {
    o(!0);
  }, j = () => {
    o(!1), f(!1);
  };
  return i ? t !== "intent" ? [u, w, {}] : [
    u,
    w,
    {
      onFocus: Js(p, S),
      onBlur: Js(g, j),
      onMouseEnter: Js(m, S),
      onMouseLeave: Js(b, j),
      onTouchStart: Js(v, S)
    }
  ] : [!1, w, {}];
}
function Js(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function ST({ page: t, ...a }) {
  let i = $x(), { router: s } = $h(), o = y.useMemo(
    () => yr(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(jT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(ET, { page: t, matches: o, ...a }) : null;
}
function wT(t) {
  let { manifest: a, routeModules: i } = Vh(), [s, o] = y.useState([]);
  return y.useEffect(() => {
    let u = !1;
    return mT(t, a, i).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, i]), s;
}
function jT({
  page: t,
  matches: a,
  ...i
}) {
  let s = Ha(), { future: o } = Vh(), { basename: u } = $h(), f = y.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let p = Gx(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, m = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : m.push(b.route.id);
    return g && m.length > 0 && p.searchParams.set("_routes", m.join(",")), [p.pathname + p.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    s,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, f.map((p) => /* @__PURE__ */ y.createElement("link", { key: p, rel: "prefetch", as: "fetch", href: p, ...i })));
}
function ET({
  page: t,
  matches: a,
  ...i
}) {
  let s = Ha(), { future: o, manifest: u, routeModules: f } = Vh(), { basename: p } = $h(), { loaderData: g, matches: m } = bT(), b = y.useMemo(
    () => By(
      t,
      a,
      m,
      u,
      s,
      "data"
    ),
    [t, a, m, u, s]
  ), v = y.useMemo(
    () => By(
      t,
      a,
      m,
      u,
      s,
      "assets"
    ),
    [t, a, m, u, s]
  ), w = y.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((A) => {
      let O = u.routes[A.route.id];
      !O || !O.hasLoader || (!b.some((R) => R.route.id === A.route.id) && A.route.id in g && f[A.route.id]?.shouldRevalidate || O.hasClientLoader ? C = !0 : N.add(A.route.id));
    }), N.size === 0)
      return [];
    let T = Gx(
      t,
      p,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((A) => N.has(A.route.id)).map((A) => A.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    p,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    s,
    u,
    b,
    a,
    t,
    f
  ]), S = y.useMemo(
    () => pT(v, u),
    [v, u]
  ), j = wT(v);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, w.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), S.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), j.map(({ key: N, link: C }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: N,
        nonce: i.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function NT(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var TT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  TT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Px = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Hh = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: p,
    state: g,
    target: m,
    to: b,
    preventScrollReset: v,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: C, navigator: T, unstable_useTransitions: A } = y.useContext(Zn), O = typeof b == "string" && Px.test(b), R = jx(b, C);
    b = R.to;
    let H = zN(b, { relative: o }), X = Ha(), se = null;
    if (p) {
      let ne = zc(
        p,
        [],
        X.unstable_mask ? X.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (ne.pathname = ne.pathname === "/" ? C : Pn([C, ne.pathname])), se = T.createHref(ne);
    }
    let [M, q, z] = xT(
      s,
      j
    ), Y = MT(b, {
      replace: f,
      unstable_mask: p,
      state: g,
      target: m,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: A
    });
    function ee(ne) {
      a && a(ne), ne.defaultPrevented || Y(ne);
    }
    let K = !(R.isExternal || u), oe = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...j,
          ...z,
          href: (K ? se : void 0) || R.absoluteURL || H,
          onClick: K ? ee : a,
          ref: NT(N, q),
          target: m,
          "data-discover": !O && i === "render" ? "true" : void 0
        }
      )
    );
    return M && !O ? /* @__PURE__ */ y.createElement(y.Fragment, null, oe, /* @__PURE__ */ y.createElement(ST, { page: H })) : oe;
  }
);
Hh.displayName = "Link";
var CT = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: p,
    children: g,
    ...m
  }, b) {
    let v = jl(f, { relative: m.relative }), w = Ha(), S = y.useContext(Sl), { navigator: j, basename: N } = y.useContext(Zn), C = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    OT(v) && p === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, A = w.pathname, O = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    i || (A = A.toLowerCase(), O = O ? O.toLowerCase() : null, T = T.toLowerCase()), O && N && (O = Qn(O, N) || O);
    const R = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let H = A === T || !o && A.startsWith(T) && A.charAt(R) === "/", X = O != null && (O === T || !o && O.startsWith(T) && O.charAt(T.length) === "/"), se = {
      isActive: H,
      isPending: X,
      isTransitioning: C
    }, M = H ? a : void 0, q;
    typeof s == "function" ? q = s(se) : q = [
      s,
      H ? "active" : null,
      X ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let z = typeof u == "function" ? u(se) : u;
    return /* @__PURE__ */ y.createElement(
      Hh,
      {
        ...m,
        "aria-current": M,
        className: q,
        ref: b,
        style: z,
        to: f,
        viewTransition: p
      },
      typeof g == "function" ? g(se) : g
    );
  }
);
CT.displayName = "NavLink";
var RT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: u,
    method: f = cc,
    action: p,
    onSubmit: g,
    relative: m,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = y.useContext(Zn), C = kT(), T = zT(p, { relative: m }), A = f.toLowerCase() === "get" ? "get" : "post", O = typeof p == "string" && Px.test(p), R = (H) => {
      if (g && g(H), H.defaultPrevented) return;
      H.preventDefault();
      let X = H.nativeEvent.submitter, se = X?.getAttribute("formmethod") || f, M = () => C(X || H.currentTarget, {
        fetcherKey: a,
        method: se,
        navigate: i,
        replace: o,
        state: u,
        relative: m,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: w
      });
      N && i !== !1 ? y.startTransition(() => M()) : M();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: j,
        method: A,
        action: T,
        onSubmit: s ? g : R,
        ...S,
        "data-discover": !O && t === "render" ? "true" : void 0
      }
    );
  }
);
RT.displayName = "Form";
function _T(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Kx(t) {
  let a = y.useContext(Wr);
  return Ye(a, _T(t)), a;
}
function MT(t, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: p,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: m
} = {}) {
  let b = es(), v = Ha(), w = jl(t, { relative: f });
  return y.useCallback(
    (S) => {
      if (oT(S, a)) {
        S.preventDefault();
        let j = i !== void 0 ? i : va(v) === va(w), N = () => b(t, {
          replace: j,
          unstable_mask: s,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: p,
          unstable_defaultShouldRevalidate: g
        });
        m ? y.startTransition(() => N()) : N();
      }
    },
    [
      v,
      b,
      w,
      i,
      s,
      o,
      a,
      t,
      u,
      f,
      p,
      g,
      m
    ]
  );
}
var AT = 0, DT = () => `__${String(++AT)}__`;
function kT() {
  let { router: t } = Kx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Zn), i = FN(), s = t.fetch, o = t.navigate;
  return y.useCallback(
    async (u, f = {}) => {
      let { action: p, method: g, encType: m, formData: b, body: v } = dT(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || DT();
        await s(w, i, f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || g,
          formEncType: f.encType || m,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || p, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || g,
          formEncType: f.encType || m,
          replace: f.replace,
          state: f.state,
          fromRouteId: i,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition
        });
    },
    [s, o, a, i]
  );
}
function zT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(Zn), s = y.useContext(Va);
  Ye(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), u = { ...jl(t || ".", { relative: a }) }, f = Ha();
  if (t == null) {
    u.search = f.search;
    let p = new URLSearchParams(u.search), g = p.getAll("index");
    if (g.some((b) => b === "")) {
      p.delete("index"), g.filter((v) => v).forEach((v) => p.append("index", v));
      let b = p.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Pn([i, u.pathname])), va(u);
}
function OT(t, { relative: a } = {}) {
  let i = y.useContext(zh);
  Ye(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Kx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = Qn(i.currentLocation.pathname, s) || i.currentLocation.pathname, f = Qn(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return gc(o.pathname, f) != null || gc(o.pathname, u) != null;
}
class ts extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const ga = "/api/v1/extensions/nexus.audio.emotiontts";
async function mt(t, a) {
  const i = t.startsWith("http") ? t : `${ga}${t}`, s = await fetch(i, {
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
    throw new ts(
      s.status,
      o?.category ?? "unknown",
      o?.message ?? s.statusText,
      o?.requestId
    );
  }
  if (s.status !== 204)
    return await s.json();
}
function LT(t, a, i) {
  const s = t.startsWith("http") ? t : `${ga}${t}`, o = new EventSource(s);
  return o.onmessage = (u) => {
    if (u.data)
      try {
        a(JSON.parse(u.data));
      } catch {
      }
  }, o.onerror = (u) => {
    i?.(u);
  }, () => o.close();
}
async function UT() {
  return mt("/deployments");
}
async function Vy(t) {
  return mt(`/deployments/${t}`);
}
async function $T(t, a) {
  return mt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Hy(t) {
  return mt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function qh(t, a) {
  return mt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ul(t, a, i) {
  return mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Xx(t, a) {
  await mt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function BT(t) {
  return mt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function VT(t, a, i = "error") {
  return mt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function HT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return mt(`/deployments/${t}/runs${o}`);
}
async function qT(t, a) {
  return mt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Ih(t, a) {
  return mt(`/deployments/${t}/runs/${a}`);
}
async function IT(t, a) {
  return mt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function Qx(t, a) {
  return mt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function FT(t, a) {
  return mt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function qy(t, a, i, s) {
  return LT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    s
  );
}
async function Xi(t) {
  return mt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function bc(t, a, i, s, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", i), u.append("kind", s), u.append("audio", a);
  const f = await fetch(`${ga}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function YT(t, a) {
  await mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function GT(t, a, i) {
  return mt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function PT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${ga}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function KT(t) {
  return mt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var XT = "mux0i60", QT = "mux0i61", ZT = "mux0i62", JT = "mux0i63";
function Bc({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ c.jsxs("div", { className: XT, children: [
    /* @__PURE__ */ c.jsx("span", { className: QT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: ZT, children: a }),
    i ? /* @__PURE__ */ c.jsx("p", { className: JT, children: i }) : null
  ] });
}
var WT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, eC = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, tC = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, nC = "zwn3019";
function $a({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: u,
  style: f,
  ...p
}) {
  const g = [WT[t], tC[a], eC[i], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(s, { className: g, style: f, "data-elevation": i, ...p, children: o });
}
function aC({ children: t, className: a }) {
  const i = [nC, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, children: t });
}
var Kr = "vrkn5p0", rC = "_93p6291", iC = "_93p6292", sC = "_93p6293", lC = "_93p6294", oC = "_93p6295", cC = "_93p6296", uC = "_93p6297", dC = "_93p6298", fC = "_93p6299", hC = "_93p629a", mC = "_93p629b", pC = "_93p629c", vC = "_93p629d", gC = "_93p629e";
const yC = "nexus-host-navigate";
function bC(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function xC(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const i = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(yC, {
      detail: i
    })
  );
}
function SC() {
  const { deployments: t } = El(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: rC, children: [
    /* @__PURE__ */ c.jsxs("header", { className: iC, children: [
      /* @__PURE__ */ c.jsx("p", { className: sC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: lC, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: oC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: cC, children: [
        /* @__PURE__ */ c.jsx("span", { className: uC, children: t.length }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      $a,
      {
        density: "airy",
        elevation: "raised",
        className: dC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Kr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Bc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: fC, children: t.map((i) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: bC(i.deploymentId),
              onClick: (s) => xC(s, i.deploymentId),
              className: hC,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: mC, "aria-hidden": "true", children: wC(i.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: pC, children: i.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: vC, children: i.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: gC, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function wC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Fh = vx();
const jC = /* @__PURE__ */ px(Fh);
function EC(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const NC = (t) => {
  switch (t) {
    case "success":
      return RC;
    case "info":
      return MC;
    case "warning":
      return _C;
    case "error":
      return AC;
    default:
      return null;
  }
}, TC = Array(12).fill(0), CC = ({ visible: t, className: a }) => /* @__PURE__ */ ye.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-spinner"
}, TC.map((i, s) => /* @__PURE__ */ ye.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), RC = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), _C = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), MC = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), AC = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ye.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), DC = /* @__PURE__ */ ye.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ye.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ye.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), kC = () => {
  const [t, a] = ye.useState(document.hidden);
  return ye.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let eh = 1;
class zC {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      const i = this.subscribers.indexOf(a);
      this.subscribers.splice(i, 1);
    }), this.publish = (a) => {
      this.subscribers.forEach((i) => i(a));
    }, this.addToast = (a) => {
      this.publish(a), this.toasts = [
        ...this.toasts,
        a
      ];
    }, this.create = (a) => {
      var i;
      const { message: s, ...o } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : eh++, f = this.toasts.find((g) => g.id === u), p = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({
        ...g,
        ...a,
        id: u,
        title: s
      }), {
        ...g,
        ...a,
        id: u,
        dismissible: p,
        title: s
      }) : g) : this.addToast({
        title: s,
        ...o,
        dismissible: p,
        id: u
      }), u;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((s) => s({
        id: i.id,
        dismiss: !0
      }));
    }), a), this.message = (a, i) => this.create({
      ...i,
      message: a
    }), this.error = (a, i) => this.create({
      ...i,
      message: a,
      type: "error"
    }), this.success = (a, i) => this.create({
      ...i,
      type: "success",
      message: a
    }), this.info = (a, i) => this.create({
      ...i,
      type: "info",
      message: a
    }), this.warning = (a, i) => this.create({
      ...i,
      type: "warning",
      message: a
    }), this.loading = (a, i) => this.create({
      ...i,
      type: "loading",
      message: a
    }), this.promise = (a, i) => {
      if (!i)
        return;
      let s;
      i.loading !== void 0 && (s = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let u = s !== void 0, f;
      const p = o.then(async (m) => {
        if (f = [
          "resolve",
          m
        ], ye.isValidElement(m))
          u = !1, this.create({
            id: s,
            type: "default",
            message: m
          });
        else if (LC(m) && !m.ok) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${m.status}`) : i.error, w = typeof i.description == "function" ? await i.description(`HTTP error! status: ${m.status}`) : i.description, j = typeof v == "object" && !ye.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: w,
            ...j
          });
        } else if (m instanceof Error) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(m) : i.error, w = typeof i.description == "function" ? await i.description(m) : i.description, j = typeof v == "object" && !ye.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: w,
            ...j
          });
        } else if (i.success !== void 0) {
          u = !1;
          const v = typeof i.success == "function" ? await i.success(m) : i.success, w = typeof i.description == "function" ? await i.description(m) : i.description, j = typeof v == "object" && !ye.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (m) => {
        if (f = [
          "reject",
          m
        ], i.error !== void 0) {
          u = !1;
          const b = typeof i.error == "function" ? await i.error(m) : i.error, v = typeof i.description == "function" ? await i.description(m) : i.description, S = typeof b == "object" && !ye.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: s,
            type: "error",
            description: v,
            ...S
          });
        }
      }).finally(() => {
        u && (this.dismiss(s), s = void 0), i.finally == null || i.finally.call(i);
      }), g = () => new Promise((m, b) => p.then(() => f[0] === "reject" ? b(f[1]) : m(f[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: g
      } : Object.assign(s, {
        unwrap: g
      });
    }, this.custom = (a, i) => {
      const s = i?.id || eh++;
      return this.create({
        jsx: a(s),
        id: s,
        ...i
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Sn = new zC(), OC = (t, a) => {
  const i = a?.id || eh++;
  return Sn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, LC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", UC = OC, $C = () => Sn.toasts, BC = () => Sn.getActiveToasts(), tn = Object.assign(UC, {
  success: Sn.success,
  info: Sn.info,
  warning: Sn.warning,
  error: Sn.error,
  custom: Sn.custom,
  message: Sn.message,
  promise: Sn.promise,
  dismiss: Sn.dismiss,
  loading: Sn.loading
}, {
  getHistory: $C,
  getToasts: BC
});
EC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Fo(t) {
  return t.label !== void 0;
}
const VC = 3, HC = "24px", qC = "16px", Iy = 4e3, IC = 356, FC = 14, YC = 45, GC = 200;
function pa(...t) {
  return t.filter(Boolean).join(" ");
}
function PC(t) {
  const [a, i] = t.split("-"), s = [];
  return a && s.push(a), i && s.push(i), s;
}
const KC = (t) => {
  var a, i, s, o, u, f, p, g, m;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: C, index: T, toasts: A, expanded: O, removeToast: R, defaultRichColors: H, closeButton: X, style: se, cancelButtonStyle: M, actionButtonStyle: q, className: z = "", descriptionClassName: Y = "", duration: ee, position: K, gap: oe, expandByDefault: ne, classNames: k, icons: U, closeButtonAriaLabel: V = "Close toast" } = t, [G, ce] = ye.useState(null), [_, te] = ye.useState(null), [re, F] = ye.useState(!1), [$, ae] = ye.useState(!1), [de, pe] = ye.useState(!1), [Me, Le] = ye.useState(!1), [je, pt] = ye.useState(!1), [Ue, ut] = ye.useState(0), [cn, zn] = ye.useState(0), It = ye.useRef(v.duration || ee || Iy), Jn = ye.useRef(null), Ft = ye.useRef(null), un = T === 0, Wn = T + 1 <= N, Ct = v.type, nn = v.dismissible !== !1, Rt = v.className || "", Q = v.descriptionClassName || "", ve = ye.useMemo(() => C.findIndex((Oe) => Oe.toastId === v.id) || 0, [
    C,
    v.id
  ]), xe = ye.useMemo(() => {
    var Oe;
    return (Oe = v.closeButton) != null ? Oe : X;
  }, [
    v.closeButton,
    X
  ]), be = ye.useMemo(() => v.duration || ee || Iy, [
    v.duration,
    ee
  ]), rt = ye.useRef(0), $e = ye.useRef(0), Xt = ye.useRef(0), On = ye.useRef(null), [fn, _t] = K.split("-"), wt = ye.useMemo(() => C.reduce((Oe, dt, zt) => zt >= ve ? Oe : Oe + dt.height, 0), [
    C,
    ve
  ]), jt = kC(), qa = v.invert || b, Ia = Ct === "loading";
  $e.current = ye.useMemo(() => ve * oe + wt, [
    ve,
    wt
  ]), ye.useEffect(() => {
    It.current = be;
  }, [
    be
  ]), ye.useEffect(() => {
    F(!0);
  }, []), ye.useEffect(() => {
    const Oe = Ft.current;
    if (Oe) {
      const dt = Oe.getBoundingClientRect().height;
      return zn(dt), j((zt) => [
        {
          toastId: v.id,
          height: dt,
          position: v.position
        },
        ...zt
      ]), () => j((zt) => zt.filter((Yt) => Yt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), ye.useLayoutEffect(() => {
    if (!re) return;
    const Oe = Ft.current, dt = Oe.style.height;
    Oe.style.height = "auto";
    const zt = Oe.getBoundingClientRect().height;
    Oe.style.height = dt, zn(zt), j((Yt) => Yt.find((it) => it.toastId === v.id) ? Yt.map((it) => it.toastId === v.id ? {
      ...it,
      height: zt
    } : it) : [
      {
        toastId: v.id,
        height: zt,
        position: v.position
      },
      ...Yt
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
  const Ln = ye.useCallback(() => {
    ae(!0), ut($e.current), j((Oe) => Oe.filter((dt) => dt.toastId !== v.id)), setTimeout(() => {
      R(v);
    }, GC);
  }, [
    v,
    R,
    j,
    $e
  ]);
  ye.useEffect(() => {
    if (v.promise && Ct === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Oe;
    return O || S || jt ? (() => {
      if (Xt.current < rt.current) {
        const Yt = (/* @__PURE__ */ new Date()).getTime() - rt.current;
        It.current = It.current - Yt;
      }
      Xt.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      It.current !== 1 / 0 && (rt.current = (/* @__PURE__ */ new Date()).getTime(), Oe = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), Ln();
      }, It.current));
    })(), () => clearTimeout(Oe);
  }, [
    O,
    S,
    v,
    Ct,
    jt,
    Ln
  ]), ye.useEffect(() => {
    v.delete && (Ln(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    Ln,
    v.delete
  ]);
  function ya() {
    var Oe;
    if (U?.loading) {
      var dt;
      return /* @__PURE__ */ ye.createElement("div", {
        className: pa(k?.loader, v == null || (dt = v.classNames) == null ? void 0 : dt.loader, "sonner-loader"),
        "data-visible": Ct === "loading"
      }, U.loading);
    }
    return /* @__PURE__ */ ye.createElement(CC, {
      className: pa(k?.loader, v == null || (Oe = v.classNames) == null ? void 0 : Oe.loader),
      visible: Ct === "loading"
    });
  }
  const ea = v.icon || U?.[Ct] || NC(Ct);
  var oa, hn;
  return /* @__PURE__ */ ye.createElement("li", {
    tabIndex: 0,
    ref: Ft,
    className: pa(z, Rt, k?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, k?.default, k?.[Ct], v == null || (i = v.classNames) == null ? void 0 : i[Ct]),
    "data-sonner-toast": "",
    "data-rich-colors": (oa = v.richColors) != null ? oa : H,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": re,
    "data-promise": !!v.promise,
    "data-swiped": je,
    "data-removed": $,
    "data-visible": Wn,
    "data-y-position": fn,
    "data-x-position": _t,
    "data-index": T,
    "data-front": un,
    "data-swiping": de,
    "data-dismissible": nn,
    "data-type": Ct,
    "data-invert": qa,
    "data-swipe-out": Me,
    "data-swipe-direction": _,
    "data-expanded": !!(O || ne && re),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": A.length - T,
      "--offset": `${$ ? Ue : $e.current}px`,
      "--initial-height": ne ? "auto" : `${cn}px`,
      ...se,
      ...v.style
    },
    onDragEnd: () => {
      pe(!1), ce(null), On.current = null;
    },
    onPointerDown: (Oe) => {
      Oe.button !== 2 && (Ia || !nn || (Jn.current = /* @__PURE__ */ new Date(), ut($e.current), Oe.target.setPointerCapture(Oe.pointerId), Oe.target.tagName !== "BUTTON" && (pe(!0), On.current = {
        x: Oe.clientX,
        y: Oe.clientY
      })));
    },
    onPointerUp: () => {
      var Oe, dt, zt;
      if (Me || !nn) return;
      On.current = null;
      const Yt = Number(((Oe = Ft.current) == null ? void 0 : Oe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), jn = Number(((dt = Ft.current) == null ? void 0 : dt.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((zt = Jn.current) == null ? void 0 : zt.getTime()), Qt = G === "x" ? Yt : jn, ba = Math.abs(Qt) / it;
      if (Math.abs(Qt) >= YC || ba > 0.11) {
        ut($e.current), v.onDismiss == null || v.onDismiss.call(v, v), te(G === "x" ? Yt > 0 ? "right" : "left" : jn > 0 ? "down" : "up"), Ln(), Le(!0);
        return;
      } else {
        var an, D;
        (an = Ft.current) == null || an.style.setProperty("--swipe-amount-x", "0px"), (D = Ft.current) == null || D.style.setProperty("--swipe-amount-y", "0px");
      }
      pt(!1), pe(!1), ce(null);
    },
    onPointerMove: (Oe) => {
      var dt, zt, Yt;
      if (!On.current || !nn || ((dt = window.getSelection()) == null ? void 0 : dt.toString().length) > 0) return;
      const it = Oe.clientY - On.current.y, Qt = Oe.clientX - On.current.x;
      var ba;
      const an = (ba = t.swipeDirections) != null ? ba : PC(K);
      !G && (Math.abs(Qt) > 1 || Math.abs(it) > 1) && ce(Math.abs(Qt) > Math.abs(it) ? "x" : "y");
      let D = {
        x: 0,
        y: 0
      };
      const I = (Z) => 1 / (1.5 + Math.abs(Z) / 20);
      if (G === "y") {
        if (an.includes("top") || an.includes("bottom"))
          if (an.includes("top") && it < 0 || an.includes("bottom") && it > 0)
            D.y = it;
          else {
            const Z = it * I(it);
            D.y = Math.abs(Z) < Math.abs(it) ? Z : it;
          }
      } else if (G === "x" && (an.includes("left") || an.includes("right")))
        if (an.includes("left") && Qt < 0 || an.includes("right") && Qt > 0)
          D.x = Qt;
        else {
          const Z = Qt * I(Qt);
          D.x = Math.abs(Z) < Math.abs(Qt) ? Z : Qt;
        }
      (Math.abs(D.x) > 0 || Math.abs(D.y) > 0) && pt(!0), (zt = Ft.current) == null || zt.style.setProperty("--swipe-amount-x", `${D.x}px`), (Yt = Ft.current) == null || Yt.style.setProperty("--swipe-amount-y", `${D.y}px`);
    }
  }, xe && !v.jsx && Ct !== "loading" ? /* @__PURE__ */ ye.createElement("button", {
    "aria-label": V,
    "data-disabled": Ia,
    "data-close-button": !0,
    onClick: Ia || !nn ? () => {
    } : () => {
      Ln(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: pa(k?.closeButton, v == null || (s = v.classNames) == null ? void 0 : s.closeButton)
  }, (hn = U?.close) != null ? hn : DC) : null, (Ct || v.icon || v.promise) && v.icon !== null && (U?.[Ct] !== null || v.icon) ? /* @__PURE__ */ ye.createElement("div", {
    "data-icon": "",
    className: pa(k?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || ya() : null, v.type !== "loading" ? ea : null) : null, /* @__PURE__ */ ye.createElement("div", {
    "data-content": "",
    className: pa(k?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ye.createElement("div", {
    "data-title": "",
    className: pa(k?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ ye.createElement("div", {
    "data-description": "",
    className: pa(Y, Q, k?.description, v == null || (p = v.classNames) == null ? void 0 : p.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ ye.isValidElement(v.cancel) ? v.cancel : v.cancel && Fo(v.cancel) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (Oe) => {
      Fo(v.cancel) && nn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Oe), Ln());
    },
    className: pa(k?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ ye.isValidElement(v.action) ? v.action : v.action && Fo(v.action) ? /* @__PURE__ */ ye.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || q,
    onClick: (Oe) => {
      Fo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Oe), !Oe.defaultPrevented && Ln());
    },
    className: pa(k?.actionButton, v == null || (m = v.classNames) == null ? void 0 : m.actionButton)
  }, v.action.label) : null);
};
function Fy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function XC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((s, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", p = u ? qC : HC;
    function g(m) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        i[`${f}-${b}`] = typeof m == "number" ? `${m}px` : m;
      });
    }
    typeof s == "number" || typeof s == "string" ? g(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((m) => {
      s[m] === void 0 ? i[`${f}-${m}`] = p : i[`${f}-${m}`] = typeof s[m] == "number" ? `${s[m]}px` : s[m];
    }) : g(p);
  }), i;
}
const QC = /* @__PURE__ */ ye.forwardRef(function(a, i) {
  const { id: s, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: p, closeButton: g, className: m, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: C = VC, toastOptions: T, dir: A = Fy(), gap: O = FC, icons: R, containerAriaLabel: H = "Notifications" } = a, [X, se] = ye.useState([]), M = ye.useMemo(() => s ? X.filter((re) => re.toasterId === s) : X.filter((re) => !re.toasterId), [
    X,
    s
  ]), q = ye.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((re) => re.position).map((re) => re.position)))), [
    M,
    u
  ]), [z, Y] = ye.useState([]), [ee, K] = ye.useState(!1), [oe, ne] = ye.useState(!1), [k, U] = ye.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), V = ye.useRef(null), G = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ce = ye.useRef(null), _ = ye.useRef(!1), te = ye.useCallback((re) => {
    se((F) => {
      var $;
      return ($ = F.find((ae) => ae.id === re.id)) != null && $.delete || Sn.dismiss(re.id), F.filter(({ id: ae }) => ae !== re.id);
    });
  }, []);
  return ye.useEffect(() => Sn.subscribe((re) => {
    if (re.dismiss) {
      requestAnimationFrame(() => {
        se((F) => F.map(($) => $.id === re.id ? {
          ...$,
          delete: !0
        } : $));
      });
      return;
    }
    setTimeout(() => {
      jC.flushSync(() => {
        se((F) => {
          const $ = F.findIndex((ae) => ae.id === re.id);
          return $ !== -1 ? [
            ...F.slice(0, $),
            {
              ...F[$],
              ...re
            },
            ...F.slice($ + 1)
          ] : [
            re,
            ...F
          ];
        });
      });
    });
  }), [
    X
  ]), ye.useEffect(() => {
    if (w !== "system") {
      U(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? U("dark") : U("light")), typeof window > "u") return;
    const re = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      re.addEventListener("change", ({ matches: F }) => {
        U(F ? "dark" : "light");
      });
    } catch {
      re.addListener(({ matches: $ }) => {
        try {
          U($ ? "dark" : "light");
        } catch (ae) {
          console.error(ae);
        }
      });
    }
  }, [
    w
  ]), ye.useEffect(() => {
    X.length <= 1 && K(!1);
  }, [
    X
  ]), ye.useEffect(() => {
    const re = (F) => {
      var $;
      if (f.every((pe) => F[pe] || F.code === pe)) {
        var de;
        K(!0), (de = V.current) == null || de.focus();
      }
      F.code === "Escape" && (document.activeElement === V.current || ($ = V.current) != null && $.contains(document.activeElement)) && K(!1);
    };
    return document.addEventListener("keydown", re), () => document.removeEventListener("keydown", re);
  }, [
    f
  ]), ye.useEffect(() => {
    if (V.current)
      return () => {
        ce.current && (ce.current.focus({
          preventScroll: !0
        }), ce.current = null, _.current = !1);
      };
  }, [
    V.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ye.createElement("section", {
    ref: i,
    "aria-label": `${H} ${G}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((re, F) => {
    var $;
    const [ae, de] = re.split("-");
    return M.length ? /* @__PURE__ */ ye.createElement("ol", {
      key: re,
      dir: A === "auto" ? Fy() : A,
      tabIndex: -1,
      ref: V,
      className: m,
      "data-sonner-toaster": !0,
      "data-sonner-theme": k,
      "data-y-position": ae,
      "data-x-position": de,
      style: {
        "--front-toast-height": `${(($ = z[0]) == null ? void 0 : $.height) || 0}px`,
        "--width": `${IC}px`,
        "--gap": `${O}px`,
        ...N,
        ...XC(b, v)
      },
      onBlur: (pe) => {
        _.current && !pe.currentTarget.contains(pe.relatedTarget) && (_.current = !1, ce.current && (ce.current.focus({
          preventScroll: !0
        }), ce.current = null));
      },
      onFocus: (pe) => {
        pe.target instanceof HTMLElement && pe.target.dataset.dismissible === "false" || _.current || (_.current = !0, ce.current = pe.relatedTarget);
      },
      onMouseEnter: () => K(!0),
      onMouseMove: () => K(!0),
      onMouseLeave: () => {
        oe || K(!1);
      },
      onDragEnd: () => K(!1),
      onPointerDown: (pe) => {
        pe.target instanceof HTMLElement && pe.target.dataset.dismissible === "false" || ne(!0);
      },
      onPointerUp: () => ne(!1)
    }, M.filter((pe) => !pe.position && F === 0 || pe.position === re).map((pe, Me) => {
      var Le, je;
      return /* @__PURE__ */ ye.createElement(KC, {
        key: pe.id,
        icons: R,
        index: Me,
        toast: pe,
        defaultRichColors: S,
        duration: (Le = T?.duration) != null ? Le : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (je = T?.closeButton) != null ? je : g,
        interacting: oe,
        position: re,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: te,
        toasts: M.filter((pt) => pt.position == pe.position),
        heights: z.filter((pt) => pt.position == pe.position),
        setHeights: Y,
        expandByDefault: p,
        gap: O,
        expanded: ee,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Yy = 32, Gy = -30, Py = -6, Ky = 0.5, Xy = 2, Qy = -24, Zy = 24, Jy = -12, Wy = 12, e0 = -12, t0 = 12, n0 = -60, a0 = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Zx(t, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${ga}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (f.status === 409) {
    const p = await f.json().catch(() => null), g = p?.error?.current_digest ?? "", m = p?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(g, m);
  }
  if (!f.ok)
    throw new Error(await Vc(f, "apply"));
  return await f.json();
}
async function ZC(t, a, i, s, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, f = `${ga}${u}`, p = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (p.status === 409) {
    const g = await p.json().catch(() => null), m = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(m, b);
  }
  if (!p.ok)
    throw new Error(await Vc(p, "apply"));
  return await p.json();
}
async function JC(t, a, i = {}) {
  const s = `${ga}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function WC(t, a, i, s = {}) {
  const o = `${ga}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (!u.ok)
    throw new Error(await Vc(u, "preview"));
  return u.blob();
}
async function dc(t, a, i, s = 50, o = {}) {
  const u = `${ga}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(s))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Vc(f, "audit fetch"));
  return await f.json();
}
function wn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Jx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Yy)
    return {
      message: `Chain exceeds the maximum of ${Yy} operations.`
    };
  for (const i of t.ops) {
    const s = eR(i, a);
    if (s) return s;
  }
  return null;
}
function eR(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return tR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Gy || t.target_lufs > Py ? {
        opId: t.id,
        message: `Normalize target must be between ${Gy} and ${Py} LUFS.`
      } : null;
    case "speed":
      return t.factor < Ky || t.factor > Xy ? {
        opId: t.id,
        message: `Speed factor must be between ${Ky}× and ${Xy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Qy || t.gain_db > Zy ? {
        opId: t.id,
        message: `Volume must be between ${Qy} and ${Zy} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (s < Jy || s > Wy)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Jy} and ${Wy} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < e0 || t.semitones > t0 ? {
        opId: t.id,
        message: `Pitch must be between ${e0} and ${t0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < n0 || t.threshold_db > a0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${n0} and ${a0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function tR(t, a, i, s) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : s > 0 && i > s ? { opId: t, message: "End extends past source duration." } : null;
}
async function Vc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var nR = "g5r6d10", aR = "g5r6d11", rR = "g5r6d12", iR = "g5r6d13", sR = "g5r6d14", lR = "g5r6d15", oR = "g5r6d1a", cR = "g5r6d1b", uR = "g5r6d1c", dR = "g5r6d1d", fR = "g5r6d1e", hR = "g5r6d1g", mR = "g5r6d1h", pR = "g5r6d1i", vR = "g5r6d1j", gR = "g5r6d1k", yR = "g5r6d1l", bR = "g5r6d1m", xR = "g5r6d1n", SR = "g5r6d1o", r0 = "g5r6d1p", wR = "g5r6d1q", jR = "g5r6d1r", ER = "g5r6d1s", NR = "g5r6d1t", TR = "g5r6d1u", i0 = "g5r6d1v", s0 = "g5r6d1w", CR = "g5r6d1x", RR = "g5r6d1y", Fi = "g5r6d1z", _R = "g5r6d110", l0 = "g5r6d111", MR = "g5r6d112", AR = "g5r6d113", mr = "g5r6d114", DR = "g5r6d119", kR = "a6ki8u0", zR = "a6ki8u1", OR = "a6ki8u2", LR = "a6ki8u3", UR = "a6ki8u4", $R = "a6ki8u5", BR = "a6ki8u6", hf = "a6ki8u7", VR = "a6ki8u8", HR = "a6ki8u9", qR = "a6ki8ua", IR = "a6ki8ub", FR = "a6ki8uc", YR = "a6ki8ud", GR = "a6ki8ue", PR = "a6ki8uf", KR = "a6ki8ug", XR = "a6ki8uh", QR = "_1lguv7x0", ZR = "_1lguv7x1", JR = "_1lguv7x2", WR = "_1lguv7x3", e_ = "_1lguv7x4", t_ = "_1lguv7x5", n_ = "_1lguv7x6", a_ = "_1lguv7x7", r_ = "_1lguv7x8", i_ = "_1lguv7x9", s_ = "_1lguv7xa", l_ = "_1lguv7xb", o_ = "_1lguv7xc", o0 = "_1lguv7xd", c_ = "_1lguv7xe", u_ = "_1lguv7xf", d_ = "_1lguv7xg", f_ = "_1lguv7xh", Wx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, e1 = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, h_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, m_ = "_4ydn54f";
function qe({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: p,
  style: g,
  ...m
}) {
  const b = [
    Wx[t],
    e1[a],
    o ? h_[a] : null,
    p
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: s || u,
      "aria-busy": s || void 0,
      ...m,
      children: [
        s ? /* @__PURE__ */ c.jsx("span", { className: m_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const p_ = 28;
function v_(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function g_(t, a) {
  const i = new Array(a);
  let s = t;
  for (let o = 0; o < a; o++) {
    s = (s * 9301 + 49297) % 233280;
    const u = s / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return i;
}
function y_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function b_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function x_({
  asset: t,
  presentation: a,
  usedBy: i,
  isPlaying: s,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: p,
  onPlaybackEnded: g
}) {
  const [m, b] = y.useState(!1), [v, w] = y.useState(t.displayName), S = y.useRef(null), j = y.useMemo(() => v_(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => g_(j, p_), [j]), C = y.useMemo(() => PT(t), [t]);
  y.useEffect(() => {
    w(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const O = S.current;
    O && (s && C ? O.play().catch(() => {
    }) : (O.pause(), O.currentTime = 0));
  }, [s, C]);
  const T = async () => {
    const O = v.trim();
    if (!O || O === t.displayName) {
      b(!1), w(t.displayName);
      return;
    }
    try {
      await u(O);
    } finally {
      b(!1);
    }
  }, A = `${y_(t.durationMs)} · ${b_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: QR, "data-playing": s ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: ZR, children: [
      /* @__PURE__ */ c.jsx("span", { className: JR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: WR, children: [
        m ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: t_,
            value: v,
            autoFocus: !0,
            onChange: (O) => w(O.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (O) => {
              O.key === "Enter" ? (O.preventDefault(), O.currentTarget.blur()) : O.key === "Escape" && (b(!1), w(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: e_,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: n_, children: A })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: a_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: r_,
        "data-playing": s ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": s ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: i_, "aria-hidden": "true", children: s ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: s_, "aria-hidden": "true", children: N.map((O, R) => /* @__PURE__ */ c.jsx("span", { className: l_, style: { height: `${Math.round(O * 100)}%` } }, R)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: o_, children: [
      i.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: o0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        i.map((O) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: c_,
            style: { color: O.color, borderColor: O.color },
            children: O.characterName
          },
          O.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: o0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: u_, children: [
        /* @__PURE__ */ c.jsx(
          qe,
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
          qe,
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
          qe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: d_,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: p,
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
        className: f_,
        onEnded: g
      }
    )
  ] });
}
var S_ = "_17eol302", w_ = "_17eol303", j_ = "_17eol304", E_ = "_17eol305", N_ = "_17eol306", T_ = "_17eol307", Yo = "_17eol308", C_ = "_17eol309", R_ = "_17eol30a", __ = "_17eol30b", M_ = "_17eol30c", A_ = "_17eol30d", c0 = "_17eol30e", D_ = "_17eol30g";
function k_() {
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
function z_(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function O_({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: s
}) {
  const [o, u] = y.useState("idle"), [f, p] = y.useState(null), [g, m] = y.useState(0), [b, v] = y.useState(null), [w, S] = y.useState(a), [j, N] = y.useState(!1), C = y.useRef(null), T = y.useRef(null), A = y.useRef([]), O = y.useRef(0), R = y.useRef(null), H = y.useRef(null), X = y.useRef({ mime: "audio/webm", ext: "webm" }), se = y.useRef(null), M = y.useRef(null), q = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return q.current = document.activeElement ?? null, requestAnimationFrame(() => {
        se.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        q.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const U = (V) => {
      V.key === "Escape" && i();
    };
    return window.addEventListener("keydown", U), () => window.removeEventListener("keydown", U);
  }, [t, i]);
  const z = y.useCallback(
    (U) => {
      if (U.key !== "Tab") return;
      const V = se.current;
      if (!V) return;
      const G = V.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (G.length === 0) return;
      const ce = G[0], _ = G[G.length - 1], te = document.activeElement;
      U.shiftKey ? (te === ce || te === V) && (U.preventDefault(), _.focus()) : te === _ && (U.preventDefault(), ce.focus());
    },
    []
  ), Y = y.useCallback(() => {
    if (T.current) {
      for (const U of T.current.getTracks()) U.stop();
      T.current = null;
    }
    R.current != null && (window.clearInterval(R.current), R.current = null);
  }, []), ee = y.useCallback(() => {
    Y(), b && URL.revokeObjectURL(b), v(null), A.current = [], H.current = null, m(0), p(null), u("idle");
  }, [b, Y]);
  if (y.useEffect(() => {
    t || (ee(), S(a));
  }, [t, a, ee]), y.useEffect(() => () => {
    Y(), b && URL.revokeObjectURL(b);
  }, [b, Y]), !t) return null;
  const K = async () => {
    p(null), u("preparing");
    try {
      const U = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = U;
      const V = k_();
      X.current = V;
      const G = V.mime ? new MediaRecorder(U, { mimeType: V.mime }) : new MediaRecorder(U);
      C.current = G, A.current = [], G.ondataavailable = (ce) => {
        ce.data && ce.data.size > 0 && A.current.push(ce.data);
      }, G.onstop = () => {
        const ce = V.mime || "audio/webm", _ = new Blob(A.current, { type: ce }), te = new File([_], `${w || a || "recording"}.${V.ext}`, {
          type: ce
        });
        H.current = te;
        const re = URL.createObjectURL(_);
        v(re), u("ready"), Y();
      }, G.start(), O.current = Date.now(), m(0), R.current = window.setInterval(() => {
        m(Date.now() - O.current);
      }, 200), u("recording");
    } catch (U) {
      const V = U instanceof Error ? U.message : "could not access microphone";
      p(V), u(V.toLowerCase().includes("denied") ? "denied" : "error"), Y();
    }
  }, oe = () => {
    const U = C.current;
    U && U.state !== "inactive" && U.stop(), R.current != null && (window.clearInterval(R.current), R.current = null);
  }, ne = async () => {
    const U = H.current;
    if (!U) return;
    const V = (w || a).trim();
    if (!V) {
      p("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await s(U, V), i();
    } catch (G) {
      p(G instanceof Error ? G.message : "upload failed");
    } finally {
      N(!1);
    }
  }, k = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: S_, role: "presentation", onClick: i, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: se,
      className: w_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (U) => U.stopPropagation(),
      onKeyDown: z,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: j_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: E_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: N_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: k
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: M_, "aria-live": "polite", children: z_(g) }),
        /* @__PURE__ */ c.jsxs("div", { className: T_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: M,
              type: "button",
              className: Yo,
              "data-tone": "danger",
              onClick: () => {
                K();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: c0, "aria-hidden": "true" }),
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
              onClick: oe,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: c0, "aria-hidden": "true" }),
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
                ee();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: A_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: C_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: R_,
              value: w,
              onChange: (U) => S(U.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: __, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: D_, children: [
          /* @__PURE__ */ c.jsx(qe, { variant: "ghost", size: "md", onClick: i, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            qe,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                ne();
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
function L_({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: s,
  onVoiceAssetsChange: o
}) {
  const [u, f] = y.useState(""), [p, g] = y.useState("all"), [m, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(!1), T = y.useRef(null), A = y.useCallback(
    (K) => "upload",
    []
  ), O = y.useMemo(() => {
    const K = u.trim().toLowerCase();
    return a.filter((oe) => {
      const ne = A(oe);
      return !(p === "uploaded" && ne !== "upload" || p === "preset" && ne !== "preset" || K && !oe.displayName.toLowerCase().includes(K));
    });
  }, [a, u, p, A]), R = y.useMemo(
    () => a.filter((K) => A(K) === "upload").length,
    [a, A]
  ), H = y.useCallback(
    (K) => {
      const oe = [], ne = /* @__PURE__ */ new Set();
      for (const k of i)
        k.speakerVoiceAssetId === K && (ne.has(k.characterName) || (ne.add(k.characterName), oe.push({
          characterName: k.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: s[k.characterName] ?? "#ba9eff"
        })));
      return oe;
    },
    [i, s]
  ), X = y.useCallback(
    async (K) => {
      const oe = Array.from(K).slice(0, 8);
      if (oe.length !== 0) {
        C(!0);
        try {
          const ne = [];
          for (const k of oe) {
            if (!k.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(k.name)) {
              tn.error(`${k.name}: not an audio file`);
              continue;
            }
            const U = k.name.replace(/\.[^.]+$/, "");
            try {
              const V = await bc(t, k, U, "speaker");
              ne.push(V), tn.success(`Added ${V.displayName}`);
            } catch (V) {
              tn.error(V instanceof Error ? V.message : `${k.name}: upload failed`);
            }
          }
          ne.length > 0 && o([...ne, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), se = (K) => {
    K.preventDefault(), b(!1), K.dataTransfer?.files && X(K.dataTransfer.files);
  }, M = y.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const oe = await fetch(K);
        if (!oe.ok) throw new Error(`fetch failed: ${oe.status}`);
        const ne = await oe.blob(), k = K.split("/").pop()?.split("?")[0] ?? "voice.wav", U = new File([ne], k, { type: ne.type || "audio/wav" });
        await X([U]);
      } catch (oe) {
        tn.error(oe instanceof Error ? oe.message : "could not fetch URL");
      }
  }, [X]), q = y.useCallback(
    async (K, oe) => {
      try {
        const ne = await GT(t, K, oe);
        o(
          a.map((k) => k.voiceAssetId === K ? ne : k)
        ), tn.success(`Renamed to ${ne.displayName}`);
      } catch (ne) {
        tn.error(ne instanceof Error ? ne.message : "rename failed");
      }
    },
    [t, a, o]
  ), z = y.useCallback((K) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(K), tn.success("Copied name")) : tn.error("Clipboard unavailable");
  }, []), Y = y.useCallback(
    async (K) => {
      if (window.confirm(`Delete "${K.displayName}"? Mappings using it will reset.`))
        try {
          await YT(t, K.voiceAssetId), o(a.filter((ne) => ne.voiceAssetId !== K.voiceAssetId)), tn.success(`Deleted ${K.displayName}`);
        } catch (ne) {
          tn.error(ne instanceof Error ? ne.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: kR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: zR,
        "data-over": m ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: se,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: OR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: LR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: UR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: $R, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: BR, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: hf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: hf,
                  onClick: () => {
                    M();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: hf,
                  onClick: () => j(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            qe,
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
              className: XR,
              onChange: (K) => {
                K.target.files && (X(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: VR, children: [
      /* @__PURE__ */ c.jsxs("label", { className: HR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: qR,
            value: u,
            onChange: (K) => f(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: IR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, oe]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: FR,
          "data-active": p === K ? "true" : "false",
          onClick: () => g(K),
          children: oe
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: PR, children: [
        /* @__PURE__ */ c.jsx("span", { className: KR, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          R,
          " uploaded"
        ] })
      ] })
    ] }),
    O.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: GR, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: YR, children: O.map((K) => {
      const oe = A(K);
      return /* @__PURE__ */ c.jsx(
        x_,
        {
          asset: K,
          presentation: oe,
          usedBy: H(K.voiceAssetId),
          isPlaying: v === K.voiceAssetId,
          onTogglePlay: () => w((ne) => ne === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (ne) => q(K.voiceAssetId, ne),
          onCopyName: () => z(K.displayName),
          onDelete: oe === "upload" ? () => void Y(K) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      O_,
      {
        open: S,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (K, oe) => {
          await ee(K, oe);
        }
      }
    )
  ] });
  async function ee(K, oe) {
    C(!0);
    try {
      const ne = await bc(t, K, oe, "speaker");
      o([ne, ...a]), tn.success(`Recorded ${ne.displayName}`);
    } catch (ne) {
      throw tn.error(ne instanceof Error ? ne.message : "upload failed"), ne;
    } finally {
      C(!1);
    }
  }
}
async function t1(t) {
  return mt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function U_(t, a, i) {
  return mt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function $_(t, a) {
  await mt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var u0 = "_190jlds0", B_ = "_190jlds1", V_ = "_190jlds2", H_ = "_190jlds3", q_ = "_190jlds4", I_ = "_190jlds5", F_ = "_190jlds6", Y_ = "_190jlds7", G_ = "_190jlds8", P_ = "_190jlds9", d0 = "_190jldsa", K_ = "_190jldsb", f0 = "_190jldsc", X_ = "_190jldsd", Q_ = "_190jldse", Z_ = "_190jldsf";
function J_({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [u, f] = y.useState(() => Li(a[0])), [p, g] = y.useState([]), [m, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(null), T = y.useMemo(
    () => a.find((R) => Li(R) === u) ?? a[0],
    [a, u]
  );
  y.useEffect(() => {
    a.length && (a.some((R) => Li(R) === u) || f(Li(a[0])));
  }, [a, u]), y.useEffect(() => {
    if (!T) {
      g([]);
      return;
    }
    let R = !1;
    return b(!0), w(null), dc(t, T.kind, T.id, 50).then((H) => {
      R || g(H.entries);
    }).catch((H) => {
      R || w(H instanceof Error ? H.message : "audit fetch failed");
    }).finally(() => {
      R || b(!1);
    }), () => {
      R = !0;
    };
  }, [t, T]);
  const A = y.useCallback(() => {
    if (!T) return;
    const R = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: p
    }, H = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), X = URL.createObjectURL(H), se = document.createElement("a");
    se.href = X, se.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(se), se.click(), document.body.removeChild(se), URL.revokeObjectURL(X);
  }, [t, p, T]), O = y.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await i(T);
        const R = await dc(t, T.kind, T.id, 50);
        g(R.entries);
      } catch (R) {
        w(R instanceof Error ? R.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, i, T]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: u0, children: /* @__PURE__ */ c.jsx("p", { className: f0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: u0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: B_, children: [
      /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: d0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: H_,
            value: u,
            onChange: (R) => f(R.target.value),
            children: a.map((R) => /* @__PURE__ */ c.jsxs("option", { value: Li(R), children: [
              R.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              R.label
            ] }, Li(R)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: q_, children: [
        /* @__PURE__ */ c.jsx(
          qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: A,
            disabled: p.length === 0 || m,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ c.jsx(
          qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void O(),
            disabled: S || !T,
            children: S ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: Q_, children: v }),
    m && !v && /* @__PURE__ */ c.jsx("div", { className: Z_, "aria-live": "polite", children: "Loading edit history…" }),
    !m && !v && p.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: f0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: X_, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !m && !v && p.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: I_, children: p.map((R) => {
      const H = s && T && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: F_, children: [
        /* @__PURE__ */ c.jsx("span", { className: Y_, children: W_(R.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: G_, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: P_, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: d0, children: R.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: K_,
            style: {
              background: `color-mix(in oklab, ${R.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: R.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: R.digest_before === "" || !R.digest_before ? "create" : R.operation_count === 0 ? "clear" : "update"
          }
        ),
        H && /* @__PURE__ */ c.jsx(
          qe,
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
                  await s(T, R.chain_snapshot_json, R);
                  const X = await dc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  g(X.entries);
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
function Li(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function W_(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var eM = "_1uzgubz0", tM = "_1uzgubz1", nM = "_1uzgubz2", aM = "_1uzgubz3", rM = "_1uzgubz4", iM = "_1uzgubz5", sM = "_1uzgubz6", lM = "_1uzgubz7", h0 = "_1uzgubz8", oM = "_1uzgubz9", n1 = "_1uzgubza", a1 = "_1uzgubzb", cM = "_1uzgubzc", uM = "_1uzgubzd", mf = "_1uzgubze", pf = "_1uzgubzf", dM = "_1uzgubzg", fM = "_1uzgubzh", m0 = "_1uzgubzi", p0 = "_1uzgubzj", v0 = "_1uzgubzk", g0 = "_1uzgubzl", y0 = "_1uzgubzm", hM = "_1uzgubzn", mM = "_1uzgubzo", pM = "_1uzgubzp", vM = "_1uzgubzq";
function gM({
  characterName: t,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: p,
  onAssignVoiceAsset: g,
  onAssignPreset: m,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [w, S] = y.useState(!1), j = s ? o.find((A) => A.voiceAssetId === s.speakerVoiceAssetId) : null, N = s?.defaultVectorPresetId ? u.find((A) => A.presetId === s.defaultVectorPresetId) ?? null : null, C = (t[0] ?? "?").toUpperCase(), T = s !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${eM}${f ? ` ${tM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: nM,
        onClick: p,
        "aria-expanded": f,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: aM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: C
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: rM, children: [
            /* @__PURE__ */ c.jsx("span", { className: iM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: sM, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: lM, children: [
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                b0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: N.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            s?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: cM, children: [
              "chain · ",
              s.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${oM} ${T ? n1 : a1}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    f && /* @__PURE__ */ c.jsxs("div", { className: uM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: pf, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${dM}${w ? ` ${fM}` : ""}`,
            onDragEnter: (A) => {
              A.preventDefault(), S(!0);
            },
            onDragOver: (A) => A.preventDefault(),
            onDragLeave: () => S(!1),
            onDrop: (A) => {
              A.preventDefault(), S(!1);
              const O = A.dataTransfer.files?.[0];
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
                  onChange: (A) => {
                    const O = A.target.files?.[0];
                    O && b && b(O);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: pf, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: m0, children: o.map((A) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${p0}${s?.speakerVoiceAssetId === A.voiceAssetId ? ` ${v0}` : ""}`,
            onClick: () => g(A.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: g0, children: A.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: y0, children: [
                A.durationMs != null ? b0(A.durationMs) : "—",
                " ",
                "·",
                " ",
                A.sampleRate ? `${A.sampleRate} Hz` : "—"
              ] })
            ]
          },
          A.voiceAssetId
        )) })
      ] }),
      u.length > 0 && m && /* @__PURE__ */ c.jsxs("div", { className: mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: pf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: m0, children: u.map((A) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${p0}${s?.defaultVectorPresetId === A.presetId ? ` ${v0}` : ""}`,
            onClick: () => m(A.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: g0, children: A.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: y0, children: "preset · vector" })
            ]
          },
          A.presetId
        )) })
      ] }),
      T && v && /* @__PURE__ */ c.jsx(qe, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function b0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function yM({
  unmappedCount: t,
  totalCount: a,
  children: i,
  emptyHint: s
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: vM, children: s ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: hM, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${mM} ${o ? n1 : a1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: pM, children: i })
  ] });
}
async function xc() {
  return mt("/runtime/health");
}
async function bM() {
  await mt("/runtime/start", { method: "POST" });
}
async function xM() {
  return mt("/runtime/stop", { method: "POST" });
}
function r1(t) {
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
var SM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function kn({
  severity: t,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: u
}) {
  const f = [SM[t], o].filter(Boolean).join(" "), p = i ?? (t === "error" ? "alert" : "status"), g = s ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: p, "aria-live": g, style: u, children: a });
}
var i1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, s1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, wM = "_13bb4njb";
function Zr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: u,
  title: f
}) {
  const p = i && t !== "faint", g = [i1[a], s1[t], p ? wM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: g, style: u, title: f, children: s });
}
const jM = 4e3;
function EM({ deployment: t }) {
  const [a, i] = y.useState(null), [s, o] = y.useState(null);
  y.useEffect(() => {
    let p = !1;
    const g = async () => {
      try {
        const b = await xc();
        p || (i(b), o(null));
      } catch (b) {
        p || o(CM(b));
      }
    };
    g();
    const m = setInterval(g, jM);
    return () => {
      p = !0, clearInterval(m);
    };
  }, []);
  const u = a?.badge ?? "not_installed", f = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: _R, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Zr, { tone: NM(u), pulse: u === "starting" || u === "installing", children: r1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: TM(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    s && !f && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s })
  ] });
}
function NM(t) {
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
function TM(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function CM(t) {
  return t instanceof ts || t instanceof Error ? t.message : "unknown error";
}
const Sc = {
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
}, Ba = 1e-3;
function RM(t, a, i) {
  for (const s of Object.keys(Sc)) {
    const o = Sc[s];
    if (Math.abs(o.low - t) < Ba && Math.abs(o.mid - a) < Ba && Math.abs(o.high - i) < Ba)
      return s;
  }
  return "custom";
}
function _M(t) {
  let a = AM();
  for (const i of t.ops)
    a = MM(a, i);
  return a;
}
function MM(t, a) {
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
          preset: RM(a.low_db, a.mid_db, a.high_db)
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
function AM() {
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
  return t.ops.filter((i) => i.mode !== a);
}
function Nr(t, a) {
  return [...t, a];
}
function DM(t, a) {
  const i = Er(t, "gain");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const s = { id: wn(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(i, s) };
}
function kM(t, a, i, s) {
  const o = Er(t, "eq3");
  if (Math.abs(a) < Ba && Math.abs(i) < Ba && Math.abs(s) < Ba)
    return { ...t, ops: o };
  const u = {
    id: wn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...t, ops: Nr(o, u) };
}
function zM(t, a) {
  const i = Er(t, "speed");
  if (Math.abs(a - 1) < Ba) return { ...t, ops: i };
  const s = { id: wn(), mode: "speed", factor: a };
  return { ...t, ops: Nr(i, s) };
}
function OM(t, a) {
  const i = Er(t, "pitch_shift");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const s = {
    id: wn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(i, s) };
}
function LM(t, a, i) {
  const s = Er(t, "normalize");
  if (a === "off") return { ...t, ops: s };
  const o = {
    id: wn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: Nr(s, o) };
}
function UM(t, a) {
  const i = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const s = {
    id: wn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(i, s) };
}
function $M(t, a) {
  const i = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const s = {
    id: wn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(i, s) };
}
function BM(t, a, i) {
  const s = Er(t, "silence_strip");
  if (!a) return { ...t, ops: s };
  const o = {
    id: wn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: Nr(s, o) };
}
const l1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function o1(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((u) => !l1.has(u.mode))
  };
  let o = DM({ version: 1, ops: [] }, a.volumeDb);
  return o = kM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = zM(o, a.speed.value)), o = OM(o, a.pitchSt), o = LM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = UM(o, a.fade.inS), o = $M(o, a.fade.outS), o = BM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function c1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => l1.has(i.mode))
  };
  return _M(a);
}
var VM = "_1rsa80i0", HM = "_1rsa80i1", qM = "_1rsa80i2", IM = "_1rsa80i3", FM = "_1rsa80i4", YM = "_1rsa80i5", GM = "_1rsa80i6", PM = "_1rsa80i7", KM = "_1rsa80i8", XM = "_1rsa80i9";
const u1 = ["flat", "warm", "bright", "voice", "telephone"], Ws = -12, Go = 12, QM = 0.5;
function ZM(t) {
  const { low: a, mid: i, high: s, preset: o, onChange: u, disabled: f } = t, p = (m) => {
    const b = Sc[m];
    u(b.low, b.mid, b.high, m);
  }, g = (m, b) => {
    const v = { low: a, mid: i, high: s, [m]: b }, w = WM(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: VM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: HM, role: "group", "aria-label": "EQ presets", children: [
      u1.map((m) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: qM,
          "data-active": o === m,
          onClick: () => p(m),
          disabled: f,
          children: m
        },
        m
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: IM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: FM, children: [
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Low",
          value: a,
          onChange: (m) => g("low", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Mid",
          value: i,
          onChange: (m) => g("mid", m),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "High",
          value: s,
          onChange: (m) => g("high", m),
          disabled: f
        }
      )
    ] })
  ] });
}
function vf({ label: t, value: a, onChange: i, disabled: s }) {
  const o = (a - Ws) / (Go - Ws) * 100, u = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: YM, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: u, className: GM, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: u,
        type: "range",
        min: Ws,
        max: Go,
        step: QM,
        value: a,
        disabled: s,
        className: KM,
        style: { "--fill": `${o}%` },
        onChange: (f) => i(Number(f.target.value)),
        "aria-valuemin": Ws,
        "aria-valuemax": Go,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: PM, children: JM(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: XM, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Ws }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Go
      ] })
    ] })
  ] });
}
function JM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const gf = 1e-3;
function WM(t, a, i) {
  for (const s of u1) {
    const o = Sc[s];
    if (Math.abs(o.low - t) < gf && Math.abs(o.mid - a) < gf && Math.abs(o.high - i) < gf)
      return s;
  }
  return "custom";
}
var e2 = "_85bhwb0", t2 = "_85bhwb1", x0 = "_85bhwb2", n2 = "_85bhwb3", a2 = "_85bhwb4", r2 = "_85bhwb5", i2 = "_85bhwb6", s2 = "_85bhwb7";
const Po = 0.5, yf = 2, l2 = 0.05;
function o2(t) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, p = (i - Po) / (yf - Po) * 100, g = y.useId(), m = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: e2, children: [
    s ? /* @__PURE__ */ c.jsxs("div", { className: t2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: x0,
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
          className: x0,
          "data-active": a === "synth",
          onClick: () => m("synth"),
          disabled: f,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: n2, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Po,
          max: yf,
          step: l2,
          value: i,
          disabled: f,
          className: a2,
          style: { "--fill": `${p}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Po,
          "aria-valuemax": yf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: r2, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && s ? /* @__PURE__ */ c.jsxs("div", { className: i2, children: [
      /* @__PURE__ */ c.jsx(
        qe,
        {
          variant: "primary",
          size: "sm",
          onClick: u,
          disabled: f || !u,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: s2, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var c2 = "kgszk50", u2 = "kgszk51", S0 = "kgszk52", d2 = "kgszk53", f2 = "kgszk54", d1 = "kgszk55", h2 = "kgszk56", m2 = "kgszk58", Yh = "kgszk59", f1 = "kgszk5a", Gh = "kgszk5b", p2 = "kgszk5c", v2 = "kgszk5d", g2 = "kgszk5e", w0 = "kgszk5f", j0 = "kgszk5g", E0 = "kgszk5h", y2 = "kgszk5i", b2 = "kgszk5j", x2 = "kgszk5l", pl = "kgszk5m", vl = "kgszk5n";
const S2 = -24, w2 = 24, j2 = 0.5, E2 = -12, N2 = 12, T2 = 0.5, C2 = -30, R2 = -6, _2 = -12, M2 = 0, Ko = -60, bf = -20;
function Ph(t) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: p = !1,
    onApply: g,
    applyLabel: m = "Apply edit"
  } = t, b = (S) => {
    i({ ...a, ...S });
  }, v = z2(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: c2, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: u2, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: d2, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: S0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: S0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: f2, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      N0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: S2,
        max: w2,
        step: j2,
        format: O2,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        ZM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: p,
          onChange: (S, j, N, C) => b({ eq3: { low: S, mid: j, high: N, preset: C } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        o2,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: s,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: p,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      N0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: E2,
        max: N2,
        step: T2,
        format: L2,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: p
      }
    ),
    /* @__PURE__ */ c.jsx(
      A2,
      {
        normalize: a.normalize,
        disabled: p,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      D2,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: p,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      k2,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: p,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    g ? /* @__PURE__ */ c.jsxs("div", { className: x2, children: [
      /* @__PURE__ */ c.jsx(
        qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Hc),
          disabled: p,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(qe, { variant: "primary", size: "md", onClick: g, disabled: p, children: m })
    ] }) : null
  ] });
}
function N0(t) {
  const { label: a, sub: i, min: s, max: o, step: u, format: f, value: p, onChange: g, disabled: m } = t, b = (p - s) / (o - s) * 100, v = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: d1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: h2, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: m2, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: f1, children: i })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: s,
        max: o,
        step: u,
        value: p,
        disabled: m,
        className: Gh,
        style: { "--fill": `${b}%` },
        onChange: (w) => g(Number(w.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": p
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Yh, children: f(p) })
  ] });
}
function A2({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: C2, max: R2, step: 0.5, suffix: "LUFS" } : { min: _2, max: M2, step: 0.5, suffix: "dB" }, u = U2(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, p = (g) => {
    if (g === "off") {
      a({ mode: g, targetDbOrLufs: t.targetDbOrLufs });
      return;
    }
    if (g === "peak") {
      a({ mode: g, targetDbOrLufs: -1 });
      return;
    }
    a({ mode: g, targetDbOrLufs: -16 });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Normalize" }),
    /* @__PURE__ */ c.jsx("div", { className: p2, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const m = g === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: v2,
          "data-active": t.mode === g,
          disabled: i || m,
          onClick: () => p(g),
          title: m ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            g,
            m ? " (soon)" : ""
          ]
        },
        g
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: d1, children: [
      /* @__PURE__ */ c.jsx("span", { className: f1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: i,
          className: Gh,
          style: { "--fill": `${f}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Yh, children: [
        u.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function D2({ inS: t, outS: a, onChange: i, disabled: s }) {
  const o = y.useId(), u = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: g2, children: [
      /* @__PURE__ */ c.jsxs("div", { className: w0, children: [
        /* @__PURE__ */ c.jsx("label", { className: j0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: s,
            className: E0,
            onChange: (f) => i(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: w0, children: [
        /* @__PURE__ */ c.jsx("label", { className: j0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: E0,
            onChange: (f) => i(t, Math.max(0, Number(f.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function k2({ enabled: t, thresholdDb: a, onChange: i, disabled: s }) {
  const o = (a - Ko) / (bf - Ko) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: y2, children: [
      /* @__PURE__ */ c.jsxs("label", { className: b2, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: s,
            onChange: (u) => i(u.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: Ko,
          max: bf,
          step: 1,
          value: a,
          disabled: s || !t,
          className: Gh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => i(t, Number(u.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": bf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Yh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Ui = 1e-3;
function z2(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Ui && a.push("gain"), (Math.abs(t.eq3.low) >= Ui || Math.abs(t.eq3.mid) >= Ui || Math.abs(t.eq3.high) >= Ui) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Ui && a.push("speed"), Math.abs(t.pitchSt) >= Ui && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function O2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function L2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function U2(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var $2 = "skdk4g0", B2 = "skdk4g1", T0 = "skdk4g2", V2 = "skdk4g3", H2 = "skdk4g4", q2 = "skdk4g5", I2 = "skdk4g6", F2 = "skdk4g7", Y2 = "skdk4g8", G2 = "skdk4g9", P2 = "skdk4ga", K2 = "skdk4gb", X2 = "skdk4gc", Q2 = "skdk4gd", C0 = "skdk4ge", R0 = "skdk4gf", Z2 = "skdk4gg", _0 = "skdk4gh", M0 = "skdk4gi", J2 = "skdk4gj", W2 = "skdk4gk", eA = "skdk4gl", A0 = "skdk4gm", tA = "skdk4gn", D0 = "skdk4go", nA = "skdk4gp", aA = "skdk4gq", rA = "skdk4gr", iA = "skdk4gs", sA = "skdk4gt", lA = "skdk4gu", oA = "skdk4gv", k0 = "skdk4gw", cA = "skdk4gx", uA = "skdk4gy", dA = "skdk4gz", fA = "skdk4g10", hA = "cgsfgh1", mA = "cgsfgh2", pA = "cgsfgh3", vA = "cgsfgh4", gA = "cgsfgh5", yA = "cgsfgh6", bA = "cgsfgh7", xA = "cgsfgh8", SA = "cgsfgh9", wA = "cgsfgha", jA = "cgsfghb", EA = "cgsfghc", NA = "cgsfghd", TA = "cgsfghe", CA = "cgsfghm", RA = "cgsfghn", _A = "cgsfgho", MA = "cgsfghp";
const qt = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], gl = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm"
}, Zi = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, h1 = 0.05;
function AA(t) {
  let a = null, i = -1 / 0;
  for (const s of qt) {
    const o = t[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= h1 ? null : a;
}
function m1(t, a = 3) {
  return qt.map((i) => ({ key: i, label: gl[i], value: t[i] })).filter((i) => i.value > h1).sort((i, s) => s.value - i.value).slice(0, a);
}
function DA(t) {
  let a = 0;
  for (const i of qt) a += t[i] * t[i];
  return Math.sqrt(a);
}
function z0(t) {
  const a = m1(t, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? xf(i.label) : `${xf(i.label)} + ${s.label.toLowerCase()}`;
}
function xf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Jr(t) {
  const a = { ...Zi };
  for (const i of qt) {
    const s = t[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const O0 = 0.05, L0 = 0.2, kA = 22, zA = 320, Sf = 0.78;
function wf(t, a, i, s) {
  const o = Math.cos(i), u = Math.sin(i), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / s));
}
function OA(t) {
  const { vec: a, onChange: i, size: s, reduceMotion: o = !1 } = t, [u, f] = y.useState(a), [p, g] = y.useState(null), [m, b] = y.useState(null), v = y.useRef(null), w = y.useRef(a), S = y.useRef(o), j = y.useRef(null), N = y.useRef(0);
  S.current = o, y.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const C = y.useCallback(
    (q) => {
      const z = Jr(q);
      f(z), w.current = z, i(z);
    },
    [i]
  ), T = y.useCallback((q) => {
    const z = Jr(q);
    f(z), w.current = z;
  }, []), A = y.useCallback(
    (q) => {
      const z = v.current;
      if (!z || S.current) return;
      const Y = q.clientX - z.centerX, ee = q.clientY - z.centerY, K = s / 2 * Sf, oe = wf(Y, ee, z.angle, K), ne = { ...w.current, [z.axis]: oe };
      T(ne);
    },
    [s, T]
  ), O = y.useCallback(
    (q) => {
      const z = v.current;
      if (z) {
        if (window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), S.current) {
          const Y = q.clientX - z.centerX, ee = q.clientY - z.centerY, K = s / 2 * Sf, oe = wf(Y, ee, z.angle, K), ne = { ...w.current, [z.axis]: oe };
          v.current = null, C(ne);
          return;
        }
        v.current = null, C(w.current);
      }
    },
    [C, A, s]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [A, O]);
  const R = y.useCallback((q, z) => {
    S.current || (N.current += 1, b({ x: q, y: z, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, zA));
  }, []), H = y.useCallback(
    (q, z, Y, ee, K) => {
      const oe = Y.getBoundingClientRect(), ne = oe.left + oe.width / 2, k = oe.top + oe.height / 2, V = qt.indexOf(q) / qt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: q,
        pointerId: z,
        centerX: ne,
        centerY: k,
        angle: V
      }, g(q), ee !== void 0 && K !== void 0) {
        const G = ee - ne, ce = K - k, _ = s / 2 * Sf, te = wf(G, ce, V, _), re = { ...w.current, [q]: te };
        S.current ? C(re) : T(re);
      }
      window.addEventListener("pointermove", A), window.addEventListener("pointerup", O), window.addEventListener("pointercancel", O);
    },
    [C, A, O, s, T]
  ), X = y.useCallback(
    (q, z) => {
      z.preventDefault();
      const Y = z.currentTarget, ee = Y.ownerSVGElement ?? Y;
      H(q, z.pointerId, ee);
    },
    [H]
  ), se = y.useCallback(
    (q) => {
      const z = q.currentTarget, Y = z instanceof SVGSVGElement ? z : z.ownerSVGElement ?? z, ee = Y.getBoundingClientRect(), K = ee.left + ee.width / 2, oe = ee.top + ee.height / 2, ne = q.clientX - K, k = q.clientY - oe;
      if (Math.sqrt(ne * ne + k * k) < 8) return;
      let V = Math.atan2(k, ne) * 180 / Math.PI;
      V = ((V + 90) % 360 + 360) % 360;
      let G = null, ce = 999;
      for (let re = 0; re < qt.length; re++) {
        const F = qt[re];
        if (!F) continue;
        const $ = re / qt.length * 360, ae = Math.abs(($ - V + 540) % 360 - 180);
        ae < ce && (ce = ae, G = F);
      }
      if (!G || ce > kA) return;
      q.preventDefault();
      const _ = (q.clientX - ee.left) / ee.width * s, te = (q.clientY - ee.top) / ee.height * s;
      R(_, te), H(G, q.pointerId, Y, q.clientX, q.clientY);
    },
    [H, s, R]
  ), M = y.useCallback(
    (q, z) => {
      const Y = w.current[q];
      let ee = Y;
      switch (z.key) {
        case "ArrowUp":
        case "ArrowRight":
          ee = Y + O0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          ee = Y - O0;
          break;
        case "PageUp":
          ee = Y + L0;
          break;
        case "PageDown":
          ee = Y - L0;
          break;
        case "Home":
          ee = 0;
          break;
        case "End":
          ee = 1;
          break;
        default:
          return;
      }
      z.preventDefault(), g(q), C({ ...w.current, [q]: ee });
    },
    [C]
  );
  return {
    liveVec: u,
    activeAxis: p,
    setActiveAxis: g,
    onPointerDown: X,
    onKeyDown: M,
    onSurfacePointerDown: se,
    surfacePing: m
  };
}
const LA = [0.25, 0.5, 0.75, 1];
function UA({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: s = !1,
  reduceMotion: o = !1
}) {
  const u = OA({ vec: t, onChange: a, size: i, reduceMotion: o }), f = i / 2, p = i / 2, g = i / 2 * 0.78, m = y.useMemo(() => $A(f, p, g), [f, p, g]), b = y.useMemo(() => qt.map((v, w) => {
    const S = fc(u.liveVec[v]), j = m[w];
    return j ? `${f + j.dx * S},${p + j.dy * S}` : "0,0";
  }).join(" "), [m, f, p, u.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: hA, children: /* @__PURE__ */ c.jsx("div", { className: mA, style: { width: i, height: i }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: pA,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: s ? void 0 : u.onSurfacePointerDown,
      style: s ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        LA.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: vA,
            cx: f,
            cy: p,
            r: g * v
          },
          v
        )),
        qt.map((v, w) => {
          const S = m[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = p + S.dy * 1.18, C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: gA,
                x1: f,
                y1: p,
                x2: f + S.dx,
                y2: p + S.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${NA}${C ? ` ${TA}` : ""}`,
                x: j,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: gl[v]
              }
            )
          ] }, v);
        }),
        qt.map((v, w) => {
          const S = fc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = m[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${bA}${N ? ` ${xA}` : ""}`,
              x1: f,
              y1: p,
              x2: f + j.dx * S,
              y2: p + j.dy * S
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: yA, points: b }),
        u.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: EA,
            cx: u.surfacePing.x,
            cy: u.surfacePing.y,
            r: 10
          },
          u.surfacePing.key
        ),
        !s && qt.map((v, w) => {
          const S = fc(u.liveVec[v]), j = m[w];
          if (!j) return null;
          const N = f + j.dx * S, C = p + j.dy * S, T = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: SA,
                cx: N,
                cy: C,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${gl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": S,
                onPointerDown: (A) => u.onPointerDown(v, A),
                onKeyDown: (A) => u.onKeyDown(v, A),
                onFocus: () => u.setActiveAxis(v),
                onBlur: () => u.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${wA}${T ? ` ${jA}` : ""}`,
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
function $A(t, a, i) {
  return qt.map((s, o) => {
    const u = o / qt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(u) * i,
      dy: Math.sin(u) * i
    };
  });
}
function fc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function BA({ vec: t, size: a = 36 }) {
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, u = y.useMemo(() => qt.map((f, p) => {
    const g = fc(t[f]), m = p / qt.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(m) * o * g, v = s + Math.sin(m) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, s, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: CA, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: RA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: _A, cx: i, cy: s, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: MA, points: u })
      ]
    }
  ) });
}
var VA = "_1jqr3aj0", HA = "_1jqr3aj1", qA = "_1jqr3aj2", IA = "_1jqr3aj3", FA = "_1jqr3aj4", YA = "_1jqr3aj5", GA = "_1jqr3aj6", PA = "_1jqr3aj7";
const U0 = 0.05, $0 = 0.2;
function KA({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: s = !1
}) {
  const [o, u] = y.useState(null), f = y.useRef(null), p = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (j, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Jr({ ...t, [j]: C }));
    },
    [a, t]
  ), m = y.useCallback((j, N) => {
    const C = p.current.get(j);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), b = y.useCallback(
    (j, N) => {
      if (i) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && p.current.set(j, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), g(j, m(j, N.clientX));
    },
    [i, g, m]
  ), v = y.useCallback(
    (j, N) => {
      i || s || f.current === j && g(j, m(j, N.clientX));
    },
    [i, s, g, m]
  ), w = y.useCallback(
    (j, N) => {
      if (f.current === j) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        f.current = null, p.current.delete(j);
      }
    },
    []
  ), S = y.useCallback(
    (j, N) => {
      if (i) return;
      const C = t[j] ?? 0;
      let T = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = C + U0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = C - U0;
          break;
        case "PageUp":
          T = C + $0;
          break;
        case "PageDown":
          T = C - $0;
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
      N.preventDefault(), u(j), g(j, T);
    },
    [i, g, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: VA, role: "group", "aria-label": "Emotion axis sliders", children: qt.map((j) => {
    const N = XA(t[j] ?? 0), C = N > 0.05, T = o === j, A = gl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${HA}${C ? ` ${qA}` : ""}${T ? ` ${IA}` : ""}`,
        role: "slider",
        "aria-label": `${A} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (O) => b(j, O),
        onPointerMove: (O) => v(j, O),
        onPointerUp: (O) => w(j, O),
        onPointerCancel: (O) => w(j, O),
        onKeyDown: (O) => S(j, O),
        onFocus: () => u(j),
        onBlur: () => u(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: FA, children: A }),
          /* @__PURE__ */ c.jsx("span", { className: YA, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: GA,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: PA, children: N.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function XA(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var B0 = "gvwvwg0", QA = "gvwvwg2", ZA = "gvwvwg3", JA = "gvwvwg8", WA = "gvwvwg9", e3 = "gvwvwga", t3 = "gvwvwgb", n3 = "gvwvwgc", a3 = "gvwvwgd", r3 = "gvwvwge";
function i3({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: B0, children: [
    /* @__PURE__ */ c.jsx("span", { className: QA, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: ZA, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: B0, children: [
    /* @__PURE__ */ c.jsx("span", { className: r3, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: JA, children: t.map((o) => {
      const u = s3(o), f = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${WA}${f ? ` ${t3}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: e3,
                onClick: () => i(o),
                "aria-pressed": f,
                children: [
                  /* @__PURE__ */ c.jsx(BA, { vec: u, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: n3, children: o.presetName })
                ]
              }
            ),
            s && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: a3,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && s(o.presetId);
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
const th = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function s3(t) {
  const a = th.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = th.reduce(
    (s, o, u) => ({ ...s, [o]: t.vector[u] ?? 0 }),
    a
  );
  return Jr(i);
}
function jf(t) {
  return th.map((a) => t[a] ?? 0);
}
const l3 = [
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
], o3 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], c3 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], u3 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function d3(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Zi };
  const s = a.split(/\s+/).some((f) => o3.includes(f)) ? 1.2 : 1, o = c3.some((f) => a.includes(f)) ? 0.55 : 1, u = { ...Zi };
  for (const f of l3) {
    let p = 0;
    for (const g of f.keywords) {
      const m = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${m}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), C = S.slice(j >= 0 ? j : 0).slice(-30);
      u3.some((T) => new RegExp(`\\b${T}\\b`).test(C)) || (p += 1);
    }
    if (p > 0) {
      const g = f.weight * Math.min(1, 0.55 + 0.2 * (p - 1)) * s * o;
      u[f.axis] = Math.min(1, g);
    }
  }
  return qt.every((f) => u[f] === 0) && (u.calm = 0.4), Jr(u);
}
const f3 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function h3({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const s = t.mode ?? "none", o = y.useMemo(() => m3(t.vector), [t.vector]), u = t.emotionAlpha ?? 1, [f, p] = y.useState([]), [g, m] = y.useState(null), [b, v] = y.useState(!1), [w, S] = y.useState(null), [j, N] = y.useState(""), [C, T] = y.useState(!1), A = y.useRef(!0);
  y.useEffect(() => (A.current = !0, () => {
    A.current = !1;
  }), []), y.useEffect(() => {
    let U = !1;
    return t1(i).then((V) => {
      U || p(V0(V.presets));
    }).catch((V) => {
      U || m(Ef(V));
    }), () => {
      U = !0;
    };
  }, [i]), y.useEffect(() => {
    C || N(z0(o));
  }, [o, C]);
  const O = (U) => {
    a({ ...t, mode: U });
  }, R = (U) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: jf(U)
    }), w && S(null);
  }, H = () => {
    R(Jr(Zi));
  }, X = (U) => {
    const V = Math.max(0, Math.min(10, Number.isFinite(U) ? U : 1));
    a({ ...t, emotionAlpha: V });
  }, se = async () => {
    const U = j.trim();
    if (U) {
      v(!0), m(null);
      try {
        const V = await U_(i, U, jf(o));
        if (!A.current) return;
        p(
          (G) => V0([V, ...G.filter((ce) => ce.presetId !== V.presetId)])
        ), S(V.presetId), T(!1);
      } catch (V) {
        A.current && m(Ef(V));
      } finally {
        A.current && v(!1);
      }
    }
  }, M = async (U) => {
    const V = f;
    p((G) => G.filter((ce) => ce.presetId !== U)), w === U && S(null);
    try {
      await $_(i, U);
    } catch (G) {
      A.current && (p(V), m(Ef(G)));
    }
  }, q = (U) => {
    S(U.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: U.vector
    });
  }, z = (U) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: U });
  }, Y = AA(o), ee = DA(o), K = m1(o, 3), oe = K.length > 0 && j.trim().length > 0 && !b, ne = z0(o) || "name your preset…", k = s !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: $2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: B2, children: [
      /* @__PURE__ */ c.jsx("span", { className: T0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: V2, role: "radiogroup", "aria-label": "Emotion mode", children: f3.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": s === U.id,
          className: `${H2}${s === U.id ? ` ${q2}` : ""}`,
          onClick: () => O(U.id),
          children: U.label
        },
        U.id
      )) })
    ] }),
    s === "none" && /* @__PURE__ */ c.jsxs("div", { className: D0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    s === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: D0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    s === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: J2, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: W2,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (U) => z(U.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: eA, children: [
        /* @__PURE__ */ c.jsx(
          qe,
          {
            variant: "secondary",
            onClick: () => {
              const U = (t.qwenTemplate ?? "").trim();
              if (!U) return;
              const V = d3(U);
              a({
                ...t,
                mode: "emotion_vector",
                vector: jf(V)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: A0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: A0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (s === "emotion_vector" || s === "none" || s === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: Q2, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${r0} ${I2}`, children: /* @__PURE__ */ c.jsx(
        UA,
        {
          vec: o,
          onChange: R,
          readOnly: k
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${r0} ${F2}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: Y2, children: [
          /* @__PURE__ */ c.jsx("span", { className: T0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: G2, children: Y ? gl[Y].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: P2, children: [
            "‖v‖ = ",
            ee.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(KA, { vec: o, onChange: R, readOnly: k }),
        /* @__PURE__ */ c.jsx("div", { className: K2, children: /* @__PURE__ */ c.jsxs(
          qe,
          {
            variant: "ghost",
            size: "sm",
            onClick: H,
            disabled: k || ee < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: X2,
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
    s === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: C0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: R0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: Z2, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: u,
            className: _0,
            style: { "--fill": `${u * 10}%` },
            onChange: (U) => X(Number(U.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
          (u * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${nA}${K.length === 0 ? ` ${aA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: rA, children: [
              /* @__PURE__ */ c.jsx("span", { className: iA, children: "Save current as preset" }),
              K.length === 0 && /* @__PURE__ */ c.jsx("span", { className: sA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: lA, children: [
              /* @__PURE__ */ c.jsx("div", { className: oA, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${k0} ${uA}`, children: "no axes set" }) : K.map((U) => /* @__PURE__ */ c.jsxs("span", { className: k0, children: [
                U.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: cA, children: U.value.toFixed(2) })
              ] }, U.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: dA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: fA,
                    placeholder: ne,
                    value: j,
                    disabled: K.length === 0 || b,
                    onChange: (U) => {
                      N(U.target.value), T(!0);
                    },
                    onKeyDown: (U) => {
                      U.key === "Enter" && oe && se();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  qe,
                  {
                    variant: "primary",
                    disabled: !oe,
                    onClick: se,
                    children: b ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ c.jsx(
        i3,
        {
          presets: f,
          activePresetId: w,
          onSelect: q,
          onDelete: M
        }
      )
    ] }),
    s === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: C0, children: [
      /* @__PURE__ */ c.jsx("span", { className: R0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: u,
          className: _0,
          style: { "--fill": `${u * 10}%` },
          onChange: (U) => X(Number(U.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
        (u * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsx("div", { className: tA, children: g })
  ] });
}
function m3(t) {
  if (!t || !Array.isArray(t)) return Jr(Zi);
  const a = { ...Zi };
  return qt.forEach((i, s) => {
    const o = t[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function V0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function Ef(t) {
  return t instanceof ts || t instanceof Error ? t.message : "Unknown error";
}
var p3 = "_5u1uau0", el = "_5u1uau1", v3 = "_5u1uau2", $i = "_5u1uau3", tl = "_5u1uau4", g3 = "_5u1uau5", Nf = "_5u1uau6", y3 = "_5u1uau7", b3 = "_5u1uau8", x3 = "_5u1uau9", S3 = "_5u1uaua", w3 = "_5u1uaub", j3 = "_5u1uauc", E3 = "_5u1uaud", N3 = "_5u1uaue", H0 = "_5u1uauf", q0 = "_5u1uaug", T3 = "_5u1uauh";
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
], C3 = ["mp3", "wav", "flac"], Xo = 0.5, Cf = 2, R3 = 0.05, _3 = 0.8, M3 = 0.8, I0 = 42;
function Qo(t, a, i) {
  const s = t[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function A3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: p
}) {
  const g = y.useId(), m = y.useId(), b = y.useId(), v = y.useId(), w = y.useId(), S = (H, X) => {
    p({ ...f, [H]: X });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (H) => {
    if (H !== j)
      if (H === "random") {
        const X = { ...f };
        delete X.seed, p(X);
      } else {
        const X = Qo(f, "seed", I0);
        p({ ...f, seed: X });
      }
  }, C = Tf.find((H) => H.id === o) ?? Tf[0], T = (i - Xo) / (Cf - Xo) * 100, A = Qo(f, "temperature", _3), O = Qo(f, "top_p", M3), R = Qo(f, "seed", I0);
  return /* @__PURE__ */ c.jsxs("div", { className: p3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: $i, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: g,
          className: g3,
          value: t,
          onChange: (H) => a(H.currentTarget.value),
          children: C3.map((H) => /* @__PURE__ */ c.jsx("option", { value: H, children: H }, H))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: $i, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${tl} ${y3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: m,
            type: "range",
            className: b3,
            min: Xo,
            max: Cf,
            step: R3,
            value: i,
            style: { "--range-pct": `${T}%` },
            onChange: (H) => s(Number(H.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": Cf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: x3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: v3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: S3, children: Tf.map((H) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === H.id,
          className: w3,
          onClick: () => u(H.id),
          title: H.help,
          children: H.label
        },
        H.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: j3, "aria-live": "polite", children: C.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: E3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: $i, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Nf,
          min: 0,
          max: 2,
          step: 0.05,
          value: A,
          onChange: (H) => S("temperature", Number(H.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: $i, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Nf,
          min: 0,
          max: 1,
          step: 0.05,
          value: O,
          onChange: (H) => S("top_p", Number(H.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${tl} ${N3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${H0} ${j === "fixed" ? q0 : ""}`,
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
                className: `${H0} ${j === "random" ? q0 : ""}`,
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
            ) : /* @__PURE__ */ c.jsx("span", { className: T3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var D3 = "iv43qk0", F0 = "iv43qk1", k3 = "iv43qk2", Y0 = "iv43qk3", z3 = "iv43qk4", O3 = "iv43qk5", L3 = "iv43qk6", U3 = "iv43qk7", $3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, B3 = "iv43qkd", V3 = "iv43qke", Rf = "iv43qkf", _f = "iv43qkg";
function H3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: B3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = t.length, o = t.filter((f) => f.character !== null).length, u = s - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: V3, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Rf, children: [
        /* @__PURE__ */ c.jsx("span", { className: _f, children: s }),
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
    /* @__PURE__ */ c.jsx("ol", { className: D3, children: t.map((f) => /* @__PURE__ */ c.jsx(
      q3,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...i ? { onClick: () => i(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function q3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${F0} ${k3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: Y0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: L3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: F0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: Y0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: z3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: O3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${U3} ${$3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var I3 = "_46z95i0", F3 = "_46z95i1", Y3 = "_46z95i2", G3 = "_46z95i3", P3 = "_46z95i4", K3 = "_46z95i5", X3 = "_46z95i6";
const Q3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function Z3({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: I3, children: [
    /* @__PURE__ */ c.jsx(
      Mf,
      {
        label: "Intensity",
        sub: "How emotionally amplified each line reads",
        min: 0,
        max: 1,
        step: 0.01,
        format: (i) => `${Math.round(i * 100)}%`,
        value: t.intensity,
        onChange: (i) => a({ ...t, intensity: i })
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
        format: (i) => `${i.toFixed(2)}×`,
        value: t.pace,
        onChange: (i) => a({ ...t, pace: i })
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
        format: (i) => `${i >= 0 ? "+" : ""}${i.toFixed(1)} st`,
        value: t.pitchSt,
        onChange: (i) => a({ ...t, pitchSt: i })
      }
    )
  ] });
}
function Mf({ label: t, sub: a, min: i, max: s, step: o, format: u, value: f, onChange: p }) {
  const g = (f - i) / (s - i) * 100, m = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: F3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Y3, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: m, className: G3, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: P3, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: m,
        type: "range",
        min: i,
        max: s,
        step: o,
        value: f,
        className: K3,
        style: { "--fill": `${g}%` },
        onChange: (b) => p(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: X3, children: u(f) })
  ] });
}
var J3 = "qe93dj0", W3 = "qe93dj1", eD = "qe93dj2", tD = "qe93dj3", nD = "qe93dj4", aD = "qe93dj5", rD = "qe93dj6", iD = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, sD = "qe93dja", lD = "qe93djb";
function oD({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: J3, children: [
    /* @__PURE__ */ c.jsxs("header", { className: W3, children: [
      /* @__PURE__ */ c.jsx("span", { className: eD, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: tD, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: nD, children: t.map((i) => /* @__PURE__ */ c.jsxs("li", { className: aD, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${rD} ${iD[i.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: sD, children: i.label }),
      i.detail && /* @__PURE__ */ c.jsx("span", { className: lD, children: i.detail })
    ] }, i.id)) })
  ] });
}
var G0 = "_17fbpt30", P0 = "_17fbpt31", K0 = "_17fbpt32", cD = "_17fbpt33", uD = "_17fbpt34", dD = "_17fbpt35", X0 = "_17fbpt36", fD = "_17fbpt37", hD = "_17fbpt38";
const mD = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function pD({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: G0, children: [
    /* @__PURE__ */ c.jsx("header", { className: P0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: K0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (u) => {
          u.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: fD, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: hD, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: G0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: P0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: K0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (u) => {
            u.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: cD, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: uD,
        onClick: s ? () => s(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: dD, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${i1.sm} ${s1[mD[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: X0, children: vD(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: X0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function vD(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
const p1 = y.createContext({});
function Kh(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const gD = typeof window < "u", v1 = gD ? y.useLayoutEffect : y.useEffect, qc = /* @__PURE__ */ y.createContext(null);
function yD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function bD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const wr = (t, a, i) => i > a ? a : i < t ? t : i;
function Q0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Nl = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Nl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(Q0(a, i));
}, Ji = (t, a, i) => {
  if (!t)
    throw new Error(Q0(a, i));
});
const jr = {}, g1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function xD(t) {
  return typeof t == "object" && t !== null;
}
const y1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function b1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ns = /* @__NO_SIDE_EFFECTS__ */ (t) => t, SD = (t, a) => (i) => a(t(i)), Ic = (...t) => t.reduce(SD), x1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const s = a - t;
  return s === 0 ? 1 : (i - t) / s;
};
class S1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return yD(this.subscriptions, a), () => bD(this.subscriptions, a);
  }
  notify(a, i, s) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, s);
      else
        for (let u = 0; u < o; u++) {
          const f = this.subscriptions[u];
          f && f(a, i, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Kn = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ia = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function w1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const j1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, wD = 1e-7, jD = 12;
function ED(t, a, i, s, o) {
  let u, f, p = 0;
  do
    f = a + (i - a) / 2, u = j1(f, s, o) - t, u > 0 ? i = f : a = f;
  while (Math.abs(u) > wD && ++p < jD);
  return f;
}
function Tl(t, a, i, s) {
  if (t === a && i === s)
    return ns;
  const o = (u) => ED(u, 0, 1, t, i);
  return (u) => u === 0 || u === 1 ? u : j1(o(u), a, s);
}
const E1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, N1 = (t) => (a) => 1 - t(1 - a), T1 = /* @__PURE__ */ Tl(0.33, 1.53, 0.69, 0.99), Xh = /* @__PURE__ */ N1(T1), C1 = /* @__PURE__ */ E1(Xh), R1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Xh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Qh = (t) => 1 - Math.sin(Math.acos(t)), ND = N1(Qh), _1 = E1(Qh), TD = /* @__PURE__ */ Tl(0.42, 0, 1, 1), CD = /* @__PURE__ */ Tl(0, 0, 0.58, 1), M1 = /* @__PURE__ */ Tl(0.42, 0, 0.58, 1), RD = (t) => Array.isArray(t) && typeof t[0] != "number", A1 = (t) => Array.isArray(t) && typeof t[0] == "number", Z0 = {
  linear: ns,
  easeIn: TD,
  easeInOut: M1,
  easeOut: CD,
  circIn: Qh,
  circInOut: _1,
  circOut: ND,
  backIn: Xh,
  backInOut: C1,
  backOut: T1,
  anticipate: R1
}, _D = (t) => typeof t == "string", J0 = (t) => {
  if (A1(t)) {
    Ji(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = t;
    return Tl(a, i, s, o);
  } else if (_D(t))
    return Ji(Z0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Z0[t];
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
function MD(t, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let p = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    f.has(b) && (m.schedule(b), t()), b(p);
  }
  const m = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, w = !1) => {
      const j = w && o ? i : s;
      return v && f.add(b), j.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      s.delete(b), f.delete(b);
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
      const v = i;
      i = s, s = v, i.forEach(g), i.clear(), o = !1, u && (u = !1, m.process(b));
    }
  };
  return m;
}
const AD = 40;
function D1(t, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => i = !0, f = Zo.reduce((O, R) => (O[R] = MD(u), O), {}), { setup: p, read: g, resolveKeyframes: m, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const O = jr.useManualTiming, R = O ? o.timestamp : performance.now();
    i = !1, O || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, AD), 1)), o.timestamp = R, o.isProcessing = !0, p.process(o), g.process(o), m.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, i && a && (s = !1, t(N));
  }, C = () => {
    i = !0, s = !0, o.isProcessing || t(N);
  };
  return { schedule: Zo.reduce((O, R) => {
    const H = f[R];
    return O[R] = (X, se = !1, M = !1) => (i || C(), H.schedule(X, se, M)), O;
  }, {}), cancel: (O) => {
    for (let R = 0; R < Zo.length; R++)
      f[Zo[R]].cancel(O);
  }, state: o, steps: f };
}
const { schedule: Xn, cancel: nh, state: wc } = /* @__PURE__ */ D1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ns, !0);
let hc;
function DD() {
  hc = void 0;
}
const Dn = {
  now: () => (hc === void 0 && Dn.set(wc.isProcessing || jr.useManualTiming ? wc.timestamp : performance.now()), hc),
  set: (t) => {
    hc = t, queueMicrotask(DD);
  }
}, k1 = (t) => (a) => typeof a == "string" && a.startsWith(t), z1 = /* @__PURE__ */ k1("--"), kD = /* @__PURE__ */ k1("var(--"), Zh = (t) => kD(t) ? zD.test(t.split("/*")[0].trim()) : !1, zD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function W0(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const as = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...as,
  transform: (t) => wr(0, 1, t)
}, Jo = {
  ...as,
  default: 1
}, dl = (t) => Math.round(t * 1e5) / 1e5, Jh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function OD(t) {
  return t == null;
}
const LD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Wh = (t, a) => (i) => !!(typeof i == "string" && LD.test(i) && i.startsWith(t) || a && !OD(i) && Object.prototype.hasOwnProperty.call(i, a)), O1 = (t, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, u, f, p] = s.match(Jh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [i]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, UD = (t) => wr(0, 255, t), Af = {
  ...as,
  transform: (t) => Math.round(UD(t))
}, Gr = {
  test: /* @__PURE__ */ Wh("rgb", "red"),
  parse: /* @__PURE__ */ O1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: s = 1 }) => "rgba(" + Af.transform(t) + ", " + Af.transform(a) + ", " + Af.transform(i) + ", " + dl(yl.transform(s)) + ")"
};
function $D(t) {
  let a = "", i = "", s = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), s = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), s = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const ah = {
  test: /* @__PURE__ */ Wh("#"),
  parse: $D,
  transform: Gr.transform
}, Cl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), gr = /* @__PURE__ */ Cl("deg"), Ki = /* @__PURE__ */ Cl("%"), Ce = /* @__PURE__ */ Cl("px"), BD = /* @__PURE__ */ Cl("vh"), VD = /* @__PURE__ */ Cl("vw"), eb = {
  ...Ki,
  parse: (t) => Ki.parse(t) / 100,
  transform: (t) => Ki.transform(t * 100)
}, Yi = {
  test: /* @__PURE__ */ Wh("hsl", "hue"),
  parse: /* @__PURE__ */ O1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Ki.transform(dl(a)) + ", " + Ki.transform(dl(i)) + ", " + dl(yl.transform(s)) + ")"
}, Ht = {
  test: (t) => Gr.test(t) || ah.test(t) || Yi.test(t),
  parse: (t) => Gr.test(t) ? Gr.parse(t) : Yi.test(t) ? Yi.parse(t) : ah.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Gr.transform(t) : Yi.transform(t),
  getAnimatableNone: (t) => {
    const a = Ht.parse(t);
    return a.alpha = 0, Ht.transform(a);
  }
}, HD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function qD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Jh)?.length || 0) + (t.match(HD)?.length || 0) > 0;
}
const L1 = "number", U1 = "color", ID = "var", FD = "var(", tb = "${}", YD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(t) {
  const a = t.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const p = a.replace(YD, (g) => (Ht.test(g) ? (s.color.push(u), o.push(U1), i.push(Ht.parse(g))) : g.startsWith(FD) ? (s.var.push(u), o.push(ID), i.push(g)) : (s.number.push(u), o.push(L1), i.push(parseFloat(g))), ++u, tb)).split(tb);
  return { values: i, split: p, indexes: s, types: o };
}
function GD(t) {
  return Wi(t).values;
}
function $1({ split: t, types: a }) {
  const i = t.length;
  return (s) => {
    let o = "";
    for (let u = 0; u < i; u++)
      if (o += t[u], s[u] !== void 0) {
        const f = a[u];
        f === L1 ? o += dl(s[u]) : f === U1 ? o += Ht.transform(s[u]) : o += s[u];
      }
    return o;
  };
}
function PD(t) {
  return $1(Wi(t));
}
const KD = (t) => typeof t == "number" ? 0 : Ht.test(t) ? Ht.getAnimatableNone(t) : t, XD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : KD(t);
function QD(t) {
  const a = Wi(t);
  return $1(a)(a.values.map((s, o) => XD(s, a.split[o])));
}
const sa = {
  test: qD,
  parse: GD,
  createTransformer: PD,
  getAnimatableNone: QD
};
function Df(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function ZD({ hue: t, saturation: a, lightness: i, alpha: s }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = i;
  else {
    const p = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - p;
    o = Df(g, p, t + 1 / 3), u = Df(g, p, t), f = Df(g, p, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(u * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function jc(t, a) {
  return (i) => i > 0 ? a : t;
}
const Rl = (t, a, i) => t + (a - t) * i, kf = (t, a, i) => {
  const s = t * t, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, JD = [ah, Gr, Yi], WD = (t) => JD.find((a) => a.test(t));
function nb(t) {
  const a = WD(t);
  if (Nl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Yi && (i = ZD(i)), i;
}
const ab = (t, a) => {
  const i = nb(t), s = nb(a);
  if (!i || !s)
    return jc(t, a);
  const o = { ...i };
  return (u) => (o.red = kf(i.red, s.red, u), o.green = kf(i.green, s.green, u), o.blue = kf(i.blue, s.blue, u), o.alpha = Rl(i.alpha, s.alpha, u), Gr.transform(o));
}, rh = /* @__PURE__ */ new Set(["none", "hidden"]);
function ek(t, a) {
  return rh.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function tk(t, a) {
  return (i) => Rl(t, a, i);
}
function em(t) {
  return typeof t == "number" ? tk : typeof t == "string" ? Zh(t) ? jc : Ht.test(t) ? ab : rk : Array.isArray(t) ? B1 : typeof t == "object" ? Ht.test(t) ? ab : nk : jc;
}
function B1(t, a) {
  const i = [...t], s = i.length, o = t.map((u, f) => em(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < s; f++)
      i[f] = o[f](u);
    return i;
  };
}
function nk(t, a) {
  const i = { ...t, ...a }, s = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (s[o] = em(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in s)
      i[u] = s[u](o);
    return i;
  };
}
function ak(t, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][s[u]], p = t.values[f] ?? 0;
    i[o] = p, s[u]++;
  }
  return i;
}
const rk = (t, a) => {
  const i = sa.createTransformer(a), s = Wi(t), o = Wi(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? rh.has(t) && !o.values.length || rh.has(a) && !s.values.length ? ek(t, a) : Ic(B1(ak(s, o), o.values), i) : (Nl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), jc(t, a));
};
function V1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? Rl(t, a, i) : em(t)(t, a);
}
const ik = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Xn.update(a, i),
    stop: () => nh(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wc.isProcessing ? wc.timestamp : Dn.now()
  };
}, H1 = (t, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let u = 0; u < o; u++)
    s += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Ec = 2e4;
function tm(t) {
  let a = 0;
  const i = 50;
  let s = t.next(a);
  for (; !s.done && a < Ec; )
    a += i, s = t.next(a);
  return a >= Ec ? 1 / 0 : a;
}
function sk(t, a = 100, i) {
  const s = i({ ...t, keyframes: [0, a] }), o = Math.min(tm(s), Ec);
  return {
    type: "keyframes",
    ease: (u) => s.next(o * u).value / a,
    duration: /* @__PURE__ */ ia(o)
  };
}
const Et = {
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
const lk = 12;
function ok(t, a, i) {
  let s = i;
  for (let o = 1; o < lk; o++)
    s = s - t(s) / a(s);
  return s;
}
const zf = 1e-3;
function ck({ duration: t = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: s = Et.mass }) {
  let o, u;
  Nl(t <= /* @__PURE__ */ Kn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(Et.minDamping, Et.maxDamping, f), t = wr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ ia(t)), f < 1 ? (o = (m) => {
    const b = m * f, v = b * t, w = b - i, S = ih(m, f), j = Math.exp(-v);
    return zf - w / S * j;
  }, u = (m) => {
    const v = m * f * t, w = v * i + i, S = Math.pow(f, 2) * Math.pow(m, 2) * t, j = Math.exp(-v), N = ih(Math.pow(m, 2), f);
    return (-o(m) + zf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (m) => {
    const b = Math.exp(-m * t), v = (m - i) * t + 1;
    return -zf + b * v;
  }, u = (m) => {
    const b = Math.exp(-m * t), v = (i - m) * (t * t);
    return b * v;
  });
  const p = 5 / t, g = ok(o, u, p);
  if (t = /* @__PURE__ */ Kn(t), isNaN(g))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
      duration: t
    };
  {
    const m = Math.pow(g, 2) * s;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(s * m),
      duration: t
    };
  }
}
const uk = ["duration", "bounce"], dk = ["stiffness", "damping", "mass"];
function rb(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function fk(t) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!rb(t, dk) && rb(t, uk))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const i = ck({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: Et.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Nc(t = Et.visualDuration, a = Et.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: s, restDelta: o } = i;
  const u = i.keyframes[0], f = i.keyframes[i.keyframes.length - 1], p = { done: !1, value: u }, { stiffness: g, damping: m, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = fk({
    ...i,
    velocity: -/* @__PURE__ */ ia(i.velocity || 0)
  }), j = w || 0, N = m / (2 * Math.sqrt(g * b)), C = f - u, T = /* @__PURE__ */ ia(Math.sqrt(g / b)), A = Math.abs(C) < 5;
  s || (s = A ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = A ? Et.restDelta.granular : Et.restDelta.default);
  let O, R, H, X, se, M;
  if (N < 1)
    H = ih(T, N), X = (j + N * T * C) / H, O = (z) => {
      const Y = Math.exp(-N * T * z);
      return f - Y * (X * Math.sin(H * z) + C * Math.cos(H * z));
    }, se = N * T * X + C * H, M = N * T * C - X * H, R = (z) => Math.exp(-N * T * z) * (se * Math.sin(H * z) + M * Math.cos(H * z));
  else if (N === 1) {
    O = (Y) => f - Math.exp(-T * Y) * (C + (j + T * C) * Y);
    const z = j + T * C;
    R = (Y) => Math.exp(-T * Y) * (T * z * Y - j);
  } else {
    const z = T * Math.sqrt(N * N - 1);
    O = (oe) => {
      const ne = Math.exp(-N * T * oe), k = Math.min(z * oe, 300);
      return f - ne * ((j + N * T * C) * Math.sinh(k) + z * C * Math.cosh(k)) / z;
    };
    const Y = (j + N * T * C) / z, ee = N * T * Y - C * z, K = N * T * C - Y * z;
    R = (oe) => {
      const ne = Math.exp(-N * T * oe), k = Math.min(z * oe, 300);
      return ne * (ee * Math.sinh(k) + K * Math.cosh(k));
    };
  }
  const q = {
    calculatedDuration: S && v || null,
    velocity: (z) => /* @__PURE__ */ Kn(R(z)),
    next: (z) => {
      if (!S && N < 1) {
        const ee = Math.exp(-N * T * z), K = Math.sin(H * z), oe = Math.cos(H * z), ne = f - ee * (X * K + C * oe), k = /* @__PURE__ */ Kn(ee * (se * K + M * oe));
        return p.done = Math.abs(k) <= s && Math.abs(f - ne) <= o, p.value = p.done ? f : ne, p;
      }
      const Y = O(z);
      if (S)
        p.done = z >= v;
      else {
        const ee = /* @__PURE__ */ Kn(R(z));
        p.done = Math.abs(ee) <= s && Math.abs(f - Y) <= o;
      }
      return p.value = p.done ? f : Y, p;
    },
    toString: () => {
      const z = Math.min(tm(q), Ec), Y = H1((ee) => q.next(z * ee).value, z, 30);
      return z + "ms " + Y;
    },
    toTransition: () => {
    }
  };
  return q;
}
Nc.applyToOptions = (t) => {
  const a = sk(t, 100, Nc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Kn(a.duration), t.type = "keyframes", t;
};
const hk = 5;
function q1(t, a, i) {
  const s = Math.max(a - hk, 0);
  return w1(i - t(s), a - s);
}
function sh({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: p, max: g, restDelta: m = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (M) => p !== void 0 && M < p || g !== void 0 && M > g, j = (M) => p === void 0 ? g : g === void 0 || Math.abs(p - M) < Math.abs(g - M) ? p : g;
  let N = i * a;
  const C = v + N, T = f === void 0 ? C : f(C);
  T !== C && (N = T - v);
  const A = (M) => -N * Math.exp(-M / s), O = (M) => T + A(M), R = (M) => {
    const q = A(M), z = O(M);
    w.done = Math.abs(q) <= m, w.value = w.done ? T : z;
  };
  let H, X;
  const se = (M) => {
    S(w.value) && (H = M, X = Nc({
      keyframes: [w.value, j(w.value)],
      velocity: q1(O, M, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: m,
      restSpeed: b
    }));
  };
  return se(0), {
    calculatedDuration: null,
    next: (M) => {
      let q = !1;
      return !X && H === void 0 && (q = !0, R(M), se(M)), H !== void 0 && M >= H ? X.next(M - H) : (!q && R(M), w);
    }
  };
}
function mk(t, a, i) {
  const s = [], o = i || jr.mix || V1, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let p = o(t[f], t[f + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[f] || ns : a;
      p = Ic(g, p);
    }
    s.push(p);
  }
  return s;
}
function pk(t, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const u = t.length;
  if (Ji(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const p = mk(a, s, o), g = p.length, m = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ x1(t[v], t[v + 1], b);
    return p[v](w);
  };
  return i ? (b) => m(wr(t[0], t[u - 1], b)) : m;
}
function vk(t, a) {
  const i = t[t.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ x1(0, a, s);
    t.push(Rl(i, 1, o));
  }
}
function gk(t) {
  const a = [0];
  return vk(a, t.length - 1), a;
}
function yk(t, a) {
  return t.map((i) => i * a);
}
function bk(t, a) {
  return t.map(() => a || M1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = RD(s) ? s.map(J0) : J0(s), u = {
    done: !1,
    value: a[0]
  }, f = yk(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : gk(a),
    t
  ), p = pk(f, a, {
    ease: Array.isArray(o) ? o : bk(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (u.value = p(g), u.done = g >= t, u)
  };
}
const xk = (t) => t !== null;
function Fc(t, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const u = t.filter(xk), p = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !p || s === void 0 ? u[p] : s;
}
const Sk = {
  decay: sh,
  inertia: sh,
  tween: fl,
  keyframes: fl,
  spring: Nc
};
function I1(t) {
  typeof t.type == "string" && (t.type = Sk[t.type]);
}
class nm {
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
  then(a, i) {
    return this.finished.then(a, i);
  }
}
const wk = (t) => t / 100;
class Tc extends nm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Dn.now() && this.tick(Dn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    I1(a);
    const { type: i = fl, repeat: s = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: p } = a;
    const g = i || fl;
    g !== fl && typeof p[0] != "number" && (this.mixKeyframes = Ic(wk, V1(p[0], p[1])), p = [0, 100]);
    const m = g({ ...a, keyframes: p });
    u === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...p].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = tm(m));
    const { calculatedDuration: b } = m;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = m;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: p, calculatedDuration: g } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, R = s;
    if (v) {
      const M = Math.min(this.currentTime, o) / p;
      let q = Math.floor(M), z = M % 1;
      !z && M >= 1 && (z = 1), z === 1 && q--, q = Math.min(q, v + 1), !!(q % 2) && (w === "reverse" ? (z = 1 - z, S && (z -= S / p)) : w === "mirror" && (R = f)), O = wr(0, 1, z) * p;
    }
    let H;
    A ? (this.delayState.value = b[0], H = this.delayState) : H = R.next(O), u && !A && (H.value = u(H.value));
    let { done: X } = H;
    !A && g !== null && (X = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const se = this.holdTime === null && (this.state === "finished" || this.state === "running" && X);
    return se && j !== sh && (H.value = Fc(b, this.options, C, this.speed)), N && N(H.value), se && this.finish(), H;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(a, i) {
    return this.finished.then(a, i);
  }
  get duration() {
    return /* @__PURE__ */ ia(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ia(a);
  }
  get time() {
    return /* @__PURE__ */ ia(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Kn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    const i = this.generator.next(a).value;
    return q1((s) => this.generator.next(s).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(Dn.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ ia(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = ik, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Dn.now()), this.holdTime = this.currentTime;
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
function jk(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Pr = (t) => t * 180 / Math.PI, lh = (t) => {
  const a = Pr(Math.atan2(t[1], t[0]));
  return oh(a);
}, Ek = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: lh,
  rotateZ: lh,
  skewX: (t) => Pr(Math.atan(t[1])),
  skewY: (t) => Pr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, oh = (t) => (t = t % 360, t < 0 && (t += 360), t), ib = lh, sb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), lb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Nk = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: sb,
  scaleY: lb,
  scale: (t) => (sb(t) + lb(t)) / 2,
  rotateX: (t) => oh(Pr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => oh(Pr(Math.atan2(-t[2], t[0]))),
  rotateZ: ib,
  rotate: ib,
  skewX: (t) => Pr(Math.atan(t[4])),
  skewY: (t) => Pr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ch(t) {
  return t.includes("scale") ? 1 : 0;
}
function uh(t, a) {
  if (!t || t === "none")
    return ch(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = Nk, o = i;
  else {
    const p = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Ek, o = p;
  }
  if (!o)
    return ch(a);
  const u = s[a], f = o[1].split(",").map(Ck);
  return typeof u == "function" ? u(f) : f[u];
}
const Tk = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return uh(i, a);
};
function Ck(t) {
  return parseFloat(t.trim());
}
const rs = [
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
], is = new Set(rs), ob = (t) => t === as || t === Ce, Rk = /* @__PURE__ */ new Set(["x", "y", "z"]), _k = rs.filter((t) => !Rk.has(t));
function Mk(t) {
  const a = [];
  return _k.forEach((i) => {
    const s = t.getValue(i);
    s !== void 0 && (a.push([i, s.get()]), s.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const Sr = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: i = "0", boxSizing: s }) => {
    const o = t.max - t.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: i = "0", boxSizing: s }) => {
    const o = t.max - t.min;
    return s === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => uh(a, "x"),
  y: (t, { transform: a }) => uh(a, "y")
};
Sr.translateX = Sr.x;
Sr.translateY = Sr.y;
const Xr = /* @__PURE__ */ new Set();
let dh = !1, fh = !1, hh = !1;
function F1() {
  if (fh) {
    const t = Array.from(Xr).filter((s) => s.needsMeasurement), a = new Set(t.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = Mk(s);
      o.length && (i.set(s, o), s.render());
    }), t.forEach((s) => s.measureInitialState()), a.forEach((s) => {
      s.render();
      const o = i.get(s);
      o && o.forEach(([u, f]) => {
        s.getValue(u)?.set(f);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  fh = !1, dh = !1, Xr.forEach((t) => t.complete(hh)), Xr.clear();
}
function Y1() {
  Xr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (fh = !0);
  });
}
function Ak() {
  hh = !0, Y1(), F1(), hh = !1;
}
class am {
  constructor(a, i, s, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Xr.add(this), dh || (dh = !0, Xn.read(Y1), Xn.resolveKeyframes(F1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (s && i) {
        const p = s.readValue(i, f);
        p != null && (a[0] = p);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    jk(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Xr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Xr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Dk = (t) => t.startsWith("--");
function G1(t, a, i) {
  Dk(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const kk = {};
function P1(t, a) {
  const i = /* @__PURE__ */ b1(t);
  return () => kk[a] ?? i();
}
const zk = /* @__PURE__ */ P1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), K1 = /* @__PURE__ */ P1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, i, s]) => `cubic-bezier(${t}, ${a}, ${i}, ${s})`, cb = {
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
function X1(t, a) {
  if (t)
    return typeof t == "function" ? K1() ? H1(t, a) : "ease-out" : A1(t) ? ol(t) : Array.isArray(t) ? t.map((i) => X1(i, a) || cb.easeOut) : cb[t];
}
function Ok(t, a, i, { delay: s = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: p = "easeOut", times: g } = {}, m = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = X1(p, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return m && (w.pseudoElement = m), t.animate(b, w);
}
function Q1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Lk({ type: t, ...a }) {
  return Q1(t) && K1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class Z1 extends nm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: p, onComplete: g } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const m = Lk(a);
    this.animation = Ok(i, s, o, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Fc(o, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), G1(i, s, b), this.animation.cancel();
      }
      g?.(), this.notifyFinished();
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
    return /* @__PURE__ */ ia(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ia(a);
  }
  get time() {
    return /* @__PURE__ */ ia(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Kn(a), i && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: i, rangeEnd: s, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && zk() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), ns) : o(this);
  }
}
const J1 = {
  anticipate: R1,
  backInOut: C1,
  circInOut: _1
};
function Uk(t) {
  return t in J1;
}
function $k(t) {
  typeof t.ease == "string" && Uk(t.ease) && (t.ease = J1[t.ease]);
}
const Of = 10;
class Bk extends Z1 {
  constructor(a) {
    $k(a), I1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: s, onComplete: o, element: u, ...f } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const p = new Tc({
      ...f,
      autoplay: !1
    }), g = Math.max(Of, Dn.now() - this.startTime), m = wr(0, Of, g - Of), b = p.sample(g).value, { name: v } = this.options;
    u && v && G1(u, v, b), i.setWithVelocity(p.sample(Math.max(0, g - m)).value, b, m), p.stop();
  }
}
const ub = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(sa.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Vk(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function Hk(t, a, i, s) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = ub(o, a), p = ub(u, a);
  return Nl(f === p, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !p ? !1 : Vk(t) || (i === "spring" || Q1(i)) && s;
}
function mh(t) {
  t.duration = 0, t.type = "keyframes";
}
const W1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), qk = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Ik(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && qk.test(t[a]))
      return !0;
  return !1;
}
const Fk = /* @__PURE__ */ new Set([
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
]), Yk = /* @__PURE__ */ b1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Gk(t) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: u, type: f, keyframes: p } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: b } = a.owner.getProps();
  return Yk() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (W1.has(i) || Fk.has(i) && Ik(p)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && o !== "mirror" && u !== 0 && f !== "inertia";
}
const Pk = 40;
class Kk extends nm {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: p, name: g, motionValue: m, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const w = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: u,
      repeatType: f,
      name: g,
      motionValue: m,
      element: b,
      ...v
    }, S = b?.KeyframeResolver || am;
    this.keyframeResolver = new S(p, (j, N, C) => this.onKeyframesResolved(j, N, w, !C), g, m, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: p, delay: g, isHandoff: m, onUpdate: b } = s;
    this.resolvedAt = Dn.now();
    let v = !0;
    Hk(a, u, f, p) || (v = !1, (jr.instantAnimations || !g) && b?.(Fc(a, s, i)), a[0] = a[a.length - 1], mh(s), s.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > Pk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, j = v && !m && Gk(S), N = S.motionValue?.owner?.current;
    let C;
    if (j)
      try {
        C = new Bk({
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
    }).catch(ns), this.pendingTimeline && (this.stopTimeline = C.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = C;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Ak()), this._animation;
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
function eS(t, a, i, s = 0, o = 1) {
  const u = Array.from(t).sort((m, b) => m.sortNodePosition(b)).indexOf(a), f = t.size, p = (f - 1) * s;
  return typeof i == "function" ? i(u, f) : o === 1 ? u * s : p - u * s;
}
const Xk = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Qk(t) {
  const a = Xk.exec(t);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const Zk = 4;
function tS(t, a, i = 1) {
  Ji(i <= Zk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = Qk(t);
  if (!s)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(s);
  if (u) {
    const f = u.trim();
    return g1(f) ? parseFloat(f) : f;
  }
  return Zh(o) ? tS(o, a, i + 1) : o;
}
const Jk = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Wk = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), e5 = {
  type: "keyframes",
  duration: 0.8
}, t5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, n5 = (t, { keyframes: a }) => a.length > 2 ? e5 : is.has(t) ? t.startsWith("scale") ? Wk(a[1]) : Jk : t5;
function nS(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...s } = t;
    return { ...a, ...s };
  }
  return t;
}
function aS(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? nS(i, t) : i;
}
const a5 = /* @__PURE__ */ new Set([
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
function r5(t) {
  for (const a in t)
    if (!a5.has(a))
      return !0;
  return !1;
}
const i5 = (t, a, i, s = {}, o, u) => (f) => {
  const p = aS(s, t) || {}, g = p.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ Kn(g);
  const b = {
    keyframes: Array.isArray(i) ? i : [null, i],
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
  r5(p) || Object.assign(b, n5(t, b)), b.duration && (b.duration = /* @__PURE__ */ Kn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Kn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (mh(b), b.delay === 0 && (v = !0)), (jr.instantAnimations || jr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, mh(b), b.delay = 0), b.allowFlatten = !p.type && !p.ease, v && !u && a.get() !== void 0) {
    const w = Fc(b.keyframes, p);
    if (w !== void 0) {
      Xn.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new Tc(b) : new Kk(b);
};
function db(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function rm(t, a, i, s) {
  if (typeof a == "function") {
    const [o, u] = db(s);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = db(s);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  return a;
}
function Qr(t, a, i) {
  const s = t.getProps();
  return rm(s, a, i !== void 0 ? i : s.custom, t);
}
const rS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...rs
]), fb = 30, s5 = (t) => !isNaN(parseFloat(t));
class l5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Dn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = s5(this.current));
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
  on(a, i) {
    this.events[a] || (this.events[a] = new S1());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), Xn.read(() => {
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
  attach(a, i) {
    this.passiveEffect = a, this.stopPassiveEffect = i;
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
  setWithVelocity(a, i, s) {
    this.set(i), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(a, i = !0) {
    this.updateAndNotify(a), this.prev = a, this.prevUpdatedAt = this.prevFrameValue = void 0, i && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    const a = Dn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > fb)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, fb);
    return w1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
    return this.stop(), new Promise((i) => {
      this.hasAnimated = !0, this.animation = a(i), this.events.animationStart && this.events.animationStart.notify();
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
function Cc(t, a) {
  return new l5(t, a);
}
const ph = (t) => Array.isArray(t);
function o5(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Cc(i));
}
function c5(t) {
  return ph(t) ? t[t.length - 1] || 0 : t;
}
function u5(t, a) {
  const i = Qr(t, a);
  let { transitionEnd: s = {}, transition: o = {}, ...u } = i || {};
  u = { ...u, ...s };
  for (const f in u) {
    const p = c5(u[f]);
    o5(t, f, p);
  }
}
const on = (t) => !!(t && t.getVelocity);
function d5(t) {
  return !!(on(t) && t.add);
}
function f5(t, a) {
  const i = t.getValue("willChange");
  if (d5(i))
    return i.add(a);
  if (!i && jr.WillChange) {
    const s = new jr.WillChange("auto");
    t.addValue("willChange", s), s.add(a);
  }
}
function im(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const h5 = "framerAppearId", iS = "data-" + im(h5);
function m5(t) {
  return t.props[iS];
}
function p5({ protectedKeys: t, needsAnimating: a }, i) {
  const s = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function sS(t, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...p } = a;
  const g = t.getDefaultTransition();
  u = u ? nS(u, g) : g;
  const m = u?.reduceMotion;
  s && (u = s);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in p) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = p[w];
    if (j === void 0 || v && p5(v, w))
      continue;
    const N = {
      delay: i,
      ...aS(u || {}, w)
    }, C = S.get();
    if (C !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === C && !N.velocity) {
      Xn.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const R = m5(t);
      if (R) {
        const H = window.MotionHandoffAnimation(R, w, Xn);
        H !== null && (N.startTime = H, T = !0);
      }
    }
    f5(t, w);
    const A = m ?? t.shouldReduceMotion;
    S.start(i5(w, S, j, A && rS.has(w) ? { type: !1 } : N, t, T));
    const O = S.animation;
    O && b.push(O);
  }
  if (f) {
    const w = () => Xn.update(() => {
      f && u5(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function vh(t, a, i = {}) {
  const s = Qr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const u = s ? () => Promise.all(sS(t, s, i)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: m = 0, staggerChildren: b, staggerDirection: v } = o;
    return v5(t, a, g, m, b, v, i);
  } : () => Promise.resolve(), { when: p } = o;
  if (p) {
    const [g, m] = p === "beforeChildren" ? [u, f] : [f, u];
    return g().then(() => m());
  } else
    return Promise.all([u(), f(i.delay)]);
}
function v5(t, a, i = 0, s = 0, o = 0, u = 1, f) {
  const p = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), p.push(vh(g, a, {
      ...f,
      delay: i + (typeof s == "function" ? 0 : s) + eS(t.variantChildren, g, s, o, u)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(p);
}
function g5(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((u) => vh(t, u, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = vh(t, a, i);
  else {
    const o = typeof a == "function" ? Qr(t, a, i.custom) : a;
    s = Promise.all(sS(t, o, i));
  }
  return s.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const y5 = {
  test: (t) => t === "auto",
  parse: (t) => t
}, lS = (t) => (a) => a.test(t), oS = [as, Ce, Ki, gr, VD, BD, y5], hb = (t) => oS.find(lS(t));
function b5(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || y1(t) : !0;
}
const x5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function S5(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [s] = i.match(Jh) || [];
  if (!s)
    return t;
  const o = i.replace(s, "");
  let u = x5.has(a) ? 1 : 0;
  return s !== i && (u *= 100), a + "(" + u + o + ")";
}
const w5 = /\b([a-z-]*)\(.*?\)/gu, gh = {
  ...sa,
  getAnimatableNone: (t) => {
    const a = t.match(w5);
    return a ? a.map(S5).join(" ") : t;
  }
}, yh = {
  ...sa,
  getAnimatableNone: (t) => {
    const a = sa.parse(t);
    return sa.createTransformer(t)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, mb = {
  ...as,
  transform: Math.round
}, j5 = {
  rotate: gr,
  rotateX: gr,
  rotateY: gr,
  rotateZ: gr,
  scale: Jo,
  scaleX: Jo,
  scaleY: Jo,
  scaleZ: Jo,
  skew: gr,
  skewX: gr,
  skewY: gr,
  distance: Ce,
  translateX: Ce,
  translateY: Ce,
  translateZ: Ce,
  x: Ce,
  y: Ce,
  z: Ce,
  perspective: Ce,
  transformPerspective: Ce,
  opacity: yl,
  originX: eb,
  originY: eb,
  originZ: Ce
}, sm = {
  // Border props
  borderWidth: Ce,
  borderTopWidth: Ce,
  borderRightWidth: Ce,
  borderBottomWidth: Ce,
  borderLeftWidth: Ce,
  borderRadius: Ce,
  borderTopLeftRadius: Ce,
  borderTopRightRadius: Ce,
  borderBottomRightRadius: Ce,
  borderBottomLeftRadius: Ce,
  // Positioning props
  width: Ce,
  maxWidth: Ce,
  height: Ce,
  maxHeight: Ce,
  top: Ce,
  right: Ce,
  bottom: Ce,
  left: Ce,
  inset: Ce,
  insetBlock: Ce,
  insetBlockStart: Ce,
  insetBlockEnd: Ce,
  insetInline: Ce,
  insetInlineStart: Ce,
  insetInlineEnd: Ce,
  // Spacing props
  padding: Ce,
  paddingTop: Ce,
  paddingRight: Ce,
  paddingBottom: Ce,
  paddingLeft: Ce,
  paddingBlock: Ce,
  paddingBlockStart: Ce,
  paddingBlockEnd: Ce,
  paddingInline: Ce,
  paddingInlineStart: Ce,
  paddingInlineEnd: Ce,
  margin: Ce,
  marginTop: Ce,
  marginRight: Ce,
  marginBottom: Ce,
  marginLeft: Ce,
  marginBlock: Ce,
  marginBlockStart: Ce,
  marginBlockEnd: Ce,
  marginInline: Ce,
  marginInlineStart: Ce,
  marginInlineEnd: Ce,
  // Typography
  fontSize: Ce,
  // Misc
  backgroundPositionX: Ce,
  backgroundPositionY: Ce,
  ...j5,
  zIndex: mb,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: mb
}, E5 = {
  ...sm,
  // Color props
  color: Ht,
  backgroundColor: Ht,
  outlineColor: Ht,
  fill: Ht,
  stroke: Ht,
  // Border props
  borderColor: Ht,
  borderTopColor: Ht,
  borderRightColor: Ht,
  borderBottomColor: Ht,
  borderLeftColor: Ht,
  filter: gh,
  WebkitFilter: gh,
  mask: yh,
  WebkitMask: yh
}, cS = (t) => E5[t], N5 = /* @__PURE__ */ new Set([gh, yh]);
function uS(t, a) {
  let i = cS(t);
  return N5.has(i) || (i = sa), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const T5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function C5(t, a, i) {
  let s = 0, o;
  for (; s < t.length && !o; ) {
    const u = t[s];
    typeof u == "string" && !T5.has(u) && Wi(u).values.length && (o = t[s]), s++;
  }
  if (o && i)
    for (const u of a)
      t[u] = uS(i, o);
}
class R5 extends am {
  constructor(a, i, s, o, u) {
    super(a, i, s, o, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: s } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), Zh(v))) {
        const w = tS(v, i.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !rS.has(s) || a.length !== 2)
      return;
    const [o, u] = a, f = hb(o), p = hb(u), g = W0(o), m = W0(u);
    if (g !== m && Sr[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (ob(f) && ob(p))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || b5(a[o])) && s.push(o);
    s.length && C5(a, s, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: s } = this;
    if (!a || !a.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Sr[s](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(s, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: s } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const u = s.length - 1, f = s[u];
    s[u] = Sr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([p, g]) => {
      a.getValue(p).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function _5(t, a, i) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    const o = i?.[t] ?? s.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const dS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function mc(t) {
  return xD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: M5 } = /* @__PURE__ */ D1(queueMicrotask, !1), A5 = {
  y: !1
};
function D5() {
  return A5.y;
}
function fS(t, a) {
  const i = _5(t), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function k5(t) {
  return !(t.pointerType === "touch" || D5());
}
function z5(t, a, i = {}) {
  const [s, o, u] = fS(t, i);
  return s.forEach((f) => {
    let p = !1, g = !1, m;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (C) => {
      m && (m(C), m = void 0), b();
    }, w = (C) => {
      p = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), g && (g = !1, v(C));
    }, S = () => {
      p = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (C) => {
      if (C.pointerType !== "touch") {
        if (p) {
          g = !0;
          return;
        }
        v(C);
      }
    }, N = (C) => {
      if (!k5(C))
        return;
      g = !1;
      const T = a(f, C);
      typeof T == "function" && (m = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const hS = (t, a) => a ? t === a ? !0 : hS(t, a.parentElement) : !1, O5 = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, L5 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function U5(t) {
  return L5.has(t.tagName) || t.isContentEditable === !0;
}
const pc = /* @__PURE__ */ new WeakSet();
function pb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Lf(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const $5 = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const s = pb(() => {
    if (pc.has(i))
      return;
    Lf(i, "down");
    const o = pb(() => {
      Lf(i, "up");
    }), u = () => Lf(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", u, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function vb(t) {
  return O5(t) && !0;
}
const gb = /* @__PURE__ */ new WeakSet();
function B5(t, a, i = {}) {
  const [s, o, u] = fS(t, i), f = (p) => {
    const g = p.currentTarget;
    if (!vb(p) || gb.has(p))
      return;
    pc.add(g), i.stopPropagation && gb.add(p);
    const m = a(g, p), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), pc.has(g) && pc.delete(g), vb(S) && typeof m == "function" && m(S, { success: j });
    }, v = (S) => {
      b(S, g === window || g === document || i.useGlobalTarget || hS(g, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return s.forEach((p) => {
    (i.useGlobalTarget ? window : p).addEventListener("pointerdown", f, o), mc(p) && (p.addEventListener("focus", (m) => $5(m, o)), !U5(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), u;
}
const V5 = [...oS, Ht, sa], H5 = (t) => V5.find(lS(t)), yb = () => ({ min: 0, max: 0 }), mS = () => ({
  x: yb(),
  y: yb()
}), q5 = /* @__PURE__ */ new WeakMap();
function Yc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const lm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], om = ["initial", ...lm];
function Gc(t) {
  return Yc(t.animate) || om.some((a) => bl(t[a]));
}
function pS(t) {
  return !!(Gc(t) || t.variants);
}
function I5(t, a, i) {
  for (const s in a) {
    const o = a[s], u = i[s];
    if (on(o))
      t.addValue(s, o);
    else if (on(u))
      t.addValue(s, Cc(o, { owner: t }));
    else if (u !== o)
      if (t.hasValue(s)) {
        const f = t.getValue(s);
        f.liveStyle === !0 ? f.jump(o) : f.hasAnimated || f.set(o);
      } else {
        const f = t.getStaticValue(s);
        t.addValue(s, Cc(f !== void 0 ? f : o, { owner: t }));
      }
  }
  for (const s in i)
    a[s] === void 0 && t.removeValue(s);
  return a;
}
const Rc = { current: null }, cm = { current: !1 }, F5 = typeof window < "u";
function vS() {
  if (cm.current = !0, !!F5)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Rc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Rc.current = !1;
}
const bb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let _c = {};
function gS(t) {
  _c = t;
}
function Y5() {
  return _c;
}
class G5 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, i, s) {
    return {};
  }
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: p }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = am, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = Dn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, Xn.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: b } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = i.initial ? { ...m } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = g, this.blockInitialAnimation = !!f, this.isControllingVariants = Gc(i), this.isVariantNode = pS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const S in w) {
      const j = w[S];
      m[S] !== void 0 && on(j) && j.set(m[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, q5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (cm.current || vS(), this.shouldReduceMotion = Rc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), nh(this.notifyUpdate), nh(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const a in this.events)
      this.events[a].clear();
    for (const a in this.features) {
      const i = this.features[a];
      i && (i.unmount(), i.isMounted = !1);
    }
    this.current = null;
  }
  addChild(a) {
    this.children.add(a), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(a);
  }
  removeChild(a) {
    this.children.delete(a), this.enteringChildren && this.enteringChildren.delete(a);
  }
  bindToMotionValue(a, i) {
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && W1.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: g, ease: m, duration: b } = i.accelerate, v = new Z1({
        element: this.current,
        name: a,
        keyframes: p,
        times: g,
        ease: m,
        duration: /* @__PURE__ */ Kn(b)
      }), w = f(v);
      this.valueSubscriptions.set(a, () => {
        w(), v.cancel();
      });
      return;
    }
    const s = is.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && Xn.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), u && u(), i.owner && i.stop();
    });
  }
  sortNodePosition(a) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== a.type ? 0 : this.sortInstanceNodePosition(this.current, a.current);
  }
  updateFeatures() {
    let a = "animation";
    for (a in _c) {
      const i = _c[a];
      if (!i)
        continue;
      const { isEnabled: s, Feature: o } = i;
      if (!this.features[a] && o && s(this.props) && (this.features[a] = new o(this)), this.features[a]) {
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : mS();
  }
  getStaticValue(a) {
    return this.latestValues[a];
  }
  setStaticValue(a, i) {
    this.latestValues[a] = i;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(a, i) {
    (a.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = a, this.prevPresenceContext = this.presenceContext, this.presenceContext = i;
    for (let s = 0; s < bb.length; s++) {
      const o = bb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = I5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const i = this.getClosestVariantNode();
    if (i)
      return i.variantChildren && i.variantChildren.add(a), () => i.variantChildren.delete(a);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(a, i) {
    const s = this.values.get(a);
    i !== s && (s && this.removeValue(a), this.bindToMotionValue(a, i), this.values.set(a, i), this.latestValues[a] = i.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(a) {
    this.values.delete(a);
    const i = this.valueSubscriptions.get(a);
    i && (i(), this.valueSubscriptions.delete(a)), delete this.latestValues[a], this.removeValueFromRenderState(a, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(a) {
    return this.values.has(a);
  }
  getValue(a, i) {
    if (this.props.values && this.props.values[a])
      return this.props.values[a];
    let s = this.values.get(a);
    return s === void 0 && i !== void 0 && (s = Cc(i === null ? void 0 : i, { owner: this }), this.addValue(a, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let s = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return s != null && (typeof s == "string" && (g1(s) || y1(s)) ? s = parseFloat(s) : !H5(s) && sa.test(i) && (s = uS(a, i)), this.setBaseTarget(a, on(s) ? s.get() : s)), on(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(a, i) {
    this.baseTarget[a] = i;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(a) {
    const { initial: i } = this.props;
    let s;
    if (typeof i == "string" || typeof i == "object") {
      const u = rm(this.props, i, this.presenceContext?.custom);
      u && (s = u[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !on(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new S1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    M5.render(this.render);
  }
}
class yS extends G5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = R5;
  }
  sortInstanceNodePosition(a, i) {
    return a.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, i) {
    const s = a.style;
    return s ? s[i] : void 0;
  }
  removeValueFromRenderState(a, { vars: i, style: s }) {
    delete i[a], delete s[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    on(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class ss {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function P5({ top: t, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: s }
  };
}
function K5(t, a) {
  if (!a)
    return t;
  const i = a({ x: t.left, y: t.top }), s = a({ x: t.right, y: t.bottom });
  return {
    top: i.y,
    left: i.x,
    bottom: s.y,
    right: s.x
  };
}
function X5(t, a) {
  return P5(K5(t.getBoundingClientRect(), a));
}
const Q5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Z5 = rs.length;
function J5(t, a, i) {
  let s = "", o = !0;
  for (let u = 0; u < Z5; u++) {
    const f = rs[u], p = t[f];
    if (p === void 0)
      continue;
    let g = !0;
    if (typeof p == "number")
      g = p === (f.startsWith("scale") ? 1 : 0);
    else {
      const m = parseFloat(p);
      g = f.startsWith("scale") ? m === 1 : m === 0;
    }
    if (!g || i) {
      const m = dS(p, sm[f]);
      if (!g) {
        o = !1;
        const b = Q5[f] || f;
        s += `${b}(${m}) `;
      }
      i && (a[f] = m);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function um(t, a, i) {
  const { style: s, vars: o, transformOrigin: u } = t;
  let f = !1, p = !1;
  for (const g in a) {
    const m = a[g];
    if (is.has(g)) {
      f = !0;
      continue;
    } else if (z1(g)) {
      o[g] = m;
      continue;
    } else {
      const b = dS(m, sm[g]);
      g.startsWith("origin") ? (p = !0, u[g] = b) : s[g] = b;
    }
  }
  if (a.transform || (f || i ? s.transform = J5(a, t.transform, i) : s.transform && (s.transform = "none")), p) {
    const { originX: g = "50%", originY: m = "50%", originZ: b = 0 } = u;
    s.transformOrigin = `${g} ${m} ${b}`;
  }
}
function bS(t, { style: a, vars: i }, s, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, s);
  for (f in i)
    u.setProperty(f, i[f]);
}
function xb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const nl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (Ce.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = xb(t, a.target.x), s = xb(t, a.target.y);
    return `${i}% ${s}%`;
  }
}, W5 = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const s = t, o = sa.parse(t);
    if (o.length > 5)
      return s;
    const u = sa.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, p = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + f] /= p, o[1 + f] /= g;
    const m = Rl(p, g, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= m), typeof o[3 + f] == "number" && (o[3 + f] /= m), u(o);
  }
}, ez = {
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
  boxShadow: W5
};
function xS(t, { layout: a, layoutId: i }) {
  return is.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!ez[t] || t === "opacity");
}
function dm(t, a, i) {
  const s = t.style, o = a?.style, u = {};
  if (!s)
    return u;
  for (const f in s)
    (on(s[f]) || o && on(o[f]) || xS(f, t) || i?.getValue(f)?.liveStyle !== void 0) && (u[f] = s[f]);
  return u;
}
function tz(t) {
  return window.getComputedStyle(t);
}
class nz extends yS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = bS;
  }
  readValueFromInstance(a, i) {
    if (is.has(i))
      return this.projection?.isProjecting ? ch(i) : Tk(a, i);
    {
      const s = tz(a), o = (z1(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return X5(a, i);
  }
  build(a, i, s) {
    um(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return dm(a, i, s);
  }
}
const az = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, rz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function iz(t, a, i = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? az : rz;
  t[u.offset] = `${-s}`, t[u.array] = `${a} ${i}`;
}
const sz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function SS(t, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, g, m, b) {
  if (um(t, p, m), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of sz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), s !== void 0 && (v.scale = s), o !== void 0 && iz(v, o, u, f, !1);
}
const wS = /* @__PURE__ */ new Set([
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
]), jS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function lz(t, a, i, s) {
  bS(t, a, void 0, s);
  for (const o in a.attrs)
    t.setAttribute(wS.has(o) ? o : im(o), a.attrs[o]);
}
function ES(t, a, i) {
  const s = dm(t, a, i);
  for (const o in t)
    if (on(t[o]) || on(a[o])) {
      const u = rs.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[u] = t[o];
    }
  return s;
}
class oz extends yS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = mS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (is.has(i)) {
      const s = cS(i);
      return s && s.default || 0;
    }
    return i = wS.has(i) ? i : im(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return ES(a, i, s);
  }
  build(a, i, s) {
    SS(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    lz(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = jS(a.tagName), super.mount(a);
  }
}
const cz = om.length;
function NS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? NS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < cz; i++) {
    const s = om[i], o = t.props[s];
    (bl(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function TS(t, a) {
  if (!Array.isArray(a))
    return !1;
  const i = a.length;
  if (i !== t.length)
    return !1;
  for (let s = 0; s < i; s++)
    if (a[s] !== t[s])
      return !1;
  return !0;
}
const uz = [...lm].reverse(), dz = lm.length;
function fz(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => g5(t, i, s)));
}
function hz(t) {
  let a = fz(t), i = Sb(), s = !0, o = !1;
  const u = (m) => (b, v) => {
    const w = Qr(t, v, m === "exit" ? t.presenceContext?.custom : void 0);
    if (w) {
      const { transition: S, transitionEnd: j, ...N } = w;
      b = { ...b, ...N, ...j };
    }
    return b;
  };
  function f(m) {
    a = m(t);
  }
  function p(m) {
    const { props: b } = t, v = NS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < dz; T++) {
      const A = uz[T], O = i[A], R = b[A] !== void 0 ? b[A] : v[A], H = bl(R), X = A === m ? O.isActive : null;
      X === !1 && (N = T);
      let se = R === v[A] && R !== b[A] && H;
      if (se && (s || o) && t.manuallyAnimateOnMount && (se = !1), O.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !O.isActive && X === null || // If we didn't and don't have any defined prop for this animation type
      !R && !O.prevProp || // Or if the prop doesn't define an animation
      Yc(R) || typeof R == "boolean")
        continue;
      if (A === "exit" && O.isActive && X !== !0) {
        O.prevResolvedValues && (j = {
          ...j,
          ...O.prevResolvedValues
        });
        continue;
      }
      const M = mz(O.prevProp, R);
      let q = M || // If we're making this variant active, we want to always make it active
      A === m && O.isActive && !se && H || // If we removed a higher-priority variant (i is in reverse order)
      T > N && H, z = !1;
      const Y = Array.isArray(R) ? R : [R];
      let ee = Y.reduce(u(A), {});
      X === !1 && (ee = {});
      const { prevResolvedValues: K = {} } = O, oe = {
        ...K,
        ...ee
      }, ne = (V) => {
        q = !0, S.has(V) && (z = !0, S.delete(V)), O.needsAnimating[V] = !0;
        const G = t.getValue(V);
        G && (G.liveStyle = !1);
      };
      for (const V in oe) {
        const G = ee[V], ce = K[V];
        if (j.hasOwnProperty(V))
          continue;
        let _ = !1;
        ph(G) && ph(ce) ? _ = !TS(G, ce) : _ = G !== ce, _ ? G != null ? ne(V) : S.add(V) : G !== void 0 && S.has(V) ? ne(V) : O.protectedKeys[V] = !0;
      }
      O.prevProp = R, O.prevResolvedValues = ee, O.isActive && (j = { ...j, ...ee }), (s || o) && t.blockInitialAnimation && (q = !1);
      const k = se && M;
      q && (!k || z) && w.push(...Y.map((V) => {
        const G = { type: A };
        if (typeof V == "string" && (s || o) && !k && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ce } = t, _ = Qr(ce, V);
          if (ce.enteringChildren && _) {
            const { delayChildren: te } = _.transition || {};
            G.delay = eS(ce.enteringChildren, t, te);
          }
        }
        return {
          animation: V,
          options: G
        };
      }));
    }
    if (S.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const A = Qr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        A && A.transition && (T.transition = A.transition);
      }
      S.forEach((A) => {
        const O = t.getBaseTarget(A), R = t.getValue(A);
        R && (R.liveStyle = !0), T[A] = O ?? null;
      }), w.push({ animation: T });
    }
    let C = !!w.length;
    return s && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (C = !1), s = !1, o = !1, C ? a(w) : Promise.resolve();
  }
  function g(m, b) {
    if (i[m].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(m, b)), i[m].isActive = b;
    const v = p(m);
    for (const w in i)
      i[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: p,
    setActive: g,
    setAnimateFunction: f,
    getState: () => i,
    reset: () => {
      i = Sb(), o = !0;
    }
  };
}
function mz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !TS(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Sb() {
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
function wb(t, a, i, s = { passive: !0 }) {
  return t.addEventListener(a, i, s), () => t.removeEventListener(a, i);
}
function pz(t) {
  return on(t) ? t.get() : t;
}
const fm = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function jb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function vz(...t) {
  return (a) => {
    let i = !1;
    const s = t.map((o) => {
      const u = jb(o, a);
      return !i && typeof u == "function" && (i = !0), u;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const u = s[o];
          typeof u == "function" ? u() : jb(t[o], null);
        }
      };
  };
}
function gz(...t) {
  return y.useCallback(vz(...t), t);
}
class yz extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (mc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = mc(s) && s.offsetWidth || 0, u = mc(s) && s.offsetHeight || 0, f = getComputedStyle(i), p = this.props.sizeRef.current;
      p.height = parseFloat(f.height), p.width = parseFloat(f.width), p.top = i.offsetTop, p.left = i.offsetLeft, p.right = o - p.width - p.left, p.bottom = u - p.height - p.top;
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
function bz({ children: t, isPresent: a, anchorX: i, anchorY: s, root: o, pop: u }) {
  const f = y.useId(), p = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: m } = y.useContext(fm), b = t.props?.ref ?? t?.ref, v = gz(p, b);
  return y.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: C, bottom: T } = g.current;
    if (a || u === !1 || !p.current || !w || !S)
      return;
    const A = i === "left" ? `left: ${N}` : `right: ${C}`, O = s === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    p.current.dataset.motionPopId = f;
    const R = document.createElement("style");
    m && (R.nonce = m);
    const H = o ?? document.head;
    return H.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${A}px !important;
            ${O}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), H.contains(R) && H.removeChild(R);
    };
  }, [a]), c.jsx(yz, { isPresent: a, childRef: p, sizeRef: g, pop: u, children: u === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const xz = ({ children: t, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: u, mode: f, anchorX: p, anchorY: g, root: m }) => {
  const b = Kh(Sz), v = y.useId();
  let w = !0, S = y.useMemo(() => (w = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const N of b.values())
        if (!N)
          return;
      s && s();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [i, b, s]);
  return u && w && (S = { ...S }), y.useMemo(() => {
    b.forEach((j, N) => b.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && s && s();
  }, [i]), t = c.jsx(bz, { pop: f === "popLayout", isPresent: i, anchorX: p, anchorY: g, root: m, children: t }), c.jsx(qc.Provider, { value: S, children: t });
};
function Sz() {
  return /* @__PURE__ */ new Map();
}
function wz(t = !0) {
  const a = y.useContext(qc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: s, register: o } = a, u = y.useId();
  y.useEffect(() => {
    if (t)
      return o(u);
  }, [t]);
  const f = y.useCallback(() => t && s && s(u), [u, s, t]);
  return !i && s ? [!1, f] : [!0];
}
const Wo = (t) => t.key || "";
function Eb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const CS = ({ children: t, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: p = "left", anchorY: g = "top", root: m }) => {
  const [b, v] = wz(f), w = y.useMemo(() => Eb(t), [t]), S = f && !b ? [] : w.map(Wo), j = y.useRef(!0), N = y.useRef(w), C = Kh(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [A, O] = y.useState(w), [R, H] = y.useState(w);
  v1(() => {
    j.current = !1, N.current = w;
    for (let M = 0; M < R.length; M++) {
      const q = Wo(R[M]);
      S.includes(q) ? (C.delete(q), T.current.delete(q)) : C.get(q) !== !0 && C.set(q, !1);
    }
  }, [R, S.length, S.join("-")]);
  const X = [];
  if (w !== A) {
    let M = [...w];
    for (let q = 0; q < R.length; q++) {
      const z = R[q], Y = Wo(z);
      S.includes(Y) || (M.splice(q, 0, z), X.push(z));
    }
    return u === "wait" && X.length && (M = X), H(Eb(M)), O(w), null;
  }
  const { forceRender: se } = y.useContext(p1);
  return c.jsx(c.Fragment, { children: R.map((M) => {
    const q = Wo(M), z = f && !b ? !1 : w === R || S.includes(q), Y = () => {
      if (T.current.has(q))
        return;
      if (C.has(q))
        T.current.add(q), C.set(q, !0);
      else
        return;
      let ee = !0;
      C.forEach((K) => {
        K || (ee = !1);
      }), ee && (se?.(), H(N.current), f && v?.(), s && s());
    };
    return c.jsx(xz, { isPresent: z, initial: !j.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: m, onExitComplete: z ? void 0 : Y, anchorX: p, anchorY: g, children: M }, q);
  }) });
}, hm = y.createContext({ strict: !1 }), Nb = {
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
let Tb = !1;
function jz() {
  if (Tb)
    return;
  const t = {};
  for (const a in Nb)
    t[a] = {
      isEnabled: (i) => Nb[a].some((s) => !!i[s])
    };
  gS(t), Tb = !0;
}
function RS() {
  return jz(), Y5();
}
function bh(t) {
  const a = RS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  gS(a);
}
function mm({ children: t, features: a, strict: i = !1 }) {
  const [, s] = y.useState(!Uf(a)), o = y.useRef(void 0);
  if (!Uf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, bh(f);
  }
  return y.useEffect(() => {
    Uf(a) && a().then(({ renderer: u, ...f }) => {
      bh(f), o.current = u, s(!0);
    });
  }, []), c.jsx(hm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function Uf(t) {
  return typeof t == "function";
}
const Ez = /* @__PURE__ */ new Set([
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
function Mc(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Ez.has(t);
}
let _S = (t) => !Mc(t);
function Nz(t) {
  typeof t == "function" && (_S = (a) => a.startsWith("on") ? !Mc(a) : t(a));
}
try {
  Nz(require("@emotion/is-prop-valid").default);
} catch {
}
function Tz(t, a, i) {
  const s = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || on(t[o]) || (_S(o) || i === !0 && Mc(o) || !a && !Mc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (s[o] = t[o]);
  return s;
}
const Pc = /* @__PURE__ */ y.createContext({});
function Cz(t, a) {
  if (Gc(t)) {
    const { initial: i, animate: s } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function Rz(t) {
  const { initial: a, animate: i } = Cz(t, y.useContext(Pc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Cb(a), Cb(i)]);
}
function Cb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const pm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function MS(t, a, i) {
  for (const s in a)
    !on(a[s]) && !xS(s, i) && (t[s] = a[s]);
}
function _z({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = pm();
    return um(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function Mz(t, a) {
  const i = t.style || {}, s = {};
  return MS(s, i, t), Object.assign(s, _z(t, a)), s;
}
function Az(t, a) {
  const i = {}, s = Mz(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const AS = () => ({
  ...pm(),
  attrs: {}
});
function Dz(t, a, i, s) {
  const o = y.useMemo(() => {
    const u = AS();
    return SS(u, a, jS(s), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    MS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const kz = [
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
function vm(t) {
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
      !!(kz.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function zz(t, a, i, { latestValues: s }, o, u = !1, f) {
  const g = (f ?? vm(t) ? Dz : Az)(a, s, o, t), m = Tz(a, typeof t == "string", u), b = t !== y.Fragment ? { ...m, ...g, ref: i } : {}, { children: v } = a, w = y.useMemo(() => on(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: w
  });
}
function Oz({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, s, o) {
  return {
    latestValues: Lz(i, s, o, t),
    renderState: a()
  };
}
function Lz(t, a, i, s) {
  const o = {}, u = s(t, {});
  for (const w in u)
    o[w] = pz(u[w]);
  let { initial: f, animate: p } = t;
  const g = Gc(t), m = pS(t);
  a && m && !g && t.inherit !== !1 && (f === void 0 && (f = a.initial), p === void 0 && (p = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? p : f;
  if (v && typeof v != "boolean" && !Yc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = rm(t, w[S]);
      if (j) {
        const { transitionEnd: N, transition: C, ...T } = j;
        for (const A in T) {
          let O = T[A];
          if (Array.isArray(O)) {
            const R = b ? O.length - 1 : 0;
            O = O[R];
          }
          O !== null && (o[A] = O);
        }
        for (const A in N)
          o[A] = N[A];
      }
    }
  }
  return o;
}
const DS = (t) => (a, i) => {
  const s = y.useContext(Pc), o = y.useContext(qc), u = () => Oz(t, a, s, o);
  return i ? u() : Kh(u);
}, Uz = /* @__PURE__ */ DS({
  scrapeMotionValuesFromProps: dm,
  createRenderState: pm
}), $z = /* @__PURE__ */ DS({
  scrapeMotionValuesFromProps: ES,
  createRenderState: AS
}), Bz = Symbol.for("motionComponentSymbol");
function Vz(t, a, i) {
  const s = y.useRef(i);
  y.useInsertionEffect(() => {
    s.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((u) => {
    u && t.onMount?.(u);
    const f = s.current;
    if (typeof f == "function")
      if (u) {
        const p = f(u);
        typeof p == "function" && (o.current = p);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const Hz = y.createContext({});
function qz(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Iz(t, a, i, s, o, u) {
  const { visualElement: f } = y.useContext(Pc), p = y.useContext(hm), g = y.useContext(qc), m = y.useContext(fm), b = m.reducedMotion, v = m.skipAnimations, w = y.useRef(null), S = y.useRef(!1);
  s = s || p.renderer, !w.current && s && (w.current = s(t, {
    visualState: a,
    parent: f,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = y.useContext(Hz);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && Fz(w.current, i, o, N);
  const C = y.useRef(!1);
  y.useInsertionEffect(() => {
    j && C.current && j.update(i, g);
  });
  const T = i[iS], A = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return v1(() => {
    S.current = !0, j && (C.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), A.current && j.animationState && j.animationState.animateChanges());
  }), y.useEffect(() => {
    j && (!A.current && j.animationState && j.animationState.animateChanges(), A.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), A.current = !1), j.enteringChildren = void 0);
  }), j;
}
function Fz(t, a, i, s) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: p, layoutScroll: g, layoutRoot: m, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : kS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || p && qz(p),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: s,
    crossfade: v,
    layoutScroll: g,
    layoutRoot: m,
    layoutAnchor: b
  });
}
function kS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : kS(t.parent);
}
function $f(t, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && bh(s);
  const u = i ? i === "svg" : vm(t), f = u ? $z : Uz;
  function p(m, b) {
    let v;
    const w = {
      ...y.useContext(fm),
      ...m,
      layoutId: Yz(m)
    }, { isStatic: S } = w, j = Rz(m), N = f(m, S);
    if (!S && typeof window < "u") {
      Gz();
      const C = Pz(w);
      v = C.MeasureLayout, j.visualElement = Iz(t, N, w, o, C.ProjectionNode, u);
    }
    return c.jsxs(Pc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, zz(t, m, Vz(N, j.visualElement, b), N, S, a, u)] });
  }
  p.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(p);
  return g[Bz] = t, g;
}
function Yz({ layoutId: t }) {
  const a = y.useContext(p1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function Gz(t, a) {
  y.useContext(hm).strict;
}
function Pz(t) {
  const a = RS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(t) || s?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Kz(t, a) {
  if (typeof Proxy > "u")
    return $f;
  const i = /* @__PURE__ */ new Map(), s = (u, f) => $f(u, f, t, a), o = (u, f) => s(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? s : (i.has(f) || i.set(f, $f(f, void 0, t, a)), i.get(f))
  });
}
const gm = /* @__PURE__ */ Kz(), Xz = (t, a) => a.isSVG ?? vm(t) ? new oz(a) : new nz(a, {
  allowProjection: t !== y.Fragment
});
class Qz extends ss {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = hz(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Yc(a) && (this.unmountControls = a.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: a } = this.node.getProps(), { animate: i } = this.node.prevProps || {};
    a !== i && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let Zz = 0;
class Jz extends ss {
  constructor() {
    super(...arguments), this.id = Zz++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === s)
      return;
    if (a && s === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: f } = this.node.getProps();
        if (typeof u == "string") {
          const p = Qr(this.node, u, f);
          if (p) {
            const { transition: g, transitionEnd: m, ...b } = p;
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
    i && !a && o.then(() => {
      this.isExitComplete = !0, i(this.id);
    });
  }
  mount() {
    const { register: a, onExitComplete: i } = this.node.presenceContext || {};
    i && i(this.id), a && (this.unmount = a(this.id));
  }
  unmount() {
  }
}
const Wz = {
  animation: {
    Feature: Qz
  },
  exit: {
    Feature: Jz
  }
};
function zS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Rb(t, a, i) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, u = s[o];
  u && Xn.postRender(() => u(a, zS(a)));
}
class eO extends ss {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = z5(a, (i, s) => (Rb(this.node, s, "Start"), (o) => Rb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class tO extends ss {
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
    this.unmount = Ic(wb(this.node.current, "focus", () => this.onFocus()), wb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function _b(t, a, i) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), u = s[o];
  u && Xn.postRender(() => u(a, zS(a)));
}
class nO extends ss {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = B5(a, (o, u) => (_b(this.node, u, "Start"), (f, { success: p }) => _b(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const xh = /* @__PURE__ */ new WeakMap(), Bf = /* @__PURE__ */ new WeakMap(), aO = (t) => {
  const a = xh.get(t.target);
  a && a(t);
}, rO = (t) => {
  t.forEach(aO);
};
function iO({ root: t, ...a }) {
  const i = t || document;
  Bf.has(i) || Bf.set(i, {});
  const s = Bf.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(rO, { root: t, ...a })), s[o];
}
function sO(t, a, i) {
  const s = iO(a);
  return xh.set(t, i), s.observe(t), () => {
    xh.delete(t), s.unobserve(t);
  };
}
const lO = {
  some: 0,
  all: 1
};
class oO extends ss {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: u } = a, f = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : lO[o]
    }, p = (g) => {
      const { isIntersecting: m } = g;
      if (this.isInView === m || (this.isInView = m, u && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = m ? b : v;
      w && w(g);
    };
    this.stopObserver = sO(this.node.current, f, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(cO(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function cO({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const uO = {
  inView: {
    Feature: oO
  },
  tap: {
    Feature: nO
  },
  focus: {
    Feature: tO
  },
  hover: {
    Feature: eO
  }
}, ym = {
  renderer: Xz,
  ...Wz,
  ...uO
};
function dO() {
  !cm.current && vS();
  const [t] = y.useState(Rc.current);
  return t;
}
const Sh = "emotion-tts:trigger-generate", wh = "emotion-tts:run-state";
function fO() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Sh));
}
function hO(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(wh, { detail: t }));
}
function mO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Sh, t), () => window.removeEventListener(Sh, t));
}
function OS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const s = i.detail;
    s && t(s);
  };
  return window.addEventListener(wh, a), () => window.removeEventListener(wh, a);
}
var pO = "wksjad0", vO = "wksjad1", gO = "wksjad2", yO = "wksjad3", bO = "wksjad4", xO = "wksjad5", SO = "wksjad6", wO = "wksjad7", jO = "wksjad8", EO = "wksjad9", NO = "wksjada", TO = "wksjadb", CO = "wksjadc", RO = "wksjadd", _O = "wksjade", MO = "wksjadf", AO = "wksjadg", Vf = "wksjadh", DO = "wksjadi", kO = "wksjadj", zO = "wksjadk", OO = "wksjadl", LO = "wksjadm", UO = "wksjadn";
const jh = 5, $O = 5e-3;
function LS(t, a = "") {
  return `${ga}/deployments/${t}/artifacts${a}`;
}
function BO(t) {
  const [a, i] = y.useState([]), [s, o] = y.useState(!1), [u, f] = y.useState(null), [p, g] = y.useState(0), m = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((w) => w + 1), []);
  return y.useEffect(() => {
    m.current?.abort();
    const w = new AbortController();
    return m.current = w, o(!0), f(null), fetch(`${LS(t)}?limit=${jh}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || i(j.artifacts.slice(0, jh));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, p]), y.useEffect(() => OS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: s, error: u, refetch: v, tick: p };
}
function VO(t, a) {
  const [i, s] = y.useState(() => /* @__PURE__ */ new Map());
  return y.useEffect(() => {
    let o = !1;
    return Xi(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const p of u)
        f.set(p.voiceAssetId, p.displayName);
      s(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), i;
}
function HO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: i, loading: s, error: o, refetch: u, tick: f } = BO(t), p = VO(t, f), [g, m] = y.useState(null), b = dO(), v = y.useCallback(() => {
    m(null), u();
  }, [u]), w = i;
  return !s && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: pO, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: vO, children: [
      /* @__PURE__ */ c.jsx("span", { className: gO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: yO, children: [
        /* @__PURE__ */ c.jsx("span", { className: bO, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: xO, children: [
          "last ",
          jh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: SO,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: UO, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(mm, { features: ym, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: wO, children: /* @__PURE__ */ c.jsx(CS, { initial: !1, children: w.map((S) => {
      const j = g === S.utteranceId, N = LS(
        t,
        `/${S.utteranceId}/download`
      ), C = S.voiceAssetId ? p.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        gm.li,
        {
          className: jO,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: EO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: NO,
                  onClick: () => m(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: TO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: CO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: RO, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: _O, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: MO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: AO, children: IO(S.finishedAt) }),
                  C && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: DO, children: C })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: kO, children: qO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > $O && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Vf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: zO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: OO,
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
                className: LO,
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
function qO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), s = a % 60;
  return i > 0 ? `${i}:${s.toString().padStart(2, "0")}` : `${s}s`;
}
function IO(t) {
  if (!t) return "—";
  const i = Math.floor(Date.now() / 1e3) - t;
  return i < 0 ? "just now" : i < 60 ? `${i}s ago` : i < 3600 ? `${Math.floor(i / 60)}m ago` : i < 86400 ? `${Math.floor(i / 3600)}h ago` : i < 604800 ? `${Math.floor(i / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function FO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function US() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function YO() {
  if (typeof window > "u") return;
  const t = US();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function $S(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const s = US(), o = () => {
      const f = s.reduce((p, g) => {
        const m = FO(g);
        return m > p ? m : p;
      }, 0);
      i(f > t);
    };
    o();
    const u = { passive: !0 };
    for (const f of s)
      f.addEventListener("scroll", o, u);
    return () => {
      for (const f of s)
        f.removeEventListener("scroll", o, u);
    };
  }, [t]), a;
}
const BS = 360;
var GO = "_1s59p180", PO = "_1s59p181", KO = "_1s59p182", XO = "_1s59p183", QO = "_1s59p184", ZO = "_1s59p185", JO = "_1s59p186", WO = "_1s59p188", e4 = "_1s59p189", Mb = "_1s59p18a", t4 = "_1s59p18c", n4 = "_1s59p18d", a4 = "_1s59p18e", r4 = "_1s59p18f", i4 = "_1s59p18g", s4 = "_1s59p18i";
function l4(t) {
  const a = es(), [i, s] = y.useState("idle"), [o, u] = y.useState(null), [f, p] = y.useState(/* @__PURE__ */ new Map()), [g, m] = y.useState(null), [b, v] = y.useState(null), w = y.useRef(null);
  y.useEffect(() => () => {
    w.current?.();
  }, []), y.useEffect(() => {
    hO({ busy: i === "starting" || i === "running" });
  }, [i]);
  const S = y.useCallback(
    (G) => {
      const ce = G.status;
      (ce === "completed" || ce === "partial") && tn.success(
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
  ), j = y.useCallback(async () => {
    s("starting"), m(null), p(/* @__PURE__ */ new Map()), v(null);
    try {
      const G = await qT(t.deploymentId, t.createPayload);
      u(G.runId), s("running"), w.current?.(), w.current = qy(
        t.deploymentId,
        G.runId,
        (ce) => Ab(
          ce,
          p,
          s,
          (_) => {
            v(_), S(_);
          },
          t.deploymentId,
          G.runId
        ),
        () => s("error")
      );
    } catch (G) {
      s("error"), m(Hf(G));
    }
  }, [t.deploymentId, t.createPayload, S]);
  y.useEffect(() => mO(() => {
    (i === "idle" || i === "terminal" || i === "error") && j();
  }), [i, j]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await IT(t.deploymentId, o);
      } catch (G) {
        m(Hf(G));
      }
  }, [t.deploymentId, o]), C = Array.from(f.values()).sort((G, ce) => G.globalIndex - ce.globalIndex), T = i === "starting" || i === "running", A = b?.status === "partial", O = C.filter((G) => G.status === "running").length, R = C.filter((G) => G.status === "completed").length, H = i === "starting" || i === "running" || C.length > 0, X = C.filter((G) => G.status === "failed"), se = (() => {
    if (i !== "terminal" || X.length === 0) return null;
    const G = /* @__PURE__ */ new Map();
    for (const re of X) {
      const F = re.failureCategory ?? "unknown";
      G.set(F, (G.get(F) ?? 0) + 1);
    }
    let ce = "unknown", _ = 0;
    for (const [re, F] of G)
      F > _ && (ce = re, _ = F);
    const te = C.length;
    return { category: ce, count: _, total: te };
  })(), M = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, q = "Check the run detail page for the per-segment error log.", z = g?.toLowerCase().includes("unmapped") ?? !1, Y = t.diagnostics ?? [], ee = Y.find((G) => G.status === "fail"), K = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", oe = !t.canGenerate || T || !!ee, ne = i === "starting" || i === "running", k = ne ? "running" : oe ? "blocked" : "idle", V = !$S(BS) || ne;
  return /* @__PURE__ */ c.jsxs("div", { className: GO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: PO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: XO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: QO, children: [
          /* @__PURE__ */ c.jsx("span", { className: KO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          H && /* @__PURE__ */ c.jsxs("span", { className: i4, children: [
            /* @__PURE__ */ c.jsx("span", { className: s4, "aria-hidden": "true" }),
            O > 0 ? `${O} in flight` : `${R} done`
          ] })
        ] }),
        Y.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: ZO, "aria-label": "Pre-flight checks", children: Y.map((G) => /* @__PURE__ */ c.jsxs("li", { className: JO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: WO,
              "data-status": G.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: e4, children: G.label }),
          G.detail && /* @__PURE__ */ c.jsx("span", { className: Mb, children: G.detail })
        ] }, G.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Mb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: t4, "data-state": k, children: [
        V ? /* @__PURE__ */ c.jsxs(
          qe,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: oe,
            loading: ne,
            children: [
              !ne && /* @__PURE__ */ c.jsx("span", { className: n4, "aria-hidden": "true", children: "▶" }),
              K
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: a4, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: r4, children: "↑" })
        ] }),
        T && /* @__PURE__ */ c.jsx(
          qe,
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
    g && /* @__PURE__ */ c.jsxs(
      kn,
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
          /* @__PURE__ */ c.jsx("span", { children: g }),
          z && /* @__PURE__ */ c.jsx(
            qe,
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
    se && /* @__PURE__ */ c.jsxs(kn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        se.count,
        " of ",
        se.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: se.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: M[se.category] ?? q })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Wx.secondary} ${e1.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    A && b && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        qe,
        {
          variant: "secondary",
          disabled: !!ee,
          onClick: async () => {
            try {
              const G = await Qx(t.deploymentId, b.runId);
              u(G.runId), p(/* @__PURE__ */ new Map()), v(null), s("running"), w.current?.(), w.current = qy(
                t.deploymentId,
                G.runId,
                (ce) => Ab(ce, p, s, v, t.deploymentId, G.runId),
                () => s("error")
              );
            } catch (G) {
              m(Hf(G)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: MR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: C.map((G) => /* @__PURE__ */ c.jsxs("tr", { className: AR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: G.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Zr, { tone: o4(G.status), children: G.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: G.durationMs ? `${G.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: G.failureCategory ?? "" })
      ] }, G.globalIndex)) })
    ] })
  ] });
}
async function Ab(t, a, i, s, o, u) {
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
      i("terminal");
      try {
        const f = await Ih(o, u);
        s(f);
      } catch {
      }
      return;
  }
}
function o4(t) {
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
  return t instanceof ts || t instanceof Error ? t.message : "unknown error";
}
var c4 = "xq3iim0", u4 = "xq3iim1", d4 = "xq3iim2", f4 = "xq3iim3", h4 = "xq3iim4", m4 = "xq3iim5", p4 = "xq3iim6", v4 = "xq3iim7", g4 = "xq3iim8", y4 = "xq3iim9", b4 = "xq3iima", x4 = "xq3iimb", S4 = "xq3iimc", w4 = "xq3iimd", j4 = "xq3iime", E4 = "xq3iimf", N4 = "xq3iimg", T4 = "xq3iimh", C4 = "xq3iimi", R4 = "xq3iimj", _4 = "xq3iimk", Db = "xq3iiml";
function M4({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = y.useState([]), [u, f] = y.useState(a), [p, g] = y.useState(!0), [m, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), N = y.useRef(null), C = y.useRef(null);
  y.useEffect(() => {
    let R = !1;
    return g(!0), Xi(t).then(({ voiceAssets: H }) => {
      R || o(H);
    }).catch((H) => {
      R || w(H instanceof Error ? H.message : "Failed to load voices");
    }).finally(() => {
      R || g(!1);
    }), () => {
      R = !0;
    };
  }, [t]), y.useEffect(() => {
    if (!S) return;
    const R = (X) => {
      N.current && (X.target instanceof Node && N.current.contains(X.target) || j(!1));
    }, H = (X) => {
      X.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", H), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", H);
    };
  }, [S]);
  const T = y.useCallback(
    async (R) => {
      b(!0), w(null);
      const H = u, X = R === u ? null : R;
      f(X), j(!1);
      try {
        await $T(t, X), i?.(X);
      } catch (se) {
        f(H), w(se instanceof Error ? se.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, i, u]
  ), A = y.useMemo(
    () => s.find((R) => R.voiceAssetId === u) ?? null,
    [s, u]
  ), O = y.useMemo(() => {
    const R = [], H = [];
    for (const X of s)
      X.kind === "speaker" || X.kind === "mixed" ? R.push(X) : H.push(X);
    return { uploaded: R, other: H };
  }, [s]);
  return p ? /* @__PURE__ */ c.jsx("span", { className: Db, children: "Loading voices…" }) : s.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Db, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: c4, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: C,
        type: "button",
        className: `${u4} ${S ? d4 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: m,
        onClick: () => j((R) => !R),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: f4, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: h4, children: [
            /* @__PURE__ */ c.jsx("span", { className: m4, children: A ? A.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: p4, children: A ? VS(A) : `${s.length} voice${s.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: v4, "aria-hidden": "true", children: A4.map((R, H) => /* @__PURE__ */ c.jsx("i", { style: { height: `${R * 100}%` } }, H)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${g4}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: y4,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: b4, children: /* @__PURE__ */ c.jsx("span", { className: x4, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: S4, role: "alert", children: v }),
          O.uploaded.length > 0 && /* @__PURE__ */ c.jsx(kb, { label: "Uploaded", children: O.uploaded.map((R) => /* @__PURE__ */ c.jsx(
            zb,
            {
              voice: R,
              selected: u === R.voiceAssetId,
              onSelect: () => void T(R.voiceAssetId)
            },
            R.voiceAssetId
          )) }),
          O.other.length > 0 && /* @__PURE__ */ c.jsx(kb, { label: "Other", children: O.other.map((R) => /* @__PURE__ */ c.jsx(
            zb,
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
function kb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: w4, children: [
    /* @__PURE__ */ c.jsx("div", { className: j4, children: t }),
    a
  ] });
}
function zb({ voice: t, selected: a, onSelect: i }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${E4} ${a ? N4 : ""}`,
      onClick: i,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: T4, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: C4, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: R4, children: VS(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${_4}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const A4 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function VS(t) {
  const a = [];
  return t.durationMs != null && a.push(D4(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function D4(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
const Ob = [
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
function k4(t) {
  const a = es(), i = y.useRef(null), { tokens: s, attributions: o, unresolved: u, predictedFilenames: f, characterColor: p } = y.useMemo(
    () => O4(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (b) => {
    const v = i.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, m = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: m ? NR : wR, children: [
      !m && /* @__PURE__ */ c.jsx("div", { ref: i, className: jR, "aria-hidden": "true", children: s.map((b, v) => z4(b, v, p)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: m ? TR : ER,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: m ? void 0 : g,
          placeholder: m ? "Type or paste plain text. The selected voice will read every word." : `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ c.jsxs(kn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      u.map((b) => /* @__PURE__ */ c.jsxs(
        qe,
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
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: l0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: l0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function z4(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: s0, children: t.raw }),
      `
`
    ] }, a);
  const s = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? i0 : `${i0} ${CR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: RR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: s0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function O4(t, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), g = [], m = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let w = 0;
  return v.forEach((S, j) => {
    const N = S.trim();
    if (!N) {
      o.push({ kind: "blank", raw: S });
      return;
    }
    const C = j + 1, T = N.match(s);
    let A = "Narrator", O = N, R, H = !1;
    if (T?.groups) {
      H = !0;
      const q = (T.groups.body ?? "").trim(), z = (T.groups.rest ?? "").trim();
      A = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, O = z;
    }
    w += 1;
    const X = A.toLowerCase(), se = (p.get(X) ?? 0) + 1;
    p.set(X, se);
    const M = A === "Narrator" || i.has(X);
    if (M || f.add(A), A !== "Narrator" && !m.has(X) && (m.set(X, Ob[b % Ob.length] ?? "currentColor"), b += 1), H) {
      const q = { kind: "character", raw: S, character: A, text: O, hasMapping: M };
      R !== void 0 && (q.override = R), o.push(q);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: C, character: A, text: O, hasMapping: M }), g.push(
      `${w.toString().padStart(3, "0")}_${L4(A)}_${se.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: g,
    characterColor: m
  };
}
function L4(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Lb = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], HS = 1e-3;
function U4(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function $4() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function B4(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function qS(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function IS(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function V4(t) {
  const a = [];
  for (let i = 0; i < Lb.length; i += 1) {
    const s = t[i];
    typeof s == "number" && (Math.abs(s) < HS || a.push(`${Lb[i]}=${IS(qS(s))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function H4(t, a) {
  const i = U4(t.character) || "Narrator", s = B4(t.text);
  if (!s) return null;
  const o = [];
  if (t.presetId) {
    const p = a.get(t.presetId);
    if (p) {
      const g = V4(p.vector);
      g && o.push(`emotion_vector:${g}`);
    }
  }
  const u = qS(t.alpha);
  return Math.abs(u - 1) >= HS && o.push(`emotion_alpha:${IS(u)}`), `${o.length > 0 ? `[${i}|${o.join("|")}]` : `[${i}]`} ${s}`;
}
function FS(t, a) {
  const i = /* @__PURE__ */ new Map();
  for (const o of a) i.set(o.presetId, o);
  const s = [];
  for (const o of t) {
    const u = H4(o, i);
    u && s.push(u);
  }
  return s.join(`
`);
}
function Gi() {
  return {
    id: $4(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var q4 = "_1827s3t2", I4 = "_1827s3t3", F4 = "_1827s3t4", Y4 = "_1827s3t5", G4 = "_1827s3t6", P4 = "_1827s3t7", K4 = "_1827s3t8", X4 = "_1827s3t9", Q4 = "_1827s3ta", Z4 = "_1827s3tb", J4 = "_1827s3td _1827s3tc", W4 = "_1827s3te _1827s3tc", eL = "_1827s3tf", tL = "_1827s3tg", nL = "_1827s3th", aL = "_1827s3ti _1827s3tc", rL = "_1827s3tj", iL = "_1827s3tk", sL = "_1827s3tl", lL = "_1827s3tm", oL = "_1827s3tn", cL = "_1827s3to", uL = "_1827s3tp", dL = "_1827s3tq", fL = "_1827s3tr", hL = "_1827s3ts", mL = "_1827s3tt";
function pL({
  rows: t,
  onRowsChange: a,
  presets: i,
  mappingsByLower: s
}) {
  const o = y.useId(), u = y.useId(), f = y.useId(), p = y.useRef(null), g = y.useRef(/* @__PURE__ */ new Map()), m = y.useRef(/* @__PURE__ */ new Map()), b = y.useRef(/* @__PURE__ */ new Map()), [v, w] = y.useState(null), [S, j] = y.useState(!1), N = y.useRef(null), C = y.useRef(null), [T, A] = y.useState(null), [O, R] = y.useState(null), [H, X] = y.useState("");
  y.useEffect(() => {
    v && (v.kind === "addBtn" ? p.current?.focus() : v.kind === "text" && v.rowId ? g.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? m.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && C.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const se = t.filter(($) => $.text.trim().length > 0).length, M = y.useMemo(() => {
    const $ = /* @__PURE__ */ new Map();
    for (const ae of t) {
      const de = ae.character.trim(), pe = de.toLowerCase();
      !pe || pe === "narrator" || s.has(pe) || $.has(pe) || $.set(pe, de);
    }
    return Array.from($.values()).sort((ae, de) => ae.localeCompare(de));
  }, [t, s]), q = M.length, z = y.useRef(q), [Y, ee] = y.useState(0);
  y.useEffect(() => {
    q > z.current && ee(($) => $ + 1), z.current = q;
  }, [q]), y.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const $ = (de) => {
      if (!C.current || !N.current) return;
      const pe = de.target;
      C.current.contains(pe) || N.current.contains(pe) || j(!1);
    }, ae = (de) => {
      de.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", $), document.addEventListener("keydown", ae), () => {
      document.removeEventListener("mousedown", $), document.removeEventListener("keydown", ae);
    };
  }, [S]);
  const K = y.useMemo(() => {
    const $ = /* @__PURE__ */ new Set();
    return s.forEach((ae) => $.add(ae.characterName)), Array.from($).sort((ae, de) => ae.localeCompare(de));
  }, [s]), oe = y.useCallback(
    ($, ae) => {
      a(t.map((de) => de.id === $ ? { ...de, ...ae } : de));
    },
    [t, a]
  ), ne = y.useRef(t);
  y.useEffect(() => {
    ne.current = t;
  }, [t]);
  const k = y.useCallback(
    ($) => {
      const ae = t.findIndex((Le) => Le.id === $);
      if (ae < 0) return;
      const de = t[ae];
      if (!de) return;
      const pe = t.filter((Le) => Le.id !== $);
      a(pe);
      const Me = de.character.trim() || `Line ${ae + 1}`;
      if (tn(`Removed ${Me}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const Le = ne.current;
            if (Le.some((Ue) => Ue.id === de.id)) return;
            const je = [...Le], pt = Math.min(ae, je.length);
            je.splice(pt, 0, de), a(je);
          }
        },
        duration: 5e3
      }), pe.length === 0)
        w({ kind: "addBtn" });
      else {
        const Le = ae < pe.length ? ae : pe.length - 1, je = pe[Le];
        w(je ? { kind: "remove", rowId: je.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), U = y.useCallback(
    ($) => {
      const ae = Gi();
      let de;
      if ($ === null)
        de = [...t, ae];
      else {
        const pe = t.findIndex((Me) => Me.id === $);
        de = pe < 0 ? [...t, ae] : [...t.slice(0, pe + 1), ae, ...t.slice(pe + 1)];
      }
      a(de), w({ kind: "text", rowId: ae.id });
    },
    [t, a]
  ), V = y.useCallback(
    ($, ae) => {
      const de = t.findIndex((Ue) => Ue.id === $);
      if (de < 0) return;
      const pe = de + ae;
      if (pe < 0 || pe >= t.length) return;
      const Me = [...t], Le = Me[de], je = Me[pe];
      if (!Le || !je) return;
      Me[de] = je, Me[pe] = Le, a(Me);
      const pt = Le.character.trim() || `Line ${de + 1}`;
      X(`Moved ${pt} to position ${pe + 1} of ${Me.length}`);
    },
    [t, a]
  ), G = y.useCallback(
    ($, ae) => {
      $.key === "Enter" && !$.shiftKey ? ($.preventDefault(), U(ae)) : $.altKey && $.key === "ArrowUp" ? ($.preventDefault(), V(ae, -1)) : $.altKey && $.key === "ArrowDown" && ($.preventDefault(), V(ae, 1));
    },
    [U, V]
  ), ce = y.useCallback(($, ae) => {
    A(ae), $.dataTransfer.effectAllowed = "move", $.dataTransfer.setData("text/plain", ae);
  }, []), _ = y.useCallback(($, ae) => {
    T && ($.preventDefault(), $.dataTransfer.dropEffect = "move", O !== ae && R(ae));
  }, [T, O]), te = y.useCallback(
    ($, ae) => {
      $.preventDefault();
      const de = T ?? $.dataTransfer.getData("text/plain");
      if (A(null), R(null), !de || de === ae) return;
      const pe = t.findIndex((Ue) => Ue.id === de), Me = t.findIndex((Ue) => Ue.id === ae);
      if (pe < 0 || Me < 0) return;
      const Le = [...t], [je] = Le.splice(pe, 1);
      if (!je) return;
      Le.splice(Me, 0, je), a(Le);
      const pt = je.character.trim() || `Line ${pe + 1}`;
      X(`Moved ${pt} to position ${Me + 1} of ${Le.length}`);
    },
    [t, a, T]
  ), re = y.useCallback(() => {
    A(null), R(null);
  }, []), F = y.useCallback(
    ($) => {
      const ae = t.find((de) => de.character.trim().toLowerCase() === $.toLowerCase());
      ae && w({ kind: "character", rowId: ae.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: q4, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: I4, children: [
      /* @__PURE__ */ c.jsx("span", { className: F4, id: u, children: "02 / Per-character lines" }),
      /* @__PURE__ */ c.jsxs("span", { className: Y4, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: G4, children: se.toString().padStart(2, "0") }),
        " lines",
        q > 0 && /* @__PURE__ */ c.jsxs("span", { className: iL, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: mL,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j(($) => !$),
              children: [
                "⚠ ",
                q,
                " unmapped"
              ]
            },
            Y
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: C,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: sL,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: lL, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: oL, children: M.map(($) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: cL,
                    onClick: () => F($),
                    children: $
                  }
                ) }, $)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: fL, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: P4, children: t.map(($, ae) => {
      const de = $.character.trim() || `line ${ae + 1}`, pe = s.has($.character.trim().toLowerCase()), Me = T === $.id, Le = O === $.id && T !== $.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: K4,
          "data-mapped": pe || void 0,
          "data-dragging": Me || void 0,
          "data-drag-over": Le || void 0,
          onDragOver: (je) => _(je, $.id),
          onDrop: (je) => te(je, $.id),
          onDragEnd: re,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: X4,
                draggable: !0,
                "aria-label": `Drag to reorder ${de}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (je) => ce(je, $.id),
                onKeyDown: (je) => {
                  je.altKey && je.key === "ArrowUp" ? (je.preventDefault(), V($.id, -1)) : je.altKey && je.key === "ArrowDown" && (je.preventDefault(), V($.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Z4, "aria-hidden": "true", children: (ae + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (je) => {
                  je ? b.current.set($.id, je) : b.current.delete($.id);
                },
                type: "text",
                value: $.character,
                onChange: (je) => oe($.id, { character: je.target.value }),
                placeholder: "Character",
                className: J4,
                "aria-label": `Character name for ${de}`,
                list: K.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: $.presetId ?? "",
                onChange: (je) => oe($.id, { presetId: je.target.value === "" ? null : je.target.value }),
                className: W4,
                "aria-label": `Emotion preset for ${de}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  i.map((je) => /* @__PURE__ */ c.jsx("option", { value: je.presetId, children: je.presetName }, je.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: eL, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: $.alpha,
                  onChange: (je) => oe($.id, { alpha: Number.parseFloat(je.target.value) }),
                  className: tL,
                  "aria-label": `Emotion intensity for ${de}`,
                  "aria-valuetext": `${Math.round($.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: nL,
                  "aria-hidden": "true",
                  "data-hot": $.alpha >= 0.85 || void 0,
                  children: (Math.round($.alpha * 100) / 100).toFixed(2)
                }
              )
            ] }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (je) => {
                  je ? g.current.set($.id, je) : g.current.delete($.id);
                },
                type: "text",
                value: $.text,
                onChange: (je) => oe($.id, { text: je.target.value }),
                onKeyDown: (je) => G(je, $.id),
                placeholder: "Line text…",
                className: aL,
                "aria-label": `Line text for ${de}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (je) => {
                  je ? m.current.set($.id, je) : m.current.delete($.id);
                },
                type: "button",
                className: rL,
                "aria-label": `Remove ${de}`,
                title: "Remove this line",
                onClick: () => k($.id),
                children: "✕"
              }
            ),
            ae < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Q4,
                "aria-label": `Insert line after ${de}`,
                title: "Insert line below",
                onClick: () => U($.id),
                tabIndex: -1,
                children: /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "＋" })
              }
            )
          ]
        },
        $.id
      );
    }) }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: p,
        type: "button",
        className: uL,
        onClick: () => U(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: dL, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    K.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: K.map(($) => /* @__PURE__ */ c.jsx("option", { value: $ }, $)) }),
    /* @__PURE__ */ c.jsx("div", { className: hL, role: "status", "aria-live": "polite", "aria-atomic": "true", children: H })
  ] });
}
var vL = "fmg0gf0", gL = "fmg0gf1", Ub = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const Hi = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" }
], yL = Hi;
function bL({
  value: t,
  onChange: a,
  storyDisabled: i = !1
}) {
  const s = y.useRef([]), o = y.useCallback(
    (f, p) => {
      const g = Hi.length;
      let m = f;
      for (let v = 1; v <= g; v += 1) {
        const w = (f + p * v + g) % g, S = Hi[w];
        if (!S) continue;
        if (!(S.id === "story" && i)) {
          m = w;
          break;
        }
      }
      const b = Hi[m];
      b && (a(b.id), s.current[m]?.focus());
    },
    [a, i]
  ), u = y.useCallback(
    (f, p) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(p, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(p, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(Hi.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: vL, role: "radiogroup", "aria-label": "Editor mode", children: Hi.map((f, p) => {
    const g = f.id === t, m = f.id === "story" && i, b = m ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          s.current[p] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": g,
        "aria-disabled": m || void 0,
        tabIndex: g ? 0 : -1,
        title: m ? `${f.description} — coming soon` : f.description,
        className: g ? Ub.active : Ub.idle,
        onClick: () => {
          m || a(f.id);
        },
        onKeyDown: (v) => u(v, p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: gL, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const xL = [
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
function SL(t, a) {
  const i = t.ownerDocument;
  if (!i) return { top: 0, left: 0, height: 0 };
  const s = i.createElement("div"), o = i.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = s.style, f = o;
  for (const N of xL) {
    const C = f[N];
    typeof C == "string" && (u[N] = C);
  }
  s.style.position = "absolute", s.style.visibility = "hidden", s.style.overflow = "hidden", s.style.top = "0", s.style.left = "-9999px", s.style.whiteSpace = "pre-wrap", s.style.wordWrap = "break-word";
  const p = t.value.slice(0, a), g = i.createTextNode(p.replace(/ /g, " ")), m = i.createElement("span");
  m.textContent = t.value.slice(a, a + 1) || ".", s.appendChild(g), s.appendChild(m), i.body.appendChild(s);
  const b = m.getBoundingClientRect(), v = s.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return i.body.removeChild(s), { top: w, left: S, height: j };
}
const YS = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]);
function GS(t) {
  return t === "_" || t === "-" ? !0 : /\p{L}|\p{N}/u.test(t);
}
function wL(t, a) {
  if (a >= t.length) return 0;
  const i = t.charCodeAt(a);
  if (i >= 55296 && i <= 56319 && a + 1 < t.length) {
    const s = t.charCodeAt(a + 1);
    if (s >= 56320 && s <= 57343) return 2;
  }
  return 1;
}
function Ac(t, a) {
  const i = wL(t, a);
  return i === 0 ? "" : t.slice(a, a + i);
}
function Dc(t) {
  const a = [];
  let i = 0, s = 0;
  const o = t.length, u = (f) => {
    f > i && a.push({
      kind: "text",
      start: i,
      end: f,
      value: t.slice(i, f)
    });
  };
  for (; s < o; ) {
    const f = t[s], p = f === "@" || f === "/", g = s === 0 ? "" : Ac(t, vc(t, s)), m = s === 0 || g !== "" && YS.has(g);
    if (p && m) {
      let b = s + 1, v = "";
      for (; b < o; ) {
        const w = Ac(t, b);
        if (w && GS(w))
          v += w, b += w.length;
        else
          break;
      }
      if (v) {
        u(s), a.push({
          kind: f === "@" ? "character" : "emotion",
          start: s,
          end: b,
          value: v
        }), i = b, s = b;
        continue;
      }
    }
    s += 1;
  }
  return u(o), a;
}
function vc(t, a) {
  if (a <= 0) return -1;
  const i = t.charCodeAt(a - 1);
  if (i >= 56320 && i <= 57343 && a >= 2) {
    const s = t.charCodeAt(a - 2);
    if (s >= 55296 && s <= 56319) return a - 2;
  }
  return a - 1;
}
function jL(t, a) {
  if (a <= 0 || a > t.length) return null;
  let i = vc(t, a), s = "";
  for (; i >= 0; ) {
    const o = Ac(t, i);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = i === 0 ? "" : Ac(t, vc(t, i));
      return i === 0 || f !== "" && YS.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: i,
        query: s
      } : null;
    }
    if (!GS(o)) return null;
    s = o + s;
    const u = vc(t, i);
    if (u < 0) break;
    i = u;
  }
  return null;
}
var EL = "_1d2ofoy1", NL = "_1d2ofoy2", TL = "_1d2ofoy4 _1d2ofoy3", CL = "_1d2ofoy5 _1d2ofoy3", RL = "_1d2ofoy6", _L = "_1d2ofoy7", ML = "_1d2ofoy8", AL = "_1d2ofoya", DL = "_1d2ofoyb", kL = "_1d2ofoyc", zL = "_1d2ofoyd", OL = "_1d2ofoye", LL = "_1d2ofoyf", ec = "_1d2ofoyg", UL = "_1d2ofoyh";
const $L = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function BL({
  value: t,
  onChange: a,
  characters: i,
  presets: s,
  mappingsByLower: o
}) {
  const u = y.useRef(null), f = y.useRef(null), p = y.useId(), g = `${p}-opt`, [m, b] = y.useState(null), v = y.useMemo(() => Dc(t), [t]), w = y.useMemo(() => {
    const z = /* @__PURE__ */ new Map();
    o.forEach((Y) => z.set(Y.characterName.toLowerCase(), Y.characterName));
    for (const Y of i) {
      const ee = Y.toLowerCase();
      z.has(ee) || z.set(ee, Y);
    }
    return Array.from(z.values()).sort((Y, ee) => Y.localeCompare(ee));
  }, [i, o]), S = y.useMemo(() => {
    if (!m) return [];
    const z = m.query.toLowerCase();
    if (m.kind === "character")
      return w.filter((K) => K.toLowerCase().includes(z)).slice(0, 8).map((K) => {
        const oe = o.get(K.toLowerCase());
        return { value: K, hint: oe ? "mapped" : "unmapped" };
      });
    const Y = /* @__PURE__ */ new Set(), ee = [];
    for (const K of s) {
      const oe = K.presetName.toLowerCase();
      if (oe.includes(z) && !Y.has(oe) && (Y.add(oe), ee.push({ value: K.presetName, hint: "vector" }), ee.length >= 8))
        break;
    }
    return ee;
  }, [m, w, o, s]), j = y.useCallback((z, Y, ee) => {
    if (Y < 0) return null;
    const K = jL(z, Y);
    if (!K) return null;
    const oe = u.current, ne = oe ? SL(oe, Y) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: K.start,
      query: K.query,
      kind: K.kind,
      selected: ee && ee.kind === K.kind ? ee.selected : 0,
      caretTop: ne.top,
      caretLeft: ne.left,
      caretHeight: ne.height
    };
  }, []), N = y.useCallback(() => {
    const z = u.current;
    if (!z) {
      b(null);
      return;
    }
    const Y = z.selectionStart;
    if (Y !== z.selectionEnd) {
      b(null);
      return;
    }
    b((ee) => j(t, Y, ee));
  }, [t, j]);
  y.useEffect(() => {
    if (m && m.selected >= S.length) {
      const z = S.length === 0 ? 0 : S.length - 1;
      b({ ...m, selected: z });
    }
  }, [m, S]), y.useLayoutEffect(() => {
    const z = f.current, Y = u.current;
    !z || !Y || (z.scrollTop = Y.scrollTop, z.scrollLeft = Y.scrollLeft);
  }), y.useEffect(() => {
    const z = u.current, Y = f.current;
    if (!z || !Y) return;
    const ee = () => {
      Y.scrollTop = z.scrollTop, Y.scrollLeft = z.scrollLeft;
    };
    return z.addEventListener("scroll", ee, { passive: !0 }), () => z.removeEventListener("scroll", ee);
  }, []);
  const C = y.useCallback(
    (z) => {
      const Y = z.target.value;
      a(Y);
      const ee = z.target;
      requestAnimationFrame(() => {
        const K = ee.selectionStart;
        if (K !== ee.selectionEnd) {
          b(null);
          return;
        }
        b((oe) => j(Y, K, oe));
      });
    },
    [a, j]
  ), T = y.useCallback(() => {
    N();
  }, [N]), A = y.useCallback(
    (z, Y) => {
      if (!m) return;
      const ee = m.kind === "character" ? "@" : "/", K = m.triggerStart + 1 + m.query.length, oe = t.slice(0, m.triggerStart), ne = t.slice(K), k = `${ee}${z} `, U = `${oe}${k}${ne}`;
      a(U);
      const V = oe.length + k.length;
      b(null), Y.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(V, V));
      });
    },
    [m, t, a]
  ), O = y.useCallback(
    (z) => {
      if (m) {
        if (z.key === "Escape") {
          z.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (z.key === "ArrowDown")
            z.preventDefault(), b((Y) => Y && { ...Y, selected: (Y.selected + 1) % S.length });
          else if (z.key === "ArrowUp")
            z.preventDefault(), b(
              (Y) => Y && { ...Y, selected: (Y.selected - 1 + S.length) % S.length }
            );
          else if (z.key === "Enter") {
            const Y = S[m.selected];
            Y && (z.preventDefault(), A(Y.value, { advanceFocus: !1 }));
          } else if (z.key === "Tab") {
            const Y = S[m.selected];
            Y && A(Y.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [m, S, A]
  ), R = y.useRef(null), [H, X] = y.useState(null);
  y.useLayoutEffect(() => {
    if (!m) {
      X(null);
      return;
    }
    const z = R.current, Y = u.current;
    if (!z || !Y) return;
    const ee = z.offsetWidth, K = Y.clientWidth, oe = Math.max(0, K - ee - 8), ne = Math.max(0, m.caretLeft);
    X(Math.min(ne, oe));
  }, [m]);
  const se = m?.kind === "character" ? "Character" : "Emotion preset", M = m && S.length > 0 ? `${g}-${m.selected}` : void 0, q = !m || S.length > 0 ? null : m.kind === "emotion" ? s.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${m.query}". Type a different name or pick from Mappings.` : m.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${m.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: EL, children: [
    /* @__PURE__ */ c.jsxs("div", { className: NL, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: TL, "aria-hidden": "true", children: VL(v, m?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: CL,
          value: t,
          onChange: C,
          onSelect: T,
          onKeyDown: O,
          placeholder: $L,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": m ? p : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      m && (S.length > 0 || q) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: R,
          className: AL,
          style: {
            top: `${m.caretTop + m.caretHeight + 6}px`,
            left: `${H ?? Math.max(0, m.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: DL, "aria-hidden": "true", children: se }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: p,
                role: "listbox",
                "aria-label": se,
                className: kL,
                children: S.map((z, Y) => {
                  const ee = `${g}-${Y}`, K = Y === m.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: ee,
                      role: "option",
                      "aria-selected": K,
                      "data-active": K || void 0,
                      className: zL,
                      onMouseDown: (oe) => {
                        oe.preventDefault(), A(z.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: z.value }),
                        z.hint && /* @__PURE__ */ c.jsx("span", { className: OL, children: z.hint })
                      ]
                    },
                    `${z.value}-${Y}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: p, role: "status", className: UL, children: q })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: LL, children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ec, children: "@" }),
        " character"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ec, children: "/" }),
        " emotion"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ec, children: "⏎" }),
        " commits"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("kbd", { className: ec, children: "⇥" }),
        " commits + advance"
      ] })
    ] })
  ] });
}
function VL(t, a) {
  return t.map((i, s) => {
    const o = a !== null && i.start === a;
    return i.kind === "character" ? /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: _L,
        "data-token": "character",
        "data-active": o ? "true" : void 0,
        children: [
          "@",
          i.value
        ]
      },
      `${i.start}-${s}`
    ) : i.kind === "emotion" ? /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: ML,
        "data-token": "emotion",
        "data-active": o ? "true" : void 0,
        children: [
          "/",
          i.value
        ]
      },
      `${i.start}-${s}`
    ) : /* @__PURE__ */ c.jsx("span", { className: RL, children: i.value }, `${i.start}-${s}`);
  });
}
var HL = "_5o8xvy0", qL = "_5o8xvy1", IL = "_5o8xvy2", FL = "_5o8xvy3", qf = "_5o8xvy4", YL = "_5o8xvy5", GL = "_3f2ar0", PL = "_3f2ar1", KL = "_3f2ar2", XL = "_3f2ar3", QL = "_3f2ar4", ZL = "_3f2ar6", al = "_3f2ar7", rl = "_3f2ar8", il = "_3f2ar9", $b = "_3f2ara", Bb = "_3f2arb";
function JL({ label: t, glyph: a = "?", children: i }) {
  const [s, o] = y.useState(!1), u = y.useRef(null), f = y.useId(), p = `${f}-content`, g = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!s) return;
    const m = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || g());
    }, b = (v) => {
      v.key === "Escape" && g();
    };
    return document.addEventListener("mousedown", m), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", m), document.removeEventListener("keydown", b);
    };
  }, [s, g]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: GL, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: PL,
        "aria-expanded": s,
        "aria-controls": p,
        onClick: () => o((m) => !m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: KL, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    s && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: p,
        role: "dialog",
        "aria-labelledby": f,
        className: XL,
        children: i
      }
    )
  ] });
}
var WL = "_1dxb1dg0", Vb = "_1dxb1dg1", e6 = "_1dxb1dg2", t6 = "_1dxb1dg3", n6 = "_1dxb1dg4";
function a6() {
  return /* @__PURE__ */ c.jsxs(JL, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: QL, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: ZL, children: [
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: il, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: il, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: il, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: il, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: al, children: [
        /* @__PURE__ */ c.jsx("code", { className: rl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: il, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: $b, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bb, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: $b, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bb, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function r6() {
  return /* @__PURE__ */ c.jsxs("ul", { className: WL, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Vb, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Vb, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: e6, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: t6, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: n6, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function i6({
  editorMode: t,
  onEditorModeChange: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: p,
  onStoryTextChange: g,
  storyCharacters: m,
  outputFormat: b,
  mappingsByLower: v,
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j
}) {
  const N = t === "quick", C = t === "rows", T = t === "story", A = yL.find((se) => se.id === t)?.description ?? "", O = C ? u.reduce((se, M) => se + M.text.length, 0) : T ? p.length : s.length, R = C ? u.map((se) => se.text).join(" ") : T ? p : s, H = R.trim() ? R.trim().split(/\s+/).length : 0, X = C ? u.filter((se) => se.text.trim().length > 0).length : (T ? p : s).trim() ? (T ? p : s).trim().split(/\r?\n/).filter((se) => se.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: HL, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${qL} ${N ? IL : ""}`,
        "data-quick-on": N || void 0,
        children: [
          /* @__PURE__ */ c.jsx(bL, { value: t, onChange: a }),
          N && /* @__PURE__ */ c.jsx(
            M4,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: FL, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: O.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: X.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: qf, children: H.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !C && /* @__PURE__ */ c.jsx(a6, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: YL, "aria-live": "polite", children: A }),
    C ? /* @__PURE__ */ c.jsx(
      pL,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : T ? /* @__PURE__ */ c.jsx(
      BL,
      {
        value: p,
        onChange: g,
        characters: m,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      k4,
      {
        value: s,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: i.deploymentId,
        quickMode: N
      }
    ),
    !N && !C && !T && /* @__PURE__ */ c.jsx(r6, {})
  ] });
}
function s6({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const p = [], g = t.trim();
  if (!g)
    p.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const m = g.split(/\r?\n/).filter((b) => b.trim()).length;
    p.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${m} lines · ${g.length} chars`
    });
  }
  if (a ? p.push({
    id: "voice",
    status: i ? "ok" : "warn",
    label: "Quick voice",
    detail: i ? "default voice set" : "no default voice"
  }) : s.length === 0 ? p.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? p.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : p.push({
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
function Hb(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((i) => i.text.trim().length > 0 || i.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function l6(t, a, i, s) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = i.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Gi(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Gi()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: i.script };
  if (t === "rows" && a === "quick")
    return { script: FS(i.rows, s) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of s) o.set(f.presetId, f);
    const u = [];
    for (const f of i.rows) {
      const p = f.text.trim();
      if (!p) continue;
      const g = f.character.trim(), m = f.presetId ? o.get(f.presetId) : null, b = [];
      g && b.push(`@${qb(g)}`), m && b.push(`/${qb(m.presetName)}`), b.push(p), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Dc(i.storyText), u = [];
    for (const p of o)
      p.kind === "text" && u.push(p.value);
    return { script: u.join("").replace(/\s+/g, " ").trim() };
  }
  if (t === "story" && a === "rows") {
    const o = Dc(i.storyText), u = /* @__PURE__ */ new Map();
    for (const w of s) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let p = "Narrator", g = null, m = "", b = !1;
    const v = () => {
      const w = m.replace(/\s+/g, " ").trim();
      w.length > 0 && f.push({
        ...Gi(),
        character: p,
        presetId: g,
        alpha: 1,
        text: w
      }), m = "";
    };
    for (const w of o)
      if (w.kind === "character")
        b && v(), p = w.value, g = null, b = !0;
      else if (w.kind === "emotion") {
        b && v();
        const S = u.get(w.value.toLowerCase());
        g = S ? S.presetId : null, b = !0;
      } else
        m += w.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Gi()] };
  }
  return null;
}
function qb(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const If = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], o6 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function c6(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const u = (i[s] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(o6);
    if (!f || !f.groups) {
      a.push({ idx: s, character: null, text: u, override: null });
      continue;
    }
    const p = f.groups.body ?? "", g = (f.groups.rest ?? "").trim(), [m = "", ...b] = p.split("|"), v = m.trim();
    if (!v) {
      a.push({ idx: s, character: null, text: g || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? u6(S) : null;
    a.push({
      idx: s,
      character: w,
      text: g,
      override: j
    });
  }
  return a;
}
function u6(t) {
  const a = t.trim();
  if (!a) return { kind: "raw", label: "" };
  const i = a.indexOf(":"), s = i >= 0 ? a.slice(0, i).trim().toLowerCase() : a.toLowerCase(), o = i >= 0 ? a.slice(i + 1).trim() : "";
  switch (s) {
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
function d6(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of t) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function f6(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const s = t[i];
    s && (a[s] = If[i % If.length] ?? If[0]);
  }
  return a;
}
function h6(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var m6 = "_1snzz30", p6 = "_1snzz31", v6 = "_1snzz33", g6 = "_1snzz34", y6 = "_1snzz36", Ib = "_1snzz3b", Fb = "_1snzz3c", Yb = "_1snzz3d";
const b6 = "ext-action-invoke", x6 = "emotion-tts.run";
function S6() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(b6, {
      detail: { id: x6 },
      bubbles: !1
    })
  ), !0) : !1;
}
const w6 = 4e3;
function j6({ visible: t, canGenerate: a }) {
  const [i, s] = y.useState(null), [o, u] = y.useState(!1), [f, p] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let U = !1;
    const V = async () => {
      try {
        const ce = await xc();
        U || (g.current = ce, s(ce));
      } catch {
      }
    };
    V();
    const G = window.setInterval(V, w6);
    return () => {
      U = !0, window.clearInterval(G);
    };
  }, []), y.useEffect(() => OS((U) => {
    p(!!U.busy);
  }), []);
  const m = y.useCallback(() => {
    fO();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  y.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = y.useCallback(() => {
    u(!0), S6();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", C = o || w, T = o || w, A = T ? "transitioning" : v ? "running" : "stopped", O = !a || f || !S, R = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", H = S && a && !f, X = v ? "ready" : w || o ? "busy" : "off", se = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", M = X === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const q = "rgba(28, 30, 34, 0.94)", z = "#ba9eff", Y = "#8455ef", ee = "#1a0a3a", K = "#f0f0f3", oe = "#aaabae", ne = "#22c55e", k = v ? "◼" : "⏻";
  return Fh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: m6,
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
          background: q,
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
              className: p6,
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
                color: X === "ready" ? ne : X === "busy" ? z : oe,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${X === "ready" ? "rgba(34, 197, 94, 0.4)" : X === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: v6,
                    "data-pulse": M ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: X === "ready" ? `0 0 8px ${ne}` : X === "busy" ? `0 0 8px ${z}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                se
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: Fb, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: g6,
                "data-state": A,
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
                  background: A === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: A === "running" ? ne : K,
                  fontSize: "16px",
                  cursor: C ? "not-allowed" : "pointer",
                  opacity: C ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${A === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ c.jsx("span", { className: Ib, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: k })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Yb, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: Fb, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: y6,
                "data-ready": H ? "true" : "false",
                onClick: m,
                disabled: O,
                "aria-label": R,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: O ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${z} 0%, ${Y} 100%)`,
                  color: O ? oe : ee,
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
                  f ? /* @__PURE__ */ c.jsx("span", { className: Ib, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Yb, role: "tooltip", children: R })
          ] })
        ]
      }
    ),
    document.body
  );
}
function E6(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], s = N6(t.deployment.displayName, t.deployment.deploymentId), o = $S(BS), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: nR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: aR, children: [
      /* @__PURE__ */ c.jsx("div", { className: iR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: rR, children: /* @__PURE__ */ c.jsx("h1", { className: sR, children: s }) }),
      /* @__PURE__ */ c.jsx("p", { className: lR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: yR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: oR, children: [
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
    /* @__PURE__ */ c.jsx(j6, { visible: o, canGenerate: u }),
    typeof document < "u" && Fh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: bR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: YO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function N6(t, a) {
  const i = (t ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function pr({
  number: t,
  title: a,
  id: i,
  variant: s,
  defaultCollapsed: o = !1,
  children: u
}) {
  const [f, p] = y.useState(o), g = `${i}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: cR, "aria-labelledby": i, children: [
    /* @__PURE__ */ c.jsx("header", { className: uR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: hR,
        "aria-expanded": !f,
        "aria-controls": g,
        onClick: () => p((m) => !m),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: dR, children: [
            /* @__PURE__ */ c.jsx("span", { className: mR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: pR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: vR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: i, className: fR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: gR,
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
        id: g,
        className: s === "split" ? SR : xR,
        children: u
      }
    )
  ] });
}
const xn = {
  success(t) {
    tn.success(t);
  },
  error(t) {
    tn.error(t);
  }
}, Eh = "__recipe";
function T6(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function C6(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== Eh && (a[i] = t[i]);
  return a;
}
function R6() {
  const { deployment: t, mappings: a, runs: i, workflow: s } = El(), [o, u] = y.useState(a), [f, p] = y.useState([]), [g, m] = y.useState([]), [b, v] = y.useState(null), [w, S] = y.useState(Hc), j = y.useMemo(
    () => t.defaultGenerationOverridesJson ? T6(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const Q = j[Eh];
    return typeof Q == "object" && Q !== null ? Q : {};
  }, [j]), [C, T] = y.useState(""), [A, O] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [R, H] = y.useState(t.defaultSpeedFactor ?? 1), [X, se] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, q] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...C6(j)
  })), [z, Y] = y.useState(() => {
    const Q = N.cachePolicy;
    return Q === "use_cache" || Q === "force_regenerate" || Q === "read_only_cache" ? Q : "use_cache";
  }), [ee, K] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [oe, ne] = y.useState(() => {
    const Q = N.editorMode;
    return Q === "quick" || Q === "rows" || Q === "story" ? Q : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), k = oe === "quick", [U, V] = y.useState(() => [Gi()]), G = 1e5, [ce, _] = y.useState(() => {
    const Q = N.storyText;
    return typeof Q == "string" ? Q : "";
  }), te = y.useRef(!1), re = y.useCallback((Q) => {
    Q.length > G && !te.current && (te.current = !0, xn.error(
      `Story text is over ${Math.round(G / 1e3)} KB — large scripts may slow down save and rendering.`
    )), Q.length <= G && (te.current = !1), _(Q);
  }, []), [F, $] = y.useState(Q3), ae = y.useCallback(
    (Q) => {
      ne((ve) => {
        if (Q === ve) return ve;
        const xe = { script: C, rows: U, storyText: ce }, be = Hb(Q, xe), rt = Hb(ve, xe);
        if (!be && rt) {
          const $e = l6(ve, Q, xe, g);
          if ($e) {
            const Xt = { script: C, rows: U, storyText: ce };
            $e.script !== void 0 && T($e.script), $e.rows !== void 0 && V($e.rows), $e.storyText !== void 0 && re($e.storyText);
            const On = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story"
            }, fn = (jt) => jt.split(/\r?\n/).filter((qa) => qa.trim().length > 0).length, _t = $e.rows !== void 0 ? $e.rows.filter((jt) => jt.text.trim().length > 0).length : $e.script !== void 0 ? fn($e.script) : $e.storyText !== void 0 ? fn($e.storyText) : 0, wt = _t > 0 ? ` (${_t} ${_t === 1 ? "line" : "lines"})` : "";
            tn(`Switched to ${On[Q]}${wt} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(Xt.script), V(Xt.rows), re(Xt.storyText), ne(ve);
                }
              },
              duration: 6e3
            });
          }
        }
        return Q;
      });
    },
    [C, U, ce, g, re]
  );
  y.useEffect(() => {
    let Q = !1;
    return Xi(t.deploymentId).then((ve) => {
      Q || p(ve.voiceAssets);
    }).catch(() => {
    }), t1(t.deploymentId).then((ve) => {
      Q || m(ve.presets);
    }).catch(() => {
    }), () => {
      Q = !0;
    };
  }, [t.deploymentId]);
  const de = y.useRef(!0);
  y.useEffect(() => {
    if (de.current) {
      de.current = !1;
      return;
    }
    const Q = window.setTimeout(() => {
      const ve = {
        ...M,
        [Eh]: {
          editorMode: oe,
          quickMode: k,
          cachePolicy: z,
          storyText: ce
        }
      };
      mt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: A,
          defaultSpeedFactor: R,
          defaultGenerationOverrides: ve
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(Q);
  }, [
    t.deploymentId,
    A,
    R,
    z,
    oe,
    k,
    ce,
    M
  ]);
  const pe = y.useMemo(() => oe === "rows" ? FS(U, g) : oe === "story" ? ce : C, [oe, U, g, C, ce]), Me = y.useMemo(() => c6(pe), [pe]), Le = y.useMemo(() => {
    if (oe !== "story") return d6(Me);
    const Q = /* @__PURE__ */ new Set(), ve = [];
    for (const xe of Dc(ce))
      xe.kind === "character" && (Q.has(xe.value) || (Q.add(xe.value), ve.push(xe.value)));
    return ve;
  }, [oe, Me, ce]), je = y.useMemo(() => f6(Le), [Le]), pt = y.useMemo(() => h6(Me), [Me]), Ue = y.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    for (const ve of o)
      Q.set(ve.characterName.toLowerCase(), ve);
    return Q;
  }, [o]), ut = y.useMemo(() => k && ee ? 0 : Le.filter((Q) => !Ue.has(Q.toLowerCase())).length, [Le, Ue, k, ee]), cn = y.useCallback(
    async (Q, ve) => {
      const xe = Ue.get(Q.toLowerCase());
      try {
        if (xe) {
          const be = await ul(t.deploymentId, xe.mappingId, ve);
          u(
            (rt) => rt.map(($e) => $e.mappingId === be.mappingId ? be : $e)
          ), xn.success(`Updated mapping for ${Q}`);
        } else if (ve.speakerVoiceAssetId) {
          const be = await qh(t.deploymentId, {
            ...ve,
            characterName: Q,
            speakerVoiceAssetId: ve.speakerVoiceAssetId
          });
          u((rt) => [...rt, be]), xn.success(`Mapped ${Q} to voice`);
        }
      } catch (be) {
        xn.error(be instanceof Error ? be.message : "mapping failed");
      }
    },
    [Ue, t.deploymentId]
  ), zn = y.useCallback(
    async (Q) => {
      const ve = Ue.get(Q.toLowerCase());
      if (ve)
        try {
          await Xx(t.deploymentId, ve.mappingId), u((xe) => xe.filter((be) => be.mappingId !== ve.mappingId)), xn.success(`Cleared mapping for ${Q}`);
        } catch (xe) {
          xn.error(xe instanceof Error ? xe.message : "clear failed");
        }
    },
    [Ue, t.deploymentId]
  ), It = y.useCallback(
    async (Q, ve) => {
      try {
        const xe = await bc(
          t.deploymentId,
          ve,
          ve.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        p((be) => [xe, ...be]), await cn(Q, { speakerVoiceAssetId: xe.voiceAssetId });
      } catch (xe) {
        xn.error(xe instanceof Error ? xe.message : "upload failed");
      }
    },
    [t.deploymentId, cn]
  ), Jn = y.useCallback((Q) => {
    S(Q);
  }, []), Ft = y.useMemo(() => {
    const Q = [], ve = /* @__PURE__ */ new Set();
    for (const xe of o) {
      const be = xe.speakerVoiceAssetId;
      if (!be || ve.has(be)) continue;
      ve.add(be);
      const $e = f.find((Xt) => Xt.voiceAssetId === be)?.displayName ?? `${xe.characterName} · ${be.slice(0, 8)}`;
      Q.push({ kind: "voice_asset", id: be, label: $e });
    }
    for (const xe of f)
      ve.has(xe.voiceAssetId) || (ve.add(xe.voiceAssetId), Q.push({ kind: "voice_asset", id: xe.voiceAssetId, label: xe.displayName }));
    return Q;
  }, [o, f]), un = y.useCallback(
    async (Q, ve) => {
      if (Q.kind !== "voice_asset") {
        xn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let xe;
      try {
        const be = JSON.parse(ve);
        if (typeof be != "object" || be === null || be.version !== 1 || !Array.isArray(be.ops))
          throw new Error("snapshot is not a valid EditChain");
        xe = be;
      } catch (be) {
        xn.error(
          be instanceof Error ? `Audit snapshot is malformed: ${be.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const be = await Zx(Q.id, t.deploymentId, {
          chain: xe
        }), rt = o.filter(($e) => $e.speakerVoiceAssetId === Q.id);
        await Promise.all(
          rt.map(
            ($e) => ul(t.deploymentId, $e.mappingId, {
              voiceAssetChainDigest: be.chain_digest
            }).catch(() => null)
          )
        ), u(
          ($e) => $e.map(
            (Xt) => Xt.speakerVoiceAssetId === Q.id ? { ...Xt, voiceAssetChainDigest: be.chain_digest } : Xt
          )
        ), xn.success(`Reverted ${Q.label} to a prior chain`);
      } catch (be) {
        xn.error(be instanceof Error ? be.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Wn = y.useCallback(
    async (Q) => {
      if (Q.kind !== "voice_asset") {
        xn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await JC(Q.id, t.deploymentId);
        const ve = o.filter((xe) => xe.speakerVoiceAssetId === Q.id);
        await Promise.all(
          ve.map(
            (xe) => ul(t.deploymentId, xe.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (xe) => xe.map(
            (be) => be.speakerVoiceAssetId === Q.id ? { ...be, voiceAssetChainDigest: null } : be
          )
        ), xn.success(`Cleared edit chain on ${Q.label}`);
      } catch (ve) {
        xn.error(ve instanceof Error ? ve.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Ct = y.useMemo(
    () => ({
      script: pe,
      parserMode: oe === "quick" ? "raw_text" : oe === "story" ? "story" : "dialogue",
      outputFormat: A,
      speedFactor: R,
      globalEmotion: { ...X, emotionAlpha: F.intensity },
      generation: M,
      cachePolicy: z
    }),
    [pe, oe, A, R, F.intensity, X, M, z]
  ), nn = y.useMemo(
    () => s6({
      script: pe,
      quickMode: k,
      defaultVoiceAssetId: ee,
      characters: Le,
      unmappedCount: ut,
      globalEmotion: X,
      performance: F
    }),
    [pe, k, ee, Le, ut, X, F]
  ), Rt = y.useMemo(
    () => nn.filter((Q) => Q.id !== "performance").map((Q) => ({
      label: Q.label,
      status: Q.status === "ok" ? "ok" : Q.status === "warn" ? "warn" : "fail",
      detail: Q.detail
    })),
    [nn]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(QC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      E6,
      {
        deployment: t,
        canGenerate: pe.trim().length > 0,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(EM, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          l4,
          {
            deploymentId: t.deploymentId,
            createPayload: Ct,
            canGenerate: pe.trim().length > 0,
            diagnostics: Rt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          HO,
          {
            deploymentId: t.deploymentId,
            speedFactor: R
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          i6,
          {
            editorMode: oe,
            onEditorModeChange: ae,
            deployment: t,
            script: C,
            onScriptChange: T,
            rows: U,
            onRowsChange: V,
            storyText: ce,
            onStoryTextChange: re,
            storyCharacters: Le,
            outputFormat: A,
            mappingsByLower: Ue,
            defaultVoiceAssetId: ee,
            onDefaultVoiceAssetIdChange: K,
            presets: g
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(H3, { lines: Me, characterColors: je }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          L_,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: je,
            onVoiceAssetsChange: p
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(yM, { unmappedCount: ut, totalCount: Le.length, children: Le.map((Q) => {
          const ve = Ue.get(Q.toLowerCase()) ?? null, xe = je[Q] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: DR, children: /* @__PURE__ */ c.jsx(
            gM,
            {
              characterName: Q,
              color: xe,
              lineCount: pt[Q] ?? 0,
              mapping: ve,
              voiceAssets: f,
              presets: g,
              active: b === Q,
              onToggle: () => v((be) => be === Q ? null : Q),
              onAssignVoiceAsset: (be) => cn(Q, { speakerVoiceAssetId: be }),
              onAssignPreset: (be) => cn(Q, { defaultVectorPresetId: be }),
              onUploadFile: (be) => It(Q, be),
              onClearMapping: () => zn(Q)
            }
          ) }, Q);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          h3,
          {
            value: X,
            onChange: se,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            Z3,
            {
              value: { ...F, pace: R },
              onChange: (Q) => {
                $(Q), Q.pace !== R && H(Q.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Ph,
            {
              state: w,
              onChange: Jn,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(oD, { checks: nn }),
          /* @__PURE__ */ c.jsx(
            A3,
            {
              outputFormat: A,
              onOutputFormatChange: O,
              speedFactor: R,
              onSpeedFactorChange: H,
              cachePolicy: z,
              onCachePolicyChange: Y,
              generation: M,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(pD, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          J_,
          {
            deploymentId: t.deploymentId,
            targets: Ft,
            onRevertToIdentity: Wn,
            onRevertToChain: un
          }
        )
      }
    )
  ] });
}
const Gb = /* @__PURE__ */ new Map();
function _6(t, a) {
  const [i, s] = y.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return y.useEffect(() => {
    if (!t || a <= 0) {
      s({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, u = Gb.get(o);
    if (u) {
      s({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), M6(t, a, f.signal).then((p) => {
      f.signal.aborted || (Gb.set(o, p), s({ peaks: p, isLoading: !1, error: null }));
    }).catch((p) => {
      if (f.signal.aborted) return;
      const g = p instanceof Error ? p.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: g });
    }), () => f.abort();
  }, [t, a]), i;
}
async function M6(t, a, i) {
  const s = await fetch(t, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return A6(f, a);
}
function A6(t, a) {
  const i = t.numberOfChannels, s = t.length, o = Math.max(1, Math.floor(s / a)), u = new Float32Array(a), f = [];
  for (let p = 0; p < i; p += 1) f.push(t.getChannelData(p));
  for (let p = 0; p < a; p += 1) {
    const g = p * o, m = Math.min(s, g + o);
    let b = 0;
    for (let v = g; v < m; v += 1) {
      let w = 0;
      for (let j = 0; j < i; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / i;
      S > b && (b = S);
    }
    u[p] = b;
  }
  return u;
}
const Pb = "(prefers-reduced-motion: reduce)";
function D6() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Pb).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Pb), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), t;
}
var k6 = "mquzal0", z6 = "mquzal1", Kb = "mquzal2", Xb = "mquzal3", Qb = "mquzal4", O6 = "mquzal5", Zb = "mquzal6", Jb = "mquzal7";
const L6 = 120, U6 = 720;
function PS(t) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: p = !1,
    playbackPositionMs: g = 0,
    onSeek: m,
    width: b = U6,
    height: v = L6
  } = t, w = y.useRef(null), S = y.useRef(null), j = y.useRef(null), N = _6(a, b), C = D6();
  y.useEffect(() => {
    $6(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = y.useCallback(
    (M) => {
      const q = S.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const z = Math.max(0, Math.min(1, (M - q.left) / q.width));
      return Math.round(z * i);
    },
    [i]
  );
  y.useEffect(() => {
    const M = (z) => {
      if (!j.current) return;
      const Y = T(z.clientX);
      j.current === "start" ? u(tc(Y, 0, o - 1)) : f(tc(Y, s + 1, i));
    }, q = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", q);
    };
  }, [T, i, o, s, u, f]);
  const A = (M) => (q) => {
    q.preventDefault(), q.stopPropagation(), j.current = M;
  }, O = (M) => {
    !m || M.target.closest("[data-handle]") || m(T(M.clientX));
  }, R = (M) => (q) => {
    const z = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let Y = 0;
    if (q.key === "ArrowLeft") Y = -z;
    else if (q.key === "ArrowRight") Y = z;
    else return;
    q.preventDefault(), M === "start" ? u(tc(s + Y, 0, o - 1)) : f(tc(o + Y, s + 1, i));
  }, H = Ff(s, i), X = Ff(o, i), se = Ff(g, i);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: k6,
      style: { height: v },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: z6,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: Jb, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: Jb, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: Zb, style: { left: 0, width: `${H}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Zb,
            style: { left: `${X}%`, right: 0, width: `${100 - X}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Kb,
            style: { left: `${H}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": s,
            tabIndex: 0,
            onPointerDown: A("start"),
            onKeyDown: R("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Xb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Qb, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Kb,
            style: { left: `${X}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: A("end"),
            onKeyDown: R("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Xb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Qb, "aria-hidden": "true" })
            ]
          }
        ),
        p && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: O6,
            style: {
              left: `${se}%`,
              transition: C ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Ff(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function tc(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function $6(t, a, i, s) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const u = s / 2;
  o.fillStyle = B6(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, i);
  for (let p = 0; p < f; p += 1) {
    const g = a[p] ?? 0, m = Math.max(1, g * (s - 4));
    o.fillRect(p, u - m / 2, 1, m);
  }
}
function B6(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var V6 = "r8lfsm0", H6 = "r8lfsm1", q6 = "r8lfsm2", I6 = "r8lfsm3", F6 = "r8lfsm4", Y6 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, G6 = "_1b1zchy3", P6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, K6 = "_1b1zchy6", X6 = "_1b1zchy7";
const KS = y.createContext("standalone");
function XS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const u = [Y6[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(KS.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: s, ...o, children: a }) });
}
function QS({
  title: t,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const u = y.useContext(KS), f = [G6, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: P6[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: K6, children: a }) : null,
    i
  ] });
}
function ZS({
  children: t,
  className: a,
  role: i = "group"
}) {
  const s = [X6, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, role: i, children: t });
}
const Wb = -16, Q6 = 80, Z6 = 720;
function J6(t) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: u, onError: f, onCancel: p } = t, g = s.durationMs ?? 0, [m, b] = y.useState(() => ex(g)), [v, w] = y.useState(Hc), [S, j] = y.useState(!1), [N, C] = y.useState(!1), [T, A] = y.useState(null), [O, R] = y.useState(!1), H = y.useRef(null), X = y.useRef(null), se = y.useRef(null);
  y.useEffect(() => {
    const V = ex(g);
    b(V), w(c1(V)), C(!1), A(null), se.current = null;
  }, [s.utteranceId, g]);
  const M = y.useCallback((V) => {
    w(V), b((G) => o1(G, V));
  }, []);
  y.useEffect(() => () => X.current?.abort(), []), y.useEffect(() => {
    H.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const q = y.useCallback(
    (V) => {
      V.key === "Escape" && (V.stopPropagation(), p());
    },
    [p]
  ), z = y.useMemo(
    () => m.ops.find((V) => V.mode === "trim"),
    [m.ops]
  ), Y = z?.start_ms ?? 0, ee = z?.end_ms ?? Math.max(1, g), K = y.useCallback((V, G) => {
    b((ce) => W6(ce, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(V)),
      end_ms: Math.max(Math.floor(V) + 1, Math.floor(G))
    })));
  }, []), oe = y.useCallback((V) => K(V, ee), [ee, K]), ne = y.useCallback((V) => K(Y, V), [Y, K]), k = y.useCallback((V) => {
    C(V), b((G) => {
      const ce = G.ops.filter((_) => _.mode !== "normalize");
      if (V) {
        const _ = {
          id: wn(),
          mode: "normalize",
          target_lufs: Wb
        };
        return { ...G, ops: [...ce, _] };
      }
      return { ...G, ops: ce };
    });
  }, []), U = y.useCallback(async () => {
    const V = Jx(m, g);
    if (V) {
      A(V.message);
      return;
    }
    if (A(null), O) return;
    X.current?.abort();
    const G = new AbortController();
    X.current = G, R(!0);
    try {
      const ce = se.current ?? void 0, _ = await ZC(
        a,
        i,
        s.utteranceId,
        ce ? { chain: m, digest_before: ce } : { chain: m },
        { signal: G.signal }
      );
      if (G.signal.aborted) return;
      se.current = _.chain_digest, u(_);
    } catch (ce) {
      if (G.signal.aborted) return;
      ce instanceof Qi && (se.current = ce.currentDigest || null);
      const _ = ce instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : ce instanceof Error ? ce.message : "apply failed";
      A(_), f(_);
    } finally {
      G.signal.aborted || R(!1);
    }
  }, [m, g, O, a, i, s.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(XS, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: H, onKeyDown: q, children: [
    /* @__PURE__ */ c.jsx(QS, { title: "Edit segment", meta: `Source · ${nc(g)}` }),
    /* @__PURE__ */ c.jsx(
      PS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: Y,
        endMs: ee,
        onChangeStart: oe,
        onChangeEnd: ne,
        height: Q6,
        width: Z6
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: V6, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: H6, children: [
        nc(Y),
        " → ",
        nc(ee),
        " · ",
        nc(ee - Y)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: q6, children: [
      /* @__PURE__ */ c.jsxs("label", { className: I6, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (V) => k(V.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Wb.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: F6,
          onClick: () => j((V) => !V),
          "aria-expanded": S,
          children: [
            S ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ c.jsx(
      Ph,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(ZS, { children: [
      /* @__PURE__ */ c.jsx(qe, { size: "sm", onClick: () => void U(), disabled: O, children: O ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(qe, { variant: "ghost", size: "sm", onClick: p, disabled: O, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: T })
  ] }) });
}
function ex(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: wn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function W6(t, a, i) {
  const s = t.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: wn(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[s] = i(o[s]), { ...t, ops: o };
}
function nc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var e8 = "jq2zyb2", t8 = "jq2zyb3", n8 = "jq2zyb4", a8 = "jq2zyb5", r8 = "jq2zyb6", i8 = "jq2zyb7", s8 = "jq2zyb8", l8 = "jq2zyb9", o8 = "jq2zyba", c8 = "jq2zybb", u8 = "jq2zybc", d8 = "jq2zybd", f8 = "jq2zybe", h8 = "jq2zybf jq2zybe", m8 = "jq2zybg", p8 = "jq2zybh", v8 = "jq2zybi", g8 = "jq2zybj", y8 = "jq2zybk", b8 = "jq2zybl", x8 = "jq2zybm", S8 = "jq2zybn", w8 = "jq2zybo", j8 = "jq2zybp", E8 = "jq2zybq", N8 = "jq2zybr", T8 = "jq2zybs", C8 = "jq2zybt", R8 = "jq2zybu", _8 = "jq2zybv", M8 = "jq2zybw", A8 = "jq2zybx", D8 = "jq2zyby", tx = "jq2zybz", k8 = "jq2zyb10", z8 = "jq2zyb11", O8 = "jq2zyb12";
const L8 = ["cancelled", "failed", "partial"], U8 = 2600;
function $8() {
  const { run: t } = El(), a = es(), [i, s] = y.useState(t), [o, u] = y.useState(!1), [f, p] = y.useState(null), [g, m] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    s(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => v(null), U8);
    return () => clearTimeout(R);
  }, [b]);
  const w = y.useMemo(() => H8(i), [i]), S = L8.includes(i.status) && i.kind === "batch", j = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      u(!0), p(null);
      try {
        const { runId: R } = await Qx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${R}`);
      } catch (R) {
        p(F8(R));
      } finally {
        u(!1);
      }
    }
  }, C = y.useCallback((R) => {
    m((H) => H === R ? null : R);
  }, []), T = y.useCallback(() => {
    m(null);
  }, []), A = (R, H) => {
    s((X) => V8(X, R, H)), m(null), v({ message: "Segment edited", severity: "success" });
  }, O = y.useCallback((R) => {
    v({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: e8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: t8, children: [
      /* @__PURE__ */ c.jsxs("header", { className: n8, children: [
        /* @__PURE__ */ c.jsxs("p", { className: a8, children: [
          i.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Hh, { to: `/${i.deploymentId}/recipe`, className: r8, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: i8, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: s8, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: l8, children: [
            q8(i.kind),
            /* @__PURE__ */ c.jsx("span", { className: o8, children: i.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Zr, { size: "md", tone: Y8(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: c8, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(ac, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(ac, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          ac,
          {
            label: "Completed",
            value: `${w.completed} / ${w.total}`,
            progress: w.total > 0 ? w.completed / w.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ac,
          {
            label: "Cache hit",
            value: `${w.cacheRatio}%`,
            progress: w.cacheRatio / 100
          }
        )
      ] }),
      S && /* @__PURE__ */ c.jsxs("section", { className: p8, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: v8, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: g8, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: y8, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(qe, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: b8, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs($a, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(aC, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Kr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: x8, children: [
            /* @__PURE__ */ c.jsx("span", { className: S8, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: w8, children: i.utterances.map((R) => {
          const H = g === R.utteranceId, X = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, se = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, M = se ? `/api/v1/artifacts/${encodeURIComponent(se)}/download` : "", q = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: E8, children: [
            /* @__PURE__ */ c.jsxs("div", { className: j8, children: [
              /* @__PURE__ */ c.jsxs("span", { className: T8, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: C8, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: R8, title: R.text, children: R.text }),
              /* @__PURE__ */ c.jsxs("span", { className: _8, children: [
                R.cacheHit && /* @__PURE__ */ c.jsx("span", { className: M8, children: "cached" }),
                q && /* @__PURE__ */ c.jsx("span", { className: N8, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ c.jsx("span", { children: I8(R.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Zr, { tone: G8(R.status), children: R.status }),
                X && /* @__PURE__ */ c.jsx(
                  qe,
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
            H && M && i.deploymentId && /* @__PURE__ */ c.jsx(
              J6,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: R,
                audioUrl: M,
                onApplied: (z) => A(R.utteranceId, z),
                onError: O,
                onCancel: T
              }
            )
          ] }, R.utteranceId);
        }) })
      ] }),
      B8(i, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: O8,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function B8(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const s = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: A8, children: a ? /* @__PURE__ */ c.jsxs("div", { className: k8, children: [
    /* @__PURE__ */ c.jsx("p", { className: z8, children: s }),
    /* @__PURE__ */ c.jsxs(
      qe,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: tx, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: D8,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: tx, children: "↓" })
      ]
    }
  ) : null });
}
function V8(t, a, i) {
  const s = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: i.derived_artifact_ref,
    durationMs: i.derived_duration_ms
  });
  return {
    ...t,
    utterances: s,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function ac({ label: t, value: a, mono: i, progress: s }) {
  const o = s !== void 0 ? Math.min(1, Math.max(0, s)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: u8,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: d8, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: i ? h8 : f8, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: m8, "aria-hidden": "true" })
      ]
    }
  );
}
function H8(t) {
  const a = t.utterances.length, i = t.utterances.filter((f) => f.status === "completed").length, s = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: u };
}
function q8(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function I8(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function F8(t) {
  return t instanceof ts ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function Y8(t) {
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
function G8(t) {
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
var P8 = "pcphqj2", K8 = "pcphqj3", X8 = "pcphqj4", Q8 = "pcphqj5", Z8 = "pcphqj6", J8 = "pcphqj7", W8 = "pcphqj8", eU = "pcphqj9", tU = "pcphqja", nx = "pcphqjb", nU = "pcphqjc", aU = "pcphqjd", rU = "pcphqje pcphqjd", iU = "pcphqjf", sU = "pcphqjg", lU = "pcphqjh", oU = "pcphqji", cU = "pcphqjj pcphqji", uU = "pcphqjk pcphqji", dU = "pcphqjl pcphqji", fU = "pcphqjm", Yf = "pcphqjn", Gf = "pcphqjo";
function hU() {
  const [t, a] = y.useState(null), [i, s] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const p = await mt("/runtime/queue");
        o || (a(p.entries), s(null));
      } catch (p) {
        o || s(p instanceof Error ? p.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: P8, children: /* @__PURE__ */ c.jsxs("div", { className: K8, children: [
    /* @__PURE__ */ c.jsxs("header", { className: X8, children: [
      /* @__PURE__ */ c.jsx("p", { className: Q8, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: Z8, children: [
        /* @__PURE__ */ c.jsx("h1", { className: J8, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: W8, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: eU, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ c.jsx(kn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx($a, { density: "compact", children: /* @__PURE__ */ c.jsx(Bc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs($a, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Kr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: tU, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${nx} ${nU}` : nx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? rU : aU, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: iU, children: [
                /* @__PURE__ */ c.jsx("span", { className: sU, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: lU, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: mU(o.kind), children: pU(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: fU, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: vU(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Gf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function mU(t) {
  switch (t) {
    case "batch":
      return cU;
    case "test_line":
      return uU;
    case "resume":
      return dU;
    default:
      return oU;
  }
}
function pU(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function vU(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function gU() {
  const { deploymentId: t, prefillCharacterName: a } = El(), i = es(), [s, o] = y.useState(a), [u, f] = y.useState(""), [p, g] = y.useState("none"), [m, b] = y.useState(!1), [v, w] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await qh(t, {
        characterName: s,
        speakerVoiceAssetId: u,
        defaultEmotionMode: p
      }), i(`/${t}/recipe`);
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
            value: s,
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
        /* @__PURE__ */ c.jsxs("select", { value: p, onChange: (N) => g(N.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(qe, { type: "submit", variant: "primary", disabled: m, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: v })
    ] })
  ] });
}
var yU = "_1oor31e0", bU = "_1oor31e1", xU = "_1oor31e2", SU = "_1oor31e3", wU = "_1oor31e4", jU = "_1oor31e5", EU = "_1oor31e6", NU = "_1oor31e7", TU = "_1oor31e8";
const CU = 8;
function RU(t) {
  const { entries: a, loading: i, error: s } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: yU, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ c.jsx("div", { className: TU, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: NU, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: bU, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: xU, children: [
      /* @__PURE__ */ c.jsx("span", { className: SU, children: MU(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: wU, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: jU, title: o.digest_after, children: _U(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: EU, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function _U(t) {
  return t ? `${t.slice(0, CU)}…` : "—";
}
function MU(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var ax = "_1c63kaw0", AU = "_1c63kaw1", DU = "_1c63kaw2", kU = "_1c63kaw3", zU = "_1c63kaw4", OU = "_1c63kaw5", LU = "_1c63kaw6";
function UU({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: ax, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: AU, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: ax, "data-testid": "edit-chain-list", children: t.ops.map((i, s) => /* @__PURE__ */ c.jsxs("li", { className: DU, children: [
    /* @__PURE__ */ c.jsxs("span", { className: kU, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: zU, children: [
      /* @__PURE__ */ c.jsx("span", { className: OU, children: rx(i) }),
      /* @__PURE__ */ c.jsx("span", { className: LU, children: $U(i) })
    ] }),
    /* @__PURE__ */ c.jsx(
      qe,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${rx(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function rx(t) {
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
function $U(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${ix(t.start_ms)} → ${ix(t.end_ms)}`;
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
      return `${Pf(t.low_db)} / ${Pf(t.mid_db)} / ${Pf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Pf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function ix(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", Kf = "_1o3ytop1", sx = "_1o3ytop2", BU = "_1o3ytop3", VU = "_1o3ytop4", HU = "_1o3ytop5", qU = "_1o3ytop6", IU = "_1o3ytop7", ic = "_1o3ytop8", FU = "_1o3ytop9", YU = "_1o3ytopf", GU = "_1o3ytopg", PU = "_1o3ytoph", KU = "_1o3ytopi", XU = "_1o3ytopj", QU = "_1o3ytopk", ZU = "_1t0zy2f0", JU = "_1t0zy2f1", WU = "_1t0zy2f2";
function e$({ content: t, children: a, delayMs: i = 350 }) {
  const [s, o] = y.useState(!1), u = y.useId(), f = y.useRef(null), p = y.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), g = y.useCallback(() => {
    p(), f.current = window.setTimeout(() => o(!0), i);
  }, [p, i]), m = y.useCallback(() => {
    p(), o(!1);
  }, [p]);
  if (y.useEffect(() => () => p(), [p]), y.useEffect(() => {
    if (!s) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [s]), !y.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: g,
    onMouseLeave: m,
    onFocus: g,
    onBlur: m,
    "aria-describedby": s ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: ZU, children: [
    y.cloneElement(a, b),
    s && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: WU, children: t })
  ] });
}
function sc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(e$, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: JU, children: "?" }) });
}
const lx = -16;
function t$(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, p = y.useMemo(
    () => n$(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, m] = y.useState(() => Xf(f)), [b, v] = y.useState(Hc), [w, S] = y.useState(!1), [j, N] = y.useState(null), [C, T] = y.useState(null), [A, O] = y.useState(!1), [R, H] = y.useState(!1), [X, se] = y.useState(!1), [M, q] = y.useState(null), [z, Y] = y.useState([]), [ee, K] = y.useState(null), [oe, ne] = y.useState([]), [k, U] = y.useState(!1), [V, G] = y.useState(null), [ce, _] = y.useState(0), te = y.useRef(null), re = y.useRef(null), F = y.useRef(null), $ = y.useRef(null), ae = y.useRef(null), de = y.useRef(0), pe = y.useMemo(
    () => g.ops.some((Q) => Q.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const Q = Xf(f);
    m(Q), v(c1(Q)), N(null), se(!1), Y([]), K(null), ae.current = null;
  }, [a.voiceAssetId, f]);
  const Me = y.useCallback((Q) => {
    v(Q), m((ve) => o1(ve, Q));
  }, []);
  y.useEffect(() => {
    $.current?.abort();
    const Q = new AbortController();
    return $.current = Q, U(!0), G(null), dc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: Q.signal
    }).then((ve) => {
      Q.signal.aborted || ne(ve.entries);
    }).catch((ve) => {
      if (Q.signal.aborted) return;
      const xe = ve instanceof Error ? ve.message : "audit fetch failed";
      G(xe);
    }).finally(() => {
      Q.signal.aborted || U(!1);
    }), () => Q.abort();
  }, [i, a.voiceAssetId, ce]), y.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), y.useEffect(() => () => {
    re.current?.abort(), F.current?.abort(), $.current?.abort();
  }, []);
  const Le = g.ops.find((Q) => Q.mode === "trim"), je = g.ops.find((Q) => Q.mode === "normalize"), pt = Le?.start_ms ?? 0, Ue = Le?.end_ms ?? Math.max(1, f), ut = y.useCallback((Q, ve) => {
    m(
      (xe) => ox(
        xe,
        "trim",
        (be) => ({
          ...be,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(Q)),
          end_ms: Math.max(Math.floor(Q) + 1, Math.floor(ve))
        })
      )
    );
  }, []), cn = y.useCallback(
    (Q) => ut(Q, Ue),
    [Ue, ut]
  ), zn = y.useCallback(
    (Q) => ut(pt, Q),
    [pt, ut]
  ), It = y.useCallback((Q) => {
    m((ve) => {
      const xe = ve.ops.filter((be) => be.mode !== "normalize");
      if (Q) {
        const be = {
          id: wn(),
          mode: "normalize",
          target_lufs: lx
        };
        return { ...ve, ops: [...xe, be] };
      }
      return { ...ve, ops: xe };
    });
  }, []), Jn = y.useCallback(
    (Q) => {
      const ve = g.ops.findIndex((rt) => rt.id === Q);
      if (ve === -1) return;
      const xe = g.ops[ve];
      if (!xe) return;
      const be = [...g.ops.slice(0, ve), ...g.ops.slice(ve + 1)];
      m({ ...g, ops: be }), Y((rt) => [...rt, { op: xe, index: ve }]);
    },
    [g]
  ), Ft = y.useCallback(() => {
    const Q = z[z.length - 1];
    if (!Q) return;
    const ve = Math.min(Q.index, g.ops.length), xe = [...g.ops.slice(0, ve), Q.op, ...g.ops.slice(ve)];
    m({ ...g, ops: xe }), Y(z.slice(0, -1));
  }, [g, z]), un = y.useCallback(() => {
    const Q = Jx(g, f);
    return Q ? (N(Q.message), !1) : (N(null), !0);
  }, [g, f]), Wn = y.useCallback(async () => {
    if (!un() || A) return;
    re.current?.abort();
    const Q = new AbortController();
    re.current = Q;
    const ve = ++de.current;
    H(!0);
    try {
      const xe = await WC(a.voiceAssetId, i, g, {
        signal: Q.signal
      });
      if (Q.signal.aborted || ve !== de.current) return;
      C && URL.revokeObjectURL(C);
      const be = URL.createObjectURL(xe);
      T(be), se(!0), requestAnimationFrame(() => te.current?.play().catch(() => {
      }));
    } catch (xe) {
      if (Q.signal.aborted) return;
      const be = xe instanceof Error ? xe.message : "preview failed";
      N(be), u(be);
    } finally {
      Q.signal.aborted || H(!1);
    }
  }, [un, A, a.voiceAssetId, i, g, C, u]), Ct = y.useCallback(async () => {
    if (!un() || R || A) return;
    if (s.length > 1) {
      const ve = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${ve}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    re.current?.abort(), F.current?.abort();
    const Q = new AbortController();
    F.current = Q, O(!0);
    try {
      const ve = ae.current ?? void 0, xe = await Zx(
        a.voiceAssetId,
        i,
        ve ? { chain: g, digest_before: ve } : { chain: g },
        { signal: Q.signal }
      );
      if (Q.signal.aborted) return;
      ae.current = xe.chain_digest, K(xe.chain_digest), N(null), q(xe.measured_lufs ?? null), Y([]), o(xe), _((be) => be + 1);
    } catch (ve) {
      if (Q.signal.aborted) return;
      const xe = ve instanceof Qi;
      ve instanceof Qi && (ae.current = ve.currentDigest || null);
      const be = xe ? "Edit chain has changed in another tab. Reload to continue." : ve instanceof Error ? ve.message : "apply failed";
      N(be), u(be);
    } finally {
      Q.signal.aborted || O(!1);
    }
  }, [
    un,
    R,
    A,
    s,
    a.voiceAssetId,
    i,
    g,
    o,
    u
  ]), nn = y.useCallback(() => {
    re.current?.abort(), m(Xf(f)), N(null), q(null), se(!1), Y([]), _((Q) => Q + 1), C && (URL.revokeObjectURL(C), T(null));
  }, [f, C]), Rt = y.useCallback((Q) => {
    m(
      (ve) => ox(
        ve,
        "normalize",
        (xe) => ({
          ...xe,
          mode: "normalize",
          target_lufs: Q
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(XS, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      QS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      PS,
      {
        audioUrl: p,
        durationMs: Math.max(1, f),
        startMs: pt,
        endMs: Ue,
        onChangeStart: cn,
        onChangeEnd: zn
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Kf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          sc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: sx, children: [
        lc(pt),
        " → ",
        lc(Ue),
        " · ",
        lc(Ue - pt)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: IU, children: [
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Kf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          pe && je && /* @__PURE__ */ c.jsxs("span", { className: YU, children: [
            "target ",
            je.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: FU, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: pe,
              onChange: (Q) => It(Q.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            lx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        pe && je && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: PU,
            min: -30,
            max: -6,
            step: 0.5,
            value: je.target_lufs,
            onChange: (Q) => Rt(Number(Q.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Kf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: sx, children: g.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(UU, { chain: g, onRemoveOp: Jn })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: BU,
            onClick: () => S((Q) => !Q),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: VU, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: HU, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ c.jsx(
                sc,
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
          Ph,
          {
            state: b,
            onChange: Me,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      ee && /* @__PURE__ */ c.jsx("div", { className: ic, children: /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: qU, title: ee, children: [
          ee.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(ZS, { children: [
      /* @__PURE__ */ c.jsx(
        qe,
        {
          variant: "secondary",
          onClick: () => void Wn(),
          disabled: R || A,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        qe,
        {
          onClick: () => void Ct(),
          disabled: A || R,
          children: A ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        qe,
        {
          variant: "ghost",
          onClick: nn,
          disabled: A || R,
          children: "Reset"
        }
      ),
      z.length > 0 && /* @__PURE__ */ c.jsxs(
        qe,
        {
          variant: "ghost",
          size: "sm",
          onClick: Ft,
          disabled: A || R,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            z.length,
            ")"
          ]
        }
      ),
      X && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: QU,
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
        ref: te,
        src: C,
        controls: !0,
        className: GU,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: KU, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: XU, children: [
        "Edit history",
        oe.length > 0 ? ` · ${oe.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        RU,
        {
          entries: oe,
          loading: k,
          error: V
        }
      )
    ] })
  ] });
}
function Xf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: wn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function ox(t, a, i) {
  const s = t.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: wn(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[s] = i(o[s]), { ...t, ops: o };
}
function lc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function n$(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var a$ = "go9vi12", r$ = "go9vi13", i$ = "go9vi14", s$ = "go9vi15", l$ = "go9vi16", o$ = "go9vi17", c$ = "go9vi18", u$ = "go9vi19", d$ = "go9vi1a", f$ = "go9vi1b go9vi1a", h$ = "go9vi1c", m$ = "go9vi1d", p$ = "go9vi1e", v$ = "go9vi1f", g$ = "go9vi1g", y$ = "go9vi1h", b$ = "go9vi1i", x$ = "go9vi1j", cx = "go9vi1k", S$ = "go9vi1l", w$ = "go9vi1m", j$ = "go9vi1n", kc = "go9vi1o", E$ = "go9vi1q", N$ = "go9vi1r go9vi1q", T$ = "go9vi1s go9vi1q", C$ = "go9vi1t", R$ = "go9vi1u", _$ = "go9vi1v", M$ = "go9vi1w", JS = "go9vi1x", A$ = "go9vi1y", D$ = "go9vi1z", k$ = "go9vi110 go9vi1o", z$ = "go9vi111", O$ = "go9vi112", L$ = "go9vi113", U$ = "go9vi114", $$ = "go9vi115", B$ = "go9vi116";
function V$() {
  const { deployment: t, mappings: a, voiceAssets: i } = El(), s = es(), [o, u] = y.useState(a), [f, p] = y.useState(i), [g, m] = y.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = y.useState(""), [w, S] = y.useState(null), [j, N] = y.useState(null), [C, T] = y.useState(null), [A, O] = y.useState(null), [R, H] = y.useState(0), X = y.useCallback(() => {
    s(`/${t.deploymentId}/recipe`);
  }, [s, t.deploymentId]), se = y.useCallback((F) => {
    O(F), window.setTimeout(() => {
      O(($) => $ === F ? null : $);
    }, 1600);
  }, []), M = y.useMemo(() => {
    const F = /* @__PURE__ */ new Map();
    for (const $ of f) F.set($.voiceAssetId, $);
    return F;
  }, [f]), q = y.useMemo(() => {
    const F = b.trim().toLowerCase();
    return F ? o.filter(($) => $.characterName.toLowerCase().includes(F)) : o;
  }, [o, b]), z = y.useMemo(
    () => o.find((F) => F.mappingId === g) ?? null,
    [o, g]
  );
  y.useEffect(() => {
    u(a), p(i), m(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!j) return;
    const F = setTimeout(() => N(null), 2600);
    return () => clearTimeout(F);
  }, [j]);
  const Y = y.useCallback(async () => {
    const F = await Xi(t.deploymentId);
    p(F.voiceAssets);
  }, [t.deploymentId]), ee = y.useCallback(
    (F) => {
      u(
        ($) => $.map((ae) => ae.mappingId === g ? { ...ae, ...F } : ae)
      );
    },
    [g]
  ), K = y.useCallback(
    async (F) => {
      if (!z) return;
      const $ = z;
      try {
        const ae = await ul(t.deploymentId, z.mappingId, F);
        u((de) => de.map((pe) => pe.mappingId === ae.mappingId ? ae : pe)), Object.prototype.hasOwnProperty.call(F, "characterName") && se(ae.mappingId);
      } catch (ae) {
        u(
          (de) => de.map((pe) => pe.mappingId === $.mappingId ? $ : pe)
        ), S(vr(ae));
      }
    },
    [z, t.deploymentId, se]
  ), oe = y.useCallback(async () => {
    const F = f[0];
    if (!F) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const $ = P$(o), ae = await qh(t.deploymentId, {
        characterName: $,
        speakerVoiceAssetId: F.voiceAssetId
      });
      u((de) => [...de, ae]), m(ae.mappingId), H((de) => de + 1);
    } catch ($) {
      S(vr($));
    }
  }, [t.deploymentId, f, o]), ne = y.useCallback(() => {
    z && T({ id: z.mappingId, name: z.characterName });
  }, [z]), k = y.useCallback(async () => {
    if (!C) return;
    const { id: F, name: $ } = C;
    T(null);
    try {
      await Xx(t.deploymentId, F), u((ae) => ae.filter((de) => de.mappingId !== F)), m(null), N(`Mapping for ${$} deactivated.`);
    } catch (ae) {
      S(vr(ae));
    }
  }, [t.deploymentId, C]), U = y.useCallback(
    async (F, $, ae) => {
      try {
        const de = await bc(t.deploymentId, F, $, ae);
        return p((pe) => [de, ...pe]), N(`${de.displayName} uploaded.`), de;
      } catch (de) {
        return S(vr(de)), null;
      }
    },
    [t.deploymentId]
  ), V = y.useCallback(async () => {
    try {
      const F = await BT(t.deploymentId);
      J$(F, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (F) {
      S(vr(F));
    }
  }, [t.deploymentId]), G = y.useCallback(
    async (F, $) => {
      try {
        const ae = await VT(
          t.deploymentId,
          F.mappings,
          $
        );
        N(
          `Imported ${ae.created.length} • skipped ${ae.skipped.length} • replaced ${ae.replaced.length}.`
        );
        const de = await Xi(t.deploymentId);
        p(de.voiceAssets);
      } catch (ae) {
        S(vr(ae));
      }
    },
    [t.deploymentId]
  ), ce = y.useCallback(
    async (F) => {
      if (await Y(), z && F.chain_digest)
        try {
          const $ = await ul(t.deploymentId, z.mappingId, {
            voiceAssetChainDigest: F.chain_digest
          });
          u(
            (ae) => ae.map((de) => de.mappingId === $.mappingId ? $ : de)
          );
        } catch ($) {
          S(vr($));
        }
      N("Edit applied.");
    },
    [Y, z, t.deploymentId]
  ), _ = y.useCallback((F) => {
    S(F);
  }, []), te = y.useCallback(
    async (F, $) => {
      if (!z) return null;
      const ae = F.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await FT(t.deploymentId, {
          line: ae,
          outputFormat: $
        })).runId };
      } catch (de) {
        return S(vr(de)), null;
      }
    },
    [t.deploymentId, z]
  ), re = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: a$, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: r$, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: i$,
          onClick: X,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: s$, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: l$, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: o$, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            re
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(qe, { variant: "primary", size: "sm", onClick: oe, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: c$,
          placeholder: "Search characters",
          value: b,
          onChange: (F) => v(F.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(G$, { onExport: V, onImport: G, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: u$, children: q.length === 0 ? /* @__PURE__ */ c.jsx(
        Bc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : q.map((F) => {
        const $ = M.get(F.speakerVoiceAssetId), ae = F.mappingId === g;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: ae ? f$ : d$,
            onClick: () => m(F.mappingId),
            "aria-pressed": ae,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: h$, "aria-hidden": "true", children: K$(F.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: m$, children: [
                /* @__PURE__ */ c.jsx("span", { className: p$, children: F.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: v$, children: $?.displayName ?? "no voice" })
              ] })
            ]
          },
          F.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: g$, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(mm, { features: ym, children: /* @__PURE__ */ c.jsx(CS, { children: j && /* @__PURE__ */ c.jsx(
        gm.div,
        {
          className: A$,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: j
        },
        j
      ) }) }),
      w && /* @__PURE__ */ c.jsx(kn, { severity: "error", children: w }),
      C && /* @__PURE__ */ c.jsxs(kn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          C.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx(qe, { variant: "danger", size: "sm", onClick: () => void k(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(qe, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ c.jsx(
        q$,
        {
          deploymentId: t.deploymentId,
          mapping: z,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (F) => {
            ee({ characterName: F });
          },
          onNameSave: (F) => {
            const $ = F.trim();
            $ && K({ characterName: $ });
          },
          savedHint: A === z.mappingId,
          autoFocusNonce: R,
          onSpeakerChange: (F) => {
            ee({ speakerVoiceAssetId: F }), K({ speakerVoiceAssetId: F });
          },
          onDelete: ne,
          onUploadVoice: async (F, $, ae) => {
            const de = await U(F, $, ae);
            return de && ae === "speaker" && (ee({ speakerVoiceAssetId: de.voiceAssetId }), K({ speakerVoiceAssetId: de.voiceAssetId })), await Y(), de;
          },
          onTestLine: te,
          onEditChainPersisted: ce,
          onEditError: _
        },
        z.mappingId
      ) : /* @__PURE__ */ c.jsx(
        H$,
        {
          voiceCount: f.length,
          onUploadVoice: async (F) => {
            await U(F, F.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function H$({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs($a, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: L$, children: [
      /* @__PURE__ */ c.jsx("p", { className: Kr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: U$, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: $$, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      WS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx($a, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Bc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function q$(t) {
  const { mapping: a, voiceAssets: i, allMappings: s } = t, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = y.useMemo(
    () => s.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [s, a.speakerVoiceAssetId]
  ), [f, p] = y.useState(""), [g, m] = y.useState("mp3"), [b, v] = y.useState("idle"), [w, S] = y.useState(null), j = y.useRef(!1), N = y.useRef(null);
  y.useEffect(() => (j.current = !1, () => {
    j.current = !0;
  }), []), y.useEffect(() => {
    if (t.autoFocusNonce === 0) return;
    const T = N.current;
    T && (T.focus(), T.select());
  }, [t.autoFocusNonce]);
  const C = y.useCallback(async () => {
    j.current = !1, v("running"), S(null);
    const T = await t.onTestLine(f, g);
    if (j.current) return;
    if (!T) {
      v("error"), S("Failed to enqueue test-line run.");
      return;
    }
    const { runId: A } = T;
    for (let O = 0; O < 60; O += 1) {
      if (await new Promise((R) => setTimeout(R, 500)), j.current) return;
      try {
        const R = await Ih(t.deploymentId, A);
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
  }, [t.onTestLine, t.deploymentId, f, g]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: y$, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Kr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: b$, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: JS, children: /* @__PURE__ */ c.jsx(qe, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      $a,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: D$,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: k$,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: f,
              onChange: (T) => p(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: b === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: kc,
              value: g,
              onChange: (T) => m(T.currentTarget.value),
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
            qe,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void C(),
              disabled: b === "running",
              children: b === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          b === "done" && /* @__PURE__ */ c.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          b === "error" && w && /* @__PURE__ */ c.jsx(Zr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: x$, children: [
      /* @__PURE__ */ c.jsxs($a, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Kr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: j$, children: [
          /* @__PURE__ */ c.jsxs("span", { className: S$, children: [
            /* @__PURE__ */ c.jsx("span", { className: cx, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: w$,
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
              className: kc,
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
      /* @__PURE__ */ c.jsxs($a, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Kr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: cx, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          I$,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(F$, { voice: o }),
        /* @__PURE__ */ c.jsx(
          WS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          t$,
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
function I$({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: kc,
      value: t,
      onChange: (s) => i(s.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ c.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((s) => /* @__PURE__ */ c.jsx("option", { value: s.voiceAssetId, children: s.displayName }, s.voiceAssetId))
      ]
    }
  );
}
function F$({ voice: t }) {
  const a = X$(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: C$, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: Q$(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: R$, children: [
      /* @__PURE__ */ c.jsx("div", { className: _$, children: /* @__PURE__ */ c.jsx(mm, { features: ym, children: /* @__PURE__ */ c.jsx(
        gm.div,
        {
          className: M$,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(Y$, { seed: t.contentSha256 })
  ] });
}
function Y$({ seed: t }) {
  const a = y.useMemo(() => Z$(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: z$, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: O$,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${s}`
  )) });
}
function WS({
  label: t,
  onFile: a
}) {
  const [i, s] = y.useState(!1), [o, u] = y.useState(!1), f = y.useRef(null), p = y.useCallback(
    async (g) => {
      u(!0);
      try {
        await a(g);
      } finally {
        u(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o ? T$ : i ? N$ : E$,
      onDragOver: (g) => {
        g.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (g) => {
        g.preventDefault(), s(!1);
        const m = g.dataTransfer.files?.[0];
        m && p(m);
      },
      onClick: () => f.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), f.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: f,
            type: "file",
            accept: "audio/*",
            onChange: (g) => {
              const m = g.currentTarget.files?.[0];
              m && p(m), g.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function G$({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = y.useState("error"), u = y.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: JS, children: [
    /* @__PURE__ */ c.jsx(qe, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: B$,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const p = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!p)
            try {
              const g = await p.text(), m = JSON.parse(g);
              a(m, s);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx(qe, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: kc,
        value: s,
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
function P$(t) {
  const a = new Set(t.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function K$(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function X$(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function Q$(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function Z$(t, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = t.charCodeAt(s % t.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function J$(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function vr(t) {
  return t instanceof ts || t instanceof Error ? t.message : "unknown error";
}
function W$() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await UT();
        return { deployments: t };
      },
      Component: SC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Bi(t, "deploymentId");
        return YE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Bi(t, "deploymentId"), [i, { mappings: s }, { runs: o }, u] = await Promise.all([
          Vy(a),
          Hy(a),
          HT(a, { limit: 10 }),
          KT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: u };
      },
      Component: R6
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Bi(t, "deploymentId"), i = Bi(t, "runId");
        return { run: await Ih(a, i) };
      },
      Component: $8
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Bi(t, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          Vy(a),
          Hy(a),
          Xi(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: V$
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = Bi(t, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: gU
    },
    {
      path: "/runtime/queue",
      Component: hU
    }
  ];
}
function Bi(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const ux = "ext-actions-request", eB = "ext-actions-declare", tB = "ext-action-state", dx = "ext-action-invoke", Nh = "emotion-tts:navigate", qi = "emotion-tts.run", fx = "emotion-tts.mappings", nB = 4e3;
function aB(t, a) {
  let i = null, s = !1;
  const o = () => {
    const j = i?.badge ?? "not_installed";
    return rB(j, s);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: fx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(eB, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, p = () => {
    t.dispatchEvent(
      new CustomEvent(tB, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => f(), m = (j) => {
    const N = j.detail?.id;
    N === qi ? b() : N === fx && t.dispatchEvent(
      new CustomEvent(Nh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = i?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    s = !0, p();
    try {
      N ? await xM() : await bM();
      try {
        i = await xc();
      } catch {
      }
    } catch {
    } finally {
      s = !1, p();
    }
  };
  t.addEventListener(ux, g), t.addEventListener(dx, m);
  let v = !1;
  const w = async () => {
    try {
      const j = await xc();
      if (v) return;
      i = j, p();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), nB);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(ux, g), t.removeEventListener(dx, m);
    }
  };
}
function rB(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", s = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qi,
    label: r1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : i ? {
    id: qi,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : s ? {
    id: qi,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: qi,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const Th = "emotion-tts-app", iB = "ext-event", hx = "emotion-tts-stylesheet", mx = ["accent", "density", "card"];
function sB(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function lB() {
  if (typeof document > "u" || document.getElementById(hx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = hx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
lB();
class oB extends HTMLElement {
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
    this.root = vE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Nh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = aB(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const s = i.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(Nh, a);
  }
  syncTweaksFromBody() {
    for (const a of mx) {
      const i = sB(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: mx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = JN(W$(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ c.jsx(y.StrictMode, { children: /* @__PURE__ */ c.jsx(eT, { router: i }) })
    );
  }
  resolveInitialEntry() {
    const a = this.getAttribute("route");
    if (a && a.length > 0) return a;
    const i = this.getAttribute("deployment-id");
    return i && i.length > 0 ? `/${i}/recipe` : "/";
  }
  emitHostEvent(a, i) {
    this.dispatchEvent(
      new CustomEvent(iB, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function cB() {
  typeof customElements > "u" || customElements.get(Th) || customElements.define(Th, oB);
}
typeof customElements < "u" && !customElements.get(Th) && cB();
export {
  cB as register
};
//# sourceMappingURL=emotion-tts.js.map
