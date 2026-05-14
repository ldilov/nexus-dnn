function z0(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var Kf = { exports: {} }, ln = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sm;
function A0() {
  if (Sm) return ln;
  Sm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.fragment");
  function h(s, j, R) {
    var x = null;
    if (R !== void 0 && (x = "" + R), j.key !== void 0 && (x = "" + j.key), "key" in j) {
      R = {};
      for (var q in j)
        q !== "key" && (R[q] = j[q]);
    } else R = j;
    return j = R.ref, {
      $$typeof: f,
      type: s,
      key: x,
      ref: j !== void 0 ? j : null,
      props: R
    };
  }
  return ln.Fragment = b, ln.jsx = h, ln.jsxs = h, ln;
}
var bm;
function N0() {
  return bm || (bm = 1, Kf.exports = A0()), Kf.exports;
}
var m = N0(), Jf = { exports: {} }, W = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pm;
function O0() {
  if (pm) return W;
  pm = 1;
  var f = Symbol.for("react.transitional.element"), b = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), x = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), z = Symbol.for("react.activity"), H = Symbol.iterator;
  function V(d) {
    return d === null || typeof d != "object" ? null : (d = H && d[H] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var al = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, P = Object.assign, Sl = {};
  function Hl(d, O, U) {
    this.props = d, this.context = O, this.refs = Sl, this.updater = U || al;
  }
  Hl.prototype.isReactComponent = {}, Hl.prototype.setState = function(d, O) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, O, "setState");
  }, Hl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function L() {
  }
  L.prototype = Hl.prototype;
  function Ml(d, O, U) {
    this.props = d, this.context = O, this.refs = Sl, this.updater = U || al;
  }
  var Yl = Ml.prototype = new L();
  Yl.constructor = Ml, P(Yl, Hl.prototype), Yl.isPureReactComponent = !0;
  var hl = Array.isArray;
  function ol() {
  }
  var K = { H: null, A: null, T: null, S: null }, Ul = Object.prototype.hasOwnProperty;
  function cl(d, O, U) {
    var B = U.ref;
    return {
      $$typeof: f,
      type: d,
      key: O,
      ref: B !== void 0 ? B : null,
      props: U
    };
  }
  function it(d, O) {
    return cl(d.type, O, d.props);
  }
  function J(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function zl(d) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(U) {
      return O[U];
    });
  }
  var ct = /\/+/g;
  function Gl(d, O) {
    return typeof d == "object" && d !== null && d.key != null ? zl("" + d.key) : O.toString(36);
  }
  function Fl(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(ol, ol) : (d.status = "pending", d.then(
          function(O) {
            d.status === "pending" && (d.status = "fulfilled", d.value = O);
          },
          function(O) {
            d.status === "pending" && (d.status = "rejected", d.reason = O);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function E(d, O, U, B, w) {
    var F = typeof d;
    (F === "undefined" || F === "boolean") && (d = null);
    var ll = !1;
    if (d === null) ll = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          ll = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case b:
              ll = !0;
              break;
            case M:
              return ll = d._init, E(
                ll(d._payload),
                O,
                U,
                B,
                w
              );
          }
      }
    if (ll)
      return w = w(d), ll = B === "" ? "." + Gl(d, 0) : B, hl(w) ? (U = "", ll != null && (U = ll.replace(ct, "$&/") + "/"), E(w, O, U, "", function(be) {
        return be;
      })) : w != null && (J(w) && (w = it(
        w,
        U + (w.key == null || d && d.key === w.key ? "" : ("" + w.key).replace(
          ct,
          "$&/"
        ) + "/") + ll
      )), O.push(w)), 1;
    ll = 0;
    var Xl = B === "" ? "." : B + ":";
    if (hl(d))
      for (var Cl = 0; Cl < d.length; Cl++)
        B = d[Cl], F = Xl + Gl(B, Cl), ll += E(
          B,
          O,
          U,
          F,
          w
        );
    else if (Cl = V(d), typeof Cl == "function")
      for (d = Cl.call(d), Cl = 0; !(B = d.next()).done; )
        B = B.value, F = Xl + Gl(B, Cl++), ll += E(
          B,
          O,
          U,
          F,
          w
        );
    else if (F === "object") {
      if (typeof d.then == "function")
        return E(
          Fl(d),
          O,
          U,
          B,
          w
        );
      throw O = String(d), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ll;
  }
  function C(d, O, U) {
    if (d == null) return d;
    var B = [], w = 0;
    return E(d, B, "", "", function(F) {
      return O.call(U, F, w++);
    }), B;
  }
  function Q(d) {
    if (d._status === -1) {
      var O = d._result;
      O = O(), O.then(
        function(U) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = U);
        },
        function(U) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = U);
        }
      ), d._status === -1 && (d._status = 0, d._result = O);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ml = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, sl = {
    map: C,
    forEach: function(d, O, U) {
      C(
        d,
        function() {
          O.apply(this, arguments);
        },
        U
      );
    },
    count: function(d) {
      var O = 0;
      return C(d, function() {
        O++;
      }), O;
    },
    toArray: function(d) {
      return C(d, function(O) {
        return O;
      }) || [];
    },
    only: function(d) {
      if (!J(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return W.Activity = z, W.Children = sl, W.Component = Hl, W.Fragment = h, W.Profiler = j, W.PureComponent = Ml, W.StrictMode = s, W.Suspense = A, W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, W.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return K.H.useMemoCache(d);
    }
  }, W.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, W.cacheSignal = function() {
    return null;
  }, W.cloneElement = function(d, O, U) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var B = P({}, d.props), w = d.key;
    if (O != null)
      for (F in O.key !== void 0 && (w = "" + O.key), O)
        !Ul.call(O, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && O.ref === void 0 || (B[F] = O[F]);
    var F = arguments.length - 2;
    if (F === 1) B.children = U;
    else if (1 < F) {
      for (var ll = Array(F), Xl = 0; Xl < F; Xl++)
        ll[Xl] = arguments[Xl + 2];
      B.children = ll;
    }
    return cl(d.type, w, B);
  }, W.createContext = function(d) {
    return d = {
      $$typeof: x,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: R,
      _context: d
    }, d;
  }, W.createElement = function(d, O, U) {
    var B, w = {}, F = null;
    if (O != null)
      for (B in O.key !== void 0 && (F = "" + O.key), O)
        Ul.call(O, B) && B !== "key" && B !== "__self" && B !== "__source" && (w[B] = O[B]);
    var ll = arguments.length - 2;
    if (ll === 1) w.children = U;
    else if (1 < ll) {
      for (var Xl = Array(ll), Cl = 0; Cl < ll; Cl++)
        Xl[Cl] = arguments[Cl + 2];
      w.children = Xl;
    }
    if (d && d.defaultProps)
      for (B in ll = d.defaultProps, ll)
        w[B] === void 0 && (w[B] = ll[B]);
    return cl(d, F, w);
  }, W.createRef = function() {
    return { current: null };
  }, W.forwardRef = function(d) {
    return { $$typeof: q, render: d };
  }, W.isValidElement = J, W.lazy = function(d) {
    return {
      $$typeof: M,
      _payload: { _status: -1, _result: d },
      _init: Q
    };
  }, W.memo = function(d, O) {
    return {
      $$typeof: S,
      type: d,
      compare: O === void 0 ? null : O
    };
  }, W.startTransition = function(d) {
    var O = K.T, U = {};
    K.T = U;
    try {
      var B = d(), w = K.S;
      w !== null && w(U, B), typeof B == "object" && B !== null && typeof B.then == "function" && B.then(ol, ml);
    } catch (F) {
      ml(F);
    } finally {
      O !== null && U.types !== null && (O.types = U.types), K.T = O;
    }
  }, W.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, W.use = function(d) {
    return K.H.use(d);
  }, W.useActionState = function(d, O, U) {
    return K.H.useActionState(d, O, U);
  }, W.useCallback = function(d, O) {
    return K.H.useCallback(d, O);
  }, W.useContext = function(d) {
    return K.H.useContext(d);
  }, W.useDebugValue = function() {
  }, W.useDeferredValue = function(d, O) {
    return K.H.useDeferredValue(d, O);
  }, W.useEffect = function(d, O) {
    return K.H.useEffect(d, O);
  }, W.useEffectEvent = function(d) {
    return K.H.useEffectEvent(d);
  }, W.useId = function() {
    return K.H.useId();
  }, W.useImperativeHandle = function(d, O, U) {
    return K.H.useImperativeHandle(d, O, U);
  }, W.useInsertionEffect = function(d, O) {
    return K.H.useInsertionEffect(d, O);
  }, W.useLayoutEffect = function(d, O) {
    return K.H.useLayoutEffect(d, O);
  }, W.useMemo = function(d, O) {
    return K.H.useMemo(d, O);
  }, W.useOptimistic = function(d, O) {
    return K.H.useOptimistic(d, O);
  }, W.useReducer = function(d, O, U) {
    return K.H.useReducer(d, O, U);
  }, W.useRef = function(d) {
    return K.H.useRef(d);
  }, W.useState = function(d) {
    return K.H.useState(d);
  }, W.useSyncExternalStore = function(d, O, U) {
    return K.H.useSyncExternalStore(
      d,
      O,
      U
    );
  }, W.useTransition = function() {
    return K.H.useTransition();
  }, W.version = "19.2.6", W;
}
var _m;
function Mi() {
  return _m || (_m = 1, Jf.exports = O0()), Jf.exports;
}
var $ = Mi();
const vs = /* @__PURE__ */ z0($);
var wf = { exports: {} }, tn = {}, $f = { exports: {} }, Wf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;
function D0() {
  return Em || (Em = 1, (function(f) {
    function b(E, C) {
      var Q = E.length;
      E.push(C);
      l: for (; 0 < Q; ) {
        var ml = Q - 1 >>> 1, sl = E[ml];
        if (0 < j(sl, C))
          E[ml] = C, E[Q] = sl, Q = ml;
        else break l;
      }
    }
    function h(E) {
      return E.length === 0 ? null : E[0];
    }
    function s(E) {
      if (E.length === 0) return null;
      var C = E[0], Q = E.pop();
      if (Q !== C) {
        E[0] = Q;
        l: for (var ml = 0, sl = E.length, d = sl >>> 1; ml < d; ) {
          var O = 2 * (ml + 1) - 1, U = E[O], B = O + 1, w = E[B];
          if (0 > j(U, Q))
            B < sl && 0 > j(w, U) ? (E[ml] = w, E[B] = Q, ml = B) : (E[ml] = U, E[O] = Q, ml = O);
          else if (B < sl && 0 > j(w, Q))
            E[ml] = w, E[B] = Q, ml = B;
          else break l;
        }
      }
      return C;
    }
    function j(E, C) {
      var Q = E.sortIndex - C.sortIndex;
      return Q !== 0 ? Q : E.id - C.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      f.unstable_now = function() {
        return R.now();
      };
    } else {
      var x = Date, q = x.now();
      f.unstable_now = function() {
        return x.now() - q;
      };
    }
    var A = [], S = [], M = 1, z = null, H = 3, V = !1, al = !1, P = !1, Sl = !1, Hl = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, Ml = typeof setImmediate < "u" ? setImmediate : null;
    function Yl(E) {
      for (var C = h(S); C !== null; ) {
        if (C.callback === null) s(S);
        else if (C.startTime <= E)
          s(S), C.sortIndex = C.expirationTime, b(A, C);
        else break;
        C = h(S);
      }
    }
    function hl(E) {
      if (P = !1, Yl(E), !al)
        if (h(A) !== null)
          al = !0, ol || (ol = !0, zl());
        else {
          var C = h(S);
          C !== null && Fl(hl, C.startTime - E);
        }
    }
    var ol = !1, K = -1, Ul = 5, cl = -1;
    function it() {
      return Sl ? !0 : !(f.unstable_now() - cl < Ul);
    }
    function J() {
      if (Sl = !1, ol) {
        var E = f.unstable_now();
        cl = E;
        var C = !0;
        try {
          l: {
            al = !1, P && (P = !1, L(K), K = -1), V = !0;
            var Q = H;
            try {
              t: {
                for (Yl(E), z = h(A); z !== null && !(z.expirationTime > E && it()); ) {
                  var ml = z.callback;
                  if (typeof ml == "function") {
                    z.callback = null, H = z.priorityLevel;
                    var sl = ml(
                      z.expirationTime <= E
                    );
                    if (E = f.unstable_now(), typeof sl == "function") {
                      z.callback = sl, Yl(E), C = !0;
                      break t;
                    }
                    z === h(A) && s(A), Yl(E);
                  } else s(A);
                  z = h(A);
                }
                if (z !== null) C = !0;
                else {
                  var d = h(S);
                  d !== null && Fl(
                    hl,
                    d.startTime - E
                  ), C = !1;
                }
              }
              break l;
            } finally {
              z = null, H = Q, V = !1;
            }
            C = void 0;
          }
        } finally {
          C ? zl() : ol = !1;
        }
      }
    }
    var zl;
    if (typeof Ml == "function")
      zl = function() {
        Ml(J);
      };
    else if (typeof MessageChannel < "u") {
      var ct = new MessageChannel(), Gl = ct.port2;
      ct.port1.onmessage = J, zl = function() {
        Gl.postMessage(null);
      };
    } else
      zl = function() {
        Hl(J, 0);
      };
    function Fl(E, C) {
      K = Hl(function() {
        E(f.unstable_now());
      }, C);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, f.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ul = 0 < E ? Math.floor(1e3 / E) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return H;
    }, f.unstable_next = function(E) {
      switch (H) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = H;
      }
      var Q = H;
      H = C;
      try {
        return E();
      } finally {
        H = Q;
      }
    }, f.unstable_requestPaint = function() {
      Sl = !0;
    }, f.unstable_runWithPriority = function(E, C) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var Q = H;
      H = E;
      try {
        return C();
      } finally {
        H = Q;
      }
    }, f.unstable_scheduleCallback = function(E, C, Q) {
      var ml = f.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? ml + Q : ml) : Q = ml, E) {
        case 1:
          var sl = -1;
          break;
        case 2:
          sl = 250;
          break;
        case 5:
          sl = 1073741823;
          break;
        case 4:
          sl = 1e4;
          break;
        default:
          sl = 5e3;
      }
      return sl = Q + sl, E = {
        id: M++,
        callback: C,
        priorityLevel: E,
        startTime: Q,
        expirationTime: sl,
        sortIndex: -1
      }, Q > ml ? (E.sortIndex = Q, b(S, E), h(A) === null && E === h(S) && (P ? (L(K), K = -1) : P = !0, Fl(hl, Q - ml))) : (E.sortIndex = sl, b(A, E), al || V || (al = !0, ol || (ol = !0, zl()))), E;
    }, f.unstable_shouldYield = it, f.unstable_wrapCallback = function(E) {
      var C = H;
      return function() {
        var Q = H;
        H = C;
        try {
          return E.apply(this, arguments);
        } finally {
          H = Q;
        }
      };
    };
  })(Wf)), Wf;
}
var Tm;
function x0() {
  return Tm || (Tm = 1, $f.exports = D0()), $f.exports;
}
var Ff = { exports: {} }, ut = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function M0() {
  if (zm) return ut;
  zm = 1;
  var f = Mi();
  function b(A) {
    var S = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var M = 2; M < arguments.length; M++)
        S += "&args[]=" + encodeURIComponent(arguments[M]);
    }
    return "Minified React error #" + A + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h() {
  }
  var s = {
    d: {
      f: h,
      r: function() {
        throw Error(b(522));
      },
      D: h,
      C: h,
      L: h,
      m: h,
      X: h,
      S: h,
      M: h
    },
    p: 0,
    findDOMNode: null
  }, j = Symbol.for("react.portal");
  function R(A, S, M) {
    var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: j,
      key: z == null ? null : "" + z,
      children: A,
      containerInfo: S,
      implementation: M
    };
  }
  var x = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(A, S) {
    if (A === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return ut.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ut.createPortal = function(A, S) {
    var M = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(b(299));
    return R(A, S, null, M);
  }, ut.flushSync = function(A) {
    var S = x.T, M = s.p;
    try {
      if (x.T = null, s.p = 2, A) return A();
    } finally {
      x.T = S, s.p = M, s.d.f();
    }
  }, ut.preconnect = function(A, S) {
    typeof A == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, s.d.C(A, S));
  }, ut.prefetchDNS = function(A) {
    typeof A == "string" && s.d.D(A);
  }, ut.preinit = function(A, S) {
    if (typeof A == "string" && S && typeof S.as == "string") {
      var M = S.as, z = q(M, S.crossOrigin), H = typeof S.integrity == "string" ? S.integrity : void 0, V = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      M === "style" ? s.d.S(
        A,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: z,
          integrity: H,
          fetchPriority: V
        }
      ) : M === "script" && s.d.X(A, {
        crossOrigin: z,
        integrity: H,
        fetchPriority: V,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, ut.preinitModule = function(A, S) {
    if (typeof A == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var M = q(
            S.as,
            S.crossOrigin
          );
          s.d.M(A, {
            crossOrigin: M,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0
          });
        }
      } else S == null && s.d.M(A);
  }, ut.preload = function(A, S) {
    if (typeof A == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var M = S.as, z = q(M, S.crossOrigin);
      s.d.L(A, M, {
        crossOrigin: z,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, ut.preloadModule = function(A, S) {
    if (typeof A == "string")
      if (S) {
        var M = q(S.as, S.crossOrigin);
        s.d.m(A, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: M,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0
        });
      } else s.d.m(A);
  }, ut.requestFormReset = function(A) {
    s.d.r(A);
  }, ut.unstable_batchedUpdates = function(A, S) {
    return A(S);
  }, ut.useFormState = function(A, S, M) {
    return x.H.useFormState(A, S, M);
  }, ut.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, ut.version = "19.2.6", ut;
}
var Am;
function j0() {
  if (Am) return Ff.exports;
  Am = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), Ff.exports = M0(), Ff.exports;
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
var Nm;
function R0() {
  if (Nm) return tn;
  Nm = 1;
  var f = x0(), b = Mi(), h = j0();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function j(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function R(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function x(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function q(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function A(l) {
    if (R(l) !== l)
      throw Error(s(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (t = R(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return A(u), l;
          if (n === a) return A(u), t;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? l : t;
  }
  function M(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = M(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var z = Object.assign, H = Symbol.for("react.element"), V = Symbol.for("react.transitional.element"), al = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), Sl = Symbol.for("react.strict_mode"), Hl = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), Ml = Symbol.for("react.context"), Yl = Symbol.for("react.forward_ref"), hl = Symbol.for("react.suspense"), ol = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), Ul = Symbol.for("react.lazy"), cl = Symbol.for("react.activity"), it = Symbol.for("react.memo_cache_sentinel"), J = Symbol.iterator;
  function zl(l) {
    return l === null || typeof l != "object" ? null : (l = J && l[J] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var ct = Symbol.for("react.client.reference");
  function Gl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ct ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case P:
        return "Fragment";
      case Hl:
        return "Profiler";
      case Sl:
        return "StrictMode";
      case hl:
        return "Suspense";
      case ol:
        return "SuspenseList";
      case cl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case al:
          return "Portal";
        case Ml:
          return l.displayName || "Context";
        case L:
          return (l._context.displayName || "Context") + ".Consumer";
        case Yl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case K:
          return t = l.displayName || null, t !== null ? t : Gl(l.type) || "Memo";
        case Ul:
          t = l._payload, l = l._init;
          try {
            return Gl(l(t));
          } catch {
          }
      }
    return null;
  }
  var Fl = Array.isArray, E = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ml = [], sl = -1;
  function d(l) {
    return { current: l };
  }
  function O(l) {
    0 > sl || (l.current = ml[sl], ml[sl] = null, sl--);
  }
  function U(l, t) {
    sl++, ml[sl] = l.current, l.current = t;
  }
  var B = d(null), w = d(null), F = d(null), ll = d(null);
  function Xl(l, t) {
    switch (U(F, t), U(w, l), U(B, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Qd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Qd(t), l = Vd(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    O(B), U(B, l);
  }
  function Cl() {
    O(B), O(w), O(F);
  }
  function be(l) {
    l.memoizedState !== null && U(ll, l);
    var t = B.current, e = Vd(t, l.type);
    t !== e && (U(w, l), U(B, e));
  }
  function We(l) {
    w.current === l && (O(B), O(w)), ll.current === l && (O(ll), Fu._currentValue = Q);
  }
  var iu, cn;
  function pt(l) {
    if (iu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        iu = t && t[1] || "", cn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + iu + l + cn;
  }
  var ga = !1;
  function fn(l, t) {
    if (!l || ga) return "";
    ga = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var D = function() {
                throw Error();
              };
              if (Object.defineProperty(D.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(D, []);
                } catch (_) {
                  var p = _;
                }
                Reflect.construct(l, [], D);
              } else {
                try {
                  D.call();
                } catch (_) {
                  p = _;
                }
                l.call(D.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                p = _;
              }
              (D = l()) && typeof D.catch == "function" && D.catch(function() {
              });
            }
          } catch (_) {
            if (_ && p && typeof _.stack == "string")
              return [_.stack, p.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var o = i.split(`
`), g = c.split(`
`);
        for (u = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < g.length && !g[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === o.length || u === g.length)
          for (a = o.length - 1, u = g.length - 1; 1 <= a && 0 <= u && o[a] !== g[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (o[a] !== g[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || o[a] !== g[u]) {
                  var T = `
` + o[a].replace(" at new ", " at ");
                  return l.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", l.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ga = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? pt(e) : "";
  }
  function bl(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return pt(l.type);
      case 16:
        return pt("Lazy");
      case 13:
        return l.child !== t && t !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return fn(l.type, !1);
      case 11:
        return fn(l.type.render, !1);
      case 1:
        return fn(l.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function jl(l) {
    try {
      var t = "", e = null;
      do
        t += bl(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Al = Object.prototype.hasOwnProperty, Nl = f.unstable_scheduleCallback, ot = f.unstable_cancelCallback, rt = f.unstable_shouldYield, Ql = f.unstable_requestPaint, Ol = f.unstable_now, Fe = f.unstable_getCurrentPriorityLevel, pe = f.unstable_ImmediatePriority, cu = f.unstable_UserBlockingPriority, ke = f.unstable_NormalPriority, dt = f.unstable_LowPriority, jt = f.unstable_IdlePriority, fu = f.log, ji = f.unstable_setDisableYieldValue, Ft = null, _t = null;
  function _e(l) {
    if (typeof fu == "function" && ji(l), _t && typeof _t.setStrictMode == "function")
      try {
        _t.setStrictMode(Ft, l);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : ov, fv = Math.log, sv = Math.LN2;
  function ov(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (fv(l) / sv | 0) | 0;
  }
  var sn = 256, on = 262144, rn = 4194304;
  function Ie(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
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
        return l;
    }
  }
  function dn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = Ie(a) : (i &= c, i !== 0 ? u = Ie(i) : e || (e = c & ~l, e !== 0 && (u = Ie(e))))) : (c = a & ~n, c !== 0 ? u = Ie(c) : i !== 0 ? u = Ie(i) : e || (e = a & ~l, e !== 0 && (u = Ie(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function su(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function rv(l, t) {
    switch (l) {
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
  function _s() {
    var l = rn;
    return rn <<= 1, (rn & 62914560) === 0 && (rn = 4194304), l;
  }
  function Ri(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function ou(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function dv(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, o = l.expirationTimes, g = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Et(e), D = 1 << T;
      c[T] = 0, o[T] = -1;
      var p = g[T];
      if (p !== null)
        for (g[T] = null, T = 0; T < p.length; T++) {
          var _ = p[T];
          _ !== null && (_.lane &= -536870913);
        }
      e &= ~D;
    }
    a !== 0 && Es(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Es(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - Et(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Ts(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - Et(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function zs(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : Ui(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function Ui(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Ci(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function As() {
    var l = C.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : rm(l.type));
  }
  function Ns(l, t) {
    var e = C.p;
    try {
      return C.p = l, t();
    } finally {
      C.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), Pl = "__reactFiber$" + Ee, mt = "__reactProps$" + Ee, Sa = "__reactContainer$" + Ee, Hi = "__reactEvents$" + Ee, mv = "__reactListeners$" + Ee, vv = "__reactHandles$" + Ee, Os = "__reactResources$" + Ee, ru = "__reactMarker$" + Ee;
  function qi(l) {
    delete l[Pl], delete l[mt], delete l[Hi], delete l[mv], delete l[vv];
  }
  function ba(l) {
    var t = l[Pl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Sa] || e[Pl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = Wd(l); l !== null; ) {
            if (e = l[Pl]) return e;
            l = Wd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function pa(l) {
    if (l = l[Pl] || l[Sa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function du(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function _a(l) {
    var t = l[Os];
    return t || (t = l[Os] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function kl(l) {
    l[ru] = !0;
  }
  var Ds = /* @__PURE__ */ new Set(), xs = {};
  function Pe(l, t) {
    Ea(l, t), Ea(l + "Capture", t);
  }
  function Ea(l, t) {
    for (xs[l] = t, l = 0; l < t.length; l++)
      Ds.add(t[l]);
  }
  var hv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ms = {}, js = {};
  function yv(l) {
    return Al.call(js, l) ? !0 : Al.call(Ms, l) ? !1 : hv.test(l) ? js[l] = !0 : (Ms[l] = !0, !1);
  }
  function mn(l, t, e) {
    if (yv(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function vn(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function kt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function Rt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Rs(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function gv(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function Bi(l) {
    if (!l._valueTracker) {
      var t = Rs(l) ? "checked" : "value";
      l._valueTracker = gv(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Us(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Rs(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function hn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Sv = /[\n"\\]/g;
  function Ut(l) {
    return l.replace(
      Sv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Yi(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + Rt(t)) : l.value !== "" + Rt(t) && (l.value = "" + Rt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? Gi(l, i, Rt(t)) : e != null ? Gi(l, i, Rt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Rt(c) : l.removeAttribute("name");
  }
  function Cs(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        Bi(l);
        return;
      }
      e = e != null ? "" + Rt(e) : "", t = t != null ? "" + Rt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), Bi(l);
  }
  function Gi(l, t, e) {
    t === "number" && hn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function Ta(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + Rt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Hs(l, t, e) {
    if (t != null && (t = "" + Rt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + Rt(e) : "";
  }
  function qs(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Fl(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = Rt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), Bi(l);
  }
  function za(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var bv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bs(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || bv.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Ys(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && Bs(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Bs(l, n, t[n]);
  }
  function Xi(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var pv = /* @__PURE__ */ new Map([
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
  ]), _v = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yn(l) {
    return _v.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function It() {
  }
  var Qi = null;
  function Vi(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Aa = null, Na = null;
  function Gs(l) {
    var t = pa(l);
    if (t && (l = t.stateNode)) {
      var e = l[mt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Yi(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Ut(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[mt] || null;
                if (!u) throw Error(s(90));
                Yi(
                  a,
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
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Us(a);
          }
          break l;
        case "textarea":
          Hs(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && Ta(l, !!e.multiple, t, !1);
      }
    }
  }
  var Li = !1;
  function Xs(l, t, e) {
    if (Li) return l(t, e);
    Li = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (Li = !1, (Aa !== null || Na !== null) && (ai(), Aa && (t = Aa, l = Na, Na = Aa = null, Gs(t), l)))
        for (t = 0; t < l.length; t++) Gs(l[t]);
    }
  }
  function mu(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[mt] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
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
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        s(231, t, typeof e)
      );
    return e;
  }
  var Pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zi = !1;
  if (Pt)
    try {
      var vu = {};
      Object.defineProperty(vu, "passive", {
        get: function() {
          Zi = !0;
        }
      }), window.addEventListener("test", vu, vu), window.removeEventListener("test", vu, vu);
    } catch {
      Zi = !1;
    }
  var Te = null, Ki = null, gn = null;
  function Qs() {
    if (gn) return gn;
    var l, t = Ki, e = t.length, a, u = "value" in Te ? Te.value : Te.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return gn = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function Sn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function bn() {
    return !0;
  }
  function Vs() {
    return !1;
  }
  function vt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? bn : Vs, this.isPropagationStopped = Vs, this;
    }
    return z(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = bn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = bn);
      },
      persist: function() {
      },
      isPersistent: bn
    }), t;
  }
  var la = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, pn = vt(la), hu = z({}, la, { view: 0, detail: 0 }), Ev = vt(hu), Ji, wi, yu, _n = z({}, hu, {
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
    getModifierState: Wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== yu && (yu && l.type === "mousemove" ? (Ji = l.screenX - yu.screenX, wi = l.screenY - yu.screenY) : wi = Ji = 0, yu = l), Ji);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : wi;
    }
  }), Ls = vt(_n), Tv = z({}, _n, { dataTransfer: 0 }), zv = vt(Tv), Av = z({}, hu, { relatedTarget: 0 }), $i = vt(Av), Nv = z({}, la, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = vt(Nv), Dv = z({}, la, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), xv = vt(Dv), Mv = z({}, la, { data: 0 }), Zs = vt(Mv), jv = {
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
  }, Rv = {
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
  }, Uv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Cv(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Uv[l]) ? !!t[l] : !1;
  }
  function Wi() {
    return Cv;
  }
  var Hv = z({}, hu, {
    key: function(l) {
      if (l.key) {
        var t = jv[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Sn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Rv[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wi,
    charCode: function(l) {
      return l.type === "keypress" ? Sn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Sn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), qv = vt(Hv), Bv = z({}, _n, {
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
  }), Ks = vt(Bv), Yv = z({}, hu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wi
  }), Gv = vt(Yv), Xv = z({}, la, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qv = vt(Xv), Vv = z({}, _n, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Lv = vt(Vv), Zv = z({}, la, {
    newState: 0,
    oldState: 0
  }), Kv = vt(Zv), Jv = [9, 13, 27, 32], Fi = Pt && "CompositionEvent" in window, gu = null;
  Pt && "documentMode" in document && (gu = document.documentMode);
  var wv = Pt && "TextEvent" in window && !gu, Js = Pt && (!Fi || gu && 8 < gu && 11 >= gu), ws = " ", $s = !1;
  function Ws(l, t) {
    switch (l) {
      case "keyup":
        return Jv.indexOf(t.keyCode) !== -1;
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
  function Fs(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Oa = !1;
  function $v(l, t) {
    switch (l) {
      case "compositionend":
        return Fs(t);
      case "keypress":
        return t.which !== 32 ? null : ($s = !0, ws);
      case "textInput":
        return l = t.data, l === ws && $s ? null : l;
      default:
        return null;
    }
  }
  function Wv(l, t) {
    if (Oa)
      return l === "compositionend" || !Fi && Ws(l, t) ? (l = Qs(), gn = Ki = Te = null, Oa = !1, l) : null;
    switch (l) {
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
        return Js && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Fv = {
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
  function ks(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Fv[l.type] : t === "textarea";
  }
  function Is(l, t, e, a) {
    Aa ? Na ? Na.push(a) : Na = [a] : Aa = a, t = oi(t, "onChange"), 0 < t.length && (e = new pn(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Su = null, bu = null;
  function kv(l) {
    Hd(l, 0);
  }
  function En(l) {
    var t = du(l);
    if (Us(t)) return l;
  }
  function Ps(l, t) {
    if (l === "change") return t;
  }
  var lo = !1;
  if (Pt) {
    var ki;
    if (Pt) {
      var Ii = "oninput" in document;
      if (!Ii) {
        var to = document.createElement("div");
        to.setAttribute("oninput", "return;"), Ii = typeof to.oninput == "function";
      }
      ki = Ii;
    } else ki = !1;
    lo = ki && (!document.documentMode || 9 < document.documentMode);
  }
  function eo() {
    Su && (Su.detachEvent("onpropertychange", ao), bu = Su = null);
  }
  function ao(l) {
    if (l.propertyName === "value" && En(bu)) {
      var t = [];
      Is(
        t,
        bu,
        l,
        Vi(l)
      ), Xs(kv, t);
    }
  }
  function Iv(l, t, e) {
    l === "focusin" ? (eo(), Su = t, bu = e, Su.attachEvent("onpropertychange", ao)) : l === "focusout" && eo();
  }
  function Pv(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return En(bu);
  }
  function lh(l, t) {
    if (l === "click") return En(t);
  }
  function th(l, t) {
    if (l === "input" || l === "change")
      return En(t);
  }
  function eh(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var Tt = typeof Object.is == "function" ? Object.is : eh;
  function pu(l, t) {
    if (Tt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Al.call(t, u) || !Tt(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function uo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function no(l, t) {
    var e = uo(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = uo(e);
    }
  }
  function io(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? io(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function co(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = hn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = hn(l.document);
    }
    return t;
  }
  function Pi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var ah = Pt && "documentMode" in document && 11 >= document.documentMode, Da = null, lc = null, _u = null, tc = !1;
  function fo(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    tc || Da == null || Da !== hn(a) || (a = Da, "selectionStart" in a && Pi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), _u && pu(_u, a) || (_u = a, a = oi(lc, "onSelect"), 0 < a.length && (t = new pn(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Da)));
  }
  function ta(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var xa = {
    animationend: ta("Animation", "AnimationEnd"),
    animationiteration: ta("Animation", "AnimationIteration"),
    animationstart: ta("Animation", "AnimationStart"),
    transitionrun: ta("Transition", "TransitionRun"),
    transitionstart: ta("Transition", "TransitionStart"),
    transitioncancel: ta("Transition", "TransitionCancel"),
    transitionend: ta("Transition", "TransitionEnd")
  }, ec = {}, so = {};
  Pt && (so = document.createElement("div").style, "AnimationEvent" in window || (delete xa.animationend.animation, delete xa.animationiteration.animation, delete xa.animationstart.animation), "TransitionEvent" in window || delete xa.transitionend.transition);
  function ea(l) {
    if (ec[l]) return ec[l];
    if (!xa[l]) return l;
    var t = xa[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in so)
        return ec[l] = t[e];
    return l;
  }
  var oo = ea("animationend"), ro = ea("animationiteration"), mo = ea("animationstart"), uh = ea("transitionrun"), nh = ea("transitionstart"), ih = ea("transitioncancel"), vo = ea("transitionend"), ho = /* @__PURE__ */ new Map(), ac = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ac.push("scrollEnd");
  function Vt(l, t) {
    ho.set(l, t), Pe(t, [l]);
  }
  var Tn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, Ct = [], Ma = 0, uc = 0;
  function zn() {
    for (var l = Ma, t = uc = Ma = 0; t < l; ) {
      var e = Ct[t];
      Ct[t++] = null;
      var a = Ct[t];
      Ct[t++] = null;
      var u = Ct[t];
      Ct[t++] = null;
      var n = Ct[t];
      if (Ct[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && yo(e, u, n);
    }
  }
  function An(l, t, e, a) {
    Ct[Ma++] = l, Ct[Ma++] = t, Ct[Ma++] = e, Ct[Ma++] = a, uc |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function nc(l, t, e, a) {
    return An(l, t, e, a), Nn(l);
  }
  function aa(l, t) {
    return An(l, null, null, t), Nn(l);
  }
  function yo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - Et(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Nn(l) {
    if (50 < Lu)
      throw Lu = 0, hf = null, Error(s(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ja = {};
  function ch(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zt(l, t, e, a) {
    return new ch(l, t, e, a);
  }
  function ic(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function le(l, t) {
    var e = l.alternate;
    return e === null ? (e = zt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function go(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function On(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") ic(l) && (i = 1);
    else if (typeof l == "string")
      i = d0(
        l,
        e,
        B.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case cl:
          return l = zt(31, e, t, u), l.elementType = cl, l.lanes = n, l;
        case P:
          return ua(e.children, u, n, t);
        case Sl:
          i = 8, u |= 24;
          break;
        case Hl:
          return l = zt(12, e, t, u | 2), l.elementType = Hl, l.lanes = n, l;
        case hl:
          return l = zt(13, e, t, u), l.elementType = hl, l.lanes = n, l;
        case ol:
          return l = zt(19, e, t, u), l.elementType = ol, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ml:
                i = 10;
                break l;
              case L:
                i = 9;
                break l;
              case Yl:
                i = 11;
                break l;
              case K:
                i = 14;
                break l;
              case Ul:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            s(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = zt(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function ua(l, t, e, a) {
    return l = zt(7, l, a, t), l.lanes = e, l;
  }
  function cc(l, t, e) {
    return l = zt(6, l, null, t), l.lanes = e, l;
  }
  function So(l) {
    var t = zt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function fc(l, t, e) {
    return t = zt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var bo = /* @__PURE__ */ new WeakMap();
  function Ht(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = bo.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: jl(t)
      }, bo.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: jl(t)
    };
  }
  var Ra = [], Ua = 0, Dn = null, Eu = 0, qt = [], Bt = 0, ze = null, Kt = 1, Jt = "";
  function te(l, t) {
    Ra[Ua++] = Eu, Ra[Ua++] = Dn, Dn = l, Eu = t;
  }
  function po(l, t, e) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = ze, ze = l;
    var a = Kt;
    l = Jt;
    var u = 32 - Et(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Et(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Kt = 1 << 32 - Et(t) + u | e << u | a, Jt = n + l;
    } else
      Kt = 1 << n | e << u | a, Jt = l;
  }
  function sc(l) {
    l.return !== null && (te(l, 1), po(l, 1, 0));
  }
  function oc(l) {
    for (; l === Dn; )
      Dn = Ra[--Ua], Ra[Ua] = null, Eu = Ra[--Ua], Ra[Ua] = null;
    for (; l === ze; )
      ze = qt[--Bt], qt[Bt] = null, Jt = qt[--Bt], qt[Bt] = null, Kt = qt[--Bt], qt[Bt] = null;
  }
  function _o(l, t) {
    qt[Bt++] = Kt, qt[Bt++] = Jt, qt[Bt++] = ze, Kt = t.id, Jt = t.overflow, ze = l;
  }
  var lt = null, Dl = null, fl = !1, Ae = null, Yt = !1, rc = Error(s(519));
  function Ne(l) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tu(Ht(t, l)), rc;
  }
  function Eo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Pl] = l, t[mt] = a, e) {
      case "dialog":
        el("cancel", t), el("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        el("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Ku.length; e++)
          el(Ku[e], t);
        break;
      case "source":
        el("error", t);
        break;
      case "img":
      case "image":
      case "link":
        el("error", t), el("load", t);
        break;
      case "details":
        el("toggle", t);
        break;
      case "input":
        el("invalid", t), Cs(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        el("invalid", t);
        break;
      case "textarea":
        el("invalid", t), qs(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Gd(t.textContent, e) ? (a.popover != null && (el("beforetoggle", t), el("toggle", t)), a.onScroll != null && el("scroll", t), a.onScrollEnd != null && el("scrollend", t), a.onClick != null && (t.onclick = It), t = !0) : t = !1, t || Ne(l, !0);
  }
  function To(l) {
    for (lt = l.return; lt; )
      switch (lt.tag) {
        case 5:
        case 31:
        case 13:
          Yt = !1;
          return;
        case 27:
        case 3:
          Yt = !0;
          return;
        default:
          lt = lt.return;
      }
  }
  function Ca(l) {
    if (l !== lt) return !1;
    if (!fl) return To(l), fl = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Mf(l.type, l.memoizedProps)), e = !e), e && Dl && Ne(l), To(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Dl = $d(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      Dl = $d(l);
    } else
      t === 27 ? (t = Dl, Xe(l.type) ? (l = Hf, Hf = null, Dl = l) : Dl = t) : Dl = lt ? Xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    Dl = lt = null, fl = !1;
  }
  function dc() {
    var l = Ae;
    return l !== null && (St === null ? St = l : St.push.apply(
      St,
      l
    ), Ae = null), l;
  }
  function Tu(l) {
    Ae === null ? Ae = [l] : Ae.push(l);
  }
  var mc = d(null), ia = null, ee = null;
  function Oe(l, t, e) {
    U(mc, t._currentValue), t._currentValue = e;
  }
  function ae(l) {
    l._currentValue = mc.current, O(mc);
  }
  function vc(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function hc(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var o = 0; o < t.length; o++)
            if (c.context === t[o]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), vc(
                n.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), vc(i, e, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function Ha(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          Tt(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === ll.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(Fu) : l = [Fu]);
      }
      u = u.return;
    }
    l !== null && hc(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function xn(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Tt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ca(l) {
    ia = l, ee = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function tt(l) {
    return zo(ia, l);
  }
  function Mn(l, t) {
    return ia === null && ca(l), zo(l, t);
  }
  function zo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, ee === null) {
      if (l === null) throw Error(s(308));
      ee = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else ee = ee.next = t;
    return e;
  }
  var fh = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, sh = f.unstable_scheduleCallback, oh = f.unstable_NormalPriority, Zl = {
    $$typeof: Ml,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function yc() {
    return {
      controller: new fh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zu(l) {
    l.refCount--, l.refCount === 0 && sh(oh, function() {
      l.controller.abort();
    });
  }
  var Au = null, gc = 0, qa = 0, Ba = null;
  function rh(l, t) {
    if (Au === null) {
      var e = Au = [];
      gc = 0, qa = _f(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return gc++, t.then(Ao, Ao), t;
  }
  function Ao() {
    if (--gc === 0 && Au !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var l = Au;
      Au = null, qa = 0, Ba = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function dh(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var u = 0; u < e.length; u++) (0, e[u])(t);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var No = E.S;
  E.S = function(l, t) {
    sd = Ol(), typeof t == "object" && t !== null && typeof t.then == "function" && rh(l, t), No !== null && No(l, t);
  };
  var fa = d(null);
  function Sc() {
    var l = fa.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function jn(l, t) {
    t === null ? U(fa, fa.current) : U(fa, t.pool);
  }
  function Oo() {
    var l = Sc();
    return l === null ? null : { parent: Zl._currentValue, pool: l };
  }
  var Ya = Error(s(460)), bc = Error(s(474)), Rn = Error(s(542)), Un = { then: function() {
  } };
  function Do(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function xo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(It, It), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, jo(l), l;
      default:
        if (typeof t.status == "string") t.then(It, It);
        else {
          if (l = Tl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(s(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, jo(l), l;
        }
        throw oa = t, Ya;
    }
  }
  function sa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (oa = e, Ya) : e;
    }
  }
  var oa = null;
  function Mo() {
    if (oa === null) throw Error(s(459));
    var l = oa;
    return oa = null, l;
  }
  function jo(l) {
    if (l === Ya || l === Rn)
      throw Error(s(483));
  }
  var Ga = null, Nu = 0;
  function Cn(l) {
    var t = Nu;
    return Nu += 1, Ga === null && (Ga = []), xo(Ga, l, t);
  }
  function Ou(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Hn(l, t) {
    throw t.$$typeof === H ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(
      s(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Ro(l) {
    function t(v, r) {
      if (l) {
        var y = v.deletions;
        y === null ? (v.deletions = [r], v.flags |= 16) : y.push(r);
      }
    }
    function e(v, r) {
      if (!l) return null;
      for (; r !== null; )
        t(v, r), r = r.sibling;
      return null;
    }
    function a(v) {
      for (var r = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? r.set(v.key, v) : r.set(v.index, v), v = v.sibling;
      return r;
    }
    function u(v, r) {
      return v = le(v, r), v.index = 0, v.sibling = null, v;
    }
    function n(v, r, y) {
      return v.index = y, l ? (y = v.alternate, y !== null ? (y = y.index, y < r ? (v.flags |= 67108866, r) : y) : (v.flags |= 67108866, r)) : (v.flags |= 1048576, r);
    }
    function i(v) {
      return l && v.alternate === null && (v.flags |= 67108866), v;
    }
    function c(v, r, y, N) {
      return r === null || r.tag !== 6 ? (r = cc(y, v.mode, N), r.return = v, r) : (r = u(r, y), r.return = v, r);
    }
    function o(v, r, y, N) {
      var X = y.type;
      return X === P ? T(
        v,
        r,
        y.props.children,
        N,
        y.key
      ) : r !== null && (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Ul && sa(X) === r.type) ? (r = u(r, y.props), Ou(r, y), r.return = v, r) : (r = On(
        y.type,
        y.key,
        y.props,
        null,
        v.mode,
        N
      ), Ou(r, y), r.return = v, r);
    }
    function g(v, r, y, N) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== y.containerInfo || r.stateNode.implementation !== y.implementation ? (r = fc(y, v.mode, N), r.return = v, r) : (r = u(r, y.children || []), r.return = v, r);
    }
    function T(v, r, y, N, X) {
      return r === null || r.tag !== 7 ? (r = ua(
        y,
        v.mode,
        N,
        X
      ), r.return = v, r) : (r = u(r, y), r.return = v, r);
    }
    function D(v, r, y) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = cc(
          "" + r,
          v.mode,
          y
        ), r.return = v, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case V:
            return y = On(
              r.type,
              r.key,
              r.props,
              null,
              v.mode,
              y
            ), Ou(y, r), y.return = v, y;
          case al:
            return r = fc(
              r,
              v.mode,
              y
            ), r.return = v, r;
          case Ul:
            return r = sa(r), D(v, r, y);
        }
        if (Fl(r) || zl(r))
          return r = ua(
            r,
            v.mode,
            y,
            null
          ), r.return = v, r;
        if (typeof r.then == "function")
          return D(v, Cn(r), y);
        if (r.$$typeof === Ml)
          return D(
            v,
            Mn(v, r),
            y
          );
        Hn(v, r);
      }
      return null;
    }
    function p(v, r, y, N) {
      var X = r !== null ? r.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return X !== null ? null : c(v, r, "" + y, N);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case V:
            return y.key === X ? o(v, r, y, N) : null;
          case al:
            return y.key === X ? g(v, r, y, N) : null;
          case Ul:
            return y = sa(y), p(v, r, y, N);
        }
        if (Fl(y) || zl(y))
          return X !== null ? null : T(v, r, y, N, null);
        if (typeof y.then == "function")
          return p(
            v,
            r,
            Cn(y),
            N
          );
        if (y.$$typeof === Ml)
          return p(
            v,
            r,
            Mn(v, y),
            N
          );
        Hn(v, y);
      }
      return null;
    }
    function _(v, r, y, N, X) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return v = v.get(y) || null, c(r, v, "" + N, X);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case V:
            return v = v.get(
              N.key === null ? y : N.key
            ) || null, o(r, v, N, X);
          case al:
            return v = v.get(
              N.key === null ? y : N.key
            ) || null, g(r, v, N, X);
          case Ul:
            return N = sa(N), _(
              v,
              r,
              y,
              N,
              X
            );
        }
        if (Fl(N) || zl(N))
          return v = v.get(y) || null, T(r, v, N, X, null);
        if (typeof N.then == "function")
          return _(
            v,
            r,
            y,
            Cn(N),
            X
          );
        if (N.$$typeof === Ml)
          return _(
            v,
            r,
            y,
            Mn(r, N),
            X
          );
        Hn(r, N);
      }
      return null;
    }
    function Y(v, r, y, N) {
      for (var X = null, rl = null, G = r, I = r = 0, nl = null; G !== null && I < y.length; I++) {
        G.index > I ? (nl = G, G = null) : nl = G.sibling;
        var dl = p(
          v,
          G,
          y[I],
          N
        );
        if (dl === null) {
          G === null && (G = nl);
          break;
        }
        l && G && dl.alternate === null && t(v, G), r = n(dl, r, I), rl === null ? X = dl : rl.sibling = dl, rl = dl, G = nl;
      }
      if (I === y.length)
        return e(v, G), fl && te(v, I), X;
      if (G === null) {
        for (; I < y.length; I++)
          G = D(v, y[I], N), G !== null && (r = n(
            G,
            r,
            I
          ), rl === null ? X = G : rl.sibling = G, rl = G);
        return fl && te(v, I), X;
      }
      for (G = a(G); I < y.length; I++)
        nl = _(
          G,
          v,
          I,
          y[I],
          N
        ), nl !== null && (l && nl.alternate !== null && G.delete(
          nl.key === null ? I : nl.key
        ), r = n(
          nl,
          r,
          I
        ), rl === null ? X = nl : rl.sibling = nl, rl = nl);
      return l && G.forEach(function(Ke) {
        return t(v, Ke);
      }), fl && te(v, I), X;
    }
    function Z(v, r, y, N) {
      if (y == null) throw Error(s(151));
      for (var X = null, rl = null, G = r, I = r = 0, nl = null, dl = y.next(); G !== null && !dl.done; I++, dl = y.next()) {
        G.index > I ? (nl = G, G = null) : nl = G.sibling;
        var Ke = p(v, G, dl.value, N);
        if (Ke === null) {
          G === null && (G = nl);
          break;
        }
        l && G && Ke.alternate === null && t(v, G), r = n(Ke, r, I), rl === null ? X = Ke : rl.sibling = Ke, rl = Ke, G = nl;
      }
      if (dl.done)
        return e(v, G), fl && te(v, I), X;
      if (G === null) {
        for (; !dl.done; I++, dl = y.next())
          dl = D(v, dl.value, N), dl !== null && (r = n(dl, r, I), rl === null ? X = dl : rl.sibling = dl, rl = dl);
        return fl && te(v, I), X;
      }
      for (G = a(G); !dl.done; I++, dl = y.next())
        dl = _(G, v, I, dl.value, N), dl !== null && (l && dl.alternate !== null && G.delete(dl.key === null ? I : dl.key), r = n(dl, r, I), rl === null ? X = dl : rl.sibling = dl, rl = dl);
      return l && G.forEach(function(T0) {
        return t(v, T0);
      }), fl && te(v, I), X;
    }
    function El(v, r, y, N) {
      if (typeof y == "object" && y !== null && y.type === P && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case V:
            l: {
              for (var X = y.key; r !== null; ) {
                if (r.key === X) {
                  if (X = y.type, X === P) {
                    if (r.tag === 7) {
                      e(
                        v,
                        r.sibling
                      ), N = u(
                        r,
                        y.props.children
                      ), N.return = v, v = N;
                      break l;
                    }
                  } else if (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Ul && sa(X) === r.type) {
                    e(
                      v,
                      r.sibling
                    ), N = u(r, y.props), Ou(N, y), N.return = v, v = N;
                    break l;
                  }
                  e(v, r);
                  break;
                } else t(v, r);
                r = r.sibling;
              }
              y.type === P ? (N = ua(
                y.props.children,
                v.mode,
                N,
                y.key
              ), N.return = v, v = N) : (N = On(
                y.type,
                y.key,
                y.props,
                null,
                v.mode,
                N
              ), Ou(N, y), N.return = v, v = N);
            }
            return i(v);
          case al:
            l: {
              for (X = y.key; r !== null; ) {
                if (r.key === X)
                  if (r.tag === 4 && r.stateNode.containerInfo === y.containerInfo && r.stateNode.implementation === y.implementation) {
                    e(
                      v,
                      r.sibling
                    ), N = u(r, y.children || []), N.return = v, v = N;
                    break l;
                  } else {
                    e(v, r);
                    break;
                  }
                else t(v, r);
                r = r.sibling;
              }
              N = fc(y, v.mode, N), N.return = v, v = N;
            }
            return i(v);
          case Ul:
            return y = sa(y), El(
              v,
              r,
              y,
              N
            );
        }
        if (Fl(y))
          return Y(
            v,
            r,
            y,
            N
          );
        if (zl(y)) {
          if (X = zl(y), typeof X != "function") throw Error(s(150));
          return y = X.call(y), Z(
            v,
            r,
            y,
            N
          );
        }
        if (typeof y.then == "function")
          return El(
            v,
            r,
            Cn(y),
            N
          );
        if (y.$$typeof === Ml)
          return El(
            v,
            r,
            Mn(v, y),
            N
          );
        Hn(v, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, r !== null && r.tag === 6 ? (e(v, r.sibling), N = u(r, y), N.return = v, v = N) : (e(v, r), N = cc(y, v.mode, N), N.return = v, v = N), i(v)) : e(v, r);
    }
    return function(v, r, y, N) {
      try {
        Nu = 0;
        var X = El(
          v,
          r,
          y,
          N
        );
        return Ga = null, X;
      } catch (G) {
        if (G === Ya || G === Rn) throw G;
        var rl = zt(29, G, null, v.mode);
        return rl.lanes = N, rl.return = v, rl;
      } finally {
      }
    };
  }
  var ra = Ro(!0), Uo = Ro(!1), De = !1;
  function pc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function _c(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function xe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Me(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (vl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Nn(l), yo(l, null, e), t;
    }
    return An(l, a, t, e), Nn(l);
  }
  function Du(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ts(l, e);
    }
  }
  function Ec(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Tc = !1;
  function xu() {
    if (Tc) {
      var l = Ba;
      if (l !== null) throw l;
    }
  }
  function Mu(l, t, e, a) {
    Tc = !1;
    var u = l.updateQueue;
    De = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var o = c, g = o.next;
      o.next = null, i === null ? n = g : i.next = g, i = o;
      var T = l.alternate;
      T !== null && (T = T.updateQueue, c = T.lastBaseUpdate, c !== i && (c === null ? T.firstBaseUpdate = g : c.next = g, T.lastBaseUpdate = o));
    }
    if (n !== null) {
      var D = u.baseState;
      i = 0, T = g = o = null, c = n;
      do {
        var p = c.lane & -536870913, _ = p !== c.lane;
        if (_ ? (ul & p) === p : (a & p) === p) {
          p !== 0 && p === qa && (Tc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var Y = l, Z = c;
            p = t;
            var El = e;
            switch (Z.tag) {
              case 1:
                if (Y = Z.payload, typeof Y == "function") {
                  D = Y.call(El, D, p);
                  break l;
                }
                D = Y;
                break l;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = Z.payload, p = typeof Y == "function" ? Y.call(El, D, p) : Y, p == null) break l;
                D = z({}, D, p);
                break l;
              case 2:
                De = !0;
            }
          }
          p = c.callback, p !== null && (l.flags |= 64, _ && (l.flags |= 8192), _ = u.callbacks, _ === null ? u.callbacks = [p] : _.push(p));
        } else
          _ = {
            lane: p,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (g = T = _, o = D) : T = T.next = _, i |= p;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          _ = c, c = _.next, _.next = null, u.lastBaseUpdate = _, u.shared.pending = null;
        }
      } while (!0);
      T === null && (o = D), u.baseState = o, u.firstBaseUpdate = g, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), He |= i, l.lanes = i, l.memoizedState = D;
    }
  }
  function Co(l, t) {
    if (typeof l != "function")
      throw Error(s(191, l));
    l.call(t);
  }
  function Ho(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        Co(e[l], t);
  }
  var Xa = d(null), qn = d(0);
  function qo(l, t) {
    l = de, U(qn, l), U(Xa, t), de = l | t.baseLanes;
  }
  function zc() {
    U(qn, de), U(Xa, Xa.current);
  }
  function Ac() {
    de = qn.current, O(Xa), O(qn);
  }
  var At = d(null), Gt = null;
  function je(l) {
    var t = l.alternate;
    U(Vl, Vl.current & 1), U(At, l), Gt === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (Gt = l);
  }
  function Nc(l) {
    U(Vl, Vl.current), U(At, l), Gt === null && (Gt = l);
  }
  function Bo(l) {
    l.tag === 22 ? (U(Vl, Vl.current), U(At, l), Gt === null && (Gt = l)) : Re();
  }
  function Re() {
    U(Vl, Vl.current), U(At, At.current);
  }
  function Nt(l) {
    O(At), Gt === l && (Gt = null), O(Vl);
  }
  var Vl = d(0);
  function Bn(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Uf(e) || Cf(e)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var ue = 0, k = null, pl = null, Kl = null, Yn = !1, Qa = !1, da = !1, Gn = 0, ju = 0, Va = null, mh = 0;
  function ql() {
    throw Error(s(321));
  }
  function Oc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!Tt(l[e], t[e])) return !1;
    return !0;
  }
  function Dc(l, t, e, a, u, n) {
    return ue = n, k = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = l === null || l.memoizedState === null ? pr : Lc, da = !1, n = e(a, u), da = !1, Qa && (n = Go(
      t,
      e,
      a,
      u
    )), Yo(l), n;
  }
  function Yo(l) {
    E.H = Cu;
    var t = pl !== null && pl.next !== null;
    if (ue = 0, Kl = pl = k = null, Yn = !1, ju = 0, Va = null, t) throw Error(s(300));
    l === null || Jl || (l = l.dependencies, l !== null && xn(l) && (Jl = !0));
  }
  function Go(l, t, e, a) {
    k = l;
    var u = 0;
    do {
      if (Qa && (Va = null), ju = 0, Qa = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Kl = pl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      E.H = _r, n = t(e, a);
    } while (Qa);
    return n;
  }
  function vh() {
    var l = E.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Ru(t) : t, l = l.useState()[0], (pl !== null ? pl.memoizedState : null) !== l && (k.flags |= 1024), t;
  }
  function xc() {
    var l = Gn !== 0;
    return Gn = 0, l;
  }
  function Mc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function jc(l) {
    if (Yn) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Yn = !1;
    }
    ue = 0, Kl = pl = k = null, Qa = !1, ju = Gn = 0, Va = null;
  }
  function ft() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kl === null ? k.memoizedState = Kl = l : Kl = Kl.next = l, Kl;
  }
  function Ll() {
    if (pl === null) {
      var l = k.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = pl.next;
    var t = Kl === null ? k.memoizedState : Kl.next;
    if (t !== null)
      Kl = t, pl = l;
    else {
      if (l === null)
        throw k.alternate === null ? Error(s(467)) : Error(s(310));
      pl = l, l = {
        memoizedState: pl.memoizedState,
        baseState: pl.baseState,
        baseQueue: pl.baseQueue,
        queue: pl.queue,
        next: null
      }, Kl === null ? k.memoizedState = Kl = l : Kl = Kl.next = l;
    }
    return Kl;
  }
  function Xn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ru(l) {
    var t = ju;
    return ju += 1, Va === null && (Va = []), l = xo(Va, l, t), t = k, (Kl === null ? t.memoizedState : Kl.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? pr : Lc), l;
  }
  function Qn(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ru(l);
      if (l.$$typeof === Ml) return tt(l);
    }
    throw Error(s(438, String(l)));
  }
  function Rc(l) {
    var t = null, e = k.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = k.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = Xn(), k.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = it;
    return t.index++, e;
  }
  function ne(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function Vn(l) {
    var t = Ll();
    return Uc(t, pl, l);
  }
  function Uc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, o = null, g = t, T = !1;
      do {
        var D = g.lane & -536870913;
        if (D !== g.lane ? (ul & D) === D : (ue & D) === D) {
          var p = g.revertLane;
          if (p === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }), D === qa && (T = !0);
          else if ((ue & p) === p) {
            g = g.next, p === qa && (T = !0);
            continue;
          } else
            D = {
              lane: 0,
              revertLane: g.revertLane,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, o === null ? (c = o = D, i = n) : o = o.next = D, k.lanes |= p, He |= p;
          D = g.action, da && e(n, D), n = g.hasEagerState ? g.eagerState : e(n, D);
        } else
          p = {
            lane: D,
            revertLane: g.revertLane,
            gesture: g.gesture,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          }, o === null ? (c = o = p, i = n) : o = o.next = p, k.lanes |= D, He |= D;
        g = g.next;
      } while (g !== null && g !== t);
      if (o === null ? i = n : o.next = c, !Tt(n, l.memoizedState) && (Jl = !0, T && (e = Ba, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = o, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Cc(l) {
    var t = Ll(), e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      Tt(n, t.memoizedState) || (Jl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Xo(l, t, e) {
    var a = k, u = Ll(), n = fl;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !Tt(
      (pl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jl = !0), u = u.queue, Bc(Lo.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Kl !== null && Kl.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Vo.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), Tl === null) throw Error(s(349));
      n || (ue & 127) !== 0 || Qo(a, t, e);
    }
    return e;
  }
  function Qo(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = k.updateQueue, t === null ? (t = Xn(), k.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Vo(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Zo(t) && Ko(l);
  }
  function Lo(l, t, e) {
    return e(function() {
      Zo(t) && Ko(l);
    });
  }
  function Zo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !Tt(l, e);
    } catch {
      return !0;
    }
  }
  function Ko(l) {
    var t = aa(l, 2);
    t !== null && bt(t, l, 2);
  }
  function Hc(l) {
    var t = ft();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), da) {
        _e(!0);
        try {
          e();
        } finally {
          _e(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ne,
      lastRenderedState: l
    }, t;
  }
  function Jo(l, t, e, a) {
    return l.baseState = e, Uc(
      l,
      pl,
      typeof a == "function" ? a : ne
    );
  }
  function hh(l, t, e, a, u) {
    if (Kn(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      E.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, wo(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function wo(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = E.T, i = {};
      E.T = i;
      try {
        var c = e(u, a), o = E.S;
        o !== null && o(i, c), $o(l, t, c);
      } catch (g) {
        qc(l, t, g);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), E.T = n;
      }
    } else
      try {
        n = e(u, a), $o(l, t, n);
      } catch (g) {
        qc(l, t, g);
      }
  }
  function $o(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Wo(l, t, a);
      },
      function(a) {
        return qc(l, t, a);
      }
    ) : Wo(l, t, e);
  }
  function Wo(l, t, e) {
    t.status = "fulfilled", t.value = e, Fo(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, wo(l, e)));
  }
  function qc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, Fo(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function Fo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function ko(l, t) {
    return t;
  }
  function Io(l, t) {
    if (fl) {
      var e = Tl.formState;
      if (e !== null) {
        l: {
          var a = k;
          if (fl) {
            if (Dl) {
              t: {
                for (var u = Dl, n = Yt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = Xt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Dl = Xt(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            Ne(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = ft(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ko,
      lastRenderedState: t
    }, e.queue = a, e = gr.bind(
      null,
      k,
      a
    ), a.dispatch = e, a = Hc(!1), n = Vc.bind(
      null,
      k,
      !1,
      a.queue
    ), a = ft(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = hh.bind(
      null,
      k,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Po(l) {
    var t = Ll();
    return lr(t, pl, l);
  }
  function lr(l, t, e) {
    if (t = Uc(
      l,
      t,
      ko
    )[0], l = Vn(ne)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Ru(t);
      } catch (i) {
        throw i === Ya ? Rn : i;
      }
    else a = t;
    t = Ll();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && (k.flags |= 2048, La(
      9,
      { destroy: void 0 },
      yh.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function yh(l, t) {
    l.action = t;
  }
  function tr(l) {
    var t = Ll(), e = pl;
    if (e !== null)
      return lr(t, e, l);
    Ll(), t = t.memoizedState, e = Ll();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function La(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = k.updateQueue, t === null && (t = Xn(), k.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function er() {
    return Ll().memoizedState;
  }
  function Ln(l, t, e, a) {
    var u = ft();
    k.flags |= l, u.memoizedState = La(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Zn(l, t, e, a) {
    var u = Ll();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    pl !== null && a !== null && Oc(a, pl.memoizedState.deps) ? u.memoizedState = La(t, n, e, a) : (k.flags |= l, u.memoizedState = La(
      1 | t,
      n,
      e,
      a
    ));
  }
  function ar(l, t) {
    Ln(8390656, 8, l, t);
  }
  function Bc(l, t) {
    Zn(2048, 8, l, t);
  }
  function gh(l) {
    k.flags |= 4;
    var t = k.updateQueue;
    if (t === null)
      t = Xn(), k.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function ur(l) {
    var t = Ll().memoizedState;
    return gh({ ref: t, nextImpl: l }), function() {
      if ((vl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function nr(l, t) {
    return Zn(4, 2, l, t);
  }
  function ir(l, t) {
    return Zn(4, 4, l, t);
  }
  function cr(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function fr(l, t, e) {
    e = e != null ? e.concat([l]) : null, Zn(4, 4, cr.bind(null, t, l), e);
  }
  function Yc() {
  }
  function sr(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Oc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function or(l, t) {
    var e = Ll();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Oc(t, a[1]))
      return a[0];
    if (a = l(), da) {
      _e(!0);
      try {
        l();
      } finally {
        _e(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function Gc(l, t, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = rd(), k.lanes |= l, He |= l, e);
  }
  function rr(l, t, e, a) {
    return Tt(e, t) ? e : Xa.current !== null ? (l = Gc(l, e, a), Tt(l, t) || (Jl = !0), l) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (ul & 261930) === 0 ? (Jl = !0, l.memoizedState = e) : (l = rd(), k.lanes |= l, He |= l, t);
  }
  function dr(l, t, e, a, u) {
    var n = C.p;
    C.p = n !== 0 && 8 > n ? n : 8;
    var i = E.T, c = {};
    E.T = c, Vc(l, !1, t, e);
    try {
      var o = u(), g = E.S;
      if (g !== null && g(c, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var T = dh(
          o,
          a
        );
        Uu(
          l,
          t,
          T,
          xt(l)
        );
      } else
        Uu(
          l,
          t,
          a,
          xt(l)
        );
    } catch (D) {
      Uu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: D },
        xt()
      );
    } finally {
      C.p = n, i !== null && c.types !== null && (i.types = c.types), E.T = i;
    }
  }
  function Sh() {
  }
  function Xc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var u = mr(l).queue;
    dr(
      l,
      u,
      t,
      Q,
      e === null ? Sh : function() {
        return vr(l), e(a);
      }
    );
  }
  function mr(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ne,
        lastRenderedState: Q
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ne,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function vr(l) {
    var t = mr(l);
    t.next === null && (t = l.alternate.memoizedState), Uu(
      l,
      t.next.queue,
      {},
      xt()
    );
  }
  function Qc() {
    return tt(Fu);
  }
  function hr() {
    return Ll().memoizedState;
  }
  function yr() {
    return Ll().memoizedState;
  }
  function bh(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = xt();
          l = xe(e);
          var a = Me(t, l, e);
          a !== null && (bt(a, t, e), Du(a, t, e)), t = { cache: yc() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ph(l, t, e) {
    var a = xt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(l) ? Sr(t, e) : (e = nc(l, t, e, a), e !== null && (bt(e, l, a), br(e, t, a)));
  }
  function gr(l, t, e) {
    var a = xt();
    Uu(l, t, e, a);
  }
  function Uu(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kn(l)) Sr(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, Tt(c, i))
            return An(l, t, u, 0), Tl === null && zn(), !1;
        } catch {
        } finally {
        }
      if (e = nc(l, t, u, a), e !== null)
        return bt(e, l, a), br(e, t, a), !0;
    }
    return !1;
  }
  function Vc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: _f(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(l)) {
      if (t) throw Error(s(479));
    } else
      t = nc(
        l,
        e,
        a,
        2
      ), t !== null && bt(t, l, 2);
  }
  function Kn(l) {
    var t = l.alternate;
    return l === k || t !== null && t === k;
  }
  function Sr(l, t) {
    Qa = Yn = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function br(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Ts(l, e);
    }
  }
  var Cu = {
    readContext: tt,
    use: Qn,
    useCallback: ql,
    useContext: ql,
    useEffect: ql,
    useImperativeHandle: ql,
    useLayoutEffect: ql,
    useInsertionEffect: ql,
    useMemo: ql,
    useReducer: ql,
    useRef: ql,
    useState: ql,
    useDebugValue: ql,
    useDeferredValue: ql,
    useTransition: ql,
    useSyncExternalStore: ql,
    useId: ql,
    useHostTransitionStatus: ql,
    useFormState: ql,
    useActionState: ql,
    useOptimistic: ql,
    useMemoCache: ql,
    useCacheRefresh: ql
  };
  Cu.useEffectEvent = ql;
  var pr = {
    readContext: tt,
    use: Qn,
    useCallback: function(l, t) {
      return ft().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: tt,
    useEffect: ar,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, Ln(
        4194308,
        4,
        cr.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return Ln(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      Ln(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = ft();
      t = t === void 0 ? null : t;
      var a = l();
      if (da) {
        _e(!0);
        try {
          l();
        } finally {
          _e(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = ft();
      if (e !== void 0) {
        var u = e(t);
        if (da) {
          _e(!0);
          try {
            e(t);
          } finally {
            _e(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = ph.bind(
        null,
        k,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = ft();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Hc(l);
      var t = l.queue, e = gr.bind(null, k, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = ft();
      return Gc(e, l, t);
    },
    useTransition: function() {
      var l = Hc(!1);
      return l = dr.bind(
        null,
        k,
        l.queue,
        !0,
        !1
      ), ft().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = k, u = ft();
      if (fl) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = t(), Tl === null)
          throw Error(s(349));
        (ul & 127) !== 0 || Qo(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, ar(Lo.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Vo.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = ft(), t = Tl.identifierPrefix;
      if (fl) {
        var e = Jt, a = Kt;
        e = (a & ~(1 << 32 - Et(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = Gn++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = mh++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: Qc,
    useFormState: Io,
    useActionState: Io,
    useOptimistic: function(l) {
      var t = ft();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Vc.bind(
        null,
        k,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: Rc,
    useCacheRefresh: function() {
      return ft().memoizedState = bh.bind(
        null,
        k
      );
    },
    useEffectEvent: function(l) {
      var t = ft(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((vl & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Lc = {
    readContext: tt,
    use: Qn,
    useCallback: sr,
    useContext: tt,
    useEffect: Bc,
    useImperativeHandle: fr,
    useInsertionEffect: nr,
    useLayoutEffect: ir,
    useMemo: or,
    useReducer: Vn,
    useRef: er,
    useState: function() {
      return Vn(ne);
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return rr(
        e,
        pl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Vn(ne)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Ru(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: hr,
    useHostTransitionStatus: Qc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(l, t) {
      var e = Ll();
      return Jo(e, pl, l, t);
    },
    useMemoCache: Rc,
    useCacheRefresh: yr
  };
  Lc.useEffectEvent = ur;
  var _r = {
    readContext: tt,
    use: Qn,
    useCallback: sr,
    useContext: tt,
    useEffect: Bc,
    useImperativeHandle: fr,
    useInsertionEffect: nr,
    useLayoutEffect: ir,
    useMemo: or,
    useReducer: Cc,
    useRef: er,
    useState: function() {
      return Cc(ne);
    },
    useDebugValue: Yc,
    useDeferredValue: function(l, t) {
      var e = Ll();
      return pl === null ? Gc(e, l, t) : rr(
        e,
        pl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Cc(ne)[0], t = Ll().memoizedState;
      return [
        typeof l == "boolean" ? l : Ru(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: hr,
    useHostTransitionStatus: Qc,
    useFormState: tr,
    useActionState: tr,
    useOptimistic: function(l, t) {
      var e = Ll();
      return pl !== null ? Jo(e, pl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: Rc,
    useCacheRefresh: yr
  };
  _r.useEffectEvent = ur;
  function Zc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : z({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Kc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = xt(), u = xe(a);
      u.payload = t, e != null && (u.callback = e), t = Me(l, u, a), t !== null && (bt(t, l, a), Du(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = xt(), u = xe(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = Me(l, u, a), t !== null && (bt(t, l, a), Du(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = xt(), a = xe(e);
      a.tag = 2, t != null && (a.callback = t), t = Me(l, a, e), t !== null && (bt(t, l, e), Du(t, l, e));
    }
  };
  function Er(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !pu(e, a) || !pu(u, n) : !0;
  }
  function Tr(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Kc.enqueueReplaceState(t, t.state, null);
  }
  function ma(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = z({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function zr(l) {
    Tn(l);
  }
  function Ar(l) {
    console.error(l);
  }
  function Nr(l) {
    Tn(l);
  }
  function Jn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Or(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Jc(l, t, e) {
    return e = xe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Jn(l, t);
    }, e;
  }
  function Dr(l) {
    return l = xe(l), l.tag = 3, l;
  }
  function xr(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Or(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Or(t, e, a), typeof u != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function _h(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && Ha(
        t,
        e,
        u,
        !0
      ), e = At.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Gt === null ? ui() : e.alternate === null && Bl === 0 && (Bl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Sf(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Un ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Sf(l, a, u)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return Sf(l, a, u), ui(), !1;
    }
    if (fl)
      return t = At.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== rc && (l = Error(s(422), { cause: a }), Tu(Ht(l, e)))) : (a !== rc && (t = Error(s(423), {
        cause: a
      }), Tu(
        Ht(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = Ht(a, e), u = Jc(
        l.stateNode,
        a,
        u
      ), Ec(l, u), Bl !== 4 && (Bl = 2)), !1;
    var n = Error(s(520), { cause: a });
    if (n = Ht(n, e), Vu === null ? Vu = [n] : Vu.push(n), Bl !== 4 && (Bl = 2), t === null) return !0;
    a = Ht(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = Jc(e.stateNode, a, l), Ec(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (qe === null || !qe.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Dr(u), xr(
              u,
              l,
              e,
              a
            ), Ec(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var wc = Error(s(461)), Jl = !1;
  function et(l, t, e, a) {
    t.child = l === null ? Uo(t, null, e, a) : ra(
      t,
      l.child,
      e,
      a
    );
  }
  function Mr(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return ca(t), a = Dc(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = xc(), l !== null && !Jl ? (Mc(l, t, u), ie(l, t, u)) : (fl && c && sc(t), t.flags |= 1, et(l, t, a, u), t.child);
  }
  function jr(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !ic(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Rr(
        l,
        t,
        n,
        a,
        u
      )) : (l = On(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !tf(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : pu, e(i, a) && l.ref === t.ref)
        return ie(l, t, u);
    }
    return t.flags |= 1, l = le(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Rr(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (pu(n, a) && l.ref === t.ref)
        if (Jl = !1, t.pendingProps = a = n, tf(l, u))
          (l.flags & 131072) !== 0 && (Jl = !0);
        else
          return t.lanes = l.lanes, ie(l, t, u);
    }
    return $c(
      l,
      t,
      e,
      a,
      u
    );
  }
  function Ur(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return Cr(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && jn(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? qo(t, n) : zc(), Bo(t);
      else
        return a = t.lanes = 536870912, Cr(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (jn(t, n.cachePool), qo(t, n), Re(), t.memoizedState = null) : (l !== null && jn(t, null), zc(), Re());
    return et(l, t, u, e), t.child;
  }
  function Hu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Cr(l, t, e, a, u) {
    var n = Sc();
    return n = n === null ? null : { parent: Zl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && jn(t, null), zc(), Bo(t), l !== null && Ha(l, t, a, !0), t.childLanes = u, null;
  }
  function wn(l, t) {
    return t = Wn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Hr(l, t, e) {
    return ra(t, l.child, null, e), l = wn(t, t.pendingProps), l.flags |= 2, Nt(t), t.memoizedState = null, l;
  }
  function Eh(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (fl) {
        if (a.mode === "hidden")
          return l = wn(t, a), t.lanes = 536870912, Hu(null, l);
        if (Nc(t), (l = Dl) ? (l = wd(
          l,
          Yt
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = So(l), e.return = t, t.child = e, lt = t, Dl = null)) : l = null, l === null) throw Ne(t);
        return t.lanes = 536870912, null;
      }
      return wn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Nc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Hr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Jl || Ha(l, t, e, !1), u = (e & l.childLanes) !== 0, Jl || u) {
        if (a = Tl, a !== null && (i = zs(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, aa(l, i), bt(a, l, i), wc;
        ui(), t = Hr(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, Dl = Xt(i.nextSibling), lt = t, fl = !0, Ae = null, Yt = !1, l !== null && _o(t, l), t = wn(t, a), t.flags |= 4096;
      return t;
    }
    return l = le(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function $n(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function $c(l, t, e, a, u) {
    return ca(t), e = Dc(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = xc(), l !== null && !Jl ? (Mc(l, t, u), ie(l, t, u)) : (fl && a && sc(t), t.flags |= 1, et(l, t, e, u), t.child);
  }
  function qr(l, t, e, a, u, n) {
    return ca(t), t.updateQueue = null, e = Go(
      t,
      a,
      e,
      u
    ), Yo(l), a = xc(), l !== null && !Jl ? (Mc(l, t, n), ie(l, t, n)) : (fl && a && sc(t), t.flags |= 1, et(l, t, e, n), t.child);
  }
  function Br(l, t, e, a, u) {
    if (ca(t), t.stateNode === null) {
      var n = ja, i = e.contextType;
      typeof i == "object" && i !== null && (n = tt(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Kc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, pc(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? tt(i) : ja, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Zc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Kc.enqueueReplaceState(n, n.state, null), Mu(t, a, n, u), xu(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, o = ma(e, c);
      n.props = o;
      var g = n.context, T = e.contextType;
      i = ja, typeof T == "object" && T !== null && (i = tt(T));
      var D = e.getDerivedStateFromProps;
      T = typeof D == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || g !== i) && Tr(
        t,
        n,
        a,
        i
      ), De = !1;
      var p = t.memoizedState;
      n.state = p, Mu(t, a, n, u), xu(), g = t.memoizedState, c || p !== g || De ? (typeof D == "function" && (Zc(
        t,
        e,
        D,
        a
      ), g = t.memoizedState), (o = De || Er(
        t,
        e,
        o,
        a,
        p,
        g,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = g), n.props = a, n.state = g, n.context = i, a = o) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, _c(l, t), i = t.memoizedProps, T = ma(e, i), n.props = T, D = t.pendingProps, p = n.context, g = e.contextType, o = ja, typeof g == "object" && g !== null && (o = tt(g)), c = e.getDerivedStateFromProps, (g = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== D || p !== o) && Tr(
        t,
        n,
        a,
        o
      ), De = !1, p = t.memoizedState, n.state = p, Mu(t, a, n, u), xu();
      var _ = t.memoizedState;
      i !== D || p !== _ || De || l !== null && l.dependencies !== null && xn(l.dependencies) ? (typeof c == "function" && (Zc(
        t,
        e,
        c,
        a
      ), _ = t.memoizedState), (T = De || Er(
        t,
        e,
        T,
        a,
        p,
        _,
        o
      ) || l !== null && l.dependencies !== null && xn(l.dependencies)) ? (g || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, _, o), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        _,
        o
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = _), n.props = a, n.state = _, n.context = o, a = T) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, $n(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = ra(
      t,
      l.child,
      null,
      u
    ), t.child = ra(
      t,
      null,
      e,
      u
    )) : et(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = ie(
      l,
      t,
      u
    ), l;
  }
  function Yr(l, t, e, a) {
    return na(), t.flags |= 256, et(l, t, e, a), t.child;
  }
  var Wc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fc(l) {
    return { baseLanes: l, cachePool: Oo() };
  }
  function kc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= Dt), l;
  }
  function Gr(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Vl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (fl) {
        if (u ? je(t) : Re(), (l = Dl) ? (l = wd(
          l,
          Yt
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ze !== null ? { id: Kt, overflow: Jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = So(l), e.return = t, t.child = e, lt = t, Dl = null)) : l = null, l === null) throw Ne(t);
        return Cf(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (Re(), u = t.mode, c = Wn(
        { mode: "hidden", children: c },
        u
      ), a = ua(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Fc(e), a.childLanes = kc(
        l,
        i,
        e
      ), t.memoizedState = Wc, Hu(null, a)) : (je(t), Ic(t, c));
    }
    var o = l.memoizedState;
    if (o !== null && (c = o.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (je(t), t.flags &= -257, t = Pc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Re(), t.child = l.child, t.flags |= 128, t = null) : (Re(), c = a.fallback, u = t.mode, a = Wn(
          { mode: "visible", children: a.children },
          u
        ), c = ua(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, ra(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = Fc(e), a.childLanes = kc(
          l,
          i,
          e
        ), t.memoizedState = Wc, t = Hu(null, a));
      else if (je(t), Cf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var g = i.dgst;
        i = g, a = Error(s(419)), a.stack = "", a.digest = i, Tu({ value: a, source: null, stack: null }), t = Pc(
          l,
          t,
          e
        );
      } else if (Jl || Ha(l, t, e, !1), i = (e & l.childLanes) !== 0, Jl || i) {
        if (i = Tl, i !== null && (a = zs(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, aa(l, a), bt(i, l, a), wc;
        Uf(c) || ui(), t = Pc(
          l,
          t,
          e
        );
      } else
        Uf(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = o.treeContext, Dl = Xt(
          c.nextSibling
        ), lt = t, fl = !0, Ae = null, Yt = !1, l !== null && _o(t, l), t = Ic(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Re(), c = a.fallback, u = t.mode, o = l.child, g = o.sibling, a = le(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, g !== null ? c = le(
      g,
      c
    ) : (c = ua(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, Hu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = Fc(e) : (u = c.cachePool, u !== null ? (o = Zl._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Oo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = kc(
      l,
      i,
      e
    ), t.memoizedState = Wc, Hu(l.child, a)) : (je(t), e = l.child, l = e.sibling, e = le(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Ic(l, t) {
    return t = Wn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function Wn(l, t) {
    return l = zt(22, l, null, t), l.lanes = 0, l;
  }
  function Pc(l, t, e) {
    return ra(t, l.child, null, e), l = Ic(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Xr(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), vc(l.return, t, e);
  }
  function lf(l, t, e, a, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Qr(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, U(Vl, i), et(l, t, a, e), a = fl ? Eu : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Xr(l, e, t);
        else if (l.tag === 19)
          Xr(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          l = e.alternate, l !== null && Bn(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), lf(
          t,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Bn(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        lf(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        lf(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ie(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), He |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (Ha(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, e = le(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = le(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function tf(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && xn(l)));
  }
  function Th(l, t, e) {
    switch (t.tag) {
      case 3:
        Xl(t, t.stateNode.containerInfo), Oe(t, Zl, l.memoizedState.cache), na();
        break;
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        Xl(t, t.stateNode.containerInfo);
        break;
      case 10:
        Oe(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Nc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (je(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Gr(l, t, e) : (je(t), l = ie(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        je(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (Ha(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Qr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), U(Vl, Vl.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Ur(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        Oe(t, Zl, l.memoizedState.cache);
    }
    return ie(l, t, e);
  }
  function Vr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Jl = !0;
      else {
        if (!tf(l, e) && (t.flags & 128) === 0)
          return Jl = !1, Th(
            l,
            t,
            e
          );
        Jl = (l.flags & 131072) !== 0;
      }
    else
      Jl = !1, fl && (t.flags & 1048576) !== 0 && po(t, Eu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = sa(t.elementType), t.type = l, typeof l == "function")
            ic(l) ? (a = ma(l, a), t.tag = 1, t = Br(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = $c(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Yl) {
                t.tag = 11, t = Mr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === K) {
                t.tag = 14, t = jr(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Gl(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return $c(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = ma(
          a,
          t.pendingProps
        ), Br(
          l,
          t,
          a,
          u,
          e
        );
      case 3:
        l: {
          if (Xl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(s(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, _c(l, t), Mu(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, Oe(t, Zl, a), a !== n.cache && hc(
            t,
            [Zl],
            e,
            !0
          ), xu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Yr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = Ht(
                Error(s(424)),
                t
              ), Tu(u), t = Yr(
                l,
                t,
                a,
                e
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Dl = Xt(l.firstChild), lt = t, fl = !0, Ae = null, Yt = !0, e = Uo(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (na(), a === u) {
              t = ie(
                l,
                t,
                e
              );
              break l;
            }
            et(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return $n(l, t), l === null ? (e = Pd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : fl || (e = t.type, l = t.pendingProps, a = ri(
          F.current
        ).createElement(e), a[Pl] = t, a[mt] = l, at(a, e, l), kl(a), t.stateNode = a) : t.memoizedState = Pd(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return be(t), l === null && fl && (a = t.stateNode = Fd(
          t.type,
          t.pendingProps,
          F.current
        ), lt = t, Yt = !0, u = Dl, Xe(t.type) ? (Hf = u, Dl = Xt(a.firstChild)) : Dl = u), et(
          l,
          t,
          t.pendingProps.children,
          e
        ), $n(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && fl && ((u = a = Dl) && (a = Ph(
          a,
          t.type,
          t.pendingProps,
          Yt
        ), a !== null ? (t.stateNode = a, lt = t, Dl = Xt(a.firstChild), Yt = !1, u = !0) : u = !1), u || Ne(t)), be(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Mf(u, n) ? a = null : i !== null && Mf(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Dc(
          l,
          t,
          vh,
          null,
          null,
          e
        ), Fu._currentValue = u), $n(l, t), et(l, t, a, e), t.child;
      case 6:
        return l === null && fl && ((l = e = Dl) && (e = l0(
          e,
          t.pendingProps,
          Yt
        ), e !== null ? (t.stateNode = e, lt = t, Dl = null, l = !0) : l = !1), l || Ne(t)), null;
      case 13:
        return Gr(l, t, e);
      case 4:
        return Xl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = ra(
          t,
          null,
          a,
          e
        ) : et(l, t, a, e), t.child;
      case 11:
        return Mr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return et(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return et(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return et(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, Oe(t, t.type, a.value), et(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, ca(t), u = tt(u), a = a(u), t.flags |= 1, et(l, t, a, e), t.child;
      case 14:
        return jr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Rr(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Qr(l, t, e);
      case 31:
        return Eh(l, t, e);
      case 22:
        return Ur(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return ca(t), a = tt(Zl), l === null ? (u = Sc(), u === null && (u = Tl, n = yc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, pc(t), Oe(t, Zl, u)) : ((l.lanes & e) !== 0 && (_c(l, t), Mu(t, null, null, e), xu()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Oe(t, Zl, a)) : (a = n.cache, Oe(t, Zl, a), a !== u.cache && hc(
          t,
          [Zl],
          e,
          !0
        ))), et(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function ce(l) {
    l.flags |= 4;
  }
  function ef(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (hd()) l.flags |= 8192;
        else
          throw oa = Un, bc;
    } else l.flags &= -16777217;
  }
  function Lr(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !um(t))
      if (hd()) l.flags |= 8192;
      else
        throw oa = Un, bc;
  }
  function Fn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? _s() : 536870912, l.lanes |= t, wa |= t);
  }
  function qu(l, t) {
    if (!fl)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function xl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function zh(l, t, e) {
    var a = t.pendingProps;
    switch (oc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xl(t), null;
      case 1:
        return xl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ae(Zl), Cl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Ca(t) ? ce(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, dc())), xl(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (ce(t), n !== null ? (xl(t), Lr(t, n)) : (xl(t), ef(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (ce(t), xl(t), Lr(t, n)) : (xl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && ce(t), xl(t), ef(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (We(t), e = F.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return xl(t), null;
          }
          l = B.current, Ca(t) ? Eo(t) : (l = Fd(u, a, e), t.stateNode = l, ce(t));
        }
        return xl(t), null;
      case 5:
        if (We(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return xl(t), null;
          }
          if (n = B.current, Ca(t))
            Eo(t);
          else {
            var i = ri(
              F.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[Pl] = t, n[mt] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = n;
            l: switch (at(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && ce(t);
          }
        }
        return xl(t), ef(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && ce(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(s(166));
          if (l = F.current, Ca(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = lt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Pl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Gd(l.nodeValue, e)), l || Ne(t, !0);
          } else
            l = ri(l).createTextNode(
              a
            ), l[Pl] = t, t.stateNode = l;
        }
        return xl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Ca(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Pl] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            xl(t), l = !1;
          } else
            e = dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return xl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = Ca(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Pl] = t;
            } else
              na(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            xl(t), u = !1;
          } else
            u = dc(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
        }
        return Nt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Fn(t, t.updateQueue), xl(t), null);
      case 4:
        return Cl(), l === null && Af(t.stateNode.containerInfo), xl(t), null;
      case 10:
        return ae(t.type), xl(t), null;
      case 19:
        if (O(Vl), a = t.memoizedState, a === null) return xl(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) qu(a, !1);
          else {
            if (Bl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Bn(l), n !== null) {
                  for (t.flags |= 128, qu(a, !1), l = n.updateQueue, t.updateQueue = l, Fn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    go(e, l), e = e.sibling;
                  return U(
                    Vl,
                    Vl.current & 1 | 2
                  ), fl && te(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && Ol() > ti && (t.flags |= 128, u = !0, qu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Bn(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, Fn(t, l), qu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !fl)
                return xl(t), null;
            } else
              2 * Ol() - a.renderingStartTime > ti && e !== 536870912 && (t.flags |= 128, u = !0, qu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = Ol(), l.sibling = null, e = Vl.current, U(
          Vl,
          u ? e & 1 | 2 : e & 1
        ), fl && te(t, a.treeForkCount), l) : (xl(t), null);
      case 22:
      case 23:
        return Nt(t), Ac(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (xl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : xl(t), e = t.updateQueue, e !== null && Fn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && O(fa), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), ae(Zl), xl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Ah(l, t) {
    switch (oc(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return ae(Zl), Cl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return We(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Nt(t), t.alternate === null)
            throw Error(s(340));
          na();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (Nt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          na();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return O(Vl), null;
      case 4:
        return Cl(), null;
      case 10:
        return ae(t.type), null;
      case 22:
      case 23:
        return Nt(t), Ac(), l !== null && O(fa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return ae(Zl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zr(l, t) {
    switch (oc(t), t.tag) {
      case 3:
        ae(Zl), Cl();
        break;
      case 26:
      case 27:
      case 5:
        We(t);
        break;
      case 4:
        Cl();
        break;
      case 31:
        t.memoizedState !== null && Nt(t);
        break;
      case 13:
        Nt(t);
        break;
      case 19:
        O(Vl);
        break;
      case 10:
        ae(t.type);
        break;
      case 22:
      case 23:
        Nt(t), Ac(), l !== null && O(fa);
        break;
      case 24:
        ae(Zl);
    }
  }
  function Bu(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      gl(t, t.return, c);
    }
  }
  function Ue(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var o = e, g = c;
              try {
                g();
              } catch (T) {
                gl(
                  u,
                  o,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (T) {
      gl(t, t.return, T);
    }
  }
  function Kr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ho(t, e);
      } catch (a) {
        gl(l, l.return, a);
      }
    }
  }
  function Jr(l, t, e) {
    e.props = ma(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      gl(l, t, a);
    }
  }
  function Yu(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      gl(l, t, u);
    }
  }
  function wt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          gl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          gl(l, t, u);
        }
      else e.current = null;
  }
  function wr(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      gl(l, l.return, u);
    }
  }
  function af(l, t, e) {
    try {
      var a = l.stateNode;
      wh(a, l.type, e, t), a[mt] = t;
    } catch (u) {
      gl(l, l.return, u);
    }
  }
  function $r(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Xe(l.type) || l.tag === 4;
  }
  function uf(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || $r(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Xe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function nf(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = It));
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (nf(l, t, e), l = l.sibling; l !== null; )
        nf(l, t, e), l = l.sibling;
  }
  function kn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && Xe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (kn(l, t, e), l = l.sibling; l !== null; )
        kn(l, t, e), l = l.sibling;
  }
  function Wr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      at(t, a, e), t[Pl] = l, t[mt] = e;
    } catch (n) {
      gl(l, l.return, n);
    }
  }
  var fe = !1, wl = !1, cf = !1, Fr = typeof WeakSet == "function" ? WeakSet : Set, Il = null;
  function Nh(l, t) {
    if (l = l.containerInfo, Df = Si, l = co(l), Pi(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, c = -1, o = -1, g = 0, T = 0, D = l, p = null;
            t: for (; ; ) {
              for (var _; D !== e || u !== 0 && D.nodeType !== 3 || (c = i + u), D !== n || a !== 0 && D.nodeType !== 3 || (o = i + a), D.nodeType === 3 && (i += D.nodeValue.length), (_ = D.firstChild) !== null; )
                p = D, D = _;
              for (; ; ) {
                if (D === l) break t;
                if (p === e && ++g === u && (c = i), p === n && ++T === a && (o = i), (_ = D.nextSibling) !== null) break;
                D = p, p = D.parentNode;
              }
              D = _;
            }
            e = c === -1 || o === -1 ? null : { start: c, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (xf = { focusedElem: l, selectionRange: e }, Si = !1, Il = t; Il !== null; )
      if (t = Il, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Il = l;
      else
        for (; Il !== null; ) {
          switch (t = Il, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  u = l[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var Y = ma(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    Y,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Z) {
                  gl(
                    e,
                    e.return,
                    Z
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  Rf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Rf(l);
                      break;
                    default:
                      l.textContent = "";
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
              if ((l & 1024) !== 0) throw Error(s(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Il = l;
            break;
          }
          Il = t.return;
        }
  }
  function kr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        oe(l, e), a & 4 && Bu(5, e);
        break;
      case 1:
        if (oe(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              gl(e, e.return, i);
            }
          else {
            var u = ma(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              gl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Kr(e), a & 512 && Yu(e, e.return);
        break;
      case 3:
        if (oe(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Ho(l, t);
          } catch (i) {
            gl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Wr(e);
      case 26:
      case 5:
        oe(l, e), t === null && a & 4 && wr(e), a & 512 && Yu(e, e.return);
        break;
      case 12:
        oe(l, e);
        break;
      case 31:
        oe(l, e), a & 4 && ld(l, e);
        break;
      case 13:
        oe(l, e), a & 4 && td(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Hh.bind(
          null,
          e
        ), t0(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || fe, !a) {
          t = t !== null && t.memoizedState !== null || wl, u = fe;
          var n = wl;
          fe = a, (wl = t) && !n ? re(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : oe(l, e), fe = u, wl = n;
        }
        break;
      case 30:
        break;
      default:
        oe(l, e);
    }
  }
  function Ir(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Ir(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && qi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Rl = null, ht = !1;
  function se(l, t, e) {
    for (e = e.child; e !== null; )
      Pr(l, t, e), e = e.sibling;
  }
  function Pr(l, t, e) {
    if (_t && typeof _t.onCommitFiberUnmount == "function")
      try {
        _t.onCommitFiberUnmount(Ft, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        wl || wt(e, t), se(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        wl || wt(e, t);
        var a = Rl, u = ht;
        Xe(e.type) && (Rl = e.stateNode, ht = !1), se(
          l,
          t,
          e
        ), wu(e.stateNode), Rl = a, ht = u;
        break;
      case 5:
        wl || wt(e, t);
      case 6:
        if (a = Rl, u = ht, Rl = null, se(
          l,
          t,
          e
        ), Rl = a, ht = u, Rl !== null)
          if (ht)
            try {
              (Rl.nodeType === 9 ? Rl.body : Rl.nodeName === "HTML" ? Rl.ownerDocument.body : Rl).removeChild(e.stateNode);
            } catch (n) {
              gl(
                e,
                t,
                n
              );
            }
          else
            try {
              Rl.removeChild(e.stateNode);
            } catch (n) {
              gl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        Rl !== null && (ht ? (l = Rl, Kd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), tu(l)) : Kd(Rl, e.stateNode));
        break;
      case 4:
        a = Rl, u = ht, Rl = e.stateNode.containerInfo, ht = !0, se(
          l,
          t,
          e
        ), Rl = a, ht = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, t), wl || Ue(4, e, t), se(
          l,
          t,
          e
        );
        break;
      case 1:
        wl || (wt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Jr(
          e,
          t,
          a
        )), se(
          l,
          t,
          e
        );
        break;
      case 21:
        se(
          l,
          t,
          e
        );
        break;
      case 22:
        wl = (a = wl) || e.memoizedState !== null, se(
          l,
          t,
          e
        ), wl = a;
        break;
      default:
        se(
          l,
          t,
          e
        );
    }
  }
  function ld(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        tu(l);
      } catch (e) {
        gl(t, t.return, e);
      }
    }
  }
  function td(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        tu(l);
      } catch (e) {
        gl(t, t.return, e);
      }
  }
  function Oh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Fr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Fr()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function In(l, t) {
    var e = Oh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = qh.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function yt(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (Xe(c.type)) {
                Rl = c.stateNode, ht = !1;
                break l;
              }
              break;
            case 5:
              Rl = c.stateNode, ht = !1;
              break l;
            case 3:
            case 4:
              Rl = c.stateNode.containerInfo, ht = !0;
              break l;
          }
          c = c.return;
        }
        if (Rl === null) throw Error(s(160));
        Pr(n, i, u), Rl = null, ht = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ed(t, l), t = t.sibling;
  }
  var Lt = null;
  function ed(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        yt(t, l), gt(l), a & 4 && (Ue(3, l, l.return), Bu(3, l), Ue(5, l, l.return));
        break;
      case 1:
        yt(t, l), gt(l), a & 512 && (wl || e === null || wt(e, e.return)), a & 64 && fe && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Lt;
        if (yt(t, l), gt(l), a & 512 && (wl || e === null || wt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[ru] || n[Pl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), at(n, a, e), n[Pl] = l, kl(n), a = n;
                      break l;
                    case "link":
                      var i = em(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), at(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = em(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), at(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  n[Pl] = l, kl(n), a = n;
                }
                l.stateNode = a;
              } else
                am(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = tm(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? am(
              u,
              l.type,
              l.stateNode
            ) : tm(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && af(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        yt(t, l), gt(l), a & 512 && (wl || e === null || wt(e, e.return)), e !== null && a & 4 && af(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (yt(t, l), gt(l), a & 512 && (wl || e === null || wt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            za(u, "");
          } catch (Y) {
            gl(l, l.return, Y);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, af(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (cf = !0);
        break;
      case 6:
        if (yt(t, l), gt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (Y) {
            gl(l, l.return, Y);
          }
        }
        break;
      case 3:
        if (vi = null, u = Lt, Lt = di(t.containerInfo), yt(t, l), Lt = u, gt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            tu(t.containerInfo);
          } catch (Y) {
            gl(l, l.return, Y);
          }
        cf && (cf = !1, ad(l));
        break;
      case 4:
        a = Lt, Lt = di(
          l.stateNode.containerInfo
        ), yt(t, l), gt(l), Lt = a;
        break;
      case 12:
        yt(t, l), gt(l);
        break;
      case 31:
        yt(t, l), gt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 13:
        yt(t, l), gt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (li = Ol()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, g = fe, T = wl;
        if (fe = g || u, wl = T || o, yt(t, l), wl = T, fe = g, gt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || o || fe || wl || va(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                o = e = t;
                try {
                  if (n = o.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = o.stateNode;
                    var D = o.memoizedProps.style, p = D != null && D.hasOwnProperty("display") ? D.display : null;
                    c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
                  }
                } catch (Y) {
                  gl(o, o.return, Y);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                o = t;
                try {
                  o.stateNode.nodeValue = u ? "" : o.memoizedProps;
                } catch (Y) {
                  gl(o, o.return, Y);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                o = t;
                try {
                  var _ = o.stateNode;
                  u ? Jd(_, !0) : Jd(o.stateNode, !1);
                } catch (Y) {
                  gl(o, o.return, Y);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, In(l, e))));
        break;
      case 19:
        yt(t, l), gt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, In(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        yt(t, l), gt(l);
    }
  }
  function gt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if ($r(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = uf(l);
            kn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (za(i, ""), e.flags &= -33);
            var c = uf(l);
            kn(l, c, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, g = uf(l);
            nf(
              l,
              g,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        gl(l, l.return, T);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function ad(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        ad(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function oe(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        kr(l, t.alternate, t), t = t.sibling;
  }
  function va(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ue(4, t, t.return), va(t);
          break;
        case 1:
          wt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Jr(
            t,
            t.return,
            e
          ), va(t);
          break;
        case 27:
          wu(t.stateNode);
        case 26:
        case 5:
          wt(t, t.return), va(t);
          break;
        case 22:
          t.memoizedState === null && va(t);
          break;
        case 30:
          va(t);
          break;
        default:
          va(t);
      }
      l = l.sibling;
    }
  }
  function re(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          re(
            u,
            n,
            e
          ), Bu(4, n);
          break;
        case 1:
          if (re(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (g) {
              gl(a, a.return, g);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var o = u.shared.hiddenCallbacks;
              if (o !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < o.length; u++)
                  Co(o[u], c);
            } catch (g) {
              gl(a, a.return, g);
            }
          }
          e && i & 64 && Kr(n), Yu(n, n.return);
          break;
        case 27:
          Wr(n);
        case 26:
        case 5:
          re(
            u,
            n,
            e
          ), e && a === null && i & 4 && wr(n), Yu(n, n.return);
          break;
        case 12:
          re(
            u,
            n,
            e
          );
          break;
        case 31:
          re(
            u,
            n,
            e
          ), e && i & 4 && ld(u, n);
          break;
        case 13:
          re(
            u,
            n,
            e
          ), e && i & 4 && td(u, n);
          break;
        case 22:
          n.memoizedState === null && re(
            u,
            n,
            e
          ), Yu(n, n.return);
          break;
        case 30:
          break;
        default:
          re(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function ff(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && zu(e));
  }
  function sf(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && zu(l));
  }
  function Zt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ud(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function ud(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && Bu(9, t);
        break;
      case 1:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && zu(l)));
        break;
      case 12:
        if (u & 2048) {
          Zt(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (o) {
            gl(t, t.return, o);
          }
        } else
          Zt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Zt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Zt(
          l,
          t,
          e,
          a
        ) : Gu(l, t) : n._visibility & 2 ? Zt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, Za(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && ff(i, t);
        break;
      case 24:
        Zt(
          l,
          t,
          e,
          a
        ), u & 2048 && sf(t.alternate, t);
        break;
      default:
        Zt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Za(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, o = a, g = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(
            n,
            i,
            c,
            o,
            u
          ), Bu(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Za(
            n,
            i,
            c,
            o,
            u
          ) : Gu(
            n,
            i
          ) : (T._visibility |= 2, Za(
            n,
            i,
            c,
            o,
            u
          )), u && g & 2048 && ff(
            i.alternate,
            i
          );
          break;
        case 24:
          Za(
            n,
            i,
            c,
            o,
            u
          ), u && g & 2048 && sf(i.alternate, i);
          break;
        default:
          Za(
            n,
            i,
            c,
            o,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Gu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            Gu(e, a), u & 2048 && ff(
              a.alternate,
              a
            );
            break;
          case 24:
            Gu(e, a), u & 2048 && sf(a.alternate, a);
            break;
          default:
            Gu(e, a);
        }
        t = t.sibling;
      }
  }
  var Xu = 8192;
  function Ka(l, t, e) {
    if (l.subtreeFlags & Xu)
      for (l = l.child; l !== null; )
        nd(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function nd(l, t, e) {
    switch (l.tag) {
      case 26:
        Ka(
          l,
          t,
          e
        ), l.flags & Xu && l.memoizedState !== null && m0(
          e,
          Lt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Ka(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Lt;
        Lt = di(l.stateNode.containerInfo), Ka(
          l,
          t,
          e
        ), Lt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = Xu, Xu = 16777216, Ka(
          l,
          t,
          e
        ), Xu = a) : Ka(
          l,
          t,
          e
        ));
        break;
      default:
        Ka(
          l,
          t,
          e
        );
    }
  }
  function id(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function Qu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Il = a, fd(
            a,
            l
          );
        }
      id(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        cd(l), l = l.sibling;
  }
  function cd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Qu(l), l.flags & 2048 && Ue(9, l, l.return);
        break;
      case 3:
        Qu(l);
        break;
      case 12:
        Qu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Pn(l)) : Qu(l);
        break;
      default:
        Qu(l);
    }
  }
  function Pn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Il = a, fd(
            a,
            l
          );
        }
      id(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, t, t.return), Pn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Pn(t));
          break;
        default:
          Pn(t);
      }
      l = l.sibling;
    }
  }
  function fd(l, t) {
    for (; Il !== null; ) {
      var e = Il;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          zu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Il = a;
      else
        l: for (e = l; Il !== null; ) {
          a = Il;
          var u = a.sibling, n = a.return;
          if (Ir(a), a === e) {
            Il = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Il = u;
            break l;
          }
          Il = n;
        }
    }
  }
  var Dh = {
    getCacheForType: function(l) {
      var t = tt(Zl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return tt(Zl).controller.signal;
    }
  }, xh = typeof WeakMap == "function" ? WeakMap : Map, vl = 0, Tl = null, tl = null, ul = 0, yl = 0, Ot = null, Ce = !1, Ja = !1, of = !1, de = 0, Bl = 0, He = 0, ha = 0, rf = 0, Dt = 0, wa = 0, Vu = null, St = null, df = !1, li = 0, sd = 0, ti = 1 / 0, ei = null, qe = null, $l = 0, Be = null, $a = null, me = 0, mf = 0, vf = null, od = null, Lu = 0, hf = null;
  function xt() {
    return (vl & 2) !== 0 && ul !== 0 ? ul & -ul : E.T !== null ? _f() : As();
  }
  function rd() {
    if (Dt === 0)
      if ((ul & 536870912) === 0 || fl) {
        var l = on;
        on <<= 1, (on & 3932160) === 0 && (on = 262144), Dt = l;
      } else Dt = 536870912;
    return l = At.current, l !== null && (l.flags |= 32), Dt;
  }
  function bt(l, t, e) {
    (l === Tl && (yl === 2 || yl === 9) || l.cancelPendingCommit !== null) && (Wa(l, 0), Ye(
      l,
      ul,
      Dt,
      !1
    )), ou(l, e), ((vl & 2) === 0 || l !== Tl) && (l === Tl && ((vl & 2) === 0 && (ha |= e), Bl === 4 && Ye(
      l,
      ul,
      Dt,
      !1
    )), $t(l));
  }
  function dd(l, t, e) {
    if ((vl & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || su(l, t), u = a ? Rh(l, t) : gf(l, t, !0), n = a;
    do {
      if (u === 0) {
        Ja && !a && Ye(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !Mh(e)) {
          u = gf(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = Vu;
              var o = c.current.memoizedState.isDehydrated;
              if (o && (Wa(c, i).flags |= 256), i = gf(
                c,
                i,
                !1
              ), i !== 2) {
                if (of && !o) {
                  c.errorRecoveryDisabledLanes |= n, ha |= n, u = 4;
                  break l;
                }
                n = St, St = u, n !== null && (St === null ? St = n : St.push.apply(
                  St,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wa(l, 0), Ye(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ye(
                a,
                t,
                Dt,
                !Ce
              );
              break l;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = li + 300 - Ol(), 10 < u)) {
            if (Ye(
              a,
              t,
              Dt,
              !Ce
            ), dn(a, 0, !0) !== 0) break l;
            me = t, a.timeoutHandle = Ld(
              md.bind(
                null,
                a,
                e,
                St,
                ei,
                df,
                t,
                Dt,
                ha,
                wa,
                Ce,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          md(
            a,
            e,
            St,
            ei,
            df,
            t,
            Dt,
            ha,
            wa,
            Ce,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    $t(l);
  }
  function md(l, t, e, a, u, n, i, c, o, g, T, D, p, _) {
    if (l.timeoutHandle = -1, D = t.subtreeFlags, D & 8192 || (D & 16785408) === 16785408) {
      D = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: It
      }, nd(
        t,
        n,
        D
      );
      var Y = (n & 62914560) === n ? li - Ol() : (n & 4194048) === n ? sd - Ol() : 0;
      if (Y = v0(
        D,
        Y
      ), Y !== null) {
        me = n, l.cancelPendingCommit = Y(
          _d.bind(
            null,
            l,
            t,
            n,
            e,
            a,
            u,
            i,
            c,
            o,
            T,
            D,
            null,
            p,
            _
          )
        ), Ye(l, n, i, !g);
        return;
      }
    }
    _d(
      l,
      t,
      n,
      e,
      a,
      u,
      i,
      c,
      o
    );
  }
  function Mh(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Tt(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Ye(l, t, e, a) {
    t &= ~rf, t &= ~ha, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - Et(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Es(l, e, t);
  }
  function ai() {
    return (vl & 6) === 0 ? (Zu(0), !1) : !0;
  }
  function yf() {
    if (tl !== null) {
      if (yl === 0)
        var l = tl.return;
      else
        l = tl, ee = ia = null, jc(l), Ga = null, Nu = 0, l = tl;
      for (; l !== null; )
        Zr(l.alternate, l), l = l.return;
      tl = null;
    }
  }
  function Wa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Fh(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), me = 0, yf(), Tl = l, tl = e = le(l.current, null), ul = t, yl = 0, Ot = null, Ce = !1, Ja = su(l, t), of = !1, wa = Dt = rf = ha = He = Bl = 0, St = Vu = null, df = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - Et(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return de = t, zn(), e;
  }
  function vd(l, t) {
    k = null, E.H = Cu, t === Ya || t === Rn ? (t = Mo(), yl = 3) : t === bc ? (t = Mo(), yl = 4) : yl = t === wc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, tl === null && (Bl = 1, Jn(
      l,
      Ht(t, l.current)
    ));
  }
  function hd() {
    var l = At.current;
    return l === null ? !0 : (ul & 4194048) === ul ? Gt === null : (ul & 62914560) === ul || (ul & 536870912) !== 0 ? l === Gt : !1;
  }
  function yd() {
    var l = E.H;
    return E.H = Cu, l === null ? Cu : l;
  }
  function gd() {
    var l = E.A;
    return E.A = Dh, l;
  }
  function ui() {
    Bl = 4, Ce || (ul & 4194048) !== ul && At.current !== null || (Ja = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || Tl === null || Ye(
      Tl,
      ul,
      Dt,
      !1
    );
  }
  function gf(l, t, e) {
    var a = vl;
    vl |= 2;
    var u = yd(), n = gd();
    (Tl !== l || ul !== t) && (ei = null, Wa(l, t)), t = !1;
    var i = Bl;
    l: do
      try {
        if (yl !== 0 && tl !== null) {
          var c = tl, o = Ot;
          switch (yl) {
            case 8:
              yf(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              At.current === null && (t = !0);
              var g = yl;
              if (yl = 0, Ot = null, Fa(l, c, o, g), e && Ja) {
                i = 0;
                break l;
              }
              break;
            default:
              g = yl, yl = 0, Ot = null, Fa(l, c, o, g);
          }
        }
        jh(), i = Bl;
        break;
      } catch (T) {
        vd(l, T);
      }
    while (!0);
    return t && l.shellSuspendCounter++, ee = ia = null, vl = a, E.H = u, E.A = n, tl === null && (Tl = null, ul = 0, zn()), i;
  }
  function jh() {
    for (; tl !== null; ) Sd(tl);
  }
  function Rh(l, t) {
    var e = vl;
    vl |= 2;
    var a = yd(), u = gd();
    Tl !== l || ul !== t ? (ei = null, ti = Ol() + 500, Wa(l, t)) : Ja = su(
      l,
      t
    );
    l: do
      try {
        if (yl !== 0 && tl !== null) {
          t = tl;
          var n = Ot;
          t: switch (yl) {
            case 1:
              yl = 0, Ot = null, Fa(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Do(n)) {
                yl = 0, Ot = null, bd(t);
                break;
              }
              t = function() {
                yl !== 2 && yl !== 9 || Tl !== l || (yl = 7), $t(l);
              }, n.then(t, t);
              break l;
            case 3:
              yl = 7;
              break l;
            case 4:
              yl = 5;
              break l;
            case 7:
              Do(n) ? (yl = 0, Ot = null, bd(t)) : (yl = 0, Ot = null, Fa(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (tl.tag) {
                case 26:
                  i = tl.memoizedState;
                case 5:
                case 27:
                  var c = tl;
                  if (i ? um(i) : c.stateNode.complete) {
                    yl = 0, Ot = null;
                    var o = c.sibling;
                    if (o !== null) tl = o;
                    else {
                      var g = c.return;
                      g !== null ? (tl = g, ni(g)) : tl = null;
                    }
                    break t;
                  }
              }
              yl = 0, Ot = null, Fa(l, t, n, 5);
              break;
            case 6:
              yl = 0, Ot = null, Fa(l, t, n, 6);
              break;
            case 8:
              yf(), Bl = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        Uh();
        break;
      } catch (T) {
        vd(l, T);
      }
    while (!0);
    return ee = ia = null, E.H = a, E.A = u, vl = e, tl !== null ? 0 : (Tl = null, ul = 0, zn(), Bl);
  }
  function Uh() {
    for (; tl !== null && !rt(); )
      Sd(tl);
  }
  function Sd(l) {
    var t = Vr(l.alternate, l, de);
    l.memoizedProps = l.pendingProps, t === null ? ni(l) : tl = t;
  }
  function bd(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qr(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ul
        );
        break;
      case 11:
        t = qr(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ul
        );
        break;
      case 5:
        jc(t);
      default:
        Zr(e, t), t = tl = go(t, de), t = Vr(e, t, de);
    }
    l.memoizedProps = l.pendingProps, t === null ? ni(l) : tl = t;
  }
  function Fa(l, t, e, a) {
    ee = ia = null, jc(t), Ga = null, Nu = 0;
    var u = t.return;
    try {
      if (_h(
        l,
        u,
        t,
        e,
        ul
      )) {
        Bl = 1, Jn(
          l,
          Ht(e, l.current)
        ), tl = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw tl = u, n;
      Bl = 1, Jn(
        l,
        Ht(e, l.current)
      ), tl = null;
      return;
    }
    t.flags & 32768 ? (fl || a === 1 ? l = !0 : Ja || (ul & 536870912) !== 0 ? l = !1 : (Ce = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = At.current, a !== null && a.tag === 13 && (a.flags |= 16384))), pd(t, l)) : ni(t);
  }
  function ni(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        pd(
          t,
          Ce
        );
        return;
      }
      l = t.return;
      var e = zh(
        t.alternate,
        t,
        de
      );
      if (e !== null) {
        tl = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        tl = t;
        return;
      }
      tl = t = l;
    } while (t !== null);
    Bl === 0 && (Bl = 5);
  }
  function pd(l, t) {
    do {
      var e = Ah(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, tl = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        tl = l;
        return;
      }
      tl = l = e;
    } while (l !== null);
    Bl = 6, tl = null;
  }
  function _d(l, t, e, a, u, n, i, c, o) {
    l.cancelPendingCommit = null;
    do
      ii();
    while ($l !== 0);
    if ((vl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (n = t.lanes | t.childLanes, n |= uc, dv(
        l,
        e,
        n,
        i,
        c,
        o
      ), l === Tl && (tl = Tl = null, ul = 0), $a = t, Be = l, me = e, mf = n, vf = u, od = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Bh(ke, function() {
        return Nd(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, u = C.p, C.p = 2, i = vl, vl |= 4;
        try {
          Nh(l, t, e);
        } finally {
          vl = i, C.p = u, E.T = a;
        }
      }
      $l = 1, Ed(), Td(), zd();
    }
  }
  function Ed() {
    if ($l === 1) {
      $l = 0;
      var l = Be, t = $a, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = C.p;
        C.p = 2;
        var u = vl;
        vl |= 4;
        try {
          ed(t, l);
          var n = xf, i = co(l.containerInfo), c = n.focusedElem, o = n.selectionRange;
          if (i !== c && c && c.ownerDocument && io(
            c.ownerDocument.documentElement,
            c
          )) {
            if (o !== null && Pi(c)) {
              var g = o.start, T = o.end;
              if (T === void 0 && (T = g), "selectionStart" in c)
                c.selectionStart = g, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var D = c.ownerDocument || document, p = D && D.defaultView || window;
                if (p.getSelection) {
                  var _ = p.getSelection(), Y = c.textContent.length, Z = Math.min(o.start, Y), El = o.end === void 0 ? Z : Math.min(o.end, Y);
                  !_.extend && Z > El && (i = El, El = Z, Z = i);
                  var v = no(
                    c,
                    Z
                  ), r = no(
                    c,
                    El
                  );
                  if (v && r && (_.rangeCount !== 1 || _.anchorNode !== v.node || _.anchorOffset !== v.offset || _.focusNode !== r.node || _.focusOffset !== r.offset)) {
                    var y = D.createRange();
                    y.setStart(v.node, v.offset), _.removeAllRanges(), Z > El ? (_.addRange(y), _.extend(r.node, r.offset)) : (y.setEnd(r.node, r.offset), _.addRange(y));
                  }
                }
              }
            }
            for (D = [], _ = c; _ = _.parentNode; )
              _.nodeType === 1 && D.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < D.length; c++) {
              var N = D[c];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          Si = !!Df, xf = Df = null;
        } finally {
          vl = u, C.p = a, E.T = e;
        }
      }
      l.current = t, $l = 2;
    }
  }
  function Td() {
    if ($l === 2) {
      $l = 0;
      var l = Be, t = $a, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = C.p;
        C.p = 2;
        var u = vl;
        vl |= 4;
        try {
          kr(l, t.alternate, t);
        } finally {
          vl = u, C.p = a, E.T = e;
        }
      }
      $l = 3;
    }
  }
  function zd() {
    if ($l === 4 || $l === 3) {
      $l = 0, Ql();
      var l = Be, t = $a, e = me, a = od;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? $l = 5 : ($l = 0, $a = Be = null, Ad(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (qe = null), Ci(e), t = t.stateNode, _t && typeof _t.onCommitFiberRoot == "function")
        try {
          _t.onCommitFiberRoot(
            Ft,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = E.T, u = C.p, C.p = 2, E.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          E.T = t, C.p = u;
        }
      }
      (me & 3) !== 0 && ii(), $t(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === hf ? Lu++ : (Lu = 0, hf = l) : Lu = 0, Zu(0);
    }
  }
  function Ad(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, zu(t)));
  }
  function ii() {
    return Ed(), Td(), zd(), Nd();
  }
  function Nd() {
    if ($l !== 5) return !1;
    var l = Be, t = mf;
    mf = 0;
    var e = Ci(me), a = E.T, u = C.p;
    try {
      C.p = 32 > e ? 32 : e, E.T = null, e = vf, vf = null;
      var n = Be, i = me;
      if ($l = 0, $a = Be = null, me = 0, (vl & 6) !== 0) throw Error(s(331));
      var c = vl;
      if (vl |= 4, cd(n.current), ud(
        n,
        n.current,
        i,
        e
      ), vl = c, Zu(0, !1), _t && typeof _t.onPostCommitFiberRoot == "function")
        try {
          _t.onPostCommitFiberRoot(Ft, n);
        } catch {
        }
      return !0;
    } finally {
      C.p = u, E.T = a, Ad(l, t);
    }
  }
  function Od(l, t, e) {
    t = Ht(e, t), t = Jc(l.stateNode, t, 2), l = Me(l, t, 2), l !== null && (ou(l, 2), $t(l));
  }
  function gl(l, t, e) {
    if (l.tag === 3)
      Od(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Od(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            l = Ht(e, l), e = Dr(2), a = Me(t, e, 2), a !== null && (xr(
              e,
              a,
              t,
              l
            ), ou(a, 2), $t(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Sf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new xh();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (of = !0, u.add(e), l = Ch.bind(null, l, t, e), t.then(l, l));
  }
  function Ch(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Tl === l && (ul & e) === e && (Bl === 4 || Bl === 3 && (ul & 62914560) === ul && 300 > Ol() - li ? (vl & 2) === 0 && Wa(l, 0) : rf |= e, wa === ul && (wa = 0)), $t(l);
  }
  function Dd(l, t) {
    t === 0 && (t = _s()), l = aa(l, t), l !== null && (ou(l, t), $t(l));
  }
  function Hh(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Dd(l, e);
  }
  function qh(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), Dd(l, e);
  }
  function Bh(l, t) {
    return Nl(l, t);
  }
  var ci = null, ka = null, bf = !1, fi = !1, pf = !1, Ge = 0;
  function $t(l) {
    l !== ka && l.next === null && (ka === null ? ci = ka = l : ka = ka.next = l), fi = !0, bf || (bf = !0, Gh());
  }
  function Zu(l, t) {
    if (!pf && fi) {
      pf = !0;
      do
        for (var e = !1, a = ci; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Et(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Rd(a, n));
          } else
            n = ul, n = dn(
              a,
              a === Tl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || su(a, n) || (e = !0, Rd(a, n));
          a = a.next;
        }
      while (e);
      pf = !1;
    }
  }
  function Yh() {
    xd();
  }
  function xd() {
    fi = bf = !1;
    var l = 0;
    Ge !== 0 && Wh() && (l = Ge);
    for (var t = Ol(), e = null, a = ci; a !== null; ) {
      var u = a.next, n = Md(a, t);
      n === 0 ? (a.next = null, e === null ? ci = u : e.next = u, u === null && (ka = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (fi = !0)), a = u;
    }
    $l !== 0 && $l !== 5 || Zu(l), Ge !== 0 && (Ge = 0);
  }
  function Md(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Et(n), c = 1 << i, o = u[i];
      o === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = rv(c, t)) : o <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, e = ul, e = dn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (yl === 2 || yl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && ot(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || su(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && ot(a), Ci(e)) {
        case 2:
        case 8:
          e = cu;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = jt;
          break;
        default:
          e = ke;
      }
      return a = jd.bind(null, l), e = Nl(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && ot(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function jd(l, t) {
    if ($l !== 0 && $l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (ii() && l.callbackNode !== e)
      return null;
    var a = ul;
    return a = dn(
      l,
      l === Tl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (dd(l, a, t), Md(l, Ol()), l.callbackNode != null && l.callbackNode === e ? jd.bind(null, l) : null);
  }
  function Rd(l, t) {
    if (ii()) return null;
    dd(l, t, !0);
  }
  function Gh() {
    kh(function() {
      (vl & 6) !== 0 ? Nl(
        pe,
        Yh
      ) : xd();
    });
  }
  function _f() {
    if (Ge === 0) {
      var l = qa;
      l === 0 && (l = sn, sn <<= 1, (sn & 261888) === 0 && (sn = 256)), Ge = l;
    }
    return Ge;
  }
  function Ud(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : yn("" + l);
  }
  function Cd(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Xh(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = Ud(
        (u[mt] || null).action
      ), i = a.submitter;
      i && (t = (t = i[mt] || null) ? Ud(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new pn(
        "action",
        "action",
        null,
        a,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Ge !== 0) {
                  var o = i ? Cd(u, i) : new FormData(u);
                  Xc(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: u.method,
                      action: n
                    },
                    null,
                    o
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), o = i ? Cd(u, i) : new FormData(u), Xc(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: u.method,
                    action: n
                  },
                  n,
                  o
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Ef = 0; Ef < ac.length; Ef++) {
    var Tf = ac[Ef], Qh = Tf.toLowerCase(), Vh = Tf[0].toUpperCase() + Tf.slice(1);
    Vt(
      Qh,
      "on" + Vh
    );
  }
  Vt(oo, "onAnimationEnd"), Vt(ro, "onAnimationIteration"), Vt(mo, "onAnimationStart"), Vt("dblclick", "onDoubleClick"), Vt("focusin", "onFocus"), Vt("focusout", "onBlur"), Vt(uh, "onTransitionRun"), Vt(nh, "onTransitionStart"), Vt(ih, "onTransitionCancel"), Vt(vo, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Pe(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Pe(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Pe("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Pe(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Pe(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Pe(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ku = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Lh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ku)
  );
  function Hd(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], o = c.instance, g = c.currentTarget;
            if (c = c.listener, o !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = g;
            try {
              n(u);
            } catch (T) {
              Tn(T);
            }
            u.currentTarget = null, n = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], o = c.instance, g = c.currentTarget, c = c.listener, o !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = g;
            try {
              n(u);
            } catch (T) {
              Tn(T);
            }
            u.currentTarget = null, n = o;
          }
      }
    }
  }
  function el(l, t) {
    var e = t[Hi];
    e === void 0 && (e = t[Hi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (qd(t, l, 2, !1), e.add(a));
  }
  function zf(l, t, e) {
    var a = 0;
    t && (a |= 4), qd(
      e,
      l,
      a,
      t
    );
  }
  var si = "_reactListening" + Math.random().toString(36).slice(2);
  function Af(l) {
    if (!l[si]) {
      l[si] = !0, Ds.forEach(function(e) {
        e !== "selectionchange" && (Lh.has(e) || zf(e, !1, l), zf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[si] || (t[si] = !0, zf("selectionchange", !1, t));
    }
  }
  function qd(l, t, e, a) {
    switch (rm(t)) {
      case 2:
        var u = g0;
        break;
      case 8:
        u = S0;
        break;
      default:
        u = Xf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !Zi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function Nf(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = ba(c), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Xs(function() {
      var g = n, T = Vi(e), D = [];
      l: {
        var p = ho.get(l);
        if (p !== void 0) {
          var _ = pn, Y = l;
          switch (l) {
            case "keypress":
              if (Sn(e) === 0) break l;
            case "keydown":
            case "keyup":
              _ = qv;
              break;
            case "focusin":
              Y = "focus", _ = $i;
              break;
            case "focusout":
              Y = "blur", _ = $i;
              break;
            case "beforeblur":
            case "afterblur":
              _ = $i;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              _ = Ls;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = zv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Gv;
              break;
            case oo:
            case ro:
            case mo:
              _ = Ov;
              break;
            case vo:
              _ = Qv;
              break;
            case "scroll":
            case "scrollend":
              _ = Ev;
              break;
            case "wheel":
              _ = Lv;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = xv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = Ks;
              break;
            case "toggle":
            case "beforetoggle":
              _ = Kv;
          }
          var Z = (t & 4) !== 0, El = !Z && (l === "scroll" || l === "scrollend"), v = Z ? p !== null ? p + "Capture" : null : p;
          Z = [];
          for (var r = g, y; r !== null; ) {
            var N = r;
            if (y = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || y === null || v === null || (N = mu(r, v), N != null && Z.push(
              Ju(r, N, y)
            )), El) break;
            r = r.return;
          }
          0 < Z.length && (p = new _(
            p,
            Y,
            null,
            e,
            T
          ), D.push({ event: p, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (p = l === "mouseover" || l === "pointerover", _ = l === "mouseout" || l === "pointerout", p && e !== Qi && (Y = e.relatedTarget || e.fromElement) && (ba(Y) || Y[Sa]))
            break l;
          if ((_ || p) && (p = T.window === T ? T : (p = T.ownerDocument) ? p.defaultView || p.parentWindow : window, _ ? (Y = e.relatedTarget || e.toElement, _ = g, Y = Y ? ba(Y) : null, Y !== null && (El = R(Y), Z = Y.tag, Y !== El || Z !== 5 && Z !== 27 && Z !== 6) && (Y = null)) : (_ = null, Y = g), _ !== Y)) {
            if (Z = Ls, N = "onMouseLeave", v = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (Z = Ks, N = "onPointerLeave", v = "onPointerEnter", r = "pointer"), El = _ == null ? p : du(_), y = Y == null ? p : du(Y), p = new Z(
              N,
              r + "leave",
              _,
              e,
              T
            ), p.target = El, p.relatedTarget = y, N = null, ba(T) === g && (Z = new Z(
              v,
              r + "enter",
              Y,
              e,
              T
            ), Z.target = y, Z.relatedTarget = El, N = Z), El = N, _ && Y)
              t: {
                for (Z = Zh, v = _, r = Y, y = 0, N = v; N; N = Z(N))
                  y++;
                N = 0;
                for (var X = r; X; X = Z(X))
                  N++;
                for (; 0 < y - N; )
                  v = Z(v), y--;
                for (; 0 < N - y; )
                  r = Z(r), N--;
                for (; y--; ) {
                  if (v === r || r !== null && v === r.alternate) {
                    Z = v;
                    break t;
                  }
                  v = Z(v), r = Z(r);
                }
                Z = null;
              }
            else Z = null;
            _ !== null && Bd(
              D,
              p,
              _,
              Z,
              !1
            ), Y !== null && El !== null && Bd(
              D,
              El,
              Y,
              Z,
              !0
            );
          }
        }
        l: {
          if (p = g ? du(g) : window, _ = p.nodeName && p.nodeName.toLowerCase(), _ === "select" || _ === "input" && p.type === "file")
            var rl = Ps;
          else if (ks(p))
            if (lo)
              rl = th;
            else {
              rl = Pv;
              var G = Iv;
            }
          else
            _ = p.nodeName, !_ || _.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? g && Xi(g.elementType) && (rl = Ps) : rl = lh;
          if (rl && (rl = rl(l, g))) {
            Is(
              D,
              rl,
              e,
              T
            );
            break l;
          }
          G && G(l, p, g), l === "focusout" && g && p.type === "number" && g.memoizedProps.value != null && Gi(p, "number", p.value);
        }
        switch (G = g ? du(g) : window, l) {
          case "focusin":
            (ks(G) || G.contentEditable === "true") && (Da = G, lc = g, _u = null);
            break;
          case "focusout":
            _u = lc = Da = null;
            break;
          case "mousedown":
            tc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            tc = !1, fo(D, e, T);
            break;
          case "selectionchange":
            if (ah) break;
          case "keydown":
          case "keyup":
            fo(D, e, T);
        }
        var I;
        if (Fi)
          l: {
            switch (l) {
              case "compositionstart":
                var nl = "onCompositionStart";
                break l;
              case "compositionend":
                nl = "onCompositionEnd";
                break l;
              case "compositionupdate":
                nl = "onCompositionUpdate";
                break l;
            }
            nl = void 0;
          }
        else
          Oa ? Ws(l, e) && (nl = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (nl = "onCompositionStart");
        nl && (Js && e.locale !== "ko" && (Oa || nl !== "onCompositionStart" ? nl === "onCompositionEnd" && Oa && (I = Qs()) : (Te = T, Ki = "value" in Te ? Te.value : Te.textContent, Oa = !0)), G = oi(g, nl), 0 < G.length && (nl = new Zs(
          nl,
          l,
          null,
          e,
          T
        ), D.push({ event: nl, listeners: G }), I ? nl.data = I : (I = Fs(e), I !== null && (nl.data = I)))), (I = wv ? $v(l, e) : Wv(l, e)) && (nl = oi(g, "onBeforeInput"), 0 < nl.length && (G = new Zs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), D.push({
          event: G,
          listeners: nl
        }), G.data = I)), Xh(
          D,
          l,
          g,
          e,
          T
        );
      }
      Hd(D, t);
    });
  }
  function Ju(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function oi(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = mu(l, e), u != null && a.unshift(
        Ju(l, u, n)
      ), u = mu(l, t), u != null && a.push(
        Ju(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function Zh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bd(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, o = c.alternate, g = c.stateNode;
      if (c = c.tag, o !== null && o === a) break;
      c !== 5 && c !== 26 && c !== 27 || g === null || (o = g, u ? (g = mu(e, n), g != null && i.unshift(
        Ju(e, g, o)
      )) : u || (g = mu(e, n), g != null && i.push(
        Ju(e, g, o)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Kh = /\r\n?/g, Jh = /\u0000|\uFFFD/g;
  function Yd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Kh, `
`).replace(Jh, "");
  }
  function Gd(l, t) {
    return t = Yd(t), Yd(l) === t;
  }
  function _l(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || za(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && za(l, "" + a);
        break;
      case "className":
        vn(l, "class", a);
        break;
      case "tabIndex":
        vn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vn(l, e, a);
        break;
      case "style":
        Ys(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          vn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = yn("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (t !== "input" && _l(l, t, "name", u.name, u, null), _l(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), _l(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), _l(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (_l(l, t, "encType", u.encType, u, null), _l(l, t, "method", u.method, u, null), _l(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = yn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = It);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = yn("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        el("beforetoggle", l), el("toggle", l), mn(l, "popover", a);
        break;
      case "xlinkActuate":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        kt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        kt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        mn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = pv.get(e) || e, mn(l, e, a));
    }
  }
  function Of(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Ys(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? za(l, a) : (typeof a == "number" || typeof a == "bigint") && za(l, "" + a);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = It);
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
        if (!xs.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[mt] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : mn(l, e, a);
          }
    }
  }
  function at(l, t, e) {
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
        el("error", l), el("load", l);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  _l(l, t, n, i, e, null);
              }
          }
        u && _l(l, t, "srcSet", e.srcSet, e, null), a && _l(l, t, "src", e.src, e, null);
        return;
      case "input":
        el("invalid", l);
        var c = n = i = u = null, o = null, g = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  u = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  o = T;
                  break;
                case "defaultChecked":
                  g = T;
                  break;
                case "value":
                  n = T;
                  break;
                case "defaultValue":
                  c = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(s(137, t));
                  break;
                default:
                  _l(l, t, a, T, e, null);
              }
          }
        Cs(
          l,
          n,
          c,
          o,
          g,
          i,
          u,
          !1
        );
        return;
      case "select":
        el("invalid", l), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                _l(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? Ta(l, !!a, t, !1) : e != null && Ta(l, !!a, e, !0);
        return;
      case "textarea":
        el("invalid", l), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                _l(l, t, i, c, e, null);
            }
        qs(l, a, u, n);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                _l(l, t, o, a, e, null);
            }
        return;
      case "dialog":
        el("beforetoggle", l), el("toggle", l), el("cancel", l), el("close", l);
        break;
      case "iframe":
      case "object":
        el("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Ku.length; a++)
          el(Ku[a], l);
        break;
      case "image":
        el("error", l), el("load", l);
        break;
      case "details":
        el("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        el("error", l), el("load", l);
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
        for (g in e)
          if (e.hasOwnProperty(g) && (a = e[g], a != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                _l(l, t, g, a, e, null);
            }
        return;
      default:
        if (Xi(t)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Of(
              l,
              t,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && _l(l, t, c, a, e, null));
  }
  function wh(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, o = null, g = null, T = null;
        for (_ in e) {
          var D = e[_];
          if (e.hasOwnProperty(_) && D != null)
            switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = D;
              default:
                a.hasOwnProperty(_) || _l(l, t, _, null, a, D);
            }
        }
        for (var p in a) {
          var _ = a[p];
          if (D = e[p], a.hasOwnProperty(p) && (_ != null || D != null))
            switch (p) {
              case "type":
                n = _;
                break;
              case "name":
                u = _;
                break;
              case "checked":
                g = _;
                break;
              case "defaultChecked":
                T = _;
                break;
              case "value":
                i = _;
                break;
              case "defaultValue":
                c = _;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(s(137, t));
                break;
              default:
                _ !== D && _l(
                  l,
                  t,
                  p,
                  _,
                  a,
                  D
                );
            }
        }
        Yi(
          l,
          i,
          c,
          o,
          g,
          T,
          n,
          u
        );
        return;
      case "select":
        _ = i = c = p = null;
        for (n in e)
          if (o = e[n], e.hasOwnProperty(n) && o != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                _ = o;
              default:
                a.hasOwnProperty(n) || _l(
                  l,
                  t,
                  n,
                  null,
                  a,
                  o
                );
            }
        for (u in a)
          if (n = a[u], o = e[u], a.hasOwnProperty(u) && (n != null || o != null))
            switch (u) {
              case "value":
                p = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== o && _l(
                  l,
                  t,
                  u,
                  n,
                  a,
                  o
                );
            }
        t = c, e = i, a = _, p != null ? Ta(l, !!e, p, !1) : !!a != !!e && (t != null ? Ta(l, !!e, t, !0) : Ta(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        _ = p = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                _l(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                p = u;
                break;
              case "defaultValue":
                _ = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && _l(l, t, i, u, a, n);
            }
        Hs(l, p, _);
        return;
      case "option":
        for (var Y in e)
          if (p = e[Y], e.hasOwnProperty(Y) && p != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                l.selected = !1;
                break;
              default:
                _l(
                  l,
                  t,
                  Y,
                  null,
                  a,
                  p
                );
            }
        for (o in a)
          if (p = a[o], _ = e[o], a.hasOwnProperty(o) && p !== _ && (p != null || _ != null))
            switch (o) {
              case "selected":
                l.selected = p && typeof p != "function" && typeof p != "symbol";
                break;
              default:
                _l(
                  l,
                  t,
                  o,
                  p,
                  a,
                  _
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
        for (var Z in e)
          p = e[Z], e.hasOwnProperty(Z) && p != null && !a.hasOwnProperty(Z) && _l(l, t, Z, null, a, p);
        for (g in a)
          if (p = a[g], _ = e[g], a.hasOwnProperty(g) && p !== _ && (p != null || _ != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, t));
                break;
              default:
                _l(
                  l,
                  t,
                  g,
                  p,
                  a,
                  _
                );
            }
        return;
      default:
        if (Xi(t)) {
          for (var El in e)
            p = e[El], e.hasOwnProperty(El) && p !== void 0 && !a.hasOwnProperty(El) && Of(
              l,
              t,
              El,
              void 0,
              a,
              p
            );
          for (T in a)
            p = a[T], _ = e[T], !a.hasOwnProperty(T) || p === _ || p === void 0 && _ === void 0 || Of(
              l,
              t,
              T,
              p,
              a,
              _
            );
          return;
        }
    }
    for (var v in e)
      p = e[v], e.hasOwnProperty(v) && p != null && !a.hasOwnProperty(v) && _l(l, t, v, null, a, p);
    for (D in a)
      p = a[D], _ = e[D], !a.hasOwnProperty(D) || p === _ || p == null && _ == null || _l(l, t, D, p, a, _);
  }
  function Xd(l) {
    switch (l) {
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
  function $h() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Xd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], g = o.startTime;
            if (g > c) break;
            var T = o.transferSize, D = o.initiatorType;
            T && Xd(D) && (o = o.responseEnd, i += T * (o < c ? 1 : (c - g) / (o - g)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Df = null, xf = null;
  function ri(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Qd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Vd(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Mf(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var jf = null;
  function Wh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === jf ? !1 : (jf = l, !0) : (jf = null, !1);
  }
  var Ld = typeof setTimeout == "function" ? setTimeout : void 0, Fh = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = typeof Promise == "function" ? Promise : void 0, kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zd < "u" ? function(l) {
    return Zd.resolve(null).then(l).catch(Ih);
  } : Ld;
  function Ih(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Xe(l) {
    return l === "head";
  }
  function Kd(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), tu(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          wu(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, wu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[ru] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && wu(l.ownerDocument.body);
      e = u;
    } while (e);
    tu(t);
  }
  function Jd(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function Rf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Rf(e), qi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Ph(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[ru])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = Xt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function l0(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function wd(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Uf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Cf(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function t0(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function Xt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Hf = null;
  function $d(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return Xt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Wd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Fd(l, t, e) {
    switch (t = ri(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(s(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(s(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(s(454));
        return l;
      default:
        throw Error(s(451));
    }
  }
  function wu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    qi(l);
  }
  var Qt = /* @__PURE__ */ new Map(), kd = /* @__PURE__ */ new Set();
  function di(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var ve = C.d;
  C.d = {
    f: e0,
    r: a0,
    D: u0,
    C: n0,
    L: i0,
    m: c0,
    X: s0,
    S: f0,
    M: o0
  };
  function e0() {
    var l = ve.f(), t = ai();
    return l || t;
  }
  function a0(l) {
    var t = pa(l);
    t !== null && t.tag === 5 && t.type === "form" ? vr(t) : ve.r(l);
  }
  var Ia = typeof document > "u" ? null : document;
  function Id(l, t, e) {
    var a = Ia;
    if (a && typeof t == "string" && t) {
      var u = Ut(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), kd.has(u) || (kd.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), at(t, "link", l), kl(t), a.head.appendChild(t)));
    }
  }
  function u0(l) {
    ve.D(l), Id("dns-prefetch", l, null);
  }
  function n0(l, t) {
    ve.C(l, t), Id("preconnect", l, t);
  }
  function i0(l, t, e) {
    ve.L(l, t, e);
    var a = Ia;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + Ut(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Ut(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Ut(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Ut(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Pa(l);
          break;
        case "script":
          n = lu(l);
      }
      Qt.has(n) || (l = z(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Qt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector($u(n)) || t === "script" && a.querySelector(Wu(n)) || (t = a.createElement("link"), at(t, "link", l), kl(t), a.head.appendChild(t)));
    }
  }
  function c0(l, t) {
    ve.m(l, t);
    var e = Ia;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Ut(a) + '"][href="' + Ut(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = lu(l);
      }
      if (!Qt.has(n) && (l = z({ rel: "modulepreload", href: l }, t), Qt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Wu(n)))
              return;
        }
        a = e.createElement("link"), at(a, "link", l), kl(a), e.head.appendChild(a);
      }
    }
  }
  function f0(l, t, e) {
    ve.S(l, t, e);
    var a = Ia;
    if (a && l) {
      var u = _a(a).hoistableStyles, n = Pa(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          $u(n)
        ))
          c.loading = 5;
        else {
          l = z(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Qt.get(n)) && qf(l, e);
          var o = i = a.createElement("link");
          kl(o), at(o, "link", l), o._p = new Promise(function(g, T) {
            o.onload = g, o.onerror = T;
          }), o.addEventListener("load", function() {
            c.loading |= 1;
          }), o.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, mi(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function s0(l, t) {
    ve.X(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = lu(l), n = a.get(u);
      n || (n = e.querySelector(Wu(u)), n || (l = z({ src: l, async: !0 }, t), (t = Qt.get(u)) && Bf(l, t), n = e.createElement("script"), kl(n), at(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function o0(l, t) {
    ve.M(l, t);
    var e = Ia;
    if (e && l) {
      var a = _a(e).hoistableScripts, u = lu(l), n = a.get(u);
      n || (n = e.querySelector(Wu(u)), n || (l = z({ src: l, async: !0, type: "module" }, t), (t = Qt.get(u)) && Bf(l, t), n = e.createElement("script"), kl(n), at(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Pd(l, t, e, a) {
    var u = (u = F.current) ? di(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Pa(e.href), e = _a(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Pa(e.href);
          var n = _a(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            $u(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Qt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Qt.set(l, e), n || r0(
            u,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = lu(e), e = _a(
          u
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, l));
    }
  }
  function Pa(l) {
    return 'href="' + Ut(l) + '"';
  }
  function $u(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function lm(l) {
    return z({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function r0(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), at(t, "link", e), kl(t), l.head.appendChild(t));
  }
  function lu(l) {
    return '[src="' + Ut(l) + '"]';
  }
  function Wu(l) {
    return "script[async]" + l;
  }
  function tm(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + Ut(e.href) + '"]'
          );
          if (a)
            return t.instance = a, kl(a), a;
          var u = z({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), kl(a), at(a, "style", u), mi(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = Pa(e.href);
          var n = l.querySelector(
            $u(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, kl(n), n;
          a = lm(e), (u = Qt.get(u)) && qf(a, u), n = (l.ownerDocument || l).createElement("link"), kl(n);
          var i = n;
          return i._p = new Promise(function(c, o) {
            i.onload = c, i.onerror = o;
          }), at(n, "link", a), t.state.loading |= 4, mi(n, e.precedence, l), t.instance = n;
        case "script":
          return n = lu(e.src), (u = l.querySelector(
            Wu(n)
          )) ? (t.instance = u, kl(u), u) : (a = e, (u = Qt.get(n)) && (a = z({}, e), Bf(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), kl(u), at(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, mi(a, e.precedence, l));
    return t.instance;
  }
  function mi(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function qf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Bf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var vi = null;
  function em(l, t, e) {
    if (vi === null) {
      var a = /* @__PURE__ */ new Map(), u = vi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = vi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[ru] || n[Pl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function am(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function d0(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
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
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function um(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function m0(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Pa(a.href), n = t.querySelector(
          $u(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = hi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, kl(n);
          return;
        }
        n = t.ownerDocument || t, a = lm(a), (u = Qt.get(u)) && qf(a, u), n = n.createElement("link"), kl(n);
        var i = n;
        i._p = new Promise(function(c, o) {
          i.onload = c, i.onerror = o;
        }), at(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = hi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Yf = 0;
  function v0(l, t) {
    return l.stylesheets && l.count === 0 && gi(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && gi(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Yf === 0 && (Yf = 62500 * $h());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && gi(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Yf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function hi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) gi(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var yi = null;
  function gi(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, yi = /* @__PURE__ */ new Map(), t.forEach(h0, l), yi = null, hi.call(l));
  }
  function h0(l, t) {
    if (!(t.state.loading & 4)) {
      var e = yi.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), yi.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = hi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Fu = {
    $$typeof: Ml,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function y0(l, t, e, a, u, n, i, c, o) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ri(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ri(0), this.hiddenUpdates = Ri(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function nm(l, t, e, a, u, n, i, c, o, g, T, D) {
    return l = new y0(
      l,
      t,
      e,
      i,
      o,
      g,
      T,
      D,
      c
    ), t = 1, n === !0 && (t |= 24), n = zt(3, null, null, t), l.current = n, n.stateNode = l, t = yc(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, pc(n), l;
  }
  function im(l) {
    return l ? (l = ja, l) : ja;
  }
  function cm(l, t, e, a, u, n) {
    u = im(u), a.context === null ? a.context = u : a.pendingContext = u, a = xe(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Me(l, a, t), e !== null && (bt(e, l, t), Du(e, l, t));
  }
  function fm(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Gf(l, t) {
    fm(l, t), (l = l.alternate) && fm(l, t);
  }
  function sm(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = aa(l, 67108864);
      t !== null && bt(t, l, 67108864), Gf(l, 67108864);
    }
  }
  function om(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = xt();
      t = Ui(t);
      var e = aa(l, t);
      e !== null && bt(e, l, t), Gf(l, t);
    }
  }
  var Si = !0;
  function g0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = C.p;
    try {
      C.p = 2, Xf(l, t, e, a);
    } finally {
      C.p = n, E.T = u;
    }
  }
  function S0(l, t, e, a) {
    var u = E.T;
    E.T = null;
    var n = C.p;
    try {
      C.p = 8, Xf(l, t, e, a);
    } finally {
      C.p = n, E.T = u;
    }
  }
  function Xf(l, t, e, a) {
    if (Si) {
      var u = Qf(a);
      if (u === null)
        Nf(
          l,
          t,
          a,
          bi,
          e
        ), dm(l, a);
      else if (p0(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (dm(l, a), t & 4 && -1 < b0.indexOf(l)) {
        for (; u !== null; ) {
          var n = pa(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Ie(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var o = 1 << 31 - Et(i);
                      c.entanglements[1] |= o, i &= ~o;
                    }
                    $t(n), (vl & 6) === 0 && (ti = Ol() + 500, Zu(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = aa(n, 2), c !== null && bt(c, n, 2), ai(), Gf(n, 2);
            }
          if (n = Qf(a), n === null && Nf(
            l,
            t,
            a,
            bi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Nf(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function Qf(l) {
    return l = Vi(l), Vf(l);
  }
  var bi = null;
  function Vf(l) {
    if (bi = null, l = ba(l), l !== null) {
      var t = R(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = x(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = q(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return bi = l, null;
  }
  function rm(l) {
    switch (l) {
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
        switch (Fe()) {
          case pe:
            return 2;
          case cu:
            return 8;
          case ke:
          case dt:
            return 32;
          case jt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Lf = !1, Qe = null, Ve = null, Le = null, ku = /* @__PURE__ */ new Map(), Iu = /* @__PURE__ */ new Map(), Ze = [], b0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function dm(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Qe = null;
        break;
      case "dragenter":
      case "dragleave":
        Ve = null;
        break;
      case "mouseover":
      case "mouseout":
        Le = null;
        break;
      case "pointerover":
      case "pointerout":
        ku.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Iu.delete(t.pointerId);
    }
  }
  function Pu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = pa(t), t !== null && sm(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function p0(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return Qe = Pu(
          Qe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ve = Pu(
          Ve,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Le = Pu(
          Le,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return ku.set(
          n,
          Pu(
            ku.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, Iu.set(
          n,
          Pu(
            Iu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function mm(l) {
    var t = ba(l.target);
    if (t !== null) {
      var e = R(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = x(e), t !== null) {
            l.blockedOn = t, Ns(l.priority, function() {
              om(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = q(e), t !== null) {
            l.blockedOn = t, Ns(l.priority, function() {
              om(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function pi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Qf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Qi = a, e.target.dispatchEvent(a), Qi = null;
      } else
        return t = pa(e), t !== null && sm(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function vm(l, t, e) {
    pi(l) && e.delete(t);
  }
  function _0() {
    Lf = !1, Qe !== null && pi(Qe) && (Qe = null), Ve !== null && pi(Ve) && (Ve = null), Le !== null && pi(Le) && (Le = null), ku.forEach(vm), Iu.forEach(vm);
  }
  function _i(l, t) {
    l.blockedOn === t && (l.blockedOn = null, Lf || (Lf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      _0
    )));
  }
  var Ei = null;
  function hm(l) {
    Ei !== l && (Ei = l, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Ei === l && (Ei = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (Vf(a || e) === null)
              continue;
            break;
          }
          var n = pa(e);
          n !== null && (l.splice(t, 3), t -= 3, Xc(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function tu(l) {
    function t(o) {
      return _i(o, l);
    }
    Qe !== null && _i(Qe, l), Ve !== null && _i(Ve, l), Le !== null && _i(Le, l), ku.forEach(t), Iu.forEach(t);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      mm(e), e.blockedOn === null && Ze.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[mt] || null;
        if (typeof n == "function")
          i || hm(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[mt] || null)
              c = i.formAction;
            else if (Vf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), hm(e);
        }
      }
  }
  function ym() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Zf(l) {
    this._internalRoot = l;
  }
  Ti.prototype.render = Zf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = xt();
    cm(e, a, l, t, null, null);
  }, Ti.prototype.unmount = Zf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      cm(l.current, 2, null, l, null, null), ai(), t[Sa] = null;
    }
  };
  function Ti(l) {
    this._internalRoot = l;
  }
  Ti.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = As();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Ze.length && t !== 0 && t < Ze[e].priority; e++) ;
      Ze.splice(e, 0, l), e === 0 && mm(l);
    }
  };
  var gm = b.version;
  if (gm !== "19.2.6")
    throw Error(
      s(
        527,
        gm,
        "19.2.6"
      )
    );
  C.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = S(t), l = l !== null ? M(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var E0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: E,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber)
      try {
        Ft = zi.inject(
          E0
        ), _t = zi;
      } catch {
      }
  }
  return tn.createRoot = function(l, t) {
    if (!j(l)) throw Error(s(299));
    var e = !1, a = "", u = zr, n = Ar, i = Nr;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = nm(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      ym
    ), l[Sa] = t.current, Af(l), new Zf(t);
  }, tn.hydrateRoot = function(l, t, e) {
    if (!j(l)) throw Error(s(299));
    var a = !1, u = "", n = zr, i = Ar, c = Nr, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), t = nm(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      u,
      o,
      n,
      i,
      c,
      ym
    ), t.context = im(null), e = t.current, a = xt(), a = Ui(a), u = xe(a), u.callback = null, Me(e, u, a), e = a, t.current.lanes = e, ou(t, e), $t(t), l[Sa] = t.current, Af(l), new Ti(t);
  }, tn.version = "19.2.6", tn;
}
var Om;
function U0() {
  if (Om) return wf.exports;
  Om = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (b) {
        console.error(b);
      }
  }
  return f(), wf.exports = R0(), wf.exports;
}
var C0 = U0(), kf = { exports: {} }, If = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dm;
function H0() {
  if (Dm) return If;
  Dm = 1;
  var f = Mi();
  function b(z, H) {
    return z === H && (z !== 0 || 1 / z === 1 / H) || z !== z && H !== H;
  }
  var h = typeof Object.is == "function" ? Object.is : b, s = f.useState, j = f.useEffect, R = f.useLayoutEffect, x = f.useDebugValue;
  function q(z, H) {
    var V = H(), al = s({ inst: { value: V, getSnapshot: H } }), P = al[0].inst, Sl = al[1];
    return R(
      function() {
        P.value = V, P.getSnapshot = H, A(P) && Sl({ inst: P });
      },
      [z, V, H]
    ), j(
      function() {
        return A(P) && Sl({ inst: P }), z(function() {
          A(P) && Sl({ inst: P });
        });
      },
      [z]
    ), x(V), V;
  }
  function A(z) {
    var H = z.getSnapshot;
    z = z.value;
    try {
      var V = H();
      return !h(z, V);
    } catch {
      return !0;
    }
  }
  function S(z, H) {
    return H();
  }
  var M = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? S : q;
  return If.useSyncExternalStore = f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : M, If;
}
var xm;
function q0() {
  return xm || (xm = 1, kf.exports = H0()), kf.exports;
}
var Mm = q0();
const Vm = 0, Lm = 1, Zm = 2, jm = 3;
var Rm = Object.prototype.hasOwnProperty;
function ns(f, b) {
  var h, s;
  if (f === b) return !0;
  if (f && b && (h = f.constructor) === b.constructor) {
    if (h === Date) return f.getTime() === b.getTime();
    if (h === RegExp) return f.toString() === b.toString();
    if (h === Array) {
      if ((s = f.length) === b.length)
        for (; s-- && ns(f[s], b[s]); ) ;
      return s === -1;
    }
    if (!h || typeof f == "object") {
      s = 0;
      for (h in f)
        if (Rm.call(f, h) && ++s && !Rm.call(b, h) || !(h in b) || !ns(f[h], b[h])) return !1;
      return Object.keys(b).length === s;
    }
  }
  return f !== f && b !== b;
}
const ye = /* @__PURE__ */ new WeakMap(), Se = () => {
}, nt = (
  /*#__NOINLINE__*/
  Se()
), is = Object, il = (f) => f === nt, Wt = (f) => typeof f == "function", $e = (f, b) => ({
  ...f,
  ...b
}), Km = (f) => Wt(f.then), Pf = {}, Ai = {}, hs = "undefined", un = typeof window != hs, cs = typeof document != hs, B0 = un && "Deno" in window, Y0 = () => un && typeof window.requestAnimationFrame != hs, Jm = (f, b) => {
  const h = ye.get(f);
  return [
    // Getter
    () => !il(b) && f.get(b) || Pf,
    // Setter
    (s) => {
      if (!il(b)) {
        const j = f.get(b);
        b in Ai || (Ai[b] = j), h[5](b, $e(j, s), j || Pf);
      }
    },
    // Subscriber
    h[6],
    // Get server cache snapshot
    () => !il(b) && b in Ai ? Ai[b] : !il(b) && f.get(b) || Pf
  ];
};
let fs = !0;
const G0 = () => fs, [ss, os] = un && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], X0 = () => {
  const f = cs && document.visibilityState;
  return il(f) || f !== "hidden";
}, Q0 = (f) => (cs && document.addEventListener("visibilitychange", f), ss("focus", f), () => {
  cs && document.removeEventListener("visibilitychange", f), os("focus", f);
}), V0 = (f) => {
  const b = () => {
    fs = !0, f();
  }, h = () => {
    fs = !1;
  };
  return ss("online", b), ss("offline", h), () => {
    os("online", b), os("offline", h);
  };
}, L0 = {
  isOnline: G0,
  isVisible: X0
}, Z0 = {
  initFocus: Q0,
  initReconnect: V0
}, Um = !vs.useId, au = !un || B0, K0 = (f) => Y0() ? window.requestAnimationFrame(f) : setTimeout(f, 1), ls = au ? $.useEffect : $.useLayoutEffect, ts = typeof navigator < "u" && navigator.connection, Cm = !au && ts && ([
  "slow-2g",
  "2g"
].includes(ts.effectiveType) || ts.saveData), Ni = /* @__PURE__ */ new WeakMap(), J0 = (f) => is.prototype.toString.call(f), es = (f, b) => f === `[object ${b}]`;
let w0 = 0;
const rs = (f) => {
  const b = typeof f, h = J0(f), s = es(h, "Date"), j = es(h, "RegExp"), R = es(h, "Object");
  let x, q;
  if (is(f) === f && !s && !j) {
    if (x = Ni.get(f), x) return x;
    if (x = ++w0 + "~", Ni.set(f, x), Array.isArray(f)) {
      for (x = "@", q = 0; q < f.length; q++)
        x += rs(f[q]) + ",";
      Ni.set(f, x);
    }
    if (R) {
      x = "#";
      const A = is.keys(f).sort();
      for (; !il(q = A.pop()); )
        il(f[q]) || (x += q + ":" + rs(f[q]) + ",");
      Ni.set(f, x);
    }
  } else
    x = s ? f.toJSON() : b == "symbol" ? f.toString() : b == "string" ? JSON.stringify(f) : "" + f;
  return x;
}, ys = (f) => {
  if (Wt(f))
    try {
      f = f();
    } catch {
      f = "";
    }
  const b = f;
  return f = typeof f == "string" ? f : (Array.isArray(f) ? f.length : f) ? rs(f) : "", [
    f,
    b
  ];
};
let $0 = 0;
const ds = () => ++$0;
async function wm(...f) {
  const [b, h, s, j] = f, R = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof j == "boolean" ? {
    revalidate: j
  } : j || {});
  let x = R.populateCache;
  const q = R.rollbackOnError;
  let A = R.optimisticData;
  const S = (H) => typeof q == "function" ? q(H) : q !== !1, M = R.throwOnError;
  if (Wt(h)) {
    const H = h, V = [], al = b.keys();
    for (const P of al)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(P) && H(b.get(P)._k) && V.push(P);
    return Promise.all(V.map(z));
  }
  return z(h);
  async function z(H) {
    const [V] = ys(H);
    if (!V) return;
    const [al, P] = Jm(b, V), [Sl, Hl, L, Ml] = ye.get(b), Yl = () => {
      const Gl = Sl[V];
      return (Wt(R.revalidate) ? R.revalidate(al().data, H) : R.revalidate !== !1) && (delete L[V], delete Ml[V], Gl && Gl[0]) ? Gl[0](Zm).then(() => al().data) : al().data;
    };
    if (f.length < 3)
      return Yl();
    let hl = s, ol, K = !1;
    const Ul = ds();
    Hl[V] = [
      Ul,
      0
    ];
    const cl = !il(A), it = al(), J = it.data, zl = it._c, ct = il(zl) ? J : zl;
    if (cl && (A = Wt(A) ? A(ct, J) : A, P({
      data: A,
      _c: ct
    })), Wt(hl))
      try {
        hl = hl(ct);
      } catch (Gl) {
        ol = Gl, K = !0;
      }
    if (hl && Km(hl))
      if (hl = await hl.catch((Gl) => {
        ol = Gl, K = !0;
      }), Ul !== Hl[V][0]) {
        if (K) throw ol;
        return hl;
      } else K && cl && S(ol) && (x = !0, P({
        data: ct,
        _c: nt
      }));
    if (x && !K)
      if (Wt(x)) {
        const Gl = x(hl, ct);
        P({
          data: Gl,
          error: nt,
          _c: nt
        });
      } else
        P({
          data: hl,
          error: nt,
          _c: nt
        });
    if (Hl[V][1] = ds(), Promise.resolve(Yl()).then(() => {
      P({
        _c: nt
      });
    }), K) {
      if (M) throw ol;
      return;
    }
    return hl;
  }
}
const Hm = (f, b) => {
  for (const h in f)
    f[h][0] && f[h][0](b);
}, W0 = (f, b) => {
  if (!ye.has(f)) {
    const h = $e(Z0, b), s = /* @__PURE__ */ Object.create(null), j = wm.bind(nt, f);
    let R = Se;
    const x = /* @__PURE__ */ Object.create(null), q = (M, z) => {
      const H = x[M] || [];
      return x[M] = H, H.push(z), () => H.splice(H.indexOf(z), 1);
    }, A = (M, z, H) => {
      f.set(M, z);
      const V = x[M];
      if (V)
        for (const al of V)
          al(z, H);
    }, S = () => {
      if (!ye.has(f) && (ye.set(f, [
        s,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        j,
        A,
        q
      ]), !au)) {
        const M = h.initFocus(setTimeout.bind(nt, Hm.bind(nt, s, Vm))), z = h.initReconnect(setTimeout.bind(nt, Hm.bind(nt, s, Lm)));
        R = () => {
          M && M(), z && z(), ye.delete(f);
        };
      }
    };
    return S(), [
      f,
      j,
      S,
      R
    ];
  }
  return [
    f,
    ye.get(f)[4]
  ];
}, F0 = (f, b, h, s, j) => {
  const R = h.errorRetryCount, x = j.retryCount, q = ~~((Math.random() + 0.5) * (1 << (x < 8 ? x : 8))) * h.errorRetryInterval;
  !il(R) && x > R || setTimeout(s, q, j);
}, k0 = ns, [$m, I0] = W0(/* @__PURE__ */ new Map()), P0 = $e(
  {
    // events
    onLoadingSlow: Se,
    onSuccess: Se,
    onError: Se,
    onErrorRetry: F0,
    onDiscarded: Se,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Cm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Cm ? 5e3 : 3e3,
    // providers
    compare: k0,
    isPaused: () => !1,
    cache: $m,
    mutate: I0,
    fallback: {}
  },
  // use web preset by default
  L0
), ly = (f, b) => {
  const h = $e(f, b);
  if (b) {
    const { use: s, fallback: j } = f, { use: R, fallback: x } = b;
    s && R && (h.use = s.concat(R)), j && x && (h.fallback = $e(j, x));
  }
  return h;
}, ty = $.createContext({}), ey = "$inf$", Wm = un && window.__SWR_DEVTOOLS_USE__, ay = Wm ? window.__SWR_DEVTOOLS_USE__ : [], uy = () => {
  Wm && (window.__SWR_DEVTOOLS_REACT__ = vs);
}, ny = (f) => Wt(f[1]) ? [
  f[0],
  f[1],
  f[2] || {}
] : [
  f[0],
  null,
  (f[1] === null ? f[2] : f[1]) || {}
], iy = () => {
  const f = $.useContext(ty);
  return $.useMemo(() => $e(P0, f), [
    f
  ]);
}, cy = (f) => (b, h, s) => f(b, h && ((...R) => {
  const [x] = ys(b), [, , , q] = ye.get($m);
  if (x.startsWith(ey))
    return h(...R);
  const A = q[x];
  return il(A) ? h(...R) : (delete q[x], A);
}), s), fy = ay.concat(cy), sy = (f) => function(...h) {
  const s = iy(), [j, R, x] = ny(h), q = ly(s, x);
  let A = f;
  const { use: S } = q, M = (S || []).concat(fy);
  for (let z = M.length; z--; )
    A = M[z](A);
  return A(j, R || q.fetcher || null, q);
}, oy = (f, b, h) => {
  const s = b[f] || (b[f] = []);
  return s.push(h), () => {
    const j = s.indexOf(h);
    j >= 0 && (s[j] = s[s.length - 1], s.pop());
  };
};
uy();
const as = vs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((f) => {
  switch (f.status) {
    case "pending":
      throw f;
    case "fulfilled":
      return f.value;
    case "rejected":
      throw f.reason;
    default:
      throw f.status = "pending", f.then((b) => {
        f.status = "fulfilled", f.value = b;
      }, (b) => {
        f.status = "rejected", f.reason = b;
      }), f;
  }
}), us = {
  dedupe: !0
}, qm = Promise.resolve(nt), ry = () => Se, dy = (f, b, h) => {
  const { cache: s, compare: j, suspense: R, fallbackData: x, revalidateOnMount: q, revalidateIfStale: A, refreshInterval: S, refreshWhenHidden: M, refreshWhenOffline: z, keepPreviousData: H, strictServerPrefetchWarning: V } = h, [al, P, Sl, Hl] = ye.get(s), [L, Ml] = ys(f), Yl = $.useRef(!1), hl = $.useRef(!1), ol = $.useRef(L), K = $.useRef(b), Ul = $.useRef(h), cl = () => Ul.current, it = () => cl().isVisible() && cl().isOnline(), [J, zl, ct, Gl] = Jm(s, L), Fl = $.useRef({}).current, E = il(x) ? il(h.fallback) ? nt : h.fallback[L] : x, C = (bl, jl) => {
    for (const Al in Fl) {
      const Nl = Al;
      if (Nl === "data") {
        if (!j(bl[Nl], jl[Nl]) && (!il(bl[Nl]) || !j(F, jl[Nl])))
          return !1;
      } else if (jl[Nl] !== bl[Nl])
        return !1;
    }
    return !0;
  }, Q = !Yl.current, ml = $.useMemo(() => {
    const bl = J(), jl = Gl(), Al = (Ql) => {
      const Ol = $e(Ql);
      return delete Ol._k, (() => {
        if (!L || !b || cl().isPaused()) return !1;
        if (Q && !il(q)) return q;
        const pe = il(E) ? Ol.data : E;
        return il(pe) || A;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Ol
      } : Ol;
    }, Nl = Al(bl), ot = bl === jl ? Nl : Al(jl);
    let rt = Nl;
    return [
      () => {
        const Ql = Al(J());
        return C(Ql, rt) ? (rt.data = Ql.data, rt.isLoading = Ql.isLoading, rt.isValidating = Ql.isValidating, rt.error = Ql.error, rt) : (rt = Ql, Ql);
      },
      () => ot
    ];
  }, [
    s,
    L
  ]), sl = Mm.useSyncExternalStore($.useCallback(
    (bl) => ct(L, (jl, Al) => {
      C(Al, jl) || bl();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      L
    ]
  ), ml[0], ml[1]), d = al[L] && al[L].length > 0, O = sl.data, U = il(O) ? E && Km(E) ? as(E) : E : O, B = sl.error, w = $.useRef(U), F = H ? il(O) ? il(w.current) ? U : w.current : O : U, ll = L && il(U), Xl = $.useRef(null);
  !au && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Mm.useSyncExternalStore(ry, () => (Xl.current = !1, Xl), () => (Xl.current = !0, Xl));
  const Cl = Xl.current;
  V && Cl && !R && ll && console.warn(`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !L || !b || cl().isPaused() || d && !il(B) ? !1 : Q && !il(q) ? q : R ? il(U) ? !1 : A : il(U) || A, We = Q && be, iu = il(sl.isValidating) ? We : sl.isValidating, cn = il(sl.isLoading) ? We : sl.isLoading, pt = $.useCallback(
    async (bl) => {
      const jl = K.current;
      if (!L || !jl || hl.current || cl().isPaused())
        return !1;
      let Al, Nl, ot = !0;
      const rt = bl || {}, Ql = !Sl[L] || !rt.dedupe, Ol = () => Um ? !hl.current && L === ol.current && Yl.current : L === ol.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, pe = () => {
        zl(Fe);
      }, cu = () => {
        const dt = Sl[L];
        dt && dt[1] === Nl && delete Sl[L];
      }, ke = {
        isValidating: !0
      };
      il(J().data) && (ke.isLoading = !0);
      try {
        if (Ql && (zl(ke), h.loadingTimeout && il(J().data) && setTimeout(() => {
          ot && Ol() && cl().onLoadingSlow(L, h);
        }, h.loadingTimeout), Sl[L] = [
          jl(Ml),
          ds()
        ]), [Al, Nl] = Sl[L], Al = await Al, Ql && setTimeout(cu, h.dedupingInterval), !Sl[L] || Sl[L][1] !== Nl)
          return Ql && Ol() && cl().onDiscarded(L), !1;
        Fe.error = nt;
        const dt = P[L];
        if (!il(dt) && // case 1
        (Nl <= dt[0] || // case 2
        Nl <= dt[1] || // case 3
        dt[1] === 0))
          return pe(), Ql && Ol() && cl().onDiscarded(L), !1;
        const jt = J().data;
        Fe.data = j(jt, Al) ? jt : Al, Ql && Ol() && cl().onSuccess(Al, L, h);
      } catch (dt) {
        cu();
        const jt = cl(), { shouldRetryOnError: fu } = jt;
        jt.isPaused() || (Fe.error = dt, Ql && Ol() && (jt.onError(dt, L, jt), (fu === !0 || Wt(fu) && fu(dt)) && (!cl().revalidateOnFocus || !cl().revalidateOnReconnect || it()) && jt.onErrorRetry(dt, L, jt, (ji) => {
          const Ft = al[L];
          Ft && Ft[0] && Ft[0](jm, ji);
        }, {
          retryCount: (rt.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return ot = !1, pe(), !0;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      L,
      s
    ]
  ), ga = $.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...bl) => wm(s, ol.current, ...bl),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ls(() => {
    K.current = b, Ul.current = h, il(O) || (w.current = O);
  }), ls(() => {
    if (!L) return;
    const bl = pt.bind(nt, us);
    let jl = 0;
    cl().revalidateOnFocus && (jl = Date.now() + cl().focusThrottleInterval);
    const Nl = oy(L, al, (ot, rt = {}) => {
      if (ot == Vm) {
        const Ql = Date.now();
        cl().revalidateOnFocus && Ql > jl && it() && (jl = Ql + cl().focusThrottleInterval, bl());
      } else if (ot == Lm)
        cl().revalidateOnReconnect && it() && bl();
      else {
        if (ot == Zm)
          return pt();
        if (ot == jm)
          return pt(rt);
      }
    });
    return hl.current = !1, ol.current = L, Yl.current = !0, zl({
      _k: Ml
    }), be && (Sl[L] || (il(U) || au ? bl() : K0(bl))), () => {
      hl.current = !0, Nl();
    };
  }, [
    L
  ]), ls(() => {
    let bl;
    function jl() {
      const Nl = Wt(S) ? S(J().data) : S;
      Nl && bl !== -1 && (bl = setTimeout(Al, Nl));
    }
    function Al() {
      !J().error && (M || cl().isVisible()) && (z || cl().isOnline()) ? pt(us).then(jl) : jl();
    }
    return jl(), () => {
      bl && (clearTimeout(bl), bl = -1);
    };
  }, [
    S,
    M,
    z,
    L
  ]), $.useDebugValue(F), R) {
    if (!Um && au && ll)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    ll && (K.current = b, Ul.current = h, hl.current = !1);
    const bl = Hl[L], jl = !il(bl) && ll ? ga(bl) : qm;
    if (as(jl), !il(B) && ll)
      throw B;
    const Al = ll ? pt(us) : qm;
    !il(F) && ll && (Al.status = "fulfilled", Al.value = !0), as(Al);
  }
  return {
    mutate: ga,
    get data() {
      return Fl.data = !0, F;
    },
    get error() {
      return Fl.error = !0, B;
    },
    get isValidating() {
      return Fl.isValidating = !0, iu;
    },
    get isLoading() {
      return Fl.isLoading = !0, cn;
    }
  };
}, Oi = sy(dy), Fm = "/api/v1/extensions/nexus.video.ltx23";
async function he(f, b) {
  const h = await fetch(`${Fm}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!h.ok) {
    const s = await h.text();
    throw new Error(`${h.status} ${h.statusText}: ${s}`);
  }
  return await h.json();
}
const eu = {
  health: () => he("/health"),
  listProfiles: () => he("/runtime-profiles"),
  plan: (f) => he("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(f)
  }),
  createRender: (f) => he(
    "/renders",
    { method: "POST", body: JSON.stringify(f) }
  ),
  getRender: (f) => he(`/renders/${f}`),
  cancel: (f) => he(`/renders/${f}/cancel`, { method: "POST" }),
  retrySegment: (f, b) => he(`/renders/${f}/retry-segment`, {
    method: "POST",
    body: JSON.stringify({ segment_index: b })
  })
};
function my(f) {
  return `${Fm}/artifacts/${f}`;
}
const vy = "/api/v1", Bm = "nexus.video.ltx23";
async function Ym(f, b) {
  const h = await fetch(`${vy}${f}`, {
    headers: { "Content-Type": "application/json", ...b?.headers ?? {} },
    ...b
  });
  if (!h.ok) {
    const j = await h.text();
    throw new Error(`${h.status}: ${j}`);
  }
  return (await h.json()).data;
}
const Gm = {
  listDependencies: () => Ym(`/extensions/${Bm}/dependencies`),
  startInstall: (f = !1) => Ym(
    `/extensions/${Bm}/install${f ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Xm = {
  status: (f) => he(`/profiles/${f}/install`),
  start: (f) => he(`/profiles/${f}/install`, {
    method: "POST"
  })
};
var hy = "_1vmg9ib0", uu = "_1vmg9ib1", en = "_1vmg9ib2", yy = "_1vmg9ib3", st = "_1vmg9ib4", Mt = "_1vmg9ib5", ge = "_1vmg9ib6", km = "_1vmg9ib7 _1vmg9ib6", Qm = "_1vmg9ib8 _1vmg9ib6", Di = "_1vmg9ib9", gs = "_1vmg9iba", Ss = "_1vmg9ibb _1vmg9iba", Im = "_1vmg9ibc _1vmg9iba", gy = "_1vmg9ibd _1vmg9iba", nn = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", Pm = "_1vmg9ibj _1vmg9ibi", lv = "_1vmg9ibk _1vmg9ibi", tv = "_1vmg9ibl _1vmg9ibi", ev = "_1vmg9ibm _1vmg9ibi", an = "_1vmg9ibn", nu = "_1vmg9ibo", Sy = "_1vmg9ibp", by = "_1vmg9ibq", ms = "_1vmg9ibs _1vmg9ibr", av = "_1vmg9ibt _1vmg9ibr", uv = "_1vmg9ibu _1vmg9ibr", nv = "_1vmg9ibv _1vmg9ibr", py = "_1vmg9ibw", _y = "_1vmg9ibx", Ey = "_1vmg9iby", Ty = "_1vmg9ibz", zy = "_1vmg9ib10 _1vmg9iba", Wl = "_1vmg9ib11", Ay = "_1vmg9ib12", Ny = "_1vmg9ib13", Oy = "_1vmg9ib14", Dy = "_1vmg9ib15", xy = "_1vmg9ib16", bs = "_1vmg9ib17", ps = "_1vmg9ib18", My = "_1vmg9ib19";
const jy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Ry() {
  const [f, b] = $.useState(jy), [h, s] = $.useState(null), [j, R] = $.useState(null), [x, q] = $.useState(!1), [A, S] = $.useState(null), [M, z] = $.useState(null), [H, V] = $.useState(!1), [al, P] = $.useState(!1), [Sl, Hl] = $.useState(
    null
  ), [L, Ml] = $.useState(null), { data: Yl } = Oi(
    "ltx:runtime-profiles",
    () => eu.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: hl, mutate: ol } = Oi(
    A ? `ltx:renders:${A}` : null,
    () => A ? eu.getRender(A) : Promise.resolve(null),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (J) => J ? J.status === "completed" || J.status === "failed" || J.status === "cancelled" ? 0 : 2e3 : 1e3
    }
  ), K = $.useCallback(async () => {
    q(!0), R(null);
    try {
      const J = await eu.plan(f);
      s(J);
    } catch (J) {
      R(J instanceof Error ? J.message : String(J)), s(null);
    } finally {
      q(!1);
    }
  }, [f]), Ul = $.useCallback(async () => {
    V(!0), z(null);
    try {
      const J = await eu.createRender(f);
      S(J.id), ol();
    } catch (J) {
      z(J instanceof Error ? J.message : String(J));
    } finally {
      V(!1);
    }
  }, [f, ol]), cl = $.useCallback(async () => {
    if (!(!A || al)) {
      P(!0), z(null);
      try {
        await eu.cancel(A), ol();
      } catch (J) {
        z(
          `Cancel failed: ${J instanceof Error ? J.message : String(J)}`
        );
      } finally {
        P(!1);
      }
    }
  }, [A, al, ol]), it = $.useCallback(
    async (J) => {
      if (!(!A || Sl !== null)) {
        Hl(J), Ml(null);
        try {
          await eu.retrySegment(A, J), ol();
        } catch (zl) {
          Ml(
            `Retry of segment ${J + 1} failed: ${zl instanceof Error ? zl.message : String(zl)}`
          );
        } finally {
          Hl(null);
        }
      }
    },
    [A, Sl, ol]
  );
  return /* @__PURE__ */ m.jsxs("div", { className: hy, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ m.jsx(Uy, {}),
      /* @__PURE__ */ m.jsx(
        qy,
        {
          draft: f,
          onChange: b,
          profiles: Yl ?? [],
          onPlan: K,
          onSubmit: Ul,
          planning: x,
          submitting: H,
          plan: h,
          planError: j,
          submitError: M
        }
      )
    ] }),
    /* @__PURE__ */ m.jsx(
      Zy,
      {
        run: hl ?? null,
        onCancel: cl,
        cancelling: al,
        onRetrySegment: it,
        retryingSegmentIndex: Sl,
        retryError: L
      }
    )
  ] });
}
function Uy() {
  const [f, b] = $.useState(!1), [h, s] = $.useState(null), { data: j, mutate: R } = Oi(
    "host:dependencies",
    () => Gm.listDependencies(),
    {
      refreshInterval: (M) => M ? M.steps.some(
        (H) => H.status === "running" || H.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), x = $.useCallback(
    async (M = !1) => {
      b(!0), s(null);
      try {
        await Gm.startInstall(M), R();
      } catch (z) {
        s(z instanceof Error ? z.message : String(z));
      } finally {
        b(!1);
      }
    },
    [R]
  );
  if (!j) return null;
  const q = j.steps.find((M) => M.status === "failed"), A = j.all_satisfied, S = j.steps.some(
    (M) => M.status === "running" || !A && M.status === "pending"
  );
  return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ m.jsx("h3", { className: en, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: Cy(A, !!q, S), children: A ? "ready" : q ? "install failed" : S ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ m.jsx("ul", { className: Dy, children: j.steps.map((M) => /* @__PURE__ */ m.jsxs("li", { className: xy, children: [
      /* @__PURE__ */ m.jsx("span", { className: Hy(M.status) }),
      /* @__PURE__ */ m.jsx("span", { children: M.id }),
      /* @__PURE__ */ m.jsx("span", { className: Wl, children: M.artifact?.summary ?? M.status })
    ] }, M.id)) }),
    q?.last_error ? /* @__PURE__ */ m.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ m.jsxs("strong", { children: [
        q.id,
        " failed"
      ] }),
      ": ",
      q.last_error.message
    ] }) : null,
    h ? /* @__PURE__ */ m.jsx("div", { className: nu, children: h }) : null,
    !A || q ? /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: gs,
          disabled: f || S,
          onClick: () => void x(!1),
          children: S || f ? "Installing…" : "Install runtime"
        }
      ),
      q ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          disabled: f || S,
          onClick: () => void x(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(f, b, h) {
  return b ? ev : f ? Pm : h ? lv : tv;
}
function Hy(f) {
  switch (f) {
    case "ok":
      return uv;
    case "running":
      return av;
    case "failed":
      return nv;
    default:
      return ms;
  }
}
function qy({
  draft: f,
  onChange: b,
  profiles: h,
  onPlan: s,
  onSubmit: j,
  planning: R,
  submitting: x,
  plan: q,
  planError: A,
  submitError: S
}) {
  const M = $.useCallback(
    (z, H) => b({ ...f, [z]: H }),
    [f, b]
  );
  return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
    /* @__PURE__ */ m.jsx("h2", { className: en, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ m.jsx("p", { className: yy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ m.jsxs("div", { className: st, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ m.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: km,
          value: f.prompt,
          onChange: (z) => M("prompt", z.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: st, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-neg",
          className: ge,
          value: f.negative_prompt ?? "",
          onChange: (z) => M(
            "negative_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: st, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-character",
          className: ge,
          value: f.character_prompt ?? "",
          onChange: (z) => M(
            "character_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Wl, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: st, children: [
      /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-style",
          className: ge,
          value: f.style_prompt ?? "",
          onChange: (z) => M(
            "style_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Wl, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ m.jsx(Qy, { draft: f, update: M }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-duration",
            className: ge,
            type: "number",
            min: 1,
            max: 300,
            value: f.duration_seconds,
            onChange: (z) => {
              const H = Number(z.target.value);
              Number.isFinite(H) && M(
                "duration_seconds",
                Math.max(1, Math.min(300, H))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-seed",
            className: ge,
            type: "number",
            value: f.seed ?? "",
            onChange: (z) => {
              const H = z.target.value;
              if (H === "") {
                M("seed", void 0);
                return;
              }
              const V = Number(H);
              Number.isFinite(V) && M("seed", V);
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Qm,
            value: f.runtime_profile,
            onChange: (z) => M(
              "runtime_profile",
              z.target.value
            ),
            children: [
              /* @__PURE__ */ m.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ m.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Qm,
            value: f.quality_preset,
            onChange: (z) => M("quality_preset", z.target.value),
            children: [
              /* @__PURE__ */ m.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ m.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ m.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ m.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(Xy, { profiles: h, selected: f.runtime_profile }),
    /* @__PURE__ */ m.jsx(By, { selected: f.runtime_profile }),
    /* @__PURE__ */ m.jsx(Vy, { draft: f, update: M }),
    /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          onClick: s,
          disabled: R || x || f.prompt.trim().length === 0,
          children: R ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: gs,
          onClick: j,
          disabled: x || f.prompt.trim().length === 0,
          children: x ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    A ? /* @__PURE__ */ m.jsx("div", { className: nu, children: A }) : null,
    S ? /* @__PURE__ */ m.jsx("div", { className: nu, children: S }) : null,
    q ? /* @__PURE__ */ m.jsx(Ly, { plan: q }) : null
  ] });
}
function By({
  selected: f
}) {
  const b = Gy(f), [h, s] = $.useState(!1), [j, R] = $.useState(null), { data: x, mutate: q } = Oi(
    b ? `profile-install:${b}` : null,
    () => b ? Xm.status(b) : Promise.resolve(null),
    {
      refreshInterval: (H) => H && H.in_flight ? 2e3 : 0
    }
  ), A = $.useCallback(async () => {
    if (b) {
      s(!0), R(null);
      try {
        await Xm.start(b), q();
      } catch (H) {
        R(H instanceof Error ? H.message : String(H));
      } finally {
        s(!1);
      }
    }
  }, [b, q]);
  if (!b || !x) return null;
  if (x.installed)
    return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsx("strong", { children: "Runtime installed" }),
      " · ",
      x.repo
    ] });
  const S = x.in_flight || h, M = iv(x.phase), z = S ? M ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
    /* @__PURE__ */ m.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    x.repo ?? "unknown repo",
    /* @__PURE__ */ m.jsxs("div", { className: Wl, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ m.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      x.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    x.last_error ? /* @__PURE__ */ m.jsxs("div", { className: Wl, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      x.last_error
    ] }) : null,
    j ? /* @__PURE__ */ m.jsx("div", { className: Wl, style: { marginTop: 4, color: "#e57373" }, children: j }) : null,
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 8 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: gs,
        disabled: S,
        onClick: () => void A(),
        children: z
      }
    ) }),
    /* @__PURE__ */ m.jsx(
      Yy,
      {
        phase: x.phase,
        recentProgress: x.recent_progress
      }
    )
  ] });
}
function iv(f) {
  if (!f) return null;
  if (f.startsWith("error:")) return "Failed";
  switch (f) {
    case "starting":
      return "Starting…";
    case "resolving_deps":
      return "Resolving deps…";
    case "downloading_weights":
      return "Downloading weights…";
    case "done":
      return "Finishing…";
    default:
      return f;
  }
}
function Yy({
  phase: f,
  recentProgress: b
}) {
  if (!f && b.length === 0) return null;
  const h = iv(f);
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Install progress",
      h ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
        " · ",
        h
      ] }) : null,
      b.length > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
        " · ",
        b.length,
        " lines"
      ] }) : null
    ] }),
    b.length === 0 ? /* @__PURE__ */ m.jsx("p", { className: Wl, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ m.jsx("pre", { className: My, children: b.join(`
`) })
  ] });
}
function Gy(f) {
  return f === "auto" ? null : f;
}
function Xy({
  profiles: f,
  selected: b
}) {
  if (f.length === 0) return null;
  const h = b === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${b}`, s = f.find((R) => R.runtime_id === h);
  if (!s) return null;
  const j = s.healthy ? "ok" : "warn";
  return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
    /* @__PURE__ */ m.jsx("strong", { children: s.display_name }),
    ": ",
    s.status_message,
    s.experimental ? " (experimental)" : null
  ] });
}
function Qy({
  draft: f,
  update: b
}) {
  const h = f.scenes ?? [], s = $.useCallback(
    (A) => {
      b("scenes", A.length > 0 ? A : void 0);
    },
    [b]
  ), j = $.useCallback(() => {
    const A = h.length > 0 ? f.duration_seconds / (h.length + 1) : f.duration_seconds;
    s([
      ...h,
      { prompt: "", duration_seconds: Math.max(1, Math.round(A)) }
    ]);
  }, [h, s, f.duration_seconds]), R = $.useCallback(
    (A, S) => {
      const M = h.map((z, H) => {
        if (H !== A) return z;
        const V = { ...z };
        return S.prompt !== void 0 && (V.prompt = S.prompt ?? ""), S.duration_seconds !== void 0 && (S.duration_seconds === null ? delete V.duration_seconds : V.duration_seconds = S.duration_seconds), S.seed !== void 0 && (S.seed === null ? delete V.seed : V.seed = S.seed), V;
      });
      s(M);
    },
    [h, s]
  ), x = $.useCallback(
    (A) => {
      s(h.filter((S, M) => M !== A));
    },
    [h, s]
  ), q = h.reduce(
    (A, S) => A + (S.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Scenes — ",
      h.length === 0 ? "none (single prompt)" : `${h.length} scenes`,
      q > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
        " · ",
        q.toFixed(1),
        "s / ",
        f.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx("p", { className: Wl, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    h.map((A, S) => /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: uu,
        style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
        children: [
          /* @__PURE__ */ m.jsxs("div", { className: st, children: [
            /* @__PURE__ */ m.jsxs("label", { className: Mt, htmlFor: `ltx-scene-${S}-prompt`, children: [
              "Scene ",
              S + 1,
              " prompt"
            ] }),
            /* @__PURE__ */ m.jsx(
              "textarea",
              {
                id: `ltx-scene-${S}-prompt`,
                className: km,
                value: A.prompt,
                onChange: (M) => R(S, { prompt: M.target.value }),
                placeholder: "what happens in this scene…",
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ m.jsxs("div", { className: Di, children: [
            /* @__PURE__ */ m.jsxs("div", { className: st, children: [
              /* @__PURE__ */ m.jsx(
                "label",
                {
                  className: Mt,
                  htmlFor: `ltx-scene-${S}-duration`,
                  children: "Duration (s)"
                }
              ),
              /* @__PURE__ */ m.jsx(
                "input",
                {
                  id: `ltx-scene-${S}-duration`,
                  className: ge,
                  type: "number",
                  min: 1,
                  step: 0.5,
                  value: A.duration_seconds ?? "",
                  onChange: (M) => {
                    const z = M.target.value;
                    R(S, {
                      duration_seconds: z === "" ? null : Number(z)
                    });
                  },
                  placeholder: "auto"
                }
              )
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: st, children: [
              /* @__PURE__ */ m.jsx(
                "label",
                {
                  className: Mt,
                  htmlFor: `ltx-scene-${S}-seed`,
                  children: "Scene seed (optional)"
                }
              ),
              /* @__PURE__ */ m.jsx(
                "input",
                {
                  id: `ltx-scene-${S}-seed`,
                  className: ge,
                  type: "number",
                  value: A.seed ?? "",
                  onChange: (M) => {
                    const z = M.target.value;
                    R(S, {
                      seed: z === "" ? null : Number(z)
                    });
                  },
                  placeholder: "derived"
                }
              )
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: st, style: { alignSelf: "flex-end" }, children: /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: Im,
                onClick: () => x(S),
                children: "Remove"
              }
            ) })
          ] })
        ]
      },
      S
    )),
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 10 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: Ss,
        onClick: j,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Vy({
  draft: f,
  update: b
}) {
  const h = f.advanced ?? {}, s = $.useCallback(
    (j, R) => {
      const x = { ...h };
      R == null ? delete x[j] : x[j] = R, b("advanced", Object.keys(x).length > 0 ? x : void 0);
    },
    [h, b]
  );
  return /* @__PURE__ */ m.jsxs("details", { className: bs, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: ps, children: [
      "Advanced — guidance & steps",
      h.guidance_scale !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
        " · cfg ",
        h.guidance_scale
      ] }) : null,
      h.num_inference_steps !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
        " · ",
        h.num_inference_steps,
        " steps"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Di, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: ge,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: h.guidance_scale ?? "",
            onChange: (j) => {
              const R = j.target.value;
              s(
                "guidance_scale",
                R === "" ? void 0 : Number(R)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Wl, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: st, children: [
        /* @__PURE__ */ m.jsx("label", { className: Mt, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-steps",
            className: ge,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: h.num_inference_steps ?? "",
            onChange: (j) => {
              const R = j.target.value;
              s(
                "num_inference_steps",
                R === "" ? void 0 : Math.round(Number(R))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Wl, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] })
    ] })
  ] });
}
function Ly({ plan: f }) {
  const b = f.vram_risk === "safe" ? Pm : f.vram_risk === "moderate" ? lv : f.vram_risk === "risky" ? tv : ev;
  return /* @__PURE__ */ m.jsxs("div", { className: uu, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ m.jsx("h3", { className: en, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.mode })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.segment_count })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.width,
        "×",
        f.height
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.base_fps,
        " → ",
        f.output_fps,
        " (",
        f.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        f.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ m.jsx("span", { className: b, children: f.vram_risk })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: f.runtime_profile })
    ] }),
    f.warnings.length > 0 ? /* @__PURE__ */ m.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: f.warnings.map((h) => /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsx("strong", { children: h.code }),
      ": ",
      h.message
    ] }, h.code)) }) : null
  ] });
}
function Zy({
  run: f,
  onCancel: b,
  cancelling: h,
  onRetrySegment: s,
  retryingSegmentIndex: j,
  retryError: R
}) {
  if (!f)
    return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
      /* @__PURE__ */ m.jsx("h2", { className: en, children: "Output" }),
      /* @__PURE__ */ m.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const x = f.status === "completed" || f.status === "failed" || f.status === "cancelled", q = f.status !== "completed" && f.status !== "cancelled";
  return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
    /* @__PURE__ */ m.jsxs("h2", { className: en, children: [
      "Render ",
      ky(f.id)
    ] }),
    /* @__PURE__ */ m.jsxs("p", { className: Wl, children: [
      "runtime: ",
      f.runtime_profile ?? "?",
      " · ",
      f.width,
      "×",
      f.height,
      " ·",
      " ",
      f.requested_duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ m.jsx(Ky, { run: f }),
    f.error_code ? /* @__PURE__ */ m.jsxs("div", { className: nu, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ m.jsx("strong", { children: f.error_code }),
      ":",
      " ",
      f.error_message ?? "unknown error"
    ] }) : null,
    R ? /* @__PURE__ */ m.jsx("div", { className: nu, role: "alert", "aria-live": "polite", children: R }) : null,
    /* @__PURE__ */ m.jsx(
      Jy,
      {
        segments: f.segments,
        onRetry: q ? s : null,
        retryingSegmentIndex: j
      }
    ),
    f.status === "completed" && f.final_artifact_id ? /* @__PURE__ */ m.jsx(Fy, { artifactId: f.final_artifact_id }) : null,
    x ? null : /* @__PURE__ */ m.jsx("div", { className: nn, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: Im,
        onClick: b,
        disabled: h,
        "aria-busy": h,
        children: h ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function Ky({ run: f }) {
  const b = wy(f);
  return /* @__PURE__ */ m.jsxs("div", { className: st, children: [
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ m.jsxs("span", { children: [
            /* @__PURE__ */ m.jsx("strong", { children: f.status }),
            b ? /* @__PURE__ */ m.jsxs("span", { className: Wl, children: [
              " · ",
              b
            ] }) : null
          ] }),
          /* @__PURE__ */ m.jsxs("span", { children: [
            f.completed_segments,
            "/",
            f.segment_count,
            " segments ·",
            " ",
            f.progress_percent.toFixed(0),
            "%"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: py, children: /* @__PURE__ */ m.jsx(
      "div",
      {
        className: _y,
        style: { width: `${Math.max(2, f.progress_percent)}%` }
      }
    ) })
  ] });
}
function Jy({
  segments: f,
  onRetry: b,
  retryingSegmentIndex: h
}) {
  return /* @__PURE__ */ m.jsx("div", { className: Sy, children: f.map((s) => {
    const j = h === s.index, R = b !== null && s.status === "failed";
    return /* @__PURE__ */ m.jsxs("div", { className: by, children: [
      /* @__PURE__ */ m.jsx("span", { className: Wy(s.status) }),
      /* @__PURE__ */ m.jsxs("span", { children: [
        "Segment ",
        s.index + 1,
        " · ",
        s.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ m.jsx("span", { className: Wl, children: s.status }),
      R ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: gy,
          onClick: () => b?.(s.index),
          disabled: h !== null,
          "aria-busy": j,
          "aria-label": `Retry segment ${s.index + 1}`,
          children: j ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, s.index);
  }) });
}
function wy(f) {
  if (f.status === "completed" || f.status === "failed" || f.status === "cancelled" || f.segment_count <= 0)
    return null;
  const b = f.segments.filter(
    (x) => x.status === "completed" && x.started_at && x.completed_at
  );
  if (b.length === 0)
    return null;
  const h = b.reduce((x, q) => {
    const A = Date.parse(q.started_at), S = Date.parse(q.completed_at);
    return !Number.isFinite(A) || !Number.isFinite(S) || S <= A ? x : x + (S - A);
  }, 0);
  if (h === 0)
    return null;
  const s = h / b.length, j = f.segment_count - f.completed_segments;
  if (j <= 0)
    return null;
  const R = j * s;
  return `~${$y(R)} remaining`;
}
function $y(f) {
  const b = Math.round(f / 1e3);
  if (b < 60)
    return `${b}s`;
  const h = Math.floor(b / 60), s = b % 60;
  if (h < 60)
    return s === 0 ? `${h}m` : `${h}m ${s}s`;
  const j = Math.floor(h / 60), R = h % 60;
  return `${j}h ${R}m`;
}
function Wy(f) {
  switch (f) {
    case "queued":
      return ms;
    case "rendering":
      return av;
    case "completed":
      return uv;
    case "failed":
      return nv;
    default:
      return ms;
  }
}
function Fy({ artifactId: f }) {
  const b = my(f);
  return /* @__PURE__ */ m.jsxs("div", { className: Ey, children: [
    /* @__PURE__ */ m.jsx("video", { className: Ty, src: b, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ m.jsx(
      "a",
      {
        className: zy,
        href: b,
        download: `${f}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ m.jsxs("p", { className: Wl, children: [
      "artifact: ",
      f
    ] })
  ] });
}
function ky(f) {
  return f.length > 12 ? `${f.slice(0, 6)}…${f.slice(-4)}` : f;
}
const xi = "ltx23-video-app", Iy = new URL("./ltx23-video.css", import.meta.url).href;
class cv extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = C0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(b) {
    const h = document.createElement("link");
    h.rel = "stylesheet", h.href = Iy, b.appendChild(h);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ m.jsx($.StrictMode, { children: /* @__PURE__ */ m.jsx(Ry, {}) })
    );
  }
}
customElements.get(xi) || customElements.define(xi, cv);
function Py() {
  customElements.get(xi) || customElements.define(xi, cv);
}
export {
  Py as register
};
//# sourceMappingURL=ltx23-video.js.map
