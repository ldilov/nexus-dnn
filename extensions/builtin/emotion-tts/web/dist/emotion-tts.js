function Gj(t, a) {
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
function lx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qd = { exports: {} }, Xs = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jg;
function Xj() {
  if (Jg) return Xs;
  Jg = 1;
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
  return Xs.Fragment = a, Xs.jsx = i, Xs.jsxs = i, Xs;
}
var Wg;
function Pj() {
  return Wg || (Wg = 1, Qd.exports = Xj()), Qd.exports;
}
var c = Pj(), Zd = { exports: {} }, Le = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ey;
function Kj() {
  if (ey) return Le;
  ey = 1;
  var t = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), h = Symbol.for("react.context"), m = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function w(_) {
    return _ === null || typeof _ != "object" ? null : (_ = S && _[S] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, T = Object.assign, M = {};
  function N(_, J, K) {
    this.props = _, this.context = J, this.refs = M, this.updater = K || j;
  }
  N.prototype.isReactComponent = {}, N.prototype.setState = function(_, J) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, J, "setState");
  }, N.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function k() {
  }
  k.prototype = N.prototype;
  function A(_, J, K) {
    this.props = _, this.context = J, this.refs = M, this.updater = K || j;
  }
  var C = A.prototype = new k();
  C.constructor = A, T(C, N.prototype), C.isPureReactComponent = !0;
  var V = Array.isArray;
  function G() {
  }
  var ne = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function I(_, J, K) {
    var le = K.ref;
    return {
      $$typeof: t,
      type: _,
      key: J,
      ref: le !== void 0 ? le : null,
      props: K
    };
  }
  function F(_, J) {
    return I(_.type, J, _.props);
  }
  function ie(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === t;
  }
  function re(_) {
    var J = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(K) {
      return J[K];
    });
  }
  var te = /\/+/g;
  function ce(_, J) {
    return typeof _ == "object" && _ !== null && _.key != null ? re("" + _.key) : J.toString(36);
  }
  function W(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(G, G) : (_.status = "pending", _.then(
          function(J) {
            _.status === "pending" && (_.status = "fulfilled", _.value = J);
          },
          function(J) {
            _.status === "pending" && (_.status = "rejected", _.reason = J);
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
  function O(_, J, K, le, fe) {
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
                J,
                K,
                le,
                fe
              );
          }
      }
    if (Ae)
      return fe = fe(_), Ae = le === "" ? "." + ce(_, 0) : le, V(fe) ? (K = "", Ae != null && (K = Ae.replace(te, "$&/") + "/"), O(fe, J, K, "", function(Zt) {
        return Zt;
      })) : fe != null && (ie(fe) && (fe = F(
        fe,
        K + (fe.key == null || _ && _.key === fe.key ? "" : ("" + fe.key).replace(
          te,
          "$&/"
        ) + "/") + Ae
      )), J.push(fe)), 1;
    Ae = 0;
    var Me = le === "" ? "." : le + ":";
    if (V(_))
      for (var Ve = 0; Ve < _.length; Ve++)
        le = _[Ve], ge = Me + ce(le, Ve), Ae += O(
          le,
          J,
          K,
          ge,
          fe
        );
    else if (Ve = w(_), typeof Ve == "function")
      for (_ = Ve.call(_), Ve = 0; !(le = _.next()).done; )
        le = le.value, ge = Me + ce(le, Ve++), Ae += O(
          le,
          J,
          K,
          ge,
          fe
        );
    else if (ge === "object") {
      if (typeof _.then == "function")
        return O(
          W(_),
          J,
          K,
          le,
          fe
        );
      throw J = String(_), Error(
        "Objects are not valid as a React child (found: " + (J === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : J) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Ae;
  }
  function R(_, J, K) {
    if (_ == null) return _;
    var le = [], fe = 0;
    return O(_, le, "", "", function(ge) {
      return J.call(K, ge, fe++);
    }), le;
  }
  function U(_) {
    if (_._status === -1) {
      var J = _._result;
      J = J(), J.then(
        function(K) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = K);
        },
        function(K) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = K);
        }
      ), _._status === -1 && (_._status = 0, _._result = J);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var B = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var J = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(J)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, Z = {
    map: R,
    forEach: function(_, J, K) {
      R(
        _,
        function() {
          J.apply(this, arguments);
        },
        K
      );
    },
    count: function(_) {
      var J = 0;
      return R(_, function() {
        J++;
      }), J;
    },
    toArray: function(_) {
      return R(_, function(J) {
        return J;
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
  return Le.Activity = v, Le.Children = Z, Le.Component = N, Le.Fragment = i, Le.Profiler = o, Le.PureComponent = A, Le.StrictMode = l, Le.Suspense = g, Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, Le.__COMPILER_RUNTIME = {
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
  }, Le.cloneElement = function(_, J, K) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var le = T({}, _.props), fe = _.key;
    if (J != null)
      for (ge in J.key !== void 0 && (fe = "" + J.key), J)
        !D.call(J, ge) || ge === "key" || ge === "__self" || ge === "__source" || ge === "ref" && J.ref === void 0 || (le[ge] = J[ge]);
    var ge = arguments.length - 2;
    if (ge === 1) le.children = K;
    else if (1 < ge) {
      for (var Ae = Array(ge), Me = 0; Me < ge; Me++)
        Ae[Me] = arguments[Me + 2];
      le.children = Ae;
    }
    return I(_.type, fe, le);
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
  }, Le.createElement = function(_, J, K) {
    var le, fe = {}, ge = null;
    if (J != null)
      for (le in J.key !== void 0 && (ge = "" + J.key), J)
        D.call(J, le) && le !== "key" && le !== "__self" && le !== "__source" && (fe[le] = J[le]);
    var Ae = arguments.length - 2;
    if (Ae === 1) fe.children = K;
    else if (1 < Ae) {
      for (var Me = Array(Ae), Ve = 0; Ve < Ae; Ve++)
        Me[Ve] = arguments[Ve + 2];
      fe.children = Me;
    }
    if (_ && _.defaultProps)
      for (le in Ae = _.defaultProps, Ae)
        fe[le] === void 0 && (fe[le] = Ae[le]);
    return I(_, ge, fe);
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
  }, Le.memo = function(_, J) {
    return {
      $$typeof: p,
      type: _,
      compare: J === void 0 ? null : J
    };
  }, Le.startTransition = function(_) {
    var J = ne.T, K = {};
    ne.T = K;
    try {
      var le = _(), fe = ne.S;
      fe !== null && fe(K, le), typeof le == "object" && le !== null && typeof le.then == "function" && le.then(G, B);
    } catch (ge) {
      B(ge);
    } finally {
      J !== null && K.types !== null && (J.types = K.types), ne.T = J;
    }
  }, Le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, Le.use = function(_) {
    return ne.H.use(_);
  }, Le.useActionState = function(_, J, K) {
    return ne.H.useActionState(_, J, K);
  }, Le.useCallback = function(_, J) {
    return ne.H.useCallback(_, J);
  }, Le.useContext = function(_) {
    return ne.H.useContext(_);
  }, Le.useDebugValue = function() {
  }, Le.useDeferredValue = function(_, J) {
    return ne.H.useDeferredValue(_, J);
  }, Le.useEffect = function(_, J) {
    return ne.H.useEffect(_, J);
  }, Le.useEffectEvent = function(_) {
    return ne.H.useEffectEvent(_);
  }, Le.useId = function() {
    return ne.H.useId();
  }, Le.useImperativeHandle = function(_, J, K) {
    return ne.H.useImperativeHandle(_, J, K);
  }, Le.useInsertionEffect = function(_, J) {
    return ne.H.useInsertionEffect(_, J);
  }, Le.useLayoutEffect = function(_, J) {
    return ne.H.useLayoutEffect(_, J);
  }, Le.useMemo = function(_, J) {
    return ne.H.useMemo(_, J);
  }, Le.useOptimistic = function(_, J) {
    return ne.H.useOptimistic(_, J);
  }, Le.useReducer = function(_, J, K) {
    return ne.H.useReducer(_, J, K);
  }, Le.useRef = function(_) {
    return ne.H.useRef(_);
  }, Le.useState = function(_) {
    return ne.H.useState(_);
  }, Le.useSyncExternalStore = function(_, J, K) {
    return ne.H.useSyncExternalStore(
      _,
      J,
      K
    );
  }, Le.useTransition = function() {
    return ne.H.useTransition();
  }, Le.version = "19.2.5", Le;
}
var ty;
function jh() {
  return ty || (ty = 1, Zd.exports = Kj()), Zd.exports;
}
var y = jh();
const me = /* @__PURE__ */ lx(y), Qj = /* @__PURE__ */ Gj({
  __proto__: null,
  default: me
}, [y]);
var Jd = { exports: {} }, Ps = {}, Wd = { exports: {} }, ef = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ny;
function Zj() {
  return ny || (ny = 1, (function(t) {
    function a(O, R) {
      var U = O.length;
      O.push(R);
      e: for (; 0 < U; ) {
        var B = U - 1 >>> 1, Z = O[B];
        if (0 < o(Z, R))
          O[B] = R, O[U] = Z, U = B;
        else break e;
      }
    }
    function i(O) {
      return O.length === 0 ? null : O[0];
    }
    function l(O) {
      if (O.length === 0) return null;
      var R = O[0], U = O.pop();
      if (U !== R) {
        O[0] = U;
        e: for (var B = 0, Z = O.length, _ = Z >>> 1; B < _; ) {
          var J = 2 * (B + 1) - 1, K = O[J], le = J + 1, fe = O[le];
          if (0 > o(K, U))
            le < Z && 0 > o(fe, K) ? (O[B] = fe, O[le] = U, B = le) : (O[B] = K, O[J] = U, B = J);
          else if (le < Z && 0 > o(fe, U))
            O[B] = fe, O[le] = U, B = le;
          else break e;
        }
      }
      return R;
    }
    function o(O, R) {
      var U = O.sortIndex - R.sortIndex;
      return U !== 0 ? U : O.id - R.id;
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
    var g = [], p = [], b = 1, v = null, S = 3, w = !1, j = !1, T = !1, M = !1, N = typeof setTimeout == "function" ? setTimeout : null, k = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    function C(O) {
      for (var R = i(p); R !== null; ) {
        if (R.callback === null) l(p);
        else if (R.startTime <= O)
          l(p), R.sortIndex = R.expirationTime, a(g, R);
        else break;
        R = i(p);
      }
    }
    function V(O) {
      if (T = !1, C(O), !j)
        if (i(g) !== null)
          j = !0, G || (G = !0, re());
        else {
          var R = i(p);
          R !== null && W(V, R.startTime - O);
        }
    }
    var G = !1, ne = -1, D = 5, I = -1;
    function F() {
      return M ? !0 : !(t.unstable_now() - I < D);
    }
    function ie() {
      if (M = !1, G) {
        var O = t.unstable_now();
        I = O;
        var R = !0;
        try {
          e: {
            j = !1, T && (T = !1, k(ne), ne = -1), w = !0;
            var U = S;
            try {
              t: {
                for (C(O), v = i(g); v !== null && !(v.expirationTime > O && F()); ) {
                  var B = v.callback;
                  if (typeof B == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var Z = B(
                      v.expirationTime <= O
                    );
                    if (O = t.unstable_now(), typeof Z == "function") {
                      v.callback = Z, C(O), R = !0;
                      break t;
                    }
                    v === i(g) && l(g), C(O);
                  } else l(g);
                  v = i(g);
                }
                if (v !== null) R = !0;
                else {
                  var _ = i(p);
                  _ !== null && W(
                    V,
                    _.startTime - O
                  ), R = !1;
                }
              }
              break e;
            } finally {
              v = null, S = U, w = !1;
            }
            R = void 0;
          }
        } finally {
          R ? re() : G = !1;
        }
      }
    }
    var re;
    if (typeof A == "function")
      re = function() {
        A(ie);
      };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), ce = te.port2;
      te.port1.onmessage = ie, re = function() {
        ce.postMessage(null);
      };
    } else
      re = function() {
        N(ie, 0);
      };
    function W(O, R) {
      ne = N(function() {
        O(t.unstable_now());
      }, R);
    }
    t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, t.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < O ? Math.floor(1e3 / O) : 5;
    }, t.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, t.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = S;
      }
      var U = S;
      S = R;
      try {
        return O();
      } finally {
        S = U;
      }
    }, t.unstable_requestPaint = function() {
      M = !0;
    }, t.unstable_runWithPriority = function(O, R) {
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
        return R();
      } finally {
        S = U;
      }
    }, t.unstable_scheduleCallback = function(O, R, U) {
      var B = t.unstable_now();
      switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? B + U : B) : U = B, O) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = U + Z, O = {
        id: b++,
        callback: R,
        priorityLevel: O,
        startTime: U,
        expirationTime: Z,
        sortIndex: -1
      }, U > B ? (O.sortIndex = U, a(p, O), i(g) === null && O === i(p) && (T ? (k(ne), ne = -1) : T = !0, W(V, U - B))) : (O.sortIndex = Z, a(g, O), j || w || (j = !0, G || (G = !0, re()))), O;
    }, t.unstable_shouldYield = F, t.unstable_wrapCallback = function(O) {
      var R = S;
      return function() {
        var U = S;
        S = R;
        try {
          return O.apply(this, arguments);
        } finally {
          S = U;
        }
      };
    };
  })(ef)), ef;
}
var ay;
function Jj() {
  return ay || (ay = 1, Wd.exports = Zj()), Wd.exports;
}
var tf = { exports: {} }, ln = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ry;
function Wj() {
  if (ry) return ln;
  ry = 1;
  var t = jh();
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
  return ln.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, ln.createPortal = function(g, p) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(a(299));
    return d(g, p, null, b);
  }, ln.flushSync = function(g) {
    var p = h.T, b = l.p;
    try {
      if (h.T = null, l.p = 2, g) return g();
    } finally {
      h.T = p, l.p = b, l.d.f();
    }
  }, ln.preconnect = function(g, p) {
    typeof g == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, l.d.C(g, p));
  }, ln.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, ln.preinit = function(g, p) {
    if (typeof g == "string" && p && typeof p.as == "string") {
      var b = p.as, v = m(b, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, w = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      b === "style" ? l.d.S(
        g,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: w
        }
      ) : b === "script" && l.d.X(g, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: w,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, ln.preinitModule = function(g, p) {
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
  }, ln.preload = function(g, p) {
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
  }, ln.preloadModule = function(g, p) {
    if (typeof g == "string")
      if (p) {
        var b = m(p.as, p.crossOrigin);
        l.d.m(g, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else l.d.m(g);
  }, ln.requestFormReset = function(g) {
    l.d.r(g);
  }, ln.unstable_batchedUpdates = function(g, p) {
    return g(p);
  }, ln.useFormState = function(g, p, b) {
    return h.H.useFormState(g, p, b);
  }, ln.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, ln.version = "19.2.5", ln;
}
var iy;
function ox() {
  if (iy) return tf.exports;
  iy = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), tf.exports = Wj(), tf.exports;
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
var sy;
function eE() {
  if (sy) return Ps;
  sy = 1;
  var t = Jj(), a = jh(), i = ox();
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
      var u = r.return;
      if (u === null) break;
      var f = u.alternate;
      if (f === null) {
        if (s = u.return, s !== null) {
          r = s;
          continue;
        }
        break;
      }
      if (u.child === f.child) {
        for (f = u.child; f; ) {
          if (f === r) return g(u), e;
          if (f === s) return g(u), n;
          f = f.sibling;
        }
        throw Error(l(188));
      }
      if (r.return !== s.return) r = u, s = f;
      else {
        for (var x = !1, E = u.child; E; ) {
          if (E === r) {
            x = !0, r = u, s = f;
            break;
          }
          if (E === s) {
            x = !0, s = u, r = f;
            break;
          }
          E = E.sibling;
        }
        if (!x) {
          for (E = f.child; E; ) {
            if (E === r) {
              x = !0, r = f, s = u;
              break;
            }
            if (E === s) {
              x = !0, s = f, r = u;
              break;
            }
            E = E.sibling;
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
  var v = Object.assign, S = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), j = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), A = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), I = Symbol.for("react.activity"), F = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
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
      case T:
        return "Fragment";
      case N:
        return "Profiler";
      case M:
        return "StrictMode";
      case V:
        return "Suspense";
      case G:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case j:
          return "Portal";
        case A:
          return e.displayName || "Context";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case C:
          var n = e.render;
          return e = e.displayName, e || (e = n.displayName || n.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ne:
          return n = e.displayName || null, n !== null ? n : ce(e.type) || "Memo";
        case D:
          n = e._payload, e = e._init;
          try {
            return ce(e(n));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, O = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, B = [], Z = -1;
  function _(e) {
    return { current: e };
  }
  function J(e) {
    0 > Z || (e.current = B[Z], B[Z] = null, Z--);
  }
  function K(e, n) {
    Z++, B[Z] = e.current, e.current = n;
  }
  var le = _(null), fe = _(null), ge = _(null), Ae = _(null);
  function Me(e, n) {
    switch (K(ge, n), K(fe, e), K(le, null), n.nodeType) {
      case 9:
      case 11:
        e = (e = n.documentElement) && (e = e.namespaceURI) ? Sg(e) : 0;
        break;
      default:
        if (e = n.tagName, n = n.namespaceURI)
          n = Sg(n), e = wg(n, e);
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
    J(le), K(le, e);
  }
  function Ve() {
    J(le), J(fe), J(ge);
  }
  function Zt(e) {
    e.memoizedState !== null && K(Ae, e);
    var n = le.current, r = wg(n, e.type);
    n !== r && (K(fe, e), K(le, r));
  }
  function Pt(e) {
    fe.current === e && (J(le), J(fe)), Ae.current === e && (J(Ae), Is._currentValue = U);
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
  function Oe(e, n) {
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
                  var Q = ee;
                }
                Reflect.construct(e, [], oe);
              } else {
                try {
                  oe.call();
                } catch (ee) {
                  Q = ee;
                }
                e.call(oe.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ee) {
                Q = ee;
              }
              (oe = e()) && typeof oe.catch == "function" && oe.catch(function() {
              });
            }
          } catch (ee) {
            if (ee && Q && typeof ee.stack == "string")
              return [ee.stack, Q.stack];
          }
          return [null, null];
        }
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        s.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var f = s.DetermineComponentFrameRoot(), x = f[0], E = f[1];
      if (x && E) {
        var L = x.split(`
`), P = E.split(`
`);
        for (u = s = 0; s < L.length && !L[s].includes("DetermineComponentFrameRoot"); )
          s++;
        for (; u < P.length && !P[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (s === L.length || u === P.length)
          for (s = L.length - 1, u = P.length - 1; 1 <= s && 0 <= u && L[s] !== P[u]; )
            u--;
        for (; 1 <= s && 0 <= u; s--, u--)
          if (L[s] !== P[u]) {
            if (s !== 1 || u !== 1)
              do
                if (s--, u--, 0 > u || L[s] !== P[u]) {
                  var ae = `
` + L[s].replace(" at new ", " at ");
                  return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), ae;
                }
              while (1 <= s && 0 <= u);
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
        return Oe(e.type, !1);
      case 11:
        return Oe(e.type.render, !1);
      case 1:
        return Oe(e.type, !0);
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
  var bt = Object.prototype.hasOwnProperty, xt = t.unstable_scheduleCallback, un = t.unstable_cancelCallback, Ht = t.unstable_shouldYield, kn = t.unstable_requestPaint, qt = t.unstable_now, ye = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Qe = t.unstable_UserBlockingPriority, nt = t.unstable_NormalPriority, It = t.unstable_LowPriority, Ft = t.unstable_IdlePriority, Er = t.log, sa = t.unstable_setDisableYieldValue, Zn = null, Jt = null;
  function Tt(e) {
    if (typeof Er == "function" && sa(e), Jt && typeof Jt.setStrictMode == "function")
      try {
        Jt.setStrictMode(Zn, e);
      } catch {
      }
  }
  var Yt = Math.clz32 ? Math.clz32 : On, ei = Math.log, Ha = Math.LN2;
  function On(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ei(e) / Ha | 0) | 0;
  }
  var ga = 256, Jn = 262144, la = 4194304;
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
  function ke(e, n, r) {
    var s = e.pendingLanes;
    if (s === 0) return 0;
    var u = 0, f = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var E = s & 134217727;
    return E !== 0 ? (s = E & ~f, s !== 0 ? u = hn(s) : (x &= E, x !== 0 ? u = hn(x) : r || (r = E & ~e, r !== 0 && (u = hn(r))))) : (E = s & ~f, E !== 0 ? u = hn(E) : x !== 0 ? u = hn(x) : r || (r = s & ~e, r !== 0 && (u = hn(r)))), u === 0 ? 0 : n !== 0 && n !== u && (n & f) === 0 && (f = u & -u, r = n & -n, f >= r || f === 32 && (r & 4194048) !== 0) ? n : u;
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
  function Wt(e, n, r, s, u, f) {
    var x = e.pendingLanes;
    e.pendingLanes = r, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= r, e.entangledLanes &= r, e.errorRecoveryDisabledLanes &= r, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, P = e.hiddenUpdates;
    for (r = x & ~r; 0 < r; ) {
      var ae = 31 - Yt(r), oe = 1 << ae;
      E[ae] = 0, L[ae] = -1;
      var Q = P[ae];
      if (Q !== null)
        for (P[ae] = null, ae = 0; ae < Q.length; ae++) {
          var ee = Q[ae];
          ee !== null && (ee.lane &= -536870913);
        }
      r &= ~oe;
    }
    s !== 0 && ya(e, s, 0), f !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(x & ~n));
  }
  function ya(e, n, r) {
    e.pendingLanes |= n, e.suspendedLanes &= ~n;
    var s = 31 - Yt(n);
    e.entangledLanes |= n, e.entanglements[s] = e.entanglements[s] | 1073741824 | r & 261930;
  }
  function rn(e, n) {
    var r = e.entangledLanes |= n;
    for (e = e.entanglements; r; ) {
      var s = 31 - Yt(r), u = 1 << s;
      u & n | e[s] & n && (e[s] |= n), r &= ~u;
    }
  }
  function z(e, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : H(r), (r & (e.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function H(e) {
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
    var e = R.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Yg(e.type));
  }
  function de(e, n) {
    var r = R.p;
    try {
      return R.p = e, n();
    } finally {
      R.p = r;
    }
  }
  var Se = Math.random().toString(36).slice(2), pe = "__reactFiber$" + Se, ve = "__reactProps$" + Se, je = "__reactContainer$" + Se, be = "__reactEvents$" + Se, Re = "__reactListeners$" + Se, Ne = "__reactHandles$" + Se, Ze = "__reactResources$" + Se, He = "__reactMarker$" + Se;
  function dt(e) {
    delete e[pe], delete e[ve], delete e[be], delete e[Re], delete e[Ne];
  }
  function st(e) {
    var n = e[pe];
    if (n) return n;
    for (var r = e.parentNode; r; ) {
      if (n = r[je] || r[pe]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (e = Mg(e); e !== null; ) {
            if (r = e[pe]) return r;
            e = Mg(e);
          }
        return n;
      }
      e = r, r = e.parentNode;
    }
    return null;
  }
  function St(e) {
    if (e = e[pe] || e[je]) {
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
  function sn(e, n, r, s) {
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
  function kt(e) {
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
      var u = s.get, f = s.set;
      return Object.defineProperty(e, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
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
  function _l(e) {
    if (!e) return !1;
    var n = e._valueTracker;
    if (!n) return !0;
    var r = n.getValue(), s = "";
    return e && (s = vt(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== r ? (n.setValue(e), !0) : !1;
  }
  function Al(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var VS = /[\n"\\]/g;
  function Ln(e) {
    return e.replace(
      VS,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fc(e, n, r, s, u, f, x, E) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + kt(n)) : e.value !== "" + kt(n) && (e.value = "" + kt(n)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), n != null ? Yc(e, x, kt(n)) : r != null ? Yc(e, x, kt(r)) : s != null && e.removeAttribute("value"), u == null && f != null && (e.defaultChecked = !!f), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + kt(E) : e.removeAttribute("name");
  }
  function pm(e, n, r, s, u, f, x, E) {
    if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.type = f), n != null || r != null) {
      if (!(f !== "submit" && f !== "reset" || n != null)) {
        ai(e);
        return;
      }
      r = r != null ? "" + kt(r) : "", n = n != null ? "" + kt(n) : r, E || n === e.value || (e.value = n), e.defaultValue = n;
    }
    s = s ?? u, s = typeof s != "function" && typeof s != "symbol" && !!s, e.checked = E ? e.checked : !!s, e.defaultChecked = !!s, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), ai(e);
  }
  function Yc(e, n, r) {
    n === "number" && Al(e.ownerDocument) === e || e.defaultValue === "" + r || (e.defaultValue = "" + r);
  }
  function ri(e, n, r, s) {
    if (e = e.options, n) {
      n = {};
      for (var u = 0; u < r.length; u++)
        n["$" + r[u]] = !0;
      for (r = 0; r < e.length; r++)
        u = n.hasOwnProperty("$" + e[r].value), e[r].selected !== u && (e[r].selected = u), u && s && (e[r].defaultSelected = !0);
    } else {
      for (r = "" + kt(r), n = null, u = 0; u < e.length; u++) {
        if (e[u].value === r) {
          e[u].selected = !0, s && (e[u].defaultSelected = !0);
          return;
        }
        n !== null || e[u].disabled || (n = e[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function vm(e, n, r) {
    if (n != null && (n = "" + kt(n), n !== e.value && (e.value = n), r == null)) {
      e.defaultValue !== n && (e.defaultValue = n);
      return;
    }
    e.defaultValue = r != null ? "" + kt(r) : "";
  }
  function gm(e, n, r, s) {
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
    r = kt(n), e.defaultValue = r, s = e.textContent, s === r && s !== "" && s !== null && (e.value = s), ai(e);
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
  var HS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ym(e, n, r) {
    var s = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? s ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "" : s ? e.setProperty(n, r) : typeof r != "number" || r === 0 || HS.has(n) ? n === "float" ? e.cssFloat = r : e[n] = ("" + r).trim() : e[n] = r + "px";
  }
  function bm(e, n, r) {
    if (n != null && typeof n != "object")
      throw Error(l(62));
    if (e = e.style, r != null) {
      for (var s in r)
        !r.hasOwnProperty(s) || n != null && n.hasOwnProperty(s) || (s.indexOf("--") === 0 ? e.setProperty(s, "") : s === "float" ? e.cssFloat = "" : e[s] = "");
      for (var u in n)
        s = n[u], n.hasOwnProperty(u) && r[u] !== s && ym(e, u, s);
    } else
      for (var f in n)
        n.hasOwnProperty(f) && ym(e, f, n[f]);
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
  var qS = /* @__PURE__ */ new Map([
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
  ]), IS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dl(e) {
    return IS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ba() {
  }
  var Xc = null;
  function Pc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var si = null, li = null;
  function xm(e) {
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
                var u = s[ve] || null;
                if (!u) throw Error(l(90));
                Fc(
                  s,
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
            for (n = 0; n < r.length; n++)
              s = r[n], s.form === e.form && _l(s);
          }
          break e;
        case "textarea":
          vm(e, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && ri(e, !!r.multiple, n, !1);
      }
    }
  }
  var Kc = !1;
  function Sm(e, n, r) {
    if (Kc) return e(n, r);
    Kc = !0;
    try {
      var s = e(n);
      return s;
    } finally {
      if (Kc = !1, (si !== null || li !== null) && (xo(), si && (n = si, e = li, li = si = null, xm(n), e)))
        for (n = 0; n < e.length; n++) xm(e[n]);
    }
  }
  function ss(e, n) {
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
  var xa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Qc = !1;
  if (xa)
    try {
      var ls = {};
      Object.defineProperty(ls, "passive", {
        get: function() {
          Qc = !0;
        }
      }), window.addEventListener("test", ls, ls), window.removeEventListener("test", ls, ls);
    } catch {
      Qc = !1;
    }
  var Ia = null, Zc = null, zl = null;
  function wm() {
    if (zl) return zl;
    var e, n = Zc, r = n.length, s, u = "value" in Ia ? Ia.value : Ia.textContent, f = u.length;
    for (e = 0; e < r && n[e] === u[e]; e++) ;
    var x = r - e;
    for (s = 1; s <= x && n[r - s] === u[f - s]; s++) ;
    return zl = u.slice(e, 1 < s ? 1 - s : void 0);
  }
  function kl(e) {
    var n = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ol() {
    return !0;
  }
  function jm() {
    return !1;
  }
  function mn(e) {
    function n(r, s, u, f, x) {
      this._reactName = r, this._targetInst = u, this.type = s, this.nativeEvent = f, this.target = x, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (r = e[E], this[E] = r ? r(f) : f[E]);
      return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Ol : jm, this.isPropagationStopped = jm, this;
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
  var Cr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ll = mn(Cr), os = v({}, Cr, { view: 0, detail: 0 }), FS = mn(os), Jc, Wc, cs, Ul = v({}, os, {
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
      return "movementX" in e ? e.movementX : (e !== cs && (cs && e.type === "mousemove" ? (Jc = e.screenX - cs.screenX, Wc = e.screenY - cs.screenY) : Wc = Jc = 0, cs = e), Jc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Wc;
    }
  }), Em = mn(Ul), YS = v({}, Ul, { dataTransfer: 0 }), GS = mn(YS), XS = v({}, os, { relatedTarget: 0 }), eu = mn(XS), PS = v({}, Cr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), KS = mn(PS), QS = v({}, Cr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ZS = mn(QS), JS = v({}, Cr, { data: 0 }), Nm = mn(JS), WS = {
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
  }, ew = {
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
  }, tw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function nw(e) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(e) : (e = tw[e]) ? !!n[e] : !1;
  }
  function tu() {
    return nw;
  }
  var aw = v({}, os, {
    key: function(e) {
      if (e.key) {
        var n = WS[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress" ? (e = kl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ew[e.keyCode] || "Unidentified" : "";
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
  }), rw = mn(aw), iw = v({}, Ul, {
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
  }), Tm = mn(iw), sw = v({}, os, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: tu
  }), lw = mn(sw), ow = v({}, Cr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cw = mn(ow), uw = v({}, Ul, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), dw = mn(uw), fw = v({}, Cr, {
    newState: 0,
    oldState: 0
  }), hw = mn(fw), mw = [9, 13, 27, 32], nu = xa && "CompositionEvent" in window, us = null;
  xa && "documentMode" in document && (us = document.documentMode);
  var pw = xa && "TextEvent" in window && !us, Cm = xa && (!nu || us && 8 < us && 11 >= us), Rm = " ", Mm = !1;
  function _m(e, n) {
    switch (e) {
      case "keyup":
        return mw.indexOf(n.keyCode) !== -1;
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
  function Am(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var oi = !1;
  function vw(e, n) {
    switch (e) {
      case "compositionend":
        return Am(n);
      case "keypress":
        return n.which !== 32 ? null : (Mm = !0, Rm);
      case "textInput":
        return e = n.data, e === Rm && Mm ? null : e;
      default:
        return null;
    }
  }
  function gw(e, n) {
    if (oi)
      return e === "compositionend" || !nu && _m(e, n) ? (e = wm(), zl = Zc = Ia = null, oi = !1, e) : null;
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
        return Cm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var yw = {
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
  function Dm(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n === "input" ? !!yw[e.type] : n === "textarea";
  }
  function zm(e, n, r, s) {
    si ? li ? li.push(s) : li = [s] : si = s, n = Co(n, "onChange"), 0 < n.length && (r = new Ll(
      "onChange",
      "change",
      null,
      r,
      s
    ), e.push({ event: r, listeners: n }));
  }
  var ds = null, fs = null;
  function bw(e) {
    pg(e, 0);
  }
  function Bl(e) {
    var n = Fe(e);
    if (_l(n)) return e;
  }
  function km(e, n) {
    if (e === "change") return n;
  }
  var Om = !1;
  if (xa) {
    var au;
    if (xa) {
      var ru = "oninput" in document;
      if (!ru) {
        var Lm = document.createElement("div");
        Lm.setAttribute("oninput", "return;"), ru = typeof Lm.oninput == "function";
      }
      au = ru;
    } else au = !1;
    Om = au && (!document.documentMode || 9 < document.documentMode);
  }
  function Um() {
    ds && (ds.detachEvent("onpropertychange", Bm), fs = ds = null);
  }
  function Bm(e) {
    if (e.propertyName === "value" && Bl(fs)) {
      var n = [];
      zm(
        n,
        fs,
        e,
        Pc(e)
      ), Sm(bw, n);
    }
  }
  function xw(e, n, r) {
    e === "focusin" ? (Um(), ds = n, fs = r, ds.attachEvent("onpropertychange", Bm)) : e === "focusout" && Um();
  }
  function Sw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Bl(fs);
  }
  function ww(e, n) {
    if (e === "click") return Bl(n);
  }
  function jw(e, n) {
    if (e === "input" || e === "change")
      return Bl(n);
  }
  function Ew(e, n) {
    return e === n && (e !== 0 || 1 / e === 1 / n) || e !== e && n !== n;
  }
  var jn = typeof Object.is == "function" ? Object.is : Ew;
  function hs(e, n) {
    if (jn(e, n)) return !0;
    if (typeof e != "object" || e === null || typeof n != "object" || n === null)
      return !1;
    var r = Object.keys(e), s = Object.keys(n);
    if (r.length !== s.length) return !1;
    for (s = 0; s < r.length; s++) {
      var u = r[s];
      if (!bt.call(n, u) || !jn(e[u], n[u]))
        return !1;
    }
    return !0;
  }
  function $m(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Vm(e, n) {
    var r = $m(e);
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
      r = $m(r);
    }
  }
  function Hm(e, n) {
    return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Hm(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function qm(e) {
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
  function iu(e) {
    var n = e && e.nodeName && e.nodeName.toLowerCase();
    return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
  }
  var Nw = xa && "documentMode" in document && 11 >= document.documentMode, ci = null, su = null, ms = null, lu = !1;
  function Im(e, n, r) {
    var s = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    lu || ci == null || ci !== Al(s) || (s = ci, "selectionStart" in s && iu(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = {
      anchorNode: s.anchorNode,
      anchorOffset: s.anchorOffset,
      focusNode: s.focusNode,
      focusOffset: s.focusOffset
    }), ms && hs(ms, s) || (ms = s, s = Co(su, "onSelect"), 0 < s.length && (n = new Ll(
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
  }, ou = {}, Fm = {};
  xa && (Fm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Mr(e) {
    if (ou[e]) return ou[e];
    if (!ui[e]) return e;
    var n = ui[e], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Fm)
        return ou[e] = n[r];
    return e;
  }
  var Ym = Mr("animationend"), Gm = Mr("animationiteration"), Xm = Mr("animationstart"), Tw = Mr("transitionrun"), Cw = Mr("transitionstart"), Rw = Mr("transitioncancel"), Pm = Mr("transitionend"), Km = /* @__PURE__ */ new Map(), cu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  cu.push("scrollEnd");
  function ea(e, n) {
    Km.set(e, n), Kt(n, [e]);
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
  function Vl() {
    for (var e = di, n = uu = di = 0; n < e; ) {
      var r = Un[n];
      Un[n++] = null;
      var s = Un[n];
      Un[n++] = null;
      var u = Un[n];
      Un[n++] = null;
      var f = Un[n];
      if (Un[n++] = null, s !== null && u !== null) {
        var x = s.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), s.pending = u;
      }
      f !== 0 && Qm(r, u, f);
    }
  }
  function Hl(e, n, r, s) {
    Un[di++] = e, Un[di++] = n, Un[di++] = r, Un[di++] = s, uu |= s, e.lanes |= s, e = e.alternate, e !== null && (e.lanes |= s);
  }
  function du(e, n, r, s) {
    return Hl(e, n, r, s), ql(e);
  }
  function _r(e, n) {
    return Hl(e, null, null, n), ql(e);
  }
  function Qm(e, n, r) {
    e.lanes |= r;
    var s = e.alternate;
    s !== null && (s.lanes |= r);
    for (var u = !1, f = e.return; f !== null; )
      f.childLanes |= r, s = f.alternate, s !== null && (s.childLanes |= r), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & 1 || (u = !0)), e = f, f = f.return;
    return e.tag === 3 ? (f = e.stateNode, u && n !== null && (u = 31 - Yt(r), e = f.hiddenUpdates, s = e[u], s === null ? e[u] = [n] : s.push(n), n.lane = r | 536870912), f) : null;
  }
  function ql(e) {
    if (50 < Ls)
      throw Ls = 0, xd = null, Error(l(185));
    for (var n = e.return; n !== null; )
      e = n, n = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var fi = {};
  function Mw(e, n, r, s) {
    this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function En(e, n, r, s) {
    return new Mw(e, n, r, s);
  }
  function fu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Sa(e, n) {
    var r = e.alternate;
    return r === null ? (r = En(
      e.tag,
      n,
      e.key,
      e.mode
    ), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = n, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 65011712, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, n = e.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r.refCleanup = e.refCleanup, r;
  }
  function Zm(e, n) {
    e.flags &= 65011714;
    var r = e.alternate;
    return r === null ? (e.childLanes = 0, e.lanes = n, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = r.childLanes, e.lanes = r.lanes, e.child = r.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = r.memoizedProps, e.memoizedState = r.memoizedState, e.updateQueue = r.updateQueue, e.type = r.type, n = r.dependencies, e.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), e;
  }
  function Il(e, n, r, s, u, f) {
    var x = 0;
    if (s = e, typeof e == "function") fu(e) && (x = 1);
    else if (typeof e == "string")
      x = kj(
        e,
        r,
        le.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case I:
          return e = En(31, r, n, u), e.elementType = I, e.lanes = f, e;
        case T:
          return Ar(r.children, u, f, n);
        case M:
          x = 8, u |= 24;
          break;
        case N:
          return e = En(12, r, n, u | 2), e.elementType = N, e.lanes = f, e;
        case V:
          return e = En(13, r, n, u), e.elementType = V, e.lanes = f, e;
        case G:
          return e = En(19, r, n, u), e.elementType = G, e.lanes = f, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case A:
                x = 10;
                break e;
              case k:
                x = 9;
                break e;
              case C:
                x = 11;
                break e;
              case ne:
                x = 14;
                break e;
              case D:
                x = 16, s = null;
                break e;
            }
          x = 29, r = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), s = null;
      }
    return n = En(x, r, n, u), n.elementType = e, n.type = s, n.lanes = f, n;
  }
  function Ar(e, n, r, s) {
    return e = En(7, e, s, n), e.lanes = r, e;
  }
  function hu(e, n, r) {
    return e = En(6, e, null, n), e.lanes = r, e;
  }
  function Jm(e) {
    var n = En(18, null, null, 0);
    return n.stateNode = e, n;
  }
  function mu(e, n, r) {
    return n = En(
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
  var Wm = /* @__PURE__ */ new WeakMap();
  function Bn(e, n) {
    if (typeof e == "object" && e !== null) {
      var r = Wm.get(e);
      return r !== void 0 ? r : (n = {
        value: e,
        source: n,
        stack: Te(n)
      }, Wm.set(e, n), n);
    }
    return {
      value: e,
      source: n,
      stack: Te(n)
    };
  }
  var hi = [], mi = 0, Fl = null, ps = 0, $n = [], Vn = 0, Fa = null, ua = 1, da = "";
  function wa(e, n) {
    hi[mi++] = ps, hi[mi++] = Fl, Fl = e, ps = n;
  }
  function ep(e, n, r) {
    $n[Vn++] = ua, $n[Vn++] = da, $n[Vn++] = Fa, Fa = e;
    var s = ua;
    e = da;
    var u = 32 - Yt(s) - 1;
    s &= ~(1 << u), r += 1;
    var f = 32 - Yt(n) + u;
    if (30 < f) {
      var x = u - u % 5;
      f = (s & (1 << x) - 1).toString(32), s >>= x, u -= x, ua = 1 << 32 - Yt(n) + u | r << u | s, da = f + e;
    } else
      ua = 1 << f | r << u | s, da = e;
  }
  function pu(e) {
    e.return !== null && (wa(e, 1), ep(e, 1, 0));
  }
  function vu(e) {
    for (; e === Fl; )
      Fl = hi[--mi], hi[mi] = null, ps = hi[--mi], hi[mi] = null;
    for (; e === Fa; )
      Fa = $n[--Vn], $n[Vn] = null, da = $n[--Vn], $n[Vn] = null, ua = $n[--Vn], $n[Vn] = null;
  }
  function tp(e, n) {
    $n[Vn++] = ua, $n[Vn++] = da, $n[Vn++] = Fa, ua = n.id, da = n.overflow, Fa = e;
  }
  var en = null, gt = null, Ke = !1, Ya = null, Hn = !1, gu = Error(l(519));
  function Ga(e) {
    var n = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw vs(Bn(n, e)), gu;
  }
  function np(e) {
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
        for (r = 0; r < Bs.length; r++)
          Ge(Bs[r], n);
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
        Ge("invalid", n), pm(
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
        Ge("invalid", n), gm(n, s.value, s.defaultValue, s.children);
    }
    r = s.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || s.suppressHydrationWarning === !0 || bg(n.textContent, r) ? (s.popover != null && (Ge("beforetoggle", n), Ge("toggle", n)), s.onScroll != null && Ge("scroll", n), s.onScrollEnd != null && Ge("scrollend", n), s.onClick != null && (n.onclick = ba), n = !0) : n = !1, n || Ga(e, !0);
  }
  function ap(e) {
    for (en = e.return; en; )
      switch (en.tag) {
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
          en = en.return;
      }
  }
  function pi(e) {
    if (e !== en) return !1;
    if (!Ke) return ap(e), Ke = !0, !1;
    var n = e.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = e.type, r = !(r !== "form" && r !== "button") || Od(e.type, e.memoizedProps)), r = !r), r && gt && Ga(e), ap(e), n === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Rg(e);
    } else if (n === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      gt = Rg(e);
    } else
      n === 27 ? (n = gt, sr(e.type) ? (e = Vd, Vd = null, gt = e) : gt = n) : gt = en ? In(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Dr() {
    gt = en = null, Ke = !1;
  }
  function yu() {
    var e = Ya;
    return e !== null && (yn === null ? yn = e : yn.push.apply(
      yn,
      e
    ), Ya = null), e;
  }
  function vs(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var bu = _(null), zr = null, ja = null;
  function Xa(e, n, r) {
    K(bu, n._currentValue), n._currentValue = r;
  }
  function Ea(e) {
    e._currentValue = bu.current, J(bu);
  }
  function xu(e, n, r) {
    for (; e !== null; ) {
      var s = e.alternate;
      if ((e.childLanes & n) !== n ? (e.childLanes |= n, s !== null && (s.childLanes |= n)) : s !== null && (s.childLanes & n) !== n && (s.childLanes |= n), e === r) break;
      e = e.return;
    }
  }
  function Su(e, n, r, s) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var f = u.dependencies;
      if (f !== null) {
        var x = u.child;
        f = f.firstContext;
        e: for (; f !== null; ) {
          var E = f;
          f = u;
          for (var L = 0; L < n.length; L++)
            if (E.context === n[L]) {
              f.lanes |= r, E = f.alternate, E !== null && (E.lanes |= r), xu(
                f.return,
                r,
                e
              ), s || (x = null);
              break e;
            }
          f = E.next;
        }
      } else if (u.tag === 18) {
        if (x = u.return, x === null) throw Error(l(341));
        x.lanes |= r, f = x.alternate, f !== null && (f.lanes |= r), xu(x, r, e), x = null;
      } else x = u.child;
      if (x !== null) x.return = u;
      else
        for (x = u; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (u = x.sibling, u !== null) {
            u.return = x.return, x = u;
            break;
          }
          x = x.return;
        }
      u = x;
    }
  }
  function vi(e, n, r, s) {
    e = null;
    for (var u = n, f = !1; u !== null; ) {
      if (!f) {
        if ((u.flags & 524288) !== 0) f = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var x = u.alternate;
        if (x === null) throw Error(l(387));
        if (x = x.memoizedProps, x !== null) {
          var E = u.type;
          jn(u.pendingProps.value, x.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (u === Ae.current) {
        if (x = u.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Is) : e = [Is]);
      }
      u = u.return;
    }
    e !== null && Su(
      n,
      e,
      r,
      s
    ), n.flags |= 262144;
  }
  function Yl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!jn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function kr(e) {
    zr = e, ja = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tn(e) {
    return rp(zr, e);
  }
  function Gl(e, n) {
    return zr === null && kr(e), rp(e, n);
  }
  function rp(e, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, ja === null) {
      if (e === null) throw Error(l(308));
      ja = n, e.dependencies = { lanes: 0, firstContext: n }, e.flags |= 524288;
    } else ja = ja.next = n;
    return r;
  }
  var _w = typeof AbortController < "u" ? AbortController : function() {
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
  }, Aw = t.unstable_scheduleCallback, Dw = t.unstable_NormalPriority, Ot = {
    $$typeof: A,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function wu() {
    return {
      controller: new _w(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gs(e) {
    e.refCount--, e.refCount === 0 && Aw(Dw, function() {
      e.controller.abort();
    });
  }
  var ys = null, ju = 0, gi = 0, yi = null;
  function zw(e, n) {
    if (ys === null) {
      var r = ys = [];
      ju = 0, gi = Td(), yi = {
        status: "pending",
        value: void 0,
        then: function(s) {
          r.push(s);
        }
      };
    }
    return ju++, n.then(ip, ip), n;
  }
  function ip() {
    if (--ju === 0 && ys !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = ys;
      ys = null, gi = 0, yi = null;
      for (var n = 0; n < e.length; n++) (0, e[n])();
    }
  }
  function kw(e, n) {
    var r = [], s = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        r.push(u);
      }
    };
    return e.then(
      function() {
        s.status = "fulfilled", s.value = n;
        for (var u = 0; u < r.length; u++) (0, r[u])(n);
      },
      function(u) {
        for (s.status = "rejected", s.reason = u, u = 0; u < r.length; u++)
          (0, r[u])(void 0);
      }
    ), s;
  }
  var sp = O.S;
  O.S = function(e, n) {
    Iv = qt(), typeof n == "object" && n !== null && typeof n.then == "function" && zw(e, n), sp !== null && sp(e, n);
  };
  var Or = _(null);
  function Eu() {
    var e = Or.current;
    return e !== null ? e : ft.pooledCache;
  }
  function Xl(e, n) {
    n === null ? K(Or, Or.current) : K(Or, n.pool);
  }
  function lp() {
    var e = Eu();
    return e === null ? null : { parent: Ot._currentValue, pool: e };
  }
  var bi = Error(l(460)), Nu = Error(l(474)), Pl = Error(l(542)), Kl = { then: function() {
  } };
  function op(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function cp(e, n, r) {
    switch (r = e[r], r === void 0 ? e.push(n) : r !== n && (n.then(ba, ba), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw e = n.reason, dp(e), e;
      default:
        if (typeof n.status == "string") n.then(ba, ba);
        else {
          if (e = ft, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = n, e.status = "pending", e.then(
            function(s) {
              if (n.status === "pending") {
                var u = n;
                u.status = "fulfilled", u.value = s;
              }
            },
            function(s) {
              if (n.status === "pending") {
                var u = n;
                u.status = "rejected", u.reason = s;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw e = n.reason, dp(e), e;
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
  function up() {
    if (Ur === null) throw Error(l(459));
    var e = Ur;
    return Ur = null, e;
  }
  function dp(e) {
    if (e === bi || e === Pl)
      throw Error(l(483));
  }
  var xi = null, bs = 0;
  function Ql(e) {
    var n = bs;
    return bs += 1, xi === null && (xi = []), cp(xi, e, n);
  }
  function xs(e, n) {
    n = n.props.ref, e.ref = n !== void 0 ? n : null;
  }
  function Zl(e, n) {
    throw n.$$typeof === S ? Error(l(525)) : (e = Object.prototype.toString.call(n), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : e
      )
    ));
  }
  function fp(e) {
    function n(q, $) {
      if (e) {
        var X = q.deletions;
        X === null ? (q.deletions = [$], q.flags |= 16) : X.push($);
      }
    }
    function r(q, $) {
      if (!e) return null;
      for (; $ !== null; )
        n(q, $), $ = $.sibling;
      return null;
    }
    function s(q) {
      for (var $ = /* @__PURE__ */ new Map(); q !== null; )
        q.key !== null ? $.set(q.key, q) : $.set(q.index, q), q = q.sibling;
      return $;
    }
    function u(q, $) {
      return q = Sa(q, $), q.index = 0, q.sibling = null, q;
    }
    function f(q, $, X) {
      return q.index = X, e ? (X = q.alternate, X !== null ? (X = X.index, X < $ ? (q.flags |= 67108866, $) : X) : (q.flags |= 67108866, $)) : (q.flags |= 1048576, $);
    }
    function x(q) {
      return e && q.alternate === null && (q.flags |= 67108866), q;
    }
    function E(q, $, X, se) {
      return $ === null || $.tag !== 6 ? ($ = hu(X, q.mode, se), $.return = q, $) : ($ = u($, X), $.return = q, $);
    }
    function L(q, $, X, se) {
      var Ce = X.type;
      return Ce === T ? ae(
        q,
        $,
        X.props.children,
        se,
        X.key
      ) : $ !== null && ($.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === $.type) ? ($ = u($, X.props), xs($, X), $.return = q, $) : ($ = Il(
        X.type,
        X.key,
        X.props,
        null,
        q.mode,
        se
      ), xs($, X), $.return = q, $);
    }
    function P(q, $, X, se) {
      return $ === null || $.tag !== 4 || $.stateNode.containerInfo !== X.containerInfo || $.stateNode.implementation !== X.implementation ? ($ = mu(X, q.mode, se), $.return = q, $) : ($ = u($, X.children || []), $.return = q, $);
    }
    function ae(q, $, X, se, Ce) {
      return $ === null || $.tag !== 7 ? ($ = Ar(
        X,
        q.mode,
        se,
        Ce
      ), $.return = q, $) : ($ = u($, X), $.return = q, $);
    }
    function oe(q, $, X) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return $ = hu(
          "" + $,
          q.mode,
          X
        ), $.return = q, $;
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case w:
            return X = Il(
              $.type,
              $.key,
              $.props,
              null,
              q.mode,
              X
            ), xs(X, $), X.return = q, X;
          case j:
            return $ = mu(
              $,
              q.mode,
              X
            ), $.return = q, $;
          case D:
            return $ = Lr($), oe(q, $, X);
        }
        if (W($) || re($))
          return $ = Ar(
            $,
            q.mode,
            X,
            null
          ), $.return = q, $;
        if (typeof $.then == "function")
          return oe(q, Ql($), X);
        if ($.$$typeof === A)
          return oe(
            q,
            Gl(q, $),
            X
          );
        Zl(q, $);
      }
      return null;
    }
    function Q(q, $, X, se) {
      var Ce = $ !== null ? $.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return Ce !== null ? null : E(q, $, "" + X, se);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case w:
            return X.key === Ce ? L(q, $, X, se) : null;
          case j:
            return X.key === Ce ? P(q, $, X, se) : null;
          case D:
            return X = Lr(X), Q(q, $, X, se);
        }
        if (W(X) || re(X))
          return Ce !== null ? null : ae(q, $, X, se, null);
        if (typeof X.then == "function")
          return Q(
            q,
            $,
            Ql(X),
            se
          );
        if (X.$$typeof === A)
          return Q(
            q,
            $,
            Gl(q, X),
            se
          );
        Zl(q, X);
      }
      return null;
    }
    function ee(q, $, X, se, Ce) {
      if (typeof se == "string" && se !== "" || typeof se == "number" || typeof se == "bigint")
        return q = q.get(X) || null, E($, q, "" + se, Ce);
      if (typeof se == "object" && se !== null) {
        switch (se.$$typeof) {
          case w:
            return q = q.get(
              se.key === null ? X : se.key
            ) || null, L($, q, se, Ce);
          case j:
            return q = q.get(
              se.key === null ? X : se.key
            ) || null, P($, q, se, Ce);
          case D:
            return se = Lr(se), ee(
              q,
              $,
              X,
              se,
              Ce
            );
        }
        if (W(se) || re(se))
          return q = q.get(X) || null, ae($, q, se, Ce, null);
        if (typeof se.then == "function")
          return ee(
            q,
            $,
            X,
            Ql(se),
            Ce
          );
        if (se.$$typeof === A)
          return ee(
            q,
            $,
            X,
            Gl($, se),
            Ce
          );
        Zl($, se);
      }
      return null;
    }
    function xe(q, $, X, se) {
      for (var Ce = null, Je = null, Ee = $, Be = $ = 0, Pe = null; Ee !== null && Be < X.length; Be++) {
        Ee.index > Be ? (Pe = Ee, Ee = null) : Pe = Ee.sibling;
        var We = Q(
          q,
          Ee,
          X[Be],
          se
        );
        if (We === null) {
          Ee === null && (Ee = Pe);
          break;
        }
        e && Ee && We.alternate === null && n(q, Ee), $ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We, Ee = Pe;
      }
      if (Be === X.length)
        return r(q, Ee), Ke && wa(q, Be), Ce;
      if (Ee === null) {
        for (; Be < X.length; Be++)
          Ee = oe(q, X[Be], se), Ee !== null && ($ = f(
            Ee,
            $,
            Be
          ), Je === null ? Ce = Ee : Je.sibling = Ee, Je = Ee);
        return Ke && wa(q, Be), Ce;
      }
      for (Ee = s(Ee); Be < X.length; Be++)
        Pe = ee(
          Ee,
          q,
          Be,
          X[Be],
          se
        ), Pe !== null && (e && Pe.alternate !== null && Ee.delete(
          Pe.key === null ? Be : Pe.key
        ), $ = f(
          Pe,
          $,
          Be
        ), Je === null ? Ce = Pe : Je.sibling = Pe, Je = Pe);
      return e && Ee.forEach(function(dr) {
        return n(q, dr);
      }), Ke && wa(q, Be), Ce;
    }
    function _e(q, $, X, se) {
      if (X == null) throw Error(l(151));
      for (var Ce = null, Je = null, Ee = $, Be = $ = 0, Pe = null, We = X.next(); Ee !== null && !We.done; Be++, We = X.next()) {
        Ee.index > Be ? (Pe = Ee, Ee = null) : Pe = Ee.sibling;
        var dr = Q(q, Ee, We.value, se);
        if (dr === null) {
          Ee === null && (Ee = Pe);
          break;
        }
        e && Ee && dr.alternate === null && n(q, Ee), $ = f(dr, $, Be), Je === null ? Ce = dr : Je.sibling = dr, Je = dr, Ee = Pe;
      }
      if (We.done)
        return r(q, Ee), Ke && wa(q, Be), Ce;
      if (Ee === null) {
        for (; !We.done; Be++, We = X.next())
          We = oe(q, We.value, se), We !== null && ($ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
        return Ke && wa(q, Be), Ce;
      }
      for (Ee = s(Ee); !We.done; Be++, We = X.next())
        We = ee(Ee, q, Be, We.value, se), We !== null && (e && We.alternate !== null && Ee.delete(We.key === null ? Be : We.key), $ = f(We, $, Be), Je === null ? Ce = We : Je.sibling = We, Je = We);
      return e && Ee.forEach(function(Yj) {
        return n(q, Yj);
      }), Ke && wa(q, Be), Ce;
    }
    function ct(q, $, X, se) {
      if (typeof X == "object" && X !== null && X.type === T && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case w:
            e: {
              for (var Ce = X.key; $ !== null; ) {
                if ($.key === Ce) {
                  if (Ce = X.type, Ce === T) {
                    if ($.tag === 7) {
                      r(
                        q,
                        $.sibling
                      ), se = u(
                        $,
                        X.props.children
                      ), se.return = q, q = se;
                      break e;
                    }
                  } else if ($.elementType === Ce || typeof Ce == "object" && Ce !== null && Ce.$$typeof === D && Lr(Ce) === $.type) {
                    r(
                      q,
                      $.sibling
                    ), se = u($, X.props), xs(se, X), se.return = q, q = se;
                    break e;
                  }
                  r(q, $);
                  break;
                } else n(q, $);
                $ = $.sibling;
              }
              X.type === T ? (se = Ar(
                X.props.children,
                q.mode,
                se,
                X.key
              ), se.return = q, q = se) : (se = Il(
                X.type,
                X.key,
                X.props,
                null,
                q.mode,
                se
              ), xs(se, X), se.return = q, q = se);
            }
            return x(q);
          case j:
            e: {
              for (Ce = X.key; $ !== null; ) {
                if ($.key === Ce)
                  if ($.tag === 4 && $.stateNode.containerInfo === X.containerInfo && $.stateNode.implementation === X.implementation) {
                    r(
                      q,
                      $.sibling
                    ), se = u($, X.children || []), se.return = q, q = se;
                    break e;
                  } else {
                    r(q, $);
                    break;
                  }
                else n(q, $);
                $ = $.sibling;
              }
              se = mu(X, q.mode, se), se.return = q, q = se;
            }
            return x(q);
          case D:
            return X = Lr(X), ct(
              q,
              $,
              X,
              se
            );
        }
        if (W(X))
          return xe(
            q,
            $,
            X,
            se
          );
        if (re(X)) {
          if (Ce = re(X), typeof Ce != "function") throw Error(l(150));
          return X = Ce.call(X), _e(
            q,
            $,
            X,
            se
          );
        }
        if (typeof X.then == "function")
          return ct(
            q,
            $,
            Ql(X),
            se
          );
        if (X.$$typeof === A)
          return ct(
            q,
            $,
            Gl(q, X),
            se
          );
        Zl(q, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint" ? (X = "" + X, $ !== null && $.tag === 6 ? (r(q, $.sibling), se = u($, X), se.return = q, q = se) : (r(q, $), se = hu(X, q.mode, se), se.return = q, q = se), x(q)) : r(q, $);
    }
    return function(q, $, X, se) {
      try {
        bs = 0;
        var Ce = ct(
          q,
          $,
          X,
          se
        );
        return xi = null, Ce;
      } catch (Ee) {
        if (Ee === bi || Ee === Pl) throw Ee;
        var Je = En(29, Ee, null, q.mode);
        return Je.lanes = se, Je.return = q, Je;
      } finally {
      }
    };
  }
  var Br = fp(!0), hp = fp(!1), Pa = !1;
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
      var u = s.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), s.pending = n, n = ql(e), Qm(e, null, r), n;
    }
    return Hl(e, s, n, r), ql(e);
  }
  function Ss(e, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, rn(e, r);
    }
  }
  function Ru(e, n) {
    var r = e.updateQueue, s = e.alternate;
    if (s !== null && (s = s.updateQueue, r === s)) {
      var u = null, f = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var x = {
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          };
          f === null ? u = f = x : f = f.next = x, r = r.next;
        } while (r !== null);
        f === null ? u = f = n : f = f.next = n;
      } else u = f = n;
      r = {
        baseState: s.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: f,
        shared: s.shared,
        callbacks: s.callbacks
      }, e.updateQueue = r;
      return;
    }
    e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = n : e.next = n, r.lastBaseUpdate = n;
  }
  var Mu = !1;
  function ws() {
    if (Mu) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function js(e, n, r, s) {
    Mu = !1;
    var u = e.updateQueue;
    Pa = !1;
    var f = u.firstBaseUpdate, x = u.lastBaseUpdate, E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var L = E, P = L.next;
      L.next = null, x === null ? f = P : x.next = P, x = L;
      var ae = e.alternate;
      ae !== null && (ae = ae.updateQueue, E = ae.lastBaseUpdate, E !== x && (E === null ? ae.firstBaseUpdate = P : E.next = P, ae.lastBaseUpdate = L));
    }
    if (f !== null) {
      var oe = u.baseState;
      x = 0, ae = P = L = null, E = f;
      do {
        var Q = E.lane & -536870913, ee = Q !== E.lane;
        if (ee ? (Xe & Q) === Q : (s & Q) === Q) {
          Q !== 0 && Q === gi && (Mu = !0), ae !== null && (ae = ae.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var xe = e, _e = E;
            Q = n;
            var ct = r;
            switch (_e.tag) {
              case 1:
                if (xe = _e.payload, typeof xe == "function") {
                  oe = xe.call(ct, oe, Q);
                  break e;
                }
                oe = xe;
                break e;
              case 3:
                xe.flags = xe.flags & -65537 | 128;
              case 0:
                if (xe = _e.payload, Q = typeof xe == "function" ? xe.call(ct, oe, Q) : xe, Q == null) break e;
                oe = v({}, oe, Q);
                break e;
              case 2:
                Pa = !0;
            }
          }
          Q = E.callback, Q !== null && (e.flags |= 64, ee && (e.flags |= 8192), ee = u.callbacks, ee === null ? u.callbacks = [Q] : ee.push(Q));
        } else
          ee = {
            lane: Q,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, ae === null ? (P = ae = ee, L = oe) : ae = ae.next = ee, x |= Q;
        if (E = E.next, E === null) {
          if (E = u.shared.pending, E === null)
            break;
          ee = E, E = ee.next, ee.next = null, u.lastBaseUpdate = ee, u.shared.pending = null;
        }
      } while (!0);
      ae === null && (L = oe), u.baseState = L, u.firstBaseUpdate = P, u.lastBaseUpdate = ae, f === null && (u.shared.lanes = 0), tr |= x, e.lanes = x, e.memoizedState = oe;
    }
  }
  function mp(e, n) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(n);
  }
  function pp(e, n) {
    var r = e.callbacks;
    if (r !== null)
      for (e.callbacks = null, e = 0; e < r.length; e++)
        mp(r[e], n);
  }
  var Si = _(null), Jl = _(0);
  function vp(e, n) {
    e = za, K(Jl, e), K(Si, n), za = e | n.baseLanes;
  }
  function _u() {
    K(Jl, za), K(Si, Si.current);
  }
  function Au() {
    za = Jl.current, J(Si), J(Jl);
  }
  var Nn = _(null), qn = null;
  function Za(e) {
    var n = e.alternate;
    K(Rt, Rt.current & 1), K(Nn, e), qn === null && (n === null || Si.current !== null || n.memoizedState !== null) && (qn = e);
  }
  function Du(e) {
    K(Rt, Rt.current), K(Nn, e), qn === null && (qn = e);
  }
  function gp(e) {
    e.tag === 22 ? (K(Rt, Rt.current), K(Nn, e), qn === null && (qn = e)) : Ja();
  }
  function Ja() {
    K(Rt, Rt.current), K(Nn, Nn.current);
  }
  function Tn(e) {
    J(Nn), qn === e && (qn = null), J(Rt);
  }
  var Rt = _(0);
  function Wl(e) {
    for (var n = e; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || Bd(r) || $d(r)))
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
  var Na = 0, Ue = null, lt = null, Lt = null, eo = !1, wi = !1, $r = !1, to = 0, Es = 0, ji = null, Ow = 0;
  function Et() {
    throw Error(l(321));
  }
  function zu(e, n) {
    if (n === null) return !1;
    for (var r = 0; r < n.length && r < e.length; r++)
      if (!jn(e[r], n[r])) return !1;
    return !0;
  }
  function ku(e, n, r, s, u, f) {
    return Na = f, Ue = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = e === null || e.memoizedState === null ? ev : Ku, $r = !1, f = r(s, u), $r = !1, wi && (f = bp(
      n,
      r,
      s,
      u
    )), yp(e), f;
  }
  function yp(e) {
    O.H = Cs;
    var n = lt !== null && lt.next !== null;
    if (Na = 0, Lt = lt = Ue = null, eo = !1, Es = 0, ji = null, n) throw Error(l(300));
    e === null || Ut || (e = e.dependencies, e !== null && Yl(e) && (Ut = !0));
  }
  function bp(e, n, r, s) {
    Ue = e;
    var u = 0;
    do {
      if (wi && (ji = null), Es = 0, wi = !1, 25 <= u) throw Error(l(301));
      if (u += 1, Lt = lt = null, e.updateQueue != null) {
        var f = e.updateQueue;
        f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
      }
      O.H = tv, f = n(r, s);
    } while (wi);
    return f;
  }
  function Lw() {
    var e = O.H, n = e.useState()[0];
    return n = typeof n.then == "function" ? Ns(n) : n, e = e.useState()[0], (lt !== null ? lt.memoizedState : null) !== e && (Ue.flags |= 1024), n;
  }
  function Ou() {
    var e = to !== 0;
    return to = 0, e;
  }
  function Lu(e, n, r) {
    n.updateQueue = e.updateQueue, n.flags &= -2053, e.lanes &= ~r;
  }
  function Uu(e) {
    if (eo) {
      for (e = e.memoizedState; e !== null; ) {
        var n = e.queue;
        n !== null && (n.pending = null), e = e.next;
      }
      eo = !1;
    }
    Na = 0, Lt = lt = Ue = null, wi = !1, Es = to = 0, ji = null;
  }
  function dn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Lt === null ? Ue.memoizedState = Lt = e : Lt = Lt.next = e, Lt;
  }
  function Mt() {
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
  function no() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ns(e) {
    var n = Es;
    return Es += 1, ji === null && (ji = []), e = cp(ji, e, n), n = Ue, (Lt === null ? n.memoizedState : Lt.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? ev : Ku), e;
  }
  function ao(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ns(e);
      if (e.$$typeof === A) return tn(e);
    }
    throw Error(l(438, String(e)));
  }
  function Bu(e) {
    var n = null, r = Ue.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var s = Ue.alternate;
      s !== null && (s = s.updateQueue, s !== null && (s = s.memoCache, s != null && (n = {
        data: s.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = no(), Ue.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(e), s = 0; s < e; s++)
        r[s] = F;
    return n.index++, r;
  }
  function Ta(e, n) {
    return typeof n == "function" ? n(e) : n;
  }
  function ro(e) {
    var n = Mt();
    return $u(n, lt, e);
  }
  function $u(e, n, r) {
    var s = e.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = r;
    var u = e.baseQueue, f = s.pending;
    if (f !== null) {
      if (u !== null) {
        var x = u.next;
        u.next = f.next, f.next = x;
      }
      n.baseQueue = u = f, s.pending = null;
    }
    if (f = e.baseState, u === null) e.memoizedState = f;
    else {
      n = u.next;
      var E = x = null, L = null, P = n, ae = !1;
      do {
        var oe = P.lane & -536870913;
        if (oe !== P.lane ? (Xe & oe) === oe : (Na & oe) === oe) {
          var Q = P.revertLane;
          if (Q === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }), oe === gi && (ae = !0);
          else if ((Na & Q) === Q) {
            P = P.next, Q === gi && (ae = !0);
            continue;
          } else
            oe = {
              lane: 0,
              revertLane: P.revertLane,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }, L === null ? (E = L = oe, x = f) : L = L.next = oe, Ue.lanes |= Q, tr |= Q;
          oe = P.action, $r && r(f, oe), f = P.hasEagerState ? P.eagerState : r(f, oe);
        } else
          Q = {
            lane: oe,
            revertLane: P.revertLane,
            gesture: P.gesture,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          }, L === null ? (E = L = Q, x = f) : L = L.next = Q, Ue.lanes |= oe, tr |= oe;
        P = P.next;
      } while (P !== null && P !== n);
      if (L === null ? x = f : L.next = E, !jn(f, e.memoizedState) && (Ut = !0, ae && (r = yi, r !== null)))
        throw r;
      e.memoizedState = f, e.baseState = x, e.baseQueue = L, s.lastRenderedState = f;
    }
    return u === null && (s.lanes = 0), [e.memoizedState, s.dispatch];
  }
  function Vu(e) {
    var n = Mt(), r = n.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = e;
    var s = r.dispatch, u = r.pending, f = n.memoizedState;
    if (u !== null) {
      r.pending = null;
      var x = u = u.next;
      do
        f = e(f, x.action), x = x.next;
      while (x !== u);
      jn(f, n.memoizedState) || (Ut = !0), n.memoizedState = f, n.baseQueue === null && (n.baseState = f), r.lastRenderedState = f;
    }
    return [f, s];
  }
  function xp(e, n, r) {
    var s = Ue, u = Mt(), f = Ke;
    if (f) {
      if (r === void 0) throw Error(l(407));
      r = r();
    } else r = n();
    var x = !jn(
      (lt || u).memoizedState,
      r
    );
    if (x && (u.memoizedState = r, Ut = !0), u = u.queue, Iu(jp.bind(null, s, u, e), [
      e
    ]), u.getSnapshot !== n || x || Lt !== null && Lt.memoizedState.tag & 1) {
      if (s.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        wp.bind(
          null,
          s,
          u,
          r,
          n
        ),
        null
      ), ft === null) throw Error(l(349));
      f || (Na & 127) !== 0 || Sp(s, n, r);
    }
    return r;
  }
  function Sp(e, n, r) {
    e.flags |= 16384, e = { getSnapshot: n, value: r }, n = Ue.updateQueue, n === null ? (n = no(), Ue.updateQueue = n, n.stores = [e]) : (r = n.stores, r === null ? n.stores = [e] : r.push(e));
  }
  function wp(e, n, r, s) {
    n.value = r, n.getSnapshot = s, Ep(n) && Np(e);
  }
  function jp(e, n, r) {
    return r(function() {
      Ep(n) && Np(e);
    });
  }
  function Ep(e) {
    var n = e.getSnapshot;
    e = e.value;
    try {
      var r = n();
      return !jn(e, r);
    } catch {
      return !0;
    }
  }
  function Np(e) {
    var n = _r(e, 2);
    n !== null && bn(n, e, 2);
  }
  function Hu(e) {
    var n = dn();
    if (typeof e == "function") {
      var r = e;
      if (e = r(), $r) {
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
      lastRenderedReducer: Ta,
      lastRenderedState: e
    }, n;
  }
  function Tp(e, n, r, s) {
    return e.baseState = r, $u(
      e,
      lt,
      typeof s == "function" ? s : Ta
    );
  }
  function Uw(e, n, r, s, u) {
    if (lo(e)) throw Error(l(485));
    if (e = n.action, e !== null) {
      var f = {
        payload: u,
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
      O.T !== null ? r(!0) : f.isTransition = !1, s(f), r = n.pending, r === null ? (f.next = n.pending = f, Cp(n, f)) : (f.next = r.next, n.pending = r.next = f);
    }
  }
  function Cp(e, n) {
    var r = n.action, s = n.payload, u = e.state;
    if (n.isTransition) {
      var f = O.T, x = {};
      O.T = x;
      try {
        var E = r(u, s), L = O.S;
        L !== null && L(x, E), Rp(e, n, E);
      } catch (P) {
        qu(e, n, P);
      } finally {
        f !== null && x.types !== null && (f.types = x.types), O.T = f;
      }
    } else
      try {
        f = r(u, s), Rp(e, n, f);
      } catch (P) {
        qu(e, n, P);
      }
  }
  function Rp(e, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(
      function(s) {
        Mp(e, n, s);
      },
      function(s) {
        return qu(e, n, s);
      }
    ) : Mp(e, n, r);
  }
  function Mp(e, n, r) {
    n.status = "fulfilled", n.value = r, _p(n), e.state = r, n = e.pending, n !== null && (r = n.next, r === n ? e.pending = null : (r = r.next, n.next = r, Cp(e, r)));
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
  function Ap(e, n) {
    return n;
  }
  function Dp(e, n) {
    if (Ke) {
      var r = ft.formState;
      if (r !== null) {
        e: {
          var s = Ue;
          if (Ke) {
            if (gt) {
              t: {
                for (var u = gt, f = Hn; u.nodeType !== 8; ) {
                  if (!f) {
                    u = null;
                    break t;
                  }
                  if (u = In(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                f = u.data, u = f === "F!" || f === "F" ? u : null;
              }
              if (u) {
                gt = In(
                  u.nextSibling
                ), s = u.data === "F!";
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
    return r = dn(), r.memoizedState = r.baseState = n, s = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ap,
      lastRenderedState: n
    }, r.queue = s, r = Zp.bind(
      null,
      Ue,
      s
    ), s.dispatch = r, s = Hu(!1), f = Pu.bind(
      null,
      Ue,
      !1,
      s.queue
    ), s = dn(), u = {
      state: n,
      dispatch: null,
      action: e,
      pending: null
    }, s.queue = u, r = Uw.bind(
      null,
      Ue,
      u,
      f,
      r
    ), u.dispatch = r, s.memoizedState = e, [n, r, !1];
  }
  function zp(e) {
    var n = Mt();
    return kp(n, lt, e);
  }
  function kp(e, n, r) {
    if (n = $u(
      e,
      n,
      Ap
    )[0], e = ro(Ta)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var s = Ns(n);
      } catch (x) {
        throw x === bi ? Pl : x;
      }
    else s = n;
    n = Mt();
    var u = n.queue, f = u.dispatch;
    return r !== n.memoizedState && (Ue.flags |= 2048, Ei(
      9,
      { destroy: void 0 },
      Bw.bind(null, u, r),
      null
    )), [s, f, e];
  }
  function Bw(e, n) {
    e.action = n;
  }
  function Op(e) {
    var n = Mt(), r = lt;
    if (r !== null)
      return kp(n, r, e);
    Mt(), n = n.memoizedState, r = Mt();
    var s = r.queue.dispatch;
    return r.memoizedState = e, [n, s, !1];
  }
  function Ei(e, n, r, s) {
    return e = { tag: e, create: r, deps: s, inst: n, next: null }, n = Ue.updateQueue, n === null && (n = no(), Ue.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = e.next = e : (s = r.next, r.next = e, e.next = s, n.lastEffect = e), e;
  }
  function Lp() {
    return Mt().memoizedState;
  }
  function io(e, n, r, s) {
    var u = dn();
    Ue.flags |= e, u.memoizedState = Ei(
      1 | n,
      { destroy: void 0 },
      r,
      s === void 0 ? null : s
    );
  }
  function so(e, n, r, s) {
    var u = Mt();
    s = s === void 0 ? null : s;
    var f = u.memoizedState.inst;
    lt !== null && s !== null && zu(s, lt.memoizedState.deps) ? u.memoizedState = Ei(n, f, r, s) : (Ue.flags |= e, u.memoizedState = Ei(
      1 | n,
      f,
      r,
      s
    ));
  }
  function Up(e, n) {
    io(8390656, 8, e, n);
  }
  function Iu(e, n) {
    so(2048, 8, e, n);
  }
  function $w(e) {
    Ue.flags |= 4;
    var n = Ue.updateQueue;
    if (n === null)
      n = no(), Ue.updateQueue = n, n.events = [e];
    else {
      var r = n.events;
      r === null ? n.events = [e] : r.push(e);
    }
  }
  function Bp(e) {
    var n = Mt().memoizedState;
    return $w({ ref: n, nextImpl: e }), function() {
      if ((tt & 2) !== 0) throw Error(l(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function $p(e, n) {
    return so(4, 2, e, n);
  }
  function Vp(e, n) {
    return so(4, 4, e, n);
  }
  function Hp(e, n) {
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
  function qp(e, n, r) {
    r = r != null ? r.concat([e]) : null, so(4, 4, Hp.bind(null, n, e), r);
  }
  function Fu() {
  }
  function Ip(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    return n !== null && zu(n, s[1]) ? s[0] : (r.memoizedState = [e, n], e);
  }
  function Fp(e, n) {
    var r = Mt();
    n = n === void 0 ? null : n;
    var s = r.memoizedState;
    if (n !== null && zu(n, s[1]))
      return s[0];
    if (s = e(), $r) {
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
    return r === void 0 || (Na & 1073741824) !== 0 && (Xe & 261930) === 0 ? e.memoizedState = n : (e.memoizedState = r, e = Yv(), Ue.lanes |= e, tr |= e, r);
  }
  function Yp(e, n, r, s) {
    return jn(r, n) ? r : Si.current !== null ? (e = Yu(e, r, s), jn(e, n) || (Ut = !0), e) : (Na & 42) === 0 || (Na & 1073741824) !== 0 && (Xe & 261930) === 0 ? (Ut = !0, e.memoizedState = r) : (e = Yv(), Ue.lanes |= e, tr |= e, n);
  }
  function Gp(e, n, r, s, u) {
    var f = R.p;
    R.p = f !== 0 && 8 > f ? f : 8;
    var x = O.T, E = {};
    O.T = E, Pu(e, !1, n, r);
    try {
      var L = u(), P = O.S;
      if (P !== null && P(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ae = kw(
          L,
          s
        );
        Ts(
          e,
          n,
          ae,
          Mn(e)
        );
      } else
        Ts(
          e,
          n,
          s,
          Mn(e)
        );
    } catch (oe) {
      Ts(
        e,
        n,
        { then: function() {
        }, status: "rejected", reason: oe },
        Mn()
      );
    } finally {
      R.p = f, x !== null && E.types !== null && (x.types = E.types), O.T = x;
    }
  }
  function Vw() {
  }
  function Gu(e, n, r, s) {
    if (e.tag !== 5) throw Error(l(476));
    var u = Xp(e).queue;
    Gp(
      e,
      u,
      n,
      U,
      r === null ? Vw : function() {
        return Pp(e), r(s);
      }
    );
  }
  function Xp(e) {
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
        lastRenderedReducer: Ta,
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
        lastRenderedReducer: Ta,
        lastRenderedState: r
      },
      next: null
    }, e.memoizedState = n, e = e.alternate, e !== null && (e.memoizedState = n), n;
  }
  function Pp(e) {
    var n = Xp(e);
    n.next === null && (n = e.alternate.memoizedState), Ts(
      e,
      n.next.queue,
      {},
      Mn()
    );
  }
  function Xu() {
    return tn(Is);
  }
  function Kp() {
    return Mt().memoizedState;
  }
  function Qp() {
    return Mt().memoizedState;
  }
  function Hw(e) {
    for (var n = e.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = Mn();
          e = Ka(r);
          var s = Qa(n, e, r);
          s !== null && (bn(s, n, r), Ss(s, n, r)), n = { cache: wu() }, e.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function qw(e, n, r) {
    var s = Mn();
    r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(e) ? Jp(n, r) : (r = du(e, n, r, s), r !== null && (bn(r, e, s), Wp(r, n, s)));
  }
  function Zp(e, n, r) {
    var s = Mn();
    Ts(e, n, r, s);
  }
  function Ts(e, n, r, s) {
    var u = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (lo(e)) Jp(n, u);
    else {
      var f = e.alternate;
      if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = n.lastRenderedReducer, f !== null))
        try {
          var x = n.lastRenderedState, E = f(x, r);
          if (u.hasEagerState = !0, u.eagerState = E, jn(E, x))
            return Hl(e, n, u, 0), ft === null && Vl(), !1;
        } catch {
        } finally {
        }
      if (r = du(e, n, u, s), r !== null)
        return bn(r, e, s), Wp(r, n, s), !0;
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
    }, lo(e)) {
      if (n) throw Error(l(479));
    } else
      n = du(
        e,
        r,
        s,
        2
      ), n !== null && bn(n, e, 2);
  }
  function lo(e) {
    var n = e.alternate;
    return e === Ue || n !== null && n === Ue;
  }
  function Jp(e, n) {
    wi = eo = !0;
    var r = e.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), e.pending = n;
  }
  function Wp(e, n, r) {
    if ((r & 4194048) !== 0) {
      var s = n.lanes;
      s &= e.pendingLanes, r |= s, n.lanes = r, rn(e, r);
    }
  }
  var Cs = {
    readContext: tn,
    use: ao,
    useCallback: Et,
    useContext: Et,
    useEffect: Et,
    useImperativeHandle: Et,
    useLayoutEffect: Et,
    useInsertionEffect: Et,
    useMemo: Et,
    useReducer: Et,
    useRef: Et,
    useState: Et,
    useDebugValue: Et,
    useDeferredValue: Et,
    useTransition: Et,
    useSyncExternalStore: Et,
    useId: Et,
    useHostTransitionStatus: Et,
    useFormState: Et,
    useActionState: Et,
    useOptimistic: Et,
    useMemoCache: Et,
    useCacheRefresh: Et
  };
  Cs.useEffectEvent = Et;
  var ev = {
    readContext: tn,
    use: ao,
    useCallback: function(e, n) {
      return dn().memoizedState = [
        e,
        n === void 0 ? null : n
      ], e;
    },
    useContext: tn,
    useEffect: Up,
    useImperativeHandle: function(e, n, r) {
      r = r != null ? r.concat([e]) : null, io(
        4194308,
        4,
        Hp.bind(null, n, e),
        r
      );
    },
    useLayoutEffect: function(e, n) {
      return io(4194308, 4, e, n);
    },
    useInsertionEffect: function(e, n) {
      io(4, 2, e, n);
    },
    useMemo: function(e, n) {
      var r = dn();
      n = n === void 0 ? null : n;
      var s = e();
      if ($r) {
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
      var s = dn();
      if (r !== void 0) {
        var u = r(n);
        if ($r) {
          Tt(!0);
          try {
            r(n);
          } finally {
            Tt(!1);
          }
        }
      } else u = n;
      return s.memoizedState = s.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, s.queue = e, e = e.dispatch = qw.bind(
        null,
        Ue,
        e
      ), [s.memoizedState, e];
    },
    useRef: function(e) {
      var n = dn();
      return e = { current: e }, n.memoizedState = e;
    },
    useState: function(e) {
      e = Hu(e);
      var n = e.queue, r = Zp.bind(null, Ue, n);
      return n.dispatch = r, [e.memoizedState, r];
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = dn();
      return Yu(r, e, n);
    },
    useTransition: function() {
      var e = Hu(!1);
      return e = Gp.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), dn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, n, r) {
      var s = Ue, u = dn();
      if (Ke) {
        if (r === void 0)
          throw Error(l(407));
        r = r();
      } else {
        if (r = n(), ft === null)
          throw Error(l(349));
        (Xe & 127) !== 0 || Sp(s, n, r);
      }
      u.memoizedState = r;
      var f = { value: r, getSnapshot: n };
      return u.queue = f, Up(jp.bind(null, s, f, e), [
        e
      ]), s.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        wp.bind(
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
      var e = dn(), n = ft.identifierPrefix;
      if (Ke) {
        var r = da, s = ua;
        r = (s & ~(1 << 32 - Yt(s) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = to++, 0 < r && (n += "H" + r.toString(32)), n += "_";
      } else
        r = Ow++, n = "_" + n + "r_" + r.toString(32) + "_";
      return e.memoizedState = n;
    },
    useHostTransitionStatus: Xu,
    useFormState: Dp,
    useActionState: Dp,
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
      return n.queue = r, n = Pu.bind(
        null,
        Ue,
        !0,
        r
      ), r.dispatch = n, [e, n];
    },
    useMemoCache: Bu,
    useCacheRefresh: function() {
      return dn().memoizedState = Hw.bind(
        null,
        Ue
      );
    },
    useEffectEvent: function(e) {
      var n = dn(), r = { impl: e };
      return n.memoizedState = r, function() {
        if ((tt & 2) !== 0)
          throw Error(l(440));
        return r.impl.apply(void 0, arguments);
      };
    }
  }, Ku = {
    readContext: tn,
    use: ao,
    useCallback: Ip,
    useContext: tn,
    useEffect: Iu,
    useImperativeHandle: qp,
    useInsertionEffect: $p,
    useLayoutEffect: Vp,
    useMemo: Fp,
    useReducer: ro,
    useRef: Lp,
    useState: function() {
      return ro(Ta);
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return Yp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = ro(Ta)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ns(e),
        n
      ];
    },
    useSyncExternalStore: xp,
    useId: Kp,
    useHostTransitionStatus: Xu,
    useFormState: zp,
    useActionState: zp,
    useOptimistic: function(e, n) {
      var r = Mt();
      return Tp(r, lt, e, n);
    },
    useMemoCache: Bu,
    useCacheRefresh: Qp
  };
  Ku.useEffectEvent = Bp;
  var tv = {
    readContext: tn,
    use: ao,
    useCallback: Ip,
    useContext: tn,
    useEffect: Iu,
    useImperativeHandle: qp,
    useInsertionEffect: $p,
    useLayoutEffect: Vp,
    useMemo: Fp,
    useReducer: Vu,
    useRef: Lp,
    useState: function() {
      return Vu(Ta);
    },
    useDebugValue: Fu,
    useDeferredValue: function(e, n) {
      var r = Mt();
      return lt === null ? Yu(r, e, n) : Yp(
        r,
        lt.memoizedState,
        e,
        n
      );
    },
    useTransition: function() {
      var e = Vu(Ta)[0], n = Mt().memoizedState;
      return [
        typeof e == "boolean" ? e : Ns(e),
        n
      ];
    },
    useSyncExternalStore: xp,
    useId: Kp,
    useHostTransitionStatus: Xu,
    useFormState: Op,
    useActionState: Op,
    useOptimistic: function(e, n) {
      var r = Mt();
      return lt !== null ? Tp(r, lt, e, n) : (r.baseState = e, [e, r.queue.dispatch]);
    },
    useMemoCache: Bu,
    useCacheRefresh: Qp
  };
  tv.useEffectEvent = Bp;
  function Qu(e, n, r, s) {
    n = e.memoizedState, r = r(s, n), r = r == null ? n : v({}, n, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r);
  }
  var Zu = {
    enqueueSetState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), Ss(n, e, s));
    },
    enqueueReplaceState: function(e, n, r) {
      e = e._reactInternals;
      var s = Mn(), u = Ka(s);
      u.tag = 1, u.payload = n, r != null && (u.callback = r), n = Qa(e, u, s), n !== null && (bn(n, e, s), Ss(n, e, s));
    },
    enqueueForceUpdate: function(e, n) {
      e = e._reactInternals;
      var r = Mn(), s = Ka(r);
      s.tag = 2, n != null && (s.callback = n), n = Qa(e, s, r), n !== null && (bn(n, e, r), Ss(n, e, r));
    }
  };
  function nv(e, n, r, s, u, f, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, f, x) : n.prototype && n.prototype.isPureReactComponent ? !hs(r, s) || !hs(u, f) : !0;
  }
  function av(e, n, r, s) {
    e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, s), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, s), n.state !== e && Zu.enqueueReplaceState(n, n.state, null);
  }
  function Vr(e, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    }
    if (e = e.defaultProps) {
      r === n && (r = v({}, r));
      for (var u in e)
        r[u] === void 0 && (r[u] = e[u]);
    }
    return r;
  }
  function rv(e) {
    $l(e);
  }
  function iv(e) {
    console.error(e);
  }
  function sv(e) {
    $l(e);
  }
  function oo(e, n) {
    try {
      var r = e.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function lv(e, n, r) {
    try {
      var s = e.onCaughtError;
      s(r.value, {
        componentStack: r.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Ju(e, n, r) {
    return r = Ka(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      oo(e, n);
    }, r;
  }
  function ov(e) {
    return e = Ka(e), e.tag = 3, e;
  }
  function cv(e, n, r, s) {
    var u = r.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = s.value;
      e.payload = function() {
        return u(f);
      }, e.callback = function() {
        lv(n, r, s);
      };
    }
    var x = r.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      lv(n, r, s), typeof u != "function" && (nr === null ? nr = /* @__PURE__ */ new Set([this]) : nr.add(this));
      var E = s.stack;
      this.componentDidCatch(s.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Iw(e, n, r, s, u) {
    if (r.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
      if (n = r.alternate, n !== null && vi(
        n,
        r,
        u,
        !0
      ), r = Nn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
            return qn === null ? So() : r.alternate === null && Nt === 0 && (Nt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = u, s === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([s]) : n.add(s), jd(e, s, u)), !1;
          case 22:
            return r.flags |= 65536, s === Kl ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([s])
            }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([s]) : r.add(s)), jd(e, s, u)), !1;
        }
        throw Error(l(435, r.tag));
      }
      return jd(e, s, u), So(), !1;
    }
    if (Ke)
      return n = Nn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, s !== gu && (e = Error(l(422), { cause: s }), vs(Bn(e, r)))) : (s !== gu && (n = Error(l(423), {
        cause: s
      }), vs(
        Bn(n, r)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, s = Bn(s, r), u = Ju(
        e.stateNode,
        s,
        u
      ), Ru(e, u), Nt !== 4 && (Nt = 2)), !1;
    var f = Error(l(520), { cause: s });
    if (f = Bn(f, r), Os === null ? Os = [f] : Os.push(f), Nt !== 4 && (Nt = 2), n === null) return !0;
    s = Bn(s, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, e = u & -u, r.lanes |= e, e = Ju(r.stateNode, s, e), Ru(r, e), !1;
        case 1:
          if (n = r.type, f = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (nr === null || !nr.has(f))))
            return r.flags |= 65536, u &= -u, r.lanes |= u, u = ov(u), cv(
              u,
              e,
              r,
              s
            ), Ru(r, u), !1;
      }
      r = r.return;
    } while (r !== null);
    return !1;
  }
  var Wu = Error(l(461)), Ut = !1;
  function nn(e, n, r, s) {
    n.child = e === null ? hp(n, null, r, s) : Br(
      n,
      e.child,
      r,
      s
    );
  }
  function uv(e, n, r, s, u) {
    r = r.render;
    var f = n.ref;
    if ("ref" in s) {
      var x = {};
      for (var E in s)
        E !== "ref" && (x[E] = s[E]);
    } else x = s;
    return kr(n), s = ku(
      e,
      n,
      r,
      x,
      f,
      u
    ), E = Ou(), e !== null && !Ut ? (Lu(e, n, u), Ca(e, n, u)) : (Ke && E && pu(n), n.flags |= 1, nn(e, n, s, u), n.child);
  }
  function dv(e, n, r, s, u) {
    if (e === null) {
      var f = r.type;
      return typeof f == "function" && !fu(f) && f.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = f, fv(
        e,
        n,
        f,
        s,
        u
      )) : (e = Il(
        r.type,
        null,
        s,
        n,
        n.mode,
        u
      ), e.ref = n.ref, e.return = n, n.child = e);
    }
    if (f = e.child, !ld(e, u)) {
      var x = f.memoizedProps;
      if (r = r.compare, r = r !== null ? r : hs, r(x, s) && e.ref === n.ref)
        return Ca(e, n, u);
    }
    return n.flags |= 1, e = Sa(f, s), e.ref = n.ref, e.return = n, n.child = e;
  }
  function fv(e, n, r, s, u) {
    if (e !== null) {
      var f = e.memoizedProps;
      if (hs(f, s) && e.ref === n.ref)
        if (Ut = !1, n.pendingProps = s = f, ld(e, u))
          (e.flags & 131072) !== 0 && (Ut = !0);
        else
          return n.lanes = e.lanes, Ca(e, n, u);
    }
    return ed(
      e,
      n,
      r,
      s,
      u
    );
  }
  function hv(e, n, r, s) {
    var u = s.children, f = e !== null ? e.memoizedState : null;
    if (e === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), s.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (f = f !== null ? f.baseLanes | r : r, e !== null) {
          for (s = n.child = e.child, u = 0; s !== null; )
            u = u | s.lanes | s.childLanes, s = s.sibling;
          s = u & ~f;
        } else s = 0, n.child = null;
        return mv(
          e,
          n,
          f,
          r,
          s
        );
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Xl(
          n,
          f !== null ? f.cachePool : null
        ), f !== null ? vp(n, f) : _u(), gp(n);
      else
        return s = n.lanes = 536870912, mv(
          e,
          n,
          f !== null ? f.baseLanes | r : r,
          r,
          s
        );
    } else
      f !== null ? (Xl(n, f.cachePool), vp(n, f), Ja(), n.memoizedState = null) : (e !== null && Xl(n, null), _u(), Ja());
    return nn(e, n, u, r), n.child;
  }
  function Rs(e, n) {
    return e !== null && e.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function mv(e, n, r, s, u) {
    var f = Eu();
    return f = f === null ? null : { parent: Ot._currentValue, pool: f }, n.memoizedState = {
      baseLanes: r,
      cachePool: f
    }, e !== null && Xl(n, null), _u(), gp(n), e !== null && vi(e, n, s, !0), n.childLanes = u, null;
  }
  function co(e, n) {
    return n = fo(
      { mode: n.mode, children: n.children },
      e.mode
    ), n.ref = e.ref, e.child = n, n.return = e, n;
  }
  function pv(e, n, r) {
    return Br(n, e.child, null, r), e = co(n, n.pendingProps), e.flags |= 2, Tn(n), n.memoizedState = null, e;
  }
  function Fw(e, n, r) {
    var s = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, e === null) {
      if (Ke) {
        if (s.mode === "hidden")
          return e = co(n, s), n.lanes = 536870912, Rs(null, e);
        if (Du(n), (e = gt) ? (e = Cg(
          e,
          Hn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Jm(e), r.return = n, n.child = r, en = n, gt = null)) : e = null, e === null) throw Ga(n);
        return n.lanes = 536870912, null;
      }
      return co(n, s);
    }
    var f = e.memoizedState;
    if (f !== null) {
      var x = f.dehydrated;
      if (Du(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = pv(
            e,
            n,
            r
          );
        else if (n.memoizedState !== null)
          n.child = e.child, n.flags |= 128, n = null;
        else throw Error(l(558));
      else if (Ut || vi(e, n, r, !1), u = (r & e.childLanes) !== 0, Ut || u) {
        if (s = ft, s !== null && (x = z(s, r), x !== 0 && x !== f.retryLane))
          throw f.retryLane = x, _r(e, x), bn(s, e, x), Wu;
        So(), n = pv(
          e,
          n,
          r
        );
      } else
        e = f.treeContext, gt = In(x.nextSibling), en = n, Ke = !0, Ya = null, Hn = !1, e !== null && tp(n, e), n = co(n, s), n.flags |= 4096;
      return n;
    }
    return e = Sa(e.child, {
      mode: s.mode,
      children: s.children
    }), e.ref = n.ref, n.child = e, e.return = n, e;
  }
  function uo(e, n) {
    var r = n.ref;
    if (r === null)
      e !== null && e.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(l(284));
      (e === null || e.ref !== r) && (n.flags |= 4194816);
    }
  }
  function ed(e, n, r, s, u) {
    return kr(n), r = ku(
      e,
      n,
      r,
      s,
      void 0,
      u
    ), s = Ou(), e !== null && !Ut ? (Lu(e, n, u), Ca(e, n, u)) : (Ke && s && pu(n), n.flags |= 1, nn(e, n, r, u), n.child);
  }
  function vv(e, n, r, s, u, f) {
    return kr(n), n.updateQueue = null, r = bp(
      n,
      s,
      r,
      u
    ), yp(e), s = Ou(), e !== null && !Ut ? (Lu(e, n, f), Ca(e, n, f)) : (Ke && s && pu(n), n.flags |= 1, nn(e, n, r, f), n.child);
  }
  function gv(e, n, r, s, u) {
    if (kr(n), n.stateNode === null) {
      var f = fi, x = r.contextType;
      typeof x == "object" && x !== null && (f = tn(x)), f = new r(s, f), n.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Zu, n.stateNode = f, f._reactInternals = n, f = n.stateNode, f.props = s, f.state = n.memoizedState, f.refs = {}, Tu(n), x = r.contextType, f.context = typeof x == "object" && x !== null ? tn(x) : fi, f.state = n.memoizedState, x = r.getDerivedStateFromProps, typeof x == "function" && (Qu(
        n,
        r,
        x,
        s
      ), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (x = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), x !== f.state && Zu.enqueueReplaceState(f, f.state, null), js(n, s, f, u), ws(), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !0;
    } else if (e === null) {
      f = n.stateNode;
      var E = n.memoizedProps, L = Vr(r, E);
      f.props = L;
      var P = f.context, ae = r.contextType;
      x = fi, typeof ae == "object" && ae !== null && (x = tn(ae));
      var oe = r.getDerivedStateFromProps;
      ae = typeof oe == "function" || typeof f.getSnapshotBeforeUpdate == "function", E = n.pendingProps !== E, ae || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (E || P !== x) && av(
        n,
        f,
        s,
        x
      ), Pa = !1;
      var Q = n.memoizedState;
      f.state = Q, js(n, s, f, u), ws(), P = n.memoizedState, E || Q !== P || Pa ? (typeof oe == "function" && (Qu(
        n,
        r,
        oe,
        s
      ), P = n.memoizedState), (L = Pa || nv(
        n,
        r,
        L,
        s,
        Q,
        P,
        x
      )) ? (ae || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = s, n.memoizedState = P), f.props = s, f.state = P, f.context = x, s = L) : (typeof f.componentDidMount == "function" && (n.flags |= 4194308), s = !1);
    } else {
      f = n.stateNode, Cu(e, n), x = n.memoizedProps, ae = Vr(r, x), f.props = ae, oe = n.pendingProps, Q = f.context, P = r.contextType, L = fi, typeof P == "object" && P !== null && (L = tn(P)), E = r.getDerivedStateFromProps, (P = typeof E == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (x !== oe || Q !== L) && av(
        n,
        f,
        s,
        L
      ), Pa = !1, Q = n.memoizedState, f.state = Q, js(n, s, f, u), ws();
      var ee = n.memoizedState;
      x !== oe || Q !== ee || Pa || e !== null && e.dependencies !== null && Yl(e.dependencies) ? (typeof E == "function" && (Qu(
        n,
        r,
        E,
        s
      ), ee = n.memoizedState), (ae = Pa || nv(
        n,
        r,
        ae,
        s,
        Q,
        ee,
        L
      ) || e !== null && e.dependencies !== null && Yl(e.dependencies)) ? (P || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(s, ee, L), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
        s,
        ee,
        L
      )), typeof f.componentDidUpdate == "function" && (n.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && Q === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && Q === e.memoizedState || (n.flags |= 1024), n.memoizedProps = s, n.memoizedState = ee), f.props = s, f.state = ee, f.context = L, s = ae) : (typeof f.componentDidUpdate != "function" || x === e.memoizedProps && Q === e.memoizedState || (n.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && Q === e.memoizedState || (n.flags |= 1024), s = !1);
    }
    return f = s, uo(e, n), s = (n.flags & 128) !== 0, f || s ? (f = n.stateNode, r = s && typeof r.getDerivedStateFromError != "function" ? null : f.render(), n.flags |= 1, e !== null && s ? (n.child = Br(
      n,
      e.child,
      null,
      u
    ), n.child = Br(
      n,
      null,
      r,
      u
    )) : nn(e, n, r, u), n.memoizedState = f.state, e = n.child) : e = Ca(
      e,
      n,
      u
    ), e;
  }
  function yv(e, n, r, s) {
    return Dr(), n.flags |= 256, nn(e, n, r, s), n.child;
  }
  var td = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function nd(e) {
    return { baseLanes: e, cachePool: lp() };
  }
  function ad(e, n, r) {
    return e = e !== null ? e.childLanes & ~r : 0, n && (e |= Rn), e;
  }
  function bv(e, n, r) {
    var s = n.pendingProps, u = !1, f = (n.flags & 128) !== 0, x;
    if ((x = f) || (x = e !== null && e.memoizedState === null ? !1 : (Rt.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, e === null) {
      if (Ke) {
        if (u ? Za(n) : Ja(), (e = gt) ? (e = Cg(
          e,
          Hn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (n.memoizedState = {
          dehydrated: e,
          treeContext: Fa !== null ? { id: ua, overflow: da } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, r = Jm(e), r.return = n, n.child = r, en = n, gt = null)) : e = null, e === null) throw Ga(n);
        return $d(e) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var E = s.children;
      return s = s.fallback, u ? (Ja(), u = n.mode, E = fo(
        { mode: "hidden", children: E },
        u
      ), s = Ar(
        s,
        u,
        r,
        null
      ), E.return = n, s.return = n, E.sibling = s, n.child = E, s = n.child, s.memoizedState = nd(r), s.childLanes = ad(
        e,
        x,
        r
      ), n.memoizedState = td, Rs(null, s)) : (Za(n), rd(n, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (f)
        n.flags & 256 ? (Za(n), n.flags &= -257, n = id(
          e,
          n,
          r
        )) : n.memoizedState !== null ? (Ja(), n.child = e.child, n.flags |= 128, n = null) : (Ja(), E = s.fallback, u = n.mode, s = fo(
          { mode: "visible", children: s.children },
          u
        ), E = Ar(
          E,
          u,
          r,
          null
        ), E.flags |= 2, s.return = n, E.return = n, s.sibling = E, n.child = s, Br(
          n,
          e.child,
          null,
          r
        ), s = n.child, s.memoizedState = nd(r), s.childLanes = ad(
          e,
          x,
          r
        ), n.memoizedState = td, n = Rs(null, s));
      else if (Za(n), $d(E)) {
        if (x = E.nextSibling && E.nextSibling.dataset, x) var P = x.dgst;
        x = P, s = Error(l(419)), s.stack = "", s.digest = x, vs({ value: s, source: null, stack: null }), n = id(
          e,
          n,
          r
        );
      } else if (Ut || vi(e, n, r, !1), x = (r & e.childLanes) !== 0, Ut || x) {
        if (x = ft, x !== null && (s = z(x, r), s !== 0 && s !== L.retryLane))
          throw L.retryLane = s, _r(e, s), bn(x, e, s), Wu;
        Bd(E) || So(), n = id(
          e,
          n,
          r
        );
      } else
        Bd(E) ? (n.flags |= 192, n.child = e.child, n = null) : (e = L.treeContext, gt = In(
          E.nextSibling
        ), en = n, Ke = !0, Ya = null, Hn = !1, e !== null && tp(n, e), n = rd(
          n,
          s.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (Ja(), E = s.fallback, u = n.mode, L = e.child, P = L.sibling, s = Sa(L, {
      mode: "hidden",
      children: s.children
    }), s.subtreeFlags = L.subtreeFlags & 65011712, P !== null ? E = Sa(
      P,
      E
    ) : (E = Ar(
      E,
      u,
      r,
      null
    ), E.flags |= 2), E.return = n, s.return = n, s.sibling = E, n.child = s, Rs(null, s), s = n.child, E = e.child.memoizedState, E === null ? E = nd(r) : (u = E.cachePool, u !== null ? (L = Ot._currentValue, u = u.parent !== L ? { parent: L, pool: L } : u) : u = lp(), E = {
      baseLanes: E.baseLanes | r,
      cachePool: u
    }), s.memoizedState = E, s.childLanes = ad(
      e,
      x,
      r
    ), n.memoizedState = td, Rs(e.child, s)) : (Za(n), r = e.child, e = r.sibling, r = Sa(r, {
      mode: "visible",
      children: s.children
    }), r.return = n, r.sibling = null, e !== null && (x = n.deletions, x === null ? (n.deletions = [e], n.flags |= 16) : x.push(e)), n.child = r, n.memoizedState = null, r);
  }
  function rd(e, n) {
    return n = fo(
      { mode: "visible", children: n },
      e.mode
    ), n.return = e, e.child = n;
  }
  function fo(e, n) {
    return e = En(22, e, null, n), e.lanes = 0, e;
  }
  function id(e, n, r) {
    return Br(n, e.child, null, r), e = rd(
      n,
      n.pendingProps.children
    ), e.flags |= 2, n.memoizedState = null, e;
  }
  function xv(e, n, r) {
    e.lanes |= n;
    var s = e.alternate;
    s !== null && (s.lanes |= n), xu(e.return, n, r);
  }
  function sd(e, n, r, s, u, f) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: s,
      tail: r,
      tailMode: u,
      treeForkCount: f
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = s, x.tail = r, x.tailMode = u, x.treeForkCount = f);
  }
  function Sv(e, n, r) {
    var s = n.pendingProps, u = s.revealOrder, f = s.tail;
    s = s.children;
    var x = Rt.current, E = (x & 2) !== 0;
    if (E ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, K(Rt, x), nn(e, n, s, r), s = Ke ? ps : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && xv(e, r, n);
        else if (e.tag === 19)
          xv(e, r, n);
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
    switch (u) {
      case "forwards":
        for (r = n.child, u = null; r !== null; )
          e = r.alternate, e !== null && Wl(e) === null && (u = r), r = r.sibling;
        r = u, r === null ? (u = n.child, n.child = null) : (u = r.sibling, r.sibling = null), sd(
          n,
          !1,
          u,
          r,
          f,
          s
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (r = null, u = n.child, n.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Wl(e) === null) {
            n.child = u;
            break;
          }
          e = u.sibling, u.sibling = r, r = u, u = e;
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
  function Ca(e, n, r) {
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
      for (e = n.child, r = Sa(e, e.pendingProps), n.child = r, r.return = n; e.sibling !== null; )
        e = e.sibling, r = r.sibling = Sa(e, e.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function ld(e, n) {
    return (e.lanes & n) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Yl(e)));
  }
  function Yw(e, n, r) {
    switch (n.tag) {
      case 3:
        Me(n, n.stateNode.containerInfo), Xa(n, Ot, e.memoizedState.cache), Dr();
        break;
      case 27:
      case 5:
        Zt(n);
        break;
      case 4:
        Me(n, n.stateNode.containerInfo);
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
          return s.dehydrated !== null ? (Za(n), n.flags |= 128, null) : (r & n.child.childLanes) !== 0 ? bv(e, n, r) : (Za(n), e = Ca(
            e,
            n,
            r
          ), e !== null ? e.sibling : null);
        Za(n);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (s = (r & n.childLanes) !== 0, s || (vi(
          e,
          n,
          r,
          !1
        ), s = (r & n.childLanes) !== 0), u) {
          if (s)
            return Sv(
              e,
              n,
              r
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), K(Rt, Rt.current), s) break;
        return null;
      case 22:
        return n.lanes = 0, hv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        Xa(n, Ot, e.memoizedState.cache);
    }
    return Ca(e, n, r);
  }
  function wv(e, n, r) {
    if (e !== null)
      if (e.memoizedProps !== n.pendingProps)
        Ut = !0;
      else {
        if (!ld(e, r) && (n.flags & 128) === 0)
          return Ut = !1, Yw(
            e,
            n,
            r
          );
        Ut = (e.flags & 131072) !== 0;
      }
    else
      Ut = !1, Ke && (n.flags & 1048576) !== 0 && ep(n, ps, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var s = n.pendingProps;
          if (e = Lr(n.elementType), n.type = e, typeof e == "function")
            fu(e) ? (s = Vr(e, s), n.tag = 1, n = gv(
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
              var u = e.$$typeof;
              if (u === C) {
                n.tag = 11, n = uv(
                  null,
                  n,
                  e,
                  s,
                  r
                );
                break e;
              } else if (u === ne) {
                n.tag = 14, n = dv(
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
        return s = n.type, u = Vr(
          s,
          n.pendingProps
        ), gv(
          e,
          n,
          s,
          u,
          r
        );
      case 3:
        e: {
          if (Me(
            n,
            n.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          s = n.pendingProps;
          var f = n.memoizedState;
          u = f.element, Cu(e, n), js(n, s, null, r);
          var x = n.memoizedState;
          if (s = x.cache, Xa(n, Ot, s), s !== f.cache && Su(
            n,
            [Ot],
            r,
            !0
          ), ws(), s = x.element, f.isDehydrated)
            if (f = {
              element: s,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = f, n.memoizedState = f, n.flags & 256) {
              n = yv(
                e,
                n,
                s,
                r
              );
              break e;
            } else if (s !== u) {
              u = Bn(
                Error(l(424)),
                n
              ), vs(u), n = yv(
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
              for (gt = In(e.firstChild), en = n, Ke = !0, Ya = null, Hn = !0, r = hp(
                n,
                null,
                s,
                r
              ), n.child = r; r; )
                r.flags = r.flags & -3 | 4096, r = r.sibling;
            }
          else {
            if (Dr(), s === u) {
              n = Ca(
                e,
                n,
                r
              );
              break e;
            }
            nn(e, n, s, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return uo(e, n), e === null ? (r = zg(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = r : Ke || (r = n.type, e = n.pendingProps, s = Ro(
          ge.current
        ).createElement(r), s[pe] = n, s[ve] = e, an(s, r, e), mt(s), n.stateNode = s) : n.memoizedState = zg(
          n.type,
          e.memoizedProps,
          n.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Zt(n), e === null && Ke && (s = n.stateNode = _g(
          n.type,
          n.pendingProps,
          ge.current
        ), en = n, Hn = !0, u = gt, sr(n.type) ? (Vd = u, gt = In(s.firstChild)) : gt = u), nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), uo(e, n), e === null && (n.flags |= 4194304), n.child;
      case 5:
        return e === null && Ke && ((u = s = gt) && (s = Sj(
          s,
          n.type,
          n.pendingProps,
          Hn
        ), s !== null ? (n.stateNode = s, en = n, gt = In(s.firstChild), Hn = !1, u = !0) : u = !1), u || Ga(n)), Zt(n), u = n.type, f = n.pendingProps, x = e !== null ? e.memoizedProps : null, s = f.children, Od(u, f) ? s = null : x !== null && Od(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = ku(
          e,
          n,
          Lw,
          null,
          null,
          r
        ), Is._currentValue = u), uo(e, n), nn(e, n, s, r), n.child;
      case 6:
        return e === null && Ke && ((e = r = gt) && (r = wj(
          r,
          n.pendingProps,
          Hn
        ), r !== null ? (n.stateNode = r, en = n, gt = null, e = !0) : e = !1), e || Ga(n)), null;
      case 13:
        return bv(e, n, r);
      case 4:
        return Me(
          n,
          n.stateNode.containerInfo
        ), s = n.pendingProps, e === null ? n.child = Br(
          n,
          null,
          s,
          r
        ) : nn(e, n, s, r), n.child;
      case 11:
        return uv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 7:
        return nn(
          e,
          n,
          n.pendingProps,
          r
        ), n.child;
      case 8:
        return nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 12:
        return nn(
          e,
          n,
          n.pendingProps.children,
          r
        ), n.child;
      case 10:
        return s = n.pendingProps, Xa(n, n.type, s.value), nn(e, n, s.children, r), n.child;
      case 9:
        return u = n.type._context, s = n.pendingProps.children, kr(n), u = tn(u), s = s(u), n.flags |= 1, nn(e, n, s, r), n.child;
      case 14:
        return dv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 15:
        return fv(
          e,
          n,
          n.type,
          n.pendingProps,
          r
        );
      case 19:
        return Sv(e, n, r);
      case 31:
        return Fw(e, n, r);
      case 22:
        return hv(
          e,
          n,
          r,
          n.pendingProps
        );
      case 24:
        return kr(n), s = tn(Ot), e === null ? (u = Eu(), u === null && (u = ft, f = wu(), u.pooledCache = f, f.refCount++, f !== null && (u.pooledCacheLanes |= r), u = f), n.memoizedState = { parent: s, cache: u }, Tu(n), Xa(n, Ot, u)) : ((e.lanes & r) !== 0 && (Cu(e, n), js(n, null, null, r), ws()), u = e.memoizedState, f = n.memoizedState, u.parent !== s ? (u = { parent: s, cache: s }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Xa(n, Ot, s)) : (s = f.cache, Xa(n, Ot, s), s !== u.cache && Su(
          n,
          [Ot],
          r,
          !0
        ))), nn(
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
  function Ra(e) {
    e.flags |= 4;
  }
  function od(e, n, r, s, u) {
    if ((n = (e.mode & 32) !== 0) && (n = !1), n) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Kv()) e.flags |= 8192;
        else
          throw Ur = Kl, Nu;
    } else e.flags &= -16777217;
  }
  function jv(e, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Bg(n))
      if (Kv()) e.flags |= 8192;
      else
        throw Ur = Kl, Nu;
  }
  function ho(e, n) {
    n !== null && (e.flags |= 4), e.flags & 16384 && (n = e.tag !== 22 ? Gt() : 536870912, e.lanes |= n, Ri |= n);
  }
  function Ms(e, n) {
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
      for (var u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, s |= u.subtreeFlags & 65011712, s |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        r |= u.lanes | u.childLanes, s |= u.subtreeFlags, s |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= s, e.childLanes = r, n;
  }
  function Gw(e, n, r) {
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
        return r = n.stateNode, s = null, e !== null && (s = e.memoizedState.cache), n.memoizedState.cache !== s && (n.flags |= 2048), Ea(Ot), Ve(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pi(n) ? Ra(n) : e === null || e.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, yu())), yt(n), null;
      case 26:
        var u = n.type, f = n.memoizedState;
        return e === null ? (Ra(n), f !== null ? (yt(n), jv(n, f)) : (yt(n), od(
          n,
          u,
          null,
          s,
          r
        ))) : f ? f !== e.memoizedState ? (Ra(n), yt(n), jv(n, f)) : (yt(n), n.flags &= -16777217) : (e = e.memoizedProps, e !== s && Ra(n), yt(n), od(
          n,
          u,
          e,
          s,
          r
        )), null;
      case 27:
        if (Pt(n), r = ge.current, u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ra(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          e = le.current, pi(n) ? np(n) : (e = _g(u, s, r), n.stateNode = e, Ra(n));
        }
        return yt(n), null;
      case 5:
        if (Pt(n), u = n.type, e !== null && n.stateNode != null)
          e.memoizedProps !== s && Ra(n);
        else {
          if (!s) {
            if (n.stateNode === null)
              throw Error(l(166));
            return yt(n), null;
          }
          if (f = le.current, pi(n))
            np(n);
          else {
            var x = Ro(
              ge.current
            );
            switch (f) {
              case 1:
                f = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                f = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    f = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    f = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
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
                    f = typeof s.is == "string" ? x.createElement(u, { is: s.is }) : x.createElement(u);
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
            e: switch (an(f, u, s), u) {
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
            s && Ra(n);
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
          e.memoizedProps !== s && Ra(n);
        else {
          if (typeof s != "string" && n.stateNode === null)
            throw Error(l(166));
          if (e = ge.current, pi(n)) {
            if (e = n.stateNode, r = n.memoizedProps, s = null, u = en, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  s = u.memoizedProps;
              }
            e[pe] = n, e = !!(e.nodeValue === r || s !== null && s.suppressHydrationWarning === !0 || bg(e.nodeValue, r)), e || Ga(n, !0);
          } else
            e = Ro(e).createTextNode(
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
          if (u = pi(n), s !== null && s.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(l(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(l(317));
              u[pe] = n;
            } else
              Dr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            yt(n), u = !1;
          } else
            u = yu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        return Tn(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = s !== null, e = e !== null && e.memoizedState !== null, r && (s = n.child, u = null, s.alternate !== null && s.alternate.memoizedState !== null && s.alternate.memoizedState.cachePool !== null && (u = s.alternate.memoizedState.cachePool.pool), f = null, s.memoizedState !== null && s.memoizedState.cachePool !== null && (f = s.memoizedState.cachePool.pool), f !== u && (s.flags |= 2048)), r !== e && r && (n.child.flags |= 8192), ho(n, n.updateQueue), yt(n), null);
      case 4:
        return Ve(), e === null && _d(n.stateNode.containerInfo), yt(n), null;
      case 10:
        return Ea(n.type), yt(n), null;
      case 19:
        if (J(Rt), s = n.memoizedState, s === null) return yt(n), null;
        if (u = (n.flags & 128) !== 0, f = s.rendering, f === null)
          if (u) Ms(s, !1);
          else {
            if (Nt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = n.child; e !== null; ) {
                if (f = Wl(e), f !== null) {
                  for (n.flags |= 128, Ms(s, !1), e = f.updateQueue, n.updateQueue = e, ho(n, e), n.subtreeFlags = 0, e = r, r = n.child; r !== null; )
                    Zm(r, e), r = r.sibling;
                  return K(
                    Rt,
                    Rt.current & 1 | 2
                  ), Ke && wa(n, s.treeForkCount), n.child;
                }
                e = e.sibling;
              }
            s.tail !== null && qt() > yo && (n.flags |= 128, u = !0, Ms(s, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Wl(f), e !== null) {
              if (n.flags |= 128, u = !0, e = e.updateQueue, n.updateQueue = e, ho(n, e), Ms(s, !0), s.tail === null && s.tailMode === "hidden" && !f.alternate && !Ke)
                return yt(n), null;
            } else
              2 * qt() - s.renderingStartTime > yo && r !== 536870912 && (n.flags |= 128, u = !0, Ms(s, !1), n.lanes = 4194304);
          s.isBackwards ? (f.sibling = n.child, n.child = f) : (e = s.last, e !== null ? e.sibling = f : n.child = f, s.last = f);
        }
        return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = qt(), e.sibling = null, r = Rt.current, K(
          Rt,
          u ? r & 1 | 2 : r & 1
        ), Ke && wa(n, s.treeForkCount), e) : (yt(n), null);
      case 22:
      case 23:
        return Tn(n), Au(), s = n.memoizedState !== null, e !== null ? e.memoizedState !== null !== s && (n.flags |= 8192) : s && (n.flags |= 8192), s ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (yt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : yt(n), r = n.updateQueue, r !== null && ho(n, r.retryQueue), r = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), s = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (s = n.memoizedState.cachePool.pool), s !== r && (n.flags |= 2048), e !== null && J(Or), null;
      case 24:
        return r = null, e !== null && (r = e.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), Ea(Ot), yt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, n.tag));
  }
  function Xw(e, n) {
    switch (vu(n), n.tag) {
      case 1:
        return e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 3:
        return Ea(Ot), Ve(), e = n.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (n.flags = e & -65537 | 128, n) : null;
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
        return J(Rt), null;
      case 4:
        return Ve(), null;
      case 10:
        return Ea(n.type), null;
      case 22:
      case 23:
        return Tn(n), Au(), e !== null && J(Or), e = n.flags, e & 65536 ? (n.flags = e & -65537 | 128, n) : null;
      case 24:
        return Ea(Ot), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ev(e, n) {
    switch (vu(n), n.tag) {
      case 3:
        Ea(Ot), Ve();
        break;
      case 26:
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        Ve();
        break;
      case 31:
        n.memoizedState !== null && Tn(n);
        break;
      case 13:
        Tn(n);
        break;
      case 19:
        J(Rt);
        break;
      case 10:
        Ea(n.type);
        break;
      case 22:
      case 23:
        Tn(n), Au(), e !== null && J(Or);
        break;
      case 24:
        Ea(Ot);
    }
  }
  function _s(e, n) {
    try {
      var r = n.updateQueue, s = r !== null ? r.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            s = void 0;
            var f = r.create, x = r.inst;
            s = f(), x.destroy = s;
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (E) {
      rt(n, n.return, E);
    }
  }
  function Wa(e, n, r) {
    try {
      var s = n.updateQueue, u = s !== null ? s.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            var x = s.inst, E = x.destroy;
            if (E !== void 0) {
              x.destroy = void 0, u = n;
              var L = r, P = E;
              try {
                P();
              } catch (ae) {
                rt(
                  u,
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
  function Nv(e) {
    var n = e.updateQueue;
    if (n !== null) {
      var r = e.stateNode;
      try {
        pp(n, r);
      } catch (s) {
        rt(e, e.return, s);
      }
    }
  }
  function Tv(e, n, r) {
    r.props = Vr(
      e.type,
      e.memoizedProps
    ), r.state = e.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (s) {
      rt(e, n, s);
    }
  }
  function As(e, n) {
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
    } catch (u) {
      rt(e, n, u);
    }
  }
  function fa(e, n) {
    var r = e.ref, s = e.refCleanup;
    if (r !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (u) {
          rt(e, n, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (u) {
          rt(e, n, u);
        }
      else r.current = null;
  }
  function Cv(e) {
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
    } catch (u) {
      rt(e, e.return, u);
    }
  }
  function cd(e, n, r) {
    try {
      var s = e.stateNode;
      pj(s, e.type, r, n), s[ve] = n;
    } catch (u) {
      rt(e, e.return, u);
    }
  }
  function Rv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && sr(e.type) || e.tag === 4;
  }
  function ud(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Rv(e.return)) return null;
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
      e = e.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(e, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(e), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = ba));
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode, n = null), e = e.child, e !== null))
      for (dd(e, n, r), e = e.sibling; e !== null; )
        dd(e, n, r), e = e.sibling;
  }
  function mo(e, n, r) {
    var s = e.tag;
    if (s === 5 || s === 6)
      e = e.stateNode, n ? r.insertBefore(e, n) : r.appendChild(e);
    else if (s !== 4 && (s === 27 && sr(e.type) && (r = e.stateNode), e = e.child, e !== null))
      for (mo(e, n, r), e = e.sibling; e !== null; )
        mo(e, n, r), e = e.sibling;
  }
  function Mv(e) {
    var n = e.stateNode, r = e.memoizedProps;
    try {
      for (var s = e.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      an(n, s, r), n[pe] = e, n[ve] = r;
    } catch (f) {
      rt(e, e.return, f);
    }
  }
  var Ma = !1, Bt = !1, fd = !1, _v = typeof WeakSet == "function" ? WeakSet : Set, Qt = null;
  function Pw(e, n) {
    if (e = e.containerInfo, zd = Oo, e = qm(e), iu(e)) {
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
            var u = s.anchorOffset, f = s.focusNode;
            s = s.focusOffset;
            try {
              r.nodeType, f.nodeType;
            } catch {
              r = null;
              break e;
            }
            var x = 0, E = -1, L = -1, P = 0, ae = 0, oe = e, Q = null;
            t: for (; ; ) {
              for (var ee; oe !== r || u !== 0 && oe.nodeType !== 3 || (E = x + u), oe !== f || s !== 0 && oe.nodeType !== 3 || (L = x + s), oe.nodeType === 3 && (x += oe.nodeValue.length), (ee = oe.firstChild) !== null; )
                Q = oe, oe = ee;
              for (; ; ) {
                if (oe === e) break t;
                if (Q === r && ++P === u && (E = x), Q === f && ++ae === s && (L = x), (ee = oe.nextSibling) !== null) break;
                oe = Q, Q = oe.parentNode;
              }
              oe = ee;
            }
            r = E === -1 || L === -1 ? null : { start: E, end: L };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (kd = { focusedElem: e, selectionRange: r }, Oo = !1, Qt = n; Qt !== null; )
      if (n = Qt, e = n.child, (n.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = n, Qt = e;
      else
        for (; Qt !== null; ) {
          switch (n = Qt, f = n.alternate, e = n.flags, n.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = n.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (r = 0; r < e.length; r++)
                  u = e[r], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && f !== null) {
                e = void 0, r = n, u = f.memoizedProps, f = f.memoizedState, s = r.stateNode;
                try {
                  var xe = Vr(
                    r.type,
                    u
                  );
                  e = s.getSnapshotBeforeUpdate(
                    xe,
                    f
                  ), s.__reactInternalSnapshotBeforeUpdate = e;
                } catch (_e) {
                  rt(
                    r,
                    r.return,
                    _e
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
  function Av(e, n, r) {
    var s = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        Aa(e, r), s & 4 && _s(5, r);
        break;
      case 1:
        if (Aa(e, r), s & 4)
          if (e = r.stateNode, n === null)
            try {
              e.componentDidMount();
            } catch (x) {
              rt(r, r.return, x);
            }
          else {
            var u = Vr(
              r.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              e.componentDidUpdate(
                u,
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
        s & 64 && Nv(r), s & 512 && As(r, r.return);
        break;
      case 3:
        if (Aa(e, r), s & 64 && (e = r.updateQueue, e !== null)) {
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
            pp(e, n);
          } catch (x) {
            rt(r, r.return, x);
          }
        }
        break;
      case 27:
        n === null && s & 4 && Mv(r);
      case 26:
      case 5:
        Aa(e, r), n === null && s & 4 && Cv(r), s & 512 && As(r, r.return);
        break;
      case 12:
        Aa(e, r);
        break;
      case 31:
        Aa(e, r), s & 4 && kv(e, r);
        break;
      case 13:
        Aa(e, r), s & 4 && Ov(e, r), s & 64 && (e = r.memoizedState, e !== null && (e = e.dehydrated, e !== null && (r = aj.bind(
          null,
          r
        ), jj(e, r))));
        break;
      case 22:
        if (s = r.memoizedState !== null || Ma, !s) {
          n = n !== null && n.memoizedState !== null || Bt, u = Ma;
          var f = Bt;
          Ma = s, (Bt = n) && !f ? Da(
            e,
            r,
            (r.subtreeFlags & 8772) !== 0
          ) : Aa(e, r), Ma = u, Bt = f;
        }
        break;
      case 30:
        break;
      default:
        Aa(e, r);
    }
  }
  function Dv(e) {
    var n = e.alternate;
    n !== null && (e.alternate = null, Dv(n)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (n = e.stateNode, n !== null && dt(n)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var wt = null, pn = !1;
  function _a(e, n, r) {
    for (r = r.child; r !== null; )
      zv(e, n, r), r = r.sibling;
  }
  function zv(e, n, r) {
    if (Jt && typeof Jt.onCommitFiberUnmount == "function")
      try {
        Jt.onCommitFiberUnmount(Zn, r);
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
        var s = wt, u = pn;
        sr(r.type) && (wt = r.stateNode, pn = !1), _a(
          e,
          n,
          r
        ), Vs(r.stateNode), wt = s, pn = u;
        break;
      case 5:
        Bt || fa(r, n);
      case 6:
        if (s = wt, u = pn, wt = null, _a(
          e,
          n,
          r
        ), wt = s, pn = u, wt !== null)
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
        wt !== null && (pn ? (e = wt, Ng(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          r.stateNode
        ), Li(e)) : Ng(wt, r.stateNode));
        break;
      case 4:
        s = wt, u = pn, wt = r.stateNode.containerInfo, pn = !0, _a(
          e,
          n,
          r
        ), wt = s, pn = u;
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
        Bt || (fa(r, n), s = r.stateNode, typeof s.componentWillUnmount == "function" && Tv(
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
  function kv(e, n) {
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
  function Kw(e) {
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
  function po(e, n) {
    var r = Kw(e);
    n.forEach(function(s) {
      if (!r.has(s)) {
        r.add(s);
        var u = rj.bind(null, e, s);
        s.then(u, u);
      }
    });
  }
  function vn(e, n) {
    var r = n.deletions;
    if (r !== null)
      for (var s = 0; s < r.length; s++) {
        var u = r[s], f = e, x = n, E = x;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (sr(E.type)) {
                wt = E.stateNode, pn = !1;
                break e;
              }
              break;
            case 5:
              wt = E.stateNode, pn = !1;
              break e;
            case 3:
            case 4:
              wt = E.stateNode.containerInfo, pn = !0;
              break e;
          }
          E = E.return;
        }
        if (wt === null) throw Error(l(160));
        zv(f, x, u), wt = null, pn = !1, f = u.alternate, f !== null && (f.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Lv(n, e), n = n.sibling;
  }
  var ta = null;
  function Lv(e, n) {
    var r = e.alternate, s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vn(n, e), gn(e), s & 4 && (Wa(3, e, e.return), _s(3, e), Wa(5, e, e.return));
        break;
      case 1:
        vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 64 && Ma && (e = e.updateQueue, e !== null && (s = e.callbacks, s !== null && (r = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = r === null ? s : r.concat(s))));
        break;
      case 26:
        var u = ta;
        if (vn(n, e), gn(e), s & 512 && (Bt || r === null || fa(r, r.return)), s & 4) {
          var f = r !== null ? r.memoizedState : null;
          if (s = e.memoizedState, r === null)
            if (s === null)
              if (e.stateNode === null) {
                e: {
                  s = e.type, r = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (s) {
                    case "title":
                      f = u.getElementsByTagName("title")[0], (!f || f[He] || f[pe] || f.namespaceURI === "http://www.w3.org/2000/svg" || f.hasAttribute("itemprop")) && (f = u.createElement(s), u.head.insertBefore(
                        f,
                        u.querySelector("head > title")
                      )), an(f, s, r), f[pe] = e, mt(f), s = f;
                      break e;
                    case "link":
                      var x = Lg(
                        "link",
                        "href",
                        u
                      ).get(s + (r.href || ""));
                      if (x) {
                        for (var E = 0; E < x.length; E++)
                          if (f = x[E], f.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && f.getAttribute("rel") === (r.rel == null ? null : r.rel) && f.getAttribute("title") === (r.title == null ? null : r.title) && f.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), an(f, s, r), u.head.appendChild(f);
                      break;
                    case "meta":
                      if (x = Lg(
                        "meta",
                        "content",
                        u
                      ).get(s + (r.content || ""))) {
                        for (E = 0; E < x.length; E++)
                          if (f = x[E], f.getAttribute("content") === (r.content == null ? null : "" + r.content) && f.getAttribute("name") === (r.name == null ? null : r.name) && f.getAttribute("property") === (r.property == null ? null : r.property) && f.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && f.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                            x.splice(E, 1);
                            break t;
                          }
                      }
                      f = u.createElement(s), an(f, s, r), u.head.appendChild(f);
                      break;
                    default:
                      throw Error(l(468, s));
                  }
                  f[pe] = e, mt(f), s = f;
                }
                e.stateNode = s;
              } else
                Ug(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Og(
                u,
                s,
                e.memoizedProps
              );
          else
            f !== s ? (f === null ? r.stateNode !== null && (r = r.stateNode, r.parentNode.removeChild(r)) : f.count--, s === null ? Ug(
              u,
              e.type,
              e.stateNode
            ) : Og(
              u,
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
          u = e.stateNode;
          try {
            ii(u, "");
          } catch (xe) {
            rt(e, e.return, xe);
          }
        }
        s & 4 && e.stateNode != null && (u = e.memoizedProps, cd(
          e,
          u,
          r !== null ? r.memoizedProps : u
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
        if (Ao = null, u = ta, ta = Mo(n.containerInfo), vn(n, e), ta = u, gn(e), s & 4 && r !== null && r.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (xe) {
            rt(e, e.return, xe);
          }
        fd && (fd = !1, Uv(e));
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
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, po(e, s)));
        break;
      case 13:
        vn(n, e), gn(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (go = qt()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, po(e, s)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var L = r !== null && r.memoizedState !== null, P = Ma, ae = Bt;
        if (Ma = P || u, Bt = ae || L, vn(n, e), Bt = ae, Ma = P, gn(e), s & 8192)
          e: for (n = e.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (r === null || L || Ma || Bt || Hr(e)), r = null, n = e; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (r === null) {
                L = r = n;
                try {
                  if (f = L.stateNode, u)
                    x = f.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    E = L.stateNode;
                    var oe = L.memoizedProps.style, Q = oe != null && oe.hasOwnProperty("display") ? oe.display : null;
                    E.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 6) {
              if (r === null) {
                L = n;
                try {
                  L.stateNode.nodeValue = u ? "" : L.memoizedProps;
                } catch (xe) {
                  rt(L, L.return, xe);
                }
              }
            } else if (n.tag === 18) {
              if (r === null) {
                L = n;
                try {
                  var ee = L.stateNode;
                  u ? Tg(ee, !0) : Tg(L.stateNode, !1);
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
        s & 4 && (s = e.updateQueue, s !== null && (r = s.retryQueue, r !== null && (s.retryQueue = null, po(e, r))));
        break;
      case 19:
        vn(n, e), gn(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, po(e, s)));
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
          if (Rv(s)) {
            r = s;
            break;
          }
          s = s.return;
        }
        if (r == null) throw Error(l(160));
        switch (r.tag) {
          case 27:
            var u = r.stateNode, f = ud(e);
            mo(e, f, u);
            break;
          case 5:
            var x = r.stateNode;
            r.flags & 32 && (ii(x, ""), r.flags &= -33);
            var E = ud(e);
            mo(e, E, x);
            break;
          case 3:
          case 4:
            var L = r.stateNode.containerInfo, P = ud(e);
            dd(
              e,
              P,
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
  function Uv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var n = e;
        Uv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), e = e.sibling;
      }
  }
  function Aa(e, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Av(e, n.alternate, n), n = n.sibling;
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
          typeof r.componentWillUnmount == "function" && Tv(
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
  function Da(e, n, r) {
    for (r = r && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var s = n.alternate, u = e, f = n, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Da(
            u,
            f,
            r
          ), _s(4, f);
          break;
        case 1:
          if (Da(
            u,
            f,
            r
          ), s = f, u = s.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (P) {
              rt(s, s.return, P);
            }
          if (s = f, u = s.updateQueue, u !== null) {
            var E = s.stateNode;
            try {
              var L = u.shared.hiddenCallbacks;
              if (L !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < L.length; u++)
                  mp(L[u], E);
            } catch (P) {
              rt(s, s.return, P);
            }
          }
          r && x & 64 && Nv(f), As(f, f.return);
          break;
        case 27:
          Mv(f);
        case 26:
        case 5:
          Da(
            u,
            f,
            r
          ), r && s === null && x & 4 && Cv(f), As(f, f.return);
          break;
        case 12:
          Da(
            u,
            f,
            r
          );
          break;
        case 31:
          Da(
            u,
            f,
            r
          ), r && x & 4 && kv(u, f);
          break;
        case 13:
          Da(
            u,
            f,
            r
          ), r && x & 4 && Ov(u, f);
          break;
        case 22:
          f.memoizedState === null && Da(
            u,
            f,
            r
          ), As(f, f.return);
          break;
        case 30:
          break;
        default:
          Da(
            u,
            f,
            r
          );
      }
      n = n.sibling;
    }
  }
  function hd(e, n) {
    var r = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (r = e.memoizedState.cachePool.pool), e = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (e = n.memoizedState.cachePool.pool), e !== r && (e != null && e.refCount++, r != null && gs(r));
  }
  function md(e, n) {
    e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e));
  }
  function na(e, n, r, s) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Bv(
          e,
          n,
          r,
          s
        ), n = n.sibling;
  }
  function Bv(e, n, r, s) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && _s(9, n);
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
        ), u & 2048 && (e = null, n.alternate !== null && (e = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== e && (n.refCount++, e != null && gs(e)));
        break;
      case 12:
        if (u & 2048) {
          na(
            e,
            n,
            r,
            s
          ), e = n.stateNode;
          try {
            var f = n.memoizedProps, x = f.id, E = f.onPostCommit;
            typeof E == "function" && E(
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
        ) : Ds(e, n) : f._visibility & 2 ? na(
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
        )), u & 2048 && hd(x, n);
        break;
      case 24:
        na(
          e,
          n,
          r,
          s
        ), u & 2048 && md(n.alternate, n);
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
  function Ni(e, n, r, s, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var f = e, x = n, E = r, L = s, P = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ni(
            f,
            x,
            E,
            L,
            u
          ), _s(8, x);
          break;
        case 23:
          break;
        case 22:
          var ae = x.stateNode;
          x.memoizedState !== null ? ae._visibility & 2 ? Ni(
            f,
            x,
            E,
            L,
            u
          ) : Ds(
            f,
            x
          ) : (ae._visibility |= 2, Ni(
            f,
            x,
            E,
            L,
            u
          )), u && P & 2048 && hd(
            x.alternate,
            x
          );
          break;
        case 24:
          Ni(
            f,
            x,
            E,
            L,
            u
          ), u && P & 2048 && md(x.alternate, x);
          break;
        default:
          Ni(
            f,
            x,
            E,
            L,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Ds(e, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = e, s = n, u = s.flags;
        switch (s.tag) {
          case 22:
            Ds(r, s), u & 2048 && hd(
              s.alternate,
              s
            );
            break;
          case 24:
            Ds(r, s), u & 2048 && md(s.alternate, s);
            break;
          default:
            Ds(r, s);
        }
        n = n.sibling;
      }
  }
  var zs = 8192;
  function Ti(e, n, r) {
    if (e.subtreeFlags & zs)
      for (e = e.child; e !== null; )
        $v(
          e,
          n,
          r
        ), e = e.sibling;
  }
  function $v(e, n, r) {
    switch (e.tag) {
      case 26:
        Ti(
          e,
          n,
          r
        ), e.flags & zs && e.memoizedState !== null && Oj(
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
        e.memoizedState === null && (s = e.alternate, s !== null && s.memoizedState !== null ? (s = zs, zs = 16777216, Ti(
          e,
          n,
          r
        ), zs = s) : Ti(
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
  function ks(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, qv(
            s,
            e
          );
        }
      Vv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Hv(e), e = e.sibling;
  }
  function Hv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ks(e), e.flags & 2048 && Wa(9, e, e.return);
        break;
      case 3:
        ks(e);
        break;
      case 12:
        ks(e);
        break;
      case 22:
        var n = e.stateNode;
        e.memoizedState !== null && n._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (n._visibility &= -3, vo(e)) : ks(e);
        break;
      default:
        ks(e);
    }
  }
  function vo(e) {
    var n = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          Qt = s, qv(
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
          Wa(8, n, n.return), vo(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, vo(n));
          break;
        default:
          vo(n);
      }
      e = e.sibling;
    }
  }
  function qv(e, n) {
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
          gs(r.memoizedState.cache);
      }
      if (s = r.child, s !== null) s.return = r, Qt = s;
      else
        e: for (r = e; Qt !== null; ) {
          s = Qt;
          var u = s.sibling, f = s.return;
          if (Dv(s), s === r) {
            Qt = null;
            break e;
          }
          if (u !== null) {
            u.return = f, Qt = u;
            break e;
          }
          Qt = f;
        }
    }
  }
  var Qw = {
    getCacheForType: function(e) {
      var n = tn(Ot), r = n.data.get(e);
      return r === void 0 && (r = e(), n.data.set(e, r)), r;
    },
    cacheSignal: function() {
      return tn(Ot).controller.signal;
    }
  }, Zw = typeof WeakMap == "function" ? WeakMap : Map, tt = 0, ft = null, Ye = null, Xe = 0, at = 0, Cn = null, er = !1, Ci = !1, pd = !1, za = 0, Nt = 0, tr = 0, qr = 0, vd = 0, Rn = 0, Ri = 0, Os = null, yn = null, gd = !1, go = 0, Iv = 0, yo = 1 / 0, bo = null, nr = null, Xt = 0, ar = null, Mi = null, ka = 0, yd = 0, bd = null, Fv = null, Ls = 0, xd = null;
  function Mn() {
    return (tt & 2) !== 0 && Xe !== 0 ? Xe & -Xe : O.T !== null ? Td() : ue();
  }
  function Yv() {
    if (Rn === 0)
      if ((Xe & 536870912) === 0 || Ke) {
        var e = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Rn = e;
      } else Rn = 536870912;
    return e = Nn.current, e !== null && (e.flags |= 32), Rn;
  }
  function bn(e, n, r) {
    (e === ft && (at === 2 || at === 9) || e.cancelPendingCommit !== null) && (_i(e, 0), rr(
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
  function Gv(e, n, r) {
    if ((tt & 6) !== 0) throw Error(l(327));
    var s = !r && (n & 127) === 0 && (n & e.expiredLanes) === 0 || ut(e, n), u = s ? ej(e, n) : wd(e, n, !0), f = s;
    do {
      if (u === 0) {
        Ci && !s && rr(e, n, 0, !1);
        break;
      } else {
        if (r = e.current.alternate, f && !Jw(r)) {
          u = wd(e, n, !1), f = !1;
          continue;
        }
        if (u === 2) {
          if (f = n, e.errorRecoveryDisabledLanes & f)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            e: {
              var E = e;
              u = Os;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (_i(E, x).flags |= 256), x = wd(
                E,
                x,
                !1
              ), x !== 2) {
                if (pd && !L) {
                  E.errorRecoveryDisabledLanes |= f, qr |= f, u = 4;
                  break e;
                }
                f = yn, yn = u, f !== null && (yn === null ? yn = f : yn.push.apply(
                  yn,
                  f
                ));
              }
              u = x;
            }
            if (f = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          _i(e, 0), rr(e, n, 0, !0);
          break;
        }
        e: {
          switch (s = e, f = u, f) {
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
          if ((n & 62914560) === n && (u = go + 300 - qt(), 10 < u)) {
            if (rr(
              s,
              n,
              Rn,
              !er
            ), ke(s, 0, !0) !== 0) break e;
            ka = n, s.timeoutHandle = jg(
              Xv.bind(
                null,
                s,
                r,
                yn,
                bo,
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
              u
            );
            break e;
          }
          Xv(
            s,
            r,
            yn,
            bo,
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
  function Xv(e, n, r, s, u, f, x, E, L, P, ae, oe, Q, ee) {
    if (e.timeoutHandle = -1, oe = n.subtreeFlags, oe & 8192 || (oe & 16785408) === 16785408) {
      oe = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ba
      }, $v(
        n,
        f,
        oe
      );
      var xe = (f & 62914560) === f ? go - qt() : (f & 4194048) === f ? Iv - qt() : 0;
      if (xe = Lj(
        oe,
        xe
      ), xe !== null) {
        ka = f, e.cancelPendingCommit = xe(
          tg.bind(
            null,
            e,
            n,
            f,
            r,
            s,
            u,
            x,
            E,
            L,
            ae,
            oe,
            null,
            Q,
            ee
          )
        ), rr(e, f, x, !P);
        return;
      }
    }
    tg(
      e,
      n,
      f,
      r,
      s,
      u,
      x,
      E,
      L
    );
  }
  function Jw(e) {
    for (var n = e; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var s = 0; s < r.length; s++) {
          var u = r[s], f = u.getSnapshot;
          u = u.value;
          try {
            if (!jn(f(), u)) return !1;
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
    for (var u = n; 0 < u; ) {
      var f = 31 - Yt(u), x = 1 << f;
      s[f] = -1, u &= ~x;
    }
    r !== 0 && ya(e, r, n);
  }
  function xo() {
    return (tt & 6) === 0 ? (Us(0), !1) : !0;
  }
  function Sd() {
    if (Ye !== null) {
      if (at === 0)
        var e = Ye.return;
      else
        e = Ye, ja = zr = null, Uu(e), xi = null, bs = 0, e = Ye;
      for (; e !== null; )
        Ev(e.alternate, e), e = e.return;
      Ye = null;
    }
  }
  function _i(e, n) {
    var r = e.timeoutHandle;
    r !== -1 && (e.timeoutHandle = -1, yj(r)), r = e.cancelPendingCommit, r !== null && (e.cancelPendingCommit = null, r()), ka = 0, Sd(), ft = e, Ye = r = Sa(e.current, null), Xe = n, at = 0, Cn = null, er = !1, Ci = ut(e, n), pd = !1, Ri = Rn = vd = qr = tr = Nt = 0, yn = Os = null, gd = !1, (n & 8) !== 0 && (n |= n & 32);
    var s = e.entangledLanes;
    if (s !== 0)
      for (e = e.entanglements, s &= n; 0 < s; ) {
        var u = 31 - Yt(s), f = 1 << u;
        n |= e[u], s &= ~f;
      }
    return za = n, Vl(), r;
  }
  function Pv(e, n) {
    Ue = null, O.H = Cs, n === bi || n === Pl ? (n = up(), at = 3) : n === Nu ? (n = up(), at = 4) : at = n === Wu ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Cn = n, Ye === null && (Nt = 1, oo(
      e,
      Bn(n, e.current)
    ));
  }
  function Kv() {
    var e = Nn.current;
    return e === null ? !0 : (Xe & 4194048) === Xe ? qn === null : (Xe & 62914560) === Xe || (Xe & 536870912) !== 0 ? e === qn : !1;
  }
  function Qv() {
    var e = O.H;
    return O.H = Cs, e === null ? Cs : e;
  }
  function Zv() {
    var e = O.A;
    return O.A = Qw, e;
  }
  function So() {
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
    var u = Qv(), f = Zv();
    (ft !== e || Xe !== n) && (bo = null, _i(e, n)), n = !1;
    var x = Nt;
    e: do
      try {
        if (at !== 0 && Ye !== null) {
          var E = Ye, L = Cn;
          switch (at) {
            case 8:
              Sd(), x = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nn.current === null && (n = !0);
              var P = at;
              if (at = 0, Cn = null, Ai(e, E, L, P), r && Ci) {
                x = 0;
                break e;
              }
              break;
            default:
              P = at, at = 0, Cn = null, Ai(e, E, L, P);
          }
        }
        Ww(), x = Nt;
        break;
      } catch (ae) {
        Pv(e, ae);
      }
    while (!0);
    return n && e.shellSuspendCounter++, ja = zr = null, tt = s, O.H = u, O.A = f, Ye === null && (ft = null, Xe = 0, Vl()), x;
  }
  function Ww() {
    for (; Ye !== null; ) Jv(Ye);
  }
  function ej(e, n) {
    var r = tt;
    tt |= 2;
    var s = Qv(), u = Zv();
    ft !== e || Xe !== n ? (bo = null, yo = qt() + 500, _i(e, n)) : Ci = ut(
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
              if (op(f)) {
                at = 0, Cn = null, Wv(n);
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
              op(f) ? (at = 0, Cn = null, Wv(n)) : (at = 0, Cn = null, Ai(e, n, f, 7));
              break;
            case 5:
              var x = null;
              switch (Ye.tag) {
                case 26:
                  x = Ye.memoizedState;
                case 5:
                case 27:
                  var E = Ye;
                  if (x ? Bg(x) : E.stateNode.complete) {
                    at = 0, Cn = null;
                    var L = E.sibling;
                    if (L !== null) Ye = L;
                    else {
                      var P = E.return;
                      P !== null ? (Ye = P, wo(P)) : Ye = null;
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
        tj();
        break;
      } catch (ae) {
        Pv(e, ae);
      }
    while (!0);
    return ja = zr = null, O.H = s, O.A = u, tt = r, Ye !== null ? 0 : (ft = null, Xe = 0, Vl(), Nt);
  }
  function tj() {
    for (; Ye !== null && !Ht(); )
      Jv(Ye);
  }
  function Jv(e) {
    var n = wv(e.alternate, e, za);
    e.memoizedProps = e.pendingProps, n === null ? wo(e) : Ye = n;
  }
  function Wv(e) {
    var n = e, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = vv(
          r,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Xe
        );
        break;
      case 11:
        n = vv(
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
        Ev(r, n), n = Ye = Zm(n, za), n = wv(r, n, za);
    }
    e.memoizedProps = e.pendingProps, n === null ? wo(e) : Ye = n;
  }
  function Ai(e, n, r, s) {
    ja = zr = null, Uu(n), xi = null, bs = 0;
    var u = n.return;
    try {
      if (Iw(
        e,
        u,
        n,
        r,
        Xe
      )) {
        Nt = 1, oo(
          e,
          Bn(r, e.current)
        ), Ye = null;
        return;
      }
    } catch (f) {
      if (u !== null) throw Ye = u, f;
      Nt = 1, oo(
        e,
        Bn(r, e.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Ke || s === 1 ? e = !0 : Ci || (Xe & 536870912) !== 0 ? e = !1 : (er = e = !0, (s === 2 || s === 9 || s === 3 || s === 6) && (s = Nn.current, s !== null && s.tag === 13 && (s.flags |= 16384))), eg(n, e)) : wo(n);
  }
  function wo(e) {
    var n = e;
    do {
      if ((n.flags & 32768) !== 0) {
        eg(
          n,
          er
        );
        return;
      }
      e = n.return;
      var r = Gw(
        n.alternate,
        n,
        za
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
  function eg(e, n) {
    do {
      var r = Xw(e.alternate, e);
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
  function tg(e, n, r, s, u, f, x, E, L) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (Xt !== 0);
    if ((tt & 6) !== 0) throw Error(l(327));
    if (n !== null) {
      if (n === e.current) throw Error(l(177));
      if (f = n.lanes | n.childLanes, f |= uu, Wt(
        e,
        r,
        f,
        x,
        E,
        L
      ), e === ft && (Ye = ft = null, Xe = 0), Mi = n, ar = e, ka = r, yd = f, bd = u, Fv = s, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, ij(nt, function() {
        return sg(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), s = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || s) {
        s = O.T, O.T = null, u = R.p, R.p = 2, x = tt, tt |= 4;
        try {
          Pw(e, n, r);
        } finally {
          tt = x, R.p = u, O.T = s;
        }
      }
      Xt = 1, ng(), ag(), rg();
    }
  }
  function ng() {
    if (Xt === 1) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || r) {
        r = O.T, O.T = null;
        var s = R.p;
        R.p = 2;
        var u = tt;
        tt |= 4;
        try {
          Lv(n, e);
          var f = kd, x = qm(e.containerInfo), E = f.focusedElem, L = f.selectionRange;
          if (x !== E && E && E.ownerDocument && Hm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && iu(E)) {
              var P = L.start, ae = L.end;
              if (ae === void 0 && (ae = P), "selectionStart" in E)
                E.selectionStart = P, E.selectionEnd = Math.min(
                  ae,
                  E.value.length
                );
              else {
                var oe = E.ownerDocument || document, Q = oe && oe.defaultView || window;
                if (Q.getSelection) {
                  var ee = Q.getSelection(), xe = E.textContent.length, _e = Math.min(L.start, xe), ct = L.end === void 0 ? _e : Math.min(L.end, xe);
                  !ee.extend && _e > ct && (x = ct, ct = _e, _e = x);
                  var q = Vm(
                    E,
                    _e
                  ), $ = Vm(
                    E,
                    ct
                  );
                  if (q && $ && (ee.rangeCount !== 1 || ee.anchorNode !== q.node || ee.anchorOffset !== q.offset || ee.focusNode !== $.node || ee.focusOffset !== $.offset)) {
                    var X = oe.createRange();
                    X.setStart(q.node, q.offset), ee.removeAllRanges(), _e > ct ? (ee.addRange(X), ee.extend($.node, $.offset)) : (X.setEnd($.node, $.offset), ee.addRange(X));
                  }
                }
              }
            }
            for (oe = [], ee = E; ee = ee.parentNode; )
              ee.nodeType === 1 && oe.push({
                element: ee,
                left: ee.scrollLeft,
                top: ee.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < oe.length; E++) {
              var se = oe[E];
              se.element.scrollLeft = se.left, se.element.scrollTop = se.top;
            }
          }
          Oo = !!zd, kd = zd = null;
        } finally {
          tt = u, R.p = s, O.T = r;
        }
      }
      e.current = n, Xt = 2;
    }
  }
  function ag() {
    if (Xt === 2) {
      Xt = 0;
      var e = ar, n = Mi, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = O.T, O.T = null;
        var s = R.p;
        R.p = 2;
        var u = tt;
        tt |= 4;
        try {
          Av(e, n.alternate, n);
        } finally {
          tt = u, R.p = s, O.T = r;
        }
      }
      Xt = 3;
    }
  }
  function rg() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, kn();
      var e = ar, n = Mi, r = ka, s = Fv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Mi = ar = null, ig(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (nr = null), Y(r), n = n.stateNode, Jt && typeof Jt.onCommitFiberRoot == "function")
        try {
          Jt.onCommitFiberRoot(
            Zn,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (s !== null) {
        n = O.T, u = R.p, R.p = 2, O.T = null;
        try {
          for (var f = e.onRecoverableError, x = 0; x < s.length; x++) {
            var E = s[x];
            f(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          O.T = n, R.p = u;
        }
      }
      (ka & 3) !== 0 && jo(), ha(e), u = e.pendingLanes, (r & 261930) !== 0 && (u & 42) !== 0 ? e === xd ? Ls++ : (Ls = 0, xd = e) : Ls = 0, Us(0);
    }
  }
  function ig(e, n) {
    (e.pooledCacheLanes &= n) === 0 && (n = e.pooledCache, n != null && (e.pooledCache = null, gs(n)));
  }
  function jo() {
    return ng(), ag(), rg(), sg();
  }
  function sg() {
    if (Xt !== 5) return !1;
    var e = ar, n = yd;
    yd = 0;
    var r = Y(ka), s = O.T, u = R.p;
    try {
      R.p = 32 > r ? 32 : r, O.T = null, r = bd, bd = null;
      var f = ar, x = ka;
      if (Xt = 0, Mi = ar = null, ka = 0, (tt & 6) !== 0) throw Error(l(331));
      var E = tt;
      if (tt |= 4, Hv(f.current), Bv(
        f,
        f.current,
        x,
        r
      ), tt = E, Us(0, !1), Jt && typeof Jt.onPostCommitFiberRoot == "function")
        try {
          Jt.onPostCommitFiberRoot(Zn, f);
        } catch {
        }
      return !0;
    } finally {
      R.p = u, O.T = s, ig(e, n);
    }
  }
  function lg(e, n, r) {
    n = Bn(r, n), n = Ju(e.stateNode, n, 2), e = Qa(e, n, 2), e !== null && (it(e, 2), ha(e));
  }
  function rt(e, n, r) {
    if (e.tag === 3)
      lg(e, e, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          lg(
            n,
            e,
            r
          );
          break;
        } else if (n.tag === 1) {
          var s = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (nr === null || !nr.has(s))) {
            e = Bn(r, e), r = ov(2), s = Qa(n, r, 2), s !== null && (cv(
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
  function jd(e, n, r) {
    var s = e.pingCache;
    if (s === null) {
      s = e.pingCache = new Zw();
      var u = /* @__PURE__ */ new Set();
      s.set(n, u);
    } else
      u = s.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), s.set(n, u));
    u.has(r) || (pd = !0, u.add(r), e = nj.bind(null, e, n, r), n.then(e, e));
  }
  function nj(e, n, r) {
    var s = e.pingCache;
    s !== null && s.delete(n), e.pingedLanes |= e.suspendedLanes & r, e.warmLanes &= ~r, ft === e && (Xe & r) === r && (Nt === 4 || Nt === 3 && (Xe & 62914560) === Xe && 300 > qt() - go ? (tt & 2) === 0 && _i(e, 0) : vd |= r, Ri === Xe && (Ri = 0)), ha(e);
  }
  function og(e, n) {
    n === 0 && (n = Gt()), e = _r(e, n), e !== null && (it(e, n), ha(e));
  }
  function aj(e) {
    var n = e.memoizedState, r = 0;
    n !== null && (r = n.retryLane), og(e, r);
  }
  function rj(e, n) {
    var r = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var s = e.stateNode, u = e.memoizedState;
        u !== null && (r = u.retryLane);
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
    s !== null && s.delete(n), og(e, r);
  }
  function ij(e, n) {
    return xt(e, n);
  }
  var Eo = null, Di = null, Ed = !1, No = !1, Nd = !1, ir = 0;
  function ha(e) {
    e !== Di && e.next === null && (Di === null ? Eo = Di = e : Di = Di.next = e), No = !0, Ed || (Ed = !0, lj());
  }
  function Us(e, n) {
    if (!Nd && No) {
      Nd = !0;
      do
        for (var r = !1, s = Eo; s !== null; ) {
          if (e !== 0) {
            var u = s.pendingLanes;
            if (u === 0) var f = 0;
            else {
              var x = s.suspendedLanes, E = s.pingedLanes;
              f = (1 << 31 - Yt(42 | e) + 1) - 1, f &= u & ~(x & ~E), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
            }
            f !== 0 && (r = !0, fg(s, f));
          } else
            f = Xe, f = ke(
              s,
              s === ft ? f : 0,
              s.cancelPendingCommit !== null || s.timeoutHandle !== -1
            ), (f & 3) === 0 || ut(s, f) || (r = !0, fg(s, f));
          s = s.next;
        }
      while (r);
      Nd = !1;
    }
  }
  function sj() {
    cg();
  }
  function cg() {
    No = Ed = !1;
    var e = 0;
    ir !== 0 && gj() && (e = ir);
    for (var n = qt(), r = null, s = Eo; s !== null; ) {
      var u = s.next, f = ug(s, n);
      f === 0 ? (s.next = null, r === null ? Eo = u : r.next = u, u === null && (Di = r)) : (r = s, (e !== 0 || (f & 3) !== 0) && (No = !0)), s = u;
    }
    Xt !== 0 && Xt !== 5 || Us(e), ir !== 0 && (ir = 0);
  }
  function ug(e, n) {
    for (var r = e.suspendedLanes, s = e.pingedLanes, u = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
      var x = 31 - Yt(f), E = 1 << x, L = u[x];
      L === -1 ? ((E & r) === 0 || (E & s) !== 0) && (u[x] = Dt(E, n)) : L <= n && (e.expiredLanes |= E), f &= ~E;
    }
    if (n = ft, r = Xe, r = ke(
      e,
      e === n ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s = e.callbackNode, r === 0 || e === n && (at === 2 || at === 9) || e.cancelPendingCommit !== null)
      return s !== null && s !== null && un(s), e.callbackNode = null, e.callbackPriority = 0;
    if ((r & 3) === 0 || ut(e, r)) {
      if (n = r & -r, n === e.callbackPriority) return n;
      switch (s !== null && un(s), Y(r)) {
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
      return s = dg.bind(null, e), r = xt(r, s), e.callbackPriority = n, e.callbackNode = r, n;
    }
    return s !== null && s !== null && un(s), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function dg(e, n) {
    if (Xt !== 0 && Xt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var r = e.callbackNode;
    if (jo() && e.callbackNode !== r)
      return null;
    var s = Xe;
    return s = ke(
      e,
      e === ft ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), s === 0 ? null : (Gv(e, s, n), ug(e, qt()), e.callbackNode != null && e.callbackNode === r ? dg.bind(null, e) : null);
  }
  function fg(e, n) {
    if (jo()) return null;
    Gv(e, n, !0);
  }
  function lj() {
    bj(function() {
      (tt & 6) !== 0 ? xt(
        ze,
        sj
      ) : cg();
    });
  }
  function Td() {
    if (ir === 0) {
      var e = gi;
      e === 0 && (e = ga, ga <<= 1, (ga & 261888) === 0 && (ga = 256)), ir = e;
    }
    return ir;
  }
  function hg(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Dl("" + e);
  }
  function mg(e, n) {
    var r = n.ownerDocument.createElement("input");
    return r.name = n.name, r.value = n.value, e.id && r.setAttribute("form", e.id), n.parentNode.insertBefore(r, n), e = new FormData(e), r.parentNode.removeChild(r), e;
  }
  function oj(e, n, r, s, u) {
    if (n === "submit" && r && r.stateNode === u) {
      var f = hg(
        (u[ve] || null).action
      ), x = s.submitter;
      x && (n = (n = x[ve] || null) ? hg(n.formAction) : x.getAttribute("formAction"), n !== null && (f = n, x = null));
      var E = new Ll(
        "action",
        "action",
        null,
        s,
        u
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (s.defaultPrevented) {
                if (ir !== 0) {
                  var L = x ? mg(u, x) : new FormData(u);
                  Gu(
                    r,
                    {
                      pending: !0,
                      data: L,
                      method: u.method,
                      action: f
                    },
                    null,
                    L
                  );
                }
              } else
                typeof f == "function" && (E.preventDefault(), L = x ? mg(u, x) : new FormData(u), Gu(
                  r,
                  {
                    pending: !0,
                    data: L,
                    method: u.method,
                    action: f
                  },
                  f,
                  L
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Cd = 0; Cd < cu.length; Cd++) {
    var Rd = cu[Cd], cj = Rd.toLowerCase(), uj = Rd[0].toUpperCase() + Rd.slice(1);
    ea(
      cj,
      "on" + uj
    );
  }
  ea(Ym, "onAnimationEnd"), ea(Gm, "onAnimationIteration"), ea(Xm, "onAnimationStart"), ea("dblclick", "onDoubleClick"), ea("focusin", "onFocus"), ea("focusout", "onBlur"), ea(Tw, "onTransitionRun"), ea(Cw, "onTransitionStart"), ea(Rw, "onTransitionCancel"), ea(Pm, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Kt(
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
  var Bs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), dj = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bs)
  );
  function pg(e, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var s = e[r], u = s.event;
      s = s.listeners;
      e: {
        var f = void 0;
        if (n)
          for (var x = s.length - 1; 0 <= x; x--) {
            var E = s[x], L = E.instance, P = E.currentTarget;
            if (E = E.listener, L !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = P;
            try {
              f(u);
            } catch (ae) {
              $l(ae);
            }
            u.currentTarget = null, f = L;
          }
        else
          for (x = 0; x < s.length; x++) {
            if (E = s[x], L = E.instance, P = E.currentTarget, E = E.listener, L !== f && u.isPropagationStopped())
              break e;
            f = E, u.currentTarget = P;
            try {
              f(u);
            } catch (ae) {
              $l(ae);
            }
            u.currentTarget = null, f = L;
          }
      }
    }
  }
  function Ge(e, n) {
    var r = n[be];
    r === void 0 && (r = n[be] = /* @__PURE__ */ new Set());
    var s = e + "__bubble";
    r.has(s) || (vg(n, e, 2, !1), r.add(s));
  }
  function Md(e, n, r) {
    var s = 0;
    n && (s |= 4), vg(
      r,
      e,
      s,
      n
    );
  }
  var To = "_reactListening" + Math.random().toString(36).slice(2);
  function _d(e) {
    if (!e[To]) {
      e[To] = !0, qa.forEach(function(r) {
        r !== "selectionchange" && (dj.has(r) || Md(r, !1, e), Md(r, !0, e));
      });
      var n = e.nodeType === 9 ? e : e.ownerDocument;
      n === null || n[To] || (n[To] = !0, Md("selectionchange", !1, n));
    }
  }
  function vg(e, n, r, s) {
    switch (Yg(n)) {
      case 2:
        var u = $j;
        break;
      case 8:
        u = Vj;
        break;
      default:
        u = Yd;
    }
    r = u.bind(
      null,
      n,
      r,
      e
    ), u = void 0, !Qc || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), s ? u !== void 0 ? e.addEventListener(n, r, {
      capture: !0,
      passive: u
    }) : e.addEventListener(n, r, !0) : u !== void 0 ? e.addEventListener(n, r, {
      passive: u
    }) : e.addEventListener(n, r, !1);
  }
  function Ad(e, n, r, s, u) {
    var f = s;
    if ((n & 1) === 0 && (n & 2) === 0 && s !== null)
      e: for (; ; ) {
        if (s === null) return;
        var x = s.tag;
        if (x === 3 || x === 4) {
          var E = s.stateNode.containerInfo;
          if (E === u) break;
          if (x === 4)
            for (x = s.return; x !== null; ) {
              var L = x.tag;
              if ((L === 3 || L === 4) && x.stateNode.containerInfo === u)
                return;
              x = x.return;
            }
          for (; E !== null; ) {
            if (x = st(E), x === null) return;
            if (L = x.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              s = f = x;
              continue e;
            }
            E = E.parentNode;
          }
        }
        s = s.return;
      }
    Sm(function() {
      var P = f, ae = Pc(r), oe = [];
      e: {
        var Q = Km.get(e);
        if (Q !== void 0) {
          var ee = Ll, xe = e;
          switch (e) {
            case "keypress":
              if (kl(r) === 0) break e;
            case "keydown":
            case "keyup":
              ee = rw;
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
              ee = GS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = lw;
              break;
            case Ym:
            case Gm:
            case Xm:
              ee = KS;
              break;
            case Pm:
              ee = cw;
              break;
            case "scroll":
            case "scrollend":
              ee = FS;
              break;
            case "wheel":
              ee = dw;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = ZS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = Tm;
              break;
            case "toggle":
            case "beforetoggle":
              ee = hw;
          }
          var _e = (n & 4) !== 0, ct = !_e && (e === "scroll" || e === "scrollend"), q = _e ? Q !== null ? Q + "Capture" : null : Q;
          _e = [];
          for (var $ = P, X; $ !== null; ) {
            var se = $;
            if (X = se.stateNode, se = se.tag, se !== 5 && se !== 26 && se !== 27 || X === null || q === null || (se = ss($, q), se != null && _e.push(
              $s($, se, X)
            )), ct) break;
            $ = $.return;
          }
          0 < _e.length && (Q = new ee(
            Q,
            xe,
            null,
            r,
            ae
          ), oe.push({ event: Q, listeners: _e }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (Q = e === "mouseover" || e === "pointerover", ee = e === "mouseout" || e === "pointerout", Q && r !== Xc && (xe = r.relatedTarget || r.fromElement) && (st(xe) || xe[je]))
            break e;
          if ((ee || Q) && (Q = ae.window === ae ? ae : (Q = ae.ownerDocument) ? Q.defaultView || Q.parentWindow : window, ee ? (xe = r.relatedTarget || r.toElement, ee = P, xe = xe ? st(xe) : null, xe !== null && (ct = d(xe), _e = xe.tag, xe !== ct || _e !== 5 && _e !== 27 && _e !== 6) && (xe = null)) : (ee = null, xe = P), ee !== xe)) {
            if (_e = Em, se = "onMouseLeave", q = "onMouseEnter", $ = "mouse", (e === "pointerout" || e === "pointerover") && (_e = Tm, se = "onPointerLeave", q = "onPointerEnter", $ = "pointer"), ct = ee == null ? Q : Fe(ee), X = xe == null ? Q : Fe(xe), Q = new _e(
              se,
              $ + "leave",
              ee,
              r,
              ae
            ), Q.target = ct, Q.relatedTarget = X, se = null, st(ae) === P && (_e = new _e(
              q,
              $ + "enter",
              xe,
              r,
              ae
            ), _e.target = X, _e.relatedTarget = ct, se = _e), ct = se, ee && xe)
              t: {
                for (_e = fj, q = ee, $ = xe, X = 0, se = q; se; se = _e(se))
                  X++;
                se = 0;
                for (var Ce = $; Ce; Ce = _e(Ce))
                  se++;
                for (; 0 < X - se; )
                  q = _e(q), X--;
                for (; 0 < se - X; )
                  $ = _e($), se--;
                for (; X--; ) {
                  if (q === $ || $ !== null && q === $.alternate) {
                    _e = q;
                    break t;
                  }
                  q = _e(q), $ = _e($);
                }
                _e = null;
              }
            else _e = null;
            ee !== null && gg(
              oe,
              Q,
              ee,
              _e,
              !1
            ), xe !== null && ct !== null && gg(
              oe,
              ct,
              xe,
              _e,
              !0
            );
          }
        }
        e: {
          if (Q = P ? Fe(P) : window, ee = Q.nodeName && Q.nodeName.toLowerCase(), ee === "select" || ee === "input" && Q.type === "file")
            var Je = km;
          else if (Dm(Q))
            if (Om)
              Je = jw;
            else {
              Je = Sw;
              var Ee = xw;
            }
          else
            ee = Q.nodeName, !ee || ee.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? P && Gc(P.elementType) && (Je = km) : Je = ww;
          if (Je && (Je = Je(e, P))) {
            zm(
              oe,
              Je,
              r,
              ae
            );
            break e;
          }
          Ee && Ee(e, Q, P), e === "focusout" && P && Q.type === "number" && P.memoizedProps.value != null && Yc(Q, "number", Q.value);
        }
        switch (Ee = P ? Fe(P) : window, e) {
          case "focusin":
            (Dm(Ee) || Ee.contentEditable === "true") && (ci = Ee, su = P, ms = null);
            break;
          case "focusout":
            ms = su = ci = null;
            break;
          case "mousedown":
            lu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            lu = !1, Im(oe, r, ae);
            break;
          case "selectionchange":
            if (Nw) break;
          case "keydown":
          case "keyup":
            Im(oe, r, ae);
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
        Pe && (Cm && r.locale !== "ko" && (oi || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && oi && (Be = wm()) : (Ia = ae, Zc = "value" in Ia ? Ia.value : Ia.textContent, oi = !0)), Ee = Co(P, Pe), 0 < Ee.length && (Pe = new Nm(
          Pe,
          e,
          null,
          r,
          ae
        ), oe.push({ event: Pe, listeners: Ee }), Be ? Pe.data = Be : (Be = Am(r), Be !== null && (Pe.data = Be)))), (Be = pw ? vw(e, r) : gw(e, r)) && (Pe = Co(P, "onBeforeInput"), 0 < Pe.length && (Ee = new Nm(
          "onBeforeInput",
          "beforeinput",
          null,
          r,
          ae
        ), oe.push({
          event: Ee,
          listeners: Pe
        }), Ee.data = Be)), oj(
          oe,
          e,
          P,
          r,
          ae
        );
      }
      pg(oe, n);
    });
  }
  function $s(e, n, r) {
    return {
      instance: e,
      listener: n,
      currentTarget: r
    };
  }
  function Co(e, n) {
    for (var r = n + "Capture", s = []; e !== null; ) {
      var u = e, f = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || f === null || (u = ss(e, r), u != null && s.unshift(
        $s(e, u, f)
      ), u = ss(e, n), u != null && s.push(
        $s(e, u, f)
      )), e.tag === 3) return s;
      e = e.return;
    }
    return [];
  }
  function fj(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function gg(e, n, r, s, u) {
    for (var f = n._reactName, x = []; r !== null && r !== s; ) {
      var E = r, L = E.alternate, P = E.stateNode;
      if (E = E.tag, L !== null && L === s) break;
      E !== 5 && E !== 26 && E !== 27 || P === null || (L = P, u ? (P = ss(r, f), P != null && x.unshift(
        $s(r, P, L)
      )) : u || (P = ss(r, f), P != null && x.push(
        $s(r, P, L)
      ))), r = r.return;
    }
    x.length !== 0 && e.push({ event: n, listeners: x });
  }
  var hj = /\r\n?/g, mj = /\u0000|\uFFFD/g;
  function yg(e) {
    return (typeof e == "string" ? e : "" + e).replace(hj, `
`).replace(mj, "");
  }
  function bg(e, n) {
    return n = yg(n), yg(e) === n;
  }
  function ot(e, n, r, s, u, f) {
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
        bm(e, s, f);
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
        s = Dl("" + s), e.setAttribute(r, s);
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
          typeof f == "function" && (r === "formAction" ? (n !== "input" && ot(e, n, "name", u.name, u, null), ot(
            e,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), ot(
            e,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), ot(
            e,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (ot(e, n, "encType", u.encType, u, null), ot(e, n, "method", u.method, u, null), ot(e, n, "target", u.target, u, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          e.removeAttribute(r);
          break;
        }
        s = Dl("" + s), e.setAttribute(r, s);
        break;
      case "onClick":
        s != null && (e.onclick = ba);
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
            if (u.children != null) throw Error(l(60));
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
        r = Dl("" + s), e.setAttributeNS(
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
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          s
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          s
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          s
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          s
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          s
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          s
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          s
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          s
        );
        break;
      case "xmlSpace":
        sn(
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
        (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = qS.get(r) || r, qe(e, r, s));
    }
  }
  function Dd(e, n, r, s, u, f) {
    switch (r) {
      case "style":
        bm(e, s, f);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s))
            throw Error(l(61));
          if (r = s.__html, r != null) {
            if (u.children != null) throw Error(l(60));
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
        s != null && (e.onclick = ba);
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
            if (r[0] === "o" && r[1] === "n" && (u = r.endsWith("Capture"), n = r.slice(2, u ? r.length - 7 : void 0), f = e[ve] || null, f = f != null ? f[r] : null, typeof f == "function" && e.removeEventListener(n, f, u), typeof s == "function")) {
              typeof f != "function" && f !== null && (r in e ? e[r] = null : e.hasAttribute(r) && e.removeAttribute(r)), e.addEventListener(n, s, u);
              break e;
            }
            r in e ? e[r] = s : s === !0 ? e.setAttribute(r, "") : qe(e, r, s);
          }
    }
  }
  function an(e, n, r) {
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
        var s = !1, u = !1, f;
        for (f in r)
          if (r.hasOwnProperty(f)) {
            var x = r[f];
            if (x != null)
              switch (f) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, n));
                default:
                  ot(e, n, f, x, r, null);
              }
          }
        u && ot(e, n, "srcSet", r.srcSet, r, null), s && ot(e, n, "src", r.src, r, null);
        return;
      case "input":
        Ge("invalid", e);
        var E = f = x = u = null, L = null, P = null;
        for (s in r)
          if (r.hasOwnProperty(s)) {
            var ae = r[s];
            if (ae != null)
              switch (s) {
                case "name":
                  u = ae;
                  break;
                case "type":
                  x = ae;
                  break;
                case "checked":
                  L = ae;
                  break;
                case "defaultChecked":
                  P = ae;
                  break;
                case "value":
                  f = ae;
                  break;
                case "defaultValue":
                  E = ae;
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
        pm(
          e,
          f,
          E,
          L,
          P,
          x,
          u,
          !1
        );
        return;
      case "select":
        Ge("invalid", e), s = x = f = null;
        for (u in r)
          if (r.hasOwnProperty(u) && (E = r[u], E != null))
            switch (u) {
              case "value":
                f = E;
                break;
              case "defaultValue":
                x = E;
                break;
              case "multiple":
                s = E;
              default:
                ot(e, n, u, E, r, null);
            }
        n = f, r = x, e.multiple = !!s, n != null ? ri(e, !!s, n, !1) : r != null && ri(e, !!s, r, !0);
        return;
      case "textarea":
        Ge("invalid", e), f = u = s = null;
        for (x in r)
          if (r.hasOwnProperty(x) && (E = r[x], E != null))
            switch (x) {
              case "value":
                s = E;
                break;
              case "defaultValue":
                u = E;
                break;
              case "children":
                f = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(l(91));
                break;
              default:
                ot(e, n, x, E, r, null);
            }
        gm(e, s, u, f);
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
        for (s = 0; s < Bs.length; s++)
          Ge(Bs[s], e);
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
        for (P in r)
          if (r.hasOwnProperty(P) && (s = r[P], s != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, n));
              default:
                ot(e, n, P, s, r, null);
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
    for (E in r)
      r.hasOwnProperty(E) && (s = r[E], s != null && ot(e, n, E, s, r, null));
  }
  function pj(e, n, r, s) {
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
        var u = null, f = null, x = null, E = null, L = null, P = null, ae = null;
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
        for (var Q in s) {
          var ee = s[Q];
          if (oe = r[Q], s.hasOwnProperty(Q) && (ee != null || oe != null))
            switch (Q) {
              case "type":
                f = ee;
                break;
              case "name":
                u = ee;
                break;
              case "checked":
                P = ee;
                break;
              case "defaultChecked":
                ae = ee;
                break;
              case "value":
                x = ee;
                break;
              case "defaultValue":
                E = ee;
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
                  Q,
                  ee,
                  s,
                  oe
                );
            }
        }
        Fc(
          e,
          x,
          E,
          L,
          P,
          ae,
          f,
          u
        );
        return;
      case "select":
        ee = x = E = Q = null;
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
        for (u in s)
          if (f = s[u], L = r[u], s.hasOwnProperty(u) && (f != null || L != null))
            switch (u) {
              case "value":
                Q = f;
                break;
              case "defaultValue":
                E = f;
                break;
              case "multiple":
                x = f;
              default:
                f !== L && ot(
                  e,
                  n,
                  u,
                  f,
                  s,
                  L
                );
            }
        n = E, r = x, s = ee, Q != null ? ri(e, !!r, Q, !1) : !!s != !!r && (n != null ? ri(e, !!r, n, !0) : ri(e, !!r, r ? [] : "", !1));
        return;
      case "textarea":
        ee = Q = null;
        for (E in r)
          if (u = r[E], r.hasOwnProperty(E) && u != null && !s.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                ot(e, n, E, null, s, u);
            }
        for (x in s)
          if (u = s[x], f = r[x], s.hasOwnProperty(x) && (u != null || f != null))
            switch (x) {
              case "value":
                Q = u;
                break;
              case "defaultValue":
                ee = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(l(91));
                break;
              default:
                u !== f && ot(e, n, x, u, s, f);
            }
        vm(e, Q, ee);
        return;
      case "option":
        for (var xe in r)
          if (Q = r[xe], r.hasOwnProperty(xe) && Q != null && !s.hasOwnProperty(xe))
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
                  Q
                );
            }
        for (L in s)
          if (Q = s[L], ee = r[L], s.hasOwnProperty(L) && Q !== ee && (Q != null || ee != null))
            switch (L) {
              case "selected":
                e.selected = Q && typeof Q != "function" && typeof Q != "symbol";
                break;
              default:
                ot(
                  e,
                  n,
                  L,
                  Q,
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
        for (var _e in r)
          Q = r[_e], r.hasOwnProperty(_e) && Q != null && !s.hasOwnProperty(_e) && ot(e, n, _e, null, s, Q);
        for (P in s)
          if (Q = s[P], ee = r[P], s.hasOwnProperty(P) && Q !== ee && (Q != null || ee != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(l(137, n));
                break;
              default:
                ot(
                  e,
                  n,
                  P,
                  Q,
                  s,
                  ee
                );
            }
        return;
      default:
        if (Gc(n)) {
          for (var ct in r)
            Q = r[ct], r.hasOwnProperty(ct) && Q !== void 0 && !s.hasOwnProperty(ct) && Dd(
              e,
              n,
              ct,
              void 0,
              s,
              Q
            );
          for (ae in s)
            Q = s[ae], ee = r[ae], !s.hasOwnProperty(ae) || Q === ee || Q === void 0 && ee === void 0 || Dd(
              e,
              n,
              ae,
              Q,
              s,
              ee
            );
          return;
        }
    }
    for (var q in r)
      Q = r[q], r.hasOwnProperty(q) && Q != null && !s.hasOwnProperty(q) && ot(e, n, q, null, s, Q);
    for (oe in s)
      Q = s[oe], ee = r[oe], !s.hasOwnProperty(oe) || Q === ee || Q == null && ee == null || ot(e, n, oe, Q, s, ee);
  }
  function xg(e) {
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
  function vj() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, n = 0, r = performance.getEntriesByType("resource"), s = 0; s < r.length; s++) {
        var u = r[s], f = u.transferSize, x = u.initiatorType, E = u.duration;
        if (f && E && xg(x)) {
          for (x = 0, E = u.responseEnd, s += 1; s < r.length; s++) {
            var L = r[s], P = L.startTime;
            if (P > E) break;
            var ae = L.transferSize, oe = L.initiatorType;
            ae && xg(oe) && (L = L.responseEnd, x += ae * (L < E ? 1 : (E - P) / (L - P)));
          }
          if (--s, n += 8 * (f + x) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return n / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var zd = null, kd = null;
  function Ro(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Sg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wg(e, n) {
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
  function Od(e, n) {
    return e === "textarea" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Ld = null;
  function gj() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ld ? !1 : (Ld = e, !0) : (Ld = null, !1);
  }
  var jg = typeof setTimeout == "function" ? setTimeout : void 0, yj = typeof clearTimeout == "function" ? clearTimeout : void 0, Eg = typeof Promise == "function" ? Promise : void 0, bj = typeof queueMicrotask == "function" ? queueMicrotask : typeof Eg < "u" ? function(e) {
    return Eg.resolve(null).then(e).catch(xj);
  } : jg;
  function xj(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function sr(e) {
    return e === "head";
  }
  function Ng(e, n) {
    var r = n, s = 0;
    do {
      var u = r.nextSibling;
      if (e.removeChild(r), u && u.nodeType === 8)
        if (r = u.data, r === "/$" || r === "/&") {
          if (s === 0) {
            e.removeChild(u), Li(n);
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
            var x = f.nextSibling, E = f.nodeName;
            f[He] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && f.rel.toLowerCase() === "stylesheet" || r.removeChild(f), f = x;
          }
        } else
          r === "body" && Vs(e.ownerDocument.body);
      r = u;
    } while (r);
    Li(n);
  }
  function Tg(e, n) {
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
  function Sj(e, n, r, s) {
    for (; e.nodeType === 1; ) {
      var u = r;
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
      } else if (n === "input" && e.type === "hidden") {
        var f = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === f)
          return e;
      } else return e;
      if (e = In(e.nextSibling), e === null) break;
    }
    return null;
  }
  function wj(e, n, r) {
    if (n === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !r || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Cg(e, n) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = In(e.nextSibling), e === null)) return null;
    return e;
  }
  function Bd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function $d(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function jj(e, n) {
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
  var Vd = null;
  function Rg(e) {
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
  function Mg(e) {
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
    switch (n = Ro(r), e) {
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
  var Fn = /* @__PURE__ */ new Map(), Ag = /* @__PURE__ */ new Set();
  function Mo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Oa = R.d;
  R.d = {
    f: Ej,
    r: Nj,
    D: Tj,
    C: Cj,
    L: Rj,
    m: Mj,
    X: Aj,
    S: _j,
    M: Dj
  };
  function Ej() {
    var e = Oa.f(), n = xo();
    return e || n;
  }
  function Nj(e) {
    var n = St(e);
    n !== null && n.tag === 5 && n.type === "form" ? Pp(n) : Oa.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function Dg(e, n, r) {
    var s = zi;
    if (s && typeof n == "string" && n) {
      var u = Ln(n);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof r == "string" && (u += '[crossorigin="' + r + '"]'), Ag.has(u) || (Ag.add(u), e = { rel: e, crossOrigin: r, href: n }, s.querySelector(u) === null && (n = s.createElement("link"), an(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function Tj(e) {
    Oa.D(e), Dg("dns-prefetch", e, null);
  }
  function Cj(e, n) {
    Oa.C(e, n), Dg("preconnect", e, n);
  }
  function Rj(e, n, r) {
    Oa.L(e, n, r);
    var s = zi;
    if (s && e && n) {
      var u = 'link[rel="preload"][as="' + Ln(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (u += '[imagesrcset="' + Ln(
        r.imageSrcSet
      ) + '"]', typeof r.imageSizes == "string" && (u += '[imagesizes="' + Ln(
        r.imageSizes
      ) + '"]')) : u += '[href="' + Ln(e) + '"]';
      var f = u;
      switch (n) {
        case "style":
          f = ki(e);
          break;
        case "script":
          f = Oi(e);
      }
      Fn.has(f) || (e = v(
        {
          rel: "preload",
          href: n === "image" && r && r.imageSrcSet ? void 0 : e,
          as: n
        },
        r
      ), Fn.set(f, e), s.querySelector(u) !== null || n === "style" && s.querySelector(Hs(f)) || n === "script" && s.querySelector(qs(f)) || (n = s.createElement("link"), an(n, "link", e), mt(n), s.head.appendChild(n)));
    }
  }
  function Mj(e, n) {
    Oa.m(e, n);
    var r = zi;
    if (r && e) {
      var s = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Ln(s) + '"][href="' + Ln(e) + '"]', f = u;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          f = Oi(e);
      }
      if (!Fn.has(f) && (e = v({ rel: "modulepreload", href: e }, n), Fn.set(f, e), r.querySelector(u) === null)) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(qs(f)))
              return;
        }
        s = r.createElement("link"), an(s, "link", e), mt(s), r.head.appendChild(s);
      }
    }
  }
  function _j(e, n, r) {
    Oa.S(e, n, r);
    var s = zi;
    if (s && e) {
      var u = zt(s).hoistableStyles, f = ki(e);
      n = n || "default";
      var x = u.get(f);
      if (!x) {
        var E = { loading: 0, preload: null };
        if (x = s.querySelector(
          Hs(f)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": n },
            r
          ), (r = Fn.get(f)) && Hd(e, r);
          var L = x = s.createElement("link");
          mt(L), an(L, "link", e), L._p = new Promise(function(P, ae) {
            L.onload = P, L.onerror = ae;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, _o(x, n, s);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: E
        }, u.set(f, x);
      }
    }
  }
  function Aj(e, n) {
    Oa.X(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = Oi(e), f = s.get(u);
      f || (f = r.querySelector(qs(u)), f || (e = v({ src: e, async: !0 }, n), (n = Fn.get(u)) && qd(e, n), f = r.createElement("script"), mt(f), an(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function Dj(e, n) {
    Oa.M(e, n);
    var r = zi;
    if (r && e) {
      var s = zt(r).hoistableScripts, u = Oi(e), f = s.get(u);
      f || (f = r.querySelector(qs(u)), f || (e = v({ src: e, async: !0, type: "module" }, n), (n = Fn.get(u)) && qd(e, n), f = r.createElement("script"), mt(f), an(f, "link", e), r.head.appendChild(f)), f = {
        type: "script",
        instance: f,
        count: 1,
        state: null
      }, s.set(u, f));
    }
  }
  function zg(e, n, r, s) {
    var u = (u = ge.current) ? Mo(u) : null;
    if (!u) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (n = ki(r.href), r = zt(
          u
        ).hoistableStyles, s = r.get(n), s || (s = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, r.set(n, s)), s) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          e = ki(r.href);
          var f = zt(
            u
          ).hoistableStyles, x = f.get(e);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, f.set(e, x), (f = u.querySelector(
            Hs(e)
          )) && !f._p && (x.instance = f, x.state.loading = 5), Fn.has(e) || (r = {
            rel: "preload",
            as: "style",
            href: r.href,
            crossOrigin: r.crossOrigin,
            integrity: r.integrity,
            media: r.media,
            hrefLang: r.hrefLang,
            referrerPolicy: r.referrerPolicy
          }, Fn.set(e, r), f || zj(
            u,
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
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Oi(r), r = zt(
          u
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
  function ki(e) {
    return 'href="' + Ln(e) + '"';
  }
  function Hs(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function kg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function zj(e, n, r, s) {
    e.querySelector('link[rel="preload"][as="style"][' + n + "]") ? s.loading = 1 : (n = e.createElement("link"), s.preload = n, n.addEventListener("load", function() {
      return s.loading |= 1;
    }), n.addEventListener("error", function() {
      return s.loading |= 2;
    }), an(n, "link", r), mt(n), e.head.appendChild(n));
  }
  function Oi(e) {
    return '[src="' + Ln(e) + '"]';
  }
  function qs(e) {
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
          var u = v({}, r, {
            "data-href": r.href,
            "data-precedence": r.precedence,
            href: null,
            precedence: null
          });
          return s = (e.ownerDocument || e).createElement(
            "style"
          ), mt(s), an(s, "style", u), _o(s, r.precedence, e), n.instance = s;
        case "stylesheet":
          u = ki(r.href);
          var f = e.querySelector(
            Hs(u)
          );
          if (f)
            return n.state.loading |= 4, n.instance = f, mt(f), f;
          s = kg(r), (u = Fn.get(u)) && Hd(s, u), f = (e.ownerDocument || e).createElement("link"), mt(f);
          var x = f;
          return x._p = new Promise(function(E, L) {
            x.onload = E, x.onerror = L;
          }), an(f, "link", s), n.state.loading |= 4, _o(f, r.precedence, e), n.instance = f;
        case "script":
          return f = Oi(r.src), (u = e.querySelector(
            qs(f)
          )) ? (n.instance = u, mt(u), u) : (s = r, (u = Fn.get(f)) && (s = v({}, r), qd(s, u)), e = e.ownerDocument || e, u = e.createElement("script"), mt(u), an(u, "link", s), e.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(l(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (s = n.instance, n.state.loading |= 4, _o(s, r.precedence, e));
    return n.instance;
  }
  function _o(e, n, r) {
    for (var s = r.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = s.length ? s[s.length - 1] : null, f = u, x = 0; x < s.length; x++) {
      var E = s[x];
      if (E.dataset.precedence === n) f = E;
      else if (f !== u) break;
    }
    f ? f.parentNode.insertBefore(e, f.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(e, n.firstChild));
  }
  function Hd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.title == null && (e.title = n.title);
  }
  function qd(e, n) {
    e.crossOrigin == null && (e.crossOrigin = n.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = n.referrerPolicy), e.integrity == null && (e.integrity = n.integrity);
  }
  var Ao = null;
  function Lg(e, n, r) {
    if (Ao === null) {
      var s = /* @__PURE__ */ new Map(), u = Ao = /* @__PURE__ */ new Map();
      u.set(r, s);
    } else
      u = Ao, s = u.get(r), s || (s = /* @__PURE__ */ new Map(), u.set(r, s));
    if (s.has(e)) return s;
    for (s.set(e, null), r = r.getElementsByTagName(e), u = 0; u < r.length; u++) {
      var f = r[u];
      if (!(f[He] || f[pe] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = f.getAttribute(n) || "";
        x = e + x;
        var E = s.get(x);
        E ? E.push(f) : s.set(x, [f]);
      }
    }
    return s;
  }
  function Ug(e, n, r) {
    e = e.ownerDocument || e, e.head.insertBefore(
      r,
      n === "title" ? e.querySelector("head > title") : null
    );
  }
  function kj(e, n, r) {
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
  function Bg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Oj(e, n, r, s) {
    if (r.type === "stylesheet" && (typeof s.media != "string" || matchMedia(s.media).matches !== !1) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var u = ki(s.href), f = n.querySelector(
          Hs(u)
        );
        if (f) {
          n = f._p, n !== null && typeof n == "object" && typeof n.then == "function" && (e.count++, e = Do.bind(e), n.then(e, e)), r.state.loading |= 4, r.instance = f, mt(f);
          return;
        }
        f = n.ownerDocument || n, s = kg(s), (u = Fn.get(u)) && Hd(s, u), f = f.createElement("link"), mt(f);
        var x = f;
        x._p = new Promise(function(E, L) {
          x.onload = E, x.onerror = L;
        }), an(f, "link", s), r.instance = f;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (e.count++, r = Do.bind(e), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Id = 0;
  function Lj(e, n) {
    return e.stylesheets && e.count === 0 && ko(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(r) {
      var s = setTimeout(function() {
        if (e.stylesheets && ko(e, e.stylesheets), e.unsuspend) {
          var f = e.unsuspend;
          e.unsuspend = null, f();
        }
      }, 6e4 + n);
      0 < e.imgBytes && Id === 0 && (Id = 62500 * vj());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ko(e, e.stylesheets), e.unsuspend)) {
            var f = e.unsuspend;
            e.unsuspend = null, f();
          }
        },
        (e.imgBytes > Id ? 50 : 800) + n
      );
      return e.unsuspend = r, function() {
        e.unsuspend = null, clearTimeout(s), clearTimeout(u);
      };
    } : null;
  }
  function Do() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ko(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var zo = null;
  function ko(e, n) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, zo = /* @__PURE__ */ new Map(), n.forEach(Uj, e), zo = null, Do.call(e));
  }
  function Uj(e, n) {
    if (!(n.state.loading & 4)) {
      var r = zo.get(e);
      if (r) var s = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), zo.set(e, r);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), f = 0; f < u.length; f++) {
          var x = u[f];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (r.set(x.dataset.precedence, x), s = x);
        }
        s && r.set(null, s);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), f = r.get(x) || s, f === s && r.set(null, u), r.set(x, u), this.count++, s = Do.bind(this), u.addEventListener("load", s), u.addEventListener("error", s), f ? f.parentNode.insertBefore(u, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), n.state.loading |= 4;
    }
  }
  var Is = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function Bj(e, n, r, s, u, f, x, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = s, this.onUncaughtError = u, this.onCaughtError = f, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function $g(e, n, r, s, u, f, x, E, L, P, ae, oe) {
    return e = new Bj(
      e,
      n,
      r,
      x,
      L,
      P,
      ae,
      oe,
      E
    ), n = 1, f === !0 && (n |= 24), f = En(3, null, null, n), e.current = f, f.stateNode = e, n = wu(), n.refCount++, e.pooledCache = n, n.refCount++, f.memoizedState = {
      element: s,
      isDehydrated: r,
      cache: n
    }, Tu(f), e;
  }
  function Vg(e) {
    return e ? (e = fi, e) : fi;
  }
  function Hg(e, n, r, s, u, f) {
    u = Vg(u), s.context === null ? s.context = u : s.pendingContext = u, s = Ka(n), s.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (s.callback = f), r = Qa(e, s, n), r !== null && (bn(r, e, n), Ss(r, e, n));
  }
  function qg(e, n) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function Fd(e, n) {
    qg(e, n), (e = e.alternate) && qg(e, n);
  }
  function Ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = _r(e, 67108864);
      n !== null && bn(n, e, 67108864), Fd(e, 67108864);
    }
  }
  function Fg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var n = Mn();
      n = H(n);
      var r = _r(e, n);
      r !== null && bn(r, e, n), Fd(e, n);
    }
  }
  var Oo = !0;
  function $j(e, n, r, s) {
    var u = O.T;
    O.T = null;
    var f = R.p;
    try {
      R.p = 2, Yd(e, n, r, s);
    } finally {
      R.p = f, O.T = u;
    }
  }
  function Vj(e, n, r, s) {
    var u = O.T;
    O.T = null;
    var f = R.p;
    try {
      R.p = 8, Yd(e, n, r, s);
    } finally {
      R.p = f, O.T = u;
    }
  }
  function Yd(e, n, r, s) {
    if (Oo) {
      var u = Gd(s);
      if (u === null)
        Ad(
          e,
          n,
          s,
          Lo,
          r
        ), Gg(e, s);
      else if (qj(
        u,
        e,
        n,
        r,
        s
      ))
        s.stopPropagation();
      else if (Gg(e, s), n & 4 && -1 < Hj.indexOf(e)) {
        for (; u !== null; ) {
          var f = St(u);
          if (f !== null)
            switch (f.tag) {
              case 3:
                if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                  var x = hn(f.pendingLanes);
                  if (x !== 0) {
                    var E = f;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; x; ) {
                      var L = 1 << 31 - Yt(x);
                      E.entanglements[1] |= L, x &= ~L;
                    }
                    ha(f), (tt & 6) === 0 && (yo = qt() + 500, Us(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = _r(f, 2), E !== null && bn(E, f, 2), xo(), Fd(f, 2);
            }
          if (f = Gd(s), f === null && Ad(
            e,
            n,
            s,
            Lo,
            r
          ), f === u) break;
          u = f;
        }
        u !== null && s.stopPropagation();
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
  var Lo = null;
  function Xd(e) {
    if (Lo = null, e = st(e), e !== null) {
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
    return Lo = e, null;
  }
  function Yg(e) {
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
  var Pd = !1, lr = null, or = null, cr = null, Fs = /* @__PURE__ */ new Map(), Ys = /* @__PURE__ */ new Map(), ur = [], Hj = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gg(e, n) {
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
        Fs.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ys.delete(n.pointerId);
    }
  }
  function Gs(e, n, r, s, u, f) {
    return e === null || e.nativeEvent !== f ? (e = {
      blockedOn: n,
      domEventName: r,
      eventSystemFlags: s,
      nativeEvent: f,
      targetContainers: [u]
    }, n !== null && (n = St(n), n !== null && Ig(n)), e) : (e.eventSystemFlags |= s, n = e.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), e);
  }
  function qj(e, n, r, s, u) {
    switch (n) {
      case "focusin":
        return lr = Gs(
          lr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "dragenter":
        return or = Gs(
          or,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "mouseover":
        return cr = Gs(
          cr,
          e,
          n,
          r,
          s,
          u
        ), !0;
      case "pointerover":
        var f = u.pointerId;
        return Fs.set(
          f,
          Gs(
            Fs.get(f) || null,
            e,
            n,
            r,
            s,
            u
          )
        ), !0;
      case "gotpointercapture":
        return f = u.pointerId, Ys.set(
          f,
          Gs(
            Ys.get(f) || null,
            e,
            n,
            r,
            s,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Xg(e) {
    var n = st(e.target);
    if (n !== null) {
      var r = d(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = h(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Fg(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = m(r), n !== null) {
            e.blockedOn = n, de(e.priority, function() {
              Fg(r);
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
  function Uo(e) {
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
        return n = St(r), n !== null && Ig(n), e.blockedOn = r, !1;
      n.shift();
    }
    return !0;
  }
  function Pg(e, n, r) {
    Uo(e) && r.delete(n);
  }
  function Ij() {
    Pd = !1, lr !== null && Uo(lr) && (lr = null), or !== null && Uo(or) && (or = null), cr !== null && Uo(cr) && (cr = null), Fs.forEach(Pg), Ys.forEach(Pg);
  }
  function Bo(e, n) {
    e.blockedOn === n && (e.blockedOn = null, Pd || (Pd = !0, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      Ij
    )));
  }
  var $o = null;
  function Kg(e) {
    $o !== e && ($o = e, t.unstable_scheduleCallback(
      t.unstable_NormalPriority,
      function() {
        $o === e && ($o = null);
        for (var n = 0; n < e.length; n += 3) {
          var r = e[n], s = e[n + 1], u = e[n + 2];
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
              data: u,
              method: r.method,
              action: s
            },
            s,
            u
          ));
        }
      }
    ));
  }
  function Li(e) {
    function n(L) {
      return Bo(L, e);
    }
    lr !== null && Bo(lr, e), or !== null && Bo(or, e), cr !== null && Bo(cr, e), Fs.forEach(n), Ys.forEach(n);
    for (var r = 0; r < ur.length; r++) {
      var s = ur[r];
      s.blockedOn === e && (s.blockedOn = null);
    }
    for (; 0 < ur.length && (r = ur[0], r.blockedOn === null); )
      Xg(r), r.blockedOn === null && ur.shift();
    if (r = (e.ownerDocument || e).$$reactFormReplay, r != null)
      for (s = 0; s < r.length; s += 3) {
        var u = r[s], f = r[s + 1], x = u[ve] || null;
        if (typeof f == "function")
          x || Kg(r);
        else if (x) {
          var E = null;
          if (f && f.hasAttribute("formAction")) {
            if (u = f, x = f[ve] || null)
              E = x.formAction;
            else if (Xd(u) !== null) continue;
          } else E = x.action;
          typeof E == "function" ? r[s + 1] = E : (r.splice(s, 3), s -= 3), Kg(r);
        }
      }
  }
  function Qg() {
    function e(f) {
      f.canIntercept && f.info === "react-transition" && f.intercept({
        handler: function() {
          return new Promise(function(x) {
            return u = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      u !== null && (u(), u = null), s || setTimeout(r, 20);
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
      var s = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        s = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function Kd(e) {
    this._internalRoot = e;
  }
  Vo.prototype.render = Kd.prototype.render = function(e) {
    var n = this._internalRoot;
    if (n === null) throw Error(l(409));
    var r = n.current, s = Mn();
    Hg(r, s, e, n, null, null);
  }, Vo.prototype.unmount = Kd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var n = e.containerInfo;
      Hg(e.current, 2, null, e, null, null), xo(), n[je] = null;
    }
  };
  function Vo(e) {
    this._internalRoot = e;
  }
  Vo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var n = ue();
      e = { blockedOn: null, target: e, priority: n };
      for (var r = 0; r < ur.length && n !== 0 && n < ur[r].priority; r++) ;
      ur.splice(r, 0, e), r === 0 && Xg(e);
    }
  };
  var Zg = a.version;
  if (Zg !== "19.2.5")
    throw Error(
      l(
        527,
        Zg,
        "19.2.5"
      )
    );
  R.findDOMNode = function(e) {
    var n = e._reactInternals;
    if (n === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = p(n), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Fj = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.5"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ho = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ho.isDisabled && Ho.supportsFiber)
      try {
        Zn = Ho.inject(
          Fj
        ), Jt = Ho;
      } catch {
      }
  }
  return Ps.createRoot = function(e, n) {
    if (!o(e)) throw Error(l(299));
    var r = !1, s = "", u = rv, f = iv, x = sv;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = $g(
      e,
      1,
      !1,
      null,
      null,
      r,
      s,
      null,
      u,
      f,
      x,
      Qg
    ), e[je] = n.current, _d(e), new Kd(n);
  }, Ps.hydrateRoot = function(e, n, r) {
    if (!o(e)) throw Error(l(299));
    var s = !1, u = "", f = rv, x = iv, E = sv, L = null;
    return r != null && (r.unstable_strictMode === !0 && (s = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onUncaughtError !== void 0 && (f = r.onUncaughtError), r.onCaughtError !== void 0 && (x = r.onCaughtError), r.onRecoverableError !== void 0 && (E = r.onRecoverableError), r.formState !== void 0 && (L = r.formState)), n = $g(
      e,
      1,
      !0,
      n,
      r ?? null,
      s,
      u,
      L,
      f,
      x,
      E,
      Qg
    ), n.context = Vg(null), r = n.current, s = Mn(), s = H(s), u = Ka(s), u.callback = null, Qa(r, u, s), r = s, n.current.lanes = r, it(n, r), ha(n), e[je] = n.current, _d(e), new Vo(n);
  }, Ps.version = "19.2.5", Ps;
}
var ly;
function tE() {
  if (ly) return Jd.exports;
  ly = 1;
  function t() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (a) {
        console.error(a);
      }
  }
  return t(), Jd.exports = eE(), Jd.exports;
}
var nE = tE();
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
var cx = (t) => {
  throw TypeError(t);
}, aE = (t, a, i) => a.has(t) || cx("Cannot " + i), nf = (t, a, i) => (aE(t, a, "read from private field"), i ? i.call(t) : a.get(t)), rE = (t, a, i) => a.has(t) ? cx("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, i);
function oy(t) {
  return typeof t == "object" && t != null && "pathname" in t && "search" in t && "hash" in t && "state" in t && "key" in t;
}
function iE(t = {}) {
  let { initialEntries: a = ["/"], initialIndex: i, v5Compat: l = !1 } = t, o;
  o = a.map(
    (w, j) => b(
      w,
      typeof w == "string" ? null : w.state,
      j === 0 ? "default" : void 0,
      typeof w == "string" ? void 0 : w.unstable_mask
    )
  );
  let d = g(
    i ?? o.length - 1
  ), h = "POP", m = null;
  function g(w) {
    return Math.min(Math.max(w, 0), o.length - 1);
  }
  function p() {
    return o[d];
  }
  function b(w, j = null, T, M) {
    let N = Gf(
      o ? p().pathname : "/",
      w,
      j,
      T,
      M
    );
    return _t(
      N.pathname.charAt(0) === "/",
      `relative pathnames are not supported in memory history: ${JSON.stringify(
        w
      )}`
    ), N;
  }
  function v(w) {
    return typeof w == "string" ? w : pa(w);
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
    createURL(w) {
      return new URL(v(w), "http://localhost");
    },
    encodeLocation(w) {
      let j = typeof w == "string" ? ia(w) : w;
      return {
        pathname: j.pathname || "",
        search: j.search || "",
        hash: j.hash || ""
      };
    },
    push(w, j) {
      h = "PUSH";
      let T = oy(w) ? w : b(w, j);
      d += 1, o.splice(d, o.length, T), l && m && m({ action: h, location: T, delta: 1 });
    },
    replace(w, j) {
      h = "REPLACE";
      let T = oy(w) ? w : b(w, j);
      o[d] = T, l && m && m({ action: h, location: T, delta: 0 });
    },
    go(w) {
      h = "POP";
      let j = g(d + w), T = o[j];
      d = j, m && m({ action: h, location: T, delta: w });
    },
    listen(w) {
      return m = w, () => {
        m = null;
      };
    }
  };
}
function Ie(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function _t(t, a) {
  if (!t) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {
    }
  }
}
function sE() {
  return Math.random().toString(36).substring(2, 10);
}
function Gf(t, a, i = null, l, o) {
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
    key: a && a.key || l || sE(),
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
function lE(t, a = !1) {
  let i = "http://localhost";
  typeof window < "u" && (i = window.location.origin !== "null" ? window.location.origin : window.location.href), Ie(i, "No window.location.(origin|href) available to create URL");
  let l = typeof t == "string" ? t : pa(t);
  return l = l.replace(/ $/, "%20"), !a && l.startsWith("//") && (l = i + l), new URL(l, i);
}
var sl, cy = class {
  /**
   * Create a new `RouterContextProvider` instance
   * @param init An optional initial context map to populate the provider with
   */
  constructor(t) {
    if (rE(this, sl, /* @__PURE__ */ new Map()), t)
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
    if (nf(this, sl).has(t))
      return nf(this, sl).get(t);
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
    nf(this, sl).set(t, a);
  }
};
sl = /* @__PURE__ */ new WeakMap();
var oE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function cE(t) {
  return oE.has(
    t
  );
}
var uE = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function dE(t) {
  return uE.has(
    t
  );
}
function fE(t) {
  return t.index === !0;
}
function hl(t, a, i = [], l = {}, o = !1) {
  return t.map((d, h) => {
    let m = [...i, String(h)], g = typeof d.id == "string" ? d.id : m.join("-");
    if (Ie(
      d.index !== !0 || !d.children,
      "Cannot specify children on an index route"
    ), Ie(
      o || !l[g],
      `Found a route id collision on id "${g}".  Route id's must be globally unique within Data Router usages`
    ), fE(d)) {
      let p = {
        ...d,
        id: g
      };
      return l[g] = uy(
        p,
        a(p)
      ), p;
    } else {
      let p = {
        ...d,
        id: g,
        children: void 0
      };
      return l[g] = uy(
        p,
        a(p)
      ), d.children && (p.children = hl(
        d.children,
        a,
        m,
        l,
        o
      )), p;
    }
  });
}
function uy(t, a) {
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
  return ll(t, a, i, !1);
}
function ll(t, a, i, l) {
  let o = typeof a == "string" ? ia(a) : a, d = Kn(o.pathname || "/", i);
  if (d == null)
    return null;
  let h = ux(t);
  mE(h);
  let m = null;
  for (let g = 0; m == null && g < h.length; ++g) {
    let p = NE(d);
    m = jE(
      h[g],
      p,
      l
    );
  }
  return m;
}
function hE(t, a) {
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
function ux(t, a = [], i = [], l = "", o = !1) {
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
    ), ux(
      h.children,
      a,
      S,
      v,
      g
    )), !(h.path == null && !h.index) && a.push({
      path: v,
      score: SE(v, h.index),
      routesMeta: S
    });
  };
  return t.forEach((h, m) => {
    if (h.path === "" || !h.path?.includes("?"))
      d(h, m);
    else
      for (let g of dx(h.path))
        d(h, m, !0, g);
  }), a;
}
function dx(t) {
  let a = t.split("/");
  if (a.length === 0) return [];
  let [i, ...l] = a, o = i.endsWith("?"), d = i.replace(/\?$/, "");
  if (l.length === 0)
    return o ? [d, ""] : [d];
  let h = dx(l.join("/")), m = [];
  return m.push(
    ...h.map(
      (g) => g === "" ? d : [d, g].join("/")
    )
  ), o && m.push(...h), m.map(
    (g) => t.startsWith("/") && g === "" ? "/" : g
  );
}
function mE(t) {
  t.sort(
    (a, i) => a.score !== i.score ? i.score - a.score : wE(
      a.routesMeta.map((l) => l.childrenIndex),
      i.routesMeta.map((l) => l.childrenIndex)
    )
  );
}
var pE = /^:[\w-]+$/, vE = 3, gE = 2, yE = 1, bE = 10, xE = -2, dy = (t) => t === "*";
function SE(t, a) {
  let i = t.split("/"), l = i.length;
  return i.some(dy) && (l += xE), a && (l += gE), i.filter((o) => !dy(o)).reduce(
    (o, d) => o + (pE.test(d) ? vE : d === "" ? yE : bE),
    l
  );
}
function wE(t, a) {
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
function jE(t, a, i = !1) {
  let { routesMeta: l } = t, o = {}, d = "/", h = [];
  for (let m = 0; m < l.length; ++m) {
    let g = l[m], p = m === l.length - 1, b = d === "/" ? a : a.slice(d.length) || "/", v = vc(
      { path: g.relativePath, caseSensitive: g.caseSensitive, end: p },
      b
    ), S = g.route;
    if (!v && p && i && !l[l.length - 1].route.index && (v = vc(
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
      pathnameBase: RE(
        Gn([d, v.pathnameBase])
      ),
      route: S
    }), v.pathnameBase !== "/" && (d = Gn([d, v.pathnameBase]));
  }
  return h;
}
function vc(t, a) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, l] = EE(
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
          let j = m[S] || "";
          h = d.slice(0, d.length - j.length).replace(/(.)\/+$/, "$1");
        }
        const w = m[S];
        return v && !w ? p[b] = void 0 : p[b] = (w || "").replace(/%2F/g, "/"), p;
      },
      {}
    ),
    pathname: d,
    pathnameBase: h,
    pattern: t
  };
}
function EE(t, a = !1, i = !0) {
  _t(
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
function NE(t) {
  try {
    return t.split("/").map((a) => decodeURIComponent(a).replace(/\//g, "%2F")).join("/");
  } catch (a) {
    return _t(
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
function TE({
  basename: t,
  pathname: a
}) {
  return a === "/" ? t : Gn([t, a]);
}
var fx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Eh = (t) => fx.test(t);
function CE(t, a = "/") {
  let {
    pathname: i,
    search: l = "",
    hash: o = ""
  } = typeof t == "string" ? ia(t) : t, d;
  return i ? (i = Th(i), i.startsWith("/") ? d = fy(i.substring(1), "/") : d = fy(i, a)) : d = a, {
    pathname: d,
    search: ME(l),
    hash: _E(o)
  };
}
function fy(t, a) {
  let i = gc(a).split("/");
  return t.split("/").forEach((o) => {
    o === ".." ? i.length > 1 && i.pop() : o !== "." && i.push(o);
  }), i.length > 1 ? i.join("/") : "/";
}
function af(t, a, i, l) {
  return `Cannot include a '${t}' character in a manually specified \`to.${a}\` field [${JSON.stringify(
    l
  )}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function hx(t) {
  return t.filter(
    (a, i) => i === 0 || a.route.path && a.route.path.length > 0
  );
}
function Nh(t) {
  let a = hx(t);
  return a.map(
    (i, l) => l === a.length - 1 ? i.pathname : i.pathnameBase
  );
}
function _c(t, a, i, l = !1) {
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
  let g = CE(o, m), p = h && h !== "/" && h.endsWith("/"), b = (d || h === ".") && i.endsWith("/");
  return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"), g;
}
var Th = (t) => t.replace(/\/\/+/g, "/"), Gn = (t) => Th(t.join("/")), gc = (t) => t.replace(/\/+$/, ""), RE = (t) => gc(t).replace(/^\/*/, "/"), ME = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, _E = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, AE = (t, a = 302) => {
  let i = a;
  typeof i == "number" ? i = { status: i } : typeof i.status > "u" && (i.status = 302);
  let l = new Headers(i.headers);
  return l.set("Location", t), new Response(null, { ...i, headers: l });
}, Ac = class {
  constructor(t, a, i, l = !1) {
    this.status = t, this.statusText = a || "", this.internal = l, i instanceof Error ? (this.data = i.toString(), this.error = i) : this.data = i;
  }
};
function ml(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.internal == "boolean" && "data" in t;
}
function xl(t) {
  let a = t.map((i) => i.route.path).filter(Boolean);
  return Gn(a) || "/";
}
var mx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function px(t, a) {
  let i = t;
  if (typeof i != "string" || !fx.test(i))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: i
    };
  let l = i, o = !1;
  if (mx)
    try {
      let d = new URL(window.location.href), h = i.startsWith("//") ? new URL(d.protocol + i) : new URL(i), m = Kn(h.pathname, a);
      h.origin === d.origin && m != null ? i = m + h.search + h.hash : o = !0;
    } catch {
      _t(
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
function DE(t, a) {
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
        (...g) => hy(g[0])
      );
      m && (o === "loader" && h.hydrate === !0 && (m.hydrate = !0), m[yr] = h, l[o] = m);
    }
  }), a.middleware && a.middleware.length > 0 && i.middleware.length > 0 && (l.middleware = a.middleware.map((o) => {
    let d = o[yr] ?? o, h = Ii(
      i.middleware,
      d,
      (...m) => hy(m[0])
    );
    return h ? (h[yr] = d, h) : o;
  })), l;
}
function zE(t, a) {
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
          ...my(t, m ?? {})
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
        ...my(t, g ?? {})
      };
    });
    o && (o[yr] = l, t.fetch = o);
  }
  return t;
}
function Ii(t, a, i) {
  return t.length === 0 ? null : async (...l) => {
    let o = await vx(
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
async function vx(t, a, i, l) {
  let o = t[l], d;
  if (o) {
    let h, m = async () => (h ? console.error("You cannot call instrumented handlers more than once") : h = vx(t, a, i, l - 1), d = await h, Ie(d, "Expected a result"), d.type === "error" && d.value instanceof Error ? { status: "error", error: d.value } : { status: "success", error: void 0 });
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
function hy(t) {
  let { request: a, context: i, params: l, unstable_pattern: o } = t;
  return {
    request: kE(a),
    params: { ...l },
    unstable_pattern: o,
    context: OE(i)
  };
}
function my(t, a) {
  return {
    currentUrl: pa(t.state.location),
    ..."formMethod" in a ? { formMethod: a.formMethod } : {},
    ..."formEncType" in a ? { formEncType: a.formEncType } : {},
    ..."formData" in a ? { formData: a.formData } : {},
    ..."body" in a ? { body: a.body } : {}
  };
}
function kE(t) {
  return {
    method: t.method,
    url: t.url,
    headers: {
      get: (...a) => t.headers.get(...a)
    }
  };
}
function OE(t) {
  if (UE(t)) {
    let a = { ...t };
    return Object.freeze(a), a;
  } else
    return {
      get: (a) => t.get(a)
    };
}
var LE = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function UE(t) {
  if (t === null || typeof t != "object")
    return !1;
  const a = Object.getPrototypeOf(t);
  return a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === LE;
}
var gx = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
], BE = new Set(
  gx
), $E = [
  "GET",
  ...gx
], VE = new Set($E), yx = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), HE = /* @__PURE__ */ new Set([307, 308]), rf = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, qE = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
}, Ks = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
}, IE = (t) => ({
  hasErrorBoundary: !!t.hasErrorBoundary
}), bx = "remix-router-transitions", xx = Symbol("ResetLoaderData");
function FE(t) {
  const a = t.window ? t.window : typeof window < "u" ? window : void 0, i = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(
    t.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let l = t.hydrationRouteProperties || [], o = t.mapRouteProperties || IE, d = o;
  if (t.unstable_instrumentations) {
    let z = t.unstable_instrumentations;
    d = (H) => ({
      ...o(H),
      ...DE(
        z.map((Y) => Y.route).filter(Boolean),
        H
      )
    });
  }
  let h = {}, m = hl(
    t.routes,
    d,
    void 0,
    h
  ), g, p = t.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let b = t.dataStrategy || KE, v = {
    unstable_passThroughRequests: !1,
    ...t.future
  }, S = null, w = /* @__PURE__ */ new Set(), j = null, T = null, M = null, N = t.hydrationData != null, k = vr(m, t.history.location, p), A = !1, C = null, V, G;
  if (k == null && !t.patchRoutesOnNavigation) {
    let z = Yn(404, {
      pathname: t.history.location.pathname
    }), { matches: H, route: Y } = qo(m);
    V = !0, G = !V, k = H, C = { [Y.id]: z };
  } else if (k && !t.hydrationData && wn(
    k,
    m,
    t.history.location.pathname
  ).active && (k = null), k)
    if (k.some((z) => z.route.lazy))
      V = !1, G = !V;
    else if (!k.some((z) => Ch(z.route)))
      V = !0, G = !V;
    else {
      let z = t.hydrationData ? t.hydrationData.loaderData : null, H = t.hydrationData ? t.hydrationData.errors : null, Y = k;
      if (H) {
        let ue = k.findIndex(
          (de) => H[de.route.id] !== void 0
        );
        Y = Y.slice(0, ue + 1);
      }
      G = !1, V = !0, Y.forEach((ue) => {
        let de = Sx(ue.route, z, H);
        G = G || de.renderFallback, V = V && !de.shouldLoad;
      });
    }
  else {
    V = !1, G = !V, k = [];
    let z = wn(
      null,
      m,
      t.history.location.pathname
    );
    z.active && z.matches && (A = !0, k = z.matches);
  }
  let ne, D = {
    historyAction: t.history.action,
    location: t.history.location,
    matches: k,
    initialized: V,
    renderFallback: G,
    navigation: rf,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: t.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: t.hydrationData && t.hydrationData.loaderData || {},
    actionData: t.hydrationData && t.hydrationData.actionData || null,
    errors: t.hydrationData && t.hydrationData.errors || C,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, I = "POP", F = null, ie = !1, re, te = !1, ce = /* @__PURE__ */ new Map(), W = null, O = !1, R = !1, U = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Map(), Z = 0, _ = -1, J = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map(), ge = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), Me, Ve = null;
  function Zt() {
    if (S = t.history.listen(
      ({ action: z, location: H, delta: Y }) => {
        if (Me) {
          Me(), Me = void 0;
          return;
        }
        _t(
          Ae.size === 0 || Y != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ue = la({
          currentLocation: D.location,
          nextLocation: H,
          historyAction: z
        });
        if (ue && Y != null) {
          let de = new Promise((Se) => {
            Me = Se;
          });
          t.history.go(Y * -1), Jn(ue, {
            state: "blocked",
            location: H,
            proceed() {
              Jn(ue, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: H
              }), de.then(() => t.history.go(Y));
            },
            reset() {
              let Se = new Map(D.blockers);
              Se.set(ue, Ks), et({ blockers: Se });
            }
          }), F?.resolve(), F = null;
          return;
        }
        return De(z, H);
      }
    ), i) {
      hN(a, ce);
      let z = () => mN(a, ce);
      a.addEventListener("pagehide", z), W = () => a.removeEventListener("pagehide", z);
    }
    return D.initialized || De("POP", D.location, {
      initialHydration: !0
    }), ne;
  }
  function Pt() {
    S && S(), W && W(), w.clear(), re && re.abort(), D.fetchers.forEach((z, H) => Zn(H)), D.blockers.forEach((z, H) => ga(H));
  }
  function At(z) {
    return w.add(z), () => w.delete(z);
  }
  function et(z, H = {}) {
    z.matches && (z.matches = z.matches.map((de) => {
      let Se = h[de.route.id], pe = de.route;
      return pe.element !== Se.element || pe.errorElement !== Se.errorElement || pe.hydrateFallbackElement !== Se.hydrateFallbackElement ? {
        ...de,
        route: Se
      } : de;
    })), D = {
      ...D,
      ...z
    };
    let Y = [], ue = [];
    D.fetchers.forEach((de, Se) => {
      de.state === "idle" && (ge.has(Se) ? Y.push(Se) : ue.push(Se));
    }), ge.forEach((de) => {
      !D.fetchers.has(de) && !B.has(de) && Y.push(de);
    }), [...w].forEach(
      (de) => de(D, {
        deletedFetchers: Y,
        newErrors: z.errors ?? null,
        viewTransitionOpts: H.viewTransitionOpts,
        flushSync: H.flushSync === !0
      })
    ), Y.forEach((de) => Zn(de)), ue.forEach((de) => D.fetchers.delete(de));
  }
  function pt(z, H, { flushSync: Y } = {}) {
    let ue = D.actionData != null && D.navigation.formMethod != null && on(D.navigation.formMethod) && D.navigation.state === "loading" && z.state?._isRedirect !== !0, de;
    H.actionData ? Object.keys(H.actionData).length > 0 ? de = H.actionData : de = null : ue ? de = D.actionData : de = null;
    let Se = H.loaderData ? Ny(
      D.loaderData,
      H.loaderData,
      H.matches || [],
      H.errors
    ) : D.loaderData, pe = D.blockers;
    pe.size > 0 && (pe = new Map(pe), pe.forEach((Re, Ne) => pe.set(Ne, Ks)));
    let ve = O ? !1 : Gt(z, H.matches || D.matches), je = ie === !0 || D.navigation.formMethod != null && on(D.navigation.formMethod) && z.state?._isRedirect !== !0;
    g && (m = g, g = void 0), O || I === "POP" || (I === "PUSH" ? t.history.push(z, z.state) : I === "REPLACE" && t.history.replace(z, z.state));
    let be;
    if (I === "POP") {
      let Re = ce.get(D.location.pathname);
      Re && Re.has(z.pathname) ? be = {
        currentLocation: D.location,
        nextLocation: z
      } : ce.has(z.pathname) && (be = {
        currentLocation: z,
        nextLocation: D.location
      });
    } else if (te) {
      let Re = ce.get(D.location.pathname);
      Re ? Re.add(z.pathname) : (Re = /* @__PURE__ */ new Set([z.pathname]), ce.set(D.location.pathname, Re)), be = {
        currentLocation: D.location,
        nextLocation: z
      };
    }
    et(
      {
        ...H,
        // matches, errors, fetchers go through as-is
        actionData: de,
        loaderData: Se,
        historyAction: I,
        location: z,
        initialized: !0,
        renderFallback: !1,
        navigation: rf,
        revalidation: "idle",
        restoreScrollPosition: ve,
        preventScrollReset: je,
        blockers: pe
      },
      {
        viewTransitionOpts: be,
        flushSync: Y === !0
      }
    ), I = "POP", ie = !1, te = !1, O = !1, R = !1, F?.resolve(), F = null, Ve?.resolve(), Ve = null;
  }
  async function he(z, H) {
    if (F?.resolve(), F = null, typeof z == "number") {
      F || (F = My());
      let dt = F.promise;
      return t.history.go(z), dt;
    }
    let Y = Xf(
      D.location,
      D.matches,
      p,
      z,
      H?.fromRouteId,
      H?.relative
    ), { path: ue, submission: de, error: Se } = py(
      !1,
      Y,
      H
    ), pe;
    H?.unstable_mask && (pe = {
      pathname: "",
      search: "",
      hash: "",
      ...typeof H.unstable_mask == "string" ? ia(H.unstable_mask) : {
        ...D.location.unstable_mask,
        ...H.unstable_mask
      }
    });
    let ve = D.location, je = Gf(
      ve,
      ue,
      H && H.state,
      void 0,
      pe
    );
    je = {
      ...je,
      ...t.history.encodeLocation(je)
    };
    let be = H && H.replace != null ? H.replace : void 0, Re = "PUSH";
    be === !0 ? Re = "REPLACE" : be === !1 || de != null && on(de.formMethod) && de.formAction === D.location.pathname + D.location.search && (Re = "REPLACE");
    let Ne = H && "preventScrollReset" in H ? H.preventScrollReset === !0 : void 0, Ze = (H && H.flushSync) === !0, He = la({
      currentLocation: ve,
      nextLocation: je,
      historyAction: Re
    });
    if (He) {
      Jn(He, {
        state: "blocked",
        location: je,
        proceed() {
          Jn(He, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: je
          }), he(z, H);
        },
        reset() {
          let dt = new Map(D.blockers);
          dt.set(He, Ks), et({ blockers: dt });
        }
      });
      return;
    }
    await De(Re, je, {
      submission: de,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: Se,
      preventScrollReset: Ne,
      replace: H && H.replace,
      enableViewTransition: H && H.viewTransition,
      flushSync: Ze,
      callSiteDefaultShouldRevalidate: H && H.unstable_defaultShouldRevalidate
    });
  }
  function Oe() {
    Ve || (Ve = My()), nt(), et({ revalidation: "loading" });
    let z = Ve.promise;
    return D.navigation.state === "submitting" ? z : D.navigation.state === "idle" ? (De(D.historyAction, D.location, {
      startUninterruptedRevalidation: !0
    }), z) : (De(
      I || D.historyAction,
      D.navigation.location,
      {
        overrideNavigation: D.navigation,
        // Proxy through any rending view transition
        enableViewTransition: te === !0
      }
    ), z);
  }
  async function De(z, H, Y) {
    re && re.abort(), re = null, I = z, O = (Y && Y.startUninterruptedRevalidation) === !0, Dt(D.location, D.matches), ie = (Y && Y.preventScrollReset) === !0, te = (Y && Y.enableViewTransition) === !0;
    let ue = g || m, de = Y && Y.overrideNavigation, Se = Y?.initialHydration && D.matches && D.matches.length > 0 && !A ? (
      // `matchRoutes()` has already been called if we're in here via `router.initialize()`
      D.matches
    ) : vr(ue, H, p), pe = (Y && Y.flushSync) === !0;
    if (Se && D.initialized && !R && aN(D.location, H) && !(Y && Y.submission && on(Y.submission.formMethod))) {
      pt(H, { matches: Se }, { flushSync: pe });
      return;
    }
    let ve = wn(Se, ue, H.pathname);
    if (ve.active && ve.matches && (Se = ve.matches), !Se) {
      let { error: st, notFoundMatches: St, route: Fe } = hn(
        H.pathname
      );
      pt(
        H,
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
    let je = Hi(
      t.history,
      H,
      re.signal,
      Y && Y.submission
    ), be = t.getContext ? await t.getContext() : new cy(), Re;
    if (Y && Y.pendingError)
      Re = [
        gr(Se).route.id,
        { type: "error", error: Y.pendingError }
      ];
    else if (Y && Y.submission && on(Y.submission.formMethod)) {
      let st = await Te(
        je,
        H,
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
        if (An(Fe) && ml(Fe.error) && Fe.error.status === 404) {
          re = null, pt(H, {
            matches: st.matches,
            loaderData: {},
            errors: {
              [St]: Fe.error
            }
          });
          return;
        }
      }
      Se = st.matches || Se, Re = st.pendingActionResult, de = sf(H, Y.submission), pe = !1, ve.active = !1, je = Hi(
        t.history,
        je.url,
        je.signal
      );
    }
    let {
      shortCircuited: Ne,
      matches: Ze,
      loaderData: He,
      errors: dt
    } = await bt(
      je,
      H,
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
    Ne || (re = null, pt(H, {
      matches: Ze || Se,
      ...Ty(Re),
      loaderData: He,
      errors: dt
    }));
  }
  async function Te(z, H, Y, ue, de, Se, pe, ve = {}) {
    nt();
    let je = dN(H, Y);
    if (et({ navigation: je }, { flushSync: ve.flushSync === !0 }), Se) {
      let Ne = await it(
        ue,
        H.pathname,
        z.signal
      );
      if (Ne.type === "aborted")
        return { shortCircuited: !0 };
      if (Ne.type === "error") {
        if (Ne.partialMatches.length === 0) {
          let { matches: He, route: dt } = qo(m);
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
          H.pathname
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
    let be, Re = oc(ue, H);
    if (!Re.route.action && !Re.route.lazy)
      be = {
        type: "error",
        error: Yn(405, {
          method: z.method,
          pathname: H.pathname,
          routeId: Re.route.id
        })
      };
    else {
      let Ne = Xi(
        d,
        h,
        z,
        H,
        ue,
        Re,
        pe ? [] : l,
        de
      ), Ze = await ze(
        z,
        H,
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
      if (z.signal.aborted)
        return { shortCircuited: !0 };
    }
    if (Yr(be)) {
      let Ne;
      return ve && ve.replace != null ? Ne = ve.replace : Ne = wy(
        be.response.headers.get("Location"),
        new URL(z.url),
        p,
        t.history
      ) === D.location.pathname + D.location.search, await ye(z, be, !0, {
        submission: Y,
        replace: Ne
      }), { shortCircuited: !0 };
    }
    if (An(be)) {
      let Ne = gr(ue, Re.route.id);
      return (ve && ve.replace) !== !0 && (I = "PUSH"), {
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
  async function bt(z, H, Y, ue, de, Se, pe, ve, je, be, Re, Ne, Ze) {
    let He = Se || sf(H, pe), dt = pe || ve || Ry(He), st = !O && !be;
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
        H.pathname,
        z.signal
      );
      if (qe.type === "aborted")
        return { shortCircuited: !0 };
      if (qe.type === "error") {
        if (qe.partialMatches.length === 0) {
          let { matches: sn, route: kt } = qo(m);
          return {
            matches: sn,
            loaderData: {},
            errors: {
              [kt.id]: qe.error
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
        let { error: Ct, notFoundMatches: sn, route: kt } = hn(
          H.pathname
        );
        return {
          matches: sn,
          loaderData: {},
          errors: {
            [kt.id]: Ct
          }
        };
      }
    }
    let St = g || m, { dsMatches: Fe, revalidatingFetchers: zt } = vy(
      z,
      ue,
      d,
      h,
      t.history,
      D,
      Y,
      dt,
      H,
      be ? [] : l,
      be === !0,
      R,
      U,
      ge,
      le,
      K,
      St,
      p,
      t.patchRoutesOnNavigation != null,
      Ne,
      Ze
    );
    if (_ = ++Z, !t.dataStrategy && !Fe.some((qe) => qe.shouldLoad) && !Fe.some(
      (qe) => qe.route.middleware && qe.route.middleware.length > 0
    ) && zt.length === 0) {
      let qe = ei();
      return pt(
        H,
        {
          matches: Y,
          loaderData: {},
          // Commit pending error if we're short circuiting
          errors: Ne && An(Ne[1]) ? { [Ne[0]]: Ne[1].error } : null,
          ...Ty(Ne),
          ...qe ? { fetchers: new Map(D.fetchers) } : {}
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
      zt.length > 0 && (qe.fetchers = un(zt)), et(qe, { flushSync: Re });
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
      z,
      H,
      ue
    );
    if (z.signal.aborted)
      return { shortCircuited: !0 };
    re && re.signal.removeEventListener(
      "abort",
      mt
    ), zt.forEach((qe) => B.delete(qe.key));
    let Kt = Io(qa);
    if (Kt)
      return await ye(z, Kt.result, !0, {
        replace: je
      }), { shortCircuited: !0 };
    if (Kt = Io(Wn), Kt)
      return K.add(Kt.key), await ye(z, Kt.result, !0, {
        replace: je
      }), { shortCircuited: !0 };
    let { loaderData: oa, errors: Nr } = Ey(
      D,
      Y,
      qa,
      Ne,
      zt,
      Wn
    );
    be && D.errors && (Nr = { ...D.errors, ...Nr });
    let ca = ei(), Tr = Ha(_), ti = ca || Tr || zt.length > 0;
    return {
      matches: Y,
      loaderData: oa,
      errors: Nr,
      ...ti ? { fetchers: new Map(D.fetchers) } : {}
    };
  }
  function xt(z) {
    if (z && !An(z[1]))
      return {
        [z[0]]: z[1].data
      };
    if (D.actionData)
      return Object.keys(D.actionData).length === 0 ? null : D.actionData;
  }
  function un(z) {
    return z.forEach((H) => {
      let Y = D.fetchers.get(H.key), ue = Qs(
        void 0,
        Y ? Y.data : void 0
      );
      D.fetchers.set(H.key, ue);
    }), new Map(D.fetchers);
  }
  async function Ht(z, H, Y, ue) {
    Tt(z);
    let de = (ue && ue.flushSync) === !0, Se = g || m, pe = Xf(
      D.location,
      D.matches,
      p,
      Y,
      H,
      ue?.relative
    ), ve = vr(Se, pe, p), je = wn(ve, Se, pe);
    if (je.active && je.matches && (ve = je.matches), !ve) {
      Ft(
        z,
        H,
        Yn(404, { pathname: pe }),
        { flushSync: de }
      );
      return;
    }
    let { path: be, submission: Re, error: Ne } = py(
      !0,
      pe,
      ue
    );
    if (Ne) {
      Ft(z, H, Ne, { flushSync: de });
      return;
    }
    let Ze = t.getContext ? await t.getContext() : new cy(), He = (ue && ue.preventScrollReset) === !0;
    if (Re && on(Re.formMethod)) {
      await kn(
        z,
        H,
        be,
        ve,
        Ze,
        je.active,
        de,
        He,
        Re,
        ue && ue.unstable_defaultShouldRevalidate
      );
      return;
    }
    le.set(z, { routeId: H, path: be }), await qt(
      z,
      H,
      be,
      ve,
      Ze,
      je.active,
      de,
      He,
      Re
    );
  }
  async function kn(z, H, Y, ue, de, Se, pe, ve, je, be) {
    nt(), le.delete(z);
    let Re = D.fetchers.get(z);
    It(z, fN(je, Re), {
      flushSync: pe
    });
    let Ne = new AbortController(), Ze = Hi(
      t.history,
      Y,
      Ne.signal,
      je
    );
    if (Se) {
      let vt = await it(
        ue,
        new URL(Ze.url).pathname,
        Ze.signal,
        z
      );
      if (vt.type === "aborted")
        return;
      if (vt.type === "error") {
        Ft(z, H, vt.error, { flushSync: pe });
        return;
      } else if (vt.matches)
        ue = vt.matches;
      else {
        Ft(
          z,
          H,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let He = oc(ue, Y);
    if (!He.route.action && !He.route.lazy) {
      let vt = Yn(405, {
        method: je.formMethod,
        pathname: Y,
        routeId: H
      });
      Ft(z, H, vt, { flushSync: pe });
      return;
    }
    B.set(z, Ne);
    let dt = Z, st = Xi(
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
      z
    ), Fe = St[He.route.id];
    if (!Fe) {
      for (let vt of st)
        if (St[vt.route.id]) {
          Fe = St[vt.route.id];
          break;
        }
    }
    if (Ze.signal.aborted) {
      B.get(z) === Ne && B.delete(z);
      return;
    }
    if (ge.has(z)) {
      if (Yr(Fe) || An(Fe)) {
        It(z, La(void 0));
        return;
      }
    } else {
      if (Yr(Fe))
        if (B.delete(z), _ > dt) {
          It(z, La(void 0));
          return;
        } else
          return K.add(z), It(z, Qs(je)), ye(Ze, Fe, !1, {
            fetcherSubmission: je,
            preventScrollReset: ve
          });
      if (An(Fe)) {
        Ft(z, H, Fe.error);
        return;
      }
    }
    let zt = D.navigation.location || D.location, mt = Hi(
      t.history,
      zt,
      Ne.signal
    ), qa = g || m, Wn = D.navigation.state !== "idle" ? vr(qa, D.navigation.location, p) : D.matches;
    Ie(Wn, "Didn't find any matches after fetcher action");
    let Kt = ++Z;
    J.set(z, Kt);
    let oa = Qs(je, Fe.data);
    D.fetchers.set(z, oa);
    let { dsMatches: Nr, revalidatingFetchers: ca } = vy(
      mt,
      de,
      d,
      h,
      t.history,
      D,
      Wn,
      je,
      zt,
      l,
      !1,
      R,
      U,
      ge,
      le,
      K,
      qa,
      p,
      t.patchRoutesOnNavigation != null,
      [He.route.id, Fe],
      be
    );
    ca.filter((vt) => vt.key !== z).forEach((vt) => {
      let ni = vt.key, ai = D.fetchers.get(ni), _l = Qs(
        void 0,
        ai ? ai.data : void 0
      );
      D.fetchers.set(ni, _l), Tt(ni), vt.controller && B.set(ni, vt.controller);
    }), et({ fetchers: new Map(D.fetchers) });
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
    ), J.delete(z), B.delete(z), ca.forEach((vt) => B.delete(vt.key)), D.fetchers.has(z)) {
      let vt = La(Fe.data);
      D.fetchers.set(z, vt);
    }
    let Ct = Io(ti);
    if (Ct)
      return ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    if (Ct = Io(qe), Ct)
      return K.add(Ct.key), ye(
        mt,
        Ct.result,
        !1,
        { preventScrollReset: ve }
      );
    let { loaderData: sn, errors: kt } = Ey(
      D,
      Wn,
      ti,
      void 0,
      ca,
      qe
    );
    Ha(Kt), D.navigation.state === "loading" && Kt > _ ? (Ie(I, "Expected pending action"), re && re.abort(), pt(D.navigation.location, {
      matches: Wn,
      loaderData: sn,
      errors: kt,
      fetchers: new Map(D.fetchers)
    })) : (et({
      errors: kt,
      loaderData: Ny(
        D.loaderData,
        sn,
        Wn,
        kt
      ),
      fetchers: new Map(D.fetchers)
    }), R = !1);
  }
  async function qt(z, H, Y, ue, de, Se, pe, ve, je) {
    let be = D.fetchers.get(z);
    It(
      z,
      Qs(
        je,
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
        z
      );
      if (Fe.type === "aborted")
        return;
      if (Fe.type === "error") {
        Ft(z, H, Fe.error, { flushSync: pe });
        return;
      } else if (Fe.matches)
        ue = Fe.matches;
      else {
        Ft(
          z,
          H,
          Yn(404, { pathname: Y }),
          { flushSync: pe }
        );
        return;
      }
    }
    let Ze = oc(ue, Y);
    B.set(z, Re);
    let He = Z, dt = Xi(
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
      z
    ), St = st[Ze.route.id];
    if (!St) {
      for (let Fe of ue)
        if (st[Fe.route.id]) {
          St = st[Fe.route.id];
          break;
        }
    }
    if (B.get(z) === Re && B.delete(z), !Ne.signal.aborted) {
      if (ge.has(z)) {
        It(z, La(void 0));
        return;
      }
      if (Yr(St))
        if (_ > He) {
          It(z, La(void 0));
          return;
        } else {
          K.add(z), await ye(Ne, St, !1, {
            preventScrollReset: ve
          });
          return;
        }
      if (An(St)) {
        Ft(z, H, St.error);
        return;
      }
      It(z, La(St.data));
    }
  }
  async function ye(z, H, Y, {
    submission: ue,
    fetcherSubmission: de,
    preventScrollReset: Se,
    replace: pe
  } = {}) {
    Y || (F?.resolve(), F = null), H.response.headers.has("X-Remix-Revalidate") && (R = !0);
    let ve = H.response.headers.get("Location");
    Ie(ve, "Expected a Location header on the redirect Response"), ve = wy(
      ve,
      new URL(z.url),
      p,
      t.history
    );
    let je = Gf(D.location, ve, {
      _isRedirect: !0
    });
    if (i) {
      let dt = !1;
      if (H.response.headers.has("X-Remix-Reload-Document"))
        dt = !0;
      else if (Eh(ve)) {
        const st = lE(ve, !0);
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
    let be = pe === !0 || H.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH", { formMethod: Re, formAction: Ne, formEncType: Ze } = D.navigation;
    !ue && !de && Re && Ne && Ze && (ue = Ry(D.navigation));
    let He = ue || de;
    if (HE.has(H.response.status) && He && on(He.formMethod))
      await De(be, je, {
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
        je,
        ue
      );
      await De(be, je, {
        overrideNavigation: dt,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission: de,
        // Preserve these flags across redirects
        preventScrollReset: Se || ie,
        enableViewTransition: Y ? te : void 0
      });
    }
  }
  async function ze(z, H, Y, ue, de) {
    let Se, pe = {};
    try {
      Se = await ZE(
        b,
        z,
        H,
        Y,
        de,
        ue,
        !1
      );
    } catch (ve) {
      return Y.filter((je) => je.shouldLoad).forEach((je) => {
        pe[je.route.id] = {
          type: "error",
          error: ve
        };
      }), pe;
    }
    if (z.signal.aborted)
      return pe;
    if (!on(z.method))
      for (let ve of Y) {
        if (Se[ve.route.id]?.type === "error")
          break;
        !Se.hasOwnProperty(ve.route.id) && !D.loaderData.hasOwnProperty(ve.route.id) && (!D.errors || !D.errors.hasOwnProperty(ve.route.id)) && ve.shouldCallHandler() && (Se[ve.route.id] = {
          type: "error",
          result: new Error(
            `No result returned from dataStrategy for route ${ve.route.id}`
          )
        });
      }
    for (let [ve, je] of Object.entries(Se))
      if (lN(je)) {
        let be = je.result;
        pe[ve] = {
          type: "redirect",
          response: tN(
            be,
            z,
            ve,
            Y,
            p
          )
        };
      } else
        pe[ve] = await eN(je);
    return pe;
  }
  async function Qe(z, H, Y, ue, de) {
    let Se = ze(
      Y,
      ue,
      z,
      de,
      null
    ), pe = Promise.all(
      H.map(async (be) => {
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
    ), ve = await Se, je = (await pe).reduce(
      (be, Re) => Object.assign(be, Re),
      {}
    );
    return {
      loaderResults: ve,
      fetcherResults: je
    };
  }
  function nt() {
    R = !0, le.forEach((z, H) => {
      B.has(H) && U.add(H), Tt(H);
    });
  }
  function It(z, H, Y = {}) {
    D.fetchers.set(z, H), et(
      { fetchers: new Map(D.fetchers) },
      { flushSync: (Y && Y.flushSync) === !0 }
    );
  }
  function Ft(z, H, Y, ue = {}) {
    let de = gr(D.matches, H);
    Zn(z), et(
      {
        errors: {
          [de.route.id]: Y
        },
        fetchers: new Map(D.fetchers)
      },
      { flushSync: (ue && ue.flushSync) === !0 }
    );
  }
  function Er(z) {
    return fe.set(z, (fe.get(z) || 0) + 1), ge.has(z) && ge.delete(z), D.fetchers.get(z) || qE;
  }
  function sa(z, H) {
    Tt(z, H?.reason), It(z, La(null));
  }
  function Zn(z) {
    let H = D.fetchers.get(z);
    B.has(z) && !(H && H.state === "loading" && J.has(z)) && Tt(z), le.delete(z), J.delete(z), K.delete(z), ge.delete(z), U.delete(z), D.fetchers.delete(z);
  }
  function Jt(z) {
    let H = (fe.get(z) || 0) - 1;
    H <= 0 ? (fe.delete(z), ge.add(z)) : fe.set(z, H), et({ fetchers: new Map(D.fetchers) });
  }
  function Tt(z, H) {
    let Y = B.get(z);
    Y && (Y.abort(H), B.delete(z));
  }
  function Yt(z) {
    for (let H of z) {
      let Y = Er(H), ue = La(Y.data);
      D.fetchers.set(H, ue);
    }
  }
  function ei() {
    let z = [], H = !1;
    for (let Y of K) {
      let ue = D.fetchers.get(Y);
      Ie(ue, `Expected fetcher: ${Y}`), ue.state === "loading" && (K.delete(Y), z.push(Y), H = !0);
    }
    return Yt(z), H;
  }
  function Ha(z) {
    let H = [];
    for (let [Y, ue] of J)
      if (ue < z) {
        let de = D.fetchers.get(Y);
        Ie(de, `Expected fetcher: ${Y}`), de.state === "loading" && (Tt(Y), J.delete(Y), H.push(Y));
      }
    return Yt(H), H.length > 0;
  }
  function On(z, H) {
    let Y = D.blockers.get(z) || Ks;
    return Ae.get(z) !== H && Ae.set(z, H), Y;
  }
  function ga(z) {
    D.blockers.delete(z), Ae.delete(z);
  }
  function Jn(z, H) {
    let Y = D.blockers.get(z) || Ks;
    Ie(
      Y.state === "unblocked" && H.state === "blocked" || Y.state === "blocked" && H.state === "blocked" || Y.state === "blocked" && H.state === "proceeding" || Y.state === "blocked" && H.state === "unblocked" || Y.state === "proceeding" && H.state === "unblocked",
      `Invalid blocker state transition: ${Y.state} -> ${H.state}`
    );
    let ue = new Map(D.blockers);
    ue.set(z, H), et({ blockers: ue });
  }
  function la({
    currentLocation: z,
    nextLocation: H,
    historyAction: Y
  }) {
    if (Ae.size === 0)
      return;
    Ae.size > 1 && _t(!1, "A router only supports one blocker at a time");
    let ue = Array.from(Ae.entries()), [de, Se] = ue[ue.length - 1], pe = D.blockers.get(de);
    if (!(pe && pe.state === "proceeding") && Se({ currentLocation: z, nextLocation: H, historyAction: Y }))
      return de;
  }
  function hn(z) {
    let H = Yn(404, { pathname: z }), Y = g || m, { matches: ue, route: de } = qo(Y);
    return { notFoundMatches: ue, route: de, error: H };
  }
  function ke(z, H, Y) {
    if (j = z, M = H, T = Y || null, !N && D.navigation === rf) {
      N = !0;
      let ue = Gt(D.location, D.matches);
      ue != null && et({ restoreScrollPosition: ue });
    }
    return () => {
      j = null, M = null, T = null;
    };
  }
  function ut(z, H) {
    return T && T(
      z,
      H.map((ue) => hE(ue, D.loaderData))
    ) || z.key;
  }
  function Dt(z, H) {
    if (j && M) {
      let Y = ut(z, H);
      j[Y] = M();
    }
  }
  function Gt(z, H) {
    if (j) {
      let Y = ut(z, H), ue = j[Y];
      if (typeof ue == "number")
        return ue;
    }
    return null;
  }
  function wn(z, H, Y) {
    if (t.patchRoutesOnNavigation)
      if (z) {
        if (Object.keys(z[0].params).length > 0)
          return { active: !0, matches: ll(
            H,
            Y,
            p,
            !0
          ) };
      } else
        return { active: !0, matches: ll(
          H,
          Y,
          p,
          !0
        ) || [] };
    return { active: !1, matches: null };
  }
  async function it(z, H, Y, ue) {
    if (!t.patchRoutesOnNavigation)
      return { type: "success", matches: z };
    let de = z;
    for (; ; ) {
      let Se = g == null, pe = g || m, ve = h;
      try {
        await t.patchRoutesOnNavigation({
          signal: Y,
          path: H,
          matches: de,
          fetcherKey: ue,
          patch: (Re, Ne) => {
            Y.aborted || gy(
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
      let je = vr(pe, H, p), be = null;
      if (je) {
        if (Object.keys(je[0].params).length === 0)
          return { type: "success", matches: je };
        if (be = ll(
          pe,
          H,
          p,
          !0
        ), !(be && de.length < be.length && Wt(
          de,
          be.slice(0, de.length)
        )))
          return { type: "success", matches: je };
      }
      if (be || (be = ll(
        pe,
        H,
        p,
        !0
      )), !be || Wt(de, be))
        return { type: "success", matches: null };
      de = be;
    }
  }
  function Wt(z, H) {
    return z.length === H.length && z.every((Y, ue) => Y.route.id === H[ue].route.id);
  }
  function ya(z) {
    h = {}, g = hl(
      z,
      d,
      void 0,
      h
    );
  }
  function rn(z, H, Y = !1) {
    let ue = g == null;
    gy(
      z,
      H,
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
      return D;
    },
    get routes() {
      return m;
    },
    get window() {
      return a;
    },
    initialize: Zt,
    subscribe: At,
    enableScrollRestoration: ke,
    navigate: he,
    fetch: Ht,
    revalidate: Oe,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (z) => t.history.createHref(z),
    encodeLocation: (z) => t.history.encodeLocation(z),
    getFetcher: Er,
    resetFetcher: sa,
    deleteFetcher: Jt,
    dispose: Pt,
    getBlocker: On,
    deleteBlocker: ga,
    patchRoutes: rn,
    _internalFetchControllers: B,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes: ya,
    _internalSetStateDoNotUseOrYouWillBreakYourApp(z) {
      et(z);
    }
  }, t.unstable_instrumentations && (ne = zE(
    ne,
    t.unstable_instrumentations.map((z) => z.router).filter(Boolean)
  )), ne;
}
function YE(t) {
  return t != null && ("formData" in t && t.formData != null || "body" in t && t.body !== void 0);
}
function Xf(t, a, i, l, o, d) {
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
  let g = _c(
    l || ".",
    Nh(h),
    Kn(t.pathname, i) || t.pathname,
    d === "path"
  );
  if (l == null && (g.search = t.search, g.hash = t.hash), (l == null || l === "" || l === ".") && m) {
    let p = Mh(g.search);
    if (m.route.index && !p)
      g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let b = new URLSearchParams(g.search), v = b.getAll("index");
      b.delete("index"), v.filter((w) => w).forEach((w) => b.append("index", w));
      let S = b.toString();
      g.search = S ? `?${S}` : "";
    }
  }
  return i !== "/" && (g.pathname = TE({ basename: i, pathname: g.pathname })), pa(g);
}
function py(t, a, i) {
  if (!i || !YE(i))
    return { path: a };
  if (i.formMethod && !uN(i.formMethod))
    return {
      path: a,
      error: Yn(405, { method: i.formMethod })
    };
  let l = () => ({
    path: a,
    error: Yn(400, { type: "invalid-body" })
  }), d = (i.formMethod || "get").toUpperCase(), h = Rx(a);
  if (i.body !== void 0) {
    if (i.formEncType === "text/plain") {
      if (!on(d))
        return l();
      let v = typeof i.body == "string" ? i.body : i.body instanceof FormData || i.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(i.body.entries()).reduce(
          (S, [w, j]) => `${S}${w}=${j}
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
      if (!on(d))
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
    m = Kf(i.formData), g = i.formData;
  else if (i.body instanceof FormData)
    m = Kf(i.body), g = i.body;
  else if (i.body instanceof URLSearchParams)
    m = i.body, g = jy(m);
  else if (i.body == null)
    m = new URLSearchParams(), g = new FormData();
  else
    try {
      m = new URLSearchParams(i.body), g = jy(m);
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
  if (on(p.formMethod))
    return { path: a, submission: p };
  let b = ia(a);
  return t && b.search && Mh(b.search) && m.append("index", ""), b.search = `?${m}`, { path: pa(b), submission: p };
}
function vy(t, a, i, l, o, d, h, m, g, p, b, v, S, w, j, T, M, N, k, A, C) {
  let V = A ? An(A[1]) ? A[1].error : A[1].data : void 0, G = o.createURL(d.location), ne = o.createURL(g), D;
  if (b && d.errors) {
    let W = Object.keys(d.errors)[0];
    D = h.findIndex((O) => O.route.id === W);
  } else if (A && An(A[1])) {
    let W = A[0];
    D = h.findIndex((O) => O.route.id === W) - 1;
  }
  let I = A ? A[1].statusCode : void 0, F = I && I >= 400, ie = {
    currentUrl: G,
    currentParams: d.matches[0]?.params || {},
    nextUrl: ne,
    nextParams: h[0].params,
    ...m,
    actionResult: V,
    actionStatus: I
  }, re = xl(h), te = h.map((W, O) => {
    let { route: R } = W, U = null;
    if (D != null && O > D)
      U = !1;
    else if (R.lazy)
      U = !0;
    else if (!Ch(R))
      U = !1;
    else if (b) {
      let { shouldLoad: J } = Sx(
        R,
        d.loaderData,
        d.errors
      );
      U = J;
    } else GE(d.loaderData, d.matches[O], W) && (U = !0);
    if (U !== null)
      return Pf(
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
    typeof C == "boolean" ? B = C : F ? B = !1 : (v || G.pathname + G.search === ne.pathname + ne.search || G.search !== ne.search || XE(d.matches[O], W)) && (B = !0);
    let Z = {
      ...ie,
      defaultShouldRevalidate: B
    }, _ = cl(W, Z);
    return Pf(
      i,
      l,
      t,
      g,
      re,
      W,
      p,
      a,
      _,
      Z,
      C
    );
  }), ce = [];
  return j.forEach((W, O) => {
    if (b || !h.some((le) => le.route.id === W.routeId) || w.has(O))
      return;
    let R = d.fetchers.get(O), U = R && R.state !== "idle" && R.data === void 0, B = vr(M, W.path, N);
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
    if (T.has(O))
      return;
    let Z = oc(B, W.path), _ = new AbortController(), J = Hi(
      o,
      W.path,
      _.signal
    ), K = null;
    if (S.has(O))
      S.delete(O), K = Xi(
        i,
        l,
        J,
        W.path,
        B,
        Z,
        p,
        a
      );
    else if (U)
      v && (K = Xi(
        i,
        l,
        J,
        W.path,
        B,
        Z,
        p,
        a
      ));
    else {
      let le;
      typeof C == "boolean" ? le = C : F ? le = !1 : le = v;
      let fe = {
        ...ie,
        defaultShouldRevalidate: le
      };
      cl(Z, fe) && (K = Xi(
        i,
        l,
        J,
        W.path,
        B,
        Z,
        p,
        a,
        fe
      ));
    }
    K && ce.push({
      key: O,
      routeId: W.routeId,
      path: W.path,
      matches: K,
      match: Z,
      request: J,
      controller: _
    });
  }), { dsMatches: te, revalidatingFetchers: ce };
}
function Ch(t) {
  return t.loader != null || t.middleware != null && t.middleware.length > 0;
}
function Sx(t, a, i) {
  if (t.lazy)
    return { shouldLoad: !0, renderFallback: !0 };
  if (!Ch(t))
    return { shouldLoad: !1, renderFallback: !1 };
  let l = a != null && t.id in a, o = i != null && i[t.id] !== void 0;
  if (!l && o)
    return { shouldLoad: !1, renderFallback: !1 };
  if (typeof t.loader == "function" && t.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !l };
  let d = !l && !o;
  return { shouldLoad: d, renderFallback: d };
}
function GE(t, a, i) {
  let l = (
    // [a] -> [a, b]
    !a || // [a, b] -> [a, c]
    i.route.id !== a.route.id
  ), o = !t.hasOwnProperty(i.route.id);
  return l || o;
}
function XE(t, a) {
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
function gy(t, a, i, l, o, d) {
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
      (v) => wx(p, v)
    );
    b ? g.push({ existingRoute: b, newRoute: p }) : m.push(p);
  }), m.length > 0) {
    let p = hl(
      m,
      o,
      [t || "_", "patch", String(h?.length || "0")],
      l
    );
    h.push(...p);
  }
  if (d && g.length > 0)
    for (let p = 0; p < g.length; p++) {
      let { existingRoute: b, newRoute: v } = g[p], S = b, [w] = hl(
        [v],
        o,
        [],
        // Doesn't matter for mutated routes since they already have an id
        {},
        // Don't touch the manifest here since we're updating in place
        !0
      );
      Object.assign(S, {
        element: w.element ? w.element : S.element,
        errorElement: w.errorElement ? w.errorElement : S.errorElement,
        hydrateFallbackElement: w.hydrateFallbackElement ? w.hydrateFallbackElement : S.hydrateFallbackElement
      });
    }
}
function wx(t, a) {
  return "id" in t && "id" in a && t.id === a.id ? !0 : t.index === a.index && t.path === a.path && t.caseSensitive === a.caseSensitive ? (!t.children || t.children.length === 0) && (!a.children || a.children.length === 0) ? !0 : t.children?.every(
    (i, l) => a.children?.some((o) => wx(i, o))
  ) ?? !1 : !1;
}
var yy = /* @__PURE__ */ new WeakMap(), jx = ({
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
  let h = yy.get(o);
  h || (h = {}, yy.set(o, h));
  let m = h[t];
  if (m)
    return m;
  let g = (async () => {
    let p = cE(t), v = o[t] !== void 0 && t !== "hasErrorBoundary";
    if (p)
      _t(
        !p,
        "Route property " + t + " is not a supported lazy route property. This property will be ignored."
      ), h[t] = Promise.resolve();
    else if (v)
      _t(
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
}, by = /* @__PURE__ */ new WeakMap();
function PE(t, a, i, l, o) {
  let d = i[t.id];
  if (Ie(d, "No route found in manifest"), !t.lazy)
    return {
      lazyRoutePromise: void 0,
      lazyHandlerPromise: void 0
    };
  if (typeof t.lazy == "function") {
    let b = by.get(d);
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
      let S = await t.lazy(), w = {};
      for (let j in S) {
        let T = S[j];
        if (T === void 0)
          continue;
        let M = dE(j), k = d[j] !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        j !== "hasErrorBoundary";
        M ? _t(
          !M,
          "Route property " + j + " is not a supported property to be returned from a lazy route function. This property will be ignored."
        ) : k ? _t(
          !k,
          `Route "${d.id}" has a static property "${j}" defined but its lazy function is also returning a value for this property. The lazy route property "${j}" will be ignored.`
        ) : w[j] = T;
      }
      Object.assign(d, w), Object.assign(d, {
        // To keep things framework agnostic, we use the provided `mapRouteProperties`
        // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
        // since the logic will differ between frameworks.
        ...l(d),
        lazy: void 0
      });
    })();
    return by.set(d, v), v.catch(() => {
    }), {
      lazyRoutePromise: v,
      lazyHandlerPromise: v
    };
  }
  let h = Object.keys(t.lazy), m = [], g;
  for (let b of h) {
    if (o && o.includes(b))
      continue;
    let v = jx({
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
async function xy(t) {
  let a = t.matches.filter((o) => o.shouldLoad), i = {};
  return (await Promise.all(a.map((o) => o.resolve()))).forEach((o, d) => {
    i[a[d].route.id] = o;
  }), i;
}
async function KE(t) {
  return t.matches.some((a) => a.route.middleware) ? Ex(t, () => xy(t)) : xy(t);
}
function Ex(t, a) {
  return QE(
    t,
    a,
    (l) => {
      if (cN(l))
        throw l;
      return l;
    },
    iN,
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
async function QE(t, a, i, l, o) {
  let { matches: d, ...h } = t, m = d.flatMap(
    (p) => p.route.middleware ? p.route.middleware.map((b) => [p.route.id, b]) : []
  );
  return await Nx(
    h,
    m,
    a,
    i,
    l,
    o
  );
}
async function Nx(t, a, i, l, o, d, h = 0) {
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
      return v = { value: await Nx(
        t,
        a,
        i,
        l,
        o,
        d,
        h + 1
      ) }, v.value;
    } catch (w) {
      return v = { value: await d(w, p, v) }, v.value;
    }
  };
  try {
    let w = await b(t, S), j = w != null ? l(w) : void 0;
    return o(j) ? j : v ? j ?? v.value : (v = { value: await S() }, v.value);
  } catch (w) {
    return await d(w, p, v);
  }
}
function Tx(t, a, i, l, o) {
  let d = jx({
    key: "middleware",
    route: l.route,
    manifest: a,
    mapRouteProperties: t
  }), h = PE(
    l.route,
    on(i.method) ? "action" : "loader",
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
function Pf(t, a, i, l, o, d, h, m, g, p = null, b) {
  let v = !1, S = Tx(
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
    shouldCallHandler(w) {
      return v = !0, p ? typeof b == "boolean" ? cl(d, {
        ...p,
        defaultShouldRevalidate: b
      }) : typeof w == "boolean" ? cl(d, {
        ...p,
        defaultShouldRevalidate: w
      }) : cl(d, p) : g;
    },
    resolve(w) {
      let { lazy: j, loader: T, middleware: M } = d.route, N = v || g || w && !on(i.method) && (j || T), k = M && M.length > 0 && !T && !j;
      return N && (on(i.method) || !k) ? JE({
        request: i,
        path: l,
        unstable_pattern: o,
        match: d,
        lazyHandlerPromise: S?.handler,
        lazyRoutePromise: S?.route,
        handlerOverride: w,
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
    _lazyPromises: Tx(
      t,
      a,
      i,
      p,
      h
    ),
    resolve: () => Promise.resolve({ type: "data", result: void 0 })
  } : Pf(
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
async function ZE(t, a, i, l, o, d, h) {
  l.some((b) => b._lazyPromises?.middleware) && await Promise.all(l.map((b) => b._lazyPromises?.middleware));
  let m = {
    request: a,
    unstable_url: Cx(a, i),
    unstable_pattern: xl(l),
    params: l[0].params,
    context: d,
    matches: l
  }, p = await t({
    ...m,
    fetcherKey: o,
    runClientMiddleware: (b) => {
      let v = m;
      return Ex(v, () => b({
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
async function JE({
  request: t,
  path: a,
  unstable_pattern: i,
  match: l,
  lazyHandlerPromise: o,
  lazyRoutePromise: d,
  handlerOverride: h,
  scopedContext: m
}) {
  let g, p, b = on(t.method), v = b ? "action" : "loader", S = (w) => {
    let j, T = new Promise((k, A) => j = A);
    p = () => j(), t.signal.addEventListener("abort", p);
    let M = (k) => typeof w != "function" ? Promise.reject(
      new Error(
        `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${l.route.id}]`
      )
    ) : w(
      {
        request: t,
        unstable_url: Cx(t, a),
        unstable_pattern: i,
        params: l.params,
        context: m
      },
      ...k !== void 0 ? [k] : []
    ), N = (async () => {
      try {
        return { type: "data", result: await (h ? h((A) => M(A)) : M()) };
      } catch (k) {
        return { type: "error", result: k };
      }
    })();
    return Promise.race([N, T]);
  };
  try {
    let w = b ? l.route.action : l.route.loader;
    if (o || d)
      if (w) {
        let j, [T] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          S(w).catch((M) => {
            j = M;
          }),
          // Ensure all lazy route promises are resolved before continuing
          o,
          d
        ]);
        if (j !== void 0)
          throw j;
        g = T;
      } else {
        await o;
        let j = b ? l.route.action : l.route.loader;
        if (j)
          [g] = await Promise.all([S(j), d]);
        else if (v === "action") {
          let T = new URL(t.url), M = T.pathname + T.search;
          throw Yn(405, {
            method: t.method,
            pathname: M,
            routeId: l.route.id
          });
        } else
          return { type: "data", result: void 0 };
      }
    else if (w)
      g = await S(w);
    else {
      let j = new URL(t.url), T = j.pathname + j.search;
      throw Yn(404, {
        pathname: T
      });
    }
  } catch (w) {
    return { type: "error", result: w };
  } finally {
    p && t.signal.removeEventListener("abort", p);
  }
  return g;
}
async function WE(t) {
  let a = t.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? t.body == null ? null : t.json() : t.text();
}
async function eN(t) {
  let { result: a, type: i } = t;
  if (Rh(a)) {
    let l;
    try {
      l = await WE(a);
    } catch (o) {
      return { type: "error", error: o };
    }
    return i === "error" ? {
      type: "error",
      error: new Ac(a.status, a.statusText, l),
      statusCode: a.status,
      headers: a.headers
    } : {
      type: "data",
      data: l,
      statusCode: a.status,
      headers: a.headers
    };
  }
  return i === "error" ? Cy(a) ? a.data instanceof Error ? {
    type: "error",
    error: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: rN(a),
    statusCode: ml(a) ? a.status : void 0,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : {
    type: "error",
    error: a,
    statusCode: ml(a) ? a.status : void 0
  } : Cy(a) ? {
    type: "data",
    data: a.data,
    statusCode: a.init?.status,
    headers: a.init?.headers ? new Headers(a.init.headers) : void 0
  } : { type: "data", data: a };
}
function tN(t, a, i, l, o) {
  let d = t.headers.get("Location");
  if (Ie(
    d,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  ), !Eh(d)) {
    let h = l.slice(
      0,
      l.findIndex((m) => m.route.id === i) + 1
    );
    d = Xf(
      new URL(a.url),
      h,
      o,
      d
    ), t.headers.set("Location", d);
  }
  return t;
}
var Sy = [
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
function wy(t, a, i, l) {
  if (Eh(t)) {
    let o = t, d = o.startsWith("//") ? new URL(a.protocol + o) : new URL(o);
    if (Sy.includes(d.protocol))
      throw new Error("Invalid redirect location");
    let h = Kn(d.pathname, i) != null;
    if (d.origin === a.origin && h)
      return Th(d.pathname) + d.search + d.hash;
  }
  try {
    let o = l.createURL(t);
    if (Sy.includes(o.protocol))
      throw new Error("Invalid redirect location");
  } catch {
  }
  return t;
}
function Hi(t, a, i, l) {
  let o = t.createURL(Rx(a)).toString(), d = { signal: i };
  if (l && on(l.formMethod)) {
    let { formMethod: h, formEncType: m } = l;
    d.method = h.toUpperCase(), m === "application/json" ? (d.headers = new Headers({ "Content-Type": m }), d.body = JSON.stringify(l.json)) : m === "text/plain" ? d.body = l.text : m === "application/x-www-form-urlencoded" && l.formData ? d.body = Kf(l.formData) : d.body = l.formData;
  }
  return new Request(o, d);
}
function Cx(t, a) {
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
function Kf(t) {
  let a = new URLSearchParams();
  for (let [i, l] of t.entries())
    a.append(i, typeof l == "string" ? l : l.name);
  return a;
}
function jy(t) {
  let a = new FormData();
  for (let [i, l] of t.entries())
    a.append(i, l);
  return a;
}
function nN(t, a, i, l = !1, o = !1) {
  let d = {}, h = null, m, g = !1, p = {}, b = i && An(i[1]) ? i[1].error : void 0;
  return t.forEach((v) => {
    if (!(v.route.id in a))
      return;
    let S = v.route.id, w = a[S];
    if (Ie(
      !Yr(w),
      "Cannot handle redirect results in processLoaderData"
    ), An(w)) {
      let j = w.error;
      if (b !== void 0 && (j = b, b = void 0), h = h || {}, o)
        h[S] = j;
      else {
        let T = gr(t, S);
        h[T.route.id] == null && (h[T.route.id] = j);
      }
      l || (d[S] = xx), g || (g = !0, m = ml(w.error) ? w.error.status : 500), w.headers && (p[S] = w.headers);
    } else
      d[S] = w.data, w.statusCode && w.statusCode !== 200 && !g && (m = w.statusCode), w.headers && (p[S] = w.headers);
  }), b !== void 0 && i && (h = { [i[0]]: b }, i[2] && (d[i[2]] = void 0)), {
    loaderData: d,
    errors: h,
    statusCode: m || 200,
    loaderHeaders: p
  };
}
function Ey(t, a, i, l, o, d) {
  let { loaderData: h, errors: m } = nN(
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
      let w = gr(t.matches, b?.route.id);
      m && m[w.route.id] || (m = {
        ...m,
        [w.route.id]: S.error
      }), t.fetchers.delete(p);
    } else if (Yr(S))
      Ie(!1, "Unhandled fetcher revalidation redirect");
    else {
      let w = La(S.data);
      t.fetchers.set(p, w);
    }
  }), { loaderData: h, errors: m };
}
function Ny(t, a, i, l) {
  let o = Object.entries(a).filter(([, d]) => d !== xx).reduce((d, [h, m]) => (d[h] = m, d), {});
  for (let d of i) {
    let h = d.route.id;
    if (!a.hasOwnProperty(h) && t.hasOwnProperty(h) && d.route.loader && (o[h] = t[h]), l && l.hasOwnProperty(h))
      break;
  }
  return o;
}
function Ty(t) {
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
function qo(t) {
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
  return t === 400 ? (h = "Bad Request", l && a && i ? m = `You made a ${l} request to "${a}" but did not provide a \`loader\` for route "${i}", so there is no way to handle the request.` : o === "invalid-body" && (m = "Unable to encode submission body")) : t === 403 ? (h = "Forbidden", m = `Route "${i}" does not match URL "${a}"`) : t === 404 ? (h = "Not Found", m = `No route matches URL "${a}"`) : t === 405 && (h = "Method Not Allowed", l && a && i ? m = `You made a ${l.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${i}", so there is no way to handle the request.` : l && (m = `Invalid request method "${l.toUpperCase()}"`)), new Ac(
    t || 500,
    h,
    new Error(m),
    !0
  );
}
function Io(t) {
  let a = Object.entries(t);
  for (let i = a.length - 1; i >= 0; i--) {
    let [l, o] = a[i];
    if (Yr(o))
      return { key: l, result: o };
  }
}
function Rx(t) {
  let a = typeof t == "string" ? ia(t) : t;
  return pa({ ...a, hash: "" });
}
function aN(t, a) {
  return t.pathname !== a.pathname || t.search !== a.search ? !1 : t.hash === "" ? a.hash !== "" : t.hash === a.hash ? !0 : a.hash !== "";
}
function rN(t) {
  return new Ac(
    t.init?.status ?? 500,
    t.init?.statusText ?? "Internal Server Error",
    t.data
  );
}
function iN(t) {
  return t != null && typeof t == "object" && Object.entries(t).every(
    ([a, i]) => typeof a == "string" && sN(i)
  );
}
function sN(t) {
  return t != null && typeof t == "object" && "type" in t && "result" in t && (t.type === "data" || t.type === "error");
}
function lN(t) {
  return Rh(t.result) && yx.has(t.result.status);
}
function An(t) {
  return t.type === "error";
}
function Yr(t) {
  return (t && t.type) === "redirect";
}
function Cy(t) {
  return typeof t == "object" && t != null && "type" in t && "data" in t && "init" in t && t.type === "DataWithResponseInit";
}
function Rh(t) {
  return t != null && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.headers == "object" && typeof t.body < "u";
}
function oN(t) {
  return yx.has(t);
}
function cN(t) {
  return Rh(t) && oN(t.status) && t.headers.has("Location");
}
function uN(t) {
  return VE.has(t.toUpperCase());
}
function on(t) {
  return BE.has(t.toUpperCase());
}
function Mh(t) {
  return new URLSearchParams(t).getAll("index").some((a) => a === "");
}
function oc(t, a) {
  let i = typeof a == "string" ? ia(a).search : a.search;
  if (t[t.length - 1].route.index && Mh(i || ""))
    return t[t.length - 1];
  let l = hx(t);
  return l[l.length - 1];
}
function Ry(t) {
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
function dN(t, a) {
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
function Qs(t, a) {
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
function fN(t, a) {
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
function La(t) {
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
function hN(t, a) {
  try {
    let i = t.sessionStorage.getItem(
      bx
    );
    if (i) {
      let l = JSON.parse(i);
      for (let [o, d] of Object.entries(l || {}))
        d && Array.isArray(d) && a.set(o, new Set(d || []));
    }
  } catch {
  }
}
function mN(t, a) {
  if (a.size > 0) {
    let i = {};
    for (let [l, o] of a)
      i[l] = [...o];
    try {
      t.sessionStorage.setItem(
        bx,
        JSON.stringify(i)
      );
    } catch (l) {
      _t(
        !1,
        `Failed to save applied view transitions in sessionStorage (${l}).`
      );
    }
  }
}
function My() {
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
var Mx = y.createContext(!1);
function _x() {
  return y.useContext(Mx);
}
var _h = y.createContext({
  isTransitioning: !1
});
_h.displayName = "ViewTransition";
var Ax = y.createContext(
  /* @__PURE__ */ new Map()
);
Ax.displayName = "Fetchers";
var pN = y.createContext(null);
pN.displayName = "Await";
var Qn = y.createContext(
  null
);
Qn.displayName = "Navigation";
var Dc = y.createContext(
  null
);
Dc.displayName = "Location";
var $a = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
$a.displayName = "Route";
var Ah = y.createContext(null);
Ah.displayName = "RouteError";
var Dx = "REACT_ROUTER_ERROR", vN = "REDIRECT", gN = "ROUTE_ERROR_RESPONSE";
function yN(t) {
  if (t.startsWith(`${Dx}:${vN}:{`))
    try {
      let a = JSON.parse(t.slice(28));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
        return a;
    } catch {
    }
}
function bN(t) {
  if (t.startsWith(
    `${Dx}:${gN}:{`
  ))
    try {
      let a = JSON.parse(t.slice(40));
      if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
        return new Ac(
          a.status,
          a.statusText,
          a.data
        );
    } catch {
    }
}
function xN(t, { relative: a } = {}) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: i, navigator: l } = y.useContext(Qn), { hash: o, pathname: d, search: h } = El(t, { relative: a }), m = d;
  return i !== "/" && (m = d === "/" ? i : Gn([i, d])), l.createHref({ pathname: m, search: h, hash: o });
}
function wl() {
  return y.useContext(Dc) != null;
}
function Va() {
  return Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(Dc).location;
}
var zx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function kx(t) {
  y.useContext(Qn).static || y.useLayoutEffect(t);
}
function jl() {
  let { isDataRoute: t } = y.useContext($a);
  return t ? DN() : SN();
}
function SN() {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let t = y.useContext(Wr), { basename: a, navigator: i } = y.useContext(Qn), { matches: l } = y.useContext($a), { pathname: o } = Va(), d = JSON.stringify(Nh(l)), h = y.useRef(!1);
  return kx(() => {
    h.current = !0;
  }), y.useCallback(
    (g, p = {}) => {
      if (_t(h.current, zx), !h.current) return;
      if (typeof g == "number") {
        i.go(g);
        return;
      }
      let b = _c(
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
function El(t, { relative: a } = {}) {
  let { matches: i } = y.useContext($a), { pathname: l } = Va(), o = JSON.stringify(Nh(i));
  return y.useMemo(
    () => _c(
      t,
      JSON.parse(o),
      l,
      a === "path"
    ),
    [t, o, l, a]
  );
}
function wN(t, a, i) {
  Ie(
    wl(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: l } = y.useContext(Qn), { matches: o } = y.useContext($a), d = o[o.length - 1], h = d ? d.params : {}, m = d ? d.pathname : "/", g = d ? d.pathnameBase : "/", p = d && d.route;
  {
    let M = p && p.path || "";
    Ux(
      m,
      !p || M.endsWith("*") || M.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M === "/" ? "*" : `${M}/*`}">.`
    );
  }
  let b = Va(), v;
  v = b;
  let S = v.pathname || "/", w = S;
  if (g !== "/") {
    let M = g.replace(/^\//, "").split("/");
    w = "/" + S.replace(/^\//, "").split("/").slice(M.length).join("/");
  }
  let j = vr(t, { pathname: w });
  return _t(
    p || j != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), _t(
    j == null || j[j.length - 1].route.element !== void 0 || j[j.length - 1].route.Component !== void 0 || j[j.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), CN(
    j && j.map(
      (M) => Object.assign({}, M, {
        params: Object.assign({}, h, M.params),
        pathname: Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            M.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathname
        ]),
        pathnameBase: M.pathnameBase === "/" ? g : Gn([
          g,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          l.encodeLocation ? l.encodeLocation(
            M.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : M.pathnameBase
        ])
      })
    ),
    o,
    i
  );
}
function jN() {
  let t = AN(), a = ml(t) ? `${t.status} ${t.statusText}` : t instanceof Error ? t.message : JSON.stringify(t), i = t instanceof Error ? t.stack : null, l = "rgba(200,200,200, 0.5)", o = { padding: "0.5rem", backgroundColor: l }, d = { padding: "2px 4px", backgroundColor: l }, h = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    t
  ), h = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", { style: d }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", { style: d }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", { style: { fontStyle: "italic" } }, a), i ? /* @__PURE__ */ y.createElement("pre", { style: o }, i) : null, h);
}
var EN = /* @__PURE__ */ y.createElement(jN, null), Ox = class extends y.Component {
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
      const i = bN(t.digest);
      i && (t = i);
    }
    let a = t !== void 0 ? /* @__PURE__ */ y.createElement($a.Provider, { value: this.props.routeContext }, /* @__PURE__ */ y.createElement(
      Ah.Provider,
      {
        value: t,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ y.createElement(NN, { error: t }, a) : a;
  }
};
Ox.contextType = Mx;
var lf = /* @__PURE__ */ new WeakMap();
function NN({
  children: t,
  error: a
}) {
  let { basename: i } = y.useContext(Qn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let l = yN(a.digest);
    if (l) {
      let o = lf.get(a);
      if (o) throw o;
      let d = px(l.location, i);
      if (mx && !lf.get(a))
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
function TN({ routeContext: t, match: a, children: i }) {
  let l = y.useContext(Wr);
  return l && l.static && l.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = a.route.id), /* @__PURE__ */ y.createElement($a.Provider, { value: t }, i);
}
function CN(t, a = [], i) {
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
        let { loaderData: S, errors: w } = l, j = v.route.loader && !S.hasOwnProperty(v.route.id) && (!w || w[v.route.id] === void 0);
        if (v.route.lazy || j) {
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
      let w, j = !1, T = null, M = null;
      l && (w = d && v.route.id ? d[v.route.id] : void 0, T = v.route.errorElement || EN, h && (m < 0 && S === 0 ? (Ux(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), j = !0, M = null) : m === S && (j = !0, M = v.route.hydrateFallbackElement || null)));
      let N = a.concat(o.slice(0, S + 1)), k = () => {
        let A;
        return w ? A = T : j ? A = M : v.route.Component ? A = /* @__PURE__ */ y.createElement(v.route.Component, null) : v.route.element ? A = v.route.element : A = b, /* @__PURE__ */ y.createElement(
          TN,
          {
            match: v,
            routeContext: {
              outlet: b,
              matches: N,
              isDataRoute: l != null
            },
            children: A
          }
        );
      };
      return l && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? /* @__PURE__ */ y.createElement(
        Ox,
        {
          location: l.location,
          revalidation: l.revalidation,
          component: T,
          error: w,
          children: k(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: p
        }
      ) : k();
    },
    null
  );
}
function Dh(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function RN(t) {
  let a = y.useContext(Wr);
  return Ie(a, Dh(t)), a;
}
function Lx(t) {
  let a = y.useContext(Sl);
  return Ie(a, Dh(t)), a;
}
function MN(t) {
  let a = y.useContext($a);
  return Ie(a, Dh(t)), a;
}
function zc(t) {
  let a = MN(t), i = a.matches[a.matches.length - 1];
  return Ie(
    i.route.id,
    `${t} can only be used on routes that contain a unique "id"`
  ), i.route.id;
}
function _N() {
  return zc(
    "useRouteId"
    /* UseRouteId */
  );
}
function Nl() {
  let t = Lx(
    "useLoaderData"
    /* UseLoaderData */
  ), a = zc(
    "useLoaderData"
    /* UseLoaderData */
  );
  return t.loaderData[a];
}
function AN() {
  let t = y.useContext(Ah), a = Lx(
    "useRouteError"
    /* UseRouteError */
  ), i = zc(
    "useRouteError"
    /* UseRouteError */
  );
  return t !== void 0 ? t : a.errors?.[i];
}
function DN() {
  let { router: t } = RN(
    "useNavigate"
    /* UseNavigateStable */
  ), a = zc(
    "useNavigate"
    /* UseNavigateStable */
  ), i = y.useRef(!1);
  return kx(() => {
    i.current = !0;
  }), y.useCallback(
    async (o, d = {}) => {
      _t(i.current, zx), i.current && (typeof o == "number" ? await t.navigate(o) : await t.navigate(o, { fromRouteId: a, ...d }));
    },
    [t, a]
  );
}
var _y = {};
function Ux(t, a, i) {
  !a && !_y[t] && (_y[t] = !0, _t(!1, i));
}
var Ay = {};
function Dy(t, a) {
  !t && !Ay[a] && (Ay[a] = !0, console.warn(a));
}
var zN = "useOptimistic", zy = Qj[zN], kN = () => {
};
function ON(t) {
  return zy ? zy(t) : [t, kN];
}
function LN(t) {
  let a = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: t.hasErrorBoundary || t.ErrorBoundary != null || t.errorElement != null
  };
  return t.Component && (t.element && _t(
    !1,
    "You should not include both `Component` and `element` on your route - `Component` will be used."
  ), Object.assign(a, {
    element: y.createElement(t.Component),
    Component: void 0
  })), t.HydrateFallback && (t.hydrateFallbackElement && _t(
    !1,
    "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
  ), Object.assign(a, {
    hydrateFallbackElement: y.createElement(t.HydrateFallback),
    HydrateFallback: void 0
  })), t.ErrorBoundary && (t.errorElement && _t(
    !1,
    "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
  ), Object.assign(a, {
    errorElement: y.createElement(t.ErrorBoundary),
    ErrorBoundary: void 0
  })), a;
}
var UN = [
  "HydrateFallback",
  "hydrateFallbackElement"
];
function BN(t, a) {
  return FE({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: iE({
      initialEntries: a?.initialEntries,
      initialIndex: a?.initialIndex
    }),
    hydrationData: a?.hydrationData,
    routes: t,
    hydrationRouteProperties: UN,
    mapRouteProperties: LN,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    unstable_instrumentations: a?.unstable_instrumentations
  }).initialize();
}
var $N = class {
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
function VN({
  router: t,
  flushSync: a,
  onError: i,
  unstable_useTransitions: l
}) {
  l = _x() || l;
  let [d, h] = y.useState(t.state), [m, g] = ON(d), [p, b] = y.useState(), [v, S] = y.useState({
    isTransitioning: !1
  }), [w, j] = y.useState(), [T, M] = y.useState(), [N, k] = y.useState(), A = y.useRef(/* @__PURE__ */ new Map()), C = y.useCallback(
    (I, { deletedFetchers: F, newErrors: ie, flushSync: re, viewTransitionOpts: te }) => {
      ie && i && Object.values(ie).forEach(
        (W) => i(W, {
          location: I.location,
          params: I.matches[0]?.params ?? {},
          unstable_pattern: xl(I.matches)
        })
      ), I.fetchers.forEach((W, O) => {
        W.data !== void 0 && A.current.set(O, W.data);
      }), F.forEach((W) => A.current.delete(W)), Dy(
        re === !1 || a != null,
        'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
      );
      let ce = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
      if (Dy(
        te == null || ce,
        "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
      ), !te || !ce) {
        a && re ? a(() => h(I)) : l === !1 ? h(I) : y.startTransition(() => {
          l === !0 && g((W) => ky(W, I)), h(I);
        });
        return;
      }
      if (a && re) {
        a(() => {
          T && (w?.resolve(), T.skipTransition()), S({
            isTransitioning: !0,
            flushSync: !0,
            currentLocation: te.currentLocation,
            nextLocation: te.nextLocation
          });
        });
        let W = t.window.document.startViewTransition(() => {
          a(() => h(I));
        });
        W.finished.finally(() => {
          a(() => {
            j(void 0), M(void 0), b(void 0), S({ isTransitioning: !1 });
          });
        }), a(() => M(W));
        return;
      }
      T ? (w?.resolve(), T.skipTransition(), k({
        state: I,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      })) : (b(I), S({
        isTransitioning: !0,
        flushSync: !1,
        currentLocation: te.currentLocation,
        nextLocation: te.nextLocation
      }));
    },
    [
      t.window,
      a,
      T,
      w,
      l,
      g,
      i
    ]
  );
  y.useLayoutEffect(() => t.subscribe(C), [t, C]);
  let V = m.initialized;
  y.useLayoutEffect(() => {
    !V && t.state.initialized && C(t.state, {
      deletedFetchers: [],
      flushSync: !1,
      newErrors: null
    });
  }, [V, C, t.state]), y.useEffect(() => {
    v.isTransitioning && !v.flushSync && j(new $N());
  }, [v]), y.useEffect(() => {
    if (w && p && t.window) {
      let I = p, F = w.promise, ie = t.window.document.startViewTransition(async () => {
        l === !1 ? h(I) : y.startTransition(() => {
          l === !0 && g((re) => ky(re, I)), h(I);
        }), await F;
      });
      ie.finished.finally(() => {
        j(void 0), M(void 0), b(void 0), S({ isTransitioning: !1 });
      }), M(ie);
    }
  }, [
    p,
    w,
    t.window,
    l,
    g
  ]), y.useEffect(() => {
    w && p && m.location.key === p.location.key && w.resolve();
  }, [w, T, m.location, p]), y.useEffect(() => {
    !v.isTransitioning && N && (b(N.state), S({
      isTransitioning: !0,
      flushSync: !1,
      currentLocation: N.currentLocation,
      nextLocation: N.nextLocation
    }), k(void 0));
  }, [v.isTransitioning, N]);
  let G = y.useMemo(() => ({
    createHref: t.createHref,
    encodeLocation: t.encodeLocation,
    go: (I) => t.navigate(I),
    push: (I, F, ie) => t.navigate(I, {
      state: F,
      preventScrollReset: ie?.preventScrollReset
    }),
    replace: (I, F, ie) => t.navigate(I, {
      replace: !0,
      state: F,
      preventScrollReset: ie?.preventScrollReset
    })
  }), [t]), ne = t.basename || "/", D = y.useMemo(
    () => ({
      router: t,
      navigator: G,
      static: !1,
      basename: ne,
      onError: i
    }),
    [t, G, ne, i]
  );
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement(Wr.Provider, { value: D }, /* @__PURE__ */ y.createElement(Sl.Provider, { value: m }, /* @__PURE__ */ y.createElement(Ax.Provider, { value: A.current }, /* @__PURE__ */ y.createElement(_h.Provider, { value: v }, /* @__PURE__ */ y.createElement(
    IN,
    {
      basename: ne,
      location: m.location,
      navigationType: m.historyAction,
      navigator: G,
      unstable_useTransitions: l
    },
    /* @__PURE__ */ y.createElement(
      HN,
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
function ky(t, a) {
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
var HN = y.memo(qN);
function qN({
  routes: t,
  future: a,
  state: i,
  isStatic: l,
  onError: o
}) {
  return wN(t, void 0, { state: i, isStatic: l, onError: o });
}
function IN({
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
    key: w = "default",
    unstable_mask: j
  } = i, T = y.useMemo(() => {
    let M = Kn(p, m);
    return M == null ? null : {
      location: {
        pathname: M,
        search: b,
        hash: v,
        state: S,
        key: w,
        unstable_mask: j
      },
      navigationType: l
    };
  }, [
    m,
    p,
    b,
    v,
    S,
    w,
    l,
    j
  ]);
  return _t(
    T != null,
    `<Router basename="${m}"> is not able to match the URL "${p}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
  ), T == null ? null : /* @__PURE__ */ y.createElement(Qn.Provider, { value: g }, /* @__PURE__ */ y.createElement(Dc.Provider, { children: a, value: T }));
}
var cc = "get", uc = "application/x-www-form-urlencoded";
function kc(t) {
  return typeof HTMLElement < "u" && t instanceof HTMLElement;
}
function FN(t) {
  return kc(t) && t.tagName.toLowerCase() === "button";
}
function YN(t) {
  return kc(t) && t.tagName.toLowerCase() === "form";
}
function GN(t) {
  return kc(t) && t.tagName.toLowerCase() === "input";
}
function XN(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function PN(t, a) {
  return t.button === 0 && // Ignore everything but left clicks
  (!a || a === "_self") && // Let browser handle "target=_blank" etc.
  !XN(t);
}
var Fo = null;
function KN() {
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
var QN = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function of(t) {
  return t != null && !QN.has(t) ? (_t(
    !1,
    `"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${uc}"`
  ), null) : t;
}
function ZN(t, a) {
  let i, l, o, d, h;
  if (YN(t)) {
    let m = t.getAttribute("action");
    l = m ? Kn(m, a) : null, i = t.getAttribute("method") || cc, o = of(t.getAttribute("enctype")) || uc, d = new FormData(t);
  } else if (FN(t) || GN(t) && (t.type === "submit" || t.type === "image")) {
    let m = t.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = t.getAttribute("formaction") || m.getAttribute("action");
    if (l = g ? Kn(g, a) : null, i = t.getAttribute("formmethod") || m.getAttribute("method") || cc, o = of(t.getAttribute("formenctype")) || of(m.getAttribute("enctype")) || uc, d = new FormData(m, t), !KN()) {
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
    i = cc, l = null, o = uc, h = t;
  }
  return d && o === "text/plain" && (h = d, d = void 0), { action: l, method: i.toLowerCase(), encType: o, formData: d, body: h };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function zh(t, a) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(a);
}
function Bx(t, a, i, l) {
  let o = typeof t == "string" ? new URL(
    t,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : t;
  return i ? o.pathname.endsWith("/") ? o.pathname = `${o.pathname}_.${l}` : o.pathname = `${o.pathname}.${l}` : o.pathname === "/" ? o.pathname = `_root.${l}` : a && Kn(o.pathname, a) === "/" ? o.pathname = `${gc(a)}/_root.${l}` : o.pathname = `${gc(o.pathname)}.${l}`, o;
}
async function JN(t, a) {
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
function WN(t) {
  return t == null ? !1 : t.href == null ? t.rel === "preload" && typeof t.imageSrcSet == "string" && typeof t.imageSizes == "string" : typeof t.rel == "string" && typeof t.href == "string";
}
async function eT(t, a, i) {
  let l = await Promise.all(
    t.map(async (o) => {
      let d = a.routes[o.route.id];
      if (d) {
        let h = await JN(d, i);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return rT(
    l.flat(1).filter(WN).filter((o) => o.rel === "stylesheet" || o.rel === "preload").map(
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
function tT(t, a, { includeHydrateFallback: i } = {}) {
  return nT(
    t.map((l) => {
      let o = a.routes[l.route.id];
      if (!o) return [];
      let d = [o.module];
      return o.clientActionModule && (d = d.concat(o.clientActionModule)), o.clientLoaderModule && (d = d.concat(o.clientLoaderModule)), i && o.hydrateFallbackModule && (d = d.concat(o.hydrateFallbackModule)), o.imports && (d = d.concat(o.imports)), d;
    }).flat(1)
  );
}
function nT(t) {
  return [...new Set(t)];
}
function aT(t) {
  let a = {}, i = Object.keys(t).sort();
  for (let l of i)
    a[l] = t[l];
  return a;
}
function rT(t, a) {
  let i = /* @__PURE__ */ new Set();
  return new Set(a), t.reduce((l, o) => {
    let d = JSON.stringify(aT(o));
    return i.has(d) || (i.add(d), l.push({ key: d, link: o })), l;
  }, []);
}
function kh() {
  let t = y.useContext(Wr);
  return zh(
    t,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), t;
}
function iT() {
  let t = y.useContext(Sl);
  return zh(
    t,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), t;
}
var Oh = y.createContext(void 0);
Oh.displayName = "FrameworkContext";
function Lh() {
  let t = y.useContext(Oh);
  return zh(
    t,
    "You must render this element inside a <HydratedRouter> element"
  ), t;
}
function sT(t, a) {
  let i = y.useContext(Oh), [l, o] = y.useState(!1), [d, h] = y.useState(!1), { onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: v } = a, S = y.useRef(null);
  y.useEffect(() => {
    if (t === "render" && h(!0), t === "viewport") {
      let T = (N) => {
        N.forEach((k) => {
          h(k.isIntersecting);
        });
      }, M = new IntersectionObserver(T, { threshold: 0.5 });
      return S.current && M.observe(S.current), () => {
        M.disconnect();
      };
    }
  }, [t]), y.useEffect(() => {
    if (l) {
      let T = setTimeout(() => {
        h(!0);
      }, 100);
      return () => {
        clearTimeout(T);
      };
    }
  }, [l]);
  let w = () => {
    o(!0);
  }, j = () => {
    o(!1), h(!1);
  };
  return i ? t !== "intent" ? [d, S, {}] : [
    d,
    S,
    {
      onFocus: Zs(m, w),
      onBlur: Zs(g, j),
      onMouseEnter: Zs(p, w),
      onMouseLeave: Zs(b, j),
      onTouchStart: Zs(v, w)
    }
  ] : [!1, S, {}];
}
function Zs(t, a) {
  return (i) => {
    t && t(i), i.defaultPrevented || a(i);
  };
}
function lT({ page: t, ...a }) {
  let i = _x(), { router: l } = kh(), o = y.useMemo(
    () => vr(l.routes, t, l.basename),
    [l.routes, t, l.basename]
  );
  return o ? i ? /* @__PURE__ */ y.createElement(cT, { page: t, matches: o, ...a }) : /* @__PURE__ */ y.createElement(uT, { page: t, matches: o, ...a }) : null;
}
function oT(t) {
  let { manifest: a, routeModules: i } = Lh(), [l, o] = y.useState([]);
  return y.useEffect(() => {
    let d = !1;
    return eT(t, a, i).then(
      (h) => {
        d || o(h);
      }
    ), () => {
      d = !0;
    };
  }, [t, a, i]), l;
}
function cT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o } = Lh(), { basename: d } = kh(), h = y.useMemo(() => {
    if (t === l.pathname + l.search + l.hash)
      return [];
    let m = Bx(
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
function uT({
  page: t,
  matches: a,
  ...i
}) {
  let l = Va(), { future: o, manifest: d, routeModules: h } = Lh(), { basename: m } = kh(), { loaderData: g, matches: p } = iT(), b = y.useMemo(
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
    let T = /* @__PURE__ */ new Set(), M = !1;
    if (a.forEach((k) => {
      let A = d.routes[k.route.id];
      !A || !A.hasLoader || (!b.some((C) => C.route.id === k.route.id) && k.route.id in g && h[k.route.id]?.shouldRevalidate || A.hasClientLoader ? M = !0 : T.add(k.route.id));
    }), T.size === 0)
      return [];
    let N = Bx(
      t,
      m,
      o.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return M && T.size > 0 && N.searchParams.set(
      "_routes",
      a.filter((k) => T.has(k.route.id)).map((k) => k.route.id).join(",")
    ), [N.pathname + N.search];
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
  ]), w = y.useMemo(
    () => tT(v, d),
    [v, d]
  ), j = oT(v);
  return /* @__PURE__ */ y.createElement(y.Fragment, null, S.map((T) => /* @__PURE__ */ y.createElement("link", { key: T, rel: "prefetch", as: "fetch", href: T, ...i })), w.map((T) => /* @__PURE__ */ y.createElement("link", { key: T, rel: "modulepreload", href: T, ...i })), j.map(({ key: T, link: M }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ y.createElement(
      "link",
      {
        key: T,
        nonce: i.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? i.crossOrigin
      }
    )
  )));
}
function dT(...t) {
  return (a) => {
    t.forEach((i) => {
      typeof i == "function" ? i(a) : i != null && (i.current = a);
    });
  };
}
var fT = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  fT && (window.__reactRouterVersion = // @ts-expect-error
  "7.14.2");
} catch {
}
var $x = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Uh = y.forwardRef(
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
    unstable_defaultShouldRevalidate: w,
    ...j
  }, T) {
    let { basename: M, navigator: N, unstable_useTransitions: k } = y.useContext(Qn), A = typeof b == "string" && $x.test(b), C = px(b, M);
    b = C.to;
    let V = xN(b, { relative: o }), G = Va(), ne = null;
    if (m) {
      let W = _c(
        m,
        [],
        G.unstable_mask ? G.unstable_mask.pathname : "/",
        !0
      );
      M !== "/" && (W.pathname = W.pathname === "/" ? M : Gn([M, W.pathname])), ne = N.createHref(W);
    }
    let [D, I, F] = sT(
      l,
      j
    ), ie = vT(b, {
      replace: h,
      unstable_mask: m,
      state: g,
      target: p,
      preventScrollReset: v,
      relative: o,
      viewTransition: S,
      unstable_defaultShouldRevalidate: w,
      unstable_useTransitions: k
    });
    function re(W) {
      a && a(W), W.defaultPrevented || ie(W);
    }
    let te = !(C.isExternal || d), ce = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ y.createElement(
        "a",
        {
          ...j,
          ...F,
          href: (te ? ne : void 0) || C.absoluteURL || V,
          onClick: te ? re : a,
          ref: dT(T, I),
          target: p,
          "data-discover": !A && i === "render" ? "true" : void 0
        }
      )
    );
    return D && !A ? /* @__PURE__ */ y.createElement(y.Fragment, null, ce, /* @__PURE__ */ y.createElement(lT, { page: V })) : ce;
  }
);
Uh.displayName = "Link";
var hT = y.forwardRef(
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
    let v = El(h, { relative: p.relative }), S = Va(), w = y.useContext(Sl), { navigator: j, basename: T } = y.useContext(Qn), M = w != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ST(v) && m === !0, N = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname, k = S.pathname, A = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    i || (k = k.toLowerCase(), A = A ? A.toLowerCase() : null, N = N.toLowerCase()), A && T && (A = Kn(A, T) || A);
    const C = N !== "/" && N.endsWith("/") ? N.length - 1 : N.length;
    let V = k === N || !o && k.startsWith(N) && k.charAt(C) === "/", G = A != null && (A === N || !o && A.startsWith(N) && A.charAt(N.length) === "/"), ne = {
      isActive: V,
      isPending: G,
      isTransitioning: M
    }, D = V ? a : void 0, I;
    typeof l == "function" ? I = l(ne) : I = [
      l,
      V ? "active" : null,
      G ? "pending" : null,
      M ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let F = typeof d == "function" ? d(ne) : d;
    return /* @__PURE__ */ y.createElement(
      Uh,
      {
        ...p,
        "aria-current": D,
        className: I,
        ref: b,
        style: F,
        to: h,
        viewTransition: m
      },
      typeof g == "function" ? g(ne) : g
    );
  }
);
hT.displayName = "NavLink";
var mT = y.forwardRef(
  ({
    discover: t = "render",
    fetcherKey: a,
    navigate: i,
    reloadDocument: l,
    replace: o,
    state: d,
    method: h = cc,
    action: m,
    onSubmit: g,
    relative: p,
    preventScrollReset: b,
    viewTransition: v,
    unstable_defaultShouldRevalidate: S,
    ...w
  }, j) => {
    let { unstable_useTransitions: T } = y.useContext(Qn), M = bT(), N = xT(m, { relative: p }), k = h.toLowerCase() === "get" ? "get" : "post", A = typeof m == "string" && $x.test(m), C = (V) => {
      if (g && g(V), V.defaultPrevented) return;
      V.preventDefault();
      let G = V.nativeEvent.submitter, ne = G?.getAttribute("formmethod") || h, D = () => M(G || V.currentTarget, {
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
      T && i !== !1 ? y.startTransition(() => D()) : D();
    };
    return /* @__PURE__ */ y.createElement(
      "form",
      {
        ref: j,
        method: k,
        action: N,
        onSubmit: l ? g : C,
        ...w,
        "data-discover": !A && t === "render" ? "true" : void 0
      }
    );
  }
);
mT.displayName = "Form";
function pT(t) {
  return `${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Vx(t) {
  let a = y.useContext(Wr);
  return Ie(a, pT(t)), a;
}
function vT(t, {
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
  let b = jl(), v = Va(), S = El(t, { relative: h });
  return y.useCallback(
    (w) => {
      if (PN(w, a)) {
        w.preventDefault();
        let j = i !== void 0 ? i : pa(v) === pa(S), T = () => b(t, {
          replace: j,
          unstable_mask: l,
          state: o,
          preventScrollReset: d,
          relative: h,
          viewTransition: m,
          unstable_defaultShouldRevalidate: g
        });
        p ? y.startTransition(() => T()) : T();
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
var gT = 0, yT = () => `__${String(++gT)}__`;
function bT() {
  let { router: t } = Vx(
    "useSubmit"
    /* UseSubmit */
  ), { basename: a } = y.useContext(Qn), i = _N(), l = t.fetch, o = t.navigate;
  return y.useCallback(
    async (d, h = {}) => {
      let { action: m, method: g, encType: p, formData: b, body: v } = ZN(
        d,
        a
      );
      if (h.navigate === !1) {
        let S = h.fetcherKey || yT();
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
function xT(t, { relative: a } = {}) {
  let { basename: i } = y.useContext(Qn), l = y.useContext($a);
  Ie(l, "useFormAction must be used inside a RouteContext");
  let [o] = l.matches.slice(-1), d = { ...El(t || ".", { relative: a }) }, h = Va();
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
function ST(t, { relative: a } = {}) {
  let i = y.useContext(_h);
  Ie(
    i != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: l } = Vx(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), o = El(t, { relative: a });
  if (!i.isTransitioning)
    return !1;
  let d = Kn(i.currentLocation.pathname, l) || i.currentLocation.pathname, h = Kn(i.nextLocation.pathname, l) || i.nextLocation.pathname;
  return vc(o.pathname, h) != null || vc(o.pathname, d) != null;
}
class es extends Error {
  constructor(a, i, l, o) {
    super(l), this.status = a, this.category = i, this.requestId = o, this.name = "ExtensionApiError";
  }
}
const va = "/api/v1/extensions/nexus.audio.emotiontts";
async function ht(t, a) {
  const i = t.startsWith("http") ? t : `${va}${t}`, l = await fetch(i, {
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
    throw new es(
      l.status,
      o?.category ?? "unknown",
      o?.message ?? l.statusText,
      o?.requestId
    );
  }
  if (l.status !== 204)
    return await l.json();
}
function wT(t, a, i) {
  const l = t.startsWith("http") ? t : `${va}${t}`, o = new EventSource(l);
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
async function jT() {
  return ht("/deployments");
}
async function Ly(t) {
  return ht(`/deployments/${t}`);
}
async function ET(t, a) {
  return ht(`/deployments/${t}/default-voice`, {
    method: "PATCH",
    body: JSON.stringify({ voiceAssetId: a })
  });
}
async function Uy(t) {
  return ht(`/mappings?deploymentId=${encodeURIComponent(t)}`);
}
async function Bh(t, a) {
  return ht("/mappings", {
    method: "POST",
    body: JSON.stringify({ ...a, deploymentId: t })
  });
}
async function ul(t, a, i) {
  return ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify(i)
    }
  );
}
async function Hx(t, a) {
  await ht(
    `/mappings/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function NT(t) {
  return ht(`/mappings/export?deploymentId=${encodeURIComponent(t)}`);
}
async function TT(t, a, i = "error") {
  return ht("/mappings/import", {
    method: "POST",
    body: JSON.stringify({ targetDeploymentId: t, mappings: a, conflictStrategy: i })
  });
}
async function CT(t, a = {}) {
  const i = new URLSearchParams();
  a.limit && i.set("limit", String(a.limit)), a.status && i.set("status", a.status);
  const l = i.toString(), o = l ? `?${l}` : "";
  return ht(`/deployments/${t}/runs${o}`);
}
async function RT(t, a) {
  return ht(`/deployments/${t}/runs`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
async function $h(t, a) {
  return ht(`/deployments/${t}/runs/${a}`);
}
async function MT(t, a) {
  return ht(`/deployments/${t}/runs/${a}/cancel`, { method: "POST" });
}
async function qx(t, a) {
  return ht(`/deployments/${t}/runs/${a}/resume`, {
    method: "POST",
    body: "{}"
  });
}
async function _T(t, a) {
  return ht(`/deployments/${t}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(a)
  });
}
function By(t, a, i, l) {
  return wT(
    `/deployments/${t}/runs/${a}/progress`,
    i,
    l
  );
}
async function Ki(t) {
  return ht(`/voice-assets?deploymentId=${encodeURIComponent(t)}`);
}
async function yc(t, a, i, l, o) {
  const d = new FormData();
  d.append("deploymentId", t), d.append("displayName", i), d.append("kind", l), d.append("audio", a);
  const h = await fetch(`${va}/voice-assets`, {
    method: "POST",
    body: d
  });
  if (!h.ok)
    throw new Error(`upload failed: ${h.status}`);
  return await h.json();
}
async function AT(t, a) {
  await ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
async function DT(t, a, i) {
  return ht(
    `/voice-assets/${a}?deploymentId=${encodeURIComponent(t)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ displayName: i })
    }
  );
}
function zT(t) {
  if (!t.audioArtifactRef) return null;
  const a = new URLSearchParams({ deploymentId: t.deploymentId });
  return `${va}/voice-assets/${encodeURIComponent(t.voiceAssetId)}/audio?${a.toString()}`;
}
async function kT(t) {
  return ht(`/workflow?deploymentId=${encodeURIComponent(t)}`);
}
var OT = "mux0i60", LT = "mux0i61", UT = "mux0i62", BT = "mux0i63";
function Oc({ count: t = "0", title: a, hint: i }) {
  return /* @__PURE__ */ c.jsxs("div", { className: OT, children: [
    /* @__PURE__ */ c.jsx("span", { className: LT, "aria-hidden": "true", children: t }),
    /* @__PURE__ */ c.jsx("h3", { className: UT, children: a }),
    i ? /* @__PURE__ */ c.jsx("p", { className: BT, children: i }) : null
  ] });
}
var $T = { raised: "zwn3011 zwn3010", muted: "zwn3012 zwn3010" }, VT = { none: "zwn3013", subtle: "zwn3014", raised: "zwn3015" }, HT = { compact: "zwn3016", comfortable: "zwn3017", airy: "zwn3018" }, qT = "zwn3019";
function Ua({
  tone: t = "raised",
  density: a = "comfortable",
  elevation: i = "subtle",
  as: l = "section",
  children: o,
  className: d,
  style: h,
  ...m
}) {
  const g = [$T[t], HT[a], VT[i], d].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(l, { className: g, style: h, "data-elevation": i, ...m, children: o });
}
function IT({ children: t, className: a }) {
  const i = [qT, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: i, children: t });
}
var Pr = "vrkn5p0", FT = "_93p6291", YT = "_93p6292", GT = "_93p6293", XT = "_93p6294", PT = "_93p6295", KT = "_93p6296", QT = "_93p6297", ZT = "_93p6298", JT = "_93p6299", WT = "_93p629a", eC = "_93p629b", tC = "_93p629c", nC = "_93p629d", aC = "_93p629e";
const rC = "nexus-host-navigate";
function iC(t) {
  return `#/deployments/${encodeURIComponent(t)}`;
}
function sC(t, a) {
  if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
    return;
  t.preventDefault();
  const i = {
    kind: "deployment-detail",
    deploymentId: a
  };
  window.dispatchEvent(
    new CustomEvent(rC, {
      detail: i
    })
  );
}
function lC() {
  const { deployments: t } = Nl(), a = t.length === 1 ? "deployment" : "deployments";
  return /* @__PURE__ */ c.jsxs("main", { className: FT, children: [
    /* @__PURE__ */ c.jsxs("header", { className: YT, children: [
      /* @__PURE__ */ c.jsx("p", { className: GT, children: "EmotionTTS · Dialogue synthesis" }),
      /* @__PURE__ */ c.jsxs("h1", { className: XT, children: [
        "Direct your characters.",
        /* @__PURE__ */ c.jsx("br", {}),
        "Hear them perform."
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: PT, children: "Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles synthesis, caching, and export — you focus on the take." }),
      /* @__PURE__ */ c.jsxs("p", { className: KT, children: [
        /* @__PURE__ */ c.jsx("span", { className: QT, children: t.length }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          a,
          " ready"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ua,
      {
        density: "airy",
        elevation: "raised",
        className: ZT,
        "aria-labelledby": "deployments-section-list",
        children: [
          /* @__PURE__ */ c.jsx("h2", { id: "deployments-section-list", className: Pr, children: "01 / Deployments" }),
          t.length === 0 ? /* @__PURE__ */ c.jsx(
            Oc,
            {
              title: "No deployments yet.",
              hint: "Host shell → Extensions → EmotionTTS → New"
            }
          ) : /* @__PURE__ */ c.jsx("ul", { className: JT, children: t.map((i) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
            "a",
            {
              href: iC(i.deploymentId),
              onClick: (l) => sC(l, i.deploymentId),
              className: WT,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: eC, "aria-hidden": "true", children: oC(i.displayName) }),
                /* @__PURE__ */ c.jsxs("span", { children: [
                  /* @__PURE__ */ c.jsx("span", { className: tC, children: i.displayName }),
                  /* @__PURE__ */ c.jsx("span", { className: nC, children: i.deploymentId })
                ] }),
                /* @__PURE__ */ c.jsx("span", { className: aC, "aria-hidden": "true", children: "→" })
              ]
            }
          ) }, i.deploymentId)) })
        ]
      }
    )
  ] });
}
function oC(t) {
  const a = t.trim();
  return a ? a.slice(0, 1).toUpperCase() : "·";
}
var Vh = ox();
const cC = /* @__PURE__ */ lx(Vh);
function uC(t) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
  i.type = "text/css", a.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
}
const dC = (t) => {
  switch (t) {
    case "success":
      return mC;
    case "info":
      return vC;
    case "warning":
      return pC;
    case "error":
      return gC;
    default:
      return null;
  }
}, fC = Array(12).fill(0), hC = ({ visible: t, className: a }) => /* @__PURE__ */ me.createElement("div", {
  className: [
    "sonner-loading-wrapper",
    a
  ].filter(Boolean).join(" "),
  "data-visible": t
}, /* @__PURE__ */ me.createElement("div", {
  className: "sonner-spinner"
}, fC.map((i, l) => /* @__PURE__ */ me.createElement("div", {
  className: "sonner-loading-bar",
  key: `spinner-bar-${l}`
})))), mC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
})), pC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
})), vC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
})), gC = /* @__PURE__ */ me.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ me.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
})), yC = /* @__PURE__ */ me.createElement("svg", {
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
})), bC = () => {
  const [t, a] = me.useState(document.hidden);
  return me.useEffect(() => {
    const i = () => {
      a(document.hidden);
    };
    return document.addEventListener("visibilitychange", i), () => window.removeEventListener("visibilitychange", i);
  }, []), t;
};
let Qf = 1;
class xC {
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
      const { message: l, ...o } = a, d = typeof a?.id == "number" || ((i = a.id) == null ? void 0 : i.length) > 0 ? a.id : Qf++, h = this.toasts.find((g) => g.id === d), m = a.dismissible === void 0 ? !0 : a.dismissible;
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
        else if (wC(p) && !p.ok) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(`HTTP error! status: ${p.status}`) : i.error, S = typeof i.description == "function" ? await i.description(`HTTP error! status: ${p.status}`) : i.description, j = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...j
          });
        } else if (p instanceof Error) {
          d = !1;
          const v = typeof i.error == "function" ? await i.error(p) : i.error, S = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "error",
            description: S,
            ...j
          });
        } else if (i.success !== void 0) {
          d = !1;
          const v = typeof i.success == "function" ? await i.success(p) : i.success, S = typeof i.description == "function" ? await i.description(p) : i.description, j = typeof v == "object" && !me.isValidElement(v) ? v : {
            message: v
          };
          this.create({
            id: l,
            type: "success",
            description: S,
            ...j
          });
        }
      }).catch(async (p) => {
        if (h = [
          "reject",
          p
        ], i.error !== void 0) {
          d = !1;
          const b = typeof i.error == "function" ? await i.error(p) : i.error, v = typeof i.description == "function" ? await i.description(p) : i.description, w = typeof b == "object" && !me.isValidElement(b) ? b : {
            message: b
          };
          this.create({
            id: l,
            type: "error",
            description: v,
            ...w
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
      const l = i?.id || Qf++;
      return this.create({
        jsx: a(l),
        id: l,
        ...i
      }), l;
    }, this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}
const xn = new xC(), SC = (t, a) => {
  const i = a?.id || Qf++;
  return xn.addToast({
    title: t,
    ...a,
    id: i
  }), i;
}, wC = (t) => t && typeof t == "object" && "ok" in t && typeof t.ok == "boolean" && "status" in t && typeof t.status == "number", jC = SC, EC = () => xn.toasts, NC = () => xn.getActiveToasts(), fn = Object.assign(jC, {
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
  getHistory: EC,
  getToasts: NC
});
uC("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function Yo(t) {
  return t.label !== void 0;
}
const TC = 3, CC = "24px", RC = "16px", $y = 4e3, MC = 356, _C = 14, AC = 45, DC = 200;
function ma(...t) {
  return t.filter(Boolean).join(" ");
}
function zC(t) {
  const [a, i] = t.split("-"), l = [];
  return a && l.push(a), i && l.push(i), l;
}
const kC = (t) => {
  var a, i, l, o, d, h, m, g, p;
  const { invert: b, toast: v, unstyled: S, interacting: w, setHeights: j, visibleToasts: T, heights: M, index: N, toasts: k, expanded: A, removeToast: C, defaultRichColors: V, closeButton: G, style: ne, cancelButtonStyle: D, actionButtonStyle: I, className: F = "", descriptionClassName: ie = "", duration: re, position: te, gap: ce, expandByDefault: W, classNames: O, icons: R, closeButtonAriaLabel: U = "Close toast" } = t, [B, Z] = me.useState(null), [_, J] = me.useState(null), [K, le] = me.useState(!1), [fe, ge] = me.useState(!1), [Ae, Me] = me.useState(!1), [Ve, Zt] = me.useState(!1), [Pt, At] = me.useState(!1), [et, pt] = me.useState(0), [he, Oe] = me.useState(0), De = me.useRef(v.duration || re || $y), Te = me.useRef(null), bt = me.useRef(null), xt = N === 0, un = N + 1 <= T, Ht = v.type, kn = v.dismissible !== !1, qt = v.className || "", ye = v.descriptionClassName || "", ze = me.useMemo(() => M.findIndex((ke) => ke.toastId === v.id) || 0, [
    M,
    v.id
  ]), Qe = me.useMemo(() => {
    var ke;
    return (ke = v.closeButton) != null ? ke : G;
  }, [
    v.closeButton,
    G
  ]), nt = me.useMemo(() => v.duration || re || $y, [
    v.duration,
    re
  ]), It = me.useRef(0), Ft = me.useRef(0), Er = me.useRef(0), sa = me.useRef(null), [Zn, Jt] = te.split("-"), Tt = me.useMemo(() => M.reduce((ke, ut, Dt) => Dt >= ze ? ke : ke + ut.height, 0), [
    M,
    ze
  ]), Yt = bC(), ei = v.invert || b, Ha = Ht === "loading";
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
    const ke = bt.current;
    if (ke) {
      const ut = ke.getBoundingClientRect().height;
      return Oe(ut), j((Dt) => [
        {
          toastId: v.id,
          height: ut,
          position: v.position
        },
        ...Dt
      ]), () => j((Dt) => Dt.filter((Gt) => Gt.toastId !== v.id));
    }
  }, [
    j,
    v.id
  ]), me.useLayoutEffect(() => {
    if (!K) return;
    const ke = bt.current, ut = ke.style.height;
    ke.style.height = "auto";
    const Dt = ke.getBoundingClientRect().height;
    ke.style.height = ut, Oe(Dt), j((Gt) => Gt.find((it) => it.toastId === v.id) ? Gt.map((it) => it.toastId === v.id ? {
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
    K,
    v.title,
    v.description,
    j,
    v.id,
    v.jsx,
    v.action,
    v.cancel
  ]);
  const On = me.useCallback(() => {
    ge(!0), pt(Ft.current), j((ke) => ke.filter((ut) => ut.toastId !== v.id)), setTimeout(() => {
      C(v);
    }, DC);
  }, [
    v,
    C,
    j,
    Ft
  ]);
  me.useEffect(() => {
    if (v.promise && Ht === "loading" || v.duration === 1 / 0 || v.type === "loading") return;
    let ke;
    return A || w || Yt ? (() => {
      if (Er.current < It.current) {
        const Gt = (/* @__PURE__ */ new Date()).getTime() - It.current;
        De.current = De.current - Gt;
      }
      Er.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      De.current !== 1 / 0 && (It.current = (/* @__PURE__ */ new Date()).getTime(), ke = setTimeout(() => {
        v.onAutoClose == null || v.onAutoClose.call(v, v), On();
      }, De.current));
    })(), () => clearTimeout(ke);
  }, [
    A,
    w,
    v,
    Ht,
    Yt,
    On
  ]), me.useEffect(() => {
    v.delete && (On(), v.onDismiss == null || v.onDismiss.call(v, v));
  }, [
    On,
    v.delete
  ]);
  function ga() {
    var ke;
    if (R?.loading) {
      var ut;
      return /* @__PURE__ */ me.createElement("div", {
        className: ma(O?.loader, v == null || (ut = v.classNames) == null ? void 0 : ut.loader, "sonner-loader"),
        "data-visible": Ht === "loading"
      }, R.loading);
    }
    return /* @__PURE__ */ me.createElement(hC, {
      className: ma(O?.loader, v == null || (ke = v.classNames) == null ? void 0 : ke.loader),
      visible: Ht === "loading"
    });
  }
  const Jn = v.icon || R?.[Ht] || dC(Ht);
  var la, hn;
  return /* @__PURE__ */ me.createElement("li", {
    tabIndex: 0,
    ref: bt,
    className: ma(F, qt, O?.toast, v == null || (a = v.classNames) == null ? void 0 : a.toast, O?.default, O?.[Ht], v == null || (i = v.classNames) == null ? void 0 : i[Ht]),
    "data-sonner-toast": "",
    "data-rich-colors": (la = v.richColors) != null ? la : V,
    "data-styled": !(v.jsx || v.unstyled || S),
    "data-mounted": K,
    "data-promise": !!v.promise,
    "data-swiped": Pt,
    "data-removed": fe,
    "data-visible": un,
    "data-y-position": Zn,
    "data-x-position": Jt,
    "data-index": N,
    "data-front": xt,
    "data-swiping": Ae,
    "data-dismissible": kn,
    "data-type": Ht,
    "data-invert": ei,
    "data-swipe-out": Ve,
    "data-swipe-direction": _,
    "data-expanded": !!(A || W && K),
    "data-testid": v.testId,
    style: {
      "--index": N,
      "--toasts-before": N,
      "--z-index": k.length - N,
      "--offset": `${fe ? et : Ft.current}px`,
      "--initial-height": W ? "auto" : `${he}px`,
      ...ne,
      ...v.style
    },
    onDragEnd: () => {
      Me(!1), Z(null), sa.current = null;
    },
    onPointerDown: (ke) => {
      ke.button !== 2 && (Ha || !kn || (Te.current = /* @__PURE__ */ new Date(), pt(Ft.current), ke.target.setPointerCapture(ke.pointerId), ke.target.tagName !== "BUTTON" && (Me(!0), sa.current = {
        x: ke.clientX,
        y: ke.clientY
      })));
    },
    onPointerUp: () => {
      var ke, ut, Dt;
      if (Ve || !kn) return;
      sa.current = null;
      const Gt = Number(((ke = bt.current) == null ? void 0 : ke.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), wn = Number(((ut = bt.current) == null ? void 0 : ut.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), it = (/* @__PURE__ */ new Date()).getTime() - ((Dt = Te.current) == null ? void 0 : Dt.getTime()), Wt = B === "x" ? Gt : wn, ya = Math.abs(Wt) / it;
      if (Math.abs(Wt) >= AC || ya > 0.11) {
        pt(Ft.current), v.onDismiss == null || v.onDismiss.call(v, v), J(B === "x" ? Gt > 0 ? "right" : "left" : wn > 0 ? "down" : "up"), On(), Zt(!0);
        return;
      } else {
        var rn, z;
        (rn = bt.current) == null || rn.style.setProperty("--swipe-amount-x", "0px"), (z = bt.current) == null || z.style.setProperty("--swipe-amount-y", "0px");
      }
      At(!1), Me(!1), Z(null);
    },
    onPointerMove: (ke) => {
      var ut, Dt, Gt;
      if (!sa.current || !kn || ((ut = window.getSelection()) == null ? void 0 : ut.toString().length) > 0) return;
      const it = ke.clientY - sa.current.y, Wt = ke.clientX - sa.current.x;
      var ya;
      const rn = (ya = t.swipeDirections) != null ? ya : zC(te);
      !B && (Math.abs(Wt) > 1 || Math.abs(it) > 1) && Z(Math.abs(Wt) > Math.abs(it) ? "x" : "y");
      let z = {
        x: 0,
        y: 0
      };
      const H = (Y) => 1 / (1.5 + Math.abs(Y) / 20);
      if (B === "y") {
        if (rn.includes("top") || rn.includes("bottom"))
          if (rn.includes("top") && it < 0 || rn.includes("bottom") && it > 0)
            z.y = it;
          else {
            const Y = it * H(it);
            z.y = Math.abs(Y) < Math.abs(it) ? Y : it;
          }
      } else if (B === "x" && (rn.includes("left") || rn.includes("right")))
        if (rn.includes("left") && Wt < 0 || rn.includes("right") && Wt > 0)
          z.x = Wt;
        else {
          const Y = Wt * H(Wt);
          z.x = Math.abs(Y) < Math.abs(Wt) ? Y : Wt;
        }
      (Math.abs(z.x) > 0 || Math.abs(z.y) > 0) && At(!0), (Dt = bt.current) == null || Dt.style.setProperty("--swipe-amount-x", `${z.x}px`), (Gt = bt.current) == null || Gt.style.setProperty("--swipe-amount-y", `${z.y}px`);
    }
  }, Qe && !v.jsx && Ht !== "loading" ? /* @__PURE__ */ me.createElement("button", {
    "aria-label": U,
    "data-disabled": Ha,
    "data-close-button": !0,
    onClick: Ha || !kn ? () => {
    } : () => {
      On(), v.onDismiss == null || v.onDismiss.call(v, v);
    },
    className: ma(O?.closeButton, v == null || (l = v.classNames) == null ? void 0 : l.closeButton)
  }, (hn = R?.close) != null ? hn : yC) : null, (Ht || v.icon || v.promise) && v.icon !== null && (R?.[Ht] !== null || v.icon) ? /* @__PURE__ */ me.createElement("div", {
    "data-icon": "",
    className: ma(O?.icon, v == null || (o = v.classNames) == null ? void 0 : o.icon)
  }, v.promise || v.type === "loading" && !v.icon ? v.icon || ga() : null, v.type !== "loading" ? Jn : null) : null, /* @__PURE__ */ me.createElement("div", {
    "data-content": "",
    className: ma(O?.content, v == null || (d = v.classNames) == null ? void 0 : d.content)
  }, /* @__PURE__ */ me.createElement("div", {
    "data-title": "",
    className: ma(O?.title, v == null || (h = v.classNames) == null ? void 0 : h.title)
  }, v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title), v.description ? /* @__PURE__ */ me.createElement("div", {
    "data-description": "",
    className: ma(ie, ye, O?.description, v == null || (m = v.classNames) == null ? void 0 : m.description)
  }, typeof v.description == "function" ? v.description() : v.description) : null), /* @__PURE__ */ me.isValidElement(v.cancel) ? v.cancel : v.cancel && Yo(v.cancel) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-cancel": !0,
    style: v.cancelButtonStyle || D,
    onClick: (ke) => {
      Yo(v.cancel) && kn && (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, ke), On());
    },
    className: ma(O?.cancelButton, v == null || (g = v.classNames) == null ? void 0 : g.cancelButton)
  }, v.cancel.label) : null, /* @__PURE__ */ me.isValidElement(v.action) ? v.action : v.action && Yo(v.action) ? /* @__PURE__ */ me.createElement("button", {
    "data-button": !0,
    "data-action": !0,
    style: v.actionButtonStyle || I,
    onClick: (ke) => {
      Yo(v.action) && (v.action.onClick == null || v.action.onClick.call(v.action, ke), !ke.defaultPrevented && On());
    },
    className: ma(O?.actionButton, v == null || (p = v.classNames) == null ? void 0 : p.actionButton)
  }, v.action.label) : null);
};
function Vy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const t = document.documentElement.getAttribute("dir");
  return t === "auto" || !t ? window.getComputedStyle(document.documentElement).direction : t;
}
function OC(t, a) {
  const i = {};
  return [
    t,
    a
  ].forEach((l, o) => {
    const d = o === 1, h = d ? "--mobile-offset" : "--offset", m = d ? RC : CC;
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
const LC = /* @__PURE__ */ me.forwardRef(function(a, i) {
  const { id: l, invert: o, position: d = "bottom-right", hotkey: h = [
    "altKey",
    "KeyT"
  ], expand: m, closeButton: g, className: p, offset: b, mobileOffset: v, theme: S = "light", richColors: w, duration: j, style: T, visibleToasts: M = TC, toastOptions: N, dir: k = Vy(), gap: A = _C, icons: C, containerAriaLabel: V = "Notifications" } = a, [G, ne] = me.useState([]), D = me.useMemo(() => l ? G.filter((K) => K.toasterId === l) : G.filter((K) => !K.toasterId), [
    G,
    l
  ]), I = me.useMemo(() => Array.from(new Set([
    d
  ].concat(D.filter((K) => K.position).map((K) => K.position)))), [
    D,
    d
  ]), [F, ie] = me.useState([]), [re, te] = me.useState(!1), [ce, W] = me.useState(!1), [O, R] = me.useState(S !== "system" ? S : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), U = me.useRef(null), B = h.join("+").replace(/Key/g, "").replace(/Digit/g, ""), Z = me.useRef(null), _ = me.useRef(!1), J = me.useCallback((K) => {
    ne((le) => {
      var fe;
      return (fe = le.find((ge) => ge.id === K.id)) != null && fe.delete || xn.dismiss(K.id), le.filter(({ id: ge }) => ge !== K.id);
    });
  }, []);
  return me.useEffect(() => xn.subscribe((K) => {
    if (K.dismiss) {
      requestAnimationFrame(() => {
        ne((le) => le.map((fe) => fe.id === K.id ? {
          ...fe,
          delete: !0
        } : fe));
      });
      return;
    }
    setTimeout(() => {
      cC.flushSync(() => {
        ne((le) => {
          const fe = le.findIndex((ge) => ge.id === K.id);
          return fe !== -1 ? [
            ...le.slice(0, fe),
            {
              ...le[fe],
              ...K
            },
            ...le.slice(fe + 1)
          ] : [
            K,
            ...le
          ];
        });
      });
    });
  }), [
    G
  ]), me.useEffect(() => {
    if (S !== "system") {
      R(S);
      return;
    }
    if (S === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? R("dark") : R("light")), typeof window > "u") return;
    const K = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      K.addEventListener("change", ({ matches: le }) => {
        R(le ? "dark" : "light");
      });
    } catch {
      K.addListener(({ matches: fe }) => {
        try {
          R(fe ? "dark" : "light");
        } catch (ge) {
          console.error(ge);
        }
      });
    }
  }, [
    S
  ]), me.useEffect(() => {
    G.length <= 1 && te(!1);
  }, [
    G
  ]), me.useEffect(() => {
    const K = (le) => {
      var fe;
      if (h.every((Me) => le[Me] || le.code === Me)) {
        var Ae;
        te(!0), (Ae = U.current) == null || Ae.focus();
      }
      le.code === "Escape" && (document.activeElement === U.current || (fe = U.current) != null && fe.contains(document.activeElement)) && te(!1);
    };
    return document.addEventListener("keydown", K), () => document.removeEventListener("keydown", K);
  }, [
    h
  ]), me.useEffect(() => {
    if (U.current)
      return () => {
        Z.current && (Z.current.focus({
          preventScroll: !0
        }), Z.current = null, _.current = !1);
      };
  }, [
    U.current
  ]), // Remove item from normal navigation flow, only available via hotkey
  /* @__PURE__ */ me.createElement("section", {
    ref: i,
    "aria-label": `${V} ${B}`,
    tabIndex: -1,
    "aria-live": "polite",
    "aria-relevant": "additions text",
    "aria-atomic": "false",
    suppressHydrationWarning: !0
  }, I.map((K, le) => {
    var fe;
    const [ge, Ae] = K.split("-");
    return D.length ? /* @__PURE__ */ me.createElement("ol", {
      key: K,
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
        "--width": `${MC}px`,
        "--gap": `${A}px`,
        ...T,
        ...OC(b, v)
      },
      onBlur: (Me) => {
        _.current && !Me.currentTarget.contains(Me.relatedTarget) && (_.current = !1, Z.current && (Z.current.focus({
          preventScroll: !0
        }), Z.current = null));
      },
      onFocus: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || _.current || (_.current = !0, Z.current = Me.relatedTarget);
      },
      onMouseEnter: () => te(!0),
      onMouseMove: () => te(!0),
      onMouseLeave: () => {
        ce || te(!1);
      },
      onDragEnd: () => te(!1),
      onPointerDown: (Me) => {
        Me.target instanceof HTMLElement && Me.target.dataset.dismissible === "false" || W(!0);
      },
      onPointerUp: () => W(!1)
    }, D.filter((Me) => !Me.position && le === 0 || Me.position === K).map((Me, Ve) => {
      var Zt, Pt;
      return /* @__PURE__ */ me.createElement(kC, {
        key: Me.id,
        icons: C,
        index: Ve,
        toast: Me,
        defaultRichColors: w,
        duration: (Zt = N?.duration) != null ? Zt : j,
        className: N?.className,
        descriptionClassName: N?.descriptionClassName,
        invert: o,
        visibleToasts: M,
        closeButton: (Pt = N?.closeButton) != null ? Pt : g,
        interacting: ce,
        position: K,
        style: N?.style,
        unstyled: N?.unstyled,
        classNames: N?.classNames,
        cancelButtonStyle: N?.cancelButtonStyle,
        actionButtonStyle: N?.actionButtonStyle,
        closeButtonAriaLabel: N?.closeButtonAriaLabel,
        removeToast: J,
        toasts: D.filter((At) => At.position == Me.position),
        heights: F.filter((At) => At.position == Me.position),
        setHeights: ie,
        expandByDefault: m,
        gap: A,
        expanded: re,
        swipeDirections: a.swipeDirections
      });
    })) : null;
  }));
}), Hy = 32, qy = -30, Iy = -6, Fy = 0.5, Yy = 2, Gy = -24, Xy = 24, Py = -12, Ky = 12, Qy = -12, Zy = 12, Jy = -60, Wy = -20;
class Qi extends Error {
  constructor(a, i) {
    super(i), this.currentDigest = a, this.name = "StaleDigestError";
  }
}
async function Ix(t, a, i, l = {}) {
  const o = `/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, d = `${va}${o}`, h = await fetch(d, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(i),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (h.status === 409) {
    const m = await h.json().catch(() => null), g = m?.error?.current_digest ?? "", p = m?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(g, p);
  }
  if (!h.ok)
    throw new Error(await Lc(h, "apply"));
  return await h.json();
}
async function UC(t, a, i, l, o = {}) {
  const d = `/deployments/${encodeURIComponent(t)}/runs/${encodeURIComponent(a)}/utterances/${encodeURIComponent(i)}/edit`, h = `${va}${d}`, m = await fetch(h, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(l),
    ...o.signal ? { signal: o.signal } : {}
  });
  if (m.status === 409) {
    const g = await m.json().catch(() => null), p = g?.error?.current_digest ?? "", b = g?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new Qi(p, b);
  }
  if (!m.ok)
    throw new Error(await Lc(m, "apply"));
  return await m.json();
}
async function BC(t, a, i = {}) {
  const l = `${va}/voice-assets/${encodeURIComponent(t)}/edit?deploymentId=${encodeURIComponent(a)}`, o = await fetch(l, {
    method: "DELETE",
    ...i.signal ? { signal: i.signal } : {}
  });
  if (!o.ok && o.status !== 204)
    throw new Error(`clear edit failed: ${o.status}`);
}
async function $C(t, a, i, l = {}) {
  const o = `${va}/voice-assets/${encodeURIComponent(t)}/edit/preview?deploymentId=${encodeURIComponent(a)}`, d = await fetch(o, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain: i }),
    ...l.signal ? { signal: l.signal } : {}
  });
  if (!d.ok)
    throw new Error(await Lc(d, "preview"));
  return d.blob();
}
async function dc(t, a, i, l = 50, o = {}) {
  const d = `${va}/audit/${encodeURIComponent(a)}/${encodeURIComponent(i)}?deploymentId=${encodeURIComponent(t)}&limit=${encodeURIComponent(String(l))}`, h = await fetch(d, {
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
function Fx(t, a) {
  if (t.version !== 1)
    return { message: "Unsupported chain version." };
  if (t.ops.length > Hy)
    return {
      message: `Chain exceeds the maximum of ${Hy} operations.`
    };
  for (const i of t.ops) {
    const l = VC(i, a);
    if (l) return l;
  }
  return null;
}
function VC(t, a) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return HC(t.id, t.start_ms, t.end_ms, a);
    case "normalize":
      return t.target_lufs < qy || t.target_lufs > Iy ? {
        opId: t.id,
        message: `Normalize target must be between ${qy} and ${Iy} LUFS.`
      } : null;
    case "speed":
      return t.factor < Fy || t.factor > Yy ? {
        opId: t.id,
        message: `Speed factor must be between ${Fy}× and ${Yy}×.`
      } : null;
    case "fade_in":
    case "fade_out":
      return t.duration_ms < 1 ? { opId: t.id, message: "Fade duration must be at least 1 ms." } : null;
    case "gain":
      return t.gain_db < Gy || t.gain_db > Xy ? {
        opId: t.id,
        message: `Volume must be between ${Gy} and ${Xy} dB.`
      } : null;
    case "eq3":
      for (const [i, l] of [
        ["low_db", t.low_db],
        ["mid_db", t.mid_db],
        ["high_db", t.high_db]
      ])
        if (l < Py || l > Ky)
          return {
            opId: t.id,
            message: `EQ ${i} must be between ${Py} and ${Ky} dB.`
          };
      return null;
    case "pitch_shift":
      return t.semitones < Qy || t.semitones > Zy ? {
        opId: t.id,
        message: `Pitch must be between ${Qy} and ${Zy} semitones.`
      } : null;
    case "silence_strip":
      return t.threshold_db < Jy || t.threshold_db > Wy ? {
        opId: t.id,
        message: `Silence threshold must be between ${Jy} and ${Wy} dB.`
      } : null;
    default:
      return {
        message: "Unknown edit op mode in chain — refusing to apply."
      };
  }
}
function HC(t, a, i, l) {
  return a < 0 ? { opId: t, message: "Start must be ≥ 0 ms." } : i <= a ? { opId: t, message: "End must be greater than start." } : l > 0 && i > l ? { opId: t, message: "End extends past source duration." } : null;
}
async function Lc(t, a) {
  const i = await t.json().catch(() => null);
  return i?.error?.message ?? i?.message ?? `${a} failed: ${t.status}`;
}
var qC = "g5r6d10", IC = "g5r6d11", FC = "g5r6d12", YC = "g5r6d13", GC = "g5r6d14", XC = "g5r6d15", PC = "g5r6d1a", KC = "g5r6d1b", QC = "g5r6d1c", ZC = "g5r6d1d", JC = "g5r6d1e", WC = "g5r6d1g", eR = "g5r6d1h", tR = "g5r6d1i", nR = "g5r6d1j", aR = "g5r6d1k", rR = "g5r6d1l", iR = "g5r6d1m", sR = "g5r6d1n", lR = "g5r6d1o", e0 = "g5r6d1p", oR = "g5r6d1q", cR = "g5r6d1r", uR = "g5r6d1s", dR = "g5r6d1t", fR = "g5r6d1u", t0 = "g5r6d1v", n0 = "g5r6d1w", hR = "g5r6d1x", mR = "g5r6d1y", Fi = "g5r6d1z", pR = "g5r6d110", a0 = "g5r6d111", vR = "g5r6d112", gR = "g5r6d113", fr = "g5r6d114", yR = "g5r6d119", bR = "a6ki8u0", xR = "a6ki8u1", SR = "a6ki8u2", wR = "a6ki8u3", jR = "a6ki8u4", ER = "a6ki8u5", NR = "a6ki8u6", cf = "a6ki8u7", TR = "a6ki8u8", CR = "a6ki8u9", RR = "a6ki8ua", MR = "a6ki8ub", _R = "a6ki8uc", AR = "a6ki8ud", DR = "a6ki8ue", zR = "a6ki8uf", kR = "a6ki8ug", OR = "a6ki8uh", LR = "_1lguv7x0", UR = "_1lguv7x1", BR = "_1lguv7x2", $R = "_1lguv7x3", VR = "_1lguv7x4", HR = "_1lguv7x5", qR = "_1lguv7x6", IR = "_1lguv7x7", FR = "_1lguv7x8", YR = "_1lguv7x9", GR = "_1lguv7xa", XR = "_1lguv7xb", PR = "_1lguv7xc", r0 = "_1lguv7xd", KR = "_1lguv7xe", QR = "_1lguv7xf", ZR = "_1lguv7xg", JR = "_1lguv7xh", Yx = { primary: "_4ydn541 _4ydn540", secondary: "_4ydn542 _4ydn540", ghost: "_4ydn543 _4ydn540", danger: "_4ydn544 _4ydn540", warning: "_4ydn545 _4ydn540" }, Gx = { xs: "_4ydn546", sm: "_4ydn547", md: "_4ydn548", lg: "_4ydn549" }, WR = { xs: "_4ydn54a", sm: "_4ydn54b", md: "_4ydn54c", lg: "_4ydn54d" }, eM = "_4ydn54f";
function $e({
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
    Yx[t],
    Gx[a],
    o ? WR[a] : null,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: i,
      className: b,
      style: g,
      disabled: l || d,
      "aria-busy": l || void 0,
      ...p,
      children: [
        l ? /* @__PURE__ */ c.jsx("span", { className: eM, "aria-hidden": "true" }) : null,
        h
      ]
    }
  );
}
const tM = 28;
function nM(t) {
  if (!t) return 1;
  let a = 0;
  for (let i = 0; i < Math.min(t.length, 12); i++)
    a = a * 33 + t.charCodeAt(i) >>> 0;
  return a || 1;
}
function aM(t, a) {
  const i = new Array(a);
  let l = t;
  for (let o = 0; o < a; o++) {
    l = (l * 9301 + 49297) % 233280;
    const d = l / 233280, h = Math.min(1, o / 6, (a - o) / 6);
    i[o] = Math.max(0.18, h * (0.32 + d * 0.68));
  }
  return i;
}
function rM(t) {
  if (t == null) return "—";
  const a = Math.max(0, Math.round(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function iM(t) {
  return t ? `${(t / 1e3).toFixed(t % 1e3 === 0 ? 0 : 1)} kHz` : "—";
}
function sM({
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
  const [p, b] = y.useState(!1), [v, S] = y.useState(t.displayName), w = y.useRef(null), j = y.useMemo(() => nM(t.contentSha256), [t.contentSha256]), T = y.useMemo(() => aM(j, tM), [j]), M = y.useMemo(() => zT(t), [t]);
  y.useEffect(() => {
    S(t.displayName);
  }, [t.displayName]), y.useEffect(() => {
    const A = w.current;
    A && (l && M ? A.play().catch(() => {
    }) : (A.pause(), A.currentTime = 0));
  }, [l, M]);
  const N = async () => {
    const A = v.trim();
    if (!A || A === t.displayName) {
      b(!1), S(t.displayName);
      return;
    }
    try {
      await d(A);
    } finally {
      b(!1);
    }
  }, k = `${rM(t.durationMs)} · ${iM(t.sampleRate)}`;
  return /* @__PURE__ */ c.jsxs("article", { className: LR, "data-playing": l ? "true" : "false", children: [
    /* @__PURE__ */ c.jsxs("header", { className: UR, children: [
      /* @__PURE__ */ c.jsx("span", { className: BR, "data-kind": a, "aria-hidden": "true", children: a === "upload" ? "▣" : "★" }),
      /* @__PURE__ */ c.jsxs("div", { className: $R, children: [
        p ? /* @__PURE__ */ c.jsx(
          "input",
          {
            className: HR,
            value: v,
            autoFocus: !0,
            onChange: (A) => S(A.target.value),
            onBlur: () => {
              N();
            },
            onKeyDown: (A) => {
              A.key === "Enter" ? (A.preventDefault(), A.currentTarget.blur()) : A.key === "Escape" && (b(!1), S(t.displayName));
            },
            "aria-label": `Rename ${t.displayName}`
          }
        ) : /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: VR,
            onDoubleClick: () => b(!0),
            title: "Double-click to rename",
            children: t.displayName
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: qR, children: k })
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: IR, "data-kind": a, children: a === "upload" ? "UPLOADED" : "PRESET" })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: FR,
        "data-playing": l ? "true" : "false",
        disabled: M == null,
        title: M ? "Preview" : "Preview unavailable",
        onClick: o,
        "aria-label": l ? "Pause preview" : "Play preview",
        children: [
          /* @__PURE__ */ c.jsx("span", { className: YR, "aria-hidden": "true", children: l ? "❚❚" : "▶" }),
          /* @__PURE__ */ c.jsx("span", { className: GR, "aria-hidden": "true", children: T.map((A, C) => /* @__PURE__ */ c.jsx("span", { className: XR, style: { height: `${Math.round(A * 100)}%` } }, C)) })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("footer", { className: PR, children: [
      i.length > 0 ? /* @__PURE__ */ c.jsxs("span", { className: r0, children: [
        /* @__PURE__ */ c.jsx("span", { children: "used by" }),
        i.map((A) => /* @__PURE__ */ c.jsx(
          "span",
          {
            className: KR,
            style: { color: A.color, borderColor: A.color },
            children: A.characterName
          },
          A.characterName
        ))
      ] }) : /* @__PURE__ */ c.jsx("span", { className: r0, children: "unassigned" }),
      /* @__PURE__ */ c.jsxs("span", { className: QR, children: [
        /* @__PURE__ */ c.jsx(
          $e,
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
          $e,
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
        m && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            iconOnly: !0,
            className: ZR,
            title: "Delete",
            "aria-label": "Delete voice",
            onClick: m,
            children: "✕"
          }
        )
      ] })
    ] }),
    M && /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: w,
        src: M,
        preload: "none",
        className: JR,
        onEnded: g
      }
    )
  ] });
}
var lM = "_17eol302", oM = "_17eol303", cM = "_17eol304", uM = "_17eol305", dM = "_17eol306", fM = "_17eol307", Go = "_17eol308", hM = "_17eol309", mM = "_17eol30a", pM = "_17eol30b", vM = "_17eol30c", gM = "_17eol30d", i0 = "_17eol30e", yM = "_17eol30g";
function bM() {
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
function xM(t) {
  const a = Math.max(0, Math.floor(t / 1e3)), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function SM({
  open: t,
  defaultName: a,
  onClose: i,
  onSubmit: l
}) {
  const [o, d] = y.useState("idle"), [h, m] = y.useState(null), [g, p] = y.useState(0), [b, v] = y.useState(null), [S, w] = y.useState(a), [j, T] = y.useState(!1), M = y.useRef(null), N = y.useRef(null), k = y.useRef([]), A = y.useRef(0), C = y.useRef(null), V = y.useRef(null), G = y.useRef({ mime: "audio/webm", ext: "webm" }), ne = y.useRef(null), D = y.useRef(null), I = y.useRef(null);
  y.useEffect(() => {
    if (t)
      return I.current = document.activeElement ?? null, requestAnimationFrame(() => {
        ne.current?.scrollIntoView({ behavior: "smooth", block: "center" }), D.current?.focus();
      }), () => {
        I.current?.focus?.();
      };
  }, [t]), y.useEffect(() => {
    if (!t) return;
    const R = (U) => {
      U.key === "Escape" && i();
    };
    return window.addEventListener("keydown", R), () => window.removeEventListener("keydown", R);
  }, [t, i]);
  const F = y.useCallback(
    (R) => {
      if (R.key !== "Tab") return;
      const U = ne.current;
      if (!U) return;
      const B = U.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (B.length === 0) return;
      const Z = B[0], _ = B[B.length - 1], J = document.activeElement;
      R.shiftKey ? (J === Z || J === U) && (R.preventDefault(), _.focus()) : J === _ && (R.preventDefault(), Z.focus());
    },
    []
  ), ie = y.useCallback(() => {
    if (N.current) {
      for (const R of N.current.getTracks()) R.stop();
      N.current = null;
    }
    C.current != null && (window.clearInterval(C.current), C.current = null);
  }, []), re = y.useCallback(() => {
    ie(), b && URL.revokeObjectURL(b), v(null), k.current = [], V.current = null, p(0), m(null), d("idle");
  }, [b, ie]);
  if (y.useEffect(() => {
    t || (re(), w(a));
  }, [t, a, re]), y.useEffect(() => () => {
    ie(), b && URL.revokeObjectURL(b);
  }, [b, ie]), !t) return null;
  const te = async () => {
    m(null), d("preparing");
    try {
      const R = await navigator.mediaDevices.getUserMedia({ audio: !0 });
      N.current = R;
      const U = bM();
      G.current = U;
      const B = U.mime ? new MediaRecorder(R, { mimeType: U.mime }) : new MediaRecorder(R);
      M.current = B, k.current = [], B.ondataavailable = (Z) => {
        Z.data && Z.data.size > 0 && k.current.push(Z.data);
      }, B.onstop = () => {
        const Z = U.mime || "audio/webm", _ = new Blob(k.current, { type: Z }), J = new File([_], `${S || a || "recording"}.${U.ext}`, {
          type: Z
        });
        V.current = J;
        const K = URL.createObjectURL(_);
        v(K), d("ready"), ie();
      }, B.start(), A.current = Date.now(), p(0), C.current = window.setInterval(() => {
        p(Date.now() - A.current);
      }, 200), d("recording");
    } catch (R) {
      const U = R instanceof Error ? R.message : "could not access microphone";
      m(U), d(U.toLowerCase().includes("denied") ? "denied" : "error"), ie();
    }
  }, ce = () => {
    const R = M.current;
    R && R.state !== "inactive" && R.stop(), C.current != null && (window.clearInterval(C.current), C.current = null);
  }, W = async () => {
    const R = V.current;
    if (!R) return;
    const U = (S || a).trim();
    if (!U) {
      m("Name cannot be empty");
      return;
    }
    T(!0);
    try {
      await l(R, U), i();
    } catch (B) {
      m(B instanceof Error ? B.message : "upload failed");
    } finally {
      T(!1);
    }
  }, O = o === "recording" ? "REC" : o === "ready" ? "OK" : o === "preparing" ? "..." : "MIC";
  return /* @__PURE__ */ c.jsx("div", { className: lM, role: "presentation", onClick: i, children: /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: ne,
      className: oM,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mic-recorder-heading",
      onClick: (R) => R.stopPropagation(),
      onKeyDown: F,
      tabIndex: -1,
      children: [
        /* @__PURE__ */ c.jsx("h2", { id: "mic-recorder-heading", className: cM, children: "Record reference audio" }),
        /* @__PURE__ */ c.jsx("p", { className: uM, children: "Speak the reference line into your microphone. 4–30 seconds is recommended for clean conditioning." }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: dM,
            "data-state": o === "recording" ? "recording" : o === "ready" ? "ready" : "idle",
            "aria-hidden": "true",
            children: O
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: vM, "aria-live": "polite", children: xM(g) }),
        /* @__PURE__ */ c.jsxs("div", { className: fM, children: [
          (o === "idle" || o === "denied" || o === "error") && /* @__PURE__ */ c.jsxs(
            "button",
            {
              ref: D,
              type: "button",
              className: Go,
              "data-tone": "danger",
              onClick: () => {
                te();
              },
              children: [
                /* @__PURE__ */ c.jsx("span", { className: i0, "aria-hidden": "true" }),
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
              onClick: ce,
              children: [
                /* @__PURE__ */ c.jsx("span", { className: i0, "aria-hidden": "true" }),
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
                re();
              },
              children: "↺ Re-record"
            }
          )
        ] }),
        b && /* @__PURE__ */ c.jsx("audio", { className: gM, src: b, controls: !0, preload: "auto" }),
        /* @__PURE__ */ c.jsxs("label", { className: hM, children: [
          /* @__PURE__ */ c.jsx("span", { children: "Voice name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: mM,
              value: S,
              onChange: (R) => w(R.target.value),
              placeholder: a
            }
          )
        ] }),
        h && /* @__PURE__ */ c.jsx("div", { className: pM, children: h }),
        /* @__PURE__ */ c.jsxs("div", { className: yM, children: [
          /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "md", onClick: i, disabled: j, children: "Cancel" }),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "md",
              onClick: () => {
                W();
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
function wM({
  deploymentId: t,
  voiceAssets: a,
  mappings: i,
  characterColors: l,
  onVoiceAssetsChange: o
}) {
  const [d, h] = y.useState(""), [m, g] = y.useState("all"), [p, b] = y.useState(!1), [v, S] = y.useState(null), [w, j] = y.useState(!1), [T, M] = y.useState(!1), N = y.useRef(null), k = y.useCallback(
    (te) => "upload",
    []
  ), A = y.useMemo(() => {
    const te = d.trim().toLowerCase();
    return a.filter((ce) => {
      const W = k(ce);
      return !(m === "uploaded" && W !== "upload" || m === "preset" && W !== "preset" || te && !ce.displayName.toLowerCase().includes(te));
    });
  }, [a, d, m, k]), C = y.useMemo(
    () => a.filter((te) => k(te) === "upload").length,
    [a, k]
  ), V = y.useCallback(
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
  ), G = y.useCallback(
    async (te) => {
      const ce = Array.from(te).slice(0, 8);
      if (ce.length !== 0) {
        M(!0);
        try {
          const W = [];
          for (const O of ce) {
            if (!O.type.startsWith("audio/") && !/\.(wav|mp3|flac|ogg|m4a|webm)$/i.test(O.name)) {
              fn.error(`${O.name}: not an audio file`);
              continue;
            }
            const R = O.name.replace(/\.[^.]+$/, "");
            try {
              const U = await yc(t, O, R, "speaker");
              W.push(U), fn.success(`Added ${U.displayName}`);
            } catch (U) {
              fn.error(U instanceof Error ? U.message : `${O.name}: upload failed`);
            }
          }
          W.length > 0 && o([...W, ...a]);
        } finally {
          M(!1);
        }
      }
    },
    [t, a, o]
  ), ne = (te) => {
    te.preventDefault(), b(!1), te.dataTransfer?.files && G(te.dataTransfer.files);
  }, D = y.useCallback(async () => {
    const te = window.prompt("Paste an audio URL (https://…)");
    if (te)
      try {
        const ce = await fetch(te);
        if (!ce.ok) throw new Error(`fetch failed: ${ce.status}`);
        const W = await ce.blob(), O = te.split("/").pop()?.split("?")[0] ?? "voice.wav", R = new File([W], O, { type: W.type || "audio/wav" });
        await G([R]);
      } catch (ce) {
        fn.error(ce instanceof Error ? ce.message : "could not fetch URL");
      }
  }, [G]), I = y.useCallback(
    async (te, ce) => {
      try {
        const W = await DT(t, te, ce);
        o(
          a.map((O) => O.voiceAssetId === te ? W : O)
        ), fn.success(`Renamed to ${W.displayName}`);
      } catch (W) {
        fn.error(W instanceof Error ? W.message : "rename failed");
      }
    },
    [t, a, o]
  ), F = y.useCallback((te) => {
    navigator.clipboard?.writeText ? (navigator.clipboard.writeText(te), fn.success("Copied name")) : fn.error("Clipboard unavailable");
  }, []), ie = y.useCallback(
    async (te) => {
      if (window.confirm(`Delete "${te.displayName}"? Mappings using it will reset.`))
        try {
          await AT(t, te.voiceAssetId), o(a.filter((W) => W.voiceAssetId !== te.voiceAssetId)), fn.success(`Deleted ${te.displayName}`);
        } catch (W) {
          fn.error(W instanceof Error ? W.message : "delete failed");
        }
    },
    [t, a, o]
  );
  return /* @__PURE__ */ c.jsxs("div", { className: bR, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: xR,
        "data-over": p ? "true" : "false",
        onDragOver: (te) => {
          te.preventDefault(), b(!0);
        },
        onDragLeave: () => b(!1),
        onDrop: ne,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: SR, "aria-hidden": "true", children: "⇪" }),
          /* @__PURE__ */ c.jsxs("div", { className: wR, children: [
            /* @__PURE__ */ c.jsxs("div", { className: jR, children: [
              "Drop reference audio to add a voice",
              /* @__PURE__ */ c.jsx("span", { className: ER, children: ".wav · .mp3 · .flac · .ogg · 4–30s recommended" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: NR, children: [
              "or",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => N.current?.click(),
                  children: "browse files"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => {
                    D();
                  },
                  children: "paste URL"
                }
              ),
              "·",
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: cf,
                  onClick: () => j(!0),
                  children: "record from mic"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "md",
              disabled: T,
              onClick: () => N.current?.click(),
              children: "+ Upload"
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: N,
              type: "file",
              accept: "audio/*,.wav,.mp3,.flac,.ogg,.m4a,.webm",
              multiple: !0,
              className: OR,
              onChange: (te) => {
                te.target.files && (G(te.target.files), te.target.value = "");
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: TR, children: [
      /* @__PURE__ */ c.jsxs("label", { className: CR, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "⌕" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: RR,
            value: d,
            onChange: (te) => h(te.target.value),
            placeholder: "Search voices…",
            "aria-label": "Search voices"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: MR, role: "group", "aria-label": "Filter voices", children: [
        ["all", "All"],
        ["uploaded", "Uploaded"],
        ["preset", "Built-in"]
      ].map(([te, ce]) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: _R,
          "data-active": m === te ? "true" : "false",
          onClick: () => g(te),
          children: ce
        },
        te
      )) }),
      /* @__PURE__ */ c.jsxs("span", { className: zR, children: [
        /* @__PURE__ */ c.jsx("span", { className: kR, children: a.length }),
        " voices",
        /* @__PURE__ */ c.jsx("span", { children: "·" }),
        /* @__PURE__ */ c.jsxs("span", { children: [
          C,
          " uploaded"
        ] })
      ] })
    ] }),
    A.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: DR, children: a.length === 0 ? "No voices yet. Drop audio above or record from your microphone." : "No voices match this filter." }) : /* @__PURE__ */ c.jsx("div", { className: AR, children: A.map((te) => {
      const ce = k(te);
      return /* @__PURE__ */ c.jsx(
        sM,
        {
          asset: te,
          presentation: ce,
          usedBy: V(te.voiceAssetId),
          isPlaying: v === te.voiceAssetId,
          onTogglePlay: () => S((W) => W === te.voiceAssetId ? null : te.voiceAssetId),
          onPlaybackEnded: () => S(null),
          onRename: (W) => I(te.voiceAssetId, W),
          onCopyName: () => F(te.displayName),
          onDelete: ce === "upload" ? () => void ie(te) : void 0
        },
        te.voiceAssetId
      );
    }) }),
    /* @__PURE__ */ c.jsx(
      SM,
      {
        open: w,
        defaultName: `Take ${a.length + 1}`,
        onClose: () => j(!1),
        onSubmit: async (te, ce) => {
          await re(te, ce);
        }
      }
    )
  ] });
  async function re(te, ce) {
    M(!0);
    try {
      const W = await yc(t, te, ce, "speaker");
      o([W, ...a]), fn.success(`Recorded ${W.displayName}`);
    } catch (W) {
      throw fn.error(W instanceof Error ? W.message : "upload failed"), W;
    } finally {
      M(!1);
    }
  }
}
async function Xx(t) {
  return ht(`/presets?deploymentId=${encodeURIComponent(t)}`);
}
async function jM(t, a, i) {
  return ht("/presets", {
    method: "POST",
    body: JSON.stringify({ deploymentId: t, presetName: a, vector: i })
  });
}
async function EM(t, a) {
  await ht(
    `/presets/${a}?deploymentId=${encodeURIComponent(t)}`,
    { method: "DELETE" }
  );
}
var s0 = "_190jlds0", NM = "_190jlds1", TM = "_190jlds2", CM = "_190jlds3", RM = "_190jlds4", MM = "_190jlds5", _M = "_190jlds6", AM = "_190jlds7", DM = "_190jlds8", zM = "_190jlds9", l0 = "_190jldsa", kM = "_190jldsb", o0 = "_190jldsc", OM = "_190jldsd", LM = "_190jldse", UM = "_190jldsf";
function BM({
  deploymentId: t,
  targets: a,
  onRevertToIdentity: i,
  onRevertToChain: l,
  emptyHint: o
}) {
  const [d, h] = y.useState(() => Ui(a[0])), [m, g] = y.useState([]), [p, b] = y.useState(!1), [v, S] = y.useState(null), [w, j] = y.useState(!1), [T, M] = y.useState(null), N = y.useMemo(
    () => a.find((C) => Ui(C) === d) ?? a[0],
    [a, d]
  );
  y.useEffect(() => {
    a.length && (a.some((C) => Ui(C) === d) || h(Ui(a[0])));
  }, [a, d]), y.useEffect(() => {
    if (!N) {
      g([]);
      return;
    }
    let C = !1;
    return b(!0), S(null), dc(t, N.kind, N.id, 50).then((V) => {
      C || g(V.entries);
    }).catch((V) => {
      C || S(V instanceof Error ? V.message : "audit fetch failed");
    }).finally(() => {
      C || b(!1);
    }), () => {
      C = !0;
    };
  }, [t, N]);
  const k = y.useCallback(() => {
    if (!N) return;
    const C = {
      deploymentId: t,
      targetKind: N.kind,
      targetId: N.id,
      targetLabel: N.label,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      entries: m
    }, V = new Blob([JSON.stringify(C, null, 2)], {
      type: "application/json"
    }), G = URL.createObjectURL(V), ne = document.createElement("a");
    ne.href = G, ne.download = `audit-${N.kind}-${N.id}-${Date.now()}.json`, document.body.appendChild(ne), ne.click(), document.body.removeChild(ne), URL.revokeObjectURL(G);
  }, [t, m, N]), A = y.useCallback(async () => {
    if (!(!N || !i) && window.confirm(
      `Revert "${N.label}" to identity (no edits)? This will write a new audit entry.`
    )) {
      j(!0);
      try {
        await i(N);
        const C = await dc(t, N.kind, N.id, 50);
        g(C.entries);
      } catch (C) {
        S(C instanceof Error ? C.message : "revert failed");
      } finally {
        j(!1);
      }
    }
  }, [t, i, N]);
  return a.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: s0, children: /* @__PURE__ */ c.jsx("p", { className: o0, children: o ?? "Audit history surfaces here once a script is parsed and at least one cast member is mapped." }) }) : /* @__PURE__ */ c.jsxs("div", { className: s0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: NM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: TM, children: [
        /* @__PURE__ */ c.jsx("label", { htmlFor: "audit-target-select", className: l0, children: "Target" }),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            id: "audit-target-select",
            className: CM,
            value: d,
            onChange: (C) => h(C.target.value),
            children: a.map((C) => /* @__PURE__ */ c.jsxs("option", { value: Ui(C), children: [
              C.kind === "voice_asset" ? "Voice asset" : "Utterance",
              " · ",
              C.label
            ] }, Ui(C)))
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: RM, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: k,
            disabled: m.length === 0 || p,
            children: "Export JSON"
          }
        ),
        i && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => void A(),
            disabled: w || !N,
            children: w ? "Reverting…" : "Revert to identity"
          }
        )
      ] })
    ] }),
    v && /* @__PURE__ */ c.jsx("div", { className: LM, children: v }),
    p && !v && /* @__PURE__ */ c.jsx("div", { className: UM, "aria-live": "polite", children: "Loading edit history…" }),
    !p && !v && m.length === 0 && /* @__PURE__ */ c.jsxs("p", { className: o0, children: [
      "No edits recorded for this target yet.",
      /* @__PURE__ */ c.jsx("br", {}),
      /* @__PURE__ */ c.jsx("span", { className: OM, children: "Apply a chain in the editor to populate the history." })
    ] }),
    !p && !v && m.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: MM, children: m.map((C) => {
      const V = l && N && !!C.chain_snapshot_json && C.operation_count > 0;
      return /* @__PURE__ */ c.jsxs("li", { className: _M, children: [
        /* @__PURE__ */ c.jsx("span", { className: AM, children: $M(C.recorded_at) }),
        /* @__PURE__ */ c.jsx("span", { className: DM, children: C.operation_count === 0 ? "cleared" : `${C.operation_count} ops` }),
        /* @__PURE__ */ c.jsxs("span", { className: zM, title: C.digest_after, children: [
          C.digest_after.slice(0, 12),
          "…"
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: l0, children: C.actor || "—" }),
        /* @__PURE__ */ c.jsx(
          "span",
          {
            className: kM,
            style: {
              background: `color-mix(in oklab, ${C.operation_count === 0 ? "var(--error)" : "var(--accent)"} 14%, transparent)`,
              color: C.operation_count === 0 ? "var(--error)" : "var(--accent)"
            },
            children: C.digest_before === "" || !C.digest_before ? "create" : C.operation_count === 0 ? "clear" : "update"
          }
        ),
        V && /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "ghost",
            size: "xs",
            disabled: w || T !== null,
            onClick: async () => {
              if (!(!N || !C.chain_snapshot_json) && !(T !== null || w) && window.confirm(
                `Replay this ${C.operation_count}-op chain on "${N.label}"? A new audit entry will be written.`
              )) {
                M(C.entry_id);
                try {
                  await l(N, C.chain_snapshot_json, C);
                  const G = await dc(
                    t,
                    N.kind,
                    N.id,
                    50
                  );
                  g(G.entries);
                } catch (G) {
                  S(G instanceof Error ? G.message : "revert failed");
                } finally {
                  M(null);
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
function Ui(t) {
  return t ? `${t.kind}:${t.id}` : "";
}
function $M(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var VM = "_1uzgubz0", HM = "_1uzgubz1", qM = "_1uzgubz2", IM = "_1uzgubz3", FM = "_1uzgubz4", YM = "_1uzgubz5", GM = "_1uzgubz6", XM = "_1uzgubz7", c0 = "_1uzgubz8", PM = "_1uzgubz9", Px = "_1uzgubza", Kx = "_1uzgubzb", KM = "_1uzgubzc", QM = "_1uzgubzd", uf = "_1uzgubze", df = "_1uzgubzf", ZM = "_1uzgubzg", JM = "_1uzgubzh", u0 = "_1uzgubzi", d0 = "_1uzgubzj", f0 = "_1uzgubzk", h0 = "_1uzgubzl", m0 = "_1uzgubzm", WM = "_1uzgubzn", e_ = "_1uzgubzo", t_ = "_1uzgubzp", n_ = "_1uzgubzq";
function a_({
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
  const [S, w] = y.useState(!1), j = l ? o.find((k) => k.voiceAssetId === l.speakerVoiceAssetId) : null, T = l?.defaultVectorPresetId ? d.find((k) => k.presetId === l.defaultVectorPresetId) ?? null : null, M = (t[0] ?? "?").toUpperCase(), N = l !== null;
  return /* @__PURE__ */ c.jsxs("div", { className: `${VM}${h ? ` ${HM}` : ""}`, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: qM,
        onClick: m,
        "aria-expanded": h,
        children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: IM,
              style: {
                background: `color-mix(in oklab, ${a} 22%, transparent)`,
                color: a
              },
              children: M
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: FM, children: [
            /* @__PURE__ */ c.jsx("span", { className: YM, style: { color: a }, children: t }),
            /* @__PURE__ */ c.jsxs("span", { className: GM, children: [
              i,
              " lines"
            ] })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: XM, children: [
            j ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: c0, children: j.displayName }),
              j.durationMs != null && /* @__PURE__ */ c.jsxs("span", { children: [
                p0(j.durationMs),
                " ·",
                " ",
                j.sampleRate ? `${j.sampleRate} Hz` : "—"
              ] })
            ] }) : T ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              /* @__PURE__ */ c.jsx("span", { className: c0, children: T.presetName }),
              /* @__PURE__ */ c.jsx("span", { children: "preset" })
            ] }) : /* @__PURE__ */ c.jsx("span", { children: "no voice assigned" }),
            l?.voiceAssetChainDigest && /* @__PURE__ */ c.jsxs("span", { className: KM, children: [
              "chain · ",
              l.voiceAssetChainDigest.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: `${PM} ${N ? Px : Kx}`,
              children: N ? "Mapped" : "Unmapped"
            }
          )
        ]
      }
    ),
    h && /* @__PURE__ */ c.jsxs("div", { className: QM, children: [
      /* @__PURE__ */ c.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ c.jsx("span", { className: df, children: "Drop new audio" }),
        /* @__PURE__ */ c.jsxs(
          "label",
          {
            className: `${ZM}${S ? ` ${JM}` : ""}`,
            onDragEnter: (k) => {
              k.preventDefault(), w(!0);
            },
            onDragOver: (k) => k.preventDefault(),
            onDragLeave: () => w(!1),
            onDrop: (k) => {
              k.preventDefault(), w(!1);
              const A = k.dataTransfer.files?.[0];
              A && b && b(A);
            },
            children: [
              /* @__PURE__ */ c.jsx("span", { children: "Drop a WAV / MP3 / FLAC here, or click to browse" }),
              /* @__PURE__ */ c.jsx(
                "input",
                {
                  type: "file",
                  accept: "audio/*",
                  style: { display: "none" },
                  onChange: (k) => {
                    const A = k.target.files?.[0];
                    A && b && b(A);
                  }
                }
              )
            ]
          }
        )
      ] }),
      o.length > 0 && /* @__PURE__ */ c.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ c.jsx("span", { className: df, children: "Reference library" }),
        /* @__PURE__ */ c.jsx("div", { className: u0, children: o.map((k) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${d0}${l?.speakerVoiceAssetId === k.voiceAssetId ? ` ${f0}` : ""}`,
            onClick: () => g(k.voiceAssetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: k.displayName }),
              /* @__PURE__ */ c.jsxs("span", { className: m0, children: [
                k.durationMs != null ? p0(k.durationMs) : "—",
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
      d.length > 0 && p && /* @__PURE__ */ c.jsxs("div", { className: uf, children: [
        /* @__PURE__ */ c.jsx("span", { className: df, children: "Preset voices" }),
        /* @__PURE__ */ c.jsx("div", { className: u0, children: d.map((k) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: `${d0}${l?.defaultVectorPresetId === k.presetId ? ` ${f0}` : ""}`,
            onClick: () => p(k.presetId),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: h0, children: k.presetName }),
              /* @__PURE__ */ c.jsx("span", { className: m0, children: "preset · vector" })
            ]
          },
          k.presetId
        )) })
      ] }),
      N && v && /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: v, children: "Clear mapping →" })
    ] })
  ] });
}
function p0(t) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return `${i}:${l.toString().padStart(2, "0")}`;
}
function r_({
  unmappedCount: t,
  totalCount: a,
  children: i,
  emptyHint: l
}) {
  if (a === 0)
    return /* @__PURE__ */ c.jsx("p", { className: n_, children: l ?? "Add at least one tagged dialogue line to populate the cast." });
  const o = t === 0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("header", { className: WM, children: /* @__PURE__ */ c.jsx(
      "span",
      {
        className: `${e_} ${o ? Px : Kx}`,
        children: o ? `All ${a} mapped` : `${t} of ${a} unmapped`
      }
    ) }),
    /* @__PURE__ */ c.jsx("ul", { className: t_, children: i })
  ] });
}
async function bc() {
  return ht("/runtime/health");
}
async function i_() {
  await ht("/runtime/start", { method: "POST" });
}
async function s_() {
  return ht("/runtime/stop", { method: "POST" });
}
function Qx(t) {
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
var l_ = { warning: "_1kkikih1 _1kkikih0", error: "_1kkikih2 _1kkikih0", success: "_1kkikih3 _1kkikih0" };
function zn({
  severity: t,
  children: a,
  role: i,
  ariaLive: l,
  className: o,
  style: d
}) {
  const h = [l_[t], o].filter(Boolean).join(" "), m = i ?? (t === "error" ? "alert" : "status"), g = l ?? (t === "error" ? "assertive" : "polite");
  return /* @__PURE__ */ c.jsx("div", { className: h, role: m, "aria-live": g, style: d, children: a });
}
var Zx = { sm: "_13bb4nj2 _13bb4nj1", md: "_13bb4nj3 _13bb4nj1" }, Jx = { neutral: "_13bb4nj4", accent: "_13bb4nj5", success: "_13bb4nj6", danger: "_13bb4nj7", warning: "_13bb4nj8", secondary: "_13bb4nj9", faint: "_13bb4nja" }, o_ = "_13bb4njb";
function Zr({
  tone: t,
  size: a = "sm",
  pulse: i = !1,
  children: l,
  className: o,
  style: d,
  title: h
}) {
  const m = i && t !== "faint", g = [Zx[a], Jx[t], m ? o_ : null, o].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("span", { className: g, style: d, title: h, children: l });
}
const c_ = 4e3;
function u_({ deployment: t }) {
  const [a, i] = y.useState(null), [l, o] = y.useState(null);
  y.useEffect(() => {
    let m = !1;
    const g = async () => {
      try {
        const b = await bc();
        m || (i(b), o(null));
      } catch (b) {
        m || o(h_(b));
      }
    };
    g();
    const p = setInterval(g, c_);
    return () => {
      m = !0, clearInterval(p);
    };
  }, []);
  const d = a?.badge ?? "not_installed", h = l?.includes("model_missing") ?? !1;
  return /* @__PURE__ */ c.jsxs("output", { className: pR, "aria-live": "polite", children: [
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Runtime" }),
    /* @__PURE__ */ c.jsx("span", { children: t.backendRuntimePreference ?? "indextts.python" }),
    /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Badge" }),
    /* @__PURE__ */ c.jsx(Zr, { tone: d_(d), pulse: d === "starting" || d === "installing", children: Qx(d) }),
    a && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Uptime" }),
      /* @__PURE__ */ c.jsx("span", { children: f_(a.uptimeSeconds) }),
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "VRAM" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        a.vramUsedMb,
        " / ",
        a.vramTotalMb,
        " MB"
      ] })
    ] }),
    l && !h && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: l })
  ] });
}
function d_(t) {
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
function f_(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${t % 60}s` : `${Math.floor(a / 60)}h ${a % 60}m`;
}
function h_(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
const xc = {
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
}, Ba = 1e-3;
function m_(t, a, i) {
  for (const l of Object.keys(xc)) {
    const o = xc[l];
    if (Math.abs(o.low - t) < Ba && Math.abs(o.mid - a) < Ba && Math.abs(o.high - i) < Ba)
      return l;
  }
  return "custom";
}
function p_(t) {
  let a = g_();
  for (const i of t.ops)
    a = v_(a, i);
  return a;
}
function v_(t, a) {
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
          preset: m_(a.low_db, a.mid_db, a.high_db)
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
function g_() {
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
function jr(t, a) {
  return [...t, a];
}
function y_(t, a) {
  const i = wr(t, "gain");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const l = { id: Sn(), mode: "gain", gain_db: a };
  return { ...t, ops: jr(i, l) };
}
function b_(t, a, i, l) {
  const o = wr(t, "eq3");
  if (Math.abs(a) < Ba && Math.abs(i) < Ba && Math.abs(l) < Ba)
    return { ...t, ops: o };
  const d = {
    id: Sn(),
    mode: "eq3",
    low_db: a,
    mid_db: i,
    high_db: l
  };
  return { ...t, ops: jr(o, d) };
}
function x_(t, a) {
  const i = wr(t, "speed");
  if (Math.abs(a - 1) < Ba) return { ...t, ops: i };
  const l = { id: Sn(), mode: "speed", factor: a };
  return { ...t, ops: jr(i, l) };
}
function S_(t, a) {
  const i = wr(t, "pitch_shift");
  if (Math.abs(a) < Ba) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "pitch_shift",
    semitones: a
  };
  return { ...t, ops: jr(i, l) };
}
function w_(t, a, i) {
  const l = wr(t, "normalize");
  if (a === "off") return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "normalize",
    target_lufs: i
  };
  return { ...t, ops: jr(l, o) };
}
function j_(t, a) {
  const i = wr(t, "fade_in");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_in",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: jr(i, l) };
}
function E_(t, a) {
  const i = wr(t, "fade_out");
  if (a <= 0) return { ...t, ops: i };
  const l = {
    id: Sn(),
    mode: "fade_out",
    duration_ms: Math.round(a * 1e3)
  };
  return { ...t, ops: jr(i, l) };
}
function N_(t, a, i) {
  const l = wr(t, "silence_strip");
  if (!a) return { ...t, ops: l };
  const o = {
    id: Sn(),
    mode: "silence_strip",
    threshold_db: i
  };
  return { ...t, ops: jr(l, o) };
}
const Wx = /* @__PURE__ */ new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip"
]);
function e1(t, a) {
  const i = {
    ...t,
    ops: t.ops.filter((d) => !Wx.has(d.mode))
  };
  let o = y_({ version: 1, ops: [] }, a.volumeDb);
  return o = b_(
    o,
    a.eq3.low,
    a.eq3.mid,
    a.eq3.high
  ), a.speed.mode === "audio" && (o = x_(o, a.speed.value)), o = S_(o, a.pitchSt), o = w_(
    o,
    a.normalize.mode === "off" ? "off" : "loudness",
    a.normalize.targetDbOrLufs
  ), o = j_(o, a.fade.inS), o = E_(o, a.fade.outS), o = N_(
    o,
    a.silence.enabled,
    a.silence.thresholdDb
  ), { ...i, ops: [...i.ops, ...o.ops] };
}
function t1(t) {
  const a = {
    ...t,
    ops: t.ops.filter((i) => Wx.has(i.mode))
  };
  return p_(a);
}
var T_ = "_1rsa80i0", C_ = "_1rsa80i1", R_ = "_1rsa80i2", M_ = "_1rsa80i3", __ = "_1rsa80i4", A_ = "_1rsa80i5", D_ = "_1rsa80i6", z_ = "_1rsa80i7", k_ = "_1rsa80i8", O_ = "_1rsa80i9";
const n1 = ["flat", "warm", "bright", "voice", "telephone"], Js = -12, Xo = 12, L_ = 0.5;
function U_(t) {
  const { low: a, mid: i, high: l, preset: o, onChange: d, disabled: h } = t, m = (p) => {
    const b = xc[p];
    d(b.low, b.mid, b.high, p);
  }, g = (p, b) => {
    const v = { low: a, mid: i, high: l, [p]: b }, S = $_(v.low, v.mid, v.high);
    d(v.low, v.mid, v.high, S);
  };
  return /* @__PURE__ */ c.jsxs("div", { className: T_, children: [
    /* @__PURE__ */ c.jsxs("div", { className: C_, role: "group", "aria-label": "EQ presets", children: [
      n1.map((p) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: R_,
          "data-active": o === p,
          onClick: () => m(p),
          disabled: h,
          children: p
        },
        p
      )),
      o === "custom" ? /* @__PURE__ */ c.jsx("span", { className: M_, children: "custom" }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: __, children: [
      /* @__PURE__ */ c.jsx(
        ff,
        {
          label: "Low",
          value: a,
          onChange: (p) => g("low", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
        ff,
        {
          label: "Mid",
          value: i,
          onChange: (p) => g("mid", p),
          disabled: h
        }
      ),
      /* @__PURE__ */ c.jsx(
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
  const o = (a - Js) / (Xo - Js) * 100, d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: A_, children: [
    /* @__PURE__ */ c.jsx("label", { htmlFor: d, className: D_, children: t }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: d,
        type: "range",
        min: Js,
        max: Xo,
        step: L_,
        value: a,
        disabled: l,
        className: k_,
        style: { "--fill": `${o}%` },
        onChange: (h) => i(Number(h.target.value)),
        "aria-valuemin": Js,
        "aria-valuemax": Xo,
        "aria-valuenow": a
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: z_, children: B_(a) }),
    /* @__PURE__ */ c.jsxs("span", { className: O_, "aria-hidden": "true", children: [
      /* @__PURE__ */ c.jsx("span", { children: Js }),
      /* @__PURE__ */ c.jsx("span", { children: "0" }),
      /* @__PURE__ */ c.jsxs("span", { children: [
        "+",
        Xo
      ] })
    ] })
  ] });
}
function B_(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
const hf = 1e-3;
function $_(t, a, i) {
  for (const l of n1) {
    const o = xc[l];
    if (Math.abs(o.low - t) < hf && Math.abs(o.mid - a) < hf && Math.abs(o.high - i) < hf)
      return l;
  }
  return "custom";
}
var V_ = "_85bhwb0", H_ = "_85bhwb1", v0 = "_85bhwb2", q_ = "_85bhwb3", I_ = "_85bhwb4", F_ = "_85bhwb5", Y_ = "_85bhwb6", G_ = "_85bhwb7";
const Po = 0.5, mf = 2, X_ = 0.05;
function P_(t) {
  const { mode: a, value: i, supportsSynthSpeed: l, onChange: o, onReRenderAtSynthTime: d, disabled: h } = t, m = (i - Po) / (mf - Po) * 100, g = y.useId(), p = (v) => o(v, i), b = (v) => o(a, v);
  return /* @__PURE__ */ c.jsxs("div", { className: V_, children: [
    l ? /* @__PURE__ */ c.jsxs("div", { className: H_, role: "group", "aria-label": "Speed mode", children: [
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: v0,
          "data-active": a === "audio",
          onClick: () => p("audio"),
          disabled: h,
          children: "Audio"
        }
      ),
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: v0,
          "data-active": a === "synth",
          onClick: () => p("synth"),
          disabled: h,
          children: "Synth"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: q_, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          id: g,
          type: "range",
          min: Po,
          max: mf,
          step: X_,
          value: i,
          disabled: h,
          className: I_,
          style: { "--fill": `${m}%` },
          onChange: (v) => b(Number(v.target.value)),
          "aria-valuemin": Po,
          "aria-valuemax": mf,
          "aria-valuenow": i,
          "aria-label": "Speed factor"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: F_, children: `${i.toFixed(2)}×` })
    ] }),
    a === "synth" && l ? /* @__PURE__ */ c.jsxs("div", { className: Y_, children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "primary",
          size: "sm",
          onClick: d,
          disabled: h || !d,
          children: "Re-render at synth-time"
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: G_, children: "Synth-time speed re-runs the worker for new utterances." })
    ] }) : null
  ] });
}
var K_ = "kgszk50", Q_ = "kgszk51", g0 = "kgszk52", Z_ = "kgszk53", J_ = "kgszk54", a1 = "kgszk55", W_ = "kgszk56", eA = "kgszk58", Hh = "kgszk59", r1 = "kgszk5a", qh = "kgszk5b", tA = "kgszk5c", nA = "kgszk5d", aA = "kgszk5e", y0 = "kgszk5f", b0 = "kgszk5g", x0 = "kgszk5h", rA = "kgszk5i", iA = "kgszk5j", sA = "kgszk5l", pl = "kgszk5m", vl = "kgszk5n";
const lA = -24, oA = 24, cA = 0.5, uA = -12, dA = 12, fA = 0.5, hA = -30, mA = -6, pA = -12, vA = 0, Ko = -60, pf = -20;
function Ih(t) {
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
  } = t, b = (w) => {
    i({ ...a, ...w });
  }, v = xA(a), S = (w) => {
    const j = w.target;
    j && (j.tagName === "INPUT" || j.tagName === "BUTTON" || j.closest("input, button")) && d?.();
  };
  return /* @__PURE__ */ c.jsxs("div", { className: K_, onPointerDownCapture: S, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Q_, children: [
      v.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Z_, children: "No active edits" }) : /* @__PURE__ */ c.jsxs("span", { className: g0, children: [
        /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "Active:" }),
        /* @__PURE__ */ c.jsx("span", { children: v.join(" · ") })
      ] }),
      h ? /* @__PURE__ */ c.jsxs("span", { className: g0, "aria-live": "polite", children: [
        /* @__PURE__ */ c.jsx("span", { className: J_, "aria-hidden": "true" }),
        "Re-rendering"
      ] }) : null
    ] }),
    /* @__PURE__ */ c.jsx(
      S0,
      {
        label: "Volume",
        sub: "Pre-mix gain in dB",
        min: lA,
        max: oA,
        step: cA,
        format: SA,
        value: a.volumeDb,
        onChange: (w) => b({ volumeDb: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "3-band EQ" }),
      /* @__PURE__ */ c.jsx(
        U_,
        {
          low: a.eq3.low,
          mid: a.eq3.mid,
          high: a.eq3.high,
          preset: a.eq3.preset,
          disabled: m,
          onChange: (w, j, T, M) => b({ eq3: { low: w, mid: j, high: T, preset: M } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
      /* @__PURE__ */ c.jsx("span", { className: vl, children: "Speed" }),
      /* @__PURE__ */ c.jsx(
        P_,
        {
          mode: a.speed.mode,
          value: a.speed.value,
          supportsSynthSpeed: l,
          ...o ? { onReRenderAtSynthTime: o } : {},
          disabled: m,
          onChange: (w, j) => b({ speed: { mode: w, value: j } })
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(
      S0,
      {
        label: "Pitch",
        sub: "Semitone shift, duration-preserving",
        min: uA,
        max: dA,
        step: fA,
        format: wA,
        value: a.pitchSt,
        onChange: (w) => b({ pitchSt: w }),
        disabled: m
      }
    ),
    /* @__PURE__ */ c.jsx(
      gA,
      {
        normalize: a.normalize,
        disabled: m,
        onChange: (w) => b({ normalize: w })
      }
    ),
    /* @__PURE__ */ c.jsx(
      yA,
      {
        inS: a.fade.inS,
        outS: a.fade.outS,
        disabled: m,
        onChange: (w, j) => b({ fade: { ...a.fade, inS: w, outS: j } })
      }
    ),
    /* @__PURE__ */ c.jsx(
      bA,
      {
        enabled: a.silence.enabled,
        thresholdDb: a.silence.thresholdDb,
        disabled: m,
        onChange: (w, j) => b({ silence: { enabled: w, thresholdDb: j } })
      }
    ),
    g ? /* @__PURE__ */ c.jsxs("div", { className: sA, children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => i(Uc),
          disabled: m,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "md", onClick: g, disabled: m, children: p })
    ] }) : null
  ] });
}
function S0(t) {
  const { label: a, sub: i, min: l, max: o, step: d, format: h, value: m, onChange: g, disabled: p } = t, b = (m - l) / (o - l) * 100, v = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: a1, children: [
    /* @__PURE__ */ c.jsxs("div", { className: W_, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: eA, children: a }),
      /* @__PURE__ */ c.jsx("span", { className: r1, children: i })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: v,
        type: "range",
        min: l,
        max: o,
        step: d,
        value: m,
        disabled: p,
        className: qh,
        style: { "--fill": `${b}%` },
        onChange: (S) => g(Number(S.target.value)),
        "aria-valuemin": l,
        "aria-valuemax": o,
        "aria-valuenow": m
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: Hh, children: h(m) })
  ] });
}
function gA({ normalize: t, onChange: a, disabled: i }) {
  const o = t.mode === "loudness" ? { min: hA, max: mA, step: 0.5, suffix: "LUFS" } : { min: pA, max: vA, step: 0.5, suffix: "dB" }, d = jA(t.targetDbOrLufs, o.min, o.max), h = (d - o.min) / (o.max - o.min) * 100, m = (g) => {
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
    /* @__PURE__ */ c.jsx("div", { className: tA, role: "group", "aria-label": "Normalize mode", children: ["off", "peak", "loudness"].map((g) => {
      const p = g === "peak";
      return /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: nA,
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
    t.mode !== "off" ? /* @__PURE__ */ c.jsxs("div", { className: a1, children: [
      /* @__PURE__ */ c.jsx("span", { className: r1, children: "Target" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: o.min,
          max: o.max,
          step: o.step,
          value: d,
          disabled: i,
          className: qh,
          style: { "--fill": `${h}%` },
          onChange: (g) => a({ mode: t.mode, targetDbOrLufs: Number(g.target.value) }),
          "aria-valuemin": o.min,
          "aria-valuemax": o.max,
          "aria-valuenow": d,
          "aria-label": `Normalize target ${o.suffix}`
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Hh, children: [
        d.toFixed(1),
        " ",
        o.suffix
      ] })
    ] }) : null
  ] });
}
function yA({ inS: t, outS: a, onChange: i, disabled: l }) {
  const o = y.useId(), d = y.useId();
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Fade" }),
    /* @__PURE__ */ c.jsxs("div", { className: aA, children: [
      /* @__PURE__ */ c.jsxs("div", { className: y0, children: [
        /* @__PURE__ */ c.jsx("label", { className: b0, htmlFor: o, children: "Fade in (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: o,
            type: "number",
            min: 0,
            step: 0.05,
            value: t,
            disabled: l,
            className: x0,
            onChange: (h) => i(Math.max(0, Number(h.target.value)), a)
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: y0, children: [
        /* @__PURE__ */ c.jsx("label", { className: b0, htmlFor: d, children: "Fade out (s)" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: d,
            type: "number",
            min: 0,
            step: 0.05,
            value: a,
            disabled: l,
            className: x0,
            onChange: (h) => i(t, Math.max(0, Number(h.target.value)))
          }
        )
      ] })
    ] })
  ] });
}
function bA({ enabled: t, thresholdDb: a, onChange: i, disabled: l }) {
  const o = (a - Ko) / (pf - Ko) * 100;
  return /* @__PURE__ */ c.jsxs("div", { className: pl, children: [
    /* @__PURE__ */ c.jsx("span", { className: vl, children: "Silence trim" }),
    /* @__PURE__ */ c.jsxs("div", { className: rA, children: [
      /* @__PURE__ */ c.jsxs("label", { className: iA, children: [
        /* @__PURE__ */ c.jsx(
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
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: Ko,
          max: pf,
          step: 1,
          value: a,
          disabled: l || !t,
          className: qh,
          style: { "--fill": `${o}%`, flex: 1 },
          onChange: (d) => i(t, Number(d.target.value)),
          "aria-valuemin": Ko,
          "aria-valuemax": pf,
          "aria-valuenow": a,
          "aria-label": "Silence threshold dB"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Hh, children: [
        a.toFixed(0),
        " dB"
      ] })
    ] })
  ] });
}
const Bi = 1e-3;
function xA(t) {
  const a = [];
  return Math.abs(t.volumeDb) >= Bi && a.push("gain"), (Math.abs(t.eq3.low) >= Bi || Math.abs(t.eq3.mid) >= Bi || Math.abs(t.eq3.high) >= Bi) && a.push("eq3"), t.speed.mode === "audio" && Math.abs(t.speed.value - 1) >= Bi && a.push("speed"), Math.abs(t.pitchSt) >= Bi && a.push("pitch"), t.normalize.mode !== "off" && a.push("normalize"), t.fade.inS > 0 && a.push("fade-in"), t.fade.outS > 0 && a.push("fade-out"), t.silence.enabled && a.push("silence"), a;
}
function SA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} dB`;
}
function wA(t) {
  return `${t > 0 ? "+" : ""}${t.toFixed(1)} st`;
}
function jA(t, a, i) {
  return Number.isFinite(t) ? Math.max(a, Math.min(i, t)) : a;
}
var EA = "skdk4g0", NA = "skdk4g1", w0 = "skdk4g2", TA = "skdk4g3", CA = "skdk4g4", RA = "skdk4g5", MA = "skdk4g6", _A = "skdk4g7", AA = "skdk4g8", DA = "skdk4g9", zA = "skdk4ga", kA = "skdk4gb", OA = "skdk4gc", LA = "skdk4gd", j0 = "skdk4ge", E0 = "skdk4gf", UA = "skdk4gg", N0 = "skdk4gh", T0 = "skdk4gi", BA = "skdk4gj", $A = "skdk4gk", VA = "skdk4gl", C0 = "skdk4gm", HA = "skdk4gn", R0 = "skdk4go", qA = "skdk4gp", IA = "skdk4gq", FA = "skdk4gr", YA = "skdk4gs", GA = "skdk4gt", XA = "skdk4gu", PA = "skdk4gv", M0 = "skdk4gw", KA = "skdk4gx", QA = "skdk4gy", ZA = "skdk4gz", JA = "skdk4g10", WA = "cgsfgh1", e2 = "cgsfgh2", t2 = "cgsfgh3", n2 = "cgsfgh4", a2 = "cgsfgh5", r2 = "cgsfgh6", i2 = "cgsfgh7", s2 = "cgsfgh8", l2 = "cgsfgh9", o2 = "cgsfgha", c2 = "cgsfghb", u2 = "cgsfghc", d2 = "cgsfghd", f2 = "cgsfghe", h2 = "cgsfghm", m2 = "cgsfghn", p2 = "cgsfgho", v2 = "cgsfghp";
const Vt = [
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
}, i1 = 0.05;
function g2(t) {
  let a = null, i = -1 / 0;
  for (const l of Vt) {
    const o = t[l];
    o > i && (i = o, a = l);
  }
  return !a || i <= i1 ? null : a;
}
function s1(t, a = 3) {
  return Vt.map((i) => ({ key: i, label: gl[i], value: t[i] })).filter((i) => i.value > i1).sort((i, l) => l.value - i.value).slice(0, a);
}
function y2(t) {
  let a = 0;
  for (const i of Vt) a += t[i] * t[i];
  return Math.sqrt(a);
}
function _0(t) {
  const a = s1(t, 2), i = a[0];
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
  const a = { ...Zi };
  for (const i of Vt) {
    const l = t[i];
    a[i] = Number.isFinite(l) ? Math.max(0, Math.min(1, l)) : 0;
  }
  return a;
}
const A0 = 0.05, D0 = 0.2, b2 = 22, x2 = 320, gf = 0.78;
function yf(t, a, i, l) {
  const o = Math.cos(i), d = Math.sin(i), h = t * o + a * d;
  return Math.max(0, Math.min(1, h / l));
}
function S2(t) {
  const { vec: a, onChange: i, size: l, reduceMotion: o = !1 } = t, [d, h] = y.useState(a), [m, g] = y.useState(null), [p, b] = y.useState(null), v = y.useRef(null), S = y.useRef(a), w = y.useRef(o), j = y.useRef(null), T = y.useRef(0);
  w.current = o, y.useEffect(() => {
    h(a), S.current = a;
  }, [a]);
  const M = y.useCallback(
    (I) => {
      const F = Jr(I);
      h(F), S.current = F, i(F);
    },
    [i]
  ), N = y.useCallback((I) => {
    const F = Jr(I);
    h(F), S.current = F;
  }, []), k = y.useCallback(
    (I) => {
      const F = v.current;
      if (!F || w.current) return;
      const ie = I.clientX - F.centerX, re = I.clientY - F.centerY, te = l / 2 * gf, ce = yf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
      N(W);
    },
    [l, N]
  ), A = y.useCallback(
    (I) => {
      const F = v.current;
      if (F) {
        if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", A), window.removeEventListener("pointercancel", A), w.current) {
          const ie = I.clientX - F.centerX, re = I.clientY - F.centerY, te = l / 2 * gf, ce = yf(ie, re, F.angle, te), W = { ...S.current, [F.axis]: ce };
          v.current = null, M(W);
          return;
        }
        v.current = null, M(S.current);
      }
    },
    [M, k, l]
  );
  y.useEffect(() => () => {
    window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", A), window.removeEventListener("pointercancel", A), v.current = null, j.current !== null && (window.clearTimeout(j.current), j.current = null);
  }, [k, A]);
  const C = y.useCallback((I, F) => {
    w.current || (T.current += 1, b({ x: I, y: F, key: T.current }), j.current !== null && window.clearTimeout(j.current), j.current = window.setTimeout(() => {
      b(null), j.current = null;
    }, x2));
  }, []), V = y.useCallback(
    (I, F, ie, re, te) => {
      const ce = ie.getBoundingClientRect(), W = ce.left + ce.width / 2, O = ce.top + ce.height / 2, U = Vt.indexOf(I) / Vt.length * Math.PI * 2 - Math.PI / 2;
      if (v.current = {
        axis: I,
        pointerId: F,
        centerX: W,
        centerY: O,
        angle: U
      }, g(I), re !== void 0 && te !== void 0) {
        const B = re - W, Z = te - O, _ = l / 2 * gf, J = yf(B, Z, U, _), K = { ...S.current, [I]: J };
        w.current ? M(K) : N(K);
      }
      window.addEventListener("pointermove", k), window.addEventListener("pointerup", A), window.addEventListener("pointercancel", A);
    },
    [M, k, A, l, N]
  ), G = y.useCallback(
    (I, F) => {
      F.preventDefault();
      const ie = F.currentTarget, re = ie.ownerSVGElement ?? ie;
      V(I, F.pointerId, re);
    },
    [V]
  ), ne = y.useCallback(
    (I) => {
      const F = I.currentTarget, ie = F instanceof SVGSVGElement ? F : F.ownerSVGElement ?? F, re = ie.getBoundingClientRect(), te = re.left + re.width / 2, ce = re.top + re.height / 2, W = I.clientX - te, O = I.clientY - ce;
      if (Math.sqrt(W * W + O * O) < 8) return;
      let U = Math.atan2(O, W) * 180 / Math.PI;
      U = ((U + 90) % 360 + 360) % 360;
      let B = null, Z = 999;
      for (let K = 0; K < Vt.length; K++) {
        const le = Vt[K];
        if (!le) continue;
        const fe = K / Vt.length * 360, ge = Math.abs((fe - U + 540) % 360 - 180);
        ge < Z && (Z = ge, B = le);
      }
      if (!B || Z > b2) return;
      I.preventDefault();
      const _ = (I.clientX - re.left) / re.width * l, J = (I.clientY - re.top) / re.height * l;
      C(_, J), V(B, I.pointerId, ie, I.clientX, I.clientY);
    },
    [V, l, C]
  ), D = y.useCallback(
    (I, F) => {
      const ie = S.current[I];
      let re = ie;
      switch (F.key) {
        case "ArrowUp":
        case "ArrowRight":
          re = ie + A0;
          break;
        case "ArrowDown":
        case "ArrowLeft":
          re = ie - A0;
          break;
        case "PageUp":
          re = ie + D0;
          break;
        case "PageDown":
          re = ie - D0;
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
      F.preventDefault(), g(I), M({ ...S.current, [I]: re });
    },
    [M]
  );
  return {
    liveVec: d,
    activeAxis: m,
    setActiveAxis: g,
    onPointerDown: G,
    onKeyDown: D,
    onSurfacePointerDown: ne,
    surfacePing: p
  };
}
const w2 = [0.25, 0.5, 0.75, 1];
function j2({
  vec: t,
  onChange: a,
  size: i = 360,
  readOnly: l = !1,
  reduceMotion: o = !1
}) {
  const d = S2({ vec: t, onChange: a, size: i, reduceMotion: o }), h = i / 2, m = i / 2, g = i / 2 * 0.78, p = y.useMemo(() => E2(h, m, g), [h, m, g]), b = y.useMemo(() => Vt.map((v, S) => {
    const w = fc(d.liveVec[v]), j = p[S];
    return j ? `${h + j.dx * w},${m + j.dy * w}` : "0,0";
  }).join(" "), [p, h, m, d.liveVec]);
  return /* @__PURE__ */ c.jsx("div", { className: WA, children: /* @__PURE__ */ c.jsx("div", { className: e2, style: { width: i, height: i }, children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: t2,
      viewBox: `0 0 ${i} ${i}`,
      role: "img",
      "aria-label": "8-axis emotion radar",
      onPointerDown: l ? void 0 : d.onSurfacePointerDown,
      style: l ? void 0 : { cursor: "crosshair", touchAction: "none" },
      children: [
        w2.map((v) => /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: n2,
            cx: h,
            cy: m,
            r: g * v
          },
          v
        )),
        Vt.map((v, S) => {
          const w = p[S];
          if (!w) return null;
          const j = h + w.dx * 1.18, T = m + w.dy * 1.18, M = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "line",
              {
                className: a2,
                x1: h,
                y1: m,
                x2: h + w.dx,
                y2: m + w.dy
              }
            ),
            /* @__PURE__ */ c.jsx(
              "text",
              {
                className: `${d2}${M ? ` ${f2}` : ""}`,
                x: j,
                y: T,
                textAnchor: "middle",
                dominantBaseline: "middle",
                children: gl[v]
              }
            )
          ] }, v);
        }),
        Vt.map((v, S) => {
          const w = fc(d.liveVec[v]);
          if (w <= 0.01) return null;
          const j = p[S];
          if (!j) return null;
          const T = d.activeAxis === v;
          return /* @__PURE__ */ c.jsx(
            "line",
            {
              className: `${i2}${T ? ` ${s2}` : ""}`,
              x1: h,
              y1: m,
              x2: h + j.dx * w,
              y2: m + j.dy * w
            },
            `petal-${v}`
          );
        }),
        /* @__PURE__ */ c.jsx("polygon", { className: r2, points: b }),
        d.surfacePing && /* @__PURE__ */ c.jsx(
          "circle",
          {
            className: u2,
            cx: d.surfacePing.x,
            cy: d.surfacePing.y,
            r: 10
          },
          d.surfacePing.key
        ),
        !l && Vt.map((v, S) => {
          const w = fc(d.liveVec[v]), j = p[S];
          if (!j) return null;
          const T = h + j.dx * w, M = m + j.dy * w, N = d.activeAxis === v;
          return /* @__PURE__ */ c.jsxs("g", { children: [
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: l2,
                cx: T,
                cy: M,
                r: 14,
                tabIndex: 0,
                role: "slider",
                "aria-label": `${gl[v]} axis`,
                "aria-valuemin": 0,
                "aria-valuemax": 1,
                "aria-valuenow": w,
                onPointerDown: (k) => d.onPointerDown(v, k),
                onKeyDown: (k) => d.onKeyDown(v, k),
                onFocus: () => d.setActiveAxis(v),
                onBlur: () => d.setActiveAxis(null)
              }
            ),
            /* @__PURE__ */ c.jsx(
              "circle",
              {
                className: `${o2}${N ? ` ${c2}` : ""}`,
                cx: T,
                cy: M,
                r: 6
              }
            )
          ] }, v);
        })
      ]
    }
  ) }) });
}
function E2(t, a, i) {
  return Vt.map((l, o) => {
    const d = o / Vt.length * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(d) * i,
      dy: Math.sin(d) * i
    };
  });
}
function fc(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
function N2({ vec: t, size: a = 36 }) {
  const i = a / 2, l = a / 2, o = a / 2 * 0.86, d = y.useMemo(() => Vt.map((h, m) => {
    const g = fc(t[h]), p = m / Vt.length * Math.PI * 2 - Math.PI / 2, b = i + Math.cos(p) * o * g, v = l + Math.sin(p) * o * g;
    return `${b},${v}`;
  }).join(" "), [i, l, o, t]);
  return /* @__PURE__ */ c.jsx("span", { className: h2, "aria-hidden": "true", children: /* @__PURE__ */ c.jsxs(
    "svg",
    {
      className: m2,
      width: a,
      height: a,
      viewBox: `0 0 ${a} ${a}`,
      children: [
        /* @__PURE__ */ c.jsx("circle", { className: p2, cx: i, cy: l, r: o }),
        /* @__PURE__ */ c.jsx("polygon", { className: v2, points: d })
      ]
    }
  ) });
}
var T2 = "_1jqr3aj0", C2 = "_1jqr3aj1", R2 = "_1jqr3aj2", M2 = "_1jqr3aj3", _2 = "_1jqr3aj4", A2 = "_1jqr3aj5", D2 = "_1jqr3aj6", z2 = "_1jqr3aj7";
const z0 = 0.05, k0 = 0.2;
function k2({
  vec: t,
  onChange: a,
  readOnly: i = !1,
  reduceMotion: l = !1
}) {
  const [o, d] = y.useState(null), h = y.useRef(null), m = y.useRef(/* @__PURE__ */ new Map()), g = y.useCallback(
    (j, T) => {
      const M = Math.max(0, Math.min(1, T));
      a(Jr({ ...t, [j]: M }));
    },
    [a, t]
  ), p = y.useCallback((j, T) => {
    const M = m.current.get(j);
    return !M || M.width <= 0 ? 0 : (T - M.left) / M.width;
  }, []), b = y.useCallback(
    (j, T) => {
      if (i) return;
      T.preventDefault();
      const M = T.currentTarget.querySelector("[data-track]");
      M instanceof HTMLElement && m.current.set(j, M.getBoundingClientRect()), T.currentTarget.setPointerCapture(T.pointerId), h.current = j, d(j), g(j, p(j, T.clientX));
    },
    [i, g, p]
  ), v = y.useCallback(
    (j, T) => {
      i || l || h.current === j && g(j, p(j, T.clientX));
    },
    [i, l, g, p]
  ), S = y.useCallback(
    (j, T) => {
      if (h.current === j) {
        try {
          T.currentTarget.releasePointerCapture(T.pointerId);
        } catch {
        }
        h.current = null, m.current.delete(j);
      }
    },
    []
  ), w = y.useCallback(
    (j, T) => {
      if (i) return;
      const M = t[j] ?? 0;
      let N = M;
      switch (T.key) {
        case "ArrowRight":
        case "ArrowUp":
          N = M + z0;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          N = M - z0;
          break;
        case "PageUp":
          N = M + k0;
          break;
        case "PageDown":
          N = M - k0;
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
      T.preventDefault(), d(j), g(j, N);
    },
    [i, g, t]
  );
  return /* @__PURE__ */ c.jsx("div", { className: T2, role: "group", "aria-label": "Emotion axis sliders", children: Vt.map((j) => {
    const T = O2(t[j] ?? 0), M = T > 0.05, N = o === j, k = gl[j];
    return /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: `${C2}${M ? ` ${R2}` : ""}${N ? ` ${M2}` : ""}`,
        role: "slider",
        "aria-label": `${k} intensity`,
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": Number(T.toFixed(2)),
        "aria-readonly": i,
        disabled: i,
        onPointerDown: (A) => b(j, A),
        onPointerMove: (A) => v(j, A),
        onPointerUp: (A) => S(j, A),
        onPointerCancel: (A) => S(j, A),
        onKeyDown: (A) => w(j, A),
        onFocus: () => d(j),
        onBlur: () => d(null),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: _2, children: k }),
          /* @__PURE__ */ c.jsx("span", { className: A2, "data-track": "true", children: /* @__PURE__ */ c.jsx(
            "span",
            {
              className: D2,
              style: { width: `${T * 100}%` },
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ c.jsx("span", { className: z2, children: T.toFixed(2) })
        ]
      },
      j
    );
  }) });
}
function O2(t) {
  return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
}
var O0 = "gvwvwg0", L2 = "gvwvwg2", U2 = "gvwvwg3", B2 = "gvwvwg8", $2 = "gvwvwg9", V2 = "gvwvwga", H2 = "gvwvwgb", q2 = "gvwvwgc", I2 = "gvwvwgd", F2 = "gvwvwge";
function Y2({
  presets: t,
  activePresetId: a,
  onSelect: i,
  onDelete: l
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ c.jsx("span", { className: L2, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("span", { className: U2, children: "No presets yet. Save your current vector to build the library." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: O0, children: [
    /* @__PURE__ */ c.jsx("span", { className: F2, children: "Preset library" }),
    /* @__PURE__ */ c.jsx("div", { className: B2, children: t.map((o) => {
      const d = G2(o), h = o.presetId === a;
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${$2}${h ? ` ${H2}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: V2,
                onClick: () => i(o),
                "aria-pressed": h,
                children: [
                  /* @__PURE__ */ c.jsx(N2, { vec: d, size: 28 }),
                  /* @__PURE__ */ c.jsx("span", { className: q2, children: o.presetName })
                ]
              }
            ),
            l && /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: I2,
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
const Zf = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm"
];
function G2(t) {
  const a = Zf.reduce(
    (l, o) => ({ ...l, [o]: 0 }),
    {}
  );
  if (!Array.isArray(t.vector)) return a;
  const i = Zf.reduce(
    (l, o, d) => ({ ...l, [o]: t.vector[d] ?? 0 }),
    a
  );
  return Jr(i);
}
function bf(t) {
  return Zf.map((a) => t[a] ?? 0);
}
const X2 = [
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
], P2 = [
  "very",
  "extremely",
  "deeply",
  "intensely",
  "absolutely",
  "totally",
  "really",
  "so"
], K2 = [
  "slightly",
  "a bit",
  "a little",
  "kinda",
  "kind of",
  "somewhat",
  "barely"
], Q2 = ["not", "no", "never", "without", "lack", "lacking", "free of"];
function Z2(t) {
  const a = t.toLowerCase().trim();
  if (!a) return { ...Zi };
  const l = a.split(/\s+/).some((h) => P2.includes(h)) ? 1.2 : 1, o = K2.some((h) => a.includes(h)) ? 0.55 : 1, d = { ...Zi };
  for (const h of X2) {
    let m = 0;
    for (const g of h.keywords) {
      const p = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), v = new RegExp(`\\b${p}\\b`).exec(a);
      if (!v) continue;
      const S = v.index, w = a.slice(0, S), j = Math.max(
        w.lastIndexOf(","),
        w.lastIndexOf(";"),
        w.lastIndexOf(" but "),
        w.lastIndexOf(" yet ")
      ), M = w.slice(j >= 0 ? j : 0).slice(-30);
      Q2.some((N) => new RegExp(`\\b${N}\\b`).test(M)) || (m += 1);
    }
    if (m > 0) {
      const g = h.weight * Math.min(1, 0.55 + 0.2 * (m - 1)) * l * o;
      d[h.axis] = Math.min(1, g);
    }
  }
  return Vt.every((h) => d[h] === 0) && (d.calm = 0.4), Jr(d);
}
const J2 = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" }
];
function W2({
  value: t,
  onChange: a,
  deploymentId: i
}) {
  const l = t.mode ?? "none", o = y.useMemo(() => e3(t.vector), [t.vector]), d = t.emotionAlpha ?? 1, [h, m] = y.useState([]), [g, p] = y.useState(null), [b, v] = y.useState(!1), [S, w] = y.useState(null), [j, T] = y.useState(""), [M, N] = y.useState(!1), k = y.useRef(!0);
  y.useEffect(() => (k.current = !0, () => {
    k.current = !1;
  }), []), y.useEffect(() => {
    let R = !1;
    return Xx(i).then((U) => {
      R || m(L0(U.presets));
    }).catch((U) => {
      R || p(xf(U));
    }), () => {
      R = !0;
    };
  }, [i]), y.useEffect(() => {
    M || T(_0(o));
  }, [o, M]);
  const A = (R) => {
    a({ ...t, mode: R });
  }, C = (R) => {
    a({
      ...t,
      mode: "emotion_vector",
      vector: bf(R)
    }), S && w(null);
  }, V = () => {
    C(Jr(Zi));
  }, G = (R) => {
    const U = Math.max(0, Math.min(10, Number.isFinite(R) ? R : 1));
    a({ ...t, emotionAlpha: U });
  }, ne = async () => {
    const R = j.trim();
    if (R) {
      v(!0), p(null);
      try {
        const U = await jM(i, R, bf(o));
        if (!k.current) return;
        m(
          (B) => L0([U, ...B.filter((Z) => Z.presetId !== U.presetId)])
        ), w(U.presetId), N(!1);
      } catch (U) {
        k.current && p(xf(U));
      } finally {
        k.current && v(!1);
      }
    }
  }, D = async (R) => {
    const U = h;
    m((B) => B.filter((Z) => Z.presetId !== R)), S === R && w(null);
    try {
      await EM(i, R);
    } catch (B) {
      k.current && (m(U), p(xf(B)));
    }
  }, I = (R) => {
    w(R.presetId), a({
      ...t,
      mode: "emotion_vector",
      vector: R.vector
    });
  }, F = (R) => {
    a({ ...t, mode: "qwen_template", qwenTemplate: R });
  }, ie = g2(o), re = y2(o), te = s1(o, 3), ce = te.length > 0 && j.trim().length > 0 && !b, W = _0(o) || "name your preset…", O = l !== "emotion_vector";
  return /* @__PURE__ */ c.jsxs("div", { className: EA, children: [
    /* @__PURE__ */ c.jsxs("div", { className: NA, children: [
      /* @__PURE__ */ c.jsx("span", { className: w0, children: "Emotion mode" }),
      /* @__PURE__ */ c.jsx("div", { className: TA, role: "radiogroup", "aria-label": "Emotion mode", children: J2.map((R) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": l === R.id,
          className: `${CA}${l === R.id ? ` ${RA}` : ""}`,
          onClick: () => A(R.id),
          children: R.label
        },
        R.id
      )) })
    ] }),
    l === "none" && /* @__PURE__ */ c.jsxs("div", { className: R0, children: [
      "Neutral default. Per-line ",
      /* @__PURE__ */ c.jsx("code", { children: "[Char|emotion_vector:…]" }),
      " overrides still apply when present."
    ] }),
    l === "audio_ref" && /* @__PURE__ */ c.jsx("div", { className: R0, children: "Audio reference uses the voice asset assigned per character. Open the cast section to assign references; per-character overrides take precedence." }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: BA, children: [
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: $A,
          placeholder: 'e.g. "Friendly teen, slightly skeptical"',
          value: t.qwenTemplate ?? "",
          onChange: (R) => F(R.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: VA, children: [
        /* @__PURE__ */ c.jsx(
          $e,
          {
            variant: "secondary",
            onClick: () => {
              const R = (t.qwenTemplate ?? "").trim();
              if (!R) return;
              const U = Z2(R);
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
        /* @__PURE__ */ c.jsx("span", { className: C0, children: "Heuristic v1: keyword-based mapping. Switches to vector mode on success." })
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: C0, children: [
        "The Qwen prompt is mapped to a vector at synth time. Per-line",
        " ",
        /* @__PURE__ */ c.jsx("code", { children: "[Char|qwen:…]" }),
        " overrides take precedence."
      ] })
    ] }),
    (l === "emotion_vector" || l === "none" || l === "audio_ref") && /* @__PURE__ */ c.jsxs("div", { className: LA, children: [
      /* @__PURE__ */ c.jsx("div", { className: `${e0} ${MA}`, children: /* @__PURE__ */ c.jsx(
        j2,
        {
          vec: o,
          onChange: C,
          readOnly: O
        }
      ) }),
      /* @__PURE__ */ c.jsxs("div", { className: `${e0} ${_A}`, children: [
        /* @__PURE__ */ c.jsxs("div", { className: AA, children: [
          /* @__PURE__ */ c.jsx("span", { className: w0, children: "Dominant" }),
          /* @__PURE__ */ c.jsx("span", { className: DA, children: ie ? gl[ie].toLowerCase() : "neutral" }),
          /* @__PURE__ */ c.jsxs("span", { className: zA, children: [
            "‖v‖ = ",
            re.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ c.jsx(k2, { vec: o, onChange: C, readOnly: O }),
        /* @__PURE__ */ c.jsx("div", { className: kA, children: /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "ghost",
            size: "sm",
            onClick: V,
            disabled: O || re < 1e-3,
            "aria-label": "Reset emotion vector",
            children: [
              /* @__PURE__ */ c.jsxs(
                "svg",
                {
                  className: OA,
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
    l === "emotion_vector" && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: j0, children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          /* @__PURE__ */ c.jsx("span", { className: E0, children: "Alpha" }),
          /* @__PURE__ */ c.jsx("br", {}),
          /* @__PURE__ */ c.jsx("span", { className: UA, children: "Global mix · per-line overrides bypass it" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 10,
            step: 0.01,
            value: d,
            className: N0,
            style: { "--fill": `${d * 10}%` },
            onChange: (R) => G(Number(R.target.value)),
            "aria-label": "Emotion alpha"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: T0, children: [
          (d * 100).toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${qA}${te.length === 0 ? ` ${IA}` : ""}`,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: FA, children: [
              /* @__PURE__ */ c.jsx("span", { className: YA, children: "Save current as preset" }),
              te.length === 0 && /* @__PURE__ */ c.jsx("span", { className: GA, children: "adjust the radar to enable" })
            ] }),
            /* @__PURE__ */ c.jsxs("div", { className: XA, children: [
              /* @__PURE__ */ c.jsx("div", { className: PA, children: te.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: `${M0} ${QA}`, children: "no axes set" }) : te.map((R) => /* @__PURE__ */ c.jsxs("span", { className: M0, children: [
                R.label.toLowerCase(),
                /* @__PURE__ */ c.jsx("b", { className: KA, children: R.value.toFixed(2) })
              ] }, R.key)) }),
              /* @__PURE__ */ c.jsxs("div", { className: ZA, children: [
                /* @__PURE__ */ c.jsx(
                  "input",
                  {
                    type: "text",
                    className: JA,
                    placeholder: W,
                    value: j,
                    disabled: te.length === 0 || b,
                    onChange: (R) => {
                      T(R.target.value), N(!0);
                    },
                    onKeyDown: (R) => {
                      R.key === "Enter" && ce && ne();
                    },
                    "aria-label": "Preset name"
                  }
                ),
                /* @__PURE__ */ c.jsx(
                  $e,
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
      /* @__PURE__ */ c.jsx(
        Y2,
        {
          presets: h,
          activePresetId: S,
          onSelect: I,
          onDelete: D
        }
      )
    ] }),
    l === "qwen_template" && /* @__PURE__ */ c.jsxs("div", { className: j0, children: [
      /* @__PURE__ */ c.jsx("span", { className: E0, children: "Alpha" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 10,
          step: 0.01,
          value: d,
          className: N0,
          style: { "--fill": `${d * 10}%` },
          onChange: (R) => G(Number(R.target.value)),
          "aria-label": "Emotion alpha"
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: T0, children: [
        (d * 100).toFixed(0),
        "%"
      ] })
    ] }),
    g && /* @__PURE__ */ c.jsx("div", { className: HA, children: g })
  ] });
}
function e3(t) {
  if (!t || !Array.isArray(t)) return Jr(Zi);
  const a = { ...Zi };
  return Vt.forEach((i, l) => {
    const o = t[l];
    a[i] = Number.isFinite(o) ? Math.max(0, Math.min(1, o)) : 0;
  }), a;
}
function L0(t) {
  return [...t].sort((a, i) => i.updatedAt - a.updatedAt);
}
function xf(t) {
  return t instanceof es || t instanceof Error ? t.message : "Unknown error";
}
var t3 = "_5u1uau0", Ws = "_5u1uau1", n3 = "_5u1uau2", $i = "_5u1uau3", el = "_5u1uau4", a3 = "_5u1uau5", Sf = "_5u1uau6", r3 = "_5u1uau7", i3 = "_5u1uau8", s3 = "_5u1uau9", l3 = "_5u1uaua", o3 = "_5u1uaub", c3 = "_5u1uauc", u3 = "_5u1uaud", d3 = "_5u1uaue", U0 = "_5u1uauf", B0 = "_5u1uaug", f3 = "_5u1uauh";
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
], h3 = ["mp3", "wav", "flac"], Qo = 0.5, jf = 2, m3 = 0.05, p3 = 0.8, v3 = 0.8, $0 = 42;
function Zo(t, a, i) {
  const l = t[a];
  if (typeof l == "number" && Number.isFinite(l)) return l;
  if (typeof l == "string") {
    const o = Number(l);
    if (Number.isFinite(o)) return o;
  }
  return i;
}
function g3({
  outputFormat: t,
  onOutputFormatChange: a,
  speedFactor: i,
  onSpeedFactorChange: l,
  cachePolicy: o,
  onCachePolicyChange: d,
  generation: h,
  onGenerationChange: m
}) {
  const g = y.useId(), p = y.useId(), b = y.useId(), v = y.useId(), S = y.useId(), w = (V, G) => {
    m({ ...h, [V]: G });
  }, j = h.seed === void 0 || h.seed === null ? "random" : "fixed", T = (V) => {
    if (V !== j)
      if (V === "random") {
        const G = { ...h };
        delete G.seed, m(G);
      } else {
        const G = Zo(h, "seed", $0);
        m({ ...h, seed: G });
      }
  }, M = wf.find((V) => V.id === o) ?? wf[0], N = (i - Qo) / (jf - Qo) * 100, k = Zo(h, "temperature", p3), A = Zo(h, "top_p", v3), C = Zo(h, "seed", $0);
  return /* @__PURE__ */ c.jsxs("div", { className: t3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: g, className: $i, children: "Format" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "select",
        {
          id: g,
          className: a3,
          value: t,
          onChange: (V) => a(V.currentTarget.value),
          children: h3.map((V) => /* @__PURE__ */ c.jsx("option", { value: V, children: V }, V))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: $i, children: "Speed" }),
      /* @__PURE__ */ c.jsxs("div", { className: `${el} ${r3}`, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            id: p,
            type: "range",
            className: i3,
            min: Qo,
            max: jf,
            step: m3,
            value: i,
            style: { "--range-pct": `${N}%` },
            onChange: (V) => l(Number(V.currentTarget.value)),
            "aria-valuemin": Qo,
            "aria-valuemax": jf,
            "aria-valuenow": i
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { className: s3, children: [
          i.toFixed(2),
          "×"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: n3, role: "radiogroup", "aria-label": "Cache policy", children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, children: "Cache" }),
      /* @__PURE__ */ c.jsx("div", { className: l3, children: wf.map((V) => /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": o === V.id,
          className: o3,
          onClick: () => d(V.id),
          title: V.help,
          children: V.label
        },
        V.id
      )) }),
      /* @__PURE__ */ c.jsx("p", { className: c3, "aria-live": "polite", children: M.help })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: u3, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: b, className: $i, children: "Temperature" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: b,
          type: "number",
          className: Sf,
          min: 0,
          max: 2,
          step: 0.05,
          value: k,
          onChange: (V) => w("temperature", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: v, className: $i, children: "Top-p" }),
      /* @__PURE__ */ c.jsx("div", { className: el, children: /* @__PURE__ */ c.jsx(
        "input",
        {
          id: v,
          type: "number",
          className: Sf,
          min: 0,
          max: 1,
          step: 0.05,
          value: A,
          onChange: (V) => w("top_p", Number(V.currentTarget.value))
        }
      ) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ws, children: [
      /* @__PURE__ */ c.jsx("span", { className: $i, id: `${S}-label`, children: "Seed" }),
      /* @__PURE__ */ c.jsxs(
        "div",
        {
          className: `${el} ${d3}`,
          role: "radiogroup",
          "aria-labelledby": `${S}-label`,
          children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                role: "radio",
                "aria-checked": j === "fixed",
                className: `${U0} ${j === "fixed" ? B0 : ""}`,
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
                className: `${U0} ${j === "random" ? B0 : ""}`,
                onClick: () => T("random"),
                title: "A fresh seed is rolled for every run — output varies",
                children: "Random"
              }
            ),
            j === "fixed" ? /* @__PURE__ */ c.jsx(
              "input",
              {
                id: S,
                type: "number",
                className: Sf,
                step: 1,
                value: C,
                onChange: (V) => w("seed", Math.trunc(Number(V.currentTarget.value))),
                "aria-label": "Fixed seed value"
              }
            ) : /* @__PURE__ */ c.jsx("span", { className: f3, "aria-live": "polite", children: "auto · rolls each run" })
          ]
        }
      )
    ] })
  ] });
}
var y3 = "iv43qk0", V0 = "iv43qk1", b3 = "iv43qk2", H0 = "iv43qk3", x3 = "iv43qk4", S3 = "iv43qk5", w3 = "iv43qk6", j3 = "iv43qk7", E3 = { vector: "iv43qk8", qwen: "iv43qk9", preset: "iv43qka", audio: "iv43qkb", raw: "iv43qkc" }, N3 = "iv43qkd", T3 = "iv43qke", Ef = "iv43qkf", Nf = "iv43qkg";
function C3({
  lines: t,
  characterColors: a,
  onLineClick: i
}) {
  if (t.length === 0)
    return /* @__PURE__ */ c.jsx("p", { className: N3, children: "Paste dialogue above to see character-tagged lines, override badges, and per-line previews here." });
  const l = t.length, o = t.filter((h) => h.character !== null).length, d = l - o;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: T3, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ c.jsx("span", { className: Nf, children: l }),
        "lines"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ c.jsx("span", { className: Nf, children: o }),
        "spoken"
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Ef, children: [
        /* @__PURE__ */ c.jsx("span", { className: Nf, children: d }),
        "narration"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ol", { className: y3, children: t.map((h) => /* @__PURE__ */ c.jsx(
      R3,
      {
        line: h,
        ...h.character && a[h.character] ? { color: a[h.character] } : {},
        ...i ? { onClick: () => i(h.idx) } : {}
      },
      h.idx
    )) })
  ] });
}
function R3({ line: t, color: a, onClick: i }) {
  return t.character === null ? /* @__PURE__ */ c.jsxs("li", { className: `${V0} ${b3}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: H0, children: String(t.idx + 1).padStart(2, "0") }),
    /* @__PURE__ */ c.jsx("span", { className: w3, children: t.text })
  ] }) : /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: V0,
      onClick: i,
      style: i ? { cursor: "pointer" } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: H0, children: String(t.idx + 1).padStart(2, "0") }),
        /* @__PURE__ */ c.jsx("span", { className: x3, style: a ? { color: a } : void 0, children: t.character }),
        /* @__PURE__ */ c.jsxs("span", { className: S3, children: [
          t.text,
          t.override && /* @__PURE__ */ c.jsxs("span", { className: `${j3} ${E3[t.override.kind]}`, children: [
            t.override.kind,
            t.override.label ? ` · ${t.override.label}` : ""
          ] })
        ] })
      ]
    }
  );
}
var M3 = "_46z95i0", _3 = "_46z95i1", A3 = "_46z95i2", D3 = "_46z95i3", z3 = "_46z95i4", k3 = "_46z95i5", O3 = "_46z95i6";
const L3 = {
  intensity: 0.6,
  pace: 1,
  pitchSt: 0
};
function U3({ value: t, onChange: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: M3, children: [
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(
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
  return /* @__PURE__ */ c.jsxs("div", { className: _3, children: [
    /* @__PURE__ */ c.jsxs("div", { className: A3, children: [
      /* @__PURE__ */ c.jsx("label", { htmlFor: p, className: D3, children: t }),
      /* @__PURE__ */ c.jsx("span", { className: z3, children: a })
    ] }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        id: p,
        type: "range",
        min: i,
        max: l,
        step: o,
        value: h,
        className: k3,
        style: { "--fill": `${g}%` },
        onChange: (b) => m(Number(b.target.value))
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: O3, children: d(h) })
  ] });
}
var B3 = "qe93dj0", $3 = "qe93dj1", V3 = "qe93dj2", H3 = "qe93dj3", q3 = "qe93dj4", I3 = "qe93dj5", F3 = "qe93dj6", Y3 = { ok: "qe93dj7", warn: "qe93dj8", info: "qe93dj9" }, G3 = "qe93dja", X3 = "qe93djb";
function P3({ checks: t }) {
  const a = t.filter((i) => i.status === "ok").length;
  return /* @__PURE__ */ c.jsxs("div", { className: B3, children: [
    /* @__PURE__ */ c.jsxs("header", { className: $3, children: [
      /* @__PURE__ */ c.jsx("span", { className: V3, children: "Pre-flight" }),
      /* @__PURE__ */ c.jsxs("span", { className: H3, children: [
        a,
        "/",
        t.length,
        " OK"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: q3, children: t.map((i) => /* @__PURE__ */ c.jsxs("li", { className: I3, children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: `${F3} ${Y3[i.status]}`
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: G3, children: i.label }),
      i.detail && /* @__PURE__ */ c.jsx("span", { className: X3, children: i.detail })
    ] }, i.id)) })
  ] });
}
var q0 = "_17fbpt30", I0 = "_17fbpt31", F0 = "_17fbpt32", K3 = "_17fbpt33", Q3 = "_17fbpt34", Z3 = "_17fbpt35", Y0 = "_17fbpt36", J3 = "_17fbpt37", W3 = "_17fbpt38";
const eD = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning"
};
function tD({
  runs: t,
  deploymentId: a,
  onOpenQueue: i,
  onOpenRun: l,
  emptyHint: o
}) {
  return t.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsx("header", { className: I0, children: /* @__PURE__ */ c.jsx(
      "a",
      {
        className: F0,
        href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
        onClick: i ? (d) => {
          d.preventDefault(), i();
        } : void 0,
        children: "Open queue →"
      }
    ) }),
    /* @__PURE__ */ c.jsx("p", { className: J3, children: "No runs yet." }),
    /* @__PURE__ */ c.jsx("p", { className: W3, children: o ?? "Hit Generate to enqueue a batch." })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: q0, children: [
    /* @__PURE__ */ c.jsxs("header", { className: I0, children: [
      /* @__PURE__ */ c.jsx("span", {}),
      /* @__PURE__ */ c.jsx(
        "a",
        {
          className: F0,
          href: `/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(a)}/queue`,
          onClick: i ? (d) => {
            d.preventDefault(), i();
          } : void 0,
          children: "Open queue →"
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx("ul", { className: K3, children: t.slice(0, 5).map((d) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: Q3,
        onClick: l ? () => l(d.runId) : void 0,
        children: [
          /* @__PURE__ */ c.jsx("span", { className: Z3, children: d.runId }),
          /* @__PURE__ */ c.jsx("span", { className: `${Zx.sm} ${Jx[eD[d.status] ?? "neutral"]}`, children: d.status }),
          /* @__PURE__ */ c.jsx("span", { className: Y0, children: nD(d.startedAt ?? d.queuedAt) }),
          /* @__PURE__ */ c.jsx("span", { className: Y0, children: d.kind })
        ]
      }
    ) }, d.runId)) })
  ] });
}
function nD(t) {
  if (!t) return "—";
  const a = t > 1e12 ? Math.floor(t / 1e3) : t, i = new Date(a * 1e3);
  if (Number.isNaN(i.getTime())) return "—";
  const o = Date.now() - i.getTime();
  return o < 6e4 ? "just now" : o < 36e5 ? `${Math.floor(o / 6e4)}m ago` : o < 864e5 ? `${Math.floor(o / 36e5)}h ago` : i.toISOString().slice(0, 16).replace("T", " ");
}
const l1 = y.createContext({});
function Fh(t) {
  const a = y.useRef(null);
  return a.current === null && (a.current = t()), a.current;
}
const aD = typeof window < "u", o1 = aD ? y.useLayoutEffect : y.useEffect, Bc = /* @__PURE__ */ y.createContext(null);
function rD(t, a) {
  t.indexOf(a) === -1 && t.push(a);
}
function iD(t, a) {
  const i = t.indexOf(a);
  i > -1 && t.splice(i, 1);
}
const xr = (t, a, i) => i > a ? a : i < t ? t : i;
function G0(t, a) {
  return a ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${a}` : t;
}
let Tl = () => {
}, Ji = () => {
};
typeof process < "u" && process.env?.NODE_ENV !== "production" && (Tl = (t, a, i) => {
  !t && typeof console < "u" && console.warn(G0(a, i));
}, Ji = (t, a, i) => {
  if (!t)
    throw new Error(G0(a, i));
});
const Sr = {}, c1 = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function sD(t) {
  return typeof t == "object" && t !== null;
}
const u1 = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function d1(t) {
  let a;
  return () => (a === void 0 && (a = t()), a);
}
const ts = /* @__NO_SIDE_EFFECTS__ */ (t) => t, lD = (t, a) => (i) => a(t(i)), $c = (...t) => t.reduce(lD), f1 = /* @__NO_SIDE_EFFECTS__ */ (t, a, i) => {
  const l = a - t;
  return l === 0 ? 1 : (i - t) / l;
};
class h1 {
  constructor() {
    this.subscriptions = [];
  }
  add(a) {
    return rD(this.subscriptions, a), () => iD(this.subscriptions, a);
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
function m1(t, a) {
  return a ? t * (1e3 / a) : 0;
}
const p1 = (t, a, i) => (((1 - 3 * i + 3 * a) * t + (3 * i - 6 * a)) * t + 3 * a) * t, oD = 1e-7, cD = 12;
function uD(t, a, i, l, o) {
  let d, h, m = 0;
  do
    h = a + (i - a) / 2, d = p1(h, l, o) - t, d > 0 ? i = h : a = h;
  while (Math.abs(d) > oD && ++m < cD);
  return h;
}
function Cl(t, a, i, l) {
  if (t === a && i === l)
    return ts;
  const o = (d) => uD(d, 0, 1, t, i);
  return (d) => d === 0 || d === 1 ? d : p1(o(d), a, l);
}
const v1 = (t) => (a) => a <= 0.5 ? t(2 * a) / 2 : (2 - t(2 * (1 - a))) / 2, g1 = (t) => (a) => 1 - t(1 - a), y1 = /* @__PURE__ */ Cl(0.33, 1.53, 0.69, 0.99), Yh = /* @__PURE__ */ g1(y1), b1 = /* @__PURE__ */ v1(Yh), x1 = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Yh(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Gh = (t) => 1 - Math.sin(Math.acos(t)), dD = g1(Gh), S1 = v1(Gh), fD = /* @__PURE__ */ Cl(0.42, 0, 1, 1), hD = /* @__PURE__ */ Cl(0, 0, 0.58, 1), w1 = /* @__PURE__ */ Cl(0.42, 0, 0.58, 1), mD = (t) => Array.isArray(t) && typeof t[0] != "number", j1 = (t) => Array.isArray(t) && typeof t[0] == "number", X0 = {
  linear: ts,
  easeIn: fD,
  easeInOut: w1,
  easeOut: hD,
  circIn: Gh,
  circInOut: S1,
  circOut: dD,
  backIn: Yh,
  backInOut: b1,
  backOut: y1,
  anticipate: x1
}, pD = (t) => typeof t == "string", P0 = (t) => {
  if (j1(t)) {
    Ji(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [a, i, l, o] = t;
    return Cl(a, i, l, o);
  } else if (pD(t))
    return Ji(X0[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), X0[t];
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
function vD(t, a) {
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
      const j = S && o ? i : l;
      return v && h.add(b), j.add(b), b;
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
const gD = 40;
function E1(t, a) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => i = !0, h = Jo.reduce((A, C) => (A[C] = vD(d), A), {}), { setup: m, read: g, resolveKeyframes: p, preUpdate: b, update: v, preRender: S, render: w, postRender: j } = h, T = () => {
    const A = Sr.useManualTiming, C = A ? o.timestamp : performance.now();
    i = !1, A || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(C - o.timestamp, gD), 1)), o.timestamp = C, o.isProcessing = !0, m.process(o), g.process(o), p.process(o), b.process(o), v.process(o), S.process(o), w.process(o), j.process(o), o.isProcessing = !1, i && a && (l = !1, t(T));
  }, M = () => {
    i = !0, l = !0, o.isProcessing || t(T);
  };
  return { schedule: Jo.reduce((A, C) => {
    const V = h[C];
    return A[C] = (G, ne = !1, D = !1) => (i || M(), V.schedule(G, ne, D)), A;
  }, {}), cancel: (A) => {
    for (let C = 0; C < Jo.length; C++)
      h[Jo[C]].cancel(A);
  }, state: o, steps: h };
}
const { schedule: Pn, cancel: Jf, state: Sc } = /* @__PURE__ */ E1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ts, !0);
let hc;
function yD() {
  hc = void 0;
}
const Dn = {
  now: () => (hc === void 0 && Dn.set(Sc.isProcessing || Sr.useManualTiming ? Sc.timestamp : performance.now()), hc),
  set: (t) => {
    hc = t, queueMicrotask(yD);
  }
}, N1 = (t) => (a) => typeof a == "string" && a.startsWith(t), T1 = /* @__PURE__ */ N1("--"), bD = /* @__PURE__ */ N1("var(--"), Xh = (t) => bD(t) ? xD.test(t.split("/*")[0].trim()) : !1, xD = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function K0(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ns = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, yl = {
  ...ns,
  transform: (t) => xr(0, 1, t)
}, Wo = {
  ...ns,
  default: 1
}, dl = (t) => Math.round(t * 1e5) / 1e5, Ph = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function SD(t) {
  return t == null;
}
const wD = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Kh = (t, a) => (i) => !!(typeof i == "string" && wD.test(i) && i.startsWith(t) || a && !SD(i) && Object.prototype.hasOwnProperty.call(i, a)), C1 = (t, a, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, d, h, m] = l.match(Ph);
  return {
    [t]: parseFloat(o),
    [a]: parseFloat(d),
    [i]: parseFloat(h),
    alpha: m !== void 0 ? parseFloat(m) : 1
  };
}, jD = (t) => xr(0, 255, t), Cf = {
  ...ns,
  transform: (t) => Math.round(jD(t))
}, Gr = {
  test: /* @__PURE__ */ Kh("rgb", "red"),
  parse: /* @__PURE__ */ C1("red", "green", "blue"),
  transform: ({ red: t, green: a, blue: i, alpha: l = 1 }) => "rgba(" + Cf.transform(t) + ", " + Cf.transform(a) + ", " + Cf.transform(i) + ", " + dl(yl.transform(l)) + ")"
};
function ED(t) {
  let a = "", i = "", l = "", o = "";
  return t.length > 5 ? (a = t.substring(1, 3), i = t.substring(3, 5), l = t.substring(5, 7), o = t.substring(7, 9)) : (a = t.substring(1, 2), i = t.substring(2, 3), l = t.substring(3, 4), o = t.substring(4, 5), a += a, i += i, l += l, o += o), {
    red: parseInt(a, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const Wf = {
  test: /* @__PURE__ */ Kh("#"),
  parse: ED,
  transform: Gr.transform
}, Rl = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (a) => typeof a == "string" && a.endsWith(t) && a.split(" ").length === 1,
  parse: parseFloat,
  transform: (a) => `${a}${t}`
}), pr = /* @__PURE__ */ Rl("deg"), Pi = /* @__PURE__ */ Rl("%"), we = /* @__PURE__ */ Rl("px"), ND = /* @__PURE__ */ Rl("vh"), TD = /* @__PURE__ */ Rl("vw"), Q0 = {
  ...Pi,
  parse: (t) => Pi.parse(t) / 100,
  transform: (t) => Pi.transform(t * 100)
}, Yi = {
  test: /* @__PURE__ */ Kh("hsl", "hue"),
  parse: /* @__PURE__ */ C1("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: a, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(t) + ", " + Pi.transform(dl(a)) + ", " + Pi.transform(dl(i)) + ", " + dl(yl.transform(l)) + ")"
}, $t = {
  test: (t) => Gr.test(t) || Wf.test(t) || Yi.test(t),
  parse: (t) => Gr.test(t) ? Gr.parse(t) : Yi.test(t) ? Yi.parse(t) : Wf.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Gr.transform(t) : Yi.transform(t),
  getAnimatableNone: (t) => {
    const a = $t.parse(t);
    return a.alpha = 0, $t.transform(a);
  }
}, CD = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function RD(t) {
  return isNaN(t) && typeof t == "string" && (t.match(Ph)?.length || 0) + (t.match(CD)?.length || 0) > 0;
}
const R1 = "number", M1 = "color", MD = "var", _D = "var(", Z0 = "${}", AD = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(t) {
  const a = t.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let d = 0;
  const m = a.replace(AD, (g) => ($t.test(g) ? (l.color.push(d), o.push(M1), i.push($t.parse(g))) : g.startsWith(_D) ? (l.var.push(d), o.push(MD), i.push(g)) : (l.number.push(d), o.push(R1), i.push(parseFloat(g))), ++d, Z0)).split(Z0);
  return { values: i, split: m, indexes: l, types: o };
}
function DD(t) {
  return Wi(t).values;
}
function _1({ split: t, types: a }) {
  const i = t.length;
  return (l) => {
    let o = "";
    for (let d = 0; d < i; d++)
      if (o += t[d], l[d] !== void 0) {
        const h = a[d];
        h === R1 ? o += dl(l[d]) : h === M1 ? o += $t.transform(l[d]) : o += l[d];
      }
    return o;
  };
}
function zD(t) {
  return _1(Wi(t));
}
const kD = (t) => typeof t == "number" ? 0 : $t.test(t) ? $t.getAnimatableNone(t) : t, OD = (t, a) => typeof t == "number" ? a?.trim().endsWith("/") ? t : 0 : kD(t);
function LD(t) {
  const a = Wi(t);
  return _1(a)(a.values.map((l, o) => OD(l, a.split[o])));
}
const ra = {
  test: RD,
  parse: DD,
  createTransformer: zD,
  getAnimatableNone: LD
};
function Rf(t, a, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (a - t) * 6 * i : i < 1 / 2 ? a : i < 2 / 3 ? t + (a - t) * (2 / 3 - i) * 6 : t;
}
function UD({ hue: t, saturation: a, lightness: i, alpha: l }) {
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
function wc(t, a) {
  return (i) => i > 0 ? a : t;
}
const Ml = (t, a, i) => t + (a - t) * i, Mf = (t, a, i) => {
  const l = t * t, o = i * (a * a - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, BD = [Wf, Gr, Yi], $D = (t) => BD.find((a) => a.test(t));
function J0(t) {
  const a = $D(t);
  if (Tl(!!a, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !a)
    return !1;
  let i = a.parse(t);
  return a === Yi && (i = UD(i)), i;
}
const W0 = (t, a) => {
  const i = J0(t), l = J0(a);
  if (!i || !l)
    return wc(t, a);
  const o = { ...i };
  return (d) => (o.red = Mf(i.red, l.red, d), o.green = Mf(i.green, l.green, d), o.blue = Mf(i.blue, l.blue, d), o.alpha = Ml(i.alpha, l.alpha, d), Gr.transform(o));
}, eh = /* @__PURE__ */ new Set(["none", "hidden"]);
function VD(t, a) {
  return eh.has(t) ? (i) => i <= 0 ? t : a : (i) => i >= 1 ? a : t;
}
function HD(t, a) {
  return (i) => Ml(t, a, i);
}
function Qh(t) {
  return typeof t == "number" ? HD : typeof t == "string" ? Xh(t) ? wc : $t.test(t) ? W0 : FD : Array.isArray(t) ? A1 : typeof t == "object" ? $t.test(t) ? W0 : qD : wc;
}
function A1(t, a) {
  const i = [...t], l = i.length, o = t.map((d, h) => Qh(d)(d, a[h]));
  return (d) => {
    for (let h = 0; h < l; h++)
      i[h] = o[h](d);
    return i;
  };
}
function qD(t, a) {
  const i = { ...t, ...a }, l = {};
  for (const o in i)
    t[o] !== void 0 && a[o] !== void 0 && (l[o] = Qh(t[o])(t[o], a[o]));
  return (o) => {
    for (const d in l)
      i[d] = l[d](o);
    return i;
  };
}
function ID(t, a) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < a.values.length; o++) {
    const d = a.types[o], h = t.indexes[d][l[d]], m = t.values[h] ?? 0;
    i[o] = m, l[d]++;
  }
  return i;
}
const FD = (t, a) => {
  const i = ra.createTransformer(a), l = Wi(t), o = Wi(a);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? eh.has(t) && !o.values.length || eh.has(a) && !l.values.length ? VD(t, a) : $c(A1(ID(l, o), o.values), i) : (Tl(!0, `Complex values '${t}' and '${a}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), wc(t, a));
};
function D1(t, a, i) {
  return typeof t == "number" && typeof a == "number" && typeof i == "number" ? Ml(t, a, i) : Qh(t)(t, a);
}
const YD = (t) => {
  const a = ({ timestamp: i }) => t(i);
  return {
    start: (i = !0) => Pn.update(a, i),
    stop: () => Jf(a),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Sc.isProcessing ? Sc.timestamp : Dn.now()
  };
}, z1 = (t, a, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(a / i), 2);
  for (let d = 0; d < o; d++)
    l += Math.round(t(d / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, jc = 2e4;
function Zh(t) {
  let a = 0;
  const i = 50;
  let l = t.next(a);
  for (; !l.done && a < jc; )
    a += i, l = t.next(a);
  return a >= jc ? 1 / 0 : a;
}
function GD(t, a = 100, i) {
  const l = i({ ...t, keyframes: [0, a] }), o = Math.min(Zh(l), jc);
  return {
    type: "keyframes",
    ease: (d) => l.next(o * d).value / a,
    duration: /* @__PURE__ */ aa(o)
  };
}
const jt = {
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
function th(t, a) {
  return t * Math.sqrt(1 - a * a);
}
const XD = 12;
function PD(t, a, i) {
  let l = i;
  for (let o = 1; o < XD; o++)
    l = l - t(l) / a(l);
  return l;
}
const _f = 1e-3;
function KD({ duration: t = jt.duration, bounce: a = jt.bounce, velocity: i = jt.velocity, mass: l = jt.mass }) {
  let o, d;
  Tl(t <= /* @__PURE__ */ Xn(jt.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let h = 1 - a;
  h = xr(jt.minDamping, jt.maxDamping, h), t = xr(jt.minDuration, jt.maxDuration, /* @__PURE__ */ aa(t)), h < 1 ? (o = (p) => {
    const b = p * h, v = b * t, S = b - i, w = th(p, h), j = Math.exp(-v);
    return _f - S / w * j;
  }, d = (p) => {
    const v = p * h * t, S = v * i + i, w = Math.pow(h, 2) * Math.pow(p, 2) * t, j = Math.exp(-v), T = th(Math.pow(p, 2), h);
    return (-o(p) + _f > 0 ? -1 : 1) * ((S - w) * j) / T;
  }) : (o = (p) => {
    const b = Math.exp(-p * t), v = (p - i) * t + 1;
    return -_f + b * v;
  }, d = (p) => {
    const b = Math.exp(-p * t), v = (i - p) * (t * t);
    return b * v;
  });
  const m = 5 / t, g = PD(o, d, m);
  if (t = /* @__PURE__ */ Xn(t), isNaN(g))
    return {
      stiffness: jt.stiffness,
      damping: jt.damping,
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
const QD = ["duration", "bounce"], ZD = ["stiffness", "damping", "mass"];
function eb(t, a) {
  return a.some((i) => t[i] !== void 0);
}
function JD(t) {
  let a = {
    velocity: jt.velocity,
    stiffness: jt.stiffness,
    damping: jt.damping,
    mass: jt.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!eb(t, ZD) && eb(t, QD))
    if (a.velocity = 0, t.visualDuration) {
      const i = t.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, d = 2 * xr(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(o);
      a = {
        ...a,
        mass: jt.mass,
        stiffness: o,
        damping: d
      };
    } else {
      const i = KD({ ...t, velocity: 0 });
      a = {
        ...a,
        ...i,
        mass: jt.mass
      }, a.isResolvedFromDuration = !0;
    }
  return a;
}
function Ec(t = jt.visualDuration, a = jt.bounce) {
  const i = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: a
  } : t;
  let { restSpeed: l, restDelta: o } = i;
  const d = i.keyframes[0], h = i.keyframes[i.keyframes.length - 1], m = { done: !1, value: d }, { stiffness: g, damping: p, mass: b, duration: v, velocity: S, isResolvedFromDuration: w } = JD({
    ...i,
    velocity: -/* @__PURE__ */ aa(i.velocity || 0)
  }), j = S || 0, T = p / (2 * Math.sqrt(g * b)), M = h - d, N = /* @__PURE__ */ aa(Math.sqrt(g / b)), k = Math.abs(M) < 5;
  l || (l = k ? jt.restSpeed.granular : jt.restSpeed.default), o || (o = k ? jt.restDelta.granular : jt.restDelta.default);
  let A, C, V, G, ne, D;
  if (T < 1)
    V = th(N, T), G = (j + T * N * M) / V, A = (F) => {
      const ie = Math.exp(-T * N * F);
      return h - ie * (G * Math.sin(V * F) + M * Math.cos(V * F));
    }, ne = T * N * G + M * V, D = T * N * M - G * V, C = (F) => Math.exp(-T * N * F) * (ne * Math.sin(V * F) + D * Math.cos(V * F));
  else if (T === 1) {
    A = (ie) => h - Math.exp(-N * ie) * (M + (j + N * M) * ie);
    const F = j + N * M;
    C = (ie) => Math.exp(-N * ie) * (N * F * ie - j);
  } else {
    const F = N * Math.sqrt(T * T - 1);
    A = (ce) => {
      const W = Math.exp(-T * N * ce), O = Math.min(F * ce, 300);
      return h - W * ((j + T * N * M) * Math.sinh(O) + F * M * Math.cosh(O)) / F;
    };
    const ie = (j + T * N * M) / F, re = T * N * ie - M * F, te = T * N * M - ie * F;
    C = (ce) => {
      const W = Math.exp(-T * N * ce), O = Math.min(F * ce, 300);
      return W * (re * Math.sinh(O) + te * Math.cosh(O));
    };
  }
  const I = {
    calculatedDuration: w && v || null,
    velocity: (F) => /* @__PURE__ */ Xn(C(F)),
    next: (F) => {
      if (!w && T < 1) {
        const re = Math.exp(-T * N * F), te = Math.sin(V * F), ce = Math.cos(V * F), W = h - re * (G * te + M * ce), O = /* @__PURE__ */ Xn(re * (ne * te + D * ce));
        return m.done = Math.abs(O) <= l && Math.abs(h - W) <= o, m.value = m.done ? h : W, m;
      }
      const ie = A(F);
      if (w)
        m.done = F >= v;
      else {
        const re = /* @__PURE__ */ Xn(C(F));
        m.done = Math.abs(re) <= l && Math.abs(h - ie) <= o;
      }
      return m.value = m.done ? h : ie, m;
    },
    toString: () => {
      const F = Math.min(Zh(I), jc), ie = z1((re) => I.next(F * re).value, F, 30);
      return F + "ms " + ie;
    },
    toTransition: () => {
    }
  };
  return I;
}
Ec.applyToOptions = (t) => {
  const a = GD(t, 100, Ec);
  return t.ease = a.ease, t.duration = /* @__PURE__ */ Xn(a.duration), t.type = "keyframes", t;
};
const WD = 5;
function k1(t, a, i) {
  const l = Math.max(a - WD, 0);
  return m1(i - t(l), a - l);
}
function nh({ keyframes: t, velocity: a = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: d = 500, modifyTarget: h, min: m, max: g, restDelta: p = 0.5, restSpeed: b }) {
  const v = t[0], S = {
    done: !1,
    value: v
  }, w = (D) => m !== void 0 && D < m || g !== void 0 && D > g, j = (D) => m === void 0 ? g : g === void 0 || Math.abs(m - D) < Math.abs(g - D) ? m : g;
  let T = i * a;
  const M = v + T, N = h === void 0 ? M : h(M);
  N !== M && (T = N - v);
  const k = (D) => -T * Math.exp(-D / l), A = (D) => N + k(D), C = (D) => {
    const I = k(D), F = A(D);
    S.done = Math.abs(I) <= p, S.value = S.done ? N : F;
  };
  let V, G;
  const ne = (D) => {
    w(S.value) && (V = D, G = Ec({
      keyframes: [S.value, j(S.value)],
      velocity: k1(A, D, S.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: d,
      restDelta: p,
      restSpeed: b
    }));
  };
  return ne(0), {
    calculatedDuration: null,
    next: (D) => {
      let I = !1;
      return !G && V === void 0 && (I = !0, C(D), ne(D)), V !== void 0 && D >= V ? G.next(D - V) : (!I && C(D), S);
    }
  };
}
function e5(t, a, i) {
  const l = [], o = i || Sr.mix || D1, d = t.length - 1;
  for (let h = 0; h < d; h++) {
    let m = o(t[h], t[h + 1]);
    if (a) {
      const g = Array.isArray(a) ? a[h] || ts : a;
      m = $c(g, m);
    }
    l.push(m);
  }
  return l;
}
function t5(t, a, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const d = t.length;
  if (Ji(d === a.length, "Both input and output ranges must be the same length", "range-length"), d === 1)
    return () => a[0];
  if (d === 2 && a[0] === a[1])
    return () => a[1];
  const h = t[0] === t[1];
  t[0] > t[d - 1] && (t = [...t].reverse(), a = [...a].reverse());
  const m = e5(a, l, o), g = m.length, p = (b) => {
    if (h && b < t[0])
      return a[0];
    let v = 0;
    if (g > 1)
      for (; v < t.length - 2 && !(b < t[v + 1]); v++)
        ;
    const S = /* @__PURE__ */ f1(t[v], t[v + 1], b);
    return m[v](S);
  };
  return i ? (b) => p(xr(t[0], t[d - 1], b)) : p;
}
function n5(t, a) {
  const i = t[t.length - 1];
  for (let l = 1; l <= a; l++) {
    const o = /* @__PURE__ */ f1(0, a, l);
    t.push(Ml(i, 1, o));
  }
}
function a5(t) {
  const a = [0];
  return n5(a, t.length - 1), a;
}
function r5(t, a) {
  return t.map((i) => i * a);
}
function i5(t, a) {
  return t.map(() => a || w1).splice(0, t.length - 1);
}
function fl({ duration: t = 300, keyframes: a, times: i, ease: l = "easeInOut" }) {
  const o = mD(l) ? l.map(P0) : P0(l), d = {
    done: !1,
    value: a[0]
  }, h = r5(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === a.length ? i : a5(a),
    t
  ), m = t5(h, a, {
    ease: Array.isArray(o) ? o : i5(a, o)
  });
  return {
    calculatedDuration: t,
    next: (g) => (d.value = m(g), d.done = g >= t, d)
  };
}
const s5 = (t) => t !== null;
function Vc(t, { repeat: a, repeatType: i = "loop" }, l, o = 1) {
  const d = t.filter(s5), m = o < 0 || a && i !== "loop" && a % 2 === 1 ? 0 : d.length - 1;
  return !m || l === void 0 ? d[m] : l;
}
const l5 = {
  decay: nh,
  inertia: nh,
  tween: fl,
  keyframes: fl,
  spring: Ec
};
function O1(t) {
  typeof t.type == "string" && (t.type = l5[t.type]);
}
class Jh {
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
const o5 = (t) => t / 100;
class Nc extends Jh {
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
    O1(a);
    const { type: i = fl, repeat: l = 0, repeatDelay: o = 0, repeatType: d, velocity: h = 0 } = a;
    let { keyframes: m } = a;
    const g = i || fl;
    g !== fl && typeof m[0] != "number" && (this.mixKeyframes = $c(o5, D1(m[0], m[1])), m = [0, 100]);
    const p = g({ ...a, keyframes: m });
    d === "mirror" && (this.mirroredGenerator = g({
      ...a,
      keyframes: [...m].reverse(),
      velocity: -h
    })), p.calculatedDuration === null && (p.calculatedDuration = Zh(p));
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
    const { delay: p = 0, keyframes: b, repeat: v, repeatType: S, repeatDelay: w, type: j, onUpdate: T, finalKeyframe: M } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, a) : this.speed < 0 && (this.startTime = Math.min(a - o / this.speed, this.startTime)), i ? this.currentTime = a : this.updateTime(a);
    const N = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), k = this.playbackSpeed >= 0 ? N < 0 : N > o;
    this.currentTime = Math.max(N, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let A = this.currentTime, C = l;
    if (v) {
      const D = Math.min(this.currentTime, o) / m;
      let I = Math.floor(D), F = D % 1;
      !F && D >= 1 && (F = 1), F === 1 && I--, I = Math.min(I, v + 1), !!(I % 2) && (S === "reverse" ? (F = 1 - F, w && (F -= w / m)) : S === "mirror" && (C = h)), A = xr(0, 1, F) * m;
    }
    let V;
    k ? (this.delayState.value = b[0], V = this.delayState) : V = C.next(A), d && !k && (V.value = d(V.value));
    let { done: G } = V;
    !k && g !== null && (G = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const ne = this.holdTime === null && (this.state === "finished" || this.state === "running" && G);
    return ne && j !== nh && (V.value = Vc(b, this.options, M, this.speed)), T && T(V.value), ne && this.finish(), V;
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
    return k1((l) => this.generator.next(l).value, a, i);
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
    const { driver: a = YD, startTime: i } = this.options;
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
function c5(t) {
  for (let a = 1; a < t.length; a++)
    t[a] ?? (t[a] = t[a - 1]);
}
const Xr = (t) => t * 180 / Math.PI, ah = (t) => {
  const a = Xr(Math.atan2(t[1], t[0]));
  return rh(a);
}, u5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: ah,
  rotateZ: ah,
  skewX: (t) => Xr(Math.atan(t[1])),
  skewY: (t) => Xr(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, rh = (t) => (t = t % 360, t < 0 && (t += 360), t), tb = ah, nb = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), ab = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), d5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: nb,
  scaleY: ab,
  scale: (t) => (nb(t) + ab(t)) / 2,
  rotateX: (t) => rh(Xr(Math.atan2(t[6], t[5]))),
  rotateY: (t) => rh(Xr(Math.atan2(-t[2], t[0]))),
  rotateZ: tb,
  rotate: tb,
  skewX: (t) => Xr(Math.atan(t[4])),
  skewY: (t) => Xr(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ih(t) {
  return t.includes("scale") ? 1 : 0;
}
function sh(t, a) {
  if (!t || t === "none")
    return ih(a);
  const i = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = d5, o = i;
  else {
    const m = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = u5, o = m;
  }
  if (!o)
    return ih(a);
  const d = l[a], h = o[1].split(",").map(h5);
  return typeof d == "function" ? d(h) : h[d];
}
const f5 = (t, a) => {
  const { transform: i = "none" } = getComputedStyle(t);
  return sh(i, a);
};
function h5(t) {
  return parseFloat(t.trim());
}
const as = [
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
], rs = new Set(as), rb = (t) => t === ns || t === we, m5 = /* @__PURE__ */ new Set(["x", "y", "z"]), p5 = as.filter((t) => !m5.has(t));
function v5(t) {
  const a = [];
  return p5.forEach((i) => {
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
  x: (t, { transform: a }) => sh(a, "x"),
  y: (t, { transform: a }) => sh(a, "y")
};
br.translateX = br.x;
br.translateY = br.y;
const Kr = /* @__PURE__ */ new Set();
let lh = !1, oh = !1, ch = !1;
function L1() {
  if (oh) {
    const t = Array.from(Kr).filter((l) => l.needsMeasurement), a = new Set(t.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    a.forEach((l) => {
      const o = v5(l);
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
  oh = !1, lh = !1, Kr.forEach((t) => t.complete(ch)), Kr.clear();
}
function U1() {
  Kr.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (oh = !0);
  });
}
function g5() {
  ch = !0, U1(), L1(), ch = !1;
}
class Wh {
  constructor(a, i, l, o, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...a], this.onComplete = i, this.name = l, this.motionValue = o, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Kr.add(this), lh || (lh = !0, Pn.read(U1), Pn.resolveKeyframes(L1))) : (this.readKeyframes(), this.complete());
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
    c5(a);
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
const y5 = (t) => t.startsWith("--");
function B1(t, a, i) {
  y5(a) ? t.style.setProperty(a, i) : t.style[a] = i;
}
const b5 = {};
function $1(t, a) {
  const i = /* @__PURE__ */ d1(t);
  return () => b5[a] ?? i();
}
const x5 = /* @__PURE__ */ $1(() => window.ScrollTimeline !== void 0, "scrollTimeline"), V1 = /* @__PURE__ */ $1(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ol = ([t, a, i, l]) => `cubic-bezier(${t}, ${a}, ${i}, ${l})`, ib = {
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
function H1(t, a) {
  if (t)
    return typeof t == "function" ? V1() ? z1(t, a) : "ease-out" : j1(t) ? ol(t) : Array.isArray(t) ? t.map((i) => H1(i, a) || ib.easeOut) : ib[t];
}
function S5(t, a, i, { delay: l = 0, duration: o = 300, repeat: d = 0, repeatType: h = "loop", ease: m = "easeOut", times: g } = {}, p = void 0) {
  const b = {
    [a]: i
  };
  g && (b.offset = g);
  const v = H1(m, o);
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
function q1(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function w5({ type: t, ...a }) {
  return q1(t) && V1() ? t.applyToOptions(a) : (a.duration ?? (a.duration = 300), a.ease ?? (a.ease = "easeOut"), a);
}
class I1 extends Jh {
  constructor(a) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !a)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: m, onComplete: g } = a;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = a, Ji(typeof a.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const p = w5(a);
    this.animation = S5(i, l, o, p, d), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const b = Vc(o, this.options, m, this.speed);
        this.updateMotionValue && this.updateMotionValue(b), B1(i, l, b), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, a && x5() ? (this.animation.timeline = a, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), ts) : o(this);
  }
}
const F1 = {
  anticipate: x1,
  backInOut: b1,
  circInOut: S1
};
function j5(t) {
  return t in F1;
}
function E5(t) {
  typeof t.ease == "string" && j5(t.ease) && (t.ease = F1[t.ease]);
}
const Af = 10;
class N5 extends I1 {
  constructor(a) {
    E5(a), O1(a), super(a), a.startTime !== void 0 && a.autoplay !== !1 && (this.startTime = a.startTime), this.options = a;
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
    const m = new Nc({
      ...h,
      autoplay: !1
    }), g = Math.max(Af, Dn.now() - this.startTime), p = xr(0, Af, g - Af), b = m.sample(g).value, { name: v } = this.options;
    d && v && B1(d, v, b), i.setWithVelocity(m.sample(Math.max(0, g - p)).value, b, p), m.stop();
  }
}
const sb = (t, a) => a === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(ra.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function T5(t) {
  const a = t[0];
  if (t.length === 1)
    return !0;
  for (let i = 0; i < t.length; i++)
    if (t[i] !== a)
      return !0;
}
function C5(t, a, i, l) {
  const o = t[0];
  if (o === null)
    return !1;
  if (a === "display" || a === "visibility")
    return !0;
  const d = t[t.length - 1], h = sb(o, a), m = sb(d, a);
  return Tl(h === m, `You are trying to animate ${a} from "${o}" to "${d}". "${h ? d : o}" is not an animatable value.`, "value-not-animatable"), !h || !m ? !1 : T5(t) || (i === "spring" || q1(i)) && l;
}
function uh(t) {
  t.duration = 0, t.type = "keyframes";
}
const Y1 = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), R5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function M5(t) {
  for (let a = 0; a < t.length; a++)
    if (typeof t[a] == "string" && R5.test(t[a]))
      return !0;
  return !1;
}
const _5 = /* @__PURE__ */ new Set([
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
]), A5 = /* @__PURE__ */ d1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function D5(t) {
  const { motionValue: a, name: i, repeatDelay: l, repeatType: o, damping: d, type: h, keyframes: m } = t;
  if (!(a?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: b } = a.owner.getProps();
  return A5() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Y1.has(i) || _5.has(i) && M5(m)) && (i !== "transform" || !b) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !l && o !== "mirror" && d !== 0 && h !== "inertia";
}
const z5 = 40;
class k5 extends Jh {
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
    }, w = b?.KeyframeResolver || Wh;
    this.keyframeResolver = new w(m, (j, T, M) => this.onKeyframesResolved(j, T, S, !M), g, p, b), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(a, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: m, delay: g, isHandoff: p, onUpdate: b } = l;
    this.resolvedAt = Dn.now();
    let v = !0;
    C5(a, d, h, m) || (v = !1, (Sr.instantAnimations || !g) && b?.(Vc(a, l, i)), a[0] = a[a.length - 1], uh(l), l.repeat = 0);
    const w = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > z5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: a
    }, j = v && !p && D5(w), T = w.motionValue?.owner?.current;
    let M;
    if (j)
      try {
        M = new N5({
          ...w,
          element: T
        });
      } catch {
        M = new Nc(w);
      }
    else
      M = new Nc(w);
    M.finished.then(() => {
      this.notifyFinished();
    }).catch(ts), this.pendingTimeline && (this.stopTimeline = M.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = M;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(a, i) {
    return this.finished.finally(a).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), g5()), this._animation;
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
function G1(t, a, i, l = 0, o = 1) {
  const d = Array.from(t).sort((p, b) => p.sortNodePosition(b)).indexOf(a), h = t.size, m = (h - 1) * l;
  return typeof i == "function" ? i(d, h) : o === 1 ? d * l : m - d * l;
}
const O5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function L5(t) {
  const a = O5.exec(t);
  if (!a)
    return [,];
  const [, i, l, o] = a;
  return [`--${i ?? l}`, o];
}
const U5 = 4;
function X1(t, a, i = 1) {
  Ji(i <= U5, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [l, o] = L5(t);
  if (!l)
    return;
  const d = window.getComputedStyle(a).getPropertyValue(l);
  if (d) {
    const h = d.trim();
    return c1(h) ? parseFloat(h) : h;
  }
  return Xh(o) ? X1(o, a, i + 1) : o;
}
const B5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, $5 = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), V5 = {
  type: "keyframes",
  duration: 0.8
}, H5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, q5 = (t, { keyframes: a }) => a.length > 2 ? V5 : rs.has(t) ? t.startsWith("scale") ? $5(a[1]) : B5 : H5;
function P1(t, a) {
  if (t?.inherit && a) {
    const { inherit: i, ...l } = t;
    return { ...a, ...l };
  }
  return t;
}
function K1(t, a) {
  const i = t?.[a] ?? t?.default ?? t;
  return i !== t ? P1(i, t) : i;
}
const I5 = /* @__PURE__ */ new Set([
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
function F5(t) {
  for (const a in t)
    if (!I5.has(a))
      return !0;
  return !1;
}
const Y5 = (t, a, i, l = {}, o, d) => (h) => {
  const m = K1(l, t) || {}, g = m.delay || l.delay || 0;
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
  F5(m) || Object.assign(b, q5(t, b)), b.duration && (b.duration = /* @__PURE__ */ Xn(b.duration)), b.repeatDelay && (b.repeatDelay = /* @__PURE__ */ Xn(b.repeatDelay)), b.from !== void 0 && (b.keyframes[0] = b.from);
  let v = !1;
  if ((b.type === !1 || b.duration === 0 && !b.repeatDelay) && (uh(b), b.delay === 0 && (v = !0)), (Sr.instantAnimations || Sr.skipAnimations || o?.shouldSkipAnimations) && (v = !0, uh(b), b.delay = 0), b.allowFlatten = !m.type && !m.ease, v && !d && a.get() !== void 0) {
    const S = Vc(b.keyframes, m);
    if (S !== void 0) {
      Pn.update(() => {
        b.onUpdate(S), b.onComplete();
      });
      return;
    }
  }
  return m.isSync ? new Nc(b) : new k5(b);
};
function lb(t) {
  const a = [{}, {}];
  return t?.values.forEach((i, l) => {
    a[0][l] = i.get(), a[1][l] = i.getVelocity();
  }), a;
}
function em(t, a, i, l) {
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
  return em(l, a, i !== void 0 ? i : l.custom, t);
}
const Q1 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...as
]), ob = 30, G5 = (t) => !isNaN(parseFloat(t));
class X5 {
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
    this.current = a, this.updatedAt = Dn.now(), this.canTrackVelocity === null && a !== void 0 && (this.canTrackVelocity = G5(this.current));
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
    this.events[a] || (this.events[a] = new h1());
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
    return m1(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Tc(t, a) {
  return new X5(t, a);
}
const dh = (t) => Array.isArray(t);
function P5(t, a, i) {
  t.hasValue(a) ? t.getValue(a).set(i) : t.addValue(a, Tc(i));
}
function K5(t) {
  return dh(t) ? t[t.length - 1] || 0 : t;
}
function Q5(t, a) {
  const i = Qr(t, a);
  let { transitionEnd: l = {}, transition: o = {}, ...d } = i || {};
  d = { ...d, ...l };
  for (const h in d) {
    const m = K5(d[h]);
    P5(t, h, m);
  }
}
const cn = (t) => !!(t && t.getVelocity);
function Z5(t) {
  return !!(cn(t) && t.add);
}
function J5(t, a) {
  const i = t.getValue("willChange");
  if (Z5(i))
    return i.add(a);
  if (!i && Sr.WillChange) {
    const l = new Sr.WillChange("auto");
    t.addValue("willChange", l), l.add(a);
  }
}
function tm(t) {
  return t.replace(/([A-Z])/g, (a) => `-${a.toLowerCase()}`);
}
const W5 = "framerAppearId", Z1 = "data-" + tm(W5);
function ez(t) {
  return t.props[Z1];
}
function tz({ protectedKeys: t, needsAnimating: a }, i) {
  const l = t.hasOwnProperty(i) && a[i] !== !0;
  return a[i] = !1, l;
}
function J1(t, a, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: d, transitionEnd: h, ...m } = a;
  const g = t.getDefaultTransition();
  d = d ? P1(d, g) : g;
  const p = d?.reduceMotion;
  l && (d = l);
  const b = [], v = o && t.animationState && t.animationState.getState()[o];
  for (const S in m) {
    const w = t.getValue(S, t.latestValues[S] ?? null), j = m[S];
    if (j === void 0 || v && tz(v, S))
      continue;
    const T = {
      delay: i,
      ...K1(d || {}, S)
    }, M = w.get();
    if (M !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === M && !T.velocity) {
      Pn.update(() => w.set(j));
      continue;
    }
    let N = !1;
    if (window.MotionHandoffAnimation) {
      const C = ez(t);
      if (C) {
        const V = window.MotionHandoffAnimation(C, S, Pn);
        V !== null && (T.startTime = V, N = !0);
      }
    }
    J5(t, S);
    const k = p ?? t.shouldReduceMotion;
    w.start(Y5(S, w, j, k && Q1.has(S) ? { type: !1 } : T, t, N));
    const A = w.animation;
    A && b.push(A);
  }
  if (h) {
    const S = () => Pn.update(() => {
      h && Q5(t, h);
    });
    b.length ? Promise.all(b).then(S) : S();
  }
  return b;
}
function fh(t, a, i = {}) {
  const l = Qr(t, a, i.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: o = t.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const d = l ? () => Promise.all(J1(t, l, i)) : () => Promise.resolve(), h = t.variantChildren && t.variantChildren.size ? (g = 0) => {
    const { delayChildren: p = 0, staggerChildren: b, staggerDirection: v } = o;
    return nz(t, a, g, p, b, v, i);
  } : () => Promise.resolve(), { when: m } = o;
  if (m) {
    const [g, p] = m === "beforeChildren" ? [d, h] : [h, d];
    return g().then(() => p());
  } else
    return Promise.all([d(), h(i.delay)]);
}
function nz(t, a, i = 0, l = 0, o = 0, d = 1, h) {
  const m = [];
  for (const g of t.variantChildren)
    g.notify("AnimationStart", a), m.push(fh(g, a, {
      ...h,
      delay: i + (typeof l == "function" ? 0 : l) + G1(t.variantChildren, g, l, o, d)
    }).then(() => g.notify("AnimationComplete", a)));
  return Promise.all(m);
}
function az(t, a, i = {}) {
  t.notify("AnimationStart", a);
  let l;
  if (Array.isArray(a)) {
    const o = a.map((d) => fh(t, d, i));
    l = Promise.all(o);
  } else if (typeof a == "string")
    l = fh(t, a, i);
  else {
    const o = typeof a == "function" ? Qr(t, a, i.custom) : a;
    l = Promise.all(J1(t, o, i));
  }
  return l.then(() => {
    t.notify("AnimationComplete", a);
  });
}
const rz = {
  test: (t) => t === "auto",
  parse: (t) => t
}, W1 = (t) => (a) => a.test(t), eS = [ns, we, Pi, pr, TD, ND, rz], cb = (t) => eS.find(W1(t));
function iz(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || u1(t) : !0;
}
const sz = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function lz(t) {
  const [a, i] = t.slice(0, -1).split("(");
  if (a === "drop-shadow")
    return t;
  const [l] = i.match(Ph) || [];
  if (!l)
    return t;
  const o = i.replace(l, "");
  let d = sz.has(a) ? 1 : 0;
  return l !== i && (d *= 100), a + "(" + d + o + ")";
}
const oz = /\b([a-z-]*)\(.*?\)/gu, hh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = t.match(oz);
    return a ? a.map(lz).join(" ") : t;
  }
}, mh = {
  ...ra,
  getAnimatableNone: (t) => {
    const a = ra.parse(t);
    return ra.createTransformer(t)(a.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, ub = {
  ...ns,
  transform: Math.round
}, cz = {
  rotate: pr,
  rotateX: pr,
  rotateY: pr,
  rotateZ: pr,
  scale: Wo,
  scaleX: Wo,
  scaleY: Wo,
  scaleZ: Wo,
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
}, nm = {
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
  ...cz,
  zIndex: ub,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: ub
}, uz = {
  ...nm,
  // Color props
  color: $t,
  backgroundColor: $t,
  outlineColor: $t,
  fill: $t,
  stroke: $t,
  // Border props
  borderColor: $t,
  borderTopColor: $t,
  borderRightColor: $t,
  borderBottomColor: $t,
  borderLeftColor: $t,
  filter: hh,
  WebkitFilter: hh,
  mask: mh,
  WebkitMask: mh
}, tS = (t) => uz[t], dz = /* @__PURE__ */ new Set([hh, mh]);
function nS(t, a) {
  let i = tS(t);
  return dz.has(i) || (i = ra), i.getAnimatableNone ? i.getAnimatableNone(a) : void 0;
}
const fz = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function hz(t, a, i) {
  let l = 0, o;
  for (; l < t.length && !o; ) {
    const d = t[l];
    typeof d == "string" && !fz.has(d) && Wi(d).values.length && (o = t[l]), l++;
  }
  if (o && i)
    for (const d of a)
      t[d] = nS(i, o);
}
class mz extends Wh {
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
      if (typeof v == "string" && (v = v.trim(), Xh(v))) {
        const S = X1(v, i.current);
        S !== void 0 && (a[b] = S), b === a.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !Q1.has(l) || a.length !== 2)
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
      (a[o] === null || iz(a[o])) && l.push(o);
    l.length && hz(a, l, i);
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
function pz(t, a, i) {
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
const aS = (t, a) => a && typeof t == "number" ? a.transform(t) : t;
function mc(t) {
  return sD(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: vz } = /* @__PURE__ */ E1(queueMicrotask, !1), gz = {
  y: !1
};
function yz() {
  return gz.y;
}
function rS(t, a) {
  const i = pz(t), l = new AbortController(), o = {
    passive: !0,
    ...a,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function bz(t) {
  return !(t.pointerType === "touch" || yz());
}
function xz(t, a, i = {}) {
  const [l, o, d] = rS(t, i);
  return l.forEach((h) => {
    let m = !1, g = !1, p;
    const b = () => {
      h.removeEventListener("pointerleave", j);
    }, v = (M) => {
      p && (p(M), p = void 0), b();
    }, S = (M) => {
      m = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), g && (g = !1, v(M));
    }, w = () => {
      m = !0, window.addEventListener("pointerup", S, o), window.addEventListener("pointercancel", S, o);
    }, j = (M) => {
      if (M.pointerType !== "touch") {
        if (m) {
          g = !0;
          return;
        }
        v(M);
      }
    }, T = (M) => {
      if (!bz(M))
        return;
      g = !1;
      const N = a(h, M);
      typeof N == "function" && (p = N, h.addEventListener("pointerleave", j, o));
    };
    h.addEventListener("pointerenter", T, o), h.addEventListener("pointerdown", w, o);
  }), d;
}
const iS = (t, a) => a ? t === a ? !0 : iS(t, a.parentElement) : !1, Sz = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, wz = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function jz(t) {
  return wz.has(t.tagName) || t.isContentEditable === !0;
}
const pc = /* @__PURE__ */ new WeakSet();
function db(t) {
  return (a) => {
    a.key === "Enter" && t(a);
  };
}
function Df(t, a) {
  t.dispatchEvent(new PointerEvent("pointer" + a, { isPrimary: !0, bubbles: !0 }));
}
const Ez = (t, a) => {
  const i = t.currentTarget;
  if (!i)
    return;
  const l = db(() => {
    if (pc.has(i))
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
  return Sz(t) && !0;
}
const hb = /* @__PURE__ */ new WeakSet();
function Nz(t, a, i = {}) {
  const [l, o, d] = rS(t, i), h = (m) => {
    const g = m.currentTarget;
    if (!fb(m) || hb.has(m))
      return;
    pc.add(g), i.stopPropagation && hb.add(m);
    const p = a(g, m), b = (w, j) => {
      window.removeEventListener("pointerup", v), window.removeEventListener("pointercancel", S), pc.has(g) && pc.delete(g), fb(w) && typeof p == "function" && p(w, { success: j });
    }, v = (w) => {
      b(w, g === window || g === document || i.useGlobalTarget || iS(g, w.target));
    }, S = (w) => {
      b(w, !1);
    };
    window.addEventListener("pointerup", v, o), window.addEventListener("pointercancel", S, o);
  };
  return l.forEach((m) => {
    (i.useGlobalTarget ? window : m).addEventListener("pointerdown", h, o), mc(m) && (m.addEventListener("focus", (p) => Ez(p, o)), !jz(m) && !m.hasAttribute("tabindex") && (m.tabIndex = 0));
  }), d;
}
const Tz = [...eS, $t, ra], Cz = (t) => Tz.find(W1(t)), mb = () => ({ min: 0, max: 0 }), sS = () => ({
  x: mb(),
  y: mb()
}), Rz = /* @__PURE__ */ new WeakMap();
function Hc(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function bl(t) {
  return typeof t == "string" || Array.isArray(t);
}
const am = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], rm = ["initial", ...am];
function qc(t) {
  return Hc(t.animate) || rm.some((a) => bl(t[a]));
}
function lS(t) {
  return !!(qc(t) || t.variants);
}
function Mz(t, a, i) {
  for (const l in a) {
    const o = a[l], d = i[l];
    if (cn(o))
      t.addValue(l, o);
    else if (cn(d))
      t.addValue(l, Tc(o, { owner: t }));
    else if (d !== o)
      if (t.hasValue(l)) {
        const h = t.getValue(l);
        h.liveStyle === !0 ? h.jump(o) : h.hasAnimated || h.set(o);
      } else {
        const h = t.getStaticValue(l);
        t.addValue(l, Tc(h !== void 0 ? h : o, { owner: t }));
      }
  }
  for (const l in i)
    a[l] === void 0 && t.removeValue(l);
  return a;
}
const Cc = { current: null }, im = { current: !1 }, _z = typeof window < "u";
function oS() {
  if (im.current = !0, !!_z)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), a = () => Cc.current = t.matches;
      t.addEventListener("change", a), a();
    } else
      Cc.current = !1;
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
let Rc = {};
function cS(t) {
  Rc = t;
}
function Az() {
  return Rc;
}
class Dz {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Wh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const w = Dn.now();
      this.renderScheduledAt < w && (this.renderScheduledAt = w, Pn.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: b } = m;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = i.initial ? { ...p } : {}, this.renderState = b, this.parent = a, this.props = i, this.presenceContext = l, this.depth = a ? a.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = d, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = qc(i), this.isVariantNode = lS(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(a && a.current);
    const { willChange: v, ...S } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const w in S) {
      const j = S[w];
      p[w] !== void 0 && cn(j) && j.set(p[w]);
    }
  }
  mount(a) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = a, Rz.set(a, this), this.projection && !this.projection.instance && this.projection.mount(a), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (im.current || oS(), this.shouldReduceMotion = Cc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Jf(this.notifyUpdate), Jf(this.render), this.valueSubscriptions.forEach((a) => a()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(a) && this.valueSubscriptions.get(a)(), i.accelerate && Y1.has(a) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: m, times: g, ease: p, duration: b } = i.accelerate, v = new I1({
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
    const l = rs.has(a);
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
    for (a in Rc) {
      const i = Rc[a];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : sS();
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
    this.prevMotionValues = Mz(this, this.scrapeMotionValuesFromProps(a, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return l === void 0 && i !== void 0 && (l = Tc(i === null ? void 0 : i, { owner: this }), this.addValue(a, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(a, i) {
    let l = this.latestValues[a] !== void 0 || !this.current ? this.latestValues[a] : this.getBaseTargetFromProps(this.props, a) ?? this.readValueFromInstance(this.current, a, this.options);
    return l != null && (typeof l == "string" && (c1(l) || u1(l)) ? l = parseFloat(l) : !Cz(l) && ra.test(i) && (l = nS(a, i)), this.setBaseTarget(a, cn(l) ? l.get() : l)), cn(l) ? l.get() : l;
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
      const d = em(this.props, i, this.presenceContext?.custom);
      d && (l = d[a]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, a);
    return o !== void 0 && !cn(o) ? o : this.initialValues[a] !== void 0 && l === void 0 ? void 0 : this.baseTarget[a];
  }
  on(a, i) {
    return this.events[a] || (this.events[a] = new h1()), this.events[a].add(i);
  }
  notify(a, ...i) {
    this.events[a] && this.events[a].notify(...i);
  }
  scheduleRenderMicrotask() {
    vz.render(this.render);
  }
}
class uS extends Dz {
  constructor() {
    super(...arguments), this.KeyframeResolver = mz;
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
    cn(a) && (this.childSubscription = a.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class is {
  constructor(a) {
    this.isMounted = !1, this.node = a;
  }
  update() {
  }
}
function zz({ top: t, left: a, right: i, bottom: l }) {
  return {
    x: { min: a, max: i },
    y: { min: t, max: l }
  };
}
function kz(t, a) {
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
function Oz(t, a) {
  return zz(kz(t.getBoundingClientRect(), a));
}
const Lz = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Uz = as.length;
function Bz(t, a, i) {
  let l = "", o = !0;
  for (let d = 0; d < Uz; d++) {
    const h = as[d], m = t[h];
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
      const p = aS(m, nm[h]);
      if (!g) {
        o = !1;
        const b = Lz[h] || h;
        l += `${b}(${p}) `;
      }
      i && (a[h] = p);
    }
  }
  return l = l.trim(), i ? l = i(a, o ? "" : l) : o && (l = "none"), l;
}
function sm(t, a, i) {
  const { style: l, vars: o, transformOrigin: d } = t;
  let h = !1, m = !1;
  for (const g in a) {
    const p = a[g];
    if (rs.has(g)) {
      h = !0;
      continue;
    } else if (T1(g)) {
      o[g] = p;
      continue;
    } else {
      const b = aS(p, nm[g]);
      g.startsWith("origin") ? (m = !0, d[g] = b) : l[g] = b;
    }
  }
  if (a.transform || (h || i ? l.transform = Bz(a, t.transform, i) : l.transform && (l.transform = "none")), m) {
    const { originX: g = "50%", originY: p = "50%", originZ: b = 0 } = d;
    l.transformOrigin = `${g} ${p} ${b}`;
  }
}
function dS(t, { style: a, vars: i }, l, o) {
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
const tl = {
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
}, $z = {
  correct: (t, { treeScale: a, projectionDelta: i }) => {
    const l = t, o = ra.parse(t);
    if (o.length > 5)
      return l;
    const d = ra.createTransformer(t), h = typeof o[0] != "number" ? 1 : 0, m = i.x.scale * a.x, g = i.y.scale * a.y;
    o[0 + h] /= m, o[1 + h] /= g;
    const p = Ml(m, g, 0.5);
    return typeof o[2 + h] == "number" && (o[2 + h] /= p), typeof o[3 + h] == "number" && (o[3 + h] /= p), d(o);
  }
}, Vz = {
  borderRadius: {
    ...tl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: tl,
  borderTopRightRadius: tl,
  borderBottomLeftRadius: tl,
  borderBottomRightRadius: tl,
  boxShadow: $z
};
function fS(t, { layout: a, layoutId: i }) {
  return rs.has(t) || t.startsWith("origin") || (a || i !== void 0) && (!!Vz[t] || t === "opacity");
}
function lm(t, a, i) {
  const l = t.style, o = a?.style, d = {};
  if (!l)
    return d;
  for (const h in l)
    (cn(l[h]) || o && cn(o[h]) || fS(h, t) || i?.getValue(h)?.liveStyle !== void 0) && (d[h] = l[h]);
  return d;
}
function Hz(t) {
  return window.getComputedStyle(t);
}
class qz extends uS {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = dS;
  }
  readValueFromInstance(a, i) {
    if (rs.has(i))
      return this.projection?.isProjecting ? ih(i) : f5(a, i);
    {
      const l = Hz(a), o = (T1(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(a, { transformPagePoint: i }) {
    return Oz(a, i);
  }
  build(a, i, l) {
    sm(a, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return lm(a, i, l);
  }
}
const Iz = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Fz = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Yz(t, a, i = 1, l = 0, o = !0) {
  t.pathLength = 1;
  const d = o ? Iz : Fz;
  t[d.offset] = `${-l}`, t[d.array] = `${a} ${i}`;
}
const Gz = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function hS(t, {
  attrX: a,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...m
}, g, p, b) {
  if (sm(t, m, p), g) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: v, style: S } = t;
  v.transform && (S.transform = v.transform, delete v.transform), (S.transform || v.transformOrigin) && (S.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), S.transform && (S.transformBox = b?.transformBox ?? "fill-box", delete v.transformBox);
  for (const w of Gz)
    v[w] !== void 0 && (S[w] = v[w], delete v[w]);
  a !== void 0 && (v.x = a), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && Yz(v, o, d, h, !1);
}
const mS = /* @__PURE__ */ new Set([
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
]), pS = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Xz(t, a, i, l) {
  dS(t, a, void 0, l);
  for (const o in a.attrs)
    t.setAttribute(mS.has(o) ? o : tm(o), a.attrs[o]);
}
function vS(t, a, i) {
  const l = lm(t, a, i);
  for (const o in t)
    if (cn(t[o]) || cn(a[o])) {
      const d = as.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[d] = t[o];
    }
  return l;
}
class Pz extends uS {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = sS;
  }
  getBaseTargetFromProps(a, i) {
    return a[i];
  }
  readValueFromInstance(a, i) {
    if (rs.has(i)) {
      const l = tS(i);
      return l && l.default || 0;
    }
    return i = mS.has(i) ? i : tm(i), a.getAttribute(i);
  }
  scrapeMotionValuesFromProps(a, i, l) {
    return vS(a, i, l);
  }
  build(a, i, l) {
    hS(a, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(a, i, l, o) {
    Xz(a, i, l, o);
  }
  mount(a) {
    this.isSVGTag = pS(a.tagName), super.mount(a);
  }
}
const Kz = rm.length;
function gS(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const i = t.parent ? gS(t.parent) || {} : {};
    return t.props.initial !== void 0 && (i.initial = t.props.initial), i;
  }
  const a = {};
  for (let i = 0; i < Kz; i++) {
    const l = rm[i], o = t.props[l];
    (bl(o) || o === !1) && (a[l] = o);
  }
  return a;
}
function yS(t, a) {
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
const Qz = [...am].reverse(), Zz = am.length;
function Jz(t) {
  return (a) => Promise.all(a.map(({ animation: i, options: l }) => az(t, i, l)));
}
function Wz(t) {
  let a = Jz(t), i = gb(), l = !0, o = !1;
  const d = (p) => (b, v) => {
    const S = Qr(t, v, p === "exit" ? t.presenceContext?.custom : void 0);
    if (S) {
      const { transition: w, transitionEnd: j, ...T } = S;
      b = { ...b, ...T, ...j };
    }
    return b;
  };
  function h(p) {
    a = p(t);
  }
  function m(p) {
    const { props: b } = t, v = gS(t.parent) || {}, S = [], w = /* @__PURE__ */ new Set();
    let j = {}, T = 1 / 0;
    for (let N = 0; N < Zz; N++) {
      const k = Qz[N], A = i[k], C = b[k] !== void 0 ? b[k] : v[k], V = bl(C), G = k === p ? A.isActive : null;
      G === !1 && (T = N);
      let ne = C === v[k] && C !== b[k] && V;
      if (ne && (l || o) && t.manuallyAnimateOnMount && (ne = !1), A.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !A.isActive && G === null || // If we didn't and don't have any defined prop for this animation type
      !C && !A.prevProp || // Or if the prop doesn't define an animation
      Hc(C) || typeof C == "boolean")
        continue;
      if (k === "exit" && A.isActive && G !== !0) {
        A.prevResolvedValues && (j = {
          ...j,
          ...A.prevResolvedValues
        });
        continue;
      }
      const D = ek(A.prevProp, C);
      let I = D || // If we're making this variant active, we want to always make it active
      k === p && A.isActive && !ne && V || // If we removed a higher-priority variant (i is in reverse order)
      N > T && V, F = !1;
      const ie = Array.isArray(C) ? C : [C];
      let re = ie.reduce(d(k), {});
      G === !1 && (re = {});
      const { prevResolvedValues: te = {} } = A, ce = {
        ...te,
        ...re
      }, W = (U) => {
        I = !0, w.has(U) && (F = !0, w.delete(U)), A.needsAnimating[U] = !0;
        const B = t.getValue(U);
        B && (B.liveStyle = !1);
      };
      for (const U in ce) {
        const B = re[U], Z = te[U];
        if (j.hasOwnProperty(U))
          continue;
        let _ = !1;
        dh(B) && dh(Z) ? _ = !yS(B, Z) : _ = B !== Z, _ ? B != null ? W(U) : w.add(U) : B !== void 0 && w.has(U) ? W(U) : A.protectedKeys[U] = !0;
      }
      A.prevProp = C, A.prevResolvedValues = re, A.isActive && (j = { ...j, ...re }), (l || o) && t.blockInitialAnimation && (I = !1);
      const O = ne && D;
      I && (!O || F) && S.push(...ie.map((U) => {
        const B = { type: k };
        if (typeof U == "string" && (l || o) && !O && t.manuallyAnimateOnMount && t.parent) {
          const { parent: Z } = t, _ = Qr(Z, U);
          if (Z.enteringChildren && _) {
            const { delayChildren: J } = _.transition || {};
            B.delay = G1(Z.enteringChildren, t, J);
          }
        }
        return {
          animation: U,
          options: B
        };
      }));
    }
    if (w.size) {
      const N = {};
      if (typeof b.initial != "boolean") {
        const k = Qr(t, Array.isArray(b.initial) ? b.initial[0] : b.initial);
        k && k.transition && (N.transition = k.transition);
      }
      w.forEach((k) => {
        const A = t.getBaseTarget(k), C = t.getValue(k);
        C && (C.liveStyle = !0), N[k] = A ?? null;
      }), S.push({ animation: N });
    }
    let M = !!S.length;
    return l && (b.initial === !1 || b.initial === b.animate) && !t.manuallyAnimateOnMount && (M = !1), l = !1, o = !1, M ? a(S) : Promise.resolve();
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
function ek(t, a) {
  return typeof a == "string" ? a !== t : Array.isArray(a) ? !yS(a, t) : !1;
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
function tk(t) {
  return cn(t) ? t.get() : t;
}
const om = y.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function bb(t, a) {
  if (typeof t == "function")
    return t(a);
  t != null && (t.current = a);
}
function nk(...t) {
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
function ak(...t) {
  return y.useCallback(nk(...t), t);
}
class rk extends y.Component {
  getSnapshotBeforeUpdate(a) {
    const i = this.props.childRef.current;
    if (mc(i) && a.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = mc(l) && l.offsetWidth || 0, d = mc(l) && l.offsetHeight || 0, h = getComputedStyle(i), m = this.props.sizeRef.current;
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
function ik({ children: t, isPresent: a, anchorX: i, anchorY: l, root: o, pop: d }) {
  const h = y.useId(), m = y.useRef(null), g = y.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }), { nonce: p } = y.useContext(om), b = t.props?.ref ?? t?.ref, v = ak(m, b);
  return y.useInsertionEffect(() => {
    const { width: S, height: w, top: j, left: T, right: M, bottom: N } = g.current;
    if (a || d === !1 || !m.current || !S || !w)
      return;
    const k = i === "left" ? `left: ${T}` : `right: ${M}`, A = l === "bottom" ? `bottom: ${N}` : `top: ${j}`;
    m.current.dataset.motionPopId = h;
    const C = document.createElement("style");
    p && (C.nonce = p);
    const V = o ?? document.head;
    return V.appendChild(C), C.sheet && C.sheet.insertRule(`
          [data-motion-pop-id="${h}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${w}px !important;
            ${k}px !important;
            ${A}px !important;
          }
        `), () => {
      m.current?.removeAttribute("data-motion-pop-id"), V.contains(C) && V.removeChild(C);
    };
  }, [a]), c.jsx(rk, { isPresent: a, childRef: m, sizeRef: g, pop: d, children: d === !1 ? t : y.cloneElement(t, { ref: v }) });
}
const sk = ({ children: t, initial: a, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: d, mode: h, anchorX: m, anchorY: g, root: p }) => {
  const b = Fh(lk), v = y.useId();
  let S = !0, w = y.useMemo(() => (S = !1, {
    id: v,
    initial: a,
    isPresent: i,
    custom: o,
    onExitComplete: (j) => {
      b.set(j, !0);
      for (const T of b.values())
        if (!T)
          return;
      l && l();
    },
    register: (j) => (b.set(j, !1), () => b.delete(j))
  }), [i, b, l]);
  return d && S && (w = { ...w }), y.useMemo(() => {
    b.forEach((j, T) => b.set(T, !1));
  }, [i]), y.useEffect(() => {
    !i && !b.size && l && l();
  }, [i]), t = c.jsx(ik, { pop: h === "popLayout", isPresent: i, anchorX: m, anchorY: g, root: p, children: t }), c.jsx(Bc.Provider, { value: w, children: t });
};
function lk() {
  return /* @__PURE__ */ new Map();
}
function ok(t = !0) {
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
const ec = (t) => t.key || "";
function xb(t) {
  const a = [];
  return y.Children.forEach(t, (i) => {
    y.isValidElement(i) && a.push(i);
  }), a;
}
const bS = ({ children: t, custom: a, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: d = "sync", propagate: h = !1, anchorX: m = "left", anchorY: g = "top", root: p }) => {
  const [b, v] = ok(h), S = y.useMemo(() => xb(t), [t]), w = h && !b ? [] : S.map(ec), j = y.useRef(!0), T = y.useRef(S), M = Fh(() => /* @__PURE__ */ new Map()), N = y.useRef(/* @__PURE__ */ new Set()), [k, A] = y.useState(S), [C, V] = y.useState(S);
  o1(() => {
    j.current = !1, T.current = S;
    for (let D = 0; D < C.length; D++) {
      const I = ec(C[D]);
      w.includes(I) ? (M.delete(I), N.current.delete(I)) : M.get(I) !== !0 && M.set(I, !1);
    }
  }, [C, w.length, w.join("-")]);
  const G = [];
  if (S !== k) {
    let D = [...S];
    for (let I = 0; I < C.length; I++) {
      const F = C[I], ie = ec(F);
      w.includes(ie) || (D.splice(I, 0, F), G.push(F));
    }
    return d === "wait" && G.length && (D = G), V(xb(D)), A(S), null;
  }
  const { forceRender: ne } = y.useContext(l1);
  return c.jsx(c.Fragment, { children: C.map((D) => {
    const I = ec(D), F = h && !b ? !1 : S === C || w.includes(I), ie = () => {
      if (N.current.has(I))
        return;
      if (M.has(I))
        N.current.add(I), M.set(I, !0);
      else
        return;
      let re = !0;
      M.forEach((te) => {
        te || (re = !1);
      }), re && (ne?.(), V(T.current), h && v?.(), l && l());
    };
    return c.jsx(sk, { isPresent: F, initial: !j.current || i ? void 0 : !1, custom: a, presenceAffectsLayout: o, mode: d, root: p, onExitComplete: F ? void 0 : ie, anchorX: m, anchorY: g, children: D }, I);
  }) });
}, cm = y.createContext({ strict: !1 }), Sb = {
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
function ck() {
  if (wb)
    return;
  const t = {};
  for (const a in Sb)
    t[a] = {
      isEnabled: (i) => Sb[a].some((l) => !!i[l])
    };
  cS(t), wb = !0;
}
function xS() {
  return ck(), Az();
}
function ph(t) {
  const a = xS();
  for (const i in t)
    a[i] = {
      ...a[i],
      ...t[i]
    };
  cS(a);
}
function um({ children: t, features: a, strict: i = !1 }) {
  const [, l] = y.useState(!zf(a)), o = y.useRef(void 0);
  if (!zf(a)) {
    const { renderer: d, ...h } = a;
    o.current = d, ph(h);
  }
  return y.useEffect(() => {
    zf(a) && a().then(({ renderer: d, ...h }) => {
      ph(h), o.current = d, l(!0);
    });
  }, []), c.jsx(cm.Provider, { value: { renderer: o.current, strict: i }, children: t });
}
function zf(t) {
  return typeof t == "function";
}
const uk = /* @__PURE__ */ new Set([
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
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || uk.has(t);
}
let SS = (t) => !Mc(t);
function dk(t) {
  typeof t == "function" && (SS = (a) => a.startsWith("on") ? !Mc(a) : t(a));
}
try {
  dk(require("@emotion/is-prop-valid").default);
} catch {
}
function fk(t, a, i) {
  const l = {};
  for (const o in t)
    o === "values" && typeof t.values == "object" || cn(t[o]) || (SS(o) || i === !0 && Mc(o) || !a && !Mc(o) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && o.startsWith("onDrag")) && (l[o] = t[o]);
  return l;
}
const Ic = /* @__PURE__ */ y.createContext({});
function hk(t, a) {
  if (qc(t)) {
    const { initial: i, animate: l } = t;
    return {
      initial: i === !1 || bl(i) ? i : void 0,
      animate: bl(l) ? l : void 0
    };
  }
  return t.inherit !== !1 ? a : {};
}
function mk(t) {
  const { initial: a, animate: i } = hk(t, y.useContext(Ic));
  return y.useMemo(() => ({ initial: a, animate: i }), [jb(a), jb(i)]);
}
function jb(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const dm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function wS(t, a, i) {
  for (const l in a)
    !cn(a[l]) && !fS(l, i) && (t[l] = a[l]);
}
function pk({ transformTemplate: t }, a) {
  return y.useMemo(() => {
    const i = dm();
    return sm(i, a, t), Object.assign({}, i.vars, i.style);
  }, [a]);
}
function vk(t, a) {
  const i = t.style || {}, l = {};
  return wS(l, i, t), Object.assign(l, pk(t, a)), l;
}
function gk(t, a) {
  const i = {}, l = vk(t, a);
  return t.drag && t.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const jS = () => ({
  ...dm(),
  attrs: {}
});
function yk(t, a, i, l) {
  const o = y.useMemo(() => {
    const d = jS();
    return hS(d, a, pS(l), t.transformTemplate, t.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [a]);
  if (t.style) {
    const d = {};
    wS(d, t.style, t), o.style = { ...d, ...o.style };
  }
  return o;
}
const bk = [
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
function fm(t) {
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
      !!(bk.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function xk(t, a, i, { latestValues: l }, o, d = !1, h) {
  const g = (h ?? fm(t) ? yk : gk)(a, l, o, t), p = fk(a, typeof t == "string", d), b = t !== y.Fragment ? { ...p, ...g, ref: i } : {}, { children: v } = a, S = y.useMemo(() => cn(v) ? v.get() : v, [v]);
  return y.createElement(t, {
    ...b,
    children: S
  });
}
function Sk({ scrapeMotionValuesFromProps: t, createRenderState: a }, i, l, o) {
  return {
    latestValues: wk(i, l, o, t),
    renderState: a()
  };
}
function wk(t, a, i, l) {
  const o = {}, d = l(t, {});
  for (const S in d)
    o[S] = tk(d[S]);
  let { initial: h, animate: m } = t;
  const g = qc(t), p = lS(t);
  a && p && !g && t.inherit !== !1 && (h === void 0 && (h = a.initial), m === void 0 && (m = a.animate));
  let b = i ? i.initial === !1 : !1;
  b = b || h === !1;
  const v = b ? m : h;
  if (v && typeof v != "boolean" && !Hc(v)) {
    const S = Array.isArray(v) ? v : [v];
    for (let w = 0; w < S.length; w++) {
      const j = em(t, S[w]);
      if (j) {
        const { transitionEnd: T, transition: M, ...N } = j;
        for (const k in N) {
          let A = N[k];
          if (Array.isArray(A)) {
            const C = b ? A.length - 1 : 0;
            A = A[C];
          }
          A !== null && (o[k] = A);
        }
        for (const k in T)
          o[k] = T[k];
      }
    }
  }
  return o;
}
const ES = (t) => (a, i) => {
  const l = y.useContext(Ic), o = y.useContext(Bc), d = () => Sk(t, a, l, o);
  return i ? d() : Fh(d);
}, jk = /* @__PURE__ */ ES({
  scrapeMotionValuesFromProps: lm,
  createRenderState: dm
}), Ek = /* @__PURE__ */ ES({
  scrapeMotionValuesFromProps: vS,
  createRenderState: jS
}), Nk = Symbol.for("motionComponentSymbol");
function Tk(t, a, i) {
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
const Ck = y.createContext({});
function Rk(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Mk(t, a, i, l, o, d) {
  const { visualElement: h } = y.useContext(Ic), m = y.useContext(cm), g = y.useContext(Bc), p = y.useContext(om), b = p.reducedMotion, v = p.skipAnimations, S = y.useRef(null), w = y.useRef(!1);
  l = l || m.renderer, !S.current && l && (S.current = l(t, {
    visualState: a,
    parent: h,
    props: i,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: b,
    skipAnimations: v,
    isSVG: d
  }), w.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, T = y.useContext(Ck);
  j && !j.projection && o && (j.type === "html" || j.type === "svg") && _k(S.current, i, o, T);
  const M = y.useRef(!1);
  y.useInsertionEffect(() => {
    j && M.current && j.update(i, g);
  });
  const N = i[Z1], k = y.useRef(!!N && typeof window < "u" && !window.MotionHandoffIsComplete?.(N) && window.MotionHasOptimisedAnimation?.(N));
  return o1(() => {
    w.current = !0, j && (M.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), k.current && j.animationState && j.animationState.animateChanges());
  }), y.useEffect(() => {
    j && (!k.current && j.animationState && j.animationState.animateChanges(), k.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(N);
    }), k.current = !1), j.enteringChildren = void 0);
  }), j;
}
function _k(t, a, i, l) {
  const { layoutId: o, layout: d, drag: h, dragConstraints: m, layoutScroll: g, layoutRoot: p, layoutAnchor: b, layoutCrossfade: v } = a;
  t.projection = new i(t.latestValues, a["data-framer-portal-id"] ? void 0 : NS(t.parent)), t.projection.setOptions({
    layoutId: o,
    layout: d,
    alwaysMeasureLayout: !!h || m && Rk(m),
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
function NS(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : NS(t.parent);
}
function kf(t, { forwardMotionProps: a = !1, type: i } = {}, l, o) {
  l && ph(l);
  const d = i ? i === "svg" : fm(t), h = d ? Ek : jk;
  function m(p, b) {
    let v;
    const S = {
      ...y.useContext(om),
      ...p,
      layoutId: Ak(p)
    }, { isStatic: w } = S, j = mk(p), T = h(p, w);
    if (!w && typeof window < "u") {
      Dk();
      const M = zk(S);
      v = M.MeasureLayout, j.visualElement = Mk(t, T, S, o, M.ProjectionNode, d);
    }
    return c.jsxs(Ic.Provider, { value: j, children: [v && j.visualElement ? c.jsx(v, { visualElement: j.visualElement, ...S }) : null, xk(t, p, Tk(T, j.visualElement, b), T, w, a, d)] });
  }
  m.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const g = y.forwardRef(m);
  return g[Nk] = t, g;
}
function Ak({ layoutId: t }) {
  const a = y.useContext(l1).id;
  return a && t !== void 0 ? a + "-" + t : t;
}
function Dk(t, a) {
  y.useContext(cm).strict;
}
function zk(t) {
  const a = xS(), { drag: i, layout: l } = a;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(t) || l?.isEnabled(t) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function kk(t, a) {
  if (typeof Proxy > "u")
    return kf;
  const i = /* @__PURE__ */ new Map(), l = (d, h) => kf(d, h, t, a), o = (d, h) => l(d, h);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? l : (i.has(h) || i.set(h, kf(h, void 0, t, a)), i.get(h))
  });
}
const hm = /* @__PURE__ */ kk(), Ok = (t, a) => a.isSVG ?? fm(t) ? new Pz(a) : new qz(a, {
  allowProjection: t !== y.Fragment
});
class Lk extends is {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(a) {
    super(a), a.animationState || (a.animationState = Wz(a));
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
let Uk = 0;
class Bk extends is {
  constructor() {
    super(...arguments), this.id = Uk++, this.isExitComplete = !1;
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
const $k = {
  animation: {
    Feature: Lk
  },
  exit: {
    Feature: Bk
  }
};
function TS(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
function Eb(t, a, i) {
  const { props: l } = t;
  t.animationState && l.whileHover && t.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, d = l[o];
  d && Pn.postRender(() => d(a, TS(a)));
}
class Vk extends is {
  mount() {
    const { current: a } = this.node;
    a && (this.unmount = xz(a, (i, l) => (Eb(this.node, l, "Start"), (o) => Eb(this.node, o, "End"))));
  }
  unmount() {
  }
}
class Hk extends is {
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
    this.unmount = $c(yb(this.node.current, "focus", () => this.onFocus()), yb(this.node.current, "blur", () => this.onBlur()));
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
  d && Pn.postRender(() => d(a, TS(a)));
}
class qk extends is {
  mount() {
    const { current: a } = this.node;
    if (!a)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = Nz(a, (o, d) => (Nb(this.node, d, "Start"), (h, { success: m }) => Nb(this.node, h, m ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const vh = /* @__PURE__ */ new WeakMap(), Of = /* @__PURE__ */ new WeakMap(), Ik = (t) => {
  const a = vh.get(t.target);
  a && a(t);
}, Fk = (t) => {
  t.forEach(Ik);
};
function Yk({ root: t, ...a }) {
  const i = t || document;
  Of.has(i) || Of.set(i, {});
  const l = Of.get(i), o = JSON.stringify(a);
  return l[o] || (l[o] = new IntersectionObserver(Fk, { root: t, ...a })), l[o];
}
function Gk(t, a, i) {
  const l = Yk(a);
  return vh.set(t, i), l.observe(t), () => {
    vh.delete(t), l.unobserve(t);
  };
}
const Xk = {
  some: 0,
  all: 1
};
class Pk extends is {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: a = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: d } = a, h = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : Xk[o]
    }, m = (g) => {
      const { isIntersecting: p } = g;
      if (this.isInView === p || (this.isInView = p, d && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: b, onViewportLeave: v } = this.node.getProps(), S = p ? b : v;
      S && S(g);
    };
    this.stopObserver = Gk(this.node.current, h, m);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: a, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(Kk(a, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Kk({ viewport: t = {} }, { viewport: a = {} } = {}) {
  return (i) => t[i] !== a[i];
}
const Qk = {
  inView: {
    Feature: Pk
  },
  tap: {
    Feature: qk
  },
  focus: {
    Feature: Hk
  },
  hover: {
    Feature: Vk
  }
}, mm = {
  renderer: Ok,
  ...$k,
  ...Qk
};
function Zk() {
  !im.current && oS();
  const [t] = y.useState(Cc.current);
  return t;
}
const gh = "emotion-tts:trigger-generate", yh = "emotion-tts:run-state";
function Jk() {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(gh));
}
function Wk(t) {
  typeof window > "u" || window.dispatchEvent(new CustomEvent(yh, { detail: t }));
}
function e4(t) {
  return typeof window > "u" ? () => {
  } : (window.addEventListener(gh, t), () => window.removeEventListener(gh, t));
}
function CS(t) {
  if (typeof window > "u") return () => {
  };
  const a = (i) => {
    const l = i.detail;
    l && t(l);
  };
  return window.addEventListener(yh, a), () => window.removeEventListener(yh, a);
}
var t4 = "wksjad0", n4 = "wksjad1", a4 = "wksjad2", r4 = "wksjad3", i4 = "wksjad4", s4 = "wksjad5", l4 = "wksjad6", o4 = "wksjad7", c4 = "wksjad8", u4 = "wksjad9", d4 = "wksjada", f4 = "wksjadb", h4 = "wksjadc", m4 = "wksjadd", p4 = "wksjade", v4 = "wksjadf", g4 = "wksjadg", Lf = "wksjadh", y4 = "wksjadi", b4 = "wksjadj", x4 = "wksjadk", S4 = "wksjadl", w4 = "wksjadm", j4 = "wksjadn";
const bh = 5, E4 = 5e-3;
function RS(t, a = "") {
  return `${va}/deployments/${t}/artifacts${a}`;
}
function N4(t) {
  const [a, i] = y.useState([]), [l, o] = y.useState(!1), [d, h] = y.useState(null), [m, g] = y.useState(0), p = y.useRef(null), b = y.useRef(!1), v = y.useCallback(() => g((S) => S + 1), []);
  return y.useEffect(() => {
    p.current?.abort();
    const S = new AbortController();
    return p.current = S, o(!0), h(null), fetch(`${RS(t)}?limit=${bh}`, {
      headers: { accept: "application/json" },
      signal: S.signal
    }).then(async (w) => {
      if (!w.ok)
        throw new Error(`HTTP ${w.status}`);
      const j = await w.json();
      S.signal.aborted || i(j.artifacts.slice(0, bh));
    }).catch((w) => {
      if (S.signal.aborted) return;
      const j = w instanceof Error ? w.message : "fetch failed";
      h(j);
    }).finally(() => {
      S.signal.aborted || o(!1);
    }), () => S.abort();
  }, [t, m]), y.useEffect(() => CS((S) => {
    const w = b.current;
    b.current = S.busy, w && !S.busy && v();
  }), [v]), { rows: a, loading: l, error: d, refetch: v, tick: m };
}
function T4(t, a) {
  const [i, l] = y.useState(() => /* @__PURE__ */ new Map());
  return y.useEffect(() => {
    let o = !1;
    return Ki(t).then(({ voiceAssets: d }) => {
      if (o) return;
      const h = /* @__PURE__ */ new Map();
      for (const m of d)
        h.set(m.voiceAssetId, m.displayName);
      l(h);
    }).catch(() => {
    }), () => {
      o = !0;
    };
  }, [t, a]), i;
}
function C4({
  deploymentId: t,
  speedFactor: a
}) {
  const { rows: i, loading: l, error: o, refetch: d, tick: h } = N4(t), m = T4(t, h), [g, p] = y.useState(null), b = Zk(), v = y.useCallback(() => {
    p(null), d();
  }, [d]), S = i;
  return !l && !o && S.length === 0 ? null : /* @__PURE__ */ c.jsxs("section", { className: t4, "aria-labelledby": "recent-gen-eyebrow", children: [
    /* @__PURE__ */ c.jsxs("header", { className: n4, children: [
      /* @__PURE__ */ c.jsx("span", { className: a4, id: "recent-gen-eyebrow", children: "Recent generations" }),
      /* @__PURE__ */ c.jsxs("span", { className: r4, children: [
        /* @__PURE__ */ c.jsx("span", { className: i4, children: S.length }),
        /* @__PURE__ */ c.jsxs("span", { className: s4, children: [
          "last ",
          bh
        ] }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: l4,
            onClick: v,
            "aria-label": "Refresh",
            title: "Refresh",
            children: "↻"
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ c.jsx("div", { className: j4, role: "alert", children: o }),
    /* @__PURE__ */ c.jsx(um, { features: mm, strict: !0, children: /* @__PURE__ */ c.jsx("ul", { className: o4, children: /* @__PURE__ */ c.jsx(bS, { initial: !1, children: S.map((w) => {
      const j = g === w.utteranceId, T = RS(
        t,
        `/${w.utteranceId}/download`
      ), M = w.voiceAssetId ? m.get(w.voiceAssetId) ?? null : null;
      return /* @__PURE__ */ c.jsxs(
        hm.li,
        {
          className: c4,
          initial: b ? { opacity: 1 } : { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: b ? { opacity: 0 } : { opacity: 0, y: 6 },
          transition: {
            duration: b ? 0 : 0.18,
            ease: [0.2, 0, 0, 1]
          },
          "data-playing": j || void 0,
          children: [
            /* @__PURE__ */ c.jsxs("div", { className: u4, children: [
              /* @__PURE__ */ c.jsx(
                "button",
                {
                  type: "button",
                  className: d4,
                  onClick: () => p(
                    (N) => N === w.utteranceId ? null : w.utteranceId
                  ),
                  "aria-label": "Preview",
                  "aria-pressed": j,
                  children: j ? "■" : "▶"
                }
              ),
              /* @__PURE__ */ c.jsxs("div", { className: f4, children: [
                /* @__PURE__ */ c.jsxs("div", { className: h4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: m4, children: w.characterDisplay }),
                  /* @__PURE__ */ c.jsx("span", { className: p4, title: w.text, children: w.text })
                ] }),
                /* @__PURE__ */ c.jsxs("div", { className: v4, children: [
                  /* @__PURE__ */ c.jsx("span", { className: g4, children: M4(w.finishedAt) }),
                  M && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Lf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsx("span", { className: y4, children: M })
                  ] }),
                  /* @__PURE__ */ c.jsx("span", { className: Lf, "aria-hidden": "true", children: "·" }),
                  /* @__PURE__ */ c.jsx("span", { className: b4, children: R4(w.durationMs) }),
                  a !== void 0 && Math.abs(a - 1) > E4 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                    /* @__PURE__ */ c.jsx("span", { className: Lf, "aria-hidden": "true", children: "·" }),
                    /* @__PURE__ */ c.jsxs("span", { className: x4, children: [
                      a.toFixed(2),
                      "×"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ c.jsx(
                "a",
                {
                  className: S4,
                  href: T,
                  download: w.filename,
                  "aria-label": `Download ${w.filename}`,
                  title: "Download",
                  children: "↓"
                }
              )
            ] }),
            j && /* @__PURE__ */ c.jsx(
              "audio",
              {
                className: w4,
                src: T,
                controls: !0,
                autoPlay: !0,
                preload: "auto",
                children: /* @__PURE__ */ c.jsx("track", { kind: "captions" })
              }
            )
          ]
        },
        w.utteranceId
      );
    }) }) }) })
  ] });
}
function R4(t) {
  if (t == null || t <= 0) return "—";
  const a = Math.round(t / 1e3), i = Math.floor(a / 60), l = a % 60;
  return i > 0 ? `${i}:${l.toString().padStart(2, "0")}` : `${l}s`;
}
function M4(t) {
  if (!t) return "—";
  const i = Math.floor(Date.now() / 1e3) - t;
  return i < 0 ? "just now" : i < 60 ? `${i}s ago` : i < 3600 ? `${Math.floor(i / 60)}m ago` : i < 86400 ? `${Math.floor(i / 3600)}h ago` : i < 604800 ? `${Math.floor(i / 86400)}d ago` : new Date(t * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function _4(t) {
  return t === window ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop;
}
function MS() {
  const t = [window];
  if (typeof document > "u") return t;
  let a = document.querySelector("emotion-tts-app");
  for (; a; ) {
    const i = window.getComputedStyle(a);
    (/(auto|scroll|overlay)/.test(i.overflowY) || /(auto|scroll|overlay)/.test(i.overflow)) && t.push(a), a = a.parentElement;
  }
  return t;
}
function A4() {
  if (typeof window > "u") return;
  const t = MS();
  for (const a of t)
    a === window ? window.scrollTo({ top: 0, behavior: "smooth" }) : a.scrollTo({ top: 0, behavior: "smooth" });
}
function _S(t) {
  const [a, i] = y.useState(!1);
  return y.useEffect(() => {
    if (typeof window > "u") return;
    const l = MS(), o = () => {
      const h = l.reduce((m, g) => {
        const p = _4(g);
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
const AS = 360;
var D4 = "_1s59p180", z4 = "_1s59p181", k4 = "_1s59p182", O4 = "_1s59p183", L4 = "_1s59p184", U4 = "_1s59p185", B4 = "_1s59p186", $4 = "_1s59p188", V4 = "_1s59p189", Tb = "_1s59p18a", H4 = "_1s59p18c", q4 = "_1s59p18d", I4 = "_1s59p18e", F4 = "_1s59p18f", Y4 = "_1s59p18g", G4 = "_1s59p18i";
function X4(t) {
  const a = jl(), [i, l] = y.useState("idle"), [o, d] = y.useState(null), [h, m] = y.useState(/* @__PURE__ */ new Map()), [g, p] = y.useState(null), [b, v] = y.useState(null), S = y.useRef(null);
  y.useEffect(() => () => {
    S.current?.();
  }, []), y.useEffect(() => {
    Wk({ busy: i === "starting" || i === "running" });
  }, [i]);
  const w = y.useCallback(
    (B) => {
      const Z = B.status;
      (Z === "completed" || Z === "partial") && fn.success(
        Z === "completed" ? "Run complete — open the Artifacts tab to download" : "Partial run — open the Artifacts tab for what was produced",
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
    l("starting"), p(null), m(/* @__PURE__ */ new Map()), v(null);
    try {
      const B = await RT(t.deploymentId, t.createPayload);
      d(B.runId), l("running"), S.current?.(), S.current = By(
        t.deploymentId,
        B.runId,
        (Z) => Cb(
          Z,
          m,
          l,
          (_) => {
            v(_), w(_);
          },
          t.deploymentId,
          B.runId
        ),
        () => l("error")
      );
    } catch (B) {
      l("error"), p(Uf(B));
    }
  }, [t.deploymentId, t.createPayload, w]);
  y.useEffect(() => e4(() => {
    (i === "idle" || i === "terminal" || i === "error") && j();
  }), [i, j]);
  const T = y.useCallback(async () => {
    if (o)
      try {
        await MT(t.deploymentId, o);
      } catch (B) {
        p(Uf(B));
      }
  }, [t.deploymentId, o]), M = Array.from(h.values()).sort((B, Z) => B.globalIndex - Z.globalIndex), N = i === "starting" || i === "running", k = b?.status === "partial", A = M.filter((B) => B.status === "running").length, C = M.filter((B) => B.status === "completed").length, V = i === "starting" || i === "running" || M.length > 0, G = M.filter((B) => B.status === "failed"), ne = (() => {
    if (i !== "terminal" || G.length === 0) return null;
    const B = /* @__PURE__ */ new Map();
    for (const K of G) {
      const le = K.failureCategory ?? "unknown";
      B.set(le, (B.get(le) ?? 0) + 1);
    }
    let Z = "unknown", _ = 0;
    for (const [K, le] of B)
      le > _ && (Z = K, _ = le);
    const J = M.length;
    return { category: Z, count: _, total: J };
  })(), D = {
    missing_voice_mapping: "One or more characters in the script have no voice mapping. Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing: "A mapping points at a voice file that no longer exists on disk. Re-upload the voice in the Mappings editor.",
    synthesis_failed: "IndexTTS2 raised an error during inference. Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled: "Run was cancelled. Click Generate to retry."
  }, I = "Check the run detail page for the per-segment error log.", F = g?.toLowerCase().includes("unmapped") ?? !1, ie = t.diagnostics ?? [], re = ie.find((B) => B.status === "fail"), te = i === "starting" ? "Starting…" : i === "running" ? "Generating…" : "Generate", ce = !t.canGenerate || N || !!re, W = i === "starting" || i === "running", O = W ? "running" : ce ? "blocked" : "idle", U = !_S(AS) || W;
  return /* @__PURE__ */ c.jsxs("div", { className: D4, children: [
    /* @__PURE__ */ c.jsxs("div", { className: z4, children: [
      /* @__PURE__ */ c.jsxs("div", { className: O4, children: [
        /* @__PURE__ */ c.jsxs("span", { className: L4, children: [
          /* @__PURE__ */ c.jsx("span", { className: k4, "aria-hidden": "true", children: "01" }),
          "Pre-flight",
          V && /* @__PURE__ */ c.jsxs("span", { className: Y4, children: [
            /* @__PURE__ */ c.jsx("span", { className: G4, "aria-hidden": "true" }),
            A > 0 ? `${A} in flight` : `${C} done`
          ] })
        ] }),
        ie.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: U4, "aria-label": "Pre-flight checks", children: ie.map((B) => /* @__PURE__ */ c.jsxs("li", { className: B4, children: [
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: $4,
              "data-status": B.status,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: V4, children: B.label }),
          B.detail && /* @__PURE__ */ c.jsx("span", { className: Tb, children: B.detail })
        ] }, B.label)) }) : /* @__PURE__ */ c.jsx("span", { className: Tb, children: "Ready when you are." })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: H4, "data-state": O, children: [
        U ? /* @__PURE__ */ c.jsxs(
          $e,
          {
            variant: "primary",
            size: "sm",
            onClick: j,
            disabled: ce,
            loading: W,
            children: [
              !W && /* @__PURE__ */ c.jsx("span", { className: q4, "aria-hidden": "true", children: "▶" }),
              te
            ]
          }
        ) : /* @__PURE__ */ c.jsxs("span", { className: I4, "aria-hidden": "true", children: [
          "Generate available in toolbar",
          /* @__PURE__ */ c.jsx("span", { className: F4, children: "↑" })
        ] }),
        N && /* @__PURE__ */ c.jsx(
          $e,
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
    g && /* @__PURE__ */ c.jsxs(
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
          /* @__PURE__ */ c.jsx("strong", { children: "Run failed to start" }),
          /* @__PURE__ */ c.jsx("span", { children: g }),
          F && /* @__PURE__ */ c.jsx(
            $e,
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
    ne && /* @__PURE__ */ c.jsxs(zn, { severity: "error", style: { flexDirection: "column", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "Run failed — ",
        ne.count,
        " of ",
        ne.total,
        " segments failed with ",
        /* @__PURE__ */ c.jsx("code", { children: ne.category })
      ] }),
      /* @__PURE__ */ c.jsx("div", { style: { marginTop: 6, fontWeight: 400 }, children: D[ne.category] ?? I })
    ] }),
    b?.exportArtifactRef && // audit-allow: download anchor — Button primitive lacks <a> polymorphic
    /* @__PURE__ */ c.jsx(
      "a",
      {
        href: `/api/v1/extensions/nexus.audio.emotiontts/exports/${b.exportArtifactRef}/download`,
        download: !0,
        className: `${Yx.secondary} ${Gx.md}`,
        style: { textDecoration: "none" },
        children: "Download ZIP"
      }
    ),
    k && b && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("span", { style: { flex: 1 }, children: "Partial run — some segments failed or were cancelled." }),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          disabled: !!re,
          onClick: async () => {
            try {
              const B = await qx(t.deploymentId, b.runId);
              d(B.runId), m(/* @__PURE__ */ new Map()), v(null), l("running"), S.current?.(), S.current = By(
                t.deploymentId,
                B.runId,
                (Z) => Cb(Z, m, l, v, t.deploymentId, B.runId),
                () => l("error")
              );
            } catch (B) {
              p(Uf(B)), l("error");
            }
          },
          children: "Resume run"
        }
      )
    ] }),
    M.length > 0 && /* @__PURE__ */ c.jsxs("table", { className: vR, children: [
      /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "#" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Status" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Duration" }),
        /* @__PURE__ */ c.jsx("th", { className: fr, children: "Failure" })
      ] }) }),
      /* @__PURE__ */ c.jsx("tbody", { children: M.map((B) => /* @__PURE__ */ c.jsxs("tr", { className: gR, children: [
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.globalIndex.toString().padStart(3, "0") }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: /* @__PURE__ */ c.jsx(Zr, { tone: P4(B.status), children: B.status }) }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.durationMs ? `${B.durationMs} ms` : "—" }),
        /* @__PURE__ */ c.jsx("td", { className: fr, children: B.failureCategory ?? "" })
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
        const h = await $h(o, d);
        l(h);
      } catch {
      }
      return;
  }
}
function P4(t) {
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
function Uf(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
var K4 = "pz3uk70", Q4 = "pz3uk71", Z4 = "pz3uk72", J4 = "pz3uk73", W4 = "pz3uk74", eO = "pz3uk75", tO = "pz3uk76", nO = "pz3uk77";
const aO = y.forwardRef(
  function({ checked: a, onChange: i, label: l, hint: o, disabled: d, id: h, className: m, emphasis: g = !1 }, p) {
    const b = (v) => {
      i(v.currentTarget.checked);
    };
    return /* @__PURE__ */ c.jsxs(
      "label",
      {
        className: `${K4} ${g && a ? Q4 : ""} ${m ?? ""}`,
        "data-disabled": d || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              ref: p,
              id: h,
              type: "checkbox",
              className: Z4,
              checked: a,
              onChange: b,
              disabled: d
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: J4, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${W4}`, children: "check" }) }),
          (l || o) && /* @__PURE__ */ c.jsxs("span", { className: eO, children: [
            l && /* @__PURE__ */ c.jsx("span", { className: tO, children: l }),
            o && /* @__PURE__ */ c.jsx("span", { className: nO, children: o })
          ] })
        ]
      }
    );
  }
);
var rO = "xq3iim0", iO = "xq3iim1", sO = "xq3iim2", lO = "xq3iim3", oO = "xq3iim4", cO = "xq3iim5", uO = "xq3iim6", dO = "xq3iim7", fO = "xq3iim8", hO = "xq3iim9", mO = "xq3iima", pO = "xq3iimb", vO = "xq3iimc", gO = "xq3iimd", yO = "xq3iime", bO = "xq3iimf", xO = "xq3iimg", SO = "xq3iimh", wO = "xq3iimi", jO = "xq3iimj", EO = "xq3iimk", Rb = "xq3iiml";
function NO({
  deploymentId: t,
  initialVoiceAssetId: a,
  onChange: i
}) {
  const [l, o] = y.useState([]), [d, h] = y.useState(a), [m, g] = y.useState(!0), [p, b] = y.useState(!1), [v, S] = y.useState(null), [w, j] = y.useState(!1), T = y.useRef(null), M = y.useRef(null);
  y.useEffect(() => {
    let C = !1;
    return g(!0), Ki(t).then(({ voiceAssets: V }) => {
      C || o(V);
    }).catch((V) => {
      C || S(V instanceof Error ? V.message : "Failed to load voices");
    }).finally(() => {
      C || g(!1);
    }), () => {
      C = !0;
    };
  }, [t]), y.useEffect(() => {
    if (!w) return;
    const C = (G) => {
      T.current && (G.target instanceof Node && T.current.contains(G.target) || j(!1));
    }, V = (G) => {
      G.key === "Escape" && (j(!1), M.current?.focus());
    };
    return document.addEventListener("mousedown", C), document.addEventListener("keydown", V), () => {
      document.removeEventListener("mousedown", C), document.removeEventListener("keydown", V);
    };
  }, [w]);
  const N = y.useCallback(
    async (C) => {
      b(!0), S(null);
      const V = d, G = C === d ? null : C;
      h(G), j(!1);
      try {
        await ET(t, G), i?.(G);
      } catch (ne) {
        h(V), S(ne instanceof Error ? ne.message : "Failed to update default voice");
      } finally {
        b(!1);
      }
    },
    [t, i, d]
  ), k = y.useMemo(
    () => l.find((C) => C.voiceAssetId === d) ?? null,
    [l, d]
  ), A = y.useMemo(() => {
    const C = [], V = [];
    for (const G of l)
      G.kind === "speaker" || G.kind === "mixed" ? C.push(G) : V.push(G);
    return { uploaded: C, other: V };
  }, [l]);
  return m ? /* @__PURE__ */ c.jsx("span", { className: Rb, children: "Loading voices…" }) : l.length === 0 ? /* @__PURE__ */ c.jsx("span", { className: Rb, children: "No voices yet. Upload a reference in Mappings to enable Quick mode." }) : /* @__PURE__ */ c.jsxs("div", { ref: T, className: rO, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        ref: M,
        type: "button",
        className: `${iO} ${w ? sO : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": w,
        disabled: p,
        onClick: () => j((C) => !C),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: lO, "aria-hidden": "true", children: /* @__PURE__ */ c.jsx("span", { className: "material-symbols-outlined", children: "graphic_eq" }) }),
          /* @__PURE__ */ c.jsxs("span", { className: oO, children: [
            /* @__PURE__ */ c.jsx("span", { className: cO, children: k ? k.displayName : "Pick a voice" }),
            /* @__PURE__ */ c.jsx("span", { className: uO, children: k ? DS(k) : `${l.length} voice${l.length === 1 ? "" : "s"} in library` })
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: dO, "aria-hidden": "true", children: TO.map((C, V) => /* @__PURE__ */ c.jsx("i", { style: { height: `${C * 100}%` } }, V)) }),
          /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${fO}`, "aria-hidden": "true", children: w ? "expand_less" : "expand_more" })
        ]
      }
    ),
    w && /* @__PURE__ */ c.jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "Quick mode voice",
        className: hO,
        children: [
          /* @__PURE__ */ c.jsx("div", { className: mO, children: /* @__PURE__ */ c.jsx("span", { className: pO, children: "Select voice" }) }),
          v && /* @__PURE__ */ c.jsx("div", { className: vO, role: "alert", children: v }),
          A.uploaded.length > 0 && /* @__PURE__ */ c.jsx(Mb, { label: "Uploaded", children: A.uploaded.map((C) => /* @__PURE__ */ c.jsx(
            _b,
            {
              voice: C,
              selected: d === C.voiceAssetId,
              onSelect: () => void N(C.voiceAssetId)
            },
            C.voiceAssetId
          )) }),
          A.other.length > 0 && /* @__PURE__ */ c.jsx(Mb, { label: "Other", children: A.other.map((C) => /* @__PURE__ */ c.jsx(
            _b,
            {
              voice: C,
              selected: d === C.voiceAssetId,
              onSelect: () => void N(C.voiceAssetId)
            },
            C.voiceAssetId
          )) })
        ]
      }
    )
  ] });
}
function Mb({ label: t, children: a }) {
  return /* @__PURE__ */ c.jsxs("div", { className: gO, children: [
    /* @__PURE__ */ c.jsx("div", { className: yO, children: t }),
    a
  ] });
}
function _b({ voice: t, selected: a, onSelect: i }) {
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      type: "button",
      role: "option",
      "aria-selected": a,
      className: `${bO} ${a ? xO : ""}`,
      onClick: i,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: SO, "aria-hidden": "true" }),
        /* @__PURE__ */ c.jsx("span", { className: wO, children: t.displayName }),
        /* @__PURE__ */ c.jsx("span", { className: jO, children: DS(t) }),
        a && /* @__PURE__ */ c.jsx("span", { className: `material-symbols-outlined ${EO}`, "aria-hidden": "true", children: "check" })
      ]
    }
  );
}
const TO = [0.35, 0.7, 0.5, 0.85, 0.45, 0.6, 0.32, 0.78, 0.4, 0.55, 0.7, 0.36];
function DS(t) {
  const a = [];
  return t.durationMs != null && a.push(CO(t.durationMs)), t.sampleRate != null && a.push(`${(t.sampleRate / 1e3).toFixed(1)} kHz`), t.kind && t.kind !== "speaker" && a.push(t.kind), a.length > 0 ? a.join(" · ") : "—";
}
function CO(t) {
  const a = t / 1e3;
  if (a < 60) return `${a.toFixed(1)}s`;
  const i = Math.floor(a / 60), l = Math.round(a - i * 60);
  return `${i}:${l.toString().padStart(2, "0")}`;
}
const Ab = [
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
function RO(t) {
  const a = jl(), i = y.useRef(null), { tokens: l, attributions: o, unresolved: d, predictedFilenames: h, characterColor: m } = y.useMemo(
    () => _O(t.value, t.outputFormat, t.mappings),
    [t.value, t.outputFormat, t.mappings]
  ), g = (b) => {
    const v = i.current;
    v && (v.scrollTop = b.currentTarget.scrollTop, v.scrollLeft = b.currentTarget.scrollLeft);
  }, p = t.quickMode === !0;
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: p ? dR : oR, children: [
      !p && /* @__PURE__ */ c.jsx("div", { ref: i, className: cR, "aria-hidden": "true", children: l.map((b, v) => MO(b, v, m)) }),
      /* @__PURE__ */ c.jsx(
        "textarea",
        {
          className: p ? fR : uR,
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
    d.length > 0 && /* @__PURE__ */ c.jsxs(zn, { severity: "error", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Unresolved characters:" }),
      " ",
      d.map((b) => /* @__PURE__ */ c.jsxs(
        $e,
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
      /* @__PURE__ */ c.jsx("ul", { className: a0, children: o.map((b) => /* @__PURE__ */ c.jsxs("li", { children: [
        "#",
        b.lineNumber.toString().padStart(3, "0"),
        " [",
        b.character,
        "] ",
        b.text,
        !b.hasMapping && b.character !== "Narrator" && " — unresolved"
      ] }, b.lineNumber)) })
    ] }),
    h.length > 0 && /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx("span", { className: Fi, children: "Predicted filenames" }),
      /* @__PURE__ */ c.jsx("ul", { className: a0, children: h.map((b) => /* @__PURE__ */ c.jsx("li", { children: b }, b)) })
    ] })
  ] });
}
function MO(t, a, i) {
  if (t.kind === "blank")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      t.raw,
      `
`
    ] }, a);
  if (t.kind === "narrator")
    return /* @__PURE__ */ c.jsxs("span", { children: [
      /* @__PURE__ */ c.jsx("span", { className: n0, children: t.raw }),
      `
`
    ] }, a);
  const l = i.get(t.character?.toLowerCase() ?? "") ?? "currentColor", o = t.hasMapping ? t0 : `${t0} ${hR}`;
  return /* @__PURE__ */ c.jsxs("span", { children: [
    /* @__PURE__ */ c.jsxs("span", { className: o, style: { color: l }, children: [
      "[",
      t.character,
      t.override && /* @__PURE__ */ c.jsxs("span", { className: mR, children: [
        "|",
        t.override
      ] }),
      "]"
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: n0, children: [
      " ",
      t.text ?? ""
    ] }),
    `
`
  ] }, a);
}
function _O(t, a, i) {
  const l = /^\[(?<body>[^\]]*)\](?<rest>.*)$/, o = [], d = [], h = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map(), g = [], p = /* @__PURE__ */ new Map();
  let b = 0;
  const v = t.split(/\r?\n/);
  let S = 0;
  return v.forEach((w, j) => {
    const T = w.trim();
    if (!T) {
      o.push({ kind: "blank", raw: w });
      return;
    }
    const M = j + 1, N = T.match(l);
    let k = "Narrator", A = T, C, V = !1;
    if (N?.groups) {
      V = !0;
      const I = (N.groups.body ?? "").trim(), F = (N.groups.rest ?? "").trim();
      k = ((I.split("|")[0] ?? "").split(":")[0] ?? "").trim() || "Narrator", C = (I.includes("|") ? I.slice(I.indexOf("|") + 1) : "").trim() || void 0, A = F;
    }
    S += 1;
    const G = k.toLowerCase(), ne = (m.get(G) ?? 0) + 1;
    m.set(G, ne);
    const D = k === "Narrator" || i.has(G);
    if (D || h.add(k), k !== "Narrator" && !p.has(G) && (p.set(G, Ab[b % Ab.length] ?? "currentColor"), b += 1), V) {
      const I = { kind: "character", raw: w, character: k, text: A, hasMapping: D };
      C !== void 0 && (I.override = C), o.push(I);
    } else
      o.push({ kind: "narrator", raw: w });
    d.push({ lineNumber: M, character: k, text: A, hasMapping: D }), g.push(
      `${S.toString().padStart(3, "0")}_${AO(k)}_${ne.toString().padStart(3, "0")}.${a}`
    );
  }), {
    tokens: o,
    attributions: d,
    unresolved: Array.from(h),
    predictedFilenames: g,
    characterColor: p
  };
}
function AO(t) {
  const a = t.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return a.length === 0 ? "Narrator" : a.slice(0, 48);
}
var DO = "_5o8xvy0", zO = "_5o8xvy1", kO = "_5o8xvy2", OO = "_5o8xvy3", Bf = "_5o8xvy4", LO = "_3f2ar0", UO = "_3f2ar1", BO = "_3f2ar2", $O = "_3f2ar3", VO = "_3f2ar4", HO = "_3f2ar6", nl = "_3f2ar7", al = "_3f2ar8", rl = "_3f2ar9", Db = "_3f2ara", zb = "_3f2arb";
function qO({ label: t, glyph: a = "?", children: i }) {
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
  }, [l, g]), /* @__PURE__ */ c.jsxs("span", { ref: d, className: LO, children: [
    /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        id: h,
        className: UO,
        "aria-expanded": l,
        "aria-controls": m,
        onClick: () => o((p) => !p),
        children: [
          /* @__PURE__ */ c.jsx("span", { className: BO, "aria-hidden": "true", children: a }),
          t
        ]
      }
    ),
    l && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: m,
        role: "dialog",
        "aria-labelledby": h,
        className: $O,
        children: i
      }
    )
  ] });
}
var IO = "_1dxb1dg0", kb = "_1dxb1dg1", FO = "_1dxb1dg2", YO = "_1dxb1dg3", GO = "_1dxb1dg4";
function XO() {
  return /* @__PURE__ */ c.jsxs(qO, { label: "Syntax", glyph: "?", children: [
    /* @__PURE__ */ c.jsx("h3", { className: VO, children: "Script syntax" }),
    /* @__PURE__ */ c.jsxs("ul", { className: HO, children: [
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char] line text" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Plain line — uses the speaker's mapped voice." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|emotion_vector:happy=0.7]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Per-line 8-axis emotion override. Combine axes with commas." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|qwen:Friendly teen]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Send a free-text mood prompt — the Qwen helper turns it into an emotion vector." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|preset:Bittersweet]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Apply a saved preset by name." })
      ] }),
      /* @__PURE__ */ c.jsxs("li", { className: nl, children: [
        /* @__PURE__ */ c.jsx("code", { className: al, children: "[Char|audio:slow_breath.wav]" }),
        /* @__PURE__ */ c.jsx("span", { className: rl, children: "Use a reference audio clip as the emotion source." })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Db, children: [
      /* @__PURE__ */ c.jsx("span", { className: zb, children: "Quick mode" }),
      ": when enabled no [Char] tags are required — every line uses the deployment's default voice. Toggle it above the editor."
    ] }),
    /* @__PURE__ */ c.jsxs("p", { className: Db, children: [
      /* @__PURE__ */ c.jsx("span", { className: zb, children: "Mappings" }),
      ": assign characters to voices in the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning."
    ] })
  ] });
}
function PO() {
  return /* @__PURE__ */ c.jsxs("ul", { className: IO, children: [
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: kb, children: "[Char]" }),
      " plain line"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: kb, children: "[Char|emotion_vector:happy=0.7]" }),
      " per-line vector"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: FO, children: "[Char|qwen:warm]" }),
      " AI prompt mapping"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: YO, children: "[Char|preset:Bittersweet]" }),
      " saved preset"
    ] }),
    /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("code", { className: GO, children: "[Char|audio:slow_breath.wav]" }),
      " audio reference"
    ] })
  ] });
}
function KO({
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
  return /* @__PURE__ */ c.jsxs("div", { className: DO, children: [
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `${zO} ${t ? kO : ""}`,
        "data-quick-on": t || void 0,
        children: [
          /* @__PURE__ */ c.jsx(
            aO,
            {
              checked: t,
              onChange: a,
              emphasis: !0,
              label: "Quick mode",
              hint: "single voice · plain prose · no character syntax"
            }
          ),
          t && /* @__PURE__ */ c.jsx(
            NO,
            {
              deploymentId: i.deploymentId,
              initialVoiceAssetId: m,
              onChange: g
            }
          ),
          /* @__PURE__ */ c.jsxs("div", { className: OO, "aria-live": "polite", children: [
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Bf, children: p.toString().padStart(3, "0") }),
              " ",
              "chars"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Bf, children: v.toString().padStart(2, "0") }),
              " ",
              "lines"
            ] }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              /* @__PURE__ */ c.jsx("strong", { className: Bf, children: b.toString().padStart(3, "0") }),
              " ",
              "words"
            ] }),
            /* @__PURE__ */ c.jsx(XO, {})
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx(
      RO,
      {
        value: l,
        onChange: o,
        outputFormat: d,
        mappings: h,
        deploymentId: i.deploymentId,
        quickMode: t
      }
    ),
    !t && /* @__PURE__ */ c.jsx(PO, {})
  ] });
}
function QO({
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
const $f = [
  "#ba9eff",
  "#9093ff",
  "#ff8439",
  "#22c55e",
  "#ffd34a",
  "#ff7aa8"
], ZO = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;
function JO(t) {
  const a = [];
  if (!t) return a;
  const i = t.split(/\r?\n/);
  for (let l = 0; l < i.length; l += 1) {
    const d = (i[l] ?? "").trim();
    if (d.length === 0) continue;
    const h = d.match(ZO);
    if (!h || !h.groups) {
      a.push({ idx: l, character: null, text: d, override: null });
      continue;
    }
    const m = h.groups.body ?? "", g = (h.groups.rest ?? "").trim(), [p = "", ...b] = m.split("|"), v = p.trim();
    if (!v) {
      a.push({ idx: l, character: null, text: g || d, override: null });
      continue;
    }
    const S = v.split(":")[0]?.trim() || null, w = b.join("|").trim(), j = w ? WO(w) : null;
    a.push({
      idx: l,
      character: S,
      text: g,
      override: j
    });
  }
  return a;
}
function WO(t) {
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
function e6(t) {
  const a = /* @__PURE__ */ new Set(), i = [];
  for (const l of t) {
    if (!l.character) continue;
    const o = l.character.toLowerCase();
    a.has(o) || (a.add(o), i.push(l.character));
  }
  return i;
}
function t6(t) {
  const a = {};
  for (let i = 0; i < t.length; i += 1) {
    const l = t[i];
    l && (a[l] = $f[i % $f.length] ?? $f[0]);
  }
  return a;
}
function n6(t) {
  const a = {};
  for (const i of t)
    i.character && (a[i.character] = (a[i.character] ?? 0) + 1);
  return a;
}
var a6 = "_1snzz30", r6 = "_1snzz31", i6 = "_1snzz33", s6 = "_1snzz34", l6 = "_1snzz36", Ob = "_1snzz3b", Lb = "_1snzz3c", Ub = "_1snzz3d";
const o6 = "ext-action-invoke", c6 = "emotion-tts.run";
function u6() {
  if (typeof document > "u") return !1;
  const t = document.querySelector("emotion-tts-app");
  return t ? (t.dispatchEvent(
    new CustomEvent(o6, {
      detail: { id: c6 },
      bubbles: !1
    })
  ), !0) : !1;
}
const d6 = 4e3;
function f6({ visible: t, canGenerate: a }) {
  const [i, l] = y.useState(null), [o, d] = y.useState(!1), [h, m] = y.useState(!1), g = y.useRef(null);
  y.useEffect(() => {
    let R = !1;
    const U = async () => {
      try {
        const Z = await bc();
        R || (g.current = Z, l(Z));
      } catch {
      }
    };
    U();
    const B = window.setInterval(U, d6);
    return () => {
      R = !0, window.clearInterval(B);
    };
  }, []), y.useEffect(() => CS((R) => {
    m(!!R.busy);
  }), []);
  const p = y.useCallback(() => {
    Jk();
  }, []), b = i?.badge ?? "not_installed", v = b === "ready" || b === "running", S = b === "starting" || b === "installing" || b === "stopping", w = v;
  y.useEffect(() => {
    o && (S || v) && d(!1);
  }, [o, S, v]);
  const j = y.useCallback(() => {
    d(!0), u6();
  }, []), T = v ? "Stop runtime" : S ? "Runtime starting…" : "Start runtime", M = o || S, N = o || S, k = N ? "transitioning" : v ? "running" : "stopped", A = !a || h || !w, C = w ? a ? h ? "Generating…" : "Generate" : "Add a script to generate" : "Start runtime to generate", V = w && a && !h, G = v ? "ready" : S || o ? "busy" : "off", ne = v ? "Runtime ready" : S ? "Starting…" : o ? "Working…" : "Runtime off", D = G === "busy";
  if (typeof document > "u") return /* @__PURE__ */ c.jsx(c.Fragment, {});
  const I = "rgba(28, 30, 34, 0.94)", F = "#ba9eff", ie = "#8455ef", re = "#1a0a3a", te = "#f0f0f3", ce = "#aaabae", W = "#22c55e", O = v ? "◼" : "⏻";
  return Vh.createPortal(
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: a6,
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
              className: r6,
              "data-tone": G,
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
                color: G === "ready" ? W : G === "busy" ? F : ce,
                background: "rgba(255, 255, 255, 0.04)",
                boxShadow: `inset 0 0 0 1px ${G === "ready" ? "rgba(34, 197, 94, 0.4)" : G === "busy" ? "rgba(186, 158, 255, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                whiteSpace: "nowrap"
              },
              children: [
                /* @__PURE__ */ c.jsx(
                  "span",
                  {
                    className: i6,
                    "data-pulse": D ? "true" : "false",
                    "aria-hidden": "true",
                    style: {
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "currentColor",
                      boxShadow: G === "ready" ? `0 0 8px ${W}` : G === "busy" ? `0 0 8px ${F}` : "none",
                      flexShrink: 0
                    }
                  }
                ),
                ne
              ]
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: Lb, children: [
            /* @__PURE__ */ c.jsx(
              "button",
              {
                type: "button",
                className: s6,
                "data-state": k,
                onClick: j,
                disabled: M,
                "aria-label": T,
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
                  cursor: M ? "not-allowed" : "pointer",
                  opacity: M ? 0.6 : 1,
                  boxShadow: `inset 0 0 0 1px ${k === "running" ? "rgba(34, 197, 94, 0.42)" : "rgba(255, 255, 255, 0.08)"}`,
                  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease"
                },
                children: N ? /* @__PURE__ */ c.jsx("span", { className: Ob, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: O })
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Ub, role: "tooltip", children: T })
          ] }),
          /* @__PURE__ */ c.jsxs("span", { className: Lb, children: [
            /* @__PURE__ */ c.jsxs(
              "button",
              {
                type: "button",
                className: l6,
                "data-ready": V ? "true" : "false",
                onClick: p,
                disabled: A,
                "aria-label": C,
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingInline: "18px",
                  height: "36px",
                  border: "none",
                  borderRadius: "999px",
                  background: A ? "rgba(186, 158, 255, 0.18)" : `linear-gradient(180deg, ${F} 0%, ${ie} 100%)`,
                  color: A ? ce : re,
                  fontFamily: 'var(--font-ui, "Inter", system-ui, -apple-system, sans-serif)',
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: A ? "not-allowed" : "pointer",
                  boxShadow: A ? "none" : "0 6px 20px -6px rgba(132, 85, 239, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
                  transition: "transform 160ms ease, box-shadow 160ms ease, color 160ms ease",
                  whiteSpace: "nowrap"
                },
                children: [
                  h ? /* @__PURE__ */ c.jsx("span", { className: Ob, "aria-hidden": "true" }) : /* @__PURE__ */ c.jsx("span", { style: { fontSize: "11px" }, "aria-hidden": "true", children: "▶" }),
                  /* @__PURE__ */ c.jsx("span", { children: h ? "Running" : "Generate" })
                ]
              }
            ),
            /* @__PURE__ */ c.jsx("span", { className: Ub, role: "tooltip", children: C })
          ] })
        ]
      }
    ),
    document.body
  );
}
function h6(t) {
  const a = t.workflowCustomised ?? !1, i = t.unmappableFields ?? [], l = m6(t.deployment.displayName, t.deployment.deploymentId), o = _S(AS), d = t.canGenerate ?? !1;
  return /* @__PURE__ */ c.jsxs("div", { className: qC, children: [
    /* @__PURE__ */ c.jsxs("header", { className: IC, children: [
      /* @__PURE__ */ c.jsx("div", { className: YC, children: "EmotionTTS · Recipe Studio" }),
      /* @__PURE__ */ c.jsx("div", { className: FC, children: /* @__PURE__ */ c.jsx("h1", { className: GC, children: l }) }),
      /* @__PURE__ */ c.jsx("p", { className: XC, children: "Author the script, cast the voices, sculpt the emotion, and modulate every utterance — all from a single screen, with cache-bound previews and a non-destructive edit chain." }),
      t.hero
    ] }),
    a && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Workflow customised." }),
      " ",
      i.length === 0 ? "Every recipe field still binds, but the graph topology diverges from the curated template." : `These fields are now managed in the graph: ${i.join(", ")}.`,
      " ",
      /* @__PURE__ */ c.jsx("a", { href: "/#/workflows", target: "_top", children: "Open workflow canvas →" })
    ] }),
    t.quickActions && /* @__PURE__ */ c.jsx("div", { className: rR, "aria-label": "Quick actions", children: t.quickActions }),
    t.recentGenerations,
    /* @__PURE__ */ c.jsxs("div", { className: PC, children: [
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "01",
          title: "Script",
          id: "recipe-section-script",
          variant: "default",
          children: t.scriptSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "02",
          title: "Parsed dialogue",
          id: "recipe-section-parsed",
          variant: "default",
          children: t.parsedDialogueSection
        }
      ),
      t.voiceLibrarySection && /* @__PURE__ */ c.jsx(
        hr,
        {
          number: "03",
          title: "Voice library",
          id: "recipe-section-voice-library",
          variant: "default",
          children: t.voiceLibrarySection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "04" : "03",
          title: "Cast",
          id: "recipe-section-cast",
          variant: "default",
          children: t.castSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "05" : "04",
          title: "Emotion",
          id: "recipe-section-emotion",
          variant: "split",
          children: t.emotionSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "06" : "05",
          title: "Performance",
          id: "recipe-section-performance",
          variant: "default",
          children: t.performanceSection
        }
      ),
      /* @__PURE__ */ c.jsx(
        hr,
        {
          number: t.voiceLibrarySection ? "07" : "06",
          title: "Recent runs",
          id: "recipe-section-runs",
          variant: "default",
          children: t.recentRunsSection
        }
      ),
      t.auditSection && /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(f6, { visible: o, canGenerate: d }),
    typeof document < "u" && Vh.createPortal(
      /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: iR,
          "data-visible": o ? "true" : "false",
          "aria-label": "Scroll to top",
          title: "Scroll to top",
          onClick: A4,
          children: "↑"
        }
      ),
      document.body
    )
  ] });
}
function m6(t, a) {
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
  return /* @__PURE__ */ c.jsxs("section", { className: KC, "aria-labelledby": i, children: [
    /* @__PURE__ */ c.jsx("header", { className: QC, children: /* @__PURE__ */ c.jsxs(
      "button",
      {
        type: "button",
        className: WC,
        "aria-expanded": !h,
        "aria-controls": g,
        onClick: () => m((p) => !p),
        children: [
          /* @__PURE__ */ c.jsxs("span", { className: ZC, children: [
            /* @__PURE__ */ c.jsx("span", { className: eR, children: t }),
            /* @__PURE__ */ c.jsx("span", { className: tR, "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ c.jsx("span", { className: nR, children: a })
          ] }),
          /* @__PURE__ */ c.jsx("h2", { id: i, className: JC, children: a }),
          /* @__PURE__ */ c.jsx(
            "span",
            {
              className: aR,
              "data-collapsed": h ? "true" : "false",
              "aria-hidden": "true",
              children: "▾"
            }
          )
        ]
      }
    ) }),
    !h && /* @__PURE__ */ c.jsx(
      "div",
      {
        id: g,
        className: l === "split" ? lR : sR,
        children: d
      }
    )
  ] });
}
const _n = {
  success(t) {
    fn.success(t);
  },
  error(t) {
    fn.error(t);
  }
}, xh = "__recipe";
function p6(t) {
  try {
    const a = JSON.parse(t);
    return typeof a == "object" && a !== null ? a : {};
  } catch {
    return {};
  }
}
function v6(t) {
  const a = {};
  for (const i of Object.keys(t))
    i !== xh && (a[i] = t[i]);
  return a;
}
function g6() {
  const { deployment: t, mappings: a, runs: i, workflow: l } = Nl(), [o, d] = y.useState(a), [h, m] = y.useState([]), [g, p] = y.useState([]), [b, v] = y.useState(null), [S, w] = y.useState(Uc), j = y.useMemo(
    () => t.defaultGenerationOverridesJson ? p6(t.defaultGenerationOverridesJson) : {},
    [t.defaultGenerationOverridesJson]
  ), T = y.useMemo(() => {
    const he = j[xh];
    return typeof he == "object" && he !== null ? he : {};
  }, [j]), [M, N] = y.useState(""), [k, A] = y.useState(
    t.defaultOutputFormat ?? "mp3"
  ), [C, V] = y.useState(t.defaultSpeedFactor ?? 1), [G, ne] = y.useState({
    mode: "none",
    emotionAlpha: 1
  }), [D, I] = y.useState(() => ({
    temperature: 0.8,
    top_p: 0.8,
    seed: 42,
    ...v6(j)
  })), [F, ie] = y.useState(() => {
    const he = T.cachePolicy;
    return he === "use_cache" || he === "force_regenerate" || he === "read_only_cache" ? he : "use_cache";
  }), [re, te] = y.useState(
    t.defaultVoiceAssetId ?? null
  ), [ce, W] = y.useState(() => {
    const he = T.quickMode;
    return typeof he == "boolean" ? he : t.defaultVoiceAssetId != null;
  }), [O, R] = y.useState(L3);
  y.useEffect(() => {
    let he = !1;
    return Ki(t.deploymentId).then((Oe) => {
      he || m(Oe.voiceAssets);
    }).catch(() => {
    }), Xx(t.deploymentId).then((Oe) => {
      he || p(Oe.presets);
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
      const Oe = {
        ...D,
        [xh]: {
          quickMode: ce,
          cachePolicy: F
        }
      };
      ht(`/deployments/${t.deploymentId}`, {
        method: "PATCH",
        body: JSON.stringify({
          defaultOutputFormat: k,
          defaultSpeedFactor: C,
          defaultGenerationOverrides: Oe
        })
      }).catch(() => {
      });
    }, 600);
    return () => window.clearTimeout(he);
  }, [
    t.deploymentId,
    k,
    C,
    F,
    ce,
    D
  ]);
  const B = y.useMemo(() => JO(M), [M]), Z = y.useMemo(() => e6(B), [B]), _ = y.useMemo(() => t6(Z), [Z]), J = y.useMemo(() => n6(B), [B]), K = y.useMemo(() => {
    const he = /* @__PURE__ */ new Map();
    for (const Oe of o)
      he.set(Oe.characterName.toLowerCase(), Oe);
    return he;
  }, [o]), le = y.useMemo(() => ce && re ? 0 : Z.filter((he) => !K.has(he.toLowerCase())).length, [Z, K, ce, re]), fe = y.useCallback(
    async (he, Oe) => {
      const De = K.get(he.toLowerCase());
      try {
        if (De) {
          const Te = await ul(t.deploymentId, De.mappingId, Oe);
          d(
            (bt) => bt.map((xt) => xt.mappingId === Te.mappingId ? Te : xt)
          ), _n.success(`Updated mapping for ${he}`);
        } else if (Oe.speakerVoiceAssetId) {
          const Te = await Bh(t.deploymentId, {
            ...Oe,
            characterName: he,
            speakerVoiceAssetId: Oe.speakerVoiceAssetId
          });
          d((bt) => [...bt, Te]), _n.success(`Mapped ${he} to voice`);
        }
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "mapping failed");
      }
    },
    [K, t.deploymentId]
  ), ge = y.useCallback(
    async (he) => {
      const Oe = K.get(he.toLowerCase());
      if (Oe)
        try {
          await Hx(t.deploymentId, Oe.mappingId), d((De) => De.filter((Te) => Te.mappingId !== Oe.mappingId)), _n.success(`Cleared mapping for ${he}`);
        } catch (De) {
          _n.error(De instanceof Error ? De.message : "clear failed");
        }
    },
    [K, t.deploymentId]
  ), Ae = y.useCallback(
    async (he, Oe) => {
      try {
        const De = await yc(
          t.deploymentId,
          Oe,
          Oe.name.replace(/\.[^.]+$/, ""),
          "speaker"
        );
        m((Te) => [De, ...Te]), await fe(he, { speakerVoiceAssetId: De.voiceAssetId });
      } catch (De) {
        _n.error(De instanceof Error ? De.message : "upload failed");
      }
    },
    [t.deploymentId, fe]
  ), Me = y.useCallback((he) => {
    w(he);
  }, []), Ve = y.useMemo(() => {
    const he = [], Oe = /* @__PURE__ */ new Set();
    for (const De of o) {
      const Te = De.speakerVoiceAssetId;
      if (!Te || Oe.has(Te)) continue;
      Oe.add(Te);
      const xt = h.find((un) => un.voiceAssetId === Te)?.displayName ?? `${De.characterName} · ${Te.slice(0, 8)}`;
      he.push({ kind: "voice_asset", id: Te, label: xt });
    }
    for (const De of h)
      Oe.has(De.voiceAssetId) || (Oe.add(De.voiceAssetId), he.push({ kind: "voice_asset", id: De.voiceAssetId, label: De.displayName }));
    return he;
  }, [o, h]), Zt = y.useCallback(
    async (he, Oe) => {
      if (he.kind !== "voice_asset") {
        _n.error("Targeted revert is only supported for voice assets in v1.");
        return;
      }
      let De;
      try {
        const Te = JSON.parse(Oe);
        if (typeof Te != "object" || Te === null || Te.version !== 1 || !Array.isArray(Te.ops))
          throw new Error("snapshot is not a valid EditChain");
        De = Te;
      } catch (Te) {
        _n.error(
          Te instanceof Error ? `Audit snapshot is malformed: ${Te.message}` : "Audit snapshot is malformed; cannot revert."
        );
        return;
      }
      try {
        const Te = await Ix(he.id, t.deploymentId, {
          chain: De
        }), bt = o.filter((xt) => xt.speakerVoiceAssetId === he.id);
        await Promise.all(
          bt.map(
            (xt) => ul(t.deploymentId, xt.mappingId, {
              voiceAssetChainDigest: Te.chain_digest
            }).catch(() => null)
          )
        ), d(
          (xt) => xt.map(
            (un) => un.speakerVoiceAssetId === he.id ? { ...un, voiceAssetChainDigest: Te.chain_digest } : un
          )
        ), _n.success(`Reverted ${he.label} to a prior chain`);
      } catch (Te) {
        _n.error(Te instanceof Error ? Te.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), Pt = y.useCallback(
    async (he) => {
      if (he.kind !== "voice_asset") {
        _n.error("Revert is only supported for voice assets in v1.");
        return;
      }
      try {
        await BC(he.id, t.deploymentId);
        const Oe = o.filter((De) => De.speakerVoiceAssetId === he.id);
        await Promise.all(
          Oe.map(
            (De) => ul(t.deploymentId, De.mappingId, {
              voiceAssetChainDigest: null
            }).catch(() => null)
          )
        ), d(
          (De) => De.map(
            (Te) => Te.speakerVoiceAssetId === he.id ? { ...Te, voiceAssetChainDigest: null } : Te
          )
        ), _n.success(`Cleared edit chain on ${he.label}`);
      } catch (Oe) {
        _n.error(Oe instanceof Error ? Oe.message : "revert failed");
      }
    },
    [t.deploymentId, o]
  ), At = y.useMemo(
    () => ({
      script: M,
      parserMode: ce ? "raw_text" : "dialogue",
      outputFormat: k,
      speedFactor: C,
      globalEmotion: { ...G, emotionAlpha: O.intensity },
      generation: D,
      cachePolicy: F
    }),
    [M, ce, k, C, O.intensity, G, D, F]
  ), et = y.useMemo(
    () => QO({
      script: M,
      quickMode: ce,
      defaultVoiceAssetId: re,
      characters: Z,
      unmappedCount: le,
      globalEmotion: G,
      performance: O
    }),
    [M, ce, re, Z, le, G, O]
  ), pt = y.useMemo(
    () => et.filter((he) => he.id !== "performance").map((he) => ({
      label: he.label,
      status: he.status === "ok" ? "ok" : he.status === "warn" ? "warn" : "fail",
      detail: he.detail
    })),
    [et]
  );
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(LC, { position: "bottom-right", richColors: !0, theme: "dark" }),
    /* @__PURE__ */ c.jsx(
      h6,
      {
        deployment: t,
        canGenerate: M.trim().length > 0,
        workflowCustomised: l.workflow.customised,
        unmappableFields: l.unmappableFields,
        hero: /* @__PURE__ */ c.jsx(u_, { deployment: t }),
        quickActions: /* @__PURE__ */ c.jsx(
          X4,
          {
            deploymentId: t.deploymentId,
            createPayload: At,
            canGenerate: M.trim().length > 0,
            diagnostics: pt
          }
        ),
        recentGenerations: /* @__PURE__ */ c.jsx(
          C4,
          {
            deploymentId: t.deploymentId,
            speedFactor: C
          }
        ),
        scriptSection: /* @__PURE__ */ c.jsx(
          KO,
          {
            quickMode: ce,
            onToggleQuickMode: W,
            deployment: t,
            script: M,
            onScriptChange: N,
            outputFormat: k,
            mappingsByLower: K,
            defaultVoiceAssetId: re,
            onDefaultVoiceAssetIdChange: te
          }
        ),
        parsedDialogueSection: /* @__PURE__ */ c.jsx(C3, { lines: B, characterColors: _ }),
        voiceLibrarySection: /* @__PURE__ */ c.jsx(
          wM,
          {
            deploymentId: t.deploymentId,
            voiceAssets: h,
            mappings: o,
            characterColors: _,
            onVoiceAssetsChange: m
          }
        ),
        castSection: /* @__PURE__ */ c.jsx(r_, { unmappedCount: le, totalCount: Z.length, children: Z.map((he) => {
          const Oe = K.get(he.toLowerCase()) ?? null, De = _[he] ?? "#ba9eff";
          return /* @__PURE__ */ c.jsx("li", { className: yR, children: /* @__PURE__ */ c.jsx(
            a_,
            {
              characterName: he,
              color: De,
              lineCount: J[he] ?? 0,
              mapping: Oe,
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
        emotionSection: /* @__PURE__ */ c.jsx(
          W2,
          {
            value: G,
            onChange: ne,
            deploymentId: t.deploymentId
          }
        ),
        performanceSection: /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx(
            U3,
            {
              value: { ...O, pace: C },
              onChange: (he) => {
                R(he), he.pace !== C && V(he.pace);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(
            Ih,
            {
              state: S,
              onChange: Me,
              supportsSynthSpeed: !1
            }
          ),
          /* @__PURE__ */ c.jsx(P3, { checks: et }),
          /* @__PURE__ */ c.jsx(
            g3,
            {
              outputFormat: k,
              onOutputFormatChange: A,
              speedFactor: C,
              onSpeedFactorChange: V,
              cachePolicy: F,
              onCachePolicyChange: ie,
              generation: D,
              onGenerationChange: I
            }
          )
        ] }),
        recentRunsSection: /* @__PURE__ */ c.jsx(tD, { runs: i, deploymentId: t.deploymentId }),
        auditSection: /* @__PURE__ */ c.jsx(
          BM,
          {
            deploymentId: t.deploymentId,
            targets: Ve,
            onRevertToIdentity: Pt,
            onRevertToChain: Zt
          }
        )
      }
    )
  ] });
}
const Bb = /* @__PURE__ */ new Map();
function y6(t, a) {
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
    const o = `${t}::${a}`, d = Bb.get(o);
    if (d) {
      l({ peaks: d, isLoading: !1, error: null });
      return;
    }
    const h = new AbortController();
    return l({ peaks: null, isLoading: !0, error: null }), b6(t, a, h.signal).then((m) => {
      h.signal.aborted || (Bb.set(o, m), l({ peaks: m, isLoading: !1, error: null }));
    }).catch((m) => {
      if (h.signal.aborted) return;
      const g = m instanceof Error ? m.message : "decode failed";
      l({ peaks: null, isLoading: !1, error: g });
    }), () => h.abort();
  }, [t, a]), i;
}
async function b6(t, a, i) {
  const l = await fetch(t, { signal: i });
  if (!l.ok) throw new Error(`failed to load audio (${l.status})`);
  const o = await l.arrayBuffer();
  if (i.aborted) throw new DOMException("aborted", "AbortError");
  const h = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(o.slice(0));
  return x6(h, a);
}
function x6(t, a) {
  const i = t.numberOfChannels, l = t.length, o = Math.max(1, Math.floor(l / a)), d = new Float32Array(a), h = [];
  for (let m = 0; m < i; m += 1) h.push(t.getChannelData(m));
  for (let m = 0; m < a; m += 1) {
    const g = m * o, p = Math.min(l, g + o);
    let b = 0;
    for (let v = g; v < p; v += 1) {
      let S = 0;
      for (let j = 0; j < i; j += 1) {
        const T = h[j];
        T && (S += Math.abs(T[v] ?? 0));
      }
      const w = S / i;
      w > b && (b = w);
    }
    d[m] = b;
  }
  return d;
}
const $b = "(prefers-reduced-motion: reduce)";
function S6() {
  const [t, a] = y.useState(() => typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia($b).matches);
  return y.useEffect(() => {
    if (typeof window > "u" || typeof window.matchMedia != "function")
      return;
    const i = window.matchMedia($b), l = (o) => a(o.matches);
    return i.addEventListener("change", l), () => i.removeEventListener("change", l);
  }, []), t;
}
var w6 = "mquzal0", j6 = "mquzal1", Vb = "mquzal2", Hb = "mquzal3", qb = "mquzal4", E6 = "mquzal5", Ib = "mquzal6", Fb = "mquzal7";
const N6 = 120, T6 = 720;
function zS(t) {
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
    width: b = T6,
    height: v = N6
  } = t, S = y.useRef(null), w = y.useRef(null), j = y.useRef(null), T = y6(a, b), M = S6();
  y.useEffect(() => {
    C6(S.current, T.peaks, b, v);
  }, [T.peaks, b, v]);
  const N = y.useCallback(
    (D) => {
      const I = w.current?.getBoundingClientRect();
      if (!I || I.width <= 0) return 0;
      const F = Math.max(0, Math.min(1, (D - I.left) / I.width));
      return Math.round(F * i);
    },
    [i]
  );
  y.useEffect(() => {
    const D = (F) => {
      if (!j.current) return;
      const ie = N(F.clientX);
      j.current === "start" ? d(tc(ie, 0, o - 1)) : h(tc(ie, l + 1, i));
    }, I = () => {
      j.current = null;
    };
    return window.addEventListener("pointermove", D), window.addEventListener("pointerup", I), () => {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", I);
    };
  }, [N, i, o, l, d, h]);
  const k = (D) => (I) => {
    I.preventDefault(), I.stopPropagation(), j.current = D;
  }, A = (D) => {
    !p || D.target.closest("[data-handle]") || p(N(D.clientX));
  }, C = (D) => (I) => {
    const F = I.shiftKey ? 100 : I.ctrlKey ? 1 : 10;
    let ie = 0;
    if (I.key === "ArrowLeft") ie = -F;
    else if (I.key === "ArrowRight") ie = F;
    else return;
    I.preventDefault(), D === "start" ? d(tc(l + ie, 0, o - 1)) : h(tc(o + ie, l + 1, i));
  }, V = Vf(l, i), G = Vf(o, i), ne = Vf(g, i);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      ref: w,
      className: w6,
      style: { height: v },
      onPointerDown: A,
      children: [
        /* @__PURE__ */ c.jsx(
          "canvas",
          {
            ref: S,
            width: b,
            height: v,
            className: j6,
            "aria-label": "Audio waveform"
          }
        ),
        T.isLoading && /* @__PURE__ */ c.jsx("div", { className: Fb, children: "Decoding waveform…" }),
        T.error && /* @__PURE__ */ c.jsx("div", { className: Fb, role: "alert", children: T.error }),
        /* @__PURE__ */ c.jsx("div", { className: Ib, style: { left: 0, width: `${V}%` } }),
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: Ib,
            style: { left: `${G}%`, right: 0, width: `${100 - G}%` }
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Vb,
            style: { left: `${V}%` },
            role: "slider",
            "aria-label": "Region start",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": l,
            tabIndex: 0,
            onPointerDown: k("start"),
            onKeyDown: C("start"),
            "data-handle": "start",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Hb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: qb, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: Vb,
            style: { left: `${G}%` },
            role: "slider",
            "aria-label": "Region end",
            "aria-valuemin": 0,
            "aria-valuemax": i,
            "aria-valuenow": o,
            tabIndex: 0,
            onPointerDown: k("end"),
            onKeyDown: C("end"),
            "data-handle": "end",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: Hb, "aria-hidden": "true" }),
              /* @__PURE__ */ c.jsx("span", { className: qb, "aria-hidden": "true" })
            ]
          }
        ),
        m && /* @__PURE__ */ c.jsx(
          "div",
          {
            className: E6,
            style: {
              left: `${ne}%`,
              transition: M ? "none" : void 0
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
function tc(t, a, i) {
  return Math.max(a, Math.min(i, t));
}
function C6(t, a, i, l) {
  if (!t) return;
  const o = t.getContext("2d");
  if (!o || (o.clearRect(0, 0, i, l), !a || a.length === 0)) return;
  const d = l / 2;
  o.fillStyle = R6(t, "--color-primary", "#ba9eff");
  const h = Math.min(a.length, i);
  for (let m = 0; m < h; m += 1) {
    const g = a[m] ?? 0, p = Math.max(1, g * (l - 4));
    o.fillRect(m, d - p / 2, 1, p);
  }
}
function R6(t, a, i) {
  return getComputedStyle(t).getPropertyValue(a).trim() || i;
}
var M6 = "r8lfsm0", _6 = "r8lfsm1", A6 = "r8lfsm2", D6 = "r8lfsm3", z6 = "r8lfsm4", k6 = { standalone: "_1b1zchy1 _1b1zchy0", nested: "_1b1zchy2 _1b1zchy0" }, O6 = "_1b1zchy3", L6 = { standalone: "_1b1zchy4", nested: "_1b1zchy5" }, U6 = "_1b1zchy6", B6 = "_1b1zchy7";
const kS = y.createContext("standalone");
function OS({
  variant: t = "standalone",
  children: a,
  className: i,
  style: l,
  ...o
}) {
  const d = [k6[t], i].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx(kS.Provider, { value: t, children: /* @__PURE__ */ c.jsx("div", { className: d, style: l, ...o, children: a }) });
}
function LS({
  title: t,
  meta: a,
  children: i,
  className: l,
  titleId: o
}) {
  const d = y.useContext(kS), h = [O6, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsxs("div", { className: h, children: [
    /* @__PURE__ */ c.jsx("h3", { id: o, className: L6[d], children: t }),
    a ? /* @__PURE__ */ c.jsx("span", { className: U6, children: a }) : null,
    i
  ] });
}
function US({
  children: t,
  className: a,
  role: i = "group"
}) {
  const l = [B6, a].filter(Boolean).join(" ");
  return /* @__PURE__ */ c.jsx("div", { className: l, role: i, children: t });
}
const Yb = -16, $6 = 80, V6 = 720;
function H6(t) {
  const { deploymentId: a, runId: i, utterance: l, audioUrl: o, onApplied: d, onError: h, onCancel: m } = t, g = l.durationMs ?? 0, [p, b] = y.useState(() => Gb(g)), [v, S] = y.useState(Uc), [w, j] = y.useState(!1), [T, M] = y.useState(!1), [N, k] = y.useState(null), [A, C] = y.useState(!1), V = y.useRef(null), G = y.useRef(null), ne = y.useRef(null);
  y.useEffect(() => {
    const U = Gb(g);
    b(U), S(t1(U)), M(!1), k(null), ne.current = null;
  }, [l.utteranceId, g]);
  const D = y.useCallback((U) => {
    S(U), b((B) => e1(B, U));
  }, []);
  y.useEffect(() => () => G.current?.abort(), []), y.useEffect(() => {
    V.current?.querySelector(
      "button:not([disabled]), [tabindex='0']"
    )?.focus();
  }, [l.utteranceId]);
  const I = y.useCallback(
    (U) => {
      U.key === "Escape" && (U.stopPropagation(), m());
    },
    [m]
  ), F = y.useMemo(
    () => p.ops.find((U) => U.mode === "trim"),
    [p.ops]
  ), ie = F?.start_ms ?? 0, re = F?.end_ms ?? Math.max(1, g), te = y.useCallback((U, B) => {
    b((Z) => q6(Z, "trim", (_) => ({
      ..._,
      mode: "trim",
      start_ms: Math.max(0, Math.floor(U)),
      end_ms: Math.max(Math.floor(U) + 1, Math.floor(B))
    })));
  }, []), ce = y.useCallback((U) => te(U, re), [re, te]), W = y.useCallback((U) => te(ie, U), [ie, te]), O = y.useCallback((U) => {
    M(U), b((B) => {
      const Z = B.ops.filter((_) => _.mode !== "normalize");
      if (U) {
        const _ = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Yb
        };
        return { ...B, ops: [...Z, _] };
      }
      return { ...B, ops: Z };
    });
  }, []), R = y.useCallback(async () => {
    const U = Fx(p, g);
    if (U) {
      k(U.message);
      return;
    }
    if (k(null), A) return;
    G.current?.abort();
    const B = new AbortController();
    G.current = B, C(!0);
    try {
      const Z = ne.current ?? void 0, _ = await UC(
        a,
        i,
        l.utteranceId,
        Z ? { chain: p, digest_before: Z } : { chain: p },
        { signal: B.signal }
      );
      if (B.signal.aborted) return;
      ne.current = _.chain_digest, d(_);
    } catch (Z) {
      if (B.signal.aborted) return;
      Z instanceof Qi && (ne.current = Z.currentDigest || null);
      const _ = Z instanceof Qi ? "Edit chain has changed in another tab. Reload to continue." : Z instanceof Error ? Z.message : "apply failed";
      k(_), h(_);
    } finally {
      B.signal.aborted || C(!1);
    }
  }, [p, g, A, a, i, l.utteranceId, d, h]);
  return /* @__PURE__ */ c.jsx(OS, { variant: "nested", children: /* @__PURE__ */ c.jsxs("div", { ref: V, onKeyDown: I, children: [
    /* @__PURE__ */ c.jsx(LS, { title: "Edit segment", meta: `Source · ${nc(g)}` }),
    /* @__PURE__ */ c.jsx(
      zS,
      {
        audioUrl: o,
        durationMs: Math.max(1, g),
        startMs: ie,
        endMs: re,
        onChangeStart: ce,
        onChangeEnd: W,
        height: $6,
        width: V6
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: M6, children: [
      /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
      /* @__PURE__ */ c.jsxs("span", { className: _6, children: [
        nc(ie),
        " → ",
        nc(re),
        " · ",
        nc(re - ie)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: A6, children: [
      /* @__PURE__ */ c.jsxs("label", { className: D6, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: (U) => O(U.currentTarget.checked),
            "aria-label": "Toggle loudness normalization"
          }
        ),
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Normalize to ",
          Yb.toFixed(0),
          " LUFS (broadcast-friendly)"
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(
        "button",
        {
          type: "button",
          className: z6,
          onClick: () => j((U) => !U),
          "aria-expanded": w,
          children: [
            w ? "▾" : "▸",
            " Advanced effects · gain · eq · pitch · fade · silence trim"
          ]
        }
      )
    ] }),
    w && /* @__PURE__ */ c.jsx(
      Ih,
      {
        state: v,
        onChange: D,
        supportsSynthSpeed: !1
      }
    ),
    /* @__PURE__ */ c.jsxs(US, { children: [
      /* @__PURE__ */ c.jsx($e, { size: "sm", onClick: () => void R(), disabled: A, children: A ? "Applying…" : "Apply" }),
      /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: m, disabled: A, children: "Cancel" })
    ] }),
    N && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: N })
  ] }) });
}
function Gb(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function q6(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function nc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
var I6 = "jq2zyb2", F6 = "jq2zyb3", Y6 = "jq2zyb4", G6 = "jq2zyb5", X6 = "jq2zyb6", P6 = "jq2zyb7", K6 = "jq2zyb8", Q6 = "jq2zyb9", Z6 = "jq2zyba", J6 = "jq2zybb", W6 = "jq2zybc", eL = "jq2zybd", tL = "jq2zybe", nL = "jq2zybf jq2zybe", aL = "jq2zybg", rL = "jq2zybh", iL = "jq2zybi", sL = "jq2zybj", lL = "jq2zybk", oL = "jq2zybl", cL = "jq2zybm", uL = "jq2zybn", dL = "jq2zybo", fL = "jq2zybp", hL = "jq2zybq", mL = "jq2zybr", pL = "jq2zybs", vL = "jq2zybt", gL = "jq2zybu", yL = "jq2zybv", bL = "jq2zybw", xL = "jq2zybx", SL = "jq2zyby", Xb = "jq2zybz", wL = "jq2zyb10", jL = "jq2zyb11", EL = "jq2zyb12";
const NL = ["cancelled", "failed", "partial"], TL = 2600;
function CL() {
  const { run: t } = Nl(), a = jl(), [i, l] = y.useState(t), [o, d] = y.useState(!1), [h, m] = y.useState(null), [g, p] = y.useState(null), [b, v] = y.useState(
    null
  );
  y.useEffect(() => {
    l(t);
  }, [t]), y.useEffect(() => {
    if (!b) return;
    const C = setTimeout(() => v(null), TL);
    return () => clearTimeout(C);
  }, [b]);
  const S = y.useMemo(() => _L(i), [i]), w = NL.includes(i.status) && i.kind === "batch", j = (i.exportZipStaleAt ?? null) !== null, T = async () => {
    if (i.deploymentId) {
      d(!0), m(null);
      try {
        const { runId: C } = await qx(i.deploymentId, i.runId);
        a(`/${i.deploymentId}/runs/${C}`);
      } catch (C) {
        m(zL(C));
      } finally {
        d(!1);
      }
    }
  }, M = y.useCallback((C) => {
    p((V) => V === C ? null : C);
  }, []), N = y.useCallback(() => {
    p(null);
  }, []), k = (C, V) => {
    l((G) => ML(G, C, V)), p(null), v({ message: "Segment edited", severity: "success" });
  }, A = y.useCallback((C) => {
    v({ message: C, severity: "error" });
  }, []);
  return /* @__PURE__ */ c.jsxs("main", { className: I6, children: [
    /* @__PURE__ */ c.jsxs("div", { className: F6, children: [
      /* @__PURE__ */ c.jsxs("header", { className: Y6, children: [
        /* @__PURE__ */ c.jsxs("p", { className: G6, children: [
          i.deploymentId ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
            /* @__PURE__ */ c.jsx(Uh, { to: `/${i.deploymentId}/recipe`, className: X6, children: "← Back to recipe" }),
            /* @__PURE__ */ c.jsx("span", { className: P6, children: "·" })
          ] }) : null,
          /* @__PURE__ */ c.jsx("span", { children: "Run detail" })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: K6, children: [
          /* @__PURE__ */ c.jsxs("h1", { className: Q6, children: [
            AL(i.kind),
            /* @__PURE__ */ c.jsx("span", { className: Z6, children: i.runId })
          ] }),
          /* @__PURE__ */ c.jsx(Zr, { size: "md", tone: kL(i.status), pulse: i.status === "running", children: i.status })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("section", { className: J6, "aria-label": "Run statistics", children: [
        /* @__PURE__ */ c.jsx(ac, { label: "Format", value: i.outputFormat.toUpperCase(), mono: !0 }),
        /* @__PURE__ */ c.jsx(ac, { label: "Speed", value: `${i.speedFactor.toFixed(2)}×`, mono: !0 }),
        /* @__PURE__ */ c.jsx(
          ac,
          {
            label: "Completed",
            value: `${S.completed} / ${S.total}`,
            progress: S.total > 0 ? S.completed / S.total : 0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ac,
          {
            label: "Cache hit",
            value: `${S.cacheRatio}%`,
            progress: S.cacheRatio / 100
          }
        )
      ] }),
      w && /* @__PURE__ */ c.jsxs("section", { className: rL, "aria-labelledby": "run-detail-resume-title", children: [
        /* @__PURE__ */ c.jsxs("div", { className: iL, children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-resume-title", className: sL, children: S.failed > 0 ? `${S.failed} line${S.failed === 1 ? "" : "s"} did not complete` : "Run was interrupted before completion" }),
          /* @__PURE__ */ c.jsx("p", { className: lL, children: "Resume picks up where the last attempt left off — completed audio is re-used from cache." })
        ] }),
        /* @__PURE__ */ c.jsx($e, { size: "lg", disabled: o, onClick: () => void T(), children: o ? "Resuming…" : S.failed > 0 ? "Rerun failed lines" : "Resume run" }),
        h && /* @__PURE__ */ c.jsx("p", { className: oL, role: "alert", children: h })
      ] }),
      /* @__PURE__ */ c.jsxs(Ua, { "aria-labelledby": "run-detail-utterances", children: [
        /* @__PURE__ */ c.jsxs(IT, { children: [
          /* @__PURE__ */ c.jsx("h2", { id: "run-detail-utterances", className: Pr, children: "01 / Utterances" }),
          S.completed > 0 && /* @__PURE__ */ c.jsxs("span", { className: cL, children: [
            /* @__PURE__ */ c.jsx("span", { className: uL, children: S.cached }),
            "/",
            S.completed,
            " from cache"
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("ul", { className: dL, children: i.utterances.map((C) => {
          const V = g === C.utteranceId, G = C.status === "completed" && C.audioArtifactRef !== null && C.audioArtifactRef !== void 0, ne = C.derivedArtifactRef ?? C.audioArtifactRef ?? null, D = ne ? `/api/v1/artifacts/${encodeURIComponent(ne)}/download` : "", I = (C.derivedArtifactRef ?? null) !== null;
          return /* @__PURE__ */ c.jsxs("li", { className: hL, children: [
            /* @__PURE__ */ c.jsxs("div", { className: fL, children: [
              /* @__PURE__ */ c.jsxs("span", { className: pL, children: [
                "#",
                C.globalIndex.toString().padStart(3, "0")
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: vL, title: C.characterDisplay, children: C.characterDisplay }),
              /* @__PURE__ */ c.jsx("span", { className: gL, title: C.text, children: C.text }),
              /* @__PURE__ */ c.jsxs("span", { className: yL, children: [
                C.cacheHit && /* @__PURE__ */ c.jsx("span", { className: bL, children: "cached" }),
                I && /* @__PURE__ */ c.jsx("span", { className: mL, children: "edited" }),
                C.durationMs ? /* @__PURE__ */ c.jsx("span", { children: DL(C.durationMs) }) : null,
                /* @__PURE__ */ c.jsx(Zr, { tone: OL(C.status), children: C.status }),
                G && /* @__PURE__ */ c.jsx(
                  $e,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => M(C.utteranceId),
                    "aria-expanded": V,
                    "aria-label": V ? "Close segment editor" : "Edit segment",
                    children: V ? "Close" : "Edit"
                  }
                )
              ] })
            ] }),
            V && D && i.deploymentId && /* @__PURE__ */ c.jsx(
              H6,
              {
                deploymentId: i.deploymentId,
                runId: i.runId,
                utterance: C,
                audioUrl: D,
                onApplied: (F) => k(C.utteranceId, F),
                onError: A,
                onCancel: N
              }
            )
          ] }, C.utteranceId);
        }) })
      ] }),
      RL(i, j)
    ] }),
    b && /* @__PURE__ */ c.jsx(
      "div",
      {
        className: EL,
        role: b.severity === "error" ? "alert" : "status",
        "aria-live": b.severity === "error" ? "assertive" : "polite",
        children: b.message
      }
    )
  ] });
}
function RL(t, a) {
  if (!t.exportArtifactRef && !a) return null;
  const l = !!t.exportArtifactRef ? "Edits since last export" : "Edits pending export";
  return /* @__PURE__ */ c.jsx("div", { className: xL, children: a ? /* @__PURE__ */ c.jsxs("div", { className: wL, children: [
    /* @__PURE__ */ c.jsx("p", { className: jL, children: l }),
    /* @__PURE__ */ c.jsxs(
      $e,
      {
        variant: "secondary",
        size: "md",
        disabled: !0,
        "aria-disabled": "true",
        title: "Rebuild required (backend rebuild endpoint pending)",
        children: [
          "Rebuild required ",
          /* @__PURE__ */ c.jsx("span", { className: Xb, children: "↻" })
        ]
      }
    )
  ] }) : t.exportArtifactRef ? /* @__PURE__ */ c.jsxs(
    "a",
    {
      href: `/api/v1/artifacts/${t.exportArtifactRef}/download`,
      download: !0,
      className: SL,
      children: [
        "Download ZIP ",
        /* @__PURE__ */ c.jsx("span", { className: Xb, children: "↓" })
      ]
    }
  ) : null });
}
function ML(t, a, i) {
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
function ac({ label: t, value: a, mono: i, progress: l }) {
  const o = l !== void 0 ? Math.min(1, Math.max(0, l)) : void 0;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: W6,
      style: o !== void 0 ? { "--progress": String(o) } : void 0,
      children: [
        /* @__PURE__ */ c.jsx("span", { className: eL, children: t }),
        /* @__PURE__ */ c.jsx("span", { className: i ? nL : tL, children: a }),
        o !== void 0 && /* @__PURE__ */ c.jsx("span", { className: aL, "aria-hidden": "true" })
      ]
    }
  );
}
function _L(t) {
  const a = t.utterances.length, i = t.utterances.filter((h) => h.status === "completed").length, l = t.utterances.filter(
    (h) => h.status === "failed" || h.status === "cancelled"
  ).length, o = t.utterances.filter((h) => h.cacheHit).length, d = i > 0 ? Math.round(o / i * 100) : 0;
  return { total: a, completed: i, failed: l, cached: o, cacheRatio: d };
}
function AL(t) {
  switch (t) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}
function DL(t) {
  return t < 1e3 ? `${t} ms` : `${(t / 1e3).toFixed(t < 1e4 ? 2 : 1)} s`;
}
function zL(t) {
  return t instanceof es ? `${t.category}: ${t.message}` : t instanceof Error ? t.message : "Unexpected error";
}
function kL(t) {
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
function OL(t) {
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
var LL = "pcphqj2", UL = "pcphqj3", BL = "pcphqj4", $L = "pcphqj5", VL = "pcphqj6", HL = "pcphqj7", qL = "pcphqj8", IL = "pcphqj9", FL = "pcphqja", Pb = "pcphqjb", YL = "pcphqjc", GL = "pcphqjd", XL = "pcphqje pcphqjd", PL = "pcphqjf", KL = "pcphqjg", QL = "pcphqjh", ZL = "pcphqji", JL = "pcphqjj pcphqji", WL = "pcphqjk pcphqji", e8 = "pcphqjl pcphqji", t8 = "pcphqjm", Hf = "pcphqjn", qf = "pcphqjo";
function n8() {
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
  }, []), /* @__PURE__ */ c.jsx("main", { className: LL, children: /* @__PURE__ */ c.jsxs("div", { className: UL, children: [
    /* @__PURE__ */ c.jsxs("header", { className: BL, children: [
      /* @__PURE__ */ c.jsx("p", { className: $L, children: "EmotionTTS · Runtime queue" }),
      /* @__PURE__ */ c.jsxs("div", { className: VL, children: [
        /* @__PURE__ */ c.jsx("h1", { className: HL, children: "Queue" }),
        /* @__PURE__ */ c.jsx("span", { className: qL, children: "live · 3 s" })
      ] }),
      /* @__PURE__ */ c.jsx("p", { className: IL, children: "Work in flight on this host's backend lease. Position 1 is running now; the rest are waiting for GPU. Polls every three seconds." })
    ] }),
    i ? /* @__PURE__ */ c.jsx(zn, { severity: "error", children: i }) : t === null ? null : t.length === 0 ? /* @__PURE__ */ c.jsx(Ua, { density: "compact", children: /* @__PURE__ */ c.jsx(Oc, { title: "Queue is quiet.", hint: "Recipe → Generate" }) }) : /* @__PURE__ */ c.jsxs(Ua, { density: "compact", "aria-labelledby": "runtime-queue-section", children: [
      /* @__PURE__ */ c.jsx("h2", { id: "runtime-queue-section", className: Pr, children: "01 / In flight" }),
      /* @__PURE__ */ c.jsx("ul", { className: FL, children: t.map((o) => {
        const d = o.position === 1;
        return /* @__PURE__ */ c.jsxs(
          "li",
          {
            className: d ? `${Pb} ${YL}` : Pb,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: d ? XL : GL, children: o.position }),
              /* @__PURE__ */ c.jsxs("span", { className: PL, children: [
                /* @__PURE__ */ c.jsx("span", { className: KL, children: o.deploymentName ?? o.deploymentId }),
                /* @__PURE__ */ c.jsx("span", { className: QL, children: o.runId })
              ] }),
              /* @__PURE__ */ c.jsx("span", { className: a8(o.kind), children: r8(o.kind) }),
              /* @__PURE__ */ c.jsx("span", { className: t8, children: o.etaSeconds !== void 0 && o.etaSeconds !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Hf, children: i8(o.etaSeconds) }),
                /* @__PURE__ */ c.jsx("span", { className: qf, children: "eta" })
              ] }) : o.utteranceTotal !== void 0 && o.utteranceTotal !== null ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Hf, children: o.utteranceTotal }),
                /* @__PURE__ */ c.jsx("span", { className: qf, children: "lines" })
              ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                /* @__PURE__ */ c.jsx("span", { className: Hf, children: "—" }),
                /* @__PURE__ */ c.jsx("span", { className: qf, children: "pending" })
              ] }) })
            ]
          },
          o.runId
        );
      }) })
    ] })
  ] }) });
}
function a8(t) {
  switch (t) {
    case "batch":
      return JL;
    case "test_line":
      return WL;
    case "resume":
      return e8;
    default:
      return ZL;
  }
}
function r8(t) {
  switch (t) {
    case "test_line":
      return "test line";
    default:
      return t;
  }
}
function i8(t) {
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60), i = t % 60;
  return i === 0 ? `${a}m` : `${a}m ${i}s`;
}
function s8() {
  const { deploymentId: t, prefillCharacterName: a } = Nl(), i = jl(), [l, o] = y.useState(a), [d, h] = y.useState(""), [m, g] = y.useState("none"), [p, b] = y.useState(!1), [v, S] = y.useState(null), w = y.useRef(null);
  y.useEffect(() => {
    w.current?.scrollIntoView({ behavior: "smooth", block: "center" }), w.current?.focus();
  }, []);
  const j = async (T) => {
    T.preventDefault(), b(!0), S(null);
    try {
      await Bh(t, {
        characterName: l,
        speakerVoiceAssetId: d,
        defaultEmotionMode: m
      }), i(`/${t}/recipe`);
    } catch (M) {
      S(M instanceof Error ? M.message : "failed");
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
            ref: w,
            value: l,
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
            value: d,
            onChange: (T) => h(T.currentTarget.value),
            required: !0
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { children: [
        "Emotion mode",
        /* @__PURE__ */ c.jsxs("select", { value: m, onChange: (T) => g(T.currentTarget.value), children: [
          /* @__PURE__ */ c.jsx("option", { value: "none", children: "None" }),
          /* @__PURE__ */ c.jsx("option", { value: "audio_ref", children: "Audio ref" }),
          /* @__PURE__ */ c.jsx("option", { value: "vector_preset", children: "Vector preset" }),
          /* @__PURE__ */ c.jsx("option", { value: "qwen_template", children: "Qwen template" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx($e, { type: "submit", variant: "primary", disabled: p, children: "Save mapping" }),
      v && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: v })
    ] })
  ] });
}
var l8 = "_1oor31e0", o8 = "_1oor31e1", c8 = "_1oor31e2", u8 = "_1oor31e3", d8 = "_1oor31e4", f8 = "_1oor31e5", h8 = "_1oor31e6", m8 = "_1oor31e7", p8 = "_1oor31e8";
const v8 = 8;
function g8(t) {
  const { entries: a, loading: i, error: l } = t;
  return /* @__PURE__ */ c.jsxs("div", { className: l8, "aria-busy": !!i, children: [
    l && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: l }),
    i && !l && /* @__PURE__ */ c.jsx("div", { className: p8, "aria-live": "polite", children: "Loading edit history…" }),
    !i && !l && a.length === 0 && /* @__PURE__ */ c.jsx("div", { className: m8, children: "No edits yet" }),
    !i && !l && a.length > 0 && /* @__PURE__ */ c.jsx("ul", { className: o8, children: a.map((o) => /* @__PURE__ */ c.jsxs("li", { className: c8, children: [
      /* @__PURE__ */ c.jsx("span", { className: u8, children: b8(o.recorded_at) }),
      /* @__PURE__ */ c.jsx("span", { className: d8, children: o.operation_count === 0 ? "cleared" : `${o.operation_count} op${o.operation_count === 1 ? "" : "s"}` }),
      /* @__PURE__ */ c.jsx("span", { className: f8, title: o.digest_after, children: y8(o.digest_after) }),
      /* @__PURE__ */ c.jsx("span", { className: h8, children: o.actor })
    ] }, o.entry_id)) })
  ] });
}
function y8(t) {
  return t ? `${t.slice(0, v8)}…` : "—";
}
function b8(t) {
  const a = new Date(t);
  return Number.isNaN(a.getTime()) ? t : a.toLocaleString();
}
var Kb = "_1c63kaw0", x8 = "_1c63kaw1", S8 = "_1c63kaw2", w8 = "_1c63kaw3", j8 = "_1c63kaw4", E8 = "_1c63kaw5", N8 = "_1c63kaw6";
function T8({ chain: t, onRemoveOp: a }) {
  return t.ops.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: Kb, "data-testid": "edit-chain-list-empty", children: /* @__PURE__ */ c.jsx("span", { className: x8, children: "No edits yet" }) }) : /* @__PURE__ */ c.jsx("ol", { className: Kb, "data-testid": "edit-chain-list", children: t.ops.map((i, l) => /* @__PURE__ */ c.jsxs("li", { className: S8, children: [
    /* @__PURE__ */ c.jsxs("span", { className: w8, "aria-hidden": "true", children: [
      l + 1,
      "."
    ] }),
    /* @__PURE__ */ c.jsxs("span", { className: j8, children: [
      /* @__PURE__ */ c.jsx("span", { className: E8, children: Qb(i) }),
      /* @__PURE__ */ c.jsx("span", { className: N8, children: C8(i) })
    ] }),
    /* @__PURE__ */ c.jsx(
      $e,
      {
        variant: "ghost",
        size: "xs",
        iconOnly: !0,
        onClick: () => a(i.id),
        "aria-label": `Remove ${Qb(i)} (position ${l + 1})`,
        title: "Remove operation",
        children: "×"
      }
    )
  ] }, i.id)) });
}
function Qb(t) {
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
function C8(t) {
  switch (t.mode) {
    case "trim":
    case "crop":
    case "mute":
      return `${Zb(t.start_ms)} → ${Zb(t.end_ms)}`;
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
      return `${If(t.low_db)} / ${If(t.mid_db)} / ${If(t.high_db)}`;
    case "pitch_shift":
      return `${t.semitones >= 0 ? "+" : ""}${t.semitones.toFixed(1)} st`;
    case "silence_strip":
      return `${t.threshold_db.toFixed(0)} dB`;
    default:
      return "—";
  }
}
function If(t) {
  return `${t >= 0 ? "+" : ""}${t.toFixed(0)}`;
}
function Zb(t) {
  return !Number.isFinite(t) || t < 0 ? "0.00s" : `${(t / 1e3).toFixed(2)}s`;
}
var rc = "_1o3ytop0", Ff = "_1o3ytop1", Jb = "_1o3ytop2", R8 = "_1o3ytop3", M8 = "_1o3ytop4", _8 = "_1o3ytop5", A8 = "_1o3ytop6", D8 = "_1o3ytop7", ic = "_1o3ytop8", z8 = "_1o3ytop9", k8 = "_1o3ytopf", O8 = "_1o3ytopg", L8 = "_1o3ytoph", U8 = "_1o3ytopi", B8 = "_1o3ytopj", $8 = "_1o3ytopk", V8 = "_1t0zy2f0", H8 = "_1t0zy2f1", q8 = "_1t0zy2f2";
function I8({ content: t, children: a, delayMs: i = 350 }) {
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
    return /* @__PURE__ */ c.jsx(c.Fragment, { children: a });
  const b = {
    onMouseEnter: g,
    onMouseLeave: p,
    onFocus: g,
    onBlur: p,
    "aria-describedby": l ? d : void 0
  };
  return /* @__PURE__ */ c.jsxs("span", { className: V8, children: [
    y.cloneElement(a, b),
    l && /* @__PURE__ */ c.jsx("span", { role: "tooltip", id: d, className: q8, children: t })
  ] });
}
function sc({ label: t, content: a }) {
  return /* @__PURE__ */ c.jsx(I8, { content: a, children: /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `What is ${t}?`, className: H8, children: "?" }) });
}
const Wb = -16;
function F8(t) {
  const {
    voiceAsset: a,
    deploymentId: i,
    affectedCharacterNames: l = [],
    onChainPersisted: o,
    onError: d
  } = t, h = a.durationMs ?? 0, m = y.useMemo(
    () => Y8(a.audioArtifactRef),
    [a.audioArtifactRef]
  ), [g, p] = y.useState(() => Yf(h)), [b, v] = y.useState(Uc), [S, w] = y.useState(!1), [j, T] = y.useState(null), [M, N] = y.useState(null), [k, A] = y.useState(!1), [C, V] = y.useState(!1), [G, ne] = y.useState(!1), [D, I] = y.useState(null), [F, ie] = y.useState([]), [re, te] = y.useState(null), [ce, W] = y.useState([]), [O, R] = y.useState(!1), [U, B] = y.useState(null), [Z, _] = y.useState(0), J = y.useRef(null), K = y.useRef(null), le = y.useRef(null), fe = y.useRef(null), ge = y.useRef(null), Ae = y.useRef(0), Me = y.useMemo(
    () => g.ops.some((ye) => ye.mode === "normalize"),
    [g.ops]
  );
  y.useEffect(() => {
    const ye = Yf(h);
    p(ye), v(t1(ye)), T(null), ne(!1), ie([]), te(null), ge.current = null;
  }, [a.voiceAssetId, h]);
  const Ve = y.useCallback((ye) => {
    v(ye), p((ze) => e1(ze, ye));
  }, []);
  y.useEffect(() => {
    fe.current?.abort();
    const ye = new AbortController();
    return fe.current = ye, R(!0), B(null), dc(i, "voice_asset", a.voiceAssetId, 50, {
      signal: ye.signal
    }).then((ze) => {
      ye.signal.aborted || W(ze.entries);
    }).catch((ze) => {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Error ? ze.message : "audit fetch failed";
      B(Qe);
    }).finally(() => {
      ye.signal.aborted || R(!1);
    }), () => ye.abort();
  }, [i, a.voiceAssetId, Z]), y.useEffect(() => () => {
    M && URL.revokeObjectURL(M);
  }, [M]), y.useEffect(() => () => {
    K.current?.abort(), le.current?.abort(), fe.current?.abort();
  }, []);
  const Zt = g.ops.find((ye) => ye.mode === "trim"), Pt = g.ops.find((ye) => ye.mode === "normalize"), At = Zt?.start_ms ?? 0, et = Zt?.end_ms ?? Math.max(1, h), pt = y.useCallback((ye, ze) => {
    p(
      (Qe) => ex(
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
  ), Oe = y.useCallback(
    (ye) => pt(At, ye),
    [At, pt]
  ), De = y.useCallback((ye) => {
    p((ze) => {
      const Qe = ze.ops.filter((nt) => nt.mode !== "normalize");
      if (ye) {
        const nt = {
          id: Sn(),
          mode: "normalize",
          target_lufs: Wb
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
    const ye = Fx(g, h);
    return ye ? (T(ye.message), !1) : (T(null), !0);
  }, [g, h]), un = y.useCallback(async () => {
    if (!xt() || k) return;
    K.current?.abort();
    const ye = new AbortController();
    K.current = ye;
    const ze = ++Ae.current;
    V(!0);
    try {
      const Qe = await $C(a.voiceAssetId, i, g, {
        signal: ye.signal
      });
      if (ye.signal.aborted || ze !== Ae.current) return;
      M && URL.revokeObjectURL(M);
      const nt = URL.createObjectURL(Qe);
      N(nt), ne(!0), requestAnimationFrame(() => J.current?.play().catch(() => {
      }));
    } catch (Qe) {
      if (ye.signal.aborted) return;
      const nt = Qe instanceof Error ? Qe.message : "preview failed";
      T(nt), d(nt);
    } finally {
      ye.signal.aborted || V(!1);
    }
  }, [xt, k, a.voiceAssetId, i, g, M, d]), Ht = y.useCallback(async () => {
    if (!xt() || C || k) return;
    if (l.length > 1) {
      const ze = l.join(", ");
      if (!window.confirm(
        `This voice asset is referenced by ${l.length} characters: ${ze}.

Applying this edit chain will affect every line they speak in the next batch.

Continue?`
      )) return;
    }
    K.current?.abort(), le.current?.abort();
    const ye = new AbortController();
    le.current = ye, A(!0);
    try {
      const ze = ge.current ?? void 0, Qe = await Ix(
        a.voiceAssetId,
        i,
        ze ? { chain: g, digest_before: ze } : { chain: g },
        { signal: ye.signal }
      );
      if (ye.signal.aborted) return;
      ge.current = Qe.chain_digest, te(Qe.chain_digest), T(null), I(Qe.measured_lufs ?? null), ie([]), o(Qe), _((nt) => nt + 1);
    } catch (ze) {
      if (ye.signal.aborted) return;
      const Qe = ze instanceof Qi;
      ze instanceof Qi && (ge.current = ze.currentDigest || null);
      const nt = Qe ? "Edit chain has changed in another tab. Reload to continue." : ze instanceof Error ? ze.message : "apply failed";
      T(nt), d(nt);
    } finally {
      ye.signal.aborted || A(!1);
    }
  }, [
    xt,
    C,
    k,
    l,
    a.voiceAssetId,
    i,
    g,
    o,
    d
  ]), kn = y.useCallback(() => {
    K.current?.abort(), p(Yf(h)), T(null), I(null), ne(!1), ie([]), _((ye) => ye + 1), M && (URL.revokeObjectURL(M), N(null));
  }, [h, M]), qt = y.useCallback((ye) => {
    p(
      (ze) => ex(
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
  return /* @__PURE__ */ c.jsxs(OS, { variant: "standalone", children: [
    /* @__PURE__ */ c.jsx(
      LS,
      {
        title: `Edit · ${a.displayName}`,
        meta: `Source · ${lc(h)}`
      }
    ),
    /* @__PURE__ */ c.jsx(
      zS,
      {
        audioUrl: m,
        durationMs: Math.max(1, h),
        startMs: At,
        endMs: et,
        onChangeStart: he,
        onChangeEnd: Oe
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: rc, children: [
      /* @__PURE__ */ c.jsxs("span", { className: Ff, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Trim region" }),
        /* @__PURE__ */ c.jsx(
          sc,
          {
            label: "trim",
            content: "Cuts the start and end of the clip so only the middle plays. Non-destructive — drag the handles on the waveform to change it later, or remove the trim op entirely."
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("span", { className: Jb, children: [
        lc(At),
        " → ",
        lc(et),
        " · ",
        lc(et - At)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: D8, children: [
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Ff, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Normalize loudness" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "loudness normalization",
                content: "Rescales the whole clip so it lands on a target perceived loudness (LUFS — the broadcast / streaming standard). −16 LUFS is a comfortable spoken-word level; lower numbers are louder."
              }
            )
          ] }),
          Me && Pt && /* @__PURE__ */ c.jsxs("span", { className: k8, children: [
            "target ",
            Pt.target_lufs.toFixed(1),
            " LUFS",
            D !== null && ` · measured ${D.toFixed(1)}`
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: z8, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: Me,
              onChange: (ye) => De(ye.currentTarget.checked),
              "aria-label": "Toggle loudness normalization"
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Target ",
            Wb.toFixed(0),
            " LUFS (broadcast-friendly)"
          ] })
        ] }),
        Me && Pt && /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "range",
            className: L8,
            min: -30,
            max: -6,
            step: 0.5,
            value: Pt.target_lufs,
            onChange: (ye) => qt(Number(ye.currentTarget.value)),
            "aria-label": "Target LUFS"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Ff, children: [
            /* @__PURE__ */ c.jsx("span", { children: "Operations" }),
            /* @__PURE__ */ c.jsx(
              sc,
              {
                label: "operations",
                content: "The ordered list of edits applied to this voice asset. They run top-to-bottom each time the clip is rendered. Click × on any row to remove it."
              }
            )
          ] }),
          /* @__PURE__ */ c.jsx("span", { className: Jb, children: g.ops.length })
        ] }),
        /* @__PURE__ */ c.jsx(T8, { chain: g, onRemoveOp: Te })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: ic, children: [
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: R8,
            onClick: () => w((ye) => !ye),
            "aria-expanded": S,
            children: [
              /* @__PURE__ */ c.jsx("span", { className: M8, "aria-hidden": "true", children: S ? "▾" : "▸" }),
              /* @__PURE__ */ c.jsx("span", { children: "Advanced effects" }),
              /* @__PURE__ */ c.jsx("span", { className: _8, children: "gain · EQ · pitch · fade · silence trim" }),
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
        S && /* @__PURE__ */ c.jsx(
          Ih,
          {
            state: b,
            onChange: Ve,
            supportsSynthSpeed: !1
          }
        )
      ] }),
      re && /* @__PURE__ */ c.jsx("div", { className: ic, children: /* @__PURE__ */ c.jsxs("span", { className: rc, children: [
        /* @__PURE__ */ c.jsx("span", { children: "Chain digest" }),
        /* @__PURE__ */ c.jsxs("span", { className: A8, title: re, children: [
          re.slice(0, 12),
          "…"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ c.jsxs(US, { children: [
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "secondary",
          onClick: () => void un(),
          disabled: C || k,
          children: C ? "Rendering preview…" : "Preview"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          onClick: () => void Ht(),
          disabled: k || C,
          children: k ? "Applying…" : "Apply"
        }
      ),
      /* @__PURE__ */ c.jsx(
        $e,
        {
          variant: "ghost",
          onClick: kn,
          disabled: k || C,
          children: "Reset"
        }
      ),
      F.length > 0 && /* @__PURE__ */ c.jsxs(
        $e,
        {
          variant: "ghost",
          size: "sm",
          onClick: bt,
          disabled: k || C,
          "data-testid": "undo-last-removal",
          "aria-label": "Undo last removal",
          children: [
            "Undo last removal (",
            F.length,
            ")"
          ]
        }
      ),
      G && /* @__PURE__ */ c.jsx(
        "span",
        {
          className: $8,
          "data-testid": "preview-consumed-hint",
          role: "note",
          "aria-live": "polite",
          children: "Preview again after edits to verify before applying"
        }
      )
    ] }),
    M && // biome-ignore lint/a11y/useMediaCaption: synthesised speech preview, no captions track
    /* @__PURE__ */ c.jsx(
      "audio",
      {
        ref: J,
        src: M,
        controls: !0,
        className: O8,
        "aria-label": "Edit preview"
      }
    ),
    j && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: j }),
    /* @__PURE__ */ c.jsxs("details", { className: U8, children: [
      /* @__PURE__ */ c.jsxs("summary", { className: B8, children: [
        "Edit history",
        ce.length > 0 ? ` · ${ce.length}` : ""
      ] }),
      /* @__PURE__ */ c.jsx(
        g8,
        {
          entries: ce,
          loading: O,
          error: U
        }
      )
    ] })
  ] });
}
function Yf(t) {
  return t <= 0 ? { version: 1, ops: [] } : { version: 1, ops: [{
    id: Sn(),
    mode: "trim",
    start_ms: 0,
    end_ms: t
  }] };
}
function ex(t, a, i) {
  const l = t.ops.findIndex((d) => d.mode === a);
  if (l === -1) {
    const d = { id: Sn(), mode: a };
    return { ...t, ops: [...t.ops, i(d)] };
  }
  const o = [...t.ops];
  return o[l] = i(o[l]), { ...t, ops: o };
}
function lc(t) {
  return !Number.isFinite(t) || t < 0 ? "0.0s" : t < 1e3 ? `${Math.round(t)} ms` : `${(Math.round(t / 100) / 10).toFixed(1)}s`;
}
function Y8(t) {
  return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/") ? t : `/api/v1/artifacts/${encodeURIComponent(t)}`;
}
var G8 = "go9vi12", X8 = "go9vi13", P8 = "go9vi14", K8 = "go9vi15", Q8 = "go9vi16", Z8 = "go9vi17", J8 = "go9vi18", W8 = "go9vi19", eU = "go9vi1a go9vi19", tU = "go9vi1b", nU = "go9vi1c", aU = "go9vi1d", rU = "go9vi1e", iU = "go9vi1f", sU = "go9vi1g", lU = "go9vi1h", oU = "go9vi1i", Fr = "go9vi1j", il = "go9vi1k", Gi = "go9vi1l", cU = "go9vi1m go9vi1l", uU = "go9vi1n", dU = "go9vi1o go9vi1n", fU = "go9vi1p go9vi1n", hU = "go9vi1q", mU = "go9vi1r", pU = "go9vi1s", vU = "go9vi1t", BS = "go9vi1u", gU = "go9vi1v", yU = "go9vi1w", bU = "go9vi1x go9vi1l", xU = "go9vi1y", SU = "go9vi1z", wU = "go9vi110", jU = "go9vi111", EU = "go9vi112", NU = "go9vi113";
const TU = ["none", "audio_ref", "vector_preset", "qwen_template"];
function CU() {
  const { deployment: t, mappings: a, voiceAssets: i } = Nl(), [l, o] = y.useState(a), [d, h] = y.useState(i), [m, g] = y.useState(
    a[0]?.mappingId ?? null
  ), [p, b] = y.useState(""), [v, S] = y.useState(null), [w, j] = y.useState(null), [T, M] = y.useState(null), N = y.useMemo(() => {
    const R = /* @__PURE__ */ new Map();
    for (const U of d) R.set(U.voiceAssetId, U);
    return R;
  }, [d]), k = y.useMemo(() => {
    const R = p.trim().toLowerCase();
    return R ? l.filter((U) => U.characterName.toLowerCase().includes(R)) : l;
  }, [l, p]), A = y.useMemo(
    () => l.find((R) => R.mappingId === m) ?? null,
    [l, m]
  );
  y.useEffect(() => {
    o(a), h(i), g(a[0]?.mappingId ?? null);
  }, [a, i]), y.useEffect(() => {
    if (!w) return;
    const R = setTimeout(() => j(null), 2600);
    return () => clearTimeout(R);
  }, [w]);
  const C = y.useCallback(async () => {
    const R = await Ki(t.deploymentId);
    h(R.voiceAssets);
  }, [t.deploymentId]), V = y.useCallback(
    (R) => {
      o(
        (U) => U.map((B) => B.mappingId === m ? { ...B, ...R } : B)
      );
    },
    [m]
  ), G = y.useCallback(
    async (R) => {
      if (!A) return;
      const U = A;
      try {
        const B = await ul(t.deploymentId, A.mappingId, R);
        o((Z) => Z.map((_) => _.mappingId === B.mappingId ? B : _));
      } catch (B) {
        o(
          (Z) => Z.map((_) => _.mappingId === U.mappingId ? U : _)
        ), S(mr(B));
      }
    },
    [A, t.deploymentId]
  ), ne = y.useCallback(async () => {
    const R = d[0];
    if (!R) {
      S("Upload a voice asset first so the mapping has a speaker reference.");
      return;
    }
    try {
      const U = zU(l), B = await Bh(t.deploymentId, {
        characterName: U,
        speakerVoiceAssetId: R.voiceAssetId,
        defaultEmotionMode: "none"
      });
      o((Z) => [...Z, B]), g(B.mappingId);
    } catch (U) {
      S(mr(U));
    }
  }, [t.deploymentId, d, l]), D = y.useCallback(() => {
    A && M({ id: A.mappingId, name: A.characterName });
  }, [A]), I = y.useCallback(async () => {
    if (!T) return;
    const { id: R, name: U } = T;
    M(null);
    try {
      await Hx(t.deploymentId, R), o((B) => B.filter((Z) => Z.mappingId !== R)), g(null), j(`Mapping for ${U} deactivated.`);
    } catch (B) {
      S(mr(B));
    }
  }, [t.deploymentId, T]), F = y.useCallback(
    async (R, U, B) => {
      try {
        const Z = await yc(t.deploymentId, R, U, B);
        return h((_) => [Z, ..._]), j(`${Z.displayName} uploaded.`), Z;
      } catch (Z) {
        return S(mr(Z)), null;
      }
    },
    [t.deploymentId]
  ), ie = y.useCallback(async () => {
    try {
      const R = await NT(t.deploymentId);
      $U(R, `${t.deploymentId}-mappings.json`), j("Mappings exported to JSON.");
    } catch (R) {
      S(mr(R));
    }
  }, [t.deploymentId]), re = y.useCallback(
    async (R, U) => {
      try {
        const B = await TT(
          t.deploymentId,
          R.mappings,
          U
        );
        j(
          `Imported ${B.created.length} • skipped ${B.skipped.length} • replaced ${B.replaced.length}.`
        );
        const Z = await Ki(t.deploymentId);
        h(Z.voiceAssets);
      } catch (B) {
        S(mr(B));
      }
    },
    [t.deploymentId]
  ), te = y.useCallback(
    async (R) => {
      if (await C(), A && R.chain_digest)
        try {
          const U = await ul(t.deploymentId, A.mappingId, {
            voiceAssetChainDigest: R.chain_digest
          });
          o(
            (B) => B.map((Z) => Z.mappingId === U.mappingId ? U : Z)
          );
        } catch (U) {
          S(mr(U));
        }
      j("Edit applied.");
    },
    [C, A, t.deploymentId]
  ), ce = y.useCallback((R) => {
    S(R);
  }, []), W = y.useCallback(
    async (R, U) => {
      if (!A) return null;
      const B = R.trim() || `[${A.characterName}] This is a test of the voice.`;
      try {
        return { runId: (await _T(t.deploymentId, {
          line: B,
          outputFormat: U
        })).runId };
      } catch (Z) {
        return S(mr(Z)), null;
      }
    },
    [t.deploymentId, A]
  ), O = d.length === 1 ? "voice" : "voices";
  return /* @__PURE__ */ c.jsxs("div", { className: G8, children: [
    /* @__PURE__ */ c.jsxs("aside", { className: X8, "aria-labelledby": "mapping-sidebar-heading", children: [
      /* @__PURE__ */ c.jsxs("header", { className: P8, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx("h1", { id: "mapping-sidebar-heading", className: K8, children: "Cast" }),
          /* @__PURE__ */ c.jsxs("span", { className: Q8, children: [
            l.length,
            " active · ",
            d.length,
            " ",
            O
          ] })
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "primary", size: "sm", onClick: ne, children: "+ Add" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "search",
          className: Z8,
          placeholder: "Search characters",
          value: p,
          onChange: (R) => b(R.currentTarget.value),
          "aria-label": "Search characters"
        }
      ),
      /* @__PURE__ */ c.jsx(DU, { onExport: ie, onImport: re, onParseError: S }),
      /* @__PURE__ */ c.jsx("div", { className: J8, children: k.length === 0 ? /* @__PURE__ */ c.jsx(
        Oc,
        {
          title: "No mappings yet.",
          hint: "Click + Add to create one."
        }
      ) : k.map((R) => {
        const U = N.get(R.speakerVoiceAssetId), B = R.mappingId === m;
        return /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: B ? eU : W8,
            onClick: () => g(R.mappingId),
            "aria-pressed": B,
            "data-testid": "mapping-row",
            children: [
              /* @__PURE__ */ c.jsx("span", { className: tU, "aria-hidden": "true", children: kU(R.characterName) }),
              /* @__PURE__ */ c.jsxs("span", { className: nU, children: [
                /* @__PURE__ */ c.jsx("span", { className: aU, children: R.characterName }),
                /* @__PURE__ */ c.jsxs("span", { className: rU, children: [
                  R.defaultEmotionMode,
                  " · ",
                  U?.displayName ?? "no voice"
                ] })
              ] })
            ]
          },
          R.mappingId
        );
      }) })
    ] }),
    /* @__PURE__ */ c.jsxs("section", { className: iU, "aria-label": "Mapping detail", children: [
      /* @__PURE__ */ c.jsx(um, { features: mm, children: /* @__PURE__ */ c.jsx(bS, { children: w && /* @__PURE__ */ c.jsx(
        hm.div,
        {
          className: gU,
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          role: "status",
          children: w
        },
        w
      ) }) }),
      v && /* @__PURE__ */ c.jsx(zn, { severity: "error", children: v }),
      T && /* @__PURE__ */ c.jsxs(zn, { severity: "warning", children: [
        /* @__PURE__ */ c.jsxs("span", { style: { flex: 1 }, children: [
          "Deactivate mapping for ",
          T.name,
          "?"
        ] }),
        /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: () => void I(), children: "Delete" }),
        /* @__PURE__ */ c.jsx($e, { variant: "ghost", size: "sm", onClick: () => M(null), children: "Cancel" })
      ] }),
      A ? /* @__PURE__ */ c.jsx(
        MU,
        {
          deploymentId: t.deploymentId,
          mapping: A,
          voiceAssets: d,
          allMappings: l,
          onNameChange: (R) => {
            V({ characterName: R });
          },
          onNameBlur: (R) => {
            R !== A.characterName && R.trim() && G({ characterName: R.trim() });
          },
          onSpeakerChange: (R) => {
            V({ speakerVoiceAssetId: R }), G({ speakerVoiceAssetId: R });
          },
          onModeChange: (R) => {
            V({ defaultEmotionMode: R }), G({ defaultEmotionMode: R });
          },
          onQwenChange: (R) => {
            V({ defaultQwenTemplate: R });
          },
          onQwenBlur: (R) => {
            G({ defaultQwenTemplate: R });
          },
          onSpeedChange: (R) => {
            V({ defaultSpeedFactor: R });
          },
          onSpeedCommit: (R) => {
            G({ defaultSpeedFactor: R });
          },
          onEmotionVoiceChange: (R) => {
            const U = R || null;
            V({ defaultEmotionVoiceAssetId: U }), G({ defaultEmotionVoiceAssetId: U });
          },
          onDelete: D,
          onUploadVoice: async (R, U, B) => {
            const Z = await F(R, U, B);
            return Z && B === "speaker" && (V({ speakerVoiceAssetId: Z.voiceAssetId }), G({ speakerVoiceAssetId: Z.voiceAssetId })), await C(), Z;
          },
          onTestLine: W,
          onEditChainPersisted: te,
          onEditError: ce
        },
        A.mappingId
      ) : /* @__PURE__ */ c.jsx(
        RU,
        {
          voiceCount: d.length,
          onUploadVoice: async (R) => {
            await F(R, R.name.replace(/\..+$/, ""), "speaker");
          }
        }
      )
    ] })
  ] });
}
function RU({ voiceCount: t, onUploadVoice: a }) {
  return t === 0 ? /* @__PURE__ */ c.jsxs(Ua, { density: "airy", elevation: "raised", "aria-labelledby": "onboarding-heading", children: [
    /* @__PURE__ */ c.jsxs("div", { className: wU, children: [
      /* @__PURE__ */ c.jsx("p", { className: Pr, children: "01 / Onboarding" }),
      /* @__PURE__ */ c.jsx("h2", { id: "onboarding-heading", className: jU, children: "Upload your first voice" }),
      /* @__PURE__ */ c.jsxs("p", { className: EU, children: [
        "EmotionTTS clones the voice from a short audio sample (5–30 s clean mp3 or wav). Drop one in below, then click ",
        /* @__PURE__ */ c.jsx("strong", { children: "+ Add" }),
        " on the left to map a character to it."
      ] })
    ] }),
    /* @__PURE__ */ c.jsx(
      $S,
      {
        label: "Drop or click to upload your first voice (mp3 / wav)",
        onFile: async (i) => (await a(i), null)
      }
    )
  ] }) : /* @__PURE__ */ c.jsx(Ua, { density: "airy", children: /* @__PURE__ */ c.jsx(
    Oc,
    {
      title: "No character selected.",
      hint: "Pick one on the left or + Add"
    }
  ) });
}
function MU(t) {
  const { mapping: a, voiceAssets: i, allMappings: l } = t, o = i.find((N) => N.voiceAssetId === a.speakerVoiceAssetId) ?? null, d = y.useMemo(
    () => l.filter(
      (N) => N.isActive && N.speakerVoiceAssetId === a.speakerVoiceAssetId
    ).map((N) => N.characterName),
    [l, a.speakerVoiceAssetId]
  ), h = i.find((N) => N.voiceAssetId === a.defaultEmotionVoiceAssetId) ?? null, [m, g] = y.useState(""), [p, b] = y.useState("mp3"), [v, S] = y.useState("idle"), [w, j] = y.useState(null), T = y.useRef(!1);
  y.useEffect(() => (T.current = !1, () => {
    T.current = !0;
  }), []);
  const M = y.useCallback(async () => {
    T.current = !1, S("running"), j(null);
    const N = await t.onTestLine(m, p);
    if (T.current) return;
    if (!N) {
      S("error"), j("Failed to enqueue test-line run.");
      return;
    }
    const { runId: k } = N;
    for (let A = 0; A < 60; A += 1) {
      if (await new Promise((C) => setTimeout(C, 500)), T.current) return;
      try {
        const C = await $h(t.deploymentId, k);
        if (T.current) return;
        if (C.status === "completed") {
          S("done");
          return;
        }
        if (C.status === "failed" || C.status === "cancelled") {
          S("error"), j(`Run ${C.status}.`);
          return;
        }
      } catch (C) {
        if (T.current) return;
        S("error"), j(C instanceof Error ? C.message : "unknown error");
        return;
      }
    }
    T.current || (S("error"), j("test-line timed out after 30s"));
  }, [t.onTestLine, t.deploymentId, m, p]);
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsxs("header", { className: sU, children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("p", { className: Pr, children: "Character" }),
        /* @__PURE__ */ c.jsx("h2", { className: lU, children: a.characterName })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: BS, children: /* @__PURE__ */ c.jsx($e, { variant: "danger", size: "sm", onClick: t.onDelete, children: "Deactivate" }) })
    ] }),
    /* @__PURE__ */ c.jsxs(
      Ua,
      {
        tone: "muted",
        density: "compact",
        elevation: "none",
        className: yU,
        "aria-label": "Test line synthesis",
        children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "text",
              className: bU,
              placeholder: `[${a.characterName}] This is a test of the voice.`,
              value: m,
              onChange: (N) => g(N.currentTarget.value),
              "aria-label": "Test-line text",
              disabled: v === "running"
            }
          ),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Gi,
              value: p,
              onChange: (N) => b(N.currentTarget.value),
              "aria-label": "Test-line output format",
              disabled: v === "running",
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "mp3", children: "mp3" }),
                /* @__PURE__ */ c.jsx("option", { value: "wav", children: "wav" }),
                /* @__PURE__ */ c.jsx("option", { value: "flac", children: "flac" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsx(
            $e,
            {
              variant: "primary",
              size: "sm",
              onClick: () => void M(),
              disabled: v === "running",
              children: v === "running" ? "Synthesising…" : "Test this line"
            }
          ),
          v === "done" && /* @__PURE__ */ c.jsx(Zr, { tone: "success", children: "Synthesised — see host logs for output path." }),
          v === "error" && w && /* @__PURE__ */ c.jsx(Zr, { tone: "danger", children: w })
        ]
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: oU, children: [
      /* @__PURE__ */ c.jsxs(Ua, { density: "comfortable", "aria-labelledby": "identity-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "identity-heading", className: Pr, children: "01 / Identity & Performance" }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Character name" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: Gi,
              value: a.characterName,
              onChange: (N) => t.onNameChange(N.currentTarget.value),
              onBlur: (N) => t.onNameBlur(N.currentTarget.value)
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion mode" }),
          /* @__PURE__ */ c.jsx(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionMode,
              onChange: (N) => t.onModeChange(N.currentTarget.value),
              children: TU.map((N) => /* @__PURE__ */ c.jsx("option", { value: N, children: OU(N) }, N))
            }
          )
        ] }),
        a.defaultEmotionMode === "qwen_template" && /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Fr, children: [
            "Qwen template (use ",
            "{seg}",
            " for the line text)"
          ] }),
          /* @__PURE__ */ c.jsx(
            "textarea",
            {
              className: cU,
              value: a.defaultQwenTemplate ?? "",
              onChange: (N) => t.onQwenChange(N.currentTarget.value),
              onBlur: (N) => t.onQwenBlur(N.currentTarget.value)
            }
          )
        ] }),
        a.defaultEmotionMode === "audio_ref" && /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion reference" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Gi,
              value: a.defaultEmotionVoiceAssetId ?? "",
              onChange: (N) => t.onEmotionVoiceChange(N.currentTarget.value),
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "", children: "— none —" }),
                i.map((N) => /* @__PURE__ */ c.jsxs("option", { value: N.voiceAssetId, children: [
                  N.displayName,
                  " · ",
                  N.kind
                ] }, N.voiceAssetId))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: il, children: [
          /* @__PURE__ */ c.jsxs("span", { className: Fr, children: [
            "Speed · ",
            a.defaultSpeedFactor?.toFixed(2) ?? "—",
            "×"
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.05,
              value: a.defaultSpeedFactor ?? 1,
              onChange: (N) => t.onSpeedChange(Number(N.currentTarget.value)),
              onMouseUp: (N) => t.onSpeedCommit(Number(N.currentTarget.value)),
              onTouchEnd: (N) => t.onSpeedCommit(Number(N.currentTarget.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs(Ua, { density: "comfortable", "aria-labelledby": "voice-heading", children: [
        /* @__PURE__ */ c.jsx("h3", { id: "voice-heading", className: Pr, children: "02 / Voice Reference" }),
        /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Speaker reference" }),
        /* @__PURE__ */ c.jsx(
          _U,
          {
            value: a.speakerVoiceAssetId,
            voices: i,
            onChange: t.onSpeakerChange
          }
        ),
        o && /* @__PURE__ */ c.jsx(tx, { voice: o }),
        /* @__PURE__ */ c.jsx(
          $S,
          {
            label: o ? "Replace speaker audio" : "Drop or click to upload speaker audio",
            onFile: (N) => t.onUploadVoice(N, N.name.replace(/\..+$/, ""), "speaker")
          }
        ),
        o && /* @__PURE__ */ c.jsx(
          F8,
          {
            voiceAsset: o,
            deploymentId: t.deploymentId,
            affectedCharacterNames: d,
            onChainPersisted: t.onEditChainPersisted,
            onError: t.onEditError
          }
        ),
        h && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          /* @__PURE__ */ c.jsx("span", { className: Fr, children: "Emotion reference voice" }),
          /* @__PURE__ */ c.jsx(tx, { voice: h })
        ] })
      ] })
    ] })
  ] });
}
function _U({
  value: t,
  voices: a,
  onChange: i
}) {
  return /* @__PURE__ */ c.jsxs(
    "select",
    {
      className: Gi,
      value: t,
      onChange: (l) => i(l.currentTarget.value),
      "aria-label": "Speaker reference voice",
      children: [
        a.length === 0 && /* @__PURE__ */ c.jsx("option", { value: "", children: "— upload a voice first —" }),
        a.map((l) => /* @__PURE__ */ c.jsx("option", { value: l.voiceAssetId, children: l.displayName }, l.voiceAssetId))
      ]
    }
  );
}
function tx({ voice: t }) {
  const a = LU(t.durationMs ?? null);
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs("div", { className: hU, children: [
      /* @__PURE__ */ c.jsx("span", { children: t.displayName }),
      /* @__PURE__ */ c.jsx("span", { children: t.kind }),
      t.durationMs != null && /* @__PURE__ */ c.jsx("span", { children: UU(t.durationMs) }),
      t.sampleRate && /* @__PURE__ */ c.jsxs("span", { children: [
        t.sampleRate,
        " Hz"
      ] })
    ] }),
    t.durationMs != null && /* @__PURE__ */ c.jsxs("div", { className: mU, children: [
      /* @__PURE__ */ c.jsx("div", { className: pU, children: /* @__PURE__ */ c.jsx(um, { features: mm, children: /* @__PURE__ */ c.jsx(
        hm.div,
        {
          className: vU,
          initial: { width: 0 },
          animate: {
            width: `${Math.min(100, t.durationMs / 6e4 * 100)}%`
          },
          transition: { duration: 0.35 }
        }
      ) }) }),
      a && /* @__PURE__ */ c.jsx(Zr, { tone: a.level === "warn" ? "warning" : "danger", children: a.message })
    ] }),
    /* @__PURE__ */ c.jsx(AU, { seed: t.contentSha256 })
  ] });
}
function AU({ seed: t }) {
  const a = y.useMemo(() => BU(t, 48), [t]);
  return /* @__PURE__ */ c.jsx("div", { className: xU, "aria-hidden": "true", children: a.map((i, l) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: SU,
      style: { height: `${Math.max(6, i * 100)}%` }
    },
    `${t}-${l}`
  )) });
}
function $S({
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
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: o ? fU : i ? dU : uU,
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
        /* @__PURE__ */ c.jsx(
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
function DU({
  onExport: t,
  onImport: a,
  onParseError: i
}) {
  const [l, o] = y.useState("error"), d = y.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: BS, children: [
    /* @__PURE__ */ c.jsx($e, { variant: "secondary", size: "sm", onClick: t, children: "Export JSON" }),
    /* @__PURE__ */ c.jsx(
      "input",
      {
        ref: d,
        type: "file",
        accept: "application/json,.json",
        className: NU,
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
    /* @__PURE__ */ c.jsx($e, { variant: "secondary", size: "sm", onClick: () => d.current?.click(), children: "Import JSON" }),
    /* @__PURE__ */ c.jsxs(
      "select",
      {
        className: Gi,
        value: l,
        onChange: (h) => o(h.currentTarget.value),
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
function zU(t) {
  const a = new Set(t.map((l) => l.characterName.toLowerCase()));
  let i = 1;
  for (; a.has(`character ${i}`); ) i += 1;
  return `Character ${i}`;
}
function kU(t) {
  const a = t.trim().charAt(0);
  return a ? a.toUpperCase() : "?";
}
function OU(t) {
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
function LU(t) {
  return t == null ? null : t < 1e3 ? { level: "danger", message: "Clip is under 1 s — IndexTTS needs more reference." } : t > 6e4 ? {
    level: "danger",
    message: "Over 60 s — IndexTTS works best with 10–30 s clips."
  } : t > 3e4 ? { level: "warn", message: "Over 30 s — consider trimming for faster encoding." } : null;
}
function UU(t) {
  return t < 1e3 ? `${t} ms` : `${Math.round(t / 100) / 10}s`;
}
function BU(t, a) {
  const i = [];
  for (let l = 0; l < a; l += 1) {
    const o = t.charCodeAt(l % t.length);
    i.push((o * 31 + l * 7) % 100 / 100);
  }
  return i;
}
function $U(t, a) {
  const i = new Blob([JSON.stringify(t, null, 2)], { type: "application/json" }), l = URL.createObjectURL(i), o = document.createElement("a");
  o.href = l, o.download = a, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(l);
}
function mr(t) {
  return t instanceof es || t instanceof Error ? t.message : "unknown error";
}
function VU() {
  return [
    {
      path: "/",
      loader: async () => {
        const { deployments: t } = await jT();
        return { deployments: t };
      },
      Component: lC
    },
    {
      path: "/:deploymentId",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId");
        return AE(`/${a}/recipe`);
      }
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: l }, { runs: o }, d] = await Promise.all([
          Ly(a),
          Uy(a),
          CT(a, { limit: 10 }),
          kT(a)
        ]);
        return { deployment: i, mappings: l, runs: o, workflow: d };
      },
      Component: g6
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), i = Vi(t, "runId");
        return { run: await $h(a, i) };
      },
      Component: CL
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params: t }) => {
        const a = Vi(t, "deploymentId"), [i, { mappings: l }, { voiceAssets: o }] = await Promise.all([
          Ly(a),
          Uy(a),
          Ki(a)
        ]);
        return { deployment: i, mappings: l, voiceAssets: o };
      },
      Component: CU
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params: t, request: a }) => {
        const i = Vi(t, "deploymentId"), l = new URL(a.url);
        return {
          deploymentId: i,
          prefillCharacterName: l.searchParams.get("character") ?? ""
        };
      },
      Component: s8
    },
    {
      path: "/runtime/queue",
      Component: n8
    }
  ];
}
function Vi(t, a) {
  const i = t[a];
  if (!i)
    throw new Response(`Missing path parameter: ${a}`, { status: 400 });
  return i;
}
const nx = "ext-actions-request", HU = "ext-actions-declare", qU = "ext-action-state", ax = "ext-action-invoke", Sh = "emotion-tts:navigate", qi = "emotion-tts.run", rx = "emotion-tts.mappings", IU = 4e3;
function FU(t, a) {
  let i = null, l = !1;
  const o = () => {
    const j = i?.badge ?? "not_installed";
    return YU(j, l);
  }, d = () => ({
    primary: o(),
    secondary: {
      id: rx,
      label: "Mappings",
      icon: "tune",
      tone: "secondary",
      tooltip: "Manage character → voice mappings"
    }
  }), h = () => {
    t.dispatchEvent(
      new CustomEvent(HU, {
        detail: { actions: d() },
        bubbles: !1
      })
    );
  }, m = () => {
    t.dispatchEvent(
      new CustomEvent(qU, {
        detail: { action: o() },
        bubbles: !1
      })
    );
  }, g = () => h(), p = (j) => {
    const T = j.detail?.id;
    T === qi ? b() : T === rx && t.dispatchEvent(
      new CustomEvent(Sh, {
        detail: { path: `/${a}/mappings` },
        bubbles: !1
      })
    );
  }, b = async () => {
    const j = i?.badge ?? "not_installed", T = j === "ready" || j === "running" || j === "starting";
    l = !0, m();
    try {
      T ? await s_() : await i_();
      try {
        i = await bc();
      } catch {
      }
    } catch {
    } finally {
      l = !1, m();
    }
  };
  t.addEventListener(nx, g), t.addEventListener(ax, p);
  let v = !1;
  const S = async () => {
    try {
      const j = await bc();
      if (v) return;
      i = j, m();
    } catch {
    }
  };
  S();
  const w = window.setInterval(() => void S(), IU);
  return h(), {
    dispose: () => {
      v = !0, window.clearInterval(w), t.removeEventListener(nx, g), t.removeEventListener(ax, p);
    }
  };
}
function YU(t, a) {
  const i = t === "ready" || t === "running" || t === "starting", l = t === "stopped" || t === "not_installed" || t === "failed";
  return a ? {
    id: qi,
    label: i ? "Stopping…" : "Starting…",
    icon: i ? "stop" : "play_arrow",
    tone: "primary",
    state: "loading"
  } : t === "starting" || t === "installing" || t === "stopping" ? {
    id: qi,
    label: Qx(t),
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
const wh = "emotion-tts-app", GU = "ext-event", ix = "emotion-tts-stylesheet", sx = ["accent", "density", "card"];
function XU(t) {
  if (!(typeof document > "u" || !document.body))
    return document.body.dataset[t];
}
function PU() {
  if (typeof document > "u" || document.getElementById(ix)) return;
  const t = new URL("./emotion-tts.css", import.meta.url).href, a = document.createElement("link");
  a.id = ix, a.rel = "stylesheet", a.href = t, document.head.appendChild(a);
}
PU();
class KU extends HTMLElement {
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
    this.root = nE.createRoot(this), this.syncTweaksFromBody(), this.observeBodyTweaks(), this.installNavigateListener(), this.paint(), this.refreshActionBridge();
  }
  attributeChangedCallback() {
    this.paint(), this.refreshActionBridge();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null, this.observer?.disconnect(), this.observer = null, this.actionBridge?.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null, this.navigateListener && (this.removeEventListener(Sh, this.navigateListener), this.navigateListener = null), this.router = null;
  }
  refreshActionBridge() {
    const a = this.getAttribute("deployment-id");
    a && a !== this.actionBridgeDeploymentId ? (this.actionBridge?.dispose(), this.actionBridge = FU(this, a), this.actionBridgeDeploymentId = a) : !a && this.actionBridge && (this.actionBridge.dispose(), this.actionBridge = null, this.actionBridgeDeploymentId = null);
  }
  installNavigateListener() {
    if (this.navigateListener) return;
    const a = (i) => {
      const l = i.detail?.path;
      l && this.router && this.router.navigate(l);
    };
    this.navigateListener = a, this.addEventListener(Sh, a);
  }
  syncTweaksFromBody() {
    for (const a of sx) {
      const i = XU(a);
      i === void 0 ? delete this.dataset[a] : this.dataset[a] !== i && (this.dataset[a] = i);
    }
  }
  observeBodyTweaks() {
    typeof MutationObserver > "u" || !document.body || (this.observer && this.observer.disconnect(), this.observer = new MutationObserver(() => this.syncTweaksFromBody()), this.observer.observe(document.body, {
      attributes: !0,
      attributeFilter: sx.map((a) => `data-${a}`)
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
    const a = this.resolveInitialEntry(), i = BN(VU(), { initialEntries: [a] });
    this.router = i, this.root.render(
      /* @__PURE__ */ c.jsx(y.StrictMode, { children: /* @__PURE__ */ c.jsx(VN, { router: i }) })
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
      new CustomEvent(GU, {
        detail: { topic: a, payload: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
function QU() {
  typeof customElements > "u" || customElements.get(wh) || customElements.define(wh, KU);
}
typeof customElements < "u" && !customElements.get(wh) && QU();
export {
  QU as register
};
//# sourceMappingURL=emotion-tts.js.map
