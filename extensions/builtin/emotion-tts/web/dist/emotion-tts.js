function iE(t, a) {
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
function mx(t) {
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
var ty;
function sE() {
  if (ty) return Ks;
  ty = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(s, o, u) {
    var f = null;
    if (u !== void 0 && (f = "" + u), o.key !== void 0 && (f = "" + o.key), "key" in o) {
      u = {};
      for (var m in o)
        m !== "key" && (u[m] = o[m]);
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
var ny;
function lE() {
  return ny || (ny = 1, ef.exports = sE()), ef.exports;
}
var c = lE(), tf = { exports: {} }, He = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function oE() {
  if (ay) return He;
  ay = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), f = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), w = Symbol.iterator;
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
  function T(_, te, ae) {
    this.props = _, this.context = te, this.refs = C, this.updater = ae || j;
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
  function O(_, te, ae) {
    this.props = _, this.context = te, this.refs = C, this.updater = ae || j;
  }
  var R = O.prototype = new A();
  R.constructor = O, N(R, T.prototype), R.isPureReactComponent = !0;
  var V = Array.isArray;
  function X() {
  }
  var ie = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function H(_, te, ae) {
    var G = ae.ref;
    return {
      $$typeof: t,
      type: _,
      key: te,
      ref: G !== void 0 ? G : null,
      props: ae
    };
  }
  function z(_, te) {
    return H(_.type, te, _.props);
  }
  function F(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function W(_) {
    var te = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(ae) {
      return te[ae];
    });
  }
  var K = /\/+/g;
  function le(_, te) {
    return typeof _ == "object" && _ !== null && _.key != null ? W("" + _.key) : te.toString(36);
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
  function k(_, te, ae, G, $) {
    var ee = typeof _;
    (ee === "undefined" || ee === "boolean") && (_ = null);
    var ue = !1;
    if (_ === null) ue = !0;
    else
      switch (ee) {
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
                te,
                ae,
                G,
                $
              );
          }
      }
    if (ue)
      return $ = $(_), ue = G === "" ? "." + le(_, 0) : G, V($) ? (ae = "", ue != null && (ae = ue.replace(K, "$&/") + "/"), k($, te, ae, "", function(ot) {
        return ot;
      })) : $ != null && (F($) && ($ = z(
        $,
        ae + ($.key == null || _ && _.key === $.key ? "" : ("" + $.key).replace(
          K,
          "$&/"
        ) + "/") + ue
      )), te.push($)), 1;
    ue = 0;
    var pe = G === "" ? "." : G + ":";
    if (V(_))
      for (var Ce = 0; Ce < _.length; Ce++)
        G = _[Ce], ee = pe + le(G, Ce), ue += k(
          G,
          te,
          ae,
          ee,
          $
        );
    else if (Ce = S(_), typeof Ce == "function")
      for (_ = Ce.call(_), Ce = 0; !(G = _.next()).done; )
        G = G.value, ee = pe + le(G, Ce++), ue += k(
          G,
          te,
          ae,
          ee,
          $
        );
    else if (ee === "object") {
      if (typeof _.then == "function")
        return k(
          ne(_),
          te,
          ae,
          G,
          $
        );
      throw te = String(_), Error(
        "Objects are not valid as a React child (found: " + (te === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : te) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ue;
  }
  function U(_, te, ae) {
    if (_ == null) return _;
    var G = [], $ = 0;
    return k(_, G, "", "", function(ee) {
      return te.call(ae, ee, $++);
    }), G;
  }
  function q(_) {
    if (_._status === -1) {
      var te = _._result;
      te = te(), te.then(
        function(ae) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = ae);
        },
        function(ae) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = ae);
        }
      ), _._status === -1 && (_._status = 0, _._result = te);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var Y = typeof reportError == "function" ? reportError : function(_) {
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
    forEach: function(_, te, ae) {
      U(
        _,
        function() {
          te.apply(this, arguments);
        },
        ae
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
      if (!F(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return He.Activity = v, He.Children = ce, He.Component = T, He.Fragment = i, He.Profiler = o, He.PureComponent = O, He.StrictMode = s, He.Suspense = g, He.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ie, He.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ie.H.useMemoCache(_);
    }
  }, He.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, He.cacheSignal = function() {
    return null;
  }, He.cloneElement = function(_, te, ae) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var G = N({}, _.props), $ = _.key;
    if (te != null)
      for (ee in te.key !== void 0 && ($ = "" + te.key), te)
        !M.call(te, ee) || ee === "key" || ee === "__self" || ee === "__source" || ee === "ref" && te.ref === void 0 || (G[ee] = te[ee]);
    var ee = arguments.length - 2;
    if (ee === 1) G.children = ae;
    else if (1 < ee) {
      for (var ue = Array(ee), pe = 0; pe < ee; pe++)
        ue[pe] = arguments[pe + 2];
      G.children = ue;
    }
    return H(_.type, $, G);
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
  }, He.createElement = function(_, te, ae) {
    var G, $ = {}, ee = null;
    if (te != null)
      for (G in te.key !== void 0 && (ee = "" + te.key), te)
        M.call(te, G) && G !== "key" && G !== "__self" && G !== "__source" && ($[G] = te[G]);
    var ue = arguments.length - 2;
    if (ue === 1) $.children = ae;
    else if (1 < ue) {
      for (var pe = Array(ue), Ce = 0; Ce < ue; Ce++)
        pe[Ce] = arguments[Ce + 2];
      $.children = pe;
    }
    if (_ && _.defaultProps)
      for (G in ue = _.defaultProps, ue)
        $[G] === void 0 && ($[G] = ue[G]);
    return H(_, ee, $);
  }, He.createRef = function() {
    return { current: null };
  }, He.forwardRef = function(_) {
    return { $$typeof: m, render: _ };
  }, He.isValidElement = F, He.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: q
    };
  }, He.memo = function(_, te) {
    return {
      $$typeof: p,
      type: _,
      compare: te === void 0 ? null : te
    };
  }, He.startTransition = function(_) {
    var te = ie.T, ae = {};
    ie.T = ae;
    try {
      var G = _(), $ = ie.S;
      $ !== null && $(ae, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(X, Y);
    } catch (ee) {
      Y(ee);
    } finally {
      te !== null && ae.types !== null && (te.types = ae.types), ie.T = te;
    }
  }, He.unstable_useCacheRefresh = function() {
    return ie.H.useCacheRefresh();
  }, He.use = function(_) {
    return ie.H.use(_);
  }, He.useActionState = function(_, te, ae) {
    return ie.H.useActionState(_, te, ae);
  }, He.useCallback = function(_, te) {
    return ie.H.useCallback(_, te);
  }, He.useContext = function(_) {
    return ie.H.useContext(_);
  }, He.useDebugValue = function() {
  }, He.useDeferredValue = function(_, te) {
    return ie.H.useDeferredValue(_, te);
  }, He.useEffect = function(_, te) {
    return ie.H.useEffect(_, te);
  }, He.useEffectEvent = function(_) {
    return ie.H.useEffectEvent(_);
  }, He.useId = function() {
    return ie.H.useId();
  }, He.useImperativeHandle = function(_, te, ae) {
    return ie.H.useImperativeHandle(_, te, ae);
  }, He.useInsertionEffect = function(_, te) {
    return ie.H.useInsertionEffect(_, te);
  }, He.useLayoutEffect = function(_, te) {
    return ie.H.useLayoutEffect(_, te);
  }, He.useMemo = function(_, te) {
    return ie.H.useMemo(_, te);
  }, He.useOptimistic = function(_, te) {
    return ie.H.useOptimistic(_, te);
  }, He.useReducer = function(_, te, ae) {
    return ie.H.useReducer(_, te, ae);
  }, He.useRef = function(_) {
    return ie.H.useRef(_);
  }, He.useState = function(_) {
    return ie.H.useState(_);
  }, He.useSyncExternalStore = function(_, te, ae) {
    return ie.H.useSyncExternalStore(
      _,
      te,
      ae
    );
  }, He.useTransition = function() {
    return ie.H.useTransition();
  }, He.version = "19.2.5", He;
}
var ry;
function Th() {
  return ry || (ry = 1, tf.exports = oE()), tf.exports;
}
var y = Th();
const ge = /* @__PURE__ */ mx(y), cE = /* @__PURE__ */ iE({
  __proto__: null,
  default: ge
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
var iy;
function uE() {
  return iy || (iy = 1, (function(t) {
    function a(k, U) {
      var q = k.length;
      k.push(U);
      e: for (; 0 < q; ) {
        var Y = q - 1 >>> 1, ce = k[Y];
        if (0 < o(ce, U))
          k[Y] = U, k[q] = ce, q = Y;
        else break e;
      }
    }
    function i(k) {
      return k.length === 0 ? null : k[0];
    }
    function s(k) {
      if (k.length === 0) return null;
      var U = k[0], q = k.pop();
      if (q !== U) {
        k[0] = q;
        e: for (var Y = 0, ce = k.length, _ = ce >>> 1; Y < _; ) {
          var te = 2 * (Y + 1) - 1, ae = k[te], G = te + 1, $ = k[G];
          if (0 > o(ae, q))
            G < ce && 0 > o($, ae) ? (k[Y] = $, k[G] = q, Y = G) : (k[Y] = ae, k[te] = q, Y = te);
          else if (G < ce && 0 > o($, q))
            k[Y] = $, k[G] = q, Y = G;
          else break e;
        }
      }
      return U;
    }
    function o(k, U) {
      var q = k.sortIndex - U.sortIndex;
      return q !== 0 ? q : k.id - U.id;
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
    var g = [], p = [], b = 1, v = null, w = 3, S = !1, j = !1, N = !1, C = !1, T = typeof setTimeout == "function" ? setTimeout : null, A = typeof clearTimeout == "function" ? clearTimeout : null, O = typeof setImmediate < "u" ? setImmediate : null;
    function R(k) {
      for (var U = i(p); U !== null; ) {
        if (U.callback === null) s(p);
        else if (U.startTime <= k)
          s(p), U.sortIndex = U.expirationTime, a(g, U);
        else break;
        U = i(p);
      }
    }
    function V(k) {
      if (N = !1, R(k), !j)
        if (i(g) !== null)
          j = !0, X || (X = !0, W());
        else {
          var U = i(p);
          U !== null && ne(V, U.startTime - k);
        }
    }
    var X = !1, ie = -1, M = 5, H = -1;
    function z() {
      return C ? !0 : !(t.unstable_now() - H < M);
    }
    function F() {
      if (C = !1, X) {
        var k = t.unstable_now();
        H = k;
        var U = !0;
        try {
          e: {
            j = !1, N && (N = !1, A(ie), ie = -1), S = !0;
            var q = w;
            try {
              t: {
                for (R(k), v = i(g); v !== null && !(v.expirationTime > k && z()); ) {
                  var Y = v.callback;
                  if (typeof Y == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var ce = Y(
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
                  var _ = i(p);
                  _ !== null && ne(
                    V,
                    _.startTime - k
                  ), U = !1;
                }
              }
              break e;
            } finally {
              v = null, w = q, S = !1;
            }
            U = void 0;
          }
        } finally {
          U ? W() : X = !1;
        }
      }
    }
    var W;
    if (typeof O == "function")
      W = function() {
        O(F);
      };
    else if (typeof MessageChannel < "u") {
      var K = new MessageChannel(), le = K.port2;
      K.port1.onmessage = F, W = function() {
        le.postMessage(null);
      };
    } else
      W = function() {
        T(F, 0);
      };
    function ne(k, U) {
      ie = T(function() {
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
      var q = w;
      w = U;
      try {
        return k();
      } finally {
        w = q;
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
      var q = w;
      w = k;
      try {
        return U();
      } finally {
        w = q;
      }
    }, t.unstable_scheduleCallback = function(k, U, q) {
      var Y = t.unstable_now();
      switch (typeof q == "object" && q !== null ? (q = q.delay, q = typeof q == "number" && 0 < q ? Y + q : Y) : q = Y, k) {
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
        callback: U,
        priorityLevel: k,
        startTime: q,
        expirationTime: ce,
        sortIndex: -1
      }, q > Y ? (k.sortIndex = q, a(p, k), i(g) === null && k === i(p) && (N ? (A(ie), ie = -1) : N = !0, ne(V, q - Y))) : (k.sortIndex = ce, a(g, k), j || S || (j = !0, X || (X = !0, W()))), k;
    }, t.unstable_shouldYield = z, t.unstable_wrapCallback = function(k) {
      var U = w;
      return function() {
        var q = w;
        w = U;
        try {
          return k.apply(this, arguments);
        } finally {
          w = q;
        }
      };
    };
  })(rf)), rf;
}
var sy;
function dE() {
  return sy || (sy = 1, af.exports = uE()), af.exports;
}
var sf = { exports: {} }, hn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ly;
function fE() {
  if (ly) return hn;
  ly = 1;
  var t = Th();
  function a(g) {
    var p = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        p += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function u(g, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: p,
      implementation: b
    };
  }
  var f = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, hn.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return u(g, p, null, b);
  }, hn.flushSync = function(g) {
    var p = f.T, b = s.p;
    try {
      if (f.T = null, s.p = 2, g) return g();
    } finally {
      f.T = p, s.p = b, s.d.f();
    }
  }, hn.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(g, p));
  }, hn.prefetchDNS = function(g) {
    typeof g == "string" && s.d.D(g);
  }, hn.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), w = typeof p.integrity == "string" ? p.integrity : void 0, S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? s.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: w,
          fetchPriority: S
        }
      ) : b === "script" && s.d.X(g, {
        crossOrigin: v,
        integrity: w,
        fetchPriority: S,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, hn.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          s.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(g);
  }, hn.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      s.d.L(g, b, {
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
  }, hn.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        s.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(g);
  }, hn.requestFormReset = function(g) {
    s.d.r(g);
  }, hn.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, hn.useFormState = function(g, p, b) {
    return f.H.useFormState(g, p, b);
  }, hn.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, hn.version = "19.2.5", hn;
}
var oy;
function px() {
  if (oy) return sf.exports;
  oy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), sf.exports = fE(), sf.exports;
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
var cy;
function hE() {
  if (cy) return Xs;
  cy = 1;
  var t = dE(), a = Th(), i = px();
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
  function m(e) {
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
  function p(e) {
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
  var v = Object.assign, w = Symbol.for("react.element"), S = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), A = Symbol.for("react.consumer"), O = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), z = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
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
      case V:
        return "Suspense";
      case X:
        return "SuspenseList";
      case H:
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
        case ie:
          return n = e.displayName || null, n !== null ? n : le(e.type) || "Memo";
        case M:
          n = e._payload, e = e._init;
          try {
            return le(e(n));
          } catch {
          }
      }
    return null;
  }
  var ne = Array.isArray, k = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Y = [], ce = -1;
  function _(e) {
    return { current: e };
  }
  function te(e) {
    0 > ce || (e.current = Y[ce], Y[ce] = null, ce--);
  }
  function ae(e, n) {
    ce++, Y[ce] = e.current, e.current = n;
  }
  var G = _(null), $ = _(null), ee = _(null), ue = _(null);
  function pe(e, n) {
    switch (ae(ee, n), ae($, e), ae(G, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Eg(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Eg(n), e = Ng(n, e);
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
    te(G), ae(G, e);
  }
  function Ce() {
    te(G), te($), te(ee);
  }
  function ot(e) {
    e.memoizedState !== null && ae(ue, e);
    var n = G.current, r = Ng(n, e.type);
    n !== r && (ae($, e), ae(G, r));
  }
  function je(e) {
    $.current === e && (te(G), te($)), ue.current === e && (te(ue), Fs._currentValue = q);
  }
  var tt, Be;
  function $e(e) {
    if (tt === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        tt = n && n[1] || "", Be = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + tt + e + Be;
  }
  var Zt = !1;
  function Nt(e, n) {
    if (!e || Zt) return "";
    Zt = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var fe = function() {
                throw Error();
              };
              if (Object.defineProperty(fe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(fe, []);
                } catch (se) {
                  var re = se;
                }
                Reflect.construct(e, [], fe);
              } else {
                try {
                  fe.call();
                } catch (se) {
                  re = se;
                }
                e.call(fe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (se) {
                re = se;
              }
              (fe = e()) && typeof fe.catch == "function" && fe.catch(function() {
              });
            }
          } catch (se) {
            if (se && re && typeof se.stack == "string")
              return [se.stack, re.stack];
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
`), J = E.split(`
`);
        for (d = l = 0; l < L.length && !L[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; d < J.length && !J[d].includes(
          "DetermineComponentFrameRoot"
        ); )
          d++;
        if (l === L.length || d === J.length)
          for (l = L.length - 1, d = J.length - 1; 1 <= l && 0 <= d && L[l] !== J[d]; )
            d--;
        for (; 1 <= l && 0 <= d; l--, d--)
          if (L[l] !== J[d]) {
            if (l !== 1 || d !== 1)
              do
                if (l--, d--, 0 > d || L[l] !== J[d]) {
                  var oe = `
` + L[l].replace(" at new ", " at ");
                  return e.displayName && oe.includes("<anonymous>") && (oe = oe.replace("<anonymous>", e.displayName)), oe;
                }
              while (1 <= l && 0 <= d);
            break;
          }
      }
    } finally {
      Zt = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? $e(r) : "";
  }
  function kt(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return $e(e.type);
      case 16:
        return $e("Lazy");
      case 13:
        return e.child !== n && n !== null ? $e("Suspense Fallback") : $e("Suspense");
      case 19:
        return $e("SuspenseList");
      case 0:
      case 15:
        return Nt(e.type, !1);
      case 11:
        return Nt(e.type.render, !1);
      case 1:
        return Nt(e.type, !0);
      case 31:
        return $e("Activity");
      default:
        return "";
    }
  }
  function ra(e) {
    try {
      var n = "", r = null;
      do
        n += kt(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var xt = Object.prototype.hasOwnProperty, en = t.unstable_scheduleCallback, yn = t.unstable_cancelCallback, zt = t.unstable_shouldYield, bn = t.unstable_requestPaint, Ot = t.unstable_now, xe = t.unstable_getCurrentPriorityLevel, Oe = t.unstable_ImmediatePriority, Ze = t.unstable_UserBlockingPriority, it = t.unstable_NormalPriority, Rt = t.unstable_LowPriority, Lt = t.unstable_IdlePriority, he = t.log, ke = t.unstable_setDisableYieldValue, Ae = null, we = null;
  function ct(e) {
    if (typeof he == "function" && ke(e), we && typeof we.setStrictMode == "function")
      try {
        we.setStrictMode(Ae, e);
      } catch {
      }
  }
  var Ve = Math.clz32 ? Math.clz32 : vn, cn = Math.log, Hn = Math.LN2;
  function vn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (cn(e) / Hn | 0) | 0;
  }
  var qn = 256, tn = 262144, Mn = 4194304;
  function un(e) {
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
  function Le(e, n, r) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var d = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = l & 134217727;
    return E !== 0 ? (l = E & ~h, l !== 0 ? d = un(l) : (x &= E, x !== 0 ? d = un(x) : r || (r = E & ~e, r !== 0 && (d = un(r))))) : (E = l & ~h, E !== 0 ? d = un(E) : x !== 0 ? d = un(x) : r || (r = l & ~e, r !== 0 && (d = un(r)))), d === 0 ? 0 : n !== 0 && n !== d && (n & h) === 0 && (h = d & -d, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : d;
  }
  function st(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Mt(e, n) {
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
  function Xt() {
    var e = Mn;
    return Mn <<= 1, (Mn & 62914560) === 0 && (Mn = 4194304), e;
  }
  function An(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function ft(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function nn(e, n, r, l, d, h) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, J = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var oe = 31 - Ve(r), fe = 1 << oe;
      E[oe] = 0, L[oe] = -1;
      var re = J[oe];
      if (re !== null)
        for (J[oe] = null, oe = 0; oe < re.length; oe++) {
          var se = re[oe];
          se !== null && (se.lane &= -536870913);
        }
      r &= ~fe;
    }
    l !== 0 && Sa(e, l, 0), h !== 0 && d === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~n));
  }
  function Sa(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var l = 31 - Ve(n);
    e.entangledLanes |= n, e.entanglements[l] = e.entanglements[l] | 1073741824 | r & 261930;
  }
  function dn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var l = 31 - Ve(r), d = 1 << l;
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
  function Q(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function me() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Kg(e.type));
  }
  function ve(e, n) {
    var r = U.p;
    try {
      return U.p = e, n();
    } finally {
      U.p = r;
    }
  }
  var Ne = Math.random().toString(36).slice(2), ye = "__reactFiber$" + Ne, be = "__reactProps$" + Ne, Re = "__reactContainer$" + Ne, Se = "__reactEvents$" + Ne, ze = "__reactListeners$" + Ne, Me = "__reactHandles$" + Ne, nt = "__reactResources$" + Ne, Ye = "__reactMarker$" + Ne;
  function gt(e) {
    delete e[ye], delete e[be], delete e[Se], delete e[ze], delete e[Me];
  }
  function ht(e) {
    var n = e[ye];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Re] || r[ye]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Dg(e); e !== null; ) {
            if (r = e[ye]) return r;
            e = Dg(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function Tt(e) {
    if (e = e[ye] || e[Re]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Ke(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Ht(e) {
    var n = e[nt];
    return n || (n = e[nt] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function St(e) {
    e[Ye] = !0;
  }
  var Fa = /* @__PURE__ */ new Set(), ia = {};
  function Jt(e, n) {
    fa(e, n), fa(e + "Capture", n);
  }
  function fa(e, n) {
    for (ia[e] = n, e = 0; e < n.length; e++)
      Fa.add(n[e]);
  }
  var Tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ha = {}, Cr = {};
  function ti(e) {
    return xt.call(Cr, e) ? !0 : xt.call(ha, e) ? !1 : Tr.test(e) ? Cr[e] = !0 : (ha[e] = !0, !1);
  }
  function Ge(e, n, r) {
    if (ti(n))
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
  function Ut(e, n, r) {
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
  function fn(e, n, r, l) {
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
  function wt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ni(e, n, r) {
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
  function ai(e) {
    if (!e._valueTracker) {
      var n = wt(e) ? "checked" : "value";
      e._valueTracker = ni(
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
    return e && (l = wt(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Ml(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var WS = /[\n"\\]/g;
  function In(e) {
    return e.replace(
      WS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Kc(e, n, r, l, d, h, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + qt(n)) : e.value !== "" + qt(n) && (e.value = "" + qt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Xc(e, x, qt(n)) : r != null ? Xc(e, x, qt(r)) : l != null && e.removeAttribute("value"), d == null && h != null && (e.defaultChecked = !!h), d != null && (e.checked = d && typeof d != "function" && typeof d != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + qt(E) : e.removeAttribute("name");
  }
  function ym(e, n, r, l, d, h, x, E) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + qt(r) : "", n = n != null ? "" + qt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    l = l ?? d, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = E ? e.checked : !!l, e.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ai(e);
  }
  function Xc(e, n, r) {
    n === "number" && Ml(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, n, r, l) {
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
  function bm(e, n, r) {
    if (n != null && (n = "" + qt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + qt(r) : "";
  }
  function xm(e, n, r, l) {
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
    r = qt(n), e.defaultValue = r, l = e.textContent, l === r && l !== "" && l !== null && (e.value = l), ai(e);
  }
  function ii(e, n) {
    if (n) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    e.textContent = n;
  }
  var ew = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Sm(e, n, r) {
    var l = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? l ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : l ? e.setProperty(n, r) : typeof r != "number" || r === 0 || ew.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function wm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (e = e.style, r != null) {
      for (var l in r)
        !r.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var d in n)
        l = n[d], n.hasOwnProperty(d) && r[d] !== l && Sm(e, d, l);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && Sm(e, h, n[h]);
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
  var tw = /* @__PURE__ */ new Map([
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
  ]), nw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Al(e) {
    return nw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function wa() {
  }
  var Zc = null;
  function Jc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var si = null, li = null;
  function jm(e) {
    var n = Tt(e);
    if (n && (e = n.stateNode)) {
      var r = e[be] || null;
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
              'input[name="' + In(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var l = r[n];
              if (l !== e && l.form === e.form) {
                var d = l[be] || null;
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
          bm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ri(e, !!r.multiple, n, !1);
      }
    }
  }
  var Wc = !1;
  function Em(e, n, r) {
    if (Wc) return e(n, r);
    Wc = !0;
    try {
      var l = e(n);
      return l;
    } finally {
      if (Wc = !1, (si !== null || li !== null) && (bo(), si && (n = si, e = li, li = si = null, jm(n), e)))
        for (n = 0; n < e.length; n++) jm(e[n]);
    }
  }
  function ls(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var l = r[be] || null;
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
  var ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), eu = !1;
  if (ja)
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
  function Nm() {
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
  function Tm() {
    return !1;
  }
  function xn(e) {
    function n(r, l, d, h, x) {
      this._reactName = r, this._targetInst = d, this.type = l, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(h) : h[E]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? zl : Tm, this.isPropagationStopped = Tm, this;
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
  }, Ol = xn(Rr), cs = v({}, Rr, { view: 0, detail: 0 }), aw = xn(cs), nu, au, us, Ll = v({}, cs, {
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
  }), Cm = xn(Ll), rw = v({}, Ll, { dataTransfer: 0 }), iw = xn(rw), sw = v({}, cs, { relatedTarget: 0 }), ru = xn(sw), lw = v({}, Rr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ow = xn(lw), cw = v({}, Rr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), uw = xn(cw), dw = v({}, Rr, { data: 0 }), Rm = xn(dw), fw = {
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
  }, hw = {
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
  }, mw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function pw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = mw[e]) ? !!n[e] : !1;
  }
  function iu() {
    return pw;
  }
  var vw = v({}, cs, {
    key: function(e) {
      if (e.key) {
        var n = fw[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hw[e.keyCode] || "Unidentified" : "";
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
  }), gw = xn(vw), yw = v({}, Ll, {
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
  }), _m = xn(yw), bw = v({}, cs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: iu
  }), xw = xn(bw), Sw = v({}, Rr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ww = xn(Sw), jw = v({}, Ll, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ew = xn(jw), Nw = v({}, Rr, {
    newState: 0,
    oldState: 0
  }), Tw = xn(Nw), Cw = [9, 13, 27, 32], su = ja && "CompositionEvent" in window, ds = null;
  ja && "documentMode" in document && (ds = document.documentMode);
  var Rw = ja && "TextEvent" in window && !ds, Mm = ja && (!su || ds && 8 < ds && 11 >= ds), Am = " ", Dm = !1;
  function km(e, n) {
    switch (e) {
      case "keyup":
        return Cw.indexOf(n.keyCode) !== -1;
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
  function zm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function _w(e, n) {
    switch (e) {
      case "compositionend":
        return zm(n);
      case "keypress":
        return n.which !== 32 ? null : (Dm = !0, Am);
      case "textInput":
        return e = n.data, e === Am && Dm ? null : e;
      default:
        return null;
    }
  }
  function Mw(e, n) {
    if (oi)
      return e === "compositionend" || !su && km(e, n) ? (e = Nm(), Dl = tu = Ya = null, oi = !1, e) : null;
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
        return Mm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Aw = {
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
  function Om(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!Aw[e.type] : n === "textarea";
  }
  function Lm(e, n, r, l) {
    si ? li ? li.push(l) : li = [l] : si = l, n = To(n, "onChange"), 0 < n.length && (r = new Ol(
      "onChange",
      "change",
      null,
      r,
      l
    ), e.push({ event: r, listeners: n }));
  }
  var fs = null, hs = null;
  function Dw(e) {
    yg(e, 0);
  }
  function Ul(e) {
    var n = Ke(e);
    if (_l(n)) return e;
  }
  function Um(e, n) {
    if (e === "change") return n;
  }
  var $m = !1;
  if (ja) {
    var lu;
    if (ja) {
      var ou = "oninput" in document;
      if (!ou) {
        var Bm = document.createElement("div");
        Bm.setAttribute("oninput", "return;"), ou = typeof Bm.oninput == "function";
      }
      lu = ou;
    } else lu = !1;
    $m = lu && (!document.documentMode || 9 < document.documentMode);
  }
  function Vm() {
    fs && (fs.detachEvent("onpropertychange", Hm), hs = fs = null);
  }
  function Hm(e) {
    if (e.propertyName === "value" && Ul(hs)) {
      var n = [];
      Lm(
        n,
        hs,
        e,
        Jc(e)
      ), Em(Dw, n);
    }
  }
  function kw(e, n, r) {
    e === "focusin" ? (Vm(), fs = n, hs = r, fs.attachEvent("onpropertychange", Hm)) : e === "focusout" && Vm();
  }
  function zw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ul(hs);
  }
  function Ow(e, n) {
    if (e === "click") return Ul(n);
  }
  function Lw(e, n) {
    if (e === "input" || e === "change")
      return Ul(n);
  }
  function Uw(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var Dn = typeof Object.is == "function" ? Object.is : Uw;
  function ms(e, n) {
    if (Dn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), l = Object.keys(n);
    if (r.length !== l.length) return !1;
    for (l = 0; l < r.length; l++) {
      var d = r[l];
      if (!xt.call(n, d) || !Dn(e[d], n[d]))
        return !1;
    }
    return !0;
  }
  function qm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Im(e, n) {
    var r = qm(e);
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
      r = qm(r);
    }
  }
  function Fm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Fm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Ym(e) {
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
  var $w = ja && "documentMode" in document && 11 >= document.documentMode, ci = null, uu = null, ps = null, du = !1;
  function Gm(e, n, r) {
    var l = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    du || ci == null || ci !== Ml(l) || (l = ci, "selectionStart" in l && cu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
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
    ), e.push({ event: n, listeners: l }), n.target = ci)));
  }
  function _r(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ui = {
    animationend: _r("Animation", "AnimationEnd"),
    animationiteration: _r("Animation", "AnimationIteration"),
    animationstart: _r("Animation", "AnimationStart"),
    transitionrun: _r("Transition", "TransitionRun"),
    transitionstart: _r("Transition", "TransitionStart"),
    transitioncancel: _r("Transition", "TransitionCancel"),
    transitionend: _r("Transition", "TransitionEnd")
  }, fu = {}, Pm = {};
  ja && (Pm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Mr(e) {
    if (fu[e]) return fu[e];
    if (!ui[e]) return e;
    var n = ui[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Pm)
        return fu[e] = n[r];
    return e;
  }
  var Km = Mr("animationend"), Xm = Mr("animationiteration"), Qm = Mr("animationstart"), Bw = Mr("transitionrun"), Vw = Mr("transitionstart"), Hw = Mr("transitioncancel"), Zm = Mr("transitionend"), Jm = /* @__PURE__ */ new Map(), hu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hu.push("scrollEnd");
  function sa(e, n) {
    Jm.set(e, n), Jt(n, [e]);
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
  }, Fn = [], di = 0, mu = 0;
  function Bl() {
    for (var e = di, n = mu = di = 0; n < e; ) {
      var r = Fn[n];
      Fn[n++] = null;
      var l = Fn[n];
      Fn[n++] = null;
      var d = Fn[n];
      Fn[n++] = null;
      var h = Fn[n];
      if (Fn[n++] = null, l !== null && d !== null) {
        var x = l.pending;
        x === null ? d.next = d : (d.next = x.next, x.next = d), l.pending = d;
      }
      h !== 0 && Wm(r, d, h);
    }
  }
  function Vl(e, n, r, l) {
    Fn[di++] = e, Fn[di++] = n, Fn[di++] = r, Fn[di++] = l, mu |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function pu(e, n, r, l) {
    return Vl(e, n, r, l), Hl(e);
  }
  function Ar(e, n) {
    return Vl(e, null, null, n), Hl(e);
  }
  function Wm(e, n, r) {
    e.lanes |= r;
    var l = e.alternate;
    l !== null && (l.lanes |= r);
    for (var d = !1, h = e.return; h !== null; )
      h.childLanes |= r, l = h.alternate, l !== null && (l.childLanes |= r), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (d = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, d && n !== null && (d = 31 - Ve(r), e = h.hiddenUpdates, l = e[d], l === null ? e[d] = [n] : l.push(n), n.lane = r | 536870912), h) : null;
  }
  function Hl(e) {
    if (50 < Us)
      throw Us = 0, Ed = null, Error(s(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function qw(e, n, r, l) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kn(e, n, r, l) {
    return new qw(e, n, r, l);
  }
  function vu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, n) {
    var r = e.alternate;
    return r === null ? (r = kn(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function ep(e, n) {
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
      x = Pj(
        e,
        r,
        G.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case H:
          return e = kn(31, r, n, d), e.elementType = H, e.lanes = h, e;
        case N:
          return Dr(r.children, d, h, n);
        case C:
          x = 8, d |= 24;
          break;
        case T:
          return e = kn(12, r, n, d | 2), e.elementType = T, e.lanes = h, e;
        case V:
          return e = kn(13, r, n, d), e.elementType = V, e.lanes = h, e;
        case X:
          return e = kn(19, r, n, d), e.elementType = X, e.lanes = h, e;
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
              case ie:
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
    return n = kn(x, r, n, d), n.elementType = e, n.type = l, n.lanes = h, n;
  }
  function Dr(e, n, r, l) {
    return e = kn(7, e, l, n), e.lanes = r, e;
  }
  function gu(e, n, r) {
    return e = kn(6, e, null, n), e.lanes = r, e;
  }
  function tp(e) {
    var n = kn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function yu(e, n, r) {
    return n = kn(
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
  var np = /* @__PURE__ */ new WeakMap();
  function Yn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = np.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: ra(n)
      }, np.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: ra(n)
    };
  }
  var hi = [], mi = 0, Il = null, vs = 0, Gn = [], Pn = 0, Ga = null, ma = 1, pa = "";
  function Na(e, n) {
    hi[mi++] = vs, hi[mi++] = Il, Il = e, vs = n;
  }
  function ap(e, n, r) {
    Gn[Pn++] = ma, Gn[Pn++] = pa, Gn[Pn++] = Ga, Ga = e;
    var l = ma;
    e = pa;
    var d = 32 - Ve(l) - 1;
    l &= ~(1 << d), r += 1;
    var h = 32 - Ve(n) + d;
    if (30 < h) {
      var x = d - d % 5;
      h = (l & (1 << x) - 1).toString(32), l >>= x, d -= x, ma = 1 << 32 - Ve(n) + d | r << d | l, pa = h + e;
    } else
      ma = 1 << h | r << d | l, pa = e;
  }
  function bu(e) {
    e.return !== null && (Na(e, 1), ap(e, 1, 0));
  }
  function xu(e) {
    for (; e === Il; )
      Il = hi[--mi], hi[mi] = null, vs = hi[--mi], hi[mi] = null;
    for (; e === Ga; )
      Ga = Gn[--Pn], Gn[Pn] = null, pa = Gn[--Pn], Gn[Pn] = null, ma = Gn[--Pn], Gn[Pn] = null;
  }
  function rp(e, n) {
    Gn[Pn++] = ma, Gn[Pn++] = pa, Gn[Pn++] = Ga, ma = n.id, pa = n.overflow, Ga = e;
  }
  var an = null, jt = null, et = !1, Pa = null, Kn = !1, Su = Error(s(519));
  function Ka(e) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw gs(Yn(n, e)), Su;
  }
  function ip(e) {
    var n = e.stateNode, r = e.type, l = e.memoizedProps;
    switch (n[ye] = e, n[be] = l, r) {
      case "dialog":
        Qe("cancel", n), Qe("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Qe("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Bs.length; r++)
          Qe(Bs[r], n);
        break;
      case "source":
        Qe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Qe("error", n), Qe("load", n);
        break;
      case "details":
        Qe("toggle", n);
        break;
      case "input":
        Qe("invalid", n), ym(
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
        Qe("invalid", n);
        break;
      case "textarea":
        Qe("invalid", n), xm(n, l.value, l.defaultValue, l.children);
    }
    r = l.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || l.suppressHydrationWarning === !0 || wg(n.textContent, r) ? (l.popover != null && (Qe("beforetoggle", n), Qe("toggle", n)), l.onScroll != null && Qe("scroll", n), l.onScrollEnd != null && Qe("scrollend", n), l.onClick != null && (n.onclick = wa), n = !0) : n = !1, n || Ka(e, !0);
  }
  function sp(e) {
    for (an = e.return; an; )
      switch (an.tag) {
        case 5:
        case 31:
        case 13:
          Kn = !1;
          return;
        case 27:
        case 3:
          Kn = !0;
          return;
        default:
          an = an.return;
      }
  }
  function pi(e) {
    if (e !== an) return !1;
    if (!et) return sp(e), et = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Bd(e.type, e.memoizedProps)), r = !r), r && jt && Ka(e), sp(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      jt = Ag(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      jt = Ag(e);
    } else
      n === 27 ? (n = jt, or(e.type) ? (e = Fd, Fd = null, jt = e) : jt = n) : jt = an ? Qn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kr() {
    jt = an = null, et = !1;
  }
  function wu() {
    var e = Pa;
    return e !== null && (En === null ? En = e : En.push.apply(
      En,
      e
    ), Pa = null), e;
  }
  function gs(e) {
    Pa === null ? Pa = [e] : Pa.push(e);
  }
  var ju = _(null), zr = null, Ta = null;
  function Xa(e, n, r) {
    ae(ju, n._currentValue), n._currentValue = r;
  }
  function Ca(e) {
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
  function vi(e, n, r, l) {
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
          Dn(d.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (d === ue.current) {
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
      if (!Dn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Or(e) {
    zr = e, Ta = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function rn(e) {
    return lp(zr, e);
  }
  function Yl(e, n) {
    return zr === null && Or(e), lp(e, n);
  }
  function lp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Ta === null) {
      if (e === null) throw Error(s(308));
      Ta = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else Ta = Ta.next = n;
    return r;
  }
  var Iw = typeof AbortController < "u" ? AbortController : function() {
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
  }, Fw = t.unstable_scheduleCallback, Yw = t.unstable_NormalPriority, It = {
    $$typeof: O,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Tu() {
    return {
      controller: new Iw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ys(e) {
    e.refCount--, e.refCount === 0 && Fw(Yw, function() {
      e.controller.abort();
    });
  }
  var bs = null, Cu = 0, gi = 0, yi = null;
  function Gw(e, n) {
    if (bs === null) {
      var r = bs = [];
      Cu = 0, gi = Md(), yi = {
        status: "pending",
        value: void 0,
        then: function(l) {
          r.push(l);
        }
      };
    }
    return Cu++, n.then(op, op), n;
  }
  function op() {
    if (--Cu === 0 && bs !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = bs;
      bs = null, gi = 0, yi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Pw(e, n) {
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
  var cp = k.S;
  k.S = function(e, n) {
    Gv = Ot(), typeof n == "object" && n !== null && typeof n.then == "function" && Gw(e, n), cp !== null && cp(e, n);
  };
  var Lr = _(null);
  function Ru() {
    var e = Lr.current;
    return e !== null ? e : yt.pooledCache;
  }
  function Gl(e, n) {
    n === null ? ae(Lr, Lr.current) : ae(Lr, n.pool);
  }
  function up() {
    var e = Ru();
    return e === null ? null : { parent: It._currentValue, pool: e };
  }
  var bi = Error(s(460)), _u = Error(s(474)), Pl = Error(s(542)), Kl = { then: function() {
  } };
  function dp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function fp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(wa, wa), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, mp(e), e;
      default:
        if (typeof n.status == "string") n.then(wa, wa);
        else {
          if (e = yt, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = n.reason, mp(e), e;
        }
        throw $r = n, bi;
    }
  }
  function Ur(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? ($r = r, bi) : r;
    }
  }
  var $r = null;
  function hp() {
    if ($r === null) throw Error(s(459));
    var e = $r;
    return $r = null, e;
  }
  function mp(e) {
    if (e === bi || e === Pl)
      throw Error(s(483));
  }
  var xi = null, xs = 0;
  function Xl(e) {
    var n = xs;
    return xs += 1, xi === null && (xi = []), fp(xi, e, n);
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
  function pp(e) {
    function n(P, B) {
      if (e) {
        var Z = P.deletions;
        Z === null ? (P.deletions = [B], P.flags |= 16) : Z.push(B);
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
    function h(P, B, Z) {
      return P.index = Z, e ? (Z = P.alternate, Z !== null ? (Z = Z.index, Z < B ? (P.flags |= 67108866, B) : Z) : (P.flags |= 67108866, B)) : (P.flags |= 1048576, B);
    }
    function x(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function E(P, B, Z, de) {
      return B === null || B.tag !== 6 ? (B = gu(Z, P.mode, de), B.return = P, B) : (B = d(B, Z), B.return = P, B);
    }
    function L(P, B, Z, de) {
      var De = Z.type;
      return De === N ? oe(
        P,
        B,
        Z.props.children,
        de,
        Z.key
      ) : B !== null && (B.elementType === De || typeof De == "object" && De !== null && De.$$typeof === M && Ur(De) === B.type) ? (B = d(B, Z.props), Ss(B, Z), B.return = P, B) : (B = ql(
        Z.type,
        Z.key,
        Z.props,
        null,
        P.mode,
        de
      ), Ss(B, Z), B.return = P, B);
    }
    function J(P, B, Z, de) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== Z.containerInfo || B.stateNode.implementation !== Z.implementation ? (B = yu(Z, P.mode, de), B.return = P, B) : (B = d(B, Z.children || []), B.return = P, B);
    }
    function oe(P, B, Z, de, De) {
      return B === null || B.tag !== 7 ? (B = Dr(
        Z,
        P.mode,
        de,
        De
      ), B.return = P, B) : (B = d(B, Z), B.return = P, B);
    }
    function fe(P, B, Z) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = gu(
          "" + B,
          P.mode,
          Z
        ), B.return = P, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case S:
            return Z = ql(
              B.type,
              B.key,
              B.props,
              null,
              P.mode,
              Z
            ), Ss(Z, B), Z.return = P, Z;
          case j:
            return B = yu(
              B,
              P.mode,
              Z
            ), B.return = P, B;
          case M:
            return B = Ur(B), fe(P, B, Z);
        }
        if (ne(B) || W(B))
          return B = Dr(
            B,
            P.mode,
            Z,
            null
          ), B.return = P, B;
        if (typeof B.then == "function")
          return fe(P, Xl(B), Z);
        if (B.$$typeof === O)
          return fe(
            P,
            Yl(P, B),
            Z
          );
        Ql(P, B);
      }
      return null;
    }
    function re(P, B, Z, de) {
      var De = B !== null ? B.key : null;
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return De !== null ? null : E(P, B, "" + Z, de);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case S:
            return Z.key === De ? L(P, B, Z, de) : null;
          case j:
            return Z.key === De ? J(P, B, Z, de) : null;
          case M:
            return Z = Ur(Z), re(P, B, Z, de);
        }
        if (ne(Z) || W(Z))
          return De !== null ? null : oe(P, B, Z, de, null);
        if (typeof Z.then == "function")
          return re(
            P,
            B,
            Xl(Z),
            de
          );
        if (Z.$$typeof === O)
          return re(
            P,
            B,
            Yl(P, Z),
            de
          );
        Ql(P, Z);
      }
      return null;
    }
    function se(P, B, Z, de, De) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return P = P.get(Z) || null, E(B, P, "" + de, De);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case S:
            return P = P.get(
              de.key === null ? Z : de.key
            ) || null, L(B, P, de, De);
          case j:
            return P = P.get(
              de.key === null ? Z : de.key
            ) || null, J(B, P, de, De);
          case M:
            return de = Ur(de), se(
              P,
              B,
              Z,
              de,
              De
            );
        }
        if (ne(de) || W(de))
          return P = P.get(Z) || null, oe(B, P, de, De, null);
        if (typeof de.then == "function")
          return se(
            P,
            B,
            Z,
            Xl(de),
            De
          );
        if (de.$$typeof === O)
          return se(
            P,
            B,
            Z,
            Yl(B, de),
            De
          );
        Ql(B, de);
      }
      return null;
    }
    function Ee(P, B, Z, de) {
      for (var De = null, at = null, _e = B, Ie = B = 0, We = null; _e !== null && Ie < Z.length; Ie++) {
        _e.index > Ie ? (We = _e, _e = null) : We = _e.sibling;
        var rt = re(
          P,
          _e,
          Z[Ie],
          de
        );
        if (rt === null) {
          _e === null && (_e = We);
          break;
        }
        e && _e && rt.alternate === null && n(P, _e), B = h(rt, B, Ie), at === null ? De = rt : at.sibling = rt, at = rt, _e = We;
      }
      if (Ie === Z.length)
        return r(P, _e), et && Na(P, Ie), De;
      if (_e === null) {
        for (; Ie < Z.length; Ie++)
          _e = fe(P, Z[Ie], de), _e !== null && (B = h(
            _e,
            B,
            Ie
          ), at === null ? De = _e : at.sibling = _e, at = _e);
        return et && Na(P, Ie), De;
      }
      for (_e = l(_e); Ie < Z.length; Ie++)
        We = se(
          _e,
          P,
          Ie,
          Z[Ie],
          de
        ), We !== null && (e && We.alternate !== null && _e.delete(
          We.key === null ? Ie : We.key
        ), B = h(
          We,
          B,
          Ie
        ), at === null ? De = We : at.sibling = We, at = We);
      return e && _e.forEach(function(hr) {
        return n(P, hr);
      }), et && Na(P, Ie), De;
    }
    function Ue(P, B, Z, de) {
      if (Z == null) throw Error(s(151));
      for (var De = null, at = null, _e = B, Ie = B = 0, We = null, rt = Z.next(); _e !== null && !rt.done; Ie++, rt = Z.next()) {
        _e.index > Ie ? (We = _e, _e = null) : We = _e.sibling;
        var hr = re(P, _e, rt.value, de);
        if (hr === null) {
          _e === null && (_e = We);
          break;
        }
        e && _e && hr.alternate === null && n(P, _e), B = h(hr, B, Ie), at === null ? De = hr : at.sibling = hr, at = hr, _e = We;
      }
      if (rt.done)
        return r(P, _e), et && Na(P, Ie), De;
      if (_e === null) {
        for (; !rt.done; Ie++, rt = Z.next())
          rt = fe(P, rt.value, de), rt !== null && (B = h(rt, B, Ie), at === null ? De = rt : at.sibling = rt, at = rt);
        return et && Na(P, Ie), De;
      }
      for (_e = l(_e); !rt.done; Ie++, rt = Z.next())
        rt = se(_e, P, Ie, rt.value, de), rt !== null && (e && rt.alternate !== null && _e.delete(rt.key === null ? Ie : rt.key), B = h(rt, B, Ie), at === null ? De = rt : at.sibling = rt, at = rt);
      return e && _e.forEach(function(rE) {
        return n(P, rE);
      }), et && Na(P, Ie), De;
    }
    function vt(P, B, Z, de) {
      if (typeof Z == "object" && Z !== null && Z.type === N && Z.key === null && (Z = Z.props.children), typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case S:
            e: {
              for (var De = Z.key; B !== null; ) {
                if (B.key === De) {
                  if (De = Z.type, De === N) {
                    if (B.tag === 7) {
                      r(
                        P,
                        B.sibling
                      ), de = d(
                        B,
                        Z.props.children
                      ), de.return = P, P = de;
                      break e;
                    }
                  } else if (B.elementType === De || typeof De == "object" && De !== null && De.$$typeof === M && Ur(De) === B.type) {
                    r(
                      P,
                      B.sibling
                    ), de = d(B, Z.props), Ss(de, Z), de.return = P, P = de;
                    break e;
                  }
                  r(P, B);
                  break;
                } else n(P, B);
                B = B.sibling;
              }
              Z.type === N ? (de = Dr(
                Z.props.children,
                P.mode,
                de,
                Z.key
              ), de.return = P, P = de) : (de = ql(
                Z.type,
                Z.key,
                Z.props,
                null,
                P.mode,
                de
              ), Ss(de, Z), de.return = P, P = de);
            }
            return x(P);
          case j:
            e: {
              for (De = Z.key; B !== null; ) {
                if (B.key === De)
                  if (B.tag === 4 && B.stateNode.containerInfo === Z.containerInfo && B.stateNode.implementation === Z.implementation) {
                    r(
                      P,
                      B.sibling
                    ), de = d(B, Z.children || []), de.return = P, P = de;
                    break e;
                  } else {
                    r(P, B);
                    break;
                  }
                else n(P, B);
                B = B.sibling;
              }
              de = yu(Z, P.mode, de), de.return = P, P = de;
            }
            return x(P);
          case M:
            return Z = Ur(Z), vt(
              P,
              B,
              Z,
              de
            );
        }
        if (ne(Z))
          return Ee(
            P,
            B,
            Z,
            de
          );
        if (W(Z)) {
          if (De = W(Z), typeof De != "function") throw Error(s(150));
          return Z = De.call(Z), Ue(
            P,
            B,
            Z,
            de
          );
        }
        if (typeof Z.then == "function")
          return vt(
            P,
            B,
            Xl(Z),
            de
          );
        if (Z.$$typeof === O)
          return vt(
            P,
            B,
            Yl(P, Z),
            de
          );
        Ql(P, Z);
      }
      return typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint" ? (Z = "" + Z, B !== null && B.tag === 6 ? (r(P, B.sibling), de = d(B, Z), de.return = P, P = de) : (r(P, B), de = gu(Z, P.mode, de), de.return = P, P = de), x(P)) : r(P, B);
    }
    return function(P, B, Z, de) {
      try {
        xs = 0;
        var De = vt(
          P,
          B,
          Z,
          de
        );
        return xi = null, De;
      } catch (_e) {
        if (_e === bi || _e === Pl) throw _e;
        var at = kn(29, _e, null, P.mode);
        return at.lanes = de, at.return = P, at;
      } finally {
      }
    };
  }
  var Br = pp(!0), vp = pp(!1), Qa = !1;
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
    if (l = l.shared, (lt & 2) !== 0) {
      var d = l.pending;
      return d === null ? n.next = n : (n.next = d.next, d.next = n), l.pending = n, n = Hl(e), Wm(e, null, r), n;
    }
    return Vl(e, l, n, r), Hl(e);
  }
  function ws(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, dn(e, r);
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
      var e = yi;
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
      var L = E, J = L.next;
      L.next = null, x === null ? h = J : x.next = J, x = L;
      var oe = e.alternate;
      oe !== null && (oe = oe.updateQueue, E = oe.lastBaseUpdate, E !== x && (E === null ? oe.firstBaseUpdate = J : E.next = J, oe.lastBaseUpdate = L));
    }
    if (h !== null) {
      var fe = d.baseState;
      x = 0, oe = J = L = null, E = h;
      do {
        var re = E.lane & -536870913, se = re !== E.lane;
        if (se ? (Je & re) === re : (l & re) === re) {
          re !== 0 && re === gi && (ku = !0), oe !== null && (oe = oe.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ee = e, Ue = E;
            re = n;
            var vt = r;
            switch (Ue.tag) {
              case 1:
                if (Ee = Ue.payload, typeof Ee == "function") {
                  fe = Ee.call(vt, fe, re);
                  break e;
                }
                fe = Ee;
                break e;
              case 3:
                Ee.flags = Ee.flags & -65537 | 128;
              case 0:
                if (Ee = Ue.payload, re = typeof Ee == "function" ? Ee.call(vt, fe, re) : Ee, re == null) break e;
                fe = v({}, fe, re);
                break e;
              case 2:
                Qa = !0;
            }
          }
          re = E.callback, re !== null && (e.flags |= 64, se && (e.flags |= 8192), se = d.callbacks, se === null ? d.callbacks = [re] : se.push(re));
        } else
          se = {
            lane: re,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, oe === null ? (J = oe = se, L = fe) : oe = oe.next = se, x |= re;
        if (E = E.next, E === null) {
          if (E = d.shared.pending, E === null)
            break;
          se = E, E = se.next, se.next = null, d.lastBaseUpdate = se, d.shared.pending = null;
        }
      } while (!0);
      oe === null && (L = fe), d.baseState = L, d.firstBaseUpdate = J, d.lastBaseUpdate = oe, h === null && (d.shared.lanes = 0), ar |= x, e.lanes = x, e.memoizedState = fe;
    }
  }
  function gp(e, n) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(n);
  }
  function yp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        gp(r[e], n);
  }
  var Si = _(null), Zl = _(0);
  function bp(e, n) {
    e = La, ae(Zl, e), ae(Si, n), La = e | n.baseLanes;
  }
  function zu() {
    ae(Zl, La), ae(Si, Si.current);
  }
  function Ou() {
    La = Zl.current, te(Si), te(Zl);
  }
  var zn = _(null), Xn = null;
  function Wa(e) {
    var n = e.alternate;
    ae($t, $t.current & 1), ae(zn, e), Xn === null && (n === null || Si.current !== null || n.memoizedState !== null) && (Xn = e);
  }
  function Lu(e) {
    ae($t, $t.current), ae(zn, e), Xn === null && (Xn = e);
  }
  function xp(e) {
    e.tag === 22 ? (ae($t, $t.current), ae(zn, e), Xn === null && (Xn = e)) : er();
  }
  function er() {
    ae($t, $t.current), ae(zn, zn.current);
  }
  function On(e) {
    te(zn), Xn === e && (Xn = null), te($t);
  }
  var $t = _(0);
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
  var Ra = 0, qe = null, mt = null, Ft = null, Wl = !1, wi = !1, Vr = !1, eo = 0, Ns = 0, ji = null, Kw = 0;
  function At() {
    throw Error(s(321));
  }
  function Uu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!Dn(e[r], n[r])) return !1;
    return !0;
  }
  function $u(e, n, r, l, d, h) {
    return Ra = h, qe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, k.H = e === null || e.memoizedState === null ? av : Wu, Vr = !1, h = r(l, d), Vr = !1, wi && (h = wp(
      n,
      r,
      l,
      d
    )), Sp(e), h;
  }
  function Sp(e) {
    k.H = Rs;
    var n = mt !== null && mt.next !== null;
    if (Ra = 0, Ft = mt = qe = null, Wl = !1, Ns = 0, ji = null, n) throw Error(s(300));
    e === null || Yt || (e = e.dependencies, e !== null && Fl(e) && (Yt = !0));
  }
  function wp(e, n, r, l) {
    qe = e;
    var d = 0;
    do {
      if (wi && (ji = null), Ns = 0, wi = !1, 25 <= d) throw Error(s(301));
      if (d += 1, Ft = mt = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      k.H = rv, h = n(r, l);
    } while (wi);
    return h;
  }
  function Xw() {
    var e = k.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ts(n) : n, e = e.useState()[0], (mt !== null ? mt.memoizedState : null) !== e && (qe.flags |= 1024), n;
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
    Ra = 0, Ft = mt = qe = null, wi = !1, Ns = eo = 0, ji = null;
  }
  function gn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ft === null ? qe.memoizedState = Ft = e : Ft = Ft.next = e, Ft;
  }
  function Bt() {
    if (mt === null) {
      var e = qe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = mt.next;
    var n = Ft === null ? qe.memoizedState : Ft.next;
    if (n !== null)
      Ft = n, mt = e;
    else {
      if (e === null)
        throw qe.alternate === null ? Error(s(467)) : Error(s(310));
      mt = e, e = {
        memoizedState: mt.memoizedState,
        baseState: mt.baseState,
        baseQueue: mt.baseQueue,
        queue: mt.queue,
        next: null
      }, Ft === null ? qe.memoizedState = Ft = e : Ft = Ft.next = e;
    }
    return Ft;
  }
  function to() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ts(e) {
    var n = Ns;
    return Ns += 1, ji === null && (ji = []), e = fp(ji, e, n), n = qe, (Ft === null ? n.memoizedState : Ft.next) === null && (n = n.alternate, k.H = n === null || n.memoizedState === null ? av : Wu), e;
  }
  function no(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ts(e);
      if (e.$$typeof === O) return rn(e);
    }
    throw Error(s(438, String(e)));
  }
  function qu(e) {
    var n = null, r = qe.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var l = qe.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
        data: l.data.map(function(d) {
          return d.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = to(), qe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), l = 0; l < e; l++)
        r[l] = z;
    return n.index++, r;
  }
  function _a(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ao(e) {
    var n = Bt();
    return Iu(n, mt, e);
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
      var E = x = null, L = null, J = n, oe = !1;
      do {
        var fe = J.lane & -536870913;
        if (fe !== J.lane ? (Je & fe) === fe : (Ra & fe) === fe) {
          var re = J.revertLane;
          if (re === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }), fe === gi && (oe = !0);
          else if ((Ra & re) === re) {
            J = J.next, re === gi && (oe = !0);
            continue;
          } else
            fe = {
              lane: 0,
              revertLane: J.revertLane,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }, L === null ? (E = L = fe, x = h) : L = L.next = fe, qe.lanes |= re, ar |= re;
          fe = J.action, Vr && r(h, fe), h = J.hasEagerState ? J.eagerState : r(h, fe);
        } else
          re = {
            lane: fe,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, L === null ? (E = L = re, x = h) : L = L.next = re, qe.lanes |= fe, ar |= fe;
        J = J.next;
      } while (J !== null && J !== n);
      if (L === null ? x = h : L.next = E, !Dn(h, e.memoizedState) && (Yt = !0, oe && (r = yi, r !== null)))
        throw r;
      e.memoizedState = h, e.baseState = x, e.baseQueue = L, l.lastRenderedState = h;
    }
    return d === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Fu(e) {
    var n = Bt(), r = n.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var l = r.dispatch, d = r.pending, h = n.memoizedState;
    if (d !== null) {
      r.pending = null;
      var x = d = d.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== d);
      Dn(h, n.memoizedState) || (Yt = !0), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, l];
  }
  function jp(e, n, r) {
    var l = qe, d = Bt(), h = et;
    if (h) {
      if (r === void 0) throw Error(s(407));
      r = r();
    } else r = n();
    var x = !Dn(
      (mt || d).memoizedState,
      r
    );
    if (x && (d.memoizedState = r, Yt = !0), d = d.queue, Pu(Tp.bind(null, l, d, e), [
      e
    ]), d.getSnapshot !== n || x || Ft !== null && Ft.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        Np.bind(
          null,
          l,
          d,
          r,
          n
        ),
        null
      ), yt === null) throw Error(s(349));
      h || (Ra & 127) !== 0 || Ep(l, n, r);
    }
    return r;
  }
  function Ep(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = qe.updateQueue, n === null ? (n = to(), qe.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Np(e, n, r, l) {
    n.value = r, n.getSnapshot = l, Cp(n) && Rp(e);
  }
  function Tp(e, n, r) {
    return r(function() {
      Cp(n) && Rp(e);
    });
  }
  function Cp(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !Dn(e, r);
    } catch {
      return !0;
    }
  }
  function Rp(e) {
    var n = Ar(e, 2);
    n !== null && Nn(n, e, 2);
  }
  function Yu(e) {
    var n = gn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        ct(!0);
        try {
          r();
        } finally {
          ct(!1);
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
  function _p(e, n, r, l) {
    return e.baseState = r, Iu(
      e,
      mt,
      typeof l == "function" ? l : _a
    );
  }
  function Qw(e, n, r, l, d) {
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
      k.T !== null ? r(!0) : h.isTransition = !1, l(h), r = n.pending, r === null ? (h.next = n.pending = h, Mp(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function Mp(e, n) {
    var r = n.action, l = n.payload, d = e.state;
    if (n.isTransition) {
      var h = k.T, x = {};
      k.T = x;
      try {
        var E = r(d, l), L = k.S;
        L !== null && L(x, E), Ap(e, n, E);
      } catch (J) {
        Gu(e, n, J);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), k.T = h;
      }
    } else
      try {
        h = r(d, l), Ap(e, n, h);
      } catch (J) {
        Gu(e, n, J);
      }
  }
  function Ap(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(l) {
        Dp(e, n, l);
      },
      function(l) {
        return Gu(e, n, l);
      }
    ) : Dp(e, n, r);
  }
  function Dp(e, n, r) {
    n.status = "fulfilled", n.value = r, kp(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Mp(e, r)));
  }
  function Gu(e, n, r) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        n.status = "rejected", n.reason = r, kp(n), n = n.next;
      while (n !== l);
    }
    e.action = null;
  }
  function kp(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function zp(e, n) {
    return n;
  }
  function Op(e, n) {
    if (et) {
      var r = yt.formState;
      if (r !== null) {
        e: {
          var l = qe;
          if (et) {
            if (jt) {
              t: {
                for (var d = jt, h = Kn; d.nodeType !== 8; ) {
                  if (!h) {
                    d = null;
                    break t;
                  }
                  if (d = Qn(
                    d.nextSibling
                  ), d === null) {
                    d = null;
                    break t;
                  }
                }
                h = d.data, d = h === "F!" || h === "F" ? d : null;
              }
              if (d) {
                jt = Qn(
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
    return r = gn(), r.memoizedState = r.baseState = n, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zp,
      lastRenderedState: n
    }, r.queue = l, r = ev.bind(
      null,
      qe,
      l
    ), l.dispatch = r, l = Yu(!1), h = Ju.bind(
      null,
      qe,
      !1,
      l.queue
    ), l = gn(), d = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = d, r = Qw.bind(
      null,
      qe,
      d,
      h,
      r
    ), d.dispatch = r, l.memoizedState = e, [n, r, !1];
  }
  function Lp(e) {
    var n = Bt();
    return Up(n, mt, e);
  }
  function Up(e, n, r) {
    if (n = Iu(
      e,
      n,
      zp
    )[0], e = ao(_a)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var l = Ts(n);
      } catch (x) {
        throw x === bi ? Pl : x;
      }
    else l = n;
    n = Bt();
    var d = n.queue, h = d.dispatch;
    return r !== n.memoizedState && (qe.flags |= 2048, Ei(
      9,
      { destroy: void 0 },
      Zw.bind(null, d, r),
      null
    )), [l, h, e];
  }
  function Zw(e, n) {
    e.action = n;
  }
  function $p(e) {
    var n = Bt(), r = mt;
    if (r !== null)
      return Up(n, r, e);
    Bt(), n = n.memoizedState, r = Bt();
    var l = r.queue.dispatch;
    return r.memoizedState = e, [n, l, !1];
  }
  function Ei(e, n, r, l) {
    return e = { tag: e, create: r, deps: l, inst: n, next: null }, n = qe.updateQueue, n === null && (n = to(), qe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (l = r.next, r.next = e, e.next = l, n.lastEffect = e), e;
  }
  function Bp() {
    return Bt().memoizedState;
  }
  function ro(e, n, r, l) {
    var d = gn();
    qe.flags |= e, d.memoizedState = Ei(
      1 | n,
      { destroy: void 0 },
      r,
      l === void 0 ? null : l
    );
  }
  function io(e, n, r, l) {
    var d = Bt();
    l = l === void 0 ? null : l;
    var h = d.memoizedState.inst;
    mt !== null && l !== null && Uu(l, mt.memoizedState.deps) ? d.memoizedState = Ei(n, h, r, l) : (qe.flags |= e, d.memoizedState = Ei(
      1 | n,
      h,
      r,
      l
    ));
  }
  function Vp(e, n) {
    ro(8390656, 8, e, n);
  }
  function Pu(e, n) {
    io(2048, 8, e, n);
  }
  function Jw(e) {
    qe.flags |= 4;
    var n = qe.updateQueue;
    if (n === null)
      n = to(), qe.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Hp(e) {
    var n = Bt().memoizedState;
    return Jw({ ref: n, nextImpl: e }), function() {
      if ((lt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function qp(e, n) {
    return io(4, 2, e, n);
  }
  function Ip(e, n) {
    return io(4, 4, e, n);
  }
  function Fp(e, n) {
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
  function Yp(e, n, r) {
    r = r != null ? r.concat([e]) : null, io(4, 4, Fp.bind(null, n, e), r);
  }
  function Ku() {
  }
  function Gp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    return n !== null && Uu(n, l[1]) ? l[0] : (r.memoizedState = [e, n], e);
  }
  function Pp(e, n) {
    var r = Bt();
    n = n === void 0 ? null : n;
    var l = r.memoizedState;
    if (n !== null && Uu(n, l[1]))
      return l[0];
    if (l = e(), Vr) {
      ct(!0);
      try {
        e();
      } finally {
        ct(!1);
      }
    }
    return r.memoizedState = [l, n], l;
  }
  function Xu(e, n, r) {
    return r === void 0 || (Ra & 1073741824) !== 0 && (Je & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Kv(), qe.lanes |= e, ar |= e, r);
  }
  function Kp(e, n, r, l) {
    return Dn(r, n) ? r : Si.current !== null ? (e = Xu(e, r, l), Dn(e, n) || (Yt = !0), e) : (Ra & 42) === 0 || (Ra & 1073741824) !== 0 && (Je & 261930) === 0 ? (Yt = !0, e.memoizedState = r) : (e = Kv(), qe.lanes |= e, ar |= e, n);
  }
  function Xp(e, n, r, l, d) {
    var h = U.p;
    U.p = h !== 0 && 8 > h ? h : 8;
    var x = k.T, E = {};
    k.T = E, Ju(e, !1, n, r);
    try {
      var L = d(), J = k.S;
      if (J !== null && J(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var oe = Pw(
          L,
          l
        );
        Cs(
          e,
          n,
          oe,
          $n(e)
        );
      } else
        Cs(
          e,
          n,
          l,
          $n(e)
        );
    } catch (fe) {
      Cs(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: fe },
        $n()
      );
    } finally {
      U.p = h, x !== null && E.types !== null && (x.types = E.types), k.T = x;
    }
  }
  function Ww() {
  }
  function Qu(e, n, r, l) {
    if (e.tag !== 5) throw Error(s(476));
    var d = Qp(e).queue;
    Xp(
      e,
      d,
      n,
      q,
      r === null ? Ww : function() {
        return Zp(e), r(l);
      }
    );
  }
  function Qp(e) {
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
  function Zp(e) {
    var n = Qp(e);
    n.next === null && (n = e.alternate.memoizedState), Cs(
      e,
      n.next.queue,
      {},
      $n()
    );
  }
  function Zu() {
    return rn(Fs);
  }
  function Jp() {
    return Bt().memoizedState;
  }
  function Wp() {
    return Bt().memoizedState;
  }
  function ej(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = $n();
          e = Za(r);
          var l = Ja(n, e, r);
          l !== null && (Nn(l, n, r), ws(l, n, r)), n = { cache: Tu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function tj(e, n, r) {
    var l = $n();
    r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, so(e) ? tv(n, r) : (r = pu(e, n, r, l), r !== null && (Nn(r, e, l), nv(r, n, l)));
  }
  function ev(e, n, r) {
    var l = $n();
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
    if (so(e)) tv(n, d);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var x = n.lastRenderedState, E = h(x, r);
          if (d.hasEagerState = !0, d.eagerState = E, Dn(E, x))
            return Vl(e, n, d, 0), yt === null && Bl(), !1;
        } catch {
        } finally {
        }
      if (r = pu(e, n, d, l), r !== null)
        return Nn(r, e, l), nv(r, n, l), !0;
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
      ), n !== null && Nn(n, e, 2);
  }
  function so(e) {
    var n = e.alternate;
    return e === qe || n !== null && n === qe;
  }
  function tv(e, n) {
    wi = Wl = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function nv(e, n, r) {
    if ((r & 4194048) !== 0) {
      var l = n.lanes;
      l &= e.pendingLanes, r |= l, n.lanes = r, dn(e, r);
    }
  }
  var Rs = {
    readContext: rn,
    use: no,
    useCallback: At,
    useContext: At,
    useEffect: At,
    useImperativeHandle: At,
    useLayoutEffect: At,
    useInsertionEffect: At,
    useMemo: At,
    useReducer: At,
    useRef: At,
    useState: At,
    useDebugValue: At,
    useDeferredValue: At,
    useTransition: At,
    useSyncExternalStore: At,
    useId: At,
    useHostTransitionStatus: At,
    useFormState: At,
    useActionState: At,
    useOptimistic: At,
    useMemoCache: At,
    useCacheRefresh: At
  };
  Rs.useEffectEvent = At;
  var av = {
    readContext: rn,
    use: no,
    useCallback: function(e, n) {
      return gn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: rn,
    useEffect: Vp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, ro(
        4194308,
        4,
        Fp.bind(null, n, e),
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
      var r = gn();
      n = n === void 0 ? null : n;
      var l = e();
      if (Vr) {
        ct(!0);
        try {
          e();
        } finally {
          ct(!1);
        }
      }
      return r.memoizedState = [l, n], l;
    },
    useReducer: function(e, n, r) {
      var l = gn();
      if (r !== void 0) {
        var d = r(n);
        if (Vr) {
          ct(!0);
          try {
            r(n);
          } finally {
            ct(!1);
          }
        }
      } else d = n;
      return l.memoizedState = l.baseState = d, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: d
      }, l.queue = e, e = e.dispatch = tj.bind(
        null,
        qe,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var n = gn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Yu(e);
      var n = e.queue, r = ev.bind(null, qe, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = gn();
      return Xu(r, e, n);
    },
    useTransition: function() {
      var e = Yu(!1);
      return e = Xp.bind(
        null,
        qe,
        e.queue,
        !0,
        !1
      ), gn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var l = qe, d = gn();
      if (et) {
        if (r === void 0)
          throw Error(s(407));
        r = r();
      } else {
        if (r = n(), yt === null)
          throw Error(s(349));
        (Je & 127) !== 0 || Ep(l, n, r);
      }
      d.memoizedState = r;
      var h = { value: r, getSnapshot: n };
      return d.queue = h, Vp(Tp.bind(null, l, h, e), [
        e
      ]), l.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        Np.bind(
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
      var e = gn(), n = yt.identifierPrefix;
      if (et) {
        var r = pa, l = ma;
        r = (l & ~(1 << 32 - Ve(l) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = eo++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Kw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Zu,
    useFormState: Op,
    useActionState: Op,
    useOptimistic: function(e) {
      var n = gn();
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
        qe,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: qu,
    useCacheRefresh: function() {
      return gn().memoizedState = ej.bind(
        null,
        qe
      );
    },
    useEffectEvent: function(e) {
      var n = gn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((lt & 2) !== 0)
          throw Error(s(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Wu = {
    readContext: rn,
    use: no,
    useCallback: Gp,
    useContext: rn,
    useEffect: Pu,
    useImperativeHandle: Yp,
    useInsertionEffect: qp,
    useLayoutEffect: Ip,
    useMemo: Pp,
    useReducer: ao,
    useRef: Bp,
    useState: function() {
      return ao(_a);
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return Kp(
        r,
        mt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = ao(_a)[0], n = Bt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ts(e),
        n
      ];
    },
    useSyncExternalStore: jp,
    useId: Jp,
    useHostTransitionStatus: Zu,
    useFormState: Lp,
    useActionState: Lp,
    useOptimistic: function(e, n) {
      var r = Bt();
      return _p(r, mt, e, n);
    },
    useMemoCache: qu,
    useCacheRefresh: Wp
  };
  Wu.useEffectEvent = Hp;
  var rv = {
    readContext: rn,
    use: no,
    useCallback: Gp,
    useContext: rn,
    useEffect: Pu,
    useImperativeHandle: Yp,
    useInsertionEffect: qp,
    useLayoutEffect: Ip,
    useMemo: Pp,
    useReducer: Fu,
    useRef: Bp,
    useState: function() {
      return Fu(_a);
    },
    useDebugValue: Ku,
    useDeferredValue: function(e, n) {
      var r = Bt();
      return mt === null ? Xu(r, e, n) : Kp(
        r,
        mt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Fu(_a)[0], n = Bt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ts(e),
        n
      ];
    },
    useSyncExternalStore: jp,
    useId: Jp,
    useHostTransitionStatus: Zu,
    useFormState: $p,
    useActionState: $p,
    useOptimistic: function(e, n) {
      var r = Bt();
      return mt !== null ? _p(r, mt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: qu,
    useCacheRefresh: Wp
  };
  rv.useEffectEvent = Hp;
  function ed(e, n, r, l) {
    n = e.memoizedState, r = r(l, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var td = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var l = $n(), d = Za(l);
      d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Nn(n, e, l), ws(n, e, l));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var l = $n(), d = Za(l);
      d.tag = 1, d.payload = n, r != null && (d.callback = r), n = Ja(e, d, l), n !== null && (Nn(n, e, l), ws(n, e, l));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = $n(), l = Za(r);
      l.tag = 2, n != null && (l.callback = n), n = Ja(e, l, r), n !== null && (Nn(n, e, r), ws(n, e, r));
    }
  };
  function iv(e, n, r, l, d, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, h, x) : n.prototype && n.prototype.isPureReactComponent ? !ms(r, l) || !ms(d, h) : !0;
  }
  function sv(e, n, r, l) {
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
  function lv(e) {
    $l(e);
  }
  function ov(e) {
    console.error(e);
  }
  function cv(e) {
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
  function uv(e, n, r) {
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
  function dv(e) {
    return e = Za(e), e.tag = 3, e;
  }
  function fv(e, n, r, l) {
    var d = r.type.getDerivedStateFromError;
    if (typeof d == "function") {
      var h = l.value;
      e.payload = function() {
        return d(h);
      }, e.callback = function() {
        uv(n, r, l);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      uv(n, r, l), typeof d != "function" && (rr === null ? rr = /* @__PURE__ */ new Set([this]) : rr.add(this));
      var E = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function nj(e, n, r, l, d) {
    if (r.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (n = r.alternate, n !== null && vi(
        n,
        r,
        d,
        !0
      ), r = zn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return Xn === null ? xo() : r.alternate === null && Dt === 0 && (Dt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = d, l === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([l]) : n.add(l), Cd(e, l, d)), !1;
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
    if (et)
      return n = zn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = d, l !== Su && (e = Error(s(422), { cause: l }), gs(Yn(e, r)))) : (l !== Su && (n = Error(s(423), {
        cause: l
      }), gs(
        Yn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, d &= -d, e.lanes |= d, l = Yn(l, r), d = nd(
        e.stateNode,
        l,
        d
      ), Du(e, d), Dt !== 4 && (Dt = 2)), !1;
    var h = Error(s(520), { cause: l });
    if (h = Yn(h, r), Ls === null ? Ls = [h] : Ls.push(h), Dt !== 4 && (Dt = 2), n === null) return !0;
    l = Yn(l, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = d & -d, r.lanes |= e, e = nd(r.stateNode, l, e), Du(r, e), !1;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (rr === null || !rr.has(h))))
            return r.flags |= 65536, d &= -d, r.lanes |= d, d = dv(d), fv(
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
  var ad = Error(s(461)), Yt = !1;
  function sn(e, n, r, l) {
    n.child = e === null ? vp(n, null, r, l) : Br(
      n,
      e.child,
      r,
      l
    );
  }
  function hv(e, n, r, l, d) {
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
    ), E = Bu(), e !== null && !Yt ? (Vu(e, n, d), Ma(e, n, d)) : (et && E && bu(n), n.flags |= 1, sn(e, n, l, d), n.child);
  }
  function mv(e, n, r, l, d) {
    if (e === null) {
      var h = r.type;
      return typeof h == "function" && !vu(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, pv(
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
        return Ma(e, n, d);
    }
    return n.flags |= 1, e = Ea(h, l), e.ref = n.ref, e.return = n, n.child = e;
  }
  function pv(e, n, r, l, d) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (ms(h, l) && e.ref === n.ref)
        if (Yt = !1, n.pendingProps = l = h, dd(e, d))
          (e.flags & 131072) !== 0 && (Yt = !0);
        else
          return n.lanes = e.lanes, Ma(e, n, d);
    }
    return rd(
      e,
      n,
      r,
      l,
      d
    );
  }
  function vv(e, n, r, l) {
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
        return gv(
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
        ), h !== null ? bp(n, h) : zu(), xp(n);
      else
        return l = n.lanes = 536870912, gv(
          e,
          n,
          h !== null ? h.baseLanes | r : r,
          r,
          l
        );
    } else
      h !== null ? (Gl(n, h.cachePool), bp(n, h), er(), n.memoizedState = null) : (e !== null && Gl(n, null), zu(), er());
    return sn(e, n, d, r), n.child;
  }
  function _s(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function gv(e, n, r, l, d) {
    var h = Ru();
    return h = h === null ? null : { parent: It._currentValue, pool: h }, n.memoizedState = {
      baseLanes: r,
      cachePool: h
    }, e !== null && Gl(n, null), zu(), xp(n), e !== null && vi(e, n, l, !0), n.childLanes = d, null;
  }
  function oo(e, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function yv(e, n, r) {
    return Br(n, e.child, null, r), e = oo(n, n.pendingProps), e.flags |= 2, On(n), n.memoizedState = null, e;
  }
  function aj(e, n, r) {
    var l = n.pendingProps, d = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (et) {
        if (l.mode === "hidden")
          return e = oo(n, l), n.lanes = 536870912, _s(null, e);
        if (Lu(n), (e = jt) ? (e = Mg(
          e,
          Kn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = tp(e), r.return = n, n.child = r, an = n, jt = null)) : e = null, e === null) throw Ka(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, l);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Lu(n), d)
        if (n.flags & 256)
          n.flags &= -257, n = yv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (Yt || vi(e, n, r, !1), d = (r & e.childLanes) !== 0, Yt || d) {
        if (l = yt, l !== null && (x = D(l, r), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Ar(e, x), Nn(l, e, x), ad;
        xo(), n = yv(
          e,
          n,
          r
        );
      } else
        e = h.treeContext, jt = Qn(x.nextSibling), an = n, et = !0, Pa = null, Kn = !1, e !== null && rp(n, e), n = oo(n, l), n.flags |= 4096;
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
    ), l = Bu(), e !== null && !Yt ? (Vu(e, n, d), Ma(e, n, d)) : (et && l && bu(n), n.flags |= 1, sn(e, n, r, d), n.child);
  }
  function bv(e, n, r, l, d, h) {
    return Or(n), n.updateQueue = null, r = wp(
      n,
      l,
      r,
      d
    ), Sp(e), l = Bu(), e !== null && !Yt ? (Vu(e, n, h), Ma(e, n, h)) : (et && l && bu(n), n.flags |= 1, sn(e, n, r, h), n.child);
  }
  function xv(e, n, r, l, d) {
    if (Or(n), n.stateNode === null) {
      var h = fi, x = r.contextType;
      typeof x == "object" && x !== null && (h = rn(x)), h = new r(l, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = td, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = l, h.state = n.memoizedState, h.refs = {}, Mu(n), x = r.contextType, h.context = typeof x == "object" && x !== null ? rn(x) : fi, h.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (ed(
        n,
        r,
        x,
        l
      ), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && td.enqueueReplaceState(h, h.state, null), Es(n, l, h, d), js(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !0;
    } else if (e === null) {
      h = n.stateNode;
      var E = n.memoizedProps, L = Hr(r, E);
      h.props = L;
      var J = h.context, oe = r.contextType;
      x = fi, typeof oe == "object" && oe !== null && (x = rn(oe));
      var fe = r.getDerivedStateFromProps;
      oe = typeof fe == "function" || typeof h.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, oe || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (E || J !== x) && sv(
        n,
        h,
        l,
        x
      ), Qa = !1;
      var re = n.memoizedState;
      h.state = re, Es(n, l, h, d), js(), J = n.memoizedState, E || re !== J || Qa ? (typeof fe == "function" && (ed(
        n,
        r,
        fe,
        l
      ), J = n.memoizedState), (L = Qa || iv(
        n,
        r,
        L,
        l,
        re,
        J,
        x
      )) ? (oe || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = J), h.props = l, h.state = J, h.context = x, l = L) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), l = !1);
    } else {
      h = n.stateNode, Au(e, n), x = n.memoizedProps, oe = Hr(r, x), h.props = oe, fe = n.pendingProps, re = h.context, J = r.contextType, L = fi, typeof J == "object" && J !== null && (L = rn(J)), E = r.getDerivedStateFromProps, (J = typeof E == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== fe || re !== L) && sv(
        n,
        h,
        l,
        L
      ), Qa = !1, re = n.memoizedState, h.state = re, Es(n, l, h, d), js();
      var se = n.memoizedState;
      x !== fe || re !== se || Qa || e !== null && e.dependencies !== null && Fl(e.dependencies) ? (typeof E == "function" && (ed(
        n,
        r,
        E,
        l
      ), se = n.memoizedState), (oe = Qa || iv(
        n,
        r,
        oe,
        l,
        re,
        se,
        L
      ) || e !== null && e.dependencies !== null && Fl(e.dependencies)) ? (J || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(l, se, L), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        l,
        se,
        L
      )), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = se), h.props = l, h.state = se, h.context = L, l = oe) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && re === e.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && re === e.memoizedState || (n.flags |= 1024), l = !1);
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
    )) : sn(e, n, r, d), n.memoizedState = h.state, e = n.child) : e = Ma(
      e,
      n,
      d
    ), e;
  }
  function Sv(e, n, r, l) {
    return kr(), n.flags |= 256, sn(e, n, r, l), n.child;
  }
  var id = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sd(e) {
    return { baseLanes: e, cachePool: up() };
  }
  function ld(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Un), e;
  }
  function wv(e, n, r) {
    var l = n.pendingProps, d = !1, h = (n.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : ($t.current & 2) !== 0), x && (d = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (et) {
        if (d ? Wa(n) : er(), (e = jt) ? (e = Mg(
          e,
          Kn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ma, overflow: pa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = tp(e), r.return = n, n.child = r, an = n, jt = null)) : e = null, e === null) throw Ka(n);
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
        if (x = E.nextSibling && E.nextSibling.dataset, x) var J = x.dgst;
        x = J, l = Error(s(419)), l.stack = "", l.digest = x, gs({ value: l, source: null, stack: null }), n = cd(
          e,
          n,
          r
        );
      } else if (Yt || vi(e, n, r, !1), x = (r & e.childLanes) !== 0, Yt || x) {
        if (x = yt, x !== null && (l = D(x, r), l !== 0 && l !== L.retryLane))
          throw L.retryLane = l, Ar(e, l), Nn(x, e, l), ad;
        qd(E) || xo(), n = cd(
          e,
          n,
          r
        );
      } else
        qd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, jt = Qn(
          E.nextSibling
        ), an = n, et = !0, Pa = null, Kn = !1, e !== null && rp(n, e), n = od(
          n,
          l.children
        ), n.flags |= 4096);
      return n;
    }
    return d ? (er(), E = l.fallback, d = n.mode, L = e.child, J = L.sibling, l = Ea(L, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = L.subtreeFlags & 65011712, J !== null ? E = Ea(
      J,
      E
    ) : (E = Dr(
      E,
      d,
      r,
      null
    ), E.flags |= 2), E.return = n, l.return = n, l.sibling = E, n.child = l, _s(null, l), l = n.child, E = e.child.memoizedState, E === null ? E = sd(r) : (d = E.cachePool, d !== null ? (L = It._currentValue, d = d.parent !== L ? { parent: L, pool: L } : d) : d = up(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: d
    }), l.memoizedState = E, l.childLanes = ld(
      e,
      x,
      r
    ), n.memoizedState = id, _s(e.child, l)) : (Wa(n), r = e.child, e = r.sibling, r = Ea(r, {
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
    return e = kn(22, e, null, n), e.lanes = 0, e;
  }
  function cd(e, n, r) {
    return Br(n, e.child, null, r), e = od(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function jv(e, n, r) {
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
  function Ev(e, n, r) {
    var l = n.pendingProps, d = l.revealOrder, h = l.tail;
    l = l.children;
    var x = $t.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, ae($t, x), sn(e, n, l, r), l = et ? vs : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && jv(e, r, n);
        else if (e.tag === 19)
          jv(e, r, n);
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
  function Ma(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), ar |= n.lanes, (r & n.childLanes) === 0)
      if (e !== null) {
        if (vi(
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
      for (e = n.child, r = Ea(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = Ea(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function dd(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Fl(e)));
  }
  function rj(e, n, r) {
    switch (n.tag) {
      case 3:
        pe(n, n.stateNode.containerInfo), Xa(n, It, e.memoizedState.cache), kr();
        break;
      case 27:
      case 5:
        ot(n);
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
          return l.dehydrated !== null ? (Wa(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? wv(e, n, r) : (Wa(n), e = Ma(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Wa(n);
        break;
      case 19:
        var d = (e.flags & 128) !== 0;
        if (l = (r & n.childLanes) !== 0, l || (vi(
          e,
          n,
          r,
          !1
        ), l = (r & n.childLanes) !== 0), d) {
          if (l)
            return Ev(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (d = n.memoizedState, d !== null && (d.rendering = null, d.tail = null, d.lastEffect = null), ae($t, $t.current), l) break;
        return null;
      case 22:
        return n.lanes = 0, vv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, It, e.memoizedState.cache);
    }
    return Ma(e, n, r);
  }
  function Nv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Yt = !0;
      else {
        if (!dd(e, r) && (n.flags & 128) === 0)
          return Yt = !1, rj(
            e,
            n,
            r
          );
        Yt = (e.flags & 131072) !== 0;
      }
    else
      Yt = !1, et && (n.flags & 1048576) !== 0 && ap(n, vs, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var l = n.pendingProps;
          if (e = Ur(n.elementType), n.type = e, typeof e == "function")
            vu(e) ? (l = Hr(e, l), n.tag = 1, n = xv(
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
                n.tag = 11, n = hv(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              } else if (d === ie) {
                n.tag = 14, n = mv(
                  null,
                  n,
                  e,
                  l,
                  r
                );
                break e;
              }
            }
            throw n = le(e) || e, Error(s(306, n, ""));
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
        ), xv(
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
          if (l = x.cache, Xa(n, It, l), l !== h.cache && Nu(
            n,
            [It],
            r,
            !0
          ), js(), l = x.element, h.isDehydrated)
            if (h = {
              element: l,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = Sv(
                e,
                n,
                l,
                r
              );
              break e;
            } else if (l !== d) {
              d = Yn(
                Error(s(424)),
                n
              ), gs(d), n = Sv(
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
              for (jt = Qn(e.firstChild), an = n, et = !0, Pa = null, Kn = !0, r = vp(
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
            sn(e, n, l, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return co(e, n), e === null ? (r = Lg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : et || (r = n.type, e = n.pendingProps, l = Co(
          ee.current
        ).createElement(r), l[ye] = n, l[be] = e, ln(l, r, e), St(l), n.stateNode = l) : n.memoizedState = Lg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ot(n), e === null && et && (l = n.stateNode = kg(
          n.type,
          n.pendingProps,
          ee.current
        ), an = n, Kn = !0, d = jt, or(n.type) ? (Fd = d, jt = Qn(l.firstChild)) : jt = d), sn(
          e,
          n,
          n.pendingProps.children,
          r
        ), co(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && et && ((d = l = jt) && (l = zj(
          l,
          n.type,
          n.pendingProps,
          Kn
        ), l !== null ? (n.stateNode = l, an = n, jt = Qn(l.firstChild), Kn = !1, d = !0) : d = !1), d || Ka(n)), ot(n), d = n.type, h = n.pendingProps, x = e !== null ? e.memoizedProps : null, l = h.children, Bd(d, h) ? l = null : x !== null && Bd(d, x) && (n.flags |= 32), n.memoizedState !== null && (d = $u(
          e,
          n,
          Xw,
          null,
          null,
          r
        ), Fs._currentValue = d), co(e, n), sn(e, n, l, r), n.child;
      case 6:
        return e === null && et && ((e = r = jt) && (r = Oj(
          r,
          n.pendingProps,
          Kn
        ), r !== null ? (n.stateNode = r, an = n, jt = null, e = !0) : e = !1), e || Ka(n)), null;
      case 13:
        return wv(e, n, r);
      case 4:
        return pe(
          n,
          n.stateNode.containerInfo
        ), l = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          l,
          r
        ) : sn(e, n, l, r), n.child;
      case 11:
        return hv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return sn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return sn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return sn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return l = n.pendingProps, Xa(n, n.type, l.value), sn(e, n, l.children, r), n.child;
      case 9:
        return d = n.type._context, l = n.pendingProps.children, Or(n), d = rn(d), l = l(d), n.flags |= 1, sn(e, n, l, r), n.child;
      case 14:
        return mv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return pv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Ev(e, n, r);
      case 31:
        return aj(e, n, r);
      case 22:
        return vv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), l = rn(It), e === null ? (d = Ru(), d === null && (d = yt, h = Tu(), d.pooledCache = h, h.refCount++, h !== null && (d.pooledCacheLanes |= r), d = h), n.memoizedState = { parent: l, cache: d }, Mu(n), Xa(n, It, d)) : ((e.lanes & r) !== 0 && (Au(e, n), Es(n, null, null, r), js()), d = e.memoizedState, h = n.memoizedState, d.parent !== l ? (d = { parent: l, cache: l }, n.memoizedState = d, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = d), Xa(n, It, l)) : (l = h.cache, Xa(n, It, l), l !== d.cache && Nu(
          n,
          [It],
          r,
          !0
        ))), sn(
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
  function Aa(e) {
    e.flags |= 4;
  }
  function fd(e, n, r, l, d) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (d & 335544128) === d)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jv()) e.flags |= 8192;
        else
          throw $r = Kl, _u;
    } else e.flags &= -16777217;
  }
  function Tv(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Hg(n))
      if (Jv()) e.flags |= 8192;
      else
        throw $r = Kl, _u;
  }
  function fo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Xt() : 536870912, e.lanes |= n, Ri |= n);
  }
  function Ms(e, n) {
    if (!et)
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
  function Et(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, l = 0;
    if (n)
      for (var d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags & 65011712, l |= d.flags & 65011712, d.return = e, d = d.sibling;
    else
      for (d = e.child; d !== null; )
        r |= d.lanes | d.childLanes, l |= d.subtreeFlags, l |= d.flags, d.return = e, d = d.sibling;
    return e.subtreeFlags |= l, e.childLanes = r, n;
  }
  function ij(e, n, r) {
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
        return Et(n), null;
      case 1:
        return Et(n), null;
      case 3:
        return r = n.stateNode, l = null, e !== null && (l = e.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Ca(It), Ce(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(n) ? Aa(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, wu())), Et(n), null;
      case 26:
        var d = n.type, h = n.memoizedState;
        return e === null ? (Aa(n), h !== null ? (Et(n), Tv(n, h)) : (Et(n), fd(
          n,
          d,
          null,
          l,
          r
        ))) : h ? h !== e.memoizedState ? (Aa(n), Et(n), Tv(n, h)) : (Et(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== l && Aa(n), Et(n), fd(
          n,
          d,
          e,
          l,
          r
        )), null;
      case 27:
        if (je(n), r = ee.current, d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Et(n), null;
          }
          e = G.current, pi(n) ? ip(n) : (e = kg(d, l, r), n.stateNode = e, Aa(n));
        }
        return Et(n), null;
      case 5:
        if (je(n), d = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== l && Aa(n);
        else {
          if (!l) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Et(n), null;
          }
          if (h = G.current, pi(n))
            ip(n);
          else {
            var x = Co(
              ee.current
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
            h[ye] = n, h[be] = l;
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
            e: switch (ln(h, d, l), d) {
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
        return Et(n), fd(
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
            throw Error(s(166));
          if (e = ee.current, pi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, l = null, d = an, d !== null)
              switch (d.tag) {
                case 27:
                case 5:
                  l = d.memoizedProps;
              }
            e[ye] = n, e = !!(e.nodeValue === r || l !== null && l.suppressHydrationWarning === !0 || wg(e.nodeValue, r)), e || Ka(n, !0);
          } else
            e = Co(e).createTextNode(
              l
            ), e[ye] = n, n.stateNode = e;
        }
        return Et(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (l = pi(n), r !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[ye] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Et(n), e = !1;
          } else
            r = wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (On(n), n) : (On(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Et(n), null;
      case 13:
        if (l = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (d = pi(n), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!d) throw Error(s(318));
              if (d = n.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(s(317));
              d[ye] = n;
            } else
              kr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Et(n), d = !1;
          } else
            d = wu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = d), d = !0;
          if (!d)
            return n.flags & 256 ? (On(n), n) : (On(n), null);
        }
        return On(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = l !== null, e = e !== null && e.memoizedState !== null, r && (l = n.child, d = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (d = l.alternate.memoizedState.cachePool.pool), h = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (h = l.memoizedState.cachePool.pool), h !== d && (l.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), fo(n, n.updateQueue), Et(n), null);
      case 4:
        return Ce(), e === null && zd(n.stateNode.containerInfo), Et(n), null;
      case 10:
        return Ca(n.type), Et(n), null;
      case 19:
        if (te($t), l = n.memoizedState, l === null) return Et(n), null;
        if (d = (n.flags & 128) !== 0, h = l.rendering, h === null)
          if (d) Ms(l, !1);
          else {
            if (Dt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (h = Jl(e), h !== null) {
                  for (n.flags |= 128, Ms(l, !1), e = h.updateQueue, n.updateQueue = e, fo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    ep(r, e), r = r.sibling;
                  return ae(
                    $t,
                    $t.current & 1 | 2
                  ), et && Na(n, l.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Ot() > go && (n.flags |= 128, d = !0, Ms(l, !1), n.lanes = 4194304);
          }
        else {
          if (!d)
            if (e = Jl(h), e !== null) {
              if (n.flags |= 128, d = !0, e = e.updateQueue, n.updateQueue = e, fo(n, e), Ms(l, !0), l.tail === null && l.tailMode === "hidden" && !h.alternate && !et)
                return Et(n), null;
            } else
              2 * Ot() - l.renderingStartTime > go && r !== 536870912 && (n.flags |= 128, d = !0, Ms(l, !1), n.lanes = 4194304);
          l.isBackwards ? (h.sibling = n.child, n.child = h) : (e = l.last, e !== null ? e.sibling = h : n.child = h, l.last = h);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Ot(), e.sibling = null, r = $t.current, ae(
          $t,
          d ? r & 1 | 2 : r & 1
        ), et && Na(n, l.treeForkCount), e) : (Et(n), null);
      case 22:
      case 23:
        return On(n), Ou(), l = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Et(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Et(n), r = n.updateQueue, r !== null && fo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== r && (n.flags |= 2048), e !== null && te(Lr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ca(It), Et(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function sj(e, n) {
    switch (xu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ca(It), Ce(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return je(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (On(n), n.alternate === null)
            throw Error(s(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (On(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          kr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return te($t), null;
      case 4:
        return Ce(), null;
      case 10:
        return Ca(n.type), null;
      case 22:
      case 23:
        return On(n), Ou(), e !== null && te(Lr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ca(It), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Cv(e, n) {
    switch (xu(n), n.tag) {
      case 3:
        Ca(It), Ce();
        break;
      case 26:
      case 27:
      case 5:
        je(n);
        break;
      case 4:
        Ce();
        break;
      case 31:
        n.memoizedState !== null && On(n);
        break;
      case 13:
        On(n);
        break;
      case 19:
        te($t);
        break;
      case 10:
        Ca(n.type);
        break;
      case 22:
      case 23:
        On(n), Ou(), e !== null && te(Lr);
        break;
      case 24:
        Ca(It);
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
      dt(n, n.return, E);
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
              var L = r, J = E;
              try {
                J();
              } catch (oe) {
                dt(
                  d,
                  L,
                  oe
                );
              }
            }
          }
          l = l.next;
        } while (l !== h);
      }
    } catch (oe) {
      dt(n, n.return, oe);
    }
  }
  function Rv(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        yp(n, r);
      } catch (l) {
        dt(e, e.return, l);
      }
    }
  }
  function _v(e, n, r) {
    r.props = Hr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (l) {
      dt(e, n, l);
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
      dt(e, n, d);
    }
  }
  function va(e, n) {
    var r = e.ref, l = e.refCleanup;
    if (r !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (d) {
          dt(e, n, d);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (d) {
          dt(e, n, d);
        }
      else r.current = null;
  }
  function Mv(e) {
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
      dt(e, e.return, d);
    }
  }
  function hd(e, n, r) {
    try {
      var l = e.stateNode;
      Rj(l, e.type, r, n), l[be] = n;
    } catch (d) {
      dt(e, e.return, d);
    }
  }
  function Av(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && or(e.type) || e.tag === 4;
  }
  function md(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Av(e.return)) return null;
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
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = wa));
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
  function Dv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var l = e.type, d = n.attributes; d.length; )
        n.removeAttributeNode(d[0]);
      ln(n, l, r), n[ye] = e, n[be] = r;
    } catch (h) {
      dt(e, e.return, h);
    }
  }
  var Da = !1, Gt = !1, vd = !1, kv = typeof WeakSet == "function" ? WeakSet : Set, Wt = null;
  function lj(e, n) {
    if (e = e.containerInfo, Ud = zo, e = Ym(e), cu(e)) {
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
            var x = 0, E = -1, L = -1, J = 0, oe = 0, fe = e, re = null;
            t: for (; ; ) {
              for (var se; fe !== r || d !== 0 && fe.nodeType !== 3 || (E = x + d), fe !== h || l !== 0 && fe.nodeType !== 3 || (L = x + l), fe.nodeType === 3 && (x += fe.nodeValue.length), (se = fe.firstChild) !== null; )
                re = fe, fe = se;
              for (; ; ) {
                if (fe === e) break t;
                if (re === r && ++J === d && (E = x), re === h && ++oe === l && (L = x), (se = fe.nextSibling) !== null) break;
                fe = re, re = fe.parentNode;
              }
              fe = se;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for ($d = { focusedElem: e, selectionRange: r }, zo = !1, Wt = n; Wt !== null; )
      if (n = Wt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Wt = e;
      else
        for (; Wt !== null; ) {
          switch (n = Wt, h = n.alternate, e = n.flags, n.tag) {
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
                  var Ee = Hr(
                    r.type,
                    d
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Ee,
                    h
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ue) {
                  dt(
                    r,
                    r.return,
                    Ue
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
            e.return = n.return, Wt = e;
            break;
          }
          Wt = n.return;
        }
  }
  function zv(e, n, r) {
    var l = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        za(e, r), l & 4 && As(5, r);
        break;
      case 1:
        if (za(e, r), l & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              dt(r, r.return, x);
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
              dt(
                r,
                r.return,
                x
              );
            }
          }
        l & 64 && Rv(r), l & 512 && Ds(r, r.return);
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
            yp(e, n);
          } catch (x) {
            dt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && l & 4 && Dv(r);
      case 26:
      case 5:
        za(e, r), n === null && l & 4 && Mv(r), l & 512 && Ds(r, r.return);
        break;
      case 12:
        za(e, r);
        break;
      case 31:
        za(e, r), l & 4 && Uv(e, r);
        break;
      case 13:
        za(e, r), l & 4 && $v(e, r), l & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = vj.bind(
          null,
          r
        ), Lj(e, r))));
        break;
      case 22:
        if (l = r.memoizedState !== null || Da, !l) {
          n = n !== null && n.memoizedState !== null || Gt, d = Da;
          var h = Gt;
          Da = l, (Gt = n) && !h ? Oa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : za(e, r), Da = d, Gt = h;
        }
        break;
      case 30:
        break;
      default:
        za(e, r);
    }
  }
  function Ov(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Ov(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && gt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ct = null, Sn = !1;
  function ka(e, n, r) {
    for (r = r.child; r !== null; )
      Lv(e, n, r), r = r.sibling;
  }
  function Lv(e, n, r) {
    if (we && typeof we.onCommitFiberUnmount == "function")
      try {
        we.onCommitFiberUnmount(Ae, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Gt || va(r, n), ka(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Gt || va(r, n);
        var l = Ct, d = Sn;
        or(r.type) && (Ct = r.stateNode, Sn = !1), ka(
          e,
          n,
          r
        ), Hs(r.stateNode), Ct = l, Sn = d;
        break;
      case 5:
        Gt || va(r, n);
      case 6:
        if (l = Ct, d = Sn, Ct = null, ka(
          e,
          n,
          r
        ), Ct = l, Sn = d, Ct !== null)
          if (Sn)
            try {
              (Ct.nodeType === 9 ? Ct.body : Ct.nodeName === "HTML" ? Ct.ownerDocument.body : Ct).removeChild(r.stateNode);
            } catch (h) {
              dt(
                r,
                n,
                h
              );
            }
          else
            try {
              Ct.removeChild(r.stateNode);
            } catch (h) {
              dt(
                r,
                n,
                h
              );
            }
        break;
      case 18:
        Ct !== null && (Sn ? (e = Ct, Rg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : Rg(Ct, r.stateNode));
        break;
      case 4:
        l = Ct, d = Sn, Ct = r.stateNode.containerInfo, Sn = !0, ka(
          e,
          n,
          r
        ), Ct = l, Sn = d;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        tr(2, r, n), Gt || tr(4, r, n), ka(
          e,
          n,
          r
        );
        break;
      case 1:
        Gt || (va(r, n), l = r.stateNode, typeof l.componentWillUnmount == "function" && _v(
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
        Gt = (l = Gt) || r.memoizedState !== null, ka(
          e,
          n,
          r
        ), Gt = l;
        break;
      default:
        ka(
          e,
          n,
          r
        );
    }
  }
  function Uv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        dt(n, n.return, r);
      }
    }
  }
  function $v(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        dt(n, n.return, r);
      }
  }
  function oj(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new kv()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new kv()), n;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function mo(e, n) {
    var r = oj(e);
    n.forEach(function(l) {
      if (!r.has(l)) {
        r.add(l);
        var d = gj.bind(null, e, l);
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
                Ct = E.stateNode, Sn = !1;
                break e;
              }
              break;
            case 5:
              Ct = E.stateNode, Sn = !1;
              break e;
            case 3:
            case 4:
              Ct = E.stateNode.containerInfo, Sn = !0;
              break e;
          }
          E = E.return;
        }
        if (Ct === null) throw Error(s(160));
        Lv(h, x, d), Ct = null, Sn = !1, h = d.alternate, h !== null && (h.return = null), d.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Bv(n, e), n = n.sibling;
  }
  var la = null;
  function Bv(e, n) {
    var r = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        wn(n, e), jn(e), l & 4 && (tr(3, e, e.return), As(3, e), tr(5, e, e.return));
        break;
      case 1:
        wn(n, e), jn(e), l & 512 && (Gt || r === null || va(r, r.return)), l & 64 && Da && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? l : r.concat(l))));
        break;
      case 26:
        var d = la;
        if (wn(n, e), jn(e), l & 512 && (Gt || r === null || va(r, r.return)), l & 4) {
          var h = r !== null ? r.memoizedState : null;
          if (l = e.memoizedState, r === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, r = e.memoizedProps, d = d.ownerDocument || d;
                  t: switch (l) {
                    case "title":
                      h = d.getElementsByTagName("title")[0], (!h || h[Ye] || h[ye] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = d.createElement(l), d.head.insertBefore(
                        h,
                        d.querySelector("head > title")
                      )), ln(h, l, r), h[ye] = e, St(h), l = h;
                      break e;
                    case "link":
                      var x = Bg(
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
                      h = d.createElement(l), ln(h, l, r), d.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Bg(
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
                      h = d.createElement(l), ln(h, l, r), d.head.appendChild(h);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  h[ye] = e, St(h), l = h;
                }
                e.stateNode = l;
              } else
                Vg(
                  d,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = $g(
                d,
                l,
                e.memoizedProps
              );
          else
            h !== l ? (h === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : h.count--, l === null ? Vg(
              d,
              e.type,
              e.stateNode
            ) : $g(
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
        wn(n, e), jn(e), l & 512 && (Gt || r === null || va(r, r.return)), r !== null && l & 4 && hd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (wn(n, e), jn(e), l & 512 && (Gt || r === null || va(r, r.return)), e.flags & 32) {
          d = e.stateNode;
          try {
            ii(d, "");
          } catch (Ee) {
            dt(e, e.return, Ee);
          }
        }
        l & 4 && e.stateNode != null && (d = e.memoizedProps, hd(
          e,
          d,
          r !== null ? r.memoizedProps : d
        )), l & 1024 && (vd = !0);
        break;
      case 6:
        if (wn(n, e), jn(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = l;
          } catch (Ee) {
            dt(e, e.return, Ee);
          }
        }
        break;
      case 3:
        if (Mo = null, d = la, la = Ro(n.containerInfo), wn(n, e), la = d, jn(e), l & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (Ee) {
            dt(e, e.return, Ee);
          }
        vd && (vd = !1, Vv(e));
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
        wn(n, e), jn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (vo = Ot()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, mo(e, l)));
        break;
      case 22:
        d = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, J = Da, oe = Gt;
        if (Da = J || d, Gt = oe || L, wn(n, e), Gt = oe, Da = J, jn(e), l & 8192)
          e: for (n = e.stateNode, n._visibility = d ? n._visibility & -2 : n._visibility | 1, d && (r === null || L || Da || Gt || qr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (h = L.stateNode, d)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var fe = L.memoizedProps.style, re = fe != null && fe.hasOwnProperty("display") ? fe.display : null;
                    E.style.display = re == null || typeof re == "boolean" ? "" : ("" + re).trim();
                  }
                } catch (Ee) {
                  dt(L, L.return, Ee);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = d ? "" : L.memoizedProps;
                } catch (Ee) {
                  dt(L, L.return, Ee);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var se = L.stateNode;
                  d ? _g(se, !0) : _g(L.stateNode, !1);
                } catch (Ee) {
                  dt(L, L.return, Ee);
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
          if (Av(l)) {
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
            r.flags & 32 && (ii(x, ""), r.flags &= -33);
            var E = md(e);
            ho(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, J = md(e);
            pd(
              e,
              J,
              L
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (oe) {
        dt(e, e.return, oe);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Vv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Vv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function za(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        zv(e, n.alternate, n), n = n.sibling;
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
          va(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && _v(
            n,
            n.return,
            r
          ), qr(n);
          break;
        case 27:
          Hs(n.stateNode);
        case 26:
        case 5:
          va(n, n.return), qr(n);
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
          ), As(4, h);
          break;
        case 1:
          if (Oa(
            d,
            h,
            r
          ), l = h, d = l.stateNode, typeof d.componentDidMount == "function")
            try {
              d.componentDidMount();
            } catch (J) {
              dt(l, l.return, J);
            }
          if (l = h, d = l.updateQueue, d !== null) {
            var E = l.stateNode;
            try {
              var L = d.shared.hiddenCallbacks;
              if (L !== null)
                for (d.shared.hiddenCallbacks = null, d = 0; d < L.length; d++)
                  gp(L[d], E);
            } catch (J) {
              dt(l, l.return, J);
            }
          }
          r && x & 64 && Rv(h), Ds(h, h.return);
          break;
        case 27:
          Dv(h);
        case 26:
        case 5:
          Oa(
            d,
            h,
            r
          ), r && l === null && x & 4 && Mv(h), Ds(h, h.return);
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
          ), r && x & 4 && Uv(d, h);
          break;
        case 13:
          Oa(
            d,
            h,
            r
          ), r && x & 4 && $v(d, h);
          break;
        case 22:
          h.memoizedState === null && Oa(
            d,
            h,
            r
          ), Ds(h, h.return);
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
  function gd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && ys(r));
  }
  function yd(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ys(e));
  }
  function oa(e, n, r, l) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Hv(
          e,
          n,
          r,
          l
        ), n = n.sibling;
  }
  function Hv(e, n, r, l) {
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
        ), d & 2048 && As(9, n);
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
        ), d & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && ys(e)));
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
            dt(n, n.return, L);
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
        ) : ks(e, n) : h._visibility & 2 ? oa(
          e,
          n,
          r,
          l
        ) : (h._visibility |= 2, Ni(
          e,
          n,
          r,
          l,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), d & 2048 && gd(x, n);
        break;
      case 24:
        oa(
          e,
          n,
          r,
          l
        ), d & 2048 && yd(n.alternate, n);
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
  function Ni(e, n, r, l, d) {
    for (d = d && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var h = e, x = n, E = r, L = l, J = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
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
          var oe = x.stateNode;
          x.memoizedState !== null ? oe._visibility & 2 ? Ni(
            h,
            x,
            E,
            L,
            d
          ) : ks(
            h,
            x
          ) : (oe._visibility |= 2, Ni(
            h,
            x,
            E,
            L,
            d
          )), d && J & 2048 && gd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ni(
            h,
            x,
            E,
            L,
            d
          ), d && J & 2048 && yd(x.alternate, x);
          break;
        default:
          Ni(
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
  function Ti(e, n, r) {
    if (e.subtreeFlags & zs)
      for (e = e.child; e !== null; )
        qv(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function qv(e, n, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          n,
          r
        ), e.flags & zs && e.memoizedState !== null && Kj(
          r,
          la,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ti(
          e,
          n,
          r
        );
        break;
      case 3:
      case 4:
        var l = la;
        la = Ro(e.stateNode.containerInfo), Ti(
          e,
          n,
          r
        ), la = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = zs, zs = 16777216, Ti(
          e,
          n,
          r
        ), zs = l) : Ti(
          e,
          n,
          r
        ));
        break;
      default:
        Ti(
          e,
          n,
          r
        );
    }
  }
  function Iv(e) {
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
          Wt = l, Yv(
            l,
            e
          );
        }
      Iv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Fv(e), e = e.sibling;
  }
  function Fv(e) {
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
          Wt = l, Yv(
            l,
            e
          );
        }
      Iv(e);
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
  function Yv(e, n) {
    for (; Wt !== null; ) {
      var r = Wt;
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
      if (l = r.child, l !== null) l.return = r, Wt = l;
      else
        e: for (r = e; Wt !== null; ) {
          l = Wt;
          var d = l.sibling, h = l.return;
          if (Ov(l), l === r) {
            Wt = null;
            break e;
          }
          if (d !== null) {
            d.return = h, Wt = d;
            break e;
          }
          Wt = h;
        }
    }
  }
  var cj = {
    getCacheForType: function(e) {
      var n = rn(It), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return rn(It).controller.signal;
    }
  }, uj = typeof WeakMap == "function" ? WeakMap : Map, lt = 0, yt = null, Xe = null, Je = 0, ut = 0, Ln = null, nr = !1, Ci = !1, bd = !1, La = 0, Dt = 0, ar = 0, Ir = 0, xd = 0, Un = 0, Ri = 0, Ls = null, En = null, Sd = !1, vo = 0, Gv = 0, go = 1 / 0, yo = null, rr = null, Qt = 0, ir = null, _i = null, Ua = 0, wd = 0, jd = null, Pv = null, Us = 0, Ed = null;
  function $n() {
    return (lt & 2) !== 0 && Je !== 0 ? Je & -Je : k.T !== null ? Md() : me();
  }
  function Kv() {
    if (Un === 0)
      if ((Je & 536870912) === 0 || et) {
        var e = tn;
        tn <<= 1, (tn & 3932160) === 0 && (tn = 262144), Un = e;
      } else Un = 536870912;
    return e = zn.current, e !== null && (e.flags |= 32), Un;
  }
  function Nn(e, n, r) {
    (e === yt && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null) && (Mi(e, 0), sr(
      e,
      Je,
      Un,
      !1
    )), ft(e, r), ((lt & 2) === 0 || e !== yt) && (e === yt && ((lt & 2) === 0 && (Ir |= r), Dt === 4 && sr(
      e,
      Je,
      Un,
      !1
    )), ga(e));
  }
  function Xv(e, n, r) {
    if ((lt & 6) !== 0) throw Error(s(327));
    var l = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || st(e, n), d = l ? hj(e, n) : Td(e, n, !0), h = l;
    do {
      if (d === 0) {
        Ci && !l && sr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, h && !dj(r)) {
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
              if (L && (Mi(E, x).flags |= 256), x = Td(
                E,
                x,
                !1
              ), x !== 2) {
                if (bd && !L) {
                  E.errorRecoveryDisabledLanes |= h, Ir |= h, d = 4;
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
          Mi(e, 0), sr(e, n, 0, !0);
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
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (d = vo + 300 - Ot(), 10 < d)) {
            if (sr(
              l,
              n,
              Un,
              !nr
            ), Le(l, 0, !0) !== 0) break e;
            Ua = n, l.timeoutHandle = Tg(
              Qv.bind(
                null,
                l,
                r,
                En,
                yo,
                Sd,
                n,
                Un,
                Ir,
                Ri,
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
          Qv(
            l,
            r,
            En,
            yo,
            Sd,
            n,
            Un,
            Ir,
            Ri,
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
    ga(e);
  }
  function Qv(e, n, r, l, d, h, x, E, L, J, oe, fe, re, se) {
    if (e.timeoutHandle = -1, fe = n.subtreeFlags, fe & 8192 || (fe & 16785408) === 16785408) {
      fe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wa
      }, qv(
        n,
        h,
        fe
      );
      var Ee = (h & 62914560) === h ? vo - Ot() : (h & 4194048) === h ? Gv - Ot() : 0;
      if (Ee = Xj(
        fe,
        Ee
      ), Ee !== null) {
        Ua = h, e.cancelPendingCommit = Ee(
          rg.bind(
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
            oe,
            fe,
            null,
            re,
            se
          )
        ), sr(e, h, x, !J);
        return;
      }
    }
    rg(
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
  function dj(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var l = 0; l < r.length; l++) {
          var d = r[l], h = d.getSnapshot;
          d = d.value;
          try {
            if (!Dn(h(), d)) return !1;
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
      var h = 31 - Ve(d), x = 1 << h;
      l[h] = -1, d &= ~x;
    }
    r !== 0 && Sa(e, r, n);
  }
  function bo() {
    return (lt & 6) === 0 ? ($s(0), !1) : !0;
  }
  function Nd() {
    if (Xe !== null) {
      if (ut === 0)
        var e = Xe.return;
      else
        e = Xe, Ta = zr = null, Hu(e), xi = null, xs = 0, e = Xe;
      for (; e !== null; )
        Cv(e.alternate, e), e = e.return;
      Xe = null;
    }
  }
  function Mi(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, Aj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), Ua = 0, Nd(), yt = e, Xe = r = Ea(e.current, null), Je = n, ut = 0, Ln = null, nr = !1, Ci = st(e, n), bd = !1, Ri = Un = xd = Ir = ar = Dt = 0, En = Ls = null, Sd = !1, (n & 8) !== 0 && (n |= n & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= n; 0 < l; ) {
        var d = 31 - Ve(l), h = 1 << d;
        n |= e[d], l &= ~h;
      }
    return La = n, Bl(), r;
  }
  function Zv(e, n) {
    qe = null, k.H = Rs, n === bi || n === Pl ? (n = hp(), ut = 3) : n === _u ? (n = hp(), ut = 4) : ut = n === ad ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ln = n, Xe === null && (Dt = 1, lo(
      e,
      Yn(n, e.current)
    ));
  }
  function Jv() {
    var e = zn.current;
    return e === null ? !0 : (Je & 4194048) === Je ? Xn === null : (Je & 62914560) === Je || (Je & 536870912) !== 0 ? e === Xn : !1;
  }
  function Wv() {
    var e = k.H;
    return k.H = Rs, e === null ? Rs : e;
  }
  function eg() {
    var e = k.A;
    return k.A = cj, e;
  }
  function xo() {
    Dt = 4, nr || (Je & 4194048) !== Je && zn.current !== null || (Ci = !0), (ar & 134217727) === 0 && (Ir & 134217727) === 0 || yt === null || sr(
      yt,
      Je,
      Un,
      !1
    );
  }
  function Td(e, n, r) {
    var l = lt;
    lt |= 2;
    var d = Wv(), h = eg();
    (yt !== e || Je !== n) && (yo = null, Mi(e, n)), n = !1;
    var x = Dt;
    e: do
      try {
        if (ut !== 0 && Xe !== null) {
          var E = Xe, L = Ln;
          switch (ut) {
            case 8:
              Nd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              zn.current === null && (n = !0);
              var J = ut;
              if (ut = 0, Ln = null, Ai(e, E, L, J), r && Ci) {
                x = 0;
                break e;
              }
              break;
            default:
              J = ut, ut = 0, Ln = null, Ai(e, E, L, J);
          }
        }
        fj(), x = Dt;
        break;
      } catch (oe) {
        Zv(e, oe);
      }
    while (!0);
    return n && e.shellSuspendCounter++, Ta = zr = null, lt = l, k.H = d, k.A = h, Xe === null && (yt = null, Je = 0, Bl()), x;
  }
  function fj() {
    for (; Xe !== null; ) tg(Xe);
  }
  function hj(e, n) {
    var r = lt;
    lt |= 2;
    var l = Wv(), d = eg();
    yt !== e || Je !== n ? (yo = null, go = Ot() + 500, Mi(e, n)) : Ci = st(
      e,
      n
    );
    e: do
      try {
        if (ut !== 0 && Xe !== null) {
          n = Xe;
          var h = Ln;
          t: switch (ut) {
            case 1:
              ut = 0, Ln = null, Ai(e, n, h, 1);
              break;
            case 2:
            case 9:
              if (dp(h)) {
                ut = 0, Ln = null, ng(n);
                break;
              }
              n = function() {
                ut !== 2 && ut !== 9 || yt !== e || (ut = 7), ga(e);
              }, h.then(n, n);
              break e;
            case 3:
              ut = 7;
              break e;
            case 4:
              ut = 5;
              break e;
            case 7:
              dp(h) ? (ut = 0, Ln = null, ng(n)) : (ut = 0, Ln = null, Ai(e, n, h, 7));
              break;
            case 5:
              var x = null;
              switch (Xe.tag) {
                case 26:
                  x = Xe.memoizedState;
                case 5:
                case 27:
                  var E = Xe;
                  if (x ? Hg(x) : E.stateNode.complete) {
                    ut = 0, Ln = null;
                    var L = E.sibling;
                    if (L !== null) Xe = L;
                    else {
                      var J = E.return;
                      J !== null ? (Xe = J, So(J)) : Xe = null;
                    }
                    break t;
                  }
              }
              ut = 0, Ln = null, Ai(e, n, h, 5);
              break;
            case 6:
              ut = 0, Ln = null, Ai(e, n, h, 6);
              break;
            case 8:
              Nd(), Dt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        mj();
        break;
      } catch (oe) {
        Zv(e, oe);
      }
    while (!0);
    return Ta = zr = null, k.H = l, k.A = d, lt = r, Xe !== null ? 0 : (yt = null, Je = 0, Bl(), Dt);
  }
  function mj() {
    for (; Xe !== null && !zt(); )
      tg(Xe);
  }
  function tg(e) {
    var n = Nv(e.alternate, e, La);
    e.memoizedProps = e.pendingProps, n === null ? So(e) : Xe = n;
  }
  function ng(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = bv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Je
        );
        break;
      case 11:
        n = bv(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Je
        );
        break;
      case 5:
        Hu(n);
      default:
        Cv(r, n), n = Xe = ep(n, La), n = Nv(r, n, La);
    }
    e.memoizedProps = e.pendingProps, n === null ? So(e) : Xe = n;
  }
  function Ai(e, n, r, l) {
    Ta = zr = null, Hu(n), xi = null, xs = 0;
    var d = n.return;
    try {
      if (nj(
        e,
        d,
        n,
        r,
        Je
      )) {
        Dt = 1, lo(
          e,
          Yn(r, e.current)
        ), Xe = null;
        return;
      }
    } catch (h) {
      if (d !== null) throw Xe = d, h;
      Dt = 1, lo(
        e,
        Yn(r, e.current)
      ), Xe = null;
      return;
    }
    n.flags & 32768 ? (et || l === 1 ? e = !0 : Ci || (Je & 536870912) !== 0 ? e = !1 : (nr = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = zn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ag(n, e)) : So(n);
  }
  function So(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        ag(
          n,
          nr
        );
        return;
      }
      e = n.return;
      var r = ij(
        n.alternate,
        n,
        La
      );
      if (r !== null) {
        Xe = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        Xe = n;
        return;
      }
      Xe = n = e;
    } while (n !== null);
    Dt === 0 && (Dt = 5);
  }
  function ag(e, n) {
    do {
      var r = sj(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Xe = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        Xe = e;
        return;
      }
      Xe = e = r;
    } while (e !== null);
    Dt = 6, Xe = null;
  }
  function rg(e, n, r, l, d, h, x, E, L) {
    e.cancelPendingCommit = null;
    do
      wo();
    while (Qt !== 0);
    if ((lt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === e.current) throw Error(s(177));
      if (h = n.lanes | n.childLanes, h |= mu, nn(
        e,
        r,
        h,
        x,
        E,
        L
      ), e === yt && (Xe = yt = null, Je = 0), _i = n, ir = e, Ua = r, wd = h, jd = d, Pv = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yj(it, function() {
        return cg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null, d = U.p, U.p = 2, x = lt, lt |= 4;
        try {
          lj(e, n, r);
        } finally {
          lt = x, U.p = d, k.T = l;
        }
      }
      Qt = 1, ig(), sg(), lg();
    }
  }
  function ig() {
    if (Qt === 1) {
      Qt = 0;
      var e = ir, n = _i, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = k.T, k.T = null;
        var l = U.p;
        U.p = 2;
        var d = lt;
        lt |= 4;
        try {
          Bv(n, e);
          var h = $d, x = Ym(e.containerInfo), E = h.focusedElem, L = h.selectionRange;
          if (x !== E && E && E.ownerDocument && Fm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && cu(E)) {
              var J = L.start, oe = L.end;
              if (oe === void 0 && (oe = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  oe,
                  E.value.length
                );
              else {
                var fe = E.ownerDocument || document, re = fe && fe.defaultView || window;
                if (re.getSelection) {
                  var se = re.getSelection(), Ee = E.textContent.length, Ue = Math.min(L.start, Ee), vt = L.end === void 0 ? Ue : Math.min(L.end, Ee);
                  !se.extend && Ue > vt && (x = vt, vt = Ue, Ue = x);
                  var P = Im(
                    E,
                    Ue
                  ), B = Im(
                    E,
                    vt
                  );
                  if (P && B && (se.rangeCount !== 1 || se.anchorNode !== P.node || se.anchorOffset !== P.offset || se.focusNode !== B.node || se.focusOffset !== B.offset)) {
                    var Z = fe.createRange();
                    Z.setStart(P.node, P.offset), se.removeAllRanges(), Ue > vt ? (se.addRange(Z), se.extend(B.node, B.offset)) : (Z.setEnd(B.node, B.offset), se.addRange(Z));
                  }
                }
              }
            }
            for (fe = [], se = E; se = se.parentNode; )
              se.nodeType === 1 && fe.push({
                element: se,
                left: se.scrollLeft,
                top: se.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < fe.length; E++) {
              var de = fe[E];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          zo = !!Ud, $d = Ud = null;
        } finally {
          lt = d, U.p = l, k.T = r;
        }
      }
      e.current = n, Qt = 2;
    }
  }
  function sg() {
    if (Qt === 2) {
      Qt = 0;
      var e = ir, n = _i, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = k.T, k.T = null;
        var l = U.p;
        U.p = 2;
        var d = lt;
        lt |= 4;
        try {
          zv(e, n.alternate, n);
        } finally {
          lt = d, U.p = l, k.T = r;
        }
      }
      Qt = 3;
    }
  }
  function lg() {
    if (Qt === 4 || Qt === 3) {
      Qt = 0, bn();
      var e = ir, n = _i, r = Ua, l = Pv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Qt = 5 : (Qt = 0, _i = ir = null, og(e, e.pendingLanes));
      var d = e.pendingLanes;
      if (d === 0 && (rr = null), Q(r), n = n.stateNode, we && typeof we.onCommitFiberRoot == "function")
        try {
          we.onCommitFiberRoot(
            Ae,
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
      (Ua & 3) !== 0 && wo(), ga(e), d = e.pendingLanes, (r & 261930) !== 0 && (d & 42) !== 0 ? e === Ed ? Us++ : (Us = 0, Ed = e) : Us = 0, $s(0);
    }
  }
  function og(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, ys(n)));
  }
  function wo() {
    return ig(), sg(), lg(), cg();
  }
  function cg() {
    if (Qt !== 5) return !1;
    var e = ir, n = wd;
    wd = 0;
    var r = Q(Ua), l = k.T, d = U.p;
    try {
      U.p = 32 > r ? 32 : r, k.T = null, r = jd, jd = null;
      var h = ir, x = Ua;
      if (Qt = 0, _i = ir = null, Ua = 0, (lt & 6) !== 0) throw Error(s(331));
      var E = lt;
      if (lt |= 4, Fv(h.current), Hv(
        h,
        h.current,
        x,
        r
      ), lt = E, $s(0, !1), we && typeof we.onPostCommitFiberRoot == "function")
        try {
          we.onPostCommitFiberRoot(Ae, h);
        } catch {
        }
      return !0;
    } finally {
      U.p = d, k.T = l, og(e, n);
    }
  }
  function ug(e, n, r) {
    n = Yn(r, n), n = nd(e.stateNode, n, 2), e = Ja(e, n, 2), e !== null && (ft(e, 2), ga(e));
  }
  function dt(e, n, r) {
    if (e.tag === 3)
      ug(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          ug(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var l = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (rr === null || !rr.has(l))) {
            e = Yn(r, e), r = dv(2), l = Ja(n, r, 2), l !== null && (fv(
              r,
              l,
              n,
              e
            ), ft(l, 2), ga(l));
            break;
          }
        }
        n = n.return;
      }
  }
  function Cd(e, n, r) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new uj();
      var d = /* @__PURE__ */ new Set();
      l.set(n, d);
    } else
      d = l.get(n), d === void 0 && (d = /* @__PURE__ */ new Set(), l.set(n, d));
    d.has(r) || (bd = !0, d.add(r), e = pj.bind(null, e, n, r), n.then(e, e));
  }
  function pj(e, n, r) {
    var l = e.pingCache;
    l !== null && l.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, yt === e && (Je & r) === r && (Dt === 4 || Dt === 3 && (Je & 62914560) === Je && 300 > Ot() - vo ? (lt & 2) === 0 && Mi(e, 0) : xd |= r, Ri === Je && (Ri = 0)), ga(e);
  }
  function dg(e, n) {
    n === 0 && (n = Xt()), e = Ar(e, n), e !== null && (ft(e, n), ga(e));
  }
  function vj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), dg(e, r);
  }
  function gj(e, n) {
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
    l !== null && l.delete(n), dg(e, r);
  }
  function yj(e, n) {
    return en(e, n);
  }
  var jo = null, Di = null, Rd = !1, Eo = !1, _d = !1, lr = 0;
  function ga(e) {
    e !== Di && e.next === null && (Di === null ? jo = Di = e : Di = Di.next = e), Eo = !0, Rd || (Rd = !0, xj());
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
              h = (1 << 31 - Ve(42 | e) + 1) - 1, h &= d & ~(x & ~E), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = !0, pg(l, h));
          } else
            h = Je, h = Le(
              l,
              l === yt ? h : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (h & 3) === 0 || st(l, h) || (r = !0, pg(l, h));
          l = l.next;
        }
      while (r);
      _d = !1;
    }
  }
  function bj() {
    fg();
  }
  function fg() {
    Eo = Rd = !1;
    var e = 0;
    lr !== 0 && Mj() && (e = lr);
    for (var n = Ot(), r = null, l = jo; l !== null; ) {
      var d = l.next, h = hg(l, n);
      h === 0 ? (l.next = null, r === null ? jo = d : r.next = d, d === null && (Di = r)) : (r = l, (e !== 0 || (h & 3) !== 0) && (Eo = !0)), l = d;
    }
    Qt !== 0 && Qt !== 5 || $s(e), lr !== 0 && (lr = 0);
  }
  function hg(e, n) {
    for (var r = e.suspendedLanes, l = e.pingedLanes, d = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Ve(h), E = 1 << x, L = d[x];
      L === -1 ? ((E & r) === 0 || (E & l) !== 0) && (d[x] = Mt(E, n)) : L <= n && (e.expiredLanes |= E), h &= ~E;
    }
    if (n = yt, r = Je, r = Le(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, r === 0 || e === n && (ut === 2 || ut === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && yn(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || st(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (l !== null && yn(l), Q(r)) {
        case 2:
        case 8:
          r = Ze;
          break;
        case 32:
          r = it;
          break;
        case 268435456:
          r = Lt;
          break;
        default:
          r = it;
      }
      return l = mg.bind(null, e), r = en(r, l), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return l !== null && l !== null && yn(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function mg(e, n) {
    if (Qt !== 0 && Qt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (wo() && e.callbackNode !== r)
      return null;
    var l = Je;
    return l = Le(
      e,
      e === yt ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Xv(e, l, n), hg(e, Ot()), e.callbackNode != null && e.callbackNode === r ? mg.bind(null, e) : null);
  }
  function pg(e, n) {
    if (wo()) return null;
    Xv(e, n, !0);
  }
  function xj() {
    Dj(function() {
      (lt & 6) !== 0 ? en(
        Oe,
        bj
      ) : fg();
    });
  }
  function Md() {
    if (lr === 0) {
      var e = gi;
      e === 0 && (e = qn, qn <<= 1, (qn & 261888) === 0 && (qn = 256)), lr = e;
    }
    return lr;
  }
  function vg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Al("" + e);
  }
  function gg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function Sj(e, n, r, l, d) {
    if (n === "submit" && r && r.stateNode === d) {
      var h = vg(
        (d[be] || null).action
      ), x = l.submitter;
      x && (n = (n = x[be] || null) ? vg(n.formAction) : x.getAttribute("formAction"), n !== null && (h = n, x = null));
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
                  var L = x ? gg(d, x) : new FormData(d);
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
                typeof h == "function" && (E.preventDefault(), L = x ? gg(d, x) : new FormData(d), Qu(
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
    var Dd = hu[Ad], wj = Dd.toLowerCase(), jj = Dd[0].toUpperCase() + Dd.slice(1);
    sa(
      wj,
      "on" + jj
    );
  }
  sa(Km, "onAnimationEnd"), sa(Xm, "onAnimationIteration"), sa(Qm, "onAnimationStart"), sa("dblclick", "onDoubleClick"), sa("focusin", "onFocus"), sa("focusout", "onBlur"), sa(Bw, "onTransitionRun"), sa(Vw, "onTransitionStart"), sa(Hw, "onTransitionCancel"), sa(Zm, "onTransitionEnd"), fa("onMouseEnter", ["mouseout", "mouseover"]), fa("onMouseLeave", ["mouseout", "mouseover"]), fa("onPointerEnter", ["pointerout", "pointerover"]), fa("onPointerLeave", ["pointerout", "pointerover"]), Jt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Jt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Jt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Jt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Jt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Jt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ej = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bs)
  );
  function yg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var l = e[r], d = l.event;
      l = l.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var x = l.length - 1; 0 <= x; x--) {
            var E = l[x], L = E.instance, J = E.currentTarget;
            if (E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = J;
            try {
              h(d);
            } catch (oe) {
              $l(oe);
            }
            d.currentTarget = null, h = L;
          }
        else
          for (x = 0; x < l.length; x++) {
            if (E = l[x], L = E.instance, J = E.currentTarget, E = E.listener, L !== h && d.isPropagationStopped())
              break e;
            h = E, d.currentTarget = J;
            try {
              h(d);
            } catch (oe) {
              $l(oe);
            }
            d.currentTarget = null, h = L;
          }
      }
    }
  }
  function Qe(e, n) {
    var r = n[Se];
    r === void 0 && (r = n[Se] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    r.has(l) || (bg(n, e, 2, !1), r.add(l));
  }
  function kd(e, n, r) {
    var l = 0;
    n && (l |= 4), bg(
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
        r !== "selectionchange" && (Ej.has(r) || kd(r, !1, e), kd(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[No] || (n[No] = !0, kd("selectionchange", !1, n));
    }
  }
  function bg(e, n, r, l) {
    switch (Kg(n)) {
      case 2:
        var d = Jj;
        break;
      case 8:
        d = Wj;
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
            if (x = ht(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              l = h = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        l = l.return;
      }
    Em(function() {
      var J = h, oe = Jc(r), fe = [];
      e: {
        var re = Jm.get(e);
        if (re !== void 0) {
          var se = Ol, Ee = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              se = gw;
              break;
            case "focusin":
              Ee = "focus", se = ru;
              break;
            case "focusout":
              Ee = "blur", se = ru;
              break;
            case "beforeblur":
            case "afterblur":
              se = ru;
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
              se = Cm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = iw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = xw;
              break;
            case Km:
            case Xm:
            case Qm:
              se = ow;
              break;
            case Zm:
              se = ww;
              break;
            case "scroll":
            case "scrollend":
              se = aw;
              break;
            case "wheel":
              se = Ew;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = uw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = _m;
              break;
            case "toggle":
            case "beforetoggle":
              se = Tw;
          }
          var Ue = (n & 4) !== 0, vt = !Ue && (e === "scroll" || e === "scrollend"), P = Ue ? re !== null ? re + "Capture" : null : re;
          Ue = [];
          for (var B = J, Z; B !== null; ) {
            var de = B;
            if (Z = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || Z === null || P === null || (de = ls(B, P), de != null && Ue.push(
              Vs(B, de, Z)
            )), vt) break;
            B = B.return;
          }
          0 < Ue.length && (re = new se(
            re,
            Ee,
            null,
            r,
            oe
          ), fe.push({ event: re, listeners: Ue }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (re = e === "mouseover" || e === "pointerover", se = e === "mouseout" || e === "pointerout", re && r !== Zc && (Ee = r.relatedTarget || r.fromElement) && (ht(Ee) || Ee[Re]))
            break e;
          if ((se || re) && (re = oe.window === oe ? oe : (re = oe.ownerDocument) ? re.defaultView || re.parentWindow : window, se ? (Ee = r.relatedTarget || r.toElement, se = J, Ee = Ee ? ht(Ee) : null, Ee !== null && (vt = u(Ee), Ue = Ee.tag, Ee !== vt || Ue !== 5 && Ue !== 27 && Ue !== 6) && (Ee = null)) : (se = null, Ee = J), se !== Ee)) {
            if (Ue = Cm, de = "onMouseLeave", P = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Ue = _m, de = "onPointerLeave", P = "onPointerEnter", B = "pointer"), vt = se == null ? re : Ke(se), Z = Ee == null ? re : Ke(Ee), re = new Ue(
              de,
              B + "leave",
              se,
              r,
              oe
            ), re.target = vt, re.relatedTarget = Z, de = null, ht(oe) === J && (Ue = new Ue(
              P,
              B + "enter",
              Ee,
              r,
              oe
            ), Ue.target = Z, Ue.relatedTarget = vt, de = Ue), vt = de, se && Ee)
              t: {
                for (Ue = Nj, P = se, B = Ee, Z = 0, de = P; de; de = Ue(de))
                  Z++;
                de = 0;
                for (var De = B; De; De = Ue(De))
                  de++;
                for (; 0 < Z - de; )
                  P = Ue(P), Z--;
                for (; 0 < de - Z; )
                  B = Ue(B), de--;
                for (; Z--; ) {
                  if (P === B || B !== null && P === B.alternate) {
                    Ue = P;
                    break t;
                  }
                  P = Ue(P), B = Ue(B);
                }
                Ue = null;
              }
            else Ue = null;
            se !== null && xg(
              fe,
              re,
              se,
              Ue,
              !1
            ), Ee !== null && vt !== null && xg(
              fe,
              vt,
              Ee,
              Ue,
              !0
            );
          }
        }
        e: {
          if (re = J ? Ke(J) : window, se = re.nodeName && re.nodeName.toLowerCase(), se === "select" || se === "input" && re.type === "file")
            var at = Um;
          else if (Om(re))
            if ($m)
              at = Lw;
            else {
              at = zw;
              var _e = kw;
            }
          else
            se = re.nodeName, !se || se.toLowerCase() !== "input" || re.type !== "checkbox" && re.type !== "radio" ? J && Qc(J.elementType) && (at = Um) : at = Ow;
          if (at && (at = at(e, J))) {
            Lm(
              fe,
              at,
              r,
              oe
            );
            break e;
          }
          _e && _e(e, re, J), e === "focusout" && J && re.type === "number" && J.memoizedProps.value != null && Xc(re, "number", re.value);
        }
        switch (_e = J ? Ke(J) : window, e) {
          case "focusin":
            (Om(_e) || _e.contentEditable === "true") && (ci = _e, uu = J, ps = null);
            break;
          case "focusout":
            ps = uu = ci = null;
            break;
          case "mousedown":
            du = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            du = !1, Gm(fe, r, oe);
            break;
          case "selectionchange":
            if ($w) break;
          case "keydown":
          case "keyup":
            Gm(fe, r, oe);
        }
        var Ie;
        if (su)
          e: {
            switch (e) {
              case "compositionstart":
                var We = "onCompositionStart";
                break e;
              case "compositionend":
                We = "onCompositionEnd";
                break e;
              case "compositionupdate":
                We = "onCompositionUpdate";
                break e;
            }
            We = void 0;
          }
        else
          oi ? km(e, r) && (We = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (We = "onCompositionStart");
        We && (Mm && r.locale !== "ko" && (oi || We !== "onCompositionStart" ? We === "onCompositionEnd" && oi && (Ie = Nm()) : (Ya = oe, tu = "value" in Ya ? Ya.value : Ya.textContent, oi = !0)), _e = To(J, We), 0 < _e.length && (We = new Rm(
          We,
          e,
          null,
          r,
          oe
        ), fe.push({ event: We, listeners: _e }), Ie ? We.data = Ie : (Ie = zm(r), Ie !== null && (We.data = Ie)))), (Ie = Rw ? _w(e, r) : Mw(e, r)) && (We = To(J, "onBeforeInput"), 0 < We.length && (_e = new Rm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          oe
        ), fe.push({
          event: _e,
          listeners: We
        }), _e.data = Ie)), Sj(
          fe,
          e,
          J,
          r,
          oe
        );
      }
      yg(fe, n);
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
  function Nj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xg(e, n, r, l, d) {
    for (var h = n._reactName, x = []; r !== null && r !== l; ) {
      var E = r, L = E.alternate, J = E.stateNode;
      if (E = E.tag, L !== null && L === l) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (L = J, d ? (J = ls(r, h), J != null && x.unshift(
        Vs(r, J, L)
      )) : d || (J = ls(r, h), J != null && x.push(
        Vs(r, J, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var Tj = /\r\n?/g, Cj = /\u0000|\uFFFD/g;
  function Sg(e) {
    return (typeof e == "string" ? e : "" + e).replace(Tj, `
`).replace(Cj, "");
  }
  function wg(e, n) {
    return n = Sg(n), Sg(e) === n;
  }
  function pt(e, n, r, l, d, h) {
    switch (r) {
      case "children":
        typeof l == "string" ? n === "body" || n === "textarea" && l === "" || ii(e, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && ii(e, "" + l);
        break;
      case "className":
        Ut(e, "class", l);
        break;
      case "tabIndex":
        Ut(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ut(e, r, l);
        break;
      case "style":
        wm(e, l, h);
        break;
      case "data":
        if (n !== "object") {
          Ut(e, "data", l);
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
          typeof h == "function" && (r === "formAction" ? (n !== "input" && pt(e, n, "name", d.name, d, null), pt(
            e,
            n,
            "formEncType",
            d.formEncType,
            d,
            null
          ), pt(
            e,
            n,
            "formMethod",
            d.formMethod,
            d,
            null
          ), pt(
            e,
            n,
            "formTarget",
            d.formTarget,
            d,
            null
          )) : (pt(e, n, "encType", d.encType, d, null), pt(e, n, "method", d.method, d, null), pt(e, n, "target", d.target, d, null)));
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
        l != null && Qe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Qe("scrollend", e);
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
        Qe("beforetoggle", e), Qe("toggle", e), Ge(e, "popover", l);
        break;
      case "xlinkActuate":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        fn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        fn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        fn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        fn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Ge(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = tw.get(r) || r, Ge(e, r, l));
    }
  }
  function Ld(e, n, r, l, d, h) {
    switch (r) {
      case "style":
        wm(e, l, h);
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
        typeof l == "string" ? ii(e, l) : (typeof l == "number" || typeof l == "bigint") && ii(e, "" + l);
        break;
      case "onScroll":
        l != null && Qe("scroll", e);
        break;
      case "onScrollEnd":
        l != null && Qe("scrollend", e);
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
            if (r[0] === "o" && r[1] === "n" && (d = r.endsWith("Capture"), n = r.slice(2, d ? r.length - 7 : void 0), h = e[be] || null, h = h != null ? h[r] : null, typeof h == "function" && e.removeEventListener(n, h, d), typeof l == "function")) {
              typeof h != "function" && h !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, l, d);
              break e;
            }
            r in e ? e[r] = l : l === !0 ? e.setAttribute(r, "") : Ge(e, r, l);
          }
    }
  }
  function ln(e, n, r) {
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
        Qe("error", e), Qe("load", e);
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
                  pt(e, n, h, x, r, null);
              }
          }
        d && pt(e, n, "srcSet", r.srcSet, r, null), l && pt(e, n, "src", r.src, r, null);
        return;
      case "input":
        Qe("invalid", e);
        var E = h = x = d = null, L = null, J = null;
        for (l in r)
          if (r.hasOwnProperty(l)) {
            var oe = r[l];
            if (oe != null)
              switch (l) {
                case "name":
                  d = oe;
                  break;
                case "type":
                  x = oe;
                  break;
                case "checked":
                  L = oe;
                  break;
                case "defaultChecked":
                  J = oe;
                  break;
                case "value":
                  h = oe;
                  break;
                case "defaultValue":
                  E = oe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (oe != null)
                    throw Error(s(137, n));
                  break;
                default:
                  pt(e, n, l, oe, r, null);
              }
          }
        ym(
          e,
          h,
          E,
          L,
          J,
          x,
          d,
          !1
        );
        return;
      case "select":
        Qe("invalid", e), l = x = h = null;
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
                pt(e, n, d, E, r, null);
            }
        n = h, r = x, e.multiple = !!l, n != null ? ri(e, !!l, n, !1) : r != null && ri(e, !!l, r, !0);
        return;
      case "textarea":
        Qe("invalid", e), h = d = l = null;
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
                pt(e, n, x, E, r, null);
            }
        xm(e, l, d, h);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (l = r[L], l != null))
            switch (L) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                pt(e, n, L, l, r, null);
            }
        return;
      case "dialog":
        Qe("beforetoggle", e), Qe("toggle", e), Qe("cancel", e), Qe("close", e);
        break;
      case "iframe":
      case "object":
        Qe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bs.length; l++)
          Qe(Bs[l], e);
        break;
      case "image":
        Qe("error", e), Qe("load", e);
        break;
      case "details":
        Qe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Qe("error", e), Qe("load", e);
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
        for (J in r)
          if (r.hasOwnProperty(J) && (l = r[J], l != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                pt(e, n, J, l, r, null);
            }
        return;
      default:
        if (Qc(n)) {
          for (oe in r)
            r.hasOwnProperty(oe) && (l = r[oe], l !== void 0 && Ld(
              e,
              n,
              oe,
              l,
              r,
              void 0
            ));
          return;
        }
    }
    for (E in r)
      r.hasOwnProperty(E) && (l = r[E], l != null && pt(e, n, E, l, r, null));
  }
  function Rj(e, n, r, l) {
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
        var d = null, h = null, x = null, E = null, L = null, J = null, oe = null;
        for (se in r) {
          var fe = r[se];
          if (r.hasOwnProperty(se) && fe != null)
            switch (se) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = fe;
              default:
                l.hasOwnProperty(se) || pt(e, n, se, null, l, fe);
            }
        }
        for (var re in l) {
          var se = l[re];
          if (fe = r[re], l.hasOwnProperty(re) && (se != null || fe != null))
            switch (re) {
              case "type":
                h = se;
                break;
              case "name":
                d = se;
                break;
              case "checked":
                J = se;
                break;
              case "defaultChecked":
                oe = se;
                break;
              case "value":
                x = se;
                break;
              case "defaultValue":
                E = se;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (se != null)
                  throw Error(s(137, n));
                break;
              default:
                se !== fe && pt(
                  e,
                  n,
                  re,
                  se,
                  l,
                  fe
                );
            }
        }
        Kc(
          e,
          x,
          E,
          L,
          J,
          oe,
          h,
          d
        );
        return;
      case "select":
        se = x = E = re = null;
        for (h in r)
          if (L = r[h], r.hasOwnProperty(h) && L != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                se = L;
              default:
                l.hasOwnProperty(h) || pt(
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
                re = h;
                break;
              case "defaultValue":
                E = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== L && pt(
                  e,
                  n,
                  d,
                  h,
                  l,
                  L
                );
            }
        n = E, r = x, l = se, re != null ? ri(e, !!r, re, !1) : !!l != !!r && (n != null ? ri(e, !!r, n, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        se = re = null;
        for (E in r)
          if (d = r[E], r.hasOwnProperty(E) && d != null && !l.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                pt(e, n, E, null, l, d);
            }
        for (x in l)
          if (d = l[x], h = r[x], l.hasOwnProperty(x) && (d != null || h != null))
            switch (x) {
              case "value":
                re = d;
                break;
              case "defaultValue":
                se = d;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(s(91));
                break;
              default:
                d !== h && pt(e, n, x, d, l, h);
            }
        bm(e, re, se);
        return;
      case "option":
        for (var Ee in r)
          if (re = r[Ee], r.hasOwnProperty(Ee) && re != null && !l.hasOwnProperty(Ee))
            switch (Ee) {
              case "selected":
                e.selected = !1;
                break;
              default:
                pt(
                  e,
                  n,
                  Ee,
                  null,
                  l,
                  re
                );
            }
        for (L in l)
          if (re = l[L], se = r[L], l.hasOwnProperty(L) && re !== se && (re != null || se != null))
            switch (L) {
              case "selected":
                e.selected = re && typeof re != "function" && typeof re != "symbol";
                break;
              default:
                pt(
                  e,
                  n,
                  L,
                  re,
                  l,
                  se
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
        for (var Ue in r)
          re = r[Ue], r.hasOwnProperty(Ue) && re != null && !l.hasOwnProperty(Ue) && pt(e, n, Ue, null, l, re);
        for (J in l)
          if (re = l[J], se = r[J], l.hasOwnProperty(J) && re !== se && (re != null || se != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (re != null)
                  throw Error(s(137, n));
                break;
              default:
                pt(
                  e,
                  n,
                  J,
                  re,
                  l,
                  se
                );
            }
        return;
      default:
        if (Qc(n)) {
          for (var vt in r)
            re = r[vt], r.hasOwnProperty(vt) && re !== void 0 && !l.hasOwnProperty(vt) && Ld(
              e,
              n,
              vt,
              void 0,
              l,
              re
            );
          for (oe in l)
            re = l[oe], se = r[oe], !l.hasOwnProperty(oe) || re === se || re === void 0 && se === void 0 || Ld(
              e,
              n,
              oe,
              re,
              l,
              se
            );
          return;
        }
    }
    for (var P in r)
      re = r[P], r.hasOwnProperty(P) && re != null && !l.hasOwnProperty(P) && pt(e, n, P, null, l, re);
    for (fe in l)
      re = l[fe], se = r[fe], !l.hasOwnProperty(fe) || re === se || re == null && se == null || pt(e, n, fe, re, l, se);
  }
  function jg(e) {
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
  function _j() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), l = 0; l < r.length; l++) {
        var d = r[l], h = d.transferSize, x = d.initiatorType, E = d.duration;
        if (h && E && jg(x)) {
          for (x = 0, E = d.responseEnd, l += 1; l < r.length; l++) {
            var L = r[l], J = L.startTime;
            if (J > E) break;
            var oe = L.transferSize, fe = L.initiatorType;
            oe && jg(fe) && (L = L.responseEnd, x += oe * (L < E ? 1 : (E - J) / (L - J)));
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
  function Eg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ng(e, n) {
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
  function Mj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Vd ? !1 : (Vd = e, !0) : (Vd = null, !1);
  }
  var Tg = typeof setTimeout == "function" ? setTimeout : void 0, Aj = typeof clearTimeout == "function" ? clearTimeout : void 0, Cg = typeof Promise == "function" ? Promise : void 0, Dj = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cg < "u" ? function(e) {
    return Cg.resolve(null).then(e).catch(kj);
  } : Tg;
  function kj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function or(e) {
    return e === "head";
  }
  function Rg(e, n) {
    var r = n, l = 0;
    do {
      var d = r.nextSibling;
      if (e.removeChild(r), d && d.nodeType === 8)
        if (r = d.data, r === "/$" || r === "/&") {
          if (l === 0) {
            e.removeChild(d), Li(n);
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
            h[Ye] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = x;
          }
        } else
          r === "body" && Hs(e.ownerDocument.body);
      r = d;
    } while (r);
    Li(n);
  }
  function _g(e, n) {
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
          Hd(r), gt(r);
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
  function zj(e, n, r, l) {
    for (; e.nodeType === 1; ) {
      var d = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Ye])
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
      if (e = Qn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Oj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = Qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Mg(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Qn(e.nextSibling), e === null)) return null;
    return e;
  }
  function qd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Id(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Lj(e, n) {
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
  function Qn(e) {
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
  function Ag(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return Qn(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Dg(e) {
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
  function kg(e, n, r) {
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
    gt(e);
  }
  var Zn = /* @__PURE__ */ new Map(), zg = /* @__PURE__ */ new Set();
  function Ro(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var $a = U.d;
  U.d = {
    f: Uj,
    r: $j,
    D: Bj,
    C: Vj,
    L: Hj,
    m: qj,
    X: Fj,
    S: Ij,
    M: Yj
  };
  function Uj() {
    var e = $a.f(), n = bo();
    return e || n;
  }
  function $j(e) {
    var n = Tt(e);
    n !== null && n.tag === 5 && n.type === "form" ? Zp(n) : $a.r(e);
  }
  var ki = typeof document > "u" ? null : document;
  function Og(e, n, r) {
    var l = ki;
    if (l && typeof n == "string" && n) {
      var d = In(n);
      d = 'link[rel="' + e + '"][href="' + d + '"]', typeof r == "string" && (d += '[crossorigin="' + r + '"]'), zg.has(d) || (zg.add(d), e = { rel: e, crossOrigin: r, href: n }, l.querySelector(d) === null && (n = l.createElement("link"), ln(n, "link", e), St(n), l.head.appendChild(n)));
    }
  }
  function Bj(e) {
    $a.D(e), Og("dns-prefetch", e, null);
  }
  function Vj(e, n) {
    $a.C(e, n), Og("preconnect", e, n);
  }
  function Hj(e, n, r) {
    $a.L(e, n, r);
    var l = ki;
    if (l && e && n) {
      var d = 'link[rel="preload"][as="' + In(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (d += '[imagesrcset="' + In(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (d += '[imagesizes="' + In(
        r.imageSizes
      ) + '"]')) : d += '[href="' + In(e) + '"]';
      var h = d;
      switch (n) {
        case "style":
          h = zi(e);
          break;
        case "script":
          h = Oi(e);
      }
      Zn.has(h) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Zn.set(h, e), l.querySelector(d) !== null || n === "style" && l.querySelector(qs(h)) || n === "script" && l.querySelector(Is(h)) || (n = l.createElement("link"), ln(n, "link", e), St(n), l.head.appendChild(n)));
    }
  }
  function qj(e, n) {
    $a.m(e, n);
    var r = ki;
    if (r && e) {
      var l = n && typeof n.as == "string" ? n.as : "script", d = 'link[rel="modulepreload"][as="' + In(l) + '"][href="' + In(e) + '"]', h = d;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Oi(e);
      }
      if (!Zn.has(h) && (e = v({ rel: "modulepreload", href: e }, n), Zn.set(h, e), r.querySelector(d) === null)) {
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
        l = r.createElement("link"), ln(l, "link", e), St(l), r.head.appendChild(l);
      }
    }
  }
  function Ij(e, n, r) {
    $a.S(e, n, r);
    var l = ki;
    if (l && e) {
      var d = Ht(l).hoistableStyles, h = zi(e);
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
          ), (r = Zn.get(h)) && Yd(e, r);
          var L = x = l.createElement("link");
          St(L), ln(L, "link", e), L._p = new Promise(function(J, oe) {
            L.onload = J, L.onerror = oe;
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
  function Fj(e, n) {
    $a.X(e, n);
    var r = ki;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Oi(e), h = l.get(d);
      h || (h = r.querySelector(Is(d)), h || (e = v({ src: e, async: !0 }, n), (n = Zn.get(d)) && Gd(e, n), h = r.createElement("script"), St(h), ln(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Yj(e, n) {
    $a.M(e, n);
    var r = ki;
    if (r && e) {
      var l = Ht(r).hoistableScripts, d = Oi(e), h = l.get(d);
      h || (h = r.querySelector(Is(d)), h || (e = v({ src: e, async: !0, type: "module" }, n), (n = Zn.get(d)) && Gd(e, n), h = r.createElement("script"), St(h), ln(h, "link", e), r.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, l.set(d, h));
    }
  }
  function Lg(e, n, r, l) {
    var d = (d = ee.current) ? Ro(d) : null;
    if (!d) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = zi(r.href), r = Ht(
          d
        ).hoistableStyles, l = r.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = zi(r.href);
          var h = Ht(
            d
          ).hoistableStyles, x = h.get(e);
          if (x || (d = d.ownerDocument || d, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = d.querySelector(
            qs(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), Zn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Zn.set(e, r), h || Gj(
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Oi(r), r = Ht(
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
  function zi(e) {
    return 'href="' + In(e) + '"';
  }
  function qs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ug(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Gj(e, n, r, l) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = e.createElement("link"), l.preload = n, n.addEventListener("load", function() {
      return l.loading |= 1;
    }), n.addEventListener("error", function() {
      return l.loading |= 2;
    }), ln(n, "link", r), St(n), e.head.appendChild(n));
  }
  function Oi(e) {
    return '[src="' + In(e) + '"]';
  }
  function Is(e) {
    return "script[async]" + e;
  }
  function $g(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + In(r.href) + '"]'
          );
          if (l)
            return n.instance = l, St(l), l;
          var d = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), St(l), ln(l, "style", d), _o(l, r.precedence, e), n.instance = l;
        case "stylesheet":
          d = zi(r.href);
          var h = e.querySelector(
            qs(d)
          );
          if (h)
            return n.state.loading |= 4, n.instance = h, St(h), h;
          l = Ug(r), (d = Zn.get(d)) && Yd(l, d), h = (e.ownerDocument || e).createElement("link"), St(h);
          var x = h;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), ln(h, "link", l), n.state.loading |= 4, _o(h, r.precedence, e), n.instance = h;
        case "script":
          return h = Oi(r.src), (d = e.querySelector(
            Is(h)
          )) ? (n.instance = d, St(d), d) : (l = r, (d = Zn.get(h)) && (l = v({}, r), Gd(l, d)), e = e.ownerDocument || e, d = e.createElement("script"), St(d), ln(d, "link", l), e.head.appendChild(d), n.instance = d);
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
  function Bg(e, n, r) {
    if (Mo === null) {
      var l = /* @__PURE__ */ new Map(), d = Mo = /* @__PURE__ */ new Map();
      d.set(r, l);
    } else
      d = Mo, l = d.get(r), l || (l = /* @__PURE__ */ new Map(), d.set(r, l));
    if (l.has(e)) return l;
    for (l.set(e, null), r = r.getElementsByTagName(e), d = 0; d < r.length; d++) {
      var h = r[d];
      if (!(h[Ye] || h[ye] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(n) || "";
        x = e + x;
        var E = l.get(x);
        E ? E.push(h) : l.set(x, [h]);
      }
    }
    return l;
  }
  function Vg(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function Pj(e, n, r) {
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
  function Hg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Kj(e, n, r, l) {
    if (r.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var d = zi(l.href), h = n.querySelector(
          qs(d)
        );
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Ao.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = h, St(h);
          return;
        }
        h = n.ownerDocument || n, l = Ug(l), (d = Zn.get(d)) && Yd(l, d), h = h.createElement("link"), St(h);
        var x = h;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), ln(h, "link", l), r.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Ao.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Pd = 0;
  function Xj(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var l = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Pd === 0 && (Pd = 62500 * _j());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Do = /* @__PURE__ */ new Map(), n.forEach(Qj, e), Do = null, Ao.call(e));
  }
  function Qj(e, n) {
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
    _currentValue: q,
    _currentValue2: q,
    _threadCount: 0
  };
  function Zj(e, n, r, l, d, h, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = An(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = An(0), this.hiddenUpdates = An(null), this.identifierPrefix = l, this.onUncaughtError = d, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function qg(e, n, r, l, d, h, x, E, L, J, oe, fe) {
    return e = new Zj(
      e,
      n,
      r,
      x,
      L,
      J,
      oe,
      fe,
      E
    ), n = 1, h === !0 && (n |= 24), h = kn(3, null, null, n), e.current = h, h.stateNode = e, n = Tu(), n.refCount++, e.pooledCache = n, n.refCount++, h.memoizedState = {
      element: l,
      isDehydrated: r,
      cache: n
    }, Mu(h), e;
  }
  function Ig(e) {
    return e ? (e = fi, e) : fi;
  }
  function Fg(e, n, r, l, d, h) {
    d = Ig(d), l.context === null ? l.context = d : l.pendingContext = d, l = Za(n), l.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (l.callback = h), r = Ja(e, l, n), r !== null && (Nn(r, e, n), ws(r, e, n));
  }
  function Yg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Kd(e, n) {
    Yg(e, n), (e = e.alternate) && Yg(e, n);
  }
  function Gg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Ar(e, 67108864);
      n !== null && Nn(n, e, 67108864), Kd(e, 67108864);
    }
  }
  function Pg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = $n();
      n = I(n);
      var r = Ar(e, n);
      r !== null && Nn(r, e, n), Kd(e, n);
    }
  }
  var zo = !0;
  function Jj(e, n, r, l) {
    var d = k.T;
    k.T = null;
    var h = U.p;
    try {
      U.p = 2, Xd(e, n, r, l);
    } finally {
      U.p = h, k.T = d;
    }
  }
  function Wj(e, n, r, l) {
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
        ), Xg(e, l);
      else if (tE(
        d,
        e,
        n,
        r,
        l
      ))
        l.stopPropagation();
      else if (Xg(e, l), n & 4 && -1 < eE.indexOf(e)) {
        for (; d !== null; ) {
          var h = Tt(d);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = un(h.pendingLanes);
                  if (x !== 0) {
                    var E = h;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Ve(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ga(h), (lt & 6) === 0 && (go = Ot() + 500, $s(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Ar(h, 2), E !== null && Nn(E, h, 2), bo(), Kd(h, 2);
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
    if (Oo = null, e = ht(e), e !== null) {
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
  function Kg(e) {
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
        switch (xe()) {
          case Oe:
            return 2;
          case Ze:
            return 8;
          case it:
          case Rt:
            return 32;
          case Lt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jd = !1, cr = null, ur = null, dr = null, Ys = /* @__PURE__ */ new Map(), Gs = /* @__PURE__ */ new Map(), fr = [], eE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xg(e, n) {
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
    }, n !== null && (n = Tt(n), n !== null && Gg(n)), e) : (e.eventSystemFlags |= l, n = e.targetContainers, d !== null && n.indexOf(d) === -1 && n.push(d), e);
  }
  function tE(e, n, r, l, d) {
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
  function Qg(e) {
    var n = ht(e.target);
    if (n !== null) {
      var r = u(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = f(r), n !== null) {
            e.blockedOn = n, ve(e.priority, function() {
              Pg(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, ve(e.priority, function() {
              Pg(r);
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
        return n = Tt(r), n !== null && Gg(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Zg(e, n, r) {
    Lo(e) && r.delete(n);
  }
  function nE() {
    Jd = !1, cr !== null && Lo(cr) && (cr = null), ur !== null && Lo(ur) && (ur = null), dr !== null && Lo(dr) && (dr = null), Ys.forEach(Zg), Gs.forEach(Zg);
  }
  function Uo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Jd || (Jd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      nE
    )));
  }
  var $o = null;
  function Jg(e) {
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
          var h = Tt(r);
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
  function Li(e) {
    function n(L) {
      return Uo(L, e);
    }
    cr !== null && Uo(cr, e), ur !== null && Uo(ur, e), dr !== null && Uo(dr, e), Ys.forEach(n), Gs.forEach(n);
    for (var r = 0; r < fr.length; r++) {
      var l = fr[r];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fr.length && (r = fr[0], r.blockedOn === null); )
      Qg(r), r.blockedOn === null && fr.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (l = 0; l < r.length; l += 3) {
        var d = r[l], h = r[l + 1], x = d[be] || null;
        if (typeof h == "function")
          x || Jg(r);
        else if (x) {
          var E = null;
          if (h && h.hasAttribute("formAction")) {
            if (d = h, x = h[be] || null)
              E = x.formAction;
            else if (Zd(d) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[l + 1] = E : (r.splice(l, 3), l -= 3), Jg(r);
        }
      }
  }
  function Wg() {
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
    var r = n.current, l = $n();
    Fg(r, l, e, n, null, null);
  }, Bo.prototype.unmount = Wd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Fg(e.current, 2, null, e, null, null), bo(), n[Re] = null;
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
      fr.splice(r, 0, e), r === 0 && Qg(e);
    }
  };
  var ey = a.version;
  if (ey !== "19.2.5")
    throw Error(
      s(
        527,
        ey,
        "19.2.5"
      )
    );
  U.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var aE = {
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
        Ae = Vo.inject(
          aE
        ), we = Vo;
      } catch {
      }
  }
  return Xs.createRoot = function(e, n) {
    if (!o(e)) throw Error(s(299));
    var r = !1, l = "", d = lv, h = ov, x = cv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (d = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = qg(
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
      Wg
    ), e[Re] = n.current, zd(e), new Wd(n);
  }, Xs.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(s(299));
    var l = !1, d = "", h = lv, x = ov, E = cv, L = null;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (d = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = qg(
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
      Wg
    ), n.context = Ig(null), r = n.current, l = $n(), l = I(l), d = Za(l), d.callback = null, Ja(r, d, l), r = l, n.current.lanes = r, ft(n, r), ga(n), e[Re] = n.current, zd(e), new Bo(n);
  }, Xs.version = "19.2.5", Xs;
}
var uy;
function mE() {
  if (uy) return nf.exports;
  uy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), nf.exports = hE(), nf.exports;
}
var pE = mE();
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
var vx = (t) => {
  throw TypeError(t);
}, vE = (t, a, i) => a.has(t) || vx("Cannot " + i), lf = (t, a, i) => (vE(t, a, "read from private field"), i ? i.call(t) : a.get(t)), gE = (t, a, i) => a.has(t) ? vx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function dy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function yE(t = {}) {
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
  ), f = "POP", m = null;
  function g(S) {
    return Math.min(Math.max(S, 0), o.length - 1);
  }
  function p() {
    return o[u];
  }
  function b(S, j = null, N, C) {
    let T = Xf(
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
      let N = dy(S) ? S : b(S, j);
      u += 1, o.splice(u, o.length, N), s && m && m({ action: f, location: N, delta: 1 });
    },
    replace(S, j) {
      f = "REPLACE";
      let N = dy(S) ? S : b(S, j);
      o[u] = N, s && m && m({ action: f, location: N, delta: 0 });
    },
    go(S) {
      f = "POP";
      let j = g(u + S), N = o[j];
      u = j, m && m({ action: f, location: N, delta: S });
    },
    listen(S) {
      return m = S, () => {
        m = null;
      };
    }
  };
}
function Pe(t, a) {
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
function bE() {
  return Math.random().toString(36).substring(2, 10);
}
function Xf(t, a, i = null, s, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? da(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || s || bE(),
    unstable_mask: o
  };
}
function ba({
  pathname: t = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function da(t) {
  let a = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && (a.hash = t.substring(i), t = t.substring(0, i));
    let s = t.indexOf("?");
    s >= 0 && (a.search = t.substring(s), t = t.substring(0, s)), t && (a.pathname = t);
  }
  return a;
}
function xE(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Pe(i, "No window.location.(origin|href) available to create URL");
  let s = typeof t == "string" ? t : ba(t);
  return s = s.replace(/ $/, "%20"), !a && s.startsWith("//") && (s = i + s), new URL(s, i);
}
var sl, fy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (gE(this, sl, /* @__PURE__ */ new Map()), t)
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
var SE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function wE(t) {
  return SE.has(
    t
  );
}
var jE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function EE(t) {
  return jE.has(
    t
  );
}
function NE(t) {
  return t.index === !0;
}
function hl(t, a, i = [], s = {}, o = !1) {
  return t.map((u, f) => {
    let m = [...i, String(f)], g = typeof u.id == "string" ? u.id : m.join("-");
    if (Pe(
      u.index !== !0 || !u.children,
      "Cannot specify children on an index route"
    ), Pe(
      o || !s[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), NE(u)) {
      let p = {
        ...u,
        id: g
      };
      return s[g] = hy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...u,
        id: g,
        children: void 0
      };
      return s[g] = hy(
        p,
        a(p)
      ), u.children && (p.children = hl(
        u.children,
        a,
        m,
        s,
        o
      )), p;
    }
  });
}
function hy(t, a) {
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
  let o = typeof a == "string" ? da(a) : a, u = na(o.pathname || "/", i);
  if (u == null)
    return null;
  let f = gx(t);
  CE(f);
  let m = null;
  for (let g = 0; m == null && g < f.length; ++g) {
    let p = $E(u);
    m = LE(
      f[g],
      p,
      s
    );
  }
  return m;
}
function TE(t, a) {
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
function gx(t, a = [], i = [], s = "", o = !1) {
  let u = (f, m, g = o, p) => {
    let b = {
      relativePath: p === void 0 ? f.path || "" : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: m,
      route: f
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(s) && g)
        return;
      Pe(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(s.length);
    }
    let v = Wn([s, b.relativePath]), w = i.concat(b);
    f.children && f.children.length > 0 && (Pe(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      f.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), gx(
      f.children,
      a,
      w,
      v,
      g
    )), !(f.path == null && !f.index) && a.push({
      path: v,
      score: zE(v, f.index),
      routesMeta: w
    });
  };
  return t.forEach((f, m) => {
    if (f.path === "" || !f.path?.includes("?"))
      u(f, m);
    else
      for (let g of yx(f.path))
        u(f, m, !0, g);
  }), a;
}
function yx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...s] = a, o = i.endsWith("?"), u = i.replace(/\?$/, "");
  if (s.length === 0)
    return o ? [u, ""] : [u];
  let f = yx(s.join("/")), m = [];
  return m.push(
    ...f.map(
      (g) => g === "" ? u : [u, g].join("/")
    )
  ), o && m.push(...f), m.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function CE(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : OE(
      a.routesMeta.map((s) => s.childrenIndex),
      i.routesMeta.map((s) => s.childrenIndex)
    )
  );
}
var RE = /^:[\w-]+$/, _E = 3, ME = 2, AE = 1, DE = 10, kE = -2, my = (t) => t === "*";
function zE(t, a) {
  let i = t.split("/"), s = i.length;
  return i.some(my) && (s += kE), a && (s += ME), i.filter((o) => !my(o)).reduce(
    (o, u) => o + (RE.test(u) ? _E : u === "" ? AE : DE),
    s
  );
}
function OE(t, a) {
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
function LE(t, a, i = !1) {
  let { routesMeta: s } = t, o = {}, u = "/", f = [];
  for (let m = 0; m < s.length; ++m) {
    let g = s[m], p = m === s.length - 1, b = u === "/" ? a : a.slice(u.length) || "/", v = gc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), w = g.route;
    if (!v && p && i && !s[s.length - 1].route.index && (v = gc(
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
      pathname: Wn([u, v.pathname]),
      pathnameBase: HE(
        Wn([u, v.pathnameBase])
      ),
      route: w
    }), v.pathnameBase !== "/" && (u = Wn([u, v.pathnameBase]));
  }
  return f;
}
function gc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, s] = UE(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let u = o[0], f = u.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: s.reduce(
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
function UE(t, a = !1, i = !0) {
  Vt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let s = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (f, m, g, p, b) => {
      if (s.push({ paramName: m, isOptional: g != null }), g) {
        let v = b.charAt(p + f.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (s.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), s];
}
function $E(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Vt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function na(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, s = t.charAt(i);
  return s && s !== "/" ? null : t.slice(i) || "/";
}
function BE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Wn([t, a]);
}
var bx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Ch = (t) => bx.test(t);
function VE(t, a = "/") {
  let {
    pathname: i,
    search: s = "",
    hash: o = ""
  } = typeof t == "string" ? da(t) : t, u;
  return i ? (i = _h(i), i.startsWith("/") ? u = py(i.substring(1), "/") : u = py(i, a)) : u = a, {
    pathname: u,
    search: qE(s),
    hash: IE(o)
  };
}
function py(t, a) {
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
function xx(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function Rh(t) {
  let a = xx(t);
  return a.map(
    (i, s) => s === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function zc(t, a, i, s = !1) {
  let o;
  typeof t == "string" ? o = da(t) : (o = { ...t }, Pe(
    !o.pathname || !o.pathname.includes("?"),
    of("?", "pathname", "search", o)
  ), Pe(
    !o.pathname || !o.pathname.includes("#"),
    of("#", "pathname", "hash", o)
  ), Pe(
    !o.search || !o.search.includes("#"),
    of("#", "search", "hash", o)
  ));
  let u = t === "" || o.pathname === "", f = u ? "/" : o.pathname, m;
  if (f == null)
    m = i;
  else {
    let v = a.length - 1;
    if (!s && f.startsWith("..")) {
      let w = f.split("/");
      for (; w[0] === ".."; )
        w.shift(), v -= 1;
      o.pathname = w.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let g = VE(o, m), p = f && f !== "/" && f.endsWith("/"), b = (u || f === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var _h = (t) => t.replace(/\/\/+/g, "/"), Wn = (t) => _h(t.join("/")), yc = (t) => t.replace(/\/+$/, ""), HE = (t) => yc(t).replace(/^\/*/, "/"), qE = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, IE = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, FE = (t, a = 302) => {
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
  return Wn(a) || "/";
}
var Sx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function wx(t, a) {
  let i = t;
  if (typeof i != "string" || !bx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let s = i, o = !1;
  if (Sx)
    try {
      let u = new URL(window.location.href), f = i.startsWith("//") ? new URL(u.protocol + i) : new URL(i), m = na(f.pathname, a);
      f.origin === u.origin && m != null ? i = m + f.search + f.hash : o = !0;
    } catch {
      Vt(
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
function YE(t, a) {
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
        for (let m of f)
          u[m] && i[m].push(u[m]);
      }
    })
  );
  let s = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Fi(i.lazy, a.lazy, () => {
    });
    o && (s.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let f = o[u], m = i[`lazy.${u}`];
      if (typeof f == "function" && m.length > 0) {
        let g = Fi(m, f, () => {
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
      let f = u[xr] ?? u, m = Fi(
        i[o],
        f,
        (...g) => vy(g[0])
      );
      m && (o === "loader" && f.hydrate === !0 && (m.hydrate = !0), m[xr] = f, s[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (s.middleware = a.middleware.map((o) => {
    let u = o[xr] ?? o, f = Fi(
      i.middleware,
      u,
      (...m) => vy(m[0])
    );
    return f ? (f[xr] = u, f) : o;
  })), s;
}
function GE(t, a) {
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
    let s = t.navigate[xr] ?? t.navigate, o = Fi(
      i.navigate,
      s,
      (...u) => {
        let [f, m] = u;
        return {
          to: typeof f == "number" || typeof f == "string" ? f : f ? ba(f) : ".",
          ...gy(t, m ?? {})
        };
      }
    );
    o && (o[xr] = s, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let s = t.fetch[xr] ?? t.fetch, o = Fi(i.fetch, s, (...u) => {
      let [f, , m, g] = u;
      return {
        href: m ?? ".",
        fetcherKey: f,
        ...gy(t, g ?? {})
      };
    });
    o && (o[xr] = s, t.fetch = o);
  }
  return t;
}
function Fi(t, a, i) {
  return t.length === 0 ? null : async (...s) => {
    let o = await jx(
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
async function jx(t, a, i, s) {
  let o = t[s], u;
  if (o) {
    let f, m = async () => (f ? console.error("You cannot call instrumented handlers more than once") : f = jx(t, a, i, s - 1), u = await f, Pe(u, "Expected a result"), u.type === "error" && u.value instanceof Error ? { status: "error", error: u.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    f || await m(), await f;
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
function vy(t) {
  let { request: a, context: i, params: s, unstable_pattern: o } = t;
  return {
    request: PE(a),
    params: { ...s },
    unstable_pattern: o,
    context: KE(i)
  };
}
function gy(t, a) {
  return {
    currentUrl: ba(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function PE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function KE(t) {
  if (QE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var XE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function QE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === XE;
}
var Ex = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], ZE = new Set(
  Ex
), JE = [
  "GET",
  ...Ex
], WE = new Set(JE), Nx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), eN = /* @__PURE__ */ new Set([307, 308]), cf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, tN = {
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
}, nN = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), Tx = "remix-router-transitions", Cx = Symbol("ResetLoaderData");
function aN(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Pe(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = t.hydrationRouteProperties || [], o = t.mapRouteProperties || nN, u = o;
  if (t.unstable_instrumentations) {
    let D = t.unstable_instrumentations;
    u = (I) => ({
      ...o(I),
      ...YE(
        D.map((Q) => Q.route).filter(Boolean),
        I
      )
    });
  }
  let f = {}, m = hl(
    t.routes,
    u,
    void 0,
    f
  ), g, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || oN, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, w = null, S = /* @__PURE__ */ new Set(), j = null, N = null, C = null, T = t.hydrationData != null, A = yr(m, t.history.location, p), O = !1, R = null, V, X;
  if (A == null && !t.patchRoutesOnNavigation) {
    let D = Jn(404, {
      pathname: t.history.location.pathname
    }), { matches: I, route: Q } = Ho(m);
    V = !0, X = !V, A = I, R = { [Q.id]: D };
  } else if (A && !t.hydrationData && An(
    A,
    m,
    t.history.location.pathname
  ).active && (A = null), A)
    if (A.some((D) => D.route.lazy))
      V = !1, X = !V;
    else if (!A.some((D) => Mh(D.route)))
      V = !0, X = !V;
    else {
      let D = t.hydrationData ? t.hydrationData.loaderData : null, I = t.hydrationData ? t.hydrationData.errors : null, Q = A;
      if (I) {
        let me = A.findIndex(
          (ve) => I[ve.route.id] !== void 0
        );
        Q = Q.slice(0, me + 1);
      }
      X = !1, V = !0, Q.forEach((me) => {
        let ve = Rx(me.route, D, I);
        X = X || ve.renderFallback, V = V && !ve.shouldLoad;
      });
    }
  else {
    V = !1, X = !V, A = [];
    let D = An(
      null,
      m,
      t.history.location.pathname
    );
    D.active && D.matches && (O = !0, A = D.matches);
  }
  let ie, M = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: A,
    initialized: V,
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
  }, H = "POP", z = null, F = !1, W, K = !1, le = /* @__PURE__ */ new Map(), ne = null, k = !1, U = !1, q = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Map(), ce = 0, _ = -1, te = /* @__PURE__ */ new Map(), ae = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Set(), ue = /* @__PURE__ */ new Map(), pe, Ce = null;
  function ot() {
    if (w = t.history.listen(
      ({ action: D, location: I, delta: Q }) => {
        if (pe) {
          pe(), pe = void 0;
          return;
        }
        Vt(
          ue.size === 0 || Q != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let me = Mn({
          currentLocation: M.location,
          nextLocation: I,
          historyAction: D
        });
        if (me && Q != null) {
          let ve = new Promise((Ne) => {
            pe = Ne;
          });
          t.history.go(Q * -1), tn(me, {
            state: "blocked",
            location: I,
            proceed() {
              tn(me, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: I
              }), ve.then(() => t.history.go(Q));
            },
            reset() {
              let Ne = new Map(M.blockers);
              Ne.set(me, Qs), Be({ blockers: Ne });
            }
          }), z?.resolve(), z = null;
          return;
        }
        return kt(D, I);
      }
    ), i) {
      TN(a, le);
      let D = () => CN(a, le);
      a.addEventListener("pagehide", D), ne = () => a.removeEventListener("pagehide", D);
    }
    return M.initialized || kt("POP", M.location, {
      initialHydration: !0
    }), ie;
  }
  function je() {
    w && w(), ne && ne(), S.clear(), W && W.abort(), M.fetchers.forEach((D, I) => Ae(I)), M.blockers.forEach((D, I) => qn(I));
  }
  function tt(D) {
    return S.add(D), () => S.delete(D);
  }
  function Be(D, I = {}) {
    D.matches && (D.matches = D.matches.map((ve) => {
      let Ne = f[ve.route.id], ye = ve.route;
      return ye.element !== Ne.element || ye.errorElement !== Ne.errorElement || ye.hydrateFallbackElement !== Ne.hydrateFallbackElement ? {
        ...ve,
        route: Ne
      } : ve;
    })), M = {
      ...M,
      ...D
    };
    let Q = [], me = [];
    M.fetchers.forEach((ve, Ne) => {
      ve.state === "idle" && (ee.has(Ne) ? Q.push(Ne) : me.push(Ne));
    }), ee.forEach((ve) => {
      !M.fetchers.has(ve) && !Y.has(ve) && Q.push(ve);
    }), [...S].forEach(
      (ve) => ve(M, {
        deletedFetchers: Q,
        newErrors: D.errors ?? null,
        viewTransitionOpts: I.viewTransitionOpts,
        flushSync: I.flushSync === !0
      })
    ), Q.forEach((ve) => Ae(ve)), me.forEach((ve) => M.fetchers.delete(ve));
  }
  function $e(D, I, { flushSync: Q } = {}) {
    let me = M.actionData != null && M.navigation.formMethod != null && mn(M.navigation.formMethod) && M.navigation.state === "loading" && D.state?._isRedirect !== !0, ve;
    I.actionData ? Object.keys(I.actionData).length > 0 ? ve = I.actionData : ve = null : me ? ve = M.actionData : ve = null;
    let Ne = I.loaderData ? Ry(
      M.loaderData,
      I.loaderData,
      I.matches || [],
      I.errors
    ) : M.loaderData, ye = M.blockers;
    ye.size > 0 && (ye = new Map(ye), ye.forEach((ze, Me) => ye.set(Me, Qs)));
    let be = k ? !1 : Xt(D, I.matches || M.matches), Re = F === !0 || M.navigation.formMethod != null && mn(M.navigation.formMethod) && D.state?._isRedirect !== !0;
    g && (m = g, g = void 0), k || H === "POP" || (H === "PUSH" ? t.history.push(D, D.state) : H === "REPLACE" && t.history.replace(D, D.state));
    let Se;
    if (H === "POP") {
      let ze = le.get(M.location.pathname);
      ze && ze.has(D.pathname) ? Se = {
        currentLocation: M.location,
        nextLocation: D
      } : le.has(D.pathname) && (Se = {
        currentLocation: D,
        nextLocation: M.location
      });
    } else if (K) {
      let ze = le.get(M.location.pathname);
      ze ? ze.add(D.pathname) : (ze = /* @__PURE__ */ new Set([D.pathname]), le.set(M.location.pathname, ze)), Se = {
        currentLocation: M.location,
        nextLocation: D
      };
    }
    Be(
      {
        ...I,
        // matches, errors, fetchers go through as-is
        actionData: ve,
        loaderData: Ne,
        historyAction: H,
        location: D,
        initialized: !0,
        renderFallback: !1,
        navigation: cf,
        revalidation: "idle",
        restoreScrollPosition: be,
        preventScrollReset: Re,
        blockers: ye
      },
      {
        viewTransitionOpts: Se,
        flushSync: Q === !0
      }
    ), H = "POP", F = !1, K = !1, k = !1, U = !1, z?.resolve(), z = null, Ce?.resolve(), Ce = null;
  }
  async function Zt(D, I) {
    if (z?.resolve(), z = null, typeof D == "number") {
      z || (z = Dy());
      let gt = z.promise;
      return t.history.go(D), gt;
    }
    let Q = Qf(
      M.location,
      M.matches,
      p,
      D,
      I?.fromRouteId,
      I?.relative
    ), { path: me, submission: ve, error: Ne } = yy(
      !1,
      Q,
      I
    ), ye;
    I?.unstable_mask && (ye = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof I.unstable_mask == "string" ? da(I.unstable_mask) : {
        ...M.location.unstable_mask,
        ...I.unstable_mask
      }
    });
    let be = M.location, Re = Xf(
      be,
      me,
      I && I.state,
      void 0,
      ye
    );
    Re = {
      ...Re,
      ...t.history.encodeLocation(Re)
    };
    let Se = I && I.replace != null ? I.replace : void 0, ze = "PUSH";
    Se === !0 ? ze = "REPLACE" : Se === !1 || ve != null && mn(ve.formMethod) && ve.formAction === M.location.pathname + M.location.search && (ze = "REPLACE");
    let Me = I && "preventScrollReset" in I ? I.preventScrollReset === !0 : void 0, nt = (I && I.flushSync) === !0, Ye = Mn({
      currentLocation: be,
      nextLocation: Re,
      historyAction: ze
    });
    if (Ye) {
      tn(Ye, {
        state: "blocked",
        location: Re,
        proceed() {
          tn(Ye, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Re
          }), Zt(D, I);
        },
        reset() {
          let gt = new Map(M.blockers);
          gt.set(Ye, Qs), Be({ blockers: gt });
        }
      });
      return;
    }
    await kt(ze, Re, {
      submission: ve,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Ne,
      preventScrollReset: Me,
      replace: I && I.replace,
      enableViewTransition: I && I.viewTransition,
      flushSync: nt,
      callSiteDefaultShouldRevalidate: I && I.unstable_defaultShouldRevalidate
    });
  }
  function Nt() {
    Ce || (Ce = Dy()), it(), Be({ revalidation: "loading" });
    let D = Ce.promise;
    return M.navigation.state === "submitting" ? D : M.navigation.state === "idle" ? (kt(M.historyAction, M.location, {
      startUninterruptedRevalidation: !0
    }), D) : (kt(
      H || M.historyAction,
      M.navigation.location,
      {
        overrideNavigation: M.navigation,
        // Proxy through any rending view transition
        enableViewTransition: K === !0
      }
    ), D);
  }
  async function kt(D, I, Q) {
    W && W.abort(), W = null, H = D, k = (Q && Q.startUninterruptedRevalidation) === !0, Mt(M.location, M.matches), F = (Q && Q.preventScrollReset) === !0, K = (Q && Q.enableViewTransition) === !0;
    let me = g || m, ve = Q && Q.overrideNavigation, Ne = Q?.initialHydration && M.matches && M.matches.length > 0 && !O ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      M.matches
    ) : yr(me, I, p), ye = (Q && Q.flushSync) === !0;
    if (Ne && M.initialized && !U && vN(M.location, I) && !(Q && Q.submission && mn(Q.submission.formMethod))) {
      $e(I, { matches: Ne }, { flushSync: ye });
      return;
    }
    let be = An(Ne, me, I.pathname);
    if (be.active && be.matches && (Ne = be.matches), !Ne) {
      let { error: ht, notFoundMatches: Tt, route: Ke } = un(
        I.pathname
      );
      $e(
        I,
        {
          matches: Tt,
          loaderData: {},
          errors: {
            [Ke.id]: ht
          }
        },
        { flushSync: ye }
      );
      return;
    }
    W = new AbortController();
    let Re = Hi(
      t.history,
      I,
      W.signal,
      Q && Q.submission
    ), Se = t.getContext ? await t.getContext() : new fy(), ze;
    if (Q && Q.pendingError)
      ze = [
        br(Ne).route.id,
        { type: "error", error: Q.pendingError }
      ];
    else if (Q && Q.submission && mn(Q.submission.formMethod)) {
      let ht = await ra(
        Re,
        I,
        Q.submission,
        Ne,
        Se,
        be.active,
        Q && Q.initialHydration === !0,
        { replace: Q.replace, flushSync: ye }
      );
      if (ht.shortCircuited)
        return;
      if (ht.pendingActionResult) {
        let [Tt, Ke] = ht.pendingActionResult;
        if (Bn(Ke) && ml(Ke.error) && Ke.error.status === 404) {
          W = null, $e(I, {
            matches: ht.matches,
            loaderData: {},
            errors: {
              [Tt]: Ke.error
            }
          });
          return;
        }
      }
      Ne = ht.matches || Ne, ze = ht.pendingActionResult, ve = uf(I, Q.submission), ye = !1, be.active = !1, Re = Hi(
        t.history,
        Re.url,
        Re.signal
      );
    }
    let {
      shortCircuited: Me,
      matches: nt,
      loaderData: Ye,
      errors: gt
    } = await xt(
      Re,
      I,
      Ne,
      Se,
      be.active,
      ve,
      Q && Q.submission,
      Q && Q.fetcherSubmission,
      Q && Q.replace,
      Q && Q.initialHydration === !0,
      ye,
      ze,
      Q && Q.callSiteDefaultShouldRevalidate
    );
    Me || (W = null, $e(I, {
      matches: nt || Ne,
      ..._y(ze),
      loaderData: Ye,
      errors: gt
    }));
  }
  async function ra(D, I, Q, me, ve, Ne, ye, be = {}) {
    it();
    let Re = EN(I, Q);
    if (Be({ navigation: Re }, { flushSync: be.flushSync === !0 }), Ne) {
      let Me = await ft(
        me,
        I.pathname,
        D.signal
      );
      if (Me.type === "aborted")
        return { shortCircuited: !0 };
      if (Me.type === "error") {
        if (Me.partialMatches.length === 0) {
          let { matches: Ye, route: gt } = Ho(m);
          return {
            matches: Ye,
            pendingActionResult: [
              gt.id,
              {
                type: "error",
                error: Me.error
              }
            ]
          };
        }
        let nt = br(Me.partialMatches).route.id;
        return {
          matches: Me.partialMatches,
          pendingActionResult: [
            nt,
            {
              type: "error",
              error: Me.error
            }
          ]
        };
      } else if (Me.matches)
        me = Me.matches;
      else {
        let { notFoundMatches: nt, error: Ye, route: gt } = un(
          I.pathname
        );
        return {
          matches: nt,
          pendingActionResult: [
            gt.id,
            {
              type: "error",
              error: Ye
            }
          ]
        };
      }
    }
    let Se, ze = oc(me, I);
    if (!ze.route.action && !ze.route.lazy)
      Se = {
        type: "error",
        error: Jn(405, {
          method: D.method,
          pathname: I.pathname,
          routeId: ze.route.id
        })
      };
    else {
      let Me = Pi(
        u,
        f,
        D,
        I,
        me,
        ze,
        ye ? [] : s,
        ve
      ), nt = await Oe(
        D,
        I,
        Me,
        ve,
        null
      );
      if (Se = nt[ze.route.id], !Se) {
        for (let Ye of me)
          if (nt[Ye.route.id]) {
            Se = nt[Ye.route.id];
            break;
          }
      }
      if (D.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Gr(Se)) {
      let Me;
      return be && be.replace != null ? Me = be.replace : Me = Ny(
        Se.response.headers.get("Location"),
        new URL(D.url),
        p,
        t.history
      ) === M.location.pathname + M.location.search, await xe(D, Se, !0, {
        submission: Q,
        replace: Me
      }), { shortCircuited: !0 };
    }
    if (Bn(Se)) {
      let Me = br(me, ze.route.id);
      return (be && be.replace) !== !0 && (H = "PUSH"), {
        matches: me,
        pendingActionResult: [
          Me.route.id,
          Se,
          ze.route.id
        ]
      };
    }
    return {
      matches: me,
      pendingActionResult: [ze.route.id, Se]
    };
  }
  async function xt(D, I, Q, me, ve, Ne, ye, be, Re, Se, ze, Me, nt) {
    let Ye = Ne || uf(I, ye), gt = ye || be || Ay(Ye), ht = !k && !Se;
    if (ve) {
      if (ht) {
        let Ut = en(Me);
        Be(
          {
            navigation: Ye,
            ...Ut !== void 0 ? { actionData: Ut } : {}
          },
          {
            flushSync: ze
          }
        );
      }
      let Ge = await ft(
        Q,
        I.pathname,
        D.signal
      );
      if (Ge.type === "aborted")
        return { shortCircuited: !0 };
      if (Ge.type === "error") {
        if (Ge.partialMatches.length === 0) {
          let { matches: fn, route: qt } = Ho(m);
          return {
            matches: fn,
            loaderData: {},
            errors: {
              [qt.id]: Ge.error
            }
          };
        }
        let Ut = br(Ge.partialMatches).route.id;
        return {
          matches: Ge.partialMatches,
          loaderData: {},
          errors: {
            [Ut]: Ge.error
          }
        };
      } else if (Ge.matches)
        Q = Ge.matches;
      else {
        let { error: Ut, notFoundMatches: fn, route: qt } = un(
          I.pathname
        );
        return {
          matches: fn,
          loaderData: {},
          errors: {
            [qt.id]: Ut
          }
        };
      }
    }
    let Tt = g || m, { dsMatches: Ke, revalidatingFetchers: Ht } = by(
      D,
      me,
      u,
      f,
      t.history,
      M,
      Q,
      gt,
      I,
      Se ? [] : s,
      Se === !0,
      U,
      q,
      ee,
      G,
      ae,
      Tt,
      p,
      t.patchRoutesOnNavigation != null,
      Me,
      nt
    );
    if (_ = ++ce, !t.dataStrategy && !Ke.some((Ge) => Ge.shouldLoad) && !Ke.some(
      (Ge) => Ge.route.middleware && Ge.route.middleware.length > 0
    ) && Ht.length === 0) {
      let Ge = cn();
      return $e(
        I,
        {
          matches: Q,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Me && Bn(Me[1]) ? { [Me[0]]: Me[1].error } : null,
          ..._y(Me),
          ...Ge ? { fetchers: new Map(M.fetchers) } : {}
        },
        { flushSync: ze }
      ), { shortCircuited: !0 };
    }
    if (ht) {
      let Ge = {};
      if (!ve) {
        Ge.navigation = Ye;
        let Ut = en(Me);
        Ut !== void 0 && (Ge.actionData = Ut);
      }
      Ht.length > 0 && (Ge.fetchers = yn(Ht)), Be(Ge, { flushSync: ze });
    }
    Ht.forEach((Ge) => {
      ct(Ge.key), Ge.controller && Y.set(Ge.key, Ge.controller);
    });
    let St = () => Ht.forEach((Ge) => ct(Ge.key));
    W && W.signal.addEventListener(
      "abort",
      St
    );
    let { loaderResults: Fa, fetcherResults: ia } = await Ze(
      Ke,
      Ht,
      D,
      I,
      me
    );
    if (D.signal.aborted)
      return { shortCircuited: !0 };
    W && W.signal.removeEventListener(
      "abort",
      St
    ), Ht.forEach((Ge) => Y.delete(Ge.key));
    let Jt = qo(Fa);
    if (Jt)
      return await xe(D, Jt.result, !0, {
        replace: Re
      }), { shortCircuited: !0 };
    if (Jt = qo(ia), Jt)
      return ae.add(Jt.key), await xe(D, Jt.result, !0, {
        replace: Re
      }), { shortCircuited: !0 };
    let { loaderData: fa, errors: Tr } = Cy(
      M,
      Q,
      Fa,
      Me,
      Ht,
      ia
    );
    Se && M.errors && (Tr = { ...M.errors, ...Tr });
    let ha = cn(), Cr = Hn(_), ti = ha || Cr || Ht.length > 0;
    return {
      matches: Q,
      loaderData: fa,
      errors: Tr,
      ...ti ? { fetchers: new Map(M.fetchers) } : {}
    };
  }
  function en(D) {
    if (D && !Bn(D[1]))
      return {
        [D[0]]: D[1].data
      };
    if (M.actionData)
      return Object.keys(M.actionData).length === 0 ? null : M.actionData;
  }
  function yn(D) {
    return D.forEach((I) => {
      let Q = M.fetchers.get(I.key), me = Zs(
        void 0,
        Q ? Q.data : void 0
      );
      M.fetchers.set(I.key, me);
    }), new Map(M.fetchers);
  }
  async function zt(D, I, Q, me) {
    ct(D);
    let ve = (me && me.flushSync) === !0, Ne = g || m, ye = Qf(
      M.location,
      M.matches,
      p,
      Q,
      I,
      me?.relative
    ), be = yr(Ne, ye, p), Re = An(be, Ne, ye);
    if (Re.active && Re.matches && (be = Re.matches), !be) {
      Lt(
        D,
        I,
        Jn(404, { pathname: ye }),
        { flushSync: ve }
      );
      return;
    }
    let { path: Se, submission: ze, error: Me } = yy(
      !0,
      ye,
      me
    );
    if (Me) {
      Lt(D, I, Me, { flushSync: ve });
      return;
    }
    let nt = t.getContext ? await t.getContext() : new fy(), Ye = (me && me.preventScrollReset) === !0;
    if (ze && mn(ze.formMethod)) {
      await bn(
        D,
        I,
        Se,
        be,
        nt,
        Re.active,
        ve,
        Ye,
        ze,
        me && me.unstable_defaultShouldRevalidate
      );
      return;
    }
    G.set(D, { routeId: I, path: Se }), await Ot(
      D,
      I,
      Se,
      be,
      nt,
      Re.active,
      ve,
      Ye,
      ze
    );
  }
  async function bn(D, I, Q, me, ve, Ne, ye, be, Re, Se) {
    it(), G.delete(D);
    let ze = M.fetchers.get(D);
    Rt(D, NN(Re, ze), {
      flushSync: ye
    });
    let Me = new AbortController(), nt = Hi(
      t.history,
      Q,
      Me.signal,
      Re
    );
    if (Ne) {
      let wt = await ft(
        me,
        new URL(nt.url).pathname,
        nt.signal,
        D
      );
      if (wt.type === "aborted")
        return;
      if (wt.type === "error") {
        Lt(D, I, wt.error, { flushSync: ye });
        return;
      } else if (wt.matches)
        me = wt.matches;
      else {
        Lt(
          D,
          I,
          Jn(404, { pathname: Q }),
          { flushSync: ye }
        );
        return;
      }
    }
    let Ye = oc(me, Q);
    if (!Ye.route.action && !Ye.route.lazy) {
      let wt = Jn(405, {
        method: Re.formMethod,
        pathname: Q,
        routeId: I
      });
      Lt(D, I, wt, { flushSync: ye });
      return;
    }
    Y.set(D, Me);
    let gt = ce, ht = Pi(
      u,
      f,
      nt,
      Q,
      me,
      Ye,
      s,
      ve
    ), Tt = await Oe(
      nt,
      Q,
      ht,
      ve,
      D
    ), Ke = Tt[Ye.route.id];
    if (!Ke) {
      for (let wt of ht)
        if (Tt[wt.route.id]) {
          Ke = Tt[wt.route.id];
          break;
        }
    }
    if (nt.signal.aborted) {
      Y.get(D) === Me && Y.delete(D);
      return;
    }
    if (ee.has(D)) {
      if (Gr(Ke) || Bn(Ke)) {
        Rt(D, Ba(void 0));
        return;
      }
    } else {
      if (Gr(Ke))
        if (Y.delete(D), _ > gt) {
          Rt(D, Ba(void 0));
          return;
        } else
          return ae.add(D), Rt(D, Zs(Re)), xe(nt, Ke, !1, {
            fetcherSubmission: Re,
            preventScrollReset: be
          });
      if (Bn(Ke)) {
        Lt(D, I, Ke.error);
        return;
      }
    }
    let Ht = M.navigation.location || M.location, St = Hi(
      t.history,
      Ht,
      Me.signal
    ), Fa = g || m, ia = M.navigation.state !== "idle" ? yr(Fa, M.navigation.location, p) : M.matches;
    Pe(ia, "Didn't find any matches after fetcher action");
    let Jt = ++ce;
    te.set(D, Jt);
    let fa = Zs(Re, Ke.data);
    M.fetchers.set(D, fa);
    let { dsMatches: Tr, revalidatingFetchers: ha } = by(
      St,
      ve,
      u,
      f,
      t.history,
      M,
      ia,
      Re,
      Ht,
      s,
      !1,
      U,
      q,
      ee,
      G,
      ae,
      Fa,
      p,
      t.patchRoutesOnNavigation != null,
      [Ye.route.id, Ke],
      Se
    );
    ha.filter((wt) => wt.key !== D).forEach((wt) => {
      let ni = wt.key, ai = M.fetchers.get(ni), _l = Zs(
        void 0,
        ai ? ai.data : void 0
      );
      M.fetchers.set(ni, _l), ct(ni), wt.controller && Y.set(ni, wt.controller);
    }), Be({ fetchers: new Map(M.fetchers) });
    let Cr = () => ha.forEach((wt) => ct(wt.key));
    Me.signal.addEventListener(
      "abort",
      Cr
    );
    let { loaderResults: ti, fetcherResults: Ge } = await Ze(
      Tr,
      ha,
      St,
      Ht,
      ve
    );
    if (Me.signal.aborted)
      return;
    if (Me.signal.removeEventListener(
      "abort",
      Cr
    ), te.delete(D), Y.delete(D), ha.forEach((wt) => Y.delete(wt.key)), M.fetchers.has(D)) {
      let wt = Ba(Ke.data);
      M.fetchers.set(D, wt);
    }
    let Ut = qo(ti);
    if (Ut)
      return xe(
        St,
        Ut.result,
        !1,
        { preventScrollReset: be }
      );
    if (Ut = qo(Ge), Ut)
      return ae.add(Ut.key), xe(
        St,
        Ut.result,
        !1,
        { preventScrollReset: be }
      );
    let { loaderData: fn, errors: qt } = Cy(
      M,
      ia,
      ti,
      void 0,
      ha,
      Ge
    );
    Hn(Jt), M.navigation.state === "loading" && Jt > _ ? (Pe(H, "Expected pending action"), W && W.abort(), $e(M.navigation.location, {
      matches: ia,
      loaderData: fn,
      errors: qt,
      fetchers: new Map(M.fetchers)
    })) : (Be({
      errors: qt,
      loaderData: Ry(
        M.loaderData,
        fn,
        ia,
        qt
      ),
      fetchers: new Map(M.fetchers)
    }), U = !1);
  }
  async function Ot(D, I, Q, me, ve, Ne, ye, be, Re) {
    let Se = M.fetchers.get(D);
    Rt(
      D,
      Zs(
        Re,
        Se ? Se.data : void 0
      ),
      { flushSync: ye }
    );
    let ze = new AbortController(), Me = Hi(
      t.history,
      Q,
      ze.signal
    );
    if (Ne) {
      let Ke = await ft(
        me,
        new URL(Me.url).pathname,
        Me.signal,
        D
      );
      if (Ke.type === "aborted")
        return;
      if (Ke.type === "error") {
        Lt(D, I, Ke.error, { flushSync: ye });
        return;
      } else if (Ke.matches)
        me = Ke.matches;
      else {
        Lt(
          D,
          I,
          Jn(404, { pathname: Q }),
          { flushSync: ye }
        );
        return;
      }
    }
    let nt = oc(me, Q);
    Y.set(D, ze);
    let Ye = ce, gt = Pi(
      u,
      f,
      Me,
      Q,
      me,
      nt,
      s,
      ve
    ), ht = await Oe(
      Me,
      Q,
      gt,
      ve,
      D
    ), Tt = ht[nt.route.id];
    if (!Tt) {
      for (let Ke of me)
        if (ht[Ke.route.id]) {
          Tt = ht[Ke.route.id];
          break;
        }
    }
    if (Y.get(D) === ze && Y.delete(D), !Me.signal.aborted) {
      if (ee.has(D)) {
        Rt(D, Ba(void 0));
        return;
      }
      if (Gr(Tt))
        if (_ > Ye) {
          Rt(D, Ba(void 0));
          return;
        } else {
          ae.add(D), await xe(Me, Tt, !1, {
            preventScrollReset: be
          });
          return;
        }
      if (Bn(Tt)) {
        Lt(D, I, Tt.error);
        return;
      }
      Rt(D, Ba(Tt.data));
    }
  }
  async function xe(D, I, Q, {
    submission: me,
    fetcherSubmission: ve,
    preventScrollReset: Ne,
    replace: ye
  } = {}) {
    Q || (z?.resolve(), z = null), I.response.headers.has("X-Remix-Revalidate") && (U = !0);
    let be = I.response.headers.get("Location");
    Pe(be, "Expected a Location header on the redirect Response"), be = Ny(
      be,
      new URL(D.url),
      p,
      t.history
    );
    let Re = Xf(M.location, be, {
      _isRedirect: !0
    });
    if (i) {
      let gt = !1;
      if (I.response.headers.has("X-Remix-Reload-Document"))
        gt = !0;
      else if (Ch(be)) {
        const ht = xE(be, !0);
        gt = // Hard reload if it's an absolute URL to a new origin
        ht.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        na(ht.pathname, p) == null;
      }
      if (gt) {
        ye ? a.location.replace(be) : a.location.assign(be);
        return;
      }
    }
    W = null;
    let Se = ye === !0 || I.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: ze, formAction: Me, formEncType: nt } = M.navigation;
    !me && !ve && ze && Me && nt && (me = Ay(M.navigation));
    let Ye = me || ve;
    if (eN.has(I.response.status) && Ye && mn(Ye.formMethod))
      await kt(Se, Re, {
        submission: {
          ...Ye,
          formAction: be
        },
        // Preserve these flags across redirects
        preventScrollReset: Ne || F,
        enableViewTransition: Q ? K : void 0
      });
    else {
      let gt = uf(
        Re,
        me
      );
      await kt(Se, Re, {
        overrideNavigation: gt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: ve,
        // Preserve these flags across redirects
        preventScrollReset: Ne || F,
        enableViewTransition: Q ? K : void 0
      });
    }
  }
  async function Oe(D, I, Q, me, ve) {
    let Ne, ye = {};
    try {
      Ne = await uN(
        b,
        D,
        I,
        Q,
        ve,
        me,
        !1
      );
    } catch (be) {
      return Q.filter((Re) => Re.shouldLoad).forEach((Re) => {
        ye[Re.route.id] = {
          type: "error",
          error: be
        };
      }), ye;
    }
    if (D.signal.aborted)
      return ye;
    if (!mn(D.method))
      for (let be of Q) {
        if (Ne[be.route.id]?.type === "error")
          break;
        !Ne.hasOwnProperty(be.route.id) && !M.loaderData.hasOwnProperty(be.route.id) && (!M.errors || !M.errors.hasOwnProperty(be.route.id)) && be.shouldCallHandler() && (Ne[be.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${be.route.id}`
          )
        });
      }
    for (let [be, Re] of Object.entries(Ne))
      if (xN(Re)) {
        let Se = Re.result;
        ye[be] = {
          type: "redirect",
          response: mN(
            Se,
            D,
            be,
            Q,
            p
          )
        };
      } else
        ye[be] = await hN(Re);
    return ye;
  }
  async function Ze(D, I, Q, me, ve) {
    let Ne = Oe(
      Q,
      me,
      D,
      ve,
      null
    ), ye = Promise.all(
      I.map(async (Se) => {
        if (Se.matches && Se.match && Se.request && Se.controller) {
          let Me = (await Oe(
            Se.request,
            Se.path,
            Se.matches,
            ve,
            Se.key
          ))[Se.match.route.id];
          return { [Se.key]: Me };
        } else
          return Promise.resolve({
            [Se.key]: {
              type: "error",
              error: Jn(404, {
                pathname: Se.path
              })
            }
          });
      })
    ), be = await Ne, Re = (await ye).reduce(
      (Se, ze) => Object.assign(Se, ze),
      {}
    );
    return {
      loaderResults: be,
      fetcherResults: Re
    };
  }
  function it() {
    U = !0, G.forEach((D, I) => {
      Y.has(I) && q.add(I), ct(I);
    });
  }
  function Rt(D, I, Q = {}) {
    M.fetchers.set(D, I), Be(
      { fetchers: new Map(M.fetchers) },
      { flushSync: (Q && Q.flushSync) === !0 }
    );
  }
  function Lt(D, I, Q, me = {}) {
    let ve = br(M.matches, I);
    Ae(D), Be(
      {
        errors: {
          [ve.route.id]: Q
        },
        fetchers: new Map(M.fetchers)
      },
      { flushSync: (me && me.flushSync) === !0 }
    );
  }
  function he(D) {
    return $.set(D, ($.get(D) || 0) + 1), ee.has(D) && ee.delete(D), M.fetchers.get(D) || tN;
  }
  function ke(D, I) {
    ct(D, I?.reason), Rt(D, Ba(null));
  }
  function Ae(D) {
    let I = M.fetchers.get(D);
    Y.has(D) && !(I && I.state === "loading" && te.has(D)) && ct(D), G.delete(D), te.delete(D), ae.delete(D), ee.delete(D), q.delete(D), M.fetchers.delete(D);
  }
  function we(D) {
    let I = ($.get(D) || 0) - 1;
    I <= 0 ? ($.delete(D), ee.add(D)) : $.set(D, I), Be({ fetchers: new Map(M.fetchers) });
  }
  function ct(D, I) {
    let Q = Y.get(D);
    Q && (Q.abort(I), Y.delete(D));
  }
  function Ve(D) {
    for (let I of D) {
      let Q = he(I), me = Ba(Q.data);
      M.fetchers.set(I, me);
    }
  }
  function cn() {
    let D = [], I = !1;
    for (let Q of ae) {
      let me = M.fetchers.get(Q);
      Pe(me, `Expected fetcher: ${Q}`), me.state === "loading" && (ae.delete(Q), D.push(Q), I = !0);
    }
    return Ve(D), I;
  }
  function Hn(D) {
    let I = [];
    for (let [Q, me] of te)
      if (me < D) {
        let ve = M.fetchers.get(Q);
        Pe(ve, `Expected fetcher: ${Q}`), ve.state === "loading" && (ct(Q), te.delete(Q), I.push(Q));
      }
    return Ve(I), I.length > 0;
  }
  function vn(D, I) {
    let Q = M.blockers.get(D) || Qs;
    return ue.get(D) !== I && ue.set(D, I), Q;
  }
  function qn(D) {
    M.blockers.delete(D), ue.delete(D);
  }
  function tn(D, I) {
    let Q = M.blockers.get(D) || Qs;
    Pe(
      Q.state === "unblocked" && I.state === "blocked" || Q.state === "blocked" && I.state === "blocked" || Q.state === "blocked" && I.state === "proceeding" || Q.state === "blocked" && I.state === "unblocked" || Q.state === "proceeding" && I.state === "unblocked",
      `Invalid blocker state transition: ${Q.state} -> ${I.state}`
    );
    let me = new Map(M.blockers);
    me.set(D, I), Be({ blockers: me });
  }
  function Mn({
    currentLocation: D,
    nextLocation: I,
    historyAction: Q
  }) {
    if (ue.size === 0)
      return;
    ue.size > 1 && Vt(!1, "A router only supports one blocker at a time");
    let me = Array.from(ue.entries()), [ve, Ne] = me[me.length - 1], ye = M.blockers.get(ve);
    if (!(ye && ye.state === "proceeding") && Ne({ currentLocation: D, nextLocation: I, historyAction: Q }))
      return ve;
  }
  function un(D) {
    let I = Jn(404, { pathname: D }), Q = g || m, { matches: me, route: ve } = Ho(Q);
    return { notFoundMatches: me, route: ve, error: I };
  }
  function Le(D, I, Q) {
    if (j = D, C = I, N = Q || null, !T && M.navigation === cf) {
      T = !0;
      let me = Xt(M.location, M.matches);
      me != null && Be({ restoreScrollPosition: me });
    }
    return () => {
      j = null, C = null, N = null;
    };
  }
  function st(D, I) {
    return N && N(
      D,
      I.map((me) => TE(me, M.loaderData))
    ) || D.key;
  }
  function Mt(D, I) {
    if (j && C) {
      let Q = st(D, I);
      j[Q] = C();
    }
  }
  function Xt(D, I) {
    if (j) {
      let Q = st(D, I), me = j[Q];
      if (typeof me == "number")
        return me;
    }
    return null;
  }
  function An(D, I, Q) {
    if (t.patchRoutesOnNavigation)
      if (D) {
        if (Object.keys(D[0].params).length > 0)
          return { active: !0, matches: ll(
            I,
            Q,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          I,
          Q,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function ft(D, I, Q, me) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: D };
    let ve = D;
    for (; ; ) {
      let Ne = g == null, ye = g || m, be = f;
      try {
        await t.patchRoutesOnNavigation({
          signal: Q,
          path: I,
          matches: ve,
          fetcherKey: me,
          patch: (ze, Me) => {
            Q.aborted || xy(
              ze,
              Me,
              ye,
              be,
              u,
              !1
            );
          }
        });
      } catch (ze) {
        return { type: "error", error: ze, partialMatches: ve };
      } finally {
        Ne && !Q.aborted && (m = [...m]);
      }
      if (Q.aborted)
        return { type: "aborted" };
      let Re = yr(ye, I, p), Se = null;
      if (Re) {
        if (Object.keys(Re[0].params).length === 0)
          return { type: "success", matches: Re };
        if (Se = ll(
          ye,
          I,
          p,
          !0
        ), !(Se && ve.length < Se.length && nn(
          ve,
          Se.slice(0, ve.length)
        )))
          return { type: "success", matches: Re };
      }
      if (Se || (Se = ll(
        ye,
        I,
        p,
        !0
      )), !Se || nn(ve, Se))
        return { type: "success", matches: null };
      ve = Se;
    }
  }
  function nn(D, I) {
    return D.length === I.length && D.every((Q, me) => Q.route.id === I[me].route.id);
  }
  function Sa(D) {
    f = {}, g = hl(
      D,
      u,
      void 0,
      f
    );
  }
  function dn(D, I, Q = !1) {
    let me = g == null;
    xy(
      D,
      I,
      g || m,
      f,
      u,
      Q
    ), me && (m = [...m], Be({}));
  }
  return ie = {
    get basename() {
      return p;
    },
    get future() {
      return v;
    },
    get state() {
      return M;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: ot,
    subscribe: tt,
    enableScrollRestoration: Le,
    navigate: Zt,
    fetch: zt,
    revalidate: Nt,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (D) => t.history.createHref(D),
    encodeLocation: (D) => t.history.encodeLocation(D),
    getFetcher: he,
    resetFetcher: ke,
    deleteFetcher: we,
    dispose: je,
    getBlocker: vn,
    deleteBlocker: qn,
    patchRoutes: dn,
    _internalFetchControllers: Y,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: Sa,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(D) {
      Be(D);
    }
  }, t.unstable_instrumentations && (ie = GE(
    ie,
    t.unstable_instrumentations.map((D) => D.router).filter(Boolean)
  )), ie;
}
function rN(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Qf(t, a, i, s, o, u) {
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
  let g = zc(
    s || ".",
    Rh(f),
    na(t.pathname, i) || t.pathname,
    u === "path"
  );
  if (s == null && (g.search = t.search, g.hash = t.hash), (s == null || s === "" || s === ".") && m) {
    let p = Dh(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((S) => S).forEach((S) => b.append("index", S));
      let w = b.toString();
      g.search = w ? `?${w}` : "";
    }
  }
  return i !== "/" && (g.pathname = BE({ basename: i, pathname: g.pathname })), ba(g);
}
function yy(t, a, i) {
  if (!i || !rN(i))
    return { path: a };
  if (i.formMethod && !jN(i.formMethod))
    return {
      path: a,
      error: Jn(405, { method: i.formMethod })
    };
  let s = () => ({
    path: a,
    error: Jn(400, { type: "invalid-body" })
  }), u = (i.formMethod || "get").toUpperCase(), f = Ox(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!mn(u))
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
      if (!mn(u))
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
  Pe(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, g;
  if (i.formData)
    m = Jf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Jf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = Ty(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = Ty(m);
    } catch {
      return s();
    }
  let p = {
    formMethod: u,
    formAction: f,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (mn(p.formMethod))
    return { path: a, submission: p };
  let b = da(a);
  return t && b.search && Dh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: ba(b), submission: p };
}
function by(t, a, i, s, o, u, f, m, g, p, b, v, w, S, j, N, C, T, A, O, R) {
  let V = O ? Bn(O[1]) ? O[1].error : O[1].data : void 0, X = o.createURL(u.location), ie = o.createURL(g), M;
  if (b && u.errors) {
    let ne = Object.keys(u.errors)[0];
    M = f.findIndex((k) => k.route.id === ne);
  } else if (O && Bn(O[1])) {
    let ne = O[0];
    M = f.findIndex((k) => k.route.id === ne) - 1;
  }
  let H = O ? O[1].statusCode : void 0, z = H && H >= 400, F = {
    currentUrl: X,
    currentParams: u.matches[0]?.params || {},
    nextUrl: ie,
    nextParams: f[0].params,
    ...m,
    actionResult: V,
    actionStatus: H
  }, W = xl(f), K = f.map((ne, k) => {
    let { route: U } = ne, q = null;
    if (M != null && k > M)
      q = !1;
    else if (U.lazy)
      q = !0;
    else if (!Mh(U))
      q = !1;
    else if (b) {
      let { shouldLoad: te } = Rx(
        U,
        u.loaderData,
        u.errors
      );
      q = te;
    } else iN(u.loaderData, u.matches[k], ne) && (q = !0);
    if (q !== null)
      return Zf(
        i,
        s,
        t,
        g,
        W,
        ne,
        p,
        a,
        q
      );
    let Y = !1;
    typeof R == "boolean" ? Y = R : z ? Y = !1 : (v || X.pathname + X.search === ie.pathname + ie.search || X.search !== ie.search || sN(u.matches[k], ne)) && (Y = !0);
    let ce = {
      ...F,
      defaultShouldRevalidate: Y
    }, _ = cl(ne, ce);
    return Zf(
      i,
      s,
      t,
      g,
      W,
      ne,
      p,
      a,
      _,
      ce,
      R
    );
  }), le = [];
  return j.forEach((ne, k) => {
    if (b || !f.some((G) => G.route.id === ne.routeId) || S.has(k))
      return;
    let U = u.fetchers.get(k), q = U && U.state !== "idle" && U.data === void 0, Y = yr(C, ne.path, T);
    if (!Y) {
      if (A && q)
        return;
      le.push({
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
    let ce = oc(Y, ne.path), _ = new AbortController(), te = Hi(
      o,
      ne.path,
      _.signal
    ), ae = null;
    if (w.has(k))
      w.delete(k), ae = Pi(
        i,
        s,
        te,
        ne.path,
        Y,
        ce,
        p,
        a
      );
    else if (q)
      v && (ae = Pi(
        i,
        s,
        te,
        ne.path,
        Y,
        ce,
        p,
        a
      ));
    else {
      let G;
      typeof R == "boolean" ? G = R : z ? G = !1 : G = v;
      let $ = {
        ...F,
        defaultShouldRevalidate: G
      };
      cl(ce, $) && (ae = Pi(
        i,
        s,
        te,
        ne.path,
        Y,
        ce,
        p,
        a,
        $
      ));
    }
    ae && le.push({
      key: k,
      routeId: ne.routeId,
      path: ne.path,
      matches: ae,
      match: ce,
      request: te,
      controller: _
    });
  }), { dsMatches: K, revalidatingFetchers: le };
}
function Mh(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Rx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Mh(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let s = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!s && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let u = !s && !o;
  return { shouldLoad: u, renderFallback: u };
}
function iN(t, a, i) {
  let s = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return s || o;
}
function sN(t, a) {
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
function xy(t, a, i, s, o, u) {
  let f;
  if (t) {
    let p = s[t];
    Pe(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), f = p.children;
  } else
    f = i;
  let m = [], g = [];
  if (a.forEach((p) => {
    let b = f.find(
      (v) => _x(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hl(
      m,
      o,
      [t || "_", "patch", String(f?.length || "0")],
      s
    );
    f.push(...p);
  }
  if (u && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], w = b, [S] = hl(
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
function _x(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, s) => a.children?.some((o) => _x(i, o))
  ) ?? !1 : !1;
}
var Sy = /* @__PURE__ */ new WeakMap(), Mx = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: s
}) => {
  let o = i[a.id];
  if (Pe(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let u = o.lazy[t];
  if (!u)
    return;
  let f = Sy.get(o);
  f || (f = {}, Sy.set(o, f));
  let m = f[t];
  if (m)
    return m;
  let g = (async () => {
    let p = wE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
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
      w != null && (Object.assign(o, { [t]: w }), Object.assign(o, s(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((w) => w === void 0) && (o.lazy = void 0));
  })();
  return f[t] = g, g;
}, wy = /* @__PURE__ */ new WeakMap();
function lN(t, a, i, s, o) {
  let u = i[t.id];
  if (Pe(u, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = wy.get(u);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Pe(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let w = await t.lazy(), S = {};
      for (let j in w) {
        let N = w[j];
        if (N === void 0)
          continue;
        let C = EE(j), A = u[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        C ? Vt(
          !C,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : A ? Vt(
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
    return wy.set(u, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let f = Object.keys(t.lazy), m = [], g;
  for (let b of f) {
    if (o && o.includes(b))
      continue;
    let v = Mx({
      key: b,
      route: t,
      manifest: i,
      mapRouteProperties: s
    });
    v && (m.push(v), b === a && (g = v));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {
  }) : void 0;
  return p?.catch(() => {
  }), g?.catch(() => {
  }), {
    lazyRoutePromise: p,
    lazyHandlerPromise: g
  };
}
async function jy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, u) => {
    i[a[u].route.id] = o;
  }), i;
}
async function oN(t) {
  return t.matches.some((a) => a.route.middleware) ? Ax(t, () => jy(t)) : jy(t);
}
function Ax(t, a) {
  return cN(
    t,
    a,
    (s) => {
      if (wN(s))
        throw s;
      return s;
    },
    yN,
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
      ), g = br(
        f,
        f[m].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: s }
      });
    }
  }
}
async function cN(t, a, i, s, o) {
  let { matches: u, ...f } = t, m = u.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await Dx(
    f,
    m,
    a,
    i,
    s,
    o
  );
}
async function Dx(t, a, i, s, o, u, f = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let g = a[f];
  if (!g)
    return await i();
  let [p, b] = g, v, w = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await Dx(
        t,
        a,
        i,
        s,
        o,
        u,
        f + 1
      ) }, v.value;
    } catch (S) {
      return v = { value: await u(S, p, v) }, v.value;
    }
  };
  try {
    let S = await b(t, w), j = S != null ? s(S) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await w() }, v.value);
  } catch (S) {
    return await u(S, p, v);
  }
}
function kx(t, a, i, s, o) {
  let u = Mx({
    key: "middleware",
    route: s.route,
    manifest: a,
    mapRouteProperties: t
  }), f = lN(
    s.route,
    mn(i.method) ? "action" : "loader",
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
function Zf(t, a, i, s, o, u, f, m, g, p = null, b) {
  let v = !1, w = kx(
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
    shouldRevalidateArgs: p,
    shouldCallHandler(S) {
      return v = !0, p ? typeof b == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof S == "boolean" ? cl(u, {
        ...p,
        defaultShouldRevalidate: S
      }) : cl(u, p) : g;
    },
    resolve(S) {
      let { lazy: j, loader: N, middleware: C } = u.route, T = v || g || S && !mn(i.method) && (j || N), A = C && C.length > 0 && !N && !j;
      return T && (mn(i.method) || !A) ? dN({
        request: i,
        path: s,
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
function Pi(t, a, i, s, o, u, f, m, g = null) {
  return o.map((p) => p.route.id !== u.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: kx(
      t,
      a,
      i,
      p,
      f
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Zf(
    t,
    a,
    i,
    s,
    xl(o),
    p,
    f,
    m,
    !0,
    g
  ));
}
async function uN(t, a, i, s, o, u, f) {
  s.some((b) => b._lazyPromises?.middleware) && await Promise.all(s.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: zx(a, i),
    unstable_pattern: xl(s),
    params: s[0].params,
    context: u,
    matches: s
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return Ax(v, () => b({
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
  return p;
}
async function dN({
  request: t,
  path: a,
  unstable_pattern: i,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: u,
  handlerOverride: f,
  scopedContext: m
}) {
  let g, p, b = mn(t.method), v = b ? "action" : "loader", w = (S) => {
    let j, N = new Promise((A, O) => j = O);
    p = () => j(), t.signal.addEventListener("abort", p);
    let C = (A) => typeof S != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${s.route.id}]`
      )
    ) : S(
      {
        request: t,
        unstable_url: zx(t, a),
        unstable_pattern: i,
        params: s.params,
        context: m
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
          throw Jn(405, {
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
      throw Jn(404, {
        pathname: N
      });
    }
  } catch (S) {
    return { type: "error", result: S };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return g;
}
async function fN(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function hN(t) {
  let { result: a, type: i } = t;
  if (Ah(a)) {
    let s;
    try {
      s = await fN(a);
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
  return i === "error" ? My(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: gN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : My(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function mN(t, a, i, s, o) {
  let u = t.headers.get("Location");
  if (Pe(
    u,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Ch(u)) {
    let f = s.slice(
      0,
      s.findIndex((m) => m.route.id === i) + 1
    );
    u = Qf(
      new URL(a.url),
      f,
      o,
      u
    ), t.headers.set("Location", u);
  }
  return t;
}
var Ey = [
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
function Ny(t, a, i, s) {
  if (Ch(t)) {
    let o = t, u = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Ey.includes(u.protocol))
      throw new Error("Invalid redirect location");
    let f = na(u.pathname, i) != null;
    if (u.origin === a.origin && f)
      return _h(u.pathname) + u.search + u.hash;
  }
  try {
    let o = s.createURL(t);
    if (Ey.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hi(t, a, i, s) {
  let o = t.createURL(Ox(a)).toString(), u = { signal: i };
  if (s && mn(s.formMethod)) {
    let { formMethod: f, formEncType: m } = s;
    u.method = f.toUpperCase(), m === "application/json" ? (u.headers = new Headers({ "Content-Type": m }), u.body = JSON.stringify(s.json)) : m === "text/plain" ? u.body = s.text : m === "application/x-www-form-urlencoded" && s.formData ? u.body = Jf(s.formData) : u.body = s.formData;
  }
  return new Request(o, u);
}
function zx(t, a) {
  let i = new URL(t.url), s = typeof a == "string" ? da(a) : a;
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
function Jf(t) {
  let a = new URLSearchParams();
  for (let [i, s] of t.entries())
    a.append(i, typeof s == "string" ? s : s.name);
  return a;
}
function Ty(t) {
  let a = new FormData();
  for (let [i, s] of t.entries())
    a.append(i, s);
  return a;
}
function pN(t, a, i, s = !1, o = !1) {
  let u = {}, f = null, m, g = !1, p = {}, b = i && Bn(i[1]) ? i[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let w = v.route.id, S = a[w];
    if (Pe(
      !Gr(S),
      "Cannot handle redirect results in processLoaderData"
    ), Bn(S)) {
      let j = S.error;
      if (b !== void 0 && (j = b, b = void 0), f = f || {}, o)
        f[w] = j;
      else {
        let N = br(t, w);
        f[N.route.id] == null && (f[N.route.id] = j);
      }
      s || (u[w] = Cx), g || (g = !0, m = ml(S.error) ? S.error.status : 500), S.headers && (p[w] = S.headers);
    } else
      u[w] = S.data, S.statusCode && S.statusCode !== 200 && !g && (m = S.statusCode), S.headers && (p[w] = S.headers);
  }), b !== void 0 && i && (f = { [i[0]]: b }, i[2] && (u[i[2]] = void 0)), {
    loaderData: u,
    errors: f,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Cy(t, a, i, s, o, u) {
  let { loaderData: f, errors: m } = pN(
    a,
    i,
    s
  );
  return o.filter((g) => !g.matches || g.matches.some((p) => p.shouldLoad)).forEach((g) => {
    let { key: p, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let w = u[p];
    if (Pe(w, "Did not find corresponding fetcher result"), Bn(w)) {
      let S = br(t.matches, b?.route.id);
      m && m[S.route.id] || (m = {
        ...m,
        [S.route.id]: w.error
      }), t.fetchers.delete(p);
    } else if (Gr(w))
      Pe(!1, "Unhandled fetcher revalidation redirect");
    else {
      let S = Ba(w.data);
      t.fetchers.set(p, S);
    }
  }), { loaderData: f, errors: m };
}
function Ry(t, a, i, s) {
  let o = Object.entries(a).filter(([, u]) => u !== Cx).reduce((u, [f, m]) => (u[f] = m, u), {});
  for (let u of i) {
    let f = u.route.id;
    if (!a.hasOwnProperty(f) && t.hasOwnProperty(f) && u.route.loader && (o[f] = t[f]), s && s.hasOwnProperty(f))
      break;
  }
  return o;
}
function _y(t) {
  return t ? Bn(t[1]) ? {
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
function Jn(t, {
  pathname: a,
  routeId: i,
  method: s,
  type: o,
  message: u
} = {}) {
  let f = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (f = "Bad Request", s && a && i ? m = `You made a ${s} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (f = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (f = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (f = "Method Not Allowed", s && a && i ? m = `You made a ${s.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : s && (m = `Invalid request method "${s.toUpperCase()}"`)), new Oc(
    t || 500,
    f,
    new Error(m),
    !0
  );
}
function qo(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [s, o] = a[i];
    if (Gr(o))
      return { key: s, result: o };
  }
}
function Ox(t) {
  let a = typeof t == "string" ? da(t) : t;
  return ba({ ...a, hash: "" });
}
function vN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function gN(t) {
  return new Oc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function yN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && bN(i)
  );
}
function bN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function xN(t) {
  return Ah(t.result) && Nx.has(t.result.status);
}
function Bn(t) {
  return t.type === "error";
}
function Gr(t) {
  return (t && t.type) === "redirect";
}
function My(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Ah(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function SN(t) {
  return Nx.has(t);
}
function wN(t) {
  return Ah(t) && SN(t.status) && t.headers.has("Location");
}
function jN(t) {
  return WE.has(t.toUpperCase());
}
function mn(t) {
  return ZE.has(t.toUpperCase());
}
function Dh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function oc(t, a) {
  let i = typeof a == "string" ? da(a).search : a.search;
  if (t[t.length - 1].route.index && Dh(i || ""))
    return t[t.length - 1];
  let s = xx(t);
  return s[s.length - 1];
}
function Ay(t) {
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
function EN(t, a) {
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
function NN(t, a) {
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
function TN(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      Tx
    );
    if (i) {
      let s = JSON.parse(i);
      for (let [o, u] of Object.entries(s || {}))
        u && Array.isArray(u) && a.set(o, new Set(u || []));
    }
  } catch {
  }
}
function CN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [s, o] of a)
      i[s] = [...o];
    try {
      t.sessionStorage.setItem(
        Tx,
        JSON.stringify(i)
      );
    } catch (s) {
      Vt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function Dy() {
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
var ei = y.createContext(null);
ei.displayName = "DataRouter";
var Sl = y.createContext(null);
Sl.displayName = "DataRouterState";
var Lx = y.createContext(!1);
function Ux() {
  return y.useContext(Lx);
}
var kh = y.createContext({
  isTransitioning: !1
});
kh.displayName = "ViewTransition";
var $x = y.createContext(
  /* @__PURE__ */ new Map()
);
$x.displayName = "Fetchers";
var RN = y.createContext(null);
RN.displayName = "Await";
var aa = y.createContext(
  null
);
aa.displayName = "Navigation";
var Lc = y.createContext(
  null
);
Lc.displayName = "Location";
var qa = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
qa.displayName = "Route";
var zh = y.createContext(null);
zh.displayName = "RouteError";
var Bx = "REACT_ROUTER_ERROR", _N = "REDIRECT", MN = "ROUTE_ERROR_RESPONSE";
function AN(t) {
  if (t.startsWith(`${Bx}:${_N}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function DN(t) {
  if (t.startsWith(
    `${Bx}:${MN}:{`
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
function kN(t, { relative: a } = {}) {
  Pe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: s } = y.useContext(aa), { hash: o, pathname: u, search: f } = jl(t, { relative: a }), m = u;
  return i !== "/" && (m = u === "/" ? i : Wn([i, u])), s.createHref({ pathname: m, search: f, hash: o });
}
function wl() {
  return y.useContext(Lc) != null;
}
function Ia() {
  return Pe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(Lc).location;
}
var Vx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Hx(t) {
  y.useContext(aa).static || y.useLayoutEffect(t);
}
function es() {
  let { isDataRoute: t } = y.useContext(qa);
  return t ? YN() : zN();
}
function zN() {
  Pe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(ei), { basename: a, navigator: i } = y.useContext(aa), { matches: s } = y.useContext(qa), { pathname: o } = Ia(), u = JSON.stringify(Rh(s)), f = y.useRef(!1);
  return Hx(() => {
    f.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (Vt(f.current, Vx), !f.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = zc(
        g,
        JSON.parse(u),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Wn([a, b.pathname])), (p.replace ? i.replace : i.push)(
        b,
        p.state,
        p
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
  let { matches: i } = y.useContext(qa), { pathname: s } = Ia(), o = JSON.stringify(Rh(i));
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
function ON(t, a, i) {
  Pe(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = y.useContext(aa), { matches: o } = y.useContext(qa), u = o[o.length - 1], f = u ? u.params : {}, m = u ? u.pathname : "/", g = u ? u.pathnameBase : "/", p = u && u.route;
  {
    let C = p && p.path || "";
    Fx(
      m,
      !p || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let b = Ia(), v;
  v = b;
  let w = v.pathname || "/", S = w;
  if (g !== "/") {
    let C = g.replace(/^\//, "").split("/");
    S = "/" + w.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let j = yr(t, { pathname: S });
  return Vt(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Vt(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), VN(
    j && j.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, f, C.params),
        pathname: Wn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          s.encodeLocation ? s.encodeLocation(
            C.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? g : Wn([
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
function LN() {
  let t = FN(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, s = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: s }, u = { padding: "2px 4px", backgroundColor: s }, f = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), f = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: u }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: u }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, f);
}
var UN = /* @__PURE__ */ y.createElement(LN, null), qx = class extends y.Component {
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
      const i = DN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement(qa.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      zh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement($N, { error: t }, a) : a;
  }
};
qx.contextType = Lx;
var df = /* @__PURE__ */ new WeakMap();
function $N({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(aa);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let s = AN(a.digest);
    if (s) {
      let o = df.get(a);
      if (o) throw o;
      let u = wx(s.location, i);
      if (Sx && !df.get(a))
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
function BN({ routeContext: t, match: a, children: i }) {
  let s = y.useContext(ei);
  return s && s.static && s.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (s.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(qa.Provider, { value: t }, i);
}
function VN(t, a = [], i) {
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
    Pe(
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
  if (i && s) {
    f = s.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: w, errors: S } = s, j = v.route.loader && !w.hasOwnProperty(v.route.id) && (!S || S[v.route.id] === void 0);
        if (v.route.lazy || j) {
          i.isStatic && (f = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = i?.onError, p = s && g ? (b, v) => {
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
      s && (S = u && v.route.id ? u[v.route.id] : void 0, N = v.route.errorElement || UN, f && (m < 0 && w === 0 ? (Fx(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, C = null) : m === w && (j = !0, C = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, w + 1)), A = () => {
        let O;
        return S ? O = N : j ? O = C : v.route.Component ? O = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? O = v.route.element : O = b, /* @__PURE__ */ y.createElement(
          BN,
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
        qx,
        {
          location: s.location,
          revalidation: s.revalidation,
          component: N,
          error: S,
          children: A(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : A();
    },
    null
  );
}
function Oh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function HN(t) {
  let a = y.useContext(ei);
  return Pe(a, Oh(t)), a;
}
function Ix(t) {
  let a = y.useContext(Sl);
  return Pe(a, Oh(t)), a;
}
function qN(t) {
  let a = y.useContext(qa);
  return Pe(a, Oh(t)), a;
}
function Uc(t) {
  let a = qN(t), i = a.matches[a.matches.length - 1];
  return Pe(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function IN() {
  return Uc(
    "useRouteId"
    /* UseRouteId */
  );
}
function El() {
  let t = Ix(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Uc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function FN() {
  let t = y.useContext(zh), a = Ix(
    "useRouteError"
    /* UseRouteError */
  ), i = Uc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function YN() {
  let { router: t } = HN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Uc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return Hx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, u = {}) => {
      Vt(i.current, Vx), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...u }));
    },
    [t, a]
  );
}
var ky = {};
function Fx(t, a, i) {
  !a && !ky[t] && (ky[t] = !0, Vt(!1, i));
}
var zy = {};
function Oy(t, a) {
  !t && !zy[a] && (zy[a] = !0, console.warn(a));
}
var GN = "useOptimistic", Ly = cE[GN], PN = () => {
};
function KN(t) {
  return Ly ? Ly(t) : [t, PN];
}
function XN(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Vt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Vt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Vt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var QN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function ZN(t, a) {
  return aN({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: yE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: QN,
    mapRouteProperties: XN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var JN = class {
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
function WN({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: s
}) {
  s = Ux() || s;
  let [u, f] = y.useState(t.state), [m, g] = KN(u), [p, b] = y.useState(), [v, w] = y.useState({
    isTransitioning: !1
  }), [S, j] = y.useState(), [N, C] = y.useState(), [T, A] = y.useState(), O = y.useRef(/* @__PURE__ */ new Map()), R = y.useCallback(
    (H, { deletedFetchers: z, newErrors: F, flushSync: W, viewTransitionOpts: K }) => {
      F && i && Object.values(F).forEach(
        (ne) => i(ne, {
          location: H.location,
          params: H.matches[0]?.params ?? {},
          unstable_pattern: xl(H.matches)
        })
      ), H.fetchers.forEach((ne, k) => {
        ne.data !== void 0 && O.current.set(k, ne.data);
      }), z.forEach((ne) => O.current.delete(ne)), Oy(
        W === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let le = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Oy(
        K == null || le,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !K || !le) {
        a && W ? a(() => f(H)) : s === !1 ? f(H) : y.startTransition(() => {
          s === !0 && g((ne) => Uy(ne, H)), f(H);
        });
        return;
      }
      if (a && W) {
        a(() => {
          N && (S?.resolve(), N.skipTransition()), w({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: K.currentLocation,
            nextLocation: K.nextLocation
          });
        });
        let ne = t.window.document.startViewTransition(() => {
          a(() => f(H));
        });
        ne.finished.finally(() => {
          a(() => {
            j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
          });
        }), a(() => C(ne));
        return;
      }
      N ? (S?.resolve(), N.skipTransition(), A({
        state: H,
        currentLocation: K.currentLocation,
        nextLocation: K.nextLocation
      })) : (b(H), w({
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
  let V = m.initialized;
  y.useLayoutEffect(() => {
    !V && t.state.initialized && R(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [V, R, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new JN());
  }, [v]), y.useEffect(() => {
    if (S && p && t.window) {
      let H = p, z = S.promise, F = t.window.document.startViewTransition(async () => {
        s === !1 ? f(H) : y.startTransition(() => {
          s === !0 && g((W) => Uy(W, H)), f(H);
        }), await z;
      });
      F.finished.finally(() => {
        j(void 0), C(void 0), b(void 0), w({ isTransitioning: !1 });
      }), C(F);
    }
  }, [
    p,
    S,
    t.window,
    s,
    g
  ]), y.useEffect(() => {
    S && p && m.location.key === p.location.key && S.resolve();
  }, [S, N, m.location, p]), y.useEffect(() => {
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
    go: (H) => t.navigate(H),
    push: (H, z, F) => t.navigate(H, {
      state: z,
      preventScrollReset: F?.preventScrollReset
    }),
    replace: (H, z, F) => t.navigate(H, {
      replace: !0,
      state: z,
      preventScrollReset: F?.preventScrollReset
    })
  }), [t]), ie = t.basename || "/", M = y.useMemo(
    () => ({
      router: t,
      navigator: X,
      static: !1,
      basename: ie,
      onError: i
    }),
    [t, X, ie, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(ei.Provider, { value: M }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ y.createElement($x.Provider, { value: O.current }, /* @__PURE__ */ y.createElement(kh.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    nT,
    {
      basename: ie,
      location: m.location,
      navigationType: m.historyAction,
      navigator: X,
      unstable_useTransitions: s
    },
    /* @__PURE__ */ y.createElement(
      eT,
      {
        routes: t.routes,
        future: t.future,
        state: m,
        isStatic: !1,
        onError: i
      }
    )
  ))))), null);
}
function Uy(t, a) {
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
var eT = y.memo(tT);
function tT({
  routes: t,
  future: a,
  state: i,
  isStatic: s,
  onError: o
}) {
  return ON(t, void 0, { state: i, isStatic: s, onError: o });
}
function nT({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: s = "POP",
  navigator: o,
  static: u = !1,
  unstable_useTransitions: f
}) {
  Pe(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), g = y.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: u,
      unstable_useTransitions: f,
      future: {}
    }),
    [m, o, u, f]
  );
  typeof i == "string" && (i = da(i));
  let {
    pathname: p = "/",
    search: b = "",
    hash: v = "",
    state: w = null,
    key: S = "default",
    unstable_mask: j
  } = i, N = y.useMemo(() => {
    let C = na(p, m);
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
    m,
    p,
    b,
    v,
    w,
    S,
    s,
    j
  ]);
  return Vt(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(aa.Provider, { value: g }, /* @__PURE__ */ y.createElement(Lc.Provider, { children: a, value: N }));
}
var cc = "get", uc = "application/x-www-form-urlencoded";
function $c(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function aT(t) {
  return $c(t) && t.tagName.toLowerCase() === "button";
}
function rT(t) {
  return $c(t) && t.tagName.toLowerCase() === "form";
}
function iT(t) {
  return $c(t) && t.tagName.toLowerCase() === "input";
}
function sT(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function lT(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !sT(t);
}
var Io = null;
function oT() {
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
var cT = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function ff(t) {
  return t != null && !cT.has(t) ? (Vt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${uc}"`
  ), null) : t;
}
function uT(t, a) {
  let i, s, o, u, f;
  if (rT(t)) {
    let m = t.getAttribute("action");
    s = m ? na(m, a) : null, i = t.getAttribute("method") || cc, o = ff(t.getAttribute("enctype")) || uc, u = new FormData(t);
  } else if (aT(t) || iT(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || m.getAttribute("action");
    if (s = g ? na(g, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || cc, o = ff(t.getAttribute("formenctype")) || ff(m.getAttribute("enctype")) || uc, u = new FormData(m, t), !oT()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let w = p ? `${p}.` : "";
        u.append(`${w}x`, "0"), u.append(`${w}y`, "0");
      } else p && u.append(p, v);
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
function Lh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Yx(t, a, i, s) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${s}` : o.pathname = `${o.pathname}.${s}` : o.pathname === "/" ? o.pathname = `_root.${s}` : a && na(o.pathname, a) === "/" ? o.pathname = `${yc(a)}/_root.${s}` : o.pathname = `${yc(o.pathname)}.${s}`, o;
}
async function dT(t, a) {
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
function fT(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function hT(t, a, i) {
  let s = await Promise.all(
    t.map(async (o) => {
      let u = a.routes[o.route.id];
      if (u) {
        let f = await dT(u, i);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return gT(
    s.flat(1).filter(fT).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function $y(t, a, i, s, o, u) {
  let f = (g, p) => i[p] ? g.route.id !== i[p].route.id : !0, m = (g, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== g.params["*"]
  );
  return u === "assets" ? a.filter(
    (g, p) => f(g, p) || m(g, p)
  ) : u === "data" ? a.filter((g, p) => {
    let b = s.routes[g.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (f(g, p) || m(g, p))
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
function mT(t, a, { includeHydrateFallback: i } = {}) {
  return pT(
    t.map((s) => {
      let o = a.routes[s.route.id];
      if (!o) return [];
      let u = [o.module];
      return o.clientActionModule && (u = u.concat(o.clientActionModule)), o.clientLoaderModule && (u = u.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (u = u.concat(o.hydrateFallbackModule)), o.imports && (u = u.concat(o.imports)), u;
    }).flat(1)
  );
}
function pT(t) {
  return [...new Set(t)];
}
function vT(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let s of i)
    a[s] = t[s];
  return a;
}
function gT(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((s, o) => {
    let u = JSON.stringify(vT(o));
    return i.has(u) || (i.add(u), s.push({ key: u, link: o })), s;
  }, []);
}
function Uh() {
  let t = y.useContext(ei);
  return Lh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function yT() {
  let t = y.useContext(Sl);
  return Lh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var $h = y.createContext(void 0);
$h.displayName = "FrameworkContext";
function Bh() {
  let t = y.useContext($h);
  return Lh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function bT(t, a) {
  let i = y.useContext($h), [s, o] = y.useState(!1), [u, f] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, w = y.useRef(null);
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
      onFocus: Js(m, S),
      onBlur: Js(g, j),
      onMouseEnter: Js(p, S),
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
function xT({ page: t, ...a }) {
  let i = Ux(), { router: s } = Uh(), o = y.useMemo(
    () => yr(s.routes, t, s.basename),
    [s.routes, t, s.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(wT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(jT, { page: t, matches: o, ...a }) : null;
}
function ST(t) {
  let { manifest: a, routeModules: i } = Bh(), [s, o] = y.useState([]);
  return y.useEffect(() => {
    let u = !1;
    return hT(t, a, i).then(
      (f) => {
        u || o(f);
      }
    ), () => {
      u = !0;
    };
  }, [t, a, i]), s;
}
function wT({
  page: t,
  matches: a,
  ...i
}) {
  let s = Ia(), { future: o } = Bh(), { basename: u } = Uh(), f = y.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let m = Yx(
      t,
      u,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : p.push(b.route.id);
    return g && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    u,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    s,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, f.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function jT({
  page: t,
  matches: a,
  ...i
}) {
  let s = Ia(), { future: o, manifest: u, routeModules: f } = Bh(), { basename: m } = Uh(), { loaderData: g, matches: p } = yT(), b = y.useMemo(
    () => $y(
      t,
      a,
      p,
      u,
      s,
      "data"
    ),
    [t, a, p, u, s]
  ), v = y.useMemo(
    () => $y(
      t,
      a,
      p,
      u,
      s,
      "assets"
    ),
    [t, a, p, u, s]
  ), w = y.useMemo(() => {
    if (t === s.pathname + s.search + s.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), C = !1;
    if (a.forEach((A) => {
      let O = u.routes[A.route.id];
      !O || !O.hasLoader || (!b.some((R) => R.route.id === A.route.id) && A.route.id in g && f[A.route.id]?.shouldRevalidate || O.hasClientLoader ? C = !0 : N.add(A.route.id));
    }), N.size === 0)
      return [];
    let T = Yx(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return C && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((A) => N.has(A.route.id)).map((A) => A.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    s,
    u,
    b,
    a,
    t,
    f
  ]), S = y.useMemo(
    () => mT(v, u),
    [v, u]
  ), j = ST(v);
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
function ET(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var NT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  NT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Gx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Vh = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: u,
    replace: f,
    unstable_mask: m,
    state: g,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: w,
    unstable_defaultShouldRevalidate: S,
    ...j
  }, N) {
    let { basename: C, navigator: T, unstable_useTransitions: A } = y.useContext(aa), O = typeof b == "string" && Gx.test(b), R = wx(b, C);
    b = R.to;
    let V = kN(b, { relative: o }), X = Ia(), ie = null;
    if (m) {
      let ne = zc(
        m,
        [],
        X.unstable_mask ? X.unstable_mask.pathname : "/",
        !0
      );
      C !== "/" && (ne.pathname = ne.pathname === "/" ? C : Wn([C, ne.pathname])), ie = T.createHref(ne);
    }
    let [M, H, z] = bT(
      s,
      j
    ), F = _T(b, {
      replace: f,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: w,
      unstable_defaultShouldRevalidate: S,
      unstable_useTransitions: A
    });
    function W(ne) {
      a && a(ne), ne.defaultPrevented || F(ne);
    }
    let K = !(R.isExternal || u), le = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...j,
          ...z,
          href: (K ? ie : void 0) || R.absoluteURL || V,
          onClick: K ? W : a,
          ref: ET(N, H),
          target: p,
          "data-discover": !O && i === "render" ? "true" : void 0
        }
      )
    );
    return M && !O ? /* @__PURE__ */ y.createElement(y.Fragment, null, le, /* @__PURE__ */ y.createElement(xT, { page: V })) : le;
  }
);
Vh.displayName = "Link";
var TT = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: s = "",
    end: o = !1,
    style: u,
    to: f,
    viewTransition: m,
    children: g,
    ...p
  }, b) {
    let v = jl(f, { relative: p.relative }), w = Ia(), S = y.useContext(Sl), { navigator: j, basename: N } = y.useContext(aa), C = S != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    zT(v) && m === !0, T = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, A = w.pathname, O = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    i || (A = A.toLowerCase(), O = O ? O.toLowerCase() : null, T = T.toLowerCase()), O && N && (O = na(O, N) || O);
    const R = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let V = A === T || !o && A.startsWith(T) && A.charAt(R) === "/", X = O != null && (O === T || !o && O.startsWith(T) && O.charAt(T.length) === "/"), ie = {
      isActive: V,
      isPending: X,
      isTransitioning: C
    }, M = V ? a : void 0, H;
    typeof s == "function" ? H = s(ie) : H = [
      s,
      V ? "active" : null,
      X ? "pending" : null,
      C ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let z = typeof u == "function" ? u(ie) : u;
    return /* @__PURE__ */ y.createElement(
      Vh,
      {
        ...p,
        "aria-current": M,
        className: H,
        ref: b,
        style: z,
        to: f,
        viewTransition: m
      },
      typeof g == "function" ? g(ie) : g
    );
  }
);
TT.displayName = "NavLink";
var CT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: s,
    replace: o,
    state: u,
    method: f = cc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: w,
    ...S
  }, j) => {
    let { unstable_useTransitions: N } = y.useContext(aa), C = DT(), T = kT(m, { relative: p }), A = f.toLowerCase() === "get" ? "get" : "post", O = typeof m == "string" && Gx.test(m), R = (V) => {
      if (g && g(V), V.defaultPrevented) return;
      V.preventDefault();
      let X = V.nativeEvent.submitter, ie = X?.getAttribute("formmethod") || f, M = () => C(X || V.currentTarget, {
        fetcherKey: a,
        method: ie,
        navigate: i,
        replace: o,
        state: u,
        relative: p,
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
CT.displayName = "Form";
function RT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Px(t) {
  let a = y.useContext(ei);
  return Pe(a, RT(t)), a;
}
function _T(t, {
  target: a,
  replace: i,
  unstable_mask: s,
  state: o,
  preventScrollReset: u,
  relative: f,
  viewTransition: m,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: p
} = {}) {
  let b = es(), v = Ia(), w = jl(t, { relative: f });
  return y.useCallback(
    (S) => {
      if (lT(S, a)) {
        S.preventDefault();
        let j = i !== void 0 ? i : ba(v) === ba(w), N = () => b(t, {
          replace: j,
          unstable_mask: s,
          state: o,
          preventScrollReset: u,
          relative: f,
          viewTransition: m,
          unstable_defaultShouldRevalidate: g
        });
        p ? y.startTransition(() => N()) : N();
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
      m,
      g,
      p
    ]
  );
}
var MT = 0, AT = () => `__${String(++MT)}__`;
function DT() {
  let { router: t } = Px(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(aa), i = IN(), s = t.fetch, o = t.navigate;
  return y.useCallback(
    async (u, f = {}) => {
      let { action: m, method: g, encType: p, formData: b, body: v } = uT(
        u,
        a
      );
      if (f.navigate === !1) {
        let w = f.fetcherKey || AT();
        await s(w, i, f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || g,
          formEncType: f.encType || p,
          flushSync: f.flushSync
        });
      } else
        await o(f.action || m, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: b,
          body: v,
          formMethod: f.method || g,
          formEncType: f.encType || p,
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
function kT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(aa), s = y.useContext(qa);
  Pe(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1), u = { ...jl(t || ".", { relative: a }) }, f = Ia();
  if (t == null) {
    u.search = f.search;
    let m = new URLSearchParams(u.search), g = m.getAll("index");
    if (g.some((b) => b === "")) {
      m.delete("index"), g.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      u.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (u.pathname = u.pathname === "/" ? i : Wn([i, u.pathname])), ba(u);
}
function zT(t, { relative: a } = {}) {
  let i = y.useContext(kh);
  Pe(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Px(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let u = na(i.currentLocation.pathname, s) || i.currentLocation.pathname, f = na(i.nextLocation.pathname, s) || i.nextLocation.pathname;
  return gc(o.pathname, f) != null || gc(o.pathname, u) != null;
}
class ts extends Error {
  constructor(a, i, s, o) {
    super(s), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const xa = "/api/v1/extensions/nexus.audio.emotiontts";
async function bt(t, a) {
  const i = t.startsWith("http") ? t : `${xa}${t}`, s = await fetch(i, {
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
function OT(t, a, i) {
  const s = t.startsWith("http") ? t : `${xa}${t}`, o = new EventSource(s);
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
async function LT() {
  return bt("/deployments");
}
async function By(t) {
  return bt(`/deployments/${t}`);
}
async function UT(t, a) {
  return bt(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Vy(t) {
  return bt(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Hh(t, a) {
  return bt("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ul(t, a, i) {
  return bt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Kx(t, a) {
  await bt(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function $T(t) {
  return bt(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function BT(t, a, i = "error") {
  return bt("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function VT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const s = i.toString(), o = s ? `?${s}` : "";
  return bt(`/deployments/${t}/runs${o}`);
}
async function HT(t, a) {
  return bt(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function qh(t, a) {
  return bt(`/deployments/${t}/runs/${a}`);
}
async function qT(t, a) {
  return bt(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function Xx(t, a) {
  return bt(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function IT(t, a) {
  return bt(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Hy(t, a, i, s) {
  return OT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    s
  );
}
async function Xi(t) {
  return bt(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function bc(t, a, i, s, o) {
  const u = new FormData();
  u.append("deploymentId", t), u.append("displayName", i), u.append("kind", s), u.append("audio", a);
  const f = await fetch(`${xa}/voice-assets`, {
    method: "POST",
    body: u
  });
  if (!f.ok)
    throw new Error(`upload failed: ${f.status}`);
  return await f.json();
}
async function FT(t, a) {
  await bt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function YT(t, a, i) {
  return bt(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function GT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${xa}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function PT(t) {
  return bt(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var KT = "mux0i60", XT = "mux0i61", QT = "mux0i62", ZT = "mux0i63";
function Bc({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ c.jsxs("div", { className: KT, children: [
    /* @__PURE__ */ c.jsx("span", { className: XT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: QT, children: a }),
    i ? /* @__PURE__ */ c.jsx("p", { className: ZT, children: i }) : null
  ] });
}
var JT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, WT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, eC = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, tC = "zwn3019";
function Va({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: s = "section",
  children: o,
  className: u,
  style: f,
  ...m
}) {
  const g = [JT[t], eC[a], WT[i], u].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(s, { className: g, style: f, "data-elevation": i, ...m, children: o });
}
function nC({ children: t, className: a }) {
  const i = [tC, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, children: t });
}
var Xr = "vrkn5p0", aC = "_93p6291", rC = "_93p6292", iC = "_93p6293", sC = "_93p6294", lC = "_93p6295", oC = "_93p6296", cC = "_93p6297", uC = "_93p6298", dC = "_93p6299", fC = "_93p629a", hC = "_93p629b", mC = "_93p629c", pC = "_93p629d", vC = "_93p629e";
const gC = "nexus-host-navigate";
function yC(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function bC(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const i = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(gC, {
      detail: i
    })
  );
}
function xC() {
  const { deployments: t } = El(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: aC, children: [
    /* @__PURE__ */ c.jsxs("header", { className: rC, children: [
      /* @__PURE__ */ c.jsx("p", { className: iC, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: sC, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: lC, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: oC, children: [
        /* @__PURE__ */ c.jsx("span", { className: cC, children: t.length }),
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
        className: uC,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Xr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Bc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: dC, children: t.map((i) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: yC(i.deploymentId),
              onClick: (s) => bC(s, i.deploymentId),
              className: fC,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: hC, "aria-hidden": "true", children: SC(i.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: mC, children: i.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: pC, children: i.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: vC, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function SC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Ih = px();
const wC = /* @__PURE__ */ mx(Ih);
function jC(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const EC = (t) => {
  switch (t) {
    case "success":
      return CC;
    case "info":
      return _C;
    case "warning":
      return RC;
    case "error":
      return MC;
    default:
      return null;
  }
}, NC = Array(12).fill(0), TC = ({ visible: t, className: a }) => /* @__PURE__ */ ge.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ ge.createElement("div", {
  className: "sonner-spinner"
}, NC.map((i, s) => /* @__PURE__ */ ge.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${s}`
})))), CC = /* @__PURE__ */ ge.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ge.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), RC = /* @__PURE__ */ ge.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ge.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), _C = /* @__PURE__ */ ge.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ge.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), MC = /* @__PURE__ */ ge.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ ge.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), AC = /* @__PURE__ */ ge.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ ge.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ ge.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), DC = () => {
  const [t, a] = ge.useState(document.hidden);
  return ge.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Wf = 1;
class kC {
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
      const { message: s, ...o } = a, u = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Wf++, f = this.toasts.find((g) => g.id === u), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({
        ...g,
        ...a,
        id: u,
        title: s
      }), {
        ...g,
        ...a,
        id: u,
        dismissible: m,
        title: s
      }) : g) : this.addToast({
        title: s,
        ...o,
        dismissible: m,
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
      const m = o.then(async (p) => {
        if (f = [
          "resolve",
          p
        ], ge.isValidElement(p))
          u = !1, this.create({
            id: s,
            type: "default",
            message: p
          });
        else if (OC(p) && !p.ok) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, w = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, j = typeof v == "object" && !ge.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "error",
            description: w,
            ...j
          });
        } else if (p instanceof Error) {
          u = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, w = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !ge.isValidElement(v) ? v : {
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
          const v = typeof i.success == "function" ? await i.success(p) : i.success, w = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !ge.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: s,
            type: "success",
            description: w,
            ...j
          });
        }
      }).catch(async (p) => {
        if (f = [
          "reject",
          p
        ], i.error !== void 0) {
          u = !1;
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, S = typeof b == "object" && !ge.isValidElement(b) ? b : {
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
      }), g = () => new Promise((p, b) => m.then(() => f[0] === "reject" ? b(f[1]) : p(f[1])).catch(b));
      return typeof s != "string" && typeof s != "number" ? {
        unwrap: g
      } : Object.assign(s, {
        unwrap: g
      });
    }, this.custom = (a, i) => {
      const s = i?.id || Wf++;
      return this.create({
        jsx: a(s),
        id: s,
        ...i
      }), s;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const Cn = new kC(), zC = (t, a) => {
  const i = a?.id || Wf++;
  return Cn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, OC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", LC = zC, UC = () => Cn.toasts, $C = () => Cn.getActiveToasts(), on = Object.assign(LC, {
  success: Cn.success,
  info: Cn.info,
  warning: Cn.warning,
  error: Cn.error,
  custom: Cn.custom,
  message: Cn.message,
  promise: Cn.promise,
  dismiss: Cn.dismiss,
  loading: Cn.loading
}, {
  getHistory: UC,
  getToasts: $C
});
jC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Fo(t) {
  return t.label !== void 0;
}
const BC = 3, VC = "24px", HC = "16px", qy = 4e3, qC = 356, IC = 14, FC = 45, YC = 200;
function ya(...t) {
  return t.filter(Boolean).join(" ");
}
function GC(t) {
  const [a, i] = t.split("-"), s = [];
  return a && s.push(a), i && s.push(i), s;
}
const PC = (t) => {
  var a, i, s, o, u, f, m, g, p;
  const { invert: b, toast: v, unstyled: w, interacting: S, setHeights: j, visibleToasts: N, heights: C, index: T, toasts: A, expanded: O, removeToast: R, defaultRichColors: V, closeButton: X, style: ie, cancelButtonStyle: M, actionButtonStyle: H, className: z = "", descriptionClassName: F = "", duration: W, position: K, gap: le, expandByDefault: ne, classNames: k, icons: U, closeButtonAriaLabel: q = "Close toast" } = t, [Y, ce] = ge.useState(null), [_, te] = ge.useState(null), [ae, G] = ge.useState(!1), [$, ee] = ge.useState(!1), [ue, pe] = ge.useState(!1), [Ce, ot] = ge.useState(!1), [je, tt] = ge.useState(!1), [Be, $e] = ge.useState(0), [Zt, Nt] = ge.useState(0), kt = ge.useRef(v.duration || W || qy), ra = ge.useRef(null), xt = ge.useRef(null), en = T === 0, yn = T + 1 <= N, zt = v.type, bn = v.dismissible !== !1, Ot = v.className || "", xe = v.descriptionClassName || "", Oe = ge.useMemo(() => C.findIndex((Le) => Le.toastId === v.id) || 0, [
    C,
    v.id
  ]), Ze = ge.useMemo(() => {
    var Le;
    return (Le = v.closeButton) != null ? Le : X;
  }, [
    v.closeButton,
    X
  ]), it = ge.useMemo(() => v.duration || W || qy, [
    v.duration,
    W
  ]), Rt = ge.useRef(0), Lt = ge.useRef(0), he = ge.useRef(0), ke = ge.useRef(null), [Ae, we] = K.split("-"), ct = ge.useMemo(() => C.reduce((Le, st, Mt) => Mt >= Oe ? Le : Le + st.height, 0), [
    C,
    Oe
  ]), Ve = DC(), cn = v.invert || b, Hn = zt === "loading";
  Lt.current = ge.useMemo(() => Oe * le + ct, [
    Oe,
    ct
  ]), ge.useEffect(() => {
    kt.current = it;
  }, [
    it
  ]), ge.useEffect(() => {
    G(!0);
  }, []), ge.useEffect(() => {
    const Le = xt.current;
    if (Le) {
      const st = Le.getBoundingClientRect().height;
      return Nt(st), j((Mt) => [
        {
          toastId: v.id,
          height: st,
          position: v.position
        },
        ...Mt
      ]), () => j((Mt) => Mt.filter((Xt) => Xt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), ge.useLayoutEffect(() => {
    if (!ae) return;
    const Le = xt.current, st = Le.style.height;
    Le.style.height = "auto";
    const Mt = Le.getBoundingClientRect().height;
    Le.style.height = st, Nt(Mt), j((Xt) => Xt.find((ft) => ft.toastId === v.id) ? Xt.map((ft) => ft.toastId === v.id ? {
      ...ft,
      height: Mt
    } : ft) : [
      {
        toastId: v.id,
        height: Mt,
        position: v.position
      },
      ...Xt
    ]);
  }, [
    ae,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const vn = ge.useCallback(() => {
    ee(!0), $e(Lt.current), j((Le) => Le.filter((st) => st.toastId !== v.id)), setTimeout(() => {
      R(v);
    }, YC);
  }, [
    v,
    R,
    j,
    Lt
  ]);
  ge.useEffect(() => {
    if (v.promise && zt === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Le;
    return O || S || Ve ? (() => {
      if (he.current < Rt.current) {
        const Xt = (/* @__PURE__ */ new Date()).getTime() - Rt.current;
        kt.current = kt.current - Xt;
      }
      he.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      kt.current !== 1 / 0 && (Rt.current = (/* @__PURE__ */ new Date()).getTime(), Le = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), vn();
      }, kt.current));
    })(), () => clearTimeout(Le);
  }, [
    O,
    S,
    v,
    zt,
    Ve,
    vn
  ]), ge.useEffect(() => {
    v.delete && (vn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    vn,
    v.delete
  ]);
  function qn() {
    var Le;
    if (U?.loading) {
      var st;
      return /* @__PURE__ */ ge.createElement("div", {
        className: ya(k?.loader, v == null || (st = v.classNames) == null ? void 0 : st.loader, "sonner-loader"),
        "data-visible": zt === "loading"
      }, U.loading);
    }
    return /* @__PURE__ */ ge.createElement(TC, {
      className: ya(k?.loader, v == null || (Le = v.classNames) == null ? void 0 : Le.loader),
      visible: zt === "loading"
    });
  }
  const tn = v.icon || U?.[zt] || EC(zt);
  var Mn, un;
  return /* @__PURE__ */ ge.createElement("li", {
    tabIndex: 0,
    ref: xt,
    className: ya(z, Ot, k?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, k?.default, k?.[zt], v == null || (i = v.classNames) == null ? void 0 : i[zt]),
    "data-sonner-toast": "",
    "data-rich-colors": (Mn = v.richColors) != null ? Mn : V,
    "data-styled": !(v.jsx || v.unstyled || w),
    "data-mounted": ae,
    "data-promise": !!v.promise,
    "data-swiped": je,
    "data-removed": $,
    "data-visible": yn,
    "data-y-position": Ae,
    "data-x-position": we,
    "data-index": T,
    "data-front": en,
    "data-swiping": ue,
    "data-dismissible": bn,
    "data-type": zt,
    "data-invert": cn,
    "data-swipe-out": Ce,
    "data-swipe-direction": _,
    "data-expanded": !!(O || ne && ae),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": A.length - T,
      "--offset": `${$ ? Be : Lt.current}px`,
      "--initial-height": ne ? "auto" : `${Zt}px`,
      ...ie,
      ...v.style
    },
    onDragEnd: () => {
      pe(!1), ce(null), ke.current = null;
    },
    onPointerDown: (Le) => {
      Le.button !== 2 && (Hn || !bn || (ra.current = /* @__PURE__ */ new Date(), $e(Lt.current), Le.target.setPointerCapture(Le.pointerId), Le.target.tagName !== "BUTTON" && (pe(!0), ke.current = {
        x: Le.clientX,
        y: Le.clientY
      })));
    },
    onPointerUp: () => {
      var Le, st, Mt;
      if (Ce || !bn) return;
      ke.current = null;
      const Xt = Number(((Le = xt.current) == null ? void 0 : Le.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), An = Number(((st = xt.current) == null ? void 0 : st.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), ft = (/* @__PURE__ */ new Date()).getTime() - ((Mt = ra.current) == null ? void 0 : Mt.getTime()), nn = Y === "x" ? Xt : An, Sa = Math.abs(nn) / ft;
      if (Math.abs(nn) >= FC || Sa > 0.11) {
        $e(Lt.current), v.onDismiss == null || v.onDismiss.call(v, v), te(Y === "x" ? Xt > 0 ? "right" : "left" : An > 0 ? "down" : "up"), vn(), ot(!0);
        return;
      } else {
        var dn, D;
        (dn = xt.current) == null || dn.style.setProperty("--swipe-amount-x", "0px"), (D = xt.current) == null || D.style.setProperty("--swipe-amount-y", "0px");
      }
      tt(!1), pe(!1), ce(null);
    },
    onPointerMove: (Le) => {
      var st, Mt, Xt;
      if (!ke.current || !bn || ((st = window.getSelection()) == null ? void 0 : st.toString().length) > 0) return;
      const ft = Le.clientY - ke.current.y, nn = Le.clientX - ke.current.x;
      var Sa;
      const dn = (Sa = t.swipeDirections) != null ? Sa : GC(K);
      !Y && (Math.abs(nn) > 1 || Math.abs(ft) > 1) && ce(Math.abs(nn) > Math.abs(ft) ? "x" : "y");
      let D = {
        x: 0,
        y: 0
      };
      const I = (Q) => 1 / (1.5 + Math.abs(Q) / 20);
      if (Y === "y") {
        if (dn.includes("top") || dn.includes("bottom"))
          if (dn.includes("top") && ft < 0 || dn.includes("bottom") && ft > 0)
            D.y = ft;
          else {
            const Q = ft * I(ft);
            D.y = Math.abs(Q) < Math.abs(ft) ? Q : ft;
          }
      } else if (Y === "x" && (dn.includes("left") || dn.includes("right")))
        if (dn.includes("left") && nn < 0 || dn.includes("right") && nn > 0)
          D.x = nn;
        else {
          const Q = nn * I(nn);
          D.x = Math.abs(Q) < Math.abs(nn) ? Q : nn;
        }
      (Math.abs(D.x) > 0 || Math.abs(D.y) > 0) && tt(!0), (Mt = xt.current) == null || Mt.style.setProperty("--swipe-amount-x", `${D.x}px`), (Xt = xt.current) == null || Xt.style.setProperty("--swipe-amount-y", `${D.y}px`);
    }
  }, Ze && !v.jsx && zt !== "loading" ? /* @__PURE__ */ ge.createElement("button", {
    "aria-label": q,
    "data-disabled": Hn,
    "data-close-button": !0,
    onClick: Hn || !bn ? () => {
    } : () => {
      vn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ya(k?.closeButton, v == null || (s = v.classNames) == null ? void 0 : s.closeButton)
  }, (un = U?.close) != null ? un : AC) : null, (zt || v.icon || v.promise) && v.icon !== null && (U?.[zt] !== null || v.icon) ? /* @__PURE__ */ ge.createElement("div", {
    "data-icon": "",
    className: ya(k?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || qn() : null, v.type !== "loading" ? tn : null) : null, /* @__PURE__ */ ge.createElement("div", {
    "data-content": "",
    className: ya(k?.content, v == null || (u = v.classNames) == null ? void 0 : u.content)
  }, /* @__PURE__ */ ge.createElement("div", {
    "data-title": "",
    className: ya(k?.title, v == null || (f = v.classNames) == null ? void 0 : f.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ ge.createElement("div", {
    "data-description": "",
    className: ya(F, xe, k?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ ge.isValidElement(v.cancel) ? v.cancel : v.cancel && Fo(v.cancel) ? /* @__PURE__ */ ge.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || M,
    onClick: (Le) => {
      Fo(v.cancel) && bn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Le), vn());
    },
    className: ya(k?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ ge.isValidElement(v.action) ? v.action : v.action && Fo(v.action) ? /* @__PURE__ */ ge.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || H,
    onClick: (Le) => {
      Fo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Le), !Le.defaultPrevented && vn());
    },
    className: ya(k?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Iy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function KC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((s, o) => {
    const u = o === 1, f = u ? "--mobile-offset" : "--offset", m = u ? HC : VC;
    function g(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        i[`${f}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof s == "number" || typeof s == "string" ? g(s) : typeof s == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      s[p] === void 0 ? i[`${f}-${p}`] = m : i[`${f}-${p}`] = typeof s[p] == "number" ? `${s[p]}px` : s[p];
    }) : g(m);
  }), i;
}
const XC = /* @__PURE__ */ ge.forwardRef(function(a, i) {
  const { id: s, invert: o, position: u = "bottom-right", hotkey: f = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: w = "light", richColors: S, duration: j, style: N, visibleToasts: C = BC, toastOptions: T, dir: A = Iy(), gap: O = IC, icons: R, containerAriaLabel: V = "Notifications" } = a, [X, ie] = ge.useState([]), M = ge.useMemo(() => s ? X.filter((ae) => ae.toasterId === s) : X.filter((ae) => !ae.toasterId), [
    X,
    s
  ]), H = ge.useMemo(() => Array.from(new Set([
    u
  ].concat(M.filter((ae) => ae.position).map((ae) => ae.position)))), [
    M,
    u
  ]), [z, F] = ge.useState([]), [W, K] = ge.useState(!1), [le, ne] = ge.useState(!1), [k, U] = ge.useState(w !== "system" ? w : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), q = ge.useRef(null), Y = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ce = ge.useRef(null), _ = ge.useRef(!1), te = ge.useCallback((ae) => {
    ie((G) => {
      var $;
      return ($ = G.find((ee) => ee.id === ae.id)) != null && $.delete || Cn.dismiss(ae.id), G.filter(({ id: ee }) => ee !== ae.id);
    });
  }, []);
  return ge.useEffect(() => Cn.subscribe((ae) => {
    if (ae.dismiss) {
      requestAnimationFrame(() => {
        ie((G) => G.map(($) => $.id === ae.id ? {
          ...$,
          delete: !0
        } : $));
      });
      return;
    }
    setTimeout(() => {
      wC.flushSync(() => {
        ie((G) => {
          const $ = G.findIndex((ee) => ee.id === ae.id);
          return $ !== -1 ? [
            ...G.slice(0, $),
            {
              ...G[$],
              ...ae
            },
            ...G.slice($ + 1)
          ] : [
            ae,
            ...G
          ];
        });
      });
    });
  }), [
    X
  ]), ge.useEffect(() => {
    if (w !== "system") {
      U(w);
      return;
    }
    if (w === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? U("dark") : U("light")), typeof window > "u") return;
    const ae = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      ae.addEventListener("change", ({ matches: G }) => {
        U(G ? "dark" : "light");
      });
    } catch {
      ae.addListener(({ matches: $ }) => {
        try {
          U($ ? "dark" : "light");
        } catch (ee) {
          console.error(ee);
        }
      });
    }
  }, [
    w
  ]), ge.useEffect(() => {
    X.length <= 1 && K(!1);
  }, [
    X
  ]), ge.useEffect(() => {
    const ae = (G) => {
      var $;
      if (f.every((pe) => G[pe] || G.code === pe)) {
        var ue;
        K(!0), (ue = q.current) == null || ue.focus();
      }
      G.code === "Escape" && (document.activeElement === q.current || ($ = q.current) != null && $.contains(document.activeElement)) && K(!1);
    };
    return document.addEventListener("keydown", ae), () => document.removeEventListener("keydown", ae);
  }, [
    f
  ]), ge.useEffect(() => {
    if (q.current)
      return () => {
        ce.current && (ce.current.focus({
          preventScroll: !0
        }), ce.current = null, _.current = !1);
      };
  }, [
    q.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ ge.createElement("section", {
    ref: i,
    "aria-label": `${V} ${Y}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, H.map((ae, G) => {
    var $;
    const [ee, ue] = ae.split("-");
    return M.length ? /* @__PURE__ */ ge.createElement("ol", {
      key: ae,
      dir: A === "auto" ? Iy() : A,
      tabIndex: -1,
      ref: q,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": k,
      "data-y-position": ee,
      "data-x-position": ue,
      style: {
        "--front-toast-height": `${(($ = z[0]) == null ? void 0 : $.height) || 0}px`,
        "--width": `${qC}px`,
        "--gap": `${O}px`,
        ...N,
        ...KC(b, v)
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
        le || K(!1);
      },
      onDragEnd: () => K(!1),
      onPointerDown: (pe) => {
        pe.target instanceof HTMLElement && pe.target.dataset.dismissible === "false" || ne(!0);
      },
      onPointerUp: () => ne(!1)
    }, M.filter((pe) => !pe.position && G === 0 || pe.position === ae).map((pe, Ce) => {
      var ot, je;
      return /* @__PURE__ */ ge.createElement(PC, {
        key: pe.id,
        icons: R,
        index: Ce,
        toast: pe,
        defaultRichColors: S,
        duration: (ot = T?.duration) != null ? ot : j,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: C,
        closeButton: (je = T?.closeButton) != null ? je : g,
        interacting: le,
        position: ae,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: te,
        toasts: M.filter((tt) => tt.position == pe.position),
        heights: z.filter((tt) => tt.position == pe.position),
        setHeights: F,
        expandByDefault: m,
        gap: O,
        expanded: W,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Fy = 32, Yy = -30, Gy = -6, Py = 0.5, Ky = 2, Xy = -24, Qy = 24, Zy = -12, Jy = 12, Wy = -12, e0 = 12, t0 = -60, n0 = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Qx(t, a, i, s = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, u = `${xa}${o}`, f = await fetch(u, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...s.signal ? { signal: s.signal } : {}
  });
  if (f.status === 409) {
    const m = await f.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(g, p);
  }
  if (!f.ok)
    throw new Error(await Vc(f, "apply"));
  return await f.json();
}
async function QC(t, a, i, s, o = {}) {
  const u = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, f = `${xa}${u}`, m = await fetch(f, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(s),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(p, b);
  }
  if (!m.ok)
    throw new Error(await Vc(m, "apply"));
  return await m.json();
}
async function ZC(t, a, i = {}) {
  const s = `${xa}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(s, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function JC(t, a, i, s = {}) {
  const o = `${xa}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, u = await fetch(o, {
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
  const u = `${xa}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(s))}`, f = await fetch(u, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!f.ok)
    throw new Error(await Vc(f, "audit fetch"));
  return await f.json();
}
function _n() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Zx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Fy)
    return {
      message: `Chain exceeds the maximum of ${Fy} operations.`
    };
  for (const i of t.ops) {
    const s = WC(i, a);
    if (s) return s;
  }
  return null;
}
function WC(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return eR(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Yy || t.target_lufs > Gy ? {
        opId: t.id,
        message: `Normalize target must be between ${Yy} and ${Gy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Py || t.factor > Ky ? {
        opId: t.id,
        message: `Speed factor must be between ${Py}× and ${Ky}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Xy || t.gain_db > Qy ? {
        opId: t.id,
        message: `Volume must be between ${Xy} and ${Qy} dB.`
      } : null;
    case "eq3":
      for (const [i, s] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (s < Zy || s > Jy)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Zy} and ${Jy} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < Wy || t.semitones > e0 ? {
        opId: t.id,
        message: `Pitch must be between ${Wy} and ${e0} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < t0 || t.threshold_db > n0 ? {
        opId: t.id,
        message: `Silence threshold must be between ${t0} and ${n0} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function eR(t, a, i, s) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : s > 0 && i > s ? { opId: t, message: "End extends past source duration." } : null;
}
async function Vc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var tR = "g5r6d10", nR = "g5r6d11", aR = "g5r6d12", rR = "g5r6d13", iR = "g5r6d14", sR = "g5r6d15", lR = "g5r6d1a", oR = "g5r6d1b", cR = "g5r6d1c", uR = "g5r6d1d", dR = "g5r6d1e", fR = "g5r6d1g", hR = "g5r6d1h", mR = "g5r6d1i", pR = "g5r6d1j", vR = "g5r6d1k", gR = "g5r6d1l", yR = "g5r6d1m", bR = "g5r6d1n", xR = "g5r6d1o", a0 = "g5r6d1p", SR = "g5r6d1q", wR = "g5r6d1r", jR = "g5r6d1s", ER = "g5r6d1t", NR = "g5r6d1u", r0 = "g5r6d1v", i0 = "g5r6d1w", TR = "g5r6d1x", CR = "g5r6d1y", Yi = "g5r6d1z", RR = "g5r6d110", s0 = "g5r6d111", _R = "g5r6d112", MR = "g5r6d113", mr = "g5r6d114", AR = "g5r6d119", DR = "a6ki8u0", kR = "a6ki8u1", zR = "a6ki8u2", OR = "a6ki8u3", LR = "a6ki8u4", UR = "a6ki8u5", $R = "a6ki8u6", hf = "a6ki8u7", BR = "a6ki8u8", VR = "a6ki8u9", HR = "a6ki8ua", qR = "a6ki8ub", IR = "a6ki8uc", FR = "a6ki8ud", YR = "a6ki8ue", GR = "a6ki8uf", PR = "a6ki8ug", KR = "a6ki8uh", XR = "_1lguv7x0", QR = "_1lguv7x1", ZR = "_1lguv7x2", JR = "_1lguv7x3", WR = "_1lguv7x4", e_ = "_1lguv7x5", t_ = "_1lguv7x6", n_ = "_1lguv7x7", a_ = "_1lguv7x8", r_ = "_1lguv7x9", i_ = "_1lguv7xa", s_ = "_1lguv7xb", l_ = "_1lguv7xc", l0 = "_1lguv7xd", o_ = "_1lguv7xe", c_ = "_1lguv7xf", u_ = "_1lguv7xg", d_ = "_1lguv7xh", Jx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Wx = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, f_ = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, h_ = "_4ydn54f";
function Fe({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: s = !1,
  iconOnly: o = !1,
  disabled: u,
  children: f,
  className: m,
  style: g,
  ...p
}) {
  const b = [
    Jx[t],
    Wx[a],
    o ? f_[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: s || u,
      "aria-busy": s || void 0,
      ...p,
      children: [
        s ? /* @__PURE__ */ c.jsx("span", { className: h_, "aria-hidden": "true" }) : null,
        f
      ]
    }
  );
}
const m_ = 28;
function p_(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function v_(t, a) {
  const i = new Array(a);
  let s = t;
  for (let o = 0; o < a; o++) {
    s = (s * 9301 + 49297) % 233280;
    const u = s / 233280, f = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, f * (0.32 + u * 0.68));
  }
  return i;
}
function g_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function y_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function b_({
  asset: t,
  presentation: a,
  usedBy: i,
  isPlaying: s,
  onTogglePlay: o,
  onRename: u,
  onCopyName: f,
  onDelete: m,
  onPlaybackEnded: g
}) {
  const [p, b] = y.useState(!1), [v, w] = y.useState(t.displayName), S = y.useRef(null), j = y.useMemo(() => p_(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => v_(j, m_), [j]), C = y.useMemo(() => GT(t), [t]);
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
  }, A = `${g_(t.durationMs)} · ${y_(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: XR, "data-playing": s ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: QR, children: [
      /* @__PURE__ */ c.jsx("span", { className: ZR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: JR, children: [
        p ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: e_,
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
            className: WR,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: t_, children: A })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: n_, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: a_,
        "data-playing": s ? "true" : "false",
        disabled: C == null,
        title: C ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": s ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: r_, "aria-hidden": "true", children: s ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: i_, "aria-hidden": "true", children: N.map((O, R) => /* @__PURE__ */ c.jsx("span", { className: s_, style: { height: `${Math.round(O * 100)}%` } }, R)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: l_, children: [
      i.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: l0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        i.map((O) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: o_,
            style: { color: O.color, borderColor: O.color },
            children: O.characterName
          },
          O.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: l0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: c_, children: [
        /* @__PURE__ */ c.jsx(
          Fe,
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
          Fe,
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
          Fe,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: u_,
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
        className: d_,
        onEnded: g
      }
    )
  ] });
}
var x_ = "_17eol302", S_ = "_17eol303", w_ = "_17eol304", j_ = "_17eol305", E_ = "_17eol306", N_ = "_17eol307", Yo = "_17eol308", T_ = "_17eol309", C_ = "_17eol30a", R_ = "_17eol30b", __ = "_17eol30c", M_ = "_17eol30d", o0 = "_17eol30e", A_ = "_17eol30g";
function D_() {
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
function k_(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), s = a % 60;
  return `${i}:${s.toString().padStart(2, "0")}`;
}
function z_({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: s
}) {
  const [o, u] = y.useState("idle"), [f, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [w, S] = y.useState(a), [j, N] = y.useState(!1), C = y.useRef(null), T = y.useRef(null), A = y.useRef([]), O = y.useRef(0), R = y.useRef(null), V = y.useRef(null), X = y.useRef({ mime: "audio/webm", ext: "webm" }), ie = y.useRef(null), M = y.useRef(null), H = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return H.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ie.current?.scrollIntoView({ behavior: "smooth", block: "center" }), M.current?.focus();
      }), () => {
        H.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const U = (q) => {
      q.key === "Escape" && i();
    };
    return window.addEventListener("keydown", U), () => window.removeEventListener("keydown", U);
  }, [t, i]);
  const z = y.useCallback(
    (U) => {
      if (U.key !== "Tab") return;
      const q = ie.current;
      if (!q) return;
      const Y = q.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (Y.length === 0) return;
      const ce = Y[0], _ = Y[Y.length - 1], te = document.activeElement;
      U.shiftKey ? (te === ce || te === q) && (U.preventDefault(), _.focus()) : te === _ && (U.preventDefault(), ce.focus());
    },
    []
  ), F = y.useCallback(() => {
    if (T.current) {
      for (const U of T.current.getTracks()) U.stop();
      T.current = null;
    }
    R.current != null && (window.clearInterval(R.current), R.current = null);
  }, []), W = y.useCallback(() => {
    F(), b && URL.revokeObjectURL(b), v(null), A.current = [], V.current = null, p(0), m(null), u("idle");
  }, [b, F]);
  if (y.useEffect(() => {
    t || (W(), S(a));
  }, [t, a, W]), y.useEffect(() => () => {
    F(), b && URL.revokeObjectURL(b);
  }, [b, F]), !t) return null;
  const K = async () => {
    m(null), u("preparing");
    try {
      const U = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = U;
      const q = D_();
      X.current = q;
      const Y = q.mime ? new MediaRecorder(U, { mimeType: q.mime }) : new MediaRecorder(U);
      C.current = Y, A.current = [], Y.ondataavailable = (ce) => {
        ce.data && ce.data.size > 0 && A.current.push(ce.data);
      }, Y.onstop = () => {
        const ce = q.mime || "audio/webm", _ = new Blob(A.current, { type: ce }), te = new File([_], `${w || a || "recording"}.${q.ext}`, {
          type: ce
        });
        V.current = te;
        const ae = URL.createObjectURL(_);
        v(ae), u("ready"), F();
      }, Y.start(), O.current = Date.now(), p(0), R.current = window.setInterval(() => {
        p(Date.now() - O.current);
      }, 200), u("recording");
    } catch (U) {
      const q = U instanceof Error ? U.message : "could not access microphone";
      m(q), u(q.toLowerCase().includes("denied") ? "denied" : "error"), F();
    }
  }, le = () => {
    const U = C.current;
    U && U.state !== "inactive" && U.stop(), R.current != null && (window.clearInterval(R.current), R.current = null);
  }, ne = async () => {
    const U = V.current;
    if (!U) return;
    const q = (w || a).trim();
    if (!q) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await s(U, q), i();
    } catch (Y) {
      m(Y instanceof Error ? Y.message : "upload failed");
    } finally {
      N(!1);
    }
  }, k = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: x_, role: "presentation", onClick: i, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ie,
      className: S_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (U) => U.stopPropagation(),
      onKeyDown: z,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: w_, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: j_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: E_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: k
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: __, "aria-live": "polite", children: k_(g) }),
        /* @__PURE__ */ c.jsxs("div", { className: N_, children: [
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
                /* @__PURE__ */ c.jsx("span", { className: o0, "aria-hidden": "true" }),
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
                /* @__PURE__ */ c.jsx("span", { className: o0, "aria-hidden": "true" }),
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
                W();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: M_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: T_, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: C_,
              value: w,
              onChange: (U) => S(U.target.value),
              placeholder: a
            }
          )
        ] }),
        f && /* @__PURE__ */ c.jsx("div", { className: R_, children: f }),
        /* @__PURE__ */ c.jsxs("div", { className: A_, children: [
          /* @__PURE__ */ c.jsx(Fe, { variant: "ghost", size: "md", onClick: i, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            Fe,
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
function O_({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: s,
  onVoiceAssetsChange: o
}) {
  const [u, f] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(!1), T = y.useRef(null), A = y.useCallback(
    (K) => "upload",
    []
  ), O = y.useMemo(() => {
    const K = u.trim().toLowerCase();
    return a.filter((le) => {
      const ne = A(le);
      return !(m === "uploaded" && ne !== "upload" || m === "preset" && ne !== "preset" || K && !le.displayName.toLowerCase().includes(K));
    });
  }, [a, u, m, A]), R = y.useMemo(
    () => a.filter((K) => A(K) === "upload").length,
    [a, A]
  ), V = y.useCallback(
    (K) => {
      const le = [], ne = /* @__PURE__ */ new Set();
      for (const k of i)
        k.speakerVoiceAssetId === K && (ne.has(k.characterName) || (ne.add(k.characterName), le.push({
          characterName: k.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: s[k.characterName] ?? "#ba9eff"
        })));
      return le;
    },
    [i, s]
  ), X = y.useCallback(
    async (K) => {
      const le = Array.from(K).slice(0, 8);
      if (le.length !== 0) {
        C(!0);
        try {
          const ne = [];
          for (const k of le) {
            if (!k.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(k.name)) {
              on.error(`${k.name}: not an audio file`);
              continue;
            }
            const U = k.name.replace(/\.[^.]+$/, "");
            try {
              const q = await bc(t, k, U, "speaker");
              ne.push(q), on.success(`Added ${q.displayName}`);
            } catch (q) {
              on.error(q instanceof Error ? q.message : `${k.name}: upload failed`);
            }
          }
          ne.length > 0 && o([...ne, ...a]);
        } finally {
          C(!1);
        }
      }
    },
    [t, a, o]
  ), ie = (K) => {
    K.preventDefault(), b(!1), K.dataTransfer?.files && X(K.dataTransfer.files);
  }, M = y.useCallback(async () => {
    const K = window.prompt("Paste an audio URL (https://…)");
    if (K)
      try {
        const le = await fetch(K);
        if (!le.ok) throw new Error(`fetch failed: ${le.status}`);
        const ne = await le.blob(), k = K.split("/").pop()?.split("?")[0] ?? "voice.wav", U = new File([ne], k, { type: ne.type || "audio/wav" });
        await X([U]);
      } catch (le) {
        on.error(le instanceof Error ? le.message : "could not fetch URL");
      }
  }, [X]), H = y.useCallback(
    async (K, le) => {
      try {
        const ne = await YT(t, K, le);
        o(
          a.map((k) => k.voiceAssetId === K ? ne : k)
        ), on.success(`Renamed to ${ne.displayName}`);
      } catch (ne) {
        on.error(ne instanceof Error ? ne.message : "rename failed");
      }
    },
    [t, a, o]
  ), z = y.useCallback((K) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(K), on.success("Copied name")) : on.error("Clipboard unavailable");
  }, []), F = y.useCallback(
    async (K) => {
      if (window.confirm(`Delete "${K.displayName}"? Mappings using it will reset.`))
        try {
          await FT(t, K.voiceAssetId), o(a.filter((ne) => ne.voiceAssetId !== K.voiceAssetId)), on.success(`Deleted ${K.displayName}`);
        } catch (ne) {
          on.error(ne instanceof Error ? ne.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: DR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: kR,
        "data-over": p ? "true" : "false",
        onDragOver: (K) => {
          K.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ie,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: zR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: OR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: LR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: UR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: $R, children: [
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
            Fe,
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
              className: KR,
              onChange: (K) => {
                K.target.files && (X(K.target.files), K.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: BR, children: [
      /* @__PURE__ */ c.jsxs("label", { className: VR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: HR,
            value: u,
            onChange: (K) => f(K.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: qR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([K, le]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: IR,
          "data-active": m === K ? "true" : "false",
          onClick: () => g(K),
          children: le
        },
        K
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: GR, children: [
        /* @__PURE__ */ c.jsx("span", { className: PR, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          R,
          " uploaded"
        ] })
      ] })
    ] }),
    O.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: YR, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: FR, children: O.map((K) => {
      const le = A(K);
      return /* @__PURE__ */ c.jsx(
        b_,
        {
          asset: K,
          presentation: le,
          usedBy: V(K.voiceAssetId),
          isPlaying: v === K.voiceAssetId,
          onTogglePlay: () => w((ne) => ne === K.voiceAssetId ? null : K.voiceAssetId),
          onPlaybackEnded: () => w(null),
          onRename: (ne) => H(K.voiceAssetId, ne),
          onCopyName: () => z(K.displayName),
          onDelete: le === "upload" ? () => void F(K) : void 0
        },
        K.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      z_,
      {
        open: S,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (K, le) => {
          await W(K, le);
        }
      }
    )
  ] });
  async function W(K, le) {
    C(!0);
    try {
      const ne = await bc(t, K, le, "speaker");
      o([ne, ...a]), on.success(`Recorded ${ne.displayName}`);
    } catch (ne) {
      throw on.error(ne instanceof Error ? ne.message : "upload failed"), ne;
    } finally {
      C(!1);
    }
  }
}
async function L_(t) {
  return bt(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function U_(t, a, i) {
  return bt("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function $_(t, a) {
  await bt(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var c0 = "_190jlds0", B_ = "_190jlds1", V_ = "_190jlds2", H_ = "_190jlds3", q_ = "_190jlds4", I_ = "_190jlds5", F_ = "_190jlds6", Y_ = "_190jlds7", G_ = "_190jlds8", P_ = "_190jlds9", u0 = "_190jldsa", K_ = "_190jldsb", d0 = "_190jldsc", X_ = "_190jldsd", Q_ = "_190jldse", Z_ = "_190jldsf";
function J_({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: s,
  emptyHint: o
}) {
  const [u, f] = y.useState(() => Ui(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), [N, C] = y.useState(null), T = y.useMemo(
    () => a.find((R) => Ui(R) === u) ?? a[0],
    [a, u]
  );
  y.useEffect(() => {
    a.length && (a.some((R) => Ui(R) === u) || f(Ui(a[0])));
  }, [a, u]), y.useEffect(() => {
    if (!T) {
      g([]);
      return;
    }
    let R = !1;
    return b(!0), w(null), dc(t, T.kind, T.id, 50).then((V) => {
      R || g(V.entries);
    }).catch((V) => {
      R || w(V instanceof Error ? V.message : "audit fetch failed");
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
      entries: m
    }, V = new Blob([JSON.stringify(R, null, 2)], {
      type: "application/json"
    }), X = URL.createObjectURL(V), ie = document.createElement("a");
    ie.href = X, ie.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ie), ie.click(), document.body.removeChild(ie), URL.revokeObjectURL(X);
  }, [t, m, T]), O = y.useCallback(async () => {
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
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: c0, children: /* @__PURE__ */ c.jsx("p", { className: d0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: c0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: B_, children: [
      /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: u0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: H_,
            value: u,
            onChange: (R) => f(R.target.value),
            children: a.map((R) => /* @__PURE__ */ c.jsxs("option", { value: Ui(R), children: [
              R.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              R.label
            ] }, Ui(R)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: q_, children: [
        /* @__PURE__ */ c.jsx(
          Fe,
          {
            variant: "ghost",
            size: "sm",
            onClick: A,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ c.jsx(
          Fe,
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
    p && !v && /* @__PURE__ */ c.jsx("div", { className: Z_, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: d0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: X_, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: I_, children: m.map((R) => {
      const V = s && T && !!R.chain_snapshot_json && R.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: F_, children: [
        /* @__PURE__ */ c.jsx("span", { className: Y_, children: W_(R.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: G_, children: R.operation_count === 0 ? "cleared" : `${R.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: P_, title: R.digest_after, children: [
          R.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: u0, children: R.actor || "—" }),
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
        V && /* @__PURE__ */ c.jsx(
          Fe,
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
function Ui(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function W_(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var eM = "_1uzgubz0", tM = "_1uzgubz1", nM = "_1uzgubz2", aM = "_1uzgubz3", rM = "_1uzgubz4", iM = "_1uzgubz5", sM = "_1uzgubz6", lM = "_1uzgubz7", f0 = "_1uzgubz8", oM = "_1uzgubz9", e1 = "_1uzgubza", t1 = "_1uzgubzb", cM = "_1uzgubzc", uM = "_1uzgubzd", mf = "_1uzgubze", pf = "_1uzgubzf", dM = "_1uzgubzg", fM = "_1uzgubzh", h0 = "_1uzgubzi", m0 = "_1uzgubzj", p0 = "_1uzgubzk", v0 = "_1uzgubzl", g0 = "_1uzgubzm", hM = "_1uzgubzn", mM = "_1uzgubzo", pM = "_1uzgubzp", vM = "_1uzgubzq";
function gM({
  characterName: t,
  color: a,
  lineCount: i,
  mapping: s,
  voiceAssets: o,
  presets: u,
  active: f,
  onToggle: m,
  onAssignVoiceAsset: g,
  onAssignPreset: p,
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
        onClick: m,
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
              /* @__PURE__ */ c.jsx("span", { className: f0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                y0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: f0, children: N.presetName }),
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
              className: `${oM} ${T ? e1 : t1}`,
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
        /* @__PURE__ */ c.jsx("div", { className: h0, children: o.map((A) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${m0}${s?.speakerVoiceAssetId === A.voiceAssetId ? ` ${p0}` : ""}`,
            onClick: () => g(A.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: v0, children: A.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
                A.durationMs != null ? y0(A.durationMs) : "—",
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
      u.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: mf, children: [
        /* @__PURE__ */ c.jsx("span", { className: pf, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: h0, children: u.map((A) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${m0}${s?.defaultVectorPresetId === A.presetId ? ` ${p0}` : ""}`,
            onClick: () => p(A.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: v0, children: A.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: g0, children: "preset · vector" })
            ]
          },
          A.presetId
        )) })
      ] }),
      T && v && /* @__PURE__ */ c.jsx(Fe, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function y0(t) {
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
        className: `${mM} ${o ? e1 : t1}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: pM, children: i })
  ] });
}
async function xc() {
  return bt("/runtime/health");
}
async function bM() {
  await bt("/runtime/start", { method: "POST" });
}
async function xM() {
  return bt("/runtime/stop", { method: "POST" });
}
function n1(t) {
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
function Rn({
  severity: t,
  children: a,
  role: i,
  ariaLive: s,
  className: o,
  style: u
}) {
  const f = [SM[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), g = s ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: f, role: m, "aria-live": g, style: u, children: a });
}
var a1 = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, r1 = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, wM = "_13bb4njb";
function Jr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: s,
  className: o,
  style: u,
  title: f
}) {
  const m = i && t !== "faint", g = [a1[a], r1[t], m ? wM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: g, style: u, title: f, children: s });
}
const jM = 4e3;
function EM({ deployment: t }) {
  const [a, i] = y.useState(null), [s, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await xc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(CM(b));
      }
    };
    g();
    const p = setInterval(g, jM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const u = a?.badge ?? "not_installed", f = s?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: RR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Yi, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Yi, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Jr, { tone: NM(u), pulse: u === "starting" || u === "installing", children: n1(u) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Yi, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: TM(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Yi, children: "VRAM" }),
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
    s && !f && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: s })
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
}, Ha = 1e-3;
function RM(t, a, i) {
  for (const s of Object.keys(Sc)) {
    const o = Sc[s];
    if (Math.abs(o.low - t) < Ha && Math.abs(o.mid - a) < Ha && Math.abs(o.high - i) < Ha)
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
  if (Math.abs(a) < Ha) return { ...t, ops: i };
  const s = { id: _n(), mode: "gain", gain_db: a };
  return { ...t, ops: Nr(i, s) };
}
function kM(t, a, i, s) {
  const o = Er(t, "eq3");
  if (Math.abs(a) < Ha && Math.abs(i) < Ha && Math.abs(s) < Ha)
    return { ...t, ops: o };
  const u = {
    id: _n(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: s
  };
  return { ...t, ops: Nr(o, u) };
}
function zM(t, a) {
  const i = Er(t, "speed");
  if (Math.abs(a - 1) < Ha) return { ...t, ops: i };
  const s = { id: _n(), mode: "speed", factor: a };
  return { ...t, ops: Nr(i, s) };
}
function OM(t, a) {
  const i = Er(t, "pitch_shift");
  if (Math.abs(a) < Ha) return { ...t, ops: i };
  const s = {
    id: _n(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Nr(i, s) };
}
function LM(t, a, i) {
  const s = Er(t, "normalize");
  if (a === "off") return { ...t, ops: s };
  const o = {
    id: _n(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: Nr(s, o) };
}
function UM(t, a) {
  const i = Er(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const s = {
    id: _n(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(i, s) };
}
function $M(t, a) {
  const i = Er(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const s = {
    id: _n(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Nr(i, s) };
}
function BM(t, a, i) {
  const s = Er(t, "silence_strip");
  if (!a) return { ...t, ops: s };
  const o = {
    id: _n(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: Nr(s, o) };
}
const i1 = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function s1(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((u) => !i1.has(u.mode))
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
function l1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => i1.has(i.mode))
  };
  return _M(a);
}
var VM = "_1rsa80i0", HM = "_1rsa80i1", qM = "_1rsa80i2", IM = "_1rsa80i3", FM = "_1rsa80i4", YM = "_1rsa80i5", GM = "_1rsa80i6", PM = "_1rsa80i7", KM = "_1rsa80i8", XM = "_1rsa80i9";
const o1 = ["flat", "warm", "bright", "voice", "telephone"], Ws = -12, Go = 12, QM = 0.5;
function ZM(t) {
  const { low: a, mid: i, high: s, preset: o, onChange: u, disabled: f } = t, m = (p) => {
    const b = Sc[p];
    u(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: s, [p]: b }, w = WM(v.low, v.mid, v.high);
    u(v.low, v.mid, v.high, w);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: VM, children: [
    /* @__PURE__ */ c.jsxs("div", { className: HM, role: "group", "aria-label": "EQ presets", children: [
      o1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: qM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: f,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: IM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: FM, children: [
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: f
        }
      ),
      /* @__PURE__ */ c.jsx(
        vf,
        {
          label: "High",
          value: s,
          onChange: (p) => g("high", p),
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
  for (const s of o1) {
    const o = Sc[s];
    if (Math.abs(o.low - t) < gf && Math.abs(o.mid - a) < gf && Math.abs(o.high - i) < gf)
      return s;
  }
  return "custom";
}
var e2 = "_85bhwb0", t2 = "_85bhwb1", b0 = "_85bhwb2", n2 = "_85bhwb3", a2 = "_85bhwb4", r2 = "_85bhwb5", i2 = "_85bhwb6", s2 = "_85bhwb7";
const Po = 0.5, yf = 2, l2 = 0.05;
function o2(t) {
  const { mode: a, value: i, supportsSynthSpeed: s, onChange: o, onReRenderAtSynthTime: u, disabled: f } = t, m = (i - Po) / (yf - Po) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: e2, children: [
    s ? /* @__PURE__ */ c.jsxs("div", { className: t2, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: b0,
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
          className: b0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
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
          style: { "--fill": `${m}%` },
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
        Fe,
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
var c2 = "kgszk50", u2 = "kgszk51", x0 = "kgszk52", d2 = "kgszk53", f2 = "kgszk54", c1 = "kgszk55", h2 = "kgszk56", m2 = "kgszk58", Fh = "kgszk59", u1 = "kgszk5a", Yh = "kgszk5b", p2 = "kgszk5c", v2 = "kgszk5d", g2 = "kgszk5e", S0 = "kgszk5f", w0 = "kgszk5g", j0 = "kgszk5h", y2 = "kgszk5i", b2 = "kgszk5j", x2 = "kgszk5l", pl = "kgszk5m", vl = "kgszk5n";
const S2 = -24, w2 = 24, j2 = 0.5, E2 = -12, N2 = 12, T2 = 0.5, C2 = -30, R2 = -6, _2 = -12, M2 = 0, Ko = -60, bf = -20;
function Gh(t) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: s,
    onReRenderAtSynthTime: o,
    onSliderFlush: u,
    pendingExecution: f = !1,
    disabled: m = !1,
    onApply: g,
    applyLabel: p = "Apply edit"
  } = t, b = (S) => {
    i({ ...a, ...S });
  }, v = z2(a), w = (S) => {
    const j = S.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && u?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: c2, onPointerDownCapture: w, children: [
    /* @__PURE__ */ c.jsxs("div", { className: u2, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: d2, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: x0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      f ? /* @__PURE__ */ c.jsxs("span", { className: x0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: f2, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      E0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: S2,
        max: w2,
        step: j2,
        format: O2,
        value: a.volumeDb,
        onChange: (S) => b({ volumeDb: S }),
        disabled: m
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
          disabled: m,
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
          disabled: m,
          onChange: (S, j) => b({ speed: { mode: S, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      E0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: E2,
        max: N2,
        step: T2,
        format: L2,
        value: a.pitchSt,
        onChange: (S) => b({ pitchSt: S }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      A2,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (S) => b({ normalize: S })
      }
    ),
    /* @__PURE__ */ c.jsx(
      D2,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (S, j) => b({ fade: { ...a.fade, inS: S, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      k2,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (S, j) => b({ silence: { enabled: S, thresholdDb: j } })
      }
    ),
    g ? /* @__PURE__ */ c.jsxs("div", { className: x2, children: [
      /* @__PURE__ */ c.jsx(
        Fe,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Hc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx(Fe, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function E0(t) {
  const { label: a, sub: i, min: s, max: o, step: u, format: f, value: m, onChange: g, disabled: p } = t, b = (m - s) / (o - s) * 100, v = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: c1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: h2, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: m2, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: u1, children: i })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: s,
        max: o,
        step: u,
        value: m,
        disabled: p,
        className: Yh,
        style: { "--fill": `${b}%` },
        onChange: (w) => g(Number(w.target.value)),
        "aria-valuemin": s,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Fh, children: f(m) })
  ] });
}
function A2({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: C2, max: R2, step: 0.5, suffix: "LUFS" } : { min: _2, max: M2, step: 0.5, suffix: "dB" }, u = U2(t.targetDbOrLufs, o.min, o.max), f = (u - o.min) / (o.max - o.min) * 100, m = (g) => {
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
      const p = g === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: v2,
          "data-active": t.mode === g,
          disabled: i || p,
          onClick: () => m(g),
          title: p ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead." : void 0,
          children: [
            g,
            p ? " (soon)" : ""
          ]
        },
        g
      );
    }) }),
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: c1, children: [
      /* @__PURE__ */ c.jsx("span", { className: u1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: u,
          disabled: i,
          className: Yh,
          style: { "--fill": `${f}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": u,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Fh, children: [
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
      /* @__PURE__ */ c.jsxs("div", { className: S0, children: [
        /* @__PURE__ */ c.jsx("label", { className: w0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: s,
            className: j0,
            onChange: (f) => i(Math.max(0, Number(f.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: S0, children: [
        /* @__PURE__ */ c.jsx("label", { className: w0, htmlFor: u, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: u,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: s,
            className: j0,
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
          className: Yh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (u) => i(t, Number(u.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": bf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Fh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const $i = 1e-3;
function z2(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= $i && a.push("gain"), (Math.abs(t.eq3.low) >= $i || Math.abs(t.eq3.mid) >= $i || Math.abs(t.eq3.high) >= $i) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= $i && a.push("speed"), Math.abs(t.pitchSt) >= $i && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
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
var $2 = "skdk4g0", B2 = "skdk4g1", N0 = "skdk4g2", V2 = "skdk4g3", H2 = "skdk4g4", q2 = "skdk4g5", I2 = "skdk4g6", F2 = "skdk4g7", Y2 = "skdk4g8", G2 = "skdk4g9", P2 = "skdk4ga", K2 = "skdk4gb", X2 = "skdk4gc", Q2 = "skdk4gd", T0 = "skdk4ge", C0 = "skdk4gf", Z2 = "skdk4gg", R0 = "skdk4gh", _0 = "skdk4gi", J2 = "skdk4gj", W2 = "skdk4gk", eA = "skdk4gl", M0 = "skdk4gm", tA = "skdk4gn", A0 = "skdk4go", nA = "skdk4gp", aA = "skdk4gq", rA = "skdk4gr", iA = "skdk4gs", sA = "skdk4gt", lA = "skdk4gu", oA = "skdk4gv", D0 = "skdk4gw", cA = "skdk4gx", uA = "skdk4gy", dA = "skdk4gz", fA = "skdk4g10", hA = "cgsfgh1", mA = "cgsfgh2", pA = "cgsfgh3", vA = "cgsfgh4", gA = "cgsfgh5", yA = "cgsfgh6", bA = "cgsfgh7", xA = "cgsfgh8", SA = "cgsfgh9", wA = "cgsfgha", jA = "cgsfghb", EA = "cgsfghc", NA = "cgsfghd", TA = "cgsfghe", CA = "cgsfghm", RA = "cgsfghn", _A = "cgsfgho", MA = "cgsfghp";
const Kt = [
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
}, d1 = 0.05;
function AA(t) {
  let a = null, i = -1 / 0;
  for (const s of Kt) {
    const o = t[s];
    o > i && (i = o, a = s);
  }
  return !a || i <= d1 ? null : a;
}
function f1(t, a = 3) {
  return Kt.map((i) => ({ key: i, label: gl[i], value: t[i] })).filter((i) => i.value > d1).sort((i, s) => s.value - i.value).slice(0, a);
}
function DA(t) {
  let a = 0;
  for (const i of Kt) a += t[i] * t[i];
  return Math.sqrt(a);
}
function k0(t) {
  const a = f1(t, 2), i = a[0];
  if (!i) return "";
  const s = a[1];
  return !s || i.value - s.value > 0.25 ? xf(i.label) : `${xf(i.label)} + ${s.label.toLowerCase()}`;
}
function xf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Wr(t) {
  const a = { ...Zi };
  for (const i of Kt) {
    const s = t[i];
    a[i] = Number.isFinite(s) ? Math.max(0, Math.min(1, s)) : 0;
  }
  return a;
}
const z0 = 0.05, O0 = 0.2, kA = 22, zA = 320, Sf = 0.78;
function wf(t, a, i, s) {
  const o = Math.cos(i), u = Math.sin(i), f = t * o + a * u;
  return Math.max(0, Math.min(1, f / s));
}
function OA(t) {
  const { vec: a, onChange: i, size: s, reduceMotion: o = !1 } = t, [u, f] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), w = y.useRef(a), S = y.useRef(o), j = y.useRef(null), N = y.useRef(0);
  S.current = o, y.useEffect(() => {
    f(a), w.current = a;
  }, [a]);
  const C = y.useCallback(
    (H) => {
      const z = Wr(H);
      f(z), w.current = z, i(z);
    },
    [i]
  ), T = y.useCallback((H) => {
    const z = Wr(H);
    f(z), w.current = z;
  }, []), A = y.useCallback(
    (H) => {
      const z = v.current;
      if (!z || S.current) return;
      const F = H.clientX - z.centerX, W = H.clientY - z.centerY, K = s / 2 * Sf, le = wf(F, W, z.angle, K), ne = { ...w.current, [z.axis]: le };
      T(ne);
    },
    [s, T]
  ), O = y.useCallback(
    (H) => {
      const z = v.current;
      if (z) {
        if (window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", O), window.removeEventListener("pointercancel", O), S.current) {
          const F = H.clientX - z.centerX, W = H.clientY - z.centerY, K = s / 2 * Sf, le = wf(F, W, z.angle, K), ne = { ...w.current, [z.axis]: le };
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
  const R = y.useCallback((H, z) => {
    S.current || (N.current += 1, b({ x: H, y: z, key: N.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, zA));
  }, []), V = y.useCallback(
    (H, z, F, W, K) => {
      const le = F.getBoundingClientRect(), ne = le.left + le.width / 2, k = le.top + le.height / 2, q = Kt.indexOf(H) / Kt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: H,
        pointerId: z,
        centerX: ne,
        centerY: k,
        angle: q
      }, g(H), W !== void 0 && K !== void 0) {
        const Y = W - ne, ce = K - k, _ = s / 2 * Sf, te = wf(Y, ce, q, _), ae = { ...w.current, [H]: te };
        S.current ? C(ae) : T(ae);
      }
      window.addEventListener("pointermove", A), window.addEventListener("pointerup", O), window.addEventListener("pointercancel", O);
    },
    [C, A, O, s, T]
  ), X = y.useCallback(
    (H, z) => {
      z.preventDefault();
      const F = z.currentTarget, W = F.ownerSVGElement ?? F;
      V(H, z.pointerId, W);
    },
    [V]
  ), ie = y.useCallback(
    (H) => {
      const z = H.currentTarget, F = z instanceof SVGSVGElement ? z : z.ownerSVGElement ?? z, W = F.getBoundingClientRect(), K = W.left + W.width / 2, le = W.top + W.height / 2, ne = H.clientX - K, k = H.clientY - le;
      if (Math.sqrt(ne * ne + k * k) < 8) return;
      let q = Math.atan2(k, ne) * 180 / Math.PI;
      q = ((q + 90) % 360 + 360) % 360;
      let Y = null, ce = 999;
      for (let ae = 0; ae < Kt.length; ae++) {
        const G = Kt[ae];
        if (!G) continue;
        const $ = ae / Kt.length * 360, ee = Math.abs(($ - q + 540) % 360 - 180);
        ee < ce && (ce = ee, Y = G);
      }
      if (!Y || ce > kA) return;
      H.preventDefault();
      const _ = (H.clientX - W.left) / W.width * s, te = (H.clientY - W.top) / W.height * s;
      R(_, te), V(Y, H.pointerId, F, H.clientX, H.clientY);
    },
    [V, s, R]
  ), M = y.useCallback(
    (H, z) => {
      const F = w.current[H];
      let W = F;
      switch (z.key) {
        case "ArrowUp":
        case "ArrowRight":
          W = F + z0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          W = F - z0;
          break;
        case "PageUp":
          W = F + O0;
          break;
        case "PageDown":
          W = F - O0;
          break;
        case "Home":
          W = 0;
          break;
        case "End":
          W = 1;
          break;
        default:
          return;
      }
      z.preventDefault(), g(H), C({ ...w.current, [H]: W });
    },
    [C]
  );
  return {
    liveVec: u,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: X,
    onKeyDown: M,
    onSurfacePointerDown: ie,
    surfacePing: p
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
  const u = OA({ vec: t, onChange: a, size: i, reduceMotion: o }), f = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => $A(f, m, g), [f, m, g]), b = y.useMemo(() => Kt.map((v, w) => {
    const S = fc(u.liveVec[v]), j = p[w];
    return j ? `${f + j.dx * S},${m + j.dy * S}` : "0,0";
  }).join(" "), [p, f, m, u.liveVec]);
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
            cy: m,
            r: g * v
          },
          v
        )),
        Kt.map((v, w) => {
          const S = p[w];
          if (!S) return null;
          const j = f + S.dx * 1.18, N = m + S.dy * 1.18, C = u.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: gA,
                x1: f,
                y1: m,
                x2: f + S.dx,
                y2: m + S.dy
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
        Kt.map((v, w) => {
          const S = fc(u.liveVec[v]);
          if (S <= 0.01) return null;
          const j = p[w];
          if (!j) return null;
          const N = u.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${bA}${N ? ` ${xA}` : ""}`,
              x1: f,
              y1: m,
              x2: f + j.dx * S,
              y2: m + j.dy * S
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
        !s && Kt.map((v, w) => {
          const S = fc(u.liveVec[v]), j = p[w];
          if (!j) return null;
          const N = f + j.dx * S, C = m + j.dy * S, T = u.activeAxis === v;
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
  return Kt.map((s, o) => {
    const u = o / Kt.length * Math.PI * 2 - Math.PI / 2;
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
  const i = a / 2, s = a / 2, o = a / 2 * 0.86, u = y.useMemo(() => Kt.map((f, m) => {
    const g = fc(t[f]), p = m / Kt.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = s + Math.sin(p) * o * g;
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
const L0 = 0.05, U0 = 0.2;
function KA({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: s = !1
}) {
  const [o, u] = y.useState(null), f = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (j, N) => {
      const C = Math.max(0, Math.min(1, N));
      a(Wr({ ...t, [j]: C }));
    },
    [a, t]
  ), p = y.useCallback((j, N) => {
    const C = m.current.get(j);
    return !C || C.width <= 0 ? 0 : (N - C.left) / C.width;
  }, []), b = y.useCallback(
    (j, N) => {
      if (i) return;
      N.preventDefault();
      const C = N.currentTarget.querySelector("[data-track]");
      C instanceof HTMLElement && m.current.set(j, C.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), f.current = j, u(j), g(j, p(j, N.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (j, N) => {
      i || s || f.current === j && g(j, p(j, N.clientX));
    },
    [i, s, g, p]
  ), w = y.useCallback(
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
  ), S = y.useCallback(
    (j, N) => {
      if (i) return;
      const C = t[j] ?? 0;
      let T = C;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = C + L0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = C - L0;
          break;
        case "PageUp":
          T = C + U0;
          break;
        case "PageDown":
          T = C - U0;
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
  return /* @__PURE__ */ c.jsx("div", { className: VA, role: "group", "aria-label": "Emotion axis sliders", children: Kt.map((j) => {
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
var $0 = "gvwvwg0", QA = "gvwvwg2", ZA = "gvwvwg3", JA = "gvwvwg8", WA = "gvwvwg9", e3 = "gvwvwga", t3 = "gvwvwgb", n3 = "gvwvwgc", a3 = "gvwvwgd", r3 = "gvwvwge";
function i3({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: s
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: $0, children: [
    /* @__PURE__ */ c.jsx("span", { className: QA, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: ZA, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: $0, children: [
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
const eh = [
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
  const a = eh.reduce(
    (s, o) => ({ ...s, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = eh.reduce(
    (s, o, u) => ({ ...s, [o]: t.vector[u] ?? 0 }),
    a
  );
  return Wr(i);
}
function jf(t) {
  return eh.map((a) => t[a] ?? 0);
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
    let m = 0;
    for (const g of f.keywords) {
      const p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const w = v.index, S = a.slice(0, w), j = Math.max(
        S.lastIndexOf(","),
        S.lastIndexOf(";"),
        S.lastIndexOf(" but "),
        S.lastIndexOf(" yet ")
      ), C = S.slice(j >= 0 ? j : 0).slice(-30);
      u3.some((T) => new RegExp(`\\b${T}\\b`).test(C)) || (m += 1);
    }
    if (m > 0) {
      const g = f.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * s * o;
      u[f.axis] = Math.min(1, g);
    }
  }
  return Kt.every((f) => u[f] === 0) && (u.calm = 0.4), Wr(u);
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
  deploymentId: i,
  presets: s,
  onPresetsChange: o
}) {
  const u = t.mode ?? "none", f = y.useMemo(() => m3(t.vector), [t.vector]), m = t.emotionAlpha ?? 1, [g, p] = y.useState(null), [b, v] = y.useState(!1), [w, S] = y.useState(null), [j, N] = y.useState(""), [C, T] = y.useState(!1), A = y.useRef(!0);
  y.useEffect(() => (A.current = !0, () => {
    A.current = !1;
  }), []), y.useEffect(() => {
    C || N(k0(f));
  }, [f, C]);
  const O = (U) => {
    a({ ...t, mode: U });
  }, R = (U) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: jf(U)
    }), w && S(null);
  }, V = () => {
    R(Wr(Zi));
  }, X = (U) => {
    const q = Math.max(0, Math.min(10, Number.isFinite(U) ? U : 1));
    a({ ...t, emotionAlpha: q });
  }, ie = async () => {
    const U = j.trim();
    if (U) {
      v(!0), p(null);
      try {
        const q = await U_(i, U, jf(f));
        if (!A.current) return;
        o(
          p3([q, ...s.filter((Y) => Y.presetId !== q.presetId)])
        ), S(q.presetId), T(!1);
      } catch (q) {
        A.current && p(B0(q));
      } finally {
        A.current && v(!1);
      }
    }
  }, M = async (U) => {
    const q = [...s];
    o(s.filter((Y) => Y.presetId !== U)), w === U && S(null);
    try {
      await $_(i, U);
    } catch (Y) {
      A.current && (o(q), p(B0(Y)));
    }
  }, H = (U) => {
    S(U.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: U.vector
    });
  }, z = (U) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: U });
  }, F = AA(f), W = DA(f), K = f1(f, 3), le = K.length > 0 && j.trim().length > 0 && !b, ne = k0(f) || "name your preset…", k = u !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: $2, children: [
    /* @__PURE__ */ c.jsxs("div", { className: B2, children: [
      /* @__PURE__ */ c.jsx("span", { className: N0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: V2, role: "radiogroup", "aria-label": "Emotion mode", children: f3.map((U) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": u === U.id,
          className: `${H2}${u === U.id ? ` ${q2}` : ""}`,
          onClick: () => O(U.id),
          children: U.label
        },
        U.id
      )) })
    ] }),
    u === "none" && /* @__PURE__ */ c.jsxs("div", { className: A0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    u === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: A0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: J2, children: [
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
          Fe,
          {
            variant: "secondary",
            onClick: () => {
              const U = (t.qwenTemplate ?? "").trim();
              if (!U) return;
              const q = d3(U);
              a({
                ...t,
                mode: "emotion_vector",
                vector: jf(q)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: M0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (u === "emotion_vector" || u === "none" || u === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: Q2, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${a0} ${I2}`, children: /* @__PURE__ */ c.jsx(
        UA,
        {
          vec: f,
          onChange: R,
          readOnly: k
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${a0} ${F2}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: Y2, children: [
          /* @__PURE__ */ c.jsx("span", { className: N0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: G2, children: F ? gl[F].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: P2, children: [
            "‖v‖ = ",
            W.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(KA, { vec: f, onChange: R, readOnly: k }),
        /* @__PURE__ */ c.jsx("div", { className: K2, children: /* @__PURE__ */ c.jsxs(
          Fe,
          {
            variant: "ghost",
            size: "sm",
            onClick: V,
            disabled: k || W < 1e-3,
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
    u === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: T0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: C0, children: "Alpha" }),
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
            value: m,
            className: R0,
            style: { "--fill": `${m * 10}%` },
            onChange: (U) => X(Number(U.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: _0, children: [
          (m * 100).toFixed(0),
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
              /* @__PURE__ */ c.jsx("div", { className: oA, children: K.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${D0} ${uA}`, children: "no axes set" }) : K.map((U) => /* @__PURE__ */ c.jsxs("span", { className: D0, children: [
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
                      U.key === "Enter" && le && ie();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  Fe,
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
        i3,
        {
          presets: s,
          activePresetId: w,
          onSelect: H,
          onDelete: M
        }
      )
    ] }),
    u === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: T0, children: [
      /* @__PURE__ */ c.jsx("span", { className: C0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: m,
          className: R0,
          style: { "--fill": `${m * 10}%` },
          onChange: (U) => X(Number(U.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: _0, children: [
        (m * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsx("div", { className: tA, children: g })
  ] });
}
function m3(t) {
  if (!t || !Array.isArray(t)) return Wr(Zi);
  const a = { ...Zi };
  return Kt.forEach((i, s) => {
    const o = t[s];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function p3(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function B0(t) {
  return t instanceof ts || t instanceof Error ? t.message : "Unknown error";
}
var v3 = "_5u1uau0", el = "_5u1uau1", g3 = "_5u1uau2", Bi = "_5u1uau3", tl = "_5u1uau4", y3 = "_5u1uau5", Ef = "_5u1uau6", b3 = "_5u1uau7", x3 = "_5u1uau8", S3 = "_5u1uau9", w3 = "_5u1uaua", j3 = "_5u1uaub", E3 = "_5u1uauc", N3 = "_5u1uaud", T3 = "_5u1uaue", V0 = "_5u1uauf", H0 = "_5u1uaug", C3 = "_5u1uauh";
const Nf = [
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
], R3 = ["mp3", "wav", "flac"], Xo = 0.5, Tf = 2, _3 = 0.05, M3 = 0.8, A3 = 0.8, q0 = 42;
function Qo(t, a, i) {
  const s = t[a];
  if (typeof s == "number" && Number.isFinite(s)) return s;
  if (typeof s == "string") {
    const o = Number(s);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function D3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: s,
  cachePolicy: o,
  onCachePolicyChange: u,
  generation: f,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), w = y.useId(), S = (V, X) => {
    m({ ...f, [V]: X });
  }, j = f.seed === void 0 || f.seed === null ? "random" : "fixed", N = (V) => {
    if (V !== j)
      if (V === "random") {
        const X = { ...f };
        delete X.seed, m(X);
      } else {
        const X = Qo(f, "seed", q0);
        m({ ...f, seed: X });
      }
  }, C = Nf.find((V) => V.id === o) ?? Nf[0], T = (i - Xo) / (Tf - Xo) * 100, A = Qo(f, "temperature", M3), O = Qo(f, "top_p", A3), R = Qo(f, "seed", q0);
  return /* @__PURE__ */ c.jsxs("div", { className: v3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: Bi, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: g,
          className: y3,
          value: t,
          onChange: (V) => a(V.currentTarget.value),
          children: R3.map((V) => /* @__PURE__ */ c.jsx("option", { value: V, children: V }, V))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: Bi, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${tl} ${b3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: x3,
            min: Xo,
            max: Tf,
            step: _3,
            value: i,
            style: { "--range-pct": `${T}%` },
            onChange: (V) => s(Number(V.currentTarget.value)),
            "aria-valuemin": Xo,
            "aria-valuemax": Tf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: S3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: g3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: Bi, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: w3, children: Nf.map((V) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === V.id,
          className: j3,
          onClick: () => u(V.id),
          title: V.help,
          children: V.label
        },
        V.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: E3, "aria-live": "polite", children: C.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: N3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: Bi, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Ef,
          min: 0,
          max: 2,
          step: 0.05,
          value: A,
          onChange: (V) => S("temperature", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: Bi, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: tl, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Ef,
          min: 0,
          max: 1,
          step: 0.05,
          value: O,
          onChange: (V) => S("top_p", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: el, children: [
      /* @__PURE__ */ c.jsx("span", { className: Bi, id: `${w}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${tl} ${T3}`,
          role: "radiogroup",
          "aria-labelledby": `${w}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${V0} ${j === "fixed" ? H0 : ""}`,
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
                className: `${V0} ${j === "random" ? H0 : ""}`,
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
                className: Ef,
                step: 1,
                value: R,
                onChange: (V) => S("seed", Math.trunc(Number(V.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: C3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var k3 = "iv43qk0", I0 = "iv43qk1", z3 = "iv43qk2", F0 = "iv43qk3", O3 = "iv43qk4", L3 = "iv43qk5", U3 = "iv43qk6", $3 = "iv43qk7", B3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, V3 = "iv43qkd", H3 = "iv43qke", Cf = "iv43qkf", Rf = "iv43qkg";
function q3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: V3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const s = t.length, o = t.filter((f) => f.character !== null).length, u = s - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: H3, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Cf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Rf, children: s }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Cf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Rf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Cf, children: [
        /* @__PURE__ */ c.jsx("span", { className: Rf, children: u }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: k3, children: t.map((f) => /* @__PURE__ */ c.jsx(
      I3,
      {
        line: f,
        ...f.character && a[f.character] ? { color: a[f.character] } : {},
        ...i ? { onClick: () => i(f.idx) } : {}
      },
      f.idx
    )) })
  ] });
}
function I3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${I0} ${z3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: F0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: U3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: I0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: F0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: O3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: L3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${$3} ${B3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var F3 = "_46z95i0", Y3 = "_46z95i1", G3 = "_46z95i2", P3 = "_46z95i3", K3 = "_46z95i4", X3 = "_46z95i5", Q3 = "_46z95i6";
const Z3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function J3({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: F3, children: [
    /* @__PURE__ */ c.jsx(
      _f,
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
      _f,
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
      _f,
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
function _f({ label: t, sub: a, min: i, max: s, step: o, format: u, value: f, onChange: m }) {
  const g = (f - i) / (s - i) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ c.jsxs("div", { className: Y3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: G3, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: P3, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: K3, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: s,
        step: o,
        value: f,
        className: X3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Q3, children: u(f) })
  ] });
}
var W3 = "qe93dj0", eD = "qe93dj1", tD = "qe93dj2", nD = "qe93dj3", aD = "qe93dj4", rD = "qe93dj5", iD = "qe93dj6", sD = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, lD = "qe93dja", oD = "qe93djb";
function cD({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: W3, children: [
    /* @__PURE__ */ c.jsxs("header", { className: eD, children: [
      /* @__PURE__ */ c.jsx("span", { className: tD, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: nD, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: aD, children: t.map((i) => /* @__PURE__ */ c.jsxs("li", { className: rD, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${iD} ${sD[i.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: lD, children: i.label }),
      i.detail && /* @__PURE__ */ c.jsx("span", { className: oD, children: i.detail })
    ] }, i.id)) })
  ] });
}
var Y0 = "_17fbpt30", G0 = "_17fbpt31", P0 = "_17fbpt32", uD = "_17fbpt33", dD = "_17fbpt34", fD = "_17fbpt35", K0 = "_17fbpt36", hD = "_17fbpt37", mD = "_17fbpt38";
const pD = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function vD({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: s,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: Y0, children: [
    /* @__PURE__ */ c.jsx("header", { className: G0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: P0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (u) => {
          u.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: hD, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: mD, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: Y0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: G0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: P0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (u) => {
            u.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: uD, children: t.slice(0, 5).map((u) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: dD,
        onClick: s ? () => s(u.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: fD, children: u.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${a1.sm} ${r1[pD[u.status] ?? "neutral"]}`, children: u.status }),
          /* @__PURE__ */ c.jsx("span", { className: K0, children: gD(u.startedAt ?? u.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: K0, children: u.kind })
        ]
      }
    ) }, u.runId)) })
  ] });
}
function gD(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
const h1 = y.createContext({});
function Ph(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const yD = typeof window < "u", m1 = yD ? y.useLayoutEffect : y.useEffect, qc = /* @__PURE__ */ y.createContext(null);
function bD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function xD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const wr = (t, a, i) => i > a ? a : i < t ? t : i;
function X0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Nl = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Nl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(X0(a, i));
}, Ji = (t, a, i) => {
  if (!t)
    throw new Error(X0(a, i));
});
const jr = {}, p1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function SD(t) {
  return typeof t == "object" && t !== null;
}
const v1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function g1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ns = /* @__NO_SIDE_EFFECTS__ */ (t) => t, wD = (t, a) => (i) => a(t(i)), Ic = (...t) => t.reduce(wD), y1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const s = a - t;
  return s === 0 ? 1 : (i - t) / s;
};
class b1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return bD(this.subscriptions, a), () => xD(this.subscriptions, a);
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
const ea = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, ca = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function x1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const S1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, jD = 1e-7, ED = 12;
function ND(t, a, i, s, o) {
  let u, f, m = 0;
  do
    f = a + (i - a) / 2, u = S1(f, s, o) - t, u > 0 ? i = f : a = f;
  while (Math.abs(u) > jD && ++m < ED);
  return f;
}
function Tl(t, a, i, s) {
  if (t === a && i === s)
    return ns;
  const o = (u) => ND(u, 0, 1, t, i);
  return (u) => u === 0 || u === 1 ? u : S1(o(u), a, s);
}
const w1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, j1 = (t) => (a) => 1 - t(1 - a), E1 = /* @__PURE__ */ Tl(0.33, 1.53, 0.69, 0.99), Kh = /* @__PURE__ */ j1(E1), N1 = /* @__PURE__ */ w1(Kh), T1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Kh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Xh = (t) => 1 - Math.sin(Math.acos(t)), TD = j1(Xh), C1 = w1(Xh), CD = /* @__PURE__ */ Tl(0.42, 0, 1, 1), RD = /* @__PURE__ */ Tl(0, 0, 0.58, 1), R1 = /* @__PURE__ */ Tl(0.42, 0, 0.58, 1), _D = (t) => Array.isArray(t) && typeof t[0] != "number", _1 = (t) => Array.isArray(t) && typeof t[0] == "number", Q0 = {
  linear: ns,
  easeIn: CD,
  easeInOut: R1,
  easeOut: RD,
  circIn: Xh,
  circInOut: C1,
  circOut: TD,
  backIn: Kh,
  backInOut: N1,
  backOut: E1,
  anticipate: T1
}, MD = (t) => typeof t == "string", Z0 = (t) => {
  if (_1(t)) {
    Ji(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, s, o] = t;
    return Tl(a, i, s, o);
  } else if (MD(t))
    return Ji(Q0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Q0[t];
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
function AD(t, a) {
  let i = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), o = !1, u = !1;
  const f = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    f.has(b) && (p.schedule(b), t()), b(m);
  }
  const p = {
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
      if (m = b, o) {
        u = !0;
        return;
      }
      o = !0;
      const v = i;
      i = s, s = v, i.forEach(g), i.clear(), o = !1, u && (u = !1, p.process(b));
    }
  };
  return p;
}
const DD = 40;
function M1(t, a) {
  let i = !1, s = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => i = !0, f = Zo.reduce((O, R) => (O[R] = AD(u), O), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: w, render: S, postRender: j } = f, N = () => {
    const O = jr.useManualTiming, R = O ? o.timestamp : performance.now();
    i = !1, O || (o.delta = s ? 1e3 / 60 : Math.max(Math.min(R - o.timestamp, DD), 1)), o.timestamp = R, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), w.process(o), S.process(o), j.process(o), o.isProcessing = !1, i && a && (s = !1, t(N));
  }, C = () => {
    i = !0, s = !0, o.isProcessing || t(N);
  };
  return { schedule: Zo.reduce((O, R) => {
    const V = f[R];
    return O[R] = (X, ie = !1, M = !1) => (i || C(), V.schedule(X, ie, M)), O;
  }, {}), cancel: (O) => {
    for (let R = 0; R < Zo.length; R++)
      f[Zo[R]].cancel(O);
  }, state: o, steps: f };
}
const { schedule: ta, cancel: th, state: wc } = /* @__PURE__ */ M1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ns, !0);
let hc;
function kD() {
  hc = void 0;
}
const Vn = {
  now: () => (hc === void 0 && Vn.set(wc.isProcessing || jr.useManualTiming ? wc.timestamp : performance.now()), hc),
  set: (t) => {
    hc = t, queueMicrotask(kD);
  }
}, A1 = (t) => (a) => typeof a == "string" && a.startsWith(t), D1 = /* @__PURE__ */ A1("--"), zD = /* @__PURE__ */ A1("var(--"), Qh = (t) => zD(t) ? OD.test(t.split("/*")[0].trim()) : !1, OD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function J0(t) {
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
}, dl = (t) => Math.round(t * 1e5) / 1e5, Zh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function LD(t) {
  return t == null;
}
const UD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Jh = (t, a) => (i) => !!(typeof i == "string" && UD.test(i) && i.startsWith(t) || a && !LD(i) && Object.prototype.hasOwnProperty.call(i, a)), k1 = (t, a, i) => (s) => {
  if (typeof s != "string")
    return s;
  const [o, u, f, m] = s.match(Zh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(u),
    [i]: parseFloat(f),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, $D = (t) => wr(0, 255, t), Mf = {
  ...as,
  transform: (t) => Math.round($D(t))
}, Pr = {
  test: /* @__PURE__ */ Jh("rgb", "red"),
  parse: /* @__PURE__ */ k1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: s = 1 }) => "rgba(" + Mf.transform(t) + ", " + Mf.transform(a) + ", " + Mf.transform(i) + ", " + dl(yl.transform(s)) + ")"
};
function BD(t) {
  let a = "", i = "", s = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), s = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), s = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, s += s, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(s, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const nh = {
  test: /* @__PURE__ */ Jh("#"),
  parse: BD,
  transform: Pr.transform
}, Cl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), gr = /* @__PURE__ */ Cl("deg"), Ki = /* @__PURE__ */ Cl("%"), Te = /* @__PURE__ */ Cl("px"), VD = /* @__PURE__ */ Cl("vh"), HD = /* @__PURE__ */ Cl("vw"), W0 = {
  ...Ki,
  parse: (t) => Ki.parse(t) / 100,
  transform: (t) => Ki.transform(t * 100)
}, Gi = {
  test: /* @__PURE__ */ Jh("hsl", "hue"),
  parse: /* @__PURE__ */ k1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Ki.transform(dl(a)) + ", " + Ki.transform(dl(i)) + ", " + dl(yl.transform(s)) + ")"
}, Pt = {
  test: (t) => Pr.test(t) || nh.test(t) || Gi.test(t),
  parse: (t) => Pr.test(t) ? Pr.parse(t) : Gi.test(t) ? Gi.parse(t) : nh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Pr.transform(t) : Gi.transform(t),
  getAnimatableNone: (t) => {
    const a = Pt.parse(t);
    return a.alpha = 0, Pt.transform(a);
  }
}, qD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ID(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Zh)?.length || 0) + (t.match(qD)?.length || 0) > 0;
}
const z1 = "number", O1 = "color", FD = "var", YD = "var(", eb = "${}", GD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(t) {
  const a = t.toString(), i = [], s = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let u = 0;
  const m = a.replace(GD, (g) => (Pt.test(g) ? (s.color.push(u), o.push(O1), i.push(Pt.parse(g))) : g.startsWith(YD) ? (s.var.push(u), o.push(FD), i.push(g)) : (s.number.push(u), o.push(z1), i.push(parseFloat(g))), ++u, eb)).split(eb);
  return { values: i, split: m, indexes: s, types: o };
}
function PD(t) {
  return Wi(t).values;
}
function L1({ split: t, types: a }) {
  const i = t.length;
  return (s) => {
    let o = "";
    for (let u = 0; u < i; u++)
      if (o += t[u], s[u] !== void 0) {
        const f = a[u];
        f === z1 ? o += dl(s[u]) : f === O1 ? o += Pt.transform(s[u]) : o += s[u];
      }
    return o;
  };
}
function KD(t) {
  return L1(Wi(t));
}
const XD = (t) => typeof t == "number" ? 0 : Pt.test(t) ? Pt.getAnimatableNone(t) : t, QD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : XD(t);
function ZD(t) {
  const a = Wi(t);
  return L1(a)(a.values.map((s, o) => QD(s, a.split[o])));
}
const ua = {
  test: ID,
  parse: PD,
  createTransformer: KD,
  getAnimatableNone: ZD
};
function Af(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function JD({ hue: t, saturation: a, lightness: i, alpha: s }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, u = 0, f = 0;
  if (!a)
    o = u = f = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - m;
    o = Af(g, m, t + 1 / 3), u = Af(g, m, t), f = Af(g, m, t - 1 / 3);
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
const Rl = (t, a, i) => t + (a - t) * i, Df = (t, a, i) => {
  const s = t * t, o = i * (a * a - s) + s;
  return o < 0 ? 0 : Math.sqrt(o);
}, WD = [nh, Pr, Gi], ek = (t) => WD.find((a) => a.test(t));
function tb(t) {
  const a = ek(t);
  if (Nl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Gi && (i = JD(i)), i;
}
const nb = (t, a) => {
  const i = tb(t), s = tb(a);
  if (!i || !s)
    return jc(t, a);
  const o = { ...i };
  return (u) => (o.red = Df(i.red, s.red, u), o.green = Df(i.green, s.green, u), o.blue = Df(i.blue, s.blue, u), o.alpha = Rl(i.alpha, s.alpha, u), Pr.transform(o));
}, ah = /* @__PURE__ */ new Set(["none", "hidden"]);
function tk(t, a) {
  return ah.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function nk(t, a) {
  return (i) => Rl(t, a, i);
}
function Wh(t) {
  return typeof t == "number" ? nk : typeof t == "string" ? Qh(t) ? jc : Pt.test(t) ? nb : ik : Array.isArray(t) ? U1 : typeof t == "object" ? Pt.test(t) ? nb : ak : jc;
}
function U1(t, a) {
  const i = [...t], s = i.length, o = t.map((u, f) => Wh(u)(u, a[f]));
  return (u) => {
    for (let f = 0; f < s; f++)
      i[f] = o[f](u);
    return i;
  };
}
function ak(t, a) {
  const i = { ...t, ...a }, s = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (s[o] = Wh(t[o])(t[o], a[o]));
  return (o) => {
    for (const u in s)
      i[u] = s[u](o);
    return i;
  };
}
function rk(t, a) {
  const i = [], s = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const u = a.types[o], f = t.indexes[u][s[u]], m = t.values[f] ?? 0;
    i[o] = m, s[u]++;
  }
  return i;
}
const ik = (t, a) => {
  const i = ua.createTransformer(a), s = Wi(t), o = Wi(a);
  return s.indexes.var.length === o.indexes.var.length && s.indexes.color.length === o.indexes.color.length && s.indexes.number.length >= o.indexes.number.length ? ah.has(t) && !o.values.length || ah.has(a) && !s.values.length ? tk(t, a) : Ic(U1(rk(s, o), o.values), i) : (Nl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), jc(t, a));
};
function $1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? Rl(t, a, i) : Wh(t)(t, a);
}
const sk = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => ta.update(a, i),
    stop: () => th(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wc.isProcessing ? wc.timestamp : Vn.now()
  };
}, B1 = (t, a, i = 10) => {
  let s = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let u = 0; u < o; u++)
    s += Math.round(t(u / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Ec = 2e4;
function em(t) {
  let a = 0;
  const i = 50;
  let s = t.next(a);
  for (; !s.done && a < Ec; )
    a += i, s = t.next(a);
  return a >= Ec ? 1 / 0 : a;
}
function lk(t, a = 100, i) {
  const s = i({ ...t, keyframes: [0, a] }), o = Math.min(em(s), Ec);
  return {
    type: "keyframes",
    ease: (u) => s.next(o * u).value / a,
    duration: /* @__PURE__ */ ca(o)
  };
}
const _t = {
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
function rh(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const ok = 12;
function ck(t, a, i) {
  let s = i;
  for (let o = 1; o < ok; o++)
    s = s - t(s) / a(s);
  return s;
}
const kf = 1e-3;
function uk({ duration: t = _t.duration, bounce: a = _t.bounce, velocity: i = _t.velocity, mass: s = _t.mass }) {
  let o, u;
  Nl(t <= /* @__PURE__ */ ea(_t.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let f = 1 - a;
  f = wr(_t.minDamping, _t.maxDamping, f), t = wr(_t.minDuration, _t.maxDuration, /* @__PURE__ */ ca(t)), f < 1 ? (o = (p) => {
    const b = p * f, v = b * t, w = b - i, S = rh(p, f), j = Math.exp(-v);
    return kf - w / S * j;
  }, u = (p) => {
    const v = p * f * t, w = v * i + i, S = Math.pow(f, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), N = rh(Math.pow(p, 2), f);
    return (-o(p) + kf > 0 ? -1 : 1) * ((w - S) * j) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - i) * t + 1;
    return -kf + b * v;
  }, u = (p) => {
    const b = Math.exp(-p * t), v = (i - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, g = ck(o, u, m);
  if (t = /* @__PURE__ */ ea(t), isNaN(g))
    return {
      stiffness: _t.stiffness,
      damping: _t.damping,
      duration: t
    };
  {
    const p = Math.pow(g, 2) * s;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(s * p),
      duration: t
    };
  }
}
const dk = ["duration", "bounce"], fk = ["stiffness", "damping", "mass"];
function ab(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function hk(t) {
  let a = {
    velocity: _t.velocity,
    stiffness: _t.stiffness,
    damping: _t.damping,
    mass: _t.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ab(t, fk) && ab(t, dk))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, s = 2 * Math.PI / (i * 1.2), o = s * s, u = 2 * wr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: _t.mass,
        stiffness: o,
        damping: u
      };
    } else {
      const i = uk({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: _t.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Nc(t = _t.visualDuration, a = _t.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: s, restDelta: o } = i;
  const u = i.keyframes[0], f = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: u }, { stiffness: g, damping: p, mass: b, duration: v, velocity: w, isResolvedFromDuration: S } = hk({
    ...i,
    velocity: -/* @__PURE__ */ ca(i.velocity || 0)
  }), j = w || 0, N = p / (2 * Math.sqrt(g * b)), C = f - u, T = /* @__PURE__ */ ca(Math.sqrt(g / b)), A = Math.abs(C) < 5;
  s || (s = A ? _t.restSpeed.granular : _t.restSpeed.default), o || (o = A ? _t.restDelta.granular : _t.restDelta.default);
  let O, R, V, X, ie, M;
  if (N < 1)
    V = rh(T, N), X = (j + N * T * C) / V, O = (z) => {
      const F = Math.exp(-N * T * z);
      return f - F * (X * Math.sin(V * z) + C * Math.cos(V * z));
    }, ie = N * T * X + C * V, M = N * T * C - X * V, R = (z) => Math.exp(-N * T * z) * (ie * Math.sin(V * z) + M * Math.cos(V * z));
  else if (N === 1) {
    O = (F) => f - Math.exp(-T * F) * (C + (j + T * C) * F);
    const z = j + T * C;
    R = (F) => Math.exp(-T * F) * (T * z * F - j);
  } else {
    const z = T * Math.sqrt(N * N - 1);
    O = (le) => {
      const ne = Math.exp(-N * T * le), k = Math.min(z * le, 300);
      return f - ne * ((j + N * T * C) * Math.sinh(k) + z * C * Math.cosh(k)) / z;
    };
    const F = (j + N * T * C) / z, W = N * T * F - C * z, K = N * T * C - F * z;
    R = (le) => {
      const ne = Math.exp(-N * T * le), k = Math.min(z * le, 300);
      return ne * (W * Math.sinh(k) + K * Math.cosh(k));
    };
  }
  const H = {
    calculatedDuration: S && v || null,
    velocity: (z) => /* @__PURE__ */ ea(R(z)),
    next: (z) => {
      if (!S && N < 1) {
        const W = Math.exp(-N * T * z), K = Math.sin(V * z), le = Math.cos(V * z), ne = f - W * (X * K + C * le), k = /* @__PURE__ */ ea(W * (ie * K + M * le));
        return m.done = Math.abs(k) <= s && Math.abs(f - ne) <= o, m.value = m.done ? f : ne, m;
      }
      const F = O(z);
      if (S)
        m.done = z >= v;
      else {
        const W = /* @__PURE__ */ ea(R(z));
        m.done = Math.abs(W) <= s && Math.abs(f - F) <= o;
      }
      return m.value = m.done ? f : F, m;
    },
    toString: () => {
      const z = Math.min(em(H), Ec), F = B1((W) => H.next(z * W).value, z, 30);
      return z + "ms " + F;
    },
    toTransition: () => {
    }
  };
  return H;
}
Nc.applyToOptions = (t) => {
  const a = lk(t, 100, Nc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ ea(a.duration), t.type = "keyframes", t;
};
const mk = 5;
function V1(t, a, i) {
  const s = Math.max(a - mk, 0);
  return x1(i - t(s), a - s);
}
function ih({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: s = 325, bounceDamping: o = 10, bounceStiffness: u = 500, modifyTarget: f, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], w = {
    done: !1,
    value: v
  }, S = (M) => m !== void 0 && M < m || g !== void 0 && M > g, j = (M) => m === void 0 ? g : g === void 0 || Math.abs(m - M) < Math.abs(g - M) ? m : g;
  let N = i * a;
  const C = v + N, T = f === void 0 ? C : f(C);
  T !== C && (N = T - v);
  const A = (M) => -N * Math.exp(-M / s), O = (M) => T + A(M), R = (M) => {
    const H = A(M), z = O(M);
    w.done = Math.abs(H) <= p, w.value = w.done ? T : z;
  };
  let V, X;
  const ie = (M) => {
    S(w.value) && (V = M, X = Nc({
      keyframes: [w.value, j(w.value)],
      velocity: V1(O, M, w.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: u,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ie(0), {
    calculatedDuration: null,
    next: (M) => {
      let H = !1;
      return !X && V === void 0 && (H = !0, R(M), ie(M)), V !== void 0 && M >= V ? X.next(M - V) : (!H && R(M), w);
    }
  };
}
function pk(t, a, i) {
  const s = [], o = i || jr.mix || $1, u = t.length - 1;
  for (let f = 0; f < u; f++) {
    let m = o(t[f], t[f + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[f] || ns : a;
      m = Ic(g, m);
    }
    s.push(m);
  }
  return s;
}
function vk(t, a, { clamp: i = !0, ease: s, mixer: o } = {}) {
  const u = t.length;
  if (Ji(u === a.length, "Both input and output ranges must be the same length", "range-length"), u === 1)
    return () => a[0];
  if (u === 2 && a[0] === a[1])
    return () => a[1];
  const f = t[0] === t[1];
  t[0] > t[u - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = pk(a, s, o), g = m.length, p = (b) => {
    if (f && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const w = /* @__PURE__ */ y1(t[v], t[v + 1], b);
    return m[v](w);
  };
  return i ? (b) => p(wr(t[0], t[u - 1], b)) : p;
}
function gk(t, a) {
  const i = t[t.length - 1];
  for (let s = 1; s <= a; s++) {
    const o = /* @__PURE__ */ y1(0, a, s);
    t.push(Rl(i, 1, o));
  }
}
function yk(t) {
  const a = [0];
  return gk(a, t.length - 1), a;
}
function bk(t, a) {
  return t.map((i) => i * a);
}
function xk(t, a) {
  return t.map(() => a || R1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: i, ease: s = "easeInOut" }) {
  const o = _D(s) ? s.map(Z0) : Z0(s), u = {
    done: !1,
    value: a[0]
  }, f = bk(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : yk(a),
    t
  ), m = vk(f, a, {
    ease: Array.isArray(o) ? o : xk(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (u.value = m(g), u.done = g >= t, u)
  };
}
const Sk = (t) => t !== null;
function Fc(t, { repeat: a, repeatType: i = "loop" }, s, o = 1) {
  const u = t.filter(Sk), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : u.length - 1;
  return !m || s === void 0 ? u[m] : s;
}
const wk = {
  decay: ih,
  inertia: ih,
  tween: fl,
  keyframes: fl,
  spring: Nc
};
function H1(t) {
  typeof t.type == "string" && (t.type = wk[t.type]);
}
class tm {
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
const jk = (t) => t / 100;
class Tc extends tm {
  constructor(a) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Vn.now() && this.tick(Vn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = a, this.initAnimation(), this.play(), a.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: a } = this;
    H1(a);
    const { type: i = fl, repeat: s = 0, repeatDelay: o = 0, repeatType: u, velocity: f = 0 } = a;
    let { keyframes: m } = a;
    const g = i || fl;
    g !== fl && typeof m[0] != "number" && (this.mixKeyframes = Ic(jk, $1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    u === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = em(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (s + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: s, totalDuration: o, mixKeyframes: u, mirroredGenerator: f, resolvedDuration: m, calculatedDuration: g } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: w, repeatDelay: S, type: j, onUpdate: N, finalKeyframe: C } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let O = this.currentTime, R = s;
    if (v) {
      const M = Math.min(this.currentTime, o) / m;
      let H = Math.floor(M), z = M % 1;
      !z && M >= 1 && (z = 1), z === 1 && H--, H = Math.min(H, v + 1), !!(H % 2) && (w === "reverse" ? (z = 1 - z, S && (z -= S / m)) : w === "mirror" && (R = f)), O = wr(0, 1, z) * m;
    }
    let V;
    A ? (this.delayState.value = b[0], V = this.delayState) : V = R.next(O), u && !A && (V.value = u(V.value));
    let { done: X } = V;
    !A && g !== null && (X = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ie = this.holdTime === null && (this.state === "finished" || this.state === "running" && X);
    return ie && j !== ih && (V.value = Fc(b, this.options, C, this.speed)), N && N(V.value), ie && this.finish(), V;
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
    a = /* @__PURE__ */ ea(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return V1((s) => this.generator.next(s).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(Vn.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ ca(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = sk, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Vn.now()), this.holdTime = this.currentTime;
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
function Ek(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Kr = (t) => t * 180 / Math.PI, sh = (t) => {
  const a = Kr(Math.atan2(t[1], t[0]));
  return lh(a);
}, Nk = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: sh,
  rotateZ: sh,
  skewX: (t) => Kr(Math.atan(t[1])),
  skewY: (t) => Kr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, lh = (t) => (t = t % 360, t < 0 && (t += 360), t), rb = sh, ib = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), sb = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Tk = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ib,
  scaleY: sb,
  scale: (t) => (ib(t) + sb(t)) / 2,
  rotateX: (t) => lh(Kr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => lh(Kr(Math.atan2(-t[2], t[0]))),
  rotateZ: rb,
  rotate: rb,
  skewX: (t) => Kr(Math.atan(t[4])),
  skewY: (t) => Kr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function oh(t) {
  return t.includes("scale") ? 1 : 0;
}
function ch(t, a) {
  if (!t || t === "none")
    return oh(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, o;
  if (i)
    s = Tk, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Nk, o = m;
  }
  if (!o)
    return oh(a);
  const u = s[a], f = o[1].split(",").map(Rk);
  return typeof u == "function" ? u(f) : f[u];
}
const Ck = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return ch(i, a);
};
function Rk(t) {
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
], is = new Set(rs), lb = (t) => t === as || t === Te, _k = /* @__PURE__ */ new Set(["x", "y", "z"]), Mk = rs.filter((t) => !_k.has(t));
function Ak(t) {
  const a = [];
  return Mk.forEach((i) => {
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
  x: (t, { transform: a }) => ch(a, "x"),
  y: (t, { transform: a }) => ch(a, "y")
};
Sr.translateX = Sr.x;
Sr.translateY = Sr.y;
const Qr = /* @__PURE__ */ new Set();
let uh = !1, dh = !1, fh = !1;
function q1() {
  if (dh) {
    const t = Array.from(Qr).filter((s) => s.needsMeasurement), a = new Set(t.map((s) => s.element)), i = /* @__PURE__ */ new Map();
    a.forEach((s) => {
      const o = Ak(s);
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
  dh = !1, uh = !1, Qr.forEach((t) => t.complete(fh)), Qr.clear();
}
function I1() {
  Qr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (dh = !0);
  });
}
function Dk() {
  fh = !0, I1(), q1(), fh = !1;
}
class nm {
  constructor(a, i, s, o, u, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = s, this.motionValue = o, this.element = u, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Qr.add(this), uh || (uh = !0, ta.read(I1), ta.resolveKeyframes(q1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: s, motionValue: o } = this;
    if (a[0] === null) {
      const u = o?.get(), f = a[a.length - 1];
      if (u !== void 0)
        a[0] = u;
      else if (s && i) {
        const m = s.readValue(i, f);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = f), o && u === void 0 && o.set(a[0]);
    }
    Ek(a);
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
const kk = (t) => t.startsWith("--");
function F1(t, a, i) {
  kk(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const zk = {};
function Y1(t, a) {
  const i = /* @__PURE__ */ g1(t);
  return () => zk[a] ?? i();
}
const Ok = /* @__PURE__ */ Y1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), G1 = /* @__PURE__ */ Y1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, i, s]) => `cubic-bezier(${t}, ${a}, ${i}, ${s})`, ob = {
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
function P1(t, a) {
  if (t)
    return typeof t == "function" ? G1() ? B1(t, a) : "ease-out" : _1(t) ? ol(t) : Array.isArray(t) ? t.map((i) => P1(i, a) || ob.easeOut) : ob[t];
}
function Lk(t, a, i, { delay: s = 0, duration: o = 300, repeat: u = 0, repeatType: f = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = P1(m, o);
  Array.isArray(v) && (b.easing = v);
  const w = {
    delay: s,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (w.pseudoElement = p), t.animate(b, w);
}
function K1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Uk({ type: t, ...a }) {
  return K1(t) && G1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class X1 extends tm {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: s, keyframes: o, pseudoElement: u, allowFlatten: f = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!u, this.allowFlatten = f, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = Uk(a);
    this.animation = Lk(i, s, o, p, u), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const b = Fc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), F1(i, s, b), this.animation.cancel();
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
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ ea(a), i && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && Ok() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), s && (this.animation.rangeEnd = s), ns) : o(this);
  }
}
const Q1 = {
  anticipate: T1,
  backInOut: N1,
  circInOut: C1
};
function $k(t) {
  return t in Q1;
}
function Bk(t) {
  typeof t.ease == "string" && $k(t.ease) && (t.ease = Q1[t.ease]);
}
const zf = 10;
class Vk extends X1 {
  constructor(a) {
    Bk(a), H1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new Tc({
      ...f,
      autoplay: !1
    }), g = Math.max(zf, Vn.now() - this.startTime), p = wr(0, zf, g - zf), b = m.sample(g).value, { name: v } = this.options;
    u && v && F1(u, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const cb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ua.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Hk(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function qk(t, a, i, s) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const u = t[t.length - 1], f = cb(o, a), m = cb(u, a);
  return Nl(f === m, `You are trying to animate ${a} from "${o}" to "${u}". "${f ? u : o}" is not an animatable value.`, "value-not-animatable"), !f || !m ? !1 : Hk(t) || (i === "spring" || K1(i)) && s;
}
function hh(t) {
  t.duration = 0, t.type = "keyframes";
}
const Z1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Ik = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Fk(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && Ik.test(t[a]))
      return !0;
  return !1;
}
const Yk = /* @__PURE__ */ new Set([
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
]), Gk = /* @__PURE__ */ g1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Pk(t) {
  const { motionValue: a, name: i, repeatDelay: s, repeatType: o, damping: u, type: f, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return Gk() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Z1.has(i) || Yk.has(i) && Fk(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && o !== "mirror" && u !== 0 && f !== "inertia";
}
const Kk = 40;
class Xk extends tm {
  constructor({ autoplay: a = !0, delay: i = 0, type: s = "keyframes", repeat: o = 0, repeatDelay: u = 0, repeatType: f = "loop", keyframes: m, name: g, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Vn.now();
    const w = {
      autoplay: a,
      delay: i,
      type: s,
      repeat: o,
      repeatDelay: u,
      repeatType: f,
      name: g,
      motionValue: p,
      element: b,
      ...v
    }, S = b?.KeyframeResolver || nm;
    this.keyframeResolver = new S(m, (j, N, C) => this.onKeyframesResolved(j, N, w, !C), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, s, o) {
    this.keyframeResolver = void 0;
    const { name: u, type: f, velocity: m, delay: g, isHandoff: p, onUpdate: b } = s;
    this.resolvedAt = Vn.now();
    let v = !0;
    qk(a, u, f, m) || (v = !1, (jr.instantAnimations || !g) && b?.(Fc(a, s, i)), a[0] = a[a.length - 1], hh(s), s.repeat = 0);
    const S = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > Kk ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...s,
      keyframes: a
    }, j = v && !p && Pk(S), N = S.motionValue?.owner?.current;
    let C;
    if (j)
      try {
        C = new Vk({
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
    return this._animation || (this.keyframeResolver?.resume(), Dk()), this._animation;
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
function J1(t, a, i, s = 0, o = 1) {
  const u = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), f = t.size, m = (f - 1) * s;
  return typeof i == "function" ? i(u, f) : o === 1 ? u * s : m - u * s;
}
const Qk = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Zk(t) {
  const a = Qk.exec(t);
  if (!a)
    return [,];
  const [, i, s, o] = a;
  return [`--${i ?? s}`, o];
}
const Jk = 4;
function W1(t, a, i = 1) {
  Ji(i <= Jk, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, o] = Zk(t);
  if (!s)
    return;
  const u = window.getComputedStyle(a).getPropertyValue(s);
  if (u) {
    const f = u.trim();
    return p1(f) ? parseFloat(f) : f;
  }
  return Qh(o) ? W1(o, a, i + 1) : o;
}
const Wk = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, e5 = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), t5 = {
  type: "keyframes",
  duration: 0.8
}, n5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, a5 = (t, { keyframes: a }) => a.length > 2 ? t5 : is.has(t) ? t.startsWith("scale") ? e5(a[1]) : Wk : n5;
function eS(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...s } = t;
    return { ...a, ...s };
  }
  return t;
}
function tS(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? eS(i, t) : i;
}
const r5 = /* @__PURE__ */ new Set([
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
function i5(t) {
  for (const a in t)
    if (!r5.has(a))
      return !0;
  return !1;
}
const s5 = (t, a, i, s = {}, o, u) => (f) => {
  const m = tS(s, t) || {}, g = m.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ ea(g);
  const b = {
    keyframes: Array.isArray(i) ? i : [null, i],
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
  i5(m) || Object.assign(b, a5(t, b)), b.duration && (b.duration = /* @__PURE__ */ ea(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ ea(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (hh(b), b.delay === 0 && (v = !0)), (jr.instantAnimations || jr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, hh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !u && a.get() !== void 0) {
    const w = Fc(b.keyframes, m);
    if (w !== void 0) {
      ta.update(() => {
        b.onUpdate(w), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Tc(b) : new Xk(b);
};
function ub(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, s) => {
    a[0][s] = i.get(), a[1][s] = i.getVelocity();
  }), a;
}
function am(t, a, i, s) {
  if (typeof a == "function") {
    const [o, u] = ub(s);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, u] = ub(s);
    a = a(i !== void 0 ? i : t.custom, o, u);
  }
  return a;
}
function Zr(t, a, i) {
  const s = t.getProps();
  return am(s, a, i !== void 0 ? i : s.custom, t);
}
const nS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...rs
]), db = 30, l5 = (t) => !isNaN(parseFloat(t));
class o5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const o = Vn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Vn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = l5(this.current));
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
    this.events[a] || (this.events[a] = new b1());
    const s = this.events[a].add(i);
    return a === "change" ? () => {
      s(), ta.read(() => {
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
    const a = Vn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > db)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, db);
    return x1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
  return new o5(t, a);
}
const mh = (t) => Array.isArray(t);
function c5(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Cc(i));
}
function u5(t) {
  return mh(t) ? t[t.length - 1] || 0 : t;
}
function d5(t, a) {
  const i = Zr(t, a);
  let { transitionEnd: s = {}, transition: o = {}, ...u } = i || {};
  u = { ...u, ...s };
  for (const f in u) {
    const m = u5(u[f]);
    c5(t, f, m);
  }
}
const pn = (t) => !!(t && t.getVelocity);
function f5(t) {
  return !!(pn(t) && t.add);
}
function h5(t, a) {
  const i = t.getValue("willChange");
  if (f5(i))
    return i.add(a);
  if (!i && jr.WillChange) {
    const s = new jr.WillChange("auto");
    t.addValue("willChange", s), s.add(a);
  }
}
function rm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const m5 = "framerAppearId", aS = "data-" + rm(m5);
function p5(t) {
  return t.props[aS];
}
function v5({ protectedKeys: t, needsAnimating: a }, i) {
  const s = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, s;
}
function rS(t, a, { delay: i = 0, transitionOverride: s, type: o } = {}) {
  let { transition: u, transitionEnd: f, ...m } = a;
  const g = t.getDefaultTransition();
  u = u ? eS(u, g) : g;
  const p = u?.reduceMotion;
  s && (u = s);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const w in m) {
    const S = t.getValue(w, t.latestValues[w] ?? null), j = m[w];
    if (j === void 0 || v && v5(v, w))
      continue;
    const N = {
      delay: i,
      ...tS(u || {}, w)
    }, C = S.get();
    if (C !== void 0 && !S.isAnimating() && !Array.isArray(j) && j === C && !N.velocity) {
      ta.update(() => S.set(j));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const R = p5(t);
      if (R) {
        const V = window.MotionHandoffAnimation(R, w, ta);
        V !== null && (N.startTime = V, T = !0);
      }
    }
    h5(t, w);
    const A = p ?? t.shouldReduceMotion;
    S.start(s5(w, S, j, A && nS.has(w) ? { type: !1 } : N, t, T));
    const O = S.animation;
    O && b.push(O);
  }
  if (f) {
    const w = () => ta.update(() => {
      f && d5(t, f);
    });
    b.length ? Promise.all(b).then(w) : w();
  }
  return b;
}
function ph(t, a, i = {}) {
  const s = Zr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = s || {};
  i.transitionOverride && (o = i.transitionOverride);
  const u = s ? () => Promise.all(rS(t, s, i)) : () => Promise.resolve(), f = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return g5(t, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [u, f] : [f, u];
    return g().then(() => p());
  } else
    return Promise.all([u(), f(i.delay)]);
}
function g5(t, a, i = 0, s = 0, o = 0, u = 1, f) {
  const m = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), m.push(ph(g, a, {
      ...f,
      delay: i + (typeof s == "function" ? 0 : s) + J1(t.variantChildren, g, s, o, u)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function y5(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let s;
  if (Array.isArray(a)) {
    const o = a.map((u) => ph(t, u, i));
    s = Promise.all(o);
  } else if (typeof a == "string")
    s = ph(t, a, i);
  else {
    const o = typeof a == "function" ? Zr(t, a, i.custom) : a;
    s = Promise.all(rS(t, o, i));
  }
  return s.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const b5 = {
  test: (t) => t === "auto",
  parse: (t) => t
}, iS = (t) => (a) => a.test(t), sS = [as, Te, Ki, gr, HD, VD, b5], fb = (t) => sS.find(iS(t));
function x5(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || v1(t) : !0;
}
const S5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function w5(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [s] = i.match(Zh) || [];
  if (!s)
    return t;
  const o = i.replace(s, "");
  let u = S5.has(a) ? 1 : 0;
  return s !== i && (u *= 100), a + "(" + u + o + ")";
}
const j5 = /\b([a-z-]*)\(.*?\)/gu, vh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = t.match(j5);
    return a ? a.map(w5).join(" ") : t;
  }
}, gh = {
  ...ua,
  getAnimatableNone: (t) => {
    const a = ua.parse(t);
    return ua.createTransformer(t)(a.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, hb = {
  ...as,
  transform: Math.round
}, E5 = {
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
  distance: Te,
  translateX: Te,
  translateY: Te,
  translateZ: Te,
  x: Te,
  y: Te,
  z: Te,
  perspective: Te,
  transformPerspective: Te,
  opacity: yl,
  originX: W0,
  originY: W0,
  originZ: Te
}, im = {
  // Border props
  borderWidth: Te,
  borderTopWidth: Te,
  borderRightWidth: Te,
  borderBottomWidth: Te,
  borderLeftWidth: Te,
  borderRadius: Te,
  borderTopLeftRadius: Te,
  borderTopRightRadius: Te,
  borderBottomRightRadius: Te,
  borderBottomLeftRadius: Te,
  // Positioning props
  width: Te,
  maxWidth: Te,
  height: Te,
  maxHeight: Te,
  top: Te,
  right: Te,
  bottom: Te,
  left: Te,
  inset: Te,
  insetBlock: Te,
  insetBlockStart: Te,
  insetBlockEnd: Te,
  insetInline: Te,
  insetInlineStart: Te,
  insetInlineEnd: Te,
  // Spacing props
  padding: Te,
  paddingTop: Te,
  paddingRight: Te,
  paddingBottom: Te,
  paddingLeft: Te,
  paddingBlock: Te,
  paddingBlockStart: Te,
  paddingBlockEnd: Te,
  paddingInline: Te,
  paddingInlineStart: Te,
  paddingInlineEnd: Te,
  margin: Te,
  marginTop: Te,
  marginRight: Te,
  marginBottom: Te,
  marginLeft: Te,
  marginBlock: Te,
  marginBlockStart: Te,
  marginBlockEnd: Te,
  marginInline: Te,
  marginInlineStart: Te,
  marginInlineEnd: Te,
  // Typography
  fontSize: Te,
  // Misc
  backgroundPositionX: Te,
  backgroundPositionY: Te,
  ...E5,
  zIndex: hb,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: hb
}, N5 = {
  ...im,
  // Color props
  color: Pt,
  backgroundColor: Pt,
  outlineColor: Pt,
  fill: Pt,
  stroke: Pt,
  // Border props
  borderColor: Pt,
  borderTopColor: Pt,
  borderRightColor: Pt,
  borderBottomColor: Pt,
  borderLeftColor: Pt,
  filter: vh,
  WebkitFilter: vh,
  mask: gh,
  WebkitMask: gh
}, lS = (t) => N5[t], T5 = /* @__PURE__ */ new Set([vh, gh]);
function oS(t, a) {
  let i = lS(t);
  return T5.has(i) || (i = ua), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const C5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function R5(t, a, i) {
  let s = 0, o;
  for (; s < t.length && !o; ) {
    const u = t[s];
    typeof u == "string" && !C5.has(u) && Wi(u).values.length && (o = t[s]), s++;
  }
  if (o && i)
    for (const u of a)
      t[u] = oS(i, o);
}
class _5 extends nm {
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
      if (typeof v == "string" && (v = v.trim(), Qh(v))) {
        const w = W1(v, i.current);
        w !== void 0 && (a[b] = w), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !nS.has(s) || a.length !== 2)
      return;
    const [o, u] = a, f = fb(o), m = fb(u), g = J0(o), p = J0(u);
    if (g !== p && Sr[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== m)
      if (lb(f) && lb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else Sr[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, s = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || x5(a[o])) && s.push(o);
    s.length && R5(a, s, i);
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
    s[u] = Sr[i](a.measureViewportBox(), window.getComputedStyle(a.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([m, g]) => {
      a.getValue(m).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function M5(t, a, i) {
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
const cS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function mc(t) {
  return SD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: A5 } = /* @__PURE__ */ M1(queueMicrotask, !1), D5 = {
  y: !1
};
function k5() {
  return D5.y;
}
function uS(t, a) {
  const i = M5(t), s = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: s.signal
  };
  return [i, o, () => s.abort()];
}
function z5(t) {
  return !(t.pointerType === "touch" || k5());
}
function O5(t, a, i = {}) {
  const [s, o, u] = uS(t, i);
  return s.forEach((f) => {
    let m = !1, g = !1, p;
    const b = () => {
      f.removeEventListener("pointerleave", j);
    }, v = (C) => {
      p && (p(C), p = void 0), b();
    }, w = (C) => {
      m = !1, window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), g && (g = !1, v(C));
    }, S = () => {
      m = !0, window.addEventListener("pointerup", w, o), window.addEventListener("pointercancel", w, o);
    }, j = (C) => {
      if (C.pointerType !== "touch") {
        if (m) {
          g = !0;
          return;
        }
        v(C);
      }
    }, N = (C) => {
      if (!z5(C))
        return;
      g = !1;
      const T = a(f, C);
      typeof T == "function" && (p = T, f.addEventListener("pointerleave", j, o));
    };
    f.addEventListener("pointerenter", N, o), f.addEventListener("pointerdown", S, o);
  }), u;
}
const dS = (t, a) => a ? t === a ? !0 : dS(t, a.parentElement) : !1, L5 = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, U5 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function $5(t) {
  return U5.has(t.tagName) || t.isContentEditable === !0;
}
const pc = /* @__PURE__ */ new WeakSet();
function mb(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Of(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const B5 = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const s = mb(() => {
    if (pc.has(i))
      return;
    Of(i, "down");
    const o = mb(() => {
      Of(i, "up");
    }), u = () => Of(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", u, a);
  });
  i.addEventListener("keydown", s, a), i.addEventListener("blur", () => i.removeEventListener("keydown", s), a);
};
function pb(t) {
  return L5(t) && !0;
}
const vb = /* @__PURE__ */ new WeakSet();
function V5(t, a, i = {}) {
  const [s, o, u] = uS(t, i), f = (m) => {
    const g = m.currentTarget;
    if (!pb(m) || vb.has(m))
      return;
    pc.add(g), i.stopPropagation && vb.add(m);
    const p = a(g, m), b = (S, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", w), pc.has(g) && pc.delete(g), pb(S) && typeof p == "function" && p(S, { success: j });
    }, v = (S) => {
      b(S, g === window || g === document || i.useGlobalTarget || dS(g, S.target));
    }, w = (S) => {
      b(S, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", w, o);
  };
  return s.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", f, o), mc(m) && (m.addEventListener("focus", (p) => B5(p, o)), !$5(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), u;
}
const H5 = [...sS, Pt, ua], q5 = (t) => H5.find(iS(t)), gb = () => ({ min: 0, max: 0 }), fS = () => ({
  x: gb(),
  y: gb()
}), I5 = /* @__PURE__ */ new WeakMap();
function Yc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const sm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], lm = ["initial", ...sm];
function Gc(t) {
  return Yc(t.animate) || lm.some((a) => bl(t[a]));
}
function hS(t) {
  return !!(Gc(t) || t.variants);
}
function F5(t, a, i) {
  for (const s in a) {
    const o = a[s], u = i[s];
    if (pn(o))
      t.addValue(s, o);
    else if (pn(u))
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
const Rc = { current: null }, om = { current: !1 }, Y5 = typeof window < "u";
function mS() {
  if (om.current = !0, !!Y5)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Rc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Rc.current = !1;
}
const yb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let _c = {};
function pS(t) {
  _c = t;
}
function G5() {
  return _c;
}
class P5 {
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
  constructor({ parent: a, props: i, presenceContext: s, reducedMotionConfig: o, skipAnimations: u, blockInitialAnimation: f, visualState: m }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = nm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const S = Vn.now();
      this.renderScheduledAt < S && (this.renderScheduledAt = S, ta.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = s, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = u, this.options = g, this.blockInitialAnimation = !!f, this.isControllingVariants = Gc(i), this.isVariantNode = hS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...w } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const S in w) {
      const j = w[S];
      p[S] !== void 0 && pn(j) && j.set(p[S]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, I5.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, s) => this.bindToMotionValue(s, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (om.current || mS(), this.shouldReduceMotion = Rc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), th(this.notifyUpdate), th(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && Z1.has(a) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new X1({
        element: this.current,
        name: a,
        keyframes: m,
        times: g,
        ease: p,
        duration: /* @__PURE__ */ ea(b)
      }), w = f(v);
      this.valueSubscriptions.set(a, () => {
        w(), v.cancel();
      });
      return;
    }
    const s = is.has(a);
    s && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (f) => {
      this.latestValues[a] = f, this.props.onUpdate && ta.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : fS();
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
    for (let s = 0; s < yb.length; s++) {
      const o = yb[s];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const u = "on" + o, f = a[u];
      f && (this.propEventSubscriptions[o] = this.on(o, f));
    }
    this.prevMotionValues = F5(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && (p1(s) || v1(s)) ? s = parseFloat(s) : !q5(s) && ua.test(i) && (s = oS(a, i)), this.setBaseTarget(a, pn(s) ? s.get() : s)), pn(s) ? s.get() : s;
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
      const u = am(this.props, i, this.presenceContext?.custom);
      u && (s = u[a]);
    }
    if (i && s !== void 0)
      return s;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !pn(o) ? o : this.initialValues[a] !== void 0 && s === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new b1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    A5.render(this.render);
  }
}
class vS extends P5 {
  constructor() {
    super(...arguments), this.KeyframeResolver = _5;
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
    pn(a) && (this.childSubscription = a.on("change", (i) => {
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
function K5({ top: t, left: a, right: i, bottom: s }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: s }
  };
}
function X5(t, a) {
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
function Q5(t, a) {
  return K5(X5(t.getBoundingClientRect(), a));
}
const Z5 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, J5 = rs.length;
function W5(t, a, i) {
  let s = "", o = !0;
  for (let u = 0; u < J5; u++) {
    const f = rs[u], m = t[f];
    if (m === void 0)
      continue;
    let g = !0;
    if (typeof m == "number")
      g = m === (f.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      g = f.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!g || i) {
      const p = cS(m, im[f]);
      if (!g) {
        o = !1;
        const b = Z5[f] || f;
        s += `${b}(${p}) `;
      }
      i && (a[f] = p);
    }
  }
  return s = s.trim(), i ? s = i(a, o ? "" : s) : o && (s = "none"), s;
}
function cm(t, a, i) {
  const { style: s, vars: o, transformOrigin: u } = t;
  let f = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (is.has(g)) {
      f = !0;
      continue;
    } else if (D1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = cS(p, im[g]);
      g.startsWith("origin") ? (m = !0, u[g] = b) : s[g] = b;
    }
  }
  if (a.transform || (f || i ? s.transform = W5(a, t.transform, i) : s.transform && (s.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = u;
    s.transformOrigin = `${g} ${p} ${b}`;
  }
}
function gS(t, { style: a, vars: i }, s, o) {
  const u = t.style;
  let f;
  for (f in a)
    u[f] = a[f];
  o?.applyProjectionStyles(u, s);
  for (f in i)
    u.setProperty(f, i[f]);
}
function bb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const nl = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (Te.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = bb(t, a.target.x), s = bb(t, a.target.y);
    return `${i}% ${s}%`;
  }
}, ez = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const s = t, o = ua.parse(t);
    if (o.length > 5)
      return s;
    const u = ua.createTransformer(t), f = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + f] /= m, o[1 + f] /= g;
    const p = Rl(m, g, 0.5);
    return typeof o[2 + f] == "number" && (o[2 + f] /= p), typeof o[3 + f] == "number" && (o[3 + f] /= p), u(o);
  }
}, tz = {
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
  boxShadow: ez
};
function yS(t, { layout: a, layoutId: i }) {
  return is.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!tz[t] || t === "opacity");
}
function um(t, a, i) {
  const s = t.style, o = a?.style, u = {};
  if (!s)
    return u;
  for (const f in s)
    (pn(s[f]) || o && pn(o[f]) || yS(f, t) || i?.getValue(f)?.liveStyle !== void 0) && (u[f] = s[f]);
  return u;
}
function nz(t) {
  return window.getComputedStyle(t);
}
class az extends vS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = gS;
  }
  readValueFromInstance(a, i) {
    if (is.has(i))
      return this.projection?.isProjecting ? oh(i) : Ck(a, i);
    {
      const s = nz(a), o = (D1(i) ? s.getPropertyValue(i) : s[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return Q5(a, i);
  }
  build(a, i, s) {
    cm(a, i, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return um(a, i, s);
  }
}
const rz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, iz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function sz(t, a, i = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const u = o ? rz : iz;
  t[u.offset] = `${-s}`, t[u.array] = `${a} ${i}`;
}
const lz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function bS(t, {
  attrX: a,
  attrY: i,
  attrScale: s,
  pathLength: o,
  pathSpacing: u = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (cm(t, m, p), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: w } = t;
  v.transform && (w.transform = v.transform, delete v.transform), (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), w.transform && (w.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const S of lz)
    v[S] !== void 0 && (w[S] = v[S], delete v[S]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), s !== void 0 && (v.scale = s), o !== void 0 && sz(v, o, u, f, !1);
}
const xS = /* @__PURE__ */ new Set([
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
]), SS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function oz(t, a, i, s) {
  gS(t, a, void 0, s);
  for (const o in a.attrs)
    t.setAttribute(xS.has(o) ? o : rm(o), a.attrs[o]);
}
function wS(t, a, i) {
  const s = um(t, a, i);
  for (const o in t)
    if (pn(t[o]) || pn(a[o])) {
      const u = rs.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      s[u] = t[o];
    }
  return s;
}
class cz extends vS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = fS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (is.has(i)) {
      const s = lS(i);
      return s && s.default || 0;
    }
    return i = xS.has(i) ? i : rm(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, s) {
    return wS(a, i, s);
  }
  build(a, i, s) {
    bS(a, i, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(a, i, s, o) {
    oz(a, i, s, o);
  }
  mount(a) {
    this.isSVGTag = SS(a.tagName), super.mount(a);
  }
}
const uz = lm.length;
function jS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? jS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < uz; i++) {
    const s = lm[i], o = t.props[s];
    (bl(o) || o === !1) && (a[s] = o);
  }
  return a;
}
function ES(t, a) {
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
const dz = [...sm].reverse(), fz = sm.length;
function hz(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: s }) => y5(t, i, s)));
}
function mz(t) {
  let a = hz(t), i = xb(), s = !0, o = !1;
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
    const { props: b } = t, v = jS(t.parent) || {}, w = [], S = /* @__PURE__ */ new Set();
    let j = {}, N = 1 / 0;
    for (let T = 0; T < fz; T++) {
      const A = dz[T], O = i[A], R = b[A] !== void 0 ? b[A] : v[A], V = bl(R), X = A === p ? O.isActive : null;
      X === !1 && (N = T);
      let ie = R === v[A] && R !== b[A] && V;
      if (ie && (s || o) && t.manuallyAnimateOnMount && (ie = !1), O.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
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
      const M = pz(O.prevProp, R);
      let H = M || // If we're making this variant active, we want to always make it active
      A === p && O.isActive && !ie && V || // If we removed a higher-priority variant (i is in reverse order)
      T > N && V, z = !1;
      const F = Array.isArray(R) ? R : [R];
      let W = F.reduce(u(A), {});
      X === !1 && (W = {});
      const { prevResolvedValues: K = {} } = O, le = {
        ...K,
        ...W
      }, ne = (q) => {
        H = !0, S.has(q) && (z = !0, S.delete(q)), O.needsAnimating[q] = !0;
        const Y = t.getValue(q);
        Y && (Y.liveStyle = !1);
      };
      for (const q in le) {
        const Y = W[q], ce = K[q];
        if (j.hasOwnProperty(q))
          continue;
        let _ = !1;
        mh(Y) && mh(ce) ? _ = !ES(Y, ce) : _ = Y !== ce, _ ? Y != null ? ne(q) : S.add(q) : Y !== void 0 && S.has(q) ? ne(q) : O.protectedKeys[q] = !0;
      }
      O.prevProp = R, O.prevResolvedValues = W, O.isActive && (j = { ...j, ...W }), (s || o) && t.blockInitialAnimation && (H = !1);
      const k = ie && M;
      H && (!k || z) && w.push(...F.map((q) => {
        const Y = { type: A };
        if (typeof q == "string" && (s || o) && !k && t.manuallyAnimateOnMount && t.parent) {
          const { parent: ce } = t, _ = Zr(ce, q);
          if (ce.enteringChildren && _) {
            const { delayChildren: te } = _.transition || {};
            Y.delay = J1(ce.enteringChildren, t, te);
          }
        }
        return {
          animation: q,
          options: Y
        };
      }));
    }
    if (S.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const A = Zr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
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
  function g(p, b) {
    if (i[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((w) => w.animationState?.setActive(p, b)), i[p].isActive = b;
    const v = m(p);
    for (const w in i)
      i[w].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: g,
    setAnimateFunction: f,
    getState: () => i,
    reset: () => {
      i = xb(), o = !0;
    }
  };
}
function pz(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !ES(a, t) : !1;
}
function Fr(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function xb() {
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
function Sb(t, a, i, s = { passive: !0 }) {
  return t.addEventListener(a, i, s), () => t.removeEventListener(a, i);
}
function vz(t) {
  return pn(t) ? t.get() : t;
}
const dm = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function wb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function gz(...t) {
  return (a) => {
    let i = !1;
    const s = t.map((o) => {
      const u = wb(o, a);
      return !i && typeof u == "function" && (i = !0), u;
    });
    if (i)
      return () => {
        for (let o = 0; o < s.length; o++) {
          const u = s[o];
          typeof u == "function" ? u() : wb(t[o], null);
        }
      };
  };
}
function yz(...t) {
  return y.useCallback(gz(...t), t);
}
class bz extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (mc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = i.offsetParent, o = mc(s) && s.offsetWidth || 0, u = mc(s) && s.offsetHeight || 0, f = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(f.height), m.width = parseFloat(f.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = u - m.height - m.top;
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
function xz({ children: t, isPresent: a, anchorX: i, anchorY: s, root: o, pop: u }) {
  const f = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(dm), b = t.props?.ref ?? t?.ref, v = yz(m, b);
  return y.useInsertionEffect(() => {
    const { width: w, height: S, top: j, left: N, right: C, bottom: T } = g.current;
    if (a || u === !1 || !m.current || !w || !S)
      return;
    const A = i === "left" ? `left: ${N}` : `right: ${C}`, O = s === "bottom" ? `bottom: ${T}` : `top: ${j}`;
    m.current.dataset.motionPopId = f;
    const R = document.createElement("style");
    p && (R.nonce = p);
    const V = o ?? document.head;
    return V.appendChild(R), R.sheet && R.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${w}px !important;
            height: ${S}px !important;
            ${A}px !important;
            ${O}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), V.contains(R) && V.removeChild(R);
    };
  }, [a]), c.jsx(bz, { isPresent: a, childRef: m, sizeRef: g, pop: u, children: u === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const Sz = ({ children: t, initial: a, isPresent: i, onExitComplete: s, custom: o, presenceAffectsLayout: u, mode: f, anchorX: m, anchorY: g, root: p }) => {
  const b = Ph(wz), v = y.useId();
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
  }, [i]), t = c.jsx(xz, { pop: f === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: t }), c.jsx(qc.Provider, { value: S, children: t });
};
function wz() {
  return /* @__PURE__ */ new Map();
}
function jz(t = !0) {
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
function jb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const NS = ({ children: t, custom: a, initial: i = !0, onExitComplete: s, presenceAffectsLayout: o = !0, mode: u = "sync", propagate: f = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = jz(f), w = y.useMemo(() => jb(t), [t]), S = f && !b ? [] : w.map(Wo), j = y.useRef(!0), N = y.useRef(w), C = Ph(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [A, O] = y.useState(w), [R, V] = y.useState(w);
  m1(() => {
    j.current = !1, N.current = w;
    for (let M = 0; M < R.length; M++) {
      const H = Wo(R[M]);
      S.includes(H) ? (C.delete(H), T.current.delete(H)) : C.get(H) !== !0 && C.set(H, !1);
    }
  }, [R, S.length, S.join("-")]);
  const X = [];
  if (w !== A) {
    let M = [...w];
    for (let H = 0; H < R.length; H++) {
      const z = R[H], F = Wo(z);
      S.includes(F) || (M.splice(H, 0, z), X.push(z));
    }
    return u === "wait" && X.length && (M = X), V(jb(M)), O(w), null;
  }
  const { forceRender: ie } = y.useContext(h1);
  return c.jsx(c.Fragment, { children: R.map((M) => {
    const H = Wo(M), z = f && !b ? !1 : w === R || S.includes(H), F = () => {
      if (T.current.has(H))
        return;
      if (C.has(H))
        T.current.add(H), C.set(H, !0);
      else
        return;
      let W = !0;
      C.forEach((K) => {
        K || (W = !1);
      }), W && (ie?.(), V(N.current), f && v?.(), s && s());
    };
    return c.jsx(Sz, { isPresent: z, initial: !j.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: u, root: p, onExitComplete: z ? void 0 : F, anchorX: m, anchorY: g, children: M }, H);
  }) });
}, fm = y.createContext({ strict: !1 }), Eb = {
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
let Nb = !1;
function Ez() {
  if (Nb)
    return;
  const t = {};
  for (const a in Eb)
    t[a] = {
      isEnabled: (i) => Eb[a].some((s) => !!i[s])
    };
  pS(t), Nb = !0;
}
function TS() {
  return Ez(), G5();
}
function yh(t) {
  const a = TS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  pS(a);
}
function hm({ children: t, features: a, strict: i = !1 }) {
  const [, s] = y.useState(!Lf(a)), o = y.useRef(void 0);
  if (!Lf(a)) {
    const { renderer: u, ...f } = a;
    o.current = u, yh(f);
  }
  return y.useEffect(() => {
    Lf(a) && a().then(({ renderer: u, ...f }) => {
      yh(f), o.current = u, s(!0);
    });
  }, []), c.jsx(fm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function Lf(t) {
  return typeof t == "function";
}
const Nz = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Nz.has(t);
}
let CS = (t) => !Mc(t);
function Tz(t) {
  typeof t == "function" && (CS = (a) => a.startsWith("on") ? !Mc(a) : t(a));
}
try {
  Tz(require("@emotion/is-prop-valid").default);
} catch {
}
function Cz(t, a, i) {
  const s = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || pn(t[o]) || (CS(o) || i === !0 && Mc(o) || !a && !Mc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (s[o] = t[o]);
  return s;
}
const Pc = /* @__PURE__ */ y.createContext({});
function Rz(t, a) {
  if (Gc(t)) {
    const { initial: i, animate: s } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function _z(t) {
  const { initial: a, animate: i } = Rz(t, y.useContext(Pc));
  return y.useMemo(() => ({ initial: a, animate: i }), [Tb(a), Tb(i)]);
}
function Tb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const mm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function RS(t, a, i) {
  for (const s in a)
    !pn(a[s]) && !yS(s, i) && (t[s] = a[s]);
}
function Mz({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = mm();
    return cm(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function Az(t, a) {
  const i = t.style || {}, s = {};
  return RS(s, i, t), Object.assign(s, Mz(t, a)), s;
}
function Dz(t, a) {
  const i = {}, s = Az(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = s, i;
}
const _S = () => ({
  ...mm(),
  attrs: {}
});
function kz(t, a, i, s) {
  const o = y.useMemo(() => {
    const u = _S();
    return bS(u, a, SS(s), t.transformTemplate, t.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [a]);
  if (t.style) {
    const u = {};
    RS(u, t.style, t), o.style = { ...u, ...o.style };
  }
  return o;
}
const zz = [
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
function pm(t) {
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
      !!(zz.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Oz(t, a, i, { latestValues: s }, o, u = !1, f) {
  const g = (f ?? pm(t) ? kz : Dz)(a, s, o, t), p = Cz(a, typeof t == "string", u), b = t !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, w = y.useMemo(() => pn(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: w
  });
}
function Lz({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, s, o) {
  return {
    latestValues: Uz(i, s, o, t),
    renderState: a()
  };
}
function Uz(t, a, i, s) {
  const o = {}, u = s(t, {});
  for (const w in u)
    o[w] = vz(u[w]);
  let { initial: f, animate: m } = t;
  const g = Gc(t), p = hS(t);
  a && p && !g && t.inherit !== !1 && (f === void 0 && (f = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || f === !1;
  const v = b ? m : f;
  if (v && typeof v != "boolean" && !Yc(v)) {
    const w = Array.isArray(v) ? v : [v];
    for (let S = 0; S < w.length; S++) {
      const j = am(t, w[S]);
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
const MS = (t) => (a, i) => {
  const s = y.useContext(Pc), o = y.useContext(qc), u = () => Lz(t, a, s, o);
  return i ? u() : Ph(u);
}, $z = /* @__PURE__ */ MS({
  scrapeMotionValuesFromProps: um,
  createRenderState: mm
}), Bz = /* @__PURE__ */ MS({
  scrapeMotionValuesFromProps: wS,
  createRenderState: _S
}), Vz = Symbol.for("motionComponentSymbol");
function Hz(t, a, i) {
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
        const m = f(u);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : f(u);
    else f && (f.current = u);
    a && (u ? a.mount(u) : a.unmount());
  }, [a]);
}
const qz = y.createContext({});
function Iz(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Fz(t, a, i, s, o, u) {
  const { visualElement: f } = y.useContext(Pc), m = y.useContext(fm), g = y.useContext(qc), p = y.useContext(dm), b = p.reducedMotion, v = p.skipAnimations, w = y.useRef(null), S = y.useRef(!1);
  s = s || m.renderer, !w.current && s && (w.current = s(t, {
    visualState: a,
    parent: f,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: u
  }), S.current && w.current && (w.current.manuallyAnimateOnMount = !0));
  const j = w.current, N = y.useContext(qz);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && Yz(w.current, i, o, N);
  const C = y.useRef(!1);
  y.useInsertionEffect(() => {
    j && C.current && j.update(i, g);
  });
  const T = i[aS], A = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return m1(() => {
    S.current = !0, j && (C.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), A.current && j.animationState && j.animationState.animateChanges());
  }), y.useEffect(() => {
    j && (!A.current && j.animationState && j.animationState.animateChanges(), A.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), A.current = !1), j.enteringChildren = void 0);
  }), j;
}
function Yz(t, a, i, s) {
  const { layoutId: o, layout: u, drag: f, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : AS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: u,
    alwaysMeasureLayout: !!f || m && Iz(m),
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
    layoutRoot: p,
    layoutAnchor: b
  });
}
function AS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : AS(t.parent);
}
function Uf(t, { forwardMotionProps: a = !1, type: i } = {}, s, o) {
  s && yh(s);
  const u = i ? i === "svg" : pm(t), f = u ? Bz : $z;
  function m(p, b) {
    let v;
    const w = {
      ...y.useContext(dm),
      ...p,
      layoutId: Gz(p)
    }, { isStatic: S } = w, j = _z(p), N = f(p, S);
    if (!S && typeof window < "u") {
      Pz();
      const C = Kz(w);
      v = C.MeasureLayout, j.visualElement = Fz(t, N, w, o, C.ProjectionNode, u);
    }
    return c.jsxs(Pc.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...w }) : null, Oz(t, p, Hz(N, j.visualElement, b), N, S, a, u)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[Vz] = t, g;
}
function Gz({ layoutId: t }) {
  const a = y.useContext(h1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function Pz(t, a) {
  y.useContext(fm).strict;
}
function Kz(t) {
  const a = TS(), { drag: i, layout: s } = a;
  if (!i && !s)
    return {};
  const o = { ...i, ...s };
  return {
    MeasureLayout: i?.isEnabled(t) || s?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Xz(t, a) {
  if (typeof Proxy > "u")
    return Uf;
  const i = /* @__PURE__ */ new Map(), s = (u, f) => Uf(u, f, t, a), o = (u, f) => s(u, f);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, f) => f === "create" ? s : (i.has(f) || i.set(f, Uf(f, void 0, t, a)), i.get(f))
  });
}
const vm = /* @__PURE__ */ Xz(), Qz = (t, a) => a.isSVG ?? pm(t) ? new cz(a) : new az(a, {
  allowProjection: t !== y.Fragment
});
class Zz extends ss {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = mz(a));
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
let Jz = 0;
class Wz extends ss {
  constructor() {
    super(...arguments), this.id = Jz++, this.isExitComplete = !1;
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
          const m = Zr(this.node, u, f);
          if (m) {
            const { transition: g, transitionEnd: p, ...b } = m;
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
const eO = {
  animation: {
    Feature: Zz
  },
  exit: {
    Feature: Wz
  }
};
function DS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Cb(t, a, i) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, u = s[o];
  u && ta.postRender(() => u(a, DS(a)));
}
class tO extends ss {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = O5(a, (i, s) => (Cb(this.node, s, "Start"), (o) => Cb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class nO extends ss {
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
    this.unmount = Ic(Sb(this.node.current, "focus", () => this.onFocus()), Sb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Rb(t, a, i) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), u = s[o];
  u && ta.postRender(() => u(a, DS(a)));
}
class aO extends ss {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: s } = this.node.props;
    this.unmount = V5(a, (o, u) => (Rb(this.node, u, "Start"), (f, { success: m }) => Rb(this.node, f, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const bh = /* @__PURE__ */ new WeakMap(), $f = /* @__PURE__ */ new WeakMap(), rO = (t) => {
  const a = bh.get(t.target);
  a && a(t);
}, iO = (t) => {
  t.forEach(rO);
};
function sO({ root: t, ...a }) {
  const i = t || document;
  $f.has(i) || $f.set(i, {});
  const s = $f.get(i), o = JSON.stringify(a);
  return s[o] || (s[o] = new IntersectionObserver(iO, { root: t, ...a })), s[o];
}
function lO(t, a, i) {
  const s = sO(a);
  return bh.set(t, i), s.observe(t), () => {
    bh.delete(t), s.unobserve(t);
  };
}
const oO = {
  some: 0,
  all: 1
};
class cO extends ss {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: s, amount: o = "some", once: u } = a, f = {
      root: i ? i.current : void 0,
      rootMargin: s,
      threshold: typeof o == "number" ? o : oO[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, u && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), w = p ? b : v;
      w && w(g);
    };
    this.stopObserver = lO(this.node.current, f, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(uO(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function uO({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const dO = {
  inView: {
    Feature: cO
  },
  tap: {
    Feature: aO
  },
  focus: {
    Feature: nO
  },
  hover: {
    Feature: tO
  }
}, gm = {
  renderer: Qz,
  ...eO,
  ...dO
};
function fO() {
  !om.current && mS();
  const [t] = y.useState(Rc.current);
  return t;
}
const xh = "emotion-tts:trigger-generate", Sh = "emotion-tts:run-state";
function hO() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(xh));
}
function mO(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Sh, { detail: t }));
}
function pO(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(xh, t), () => window.removeEventListener(xh, t));
}
function kS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const s = i.detail;
    s && t(s);
  };
  return window.addEventListener(Sh, a), () => window.removeEventListener(Sh, a);
}
var vO = "wksjad0", gO = "wksjad1", yO = "wksjad2", bO = "wksjad3", xO = "wksjad4", SO = "wksjad5", wO = "wksjad6", jO = "wksjad7", EO = "wksjad8", NO = "wksjad9", TO = "wksjada", CO = "wksjadb", RO = "wksjadc", _O = "wksjadd", MO = "wksjade", AO = "wksjadf", DO = "wksjadg", Bf = "wksjadh", kO = "wksjadi", zO = "wksjadj", OO = "wksjadk", LO = "wksjadl", UO = "wksjadm", $O = "wksjadn";
const wh = 5, BO = 5e-3;
function zS(t, a = "") {
  return `${xa}/deployments/${t}/artifacts${a}`;
}
function VO(t) {
  const [a, i] = y.useState([]), [s, o] = y.useState(!1), [u, f] = y.useState(null), [m, g] = y.useState(0), p = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((w) => w + 1), []);
  return y.useEffect(() => {
    p.current?.abort();
    const w = new AbortController();
    return p.current = w, o(!0), f(null), fetch(`${zS(t)}?limit=${wh}`, {
      headers: { accept: "application/json" },
      signal: w.signal
    }).then(async (S) => {
      if (!S.ok)
        throw new Error(`HTTP ${S.status}`);
      const j = await S.json();
      w.signal.aborted || i(j.artifacts.slice(0, wh));
    }).catch((S) => {
      if (w.signal.aborted) return;
      const j = S instanceof Error ? S.message : "fetch failed";
      f(j);
    }).finally(() => {
      w.signal.aborted || o(!1);
    }), () => w.abort();
  }, [t, m]), y.useEffect(() => kS((w) => {
    const S = b.current;
    b.current = w.busy, S && !w.busy && v();
  }), [v]), { rows: a, loading: s, error: u, refetch: v, tick: m };
}
function HO(t, a) {
  const [i, s] = y.useState(() => /* @__PURE__ */ new Map());
  return y.useEffect(() => {
    let o = !1;
    return Xi(t).then(({ voiceAssets: u }) => {
      if (o) return;
      const f = /* @__PURE__ */ new Map();
      for (const m of u)
        f.set(m.voiceAssetId, m.displayName);
      s(f);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), i;
}
function qO({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: i, loading: s, error: o, refetch: u, tick: f } = VO(t), m = HO(t, f), [g, p] = y.useState(null), b = fO(), v = y.useCallback(() => {
    p(null), u();
  }, [u]), w = i;
  return !s && !o && w.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: vO, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: gO, children: [
      /* @__PURE__ */ c.jsx("span", { className: yO, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: bO, children: [
        /* @__PURE__ */ c.jsx("span", { className: xO, children: w.length }),
        /* @__PURE__ */ c.jsxs("span", { className: SO, children: [
          "last ",
          wh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: wO,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: $O, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(hm, { features: gm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: jO, children: /* @__PURE__ */ c.jsx(NS, { initial: !1, children: w.map((S) => {
      const j = g === S.utteranceId, N = zS(
        t,
        `/${S.utteranceId}/download`
      ), C = S.voiceAssetId ? m.get(S.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        vm.li,
        {
          className: EO,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: NO, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: TO,
                  onClick: () => p(
                    (T) => T === S.utteranceId ? null : S.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: CO, children: [
                /* @__PURE__ */ c.jsxs("div", { className: RO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: _O, children: S.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: MO, title: S.text, children: S.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: AO, children: [
                  /* @__PURE__ */ c.jsx("span", { className: DO, children: FO(S.finishedAt) }),
                  C && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Bf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: kO, children: C })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Bf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: zO, children: IO(S.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > BO && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Bf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: OO, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: LO,
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
                className: UO,
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
function IO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), s = a % 60;
  return i > 0 ? `${i}:${s.toString().padStart(2, "0")}` : `${s}s`;
}
function FO(t) {
  if (!t) return "—";
  const i = Math.floor(Date.now() / 1e3) - t;
  return i < 0 ? "just now" : i < 60 ? `${i}s ago` : i < 3600 ? `${Math.floor(i / 60)}m ago` : i < 86400 ? `${Math.floor(i / 3600)}h ago` : i < 604800 ? `${Math.floor(i / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function YO(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function OS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function GO() {
  if (typeof window > "u") return;
  const t = OS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function LS(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const s = OS(), o = () => {
      const f = s.reduce((m, g) => {
        const p = YO(g);
        return p > m ? p : m;
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
const US = 360;
var PO = "_1s59p180", KO = "_1s59p181", XO = "_1s59p182", QO = "_1s59p183", ZO = "_1s59p184", JO = "_1s59p185", WO = "_1s59p186", e4 = "_1s59p188", t4 = "_1s59p189", _b = "_1s59p18a", n4 = "_1s59p18c", a4 = "_1s59p18d", r4 = "_1s59p18e", i4 = "_1s59p18f", s4 = "_1s59p18g", l4 = "_1s59p18i";
function o4(t) {
  const a = es(), [i, s] = y.useState("idle"), [o, u] = y.useState(null), [f, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), w = y.useRef(null);
  y.useEffect(() => () => {
    w.current?.();
  }, []), y.useEffect(() => {
    mO({ busy: i === "starting" || i === "running" });
  }, [i]);
  const S = y.useCallback(
    (Y) => {
      const ce = Y.status;
      (ce === "completed" || ce === "partial") && on.success(
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
    s("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const Y = await HT(t.deploymentId, t.createPayload);
      u(Y.runId), s("running"), w.current?.(), w.current = Hy(
        t.deploymentId,
        Y.runId,
        (ce) => Mb(
          ce,
          m,
          s,
          (_) => {
            v(_), S(_);
          },
          t.deploymentId,
          Y.runId
        ),
        () => s("error")
      );
    } catch (Y) {
      s("error"), p(Vf(Y));
    }
  }, [t.deploymentId, t.createPayload, S]);
  y.useEffect(() => pO(() => {
    (i === "idle" || i === "terminal" || i === "error") && j();
  }), [i, j]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await qT(t.deploymentId, o);
      } catch (Y) {
        p(Vf(Y));
      }
  }, [t.deploymentId, o]), C = Array.from(f.values()).sort((Y, ce) => Y.globalIndex - ce.globalIndex), T = i === "starting" || i === "running", A = b?.status === "partial", O = C.filter((Y) => Y.status === "running").length, R = C.filter((Y) => Y.status === "completed").length, V = i === "starting" || i === "running" || C.length > 0, X = C.filter((Y) => Y.status === "failed"), ie = (() => {
    if (i !== "terminal" || X.length === 0) return null;
    const Y = /* @__PURE__ */ new Map();
    for (const ae of X) {
      const G = ae.failureCategory ?? "unknown";
      Y.set(G, (Y.get(G) ?? 0) + 1);
    }
    let ce = "unknown", _ = 0;
    for (const [ae, G] of Y)
      G > _ && (ce = ae, _ = G);
    const te = C.length;
    return { category: ce, count: _, total: te };
  })(), M = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, H = "Check the run detail page for the per-segment error log.", z = g?.toLowerCase().includes("unmapped") ?? !1, F = t.diagnostics ?? [], W = F.find((Y) => Y.status === "fail"), K = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", le = !t.canGenerate || T || !!W, ne = i === "starting" || i === "running", k = ne ? "running" : le ? "blocked" : "idle", q = !LS(US) || ne;
  return /* @__PURE__ */ c.jsxs("div", { className: PO, children: [
    /* @__PURE__ */ c.jsxs("div", { className: KO, children: [
      /* @__PURE__ */ c.jsxs("div", { className: QO, children: [
        /* @__PURE__ */ c.jsxs("span", { className: ZO, children: [
          /* @__PURE__ */ c.jsx("span", { className: XO, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          V && /* @__PURE__ */ c.jsxs("span", { className: s4, children: [
            /* @__PURE__ */ c.jsx("span", { className: l4, "aria-hidden": "true" }),
            O > 0 ? `${O} in flight` : `${R} done`
          ] })
        ] }),
        F.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: JO, "aria-label": "Pre-flight checks", children: F.map((Y) => /* @__PURE__ */ c.jsxs("li", { className: WO, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: e4,
              "data-status": Y.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: t4, children: Y.label }),
          Y.detail && /* @__PURE__ */ c.jsx("span", { className: _b, children: Y.detail })
        ] }, Y.label)) }) : /* @__PURE__ */ c.jsx("span", { className: _b, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: n4, "data-state": k, children: [
        q ? /* @__PURE__ */ c.jsxs(
          Fe,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: le,
            loading: ne,
            children: [
              !ne && /* @__PURE__ */ c.jsx("span", { className: a4, "aria-hidden": "true", children: "▶" }),
              K
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: r4, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: i4, children: "↑" })
        ] }),
        T && /* @__PURE__ */ c.jsx(
          Fe,
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
          /* @__PURE__ */ c.jsx("span", { children: g }),
          z && /* @__PURE__ */ c.jsx(
            Fe,
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
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: M[ie.category] ?? H })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Jx.secondary} ${Wx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    A && b && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        Fe,
        {
          variant: "secondary",
          disabled: !!W,
          onClick: async () => {
            try {
              const Y = await Xx(t.deploymentId, b.runId);
              u(Y.runId), m(/* @__PURE__ */ new Map()), v(null), s("running"), w.current?.(), w.current = Hy(
                t.deploymentId,
                Y.runId,
                (ce) => Mb(ce, m, s, v, t.deploymentId, Y.runId),
                () => s("error")
              );
            } catch (Y) {
              p(Vf(Y)), s("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: _R, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: mr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: C.map((Y) => /* @__PURE__ */ c.jsxs("tr", { className: MR, children: [
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: /* @__PURE__ */ c.jsx(Jr, { tone: c4(Y.status), children: Y.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.durationMs ? `${Y.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: mr, children: Y.failureCategory ?? "" })
      ] }, Y.globalIndex)) })
    ] })
  ] });
}
async function Mb(t, a, i, s, o, u) {
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
      i("terminal");
      try {
        const f = await qh(o, u);
        s(f);
      } catch {
      }
      return;
  }
}
function c4(t) {
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
function Vf(t) {
  return t instanceof ts || t instanceof Error ? t.message : "unknown error";
}
var u4 = "xq3iim0", d4 = "xq3iim1", f4 = "xq3iim2", h4 = "xq3iim3", m4 = "xq3iim4", p4 = "xq3iim5", v4 = "xq3iim6", g4 = "xq3iim7", y4 = "xq3iim8", b4 = "xq3iim9", x4 = "xq3iima", S4 = "xq3iimb", w4 = "xq3iimc", j4 = "xq3iimd", E4 = "xq3iime", N4 = "xq3iimf", T4 = "xq3iimg", C4 = "xq3iimh", R4 = "xq3iimi", _4 = "xq3iimj", M4 = "xq3iimk", Ab = "xq3iiml";
function A4({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [s, o] = y.useState([]), [u, f] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, w] = y.useState(null), [S, j] = y.useState(!1), N = y.useRef(null), C = y.useRef(null);
  y.useEffect(() => {
    let R = !1;
    return g(!0), Xi(t).then(({ voiceAssets: V }) => {
      R || o(V);
    }).catch((V) => {
      R || w(V instanceof Error ? V.message : "Failed to load voices");
    }).finally(() => {
      R || g(!1);
    }), () => {
      R = !0;
    };
  }, [t]), y.useEffect(() => {
    if (!S) return;
    const R = (X) => {
      N.current && (X.target instanceof Node && N.current.contains(X.target) || j(!1));
    }, V = (X) => {
      X.key === "Escape" && (j(!1), C.current?.focus());
    };
    return document.addEventListener("mousedown", R), document.addEventListener("keydown", V), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("keydown", V);
    };
  }, [S]);
  const T = y.useCallback(
    async (R) => {
      b(!0), w(null);
      const V = u, X = R === u ? null : R;
      f(X), j(!1);
      try {
        await UT(t, X), i?.(X);
      } catch (ie) {
        f(V), w(ie instanceof Error ? ie.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, i, u]
  ), A = y.useMemo(
    () => s.find((R) => R.voiceAssetId === u) ?? null,
    [s, u]
  ), O = y.useMemo(() => {
    const R = [], V = [];
    for (const X of s)
      X.kind === "speaker" || X.kind === "mixed" ? R.push(X) : V.push(X);
    return { uploaded: R, other: V };
  }, [s]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: Ab, children: "Loading voices…" }) : s.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Ab, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: N, className: u4, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: C,
        type: "button",
        className: `${d4} ${S ? f4 : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": S,
        disabled: p,
        onClick: () => j((R) => !R),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: h4, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: m4, children: [
            /* @__PURE__ */ c.jsx("span", { className: p4, children: A ? A.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: v4, children: A ? $S(A) : `${s.length} voice${s.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: g4, "aria-hidden": "true", children: D4.map((R, V) => /* @__PURE__ */ c.jsx("i", { style: { height: `${R * 100}%` } }, V)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${y4}`, "aria-hidden": "true", children: S ? "expand_less" : "expand_more" })
        ]
      }
    ),
    S && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: b4,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: x4, children: /* @__PURE__ */ c.jsx("span", { className: S4, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: w4, role: "alert", children: v }),
          O.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Db, { label: "Uploaded", children: O.uploaded.map((R) => /* @__PURE__ */ c.jsx(
            kb,
            {
              voice: R,
              selected: u === R.voiceAssetId,
              onSelect: () => void T(R.voiceAssetId)
            },
            R.voiceAssetId
          )) }),
          O.other.length > 0 && /* @__PURE__ */ c.jsx(Db, { label: "Other", children: O.other.map((R) => /* @__PURE__ */ c.jsx(
            kb,
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
function Db({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: j4, children: [
    /* @__PURE__ */ c.jsx("div", { className: E4, children: t }),
    a
  ] });
}
function kb({ voice: t, selected: a, onSelect: i }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${N4} ${a ? T4 : ""}`,
      onClick: i,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: C4, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: R4, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: _4, children: $S(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${M4}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const D4 = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function $S(t) {
  const a = [];
  return t.durationMs != null && a.push(k4(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function k4(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), s = Math.round(a - i * 60);
  return `${i}:${s.toString().padStart(2, "0")}`;
}
const zb = [
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
function z4(t) {
  const a = es(), i = y.useRef(null), { tokens: s, attributions: o, unresolved: u, predictedFilenames: f, characterColor: m } = y.useMemo(
    () => L4(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (b) => {
    const v = i.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? ER : SR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: i, className: wR, "aria-hidden": "true", children: s.map((b, v) => O4(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? NR : jR,
          value: t.value,
          onChange: (b) => t.onChange(b.currentTarget.value),
          onScroll: p ? void 0 : g,
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
        Fe,
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
      /* @__PURE__ */ c.jsx("span", { className: Yi, children: "Parsed lines" }),
      /* @__PURE__ */ c.jsx("ul", { className: s0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
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
      /* @__PURE__ */ c.jsx("span", { className: Yi, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: s0, children: f.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function O4(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: i0, children: t.raw }),
      `
`
    ] }, a);
  const s = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? r0 : `${r0} ${TR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: s }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: CR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: i0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function L4(t, a, i) {
  const s = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], u = [], f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
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
    let A = "Narrator", O = N, R, V = !1;
    if (T?.groups) {
      V = !0;
      const H = (T.groups.body ?? "").trim(), z = (T.groups.rest ?? "").trim();
      A = ((H.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", R = (H.includes("|") ? H.slice(H.indexOf("|") + 1) : "").trim() || void 0, O = z;
    }
    w += 1;
    const X = A.toLowerCase(), ie = (m.get(X) ?? 0) + 1;
    m.set(X, ie);
    const M = A === "Narrator" || i.has(X);
    if (M || f.add(A), A !== "Narrator" && !p.has(X) && (p.set(X, zb[b % zb.length] ?? "currentColor"), b += 1), V) {
      const H = { kind: "character", raw: S, character: A, text: O, hasMapping: M };
      R !== void 0 && (H.override = R), o.push(H);
    } else
      o.push({ kind: "narrator", raw: S });
    u.push({ lineNumber: C, character: A, text: O, hasMapping: M }), g.push(
      `${w.toString().padStart(3, "0")}_${U4(A)}_${ie.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: u,
    unresolved: Array.from(f),
    predictedFilenames: g,
    characterColor: p
  };
}
function U4(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
const Ob = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
], BS = 1e-3;
function $4(t) {
  return t.replace(/[\[\]|\r\n]/g, "").trim();
}
function B4() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? `row_${crypto.randomUUID()}` : `row_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}
function V4(t) {
  return t.replace(/[\r\n]/g, " ").trim();
}
function VS(t) {
  return Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t;
}
function HS(t) {
  const a = Math.round(t * 1e3) / 1e3;
  return Number.isInteger(a) ? a.toFixed(1) : String(a);
}
function H4(t) {
  const a = [];
  for (let i = 0; i < Ob.length; i += 1) {
    const s = t[i];
    typeof s == "number" && (Math.abs(s) < BS || a.push(`${Ob[i]}=${HS(VS(s))}`));
  }
  return a.length === 0 ? null : a.join(",");
}
function q4(t, a) {
  const i = $4(t.character) || "Narrator", s = V4(t.text);
  if (!s) return null;
  const o = [];
  if (t.presetId) {
    const m = a.get(t.presetId);
    if (m) {
      const g = H4(m.vector);
      g && o.push(`emotion_vector:${g}`);
    }
  }
  const u = VS(t.alpha);
  return Math.abs(u - 1) >= BS && o.push(`emotion_alpha:${HS(u)}`), `${o.length > 0 ? `[${i}|${o.join("|")}]` : `[${i}]`} ${s}`;
}
function qS(t, a) {
  const i = /* @__PURE__ */ new Map();
  for (const o of a) i.set(o.presetId, o);
  const s = [];
  for (const o of t) {
    const u = q4(o, i);
    u && s.push(u);
  }
  return s.join(`
`);
}
function Yr() {
  return {
    id: B4(),
    character: "",
    presetId: null,
    alpha: 1,
    text: ""
  };
}
var I4 = "_1827s3t2", F4 = "_1827s3t3", Y4 = "_1827s3t4", G4 = "_1827s3t5", P4 = "_1827s3t6", K4 = "_1827s3t7", X4 = "_1827s3t8", Q4 = "_1827s3t9", Z4 = "_1827s3ta", J4 = "_1827s3tb", W4 = "_1827s3td _1827s3tc", eL = "_1827s3te _1827s3tc", tL = "_1827s3tf", nL = "_1827s3tg", aL = "_1827s3th", rL = "_1827s3ti _1827s3tc", iL = "_1827s3tj", sL = "_1827s3tk", lL = "_1827s3tl", oL = "_1827s3tm", cL = "_1827s3tn", uL = "_1827s3to", dL = "_1827s3tp", fL = "_1827s3tq", hL = "_1827s3tr", mL = "_1827s3ts", pL = "_1827s3tt", vL = "_1827s3tu";
function gL({
  rows: t,
  onRowsChange: a,
  presets: i,
  mappingsByLower: s
}) {
  const o = y.useId(), u = y.useId(), f = y.useId(), m = y.useRef(null), g = y.useRef(/* @__PURE__ */ new Map()), p = y.useRef(/* @__PURE__ */ new Map()), b = y.useRef(/* @__PURE__ */ new Map()), [v, w] = y.useState(null), [S, j] = y.useState(!1), N = y.useRef(null), C = y.useRef(null), [T, A] = y.useState(null), [O, R] = y.useState(null), [V, X] = y.useState("");
  y.useEffect(() => {
    v && (v.kind === "addBtn" ? m.current?.focus() : v.kind === "text" && v.rowId ? g.current.get(v.rowId)?.focus() : v.kind === "remove" && v.rowId ? p.current.get(v.rowId)?.focus() : v.kind === "character" && v.rowId ? b.current.get(v.rowId)?.focus() : v.kind === "unmappedFirstItem" && C.current?.querySelector("button")?.focus(), w(null));
  }, [v]);
  const ie = t.filter(($) => $.text.trim().length > 0).length, M = y.useMemo(() => {
    const $ = /* @__PURE__ */ new Map();
    for (const ee of t) {
      const ue = ee.character.trim(), pe = ue.toLowerCase();
      !pe || pe === "narrator" || s.has(pe) || $.has(pe) || $.set(pe, ue);
    }
    return Array.from($.values()).sort((ee, ue) => ee.localeCompare(ue));
  }, [t, s]), H = M.length, z = y.useRef(H), [F, W] = y.useState(0);
  y.useEffect(() => {
    H > z.current && W(($) => $ + 1), z.current = H;
  }, [H]), y.useEffect(() => {
    if (!S) return;
    w({ kind: "unmappedFirstItem" });
    const $ = (ue) => {
      if (!C.current || !N.current) return;
      const pe = ue.target;
      C.current.contains(pe) || N.current.contains(pe) || j(!1);
    }, ee = (ue) => {
      ue.key === "Escape" && (j(!1), N.current?.focus());
    };
    return document.addEventListener("mousedown", $), document.addEventListener("keydown", ee), () => {
      document.removeEventListener("mousedown", $), document.removeEventListener("keydown", ee);
    };
  }, [S]);
  const K = y.useMemo(() => {
    const $ = /* @__PURE__ */ new Set();
    return s.forEach((ee) => $.add(ee.characterName)), Array.from($).sort((ee, ue) => ee.localeCompare(ue));
  }, [s]), le = y.useCallback(
    ($, ee) => {
      a(t.map((ue) => ue.id === $ ? { ...ue, ...ee } : ue));
    },
    [t, a]
  ), ne = y.useRef(t);
  y.useEffect(() => {
    ne.current = t;
  }, [t]);
  const k = y.useCallback(
    ($) => {
      const ee = t.findIndex((tt) => tt.id === $);
      if (ee < 0) return;
      const ue = t[ee];
      if (!ue) return;
      const pe = ee > 0 ? t[ee - 1]?.id ?? null : null, Ce = t.filter((tt) => tt.id !== $);
      a(Ce);
      const ot = ue.character.trim() || `Line ${ee + 1}`;
      on(`Removed ${ot}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const tt = ne.current;
            if (tt.some((Nt) => Nt.id === ue.id)) return;
            const Be = [...tt], $e = pe ? tt.findIndex((Nt) => Nt.id === pe) : -1, Zt = $e >= 0 ? $e + 1 : 0;
            Be.splice(Zt, 0, ue), a(Be);
          }
        },
        duration: 5e3
      });
      const je = `Removed line ${ee + 1}, now ${Ce.length} ${Ce.length === 1 ? "line" : "lines"}`;
      if (X((tt) => tt === je ? `${je}​` : je), Ce.length === 0)
        w({ kind: "addBtn" });
      else {
        const tt = ee < Ce.length ? ee : Ce.length - 1, Be = Ce[tt];
        w(Be ? { kind: "remove", rowId: Be.id } : { kind: "addBtn" });
      }
    },
    [t, a]
  ), U = y.useCallback(
    ($) => {
      const ee = Yr();
      let ue;
      if ($ === null)
        ue = [...t, ee];
      else {
        const pe = t.findIndex((Ce) => Ce.id === $);
        ue = pe < 0 ? [...t, ee] : [...t.slice(0, pe + 1), ee, ...t.slice(pe + 1)];
      }
      a(ue), w({ kind: "text", rowId: ee.id });
    },
    [t, a]
  ), q = y.useCallback(
    ($, ee) => {
      const ue = t.findIndex(($e) => $e.id === $);
      if (ue < 0) return;
      const pe = ue + ee;
      if (pe < 0 || pe >= t.length) return;
      const Ce = [...t], ot = Ce[ue], je = Ce[pe];
      if (!ot || !je) return;
      Ce[ue] = je, Ce[pe] = ot, a(Ce);
      const Be = `Moved ${ot.character.trim() || `Line ${ue + 1}`} to position ${pe + 1} of ${Ce.length}`;
      X(($e) => $e === Be ? `${Be}​` : Be);
    },
    [t, a]
  ), Y = y.useCallback(
    ($, ee) => {
      $.key === "Enter" && !$.shiftKey ? ($.preventDefault(), U(ee)) : $.altKey && $.key === "ArrowUp" ? ($.preventDefault(), q(ee, -1)) : $.altKey && $.key === "ArrowDown" && ($.preventDefault(), q(ee, 1));
    },
    [U, q]
  ), ce = y.useCallback(($, ee) => {
    A(ee), $.dataTransfer.effectAllowed = "move", $.dataTransfer.setData("text/plain", ee);
  }, []), _ = y.useCallback(($, ee) => {
    T && ($.preventDefault(), $.dataTransfer.dropEffect = "move", O !== ee && R(ee));
  }, [T, O]), te = y.useCallback(
    ($, ee) => {
      $.preventDefault();
      const ue = T ?? $.dataTransfer.getData("text/plain");
      if (A(null), R(null), !ue || ue === ee) return;
      const pe = t.findIndex(($e) => $e.id === ue), Ce = t.findIndex(($e) => $e.id === ee);
      if (pe < 0 || Ce < 0) return;
      const ot = [...t], [je] = ot.splice(pe, 1);
      if (!je) return;
      ot.splice(Ce, 0, je), a(ot);
      const Be = `Moved ${je.character.trim() || `Line ${pe + 1}`} to position ${Ce + 1} of ${ot.length}`;
      X(($e) => $e === Be ? `${Be}​` : Be);
    },
    [t, a, T]
  ), ae = y.useCallback(() => {
    A(null), R(null);
  }, []), G = y.useCallback(
    ($) => {
      const ee = t.find((ue) => ue.character.trim().toLowerCase() === $.toLowerCase());
      ee && w({ kind: "character", rowId: ee.id }), j(!1);
    },
    [t]
  );
  return /* @__PURE__ */ c.jsxs("section", { className: I4, "aria-labelledby": u, children: [
    /* @__PURE__ */ c.jsxs("header", { className: F4, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Y4, id: u, children: [
        "02 / Per-character lines",
        t.length > 1 && /* @__PURE__ */ c.jsx("span", { className: pL, children: "· Alt+↑↓ to reorder" })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: G4, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: P4, children: ie.toString().padStart(2, "0") }),
        " lines",
        H > 0 && /* @__PURE__ */ c.jsxs("span", { className: sL, children: [
          /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: N,
              type: "button",
              className: vL,
              "aria-haspopup": "dialog",
              "aria-expanded": S,
              "aria-controls": f,
              title: "Click to see unmapped characters",
              onClick: () => j(($) => !$),
              children: [
                "⚠ ",
                H,
                " unmapped"
              ]
            },
            F
          ),
          S && /* @__PURE__ */ c.jsxs(
            "div",
            {
              ref: C,
              id: f,
              role: "dialog",
              "aria-label": "Unmapped characters",
              className: lL,
              children: [
                /* @__PURE__ */ c.jsx("p", { className: oL, children: "These characters have no voice mapping. Click a name to jump to its row." }),
                /* @__PURE__ */ c.jsx("ul", { className: cL, children: M.map(($) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: uL,
                    onClick: () => G($),
                    children: $
                  }
                ) }, $)) })
              ]
            }
          )
        ] })
      ] })
    ] }),
    t.length === 0 ? /* @__PURE__ */ c.jsx("p", { className: hL, children: "No lines yet — add a character line to start. Each row produces one utterance." }) : /* @__PURE__ */ c.jsx("ul", { className: K4, children: t.map(($, ee) => {
      const ue = $.character.trim() || `line ${ee + 1}`, pe = s.has($.character.trim().toLowerCase()), Ce = T === $.id, ot = O === $.id && T !== $.id;
      return /* @__PURE__ */ c.jsxs(
        "li",
        {
          className: X4,
          "data-mapped": pe || void 0,
          "data-dragging": Ce || void 0,
          "data-drag-over": ot || void 0,
          onDragOver: (je) => _(je, $.id),
          onDrop: (je) => te(je, $.id),
          onDragEnd: ae,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Q4,
                draggable: !0,
                "aria-label": `Drag to reorder ${ue}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`,
                title: "Drag to reorder · Alt+↑ / Alt+↓",
                onDragStart: (je) => ce(je, $.id),
                onKeyDown: (je) => {
                  je.altKey && je.key === "ArrowUp" ? (je.preventDefault(), q($.id, -1)) : je.altKey && je.key === "ArrowDown" && (je.preventDefault(), q($.id, 1));
                },
                children: "⋮⋮"
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: J4, "aria-hidden": "true", children: (ee + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: (je) => {
                  je ? b.current.set($.id, je) : b.current.delete($.id);
                },
                type: "text",
                value: $.character,
                onChange: (je) => le($.id, { character: je.target.value }),
                placeholder: "Character",
                className: W4,
                "aria-label": `Character name for ${ue}`,
                list: K.length > 0 ? o : void 0,
                autoComplete: "off",
                spellCheck: !1
              }
            ),
            /* @__PURE__ */ c.jsxs(
              "select",
              {
                value: $.presetId ?? "",
                onChange: (je) => le($.id, { presetId: je.target.value === "" ? null : je.target.value }),
                className: eL,
                "aria-label": `Emotion preset for ${ue}`,
                children: [
                  /* @__PURE__ */ c.jsx("option", { value: "", children: "No emotion" }),
                  i.map((je) => /* @__PURE__ */ c.jsx("option", { value: je.presetId, children: je.presetName }, je.presetId))
                ]
              }
            ),
            /* @__PURE__ */ c.jsxs("span", { className: tL, children: [
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: $.alpha,
                  onChange: (je) => le($.id, { alpha: Number.parseFloat(je.target.value) }),
                  className: nL,
                  "aria-label": `Emotion intensity for ${ue}`,
                  "aria-valuetext": `${Math.round($.alpha * 100)} percent`
                }
              ),
              /* @__PURE__ */ c.jsx(
                "span",
                {
                  className: aL,
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
                onChange: (je) => le($.id, { text: je.target.value }),
                onKeyDown: (je) => Y(je, $.id),
                placeholder: "Line text…",
                className: rL,
                "aria-label": `Line text for ${ue}`
              }
            ),
            /* @__PURE__ */ c.jsx(
              "button",
              {
                ref: (je) => {
                  je ? p.current.set($.id, je) : p.current.delete($.id);
                },
                type: "button",
                className: iL,
                "aria-label": `Remove ${ue}`,
                title: "Remove this line",
                onClick: () => k($.id),
                children: "✕"
              }
            ),
            ee < t.length - 1 && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: Z4,
                "aria-label": `Insert line after ${ue}`,
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
        ref: m,
        type: "button",
        className: dL,
        onClick: () => U(null),
        "aria-label": "Add character line",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: fL, "aria-hidden": "true", children: "＋" }),
          "Add line"
        ]
      }
    ),
    K.length > 0 && /* @__PURE__ */ c.jsx("datalist", { id: o, children: K.map(($) => /* @__PURE__ */ c.jsx("option", { value: $ }, $)) }),
    /* @__PURE__ */ c.jsx("div", { className: mL, role: "status", "aria-live": "polite", "aria-atomic": "true", children: V })
  ] });
}
var yL = "fmg0gf0", bL = "fmg0gf1", Lb = { idle: "fmg0gf3 fmg0gf2", active: "fmg0gf4 fmg0gf2" };
const qi = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" }
], xL = qi;
function SL({
  value: t,
  onChange: a,
  storyDisabled: i = !1
}) {
  const s = y.useRef([]), o = y.useCallback(
    (f, m) => {
      const g = qi.length;
      let p = f;
      for (let v = 1; v <= g; v += 1) {
        const w = (f + m * v + g) % g, S = qi[w];
        if (!S) continue;
        if (!(S.id === "story" && i)) {
          p = w;
          break;
        }
      }
      const b = qi[p];
      b && (a(b.id), s.current[p]?.focus());
    },
    [a, i]
  ), u = y.useCallback(
    (f, m) => {
      f.key === "ArrowRight" || f.key === "ArrowDown" ? (f.preventDefault(), o(m, 1)) : f.key === "ArrowLeft" || f.key === "ArrowUp" ? (f.preventDefault(), o(m, -1)) : f.key === "Home" ? (f.preventDefault(), o(-1, 1)) : f.key === "End" && (f.preventDefault(), o(qi.length, -1));
    },
    [o]
  );
  return /* @__PURE__ */ c.jsx("div", { className: yL, role: "radiogroup", "aria-label": "Editor mode", children: qi.map((f, m) => {
    const g = f.id === t, p = f.id === "story" && i, b = p ? `${f.label} (coming soon)` : f.label;
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: (v) => {
          s.current[m] = v;
        },
        type: "button",
        role: "radio",
        "aria-checked": g,
        "aria-disabled": p || void 0,
        tabIndex: g ? 0 : -1,
        title: p ? `${f.description} — coming soon` : f.description,
        className: g ? Lb.active : Lb.idle,
        onClick: () => {
          p || a(f.id);
        },
        onKeyDown: (v) => u(v, m),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: bL, "aria-hidden": "true", children: f.glyph }),
          /* @__PURE__ */ c.jsx("span", { children: b })
        ]
      },
      f.id
    );
  }) });
}
const wL = [
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
function jL(t, a) {
  const i = t.ownerDocument;
  if (!i) return { top: 0, left: 0, height: 0 };
  const s = i.createElement("div"), o = i.defaultView?.getComputedStyle(t);
  if (!o) return { top: 0, left: 0, height: 0 };
  const u = s.style, f = o;
  for (const N of wL) {
    const C = f[N];
    typeof C == "string" && (u[N] = C);
  }
  s.style.position = "absolute", s.style.visibility = "hidden", s.style.overflow = "hidden", s.style.top = "0", s.style.left = "-9999px", s.style.whiteSpace = "pre-wrap", s.style.wordWrap = "break-word";
  const m = t.value.slice(0, a), g = i.createTextNode(m.replace(/ /g, " ")), p = i.createElement("span");
  p.textContent = t.value.slice(a, a + 1) || ".", s.appendChild(g), s.appendChild(p), i.body.appendChild(s);
  const b = p.getBoundingClientRect(), v = s.getBoundingClientRect(), w = b.top - v.top - t.scrollTop, S = b.left - v.left - t.scrollLeft, j = b.height || parseFloat(o.lineHeight) || 16;
  return i.body.removeChild(s), { top: w, left: S, height: j };
}
const IS = {
  character: "@",
  emotion: "/"
}, FS = /* @__PURE__ */ new Set([" ", "	", `
`, "\r"]), EL = /[\p{L}\p{N}_-]/u, NL = /[^\p{L}\p{N}_-]+/gu;
function YS(t) {
  return t ? EL.test(t) : !1;
}
function TL(t) {
  return t.replace(NL, "_").replace(/_+/g, "_").replace(/^[_-]+|[_-]+$/g, "");
}
function CL(t, a) {
  if (a >= t.length) return 0;
  const i = t.charCodeAt(a);
  if (i >= 55296 && i <= 56319 && a + 1 < t.length) {
    const s = t.charCodeAt(a + 1);
    if (s >= 56320 && s <= 57343) return 2;
  }
  return 1;
}
function Ac(t, a) {
  const i = CL(t, a);
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
    const f = t[s], m = f === "@" || f === "/", g = s === 0 ? "" : Ac(t, vc(t, s)), p = s === 0 || g !== "" && FS.has(g);
    if (m && p) {
      let b = s + 1, v = "";
      for (; b < o; ) {
        const w = Ac(t, b);
        if (w && YS(w))
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
function RL(t, a) {
  if (a <= 0 || a > t.length) return null;
  let i = vc(t, a), s = "";
  for (; i >= 0; ) {
    const o = Ac(t, i);
    if (!o) break;
    if (o === "@" || o === "/") {
      const f = i === 0 ? "" : Ac(t, vc(t, i));
      return i === 0 || f !== "" && FS.has(f) ? {
        kind: o === "@" ? "character" : "emotion",
        start: i,
        query: s
      } : null;
    }
    if (!YS(o)) return null;
    s = o + s;
    const u = vc(t, i);
    if (u < 0) break;
    i = u;
  }
  return null;
}
var _L = "_1d2ofoy5", ML = "_1d2ofoy6", AL = "_1d2ofoy8 _1d2ofoy7", DL = "_1d2ofoy9 _1d2ofoy7", kL = "_1d2ofoya", zL = "_1d2ofoyb", OL = "_1d2ofoyc", LL = "_1d2ofoye", UL = "_1d2ofoyf", $L = "_1d2ofoyg", BL = "_1d2ofoyh", VL = "_1d2ofoyi", HL = "_1d2ofoyj", ec = "_1d2ofoyk", qL = "_1d2ofoyl";
const IL = `Type @character to set the speaker, /emotion to set the emotion preset.

@bob /happy I love mornings!
@alice /melancholic I prefer evenings.`;
function FL({
  value: t,
  onChange: a,
  characters: i,
  presets: s,
  mappingsByLower: o
}) {
  const u = y.useRef(null), f = y.useRef(null), m = y.useId(), g = `${m}-opt`, [p, b] = y.useState(null), v = y.useMemo(() => Dc(t), [t]), w = y.useMemo(() => {
    const z = /* @__PURE__ */ new Map();
    o.forEach((F) => z.set(F.characterName.toLowerCase(), F.characterName));
    for (const F of i) {
      const W = F.toLowerCase();
      z.has(W) || z.set(W, F);
    }
    return Array.from(z.values()).sort((F, W) => F.localeCompare(W));
  }, [i, o]), S = y.useMemo(() => {
    if (!p) return [];
    const z = p.query.toLowerCase();
    if (p.kind === "character")
      return w.filter((K) => K.toLowerCase().includes(z)).slice(0, 8).map((K) => {
        const le = o.get(K.toLowerCase());
        return { value: K, hint: le ? "mapped" : "unmapped" };
      });
    const F = /* @__PURE__ */ new Set(), W = [];
    for (const K of s) {
      const le = K.presetName.toLowerCase();
      if (le.includes(z) && !F.has(le) && (F.add(le), W.push({ value: K.presetName, hint: "vector" }), W.length >= 8))
        break;
    }
    return W;
  }, [p, w, o, s]), j = y.useCallback((z, F, W) => {
    if (F < 0) return null;
    const K = RL(z, F);
    if (!K) return null;
    const le = u.current, ne = le ? jL(le, F) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: K.start,
      query: K.query,
      kind: K.kind,
      selected: W && W.kind === K.kind ? W.selected : 0,
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
    const F = z.selectionStart;
    if (F !== z.selectionEnd) {
      b(null);
      return;
    }
    b((W) => j(t, F, W));
  }, [t, j]);
  y.useEffect(() => {
    if (!p) return;
    const z = S.length, F = z === 0 ? 0 : Math.min(p.selected, z - 1);
    p.selected !== F && b({ ...p, selected: F });
  }, [p, S]), y.useLayoutEffect(() => {
    const z = f.current, F = u.current;
    !z || !F || (z.scrollTop = F.scrollTop, z.scrollLeft = F.scrollLeft);
  }), y.useEffect(() => {
    const z = u.current, F = f.current;
    if (!z || !F) return;
    const W = () => {
      F.scrollTop = z.scrollTop, F.scrollLeft = z.scrollLeft;
    };
    return z.addEventListener("scroll", W, { passive: !0 }), () => z.removeEventListener("scroll", W);
  }, []);
  const C = y.useCallback(
    (z) => {
      const F = z.target.value;
      a(F);
      const W = z.target;
      requestAnimationFrame(() => {
        const K = W.selectionStart;
        if (K !== W.selectionEnd) {
          b(null);
          return;
        }
        b((le) => j(F, K, le));
      });
    },
    [a, j]
  ), T = y.useCallback(() => {
    N();
  }, [N]), A = y.useCallback(
    (z, F) => {
      if (!p) return;
      const W = IS[p.kind], K = p.triggerStart + 1 + p.query.length, le = t.slice(0, p.triggerStart), ne = t.slice(K), k = TL(z);
      if (!k) return;
      const U = `${W}${k} `, q = `${le}${U}${ne}`;
      a(q);
      const Y = le.length + U.length;
      b(null), F.advanceFocus || requestAnimationFrame(() => {
        u.current && (u.current.focus(), u.current.setSelectionRange(Y, Y));
      });
    },
    [p, t, a]
  ), O = y.useCallback(
    (z) => {
      if (p) {
        if (z.key === "Escape") {
          z.preventDefault(), b(null);
          return;
        }
        if (S.length !== 0) {
          if (z.key === "ArrowDown")
            z.preventDefault(), b((F) => F && { ...F, selected: (F.selected + 1) % S.length });
          else if (z.key === "ArrowUp")
            z.preventDefault(), b(
              (F) => F && { ...F, selected: (F.selected - 1 + S.length) % S.length }
            );
          else if (z.key === "Enter") {
            const F = S[p.selected];
            F && (z.preventDefault(), A(F.value, { advanceFocus: !1 }));
          } else if (z.key === "Tab") {
            const F = S[p.selected];
            F && A(F.value, { advanceFocus: !0 });
          }
        }
      }
    },
    [p, S, A]
  ), R = y.useRef(null), [V, X] = y.useState(null);
  y.useLayoutEffect(() => {
    if (!p) {
      X(null);
      return;
    }
    const z = R.current, F = u.current;
    if (!z || !F) return;
    const W = z.offsetWidth, K = F.clientWidth, le = Math.max(0, K - W - 8), ne = Math.max(0, p.caretLeft);
    X(Math.min(ne, le));
  }, [p]);
  const ie = p?.kind === "character" ? "Character" : "Emotion preset", M = p && S.length > 0 ? `${g}-${p.selected}` : void 0, H = !p || S.length > 0 ? null : p.kind === "emotion" ? s.length === 0 ? "No emotion presets yet — create one in Mappings." : `No preset matches "${p.query}". Type a different name or pick from Mappings.` : p.query.length === 0 ? "Type a name — we'll create a new character on the fly." : `No character "${p.query}" yet — keep typing to define a new one.`;
  return /* @__PURE__ */ c.jsxs("div", { className: _L, children: [
    /* @__PURE__ */ c.jsxs("div", { className: ML, children: [
      /* @__PURE__ */ c.jsx("div", { ref: f, className: AL, "aria-hidden": "true", children: YL(v, p?.triggerStart ?? null) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          ref: u,
          className: DL,
          value: t,
          onChange: C,
          onSelect: T,
          onKeyDown: O,
          placeholder: IL,
          rows: 10,
          spellCheck: !0,
          "aria-label": "Story script",
          "aria-controls": p && S.length > 0 ? m : void 0,
          "aria-autocomplete": "list",
          "aria-activedescendant": M
        }
      ),
      p && (S.length > 0 || H) && /* @__PURE__ */ c.jsxs(
        "div",
        {
          ref: R,
          className: LL,
          style: {
            top: `${p.caretTop + p.caretHeight + 6}px`,
            left: `${V ?? Math.max(0, p.caretLeft)}px`
          },
          children: [
            /* @__PURE__ */ c.jsx("div", { className: UL, "aria-hidden": "true", children: ie }),
            S.length > 0 ? /* @__PURE__ */ c.jsx(
              "ul",
              {
                id: m,
                role: "listbox",
                "aria-label": ie,
                className: $L,
                children: S.map((z, F) => {
                  const W = `${g}-${F}`, K = F === p.selected;
                  return /* @__PURE__ */ c.jsxs(
                    "li",
                    {
                      id: W,
                      role: "option",
                      "aria-selected": K,
                      "data-active": K || void 0,
                      className: BL,
                      onMouseDown: (le) => {
                        le.preventDefault(), A(z.value, { advanceFocus: !1 });
                      },
                      children: [
                        /* @__PURE__ */ c.jsx("span", { children: z.value }),
                        z.hint && /* @__PURE__ */ c.jsx("span", { className: VL, children: z.hint })
                      ]
                    },
                    `${z.value}-${F}`
                  );
                })
              }
            ) : /* @__PURE__ */ c.jsx("div", { id: m, role: "status", className: qL, children: H })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: HL, children: [
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
function YL(t, a) {
  return t.map((i, s) => {
    if (i.kind === "text")
      return /* @__PURE__ */ c.jsx("span", { className: kL, children: i.value }, `${i.start}-${s}`);
    const o = i.kind, u = a !== null && i.start === a, f = i.value.replace(/_/g, " ");
    return /* @__PURE__ */ c.jsxs(
      "span",
      {
        className: OL,
        "data-kind": o,
        "data-active": u ? "true" : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: zL, children: IS[o] }),
          f
        ]
      },
      `${i.start}-${s}`
    );
  });
}
var GL = "_5o8xvy0", PL = "_5o8xvy1", KL = "_5o8xvy2", XL = "_5o8xvy3", Hf = "_5o8xvy4", QL = "_5o8xvy5", ZL = "_3f2ar0", JL = "_3f2ar1", WL = "_3f2ar2", e6 = "_3f2ar3", t6 = "_3f2ar4", n6 = "_3f2ar6", al = "_3f2ar7", rl = "_3f2ar8", il = "_3f2ar9", Ub = "_3f2ara", $b = "_3f2arb";
function a6({ label: t, glyph: a = "?", children: i }) {
  const [s, o] = y.useState(!1), u = y.useRef(null), f = y.useId(), m = `${f}-content`, g = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!s) return;
    const p = (v) => {
      u.current && (v.target instanceof Node && u.current.contains(v.target) || g());
    }, b = (v) => {
      v.key === "Escape" && g();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [s, g]), /* @__PURE__ */ c.jsxs("span", { ref: u, className: ZL, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: f,
        className: JL,
        "aria-expanded": s,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: WL, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    s && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": f,
        className: e6,
        children: i
      }
    )
  ] });
}
var r6 = "_1dxb1dg0", Bb = "_1dxb1dg1", i6 = "_1dxb1dg2", s6 = "_1dxb1dg3", l6 = "_1dxb1dg4";
function o6() {
  return /* @__PURE__ */ c.jsxs(a6, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: t6, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: n6, children: [
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
    /* @__PURE__ */ c.jsxs("p", { className: Ub, children: [
      /* @__PURE__ */ c.jsx("span", { className: $b, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Ub, children: [
      /* @__PURE__ */ c.jsx("span", { className: $b, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function c6() {
  return /* @__PURE__ */ c.jsxs("ul", { className: r6, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Bb, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: Bb, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: i6, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: s6, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: l6, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function u6({
  editorMode: t,
  onEditorModeChange: a,
  deployment: i,
  script: s,
  onScriptChange: o,
  rows: u,
  onRowsChange: f,
  storyText: m,
  onStoryTextChange: g,
  storyCharacters: p,
  outputFormat: b,
  mappingsByLower: v,
  defaultVoiceAssetId: w,
  onDefaultVoiceAssetIdChange: S,
  presets: j
}) {
  const N = t === "quick", C = t === "rows", T = t === "story", A = xL.find((ie) => ie.id === t)?.description ?? "", O = C ? u.reduce((ie, M) => ie + M.text.length, 0) : T ? m.length : s.length, R = C ? u.map((ie) => ie.text).join(" ") : T ? m : s, V = R.trim() ? R.trim().split(/\s+/).length : 0, X = C ? u.filter((ie) => ie.text.trim().length > 0).length : (T ? m : s).trim() ? (T ? m : s).trim().split(/\r?\n/).filter((ie) => ie.trim()).length : 0;
  return /* @__PURE__ */ c.jsxs("div", { className: GL, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${PL} ${N ? KL : ""}`,
        "data-quick-on": N || void 0,
        children: [
          /* @__PURE__ */ c.jsx(SL, { value: t, onChange: a }),
          N && /* @__PURE__ */ c.jsx(
            A4,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: w,
              onChange: S
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: XL, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Hf, children: O.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Hf, children: X.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Hf, children: V.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            !C && /* @__PURE__ */ c.jsx(o6, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("p", { className: QL, "aria-live": "polite", children: A }),
    C ? /* @__PURE__ */ c.jsx(
      gL,
      {
        rows: u,
        onRowsChange: f,
        presets: j,
        mappingsByLower: v
      }
    ) : T ? /* @__PURE__ */ c.jsx(
      FL,
      {
        value: m,
        onChange: g,
        characters: p,
        presets: j,
        mappingsByLower: v
      }
    ) : /* @__PURE__ */ c.jsx(
      z4,
      {
        value: s,
        onChange: o,
        outputFormat: b,
        mappings: v,
        deploymentId: i.deploymentId,
        quickMode: N
      }
    ),
    !N && !C && !T && /* @__PURE__ */ c.jsx(c6, {})
  ] });
}
function d6({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: s,
  unmappedCount: o,
  globalEmotion: u,
  performance: f
}) {
  const m = [], g = t.trim();
  if (!g)
    m.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  else {
    const p = g.split(/\r?\n/).filter((b) => b.trim()).length;
    m.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${p} lines · ${g.length} chars`
    });
  }
  if (a ? m.push({
    id: "voice",
    status: i ? "ok" : "warn",
    label: "Quick voice",
    detail: i ? "default voice set" : "no default voice"
  }) : s.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${s.length} mapped` }) : m.push({
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
function Vb(t, a) {
  return t === "quick" ? a.script.trim().length > 0 : t === "rows" ? a.rows.some((i) => i.text.trim().length > 0 || i.character.trim().length > 0) : a.storyText.trim().length > 0;
}
function f6(t, a, i, s) {
  if (t === a) return null;
  if (t === "quick" && a === "rows") {
    const u = i.script.split(/\r?\n/).filter((f) => f.trim().length > 0).map((f) => ({
      ...Yr(),
      text: f.trim()
    }));
    return { rows: u.length > 0 ? u : [Yr()] };
  }
  if (t === "quick" && a === "story")
    return { storyText: i.script };
  if (t === "rows" && a === "quick")
    return { script: qS(i.rows, s) };
  if (t === "rows" && a === "story") {
    const o = /* @__PURE__ */ new Map();
    for (const f of s) o.set(f.presetId, f);
    const u = [];
    for (const f of i.rows) {
      const m = f.text.trim();
      if (!m) continue;
      const g = f.character.trim(), p = f.presetId ? o.get(f.presetId) : null, b = [];
      g && b.push(`@${Hb(g)}`), p && b.push(`/${Hb(p.presetName)}`), b.push(m), u.push(b.join(" "));
    }
    return { storyText: u.join(`
`) };
  }
  if (t === "story" && a === "quick") {
    const o = Dc(i.storyText), u = [];
    for (const m of o)
      m.kind === "text" && u.push(m.value);
    return { script: u.join("").split(/\r?\n/).map((m) => m.replace(/[ \t]+/g, " ").trim()).filter((m) => m.length > 0).join(`
`) };
  }
  if (t === "story" && a === "rows") {
    const o = Dc(i.storyText), u = /* @__PURE__ */ new Map();
    for (const w of s) u.set(w.presetName.toLowerCase(), w);
    const f = [];
    let m = "", g = null, p = "", b = !1;
    const v = () => {
      const w = p.split(/\r?\n/).map((j) => j.replace(/[ \t]+/g, " ").trim()).filter((j) => j.length > 0);
      if (p = "", w.length === 0) return;
      const S = w[0];
      if (S !== void 0) {
        f.push({
          ...Yr(),
          character: m,
          presetId: g,
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
        b && v(), m = w.value, g = null, b = !0;
      else if (w.kind === "emotion") {
        b && v();
        const S = u.get(w.value.toLowerCase());
        g = S ? S.presetId : null, b = !0;
      } else
        p += w.value, b = !0;
    return v(), { rows: f.length > 0 ? f : [Yr()] };
  }
  return null;
}
function Hb(t) {
  return t.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
const qf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], h6 = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function m6(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let s = 0; s < i.length; s += 1) {
    const u = (i[s] ?? "").trim();
    if (u.length === 0) continue;
    const f = u.match(h6);
    if (!f || !f.groups) {
      a.push({ idx: s, character: null, text: u, override: null });
      continue;
    }
    const m = f.groups.body ?? "", g = (f.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: s, character: null, text: g || u, override: null });
      continue;
    }
    const w = v.split(":")[0]?.trim() || null, S = b.join("|").trim(), j = S ? p6(S) : null;
    a.push({
      idx: s,
      character: w,
      text: g,
      override: j
    });
  }
  return a;
}
function p6(t) {
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
function v6(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const s of t) {
    if (!s.character) continue;
    const o = s.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(s.character));
  }
  return i;
}
function g6(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const s = t[i];
    s && (a[s] = qf[i % qf.length] ?? qf[0]);
  }
  return a;
}
function y6(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var b6 = "_1snzz30", x6 = "_1snzz31", S6 = "_1snzz33", w6 = "_1snzz34", j6 = "_1snzz36", qb = "_1snzz3b", Ib = "_1snzz3c", Fb = "_1snzz3d";
const E6 = "ext-action-invoke", N6 = "emotion-tts.run";
function T6() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(E6, {
      detail: { id: N6 },
      bubbles: !1
    })
  ), !0) : !1;
}
const C6 = 4e3;
function R6({ visible: t, canGenerate: a }) {
  const [i, s] = y.useState(null), [o, u] = y.useState(!1), [f, m] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let U = !1;
    const q = async () => {
      try {
        const ce = await xc();
        U || (g.current = ce, s(ce));
      } catch {
      }
    };
    q();
    const Y = window.setInterval(q, C6);
    return () => {
      U = !0, window.clearInterval(Y);
    };
  }, []), y.useEffect(() => kS((U) => {
    m(!!U.busy);
  }), []);
  const p = y.useCallback(() => {
    hO();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", w = b === "starting" || b === "installing" || b === "stopping", S = v;
  y.useEffect(() => {
    o && (w || v) && u(!1);
  }, [o, w, v]);
  const j = y.useCallback(() => {
    u(!0), T6();
  }, []), N = v ? "Stop runtime" : w ? "Runtime starting…" : "Start runtime", C = o || w, T = o || w, A = T ? "transitioning" : v ? "running" : "stopped", O = !a || f || !S, R = S ? a ? f ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", V = S && a && !f, X = v ? "ready" : w || o ? "busy" : "off", ie = v ? "Runtime ready" : w ? "Starting…" : o ? "Working…" : "Runtime off", M = X === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const H = "rgba(28, 30, 34, 0.94)", z = "#ba9eff", F = "#8455ef", W = "#1a0a3a", K = "#f0f0f3", le = "#aaabae", ne = "#22c55e", k = v ? "◼" : "⏻";
  return Ih.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: b6,
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
          background: H,
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
              className: x6,
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
                color: X === "ready" ? ne : X === "busy" ? z : le,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${X === "ready" ? "rgba(34, 197, 94, 0.4)" : X === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: S6,
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
                ie
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: Ib, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: w6,
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
                children: T ? /* @__PURE__ */ c.jsx("span", { className: qb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: k })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Fb, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: Ib, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: j6,
                "data-ready": V ? "true" : "false",
                onClick: p,
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
                  background: O ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${z} 0%, ${F} 100%)`,
                  color: O ? le : W,
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
                  f ? /* @__PURE__ */ c.jsx("span", { className: qb, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: f ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Fb, role: "tooltip", children: R })
          ] })
        ]
      }
    ),
    document.body
  );
}
function _6(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], s = M6(t.deployment.displayName, t.deployment.deploymentId), o = LS(US), u = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: tR, children: [
    /* @__PURE__ */ c.jsxs("header", { className: nR, children: [
      /* @__PURE__ */ c.jsx("div", { className: rR, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: aR, children: /* @__PURE__ */ c.jsx("h1", { className: iR, children: s }) }),
      /* @__PURE__ */ c.jsx("p", { className: sR, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(Rn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: gR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: lR, children: [
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
    /* @__PURE__ */ c.jsx(R6, { visible: o, canGenerate: u }),
    typeof document < "u" && Ih.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: yR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: GO,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function M6(t, a) {
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
  const [f, m] = y.useState(o), g = `${i}-body`;
  return /* @__PURE__ */ c.jsxs("section", { className: oR, "aria-labelledby": i, children: [
    /* @__PURE__ */ c.jsx("header", { className: cR, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: fR,
        "aria-expanded": !f,
        "aria-controls": g,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: uR, children: [
            /* @__PURE__ */ c.jsx("span", { className: hR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: mR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: pR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: i, className: dR, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: vR,
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
        className: s === "split" ? xR : bR,
        children: u
      }
    )
  ] });
}
const Tn = {
  success(t) {
    on.success(t);
  },
  error(t) {
    on.error(t);
  }
}, jh = "__recipe";
function A6(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function D6(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== jh && (a[i] = t[i]);
  return a;
}
function k6() {
  const { deployment: t, mappings: a, runs: i, workflow: s } = El(), [o, u] = y.useState(a), [f, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [w, S] = y.useState(Hc), j = y.useMemo(
    () => t.defaultGenerationOverridesJson ? A6(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const he = j[jh];
    return typeof he == "object" && he !== null ? he : {};
  }, [j]), [C, T] = y.useState(""), [A, O] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [R, V] = y.useState(t.defaultSpeedFactor ?? 1), [X, ie] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [M, H] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...D6(j)
  })), [z, F] = y.useState(() => {
    const he = N.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [W, K] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [le, ne] = y.useState(() => {
    const he = N.editorMode;
    return he === "quick" || he === "rows" || he === "story" ? he : typeof N.quickMode == "boolean" || t.defaultVoiceAssetId != null ? "quick" : "rows";
  }), k = le === "quick", [U, q] = y.useState(() => [Yr()]), Y = 1e5, [ce, _] = y.useState(() => {
    const he = N.storyText;
    return typeof he == "string" ? he : "";
  }), te = y.useRef(!1), ae = y.useCallback((he) => {
    he.length > Y && !te.current && (te.current = !0, Tn.error(
      `Story text is over ${Math.round(Y / 1e3)} KB — large scripts may slow down save and rendering.`
    )), he.length <= Y && (te.current = !1), _(he);
  }, []), [G, $] = y.useState(Z3), ee = y.useRef(C), ue = y.useRef(U), pe = y.useRef(ce), Ce = y.useRef(g);
  y.useEffect(() => {
    ee.current = C;
  }, [C]), y.useEffect(() => {
    ue.current = U;
  }, [U]), y.useEffect(() => {
    pe.current = ce;
  }, [ce]), y.useEffect(() => {
    Ce.current = g;
  }, [g]);
  const [ot, je] = y.useState(""), tt = y.useCallback(
    (he) => {
      ne((ke) => {
        if (he === ke) return ke;
        const Ae = {
          script: ee.current,
          rows: ue.current,
          storyText: pe.current
        }, we = Vb(he, Ae), ct = Vb(ke, Ae);
        if (!we && ct) {
          const Ve = f6(ke, he, Ae, Ce.current);
          if (Ve) {
            const cn = { ...Ae }, Hn = document.activeElement;
            Ve.script !== void 0 && T(Ve.script), Ve.rows !== void 0 && q(Ve.rows), Ve.storyText !== void 0 && ae(Ve.storyText);
            const vn = {
              quick: "Quick",
              rows: "Per-character",
              story: "Story"
            }, qn = (st) => st.split(/\r?\n/).filter((Mt) => Mt.trim().length > 0).length, tn = Ve.rows !== void 0 ? Ve.rows.length : Ve.script !== void 0 ? qn(Ve.script) : Ve.storyText !== void 0 ? qn(Ve.storyText) : 0, Mn = tn === 1 ? "line" : "lines", un = tn > 0 ? ` (${tn} ${Mn})` : "", Le = `Switched to ${vn[he]} mode${tn > 0 ? `, ${tn} ${Mn}` : ""}.`;
            je((st) => st === Le ? `${Le}​` : Le), on(`Switched to ${vn[he]}${un} — content kept`, {
              action: {
                label: "Undo",
                onClick: () => {
                  T(cn.script), q([...cn.rows]), ae(cn.storyText), ne(ke), Hn && typeof Hn.focus == "function" && requestAnimationFrame(() => Hn.focus());
                }
              },
              duration: 5e3
            });
          }
        }
        return he;
      });
    },
    [ae]
  );
  y.useEffect(() => {
    let he = !1;
    return Xi(t.deploymentId).then((ke) => {
      he || m(ke.voiceAssets);
    }).catch(() => {
    }), L_(t.deploymentId).then((ke) => {
      he || p(
        [...ke.presets].sort((Ae, we) => we.updatedAt - Ae.updatedAt)
      );
    }).catch(() => {
    }), () => {
      he = !0;
    };
  }, [t.deploymentId]);
  const Be = y.useRef(!0);
  y.useEffect(() => {
    if (Be.current) {
      Be.current = !1;
      return;
    }
    const he = window.setTimeout(() => {
      const ke = {
        ...M,
        [jh]: {
          editorMode: le,
          quickMode: k,
          cachePolicy: z,
          storyText: ce
        }
      };
      bt(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: A,
          defaultSpeedFactor: R,
          defaultGenerationOverrides: ke
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    A,
    R,
    z,
    le,
    k,
    ce,
    M
  ]);
  const $e = y.useMemo(() => le === "rows" ? qS(U, g) : le === "story" ? ce : C, [le, U, g, C, ce]), Zt = y.useMemo(() => m6($e), [$e]), Nt = y.useMemo(() => {
    if (le !== "story") return v6(Zt);
    const he = /* @__PURE__ */ new Set(), ke = [];
    for (const Ae of Dc(ce))
      Ae.kind === "character" && (he.has(Ae.value) || (he.add(Ae.value), ke.push(Ae.value)));
    return ke;
  }, [le, Zt, ce]), kt = y.useMemo(() => g6(Nt), [Nt]), ra = y.useMemo(() => y6(Zt), [Zt]), xt = y.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const ke of o)
      he.set(ke.characterName.toLowerCase(), ke);
    return he;
  }, [o]), en = y.useMemo(() => k && W ? 0 : Nt.filter((he) => !xt.has(he.toLowerCase())).length, [Nt, xt, k, W]), yn = y.useCallback(
    async (he, ke) => {
      const Ae = xt.get(he.toLowerCase());
      try {
        if (Ae) {
          const we = await ul(t.deploymentId, Ae.mappingId, ke);
          u(
            (ct) => ct.map((Ve) => Ve.mappingId === we.mappingId ? we : Ve)
          ), Tn.success(`Updated mapping for ${he}`);
        } else if (ke.speakerVoiceAssetId) {
          const we = await Hh(t.deploymentId, {
            ...ke,
            characterName: he,
            speakerVoiceAssetId: ke.speakerVoiceAssetId
          });
          u((ct) => [...ct, we]), Tn.success(`Mapped ${he} to voice`);
        }
      } catch (we) {
        Tn.error(we instanceof Error ? we.message : "mapping failed");
      }
    },
    [xt, t.deploymentId]
  ), zt = y.useCallback(
    async (he) => {
      const ke = xt.get(he.toLowerCase());
      if (ke)
        try {
          await Kx(t.deploymentId, ke.mappingId), u((Ae) => Ae.filter((we) => we.mappingId !== ke.mappingId)), Tn.success(`Cleared mapping for ${he}`);
        } catch (Ae) {
          Tn.error(Ae instanceof Error ? Ae.message : "clear failed");
        }
    },
    [xt, t.deploymentId]
  ), bn = y.useCallback(
    async (he, ke) => {
      try {
        const Ae = await bc(
          t.deploymentId,
          ke,
          ke.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((we) => [Ae, ...we]), await yn(he, { speakerVoiceAssetId: Ae.voiceAssetId });
      } catch (Ae) {
        Tn.error(Ae instanceof Error ? Ae.message : "upload failed");
      }
    },
    [t.deploymentId, yn]
  ), Ot = y.useCallback((he) => {
    S(he);
  }, []), xe = y.useMemo(() => {
    const he = [], ke = /* @__PURE__ */ new Set();
    for (const Ae of o) {
      const we = Ae.speakerVoiceAssetId;
      if (!we || ke.has(we)) continue;
      ke.add(we);
      const Ve = f.find((cn) => cn.voiceAssetId === we)?.displayName ?? `${Ae.characterName} · ${we.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: we, label: Ve });
    }
    for (const Ae of f)
      ke.has(Ae.voiceAssetId) || (ke.add(Ae.voiceAssetId), he.push({ kind: "voice_asset", id: Ae.voiceAssetId, label: Ae.displayName }));
    return he;
  }, [o, f]), Oe = y.useCallback(
    async (he, ke) => {
      if (he.kind !== "voice_asset") {
        Tn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let Ae;
      try {
        const we = JSON.parse(ke);
        if (typeof we != "object" || we === null || we.version !== 1 || !Array.isArray(we.ops))
          throw new Error("snapshot is not a valid EditChain");
        Ae = we;
      } catch (we) {
        Tn.error(
          we instanceof Error ? `Audit snapshot is malformed: ${we.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const we = await Qx(he.id, t.deploymentId, {
          chain: Ae
        }), ct = o.filter((Ve) => Ve.speakerVoiceAssetId === he.id);
        await Promise.all(
          ct.map(
            (Ve) => ul(t.deploymentId, Ve.mappingId, {
              voiceAssetChainDigest: we.chain_digest
            }).catch(() => null)
          )
        ), u(
          (Ve) => Ve.map(
            (cn) => cn.speakerVoiceAssetId === he.id ? { ...cn, voiceAssetChainDigest: we.chain_digest } : cn
          )
        ), Tn.success(`Reverted ${he.label} to a prior chain`);
      } catch (we) {
        Tn.error(we instanceof Error ? we.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Ze = y.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        Tn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await ZC(he.id, t.deploymentId);
        const ke = o.filter((Ae) => Ae.speakerVoiceAssetId === he.id);
        await Promise.all(
          ke.map(
            (Ae) => ul(t.deploymentId, Ae.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), u(
          (Ae) => Ae.map(
            (we) => we.speakerVoiceAssetId === he.id ? { ...we, voiceAssetChainDigest: null } : we
          )
        ), Tn.success(`Cleared edit chain on ${he.label}`);
      } catch (ke) {
        Tn.error(ke instanceof Error ? ke.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), it = y.useMemo(
    () => ({
      script: $e,
      parserMode: le === "quick" ? "raw_text" : le === "story" ? "story" : "dialogue",
      outputFormat: A,
      speedFactor: R,
      globalEmotion: { ...X, emotionAlpha: G.intensity },
      generation: M,
      cachePolicy: z
    }),
    [$e, le, A, R, G.intensity, X, M, z]
  ), Rt = y.useMemo(
    () => d6({
      script: $e,
      quickMode: k,
      defaultVoiceAssetId: W,
      characters: Nt,
      unmappedCount: en,
      globalEmotion: X,
      performance: G
    }),
    [$e, k, W, Nt, en, X, G]
  ), Lt = y.useMemo(
    () => Rt.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [Rt]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(XC, { position: "bottom-right", richColors: !0, theme: "dark" }),
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
        children: ot
      }
    ),
    /* @__PURE__ */ c.jsx(
      _6,
      {
        deployment: t,
        canGenerate: $e.trim().length > 0,
        workflowCustomised: s.workflow.customised,
        unmappableFields: s.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(EM, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          o4,
          {
            deploymentId: t.deploymentId,
            createPayload: it,
            canGenerate: $e.trim().length > 0,
            diagnostics: Lt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          qO,
          {
            deploymentId: t.deploymentId,
            speedFactor: R
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          u6,
          {
            editorMode: le,
            onEditorModeChange: tt,
            deployment: t,
            script: C,
            onScriptChange: T,
            rows: U,
            onRowsChange: q,
            storyText: ce,
            onStoryTextChange: ae,
            storyCharacters: Nt,
            outputFormat: A,
            mappingsByLower: xt,
            defaultVoiceAssetId: W,
            onDefaultVoiceAssetIdChange: K,
            presets: g
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(q3, { lines: Zt, characterColors: kt }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          O_,
          {
            deploymentId: t.deploymentId,
            voiceAssets: f,
            mappings: o,
            characterColors: kt,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(yM, { unmappedCount: en, totalCount: Nt.length, children: Nt.map((he) => {
          const ke = xt.get(he.toLowerCase()) ?? null, Ae = kt[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: AR, children: /* @__PURE__ */ c.jsx(
            gM,
            {
              characterName: he,
              color: Ae,
              lineCount: ra[he] ?? 0,
              mapping: ke,
              voiceAssets: f,
              presets: g,
              active: b === he,
              onToggle: () => v((we) => we === he ? null : he),
              onAssignVoiceAsset: (we) => yn(he, { speakerVoiceAssetId: we }),
              onAssignPreset: (we) => yn(he, { defaultVectorPresetId: we }),
              onUploadFile: (we) => bn(he, we),
              onClearMapping: () => zt(he)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ c.jsx(
          h3,
          {
            value: X,
            onChange: ie,
            deploymentId: t.deploymentId,
            presets: g,
            onPresetsChange: p
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            J3,
            {
              value: { ...G, pace: R },
              onChange: (he) => {
                $(he), he.pace !== R && V(he.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Gh,
            {
              state: w,
              onChange: Ot,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(cD, { checks: Rt }),
          /* @__PURE__ */ c.jsx(
            D3,
            {
              outputFormat: A,
              onOutputFormatChange: O,
              speedFactor: R,
              onSpeedFactorChange: V,
              cachePolicy: z,
              onCachePolicyChange: F,
              generation: M,
              onGenerationChange: H
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(vD, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          J_,
          {
            deploymentId: t.deploymentId,
            targets: xe,
            onRevertToIdentity: Ze,
            onRevertToChain: Oe
          }
        )
      }
    )
  ] });
}
const Yb = /* @__PURE__ */ new Map();
function z6(t, a) {
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
    const o = `${t}::${a}`, u = Yb.get(o);
    if (u) {
      s({ peaks: u, isLoading: !1, error: null });
      return;
    }
    const f = new AbortController();
    return s({ peaks: null, isLoading: !0, error: null }), O6(t, a, f.signal).then((m) => {
      f.signal.aborted || (Yb.set(o, m), s({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (f.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      s({ peaks: null, isLoading: !1, error: g });
    }), () => f.abort();
  }, [t, a]), i;
}
async function O6(t, a, i) {
  const s = await fetch(t, { signal: i });
  if (!s.ok) throw new Error(`failed to load audio (${s.status})`);
  const o = await s.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const f = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return L6(f, a);
}
function L6(t, a) {
  const i = t.numberOfChannels, s = t.length, o = Math.max(1, Math.floor(s / a)), u = new Float32Array(a), f = [];
  for (let m = 0; m < i; m += 1) f.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(s, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let w = 0;
      for (let j = 0; j < i; j += 1) {
        const N = f[j];
        N && (w += Math.abs(N[v] ?? 0));
      }
      const S = w / i;
      S > b && (b = S);
    }
    u[m] = b;
  }
  return u;
}
const Gb = "(prefers-reduced-motion: reduce)";
function U6() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Gb).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Gb), s = (o) => a(o.matches);
    return i.addEventListener("change", s), () => i.removeEventListener("change", s);
  }, []), t;
}
var $6 = "mquzal0", B6 = "mquzal1", Pb = "mquzal2", Kb = "mquzal3", Xb = "mquzal4", V6 = "mquzal5", Qb = "mquzal6", Zb = "mquzal7";
const H6 = 120, q6 = 720;
function GS(t) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: s,
    endMs: o,
    onChangeStart: u,
    onChangeEnd: f,
    isPlaying: m = !1,
    playbackPositionMs: g = 0,
    onSeek: p,
    width: b = q6,
    height: v = H6
  } = t, w = y.useRef(null), S = y.useRef(null), j = y.useRef(null), N = z6(a, b), C = U6();
  y.useEffect(() => {
    I6(w.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = y.useCallback(
    (M) => {
      const H = S.current?.getBoundingClientRect();
      if (!H || H.width <= 0) return 0;
      const z = Math.max(0, Math.min(1, (M - H.left) / H.width));
      return Math.round(z * i);
    },
    [i]
  );
  y.useEffect(() => {
    const M = (z) => {
      if (!j.current) return;
      const F = T(z.clientX);
      j.current === "start" ? u(tc(F, 0, o - 1)) : f(tc(F, s + 1, i));
    }, H = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", M), window.addEventListener("pointerup", H), () => {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", H);
    };
  }, [T, i, o, s, u, f]);
  const A = (M) => (H) => {
    H.preventDefault(), H.stopPropagation(), j.current = M;
  }, O = (M) => {
    !p || M.target.closest("[data-handle]") || p(T(M.clientX));
  }, R = (M) => (H) => {
    const z = H.shiftKey ? 100 : H.ctrlKey ? 1 : 10;
    let F = 0;
    if (H.key === "ArrowLeft") F = -z;
    else if (H.key === "ArrowRight") F = z;
    else return;
    H.preventDefault(), M === "start" ? u(tc(s + F, 0, o - 1)) : f(tc(o + F, s + 1, i));
  }, V = If(s, i), X = If(o, i), ie = If(g, i);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: S,
      className: $6,
      style: { height: v },
      onPointerDown: O,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: w,
            width: b,
            height: v,
            className: B6,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ c.jsx("div", { className: Zb, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ c.jsx("div", { className: Zb, role: "alert", children: N.error }),
        /* @__PURE__ */ c.jsx("div", { className: Qb, style: { left: 0, width: `${V}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Qb,
            style: { left: `${X}%`, right: 0, width: `${100 - X}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Pb,
            style: { left: `${V}%` },
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
              /* @__PURE__ */ c.jsx("span", { className: Kb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Xb, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Pb,
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
              /* @__PURE__ */ c.jsx("span", { className: Kb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: Xb, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: V6,
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
function If(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function tc(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function I6(t, a, i, s) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, s), !a || a.length === 0)) return;
  const u = s / 2;
  o.fillStyle = F6(t, "--color-primary", "#ba9eff");
  const f = Math.min(a.length, i);
  for (let m = 0; m < f; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (s - 4));
    o.fillRect(m, u - p / 2, 1, p);
  }
}
function F6(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var Y6 = "r8lfsm0", G6 = "r8lfsm1", P6 = "r8lfsm2", K6 = "r8lfsm3", X6 = "r8lfsm4", Q6 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, Z6 = "_1b1zchy3", J6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, W6 = "_1b1zchy6", e8 = "_1b1zchy7";
const PS = y.createContext("standalone");
function KS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: s,
  ...o
}) {
  const u = [Q6[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(PS.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: u, style: s, ...o, children: a }) });
}
function XS({
  title: t,
  meta: a,
  children: i,
  className: s,
  titleId: o
}) {
  const u = y.useContext(PS), f = [Z6, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: f, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: J6[u], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: W6, children: a }) : null,
    i
  ] });
}
function QS({
  children: t,
  className: a,
  role: i = "group"
}) {
  const s = [e8, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: s, role: i, children: t });
}
const Jb = -16, t8 = 80, n8 = 720;
function a8(t) {
  const { deploymentId: a, runId: i, utterance: s, audioUrl: o, onApplied: u, onError: f, onCancel: m } = t, g = s.durationMs ?? 0, [p, b] = y.useState(() => Wb(g)), [v, w] = y.useState(Hc), [S, j] = y.useState(!1), [N, C] = y.useState(!1), [T, A] = y.useState(null), [O, R] = y.useState(!1), V = y.useRef(null), X = y.useRef(null), ie = y.useRef(null);
  y.useEffect(() => {
    const q = Wb(g);
    b(q), w(l1(q)), C(!1), A(null), ie.current = null;
  }, [s.utteranceId, g]);
  const M = y.useCallback((q) => {
    w(q), b((Y) => s1(Y, q));
  }, []);
  y.useEffect(() => () => X.current?.abort(), []), y.useEffect(() => {
    V.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [s.utteranceId]);
  const H = y.useCallback(
    (q) => {
      q.key === "Escape" && (q.stopPropagation(), m());
    },
    [m]
  ), z = y.useMemo(
    () => p.ops.find((q) => q.mode === "trim"),
    [p.ops]
  ), F = z?.start_ms ?? 0, W = z?.end_ms ?? Math.max(1, g), K = y.useCallback((q, Y) => {
    b((ce) => r8(ce, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(q)),
      end_ms: Math.max(Math.floor(q) + 1, Math.floor(Y))
    })));
  }, []), le = y.useCallback((q) => K(q, W), [W, K]), ne = y.useCallback((q) => K(F, q), [F, K]), k = y.useCallback((q) => {
    C(q), b((Y) => {
      const ce = Y.ops.filter((_) => _.mode !== "normalize");
      if (q) {
        const _ = {
          id: _n(),
          mode: "normalize",
          target_lufs: Jb
        };
        return { ...Y, ops: [...ce, _] };
      }
      return { ...Y, ops: ce };
    });
  }, []), U = y.useCallback(async () => {
    const q = Zx(p, g);
    if (q) {
      A(q.message);
      return;
    }
    if (A(null), O) return;
    X.current?.abort();
    const Y = new AbortController();
    X.current = Y, R(!0);
    try {
      const ce = ie.current ?? void 0, _ = await QC(
        a,
        i,
        s.utteranceId,
        ce ? { chain: p, digest_before: ce } : { chain: p },
        { signal: Y.signal }
      );
      if (Y.signal.aborted) return;
      ie.current = _.chain_digest, u(_);
    } catch (ce) {
      if (Y.signal.aborted) return;
      ce instanceof Qi && (ie.current = ce.currentDigest || null);
      const _ = ce instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : ce instanceof Error ? ce.message : "apply failed";
      A(_), f(_);
    } finally {
      Y.signal.aborted || R(!1);
    }
  }, [p, g, O, a, i, s.utteranceId, u, f]);
  return /* @__PURE__ */ c.jsx(KS, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: V, onKeyDown: H, children: [
    /* @__PURE__ */ c.jsx(XS, { title: "Edit segment", meta: `Source · ${nc(g)}` }),
    /* @__PURE__ */ c.jsx(
      GS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: F,
        endMs: W,
        onChangeStart: le,
        onChangeEnd: ne,
        height: t8,
        width: n8
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: Y6, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: G6, children: [
        nc(F),
        " → ",
        nc(W),
        " · ",
        nc(W - F)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: P6, children: [
      /* @__PURE__ */ c.jsxs("label", { className: K6, children: [
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
          Jb.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: X6,
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
      Gh,
      {
        state: v,
        onChange: M,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(QS, { children: [
      /* @__PURE__ */ c.jsx(Fe, { size: "sm", onClick: () => void U(), disabled: O, children: O ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx(Fe, { variant: "ghost", size: "sm", onClick: m, disabled: O, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: T })
  ] }) });
}
function Wb(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function r8(t, a, i) {
  const s = t.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[s] = i(o[s]), { ...t, ops: o };
}
function nc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var i8 = "jq2zyb2", s8 = "jq2zyb3", l8 = "jq2zyb4", o8 = "jq2zyb5", c8 = "jq2zyb6", u8 = "jq2zyb7", d8 = "jq2zyb8", f8 = "jq2zyb9", h8 = "jq2zyba", m8 = "jq2zybb", p8 = "jq2zybc", v8 = "jq2zybd", g8 = "jq2zybe", y8 = "jq2zybf jq2zybe", b8 = "jq2zybg", x8 = "jq2zybh", S8 = "jq2zybi", w8 = "jq2zybj", j8 = "jq2zybk", E8 = "jq2zybl", N8 = "jq2zybm", T8 = "jq2zybn", C8 = "jq2zybo", R8 = "jq2zybp", _8 = "jq2zybq", M8 = "jq2zybr", A8 = "jq2zybs", D8 = "jq2zybt", k8 = "jq2zybu", z8 = "jq2zybv", O8 = "jq2zybw", L8 = "jq2zybx", U8 = "jq2zyby", ex = "jq2zybz", $8 = "jq2zyb10", B8 = "jq2zyb11", V8 = "jq2zyb12";
const H8 = ["cancelled", "failed", "partial"], q8 = 2600;
function I8() {
  const { run: t } = El(), a = es(), [i, s] = y.useState(t), [o, u] = y.useState(!1), [f, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    s(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const R = setTimeout(() => v(null), q8);
    return () => clearTimeout(R);
  }, [b]);
  const w = y.useMemo(() => G8(i), [i]), S = H8.includes(i.status) && i.kind === "batch", j = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      u(!0), m(null);
      try {
        const { runId: R } = await Xx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${R}`);
      } catch (R) {
        m(X8(R));
      } finally {
        u(!1);
      }
    }
  }, C = y.useCallback((R) => {
    p((V) => V === R ? null : R);
  }, []), T = y.useCallback(() => {
    p(null);
  }, []), A = (R, V) => {
    s((X) => Y8(X, R, V)), p(null), v({ message: "Segment edited", severity: "success" });
  }, O = y.useCallback((R) => {
    v({ message: R, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: i8, children: [
    /* @__PURE__ */ c.jsxs("div", { className: s8, children: [
      /* @__PURE__ */ c.jsxs("header", { className: l8, children: [
        /* @__PURE__ */ c.jsxs("p", { className: o8, children: [
          i.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Vh, { to: `/${i.deploymentId}/recipe`, className: c8, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: u8, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: d8, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: f8, children: [
            P8(i.kind),
            /* @__PURE__ */ c.jsx("span", { className: h8, children: i.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Jr, { size: "md", tone: Q8(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: m8, "aria-label": "Run statistics", children: [
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
      S && /* @__PURE__ */ c.jsxs("section", { className: x8, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: S8, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: w8, children: w.failed > 0 ? `${w.failed} line${w.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: j8, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx(Fe, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : w.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        f && /* @__PURE__ */ c.jsx("p", { className: E8, role: "alert", children: f })
      ] }),
      /* @__PURE__ */ c.jsxs(Va, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(nC, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Xr, children: "01 / Utterances" }),
          w.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: N8, children: [
            /* @__PURE__ */ c.jsx("span", { className: T8, children: w.cached }),
            "/",
            w.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: C8, children: i.utterances.map((R) => {
          const V = g === R.utteranceId, X = R.status === "completed" && R.audioArtifactRef !== null && R.audioArtifactRef !== void 0, ie = R.derivedArtifactRef ?? R.audioArtifactRef ?? null, M = ie ? `/api/v1/artifacts/${encodeURIComponent(ie)}/download` : "", H = (R.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: _8, children: [
            /* @__PURE__ */ c.jsxs("div", { className: R8, children: [
              /* @__PURE__ */ c.jsxs("span", { className: A8, children: [
                "#",
                R.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: D8, title: R.characterDisplay, children: R.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: k8, title: R.text, children: R.text }),
              /* @__PURE__ */ c.jsxs("span", { className: z8, children: [
                R.cacheHit && /* @__PURE__ */ c.jsx("span", { className: O8, children: "cached" }),
                H && /* @__PURE__ */ c.jsx("span", { className: M8, children: "edited" }),
                R.durationMs ? /* @__PURE__ */ c.jsx("span", { children: K8(R.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Jr, { tone: Z8(R.status), children: R.status }),
                X && /* @__PURE__ */ c.jsx(
                  Fe,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => C(R.utteranceId),
                    "aria-expanded": V,
                    "aria-label": V ? "Close segment editor" : "Edit segment",
                    children: V ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            V && M && i.deploymentId && /* @__PURE__ */ c.jsx(
              a8,
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
      F8(i, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: V8,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function F8(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const s = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: L8, children: a ? /* @__PURE__ */ c.jsxs("div", { className: $8, children: [
    /* @__PURE__ */ c.jsx("p", { className: B8, children: s }),
    /* @__PURE__ */ c.jsxs(
      Fe,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: ex, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: U8,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: ex, children: "↓" })
      ]
    }
  ) : null });
}
function Y8(t, a, i) {
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
      className: p8,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: v8, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: i ? y8 : g8, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: b8, "aria-hidden": "true" })
      ]
    }
  );
}
function G8(t) {
  const a = t.utterances.length, i = t.utterances.filter((f) => f.status === "completed").length, s = t.utterances.filter(
    (f) => f.status === "failed" || f.status === "cancelled"
  ).length, o = t.utterances.filter((f) => f.cacheHit).length, u = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: s, cached: o, cacheRatio: u };
}
function P8(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function K8(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function X8(t) {
  return t instanceof ts ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function Q8(t) {
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
function Z8(t) {
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
var J8 = "pcphqj2", W8 = "pcphqj3", eU = "pcphqj4", tU = "pcphqj5", nU = "pcphqj6", aU = "pcphqj7", rU = "pcphqj8", iU = "pcphqj9", sU = "pcphqja", tx = "pcphqjb", lU = "pcphqjc", oU = "pcphqjd", cU = "pcphqje pcphqjd", uU = "pcphqjf", dU = "pcphqjg", fU = "pcphqjh", hU = "pcphqji", mU = "pcphqjj pcphqji", pU = "pcphqjk pcphqji", vU = "pcphqjl pcphqji", gU = "pcphqjm", Ff = "pcphqjn", Yf = "pcphqjo";
function yU() {
  const [t, a] = y.useState(null), [i, s] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const u = async () => {
      try {
        const m = await bt("/runtime/queue");
        o || (a(m.entries), s(null));
      } catch (m) {
        o || s(m instanceof Error ? m.message : "Unknown error");
      }
    };
    u();
    const f = setInterval(() => void u(), 3e3);
    return () => {
      o = !0, clearInterval(f);
    };
  }, []), /* @__PURE__ */ c.jsx("main", { className: J8, children: /* @__PURE__ */ c.jsxs("div", { className: W8, children: [
    /* @__PURE__ */ c.jsxs("header", { className: eU, children: [
      /* @__PURE__ */ c.jsx("p", { className: tU, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: nU, children: [
        /* @__PURE__ */ c.jsx("h1", { className: aU, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: rU, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: iU, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Va, { density: "compact", children: /* @__PURE__ */ c.jsx(Bc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Va, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Xr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: sU, children: t.map((o) => {
        const u = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: u ? `${tx} ${lU}` : tx,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: u ? cU : oU, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: uU, children: [
                /* @__PURE__ */ c.jsx("span", { className: dU, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: fU, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: bU(o.kind), children: xU(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: gU, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Ff, children: SU(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Ff, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Ff, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: Yf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function bU(t) {
  switch (t) {
    case "batch":
      return mU;
    case "test_line":
      return pU;
    case "resume":
      return vU;
    default:
      return hU;
  }
}
function xU(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function SU(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function wU() {
  const { deploymentId: t, prefillCharacterName: a } = El(), i = es(), [s, o] = y.useState(a), [u, f] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, w] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => {
    S.current?.scrollIntoView({ behavior: "smooth", block: "center" }), S.current?.focus();
  }, []);
  const j = async (N) => {
    N.preventDefault(), b(!0), w(null);
    try {
      await Hh(t, {
        characterName: s,
        speakerVoiceAssetId: u,
        defaultEmotionMode: m
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
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (N) => g(N.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx(Fe, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: v })
    ] })
  ] });
}
var jU = "_1oor31e0", EU = "_1oor31e1", NU = "_1oor31e2", TU = "_1oor31e3", CU = "_1oor31e4", RU = "_1oor31e5", _U = "_1oor31e6", MU = "_1oor31e7", AU = "_1oor31e8";
const DU = 8;
function kU(t) {
  const { entries: a, loading: i, error: s } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: jU, "aria-busy": !!i, children: [
    s && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: s }),
    i && !s && /* @__PURE__ */ c.jsx("div", { className: AU, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !s && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: MU, children: "No edits yet" }),
    !i && !s && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: EU, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: NU, children: [
      /* @__PURE__ */ c.jsx("span", { className: TU, children: OU(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: CU, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: RU, title: o.digest_after, children: zU(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: _U, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function zU(t) {
  return t ? `${t.slice(0, DU)}…` : "—";
}
function OU(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var nx = "_1c63kaw0", LU = "_1c63kaw1", UU = "_1c63kaw2", $U = "_1c63kaw3", BU = "_1c63kaw4", VU = "_1c63kaw5", HU = "_1c63kaw6";
function qU({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: nx, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: LU, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: nx, "data-testid": "edit-chain-list", children: t.ops.map((i, s) => /* @__PURE__ */ c.jsxs("li", { className: UU, children: [
    /* @__PURE__ */ c.jsxs("span", { className: $U, "aria-hidden": "true", children: [
      s + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: BU, children: [
      /* @__PURE__ */ c.jsx("span", { className: VU, children: ax(i) }),
      /* @__PURE__ */ c.jsx("span", { className: HU, children: IU(i) })
    ] }),
    /* @__PURE__ */ c.jsx(
      Fe,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${ax(i)} (position ${s + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function ax(t) {
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
function IU(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${rx(t.start_ms)} → ${rx(t.end_ms)}`;
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
      return `${Gf(t.low_db)} / ${Gf(t.mid_db)} / ${Gf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function Gf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function rx(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", Pf = "_1o3ytop1", ix = "_1o3ytop2", FU = "_1o3ytop3", YU = "_1o3ytop4", GU = "_1o3ytop5", PU = "_1o3ytop6", KU = "_1o3ytop7", ic = "_1o3ytop8", XU = "_1o3ytop9", QU = "_1o3ytopf", ZU = "_1o3ytopg", JU = "_1o3ytoph", WU = "_1o3ytopi", e$ = "_1o3ytopj", t$ = "_1o3ytopk", n$ = "_1t0zy2f0", a$ = "_1t0zy2f1", r$ = "_1t0zy2f2";
function i$({ content: t, children: a, delayMs: i = 350 }) {
  const [s, o] = y.useState(!1), u = y.useId(), f = y.useRef(null), m = y.useCallback(() => {
    f.current != null && (window.clearTimeout(f.current), f.current = null);
  }, []), g = y.useCallback(() => {
    m(), f.current = window.setTimeout(() => o(!0), i);
  }, [m, i]), p = y.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (y.useEffect(() => () => m(), [m]), y.useEffect(() => {
    if (!s) return;
    const v = (w) => {
      w.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [s]), !y.isValidElement(a))
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: g,
    onMouseLeave: p,
    onFocus: g,
    onBlur: p,
    "aria-describedby": s ? u : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: n$, children: [
    y.cloneElement(a, b),
    s && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: u, className: r$, children: t })
  ] });
}
function sc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(i$, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: a$, children: "?" }) });
}
const sx = -16;
function s$(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: s = [],
    onChainPersisted: o,
    onError: u
  } = t, f = a.durationMs ?? 0, m = y.useMemo(
    () => l$(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => Kf(f)), [b, v] = y.useState(Hc), [w, S] = y.useState(!1), [j, N] = y.useState(null), [C, T] = y.useState(null), [A, O] = y.useState(!1), [R, V] = y.useState(!1), [X, ie] = y.useState(!1), [M, H] = y.useState(null), [z, F] = y.useState([]), [W, K] = y.useState(null), [le, ne] = y.useState([]), [k, U] = y.useState(!1), [q, Y] = y.useState(null), [ce, _] = y.useState(0), te = y.useRef(null), ae = y.useRef(null), G = y.useRef(null), $ = y.useRef(null), ee = y.useRef(null), ue = y.useRef(0), pe = y.useMemo(
    () => g.ops.some((xe) => xe.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const xe = Kf(f);
    p(xe), v(l1(xe)), N(null), ie(!1), F([]), K(null), ee.current = null;
  }, [a.voiceAssetId, f]);
  const Ce = y.useCallback((xe) => {
    v(xe), p((Oe) => s1(Oe, xe));
  }, []);
  y.useEffect(() => {
    $.current?.abort();
    const xe = new AbortController();
    return $.current = xe, U(!0), Y(null), dc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: xe.signal
    }).then((Oe) => {
      xe.signal.aborted || ne(Oe.entries);
    }).catch((Oe) => {
      if (xe.signal.aborted) return;
      const Ze = Oe instanceof Error ? Oe.message : "audit fetch failed";
      Y(Ze);
    }).finally(() => {
      xe.signal.aborted || U(!1);
    }), () => xe.abort();
  }, [i, a.voiceAssetId, ce]), y.useEffect(() => () => {
    C && URL.revokeObjectURL(C);
  }, [C]), y.useEffect(() => () => {
    ae.current?.abort(), G.current?.abort(), $.current?.abort();
  }, []);
  const ot = g.ops.find((xe) => xe.mode === "trim"), je = g.ops.find((xe) => xe.mode === "normalize"), tt = ot?.start_ms ?? 0, Be = ot?.end_ms ?? Math.max(1, f), $e = y.useCallback((xe, Oe) => {
    p(
      (Ze) => lx(
        Ze,
        "trim",
        (it) => ({
          ...it,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(xe)),
          end_ms: Math.max(Math.floor(xe) + 1, Math.floor(Oe))
        })
      )
    );
  }, []), Zt = y.useCallback(
    (xe) => $e(xe, Be),
    [Be, $e]
  ), Nt = y.useCallback(
    (xe) => $e(tt, xe),
    [tt, $e]
  ), kt = y.useCallback((xe) => {
    p((Oe) => {
      const Ze = Oe.ops.filter((it) => it.mode !== "normalize");
      if (xe) {
        const it = {
          id: _n(),
          mode: "normalize",
          target_lufs: sx
        };
        return { ...Oe, ops: [...Ze, it] };
      }
      return { ...Oe, ops: Ze };
    });
  }, []), ra = y.useCallback(
    (xe) => {
      const Oe = g.ops.findIndex((Rt) => Rt.id === xe);
      if (Oe === -1) return;
      const Ze = g.ops[Oe];
      if (!Ze) return;
      const it = [...g.ops.slice(0, Oe), ...g.ops.slice(Oe + 1)];
      p({ ...g, ops: it }), F((Rt) => [...Rt, { op: Ze, index: Oe }]);
    },
    [g]
  ), xt = y.useCallback(() => {
    const xe = z[z.length - 1];
    if (!xe) return;
    const Oe = Math.min(xe.index, g.ops.length), Ze = [...g.ops.slice(0, Oe), xe.op, ...g.ops.slice(Oe)];
    p({ ...g, ops: Ze }), F(z.slice(0, -1));
  }, [g, z]), en = y.useCallback(() => {
    const xe = Zx(g, f);
    return xe ? (N(xe.message), !1) : (N(null), !0);
  }, [g, f]), yn = y.useCallback(async () => {
    if (!en() || A) return;
    ae.current?.abort();
    const xe = new AbortController();
    ae.current = xe;
    const Oe = ++ue.current;
    V(!0);
    try {
      const Ze = await JC(a.voiceAssetId, i, g, {
        signal: xe.signal
      });
      if (xe.signal.aborted || Oe !== ue.current) return;
      C && URL.revokeObjectURL(C);
      const it = URL.createObjectURL(Ze);
      T(it), ie(!0), requestAnimationFrame(() => te.current?.play().catch(() => {
      }));
    } catch (Ze) {
      if (xe.signal.aborted) return;
      const it = Ze instanceof Error ? Ze.message : "preview failed";
      N(it), u(it);
    } finally {
      xe.signal.aborted || V(!1);
    }
  }, [en, A, a.voiceAssetId, i, g, C, u]), zt = y.useCallback(async () => {
    if (!en() || R || A) return;
    if (s.length > 1) {
      const Oe = s.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${s.length} characters: ${Oe}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    ae.current?.abort(), G.current?.abort();
    const xe = new AbortController();
    G.current = xe, O(!0);
    try {
      const Oe = ee.current ?? void 0, Ze = await Qx(
        a.voiceAssetId,
        i,
        Oe ? { chain: g, digest_before: Oe } : { chain: g },
        { signal: xe.signal }
      );
      if (xe.signal.aborted) return;
      ee.current = Ze.chain_digest, K(Ze.chain_digest), N(null), H(Ze.measured_lufs ?? null), F([]), o(Ze), _((it) => it + 1);
    } catch (Oe) {
      if (xe.signal.aborted) return;
      const Ze = Oe instanceof Qi;
      Oe instanceof Qi && (ee.current = Oe.currentDigest || null);
      const it = Ze ? "Edit chain has changed in another tab. Reload to continue." : Oe instanceof Error ? Oe.message : "apply failed";
      N(it), u(it);
    } finally {
      xe.signal.aborted || O(!1);
    }
  }, [
    en,
    R,
    A,
    s,
    a.voiceAssetId,
    i,
    g,
    o,
    u
  ]), bn = y.useCallback(() => {
    ae.current?.abort(), p(Kf(f)), N(null), H(null), ie(!1), F([]), _((xe) => xe + 1), C && (URL.revokeObjectURL(C), T(null));
  }, [f, C]), Ot = y.useCallback((xe) => {
    p(
      (Oe) => lx(
        Oe,
        "normalize",
        (Ze) => ({
          ...Ze,
          mode: "normalize",
          target_lufs: xe
        })
      )
    );
  }, []);
  return /* @__PURE__ */ c.jsxs(KS, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      XS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lc(f)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      GS,
      {
        audioUrl: m,
        durationMs: Math.max(1, f),
        startMs: tt,
        endMs: Be,
        onChangeStart: Zt,
        onChangeEnd: Nt
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Pf, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          sc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: ix, children: [
        lc(tt),
        " → ",
        lc(Be),
        " · ",
        lc(Be - tt)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: KU, children: [
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Pf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          pe && je && /* @__PURE__ */ c.jsxs("span", { className: QU, children: [
            "target ",
            je.target_lufs.toFixed(1),
            " LUFS",
            M !== null && ` · measured ${M.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: XU, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: pe,
              onChange: (xe) => kt(xe.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            sx.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        pe && je && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: JU,
            min: -30,
            max: -6,
            step: 0.5,
            value: je.target_lufs,
            onChange: (xe) => Ot(Number(xe.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Pf, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: ix, children: g.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(qU, { chain: g, onRemoveOp: ra })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: FU,
            onClick: () => S((xe) => !xe),
            "aria-expanded": w,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: YU, "aria-hidden": "true", children: w ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: GU, children: "gain · EQ · pitch · fade · silence trim" }),
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
          Gh,
          {
            state: b,
            onChange: Ce,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      W && /* @__PURE__ */ c.jsx("div", { className: ic, children: /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: PU, title: W, children: [
          W.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(QS, { children: [
      /* @__PURE__ */ c.jsx(
        Fe,
        {
          variant: "secondary",
          onClick: () => void yn(),
          disabled: R || A,
          children: R ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Fe,
        {
          onClick: () => void zt(),
          disabled: A || R,
          children: A ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        Fe,
        {
          variant: "ghost",
          onClick: bn,
          disabled: A || R,
          children: "Reset"
        }
      ),
      z.length > 0 && /* @__PURE__ */ c.jsxs(
        Fe,
        {
          variant: "ghost",
          size: "sm",
          onClick: xt,
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
          className: t$,
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
        className: ZU,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(Rn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: WU, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: e$, children: [
        "Edit history",
        le.length > 0 ? ` · ${le.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        kU,
        {
          entries: le,
          loading: k,
          error: q
        }
      )
    ] })
  ] });
}
function Kf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: _n(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function lx(t, a, i) {
  const s = t.ops.findIndex((u) => u.mode === a);
  if (s === -1) {
    const u = { id: _n(), mode: a };
    return { ...t, ops: [...t.ops, i(u)] };
  }
  const o = [...t.ops];
  return o[s] = i(o[s]), { ...t, ops: o };
}
function lc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function l$(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var o$ = "go9vi12", c$ = "go9vi13", u$ = "go9vi14", d$ = "go9vi15", f$ = "go9vi16", h$ = "go9vi17", m$ = "go9vi18", p$ = "go9vi19", v$ = "go9vi1a", g$ = "go9vi1b go9vi1a", y$ = "go9vi1c", b$ = "go9vi1d", x$ = "go9vi1e", S$ = "go9vi1f", w$ = "go9vi1g", j$ = "go9vi1h", E$ = "go9vi1i", N$ = "go9vi1j", ox = "go9vi1k", T$ = "go9vi1l", C$ = "go9vi1m", R$ = "go9vi1n", kc = "go9vi1o", _$ = "go9vi1q", M$ = "go9vi1r go9vi1q", A$ = "go9vi1s go9vi1q", D$ = "go9vi1t", k$ = "go9vi1u", z$ = "go9vi1v", O$ = "go9vi1w", ZS = "go9vi1x", L$ = "go9vi1y", U$ = "go9vi1z", $$ = "go9vi110 go9vi1o", B$ = "go9vi111", V$ = "go9vi112", H$ = "go9vi113", q$ = "go9vi114", I$ = "go9vi115", F$ = "go9vi116";
function Y$() {
  const { deployment: t, mappings: a, voiceAssets: i } = El(), s = es(), [o, u] = y.useState(a), [f, m] = y.useState(i), [g, p] = y.useState(
    a[0]?.mappingId ?? null
  ), [b, v] = y.useState(""), [w, S] = y.useState(null), [j, N] = y.useState(null), [C, T] = y.useState(null), [A, O] = y.useState(null), [R, V] = y.useState(0), X = y.useCallback(() => {
    s(`/${t.deploymentId}/recipe`);
  }, [s, t.deploymentId]), ie = y.useCallback((G) => {
    O(G), window.setTimeout(() => {
      O(($) => $ === G ? null : $);
    }, 1600);
  }, []), M = y.useMemo(() => {
    const G = /* @__PURE__ */ new Map();
    for (const $ of f) G.set($.voiceAssetId, $);
    return G;
  }, [f]), H = y.useMemo(() => {
    const G = b.trim().toLowerCase();
    return G ? o.filter(($) => $.characterName.toLowerCase().includes(G)) : o;
  }, [o, b]), z = y.useMemo(
    () => o.find((G) => G.mappingId === g) ?? null,
    [o, g]
  );
  y.useEffect(() => {
    u(a), m(i), p(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!j) return;
    const G = setTimeout(() => N(null), 2600);
    return () => clearTimeout(G);
  }, [j]);
  const F = y.useCallback(async () => {
    const G = await Xi(t.deploymentId);
    m(G.voiceAssets);
  }, [t.deploymentId]), W = y.useCallback(
    (G) => {
      u(
        ($) => $.map((ee) => ee.mappingId === g ? { ...ee, ...G } : ee)
      );
    },
    [g]
  ), K = y.useCallback(
    async (G) => {
      if (!z) return;
      const $ = z;
      try {
        const ee = await ul(t.deploymentId, z.mappingId, G);
        u((ue) => ue.map((pe) => pe.mappingId === ee.mappingId ? ee : pe)), Object.prototype.hasOwnProperty.call(G, "characterName") && ie(ee.mappingId);
      } catch (ee) {
        u(
          (ue) => ue.map((pe) => pe.mappingId === $.mappingId ? $ : pe)
        ), S(vr(ee));
      }
    },
    [z, t.deploymentId, ie]
  ), le = y.useCallback(async () => {
    const G = f[0];
    if (!G) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const $ = J$(o), ee = await Hh(t.deploymentId, {
        characterName: $,
        speakerVoiceAssetId: G.voiceAssetId
      });
      u((ue) => [...ue, ee]), p(ee.mappingId), V((ue) => ue + 1);
    } catch ($) {
      S(vr($));
    }
  }, [t.deploymentId, f, o]), ne = y.useCallback(() => {
    z && T({ id: z.mappingId, name: z.characterName });
  }, [z]), k = y.useCallback(async () => {
    if (!C) return;
    const { id: G, name: $ } = C;
    T(null);
    try {
      await Kx(t.deploymentId, G), u((ee) => ee.filter((ue) => ue.mappingId !== G)), p(null), N(`Mapping for ${$} deactivated.`);
    } catch (ee) {
      S(vr(ee));
    }
  }, [t.deploymentId, C]), U = y.useCallback(
    async (G, $, ee) => {
      try {
        const ue = await bc(t.deploymentId, G, $, ee);
        return m((pe) => [ue, ...pe]), N(`${ue.displayName} uploaded.`), ue;
      } catch (ue) {
        return S(vr(ue)), null;
      }
    },
    [t.deploymentId]
  ), q = y.useCallback(async () => {
    try {
      const G = await $T(t.deploymentId);
      a9(G, `${t.deploymentId}-mappings.json`), N("Mappings exported to JSON.");
    } catch (G) {
      S(vr(G));
    }
  }, [t.deploymentId]), Y = y.useCallback(
    async (G, $) => {
      try {
        const ee = await BT(
          t.deploymentId,
          G.mappings,
          $
        );
        N(
          `Imported ${ee.created.length} • skipped ${ee.skipped.length} • replaced ${ee.replaced.length}.`
        );
        const ue = await Xi(t.deploymentId);
        m(ue.voiceAssets);
      } catch (ee) {
        S(vr(ee));
      }
    },
    [t.deploymentId]
  ), ce = y.useCallback(
    async (G) => {
      if (await F(), z && G.chain_digest)
        try {
          const $ = await ul(t.deploymentId, z.mappingId, {
            voiceAssetChainDigest: G.chain_digest
          });
          u(
            (ee) => ee.map((ue) => ue.mappingId === $.mappingId ? $ : ue)
          );
        } catch ($) {
          S(vr($));
        }
      N("Edit applied.");
    },
    [F, z, t.deploymentId]
  ), _ = y.useCallback((G) => {
    S(G);
  }, []), te = y.useCallback(
    async (G, $) => {
      if (!z) return null;
      const ee = G.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await IT(t.deploymentId, {
          line: ee,
          outputFormat: $
        })).runId };
      } catch (ue) {
        return S(vr(ue)), null;
      }
    },
    [t.deploymentId, z]
  ), ae = f.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: o$, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: c$, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: u$,
          onClick: X,
          children: "← Back to recipe"
        }
      ),
      /* @__PURE__ */ c.jsxs("header", { className: d$, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: f$, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: h$, children: [
            o.length,
            " active · ",
            f.length,
            " ",
            ae
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(Fe, { variant: "primary", size: "sm", onClick: le, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: m$,
          placeholder: "Search characters",
          value: b,
          onChange: (G) => v(G.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(Z$, { onExport: q, onImport: Y, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: p$, children: H.length === 0 ? /* @__PURE__ */ c.jsx(
        Bc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : H.map((G) => {
        const $ = M.get(G.speakerVoiceAssetId), ee = G.mappingId === g;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: ee ? g$ : v$,
            onClick: () => p(G.mappingId),
            "aria-pressed": ee,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: y$, "aria-hidden": "true", children: W$(G.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: b$, children: [
                /* @__PURE__ */ c.jsx("span", { className: x$, children: G.characterName }),
                /* @__PURE__ */ c.jsx("span", { className: S$, children: $?.displayName ?? "no voice" })
              ] })
            ]
          },
          G.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: w$, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(hm, { features: gm, children: /* @__PURE__ */ c.jsx(NS, { children: j && /* @__PURE__ */ c.jsx(
        vm.div,
        {
          className: L$,
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
        /* @__PURE__ */ c.jsx(Fe, { variant: "danger", size: "sm", onClick: () => void k(), children: "Delete" }),
        /* @__PURE__ */ c.jsx(Fe, { variant: "ghost", size: "sm", onClick: () => T(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ c.jsx(
        P$,
        {
          deploymentId: t.deploymentId,
          mapping: z,
          voiceAssets: f,
          allMappings: o,
          onNameChange: (G) => {
            W({ characterName: G });
          },
          onNameSave: (G) => {
            const $ = G.trim();
            $ && K({ characterName: $ });
          },
          savedHint: A === z.mappingId,
          autoFocusNonce: R,
          onSpeakerChange: (G) => {
            W({ speakerVoiceAssetId: G }), K({ speakerVoiceAssetId: G });
          },
          onDelete: ne,
          onUploadVoice: async (G, $, ee) => {
            const ue = await U(G, $, ee);
            return ue && ee === "speaker" && (W({ speakerVoiceAssetId: ue.voiceAssetId }), K({ speakerVoiceAssetId: ue.voiceAssetId })), await F(), ue;
          },
          onTestLine: te,
          onEditChainPersisted: ce,
          onEditError: _
        },
        z.mappingId
      ) : /* @__PURE__ */ c.jsx(
        G$,
        {
          voiceCount: f.length,
          onUploadVoice: async (G) => {
            await U(G, G.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function G$({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Va, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: H$, children: [
      /* @__PURE__ */ c.jsx("p", { className: Xr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: q$, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: I$, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      JS,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Va, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Bc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function P$(t) {
  const { mapping: a, voiceAssets: i, allMappings: s } = t, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, u = y.useMemo(
    () => s.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [s, a.speakerVoiceAssetId]
  ), [f, m] = y.useState(""), [g, p] = y.useState("mp3"), [b, v] = y.useState("idle"), [w, S] = y.useState(null), j = y.useRef(!1), N = y.useRef(null);
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
        const R = await qh(t.deploymentId, A);
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
    /* @__PURE__ */ c.jsxs("header", { className: j$, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Xr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: E$, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: ZS, children: /* @__PURE__ */ c.jsx(Fe, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Va,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: U$,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: $$,
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
              className: kc,
              value: g,
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
            Fe,
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
    /* @__PURE__ */ c.jsxs("div", { className: N$, children: [
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Xr, children: "01 / Identity" }),
        /* @__PURE__ */ c.jsxs("label", { className: R$, children: [
          /* @__PURE__ */ c.jsxs("span", { className: T$, children: [
            /* @__PURE__ */ c.jsx("span", { className: ox, children: "Character name" }),
            t.savedHint && /* @__PURE__ */ c.jsx(
              "span",
              {
                className: C$,
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
      /* @__PURE__ */ c.jsxs(Va, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Xr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: ox, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          K$,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(X$, { voice: o }),
        /* @__PURE__ */ c.jsx(
          JS,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          s$,
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
function K$({
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
function X$({ voice: t }) {
  const a = e9(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: D$, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: t9(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: k$, children: [
      /* @__PURE__ */ c.jsx("div", { className: z$, children: /* @__PURE__ */ c.jsx(hm, { features: gm, children: /* @__PURE__ */ c.jsx(
        vm.div,
        {
          className: O$,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Jr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(Q$, { seed: t.contentSha256 })
  ] });
}
function Q$({ seed: t }) {
  const a = y.useMemo(() => n9(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: B$, "aria-hidden": "true", children: a.map((i, s) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: V$,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${s}`
  )) });
}
function JS({
  label: t,
  onFile: a
}) {
  const [i, s] = y.useState(!1), [o, u] = y.useState(!1), f = y.useRef(null), m = y.useCallback(
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
      className: o ? A$ : i ? M$ : _$,
      onDragOver: (g) => {
        g.preventDefault(), s(!0);
      },
      onDragLeave: () => s(!1),
      onDrop: (g) => {
        g.preventDefault(), s(!1);
        const p = g.dataTransfer.files?.[0];
        p && m(p);
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
              const p = g.currentTarget.files?.[0];
              p && m(p), g.currentTarget.value = "";
            }
          }
        ),
        o ? "Uploading…" : t
      ]
    }
  );
}
function Z$({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [s, o] = y.useState("error"), u = y.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: ZS, children: [
    /* @__PURE__ */ c.jsx(Fe, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: u,
        type: "file",
        accept: "application/json,.json",
        className: F$,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (f) => {
          const m = f.currentTarget.files?.[0];
          if (f.currentTarget.value = "", !!m)
            try {
              const g = await m.text(), p = JSON.parse(g);
              a(p, s);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ c.jsx(Fe, { variant: "secondary", size: "sm", onClick: () => u.current?.click(), children: "Import JSON" }),
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
function J$(t) {
  const a = new Set(t.map((s) => s.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function W$(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function e9(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function t9(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function n9(t, a) {
  const i = [];
  for (let s = 0; s < a; s += 1) {
    const o = t.charCodeAt(s % t.length);
    i.push((o * 31 + s * 7) % 100 / 100);
  }
  return i;
}
function a9(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), s = URL.createObjectURL(i), o = document.createElement("a");
  o.href = s, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(s);
}
function vr(t) {
  return t instanceof ts || t instanceof Error ? t.message : "unknown error";
}
function r9() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await LT();
        return { deployments: t };
      },
      Component: xC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId");
        return FE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: s }, { runs: o }, u] = await Promise.all([
          By(a),
          Vy(a),
          VT(a, { limit: 10 }),
          PT(a)
        ]);
        return { deployment: i, mappings: s, runs: o, workflow: u };
      },
      Component: k6
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), i = Vi(t, "runId");
        return { run: await qh(a, i) };
      },
      Component: I8
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: s }, { voiceAssets: o }] = await Promise.all([
          By(a),
          Vy(a),
          Xi(a)
        ]);
        return { deployment: i, mappings: s, voiceAssets: o };
      },
      Component: Y$
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = Vi(t, "deploymentId"), s = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: s.searchParams.get("character") ?? ""
        };
      },
      Component: wU
    },
    {
      path: "/runtime/queue",
      Component: yU
    }
  ];
}
function Vi(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const cx = "ext-actions-request", i9 = "ext-actions-declare", s9 = "ext-action-state", ux = "ext-action-invoke", Eh = "emotion-tts:navigate", Ii = "emotion-tts.run", dx = "emotion-tts.mappings", l9 = 4e3;
function o9(t, a) {
  let i = null, s = !1;
  const o = () => {
    const j = i?.badge ?? "not_installed";
    return c9(j, s);
  }, u = () => ({
    primary: o(),
    secondary: {
      id: dx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), f = () => {
    t.dispatchEvent(
      new CustomEvent(i9, {
        detail: { actions: u() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(s9, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => f(), p = (j) => {
    const N = j.detail?.id;
    N === Ii ? b() : N === dx && t.dispatchEvent(
      new CustomEvent(Eh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = i?.badge ?? "not_installed", N = j === "ready" || j === "running" || j === "starting";
    s = !0, m();
    try {
      N ? await xM() : await bM();
      try {
        i = await xc();
      } catch {
      }
    } catch {
    } finally {
      s = !1, m();
    }
  };
  t.addEventListener(cx, g), t.addEventListener(ux, p);
  let v = !1;
  const w = async () => {
    try {
      const j = await xc();
      if (v) return;
      i = j, m();
    } catch {
    }
  };
  w();
  const S = window.setInterval(() => void w(), l9);
  return f(), {
    dispose: () => {
      v = !0, window.clearInterval(S), t.removeEventListener(cx, g), t.removeEventListener(ux, p);
    }
  };
}
function c9(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", s = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: Ii,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: Ii,
    label: n1(t),
    icon: "hourglass_top",
    tone: "primary",
    state: "loading"
  } : i ? {
    id: Ii,
    label: "Stop runtime",
    icon: "stop",
    tone: "primary",
    state: "idle",
    tooltip: "Stop the EmotionTTS worker"
  } : s ? {
    id: Ii,
    label: t === "not_installed" ? "Install / Start runtime" : "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle",
    tooltip: "Start the EmotionTTS worker for this deployment"
  } : {
    id: Ii,
    label: "Start runtime",
    icon: "play_arrow",
    tone: "primary",
    state: "idle"
  };
}
const Nh = "emotion-tts-app", u9 = "ext-event", fx = "emotion-tts-stylesheet", hx = ["accent", "density", "card"];
function d9(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function f9() {
  if (typeof document > "u" || document.getElementById(fx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = fx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
f9();
class h9 extends HTMLElement {
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
    this.root = pE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Eh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = o9(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const s = i.detail?.path;
      s && this.router && this.router.navigate(s);
    };
    this.navigateListener = a, this.addEventListener(Eh, a);
  }
  syncTweaksFromBody() {
    for (const a of hx) {
      const i = d9(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: hx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = ZN(r9(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ c.jsx(y.StrictMode, { children: /* @__PURE__ */ c.jsx(WN, { router: i }) })
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
      new CustomEvent(u9, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function m9() {
  typeof customElements > "u" || customElements.get(Nh) || customElements.define(Nh, h9);
}
typeof customElements < "u" && !customElements.get(Nh) && m9();
export {
  m9 as register
};
//# sourceMappingURL=emotion-tts.js.map
