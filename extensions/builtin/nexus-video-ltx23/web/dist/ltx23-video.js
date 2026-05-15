function x0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var wf = { exports: {} }, lu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Em;
function D0() {
  if (Em) return lu;
  Em = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.fragment");
  function v(s, A, R) {
    var D = null;
    if (R !== void 0 && (D = "" + R), A.key !== void 0 && (D = "" + A.key), "key" in A) {
      R = {};
      for (var B in A)
        B !== "key" && (R[B] = A[B]);
    } else R = A;
    return A = R.ref, {
      $$typeof: c,
      type: s,
      key: D,
      ref: A !== void 0 ? A : null,
      props: R
    };
  }
  return lu.Fragment = y, lu.jsx = v, lu.jsxs = v, lu;
}
var Tm;
function j0() {
  return Tm || (Tm = 1, wf.exports = D0()), wf.exports;
}
var r = j0(), $f = { exports: {} }, P = {};
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
function M0() {
  if (zm) return P;
  zm = 1;
  var c = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), D = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), z = Symbol.iterator;
  function C(m) {
    return m === null || typeof m != "object" ? null : (m = z && m[z] || m["@@iterator"], typeof m == "function" ? m : null);
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
  function ct(m, O, H) {
    this.props = m, this.context = O, this.refs = I, this.updater = H || Q;
  }
  ct.prototype.isReactComponent = {}, ct.prototype.setState = function(m, O) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, O, "setState");
  }, ct.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function V() {
  }
  V.prototype = ct.prototype;
  function bt(m, O, H) {
    this.props = m, this.context = O, this.refs = I, this.updater = H || Q;
  }
  var J = bt.prototype = new V();
  J.constructor = bt, W(J, ct.prototype), J.isPureReactComponent = !0;
  var tt = Array.isArray;
  function ut() {
  }
  var Z = { H: null, A: null, T: null, S: null }, pt = Object.prototype.hasOwnProperty;
  function nt(m, O, H) {
    var Y = H.ref;
    return {
      $$typeof: c,
      type: m,
      key: O,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function fl(m, O) {
    return nt(m.type, O, m.props);
  }
  function F(m) {
    return typeof m == "object" && m !== null && m.$$typeof === c;
  }
  function Dt(m) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(H) {
      return O[H];
    });
  }
  var sl = /\/+/g;
  function Xt(m, O) {
    return typeof m == "object" && m !== null && m.key != null ? Dt("" + m.key) : O.toString(36);
  }
  function Ft(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(ut, ut) : (m.status = "pending", m.then(
          function(O) {
            m.status === "pending" && (m.status = "fulfilled", m.value = O);
          },
          function(O) {
            m.status === "pending" && (m.status = "rejected", m.reason = O);
          }
        )), m.status) {
          case "fulfilled":
            return m.value;
          case "rejected":
            throw m.reason;
        }
    }
    throw m;
  }
  function E(m, O, H, Y, k) {
    var lt = typeof m;
    (lt === "undefined" || lt === "boolean") && (m = null);
    var it = !1;
    if (m === null) it = !0;
    else
      switch (lt) {
        case "bigint":
        case "string":
        case "number":
          it = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case c:
            case y:
              it = !0;
              break;
            case U:
              return it = m._init, E(
                it(m._payload),
                O,
                H,
                Y,
                k
              );
          }
      }
    if (it)
      return k = k(m), it = Y === "" ? "." + Xt(m, 0) : Y, tt(k) ? (H = "", it != null && (H = it.replace(sl, "$&/") + "/"), E(k, O, H, "", function(be) {
        return be;
      })) : k != null && (F(k) && (k = fl(
        k,
        H + (k.key == null || m && m.key === k.key ? "" : ("" + k.key).replace(
          sl,
          "$&/"
        ) + "/") + it
      )), O.push(k)), 1;
    it = 0;
    var Qt = Y === "" ? "." : Y + ":";
    if (tt(m))
      for (var Bt = 0; Bt < m.length; Bt++)
        Y = m[Bt], lt = Qt + Xt(Y, Bt), it += E(
          Y,
          O,
          H,
          lt,
          k
        );
    else if (Bt = C(m), typeof Bt == "function")
      for (m = Bt.call(m), Bt = 0; !(Y = m.next()).done; )
        Y = Y.value, lt = Qt + Xt(Y, Bt++), it += E(
          Y,
          O,
          H,
          lt,
          k
        );
    else if (lt === "object") {
      if (typeof m.then == "function")
        return E(
          Ft(m),
          O,
          H,
          Y,
          k
        );
      throw O = String(m), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return it;
  }
  function q(m, O, H) {
    if (m == null) return m;
    var Y = [], k = 0;
    return E(m, Y, "", "", function(lt) {
      return O.call(H, lt, k++);
    }), Y;
  }
  function w(m) {
    if (m._status === -1) {
      var O = m._result;
      O = O(), O.then(
        function(H) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = H);
        },
        function(H) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = H);
        }
      ), m._status === -1 && (m._status = 0, m._result = O);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var gt = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  }, vt = {
    map: q,
    forEach: function(m, O, H) {
      q(
        m,
        function() {
          O.apply(this, arguments);
        },
        H
      );
    },
    count: function(m) {
      var O = 0;
      return q(m, function() {
        O++;
      }), O;
    },
    toArray: function(m) {
      return q(m, function(O) {
        return O;
      }) || [];
    },
    only: function(m) {
      if (!F(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return P.Activity = M, P.Children = vt, P.Component = ct, P.Fragment = v, P.Profiler = A, P.PureComponent = bt, P.StrictMode = s, P.Suspense = j, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return Z.H.useMemoCache(m);
    }
  }, P.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(m, O, H) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var Y = W({}, m.props), k = m.key;
    if (O != null)
      for (lt in O.key !== void 0 && (k = "" + O.key), O)
        !pt.call(O, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && O.ref === void 0 || (Y[lt] = O[lt]);
    var lt = arguments.length - 2;
    if (lt === 1) Y.children = H;
    else if (1 < lt) {
      for (var it = Array(lt), Qt = 0; Qt < lt; Qt++)
        it[Qt] = arguments[Qt + 2];
      Y.children = it;
    }
    return nt(m.type, k, Y);
  }, P.createContext = function(m) {
    return m = {
      $$typeof: D,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: R,
      _context: m
    }, m;
  }, P.createElement = function(m, O, H) {
    var Y, k = {}, lt = null;
    if (O != null)
      for (Y in O.key !== void 0 && (lt = "" + O.key), O)
        pt.call(O, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (k[Y] = O[Y]);
    var it = arguments.length - 2;
    if (it === 1) k.children = H;
    else if (1 < it) {
      for (var Qt = Array(it), Bt = 0; Bt < it; Bt++)
        Qt[Bt] = arguments[Bt + 2];
      k.children = Qt;
    }
    if (m && m.defaultProps)
      for (Y in it = m.defaultProps, it)
        k[Y] === void 0 && (k[Y] = it[Y]);
    return nt(m, lt, k);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(m) {
    return { $$typeof: B, render: m };
  }, P.isValidElement = F, P.lazy = function(m) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: m },
      _init: w
    };
  }, P.memo = function(m, O) {
    return {
      $$typeof: p,
      type: m,
      compare: O === void 0 ? null : O
    };
  }, P.startTransition = function(m) {
    var O = Z.T, H = {};
    Z.T = H;
    try {
      var Y = m(), k = Z.S;
      k !== null && k(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(ut, gt);
    } catch (lt) {
      gt(lt);
    } finally {
      O !== null && H.types !== null && (O.types = H.types), Z.T = O;
    }
  }, P.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, P.use = function(m) {
    return Z.H.use(m);
  }, P.useActionState = function(m, O, H) {
    return Z.H.useActionState(m, O, H);
  }, P.useCallback = function(m, O) {
    return Z.H.useCallback(m, O);
  }, P.useContext = function(m) {
    return Z.H.useContext(m);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(m, O) {
    return Z.H.useDeferredValue(m, O);
  }, P.useEffect = function(m, O) {
    return Z.H.useEffect(m, O);
  }, P.useEffectEvent = function(m) {
    return Z.H.useEffectEvent(m);
  }, P.useId = function() {
    return Z.H.useId();
  }, P.useImperativeHandle = function(m, O, H) {
    return Z.H.useImperativeHandle(m, O, H);
  }, P.useInsertionEffect = function(m, O) {
    return Z.H.useInsertionEffect(m, O);
  }, P.useLayoutEffect = function(m, O) {
    return Z.H.useLayoutEffect(m, O);
  }, P.useMemo = function(m, O) {
    return Z.H.useMemo(m, O);
  }, P.useOptimistic = function(m, O) {
    return Z.H.useOptimistic(m, O);
  }, P.useReducer = function(m, O, H) {
    return Z.H.useReducer(m, O, H);
  }, P.useRef = function(m) {
    return Z.H.useRef(m);
  }, P.useState = function(m) {
    return Z.H.useState(m);
  }, P.useSyncExternalStore = function(m, O, H) {
    return Z.H.useSyncExternalStore(
      m,
      O,
      H
    );
  }, P.useTransition = function() {
    return Z.H.useTransition();
  }, P.version = "19.2.6", P;
}
var Am;
function Ri() {
  return Am || (Am = 1, $f.exports = M0()), $f.exports;
}
var G = Ri();
const gs = /* @__PURE__ */ x0(G);
var Wf = { exports: {} }, eu = {}, Ff = { exports: {} }, kf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nm;
function R0() {
  return Nm || (Nm = 1, (function(c) {
    function y(E, q) {
      var w = E.length;
      E.push(q);
      t: for (; 0 < w; ) {
        var gt = w - 1 >>> 1, vt = E[gt];
        if (0 < A(vt, q))
          E[gt] = q, E[w] = vt, w = gt;
        else break t;
      }
    }
    function v(E) {
      return E.length === 0 ? null : E[0];
    }
    function s(E) {
      if (E.length === 0) return null;
      var q = E[0], w = E.pop();
      if (w !== q) {
        E[0] = w;
        t: for (var gt = 0, vt = E.length, m = vt >>> 1; gt < m; ) {
          var O = 2 * (gt + 1) - 1, H = E[O], Y = O + 1, k = E[Y];
          if (0 > A(H, w))
            Y < vt && 0 > A(k, H) ? (E[gt] = k, E[Y] = w, gt = Y) : (E[gt] = H, E[O] = w, gt = O);
          else if (Y < vt && 0 > A(k, w))
            E[gt] = k, E[Y] = w, gt = Y;
          else break t;
        }
      }
      return q;
    }
    function A(E, q) {
      var w = E.sortIndex - q.sortIndex;
      return w !== 0 ? w : E.id - q.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      c.unstable_now = function() {
        return R.now();
      };
    } else {
      var D = Date, B = D.now();
      c.unstable_now = function() {
        return D.now() - B;
      };
    }
    var j = [], p = [], U = 1, M = null, z = 3, C = !1, Q = !1, W = !1, I = !1, ct = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, bt = typeof setImmediate < "u" ? setImmediate : null;
    function J(E) {
      for (var q = v(p); q !== null; ) {
        if (q.callback === null) s(p);
        else if (q.startTime <= E)
          s(p), q.sortIndex = q.expirationTime, y(j, q);
        else break;
        q = v(p);
      }
    }
    function tt(E) {
      if (W = !1, J(E), !Q)
        if (v(j) !== null)
          Q = !0, ut || (ut = !0, Dt());
        else {
          var q = v(p);
          q !== null && Ft(tt, q.startTime - E);
        }
    }
    var ut = !1, Z = -1, pt = 5, nt = -1;
    function fl() {
      return I ? !0 : !(c.unstable_now() - nt < pt);
    }
    function F() {
      if (I = !1, ut) {
        var E = c.unstable_now();
        nt = E;
        var q = !0;
        try {
          t: {
            Q = !1, W && (W = !1, V(Z), Z = -1), C = !0;
            var w = z;
            try {
              l: {
                for (J(E), M = v(j); M !== null && !(M.expirationTime > E && fl()); ) {
                  var gt = M.callback;
                  if (typeof gt == "function") {
                    M.callback = null, z = M.priorityLevel;
                    var vt = gt(
                      M.expirationTime <= E
                    );
                    if (E = c.unstable_now(), typeof vt == "function") {
                      M.callback = vt, J(E), q = !0;
                      break l;
                    }
                    M === v(j) && s(j), J(E);
                  } else s(j);
                  M = v(j);
                }
                if (M !== null) q = !0;
                else {
                  var m = v(p);
                  m !== null && Ft(
                    tt,
                    m.startTime - E
                  ), q = !1;
                }
              }
              break t;
            } finally {
              M = null, z = w, C = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Dt() : ut = !1;
        }
      }
    }
    var Dt;
    if (typeof bt == "function")
      Dt = function() {
        bt(F);
      };
    else if (typeof MessageChannel < "u") {
      var sl = new MessageChannel(), Xt = sl.port2;
      sl.port1.onmessage = F, Dt = function() {
        Xt.postMessage(null);
      };
    } else
      Dt = function() {
        ct(F, 0);
      };
    function Ft(E, q) {
      Z = ct(function() {
        E(c.unstable_now());
      }, q);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, c.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : pt = 0 < E ? Math.floor(1e3 / E) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, c.unstable_next = function(E) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = z;
      }
      var w = z;
      z = q;
      try {
        return E();
      } finally {
        z = w;
      }
    }, c.unstable_requestPaint = function() {
      I = !0;
    }, c.unstable_runWithPriority = function(E, q) {
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
      var w = z;
      z = E;
      try {
        return q();
      } finally {
        z = w;
      }
    }, c.unstable_scheduleCallback = function(E, q, w) {
      var gt = c.unstable_now();
      switch (typeof w == "object" && w !== null ? (w = w.delay, w = typeof w == "number" && 0 < w ? gt + w : gt) : w = gt, E) {
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
      return vt = w + vt, E = {
        id: U++,
        callback: q,
        priorityLevel: E,
        startTime: w,
        expirationTime: vt,
        sortIndex: -1
      }, w > gt ? (E.sortIndex = w, y(p, E), v(j) === null && E === v(p) && (W ? (V(Z), Z = -1) : W = !0, Ft(tt, w - gt))) : (E.sortIndex = vt, y(j, E), Q || C || (Q = !0, ut || (ut = !0, Dt()))), E;
    }, c.unstable_shouldYield = fl, c.unstable_wrapCallback = function(E) {
      var q = z;
      return function() {
        var w = z;
        z = q;
        try {
          return E.apply(this, arguments);
        } finally {
          z = w;
        }
      };
    };
  })(kf)), kf;
}
var Om;
function U0() {
  return Om || (Om = 1, Ff.exports = R0()), Ff.exports;
}
var If = { exports: {} }, nl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xm;
function C0() {
  if (xm) return nl;
  xm = 1;
  var c = Ri();
  function y(j) {
    var p = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        p += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + j + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v() {
  }
  var s = {
    d: {
      f: v,
      r: function() {
        throw Error(y(522));
      },
      D: v,
      C: v,
      L: v,
      m: v,
      X: v,
      S: v,
      M: v
    },
    p: 0,
    findDOMNode: null
  }, A = Symbol.for("react.portal");
  function R(j, p, U) {
    var M = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: A,
      key: M == null ? null : "" + M,
      children: j,
      containerInfo: p,
      implementation: U
    };
  }
  var D = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(j, p) {
    if (j === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return nl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, nl.createPortal = function(j, p) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(y(299));
    return R(j, p, null, U);
  }, nl.flushSync = function(j) {
    var p = D.T, U = s.p;
    try {
      if (D.T = null, s.p = 2, j) return j();
    } finally {
      D.T = p, s.p = U, s.d.f();
    }
  }, nl.preconnect = function(j, p) {
    typeof j == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(j, p));
  }, nl.prefetchDNS = function(j) {
    typeof j == "string" && s.d.D(j);
  }, nl.preinit = function(j, p) {
    if (typeof j == "string" && p && typeof p.as == "string") {
      var U = p.as, M = B(U, p.crossOrigin), z = typeof p.integrity == "string" ? p.integrity : void 0, C = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      U === "style" ? s.d.S(
        j,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: M,
          integrity: z,
          fetchPriority: C
        }
      ) : U === "script" && s.d.X(j, {
        crossOrigin: M,
        integrity: z,
        fetchPriority: C,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, nl.preinitModule = function(j, p) {
    if (typeof j == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var U = B(
            p.as,
            p.crossOrigin
          );
          s.d.M(j, {
            crossOrigin: U,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(j);
  }, nl.preload = function(j, p) {
    if (typeof j == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var U = p.as, M = B(U, p.crossOrigin);
      s.d.L(j, U, {
        crossOrigin: M,
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
  }, nl.preloadModule = function(j, p) {
    if (typeof j == "string")
      if (p) {
        var U = B(p.as, p.crossOrigin);
        s.d.m(j, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: U,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(j);
  }, nl.requestFormReset = function(j) {
    s.d.r(j);
  }, nl.unstable_batchedUpdates = function(j, p) {
    return j(p);
  }, nl.useFormState = function(j, p, U) {
    return D.H.useFormState(j, p, U);
  }, nl.useFormStatus = function() {
    return D.H.useHostTransitionStatus();
  }, nl.version = "19.2.6", nl;
}
var Dm;
function H0() {
  if (Dm) return If.exports;
  Dm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), If.exports = C0(), If.exports;
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
var jm;
function q0() {
  if (jm) return eu;
  jm = 1;
  var c = U0(), y = Ri(), v = H0();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function A(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function R(t) {
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
  function D(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function B(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function j(t) {
    if (R(t) !== t)
      throw Error(s(188));
  }
  function p(t) {
    var l = t.alternate;
    if (!l) {
      if (l = R(t), l === null) throw Error(s(188));
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
        throw Error(s(188));
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
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
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
  var M = Object.assign, z = Symbol.for("react.element"), C = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), ct = Symbol.for("react.profiler"), V = Symbol.for("react.consumer"), bt = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), tt = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), Z = Symbol.for("react.memo"), pt = Symbol.for("react.lazy"), nt = Symbol.for("react.activity"), fl = Symbol.for("react.memo_cache_sentinel"), F = Symbol.iterator;
  function Dt(t) {
    return t === null || typeof t != "object" ? null : (t = F && t[F] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var sl = Symbol.for("react.client.reference");
  function Xt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === sl ? null : t.displayName || t.name || null;
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
          return l = t.displayName || null, l !== null ? l : Xt(t.type) || "Memo";
        case pt:
          l = t._payload, t = t._init;
          try {
            return Xt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Ft = Array.isArray, E = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, w = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gt = [], vt = -1;
  function m(t) {
    return { current: t };
  }
  function O(t) {
    0 > vt || (t.current = gt[vt], gt[vt] = null, vt--);
  }
  function H(t, l) {
    vt++, gt[vt] = t.current, t.current = l;
  }
  var Y = m(null), k = m(null), lt = m(null), it = m(null);
  function Qt(t, l) {
    switch (H(lt, l), H(k, t), H(Y, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Kd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Kd(l), t = Jd(l, t);
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
    O(Y), H(Y, t);
  }
  function Bt() {
    O(Y), O(k), O(lt);
  }
  function be(t) {
    t.memoizedState !== null && H(it, t);
    var l = Y.current, e = Jd(l, t.type);
    l !== e && (H(k, t), H(Y, e));
  }
  function We(t) {
    k.current === t && (O(Y), O(k)), it.current === t && (O(it), kn._currentValue = w);
  }
  var cn, cu;
  function _l(t) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        cn = l && l[1] || "", cu = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + t + cu;
  }
  var ba = !1;
  function fu(t, l) {
    if (!t || ba) return "";
    ba = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var x = function() {
                throw Error();
              };
              if (Object.defineProperty(x.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(x, []);
                } catch (_) {
                  var b = _;
                }
                Reflect.construct(t, [], x);
              } else {
                try {
                  x.call();
                } catch (_) {
                  b = _;
                }
                t.call(x.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (_) {
                b = _;
              }
              (x = t()) && typeof x.catch == "function" && x.catch(function() {
              });
            }
          } catch (_) {
            if (_ && b && typeof _.stack == "string")
              return [_.stack, b.stack];
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
        var o = i.split(`
`), S = f.split(`
`);
        for (n = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < S.length && !S[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === o.length || n === S.length)
          for (a = o.length - 1, n = S.length - 1; 1 <= a && 0 <= n && o[a] !== S[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (o[a] !== S[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || o[a] !== S[n]) {
                  var T = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", t.displayName)), T;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ba = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? _l(e) : "";
  }
  function Tt(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return _l(t.type);
      case 16:
        return _l("Lazy");
      case 13:
        return t.child !== l && l !== null ? _l("Suspense Fallback") : _l("Suspense");
      case 19:
        return _l("SuspenseList");
      case 0:
      case 15:
        return fu(t.type, !1);
      case 11:
        return fu(t.type.render, !1);
      case 1:
        return fu(t.type, !0);
      case 31:
        return _l("Activity");
      default:
        return "";
    }
  }
  function Ht(t) {
    try {
      var l = "", e = null;
      do
        l += Tt(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var jt = Object.prototype.hasOwnProperty, Mt = c.unstable_scheduleCallback, rl = c.unstable_cancelCallback, dl = c.unstable_shouldYield, Lt = c.unstable_requestPaint, Rt = c.unstable_now, Fe = c.unstable_getCurrentPriorityLevel, pe = c.unstable_ImmediatePriority, fn = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, ml = c.unstable_LowPriority, Ml = c.unstable_IdlePriority, sn = c.log, Ui = c.unstable_setDisableYieldValue, kl = null, El = null;
  function _e(t) {
    if (typeof sn == "function" && Ui(t), El && typeof El.setStrictMode == "function")
      try {
        El.setStrictMode(kl, t);
      } catch {
      }
  }
  var Tl = Math.clz32 ? Math.clz32 : vv, dv = Math.log, mv = Math.LN2;
  function vv(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (dv(t) / mv | 0) | 0;
  }
  var su = 256, ou = 262144, ru = 4194304;
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
  function du(t, l, e) {
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
  function hv(t, l) {
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
  function As() {
    var t = ru;
    return ru <<= 1, (ru & 62914560) === 0 && (ru = 4194304), t;
  }
  function Ci(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function rn(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function yv(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var f = t.entanglements, o = t.expirationTimes, S = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Tl(e), x = 1 << T;
      f[T] = 0, o[T] = -1;
      var b = S[T];
      if (b !== null)
        for (S[T] = null, T = 0; T < b.length; T++) {
          var _ = b[T];
          _ !== null && (_.lane &= -536870913);
        }
      e &= ~x;
    }
    a !== 0 && Ns(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function Ns(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - Tl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Os(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - Tl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function xs(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Hi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Hi(t) {
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
  function qi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ds() {
    var t = q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : hm(t.type));
  }
  function js(t, l) {
    var e = q.p;
    try {
      return q.p = t, l();
    } finally {
      q.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Ee, vl = "__reactProps$" + Ee, pa = "__reactContainer$" + Ee, Bi = "__reactEvents$" + Ee, gv = "__reactListeners$" + Ee, Sv = "__reactHandles$" + Ee, Ms = "__reactResources$" + Ee, dn = "__reactMarker$" + Ee;
  function Yi(t) {
    delete t[Pt], delete t[vl], delete t[Bi], delete t[gv], delete t[Sv];
  }
  function _a(t) {
    var l = t[Pt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[pa] || e[Pt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Pd(t); t !== null; ) {
            if (e = t[Pt]) return e;
            t = Pd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ea(t) {
    if (t = t[Pt] || t[pa]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function mn(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Ta(t) {
    var l = t[Ms];
    return l || (l = t[Ms] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function kt(t) {
    t[dn] = !0;
  }
  var Rs = /* @__PURE__ */ new Set(), Us = {};
  function Pe(t, l) {
    za(t, l), za(t + "Capture", l);
  }
  function za(t, l) {
    for (Us[t] = l, t = 0; t < l.length; t++)
      Rs.add(l[t]);
  }
  var bv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Cs = {}, Hs = {};
  function pv(t) {
    return jt.call(Hs, t) ? !0 : jt.call(Cs, t) ? !1 : bv.test(t) ? Hs[t] = !0 : (Cs[t] = !0, !1);
  }
  function mu(t, l, e) {
    if (pv(l))
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
  function vu(t, l, e) {
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
  function Rl(t) {
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
  function qs(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function _v(t, l, e) {
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
  function Gi(t) {
    if (!t._valueTracker) {
      var l = qs(t) ? "checked" : "value";
      t._valueTracker = _v(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Bs(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = qs(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function hu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ev = /[\n"\\]/g;
  function Ul(t) {
    return t.replace(
      Ev,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Xi(t, l, e, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Rl(l)) : t.value !== "" + Rl(l) && (t.value = "" + Rl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? Qi(t, i, Rl(l)) : e != null ? Qi(t, i, Rl(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Rl(f) : t.removeAttribute("name");
  }
  function Ys(t, l, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        Gi(t);
        return;
      }
      e = e != null ? "" + Rl(e) : "", l = l != null ? "" + Rl(l) : e, f || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Gi(t);
  }
  function Qi(t, l, e) {
    l === "number" && hu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function Aa(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Rl(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Gs(t, l, e) {
    if (l != null && (l = "" + Rl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Rl(e) : "";
  }
  function Xs(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Ft(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Rl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Gi(t);
  }
  function Na(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Tv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Qs(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || Tv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Ls(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Qs(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Qs(t, u, l[u]);
  }
  function Li(t) {
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
  ]), Av = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yu(t) {
    return Av.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Pl() {
  }
  var Vi = null;
  function Zi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Oa = null, xa = null;
  function Vs(t) {
    var l = Ea(t);
    if (l && (t = l.stateNode)) {
      var e = t[vl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Xi(
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
              'input[name="' + Ul(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[vl] || null;
                if (!n) throw Error(s(90));
                Xi(
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
              a = e[l], a.form === t.form && Bs(a);
          }
          break t;
        case "textarea":
          Gs(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Aa(t, !!e.multiple, l, !1);
      }
    }
  }
  var Ki = !1;
  function Zs(t, l, e) {
    if (Ki) return t(l, e);
    Ki = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Ki = !1, (Oa !== null || xa !== null) && (ai(), Oa && (l = Oa, t = xa, xa = Oa = null, Vs(l), t)))
        for (l = 0; l < t.length; l++) Vs(t[l]);
    }
  }
  function vn(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[vl] || null;
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
        s(231, l, typeof e)
      );
    return e;
  }
  var te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ji = !1;
  if (te)
    try {
      var hn = {};
      Object.defineProperty(hn, "passive", {
        get: function() {
          Ji = !0;
        }
      }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
    } catch {
      Ji = !1;
    }
  var Te = null, wi = null, gu = null;
  function Ks() {
    if (gu) return gu;
    var t, l = wi, e = l.length, a, n = "value" in Te ? Te.value : Te.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return gu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Su(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function bu() {
    return !0;
  }
  function Js() {
    return !1;
  }
  function hl(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (e = t[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? bu : Js, this.isPropagationStopped = Js, this;
    }
    return M(l.prototype, {
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
  }, pu = hl(ta), yn = M({}, ta, { view: 0, detail: 0 }), Nv = hl(yn), $i, Wi, gn, _u = M({}, yn, {
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
    getModifierState: ki,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== gn && (gn && t.type === "mousemove" ? ($i = t.screenX - gn.screenX, Wi = t.screenY - gn.screenY) : Wi = $i = 0, gn = t), $i);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Wi;
    }
  }), ws = hl(_u), Ov = M({}, _u, { dataTransfer: 0 }), xv = hl(Ov), Dv = M({}, yn, { relatedTarget: 0 }), Fi = hl(Dv), jv = M({}, ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mv = hl(jv), Rv = M({}, ta, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Uv = hl(Rv), Cv = M({}, ta, { data: 0 }), $s = hl(Cv), Hv = {
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
  }, qv = {
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
  }, Bv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Bv[t]) ? !!l[t] : !1;
  }
  function ki() {
    return Yv;
  }
  var Gv = M({}, yn, {
    key: function(t) {
      if (t.key) {
        var l = Hv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Su(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? qv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ki,
    charCode: function(t) {
      return t.type === "keypress" ? Su(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Su(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Xv = hl(Gv), Qv = M({}, _u, {
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
  }), Ws = hl(Qv), Lv = M({}, yn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ki
  }), Vv = hl(Lv), Zv = M({}, ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Kv = hl(Zv), Jv = M({}, _u, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), wv = hl(Jv), $v = M({}, ta, {
    newState: 0,
    oldState: 0
  }), Wv = hl($v), Fv = [9, 13, 27, 32], Ii = te && "CompositionEvent" in window, Sn = null;
  te && "documentMode" in document && (Sn = document.documentMode);
  var kv = te && "TextEvent" in window && !Sn, Fs = te && (!Ii || Sn && 8 < Sn && 11 >= Sn), ks = " ", Is = !1;
  function Ps(t, l) {
    switch (t) {
      case "keyup":
        return Fv.indexOf(l.keyCode) !== -1;
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
  function to(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Da = !1;
  function Iv(t, l) {
    switch (t) {
      case "compositionend":
        return to(l);
      case "keypress":
        return l.which !== 32 ? null : (Is = !0, ks);
      case "textInput":
        return t = l.data, t === ks && Is ? null : t;
      default:
        return null;
    }
  }
  function Pv(t, l) {
    if (Da)
      return t === "compositionend" || !Ii && Ps(t, l) ? (t = Ks(), gu = wi = Te = null, Da = !1, t) : null;
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
        return Fs && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var th = {
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
  function lo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!th[t.type] : l === "textarea";
  }
  function eo(t, l, e, a) {
    Oa ? xa ? xa.push(a) : xa = [a] : Oa = a, l = oi(l, "onChange"), 0 < l.length && (e = new pu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var bn = null, pn = null;
  function lh(t) {
    Gd(t, 0);
  }
  function Eu(t) {
    var l = mn(t);
    if (Bs(l)) return t;
  }
  function ao(t, l) {
    if (t === "change") return l;
  }
  var no = !1;
  if (te) {
    var Pi;
    if (te) {
      var tc = "oninput" in document;
      if (!tc) {
        var uo = document.createElement("div");
        uo.setAttribute("oninput", "return;"), tc = typeof uo.oninput == "function";
      }
      Pi = tc;
    } else Pi = !1;
    no = Pi && (!document.documentMode || 9 < document.documentMode);
  }
  function io() {
    bn && (bn.detachEvent("onpropertychange", co), pn = bn = null);
  }
  function co(t) {
    if (t.propertyName === "value" && Eu(pn)) {
      var l = [];
      eo(
        l,
        pn,
        t,
        Zi(t)
      ), Zs(lh, l);
    }
  }
  function eh(t, l, e) {
    t === "focusin" ? (io(), bn = l, pn = e, bn.attachEvent("onpropertychange", co)) : t === "focusout" && io();
  }
  function ah(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Eu(pn);
  }
  function nh(t, l) {
    if (t === "click") return Eu(l);
  }
  function uh(t, l) {
    if (t === "input" || t === "change")
      return Eu(l);
  }
  function ih(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var zl = typeof Object.is == "function" ? Object.is : ih;
  function _n(t, l) {
    if (zl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!jt.call(l, n) || !zl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function fo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function so(t, l) {
    var e = fo(t);
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
      e = fo(e);
    }
  }
  function oo(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? oo(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function ro(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = hu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = hu(t.document);
    }
    return l;
  }
  function lc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var ch = te && "documentMode" in document && 11 >= document.documentMode, ja = null, ec = null, En = null, ac = !1;
  function mo(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    ac || ja == null || ja !== hu(a) || (a = ja, "selectionStart" in a && lc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), En && _n(En, a) || (En = a, a = oi(ec, "onSelect"), 0 < a.length && (l = new pu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ja)));
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
  }, nc = {}, vo = {};
  te && (vo = document.createElement("div").style, "AnimationEvent" in window || (delete Ma.animationend.animation, delete Ma.animationiteration.animation, delete Ma.animationstart.animation), "TransitionEvent" in window || delete Ma.transitionend.transition);
  function ea(t) {
    if (nc[t]) return nc[t];
    if (!Ma[t]) return t;
    var l = Ma[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in vo)
        return nc[t] = l[e];
    return t;
  }
  var ho = ea("animationend"), yo = ea("animationiteration"), go = ea("animationstart"), fh = ea("transitionrun"), sh = ea("transitionstart"), oh = ea("transitioncancel"), So = ea("transitionend"), bo = /* @__PURE__ */ new Map(), uc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  uc.push("scrollEnd");
  function Ll(t, l) {
    bo.set(t, l), Pe(l, [t]);
  }
  var Tu = typeof reportError == "function" ? reportError : function(t) {
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
  }, Cl = [], Ra = 0, ic = 0;
  function zu() {
    for (var t = Ra, l = ic = Ra = 0; l < t; ) {
      var e = Cl[l];
      Cl[l++] = null;
      var a = Cl[l];
      Cl[l++] = null;
      var n = Cl[l];
      Cl[l++] = null;
      var u = Cl[l];
      if (Cl[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && po(e, n, u);
    }
  }
  function Au(t, l, e, a) {
    Cl[Ra++] = t, Cl[Ra++] = l, Cl[Ra++] = e, Cl[Ra++] = a, ic |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function cc(t, l, e, a) {
    return Au(t, l, e, a), Nu(t);
  }
  function aa(t, l) {
    return Au(t, null, null, l), Nu(t);
  }
  function po(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - Tl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Nu(t) {
    if (50 < Zn)
      throw Zn = 0, gf = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ua = {};
  function rh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Al(t, l, e, a) {
    return new rh(t, l, e, a);
  }
  function fc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function le(t, l) {
    var e = t.alternate;
    return e === null ? (e = Al(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function _o(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Ou(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") fc(t) && (i = 1);
    else if (typeof t == "string")
      i = y0(
        t,
        e,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case nt:
          return t = Al(31, e, l, n), t.elementType = nt, t.lanes = u, t;
        case W:
          return na(e.children, n, u, l);
        case I:
          i = 8, n |= 24;
          break;
        case ct:
          return t = Al(12, e, l, n | 2), t.elementType = ct, t.lanes = u, t;
        case tt:
          return t = Al(13, e, l, n), t.elementType = tt, t.lanes = u, t;
        case ut:
          return t = Al(19, e, l, n), t.elementType = ut, t.lanes = u, t;
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
              case pt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = Al(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function na(t, l, e, a) {
    return t = Al(7, t, a, l), t.lanes = e, t;
  }
  function sc(t, l, e) {
    return t = Al(6, t, null, l), t.lanes = e, t;
  }
  function Eo(t) {
    var l = Al(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function oc(t, l, e) {
    return l = Al(
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
  var To = /* @__PURE__ */ new WeakMap();
  function Hl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = To.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ht(l)
      }, To.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ht(l)
    };
  }
  var Ca = [], Ha = 0, xu = null, Tn = 0, ql = [], Bl = 0, ze = null, Kl = 1, Jl = "";
  function ee(t, l) {
    Ca[Ha++] = Tn, Ca[Ha++] = xu, xu = t, Tn = l;
  }
  function zo(t, l, e) {
    ql[Bl++] = Kl, ql[Bl++] = Jl, ql[Bl++] = ze, ze = t;
    var a = Kl;
    t = Jl;
    var n = 32 - Tl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - Tl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Kl = 1 << 32 - Tl(l) + n | e << n | a, Jl = u + t;
    } else
      Kl = 1 << u | e << n | a, Jl = t;
  }
  function rc(t) {
    t.return !== null && (ee(t, 1), zo(t, 1, 0));
  }
  function dc(t) {
    for (; t === xu; )
      xu = Ca[--Ha], Ca[Ha] = null, Tn = Ca[--Ha], Ca[Ha] = null;
    for (; t === ze; )
      ze = ql[--Bl], ql[Bl] = null, Jl = ql[--Bl], ql[Bl] = null, Kl = ql[--Bl], ql[Bl] = null;
  }
  function Ao(t, l) {
    ql[Bl++] = Kl, ql[Bl++] = Jl, ql[Bl++] = ze, Kl = l.id, Jl = l.overflow, ze = t;
  }
  var tl = null, Ut = null, mt = !1, Ae = null, Yl = !1, mc = Error(s(519));
  function Ne(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw zn(Hl(l, t)), mc;
  }
  function No(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Pt] = t, l[vl] = a, e) {
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
        st("invalid", l), Ys(
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
        st("invalid", l), Xs(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Vd(l.textContent, e) ? (a.popover != null && (st("beforetoggle", l), st("toggle", l)), a.onScroll != null && st("scroll", l), a.onScrollEnd != null && st("scrollend", l), a.onClick != null && (l.onclick = Pl), l = !0) : l = !1, l || Ne(t, !0);
  }
  function Oo(t) {
    for (tl = t.return; tl; )
      switch (tl.tag) {
        case 5:
        case 31:
        case 13:
          Yl = !1;
          return;
        case 27:
        case 3:
          Yl = !0;
          return;
        default:
          tl = tl.return;
      }
  }
  function qa(t) {
    if (t !== tl) return !1;
    if (!mt) return Oo(t), mt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Rf(t.type, t.memoizedProps)), e = !e), e && Ut && Ne(t), Oo(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Ut = Id(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Ut = Id(t);
    } else
      l === 27 ? (l = Ut, Xe(t.type) ? (t = Bf, Bf = null, Ut = t) : Ut = l) : Ut = tl ? Xl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ua() {
    Ut = tl = null, mt = !1;
  }
  function vc() {
    var t = Ae;
    return t !== null && (bl === null ? bl = t : bl.push.apply(
      bl,
      t
    ), Ae = null), t;
  }
  function zn(t) {
    Ae === null ? Ae = [t] : Ae.push(t);
  }
  var hc = m(null), ia = null, ae = null;
  function Oe(t, l, e) {
    H(hc, l._currentValue), l._currentValue = e;
  }
  function ne(t) {
    t._currentValue = hc.current, O(hc);
  }
  function yc(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function gc(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var o = 0; o < l.length; o++)
            if (f.context === l[o]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), yc(
                u.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(s(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), yc(i, e, t), i = null;
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
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          zl(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === it.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(kn) : t = [kn]);
      }
      n = n.return;
    }
    t !== null && gc(
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
  function ll(t) {
    return xo(ia, t);
  }
  function ju(t, l) {
    return ia === null && ca(t), xo(t, l);
  }
  function xo(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, ae === null) {
      if (t === null) throw Error(s(308));
      ae = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else ae = ae.next = l;
    return e;
  }
  var dh = typeof AbortController < "u" ? AbortController : function() {
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
  }, mh = c.unstable_scheduleCallback, vh = c.unstable_NormalPriority, Kt = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Sc() {
    return {
      controller: new dh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function An(t) {
    t.refCount--, t.refCount === 0 && mh(vh, function() {
      t.controller.abort();
    });
  }
  var Nn = null, bc = 0, Ya = 0, Ga = null;
  function hh(t, l) {
    if (Nn === null) {
      var e = Nn = [];
      bc = 0, Ya = Tf(), Ga = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return bc++, l.then(Do, Do), l;
  }
  function Do() {
    if (--bc === 0 && Nn !== null) {
      Ga !== null && (Ga.status = "fulfilled");
      var t = Nn;
      Nn = null, Ya = 0, Ga = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function yh(t, l) {
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
  var jo = E.S;
  E.S = function(t, l) {
    md = Rt(), typeof l == "object" && l !== null && typeof l.then == "function" && hh(t, l), jo !== null && jo(t, l);
  };
  var fa = m(null);
  function pc() {
    var t = fa.current;
    return t !== null ? t : Ot.pooledCache;
  }
  function Mu(t, l) {
    l === null ? H(fa, fa.current) : H(fa, l.pool);
  }
  function Mo() {
    var t = pc();
    return t === null ? null : { parent: Kt._currentValue, pool: t };
  }
  var Xa = Error(s(460)), _c = Error(s(474)), Ru = Error(s(542)), Uu = { then: function() {
  } };
  function Ro(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Uo(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Pl, Pl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Ho(t), t;
      default:
        if (typeof l.status == "string") l.then(Pl, Pl);
        else {
          if (t = Ot, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
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
            throw t = l.reason, Ho(t), t;
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
  function Co() {
    if (oa === null) throw Error(s(459));
    var t = oa;
    return oa = null, t;
  }
  function Ho(t) {
    if (t === Xa || t === Ru)
      throw Error(s(483));
  }
  var Qa = null, On = 0;
  function Cu(t) {
    var l = On;
    return On += 1, Qa === null && (Qa = []), Uo(Qa, t, l);
  }
  function xn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Hu(t, l) {
    throw l.$$typeof === z ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function qo(t) {
    function l(h, d) {
      if (t) {
        var g = h.deletions;
        g === null ? (h.deletions = [d], h.flags |= 16) : g.push(d);
      }
    }
    function e(h, d) {
      if (!t) return null;
      for (; d !== null; )
        l(h, d), d = d.sibling;
      return null;
    }
    function a(h) {
      for (var d = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? d.set(h.key, h) : d.set(h.index, h), h = h.sibling;
      return d;
    }
    function n(h, d) {
      return h = le(h, d), h.index = 0, h.sibling = null, h;
    }
    function u(h, d, g) {
      return h.index = g, t ? (g = h.alternate, g !== null ? (g = g.index, g < d ? (h.flags |= 67108866, d) : g) : (h.flags |= 67108866, d)) : (h.flags |= 1048576, d);
    }
    function i(h) {
      return t && h.alternate === null && (h.flags |= 67108866), h;
    }
    function f(h, d, g, N) {
      return d === null || d.tag !== 6 ? (d = sc(g, h.mode, N), d.return = h, d) : (d = n(d, g), d.return = h, d);
    }
    function o(h, d, g, N) {
      var K = g.type;
      return K === W ? T(
        h,
        d,
        g.props.children,
        N,
        g.key
      ) : d !== null && (d.elementType === K || typeof K == "object" && K !== null && K.$$typeof === pt && sa(K) === d.type) ? (d = n(d, g.props), xn(d, g), d.return = h, d) : (d = Ou(
        g.type,
        g.key,
        g.props,
        null,
        h.mode,
        N
      ), xn(d, g), d.return = h, d);
    }
    function S(h, d, g, N) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== g.containerInfo || d.stateNode.implementation !== g.implementation ? (d = oc(g, h.mode, N), d.return = h, d) : (d = n(d, g.children || []), d.return = h, d);
    }
    function T(h, d, g, N, K) {
      return d === null || d.tag !== 7 ? (d = na(
        g,
        h.mode,
        N,
        K
      ), d.return = h, d) : (d = n(d, g), d.return = h, d);
    }
    function x(h, d, g) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = sc(
          "" + d,
          h.mode,
          g
        ), d.return = h, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case C:
            return g = Ou(
              d.type,
              d.key,
              d.props,
              null,
              h.mode,
              g
            ), xn(g, d), g.return = h, g;
          case Q:
            return d = oc(
              d,
              h.mode,
              g
            ), d.return = h, d;
          case pt:
            return d = sa(d), x(h, d, g);
        }
        if (Ft(d) || Dt(d))
          return d = na(
            d,
            h.mode,
            g,
            null
          ), d.return = h, d;
        if (typeof d.then == "function")
          return x(h, Cu(d), g);
        if (d.$$typeof === bt)
          return x(
            h,
            ju(h, d),
            g
          );
        Hu(h, d);
      }
      return null;
    }
    function b(h, d, g, N) {
      var K = d !== null ? d.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return K !== null ? null : f(h, d, "" + g, N);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case C:
            return g.key === K ? o(h, d, g, N) : null;
          case Q:
            return g.key === K ? S(h, d, g, N) : null;
          case pt:
            return g = sa(g), b(h, d, g, N);
        }
        if (Ft(g) || Dt(g))
          return K !== null ? null : T(h, d, g, N, null);
        if (typeof g.then == "function")
          return b(
            h,
            d,
            Cu(g),
            N
          );
        if (g.$$typeof === bt)
          return b(
            h,
            d,
            ju(h, g),
            N
          );
        Hu(h, g);
      }
      return null;
    }
    function _(h, d, g, N, K) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return h = h.get(g) || null, f(d, h, "" + N, K);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case C:
            return h = h.get(
              N.key === null ? g : N.key
            ) || null, o(d, h, N, K);
          case Q:
            return h = h.get(
              N.key === null ? g : N.key
            ) || null, S(d, h, N, K);
          case pt:
            return N = sa(N), _(
              h,
              d,
              g,
              N,
              K
            );
        }
        if (Ft(N) || Dt(N))
          return h = h.get(g) || null, T(d, h, N, K, null);
        if (typeof N.then == "function")
          return _(
            h,
            d,
            g,
            Cu(N),
            K
          );
        if (N.$$typeof === bt)
          return _(
            h,
            d,
            g,
            ju(d, N),
            K
          );
        Hu(d, N);
      }
      return null;
    }
    function X(h, d, g, N) {
      for (var K = null, ht = null, L = d, at = d = 0, rt = null; L !== null && at < g.length; at++) {
        L.index > at ? (rt = L, L = null) : rt = L.sibling;
        var yt = b(
          h,
          L,
          g[at],
          N
        );
        if (yt === null) {
          L === null && (L = rt);
          break;
        }
        t && L && yt.alternate === null && l(h, L), d = u(yt, d, at), ht === null ? K = yt : ht.sibling = yt, ht = yt, L = rt;
      }
      if (at === g.length)
        return e(h, L), mt && ee(h, at), K;
      if (L === null) {
        for (; at < g.length; at++)
          L = x(h, g[at], N), L !== null && (d = u(
            L,
            d,
            at
          ), ht === null ? K = L : ht.sibling = L, ht = L);
        return mt && ee(h, at), K;
      }
      for (L = a(L); at < g.length; at++)
        rt = _(
          L,
          h,
          at,
          g[at],
          N
        ), rt !== null && (t && rt.alternate !== null && L.delete(
          rt.key === null ? at : rt.key
        ), d = u(
          rt,
          d,
          at
        ), ht === null ? K = rt : ht.sibling = rt, ht = rt);
      return t && L.forEach(function(Ke) {
        return l(h, Ke);
      }), mt && ee(h, at), K;
    }
    function $(h, d, g, N) {
      if (g == null) throw Error(s(151));
      for (var K = null, ht = null, L = d, at = d = 0, rt = null, yt = g.next(); L !== null && !yt.done; at++, yt = g.next()) {
        L.index > at ? (rt = L, L = null) : rt = L.sibling;
        var Ke = b(h, L, yt.value, N);
        if (Ke === null) {
          L === null && (L = rt);
          break;
        }
        t && L && Ke.alternate === null && l(h, L), d = u(Ke, d, at), ht === null ? K = Ke : ht.sibling = Ke, ht = Ke, L = rt;
      }
      if (yt.done)
        return e(h, L), mt && ee(h, at), K;
      if (L === null) {
        for (; !yt.done; at++, yt = g.next())
          yt = x(h, yt.value, N), yt !== null && (d = u(yt, d, at), ht === null ? K = yt : ht.sibling = yt, ht = yt);
        return mt && ee(h, at), K;
      }
      for (L = a(L); !yt.done; at++, yt = g.next())
        yt = _(L, h, at, yt.value, N), yt !== null && (t && yt.alternate !== null && L.delete(yt.key === null ? at : yt.key), d = u(yt, d, at), ht === null ? K = yt : ht.sibling = yt, ht = yt);
      return t && L.forEach(function(O0) {
        return l(h, O0);
      }), mt && ee(h, at), K;
    }
    function Nt(h, d, g, N) {
      if (typeof g == "object" && g !== null && g.type === W && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case C:
            t: {
              for (var K = g.key; d !== null; ) {
                if (d.key === K) {
                  if (K = g.type, K === W) {
                    if (d.tag === 7) {
                      e(
                        h,
                        d.sibling
                      ), N = n(
                        d,
                        g.props.children
                      ), N.return = h, h = N;
                      break t;
                    }
                  } else if (d.elementType === K || typeof K == "object" && K !== null && K.$$typeof === pt && sa(K) === d.type) {
                    e(
                      h,
                      d.sibling
                    ), N = n(d, g.props), xn(N, g), N.return = h, h = N;
                    break t;
                  }
                  e(h, d);
                  break;
                } else l(h, d);
                d = d.sibling;
              }
              g.type === W ? (N = na(
                g.props.children,
                h.mode,
                N,
                g.key
              ), N.return = h, h = N) : (N = Ou(
                g.type,
                g.key,
                g.props,
                null,
                h.mode,
                N
              ), xn(N, g), N.return = h, h = N);
            }
            return i(h);
          case Q:
            t: {
              for (K = g.key; d !== null; ) {
                if (d.key === K)
                  if (d.tag === 4 && d.stateNode.containerInfo === g.containerInfo && d.stateNode.implementation === g.implementation) {
                    e(
                      h,
                      d.sibling
                    ), N = n(d, g.children || []), N.return = h, h = N;
                    break t;
                  } else {
                    e(h, d);
                    break;
                  }
                else l(h, d);
                d = d.sibling;
              }
              N = oc(g, h.mode, N), N.return = h, h = N;
            }
            return i(h);
          case pt:
            return g = sa(g), Nt(
              h,
              d,
              g,
              N
            );
        }
        if (Ft(g))
          return X(
            h,
            d,
            g,
            N
          );
        if (Dt(g)) {
          if (K = Dt(g), typeof K != "function") throw Error(s(150));
          return g = K.call(g), $(
            h,
            d,
            g,
            N
          );
        }
        if (typeof g.then == "function")
          return Nt(
            h,
            d,
            Cu(g),
            N
          );
        if (g.$$typeof === bt)
          return Nt(
            h,
            d,
            ju(h, g),
            N
          );
        Hu(h, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, d !== null && d.tag === 6 ? (e(h, d.sibling), N = n(d, g), N.return = h, h = N) : (e(h, d), N = sc(g, h.mode, N), N.return = h, h = N), i(h)) : e(h, d);
    }
    return function(h, d, g, N) {
      try {
        On = 0;
        var K = Nt(
          h,
          d,
          g,
          N
        );
        return Qa = null, K;
      } catch (L) {
        if (L === Xa || L === Ru) throw L;
        var ht = Al(29, L, null, h.mode);
        return ht.lanes = N, ht.return = h, ht;
      } finally {
      }
    };
  }
  var ra = qo(!0), Bo = qo(!1), xe = !1;
  function Ec(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function De(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function je(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (St & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Nu(t), po(t, null, e), l;
    }
    return Au(t, a, l, e), Nu(t);
  }
  function Dn(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Os(t, e);
    }
  }
  function zc(t, l) {
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
  function jn() {
    if (Ac) {
      var t = Ga;
      if (t !== null) throw t;
    }
  }
  function Mn(t, l, e, a) {
    Ac = !1;
    var n = t.updateQueue;
    xe = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var o = f, S = o.next;
      o.next = null, i === null ? u = S : i.next = S, i = o;
      var T = t.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = S : f.next = S, T.lastBaseUpdate = o));
    }
    if (u !== null) {
      var x = n.baseState;
      i = 0, T = S = o = null, f = u;
      do {
        var b = f.lane & -536870913, _ = b !== f.lane;
        if (_ ? (ot & b) === b : (a & b) === b) {
          b !== 0 && b === Ya && (Ac = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, $ = f;
            b = l;
            var Nt = e;
            switch ($.tag) {
              case 1:
                if (X = $.payload, typeof X == "function") {
                  x = X.call(Nt, x, b);
                  break t;
                }
                x = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = $.payload, b = typeof X == "function" ? X.call(Nt, x, b) : X, b == null) break t;
                x = M({}, x, b);
                break t;
              case 2:
                xe = !0;
            }
          }
          b = f.callback, b !== null && (t.flags |= 64, _ && (t.flags |= 8192), _ = n.callbacks, _ === null ? n.callbacks = [b] : _.push(b));
        } else
          _ = {
            lane: b,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, T === null ? (S = T = _, o = x) : T = T.next = _, i |= b;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          _ = f, f = _.next, _.next = null, n.lastBaseUpdate = _, n.shared.pending = null;
        }
      } while (!0);
      T === null && (o = x), n.baseState = o, n.firstBaseUpdate = S, n.lastBaseUpdate = T, u === null && (n.shared.lanes = 0), He |= i, t.lanes = i, t.memoizedState = x;
    }
  }
  function Yo(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function Go(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Yo(e[t], l);
  }
  var La = m(null), qu = m(0);
  function Xo(t, l) {
    t = me, H(qu, t), H(La, l), me = t | l.baseLanes;
  }
  function Nc() {
    H(qu, me), H(La, La.current);
  }
  function Oc() {
    me = qu.current, O(La), O(qu);
  }
  var Nl = m(null), Gl = null;
  function Me(t) {
    var l = t.alternate;
    H(Vt, Vt.current & 1), H(Nl, t), Gl === null && (l === null || La.current !== null || l.memoizedState !== null) && (Gl = t);
  }
  function xc(t) {
    H(Vt, Vt.current), H(Nl, t), Gl === null && (Gl = t);
  }
  function Qo(t) {
    t.tag === 22 ? (H(Vt, Vt.current), H(Nl, t), Gl === null && (Gl = t)) : Re();
  }
  function Re() {
    H(Vt, Vt.current), H(Nl, Nl.current);
  }
  function Ol(t) {
    O(Nl), Gl === t && (Gl = null), O(Vt);
  }
  var Vt = m(0);
  function Bu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Hf(e) || qf(e)))
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
  var ue = 0, et = null, zt = null, Jt = null, Yu = !1, Va = !1, da = !1, Gu = 0, Rn = 0, Za = null, gh = 0;
  function Yt() {
    throw Error(s(321));
  }
  function Dc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!zl(t[e], l[e])) return !1;
    return !0;
  }
  function jc(t, l, e, a, n, u) {
    return ue = u, et = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, E.H = t === null || t.memoizedState === null ? zr : Kc, da = !1, u = e(a, n), da = !1, Va && (u = Vo(
      l,
      e,
      a,
      n
    )), Lo(t), u;
  }
  function Lo(t) {
    E.H = Hn;
    var l = zt !== null && zt.next !== null;
    if (ue = 0, Jt = zt = et = null, Yu = !1, Rn = 0, Za = null, l) throw Error(s(300));
    t === null || wt || (t = t.dependencies, t !== null && Du(t) && (wt = !0));
  }
  function Vo(t, l, e, a) {
    et = t;
    var n = 0;
    do {
      if (Va && (Za = null), Rn = 0, Va = !1, 25 <= n) throw Error(s(301));
      if (n += 1, Jt = zt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      E.H = Ar, u = l(e, a);
    } while (Va);
    return u;
  }
  function Sh() {
    var t = E.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Un(l) : l, t = t.useState()[0], (zt !== null ? zt.memoizedState : null) !== t && (et.flags |= 1024), l;
  }
  function Mc() {
    var t = Gu !== 0;
    return Gu = 0, t;
  }
  function Rc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Uc(t) {
    if (Yu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Yu = !1;
    }
    ue = 0, Jt = zt = et = null, Va = !1, Rn = Gu = 0, Za = null;
  }
  function ol() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jt === null ? et.memoizedState = Jt = t : Jt = Jt.next = t, Jt;
  }
  function Zt() {
    if (zt === null) {
      var t = et.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = zt.next;
    var l = Jt === null ? et.memoizedState : Jt.next;
    if (l !== null)
      Jt = l, zt = t;
    else {
      if (t === null)
        throw et.alternate === null ? Error(s(467)) : Error(s(310));
      zt = t, t = {
        memoizedState: zt.memoizedState,
        baseState: zt.baseState,
        baseQueue: zt.baseQueue,
        queue: zt.queue,
        next: null
      }, Jt === null ? et.memoizedState = Jt = t : Jt = Jt.next = t;
    }
    return Jt;
  }
  function Xu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Un(t) {
    var l = Rn;
    return Rn += 1, Za === null && (Za = []), t = Uo(Za, t, l), l = et, (Jt === null ? l.memoizedState : Jt.next) === null && (l = l.alternate, E.H = l === null || l.memoizedState === null ? zr : Kc), t;
  }
  function Qu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Un(t);
      if (t.$$typeof === bt) return ll(t);
    }
    throw Error(s(438, String(t)));
  }
  function Cc(t) {
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
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Xu(), et.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = fl;
    return l.index++, e;
  }
  function ie(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Lu(t) {
    var l = Zt();
    return Hc(l, zt, t);
  }
  function Hc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
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
      var f = i = null, o = null, S = l, T = !1;
      do {
        var x = S.lane & -536870913;
        if (x !== S.lane ? (ot & x) === x : (ue & x) === x) {
          var b = S.revertLane;
          if (b === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), x === Ya && (T = !0);
          else if ((ue & b) === b) {
            S = S.next, b === Ya && (T = !0);
            continue;
          } else
            x = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, o === null ? (f = o = x, i = u) : o = o.next = x, et.lanes |= b, He |= b;
          x = S.action, da && e(u, x), u = S.hasEagerState ? S.eagerState : e(u, x);
        } else
          b = {
            lane: x,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, o === null ? (f = o = b, i = u) : o = o.next = b, et.lanes |= x, He |= x;
        S = S.next;
      } while (S !== null && S !== l);
      if (o === null ? i = u : o.next = f, !zl(u, t.memoizedState) && (wt = !0, T && (e = Ga, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function qc(t) {
    var l = Zt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      zl(u, l.memoizedState) || (wt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Zo(t, l, e) {
    var a = et, n = Zt(), u = mt;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !zl(
      (zt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, wt = !0), n = n.queue, Gc(wo.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || Jt !== null && Jt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        Jo.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Ot === null) throw Error(s(349));
      u || (ue & 127) !== 0 || Ko(a, l, e);
    }
    return e;
  }
  function Ko(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = et.updateQueue, l === null ? (l = Xu(), et.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Jo(t, l, e, a) {
    l.value = e, l.getSnapshot = a, $o(l) && Wo(t);
  }
  function wo(t, l, e) {
    return e(function() {
      $o(l) && Wo(t);
    });
  }
  function $o(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !zl(t, e);
    } catch {
      return !0;
    }
  }
  function Wo(t) {
    var l = aa(t, 2);
    l !== null && pl(l, t, 2);
  }
  function Bc(t) {
    var l = ol();
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
  function Fo(t, l, e, a) {
    return t.baseState = e, Hc(
      t,
      zt,
      typeof a == "function" ? a : ie
    );
  }
  function bh(t, l, e, a, n) {
    if (Ku(t)) throw Error(s(485));
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
      E.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, ko(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function ko(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = E.T, i = {};
      E.T = i;
      try {
        var f = e(n, a), o = E.S;
        o !== null && o(i, f), Io(t, l, f);
      } catch (S) {
        Yc(t, l, S);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), E.T = u;
      }
    } else
      try {
        u = e(n, a), Io(t, l, u);
      } catch (S) {
        Yc(t, l, S);
      }
  }
  function Io(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Po(t, l, a);
      },
      function(a) {
        return Yc(t, l, a);
      }
    ) : Po(t, l, e);
  }
  function Po(t, l, e) {
    l.status = "fulfilled", l.value = e, tr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, ko(t, e)));
  }
  function Yc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, tr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function tr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function lr(t, l) {
    return l;
  }
  function er(t, l) {
    if (mt) {
      var e = Ot.formState;
      if (e !== null) {
        t: {
          var a = et;
          if (mt) {
            if (Ut) {
              l: {
                for (var n = Ut, u = Yl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = Xl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ut = Xl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Ne(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = ol(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: lr,
      lastRenderedState: l
    }, e.queue = a, e = _r.bind(
      null,
      et,
      a
    ), a.dispatch = e, a = Bc(!1), u = Zc.bind(
      null,
      et,
      !1,
      a.queue
    ), a = ol(), n = {
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
  function ar(t) {
    var l = Zt();
    return nr(l, zt, t);
  }
  function nr(t, l, e) {
    if (l = Hc(
      t,
      l,
      lr
    )[0], t = Lu(ie)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Un(l);
      } catch (i) {
        throw i === Xa ? Ru : i;
      }
    else a = l;
    l = Zt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (et.flags |= 2048, Ka(
      9,
      { destroy: void 0 },
      ph.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function ph(t, l) {
    t.action = l;
  }
  function ur(t) {
    var l = Zt(), e = zt;
    if (e !== null)
      return nr(l, e, t);
    Zt(), l = l.memoizedState, e = Zt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Ka(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = et.updateQueue, l === null && (l = Xu(), et.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function ir() {
    return Zt().memoizedState;
  }
  function Vu(t, l, e, a) {
    var n = ol();
    et.flags |= t, n.memoizedState = Ka(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Zu(t, l, e, a) {
    var n = Zt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    zt !== null && a !== null && Dc(a, zt.memoizedState.deps) ? n.memoizedState = Ka(l, u, e, a) : (et.flags |= t, n.memoizedState = Ka(
      1 | l,
      u,
      e,
      a
    ));
  }
  function cr(t, l) {
    Vu(8390656, 8, t, l);
  }
  function Gc(t, l) {
    Zu(2048, 8, t, l);
  }
  function _h(t) {
    et.flags |= 4;
    var l = et.updateQueue;
    if (l === null)
      l = Xu(), et.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function fr(t) {
    var l = Zt().memoizedState;
    return _h({ ref: l, nextImpl: t }), function() {
      if ((St & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function sr(t, l) {
    return Zu(4, 2, t, l);
  }
  function or(t, l) {
    return Zu(4, 4, t, l);
  }
  function rr(t, l) {
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
  function dr(t, l, e) {
    e = e != null ? e.concat([t]) : null, Zu(4, 4, rr.bind(null, l, t), e);
  }
  function Xc() {
  }
  function mr(t, l) {
    var e = Zt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && Dc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function vr(t, l) {
    var e = Zt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && Dc(l, a[1]))
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
  function Qc(t, l, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (ot & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = hd(), et.lanes |= t, He |= t, e);
  }
  function hr(t, l, e, a) {
    return zl(e, l) ? e : La.current !== null ? (t = Qc(t, e, a), zl(t, l) || (wt = !0), t) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (ot & 261930) === 0 ? (wt = !0, t.memoizedState = e) : (t = hd(), et.lanes |= t, He |= t, l);
  }
  function yr(t, l, e, a, n) {
    var u = q.p;
    q.p = u !== 0 && 8 > u ? u : 8;
    var i = E.T, f = {};
    E.T = f, Zc(t, !1, l, e);
    try {
      var o = n(), S = E.S;
      if (S !== null && S(f, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var T = yh(
          o,
          a
        );
        Cn(
          t,
          l,
          T,
          jl(t)
        );
      } else
        Cn(
          t,
          l,
          a,
          jl(t)
        );
    } catch (x) {
      Cn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: x },
        jl()
      );
    } finally {
      q.p = u, i !== null && f.types !== null && (i.types = f.types), E.T = i;
    }
  }
  function Eh() {
  }
  function Lc(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = gr(t).queue;
    yr(
      t,
      n,
      l,
      w,
      e === null ? Eh : function() {
        return Sr(t), e(a);
      }
    );
  }
  function gr(t) {
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
  function Sr(t) {
    var l = gr(t);
    l.next === null && (l = t.alternate.memoizedState), Cn(
      t,
      l.next.queue,
      {},
      jl()
    );
  }
  function Vc() {
    return ll(kn);
  }
  function br() {
    return Zt().memoizedState;
  }
  function pr() {
    return Zt().memoizedState;
  }
  function Th(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = jl();
          t = De(e);
          var a = je(l, t, e);
          a !== null && (pl(a, l, e), Dn(a, l, e)), l = { cache: Sc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function zh(t, l, e) {
    var a = jl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ku(t) ? Er(l, e) : (e = cc(t, l, e, a), e !== null && (pl(e, t, a), Tr(e, l, a)));
  }
  function _r(t, l, e) {
    var a = jl();
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
    if (Ku(t)) Er(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, zl(f, i))
            return Au(t, l, n, 0), Ot === null && zu(), !1;
        } catch {
        } finally {
        }
      if (e = cc(t, l, n, a), e !== null)
        return pl(e, t, a), Tr(e, l, a), !0;
    }
    return !1;
  }
  function Zc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Tf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ku(t)) {
      if (l) throw Error(s(479));
    } else
      l = cc(
        t,
        e,
        a,
        2
      ), l !== null && pl(l, t, 2);
  }
  function Ku(t) {
    var l = t.alternate;
    return t === et || l !== null && l === et;
  }
  function Er(t, l) {
    Va = Yu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Tr(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Os(t, e);
    }
  }
  var Hn = {
    readContext: ll,
    use: Qu,
    useCallback: Yt,
    useContext: Yt,
    useEffect: Yt,
    useImperativeHandle: Yt,
    useLayoutEffect: Yt,
    useInsertionEffect: Yt,
    useMemo: Yt,
    useReducer: Yt,
    useRef: Yt,
    useState: Yt,
    useDebugValue: Yt,
    useDeferredValue: Yt,
    useTransition: Yt,
    useSyncExternalStore: Yt,
    useId: Yt,
    useHostTransitionStatus: Yt,
    useFormState: Yt,
    useActionState: Yt,
    useOptimistic: Yt,
    useMemoCache: Yt,
    useCacheRefresh: Yt
  };
  Hn.useEffectEvent = Yt;
  var zr = {
    readContext: ll,
    use: Qu,
    useCallback: function(t, l) {
      return ol().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: ll,
    useEffect: cr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Vu(
        4194308,
        4,
        rr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Vu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Vu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ol();
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
      var a = ol();
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
      var l = ol();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Bc(t);
      var l = t.queue, e = _r.bind(null, et, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Xc,
    useDeferredValue: function(t, l) {
      var e = ol();
      return Qc(e, t, l);
    },
    useTransition: function() {
      var t = Bc(!1);
      return t = yr.bind(
        null,
        et,
        t.queue,
        !0,
        !1
      ), ol().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = et, n = ol();
      if (mt) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), Ot === null)
          throw Error(s(349));
        (ot & 127) !== 0 || Ko(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, cr(wo.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Ka(
        9,
        { destroy: void 0 },
        Jo.bind(
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
      var t = ol(), l = Ot.identifierPrefix;
      if (mt) {
        var e = Jl, a = Kl;
        e = (a & ~(1 << 32 - Tl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Gu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = gh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Vc,
    useFormState: er,
    useActionState: er,
    useOptimistic: function(t) {
      var l = ol();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Zc.bind(
        null,
        et,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Cc,
    useCacheRefresh: function() {
      return ol().memoizedState = Th.bind(
        null,
        et
      );
    },
    useEffectEvent: function(t) {
      var l = ol(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((St & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Kc = {
    readContext: ll,
    use: Qu,
    useCallback: mr,
    useContext: ll,
    useEffect: Gc,
    useImperativeHandle: dr,
    useInsertionEffect: sr,
    useLayoutEffect: or,
    useMemo: vr,
    useReducer: Lu,
    useRef: ir,
    useState: function() {
      return Lu(ie);
    },
    useDebugValue: Xc,
    useDeferredValue: function(t, l) {
      var e = Zt();
      return hr(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Lu(ie)[0], l = Zt().memoizedState;
      return [
        typeof t == "boolean" ? t : Un(t),
        l
      ];
    },
    useSyncExternalStore: Zo,
    useId: br,
    useHostTransitionStatus: Vc,
    useFormState: ar,
    useActionState: ar,
    useOptimistic: function(t, l) {
      var e = Zt();
      return Fo(e, zt, t, l);
    },
    useMemoCache: Cc,
    useCacheRefresh: pr
  };
  Kc.useEffectEvent = fr;
  var Ar = {
    readContext: ll,
    use: Qu,
    useCallback: mr,
    useContext: ll,
    useEffect: Gc,
    useImperativeHandle: dr,
    useInsertionEffect: sr,
    useLayoutEffect: or,
    useMemo: vr,
    useReducer: qc,
    useRef: ir,
    useState: function() {
      return qc(ie);
    },
    useDebugValue: Xc,
    useDeferredValue: function(t, l) {
      var e = Zt();
      return zt === null ? Qc(e, t, l) : hr(
        e,
        zt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = qc(ie)[0], l = Zt().memoizedState;
      return [
        typeof t == "boolean" ? t : Un(t),
        l
      ];
    },
    useSyncExternalStore: Zo,
    useId: br,
    useHostTransitionStatus: Vc,
    useFormState: ur,
    useActionState: ur,
    useOptimistic: function(t, l) {
      var e = Zt();
      return zt !== null ? Fo(e, zt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Cc,
    useCacheRefresh: pr
  };
  Ar.useEffectEvent = fr;
  function Jc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : M({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var wc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = jl(), n = De(a);
      n.payload = l, e != null && (n.callback = e), l = je(t, n, a), l !== null && (pl(l, t, a), Dn(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = jl(), n = De(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = je(t, n, a), l !== null && (pl(l, t, a), Dn(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = jl(), a = De(e);
      a.tag = 2, l != null && (a.callback = l), l = je(t, a, e), l !== null && (pl(l, t, e), Dn(l, t, e));
    }
  };
  function Nr(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !_n(e, a) || !_n(n, u) : !0;
  }
  function Or(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && wc.enqueueReplaceState(l, l.state, null);
  }
  function ma(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = M({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function xr(t) {
    Tu(t);
  }
  function Dr(t) {
    console.error(t);
  }
  function jr(t) {
    Tu(t);
  }
  function Ju(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Mr(t, l, e) {
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
  function $c(t, l, e) {
    return e = De(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Ju(t, l);
    }, e;
  }
  function Rr(t) {
    return t = De(t), t.tag = 3, t;
  }
  function Ur(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Mr(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Mr(l, e, a), typeof n != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function Ah(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Ba(
        l,
        e,
        n,
        !0
      ), e = Nl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Gl === null ? ni() : e.alternate === null && Gt === 0 && (Gt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === Uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), pf(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === Uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), pf(t, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return pf(t, a, n), ni(), !1;
    }
    if (mt)
      return l = Nl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== mc && (t = Error(s(422), { cause: a }), zn(Hl(t, e)))) : (a !== mc && (l = Error(s(423), {
        cause: a
      }), zn(
        Hl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Hl(a, e), n = $c(
        t.stateNode,
        a,
        n
      ), zc(t, n), Gt !== 4 && (Gt = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Hl(u, e), Vn === null ? Vn = [u] : Vn.push(u), Gt !== 4 && (Gt = 2), l === null) return !0;
    a = Hl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = $c(e.stateNode, a, t), zc(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (qe === null || !qe.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Rr(n), Ur(
              n,
              t,
              e,
              a
            ), zc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Wc = Error(s(461)), wt = !1;
  function el(t, l, e, a) {
    l.child = t === null ? Bo(l, null, e, a) : ra(
      l,
      t.child,
      e,
      a
    );
  }
  function Cr(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return ca(l), a = jc(
      t,
      l,
      e,
      i,
      u,
      n
    ), f = Mc(), t !== null && !wt ? (Rc(t, l, n), ce(t, l, n)) : (mt && f && rc(l), l.flags |= 1, el(t, l, a, n), l.child);
  }
  function Hr(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !fc(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, qr(
        t,
        l,
        u,
        a,
        n
      )) : (t = Ou(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !af(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : _n, e(i, a) && t.ref === l.ref)
        return ce(t, l, n);
    }
    return l.flags |= 1, t = le(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function qr(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (_n(u, a) && t.ref === l.ref)
        if (wt = !1, l.pendingProps = a = u, af(t, n))
          (t.flags & 131072) !== 0 && (wt = !0);
        else
          return l.lanes = t.lanes, ce(t, l, n);
    }
    return Fc(
      t,
      l,
      e,
      a,
      n
    );
  }
  function Br(t, l, e, a) {
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
        return Yr(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Mu(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Xo(l, u) : Nc(), Qo(l);
      else
        return a = l.lanes = 536870912, Yr(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Mu(l, u.cachePool), Xo(l, u), Re(), l.memoizedState = null) : (t !== null && Mu(l, null), Nc(), Re());
    return el(t, l, n, e), l.child;
  }
  function qn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Yr(t, l, e, a, n) {
    var u = pc();
    return u = u === null ? null : { parent: Kt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Mu(l, null), Nc(), Qo(l), t !== null && Ba(t, l, a, !0), l.childLanes = n, null;
  }
  function wu(t, l) {
    return l = Wu(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Gr(t, l, e) {
    return ra(l, t.child, null, e), t = wu(l, l.pendingProps), t.flags |= 2, Ol(l), l.memoizedState = null, t;
  }
  function Nh(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (mt) {
        if (a.mode === "hidden")
          return t = wu(l, a), l.lanes = 536870912, qn(null, t);
        if (xc(l), (t = Ut) ? (t = kd(
          t,
          Yl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ze !== null ? { id: Kl, overflow: Jl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Eo(t), e.return = l, l.child = e, tl = l, Ut = null)) : t = null, t === null) throw Ne(l);
        return l.lanes = 536870912, null;
      }
      return wu(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (xc(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Gr(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (wt || Ba(t, l, e, !1), n = (e & t.childLanes) !== 0, wt || n) {
        if (a = Ot, a !== null && (i = xs(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, aa(t, i), pl(a, t, i), Wc;
        ni(), l = Gr(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Ut = Xl(i.nextSibling), tl = l, mt = !0, Ae = null, Yl = !1, t !== null && Ao(l, t), l = wu(l, a), l.flags |= 4096;
      return l;
    }
    return t = le(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function $u(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Fc(t, l, e, a, n) {
    return ca(l), e = jc(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = Mc(), t !== null && !wt ? (Rc(t, l, n), ce(t, l, n)) : (mt && a && rc(l), l.flags |= 1, el(t, l, e, n), l.child);
  }
  function Xr(t, l, e, a, n, u) {
    return ca(l), l.updateQueue = null, e = Vo(
      l,
      a,
      e,
      n
    ), Lo(t), a = Mc(), t !== null && !wt ? (Rc(t, l, u), ce(t, l, u)) : (mt && a && rc(l), l.flags |= 1, el(t, l, e, u), l.child);
  }
  function Qr(t, l, e, a, n) {
    if (ca(l), l.stateNode === null) {
      var u = Ua, i = e.contextType;
      typeof i == "object" && i !== null && (u = ll(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = wc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Ec(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? ll(i) : Ua, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Jc(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && wc.enqueueReplaceState(u, u.state, null), Mn(l, a, u, n), jn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var f = l.memoizedProps, o = ma(e, f);
      u.props = o;
      var S = u.context, T = e.contextType;
      i = Ua, typeof T == "object" && T !== null && (i = ll(T));
      var x = e.getDerivedStateFromProps;
      T = typeof x == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = l.pendingProps !== f, T || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || S !== i) && Or(
        l,
        u,
        a,
        i
      ), xe = !1;
      var b = l.memoizedState;
      u.state = b, Mn(l, a, u, n), jn(), S = l.memoizedState, f || b !== S || xe ? (typeof x == "function" && (Jc(
        l,
        e,
        x,
        a
      ), S = l.memoizedState), (o = xe || Nr(
        l,
        e,
        o,
        a,
        b,
        S,
        i
      )) ? (T || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = S), u.props = a, u.state = S, u.context = i, a = o) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, Tc(t, l), i = l.memoizedProps, T = ma(e, i), u.props = T, x = l.pendingProps, b = u.context, S = e.contextType, o = Ua, typeof S == "object" && S !== null && (o = ll(S)), f = e.getDerivedStateFromProps, (S = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== x || b !== o) && Or(
        l,
        u,
        a,
        o
      ), xe = !1, b = l.memoizedState, u.state = b, Mn(l, a, u, n), jn();
      var _ = l.memoizedState;
      i !== x || b !== _ || xe || t !== null && t.dependencies !== null && Du(t.dependencies) ? (typeof f == "function" && (Jc(
        l,
        e,
        f,
        a
      ), _ = l.memoizedState), (T = xe || Nr(
        l,
        e,
        T,
        a,
        b,
        _,
        o
      ) || t !== null && t.dependencies !== null && Du(t.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, _, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        _,
        o
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = _), u.props = a, u.state = _, u.context = o, a = T) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, $u(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = ra(
      l,
      t.child,
      null,
      n
    ), l.child = ra(
      l,
      null,
      e,
      n
    )) : el(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = ce(
      t,
      l,
      n
    ), t;
  }
  function Lr(t, l, e, a) {
    return ua(), l.flags |= 256, el(t, l, e, a), l.child;
  }
  var kc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ic(t) {
    return { baseLanes: t, cachePool: Mo() };
  }
  function Pc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Dl), t;
  }
  function Vr(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (mt) {
        if (n ? Me(l) : Re(), (t = Ut) ? (t = kd(
          t,
          Yl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ze !== null ? { id: Kl, overflow: Jl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Eo(t), e.return = l, l.child = e, tl = l, Ut = null)) : t = null, t === null) throw Ne(l);
        return qf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Re(), n = l.mode, f = Wu(
        { mode: "hidden", children: f },
        n
      ), a = na(
        a,
        n,
        e,
        null
      ), f.return = l, a.return = l, f.sibling = a, l.child = f, a = l.child, a.memoizedState = Ic(e), a.childLanes = Pc(
        t,
        i,
        e
      ), l.memoizedState = kc, qn(null, a)) : (Me(l), tf(l, f));
    }
    var o = t.memoizedState;
    if (o !== null && (f = o.dehydrated, f !== null)) {
      if (u)
        l.flags & 256 ? (Me(l), l.flags &= -257, l = lf(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Re(), l.child = t.child, l.flags |= 128, l = null) : (Re(), f = a.fallback, n = l.mode, a = Wu(
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
        ), a = l.child, a.memoizedState = Ic(e), a.childLanes = Pc(
          t,
          i,
          e
        ), l.memoizedState = kc, l = qn(null, a));
      else if (Me(l), qf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var S = i.dgst;
        i = S, a = Error(s(419)), a.stack = "", a.digest = i, zn({ value: a, source: null, stack: null }), l = lf(
          t,
          l,
          e
        );
      } else if (wt || Ba(t, l, e, !1), i = (e & t.childLanes) !== 0, wt || i) {
        if (i = Ot, i !== null && (a = xs(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, aa(t, a), pl(i, t, a), Wc;
        Hf(f) || ni(), l = lf(
          t,
          l,
          e
        );
      } else
        Hf(f) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, Ut = Xl(
          f.nextSibling
        ), tl = l, mt = !0, Ae = null, Yl = !1, t !== null && Ao(l, t), l = tf(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (Re(), f = a.fallback, n = l.mode, o = t.child, S = o.sibling, a = le(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, S !== null ? f = le(
      S,
      f
    ) : (f = na(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = l, a.return = l, a.sibling = f, l.child = a, qn(null, a), a = l.child, f = t.child.memoizedState, f === null ? f = Ic(e) : (n = f.cachePool, n !== null ? (o = Kt._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = Mo(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = Pc(
      t,
      i,
      e
    ), l.memoizedState = kc, qn(t.child, a)) : (Me(l), e = t.child, t = e.sibling, e = le(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function tf(t, l) {
    return l = Wu(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Wu(t, l) {
    return t = Al(22, t, null, l), t.lanes = 0, t;
  }
  function lf(t, l, e) {
    return ra(l, t.child, null, e), t = tf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Zr(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), yc(t.return, l, e);
  }
  function ef(t, l, e, a, n, u) {
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
  function Kr(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Vt.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, H(Vt, i), el(t, l, a, e), a = mt ? Tn : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Zr(t, e, l);
        else if (t.tag === 19)
          Zr(t, e, l);
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
          t = e.alternate, t !== null && Bu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), ef(
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
          if (t = n.alternate, t !== null && Bu(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        ef(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        ef(
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
      throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, e = le(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = le(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function af(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Du(t)));
  }
  function Oh(t, l, e) {
    switch (l.tag) {
      case 3:
        Qt(l, l.stateNode.containerInfo), Oe(l, Kt, t.memoizedState.cache), ua();
        break;
      case 27:
      case 5:
        be(l);
        break;
      case 4:
        Qt(l, l.stateNode.containerInfo);
        break;
      case 10:
        Oe(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, xc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Me(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Vr(t, l, e) : (Me(l), t = ce(
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
            return Kr(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), H(Vt, Vt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Br(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Oe(l, Kt, t.memoizedState.cache);
    }
    return ce(t, l, e);
  }
  function Jr(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        wt = !0;
      else {
        if (!af(t, e) && (l.flags & 128) === 0)
          return wt = !1, Oh(
            t,
            l,
            e
          );
        wt = (t.flags & 131072) !== 0;
      }
    else
      wt = !1, mt && (l.flags & 1048576) !== 0 && zo(l, Tn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = sa(l.elementType), l.type = t, typeof t == "function")
            fc(t) ? (a = ma(t, a), l.tag = 1, l = Qr(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Fc(
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
                l.tag = 11, l = Cr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === Z) {
                l.tag = 14, l = Hr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Xt(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return Fc(
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
        ), Qr(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Qt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, Tc(t, l), Mn(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, Oe(l, Kt, a), a !== u.cache && gc(
            l,
            [Kt],
            e,
            !0
          ), jn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = Lr(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = Hl(
                Error(s(424)),
                l
              ), zn(n), l = Lr(
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
              for (Ut = Xl(t.firstChild), tl = l, mt = !0, Ae = null, Yl = !0, e = Bo(
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
            el(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return $u(t, l), t === null ? (e = am(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : mt || (e = l.type, t = l.pendingProps, a = ri(
          lt.current
        ).createElement(e), a[Pt] = l, a[vl] = t, al(a, e, t), kt(a), l.stateNode = a) : l.memoizedState = am(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return be(l), t === null && mt && (a = l.stateNode = tm(
          l.type,
          l.pendingProps,
          lt.current
        ), tl = l, Yl = !0, n = Ut, Xe(l.type) ? (Bf = n, Ut = Xl(a.firstChild)) : Ut = n), el(
          t,
          l,
          l.pendingProps.children,
          e
        ), $u(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && mt && ((n = a = Ut) && (a = a0(
          a,
          l.type,
          l.pendingProps,
          Yl
        ), a !== null ? (l.stateNode = a, tl = l, Ut = Xl(a.firstChild), Yl = !1, n = !0) : n = !1), n || Ne(l)), be(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Rf(n, u) ? a = null : i !== null && Rf(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = jc(
          t,
          l,
          Sh,
          null,
          null,
          e
        ), kn._currentValue = n), $u(t, l), el(t, l, a, e), l.child;
      case 6:
        return t === null && mt && ((t = e = Ut) && (e = n0(
          e,
          l.pendingProps,
          Yl
        ), e !== null ? (l.stateNode = e, tl = l, Ut = null, t = !0) : t = !1), t || Ne(l)), null;
      case 13:
        return Vr(t, l, e);
      case 4:
        return Qt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = ra(
          l,
          null,
          a,
          e
        ) : el(t, l, a, e), l.child;
      case 11:
        return Cr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return el(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return el(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return el(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, Oe(l, l.type, a.value), el(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, ca(l), n = ll(n), a = a(n), l.flags |= 1, el(t, l, a, e), l.child;
      case 14:
        return Hr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return qr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Kr(t, l, e);
      case 31:
        return Nh(t, l, e);
      case 22:
        return Br(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return ca(l), a = ll(Kt), t === null ? (n = pc(), n === null && (n = Ot, u = Sc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Ec(l), Oe(l, Kt, n)) : ((t.lanes & e) !== 0 && (Tc(t, l), Mn(l, null, null, e), jn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), Oe(l, Kt, a)) : (a = u.cache, Oe(l, Kt, a), a !== n.cache && gc(
          l,
          [Kt],
          e,
          !0
        ))), el(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function fe(t) {
    t.flags |= 4;
  }
  function nf(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (bd()) t.flags |= 8192;
        else
          throw oa = Uu, _c;
    } else t.flags &= -16777217;
  }
  function wr(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !fm(l))
      if (bd()) t.flags |= 8192;
      else
        throw oa = Uu, _c;
  }
  function Fu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? As() : 536870912, t.lanes |= l, Wa |= l);
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
  function xh(t, l, e) {
    var a = l.pendingProps;
    switch (dc(l), l.tag) {
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
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), ne(Kt), Bt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (qa(l) ? fe(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, vc())), Ct(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (fe(l), u !== null ? (Ct(l), wr(l, u)) : (Ct(l), nf(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (fe(l), Ct(l), wr(l, u)) : (Ct(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && fe(l), Ct(l), nf(
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
              throw Error(s(166));
            return Ct(l), null;
          }
          t = Y.current, qa(l) ? No(l) : (t = tm(n, a, e), l.stateNode = t, fe(l));
        }
        return Ct(l), null;
      case 5:
        if (We(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && fe(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ct(l), null;
          }
          if (u = Y.current, qa(l))
            No(l);
          else {
            var i = ri(
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
            u[Pt] = l, u[vl] = a;
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
            t: switch (al(u, n, a), n) {
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
        return Ct(l), nf(
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
            throw Error(s(166));
          if (t = lt.current, qa(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = tl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Pt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Vd(t.nodeValue, e)), t || Ne(l, !0);
          } else
            t = ri(t).createTextNode(
              a
            ), t[Pt] = l, l.stateNode = t;
        }
        return Ct(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = qa(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Pt] = l;
            } else
              ua(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ct(l), t = !1;
          } else
            e = vc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Ol(l), l) : (Ol(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ct(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = qa(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Pt] = l;
            } else
              ua(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ct(l), n = !1;
          } else
            n = vc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (Ol(l), l) : (Ol(l), null);
        }
        return Ol(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Fu(l, l.updateQueue), Ct(l), null);
      case 4:
        return Bt(), t === null && Of(l.stateNode.containerInfo), Ct(l), null;
      case 10:
        return ne(l.type), Ct(l), null;
      case 19:
        if (O(Vt), a = l.memoizedState, a === null) return Ct(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Bn(a, !1);
          else {
            if (Gt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = Bu(t), u !== null) {
                  for (l.flags |= 128, Bn(a, !1), t = u.updateQueue, l.updateQueue = t, Fu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    _o(e, t), e = e.sibling;
                  return H(
                    Vt,
                    Vt.current & 1 | 2
                  ), mt && ee(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Rt() > li && (l.flags |= 128, n = !0, Bn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Bu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, Fu(l, t), Bn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !mt)
                return Ct(l), null;
            } else
              2 * Rt() - a.renderingStartTime > li && e !== 536870912 && (l.flags |= 128, n = !0, Bn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Rt(), t.sibling = null, e = Vt.current, H(
          Vt,
          n ? e & 1 | 2 : e & 1
        ), mt && ee(l, a.treeForkCount), t) : (Ct(l), null);
      case 22:
      case 23:
        return Ol(l), Oc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ct(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ct(l), e = l.updateQueue, e !== null && Fu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && O(fa), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), ne(Kt), Ct(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function Dh(t, l) {
    switch (dc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return ne(Kt), Bt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return We(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Ol(l), l.alternate === null)
            throw Error(s(340));
          ua();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Ol(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          ua();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return O(Vt), null;
      case 4:
        return Bt(), null;
      case 10:
        return ne(l.type), null;
      case 22:
      case 23:
        return Ol(l), Oc(), t !== null && O(fa), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return ne(Kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function $r(t, l) {
    switch (dc(l), l.tag) {
      case 3:
        ne(Kt), Bt();
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
        l.memoizedState !== null && Ol(l);
        break;
      case 13:
        Ol(l);
        break;
      case 19:
        O(Vt);
        break;
      case 10:
        ne(l.type);
        break;
      case 22:
      case 23:
        Ol(l), Oc(), t !== null && O(fa);
        break;
      case 24:
        ne(Kt);
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
      Et(l, l.return, f);
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
              var o = e, S = f;
              try {
                S();
              } catch (T) {
                Et(
                  n,
                  o,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (T) {
      Et(l, l.return, T);
    }
  }
  function Wr(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Go(l, e);
      } catch (a) {
        Et(t, t.return, a);
      }
    }
  }
  function Fr(t, l, e) {
    e.props = ma(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Et(t, l, a);
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
      Et(t, l, n);
    }
  }
  function wl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Et(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          Et(t, l, n);
        }
      else e.current = null;
  }
  function kr(t) {
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
      Et(t, t.return, n);
    }
  }
  function uf(t, l, e) {
    try {
      var a = t.stateNode;
      kh(a, t.type, e, l), a[vl] = l;
    } catch (n) {
      Et(t, t.return, n);
    }
  }
  function Ir(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Xe(t.type) || t.tag === 4;
  }
  function cf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ir(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Xe(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ff(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Pl));
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (ff(t, l, e), t = t.sibling; t !== null; )
        ff(t, l, e), t = t.sibling;
  }
  function ku(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (ku(t, l, e), t = t.sibling; t !== null; )
        ku(t, l, e), t = t.sibling;
  }
  function Pr(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      al(l, a, e), l[Pt] = t, l[vl] = e;
    } catch (u) {
      Et(t, t.return, u);
    }
  }
  var se = !1, $t = !1, sf = !1, td = typeof WeakSet == "function" ? WeakSet : Set, It = null;
  function jh(t, l) {
    if (t = t.containerInfo, jf = Si, t = ro(t), lc(t)) {
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
            var i = 0, f = -1, o = -1, S = 0, T = 0, x = t, b = null;
            l: for (; ; ) {
              for (var _; x !== e || n !== 0 && x.nodeType !== 3 || (f = i + n), x !== u || a !== 0 && x.nodeType !== 3 || (o = i + a), x.nodeType === 3 && (i += x.nodeValue.length), (_ = x.firstChild) !== null; )
                b = x, x = _;
              for (; ; ) {
                if (x === t) break l;
                if (b === e && ++S === n && (f = i), b === u && ++T === a && (o = i), (_ = x.nextSibling) !== null) break;
                x = b, b = x.parentNode;
              }
              x = _;
            }
            e = f === -1 || o === -1 ? null : { start: f, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Mf = { focusedElem: t, selectionRange: e }, Si = !1, It = l; It !== null; )
      if (l = It, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, It = t;
      else
        for (; It !== null; ) {
          switch (l = It, u = l.alternate, t = l.flags, l.tag) {
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
                  Et(
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
                  Cf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Cf(t);
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
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, It = t;
            break;
          }
          It = l.return;
        }
  }
  function ld(t, l, e) {
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
              Et(e, e.return, i);
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
              Et(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Wr(e), a & 512 && Gn(e, e.return);
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
            Go(t, l);
          } catch (i) {
            Et(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Pr(e);
      case 26:
      case 5:
        re(t, e), l === null && a & 4 && kr(e), a & 512 && Gn(e, e.return);
        break;
      case 12:
        re(t, e);
        break;
      case 31:
        re(t, e), a & 4 && nd(t, e);
        break;
      case 13:
        re(t, e), a & 4 && ud(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Gh.bind(
          null,
          e
        ), u0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || se, !a) {
          l = l !== null && l.memoizedState !== null || $t, n = se;
          var u = $t;
          se = a, ($t = l) && !u ? de(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : re(t, e), se = n, $t = u;
        }
        break;
      case 30:
        break;
      default:
        re(t, e);
    }
  }
  function ed(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, ed(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Yi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, yl = !1;
  function oe(t, l, e) {
    for (e = e.child; e !== null; )
      ad(t, l, e), e = e.sibling;
  }
  function ad(t, l, e) {
    if (El && typeof El.onCommitFiberUnmount == "function")
      try {
        El.onCommitFiberUnmount(kl, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        $t || wl(e, l), oe(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        $t || wl(e, l);
        var a = qt, n = yl;
        Xe(e.type) && (qt = e.stateNode, yl = !1), oe(
          t,
          l,
          e
        ), $n(e.stateNode), qt = a, yl = n;
        break;
      case 5:
        $t || wl(e, l);
      case 6:
        if (a = qt, n = yl, qt = null, oe(
          t,
          l,
          e
        ), qt = a, yl = n, qt !== null)
          if (yl)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode);
            } catch (u) {
              Et(
                e,
                l,
                u
              );
            }
          else
            try {
              qt.removeChild(e.stateNode);
            } catch (u) {
              Et(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        qt !== null && (yl ? (t = qt, Wd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), an(t)) : Wd(qt, e.stateNode));
        break;
      case 4:
        a = qt, n = yl, qt = e.stateNode.containerInfo, yl = !0, oe(
          t,
          l,
          e
        ), qt = a, yl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, l), $t || Ue(4, e, l), oe(
          t,
          l,
          e
        );
        break;
      case 1:
        $t || (wl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Fr(
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
        $t = (a = $t) || e.memoizedState !== null, oe(
          t,
          l,
          e
        ), $t = a;
        break;
      default:
        oe(
          t,
          l,
          e
        );
    }
  }
  function nd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        an(t);
      } catch (e) {
        Et(l, l.return, e);
      }
    }
  }
  function ud(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        an(t);
      } catch (e) {
        Et(l, l.return, e);
      }
  }
  function Mh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new td()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new td()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Iu(t, l) {
    var e = Mh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Xh.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function gl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, i = l, f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Xe(f.type)) {
                qt = f.stateNode, yl = !1;
                break t;
              }
              break;
            case 5:
              qt = f.stateNode, yl = !1;
              break t;
            case 3:
            case 4:
              qt = f.stateNode.containerInfo, yl = !0;
              break t;
          }
          f = f.return;
        }
        if (qt === null) throw Error(s(160));
        ad(u, i, n), qt = null, yl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        id(l, t), l = l.sibling;
  }
  var Vl = null;
  function id(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        gl(l, t), Sl(t), a & 4 && (Ue(3, t, t.return), Yn(3, t), Ue(5, t, t.return));
        break;
      case 1:
        gl(l, t), Sl(t), a & 512 && ($t || e === null || wl(e, e.return)), a & 64 && se && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Vl;
        if (gl(l, t), Sl(t), a & 512 && ($t || e === null || wl(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[dn] || u[Pt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), al(u, a, e), u[Pt] = t, kt(u), a = u;
                      break t;
                    case "link":
                      var i = im(
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
                      u = n.createElement(a), al(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = im(
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
                      u = n.createElement(a), al(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[Pt] = t, kt(u), a = u;
                }
                t.stateNode = a;
              } else
                cm(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = um(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? cm(
              n,
              t.type,
              t.stateNode
            ) : um(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && uf(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        gl(l, t), Sl(t), a & 512 && ($t || e === null || wl(e, e.return)), e !== null && a & 4 && uf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (gl(l, t), Sl(t), a & 512 && ($t || e === null || wl(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            Na(n, "");
          } catch (X) {
            Et(t, t.return, X);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, uf(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (sf = !0);
        break;
      case 6:
        if (gl(l, t), Sl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (X) {
            Et(t, t.return, X);
          }
        }
        break;
      case 3:
        if (vi = null, n = Vl, Vl = di(l.containerInfo), gl(l, t), Vl = n, Sl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            an(l.containerInfo);
          } catch (X) {
            Et(t, t.return, X);
          }
        sf && (sf = !1, cd(t));
        break;
      case 4:
        a = Vl, Vl = di(
          t.stateNode.containerInfo
        ), gl(l, t), Sl(t), Vl = a;
        break;
      case 12:
        gl(l, t), Sl(t);
        break;
      case 31:
        gl(l, t), Sl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Iu(t, a)));
        break;
      case 13:
        gl(l, t), Sl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ti = Rt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Iu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, S = se, T = $t;
        if (se = S || n, $t = T || o, gl(l, t), $t = T, se = S, Sl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || o || se || $t || va(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (u = o.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = o.stateNode;
                    var x = o.memoizedProps.style, b = x != null && x.hasOwnProperty("display") ? x.display : null;
                    f.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (X) {
                  Et(o, o.return, X);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (X) {
                  Et(o, o.return, X);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var _ = o.stateNode;
                  n ? Fd(_, !0) : Fd(o.stateNode, !1);
                } catch (X) {
                  Et(o, o.return, X);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Iu(t, e))));
        break;
      case 19:
        gl(l, t), Sl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Iu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        gl(l, t), Sl(t);
    }
  }
  function Sl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Ir(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = cf(t);
            ku(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Na(i, ""), e.flags &= -33);
            var f = cf(t);
            ku(t, f, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, S = cf(t);
            ff(
              t,
              S,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        Et(t, t.return, T);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function cd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        cd(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function re(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        ld(t, l.alternate, l), l = l.sibling;
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
          wl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Fr(
            l,
            l.return,
            e
          ), va(l);
          break;
        case 27:
          $n(l.stateNode);
        case 26:
        case 5:
          wl(l, l.return), va(l);
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
              Et(a, a.return, S);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  Yo(o[n], f);
            } catch (S) {
              Et(a, a.return, S);
            }
          }
          e && i & 64 && Wr(u), Gn(u, u.return);
          break;
        case 27:
          Pr(u);
        case 26:
        case 5:
          de(
            n,
            u,
            e
          ), e && a === null && i & 4 && kr(u), Gn(u, u.return);
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
          ), e && i & 4 && nd(n, u);
          break;
        case 13:
          de(
            n,
            u,
            e
          ), e && i & 4 && ud(n, u);
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
  function of(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && An(e));
  }
  function rf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && An(t));
  }
  function Zl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        fd(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function fd(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Zl(
          t,
          l,
          e,
          a
        ), n & 2048 && Yn(9, l);
        break;
      case 1:
        Zl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Zl(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && An(t)));
        break;
      case 12:
        if (n & 2048) {
          Zl(
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
          } catch (o) {
            Et(l, l.return, o);
          }
        } else
          Zl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Zl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Zl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Zl(
          t,
          l,
          e,
          a
        ) : Xn(t, l) : u._visibility & 2 ? Zl(
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
        )), n & 2048 && of(i, l);
        break;
      case 24:
        Zl(
          t,
          l,
          e,
          a
        ), n & 2048 && rf(l.alternate, l);
        break;
      default:
        Zl(
          t,
          l,
          e,
          a
        );
    }
  }
  function Ja(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, f = e, o = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ja(
            u,
            i,
            f,
            o,
            n
          ), Yn(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? Ja(
            u,
            i,
            f,
            o,
            n
          ) : Xn(
            u,
            i
          ) : (T._visibility |= 2, Ja(
            u,
            i,
            f,
            o,
            n
          )), n && S & 2048 && of(
            i.alternate,
            i
          );
          break;
        case 24:
          Ja(
            u,
            i,
            f,
            o,
            n
          ), n && S & 2048 && rf(i.alternate, i);
          break;
        default:
          Ja(
            u,
            i,
            f,
            o,
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
            Xn(e, a), n & 2048 && of(
              a.alternate,
              a
            );
            break;
          case 24:
            Xn(e, a), n & 2048 && rf(a.alternate, a);
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
        sd(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function sd(t, l, e) {
    switch (t.tag) {
      case 26:
        wa(
          t,
          l,
          e
        ), t.flags & Qn && t.memoizedState !== null && g0(
          e,
          Vl,
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
        var a = Vl;
        Vl = di(t.stateNode.containerInfo), wa(
          t,
          l,
          e
        ), Vl = a;
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
  function od(t) {
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
          It = a, dd(
            a,
            t
          );
        }
      od(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        rd(t), t = t.sibling;
  }
  function rd(t) {
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
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Pu(t)) : Ln(t);
        break;
      default:
        Ln(t);
    }
  }
  function Pu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          It = a, dd(
            a,
            t
          );
        }
      od(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, l, l.return), Pu(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Pu(l));
          break;
        default:
          Pu(l);
      }
      t = t.sibling;
    }
  }
  function dd(t, l) {
    for (; It !== null; ) {
      var e = It;
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
          An(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, It = a;
      else
        t: for (e = t; It !== null; ) {
          a = It;
          var n = a.sibling, u = a.return;
          if (ed(a), a === e) {
            It = null;
            break t;
          }
          if (n !== null) {
            n.return = u, It = n;
            break t;
          }
          It = u;
        }
    }
  }
  var Rh = {
    getCacheForType: function(t) {
      var l = ll(Kt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return ll(Kt).controller.signal;
    }
  }, Uh = typeof WeakMap == "function" ? WeakMap : Map, St = 0, Ot = null, ft = null, ot = 0, _t = 0, xl = null, Ce = !1, $a = !1, df = !1, me = 0, Gt = 0, He = 0, ha = 0, mf = 0, Dl = 0, Wa = 0, Vn = null, bl = null, vf = !1, ti = 0, md = 0, li = 1 / 0, ei = null, qe = null, Wt = 0, Be = null, Fa = null, ve = 0, hf = 0, yf = null, vd = null, Zn = 0, gf = null;
  function jl() {
    return (St & 2) !== 0 && ot !== 0 ? ot & -ot : E.T !== null ? Tf() : Ds();
  }
  function hd() {
    if (Dl === 0)
      if ((ot & 536870912) === 0 || mt) {
        var t = ou;
        ou <<= 1, (ou & 3932160) === 0 && (ou = 262144), Dl = t;
      } else Dl = 536870912;
    return t = Nl.current, t !== null && (t.flags |= 32), Dl;
  }
  function pl(t, l, e) {
    (t === Ot && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (ka(t, 0), Ye(
      t,
      ot,
      Dl,
      !1
    )), rn(t, e), ((St & 2) === 0 || t !== Ot) && (t === Ot && ((St & 2) === 0 && (ha |= e), Gt === 4 && Ye(
      t,
      ot,
      Dl,
      !1
    )), $l(t));
  }
  function yd(t, l, e) {
    if ((St & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || on(t, l), n = a ? qh(t, l) : bf(t, l, !0), u = a;
    do {
      if (n === 0) {
        $a && !a && Ye(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Ch(e)) {
          n = bf(t, l, !1), u = !1;
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
              var o = f.current.memoizedState.isDehydrated;
              if (o && (ka(f, i).flags |= 256), i = bf(
                f,
                i,
                !1
              ), i !== 2) {
                if (df && !o) {
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
              throw Error(s(345));
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
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (n = ti + 300 - Rt(), 10 < n)) {
            if (Ye(
              a,
              l,
              Dl,
              !Ce
            ), du(a, 0, !0) !== 0) break t;
            ve = l, a.timeoutHandle = wd(
              gd.bind(
                null,
                a,
                e,
                bl,
                ei,
                vf,
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
          gd(
            a,
            e,
            bl,
            ei,
            vf,
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
    $l(t);
  }
  function gd(t, l, e, a, n, u, i, f, o, S, T, x, b, _) {
    if (t.timeoutHandle = -1, x = l.subtreeFlags, x & 8192 || (x & 16785408) === 16785408) {
      x = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pl
      }, sd(
        l,
        u,
        x
      );
      var X = (u & 62914560) === u ? ti - Rt() : (u & 4194048) === u ? md - Rt() : 0;
      if (X = S0(
        x,
        X
      ), X !== null) {
        ve = u, t.cancelPendingCommit = X(
          Ad.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            f,
            o,
            T,
            x,
            null,
            b,
            _
          )
        ), Ye(t, u, i, !S);
        return;
      }
    }
    Ad(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      f,
      o
    );
  }
  function Ch(t) {
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
    l &= ~mf, l &= ~ha, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - Tl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && Ns(t, e, l);
  }
  function ai() {
    return (St & 6) === 0 ? (Kn(0), !1) : !0;
  }
  function Sf() {
    if (ft !== null) {
      if (_t === 0)
        var t = ft.return;
      else
        t = ft, ae = ia = null, Uc(t), Qa = null, On = 0, t = ft;
      for (; t !== null; )
        $r(t.alternate, t), t = t.return;
      ft = null;
    }
  }
  function ka(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, t0(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ve = 0, Sf(), Ot = t, ft = e = le(t.current, null), ot = l, _t = 0, xl = null, Ce = !1, $a = on(t, l), df = !1, Wa = Dl = mf = ha = He = Gt = 0, bl = Vn = null, vf = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - Tl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return me = l, zu(), e;
  }
  function Sd(t, l) {
    et = null, E.H = Hn, l === Xa || l === Ru ? (l = Co(), _t = 3) : l === _c ? (l = Co(), _t = 4) : _t = l === Wc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, xl = l, ft === null && (Gt = 1, Ju(
      t,
      Hl(l, t.current)
    ));
  }
  function bd() {
    var t = Nl.current;
    return t === null ? !0 : (ot & 4194048) === ot ? Gl === null : (ot & 62914560) === ot || (ot & 536870912) !== 0 ? t === Gl : !1;
  }
  function pd() {
    var t = E.H;
    return E.H = Hn, t === null ? Hn : t;
  }
  function _d() {
    var t = E.A;
    return E.A = Rh, t;
  }
  function ni() {
    Gt = 4, Ce || (ot & 4194048) !== ot && Nl.current !== null || ($a = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || Ot === null || Ye(
      Ot,
      ot,
      Dl,
      !1
    );
  }
  function bf(t, l, e) {
    var a = St;
    St |= 2;
    var n = pd(), u = _d();
    (Ot !== t || ot !== l) && (ei = null, ka(t, l)), l = !1;
    var i = Gt;
    t: do
      try {
        if (_t !== 0 && ft !== null) {
          var f = ft, o = xl;
          switch (_t) {
            case 8:
              Sf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Nl.current === null && (l = !0);
              var S = _t;
              if (_t = 0, xl = null, Ia(t, f, o, S), e && $a) {
                i = 0;
                break t;
              }
              break;
            default:
              S = _t, _t = 0, xl = null, Ia(t, f, o, S);
          }
        }
        Hh(), i = Gt;
        break;
      } catch (T) {
        Sd(t, T);
      }
    while (!0);
    return l && t.shellSuspendCounter++, ae = ia = null, St = a, E.H = n, E.A = u, ft === null && (Ot = null, ot = 0, zu()), i;
  }
  function Hh() {
    for (; ft !== null; ) Ed(ft);
  }
  function qh(t, l) {
    var e = St;
    St |= 2;
    var a = pd(), n = _d();
    Ot !== t || ot !== l ? (ei = null, li = Rt() + 500, ka(t, l)) : $a = on(
      t,
      l
    );
    t: do
      try {
        if (_t !== 0 && ft !== null) {
          l = ft;
          var u = xl;
          l: switch (_t) {
            case 1:
              _t = 0, xl = null, Ia(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (Ro(u)) {
                _t = 0, xl = null, Td(l);
                break;
              }
              l = function() {
                _t !== 2 && _t !== 9 || Ot !== t || (_t = 7), $l(t);
              }, u.then(l, l);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              Ro(u) ? (_t = 0, xl = null, Td(l)) : (_t = 0, xl = null, Ia(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (ft.tag) {
                case 26:
                  i = ft.memoizedState;
                case 5:
                case 27:
                  var f = ft;
                  if (i ? fm(i) : f.stateNode.complete) {
                    _t = 0, xl = null;
                    var o = f.sibling;
                    if (o !== null) ft = o;
                    else {
                      var S = f.return;
                      S !== null ? (ft = S, ui(S)) : ft = null;
                    }
                    break l;
                  }
              }
              _t = 0, xl = null, Ia(t, l, u, 5);
              break;
            case 6:
              _t = 0, xl = null, Ia(t, l, u, 6);
              break;
            case 8:
              Sf(), Gt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Bh();
        break;
      } catch (T) {
        Sd(t, T);
      }
    while (!0);
    return ae = ia = null, E.H = a, E.A = n, St = e, ft !== null ? 0 : (Ot = null, ot = 0, zu(), Gt);
  }
  function Bh() {
    for (; ft !== null && !dl(); )
      Ed(ft);
  }
  function Ed(t) {
    var l = Jr(t.alternate, t, me);
    t.memoizedProps = t.pendingProps, l === null ? ui(t) : ft = l;
  }
  function Td(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Xr(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          ot
        );
        break;
      case 11:
        l = Xr(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          ot
        );
        break;
      case 5:
        Uc(l);
      default:
        $r(e, l), l = ft = _o(l, me), l = Jr(e, l, me);
    }
    t.memoizedProps = t.pendingProps, l === null ? ui(t) : ft = l;
  }
  function Ia(t, l, e, a) {
    ae = ia = null, Uc(l), Qa = null, On = 0;
    var n = l.return;
    try {
      if (Ah(
        t,
        n,
        l,
        e,
        ot
      )) {
        Gt = 1, Ju(
          t,
          Hl(e, t.current)
        ), ft = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ft = n, u;
      Gt = 1, Ju(
        t,
        Hl(e, t.current)
      ), ft = null;
      return;
    }
    l.flags & 32768 ? (mt || a === 1 ? t = !0 : $a || (ot & 536870912) !== 0 ? t = !1 : (Ce = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Nl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), zd(l, t)) : ui(l);
  }
  function ui(t) {
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
      var e = xh(
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
    Gt === 0 && (Gt = 5);
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
    Gt = 6, ft = null;
  }
  function Ad(t, l, e, a, n, u, i, f, o) {
    t.cancelPendingCommit = null;
    do
      ii();
    while (Wt !== 0);
    if ((St & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (u = l.lanes | l.childLanes, u |= ic, yv(
        t,
        e,
        u,
        i,
        f,
        o
      ), t === Ot && (ft = Ot = null, ot = 0), Fa = l, Be = t, ve = e, hf = u, yf = n, vd = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Qh(ke, function() {
        return jd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, n = q.p, q.p = 2, i = St, St |= 4;
        try {
          jh(t, l, e);
        } finally {
          St = i, q.p = n, E.T = a;
        }
      }
      Wt = 1, Nd(), Od(), xd();
    }
  }
  function Nd() {
    if (Wt === 1) {
      Wt = 0;
      var t = Be, l = Fa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var n = St;
        St |= 4;
        try {
          id(l, t);
          var u = Mf, i = ro(t.containerInfo), f = u.focusedElem, o = u.selectionRange;
          if (i !== f && f && f.ownerDocument && oo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (o !== null && lc(f)) {
              var S = o.start, T = o.end;
              if (T === void 0 && (T = S), "selectionStart" in f)
                f.selectionStart = S, f.selectionEnd = Math.min(
                  T,
                  f.value.length
                );
              else {
                var x = f.ownerDocument || document, b = x && x.defaultView || window;
                if (b.getSelection) {
                  var _ = b.getSelection(), X = f.textContent.length, $ = Math.min(o.start, X), Nt = o.end === void 0 ? $ : Math.min(o.end, X);
                  !_.extend && $ > Nt && (i = Nt, Nt = $, $ = i);
                  var h = so(
                    f,
                    $
                  ), d = so(
                    f,
                    Nt
                  );
                  if (h && d && (_.rangeCount !== 1 || _.anchorNode !== h.node || _.anchorOffset !== h.offset || _.focusNode !== d.node || _.focusOffset !== d.offset)) {
                    var g = x.createRange();
                    g.setStart(h.node, h.offset), _.removeAllRanges(), $ > Nt ? (_.addRange(g), _.extend(d.node, d.offset)) : (g.setEnd(d.node, d.offset), _.addRange(g));
                  }
                }
              }
            }
            for (x = [], _ = f; _ = _.parentNode; )
              _.nodeType === 1 && x.push({
                element: _,
                left: _.scrollLeft,
                top: _.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < x.length; f++) {
              var N = x[f];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          Si = !!jf, Mf = jf = null;
        } finally {
          St = n, q.p = a, E.T = e;
        }
      }
      t.current = l, Wt = 2;
    }
  }
  function Od() {
    if (Wt === 2) {
      Wt = 0;
      var t = Be, l = Fa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var n = St;
        St |= 4;
        try {
          ld(t, l.alternate, l);
        } finally {
          St = n, q.p = a, E.T = e;
        }
      }
      Wt = 3;
    }
  }
  function xd() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Lt();
      var t = Be, l = Fa, e = ve, a = vd;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, Fa = Be = null, Dd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (qe = null), qi(e), l = l.stateNode, El && typeof El.onCommitFiberRoot == "function")
        try {
          El.onCommitFiberRoot(
            kl,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = E.T, n = q.p, q.p = 2, E.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          E.T = l, q.p = n;
        }
      }
      (ve & 3) !== 0 && ii(), $l(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === gf ? Zn++ : (Zn = 0, gf = t) : Zn = 0, Kn(0);
    }
  }
  function Dd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, An(l)));
  }
  function ii() {
    return Nd(), Od(), xd(), jd();
  }
  function jd() {
    if (Wt !== 5) return !1;
    var t = Be, l = hf;
    hf = 0;
    var e = qi(ve), a = E.T, n = q.p;
    try {
      q.p = 32 > e ? 32 : e, E.T = null, e = yf, yf = null;
      var u = Be, i = ve;
      if (Wt = 0, Fa = Be = null, ve = 0, (St & 6) !== 0) throw Error(s(331));
      var f = St;
      if (St |= 4, rd(u.current), fd(
        u,
        u.current,
        i,
        e
      ), St = f, Kn(0, !1), El && typeof El.onPostCommitFiberRoot == "function")
        try {
          El.onPostCommitFiberRoot(kl, u);
        } catch {
        }
      return !0;
    } finally {
      q.p = n, E.T = a, Dd(t, l);
    }
  }
  function Md(t, l, e) {
    l = Hl(e, l), l = $c(t.stateNode, l, 2), t = je(t, l, 2), t !== null && (rn(t, 2), $l(t));
  }
  function Et(t, l, e) {
    if (t.tag === 3)
      Md(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Md(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            t = Hl(e, t), e = Rr(2), a = je(l, e, 2), a !== null && (Ur(
              e,
              a,
              l,
              t
            ), rn(a, 2), $l(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function pf(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Uh();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (df = !0, n.add(e), t = Yh.bind(null, t, l, e), l.then(t, t));
  }
  function Yh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Ot === t && (ot & e) === e && (Gt === 4 || Gt === 3 && (ot & 62914560) === ot && 300 > Rt() - ti ? (St & 2) === 0 && ka(t, 0) : mf |= e, Wa === ot && (Wa = 0)), $l(t);
  }
  function Rd(t, l) {
    l === 0 && (l = As()), t = aa(t, l), t !== null && (rn(t, l), $l(t));
  }
  function Gh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Rd(t, e);
  }
  function Xh(t, l) {
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
        throw Error(s(314));
    }
    a !== null && a.delete(l), Rd(t, e);
  }
  function Qh(t, l) {
    return Mt(t, l);
  }
  var ci = null, Pa = null, _f = !1, fi = !1, Ef = !1, Ge = 0;
  function $l(t) {
    t !== Pa && t.next === null && (Pa === null ? ci = Pa = t : Pa = Pa.next = t), fi = !0, _f || (_f = !0, Vh());
  }
  function Kn(t, l) {
    if (!Ef && fi) {
      Ef = !0;
      do
        for (var e = !1, a = ci; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - Tl(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, qd(a, u));
          } else
            u = ot, u = du(
              a,
              a === Ot ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || on(a, u) || (e = !0, qd(a, u));
          a = a.next;
        }
      while (e);
      Ef = !1;
    }
  }
  function Lh() {
    Ud();
  }
  function Ud() {
    fi = _f = !1;
    var t = 0;
    Ge !== 0 && Ph() && (t = Ge);
    for (var l = Rt(), e = null, a = ci; a !== null; ) {
      var n = a.next, u = Cd(a, l);
      u === 0 ? (a.next = null, e === null ? ci = n : e.next = n, n === null && (Pa = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (fi = !0)), a = n;
    }
    Wt !== 0 && Wt !== 5 || Kn(t), Ge !== 0 && (Ge = 0);
  }
  function Cd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Tl(u), f = 1 << i, o = n[i];
      o === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = hv(f, l)) : o <= l && (t.expiredLanes |= f), u &= ~f;
    }
    if (l = Ot, e = ot, e = du(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && rl(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || on(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && rl(a), qi(e)) {
        case 2:
        case 8:
          e = fn;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = Ml;
          break;
        default:
          e = ke;
      }
      return a = Hd.bind(null, t), e = Mt(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && rl(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Hd(t, l) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (ii() && t.callbackNode !== e)
      return null;
    var a = ot;
    return a = du(
      t,
      t === Ot ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (yd(t, a, l), Cd(t, Rt()), t.callbackNode != null && t.callbackNode === e ? Hd.bind(null, t) : null);
  }
  function qd(t, l) {
    if (ii()) return null;
    yd(t, l, !0);
  }
  function Vh() {
    l0(function() {
      (St & 6) !== 0 ? Mt(
        pe,
        Lh
      ) : Ud();
    });
  }
  function Tf() {
    if (Ge === 0) {
      var t = Ya;
      t === 0 && (t = su, su <<= 1, (su & 261888) === 0 && (su = 256)), Ge = t;
    }
    return Ge;
  }
  function Bd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : yu("" + t);
  }
  function Yd(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Zh(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Bd(
        (n[vl] || null).action
      ), i = a.submitter;
      i && (l = (l = i[vl] || null) ? Bd(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var f = new pu(
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
                  var o = i ? Yd(n, i) : new FormData(n);
                  Lc(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: n.method,
                      action: u
                    },
                    null,
                    o
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), o = i ? Yd(n, i) : new FormData(n), Lc(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: n.method,
                    action: u
                  },
                  u,
                  o
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var zf = 0; zf < uc.length; zf++) {
    var Af = uc[zf], Kh = Af.toLowerCase(), Jh = Af[0].toUpperCase() + Af.slice(1);
    Ll(
      Kh,
      "on" + Jh
    );
  }
  Ll(ho, "onAnimationEnd"), Ll(yo, "onAnimationIteration"), Ll(go, "onAnimationStart"), Ll("dblclick", "onDoubleClick"), Ll("focusin", "onFocus"), Ll("focusout", "onBlur"), Ll(fh, "onTransitionRun"), Ll(sh, "onTransitionStart"), Ll(oh, "onTransitionCancel"), Ll(So, "onTransitionEnd"), za("onMouseEnter", ["mouseout", "mouseover"]), za("onMouseLeave", ["mouseout", "mouseover"]), za("onPointerEnter", ["pointerout", "pointerover"]), za("onPointerLeave", ["pointerout", "pointerover"]), Pe(
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
  ), wh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Jn)
  );
  function Gd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], o = f.instance, S = f.currentTarget;
            if (f = f.listener, o !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (T) {
              Tu(T);
            }
            n.currentTarget = null, u = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], o = f.instance, S = f.currentTarget, f = f.listener, o !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (T) {
              Tu(T);
            }
            n.currentTarget = null, u = o;
          }
      }
    }
  }
  function st(t, l) {
    var e = l[Bi];
    e === void 0 && (e = l[Bi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Xd(l, t, 2, !1), e.add(a));
  }
  function Nf(t, l, e) {
    var a = 0;
    l && (a |= 4), Xd(
      e,
      t,
      a,
      l
    );
  }
  var si = "_reactListening" + Math.random().toString(36).slice(2);
  function Of(t) {
    if (!t[si]) {
      t[si] = !0, Rs.forEach(function(e) {
        e !== "selectionchange" && (wh.has(e) || Nf(e, !1, t), Nf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[si] || (l[si] = !0, Nf("selectionchange", !1, l));
    }
  }
  function Xd(t, l, e, a) {
    switch (hm(l)) {
      case 2:
        var n = _0;
        break;
      case 8:
        n = E0;
        break;
      default:
        n = Lf;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !Ji || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function xf(t, l, e, a, n) {
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
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = _a(f), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Zs(function() {
      var S = u, T = Zi(e), x = [];
      t: {
        var b = bo.get(t);
        if (b !== void 0) {
          var _ = pu, X = t;
          switch (t) {
            case "keypress":
              if (Su(e) === 0) break t;
            case "keydown":
            case "keyup":
              _ = Xv;
              break;
            case "focusin":
              X = "focus", _ = Fi;
              break;
            case "focusout":
              X = "blur", _ = Fi;
              break;
            case "beforeblur":
            case "afterblur":
              _ = Fi;
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
              _ = ws;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              _ = xv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              _ = Vv;
              break;
            case ho:
            case yo:
            case go:
              _ = Mv;
              break;
            case So:
              _ = Kv;
              break;
            case "scroll":
            case "scrollend":
              _ = Nv;
              break;
            case "wheel":
              _ = wv;
              break;
            case "copy":
            case "cut":
            case "paste":
              _ = Uv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              _ = Ws;
              break;
            case "toggle":
            case "beforetoggle":
              _ = Wv;
          }
          var $ = (l & 4) !== 0, Nt = !$ && (t === "scroll" || t === "scrollend"), h = $ ? b !== null ? b + "Capture" : null : b;
          $ = [];
          for (var d = S, g; d !== null; ) {
            var N = d;
            if (g = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || g === null || h === null || (N = vn(d, h), N != null && $.push(
              wn(d, N, g)
            )), Nt) break;
            d = d.return;
          }
          0 < $.length && (b = new _(
            b,
            X,
            null,
            e,
            T
          ), x.push({ event: b, listeners: $ }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (b = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", b && e !== Vi && (X = e.relatedTarget || e.fromElement) && (_a(X) || X[pa]))
            break t;
          if ((_ || b) && (b = T.window === T ? T : (b = T.ownerDocument) ? b.defaultView || b.parentWindow : window, _ ? (X = e.relatedTarget || e.toElement, _ = S, X = X ? _a(X) : null, X !== null && (Nt = R(X), $ = X.tag, X !== Nt || $ !== 5 && $ !== 27 && $ !== 6) && (X = null)) : (_ = null, X = S), _ !== X)) {
            if ($ = ws, N = "onMouseLeave", h = "onMouseEnter", d = "mouse", (t === "pointerout" || t === "pointerover") && ($ = Ws, N = "onPointerLeave", h = "onPointerEnter", d = "pointer"), Nt = _ == null ? b : mn(_), g = X == null ? b : mn(X), b = new $(
              N,
              d + "leave",
              _,
              e,
              T
            ), b.target = Nt, b.relatedTarget = g, N = null, _a(T) === S && ($ = new $(
              h,
              d + "enter",
              X,
              e,
              T
            ), $.target = g, $.relatedTarget = Nt, N = $), Nt = N, _ && X)
              l: {
                for ($ = $h, h = _, d = X, g = 0, N = h; N; N = $(N))
                  g++;
                N = 0;
                for (var K = d; K; K = $(K))
                  N++;
                for (; 0 < g - N; )
                  h = $(h), g--;
                for (; 0 < N - g; )
                  d = $(d), N--;
                for (; g--; ) {
                  if (h === d || d !== null && h === d.alternate) {
                    $ = h;
                    break l;
                  }
                  h = $(h), d = $(d);
                }
                $ = null;
              }
            else $ = null;
            _ !== null && Qd(
              x,
              b,
              _,
              $,
              !1
            ), X !== null && Nt !== null && Qd(
              x,
              Nt,
              X,
              $,
              !0
            );
          }
        }
        t: {
          if (b = S ? mn(S) : window, _ = b.nodeName && b.nodeName.toLowerCase(), _ === "select" || _ === "input" && b.type === "file")
            var ht = ao;
          else if (lo(b))
            if (no)
              ht = uh;
            else {
              ht = ah;
              var L = eh;
            }
          else
            _ = b.nodeName, !_ || _.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? S && Li(S.elementType) && (ht = ao) : ht = nh;
          if (ht && (ht = ht(t, S))) {
            eo(
              x,
              ht,
              e,
              T
            );
            break t;
          }
          L && L(t, b, S), t === "focusout" && S && b.type === "number" && S.memoizedProps.value != null && Qi(b, "number", b.value);
        }
        switch (L = S ? mn(S) : window, t) {
          case "focusin":
            (lo(L) || L.contentEditable === "true") && (ja = L, ec = S, En = null);
            break;
          case "focusout":
            En = ec = ja = null;
            break;
          case "mousedown":
            ac = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ac = !1, mo(x, e, T);
            break;
          case "selectionchange":
            if (ch) break;
          case "keydown":
          case "keyup":
            mo(x, e, T);
        }
        var at;
        if (Ii)
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
          Da ? Ps(t, e) && (rt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (rt = "onCompositionStart");
        rt && (Fs && e.locale !== "ko" && (Da || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && Da && (at = Ks()) : (Te = T, wi = "value" in Te ? Te.value : Te.textContent, Da = !0)), L = oi(S, rt), 0 < L.length && (rt = new $s(
          rt,
          t,
          null,
          e,
          T
        ), x.push({ event: rt, listeners: L }), at ? rt.data = at : (at = to(e), at !== null && (rt.data = at)))), (at = kv ? Iv(t, e) : Pv(t, e)) && (rt = oi(S, "onBeforeInput"), 0 < rt.length && (L = new $s(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), x.push({
          event: L,
          listeners: rt
        }), L.data = at)), Zh(
          x,
          t,
          S,
          e,
          T
        );
      }
      Gd(x, l);
    });
  }
  function wn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function oi(t, l) {
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
  function $h(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Qd(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var f = e, o = f.alternate, S = f.stateNode;
      if (f = f.tag, o !== null && o === a) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (o = S, n ? (S = vn(e, u), S != null && i.unshift(
        wn(e, S, o)
      )) : n || (S = vn(e, u), S != null && i.push(
        wn(e, S, o)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Wh = /\r\n?/g, Fh = /\u0000|\uFFFD/g;
  function Ld(t) {
    return (typeof t == "string" ? t : "" + t).replace(Wh, `
`).replace(Fh, "");
  }
  function Vd(t, l) {
    return l = Ld(l), Ld(t) === l;
  }
  function At(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || Na(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && Na(t, "" + a);
        break;
      case "className":
        vu(t, "class", a);
        break;
      case "tabIndex":
        vu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vu(t, e, a);
        break;
      case "style":
        Ls(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          vu(t, "data", a);
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
        a = yu("" + a), t.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (l !== "input" && At(t, l, "name", n.name, n, null), At(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), At(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), At(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (At(t, l, "encType", n.encType, n, null), At(t, l, "method", n.method, n, null), At(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = yu("" + a), t.setAttribute(e, a);
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
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
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
        e = yu("" + a), t.setAttributeNS(
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
        st("beforetoggle", t), st("toggle", t), mu(t, "popover", a);
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
        mu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = zv.get(e) || e, mu(t, e, a));
    }
  }
  function Df(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Ls(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Na(t, a) : (typeof a == "number" || typeof a == "bigint") && Na(t, "" + a);
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
        if (!Us.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[vl] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : mu(t, e, a);
          }
    }
  }
  function al(t, l, e) {
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
                  throw Error(s(137, l));
                default:
                  At(t, l, u, i, e, null);
              }
          }
        n && At(t, l, "srcSet", e.srcSet, e, null), a && At(t, l, "src", e.src, e, null);
        return;
      case "input":
        st("invalid", t);
        var f = u = i = n = null, o = null, S = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  n = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  o = T;
                  break;
                case "defaultChecked":
                  S = T;
                  break;
                case "value":
                  u = T;
                  break;
                case "defaultValue":
                  f = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(s(137, l));
                  break;
                default:
                  At(t, l, a, T, e, null);
              }
          }
        Ys(
          t,
          u,
          f,
          o,
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
                At(t, l, n, f, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? Aa(t, !!a, l, !1) : e != null && Aa(t, !!a, e, !0);
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
                if (f != null) throw Error(s(91));
                break;
              default:
                At(t, l, i, f, e, null);
            }
        Xs(t, a, n, u);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                At(t, l, o, a, e, null);
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
                throw Error(s(137, l));
              default:
                At(t, l, S, a, e, null);
            }
        return;
      default:
        if (Li(l)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && Df(
              t,
              l,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (f in e)
      e.hasOwnProperty(f) && (a = e[f], a != null && At(t, l, f, a, e, null));
  }
  function kh(t, l, e, a) {
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
        var n = null, u = null, i = null, f = null, o = null, S = null, T = null;
        for (_ in e) {
          var x = e[_];
          if (e.hasOwnProperty(_) && x != null)
            switch (_) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = x;
              default:
                a.hasOwnProperty(_) || At(t, l, _, null, a, x);
            }
        }
        for (var b in a) {
          var _ = a[b];
          if (x = e[b], a.hasOwnProperty(b) && (_ != null || x != null))
            switch (b) {
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
                T = _;
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
                  throw Error(s(137, l));
                break;
              default:
                _ !== x && At(
                  t,
                  l,
                  b,
                  _,
                  a,
                  x
                );
            }
        }
        Xi(
          t,
          i,
          f,
          o,
          S,
          T,
          u,
          n
        );
        return;
      case "select":
        _ = i = f = b = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                _ = o;
              default:
                a.hasOwnProperty(u) || At(
                  t,
                  l,
                  u,
                  null,
                  a,
                  o
                );
            }
        for (n in a)
          if (u = a[n], o = e[n], a.hasOwnProperty(n) && (u != null || o != null))
            switch (n) {
              case "value":
                b = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== o && At(
                  t,
                  l,
                  n,
                  u,
                  a,
                  o
                );
            }
        l = f, e = i, a = _, b != null ? Aa(t, !!e, b, !1) : !!a != !!e && (l != null ? Aa(t, !!e, l, !0) : Aa(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        _ = b = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                At(t, l, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                b = n;
                break;
              case "defaultValue":
                _ = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && At(t, l, i, n, a, u);
            }
        Gs(t, b, _);
        return;
      case "option":
        for (var X in e)
          if (b = e[X], e.hasOwnProperty(X) && b != null && !a.hasOwnProperty(X))
            switch (X) {
              case "selected":
                t.selected = !1;
                break;
              default:
                At(
                  t,
                  l,
                  X,
                  null,
                  a,
                  b
                );
            }
        for (o in a)
          if (b = a[o], _ = e[o], a.hasOwnProperty(o) && b !== _ && (b != null || _ != null))
            switch (o) {
              case "selected":
                t.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                At(
                  t,
                  l,
                  o,
                  b,
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
          b = e[$], e.hasOwnProperty($) && b != null && !a.hasOwnProperty($) && At(t, l, $, null, a, b);
        for (S in a)
          if (b = a[S], _ = e[S], a.hasOwnProperty(S) && b !== _ && (b != null || _ != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(s(137, l));
                break;
              default:
                At(
                  t,
                  l,
                  S,
                  b,
                  a,
                  _
                );
            }
        return;
      default:
        if (Li(l)) {
          for (var Nt in e)
            b = e[Nt], e.hasOwnProperty(Nt) && b !== void 0 && !a.hasOwnProperty(Nt) && Df(
              t,
              l,
              Nt,
              void 0,
              a,
              b
            );
          for (T in a)
            b = a[T], _ = e[T], !a.hasOwnProperty(T) || b === _ || b === void 0 && _ === void 0 || Df(
              t,
              l,
              T,
              b,
              a,
              _
            );
          return;
        }
    }
    for (var h in e)
      b = e[h], e.hasOwnProperty(h) && b != null && !a.hasOwnProperty(h) && At(t, l, h, null, a, b);
    for (x in a)
      b = a[x], _ = e[x], !a.hasOwnProperty(x) || b === _ || b == null && _ == null || At(t, l, x, b, a, _);
  }
  function Zd(t) {
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
  function Ih() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Zd(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], S = o.startTime;
            if (S > f) break;
            var T = o.transferSize, x = o.initiatorType;
            T && Zd(x) && (o = o.responseEnd, i += T * (o < f ? 1 : (f - S) / (o - S)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var jf = null, Mf = null;
  function ri(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Kd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Jd(t, l) {
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
  function Rf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Uf = null;
  function Ph() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Uf ? !1 : (Uf = t, !0) : (Uf = null, !1);
  }
  var wd = typeof setTimeout == "function" ? setTimeout : void 0, t0 = typeof clearTimeout == "function" ? clearTimeout : void 0, $d = typeof Promise == "function" ? Promise : void 0, l0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof $d < "u" ? function(t) {
    return $d.resolve(null).then(t).catch(e0);
  } : wd;
  function e0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Xe(t) {
    return t === "head";
  }
  function Wd(t, l) {
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
  function Fd(t, l) {
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
  function Cf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Cf(e), Yi(e);
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
  function a0(t, l, e, a) {
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
      if (t = Xl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function n0(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function kd(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Hf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function qf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function u0(t, l) {
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
  function Xl(t) {
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
  var Bf = null;
  function Id(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Xl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Pd(t) {
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
  function tm(t, l, e) {
    switch (l = ri(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function $n(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Yi(t);
  }
  var Ql = /* @__PURE__ */ new Map(), lm = /* @__PURE__ */ new Set();
  function di(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var he = q.d;
  q.d = {
    f: i0,
    r: c0,
    D: f0,
    C: s0,
    L: o0,
    m: r0,
    X: m0,
    S: d0,
    M: v0
  };
  function i0() {
    var t = he.f(), l = ai();
    return t || l;
  }
  function c0(t) {
    var l = Ea(t);
    l !== null && l.tag === 5 && l.type === "form" ? Sr(l) : he.r(t);
  }
  var tn = typeof document > "u" ? null : document;
  function em(t, l, e) {
    var a = tn;
    if (a && typeof l == "string" && l) {
      var n = Ul(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), lm.has(n) || (lm.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), al(l, "link", t), kt(l), a.head.appendChild(l)));
    }
  }
  function f0(t) {
    he.D(t), em("dns-prefetch", t, null);
  }
  function s0(t, l) {
    he.C(t, l), em("preconnect", t, l);
  }
  function o0(t, l, e) {
    he.L(t, l, e);
    var a = tn;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + Ul(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Ul(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Ul(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Ul(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = ln(t);
          break;
        case "script":
          u = en(t);
      }
      Ql.has(u) || (t = M(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ql.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(Wn(u)) || l === "script" && a.querySelector(Fn(u)) || (l = a.createElement("link"), al(l, "link", t), kt(l), a.head.appendChild(l)));
    }
  }
  function r0(t, l) {
    he.m(t, l);
    var e = tn;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + Ul(a) + '"][href="' + Ul(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = en(t);
      }
      if (!Ql.has(u) && (t = M({ rel: "modulepreload", href: t }, l), Ql.set(u, t), e.querySelector(n) === null)) {
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
        a = e.createElement("link"), al(a, "link", t), kt(a), e.head.appendChild(a);
      }
    }
  }
  function d0(t, l, e) {
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
          t = M(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ql.get(u)) && Yf(t, e);
          var o = i = a.createElement("link");
          kt(o), al(o, "link", t), o._p = new Promise(function(S, T) {
            o.onload = S, o.onerror = T;
          }), o.addEventListener("load", function() {
            f.loading |= 1;
          }), o.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, mi(i, l, a);
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
  function m0(t, l) {
    he.X(t, l);
    var e = tn;
    if (e && t) {
      var a = Ta(e).hoistableScripts, n = en(t), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (t = M({ src: t, async: !0 }, l), (l = Ql.get(n)) && Gf(t, l), u = e.createElement("script"), kt(u), al(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function v0(t, l) {
    he.M(t, l);
    var e = tn;
    if (e && t) {
      var a = Ta(e).hoistableScripts, n = en(t), u = a.get(n);
      u || (u = e.querySelector(Fn(n)), u || (t = M({ src: t, async: !0, type: "module" }, l), (l = Ql.get(n)) && Gf(t, l), u = e.createElement("script"), kt(u), al(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function am(t, l, e, a) {
    var n = (n = lt.current) ? di(n) : null;
    if (!n) throw Error(s(446));
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
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ql.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ql.set(t, e), u || h0(
            n,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(s(529, ""));
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
        throw Error(s(444, t));
    }
  }
  function ln(t) {
    return 'href="' + Ul(t) + '"';
  }
  function Wn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function nm(t) {
    return M({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function h0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), al(l, "link", e), kt(l), t.head.appendChild(l));
  }
  function en(t) {
    return '[src="' + Ul(t) + '"]';
  }
  function Fn(t) {
    return "script[async]" + t;
  }
  function um(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Ul(e.href) + '"]'
          );
          if (a)
            return l.instance = a, kt(a), a;
          var n = M({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), kt(a), al(a, "style", n), mi(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = ln(e.href);
          var u = t.querySelector(
            Wn(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, kt(u), u;
          a = nm(e), (n = Ql.get(n)) && Yf(a, n), u = (t.ownerDocument || t).createElement("link"), kt(u);
          var i = u;
          return i._p = new Promise(function(f, o) {
            i.onload = f, i.onerror = o;
          }), al(u, "link", a), l.state.loading |= 4, mi(u, e.precedence, t), l.instance = u;
        case "script":
          return u = en(e.src), (n = t.querySelector(
            Fn(u)
          )) ? (l.instance = n, kt(n), n) : (a = e, (n = Ql.get(u)) && (a = M({}, e), Gf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), kt(n), al(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, mi(a, e.precedence, t));
    return l.instance;
  }
  function mi(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === l) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Yf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Gf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var vi = null;
  function im(t, l, e) {
    if (vi === null) {
      var a = /* @__PURE__ */ new Map(), n = vi = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = vi, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[dn] || u[Pt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function cm(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function y0(t, l, e) {
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
  function fm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function g0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = ln(a.href), u = l.querySelector(
          Wn(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = hi.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, kt(u);
          return;
        }
        u = l.ownerDocument || l, a = nm(a), (n = Ql.get(n)) && Yf(a, n), u = u.createElement("link"), kt(u);
        var i = u;
        i._p = new Promise(function(f, o) {
          i.onload = f, i.onerror = o;
        }), al(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = hi.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Xf = 0;
  function S0(t, l) {
    return t.stylesheets && t.count === 0 && gi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && gi(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Xf === 0 && (Xf = 62500 * Ih());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && gi(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Xf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function hi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) gi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var yi = null;
  function gi(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, yi = /* @__PURE__ */ new Map(), l.forEach(b0, t), yi = null, hi.call(t));
  }
  function b0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = yi.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), yi.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = hi.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
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
  function p0(t, l, e, a, n, u, i, f, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ci(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ci(0), this.hiddenUpdates = Ci(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sm(t, l, e, a, n, u, i, f, o, S, T, x) {
    return t = new p0(
      t,
      l,
      e,
      i,
      o,
      S,
      T,
      x,
      f
    ), l = 1, u === !0 && (l |= 24), u = Al(3, null, null, l), t.current = u, u.stateNode = t, l = Sc(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Ec(u), t;
  }
  function om(t) {
    return t ? (t = Ua, t) : Ua;
  }
  function rm(t, l, e, a, n, u) {
    n = om(n), a.context === null ? a.context = n : a.pendingContext = n, a = De(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = je(t, a, l), e !== null && (pl(e, t, l), Dn(e, t, l));
  }
  function dm(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Qf(t, l) {
    dm(t, l), (t = t.alternate) && dm(t, l);
  }
  function mm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = aa(t, 67108864);
      l !== null && pl(l, t, 67108864), Qf(t, 67108864);
    }
  }
  function vm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = jl();
      l = Hi(l);
      var e = aa(t, l);
      e !== null && pl(e, t, l), Qf(t, l);
    }
  }
  var Si = !0;
  function _0(t, l, e, a) {
    var n = E.T;
    E.T = null;
    var u = q.p;
    try {
      q.p = 2, Lf(t, l, e, a);
    } finally {
      q.p = u, E.T = n;
    }
  }
  function E0(t, l, e, a) {
    var n = E.T;
    E.T = null;
    var u = q.p;
    try {
      q.p = 8, Lf(t, l, e, a);
    } finally {
      q.p = u, E.T = n;
    }
  }
  function Lf(t, l, e, a) {
    if (Si) {
      var n = Vf(a);
      if (n === null)
        xf(
          t,
          l,
          a,
          bi,
          e
        ), ym(t, a);
      else if (z0(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (ym(t, a), l & 4 && -1 < T0.indexOf(t)) {
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
                      var o = 1 << 31 - Tl(i);
                      f.entanglements[1] |= o, i &= ~o;
                    }
                    $l(u), (St & 6) === 0 && (li = Rt() + 500, Kn(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = aa(u, 2), f !== null && pl(f, u, 2), ai(), Qf(u, 2);
            }
          if (u = Vf(a), u === null && xf(
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
        xf(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Vf(t) {
    return t = Zi(t), Zf(t);
  }
  var bi = null;
  function Zf(t) {
    if (bi = null, t = _a(t), t !== null) {
      var l = R(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = D(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = B(l), t !== null) return t;
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
  function hm(t) {
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
          case pe:
            return 2;
          case fn:
            return 8;
          case ke:
          case ml:
            return 32;
          case Ml:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Kf = !1, Qe = null, Le = null, Ve = null, In = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Ze = [], T0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ym(t, l) {
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
    }, l !== null && (l = Ea(l), l !== null && mm(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
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
  function gm(t) {
    var l = _a(t.target);
    if (l !== null) {
      var e = R(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = D(e), l !== null) {
            t.blockedOn = l, js(t.priority, function() {
              vm(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = B(e), l !== null) {
            t.blockedOn = l, js(t.priority, function() {
              vm(e);
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
  function pi(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Vf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Vi = a, e.target.dispatchEvent(a), Vi = null;
      } else
        return l = Ea(e), l !== null && mm(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function Sm(t, l, e) {
    pi(t) && e.delete(l);
  }
  function A0() {
    Kf = !1, Qe !== null && pi(Qe) && (Qe = null), Le !== null && pi(Le) && (Le = null), Ve !== null && pi(Ve) && (Ve = null), In.forEach(Sm), Pn.forEach(Sm);
  }
  function _i(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Kf || (Kf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      A0
    )));
  }
  var Ei = null;
  function bm(t) {
    Ei !== t && (Ei = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ei === t && (Ei = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (Zf(a || e) === null)
              continue;
            break;
          }
          var u = Ea(e);
          u !== null && (t.splice(l, 3), l -= 3, Lc(
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
    function l(o) {
      return _i(o, t);
    }
    Qe !== null && _i(Qe, t), Le !== null && _i(Le, t), Ve !== null && _i(Ve, t), In.forEach(l), Pn.forEach(l);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      gm(e), e.blockedOn === null && Ze.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[vl] || null;
        if (typeof u == "function")
          i || bm(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[vl] || null)
              f = i.formAction;
            else if (Zf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), bm(e);
        }
      }
  }
  function pm() {
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
  function Jf(t) {
    this._internalRoot = t;
  }
  Ti.prototype.render = Jf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = jl();
    rm(e, a, t, l, null, null);
  }, Ti.prototype.unmount = Jf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      rm(t.current, 2, null, t, null, null), ai(), l[pa] = null;
    }
  };
  function Ti(t) {
    this._internalRoot = t;
  }
  Ti.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Ds();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ze.length && l !== 0 && l < Ze[e].priority; e++) ;
      Ze.splice(e, 0, t), e === 0 && gm(t);
    }
  };
  var _m = y.version;
  if (_m !== "19.2.6")
    throw Error(
      s(
        527,
        _m,
        "19.2.6"
      )
    );
  q.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = p(l), t = t !== null ? U(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var N0 = {
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
        kl = zi.inject(
          N0
        ), El = zi;
      } catch {
      }
  }
  return eu.createRoot = function(t, l) {
    if (!A(t)) throw Error(s(299));
    var e = !1, a = "", n = xr, u = Dr, i = jr;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = sm(
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
      pm
    ), t[pa] = l.current, Of(t), new Jf(l);
  }, eu.hydrateRoot = function(t, l, e) {
    if (!A(t)) throw Error(s(299));
    var a = !1, n = "", u = xr, i = Dr, f = jr, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = sm(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      o,
      u,
      i,
      f,
      pm
    ), l.context = om(null), e = l.current, a = jl(), a = Hi(a), n = De(a), n.callback = null, je(e, n, a), e = a, l.current.lanes = e, rn(l, e), $l(l), t[pa] = l.current, Of(t), new Ti(l);
  }, eu.version = "19.2.6", eu;
}
var Mm;
function B0() {
  if (Mm) return Wf.exports;
  Mm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), Wf.exports = q0(), Wf.exports;
}
var Y0 = B0(), Pf = { exports: {} }, ts = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rm;
function G0() {
  if (Rm) return ts;
  Rm = 1;
  var c = Ri();
  function y(M, z) {
    return M === z && (M !== 0 || 1 / M === 1 / z) || M !== M && z !== z;
  }
  var v = typeof Object.is == "function" ? Object.is : y, s = c.useState, A = c.useEffect, R = c.useLayoutEffect, D = c.useDebugValue;
  function B(M, z) {
    var C = z(), Q = s({ inst: { value: C, getSnapshot: z } }), W = Q[0].inst, I = Q[1];
    return R(
      function() {
        W.value = C, W.getSnapshot = z, j(W) && I({ inst: W });
      },
      [M, C, z]
    ), A(
      function() {
        return j(W) && I({ inst: W }), M(function() {
          j(W) && I({ inst: W });
        });
      },
      [M]
    ), D(C), C;
  }
  function j(M) {
    var z = M.getSnapshot;
    M = M.value;
    try {
      var C = z();
      return !v(M, C);
    } catch {
      return !0;
    }
  }
  function p(M, z) {
    return z();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : B;
  return ts.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : U, ts;
}
var Um;
function X0() {
  return Um || (Um = 1, Pf.exports = G0()), Pf.exports;
}
var Cm = X0();
const wm = 0, $m = 1, Wm = 2, Hm = 3;
var qm = Object.prototype.hasOwnProperty;
function cs(c, y) {
  var v, s;
  if (c === y) return !0;
  if (c && y && (v = c.constructor) === y.constructor) {
    if (v === Date) return c.getTime() === y.getTime();
    if (v === RegExp) return c.toString() === y.toString();
    if (v === Array) {
      if ((s = c.length) === y.length)
        for (; s-- && cs(c[s], y[s]); ) ;
      return s === -1;
    }
    if (!v || typeof c == "object") {
      s = 0;
      for (v in c)
        if (qm.call(c, v) && ++s && !qm.call(y, v) || !(v in y) || !cs(c[v], y[v])) return !1;
      return Object.keys(y).length === s;
    }
  }
  return c !== c && y !== y;
}
const ge = /* @__PURE__ */ new WeakMap(), Se = () => {
}, cl = (
  /*#__NOINLINE__*/
  Se()
), fs = Object, dt = (c) => c === cl, Wl = (c) => typeof c == "function", $e = (c, y) => ({
  ...c,
  ...y
}), Fm = (c) => Wl(c.then), ls = {}, Ai = {}, Ss = "undefined", uu = typeof window != Ss, ss = typeof document != Ss, Q0 = uu && "Deno" in window, L0 = () => uu && typeof window.requestAnimationFrame != Ss, km = (c, y) => {
  const v = ge.get(c);
  return [
    // Getter
    () => !dt(y) && c.get(y) || ls,
    // Setter
    (s) => {
      if (!dt(y)) {
        const A = c.get(y);
        y in Ai || (Ai[y] = A), v[5](y, $e(A, s), A || ls);
      }
    },
    // Subscriber
    v[6],
    // Get server cache snapshot
    () => !dt(y) && y in Ai ? Ai[y] : !dt(y) && c.get(y) || ls
  ];
};
let os = !0;
const V0 = () => os, [rs, ds] = uu && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], Z0 = () => {
  const c = ss && document.visibilityState;
  return dt(c) || c !== "hidden";
}, K0 = (c) => (ss && document.addEventListener("visibilitychange", c), rs("focus", c), () => {
  ss && document.removeEventListener("visibilitychange", c), ds("focus", c);
}), J0 = (c) => {
  const y = () => {
    os = !0, c();
  }, v = () => {
    os = !1;
  };
  return rs("online", y), rs("offline", v), () => {
    ds("online", y), ds("offline", v);
  };
}, w0 = {
  isOnline: V0,
  isVisible: Z0
}, $0 = {
  initFocus: K0,
  initReconnect: J0
}, Bm = !gs.useId, nn = !uu || Q0, W0 = (c) => L0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), es = nn ? G.useEffect : G.useLayoutEffect, as = typeof navigator < "u" && navigator.connection, Ym = !nn && as && ([
  "slow-2g",
  "2g"
].includes(as.effectiveType) || as.saveData), Ni = /* @__PURE__ */ new WeakMap(), F0 = (c) => fs.prototype.toString.call(c), ns = (c, y) => c === `[object ${y}]`;
let k0 = 0;
const ms = (c) => {
  const y = typeof c, v = F0(c), s = ns(v, "Date"), A = ns(v, "RegExp"), R = ns(v, "Object");
  let D, B;
  if (fs(c) === c && !s && !A) {
    if (D = Ni.get(c), D) return D;
    if (D = ++k0 + "~", Ni.set(c, D), Array.isArray(c)) {
      for (D = "@", B = 0; B < c.length; B++)
        D += ms(c[B]) + ",";
      Ni.set(c, D);
    }
    if (R) {
      D = "#";
      const j = fs.keys(c).sort();
      for (; !dt(B = j.pop()); )
        dt(c[B]) || (D += B + ":" + ms(c[B]) + ",");
      Ni.set(c, D);
    }
  } else
    D = s ? c.toJSON() : y == "symbol" ? c.toString() : y == "string" ? JSON.stringify(c) : "" + c;
  return D;
}, bs = (c) => {
  if (Wl(c))
    try {
      c = c();
    } catch {
      c = "";
    }
  const y = c;
  return c = typeof c == "string" ? c : (Array.isArray(c) ? c.length : c) ? ms(c) : "", [
    c,
    y
  ];
};
let I0 = 0;
const vs = () => ++I0;
async function Im(...c) {
  const [y, v, s, A] = c, R = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof A == "boolean" ? {
    revalidate: A
  } : A || {});
  let D = R.populateCache;
  const B = R.rollbackOnError;
  let j = R.optimisticData;
  const p = (z) => typeof B == "function" ? B(z) : B !== !1, U = R.throwOnError;
  if (Wl(v)) {
    const z = v, C = [], Q = y.keys();
    for (const W of Q)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(W) && z(y.get(W)._k) && C.push(W);
    return Promise.all(C.map(M));
  }
  return M(v);
  async function M(z) {
    const [C] = bs(z);
    if (!C) return;
    const [Q, W] = km(y, C), [I, ct, V, bt] = ge.get(y), J = () => {
      const Xt = I[C];
      return (Wl(R.revalidate) ? R.revalidate(Q().data, z) : R.revalidate !== !1) && (delete V[C], delete bt[C], Xt && Xt[0]) ? Xt[0](Wm).then(() => Q().data) : Q().data;
    };
    if (c.length < 3)
      return J();
    let tt = s, ut, Z = !1;
    const pt = vs();
    ct[C] = [
      pt,
      0
    ];
    const nt = !dt(j), fl = Q(), F = fl.data, Dt = fl._c, sl = dt(Dt) ? F : Dt;
    if (nt && (j = Wl(j) ? j(sl, F) : j, W({
      data: j,
      _c: sl
    })), Wl(tt))
      try {
        tt = tt(sl);
      } catch (Xt) {
        ut = Xt, Z = !0;
      }
    if (tt && Fm(tt))
      if (tt = await tt.catch((Xt) => {
        ut = Xt, Z = !0;
      }), pt !== ct[C][0]) {
        if (Z) throw ut;
        return tt;
      } else Z && nt && p(ut) && (D = !0, W({
        data: sl,
        _c: cl
      }));
    if (D && !Z)
      if (Wl(D)) {
        const Xt = D(tt, sl);
        W({
          data: Xt,
          error: cl,
          _c: cl
        });
      } else
        W({
          data: tt,
          error: cl,
          _c: cl
        });
    if (ct[C][1] = vs(), Promise.resolve(J()).then(() => {
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
const Gm = (c, y) => {
  for (const v in c)
    c[v][0] && c[v][0](y);
}, P0 = (c, y) => {
  if (!ge.has(c)) {
    const v = $e($0, y), s = /* @__PURE__ */ Object.create(null), A = Im.bind(cl, c);
    let R = Se;
    const D = /* @__PURE__ */ Object.create(null), B = (U, M) => {
      const z = D[U] || [];
      return D[U] = z, z.push(M), () => z.splice(z.indexOf(M), 1);
    }, j = (U, M, z) => {
      c.set(U, M);
      const C = D[U];
      if (C)
        for (const Q of C)
          Q(M, z);
    }, p = () => {
      if (!ge.has(c) && (ge.set(c, [
        s,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        A,
        j,
        B
      ]), !nn)) {
        const U = v.initFocus(setTimeout.bind(cl, Gm.bind(cl, s, wm))), M = v.initReconnect(setTimeout.bind(cl, Gm.bind(cl, s, $m)));
        R = () => {
          U && U(), M && M(), ge.delete(c);
        };
      }
    };
    return p(), [
      c,
      A,
      p,
      R
    ];
  }
  return [
    c,
    ge.get(c)[4]
  ];
}, ty = (c, y, v, s, A) => {
  const R = v.errorRetryCount, D = A.retryCount, B = ~~((Math.random() + 0.5) * (1 << (D < 8 ? D : 8))) * v.errorRetryInterval;
  !dt(R) && D > R || setTimeout(s, B, A);
}, ly = cs, [Pm, ey] = P0(/* @__PURE__ */ new Map()), ay = $e(
  {
    // events
    onLoadingSlow: Se,
    onSuccess: Se,
    onError: Se,
    onErrorRetry: ty,
    onDiscarded: Se,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: Ym ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Ym ? 5e3 : 3e3,
    // providers
    compare: ly,
    isPaused: () => !1,
    cache: Pm,
    mutate: ey,
    fallback: {}
  },
  // use web preset by default
  w0
), ny = (c, y) => {
  const v = $e(c, y);
  if (y) {
    const { use: s, fallback: A } = c, { use: R, fallback: D } = y;
    s && R && (v.use = s.concat(R)), A && D && (v.fallback = $e(A, D));
  }
  return v;
}, uy = G.createContext({}), iy = "$inf$", tv = uu && window.__SWR_DEVTOOLS_USE__, cy = tv ? window.__SWR_DEVTOOLS_USE__ : [], fy = () => {
  tv && (window.__SWR_DEVTOOLS_REACT__ = gs);
}, sy = (c) => Wl(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], oy = () => {
  const c = G.useContext(uy);
  return G.useMemo(() => $e(ay, c), [
    c
  ]);
}, ry = (c) => (y, v, s) => c(y, v && ((...R) => {
  const [D] = bs(y), [, , , B] = ge.get(Pm);
  if (D.startsWith(iy))
    return v(...R);
  const j = B[D];
  return dt(j) ? v(...R) : (delete B[D], j);
}), s), dy = cy.concat(ry), my = (c) => function(...v) {
  const s = oy(), [A, R, D] = sy(v), B = ny(s, D);
  let j = c;
  const { use: p } = B, U = (p || []).concat(dy);
  for (let M = U.length; M--; )
    j = U[M](j);
  return j(A, R || B.fetcher || null, B);
}, vy = (c, y, v) => {
  const s = y[c] || (y[c] = []);
  return s.push(v), () => {
    const A = s.indexOf(v);
    A >= 0 && (s[A] = s[s.length - 1], s.pop());
  };
};
fy();
const us = gs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
}), is = {
  dedupe: !0
}, Xm = Promise.resolve(cl), hy = () => Se, yy = (c, y, v) => {
  const { cache: s, compare: A, suspense: R, fallbackData: D, revalidateOnMount: B, revalidateIfStale: j, refreshInterval: p, refreshWhenHidden: U, refreshWhenOffline: M, keepPreviousData: z, strictServerPrefetchWarning: C } = v, [Q, W, I, ct] = ge.get(s), [V, bt] = bs(c), J = G.useRef(!1), tt = G.useRef(!1), ut = G.useRef(V), Z = G.useRef(y), pt = G.useRef(v), nt = () => pt.current, fl = () => nt().isVisible() && nt().isOnline(), [F, Dt, sl, Xt] = km(s, V), Ft = G.useRef({}).current, E = dt(D) ? dt(v.fallback) ? cl : v.fallback[V] : D, q = (Tt, Ht) => {
    for (const jt in Ft) {
      const Mt = jt;
      if (Mt === "data") {
        if (!A(Tt[Mt], Ht[Mt]) && (!dt(Tt[Mt]) || !A(lt, Ht[Mt])))
          return !1;
      } else if (Ht[Mt] !== Tt[Mt])
        return !1;
    }
    return !0;
  }, w = !J.current, gt = G.useMemo(() => {
    const Tt = F(), Ht = Xt(), jt = (Lt) => {
      const Rt = $e(Lt);
      return delete Rt._k, (() => {
        if (!V || !y || nt().isPaused()) return !1;
        if (w && !dt(B)) return B;
        const pe = dt(E) ? Rt.data : E;
        return dt(pe) || j;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...Rt
      } : Rt;
    }, Mt = jt(Tt), rl = Tt === Ht ? Mt : jt(Ht);
    let dl = Mt;
    return [
      () => {
        const Lt = jt(F());
        return q(Lt, dl) ? (dl.data = Lt.data, dl.isLoading = Lt.isLoading, dl.isValidating = Lt.isValidating, dl.error = Lt.error, dl) : (dl = Lt, Lt);
      },
      () => rl
    ];
  }, [
    s,
    V
  ]), vt = Cm.useSyncExternalStore(G.useCallback(
    (Tt) => sl(V, (Ht, jt) => {
      q(jt, Ht) || Tt();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      V
    ]
  ), gt[0], gt[1]), m = Q[V] && Q[V].length > 0, O = vt.data, H = dt(O) ? E && Fm(E) ? us(E) : E : O, Y = vt.error, k = G.useRef(H), lt = z ? dt(O) ? dt(k.current) ? H : k.current : O : H, it = V && dt(H), Qt = G.useRef(null);
  !nn && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  Cm.useSyncExternalStore(hy, () => (Qt.current = !1, Qt), () => (Qt.current = !0, Qt));
  const Bt = Qt.current;
  C && Bt && !R && it && console.warn(`Missing pre-initiated data for serialized key "${V}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !V || !y || nt().isPaused() || m && !dt(Y) ? !1 : w && !dt(B) ? B : R ? dt(H) ? !1 : j : dt(H) || j, We = w && be, cn = dt(vt.isValidating) ? We : vt.isValidating, cu = dt(vt.isLoading) ? We : vt.isLoading, _l = G.useCallback(
    async (Tt) => {
      const Ht = Z.current;
      if (!V || !Ht || tt.current || nt().isPaused())
        return !1;
      let jt, Mt, rl = !0;
      const dl = Tt || {}, Lt = !I[V] || !dl.dedupe, Rt = () => Bm ? !tt.current && V === ut.current && J.current : V === ut.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, pe = () => {
        Dt(Fe);
      }, fn = () => {
        const ml = I[V];
        ml && ml[1] === Mt && delete I[V];
      }, ke = {
        isValidating: !0
      };
      dt(F().data) && (ke.isLoading = !0);
      try {
        if (Lt && (Dt(ke), v.loadingTimeout && dt(F().data) && setTimeout(() => {
          rl && Rt() && nt().onLoadingSlow(V, v);
        }, v.loadingTimeout), I[V] = [
          Ht(bt),
          vs()
        ]), [jt, Mt] = I[V], jt = await jt, Lt && setTimeout(fn, v.dedupingInterval), !I[V] || I[V][1] !== Mt)
          return Lt && Rt() && nt().onDiscarded(V), !1;
        Fe.error = cl;
        const ml = W[V];
        if (!dt(ml) && // case 1
        (Mt <= ml[0] || // case 2
        Mt <= ml[1] || // case 3
        ml[1] === 0))
          return pe(), Lt && Rt() && nt().onDiscarded(V), !1;
        const Ml = F().data;
        Fe.data = A(Ml, jt) ? Ml : jt, Lt && Rt() && nt().onSuccess(jt, V, v);
      } catch (ml) {
        fn();
        const Ml = nt(), { shouldRetryOnError: sn } = Ml;
        Ml.isPaused() || (Fe.error = ml, Lt && Rt() && (Ml.onError(ml, V, Ml), (sn === !0 || Wl(sn) && sn(ml)) && (!nt().revalidateOnFocus || !nt().revalidateOnReconnect || fl()) && Ml.onErrorRetry(ml, V, Ml, (Ui) => {
          const kl = Q[V];
          kl && kl[0] && kl[0](Hm, Ui);
        }, {
          retryCount: (dl.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return rl = !1, pe(), !0;
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
      s
    ]
  ), ba = G.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...Tt) => Im(s, ut.current, ...Tt),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (es(() => {
    Z.current = y, pt.current = v, dt(O) || (k.current = O);
  }), es(() => {
    if (!V) return;
    const Tt = _l.bind(cl, is);
    let Ht = 0;
    nt().revalidateOnFocus && (Ht = Date.now() + nt().focusThrottleInterval);
    const Mt = vy(V, Q, (rl, dl = {}) => {
      if (rl == wm) {
        const Lt = Date.now();
        nt().revalidateOnFocus && Lt > Ht && fl() && (Ht = Lt + nt().focusThrottleInterval, Tt());
      } else if (rl == $m)
        nt().revalidateOnReconnect && fl() && Tt();
      else {
        if (rl == Wm)
          return _l();
        if (rl == Hm)
          return _l(dl);
      }
    });
    return tt.current = !1, ut.current = V, J.current = !0, Dt({
      _k: bt
    }), be && (I[V] || (dt(H) || nn ? Tt() : W0(Tt))), () => {
      tt.current = !0, Mt();
    };
  }, [
    V
  ]), es(() => {
    let Tt;
    function Ht() {
      const Mt = Wl(p) ? p(F().data) : p;
      Mt && Tt !== -1 && (Tt = setTimeout(jt, Mt));
    }
    function jt() {
      !F().error && (U || nt().isVisible()) && (M || nt().isOnline()) ? _l(is).then(Ht) : Ht();
    }
    return Ht(), () => {
      Tt && (clearTimeout(Tt), Tt = -1);
    };
  }, [
    p,
    U,
    M,
    V
  ]), G.useDebugValue(lt), R) {
    if (!Bm && nn && it)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    it && (Z.current = y, pt.current = v, tt.current = !1);
    const Tt = ct[V], Ht = !dt(Tt) && it ? ba(Tt) : Xm;
    if (us(Ht), !dt(Y) && it)
      throw Y;
    const jt = it ? _l(is) : Xm;
    !dt(lt) && it && (jt.status = "fulfilled", jt.value = !0), us(jt);
  }
  return {
    mutate: ba,
    get data() {
      return Ft.data = !0, lt;
    },
    get error() {
      return Ft.error = !0, Y;
    },
    get isValidating() {
      return Ft.isValidating = !0, cn;
    },
    get isLoading() {
      return Ft.isLoading = !0, cu;
    }
  };
}, xi = my(yy), ps = "/api/v1/extensions/nexus.video.ltx23", hs = 8 * 1024 * 1024, lv = [
  "image/png",
  "image/jpeg",
  "image/webp"
];
async function ye(c, y) {
  const v = await fetch(`${ps}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!v.ok) {
    const s = await v.text();
    throw new Error(`${v.status} ${v.statusText}: ${s}`);
  }
  return await v.json();
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
    const v = await fetch(`${ps}/input-images`, {
      method: "POST",
      body: y
    });
    if (!v.ok) {
      const s = await v.text();
      throw new Error(`${v.status} ${v.statusText}: ${s}`);
    }
    return await v.json();
  }
};
function gy(c) {
  return `${ps}/artifacts/${c}`;
}
const Sy = "/api/v1", Qm = "nexus.video.ltx23";
async function Lm(c, y) {
  const v = await fetch(`${Sy}${c}`, {
    headers: { "Content-Type": "application/json", ...y?.headers ?? {} },
    ...y
  });
  if (!v.ok) {
    const A = await v.text();
    throw new Error(`${v.status}: ${A}`);
  }
  return (await v.json()).data;
}
const Vm = {
  listDependencies: () => Lm(`/extensions/${Qm}/dependencies`),
  startInstall: (c = !1) => Lm(
    `/extensions/${Qm}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Zm = {
  status: (c) => ye(`/profiles/${c}/install`),
  start: (c) => ye(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var by = "_1vmg9ib0", un = "_1vmg9ib1", au = "_1vmg9ib2", py = "_1vmg9ib3", ul = "_1vmg9ib4", il = "_1vmg9ib5", Fl = "_1vmg9ib6", ev = "_1vmg9ib7 _1vmg9ib6", Km = "_1vmg9ib8 _1vmg9ib6", Di = "_1vmg9ib9", _s = "_1vmg9iba", Es = "_1vmg9ibb _1vmg9iba", _y = "_1vmg9ibc _1vmg9iba", Oi = "_1vmg9ibd _1vmg9iba", iu = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", av = "_1vmg9ibj _1vmg9ibi", nv = "_1vmg9ibk _1vmg9ibi", uv = "_1vmg9ibl _1vmg9ibi", iv = "_1vmg9ibm _1vmg9ibi", nu = "_1vmg9ibn", Sa = "_1vmg9ibo", Ey = "_1vmg9ibp", Ty = "_1vmg9ibq", ys = "_1vmg9ibs _1vmg9ibr", cv = "_1vmg9ibt _1vmg9ibr", fv = "_1vmg9ibu _1vmg9ibr", sv = "_1vmg9ibv _1vmg9ibr", zy = "_1vmg9ibw", Ay = "_1vmg9ibx", Ny = "_1vmg9iby", Oy = "_1vmg9ibz", xy = "_1vmg9ib10 _1vmg9iba", xt = "_1vmg9ib11", Dy = "_1vmg9ib12", jy = "_1vmg9ib13", My = "_1vmg9ib14", Ry = "_1vmg9ib15", Uy = "_1vmg9ib16", Ts = "_1vmg9ib17", zs = "_1vmg9ib18", Jm = "_1vmg9ib19", Cy = "_1vmg9ib1a", Hy = "_1vmg9ib1b", qy = "_1vmg9ib1c", By = "_1vmg9ib1d _1vmg9ibd _1vmg9iba", Yy = "_1vmg9ib1e";
function ji(c) {
  return c < 1024 ? `${c} B` : c < 1024 * 1024 ? `${(c / 1024).toFixed(1)} KB` : `${(c / (1024 * 1024)).toFixed(2)} MB`;
}
function Gy(c) {
  return lv.includes(c.type) ? c.size === 0 ? "The selected file is empty." : c.size > hs ? `Image is ${ji(c.size)} — limit is ${ji(
    hs
  )}.` : null : `Unsupported type ${c.type || "unknown"}. Use PNG, JPEG, or WEBP.`;
}
function Xy({
  artifactId: c,
  onChange: y
}) {
  const v = G.useId(), s = G.useRef(null), [A, R] = G.useState(null), [D, B] = G.useState(!1), [j, p] = G.useState(null), [U, M] = G.useState(!1);
  G.useEffect(() => {
    c === void 0 && A !== null && (URL.revokeObjectURL(A.url), R(null), p(null));
  }, [c, A]), G.useEffect(
    () => () => {
      A !== null && URL.revokeObjectURL(A.url);
    },
    [A]
  );
  const z = G.useCallback(
    async (J) => {
      const tt = Gy(J);
      if (tt !== null) {
        p(tt);
        return;
      }
      const ut = URL.createObjectURL(J), Z = A;
      R({
        url: ut,
        fileName: J.name,
        byteLength: J.size,
        mime: J.type
      }), B(!0), p(null);
      let pt;
      try {
        pt = await ga.uploadInputImage(J);
      } catch (nt) {
        URL.revokeObjectURL(ut), R(Z), p(nt instanceof Error ? nt.message : String(nt)), B(!1);
        return;
      }
      Z !== null && URL.revokeObjectURL(Z.url), y(pt.artifact_id), B(!1);
    },
    [y, A]
  ), C = G.useCallback(
    (J) => {
      const tt = J.target.files?.[0];
      J.target.value = "", tt !== void 0 && z(tt);
    },
    [z]
  ), Q = G.useCallback(
    (J) => {
      J.preventDefault(), J.stopPropagation(), M(!1);
      const tt = J.dataTransfer.files?.[0];
      tt !== void 0 && z(tt);
    },
    [z]
  ), W = G.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), M(!0);
  }, []), I = G.useCallback((J) => {
    J.preventDefault(), J.stopPropagation(), M(!1);
  }, []), ct = G.useCallback(
    (J) => {
      (J.key === " " || J.key === "Enter") && (J.preventDefault(), s.current?.click());
    },
    []
  );
  G.useEffect(() => {
    const J = (tt) => {
      if (D) return;
      const ut = tt.clipboardData?.items;
      if (ut) {
        for (const Z of ut)
          if (Z.kind === "file" && Z.type.startsWith("image/")) {
            const pt = Z.getAsFile();
            if (pt !== null) {
              tt.preventDefault(), z(pt);
              return;
            }
          }
      }
    };
    return window.addEventListener("paste", J), () => window.removeEventListener("paste", J);
  }, [z, D]);
  const V = G.useCallback(() => {
    A !== null && URL.revokeObjectURL(A.url), R(null), p(null), y(void 0);
  }, [y, A]);
  if (A !== null && c !== void 0 && !D)
    return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: v, children: "Reference image" }),
      /* @__PURE__ */ r.jsxs("div", { className: Hy, children: [
        /* @__PURE__ */ r.jsx(
          "img",
          {
            className: qy,
            src: A.url,
            alt: "Reference frame to condition the first segment of the render."
          }
        ),
        /* @__PURE__ */ r.jsxs("div", { children: [
          /* @__PURE__ */ r.jsx("div", { style: { color: "inherit", fontSize: 13 }, children: A.fileName }),
          /* @__PURE__ */ r.jsxs("div", { className: xt, children: [
            A.mime,
            " · ",
            ji(A.byteLength)
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: xt, style: { marginTop: 2 }, children: [
            "artifact: ",
            c
          ] })
        ] }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: By,
            onClick: V,
            "aria-label": "Remove reference image",
            title: "Remove reference image",
            children: "✕"
          }
        )
      ] })
    ] });
  const bt = U ? `${Jm} ${Cy}` : Jm;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: v, children: "Reference image (optional)" }),
    /* @__PURE__ */ r.jsxs(
      "label",
      {
        className: bt,
        htmlFor: v,
        onDrop: Q,
        onDragOver: W,
        onDragLeave: I,
        onKeyDown: ct,
        tabIndex: 0,
        role: "button",
        "aria-label": "Upload reference image (drag, paste, or click)",
        "aria-busy": D,
        children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              ref: s,
              id: v,
              type: "file",
              accept: lv.join(","),
              style: { display: "none" },
              onChange: C,
              disabled: D
            }
          ),
          /* @__PURE__ */ r.jsx("strong", { style: { color: "inherit" }, children: D ? "Uploading…" : U ? "Drop to upload" : "Drag, paste, or click" }),
          /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
            "PNG · JPEG · WEBP, up to ",
            ji(hs),
            ". Anchors the first segment's identity; later segments still chain off the prior segment's last frame."
          ] })
        ]
      }
    ),
    j !== null ? /* @__PURE__ */ r.jsx("div", { className: Sa, role: "alert", children: j }) : null
  ] });
}
const Qy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Ly() {
  const [c, y] = G.useState(Qy), [v, s] = G.useState(null), [A, R] = G.useState(null), [D, B] = G.useState(!1), [j, p] = G.useState(null), [U, M] = G.useState(null), [z, C] = G.useState(!1), [Q, W] = G.useState(!1), [I, ct] = G.useState(
    null
  ), [V, bt] = G.useState(null), { data: J } = xi(
    "ltx:runtime-profiles",
    () => ga.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: tt, mutate: ut } = xi(
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
    B(!0), R(null);
    try {
      const F = await ga.plan(c);
      s(F);
    } catch (F) {
      R(F instanceof Error ? F.message : String(F)), s(null);
    } finally {
      B(!1);
    }
  }, [c]), pt = G.useCallback(async () => {
    C(!0), M(null);
    try {
      const F = await ga.createRender(c);
      p(F.id), ut();
    } catch (F) {
      M(F instanceof Error ? F.message : String(F));
    } finally {
      C(!1);
    }
  }, [c, ut]), nt = G.useCallback(async () => {
    if (!(!j || Q)) {
      W(!0), M(null);
      try {
        await ga.cancel(j), ut();
      } catch (F) {
        M(
          `Cancel failed: ${F instanceof Error ? F.message : String(F)}`
        );
      } finally {
        W(!1);
      }
    }
  }, [j, Q, ut]), fl = G.useCallback(
    async (F) => {
      if (!(!j || I !== null)) {
        ct(F), bt(null);
        try {
          await ga.retrySegment(j, F), ut();
        } catch (Dt) {
          bt(
            `Retry of segment ${F + 1} failed: ${Dt instanceof Error ? Dt.message : String(Dt)}`
          );
        } finally {
          ct(null);
        }
      }
    },
    [j, I, ut]
  );
  return /* @__PURE__ */ r.jsxs("div", { className: by, children: [
    /* @__PURE__ */ r.jsxs("div", { className: jy, children: [
      /* @__PURE__ */ r.jsx(Vy, {}),
      /* @__PURE__ */ r.jsx(
        Jy,
        {
          draft: c,
          onChange: y,
          profiles: J ?? [],
          onPlan: Z,
          onSubmit: pt,
          planning: D,
          submitting: z,
          plan: v,
          planError: A,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx(
      t1,
      {
        run: tt ?? null,
        onCancel: nt,
        cancelling: Q,
        onRetrySegment: fl,
        retryingSegmentIndex: I,
        retryError: V
      }
    )
  ] });
}
function Vy() {
  const [c, y] = G.useState(!1), [v, s] = G.useState(null), { data: A, mutate: R } = xi(
    "host:dependencies",
    () => Vm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (z) => z.status === "running" || z.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), D = G.useCallback(
    async (U = !1) => {
      y(!0), s(null);
      try {
        await Vm.startInstall(U), R();
      } catch (M) {
        s(M instanceof Error ? M.message : String(M));
      } finally {
        y(!1);
      }
    },
    [R]
  );
  if (!A) return null;
  const B = A.steps.find((U) => U.status === "failed"), j = A.all_satisfied, p = A.steps.some(
    (U) => U.status === "running" || !j && U.status === "pending"
  );
  return /* @__PURE__ */ r.jsxs("section", { className: un, children: [
    /* @__PURE__ */ r.jsxs("div", { className: My, children: [
      /* @__PURE__ */ r.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ r.jsx("span", { className: Zy(j, !!B, p), children: j ? "ready" : B ? "install failed" : p ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ r.jsx("ul", { className: Ry, children: A.steps.map((U) => /* @__PURE__ */ r.jsxs("li", { className: Uy, children: [
      /* @__PURE__ */ r.jsx("span", { className: Ky(U.status) }),
      /* @__PURE__ */ r.jsx("span", { children: U.id }),
      /* @__PURE__ */ r.jsx("span", { className: xt, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    B?.last_error ? /* @__PURE__ */ r.jsxs("div", { className: Sa, children: [
      /* @__PURE__ */ r.jsxs("strong", { children: [
        B.id,
        " failed"
      ] }),
      ": ",
      B.last_error.message
    ] }) : null,
    v ? /* @__PURE__ */ r.jsx("div", { className: Sa, children: v }) : null,
    !j || B ? /* @__PURE__ */ r.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: _s,
          disabled: c || p,
          onClick: () => void D(!1),
          children: p || c ? "Installing…" : "Install runtime"
        }
      ),
      B ? /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: Es,
          disabled: c || p,
          onClick: () => void D(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Zy(c, y, v) {
  return y ? iv : c ? av : v ? nv : uv;
}
function Ky(c) {
  switch (c) {
    case "ok":
      return fv;
    case "running":
      return cv;
    case "failed":
      return sv;
    default:
      return ys;
  }
}
function Jy({
  draft: c,
  onChange: y,
  profiles: v,
  onPlan: s,
  onSubmit: A,
  planning: R,
  submitting: D,
  plan: B,
  planError: j,
  submitError: p
}) {
  const U = G.useCallback(
    (z, C) => y({ ...c, [z]: C }),
    [c, y]
  ), M = G.useCallback(
    (z) => {
      z.preventDefault(), !(D || c.prompt.trim().length === 0) && A();
    },
    [D, c.prompt, A]
  );
  return /* @__PURE__ */ r.jsxs("form", { className: un, onSubmit: M, noValidate: !0, children: [
    /* @__PURE__ */ r.jsx("h2", { className: au, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ r.jsx("p", { className: py, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ r.jsx("div", { className: ul, children: /* @__PURE__ */ r.jsx(
      Xy,
      {
        artifactId: c.input_image_artifact_id,
        onChange: (z) => U("input_image_artifact_id", z)
      }
    ) }),
    /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
      /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ r.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: ev,
          value: c.prompt,
          onChange: (z) => U("prompt", z.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
      /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          id: "ltx-neg",
          className: Fl,
          value: c.negative_prompt ?? "",
          onChange: (z) => U(
            "negative_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
      /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          id: "ltx-character",
          className: Fl,
          value: c.character_prompt ?? "",
          onChange: (z) => U(
            "character_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: xt, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
      /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          id: "ltx-style",
          className: Fl,
          value: c.style_prompt ?? "",
          onChange: (z) => U(
            "style_prompt",
            z.target.value.length > 0 ? z.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: xt, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ r.jsx(ky, { draft: c, update: U }),
    /* @__PURE__ */ r.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            id: "ltx-duration",
            className: Fl,
            type: "number",
            min: 1,
            max: 300,
            value: c.duration_seconds,
            onChange: (z) => {
              const C = Number(z.target.value);
              Number.isFinite(C) && U(
                "duration_seconds",
                Math.max(1, Math.min(300, C))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            id: "ltx-seed",
            className: Fl,
            type: "number",
            value: c.seed ?? "",
            onChange: (z) => {
              const C = z.target.value;
              if (C === "") {
                U("seed", void 0);
                return;
              }
              const Q = Number(C);
              Number.isFinite(Q) && U("seed", Q);
            },
            placeholder: "leave blank for random"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Di, children: [
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ r.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Km,
            value: c.runtime_profile,
            onChange: (z) => U(
              "runtime_profile",
              z.target.value
            ),
            children: [
              /* @__PURE__ */ r.jsx("option", { value: "auto", children: "Auto (recommended)" }),
              /* @__PURE__ */ r.jsx("option", { value: "rtx40-fp8", children: "RTX 40 FP8" }),
              /* @__PURE__ */ r.jsx("option", { value: "rtx50-fp8", children: "RTX 50 FP8 (Blackwell)" }),
              /* @__PURE__ */ r.jsx("option", { value: "rtx50-nvfp4", children: "RTX 50 NVFP4 (experimental)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ r.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Km,
            value: c.quality_preset,
            onChange: (z) => U("quality_preset", z.target.value),
            children: [
              /* @__PURE__ */ r.jsx("option", { value: "draft", children: "Draft (fastest)" }),
              /* @__PURE__ */ r.jsx("option", { value: "balanced_16gb", children: "Balanced 16 GB" }),
              /* @__PURE__ */ r.jsx("option", { value: "quality_16gb", children: "Quality 16 GB" }),
              /* @__PURE__ */ r.jsx("option", { value: "high", children: "High (24 GB+)" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsx(Fy, { profiles: v, selected: c.runtime_profile }),
    /* @__PURE__ */ r.jsx(wy, { selected: c.runtime_profile }),
    /* @__PURE__ */ r.jsx(Iy, { draft: c, update: U }),
    /* @__PURE__ */ r.jsxs("div", { className: iu, children: [
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: Es,
          onClick: s,
          disabled: R || D || c.prompt.trim().length === 0,
          children: R ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "submit",
          className: _s,
          disabled: D || c.prompt.trim().length === 0,
          "aria-busy": D,
          children: D ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    j ? /* @__PURE__ */ r.jsx("div", { className: Sa, role: "alert", children: j }) : null,
    p ? /* @__PURE__ */ r.jsx("div", { className: Sa, role: "alert", children: p }) : null,
    B ? /* @__PURE__ */ r.jsx(Py, { plan: B }) : null
  ] });
}
function wy({
  selected: c
}) {
  const y = Wy(c), [v, s] = G.useState(!1), [A, R] = G.useState(null), { data: D, mutate: B } = xi(
    y ? `profile-install:${y}` : null,
    () => y ? Zm.status(y) : Promise.resolve(null),
    {
      refreshInterval: (z) => z && z.in_flight ? 2e3 : 0
    }
  ), j = G.useCallback(async () => {
    if (y) {
      s(!0), R(null);
      try {
        await Zm.start(y), B();
      } catch (z) {
        R(z instanceof Error ? z.message : String(z));
      } finally {
        s(!1);
      }
    }
  }, [y, B]);
  if (!y || !D) return null;
  if (D.installed)
    return /* @__PURE__ */ r.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ r.jsx("strong", { children: "Runtime installed" }),
      " · ",
      D.repo
    ] });
  const p = D.in_flight || v, U = ov(D.phase), M = p ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ r.jsxs("div", { className: nu, children: [
    /* @__PURE__ */ r.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    D.repo ?? "unknown repo",
    /* @__PURE__ */ r.jsxs("div", { className: xt, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ r.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      D.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    D.last_error ? /* @__PURE__ */ r.jsxs("div", { className: xt, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      D.last_error
    ] }) : null,
    A ? /* @__PURE__ */ r.jsx("div", { className: xt, style: { marginTop: 4, color: "#e57373" }, children: A }) : null,
    /* @__PURE__ */ r.jsx("div", { className: iu, style: { marginTop: 8 }, children: /* @__PURE__ */ r.jsx(
      "button",
      {
        type: "button",
        className: _s,
        disabled: p,
        onClick: () => void j(),
        children: M
      }
    ) }),
    /* @__PURE__ */ r.jsx(
      $y,
      {
        phase: D.phase,
        recentProgress: D.recent_progress
      }
    )
  ] });
}
function ov(c) {
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
function $y({
  phase: c,
  recentProgress: y
}) {
  if (!c && y.length === 0) return null;
  const v = ov(c);
  return /* @__PURE__ */ r.jsxs("details", { className: Ts, children: [
    /* @__PURE__ */ r.jsxs("summary", { className: zs, children: [
      "Install progress",
      v ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
        " · ",
        v
      ] }) : null,
      y.length > 0 ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
        " · ",
        y.length,
        " lines"
      ] }) : null
    ] }),
    y.length === 0 ? /* @__PURE__ */ r.jsx("p", { className: xt, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ r.jsx("pre", { className: Yy, children: y.join(`
`) })
  ] });
}
function Wy(c) {
  return c === "auto" ? null : c;
}
function Fy({
  profiles: c,
  selected: y
}) {
  if (c.length === 0) return null;
  const v = y === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${y}`, s = c.find((R) => R.runtime_id === v);
  if (!s) return null;
  const A = s.healthy ? "ok" : "warn";
  return /* @__PURE__ */ r.jsxs("div", { className: nu, children: [
    /* @__PURE__ */ r.jsx("strong", { children: s.display_name }),
    ": ",
    s.status_message,
    s.experimental ? " (experimental)" : null
  ] });
}
function ky({
  draft: c,
  update: y
}) {
  const v = c.scenes ?? [], s = G.useRef(0), [A, R] = G.useState(
    () => v.map(() => `scene-${s.current++}`)
  );
  if (A.length !== v.length) {
    const z = A.slice(0, v.length);
    for (; z.length < v.length; )
      z.push(`scene-${s.current++}`);
    R(z);
  }
  const D = G.useCallback(
    (z, C) => {
      y("scenes", z.length > 0 ? z : void 0), R(C);
    },
    [y]
  ), B = G.useCallback(() => {
    const z = v.length > 0 ? c.duration_seconds / (v.length + 1) : c.duration_seconds;
    D(
      [
        ...v,
        { prompt: "", duration_seconds: Math.max(1, Math.round(z)) }
      ],
      [...A, `scene-${s.current++}`]
    );
  }, [v, A, D, c.duration_seconds]), j = G.useCallback(
    (z, C) => {
      const Q = v.map((W, I) => {
        if (I !== z) return W;
        const ct = { ...W };
        return C.prompt !== void 0 && (ct.prompt = C.prompt ?? ""), C.duration_seconds !== void 0 && (C.duration_seconds === null ? delete ct.duration_seconds : ct.duration_seconds = C.duration_seconds), C.seed !== void 0 && (C.seed === null ? delete ct.seed : ct.seed = C.seed), ct;
      });
      D(Q, A);
    },
    [v, A, D]
  ), p = G.useCallback(
    (z) => {
      D(
        v.filter((C, Q) => Q !== z),
        A.filter((C, Q) => Q !== z)
      );
    },
    [v, A, D]
  ), U = G.useCallback(
    (z, C) => {
      const Q = z + C;
      if (Q < 0 || Q >= v.length) return;
      const W = v[z], I = v[Q], ct = A[z], V = A[Q];
      if (W === void 0 || I === void 0 || ct === void 0 || V === void 0)
        return;
      const bt = [...v], J = [...A];
      bt[z] = I, bt[Q] = W, J[z] = V, J[Q] = ct, D(bt, J);
    },
    [v, A, D]
  ), M = v.reduce(
    (z, C) => z + (C.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ r.jsxs("details", { className: Ts, children: [
    /* @__PURE__ */ r.jsxs("summary", { className: zs, children: [
      "Scenes — ",
      v.length === 0 ? "none (single prompt)" : `${v.length} scenes`,
      M > 0 ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
        " · ",
        M.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ r.jsx("p", { className: xt, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    v.map((z, C) => {
      const Q = A[C] ?? `scene-fallback-${C}`, W = (I) => {
        if (I === "") return null;
        const ct = Number(I);
        return Number.isFinite(ct) ? ct : null;
      };
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: un,
          style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
          children: [
            /* @__PURE__ */ r.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ r.jsxs("strong", { className: xt, children: [
                    "Scene ",
                    C + 1
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ r.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(C, -1),
                        disabled: C === 0,
                        "aria-label": `Move scene ${C + 1} up`,
                        title: "Move up",
                        children: "↑"
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(C, 1),
                        disabled: C === v.length - 1,
                        "aria-label": `Move scene ${C + 1} down`,
                        title: "Move down",
                        children: "↓"
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => p(C),
                        "aria-label": `Remove scene ${C + 1}`,
                        title: "Remove scene",
                        children: "✕"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
              /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: `ltx-${Q}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ r.jsx(
                "textarea",
                {
                  id: `ltx-${Q}-prompt`,
                  className: ev,
                  value: z.prompt,
                  onChange: (I) => j(C, { prompt: I.target.value }),
                  placeholder: "what happens in this scene…",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: Di, children: [
              /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
                /* @__PURE__ */ r.jsx(
                  "label",
                  {
                    className: il,
                    htmlFor: `ltx-${Q}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-duration`,
                    className: Fl,
                    type: "number",
                    min: 1,
                    step: 0.5,
                    value: z.duration_seconds ?? "",
                    onChange: (I) => {
                      j(C, {
                        duration_seconds: W(I.target.value)
                      });
                    },
                    placeholder: "auto"
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
                /* @__PURE__ */ r.jsx(
                  "label",
                  {
                    className: il,
                    htmlFor: `ltx-${Q}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-seed`,
                    className: Fl,
                    type: "number",
                    value: z.seed ?? "",
                    onChange: (I) => {
                      j(C, {
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
    /* @__PURE__ */ r.jsx("div", { className: iu, style: { marginTop: 10 }, children: /* @__PURE__ */ r.jsx(
      "button",
      {
        type: "button",
        className: Es,
        onClick: B,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Iy({
  draft: c,
  update: y
}) {
  const v = c.advanced ?? {}, s = G.useCallback(
    (A, R) => {
      const D = { ...v };
      R == null ? delete D[A] : D[A] = R, y("advanced", Object.keys(D).length > 0 ? D : void 0);
    },
    [v, y]
  );
  return /* @__PURE__ */ r.jsxs("details", { className: Ts, children: [
    /* @__PURE__ */ r.jsxs("summary", { className: zs, children: [
      "Advanced — guidance, steps & offload",
      v.guidance_scale !== void 0 ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
        " · cfg ",
        v.guidance_scale
      ] }) : null,
      v.num_inference_steps !== void 0 ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
        " · ",
        v.num_inference_steps,
        " steps"
      ] }) : null,
      v.offload_mode && v.offload_mode !== "auto" ? /* @__PURE__ */ r.jsx("span", { className: xt, children: ` · offload ${v.offload_mode}` }) : null
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Di, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            id: "ltx-cfg",
            className: Fl,
            type: "number",
            min: 1,
            max: 15,
            step: 0.5,
            value: v.guidance_scale ?? "",
            onChange: (A) => {
              const R = A.target.value;
              s(
                "guidance_scale",
                R === "" ? void 0 : Number(R)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: xt, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-steps", children: "Inference steps" }),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            id: "ltx-steps",
            className: Fl,
            type: "number",
            min: 2,
            max: 50,
            step: 1,
            value: v.num_inference_steps ?? "",
            onChange: (A) => {
              const R = A.target.value;
              s(
                "num_inference_steps",
                R === "" ? void 0 : Math.round(Number(R))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: xt, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
        /* @__PURE__ */ r.jsx("label", { className: il, htmlFor: "ltx-offload-mode", children: "Offload strategy" }),
        /* @__PURE__ */ r.jsxs(
          "select",
          {
            id: "ltx-offload-mode",
            className: Fl,
            value: v.offload_mode ?? "auto",
            onChange: (A) => {
              const R = A.target.value;
              s("offload_mode", R === "auto" ? void 0 : R);
            },
            children: [
              /* @__PURE__ */ r.jsx("option", { value: "auto", children: "Auto (profile default)" }),
              /* @__PURE__ */ r.jsx("option", { value: "none", children: "None — full GPU resident (needs 16 GB+)" }),
              /* @__PURE__ */ r.jsx("option", { value: "model", children: "Model — mid-grained offload (balanced)" }),
              /* @__PURE__ */ r.jsx("option", { value: "sequential", children: "Sequential — per-layer offload (lowest VRAM)" })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: xt, children: "NVFP4 defaults to None; FP8 profiles default to Sequential. Pick None on a 16 GB+ card for the fastest inference." })
      ] })
    ] })
  ] });
}
function Py({ plan: c }) {
  const y = c.vram_risk === "safe" ? av : c.vram_risk === "moderate" ? nv : c.vram_risk === "risky" ? uv : iv;
  return /* @__PURE__ */ r.jsxs("div", { className: un, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ r.jsx("h3", { className: au, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ r.jsx("span", { className: ya, children: c.mode })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ r.jsx("span", { className: ya, children: c.segment_count })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ r.jsxs("span", { className: ya, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ r.jsxs("span", { className: ya, children: [
        c.base_fps,
        " → ",
        c.output_fps,
        " (",
        c.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ r.jsxs("span", { className: ya, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ r.jsxs("span", { className: ya, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ r.jsx("span", { className: y, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ r.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ r.jsx("span", { className: ya, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ r.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((v) => /* @__PURE__ */ r.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ r.jsx("strong", { children: v.code }),
      ": ",
      v.message
    ] }, v.code)) }) : null
  ] });
}
function t1({
  run: c,
  onCancel: y,
  cancelling: v,
  onRetrySegment: s,
  retryingSegmentIndex: A,
  retryError: R
}) {
  if (!c)
    return /* @__PURE__ */ r.jsxs("section", { className: un, children: [
      /* @__PURE__ */ r.jsx("h2", { className: au, children: "Output" }),
      /* @__PURE__ */ r.jsx("p", { className: Dy, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const D = c.status === "completed" || c.status === "failed" || c.status === "cancelled", B = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ r.jsxs("section", { className: un, children: [
    /* @__PURE__ */ r.jsxs("h2", { className: au, children: [
      "Render ",
      f1(c.id)
    ] }),
    /* @__PURE__ */ r.jsxs("p", { className: xt, children: [
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
    /* @__PURE__ */ r.jsx(l1, { run: c }),
    c.error_code ? /* @__PURE__ */ r.jsxs("div", { className: Sa, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ r.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    R ? /* @__PURE__ */ r.jsx("div", { className: Sa, role: "alert", "aria-live": "polite", children: R }) : null,
    /* @__PURE__ */ r.jsx(
      e1,
      {
        segments: c.segments,
        onRetry: B ? s : null,
        retryingSegmentIndex: A
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ r.jsx(c1, { artifactId: c.final_artifact_id }) : null,
    D ? null : /* @__PURE__ */ r.jsx("div", { className: iu, children: /* @__PURE__ */ r.jsx(
      "button",
      {
        type: "button",
        className: _y,
        onClick: y,
        disabled: v,
        "aria-busy": v,
        children: v ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function l1({ run: c }) {
  const y = a1(c), v = u1(c);
  return /* @__PURE__ */ r.jsxs("div", { className: ul, children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13
        },
        children: [
          /* @__PURE__ */ r.jsxs("span", { children: [
            /* @__PURE__ */ r.jsx("strong", { children: c.status }),
            v,
            y ? /* @__PURE__ */ r.jsxs("span", { className: xt, children: [
              " · ",
              y
            ] }) : null
          ] }),
          /* @__PURE__ */ r.jsxs("span", { children: [
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
    /* @__PURE__ */ r.jsx("div", { className: zy, children: /* @__PURE__ */ r.jsx(
      "div",
      {
        className: Ay,
        style: { width: `${Math.max(2, c.progress_percent)}%` }
      }
    ) })
  ] });
}
function e1({
  segments: c,
  onRetry: y,
  retryingSegmentIndex: v
}) {
  return /* @__PURE__ */ r.jsx("div", { className: Ey, children: c.map((s) => {
    const A = v === s.index, R = y !== null && s.status === "failed";
    return /* @__PURE__ */ r.jsxs("div", { className: Ty, children: [
      /* @__PURE__ */ r.jsx("span", { className: i1(s.status) }),
      /* @__PURE__ */ r.jsxs("span", { children: [
        "Segment ",
        s.index + 1,
        " · ",
        s.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ r.jsx("span", { className: xt, children: s.status }),
      R ? /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: Oi,
          onClick: () => y?.(s.index),
          disabled: v !== null,
          "aria-busy": A,
          "aria-label": `Retry segment ${s.index + 1}`,
          children: A ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, s.index);
  }) });
}
function a1(c) {
  if (c.status === "completed" || c.status === "failed" || c.status === "cancelled" || c.segment_count <= 0)
    return null;
  const y = c.segments.filter(
    (D) => D.status === "completed" && D.started_at && D.completed_at
  );
  if (y.length === 0)
    return null;
  const v = y.reduce((D, B) => {
    const j = Date.parse(B.started_at), p = Date.parse(B.completed_at);
    return !Number.isFinite(j) || !Number.isFinite(p) || p <= j ? D : D + (p - j);
  }, 0);
  if (v === 0)
    return null;
  const s = v / y.length, A = c.segment_count - c.completed_segments;
  if (A <= 0)
    return null;
  const R = A * s;
  return `~${n1(R)} remaining`;
}
function n1(c) {
  const y = Math.round(c / 1e3);
  if (y < 60)
    return `${y}s`;
  const v = Math.floor(y / 60), s = y % 60;
  if (v < 60)
    return s === 0 ? `${v}m` : `${v}m ${s}s`;
  const A = Math.floor(v / 60), R = v % 60;
  return `${A}h ${R}m`;
}
function u1(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const y = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, v = c.last_breach_reason?.trim(), s = v ? `VRAM supervisor breach: ${v}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ r.jsxs("span", { className: xt, "aria-live": "polite", title: s, children: [
    " · ",
    "restart ",
    c.restart_count,
    "/",
    y
  ] });
}
function i1(c) {
  switch (c) {
    case "queued":
      return ys;
    case "rendering":
      return cv;
    case "completed":
      return fv;
    case "failed":
      return sv;
    default:
      return ys;
  }
}
function c1({ artifactId: c }) {
  const y = gy(c);
  return /* @__PURE__ */ r.jsxs("div", { className: Ny, children: [
    /* @__PURE__ */ r.jsx("video", { className: Oy, src: y, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ r.jsx(
      "a",
      {
        className: xy,
        href: y,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ r.jsxs("p", { className: xt, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function f1(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const Mi = "ltx23-video-app", s1 = new URL("./ltx23-video.css", import.meta.url).href;
class rv extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = Y0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(y) {
    const v = document.createElement("link");
    v.rel = "stylesheet", v.href = s1, y.appendChild(v);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ r.jsx(G.StrictMode, { children: /* @__PURE__ */ r.jsx(Ly, {}) })
    );
  }
}
customElements.get(Mi) || customElements.define(Mi, rv);
function o1() {
  customElements.get(Mi) || customElements.define(Mi, rv);
}
export {
  o1 as register
};
//# sourceMappingURL=ltx23-video.js.map
