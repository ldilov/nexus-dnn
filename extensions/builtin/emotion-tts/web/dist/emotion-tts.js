function FE(t, a) {
  for (var i = 0; i < a.length; i++) {
    const l = a[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const o in l)
        if (o !== "default" && !(o in t)) {
          const d = Object.getOwnPropertyDescriptor(l, o);
          d && Object.defineProperty(t, o, d.get ? d : {
            enumerable: !0,
            get: () => l[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
function rx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qd = { exports: {} }, Gs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zg;
function YE() {
  if (Zg) return Gs;
  Zg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.fragment");
  function i(l, o, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      d = {};
      for (var m in o)
        m !== "key" && (d[m] = o[m]);
    } else d = o;
    return o = d.ref, {
      $$typeof: t,
      type: l,
      key: h,
      ref: o !== void 0 ? o : null,
      props: d
    };
  }
  return Gs.Fragment = a, Gs.jsx = i, Gs.jsxs = i, Gs;
}
var Jg;
function GE() {
  return Jg || (Jg = 1, Qd.exports = YE()), Qd.exports;
}
var u = GE(), Zd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wg;
function XE() {
  if (Wg) return Le;
  Wg = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function E(_) {
    return _ === null || typeof _ != "object" ? null : (_ = S && _[S] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, N = Object.assign, R = {};
  function T(_, Z, P) {
    this.props = _, this.context = Z, this.refs = R, this.updater = P || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(_, Z) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, Z, "setState");
  }, T.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function k() {
  }
  k.prototype = T.prototype;
  function z(_, Z, P) {
    this.props = _, this.context = Z, this.refs = R, this.updater = P || w;
  }
  var M = z.prototype = new k();
  M.constructor = z, N(M, T.prototype), M.isPureReactComponent = !0;
  var I = Array.isArray;
  function J() {
  }
  var ne = { H: null, A: null, T: null, S: null }, A = Object.prototype.hasOwnProperty;
  function q(_, Z, P) {
    var le = P.ref;
    return {
      $$typeof: t,
      type: _,
      key: Z,
      ref: le !== void 0 ? le : null,
      props: P
    };
  }
  function F(_, Z) {
    return q(_.type, Z, _.props);
  }
  function ie(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function re(_) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(P) {
      return Z[P];
    });
  }
  var te = /\/+/g;
  function ce(_, Z) {
    return typeof _ == "object" && _ !== null && _.key != null ? re("" + _.key) : Z.toString(36);
  }
  function W(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(J, J) : (_.status = "pending", _.then(
          function(Z) {
            _.status === "pending" && (_.status = "fulfilled", _.value = Z);
          },
          function(Z) {
            _.status === "pending" && (_.status = "rejected", _.reason = Z);
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
  function O(_, Z, P, le, fe) {
    var ge = typeof _;
    (ge === "undefined" || ge === "boolean") && (_ = null);
    var Ae = !1;
    if (_ === null) Ae = !0;
    else
      switch (ge) {
        case "bigint":
        case "string":
        case "number":
          Ae = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case t:
            case a:
              Ae = !0;
              break;
            case b:
              return Ae = _._init, O(
                Ae(_._payload),
                Z,
                P,
                le,
                fe
              );
          }
      }
    if (Ae)
      return fe = fe(_), Ae = le === "" ? "." + ce(_, 0) : le, I(fe) ? (P = "", Ae != null && (P = Ae.replace(te, "$&/") + "/"), O(fe, Z, P, "", function(Jt) {
        return Jt;
      })) : fe != null && (ie(fe) && (fe = F(
        fe,
        P + (fe.key == null || _ && _.key === fe.key ? "" : ("" + fe.key).replace(
          te,
          "$&/"
        ) + "/") + Ae
      )), Z.push(fe)), 1;
    Ae = 0;
    var _e = le === "" ? "." : le + ":";
    if (I(_))
      for (var $e = 0; $e < _.length; $e++)
        le = _[$e], ge = _e + ce(le, $e), Ae += O(
          le,
          Z,
          P,
          ge,
          fe
        );
    else if ($e = E(_), typeof $e == "function")
      for (_ = $e.call(_), $e = 0; !(le = _.next()).done; )
        le = le.value, ge = _e + ce(le, $e++), Ae += O(
          le,
          Z,
          P,
          ge,
          fe
        );
    else if (ge === "object") {
      if (typeof _.then == "function")
        return O(
          W(_),
          Z,
          P,
          le,
          fe
        );
      throw Z = String(_), Error(
        "Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ae;
  }
  function C(_, Z, P) {
    if (_ == null) return _;
    var le = [], fe = 0;
    return O(_, le, "", "", function(ge) {
      return Z.call(P, ge, fe++);
    }), le;
  }
  function U(_) {
    if (_._status === -1) {
      var Z = _._result;
      Z = Z(), Z.then(
        function(P) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = P);
        },
        function(P) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = P);
        }
      ), _._status === -1 && (_._status = 0, _._result = Z);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var B = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(Z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, Q = {
    map: C,
    forEach: function(_, Z, P) {
      C(
        _,
        function() {
          Z.apply(this, arguments);
        },
        P
      );
    },
    count: function(_) {
      var Z = 0;
      return C(_, function() {
        Z++;
      }), Z;
    },
    toArray: function(_) {
      return C(_, function(Z) {
        return Z;
      }) || [];
    },
    only: function(_) {
      if (!ie(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return Le.Activity = v, Le.Children = Q, Le.Component = T, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = z, Le.StrictMode = l, Le.Suspense = g, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ne.H.useMemoCache(_);
    }
  }, Le.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, Le.cacheSignal = function() {
    return null;
  }, Le.cloneElement = function(_, Z, P) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var le = N({}, _.props), fe = _.key;
    if (Z != null)
      for (ge in Z.key !== void 0 && (fe = "" + Z.key), Z)
        !A.call(Z, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && Z.ref === void 0 || (le[ge] = Z[ge]);
    var ge = arguments.length - 2;
    if (ge === 1) le.children = P;
    else if (1 < ge) {
      for (var Ae = Array(ge), _e = 0; _e < ge; _e++)
        Ae[_e] = arguments[_e + 2];
      le.children = Ae;
    }
    return q(_.type, fe, le);
  }, Le.createContext = function(_) {
    return _ = {
      $$typeof: h,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: d,
      _context: _
    }, _;
  }, Le.createElement = function(_, Z, P) {
    var le, fe = {}, ge = null;
    if (Z != null)
      for (le in Z.key !== void 0 && (ge = "" + Z.key), Z)
        A.call(Z, le) && le !== "key" && le !== "__self" && le !== "__source" && (fe[le] = Z[le]);
    var Ae = arguments.length - 2;
    if (Ae === 1) fe.children = P;
    else if (1 < Ae) {
      for (var _e = Array(Ae), $e = 0; $e < Ae; $e++)
        _e[$e] = arguments[$e + 2];
      fe.children = _e;
    }
    if (_ && _.defaultProps)
      for (le in Ae = _.defaultProps, Ae)
        fe[le] === void 0 && (fe[le] = Ae[le]);
    return q(_, ge, fe);
  }, Le.createRef = function() {
    return { current: null };
  }, Le.forwardRef = function(_) {
    return { $$typeof: m, render: _ };
  }, Le.isValidElement = ie, Le.lazy = function(_) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: _ },
      _init: U
    };
  }, Le.memo = function(_, Z) {
    return {
      $$typeof: p,
      type: _,
      compare: Z === void 0 ? null : Z
    };
  }, Le.startTransition = function(_) {
    var Z = ne.T, P = {};
    ne.T = P;
    try {
      var le = _(), fe = ne.S;
      fe !== null && fe(P, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(J, B);
    } catch (ge) {
      B(ge);
    } finally {
      Z !== null && P.types !== null && (Z.types = P.types), ne.T = Z;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(_) {
    return ne.H.use(_);
  }, Le.useActionState = function(_, Z, P) {
    return ne.H.useActionState(_, Z, P);
  }, Le.useCallback = function(_, Z) {
    return ne.H.useCallback(_, Z);
  }, Le.useContext = function(_) {
    return ne.H.useContext(_);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(_, Z) {
    return ne.H.useDeferredValue(_, Z);
  }, Le.useEffect = function(_, Z) {
    return ne.H.useEffect(_, Z);
  }, Le.useEffectEvent = function(_) {
    return ne.H.useEffectEvent(_);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(_, Z, P) {
    return ne.H.useImperativeHandle(_, Z, P);
  }, Le.useInsertionEffect = function(_, Z) {
    return ne.H.useInsertionEffect(_, Z);
  }, Le.useLayoutEffect = function(_, Z) {
    return ne.H.useLayoutEffect(_, Z);
  }, Le.useMemo = function(_, Z) {
    return ne.H.useMemo(_, Z);
  }, Le.useOptimistic = function(_, Z) {
    return ne.H.useOptimistic(_, Z);
  }, Le.useReducer = function(_, Z, P) {
    return ne.H.useReducer(_, Z, P);
  }, Le.useRef = function(_) {
    return ne.H.useRef(_);
  }, Le.useState = function(_) {
    return ne.H.useState(_);
  }, Le.useSyncExternalStore = function(_, Z, P) {
    return ne.H.useSyncExternalStore(
      _,
      Z,
      P
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var ey;
function wh() {
  return ey || (ey = 1, Zd.exports = XE()), Zd.exports;
}
var y = wh();
const me = /* @__PURE__ */ rx(y), PE = /* @__PURE__ */ FE({
  __proto__: null,
  default: me
}, [y]);
var Jd = { exports: {} }, Xs = {}, Wd = { exports: {} }, ef = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ty;
function KE() {
  return ty || (ty = 1, (function(t) {
    function a(O, C) {
      var U = O.length;
      O.push(C);
      e: for (; 0 < U; ) {
        var B = U - 1 >>> 1, Q = O[B];
        if (0 < o(Q, C))
          O[B] = C, O[U] = Q, U = B;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function l(O) {
      if (O.length === 0) return null;
      var C = O[0], U = O.pop();
      if (U !== C) {
        O[0] = U;
        e: for (var B = 0, Q = O.length, _ = Q >>> 1; B < _; ) {
          var Z = 2 * (B + 1) - 1, P = O[Z], le = Z + 1, fe = O[le];
          if (0 > o(P, U))
            le < Q && 0 > o(fe, P) ? (O[B] = fe, O[le] = U, B = le) : (O[B] = P, O[Z] = U, B = Z);
          else if (le < Q && 0 > o(fe, U))
            O[B] = fe, O[le] = U, B = le;
          else break e;
        }
      }
      return C;
    }
    function o(O, C) {
      var U = O.sortIndex - C.sortIndex;
      return U !== 0 ? U : O.id - C.id;
    }
    if (t.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      t.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, m = h.now();
      t.unstable_now = function() {
        return h.now() - m;
      };
    }
    var g = [], p = [], b = 1, v = null, S = 3, E = !1, w = !1, N = !1, R = !1, T = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, z = typeof setImmediate < "u" ? setImmediate : null;
    function M(O) {
      for (var C = i(p); C !== null; ) {
        if (C.callback === null) l(p);
        else if (C.startTime <= O)
          l(p), C.sortIndex = C.expirationTime, a(g, C);
        else break;
        C = i(p);
      }
    }
    function I(O) {
      if (N = !1, M(O), !w)
        if (i(g) !== null)
          w = !0, J || (J = !0, re());
        else {
          var C = i(p);
          C !== null && W(I, C.startTime - O);
        }
    }
    var J = !1, ne = -1, A = 5, q = -1;
    function F() {
      return R ? !0 : !(t.unstable_now() - q < A);
    }
    function ie() {
      if (R = !1, J) {
        var O = t.unstable_now();
        q = O;
        var C = !0;
        try {
          e: {
            w = !1, N && (N = !1, k(ne), ne = -1), E = !0;
            var U = S;
            try {
              t: {
                for (M(O), v = i(g); v !== null && !(v.expirationTime > O && F()); ) {
                  var B = v.callback;
                  if (typeof B == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Q = B(
                      v.expirationTime <= O
                    );
                    if (O = t.unstable_now(), typeof Q == "function") {
                      v.callback = Q, M(O), C = !0;
                      break t;
                    }
                    v === i(g) && l(g), M(O);
                  } else l(g);
                  v = i(g);
                }
                if (v !== null) C = !0;
                else {
                  var _ = i(p);
                  _ !== null && W(
                    I,
                    _.startTime - O
                  ), C = !1;
                }
              }
              break e;
            } finally {
              v = null, S = U, E = !1;
            }
            C = void 0;
          }
        } finally {
          C ? re() : J = !1;
        }
      }
    }
    var re;
    if (typeof z == "function")
      re = function() {
        z(ie);
      };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), ce = te.port2;
      te.port1.onmessage = ie, re = function() {
        ce.postMessage(null);
      };
    } else
      re = function() {
        T(ie, 0);
      };
    function W(O, C) {
      ne = T(function() {
        O(t.unstable_now());
      }, C);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, t.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : A = 0 < O ? Math.floor(1e3 / O) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = S;
      }
      var U = S;
      S = C;
      try {
        return O();
      } finally {
        S = U;
      }
    }, t.unstable_requestPaint = function() {
      R = !0;
    }, t.unstable_runWithPriority = function(O, C) {
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
      var U = S;
      S = O;
      try {
        return C();
      } finally {
        S = U;
      }
    }, t.unstable_scheduleCallback = function(O, C, U) {
      var B = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? B + U : B) : U = B, O) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return Q = U + Q, O = {
        id: b++,
        callback: C,
        priorityLevel: O,
        startTime: U,
        expirationTime: Q,
        sortIndex: -1
      }, U > B ? (O.sortIndex = U, a(p, O), i(g) === null && O === i(p) && (N ? (k(ne), ne = -1) : N = !0, W(I, U - B))) : (O.sortIndex = Q, a(g, O), w || E || (w = !0, J || (J = !0, re()))), O;
    }, t.unstable_shouldYield = F, t.unstable_wrapCallback = function(O) {
      var C = S;
      return function() {
        var U = S;
        S = C;
        try {
          return O.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(ef)), ef;
}
var ny;
function QE() {
  return ny || (ny = 1, Wd.exports = KE()), Wd.exports;
}
var tf = { exports: {} }, on = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ay;
function ZE() {
  if (ay) return on;
  ay = 1;
  var t = wh();
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
  var l = {
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
  function d(g, p, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: p,
      implementation: b
    };
  }
  var h = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, p) {
    if (g === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return on.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, on.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return d(g, p, null, b);
  }, on.flushSync = function(g) {
    var p = h.T, b = l.p;
    try {
      if (h.T = null, l.p = 2, g) return g();
    } finally {
      h.T = p, l.p = b, l.d.f();
    }
  }, on.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(g, p));
  }, on.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, on.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? l.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: E
        }
      ) : b === "script" && l.d.X(g, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: E,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, on.preinitModule = function(g, p) {
    if (typeof g == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var b = m(
            p.as,
            p.crossOrigin
          );
          l.d.M(g, {
            crossOrigin: b,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && l.d.M(g);
  }, on.preload = function(g, p) {
    if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin);
      l.d.L(g, b, {
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
  }, on.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        l.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(g);
  }, on.requestFormReset = function(g) {
    l.d.r(g);
  }, on.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, on.useFormState = function(g, p, b) {
    return h.H.useFormState(g, p, b);
  }, on.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, on.version = "19.2.5", on;
}
var ry;
function ix() {
  if (ry) return tf.exports;
  ry = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), tf.exports = ZE(), tf.exports;
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
var iy;
function JE() {
  if (iy) return Xs;
  iy = 1;
  var t = QE(), a = wh(), i = ix();
  function l(e) {
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
  function d(e) {
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
  function h(e) {
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
    if (d(e) !== e)
      throw Error(l(188));
  }
  function p(e) {
    var n = e.alternate;
    if (!n) {
      if (n = d(e), n === null) throw Error(l(188));
      return n !== e ? null : e;
    }
    for (var r = e, s = n; ; ) {
      var c = r.return;
      if (c === null) break;
      var f = c.alternate;
      if (f === null) {
        if (s = c.return, s !== null) {
          r = s;
          continue;
        }
        break;
      }
      if (c.child === f.child) {
        for (f = c.child; f; ) {
          if (f === r) return g(c), e;
          if (f === s) return g(c), n;
          f = f.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== s.return) r = c, s = f;
      else {
        for (var x = !1, j = c.child; j; ) {
          if (j === r) {
            x = !0, r = c, s = f;
            break;
          }
          if (j === s) {
            x = !0, s = c, r = f;
            break;
          }
          j = j.sibling;
        }
        if (!x) {
          for (j = f.child; j; ) {
            if (j === r) {
              x = !0, r = f, s = c;
              break;
            }
            if (j === s) {
              x = !0, s = f, r = c;
              break;
            }
            j = j.sibling;
          }
          if (!x) throw Error(l(189));
        }
      }
      if (r.alternate !== s) throw Error(l(190));
    }
    if (r.tag !== 3) throw Error(l(188));
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
  var v = Object.assign, S = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), z = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), q = Symbol.for("react.activity"), F = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
  function re(e) {
    return e === null || typeof e != "object" ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var te = Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === te ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case N:
        return "Fragment";
      case T:
        return "Profiler";
      case R:
        return "StrictMode";
      case I:
        return "Suspense";
      case J:
        return "SuspenseList";
      case q:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case z:
          return e.displayName || "Context";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case M:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return n = e.displayName || null, n !== null ? n : ce(e.type) || "Memo";
        case A:
          n = e._payload, e = e._init;
          try {
            return ce(e(n));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, B = [], Q = -1;
  function _(e) {
    return { current: e };
  }
  function Z(e) {
    0 > Q || (e.current = B[Q], B[Q] = null, Q--);
  }
  function P(e, n) {
    Q++, B[Q] = e.current, e.current = n;
  }
  var le = _(null), fe = _(null), ge = _(null), Ae = _(null);
  function _e(e, n) {
    switch (P(ge, n), P(fe, e), P(le, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? xg(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = xg(n), e = Sg(n, e);
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
    Z(le), P(le, e);
  }
  function $e() {
    Z(le), Z(fe), Z(ge);
  }
  function Jt(e) {
    e.memoizedState !== null && P(Ae, e);
    var n = le.current, r = Sg(n, e.type);
    n !== r && (P(fe, e), P(le, r));
  }
  function Pt(e) {
    fe.current === e && (Z(le), Z(fe)), Ae.current === e && (Z(Ae), qs._currentValue = U);
  }
  var At, et;
  function pt(e) {
    if (At === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        At = n && n[1] || "", et = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + At + e + et;
  }
  var he = !1;
  function ke(e, n) {
    if (!e || he) return "";
    he = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var oe = function() {
                throw Error();
              };
              if (Object.defineProperty(oe.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(oe, []);
                } catch (ee) {
                  var K = ee;
                }
                Reflect.construct(e, [], oe);
              } else {
                try {
                  oe.call();
                } catch (ee) {
                  K = ee;
                }
                e.call(oe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                K = ee;
              }
              (oe = e()) && typeof oe.catch == "function" && oe.catch(function() {
              });
            }
          } catch (ee) {
            if (ee && K && typeof ee.stack == "string")
              return [ee.stack, K.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = s.DetermineComponentFrameRoot(), x = f[0], j = f[1];
      if (x && j) {
        var L = x.split(`
`), X = j.split(`
`);
        for (c = s = 0; s < L.length && !L[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; c < X.length && !X[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (s === L.length || c === X.length)
          for (s = L.length - 1, c = X.length - 1; 1 <= s && 0 <= c && L[s] !== X[c]; )
            c--;
        for (; 1 <= s && 0 <= c; s--, c--)
          if (L[s] !== X[c]) {
            if (s !== 1 || c !== 1)
              do
                if (s--, c--, 0 > c || L[s] !== X[c]) {
                  var ae = `
` + L[s].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= s && 0 <= c);
            break;
          }
      }
    } finally {
      he = !1, Error.prepareStackTrace = r;
    }
    return (r = e ? e.displayName || e.name : "") ? pt(r) : "";
  }
  function De(e, n) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return pt(e.type);
      case 16:
        return pt("Lazy");
      case 13:
        return e.child !== n && n !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return ke(e.type, !1);
      case 11:
        return ke(e.type.render, !1);
      case 1:
        return ke(e.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function Te(e) {
    try {
      var n = "", r = null;
      do
        n += De(e, r), r = e, e = e.return;
      while (e);
      return n;
    } catch (s) {
      return `
Error generating stack: ` + s.message + `
` + s.stack;
    }
  }
  var bt = Object.prototype.hasOwnProperty, xt = t.unstable_scheduleCallback, dn = t.unstable_cancelCallback, Ht = t.unstable_shouldYield, On = t.unstable_requestPaint, qt = t.unstable_now, ye = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Qe = t.unstable_UserBlockingPriority, nt = t.unstable_NormalPriority, It = t.unstable_LowPriority, Ft = t.unstable_IdlePriority, jr = t.log, sa = t.unstable_setDisableYieldValue, Zn = null, Wt = null;
  function Tt(e) {
    if (typeof jr == "function" && sa(e), Wt && typeof Wt.setStrictMode == "function")
      try {
        Wt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : kn, ei = Math.log, Ha = Math.LN2;
  function kn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
  }
  var va = 256, Jn = 262144, la = 4194304;
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
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var c = 0, f = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var j = s & 134217727;
    return j !== 0 ? (s = j & ~f, s !== 0 ? c = hn(s) : (x &= j, x !== 0 ? c = hn(x) : r || (r = j & ~e, r !== 0 && (c = hn(r))))) : (j = s & ~f, j !== 0 ? c = hn(j) : x !== 0 ? c = hn(x) : r || (r = s & ~e, r !== 0 && (c = hn(r)))), c === 0 ? 0 : n !== 0 && n !== c && (n & f) === 0 && (f = c & -c, r = n & -n, f >= r || f === 32 && (r & 4194048) !== 0) ? n : c;
  }
  function ut(e, n) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & n) === 0;
  }
  function Dt(e, n) {
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
  function Gt() {
    var e = la;
    return la <<= 1, (la & 62914560) === 0 && (la = 4194304), e;
  }
  function wn(e) {
    for (var n = [], r = 0; 31 > r; r++) n.push(e);
    return n;
  }
  function it(e, n) {
    e.pendingLanes |= n, n !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function en(e, n, r, s, c, f) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var j = e.entanglements, L = e.expirationTimes, X = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), oe = 1 << ae;
      j[ae] = 0, L[ae] = -1;
      var K = X[ae];
      if (K !== null)
        for (X[ae] = null, ae = 0; ae < K.length; ae++) {
          var ee = K[ae];
          ee !== null && (ee.lane &= -536870913);
        }
      r &= ~oe;
    }
    s !== 0 && ga(e, s, 0), f !== 0 && c === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(x & ~n));
  }
  function ga(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var s = 31 - Yt(n);
    e.entangledLanes |= n, e.entanglements[s] = e.entanglements[s] | 1073741824 | r & 261930;
  }
  function sn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var s = 31 - Yt(r), c = 1 << s;
      c & n | e[s] & n && (e[s] |= n), r &= ~c;
    }
  }
  function D(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : $(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function $(e) {
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
  function Y(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ue() {
    var e = C.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Fg(e.type));
  }
  function de(e, n) {
    var r = C.p;
    try {
      return C.p = e, n();
    } finally {
      C.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ve = "__reactProps$" + Se, Ee = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Ze = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function dt(e) {
    delete e[pe], delete e[ve], delete e[be], delete e[Re], delete e[Ne];
  }
  function st(e) {
    var n = e[pe];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[Ee] || r[pe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Rg(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = Rg(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
    if (e = e[pe] || e[Ee]) {
      var n = e.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return e;
    }
    return null;
  }
  function Fe(e) {
    var n = e.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return e.stateNode;
    throw Error(l(33));
  }
  function zt(e) {
    var n = e[Ze];
    return n || (n = e[Ze] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function mt(e) {
    e[He] = !0;
  }
  var qa = /* @__PURE__ */ new Set(), Wn = {};
  function Kt(e, n) {
    oa(e, n), oa(e + "Capture", n);
  }
  function oa(e, n) {
    for (Wn[e] = n, e = 0; e < n.length; e++)
      qa.add(n[e]);
  }
  var Nr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ca = {}, Tr = {};
  function ti(e) {
    return bt.call(Tr, e) ? !0 : bt.call(ca, e) ? !1 : Nr.test(e) ? Tr[e] = !0 : (ca[e] = !0, !1);
  }
  function qe(e, n, r) {
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
            var s = n.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              e.removeAttribute(n);
              return;
            }
        }
        e.setAttribute(n, "" + r);
      }
  }
  function Ct(e, n, r) {
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
  function ln(e, n, r, s) {
    if (s === null) e.removeAttribute(r);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(r);
          return;
      }
      e.setAttributeNS(n, r, "" + s);
    }
  }
  function Ot(e) {
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
  function vt(e) {
    var n = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ni(e, n, r) {
    var s = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      n
    );
    if (!e.hasOwnProperty(n) && typeof s < "u" && typeof s.get == "function" && typeof s.set == "function") {
      var c = s.get, f = s.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return c.call(this);
        },
        set: function(x) {
          r = "" + x, f.call(this, x);
        }
      }), Object.defineProperty(e, n, {
        enumerable: s.enumerable
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
      var n = vt(e) ? "checked" : "value";
      e._valueTracker = ni(
        e,
        n,
        "" + e[n]
      );
    }
  }
  function Al(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), s = "";
    return e && (s = vt(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var BS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      BS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fc(e, n, r, s, c, f, x, j) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + Ot(n)) : e.value !== "" + Ot(n) && (e.value = "" + Ot(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Yc(e, x, Ot(n)) : r != null ? Yc(e, x, Ot(r)) : s != null && e.removeAttribute("value"), c == null && f != null && (e.defaultChecked = !!f), c != null && (e.checked = c && typeof c != "function" && typeof c != "symbol"), j != null && typeof j != "function" && typeof j != "symbol" && typeof j != "boolean" ? e.name = "" + Ot(j) : e.removeAttribute("name");
  }
  function mm(e, n, r, s, c, f, x, j) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + Ot(r) : "", n = n != null ? "" + Ot(n) : r, j || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = s ?? c, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = j ? e.checked : !!s, e.defaultChecked = !!s, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ai(e);
  }
  function Yc(e, n, r) {
    n === "number" && Dl(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, n, r, s) {
    if (e = e.options, n) {
      n = {};
      for (var c = 0; c < r.length; c++)
        n["$" + r[c]] = !0;
      for (r = 0; r < e.length; r++)
        c = n.hasOwnProperty("$" + e[r].value), e[r].selected !== c && (e[r].selected = c), c && s && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + Ot(r), n = null, c = 0; c < e.length; c++) {
        if (e[c].value === r) {
          e[c].selected = !0, s && (e[c].defaultSelected = !0);
          return;
        }
        n !== null || e[c].disabled || (n = e[c]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function pm(e, n, r) {
    if (n != null && (n = "" + Ot(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + Ot(r) : "";
  }
  function vm(e, n, r, s) {
    if (n == null) {
      if (s != null) {
        if (r != null) throw Error(l(92));
        if (W(s)) {
          if (1 < s.length) throw Error(l(93));
          s = s[0];
        }
        r = s;
      }
      r == null && (r = ""), n = r;
    }
    r = Ot(n), e.defaultValue = r, s = e.textContent, s === r && s !== "" && s !== null && (e.value = s), ai(e);
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
  var VS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function gm(e, n, r) {
    var s = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? s ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : s ? e.setProperty(n, r) : typeof r != "number" || r === 0 || VS.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function ym(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, r != null) {
      for (var s in r)
        !r.hasOwnProperty(s) || n != null && n.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var c in n)
        s = n[c], n.hasOwnProperty(c) && r[c] !== s && gm(e, c, s);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && gm(e, f, n[f]);
  }
  function Gc(e) {
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
  var $S = /* @__PURE__ */ new Map([
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
  ]), HS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function zl(e) {
    return HS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ya() {
  }
  var Xc = null;
  function Pc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var si = null, li = null;
  function bm(e) {
    var n = St(e);
    if (n && (e = n.stateNode)) {
      var r = e[ve] || null;
      e: switch (e = n.stateNode, n.type) {
        case "input":
          if (Fc(
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
              'input[name="' + Ln(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < r.length; n++) {
              var s = r[n];
              if (s !== e && s.form === e.form) {
                var c = s[ve] || null;
                if (!c) throw Error(l(90));
                Fc(
                  s,
                  c.value,
                  c.defaultValue,
                  c.defaultValue,
                  c.checked,
                  c.defaultChecked,
                  c.type,
                  c.name
                );
              }
            }
            for (n = 0; n < r.length; n++)
              s = r[n], s.form === e.form && Al(s);
          }
          break e;
        case "textarea":
          pm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ri(e, !!r.multiple, n, !1);
      }
    }
  }
  var Kc = !1;
  function xm(e, n, r) {
    if (Kc) return e(n, r);
    Kc = !0;
    try {
      var s = e(n);
      return s;
    } finally {
      if (Kc = !1, (si !== null || li !== null) && (So(), si && (n = si, e = li, li = si = null, bm(n), e)))
        for (n = 0; n < e.length; n++) bm(e[n]);
    }
  }
  function is(e, n) {
    var r = e.stateNode;
    if (r === null) return null;
    var s = r[ve] || null;
    if (s === null) return null;
    r = s[n];
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
        (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function")
      throw Error(
        l(231, n, typeof r)
      );
    return r;
  }
  var ba = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Qc = !1;
  if (ba)
    try {
      var ss = {};
      Object.defineProperty(ss, "passive", {
        get: function() {
          Qc = !0;
        }
      }), window.addEventListener("test", ss, ss), window.removeEventListener("test", ss, ss);
    } catch {
      Qc = !1;
    }
  var Ia = null, Zc = null, Ol = null;
  function Sm() {
    if (Ol) return Ol;
    var e, n = Zc, r = n.length, s, c = "value" in Ia ? Ia.value : Ia.textContent, f = c.length;
    for (e = 0; e < r && n[e] === c[e]; e++) ;
    var x = r - e;
    for (s = 1; s <= x && n[r - s] === c[f - s]; s++) ;
    return Ol = c.slice(e, 1 < s ? 1 - s : void 0);
  }
  function kl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ll() {
    return !0;
  }
  function wm() {
    return !1;
  }
  function mn(e) {
    function n(r, s, c, f, x) {
      this._reactName = r, this._targetInst = c, this.type = s, this.nativeEvent = f, this.target = x, this.currentTarget = null;
      for (var j in e)
        e.hasOwnProperty(j) && (r = e[j], this[j] = r ? r(f) : f[j]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ll : wm, this.isPropagationStopped = wm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = Ll);
      },
      stopPropagation: function() {
        var r = this.nativeEvent;
        r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = Ll);
      },
      persist: function() {
      },
      isPersistent: Ll
    }), n;
  }
  var Cr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ul = mn(Cr), ls = v({}, Cr, { view: 0, detail: 0 }), qS = mn(ls), Jc, Wc, os, Bl = v({}, ls, {
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
    getModifierState: tu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== os && (os && e.type === "mousemove" ? (Jc = e.screenX - os.screenX, Wc = e.screenY - os.screenY) : Wc = Jc = 0, os = e), Jc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Wc;
    }
  }), Em = mn(Bl), IS = v({}, Bl, { dataTransfer: 0 }), FS = mn(IS), YS = v({}, ls, { relatedTarget: 0 }), eu = mn(YS), GS = v({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), XS = mn(GS), PS = v({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), KS = mn(PS), QS = v({}, Cr, { data: 0 }), jm = mn(QS), ZS = {
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
  }, JS = {
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
  }, WS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ew(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = WS[e]) ? !!n[e] : !1;
  }
  function tu() {
    return ew;
  }
  var tw = v({}, ls, {
    key: function(e) {
      if (e.key) {
        var n = ZS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? JS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: tu,
    charCode: function(e) {
      return e.type === "keypress" ? kl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? kl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nw = mn(tw), aw = v({}, Bl, {
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
  }), Nm = mn(aw), rw = v({}, ls, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: tu
  }), iw = mn(rw), sw = v({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lw = mn(sw), ow = v({}, Bl, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), cw = mn(ow), uw = v({}, Cr, {
    newState: 0,
    oldState: 0
  }), dw = mn(uw), fw = [9, 13, 27, 32], nu = ba && "CompositionEvent" in window, cs = null;
  ba && "documentMode" in document && (cs = document.documentMode);
  var hw = ba && "TextEvent" in window && !cs, Tm = ba && (!nu || cs && 8 < cs && 11 >= cs), Cm = " ", Rm = !1;
  function _m(e, n) {
    switch (e) {
      case "keyup":
        return fw.indexOf(n.keyCode) !== -1;
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
  function Mm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function mw(e, n) {
    switch (e) {
      case "compositionend":
        return Mm(n);
      case "keypress":
        return n.which !== 32 ? null : (Rm = !0, Cm);
      case "textInput":
        return e = n.data, e === Cm && Rm ? null : e;
      default:
        return null;
    }
  }
  function pw(e, n) {
    if (oi)
      return e === "compositionend" || !nu && _m(e, n) ? (e = Sm(), Ol = Zc = Ia = null, oi = !1, e) : null;
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
        return Tm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var vw = {
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
  function Am(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!vw[e.type] : n === "textarea";
  }
  function Dm(e, n, r, s) {
    si ? li ? li.push(s) : li = [s] : si = s, n = Ro(n, "onChange"), 0 < n.length && (r = new Ul(
      "onChange",
      "change",
      null,
      r,
      s
    ), e.push({ event: r, listeners: n }));
  }
  var us = null, ds = null;
  function gw(e) {
    mg(e, 0);
  }
  function Vl(e) {
    var n = Fe(e);
    if (Al(n)) return e;
  }
  function zm(e, n) {
    if (e === "change") return n;
  }
  var Om = !1;
  if (ba) {
    var au;
    if (ba) {
      var ru = "oninput" in document;
      if (!ru) {
        var km = document.createElement("div");
        km.setAttribute("oninput", "return;"), ru = typeof km.oninput == "function";
      }
      au = ru;
    } else au = !1;
    Om = au && (!document.documentMode || 9 < document.documentMode);
  }
  function Lm() {
    us && (us.detachEvent("onpropertychange", Um), ds = us = null);
  }
  function Um(e) {
    if (e.propertyName === "value" && Vl(ds)) {
      var n = [];
      Dm(
        n,
        ds,
        e,
        Pc(e)
      ), xm(gw, n);
    }
  }
  function yw(e, n, r) {
    e === "focusin" ? (Lm(), us = n, ds = r, us.attachEvent("onpropertychange", Um)) : e === "focusout" && Lm();
  }
  function bw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Vl(ds);
  }
  function xw(e, n) {
    if (e === "click") return Vl(n);
  }
  function Sw(e, n) {
    if (e === "input" || e === "change")
      return Vl(n);
  }
  function ww(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var En = typeof Object.is == "function" ? Object.is : ww;
  function fs(e, n) {
    if (En(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), s = Object.keys(n);
    if (r.length !== s.length) return !1;
    for (s = 0; s < r.length; s++) {
      var c = r[s];
      if (!bt.call(n, c) || !En(e[c], n[c]))
        return !1;
    }
    return !0;
  }
  function Bm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Vm(e, n) {
    var r = Bm(e);
    e = 0;
    for (var s; r; ) {
      if (r.nodeType === 3) {
        if (s = e + r.textContent.length, e <= n && s >= n)
          return { node: r, offset: n - e };
        e = s;
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
      r = Bm(r);
    }
  }
  function $m(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? $m(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Hm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var n = Dl(e.document); n instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = n.contentWindow;
      else break;
      n = Dl(e.document);
    }
    return n;
  }
  function iu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Ew = ba && "documentMode" in document && 11 >= document.documentMode, ci = null, su = null, hs = null, lu = !1;
  function qm(e, n, r) {
    var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    lu || ci == null || ci !== Dl(s) || (s = ci, "selectionStart" in s && iu(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), hs && fs(hs, s) || (hs = s, s = Ro(su, "onSelect"), 0 < s.length && (n = new Ul(
      "onSelect",
      "select",
      null,
      n,
      r
    ), e.push({ event: n, listeners: s }), n.target = ci)));
  }
  function Rr(e, n) {
    var r = {};
    return r[e.toLowerCase()] = n.toLowerCase(), r["Webkit" + e] = "webkit" + n, r["Moz" + e] = "moz" + n, r;
  }
  var ui = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionrun: Rr("Transition", "TransitionRun"),
    transitionstart: Rr("Transition", "TransitionStart"),
    transitioncancel: Rr("Transition", "TransitionCancel"),
    transitionend: Rr("Transition", "TransitionEnd")
  }, ou = {}, Im = {};
  ba && (Im = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function _r(e) {
    if (ou[e]) return ou[e];
    if (!ui[e]) return e;
    var n = ui[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Im)
        return ou[e] = n[r];
    return e;
  }
  var Fm = _r("animationend"), Ym = _r("animationiteration"), Gm = _r("animationstart"), jw = _r("transitionrun"), Nw = _r("transitionstart"), Tw = _r("transitioncancel"), Xm = _r("transitionend"), Pm = /* @__PURE__ */ new Map(), cu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  cu.push("scrollEnd");
  function ea(e, n) {
    Pm.set(e, n), Kt(n, [e]);
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
  }, Un = [], di = 0, uu = 0;
  function Hl() {
    for (var e = di, n = uu = di = 0; n < e; ) {
      var r = Un[n];
      Un[n++] = null;
      var s = Un[n];
      Un[n++] = null;
      var c = Un[n];
      Un[n++] = null;
      var f = Un[n];
      if (Un[n++] = null, s !== null && c !== null) {
        var x = s.pending;
        x === null ? c.next = c : (c.next = x.next, x.next = c), s.pending = c;
      }
      f !== 0 && Km(r, c, f);
    }
  }
  function ql(e, n, r, s) {
    Un[di++] = e, Un[di++] = n, Un[di++] = r, Un[di++] = s, uu |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s);
  }
  function du(e, n, r, s) {
    return ql(e, n, r, s), Il(e);
  }
  function Mr(e, n) {
    return ql(e, null, null, n), Il(e);
  }
  function Km(e, n, r) {
    e.lanes |= r;
    var s = e.alternate;
    s !== null && (s.lanes |= r);
    for (var c = !1, f = e.return; f !== null; )
      f.childLanes |= r, s = f.alternate, s !== null && (s.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (c = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, c && n !== null && (c = 31 - Yt(r), e = f.hiddenUpdates, s = e[c], s === null ? e[c] = [n] : s.push(n), n.lane = r | 536870912), f) : null;
  }
  function Il(e) {
    if (50 < ks)
      throw ks = 0, xd = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function Cw(e, n, r, s) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function jn(e, n, r, s) {
    return new Cw(e, n, r, s);
  }
  function fu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function xa(e, n) {
    var r = e.alternate;
    return r === null ? (r = jn(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Qm(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Fl(e, n, r, s, c, f) {
    var x = 0;
    if (s = e, typeof e == "function") fu(e) && (x = 1);
    else if (typeof e == "string")
      x = DE(
        e,
        r,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case q:
          return e = jn(31, r, n, c), e.elementType = q, e.lanes = f, e;
        case N:
          return Ar(r.children, c, f, n);
        case R:
          x = 8, c |= 24;
          break;
        case T:
          return e = jn(12, r, n, c | 2), e.elementType = T, e.lanes = f, e;
        case I:
          return e = jn(13, r, n, c), e.elementType = I, e.lanes = f, e;
        case J:
          return e = jn(19, r, n, c), e.elementType = J, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case z:
                x = 10;
                break e;
              case k:
                x = 9;
                break e;
              case M:
                x = 11;
                break e;
              case ne:
                x = 14;
                break e;
              case A:
                x = 16, s = null;
                break e;
            }
          x = 29, r = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), s = null;
      }
    return n = jn(x, r, n, c), n.elementType = e, n.type = s, n.lanes = f, n;
  }
  function Ar(e, n, r, s) {
    return e = jn(7, e, s, n), e.lanes = r, e;
  }
  function hu(e, n, r) {
    return e = jn(6, e, null, n), e.lanes = r, e;
  }
  function Zm(e) {
    var n = jn(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function mu(e, n, r) {
    return n = jn(
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
  var Jm = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Jm.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Te(n)
      }, Jm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Te(n)
    };
  }
  var hi = [], mi = 0, Yl = null, ms = 0, Vn = [], $n = 0, Fa = null, ua = 1, da = "";
  function Sa(e, n) {
    hi[mi++] = ms, hi[mi++] = Yl, Yl = e, ms = n;
  }
  function Wm(e, n, r) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, Fa = e;
    var s = ua;
    e = da;
    var c = 32 - Yt(s) - 1;
    s &= ~(1 << c), r += 1;
    var f = 32 - Yt(n) + c;
    if (30 < f) {
      var x = c - c % 5;
      f = (s & (1 << x) - 1).toString(32), s >>= x, c -= x, ua = 1 << 32 - Yt(n) + c | r << c | s, da = f + e;
    } else
      ua = 1 << f | r << c | s, da = e;
  }
  function pu(e) {
    e.return !== null && (Sa(e, 1), Wm(e, 1, 0));
  }
  function vu(e) {
    for (; e === Yl; )
      Yl = hi[--mi], hi[mi] = null, ms = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = Vn[--$n], Vn[$n] = null, da = Vn[--$n], Vn[$n] = null, ua = Vn[--$n], Vn[$n] = null;
  }
  function ep(e, n) {
    Vn[$n++] = ua, Vn[$n++] = da, Vn[$n++] = Fa, ua = n.id, da = n.overflow, Fa = e;
  }
  var tn = null, gt = null, Ke = !1, Ya = null, Hn = !1, gu = Error(l(519));
  function Ga(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ps(Bn(n, e)), gu;
  }
  function tp(e) {
    var n = e.stateNode, r = e.type, s = e.memoizedProps;
    switch (n[pe] = e, n[ve] = s, r) {
      case "dialog":
        Ge("cancel", n), Ge("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ge("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Us.length; r++)
          Ge(Us[r], n);
        break;
      case "source":
        Ge("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ge("error", n), Ge("load", n);
        break;
      case "details":
        Ge("toggle", n);
        break;
      case "input":
        Ge("invalid", n), mm(
          n,
          s.value,
          s.defaultValue,
          s.checked,
          s.defaultChecked,
          s.type,
          s.name,
          !0
        );
        break;
      case "select":
        Ge("invalid", n);
        break;
      case "textarea":
        Ge("invalid", n), vm(n, s.value, s.defaultValue, s.children);
    }
    r = s.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || s.suppressHydrationWarning === !0 || yg(n.textContent, r) ? (s.popover != null && (Ge("beforetoggle", n), Ge("toggle", n)), s.onScroll != null && Ge("scroll", n), s.onScrollEnd != null && Ge("scrollend", n), s.onClick != null && (n.onclick = ya), n = !0) : n = !1, n || Ga(e, !0);
  }
  function np(e) {
    for (tn = e.return; tn; )
      switch (tn.tag) {
        case 5:
        case 31:
        case 13:
          Hn = !1;
          return;
        case 27:
        case 3:
          Hn = !0;
          return;
        default:
          tn = tn.return;
      }
  }
  function pi(e) {
    if (e !== tn) return !1;
    if (!Ke) return np(e), Ke = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || kd(e.type, e.memoizedProps)), r = !r), r && gt && Ga(e), np(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Cg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Cg(e);
    } else
      n === 27 ? (n = gt, sr(e.type) ? (e = $d, $d = null, gt = e) : gt = n) : gt = tn ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    gt = tn = null, Ke = !1;
  }
  function yu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function ps(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var bu = _(null), zr = null, wa = null;
  function Xa(e, n, r) {
    P(bu, n._currentValue), n._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = bu.current, Z(bu);
  }
  function xu(e, n, r) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Su(e, n, r, s) {
    var c = e.child;
    for (c !== null && (c.return = e); c !== null; ) {
      var f = c.dependencies;
      if (f !== null) {
        var x = c.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var j = f;
          f = c;
          for (var L = 0; L < n.length; L++)
            if (j.context === n[L]) {
              f.lanes |= r, j = f.alternate, j !== null && (j.lanes |= r), xu(
                f.return,
                r,
                e
              ), s || (x = null);
              break e;
            }
          f = j.next;
        }
      } else if (c.tag === 18) {
        if (x = c.return, x === null) throw Error(l(341));
        x.lanes |= r, f = x.alternate, f !== null && (f.lanes |= r), xu(x, r, e), x = null;
      } else x = c.child;
      if (x !== null) x.return = c;
      else
        for (x = c; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (c = x.sibling, c !== null) {
            c.return = x.return, x = c;
            break;
          }
          x = x.return;
        }
      c = x;
    }
  }
  function vi(e, n, r, s) {
    e = null;
    for (var c = n, f = !1; c !== null; ) {
      if (!f) {
        if ((c.flags & 524288) !== 0) f = !0;
        else if ((c.flags & 262144) !== 0) break;
      }
      if (c.tag === 10) {
        var x = c.alternate;
        if (x === null) throw Error(l(387));
        if (x = x.memoizedProps, x !== null) {
          var j = c.type;
          En(c.pendingProps.value, x.value) || (e !== null ? e.push(j) : e = [j]);
        }
      } else if (c === Ae.current) {
        if (x = c.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== c.memoizedState.memoizedState && (e !== null ? e.push(qs) : e = [qs]);
      }
      c = c.return;
    }
    e !== null && Su(
      n,
      e,
      r,
      s
    ), n.flags |= 262144;
  }
  function Gl(e) {
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
    zr = e, wa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nn(e) {
    return ap(zr, e);
  }
  function Xl(e, n) {
    return zr === null && Or(e), ap(e, n);
  }
  function ap(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, wa === null) {
      if (e === null) throw Error(l(308));
      wa = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else wa = wa.next = n;
    return r;
  }
  var Rw = typeof AbortController < "u" ? AbortController : function() {
    var e = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(r, s) {
        e.push(s);
      }
    };
    this.abort = function() {
      n.aborted = !0, e.forEach(function(r) {
        return r();
      });
    };
  }, _w = t.unstable_scheduleCallback, Mw = t.unstable_NormalPriority, kt = {
    $$typeof: z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function wu() {
    return {
      controller: new Rw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function vs(e) {
    e.refCount--, e.refCount === 0 && _w(Mw, function() {
      e.controller.abort();
    });
  }
  var gs = null, Eu = 0, gi = 0, yi = null;
  function Aw(e, n) {
    if (gs === null) {
      var r = gs = [];
      Eu = 0, gi = Td(), yi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          r.push(s);
        }
      };
    }
    return Eu++, n.then(rp, rp), n;
  }
  function rp() {
    if (--Eu === 0 && gs !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = gs;
      gs = null, gi = 0, yi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function Dw(e, n) {
    var r = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(c) {
        r.push(c);
      }
    };
    return e.then(
      function() {
        s.status = "fulfilled", s.value = n;
        for (var c = 0; c < r.length; c++) (0, r[c])(n);
      },
      function(c) {
        for (s.status = "rejected", s.reason = c, c = 0; c < r.length; c++)
          (0, r[c])(void 0);
      }
    ), s;
  }
  var ip = O.S;
  O.S = function(e, n) {
    qv = qt(), typeof n == "object" && n !== null && typeof n.then == "function" && Aw(e, n), ip !== null && ip(e, n);
  };
  var kr = _(null);
  function ju() {
    var e = kr.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Pl(e, n) {
    n === null ? P(kr, kr.current) : P(kr, n.pool);
  }
  function sp() {
    var e = ju();
    return e === null ? null : { parent: kt._currentValue, pool: e };
  }
  var bi = Error(l(460)), Nu = Error(l(474)), Kl = Error(l(542)), Ql = { then: function() {
  } };
  function lp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function op(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(ya, ya), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, up(e), e;
      default:
        if (typeof n.status == "string") n.then(ya, ya);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = n, e.status = "pending", e.then(
            function(s) {
              if (n.status === "pending") {
                var c = n;
                c.status = "fulfilled", c.value = s;
              }
            },
            function(s) {
              if (n.status === "pending") {
                var c = n;
                c.status = "rejected", c.reason = s;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, up(e), e;
        }
        throw Ur = n, bi;
    }
  }
  function Lr(e) {
    try {
      var n = e._init;
      return n(e._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (Ur = r, bi) : r;
    }
  }
  var Ur = null;
  function cp() {
    if (Ur === null) throw Error(l(459));
    var e = Ur;
    return Ur = null, e;
  }
  function up(e) {
    if (e === bi || e === Kl)
      throw Error(l(483));
  }
  var xi = null, ys = 0;
  function Zl(e) {
    var n = ys;
    return ys += 1, xi === null && (xi = []), op(xi, e, n);
  }
  function bs(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Jl(e, n) {
    throw n.$$typeof === S ? Error(l(525)) : (e = Object.prototype.toString.call(n), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function dp(e) {
    function n(H, V) {
      if (e) {
        var G = H.deletions;
        G === null ? (H.deletions = [V], H.flags |= 16) : G.push(V);
      }
    }
    function r(H, V) {
      if (!e) return null;
      for (; V !== null; )
        n(H, V), V = V.sibling;
      return null;
    }
    function s(H) {
      for (var V = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? V.set(H.key, H) : V.set(H.index, H), H = H.sibling;
      return V;
    }
    function c(H, V) {
      return H = xa(H, V), H.index = 0, H.sibling = null, H;
    }
    function f(H, V, G) {
      return H.index = G, e ? (G = H.alternate, G !== null ? (G = G.index, G < V ? (H.flags |= 67108866, V) : G) : (H.flags |= 67108866, V)) : (H.flags |= 1048576, V);
    }
    function x(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function j(H, V, G, se) {
      return V === null || V.tag !== 6 ? (V = hu(G, H.mode, se), V.return = H, V) : (V = c(V, G), V.return = H, V);
    }
    function L(H, V, G, se) {
      var Ce = G.type;
      return Ce === N ? ae(
        H,
        V,
        G.props.children,
        se,
        G.key
      ) : V !== null && (V.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === A && Lr(Ce) === V.type) ? (V = c(V, G.props), bs(V, G), V.return = H, V) : (V = Fl(
        G.type,
        G.key,
        G.props,
        null,
        H.mode,
        se
      ), bs(V, G), V.return = H, V);
    }
    function X(H, V, G, se) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== G.containerInfo || V.stateNode.implementation !== G.implementation ? (V = mu(G, H.mode, se), V.return = H, V) : (V = c(V, G.children || []), V.return = H, V);
    }
    function ae(H, V, G, se, Ce) {
      return V === null || V.tag !== 7 ? (V = Ar(
        G,
        H.mode,
        se,
        Ce
      ), V.return = H, V) : (V = c(V, G), V.return = H, V);
    }
    function oe(H, V, G) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return V = hu(
          "" + V,
          H.mode,
          G
        ), V.return = H, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case E:
            return G = Fl(
              V.type,
              V.key,
              V.props,
              null,
              H.mode,
              G
            ), bs(G, V), G.return = H, G;
          case w:
            return V = mu(
              V,
              H.mode,
              G
            ), V.return = H, V;
          case A:
            return V = Lr(V), oe(H, V, G);
        }
        if (W(V) || re(V))
          return V = Ar(
            V,
            H.mode,
            G,
            null
          ), V.return = H, V;
        if (typeof V.then == "function")
          return oe(H, Zl(V), G);
        if (V.$$typeof === z)
          return oe(
            H,
            Xl(H, V),
            G
          );
        Jl(H, V);
      }
      return null;
    }
    function K(H, V, G, se) {
      var Ce = V !== null ? V.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return Ce !== null ? null : j(H, V, "" + G, se);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            return G.key === Ce ? L(H, V, G, se) : null;
          case w:
            return G.key === Ce ? X(H, V, G, se) : null;
          case A:
            return G = Lr(G), K(H, V, G, se);
        }
        if (W(G) || re(G))
          return Ce !== null ? null : ae(H, V, G, se, null);
        if (typeof G.then == "function")
          return K(
            H,
            V,
            Zl(G),
            se
          );
        if (G.$$typeof === z)
          return K(
            H,
            V,
            Xl(H, G),
            se
          );
        Jl(H, G);
      }
      return null;
    }
    function ee(H, V, G, se, Ce) {
      if (typeof se == "string" && se !== "" || typeof se == "number" || typeof se == "bigint")
        return H = H.get(G) || null, j(V, H, "" + se, Ce);
      if (typeof se == "object" && se !== null) {
        switch (se.$$typeof) {
          case E:
            return H = H.get(
              se.key === null ? G : se.key
            ) || null, L(V, H, se, Ce);
          case w:
            return H = H.get(
              se.key === null ? G : se.key
            ) || null, X(V, H, se, Ce);
          case A:
            return se = Lr(se), ee(
              H,
              V,
              G,
              se,
              Ce
            );
        }
        if (W(se) || re(se))
          return H = H.get(G) || null, ae(V, H, se, Ce, null);
        if (typeof se.then == "function")
          return ee(
            H,
            V,
            G,
            Zl(se),
            Ce
          );
        if (se.$$typeof === z)
          return ee(
            H,
            V,
            G,
            Xl(V, se),
            Ce
          );
        Jl(V, se);
      }
      return null;
    }
    function xe(H, V, G, se) {
      for (var Ce = null, Je = null, je = V, Be = V = 0, Pe = null; je !== null && Be < G.length; Be++) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var We = K(
          H,
          je,
          G[Be],
          se
        );
        if (We === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && We.alternate === null && n(H, je), V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We, je = Pe;
      }
      if (Be === G.length)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; Be < G.length; Be++)
          je = oe(H, G[Be], se), je !== null && (V = f(
            je,
            V,
            Be
          ), Je === null ? Ce = je : Je.sibling = je, Je = je);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); Be < G.length; Be++)
        Pe = ee(
          je,
          H,
          Be,
          G[Be],
          se
        ), Pe !== null && (e && Pe.alternate !== null && je.delete(
          Pe.key === null ? Be : Pe.key
        ), V = f(
          Pe,
          V,
          Be
        ), Je === null ? Ce = Pe : Je.sibling = Pe, Je = Pe);
      return e && je.forEach(function(dr) {
        return n(H, dr);
      }), Ke && Sa(H, Be), Ce;
    }
    function Me(H, V, G, se) {
      if (G == null) throw Error(l(151));
      for (var Ce = null, Je = null, je = V, Be = V = 0, Pe = null, We = G.next(); je !== null && !We.done; Be++, We = G.next()) {
        je.index > Be ? (Pe = je, je = null) : Pe = je.sibling;
        var dr = K(H, je, We.value, se);
        if (dr === null) {
          je === null && (je = Pe);
          break;
        }
        e && je && dr.alternate === null && n(H, je), V = f(dr, V, Be), Je === null ? Ce = dr : Je.sibling = dr, Je = dr, je = Pe;
      }
      if (We.done)
        return r(H, je), Ke && Sa(H, Be), Ce;
      if (je === null) {
        for (; !We.done; Be++, We = G.next())
          We = oe(H, We.value, se), We !== null && (V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
        return Ke && Sa(H, Be), Ce;
      }
      for (je = s(je); !We.done; Be++, We = G.next())
        We = ee(je, H, Be, We.value, se), We !== null && (e && We.alternate !== null && je.delete(We.key === null ? Be : We.key), V = f(We, V, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
      return e && je.forEach(function(IE) {
        return n(H, IE);
      }), Ke && Sa(H, Be), Ce;
    }
    function ct(H, V, G, se) {
      if (typeof G == "object" && G !== null && G.type === N && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case E:
            e: {
              for (var Ce = G.key; V !== null; ) {
                if (V.key === Ce) {
                  if (Ce = G.type, Ce === N) {
                    if (V.tag === 7) {
                      r(
                        H,
                        V.sibling
                      ), se = c(
                        V,
                        G.props.children
                      ), se.return = H, H = se;
                      break e;
                    }
                  } else if (V.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === A && Lr(Ce) === V.type) {
                    r(
                      H,
                      V.sibling
                    ), se = c(V, G.props), bs(se, G), se.return = H, H = se;
                    break e;
                  }
                  r(H, V);
                  break;
                } else n(H, V);
                V = V.sibling;
              }
              G.type === N ? (se = Ar(
                G.props.children,
                H.mode,
                se,
                G.key
              ), se.return = H, H = se) : (se = Fl(
                G.type,
                G.key,
                G.props,
                null,
                H.mode,
                se
              ), bs(se, G), se.return = H, H = se);
            }
            return x(H);
          case w:
            e: {
              for (Ce = G.key; V !== null; ) {
                if (V.key === Ce)
                  if (V.tag === 4 && V.stateNode.containerInfo === G.containerInfo && V.stateNode.implementation === G.implementation) {
                    r(
                      H,
                      V.sibling
                    ), se = c(V, G.children || []), se.return = H, H = se;
                    break e;
                  } else {
                    r(H, V);
                    break;
                  }
                else n(H, V);
                V = V.sibling;
              }
              se = mu(G, H.mode, se), se.return = H, H = se;
            }
            return x(H);
          case A:
            return G = Lr(G), ct(
              H,
              V,
              G,
              se
            );
        }
        if (W(G))
          return xe(
            H,
            V,
            G,
            se
          );
        if (re(G)) {
          if (Ce = re(G), typeof Ce != "function") throw Error(l(150));
          return G = Ce.call(G), Me(
            H,
            V,
            G,
            se
          );
        }
        if (typeof G.then == "function")
          return ct(
            H,
            V,
            Zl(G),
            se
          );
        if (G.$$typeof === z)
          return ct(
            H,
            V,
            Xl(H, G),
            se
          );
        Jl(H, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, V !== null && V.tag === 6 ? (r(H, V.sibling), se = c(V, G), se.return = H, H = se) : (r(H, V), se = hu(G, H.mode, se), se.return = H, H = se), x(H)) : r(H, V);
    }
    return function(H, V, G, se) {
      try {
        ys = 0;
        var Ce = ct(
          H,
          V,
          G,
          se
        );
        return xi = null, Ce;
      } catch (je) {
        if (je === bi || je === Kl) throw je;
        var Je = jn(29, je, null, H.mode);
        return Je.lanes = se, Je.return = H, Je;
      } finally {
      }
    };
  }
  var Br = dp(!0), fp = dp(!1), Pa = !1;
  function Tu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Cu(e, n) {
    e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ka(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Qa(e, n, r) {
    var s = e.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (tt & 2) !== 0) {
      var c = s.pending;
      return c === null ? n.next = n : (n.next = c.next, c.next = n), s.pending = n, n = Il(e), Km(e, null, r), n;
    }
    return ql(e, s, n, r), Il(e);
  }
  function xs(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  function Ru(e, n) {
    var r = e.updateQueue, s = e.alternate;
    if (s !== null && (s = s.updateQueue, r === s)) {
      var c = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? c = f = x : f = f.next = x, r = r.next;
        } while (r !== null);
        f === null ? c = f = n : f = f.next = n;
      } else c = f = n;
      r = {
        baseState: s.baseState,
        firstBaseUpdate: c,
        lastBaseUpdate: f,
        shared: s.shared,
        callbacks: s.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var _u = !1;
  function Ss() {
    if (_u) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function ws(e, n, r, s) {
    _u = !1;
    var c = e.updateQueue;
    Pa = !1;
    var f = c.firstBaseUpdate, x = c.lastBaseUpdate, j = c.shared.pending;
    if (j !== null) {
      c.shared.pending = null;
      var L = j, X = L.next;
      L.next = null, x === null ? f = X : x.next = X, x = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, j = ae.lastBaseUpdate, j !== x && (j === null ? ae.firstBaseUpdate = X : j.next = X, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var oe = c.baseState;
      x = 0, ae = X = L = null, j = f;
      do {
        var K = j.lane & -536870913, ee = K !== j.lane;
        if (ee ? (Xe & K) === K : (s & K) === K) {
          K !== 0 && K === gi && (_u = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: j.tag,
            payload: j.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, Me = j;
            K = n;
            var ct = r;
            switch (Me.tag) {
              case 1:
                if (xe = Me.payload, typeof xe == "function") {
                  oe = xe.call(ct, oe, K);
                  break e;
                }
                oe = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = Me.payload, K = typeof xe == "function" ? xe.call(ct, oe, K) : xe, K == null) break e;
                oe = v({}, oe, K);
                break e;
              case 2:
                Pa = !0;
            }
          }
          K = j.callback, K !== null && (e.flags |= 64, ee && (e.flags |= 8192), ee = c.callbacks, ee === null ? c.callbacks = [K] : ee.push(K));
        } else
          ee = {
            lane: K,
            tag: j.tag,
            payload: j.payload,
            callback: j.callback,
            next: null
          }, ae === null ? (X = ae = ee, L = oe) : ae = ae.next = ee, x |= K;
        if (j = j.next, j === null) {
          if (j = c.shared.pending, j === null)
            break;
          ee = j, j = ee.next, ee.next = null, c.lastBaseUpdate = ee, c.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = oe), c.baseState = L, c.firstBaseUpdate = X, c.lastBaseUpdate = ae, f === null && (c.shared.lanes = 0), tr |= x, e.lanes = x, e.memoizedState = oe;
    }
  }
  function hp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function mp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        hp(r[e], n);
  }
  var Si = _(null), Wl = _(0);
  function pp(e, n) {
    e = Da, P(Wl, e), P(Si, n), Da = e | n.baseLanes;
  }
  function Mu() {
    P(Wl, Da), P(Si, Si.current);
  }
  function Au() {
    Da = Wl.current, Z(Si), Z(Wl);
  }
  var Nn = _(null), qn = null;
  function Za(e) {
    var n = e.alternate;
    P(Rt, Rt.current & 1), P(Nn, e), qn === null && (n === null || Si.current !== null || n.memoizedState !== null) && (qn = e);
  }
  function Du(e) {
    P(Rt, Rt.current), P(Nn, e), qn === null && (qn = e);
  }
  function vp(e) {
    e.tag === 22 ? (P(Rt, Rt.current), P(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    P(Rt, Rt.current), P(Nn, Nn.current);
  }
  function Tn(e) {
    Z(Nn), qn === e && (qn = null), Z(Rt);
  }
  var Rt = _(0);
  function eo(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Bd(r) || Vd(r)))
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
  var ja = 0, Ue = null, lt = null, Lt = null, to = !1, wi = !1, Vr = !1, no = 0, Es = 0, Ei = null, zw = 0;
  function jt() {
    throw Error(l(321));
  }
  function zu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!En(e[r], n[r])) return !1;
    return !0;
  }
  function Ou(e, n, r, s, c, f) {
    return ja = f, Ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = e === null || e.memoizedState === null ? Wp : Ku, Vr = !1, f = r(s, c), Vr = !1, wi && (f = yp(
      n,
      r,
      s,
      c
    )), gp(e), f;
  }
  function gp(e) {
    O.H = Ts;
    var n = lt !== null && lt.next !== null;
    if (ja = 0, Lt = lt = Ue = null, to = !1, Es = 0, Ei = null, n) throw Error(l(300));
    e === null || Ut || (e = e.dependencies, e !== null && Gl(e) && (Ut = !0));
  }
  function yp(e, n, r, s) {
    Ue = e;
    var c = 0;
    do {
      if (wi && (Ei = null), Es = 0, wi = !1, 25 <= c) throw Error(l(301));
      if (c += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = ev, f = n(r, s);
    } while (wi);
    return f;
  }
  function Ow() {
    var e = O.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? js(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), n;
  }
  function ku() {
    var e = no !== 0;
    return no = 0, e;
  }
  function Lu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Uu(e) {
    if (to) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      to = !1;
    }
    ja = 0, Lt = lt = Ue = null, wi = !1, Es = no = 0, Ei = null;
  }
  function fn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e, Lt;
  }
  function _t() {
    if (lt === null) {
      var e = Ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = lt.next;
    var n = Lt === null ? Ue.memoizedState : Lt.next;
    if (n !== null)
      Lt = n, lt = e;
    else {
      if (e === null)
        throw Ue.alternate === null ? Error(l(467)) : Error(l(310));
      lt = e, e = {
        memoizedState: lt.memoizedState,
        baseState: lt.baseState,
        baseQueue: lt.baseQueue,
        queue: lt.queue,
        next: null
      }, Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e;
    }
    return Lt;
  }
  function ao() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function js(e) {
    var n = Es;
    return Es += 1, Ei === null && (Ei = []), e = op(Ei, e, n), n = Ue, (Lt === null ? n.memoizedState : Lt.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? Wp : Ku), e;
  }
  function ro(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return js(e);
      if (e.$$typeof === z) return nn(e);
    }
    throw Error(l(438, String(e)));
  }
  function Bu(e) {
    var n = null, r = Ue.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var s = Ue.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (n = {
        data: s.data.map(function(c) {
          return c.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = ao(), Ue.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), s = 0; s < e; s++)
        r[s] = F;
    return n.index++, r;
  }
  function Na(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function io(e) {
    var n = _t();
    return Vu(n, lt, e);
  }
  function Vu(e, n, r) {
    var s = e.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = r;
    var c = e.baseQueue, f = s.pending;
    if (f !== null) {
      if (c !== null) {
        var x = c.next;
        c.next = f.next, f.next = x;
      }
      n.baseQueue = c = f, s.pending = null;
    }
    if (f = e.baseState, c === null) e.memoizedState = f;
    else {
      n = c.next;
      var j = x = null, L = null, X = n, ae = !1;
      do {
        var oe = X.lane & -536870913;
        if (oe !== X.lane ? (Xe & oe) === oe : (ja & oe) === oe) {
          var K = X.revertLane;
          if (K === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }), oe === gi && (ae = !0);
          else if ((ja & K) === K) {
            X = X.next, K === gi && (ae = !0);
            continue;
          } else
            oe = {
              lane: 0,
              revertLane: X.revertLane,
              gesture: null,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            }, L === null ? (j = L = oe, x = f) : L = L.next = oe, Ue.lanes |= K, tr |= K;
          oe = X.action, Vr && r(f, oe), f = X.hasEagerState ? X.eagerState : r(f, oe);
        } else
          K = {
            lane: oe,
            revertLane: X.revertLane,
            gesture: X.gesture,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          }, L === null ? (j = L = K, x = f) : L = L.next = K, Ue.lanes |= oe, tr |= oe;
        X = X.next;
      } while (X !== null && X !== n);
      if (L === null ? x = f : L.next = j, !En(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = x, e.baseQueue = L, s.lastRenderedState = f;
    }
    return c === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function $u(e) {
    var n = _t(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var s = r.dispatch, c = r.pending, f = n.memoizedState;
    if (c !== null) {
      r.pending = null;
      var x = c = c.next;
      do
        f = e(f, x.action), x = x.next;
      while (x !== c);
      En(f, n.memoizedState) || (Ut = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), r.lastRenderedState = f;
    }
    return [f, s];
  }
  function bp(e, n, r) {
    var s = Ue, c = _t(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var x = !En(
      (lt || c).memoizedState,
      r
    );
    if (x && (c.memoizedState = r, Ut = !0), c = c.queue, Iu(wp.bind(null, s, c, e), [
      e
    ]), c.getSnapshot !== n || x || Lt !== null && Lt.memoizedState.tag & 1) {
      if (s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        Sp.bind(
          null,
          s,
          c,
          r,
          n
        ),
        null
      ), ft === null) throw Error(l(349));
      f || (ja & 127) !== 0 || xp(s, n, r);
    }
    return r;
  }
  function xp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ue.updateQueue, n === null ? (n = ao(), Ue.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function Sp(e, n, r, s) {
    n.value = r, n.getSnapshot = s, Ep(n) && jp(e);
  }
  function wp(e, n, r) {
    return r(function() {
      Ep(n) && jp(e);
    });
  }
  function Ep(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !En(e, r);
    } catch {
      return !0;
    }
  }
  function jp(e) {
    var n = Mr(e, 2);
    n !== null && bn(n, e, 2);
  }
  function Hu(e) {
    var n = fn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), Vr) {
        Tt(!0);
        try {
          r();
        } finally {
          Tt(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = e, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Na,
      lastRenderedState: e
    }, n;
  }
  function Np(e, n, r, s) {
    return e.baseState = r, Vu(
      e,
      lt,
      typeof s == "function" ? s : Na
    );
  }
  function kw(e, n, r, s, c) {
    if (oo(e)) throw Error(l(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: c,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          f.listeners.push(x);
        }
      };
      O.T !== null ? r(!0) : f.isTransition = !1, s(f), r = n.pending, r === null ? (f.next = n.pending = f, Tp(n, f)) : (f.next = r.next, n.pending = r.next = f);
    }
  }
  function Tp(e, n) {
    var r = n.action, s = n.payload, c = e.state;
    if (n.isTransition) {
      var f = O.T, x = {};
      O.T = x;
      try {
        var j = r(c, s), L = O.S;
        L !== null && L(x, j), Cp(e, n, j);
      } catch (X) {
        qu(e, n, X);
      } finally {
        f !== null && x.types !== null && (f.types = x.types), O.T = f;
      }
    } else
      try {
        f = r(c, s), Cp(e, n, f);
      } catch (X) {
        qu(e, n, X);
      }
  }
  function Cp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(s) {
        Rp(e, n, s);
      },
      function(s) {
        return qu(e, n, s);
      }
    ) : Rp(e, n, r);
  }
  function Rp(e, n, r) {
    n.status = "fulfilled", n.value = r, _p(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Tp(e, r)));
  }
  function qu(e, n, r) {
    var s = e.pending;
    if (e.pending = null, s !== null) {
      s = s.next;
      do
        n.status = "rejected", n.reason = r, _p(n), n = n.next;
      while (n !== s);
    }
    e.action = null;
  }
  function _p(e) {
    e = e.listeners;
    for (var n = 0; n < e.length; n++) (0, e[n])();
  }
  function Mp(e, n) {
    return n;
  }
  function Ap(e, n) {
    if (Ke) {
      var r = ft.formState;
      if (r !== null) {
        e: {
          var s = Ue;
          if (Ke) {
            if (gt) {
              t: {
                for (var c = gt, f = Hn; c.nodeType !== 8; ) {
                  if (!f) {
                    c = null;
                    break t;
                  }
                  if (c = In(
                    c.nextSibling
                  ), c === null) {
                    c = null;
                    break t;
                  }
                }
                f = c.data, c = f === "F!" || f === "F" ? c : null;
              }
              if (c) {
                gt = In(
                  c.nextSibling
                ), s = c.data === "F!";
                break e;
              }
            }
            Ga(s);
          }
          s = !1;
        }
        s && (n = r[0]);
      }
    }
    return r = fn(), r.memoizedState = r.baseState = n, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mp,
      lastRenderedState: n
    }, r.queue = s, r = Qp.bind(
      null,
      Ue,
      s
    ), s.dispatch = r, s = Hu(!1), f = Pu.bind(
      null,
      Ue,
      !1,
      s.queue
    ), s = fn(), c = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, s.queue = c, r = kw.bind(
      null,
      Ue,
      c,
      f,
      r
    ), c.dispatch = r, s.memoizedState = e, [n, r, !1];
  }
  function Dp(e) {
    var n = _t();
    return zp(n, lt, e);
  }
  function zp(e, n, r) {
    if (n = Vu(
      e,
      n,
      Mp
    )[0], e = io(Na)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var s = js(n);
      } catch (x) {
        throw x === bi ? Kl : x;
      }
    else s = n;
    n = _t();
    var c = n.queue, f = c.dispatch;
    return r !== n.memoizedState && (Ue.flags |= 2048, ji(
      9,
      { destroy: void 0 },
      Lw.bind(null, c, r),
      null
    )), [s, f, e];
  }
  function Lw(e, n) {
    e.action = n;
  }
  function Op(e) {
    var n = _t(), r = lt;
    if (r !== null)
      return zp(n, r, e);
    _t(), n = n.memoizedState, r = _t();
    var s = r.queue.dispatch;
    return r.memoizedState = e, [n, s, !1];
  }
  function ji(e, n, r, s) {
    return e = { tag: e, create: r, deps: s, inst: n, next: null }, n = Ue.updateQueue, n === null && (n = ao(), Ue.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (s = r.next, r.next = e, e.next = s, n.lastEffect = e), e;
  }
  function kp() {
    return _t().memoizedState;
  }
  function so(e, n, r, s) {
    var c = fn();
    Ue.flags |= e, c.memoizedState = ji(
      1 | n,
      { destroy: void 0 },
      r,
      s === void 0 ? null : s
    );
  }
  function lo(e, n, r, s) {
    var c = _t();
    s = s === void 0 ? null : s;
    var f = c.memoizedState.inst;
    lt !== null && s !== null && zu(s, lt.memoizedState.deps) ? c.memoizedState = ji(n, f, r, s) : (Ue.flags |= e, c.memoizedState = ji(
      1 | n,
      f,
      r,
      s
    ));
  }
  function Lp(e, n) {
    so(8390656, 8, e, n);
  }
  function Iu(e, n) {
    lo(2048, 8, e, n);
  }
  function Uw(e) {
    Ue.flags |= 4;
    var n = Ue.updateQueue;
    if (n === null)
      n = ao(), Ue.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Up(e) {
    var n = _t().memoizedState;
    return Uw({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Bp(e, n) {
    return lo(4, 2, e, n);
  }
  function Vp(e, n) {
    return lo(4, 4, e, n);
  }
  function $p(e, n) {
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
  function Hp(e, n, r) {
    r = r != null ? r.concat([e]) : null, lo(4, 4, $p.bind(null, n, e), r);
  }
  function Fu() {
  }
  function qp(e, n) {
    var r = _t();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    return n !== null && zu(n, s[1]) ? s[0] : (r.memoizedState = [e, n], e);
  }
  function Ip(e, n) {
    var r = _t();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    if (n !== null && zu(n, s[1]))
      return s[0];
    if (s = e(), Vr) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return r.memoizedState = [s, n], s;
  }
  function Yu(e, n, r) {
    return r === void 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Fv(), Ue.lanes |= e, tr |= e, r);
  }
  function Fp(e, n, r, s) {
    return En(r, n) ? r : Si.current !== null ? (e = Yu(e, r, s), En(e, n) || (Ut = !0), e) : (ja & 42) === 0 || (ja & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Fv(), Ue.lanes |= e, tr |= e, n);
  }
  function Yp(e, n, r, s, c) {
    var f = C.p;
    C.p = f !== 0 && 8 > f ? f : 8;
    var x = O.T, j = {};
    O.T = j, Pu(e, !1, n, r);
    try {
      var L = c(), X = O.S;
      if (X !== null && X(j, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = Dw(
          L,
          s
        );
        Ns(
          e,
          n,
          ae,
          _n(e)
        );
      } else
        Ns(
          e,
          n,
          s,
          _n(e)
        );
    } catch (oe) {
      Ns(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: oe },
        _n()
      );
    } finally {
      C.p = f, x !== null && j.types !== null && (x.types = j.types), O.T = x;
    }
  }
  function Bw() {
  }
  function Gu(e, n, r, s) {
    if (e.tag !== 5) throw Error(l(476));
    var c = Gp(e).queue;
    Yp(
      e,
      c,
      n,
      U,
      r === null ? Bw : function() {
        return Xp(e), r(s);
      }
    );
  }
  function Gp(e) {
    var n = e.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: U,
      baseState: U,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Na,
        lastRenderedState: U
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
        lastRenderedReducer: Na,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Xp(e) {
    var n = Gp(e);
    n.next === null && (n = e.alternate.memoizedState), Ns(
      e,
      n.next.queue,
      {},
      _n()
    );
  }
  function Xu() {
    return nn(qs);
  }
  function Pp() {
    return _t().memoizedState;
  }
  function Kp() {
    return _t().memoizedState;
  }
  function Vw(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = _n();
          e = Ka(r);
          var s = Qa(n, e, r);
          s !== null && (bn(s, n, r), xs(s, n, r)), n = { cache: wu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function $w(e, n, r) {
    var s = _n();
    r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(e) ? Zp(n, r) : (r = du(e, n, r, s), r !== null && (bn(r, e, s), Jp(r, n, s)));
  }
  function Qp(e, n, r) {
    var s = _n();
    Ns(e, n, r, s);
  }
  function Ns(e, n, r, s) {
    var c = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oo(e)) Zp(n, c);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var x = n.lastRenderedState, j = f(x, r);
          if (c.hasEagerState = !0, c.eagerState = j, En(j, x))
            return ql(e, n, c, 0), ft === null && Hl(), !1;
        } catch {
        } finally {
        }
      if (r = du(e, n, c, s), r !== null)
        return bn(r, e, s), Jp(r, n, s), !0;
    }
    return !1;
  }
  function Pu(e, n, r, s) {
    if (s = {
      lane: 2,
      revertLane: Td(),
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(e)) {
      if (n) throw Error(l(479));
    } else
      n = du(
        e,
        r,
        s,
        2
      ), n !== null && bn(n, e, 2);
  }
  function oo(e) {
    var n = e.alternate;
    return e === Ue || n !== null && n === Ue;
  }
  function Zp(e, n) {
    wi = to = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Jp(e, n, r) {
    if ((r & 4194048) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, sn(e, r);
    }
  }
  var Ts = {
    readContext: nn,
    use: ro,
    useCallback: jt,
    useContext: jt,
    useEffect: jt,
    useImperativeHandle: jt,
    useLayoutEffect: jt,
    useInsertionEffect: jt,
    useMemo: jt,
    useReducer: jt,
    useRef: jt,
    useState: jt,
    useDebugValue: jt,
    useDeferredValue: jt,
    useTransition: jt,
    useSyncExternalStore: jt,
    useId: jt,
    useHostTransitionStatus: jt,
    useFormState: jt,
    useActionState: jt,
    useOptimistic: jt,
    useMemoCache: jt,
    useCacheRefresh: jt
  };
  Ts.useEffectEvent = jt;
  var Wp = {
    readContext: nn,
    use: ro,
    useCallback: function(e, n) {
      return fn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: nn,
    useEffect: Lp,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, so(
        4194308,
        4,
        $p.bind(null, n, e),
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
      var r = fn();
      n = n === void 0 ? null : n;
      var s = e();
      if (Vr) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return r.memoizedState = [s, n], s;
    },
    useReducer: function(e, n, r) {
      var s = fn();
      if (r !== void 0) {
        var c = r(n);
        if (Vr) {
          Tt(!0);
          try {
            r(n);
          } finally {
            Tt(!1);
          }
        }
      } else c = n;
      return s.memoizedState = s.baseState = c, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      }, s.queue = e, e = e.dispatch = $w.bind(
        null,
        Ue,
        e
      ), [s.memoizedState, e];
    },
    useRef: function(e) {
      var n = fn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Hu(e);
      var n = e.queue, r = Qp.bind(null, Ue, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = fn();
      return Yu(r, e, n);
    },
    useTransition: function() {
      var e = Hu(!1);
      return e = Yp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), fn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var s = Ue, c = fn();
      if (Ke) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), ft === null)
          throw Error(l(349));
        (Xe & 127) !== 0 || xp(s, n, r);
      }
      c.memoizedState = r;
      var f = { value: r, getSnapshot: n };
      return c.queue = f, Lp(wp.bind(null, s, f, e), [
        e
      ]), s.flags |= 2048, ji(
        9,
        { destroy: void 0 },
        Sp.bind(
          null,
          s,
          f,
          r,
          n
        ),
        null
      ), r;
    },
    useId: function() {
      var e = fn(), n = ft.identifierPrefix;
      if (Ke) {
        var r = da, s = ua;
        r = (s & ~(1 << 32 - Yt(s) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = no++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = zw++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Xu,
    useFormState: Ap,
    useActionState: Ap,
    useOptimistic: function(e) {
      var n = fn();
      n.memoizedState = n.baseState = e;
      var r = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = r, n = Pu.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Bu,
    useCacheRefresh: function() {
      return fn().memoizedState = Vw.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var n = fn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((tt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Ku = {
    readContext: nn,
    use: ro,
    useCallback: qp,
    useContext: nn,
    useEffect: Iu,
    useImperativeHandle: Hp,
    useInsertionEffect: Bp,
    useLayoutEffect: Vp,
    useMemo: Ip,
    useReducer: io,
    useRef: kp,
    useState: function() {
      return io(Na);
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = _t();
      return Fp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = io(Na)[0], n = _t().memoizedState;
      return [
        typeof e == "boolean" ? e : js(e),
        n
      ];
    },
    useSyncExternalStore: bp,
    useId: Pp,
    useHostTransitionStatus: Xu,
    useFormState: Dp,
    useActionState: Dp,
    useOptimistic: function(e, n) {
      var r = _t();
      return Np(r, lt, e, n);
    },
    useMemoCache: Bu,
    useCacheRefresh: Kp
  };
  Ku.useEffectEvent = Up;
  var ev = {
    readContext: nn,
    use: ro,
    useCallback: qp,
    useContext: nn,
    useEffect: Iu,
    useImperativeHandle: Hp,
    useInsertionEffect: Bp,
    useLayoutEffect: Vp,
    useMemo: Ip,
    useReducer: $u,
    useRef: kp,
    useState: function() {
      return $u(Na);
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = _t();
      return lt === null ? Yu(r, e, n) : Fp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = $u(Na)[0], n = _t().memoizedState;
      return [
        typeof e == "boolean" ? e : js(e),
        n
      ];
    },
    useSyncExternalStore: bp,
    useId: Pp,
    useHostTransitionStatus: Xu,
    useFormState: Op,
    useActionState: Op,
    useOptimistic: function(e, n) {
      var r = _t();
      return lt !== null ? Np(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Bu,
    useCacheRefresh: Kp
  };
  ev.useEffectEvent = Up;
  function Qu(e, n, r, s) {
    n = e.memoizedState, r = r(s, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Zu = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var s = _n(), c = Ka(s);
      c.payload = n, r != null && (c.callback = r), n = Qa(e, c, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var s = _n(), c = Ka(s);
      c.tag = 1, c.payload = n, r != null && (c.callback = r), n = Qa(e, c, s), n !== null && (bn(n, e, s), xs(n, e, s));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = _n(), s = Ka(r);
      s.tag = 2, n != null && (s.callback = n), n = Qa(e, s, r), n !== null && (bn(n, e, r), xs(n, e, r));
    }
  };
  function tv(e, n, r, s, c, f, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, f, x) : n.prototype && n.prototype.isPureReactComponent ? !fs(r, s) || !fs(c, f) : !0;
  }
  function nv(e, n, r, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, s), n.state !== e && Zu.enqueueReplaceState(n, n.state, null);
  }
  function $r(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    }
    if (e = e.defaultProps) {
      r === n && (r = v({}, r));
      for (var c in e)
        r[c] === void 0 && (r[c] = e[c]);
    }
    return r;
  }
  function av(e) {
    $l(e);
  }
  function rv(e) {
    console.error(e);
  }
  function iv(e) {
    $l(e);
  }
  function co(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function sv(e, n, r) {
    try {
      var s = e.onCaughtError;
      s(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Ju(e, n, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      co(e, n);
    }, r;
  }
  function lv(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function ov(e, n, r, s) {
    var c = r.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var f = s.value;
      e.payload = function() {
        return c(f);
      }, e.callback = function() {
        sv(n, r, s);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      sv(n, r, s), typeof c != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var j = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: j !== null ? j : ""
      });
    });
  }
  function Hw(e, n, r, s, c) {
    if (r.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (n = r.alternate, n !== null && vi(
        n,
        r,
        c,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? wo() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = c, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([s]) : n.add(s), Ed(e, s, c)), !1;
          case 22:
            return r.flags |= 65536, s === Ql ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([s]) : r.add(s)), Ed(e, s, c)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return Ed(e, s, c), wo(), !1;
    }
    if (Ke)
      return n = Nn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = c, s !== gu && (e = Error(l(422), { cause: s }), ps(Bn(e, r)))) : (s !== gu && (n = Error(l(423), {
        cause: s
      }), ps(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, c &= -c, e.lanes |= c, s = Bn(s, r), c = Ju(
        e.stateNode,
        s,
        c
      ), Ru(e, c), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(l(520), { cause: s });
    if (f = Bn(f, r), Os === null ? Os = [f] : Os.push(f), Nt !== 4 && (Nt = 2), n === null) return !0;
    s = Bn(s, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = c & -c, r.lanes |= e, e = Ju(r.stateNode, s, e), Ru(r, e), !1;
        case 1:
          if (n = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, c &= -c, r.lanes |= c, c = lv(c), ov(
              c,
              e,
              r,
              s
            ), Ru(r, c), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Wu = Error(l(461)), Ut = !1;
  function an(e, n, r, s) {
    n.child = e === null ? fp(n, null, r, s) : Br(
      n,
      e.child,
      r,
      s
    );
  }
  function cv(e, n, r, s, c) {
    r = r.render;
    var f = n.ref;
    if ("ref" in s) {
      var x = {};
      for (var j in s)
        j !== "ref" && (x[j] = s[j]);
    } else x = s;
    return Or(n), s = Ou(
      e,
      n,
      r,
      x,
      f,
      c
    ), j = ku(), e !== null && !Ut ? (Lu(e, n, c), Ta(e, n, c)) : (Ke && j && pu(n), n.flags |= 1, an(e, n, s, c), n.child);
  }
  function uv(e, n, r, s, c) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !fu(f) && f.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = f, dv(
        e,
        n,
        f,
        s,
        c
      )) : (e = Fl(
        r.type,
        null,
        s,
        n,
        n.mode,
        c
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !ld(e, c)) {
      var x = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : fs, r(x, s) && e.ref === n.ref)
        return Ta(e, n, c);
    }
    return n.flags |= 1, e = xa(f, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function dv(e, n, r, s, c) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (fs(f, s) && e.ref === n.ref)
        if (Ut = !1, n.pendingProps = s = f, ld(e, c))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return n.lanes = e.lanes, Ta(e, n, c);
    }
    return ed(
      e,
      n,
      r,
      s,
      c
    );
  }
  function fv(e, n, r, s) {
    var c = s.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (s = n.child = e.child, c = 0; s !== null; )
            c = c | s.lanes | s.childLanes, s = s.sibling;
          s = c & ~f;
        } else s = 0, n.child = null;
        return hv(
          e,
          n,
          f,
          r,
          s
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Pl(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? pp(n, f) : Mu(), vp(n);
      else
        return s = n.lanes = 536870912, hv(
          e,
          n,
          f !== null ? f.baseLanes | r : r,
          r,
          s
        );
    } else
      f !== null ? (Pl(n, f.cachePool), pp(n, f), Ja(), n.memoizedState = null) : (e !== null && Pl(n, null), Mu(), Ja());
    return an(e, n, c, r), n.child;
  }
  function Cs(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function hv(e, n, r, s, c) {
    var f = ju();
    return f = f === null ? null : { parent: kt._currentValue, pool: f }, n.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Pl(n, null), Mu(), vp(n), e !== null && vi(e, n, s, !0), n.childLanes = c, null;
  }
  function uo(e, n) {
    return n = ho(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function mv(e, n, r) {
    return Br(n, e.child, null, r), e = uo(n, n.pendingProps), e.flags |= 2, Tn(n), n.memoizedState = null, e;
  }
  function qw(e, n, r) {
    var s = n.pendingProps, c = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ke) {
        if (s.mode === "hidden")
          return e = uo(n, s), n.lanes = 536870912, Cs(null, e);
        if (Du(n), (e = gt) ? (e = Tg(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Zm(e), r.return = n, n.child = r, tn = n, gt = null)) : e = null, e === null) throw Ga(n);
        return n.lanes = 536870912, null;
      }
      return uo(n, s);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var x = f.dehydrated;
      if (Du(n), c)
        if (n.flags & 256)
          n.flags &= -257, n = mv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ut || vi(e, n, r, !1), c = (r & e.childLanes) !== 0, Ut || c) {
        if (s = ft, s !== null && (x = D(s, r), x !== 0 && x !== f.retryLane))
          throw f.retryLane = x, Mr(e, x), bn(s, e, x), Wu;
        wo(), n = mv(
          e,
          n,
          r
        );
      } else
        e = f.treeContext, gt = In(x.nextSibling), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && ep(n, e), n = uo(n, s), n.flags |= 4096;
      return n;
    }
    return e = xa(e.child, {
      mode: s.mode,
      children: s.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function fo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function ed(e, n, r, s, c) {
    return Or(n), r = Ou(
      e,
      n,
      r,
      s,
      void 0,
      c
    ), s = ku(), e !== null && !Ut ? (Lu(e, n, c), Ta(e, n, c)) : (Ke && s && pu(n), n.flags |= 1, an(e, n, r, c), n.child);
  }
  function pv(e, n, r, s, c, f) {
    return Or(n), n.updateQueue = null, r = yp(
      n,
      s,
      r,
      c
    ), gp(e), s = ku(), e !== null && !Ut ? (Lu(e, n, f), Ta(e, n, f)) : (Ke && s && pu(n), n.flags |= 1, an(e, n, r, f), n.child);
  }
  function vv(e, n, r, s, c) {
    if (Or(n), n.stateNode === null) {
      var f = fi, x = r.contextType;
      typeof x == "object" && x !== null && (f = nn(x)), f = new r(s, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Zu, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = s, f.state = n.memoizedState, f.refs = {}, Tu(n), x = r.contextType, f.context = typeof x == "object" && x !== null ? nn(x) : fi, f.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (Qu(
        n,
        r,
        x,
        s
      ), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (x = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), x !== f.state && Zu.enqueueReplaceState(f, f.state, null), ws(n, s, f, c), Ss(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !0;
    } else if (e === null) {
      f = n.stateNode;
      var j = n.memoizedProps, L = $r(r, j);
      f.props = L;
      var X = f.context, ae = r.contextType;
      x = fi, typeof ae == "object" && ae !== null && (x = nn(ae));
      var oe = r.getDerivedStateFromProps;
      ae = typeof oe == "function" || typeof f.getSnapshotBeforeUpdate == "function", j = n.pendingProps !== j, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (j || X !== x) && nv(
        n,
        f,
        s,
        x
      ), Pa = !1;
      var K = n.memoizedState;
      f.state = K, ws(n, s, f, c), Ss(), X = n.memoizedState, j || K !== X || Pa ? (typeof oe == "function" && (Qu(
        n,
        r,
        oe,
        s
      ), X = n.memoizedState), (L = Pa || tv(
        n,
        r,
        L,
        s,
        K,
        X,
        x
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = X), f.props = s, f.state = X, f.context = x, s = L) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      f = n.stateNode, Cu(e, n), x = n.memoizedProps, ae = $r(r, x), f.props = ae, oe = n.pendingProps, K = f.context, X = r.contextType, L = fi, typeof X == "object" && X !== null && (L = nn(X)), j = r.getDerivedStateFromProps, (X = typeof j == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x !== oe || K !== L) && nv(
        n,
        f,
        s,
        L
      ), Pa = !1, K = n.memoizedState, f.state = K, ws(n, s, f, c), Ss();
      var ee = n.memoizedState;
      x !== oe || K !== ee || Pa || e !== null && e.dependencies !== null && Gl(e.dependencies) ? (typeof j == "function" && (Qu(
        n,
        r,
        j,
        s
      ), ee = n.memoizedState), (ae = Pa || tv(
        n,
        r,
        ae,
        s,
        K,
        ee,
        L
      ) || e !== null && e.dependencies !== null && Gl(e.dependencies)) ? (X || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(s, ee, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        s,
        ee,
        L
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = ee), f.props = s, f.state = ee, f.context = L, s = ae) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return f = s, fo(e, n), s = (n.flags & 128) !== 0, f || s ? (f = n.stateNode, r = s && typeof r.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && s ? (n.child = Br(
      n,
      e.child,
      null,
      c
    ), n.child = Br(
      n,
      null,
      r,
      c
    )) : an(e, n, r, c), n.memoizedState = f.state, e = n.child) : e = Ta(
      e,
      n,
      c
    ), e;
  }
  function gv(e, n, r, s) {
    return Dr(), n.flags |= 256, an(e, n, r, s), n.child;
  }
  var td = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function nd(e) {
    return { baseLanes: e, cachePool: sp() };
  }
  function ad(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Rn), e;
  }
  function yv(e, n, r) {
    var s = n.pendingProps, c = !1, f = (n.flags & 128) !== 0, x;
    if ((x = f) || (x = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), x && (c = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ke) {
        if (c ? Za(n) : Ja(), (e = gt) ? (e = Tg(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Zm(e), r.return = n, n.child = r, tn = n, gt = null)) : e = null, e === null) throw Ga(n);
        return Vd(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var j = s.children;
      return s = s.fallback, c ? (Ja(), c = n.mode, j = ho(
        { mode: "hidden", children: j },
        c
      ), s = Ar(
        s,
        c,
        r,
        null
      ), j.return = n, s.return = n, j.sibling = s, n.child = j, s = n.child, s.memoizedState = nd(r), s.childLanes = ad(
        e,
        x,
        r
      ), n.memoizedState = td, Cs(null, s)) : (Za(n), rd(n, j));
    }
    var L = e.memoizedState;
    if (L !== null && (j = L.dehydrated, j !== null)) {
      if (f)
        n.flags & 256 ? (Za(n), n.flags &= -257, n = id(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (Ja(), n.child = e.child, n.flags |= 128, n = null) : (Ja(), j = s.fallback, c = n.mode, s = ho(
          { mode: "visible", children: s.children },
          c
        ), j = Ar(
          j,
          c,
          r,
          null
        ), j.flags |= 2, s.return = n, j.return = n, s.sibling = j, n.child = s, Br(
          n,
          e.child,
          null,
          r
        ), s = n.child, s.memoizedState = nd(r), s.childLanes = ad(
          e,
          x,
          r
        ), n.memoizedState = td, n = Cs(null, s));
      else if (Za(n), Vd(j)) {
        if (x = j.nextSibling && j.nextSibling.dataset, x) var X = x.dgst;
        x = X, s = Error(l(419)), s.stack = "", s.digest = x, ps({ value: s, source: null, stack: null }), n = id(
          e,
          n,
          r
        );
      } else if (Ut || vi(e, n, r, !1), x = (r & e.childLanes) !== 0, Ut || x) {
        if (x = ft, x !== null && (s = D(x, r), s !== 0 && s !== L.retryLane))
          throw L.retryLane = s, Mr(e, s), bn(x, e, s), Wu;
        Bd(j) || wo(), n = id(
          e,
          n,
          r
        );
      } else
        Bd(j) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, gt = In(
          j.nextSibling
        ), tn = n, Ke = !0, Ya = null, Hn = !1, e !== null && ep(n, e), n = rd(
          n,
          s.children
        ), n.flags |= 4096);
      return n;
    }
    return c ? (Ja(), j = s.fallback, c = n.mode, L = e.child, X = L.sibling, s = xa(L, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = L.subtreeFlags & 65011712, X !== null ? j = xa(
      X,
      j
    ) : (j = Ar(
      j,
      c,
      r,
      null
    ), j.flags |= 2), j.return = n, s.return = n, s.sibling = j, n.child = s, Cs(null, s), s = n.child, j = e.child.memoizedState, j === null ? j = nd(r) : (c = j.cachePool, c !== null ? (L = kt._currentValue, c = c.parent !== L ? { parent: L, pool: L } : c) : c = sp(), j = {
      baseLanes: j.baseLanes | r,
      cachePool: c
    }), s.memoizedState = j, s.childLanes = ad(
      e,
      x,
      r
    ), n.memoizedState = td, Cs(e.child, s)) : (Za(n), r = e.child, e = r.sibling, r = xa(r, {
      mode: "visible",
      children: s.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function rd(e, n) {
    return n = ho(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function ho(e, n) {
    return e = jn(22, e, null, n), e.lanes = 0, e;
  }
  function id(e, n, r) {
    return Br(n, e.child, null, r), e = rd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function bv(e, n, r) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), xu(e.return, n, r);
  }
  function sd(e, n, r, s, c, f) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: r,
      tailMode: c,
      treeForkCount: f
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = s, x.tail = r, x.tailMode = c, x.treeForkCount = f);
  }
  function xv(e, n, r) {
    var s = n.pendingProps, c = s.revealOrder, f = s.tail;
    s = s.children;
    var x = Rt.current, j = (x & 2) !== 0;
    if (j ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, P(Rt, x), an(e, n, s, r), s = Ke ? ms : 0, !j && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && bv(e, r, n);
        else if (e.tag === 19)
          bv(e, r, n);
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
    switch (c) {
      case "forwards":
        for (r = n.child, c = null; r !== null; )
          e = r.alternate, e !== null && eo(e) === null && (c = r), r = r.sibling;
        r = c, r === null ? (c = n.child, n.child = null) : (c = r.sibling, r.sibling = null), sd(
          n,
          !1,
          c,
          r,
          f,
          s
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, c = n.child, n.child = null; c !== null; ) {
          if (e = c.alternate, e !== null && eo(e) === null) {
            n.child = c;
            break;
          }
          e = c.sibling, c.sibling = r, r = c, c = e;
        }
        sd(
          n,
          !0,
          r,
          null,
          f,
          s
        );
        break;
      case "together":
        sd(
          n,
          !1,
          null,
          null,
          void 0,
          s
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ta(e, n, r) {
    if (e !== null && (n.dependencies = e.dependencies), tr |= n.lanes, (r & n.childLanes) === 0)
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
      throw Error(l(153));
    if (n.child !== null) {
      for (e = n.child, r = xa(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = xa(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function ld(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Gl(e)));
  }
  function Iw(e, n, r) {
    switch (n.tag) {
      case 3:
        _e(n, n.stateNode.containerInfo), Xa(n, kt, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Jt(n);
        break;
      case 4:
        _e(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, Du(n), null;
        break;
      case 13:
        var s = n.memoizedState;
        if (s !== null)
          return s.dehydrated !== null ? (Za(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? yv(e, n, r) : (Za(n), e = Ta(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Za(n);
        break;
      case 19:
        var c = (e.flags & 128) !== 0;
        if (s = (r & n.childLanes) !== 0, s || (vi(
          e,
          n,
          r,
          !1
        ), s = (r & n.childLanes) !== 0), c) {
          if (s)
            return xv(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (c = n.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), P(Rt, Rt.current), s) break;
        return null;
      case 22:
        return n.lanes = 0, fv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, kt, e.memoizedState.cache);
    }
    return Ta(e, n, r);
  }
  function Sv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Ut = !0;
      else {
        if (!ld(e, r) && (n.flags & 128) === 0)
          return Ut = !1, Iw(
            e,
            n,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ke && (n.flags & 1048576) !== 0 && Wm(n, ms, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var s = n.pendingProps;
          if (e = Lr(n.elementType), n.type = e, typeof e == "function")
            fu(e) ? (s = $r(e, s), n.tag = 1, n = vv(
              null,
              n,
              e,
              s,
              r
            )) : (n.tag = 0, n = ed(
              null,
              n,
              e,
              s,
              r
            ));
          else {
            if (e != null) {
              var c = e.$$typeof;
              if (c === M) {
                n.tag = 11, n = cv(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              } else if (c === ne) {
                n.tag = 14, n = uv(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              }
            }
            throw n = ce(e) || e, Error(l(306, n, ""));
          }
        }
        return n;
      case 0:
        return ed(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 1:
        return s = n.type, c = $r(
          s,
          n.pendingProps
        ), vv(
          e,
          n,
          s,
          c,
          r
        );
      case 3:
        e: {
          if (_e(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          s = n.pendingProps;
          var f = n.memoizedState;
          c = f.element, Cu(e, n), ws(n, s, null, r);
          var x = n.memoizedState;
          if (s = x.cache, Xa(n, kt, s), s !== f.cache && Su(
            n,
            [kt],
            r,
            !0
          ), Ss(), s = x.element, f.isDehydrated)
            if (f = {
              element: s,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = gv(
                e,
                n,
                s,
                r
              );
              break e;
            } else if (s !== c) {
              c = Bn(
                Error(l(424)),
                n
              ), ps(c), n = gv(
                e,
                n,
                s,
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
              for (gt = In(e.firstChild), tn = n, Ke = !0, Ya = null, Hn = !0, r = fp(
                n,
                null,
                s,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), s === c) {
              n = Ta(
                e,
                n,
                r
              );
              break e;
            }
            an(e, n, s, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return fo(e, n), e === null ? (r = Dg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ke || (r = n.type, e = n.pendingProps, s = _o(
          ge.current
        ).createElement(r), s[pe] = n, s[ve] = e, rn(s, r, e), mt(s), n.stateNode = s) : n.memoizedState = Dg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Jt(n), e === null && Ke && (s = n.stateNode = _g(
          n.type,
          n.pendingProps,
          ge.current
        ), tn = n, Hn = !0, c = gt, sr(n.type) ? ($d = c, gt = In(s.firstChild)) : gt = c), an(
          e,
          n,
          n.pendingProps.children,
          r
        ), fo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ke && ((c = s = gt) && (s = bE(
          s,
          n.type,
          n.pendingProps,
          Hn
        ), s !== null ? (n.stateNode = s, tn = n, gt = In(s.firstChild), Hn = !1, c = !0) : c = !1), c || Ga(n)), Jt(n), c = n.type, f = n.pendingProps, x = e !== null ? e.memoizedProps : null, s = f.children, kd(c, f) ? s = null : x !== null && kd(c, x) && (n.flags |= 32), n.memoizedState !== null && (c = Ou(
          e,
          n,
          Ow,
          null,
          null,
          r
        ), qs._currentValue = c), fo(e, n), an(e, n, s, r), n.child;
      case 6:
        return e === null && Ke && ((e = r = gt) && (r = xE(
          r,
          n.pendingProps,
          Hn
        ), r !== null ? (n.stateNode = r, tn = n, gt = null, e = !0) : e = !1), e || Ga(n)), null;
      case 13:
        return yv(e, n, r);
      case 4:
        return _e(
          n,
          n.stateNode.containerInfo
        ), s = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          s,
          r
        ) : an(e, n, s, r), n.child;
      case 11:
        return cv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return an(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return an(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return an(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return s = n.pendingProps, Xa(n, n.type, s.value), an(e, n, s.children, r), n.child;
      case 9:
        return c = n.type._context, s = n.pendingProps.children, Or(n), c = nn(c), s = s(c), n.flags |= 1, an(e, n, s, r), n.child;
      case 14:
        return uv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return dv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return xv(e, n, r);
      case 31:
        return qw(e, n, r);
      case 22:
        return fv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return Or(n), s = nn(kt), e === null ? (c = ju(), c === null && (c = ft, f = wu(), c.pooledCache = f, f.refCount++, f !== null && (c.pooledCacheLanes |= r), c = f), n.memoizedState = { parent: s, cache: c }, Tu(n), Xa(n, kt, c)) : ((e.lanes & r) !== 0 && (Cu(e, n), ws(n, null, null, r), Ss()), c = e.memoizedState, f = n.memoizedState, c.parent !== s ? (c = { parent: s, cache: s }, n.memoizedState = c, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = c), Xa(n, kt, s)) : (s = f.cache, Xa(n, kt, s), s !== c.cache && Su(
          n,
          [kt],
          r,
          !0
        ))), an(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(l(156, n.tag));
  }
  function Ca(e) {
    e.flags |= 4;
  }
  function od(e, n, r, s, c) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (c & 335544128) === c)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Pv()) e.flags |= 8192;
        else
          throw Ur = Ql, Nu;
    } else e.flags &= -16777217;
  }
  function wv(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Ug(n))
      if (Pv()) e.flags |= 8192;
      else
        throw Ur = Ql, Nu;
  }
  function mo(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Gt() : 536870912, e.lanes |= n, Ri |= n);
  }
  function Rs(e, n) {
    if (!Ke)
      switch (e.tailMode) {
        case "hidden":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? e.tail = null : r.sibling = null;
          break;
        case "collapsed":
          r = e.tail;
          for (var s = null; r !== null; )
            r.alternate !== null && (s = r), r = r.sibling;
          s === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null;
      }
  }
  function yt(e) {
    var n = e.alternate !== null && e.alternate.child === e.child, r = 0, s = 0;
    if (n)
      for (var c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, s |= c.subtreeFlags & 65011712, s |= c.flags & 65011712, c.return = e, c = c.sibling;
    else
      for (c = e.child; c !== null; )
        r |= c.lanes | c.childLanes, s |= c.subtreeFlags, s |= c.flags, c.return = e, c = c.sibling;
    return e.subtreeFlags |= s, e.childLanes = r, n;
  }
  function Fw(e, n, r) {
    var s = n.pendingProps;
    switch (vu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return yt(n), null;
      case 1:
        return yt(n), null;
      case 3:
        return r = n.stateNode, s = null, e !== null && (s = e.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ea(kt), $e(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(n) ? Ca(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, yu())), yt(n), null;
      case 26:
        var c = n.type, f = n.memoizedState;
        return e === null ? (Ca(n), f !== null ? (yt(n), wv(n, f)) : (yt(n), od(
          n,
          c,
          null,
          s,
          r
        ))) : f ? f !== e.memoizedState ? (Ca(n), yt(n), wv(n, f)) : (yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== s && Ca(n), yt(n), od(
          n,
          c,
          e,
          s,
          r
        )), null;
      case 27:
        if (Pt(n), r = ge.current, c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          e = le.current, pi(n) ? tp(n) : (e = _g(c, s, r), n.stateNode = e, Ca(n));
        }
        return yt(n), null;
      case 5:
        if (Pt(n), c = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          if (f = le.current, pi(n))
            tp(n);
          else {
            var x = _o(
              ge.current
            );
            switch (f) {
              case 1:
                f = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  c
                );
                break;
              case 2:
                f = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  c
                );
                break;
              default:
                switch (c) {
                  case "svg":
                    f = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      c
                    );
                    break;
                  case "math":
                    f = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      c
                    );
                    break;
                  case "script":
                    f = x.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                      f.firstChild
                    );
                    break;
                  case "select":
                    f = typeof s.is == "string" ? x.createElement("select", {
                      is: s.is
                    }) : x.createElement("select"), s.multiple ? f.multiple = !0 : s.size && (f.size = s.size);
                    break;
                  default:
                    f = typeof s.is == "string" ? x.createElement(c, { is: s.is }) : x.createElement(c);
                }
            }
            f[pe] = n, f[ve] = s;
            e: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                f.appendChild(x.stateNode);
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
            n.stateNode = f;
            e: switch (rn(f, c, s), c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
            s && Ca(n);
          }
        }
        return yt(n), od(
          n,
          n.type,
          e === null ? null : e.memoizedProps,
          n.pendingProps,
          r
        ), null;
      case 6:
        if (e && n.stateNode != null)
          e.memoizedProps !== s && Ca(n);
        else {
          if (typeof s != "string" && n.stateNode === null)
            throw Error(l(166));
          if (e = ge.current, pi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, s = null, c = tn, c !== null)
              switch (c.tag) {
                case 27:
                case 5:
                  s = c.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === r || s !== null && s.suppressHydrationWarning === !0 || yg(e.nodeValue, r)), e || Ga(n, !0);
          } else
            e = _o(e).createTextNode(
              s
            ), e[pe] = n, n.stateNode = e;
        }
        return yt(n), null;
      case 31:
        if (r = n.memoizedState, e === null || e.memoizedState !== null) {
          if (s = pi(n), r !== null) {
            if (e === null) {
              if (!s) throw Error(l(318));
              if (e = n.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), e = !1;
          } else
            r = yu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = r), e = !0;
          if (!e)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(l(558));
        }
        return yt(n), null;
      case 13:
        if (s = n.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (c = pi(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!c) throw Error(l(318));
              if (c = n.memoizedState, c = c !== null ? c.dehydrated : null, !c) throw Error(l(317));
              c[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), c = !1;
          } else
            c = yu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = c), c = !0;
          if (!c)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        return Tn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = s !== null, e = e !== null && e.memoizedState !== null, r && (s = n.child, c = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (c = s.alternate.memoizedState.cachePool.pool), f = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (f = s.memoizedState.cachePool.pool), f !== c && (s.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), mo(n, n.updateQueue), yt(n), null);
      case 4:
        return $e(), e === null && Md(n.stateNode.containerInfo), yt(n), null;
      case 10:
        return Ea(n.type), yt(n), null;
      case 19:
        if (Z(Rt), s = n.memoizedState, s === null) return yt(n), null;
        if (c = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (c) Rs(s, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = eo(e), f !== null) {
                  for (n.flags |= 128, Rs(s, !1), e = f.updateQueue, n.updateQueue = e, mo(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    Qm(r, e), r = r.sibling;
                  return P(
                    Rt,
                    Rt.current & 1 | 2
                  ), Ke && Sa(n, s.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && qt() > bo && (n.flags |= 128, c = !0, Rs(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (e = eo(f), e !== null) {
              if (n.flags |= 128, c = !0, e = e.updateQueue, n.updateQueue = e, mo(n, e), Rs(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Ke)
                return yt(n), null;
            } else
              2 * qt() - s.renderingStartTime > bo && r !== 536870912 && (n.flags |= 128, c = !0, Rs(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = qt(), e.sibling = null, r = Rt.current, P(
          Rt,
          c ? r & 1 | 2 : r & 1
        ), Ke && Sa(n, s.treeForkCount), e) : (yt(n), null);
      case 22:
      case 23:
        return Tn(n), Au(), s = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (n.flags |= 8192) : s && (n.flags |= 8192), s ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : yt(n), r = n.updateQueue, r !== null && mo(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== r && (n.flags |= 2048), e !== null && Z(kr), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ea(kt), yt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function Yw(e, n) {
    switch (vu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ea(kt), $e(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Pt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Tn(n), n.alternate === null)
            throw Error(l(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 13:
        if (Tn(n), e = n.memoizedState, e !== null && e.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(l(340));
          Dr();
        }
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 19:
        return Z(Rt), null;
      case 4:
        return $e(), null;
      case 10:
        return Ea(n.type), null;
      case 22:
      case 23:
        return Tn(n), Au(), e !== null && Z(kr), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ea(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ev(e, n) {
    switch (vu(n), n.tag) {
      case 3:
        Ea(kt), $e();
        break;
      case 26:
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        $e();
        break;
      case 31:
        n.memoizedState !== null && Tn(n);
        break;
      case 13:
        Tn(n);
        break;
      case 19:
        Z(Rt);
        break;
      case 10:
        Ea(n.type);
        break;
      case 22:
      case 23:
        Tn(n), Au(), e !== null && Z(kr);
        break;
      case 24:
        Ea(kt);
    }
  }
  function _s(e, n) {
    try {
      var r = n.updateQueue, s = r !== null ? r.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        r = c;
        do {
          if ((r.tag & e) === e) {
            s = void 0;
            var f = r.create, x = r.inst;
            s = f(), x.destroy = s;
          }
          r = r.next;
        } while (r !== c);
      }
    } catch (j) {
      rt(n, n.return, j);
    }
  }
  function Wa(e, n, r) {
    try {
      var s = n.updateQueue, c = s !== null ? s.lastEffect : null;
      if (c !== null) {
        var f = c.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            var x = s.inst, j = x.destroy;
            if (j !== void 0) {
              x.destroy = void 0, c = n;
              var L = r, X = j;
              try {
                X();
              } catch (ae) {
                rt(
                  c,
                  L,
                  ae
                );
              }
            }
          }
          s = s.next;
        } while (s !== f);
      }
    } catch (ae) {
      rt(n, n.return, ae);
    }
  }
  function jv(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        mp(n, r);
      } catch (s) {
        rt(e, e.return, s);
      }
    }
  }
  function Nv(e, n, r) {
    r.props = $r(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (s) {
      rt(e, n, s);
    }
  }
  function Ms(e, n) {
    try {
      var r = e.ref;
      if (r !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var s = e.stateNode;
            break;
          case 30:
            s = e.stateNode;
            break;
          default:
            s = e.stateNode;
        }
        typeof r == "function" ? e.refCleanup = r(s) : r.current = s;
      }
    } catch (c) {
      rt(e, n, c);
    }
  }
  function fa(e, n) {
    var r = e.ref, s = e.refCleanup;
    if (r !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (c) {
          rt(e, n, c);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (c) {
          rt(e, n, c);
        }
      else r.current = null;
  }
  function Tv(e) {
    var n = e.type, r = e.memoizedProps, s = e.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && s.focus();
          break e;
        case "img":
          r.src ? s.src = r.src : r.srcSet && (s.srcset = r.srcSet);
      }
    } catch (c) {
      rt(e, e.return, c);
    }
  }
  function cd(e, n, r) {
    try {
      var s = e.stateNode;
      hE(s, e.type, r, n), s[ve] = n;
    } catch (c) {
      rt(e, e.return, c);
    }
  }
  function Cv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sr(e.type) || e.tag === 4;
  }
  function ud(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Cv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && sr(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function dd(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = ya));
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (dd(e, n, r), e = e.sibling; e !== null; )
        dd(e, n, r), e = e.sibling;
  }
  function po(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (po(e, n, r), e = e.sibling; e !== null; )
        po(e, n, r), e = e.sibling;
  }
  function Rv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var s = e.type, c = n.attributes; c.length; )
        n.removeAttributeNode(c[0]);
      rn(n, s, r), n[pe] = e, n[ve] = r;
    } catch (f) {
      rt(e, e.return, f);
    }
  }
  var Ra = !1, Bt = !1, fd = !1, _v = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Gw(e, n) {
    if (e = e.containerInfo, zd = Lo, e = Hm(e), iu(e)) {
      if ("selectionStart" in e)
        var r = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          r = (r = e.ownerDocument) && r.defaultView || window;
          var s = r.getSelection && r.getSelection();
          if (s && s.rangeCount !== 0) {
            r = s.anchorNode;
            var c = s.anchorOffset, f = s.focusNode;
            s = s.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, j = -1, L = -1, X = 0, ae = 0, oe = e, K = null;
            t: for (; ; ) {
              for (var ee; oe !== r || c !== 0 && oe.nodeType !== 3 || (j = x + c), oe !== f || s !== 0 && oe.nodeType !== 3 || (L = x + s), oe.nodeType === 3 && (x += oe.nodeValue.length), (ee = oe.firstChild) !== null; )
                K = oe, oe = ee;
              for (; ; ) {
                if (oe === e) break t;
                if (K === r && ++X === c && (j = x), K === f && ++ae === s && (L = x), (ee = oe.nextSibling) !== null) break;
                oe = K, K = oe.parentNode;
              }
              oe = ee;
            }
            r = j === -1 || L === -1 ? null : { start: j, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (Od = { focusedElem: e, selectionRange: r }, Lo = !1, Qt = n; Qt !== null; )
      if (n = Qt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (n = Qt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  c = e[r], c.ref.impl = c.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = n, c = f.memoizedProps, f = f.memoizedState, s = r.stateNode;
                try {
                  var xe = $r(
                    r.type,
                    c
                  );
                  e = s.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), s.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Me) {
                  rt(
                    r,
                    r.return,
                    Me
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = n.stateNode.containerInfo, r = e.nodeType, r === 9)
                  Ud(e);
                else if (r === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ud(e);
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
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (e = n.sibling, e !== null) {
            e.return = n.return, Qt = e;
            break;
          }
          Qt = n.return;
        }
  }
  function Mv(e, n, r) {
    var s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Ma(e, r), s & 4 && _s(5, r);
        break;
      case 1:
        if (Ma(e, r), s & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              rt(r, r.return, x);
            }
          else {
            var c = $r(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                c,
                n,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              rt(
                r,
                r.return,
                x
              );
            }
          }
        s & 64 && jv(r), s & 512 && Ms(r, r.return);
        break;
      case 3:
        if (Ma(e, r), s & 64 && (e = r.updateQueue, e !== null)) {
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
            mp(e, n);
          } catch (x) {
            rt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Rv(r);
      case 26:
      case 5:
        Ma(e, r), n === null && s & 4 && Tv(r), s & 512 && Ms(r, r.return);
        break;
      case 12:
        Ma(e, r);
        break;
      case 31:
        Ma(e, r), s & 4 && zv(e, r);
        break;
      case 13:
        Ma(e, r), s & 4 && Ov(e, r), s & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = tE.bind(
          null,
          r
        ), SE(e, r))));
        break;
      case 22:
        if (s = r.memoizedState !== null || Ra, !s) {
          n = n !== null && n.memoizedState !== null || Bt, c = Ra;
          var f = Bt;
          Ra = s, (Bt = n) && !f ? Aa(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Ma(e, r), Ra = c, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        Ma(e, r);
    }
  }
  function Av(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Av(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && dt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function _a(e, n, r) {
    for (r = r.child; r !== null; )
      Dv(e, n, r), r = r.sibling;
  }
  function Dv(e, n, r) {
    if (Wt && typeof Wt.onCommitFiberUnmount == "function")
      try {
        Wt.onCommitFiberUnmount(Zn, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        Bt || fa(r, n), _a(
          e,
          n,
          r
        ), r.memoizedState ? r.memoizedState.count-- : r.stateNode && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        Bt || fa(r, n);
        var s = wt, c = pn;
        sr(r.type) && (wt = r.stateNode, pn = !1), _a(
          e,
          n,
          r
        ), Vs(r.stateNode), wt = s, pn = c;
        break;
      case 5:
        Bt || fa(r, n);
      case 6:
        if (s = wt, c = pn, wt = null, _a(
          e,
          n,
          r
        ), wt = s, pn = c, wt !== null)
          if (pn)
            try {
              (wt.nodeType === 9 ? wt.body : wt.nodeName === "HTML" ? wt.ownerDocument.body : wt).removeChild(r.stateNode);
            } catch (f) {
              rt(
                r,
                n,
                f
              );
            }
          else
            try {
              wt.removeChild(r.stateNode);
            } catch (f) {
              rt(
                r,
                n,
                f
              );
            }
        break;
      case 18:
        wt !== null && (pn ? (e = wt, jg(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : jg(wt, r.stateNode));
        break;
      case 4:
        s = wt, c = pn, wt = r.stateNode.containerInfo, pn = !0, _a(
          e,
          n,
          r
        ), wt = s, pn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wa(2, r, n), Bt || Wa(4, r, n), _a(
          e,
          n,
          r
        );
        break;
      case 1:
        Bt || (fa(r, n), s = r.stateNode, typeof s.componentWillUnmount == "function" && Nv(
          r,
          n,
          s
        )), _a(
          e,
          n,
          r
        );
        break;
      case 21:
        _a(
          e,
          n,
          r
        );
        break;
      case 22:
        Bt = (s = Bt) || r.memoizedState !== null, _a(
          e,
          n,
          r
        ), Bt = s;
        break;
      default:
        _a(
          e,
          n,
          r
        );
    }
  }
  function zv(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Li(e);
      } catch (r) {
        rt(n, n.return, r);
      }
    }
  }
  function Ov(e, n) {
    if (n.memoizedState === null && (e = n.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Li(e);
      } catch (r) {
        rt(n, n.return, r);
      }
  }
  function Xw(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var n = e.stateNode;
        return n === null && (n = e.stateNode = new _v()), n;
      case 22:
        return e = e.stateNode, n = e._retryCache, n === null && (n = e._retryCache = new _v()), n;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function vo(e, n) {
    var r = Xw(e);
    n.forEach(function(s) {
      if (!r.has(s)) {
        r.add(s);
        var c = nE.bind(null, e, s);
        s.then(c, c);
      }
    });
  }
  function vn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var s = 0; s < r.length; s++) {
        var c = r[s], f = e, x = n, j = x;
        e: for (; j !== null; ) {
          switch (j.tag) {
            case 27:
              if (sr(j.type)) {
                wt = j.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              wt = j.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              wt = j.stateNode.containerInfo, pn = !0;
              break e;
          }
          j = j.return;
        }
        if (wt === null) throw Error(l(160));
        Dv(f, x, c), wt = null, pn = !1, f = c.alternate, f !== null && (f.return = null), c.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        kv(n, e), n = n.sibling;
  }
  var ta = null;
  function kv(e, n) {
    var r = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(n, e), gn(e), s & 4 && (Wa(3, e, e.return), _s(3, e), Wa(5, e, e.return));
        break;
      case 1:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 64 && Ra && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? s : r.concat(s))));
        break;
      case 26:
        var c = ta;
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (s = e.memoizedState, r === null)
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  s = e.type, r = e.memoizedProps, c = c.ownerDocument || c;
                  t: switch (s) {
                    case "title":
                      f = c.getElementsByTagName("title")[0], (!f || f[He] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = c.createElement(s), c.head.insertBefore(
                        f,
                        c.querySelector("head > title")
                      )), rn(f, s, r), f[pe] = e, mt(f), s = f;
                      break e;
                    case "link":
                      var x = kg(
                        "link",
                        "href",
                        c
                      ).get(s + (r.href || ""));
                      if (x) {
                        for (var j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(s), rn(f, s, r), c.head.appendChild(f);
                      break;
                    case "meta":
                      if (x = kg(
                        "meta",
                        "content",
                        c
                      ).get(s + (r.content || ""))) {
                        for (j = 0; j < x.length; j++)
                          if (f = x[j], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(j, 1);
                            break t;
                          }
                      }
                      f = c.createElement(s), rn(f, s, r), c.head.appendChild(f);
                      break;
                    default:
                      throw Error(l(468, s));
                  }
                  f[pe] = e, mt(f), s = f;
                }
                e.stateNode = s;
              } else
                Lg(
                  c,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Og(
                c,
                s,
                e.memoizedProps
              );
          else
            f !== s ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, s === null ? Lg(
              c,
              e.type,
              e.stateNode
            ) : Og(
              c,
              s,
              e.memoizedProps
            )) : s === null && e.stateNode !== null && cd(
              e,
              e.memoizedProps,
              r.memoizedProps
            );
        }
        break;
      case 27:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), r !== null && s & 4 && cd(
          e,
          e.memoizedProps,
          r.memoizedProps
        );
        break;
      case 5:
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), e.flags & 32) {
          c = e.stateNode;
          try {
            ii(c, "");
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        s & 4 && e.stateNode != null && (c = e.memoizedProps, cd(
          e,
          c,
          r !== null ? r.memoizedProps : c
        )), s & 1024 && (fd = !0);
        break;
      case 6:
        if (vn(n, e), gn(e), s & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          s = e.memoizedProps, r = e.stateNode;
          try {
            r.nodeValue = s;
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        break;
      case 3:
        if (Do = null, c = ta, ta = Mo(n.containerInfo), vn(n, e), ta = c, gn(e), s & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (xe) {
            rt(e, e.return, xe);
          }
        fd && (fd = !1, Lv(e));
        break;
      case 4:
        s = ta, ta = Mo(
          e.stateNode.containerInfo
        ), vn(n, e), gn(e), ta = s;
        break;
      case 12:
        vn(n, e), gn(e);
        break;
      case 31:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
        break;
      case 13:
        vn(n, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (yo = qt()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
        break;
      case 22:
        c = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, X = Ra, ae = Bt;
        if (Ra = X || c, Bt = ae || L, vn(n, e), Bt = ae, Ra = X, gn(e), s & 8192)
          e: for (n = e.stateNode, n._visibility = c ? n._visibility & -2 : n._visibility | 1, c && (r === null || L || Ra || Bt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (f = L.stateNode, c)
                    x = f.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    j = L.stateNode;
                    var oe = L.memoizedProps.style, K = oe != null && oe.hasOwnProperty("display") ? oe.display : null;
                    j.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = c ? "" : L.memoizedProps;
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var ee = L.stateNode;
                  c ? Ng(ee, !0) : Ng(L.stateNode, !1);
                } catch (xe) {
                  rt(L, L.return, xe);
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
        s & 4 && (s = e.updateQueue, s !== null && (r = s.retryQueue, r !== null && (s.retryQueue = null, vo(e, r))));
        break;
      case 19:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, vo(e, s)));
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
        for (var r, s = e.return; s !== null; ) {
          if (Cv(s)) {
            r = s;
            break;
          }
          s = s.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var c = r.stateNode, f = ud(e);
            po(e, f, c);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ii(x, ""), r.flags &= -33);
            var j = ud(e);
            po(e, j, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, X = ud(e);
            dd(
              e,
              X,
              L
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (ae) {
        rt(e, e.return, ae);
      }
      e.flags &= -3;
    }
    n & 4096 && (e.flags &= -4097);
  }
  function Lv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Lv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Ma(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Mv(e, n.alternate, n), n = n.sibling;
  }
  function Hr(e) {
    for (e = e.child; e !== null; ) {
      var n = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wa(4, n, n.return), Hr(n);
          break;
        case 1:
          fa(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Nv(
            n,
            n.return,
            r
          ), Hr(n);
          break;
        case 27:
          Vs(n.stateNode);
        case 26:
        case 5:
          fa(n, n.return), Hr(n);
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
  function Aa(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var s = n.alternate, c = e, f = n, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Aa(
            c,
            f,
            r
          ), _s(4, f);
          break;
        case 1:
          if (Aa(
            c,
            f,
            r
          ), s = f, c = s.stateNode, typeof c.componentDidMount == "function")
            try {
              c.componentDidMount();
            } catch (X) {
              rt(s, s.return, X);
            }
          if (s = f, c = s.updateQueue, c !== null) {
            var j = s.stateNode;
            try {
              var L = c.shared.hiddenCallbacks;
              if (L !== null)
                for (c.shared.hiddenCallbacks = null, c = 0; c < L.length; c++)
                  hp(L[c], j);
            } catch (X) {
              rt(s, s.return, X);
            }
          }
          r && x & 64 && jv(f), Ms(f, f.return);
          break;
        case 27:
          Rv(f);
        case 26:
        case 5:
          Aa(
            c,
            f,
            r
          ), r && s === null && x & 4 && Tv(f), Ms(f, f.return);
          break;
        case 12:
          Aa(
            c,
            f,
            r
          );
          break;
        case 31:
          Aa(
            c,
            f,
            r
          ), r && x & 4 && zv(c, f);
          break;
        case 13:
          Aa(
            c,
            f,
            r
          ), r && x & 4 && Ov(c, f);
          break;
        case 22:
          f.memoizedState === null && Aa(
            c,
            f,
            r
          ), Ms(f, f.return);
          break;
        case 30:
          break;
        default:
          Aa(
            c,
            f,
            r
          );
      }
      n = n.sibling;
    }
  }
  function hd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && vs(r));
  }
  function md(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && vs(e));
  }
  function na(e, n, r, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Uv(
          e,
          n,
          r,
          s
        ), n = n.sibling;
  }
  function Uv(e, n, r, s) {
    var c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          n,
          r,
          s
        ), c & 2048 && _s(9, n);
        break;
      case 1:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 3:
        na(
          e,
          n,
          r,
          s
        ), c & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && vs(e)));
        break;
      case 12:
        if (c & 2048) {
          na(
            e,
            n,
            r,
            s
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, x = f.id, j = f.onPostCommit;
            typeof j == "function" && j(
              x,
              n.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            rt(n, n.return, L);
          }
        } else
          na(
            e,
            n,
            r,
            s
          );
        break;
      case 31:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 13:
        na(
          e,
          n,
          r,
          s
        );
        break;
      case 23:
        break;
      case 22:
        f = n.stateNode, x = n.alternate, n.memoizedState !== null ? f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : As(e, n) : f._visibility & 2 ? na(
          e,
          n,
          r,
          s
        ) : (f._visibility |= 2, Ni(
          e,
          n,
          r,
          s,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), c & 2048 && hd(x, n);
        break;
      case 24:
        na(
          e,
          n,
          r,
          s
        ), c & 2048 && md(n.alternate, n);
        break;
      default:
        na(
          e,
          n,
          r,
          s
        );
    }
  }
  function Ni(e, n, r, s, c) {
    for (c = c && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, x = n, j = r, L = s, X = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            x,
            j,
            L,
            c
          ), _s(8, x);
          break;
        case 23:
          break;
        case 22:
          var ae = x.stateNode;
          x.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            x,
            j,
            L,
            c
          ) : As(
            f,
            x
          ) : (ae._visibility |= 2, Ni(
            f,
            x,
            j,
            L,
            c
          )), c && X & 2048 && hd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ni(
            f,
            x,
            j,
            L,
            c
          ), c && X & 2048 && md(x.alternate, x);
          break;
        default:
          Ni(
            f,
            x,
            j,
            L,
            c
          );
      }
      n = n.sibling;
    }
  }
  function As(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, s = n, c = s.flags;
        switch (s.tag) {
          case 22:
            As(r, s), c & 2048 && hd(
              s.alternate,
              s
            );
            break;
          case 24:
            As(r, s), c & 2048 && md(s.alternate, s);
            break;
          default:
            As(r, s);
        }
        n = n.sibling;
      }
  }
  var Ds = 8192;
  function Ti(e, n, r) {
    if (e.subtreeFlags & Ds)
      for (e = e.child; e !== null; )
        Bv(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function Bv(e, n, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          n,
          r
        ), e.flags & Ds && e.memoizedState !== null && zE(
          r,
          ta,
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
        var s = ta;
        ta = Mo(e.stateNode.containerInfo), Ti(
          e,
          n,
          r
        ), ta = s;
        break;
      case 22:
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = Ds, Ds = 16777216, Ti(
          e,
          n,
          r
        ), Ds = s) : Ti(
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
  function Vv(e) {
    var n = e.alternate;
    if (n !== null && (e = n.child, e !== null)) {
      n.child = null;
      do
        n = e.sibling, e.sibling = null, e = n;
      while (e !== null);
    }
  }
  function zs(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, Hv(
            s,
            e
          );
        }
      Vv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        $v(e), e = e.sibling;
  }
  function $v(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        zs(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        zs(e);
        break;
      case 12:
        zs(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, go(e)) : zs(e);
        break;
      default:
        zs(e);
    }
  }
  function go(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, Hv(
            s,
            e
          );
        }
      Vv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (n = e, n.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, n, n.return), go(n);
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
  function Hv(e, n) {
    for (; Qt !== null; ) {
      var r = Qt;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Wa(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var s = r.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          vs(r.memoizedState.cache);
      }
      if (s = r.child, s !== null) s.return = r, Qt = s;
      else
        e: for (r = e; Qt !== null; ) {
          s = Qt;
          var c = s.sibling, f = s.return;
          if (Av(s), s === r) {
            Qt = null;
            break e;
          }
          if (c !== null) {
            c.return = f, Qt = c;
            break e;
          }
          Qt = f;
        }
    }
  }
  var Pw = {
    getCacheForType: function(e) {
      var n = nn(kt), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return nn(kt).controller.signal;
    }
  }, Kw = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ft = null, Ye = null, Xe = 0, at = 0, Cn = null, er = !1, Ci = !1, pd = !1, Da = 0, Nt = 0, tr = 0, qr = 0, vd = 0, Rn = 0, Ri = 0, Os = null, yn = null, gd = !1, yo = 0, qv = 0, bo = 1 / 0, xo = null, nr = null, Xt = 0, ar = null, _i = null, za = 0, yd = 0, bd = null, Iv = null, ks = 0, xd = null;
  function _n() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : O.T !== null ? Td() : ue();
  }
  function Fv() {
    if (Rn === 0)
      if ((Xe & 536870912) === 0 || Ke) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, n, r) {
    (e === ft && (at === 2 || at === 9) || e.cancelPendingCommit !== null) && (Mi(e, 0), rr(
      e,
      Xe,
      Rn,
      !1
    )), it(e, r), ((tt & 2) === 0 || e !== ft) && (e === ft && ((tt & 2) === 0 && (qr |= r), Nt === 4 && rr(
      e,
      Xe,
      Rn,
      !1
    )), ha(e));
  }
  function Yv(e, n, r) {
    if ((tt & 6) !== 0) throw Error(l(327));
    var s = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ut(e, n), c = s ? Jw(e, n) : wd(e, n, !0), f = s;
    do {
      if (c === 0) {
        Ci && !s && rr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Qw(r)) {
          c = wd(e, n, !1), f = !1;
          continue;
        }
        if (c === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var j = e;
              c = Os;
              var L = j.current.memoizedState.isDehydrated;
              if (L && (Mi(j, x).flags |= 256), x = wd(
                j,
                x,
                !1
              ), x !== 2) {
                if (pd && !L) {
                  j.errorRecoveryDisabledLanes |= f, qr |= f, c = 4;
                  break e;
                }
                f = yn, yn = c, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              c = x;
            }
            if (f = !1, c !== 2) continue;
          }
        }
        if (c === 1) {
          Mi(e, 0), rr(e, n, 0, !0);
          break;
        }
        e: {
          switch (s = e, f = c, f) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              rr(
                s,
                n,
                Rn,
                !er
              );
              break e;
            case 2:
              yn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((n & 62914560) === n && (c = yo + 300 - qt(), 10 < c)) {
            if (rr(
              s,
              n,
              Rn,
              !er
            ), Oe(s, 0, !0) !== 0) break e;
            za = n, s.timeoutHandle = wg(
              Gv.bind(
                null,
                s,
                r,
                yn,
                xo,
                gd,
                n,
                Rn,
                qr,
                Ri,
                er,
                f,
                "Throttled",
                -0,
                0
              ),
              c
            );
            break e;
          }
          Gv(
            s,
            r,
            yn,
            xo,
            gd,
            n,
            Rn,
            qr,
            Ri,
            er,
            f,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ha(e);
  }
  function Gv(e, n, r, s, c, f, x, j, L, X, ae, oe, K, ee) {
    if (e.timeoutHandle = -1, oe = n.subtreeFlags, oe & 8192 || (oe & 16785408) === 16785408) {
      oe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ya
      }, Bv(
        n,
        f,
        oe
      );
      var xe = (f & 62914560) === f ? yo - qt() : (f & 4194048) === f ? qv - qt() : 0;
      if (xe = OE(
        oe,
        xe
      ), xe !== null) {
        za = f, e.cancelPendingCommit = xe(
          eg.bind(
            null,
            e,
            n,
            f,
            r,
            s,
            c,
            x,
            j,
            L,
            ae,
            oe,
            null,
            K,
            ee
          )
        ), rr(e, f, x, !X);
        return;
      }
    }
    eg(
      e,
      n,
      f,
      r,
      s,
      c,
      x,
      j,
      L
    );
  }
  function Qw(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var s = 0; s < r.length; s++) {
          var c = r[s], f = c.getSnapshot;
          c = c.value;
          try {
            if (!En(f(), c)) return !1;
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
  function rr(e, n, r, s) {
    n &= ~vd, n &= ~qr, e.suspendedLanes |= n, e.pingedLanes &= ~n, s && (e.warmLanes |= n), s = e.expirationTimes;
    for (var c = n; 0 < c; ) {
      var f = 31 - Yt(c), x = 1 << f;
      s[f] = -1, c &= ~x;
    }
    r !== 0 && ga(e, r, n);
  }
  function So() {
    return (tt & 6) === 0 ? (Ls(0), !1) : !0;
  }
  function Sd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, wa = zr = null, Uu(e), xi = null, ys = 0, e = Ye;
      for (; e !== null; )
        Ev(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function Mi(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, vE(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), za = 0, Sd(), ft = e, Ye = r = xa(e.current, null), Xe = n, at = 0, Cn = null, er = !1, Ci = ut(e, n), pd = !1, Ri = Rn = vd = qr = tr = Nt = 0, yn = Os = null, gd = !1, (n & 8) !== 0 && (n |= n & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= n; 0 < s; ) {
        var c = 31 - Yt(s), f = 1 << c;
        n |= e[c], s &= ~f;
      }
    return Da = n, Hl(), r;
  }
  function Xv(e, n) {
    Ue = null, O.H = Ts, n === bi || n === Kl ? (n = cp(), at = 3) : n === Nu ? (n = cp(), at = 4) : at = n === Wu ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Cn = n, Ye === null && (Nt = 1, co(
      e,
      Bn(n, e.current)
    ));
  }
  function Pv() {
    var e = Nn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? qn === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === qn : !1;
  }
  function Kv() {
    var e = O.H;
    return O.H = Ts, e === null ? Ts : e;
  }
  function Qv() {
    var e = O.A;
    return O.A = Pw, e;
  }
  function wo() {
    Nt = 4, er || (Xe & 4194048) !== Xe && Nn.current !== null || (Ci = !0), (tr & 134217727) === 0 && (qr & 134217727) === 0 || ft === null || rr(
      ft,
      Xe,
      Rn,
      !1
    );
  }
  function wd(e, n, r) {
    var s = tt;
    tt |= 2;
    var c = Kv(), f = Qv();
    (ft !== e || Xe !== n) && (xo = null, Mi(e, n)), n = !1;
    var x = Nt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var j = Ye, L = Cn;
          switch (at) {
            case 8:
              Sd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var X = at;
              if (at = 0, Cn = null, Ai(e, j, L, X), r && Ci) {
                x = 0;
                break e;
              }
              break;
            default:
              X = at, at = 0, Cn = null, Ai(e, j, L, X);
          }
        }
        Zw(), x = Nt;
        break;
      } catch (ae) {
        Xv(e, ae);
      }
    while (!0);
    return n && e.shellSuspendCounter++, wa = zr = null, tt = s, O.H = c, O.A = f, Ye === null && (ft = null, Xe = 0, Hl()), x;
  }
  function Zw() {
    for (; Ye !== null; ) Zv(Ye);
  }
  function Jw(e, n) {
    var r = tt;
    tt |= 2;
    var s = Kv(), c = Qv();
    ft !== e || Xe !== n ? (xo = null, bo = qt() + 500, Mi(e, n)) : Ci = ut(
      e,
      n
    );
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          n = Ye;
          var f = Cn;
          t: switch (at) {
            case 1:
              at = 0, Cn = null, Ai(e, n, f, 1);
              break;
            case 2:
            case 9:
              if (lp(f)) {
                at = 0, Cn = null, Jv(n);
                break;
              }
              n = function() {
                at !== 2 && at !== 9 || ft !== e || (at = 7), ha(e);
              }, f.then(n, n);
              break e;
            case 3:
              at = 7;
              break e;
            case 4:
              at = 5;
              break e;
            case 7:
              lp(f) ? (at = 0, Cn = null, Jv(n)) : (at = 0, Cn = null, Ai(e, n, f, 7));
              break;
            case 5:
              var x = null;
              switch (Ye.tag) {
                case 26:
                  x = Ye.memoizedState;
                case 5:
                case 27:
                  var j = Ye;
                  if (x ? Ug(x) : j.stateNode.complete) {
                    at = 0, Cn = null;
                    var L = j.sibling;
                    if (L !== null) Ye = L;
                    else {
                      var X = j.return;
                      X !== null ? (Ye = X, Eo(X)) : Ye = null;
                    }
                    break t;
                  }
              }
              at = 0, Cn = null, Ai(e, n, f, 5);
              break;
            case 6:
              at = 0, Cn = null, Ai(e, n, f, 6);
              break;
            case 8:
              Sd(), Nt = 6;
              break e;
            default:
              throw Error(l(462));
          }
        }
        Ww();
        break;
      } catch (ae) {
        Xv(e, ae);
      }
    while (!0);
    return wa = zr = null, O.H = s, O.A = c, tt = r, Ye !== null ? 0 : (ft = null, Xe = 0, Hl(), Nt);
  }
  function Ww() {
    for (; Ye !== null && !Ht(); )
      Zv(Ye);
  }
  function Zv(e) {
    var n = Sv(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Jv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = pv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = pv(
          r,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Xe
        );
        break;
      case 5:
        Uu(n);
      default:
        Ev(r, n), n = Ye = Qm(n, Da), n = Sv(r, n, Da);
    }
    e.memoizedProps = e.pendingProps, n === null ? Eo(e) : Ye = n;
  }
  function Ai(e, n, r, s) {
    wa = zr = null, Uu(n), xi = null, ys = 0;
    var c = n.return;
    try {
      if (Hw(
        e,
        c,
        n,
        r,
        Xe
      )) {
        Nt = 1, co(
          e,
          Bn(r, e.current)
        ), Ye = null;
        return;
      }
    } catch (f) {
      if (c !== null) throw Ye = c, f;
      Nt = 1, co(
        e,
        Bn(r, e.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Ke || s === 1 ? e = !0 : Ci || (Xe & 536870912) !== 0 ? e = !1 : (er = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Nn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), Wv(n, e)) : Eo(n);
  }
  function Eo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        Wv(
          n,
          er
        );
        return;
      }
      e = n.return;
      var r = Fw(
        n.alternate,
        n,
        Da
      );
      if (r !== null) {
        Ye = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ye = n;
        return;
      }
      Ye = n = e;
    } while (n !== null);
    Nt === 0 && (Nt = 5);
  }
  function Wv(e, n) {
    do {
      var r = Yw(e.alternate, e);
      if (r !== null) {
        r.flags &= 32767, Ye = r;
        return;
      }
      if (r = e.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (e = e.sibling, e !== null)) {
        Ye = e;
        return;
      }
      Ye = e = r;
    } while (e !== null);
    Nt = 6, Ye = null;
  }
  function eg(e, n, r, s, c, f, x, j, L) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (Xt !== 0);
    if ((tt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (f = n.lanes | n.childLanes, f |= uu, en(
        e,
        r,
        f,
        x,
        j,
        L
      ), e === ft && (Ye = ft = null, Xe = 0), _i = n, ar = e, za = r, yd = f, bd = c, Iv = s, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, aE(nt, function() {
        return ig(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), s = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || s) {
        s = O.T, O.T = null, c = C.p, C.p = 2, x = tt, tt |= 4;
        try {
          Gw(e, n, r);
        } finally {
          tt = x, C.p = c, O.T = s;
        }
      }
      Xt = 1, tg(), ng(), ag();
    }
  }
  function tg() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, n = _i, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null;
        var s = C.p;
        C.p = 2;
        var c = tt;
        tt |= 4;
        try {
          kv(n, e);
          var f = Od, x = Hm(e.containerInfo), j = f.focusedElem, L = f.selectionRange;
          if (x !== j && j && j.ownerDocument && $m(
            j.ownerDocument.documentElement,
            j
          )) {
            if (L !== null && iu(j)) {
              var X = L.start, ae = L.end;
              if (ae === void 0 && (ae = X), "selectionStart" in j)
                j.selectionStart = X, j.selectionEnd = Math.min(
                  ae,
                  j.value.length
                );
              else {
                var oe = j.ownerDocument || document, K = oe && oe.defaultView || window;
                if (K.getSelection) {
                  var ee = K.getSelection(), xe = j.textContent.length, Me = Math.min(L.start, xe), ct = L.end === void 0 ? Me : Math.min(L.end, xe);
                  !ee.extend && Me > ct && (x = ct, ct = Me, Me = x);
                  var H = Vm(
                    j,
                    Me
                  ), V = Vm(
                    j,
                    ct
                  );
                  if (H && V && (ee.rangeCount !== 1 || ee.anchorNode !== H.node || ee.anchorOffset !== H.offset || ee.focusNode !== V.node || ee.focusOffset !== V.offset)) {
                    var G = oe.createRange();
                    G.setStart(H.node, H.offset), ee.removeAllRanges(), Me > ct ? (ee.addRange(G), ee.extend(V.node, V.offset)) : (G.setEnd(V.node, V.offset), ee.addRange(G));
                  }
                }
              }
            }
            for (oe = [], ee = j; ee = ee.parentNode; )
              ee.nodeType === 1 && oe.push({
                element: ee,
                left: ee.scrollLeft,
                top: ee.scrollTop
              });
            for (typeof j.focus == "function" && j.focus(), j = 0; j < oe.length; j++) {
              var se = oe[j];
              se.element.scrollLeft = se.left, se.element.scrollTop = se.top;
            }
          }
          Lo = !!zd, Od = zd = null;
        } finally {
          tt = c, C.p = s, O.T = r;
        }
      }
      e.current = n, Xt = 2;
    }
  }
  function ng() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, n = _i, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = O.T, O.T = null;
        var s = C.p;
        C.p = 2;
        var c = tt;
        tt |= 4;
        try {
          Mv(e, n.alternate, n);
        } finally {
          tt = c, C.p = s, O.T = r;
        }
      }
      Xt = 3;
    }
  }
  function ag() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, On();
      var e = ar, n = _i, r = za, s = Iv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, _i = ar = null, rg(e, e.pendingLanes));
      var c = e.pendingLanes;
      if (c === 0 && (nr = null), Y(r), n = n.stateNode, Wt && typeof Wt.onCommitFiberRoot == "function")
        try {
          Wt.onCommitFiberRoot(
            Zn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        n = O.T, c = C.p, C.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, x = 0; x < s.length; x++) {
            var j = s[x];
            f(j.value, {
              componentStack: j.stack
            });
          }
        } finally {
          O.T = n, C.p = c;
        }
      }
      (za & 3) !== 0 && jo(), ha(e), c = e.pendingLanes, (r & 261930) !== 0 && (c & 42) !== 0 ? e === xd ? ks++ : (ks = 0, xd = e) : ks = 0, Ls(0);
    }
  }
  function rg(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, vs(n)));
  }
  function jo() {
    return tg(), ng(), ag(), ig();
  }
  function ig() {
    if (Xt !== 5) return !1;
    var e = ar, n = yd;
    yd = 0;
    var r = Y(za), s = O.T, c = C.p;
    try {
      C.p = 32 > r ? 32 : r, O.T = null, r = bd, bd = null;
      var f = ar, x = za;
      if (Xt = 0, _i = ar = null, za = 0, (tt & 6) !== 0) throw Error(l(331));
      var j = tt;
      if (tt |= 4, $v(f.current), Uv(
        f,
        f.current,
        x,
        r
      ), tt = j, Ls(0, !1), Wt && typeof Wt.onPostCommitFiberRoot == "function")
        try {
          Wt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      C.p = c, O.T = s, rg(e, n);
    }
  }
  function sg(e, n, r) {
    n = Bn(r, n), n = Ju(e.stateNode, n, 2), e = Qa(e, n, 2), e !== null && (it(e, 2), ha(e));
  }
  function rt(e, n, r) {
    if (e.tag === 3)
      sg(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          sg(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (nr === null || !nr.has(s))) {
            e = Bn(r, e), r = lv(2), s = Qa(n, r, 2), s !== null && (ov(
              r,
              s,
              n,
              e
            ), it(s, 2), ha(s));
            break;
          }
        }
        n = n.return;
      }
  }
  function Ed(e, n, r) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Kw();
      var c = /* @__PURE__ */ new Set();
      s.set(n, c);
    } else
      c = s.get(n), c === void 0 && (c = /* @__PURE__ */ new Set(), s.set(n, c));
    c.has(r) || (pd = !0, c.add(r), e = eE.bind(null, e, n, r), n.then(e, e));
  }
  function eE(e, n, r) {
    var s = e.pingCache;
    s !== null && s.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ft === e && (Xe & r) === r && (Nt === 4 || Nt === 3 && (Xe & 62914560) === Xe && 300 > qt() - yo ? (tt & 2) === 0 && Mi(e, 0) : vd |= r, Ri === Xe && (Ri = 0)), ha(e);
  }
  function lg(e, n) {
    n === 0 && (n = Gt()), e = Mr(e, n), e !== null && (it(e, n), ha(e));
  }
  function tE(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), lg(e, r);
  }
  function nE(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode, c = e.memoizedState;
        c !== null && (r = c.retryLane);
        break;
      case 19:
        s = e.stateNode;
        break;
      case 22:
        s = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    s !== null && s.delete(n), lg(e, r);
  }
  function aE(e, n) {
    return xt(e, n);
  }
  var No = null, Di = null, jd = !1, To = !1, Nd = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? No = Di = e : Di = Di.next = e), To = !0, jd || (jd = !0, iE());
  }
  function Ls(e, n) {
    if (!Nd && To) {
      Nd = !0;
      do
        for (var r = !1, s = No; s !== null; ) {
          if (e !== 0) {
            var c = s.pendingLanes;
            if (c === 0) var f = 0;
            else {
              var x = s.suspendedLanes, j = s.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= c & ~(x & ~j), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, dg(s, f));
          } else
            f = Xe, f = Oe(
              s,
              s === ft ? f : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(s, f) || (r = !0, dg(s, f));
          s = s.next;
        }
      while (r);
      Nd = !1;
    }
  }
  function rE() {
    og();
  }
  function og() {
    To = jd = !1;
    var e = 0;
    ir !== 0 && pE() && (e = ir);
    for (var n = qt(), r = null, s = No; s !== null; ) {
      var c = s.next, f = cg(s, n);
      f === 0 ? (s.next = null, r === null ? No = c : r.next = c, c === null && (Di = r)) : (r = s, (e !== 0 || (f & 3) !== 0) && (To = !0)), s = c;
    }
    Xt !== 0 && Xt !== 5 || Ls(e), ir !== 0 && (ir = 0);
  }
  function cg(e, n) {
    for (var r = e.suspendedLanes, s = e.pingedLanes, c = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var x = 31 - Yt(f), j = 1 << x, L = c[x];
      L === -1 ? ((j & r) === 0 || (j & s) !== 0) && (c[x] = Dt(j, n)) : L <= n && (e.expiredLanes |= j), f &= ~j;
    }
    if (n = ft, r = Xe, r = Oe(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s = e.callbackNode, r === 0 || e === n && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return s !== null && s !== null && dn(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (s !== null && dn(s), Y(r)) {
        case 2:
        case 8:
          r = Qe;
          break;
        case 32:
          r = nt;
          break;
        case 268435456:
          r = Ft;
          break;
        default:
          r = nt;
      }
      return s = ug.bind(null, e), r = xt(r, s), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return s !== null && s !== null && dn(s), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function ug(e, n) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (jo() && e.callbackNode !== r)
      return null;
    var s = Xe;
    return s = Oe(
      e,
      e === ft ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s === 0 ? null : (Yv(e, s, n), cg(e, qt()), e.callbackNode != null && e.callbackNode === r ? ug.bind(null, e) : null);
  }
  function dg(e, n) {
    if (jo()) return null;
    Yv(e, n, !0);
  }
  function iE() {
    gE(function() {
      (tt & 6) !== 0 ? xt(
        ze,
        rE
      ) : og();
    });
  }
  function Td() {
    if (ir === 0) {
      var e = gi;
      e === 0 && (e = va, va <<= 1, (va & 261888) === 0 && (va = 256)), ir = e;
    }
    return ir;
  }
  function fg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : zl("" + e);
  }
  function hg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function sE(e, n, r, s, c) {
    if (n === "submit" && r && r.stateNode === c) {
      var f = fg(
        (c[ve] || null).action
      ), x = s.submitter;
      x && (n = (n = x[ve] || null) ? fg(n.formAction) : x.getAttribute("formAction"), n !== null && (f = n, x = null));
      var j = new Ul(
        "action",
        "action",
        null,
        s,
        c
      );
      e.push({
        event: j,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ir !== 0) {
                  var L = x ? hg(c, x) : new FormData(c);
                  Gu(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: c.method,
                      action: f
                    },
                    null,
                    L
                  );
                }
              } else
                typeof f == "function" && (j.preventDefault(), L = x ? hg(c, x) : new FormData(c), Gu(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: c.method,
                    action: f
                  },
                  f,
                  L
                ));
            },
            currentTarget: c
          }
        ]
      });
    }
  }
  for (var Cd = 0; Cd < cu.length; Cd++) {
    var Rd = cu[Cd], lE = Rd.toLowerCase(), oE = Rd[0].toUpperCase() + Rd.slice(1);
    ea(
      lE,
      "on" + oE
    );
  }
  ea(Fm, "onAnimationEnd"), ea(Ym, "onAnimationIteration"), ea(Gm, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(jw, "onTransitionRun"), ea(Nw, "onTransitionStart"), ea(Tw, "onTransitionCancel"), ea(Xm, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Kt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Kt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Kt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Kt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Us = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Us)
  );
  function mg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var s = e[r], c = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var x = s.length - 1; 0 <= x; x--) {
            var j = s[x], L = j.instance, X = j.currentTarget;
            if (j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = X;
            try {
              f(c);
            } catch (ae) {
              $l(ae);
            }
            c.currentTarget = null, f = L;
          }
        else
          for (x = 0; x < s.length; x++) {
            if (j = s[x], L = j.instance, X = j.currentTarget, j = j.listener, L !== f && c.isPropagationStopped())
              break e;
            f = j, c.currentTarget = X;
            try {
              f(c);
            } catch (ae) {
              $l(ae);
            }
            c.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ge(e, n) {
    var r = n[be];
    r === void 0 && (r = n[be] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    r.has(s) || (pg(n, e, 2, !1), r.add(s));
  }
  function _d(e, n, r) {
    var s = 0;
    n && (s |= 4), pg(
      r,
      e,
      s,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Md(e) {
    if (!e[Co]) {
      e[Co] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (cE.has(r) || _d(r, !1, e), _d(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, _d("selectionchange", !1, n));
    }
  }
  function pg(e, n, r, s) {
    switch (Fg(n)) {
      case 2:
        var c = UE;
        break;
      case 8:
        c = BE;
        break;
      default:
        c = Yd;
    }
    r = c.bind(
      null,
      n,
      r,
      e
    ), c = void 0, !Qc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (c = !0), s ? c !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: c
    }) : e.addEventListener(n, r, !0) : c !== void 0 ? e.addEventListener(n, r, {
      passive: c
    }) : e.addEventListener(n, r, !1);
  }
  function Ad(e, n, r, s, c) {
    var f = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var x = s.tag;
        if (x === 3 || x === 4) {
          var j = s.stateNode.containerInfo;
          if (j === c) break;
          if (x === 4)
            for (x = s.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === c)
                return;
              x = x.return;
            }
          for (; j !== null; ) {
            if (x = st(j), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              s = f = x;
              continue e;
            }
            j = j.parentNode;
          }
        }
        s = s.return;
      }
    xm(function() {
      var X = f, ae = Pc(r), oe = [];
      e: {
        var K = Pm.get(e);
        if (K !== void 0) {
          var ee = Ul, xe = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              ee = nw;
              break;
            case "focusin":
              xe = "focus", ee = eu;
              break;
            case "focusout":
              xe = "blur", ee = eu;
              break;
            case "beforeblur":
            case "afterblur":
              ee = eu;
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
              ee = Em;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = FS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = iw;
              break;
            case Fm:
            case Ym:
            case Gm:
              ee = XS;
              break;
            case Xm:
              ee = lw;
              break;
            case "scroll":
            case "scrollend":
              ee = qS;
              break;
            case "wheel":
              ee = cw;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = KS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = Nm;
              break;
            case "toggle":
            case "beforetoggle":
              ee = dw;
          }
          var Me = (n & 4) !== 0, ct = !Me && (e === "scroll" || e === "scrollend"), H = Me ? K !== null ? K + "Capture" : null : K;
          Me = [];
          for (var V = X, G; V !== null; ) {
            var se = V;
            if (G = se.stateNode, se = se.tag, se !== 5 && se !== 26 && se !== 27 || G === null || H === null || (se = is(V, H), se != null && Me.push(
              Bs(V, se, G)
            )), ct) break;
            V = V.return;
          }
          0 < Me.length && (K = new ee(
            K,
            xe,
            null,
            r,
            ae
          ), oe.push({ event: K, listeners: Me }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (K = e === "mouseover" || e === "pointerover", ee = e === "mouseout" || e === "pointerout", K && r !== Xc && (xe = r.relatedTarget || r.fromElement) && (st(xe) || xe[Ee]))
            break e;
          if ((ee || K) && (K = ae.window === ae ? ae : (K = ae.ownerDocument) ? K.defaultView || K.parentWindow : window, ee ? (xe = r.relatedTarget || r.toElement, ee = X, xe = xe ? st(xe) : null, xe !== null && (ct = d(xe), Me = xe.tag, xe !== ct || Me !== 5 && Me !== 27 && Me !== 6) && (xe = null)) : (ee = null, xe = X), ee !== xe)) {
            if (Me = Em, se = "onMouseLeave", H = "onMouseEnter", V = "mouse", (e === "pointerout" || e === "pointerover") && (Me = Nm, se = "onPointerLeave", H = "onPointerEnter", V = "pointer"), ct = ee == null ? K : Fe(ee), G = xe == null ? K : Fe(xe), K = new Me(
              se,
              V + "leave",
              ee,
              r,
              ae
            ), K.target = ct, K.relatedTarget = G, se = null, st(ae) === X && (Me = new Me(
              H,
              V + "enter",
              xe,
              r,
              ae
            ), Me.target = G, Me.relatedTarget = ct, se = Me), ct = se, ee && xe)
              t: {
                for (Me = uE, H = ee, V = xe, G = 0, se = H; se; se = Me(se))
                  G++;
                se = 0;
                for (var Ce = V; Ce; Ce = Me(Ce))
                  se++;
                for (; 0 < G - se; )
                  H = Me(H), G--;
                for (; 0 < se - G; )
                  V = Me(V), se--;
                for (; G--; ) {
                  if (H === V || V !== null && H === V.alternate) {
                    Me = H;
                    break t;
                  }
                  H = Me(H), V = Me(V);
                }
                Me = null;
              }
            else Me = null;
            ee !== null && vg(
              oe,
              K,
              ee,
              Me,
              !1
            ), xe !== null && ct !== null && vg(
              oe,
              ct,
              xe,
              Me,
              !0
            );
          }
        }
        e: {
          if (K = X ? Fe(X) : window, ee = K.nodeName && K.nodeName.toLowerCase(), ee === "select" || ee === "input" && K.type === "file")
            var Je = zm;
          else if (Am(K))
            if (Om)
              Je = Sw;
            else {
              Je = bw;
              var je = yw;
            }
          else
            ee = K.nodeName, !ee || ee.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? X && Gc(X.elementType) && (Je = zm) : Je = xw;
          if (Je && (Je = Je(e, X))) {
            Dm(
              oe,
              Je,
              r,
              ae
            );
            break e;
          }
          je && je(e, K, X), e === "focusout" && X && K.type === "number" && X.memoizedProps.value != null && Yc(K, "number", K.value);
        }
        switch (je = X ? Fe(X) : window, e) {
          case "focusin":
            (Am(je) || je.contentEditable === "true") && (ci = je, su = X, hs = null);
            break;
          case "focusout":
            hs = su = ci = null;
            break;
          case "mousedown":
            lu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            lu = !1, qm(oe, r, ae);
            break;
          case "selectionchange":
            if (Ew) break;
          case "keydown":
          case "keyup":
            qm(oe, r, ae);
        }
        var Be;
        if (nu)
          e: {
            switch (e) {
              case "compositionstart":
                var Pe = "onCompositionStart";
                break e;
              case "compositionend":
                Pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Pe = "onCompositionUpdate";
                break e;
            }
            Pe = void 0;
          }
        else
          oi ? _m(e, r) && (Pe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (Tm && r.locale !== "ko" && (oi || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && oi && (Be = Sm()) : (Ia = ae, Zc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), je = Ro(X, Pe), 0 < je.length && (Pe = new jm(
          Pe,
          e,
          null,
          r,
          ae
        ), oe.push({ event: Pe, listeners: je }), Be ? Pe.data = Be : (Be = Mm(r), Be !== null && (Pe.data = Be)))), (Be = hw ? mw(e, r) : pw(e, r)) && (Pe = Ro(X, "onBeforeInput"), 0 < Pe.length && (je = new jm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), oe.push({
          event: je,
          listeners: Pe
        }), je.data = Be)), sE(
          oe,
          e,
          X,
          r,
          ae
        );
      }
      mg(oe, n);
    });
  }
  function Bs(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Ro(e, n) {
    for (var r = n + "Capture", s = []; e !== null; ) {
      var c = e, f = c.stateNode;
      if (c = c.tag, c !== 5 && c !== 26 && c !== 27 || f === null || (c = is(e, r), c != null && s.unshift(
        Bs(e, c, f)
      ), c = is(e, n), c != null && s.push(
        Bs(e, c, f)
      )), e.tag === 3) return s;
      e = e.return;
    }
    return [];
  }
  function uE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function vg(e, n, r, s, c) {
    for (var f = n._reactName, x = []; r !== null && r !== s; ) {
      var j = r, L = j.alternate, X = j.stateNode;
      if (j = j.tag, L !== null && L === s) break;
      j !== 5 && j !== 26 && j !== 27 || X === null || (L = X, c ? (X = is(r, f), X != null && x.unshift(
        Bs(r, X, L)
      )) : c || (X = is(r, f), X != null && x.push(
        Bs(r, X, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var dE = /\r\n?/g, fE = /\u0000|\uFFFD/g;
  function gg(e) {
    return (typeof e == "string" ? e : "" + e).replace(dE, `
`).replace(fE, "");
  }
  function yg(e, n) {
    return n = gg(n), gg(e) === n;
  }
  function ot(e, n, r, s, c, f) {
    switch (r) {
      case "children":
        typeof s == "string" ? n === "body" || n === "textarea" && s === "" || ii(e, s) : (typeof s == "number" || typeof s == "bigint") && n !== "body" && ii(e, "" + s);
        break;
      case "className":
        Ct(e, "class", s);
        break;
      case "tabIndex":
        Ct(e, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ct(e, r, s);
        break;
      case "style":
        ym(e, s, f);
        break;
      case "data":
        if (n !== "object") {
          Ct(e, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (n !== "a" || r !== "href")) {
          e.removeAttribute(r);
          break;
        }
        if (s == null || typeof s == "function" || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = zl("" + s), e.setAttribute(r, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          e.setAttribute(
            r,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof f == "function" && (r === "formAction" ? (n !== "input" && ot(e, n, "name", c.name, c, null), ot(
            e,
            n,
            "formEncType",
            c.formEncType,
            c,
            null
          ), ot(
            e,
            n,
            "formMethod",
            c.formMethod,
            c,
            null
          ), ot(
            e,
            n,
            "formTarget",
            c.formTarget,
            c,
            null
          )) : (ot(e, n, "encType", c.encType, c, null), ot(e, n, "method", c.method, c, null), ot(e, n, "target", c.target, c, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = zl("" + s), e.setAttribute(r, s);
        break;
      case "onClick":
        s != null && (e.onclick = ya);
        break;
      case "onScroll":
        s != null && Ge("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ge("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (c.children != null) throw Error(l(60));
            e.innerHTML = r;
          }
        }
        break;
      case "multiple":
        e.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        e.muted = s && typeof s != "function" && typeof s != "symbol";
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
        if (s == null || typeof s == "function" || typeof s == "boolean" || typeof s == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        r = zl("" + s), e.setAttributeNS(
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
        s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, "" + s) : e.removeAttribute(r);
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
        s && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, "") : e.removeAttribute(r);
        break;
      case "capture":
      case "download":
        s === !0 ? e.setAttribute(r, "") : s !== !1 && s != null && typeof s != "function" && typeof s != "symbol" ? e.setAttribute(r, s) : e.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null && typeof s != "function" && typeof s != "symbol" && !isNaN(s) && 1 <= s ? e.setAttribute(r, s) : e.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s) ? e.removeAttribute(r) : e.setAttribute(r, s);
        break;
      case "popover":
        Ge("beforetoggle", e), Ge("toggle", e), qe(e, "popover", s);
        break;
      case "xlinkActuate":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        ln(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        ln(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        ln(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        ln(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          s
        );
        break;
      case "is":
        qe(e, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = $S.get(r) || r, qe(e, r, s));
    }
  }
  function Dd(e, n, r, s, c, f) {
    switch (r) {
      case "style":
        ym(e, s, f);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (c.children != null) throw Error(l(60));
            e.innerHTML = r;
          }
        }
        break;
      case "children":
        typeof s == "string" ? ii(e, s) : (typeof s == "number" || typeof s == "bigint") && ii(e, "" + s);
        break;
      case "onScroll":
        s != null && Ge("scroll", e);
        break;
      case "onScrollEnd":
        s != null && Ge("scrollend", e);
        break;
      case "onClick":
        s != null && (e.onclick = ya);
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
        if (!Wn.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (c = r.endsWith("Capture"), n = r.slice(2, c ? r.length - 7 : void 0), f = e[ve] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(n, f, c), typeof s == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, s, c);
              break e;
            }
            r in e ? e[r] = s : s === !0 ? e.setAttribute(r, "") : qe(e, r, s);
          }
    }
  }
  function rn(e, n, r) {
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
        Ge("error", e), Ge("load", e);
        var s = !1, c = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var x = r[f];
            if (x != null)
              switch (f) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  c = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  ot(e, n, f, x, r, null);
              }
          }
        c && ot(e, n, "srcSet", r.srcSet, r, null), s && ot(e, n, "src", r.src, r, null);
        return;
      case "input":
        Ge("invalid", e);
        var j = f = x = c = null, L = null, X = null;
        for (s in r)
          if (r.hasOwnProperty(s)) {
            var ae = r[s];
            if (ae != null)
              switch (s) {
                case "name":
                  c = ae;
                  break;
                case "type":
                  x = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  X = ae;
                  break;
                case "value":
                  f = ae;
                  break;
                case "defaultValue":
                  j = ae;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ae != null)
                    throw Error(l(137, n));
                  break;
                default:
                  ot(e, n, s, ae, r, null);
              }
          }
        mm(
          e,
          f,
          j,
          L,
          X,
          x,
          c,
          !1
        );
        return;
      case "select":
        Ge("invalid", e), s = x = f = null;
        for (c in r)
          if (r.hasOwnProperty(c) && (j = r[c], j != null))
            switch (c) {
              case "value":
                f = j;
                break;
              case "defaultValue":
                x = j;
                break;
              case "multiple":
                s = j;
              default:
                ot(e, n, c, j, r, null);
            }
        n = f, r = x, e.multiple = !!s, n != null ? ri(e, !!s, n, !1) : r != null && ri(e, !!s, r, !0);
        return;
      case "textarea":
        Ge("invalid", e), f = c = s = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (j = r[x], j != null))
            switch (x) {
              case "value":
                s = j;
                break;
              case "defaultValue":
                c = j;
                break;
              case "children":
                f = j;
                break;
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(l(91));
                break;
              default:
                ot(e, n, x, j, r, null);
            }
        vm(e, s, c, f);
        return;
      case "option":
        for (L in r)
          if (r.hasOwnProperty(L) && (s = r[L], s != null))
            switch (L) {
              case "selected":
                e.selected = s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                ot(e, n, L, s, r, null);
            }
        return;
      case "dialog":
        Ge("beforetoggle", e), Ge("toggle", e), Ge("cancel", e), Ge("close", e);
        break;
      case "iframe":
      case "object":
        Ge("load", e);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Us.length; s++)
          Ge(Us[s], e);
        break;
      case "image":
        Ge("error", e), Ge("load", e);
        break;
      case "details":
        Ge("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ge("error", e), Ge("load", e);
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
        for (X in r)
          if (r.hasOwnProperty(X) && (s = r[X], s != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                ot(e, n, X, s, r, null);
            }
        return;
      default:
        if (Gc(n)) {
          for (ae in r)
            r.hasOwnProperty(ae) && (s = r[ae], s !== void 0 && Dd(
              e,
              n,
              ae,
              s,
              r,
              void 0
            ));
          return;
        }
    }
    for (j in r)
      r.hasOwnProperty(j) && (s = r[j], s != null && ot(e, n, j, s, r, null));
  }
  function hE(e, n, r, s) {
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
        var c = null, f = null, x = null, j = null, L = null, X = null, ae = null;
        for (ee in r) {
          var oe = r[ee];
          if (r.hasOwnProperty(ee) && oe != null)
            switch (ee) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = oe;
              default:
                s.hasOwnProperty(ee) || ot(e, n, ee, null, s, oe);
            }
        }
        for (var K in s) {
          var ee = s[K];
          if (oe = r[K], s.hasOwnProperty(K) && (ee != null || oe != null))
            switch (K) {
              case "type":
                f = ee;
                break;
              case "name":
                c = ee;
                break;
              case "checked":
                X = ee;
                break;
              case "defaultChecked":
                ae = ee;
                break;
              case "value":
                x = ee;
                break;
              case "defaultValue":
                j = ee;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ee != null)
                  throw Error(l(137, n));
                break;
              default:
                ee !== oe && ot(
                  e,
                  n,
                  K,
                  ee,
                  s,
                  oe
                );
            }
        }
        Fc(
          e,
          x,
          j,
          L,
          X,
          ae,
          f,
          c
        );
        return;
      case "select":
        ee = x = j = K = null;
        for (f in r)
          if (L = r[f], r.hasOwnProperty(f) && L != null)
            switch (f) {
              case "value":
                break;
              case "multiple":
                ee = L;
              default:
                s.hasOwnProperty(f) || ot(
                  e,
                  n,
                  f,
                  null,
                  s,
                  L
                );
            }
        for (c in s)
          if (f = s[c], L = r[c], s.hasOwnProperty(c) && (f != null || L != null))
            switch (c) {
              case "value":
                K = f;
                break;
              case "defaultValue":
                j = f;
                break;
              case "multiple":
                x = f;
              default:
                f !== L && ot(
                  e,
                  n,
                  c,
                  f,
                  s,
                  L
                );
            }
        n = j, r = x, s = ee, K != null ? ri(e, !!r, K, !1) : !!s != !!r && (n != null ? ri(e, !!r, n, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        ee = K = null;
        for (j in r)
          if (c = r[j], r.hasOwnProperty(j) && c != null && !s.hasOwnProperty(j))
            switch (j) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, j, null, s, c);
            }
        for (x in s)
          if (c = s[x], f = r[x], s.hasOwnProperty(x) && (c != null || f != null))
            switch (x) {
              case "value":
                K = c;
                break;
              case "defaultValue":
                ee = c;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(l(91));
                break;
              default:
                c !== f && ot(e, n, x, c, s, f);
            }
        pm(e, K, ee);
        return;
      case "option":
        for (var xe in r)
          if (K = r[xe], r.hasOwnProperty(xe) && K != null && !s.hasOwnProperty(xe))
            switch (xe) {
              case "selected":
                e.selected = !1;
                break;
              default:
                ot(
                  e,
                  n,
                  xe,
                  null,
                  s,
                  K
                );
            }
        for (L in s)
          if (K = s[L], ee = r[L], s.hasOwnProperty(L) && K !== ee && (K != null || ee != null))
            switch (L) {
              case "selected":
                e.selected = K && typeof K != "function" && typeof K != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  L,
                  K,
                  s,
                  ee
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
        for (var Me in r)
          K = r[Me], r.hasOwnProperty(Me) && K != null && !s.hasOwnProperty(Me) && ot(e, n, Me, null, s, K);
        for (X in s)
          if (K = s[X], ee = r[X], s.hasOwnProperty(X) && K !== ee && (K != null || ee != null))
            switch (X) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(l(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  X,
                  K,
                  s,
                  ee
                );
            }
        return;
      default:
        if (Gc(n)) {
          for (var ct in r)
            K = r[ct], r.hasOwnProperty(ct) && K !== void 0 && !s.hasOwnProperty(ct) && Dd(
              e,
              n,
              ct,
              void 0,
              s,
              K
            );
          for (ae in s)
            K = s[ae], ee = r[ae], !s.hasOwnProperty(ae) || K === ee || K === void 0 && ee === void 0 || Dd(
              e,
              n,
              ae,
              K,
              s,
              ee
            );
          return;
        }
    }
    for (var H in r)
      K = r[H], r.hasOwnProperty(H) && K != null && !s.hasOwnProperty(H) && ot(e, n, H, null, s, K);
    for (oe in s)
      K = s[oe], ee = r[oe], !s.hasOwnProperty(oe) || K === ee || K == null && ee == null || ot(e, n, oe, K, s, ee);
  }
  function bg(e) {
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
  function mE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
        var c = r[s], f = c.transferSize, x = c.initiatorType, j = c.duration;
        if (f && j && bg(x)) {
          for (x = 0, j = c.responseEnd, s += 1; s < r.length; s++) {
            var L = r[s], X = L.startTime;
            if (X > j) break;
            var ae = L.transferSize, oe = L.initiatorType;
            ae && bg(oe) && (L = L.responseEnd, x += ae * (L < j ? 1 : (j - X) / (L - X)));
          }
          if (--s, n += 8 * (f + x) / (c.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var zd = null, Od = null;
  function _o(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function xg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Sg(e, n) {
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
  function kd(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Ld = null;
  function pE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ld ? !1 : (Ld = e, !0) : (Ld = null, !1);
  }
  var wg = typeof setTimeout == "function" ? setTimeout : void 0, vE = typeof clearTimeout == "function" ? clearTimeout : void 0, Eg = typeof Promise == "function" ? Promise : void 0, gE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Eg < "u" ? function(e) {
    return Eg.resolve(null).then(e).catch(yE);
  } : wg;
  function yE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sr(e) {
    return e === "head";
  }
  function jg(e, n) {
    var r = n, s = 0;
    do {
      var c = r.nextSibling;
      if (e.removeChild(r), c && c.nodeType === 8)
        if (r = c.data, r === "/$" || r === "/&") {
          if (s === 0) {
            e.removeChild(c), Li(n);
            return;
          }
          s--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          s++;
        else if (r === "html")
          Vs(e.ownerDocument.documentElement);
        else if (r === "head") {
          r = e.ownerDocument.head, Vs(r);
          for (var f = r.firstChild; f; ) {
            var x = f.nextSibling, j = f.nodeName;
            f[He] || j === "SCRIPT" || j === "STYLE" || j === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = x;
          }
        } else
          r === "body" && Vs(e.ownerDocument.body);
      r = c;
    } while (r);
    Li(n);
  }
  function Ng(e, n) {
    var r = e;
    e = 0;
    do {
      var s = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), s && s.nodeType === 8)
        if (r = s.data, r === "/$") {
          if (e === 0) break;
          e--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || e++;
      r = s;
    } while (r);
  }
  function Ud(e) {
    var n = e.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ud(r), dt(r);
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
  function bE(e, n, r, s) {
    for (; e.nodeType === 1; ) {
      var c = r;
      if (e.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!s && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (s) {
        if (!e[He])
          switch (n) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (f !== c.rel || e.getAttribute("href") !== (c.href == null || c.href === "" ? null : c.href) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin) || e.getAttribute("title") !== (c.title == null ? null : c.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (f = e.getAttribute("src"), (f !== (c.src == null ? null : c.src) || e.getAttribute("type") !== (c.type == null ? null : c.type) || e.getAttribute("crossorigin") !== (c.crossOrigin == null ? null : c.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (n === "input" && e.type === "hidden") {
        var f = c.name == null ? null : "" + c.name;
        if (c.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function xE(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Tg(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Bd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Vd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function SE(e, n) {
    var r = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = n;
    else if (e.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var s = function() {
        n(), r.removeEventListener("DOMContentLoaded", s);
      };
      r.addEventListener("DOMContentLoaded", s), e._reactRetry = s;
    }
  }
  function In(e) {
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
  var $d = null;
  function Cg(e) {
    e = e.nextSibling;
    for (var n = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return In(e.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Rg(e) {
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
  function _g(e, n, r) {
    switch (n = _o(r), e) {
      case "html":
        if (e = n.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = n.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = n.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function Vs(e) {
    for (var n = e.attributes; n.length; )
      e.removeAttributeNode(n[0]);
    dt(e);
  }
  var Fn = /* @__PURE__ */ new Map(), Mg = /* @__PURE__ */ new Set();
  function Mo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = C.d;
  C.d = {
    f: wE,
    r: EE,
    D: jE,
    C: NE,
    L: TE,
    m: CE,
    X: _E,
    S: RE,
    M: ME
  };
  function wE() {
    var e = Oa.f(), n = So();
    return e || n;
  }
  function EE(e) {
    var n = St(e);
    n !== null && n.tag === 5 && n.type === "form" ? Xp(n) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function Ag(e, n, r) {
    var s = zi;
    if (s && typeof n == "string" && n) {
      var c = Ln(n);
      c = 'link[rel="' + e + '"][href="' + c + '"]', typeof r == "string" && (c += '[crossorigin="' + r + '"]'), Mg.has(c) || (Mg.add(c), e = { rel: e, crossOrigin: r, href: n }, s.querySelector(c) === null && (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function jE(e) {
    Oa.D(e), Ag("dns-prefetch", e, null);
  }
  function NE(e, n) {
    Oa.C(e, n), Ag("preconnect", e, n);
  }
  function TE(e, n, r) {
    Oa.L(e, n, r);
    var s = zi;
    if (s && e && n) {
      var c = 'link[rel="preload"][as="' + Ln(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (c += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (c += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : c += '[href="' + Ln(e) + '"]';
      var f = c;
      switch (n) {
        case "style":
          f = Oi(e);
          break;
        case "script":
          f = ki(e);
      }
      Fn.has(f) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Fn.set(f, e), s.querySelector(c) !== null || n === "style" && s.querySelector($s(f)) || n === "script" && s.querySelector(Hs(f)) || (n = s.createElement("link"), rn(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function CE(e, n) {
    Oa.m(e, n);
    var r = zi;
    if (r && e) {
      var s = n && typeof n.as == "string" ? n.as : "script", c = 'link[rel="modulepreload"][as="' + Ln(s) + '"][href="' + Ln(e) + '"]', f = c;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = ki(e);
      }
      if (!Fn.has(f) && (e = v({ rel: "modulepreload", href: e }, n), Fn.set(f, e), r.querySelector(c) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Hs(f)))
              return;
        }
        s = r.createElement("link"), rn(s, "link", e), mt(s), r.head.appendChild(s);
      }
    }
  }
  function RE(e, n, r) {
    Oa.S(e, n, r);
    var s = zi;
    if (s && e) {
      var c = zt(s).hoistableStyles, f = Oi(e);
      n = n || "default";
      var x = c.get(f);
      if (!x) {
        var j = { loading: 0, preload: null };
        if (x = s.querySelector(
          $s(f)
        ))
          j.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Fn.get(f)) && Hd(e, r);
          var L = x = s.createElement("link");
          mt(L), rn(L, "link", e), L._p = new Promise(function(X, ae) {
            L.onload = X, L.onerror = ae;
          }), L.addEventListener("load", function() {
            j.loading |= 1;
          }), L.addEventListener("error", function() {
            j.loading |= 2;
          }), j.loading |= 4, Ao(x, n, s);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: j
        }, c.set(f, x);
      }
    }
  }
  function _E(e, n) {
    Oa.X(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, c = ki(e), f = s.get(c);
      f || (f = r.querySelector(Hs(c)), f || (e = v({ src: e, async: !0 }, n), (n = Fn.get(c)) && qd(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(c, f));
    }
  }
  function ME(e, n) {
    Oa.M(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, c = ki(e), f = s.get(c);
      f || (f = r.querySelector(Hs(c)), f || (e = v({ src: e, async: !0, type: "module" }, n), (n = Fn.get(c)) && qd(e, n), f = r.createElement("script"), mt(f), rn(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(c, f));
    }
  }
  function Dg(e, n, r, s) {
    var c = (c = ge.current) ? Mo(c) : null;
    if (!c) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = Oi(r.href), r = zt(
          c
        ).hoistableStyles, s = r.get(n), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = Oi(r.href);
          var f = zt(
            c
          ).hoistableStyles, x = f.get(e);
          if (x || (c = c.ownerDocument || c, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, x), (f = c.querySelector(
            $s(e)
          )) && !f._p && (x.instance = f, x.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || AE(
            c,
            e,
            r,
            x.state
          ))), n && s === null)
            throw Error(l(528, ""));
          return x;
        }
        if (n && s !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = ki(r), r = zt(
          c
        ).hoistableScripts, s = r.get(n), s || (s = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function Oi(e) {
    return 'href="' + Ln(e) + '"';
  }
  function $s(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function zg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function AE(e, n, r, s) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? s.loading = 1 : (n = e.createElement("link"), s.preload = n, n.addEventListener("load", function() {
      return s.loading |= 1;
    }), n.addEventListener("error", function() {
      return s.loading |= 2;
    }), rn(n, "link", r), mt(n), e.head.appendChild(n));
  }
  function ki(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function Hs(e) {
    return "script[async]" + e;
  }
  function Og(e, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var s = e.querySelector(
            'style[data-href~="' + Ln(r.href) + '"]'
          );
          if (s)
            return n.instance = s, mt(s), s;
          var c = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return s = (e.ownerDocument || e).createElement(
            "style"
          ), mt(s), rn(s, "style", c), Ao(s, r.precedence, e), n.instance = s;
        case "stylesheet":
          c = Oi(r.href);
          var f = e.querySelector(
            $s(c)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          s = zg(r), (c = Fn.get(c)) && Hd(s, c), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var x = f;
          return x._p = new Promise(function(j, L) {
            x.onload = j, x.onerror = L;
          }), rn(f, "link", s), n.state.loading |= 4, Ao(f, r.precedence, e), n.instance = f;
        case "script":
          return f = ki(r.src), (c = e.querySelector(
            Hs(f)
          )) ? (n.instance = c, mt(c), c) : (s = r, (c = Fn.get(f)) && (s = v({}, r), qd(s, c)), e = e.ownerDocument || e, c = e.createElement("script"), mt(c), rn(c, "link", s), e.head.appendChild(c), n.instance = c);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (s = n.instance, n.state.loading |= 4, Ao(s, r.precedence, e));
    return n.instance;
  }
  function Ao(e, n, r) {
    for (var s = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), c = s.length ? s[s.length - 1] : null, f = c, x = 0; x < s.length; x++) {
      var j = s[x];
      if (j.dataset.precedence === n) f = j;
      else if (f !== c) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Hd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function qd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Do = null;
  function kg(e, n, r) {
    if (Do === null) {
      var s = /* @__PURE__ */ new Map(), c = Do = /* @__PURE__ */ new Map();
      c.set(r, s);
    } else
      c = Do, s = c.get(r), s || (s = /* @__PURE__ */ new Map(), c.set(r, s));
    if (s.has(e)) return s;
    for (s.set(e, null), r = r.getElementsByTagName(e), c = 0; c < r.length; c++) {
      var f = r[c];
      if (!(f[He] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = f.getAttribute(n) || "";
        x = e + x;
        var j = s.get(x);
        j ? j.push(f) : s.set(x, [f]);
      }
    }
    return s;
  }
  function Lg(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function DE(e, n, r) {
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
  function Ug(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function zE(e, n, r, s) {
    if (r.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var c = Oi(s.href), f = n.querySelector(
          $s(c)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = zo.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = n.ownerDocument || n, s = zg(s), (c = Fn.get(c)) && Hd(s, c), f = f.createElement("link"), mt(f);
        var x = f;
        x._p = new Promise(function(j, L) {
          x.onload = j, x.onerror = L;
        }), rn(f, "link", s), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = zo.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Id = 0;
  function OE(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var s = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Id === 0 && (Id = 62500 * mE());
      var c = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Id ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(s), clearTimeout(c);
      };
    } : null;
  }
  function zo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ko(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Oo = null;
  function ko(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(kE, e), Oo = null, zo.call(e));
  }
  function kE(e, n) {
    if (!(n.state.loading & 4)) {
      var r = Oo.get(e);
      if (r) var s = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Oo.set(e, r);
        for (var c = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < c.length; f++) {
          var x = c[f];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), s = x);
        }
        s && r.set(null, s);
      }
      c = n.instance, x = c.getAttribute("data-precedence"), f = r.get(x) || s, f === s && r.set(null, c), r.set(x, c), this.count++, s = zo.bind(this), c.addEventListener("load", s), c.addEventListener("error", s), f ? f.parentNode.insertBefore(c, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(c, e.firstChild)), n.state.loading |= 4;
    }
  }
  var qs = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function LE(e, n, r, s, c, f, x, j, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = s, this.onUncaughtError = c, this.onCaughtError = f, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bg(e, n, r, s, c, f, x, j, L, X, ae, oe) {
    return e = new LE(
      e,
      n,
      r,
      x,
      L,
      X,
      ae,
      oe,
      j
    ), n = 1, f === !0 && (n |= 24), f = jn(3, null, null, n), e.current = f, f.stateNode = e, n = wu(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: s,
      isDehydrated: r,
      cache: n
    }, Tu(f), e;
  }
  function Vg(e) {
    return e ? (e = fi, e) : fi;
  }
  function $g(e, n, r, s, c, f) {
    c = Vg(c), s.context === null ? s.context = c : s.pendingContext = c, s = Ka(n), s.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (s.callback = f), r = Qa(e, s, n), r !== null && (bn(r, e, n), xs(r, e, n));
  }
  function Hg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Fd(e, n) {
    Hg(e, n), (e = e.alternate) && Hg(e, n);
  }
  function qg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mr(e, 67108864);
      n !== null && bn(n, e, 67108864), Fd(e, 67108864);
    }
  }
  function Ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = _n();
      n = $(n);
      var r = Mr(e, n);
      r !== null && bn(r, e, n), Fd(e, n);
    }
  }
  var Lo = !0;
  function UE(e, n, r, s) {
    var c = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 2, Yd(e, n, r, s);
    } finally {
      C.p = f, O.T = c;
    }
  }
  function BE(e, n, r, s) {
    var c = O.T;
    O.T = null;
    var f = C.p;
    try {
      C.p = 8, Yd(e, n, r, s);
    } finally {
      C.p = f, O.T = c;
    }
  }
  function Yd(e, n, r, s) {
    if (Lo) {
      var c = Gd(s);
      if (c === null)
        Ad(
          e,
          n,
          s,
          Uo,
          r
        ), Yg(e, s);
      else if ($E(
        c,
        e,
        n,
        r,
        s
      ))
        s.stopPropagation();
      else if (Yg(e, s), n & 4 && -1 < VE.indexOf(e)) {
        for (; c !== null; ) {
          var f = St(c);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var x = hn(f.pendingLanes);
                  if (x !== 0) {
                    var j = f;
                    for (j.pendingLanes |= 2, j.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Yt(x);
                      j.entanglements[1] |= L, x &= ~L;
                    }
                    ha(f), (tt & 6) === 0 && (bo = qt() + 500, Ls(0));
                  }
                }
                break;
              case 31:
              case 13:
                j = Mr(f, 2), j !== null && bn(j, f, 2), So(), Fd(f, 2);
            }
          if (f = Gd(s), f === null && Ad(
            e,
            n,
            s,
            Uo,
            r
          ), f === c) break;
          c = f;
        }
        c !== null && s.stopPropagation();
      } else
        Ad(
          e,
          n,
          s,
          null,
          r
        );
    }
  }
  function Gd(e) {
    return e = Pc(e), Xd(e);
  }
  var Uo = null;
  function Xd(e) {
    if (Uo = null, e = st(e), e !== null) {
      var n = d(e);
      if (n === null) e = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (e = h(n), e !== null) return e;
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
    return Uo = e, null;
  }
  function Fg(e) {
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
        switch (ye()) {
          case ze:
            return 2;
          case Qe:
            return 8;
          case nt:
          case It:
            return 32;
          case Ft:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Pd = !1, lr = null, or = null, cr = null, Is = /* @__PURE__ */ new Map(), Fs = /* @__PURE__ */ new Map(), ur = [], VE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Yg(e, n) {
    switch (e) {
      case "focusin":
      case "focusout":
        lr = null;
        break;
      case "dragenter":
      case "dragleave":
        or = null;
        break;
      case "mouseover":
      case "mouseout":
        cr = null;
        break;
      case "pointerover":
      case "pointerout":
        Is.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fs.delete(n.pointerId);
    }
  }
  function Ys(e, n, r, s, c, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: s,
      nativeEvent: f,
      targetContainers: [c]
    }, n !== null && (n = St(n), n !== null && qg(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, c !== null && n.indexOf(c) === -1 && n.push(c), e);
  }
  function $E(e, n, r, s, c) {
    switch (n) {
      case "focusin":
        return lr = Ys(
          lr,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "dragenter":
        return or = Ys(
          or,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "mouseover":
        return cr = Ys(
          cr,
          e,
          n,
          r,
          s,
          c
        ), !0;
      case "pointerover":
        var f = c.pointerId;
        return Is.set(
          f,
          Ys(
            Is.get(f) || null,
            e,
            n,
            r,
            s,
            c
          )
        ), !0;
      case "gotpointercapture":
        return f = c.pointerId, Fs.set(
          f,
          Ys(
            Fs.get(f) || null,
            e,
            n,
            r,
            s,
            c
          )
        ), !0;
    }
    return !1;
  }
  function Gg(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = d(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = h(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Ig(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Ig(r);
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
  function Bo(e) {
    if (e.blockedOn !== null) return !1;
    for (var n = e.targetContainers; 0 < n.length; ) {
      var r = Gd(e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var s = new r.constructor(
          r.type,
          r
        );
        Xc = s, r.target.dispatchEvent(s), Xc = null;
      } else
        return n = St(r), n !== null && qg(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Xg(e, n, r) {
    Bo(e) && r.delete(n);
  }
  function HE() {
    Pd = !1, lr !== null && Bo(lr) && (lr = null), or !== null && Bo(or) && (or = null), cr !== null && Bo(cr) && (cr = null), Is.forEach(Xg), Fs.forEach(Xg);
  }
  function Vo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Pd || (Pd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      HE
    )));
  }
  var $o = null;
  function Pg(e) {
    $o !== e && ($o = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        $o === e && ($o = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], s = e[n + 1], c = e[n + 2];
          if (typeof s != "function") {
            if (Xd(s || r) === null)
              continue;
            break;
          }
          var f = St(r);
          f !== null && (e.splice(n, 3), n -= 3, Gu(
            f,
            {
              pending: !0,
              data: c,
              method: r.method,
              action: s
            },
            s,
            c
          ));
        }
      }
    ));
  }
  function Li(e) {
    function n(L) {
      return Vo(L, e);
    }
    lr !== null && Vo(lr, e), or !== null && Vo(or, e), cr !== null && Vo(cr, e), Is.forEach(n), Fs.forEach(n);
    for (var r = 0; r < ur.length; r++) {
      var s = ur[r];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Gg(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (s = 0; s < r.length; s += 3) {
        var c = r[s], f = r[s + 1], x = c[ve] || null;
        if (typeof f == "function")
          x || Pg(r);
        else if (x) {
          var j = null;
          if (f && f.hasAttribute("formAction")) {
            if (c = f, x = f[ve] || null)
              j = x.formAction;
            else if (Xd(c) !== null) continue;
          } else j = x.action;
          typeof j == "function" ? r[s + 1] = j : (r.splice(s, 3), s -= 3), Pg(r);
        }
      }
  }
  function Kg() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(x) {
            return c = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      c !== null && (c(), c = null), s || setTimeout(r, 20);
    }
    function r() {
      if (!s && !navigation.transition) {
        var f = navigation.currentEntry;
        f && f.url != null && navigation.navigate(f.url, {
          state: f.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var s = !1, c = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        s = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), c !== null && (c(), c = null);
      };
    }
  }
  function Kd(e) {
    this._internalRoot = e;
  }
  Ho.prototype.render = Kd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, s = _n();
    $g(r, s, e, n, null, null);
  }, Ho.prototype.unmount = Kd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      $g(e.current, 2, null, e, null, null), So(), n[Ee] = null;
    }
  };
  function Ho(e) {
    this._internalRoot = e;
  }
  Ho.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ue();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < ur.length && n !== 0 && n < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Gg(e);
    }
  };
  var Qg = a.version;
  if (Qg !== "19.2.5")
    throw Error(
      l(
        527,
        Qg,
        "19.2.5"
      )
    );
  C.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var qE = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        Zn = qo.inject(
          qE
        ), Wt = qo;
      } catch {
      }
  }
  return Xs.createRoot = function(e, n) {
    if (!o(e)) throw Error(l(299));
    var r = !1, s = "", c = av, f = rv, x = iv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = Bg(
      e,
      1,
      !1,
      null,
      null,
      r,
      s,
      null,
      c,
      f,
      x,
      Kg
    ), e[Ee] = n.current, Md(e), new Kd(n);
  }, Xs.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(l(299));
    var s = !1, c = "", f = av, x = rv, j = iv, L = null;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (j = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = Bg(
      e,
      1,
      !0,
      n,
      r ?? null,
      s,
      c,
      L,
      f,
      x,
      j,
      Kg
    ), n.context = Vg(null), r = n.current, s = _n(), s = $(s), c = Ka(s), c.callback = null, Qa(r, c, s), r = s, n.current.lanes = r, it(n, r), ha(n), e[Ee] = n.current, Md(e), new Ho(n);
  }, Xs.version = "19.2.5", Xs;
}
var sy;
function WE() {
  if (sy) return Jd.exports;
  sy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Jd.exports = JE(), Jd.exports;
}
var ej = WE();
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
var sx = (t) => {
  throw TypeError(t);
}, tj = (t, a, i) => a.has(t) || sx("Cannot " + i), nf = (t, a, i) => (tj(t, a, "read from private field"), i ? i.call(t) : a.get(t)), nj = (t, a, i) => a.has(t) ? sx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function ly(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function aj(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = t, o;
  o = a.map(
    (E, w) => b(
      E,
      typeof E == "string" ? null : E.state,
      w === 0 ? "default" : void 0,
      typeof E == "string" ? void 0 : E.unstable_mask
    )
  );
  let d = g(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function g(E) {
    return Math.min(Math.max(E, 0), o.length - 1);
  }
  function p() {
    return o[d];
  }
  function b(E, w = null, N, R) {
    let T = Yf(
      o ? p().pathname : "/",
      E,
      w,
      N,
      R
    );
    return Mt(
      T.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        E
      )}`
    ), T;
  }
  function v(E) {
    return typeof E == "string" ? E : pa(E);
  }
  return {
    get index() {
      return d;
    },
    get action() {
      return h;
    },
    get location() {
      return p();
    },
    createHref: v,
    createURL(E) {
      return new URL(v(E), "http://localhost");
    },
    encodeLocation(E) {
      let w = typeof E == "string" ? ia(E) : E;
      return {
        pathname: w.pathname || "",
        search: w.search || "",
        hash: w.hash || ""
      };
    },
    push(E, w) {
      h = "PUSH";
      let N = ly(E) ? E : b(E, w);
      d += 1, o.splice(d, o.length, N), l && m && m({ action: h, location: N, delta: 1 });
    },
    replace(E, w) {
      h = "REPLACE";
      let N = ly(E) ? E : b(E, w);
      o[d] = N, l && m && m({ action: h, location: N, delta: 0 });
    },
    go(E) {
      h = "POP";
      let w = g(d + E), N = o[w];
      d = w, m && m({ action: h, location: N, delta: E });
    },
    listen(E) {
      return m = E, () => {
        m = null;
      };
    }
  };
}
function Ie(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Mt(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function rj() {
  return Math.random().toString(36).substring(2, 10);
}
function Yf(t, a, i = null, l, o) {
  return {
    pathname: typeof t == "string" ? t : t.pathname,
    search: "",
    hash: "",
    ...typeof a == "string" ? ia(a) : a,
    state: i,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: a && a.key || l || rj(),
    unstable_mask: o
  };
}
function pa({
  pathname: t = "/",
  search: a = "",
  hash: i = ""
}) {
  return a && a !== "?" && (t += a.charAt(0) === "?" ? a : "?" + a), i && i !== "#" && (t += i.charAt(0) === "#" ? i : "#" + i), t;
}
function ia(t) {
  let a = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && (a.hash = t.substring(i), t = t.substring(0, i));
    let l = t.indexOf("?");
    l >= 0 && (a.search = t.substring(l), t = t.substring(0, l)), t && (a.pathname = t);
  }
  return a;
}
function ij(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ie(i, "No window.location.(origin|href) available to create URL");
  let l = typeof t == "string" ? t : pa(t);
  return l = l.replace(/ $/, "%20"), !a && l.startsWith("//") && (l = i + l), new URL(l, i);
}
var il, oy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (nj(this, il, /* @__PURE__ */ new Map()), t)
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
    if (nf(this, il).has(t))
      return nf(this, il).get(t);
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
    nf(this, il).set(t, a);
  }
};
il = /* @__PURE__ */ new WeakMap();
var sj = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function lj(t) {
  return sj.has(
    t
  );
}
var oj = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function cj(t) {
  return oj.has(
    t
  );
}
function uj(t) {
  return t.index === !0;
}
function fl(t, a, i = [], l = {}, o = !1) {
  return t.map((d, h) => {
    let m = [...i, String(h)], g = typeof d.id == "string" ? d.id : m.join("-");
    if (Ie(
      d.index !== !0 || !d.children,
      "Cannot specify children on an index route"
    ), Ie(
      o || !l[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), uj(d)) {
      let p = {
        ...d,
        id: g
      };
      return l[g] = cy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...d,
        id: g,
        children: void 0
      };
      return l[g] = cy(
        p,
        a(p)
      ), d.children && (p.children = fl(
        d.children,
        a,
        m,
        l,
        o
      )), p;
    }
  });
}
function cy(t, a) {
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
function vr(t, a, i = "/") {
  return sl(t, a, i, !1);
}
function sl(t, a, i, l) {
  let o = typeof a == "string" ? ia(a) : a, d = Kn(o.pathname || "/", i);
  if (d == null)
    return null;
  let h = lx(t);
  fj(h);
  let m = null;
  for (let g = 0; m == null && g < h.length; ++g) {
    let p = Ej(d);
    m = Sj(
      h[g],
      p,
      l
    );
  }
  return m;
}
function dj(t, a) {
  let { route: i, pathname: l, params: o } = t;
  return {
    id: i.id,
    pathname: l,
    params: o,
    data: a[i.id],
    loaderData: a[i.id],
    handle: i.handle
  };
}
function lx(t, a = [], i = [], l = "", o = !1) {
  let d = (h, m, g = o, p) => {
    let b = {
      relativePath: p === void 0 ? h.path || "" : p,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: m,
      route: h
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(l) && g)
        return;
      Ie(
        b.relativePath.startsWith(l),
        `Absolute route path "${b.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), b.relativePath = b.relativePath.slice(l.length);
    }
    let v = Gn([l, b.relativePath]), S = i.concat(b);
    h.children && h.children.length > 0 && (Ie(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      h.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
    ), lx(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: bj(v, h.index),
      routesMeta: S
    });
  };
  return t.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      d(h, m);
    else
      for (let g of ox(h.path))
        d(h, m, !0, g);
  }), a;
}
function ox(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, o = i.endsWith("?"), d = i.replace(/\?$/, "");
  if (l.length === 0)
    return o ? [d, ""] : [d];
  let h = ox(l.join("/")), m = [];
  return m.push(
    ...h.map(
      (g) => g === "" ? d : [d, g].join("/")
    )
  ), o && m.push(...h), m.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function fj(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : xj(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var hj = /^:[\w-]+$/, mj = 3, pj = 2, vj = 1, gj = 10, yj = -2, uy = (t) => t === "*";
function bj(t, a) {
  let i = t.split("/"), l = i.length;
  return i.some(uy) && (l += yj), a && (l += pj), i.filter((o) => !uy(o)).reduce(
    (o, d) => o + (hj.test(d) ? mj : d === "" ? vj : gj),
    l
  );
}
function xj(t, a) {
  return t.length === a.length && t.slice(0, -1).every((l, o) => l === a[o]) ? (
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
function Sj(t, a, i = !1) {
  let { routesMeta: l } = t, o = {}, d = "/", h = [];
  for (let m = 0; m < l.length; ++m) {
    let g = l[m], p = m === l.length - 1, b = d === "/" ? a : a.slice(d.length) || "/", v = gc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), S = g.route;
    if (!v && p && i && !l[l.length - 1].route.index && (v = gc(
      {
        path: g.relativePath,
        caseSensitive: g.caseSensitive,
        end: !1
      },
      b
    )), !v)
      return null;
    Object.assign(o, v.params), h.push({
      // TODO: Can this as be avoided?
      params: o,
      pathname: Gn([d, v.pathname]),
      pathnameBase: Tj(
        Gn([d, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (d = Gn([d, v.pathnameBase]));
  }
  return h;
}
function gc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, l] = wj(
    t.path,
    t.caseSensitive,
    t.end
  ), o = a.match(i);
  if (!o) return null;
  let d = o[0], h = d.replace(/(.)\/+$/, "$1"), m = o.slice(1);
  return {
    params: l.reduce(
      (p, { paramName: b, isOptional: v }, S) => {
        if (b === "*") {
          let w = m[S] || "";
          h = d.slice(0, d.length - w.length).replace(/(.)\/+$/, "$1");
        }
        const E = m[S];
        return v && !E ? p[b] = void 0 : p[b] = (E || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: d,
    pathnameBase: h,
    pattern: t
  };
}
function wj(t, a = !1, i = !0) {
  Mt(
    t === "*" || !t.endsWith("*") || t.endsWith("/*"),
    `Route path "${t}" will be treated as if it were "${t.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/, "/*")}".`
  );
  let l = [], o = "^" + t.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (h, m, g, p, b) => {
      if (l.push({ paramName: m, isOptional: g != null }), g) {
        let v = b.charAt(p + h.length);
        return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return t.endsWith("*") ? (l.push({ paramName: "*" }), o += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : i ? o += "\\/*$" : t !== "" && t !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, a ? void 0 : "i"), l];
}
function Ej(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return Mt(
      !1,
      `The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`
    ), t;
  }
}
function Kn(t, a) {
  if (a === "/") return t;
  if (!t.toLowerCase().startsWith(a.toLowerCase()))
    return null;
  let i = a.endsWith("/") ? a.length - 1 : a.length, l = t.charAt(i);
  return l && l !== "/" ? null : t.slice(i) || "/";
}
function jj({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Gn([t, a]);
}
var cx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Eh = (t) => cx.test(t);
function Nj(t, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: o = ""
  } = typeof t == "string" ? ia(t) : t, d;
  return i ? (i = Nh(i), i.startsWith("/") ? d = dy(i.substring(1), "/") : d = dy(i, a)) : d = a, {
    pathname: d,
    search: Cj(l),
    hash: Rj(o)
  };
}
function dy(t, a) {
  let i = yc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function af(t, a, i, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function ux(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function jh(t) {
  let a = ux(t);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function Ac(t, a, i, l = !1) {
  let o;
  typeof t == "string" ? o = ia(t) : (o = { ...t }, Ie(
    !o.pathname || !o.pathname.includes("?"),
    af("?", "pathname", "search", o)
  ), Ie(
    !o.pathname || !o.pathname.includes("#"),
    af("#", "pathname", "hash", o)
  ), Ie(
    !o.search || !o.search.includes("#"),
    af("#", "search", "hash", o)
  ));
  let d = t === "" || o.pathname === "", h = d ? "/" : o.pathname, m;
  if (h == null)
    m = i;
  else {
    let v = a.length - 1;
    if (!l && h.startsWith("..")) {
      let S = h.split("/");
      for (; S[0] === ".."; )
        S.shift(), v -= 1;
      o.pathname = S.join("/");
    }
    m = v >= 0 ? a[v] : "/";
  }
  let g = Nj(o, m), p = h && h !== "/" && h.endsWith("/"), b = (d || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var Nh = (t) => t.replace(/\/\/+/g, "/"), Gn = (t) => Nh(t.join("/")), yc = (t) => t.replace(/\/+$/, ""), Tj = (t) => yc(t).replace(/^\/*/, "/"), Cj = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Rj = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, _j = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", t), new Response(null, { ...i, headers: l });
}, Dc = class {
  constructor(t, a, i, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function hl(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var dx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function fx(t, a) {
  let i = t;
  if (typeof i != "string" || !cx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, o = !1;
  if (dx)
    try {
      let d = new URL(window.location.href), h = i.startsWith("//") ? new URL(d.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === d.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      Mt(
        !1,
        `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: l,
    isExternal: o,
    to: i
  };
}
var yr = Symbol("Uninstrumented");
function Mj(t, a) {
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
      instrument(d) {
        let h = Object.keys(i);
        for (let m of h)
          d[m] && i[m].push(d[m]);
      }
    })
  );
  let l = {};
  if (typeof a.lazy == "function" && i.lazy.length > 0) {
    let o = Ii(i.lazy, a.lazy, () => {
    });
    o && (l.lazy = o);
  }
  if (typeof a.lazy == "object") {
    let o = a.lazy;
    ["middleware", "loader", "action"].forEach((d) => {
      let h = o[d], m = i[`lazy.${d}`];
      if (typeof h == "function" && m.length > 0) {
        let g = Ii(m, h, () => {
        });
        g && (l.lazy = Object.assign(l.lazy || {}, {
          [d]: g
        }));
      }
    });
  }
  return ["loader", "action"].forEach((o) => {
    let d = a[o];
    if (typeof d == "function" && i[o].length > 0) {
      let h = d[yr] ?? d, m = Ii(
        i[o],
        h,
        (...g) => fy(g[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, l[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((o) => {
    let d = o[yr] ?? o, h = Ii(
      i.middleware,
      d,
      (...m) => fy(m[0])
    );
    return h ? (h[yr] = d, h) : o;
  })), l;
}
function Aj(t, a) {
  let i = {
    navigate: [],
    fetch: []
  };
  if (a.forEach(
    (l) => l({
      instrument(o) {
        let d = Object.keys(o);
        for (let h of d)
          o[h] && i[h].push(o[h]);
      }
    })
  ), i.navigate.length > 0) {
    let l = t.navigate[yr] ?? t.navigate, o = Ii(
      i.navigate,
      l,
      (...d) => {
        let [h, m] = d;
        return {
          to: typeof h == "number" || typeof h == "string" ? h : h ? pa(h) : ".",
          ...hy(t, m ?? {})
        };
      }
    );
    o && (o[yr] = l, t.navigate = o);
  }
  if (i.fetch.length > 0) {
    let l = t.fetch[yr] ?? t.fetch, o = Ii(i.fetch, l, (...d) => {
      let [h, , m, g] = d;
      return {
        href: m ?? ".",
        fetcherKey: h,
        ...hy(t, g ?? {})
      };
    });
    o && (o[yr] = l, t.fetch = o);
  }
  return t;
}
function Ii(t, a, i) {
  return t.length === 0 ? null : async (...l) => {
    let o = await hx(
      t,
      i(...l),
      () => a(...l),
      t.length - 1
    );
    if (o.type === "error")
      throw o.value;
    return o.value;
  };
}
async function hx(t, a, i, l) {
  let o = t[l], d;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = hx(t, a, i, l - 1), d = await h, Ie(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? { status: "error", error: d.value } : { status: "success", error: void 0 });
    try {
      await o(m, a);
    } catch (g) {
      console.error("An instrumentation function threw an error:", g);
    }
    h || await m(), await h;
  } else
    try {
      d = { type: "success", value: await i() };
    } catch (h) {
      d = { type: "error", value: h };
    }
  return d || {
    type: "error",
    value: new Error("No result assigned in instrumentation chain.")
  };
}
function fy(t) {
  let { request: a, context: i, params: l, unstable_pattern: o } = t;
  return {
    request: Dj(a),
    params: { ...l },
    unstable_pattern: o,
    context: zj(i)
  };
}
function hy(t, a) {
  return {
    currentUrl: pa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function Dj(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function zj(t) {
  if (kj(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var Oj = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function kj(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === Oj;
}
var mx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], Lj = new Set(
  mx
), Uj = [
  "GET",
  ...mx
], Bj = new Set(Uj), px = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Vj = /* @__PURE__ */ new Set([307, 308]), rf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, $j = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ps = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, Hj = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), vx = "remix-router-transitions", gx = Symbol("ResetLoaderData");
function qj(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], o = t.mapRouteProperties || Hj, d = o;
  if (t.unstable_instrumentations) {
    let D = t.unstable_instrumentations;
    d = ($) => ({
      ...o($),
      ...Mj(
        D.map((Y) => Y.route).filter(Boolean),
        $
      )
    });
  }
  let h = {}, m = fl(
    t.routes,
    d,
    void 0,
    h
  ), g, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || Xj, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, E = /* @__PURE__ */ new Set(), w = null, N = null, R = null, T = t.hydrationData != null, k = vr(m, t.history.location, p), z = !1, M = null, I, J;
  if (k == null && !t.patchRoutesOnNavigation) {
    let D = Yn(404, {
      pathname: t.history.location.pathname
    }), { matches: $, route: Y } = Io(m);
    I = !0, J = !I, k = $, M = { [Y.id]: D };
  } else if (k && !t.hydrationData && wn(
    k,
    m,
    t.history.location.pathname
  ).active && (k = null), k)
    if (k.some((D) => D.route.lazy))
      I = !1, J = !I;
    else if (!k.some((D) => Th(D.route)))
      I = !0, J = !I;
    else {
      let D = t.hydrationData ? t.hydrationData.loaderData : null, $ = t.hydrationData ? t.hydrationData.errors : null, Y = k;
      if ($) {
        let ue = k.findIndex(
          (de) => $[de.route.id] !== void 0
        );
        Y = Y.slice(0, ue + 1);
      }
      J = !1, I = !0, Y.forEach((ue) => {
        let de = yx(ue.route, D, $);
        J = J || de.renderFallback, I = I && !de.shouldLoad;
      });
    }
  else {
    I = !1, J = !I, k = [];
    let D = wn(
      null,
      m,
      t.history.location.pathname
    );
    D.active && D.matches && (z = !0, k = D.matches);
  }
  let ne, A = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: k,
    initialized: I,
    renderFallback: J,
    navigation: rf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || M,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, q = "POP", F = null, ie = !1, re, te = !1, ce = /* @__PURE__ */ new Map(), W = null, O = !1, C = !1, U = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Map(), Q = 0, _ = -1, Z = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), _e, $e = null;
  function Jt() {
    if (S = t.history.listen(
      ({ action: D, location: $, delta: Y }) => {
        if (_e) {
          _e(), _e = void 0;
          return;
        }
        Mt(
          Ae.size === 0 || Y != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = la({
          currentLocation: A.location,
          nextLocation: $,
          historyAction: D
        });
        if (ue && Y != null) {
          let de = new Promise((Se) => {
            _e = Se;
          });
          t.history.go(Y * -1), Jn(ue, {
            state: "blocked",
            location: $,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: $
              }), de.then(() => t.history.go(Y));
            },
            reset() {
              let Se = new Map(A.blockers);
              Se.set(ue, Ps), et({ blockers: Se });
            }
          }), F?.resolve(), F = null;
          return;
        }
        return De(D, $);
      }
    ), i) {
      dN(a, ce);
      let D = () => fN(a, ce);
      a.addEventListener("pagehide", D), W = () => a.removeEventListener("pagehide", D);
    }
    return A.initialized || De("POP", A.location, {
      initialHydration: !0
    }), ne;
  }
  function Pt() {
    S && S(), W && W(), E.clear(), re && re.abort(), A.fetchers.forEach((D, $) => Zn($)), A.blockers.forEach((D, $) => va($));
  }
  function At(D) {
    return E.add(D), () => E.delete(D);
  }
  function et(D, $ = {}) {
    D.matches && (D.matches = D.matches.map((de) => {
      let Se = h[de.route.id], pe = de.route;
      return pe.element !== Se.element || pe.errorElement !== Se.errorElement || pe.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...de,
        route: Se
      } : de;
    })), A = {
      ...A,
      ...D
    };
    let Y = [], ue = [];
    A.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ge.has(Se) ? Y.push(Se) : ue.push(Se));
    }), ge.forEach((de) => {
      !A.fetchers.has(de) && !B.has(de) && Y.push(de);
    }), [...E].forEach(
      (de) => de(A, {
        deletedFetchers: Y,
        newErrors: D.errors ?? null,
        viewTransitionOpts: $.viewTransitionOpts,
        flushSync: $.flushSync === !0
      })
    ), Y.forEach((de) => Zn(de)), ue.forEach((de) => A.fetchers.delete(de));
  }
  function pt(D, $, { flushSync: Y } = {}) {
    let ue = A.actionData != null && A.navigation.formMethod != null && cn(A.navigation.formMethod) && A.navigation.state === "loading" && D.state?._isRedirect !== !0, de;
    $.actionData ? Object.keys($.actionData).length > 0 ? de = $.actionData : de = null : ue ? de = A.actionData : de = null;
    let Se = $.loaderData ? jy(
      A.loaderData,
      $.loaderData,
      $.matches || [],
      $.errors
    ) : A.loaderData, pe = A.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Ps)));
    let ve = O ? !1 : Gt(D, $.matches || A.matches), Ee = ie === !0 || A.navigation.formMethod != null && cn(A.navigation.formMethod) && D.state?._isRedirect !== !0;
    g && (m = g, g = void 0), O || q === "POP" || (q === "PUSH" ? t.history.push(D, D.state) : q === "REPLACE" && t.history.replace(D, D.state));
    let be;
    if (q === "POP") {
      let Re = ce.get(A.location.pathname);
      Re && Re.has(D.pathname) ? be = {
        currentLocation: A.location,
        nextLocation: D
      } : ce.has(D.pathname) && (be = {
        currentLocation: D,
        nextLocation: A.location
      });
    } else if (te) {
      let Re = ce.get(A.location.pathname);
      Re ? Re.add(D.pathname) : (Re = /* @__PURE__ */ new Set([D.pathname]), ce.set(A.location.pathname, Re)), be = {
        currentLocation: A.location,
        nextLocation: D
      };
    }
    et(
      {
        ...$,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: q,
        location: D,
        initialized: !0,
        renderFallback: !1,
        navigation: rf,
        revalidation: "idle",
        restoreScrollPosition: ve,
        preventScrollReset: Ee,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: Y === !0
      }
    ), q = "POP", ie = !1, te = !1, O = !1, C = !1, F?.resolve(), F = null, $e?.resolve(), $e = null;
  }
  async function he(D, $) {
    if (F?.resolve(), F = null, typeof D == "number") {
      F || (F = Ry());
      let dt = F.promise;
      return t.history.go(D), dt;
    }
    let Y = Gf(
      A.location,
      A.matches,
      p,
      D,
      $?.fromRouteId,
      $?.relative
    ), { path: ue, submission: de, error: Se } = my(
      !1,
      Y,
      $
    ), pe;
    $?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof $.unstable_mask == "string" ? ia($.unstable_mask) : {
        ...A.location.unstable_mask,
        ...$.unstable_mask
      }
    });
    let ve = A.location, Ee = Yf(
      ve,
      ue,
      $ && $.state,
      void 0,
      pe
    );
    Ee = {
      ...Ee,
      ...t.history.encodeLocation(Ee)
    };
    let be = $ && $.replace != null ? $.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && cn(de.formMethod) && de.formAction === A.location.pathname + A.location.search && (Re = "REPLACE");
    let Ne = $ && "preventScrollReset" in $ ? $.preventScrollReset === !0 : void 0, Ze = ($ && $.flushSync) === !0, He = la({
      currentLocation: ve,
      nextLocation: Ee,
      historyAction: Re
    });
    if (He) {
      Jn(He, {
        state: "blocked",
        location: Ee,
        proceed() {
          Jn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: Ee
          }), he(D, $);
        },
        reset() {
          let dt = new Map(A.blockers);
          dt.set(He, Ps), et({ blockers: dt });
        }
      });
      return;
    }
    await De(Re, Ee, {
      submission: de,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ne,
      replace: $ && $.replace,
      enableViewTransition: $ && $.viewTransition,
      flushSync: Ze,
      callSiteDefaultShouldRevalidate: $ && $.unstable_defaultShouldRevalidate
    });
  }
  function ke() {
    $e || ($e = Ry()), nt(), et({ revalidation: "loading" });
    let D = $e.promise;
    return A.navigation.state === "submitting" ? D : A.navigation.state === "idle" ? (De(A.historyAction, A.location, {
      startUninterruptedRevalidation: !0
    }), D) : (De(
      q || A.historyAction,
      A.navigation.location,
      {
        overrideNavigation: A.navigation,
        // Proxy through any rending view transition
        enableViewTransition: te === !0
      }
    ), D);
  }
  async function De(D, $, Y) {
    re && re.abort(), re = null, q = D, O = (Y && Y.startUninterruptedRevalidation) === !0, Dt(A.location, A.matches), ie = (Y && Y.preventScrollReset) === !0, te = (Y && Y.enableViewTransition) === !0;
    let ue = g || m, de = Y && Y.overrideNavigation, Se = Y?.initialHydration && A.matches && A.matches.length > 0 && !z ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      A.matches
    ) : vr(ue, $, p), pe = (Y && Y.flushSync) === !0;
    if (Se && A.initialized && !C && tN(A.location, $) && !(Y && Y.submission && cn(Y.submission.formMethod))) {
      pt($, { matches: Se }, { flushSync: pe });
      return;
    }
    let ve = wn(Se, ue, $.pathname);
    if (ve.active && ve.matches && (Se = ve.matches), !Se) {
      let { error: st, notFoundMatches: St, route: Fe } = hn(
        $.pathname
      );
      pt(
        $,
        {
          matches: St,
          loaderData: {},
          errors: {
            [Fe.id]: st
          }
        },
        { flushSync: pe }
      );
      return;
    }
    re = new AbortController();
    let Ee = Hi(
      t.history,
      $,
      re.signal,
      Y && Y.submission
    ), be = t.getContext ? await t.getContext() : new oy(), Re;
    if (Y && Y.pendingError)
      Re = [
        gr(Se).route.id,
        { type: "error", error: Y.pendingError }
      ];
    else if (Y && Y.submission && cn(Y.submission.formMethod)) {
      let st = await Te(
        Ee,
        $,
        Y.submission,
        Se,
        be,
        ve.active,
        Y && Y.initialHydration === !0,
        { replace: Y.replace, flushSync: pe }
      );
      if (st.shortCircuited)
        return;
      if (st.pendingActionResult) {
        let [St, Fe] = st.pendingActionResult;
        if (An(Fe) && hl(Fe.error) && Fe.error.status === 404) {
          re = null, pt($, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [St]: Fe.error
            }
          });
          return;
        }
      }
      Se = st.matches || Se, Re = st.pendingActionResult, de = sf($, Y.submission), pe = !1, ve.active = !1, Ee = Hi(
        t.history,
        Ee.url,
        Ee.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Ze,
      loaderData: He,
      errors: dt
    } = await bt(
      Ee,
      $,
      Se,
      be,
      ve.active,
      de,
      Y && Y.submission,
      Y && Y.fetcherSubmission,
      Y && Y.replace,
      Y && Y.initialHydration === !0,
      pe,
      Re,
      Y && Y.callSiteDefaultShouldRevalidate
    );
    Ne || (re = null, pt($, {
      matches: Ze || Se,
      ...Ny(Re),
      loaderData: He,
      errors: dt
    }));
  }
  async function Te(D, $, Y, ue, de, Se, pe, ve = {}) {
    nt();
    let Ee = cN($, Y);
    if (et({ navigation: Ee }, { flushSync: ve.flushSync === !0 }), Se) {
      let Ne = await it(
        ue,
        $.pathname,
        D.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: He, route: dt } = Io(m);
          return {
            matches: He,
            pendingActionResult: [
              dt.id,
              {
                type: "error",
                error: Ne.error
              }
            ]
          };
        }
        let Ze = gr(Ne.partialMatches).route.id;
        return {
          matches: Ne.partialMatches,
          pendingActionResult: [
            Ze,
            {
              type: "error",
              error: Ne.error
            }
          ]
        };
      } else if (Ne.matches)
        ue = Ne.matches;
      else {
        let { notFoundMatches: Ze, error: He, route: dt } = hn(
          $.pathname
        );
        return {
          matches: Ze,
          pendingActionResult: [
            dt.id,
            {
              type: "error",
              error: He
            }
          ]
        };
      }
    }
    let be, Re = cc(ue, $);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: D.method,
          pathname: $.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Xi(
        d,
        h,
        D,
        $,
        ue,
        Re,
        pe ? [] : l,
        de
      ), Ze = await ze(
        D,
        $,
        Ne,
        de,
        null
      );
      if (be = Ze[Re.route.id], !be) {
        for (let He of ue)
          if (Ze[He.route.id]) {
            be = Ze[He.route.id];
            break;
          }
      }
      if (D.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(be)) {
      let Ne;
      return ve && ve.replace != null ? Ne = ve.replace : Ne = Sy(
        be.response.headers.get("Location"),
        new URL(D.url),
        p,
        t.history
      ) === A.location.pathname + A.location.search, await ye(D, be, !0, {
        submission: Y,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ne = gr(ue, Re.route.id);
      return (ve && ve.replace) !== !0 && (q = "PUSH"), {
        matches: ue,
        pendingActionResult: [
          Ne.route.id,
          be,
          Re.route.id
        ]
      };
    }
    return {
      matches: ue,
      pendingActionResult: [Re.route.id, be]
    };
  }
  async function bt(D, $, Y, ue, de, Se, pe, ve, Ee, be, Re, Ne, Ze) {
    let He = Se || sf($, pe), dt = pe || ve || Cy(He), st = !O && !be;
    if (de) {
      if (st) {
        let Ct = xt(Ne);
        et(
          {
            navigation: He,
            ...Ct !== void 0 ? { actionData: Ct } : {}
          },
          {
            flushSync: Re
          }
        );
      }
      let qe = await it(
        Y,
        $.pathname,
        D.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: ln, route: Ot } = Io(m);
          return {
            matches: ln,
            loaderData: {},
            errors: {
              [Ot.id]: qe.error
            }
          };
        }
        let Ct = gr(qe.partialMatches).route.id;
        return {
          matches: qe.partialMatches,
          loaderData: {},
          errors: {
            [Ct]: qe.error
          }
        };
      } else if (qe.matches)
        Y = qe.matches;
      else {
        let { error: Ct, notFoundMatches: ln, route: Ot } = hn(
          $.pathname
        );
        return {
          matches: ln,
          loaderData: {},
          errors: {
            [Ot.id]: Ct
          }
        };
      }
    }
    let St = g || m, { dsMatches: Fe, revalidatingFetchers: zt } = py(
      D,
      ue,
      d,
      h,
      t.history,
      A,
      Y,
      dt,
      $,
      be ? [] : l,
      be === !0,
      C,
      U,
      ge,
      le,
      P,
      St,
      p,
      t.patchRoutesOnNavigation != null,
      Ne,
      Ze
    );
    if (_ = ++Q, !t.dataStrategy && !Fe.some((qe) => qe.shouldLoad) && !Fe.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && zt.length === 0) {
      let qe = ei();
      return pt(
        $,
        {
          matches: Y,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && An(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...Ny(Ne),
          ...qe ? { fetchers: new Map(A.fetchers) } : {}
        },
        { flushSync: Re }
      ), { shortCircuited: !0 };
    }
    if (st) {
      let qe = {};
      if (!de) {
        qe.navigation = He;
        let Ct = xt(Ne);
        Ct !== void 0 && (qe.actionData = Ct);
      }
      zt.length > 0 && (qe.fetchers = dn(zt)), et(qe, { flushSync: Re });
    }
    zt.forEach((qe) => {
      Tt(qe.key), qe.controller && B.set(qe.key, qe.controller);
    });
    let mt = () => zt.forEach((qe) => Tt(qe.key));
    re && re.signal.addEventListener(
      "abort",
      mt
    );
    let { loaderResults: qa, fetcherResults: Wn } = await Qe(
      Fe,
      zt,
      D,
      $,
      ue
    );
    if (D.signal.aborted)
      return { shortCircuited: !0 };
    re && re.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((qe) => B.delete(qe.key));
    let Kt = Fo(qa);
    if (Kt)
      return await ye(D, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    if (Kt = Fo(Wn), Kt)
      return P.add(Kt.key), await ye(D, Kt.result, !0, {
        replace: Ee
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = Ey(
      A,
      Y,
      qa,
      Ne,
      zt,
      Wn
    );
    be && A.errors && (Nr = { ...A.errors, ...Nr });
    let ca = ei(), Tr = Ha(_), ti = ca || Tr || zt.length > 0;
    return {
      matches: Y,
      loaderData: oa,
      errors: Nr,
      ...ti ? { fetchers: new Map(A.fetchers) } : {}
    };
  }
  function xt(D) {
    if (D && !An(D[1]))
      return {
        [D[0]]: D[1].data
      };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function dn(D) {
    return D.forEach(($) => {
      let Y = A.fetchers.get($.key), ue = Ks(
        void 0,
        Y ? Y.data : void 0
      );
      A.fetchers.set($.key, ue);
    }), new Map(A.fetchers);
  }
  async function Ht(D, $, Y, ue) {
    Tt(D);
    let de = (ue && ue.flushSync) === !0, Se = g || m, pe = Gf(
      A.location,
      A.matches,
      p,
      Y,
      $,
      ue?.relative
    ), ve = vr(Se, pe, p), Ee = wn(ve, Se, pe);
    if (Ee.active && Ee.matches && (ve = Ee.matches), !ve) {
      Ft(
        D,
        $,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = my(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(D, $, Ne, { flushSync: de });
      return;
    }
    let Ze = t.getContext ? await t.getContext() : new oy(), He = (ue && ue.preventScrollReset) === !0;
    if (Re && cn(Re.formMethod)) {
      await On(
        D,
        $,
        be,
        ve,
        Ze,
        Ee.active,
        de,
        He,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    le.set(D, { routeId: $, path: be }), await qt(
      D,
      $,
      be,
      ve,
      Ze,
      Ee.active,
      de,
      He,
      Re
    );
  }
  async function On(D, $, Y, ue, de, Se, pe, ve, Ee, be) {
    nt(), le.delete(D);
    let Re = A.fetchers.get(D);
    It(D, uN(Ee, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Ze = Hi(
      t.history,
      Y,
      Ne.signal,
      Ee
    );
    if (Se) {
      let vt = await it(
        ue,
        new URL(Ze.url).pathname,
        Ze.signal,
        D
      );
      if (vt.type === "aborted")
        return;
      if (vt.type === "error") {
        Ft(D, $, vt.error, { flushSync: pe });
        return;
      } else if (vt.matches)
        ue = vt.matches;
      else {
        Ft(
          D,
          $,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let He = cc(ue, Y);
    if (!He.route.action && !He.route.lazy) {
      let vt = Yn(405, {
        method: Ee.formMethod,
        pathname: Y,
        routeId: $
      });
      Ft(D, $, vt, { flushSync: pe });
      return;
    }
    B.set(D, Ne);
    let dt = Q, st = Xi(
      d,
      h,
      Ze,
      Y,
      ue,
      He,
      l,
      de
    ), St = await ze(
      Ze,
      Y,
      st,
      de,
      D
    ), Fe = St[He.route.id];
    if (!Fe) {
      for (let vt of st)
        if (St[vt.route.id]) {
          Fe = St[vt.route.id];
          break;
        }
    }
    if (Ze.signal.aborted) {
      B.get(D) === Ne && B.delete(D);
      return;
    }
    if (ge.has(D)) {
      if (Yr(Fe) || An(Fe)) {
        It(D, ka(void 0));
        return;
      }
    } else {
      if (Yr(Fe))
        if (B.delete(D), _ > dt) {
          It(D, ka(void 0));
          return;
        } else
          return P.add(D), It(D, Ks(Ee)), ye(Ze, Fe, !1, {
            fetcherSubmission: Ee,
            preventScrollReset: ve
          });
      if (An(Fe)) {
        Ft(D, $, Fe.error);
        return;
      }
    }
    let zt = A.navigation.location || A.location, mt = Hi(
      t.history,
      zt,
      Ne.signal
    ), qa = g || m, Wn = A.navigation.state !== "idle" ? vr(qa, A.navigation.location, p) : A.matches;
    Ie(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++Q;
    Z.set(D, Kt);
    let oa = Ks(Ee, Fe.data);
    A.fetchers.set(D, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = py(
      mt,
      de,
      d,
      h,
      t.history,
      A,
      Wn,
      Ee,
      zt,
      l,
      !1,
      C,
      U,
      ge,
      le,
      P,
      qa,
      p,
      t.patchRoutesOnNavigation != null,
      [He.route.id, Fe],
      be
    );
    ca.filter((vt) => vt.key !== D).forEach((vt) => {
      let ni = vt.key, ai = A.fetchers.get(ni), Al = Ks(
        void 0,
        ai ? ai.data : void 0
      );
      A.fetchers.set(ni, Al), Tt(ni), vt.controller && B.set(ni, vt.controller);
    }), et({ fetchers: new Map(A.fetchers) });
    let Tr = () => ca.forEach((vt) => Tt(vt.key));
    Ne.signal.addEventListener(
      "abort",
      Tr
    );
    let { loaderResults: ti, fetcherResults: qe } = await Qe(
      Nr,
      ca,
      mt,
      zt,
      de
    );
    if (Ne.signal.aborted)
      return;
    if (Ne.signal.removeEventListener(
      "abort",
      Tr
    ), Z.delete(D), B.delete(D), ca.forEach((vt) => B.delete(vt.key)), A.fetchers.has(D)) {
      let vt = ka(Fe.data);
      A.fetchers.set(D, vt);
    }
    let Ct = Fo(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    if (Ct = Fo(qe), Ct)
      return P.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    let { loaderData: ln, errors: Ot } = Ey(
      A,
      Wn,
      ti,
      void 0,
      ca,
      qe
    );
    Ha(Kt), A.navigation.state === "loading" && Kt > _ ? (Ie(q, "Expected pending action"), re && re.abort(), pt(A.navigation.location, {
      matches: Wn,
      loaderData: ln,
      errors: Ot,
      fetchers: new Map(A.fetchers)
    })) : (et({
      errors: Ot,
      loaderData: jy(
        A.loaderData,
        ln,
        Wn,
        Ot
      ),
      fetchers: new Map(A.fetchers)
    }), C = !1);
  }
  async function qt(D, $, Y, ue, de, Se, pe, ve, Ee) {
    let be = A.fetchers.get(D);
    It(
      D,
      Ks(
        Ee,
        be ? be.data : void 0
      ),
      { flushSync: pe }
    );
    let Re = new AbortController(), Ne = Hi(
      t.history,
      Y,
      Re.signal
    );
    if (Se) {
      let Fe = await it(
        ue,
        new URL(Ne.url).pathname,
        Ne.signal,
        D
      );
      if (Fe.type === "aborted")
        return;
      if (Fe.type === "error") {
        Ft(D, $, Fe.error, { flushSync: pe });
        return;
      } else if (Fe.matches)
        ue = Fe.matches;
      else {
        Ft(
          D,
          $,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Ze = cc(ue, Y);
    B.set(D, Re);
    let He = Q, dt = Xi(
      d,
      h,
      Ne,
      Y,
      ue,
      Ze,
      l,
      de
    ), st = await ze(
      Ne,
      Y,
      dt,
      de,
      D
    ), St = st[Ze.route.id];
    if (!St) {
      for (let Fe of ue)
        if (st[Fe.route.id]) {
          St = st[Fe.route.id];
          break;
        }
    }
    if (B.get(D) === Re && B.delete(D), !Ne.signal.aborted) {
      if (ge.has(D)) {
        It(D, ka(void 0));
        return;
      }
      if (Yr(St))
        if (_ > He) {
          It(D, ka(void 0));
          return;
        } else {
          P.add(D), await ye(Ne, St, !1, {
            preventScrollReset: ve
          });
          return;
        }
      if (An(St)) {
        Ft(D, $, St.error);
        return;
      }
      It(D, ka(St.data));
    }
  }
  async function ye(D, $, Y, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    Y || (F?.resolve(), F = null), $.response.headers.has("X-Remix-Revalidate") && (C = !0);
    let ve = $.response.headers.get("Location");
    Ie(ve, "Expected a Location header on the redirect Response"), ve = Sy(
      ve,
      new URL(D.url),
      p,
      t.history
    );
    let Ee = Yf(A.location, ve, {
      _isRedirect: !0
    });
    if (i) {
      let dt = !1;
      if ($.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (Eh(ve)) {
        const st = ij(ve, !0);
        dt = // Hard reload if it's an absolute URL to a new origin
        st.origin !== a.location.origin || // Hard reload if it's an absolute URL that does not match our basename
        Kn(st.pathname, p) == null;
      }
      if (dt) {
        pe ? a.location.replace(ve) : a.location.assign(ve);
        return;
      }
    }
    re = null;
    let be = pe === !0 || $.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Ze } = A.navigation;
    !ue && !de && Re && Ne && Ze && (ue = Cy(A.navigation));
    let He = ue || de;
    if (Vj.has($.response.status) && He && cn(He.formMethod))
      await De(be, Ee, {
        submission: {
          ...He,
          formAction: ve
        },
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: Y ? te : void 0
      });
    else {
      let dt = sf(
        Ee,
        ue
      );
      await De(be, Ee, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: Y ? te : void 0
      });
    }
  }
  async function ze(D, $, Y, ue, de) {
    let Se, pe = {};
    try {
      Se = await Kj(
        b,
        D,
        $,
        Y,
        de,
        ue,
        !1
      );
    } catch (ve) {
      return Y.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
        pe[Ee.route.id] = {
          type: "error",
          error: ve
        };
      }), pe;
    }
    if (D.signal.aborted)
      return pe;
    if (!cn(D.method))
      for (let ve of Y) {
        if (Se[ve.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(ve.route.id) && !A.loaderData.hasOwnProperty(ve.route.id) && (!A.errors || !A.errors.hasOwnProperty(ve.route.id)) && ve.shouldCallHandler() && (Se[ve.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ve.route.id}`
          )
        });
      }
    for (let [ve, Ee] of Object.entries(Se))
      if (iN(Ee)) {
        let be = Ee.result;
        pe[ve] = {
          type: "redirect",
          response: Wj(
            be,
            D,
            ve,
            Y,
            p
          )
        };
      } else
        pe[ve] = await Jj(Ee);
    return pe;
  }
  async function Qe(D, $, Y, ue, de) {
    let Se = ze(
      Y,
      ue,
      D,
      de,
      null
    ), pe = Promise.all(
      $.map(async (be) => {
        if (be.matches && be.match && be.request && be.controller) {
          let Ne = (await ze(
            be.request,
            be.path,
            be.matches,
            de,
            be.key
          ))[be.match.route.id];
          return { [be.key]: Ne };
        } else
          return Promise.resolve({
            [be.key]: {
              type: "error",
              error: Yn(404, {
                pathname: be.path
              })
            }
          });
      })
    ), ve = await Se, Ee = (await pe).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: ve,
      fetcherResults: Ee
    };
  }
  function nt() {
    C = !0, le.forEach((D, $) => {
      B.has($) && U.add($), Tt($);
    });
  }
  function It(D, $, Y = {}) {
    A.fetchers.set(D, $), et(
      { fetchers: new Map(A.fetchers) },
      { flushSync: (Y && Y.flushSync) === !0 }
    );
  }
  function Ft(D, $, Y, ue = {}) {
    let de = gr(A.matches, $);
    Zn(D), et(
      {
        errors: {
          [de.route.id]: Y
        },
        fetchers: new Map(A.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function jr(D) {
    return fe.set(D, (fe.get(D) || 0) + 1), ge.has(D) && ge.delete(D), A.fetchers.get(D) || $j;
  }
  function sa(D, $) {
    Tt(D, $?.reason), It(D, ka(null));
  }
  function Zn(D) {
    let $ = A.fetchers.get(D);
    B.has(D) && !($ && $.state === "loading" && Z.has(D)) && Tt(D), le.delete(D), Z.delete(D), P.delete(D), ge.delete(D), U.delete(D), A.fetchers.delete(D);
  }
  function Wt(D) {
    let $ = (fe.get(D) || 0) - 1;
    $ <= 0 ? (fe.delete(D), ge.add(D)) : fe.set(D, $), et({ fetchers: new Map(A.fetchers) });
  }
  function Tt(D, $) {
    let Y = B.get(D);
    Y && (Y.abort($), B.delete(D));
  }
  function Yt(D) {
    for (let $ of D) {
      let Y = jr($), ue = ka(Y.data);
      A.fetchers.set($, ue);
    }
  }
  function ei() {
    let D = [], $ = !1;
    for (let Y of P) {
      let ue = A.fetchers.get(Y);
      Ie(ue, `Expected fetcher: ${Y}`), ue.state === "loading" && (P.delete(Y), D.push(Y), $ = !0);
    }
    return Yt(D), $;
  }
  function Ha(D) {
    let $ = [];
    for (let [Y, ue] of Z)
      if (ue < D) {
        let de = A.fetchers.get(Y);
        Ie(de, `Expected fetcher: ${Y}`), de.state === "loading" && (Tt(Y), Z.delete(Y), $.push(Y));
      }
    return Yt($), $.length > 0;
  }
  function kn(D, $) {
    let Y = A.blockers.get(D) || Ps;
    return Ae.get(D) !== $ && Ae.set(D, $), Y;
  }
  function va(D) {
    A.blockers.delete(D), Ae.delete(D);
  }
  function Jn(D, $) {
    let Y = A.blockers.get(D) || Ps;
    Ie(
      Y.state === "unblocked" && $.state === "blocked" || Y.state === "blocked" && $.state === "blocked" || Y.state === "blocked" && $.state === "proceeding" || Y.state === "blocked" && $.state === "unblocked" || Y.state === "proceeding" && $.state === "unblocked",
      `Invalid blocker state transition: ${Y.state} -> ${$.state}`
    );
    let ue = new Map(A.blockers);
    ue.set(D, $), et({ blockers: ue });
  }
  function la({
    currentLocation: D,
    nextLocation: $,
    historyAction: Y
  }) {
    if (Ae.size === 0)
      return;
    Ae.size > 1 && Mt(!1, "A router only supports one blocker at a time");
    let ue = Array.from(Ae.entries()), [de, Se] = ue[ue.length - 1], pe = A.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: D, nextLocation: $, historyAction: Y }))
      return de;
  }
  function hn(D) {
    let $ = Yn(404, { pathname: D }), Y = g || m, { matches: ue, route: de } = Io(Y);
    return { notFoundMatches: ue, route: de, error: $ };
  }
  function Oe(D, $, Y) {
    if (w = D, R = $, N = Y || null, !T && A.navigation === rf) {
      T = !0;
      let ue = Gt(A.location, A.matches);
      ue != null && et({ restoreScrollPosition: ue });
    }
    return () => {
      w = null, R = null, N = null;
    };
  }
  function ut(D, $) {
    return N && N(
      D,
      $.map((ue) => dj(ue, A.loaderData))
    ) || D.key;
  }
  function Dt(D, $) {
    if (w && R) {
      let Y = ut(D, $);
      w[Y] = R();
    }
  }
  function Gt(D, $) {
    if (w) {
      let Y = ut(D, $), ue = w[Y];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(D, $, Y) {
    if (t.patchRoutesOnNavigation)
      if (D) {
        if (Object.keys(D[0].params).length > 0)
          return { active: !0, matches: sl(
            $,
            Y,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: sl(
          $,
          Y,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(D, $, Y, ue) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: D };
    let de = D;
    for (; ; ) {
      let Se = g == null, pe = g || m, ve = h;
      try {
        await t.patchRoutesOnNavigation({
          signal: Y,
          path: $,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            Y.aborted || vy(
              Re,
              Ne,
              pe,
              ve,
              d,
              !1
            );
          }
        });
      } catch (Re) {
        return { type: "error", error: Re, partialMatches: de };
      } finally {
        Se && !Y.aborted && (m = [...m]);
      }
      if (Y.aborted)
        return { type: "aborted" };
      let Ee = vr(pe, $, p), be = null;
      if (Ee) {
        if (Object.keys(Ee[0].params).length === 0)
          return { type: "success", matches: Ee };
        if (be = sl(
          pe,
          $,
          p,
          !0
        ), !(be && de.length < be.length && en(
          de,
          be.slice(0, de.length)
        )))
          return { type: "success", matches: Ee };
      }
      if (be || (be = sl(
        pe,
        $,
        p,
        !0
      )), !be || en(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function en(D, $) {
    return D.length === $.length && D.every((Y, ue) => Y.route.id === $[ue].route.id);
  }
  function ga(D) {
    h = {}, g = fl(
      D,
      d,
      void 0,
      h
    );
  }
  function sn(D, $, Y = !1) {
    let ue = g == null;
    vy(
      D,
      $,
      g || m,
      h,
      d,
      Y
    ), ue && (m = [...m], et({}));
  }
  return ne = {
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
    initialize: Jt,
    subscribe: At,
    enableScrollRestoration: Oe,
    navigate: he,
    fetch: Ht,
    revalidate: ke,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (D) => t.history.createHref(D),
    encodeLocation: (D) => t.history.encodeLocation(D),
    getFetcher: jr,
    resetFetcher: sa,
    deleteFetcher: Wt,
    dispose: Pt,
    getBlocker: kn,
    deleteBlocker: va,
    patchRoutes: sn,
    _internalFetchControllers: B,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ga,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(D) {
      et(D);
    }
  }, t.unstable_instrumentations && (ne = Aj(
    ne,
    t.unstable_instrumentations.map((D) => D.router).filter(Boolean)
  )), ne;
}
function Ij(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Gf(t, a, i, l, o, d) {
  let h, m;
  if (o) {
    h = [];
    for (let p of a)
      if (h.push(p), p.route.id === o) {
        m = p;
        break;
      }
  } else
    h = a, m = a[a.length - 1];
  let g = Ac(
    l || ".",
    jh(h),
    Kn(t.pathname, i) || t.pathname,
    d === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && m) {
    let p = Rh(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((E) => E).forEach((E) => b.append("index", E));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (g.pathname = jj({ basename: i, pathname: g.pathname })), pa(g);
}
function my(t, a, i) {
  if (!i || !Ij(i))
    return { path: a };
  if (i.formMethod && !oN(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), d = (i.formMethod || "get").toUpperCase(), h = Nx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!cn(d))
        return l();
      let v = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (S, [E, w]) => `${S}${E}=${w}
`,
          ""
        )
      ) : String(i.body);
      return {
        path: a,
        submission: {
          formMethod: d,
          formAction: h,
          formEncType: i.formEncType,
          formData: void 0,
          json: void 0,
          text: v
        }
      };
    } else if (i.formEncType === "application/json") {
      if (!cn(d))
        return l();
      try {
        let v = typeof i.body == "string" ? JSON.parse(i.body) : i.body;
        return {
          path: a,
          submission: {
            formMethod: d,
            formAction: h,
            formEncType: i.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return l();
      }
    }
  }
  Ie(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let m, g;
  if (i.formData)
    m = Pf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Pf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = wy(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = wy(m);
    } catch {
      return l();
    }
  let p = {
    formMethod: d,
    formAction: h,
    formEncType: i && i.formEncType || "application/x-www-form-urlencoded",
    formData: g,
    json: void 0,
    text: void 0
  };
  if (cn(p.formMethod))
    return { path: a, submission: p };
  let b = ia(a);
  return t && b.search && Rh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: pa(b), submission: p };
}
function py(t, a, i, l, o, d, h, m, g, p, b, v, S, E, w, N, R, T, k, z, M) {
  let I = z ? An(z[1]) ? z[1].error : z[1].data : void 0, J = o.createURL(d.location), ne = o.createURL(g), A;
  if (b && d.errors) {
    let W = Object.keys(d.errors)[0];
    A = h.findIndex((O) => O.route.id === W);
  } else if (z && An(z[1])) {
    let W = z[0];
    A = h.findIndex((O) => O.route.id === W) - 1;
  }
  let q = z ? z[1].statusCode : void 0, F = q && q >= 400, ie = {
    currentUrl: J,
    currentParams: d.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: I,
    actionStatus: q
  }, re = xl(h), te = h.map((W, O) => {
    let { route: C } = W, U = null;
    if (A != null && O > A)
      U = !1;
    else if (C.lazy)
      U = !0;
    else if (!Th(C))
      U = !1;
    else if (b) {
      let { shouldLoad: Z } = yx(
        C,
        d.loaderData,
        d.errors
      );
      U = Z;
    } else Fj(d.loaderData, d.matches[O], W) && (U = !0);
    if (U !== null)
      return Xf(
        i,
        l,
        t,
        g,
        re,
        W,
        p,
        a,
        U
      );
    let B = !1;
    typeof M == "boolean" ? B = M : F ? B = !1 : (v || J.pathname + J.search === ne.pathname + ne.search || J.search !== ne.search || Yj(d.matches[O], W)) && (B = !0);
    let Q = {
      ...ie,
      defaultShouldRevalidate: B
    }, _ = ol(W, Q);
    return Xf(
      i,
      l,
      t,
      g,
      re,
      W,
      p,
      a,
      _,
      Q,
      M
    );
  }), ce = [];
  return w.forEach((W, O) => {
    if (b || !h.some((le) => le.route.id === W.routeId) || E.has(O))
      return;
    let C = d.fetchers.get(O), U = C && C.state !== "idle" && C.data === void 0, B = vr(R, W.path, T);
    if (!B) {
      if (k && U)
        return;
      ce.push({
        key: O,
        routeId: W.routeId,
        path: W.path,
        matches: null,
        match: null,
        request: null,
        controller: null
      });
      return;
    }
    if (N.has(O))
      return;
    let Q = cc(B, W.path), _ = new AbortController(), Z = Hi(
      o,
      W.path,
      _.signal
    ), P = null;
    if (S.has(O))
      S.delete(O), P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a
      );
    else if (U)
      v && (P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a
      ));
    else {
      let le;
      typeof M == "boolean" ? le = M : F ? le = !1 : le = v;
      let fe = {
        ...ie,
        defaultShouldRevalidate: le
      };
      ol(Q, fe) && (P = Xi(
        i,
        l,
        Z,
        W.path,
        B,
        Q,
        p,
        a,
        fe
      ));
    }
    P && ce.push({
      key: O,
      routeId: W.routeId,
      path: W.path,
      matches: P,
      match: Q,
      request: Z,
      controller: _
    });
  }), { dsMatches: te, revalidatingFetchers: ce };
}
function Th(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function yx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Th(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!l && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let d = !l && !o;
  return { shouldLoad: d, renderFallback: d };
}
function Fj(t, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return l || o;
}
function Yj(t, a) {
  let i = t.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    t.pathname !== a.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i != null && i.endsWith("*") && t.params["*"] !== a.params["*"]
  );
}
function ol(t, a) {
  if (t.route.shouldRevalidate) {
    let i = t.route.shouldRevalidate(a);
    if (typeof i == "boolean")
      return i;
  }
  return a.defaultShouldRevalidate;
}
function vy(t, a, i, l, o, d) {
  let h;
  if (t) {
    let p = l[t];
    Ie(
      p,
      `No route found to patch children into: routeId = ${t}`
    ), p.children || (p.children = []), h = p.children;
  } else
    h = i;
  let m = [], g = [];
  if (a.forEach((p) => {
    let b = h.find(
      (v) => bx(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = fl(
      m,
      o,
      [t || "_", "patch", String(h?.length || "0")],
      l
    );
    h.push(...p);
  }
  if (d && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], S = b, [E] = fl(
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
function bx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, l) => a.children?.some((o) => bx(i, o))
  ) ?? !1 : !1;
}
var gy = /* @__PURE__ */ new WeakMap(), xx = ({
  key: t,
  route: a,
  manifest: i,
  mapRouteProperties: l
}) => {
  let o = i[a.id];
  if (Ie(o, "No route found in manifest"), !o.lazy || typeof o.lazy != "object")
    return;
  let d = o.lazy[t];
  if (!d)
    return;
  let h = gy.get(o);
  h || (h = {}, gy.set(o, h));
  let m = h[t];
  if (m)
    return m;
  let g = (async () => {
    let p = lj(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      Mt(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), h[t] = Promise.resolve();
    else if (v)
      Mt(
        !1,
        `Route "${o.id}" has a static property "${t}" defined. The lazy property will be ignored.`
      );
    else {
      let S = await d();
      S != null && (Object.assign(o, { [t]: S }), Object.assign(o, l(o)));
    }
    typeof o.lazy == "object" && (o.lazy[t] = void 0, Object.values(o.lazy).every((S) => S === void 0) && (o.lazy = void 0));
  })();
  return h[t] = g, g;
}, yy = /* @__PURE__ */ new WeakMap();
function Gj(t, a, i, l, o) {
  let d = i[t.id];
  if (Ie(d, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = yy.get(d);
    if (b)
      return {
        lazyRoutePromise: b,
        lazyHandlerPromise: b
      };
    let v = (async () => {
      Ie(
        typeof t.lazy == "function",
        "No lazy route function found"
      );
      let S = await t.lazy(), E = {};
      for (let w in S) {
        let N = S[w];
        if (N === void 0)
          continue;
        let R = cj(w), k = d[w] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        w !== "hasErrorBoundary";
        R ? Mt(
          !R,
          "Route property " + w + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : k ? Mt(
          !k,
          `Route "${d.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`
        ) : E[w] = N;
      }
      Object.assign(d, E), Object.assign(d, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(d),
        lazy: void 0
      });
    })();
    return yy.set(d, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(t.lazy), m = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = xx({
      key: b,
      route: t,
      manifest: i,
      mapRouteProperties: l
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
async function by(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, d) => {
    i[a[d].route.id] = o;
  }), i;
}
async function Xj(t) {
  return t.matches.some((a) => a.route.middleware) ? Sx(t, () => by(t)) : by(t);
}
function Sx(t, a) {
  return Pj(
    t,
    a,
    (l) => {
      if (lN(l))
        throw l;
      return l;
    },
    aN,
    i
  );
  function i(l, o, d) {
    if (d)
      return Promise.resolve(
        Object.assign(d.value, {
          [o]: { type: "error", result: l }
        })
      );
    {
      let { matches: h } = t, m = Math.min(
        // Throwing route
        Math.max(
          h.findIndex((p) => p.route.id === o),
          0
        ),
        // or the shallowest route that needs to load data
        Math.max(
          h.findIndex((p) => p.shouldCallHandler()),
          0
        )
      ), g = gr(
        h,
        h[m].route.id
      ).route.id;
      return Promise.resolve({
        [g]: { type: "error", result: l }
      });
    }
  }
}
async function Pj(t, a, i, l, o) {
  let { matches: d, ...h } = t, m = d.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await wx(
    h,
    m,
    a,
    i,
    l,
    o
  );
}
async function wx(t, a, i, l, o, d, h = 0) {
  let { request: m } = t;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let g = a[h];
  if (!g)
    return await i();
  let [p, b] = g, v, S = async () => {
    if (v)
      throw new Error("You may only call `next()` once per middleware");
    try {
      return v = { value: await wx(
        t,
        a,
        i,
        l,
        o,
        d,
        h + 1
      ) }, v.value;
    } catch (E) {
      return v = { value: await d(E, p, v) }, v.value;
    }
  };
  try {
    let E = await b(t, S), w = E != null ? l(E) : void 0;
    return o(w) ? w : v ? w ?? v.value : (v = { value: await S() }, v.value);
  } catch (E) {
    return await d(E, p, v);
  }
}
function Ex(t, a, i, l, o) {
  let d = xx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), h = Gj(
    l.route,
    cn(i.method) ? "action" : "loader",
    a,
    t,
    o
  );
  return {
    middleware: d,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Xf(t, a, i, l, o, d, h, m, g, p = null, b) {
  let v = !1, S = Ex(
    t,
    a,
    i,
    d,
    h
  );
  return {
    ...d,
    _lazyPromises: S,
    shouldLoad: g,
    shouldRevalidateArgs: p,
    shouldCallHandler(E) {
      return v = !0, p ? typeof b == "boolean" ? ol(d, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof E == "boolean" ? ol(d, {
        ...p,
        defaultShouldRevalidate: E
      }) : ol(d, p) : g;
    },
    resolve(E) {
      let { lazy: w, loader: N, middleware: R } = d.route, T = v || g || E && !cn(i.method) && (w || N), k = R && R.length > 0 && !N && !w;
      return T && (cn(i.method) || !k) ? Qj({
        request: i,
        path: l,
        unstable_pattern: o,
        match: d,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: E,
        scopedContext: m
      }) : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function Xi(t, a, i, l, o, d, h, m, g = null) {
  return o.map((p) => p.route.id !== d.route.id ? {
    ...p,
    shouldLoad: !1,
    shouldRevalidateArgs: g,
    shouldCallHandler: () => !1,
    _lazyPromises: Ex(
      t,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Xf(
    t,
    a,
    i,
    l,
    xl(o),
    p,
    h,
    m,
    !0,
    g
  ));
}
async function Kj(t, a, i, l, o, d, h) {
  l.some((b) => b._lazyPromises?.middleware) && await Promise.all(l.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: jx(a, i),
    unstable_pattern: xl(l),
    params: l[0].params,
    context: d,
    matches: l
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return Sx(v, () => b({
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
      l.flatMap((b) => [
        b._lazyPromises?.handler,
        b._lazyPromises?.route
      ])
    );
  } catch {
  }
  return p;
}
async function Qj({
  request: t,
  path: a,
  unstable_pattern: i,
  match: l,
  lazyHandlerPromise: o,
  lazyRoutePromise: d,
  handlerOverride: h,
  scopedContext: m
}) {
  let g, p, b = cn(t.method), v = b ? "action" : "loader", S = (E) => {
    let w, N = new Promise((k, z) => w = z);
    p = () => w(), t.signal.addEventListener("abort", p);
    let R = (k) => typeof E != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${l.route.id}]`
      )
    ) : E(
      {
        request: t,
        unstable_url: jx(t, a),
        unstable_pattern: i,
        params: l.params,
        context: m
      },
      ...k !== void 0 ? [k] : []
    ), T = (async () => {
      try {
        return { type: "data", result: await (h ? h((z) => R(z)) : R()) };
      } catch (k) {
        return { type: "error", result: k };
      }
    })();
    return Promise.race([T, N]);
  };
  try {
    let E = b ? l.route.action : l.route.loader;
    if (o || d)
      if (E) {
        let w, [N] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(E).catch((R) => {
            w = R;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          d
        ]);
        if (w !== void 0)
          throw w;
        g = N;
      } else {
        await o;
        let w = b ? l.route.action : l.route.loader;
        if (w)
          [g] = await Promise.all([S(w), d]);
        else if (v === "action") {
          let N = new URL(t.url), R = N.pathname + N.search;
          throw Yn(405, {
            method: t.method,
            pathname: R,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (E)
      g = await S(E);
    else {
      let w = new URL(t.url), N = w.pathname + w.search;
      throw Yn(404, {
        pathname: N
      });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return g;
}
async function Zj(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function Jj(t) {
  let { result: a, type: i } = t;
  if (Ch(a)) {
    let l;
    try {
      l = await Zj(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Dc(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Ty(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: nN(a),
    statusCode: hl(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: hl(a) ? a.status : void 0
  } : Ty(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function Wj(t, a, i, l, o) {
  let d = t.headers.get("Location");
  if (Ie(
    d,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Eh(d)) {
    let h = l.slice(
      0,
      l.findIndex((m) => m.route.id === i) + 1
    );
    d = Gf(
      new URL(a.url),
      h,
      o,
      d
    ), t.headers.set("Location", d);
  }
  return t;
}
var xy = [
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
function Sy(t, a, i, l) {
  if (Eh(t)) {
    let o = t, d = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (xy.includes(d.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(d.pathname, i) != null;
    if (d.origin === a.origin && h)
      return Nh(d.pathname) + d.search + d.hash;
  }
  try {
    let o = l.createURL(t);
    if (xy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hi(t, a, i, l) {
  let o = t.createURL(Nx(a)).toString(), d = { signal: i };
  if (l && cn(l.formMethod)) {
    let { formMethod: h, formEncType: m } = l;
    d.method = h.toUpperCase(), m === "application/json" ? (d.headers = new Headers({ "Content-Type": m }), d.body = JSON.stringify(l.json)) : m === "text/plain" ? d.body = l.text : m === "application/x-www-form-urlencoded" && l.formData ? d.body = Pf(l.formData) : d.body = l.formData;
  }
  return new Request(o, d);
}
function jx(t, a) {
  let i = new URL(t.url), l = typeof a == "string" ? ia(a) : a;
  if (i.pathname = l.pathname || "/", l.search) {
    let o = new URLSearchParams(l.search), d = o.getAll("index");
    o.delete("index");
    for (let h of d.filter(Boolean))
      o.append("index", h);
    i.search = o.size ? `?${o.toString()}` : "";
  } else
    i.search = "";
  return i.hash = l.hash || "", i;
}
function Pf(t) {
  let a = new URLSearchParams();
  for (let [i, l] of t.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function wy(t) {
  let a = new FormData();
  for (let [i, l] of t.entries())
    a.append(i, l);
  return a;
}
function eN(t, a, i, l = !1, o = !1) {
  let d = {}, h = null, m, g = !1, p = {}, b = i && An(i[1]) ? i[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, E = a[S];
    if (Ie(
      !Yr(E),
      "Cannot handle redirect results in processLoaderData"
    ), An(E)) {
      let w = E.error;
      if (b !== void 0 && (w = b, b = void 0), h = h || {}, o)
        h[S] = w;
      else {
        let N = gr(t, S);
        h[N.route.id] == null && (h[N.route.id] = w);
      }
      l || (d[S] = gx), g || (g = !0, m = hl(E.error) ? E.error.status : 500), E.headers && (p[S] = E.headers);
    } else
      d[S] = E.data, E.statusCode && E.statusCode !== 200 && !g && (m = E.statusCode), E.headers && (p[S] = E.headers);
  }), b !== void 0 && i && (h = { [i[0]]: b }, i[2] && (d[i[2]] = void 0)), {
    loaderData: d,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Ey(t, a, i, l, o, d) {
  let { loaderData: h, errors: m } = eN(
    a,
    i,
    l
  );
  return o.filter((g) => !g.matches || g.matches.some((p) => p.shouldLoad)).forEach((g) => {
    let { key: p, match: b, controller: v } = g;
    if (v && v.signal.aborted)
      return;
    let S = d[p];
    if (Ie(S, "Did not find corresponding fetcher result"), An(S)) {
      let E = gr(t.matches, b?.route.id);
      m && m[E.route.id] || (m = {
        ...m,
        [E.route.id]: S.error
      }), t.fetchers.delete(p);
    } else if (Yr(S))
      Ie(!1, "Unhandled fetcher revalidation redirect");
    else {
      let E = ka(S.data);
      t.fetchers.set(p, E);
    }
  }), { loaderData: h, errors: m };
}
function jy(t, a, i, l) {
  let o = Object.entries(a).filter(([, d]) => d !== gx).reduce((d, [h, m]) => (d[h] = m, d), {});
  for (let d of i) {
    let h = d.route.id;
    if (!a.hasOwnProperty(h) && t.hasOwnProperty(h) && d.route.loader && (o[h] = t[h]), l && l.hasOwnProperty(h))
      break;
  }
  return o;
}
function Ny(t) {
  return t ? An(t[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [t[0]]: t[1].data
    }
  } : {};
}
function gr(t, a) {
  return (a ? t.slice(0, t.findIndex((l) => l.route.id === a) + 1) : [...t]).reverse().find((l) => l.route.hasErrorBoundary === !0) || t[0];
}
function Io(t) {
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
function Yn(t, {
  pathname: a,
  routeId: i,
  method: l,
  type: o,
  message: d
} = {}) {
  let h = "Unknown Server Error", m = "Unknown @remix-run/router error";
  return t === 400 ? (h = "Bad Request", l && a && i ? m = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (h = "Method Not Allowed", l && a && i ? m = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (m = `Invalid request method "${l.toUpperCase()}"`)), new Dc(
    t || 500,
    h,
    new Error(m),
    !0
  );
}
function Fo(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, o] = a[i];
    if (Yr(o))
      return { key: l, result: o };
  }
}
function Nx(t) {
  let a = typeof t == "string" ? ia(t) : t;
  return pa({ ...a, hash: "" });
}
function tN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function nN(t) {
  return new Dc(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function aN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && rN(i)
  );
}
function rN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function iN(t) {
  return Ch(t.result) && px.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Yr(t) {
  return (t && t.type) === "redirect";
}
function Ty(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Ch(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function sN(t) {
  return px.has(t);
}
function lN(t) {
  return Ch(t) && sN(t.status) && t.headers.has("Location");
}
function oN(t) {
  return Bj.has(t.toUpperCase());
}
function cn(t) {
  return Lj.has(t.toUpperCase());
}
function Rh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function cc(t, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (t[t.length - 1].route.index && Rh(i || ""))
    return t[t.length - 1];
  let l = ux(t);
  return l[l.length - 1];
}
function Cy(t) {
  let { formMethod: a, formAction: i, formEncType: l, text: o, formData: d, json: h } = t;
  if (!(!a || !i || !l)) {
    if (o != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (d != null)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: d,
        json: void 0,
        text: void 0
      };
    if (h !== void 0)
      return {
        formMethod: a,
        formAction: i,
        formEncType: l,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function sf(t, a) {
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
function cN(t, a) {
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
function Ks(t, a) {
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
function uN(t, a) {
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
function ka(t) {
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
function dN(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      vx
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [o, d] of Object.entries(l || {}))
        d && Array.isArray(d) && a.set(o, new Set(d || []));
    }
  } catch {
  }
}
function fN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, o] of a)
      i[l] = [...o];
    try {
      t.sessionStorage.setItem(
        vx,
        JSON.stringify(i)
      );
    } catch (l) {
      Mt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function Ry() {
  let t, a, i = new Promise((l, o) => {
    t = async (d) => {
      l(d);
      try {
        await i;
      } catch {
      }
    }, a = async (d) => {
      o(d);
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
var Tx = y.createContext(!1);
function Cx() {
  return y.useContext(Tx);
}
var _h = y.createContext({
  isTransitioning: !1
});
_h.displayName = "ViewTransition";
var Rx = y.createContext(
  /* @__PURE__ */ new Map()
);
Rx.displayName = "Fetchers";
var hN = y.createContext(null);
hN.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var zc = y.createContext(
  null
);
zc.displayName = "Location";
var Ba = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Ba.displayName = "Route";
var Mh = y.createContext(null);
Mh.displayName = "RouteError";
var _x = "REACT_ROUTER_ERROR", mN = "REDIRECT", pN = "ROUTE_ERROR_RESPONSE";
function vN(t) {
  if (t.startsWith(`${_x}:${mN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function gN(t) {
  if (t.startsWith(
    `${_x}:${pN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Dc(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function yN(t, { relative: a } = {}) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = y.useContext(Qn), { hash: o, pathname: d, search: h } = jl(t, { relative: a }), m = d;
  return i !== "/" && (m = d === "/" ? i : Gn([i, d])), l.createHref({ pathname: m, search: h, hash: o });
}
function wl() {
  return y.useContext(zc) != null;
}
function Va() {
  return Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(zc).location;
}
var Mx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ax(t) {
  y.useContext(Qn).static || y.useLayoutEffect(t);
}
function El() {
  let { isDataRoute: t } = y.useContext(Ba);
  return t ? MN() : bN();
}
function bN() {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: l } = y.useContext(Ba), { pathname: o } = Va(), d = JSON.stringify(jh(l)), h = y.useRef(!1);
  return Ax(() => {
    h.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (Mt(h.current, Mx), !h.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = Ac(
        g,
        JSON.parse(d),
        o,
        p.relative === "path"
      );
      t == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Gn([a, b.pathname])), (p.replace ? i.replace : i.push)(
        b,
        p.state,
        p
      );
    },
    [
      a,
      i,
      d,
      o,
      t
    ]
  );
}
y.createContext(null);
function jl(t, { relative: a } = {}) {
  let { matches: i } = y.useContext(Ba), { pathname: l } = Va(), o = JSON.stringify(jh(i));
  return y.useMemo(
    () => Ac(
      t,
      JSON.parse(o),
      l,
      a === "path"
    ),
    [t, o, l, a]
  );
}
function xN(t, a, i) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(Qn), { matches: o } = y.useContext(Ba), d = o[o.length - 1], h = d ? d.params : {}, m = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", p = d && d.route;
  {
    let R = p && p.path || "";
    Ox(
      m,
      !p || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`
    );
  }
  let b = Va(), v;
  v = b;
  let S = v.pathname || "/", E = S;
  if (g !== "/") {
    let R = g.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let w = vr(t, { pathname: E });
  return Mt(
    p || w != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), Mt(
    w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), NN(
    w && w.map(
      (R) => Object.assign({}, R, {
        params: Object.assign({}, h, R.params),
        pathname: Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathname
        ]),
        pathnameBase: R.pathnameBase === "/" ? g : Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            R.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : R.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function SN() {
  let t = _N(), a = hl(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: l }, d = { padding: "2px 4px", backgroundColor: l }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: d }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: d }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var wN = /* @__PURE__ */ y.createElement(SN, null), Dx = class extends y.Component {
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
      const i = gN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement(Ba.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Mh.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(EN, { error: t }, a) : a;
  }
};
Dx.contextType = Tx;
var lf = /* @__PURE__ */ new WeakMap();
function EN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = vN(a.digest);
    if (l) {
      let o = lf.get(a);
      if (o) throw o;
      let d = fx(l.location, i);
      if (dx && !lf.get(a))
        if (d.isExternal || l.reloadDocument)
          window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(d.to, {
              replace: l.replace
            })
          );
          throw lf.set(a, h), h;
        }
      return /* @__PURE__ */ y.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${d.absoluteURL || d.to}`
        }
      );
    }
  }
  return t;
}
function jN({ routeContext: t, match: a, children: i }) {
  let l = y.useContext(Wr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement(Ba.Provider, { value: t }, i);
}
function NN(t, a = [], i) {
  let l = i?.state;
  if (t == null) {
    if (!l)
      return null;
    if (l.errors)
      t = l.matches;
    else if (a.length === 0 && !l.initialized && l.matches.length > 0)
      t = l.matches;
    else
      return null;
  }
  let o = t, d = l?.errors;
  if (d != null) {
    let b = o.findIndex(
      (v) => v.route.id && d?.[v.route.id] !== void 0
    );
    Ie(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        d
      ).join(",")}`
    ), o = o.slice(
      0,
      Math.min(o.length, b + 1)
    );
  }
  let h = !1, m = -1;
  if (i && l) {
    h = l.renderFallback;
    for (let b = 0; b < o.length; b++) {
      let v = o[b];
      if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = b), v.route.id) {
        let { loaderData: S, errors: E } = l, w = v.route.loader && !S.hasOwnProperty(v.route.id) && (!E || E[v.route.id] === void 0);
        if (v.route.lazy || w) {
          i.isStatic && (h = !0), m >= 0 ? o = o.slice(0, m + 1) : o = [o[0]];
          break;
        }
      }
    }
  }
  let g = i?.onError, p = l && g ? (b, v) => {
    g(b, {
      location: l.location,
      params: l.matches?.[0]?.params ?? {},
      unstable_pattern: xl(l.matches),
      errorInfo: v
    });
  } : void 0;
  return o.reduceRight(
    (b, v, S) => {
      let E, w = !1, N = null, R = null;
      l && (E = d && v.route.id ? d[v.route.id] : void 0, N = v.route.errorElement || wN, h && (m < 0 && S === 0 ? (Ox(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), w = !0, R = null) : m === S && (w = !0, R = v.route.hydrateFallbackElement || null)));
      let T = a.concat(o.slice(0, S + 1)), k = () => {
        let z;
        return E ? z = N : w ? z = R : v.route.Component ? z = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? z = v.route.element : z = b, /* @__PURE__ */ y.createElement(
          jN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: T,
              isDataRoute: l != null
            },
            children: z
          }
        );
      };
      return l && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        Dx,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: N,
          error: E,
          children: k(),
          routeContext: { outlet: null, matches: T, isDataRoute: !0 },
          onError: p
        }
      ) : k();
    },
    null
  );
}
function Ah(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function TN(t) {
  let a = y.useContext(Wr);
  return Ie(a, Ah(t)), a;
}
function zx(t) {
  let a = y.useContext(Sl);
  return Ie(a, Ah(t)), a;
}
function CN(t) {
  let a = y.useContext(Ba);
  return Ie(a, Ah(t)), a;
}
function Oc(t) {
  let a = CN(t), i = a.matches[a.matches.length - 1];
  return Ie(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function RN() {
  return Oc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Nl() {
  let t = zx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = Oc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function _N() {
  let t = y.useContext(Mh), a = zx(
    "useRouteError"
    /* UseRouteError */
  ), i = Oc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function MN() {
  let { router: t } = TN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = Oc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return Ax(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, d = {}) => {
      Mt(i.current, Mx), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...d }));
    },
    [t, a]
  );
}
var _y = {};
function Ox(t, a, i) {
  !a && !_y[t] && (_y[t] = !0, Mt(!1, i));
}
var My = {};
function Ay(t, a) {
  !t && !My[a] && (My[a] = !0, console.warn(a));
}
var AN = "useOptimistic", Dy = PE[AN], DN = () => {
};
function zN(t) {
  return Dy ? Dy(t) : [t, DN];
}
function ON(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && Mt(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && Mt(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && Mt(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var kN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function LN(t, a) {
  return qj({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aj({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: kN,
    mapRouteProperties: ON,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var UN = class {
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
function BN({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: l
}) {
  l = Cx() || l;
  let [d, h] = y.useState(t.state), [m, g] = zN(d), [p, b] = y.useState(), [v, S] = y.useState({
    isTransitioning: !1
  }), [E, w] = y.useState(), [N, R] = y.useState(), [T, k] = y.useState(), z = y.useRef(/* @__PURE__ */ new Map()), M = y.useCallback(
    (q, { deletedFetchers: F, newErrors: ie, flushSync: re, viewTransitionOpts: te }) => {
      ie && i && Object.values(ie).forEach(
        (W) => i(W, {
          location: q.location,
          params: q.matches[0]?.params ?? {},
          unstable_pattern: xl(q.matches)
        })
      ), q.fetchers.forEach((W, O) => {
        W.data !== void 0 && z.current.set(O, W.data);
      }), F.forEach((W) => z.current.delete(W)), Ay(
        re === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ce = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Ay(
        te == null || ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !te || !ce) {
        a && re ? a(() => h(q)) : l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && g((W) => zy(W, q)), h(q);
        });
        return;
      }
      if (a && re) {
        a(() => {
          N && (E?.resolve(), N.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: te.currentLocation,
            nextLocation: te.nextLocation
          });
        });
        let W = t.window.document.startViewTransition(() => {
          a(() => h(q));
        });
        W.finished.finally(() => {
          a(() => {
            w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => R(W));
        return;
      }
      N ? (E?.resolve(), N.skipTransition(), k({
        state: q,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      })) : (b(q), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      }));
    },
    [
      t.window,
      a,
      N,
      E,
      l,
      g,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(M), [t, M]);
  let I = m.initialized;
  y.useLayoutEffect(() => {
    !I && t.state.initialized && M(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [I, M, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && w(new UN());
  }, [v]), y.useEffect(() => {
    if (E && p && t.window) {
      let q = p, F = E.promise, ie = t.window.document.startViewTransition(async () => {
        l === !1 ? h(q) : y.startTransition(() => {
          l === !0 && g((re) => zy(re, q)), h(q);
        }), await F;
      });
      ie.finished.finally(() => {
        w(void 0), R(void 0), b(void 0), S({ isTransitioning: !1 });
      }), R(ie);
    }
  }, [
    p,
    E,
    t.window,
    l,
    g
  ]), y.useEffect(() => {
    E && p && m.location.key === p.location.key && E.resolve();
  }, [E, N, m.location, p]), y.useEffect(() => {
    !v.isTransitioning && T && (b(T.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: T.currentLocation,
      nextLocation: T.nextLocation
    }), k(void 0));
  }, [v.isTransitioning, T]);
  let J = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (q) => t.navigate(q),
    push: (q, F, ie) => t.navigate(q, {
      state: F,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (q, F, ie) => t.navigate(q, {
      replace: !0,
      state: F,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [t]), ne = t.basename || "/", A = y.useMemo(
    () => ({
      router: t,
      navigator: J,
      static: !1,
      basename: ne,
      onError: i
    }),
    [t, J, ne, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: A }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ y.createElement(Rx.Provider, { value: z.current }, /* @__PURE__ */ y.createElement(_h.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    HN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: J,
      unstable_useTransitions: l
    },
    /* @__PURE__ */ y.createElement(
      VN,
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
function zy(t, a) {
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
var VN = y.memo($N);
function $N({
  routes: t,
  future: a,
  state: i,
  isStatic: l,
  onError: o
}) {
  return xN(t, void 0, { state: i, isStatic: l, onError: o });
}
function HN({
  basename: t = "/",
  children: a = null,
  location: i,
  navigationType: l = "POP",
  navigator: o,
  static: d = !1,
  unstable_useTransitions: h
}) {
  Ie(
    !wl(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = t.replace(/^\/*/, "/"), g = y.useMemo(
    () => ({
      basename: m,
      navigator: o,
      static: d,
      unstable_useTransitions: h,
      future: {}
    }),
    [m, o, d, h]
  );
  typeof i == "string" && (i = ia(i));
  let {
    pathname: p = "/",
    search: b = "",
    hash: v = "",
    state: S = null,
    key: E = "default",
    unstable_mask: w
  } = i, N = y.useMemo(() => {
    let R = Kn(p, m);
    return R == null ? null : {
      location: {
        pathname: R,
        search: b,
        hash: v,
        state: S,
        key: E,
        unstable_mask: w
      },
      navigationType: l
    };
  }, [
    m,
    p,
    b,
    v,
    S,
    E,
    l,
    w
  ]);
  return Mt(
    N != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), N == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: g }, /* @__PURE__ */ y.createElement(zc.Provider, { children: a, value: N }));
}
var uc = "get", dc = "application/x-www-form-urlencoded";
function kc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function qN(t) {
  return kc(t) && t.tagName.toLowerCase() === "button";
}
function IN(t) {
  return kc(t) && t.tagName.toLowerCase() === "form";
}
function FN(t) {
  return kc(t) && t.tagName.toLowerCase() === "input";
}
function YN(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function GN(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !YN(t);
}
var Yo = null;
function XN() {
  if (Yo === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Yo = !1;
    } catch {
      Yo = !0;
    }
  return Yo;
}
var PN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function of(t) {
  return t != null && !PN.has(t) ? (Mt(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${dc}"`
  ), null) : t;
}
function KN(t, a) {
  let i, l, o, d, h;
  if (IN(t)) {
    let m = t.getAttribute("action");
    l = m ? Kn(m, a) : null, i = t.getAttribute("method") || uc, o = of(t.getAttribute("enctype")) || dc, d = new FormData(t);
  } else if (qN(t) || FN(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || m.getAttribute("action");
    if (l = g ? Kn(g, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || uc, o = of(t.getAttribute("formenctype")) || of(m.getAttribute("enctype")) || dc, d = new FormData(m, t), !XN()) {
      let { name: p, type: b, value: v } = t;
      if (b === "image") {
        let S = p ? `${p}.` : "";
        d.append(`${S}x`, "0"), d.append(`${S}y`, "0");
      } else p && d.append(p, v);
    }
  } else {
    if (kc(t))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    i = uc, l = null, o = dc, h = t;
  }
  return d && o === "text/plain" && (h = d, d = void 0), { action: l, method: i.toLowerCase(), encType: o, formData: d, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Dh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function kx(t, a, i, l) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${l}` : o.pathname = `${o.pathname}.${l}` : o.pathname === "/" ? o.pathname = `_root.${l}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${yc(a)}/_root.${l}` : o.pathname = `${yc(o.pathname)}.${l}`, o;
}
async function QN(t, a) {
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
function ZN(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function JN(t, a, i) {
  let l = await Promise.all(
    t.map(async (o) => {
      let d = a.routes[o.route.id];
      if (d) {
        let h = await QN(d, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return nT(
    l.flat(1).filter(ZN).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
      (o) => o.rel === "stylesheet" ? { ...o, rel: "prefetch", as: "style" } : { ...o, rel: "prefetch" }
    )
  );
}
function Oy(t, a, i, l, o, d) {
  let h = (g, p) => i[p] ? g.route.id !== i[p].route.id : !0, m = (g, p) => (
    // param change, /users/123 -> /users/456
    i[p].pathname !== g.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    i[p].route.path?.endsWith("*") && i[p].params["*"] !== g.params["*"]
  );
  return d === "assets" ? a.filter(
    (g, p) => h(g, p) || m(g, p)
  ) : d === "data" ? a.filter((g, p) => {
    let b = l.routes[g.route.id];
    if (!b || !b.hasLoader)
      return !1;
    if (h(g, p) || m(g, p))
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
function WN(t, a, { includeHydrateFallback: i } = {}) {
  return eT(
    t.map((l) => {
      let o = a.routes[l.route.id];
      if (!o) return [];
      let d = [o.module];
      return o.clientActionModule && (d = d.concat(o.clientActionModule)), o.clientLoaderModule && (d = d.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (d = d.concat(o.hydrateFallbackModule)), o.imports && (d = d.concat(o.imports)), d;
    }).flat(1)
  );
}
function eT(t) {
  return [...new Set(t)];
}
function tT(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let l of i)
    a[l] = t[l];
  return a;
}
function nT(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, o) => {
    let d = JSON.stringify(tT(o));
    return i.has(d) || (i.add(d), l.push({ key: d, link: o })), l;
  }, []);
}
function zh() {
  let t = y.useContext(Wr);
  return Dh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function aT() {
  let t = y.useContext(Sl);
  return Dh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Oh = y.createContext(void 0);
Oh.displayName = "FrameworkContext";
function kh() {
  let t = y.useContext(Oh);
  return Dh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function rT(t, a) {
  let i = y.useContext(Oh), [l, o] = y.useState(!1), [d, h] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && h(!0), t === "viewport") {
      let N = (T) => {
        T.forEach((k) => {
          h(k.isIntersecting);
        });
      }, R = new IntersectionObserver(N, { threshold: 0.5 });
      return S.current && R.observe(S.current), () => {
        R.disconnect();
      };
    }
  }, [t]), y.useEffect(() => {
    if (l) {
      let N = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(N);
      };
    }
  }, [l]);
  let E = () => {
    o(!0);
  }, w = () => {
    o(!1), h(!1);
  };
  return i ? t !== "intent" ? [d, S, {}] : [
    d,
    S,
    {
      onFocus: Qs(m, E),
      onBlur: Qs(g, w),
      onMouseEnter: Qs(p, E),
      onMouseLeave: Qs(b, w),
      onTouchStart: Qs(v, E)
    }
  ] : [!1, S, {}];
}
function Qs(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function iT({ page: t, ...a }) {
  let i = Cx(), { router: l } = zh(), o = y.useMemo(
    () => vr(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(lT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(oT, { page: t, matches: o, ...a }) : null;
}
function sT(t) {
  let { manifest: a, routeModules: i } = kh(), [l, o] = y.useState([]);
  return y.useEffect(() => {
    let d = !1;
    return JN(t, a, i).then(
      (h) => {
        d || o(h);
      }
    ), () => {
      d = !0;
    };
  }, [t, a, i]), l;
}
function lT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o } = kh(), { basename: d } = zh(), h = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let m = kx(
      t,
      d,
      o.unstable_trailingSlashAwareDataRequests,
      "rsc"
    ), g = !1, p = [];
    for (let b of a)
      typeof b.route.shouldRevalidate == "function" ? g = !0 : p.push(b.route.id);
    return g && p.length > 0 && m.searchParams.set("_routes", p.join(",")), [m.pathname + m.search];
  }, [
    d,
    o.unstable_trailingSlashAwareDataRequests,
    t,
    l,
    a
  ]);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, h.map((m) => /* @__PURE__ */ y.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...i })));
}
function oT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o, manifest: d, routeModules: h } = kh(), { basename: m } = zh(), { loaderData: g, matches: p } = aT(), b = y.useMemo(
    () => Oy(
      t,
      a,
      p,
      d,
      l,
      "data"
    ),
    [t, a, p, d, l]
  ), v = y.useMemo(
    () => Oy(
      t,
      a,
      p,
      d,
      l,
      "assets"
    ),
    [t, a, p, d, l]
  ), S = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let N = /* @__PURE__ */ new Set(), R = !1;
    if (a.forEach((k) => {
      let z = d.routes[k.route.id];
      !z || !z.hasLoader || (!b.some((M) => M.route.id === k.route.id) && k.route.id in g && h[k.route.id]?.shouldRevalidate || z.hasClientLoader ? R = !0 : N.add(k.route.id));
    }), N.size === 0)
      return [];
    let T = kx(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return R && N.size > 0 && T.searchParams.set(
      "_routes",
      a.filter((k) => N.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [T.pathname + T.search];
  }, [
    m,
    o.unstable_trailingSlashAwareDataRequests,
    g,
    l,
    d,
    b,
    a,
    t,
    h
  ]), E = y.useMemo(
    () => WN(v, d),
    [v, d]
  ), w = sT(v);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, S.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "prefetch", as: "fetch", href: N, ...i })), E.map((N) => /* @__PURE__ */ y.createElement("link", { key: N, rel: "modulepreload", href: N, ...i })), w.map(({ key: N, link: R }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: N,
        nonce: i.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function cT(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var uT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  uT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var Lx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Lh = y.forwardRef(
  function({
    onClick: a,
    discover: i = "render",
    prefetch: l = "none",
    relative: o,
    reloadDocument: d,
    replace: h,
    unstable_mask: m,
    state: g,
    target: p,
    to: b,
    preventScrollReset: v,
    viewTransition: S,
    unstable_defaultShouldRevalidate: E,
    ...w
  }, N) {
    let { basename: R, navigator: T, unstable_useTransitions: k } = y.useContext(Qn), z = typeof b == "string" && Lx.test(b), M = fx(b, R);
    b = M.to;
    let I = yN(b, { relative: o }), J = Va(), ne = null;
    if (m) {
      let W = Ac(
        m,
        [],
        J.unstable_mask ? J.unstable_mask.pathname : "/",
        !0
      );
      R !== "/" && (W.pathname = W.pathname === "/" ? R : Gn([R, W.pathname])), ne = T.createHref(W);
    }
    let [A, q, F] = rT(
      l,
      w
    ), ie = mT(b, {
      replace: h,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: E,
      unstable_useTransitions: k
    });
    function re(W) {
      a && a(W), W.defaultPrevented || ie(W);
    }
    let te = !(M.isExternal || d), ce = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...w,
          ...F,
          href: (te ? ne : void 0) || M.absoluteURL || I,
          onClick: te ? re : a,
          ref: cT(N, q),
          target: p,
          "data-discover": !z && i === "render" ? "true" : void 0
        }
      )
    );
    return A && !z ? /* @__PURE__ */ y.createElement(y.Fragment, null, ce, /* @__PURE__ */ y.createElement(iT, { page: I })) : ce;
  }
);
Lh.displayName = "Link";
var dT = y.forwardRef(
  function({
    "aria-current": a = "page",
    caseSensitive: i = !1,
    className: l = "",
    end: o = !1,
    style: d,
    to: h,
    viewTransition: m,
    children: g,
    ...p
  }, b) {
    let v = jl(h, { relative: p.relative }), S = Va(), E = y.useContext(Sl), { navigator: w, basename: N } = y.useContext(Qn), R = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bT(v) && m === !0, T = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname, k = S.pathname, z = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    i || (k = k.toLowerCase(), z = z ? z.toLowerCase() : null, T = T.toLowerCase()), z && N && (z = Kn(z, N) || z);
    const M = T !== "/" && T.endsWith("/") ? T.length - 1 : T.length;
    let I = k === T || !o && k.startsWith(T) && k.charAt(M) === "/", J = z != null && (z === T || !o && z.startsWith(T) && z.charAt(T.length) === "/"), ne = {
      isActive: I,
      isPending: J,
      isTransitioning: R
    }, A = I ? a : void 0, q;
    typeof l == "function" ? q = l(ne) : q = [
      l,
      I ? "active" : null,
      J ? "pending" : null,
      R ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let F = typeof d == "function" ? d(ne) : d;
    return /* @__PURE__ */ y.createElement(
      Lh,
      {
        ...p,
        "aria-current": A,
        className: q,
        ref: b,
        style: F,
        to: h,
        viewTransition: m
      },
      typeof g == "function" ? g(ne) : g
    );
  }
);
dT.displayName = "NavLink";
var fT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: o,
    state: d,
    method: h = uc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...E
  }, w) => {
    let { unstable_useTransitions: N } = y.useContext(Qn), R = gT(), T = yT(m, { relative: p }), k = h.toLowerCase() === "get" ? "get" : "post", z = typeof m == "string" && Lx.test(m), M = (I) => {
      if (g && g(I), I.defaultPrevented) return;
      I.preventDefault();
      let J = I.nativeEvent.submitter, ne = J?.getAttribute("formmethod") || h, A = () => R(J || I.currentTarget, {
        fetcherKey: a,
        method: ne,
        navigate: i,
        replace: o,
        state: d,
        relative: p,
        preventScrollReset: b,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S
      });
      N && i !== !1 ? y.startTransition(() => A()) : A();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: w,
        method: k,
        action: T,
        onSubmit: l ? g : M,
        ...E,
        "data-discover": !z && t === "render" ? "true" : void 0
      }
    );
  }
);
fT.displayName = "Form";
function hT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ux(t) {
  let a = y.useContext(Wr);
  return Ie(a, hT(t)), a;
}
function mT(t, {
  target: a,
  replace: i,
  unstable_mask: l,
  state: o,
  preventScrollReset: d,
  relative: h,
  viewTransition: m,
  unstable_defaultShouldRevalidate: g,
  unstable_useTransitions: p
} = {}) {
  let b = El(), v = Va(), S = jl(t, { relative: h });
  return y.useCallback(
    (E) => {
      if (GN(E, a)) {
        E.preventDefault();
        let w = i !== void 0 ? i : pa(v) === pa(S), N = () => b(t, {
          replace: w,
          unstable_mask: l,
          state: o,
          preventScrollReset: d,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: g
        });
        p ? y.startTransition(() => N()) : N();
      }
    },
    [
      v,
      b,
      S,
      i,
      l,
      o,
      a,
      t,
      d,
      h,
      m,
      g,
      p
    ]
  );
}
var pT = 0, vT = () => `__${String(++pT)}__`;
function gT() {
  let { router: t } = Ux(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = RN(), l = t.fetch, o = t.navigate;
  return y.useCallback(
    async (d, h = {}) => {
      let { action: m, method: g, encType: p, formData: b, body: v } = KN(
        d,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || vT();
        await l(S, i, h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || p,
          flushSync: h.flushSync
        });
      } else
        await o(h.action || m, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: v,
          formMethod: h.method || g,
          formEncType: h.encType || p,
          replace: h.replace,
          state: h.state,
          fromRouteId: i,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition
        });
    },
    [l, o, a, i]
  );
}
function yT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), l = y.useContext(Ba);
  Ie(l, "useFormAction must be used inside a RouteContext");
  let [o] = l.matches.slice(-1), d = { ...jl(t || ".", { relative: a }) }, h = Va();
  if (t == null) {
    d.search = h.search;
    let m = new URLSearchParams(d.search), g = m.getAll("index");
    if (g.some((b) => b === "")) {
      m.delete("index"), g.filter((v) => v).forEach((v) => m.append("index", v));
      let b = m.toString();
      d.search = b ? `?${b}` : "";
    }
  }
  return (!t || t === ".") && o.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), i !== "/" && (d.pathname = d.pathname === "/" ? i : Gn([i, d.pathname])), pa(d);
}
function bT(t, { relative: a } = {}) {
  let i = y.useContext(_h);
  Ie(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Ux(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = jl(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let d = Kn(i.currentLocation.pathname, l) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return gc(o.pathname, h) != null || gc(o.pathname, d) != null;
}
class Wi extends Error {
  constructor(a, i, l, o) {
    super(l), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const $a = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(t, a) {
  const i = t.startsWith("http") ? t : `${$a}${t}`, l = await fetch(i, {
    ...a,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...a?.headers ?? {}
    }
  });
  if (!l.ok) {
    let o = null;
    try {
      o = await l.json();
    } catch {
      o = null;
    }
    throw new Wi(
      l.status,
      o?.category ?? "unknown",
      o?.message ?? l.statusText,
      o?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function xT(t, a, i) {
  const l = t.startsWith("http") ? t : `${$a}${t}`, o = new EventSource(l);
  return o.onmessage = (d) => {
    if (d.data)
      try {
        a(JSON.parse(d.data));
      } catch {
      }
  }, o.onerror = (d) => {
    i?.(d);
  }, () => o.close();
}
async function ST() {
  return ht("/deployments");
}
async function ky(t) {
  return ht(`/deployments/${t}`);
}
async function wT(t, a) {
  return ht(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Ly(t) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Uh(t, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function cl(t, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Bx(t, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function ET(t) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function jT(t, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function NT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const l = i.toString(), o = l ? `?${l}` : "";
  return ht(`/deployments/${t}/runs${o}`);
}
async function TT(t, a) {
  return ht(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function Bh(t, a) {
  return ht(`/deployments/${t}/runs/${a}`);
}
async function CT(t, a) {
  return ht(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function Vx(t, a) {
  return ht(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function RT(t, a) {
  return ht(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function Uy(t, a, i, l) {
  return xT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    l
  );
}
async function ml(t) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function bc(t, a, i, l, o) {
  const d = new FormData();
  d.append("deploymentId", t), d.append("displayName", i), d.append("kind", l), d.append("audio", a);
  const h = await fetch(`${$a}/voice-assets`, {
    method: "POST",
    body: d
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function _T(t, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function MT(t, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function AT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${$a}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function DT(t) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var zT = "mux0i60", OT = "mux0i61", kT = "mux0i62", LT = "mux0i63";
function Tl({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ u.jsxs("div", { className: zT, children: [
    /* @__PURE__ */ u.jsx("span", { className: OT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ u.jsx("h3", { className: kT, children: a }),
    i ? /* @__PURE__ */ u.jsx("p", { className: LT, children: i }) : null
  ] });
}
var UT = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, BT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, VT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, $T = "zwn3019";
function La({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: l = "section",
  children: o,
  className: d,
  style: h,
  ...m
}) {
  const g = [UT[t], VT[a], BT[i], d].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx(l, { className: g, style: h, "data-elevation": i, ...m, children: o });
}
function HT({ children: t, className: a }) {
  const i = [$T, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx("div", { className: i, children: t });
}
var Pr = "vrkn5p0", qT = "_93p6291", IT = "_93p6292", FT = "_93p6293", YT = "_93p6294", GT = "_93p6295", XT = "_93p6296", PT = "_93p6297", KT = "_93p6298", QT = "_93p6299", ZT = "_93p629a", JT = "_93p629b", WT = "_93p629c", eC = "_93p629d", tC = "_93p629e";
const nC = "nexus-host-navigate";
function aC(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function rC(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const i = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(nC, {
      detail: i
    })
  );
}
function iC() {
  const { deployments: t } = Nl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ u.jsxs("main", { className: qT, children: [
    /* @__PURE__ */ u.jsxs("header", { className: IT, children: [
      /* @__PURE__ */ u.jsx("p", { className: FT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ u.jsxs("h1", { className: YT, children: [
        "Direct your characters.",
        /* @__PURE__ */ u.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ u.jsx("p", { className: GT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ u.jsxs("p", { className: XT, children: [
        /* @__PURE__ */ u.jsx("span", { className: PT, children: t.length }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs(
      La,
      {
        density: "airy",
        elevation: "raised",
        className: KT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ u.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ u.jsx(
            Tl,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ u.jsx("ul", { className: QT, children: t.map((i) => /* @__PURE__ */ u.jsx("li", { children: /* @__PURE__ */ u.jsxs(
            "a",
            {
              href: aC(i.deploymentId),
              onClick: (l) => rC(l, i.deploymentId),
              className: ZT,
              children: [
                /* @__PURE__ */ u.jsx("span", { className: JT, "aria-hidden": "true", children: sC(i.displayName) }),
                /* @__PURE__ */ u.jsxs("span", { children: [
                  /* @__PURE__ */ u.jsx("span", { className: WT, children: i.displayName }),
                  /* @__PURE__ */ u.jsx("span", { className: eC, children: i.deploymentId })
                ] }),
                /* @__PURE__ */ u.jsx("span", { className: tC, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function sC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Vh = ix();
const lC = /* @__PURE__ */ rx(Vh);
function oC(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const cC = (t) => {
  switch (t) {
    case "success":
      return fC;
    case "info":
      return mC;
    case "warning":
      return hC;
    case "error":
      return pC;
    default:
      return null;
  }
}, uC = Array(12).fill(0), dC = ({ visible: t, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, uC.map((i, l) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), fC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), hC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), mC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), pC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ me.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ me.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})), gC = () => {
  const [t, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Kf = 1;
class yC {
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
      const { message: l, ...o } = a, d = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Kf++, h = this.toasts.find((g) => g.id === d), m = a.dismissible === void 0 ? !0 : a.dismissible;
      return this.dismissedToasts.has(d) && this.dismissedToasts.delete(d), h ? this.toasts = this.toasts.map((g) => g.id === d ? (this.publish({
        ...g,
        ...a,
        id: d,
        title: l
      }), {
        ...g,
        ...a,
        id: d,
        dismissible: m,
        title: l
      }) : g) : this.addToast({
        title: l,
        ...o,
        dismissible: m,
        id: d
      }), d;
    }, this.dismiss = (a) => (a ? (this.dismissedToasts.add(a), requestAnimationFrame(() => this.subscribers.forEach((i) => i({
      id: a,
      dismiss: !0
    })))) : this.toasts.forEach((i) => {
      this.subscribers.forEach((l) => l({
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
      let l;
      i.loading !== void 0 && (l = this.create({
        ...i,
        promise: a,
        type: "loading",
        message: i.loading,
        description: typeof i.description != "function" ? i.description : void 0
      }));
      const o = Promise.resolve(a instanceof Function ? a() : a);
      let d = l !== void 0, h;
      const m = o.then(async (p) => {
        if (h = [
          "resolve",
          p
        ], me.isValidElement(p))
          d = !1, this.create({
            id: l,
            type: "default",
            message: p
          });
        else if (xC(p) && !p.ok) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (p instanceof Error) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...w
          });
        } else if (i.success !== void 0) {
          d = !1;
          const v = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "success",
            description: S,
            ...w
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], i.error !== void 0) {
          d = !1;
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, E = typeof b == "object" && !me.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...E
          });
        }
      }).finally(() => {
        d && (this.dismiss(l), l = void 0), i.finally == null || i.finally.call(i);
      }), g = () => new Promise((p, b) => m.then(() => h[0] === "reject" ? b(h[1]) : p(h[1])).catch(b));
      return typeof l != "string" && typeof l != "number" ? {
        unwrap: g
      } : Object.assign(l, {
        unwrap: g
      });
    }, this.custom = (a, i) => {
      const l = i?.id || Kf++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new yC(), bC = (t, a) => {
  const i = a?.id || Kf++;
  return xn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, xC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", SC = bC, wC = () => xn.toasts, EC = () => xn.getActiveToasts(), Zt = Object.assign(SC, {
  success: xn.success,
  info: xn.info,
  warning: xn.warning,
  error: xn.error,
  custom: xn.custom,
  message: xn.message,
  promise: xn.promise,
  dismiss: xn.dismiss,
  loading: xn.loading
}, {
  getHistory: wC,
  getToasts: EC
});
oC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Go(t) {
  return t.label !== void 0;
}
const jC = 3, NC = "24px", TC = "16px", By = 4e3, CC = 356, RC = 14, _C = 45, MC = 200;
function ma(...t) {
  return t.filter(Boolean).join(" ");
}
function AC(t) {
  const [a, i] = t.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const DC = (t) => {
  var a, i, l, o, d, h, m, g, p;
  const { invert: b, toast: v, unstyled: S, interacting: E, setHeights: w, visibleToasts: N, heights: R, index: T, toasts: k, expanded: z, removeToast: M, defaultRichColors: I, closeButton: J, style: ne, cancelButtonStyle: A, actionButtonStyle: q, className: F = "", descriptionClassName: ie = "", duration: re, position: te, gap: ce, expandByDefault: W, classNames: O, icons: C, closeButtonAriaLabel: U = "Close toast" } = t, [B, Q] = me.useState(null), [_, Z] = me.useState(null), [P, le] = me.useState(!1), [fe, ge] = me.useState(!1), [Ae, _e] = me.useState(!1), [$e, Jt] = me.useState(!1), [Pt, At] = me.useState(!1), [et, pt] = me.useState(0), [he, ke] = me.useState(0), De = me.useRef(v.duration || re || By), Te = me.useRef(null), bt = me.useRef(null), xt = T === 0, dn = T + 1 <= N, Ht = v.type, On = v.dismissible !== !1, qt = v.className || "", ye = v.descriptionClassName || "", ze = me.useMemo(() => R.findIndex((Oe) => Oe.toastId === v.id) || 0, [
    R,
    v.id
  ]), Qe = me.useMemo(() => {
    var Oe;
    return (Oe = v.closeButton) != null ? Oe : J;
  }, [
    v.closeButton,
    J
  ]), nt = me.useMemo(() => v.duration || re || By, [
    v.duration,
    re
  ]), It = me.useRef(0), Ft = me.useRef(0), jr = me.useRef(0), sa = me.useRef(null), [Zn, Wt] = te.split("-"), Tt = me.useMemo(() => R.reduce((Oe, ut, Dt) => Dt >= ze ? Oe : Oe + ut.height, 0), [
    R,
    ze
  ]), Yt = gC(), ei = v.invert || b, Ha = Ht === "loading";
  Ft.current = me.useMemo(() => ze * ce + Tt, [
    ze,
    Tt
  ]), me.useEffect(() => {
    De.current = nt;
  }, [
    nt
  ]), me.useEffect(() => {
    le(!0);
  }, []), me.useEffect(() => {
    const Oe = bt.current;
    if (Oe) {
      const ut = Oe.getBoundingClientRect().height;
      return ke(ut), w((Dt) => [
        {
          toastId: v.id,
          height: ut,
          position: v.position
        },
        ...Dt
      ]), () => w((Dt) => Dt.filter((Gt) => Gt.toastId !== v.id));
    }
  }, [
    w,
    v.id
  ]), me.useLayoutEffect(() => {
    if (!P) return;
    const Oe = bt.current, ut = Oe.style.height;
    Oe.style.height = "auto";
    const Dt = Oe.getBoundingClientRect().height;
    Oe.style.height = ut, ke(Dt), w((Gt) => Gt.find((it) => it.toastId === v.id) ? Gt.map((it) => it.toastId === v.id ? {
      ...it,
      height: Dt
    } : it) : [
      {
        toastId: v.id,
        height: Dt,
        position: v.position
      },
      ...Gt
    ]);
  }, [
    P,
    v.title,
    v.description,
    w,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const kn = me.useCallback(() => {
    ge(!0), pt(Ft.current), w((Oe) => Oe.filter((ut) => ut.toastId !== v.id)), setTimeout(() => {
      M(v);
    }, MC);
  }, [
    v,
    M,
    w,
    Ft
  ]);
  me.useEffect(() => {
    if (v.promise && Ht === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let Oe;
    return z || E || Yt ? (() => {
      if (jr.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      jr.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), Oe = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), kn();
      }, De.current));
    })(), () => clearTimeout(Oe);
  }, [
    z,
    E,
    v,
    Ht,
    Yt,
    kn
  ]), me.useEffect(() => {
    v.delete && (kn(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    kn,
    v.delete
  ]);
  function va() {
    var Oe;
    if (C?.loading) {
      var ut;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(O?.loader, v == null || (ut = v.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, C.loading);
    }
    return /* @__PURE__ */ me.createElement(dC, {
      className: ma(O?.loader, v == null || (Oe = v.classNames) == null ? void 0 : Oe.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = v.icon || C?.[Ht] || cC(Ht);
  var la, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(F, qt, O?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, O?.default, O?.[Ht], v == null || (i = v.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = v.richColors) != null ? la : I,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": P,
    "data-promise": !!v.promise,
    "data-swiped": Pt,
    "data-removed": fe,
    "data-visible": dn,
    "data-y-position": Zn,
    "data-x-position": Wt,
    "data-index": T,
    "data-front": xt,
    "data-swiping": Ae,
    "data-dismissible": On,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": $e,
    "data-swipe-direction": _,
    "data-expanded": !!(z || W && P),
    "data-testid": v.testId,
    style: {
      "--index": T,
      "--toasts-before": T,
      "--z-index": k.length - T,
      "--offset": `${fe ? et : Ft.current}px`,
      "--initial-height": W ? "auto" : `${he}px`,
      ...ne,
      ...v.style
    },
    onDragEnd: () => {
      _e(!1), Q(null), sa.current = null;
    },
    onPointerDown: (Oe) => {
      Oe.button !== 2 && (Ha || !On || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), Oe.target.setPointerCapture(Oe.pointerId), Oe.target.tagName !== "BUTTON" && (_e(!0), sa.current = {
        x: Oe.clientX,
        y: Oe.clientY
      })));
    },
    onPointerUp: () => {
      var Oe, ut, Dt;
      if ($e || !On) return;
      sa.current = null;
      const Gt = Number(((Oe = bt.current) == null ? void 0 : Oe.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ut = bt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), en = B === "x" ? Gt : wn, ga = Math.abs(en) / it;
      if (Math.abs(en) >= _C || ga > 0.11) {
        pt(Ft.current), v.onDismiss == null || v.onDismiss.call(v, v), Z(B === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), kn(), Jt(!0);
        return;
      } else {
        var sn, D;
        (sn = bt.current) == null || sn.style.setProperty("--swipe-amount-x", "0px"), (D = bt.current) == null || D.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), _e(!1), Q(null);
    },
    onPointerMove: (Oe) => {
      var ut, Dt, Gt;
      if (!sa.current || !On || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = Oe.clientY - sa.current.y, en = Oe.clientX - sa.current.x;
      var ga;
      const sn = (ga = t.swipeDirections) != null ? ga : AC(te);
      !B && (Math.abs(en) > 1 || Math.abs(it) > 1) && Q(Math.abs(en) > Math.abs(it) ? "x" : "y");
      let D = {
        x: 0,
        y: 0
      };
      const $ = (Y) => 1 / (1.5 + Math.abs(Y) / 20);
      if (B === "y") {
        if (sn.includes("top") || sn.includes("bottom"))
          if (sn.includes("top") && it < 0 || sn.includes("bottom") && it > 0)
            D.y = it;
          else {
            const Y = it * $(it);
            D.y = Math.abs(Y) < Math.abs(it) ? Y : it;
          }
      } else if (B === "x" && (sn.includes("left") || sn.includes("right")))
        if (sn.includes("left") && en < 0 || sn.includes("right") && en > 0)
          D.x = en;
        else {
          const Y = en * $(en);
          D.x = Math.abs(Y) < Math.abs(en) ? Y : en;
        }
      (Math.abs(D.x) > 0 || Math.abs(D.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${D.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${D.y}px`);
    }
  }, Qe && !v.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": U,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !On ? () => {
    } : () => {
      kn(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ma(O?.closeButton, v == null || (l = v.classNames) == null ? void 0 : l.closeButton)
  }, (hn = C?.close) != null ? hn : vC) : null, (Ht || v.icon || v.promise) && v.icon !== null && (C?.[Ht] !== null || v.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(O?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || va() : null, v.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(O?.content, v == null || (d = v.classNames) == null ? void 0 : d.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(O?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(ie, ye, O?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ me.isValidElement(v.cancel) ? v.cancel : v.cancel && Go(v.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || A,
    onClick: (Oe) => {
      Go(v.cancel) && On && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, Oe), kn());
    },
    className: ma(O?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ me.isValidElement(v.action) ? v.action : v.action && Go(v.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || q,
    onClick: (Oe) => {
      Go(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, Oe), !Oe.defaultPrevented && kn());
    },
    className: ma(O?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Vy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function zC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((l, o) => {
    const d = o === 1, h = d ? "--mobile-offset" : "--offset", m = d ? TC : NC;
    function g(p) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((b) => {
        i[`${h}-${b}`] = typeof p == "number" ? `${p}px` : p;
      });
    }
    typeof l == "number" || typeof l == "string" ? g(l) : typeof l == "object" ? [
      "top",
      "right",
      "bottom",
      "left"
    ].forEach((p) => {
      l[p] === void 0 ? i[`${h}-${p}`] = m : i[`${h}-${p}`] = typeof l[p] == "number" ? `${l[p]}px` : l[p];
    }) : g(m);
  }), i;
}
const OC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: l, invert: o, position: d = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: E, duration: w, style: N, visibleToasts: R = jC, toastOptions: T, dir: k = Vy(), gap: z = RC, icons: M, containerAriaLabel: I = "Notifications" } = a, [J, ne] = me.useState([]), A = me.useMemo(() => l ? J.filter((P) => P.toasterId === l) : J.filter((P) => !P.toasterId), [
    J,
    l
  ]), q = me.useMemo(() => Array.from(new Set([
    d
  ].concat(A.filter((P) => P.position).map((P) => P.position)))), [
    A,
    d
  ]), [F, ie] = me.useState([]), [re, te] = me.useState(!1), [ce, W] = me.useState(!1), [O, C] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = me.useRef(null), B = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), Q = me.useRef(null), _ = me.useRef(!1), Z = me.useCallback((P) => {
    ne((le) => {
      var fe;
      return (fe = le.find((ge) => ge.id === P.id)) != null && fe.delete || xn.dismiss(P.id), le.filter(({ id: ge }) => ge !== P.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((P) => {
    if (P.dismiss) {
      requestAnimationFrame(() => {
        ne((le) => le.map((fe) => fe.id === P.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      lC.flushSync(() => {
        ne((le) => {
          const fe = le.findIndex((ge) => ge.id === P.id);
          return fe !== -1 ? [
            ...le.slice(0, fe),
            {
              ...le[fe],
              ...P
            },
            ...le.slice(fe + 1)
          ] : [
            P,
            ...le
          ];
        });
      });
    });
  }), [
    J
  ]), me.useEffect(() => {
    if (S !== "system") {
      C(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? C("dark") : C("light")), typeof window > "u") return;
    const P = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      P.addEventListener("change", ({ matches: le }) => {
        C(le ? "dark" : "light");
      });
    } catch {
      P.addListener(({ matches: fe }) => {
        try {
          C(fe ? "dark" : "light");
        } catch (ge) {
          console.error(ge);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    J.length <= 1 && te(!1);
  }, [
    J
  ]), me.useEffect(() => {
    const P = (le) => {
      var fe;
      if (h.every((_e) => le[_e] || le.code === _e)) {
        var Ae;
        te(!0), (Ae = U.current) == null || Ae.focus();
      }
      le.code === "Escape" && (document.activeElement === U.current || (fe = U.current) != null && fe.contains(document.activeElement)) && te(!1);
    };
    return document.addEventListener("keydown", P), () => document.removeEventListener("keydown", P);
  }, [
    h
  ]), me.useEffect(() => {
    if (U.current)
      return () => {
        Q.current && (Q.current.focus({
          preventScroll: !0
        }), Q.current = null, _.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${I} ${B}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, q.map((P, le) => {
    var fe;
    const [ge, Ae] = P.split("-");
    return A.length ? /* @__PURE__ */ me.createElement("ol", {
      key: P,
      dir: k === "auto" ? Vy() : k,
      tabIndex: -1,
      ref: U,
      className: p,
      "data-sonner-toaster": !0,
      "data-sonner-theme": O,
      "data-y-position": ge,
      "data-x-position": Ae,
      style: {
        "--front-toast-height": `${((fe = F[0]) == null ? void 0 : fe.height) || 0}px`,
        "--width": `${CC}px`,
        "--gap": `${z}px`,
        ...N,
        ...zC(b, v)
      },
      onBlur: (_e) => {
        _.current && !_e.currentTarget.contains(_e.relatedTarget) && (_.current = !1, Q.current && (Q.current.focus({
          preventScroll: !0
        }), Q.current = null));
      },
      onFocus: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || _.current || (_.current = !0, Q.current = _e.relatedTarget);
      },
      onMouseEnter: () => te(!0),
      onMouseMove: () => te(!0),
      onMouseLeave: () => {
        ce || te(!1);
      },
      onDragEnd: () => te(!1),
      onPointerDown: (_e) => {
        _e.target instanceof HTMLElement && _e.target.dataset.dismissible === "false" || W(!0);
      },
      onPointerUp: () => W(!1)
    }, A.filter((_e) => !_e.position && le === 0 || _e.position === P).map((_e, $e) => {
      var Jt, Pt;
      return /* @__PURE__ */ me.createElement(DC, {
        key: _e.id,
        icons: M,
        index: $e,
        toast: _e,
        defaultRichColors: E,
        duration: (Jt = T?.duration) != null ? Jt : w,
        className: T?.className,
        descriptionClassName: T?.descriptionClassName,
        invert: o,
        visibleToasts: R,
        closeButton: (Pt = T?.closeButton) != null ? Pt : g,
        interacting: ce,
        position: P,
        style: T?.style,
        unstyled: T?.unstyled,
        classNames: T?.classNames,
        cancelButtonStyle: T?.cancelButtonStyle,
        actionButtonStyle: T?.actionButtonStyle,
        closeButtonAriaLabel: T?.closeButtonAriaLabel,
        removeToast: Z,
        toasts: A.filter((At) => At.position == _e.position),
        heights: F.filter((At) => At.position == _e.position),
        setHeights: ie,
        expandByDefault: m,
        gap: z,
        expanded: re,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), $y = 32, Hy = -30, qy = -6, Iy = 0.5, Fy = 2, Yy = -24, Gy = 24, Xy = -12, Py = 12, Ky = -12, Qy = 12, Zy = -60, Jy = -20;
class Ki extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function $x(t, a, i, l = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, d = `${$a}${o}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ki(g, p);
  }
  if (!h.ok)
    throw new Error(await Lc(h, "apply"));
  return await h.json();
}
async function kC(t, a, i, l, o = {}) {
  const d = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${$a}${d}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Ki(p, b);
  }
  if (!m.ok)
    throw new Error(await Lc(m, "apply"));
  return await m.json();
}
async function LC(t, a, i = {}) {
  const l = `${$a}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(l, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function UC(t, a, i, l = {}) {
  const o = `${$a}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, d = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (!d.ok)
    throw new Error(await Lc(d, "preview"));
  return d.blob();
}
async function fc(t, a, i, l = 50, o = {}) {
  const d = `${$a}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(l))}`, h = await fetch(d, {
    method: "GET",
    headers: { accept: "application/json" },
    ...o.signal ? { signal: o.signal } : {}
  });
  if (!h.ok)
    throw new Error(await Lc(h, "audit fetch"));
  return await h.json();
}
function Sn() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}
function Hx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > $y)
    return {
      message: `Chain exceeds the maximum of ${$y} operations.`
    };
  for (const i of t.ops) {
    const l = BC(i, a);
    if (l) return l;
  }
  return null;
}
function BC(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return VC(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < Hy || t.target_lufs > qy ? {
        opId: t.id,
        message: `Normalize target must be between ${Hy} and ${qy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Iy || t.factor > Fy ? {
        opId: t.id,
        message: `Speed factor must be between ${Iy}× and ${Fy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Yy || t.gain_db > Gy ? {
        opId: t.id,
        message: `Volume must be between ${Yy} and ${Gy} dB.`
      } : null;
    case "eq3":
      for (const [i, l] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (l < Xy || l > Py)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Xy} and ${Py} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < Ky || t.semitones > Qy ? {
        opId: t.id,
        message: `Pitch must be between ${Ky} and ${Qy} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < Zy || t.threshold_db > Jy ? {
        opId: t.id,
        message: `Silence threshold must be between ${Zy} and ${Jy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function VC(t, a, i, l) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : l > 0 && i > l ? { opId: t, message: "End extends past source duration." } : null;
}
async function Lc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var $C = "g5r6d10", HC = "g5r6d11", qC = "g5r6d12", IC = "g5r6d13", FC = "g5r6d14", YC = "g5r6d15", GC = "g5r6d1a", XC = "g5r6d1b", PC = "g5r6d1c", KC = "g5r6d1d", QC = "g5r6d1e", ZC = "g5r6d1g", JC = "g5r6d1h", WC = "g5r6d1i", eR = "g5r6d1j", tR = "g5r6d1k", nR = "g5r6d1l", aR = "g5r6d1m", rR = "g5r6d1n", iR = "g5r6d1o", Wy = "g5r6d1p", sR = "g5r6d1q", lR = "g5r6d1r", oR = "g5r6d1s", e0 = "g5r6d1t", t0 = "g5r6d1u", cR = "g5r6d1v", uR = "g5r6d1w", Fi = "g5r6d1x", dR = "g5r6d1y", n0 = "g5r6d1z", fR = "g5r6d110", hR = "g5r6d111", fr = "g5r6d112", mR = "g5r6d117", pR = "a6ki8u0", vR = "a6ki8u1", gR = "a6ki8u2", yR = "a6ki8u3", bR = "a6ki8u4", xR = "a6ki8u5", SR = "a6ki8u6", cf = "a6ki8u7", wR = "a6ki8u8", ER = "a6ki8u9", jR = "a6ki8ua", NR = "a6ki8ub", TR = "a6ki8uc", CR = "a6ki8ud", RR = "a6ki8ue", _R = "a6ki8uf", MR = "a6ki8ug", AR = "a6ki8uh", DR = "_1lguv7x0", zR = "_1lguv7x1", OR = "_1lguv7x2", kR = "_1lguv7x3", LR = "_1lguv7x4", UR = "_1lguv7x5", BR = "_1lguv7x6", VR = "_1lguv7x7", $R = "_1lguv7x8", HR = "_1lguv7x9", qR = "_1lguv7xa", IR = "_1lguv7xb", FR = "_1lguv7xc", a0 = "_1lguv7xd", YR = "_1lguv7xe", GR = "_1lguv7xf", XR = "_1lguv7xg", PR = "_1lguv7xh", qx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Ix = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, KR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, QR = "_4ydn54f";
function Ve({
  variant: t = "primary",
  size: a = "md",
  type: i = "button",
  loading: l = !1,
  iconOnly: o = !1,
  disabled: d,
  children: h,
  className: m,
  style: g,
  ...p
}) {
  const b = [
    qx[t],
    Ix[a],
    o ? KR[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: l || d,
      "aria-busy": l || void 0,
      ...p,
      children: [
        l ? /* @__PURE__ */ u.jsx("span", { className: QR, "aria-hidden": "true" }) : null,
        h
      ]
    }
  );
}
const ZR = 28;
function JR(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function WR(t, a) {
  const i = new Array(a);
  let l = t;
  for (let o = 0; o < a; o++) {
    l = (l * 9301 + 49297) % 233280;
    const d = l / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + d * 0.68));
  }
  return i;
}
function e_(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function t_(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function n_({
  asset: t,
  presentation: a,
  usedBy: i,
  isPlaying: l,
  onTogglePlay: o,
  onRename: d,
  onCopyName: h,
  onDelete: m,
  onPlaybackEnded: g
}) {
  const [p, b] = y.useState(!1), [v, S] = y.useState(t.displayName), E = y.useRef(null), w = y.useMemo(() => JR(t.contentSha256), [t.contentSha256]), N = y.useMemo(() => WR(w, ZR), [w]), R = y.useMemo(() => AT(t), [t]);
  y.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const z = E.current;
    z && (l && R ? z.play().catch(() => {
    }) : (z.pause(), z.currentTime = 0));
  }, [l, R]);
  const T = async () => {
    const z = v.trim();
    if (!z || z === t.displayName) {
      b(!1), S(t.displayName);
      return;
    }
    try {
      await d(z);
    } finally {
      b(!1);
    }
  }, k = `${e_(t.durationMs)} · ${t_(t.sampleRate)}`;
  return /* @__PURE__ */ u.jsxs("article", { className: DR, "data-playing": l ? "true" : "false", children: [
    /* @__PURE__ */ u.jsxs("header", { className: zR, children: [
      /* @__PURE__ */ u.jsx("span", { className: OR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ u.jsxs("div", { className: kR, children: [
        p ? /* @__PURE__ */ u.jsx(
          "input",
          {
            className: UR,
            value: v,
            autoFocus: !0,
            onChange: (z) => S(z.target.value),
            onBlur: () => {
              T();
            },
            onKeyDown: (z) => {
              z.key === "Enter" ? (z.preventDefault(), z.currentTarget.blur()) : z.key === "Escape" && (b(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: LR,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ u.jsx("span", { className: BR, children: k })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: VR, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: $R,
        "data-playing": l ? "true" : "false",
        disabled: R == null,
        title: R ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": l ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ u.jsx("span", { className: HR, "aria-hidden": "true", children: l ? "❚❚" : "▶" }),
          /* @__PURE__ */ u.jsx("span", { className: qR, "aria-hidden": "true", children: N.map((z, M) => /* @__PURE__ */ u.jsx("span", { className: IR, style: { height: `${Math.round(z * 100)}%` } }, M)) })
        ]
      }
    ),
    /* @__PURE__ */ u.jsxs("footer", { className: FR, children: [
      i.length > 0 ? /* @__PURE__ */ u.jsxs("span", { className: a0, children: [
        /* @__PURE__ */ u.jsx("span", { children: "used by" }),
        i.map((z) => /* @__PURE__ */ u.jsx(
          "span",
          {
            className: YR,
            style: { color: z.color, borderColor: z.color },
            children: z.characterName
          },
          z.characterName
        ))
      ] }) : /* @__PURE__ */ u.jsx("span", { className: a0, children: "unassigned" }),
      /* @__PURE__ */ u.jsxs("span", { className: GR, children: [
        /* @__PURE__ */ u.jsx(
          Ve,
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
        /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            title: "Copy name",
            "aria-label": "Copy voice name",
            onClick: h,
            children: "⧉"
          }
        ),
        m && /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: XR,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    R && /* @__PURE__ */ u.jsx(
      "audio",
      {
        ref: E,
        src: R,
        preload: "none",
        className: PR,
        onEnded: g
      }
    )
  ] });
}
var a_ = "_17eol302", r_ = "_17eol303", i_ = "_17eol304", s_ = "_17eol305", l_ = "_17eol306", o_ = "_17eol307", Xo = "_17eol308", c_ = "_17eol309", u_ = "_17eol30a", d_ = "_17eol30b", f_ = "_17eol30c", h_ = "_17eol30d", r0 = "_17eol30e", m_ = "_17eol30g";
function p_() {
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
function v_(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function g_({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: l
}) {
  const [o, d] = y.useState("idle"), [h, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [S, E] = y.useState(a), [w, N] = y.useState(!1), R = y.useRef(null), T = y.useRef(null), k = y.useRef([]), z = y.useRef(0), M = y.useRef(null), I = y.useRef(null), J = y.useRef({ mime: "audio/webm", ext: "webm" }), ne = y.useRef(null), A = y.useRef(null), q = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return q.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ne.current?.scrollIntoView({ behavior: "smooth", block: "center" }), A.current?.focus();
      }), () => {
        q.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const C = (U) => {
      U.key === "Escape" && i();
    };
    return window.addEventListener("keydown", C), () => window.removeEventListener("keydown", C);
  }, [t, i]);
  const F = y.useCallback(
    (C) => {
      if (C.key !== "Tab") return;
      const U = ne.current;
      if (!U) return;
      const B = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (B.length === 0) return;
      const Q = B[0], _ = B[B.length - 1], Z = document.activeElement;
      C.shiftKey ? (Z === Q || Z === U) && (C.preventDefault(), _.focus()) : Z === _ && (C.preventDefault(), Q.focus());
    },
    []
  ), ie = y.useCallback(() => {
    if (T.current) {
      for (const C of T.current.getTracks()) C.stop();
      T.current = null;
    }
    M.current != null && (window.clearInterval(M.current), M.current = null);
  }, []), re = y.useCallback(() => {
    ie(), b && URL.revokeObjectURL(b), v(null), k.current = [], I.current = null, p(0), m(null), d("idle");
  }, [b, ie]);
  if (y.useEffect(() => {
    t || (re(), E(a));
  }, [t, a, re]), y.useEffect(() => () => {
    ie(), b && URL.revokeObjectURL(b);
  }, [b, ie]), !t) return null;
  const te = async () => {
    m(null), d("preparing");
    try {
      const C = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      T.current = C;
      const U = p_();
      J.current = U;
      const B = U.mime ? new MediaRecorder(C, { mimeType: U.mime }) : new MediaRecorder(C);
      R.current = B, k.current = [], B.ondataavailable = (Q) => {
        Q.data && Q.data.size > 0 && k.current.push(Q.data);
      }, B.onstop = () => {
        const Q = U.mime || "audio/webm", _ = new Blob(k.current, { type: Q }), Z = new File([_], `${S || a || "recording"}.${U.ext}`, {
          type: Q
        });
        I.current = Z;
        const P = URL.createObjectURL(_);
        v(P), d("ready"), ie();
      }, B.start(), z.current = Date.now(), p(0), M.current = window.setInterval(() => {
        p(Date.now() - z.current);
      }, 200), d("recording");
    } catch (C) {
      const U = C instanceof Error ? C.message : "could not access microphone";
      m(U), d(U.toLowerCase().includes("denied") ? "denied" : "error"), ie();
    }
  }, ce = () => {
    const C = R.current;
    C && C.state !== "inactive" && C.stop(), M.current != null && (window.clearInterval(M.current), M.current = null);
  }, W = async () => {
    const C = I.current;
    if (!C) return;
    const U = (S || a).trim();
    if (!U) {
      m("Name cannot be empty");
      return;
    }
    N(!0);
    try {
      await l(C, U), i();
    } catch (B) {
      m(B instanceof Error ? B.message : "upload failed");
    } finally {
      N(!1);
    }
  }, O = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ u.jsx("div", { className: a_, role: "presentation", onClick: i, children: /* @__PURE__ */ u.jsxs(
    "div",
    {
      ref: ne,
      className: r_,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (C) => C.stopPropagation(),
      onKeyDown: F,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ u.jsx("h2", { id: "mic-recorder-heading", className: i_, children: "Record reference audio" }),
        /* @__PURE__ */ u.jsx("p", { className: s_, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ u.jsx(
          "span",
          {
            className: l_,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: O
          }
        ),
        /* @__PURE__ */ u.jsx("div", { className: f_, "aria-live": "polite", children: v_(g) }),
        /* @__PURE__ */ u.jsxs("div", { className: o_, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ u.jsxs(
            "button",
            {
              ref: A,
              type: "button",
              className: Xo,
              "data-tone": "danger",
              onClick: () => {
                te();
              },
              children: [
                /* @__PURE__ */ u.jsx("span", { className: r0, "aria-hidden": "true" }),
                "Record"
              ]
            }
          ),
          o === "preparing" && /* @__PURE__ */ u.jsx("button", { type: "button", className: Xo, disabled: !0, children: "Starting…" }),
          o === "recording" && /* @__PURE__ */ u.jsxs(
            "button",
            {
              type: "button",
              className: Xo,
              "data-tone": "danger",
              "data-active": "true",
              onClick: ce,
              children: [
                /* @__PURE__ */ u.jsx("span", { className: r0, "aria-hidden": "true" }),
                "Stop"
              ]
            }
          ),
          o === "ready" && /* @__PURE__ */ u.jsx(
            "button",
            {
              type: "button",
              className: Xo,
              onClick: () => {
                re();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ u.jsx("audio", { className: h_, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ u.jsxs("label", { className: c_, children: [
          /* @__PURE__ */ u.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              className: u_,
              value: S,
              onChange: (C) => E(C.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ u.jsx("div", { className: d_, children: h }),
        /* @__PURE__ */ u.jsxs("div", { className: m_, children: [
          /* @__PURE__ */ u.jsx(Ve, { variant: "ghost", size: "md", onClick: i, disabled: w, children: "Cancel" }),
          /* @__PURE__ */ u.jsx(
            Ve,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                W();
              },
              disabled: o !== "ready" || w,
              loading: w,
              children: w ? "Saving…" : "Save voice"
            }
          )
        ] })
      ]
    }
  ) });
}
function y_({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: l,
  onVoiceAssetsChange: o
}) {
  const [d, h] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(!1), T = y.useRef(null), k = y.useCallback(
    (te) => "upload",
    []
  ), z = y.useMemo(() => {
    const te = d.trim().toLowerCase();
    return a.filter((ce) => {
      const W = k(ce);
      return !(m === "uploaded" && W !== "upload" || m === "preset" && W !== "preset" || te && !ce.displayName.toLowerCase().includes(te));
    });
  }, [a, d, m, k]), M = y.useMemo(
    () => a.filter((te) => k(te) === "upload").length,
    [a, k]
  ), I = y.useCallback(
    (te) => {
      const ce = [], W = /* @__PURE__ */ new Set();
      for (const O of i)
        O.speakerVoiceAssetId === te && (W.has(O.characterName) || (W.add(O.characterName), ce.push({
          characterName: O.characterName,
          // audit-allow: hex — neon decorative palette per design lang
          color: l[O.characterName] ?? "#ba9eff"
        })));
      return ce;
    },
    [i, l]
  ), J = y.useCallback(
    async (te) => {
      const ce = Array.from(te).slice(0, 8);
      if (ce.length !== 0) {
        R(!0);
        try {
          const W = [];
          for (const O of ce) {
            if (!O.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(O.name)) {
              Zt.error(`${O.name}: not an audio file`);
              continue;
            }
            const C = O.name.replace(/\.[^.]+$/, "");
            try {
              const U = await bc(t, O, C, "speaker");
              W.push(U), Zt.success(`Added ${U.displayName}`);
            } catch (U) {
              Zt.error(U instanceof Error ? U.message : `${O.name}: upload failed`);
            }
          }
          W.length > 0 && o([...W, ...a]);
        } finally {
          R(!1);
        }
      }
    },
    [t, a, o]
  ), ne = (te) => {
    te.preventDefault(), b(!1), te.dataTransfer?.files && J(te.dataTransfer.files);
  }, A = y.useCallback(async () => {
    const te = window.prompt("Paste an audio URL (https://…)");
    if (te)
      try {
        const ce = await fetch(te);
        if (!ce.ok) throw new Error(`fetch failed: ${ce.status}`);
        const W = await ce.blob(), O = te.split("/").pop()?.split("?")[0] ?? "voice.wav", C = new File([W], O, { type: W.type || "audio/wav" });
        await J([C]);
      } catch (ce) {
        Zt.error(ce instanceof Error ? ce.message : "could not fetch URL");
      }
  }, [J]), q = y.useCallback(
    async (te, ce) => {
      try {
        const W = await MT(t, te, ce);
        o(
          a.map((O) => O.voiceAssetId === te ? W : O)
        ), Zt.success(`Renamed to ${W.displayName}`);
      } catch (W) {
        Zt.error(W instanceof Error ? W.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = y.useCallback((te) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(te), Zt.success("Copied name")) : Zt.error("Clipboard unavailable");
  }, []), ie = y.useCallback(
    async (te) => {
      if (window.confirm(`Delete "${te.displayName}"? Mappings using it will reset.`))
        try {
          await _T(t, te.voiceAssetId), o(a.filter((W) => W.voiceAssetId !== te.voiceAssetId)), Zt.success(`Deleted ${te.displayName}`);
        } catch (W) {
          Zt.error(W instanceof Error ? W.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ u.jsxs("div", { className: pR, children: [
    /* @__PURE__ */ u.jsxs(
      "div",
      {
        className: vR,
        "data-over": p ? "true" : "false",
        onDragOver: (te) => {
          te.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ne,
        children: [
          /* @__PURE__ */ u.jsx("span", { className: gR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ u.jsxs("div", { className: yR, children: [
            /* @__PURE__ */ u.jsxs("div", { className: bR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ u.jsx("span", { className: xR, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ u.jsxs("div", { className: SR, children: [
              "or",
              /* @__PURE__ */ u.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => T.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ u.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => {
                    A();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ u.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => w(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ u.jsx(
            Ve,
            {
              variant: "primary",
              size: "md",
              disabled: N,
              onClick: () => T.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              ref: T,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: AR,
              onChange: (te) => {
                te.target.files && (J(te.target.files), te.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ u.jsxs("div", { className: wR, children: [
      /* @__PURE__ */ u.jsxs("label", { className: ER, children: [
        /* @__PURE__ */ u.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            className: jR,
            value: d,
            onChange: (te) => h(te.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: NR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([te, ce]) => /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: TR,
          "data-active": m === te ? "true" : "false",
          onClick: () => g(te),
          children: ce
        },
        te
      )) }),
      /* @__PURE__ */ u.jsxs("span", { className: _R, children: [
        /* @__PURE__ */ u.jsx("span", { className: MR, children: a.length }),
        " voices",
        /* @__PURE__ */ u.jsx("span", { children: "·" }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          M,
          " uploaded"
        ] })
      ] })
    ] }),
    z.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: RR, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ u.jsx("div", { className: CR, children: z.map((te) => {
      const ce = k(te);
      return /* @__PURE__ */ u.jsx(
        n_,
        {
          asset: te,
          presentation: ce,
          usedBy: I(te.voiceAssetId),
          isPlaying: v === te.voiceAssetId,
          onTogglePlay: () => S((W) => W === te.voiceAssetId ? null : te.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (W) => q(te.voiceAssetId, W),
          onCopyName: () => F(te.displayName),
          onDelete: ce === "upload" ? () => void ie(te) : void 0
        },
        te.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ u.jsx(
      g_,
      {
        open: E,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => w(!1),
        onSubmit: async (te, ce) => {
          await re(te, ce);
        }
      }
    )
  ] });
  async function re(te, ce) {
    R(!0);
    try {
      const W = await bc(t, te, ce, "speaker");
      o([W, ...a]), Zt.success(`Recorded ${W.displayName}`);
    } catch (W) {
      throw Zt.error(W instanceof Error ? W.message : "upload failed"), W;
    } finally {
      R(!1);
    }
  }
}
async function Fx(t) {
  return ht(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function b_(t, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function x_(t, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var i0 = "_190jlds0", S_ = "_190jlds1", w_ = "_190jlds2", E_ = "_190jlds3", j_ = "_190jlds4", N_ = "_190jlds5", T_ = "_190jlds6", C_ = "_190jlds7", R_ = "_190jlds8", __ = "_190jlds9", s0 = "_190jldsa", M_ = "_190jldsb", l0 = "_190jldsc", A_ = "_190jldsd", D_ = "_190jldse", z_ = "_190jldsf";
function O_({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: l,
  emptyHint: o
}) {
  const [d, h] = y.useState(() => Ui(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, S] = y.useState(null), [E, w] = y.useState(!1), [N, R] = y.useState(null), T = y.useMemo(
    () => a.find((M) => Ui(M) === d) ?? a[0],
    [a, d]
  );
  y.useEffect(() => {
    a.length && (a.some((M) => Ui(M) === d) || h(Ui(a[0])));
  }, [a, d]), y.useEffect(() => {
    if (!T) {
      g([]);
      return;
    }
    let M = !1;
    return b(!0), S(null), fc(t, T.kind, T.id, 50).then((I) => {
      M || g(I.entries);
    }).catch((I) => {
      M || S(I instanceof Error ? I.message : "audit fetch failed");
    }).finally(() => {
      M || b(!1);
    }), () => {
      M = !0;
    };
  }, [t, T]);
  const k = y.useCallback(() => {
    if (!T) return;
    const M = {
      deploymentId: t,
      targetKind: T.kind,
      targetId: T.id,
      targetLabel: T.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, I = new Blob([JSON.stringify(M, null, 2)], {
      type: "application/json"
    }), J = URL.createObjectURL(I), ne = document.createElement("a");
    ne.href = J, ne.download = `audit-${T.kind}-${T.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(J);
  }, [t, m, T]), z = y.useCallback(async () => {
    if (!(!T || !i) && window.confirm(
      `Revert "${T.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      w(!0);
      try {
        await i(T);
        const M = await fc(t, T.kind, T.id, 50);
        g(M.entries);
      } catch (M) {
        S(M instanceof Error ? M.message : "revert failed");
      } finally {
        w(!1);
      }
    }
  }, [t, i, T]);
  return a.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: i0, children: /* @__PURE__ */ u.jsx("p", { className: l0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ u.jsxs("div", { className: i0, children: [
    /* @__PURE__ */ u.jsxs("header", { className: S_, children: [
      /* @__PURE__ */ u.jsxs("div", { className: w_, children: [
        /* @__PURE__ */ u.jsx("label", { htmlFor: "audit-target-select", className: s0, children: "Target" }),
        /* @__PURE__ */ u.jsx(
          "select",
          {
            id: "audit-target-select",
            className: E_,
            value: d,
            onChange: (M) => h(M.target.value),
            children: a.map((M) => /* @__PURE__ */ u.jsxs("option", { value: Ui(M), children: [
              M.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              M.label
            ] }, Ui(M)))
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: j_, children: [
        /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: k,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void z(),
            disabled: E || !T,
            children: E ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ u.jsx("div", { className: D_, children: v }),
    p && !v && /* @__PURE__ */ u.jsx("div", { className: z_, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ u.jsxs("p", { className: l0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ u.jsx("br", {}),
      /* @__PURE__ */ u.jsx("span", { className: A_, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ u.jsx("ul", { className: N_, children: m.map((M) => {
      const I = l && T && !!M.chain_snapshot_json && M.operation_count > 0;
      return /* @__PURE__ */ u.jsxs("li", { className: T_, children: [
        /* @__PURE__ */ u.jsx("span", { className: C_, children: k_(M.recorded_at) }),
        /* @__PURE__ */ u.jsx("span", { className: R_, children: M.operation_count === 0 ? "cleared" : `${M.operation_count} ops` }),
        /* @__PURE__ */ u.jsxs("span", { className: __, title: M.digest_after, children: [
          M.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: s0, children: M.actor || "—" }),
        /* @__PURE__ */ u.jsx(
          "span",
          {
            className: M_,
            style: {
              background: `color-mix(in oklab, ${M.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: M.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: M.digest_before === "" || !M.digest_before ? "create" : M.operation_count === 0 ? "clear" : "update"
          }
        ),
        I && /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            disabled: E || N !== null,
            onClick: async () => {
              if (!(!T || !M.chain_snapshot_json) && !(N !== null || E) && window.confirm(
                `Replay this ${M.operation_count}-op chain on "${T.label}"? A new audit entry will be written.`
              )) {
                R(M.entry_id);
                try {
                  await l(T, M.chain_snapshot_json, M);
                  const J = await fc(
                    t,
                    T.kind,
                    T.id,
                    50
                  );
                  g(J.entries);
                } catch (J) {
                  S(J instanceof Error ? J.message : "revert failed");
                } finally {
                  R(null);
                }
              }
            },
            children: N === M.entry_id ? "Reverting…" : "Revert →"
          }
        )
      ] }, M.entry_id);
    }) })
  ] });
}
function Ui(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function k_(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var L_ = "_1uzgubz0", U_ = "_1uzgubz1", B_ = "_1uzgubz2", V_ = "_1uzgubz3", $_ = "_1uzgubz4", H_ = "_1uzgubz5", q_ = "_1uzgubz6", I_ = "_1uzgubz7", o0 = "_1uzgubz8", F_ = "_1uzgubz9", Yx = "_1uzgubza", Gx = "_1uzgubzb", Y_ = "_1uzgubzc", G_ = "_1uzgubzd", uf = "_1uzgubze", df = "_1uzgubzf", X_ = "_1uzgubzg", P_ = "_1uzgubzh", c0 = "_1uzgubzi", u0 = "_1uzgubzj", d0 = "_1uzgubzk", f0 = "_1uzgubzl", h0 = "_1uzgubzm", K_ = "_1uzgubzn", Q_ = "_1uzgubzo", Z_ = "_1uzgubzp", J_ = "_1uzgubzq";
function W_({
  characterName: t,
  color: a,
  lineCount: i,
  mapping: l,
  voiceAssets: o,
  presets: d,
  active: h,
  onToggle: m,
  onAssignVoiceAsset: g,
  onAssignPreset: p,
  onUploadFile: b,
  onClearMapping: v
}) {
  const [S, E] = y.useState(!1), w = l ? o.find((k) => k.voiceAssetId === l.speakerVoiceAssetId) : null, N = l?.defaultVectorPresetId ? d.find((k) => k.presetId === l.defaultVectorPresetId) ?? null : null, R = (t[0] ?? "?").toUpperCase(), T = l !== null;
  return /* @__PURE__ */ u.jsxs("div", { className: `${L_}${h ? ` ${U_}` : ""}`, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: B_,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ u.jsx(
            "span",
            {
              className: V_,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: R
            }
          ),
          /* @__PURE__ */ u.jsxs("span", { className: $_, children: [
            /* @__PURE__ */ u.jsx("span", { className: H_, style: { color: a }, children: t }),
            /* @__PURE__ */ u.jsxs("span", { className: q_, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ u.jsxs("span", { className: I_, children: [
            w ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              /* @__PURE__ */ u.jsx("span", { className: o0, children: w.displayName }),
              w.durationMs != null && /* @__PURE__ */ u.jsxs("span", { children: [
                m0(w.durationMs),
                " ·",
                " ",
                w.sampleRate ? `${w.sampleRate} Hz` : "—"
              ] })
            ] }) : N ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              /* @__PURE__ */ u.jsx("span", { className: o0, children: N.presetName }),
              /* @__PURE__ */ u.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ u.jsx("span", { children: "no voice assigned" }),
            l?.voiceAssetChainDigest && /* @__PURE__ */ u.jsxs("span", { className: Y_, children: [
              "chain · ",
              l.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ u.jsx(
            "span",
            {
              className: `${F_} ${T ? Yx : Gx}`,
              children: T ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ u.jsxs("div", { className: G_, children: [
      /* @__PURE__ */ u.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ u.jsx("span", { className: df, children: "Drop new audio" }),
        /* @__PURE__ */ u.jsxs(
          "label",
          {
            className: `${X_}${S ? ` ${P_}` : ""}`,
            onDragEnter: (k) => {
              k.preventDefault(), E(!0);
            },
            onDragOver: (k) => k.preventDefault(),
            onDragLeave: () => E(!1),
            onDrop: (k) => {
              k.preventDefault(), E(!1);
              const z = k.dataTransfer.files?.[0];
              z && b && b(z);
            },
            children: [
              /* @__PURE__ */ u.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ u.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (k) => {
                    const z = k.target.files?.[0];
                    z && b && b(z);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ u.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ u.jsx("span", { className: df, children: "Reference library" }),
        /* @__PURE__ */ u.jsx("div", { className: c0, children: o.map((k) => /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: `${u0}${l?.speakerVoiceAssetId === k.voiceAssetId ? ` ${d0}` : ""}`,
            onClick: () => g(k.voiceAssetId),
            children: [
              /* @__PURE__ */ u.jsx("span", { className: f0, children: k.displayName }),
              /* @__PURE__ */ u.jsxs("span", { className: h0, children: [
                k.durationMs != null ? m0(k.durationMs) : "—",
                " ",
                "·",
                " ",
                k.sampleRate ? `${k.sampleRate} Hz` : "—"
              ] })
            ]
          },
          k.voiceAssetId
        )) })
      ] }),
      d.length > 0 && p && /* @__PURE__ */ u.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ u.jsx("span", { className: df, children: "Preset voices" }),
        /* @__PURE__ */ u.jsx("div", { className: c0, children: d.map((k) => /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: `${u0}${l?.defaultVectorPresetId === k.presetId ? ` ${d0}` : ""}`,
            onClick: () => p(k.presetId),
            children: [
              /* @__PURE__ */ u.jsx("span", { className: f0, children: k.presetName }),
              /* @__PURE__ */ u.jsx("span", { className: h0, children: "preset · vector" })
            ]
          },
          k.presetId
        )) })
      ] }),
      T && v && /* @__PURE__ */ u.jsx(Ve, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function m0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function eM({
  unmappedCount: t,
  totalCount: a,
  children: i,
  emptyHint: l
}) {
  if (a === 0)
    return /* @__PURE__ */ u.jsx("p", { className: J_, children: l ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ u.jsxs("div", { children: [
    /* @__PURE__ */ u.jsx("header", { className: K_, children: /* @__PURE__ */ u.jsx(
      "span",
      {
        className: `${Q_} ${o ? Yx : Gx}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ u.jsx("ul", { className: Z_, children: i })
  ] });
}
async function xc() {
  return ht("/runtime/health");
}
async function Xx() {
  await ht("/runtime/start", { method: "POST" });
}
async function Px() {
  return ht("/runtime/stop", { method: "POST" });
}
function Kx(t) {
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
var tM = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: t,
  children: a,
  role: i,
  ariaLive: l,
  className: o,
  style: d
}) {
  const h = [tM[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), g = l ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ u.jsx("div", { className: h, role: m, "aria-live": g, style: d, children: a });
}
var Qx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Zx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, nM = "_13bb4njb";
function Zr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: l,
  className: o,
  style: d,
  title: h
}) {
  const m = i && t !== "faint", g = [Qx[a], Zx[t], m ? nM : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx("span", { className: g, style: d, title: h, children: l });
}
const aM = 4e3;
function rM({ deployment: t }) {
  const [a, i] = y.useState(null), [l, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await xc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(lM(b));
      }
    };
    g();
    const p = setInterval(g, aM);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const d = a?.badge ?? "not_installed", h = l?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ u.jsxs("output", { className: dR, "aria-live": "polite", children: [
    /* @__PURE__ */ u.jsx("span", { className: Fi, children: "Runtime" }),
    /* @__PURE__ */ u.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ u.jsx("span", { className: Fi, children: "Badge" }),
    /* @__PURE__ */ u.jsx(Zr, { tone: iM(d), pulse: d === "starting" || d === "installing", children: Kx(d) }),
    a && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("span", { className: Fi, children: "Uptime" }),
      /* @__PURE__ */ u.jsx("span", { children: sM(a.uptimeSeconds) }),
      /* @__PURE__ */ u.jsx("span", { className: Fi, children: "VRAM" }),
      /* @__PURE__ */ u.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    l && !h && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: l })
  ] });
}
function iM(t) {
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
function sM(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function lM(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
const Sc = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 }
}, Uc = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: !1, thresholdDb: -45 }
}, Ua = 1e-3;
function oM(t, a, i) {
  for (const l of Object.keys(Sc)) {
    const o = Sc[l];
    if (Math.abs(o.low - t) < Ua && Math.abs(o.mid - a) < Ua && Math.abs(o.high - i) < Ua)
      return l;
  }
  return "custom";
}
function cM(t) {
  let a = dM();
  for (const i of t.ops)
    a = uM(a, i);
  return a;
}
function uM(t, a) {
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
          preset: oM(a.low_db, a.mid_db, a.high_db)
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
function dM() {
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
function wr(t, a) {
  return t.ops.filter((i) => i.mode !== a);
}
function Er(t, a) {
  return [...t, a];
}
function fM(t, a) {
  const i = wr(t, "gain");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "gain", gain_db: a };
  return { ...t, ops: Er(i, l) };
}
function hM(t, a, i, l) {
  const o = wr(t, "eq3");
  if (Math.abs(a) < Ua && Math.abs(i) < Ua && Math.abs(l) < Ua)
    return { ...t, ops: o };
  const d = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: l
  };
  return { ...t, ops: Er(o, d) };
}
function mM(t, a) {
  const i = wr(t, "speed");
  if (Math.abs(a - 1) < Ua) return { ...t, ops: i };
  const l = { id: Sn(), mode: "speed", factor: a };
  return { ...t, ops: Er(i, l) };
}
function pM(t, a) {
  const i = wr(t, "pitch_shift");
  if (Math.abs(a) < Ua) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: Er(i, l) };
}
function vM(t, a, i) {
  const l = wr(t, "normalize");
  if (a === "off") return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: Er(l, o) };
}
function gM(t, a) {
  const i = wr(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function yM(t, a) {
  const i = wr(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: Er(i, l) };
}
function bM(t, a, i) {
  const l = wr(t, "silence_strip");
  if (!a) return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: Er(l, o) };
}
const Jx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function Wx(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((d) => !Jx.has(d.mode))
  };
  let o = fM({ version: 1, ops: [] }, a.volumeDb);
  return o = hM(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = mM(o, a.speed.value)), o = pM(o, a.pitchSt), o = vM(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = gM(o, a.fade.inS), o = yM(o, a.fade.outS), o = bM(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function e1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => Jx.has(i.mode))
  };
  return cM(a);
}
var xM = "_1rsa80i0", SM = "_1rsa80i1", wM = "_1rsa80i2", EM = "_1rsa80i3", jM = "_1rsa80i4", NM = "_1rsa80i5", TM = "_1rsa80i6", CM = "_1rsa80i7", RM = "_1rsa80i8", _M = "_1rsa80i9";
const t1 = ["flat", "warm", "bright", "voice", "telephone"], Zs = -12, Po = 12, MM = 0.5;
function AM(t) {
  const { low: a, mid: i, high: l, preset: o, onChange: d, disabled: h } = t, m = (p) => {
    const b = Sc[p];
    d(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: l, [p]: b }, S = zM(v.low, v.mid, v.high);
    d(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: xM, children: [
    /* @__PURE__ */ u.jsxs("div", { className: SM, role: "group", "aria-label": "EQ presets", children: [
      t1.map((p) => /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: wM,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ u.jsx("span", { className: EM, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: jM, children: [
      /* @__PURE__ */ u.jsx(
        ff,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ u.jsx(
        ff,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ u.jsx(
        ff,
        {
          label: "High",
          value: l,
          onChange: (p) => g("high", p),
          disabled: h
        }
      )
    ] })
  ] });
}
function ff({ label: t, value: a, onChange: i, disabled: l }) {
  const o = (a - Zs) / (Po - Zs) * 100, d = y.useId();
  return /* @__PURE__ */ u.jsxs("div", { className: NM, children: [
    /* @__PURE__ */ u.jsx("label", { htmlFor: d, className: TM, children: t }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        id: d,
        type: "range",
        min: Zs,
        max: Po,
        step: MM,
        value: a,
        disabled: l,
        className: RM,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Zs,
        "aria-valuemax": Po,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ u.jsx("span", { className: CM, children: DM(a) }),
    /* @__PURE__ */ u.jsxs("span", { className: _M, "aria-hidden": "true", children: [
      /* @__PURE__ */ u.jsx("span", { children: Zs }),
      /* @__PURE__ */ u.jsx("span", { children: "0" }),
      /* @__PURE__ */ u.jsxs("span", { children: [
        "+",
        Po
      ] })
    ] })
  ] });
}
function DM(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const hf = 1e-3;
function zM(t, a, i) {
  for (const l of t1) {
    const o = Sc[l];
    if (Math.abs(o.low - t) < hf && Math.abs(o.mid - a) < hf && Math.abs(o.high - i) < hf)
      return l;
  }
  return "custom";
}
var OM = "_85bhwb0", kM = "_85bhwb1", p0 = "_85bhwb2", LM = "_85bhwb3", UM = "_85bhwb4", BM = "_85bhwb5", VM = "_85bhwb6", $M = "_85bhwb7";
const Ko = 0.5, mf = 2, HM = 0.05;
function qM(t) {
  const { mode: a, value: i, supportsSynthSpeed: l, onChange: o, onReRenderAtSynthTime: d, disabled: h } = t, m = (i - Ko) / (mf - Ko) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ u.jsxs("div", { className: OM, children: [
    l ? /* @__PURE__ */ u.jsxs("div", { className: kM, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: p0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: p0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ u.jsxs("div", { className: LM, children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Ko,
          max: mf,
          step: HM,
          value: i,
          disabled: h,
          className: UM,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": mf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ u.jsx("span", { className: BM, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && l ? /* @__PURE__ */ u.jsxs("div", { className: VM, children: [
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          variant: "primary",
          size: "sm",
          onClick: d,
          disabled: h || !d,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ u.jsx("span", { className: $M, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var IM = "kgszk50", FM = "kgszk51", v0 = "kgszk52", YM = "kgszk53", GM = "kgszk54", n1 = "kgszk55", XM = "kgszk56", PM = "kgszk58", $h = "kgszk59", a1 = "kgszk5a", Hh = "kgszk5b", KM = "kgszk5c", QM = "kgszk5d", ZM = "kgszk5e", g0 = "kgszk5f", y0 = "kgszk5g", b0 = "kgszk5h", JM = "kgszk5i", WM = "kgszk5j", e2 = "kgszk5l", pl = "kgszk5m", vl = "kgszk5n";
const t2 = -24, n2 = 24, a2 = 0.5, r2 = -12, i2 = 12, s2 = 0.5, l2 = -30, o2 = -6, c2 = -12, u2 = 0, Qo = -60, pf = -20;
function qh(t) {
  const {
    state: a,
    onChange: i,
    supportsSynthSpeed: l,
    onReRenderAtSynthTime: o,
    onSliderFlush: d,
    pendingExecution: h = !1,
    disabled: m = !1,
    onApply: g,
    applyLabel: p = "Apply edit"
  } = t, b = (E) => {
    i({ ...a, ...E });
  }, v = m2(a), S = (E) => {
    const w = E.target;
    w && (w.tagName === "INPUT" || w.tagName === "BUTTON" || w.closest("input, button")) && d?.();
  };
  return /* @__PURE__ */ u.jsxs("div", { className: IM, onPointerDownCapture: S, children: [
    /* @__PURE__ */ u.jsxs("div", { className: FM, children: [
      v.length === 0 ? /* @__PURE__ */ u.jsx("span", { className: YM, children: "No active edits" }) : /* @__PURE__ */ u.jsxs("span", { className: v0, children: [
        /* @__PURE__ */ u.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ u.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ u.jsxs("span", { className: v0, "aria-live": "polite", children: [
        /* @__PURE__ */ u.jsx("span", { className: GM, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ u.jsx(
      x0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: t2,
        max: n2,
        step: a2,
        format: p2,
        value: a.volumeDb,
        onChange: (E) => b({ volumeDb: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ u.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ u.jsx("span", { className: vl, children: "3-band EQ" }),
      /* @__PURE__ */ u.jsx(
        AM,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (E, w, N, R) => b({ eq3: { low: E, mid: w, high: N, preset: R } })
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ u.jsx("span", { className: vl, children: "Speed" }),
      /* @__PURE__ */ u.jsx(
        qM,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: l,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (E, w) => b({ speed: { mode: E, value: w } })
        }
      )
    ] }),
    /* @__PURE__ */ u.jsx(
      x0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: r2,
        max: i2,
        step: s2,
        format: v2,
        value: a.pitchSt,
        onChange: (E) => b({ pitchSt: E }),
        disabled: m
      }
    ),
    /* @__PURE__ */ u.jsx(
      d2,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (E) => b({ normalize: E })
      }
    ),
    /* @__PURE__ */ u.jsx(
      f2,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (E, w) => b({ fade: { ...a.fade, inS: E, outS: w } })
      }
    ),
    /* @__PURE__ */ u.jsx(
      h2,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (E, w) => b({ silence: { enabled: E, thresholdDb: w } })
      }
    ),
    g ? /* @__PURE__ */ u.jsxs("div", { className: e2, children: [
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Uc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ u.jsx(Ve, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function x0(t) {
  const { label: a, sub: i, min: l, max: o, step: d, format: h, value: m, onChange: g, disabled: p } = t, b = (m - l) / (o - l) * 100, v = y.useId();
  return /* @__PURE__ */ u.jsxs("div", { className: n1, children: [
    /* @__PURE__ */ u.jsxs("div", { className: XM, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: v, className: PM, children: a }),
      /* @__PURE__ */ u.jsx("span", { className: a1, children: i })
    ] }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: l,
        max: o,
        step: d,
        value: m,
        disabled: p,
        className: Hh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": l,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ u.jsx("span", { className: $h, children: h(m) })
  ] });
}
function d2({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: l2, max: o2, step: 0.5, suffix: "LUFS" } : { min: c2, max: u2, step: 0.5, suffix: "dB" }, d = g2(t.targetDbOrLufs, o.min, o.max), h = (d - o.min) / (o.max - o.min) * 100, m = (g) => {
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
  return /* @__PURE__ */ u.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ u.jsx("span", { className: vl, children: "Normalize" }),
    /* @__PURE__ */ u.jsx("div", { className: KM, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const p = g === "peak";
      return /* @__PURE__ */ u.jsxs(
        "button",
        {
          type: "button",
          className: QM,
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
    t.mode !== "off" ? /* @__PURE__ */ u.jsxs("div", { className: n1, children: [
      /* @__PURE__ */ u.jsx("span", { className: a1, children: "Target" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: d,
          disabled: i,
          className: Hh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": d,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ u.jsxs("span", { className: $h, children: [
        d.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function f2({ inS: t, outS: a, onChange: i, disabled: l }) {
  const o = y.useId(), d = y.useId();
  return /* @__PURE__ */ u.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ u.jsx("span", { className: vl, children: "Fade" }),
    /* @__PURE__ */ u.jsxs("div", { className: ZM, children: [
      /* @__PURE__ */ u.jsxs("div", { className: g0, children: [
        /* @__PURE__ */ u.jsx("label", { className: y0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: l,
            className: b0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: g0, children: [
        /* @__PURE__ */ u.jsx("label", { className: y0, htmlFor: d, children: "Fade out (s)" }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            id: d,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: l,
            className: b0,
            onChange: (h) => i(t, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function h2({ enabled: t, thresholdDb: a, onChange: i, disabled: l }) {
  const o = (a - Qo) / (pf - Qo) * 100;
  return /* @__PURE__ */ u.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ u.jsx("span", { className: vl, children: "Silence trim" }),
    /* @__PURE__ */ u.jsxs("div", { className: JM, children: [
      /* @__PURE__ */ u.jsxs("label", { className: WM, children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            disabled: l,
            onChange: (d) => i(d.target.checked, a)
          }
        ),
        "Enabled"
      ] }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "range",
          min: Qo,
          max: pf,
          step: 1,
          value: a,
          disabled: l || !t,
          className: Hh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (d) => i(t, Number(d.target.value)),
          "aria-valuemin": Qo,
          "aria-valuemax": pf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ u.jsxs("span", { className: $h, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bi = 1e-3;
function m2(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bi && a.push("gain"), (Math.abs(t.eq3.low) >= Bi || Math.abs(t.eq3.mid) >= Bi || Math.abs(t.eq3.high) >= Bi) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bi && a.push("speed"), Math.abs(t.pitchSt) >= Bi && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function p2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function v2(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function g2(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var y2 = "skdk4g0", b2 = "skdk4g1", S0 = "skdk4g2", x2 = "skdk4g3", S2 = "skdk4g4", w2 = "skdk4g5", E2 = "skdk4g6", j2 = "skdk4g7", N2 = "skdk4g8", T2 = "skdk4g9", C2 = "skdk4ga", R2 = "skdk4gb", _2 = "skdk4gc", M2 = "skdk4gd", w0 = "skdk4ge", E0 = "skdk4gf", A2 = "skdk4gg", j0 = "skdk4gh", N0 = "skdk4gi", D2 = "skdk4gj", z2 = "skdk4gk", O2 = "skdk4gl", T0 = "skdk4gm", k2 = "skdk4gn", C0 = "skdk4go", L2 = "skdk4gp", U2 = "skdk4gq", B2 = "skdk4gr", V2 = "skdk4gs", $2 = "skdk4gt", H2 = "skdk4gu", q2 = "skdk4gv", R0 = "skdk4gw", I2 = "skdk4gx", F2 = "skdk4gy", Y2 = "skdk4gz", G2 = "skdk4g10", X2 = "cgsfgh1", P2 = "cgsfgh2", K2 = "cgsfgh3", Q2 = "cgsfgh4", Z2 = "cgsfgh5", J2 = "cgsfgh6", W2 = "cgsfgh7", eA = "cgsfgh8", tA = "cgsfgh9", nA = "cgsfgha", aA = "cgsfghb", rA = "cgsfghc", iA = "cgsfghd", sA = "cgsfghe", lA = "cgsfghm", oA = "cgsfghn", cA = "cgsfgho", uA = "cgsfghp";
const $t = [
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
}, Qi = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0
}, r1 = 0.05;
function dA(t) {
  let a = null, i = -1 / 0;
  for (const l of $t) {
    const o = t[l];
    o > i && (i = o, a = l);
  }
  return !a || i <= r1 ? null : a;
}
function i1(t, a = 3) {
  return $t.map((i) => ({ key: i, label: gl[i], value: t[i] })).filter((i) => i.value > r1).sort((i, l) => l.value - i.value).slice(0, a);
}
function fA(t) {
  let a = 0;
  for (const i of $t) a += t[i] * t[i];
  return Math.sqrt(a);
}
function _0(t) {
  const a = i1(t, 2), i = a[0];
  if (!i) return "";
  const l = a[1];
  return !l || i.value - l.value > 0.25 ? vf(i.label) : `${vf(i.label)} + ${l.label.toLowerCase()}`;
}
function vf(t) {
  if (!t) return t;
  const a = t[0];
  return a ? a.toUpperCase() + t.slice(1) : t;
}
function Jr(t) {
  const a = { ...Qi };
  for (const i of $t) {
    const l = t[i];
    a[i] = Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : 0;
  }
  return a;
}
const M0 = 0.05, A0 = 0.2, hA = 22, mA = 320, gf = 0.78;
function yf(t, a, i, l) {
  const o = Math.cos(i), d = Math.sin(i), h = t * o + a * d;
  return Math.max(0, Math.min(1, h / l));
}
function pA(t) {
  const { vec: a, onChange: i, size: l, reduceMotion: o = !1 } = t, [d, h] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), S = y.useRef(a), E = y.useRef(o), w = y.useRef(null), N = y.useRef(0);
  E.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const R = y.useCallback(
    (q) => {
      const F = Jr(q);
      h(F), S.current = F, i(F);
    },
    [i]
  ), T = y.useCallback((q) => {
    const F = Jr(q);
    h(F), S.current = F;
  }, []), k = y.useCallback(
    (q) => {
      const F = v.current;
      if (!F || E.current) return;
      const ie = q.clientX - F.centerX, re = q.clientY - F.centerY, te = l / 2 * gf, ce = yf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
      T(W);
    },
    [l, T]
  ), z = y.useCallback(
    (q) => {
      const F = v.current;
      if (F) {
        if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), E.current) {
          const ie = q.clientX - F.centerX, re = q.clientY - F.centerY, te = l / 2 * gf, ce = yf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
          v.current = null, R(W);
          return;
        }
        v.current = null, R(S.current);
      }
    },
    [R, k, l]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", z), window.removeEventListener("pointercancel", z), v.current = null, w.current !== null && (window.clearTimeout(w.current), w.current = null);
  }, [k, z]);
  const M = y.useCallback((q, F) => {
    E.current || (N.current += 1, b({ x: q, y: F, key: N.current }), w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
      b(null), w.current = null;
    }, mA));
  }, []), I = y.useCallback(
    (q, F, ie, re, te) => {
      const ce = ie.getBoundingClientRect(), W = ce.left + ce.width / 2, O = ce.top + ce.height / 2, U = $t.indexOf(q) / $t.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: q,
        pointerId: F,
        centerX: W,
        centerY: O,
        angle: U
      }, g(q), re !== void 0 && te !== void 0) {
        const B = re - W, Q = te - O, _ = l / 2 * gf, Z = yf(B, Q, U, _), P = { ...S.current, [q]: Z };
        E.current ? R(P) : T(P);
      }
      window.addEventListener("pointermove", k), window.addEventListener("pointerup", z), window.addEventListener("pointercancel", z);
    },
    [R, k, z, l, T]
  ), J = y.useCallback(
    (q, F) => {
      F.preventDefault();
      const ie = F.currentTarget, re = ie.ownerSVGElement ?? ie;
      I(q, F.pointerId, re);
    },
    [I]
  ), ne = y.useCallback(
    (q) => {
      const F = q.currentTarget, ie = F instanceof SVGSVGElement ? F : F.ownerSVGElement ?? F, re = ie.getBoundingClientRect(), te = re.left + re.width / 2, ce = re.top + re.height / 2, W = q.clientX - te, O = q.clientY - ce;
      if (Math.sqrt(W * W + O * O) < 8) return;
      let U = Math.atan2(O, W) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let B = null, Q = 999;
      for (let P = 0; P < $t.length; P++) {
        const le = $t[P];
        if (!le) continue;
        const fe = P / $t.length * 360, ge = Math.abs((fe - U + 540) % 360 - 180);
        ge < Q && (Q = ge, B = le);
      }
      if (!B || Q > hA) return;
      q.preventDefault();
      const _ = (q.clientX - re.left) / re.width * l, Z = (q.clientY - re.top) / re.height * l;
      M(_, Z), I(B, q.pointerId, ie, q.clientX, q.clientY);
    },
    [I, l, M]
  ), A = y.useCallback(
    (q, F) => {
      const ie = S.current[q];
      let re = ie;
      switch (F.key) {
        case "ArrowUp":
        case "ArrowRight":
          re = ie + M0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          re = ie - M0;
          break;
        case "PageUp":
          re = ie + A0;
          break;
        case "PageDown":
          re = ie - A0;
          break;
        case "Home":
          re = 0;
          break;
        case "End":
          re = 1;
          break;
        default:
          return;
      }
      F.preventDefault(), g(q), R({ ...S.current, [q]: re });
    },
    [R]
  );
  return {
    liveVec: d,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: J,
    onKeyDown: A,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const vA = [0.25, 0.5, 0.75, 1];
function gA({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: l = !1,
  reduceMotion: o = !1
}) {
  const d = pA({ vec: t, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => yA(h, m, g), [h, m, g]), b = y.useMemo(() => $t.map((v, S) => {
    const E = hc(d.liveVec[v]), w = p[S];
    return w ? `${h + w.dx * E},${m + w.dy * E}` : "0,0";
  }).join(" "), [p, h, m, d.liveVec]);
  return /* @__PURE__ */ u.jsx("div", { className: X2, children: /* @__PURE__ */ u.jsx("div", { className: P2, style: { width: i, height: i }, children: /* @__PURE__ */ u.jsxs(
    "svg",
    {
      className: K2,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: l ? void 0 : d.onSurfacePointerDown,
      style: l ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        vA.map((v) => /* @__PURE__ */ u.jsx(
          "circle",
          {
            className: Q2,
            cx: h,
            cy: m,
            r: g * v
          },
          v
        )),
        $t.map((v, S) => {
          const E = p[S];
          if (!E) return null;
          const w = h + E.dx * 1.18, N = m + E.dy * 1.18, R = d.activeAxis === v;
          return /* @__PURE__ */ u.jsxs("g", { children: [
            /* @__PURE__ */ u.jsx(
              "line",
              {
                className: Z2,
                x1: h,
                y1: m,
                x2: h + E.dx,
                y2: m + E.dy
              }
            ),
            /* @__PURE__ */ u.jsx(
              "text",
              {
                className: `${iA}${R ? ` ${sA}` : ""}`,
                x: w,
                y: N,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: gl[v]
              }
            )
          ] }, v);
        }),
        $t.map((v, S) => {
          const E = hc(d.liveVec[v]);
          if (E <= 0.01) return null;
          const w = p[S];
          if (!w) return null;
          const N = d.activeAxis === v;
          return /* @__PURE__ */ u.jsx(
            "line",
            {
              className: `${W2}${N ? ` ${eA}` : ""}`,
              x1: h,
              y1: m,
              x2: h + w.dx * E,
              y2: m + w.dy * E
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ u.jsx("polygon", { className: J2, points: b }),
        d.surfacePing && /* @__PURE__ */ u.jsx(
          "circle",
          {
            className: rA,
            cx: d.surfacePing.x,
            cy: d.surfacePing.y,
            r: 10
          },
          d.surfacePing.key
        ),
        !l && $t.map((v, S) => {
          const E = hc(d.liveVec[v]), w = p[S];
          if (!w) return null;
          const N = h + w.dx * E, R = m + w.dy * E, T = d.activeAxis === v;
          return /* @__PURE__ */ u.jsxs("g", { children: [
            /* @__PURE__ */ u.jsx(
              "circle",
              {
                className: tA,
                cx: N,
                cy: R,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${gl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": E,
                onPointerDown: (k) => d.onPointerDown(v, k),
                onKeyDown: (k) => d.onKeyDown(v, k),
                onFocus: () => d.setActiveAxis(v),
                onBlur: () => d.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ u.jsx(
              "circle",
              {
                className: `${nA}${T ? ` ${aA}` : ""}`,
                cx: N,
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
function yA(t, a, i) {
  return $t.map((l, o) => {
    const d = o / $t.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(d) * i,
      dy: Math.sin(d) * i
    };
  });
}
function hc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function bA({ vec: t, size: a = 36 }) {
  const i = a / 2, l = a / 2, o = a / 2 * 0.86, d = y.useMemo(() => $t.map((h, m) => {
    const g = hc(t[h]), p = m / $t.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = l + Math.sin(p) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, l, o, t]);
  return /* @__PURE__ */ u.jsx("span", { className: lA, "aria-hidden": "true", children: /* @__PURE__ */ u.jsxs(
    "svg",
    {
      className: oA,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ u.jsx("circle", { className: cA, cx: i, cy: l, r: o }),
        /* @__PURE__ */ u.jsx("polygon", { className: uA, points: d })
      ]
    }
  ) });
}
var xA = "_1jqr3aj0", SA = "_1jqr3aj1", wA = "_1jqr3aj2", EA = "_1jqr3aj3", jA = "_1jqr3aj4", NA = "_1jqr3aj5", TA = "_1jqr3aj6", CA = "_1jqr3aj7";
const D0 = 0.05, z0 = 0.2;
function RA({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: l = !1
}) {
  const [o, d] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (w, N) => {
      const R = Math.max(0, Math.min(1, N));
      a(Jr({ ...t, [w]: R }));
    },
    [a, t]
  ), p = y.useCallback((w, N) => {
    const R = m.current.get(w);
    return !R || R.width <= 0 ? 0 : (N - R.left) / R.width;
  }, []), b = y.useCallback(
    (w, N) => {
      if (i) return;
      N.preventDefault();
      const R = N.currentTarget.querySelector("[data-track]");
      R instanceof HTMLElement && m.current.set(w, R.getBoundingClientRect()), N.currentTarget.setPointerCapture(N.pointerId), h.current = w, d(w), g(w, p(w, N.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (w, N) => {
      i || l || h.current === w && g(w, p(w, N.clientX));
    },
    [i, l, g, p]
  ), S = y.useCallback(
    (w, N) => {
      if (h.current === w) {
        try {
          N.currentTarget.releasePointerCapture(N.pointerId);
        } catch {
        }
        h.current = null, m.current.delete(w);
      }
    },
    []
  ), E = y.useCallback(
    (w, N) => {
      if (i) return;
      const R = t[w] ?? 0;
      let T = R;
      switch (N.key) {
        case "ArrowRight":
        case "ArrowUp":
          T = R + D0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          T = R - D0;
          break;
        case "PageUp":
          T = R + z0;
          break;
        case "PageDown":
          T = R - z0;
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
      N.preventDefault(), d(w), g(w, T);
    },
    [i, g, t]
  );
  return /* @__PURE__ */ u.jsx("div", { className: xA, role: "group", "aria-label": "Emotion axis sliders", children: $t.map((w) => {
    const N = _A(t[w] ?? 0), R = N > 0.05, T = o === w, k = gl[w];
    return /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: `${SA}${R ? ` ${wA}` : ""}${T ? ` ${EA}` : ""}`,
        role: "slider",
        "aria-label": `${k} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(N.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (z) => b(w, z),
        onPointerMove: (z) => v(w, z),
        onPointerUp: (z) => S(w, z),
        onPointerCancel: (z) => S(w, z),
        onKeyDown: (z) => E(w, z),
        onFocus: () => d(w),
        onBlur: () => d(null),
        children: [
          /* @__PURE__ */ u.jsx("span", { className: jA, children: k }),
          /* @__PURE__ */ u.jsx("span", { className: NA, "data-track": "true", children: /* @__PURE__ */ u.jsx(
            "span",
            {
              className: TA,
              style: { width: `${N * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ u.jsx("span", { className: CA, children: N.toFixed(2) })
        ]
      },
      w
    );
  }) });
}
function _A(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var O0 = "gvwvwg0", MA = "gvwvwg2", AA = "gvwvwg3", DA = "gvwvwg8", zA = "gvwvwg9", OA = "gvwvwga", kA = "gvwvwgb", LA = "gvwvwgc", UA = "gvwvwgd", BA = "gvwvwge";
function VA({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: l
}) {
  return t.length === 0 ? /* @__PURE__ */ u.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ u.jsx("span", { className: MA, children: "Preset library" }),
    /* @__PURE__ */ u.jsx("span", { className: AA, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ u.jsx("span", { className: BA, children: "Preset library" }),
    /* @__PURE__ */ u.jsx("div", { className: DA, children: t.map((o) => {
      const d = $A(o), h = o.presetId === a;
      return /* @__PURE__ */ u.jsxs(
        "div",
        {
          className: `${zA}${h ? ` ${kA}` : ""}`,
          children: [
            /* @__PURE__ */ u.jsxs(
              "button",
              {
                type: "button",
                className: OA,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ u.jsx(bA, { vec: d, size: 28 }),
                  /* @__PURE__ */ u.jsx("span", { className: LA, children: o.presetName })
                ]
              }
            ),
            l && /* @__PURE__ */ u.jsx(
              "button",
              {
                type: "button",
                className: UA,
                onClick: () => {
                  window.confirm(`Delete preset "${o.presetName}"? This cannot be undone.`) && l(o.presetId);
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
const Qf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function $A(t) {
  const a = Qf.reduce(
    (l, o) => ({ ...l, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = Qf.reduce(
    (l, o, d) => ({ ...l, [o]: t.vector[d] ?? 0 }),
    a
  );
  return Jr(i);
}
function bf(t) {
  return Qf.map((a) => t[a] ?? 0);
}
const HA = [
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
], qA = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], IA = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], FA = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function YA(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Qi };
  const l = a.split(/\s+/).some((h) => qA.includes(h)) ? 1.2 : 1, o = IA.some((h) => a.includes(h)) ? 0.55 : 1, d = { ...Qi };
  for (const h of HA) {
    let m = 0;
    for (const g of h.keywords) {
      const p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, E = a.slice(0, S), w = Math.max(
        E.lastIndexOf(","),
        E.lastIndexOf(";"),
        E.lastIndexOf(" but "),
        E.lastIndexOf(" yet ")
      ), R = E.slice(w >= 0 ? w : 0).slice(-30);
      FA.some((T) => new RegExp(`\\b${T}\\b`).test(R)) || (m += 1);
    }
    if (m > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * l * o;
      d[h.axis] = Math.min(1, g);
    }
  }
  return $t.every((h) => d[h] === 0) && (d.calm = 0.4), Jr(d);
}
const GA = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function XA({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const l = t.mode ?? "none", o = y.useMemo(() => PA(t.vector), [t.vector]), d = t.emotionAlpha ?? 1, [h, m] = y.useState([]), [g, p] = y.useState(null), [b, v] = y.useState(!1), [S, E] = y.useState(null), [w, N] = y.useState(""), [R, T] = y.useState(!1), k = y.useRef(!0);
  y.useEffect(() => (k.current = !0, () => {
    k.current = !1;
  }), []), y.useEffect(() => {
    let C = !1;
    return Fx(i).then((U) => {
      C || m(k0(U.presets));
    }).catch((U) => {
      C || p(xf(U));
    }), () => {
      C = !0;
    };
  }, [i]), y.useEffect(() => {
    R || N(_0(o));
  }, [o, R]);
  const z = (C) => {
    a({ ...t, mode: C });
  }, M = (C) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: bf(C)
    }), S && E(null);
  }, I = () => {
    M(Jr(Qi));
  }, J = (C) => {
    const U = Math.max(0, Math.min(10, Number.isFinite(C) ? C : 1));
    a({ ...t, emotionAlpha: U });
  }, ne = async () => {
    const C = w.trim();
    if (C) {
      v(!0), p(null);
      try {
        const U = await b_(i, C, bf(o));
        if (!k.current) return;
        m(
          (B) => k0([U, ...B.filter((Q) => Q.presetId !== U.presetId)])
        ), E(U.presetId), T(!1);
      } catch (U) {
        k.current && p(xf(U));
      } finally {
        k.current && v(!1);
      }
    }
  }, A = async (C) => {
    const U = h;
    m((B) => B.filter((Q) => Q.presetId !== C)), S === C && E(null);
    try {
      await x_(i, C);
    } catch (B) {
      k.current && (m(U), p(xf(B)));
    }
  }, q = (C) => {
    E(C.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: C.vector
    });
  }, F = (C) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: C });
  }, ie = dA(o), re = fA(o), te = i1(o, 3), ce = te.length > 0 && w.trim().length > 0 && !b, W = _0(o) || "name your preset…", O = l !== "emotion_vector";
  return /* @__PURE__ */ u.jsxs("div", { className: y2, children: [
    /* @__PURE__ */ u.jsxs("div", { className: b2, children: [
      /* @__PURE__ */ u.jsx("span", { className: S0, children: "Emotion mode" }),
      /* @__PURE__ */ u.jsx("div", { className: x2, role: "radiogroup", "aria-label": "Emotion mode", children: GA.map((C) => /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l === C.id,
          className: `${S2}${l === C.id ? ` ${w2}` : ""}`,
          onClick: () => z(C.id),
          children: C.label
        },
        C.id
      )) })
    ] }),
    l === "none" && /* @__PURE__ */ u.jsxs("div", { className: C0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ u.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    l === "audio_ref" && /* @__PURE__ */ u.jsx("div", { className: C0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    l === "qwen_template" && /* @__PURE__ */ u.jsxs("div", { className: D2, children: [
      /* @__PURE__ */ u.jsx(
        "textarea",
        {
          className: z2,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (C) => F(C.target.value)
        }
      ),
      /* @__PURE__ */ u.jsxs("div", { className: O2, children: [
        /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "secondary",
            onClick: () => {
              const C = (t.qwenTemplate ?? "").trim();
              if (!C) return;
              const U = YA(C);
              a({
                ...t,
                mode: "emotion_vector",
                vector: bf(U)
              });
            },
            disabled: !(t.qwenTemplate ?? "").trim(),
            children: "Map to vector →"
          }
        ),
        /* @__PURE__ */ u.jsx("span", { className: T0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ u.jsxs("span", { className: T0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ u.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (l === "emotion_vector" || l === "none" || l === "audio_ref") && /* @__PURE__ */ u.jsxs("div", { className: M2, children: [
      /* @__PURE__ */ u.jsx("div", { className: `${Wy} ${E2}`, children: /* @__PURE__ */ u.jsx(
        gA,
        {
          vec: o,
          onChange: M,
          readOnly: O
        }
      ) }),
      /* @__PURE__ */ u.jsxs("div", { className: `${Wy} ${j2}`, children: [
        /* @__PURE__ */ u.jsxs("div", { className: N2, children: [
          /* @__PURE__ */ u.jsx("span", { className: S0, children: "Dominant" }),
          /* @__PURE__ */ u.jsx("span", { className: T2, children: ie ? gl[ie].toLowerCase() : "neutral" }),
          /* @__PURE__ */ u.jsxs("span", { className: C2, children: [
            "‖v‖ = ",
            re.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ u.jsx(RA, { vec: o, onChange: M, readOnly: O }),
        /* @__PURE__ */ u.jsx("div", { className: R2, children: /* @__PURE__ */ u.jsxs(
          Ve,
          {
            variant: "ghost",
            size: "sm",
            onClick: I,
            disabled: O || re < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ u.jsxs(
                "svg",
                {
                  className: _2,
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ u.jsx(
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
                    /* @__PURE__ */ u.jsx(
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
    l === "emotion_vector" && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: w0, children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("span", { className: E0, children: "Alpha" }),
          /* @__PURE__ */ u.jsx("br", {}),
          /* @__PURE__ */ u.jsx("span", { className: A2, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: d,
            className: j0,
            style: { "--fill": `${d * 10}%` },
            onChange: (C) => J(Number(C.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ u.jsxs("span", { className: N0, children: [
          (d * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs(
        "div",
        {
          className: `${L2}${te.length === 0 ? ` ${U2}` : ""}`,
          children: [
            /* @__PURE__ */ u.jsxs("div", { className: B2, children: [
              /* @__PURE__ */ u.jsx("span", { className: V2, children: "Save current as preset" }),
              te.length === 0 && /* @__PURE__ */ u.jsx("span", { className: $2, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ u.jsxs("div", { className: H2, children: [
              /* @__PURE__ */ u.jsx("div", { className: q2, children: te.length === 0 ? /* @__PURE__ */ u.jsx("span", { className: `${R0} ${F2}`, children: "no axes set" }) : te.map((C) => /* @__PURE__ */ u.jsxs("span", { className: R0, children: [
                C.label.toLowerCase(),
                /* @__PURE__ */ u.jsx("b", { className: I2, children: C.value.toFixed(2) })
              ] }, C.key)) }),
              /* @__PURE__ */ u.jsxs("div", { className: Y2, children: [
                /* @__PURE__ */ u.jsx(
                  "input",
                  {
                    type: "text",
                    className: G2,
                    placeholder: W,
                    value: w,
                    disabled: te.length === 0 || b,
                    onChange: (C) => {
                      N(C.target.value), T(!0);
                    },
                    onKeyDown: (C) => {
                      C.key === "Enter" && ce && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ u.jsx(
                  Ve,
                  {
                    variant: "primary",
                    disabled: !ce,
                    onClick: ne,
                    children: b ? "Saving…" : "+ Save"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ u.jsx(
        VA,
        {
          presets: h,
          activePresetId: S,
          onSelect: q,
          onDelete: A
        }
      )
    ] }),
    l === "qwen_template" && /* @__PURE__ */ u.jsxs("div", { className: w0, children: [
      /* @__PURE__ */ u.jsx("span", { className: E0, children: "Alpha" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: d,
          className: j0,
          style: { "--fill": `${d * 10}%` },
          onChange: (C) => J(Number(C.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ u.jsxs("span", { className: N0, children: [
        (d * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ u.jsx("div", { className: k2, children: g })
  ] });
}
function PA(t) {
  if (!t || !Array.isArray(t)) return Jr(Qi);
  const a = { ...Qi };
  return $t.forEach((i, l) => {
    const o = t[l];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function k0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function xf(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "Unknown error";
}
var KA = "_5u1uau0", Js = "_5u1uau1", QA = "_5u1uau2", Vi = "_5u1uau3", Ws = "_5u1uau4", ZA = "_5u1uau5", Sf = "_5u1uau6", JA = "_5u1uau7", WA = "_5u1uau8", e3 = "_5u1uau9", t3 = "_5u1uaua", n3 = "_5u1uaub", a3 = "_5u1uauc", r3 = "_5u1uaud", i3 = "_5u1uaue", L0 = "_5u1uauf", U0 = "_5u1uaug", s3 = "_5u1uauh";
const wf = [
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
], l3 = ["mp3", "wav", "flac"], Zo = 0.5, Ef = 2, o3 = 0.05, c3 = 0.8, u3 = 0.8, B0 = 42;
function Jo(t, a, i) {
  const l = t[a];
  if (typeof l == "number" && Number.isFinite(l)) return l;
  if (typeof l == "string") {
    const o = Number(l);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function d3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: l,
  cachePolicy: o,
  onCachePolicyChange: d,
  generation: h,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), S = y.useId(), E = (I, J) => {
    m({ ...h, [I]: J });
  }, w = h.seed === void 0 || h.seed === null ? "random" : "fixed", N = (I) => {
    if (I !== w)
      if (I === "random") {
        const J = { ...h };
        delete J.seed, m(J);
      } else {
        const J = Jo(h, "seed", B0);
        m({ ...h, seed: J });
      }
  }, R = wf.find((I) => I.id === o) ?? wf[0], T = (i - Zo) / (Ef - Zo) * 100, k = Jo(h, "temperature", c3), z = Jo(h, "top_p", u3), M = Jo(h, "seed", B0);
  return /* @__PURE__ */ u.jsxs("div", { className: KA, children: [
    /* @__PURE__ */ u.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: g, className: Vi, children: "Format" }),
      /* @__PURE__ */ u.jsx("div", { className: Ws, children: /* @__PURE__ */ u.jsx(
        "select",
        {
          id: g,
          className: ZA,
          value: t,
          onChange: (I) => a(I.currentTarget.value),
          children: l3.map((I) => /* @__PURE__ */ u.jsx("option", { value: I, children: I }, I))
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: p, className: Vi, children: "Speed" }),
      /* @__PURE__ */ u.jsxs("div", { className: `${Ws} ${JA}`, children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: WA,
            min: Zo,
            max: Ef,
            step: o3,
            value: i,
            style: { "--range-pct": `${T}%` },
            onChange: (I) => l(Number(I.currentTarget.value)),
            "aria-valuemin": Zo,
            "aria-valuemax": Ef,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ u.jsxs("span", { className: e3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: QA, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ u.jsx("span", { className: Vi, children: "Cache" }),
      /* @__PURE__ */ u.jsx("div", { className: t3, children: wf.map((I) => /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === I.id,
          className: n3,
          onClick: () => d(I.id),
          title: I.help,
          children: I.label
        },
        I.id
      )) }),
      /* @__PURE__ */ u.jsx("p", { className: a3, "aria-live": "polite", children: R.help })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: r3, "aria-hidden": "true" }),
    /* @__PURE__ */ u.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: b, className: Vi, children: "Temperature" }),
      /* @__PURE__ */ u.jsx("div", { className: Ws, children: /* @__PURE__ */ u.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Sf,
          min: 0,
          max: 2,
          step: 0.05,
          value: k,
          onChange: (I) => E("temperature", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: v, className: Vi, children: "Top-p" }),
      /* @__PURE__ */ u.jsx("div", { className: Ws, children: /* @__PURE__ */ u.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Sf,
          min: 0,
          max: 1,
          step: 0.05,
          value: z,
          onChange: (I) => E("top_p", Number(I.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: Js, children: [
      /* @__PURE__ */ u.jsx("span", { className: Vi, id: `${S}-label`, children: "Seed" }),
      /* @__PURE__ */ u.jsxs(
        "div",
        {
          className: `${Ws} ${i3}`,
          role: "radiogroup",
          "aria-labelledby": `${S}-label`,
          children: [
            /* @__PURE__ */ u.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": w === "fixed",
                className: `${L0} ${w === "fixed" ? U0 : ""}`,
                onClick: () => N("fixed"),
                children: "Fixed"
              }
            ),
            /* @__PURE__ */ u.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": w === "random",
                className: `${L0} ${w === "random" ? U0 : ""}`,
                onClick: () => N("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            w === "fixed" ? /* @__PURE__ */ u.jsx(
              "input",
              {
                id: S,
                type: "number",
                className: Sf,
                step: 1,
                value: M,
                onChange: (I) => E("seed", Math.trunc(Number(I.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ u.jsx("span", { className: s3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var f3 = "iv43qk0", V0 = "iv43qk1", h3 = "iv43qk2", $0 = "iv43qk3", m3 = "iv43qk4", p3 = "iv43qk5", v3 = "iv43qk6", g3 = "iv43qk7", y3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, b3 = "iv43qkd", x3 = "iv43qke", jf = "iv43qkf", Nf = "iv43qkg";
function S3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ u.jsx("p", { className: b3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const l = t.length, o = t.filter((h) => h.character !== null).length, d = l - o;
  return /* @__PURE__ */ u.jsxs("div", { children: [
    /* @__PURE__ */ u.jsxs("div", { className: x3, children: [
      /* @__PURE__ */ u.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ u.jsx("span", { className: Nf, children: l }),
        "lines"
      ] }),
      /* @__PURE__ */ u.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ u.jsx("span", { className: Nf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ u.jsxs("span", { className: jf, children: [
        /* @__PURE__ */ u.jsx("span", { className: Nf, children: d }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("ol", { className: f3, children: t.map((h) => /* @__PURE__ */ u.jsx(
      w3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function w3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ u.jsxs("li", { className: `${V0} ${h3}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: $0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ u.jsx("span", { className: v3, children: t.text })
  ] }) : /* @__PURE__ */ u.jsxs(
    "li",
    {
      className: V0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ u.jsx("span", { className: $0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ u.jsx("span", { className: m3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ u.jsxs("span", { className: p3, children: [
          t.text,
          t.override && /* @__PURE__ */ u.jsxs("span", { className: `${g3} ${y3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var E3 = "_46z95i0", j3 = "_46z95i1", N3 = "_46z95i2", T3 = "_46z95i3", C3 = "_46z95i4", R3 = "_46z95i5", _3 = "_46z95i6";
const M3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function A3({ value: t, onChange: a }) {
  return /* @__PURE__ */ u.jsxs("div", { className: E3, children: [
    /* @__PURE__ */ u.jsx(
      Tf,
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
    /* @__PURE__ */ u.jsx(
      Tf,
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
    /* @__PURE__ */ u.jsx(
      Tf,
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
function Tf({ label: t, sub: a, min: i, max: l, step: o, format: d, value: h, onChange: m }) {
  const g = (h - i) / (l - i) * 100, p = `perf-${t.toLowerCase()}`;
  return /* @__PURE__ */ u.jsxs("div", { className: j3, children: [
    /* @__PURE__ */ u.jsxs("div", { className: N3, children: [
      /* @__PURE__ */ u.jsx("label", { htmlFor: p, className: T3, children: t }),
      /* @__PURE__ */ u.jsx("span", { className: C3, children: a })
    ] }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: l,
        step: o,
        value: h,
        className: R3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ u.jsx("span", { className: _3, children: d(h) })
  ] });
}
var D3 = "qe93dj0", z3 = "qe93dj1", O3 = "qe93dj2", k3 = "qe93dj3", L3 = "qe93dj4", U3 = "qe93dj5", B3 = "qe93dj6", V3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, $3 = "qe93dja", H3 = "qe93djb";
function q3({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ u.jsxs("div", { className: D3, children: [
    /* @__PURE__ */ u.jsxs("header", { className: z3, children: [
      /* @__PURE__ */ u.jsx("span", { className: O3, children: "Pre-flight" }),
      /* @__PURE__ */ u.jsxs("span", { className: k3, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("ul", { className: L3, children: t.map((i) => /* @__PURE__ */ u.jsxs("li", { className: U3, children: [
      /* @__PURE__ */ u.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${B3} ${V3[i.status]}`
        }
      ),
      /* @__PURE__ */ u.jsx("span", { className: $3, children: i.label }),
      i.detail && /* @__PURE__ */ u.jsx("span", { className: H3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var H0 = "_17fbpt30", q0 = "_17fbpt31", I0 = "_17fbpt32", I3 = "_17fbpt33", F3 = "_17fbpt34", Y3 = "_17fbpt35", F0 = "_17fbpt36", G3 = "_17fbpt37", X3 = "_17fbpt38";
const P3 = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function K3({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: l,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ u.jsxs("div", { className: H0, children: [
    /* @__PURE__ */ u.jsx("header", { className: q0, children: /* @__PURE__ */ u.jsx(
      "a",
      {
        className: I0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (d) => {
          d.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ u.jsx("p", { className: G3, children: "No runs yet." }),
    /* @__PURE__ */ u.jsx("p", { className: X3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ u.jsxs("div", { className: H0, children: [
    /* @__PURE__ */ u.jsxs("header", { className: q0, children: [
      /* @__PURE__ */ u.jsx("span", {}),
      /* @__PURE__ */ u.jsx(
        "a",
        {
          className: I0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (d) => {
            d.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ u.jsx("ul", { className: I3, children: t.slice(0, 5).map((d) => /* @__PURE__ */ u.jsx("li", { children: /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: F3,
        onClick: l ? () => l(d.runId) : void 0,
        children: [
          /* @__PURE__ */ u.jsx("span", { className: Y3, children: d.runId }),
          /* @__PURE__ */ u.jsx("span", { className: `${Qx.sm} ${Zx[P3[d.status] ?? "neutral"]}`, children: d.status }),
          /* @__PURE__ */ u.jsx("span", { className: F0, children: Q3(d.startedAt ?? d.queuedAt) }),
          /* @__PURE__ */ u.jsx("span", { className: F0, children: d.kind })
        ]
      }
    ) }, d.runId)) })
  ] });
}
function Q3(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
function Z3(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function s1() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function J3() {
  if (typeof window > "u") return;
  const t = s1();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function l1(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const l = s1(), o = () => {
      const h = l.reduce((m, g) => {
        const p = Z3(g);
        return p > m ? p : m;
      }, 0);
      i(h > t);
    };
    o();
    const d = { passive: !0 };
    for (const h of l)
      h.addEventListener("scroll", o, d);
    return () => {
      for (const h of l)
        h.removeEventListener("scroll", o, d);
    };
  }, [t]), a;
}
const o1 = 360, Zf = "emotion-tts:trigger-generate", Jf = "emotion-tts:run-state";
function W3() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Zf));
}
function eD(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(Jf, { detail: t }));
}
function tD(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(Zf, t), () => window.removeEventListener(Zf, t));
}
function c1(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && t(l);
  };
  return window.addEventListener(Jf, a), () => window.removeEventListener(Jf, a);
}
var nD = "_1s59p180", aD = "_1s59p181", rD = "_1s59p182", iD = "_1s59p183", sD = "_1s59p184", lD = "_1s59p185", oD = "_1s59p186", cD = "_1s59p188", uD = "_1s59p189", Y0 = "_1s59p18a", dD = "_1s59p18c", fD = "_1s59p18d", hD = "_1s59p18e", mD = "_1s59p18f", pD = "_1s59p18g", vD = "_1s59p18i";
const u1 = y.createContext({});
function Ih(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const gD = typeof window < "u", d1 = gD ? y.useLayoutEffect : y.useEffect, Bc = /* @__PURE__ */ y.createContext(null);
function yD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function bD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const xr = (t, a, i) => i > a ? a : i < t ? t : i;
function G0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Cl = () => {
}, Zi = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Cl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(G0(a, i));
}, Zi = (t, a, i) => {
  if (!t)
    throw new Error(G0(a, i));
});
const Sr = {}, f1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function xD(t) {
  return typeof t == "object" && t !== null;
}
const h1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function m1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const es = /* @__NO_SIDE_EFFECTS__ */ (t) => t, SD = (t, a) => (i) => a(t(i)), Vc = (...t) => t.reduce(SD), p1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const l = a - t;
  return l === 0 ? 1 : (i - t) / l;
};
class v1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return yD(this.subscriptions, a), () => bD(this.subscriptions, a);
  }
  notify(a, i, l) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](a, i, l);
      else
        for (let d = 0; d < o; d++) {
          const h = this.subscriptions[d];
          h && h(a, i, l);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Xn = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, aa = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function g1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const y1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, wD = 1e-7, ED = 12;
function jD(t, a, i, l, o) {
  let d, h, m = 0;
  do
    h = a + (i - a) / 2, d = y1(h, l, o) - t, d > 0 ? i = h : a = h;
  while (Math.abs(d) > wD && ++m < ED);
  return h;
}
function Rl(t, a, i, l) {
  if (t === a && i === l)
    return es;
  const o = (d) => jD(d, 0, 1, t, i);
  return (d) => d === 0 || d === 1 ? d : y1(o(d), a, l);
}
const b1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, x1 = (t) => (a) => 1 - t(1 - a), S1 = /* @__PURE__ */ Rl(0.33, 1.53, 0.69, 0.99), Fh = /* @__PURE__ */ x1(S1), w1 = /* @__PURE__ */ b1(Fh), E1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Fh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Yh = (t) => 1 - Math.sin(Math.acos(t)), ND = x1(Yh), j1 = b1(Yh), TD = /* @__PURE__ */ Rl(0.42, 0, 1, 1), CD = /* @__PURE__ */ Rl(0, 0, 0.58, 1), N1 = /* @__PURE__ */ Rl(0.42, 0, 0.58, 1), RD = (t) => Array.isArray(t) && typeof t[0] != "number", T1 = (t) => Array.isArray(t) && typeof t[0] == "number", X0 = {
  linear: es,
  easeIn: TD,
  easeInOut: N1,
  easeOut: CD,
  circIn: Yh,
  circInOut: j1,
  circOut: ND,
  backIn: Fh,
  backInOut: w1,
  backOut: S1,
  anticipate: E1
}, _D = (t) => typeof t == "string", P0 = (t) => {
  if (T1(t)) {
    Zi(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, l, o] = t;
    return Rl(a, i, l, o);
  } else if (_D(t))
    return Zi(X0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), X0[t];
  return t;
}, Wo = [
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
  let i = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), o = !1, d = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let m = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function g(b) {
    h.has(b) && (p.schedule(b), t()), b(m);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (b, v = !1, S = !1) => {
      const w = S && o ? i : l;
      return v && h.add(b), w.add(b), b;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (b) => {
      l.delete(b), h.delete(b);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (b) => {
      if (m = b, o) {
        d = !0;
        return;
      }
      o = !0;
      const v = i;
      i = l, l = v, i.forEach(g), i.clear(), o = !1, d && (d = !1, p.process(b));
    }
  };
  return p;
}
const AD = 40;
function C1(t, a) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => i = !0, h = Wo.reduce((z, M) => (z[M] = MD(d), z), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: E, postRender: w } = h, N = () => {
    const z = Sr.useManualTiming, M = z ? o.timestamp : performance.now();
    i = !1, z || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(M - o.timestamp, AD), 1)), o.timestamp = M, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), S.process(o), E.process(o), w.process(o), o.isProcessing = !1, i && a && (l = !1, t(N));
  }, R = () => {
    i = !0, l = !0, o.isProcessing || t(N);
  };
  return { schedule: Wo.reduce((z, M) => {
    const I = h[M];
    return z[M] = (J, ne = !1, A = !1) => (i || R(), I.schedule(J, ne, A)), z;
  }, {}), cancel: (z) => {
    for (let M = 0; M < Wo.length; M++)
      h[Wo[M]].cancel(z);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Wf, state: wc } = /* @__PURE__ */ C1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : es, !0);
let mc;
function DD() {
  mc = void 0;
}
const Dn = {
  now: () => (mc === void 0 && Dn.set(wc.isProcessing || Sr.useManualTiming ? wc.timestamp : performance.now()), mc),
  set: (t) => {
    mc = t, queueMicrotask(DD);
  }
}, R1 = (t) => (a) => typeof a == "string" && a.startsWith(t), _1 = /* @__PURE__ */ R1("--"), zD = /* @__PURE__ */ R1("var(--"), Gh = (t) => zD(t) ? OD.test(t.split("/*")[0].trim()) : !1, OD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function K0(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ts = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...ts,
  transform: (t) => xr(0, 1, t)
}, ec = {
  ...ts,
  default: 1
}, ul = (t) => Math.round(t * 1e5) / 1e5, Xh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function kD(t) {
  return t == null;
}
const LD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Ph = (t, a) => (i) => !!(typeof i == "string" && LD.test(i) && i.startsWith(t) || a && !kD(i) && Object.prototype.hasOwnProperty.call(i, a)), M1 = (t, a, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, d, h, m] = l.match(Xh);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(d),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, UD = (t) => xr(0, 255, t), Cf = {
  ...ts,
  transform: (t) => Math.round(UD(t))
}, Gr = {
  test: /* @__PURE__ */ Ph("rgb", "red"),
  parse: /* @__PURE__ */ M1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: l = 1 }) => "rgba(" + Cf.transform(t) + ", " + Cf.transform(a) + ", " + Cf.transform(i) + ", " + ul(yl.transform(l)) + ")"
};
function BD(t) {
  let a = "", i = "", l = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), l = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), l = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, l += l, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const eh = {
  test: /* @__PURE__ */ Ph("#"),
  parse: BD,
  transform: Gr.transform
}, _l = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), pr = /* @__PURE__ */ _l("deg"), Pi = /* @__PURE__ */ _l("%"), we = /* @__PURE__ */ _l("px"), VD = /* @__PURE__ */ _l("vh"), $D = /* @__PURE__ */ _l("vw"), Q0 = {
  ...Pi,
  parse: (t) => Pi.parse(t) / 100,
  transform: (t) => Pi.transform(t * 100)
}, Yi = {
  test: /* @__PURE__ */ Ph("hsl", "hue"),
  parse: /* @__PURE__ */ M1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(t) + ", " + Pi.transform(ul(a)) + ", " + Pi.transform(ul(i)) + ", " + ul(yl.transform(l)) + ")"
}, Vt = {
  test: (t) => Gr.test(t) || eh.test(t) || Yi.test(t),
  parse: (t) => Gr.test(t) ? Gr.parse(t) : Yi.test(t) ? Yi.parse(t) : eh.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Gr.transform(t) : Yi.transform(t),
  getAnimatableNone: (t) => {
    const a = Vt.parse(t);
    return a.alpha = 0, Vt.transform(a);
  }
}, HD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function qD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Xh)?.length || 0) + (t.match(HD)?.length || 0) > 0;
}
const A1 = "number", D1 = "color", ID = "var", FD = "var(", Z0 = "${}", YD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ji(t) {
  const a = t.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let d = 0;
  const m = a.replace(YD, (g) => (Vt.test(g) ? (l.color.push(d), o.push(D1), i.push(Vt.parse(g))) : g.startsWith(FD) ? (l.var.push(d), o.push(ID), i.push(g)) : (l.number.push(d), o.push(A1), i.push(parseFloat(g))), ++d, Z0)).split(Z0);
  return { values: i, split: m, indexes: l, types: o };
}
function GD(t) {
  return Ji(t).values;
}
function z1({ split: t, types: a }) {
  const i = t.length;
  return (l) => {
    let o = "";
    for (let d = 0; d < i; d++)
      if (o += t[d], l[d] !== void 0) {
        const h = a[d];
        h === A1 ? o += ul(l[d]) : h === D1 ? o += Vt.transform(l[d]) : o += l[d];
      }
    return o;
  };
}
function XD(t) {
  return z1(Ji(t));
}
const PD = (t) => typeof t == "number" ? 0 : Vt.test(t) ? Vt.getAnimatableNone(t) : t, KD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : PD(t);
function QD(t) {
  const a = Ji(t);
  return z1(a)(a.values.map((l, o) => KD(l, a.split[o])));
}
const ra = {
  test: qD,
  parse: GD,
  createTransformer: XD,
  getAnimatableNone: QD
};
function Rf(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function ZD({ hue: t, saturation: a, lightness: i, alpha: l }) {
  t /= 360, a /= 100, i /= 100;
  let o = 0, d = 0, h = 0;
  if (!a)
    o = d = h = i;
  else {
    const m = i < 0.5 ? i * (1 + a) : i + a - i * a, g = 2 * i - m;
    o = Rf(g, m, t + 1 / 3), d = Rf(g, m, t), h = Rf(g, m, t - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: l
  };
}
function Ec(t, a) {
  return (i) => i > 0 ? a : t;
}
const Ml = (t, a, i) => t + (a - t) * i, _f = (t, a, i) => {
  const l = t * t, o = i * (a * a - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, JD = [eh, Gr, Yi], WD = (t) => JD.find((a) => a.test(t));
function J0(t) {
  const a = WD(t);
  if (Cl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Yi && (i = ZD(i)), i;
}
const W0 = (t, a) => {
  const i = J0(t), l = J0(a);
  if (!i || !l)
    return Ec(t, a);
  const o = { ...i };
  return (d) => (o.red = _f(i.red, l.red, d), o.green = _f(i.green, l.green, d), o.blue = _f(i.blue, l.blue, d), o.alpha = Ml(i.alpha, l.alpha, d), Gr.transform(o));
}, th = /* @__PURE__ */ new Set(["none", "hidden"]);
function e5(t, a) {
  return th.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function t5(t, a) {
  return (i) => Ml(t, a, i);
}
function Kh(t) {
  return typeof t == "number" ? t5 : typeof t == "string" ? Gh(t) ? Ec : Vt.test(t) ? W0 : r5 : Array.isArray(t) ? O1 : typeof t == "object" ? Vt.test(t) ? W0 : n5 : Ec;
}
function O1(t, a) {
  const i = [...t], l = i.length, o = t.map((d, h) => Kh(d)(d, a[h]));
  return (d) => {
    for (let h = 0; h < l; h++)
      i[h] = o[h](d);
    return i;
  };
}
function n5(t, a) {
  const i = { ...t, ...a }, l = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (l[o] = Kh(t[o])(t[o], a[o]));
  return (o) => {
    for (const d in l)
      i[d] = l[d](o);
    return i;
  };
}
function a5(t, a) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const d = a.types[o], h = t.indexes[d][l[d]], m = t.values[h] ?? 0;
    i[o] = m, l[d]++;
  }
  return i;
}
const r5 = (t, a) => {
  const i = ra.createTransformer(a), l = Ji(t), o = Ji(a);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? th.has(t) && !o.values.length || th.has(a) && !l.values.length ? e5(t, a) : Vc(O1(a5(l, o), o.values), i) : (Cl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ec(t, a));
};
function k1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? Ml(t, a, i) : Kh(t)(t, a);
}
const i5 = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Wf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => wc.isProcessing ? wc.timestamp : Dn.now()
  };
}, L1 = (t, a, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let d = 0; d < o; d++)
    l += Math.round(t(d / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, jc = 2e4;
function Qh(t) {
  let a = 0;
  const i = 50;
  let l = t.next(a);
  for (; !l.done && a < jc; )
    a += i, l = t.next(a);
  return a >= jc ? 1 / 0 : a;
}
function s5(t, a = 100, i) {
  const l = i({ ...t, keyframes: [0, a] }), o = Math.min(Qh(l), jc);
  return {
    type: "keyframes",
    ease: (d) => l.next(o * d).value / a,
    duration: /* @__PURE__ */ aa(o)
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
function nh(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const l5 = 12;
function o5(t, a, i) {
  let l = i;
  for (let o = 1; o < l5; o++)
    l = l - t(l) / a(l);
  return l;
}
const Mf = 1e-3;
function c5({ duration: t = Et.duration, bounce: a = Et.bounce, velocity: i = Et.velocity, mass: l = Et.mass }) {
  let o, d;
  Cl(t <= /* @__PURE__ */ Xn(Et.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(Et.minDamping, Et.maxDamping, h), t = xr(Et.minDuration, Et.maxDuration, /* @__PURE__ */ aa(t)), h < 1 ? (o = (p) => {
    const b = p * h, v = b * t, S = b - i, E = nh(p, h), w = Math.exp(-v);
    return Mf - S / E * w;
  }, d = (p) => {
    const v = p * h * t, S = v * i + i, E = Math.pow(h, 2) * Math.pow(p, 2) * t, w = Math.exp(-v), N = nh(Math.pow(p, 2), h);
    return (-o(p) + Mf > 0 ? -1 : 1) * ((S - E) * w) / N;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - i) * t + 1;
    return -Mf + b * v;
  }, d = (p) => {
    const b = Math.exp(-p * t), v = (i - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, g = o5(o, d, m);
  if (t = /* @__PURE__ */ Xn(t), isNaN(g))
    return {
      stiffness: Et.stiffness,
      damping: Et.damping,
      duration: t
    };
  {
    const p = Math.pow(g, 2) * l;
    return {
      stiffness: p,
      damping: h * 2 * Math.sqrt(l * p),
      duration: t
    };
  }
}
const u5 = ["duration", "bounce"], d5 = ["stiffness", "damping", "mass"];
function eb(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function f5(t) {
  let a = {
    velocity: Et.velocity,
    stiffness: Et.stiffness,
    damping: Et.damping,
    mass: Et.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!eb(t, d5) && eb(t, u5))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, d = 2 * xr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: Et.mass,
        stiffness: o,
        damping: d
      };
    } else {
      const i = c5({ ...t, velocity: 0 });
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
  let { restSpeed: l, restDelta: o } = i;
  const d = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: d }, { stiffness: g, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: E } = f5({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), w = S || 0, N = p / (2 * Math.sqrt(g * b)), R = h - d, T = /* @__PURE__ */ aa(Math.sqrt(g / b)), k = Math.abs(R) < 5;
  l || (l = k ? Et.restSpeed.granular : Et.restSpeed.default), o || (o = k ? Et.restDelta.granular : Et.restDelta.default);
  let z, M, I, J, ne, A;
  if (N < 1)
    I = nh(T, N), J = (w + N * T * R) / I, z = (F) => {
      const ie = Math.exp(-N * T * F);
      return h - ie * (J * Math.sin(I * F) + R * Math.cos(I * F));
    }, ne = N * T * J + R * I, A = N * T * R - J * I, M = (F) => Math.exp(-N * T * F) * (ne * Math.sin(I * F) + A * Math.cos(I * F));
  else if (N === 1) {
    z = (ie) => h - Math.exp(-T * ie) * (R + (w + T * R) * ie);
    const F = w + T * R;
    M = (ie) => Math.exp(-T * ie) * (T * F * ie - w);
  } else {
    const F = T * Math.sqrt(N * N - 1);
    z = (ce) => {
      const W = Math.exp(-N * T * ce), O = Math.min(F * ce, 300);
      return h - W * ((w + N * T * R) * Math.sinh(O) + F * R * Math.cosh(O)) / F;
    };
    const ie = (w + N * T * R) / F, re = N * T * ie - R * F, te = N * T * R - ie * F;
    M = (ce) => {
      const W = Math.exp(-N * T * ce), O = Math.min(F * ce, 300);
      return W * (re * Math.sinh(O) + te * Math.cosh(O));
    };
  }
  const q = {
    calculatedDuration: E && v || null,
    velocity: (F) => /* @__PURE__ */ Xn(M(F)),
    next: (F) => {
      if (!E && N < 1) {
        const re = Math.exp(-N * T * F), te = Math.sin(I * F), ce = Math.cos(I * F), W = h - re * (J * te + R * ce), O = /* @__PURE__ */ Xn(re * (ne * te + A * ce));
        return m.done = Math.abs(O) <= l && Math.abs(h - W) <= o, m.value = m.done ? h : W, m;
      }
      const ie = z(F);
      if (E)
        m.done = F >= v;
      else {
        const re = /* @__PURE__ */ Xn(M(F));
        m.done = Math.abs(re) <= l && Math.abs(h - ie) <= o;
      }
      return m.value = m.done ? h : ie, m;
    },
    toString: () => {
      const F = Math.min(Qh(q), jc), ie = L1((re) => q.next(F * re).value, F, 30);
      return F + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return q;
}
Nc.applyToOptions = (t) => {
  const a = s5(t, 100, Nc);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Xn(a.duration), t.type = "keyframes", t;
};
const h5 = 5;
function U1(t, a, i) {
  const l = Math.max(a - h5, 0);
  return g1(i - t(l), a - l);
}
function ah({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: d = 500, modifyTarget: h, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], S = {
    done: !1,
    value: v
  }, E = (A) => m !== void 0 && A < m || g !== void 0 && A > g, w = (A) => m === void 0 ? g : g === void 0 || Math.abs(m - A) < Math.abs(g - A) ? m : g;
  let N = i * a;
  const R = v + N, T = h === void 0 ? R : h(R);
  T !== R && (N = T - v);
  const k = (A) => -N * Math.exp(-A / l), z = (A) => T + k(A), M = (A) => {
    const q = k(A), F = z(A);
    S.done = Math.abs(q) <= p, S.value = S.done ? T : F;
  };
  let I, J;
  const ne = (A) => {
    E(S.value) && (I = A, J = Nc({
      keyframes: [S.value, w(S.value)],
      velocity: U1(z, A, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: d,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (A) => {
      let q = !1;
      return !J && I === void 0 && (q = !0, M(A), ne(A)), I !== void 0 && A >= I ? J.next(A - I) : (!q && M(A), S);
    }
  };
}
function m5(t, a, i) {
  const l = [], o = i || Sr.mix || k1, d = t.length - 1;
  for (let h = 0; h < d; h++) {
    let m = o(t[h], t[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || es : a;
      m = Vc(g, m);
    }
    l.push(m);
  }
  return l;
}
function p5(t, a, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const d = t.length;
  if (Zi(d === a.length, "Both input and output ranges must be the same length", "range-length"), d === 1)
    return () => a[0];
  if (d === 2 && a[0] === a[1])
    return () => a[1];
  const h = t[0] === t[1];
  t[0] > t[d - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = m5(a, l, o), g = m.length, p = (b) => {
    if (h && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ p1(t[v], t[v + 1], b);
    return m[v](S);
  };
  return i ? (b) => p(xr(t[0], t[d - 1], b)) : p;
}
function v5(t, a) {
  const i = t[t.length - 1];
  for (let l = 1; l <= a; l++) {
    const o = /* @__PURE__ */ p1(0, a, l);
    t.push(Ml(i, 1, o));
  }
}
function g5(t) {
  const a = [0];
  return v5(a, t.length - 1), a;
}
function y5(t, a) {
  return t.map((i) => i * a);
}
function b5(t, a) {
  return t.map(() => a || N1).splice(0, t.length - 1);
}
function dl({ duration: t = 300, keyframes: a, times: i, ease: l = "easeInOut" }) {
  const o = RD(l) ? l.map(P0) : P0(l), d = {
    done: !1,
    value: a[0]
  }, h = y5(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : g5(a),
    t
  ), m = p5(h, a, {
    ease: Array.isArray(o) ? o : b5(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (d.value = m(g), d.done = g >= t, d)
  };
}
const x5 = (t) => t !== null;
function $c(t, { repeat: a, repeatType: i = "loop" }, l, o = 1) {
  const d = t.filter(x5), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : d.length - 1;
  return !m || l === void 0 ? d[m] : l;
}
const S5 = {
  decay: ah,
  inertia: ah,
  tween: dl,
  keyframes: dl,
  spring: Nc
};
function B1(t) {
  typeof t.type == "string" && (t.type = S5[t.type]);
}
class Zh {
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
const w5 = (t) => t / 100;
class Tc extends Zh {
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
    B1(a);
    const { type: i = dl, repeat: l = 0, repeatDelay: o = 0, repeatType: d, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const g = i || dl;
    g !== dl && typeof m[0] != "number" && (this.mixKeyframes = Vc(w5, k1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    d === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Qh(p));
    const { calculatedDuration: b } = p;
    this.calculatedDuration = b, this.resolvedDuration = b + o, this.totalDuration = this.resolvedDuration * (l + 1) - o, this.generator = p;
  }
  updateTime(a) {
    const i = Math.round(a - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(a, i = !1) {
    const { generator: l, totalDuration: o, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: m, calculatedDuration: g } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: E, type: w, onUpdate: N, finalKeyframe: R } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const T = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? T < 0 : T > o;
    this.currentTime = Math.max(T, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let z = this.currentTime, M = l;
    if (v) {
      const A = Math.min(this.currentTime, o) / m;
      let q = Math.floor(A), F = A % 1;
      !F && A >= 1 && (F = 1), F === 1 && q--, q = Math.min(q, v + 1), !!(q % 2) && (S === "reverse" ? (F = 1 - F, E && (F -= E / m)) : S === "mirror" && (M = h)), z = xr(0, 1, F) * m;
    }
    let I;
    k ? (this.delayState.value = b[0], I = this.delayState) : I = M.next(z), d && !k && (I.value = d(I.value));
    let { done: J } = I;
    !k && g !== null && (J = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && J);
    return ne && w !== ah && (I.value = $c(b, this.options, R, this.speed)), N && N(I.value), ne && this.finish(), I;
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
    return /* @__PURE__ */ aa(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(this.currentTime);
  }
  set time(a) {
    a = /* @__PURE__ */ Xn(a), this.currentTime = a, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = a : this.driver && (this.startTime = this.driver.now() - a / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = a, this.tick(a));
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
    return U1((l) => this.generator.next(l).value, a, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(a) {
    const i = this.playbackSpeed !== a;
    i && this.driver && this.updateTime(Dn.now()), this.playbackSpeed = a, i && this.driver && (this.time = /* @__PURE__ */ aa(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: a = i5, startTime: i } = this.options;
    this.driver || (this.driver = a((o) => this.tick(o))), this.options.onPlay?.();
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = i ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
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
function E5(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Xr = (t) => t * 180 / Math.PI, rh = (t) => {
  const a = Xr(Math.atan2(t[1], t[0]));
  return ih(a);
}, j5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: rh,
  rotateZ: rh,
  skewX: (t) => Xr(Math.atan(t[1])),
  skewY: (t) => Xr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, ih = (t) => (t = t % 360, t < 0 && (t += 360), t), tb = rh, nb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), ab = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), N5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: nb,
  scaleY: ab,
  scale: (t) => (nb(t) + ab(t)) / 2,
  rotateX: (t) => ih(Xr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => ih(Xr(Math.atan2(-t[2], t[0]))),
  rotateZ: tb,
  rotate: tb,
  skewX: (t) => Xr(Math.atan(t[4])),
  skewY: (t) => Xr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function sh(t) {
  return t.includes("scale") ? 1 : 0;
}
function lh(t, a) {
  if (!t || t === "none")
    return sh(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = N5, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = j5, o = m;
  }
  if (!o)
    return sh(a);
  const d = l[a], h = o[1].split(",").map(C5);
  return typeof d == "function" ? d(h) : h[d];
}
const T5 = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return lh(i, a);
};
function C5(t) {
  return parseFloat(t.trim());
}
const ns = [
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
], as = new Set(ns), rb = (t) => t === ts || t === we, R5 = /* @__PURE__ */ new Set(["x", "y", "z"]), _5 = ns.filter((t) => !R5.has(t));
function M5(t) {
  const a = [];
  return _5.forEach((i) => {
    const l = t.getValue(i);
    l !== void 0 && (a.push([i, l.get()]), l.set(i.startsWith("scale") ? 1 : 0));
  }), a;
}
const br = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: a = "0", paddingRight: i = "0", boxSizing: l }) => {
    const o = t.max - t.min;
    return l === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  height: ({ y: t }, { paddingTop: a = "0", paddingBottom: i = "0", boxSizing: l }) => {
    const o = t.max - t.min;
    return l === "border-box" ? o : o - parseFloat(a) - parseFloat(i);
  },
  top: (t, { top: a }) => parseFloat(a),
  left: (t, { left: a }) => parseFloat(a),
  bottom: ({ y: t }, { top: a }) => parseFloat(a) + (t.max - t.min),
  right: ({ x: t }, { left: a }) => parseFloat(a) + (t.max - t.min),
  // Transform
  x: (t, { transform: a }) => lh(a, "x"),
  y: (t, { transform: a }) => lh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Kr = /* @__PURE__ */ new Set();
let oh = !1, ch = !1, uh = !1;
function V1() {
  if (ch) {
    const t = Array.from(Kr).filter((l) => l.needsMeasurement), a = new Set(t.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    a.forEach((l) => {
      const o = M5(l);
      o.length && (i.set(l, o), l.render());
    }), t.forEach((l) => l.measureInitialState()), a.forEach((l) => {
      l.render();
      const o = i.get(l);
      o && o.forEach(([d, h]) => {
        l.getValue(d)?.set(h);
      });
    }), t.forEach((l) => l.measureEndState()), t.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  ch = !1, oh = !1, Kr.forEach((t) => t.complete(uh)), Kr.clear();
}
function $1() {
  Kr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (ch = !0);
  });
}
function A5() {
  uh = !0, $1(), V1(), uh = !1;
}
class Jh {
  constructor(a, i, l, o, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = l, this.motionValue = o, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Kr.add(this), oh || (oh = !0, Pn.read($1), Pn.resolveKeyframes(V1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, name: i, element: l, motionValue: o } = this;
    if (a[0] === null) {
      const d = o?.get(), h = a[a.length - 1];
      if (d !== void 0)
        a[0] = d;
      else if (l && i) {
        const m = l.readValue(i, h);
        m != null && (a[0] = m);
      }
      a[0] === void 0 && (a[0] = h), o && d === void 0 && o.set(a[0]);
    }
    E5(a);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, a), Kr.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Kr.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const D5 = (t) => t.startsWith("--");
function H1(t, a, i) {
  D5(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const z5 = {};
function q1(t, a) {
  const i = /* @__PURE__ */ m1(t);
  return () => z5[a] ?? i();
}
const O5 = /* @__PURE__ */ q1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), I1 = /* @__PURE__ */ q1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ll = ([t, a, i, l]) => `cubic-bezier(${t}, ${a}, ${i}, ${l})`, ib = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ll([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ll([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ll([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ll([0.33, 1.53, 0.69, 0.99])
};
function F1(t, a) {
  if (t)
    return typeof t == "function" ? I1() ? L1(t, a) : "ease-out" : T1(t) ? ll(t) : Array.isArray(t) ? t.map((i) => F1(i, a) || ib.easeOut) : ib[t];
}
function k5(t, a, i, { delay: l = 0, duration: o = 300, repeat: d = 0, repeatType: h = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = F1(m, o);
  Array.isArray(v) && (b.easing = v);
  const S = {
    delay: l,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return p && (S.pseudoElement = p), t.animate(b, S);
}
function Y1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function L5({ type: t, ...a }) {
  return Y1(t) && I1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class G1 extends Zh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = a, Zi(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = L5(a);
    this.animation = k5(i, l, o, p, d), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const b = $c(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), H1(i, l, b), this.animation.cancel();
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
    return /* @__PURE__ */ aa(Number(a));
  }
  get iterationDuration() {
    const { delay: a = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ aa(a);
  }
  get time() {
    return /* @__PURE__ */ aa(Number(this.animation.currentTime) || 0);
  }
  set time(a) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Xn(a), i && this.animation.pause();
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
  attachTimeline({ timeline: a, rangeStart: i, rangeEnd: l, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && O5() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), es) : o(this);
  }
}
const X1 = {
  anticipate: E1,
  backInOut: w1,
  circInOut: j1
};
function U5(t) {
  return t in X1;
}
function B5(t) {
  typeof t.ease == "string" && U5(t.ease) && (t.ease = X1[t.ease]);
}
const Af = 10;
class V5 extends G1 {
  constructor(a) {
    B5(a), B1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const { motionValue: i, onUpdate: l, onComplete: o, element: d, ...h } = this.options;
    if (!i)
      return;
    if (a !== void 0) {
      i.set(a);
      return;
    }
    const m = new Tc({
      ...h,
      autoplay: !1
    }), g = Math.max(Af, Dn.now() - this.startTime), p = xr(0, Af, g - Af), b = m.sample(g).value, { name: v } = this.options;
    d && v && H1(d, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const sb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ra.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function $5(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function H5(t, a, i, l) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const d = t[t.length - 1], h = sb(o, a), m = sb(d, a);
  return Cl(h === m, `You are trying to animate ${a} from "${o}" to "${d}". "${h ? d : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : $5(t) || (i === "spring" || Y1(i)) && l;
}
function dh(t) {
  t.duration = 0, t.type = "keyframes";
}
const P1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), q5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function I5(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && q5.test(t[a]))
      return !0;
  return !1;
}
const F5 = /* @__PURE__ */ new Set([
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
]), Y5 = /* @__PURE__ */ m1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function G5(t) {
  const { motionValue: a, name: i, repeatDelay: l, repeatType: o, damping: d, type: h, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return Y5() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (P1.has(i) || F5.has(i) && I5(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && o !== "mirror" && d !== 0 && h !== "inertia";
}
const X5 = 40;
class P5 extends Zh {
  constructor({ autoplay: a = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: m, name: g, motionValue: p, element: b, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Dn.now();
    const S = {
      autoplay: a,
      delay: i,
      type: l,
      repeat: o,
      repeatDelay: d,
      repeatType: h,
      name: g,
      motionValue: p,
      element: b,
      ...v
    }, E = b?.KeyframeResolver || Jh;
    this.keyframeResolver = new E(m, (w, N, R) => this.onKeyframesResolved(w, N, S, !R), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: m, delay: g, isHandoff: p, onUpdate: b } = l;
    this.resolvedAt = Dn.now();
    let v = !0;
    H5(a, d, h, m) || (v = !1, (Sr.instantAnimations || !g) && b?.($c(a, l, i)), a[0] = a[a.length - 1], dh(l), l.repeat = 0);
    const E = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > X5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: a
    }, w = v && !p && G5(E), N = E.motionValue?.owner?.current;
    let R;
    if (w)
      try {
        R = new V5({
          ...E,
          element: N
        });
      } catch {
        R = new Tc(E);
      }
    else
      R = new Tc(E);
    R.finished.then(() => {
      this.notifyFinished();
    }).catch(es), this.pendingTimeline && (this.stopTimeline = R.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = R;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), A5()), this._animation;
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
function K1(t, a, i, l = 0, o = 1) {
  const d = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = t.size, m = (h - 1) * l;
  return typeof i == "function" ? i(d, h) : o === 1 ? d * l : m - d * l;
}
const K5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Q5(t) {
  const a = K5.exec(t);
  if (!a)
    return [,];
  const [, i, l, o] = a;
  return [`--${i ?? l}`, o];
}
const Z5 = 4;
function Q1(t, a, i = 1) {
  Zi(i <= Z5, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, o] = Q5(t);
  if (!l)
    return;
  const d = window.getComputedStyle(a).getPropertyValue(l);
  if (d) {
    const h = d.trim();
    return f1(h) ? parseFloat(h) : h;
  }
  return Gh(o) ? Q1(o, a, i + 1) : o;
}
const J5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, W5 = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), ez = {
  type: "keyframes",
  duration: 0.8
}, tz = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, nz = (t, { keyframes: a }) => a.length > 2 ? ez : as.has(t) ? t.startsWith("scale") ? W5(a[1]) : J5 : tz;
function Z1(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...l } = t;
    return { ...a, ...l };
  }
  return t;
}
function J1(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? Z1(i, t) : i;
}
const az = /* @__PURE__ */ new Set([
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
function rz(t) {
  for (const a in t)
    if (!az.has(a))
      return !0;
  return !1;
}
const iz = (t, a, i, l = {}, o, d) => (h) => {
  const m = J1(l, t) || {}, g = m.delay || l.delay || 0;
  let { elapsed: p = 0 } = l;
  p = p - /* @__PURE__ */ Xn(g);
  const b = {
    keyframes: Array.isArray(i) ? i : [null, i],
    ease: "easeOut",
    velocity: a.getVelocity(),
    ...m,
    delay: -p,
    onUpdate: (S) => {
      a.set(S), m.onUpdate && m.onUpdate(S);
    },
    onComplete: () => {
      h(), m.onComplete && m.onComplete();
    },
    name: t,
    motionValue: a,
    element: d ? void 0 : o
  };
  rz(m) || Object.assign(b, nz(t, b)), b.duration && (b.duration = /* @__PURE__ */ Xn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Xn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (dh(b), b.delay === 0 && (v = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, dh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !d && a.get() !== void 0) {
    const S = $c(b.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Tc(b) : new P5(b);
};
function lb(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, l) => {
    a[0][l] = i.get(), a[1][l] = i.getVelocity();
  }), a;
}
function Wh(t, a, i, l) {
  if (typeof a == "function") {
    const [o, d] = lb(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  if (typeof a == "string" && (a = t.variants && t.variants[a]), typeof a == "function") {
    const [o, d] = lb(l);
    a = a(i !== void 0 ? i : t.custom, o, d);
  }
  return a;
}
function Qr(t, a, i) {
  const l = t.getProps();
  return Wh(l, a, i !== void 0 ? i : l.custom, t);
}
const W1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ns
]), ob = 30, sz = (t) => !isNaN(parseFloat(t));
class lz {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(a, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      const o = Dn.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(a), this.owner = i.owner;
  }
  setCurrent(a) {
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = sz(this.current));
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
    this.events[a] || (this.events[a] = new v1());
    const l = this.events[a].add(i);
    return a === "change" ? () => {
      l(), Pn.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : l;
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
  setWithVelocity(a, i, l) {
    this.set(i), this.prev = void 0, this.prevFrameValue = a, this.prevUpdatedAt = this.updatedAt - l;
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || a - this.updatedAt > ob)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, ob);
    return g1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
  return new lz(t, a);
}
const fh = (t) => Array.isArray(t);
function oz(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Cc(i));
}
function cz(t) {
  return fh(t) ? t[t.length - 1] || 0 : t;
}
function uz(t, a) {
  const i = Qr(t, a);
  let { transitionEnd: l = {}, transition: o = {}, ...d } = i || {};
  d = { ...d, ...l };
  for (const h in d) {
    const m = cz(d[h]);
    oz(t, h, m);
  }
}
const un = (t) => !!(t && t.getVelocity);
function dz(t) {
  return !!(un(t) && t.add);
}
function fz(t, a) {
  const i = t.getValue("willChange");
  if (dz(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const l = new Sr.WillChange("auto");
    t.addValue("willChange", l), l.add(a);
  }
}
function em(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const hz = "framerAppearId", eS = "data-" + em(hz);
function mz(t) {
  return t.props[eS];
}
function pz({ protectedKeys: t, needsAnimating: a }, i) {
  const l = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, l;
}
function tS(t, a, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: d, transitionEnd: h, ...m } = a;
  const g = t.getDefaultTransition();
  d = d ? Z1(d, g) : g;
  const p = d?.reduceMotion;
  l && (d = l);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const S in m) {
    const E = t.getValue(S, t.latestValues[S] ?? null), w = m[S];
    if (w === void 0 || v && pz(v, S))
      continue;
    const N = {
      delay: i,
      ...J1(d || {}, S)
    }, R = E.get();
    if (R !== void 0 && !E.isAnimating() && !Array.isArray(w) && w === R && !N.velocity) {
      Pn.update(() => E.set(w));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const M = mz(t);
      if (M) {
        const I = window.MotionHandoffAnimation(M, S, Pn);
        I !== null && (N.startTime = I, T = !0);
      }
    }
    fz(t, S);
    const k = p ?? t.shouldReduceMotion;
    E.start(iz(S, E, w, k && W1.has(S) ? { type: !1 } : N, t, T));
    const z = E.animation;
    z && b.push(z);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && uz(t, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function hh(t, a, i = {}) {
  const l = Qr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const d = l ? () => Promise.all(tS(t, l, i)) : () => Promise.resolve(), h = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return vz(t, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [d, h] : [h, d];
    return g().then(() => p());
  } else
    return Promise.all([d(), h(i.delay)]);
}
function vz(t, a, i = 0, l = 0, o = 0, d = 1, h) {
  const m = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), m.push(hh(g, a, {
      ...h,
      delay: i + (typeof l == "function" ? 0 : l) + K1(t.variantChildren, g, l, o, d)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function gz(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let l;
  if (Array.isArray(a)) {
    const o = a.map((d) => hh(t, d, i));
    l = Promise.all(o);
  } else if (typeof a == "string")
    l = hh(t, a, i);
  else {
    const o = typeof a == "function" ? Qr(t, a, i.custom) : a;
    l = Promise.all(tS(t, o, i));
  }
  return l.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const yz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, nS = (t) => (a) => a.test(t), aS = [ts, we, Pi, pr, $D, VD, yz], cb = (t) => aS.find(nS(t));
function bz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || h1(t) : !0;
}
const xz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Sz(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [l] = i.match(Xh) || [];
  if (!l)
    return t;
  const o = i.replace(l, "");
  let d = xz.has(a) ? 1 : 0;
  return l !== i && (d *= 100), a + "(" + d + o + ")";
}
const wz = /\b([a-z-]*)\(.*?\)/gu, mh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = t.match(wz);
    return a ? a.map(Sz).join(" ") : t;
  }
}, ph = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = ra.parse(t);
    return ra.createTransformer(t)(a.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, ub = {
  ...ts,
  transform: Math.round
}, Ez = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: ec,
  scaleX: ec,
  scaleY: ec,
  scaleZ: ec,
  skew: pr,
  skewX: pr,
  skewY: pr,
  distance: we,
  translateX: we,
  translateY: we,
  translateZ: we,
  x: we,
  y: we,
  z: we,
  perspective: we,
  transformPerspective: we,
  opacity: yl,
  originX: Q0,
  originY: Q0,
  originZ: we
}, tm = {
  // Border props
  borderWidth: we,
  borderTopWidth: we,
  borderRightWidth: we,
  borderBottomWidth: we,
  borderLeftWidth: we,
  borderRadius: we,
  borderTopLeftRadius: we,
  borderTopRightRadius: we,
  borderBottomRightRadius: we,
  borderBottomLeftRadius: we,
  // Positioning props
  width: we,
  maxWidth: we,
  height: we,
  maxHeight: we,
  top: we,
  right: we,
  bottom: we,
  left: we,
  inset: we,
  insetBlock: we,
  insetBlockStart: we,
  insetBlockEnd: we,
  insetInline: we,
  insetInlineStart: we,
  insetInlineEnd: we,
  // Spacing props
  padding: we,
  paddingTop: we,
  paddingRight: we,
  paddingBottom: we,
  paddingLeft: we,
  paddingBlock: we,
  paddingBlockStart: we,
  paddingBlockEnd: we,
  paddingInline: we,
  paddingInlineStart: we,
  paddingInlineEnd: we,
  margin: we,
  marginTop: we,
  marginRight: we,
  marginBottom: we,
  marginLeft: we,
  marginBlock: we,
  marginBlockStart: we,
  marginBlockEnd: we,
  marginInline: we,
  marginInlineStart: we,
  marginInlineEnd: we,
  // Typography
  fontSize: we,
  // Misc
  backgroundPositionX: we,
  backgroundPositionY: we,
  ...Ez,
  zIndex: ub,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: ub
}, jz = {
  ...tm,
  // Color props
  color: Vt,
  backgroundColor: Vt,
  outlineColor: Vt,
  fill: Vt,
  stroke: Vt,
  // Border props
  borderColor: Vt,
  borderTopColor: Vt,
  borderRightColor: Vt,
  borderBottomColor: Vt,
  borderLeftColor: Vt,
  filter: mh,
  WebkitFilter: mh,
  mask: ph,
  WebkitMask: ph
}, rS = (t) => jz[t], Nz = /* @__PURE__ */ new Set([mh, ph]);
function iS(t, a) {
  let i = rS(t);
  return Nz.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const Tz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Cz(t, a, i) {
  let l = 0, o;
  for (; l < t.length && !o; ) {
    const d = t[l];
    typeof d == "string" && !Tz.has(d) && Ji(d).values.length && (o = t[l]), l++;
  }
  if (o && i)
    for (const d of a)
      t[d] = iS(i, o);
}
class Rz extends Jh {
  constructor(a, i, l, o, d) {
    super(a, i, l, o, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: a, element: i, name: l } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let b = 0; b < a.length; b++) {
      let v = a[b];
      if (typeof v == "string" && (v = v.trim(), Gh(v))) {
        const S = Q1(v, i.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !W1.has(l) || a.length !== 2)
      return;
    const [o, d] = a, h = cb(o), m = cb(d), g = K0(o), p = K0(d);
    if (g !== p && br[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== m)
      if (rb(h) && rb(m))
        for (let b = 0; b < a.length; b++) {
          const v = a[b];
          typeof v == "string" && (a[b] = parseFloat(v));
        }
      else br[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: a, name: i } = this, l = [];
    for (let o = 0; o < a.length; o++)
      (a[o] === null || bz(a[o])) && l.push(o);
    l.length && Cz(a, l, i);
  }
  measureInitialState() {
    const { element: a, unresolvedKeyframes: i, name: l } = this;
    if (!a || !a.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = br[l](a.measureViewportBox(), window.getComputedStyle(a.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && a.getValue(l, o).jump(o, !1);
  }
  measureEndState() {
    const { element: a, name: i, unresolvedKeyframes: l } = this;
    if (!a || !a.current)
      return;
    const o = a.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const d = l.length - 1, h = l[d];
    l[d] = br[i](a.measureViewportBox(), window.getComputedStyle(a.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([m, g]) => {
      a.getValue(m).set(g);
    }), this.resolveNoneKeyframes();
  }
}
function _z(t, a, i) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let l = document;
    const o = i?.[t] ?? l.querySelectorAll(t);
    return o ? Array.from(o) : [];
  }
  return Array.from(t).filter((l) => l != null);
}
const sS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function pc(t) {
  return xD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: Mz } = /* @__PURE__ */ C1(queueMicrotask, !1), Az = {
  y: !1
};
function Dz() {
  return Az.y;
}
function lS(t, a) {
  const i = _z(t), l = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function zz(t) {
  return !(t.pointerType === "touch" || Dz());
}
function Oz(t, a, i = {}) {
  const [l, o, d] = lS(t, i);
  return l.forEach((h) => {
    let m = !1, g = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", w);
    }, v = (R) => {
      p && (p(R), p = void 0), b();
    }, S = (R) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), g && (g = !1, v(R));
    }, E = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, w = (R) => {
      if (R.pointerType !== "touch") {
        if (m) {
          g = !0;
          return;
        }
        v(R);
      }
    }, N = (R) => {
      if (!zz(R))
        return;
      g = !1;
      const T = a(h, R);
      typeof T == "function" && (p = T, h.addEventListener("pointerleave", w, o));
    };
    h.addEventListener("pointerenter", N, o), h.addEventListener("pointerdown", E, o);
  }), d;
}
const oS = (t, a) => a ? t === a ? !0 : oS(t, a.parentElement) : !1, kz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Lz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Uz(t) {
  return Lz.has(t.tagName) || t.isContentEditable === !0;
}
const vc = /* @__PURE__ */ new WeakSet();
function db(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Df(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Bz = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const l = db(() => {
    if (vc.has(i))
      return;
    Df(i, "down");
    const o = db(() => {
      Df(i, "up");
    }), d = () => Df(i, "cancel");
    i.addEventListener("keyup", o, a), i.addEventListener("blur", d, a);
  });
  i.addEventListener("keydown", l, a), i.addEventListener("blur", () => i.removeEventListener("keydown", l), a);
};
function fb(t) {
  return kz(t) && !0;
}
const hb = /* @__PURE__ */ new WeakSet();
function Vz(t, a, i = {}) {
  const [l, o, d] = lS(t, i), h = (m) => {
    const g = m.currentTarget;
    if (!fb(m) || hb.has(m))
      return;
    vc.add(g), i.stopPropagation && hb.add(m);
    const p = a(g, m), b = (E, w) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), vc.has(g) && vc.delete(g), fb(E) && typeof p == "function" && p(E, { success: w });
    }, v = (E) => {
      b(E, g === window || g === document || i.useGlobalTarget || oS(g, E.target));
    }, S = (E) => {
      b(E, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return l.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), pc(m) && (m.addEventListener("focus", (p) => Bz(p, o)), !Uz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), d;
}
const $z = [...aS, Vt, ra], Hz = (t) => $z.find(nS(t)), mb = () => ({ min: 0, max: 0 }), cS = () => ({
  x: mb(),
  y: mb()
}), qz = /* @__PURE__ */ new WeakMap();
function Hc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const nm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], am = ["initial", ...nm];
function qc(t) {
  return Hc(t.animate) || am.some((a) => bl(t[a]));
}
function uS(t) {
  return !!(qc(t) || t.variants);
}
function Iz(t, a, i) {
  for (const l in a) {
    const o = a[l], d = i[l];
    if (un(o))
      t.addValue(l, o);
    else if (un(d))
      t.addValue(l, Cc(o, { owner: t }));
    else if (d !== o)
      if (t.hasValue(l)) {
        const h = t.getValue(l);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = t.getStaticValue(l);
        t.addValue(l, Cc(h !== void 0 ? h : o, { owner: t }));
      }
  }
  for (const l in i)
    a[l] === void 0 && t.removeValue(l);
  return a;
}
const Rc = { current: null }, rm = { current: !1 }, Fz = typeof window < "u";
function dS() {
  if (rm.current = !0, !!Fz)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Rc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Rc.current = !1;
}
const pb = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let _c = {};
function fS(t) {
  _c = t;
}
function Yz() {
  return _c;
}
class Gz {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(a, i, l) {
    return {};
  }
  constructor({ parent: a, props: i, presenceContext: l, reducedMotionConfig: o, skipAnimations: d, blockInitialAnimation: h, visualState: m }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Jh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = Dn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = l, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = d, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = qc(i), this.isVariantNode = uS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const E in S) {
      const w = S[E];
      p[E] !== void 0 && un(w) && w.set(p[E]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, qz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (rm.current || dS(), this.shouldReduceMotion = Rc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Wf(this.notifyUpdate), Wf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && P1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new G1({
        element: this.current,
        name: a,
        keyframes: m,
        times: g,
        ease: p,
        duration: /* @__PURE__ */ Xn(b)
      }), S = h(v);
      this.valueSubscriptions.set(a, () => {
        S(), v.cancel();
      });
      return;
    }
    const l = as.has(a);
    l && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (h) => {
      this.latestValues[a] = h, this.props.onUpdate && Pn.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, a, i)), this.valueSubscriptions.set(a, () => {
      o(), d && d(), i.owner && i.stop();
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
      const { isEnabled: l, Feature: o } = i;
      if (!this.features[a] && o && l(this.props) && (this.features[a] = new o(this)), this.features[a]) {
        const d = this.features[a];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : cS();
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
    for (let l = 0; l < pb.length; l++) {
      const o = pb[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const d = "on" + o, h = a[d];
      h && (this.propEventSubscriptions[o] = this.on(o, h));
    }
    this.prevMotionValues = Iz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const l = this.values.get(a);
    i !== l && (l && this.removeValue(a), this.bindToMotionValue(a, i), this.values.set(a, i), this.latestValues[a] = i.get());
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
    let l = this.values.get(a);
    return l === void 0 && i !== void 0 && (l = Cc(i === null ? void 0 : i, { owner: this }), this.addValue(a, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let l = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return l != null && (typeof l == "string" && (f1(l) || h1(l)) ? l = parseFloat(l) : !Hz(l) && ra.test(i) && (l = iS(a, i)), this.setBaseTarget(a, un(l) ? l.get() : l)), un(l) ? l.get() : l;
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
    let l;
    if (typeof i == "string" || typeof i == "object") {
      const d = Wh(this.props, i, this.presenceContext?.custom);
      d && (l = d[a]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !un(o) ? o : this.initialValues[a] !== void 0 && l === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new v1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    Mz.render(this.render);
  }
}
class hS extends Gz {
  constructor() {
    super(...arguments), this.KeyframeResolver = Rz;
  }
  sortInstanceNodePosition(a, i) {
    return a.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(a, i) {
    const l = a.style;
    return l ? l[i] : void 0;
  }
  removeValueFromRenderState(a, { vars: i, style: l }) {
    delete i[a], delete l[a];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: a } = this.props;
    un(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class rs {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function Xz({ top: t, left: a, right: i, bottom: l }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: l }
  };
}
function Pz(t, a) {
  if (!a)
    return t;
  const i = a({ x: t.left, y: t.top }), l = a({ x: t.right, y: t.bottom });
  return {
    top: i.y,
    left: i.x,
    bottom: l.y,
    right: l.x
  };
}
function Kz(t, a) {
  return Xz(Pz(t.getBoundingClientRect(), a));
}
const Qz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Zz = ns.length;
function Jz(t, a, i) {
  let l = "", o = !0;
  for (let d = 0; d < Zz; d++) {
    const h = ns[d], m = t[h];
    if (m === void 0)
      continue;
    let g = !0;
    if (typeof m == "number")
      g = m === (h.startsWith("scale") ? 1 : 0);
    else {
      const p = parseFloat(m);
      g = h.startsWith("scale") ? p === 1 : p === 0;
    }
    if (!g || i) {
      const p = sS(m, tm[h]);
      if (!g) {
        o = !1;
        const b = Qz[h] || h;
        l += `${b}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return l = l.trim(), i ? l = i(a, o ? "" : l) : o && (l = "none"), l;
}
function im(t, a, i) {
  const { style: l, vars: o, transformOrigin: d } = t;
  let h = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (as.has(g)) {
      h = !0;
      continue;
    } else if (_1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = sS(p, tm[g]);
      g.startsWith("origin") ? (m = !0, d[g] = b) : l[g] = b;
    }
  }
  if (a.transform || (h || i ? l.transform = Jz(a, t.transform, i) : l.transform && (l.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = d;
    l.transformOrigin = `${g} ${p} ${b}`;
  }
}
function mS(t, { style: a, vars: i }, l, o) {
  const d = t.style;
  let h;
  for (h in a)
    d[h] = a[h];
  o?.applyProjectionStyles(d, l);
  for (h in i)
    d.setProperty(h, i[h]);
}
function vb(t, a) {
  return a.max === a.min ? 0 : t / (a.max - a.min) * 100;
}
const el = {
  correct: (t, a) => {
    if (!a.target)
      return t;
    if (typeof t == "string")
      if (we.test(t))
        t = parseFloat(t);
      else
        return t;
    const i = vb(t, a.target.x), l = vb(t, a.target.y);
    return `${i}% ${l}%`;
  }
}, Wz = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const l = t, o = ra.parse(t);
    if (o.length > 5)
      return l;
    const d = ra.createTransformer(t), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= g;
    const p = Ml(m, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), d(o);
  }
}, e4 = {
  borderRadius: {
    ...el,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: el,
  borderTopRightRadius: el,
  borderBottomLeftRadius: el,
  borderBottomRightRadius: el,
  boxShadow: Wz
};
function pS(t, { layout: a, layoutId: i }) {
  return as.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!e4[t] || t === "opacity");
}
function sm(t, a, i) {
  const l = t.style, o = a?.style, d = {};
  if (!l)
    return d;
  for (const h in l)
    (un(l[h]) || o && un(o[h]) || pS(h, t) || i?.getValue(h)?.liveStyle !== void 0) && (d[h] = l[h]);
  return d;
}
function t4(t) {
  return window.getComputedStyle(t);
}
class n4 extends hS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = mS;
  }
  readValueFromInstance(a, i) {
    if (as.has(i))
      return this.projection?.isProjecting ? sh(i) : T5(a, i);
    {
      const l = t4(a), o = (_1(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return Kz(a, i);
  }
  build(a, i, l) {
    im(a, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return sm(a, i, l);
  }
}
const a4 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, r4 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function i4(t, a, i = 1, l = 0, o = !0) {
  t.pathLength = 1;
  const d = o ? a4 : r4;
  t[d.offset] = `${-l}`, t[d.array] = `${a} ${i}`;
}
const s4 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function vS(t, {
  attrX: a,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (im(t, m, p), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: S } = t;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const E of s4)
    v[E] !== void 0 && (S[E] = v[E], delete v[E]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && i4(v, o, d, h, !1);
}
const gS = /* @__PURE__ */ new Set([
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
]), yS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function l4(t, a, i, l) {
  mS(t, a, void 0, l);
  for (const o in a.attrs)
    t.setAttribute(gS.has(o) ? o : em(o), a.attrs[o]);
}
function bS(t, a, i) {
  const l = sm(t, a, i);
  for (const o in t)
    if (un(t[o]) || un(a[o])) {
      const d = ns.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[d] = t[o];
    }
  return l;
}
class o4 extends hS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = cS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (as.has(i)) {
      const l = rS(i);
      return l && l.default || 0;
    }
    return i = gS.has(i) ? i : em(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return bS(a, i, l);
  }
  build(a, i, l) {
    vS(a, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(a, i, l, o) {
    l4(a, i, l, o);
  }
  mount(a) {
    this.isSVGTag = yS(a.tagName), super.mount(a);
  }
}
const c4 = am.length;
function xS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? xS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < c4; i++) {
    const l = am[i], o = t.props[l];
    (bl(o) || o === !1) && (a[l] = o);
  }
  return a;
}
function SS(t, a) {
  if (!Array.isArray(a))
    return !1;
  const i = a.length;
  if (i !== t.length)
    return !1;
  for (let l = 0; l < i; l++)
    if (a[l] !== t[l])
      return !1;
  return !0;
}
const u4 = [...nm].reverse(), d4 = nm.length;
function f4(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: l }) => gz(t, i, l)));
}
function h4(t) {
  let a = f4(t), i = gb(), l = !0, o = !1;
  const d = (p) => (b, v) => {
    const S = Qr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: w, ...N } = S;
      b = { ...b, ...N, ...w };
    }
    return b;
  };
  function h(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = xS(t.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let w = {}, N = 1 / 0;
    for (let T = 0; T < d4; T++) {
      const k = u4[T], z = i[k], M = b[k] !== void 0 ? b[k] : v[k], I = bl(M), J = k === p ? z.isActive : null;
      J === !1 && (N = T);
      let ne = M === v[k] && M !== b[k] && I;
      if (ne && (l || o) && t.manuallyAnimateOnMount && (ne = !1), z.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !z.isActive && J === null || // If we didn't and don't have any defined prop for this animation type
      !M && !z.prevProp || // Or if the prop doesn't define an animation
      Hc(M) || typeof M == "boolean")
        continue;
      if (k === "exit" && z.isActive && J !== !0) {
        z.prevResolvedValues && (w = {
          ...w,
          ...z.prevResolvedValues
        });
        continue;
      }
      const A = m4(z.prevProp, M);
      let q = A || // If we're making this variant active, we want to always make it active
      k === p && z.isActive && !ne && I || // If we removed a higher-priority variant (i is in reverse order)
      T > N && I, F = !1;
      const ie = Array.isArray(M) ? M : [M];
      let re = ie.reduce(d(k), {});
      J === !1 && (re = {});
      const { prevResolvedValues: te = {} } = z, ce = {
        ...te,
        ...re
      }, W = (U) => {
        q = !0, E.has(U) && (F = !0, E.delete(U)), z.needsAnimating[U] = !0;
        const B = t.getValue(U);
        B && (B.liveStyle = !1);
      };
      for (const U in ce) {
        const B = re[U], Q = te[U];
        if (w.hasOwnProperty(U))
          continue;
        let _ = !1;
        fh(B) && fh(Q) ? _ = !SS(B, Q) : _ = B !== Q, _ ? B != null ? W(U) : E.add(U) : B !== void 0 && E.has(U) ? W(U) : z.protectedKeys[U] = !0;
      }
      z.prevProp = M, z.prevResolvedValues = re, z.isActive && (w = { ...w, ...re }), (l || o) && t.blockInitialAnimation && (q = !1);
      const O = ne && A;
      q && (!O || F) && S.push(...ie.map((U) => {
        const B = { type: k };
        if (typeof U == "string" && (l || o) && !O && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Q } = t, _ = Qr(Q, U);
          if (Q.enteringChildren && _) {
            const { delayChildren: Z } = _.transition || {};
            B.delay = K1(Q.enteringChildren, t, Z);
          }
        }
        return {
          animation: U,
          options: B
        };
      }));
    }
    if (E.size) {
      const T = {};
      if (typeof b.initial != "boolean") {
        const k = Qr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        k && k.transition && (T.transition = k.transition);
      }
      E.forEach((k) => {
        const z = t.getBaseTarget(k), M = t.getValue(k);
        M && (M.liveStyle = !0), T[k] = z ?? null;
      }), S.push({ animation: T });
    }
    let R = !!S.length;
    return l && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (R = !1), l = !1, o = !1, R ? a(S) : Promise.resolve();
  }
  function g(p, b) {
    if (i[p].isActive === b)
      return Promise.resolve();
    t.variantChildren?.forEach((S) => S.animationState?.setActive(p, b)), i[p].isActive = b;
    const v = m(p);
    for (const S in i)
      i[S].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: m,
    setActive: g,
    setAnimateFunction: h,
    getState: () => i,
    reset: () => {
      i = gb(), o = !0;
    }
  };
}
function m4(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !SS(a, t) : !1;
}
function Ir(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function gb() {
  return {
    animate: Ir(!0),
    whileInView: Ir(),
    whileHover: Ir(),
    whileTap: Ir(),
    whileDrag: Ir(),
    whileFocus: Ir(),
    exit: Ir()
  };
}
function yb(t, a, i, l = { passive: !0 }) {
  return t.addEventListener(a, i, l), () => t.removeEventListener(a, i);
}
function p4(t) {
  return un(t) ? t.get() : t;
}
const lm = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function bb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function v4(...t) {
  return (a) => {
    let i = !1;
    const l = t.map((o) => {
      const d = bb(o, a);
      return !i && typeof d == "function" && (i = !0), d;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const d = l[o];
          typeof d == "function" ? d() : bb(t[o], null);
        }
      };
  };
}
function g4(...t) {
  return y.useCallback(v4(...t), t);
}
class y4 extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (pc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = pc(l) && l.offsetWidth || 0, d = pc(l) && l.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
      m.height = parseFloat(h.height), m.width = parseFloat(h.width), m.top = i.offsetTop, m.left = i.offsetLeft, m.right = o - m.width - m.left, m.bottom = d - m.height - m.top;
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
function b4({ children: t, isPresent: a, anchorX: i, anchorY: l, root: o, pop: d }) {
  const h = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(lm), b = t.props?.ref ?? t?.ref, v = g4(m, b);
  return y.useInsertionEffect(() => {
    const { width: S, height: E, top: w, left: N, right: R, bottom: T } = g.current;
    if (a || d === !1 || !m.current || !S || !E)
      return;
    const k = i === "left" ? `left: ${N}` : `right: ${R}`, z = l === "bottom" ? `bottom: ${T}` : `top: ${w}`;
    m.current.dataset.motionPopId = h;
    const M = document.createElement("style");
    p && (M.nonce = p);
    const I = o ?? document.head;
    return I.appendChild(M), M.sheet && M.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${k}px !important;
            ${z}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), I.contains(M) && I.removeChild(M);
    };
  }, [a]), u.jsx(y4, { isPresent: a, childRef: m, sizeRef: g, pop: d, children: d === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const x4 = ({ children: t, initial: a, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: d, mode: h, anchorX: m, anchorY: g, root: p }) => {
  const b = Ih(S4), v = y.useId();
  let S = !0, E = y.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (w) => {
      b.set(w, !0);
      for (const N of b.values())
        if (!N)
          return;
      l && l();
    },
    register: (w) => (b.set(w, !1), () => b.delete(w))
  }), [i, b, l]);
  return d && S && (E = { ...E }), y.useMemo(() => {
    b.forEach((w, N) => b.set(N, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && l && l();
  }, [i]), t = u.jsx(b4, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: t }), u.jsx(Bc.Provider, { value: E, children: t });
};
function S4() {
  return /* @__PURE__ */ new Map();
}
function w4(t = !0) {
  const a = y.useContext(Bc);
  if (a === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: l, register: o } = a, d = y.useId();
  y.useEffect(() => {
    if (t)
      return o(d);
  }, [t]);
  const h = y.useCallback(() => t && l && l(d), [d, l, t]);
  return !i && l ? [!1, h] : [!0];
}
const tc = (t) => t.key || "";
function xb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const wS = ({ children: t, custom: a, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: d = "sync", propagate: h = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = w4(h), S = y.useMemo(() => xb(t), [t]), E = h && !b ? [] : S.map(tc), w = y.useRef(!0), N = y.useRef(S), R = Ih(() => /* @__PURE__ */ new Map()), T = y.useRef(/* @__PURE__ */ new Set()), [k, z] = y.useState(S), [M, I] = y.useState(S);
  d1(() => {
    w.current = !1, N.current = S;
    for (let A = 0; A < M.length; A++) {
      const q = tc(M[A]);
      E.includes(q) ? (R.delete(q), T.current.delete(q)) : R.get(q) !== !0 && R.set(q, !1);
    }
  }, [M, E.length, E.join("-")]);
  const J = [];
  if (S !== k) {
    let A = [...S];
    for (let q = 0; q < M.length; q++) {
      const F = M[q], ie = tc(F);
      E.includes(ie) || (A.splice(q, 0, F), J.push(F));
    }
    return d === "wait" && J.length && (A = J), I(xb(A)), z(S), null;
  }
  const { forceRender: ne } = y.useContext(u1);
  return u.jsx(u.Fragment, { children: M.map((A) => {
    const q = tc(A), F = h && !b ? !1 : S === M || E.includes(q), ie = () => {
      if (T.current.has(q))
        return;
      if (R.has(q))
        T.current.add(q), R.set(q, !0);
      else
        return;
      let re = !0;
      R.forEach((te) => {
        te || (re = !1);
      }), re && (ne?.(), I(N.current), h && v?.(), l && l());
    };
    return u.jsx(x4, { isPresent: F, initial: !w.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: d, root: p, onExitComplete: F ? void 0 : ie, anchorX: m, anchorY: g, children: A }, q);
  }) });
}, om = y.createContext({ strict: !1 }), Sb = {
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
let wb = !1;
function E4() {
  if (wb)
    return;
  const t = {};
  for (const a in Sb)
    t[a] = {
      isEnabled: (i) => Sb[a].some((l) => !!i[l])
    };
  fS(t), wb = !0;
}
function ES() {
  return E4(), Yz();
}
function vh(t) {
  const a = ES();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  fS(a);
}
function cm({ children: t, features: a, strict: i = !1 }) {
  const [, l] = y.useState(!zf(a)), o = y.useRef(void 0);
  if (!zf(a)) {
    const { renderer: d, ...h } = a;
    o.current = d, vh(h);
  }
  return y.useEffect(() => {
    zf(a) && a().then(({ renderer: d, ...h }) => {
      vh(h), o.current = d, l(!0);
    });
  }, []), u.jsx(om.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function zf(t) {
  return typeof t == "function";
}
const j4 = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || j4.has(t);
}
let jS = (t) => !Mc(t);
function N4(t) {
  typeof t == "function" && (jS = (a) => a.startsWith("on") ? !Mc(a) : t(a));
}
try {
  N4(require("@emotion/is-prop-valid").default);
} catch {
}
function T4(t, a, i) {
  const l = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || un(t[o]) || (jS(o) || i === !0 && Mc(o) || !a && !Mc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (l[o] = t[o]);
  return l;
}
const Ic = /* @__PURE__ */ y.createContext({});
function C4(t, a) {
  if (qc(t)) {
    const { initial: i, animate: l } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(l) ? l : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function R4(t) {
  const { initial: a, animate: i } = C4(t, y.useContext(Ic));
  return y.useMemo(() => ({ initial: a, animate: i }), [Eb(a), Eb(i)]);
}
function Eb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const um = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function NS(t, a, i) {
  for (const l in a)
    !un(a[l]) && !pS(l, i) && (t[l] = a[l]);
}
function _4({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = um();
    return im(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function M4(t, a) {
  const i = t.style || {}, l = {};
  return NS(l, i, t), Object.assign(l, _4(t, a)), l;
}
function A4(t, a) {
  const i = {}, l = M4(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const TS = () => ({
  ...um(),
  attrs: {}
});
function D4(t, a, i, l) {
  const o = y.useMemo(() => {
    const d = TS();
    return vS(d, a, yS(l), t.transformTemplate, t.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [a]);
  if (t.style) {
    const d = {};
    NS(d, t.style, t), o.style = { ...d, ...o.style };
  }
  return o;
}
const z4 = [
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
function dm(t) {
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
      !!(z4.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function O4(t, a, i, { latestValues: l }, o, d = !1, h) {
  const g = (h ?? dm(t) ? D4 : A4)(a, l, o, t), p = T4(a, typeof t == "string", d), b = t !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, S = y.useMemo(() => un(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: S
  });
}
function k4({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, l, o) {
  return {
    latestValues: L4(i, l, o, t),
    renderState: a()
  };
}
function L4(t, a, i, l) {
  const o = {}, d = l(t, {});
  for (const S in d)
    o[S] = p4(d[S]);
  let { initial: h, animate: m } = t;
  const g = qc(t), p = uS(t);
  a && p && !g && t.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? m : h;
  if (v && typeof v != "boolean" && !Hc(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let E = 0; E < S.length; E++) {
      const w = Wh(t, S[E]);
      if (w) {
        const { transitionEnd: N, transition: R, ...T } = w;
        for (const k in T) {
          let z = T[k];
          if (Array.isArray(z)) {
            const M = b ? z.length - 1 : 0;
            z = z[M];
          }
          z !== null && (o[k] = z);
        }
        for (const k in N)
          o[k] = N[k];
      }
    }
  }
  return o;
}
const CS = (t) => (a, i) => {
  const l = y.useContext(Ic), o = y.useContext(Bc), d = () => k4(t, a, l, o);
  return i ? d() : Ih(d);
}, U4 = /* @__PURE__ */ CS({
  scrapeMotionValuesFromProps: sm,
  createRenderState: um
}), B4 = /* @__PURE__ */ CS({
  scrapeMotionValuesFromProps: bS,
  createRenderState: TS
}), V4 = Symbol.for("motionComponentSymbol");
function $4(t, a, i) {
  const l = y.useRef(i);
  y.useInsertionEffect(() => {
    l.current = i;
  });
  const o = y.useRef(null);
  return y.useCallback((d) => {
    d && t.onMount?.(d);
    const h = l.current;
    if (typeof h == "function")
      if (d) {
        const m = h(d);
        typeof m == "function" && (o.current = m);
      } else o.current ? (o.current(), o.current = null) : h(d);
    else h && (h.current = d);
    a && (d ? a.mount(d) : a.unmount());
  }, [a]);
}
const H4 = y.createContext({});
function q4(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function I4(t, a, i, l, o, d) {
  const { visualElement: h } = y.useContext(Ic), m = y.useContext(om), g = y.useContext(Bc), p = y.useContext(lm), b = p.reducedMotion, v = p.skipAnimations, S = y.useRef(null), E = y.useRef(!1);
  l = l || m.renderer, !S.current && l && (S.current = l(t, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: d
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const w = S.current, N = y.useContext(H4);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && F4(S.current, i, o, N);
  const R = y.useRef(!1);
  y.useInsertionEffect(() => {
    w && R.current && w.update(i, g);
  });
  const T = i[eS], k = y.useRef(!!T && typeof window < "u" && !window.MotionHandoffIsComplete?.(T) && window.MotionHasOptimisedAnimation?.(T));
  return d1(() => {
    E.current = !0, w && (R.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), k.current && w.animationState && w.animationState.animateChanges());
  }), y.useEffect(() => {
    w && (!k.current && w.animationState && w.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(T);
    }), k.current = !1), w.enteringChildren = void 0);
  }), w;
}
function F4(t, a, i, l) {
  const { layoutId: o, layout: d, drag: h, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : RS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: d,
    alwaysMeasureLayout: !!h || m && q4(m),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: l,
    crossfade: v,
    layoutScroll: g,
    layoutRoot: p,
    layoutAnchor: b
  });
}
function RS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : RS(t.parent);
}
function Of(t, { forwardMotionProps: a = !1, type: i } = {}, l, o) {
  l && vh(l);
  const d = i ? i === "svg" : dm(t), h = d ? B4 : U4;
  function m(p, b) {
    let v;
    const S = {
      ...y.useContext(lm),
      ...p,
      layoutId: Y4(p)
    }, { isStatic: E } = S, w = R4(p), N = h(p, E);
    if (!E && typeof window < "u") {
      G4();
      const R = X4(S);
      v = R.MeasureLayout, w.visualElement = I4(t, N, S, o, R.ProjectionNode, d);
    }
    return u.jsxs(Ic.Provider, { value: w, children: [v && w.visualElement ? u.jsx(v, { visualElement: w.visualElement, ...S }) : null, O4(t, p, $4(N, w.visualElement, b), N, E, a, d)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[V4] = t, g;
}
function Y4({ layoutId: t }) {
  const a = y.useContext(u1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function G4(t, a) {
  y.useContext(om).strict;
}
function X4(t) {
  const a = ES(), { drag: i, layout: l } = a;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(t) || l?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function P4(t, a) {
  if (typeof Proxy > "u")
    return Of;
  const i = /* @__PURE__ */ new Map(), l = (d, h) => Of(d, h, t, a), o = (d, h) => l(d, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? l : (i.has(h) || i.set(h, Of(h, void 0, t, a)), i.get(h))
  });
}
const fm = /* @__PURE__ */ P4(), K4 = (t, a) => a.isSVG ?? dm(t) ? new o4(a) : new n4(a, {
  allowProjection: t !== y.Fragment
});
class Q4 extends rs {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = h4(a));
  }
  updateAnimationControlsSubscription() {
    const { animate: a } = this.node.getProps();
    Hc(a) && (this.unmountControls = a.subscribe(this.node));
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
let Z4 = 0;
class J4 extends rs {
  constructor() {
    super(...arguments), this.id = Z4++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: a, onExitComplete: i } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || a === l)
      return;
    if (a && l === !1) {
      if (this.isExitComplete) {
        const { initial: d, custom: h } = this.node.getProps();
        if (typeof d == "string") {
          const m = Qr(this.node, d, h);
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
const W4 = {
  animation: {
    Feature: Q4
  },
  exit: {
    Feature: J4
  }
};
function _S(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function jb(t, a, i) {
  const { props: l } = t;
  t.animationState && l.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, d = l[o];
  d && Pn.postRender(() => d(a, _S(a)));
}
class eO extends rs {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = Oz(a, (i, l) => (jb(this.node, l, "Start"), (o) => jb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class tO extends rs {
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
    this.unmount = Vc(yb(this.node.current, "focus", () => this.onFocus()), yb(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Nb(t, a, i) {
  const { props: l } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && l.whileTap && t.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), d = l[o];
  d && Pn.postRender(() => d(a, _S(a)));
}
class nO extends rs {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = Vz(a, (o, d) => (Nb(this.node, d, "Start"), (h, { success: m }) => Nb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const gh = /* @__PURE__ */ new WeakMap(), kf = /* @__PURE__ */ new WeakMap(), aO = (t) => {
  const a = gh.get(t.target);
  a && a(t);
}, rO = (t) => {
  t.forEach(aO);
};
function iO({ root: t, ...a }) {
  const i = t || document;
  kf.has(i) || kf.set(i, {});
  const l = kf.get(i), o = JSON.stringify(a);
  return l[o] || (l[o] = new IntersectionObserver(rO, { root: t, ...a })), l[o];
}
function sO(t, a, i) {
  const l = iO(a);
  return gh.set(t, i), l.observe(t), () => {
    gh.delete(t), l.unobserve(t);
  };
}
const lO = {
  some: 0,
  all: 1
};
class oO extends rs {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: d } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : lO[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, d && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(g);
    };
    this.stopObserver = sO(this.node.current, h, m);
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
}, hm = {
  renderer: K4,
  ...W4,
  ...uO
};
function dO() {
  !rm.current && dS();
  const [t] = y.useState(Rc.current);
  return t;
}
var fO = "_11b853h0", hO = "_11b853h1", mO = "_11b853h2", pO = "_11b853h3", vO = "_11b853h4", gO = "_11b853h5", yO = "_11b853h6", bO = "_11b853h7", xO = "_11b853h8", SO = "_11b853h9", wO = "_11b853ha", EO = "_11b853hb", jO = "_11b853hc", NO = "_11b853hd", TO = "_11b853he", CO = "_11b853hf", RO = "_11b853hg", Tb = "_11b853hh", _O = "_11b853hi", MO = "_11b853hj", AO = "_11b853hk", DO = "_11b853hl";
const yh = 5, zO = "nexus.audio.emotiontts";
function MS(t, a = "") {
  return `/api/v1/extensions/${zO}/deployments/${t}/artifacts${a}`;
}
function OO(t) {
  const [a, i] = y.useState([]), [l, o] = y.useState(!1), [d, h] = y.useState(null), [m, g] = y.useState(0), p = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((S) => S + 1), []);
  return y.useEffect(() => {
    p.current?.abort();
    const S = new AbortController();
    return p.current = S, o(!0), h(null), fetch(`${MS(t)}?limit=${yh}`, {
      headers: { accept: "application/json" },
      signal: S.signal
    }).then(async (E) => {
      if (!E.ok)
        throw new Error(`HTTP ${E.status}`);
      const w = await E.json();
      S.signal.aborted || i(w.artifacts.slice(0, yh));
    }).catch((E) => {
      if (S.signal.aborted) return;
      const w = E instanceof Error ? E.message : "fetch failed";
      h(w);
    }).finally(() => {
      S.signal.aborted || o(!1);
    }), () => S.abort();
  }, [t, m]), y.useEffect(() => c1((S) => {
    const E = b.current;
    b.current = S.busy, E && !S.busy && v();
  }), [v]), { rows: a, loading: l, error: d, refetch: v };
}
function kO({ deploymentId: t }) {
  const [a, i] = y.useState(!1), [l, o] = y.useState(null), d = y.useRef(null), h = y.useRef(null), m = dO(), { rows: g, loading: p, error: b, refetch: v } = OO(t), S = y.useCallback(() => {
    i(!1), o(null);
  }, []);
  y.useEffect(() => {
    if (!a) return;
    const N = (T) => {
      d.current && (T.target instanceof Node && d.current.contains(T.target) || S());
    }, R = (T) => {
      T.key === "Escape" && (S(), h.current?.focus());
    };
    return document.addEventListener("mousedown", N), document.addEventListener("keydown", R), () => {
      document.removeEventListener("mousedown", N), document.removeEventListener("keydown", R);
    };
  }, [a, S]);
  const E = g.length, w = y.useMemo(() => `Recent · ${E}`, [E]);
  return /* @__PURE__ */ u.jsxs("div", { ref: d, className: fO, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        ref: h,
        type: "button",
        className: hO,
        "aria-expanded": a,
        "aria-haspopup": "dialog",
        onClick: () => i((N) => !N),
        title: "Recent generations",
        children: [
          /* @__PURE__ */ u.jsx("span", { className: mO, "aria-hidden": "true", children: "◉" }),
          /* @__PURE__ */ u.jsx("span", { children: w })
        ]
      }
    ),
    /* @__PURE__ */ u.jsx(cm, { features: hm, strict: !0, children: /* @__PURE__ */ u.jsx(wS, { children: a && /* @__PURE__ */ u.jsxs(
      fm.div,
      {
        role: "dialog",
        "aria-label": "Recent generations",
        className: pO,
        initial: m ? { opacity: 1 } : { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: m ? { opacity: 0 } : { opacity: 0, y: -4 },
        transition: { duration: m ? 0 : 0.16, ease: [0.4, 0, 0.2, 1] },
        children: [
          /* @__PURE__ */ u.jsxs("header", { className: vO, children: [
            /* @__PURE__ */ u.jsxs("span", { className: gO, children: [
              "Last ",
              yh,
              " generations"
            ] }),
            /* @__PURE__ */ u.jsx(
              "button",
              {
                type: "button",
                className: yO,
                onClick: v,
                "aria-label": "Refresh",
                title: "Refresh",
                children: "↻"
              }
            )
          ] }),
          p && g.length === 0 && /* @__PURE__ */ u.jsx("div", { className: Tb, children: "Loading…" }),
          b && g.length === 0 && /* @__PURE__ */ u.jsx("div", { className: _O, children: b }),
          !p && !b && g.length === 0 && /* @__PURE__ */ u.jsx("div", { className: Tb, children: "No generations yet — hit Generate to start." }),
          g.length > 0 && /* @__PURE__ */ u.jsx("ul", { className: bO, children: g.map((N) => /* @__PURE__ */ u.jsx(
            LO,
            {
              row: N,
              deploymentId: t,
              isPlaying: l === N.utteranceId,
              onPlayToggle: () => o((R) => R === N.utteranceId ? null : N.utteranceId)
            },
            N.utteranceId
          )) }),
          /* @__PURE__ */ u.jsx("footer", { className: MO, children: /* @__PURE__ */ u.jsxs("span", { className: AO, children: [
            "Press ",
            /* @__PURE__ */ u.jsx("kbd", { className: DO, children: "Esc" }),
            " to close"
          ] }) })
        ]
      },
      "popover"
    ) }) })
  ] });
}
function LO({ row: t, deploymentId: a, isPlaying: i, onPlayToggle: l }) {
  const o = MS(
    a,
    `/${t.utteranceId}/download`
  );
  return /* @__PURE__ */ u.jsxs("li", { className: xO, children: [
    /* @__PURE__ */ u.jsxs("div", { className: SO, children: [
      /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: wO,
          onClick: l,
          "aria-label": i ? "Stop preview" : "Play preview",
          "aria-pressed": i,
          children: i ? "■" : "▶"
        }
      ),
      /* @__PURE__ */ u.jsxs("div", { className: EO, children: [
        /* @__PURE__ */ u.jsx("span", { className: jO, children: t.characterDisplay }),
        /* @__PURE__ */ u.jsx("span", { className: NO, title: t.text, children: t.text })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: TO, children: UO(t.durationMs) }),
      /* @__PURE__ */ u.jsx(
        "a",
        {
          className: CO,
          href: o,
          download: t.filename,
          "aria-label": "Download",
          title: "Download",
          children: "↓"
        }
      )
    ] }),
    i && /* @__PURE__ */ u.jsx(
      "audio",
      {
        className: RO,
        src: o,
        controls: !0,
        autoPlay: !0,
        preload: "auto",
        children: /* @__PURE__ */ u.jsx("track", { kind: "captions" })
      }
    )
  ] });
}
function UO(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return i > 0 ? `${i}:${l.toString().padStart(2, "0")}` : `${l}s`;
}
function BO(t) {
  const a = El(), [i, l] = y.useState("idle"), [o, d] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    eD({ busy: i === "starting" || i === "running" });
  }, [i]);
  const E = y.useCallback(
    (B) => {
      const Q = B.status;
      (Q === "completed" || Q === "partial") && Zt.success(
        Q === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
  ), w = y.useCallback(async () => {
    l("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const B = await TT(t.deploymentId, t.createPayload);
      d(B.runId), l("running"), S.current?.(), S.current = Uy(
        t.deploymentId,
        B.runId,
        (Q) => Cb(
          Q,
          m,
          l,
          (_) => {
            v(_), E(_);
          },
          t.deploymentId,
          B.runId
        ),
        () => l("error")
      );
    } catch (B) {
      l("error"), p(Lf(B));
    }
  }, [t.deploymentId, t.createPayload, E]);
  y.useEffect(() => tD(() => {
    (i === "idle" || i === "terminal" || i === "error") && w();
  }), [i, w]);
  const N = y.useCallback(async () => {
    if (o)
      try {
        await CT(t.deploymentId, o);
      } catch (B) {
        p(Lf(B));
      }
  }, [t.deploymentId, o]), R = Array.from(h.values()).sort((B, Q) => B.globalIndex - Q.globalIndex), T = i === "starting" || i === "running", k = b?.status === "partial", z = R.filter((B) => B.status === "running").length, M = R.filter((B) => B.status === "completed").length, I = i === "starting" || i === "running" || R.length > 0, J = R.filter((B) => B.status === "failed"), ne = (() => {
    if (i !== "terminal" || J.length === 0) return null;
    const B = /* @__PURE__ */ new Map();
    for (const P of J) {
      const le = P.failureCategory ?? "unknown";
      B.set(le, (B.get(le) ?? 0) + 1);
    }
    let Q = "unknown", _ = 0;
    for (const [P, le] of B)
      le > _ && (Q = P, _ = le);
    const Z = R.length;
    return { category: Q, count: _, total: Z };
  })(), A = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, q = "Check the run detail page for the per-segment error log.", F = g?.toLowerCase().includes("unmapped") ?? !1, ie = t.diagnostics ?? [], re = ie.find((B) => B.status === "fail"), te = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ce = !t.canGenerate || T || !!re, W = i === "starting" || i === "running", O = W ? "running" : ce ? "blocked" : "idle", U = !l1(o1) || W;
  return /* @__PURE__ */ u.jsxs("div", { className: nD, children: [
    /* @__PURE__ */ u.jsxs("div", { className: aD, children: [
      /* @__PURE__ */ u.jsxs("div", { className: iD, children: [
        /* @__PURE__ */ u.jsxs("span", { className: sD, children: [
          /* @__PURE__ */ u.jsx("span", { className: rD, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          I && /* @__PURE__ */ u.jsxs("span", { className: pD, children: [
            /* @__PURE__ */ u.jsx("span", { className: vD, "aria-hidden": "true" }),
            z > 0 ? `${z} in flight` : `${M} done`
          ] })
        ] }),
        ie.length > 0 ? /* @__PURE__ */ u.jsx("ul", { className: lD, "aria-label": "Pre-flight checks", children: ie.map((B) => /* @__PURE__ */ u.jsxs("li", { className: oD, children: [
          /* @__PURE__ */ u.jsx(
            "span",
            {
              className: cD,
              "data-status": B.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ u.jsx("span", { className: uD, children: B.label }),
          B.detail && /* @__PURE__ */ u.jsx("span", { className: Y0, children: B.detail })
        ] }, B.label)) }) : /* @__PURE__ */ u.jsx("span", { className: Y0, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: dD, "data-state": O, children: [
        U ? /* @__PURE__ */ u.jsxs(
          Ve,
          {
            variant: "primary",
            size: "sm",
            onClick: w,
            disabled: ce,
            loading: W,
            children: [
              !W && /* @__PURE__ */ u.jsx("span", { className: fD, "aria-hidden": "true", children: "▶" }),
              te
            ]
          }
        ) : /* @__PURE__ */ u.jsxs("span", { className: hD, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ u.jsx("span", { className: mD, children: "↑" })
        ] }),
        T && /* @__PURE__ */ u.jsx(
          Ve,
          {
            variant: "ghost",
            size: "xs",
            onClick: N,
            "aria-label": "Cancel current run",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ u.jsx(kO, { deploymentId: t.deploymentId })
      ] })
    ] }),
    g && /* @__PURE__ */ u.jsxs(
      zn,
      {
        severity: "error",
        style: {
          marginBottom: 12,
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8
        },
        children: [
          /* @__PURE__ */ u.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ u.jsx("span", { children: g }),
          F && /* @__PURE__ */ u.jsx(
            Ve,
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
    ne && /* @__PURE__ */ u.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ u.jsxs("strong", { children: [
        "Run failed — ",
        ne.count,
        " of ",
        ne.total,
        " segments failed with ",
        /* @__PURE__ */ u.jsx("code", { children: ne.category })
      ] }),
      /* @__PURE__ */ u.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: A[ne.category] ?? q })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ u.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${qx.secondary} ${Ix.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    k && b && /* @__PURE__ */ u.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ u.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          variant: "secondary",
          disabled: !!re,
          onClick: async () => {
            try {
              const B = await Vx(t.deploymentId, b.runId);
              d(B.runId), m(/* @__PURE__ */ new Map()), v(null), l("running"), S.current?.(), S.current = Uy(
                t.deploymentId,
                B.runId,
                (Q) => Cb(Q, m, l, v, t.deploymentId, B.runId),
                () => l("error")
              );
            } catch (B) {
              p(Lf(B)), l("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    R.length > 0 && /* @__PURE__ */ u.jsxs("table", { className: fR, children: [
      /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
        /* @__PURE__ */ u.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ u.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ u.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ u.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ u.jsx("tbody", { children: R.map((B) => /* @__PURE__ */ u.jsxs("tr", { className: hR, children: [
        /* @__PURE__ */ u.jsx("td", { className: fr, children: B.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ u.jsx("td", { className: fr, children: /* @__PURE__ */ u.jsx(Zr, { tone: VO(B.status), children: B.status }) }),
        /* @__PURE__ */ u.jsx("td", { className: fr, children: B.durationMs ? `${B.durationMs} ms` : "—" }),
        /* @__PURE__ */ u.jsx("td", { className: fr, children: B.failureCategory ?? "" })
      ] }, B.globalIndex)) })
    ] })
  ] });
}
async function Cb(t, a, i, l, o, d) {
  switch (t.type) {
    case "segment_started":
      a((h) => {
        const m = new Map(h);
        return m.set(t.globalIndex, { globalIndex: t.globalIndex, status: "running" }), m;
      });
      return;
    case "segment_completed":
      a((h) => {
        const m = new Map(h);
        return m.set(t.globalIndex, {
          globalIndex: t.globalIndex,
          status: "completed",
          durationMs: t.durationMs
        }), m;
      });
      return;
    case "segment_failed":
      a((h) => {
        const m = new Map(h);
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
        const h = await Bh(o, d);
        l(h);
      } catch {
      }
      return;
  }
}
function VO(t) {
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
function Lf(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
var $O = "xq3iim0", HO = "xq3iim2 xq3iim1", qO = "xq3iim3 xq3iim1", IO = "xq3iim4", FO = "xq3iim5", YO = "xq3iim6", GO = "xq3iim7";
function XO({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [l, o] = y.useState([]), [d, h] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, S] = y.useState(null);
  y.useEffect(() => {
    let w = !1;
    return g(!0), ml(t).then(({ voiceAssets: N }) => {
      w || o(N);
    }).catch((N) => {
      w || S(N instanceof Error ? N.message : "Failed to load voices");
    }).finally(() => {
      w || g(!1);
    }), () => {
      w = !0;
    };
  }, [t]);
  async function E(w) {
    b(!0), S(null);
    const N = d;
    h(w);
    try {
      await wT(t, w), i?.(w);
    } catch (R) {
      h(N), S(R instanceof Error ? R.message : "Failed to update default voice");
    } finally {
      b(!1);
    }
  }
  return m ? /* @__PURE__ */ u.jsx("p", { className: YO, children: "Loading voices…" }) : v ? /* @__PURE__ */ u.jsx("p", { className: GO, children: v }) : l.length === 0 ? /* @__PURE__ */ u.jsx("div", { role: "radiogroup", "aria-label": "Default voice for quick mode", children: /* @__PURE__ */ u.jsx(
    Tl,
    {
      title: "No voices yet.",
      hint: "Upload a voice in Mappings to enable quick mode."
    }
  ) }) : /* @__PURE__ */ u.jsx(
    "div",
    {
      role: "radiogroup",
      "aria-label": "Default voice for quick mode",
      className: $O,
      children: l.map((w) => {
        const N = w.voiceAssetId === d;
        return /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": N,
            disabled: p,
            onClick: () => void E(N ? null : w.voiceAssetId),
            className: N ? qO : HO,
            children: [
              /* @__PURE__ */ u.jsx("span", { className: IO, children: w.displayName }),
              w.durationMs !== null && w.durationMs !== void 0 && /* @__PURE__ */ u.jsx("span", { className: FO, children: PO(w.durationMs) })
            ]
          },
          w.voiceAssetId
        );
      })
    }
  );
}
function PO(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), l = Math.round(a - i * 60);
  return `${i}:${l.toString().padStart(2, "0")}`;
}
const Rb = [
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
function KO(t) {
  const a = El(), i = y.useRef(null), { tokens: l, attributions: o, unresolved: d, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => ZO(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (p) => {
    const b = i.current;
    b && (b.scrollTop = p.currentTarget.scrollTop, b.scrollLeft = p.currentTarget.scrollLeft);
  };
  return /* @__PURE__ */ u.jsxs("div", { children: [
    /* @__PURE__ */ u.jsxs("div", { className: sR, children: [
      /* @__PURE__ */ u.jsx("div", { ref: i, className: lR, "aria-hidden": "true", children: l.map((p, b) => QO(p, b, m)) }),
      /* @__PURE__ */ u.jsx(
        "textarea",
        {
          className: oR,
          value: t.value,
          onChange: (p) => t.onChange(p.currentTarget.value),
          onScroll: g,
          placeholder: `[Bob] Hey there
[Alice] Hello
...`,
          "aria-label": "Dialogue script",
          spellCheck: !1
        }
      )
    ] }),
    d.length > 0 && /* @__PURE__ */ u.jsxs(zn, { severity: "error", children: [
      /* @__PURE__ */ u.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      d.map((p) => /* @__PURE__ */ u.jsxs(
        Ve,
        {
          variant: "secondary",
          size: "sm",
          onClick: () => a(
            `/${t.deploymentId}/mappings/new?character=${encodeURIComponent(p)}`
          ),
          children: [
            "Create mapping for ",
            p
          ]
        },
        p
      ))
    ] }),
    o.length > 0 && /* @__PURE__ */ u.jsxs("div", { children: [
      /* @__PURE__ */ u.jsx("span", { className: Fi, children: "Parsed lines" }),
      /* @__PURE__ */ u.jsx("ul", { className: n0, children: o.map((p) => /* @__PURE__ */ u.jsxs("li", { children: [
        "#",
        p.lineNumber.toString().padStart(3, "0"),
        " [",
        p.character,
        "] ",
        p.text,
        !p.hasMapping && p.character !== "Narrator" && " — unresolved"
      ] }, p.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ u.jsxs("div", { children: [
      /* @__PURE__ */ u.jsx("span", { className: Fi, children: "Predicted filenames" }),
      /* @__PURE__ */ u.jsx("ul", { className: n0, children: h.map((p) => /* @__PURE__ */ u.jsx("li", { children: p }, p)) })
    ] })
  ] });
}
function QO(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ u.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ u.jsxs("span", { children: [
      /* @__PURE__ */ u.jsx("span", { className: t0, children: t.raw }),
      `
`
    ] }, a);
  const l = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? e0 : `${e0} ${cR}`;
  return /* @__PURE__ */ u.jsxs("span", { children: [
    /* @__PURE__ */ u.jsxs("span", { className: o, style: { color: l }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ u.jsxs("span", { className: uR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ u.jsxs("span", { className: t0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function ZO(t, a, i) {
  const l = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], d = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let S = 0;
  return v.forEach((E, w) => {
    const N = E.trim();
    if (!N) {
      o.push({ kind: "blank", raw: E });
      return;
    }
    const R = w + 1, T = N.match(l);
    let k = "Narrator", z = N, M, I = !1;
    if (T?.groups) {
      I = !0;
      const q = (T.groups.body ?? "").trim(), F = (T.groups.rest ?? "").trim();
      k = ((q.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", M = (q.includes("|") ? q.slice(q.indexOf("|") + 1) : "").trim() || void 0, z = F;
    }
    S += 1;
    const J = k.toLowerCase(), ne = (m.get(J) ?? 0) + 1;
    m.set(J, ne);
    const A = k === "Narrator" || i.has(J);
    if (A || h.add(k), k !== "Narrator" && !p.has(J) && (p.set(J, Rb[b % Rb.length] ?? "currentColor"), b += 1), I) {
      const q = { kind: "character", raw: E, character: k, text: z, hasMapping: A };
      M !== void 0 && (q.override = M), o.push(q);
    } else
      o.push({ kind: "narrator", raw: E });
    d.push({ lineNumber: R, character: k, text: z, hasMapping: A }), g.push(
      `${S.toString().padStart(3, "0")}_${JO(k)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: d,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: p
  };
}
function JO(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
var WO = "_5o8xvy0", ek = "_5o8xvy1", tk = "_5o8xvy2", nk = "_5o8xvy3", Uf = "_5o8xvy4", ak = "_3f2ar0", rk = "_3f2ar1", ik = "_3f2ar2", sk = "_3f2ar3", lk = "_3f2ar4", ok = "_3f2ar6", tl = "_3f2ar7", nl = "_3f2ar8", al = "_3f2ar9", _b = "_3f2ara", Mb = "_3f2arb";
function ck({ label: t, glyph: a = "?", children: i }) {
  const [l, o] = y.useState(!1), d = y.useRef(null), h = y.useId(), m = `${h}-content`, g = y.useCallback(() => o(!1), []);
  return y.useEffect(() => {
    if (!l) return;
    const p = (v) => {
      d.current && (v.target instanceof Node && d.current.contains(v.target) || g());
    }, b = (v) => {
      v.key === "Escape" && g();
    };
    return document.addEventListener("mousedown", p), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", p), document.removeEventListener("keydown", b);
    };
  }, [l, g]), /* @__PURE__ */ u.jsxs("span", { ref: d, className: ak, children: [
    /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: rk,
        "aria-expanded": l,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ u.jsx("span", { className: ik, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    l && /* @__PURE__ */ u.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": h,
        className: sk,
        children: i
      }
    )
  ] });
}
var uk = "_1dxb1dg0", Ab = "_1dxb1dg1", dk = "_1dxb1dg2", fk = "_1dxb1dg3", hk = "_1dxb1dg4";
function mk() {
  return /* @__PURE__ */ u.jsxs(ck, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ u.jsx("h3", { className: lk, children: "Script syntax" }),
    /* @__PURE__ */ u.jsxs("ul", { className: ok, children: [
      /* @__PURE__ */ u.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ u.jsx("code", { className: nl, children: "[Char] line text" }),
        /* @__PURE__ */ u.jsx("span", { className: al, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ u.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ u.jsx("code", { className: nl, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ u.jsx("span", { className: al, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ u.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ u.jsx("code", { className: nl, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ u.jsx("span", { className: al, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ u.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ u.jsx("code", { className: nl, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ u.jsx("span", { className: al, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ u.jsxs("li", { className: tl, children: [
        /* @__PURE__ */ u.jsx("code", { className: nl, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ u.jsx("span", { className: al, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("p", { className: _b, children: [
      /* @__PURE__ */ u.jsx("span", { className: Mb, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ u.jsxs("p", { className: _b, children: [
      /* @__PURE__ */ u.jsx("span", { className: Mb, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function pk() {
  return /* @__PURE__ */ u.jsxs("ul", { className: uk, children: [
    /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("code", { className: Ab, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("code", { className: Ab, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("code", { className: dk, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("code", { className: fk, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("code", { className: hk, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function vk({
  quickMode: t,
  onToggleQuickMode: a,
  deployment: i,
  script: l,
  onScriptChange: o,
  outputFormat: d,
  mappingsByLower: h,
  defaultVoiceAssetId: m,
  onDefaultVoiceAssetIdChange: g
}) {
  const p = l.length, b = l.trim() ? l.trim().split(/\s+/).length : 0, v = l.trim() ? l.trim().split(/\r?\n/).filter((S) => S.trim()).length : 0;
  return /* @__PURE__ */ u.jsxs("div", { className: WO, children: [
    /* @__PURE__ */ u.jsxs("div", { className: ek, children: [
      /* @__PURE__ */ u.jsxs("label", { className: tk, children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "checkbox",
            checked: t,
            onChange: (S) => a(S.target.checked)
          }
        ),
        "Quick mode (no character mapping required)"
      ] }),
      t && /* @__PURE__ */ u.jsx(
        XO,
        {
          deploymentId: i.deploymentId,
          initialVoiceAssetId: m,
          onChange: g
        }
      ),
      /* @__PURE__ */ u.jsxs("div", { className: nk, "aria-live": "polite", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("strong", { className: Uf, children: p.toString().padStart(3, "0") }),
          " ",
          "chars"
        ] }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("strong", { className: Uf, children: v.toString().padStart(2, "0") }),
          " ",
          "lines"
        ] }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("strong", { className: Uf, children: b.toString().padStart(3, "0") }),
          " ",
          "words"
        ] }),
        /* @__PURE__ */ u.jsx(mk, {})
      ] })
    ] }),
    /* @__PURE__ */ u.jsx(
      KO,
      {
        value: l,
        onChange: o,
        outputFormat: d,
        mappings: h,
        deploymentId: i.deploymentId
      }
    ),
    /* @__PURE__ */ u.jsx(pk, {})
  ] });
}
function gk({
  script: t,
  quickMode: a,
  defaultVoiceAssetId: i,
  characters: l,
  unmappedCount: o,
  globalEmotion: d,
  performance: h
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
  }) : l.length === 0 ? m.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" }) : o === 0 ? m.push({ id: "cast", status: "ok", label: "Cast", detail: `${l.length} mapped` }) : m.push({
    id: "cast",
    status: "warn",
    label: "Cast",
    detail: `${o} unmapped`
  }), d.mode === "qwen_template" && !d.qwenTemplate?.trim())
    m.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  else if (d.mode === "emotion_vector") {
    const p = d.vector, b = Array.isArray(p) && p.some((v) => Math.abs(v) > 0.01);
    m.push({
      id: "emotion",
      status: b ? "ok" : "info",
      label: "Emotion",
      detail: b ? "8-axis vector" : "neutral vector"
    });
  } else d.mode === "audio_ref" ? m.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" }) : m.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  return m.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(h.intensity * 100)}% · pace ${h.pace.toFixed(2)}× · pitch ${h.pitchSt >= 0 ? "+" : ""}${h.pitchSt.toFixed(1)}st`
  }), m;
}
const Bf = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], yk = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function bk(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let l = 0; l < i.length; l += 1) {
    const d = (i[l] ?? "").trim();
    if (d.length === 0) continue;
    const h = d.match(yk);
    if (!h || !h.groups) {
      a.push({ idx: l, character: null, text: d, override: null });
      continue;
    }
    const m = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: l, character: null, text: g || d, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, E = b.join("|").trim(), w = E ? xk(E) : null;
    a.push({
      idx: l,
      character: S,
      text: g,
      override: w
    });
  }
  return a;
}
function xk(t) {
  const a = t.trim();
  if (!a) return { kind: "raw", label: "" };
  const i = a.indexOf(":"), l = i >= 0 ? a.slice(0, i).trim().toLowerCase() : a.toLowerCase(), o = i >= 0 ? a.slice(i + 1).trim() : "";
  switch (l) {
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
function Sk(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of t) {
    if (!l.character) continue;
    const o = l.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(l.character));
  }
  return i;
}
function wk(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const l = t[i];
    l && (a[l] = Bf[i % Bf.length] ?? Bf[0]);
  }
  return a;
}
function Ek(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var jk = "_1snzz30", Nk = "_1snzz31", Tk = "_1snzz33", Ck = "_1snzz34", Rk = "_1snzz36", Db = "_1snzz3b", zb = "_1snzz3c", Ob = "_1snzz3d";
const _k = 4e3;
function Mk({ visible: t, canGenerate: a }) {
  const [i, l] = y.useState(null), [o, d] = y.useState(!1), [h, m] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let C = !1;
    const U = async () => {
      try {
        const Q = await xc();
        C || (g.current = Q, l(Q));
      } catch {
      }
    };
    U();
    const B = window.setInterval(U, _k);
    return () => {
      C = !0, window.clearInterval(B);
    };
  }, []), y.useEffect(() => c1((C) => {
    m(!!C.busy);
  }), []);
  const p = y.useCallback(() => {
    W3();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", S = b === "starting" || b === "installing", E = v, w = y.useCallback(async () => {
    const C = g.current?.badge ?? "not_installed", U = C === "ready" || C === "running";
    d(!0);
    try {
      U ? (await Px(), Zt.success("Runtime stopped")) : (await Xx(), Zt.success("Runtime starting…"));
    } catch (B) {
      Zt.error(B instanceof Error ? B.message : "runtime action failed");
    } finally {
      d(!1);
    }
  }, []), N = v ? "Stop runtime" : S ? "Runtime starting…" : "Start runtime", R = o || S, T = o || S, k = T ? "transitioning" : v ? "running" : "stopped", z = !a || h || !E, M = E ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", I = E && a && !h, J = v ? "ready" : S || o ? "busy" : "off", ne = v ? "Runtime ready" : S ? "Starting…" : o ? "Working…" : "Runtime off", A = J === "busy";
  if (typeof document > "u") return /* @__PURE__ */ u.jsx(u.Fragment, {});
  const q = "rgba(28, 30, 34, 0.94)", F = "#ba9eff", ie = "#8455ef", re = "#1a0a3a", te = "#f0f0f3", ce = "#aaabae", W = "#22c55e", O = v ? "◼" : "⏻";
  return Vh.createPortal(
    /* @__PURE__ */ u.jsxs(
      "div",
      {
        className: jk,
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
          /* @__PURE__ */ u.jsxs(
            "span",
            {
              className: Nk,
              "data-tone": J,
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
                color: J === "ready" ? W : J === "busy" ? F : ce,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${J === "ready" ? "rgba(34, 197, 94, 0.4)" : J === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ u.jsx(
                  "span",
                  {
                    className: Tk,
                    "data-pulse": A ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: J === "ready" ? `0 0 8px ${W}` : J === "busy" ? `0 0 8px ${F}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ne
              ]
            }
          ),
          /* @__PURE__ */ u.jsxs("span", { className: zb, children: [
            /* @__PURE__ */ u.jsx(
              "button",
              {
                type: "button",
                className: Ck,
                "data-state": k,
                onClick: w,
                disabled: R,
                "aria-label": N,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: k === "running" ? "rgba(34, 197, 94, 0.18)" : "rgba(255, 255, 255, 0.05)",
                  color: k === "running" ? W : te,
                  fontSize: "16px",
                  cursor: R ? "not-allowed" : "pointer",
                  opacity: R ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${k === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: T ? /* @__PURE__ */ u.jsx("span", { className: Db, "aria-hidden": "true" }) : /* @__PURE__ */ u.jsx("span", { "aria-hidden": "true", children: O })
              }
            ),
            /* @__PURE__ */ u.jsx("span", { className: Ob, role: "tooltip", children: N })
          ] }),
          /* @__PURE__ */ u.jsxs("span", { className: zb, children: [
            /* @__PURE__ */ u.jsxs(
              "button",
              {
                type: "button",
                className: Rk,
                "data-ready": I ? "true" : "false",
                onClick: p,
                disabled: z,
                "aria-label": M,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: z ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${F} 0%, ${ie} 100%)`,
                  color: z ? ce : re,
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
                  h ? /* @__PURE__ */ u.jsx("span", { className: Db, "aria-hidden": "true" }) : /* @__PURE__ */ u.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ u.jsx("span", { children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ u.jsx("span", { className: Ob, role: "tooltip", children: M })
          ] })
        ]
      }
    ),
    document.body
  );
}
function Ak(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], l = Dk(t.deployment.displayName, t.deployment.deploymentId), o = l1(o1), d = t.canGenerate ?? !1;
  return /* @__PURE__ */ u.jsxs("div", { className: $C, children: [
    /* @__PURE__ */ u.jsxs("header", { className: HC, children: [
      /* @__PURE__ */ u.jsx("div", { className: IC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ u.jsx("div", { className: qC, children: /* @__PURE__ */ u.jsx("h1", { className: FC, children: l }) }),
      /* @__PURE__ */ u.jsx("p", { className: YC, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ u.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ u.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ u.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ u.jsx("div", { className: nR, "aria-label": "Quick actions", children: t.quickActions }),
    /* @__PURE__ */ u.jsxs("div", { className: GC, children: [
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ u.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ u.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ u.jsx(
        hr,
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
    /* @__PURE__ */ u.jsx(Mk, { visible: o, canGenerate: d }),
    typeof document < "u" && Vh.createPortal(
      /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: aR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: J3,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function Dk(t, a) {
  const i = (t ?? "").trim();
  return !i || i === a ? "Recipe Studio" : i;
}
function hr({
  number: t,
  title: a,
  id: i,
  variant: l,
  defaultCollapsed: o = !1,
  children: d
}) {
  const [h, m] = y.useState(o), g = `${i}-body`;
  return /* @__PURE__ */ u.jsxs("section", { className: XC, "aria-labelledby": i, children: [
    /* @__PURE__ */ u.jsx("header", { className: PC, children: /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: ZC,
        "aria-expanded": !h,
        "aria-controls": g,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ u.jsxs("span", { className: KC, children: [
            /* @__PURE__ */ u.jsx("span", { className: JC, children: t }),
            /* @__PURE__ */ u.jsx("span", { className: WC, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ u.jsx("span", { className: eR, children: a })
          ] }),
          /* @__PURE__ */ u.jsx("h2", { id: i, className: QC, children: a }),
          /* @__PURE__ */ u.jsx(
            "span",
            {
              className: tR,
              "data-collapsed": h ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !h && /* @__PURE__ */ u.jsx(
      "div",
      {
        id: g,
        className: l === "split" ? iR : rR,
        children: d
      }
    )
  ] });
}
const Mn = {
  success(t) {
    Zt.success(t);
  },
  error(t) {
    Zt.error(t);
  }
}, bh = "__recipe";
function zk(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function Ok(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== bh && (a[i] = t[i]);
  return a;
}
function kk() {
  const { deployment: t, mappings: a, runs: i, workflow: l } = Nl(), [o, d] = y.useState(a), [h, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [S, E] = y.useState(Uc), w = y.useMemo(
    () => t.defaultGenerationOverridesJson ? zk(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), N = y.useMemo(() => {
    const he = w[bh];
    return typeof he == "object" && he !== null ? he : {};
  }, [w]), [R, T] = y.useState(""), [k, z] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [M, I] = y.useState(t.defaultSpeedFactor ?? 1), [J, ne] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [A, q] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...Ok(w)
  })), [F, ie] = y.useState(() => {
    const he = N.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [re, te] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [ce, W] = y.useState(() => {
    const he = N.quickMode;
    return typeof he == "boolean" ? he : t.defaultVoiceAssetId != null;
  }), [O, C] = y.useState(M3);
  y.useEffect(() => {
    let he = !1;
    return ml(t.deploymentId).then((ke) => {
      he || m(ke.voiceAssets);
    }).catch(() => {
    }), Fx(t.deploymentId).then((ke) => {
      he || p(ke.presets);
    }).catch(() => {
    }), () => {
      he = !0;
    };
  }, [t.deploymentId]);
  const U = y.useRef(!0);
  y.useEffect(() => {
    if (U.current) {
      U.current = !1;
      return;
    }
    const he = window.setTimeout(() => {
      const ke = {
        ...A,
        [bh]: {
          quickMode: ce,
          cachePolicy: F
        }
      };
      ht(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: k,
          defaultSpeedFactor: M,
          defaultGenerationOverrides: ke
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    k,
    M,
    F,
    ce,
    A
  ]);
  const B = y.useMemo(() => bk(R), [R]), Q = y.useMemo(() => Sk(B), [B]), _ = y.useMemo(() => wk(Q), [Q]), Z = y.useMemo(() => Ek(B), [B]), P = y.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const ke of o)
      he.set(ke.characterName.toLowerCase(), ke);
    return he;
  }, [o]), le = y.useMemo(() => ce && re ? 0 : Q.filter((he) => !P.has(he.toLowerCase())).length, [Q, P, ce, re]), fe = y.useCallback(
    async (he, ke) => {
      const De = P.get(he.toLowerCase());
      try {
        if (De) {
          const Te = await cl(t.deploymentId, De.mappingId, ke);
          d(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), Mn.success(`Updated mapping for ${he}`);
        } else if (ke.speakerVoiceAssetId) {
          const Te = await Uh(t.deploymentId, {
            ...ke,
            characterName: he,
            speakerVoiceAssetId: ke.speakerVoiceAssetId
          });
          d((bt) => [...bt, Te]), Mn.success(`Mapped ${he} to voice`);
        }
      } catch (Te) {
        Mn.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [P, t.deploymentId]
  ), ge = y.useCallback(
    async (he) => {
      const ke = P.get(he.toLowerCase());
      if (ke)
        try {
          await Bx(t.deploymentId, ke.mappingId), d((De) => De.filter((Te) => Te.mappingId !== ke.mappingId)), Mn.success(`Cleared mapping for ${he}`);
        } catch (De) {
          Mn.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [P, t.deploymentId]
  ), Ae = y.useCallback(
    async (he, ke) => {
      try {
        const De = await bc(
          t.deploymentId,
          ke,
          ke.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Te) => [De, ...Te]), await fe(he, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        Mn.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [t.deploymentId, fe]
  ), _e = y.useCallback((he) => {
    E(he);
  }, []), $e = y.useMemo(() => {
    const he = [], ke = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || ke.has(Te)) continue;
      ke.add(Te);
      const xt = h.find((dn) => dn.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      ke.has(De.voiceAssetId) || (ke.add(De.voiceAssetId), he.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return he;
  }, [o, h]), Jt = y.useCallback(
    async (he, ke) => {
      if (he.kind !== "voice_asset") {
        Mn.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Te = JSON.parse(ke);
        if (typeof Te != "object" || Te === null || Te.version !== 1 || !Array.isArray(Te.ops))
          throw new Error("snapshot is not a valid EditChain");
        De = Te;
      } catch (Te) {
        Mn.error(
          Te instanceof Error ? `Audit snapshot is malformed: ${Te.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Te = await $x(he.id, t.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === he.id);
        await Promise.all(
          bt.map(
            (xt) => cl(t.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), d(
          (xt) => xt.map(
            (dn) => dn.speakerVoiceAssetId === he.id ? { ...dn, voiceAssetChainDigest: Te.chain_digest } : dn
          )
        ), Mn.success(`Reverted ${he.label} to a prior chain`);
      } catch (Te) {
        Mn.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Pt = y.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        Mn.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await LC(he.id, t.deploymentId);
        const ke = o.filter((De) => De.speakerVoiceAssetId === he.id);
        await Promise.all(
          ke.map(
            (De) => cl(t.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), d(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === he.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), Mn.success(`Cleared edit chain on ${he.label}`);
      } catch (ke) {
        Mn.error(ke instanceof Error ? ke.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: R,
      parserMode: ce ? "raw_text" : "dialogue",
      outputFormat: k,
      speedFactor: M,
      globalEmotion: { ...J, emotionAlpha: O.intensity },
      generation: A,
      cachePolicy: F
    }),
    [R, ce, k, M, O.intensity, J, A, F]
  ), et = y.useMemo(
    () => gk({
      script: R,
      quickMode: ce,
      defaultVoiceAssetId: re,
      characters: Q,
      unmappedCount: le,
      globalEmotion: J,
      performance: O
    }),
    [R, ce, re, Q, le, J, O]
  ), pt = y.useMemo(
    () => et.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [et]
  );
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsx(OC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ u.jsx(
      Ak,
      {
        deployment: t,
        canGenerate: R.trim().length > 0,
        workflowCustomised: l.workflow.customised,
        unmappableFields: l.unmappableFields,
        hero: /* @__PURE__ */ u.jsx(rM, { deployment: t }),
        quickActions: /* @__PURE__ */ u.jsx(
          BO,
          {
            deploymentId: t.deploymentId,
            createPayload: At,
            canGenerate: R.trim().length > 0,
            diagnostics: pt
          }
        ),
        scriptSection: /* @__PURE__ */ u.jsx(
          vk,
          {
            quickMode: ce,
            onToggleQuickMode: W,
            deployment: t,
            script: R,
            onScriptChange: T,
            outputFormat: k,
            mappingsByLower: P,
            defaultVoiceAssetId: re,
            onDefaultVoiceAssetIdChange: te
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ u.jsx(S3, { lines: B, characterColors: _ }),
        voiceLibrarySection: /* @__PURE__ */ u.jsx(
          y_,
          {
            deploymentId: t.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: _,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ u.jsx(eM, { unmappedCount: le, totalCount: Q.length, children: Q.map((he) => {
          const ke = P.get(he.toLowerCase()) ?? null, De = _[he] ?? "#ba9eff";
          return /* @__PURE__ */ u.jsx("li", { className: mR, children: /* @__PURE__ */ u.jsx(
            W_,
            {
              characterName: he,
              color: De,
              lineCount: Z[he] ?? 0,
              mapping: ke,
              voiceAssets: h,
              presets: g,
              active: b === he,
              onToggle: () => v((Te) => Te === he ? null : he),
              onAssignVoiceAsset: (Te) => fe(he, { speakerVoiceAssetId: Te }),
              onAssignPreset: (Te) => fe(he, { defaultVectorPresetId: Te }),
              onUploadFile: (Te) => Ae(he, Te),
              onClearMapping: () => ge(he)
            }
          ) }, he);
        }) }),
        emotionSection: /* @__PURE__ */ u.jsx(
          XA,
          {
            value: J,
            onChange: ne,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx(
            A3,
            {
              value: { ...O, pace: M },
              onChange: (he) => {
                C(he), he.pace !== M && I(he.pace);
              }
            }
          ),
          /* @__PURE__ */ u.jsx(
            qh,
            {
              state: S,
              onChange: _e,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ u.jsx(q3, { checks: et }),
          /* @__PURE__ */ u.jsx(
            d3,
            {
              outputFormat: k,
              onOutputFormatChange: z,
              speedFactor: M,
              onSpeedFactorChange: I,
              cachePolicy: F,
              onCachePolicyChange: ie,
              generation: A,
              onGenerationChange: q
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ u.jsx(K3, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ u.jsx(
          O_,
          {
            deploymentId: t.deploymentId,
            targets: $e,
            onRevertToIdentity: Pt,
            onRevertToChain: Jt
          }
        )
      }
    )
  ] });
}
const kb = /* @__PURE__ */ new Map();
function Lk(t, a) {
  const [i, l] = y.useState({
    peaks: null,
    isLoading: !0,
    error: null
  });
  return y.useEffect(() => {
    if (!t || a <= 0) {
      l({ peaks: null, isLoading: !1, error: null });
      return;
    }
    const o = `${t}::${a}`, d = kb.get(o);
    if (d) {
      l({ peaks: d, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return l({ peaks: null, isLoading: !0, error: null }), Uk(t, a, h.signal).then((m) => {
      h.signal.aborted || (kb.set(o, m), l({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      l({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [t, a]), i;
}
async function Uk(t, a, i) {
  const l = await fetch(t, { signal: i });
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const o = await l.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return Bk(h, a);
}
function Bk(t, a) {
  const i = t.numberOfChannels, l = t.length, o = Math.max(1, Math.floor(l / a)), d = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(l, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let S = 0;
      for (let w = 0; w < i; w += 1) {
        const N = h[w];
        N && (S += Math.abs(N[v] ?? 0));
      }
      const E = S / i;
      E > b && (b = E);
    }
    d[m] = b;
  }
  return d;
}
const Lb = "(prefers-reduced-motion: reduce)";
function Vk() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(Lb).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia(Lb), l = (o) => a(o.matches);
    return i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), t;
}
var $k = "mquzal0", Hk = "mquzal1", Ub = "mquzal2", Bb = "mquzal3", Vb = "mquzal4", qk = "mquzal5", $b = "mquzal6", Hb = "mquzal7";
const Ik = 120, Fk = 720;
function AS(t) {
  const {
    audioUrl: a,
    durationMs: i,
    startMs: l,
    endMs: o,
    onChangeStart: d,
    onChangeEnd: h,
    isPlaying: m = !1,
    playbackPositionMs: g = 0,
    onSeek: p,
    width: b = Fk,
    height: v = Ik
  } = t, S = y.useRef(null), E = y.useRef(null), w = y.useRef(null), N = Lk(a, b), R = Vk();
  y.useEffect(() => {
    Yk(S.current, N.peaks, b, v);
  }, [N.peaks, b, v]);
  const T = y.useCallback(
    (A) => {
      const q = E.current?.getBoundingClientRect();
      if (!q || q.width <= 0) return 0;
      const F = Math.max(0, Math.min(1, (A - q.left) / q.width));
      return Math.round(F * i);
    },
    [i]
  );
  y.useEffect(() => {
    const A = (F) => {
      if (!w.current) return;
      const ie = T(F.clientX);
      w.current === "start" ? d(nc(ie, 0, o - 1)) : h(nc(ie, l + 1, i));
    }, q = () => {
      w.current = null;
    };
    return window.addEventListener("pointermove", A), window.addEventListener("pointerup", q), () => {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", q);
    };
  }, [T, i, o, l, d, h]);
  const k = (A) => (q) => {
    q.preventDefault(), q.stopPropagation(), w.current = A;
  }, z = (A) => {
    !p || A.target.closest("[data-handle]") || p(T(A.clientX));
  }, M = (A) => (q) => {
    const F = q.shiftKey ? 100 : q.ctrlKey ? 1 : 10;
    let ie = 0;
    if (q.key === "ArrowLeft") ie = -F;
    else if (q.key === "ArrowRight") ie = F;
    else return;
    q.preventDefault(), A === "start" ? d(nc(l + ie, 0, o - 1)) : h(nc(o + ie, l + 1, i));
  }, I = Vf(l, i), J = Vf(o, i), ne = Vf(g, i);
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      ref: E,
      className: $k,
      style: { height: v },
      onPointerDown: z,
      children: [
        /* @__PURE__ */ u.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: Hk,
            "aria-label": "Audio waveform"
          }
        ),
        N.isLoading && /* @__PURE__ */ u.jsx("div", { className: Hb, children: "Decoding waveform…" }),
        N.error && /* @__PURE__ */ u.jsx("div", { className: Hb, role: "alert", children: N.error }),
        /* @__PURE__ */ u.jsx("div", { className: $b, style: { left: 0, width: `${I}%` } }),
        /* @__PURE__ */ u.jsx(
          "div",
          {
            className: $b,
            style: { left: `${J}%`, right: 0, width: `${100 - J}%` }
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "div",
          {
            className: Ub,
            style: { left: `${I}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": l,
            tabIndex: 0,
            onPointerDown: k("start"),
            onKeyDown: M("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ u.jsx("span", { className: Bb, "aria-hidden": "true" }),
              /* @__PURE__ */ u.jsx("span", { className: Vb, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "div",
          {
            className: Ub,
            style: { left: `${J}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: k("end"),
            onKeyDown: M("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ u.jsx("span", { className: Bb, "aria-hidden": "true" }),
              /* @__PURE__ */ u.jsx("span", { className: Vb, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ u.jsx(
          "div",
          {
            className: qk,
            style: {
              left: `${ne}%`,
              transition: R ? "none" : void 0
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Vf(t, a) {
  return a <= 0 ? 0 : Math.max(0, Math.min(100, t / a * 100));
}
function nc(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function Yk(t, a, i, l) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, l), !a || a.length === 0)) return;
  const d = l / 2;
  o.fillStyle = Gk(t, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (l - 4));
    o.fillRect(m, d - p / 2, 1, p);
  }
}
function Gk(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var Xk = "r8lfsm0", Pk = "r8lfsm1", Kk = "r8lfsm2", Qk = "r8lfsm3", Zk = "r8lfsm4", Jk = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, Wk = "_1b1zchy3", e6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, t6 = "_1b1zchy6", n6 = "_1b1zchy7";
const DS = y.createContext("standalone");
function zS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: l,
  ...o
}) {
  const d = [Jk[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx(DS.Provider, { value: t, children: /* @__PURE__ */ u.jsx("div", { className: d, style: l, ...o, children: a }) });
}
function OS({
  title: t,
  meta: a,
  children: i,
  className: l,
  titleId: o
}) {
  const d = y.useContext(DS), h = [Wk, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsxs("div", { className: h, children: [
    /* @__PURE__ */ u.jsx("h3", { id: o, className: e6[d], children: t }),
    a ? /* @__PURE__ */ u.jsx("span", { className: t6, children: a }) : null,
    i
  ] });
}
function kS({
  children: t,
  className: a,
  role: i = "group"
}) {
  const l = [n6, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx("div", { className: l, role: i, children: t });
}
const qb = -16, a6 = 80, r6 = 720;
function i6(t) {
  const { deploymentId: a, runId: i, utterance: l, audioUrl: o, onApplied: d, onError: h, onCancel: m } = t, g = l.durationMs ?? 0, [p, b] = y.useState(() => Ib(g)), [v, S] = y.useState(Uc), [E, w] = y.useState(!1), [N, R] = y.useState(!1), [T, k] = y.useState(null), [z, M] = y.useState(!1), I = y.useRef(null), J = y.useRef(null), ne = y.useRef(null);
  y.useEffect(() => {
    const U = Ib(g);
    b(U), S(e1(U)), R(!1), k(null), ne.current = null;
  }, [l.utteranceId, g]);
  const A = y.useCallback((U) => {
    S(U), b((B) => Wx(B, U));
  }, []);
  y.useEffect(() => () => J.current?.abort(), []), y.useEffect(() => {
    I.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [l.utteranceId]);
  const q = y.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), F = y.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), ie = F?.start_ms ?? 0, re = F?.end_ms ?? Math.max(1, g), te = y.useCallback((U, B) => {
    b((Q) => s6(Q, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(B))
    })));
  }, []), ce = y.useCallback((U) => te(U, re), [re, te]), W = y.useCallback((U) => te(ie, U), [ie, te]), O = y.useCallback((U) => {
    R(U), b((B) => {
      const Q = B.ops.filter((_) => _.mode !== "normalize");
      if (U) {
        const _ = {
          id: Sn(),
          mode: "normalize",
          target_lufs: qb
        };
        return { ...B, ops: [...Q, _] };
      }
      return { ...B, ops: Q };
    });
  }, []), C = y.useCallback(async () => {
    const U = Hx(p, g);
    if (U) {
      k(U.message);
      return;
    }
    if (k(null), z) return;
    J.current?.abort();
    const B = new AbortController();
    J.current = B, M(!0);
    try {
      const Q = ne.current ?? void 0, _ = await kC(
        a,
        i,
        l.utteranceId,
        Q ? { chain: p, digest_before: Q } : { chain: p },
        { signal: B.signal }
      );
      if (B.signal.aborted) return;
      ne.current = _.chain_digest, d(_);
    } catch (Q) {
      if (B.signal.aborted) return;
      Q instanceof Ki && (ne.current = Q.currentDigest || null);
      const _ = Q instanceof Ki ? "Edit chain has changed in another tab. Reload to continue." : Q instanceof Error ? Q.message : "apply failed";
      k(_), h(_);
    } finally {
      B.signal.aborted || M(!1);
    }
  }, [p, g, z, a, i, l.utteranceId, d, h]);
  return /* @__PURE__ */ u.jsx(zS, { variant: "nested", children: /* @__PURE__ */ u.jsxs("div", { ref: I, onKeyDown: q, children: [
    /* @__PURE__ */ u.jsx(OS, { title: "Edit segment", meta: `Source · ${ac(g)}` }),
    /* @__PURE__ */ u.jsx(
      AS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: ie,
        endMs: re,
        onChangeStart: ce,
        onChangeEnd: W,
        height: a6,
        width: r6
      }
    ),
    /* @__PURE__ */ u.jsxs("div", { className: Xk, children: [
      /* @__PURE__ */ u.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ u.jsxs("span", { className: Pk, children: [
        ac(ie),
        " → ",
        ac(re),
        " · ",
        ac(re - ie)
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: Kk, children: [
      /* @__PURE__ */ u.jsxs("label", { className: Qk, children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: (U) => O(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ u.jsxs("span", { children: [
          "Normalize to ",
          qb.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs(
        "button",
        {
          type: "button",
          className: Zk,
          onClick: () => w((U) => !U),
          "aria-expanded": E,
          children: [
            E ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    E && /* @__PURE__ */ u.jsx(
      qh,
      {
        state: v,
        onChange: A,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ u.jsxs(kS, { children: [
      /* @__PURE__ */ u.jsx(Ve, { size: "sm", onClick: () => void C(), disabled: z, children: z ? "Applying…" : "Apply" }),
      /* @__PURE__ */ u.jsx(Ve, { variant: "ghost", size: "sm", onClick: m, disabled: z, children: "Cancel" })
    ] }),
    T && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: T })
  ] }) });
}
function Ib(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function s6(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function ac(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var l6 = "jq2zyb2", o6 = "jq2zyb3", c6 = "jq2zyb4", u6 = "jq2zyb5", d6 = "jq2zyb6", f6 = "jq2zyb7", h6 = "jq2zyb8", m6 = "jq2zyb9", p6 = "jq2zyba", v6 = "jq2zybb", g6 = "jq2zybc", y6 = "jq2zybd", b6 = "jq2zybe", x6 = "jq2zybf jq2zybe", S6 = "jq2zybg", w6 = "jq2zybh", E6 = "jq2zybi", j6 = "jq2zybj", N6 = "jq2zybk", T6 = "jq2zybl", C6 = "jq2zybm", R6 = "jq2zybn", _6 = "jq2zybo", M6 = "jq2zybp", A6 = "jq2zybq", D6 = "jq2zybr", z6 = "jq2zybs", O6 = "jq2zybt", k6 = "jq2zybu", L6 = "jq2zybv", U6 = "jq2zybw", B6 = "jq2zybx", V6 = "jq2zyby", Fb = "jq2zybz", $6 = "jq2zyb10", H6 = "jq2zyb11", q6 = "jq2zyb12";
const I6 = ["cancelled", "failed", "partial"], F6 = 2600;
function Y6() {
  const { run: t } = Nl(), a = El(), [i, l] = y.useState(t), [o, d] = y.useState(!1), [h, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    l(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const M = setTimeout(() => v(null), F6);
    return () => clearTimeout(M);
  }, [b]);
  const S = y.useMemo(() => P6(i), [i]), E = I6.includes(i.status) && i.kind === "batch", w = (i.exportZipStaleAt ?? null) !== null, N = async () => {
    if (i.deploymentId) {
      d(!0), m(null);
      try {
        const { runId: M } = await Vx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${M}`);
      } catch (M) {
        m(Z6(M));
      } finally {
        d(!1);
      }
    }
  }, R = y.useCallback((M) => {
    p((I) => I === M ? null : M);
  }, []), T = y.useCallback(() => {
    p(null);
  }, []), k = (M, I) => {
    l((J) => X6(J, M, I)), p(null), v({ message: "Segment edited", severity: "success" });
  }, z = y.useCallback((M) => {
    v({ message: M, severity: "error" });
  }, []);
  return /* @__PURE__ */ u.jsxs("main", { className: l6, children: [
    /* @__PURE__ */ u.jsxs("div", { className: o6, children: [
      /* @__PURE__ */ u.jsxs("header", { className: c6, children: [
        /* @__PURE__ */ u.jsxs("p", { className: u6, children: [
          i.deploymentId ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
            /* @__PURE__ */ u.jsx(Lh, { to: `/${i.deploymentId}/recipe`, className: d6, children: "← Back to recipe" }),
            /* @__PURE__ */ u.jsx("span", { className: f6, children: "·" })
          ] }) : null,
          /* @__PURE__ */ u.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: h6, children: [
          /* @__PURE__ */ u.jsxs("h1", { className: m6, children: [
            K6(i.kind),
            /* @__PURE__ */ u.jsx("span", { className: p6, children: i.runId })
          ] }),
          /* @__PURE__ */ u.jsx(Zr, { size: "md", tone: J6(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("section", { className: v6, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ u.jsx(rc, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ u.jsx(rc, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ u.jsx(
          rc,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ u.jsx(
          rc,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      E && /* @__PURE__ */ u.jsxs("section", { className: w6, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ u.jsxs("div", { className: E6, children: [
          /* @__PURE__ */ u.jsx("h2", { id: "run-detail-resume-title", className: j6, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ u.jsx("p", { className: N6, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ u.jsx(Ve, { size: "lg", disabled: o, onClick: () => void N(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ u.jsx("p", { className: T6, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ u.jsxs(La, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ u.jsxs(HT, { children: [
          /* @__PURE__ */ u.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ u.jsxs("span", { className: C6, children: [
            /* @__PURE__ */ u.jsx("span", { className: R6, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("ul", { className: _6, children: i.utterances.map((M) => {
          const I = g === M.utteranceId, J = M.status === "completed" && M.audioArtifactRef !== null && M.audioArtifactRef !== void 0, ne = M.derivedArtifactRef ?? M.audioArtifactRef ?? null, A = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", q = (M.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ u.jsxs("li", { className: A6, children: [
            /* @__PURE__ */ u.jsxs("div", { className: M6, children: [
              /* @__PURE__ */ u.jsxs("span", { className: z6, children: [
                "#",
                M.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ u.jsx("span", { className: O6, title: M.characterDisplay, children: M.characterDisplay }),
              /* @__PURE__ */ u.jsx("span", { className: k6, title: M.text, children: M.text }),
              /* @__PURE__ */ u.jsxs("span", { className: L6, children: [
                M.cacheHit && /* @__PURE__ */ u.jsx("span", { className: U6, children: "cached" }),
                q && /* @__PURE__ */ u.jsx("span", { className: D6, children: "edited" }),
                M.durationMs ? /* @__PURE__ */ u.jsx("span", { children: Q6(M.durationMs) }) : null,
                /* @__PURE__ */ u.jsx(Zr, { tone: W6(M.status), children: M.status }),
                J && /* @__PURE__ */ u.jsx(
                  Ve,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => R(M.utteranceId),
                    "aria-expanded": I,
                    "aria-label": I ? "Close segment editor" : "Edit segment",
                    children: I ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            I && A && i.deploymentId && /* @__PURE__ */ u.jsx(
              i6,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: M,
                audioUrl: A,
                onApplied: (F) => k(M.utteranceId, F),
                onError: z,
                onCancel: T
              }
            )
          ] }, M.utteranceId);
        }) })
      ] }),
      G6(i, w)
    ] }),
    b && /* @__PURE__ */ u.jsx(
      "div",
      {
        className: q6,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function G6(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const l = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ u.jsx("div", { className: B6, children: a ? /* @__PURE__ */ u.jsxs("div", { className: $6, children: [
    /* @__PURE__ */ u.jsx("p", { className: H6, children: l }),
    /* @__PURE__ */ u.jsxs(
      Ve,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ u.jsx("span", { className: Fb, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ u.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: V6,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ u.jsx("span", { className: Fb, children: "↓" })
      ]
    }
  ) : null });
}
function X6(t, a, i) {
  const l = t.utterances.map((o) => o.utteranceId !== a ? o : {
    ...o,
    derivedArtifactRef: i.derived_artifact_ref,
    durationMs: i.derived_duration_ms
  });
  return {
    ...t,
    utterances: l,
    exportZipStaleAt: t.exportZipStaleAt ?? Math.floor(Date.now() / 1e3)
  };
}
function rc({ label: t, value: a, mono: i, progress: l }) {
  const o = l !== void 0 ? Math.min(1, Math.max(0, l)) : void 0;
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: g6,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ u.jsx("span", { className: y6, children: t }),
        /* @__PURE__ */ u.jsx("span", { className: i ? x6 : b6, children: a }),
        o !== void 0 && /* @__PURE__ */ u.jsx("span", { className: S6, "aria-hidden": "true" })
      ]
    }
  );
}
function P6(t) {
  const a = t.utterances.length, i = t.utterances.filter((h) => h.status === "completed").length, l = t.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = t.utterances.filter((h) => h.cacheHit).length, d = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: l, cached: o, cacheRatio: d };
}
function K6(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function Q6(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function Z6(t) {
  return t instanceof Wi ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function J6(t) {
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
function W6(t) {
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
var eL = "pcphqj2", tL = "pcphqj3", nL = "pcphqj4", aL = "pcphqj5", rL = "pcphqj6", iL = "pcphqj7", sL = "pcphqj8", lL = "pcphqj9", oL = "pcphqja", Yb = "pcphqjb", cL = "pcphqjc", uL = "pcphqjd", dL = "pcphqje pcphqjd", fL = "pcphqjf", hL = "pcphqjg", mL = "pcphqjh", pL = "pcphqji", vL = "pcphqjj pcphqji", gL = "pcphqjk pcphqji", yL = "pcphqjl pcphqji", bL = "pcphqjm", $f = "pcphqjn", Hf = "pcphqjo";
function xL() {
  const [t, a] = y.useState(null), [i, l] = y.useState(null);
  return y.useEffect(() => {
    let o = !1;
    const d = async () => {
      try {
        const m = await ht("/runtime/queue");
        o || (a(m.entries), l(null));
      } catch (m) {
        o || l(m instanceof Error ? m.message : "Unknown error");
      }
    };
    d();
    const h = setInterval(() => void d(), 3e3);
    return () => {
      o = !0, clearInterval(h);
    };
  }, []), /* @__PURE__ */ u.jsx("main", { className: eL, children: /* @__PURE__ */ u.jsxs("div", { className: tL, children: [
    /* @__PURE__ */ u.jsxs("header", { className: nL, children: [
      /* @__PURE__ */ u.jsx("p", { className: aL, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ u.jsxs("div", { className: rL, children: [
        /* @__PURE__ */ u.jsx("h1", { className: iL, children: "Queue" }),
        /* @__PURE__ */ u.jsx("span", { className: sL, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ u.jsx("p", { className: lL, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ u.jsx(zn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ u.jsx(La, { density: "compact", children: /* @__PURE__ */ u.jsx(Tl, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ u.jsxs(La, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ u.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ u.jsx("ul", { className: oL, children: t.map((o) => {
        const d = o.position === 1;
        return /* @__PURE__ */ u.jsxs(
          "li",
          {
            className: d ? `${Yb} ${cL}` : Yb,
            children: [
              /* @__PURE__ */ u.jsx("span", { className: d ? dL : uL, children: o.position }),
              /* @__PURE__ */ u.jsxs("span", { className: fL, children: [
                /* @__PURE__ */ u.jsx("span", { className: hL, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ u.jsx("span", { className: mL, children: o.runId })
              ] }),
              /* @__PURE__ */ u.jsx("span", { className: SL(o.kind), children: wL(o.kind) }),
              /* @__PURE__ */ u.jsx("span", { className: bL, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                /* @__PURE__ */ u.jsx("span", { className: $f, children: EL(o.etaSeconds) }),
                /* @__PURE__ */ u.jsx("span", { className: Hf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                /* @__PURE__ */ u.jsx("span", { className: $f, children: o.utteranceTotal }),
                /* @__PURE__ */ u.jsx("span", { className: Hf, children: "lines" })
              ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                /* @__PURE__ */ u.jsx("span", { className: $f, children: "—" }),
                /* @__PURE__ */ u.jsx("span", { className: Hf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function SL(t) {
  switch (t) {
    case "batch":
      return vL;
    case "test_line":
      return gL;
    case "resume":
      return yL;
    default:
      return pL;
  }
}
function wL(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function EL(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function jL() {
  const { deploymentId: t, prefillCharacterName: a } = Nl(), i = El(), [l, o] = y.useState(a), [d, h] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, S] = y.useState(null), E = y.useRef(null);
  y.useEffect(() => {
    E.current?.scrollIntoView({ behavior: "smooth", block: "center" }), E.current?.focus();
  }, []);
  const w = async (N) => {
    N.preventDefault(), b(!0), S(null);
    try {
      await Uh(t, {
        characterName: l,
        speakerVoiceAssetId: d,
        defaultEmotionMode: m
      }), i(`/${t}/recipe`);
    } catch (R) {
      S(R instanceof Error ? R.message : "failed");
    } finally {
      b(!1);
    }
  };
  return /* @__PURE__ */ u.jsxs("main", { children: [
    /* @__PURE__ */ u.jsx("h1", { children: "New character mapping" }),
    /* @__PURE__ */ u.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ u.jsxs("label", { children: [
        "Character name",
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: E,
            value: l,
            onChange: (N) => o(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("label", { children: [
        "Speaker voice asset id",
        /* @__PURE__ */ u.jsx(
          "input",
          {
            value: d,
            onChange: (N) => h(N.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ u.jsxs("select", { value: m, onChange: (N) => g(N.currentTarget.value), children: [
          /* @__PURE__ */ u.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ u.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ u.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ u.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx(Ve, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: v })
    ] })
  ] });
}
var NL = "_1oor31e0", TL = "_1oor31e1", CL = "_1oor31e2", RL = "_1oor31e3", _L = "_1oor31e4", ML = "_1oor31e5", AL = "_1oor31e6", DL = "_1oor31e7", zL = "_1oor31e8";
const OL = 8;
function kL(t) {
  const { entries: a, loading: i, error: l } = t;
  return /* @__PURE__ */ u.jsxs("div", { className: NL, "aria-busy": !!i, children: [
    l && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: l }),
    i && !l && /* @__PURE__ */ u.jsx("div", { className: zL, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !l && a.length === 0 && /* @__PURE__ */ u.jsx("div", { className: DL, children: "No edits yet" }),
    !i && !l && a.length > 0 && /* @__PURE__ */ u.jsx("ul", { className: TL, children: a.map((o) => /* @__PURE__ */ u.jsxs("li", { className: CL, children: [
      /* @__PURE__ */ u.jsx("span", { className: RL, children: UL(o.recorded_at) }),
      /* @__PURE__ */ u.jsx("span", { className: _L, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ u.jsx("span", { className: ML, title: o.digest_after, children: LL(o.digest_after) }),
      /* @__PURE__ */ u.jsx("span", { className: AL, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function LL(t) {
  return t ? `${t.slice(0, OL)}…` : "—";
}
function UL(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Gb = "_1c63kaw0", BL = "_1c63kaw1", VL = "_1c63kaw2", $L = "_1c63kaw3", HL = "_1c63kaw4", qL = "_1c63kaw5", IL = "_1c63kaw6";
function FL({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ u.jsx("div", { className: Gb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ u.jsx("span", { className: BL, children: "No edits yet" }) }) : /* @__PURE__ */ u.jsx("ol", { className: Gb, "data-testid": "edit-chain-list", children: t.ops.map((i, l) => /* @__PURE__ */ u.jsxs("li", { className: VL, children: [
    /* @__PURE__ */ u.jsxs("span", { className: $L, "aria-hidden": "true", children: [
      l + 1,
      "."
    ] }),
    /* @__PURE__ */ u.jsxs("span", { className: HL, children: [
      /* @__PURE__ */ u.jsx("span", { className: qL, children: Xb(i) }),
      /* @__PURE__ */ u.jsx("span", { className: IL, children: YL(i) })
    ] }),
    /* @__PURE__ */ u.jsx(
      Ve,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Xb(i)} (position ${l + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Xb(t) {
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
function YL(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Pb(t.start_ms)} → ${Pb(t.end_ms)}`;
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
      return `${qf(t.low_db)} / ${qf(t.mid_db)} / ${qf(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function qf(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function Pb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var ic = "_1o3ytop0", If = "_1o3ytop1", Kb = "_1o3ytop2", GL = "_1o3ytop3", XL = "_1o3ytop4", PL = "_1o3ytop5", KL = "_1o3ytop6", QL = "_1o3ytop7", sc = "_1o3ytop8", ZL = "_1o3ytop9", JL = "_1o3ytopf", WL = "_1o3ytopg", e8 = "_1o3ytoph", t8 = "_1o3ytopi", n8 = "_1o3ytopj", a8 = "_1o3ytopk", r8 = "_1t0zy2f0", i8 = "_1t0zy2f1", s8 = "_1t0zy2f2";
function l8({ content: t, children: a, delayMs: i = 350 }) {
  const [l, o] = y.useState(!1), d = y.useId(), h = y.useRef(null), m = y.useCallback(() => {
    h.current != null && (window.clearTimeout(h.current), h.current = null);
  }, []), g = y.useCallback(() => {
    m(), h.current = window.setTimeout(() => o(!0), i);
  }, [m, i]), p = y.useCallback(() => {
    m(), o(!1);
  }, [m]);
  if (y.useEffect(() => () => m(), [m]), y.useEffect(() => {
    if (!l) return;
    const v = (S) => {
      S.key === "Escape" && o(!1);
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [l]), !y.isValidElement(a))
    return /* @__PURE__ */ u.jsx(u.Fragment, { children: a });
  const b = {
    onMouseEnter: g,
    onMouseLeave: p,
    onFocus: g,
    onBlur: p,
    "aria-describedby": l ? d : void 0
  };
  return /* @__PURE__ */ u.jsxs("span", { className: r8, children: [
    y.cloneElement(a, b),
    l && /* @__PURE__ */ u.jsx("span", { role: "tooltip", id: d, className: s8, children: t })
  ] });
}
function lc({ label: t, content: a }) {
  return /* @__PURE__ */ u.jsx(l8, { content: a, children: /* @__PURE__ */ u.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: i8, children: "?" }) });
}
const Qb = -16;
function o8(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: l = [],
    onChainPersisted: o,
    onError: d
  } = t, h = a.durationMs ?? 0, m = y.useMemo(
    () => c8(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => Ff(h)), [b, v] = y.useState(Uc), [S, E] = y.useState(!1), [w, N] = y.useState(null), [R, T] = y.useState(null), [k, z] = y.useState(!1), [M, I] = y.useState(!1), [J, ne] = y.useState(!1), [A, q] = y.useState(null), [F, ie] = y.useState([]), [re, te] = y.useState(null), [ce, W] = y.useState([]), [O, C] = y.useState(!1), [U, B] = y.useState(null), [Q, _] = y.useState(0), Z = y.useRef(null), P = y.useRef(null), le = y.useRef(null), fe = y.useRef(null), ge = y.useRef(null), Ae = y.useRef(0), _e = y.useMemo(
    () => g.ops.some((ye) => ye.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const ye = Ff(h);
    p(ye), v(e1(ye)), N(null), ne(!1), ie([]), te(null), ge.current = null;
  }, [a.voiceAssetId, h]);
  const $e = y.useCallback((ye) => {
    v(ye), p((ze) => Wx(ze, ye));
  }, []);
  y.useEffect(() => {
    fe.current?.abort();
    const ye = new AbortController();
    return fe.current = ye, C(!0), B(null), fc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || W(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      B(Qe);
    }).finally(() => {
      ye.signal.aborted || C(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, Q]), y.useEffect(() => () => {
    R && URL.revokeObjectURL(R);
  }, [R]), y.useEffect(() => () => {
    P.current?.abort(), le.current?.abort(), fe.current?.abort();
  }, []);
  const Jt = g.ops.find((ye) => ye.mode === "trim"), Pt = g.ops.find((ye) => ye.mode === "normalize"), At = Jt?.start_ms ?? 0, et = Jt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Qe) => Zb(
        Qe,
        "trim",
        (nt) => ({
          ...nt,
          mode: "trim",
          start_ms: Math.max(0, Math.floor(ye)),
          end_ms: Math.max(Math.floor(ye) + 1, Math.floor(ze))
        })
      )
    );
  }, []), he = y.useCallback(
    (ye) => pt(ye, et),
    [et, pt]
  ), ke = y.useCallback(
    (ye) => pt(At, ye),
    [At, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (ye) {
        const nt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Qb
        };
        return { ...ze, ops: [...Qe, nt] };
      }
      return { ...ze, ops: Qe };
    });
  }, []), Te = y.useCallback(
    (ye) => {
      const ze = g.ops.findIndex((It) => It.id === ye);
      if (ze === -1) return;
      const Qe = g.ops[ze];
      if (!Qe) return;
      const nt = [...g.ops.slice(0, ze), ...g.ops.slice(ze + 1)];
      p({ ...g, ops: nt }), ie((It) => [...It, { op: Qe, index: ze }]);
    },
    [g]
  ), bt = y.useCallback(() => {
    const ye = F[F.length - 1];
    if (!ye) return;
    const ze = Math.min(ye.index, g.ops.length), Qe = [...g.ops.slice(0, ze), ye.op, ...g.ops.slice(ze)];
    p({ ...g, ops: Qe }), ie(F.slice(0, -1));
  }, [g, F]), xt = y.useCallback(() => {
    const ye = Hx(g, h);
    return ye ? (N(ye.message), !1) : (N(null), !0);
  }, [g, h]), dn = y.useCallback(async () => {
    if (!xt() || k) return;
    P.current?.abort();
    const ye = new AbortController();
    P.current = ye;
    const ze = ++Ae.current;
    I(!0);
    try {
      const Qe = await UC(a.voiceAssetId, i, g, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== Ae.current) return;
      R && URL.revokeObjectURL(R);
      const nt = URL.createObjectURL(Qe);
      T(nt), ne(!0), requestAnimationFrame(() => Z.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      N(nt), d(nt);
    } finally {
      ye.signal.aborted || I(!1);
    }
  }, [xt, k, a.voiceAssetId, i, g, R, d]), Ht = y.useCallback(async () => {
    if (!xt() || M || k) return;
    if (l.length > 1) {
      const ze = l.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${l.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    P.current?.abort(), le.current?.abort();
    const ye = new AbortController();
    le.current = ye, z(!0);
    try {
      const ze = ge.current ?? void 0, Qe = await $x(
        a.voiceAssetId,
        i,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ge.current = Qe.chain_digest, te(Qe.chain_digest), N(null), q(Qe.measured_lufs ?? null), ie([]), o(Qe), _((nt) => nt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Ki;
      ze instanceof Ki && (ge.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      N(nt), d(nt);
    } finally {
      ye.signal.aborted || z(!1);
    }
  }, [
    xt,
    M,
    k,
    l,
    a.voiceAssetId,
    i,
    g,
    o,
    d
  ]), On = y.useCallback(() => {
    P.current?.abort(), p(Ff(h)), N(null), q(null), ne(!1), ie([]), _((ye) => ye + 1), R && (URL.revokeObjectURL(R), T(null));
  }, [h, R]), qt = y.useCallback((ye) => {
    p(
      (ze) => Zb(
        ze,
        "normalize",
        (Qe) => ({
          ...Qe,
          mode: "normalize",
          target_lufs: ye
        })
      )
    );
  }, []);
  return /* @__PURE__ */ u.jsxs(zS, { variant: "standalone", children: [
    /* @__PURE__ */ u.jsx(
      OS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${oc(h)}`
      }
    ),
    /* @__PURE__ */ u.jsx(
      AS,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: et,
        onChangeStart: he,
        onChangeEnd: ke
      }
    ),
    /* @__PURE__ */ u.jsxs("div", { className: ic, children: [
      /* @__PURE__ */ u.jsxs("span", { className: If, children: [
        /* @__PURE__ */ u.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ u.jsx(
          lc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("span", { className: Kb, children: [
        oc(At),
        " → ",
        oc(et),
        " · ",
        oc(et - At)
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: QL, children: [
      /* @__PURE__ */ u.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ u.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ u.jsxs("span", { className: If, children: [
            /* @__PURE__ */ u.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ u.jsx(
              lc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          _e && Pt && /* @__PURE__ */ u.jsxs("span", { className: JL, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            A !== null && ` · measured ${A.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: ZL, children: [
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "checkbox",
              checked: _e,
              onChange: (ye) => De(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Target ",
            Qb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        _e && Pt && /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "range",
            className: e8,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (ye) => qt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ u.jsxs("span", { className: ic, children: [
          /* @__PURE__ */ u.jsxs("span", { className: If, children: [
            /* @__PURE__ */ u.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ u.jsx(
              lc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ u.jsx("span", { className: Kb, children: g.ops.length })
        ] }),
        /* @__PURE__ */ u.jsx(FL, { chain: g, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: sc, children: [
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: GL,
            onClick: () => E((ye) => !ye),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ u.jsx("span", { className: XL, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ u.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ u.jsx("span", { className: PL, children: "gain · EQ · pitch · fade · silence trim" }),
              /* @__PURE__ */ u.jsx(
                lc,
                {
                  label: "advanced effects",
                  content: /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
                    "Fine-tune the voice without re-recording.",
                    /* @__PURE__ */ u.jsx("br", {}),
                    /* @__PURE__ */ u.jsx("strong", { children: "Gain" }),
                    ": makes the whole clip louder/quieter.",
                    /* @__PURE__ */ u.jsx("br", {}),
                    /* @__PURE__ */ u.jsx("strong", { children: "EQ" }),
                    ": boosts low (bass), mid (vowels), or high (consonants) bands.",
                    /* @__PURE__ */ u.jsx("br", {}),
                    /* @__PURE__ */ u.jsx("strong", { children: "Pitch" }),
                    ": shifts the perceived voice up/down in semitones.",
                    /* @__PURE__ */ u.jsx("br", {}),
                    /* @__PURE__ */ u.jsx("strong", { children: "Fade" }),
                    ": smooth volume ramp at the start/end (no clicks).",
                    /* @__PURE__ */ u.jsx("br", {}),
                    /* @__PURE__ */ u.jsx("strong", { children: "Silence trim" }),
                    ": removes quiet gaps below a dB threshold."
                  ] })
                }
              )
            ]
          }
        ),
        S && /* @__PURE__ */ u.jsx(
          qh,
          {
            state: b,
            onChange: $e,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      re && /* @__PURE__ */ u.jsx("div", { className: sc, children: /* @__PURE__ */ u.jsxs("span", { className: ic, children: [
        /* @__PURE__ */ u.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ u.jsxs("span", { className: KL, title: re, children: [
          re.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ u.jsxs(kS, { children: [
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          variant: "secondary",
          onClick: () => void dn(),
          disabled: M || k,
          children: M ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          onClick: () => void Ht(),
          disabled: k || M,
          children: k ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ u.jsx(
        Ve,
        {
          variant: "ghost",
          onClick: On,
          disabled: k || M,
          children: "Reset"
        }
      ),
      F.length > 0 && /* @__PURE__ */ u.jsxs(
        Ve,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: k || M,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            F.length,
            ")"
          ]
        }
      ),
      J && /* @__PURE__ */ u.jsx(
        "span",
        {
          className: a8,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    R && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ u.jsx(
      "audio",
      {
        ref: Z,
        src: R,
        controls: !0,
        className: WL,
        "aria-label": "Edit preview"
      }
    ),
    w && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: w }),
    /* @__PURE__ */ u.jsxs("details", { className: t8, children: [
      /* @__PURE__ */ u.jsxs("summary", { className: n8, children: [
        "Edit history",
        ce.length > 0 ? ` · ${ce.length}` : ""
      ] }),
      /* @__PURE__ */ u.jsx(
        kL,
        {
          entries: ce,
          loading: O,
          error: U
        }
      )
    ] })
  ] });
}
function Ff(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function Zb(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function oc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function c8(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var u8 = "go9vi12", d8 = "go9vi13", f8 = "go9vi14", h8 = "go9vi15", m8 = "go9vi16", p8 = "go9vi17", v8 = "go9vi18", g8 = "go9vi19", y8 = "go9vi1a go9vi19", b8 = "go9vi1b", x8 = "go9vi1c", S8 = "go9vi1d", w8 = "go9vi1e", E8 = "go9vi1f", j8 = "go9vi1g", N8 = "go9vi1h", T8 = "go9vi1i", Fr = "go9vi1j", rl = "go9vi1k", Gi = "go9vi1l", C8 = "go9vi1m go9vi1l", R8 = "go9vi1n", _8 = "go9vi1o go9vi1n", M8 = "go9vi1p go9vi1n", A8 = "go9vi1q", D8 = "go9vi1r", z8 = "go9vi1s", O8 = "go9vi1t", LS = "go9vi1u", k8 = "go9vi1v", L8 = "go9vi1w", U8 = "go9vi1x go9vi1l", B8 = "go9vi1y", V8 = "go9vi1z", $8 = "go9vi110", H8 = "go9vi111", q8 = "go9vi112", I8 = "go9vi113";
const F8 = ["none", "audio_ref", "vector_preset", "qwen_template"];
function Y8() {
  const { deployment: t, mappings: a, voiceAssets: i } = Nl(), [l, o] = y.useState(a), [d, h] = y.useState(i), [m, g] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = y.useState(""), [v, S] = y.useState(null), [E, w] = y.useState(null), [N, R] = y.useState(null), T = y.useMemo(() => {
    const C = /* @__PURE__ */ new Map();
    for (const U of d) C.set(U.voiceAssetId, U);
    return C;
  }, [d]), k = y.useMemo(() => {
    const C = p.trim().toLowerCase();
    return C ? l.filter((U) => U.characterName.toLowerCase().includes(C)) : l;
  }, [l, p]), z = y.useMemo(
    () => l.find((C) => C.mappingId === m) ?? null,
    [l, m]
  );
  y.useEffect(() => {
    o(a), h(i), g(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!E) return;
    const C = setTimeout(() => w(null), 2600);
    return () => clearTimeout(C);
  }, [E]);
  const M = y.useCallback(async () => {
    const C = await ml(t.deploymentId);
    h(C.voiceAssets);
  }, [t.deploymentId]), I = y.useCallback(
    (C) => {
      o(
        (U) => U.map((B) => B.mappingId === m ? { ...B, ...C } : B)
      );
    },
    [m]
  ), J = y.useCallback(
    async (C) => {
      if (!z) return;
      const U = z;
      try {
        const B = await cl(t.deploymentId, z.mappingId, C);
        o((Q) => Q.map((_) => _.mappingId === B.mappingId ? B : _));
      } catch (B) {
        o(
          (Q) => Q.map((_) => _.mappingId === U.mappingId ? U : _)
        ), S(mr(B));
      }
    },
    [z, t.deploymentId]
  ), ne = y.useCallback(async () => {
    const C = d[0];
    if (!C) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = Z8(l), B = await Uh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: C.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((Q) => [...Q, B]), g(B.mappingId);
    } catch (U) {
      S(mr(U));
    }
  }, [t.deploymentId, d, l]), A = y.useCallback(() => {
    z && R({ id: z.mappingId, name: z.characterName });
  }, [z]), q = y.useCallback(async () => {
    if (!N) return;
    const { id: C, name: U } = N;
    R(null);
    try {
      await Bx(t.deploymentId, C), o((B) => B.filter((Q) => Q.mappingId !== C)), g(null), w(`Mapping for ${U} deactivated.`);
    } catch (B) {
      S(mr(B));
    }
  }, [t.deploymentId, N]), F = y.useCallback(
    async (C, U, B) => {
      try {
        const Q = await bc(t.deploymentId, C, U, B);
        return h((_) => [Q, ..._]), w(`${Q.displayName} uploaded.`), Q;
      } catch (Q) {
        return S(mr(Q)), null;
      }
    },
    [t.deploymentId]
  ), ie = y.useCallback(async () => {
    try {
      const C = await ET(t.deploymentId);
      aU(C, `${t.deploymentId}-mappings.json`), w("Mappings exported to JSON.");
    } catch (C) {
      S(mr(C));
    }
  }, [t.deploymentId]), re = y.useCallback(
    async (C, U) => {
      try {
        const B = await jT(
          t.deploymentId,
          C.mappings,
          U
        );
        w(
          `Imported ${B.created.length} • skipped ${B.skipped.length} • replaced ${B.replaced.length}.`
        );
        const Q = await ml(t.deploymentId);
        h(Q.voiceAssets);
      } catch (B) {
        S(mr(B));
      }
    },
    [t.deploymentId]
  ), te = y.useCallback(
    async (C) => {
      if (await M(), z && C.chain_digest)
        try {
          const U = await cl(t.deploymentId, z.mappingId, {
            voiceAssetChainDigest: C.chain_digest
          });
          o(
            (B) => B.map((Q) => Q.mappingId === U.mappingId ? U : Q)
          );
        } catch (U) {
          S(mr(U));
        }
      w("Edit applied.");
    },
    [M, z, t.deploymentId]
  ), ce = y.useCallback((C) => {
    S(C);
  }, []), W = y.useCallback(
    async (C, U) => {
      if (!z) return null;
      const B = C.trim() || `[${z.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await RT(t.deploymentId, {
          line: B,
          outputFormat: U
        })).runId };
      } catch (Q) {
        return S(mr(Q)), null;
      }
    },
    [t.deploymentId, z]
  ), O = d.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ u.jsxs("div", { className: u8, children: [
    /* @__PURE__ */ u.jsxs("aside", { className: d8, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ u.jsxs("header", { className: f8, children: [
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h1", { id: "mapping-sidebar-heading", className: h8, children: "Cast" }),
          /* @__PURE__ */ u.jsxs("span", { className: m8, children: [
            l.length,
            " active · ",
            d.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ u.jsx(Ve, { variant: "primary", size: "sm", onClick: ne, children: "+ Add" })
      ] }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "search",
          className: p8,
          placeholder: "Search characters",
          value: p,
          onChange: (C) => b(C.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ u.jsx(Q8, { onExport: ie, onImport: re, onParseError: S }),
      /* @__PURE__ */ u.jsx("div", { className: v8, children: k.length === 0 ? /* @__PURE__ */ u.jsx(
        Tl,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : k.map((C) => {
        const U = T.get(C.speakerVoiceAssetId), B = C.mappingId === m;
        return /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: B ? y8 : g8,
            onClick: () => g(C.mappingId),
            "aria-pressed": B,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ u.jsx("span", { className: b8, "aria-hidden": "true", children: J8(C.characterName) }),
              /* @__PURE__ */ u.jsxs("span", { className: x8, children: [
                /* @__PURE__ */ u.jsx("span", { className: S8, children: C.characterName }),
                /* @__PURE__ */ u.jsxs("span", { className: w8, children: [
                  C.defaultEmotionMode,
                  " · ",
                  U?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          C.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: E8, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ u.jsx(cm, { features: hm, children: /* @__PURE__ */ u.jsx(wS, { children: E && /* @__PURE__ */ u.jsx(
        fm.div,
        {
          className: k8,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: E
        },
        E
      ) }) }),
      v && /* @__PURE__ */ u.jsx(zn, { severity: "error", children: v }),
      N && /* @__PURE__ */ u.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ u.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          N.name,
          "?"
        ] }),
        /* @__PURE__ */ u.jsx(Ve, { variant: "danger", size: "sm", onClick: () => void q(), children: "Delete" }),
        /* @__PURE__ */ u.jsx(Ve, { variant: "ghost", size: "sm", onClick: () => R(null), children: "Cancel" })
      ] }),
      z ? /* @__PURE__ */ u.jsx(
        X8,
        {
          deploymentId: t.deploymentId,
          mapping: z,
          voiceAssets: d,
          allMappings: l,
          onNameChange: (C) => {
            I({ characterName: C });
          },
          onNameBlur: (C) => {
            C !== z.characterName && C.trim() && J({ characterName: C.trim() });
          },
          onSpeakerChange: (C) => {
            I({ speakerVoiceAssetId: C }), J({ speakerVoiceAssetId: C });
          },
          onModeChange: (C) => {
            I({ defaultEmotionMode: C }), J({ defaultEmotionMode: C });
          },
          onQwenChange: (C) => {
            I({ defaultQwenTemplate: C });
          },
          onQwenBlur: (C) => {
            J({ defaultQwenTemplate: C });
          },
          onSpeedChange: (C) => {
            I({ defaultSpeedFactor: C });
          },
          onSpeedCommit: (C) => {
            J({ defaultSpeedFactor: C });
          },
          onEmotionVoiceChange: (C) => {
            const U = C || null;
            I({ defaultEmotionVoiceAssetId: U }), J({ defaultEmotionVoiceAssetId: U });
          },
          onDelete: A,
          onUploadVoice: async (C, U, B) => {
            const Q = await F(C, U, B);
            return Q && B === "speaker" && (I({ speakerVoiceAssetId: Q.voiceAssetId }), J({ speakerVoiceAssetId: Q.voiceAssetId })), await M(), Q;
          },
          onTestLine: W,
          onEditChainPersisted: te,
          onEditError: ce
        },
        z.mappingId
      ) : /* @__PURE__ */ u.jsx(
        G8,
        {
          voiceCount: d.length,
          onUploadVoice: async (C) => {
            await F(C, C.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function G8({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ u.jsxs(La, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ u.jsxs("div", { className: $8, children: [
      /* @__PURE__ */ u.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ u.jsx("h2", { id: "onboarding-heading", className: H8, children: "Upload your first voice" }),
      /* @__PURE__ */ u.jsxs("p", { className: q8, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ u.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ u.jsx(
      US,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ u.jsx(La, { density: "airy", children: /* @__PURE__ */ u.jsx(
    Tl,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function X8(t) {
  const { mapping: a, voiceAssets: i, allMappings: l } = t, o = i.find((T) => T.voiceAssetId === a.speakerVoiceAssetId) ?? null, d = y.useMemo(
    () => l.filter(
      (T) => T.isActive && T.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((T) => T.characterName),
    [l, a.speakerVoiceAssetId]
  ), h = i.find((T) => T.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, g] = y.useState(""), [p, b] = y.useState("mp3"), [v, S] = y.useState("idle"), [E, w] = y.useState(null), N = y.useRef(!1);
  y.useEffect(() => (N.current = !1, () => {
    N.current = !0;
  }), []);
  const R = y.useCallback(async () => {
    N.current = !1, S("running"), w(null);
    const T = await t.onTestLine(m, p);
    if (N.current) return;
    if (!T) {
      S("error"), w("Failed to enqueue test-line run.");
      return;
    }
    const { runId: k } = T;
    for (let z = 0; z < 60; z += 1) {
      if (await new Promise((M) => setTimeout(M, 500)), N.current) return;
      try {
        const M = await Bh(t.deploymentId, k);
        if (N.current) return;
        if (M.status === "completed") {
          S("done");
          return;
        }
        if (M.status === "failed" || M.status === "cancelled") {
          S("error"), w(`Run ${M.status}.`);
          return;
        }
      } catch (M) {
        if (N.current) return;
        S("error"), w(M instanceof Error ? M.message : "unknown error");
        return;
      }
    }
    N.current || (S("error"), w("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, m, p]);
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("header", { className: j8, children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ u.jsx("h2", { className: N8, children: a.characterName })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: LS, children: /* @__PURE__ */ u.jsx(Ve, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ u.jsxs(
      La,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: L8,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "text",
              className: U8,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (T) => g(T.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: v === "running"
            }
          ),
          /* @__PURE__ */ u.jsxs(
            "select",
            {
              className: Gi,
              value: p,
              onChange: (T) => b(T.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: v === "running",
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ u.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ u.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ u.jsx(
            Ve,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void R(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ u.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && E && /* @__PURE__ */ u.jsx(Zr, { tone: "danger", children: E })
        ]
      }
    ),
    /* @__PURE__ */ u.jsxs("div", { className: T8, children: [
      /* @__PURE__ */ u.jsxs(La, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ u.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ u.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ u.jsx("span", { className: Fr, children: "Character name" }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              className: Gi,
              value: a.characterName,
              onChange: (T) => t.onNameChange(T.currentTarget.value),
              onBlur: (T) => t.onNameBlur(T.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ u.jsx("span", { className: Fr, children: "Emotion mode" }),
          /* @__PURE__ */ u.jsx(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionMode,
              onChange: (T) => t.onModeChange(T.currentTarget.value),
              children: F8.map((T) => /* @__PURE__ */ u.jsx("option", { value: T, children: W8(T) }, T))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ u.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ u.jsxs("span", { className: Fr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ u.jsx(
            "textarea",
            {
              className: C8,
              value: a.defaultQwenTemplate ?? "",
              onChange: (T) => t.onQwenChange(T.currentTarget.value),
              onBlur: (T) => t.onQwenBlur(T.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ u.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ u.jsx("span", { className: Fr, children: "Emotion reference" }),
          /* @__PURE__ */ u.jsxs(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (T) => t.onEmotionVoiceChange(T.currentTarget.value),
              children: [
                /* @__PURE__ */ u.jsx("option", { value: "", children: "— none —" }),
                i.map((T) => /* @__PURE__ */ u.jsxs("option", { value: T.voiceAssetId, children: [
                  T.displayName,
                  " · ",
                  T.kind
                ] }, T.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: rl, children: [
          /* @__PURE__ */ u.jsxs("span", { className: Fr, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (T) => t.onSpeedChange(Number(T.currentTarget.value)),
              onMouseUp: (T) => t.onSpeedCommit(Number(T.currentTarget.value)),
              onTouchEnd: (T) => t.onSpeedCommit(Number(T.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs(La, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ u.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ u.jsx("span", { className: Fr, children: "Speaker reference" }),
        /* @__PURE__ */ u.jsx(
          P8,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ u.jsx(Jb, { voice: o }),
        /* @__PURE__ */ u.jsx(
          US,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (T) => t.onUploadVoice(T, T.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ u.jsx(
          o8,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: d,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        h && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          /* @__PURE__ */ u.jsx("span", { className: Fr, children: "Emotion reference voice" }),
          /* @__PURE__ */ u.jsx(Jb, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function P8({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ u.jsxs(
    "select",
    {
      className: Gi,
      value: t,
      onChange: (l) => i(l.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ u.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((l) => /* @__PURE__ */ u.jsx("option", { value: l.voiceAssetId, children: l.displayName }, l.voiceAssetId))
      ]
    }
  );
}
function Jb({ voice: t }) {
  const a = eU(t.durationMs ?? null);
  return /* @__PURE__ */ u.jsxs("div", { children: [
    /* @__PURE__ */ u.jsxs("div", { className: A8, children: [
      /* @__PURE__ */ u.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ u.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ u.jsx("span", { children: tU(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ u.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ u.jsxs("div", { className: D8, children: [
      /* @__PURE__ */ u.jsx("div", { className: z8, children: /* @__PURE__ */ u.jsx(cm, { features: hm, children: /* @__PURE__ */ u.jsx(
        fm.div,
        {
          className: O8,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ u.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ u.jsx(K8, { seed: t.contentSha256 })
  ] });
}
function K8({ seed: t }) {
  const a = y.useMemo(() => nU(t, 48), [t]);
  return /* @__PURE__ */ u.jsx("div", { className: B8, "aria-hidden": "true", children: a.map((i, l) => /* @__PURE__ */ u.jsx(
    "span",
    {
      className: V8,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${l}`
  )) });
}
function US({
  label: t,
  onFile: a
}) {
  const [i, l] = y.useState(!1), [o, d] = y.useState(!1), h = y.useRef(null), m = y.useCallback(
    async (g) => {
      d(!0);
      try {
        await a(g);
      } finally {
        d(!1);
      }
    },
    [a]
  );
  return /* @__PURE__ */ u.jsxs(
    "div",
    {
      className: o ? M8 : i ? _8 : R8,
      onDragOver: (g) => {
        g.preventDefault(), l(!0);
      },
      onDragLeave: () => l(!1),
      onDrop: (g) => {
        g.preventDefault(), l(!1);
        const p = g.dataTransfer.files?.[0];
        p && m(p);
      },
      onClick: () => h.current?.click(),
      role: "button",
      tabIndex: 0,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), h.current?.click());
      },
      "aria-busy": o,
      children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: h,
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
function Q8({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [l, o] = y.useState("error"), d = y.useRef(null);
  return /* @__PURE__ */ u.jsxs("div", { className: LS, children: [
    /* @__PURE__ */ u.jsx(Ve, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ u.jsx(
      "input",
      {
        ref: d,
        type: "file",
        accept: "application/json,.json",
        className: I8,
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: async (h) => {
          const m = h.currentTarget.files?.[0];
          if (h.currentTarget.value = "", !!m)
            try {
              const g = await m.text(), p = JSON.parse(g);
              a(p, l);
            } catch {
              i("Import failed: file is not a valid JSON mapping bundle.");
            }
        }
      }
    ),
    /* @__PURE__ */ u.jsx(Ve, { variant: "secondary", size: "sm", onClick: () => d.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ u.jsxs(
      "select",
      {
        className: Gi,
        value: l,
        onChange: (h) => o(h.currentTarget.value),
        "aria-label": "Import conflict strategy",
        children: [
          /* @__PURE__ */ u.jsx("option", { value: "error", children: "Error on conflict" }),
          /* @__PURE__ */ u.jsx("option", { value: "skip", children: "Skip existing" }),
          /* @__PURE__ */ u.jsx("option", { value: "replace", children: "Replace existing" })
        ]
      }
    )
  ] });
}
function Z8(t) {
  const a = new Set(t.map((l) => l.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function J8(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function W8(t) {
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
function eU(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function tU(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function nU(t, a) {
  const i = [];
  for (let l = 0; l < a; l += 1) {
    const o = t.charCodeAt(l % t.length);
    i.push((o * 31 + l * 7) % 100 / 100);
  }
  return i;
}
function aU(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), l = URL.createObjectURL(i), o = document.createElement("a");
  o.href = l, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
}
function mr(t) {
  return t instanceof Wi || t instanceof Error ? t.message : "unknown error";
}
function rU() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await ST();
        return { deployments: t };
      },
      Component: iC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId");
        return _j(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { runs: o }, d] = await Promise.all([
          ky(a),
          Ly(a),
          NT(a, { limit: 10 }),
          DT(a)
        ]);
        return { deployment: i, mappings: l, runs: o, workflow: d };
      },
      Component: kk
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), i = $i(t, "runId");
        return { run: await Bh(a, i) };
      },
      Component: Y6
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = $i(t, "deploymentId"), [i, { mappings: l }, { voiceAssets: o }] = await Promise.all([
          ky(a),
          Ly(a),
          ml(a)
        ]);
        return { deployment: i, mappings: l, voiceAssets: o };
      },
      Component: Y8
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = $i(t, "deploymentId"), l = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: l.searchParams.get("character") ?? ""
        };
      },
      Component: jL
    },
    {
      path: "/runtime/queue",
      Component: xL
    }
  ];
}
function $i(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const Wb = "ext-actions-request", iU = "ext-actions-declare", sU = "ext-action-state", ex = "ext-action-invoke", xh = "emotion-tts:navigate", qi = "emotion-tts.run", tx = "emotion-tts.mappings", lU = 4e3;
function oU(t, a) {
  let i = null, l = !1;
  const o = () => {
    const w = i?.badge ?? "not_installed";
    return cU(w, l);
  }, d = () => ({
    primary: o(),
    secondary: {
      id: tx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    t.dispatchEvent(
      new CustomEvent(iU, {
        detail: { actions: d() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(sU, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), p = (w) => {
    const N = w.detail?.id;
    N === qi ? b() : N === tx && t.dispatchEvent(
      new CustomEvent(xh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const w = i?.badge ?? "not_installed", N = w === "ready" || w === "running" || w === "starting";
    l = !0, m();
    try {
      N ? await Px() : await Xx();
      try {
        i = await xc();
      } catch {
      }
    } catch {
    } finally {
      l = !1, m();
    }
  };
  t.addEventListener(Wb, g), t.addEventListener(ex, p);
  let v = !1;
  const S = async () => {
    try {
      const w = await xc();
      if (v) return;
      i = w, m();
    } catch {
    }
  };
  S();
  const E = window.setInterval(() => void S(), lU);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(E), t.removeEventListener(Wb, g), t.removeEventListener(ex, p);
    }
  };
}
function cU(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", l = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qi,
    label: Kx(t),
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
  } : l ? {
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
const Sh = "emotion-tts-app", uU = "ext-event", nx = "emotion-tts-stylesheet", ax = ["accent", "density", "card"];
function dU(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function fU() {
  if (typeof document > "u" || document.getElementById(nx)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = nx, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
fU();
class hU extends HTMLElement {
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
    this.root = ej.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(xh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = oU(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(xh, a);
  }
  syncTweaksFromBody() {
    for (const a of ax) {
      const i = dU(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: ax.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = LN(rU(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ u.jsx(y.StrictMode, { children: /* @__PURE__ */ u.jsx(BN, { router: i }) })
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
      new CustomEvent(uU, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function mU() {
  typeof customElements > "u" || customElements.get(Sh) || customElements.define(Sh, hU);
}
typeof customElements < "u" && !customElements.get(Sh) && mU();
export {
  mU as register
};
//# sourceMappingURL=emotion-tts.js.map
