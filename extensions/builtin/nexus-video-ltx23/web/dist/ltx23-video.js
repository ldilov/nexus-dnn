function O0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Wf = { exports: {} }, lu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tm;
function D0() {
  if (Tm) return lu;
  Tm = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function d(o, N, M) {
    var E = null;
    if (M !== void 0 && (E = "" + M), N.key !== void 0 && (E = "" + N.key), "key" in N) {
      M = {};
      for (var C in N)
        C !== "key" && (M[C] = N[C]);
    } else M = N;
    return N = M.ref, {
      $$typeof: c,
      type: o,
      key: E,
      ref: N !== void 0 ? N : null,
      props: M
    };
  }
  return lu.Fragment = y, lu.jsx = d, lu.jsxs = d, lu;
}
var Nm;
function M0() {
  return Nm || (Nm = 1, Wf.exports = D0()), Wf.exports;
}
var s = M0(), Ff = { exports: {} }, P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zm;
function R0() {
  if (zm) return P;
  zm = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), E = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), R = Symbol.for("react.activity"), x = Symbol.iterator;
  function H(v) {
    return v === null || typeof v != "object" ? null : (v = x && v[x] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var Q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, I = {};
  function ct(v, O, q) {
    this.props = v, this.context = O, this.refs = I, this.updater = q || Q;
  }
  ct.prototype.isReactComponent = {}, ct.prototype.setState = function(v, O) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, O, "setState");
  }, ct.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function V() {
  }
  V.prototype = ct.prototype;
  function bt(v, O, q) {
    this.props = v, this.context = O, this.refs = I, this.updater = q || Q;
  }
  var J = bt.prototype = new V();
  J.constructor = bt, W(J, ct.prototype), J.isPureReactComponent = !0;
  var tt = Array.isArray;
  function ut() {
  }
  var Z = { H: null, A: null, T: null, S: null }, _t = Object.prototype.hasOwnProperty;
  function nt(v, O, q) {
    var Y = q.ref;
    return {
      $$typeof: c,
      type: v,
      key: O,
      ref: Y !== void 0 ? Y : null,
      props: q
    };
  }
  function sl(v, O) {
    return nt(v.type, O, v.props);
  }
  function F(v) {
    return typeof v == "object" && v !== null && v.$$typeof === c;
  }
  function Ot(v) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(q) {
      return O[q];
    });
  }
  var ol = /\/+/g;
  function Lt(v, O) {
    return typeof v == "object" && v !== null && v.key != null ? Ot("" + v.key) : O.toString(36);
  }
  function It(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(ut, ut) : (v.status = "pending", v.then(
          function(O) {
            v.status === "pending" && (v.status = "fulfilled", v.value = O);
          },
          function(O) {
            v.status === "pending" && (v.status = "rejected", v.reason = O);
          }
        )), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function T(v, O, q, Y, k) {
    var lt = typeof v;
    (lt === "undefined" || lt === "boolean") && (v = null);
    var it = !1;
    if (v === null) it = !0;
    else
      switch (lt) {
        case "bigint":
        case "string":
        case "number":
          it = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case c:
            case y:
              it = !0;
              break;
            case U:
              return it = v._init, T(
                it(v._payload),
                O,
                q,
                Y,
                k
              );
          }
      }
    if (it)
      return k = k(v), it = Y === "" ? "." + Lt(v, 0) : Y, tt(k) ? (q = "", it != null && (q = it.replace(ol, "$&/") + "/"), T(k, O, q, "", function(pe) {
        return pe;
      })) : k != null && (F(k) && (k = sl(
        k,
        q + (k.key == null || v && v.key === k.key ? "" : ("" + k.key).replace(
          ol,
          "$&/"
        ) + "/") + it
      )), O.push(k)), 1;
    it = 0;
    var Vt = Y === "" ? "." : Y + ":";
    if (tt(v))
      for (var Bt = 0; Bt < v.length; Bt++)
        Y = v[Bt], lt = Vt + Lt(Y, Bt), it += T(
          Y,
          O,
          q,
          lt,
          k
        );
    else if (Bt = H(v), typeof Bt == "function")
      for (v = Bt.call(v), Bt = 0; !(Y = v.next()).done; )
        Y = Y.value, lt = Vt + Lt(Y, Bt++), it += T(
          Y,
          O,
          q,
          lt,
          k
        );
    else if (lt === "object") {
      if (typeof v.then == "function")
        return T(
          It(v),
          O,
          q,
          Y,
          k
        );
      throw O = String(v), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return it;
  }
  function B(v, O, q) {
    if (v == null) return v;
    var Y = [], k = 0;
    return T(v, Y, "", "", function(lt) {
      return O.call(q, lt, k++);
    }), Y;
  }
  function w(v) {
    if (v._status === -1) {
      var O = v._result;
      O = O(), O.then(
        function(q) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = q);
        },
        function(q) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = q);
        }
      ), v._status === -1 && (v._status = 0, v._result = O);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var St = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  }, vt = {
    map: B,
    forEach: function(v, O, q) {
      B(
        v,
        function() {
          O.apply(this, arguments);
        },
        q
      );
    },
    count: function(v) {
      var O = 0;
      return B(v, function() {
        O++;
      }), O;
    },
    toArray: function(v) {
      return B(v, function(O) {
        return O;
      }) || [];
    },
    only: function(v) {
      if (!F(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  };
  return P.Activity = R, P.Children = vt, P.Component = ct, P.Fragment = d, P.Profiler = N, P.PureComponent = bt, P.StrictMode = o, P.Suspense = j, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return Z.H.useMemoCache(v);
    }
  }, P.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(v, O, q) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var Y = W({}, v.props), k = v.key;
    if (O != null)
      for (lt in O.key !== void 0 && (k = "" + O.key), O)
        !_t.call(O, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && O.ref === void 0 || (Y[lt] = O[lt]);
    var lt = arguments.length - 2;
    if (lt === 1) Y.children = q;
    else if (1 < lt) {
      for (var it = Array(lt), Vt = 0; Vt < lt; Vt++)
        it[Vt] = arguments[Vt + 2];
      Y.children = it;
    }
    return nt(v.type, k, Y);
  }, P.createContext = function(v) {
    return v = {
      $$typeof: E,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: M,
      _context: v
    }, v;
  }, P.createElement = function(v, O, q) {
    var Y, k = {}, lt = null;
    if (O != null)
      for (Y in O.key !== void 0 && (lt = "" + O.key), O)
        _t.call(O, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (k[Y] = O[Y]);
    var it = arguments.length - 2;
    if (it === 1) k.children = q;
    else if (1 < it) {
      for (var Vt = Array(it), Bt = 0; Bt < it; Bt++)
        Vt[Bt] = arguments[Bt + 2];
      k.children = Vt;
    }
    if (v && v.defaultProps)
      for (Y in it = v.defaultProps, it)
        k[Y] === void 0 && (k[Y] = it[Y]);
    return nt(v, lt, k);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(v) {
    return { $$typeof: C, render: v };
  }, P.isValidElement = F, P.lazy = function(v) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: v },
      _init: w
    };
  }, P.memo = function(v, O) {
    return {
      $$typeof: b,
      type: v,
      compare: O === void 0 ? null : O
    };
  }, P.startTransition = function(v) {
    var O = Z.T, q = {};
    Z.T = q;
    try {
      var Y = v(), k = Z.S;
      k !== null && k(q, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(ut, St);
    } catch (lt) {
      St(lt);
    } finally {
      O !== null && q.types !== null && (O.types = q.types), Z.T = O;
    }
  }, P.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, P.use = function(v) {
    return Z.H.use(v);
  }, P.useActionState = function(v, O, q) {
    return Z.H.useActionState(v, O, q);
  }, P.useCallback = function(v, O) {
    return Z.H.useCallback(v, O);
  }, P.useContext = function(v) {
    return Z.H.useContext(v);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(v, O) {
    return Z.H.useDeferredValue(v, O);
  }, P.useEffect = function(v, O) {
    return Z.H.useEffect(v, O);
  }, P.useEffectEvent = function(v) {
    return Z.H.useEffectEvent(v);
  }, P.useId = function() {
    return Z.H.useId();
  }, P.useImperativeHandle = function(v, O, q) {
    return Z.H.useImperativeHandle(v, O, q);
  }, P.useInsertionEffect = function(v, O) {
    return Z.H.useInsertionEffect(v, O);
  }, P.useLayoutEffect = function(v, O) {
    return Z.H.useLayoutEffect(v, O);
  }, P.useMemo = function(v, O) {
    return Z.H.useMemo(v, O);
  }, P.useOptimistic = function(v, O) {
    return Z.H.useOptimistic(v, O);
  }, P.useReducer = function(v, O, q) {
    return Z.H.useReducer(v, O, q);
  }, P.useRef = function(v) {
    return Z.H.useRef(v);
  }, P.useState = function(v) {
    return Z.H.useState(v);
  }, P.useSyncExternalStore = function(v, O, q) {
    return Z.H.useSyncExternalStore(
      v,
      O,
      q
    );
  }, P.useTransition = function() {
    return Z.H.useTransition();
  }, P.version = "19.2.6", P;
}
var xm;
function Ri() {
  return xm || (xm = 1, Ff.exports = R0()), Ff.exports;
}
var G = Ri();
const bs = /* @__PURE__ */ O0(G);
var kf = { exports: {} }, eu = {}, If = { exports: {} }, Pf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Am;
function U0() {
  return Am || (Am = 1, (function(c) {
    function y(T, B) {
      var w = T.length;
      T.push(B);
      t: for (; 0 < w; ) {
        var St = w - 1 >>> 1, vt = T[St];
        if (0 < N(vt, B))
          T[St] = B, T[w] = vt, w = St;
        else break t;
      }
    }
    function d(T) {
      return T.length === 0 ? null : T[0];
    }
    function o(T) {
      if (T.length === 0) return null;
      var B = T[0], w = T.pop();
      if (w !== B) {
        T[0] = w;
        t: for (var St = 0, vt = T.length, v = vt >>> 1; St < v; ) {
          var O = 2 * (St + 1) - 1, q = T[O], Y = O + 1, k = T[Y];
          if (0 > N(q, w))
            Y < vt && 0 > N(k, q) ? (T[St] = k, T[Y] = w, St = Y) : (T[St] = q, T[O] = w, St = O);
          else if (Y < vt && 0 > N(k, w))
            T[St] = k, T[Y] = w, St = Y;
          else break t;
        }
      }
      return B;
    }
    function N(T, B) {
      var w = T.sortIndex - B.sortIndex;
      return w !== 0 ? w : T.id - B.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var M = performance;
      c.unstable_now = function() {
        return M.now();
      };
    } else {
      var E = Date, C = E.now();
      c.unstable_now = function() {
        return E.now() - C;
      };
    }
    var j = [], b = [], U = 1, R = null, x = 3, H = !1, Q = !1, W = !1, I = !1, ct = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, bt = typeof setImmediate < "u" ? setImmediate : null;
    function J(T) {
      for (var B = d(b); B !== null; ) {
        if (B.callback === null) o(b);
        else if (B.startTime <= T)
          o(b), B.sortIndex = B.expirationTime, y(j, B);
        else break;
        B = d(b);
      }
    }
    function tt(T) {
      if (W = !1, J(T), !Q)
        if (d(j) !== null)
          Q = !0, ut || (ut = !0, Ot());
        else {
          var B = d(b);
          B !== null && It(tt, B.startTime - T);
        }
    }
    var ut = !1, Z = -1, _t = 5, nt = -1;
    function sl() {
      return I ? !0 : !(c.unstable_now() - nt < _t);
    }
    function F() {
      if (I = !1, ut) {
        var T = c.unstable_now();
        nt = T;
        var B = !0;
        try {
          t: {
            Q = !1, W && (W = !1, V(Z), Z = -1), H = !0;
            var w = x;
            try {
              l: {
                for (J(T), R = d(j); R !== null && !(R.expirationTime > T && sl()); ) {
                  var St = R.callback;
                  if (typeof St == "function") {
                    R.callback = null, x = R.priorityLevel;
                    var vt = St(
                      R.expirationTime <= T
                    );
                    if (T = c.unstable_now(), typeof vt == "function") {
                      R.callback = vt, J(T), B = !0;
                      break l;
                    }
                    R === d(j) && o(j), J(T);
                  } else o(j);
                  R = d(j);
                }
                if (R !== null) B = !0;
                else {
                  var v = d(b);
                  v !== null && It(
                    tt,
                    v.startTime - T
                  ), B = !1;
                }
              }
              break t;
            } finally {
              R = null, x = w, H = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Ot() : ut = !1;
        }
      }
    }
    var Ot;
    if (typeof bt == "function")
      Ot = function() {
        bt(F);
      };
    else if (typeof MessageChannel < "u") {
      var ol = new MessageChannel(), Lt = ol.port2;
      ol.port1.onmessage = F, Ot = function() {
        Lt.postMessage(null);
      };
    } else
      Ot = function() {
        ct(F, 0);
      };
    function It(T, B) {
      Z = ct(function() {
        T(c.unstable_now());
      }, B);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, c.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : _t = 0 < T ? Math.floor(1e3 / T) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, c.unstable_next = function(T) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = x;
      }
      var w = x;
      x = B;
      try {
        return T();
      } finally {
        x = w;
      }
    }, c.unstable_requestPaint = function() {
      I = !0;
    }, c.unstable_runWithPriority = function(T, B) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var w = x;
      x = T;
      try {
        return B();
      } finally {
        x = w;
      }
    }, c.unstable_scheduleCallback = function(T, B, w) {
      var St = c.unstable_now();
      switch (typeof w == "object" && w !== null ? (w = w.delay, w = typeof w == "number" && 0 < w ? St + w : St) : w = St, T) {
        case 1:
          var vt = -1;
          break;
        case 2:
          vt = 250;
          break;
        case 5:
          vt = 1073741823;
          break;
        case 4:
          vt = 1e4;
          break;
        default:
          vt = 5e3;
      }
      return vt = w + vt, T = {
        id: U++,
        callback: B,
        priorityLevel: T,
        startTime: w,
        expirationTime: vt,
        sortIndex: -1
      }, w > St ? (T.sortIndex = w, y(b, T), d(j) === null && T === d(b) && (W ? (V(Z), Z = -1) : W = !0, It(tt, w - St))) : (T.sortIndex = vt, y(j, T), Q || H || (Q = !0, ut || (ut = !0, Ot()))), T;
    }, c.unstable_shouldYield = sl, c.unstable_wrapCallback = function(T) {
      var B = x;
      return function() {
        var w = x;
        x = B;
        try {
          return T.apply(this, arguments);
        } finally {
          x = w;
        }
      };
    };
  })(Pf)), Pf;
}
var jm;
function C0() {
  return jm || (jm = 1, If.exports = U0()), If.exports;
}
var ts = { exports: {} }, il = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Om;
function H0() {
  if (Om) return il;
  Om = 1;
  var c = Ri();
  function y(j) {
    var b = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        b += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + j + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var o = {
    d: {
      f: d,
      r: function() {
        throw Error(y(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, N = Symbol.for("react.portal");
  function M(j, b, U) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: N,
      key: R == null ? null : "" + R,
      children: j,
      containerInfo: b,
      implementation: U
    };
  }
  var E = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function C(j, b) {
    if (j === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return il.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, il.createPortal = function(j, b) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(y(299));
    return M(j, b, null, U);
  }, il.flushSync = function(j) {
    var b = E.T, U = o.p;
    try {
      if (E.T = null, o.p = 2, j) return j();
    } finally {
      E.T = b, o.p = U, o.d.f();
    }
  }, il.preconnect = function(j, b) {
    typeof j == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, o.d.C(j, b));
  }, il.prefetchDNS = function(j) {
    typeof j == "string" && o.d.D(j);
  }, il.preinit = function(j, b) {
    if (typeof j == "string" && b && typeof b.as == "string") {
      var U = b.as, R = C(U, b.crossOrigin), x = typeof b.integrity == "string" ? b.integrity : void 0, H = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      U === "style" ? o.d.S(
        j,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: R,
          integrity: x,
          fetchPriority: H
        }
      ) : U === "script" && o.d.X(j, {
        crossOrigin: R,
        integrity: x,
        fetchPriority: H,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, il.preinitModule = function(j, b) {
    if (typeof j == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var U = C(
            b.as,
            b.crossOrigin
          );
          o.d.M(j, {
            crossOrigin: U,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
            nonce: typeof b.nonce == "string" ? b.nonce : void 0
          });
        }
      } else b == null && o.d.M(j);
  }, il.preload = function(j, b) {
    if (typeof j == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var U = b.as, R = C(U, b.crossOrigin);
      o.d.L(j, U, {
        crossOrigin: R,
        integrity: typeof b.integrity == "string" ? b.integrity : void 0,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0,
        type: typeof b.type == "string" ? b.type : void 0,
        fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
        referrerPolicy: typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
        imageSrcSet: typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
        imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
        media: typeof b.media == "string" ? b.media : void 0
      });
    }
  }, il.preloadModule = function(j, b) {
    if (typeof j == "string")
      if (b) {
        var U = C(b.as, b.crossOrigin);
        o.d.m(j, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: U,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0
        });
      } else o.d.m(j);
  }, il.requestFormReset = function(j) {
    o.d.r(j);
  }, il.unstable_batchedUpdates = function(j, b) {
    return j(b);
  }, il.useFormState = function(j, b, U) {
    return E.H.useFormState(j, b, U);
  }, il.useFormStatus = function() {
    return E.H.useHostTransitionStatus();
  }, il.version = "19.2.6", il;
}
var Dm;
function q0() {
  if (Dm) return ts.exports;
  Dm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), ts.exports = H0(), ts.exports;
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
var Mm;
function B0() {
  if (Mm) return eu;
  Mm = 1;
  var c = C0(), y = Ri(), d = q0();
  function o(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function N(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function M(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function E(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function j(t) {
    if (M(t) !== t)
      throw Error(o(188));
  }
  function b(t) {
    var l = t.alternate;
    if (!l) {
      if (l = M(t), l === null) throw Error(o(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return j(n), t;
          if (u === a) return j(n), l;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, f = n.child; f; ) {
          if (f === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (f === a) {
            i = !0, a = n, e = u;
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = u.child; f; ) {
            if (f === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (f === a) {
              i = !0, a = u, e = n;
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? t : l;
  }
  function U(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = U(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var R = Object.assign, x = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), ct = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), bt = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), tt = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), Z = Symbol.for("react.memo"), _t = Symbol.for("react.lazy"), nt = Symbol.for("react.activity"), sl = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function Ot(t) {
    return t === null || typeof t != "object" ? null : (t = F && t[F] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ol = Symbol.for("react.client.reference");
  function Lt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ol ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case W:
        return "Fragment";
      case ct:
        return "Profiler";
      case I:
        return "StrictMode";
      case tt:
        return "Suspense";
      case ut:
        return "SuspenseList";
      case nt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Q:
          return "Portal";
        case bt:
          return t.displayName || "Context";
        case V:
          return (t._context.displayName || "Context") + ".Consumer";
        case J:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Z:
          return l = t.displayName || null, l !== null ? l : Lt(t.type) || "Memo";
        case _t:
          l = t._payload, t = t._init;
          try {
            return Lt(t(l));
          } catch {
          }
      }
    return null;
  }
  var It = Array.isArray, T = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, St = [], vt = -1;
  function v(t) {
    return { current: t };
  }
  function O(t) {
    0 > vt || (t.current = St[vt], St[vt] = null, vt--);
  }
  function q(t, l) {
    vt++, St[vt] = t.current, t.current = l;
  }
  var Y = v(null), k = v(null), lt = v(null), it = v(null);
  function Vt(t, l) {
    switch (q(lt, l), q(k, t), q(Y, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Jd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Jd(l), t = wd(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    O(Y), q(Y, t);
  }
  function Bt() {
    O(Y), O(k), O(lt);
  }
  function pe(t) {
    t.memoizedState !== null && q(it, t);
    var l = Y.current, e = wd(l, t.type);
    l !== e && (q(k, t), q(Y, e));
  }
  function We(t) {
    k.current === t && (O(Y), O(k)), it.current === t && (O(it), kn._currentValue = w);
  }
  var cn, fu;
  function El(t) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        cn = l && l[1] || "", fu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + t + fu;
  }
  var pa = !1;
  function su(t, l) {
    if (!t || pa) return "";
    pa = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
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
                Reflect.construct(t, [], D);
              } else {
                try {
                  D.call();
                } catch (_) {
                  p = _;
                }
                t.call(D.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                p = _;
              }
              (D = t()) && typeof D.catch == "function" && D.catch(function() {
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
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], f = u[1];
      if (i && f) {
        var r = i.split(`
`), S = f.split(`
`);
        for (n = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < S.length && !S[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === r.length || n === S.length)
          for (a = r.length - 1, n = S.length - 1; 1 <= a && 0 <= n && r[a] !== S[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== S[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || r[a] !== S[n]) {
                  var z = `
` + r[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      pa = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? El(e) : "";
  }
  function Nt(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return El(t.type);
      case 16:
        return El("Lazy");
      case 13:
        return t.child !== l && l !== null ? El("Suspense Fallback") : El("Suspense");
      case 19:
        return El("SuspenseList");
      case 0:
      case 15:
        return su(t.type, !1);
      case 11:
        return su(t.type.render, !1);
      case 1:
        return su(t.type, !0);
      case 31:
        return El("Activity");
      default:
        return "";
    }
  }
  function Ht(t) {
    try {
      var l = "", e = null;
      do
        l += Nt(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Dt = Object.prototype.hasOwnProperty, Mt = c.unstable_scheduleCallback, dl = c.unstable_cancelCallback, ml = c.unstable_shouldYield, Zt = c.unstable_requestPaint, Rt = c.unstable_now, Fe = c.unstable_getCurrentPriorityLevel, be = c.unstable_ImmediatePriority, fn = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, vl = c.unstable_LowPriority, Rl = c.unstable_IdlePriority, sn = c.log, Hi = c.unstable_setDisableYieldValue, kl = null, Tl = null;
  function _e(t) {
    if (typeof sn == "function" && Hi(t), Tl && typeof Tl.setStrictMode == "function")
      try {
        Tl.setStrictMode(kl, t);
      } catch {
      }
  }
  var Nl = Math.clz32 ? Math.clz32 : hv, mv = Math.log, vv = Math.LN2;
  function hv(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (mv(t) / vv | 0) | 0;
  }
  var ou = 256, ru = 262144, du = 4194304;
  function Ie(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function mu(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Ie(a) : (i &= f, i !== 0 ? n = Ie(i) : e || (e = f & ~t, e !== 0 && (n = Ie(e))))) : (f = a & ~u, f !== 0 ? n = Ie(f) : i !== 0 ? n = Ie(i) : e || (e = a & ~t, e !== 0 && (n = Ie(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function on(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function yv(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function xs() {
    var t = du;
    return du <<= 1, (du & 62914560) === 0 && (du = 4194304), t;
  }
  function qi(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function rn(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function gv(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var f = t.entanglements, r = t.expirationTimes, S = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var z = 31 - Nl(e), D = 1 << z;
      f[z] = 0, r[z] = -1;
      var p = S[z];
      if (p !== null)
        for (S[z] = null, z = 0; z < p.length; z++) {
          var _ = p[z];
          _ !== null && (_.lane &= -536870913);
        }
      e &= ~D;
    }
    a !== 0 && As(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function As(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - Nl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function js(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - Nl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Os(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Bi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Bi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Yi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ds() {
    var t = B.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ym(t.type));
  }
  function Ms(t, l) {
    var e = B.p;
    try {
      return B.p = t, l();
    } finally {
      B.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), ll = "__reactFiber$" + Ee, hl = "__reactProps$" + Ee, ba = "__reactContainer$" + Ee, Gi = "__reactEvents$" + Ee, Sv = "__reactListeners$" + Ee, pv = "__reactHandles$" + Ee, Rs = "__reactResources$" + Ee, dn = "__reactMarker$" + Ee;
  function Xi(t) {
    delete t[ll], delete t[hl], delete t[Gi], delete t[Sv], delete t[pv];
  }
  function _a(t) {
    var l = t[ll];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[ba] || e[ll]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = tm(t); t !== null; ) {
            if (e = t[ll]) return e;
            t = tm(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ea(t) {
    if (t = t[ll] || t[ba]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function mn(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Ta(t) {
    var l = t[Rs];
    return l || (l = t[Rs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Pt(t) {
    t[dn] = !0;
  }
  var Us = /* @__PURE__ */ new Set(), Cs = {};
  function Pe(t, l) {
    Na(t, l), Na(t + "Capture", l);
  }
  function Na(t, l) {
    for (Cs[t] = l, t = 0; t < l.length; t++)
      Us.add(l[t]);
  }
  var bv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hs = {}, qs = {};
  function _v(t) {
    return Dt.call(qs, t) ? !0 : Dt.call(Hs, t) ? !1 : bv.test(t) ? qs[t] = !0 : (Hs[t] = !0, !1);
  }
  function vu(t, l, e) {
    if (_v(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function hu(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function Il(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function Ul(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Bs(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Ev(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function Qi(t) {
    if (!t._valueTracker) {
      var l = Bs(t) ? "checked" : "value";
      t._valueTracker = Ev(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Ys(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Bs(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function yu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Tv = /[\n"\\]/g;
  function Cl(t) {
    return t.replace(
      Tv,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Li(t, l, e, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Ul(l)) : t.value !== "" + Ul(l) && (t.value = "" + Ul(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? Vi(t, i, Ul(l)) : e != null ? Vi(t, i, Ul(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Ul(f) : t.removeAttribute("name");
  }
  function Gs(t, l, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        Qi(t);
        return;
      }
      e = e != null ? "" + Ul(e) : "", l = l != null ? "" + Ul(l) : e, f || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Qi(t);
  }
  function Vi(t, l, e) {
    l === "number" && yu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function za(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Ul(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Xs(t, l, e) {
    if (l != null && (l = "" + Ul(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Ul(e) : "";
  }
  function Qs(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (It(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Ul(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Qi(t);
  }
  function xa(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Nv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ls(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Nv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Vs(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(o(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Ls(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Ls(t, u, l[u]);
  }
  function Zi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var zv = /* @__PURE__ */ new Map([
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
  ]), xv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function gu(t) {
    return xv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Pl() {
  }
  var Ki = null;
  function Ji(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Aa = null, ja = null;
  function Zs(t) {
    var l = Ea(t);
    if (l && (t = l.stateNode)) {
      var e = t[hl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Li(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Cl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[hl] || null;
                if (!n) throw Error(o(90));
                Li(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && Ys(a);
          }
          break t;
        case "textarea":
          Xs(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && za(t, !!e.multiple, l, !1);
      }
    }
  }
  var wi = !1;
  function Ks(t, l, e) {
    if (wi) return t(l, e);
    wi = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (wi = !1, (Aa !== null || ja !== null) && (ni(), Aa && (l = Aa, t = ja, ja = Aa = null, Zs(l), t)))
        for (l = 0; l < t.length; l++) Zs(t[l]);
    }
  }
  function vn(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[hl] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        o(231, l, typeof e)
      );
    return e;
  }
  var te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $i = !1;
  if (te)
    try {
      var hn = {};
      Object.defineProperty(hn, "passive", {
        get: function() {
          $i = !0;
        }
      }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
    } catch {
      $i = !1;
    }
  var Te = null, Wi = null, Su = null;
  function Js() {
    if (Su) return Su;
    var t, l = Wi, e = l.length, a, n = "value" in Te ? Te.value : Te.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return Su = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function pu(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function bu() {
    return !0;
  }
  function ws() {
    return !1;
  }
  function yl(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (e = t[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? bu : ws, this.isPropagationStopped = ws, this;
    }
    return R(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = bu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = bu);
      },
      persist: function() {
      },
      isPersistent: bu
    }), l;
  }
  var ta = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _u = yl(ta), yn = R({}, ta, { view: 0, detail: 0 }), Av = yl(yn), Fi, ki, gn, Eu = R({}, yn, {
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
    getModifierState: Pi,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== gn && (gn && t.type === "mousemove" ? (Fi = t.screenX - gn.screenX, ki = t.screenY - gn.screenY) : ki = Fi = 0, gn = t), Fi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ki;
    }
  }), $s = yl(Eu), jv = R({}, Eu, { dataTransfer: 0 }), Ov = yl(jv), Dv = R({}, yn, { relatedTarget: 0 }), Ii = yl(Dv), Mv = R({}, ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Rv = yl(Mv), Uv = R({}, ta, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Cv = yl(Uv), Hv = R({}, ta, { data: 0 }), Ws = yl(Hv), qv = {
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
  }, Bv = {
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
  }, Yv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Gv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Yv[t]) ? !!l[t] : !1;
  }
  function Pi() {
    return Gv;
  }
  var Xv = R({}, yn, {
    key: function(t) {
      if (t.key) {
        var l = qv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = pu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Bv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pi,
    charCode: function(t) {
      return t.type === "keypress" ? pu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? pu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Qv = yl(Xv), Lv = R({}, Eu, {
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
  }), Fs = yl(Lv), Vv = R({}, yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pi
  }), Zv = yl(Vv), Kv = R({}, ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jv = yl(Kv), wv = R({}, Eu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $v = yl(wv), Wv = R({}, ta, {
    newState: 0,
    oldState: 0
  }), Fv = yl(Wv), kv = [9, 13, 27, 32], tc = te && "CompositionEvent" in window, Sn = null;
  te && "documentMode" in document && (Sn = document.documentMode);
  var Iv = te && "TextEvent" in window && !Sn, ks = te && (!tc || Sn && 8 < Sn && 11 >= Sn), Is = " ", Ps = !1;
  function to(t, l) {
    switch (t) {
      case "keyup":
        return kv.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function lo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Oa = !1;
  function Pv(t, l) {
    switch (t) {
      case "compositionend":
        return lo(l);
      case "keypress":
        return l.which !== 32 ? null : (Ps = !0, Is);
      case "textInput":
        return t = l.data, t === Is && Ps ? null : t;
      default:
        return null;
    }
  }
  function th(t, l) {
    if (Oa)
      return t === "compositionend" || !tc && to(t, l) ? (t = Js(), Su = Wi = Te = null, Oa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return ks && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var lh = {
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
  function eo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!lh[t.type] : l === "textarea";
  }
  function ao(t, l, e, a) {
    Aa ? ja ? ja.push(a) : ja = [a] : Aa = a, l = ri(l, "onChange"), 0 < l.length && (e = new _u(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var pn = null, bn = null;
  function eh(t) {
    Xd(t, 0);
  }
  function Tu(t) {
    var l = mn(t);
    if (Ys(l)) return t;
  }
  function no(t, l) {
    if (t === "change") return l;
  }
  var uo = !1;
  if (te) {
    var lc;
    if (te) {
      var ec = "oninput" in document;
      if (!ec) {
        var io = document.createElement("div");
        io.setAttribute("oninput", "return;"), ec = typeof io.oninput == "function";
      }
      lc = ec;
    } else lc = !1;
    uo = lc && (!document.documentMode || 9 < document.documentMode);
  }
  function co() {
    pn && (pn.detachEvent("onpropertychange", fo), bn = pn = null);
  }
  function fo(t) {
    if (t.propertyName === "value" && Tu(bn)) {
      var l = [];
      ao(
        l,
        bn,
        t,
        Ji(t)
      ), Ks(eh, l);
    }
  }
  function ah(t, l, e) {
    t === "focusin" ? (co(), pn = l, bn = e, pn.attachEvent("onpropertychange", fo)) : t === "focusout" && co();
  }
  function nh(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Tu(bn);
  }
  function uh(t, l) {
    if (t === "click") return Tu(l);
  }
  function ih(t, l) {
    if (t === "input" || t === "change")
      return Tu(l);
  }
  function ch(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var zl = typeof Object.is == "function" ? Object.is : ch;
  function _n(t, l) {
    if (zl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Dt.call(l, n) || !zl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function so(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function oo(t, l) {
    var e = so(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = so(e);
    }
  }
  function ro(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? ro(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function mo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = yu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = yu(t.document);
    }
    return l;
  }
  function ac(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var fh = te && "documentMode" in document && 11 >= document.documentMode, Da = null, nc = null, En = null, uc = !1;
  function vo(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    uc || Da == null || Da !== yu(a) || (a = Da, "selectionStart" in a && ac(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), En && _n(En, a) || (En = a, a = ri(nc, "onSelect"), 0 < a.length && (l = new _u(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = Da)));
  }
  function la(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Ma = {
    animationend: la("Animation", "AnimationEnd"),
    animationiteration: la("Animation", "AnimationIteration"),
    animationstart: la("Animation", "AnimationStart"),
    transitionrun: la("Transition", "TransitionRun"),
    transitionstart: la("Transition", "TransitionStart"),
    transitioncancel: la("Transition", "TransitionCancel"),
    transitionend: la("Transition", "TransitionEnd")
  }, ic = {}, ho = {};
  te && (ho = document.createElement("div").style, "AnimationEvent" in window || (delete Ma.animationend.animation, delete Ma.animationiteration.animation, delete Ma.animationstart.animation), "TransitionEvent" in window || delete Ma.transitionend.transition);
  function ea(t) {
    if (ic[t]) return ic[t];
    if (!Ma[t]) return t;
    var l = Ma[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in ho)
        return ic[t] = l[e];
    return t;
  }
  var yo = ea("animationend"), go = ea("animationiteration"), So = ea("animationstart"), sh = ea("transitionrun"), oh = ea("transitionstart"), rh = ea("transitioncancel"), po = ea("transitionend"), bo = /* @__PURE__ */ new Map(), cc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  cc.push("scrollEnd");
  function Vl(t, l) {
    bo.set(t, l), Pe(l, [t]);
  }
  var Nu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Hl = [], Ra = 0, fc = 0;
  function zu() {
    for (var t = Ra, l = fc = Ra = 0; l < t; ) {
      var e = Hl[l];
      Hl[l++] = null;
      var a = Hl[l];
      Hl[l++] = null;
      var n = Hl[l];
      Hl[l++] = null;
      var u = Hl[l];
      if (Hl[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && _o(e, n, u);
    }
  }
  function xu(t, l, e, a) {
    Hl[Ra++] = t, Hl[Ra++] = l, Hl[Ra++] = e, Hl[Ra++] = a, fc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function sc(t, l, e, a) {
    return xu(t, l, e, a), Au(t);
  }
  function aa(t, l) {
    return xu(t, null, null, l), Au(t);
  }
  function _o(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - Nl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Au(t) {
    if (50 < Zn)
      throw Zn = 0, pf = null, Error(o(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ua = {};
  function dh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function xl(t, l, e, a) {
    return new dh(t, l, e, a);
  }
  function oc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function le(t, l) {
    var e = t.alternate;
    return e === null ? (e = xl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Eo(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function ju(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") oc(t) && (i = 1);
    else if (typeof t == "string")
      i = g0(
        t,
        e,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case nt:
          return t = xl(31, e, l, n), t.elementType = nt, t.lanes = u, t;
        case W:
          return na(e.children, n, u, l);
        case I:
          i = 8, n |= 24;
          break;
        case ct:
          return t = xl(12, e, l, n | 2), t.elementType = ct, t.lanes = u, t;
        case tt:
          return t = xl(13, e, l, n), t.elementType = tt, t.lanes = u, t;
        case ut:
          return t = xl(19, e, l, n), t.elementType = ut, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case bt:
                i = 10;
                break t;
              case V:
                i = 9;
                break t;
              case J:
                i = 11;
                break t;
              case Z:
                i = 14;
                break t;
              case _t:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = xl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function na(t, l, e, a) {
    return t = xl(7, t, a, l), t.lanes = e, t;
  }
  function rc(t, l, e) {
    return t = xl(6, t, null, l), t.lanes = e, t;
  }
  function To(t) {
    var l = xl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function dc(t, l, e) {
    return l = xl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var No = /* @__PURE__ */ new WeakMap();
  function ql(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = No.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ht(l)
      }, No.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ht(l)
    };
  }
  var Ca = [], Ha = 0, Ou = null, Tn = 0, Bl = [], Yl = 0, Ne = null, Jl = 1, wl = "";
  function ee(t, l) {
    Ca[Ha++] = Tn, Ca[Ha++] = Ou, Ou = t, Tn = l;
  }
  function zo(t, l, e) {
    Bl[Yl++] = Jl, Bl[Yl++] = wl, Bl[Yl++] = Ne, Ne = t;
    var a = Jl;
    t = wl;
    var n = 32 - Nl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - Nl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Jl = 1 << 32 - Nl(l) + n | e << n | a, wl = u + t;
    } else
      Jl = 1 << u | e << n | a, wl = t;
  }
  function mc(t) {
    t.return !== null && (ee(t, 1), zo(t, 1, 0));
  }
  function vc(t) {
    for (; t === Ou; )
      Ou = Ca[--Ha], Ca[Ha] = null, Tn = Ca[--Ha], Ca[Ha] = null;
    for (; t === Ne; )
      Ne = Bl[--Yl], Bl[Yl] = null, wl = Bl[--Yl], Bl[Yl] = null, Jl = Bl[--Yl], Bl[Yl] = null;
  }
  function xo(t, l) {
    Bl[Yl++] = Jl, Bl[Yl++] = wl, Bl[Yl++] = Ne, Jl = l.id, wl = l.overflow, Ne = t;
  }
  var el = null, Ut = null, mt = !1, ze = null, Gl = !1, hc = Error(o(519));
  function xe(t) {
    var l = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Nn(ql(l, t)), hc;
  }
  function Ao(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[ll] = t, l[hl] = a, e) {
      case "dialog":
        st("cancel", l), st("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Jn.length; e++)
          st(Jn[e], l);
        break;
      case "source":
        st("error", l);
        break;
      case "img":
      case "image":
      case "link":
        st("error", l), st("load", l);
        break;
      case "details":
        st("toggle", l);
        break;
      case "input":
        st("invalid", l), Gs(
          l,
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
        st("invalid", l);
        break;
      case "textarea":
        st("invalid", l), Qs(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Zd(l.textContent, e) ? (a.popover != null && (st("beforetoggle", l), st("toggle", l)), a.onScroll != null && st("scroll", l), a.onScrollEnd != null && st("scrollend", l), a.onClick != null && (l.onclick = Pl), l = !0) : l = !1, l || xe(t, !0);
  }
  function jo(t) {
    for (el = t.return; el; )
      switch (el.tag) {
        case 5:
        case 31:
        case 13:
          Gl = !1;
          return;
        case 27:
        case 3:
          Gl = !0;
          return;
        default:
          el = el.return;
      }
  }
  function qa(t) {
    if (t !== el) return !1;
    if (!mt) return jo(t), mt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Cf(t.type, t.memoizedProps)), e = !e), e && Ut && xe(t), jo(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ut = Pd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ut = Pd(t);
    } else
      l === 27 ? (l = Ut, Xe(t.type) ? (t = Gf, Gf = null, Ut = t) : Ut = l) : Ut = el ? Ql(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ua() {
    Ut = el = null, mt = !1;
  }
  function yc() {
    var t = ze;
    return t !== null && (bl === null ? bl = t : bl.push.apply(
      bl,
      t
    ), ze = null), t;
  }
  function Nn(t) {
    ze === null ? ze = [t] : ze.push(t);
  }
  var gc = v(null), ia = null, ae = null;
  function Ae(t, l, e) {
    q(gc, l._currentValue), l._currentValue = e;
  }
  function ne(t) {
    t._currentValue = gc.current, O(gc);
  }
  function Sc(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function pc(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var r = 0; r < l.length; r++)
            if (f.context === l[r]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), Sc(
                u.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(o(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), Sc(i, e, t), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function Ba(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          zl(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === it.current) {
        if (i = n.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(kn) : t = [kn]);
      }
      n = n.return;
    }
    t !== null && pc(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Du(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!zl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ca(t) {
    ia = t, ae = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function al(t) {
    return Oo(ia, t);
  }
  function Mu(t, l) {
    return ia === null && ca(t), Oo(t, l);
  }
  function Oo(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, ae === null) {
      if (t === null) throw Error(o(308));
      ae = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else ae = ae.next = l;
    return e;
  }
  var mh = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, vh = c.unstable_scheduleCallback, hh = c.unstable_NormalPriority, wt = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function bc() {
    return {
      controller: new mh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zn(t) {
    t.refCount--, t.refCount === 0 && vh(hh, function() {
      t.controller.abort();
    });
  }
  var xn = null, _c = 0, Ya = 0, Ga = null;
  function yh(t, l) {
    if (xn === null) {
      var e = xn = [];
      _c = 0, Ya = zf(), Ga = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return _c++, l.then(Do, Do), l;
  }
  function Do() {
    if (--_c === 0 && xn !== null) {
      Ga !== null && (Ga.status = "fulfilled");
      var t = xn;
      xn = null, Ya = 0, Ga = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function gh(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var n = 0; n < e.length; n++) (0, e[n])(l);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var Mo = T.S;
  T.S = function(t, l) {
    vd = Rt(), typeof l == "object" && l !== null && typeof l.then == "function" && yh(t, l), Mo !== null && Mo(t, l);
  };
  var fa = v(null);
  function Ec() {
    var t = fa.current;
    return t !== null ? t : jt.pooledCache;
  }
  function Ru(t, l) {
    l === null ? q(fa, fa.current) : q(fa, l.pool);
  }
  function Ro() {
    var t = Ec();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var Xa = Error(o(460)), Tc = Error(o(474)), Uu = Error(o(542)), Cu = { then: function() {
  } };
  function Uo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Co(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Pl, Pl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, qo(t), t;
      default:
        if (typeof l.status == "string") l.then(Pl, Pl);
        else {
          if (t = jt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, qo(t), t;
        }
        throw oa = l, Xa;
    }
  }
  function sa(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (oa = e, Xa) : e;
    }
  }
  var oa = null;
  function Ho() {
    if (oa === null) throw Error(o(459));
    var t = oa;
    return oa = null, t;
  }
  function qo(t) {
    if (t === Xa || t === Uu)
      throw Error(o(483));
  }
  var Qa = null, An = 0;
  function Hu(t) {
    var l = An;
    return An += 1, Qa === null && (Qa = []), Co(Qa, t, l);
  }
  function jn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function qu(t, l) {
    throw l.$$typeof === x ? Error(o(525)) : (t = Object.prototype.toString.call(l), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Bo(t) {
    function l(h, m) {
      if (t) {
        var g = h.deletions;
        g === null ? (h.deletions = [m], h.flags |= 16) : g.push(m);
      }
    }
    function e(h, m) {
      if (!t) return null;
      for (; m !== null; )
        l(h, m), m = m.sibling;
      return null;
    }
    function a(h) {
      for (var m = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
      return m;
    }
    function n(h, m) {
      return h = le(h, m), h.index = 0, h.sibling = null, h;
    }
    function u(h, m, g) {
      return h.index = g, t ? (g = h.alternate, g !== null ? (g = g.index, g < m ? (h.flags |= 67108866, m) : g) : (h.flags |= 67108866, m)) : (h.flags |= 1048576, m);
    }
    function i(h) {
      return t && h.alternate === null && (h.flags |= 67108866), h;
    }
    function f(h, m, g, A) {
      return m === null || m.tag !== 6 ? (m = rc(g, h.mode, A), m.return = h, m) : (m = n(m, g), m.return = h, m);
    }
    function r(h, m, g, A) {
      var K = g.type;
      return K === W ? z(
        h,
        m,
        g.props.children,
        A,
        g.key
      ) : m !== null && (m.elementType === K || typeof K == "object" && K !== null && K.$$typeof === _t && sa(K) === m.type) ? (m = n(m, g.props), jn(m, g), m.return = h, m) : (m = ju(
        g.type,
        g.key,
        g.props,
        null,
        h.mode,
        A
      ), jn(m, g), m.return = h, m);
    }
    function S(h, m, g, A) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== g.containerInfo || m.stateNode.implementation !== g.implementation ? (m = dc(g, h.mode, A), m.return = h, m) : (m = n(m, g.children || []), m.return = h, m);
    }
    function z(h, m, g, A, K) {
      return m === null || m.tag !== 7 ? (m = na(
        g,
        h.mode,
        A,
        K
      ), m.return = h, m) : (m = n(m, g), m.return = h, m);
    }
    function D(h, m, g) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = rc(
          "" + m,
          h.mode,
          g
        ), m.return = h, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case H:
            return g = ju(
              m.type,
              m.key,
              m.props,
              null,
              h.mode,
              g
            ), jn(g, m), g.return = h, g;
          case Q:
            return m = dc(
              m,
              h.mode,
              g
            ), m.return = h, m;
          case _t:
            return m = sa(m), D(h, m, g);
        }
        if (It(m) || Ot(m))
          return m = na(
            m,
            h.mode,
            g,
            null
          ), m.return = h, m;
        if (typeof m.then == "function")
          return D(h, Hu(m), g);
        if (m.$$typeof === bt)
          return D(
            h,
            Mu(h, m),
            g
          );
        qu(h, m);
      }
      return null;
    }
    function p(h, m, g, A) {
      var K = m !== null ? m.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return K !== null ? null : f(h, m, "" + g, A);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case H:
            return g.key === K ? r(h, m, g, A) : null;
          case Q:
            return g.key === K ? S(h, m, g, A) : null;
          case _t:
            return g = sa(g), p(h, m, g, A);
        }
        if (It(g) || Ot(g))
          return K !== null ? null : z(h, m, g, A, null);
        if (typeof g.then == "function")
          return p(
            h,
            m,
            Hu(g),
            A
          );
        if (g.$$typeof === bt)
          return p(
            h,
            m,
            Mu(h, g),
            A
          );
        qu(h, g);
      }
      return null;
    }
    function _(h, m, g, A, K) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return h = h.get(g) || null, f(m, h, "" + A, K);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case H:
            return h = h.get(
              A.key === null ? g : A.key
            ) || null, r(m, h, A, K);
          case Q:
            return h = h.get(
              A.key === null ? g : A.key
            ) || null, S(m, h, A, K);
          case _t:
            return A = sa(A), _(
              h,
              m,
              g,
              A,
              K
            );
        }
        if (It(A) || Ot(A))
          return h = h.get(g) || null, z(m, h, A, K, null);
        if (typeof A.then == "function")
          return _(
            h,
            m,
            g,
            Hu(A),
            K
          );
        if (A.$$typeof === bt)
          return _(
            h,
            m,
            g,
            Mu(m, A),
            K
          );
        qu(m, A);
      }
      return null;
    }
    function X(h, m, g, A) {
      for (var K = null, yt = null, L = m, at = m = 0, rt = null; L !== null && at < g.length; at++) {
        L.index > at ? (rt = L, L = null) : rt = L.sibling;
        var gt = p(
          h,
          L,
          g[at],
          A
        );
        if (gt === null) {
          L === null && (L = rt);
          break;
        }
        t && L && gt.alternate === null && l(h, L), m = u(gt, m, at), yt === null ? K = gt : yt.sibling = gt, yt = gt, L = rt;
      }
      if (at === g.length)
        return e(h, L), mt && ee(h, at), K;
      if (L === null) {
        for (; at < g.length; at++)
          L = D(h, g[at], A), L !== null && (m = u(
            L,
            m,
            at
          ), yt === null ? K = L : yt.sibling = L, yt = L);
        return mt && ee(h, at), K;
      }
      for (L = a(L); at < g.length; at++)
        rt = _(
          L,
          h,
          at,
          g[at],
          A
        ), rt !== null && (t && rt.alternate !== null && L.delete(
          rt.key === null ? at : rt.key
        ), m = u(
          rt,
          m,
          at
        ), yt === null ? K = rt : yt.sibling = rt, yt = rt);
      return t && L.forEach(function(Ke) {
        return l(h, Ke);
      }), mt && ee(h, at), K;
    }
    function $(h, m, g, A) {
      if (g == null) throw Error(o(151));
      for (var K = null, yt = null, L = m, at = m = 0, rt = null, gt = g.next(); L !== null && !gt.done; at++, gt = g.next()) {
        L.index > at ? (rt = L, L = null) : rt = L.sibling;
        var Ke = p(h, L, gt.value, A);
        if (Ke === null) {
          L === null && (L = rt);
          break;
        }
        t && L && Ke.alternate === null && l(h, L), m = u(Ke, m, at), yt === null ? K = Ke : yt.sibling = Ke, yt = Ke, L = rt;
      }
      if (gt.done)
        return e(h, L), mt && ee(h, at), K;
      if (L === null) {
        for (; !gt.done; at++, gt = g.next())
          gt = D(h, gt.value, A), gt !== null && (m = u(gt, m, at), yt === null ? K = gt : yt.sibling = gt, yt = gt);
        return mt && ee(h, at), K;
      }
      for (L = a(L); !gt.done; at++, gt = g.next())
        gt = _(L, h, at, gt.value, A), gt !== null && (t && gt.alternate !== null && L.delete(gt.key === null ? at : gt.key), m = u(gt, m, at), yt === null ? K = gt : yt.sibling = gt, yt = gt);
      return t && L.forEach(function(j0) {
        return l(h, j0);
      }), mt && ee(h, at), K;
    }
    function At(h, m, g, A) {
      if (typeof g == "object" && g !== null && g.type === W && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case H:
            t: {
              for (var K = g.key; m !== null; ) {
                if (m.key === K) {
                  if (K = g.type, K === W) {
                    if (m.tag === 7) {
                      e(
                        h,
                        m.sibling
                      ), A = n(
                        m,
                        g.props.children
                      ), A.return = h, h = A;
                      break t;
                    }
                  } else if (m.elementType === K || typeof K == "object" && K !== null && K.$$typeof === _t && sa(K) === m.type) {
                    e(
                      h,
                      m.sibling
                    ), A = n(m, g.props), jn(A, g), A.return = h, h = A;
                    break t;
                  }
                  e(h, m);
                  break;
                } else l(h, m);
                m = m.sibling;
              }
              g.type === W ? (A = na(
                g.props.children,
                h.mode,
                A,
                g.key
              ), A.return = h, h = A) : (A = ju(
                g.type,
                g.key,
                g.props,
                null,
                h.mode,
                A
              ), jn(A, g), A.return = h, h = A);
            }
            return i(h);
          case Q:
            t: {
              for (K = g.key; m !== null; ) {
                if (m.key === K)
                  if (m.tag === 4 && m.stateNode.containerInfo === g.containerInfo && m.stateNode.implementation === g.implementation) {
                    e(
                      h,
                      m.sibling
                    ), A = n(m, g.children || []), A.return = h, h = A;
                    break t;
                  } else {
                    e(h, m);
                    break;
                  }
                else l(h, m);
                m = m.sibling;
              }
              A = dc(g, h.mode, A), A.return = h, h = A;
            }
            return i(h);
          case _t:
            return g = sa(g), At(
              h,
              m,
              g,
              A
            );
        }
        if (It(g))
          return X(
            h,
            m,
            g,
            A
          );
        if (Ot(g)) {
          if (K = Ot(g), typeof K != "function") throw Error(o(150));
          return g = K.call(g), $(
            h,
            m,
            g,
            A
          );
        }
        if (typeof g.then == "function")
          return At(
            h,
            m,
            Hu(g),
            A
          );
        if (g.$$typeof === bt)
          return At(
            h,
            m,
            Mu(h, g),
            A
          );
        qu(h, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, m !== null && m.tag === 6 ? (e(h, m.sibling), A = n(m, g), A.return = h, h = A) : (e(h, m), A = rc(g, h.mode, A), A.return = h, h = A), i(h)) : e(h, m);
    }
    return function(h, m, g, A) {
      try {
        An = 0;
        var K = At(
          h,
          m,
          g,
          A
        );
        return Qa = null, K;
      } catch (L) {
        if (L === Xa || L === Uu) throw L;
        var yt = xl(29, L, null, h.mode);
        return yt.lanes = A, yt.return = h, yt;
      } finally {
      }
    };
  }
  var ra = Bo(!0), Yo = Bo(!1), je = !1;
  function Nc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function zc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Oe(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function De(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (pt & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Au(t), _o(t, null, e), l;
    }
    return xu(t, a, l, e), Au(t);
  }
  function On(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, js(t, e);
    }
  }
  function xc(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = l : u = u.next = l;
      } else n = u = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Ac = !1;
  function Dn() {
    if (Ac) {
      var t = Ga;
      if (t !== null) throw t;
    }
  }
  function Mn(t, l, e, a) {
    Ac = !1;
    var n = t.updateQueue;
    je = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var r = f, S = r.next;
      r.next = null, i === null ? u = S : i.next = S, i = r;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, f = z.lastBaseUpdate, f !== i && (f === null ? z.firstBaseUpdate = S : f.next = S, z.lastBaseUpdate = r));
    }
    if (u !== null) {
      var D = n.baseState;
      i = 0, z = S = r = null, f = u;
      do {
        var p = f.lane & -536870913, _ = p !== f.lane;
        if (_ ? (ot & p) === p : (a & p) === p) {
          p !== 0 && p === Ya && (Ac = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, $ = f;
            p = l;
            var At = e;
            switch ($.tag) {
              case 1:
                if (X = $.payload, typeof X == "function") {
                  D = X.call(At, D, p);
                  break t;
                }
                D = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = $.payload, p = typeof X == "function" ? X.call(At, D, p) : X, p == null) break t;
                D = R({}, D, p);
                break t;
              case 2:
                je = !0;
            }
          }
          p = f.callback, p !== null && (t.flags |= 64, _ && (t.flags |= 8192), _ = n.callbacks, _ === null ? n.callbacks = [p] : _.push(p));
        } else
          _ = {
            lane: p,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, z === null ? (S = z = _, r = D) : z = z.next = _, i |= p;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          _ = f, f = _.next, _.next = null, n.lastBaseUpdate = _, n.shared.pending = null;
        }
      } while (!0);
      z === null && (r = D), n.baseState = r, n.firstBaseUpdate = S, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), He |= i, t.lanes = i, t.memoizedState = D;
    }
  }
  function Go(t, l) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(l);
  }
  function Xo(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Go(e[t], l);
  }
  var La = v(null), Bu = v(0);
  function Qo(t, l) {
    t = me, q(Bu, t), q(La, l), me = t | l.baseLanes;
  }
  function jc() {
    q(Bu, me), q(La, La.current);
  }
  function Oc() {
    me = Bu.current, O(La), O(Bu);
  }
  var Al = v(null), Xl = null;
  function Me(t) {
    var l = t.alternate;
    q(Kt, Kt.current & 1), q(Al, t), Xl === null && (l === null || La.current !== null || l.memoizedState !== null) && (Xl = t);
  }
  function Dc(t) {
    q(Kt, Kt.current), q(Al, t), Xl === null && (Xl = t);
  }
  function Lo(t) {
    t.tag === 22 ? (q(Kt, Kt.current), q(Al, t), Xl === null && (Xl = t)) : Re();
  }
  function Re() {
    q(Kt, Kt.current), q(Al, Al.current);
  }
  function jl(t) {
    O(Al), Xl === t && (Xl = null), O(Kt);
  }
  var Kt = v(0);
  function Yu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Bf(e) || Yf(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var ue = 0, et = null, zt = null, $t = null, Gu = !1, Va = !1, da = !1, Xu = 0, Rn = 0, Za = null, Sh = 0;
  function Xt() {
    throw Error(o(321));
  }
  function Mc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!zl(t[e], l[e])) return !1;
    return !0;
  }
  function Rc(t, l, e, a, n, u) {
    return ue = u, et = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, T.H = t === null || t.memoizedState === null ? zr : wc, da = !1, u = e(a, n), da = !1, Va && (u = Zo(
      l,
      e,
      a,
      n
    )), Vo(t), u;
  }
  function Vo(t) {
    T.H = Hn;
    var l = zt !== null && zt.next !== null;
    if (ue = 0, $t = zt = et = null, Gu = !1, Rn = 0, Za = null, l) throw Error(o(300));
    t === null || Wt || (t = t.dependencies, t !== null && Du(t) && (Wt = !0));
  }
  function Zo(t, l, e, a) {
    et = t;
    var n = 0;
    do {
      if (Va && (Za = null), Rn = 0, Va = !1, 25 <= n) throw Error(o(301));
      if (n += 1, $t = zt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      T.H = xr, u = l(e, a);
    } while (Va);
    return u;
  }
  function ph() {
    var t = T.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Un(l) : l, t = t.useState()[0], (zt !== null ? zt.memoizedState : null) !== t && (et.flags |= 1024), l;
  }
  function Uc() {
    var t = Xu !== 0;
    return Xu = 0, t;
  }
  function Cc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Hc(t) {
    if (Gu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Gu = !1;
    }
    ue = 0, $t = zt = et = null, Va = !1, Rn = Xu = 0, Za = null;
  }
  function rl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? et.memoizedState = $t = t : $t = $t.next = t, $t;
  }
  function Jt() {
    if (zt === null) {
      var t = et.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = zt.next;
    var l = $t === null ? et.memoizedState : $t.next;
    if (l !== null)
      $t = l, zt = t;
    else {
      if (t === null)
        throw et.alternate === null ? Error(o(467)) : Error(o(310));
      zt = t, t = {
        memoizedState: zt.memoizedState,
        baseState: zt.baseState,
        baseQueue: zt.baseQueue,
        queue: zt.queue,
        next: null
      }, $t === null ? et.memoizedState = $t = t : $t = $t.next = t;
    }
    return $t;
  }
  function Qu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Un(t) {
    var l = Rn;
    return Rn += 1, Za === null && (Za = []), t = Co(Za, t, l), l = et, ($t === null ? l.memoizedState : $t.next) === null && (l = l.alternate, T.H = l === null || l.memoizedState === null ? zr : wc), t;
  }
  function Lu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Un(t);
      if (t.$$typeof === bt) return al(t);
    }
    throw Error(o(438, String(t)));
  }
  function qc(t) {
    var l = null, e = et.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = et.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Qu(), et.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = sl;
    return l.index++, e;
  }
  function ie(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Vu(t) {
    var l = Jt();
    return Bc(l, zt, t);
  }
  function Bc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      l.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      l = n.next;
      var f = i = null, r = null, S = l, z = !1;
      do {
        var D = S.lane & -536870913;
        if (D !== S.lane ? (ot & D) === D : (ue & D) === D) {
          var p = S.revertLane;
          if (p === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), D === Ya && (z = !0);
          else if ((ue & p) === p) {
            S = S.next, p === Ya && (z = !0);
            continue;
          } else
            D = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, r === null ? (f = r = D, i = u) : r = r.next = D, et.lanes |= p, He |= p;
          D = S.action, da && e(u, D), u = S.hasEagerState ? S.eagerState : e(u, D);
        } else
          p = {
            lane: D,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, r === null ? (f = r = p, i = u) : r = r.next = p, et.lanes |= D, He |= D;
        S = S.next;
      } while (S !== null && S !== l);
      if (r === null ? i = u : r.next = f, !zl(u, t.memoizedState) && (Wt = !0, z && (e = Ga, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Yc(t) {
    var l = Jt(), e = l.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      zl(u, l.memoizedState) || (Wt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Ko(t, l, e) {
    var a = et, n = Jt(), u = mt;
    if (u) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = l();
    var i = !zl(
      (zt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Wt = !0), n = n.queue, Qc($o.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || $t !== null && $t.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        wo.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), jt === null) throw Error(o(349));
      u || (ue & 127) !== 0 || Jo(a, l, e);
    }
    return e;
  }
  function Jo(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = et.updateQueue, l === null ? (l = Qu(), et.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function wo(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Wo(l) && Fo(t);
  }
  function $o(t, l, e) {
    return e(function() {
      Wo(l) && Fo(t);
    });
  }
  function Wo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !zl(t, e);
    } catch {
      return !0;
    }
  }
  function Fo(t) {
    var l = aa(t, 2);
    l !== null && _l(l, t, 2);
  }
  function Gc(t) {
    var l = rl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), da) {
        _e(!0);
        try {
          e();
        } finally {
          _e(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ie,
      lastRenderedState: t
    }, l;
  }
  function ko(t, l, e, a) {
    return t.baseState = e, Bc(
      t,
      zt,
      typeof a == "function" ? a : ie
    );
  }
  function bh(t, l, e, a, n) {
    if (Ju(t)) throw Error(o(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      T.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Io(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Io(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = T.T, i = {};
      T.T = i;
      try {
        var f = e(n, a), r = T.S;
        r !== null && r(i, f), Po(t, l, f);
      } catch (S) {
        Xc(t, l, S);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), T.T = u;
      }
    } else
      try {
        u = e(n, a), Po(t, l, u);
      } catch (S) {
        Xc(t, l, S);
      }
  }
  function Po(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        tr(t, l, a);
      },
      function(a) {
        return Xc(t, l, a);
      }
    ) : tr(t, l, e);
  }
  function tr(t, l, e) {
    l.status = "fulfilled", l.value = e, lr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Io(t, e)));
  }
  function Xc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, lr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function lr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function er(t, l) {
    return l;
  }
  function ar(t, l) {
    if (mt) {
      var e = jt.formState;
      if (e !== null) {
        t: {
          var a = et;
          if (mt) {
            if (Ut) {
              l: {
                for (var n = Ut, u = Gl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = Ql(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ut = Ql(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            xe(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = rl(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: er,
      lastRenderedState: l
    }, e.queue = a, e = Er.bind(
      null,
      et,
      a
    ), a.dispatch = e, a = Gc(!1), u = Jc.bind(
      null,
      et,
      !1,
      a.queue
    ), a = rl(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = bh.bind(
      null,
      et,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function nr(t) {
    var l = Jt();
    return ur(l, zt, t);
  }
  function ur(t, l, e) {
    if (l = Bc(
      t,
      l,
      er
    )[0], t = Vu(ie)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Un(l);
      } catch (i) {
        throw i === Xa ? Uu : i;
      }
    else a = l;
    l = Jt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (et.flags |= 2048, Ka(
      9,
      { destroy: void 0 },
      _h.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function _h(t, l) {
    t.action = l;
  }
  function ir(t) {
    var l = Jt(), e = zt;
    if (e !== null)
      return ur(l, e, t);
    Jt(), l = l.memoizedState, e = Jt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Ka(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = et.updateQueue, l === null && (l = Qu(), et.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function cr() {
    return Jt().memoizedState;
  }
  function Zu(t, l, e, a) {
    var n = rl();
    et.flags |= t, n.memoizedState = Ka(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Ku(t, l, e, a) {
    var n = Jt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    zt !== null && a !== null && Mc(a, zt.memoizedState.deps) ? n.memoizedState = Ka(l, u, e, a) : (et.flags |= t, n.memoizedState = Ka(
      1 | l,
      u,
      e,
      a
    ));
  }
  function fr(t, l) {
    Zu(8390656, 8, t, l);
  }
  function Qc(t, l) {
    Ku(2048, 8, t, l);
  }
  function Eh(t) {
    et.flags |= 4;
    var l = et.updateQueue;
    if (l === null)
      l = Qu(), et.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function sr(t) {
    var l = Jt().memoizedState;
    return Eh({ ref: l, nextImpl: t }), function() {
      if ((pt & 2) !== 0) throw Error(o(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function or(t, l) {
    return Ku(4, 2, t, l);
  }
  function rr(t, l) {
    return Ku(4, 4, t, l);
  }
  function dr(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function mr(t, l, e) {
    e = e != null ? e.concat([t]) : null, Ku(4, 4, dr.bind(null, l, t), e);
  }
  function Lc() {
  }
  function vr(t, l) {
    var e = Jt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && Mc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function hr(t, l) {
    var e = Jt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && Mc(l, a[1]))
      return a[0];
    if (a = t(), da) {
      _e(!0);
      try {
        t();
      } finally {
        _e(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function Vc(t, l, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (ot & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = yd(), et.lanes |= t, He |= t, e);
  }
  function yr(t, l, e, a) {
    return zl(e, l) ? e : La.current !== null ? (t = Vc(t, e, a), zl(t, l) || (Wt = !0), t) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (ot & 261930) === 0 ? (Wt = !0, t.memoizedState = e) : (t = yd(), et.lanes |= t, He |= t, l);
  }
  function gr(t, l, e, a, n) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var i = T.T, f = {};
    T.T = f, Jc(t, !1, l, e);
    try {
      var r = n(), S = T.S;
      if (S !== null && S(f, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var z = gh(
          r,
          a
        );
        Cn(
          t,
          l,
          z,
          Ml(t)
        );
      } else
        Cn(
          t,
          l,
          a,
          Ml(t)
        );
    } catch (D) {
      Cn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: D },
        Ml()
      );
    } finally {
      B.p = u, i !== null && f.types !== null && (i.types = f.types), T.T = i;
    }
  }
  function Th() {
  }
  function Zc(t, l, e, a) {
    if (t.tag !== 5) throw Error(o(476));
    var n = Sr(t).queue;
    gr(
      t,
      n,
      l,
      w,
      e === null ? Th : function() {
        return pr(t), e(a);
      }
    );
  }
  function Sr(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: w,
      baseState: w,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ie,
        lastRenderedState: w
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ie,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function pr(t) {
    var l = Sr(t);
    l.next === null && (l = t.alternate.memoizedState), Cn(
      t,
      l.next.queue,
      {},
      Ml()
    );
  }
  function Kc() {
    return al(kn);
  }
  function br() {
    return Jt().memoizedState;
  }
  function _r() {
    return Jt().memoizedState;
  }
  function Nh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Ml();
          t = Oe(e);
          var a = De(l, t, e);
          a !== null && (_l(a, l, e), On(a, l, e)), l = { cache: bc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function zh(t, l, e) {
    var a = Ml();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ju(t) ? Tr(l, e) : (e = sc(t, l, e, a), e !== null && (_l(e, t, a), Nr(e, l, a)));
  }
  function Er(t, l, e) {
    var a = Ml();
    Cn(t, l, e, a);
  }
  function Cn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ju(t)) Tr(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, zl(f, i))
            return xu(t, l, n, 0), jt === null && zu(), !1;
        } catch {
        } finally {
        }
      if (e = sc(t, l, n, a), e !== null)
        return _l(e, t, a), Nr(e, l, a), !0;
    }
    return !1;
  }
  function Jc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: zf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ju(t)) {
      if (l) throw Error(o(479));
    } else
      l = sc(
        t,
        e,
        a,
        2
      ), l !== null && _l(l, t, 2);
  }
  function Ju(t) {
    var l = t.alternate;
    return t === et || l !== null && l === et;
  }
  function Tr(t, l) {
    Va = Gu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Nr(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, js(t, e);
    }
  }
  var Hn = {
    readContext: al,
    use: Lu,
    useCallback: Xt,
    useContext: Xt,
    useEffect: Xt,
    useImperativeHandle: Xt,
    useLayoutEffect: Xt,
    useInsertionEffect: Xt,
    useMemo: Xt,
    useReducer: Xt,
    useRef: Xt,
    useState: Xt,
    useDebugValue: Xt,
    useDeferredValue: Xt,
    useTransition: Xt,
    useSyncExternalStore: Xt,
    useId: Xt,
    useHostTransitionStatus: Xt,
    useFormState: Xt,
    useActionState: Xt,
    useOptimistic: Xt,
    useMemoCache: Xt,
    useCacheRefresh: Xt
  };
  Hn.useEffectEvent = Xt;
  var zr = {
    readContext: al,
    use: Lu,
    useCallback: function(t, l) {
      return rl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: al,
    useEffect: fr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Zu(
        4194308,
        4,
        dr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Zu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Zu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = rl();
      l = l === void 0 ? null : l;
      var a = t();
      if (da) {
        _e(!0);
        try {
          t();
        } finally {
          _e(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = rl();
      if (e !== void 0) {
        var n = e(l);
        if (da) {
          _e(!0);
          try {
            e(l);
          } finally {
            _e(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = zh.bind(
        null,
        et,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = rl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Gc(t);
      var l = t.queue, e = Er.bind(null, et, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Lc,
    useDeferredValue: function(t, l) {
      var e = rl();
      return Vc(e, t, l);
    },
    useTransition: function() {
      var t = Gc(!1);
      return t = gr.bind(
        null,
        et,
        t.queue,
        !0,
        !1
      ), rl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = et, n = rl();
      if (mt) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = l(), jt === null)
          throw Error(o(349));
        (ot & 127) !== 0 || Jo(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, fr($o.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        wo.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = rl(), l = jt.identifierPrefix;
      if (mt) {
        var e = wl, a = Jl;
        e = (a & ~(1 << 32 - Nl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Xu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Sh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Kc,
    useFormState: ar,
    useActionState: ar,
    useOptimistic: function(t) {
      var l = rl();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Jc.bind(
        null,
        et,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: qc,
    useCacheRefresh: function() {
      return rl().memoizedState = Nh.bind(
        null,
        et
      );
    },
    useEffectEvent: function(t) {
      var l = rl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((pt & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, wc = {
    readContext: al,
    use: Lu,
    useCallback: vr,
    useContext: al,
    useEffect: Qc,
    useImperativeHandle: mr,
    useInsertionEffect: or,
    useLayoutEffect: rr,
    useMemo: hr,
    useReducer: Vu,
    useRef: cr,
    useState: function() {
      return Vu(ie);
    },
    useDebugValue: Lc,
    useDeferredValue: function(t, l) {
      var e = Jt();
      return yr(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Vu(ie)[0], l = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Un(t),
        l
      ];
    },
    useSyncExternalStore: Ko,
    useId: br,
    useHostTransitionStatus: Kc,
    useFormState: nr,
    useActionState: nr,
    useOptimistic: function(t, l) {
      var e = Jt();
      return ko(e, zt, t, l);
    },
    useMemoCache: qc,
    useCacheRefresh: _r
  };
  wc.useEffectEvent = sr;
  var xr = {
    readContext: al,
    use: Lu,
    useCallback: vr,
    useContext: al,
    useEffect: Qc,
    useImperativeHandle: mr,
    useInsertionEffect: or,
    useLayoutEffect: rr,
    useMemo: hr,
    useReducer: Yc,
    useRef: cr,
    useState: function() {
      return Yc(ie);
    },
    useDebugValue: Lc,
    useDeferredValue: function(t, l) {
      var e = Jt();
      return zt === null ? Vc(e, t, l) : yr(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Yc(ie)[0], l = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Un(t),
        l
      ];
    },
    useSyncExternalStore: Ko,
    useId: br,
    useHostTransitionStatus: Kc,
    useFormState: ir,
    useActionState: ir,
    useOptimistic: function(t, l) {
      var e = Jt();
      return zt !== null ? ko(e, zt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: qc,
    useCacheRefresh: _r
  };
  xr.useEffectEvent = sr;
  function $c(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : R({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Wc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ml(), n = Oe(a);
      n.payload = l, e != null && (n.callback = e), l = De(t, n, a), l !== null && (_l(l, t, a), On(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ml(), n = Oe(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = De(t, n, a), l !== null && (_l(l, t, a), On(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Ml(), a = Oe(e);
      a.tag = 2, l != null && (a.callback = l), l = De(t, a, e), l !== null && (_l(l, t, e), On(l, t, e));
    }
  };
  function Ar(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !_n(e, a) || !_n(n, u) : !0;
  }
  function jr(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && Wc.enqueueReplaceState(l, l.state, null);
  }
  function ma(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = R({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function Or(t) {
    Nu(t);
  }
  function Dr(t) {
    console.error(t);
  }
  function Mr(t) {
    Nu(t);
  }
  function wu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Rr(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Fc(t, l, e) {
    return e = Oe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      wu(t, l);
    }, e;
  }
  function Ur(t) {
    return t = Oe(t), t.tag = 3, t;
  }
  function Cr(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Rr(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Rr(l, e, a), typeof n != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function xh(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Ba(
        l,
        e,
        n,
        !0
      ), e = Al.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Xl === null ? ui() : e.alternate === null && Qt === 0 && (Qt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Cu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Ef(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Cu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Ef(t, a, n)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return Ef(t, a, n), ui(), !1;
    }
    if (mt)
      return l = Al.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== hc && (t = Error(o(422), { cause: a }), Nn(ql(t, e)))) : (a !== hc && (l = Error(o(423), {
        cause: a
      }), Nn(
        ql(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = ql(a, e), n = Fc(
        t.stateNode,
        a,
        n
      ), xc(t, n), Qt !== 4 && (Qt = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = ql(u, e), Vn === null ? Vn = [u] : Vn.push(u), Qt !== 4 && (Qt = 2), l === null) return !0;
    a = ql(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = Fc(e.stateNode, a, t), xc(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qe === null || !qe.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Ur(n), Cr(
              n,
              t,
              e,
              a
            ), xc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var kc = Error(o(461)), Wt = !1;
  function nl(t, l, e, a) {
    l.child = t === null ? Yo(l, null, e, a) : ra(
      l,
      t.child,
      e,
      a
    );
  }
  function Hr(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return ca(l), a = Rc(
      t,
      l,
      e,
      i,
      u,
      n
    ), f = Uc(), t !== null && !Wt ? (Cc(t, l, n), ce(t, l, n)) : (mt && f && mc(l), l.flags |= 1, nl(t, l, a, n), l.child);
  }
  function qr(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !oc(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Br(
        t,
        l,
        u,
        a,
        n
      )) : (t = ju(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !uf(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : _n, e(i, a) && t.ref === l.ref)
        return ce(t, l, n);
    }
    return l.flags |= 1, t = le(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Br(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (_n(u, a) && t.ref === l.ref)
        if (Wt = !1, l.pendingProps = a = u, uf(t, n))
          (t.flags & 131072) !== 0 && (Wt = !0);
        else
          return l.lanes = t.lanes, ce(t, l, n);
    }
    return Ic(
      t,
      l,
      e,
      a,
      n
    );
  }
  function Yr(t, l, e, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, l.child = null;
        return Gr(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ru(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Qo(l, u) : jc(), Lo(l);
      else
        return a = l.lanes = 536870912, Gr(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Ru(l, u.cachePool), Qo(l, u), Re(), l.memoizedState = null) : (t !== null && Ru(l, null), jc(), Re());
    return nl(t, l, n, e), l.child;
  }
  function qn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Gr(t, l, e, a, n) {
    var u = Ec();
    return u = u === null ? null : { parent: wt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Ru(l, null), jc(), Lo(l), t !== null && Ba(t, l, a, !0), l.childLanes = n, null;
  }
  function $u(t, l) {
    return l = Fu(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Xr(t, l, e) {
    return ra(l, t.child, null, e), t = $u(l, l.pendingProps), t.flags |= 2, jl(l), l.memoizedState = null, t;
  }
  function Ah(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (mt) {
        if (a.mode === "hidden")
          return t = $u(l, a), l.lanes = 536870912, qn(null, t);
        if (Dc(l), (t = Ut) ? (t = Id(
          t,
          Gl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ne !== null ? { id: Jl, overflow: wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = To(t), e.return = l, l.child = e, el = l, Ut = null)) : t = null, t === null) throw xe(l);
        return l.lanes = 536870912, null;
      }
      return $u(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Dc(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Xr(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(o(558));
      else if (Wt || Ba(t, l, e, !1), n = (e & t.childLanes) !== 0, Wt || n) {
        if (a = jt, a !== null && (i = Os(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, aa(t, i), _l(a, t, i), kc;
        ui(), l = Xr(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Ut = Ql(i.nextSibling), el = l, mt = !0, ze = null, Gl = !1, t !== null && xo(l, t), l = $u(l, a), l.flags |= 4096;
      return l;
    }
    return t = le(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Wu(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Ic(t, l, e, a, n) {
    return ca(l), e = Rc(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = Uc(), t !== null && !Wt ? (Cc(t, l, n), ce(t, l, n)) : (mt && a && mc(l), l.flags |= 1, nl(t, l, e, n), l.child);
  }
  function Qr(t, l, e, a, n, u) {
    return ca(l), l.updateQueue = null, e = Zo(
      l,
      a,
      e,
      n
    ), Vo(t), a = Uc(), t !== null && !Wt ? (Cc(t, l, u), ce(t, l, u)) : (mt && a && mc(l), l.flags |= 1, nl(t, l, e, u), l.child);
  }
  function Lr(t, l, e, a, n) {
    if (ca(l), l.stateNode === null) {
      var u = Ua, i = e.contextType;
      typeof i == "object" && i !== null && (u = al(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Wc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Nc(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? al(i) : Ua, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && ($c(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Wc.enqueueReplaceState(u, u.state, null), Mn(l, a, u, n), Dn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var f = l.memoizedProps, r = ma(e, f);
      u.props = r;
      var S = u.context, z = e.contextType;
      i = Ua, typeof z == "object" && z !== null && (i = al(z));
      var D = e.getDerivedStateFromProps;
      z = typeof D == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = l.pendingProps !== f, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || S !== i) && jr(
        l,
        u,
        a,
        i
      ), je = !1;
      var p = l.memoizedState;
      u.state = p, Mn(l, a, u, n), Dn(), S = l.memoizedState, f || p !== S || je ? (typeof D == "function" && ($c(
        l,
        e,
        D,
        a
      ), S = l.memoizedState), (r = je || Ar(
        l,
        e,
        r,
        a,
        p,
        S,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = S), u.props = a, u.state = S, u.context = i, a = r) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, zc(t, l), i = l.memoizedProps, z = ma(e, i), u.props = z, D = l.pendingProps, p = u.context, S = e.contextType, r = Ua, typeof S == "object" && S !== null && (r = al(S)), f = e.getDerivedStateFromProps, (S = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== D || p !== r) && jr(
        l,
        u,
        a,
        r
      ), je = !1, p = l.memoizedState, u.state = p, Mn(l, a, u, n), Dn();
      var _ = l.memoizedState;
      i !== D || p !== _ || je || t !== null && t.dependencies !== null && Du(t.dependencies) ? (typeof f == "function" && ($c(
        l,
        e,
        f,
        a
      ), _ = l.memoizedState), (z = je || Ar(
        l,
        e,
        z,
        a,
        p,
        _,
        r
      ) || t !== null && t.dependencies !== null && Du(t.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, _, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        _,
        r
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = _), u.props = a, u.state = _, u.context = r, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, Wu(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = ra(
      l,
      t.child,
      null,
      n
    ), l.child = ra(
      l,
      null,
      e,
      n
    )) : nl(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = ce(
      t,
      l,
      n
    ), t;
  }
  function Vr(t, l, e, a) {
    return ua(), l.flags |= 256, nl(t, l, e, a), l.child;
  }
  var Pc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function tf(t) {
    return { baseLanes: t, cachePool: Ro() };
  }
  function lf(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Dl), t;
  }
  function Zr(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Kt.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (mt) {
        if (n ? Me(l) : Re(), (t = Ut) ? (t = Id(
          t,
          Gl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ne !== null ? { id: Jl, overflow: wl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = To(t), e.return = l, l.child = e, el = l, Ut = null)) : t = null, t === null) throw xe(l);
        return Yf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Re(), n = l.mode, f = Fu(
        { mode: "hidden", children: f },
        n
      ), a = na(
        a,
        n,
        e,
        null
      ), f.return = l, a.return = l, f.sibling = a, l.child = f, a = l.child, a.memoizedState = tf(e), a.childLanes = lf(
        t,
        i,
        e
      ), l.memoizedState = Pc, qn(null, a)) : (Me(l), ef(l, f));
    }
    var r = t.memoizedState;
    if (r !== null && (f = r.dehydrated, f !== null)) {
      if (u)
        l.flags & 256 ? (Me(l), l.flags &= -257, l = af(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Re(), l.child = t.child, l.flags |= 128, l = null) : (Re(), f = a.fallback, n = l.mode, a = Fu(
          { mode: "visible", children: a.children },
          n
        ), f = na(
          f,
          n,
          e,
          null
        ), f.flags |= 2, a.return = l, f.return = l, a.sibling = f, l.child = a, ra(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = tf(e), a.childLanes = lf(
          t,
          i,
          e
        ), l.memoizedState = Pc, l = qn(null, a));
      else if (Me(l), Yf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var S = i.dgst;
        i = S, a = Error(o(419)), a.stack = "", a.digest = i, Nn({ value: a, source: null, stack: null }), l = af(
          t,
          l,
          e
        );
      } else if (Wt || Ba(t, l, e, !1), i = (e & t.childLanes) !== 0, Wt || i) {
        if (i = jt, i !== null && (a = Os(i, e), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, aa(t, a), _l(i, t, a), kc;
        Bf(f) || ui(), l = af(
          t,
          l,
          e
        );
      } else
        Bf(f) ? (l.flags |= 192, l.child = t.child, l = null) : (t = r.treeContext, Ut = Ql(
          f.nextSibling
        ), el = l, mt = !0, ze = null, Gl = !1, t !== null && xo(l, t), l = ef(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (Re(), f = a.fallback, n = l.mode, r = t.child, S = r.sibling, a = le(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, S !== null ? f = le(
      S,
      f
    ) : (f = na(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = l, a.return = l, a.sibling = f, l.child = a, qn(null, a), a = l.child, f = t.child.memoizedState, f === null ? f = tf(e) : (n = f.cachePool, n !== null ? (r = wt._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = Ro(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = lf(
      t,
      i,
      e
    ), l.memoizedState = Pc, qn(t.child, a)) : (Me(l), e = t.child, t = e.sibling, e = le(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function ef(t, l) {
    return l = Fu(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Fu(t, l) {
    return t = xl(22, t, null, l), t.lanes = 0, t;
  }
  function af(t, l, e) {
    return ra(l, t.child, null, e), t = ef(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Kr(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Sc(t.return, l, e);
  }
  function nf(t, l, e, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function Jr(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Kt.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, q(Kt, i), nl(t, l, a, e), a = mt ? Tn : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Kr(t, e, l);
        else if (t.tag === 19)
          Kr(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = l.child, n = null; e !== null; )
          t = e.alternate, t !== null && Yu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), nf(
          l,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = l.child, l.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Yu(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        nf(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        nf(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function ce(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), He |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Ba(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(o(153));
    if (l.child !== null) {
      for (t = l.child, e = le(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = le(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function uf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Du(t)));
  }
  function jh(t, l, e) {
    switch (l.tag) {
      case 3:
        Vt(l, l.stateNode.containerInfo), Ae(l, wt, t.memoizedState.cache), ua();
        break;
      case 27:
      case 5:
        pe(l);
        break;
      case 4:
        Vt(l, l.stateNode.containerInfo);
        break;
      case 10:
        Ae(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Dc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Me(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Zr(t, l, e) : (Me(l), t = ce(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        Me(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (Ba(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Jr(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), q(Kt, Kt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Yr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Ae(l, wt, t.memoizedState.cache);
    }
    return ce(t, l, e);
  }
  function wr(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Wt = !0;
      else {
        if (!uf(t, e) && (l.flags & 128) === 0)
          return Wt = !1, jh(
            t,
            l,
            e
          );
        Wt = (t.flags & 131072) !== 0;
      }
    else
      Wt = !1, mt && (l.flags & 1048576) !== 0 && zo(l, Tn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = sa(l.elementType), l.type = t, typeof t == "function")
            oc(t) ? (a = ma(t, a), l.tag = 1, l = Lr(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Ic(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === J) {
                l.tag = 11, l = Hr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === Z) {
                l.tag = 14, l = qr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Lt(t) || t, Error(o(306, l, ""));
          }
        }
        return l;
      case 0:
        return Ic(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = ma(
          a,
          l.pendingProps
        ), Lr(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Vt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, zc(t, l), Mn(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, Ae(l, wt, a), a !== u.cache && pc(
            l,
            [wt],
            e,
            !0
          ), Dn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = Vr(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = ql(
                Error(o(424)),
                l
              ), Nn(n), l = Vr(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Ut = Ql(t.firstChild), el = l, mt = !0, ze = null, Gl = !0, e = Yo(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (ua(), a === n) {
              l = ce(
                t,
                l,
                e
              );
              break t;
            }
            nl(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return Wu(t, l), t === null ? (e = nm(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : mt || (e = l.type, t = l.pendingProps, a = di(
          lt.current
        ).createElement(e), a[ll] = l, a[hl] = t, ul(a, e, t), Pt(a), l.stateNode = a) : l.memoizedState = nm(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return pe(l), t === null && mt && (a = l.stateNode = lm(
          l.type,
          l.pendingProps,
          lt.current
        ), el = l, Gl = !0, n = Ut, Xe(l.type) ? (Gf = n, Ut = Ql(a.firstChild)) : Ut = n), nl(
          t,
          l,
          l.pendingProps.children,
          e
        ), Wu(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && mt && ((n = a = Ut) && (a = n0(
          a,
          l.type,
          l.pendingProps,
          Gl
        ), a !== null ? (l.stateNode = a, el = l, Ut = Ql(a.firstChild), Gl = !1, n = !0) : n = !1), n || xe(l)), pe(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Cf(n, u) ? a = null : i !== null && Cf(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = Rc(
          t,
          l,
          ph,
          null,
          null,
          e
        ), kn._currentValue = n), Wu(t, l), nl(t, l, a, e), l.child;
      case 6:
        return t === null && mt && ((t = e = Ut) && (e = u0(
          e,
          l.pendingProps,
          Gl
        ), e !== null ? (l.stateNode = e, el = l, Ut = null, t = !0) : t = !1), t || xe(l)), null;
      case 13:
        return Zr(t, l, e);
      case 4:
        return Vt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = ra(
          l,
          null,
          a,
          e
        ) : nl(t, l, a, e), l.child;
      case 11:
        return Hr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return nl(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return nl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return nl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, Ae(l, l.type, a.value), nl(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, ca(l), n = al(n), a = a(n), l.flags |= 1, nl(t, l, a, e), l.child;
      case 14:
        return qr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Br(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Jr(t, l, e);
      case 31:
        return Ah(t, l, e);
      case 22:
        return Yr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return ca(l), a = al(wt), t === null ? (n = Ec(), n === null && (n = jt, u = bc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Nc(l), Ae(l, wt, n)) : ((t.lanes & e) !== 0 && (zc(t, l), Mn(l, null, null, e), Dn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), Ae(l, wt, a)) : (a = u.cache, Ae(l, wt, a), a !== n.cache && pc(
          l,
          [wt],
          e,
          !0
        ))), nl(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(o(156, l.tag));
  }
  function fe(t) {
    t.flags |= 4;
  }
  function cf(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (bd()) t.flags |= 8192;
        else
          throw oa = Cu, Tc;
    } else t.flags &= -16777217;
  }
  function $r(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !sm(l))
      if (bd()) t.flags |= 8192;
      else
        throw oa = Cu, Tc;
  }
  function ku(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? xs() : 536870912, t.lanes |= l, Wa |= l);
  }
  function Bn(t, l) {
    if (!mt)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function Ct(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function Oh(t, l, e) {
    var a = l.pendingProps;
    switch (vc(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ct(l), null;
      case 1:
        return Ct(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), ne(wt), Bt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (qa(l) ? fe(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, yc())), Ct(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (fe(l), u !== null ? (Ct(l), $r(l, u)) : (Ct(l), cf(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (fe(l), Ct(l), $r(l, u)) : (Ct(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && fe(l), Ct(l), cf(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (We(l), e = lt.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && fe(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(o(166));
            return Ct(l), null;
          }
          t = Y.current, qa(l) ? Ao(l) : (t = lm(n, a, e), l.stateNode = t, fe(l));
        }
        return Ct(l), null;
      case 5:
        if (We(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && fe(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(o(166));
            return Ct(l), null;
          }
          if (u = Y.current, qa(l))
            Ao(l);
          else {
            var i = di(
              lt.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[ll] = l, u[hl] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = u;
            t: switch (ul(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && fe(l);
          }
        }
        return Ct(l), cf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && fe(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(o(166));
          if (t = lt.current, qa(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = el, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ll] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Zd(t.nodeValue, e)), t || xe(l, !0);
          } else
            t = di(t).createTextNode(
              a
            ), t[ll] = l, l.stateNode = t;
        }
        return Ct(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = qa(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[ll] = l;
            } else
              ua(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ct(l), t = !1;
          } else
            e = yc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (jl(l), l) : (jl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Ct(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = qa(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[ll] = l;
            } else
              ua(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ct(l), n = !1;
          } else
            n = yc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (jl(l), l) : (jl(l), null);
        }
        return jl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), ku(l, l.updateQueue), Ct(l), null);
      case 4:
        return Bt(), t === null && Of(l.stateNode.containerInfo), Ct(l), null;
      case 10:
        return ne(l.type), Ct(l), null;
      case 19:
        if (O(Kt), a = l.memoizedState, a === null) return Ct(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Bn(a, !1);
          else {
            if (Qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = Yu(t), u !== null) {
                  for (l.flags |= 128, Bn(a, !1), t = u.updateQueue, l.updateQueue = t, ku(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Eo(e, t), e = e.sibling;
                  return q(
                    Kt,
                    Kt.current & 1 | 2
                  ), mt && ee(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Rt() > ei && (l.flags |= 128, n = !0, Bn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Yu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, ku(l, t), Bn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !mt)
                return Ct(l), null;
            } else
              2 * Rt() - a.renderingStartTime > ei && e !== 536870912 && (l.flags |= 128, n = !0, Bn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Rt(), t.sibling = null, e = Kt.current, q(
          Kt,
          n ? e & 1 | 2 : e & 1
        ), mt && ee(l, a.treeForkCount), t) : (Ct(l), null);
      case 22:
      case 23:
        return jl(l), Oc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ct(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ct(l), e = l.updateQueue, e !== null && ku(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && O(fa), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), ne(wt), Ct(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, l.tag));
  }
  function Dh(t, l) {
    switch (vc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return ne(wt), Bt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return We(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (jl(l), l.alternate === null)
            throw Error(o(340));
          ua();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (jl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(o(340));
          ua();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return O(Kt), null;
      case 4:
        return Bt(), null;
      case 10:
        return ne(l.type), null;
      case 22:
      case 23:
        return jl(l), Oc(), t !== null && O(fa), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return ne(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wr(t, l) {
    switch (vc(l), l.tag) {
      case 3:
        ne(wt), Bt();
        break;
      case 26:
      case 27:
      case 5:
        We(l);
        break;
      case 4:
        Bt();
        break;
      case 31:
        l.memoizedState !== null && jl(l);
        break;
      case 13:
        jl(l);
        break;
      case 19:
        O(Kt);
        break;
      case 10:
        ne(l.type);
        break;
      case 22:
      case 23:
        jl(l), Oc(), t !== null && O(fa);
        break;
      case 24:
        ne(wt);
    }
  }
  function Yn(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (f) {
      Tt(l, l.return, f);
    }
  }
  function Ue(t, l, e) {
    try {
      var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = l;
              var r = e, S = f;
              try {
                S();
              } catch (z) {
                Tt(
                  n,
                  r,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      Tt(l, l.return, z);
    }
  }
  function Fr(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Xo(l, e);
      } catch (a) {
        Tt(t, t.return, a);
      }
    }
  }
  function kr(t, l, e) {
    e.props = ma(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Tt(t, l, a);
    }
  }
  function Gn(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      Tt(t, l, n);
    }
  }
  function $l(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Tt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Tt(t, l, n);
        }
      else e.current = null;
  }
  function Ir(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      Tt(t, t.return, n);
    }
  }
  function ff(t, l, e) {
    try {
      var a = t.stateNode;
      Ih(a, t.type, e, l), a[hl] = l;
    } catch (n) {
      Tt(t, t.return, n);
    }
  }
  function Pr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Xe(t.type) || t.tag === 4;
  }
  function sf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Pr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Xe(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function of(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Pl));
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (of(t, l, e), t = t.sibling; t !== null; )
        of(t, l, e), t = t.sibling;
  }
  function Iu(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Iu(t, l, e), t = t.sibling; t !== null; )
        Iu(t, l, e), t = t.sibling;
  }
  function td(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      ul(l, a, e), l[ll] = t, l[hl] = e;
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  var se = !1, Ft = !1, rf = !1, ld = typeof WeakSet == "function" ? WeakSet : Set, tl = null;
  function Mh(t, l) {
    if (t = t.containerInfo, Rf = pi, t = mo(t), ac(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, f = -1, r = -1, S = 0, z = 0, D = t, p = null;
            l: for (; ; ) {
              for (var _; D !== e || n !== 0 && D.nodeType !== 3 || (f = i + n), D !== u || a !== 0 && D.nodeType !== 3 || (r = i + a), D.nodeType === 3 && (i += D.nodeValue.length), (_ = D.firstChild) !== null; )
                p = D, D = _;
              for (; ; ) {
                if (D === t) break l;
                if (p === e && ++S === n && (f = i), p === u && ++z === a && (r = i), (_ = D.nextSibling) !== null) break;
                D = p, p = D.parentNode;
              }
              D = _;
            }
            e = f === -1 || r === -1 ? null : { start: f, end: r };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Uf = { focusedElem: t, selectionRange: e }, pi = !1, tl = l; tl !== null; )
      if (l = tl, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, tl = t;
      else
        for (; tl !== null; ) {
          switch (l = tl, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  n = t[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var X = ma(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    X,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch ($) {
                  Tt(
                    e,
                    e.return,
                    $
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  qf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      qf(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, tl = t;
            break;
          }
          tl = l.return;
        }
  }
  function ed(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        re(t, e), a & 4 && Yn(5, e);
        break;
      case 1:
        if (re(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Tt(e, e.return, i);
            }
          else {
            var n = ma(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              Tt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Fr(e), a & 512 && Gn(e, e.return);
        break;
      case 3:
        if (re(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Xo(t, l);
          } catch (i) {
            Tt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && td(e);
      case 26:
      case 5:
        re(t, e), l === null && a & 4 && Ir(e), a & 512 && Gn(e, e.return);
        break;
      case 12:
        re(t, e);
        break;
      case 31:
        re(t, e), a & 4 && ud(t, e);
        break;
      case 13:
        re(t, e), a & 4 && id(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Xh.bind(
          null,
          e
        ), i0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || se, !a) {
          l = l !== null && l.memoizedState !== null || Ft, n = se;
          var u = Ft;
          se = a, (Ft = l) && !u ? de(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : re(t, e), se = n, Ft = u;
        }
        break;
      case 30:
        break;
      default:
        re(t, e);
    }
  }
  function ad(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, ad(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Xi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, gl = !1;
  function oe(t, l, e) {
    for (e = e.child; e !== null; )
      nd(t, l, e), e = e.sibling;
  }
  function nd(t, l, e) {
    if (Tl && typeof Tl.onCommitFiberUnmount == "function")
      try {
        Tl.onCommitFiberUnmount(kl, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Ft || $l(e, l), oe(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Ft || $l(e, l);
        var a = qt, n = gl;
        Xe(e.type) && (qt = e.stateNode, gl = !1), oe(
          t,
          l,
          e
        ), $n(e.stateNode), qt = a, gl = n;
        break;
      case 5:
        Ft || $l(e, l);
      case 6:
        if (a = qt, n = gl, qt = null, oe(
          t,
          l,
          e
        ), qt = a, gl = n, qt !== null)
          if (gl)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode);
            } catch (u) {
              Tt(
                e,
                l,
                u
              );
            }
          else
            try {
              qt.removeChild(e.stateNode);
            } catch (u) {
              Tt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        qt !== null && (gl ? (t = qt, Fd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), an(t)) : Fd(qt, e.stateNode));
        break;
      case 4:
        a = qt, n = gl, qt = e.stateNode.containerInfo, gl = !0, oe(
          t,
          l,
          e
        ), qt = a, gl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, l), Ft || Ue(4, e, l), oe(
          t,
          l,
          e
        );
        break;
      case 1:
        Ft || ($l(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && kr(
          e,
          l,
          a
        )), oe(
          t,
          l,
          e
        );
        break;
      case 21:
        oe(
          t,
          l,
          e
        );
        break;
      case 22:
        Ft = (a = Ft) || e.memoizedState !== null, oe(
          t,
          l,
          e
        ), Ft = a;
        break;
      default:
        oe(
          t,
          l,
          e
        );
    }
  }
  function ud(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        an(t);
      } catch (e) {
        Tt(l, l.return, e);
      }
    }
  }
  function id(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        an(t);
      } catch (e) {
        Tt(l, l.return, e);
      }
  }
  function Rh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new ld()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new ld()), l;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Pu(t, l) {
    var e = Rh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Qh.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Sl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, i = l, f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Xe(f.type)) {
                qt = f.stateNode, gl = !1;
                break t;
              }
              break;
            case 5:
              qt = f.stateNode, gl = !1;
              break t;
            case 3:
            case 4:
              qt = f.stateNode.containerInfo, gl = !0;
              break t;
          }
          f = f.return;
        }
        if (qt === null) throw Error(o(160));
        nd(u, i, n), qt = null, gl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        cd(l, t), l = l.sibling;
  }
  var Zl = null;
  function cd(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Sl(l, t), pl(t), a & 4 && (Ue(3, t, t.return), Yn(3, t), Ue(5, t, t.return));
        break;
      case 1:
        Sl(l, t), pl(t), a & 512 && (Ft || e === null || $l(e, e.return)), a & 64 && se && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Zl;
        if (Sl(l, t), pl(t), a & 512 && (Ft || e === null || $l(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[dn] || u[ll] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), ul(u, a, e), u[ll] = t, Pt(u), a = u;
                      break t;
                    case "link":
                      var i = cm(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), ul(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = cm(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), ul(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[ll] = t, Pt(u), a = u;
                }
                t.stateNode = a;
              } else
                fm(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = im(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? fm(
              n,
              t.type,
              t.stateNode
            ) : im(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && ff(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        Sl(l, t), pl(t), a & 512 && (Ft || e === null || $l(e, e.return)), e !== null && a & 4 && ff(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (Sl(l, t), pl(t), a & 512 && (Ft || e === null || $l(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            xa(n, "");
          } catch (X) {
            Tt(t, t.return, X);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, ff(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (rf = !0);
        break;
      case 6:
        if (Sl(l, t), pl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (X) {
            Tt(t, t.return, X);
          }
        }
        break;
      case 3:
        if (hi = null, n = Zl, Zl = mi(l.containerInfo), Sl(l, t), Zl = n, pl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            an(l.containerInfo);
          } catch (X) {
            Tt(t, t.return, X);
          }
        rf && (rf = !1, fd(t));
        break;
      case 4:
        a = Zl, Zl = mi(
          t.stateNode.containerInfo
        ), Sl(l, t), pl(t), Zl = a;
        break;
      case 12:
        Sl(l, t), pl(t);
        break;
      case 31:
        Sl(l, t), pl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Pu(t, a)));
        break;
      case 13:
        Sl(l, t), pl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (li = Rt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Pu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var r = e !== null && e.memoizedState !== null, S = se, z = Ft;
        if (se = S || n, Ft = z || r, Sl(l, t), Ft = z, se = S, pl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || r || se || Ft || va(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                r = e = l;
                try {
                  if (u = r.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = r.stateNode;
                    var D = r.memoizedProps.style, p = D != null && D.hasOwnProperty("display") ? D.display : null;
                    f.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
                  }
                } catch (X) {
                  Tt(r, r.return, X);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                r = l;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (X) {
                  Tt(r, r.return, X);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                r = l;
                try {
                  var _ = r.stateNode;
                  n ? kd(_, !0) : kd(r.stateNode, !1);
                } catch (X) {
                  Tt(r, r.return, X);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Pu(t, e))));
        break;
      case 19:
        Sl(l, t), pl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Pu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Sl(l, t), pl(t);
    }
  }
  function pl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Pr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = sf(t);
            Iu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (xa(i, ""), e.flags &= -33);
            var f = sf(t);
            Iu(t, f, i);
            break;
          case 3:
          case 4:
            var r = e.stateNode.containerInfo, S = sf(t);
            of(
              t,
              S,
              r
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (z) {
        Tt(t, t.return, z);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function fd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        fd(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function re(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        ed(t, l.alternate, l), l = l.sibling;
  }
  function va(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ue(4, l, l.return), va(l);
          break;
        case 1:
          $l(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && kr(
            l,
            l.return,
            e
          ), va(l);
          break;
        case 27:
          $n(l.stateNode);
        case 26:
        case 5:
          $l(l, l.return), va(l);
          break;
        case 22:
          l.memoizedState === null && va(l);
          break;
        case 30:
          va(l);
          break;
        default:
          va(l);
      }
      t = t.sibling;
    }
  }
  function de(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          de(
            n,
            u,
            e
          ), Yn(4, u);
          break;
        case 1:
          if (de(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (S) {
              Tt(a, a.return, S);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Go(r[n], f);
            } catch (S) {
              Tt(a, a.return, S);
            }
          }
          e && i & 64 && Fr(u), Gn(u, u.return);
          break;
        case 27:
          td(u);
        case 26:
        case 5:
          de(
            n,
            u,
            e
          ), e && a === null && i & 4 && Ir(u), Gn(u, u.return);
          break;
        case 12:
          de(
            n,
            u,
            e
          );
          break;
        case 31:
          de(
            n,
            u,
            e
          ), e && i & 4 && ud(n, u);
          break;
        case 13:
          de(
            n,
            u,
            e
          ), e && i & 4 && id(n, u);
          break;
        case 22:
          u.memoizedState === null && de(
            n,
            u,
            e
          ), Gn(u, u.return);
          break;
        case 30:
          break;
        default:
          de(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function df(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && zn(e));
  }
  function mf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && zn(t));
  }
  function Kl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        sd(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function sd(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Kl(
          t,
          l,
          e,
          a
        ), n & 2048 && Yn(9, l);
        break;
      case 1:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Kl(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && zn(t)));
        break;
      case 12:
        if (n & 2048) {
          Kl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, i = u.id, f = u.onPostCommit;
            typeof f == "function" && f(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (r) {
            Tt(l, l.return, r);
          }
        } else
          Kl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : Xn(t, l) : u._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, Ja(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && df(i, l);
        break;
      case 24:
        Kl(
          t,
          l,
          e,
          a
        ), n & 2048 && mf(l.alternate, l);
        break;
      default:
        Kl(
          t,
          l,
          e,
          a
        );
    }
  }
  function Ja(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, f = e, r = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ja(
            u,
            i,
            f,
            r,
            n
          ), Yn(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? Ja(
            u,
            i,
            f,
            r,
            n
          ) : Xn(
            u,
            i
          ) : (z._visibility |= 2, Ja(
            u,
            i,
            f,
            r,
            n
          )), n && S & 2048 && df(
            i.alternate,
            i
          );
          break;
        case 24:
          Ja(
            u,
            i,
            f,
            r,
            n
          ), n && S & 2048 && mf(i.alternate, i);
          break;
        default:
          Ja(
            u,
            i,
            f,
            r,
            n
          );
      }
      l = l.sibling;
    }
  }
  function Xn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            Xn(e, a), n & 2048 && df(
              a.alternate,
              a
            );
            break;
          case 24:
            Xn(e, a), n & 2048 && mf(a.alternate, a);
            break;
          default:
            Xn(e, a);
        }
        l = l.sibling;
      }
  }
  var Qn = 8192;
  function wa(t, l, e) {
    if (t.subtreeFlags & Qn)
      for (t = t.child; t !== null; )
        od(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function od(t, l, e) {
    switch (t.tag) {
      case 26:
        wa(
          t,
          l,
          e
        ), t.flags & Qn && t.memoizedState !== null && S0(
          e,
          Zl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        wa(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Zl;
        Zl = mi(t.stateNode.containerInfo), wa(
          t,
          l,
          e
        ), Zl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Qn, Qn = 16777216, wa(
          t,
          l,
          e
        ), Qn = a) : wa(
          t,
          l,
          e
        ));
        break;
      default:
        wa(
          t,
          l,
          e
        );
    }
  }
  function rd(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Ln(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          tl = a, md(
            a,
            t
          );
        }
      rd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        dd(t), t = t.sibling;
  }
  function dd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ln(t), t.flags & 2048 && Ue(9, t, t.return);
        break;
      case 3:
        Ln(t);
        break;
      case 12:
        Ln(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, ti(t)) : Ln(t);
        break;
      default:
        Ln(t);
    }
  }
  function ti(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          tl = a, md(
            a,
            t
          );
        }
      rd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, l, l.return), ti(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, ti(l));
          break;
        default:
          ti(l);
      }
      t = t.sibling;
    }
  }
  function md(t, l) {
    for (; tl !== null; ) {
      var e = tl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          zn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, tl = a;
      else
        t: for (e = t; tl !== null; ) {
          a = tl;
          var n = a.sibling, u = a.return;
          if (ad(a), a === e) {
            tl = null;
            break t;
          }
          if (n !== null) {
            n.return = u, tl = n;
            break t;
          }
          tl = u;
        }
    }
  }
  var Uh = {
    getCacheForType: function(t) {
      var l = al(wt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return al(wt).controller.signal;
    }
  }, Ch = typeof WeakMap == "function" ? WeakMap : Map, pt = 0, jt = null, ft = null, ot = 0, Et = 0, Ol = null, Ce = !1, $a = !1, vf = !1, me = 0, Qt = 0, He = 0, ha = 0, hf = 0, Dl = 0, Wa = 0, Vn = null, bl = null, yf = !1, li = 0, vd = 0, ei = 1 / 0, ai = null, qe = null, kt = 0, Be = null, Fa = null, ve = 0, gf = 0, Sf = null, hd = null, Zn = 0, pf = null;
  function Ml() {
    return (pt & 2) !== 0 && ot !== 0 ? ot & -ot : T.T !== null ? zf() : Ds();
  }
  function yd() {
    if (Dl === 0)
      if ((ot & 536870912) === 0 || mt) {
        var t = ru;
        ru <<= 1, (ru & 3932160) === 0 && (ru = 262144), Dl = t;
      } else Dl = 536870912;
    return t = Al.current, t !== null && (t.flags |= 32), Dl;
  }
  function _l(t, l, e) {
    (t === jt && (Et === 2 || Et === 9) || t.cancelPendingCommit !== null) && (ka(t, 0), Ye(
      t,
      ot,
      Dl,
      !1
    )), rn(t, e), ((pt & 2) === 0 || t !== jt) && (t === jt && ((pt & 2) === 0 && (ha |= e), Qt === 4 && Ye(
      t,
      ot,
      Dl,
      !1
    )), Wl(t));
  }
  function gd(t, l, e) {
    if ((pt & 6) !== 0) throw Error(o(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || on(t, l), n = a ? Bh(t, l) : _f(t, l, !0), u = a;
    do {
      if (n === 0) {
        $a && !a && Ye(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Hh(e)) {
          n = _f(t, l, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var f = t;
              n = Vn;
              var r = f.current.memoizedState.isDehydrated;
              if (r && (ka(f, i).flags |= 256), i = _f(
                f,
                i,
                !1
              ), i !== 2) {
                if (vf && !r) {
                  f.errorRecoveryDisabledLanes |= u, ha |= u, n = 4;
                  break t;
                }
                u = bl, bl = n, u !== null && (bl === null ? bl = u : bl.push.apply(
                  bl,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          ka(t, 0), Ye(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Ye(
                a,
                l,
                Dl,
                !Ce
              );
              break t;
            case 2:
              bl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((l & 62914560) === l && (n = li + 300 - Rt(), 10 < n)) {
            if (Ye(
              a,
              l,
              Dl,
              !Ce
            ), mu(a, 0, !0) !== 0) break t;
            ve = l, a.timeoutHandle = $d(
              Sd.bind(
                null,
                a,
                e,
                bl,
                ai,
                yf,
                l,
                Dl,
                ha,
                Wa,
                Ce,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          Sd(
            a,
            e,
            bl,
            ai,
            yf,
            l,
            Dl,
            ha,
            Wa,
            Ce,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Wl(t);
  }
  function Sd(t, l, e, a, n, u, i, f, r, S, z, D, p, _) {
    if (t.timeoutHandle = -1, D = l.subtreeFlags, D & 8192 || (D & 16785408) === 16785408) {
      D = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pl
      }, od(
        l,
        u,
        D
      );
      var X = (u & 62914560) === u ? li - Rt() : (u & 4194048) === u ? vd - Rt() : 0;
      if (X = p0(
        D,
        X
      ), X !== null) {
        ve = u, t.cancelPendingCommit = X(
          xd.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            f,
            r,
            z,
            D,
            null,
            p,
            _
          )
        ), Ye(t, u, i, !S);
        return;
      }
    }
    xd(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      f,
      r
    );
  }
  function Hh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!zl(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Ye(t, l, e, a) {
    l &= ~hf, l &= ~ha, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - Nl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && As(t, e, l);
  }
  function ni() {
    return (pt & 6) === 0 ? (Kn(0), !1) : !0;
  }
  function bf() {
    if (ft !== null) {
      if (Et === 0)
        var t = ft.return;
      else
        t = ft, ae = ia = null, Hc(t), Qa = null, An = 0, t = ft;
      for (; t !== null; )
        Wr(t.alternate, t), t = t.return;
      ft = null;
    }
  }
  function ka(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, l0(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ve = 0, bf(), jt = t, ft = e = le(t.current, null), ot = l, Et = 0, Ol = null, Ce = !1, $a = on(t, l), vf = !1, Wa = Dl = hf = ha = He = Qt = 0, bl = Vn = null, yf = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - Nl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return me = l, zu(), e;
  }
  function pd(t, l) {
    et = null, T.H = Hn, l === Xa || l === Uu ? (l = Ho(), Et = 3) : l === Tc ? (l = Ho(), Et = 4) : Et = l === kc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Ol = l, ft === null && (Qt = 1, wu(
      t,
      ql(l, t.current)
    ));
  }
  function bd() {
    var t = Al.current;
    return t === null ? !0 : (ot & 4194048) === ot ? Xl === null : (ot & 62914560) === ot || (ot & 536870912) !== 0 ? t === Xl : !1;
  }
  function _d() {
    var t = T.H;
    return T.H = Hn, t === null ? Hn : t;
  }
  function Ed() {
    var t = T.A;
    return T.A = Uh, t;
  }
  function ui() {
    Qt = 4, Ce || (ot & 4194048) !== ot && Al.current !== null || ($a = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || jt === null || Ye(
      jt,
      ot,
      Dl,
      !1
    );
  }
  function _f(t, l, e) {
    var a = pt;
    pt |= 2;
    var n = _d(), u = Ed();
    (jt !== t || ot !== l) && (ai = null, ka(t, l)), l = !1;
    var i = Qt;
    t: do
      try {
        if (Et !== 0 && ft !== null) {
          var f = ft, r = Ol;
          switch (Et) {
            case 8:
              bf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Al.current === null && (l = !0);
              var S = Et;
              if (Et = 0, Ol = null, Ia(t, f, r, S), e && $a) {
                i = 0;
                break t;
              }
              break;
            default:
              S = Et, Et = 0, Ol = null, Ia(t, f, r, S);
          }
        }
        qh(), i = Qt;
        break;
      } catch (z) {
        pd(t, z);
      }
    while (!0);
    return l && t.shellSuspendCounter++, ae = ia = null, pt = a, T.H = n, T.A = u, ft === null && (jt = null, ot = 0, zu()), i;
  }
  function qh() {
    for (; ft !== null; ) Td(ft);
  }
  function Bh(t, l) {
    var e = pt;
    pt |= 2;
    var a = _d(), n = Ed();
    jt !== t || ot !== l ? (ai = null, ei = Rt() + 500, ka(t, l)) : $a = on(
      t,
      l
    );
    t: do
      try {
        if (Et !== 0 && ft !== null) {
          l = ft;
          var u = Ol;
          l: switch (Et) {
            case 1:
              Et = 0, Ol = null, Ia(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (Uo(u)) {
                Et = 0, Ol = null, Nd(l);
                break;
              }
              l = function() {
                Et !== 2 && Et !== 9 || jt !== t || (Et = 7), Wl(t);
              }, u.then(l, l);
              break t;
            case 3:
              Et = 7;
              break t;
            case 4:
              Et = 5;
              break t;
            case 7:
              Uo(u) ? (Et = 0, Ol = null, Nd(l)) : (Et = 0, Ol = null, Ia(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (ft.tag) {
                case 26:
                  i = ft.memoizedState;
                case 5:
                case 27:
                  var f = ft;
                  if (i ? sm(i) : f.stateNode.complete) {
                    Et = 0, Ol = null;
                    var r = f.sibling;
                    if (r !== null) ft = r;
                    else {
                      var S = f.return;
                      S !== null ? (ft = S, ii(S)) : ft = null;
                    }
                    break l;
                  }
              }
              Et = 0, Ol = null, Ia(t, l, u, 5);
              break;
            case 6:
              Et = 0, Ol = null, Ia(t, l, u, 6);
              break;
            case 8:
              bf(), Qt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        Yh();
        break;
      } catch (z) {
        pd(t, z);
      }
    while (!0);
    return ae = ia = null, T.H = a, T.A = n, pt = e, ft !== null ? 0 : (jt = null, ot = 0, zu(), Qt);
  }
  function Yh() {
    for (; ft !== null && !ml(); )
      Td(ft);
  }
  function Td(t) {
    var l = wr(t.alternate, t, me);
    t.memoizedProps = t.pendingProps, l === null ? ii(t) : ft = l;
  }
  function Nd(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Qr(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          ot
        );
        break;
      case 11:
        l = Qr(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          ot
        );
        break;
      case 5:
        Hc(l);
      default:
        Wr(e, l), l = ft = Eo(l, me), l = wr(e, l, me);
    }
    t.memoizedProps = t.pendingProps, l === null ? ii(t) : ft = l;
  }
  function Ia(t, l, e, a) {
    ae = ia = null, Hc(l), Qa = null, An = 0;
    var n = l.return;
    try {
      if (xh(
        t,
        n,
        l,
        e,
        ot
      )) {
        Qt = 1, wu(
          t,
          ql(e, t.current)
        ), ft = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ft = n, u;
      Qt = 1, wu(
        t,
        ql(e, t.current)
      ), ft = null;
      return;
    }
    l.flags & 32768 ? (mt || a === 1 ? t = !0 : $a || (ot & 536870912) !== 0 ? t = !1 : (Ce = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Al.current, a !== null && a.tag === 13 && (a.flags |= 16384))), zd(l, t)) : ii(l);
  }
  function ii(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        zd(
          l,
          Ce
        );
        return;
      }
      t = l.return;
      var e = Oh(
        l.alternate,
        l,
        me
      );
      if (e !== null) {
        ft = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        ft = l;
        return;
      }
      ft = l = t;
    } while (l !== null);
    Qt === 0 && (Qt = 5);
  }
  function zd(t, l) {
    do {
      var e = Dh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ft = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        ft = t;
        return;
      }
      ft = t = e;
    } while (t !== null);
    Qt = 6, ft = null;
  }
  function xd(t, l, e, a, n, u, i, f, r) {
    t.cancelPendingCommit = null;
    do
      ci();
    while (kt !== 0);
    if ((pt & 6) !== 0) throw Error(o(327));
    if (l !== null) {
      if (l === t.current) throw Error(o(177));
      if (u = l.lanes | l.childLanes, u |= fc, gv(
        t,
        e,
        u,
        i,
        f,
        r
      ), t === jt && (ft = jt = null, ot = 0), Fa = l, Be = t, ve = e, gf = u, Sf = n, hd = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Lh(ke, function() {
        return Md(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = T.T, T.T = null, n = B.p, B.p = 2, i = pt, pt |= 4;
        try {
          Mh(t, l, e);
        } finally {
          pt = i, B.p = n, T.T = a;
        }
      }
      kt = 1, Ad(), jd(), Od();
    }
  }
  function Ad() {
    if (kt === 1) {
      kt = 0;
      var t = Be, l = Fa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = T.T, T.T = null;
        var a = B.p;
        B.p = 2;
        var n = pt;
        pt |= 4;
        try {
          cd(l, t);
          var u = Uf, i = mo(t.containerInfo), f = u.focusedElem, r = u.selectionRange;
          if (i !== f && f && f.ownerDocument && ro(
            f.ownerDocument.documentElement,
            f
          )) {
            if (r !== null && ac(f)) {
              var S = r.start, z = r.end;
              if (z === void 0 && (z = S), "selectionStart" in f)
                f.selectionStart = S, f.selectionEnd = Math.min(
                  z,
                  f.value.length
                );
              else {
                var D = f.ownerDocument || document, p = D && D.defaultView || window;
                if (p.getSelection) {
                  var _ = p.getSelection(), X = f.textContent.length, $ = Math.min(r.start, X), At = r.end === void 0 ? $ : Math.min(r.end, X);
                  !_.extend && $ > At && (i = At, At = $, $ = i);
                  var h = oo(
                    f,
                    $
                  ), m = oo(
                    f,
                    At
                  );
                  if (h && m && (_.rangeCount !== 1 || _.anchorNode !== h.node || _.anchorOffset !== h.offset || _.focusNode !== m.node || _.focusOffset !== m.offset)) {
                    var g = D.createRange();
                    g.setStart(h.node, h.offset), _.removeAllRanges(), $ > At ? (_.addRange(g), _.extend(m.node, m.offset)) : (g.setEnd(m.node, m.offset), _.addRange(g));
                  }
                }
              }
            }
            for (D = [], _ = f; _ = _.parentNode; )
              _.nodeType === 1 && D.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < D.length; f++) {
              var A = D[f];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          pi = !!Rf, Uf = Rf = null;
        } finally {
          pt = n, B.p = a, T.T = e;
        }
      }
      t.current = l, kt = 2;
    }
  }
  function jd() {
    if (kt === 2) {
      kt = 0;
      var t = Be, l = Fa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = T.T, T.T = null;
        var a = B.p;
        B.p = 2;
        var n = pt;
        pt |= 4;
        try {
          ed(t, l.alternate, l);
        } finally {
          pt = n, B.p = a, T.T = e;
        }
      }
      kt = 3;
    }
  }
  function Od() {
    if (kt === 4 || kt === 3) {
      kt = 0, Zt();
      var t = Be, l = Fa, e = ve, a = hd;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? kt = 5 : (kt = 0, Fa = Be = null, Dd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (qe = null), Yi(e), l = l.stateNode, Tl && typeof Tl.onCommitFiberRoot == "function")
        try {
          Tl.onCommitFiberRoot(
            kl,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = T.T, n = B.p, B.p = 2, T.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          T.T = l, B.p = n;
        }
      }
      (ve & 3) !== 0 && ci(), Wl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === pf ? Zn++ : (Zn = 0, pf = t) : Zn = 0, Kn(0);
    }
  }
  function Dd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, zn(l)));
  }
  function ci() {
    return Ad(), jd(), Od(), Md();
  }
  function Md() {
    if (kt !== 5) return !1;
    var t = Be, l = gf;
    gf = 0;
    var e = Yi(ve), a = T.T, n = B.p;
    try {
      B.p = 32 > e ? 32 : e, T.T = null, e = Sf, Sf = null;
      var u = Be, i = ve;
      if (kt = 0, Fa = Be = null, ve = 0, (pt & 6) !== 0) throw Error(o(331));
      var f = pt;
      if (pt |= 4, dd(u.current), sd(
        u,
        u.current,
        i,
        e
      ), pt = f, Kn(0, !1), Tl && typeof Tl.onPostCommitFiberRoot == "function")
        try {
          Tl.onPostCommitFiberRoot(kl, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = n, T.T = a, Dd(t, l);
    }
  }
  function Rd(t, l, e) {
    l = ql(e, l), l = Fc(t.stateNode, l, 2), t = De(t, l, 2), t !== null && (rn(t, 2), Wl(t));
  }
  function Tt(t, l, e) {
    if (t.tag === 3)
      Rd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Rd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            t = ql(e, t), e = Ur(2), a = De(l, e, 2), a !== null && (Cr(
              e,
              a,
              l,
              t
            ), rn(a, 2), Wl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Ef(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Ch();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (vf = !0, n.add(e), t = Gh.bind(null, t, l, e), l.then(t, t));
  }
  function Gh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, jt === t && (ot & e) === e && (Qt === 4 || Qt === 3 && (ot & 62914560) === ot && 300 > Rt() - li ? (pt & 2) === 0 && ka(t, 0) : hf |= e, Wa === ot && (Wa = 0)), Wl(t);
  }
  function Ud(t, l) {
    l === 0 && (l = xs()), t = aa(t, l), t !== null && (rn(t, l), Wl(t));
  }
  function Xh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Ud(t, e);
  }
  function Qh(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(l), Ud(t, e);
  }
  function Lh(t, l) {
    return Mt(t, l);
  }
  var fi = null, Pa = null, Tf = !1, si = !1, Nf = !1, Ge = 0;
  function Wl(t) {
    t !== Pa && t.next === null && (Pa === null ? fi = Pa = t : Pa = Pa.next = t), si = !0, Tf || (Tf = !0, Zh());
  }
  function Kn(t, l) {
    if (!Nf && si) {
      Nf = !0;
      do
        for (var e = !1, a = fi; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - Nl(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Bd(a, u));
          } else
            u = ot, u = mu(
              a,
              a === jt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || on(a, u) || (e = !0, Bd(a, u));
          a = a.next;
        }
      while (e);
      Nf = !1;
    }
  }
  function Vh() {
    Cd();
  }
  function Cd() {
    si = Tf = !1;
    var t = 0;
    Ge !== 0 && t0() && (t = Ge);
    for (var l = Rt(), e = null, a = fi; a !== null; ) {
      var n = a.next, u = Hd(a, l);
      u === 0 ? (a.next = null, e === null ? fi = n : e.next = n, n === null && (Pa = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (si = !0)), a = n;
    }
    kt !== 0 && kt !== 5 || Kn(t), Ge !== 0 && (Ge = 0);
  }
  function Hd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Nl(u), f = 1 << i, r = n[i];
      r === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = yv(f, l)) : r <= l && (t.expiredLanes |= f), u &= ~f;
    }
    if (l = jt, e = ot, e = mu(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (Et === 2 || Et === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && dl(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || on(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && dl(a), Yi(e)) {
        case 2:
        case 8:
          e = fn;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = Rl;
          break;
        default:
          e = ke;
      }
      return a = qd.bind(null, t), e = Mt(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && dl(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function qd(t, l) {
    if (kt !== 0 && kt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (ci() && t.callbackNode !== e)
      return null;
    var a = ot;
    return a = mu(
      t,
      t === jt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (gd(t, a, l), Hd(t, Rt()), t.callbackNode != null && t.callbackNode === e ? qd.bind(null, t) : null);
  }
  function Bd(t, l) {
    if (ci()) return null;
    gd(t, l, !0);
  }
  function Zh() {
    e0(function() {
      (pt & 6) !== 0 ? Mt(
        be,
        Vh
      ) : Cd();
    });
  }
  function zf() {
    if (Ge === 0) {
      var t = Ya;
      t === 0 && (t = ou, ou <<= 1, (ou & 261888) === 0 && (ou = 256)), Ge = t;
    }
    return Ge;
  }
  function Yd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : gu("" + t);
  }
  function Gd(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Kh(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Yd(
        (n[hl] || null).action
      ), i = a.submitter;
      i && (l = (l = i[hl] || null) ? Yd(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var f = new _u(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Ge !== 0) {
                  var r = i ? Gd(n, i) : new FormData(n);
                  Zc(
                    e,
                    {
                      pending: !0,
                      data: r,
                      method: n.method,
                      action: u
                    },
                    null,
                    r
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), r = i ? Gd(n, i) : new FormData(n), Zc(
                  e,
                  {
                    pending: !0,
                    data: r,
                    method: n.method,
                    action: u
                  },
                  u,
                  r
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var xf = 0; xf < cc.length; xf++) {
    var Af = cc[xf], Jh = Af.toLowerCase(), wh = Af[0].toUpperCase() + Af.slice(1);
    Vl(
      Jh,
      "on" + wh
    );
  }
  Vl(yo, "onAnimationEnd"), Vl(go, "onAnimationIteration"), Vl(So, "onAnimationStart"), Vl("dblclick", "onDoubleClick"), Vl("focusin", "onFocus"), Vl("focusout", "onBlur"), Vl(sh, "onTransitionRun"), Vl(oh, "onTransitionStart"), Vl(rh, "onTransitionCancel"), Vl(po, "onTransitionEnd"), Na("onMouseEnter", ["mouseout", "mouseover"]), Na("onMouseLeave", ["mouseout", "mouseover"]), Na("onPointerEnter", ["pointerout", "pointerover"]), Na("onPointerLeave", ["pointerout", "pointerover"]), Pe(
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
  var Jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), $h = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jn)
  );
  function Xd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], r = f.instance, S = f.currentTarget;
            if (f = f.listener, r !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (z) {
              Nu(z);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], r = f.instance, S = f.currentTarget, f = f.listener, r !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (z) {
              Nu(z);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function st(t, l) {
    var e = l[Gi];
    e === void 0 && (e = l[Gi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Qd(l, t, 2, !1), e.add(a));
  }
  function jf(t, l, e) {
    var a = 0;
    l && (a |= 4), Qd(
      e,
      t,
      a,
      l
    );
  }
  var oi = "_reactListening" + Math.random().toString(36).slice(2);
  function Of(t) {
    if (!t[oi]) {
      t[oi] = !0, Us.forEach(function(e) {
        e !== "selectionchange" && ($h.has(e) || jf(e, !1, t), jf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[oi] || (l[oi] = !0, jf("selectionchange", !1, l));
    }
  }
  function Qd(t, l, e, a) {
    switch (ym(l)) {
      case 2:
        var n = E0;
        break;
      case 8:
        n = T0;
        break;
      default:
        n = Zf;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !$i || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function Df(t, l, e, a, n) {
    var u = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var r = i.tag;
              if ((r === 3 || r === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = _a(f), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Ks(function() {
      var S = u, z = Ji(e), D = [];
      t: {
        var p = bo.get(t);
        if (p !== void 0) {
          var _ = _u, X = t;
          switch (t) {
            case "keypress":
              if (pu(e) === 0) break t;
            case "keydown":
            case "keyup":
              _ = Qv;
              break;
            case "focusin":
              X = "focus", _ = Ii;
              break;
            case "focusout":
              X = "blur", _ = Ii;
              break;
            case "beforeblur":
            case "afterblur":
              _ = Ii;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              _ = $s;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = Ov;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Zv;
              break;
            case yo:
            case go:
            case So:
              _ = Rv;
              break;
            case po:
              _ = Jv;
              break;
            case "scroll":
            case "scrollend":
              _ = Av;
              break;
            case "wheel":
              _ = $v;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = Cv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = Fs;
              break;
            case "toggle":
            case "beforetoggle":
              _ = Fv;
          }
          var $ = (l & 4) !== 0, At = !$ && (t === "scroll" || t === "scrollend"), h = $ ? p !== null ? p + "Capture" : null : p;
          $ = [];
          for (var m = S, g; m !== null; ) {
            var A = m;
            if (g = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || g === null || h === null || (A = vn(m, h), A != null && $.push(
              wn(m, A, g)
            )), At) break;
            m = m.return;
          }
          0 < $.length && (p = new _(
            p,
            X,
            null,
            e,
            z
          ), D.push({ event: p, listeners: $ }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (p = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", p && e !== Ki && (X = e.relatedTarget || e.fromElement) && (_a(X) || X[ba]))
            break t;
          if ((_ || p) && (p = z.window === z ? z : (p = z.ownerDocument) ? p.defaultView || p.parentWindow : window, _ ? (X = e.relatedTarget || e.toElement, _ = S, X = X ? _a(X) : null, X !== null && (At = M(X), $ = X.tag, X !== At || $ !== 5 && $ !== 27 && $ !== 6) && (X = null)) : (_ = null, X = S), _ !== X)) {
            if ($ = $s, A = "onMouseLeave", h = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && ($ = Fs, A = "onPointerLeave", h = "onPointerEnter", m = "pointer"), At = _ == null ? p : mn(_), g = X == null ? p : mn(X), p = new $(
              A,
              m + "leave",
              _,
              e,
              z
            ), p.target = At, p.relatedTarget = g, A = null, _a(z) === S && ($ = new $(
              h,
              m + "enter",
              X,
              e,
              z
            ), $.target = g, $.relatedTarget = At, A = $), At = A, _ && X)
              l: {
                for ($ = Wh, h = _, m = X, g = 0, A = h; A; A = $(A))
                  g++;
                A = 0;
                for (var K = m; K; K = $(K))
                  A++;
                for (; 0 < g - A; )
                  h = $(h), g--;
                for (; 0 < A - g; )
                  m = $(m), A--;
                for (; g--; ) {
                  if (h === m || m !== null && h === m.alternate) {
                    $ = h;
                    break l;
                  }
                  h = $(h), m = $(m);
                }
                $ = null;
              }
            else $ = null;
            _ !== null && Ld(
              D,
              p,
              _,
              $,
              !1
            ), X !== null && At !== null && Ld(
              D,
              At,
              X,
              $,
              !0
            );
          }
        }
        t: {
          if (p = S ? mn(S) : window, _ = p.nodeName && p.nodeName.toLowerCase(), _ === "select" || _ === "input" && p.type === "file")
            var yt = no;
          else if (eo(p))
            if (uo)
              yt = ih;
            else {
              yt = nh;
              var L = ah;
            }
          else
            _ = p.nodeName, !_ || _.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? S && Zi(S.elementType) && (yt = no) : yt = uh;
          if (yt && (yt = yt(t, S))) {
            ao(
              D,
              yt,
              e,
              z
            );
            break t;
          }
          L && L(t, p, S), t === "focusout" && S && p.type === "number" && S.memoizedProps.value != null && Vi(p, "number", p.value);
        }
        switch (L = S ? mn(S) : window, t) {
          case "focusin":
            (eo(L) || L.contentEditable === "true") && (Da = L, nc = S, En = null);
            break;
          case "focusout":
            En = nc = Da = null;
            break;
          case "mousedown":
            uc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            uc = !1, vo(D, e, z);
            break;
          case "selectionchange":
            if (fh) break;
          case "keydown":
          case "keyup":
            vo(D, e, z);
        }
        var at;
        if (tc)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          Oa ? to(t, e) && (rt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (rt = "onCompositionStart");
        rt && (ks && e.locale !== "ko" && (Oa || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && Oa && (at = Js()) : (Te = z, Wi = "value" in Te ? Te.value : Te.textContent, Oa = !0)), L = ri(S, rt), 0 < L.length && (rt = new Ws(
          rt,
          t,
          null,
          e,
          z
        ), D.push({ event: rt, listeners: L }), at ? rt.data = at : (at = lo(e), at !== null && (rt.data = at)))), (at = Iv ? Pv(t, e) : th(t, e)) && (rt = ri(S, "onBeforeInput"), 0 < rt.length && (L = new Ws(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          z
        ), D.push({
          event: L,
          listeners: rt
        }), L.data = at)), Kh(
          D,
          t,
          S,
          e,
          z
        );
      }
      Xd(D, l);
    });
  }
  function wn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function ri(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = vn(t, e), n != null && a.unshift(
        wn(t, n, u)
      ), n = vn(t, l), n != null && a.push(
        wn(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Wh(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ld(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var f = e, r = f.alternate, S = f.stateNode;
      if (f = f.tag, r !== null && r === a) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (r = S, n ? (S = vn(e, u), S != null && i.unshift(
        wn(e, S, r)
      )) : n || (S = vn(e, u), S != null && i.push(
        wn(e, S, r)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Fh = /\r\n?/g, kh = /\u0000|\uFFFD/g;
  function Vd(t) {
    return (typeof t == "string" ? t : "" + t).replace(Fh, `
`).replace(kh, "");
  }
  function Zd(t, l) {
    return l = Vd(l), Vd(t) === l;
  }
  function xt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || xa(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && xa(t, "" + a);
        break;
      case "className":
        hu(t, "class", a);
        break;
      case "tabIndex":
        hu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hu(t, e, a);
        break;
      case "style":
        Vs(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          hu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = gu("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && xt(t, l, "name", n.name, n, null), xt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), xt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), xt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (xt(t, l, "encType", n.encType, n, null), xt(t, l, "method", n.method, n, null), xt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = gu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Pl);
        break;
      case "onScroll":
        a != null && st("scroll", t);
        break;
      case "onScrollEnd":
        a != null && st("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
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
          t.removeAttribute("xlink:href");
          break;
        }
        e = gu("" + a), t.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        st("beforetoggle", t), st("toggle", t), vu(t, "popover", a);
        break;
      case "xlinkActuate":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Il(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Il(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Il(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Il(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        vu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = zv.get(e) || e, vu(t, e, a));
    }
  }
  function Mf(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Vs(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? xa(t, a) : (typeof a == "number" || typeof a == "bigint") && xa(t, "" + a);
        break;
      case "onScroll":
        a != null && st("scroll", t);
        break;
      case "onScrollEnd":
        a != null && st("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Pl);
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
        if (!Cs.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[hl] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : vu(t, e, a);
          }
    }
  }
  function ul(t, l, e) {
    switch (l) {
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
        st("error", t), st("load", t);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, l));
                default:
                  xt(t, l, u, i, e, null);
              }
          }
        n && xt(t, l, "srcSet", e.srcSet, e, null), a && xt(t, l, "src", e.src, e, null);
        return;
      case "input":
        st("invalid", t);
        var f = u = i = n = null, r = null, S = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var z = e[a];
            if (z != null)
              switch (a) {
                case "name":
                  n = z;
                  break;
                case "type":
                  i = z;
                  break;
                case "checked":
                  r = z;
                  break;
                case "defaultChecked":
                  S = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  f = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(o(137, l));
                  break;
                default:
                  xt(t, l, a, z, e, null);
              }
          }
        Gs(
          t,
          u,
          f,
          r,
          S,
          i,
          n,
          !1
        );
        return;
      case "select":
        st("invalid", t), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (f = e[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                xt(t, l, n, f, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? za(t, !!a, l, !1) : e != null && za(t, !!a, e, !0);
        return;
      case "textarea":
        st("invalid", t), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (f = e[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(o(91));
                break;
              default:
                xt(t, l, i, f, e, null);
            }
        Qs(t, a, n, u);
        return;
      case "option":
        for (r in e)
          if (e.hasOwnProperty(r) && (a = e[r], a != null))
            switch (r) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                xt(t, l, r, a, e, null);
            }
        return;
      case "dialog":
        st("beforetoggle", t), st("toggle", t), st("cancel", t), st("close", t);
        break;
      case "iframe":
      case "object":
        st("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Jn.length; a++)
          st(Jn[a], t);
        break;
      case "image":
        st("error", t), st("load", t);
        break;
      case "details":
        st("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        st("error", t), st("load", t);
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
        for (S in e)
          if (e.hasOwnProperty(S) && (a = e[S], a != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, l));
              default:
                xt(t, l, S, a, e, null);
            }
        return;
      default:
        if (Zi(l)) {
          for (z in e)
            e.hasOwnProperty(z) && (a = e[z], a !== void 0 && Mf(
              t,
              l,
              z,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (f in e)
      e.hasOwnProperty(f) && (a = e[f], a != null && xt(t, l, f, a, e, null));
  }
  function Ih(t, l, e, a) {
    switch (l) {
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
        var n = null, u = null, i = null, f = null, r = null, S = null, z = null;
        for (_ in e) {
          var D = e[_];
          if (e.hasOwnProperty(_) && D != null)
            switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = D;
              default:
                a.hasOwnProperty(_) || xt(t, l, _, null, a, D);
            }
        }
        for (var p in a) {
          var _ = a[p];
          if (D = e[p], a.hasOwnProperty(p) && (_ != null || D != null))
            switch (p) {
              case "type":
                u = _;
                break;
              case "name":
                n = _;
                break;
              case "checked":
                S = _;
                break;
              case "defaultChecked":
                z = _;
                break;
              case "value":
                i = _;
                break;
              case "defaultValue":
                f = _;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, l));
                break;
              default:
                _ !== D && xt(
                  t,
                  l,
                  p,
                  _,
                  a,
                  D
                );
            }
        }
        Li(
          t,
          i,
          f,
          r,
          S,
          z,
          u,
          n
        );
        return;
      case "select":
        _ = i = f = p = null;
        for (u in e)
          if (r = e[u], e.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                _ = r;
              default:
                a.hasOwnProperty(u) || xt(
                  t,
                  l,
                  u,
                  null,
                  a,
                  r
                );
            }
        for (n in a)
          if (u = a[n], r = e[n], a.hasOwnProperty(n) && (u != null || r != null))
            switch (n) {
              case "value":
                p = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== r && xt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  r
                );
            }
        l = f, e = i, a = _, p != null ? za(t, !!e, p, !1) : !!a != !!e && (l != null ? za(t, !!e, l, !0) : za(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        _ = p = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(t, l, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                p = n;
                break;
              case "defaultValue":
                _ = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && xt(t, l, i, n, a, u);
            }
        Xs(t, p, _);
        return;
      case "option":
        for (var X in e)
          if (p = e[X], e.hasOwnProperty(X) && p != null && !a.hasOwnProperty(X))
            switch (X) {
              case "selected":
                t.selected = !1;
                break;
              default:
                xt(
                  t,
                  l,
                  X,
                  null,
                  a,
                  p
                );
            }
        for (r in a)
          if (p = a[r], _ = e[r], a.hasOwnProperty(r) && p !== _ && (p != null || _ != null))
            switch (r) {
              case "selected":
                t.selected = p && typeof p != "function" && typeof p != "symbol";
                break;
              default:
                xt(
                  t,
                  l,
                  r,
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
        for (var $ in e)
          p = e[$], e.hasOwnProperty($) && p != null && !a.hasOwnProperty($) && xt(t, l, $, null, a, p);
        for (S in a)
          if (p = a[S], _ = e[S], a.hasOwnProperty(S) && p !== _ && (p != null || _ != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(o(137, l));
                break;
              default:
                xt(
                  t,
                  l,
                  S,
                  p,
                  a,
                  _
                );
            }
        return;
      default:
        if (Zi(l)) {
          for (var At in e)
            p = e[At], e.hasOwnProperty(At) && p !== void 0 && !a.hasOwnProperty(At) && Mf(
              t,
              l,
              At,
              void 0,
              a,
              p
            );
          for (z in a)
            p = a[z], _ = e[z], !a.hasOwnProperty(z) || p === _ || p === void 0 && _ === void 0 || Mf(
              t,
              l,
              z,
              p,
              a,
              _
            );
          return;
        }
    }
    for (var h in e)
      p = e[h], e.hasOwnProperty(h) && p != null && !a.hasOwnProperty(h) && xt(t, l, h, null, a, p);
    for (D in a)
      p = a[D], _ = e[D], !a.hasOwnProperty(D) || p === _ || p == null && _ == null || xt(t, l, D, p, a, _);
  }
  function Kd(t) {
    switch (t) {
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
  function Ph() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Kd(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], S = r.startTime;
            if (S > f) break;
            var z = r.transferSize, D = r.initiatorType;
            z && Kd(D) && (r = r.responseEnd, i += z * (r < f ? 1 : (f - S) / (r - S)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Rf = null, Uf = null;
  function di(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Jd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function wd(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function Cf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Hf = null;
  function t0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Hf ? !1 : (Hf = t, !0) : (Hf = null, !1);
  }
  var $d = typeof setTimeout == "function" ? setTimeout : void 0, l0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Wd = typeof Promise == "function" ? Promise : void 0, e0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wd < "u" ? function(t) {
    return Wd.resolve(null).then(t).catch(a0);
  } : $d;
  function a0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Xe(t) {
    return t === "head";
  }
  function Fd(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), an(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          $n(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, $n(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[dn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && $n(t.ownerDocument.body);
      e = n;
    } while (e);
    an(l);
  }
  function kd(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function qf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qf(e), Xi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function n0(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[dn])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Ql(t.nextSibling), t === null) break;
    }
    return null;
  }
  function u0(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ql(t.nextSibling), t === null)) return null;
    return t;
  }
  function Id(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Ql(t.nextSibling), t === null)) return null;
    return t;
  }
  function Bf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Yf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function i0(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Ql(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var Gf = null;
  function Pd(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Ql(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function tm(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function lm(t, l, e) {
    switch (l = di(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function $n(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Xi(t);
  }
  var Ll = /* @__PURE__ */ new Map(), em = /* @__PURE__ */ new Set();
  function mi(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var he = B.d;
  B.d = {
    f: c0,
    r: f0,
    D: s0,
    C: o0,
    L: r0,
    m: d0,
    X: v0,
    S: m0,
    M: h0
  };
  function c0() {
    var t = he.f(), l = ni();
    return t || l;
  }
  function f0(t) {
    var l = Ea(t);
    l !== null && l.tag === 5 && l.type === "form" ? pr(l) : he.r(t);
  }
  var tn = typeof document > "u" ? null : document;
  function am(t, l, e) {
    var a = tn;
    if (a && typeof l == "string" && l) {
      var n = Cl(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), em.has(n) || (em.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), ul(l, "link", t), Pt(l), a.head.appendChild(l)));
    }
  }
  function s0(t) {
    he.D(t), am("dns-prefetch", t, null);
  }
  function o0(t, l) {
    he.C(t, l), am("preconnect", t, l);
  }
  function r0(t, l, e) {
    he.L(t, l, e);
    var a = tn;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + Cl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Cl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Cl(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Cl(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = ln(t);
          break;
        case "script":
          u = en(t);
      }
      Ll.has(u) || (t = R(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ll.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(Wn(u)) || l === "script" && a.querySelector(Fn(u)) || (l = a.createElement("link"), ul(l, "link", t), Pt(l), a.head.appendChild(l)));
    }
  }
  function d0(t, l) {
    he.m(t, l);
    var e = tn;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + Cl(a) + '"][href="' + Cl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = en(t);
      }
      if (!Ll.has(u) && (t = R({ rel: "modulepreload", href: t }, l), Ll.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Fn(u)))
              return;
        }
        a = e.createElement("link"), ul(a, "link", t), Pt(a), e.head.appendChild(a);
      }
    }
  }
  function m0(t, l, e) {
    he.S(t, l, e);
    var a = tn;
    if (a && t) {
      var n = Ta(a).hoistableStyles, u = ln(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Wn(u)
        ))
          f.loading = 5;
        else {
          t = R(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ll.get(u)) && Xf(t, e);
          var r = i = a.createElement("link");
          Pt(r), ul(r, "link", t), r._p = new Promise(function(S, z) {
            r.onload = S, r.onerror = z;
          }), r.addEventListener("load", function() {
            f.loading |= 1;
          }), r.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, vi(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: f
        }, n.set(u, i);
      }
    }
  }
  function v0(t, l) {
    he.X(t, l);
    var e = tn;
    if (e && t) {
      var a = Ta(e).hoistableScripts, n = en(t), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (t = R({ src: t, async: !0 }, l), (l = Ll.get(n)) && Qf(t, l), u = e.createElement("script"), Pt(u), ul(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function h0(t, l) {
    he.M(t, l);
    var e = tn;
    if (e && t) {
      var a = Ta(e).hoistableScripts, n = en(t), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (t = R({ src: t, async: !0, type: "module" }, l), (l = Ll.get(n)) && Qf(t, l), u = e.createElement("script"), Pt(u), ul(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function nm(t, l, e, a) {
    var n = (n = lt.current) ? mi(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = ln(e.href), e = Ta(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = ln(e.href);
          var u = Ta(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Wn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ll.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ll.set(t, e), u || y0(
            n,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = en(e), e = Ta(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ln(t) {
    return 'href="' + Cl(t) + '"';
  }
  function Wn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function um(t) {
    return R({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function y0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), ul(l, "link", e), Pt(l), t.head.appendChild(l));
  }
  function en(t) {
    return '[src="' + Cl(t) + '"]';
  }
  function Fn(t) {
    return "script[async]" + t;
  }
  function im(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Cl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Pt(a), a;
          var n = R({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Pt(a), ul(a, "style", n), vi(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = ln(e.href);
          var u = t.querySelector(
            Wn(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Pt(u), u;
          a = um(e), (n = Ll.get(n)) && Xf(a, n), u = (t.ownerDocument || t).createElement("link"), Pt(u);
          var i = u;
          return i._p = new Promise(function(f, r) {
            i.onload = f, i.onerror = r;
          }), ul(u, "link", a), l.state.loading |= 4, vi(u, e.precedence, t), l.instance = u;
        case "script":
          return u = en(e.src), (n = t.querySelector(
            Fn(u)
          )) ? (l.instance = n, Pt(n), n) : (a = e, (n = Ll.get(u)) && (a = R({}, e), Qf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Pt(n), ul(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, vi(a, e.precedence, t));
    return l.instance;
  }
  function vi(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === l) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Xf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Qf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var hi = null;
  function cm(t, l, e) {
    if (hi === null) {
      var a = /* @__PURE__ */ new Map(), n = hi = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = hi, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[dn] || u[ll] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function fm(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function g0(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function sm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function S0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = ln(a.href), u = l.querySelector(
          Wn(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = yi.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Pt(u);
          return;
        }
        u = l.ownerDocument || l, a = um(a), (n = Ll.get(n)) && Xf(a, n), u = u.createElement("link"), Pt(u);
        var i = u;
        i._p = new Promise(function(f, r) {
          i.onload = f, i.onerror = r;
        }), ul(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = yi.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Lf = 0;
  function p0(t, l) {
    return t.stylesheets && t.count === 0 && Si(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Si(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Lf === 0 && (Lf = 62500 * Ph());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Si(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Lf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function yi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Si(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var gi = null;
  function Si(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, gi = /* @__PURE__ */ new Map(), l.forEach(b0, t), gi = null, yi.call(t));
  }
  function b0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = gi.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), gi.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = yi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var kn = {
    $$typeof: bt,
    Provider: null,
    Consumer: null,
    _currentValue: w,
    _currentValue2: w,
    _threadCount: 0
  };
  function _0(t, l, e, a, n, u, i, f, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qi(0), this.hiddenUpdates = qi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function om(t, l, e, a, n, u, i, f, r, S, z, D) {
    return t = new _0(
      t,
      l,
      e,
      i,
      r,
      S,
      z,
      D,
      f
    ), l = 1, u === !0 && (l |= 24), u = xl(3, null, null, l), t.current = u, u.stateNode = t, l = bc(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Nc(u), t;
  }
  function rm(t) {
    return t ? (t = Ua, t) : Ua;
  }
  function dm(t, l, e, a, n, u) {
    n = rm(n), a.context === null ? a.context = n : a.pendingContext = n, a = Oe(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = De(t, a, l), e !== null && (_l(e, t, l), On(e, t, l));
  }
  function mm(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Vf(t, l) {
    mm(t, l), (t = t.alternate) && mm(t, l);
  }
  function vm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = aa(t, 67108864);
      l !== null && _l(l, t, 67108864), Vf(t, 67108864);
    }
  }
  function hm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ml();
      l = Bi(l);
      var e = aa(t, l);
      e !== null && _l(e, t, l), Vf(t, l);
    }
  }
  var pi = !0;
  function E0(t, l, e, a) {
    var n = T.T;
    T.T = null;
    var u = B.p;
    try {
      B.p = 2, Zf(t, l, e, a);
    } finally {
      B.p = u, T.T = n;
    }
  }
  function T0(t, l, e, a) {
    var n = T.T;
    T.T = null;
    var u = B.p;
    try {
      B.p = 8, Zf(t, l, e, a);
    } finally {
      B.p = u, T.T = n;
    }
  }
  function Zf(t, l, e, a) {
    if (pi) {
      var n = Kf(a);
      if (n === null)
        Df(
          t,
          l,
          a,
          bi,
          e
        ), gm(t, a);
      else if (z0(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (gm(t, a), l & 4 && -1 < N0.indexOf(t)) {
        for (; n !== null; ) {
          var u = Ea(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Ie(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - Nl(i);
                      f.entanglements[1] |= r, i &= ~r;
                    }
                    Wl(u), (pt & 6) === 0 && (ei = Rt() + 500, Kn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = aa(u, 2), f !== null && _l(f, u, 2), ni(), Vf(u, 2);
            }
          if (u = Kf(a), u === null && Df(
            t,
            l,
            a,
            bi,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Df(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Kf(t) {
    return t = Ji(t), Jf(t);
  }
  var bi = null;
  function Jf(t) {
    if (bi = null, t = _a(t), t !== null) {
      var l = M(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = E(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = C(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return bi = t, null;
  }
  function ym(t) {
    switch (t) {
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
          case be:
            return 2;
          case fn:
            return 8;
          case ke:
          case vl:
            return 32;
          case Rl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var wf = !1, Qe = null, Le = null, Ve = null, In = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Ze = [], N0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function gm(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Qe = null;
        break;
      case "dragenter":
      case "dragleave":
        Le = null;
        break;
      case "mouseover":
      case "mouseout":
        Ve = null;
        break;
      case "pointerover":
      case "pointerout":
        In.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pn.delete(l.pointerId);
    }
  }
  function tu(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = Ea(l), l !== null && vm(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function z0(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return Qe = tu(
          Qe,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Le = tu(
          Le,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Ve = tu(
          Ve,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return In.set(
          u,
          tu(
            In.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Pn.set(
          u,
          tu(
            Pn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Sm(t) {
    var l = _a(t.target);
    if (l !== null) {
      var e = M(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = E(e), l !== null) {
            t.blockedOn = l, Ms(t.priority, function() {
              hm(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = C(e), l !== null) {
            t.blockedOn = l, Ms(t.priority, function() {
              hm(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function _i(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Kf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ki = a, e.target.dispatchEvent(a), Ki = null;
      } else
        return l = Ea(e), l !== null && vm(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function pm(t, l, e) {
    _i(t) && e.delete(l);
  }
  function x0() {
    wf = !1, Qe !== null && _i(Qe) && (Qe = null), Le !== null && _i(Le) && (Le = null), Ve !== null && _i(Ve) && (Ve = null), In.forEach(pm), Pn.forEach(pm);
  }
  function Ei(t, l) {
    t.blockedOn === l && (t.blockedOn = null, wf || (wf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      x0
    )));
  }
  var Ti = null;
  function bm(t) {
    Ti !== t && (Ti = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ti === t && (Ti = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (Jf(a || e) === null)
              continue;
            break;
          }
          var u = Ea(e);
          u !== null && (t.splice(l, 3), l -= 3, Zc(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function an(t) {
    function l(r) {
      return Ei(r, t);
    }
    Qe !== null && Ei(Qe, t), Le !== null && Ei(Le, t), Ve !== null && Ei(Ve, t), In.forEach(l), Pn.forEach(l);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      Sm(e), e.blockedOn === null && Ze.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[hl] || null;
        if (typeof u == "function")
          i || bm(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[hl] || null)
              f = i.formAction;
            else if (Jf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), bm(e);
        }
      }
  }
  function _m() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
      };
    }
  }
  function $f(t) {
    this._internalRoot = t;
  }
  Ni.prototype.render = $f.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(o(409));
    var e = l.current, a = Ml();
    dm(e, a, t, l, null, null);
  }, Ni.prototype.unmount = $f.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      dm(t.current, 2, null, t, null, null), ni(), l[ba] = null;
    }
  };
  function Ni(t) {
    this._internalRoot = t;
  }
  Ni.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Ds();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ze.length && l !== 0 && l < Ze[e].priority; e++) ;
      Ze.splice(e, 0, t), e === 0 && Sm(t);
    }
  };
  var Em = y.version;
  if (Em !== "19.2.6")
    throw Error(
      o(
        527,
        Em,
        "19.2.6"
      )
    );
  B.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = b(l), t = t !== null ? U(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var A0 = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var zi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zi.isDisabled && zi.supportsFiber)
      try {
        kl = zi.inject(
          A0
        ), Tl = zi;
      } catch {
      }
  }
  return eu.createRoot = function(t, l) {
    if (!N(t)) throw Error(o(299));
    var e = !1, a = "", n = Or, u = Dr, i = Mr;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = om(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      _m
    ), t[ba] = l.current, Of(t), new $f(l);
  }, eu.hydrateRoot = function(t, l, e) {
    if (!N(t)) throw Error(o(299));
    var a = !1, n = "", u = Or, i = Dr, f = Mr, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), l = om(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      r,
      u,
      i,
      f,
      _m
    ), l.context = rm(null), e = l.current, a = Ml(), a = Bi(a), n = Oe(a), n.callback = null, De(e, n, a), e = a, l.current.lanes = e, rn(l, e), Wl(l), t[ba] = l.current, Of(t), new Ni(l);
  }, eu.version = "19.2.6", eu;
}
var Rm;
function Y0() {
  if (Rm) return kf.exports;
  Rm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), kf.exports = B0(), kf.exports;
}
var G0 = Y0(), ls = { exports: {} }, es = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Um;
function X0() {
  if (Um) return es;
  Um = 1;
  var c = Ri();
  function y(R, x) {
    return R === x && (R !== 0 || 1 / R === 1 / x) || R !== R && x !== x;
  }
  var d = typeof Object.is == "function" ? Object.is : y, o = c.useState, N = c.useEffect, M = c.useLayoutEffect, E = c.useDebugValue;
  function C(R, x) {
    var H = x(), Q = o({ inst: { value: H, getSnapshot: x } }), W = Q[0].inst, I = Q[1];
    return M(
      function() {
        W.value = H, W.getSnapshot = x, j(W) && I({ inst: W });
      },
      [R, H, x]
    ), N(
      function() {
        return j(W) && I({ inst: W }), R(function() {
          j(W) && I({ inst: W });
        });
      },
      [R]
    ), E(H), H;
  }
  function j(R) {
    var x = R.getSnapshot;
    R = R.value;
    try {
      var H = x();
      return !d(R, H);
    } catch {
      return !0;
    }
  }
  function b(R, x) {
    return x();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? b : C;
  return es.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : U, es;
}
var Cm;
function Q0() {
  return Cm || (Cm = 1, ls.exports = X0()), ls.exports;
}
var Hm = Q0();
const $m = 0, Wm = 1, Fm = 2, qm = 3;
var Bm = Object.prototype.hasOwnProperty;
function os(c, y) {
  var d, o;
  if (c === y) return !0;
  if (c && y && (d = c.constructor) === y.constructor) {
    if (d === Date) return c.getTime() === y.getTime();
    if (d === RegExp) return c.toString() === y.toString();
    if (d === Array) {
      if ((o = c.length) === y.length)
        for (; o-- && os(c[o], y[o]); ) ;
      return o === -1;
    }
    if (!d || typeof c == "object") {
      o = 0;
      for (d in c)
        if (Bm.call(c, d) && ++o && !Bm.call(y, d) || !(d in y) || !os(c[d], y[d])) return !1;
      return Object.keys(y).length === o;
    }
  }
  return c !== c && y !== y;
}
const ge = /* @__PURE__ */ new WeakMap(), Se = () => {
}, cl = (
  /*#__NOINLINE__*/
  Se()
), rs = Object, dt = (c) => c === cl, Fl = (c) => typeof c == "function", $e = (c, y) => ({
  ...c,
  ...y
}), km = (c) => Fl(c.then), as = {}, xi = {}, _s = "undefined", iu = typeof window != _s, ds = typeof document != _s, L0 = iu && "Deno" in window, V0 = () => iu && typeof window.requestAnimationFrame != _s, Im = (c, y) => {
  const d = ge.get(c);
  return [
    // Getter
    () => !dt(y) && c.get(y) || as,
    // Setter
    (o) => {
      if (!dt(y)) {
        const N = c.get(y);
        y in xi || (xi[y] = N), d[5](y, $e(N, o), N || as);
      }
    },
    // Subscriber
    d[6],
    // Get server cache snapshot
    () => !dt(y) && y in xi ? xi[y] : !dt(y) && c.get(y) || as
  ];
};
let ms = !0;
const Z0 = () => ms, [vs, hs] = iu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], K0 = () => {
  const c = ds && document.visibilityState;
  return dt(c) || c !== "hidden";
}, J0 = (c) => (ds && document.addEventListener("visibilitychange", c), vs("focus", c), () => {
  ds && document.removeEventListener("visibilitychange", c), hs("focus", c);
}), w0 = (c) => {
  const y = () => {
    ms = !0, c();
  }, d = () => {
    ms = !1;
  };
  return vs("online", y), vs("offline", d), () => {
    hs("online", y), hs("offline", d);
  };
}, $0 = {
  isOnline: Z0,
  isVisible: K0
}, W0 = {
  initFocus: J0,
  initReconnect: w0
}, Ym = !bs.useId, nn = !iu || L0, F0 = (c) => V0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), ns = nn ? G.useEffect : G.useLayoutEffect, us = typeof navigator < "u" && navigator.connection, Gm = !nn && us && ([
  "slow-2g",
  "2g"
].includes(us.effectiveType) || us.saveData), Ai = /* @__PURE__ */ new WeakMap(), k0 = (c) => rs.prototype.toString.call(c), is = (c, y) => c === `[object ${y}]`;
let I0 = 0;
const ys = (c) => {
  const y = typeof c, d = k0(c), o = is(d, "Date"), N = is(d, "RegExp"), M = is(d, "Object");
  let E, C;
  if (rs(c) === c && !o && !N) {
    if (E = Ai.get(c), E) return E;
    if (E = ++I0 + "~", Ai.set(c, E), Array.isArray(c)) {
      for (E = "@", C = 0; C < c.length; C++)
        E += ys(c[C]) + ",";
      Ai.set(c, E);
    }
    if (M) {
      E = "#";
      const j = rs.keys(c).sort();
      for (; !dt(C = j.pop()); )
        dt(c[C]) || (E += C + ":" + ys(c[C]) + ",");
      Ai.set(c, E);
    }
  } else
    E = o ? c.toJSON() : y == "symbol" ? c.toString() : y == "string" ? JSON.stringify(c) : "" + c;
  return E;
}, Es = (c) => {
  if (Fl(c))
    try {
      c = c();
    } catch {
      c = "";
    }
  const y = c;
  return c = typeof c == "string" ? c : (Array.isArray(c) ? c.length : c) ? ys(c) : "", [
    c,
    y
  ];
};
let P0 = 0;
const gs = () => ++P0;
async function Pm(...c) {
  const [y, d, o, N] = c, M = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof N == "boolean" ? {
    revalidate: N
  } : N || {});
  let E = M.populateCache;
  const C = M.rollbackOnError;
  let j = M.optimisticData;
  const b = (x) => typeof C == "function" ? C(x) : C !== !1, U = M.throwOnError;
  if (Fl(d)) {
    const x = d, H = [], Q = y.keys();
    for (const W of Q)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(W) && x(y.get(W)._k) && H.push(W);
    return Promise.all(H.map(R));
  }
  return R(d);
  async function R(x) {
    const [H] = Es(x);
    if (!H) return;
    const [Q, W] = Im(y, H), [I, ct, V, bt] = ge.get(y), J = () => {
      const Lt = I[H];
      return (Fl(M.revalidate) ? M.revalidate(Q().data, x) : M.revalidate !== !1) && (delete V[H], delete bt[H], Lt && Lt[0]) ? Lt[0](Fm).then(() => Q().data) : Q().data;
    };
    if (c.length < 3)
      return J();
    let tt = o, ut, Z = !1;
    const _t = gs();
    ct[H] = [
      _t,
      0
    ];
    const nt = !dt(j), sl = Q(), F = sl.data, Ot = sl._c, ol = dt(Ot) ? F : Ot;
    if (nt && (j = Fl(j) ? j(ol, F) : j, W({
      data: j,
      _c: ol
    })), Fl(tt))
      try {
        tt = tt(ol);
      } catch (Lt) {
        ut = Lt, Z = !0;
      }
    if (tt && km(tt))
      if (tt = await tt.catch((Lt) => {
        ut = Lt, Z = !0;
      }), _t !== ct[H][0]) {
        if (Z) throw ut;
        return tt;
      } else Z && nt && b(ut) && (E = !0, W({
        data: ol,
        _c: cl
      }));
    if (E && !Z)
      if (Fl(E)) {
        const Lt = E(tt, ol);
        W({
          data: Lt,
          error: cl,
          _c: cl
        });
      } else
        W({
          data: tt,
          error: cl,
          _c: cl
        });
    if (ct[H][1] = gs(), Promise.resolve(J()).then(() => {
      W({
        _c: cl
      });
    }), Z) {
      if (U) throw ut;
      return;
    }
    return tt;
  }
}
const Xm = (c, y) => {
  for (const d in c)
    c[d][0] && c[d][0](y);
}, ty = (c, y) => {
  if (!ge.has(c)) {
    const d = $e(W0, y), o = /* @__PURE__ */ Object.create(null), N = Pm.bind(cl, c);
    let M = Se;
    const E = /* @__PURE__ */ Object.create(null), C = (U, R) => {
      const x = E[U] || [];
      return E[U] = x, x.push(R), () => x.splice(x.indexOf(R), 1);
    }, j = (U, R, x) => {
      c.set(U, R);
      const H = E[U];
      if (H)
        for (const Q of H)
          Q(R, x);
    }, b = () => {
      if (!ge.has(c) && (ge.set(c, [
        o,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        N,
        j,
        C
      ]), !nn)) {
        const U = d.initFocus(setTimeout.bind(cl, Xm.bind(cl, o, $m))), R = d.initReconnect(setTimeout.bind(cl, Xm.bind(cl, o, Wm)));
        M = () => {
          U && U(), R && R(), ge.delete(c);
        };
      }
    };
    return b(), [
      c,
      N,
      b,
      M
    ];
  }
  return [
    c,
    ge.get(c)[4]
  ];
}, ly = (c, y, d, o, N) => {
  const M = d.errorRetryCount, E = N.retryCount, C = ~~((Math.random() + 0.5) * (1 << (E < 8 ? E : 8))) * d.errorRetryInterval;
  !dt(M) && E > M || setTimeout(o, C, N);
}, ey = os, [tv, ay] = ty(/* @__PURE__ */ new Map()), ny = $e(
  {
    // events
    onLoadingSlow: Se,
    onSuccess: Se,
    onError: Se,
    onErrorRetry: ly,
    onDiscarded: Se,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Gm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Gm ? 5e3 : 3e3,
    // providers
    compare: ey,
    isPaused: () => !1,
    cache: tv,
    mutate: ay,
    fallback: {}
  },
  // use web preset by default
  $0
), uy = (c, y) => {
  const d = $e(c, y);
  if (y) {
    const { use: o, fallback: N } = c, { use: M, fallback: E } = y;
    o && M && (d.use = o.concat(M)), N && E && (d.fallback = $e(N, E));
  }
  return d;
}, iy = G.createContext({}), cy = "$inf$", lv = iu && window.__SWR_DEVTOOLS_USE__, fy = lv ? window.__SWR_DEVTOOLS_USE__ : [], sy = () => {
  lv && (window.__SWR_DEVTOOLS_REACT__ = bs);
}, oy = (c) => Fl(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], ry = () => {
  const c = G.useContext(iy);
  return G.useMemo(() => $e(ny, c), [
    c
  ]);
}, dy = (c) => (y, d, o) => c(y, d && ((...M) => {
  const [E] = Es(y), [, , , C] = ge.get(tv);
  if (E.startsWith(cy))
    return d(...M);
  const j = C[E];
  return dt(j) ? d(...M) : (delete C[E], j);
}), o), my = fy.concat(dy), vy = (c) => function(...d) {
  const o = ry(), [N, M, E] = oy(d), C = uy(o, E);
  let j = c;
  const { use: b } = C, U = (b || []).concat(my);
  for (let R = U.length; R--; )
    j = U[R](j);
  return j(N, M || C.fetcher || null, C);
}, hy = (c, y, d) => {
  const o = y[c] || (y[c] = []);
  return o.push(d), () => {
    const N = o.indexOf(d);
    N >= 0 && (o[N] = o[o.length - 1], o.pop());
  };
};
sy();
const cs = bs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((c) => {
  switch (c.status) {
    case "pending":
      throw c;
    case "fulfilled":
      return c.value;
    case "rejected":
      throw c.reason;
    default:
      throw c.status = "pending", c.then((y) => {
        c.status = "fulfilled", c.value = y;
      }, (y) => {
        c.status = "rejected", c.reason = y;
      }), c;
  }
}), fs = {
  dedupe: !0
}, Qm = Promise.resolve(cl), yy = () => Se, gy = (c, y, d) => {
  const { cache: o, compare: N, suspense: M, fallbackData: E, revalidateOnMount: C, revalidateIfStale: j, refreshInterval: b, refreshWhenHidden: U, refreshWhenOffline: R, keepPreviousData: x, strictServerPrefetchWarning: H } = d, [Q, W, I, ct] = ge.get(o), [V, bt] = Es(c), J = G.useRef(!1), tt = G.useRef(!1), ut = G.useRef(V), Z = G.useRef(y), _t = G.useRef(d), nt = () => _t.current, sl = () => nt().isVisible() && nt().isOnline(), [F, Ot, ol, Lt] = Im(o, V), It = G.useRef({}).current, T = dt(E) ? dt(d.fallback) ? cl : d.fallback[V] : E, B = (Nt, Ht) => {
    for (const Dt in It) {
      const Mt = Dt;
      if (Mt === "data") {
        if (!N(Nt[Mt], Ht[Mt]) && (!dt(Nt[Mt]) || !N(lt, Ht[Mt])))
          return !1;
      } else if (Ht[Mt] !== Nt[Mt])
        return !1;
    }
    return !0;
  }, w = !J.current, St = G.useMemo(() => {
    const Nt = F(), Ht = Lt(), Dt = (Zt) => {
      const Rt = $e(Zt);
      return delete Rt._k, (() => {
        if (!V || !y || nt().isPaused()) return !1;
        if (w && !dt(C)) return C;
        const be = dt(T) ? Rt.data : T;
        return dt(be) || j;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Rt
      } : Rt;
    }, Mt = Dt(Nt), dl = Nt === Ht ? Mt : Dt(Ht);
    let ml = Mt;
    return [
      () => {
        const Zt = Dt(F());
        return B(Zt, ml) ? (ml.data = Zt.data, ml.isLoading = Zt.isLoading, ml.isValidating = Zt.isValidating, ml.error = Zt.error, ml) : (ml = Zt, Zt);
      },
      () => dl
    ];
  }, [
    o,
    V
  ]), vt = Hm.useSyncExternalStore(G.useCallback(
    (Nt) => ol(V, (Ht, Dt) => {
      B(Dt, Ht) || Nt();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      o,
      V
    ]
  ), St[0], St[1]), v = Q[V] && Q[V].length > 0, O = vt.data, q = dt(O) ? T && km(T) ? cs(T) : T : O, Y = vt.error, k = G.useRef(q), lt = x ? dt(O) ? dt(k.current) ? q : k.current : O : q, it = V && dt(q), Vt = G.useRef(null);
  !nn && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Hm.useSyncExternalStore(yy, () => (Vt.current = !1, Vt), () => (Vt.current = !0, Vt));
  const Bt = Vt.current;
  H && Bt && !M && it && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const pe = !V || !y || nt().isPaused() || v && !dt(Y) ? !1 : w && !dt(C) ? C : M ? dt(q) ? !1 : j : dt(q) || j, We = w && pe, cn = dt(vt.isValidating) ? We : vt.isValidating, fu = dt(vt.isLoading) ? We : vt.isLoading, El = G.useCallback(
    async (Nt) => {
      const Ht = Z.current;
      if (!V || !Ht || tt.current || nt().isPaused())
        return !1;
      let Dt, Mt, dl = !0;
      const ml = Nt || {}, Zt = !I[V] || !ml.dedupe, Rt = () => Ym ? !tt.current && V === ut.current && J.current : V === ut.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, be = () => {
        Ot(Fe);
      }, fn = () => {
        const vl = I[V];
        vl && vl[1] === Mt && delete I[V];
      }, ke = {
        isValidating: !0
      };
      dt(F().data) && (ke.isLoading = !0);
      try {
        if (Zt && (Ot(ke), d.loadingTimeout && dt(F().data) && setTimeout(() => {
          dl && Rt() && nt().onLoadingSlow(V, d);
        }, d.loadingTimeout), I[V] = [
          Ht(bt),
          gs()
        ]), [Dt, Mt] = I[V], Dt = await Dt, Zt && setTimeout(fn, d.dedupingInterval), !I[V] || I[V][1] !== Mt)
          return Zt && Rt() && nt().onDiscarded(V), !1;
        Fe.error = cl;
        const vl = W[V];
        if (!dt(vl) && // case 1
        (Mt <= vl[0] || // case 2
        Mt <= vl[1] || // case 3
        vl[1] === 0))
          return be(), Zt && Rt() && nt().onDiscarded(V), !1;
        const Rl = F().data;
        Fe.data = N(Rl, Dt) ? Rl : Dt, Zt && Rt() && nt().onSuccess(Dt, V, d);
      } catch (vl) {
        fn();
        const Rl = nt(), { shouldRetryOnError: sn } = Rl;
        Rl.isPaused() || (Fe.error = vl, Zt && Rt() && (Rl.onError(vl, V, Rl), (sn === !0 || Fl(sn) && sn(vl)) && (!nt().revalidateOnFocus || !nt().revalidateOnReconnect || sl()) && Rl.onErrorRetry(vl, V, Rl, (Hi) => {
          const kl = Q[V];
          kl && kl[0] && kl[0](qm, Hi);
        }, {
          retryCount: (ml.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return dl = !1, be(), !0;
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
      V,
      o
    ]
  ), pa = G.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Nt) => Pm(o, ut.current, ...Nt),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ns(() => {
    Z.current = y, _t.current = d, dt(O) || (k.current = O);
  }), ns(() => {
    if (!V) return;
    const Nt = El.bind(cl, fs);
    let Ht = 0;
    nt().revalidateOnFocus && (Ht = Date.now() + nt().focusThrottleInterval);
    const Mt = hy(V, Q, (dl, ml = {}) => {
      if (dl == $m) {
        const Zt = Date.now();
        nt().revalidateOnFocus && Zt > Ht && sl() && (Ht = Zt + nt().focusThrottleInterval, Nt());
      } else if (dl == Wm)
        nt().revalidateOnReconnect && sl() && Nt();
      else {
        if (dl == Fm)
          return El();
        if (dl == qm)
          return El(ml);
      }
    });
    return tt.current = !1, ut.current = V, J.current = !0, Ot({
      _k: bt
    }), pe && (I[V] || (dt(q) || nn ? Nt() : F0(Nt))), () => {
      tt.current = !0, Mt();
    };
  }, [
    V
  ]), ns(() => {
    let Nt;
    function Ht() {
      const Mt = Fl(b) ? b(F().data) : b;
      Mt && Nt !== -1 && (Nt = setTimeout(Dt, Mt));
    }
    function Dt() {
      !F().error && (U || nt().isVisible()) && (R || nt().isOnline()) ? El(fs).then(Ht) : Ht();
    }
    return Ht(), () => {
      Nt && (clearTimeout(Nt), Nt = -1);
    };
  }, [
    b,
    U,
    R,
    V
  ]), G.useDebugValue(lt), M) {
    if (!Ym && nn && it)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    it && (Z.current = y, _t.current = d, tt.current = !1);
    const Nt = ct[V], Ht = !dt(Nt) && it ? pa(Nt) : Qm;
    if (cs(Ht), !dt(Y) && it)
      throw Y;
    const Dt = it ? El(fs) : Qm;
    !dt(lt) && it && (Dt.status = "fulfilled", Dt.value = !0), cs(Dt);
  }
  return {
    mutate: pa,
    get data() {
      return It.data = !0, lt;
    },
    get error() {
      return It.error = !0, Y;
    },
    get isValidating() {
      return It.isValidating = !0, cn;
    },
    get isLoading() {
      return It.isLoading = !0, fu;
    }
  };
}, Oi = vy(gy), Ts = "/api/v1/extensions/nexus.video.ltx23", Ss = 8 * 1024 * 1024, ev = [
  "image/png",
  "image/jpeg",
  "image/webp"
];
async function ye(c, y) {
  const d = await fetch(`${Ts}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!d.ok) {
    const o = await d.text();
    throw new Error(`${d.status} ${d.statusText}: ${o}`);
  }
  return await d.json();
}
const ga = {
  health: () => ye("/health"),
  listProfiles: () => ye("/runtime-profiles"),
  plan: (c) => ye("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(c)
  }),
  createRender: (c) => ye(
    "/renders",
    { method: "POST", body: JSON.stringify(c) }
  ),
  getRender: (c) => ye(`/renders/${c}`),
  cancel: (c) => ye(`/renders/${c}/cancel`, { method: "POST" }),
  retrySegment: (c, y) => ye(`/renders/${c}/retry-segment`, {
    method: "POST",
    body: JSON.stringify({ segment_index: y })
  }),
  uploadInputImage: async (c) => {
    const y = new FormData();
    y.append("image", c, c.name);
    const d = await fetch(`${Ts}/input-images`, {
      method: "POST",
      body: y
    });
    if (!d.ok) {
      const o = await d.text();
      throw new Error(`${d.status} ${d.statusText}: ${o}`);
    }
    return await d.json();
  }
};
function Sy(c) {
  return `${Ts}/artifacts/${c}`;
}
const py = "/api/v1", Lm = "nexus.video.ltx23";
async function Vm(c, y) {
  const d = await fetch(`${py}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!d.ok) {
    const N = await d.text();
    throw new Error(`${d.status}: ${N}`);
  }
  return (await d.json()).data;
}
const Zm = {
  listDependencies: () => Vm(`/extensions/${Lm}/dependencies`),
  startInstall: (c = !1) => Vm(
    `/extensions/${Lm}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Km = {
  status: (c) => ye(`/profiles/${c}/install`),
  start: (c) => ye(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var by = "_1vmg9ib0", un = "_1vmg9ib1", au = "_1vmg9ib2", _y = "_1vmg9ib3", Yt = "_1vmg9ib4", Gt = "_1vmg9ib5", fl = "_1vmg9ib6", av = "_1vmg9ib7 _1vmg9ib6", Jm = "_1vmg9ib8 _1vmg9ib6", nu = "_1vmg9ib9", Ns = "_1vmg9iba", zs = "_1vmg9ibb _1vmg9iba", Ey = "_1vmg9ibc _1vmg9iba", ji = "_1vmg9ibd _1vmg9iba", cu = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", nv = "_1vmg9ibj _1vmg9ibi", uv = "_1vmg9ibk _1vmg9ibi", iv = "_1vmg9ibl _1vmg9ibi", cv = "_1vmg9ibm _1vmg9ibi", uu = "_1vmg9ibn", Sa = "_1vmg9ibo", Ty = "_1vmg9ibp", Ny = "_1vmg9ibq", ps = "_1vmg9ibs _1vmg9ibr", fv = "_1vmg9ibt _1vmg9ibr", sv = "_1vmg9ibu _1vmg9ibr", ov = "_1vmg9ibv _1vmg9ibr", zy = "_1vmg9ibw", xy = "_1vmg9ibx", Ay = "_1vmg9iby", jy = "_1vmg9ibz", Oy = "_1vmg9ib10 _1vmg9iba", ht = "_1vmg9ib11", Dy = "_1vmg9ib12", My = "_1vmg9ib13", Ry = "_1vmg9ib14", Uy = "_1vmg9ib15", Cy = "_1vmg9ib16", Ui = "_1vmg9ib17", Ci = "_1vmg9ib18", wm = "_1vmg9ib19", Hy = "_1vmg9ib1a", qy = "_1vmg9ib1b", By = "_1vmg9ib1c", Yy = "_1vmg9ib1d _1vmg9ibd _1vmg9iba", Gy = "_1vmg9ib1e";
function Di(c) {
  return c < 1024 ? `${c} B` : c < 1024 * 1024 ? `${(c / 1024).toFixed(1)} KB` : `${(c / (1024 * 1024)).toFixed(2)} MB`;
}
function Xy(c) {
  return ev.includes(c.type) ? c.size === 0 ? "The selected file is empty." : c.size > Ss ? `Image is ${Di(c.size)} — limit is ${Di(
    Ss
  )}.` : null : `Unsupported type ${c.type || "unknown"}. Use PNG, JPEG, or WEBP.`;
}
function Qy({
  artifactId: c,
  onChange: y
}) {
  const d = G.useId(), o = G.useRef(null), [N, M] = G.useState(null), [E, C] = G.useState(!1), [j, b] = G.useState(null), [U, R] = G.useState(!1);
  G.useEffect(() => {
    c === void 0 && N !== null && (URL.revokeObjectURL(N.url), M(null), b(null));
  }, [c, N]), G.useEffect(
    () => () => {
      N !== null && URL.revokeObjectURL(N.url);
    },
    [N]
  );
  const x = G.useCallback(
    async (J) => {
      const tt = Xy(J);
      if (tt !== null) {
        b(tt);
        return;
      }
      const ut = URL.createObjectURL(J), Z = N;
      M({
        url: ut,
        fileName: J.name,
        byteLength: J.size,
        mime: J.type
      }), C(!0), b(null);
      let _t;
      try {
        _t = await ga.uploadInputImage(J);
      } catch (nt) {
        URL.revokeObjectURL(ut), M(Z), b(nt instanceof Error ? nt.message : String(nt)), C(!1);
        return;
      }
      Z !== null && URL.revokeObjectURL(Z.url), y(_t.artifact_id), C(!1);
    },
    [y, N]
  ), H = G.useCallback(
    (J) => {
      const tt = J.target.files?.[0];
      J.target.value = "", tt !== void 0 && x(tt);
    },
    [x]
  ), Q = G.useCallback(
    (J) => {
      J.preventDefault(), J.stopPropagation(), R(!1);
      const tt = J.dataTransfer.files?.[0];
      tt !== void 0 && x(tt);
    },
    [x]
  ), W = G.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), R(!0);
  }, []), I = G.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), R(!1);
  }, []), ct = G.useCallback(
    (J) => {
      (J.key === " " || J.key === "Enter") && (J.preventDefault(), o.current?.click());
    },
    []
  );
  G.useEffect(() => {
    const J = (tt) => {
      if (E) return;
      const ut = tt.clipboardData?.items;
      if (ut) {
        for (const Z of ut)
          if (Z.kind === "file" && Z.type.startsWith("image/")) {
            const _t = Z.getAsFile();
            if (_t !== null) {
              tt.preventDefault(), x(_t);
              return;
            }
          }
      }
    };
    return window.addEventListener("paste", J), () => window.removeEventListener("paste", J);
  }, [x, E]);
  const V = G.useCallback(() => {
    N !== null && URL.revokeObjectURL(N.url), M(null), b(null), y(void 0);
  }, [y, N]);
  if (N !== null && c !== void 0 && !E)
    return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: d, children: "Reference image" }),
      /* @__PURE__ */ s.jsxs("div", { className: qy, children: [
        /* @__PURE__ */ s.jsx(
          "img",
          {
            className: By,
            src: N.url,
            alt: "Reference frame to condition the first segment of the render."
          }
        ),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("div", { style: { color: "inherit", fontSize: 13 }, children: N.fileName }),
          /* @__PURE__ */ s.jsxs("div", { className: ht, children: [
            N.mime,
            " · ",
            Di(N.byteLength)
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: ht, style: { marginTop: 2 }, children: [
            "artifact: ",
            c
          ] })
        ] }),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: Yy,
            onClick: V,
            "aria-label": "Remove reference image",
            title: "Remove reference image",
            children: "✕"
          }
        )
      ] })
    ] });
  const bt = U ? `${wm} ${Hy}` : wm;
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: d, children: "Reference image (optional)" }),
    /* @__PURE__ */ s.jsxs(
      "label",
      {
        className: bt,
        htmlFor: d,
        onDrop: Q,
        onDragOver: W,
        onDragLeave: I,
        onKeyDown: ct,
        tabIndex: 0,
        role: "button",
        "aria-label": "Upload reference image (drag, paste, or click)",
        "aria-busy": E,
        children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              ref: o,
              id: d,
              type: "file",
              accept: ev.join(","),
              style: { display: "none" },
              onChange: H,
              disabled: E
            }
          ),
          /* @__PURE__ */ s.jsx("strong", { style: { color: "inherit" }, children: E ? "Uploading…" : U ? "Drop to upload" : "Drag, paste, or click" }),
          /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
            "PNG · JPEG · WEBP, up to ",
            Di(Ss),
            ". Anchors the first segment's identity; later segments still chain off the prior segment's last frame."
          ] })
        ]
      }
    ),
    j !== null ? /* @__PURE__ */ s.jsx("div", { className: Sa, role: "alert", children: j }) : null
  ] });
}
const Ly = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Vy() {
  const [c, y] = G.useState(Ly), [d, o] = G.useState(null), [N, M] = G.useState(null), [E, C] = G.useState(!1), [j, b] = G.useState(null), [U, R] = G.useState(null), [x, H] = G.useState(!1), [Q, W] = G.useState(!1), [I, ct] = G.useState(
    null
  ), [V, bt] = G.useState(null), { data: J } = Oi(
    "ltx:runtime-profiles",
    () => ga.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: tt, mutate: ut } = Oi(
    j ? `ltx:renders:${j}` : null,
    () => j ? ga.getRender(j) : Promise.resolve(null),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (F) => F ? F.status === "completed" || F.status === "failed" || F.status === "cancelled" ? 0 : 2e3 : 1e3
    }
  ), Z = G.useCallback(async () => {
    C(!0), M(null);
    try {
      const F = await ga.plan(c);
      o(F);
    } catch (F) {
      M(F instanceof Error ? F.message : String(F)), o(null);
    } finally {
      C(!1);
    }
  }, [c]), _t = G.useCallback(async () => {
    H(!0), R(null);
    try {
      const F = await ga.createRender(c);
      b(F.id), ut();
    } catch (F) {
      R(F instanceof Error ? F.message : String(F));
    } finally {
      H(!1);
    }
  }, [c, ut]), nt = G.useCallback(async () => {
    if (!(!j || Q)) {
      W(!0), R(null);
      try {
        await ga.cancel(j), ut();
      } catch (F) {
        R(
          `Cancel failed: ${F instanceof Error ? F.message : String(F)}`
        );
      } finally {
        W(!1);
      }
    }
  }, [j, Q, ut]), sl = G.useCallback(
    async (F) => {
      if (!(!j || I !== null)) {
        ct(F), bt(null);
        try {
          await ga.retrySegment(j, F), ut();
        } catch (Ot) {
          bt(
            `Retry of segment ${F + 1} failed: ${Ot instanceof Error ? Ot.message : String(Ot)}`
          );
        } finally {
          ct(null);
        }
      }
    },
    [j, I, ut]
  );
  return /* @__PURE__ */ s.jsxs("div", { className: by, children: [
    /* @__PURE__ */ s.jsxs("div", { className: My, children: [
      /* @__PURE__ */ s.jsx(Zy, {}),
      /* @__PURE__ */ s.jsx(
        wy,
        {
          draft: c,
          onChange: y,
          profiles: J ?? [],
          onPlan: Z,
          onSubmit: _t,
          planning: E,
          submitting: x,
          plan: d,
          planError: N,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ s.jsx(
      eg,
      {
        run: tt ?? null,
        onCancel: nt,
        cancelling: Q,
        onRetrySegment: sl,
        retryingSegmentIndex: I,
        retryError: V
      }
    )
  ] });
}
function Zy() {
  const [c, y] = G.useState(!1), [d, o] = G.useState(null), { data: N, mutate: M } = Oi(
    "host:dependencies",
    () => Zm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (x) => x.status === "running" || x.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), E = G.useCallback(
    async (U = !1) => {
      y(!0), o(null);
      try {
        await Zm.startInstall(U), M();
      } catch (R) {
        o(R instanceof Error ? R.message : String(R));
      } finally {
        y(!1);
      }
    },
    [M]
  );
  if (!N) return null;
  const C = N.steps.find((U) => U.status === "failed"), j = N.all_satisfied, b = N.steps.some(
    (U) => U.status === "running" || !j && U.status === "pending"
  );
  return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
    /* @__PURE__ */ s.jsxs("div", { className: Ry, children: [
      /* @__PURE__ */ s.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ s.jsx("span", { className: Ky(j, !!C, b), children: j ? "ready" : C ? "install failed" : b ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ s.jsx("ul", { className: Uy, children: N.steps.map((U) => /* @__PURE__ */ s.jsxs("li", { className: Cy, children: [
      /* @__PURE__ */ s.jsx("span", { className: Jy(U.status) }),
      /* @__PURE__ */ s.jsx("span", { children: U.id }),
      /* @__PURE__ */ s.jsx("span", { className: ht, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    C?.last_error ? /* @__PURE__ */ s.jsxs("div", { className: Sa, children: [
      /* @__PURE__ */ s.jsxs("strong", { children: [
        C.id,
        " failed"
      ] }),
      ": ",
      C.last_error.message
    ] }) : null,
    d ? /* @__PURE__ */ s.jsx("div", { className: Sa, children: d }) : null,
    !j || C ? /* @__PURE__ */ s.jsxs("div", { className: cu, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: Ns,
          disabled: c || b,
          onClick: () => void E(!1),
          children: b || c ? "Installing…" : "Install runtime"
        }
      ),
      C ? /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: zs,
          disabled: c || b,
          onClick: () => void E(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Ky(c, y, d) {
  return y ? cv : c ? nv : d ? uv : iv;
}
function Jy(c) {
  switch (c) {
    case "ok":
      return sv;
    case "running":
      return fv;
    case "failed":
      return ov;
    default:
      return ps;
  }
}
function wy({
  draft: c,
  onChange: y,
  profiles: d,
  onPlan: o,
  onSubmit: N,
  planning: M,
  submitting: E,
  plan: C,
  planError: j,
  submitError: b
}) {
  const U = G.useCallback(
    (x, H) => y({ ...c, [x]: H }),
    [c, y]
  ), R = G.useCallback(
    (x) => {
      x.preventDefault(), !(E || c.prompt.trim().length === 0) && N();
    },
    [E, c.prompt, N]
  );
  return /* @__PURE__ */ s.jsxs("form", { className: un, onSubmit: R, noValidate: !0, children: [
    /* @__PURE__ */ s.jsx("h2", { className: au, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ s.jsx("p", { className: _y, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ s.jsx("div", { className: Yt, children: /* @__PURE__ */ s.jsx(
      Qy,
      {
        artifactId: c.input_image_artifact_id,
        onChange: (x) => U("input_image_artifact_id", x)
      }
    ) }),
    /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
      /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ s.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: av,
          value: c.prompt,
          onChange: (x) => U("prompt", x.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
      /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-neg",
          className: fl,
          value: c.negative_prompt ?? "",
          onChange: (x) => U(
            "negative_prompt",
            x.target.value.length > 0 ? x.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
      /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-character",
          className: fl,
          value: c.character_prompt ?? "",
          onChange: (x) => U(
            "character_prompt",
            x.target.value.length > 0 ? x.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ s.jsx("span", { className: ht, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
      /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          id: "ltx-style",
          className: fl,
          value: c.style_prompt ?? "",
          onChange: (x) => U(
            "style_prompt",
            x.target.value.length > 0 ? x.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ s.jsx("span", { className: ht, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ s.jsx(Iy, { draft: c, update: U }),
    /* @__PURE__ */ s.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-duration",
            className: fl,
            type: "number",
            min: 1,
            max: 300,
            value: c.duration_seconds,
            onChange: (x) => {
              const H = Number(x.target.value);
              Number.isFinite(H) && U(
                "duration_seconds",
                Math.max(1, Math.min(300, H))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-seed",
            className: fl,
            type: "number",
            value: c.seed ?? "",
            onChange: (x) => {
              const H = x.target.value;
              if (H === "") {
                U("seed", void 0);
                return;
              }
              const Q = Number(H);
              Number.isFinite(Q) && U("seed", Q);
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Jm,
            value: c.runtime_profile,
            onChange: (x) => U(
              "runtime_profile",
              x.target.value
            ),
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ s.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ s.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ s.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Jm,
            value: c.quality_preset,
            onChange: (x) => U("quality_preset", x.target.value),
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ s.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ s.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ s.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(ky, { profiles: d, selected: c.runtime_profile }),
    /* @__PURE__ */ s.jsx($y, { selected: c.runtime_profile }),
    /* @__PURE__ */ s.jsx(Py, { draft: c, update: U }),
    /* @__PURE__ */ s.jsxs("div", { className: cu, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: zs,
          onClick: o,
          disabled: M || E || c.prompt.trim().length === 0,
          children: M ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "submit",
          className: Ns,
          disabled: E || c.prompt.trim().length === 0,
          "aria-busy": E,
          children: E ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    j ? /* @__PURE__ */ s.jsx("div", { className: Sa, role: "alert", children: j }) : null,
    b ? /* @__PURE__ */ s.jsx("div", { className: Sa, role: "alert", children: b }) : null,
    C ? /* @__PURE__ */ s.jsx(lg, { plan: C }) : null
  ] });
}
function $y({
  selected: c
}) {
  const y = Fy(c), [d, o] = G.useState(!1), [N, M] = G.useState(null), { data: E, mutate: C } = Oi(
    y ? `profile-install:${y}` : null,
    () => y ? Km.status(y) : Promise.resolve(null),
    {
      refreshInterval: (x) => x && x.in_flight ? 2e3 : 0
    }
  ), j = G.useCallback(async () => {
    if (y) {
      o(!0), M(null);
      try {
        await Km.start(y), C();
      } catch (x) {
        M(x instanceof Error ? x.message : String(x));
      } finally {
        o(!1);
      }
    }
  }, [y, C]);
  if (!y || !E) return null;
  if (E.installed)
    return /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ s.jsx("strong", { children: "Runtime installed" }),
      " · ",
      E.repo
    ] });
  const b = E.in_flight || d, U = rv(E.phase), R = b ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
    /* @__PURE__ */ s.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    E.repo ?? "unknown repo",
    /* @__PURE__ */ s.jsxs("div", { className: ht, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ s.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      E.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    E.last_error ? /* @__PURE__ */ s.jsxs("div", { className: ht, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      E.last_error
    ] }) : null,
    N ? /* @__PURE__ */ s.jsx("div", { className: ht, style: { marginTop: 4, color: "#e57373" }, children: N }) : null,
    /* @__PURE__ */ s.jsx("div", { className: cu, style: { marginTop: 8 }, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: Ns,
        disabled: b,
        onClick: () => void j(),
        children: R
      }
    ) }),
    /* @__PURE__ */ s.jsx(
      Wy,
      {
        phase: E.phase,
        recentProgress: E.recent_progress
      }
    )
  ] });
}
function rv(c) {
  if (!c) return null;
  if (c.startsWith("error:")) return "Failed";
  switch (c) {
    case "starting":
      return "Starting…";
    case "resolving_deps":
      return "Resolving deps…";
    case "downloading_weights":
      return "Downloading weights…";
    case "done":
      return "Finishing…";
    default:
      return c;
  }
}
function Wy({
  phase: c,
  recentProgress: y
}) {
  if (!c && y.length === 0) return null;
  const d = rv(c);
  return /* @__PURE__ */ s.jsxs("details", { className: Ui, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ci, children: [
      "Install progress",
      d ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
        " · ",
        d
      ] }) : null,
      y.length > 0 ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
        " · ",
        y.length,
        " lines"
      ] }) : null
    ] }),
    y.length === 0 ? /* @__PURE__ */ s.jsx("p", { className: ht, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ s.jsx("pre", { className: Gy, children: y.join(`
`) })
  ] });
}
function Fy(c) {
  return c === "auto" ? null : c;
}
function ky({
  profiles: c,
  selected: y
}) {
  if (c.length === 0) return null;
  const d = y === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${y}`, o = c.find((M) => M.runtime_id === d);
  if (!o) return null;
  const N = o.healthy ? "ok" : "warn";
  return /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
    /* @__PURE__ */ s.jsx("strong", { children: o.display_name }),
    ": ",
    o.status_message,
    o.experimental ? " (experimental)" : null
  ] });
}
function Iy({
  draft: c,
  update: y
}) {
  const d = c.scenes ?? [], o = G.useRef(0), [N, M] = G.useState(
    () => d.map(() => `scene-${o.current++}`)
  );
  if (N.length !== d.length) {
    const x = N.slice(0, d.length);
    for (; x.length < d.length; )
      x.push(`scene-${o.current++}`);
    M(x);
  }
  const E = G.useCallback(
    (x, H) => {
      y("scenes", x.length > 0 ? x : void 0), M(H);
    },
    [y]
  ), C = G.useCallback(() => {
    const x = d.length > 0 ? c.duration_seconds / (d.length + 1) : c.duration_seconds;
    E(
      [
        ...d,
        { prompt: "", duration_seconds: Math.max(1, Math.round(x)) }
      ],
      [...N, `scene-${o.current++}`]
    );
  }, [d, N, E, c.duration_seconds]), j = G.useCallback(
    (x, H) => {
      const Q = d.map((W, I) => {
        if (I !== x) return W;
        const ct = { ...W };
        return H.prompt !== void 0 && (ct.prompt = H.prompt ?? ""), H.duration_seconds !== void 0 && (H.duration_seconds === null ? delete ct.duration_seconds : ct.duration_seconds = H.duration_seconds), H.seed !== void 0 && (H.seed === null ? delete ct.seed : ct.seed = H.seed), ct;
      });
      E(Q, N);
    },
    [d, N, E]
  ), b = G.useCallback(
    (x) => {
      E(
        d.filter((H, Q) => Q !== x),
        N.filter((H, Q) => Q !== x)
      );
    },
    [d, N, E]
  ), U = G.useCallback(
    (x, H) => {
      const Q = x + H;
      if (Q < 0 || Q >= d.length) return;
      const W = d[x], I = d[Q], ct = N[x], V = N[Q];
      if (W === void 0 || I === void 0 || ct === void 0 || V === void 0)
        return;
      const bt = [...d], J = [...N];
      bt[x] = I, bt[Q] = W, J[x] = V, J[Q] = ct, E(bt, J);
    },
    [d, N, E]
  ), R = d.reduce(
    (x, H) => x + (H.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ s.jsxs("details", { className: Ui, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ci, children: [
      "Scenes — ",
      d.length === 0 ? "none (single prompt)" : `${d.length} scenes`,
      R > 0 ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
        " · ",
        R.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ s.jsx("p", { className: ht, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    d.map((x, H) => {
      const Q = N[H] ?? `scene-fallback-${H}`, W = (I) => {
        if (I === "") return null;
        const ct = Number(I);
        return Number.isFinite(ct) ? ct : null;
      };
      return /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: un,
          style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
          children: [
            /* @__PURE__ */ s.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ s.jsxs("strong", { className: ht, children: [
                    "Scene ",
                    H + 1
                  ] }),
                  /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: ji,
                        onClick: () => U(H, -1),
                        disabled: H === 0,
                        "aria-label": `Move scene ${H + 1} up`,
                        title: "Move up",
                        children: "↑"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: ji,
                        onClick: () => U(H, 1),
                        disabled: H === d.length - 1,
                        "aria-label": `Move scene ${H + 1} down`,
                        title: "Move down",
                        children: "↓"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        type: "button",
                        className: ji,
                        onClick: () => b(H),
                        "aria-label": `Remove scene ${H + 1}`,
                        title: "Remove scene",
                        children: "✕"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
              /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: `ltx-${Q}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ s.jsx(
                "textarea",
                {
                  id: `ltx-${Q}-prompt`,
                  className: av,
                  value: x.prompt,
                  onChange: (I) => j(H, { prompt: I.target.value }),
                  placeholder: "what happens in this scene…",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ s.jsxs("div", { className: nu, children: [
              /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
                /* @__PURE__ */ s.jsx(
                  "label",
                  {
                    className: Gt,
                    htmlFor: `ltx-${Q}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-duration`,
                    className: fl,
                    type: "number",
                    min: 1,
                    step: 0.5,
                    value: x.duration_seconds ?? "",
                    onChange: (I) => {
                      j(H, {
                        duration_seconds: W(I.target.value)
                      });
                    },
                    placeholder: "auto"
                  }
                )
              ] }),
              /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
                /* @__PURE__ */ s.jsx(
                  "label",
                  {
                    className: Gt,
                    htmlFor: `ltx-${Q}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ s.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-seed`,
                    className: fl,
                    type: "number",
                    value: x.seed ?? "",
                    onChange: (I) => {
                      j(H, {
                        seed: W(I.target.value)
                      });
                    },
                    placeholder: "derived"
                  }
                )
              ] })
            ] })
          ]
        },
        Q
      );
    }),
    /* @__PURE__ */ s.jsx("div", { className: cu, style: { marginTop: 10 }, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: zs,
        onClick: C,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Py({
  draft: c,
  update: y
}) {
  const d = c.advanced ?? {}, o = G.useCallback(
    (N, M) => {
      const E = { ...d };
      M == null ? delete E[N] : E[N] = M, y("advanced", Object.keys(E).length > 0 ? E : void 0);
    },
    [d, y]
  );
  return /* @__PURE__ */ s.jsxs("details", { className: Ui, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ci, children: [
      "Advanced — guidance, steps & offload",
      d.guidance_scale !== void 0 ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
        " · cfg ",
        d.guidance_scale
      ] }) : null,
      d.num_inference_steps !== void 0 ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
        " · ",
        d.num_inference_steps,
        " steps"
      ] }) : null,
      d.offload_mode && d.offload_mode !== "auto" ? /* @__PURE__ */ s.jsx("span", { className: ht, children: ` · offload ${d.offload_mode}` }) : null
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: nu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: fl,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: d.guidance_scale ?? "",
            onChange: (N) => {
              const M = N.target.value;
              o(
                "guidance_scale",
                M === "" ? void 0 : Number(M)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-steps",
            className: fl,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: d.num_inference_steps ?? "",
            onChange: (N) => {
              const M = N.target.value;
              o(
                "num_inference_steps",
                M === "" ? void 0 : Math.round(Number(M))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-offload-mode", children: "Offload strategy" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-offload-mode",
            className: fl,
            value: d.offload_mode ?? "auto",
            onChange: (N) => {
              const M = N.target.value;
              o("offload_mode", M === "auto" ? void 0 : M);
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "auto", children: "Auto (profile default)" }),
              /* @__PURE__ */ s.jsx("option", { value: "none", children: "None — full GPU resident (needs 16 GB+)" }),
              /* @__PURE__ */ s.jsx("option", { value: "model", children: "Model — mid-grained offload (balanced)" }),
              /* @__PURE__ */ s.jsx("option", { value: "sequential", children: "Sequential — per-layer offload (lowest VRAM)" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "NVFP4 defaults to None; FP8 profiles default to Sequential. Pick None on a 16 GB+ card for the fastest inference." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-max-vram", children: "Max GPU VRAM (GiB)" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-max-vram",
            className: fl,
            type: "number",
            min: 4,
            max: 128,
            step: 1,
            value: d.max_gpu_vram_gib ?? "",
            onChange: (N) => {
              const M = N.target.value, E = Math.round(Number(M));
              o(
                "max_gpu_vram_gib",
                M === "" || !Number.isFinite(E) ? void 0 : E
              );
            },
            placeholder: "No cap"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Hard ceiling for model/sequential offload. Set ~1 GiB below your card (e.g. 15 on a 16 GB GPU) to stop NVFP4 spilling into shared VRAM. Ignored under None." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-scheduler", children: "Scheduler" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-scheduler",
            className: fl,
            value: d.scheduler ?? "flow_match_euler",
            onChange: (N) => {
              const M = N.target.value;
              o(
                "scheduler",
                M === "flow_match_euler" ? void 0 : M
              );
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "flow_match_euler", children: "Flow-match Euler — distilled-LTX default" }),
              /* @__PURE__ */ s.jsx("option", { value: "flow_match_heun", children: "Flow-match Heun — ~30% slower, marginally higher quality" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Non-flow-matching schedulers (DDIM, DPM++, UniPC) are intentionally absent — they break on LTX-2.3." })
      ] }),
      /* @__PURE__ */ s.jsx(tg, { advanced: d, setAdvanced: o })
    ] })
  ] });
}
function tg({
  advanced: c,
  setAdvanced: y
}) {
  const d = c.component_placement ?? {}, o = d.transformer && d.transformer !== "auto" || d.vae && d.vae !== "auto" || d.text_encoder && d.text_encoder !== "auto", N = (E, C) => {
    const j = { ...d };
    C === "auto" ? delete j[E] : j[E] = C;
    const b = Object.keys(j).length === 0 || Object.values(j).every((U) => U === "auto" || U === void 0);
    y("component_placement", b ? void 0 : j);
  }, M = [
    d.transformer && d.transformer !== "auto" ? `T:${d.transformer}` : null,
    d.vae && d.vae !== "auto" ? `V:${d.vae}` : null,
    d.text_encoder && d.text_encoder !== "auto" ? `E:${d.text_encoder}` : null,
    c.quantization && c.quantization !== "none" ? `quant:${c.quantization}` : null
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ s.jsxs("details", { className: Ui, style: { marginTop: 10 }, children: [
    /* @__PURE__ */ s.jsxs("summary", { className: Ci, children: [
      "Pipeline tuning ",
      o ? "·" : "",
      " ",
      M ? /* @__PURE__ */ s.jsx("span", { className: ht, children: M }) : null
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: nu, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("span", { className: Gt, children: "Per-component placement" }),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Override where each pipeline component lives. Auto follows the offload preset; explicit values switch the worker away from offload hooks onto direct .to(device) placement." }),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "Transformer",
            value: d.transformer ?? "auto",
            onChange: (E) => N("transformer", E)
          }
        ),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "VAE",
            value: d.vae ?? "auto",
            onChange: (E) => N("vae", E)
          }
        ),
        /* @__PURE__ */ s.jsx(
          ss,
          {
            label: "Text encoder",
            value: d.text_encoder ?? "auto",
            onChange: (E) => N("text_encoder", E)
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-quantization", children: "Weight quantisation" }),
        /* @__PURE__ */ s.jsxs(
          "select",
          {
            id: "ltx-quantization",
            className: fl,
            value: c.quantization ?? "none",
            onChange: (E) => {
              const C = E.target.value;
              y("quantization", C === "none" ? void 0 : C);
            },
            children: [
              /* @__PURE__ */ s.jsx("option", { value: "none", children: "None — raw bf16 (~83 GB, 80 GB+ card)" }),
              /* @__PURE__ */ s.jsx("option", { value: "nf4", children: "NF4 (bnb 4-bit) — ~22 GB, 16 GB-card default" }),
              /* @__PURE__ */ s.jsx("option", { value: "int8", children: "INT8 (bnb 8-bit) — ~42 GB, higher fidelity" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
          "Quantises BOTH the LTX-2.3 transformer and the Gemma-3 text encoder at load. The shipped checkpoint is raw bf16 (~83 GB); nvfp4 defaults to NF4 so it runs on a 16 GB card. Requires",
          " ",
          /* @__PURE__ */ s.jsx("code", { children: "bitsandbytes" }),
          " in the worker venv."
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-decode-timestep", children: "Decode timestep" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-decode-timestep",
            className: fl,
            type: "number",
            min: 0,
            max: 1,
            step: 0.01,
            value: c.decode_timestep ?? "",
            onChange: (E) => {
              const C = E.target.value;
              y(
                "decode_timestep",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0.05 (pipeline default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Flow-matching trajectory decode point. 0.0–1.0. Lower → smoother motion at the cost of extra decoder work." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-image-cond-noise", children: "Image-conditioning noise" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-image-cond-noise",
            className: fl,
            type: "number",
            min: 0,
            max: 0.3,
            step: 5e-3,
            value: c.image_cond_noise_scale ?? "",
            onChange: (E) => {
              const C = E.target.value;
              y(
                "image_cond_noise_scale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0.025 (pipeline default)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Noise injected into the segment-chaining image latent. 0.0–0.3. Lower → sharper continuity across cuts (risk of stutter); higher → more creative drift." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
        /* @__PURE__ */ s.jsx("label", { className: Gt, htmlFor: "ltx-guidance-rescale", children: "Guidance rescale" }),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            id: "ltx-guidance-rescale",
            className: fl,
            type: "number",
            min: 0,
            max: 1,
            step: 0.05,
            value: c.guidance_rescale ?? "",
            onChange: (E) => {
              const C = E.target.value;
              y(
                "guidance_rescale",
                C === "" ? void 0 : Number(C)
              );
            },
            placeholder: "0 (off)"
          }
        ),
        /* @__PURE__ */ s.jsx("span", { className: ht, children: "Rescales CFG to avoid over-saturation when guidance scale is pushed above ~7. 0.0–1.0. Leave at 0 unless you see burnt highlights." })
      ] })
    ] })
  ] });
}
function ss({
  label: c,
  value: y,
  onChange: d
}) {
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 6
      },
      children: [
        /* @__PURE__ */ s.jsx("span", { style: { minWidth: 110, fontSize: 13 }, children: c }),
        ["auto", "cuda", "cpu"].map((o) => /* @__PURE__ */ s.jsxs(
          "label",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ s.jsx(
                "input",
                {
                  type: "radio",
                  name: `placement-${c}`,
                  value: o,
                  checked: y === o,
                  onChange: () => d(o)
                }
              ),
              o === "auto" ? "Auto" : o === "cuda" ? "GPU" : "CPU"
            ]
          },
          o
        ))
      ]
    }
  );
}
function lg({ plan: c }) {
  const y = c.vram_risk === "safe" ? nv : c.vram_risk === "moderate" ? uv : c.vram_risk === "risky" ? iv : cv;
  return /* @__PURE__ */ s.jsxs("div", { className: un, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ s.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ s.jsx("span", { className: ya, children: c.mode })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ s.jsx("span", { className: ya, children: c.segment_count })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ s.jsxs("span", { className: ya, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ s.jsxs("span", { className: ya, children: [
        c.base_fps,
        " → ",
        c.output_fps,
        " (",
        c.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ s.jsxs("span", { className: ya, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ s.jsxs("span", { className: ya, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ s.jsx("span", { className: y, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ s.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ s.jsx("span", { className: ya, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ s.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((d) => /* @__PURE__ */ s.jsxs("div", { className: uu, children: [
      /* @__PURE__ */ s.jsx("strong", { children: d.code }),
      ": ",
      d.message
    ] }, d.code)) }) : null
  ] });
}
function eg({
  run: c,
  onCancel: y,
  cancelling: d,
  onRetrySegment: o,
  retryingSegmentIndex: N,
  retryError: M
}) {
  if (!c)
    return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
      /* @__PURE__ */ s.jsx("h2", { className: au, children: "Output" }),
      /* @__PURE__ */ s.jsx("p", { className: Dy, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const E = c.status === "completed" || c.status === "failed" || c.status === "cancelled", C = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ s.jsxs("section", { className: un, children: [
    /* @__PURE__ */ s.jsxs("h2", { className: au, children: [
      "Render ",
      og(c.id)
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: ht, children: [
      "runtime: ",
      c.runtime_profile ?? "?",
      " · ",
      c.width,
      "×",
      c.height,
      " ·",
      " ",
      c.requested_duration_seconds.toFixed(1),
      "s"
    ] }),
    /* @__PURE__ */ s.jsx(ag, { run: c }),
    c.error_code ? /* @__PURE__ */ s.jsxs("div", { className: Sa, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ s.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    M ? /* @__PURE__ */ s.jsx("div", { className: Sa, role: "alert", "aria-live": "polite", children: M }) : null,
    /* @__PURE__ */ s.jsx(
      ng,
      {
        segments: c.segments,
        onRetry: C ? o : null,
        retryingSegmentIndex: N
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ s.jsx(sg, { artifactId: c.final_artifact_id }) : null,
    E ? null : /* @__PURE__ */ s.jsx("div", { className: cu, children: /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: Ey,
        onClick: y,
        disabled: d,
        "aria-busy": d,
        children: d ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function ag({ run: c }) {
  const y = ug(c), d = cg(c);
  return /* @__PURE__ */ s.jsxs("div", { className: Yt, children: [
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("strong", { children: c.status }),
            d,
            y ? /* @__PURE__ */ s.jsxs("span", { className: ht, children: [
              " · ",
              y
            ] }) : null
          ] }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            c.completed_segments,
            "/",
            c.segment_count,
            " segments ·",
            " ",
            c.progress_percent.toFixed(0),
            "%"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: zy, children: /* @__PURE__ */ s.jsx(
      "div",
      {
        className: xy,
        style: { width: `${Math.max(2, c.progress_percent)}%` }
      }
    ) })
  ] });
}
function ng({
  segments: c,
  onRetry: y,
  retryingSegmentIndex: d
}) {
  return /* @__PURE__ */ s.jsx("div", { className: Ty, children: c.map((o) => {
    const N = d === o.index, M = y !== null && o.status === "failed";
    return /* @__PURE__ */ s.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ s.jsx("span", { className: fg(o.status) }),
      /* @__PURE__ */ s.jsxs("span", { children: [
        "Segment ",
        o.index + 1,
        " · ",
        o.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: ht, children: o.status }),
      M ? /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: ji,
          onClick: () => y?.(o.index),
          disabled: d !== null,
          "aria-busy": N,
          "aria-label": `Retry segment ${o.index + 1}`,
          children: N ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, o.index);
  }) });
}
function ug(c) {
  if (c.status === "completed" || c.status === "failed" || c.status === "cancelled" || c.segment_count <= 0)
    return null;
  const y = c.segments.filter(
    (E) => E.status === "completed" && E.started_at && E.completed_at
  );
  if (y.length === 0)
    return null;
  const d = y.reduce((E, C) => {
    const j = Date.parse(C.started_at), b = Date.parse(C.completed_at);
    return !Number.isFinite(j) || !Number.isFinite(b) || b <= j ? E : E + (b - j);
  }, 0);
  if (d === 0)
    return null;
  const o = d / y.length, N = c.segment_count - c.completed_segments;
  if (N <= 0)
    return null;
  const M = N * o;
  return `~${ig(M)} remaining`;
}
function ig(c) {
  const y = Math.round(c / 1e3);
  if (y < 60)
    return `${y}s`;
  const d = Math.floor(y / 60), o = y % 60;
  if (d < 60)
    return o === 0 ? `${d}m` : `${d}m ${o}s`;
  const N = Math.floor(d / 60), M = d % 60;
  return `${N}h ${M}m`;
}
function cg(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const y = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, d = c.last_breach_reason?.trim(), o = d ? `VRAM supervisor breach: ${d}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ s.jsxs("span", { className: ht, "aria-live": "polite", title: o, children: [
    " · ",
    "restart ",
    c.restart_count,
    "/",
    y
  ] });
}
function fg(c) {
  switch (c) {
    case "queued":
      return ps;
    case "rendering":
      return fv;
    case "completed":
      return sv;
    case "failed":
      return ov;
    default:
      return ps;
  }
}
function sg({ artifactId: c }) {
  const y = Sy(c);
  return /* @__PURE__ */ s.jsxs("div", { className: Ay, children: [
    /* @__PURE__ */ s.jsx("video", { className: jy, src: y, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ s.jsx(
      "a",
      {
        className: Oy,
        href: y,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ s.jsxs("p", { className: ht, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function og(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const Mi = "ltx23-video-app", rg = new URL("./ltx23-video.css", import.meta.url).href;
class dv extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = G0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(y) {
    const d = document.createElement("link");
    d.rel = "stylesheet", d.href = rg, y.appendChild(d);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ s.jsx(G.StrictMode, { children: /* @__PURE__ */ s.jsx(Vy, {}) })
    );
  }
}
customElements.get(Mi) || customElements.define(Mi, dv);
function dg() {
  customElements.get(Mi) || customElements.define(Mi, dv);
}
export {
  dg as register
};
//# sourceMappingURL=ltx23-video.js.map
