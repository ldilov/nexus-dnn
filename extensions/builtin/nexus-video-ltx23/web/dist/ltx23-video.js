function z0(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Jf = { exports: {} }, tn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bm;
function A0() {
  if (bm) return tn;
  bm = 1;
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function h(s, x, R) {
    var M = null;
    if (R !== void 0 && (M = "" + R), x.key !== void 0 && (M = "" + x.key), "key" in x) {
      R = {};
      for (var B in x)
        B !== "key" && (R[B] = x[B]);
    } else R = x;
    return x = R.ref, {
      $$typeof: c,
      type: s,
      key: M,
      ref: x !== void 0 ? x : null,
      props: R
    };
  }
  return tn.Fragment = g, tn.jsx = h, tn.jsxs = h, tn;
}
var pm;
function N0() {
  return pm || (pm = 1, Jf.exports = A0()), Jf.exports;
}
var m = N0(), wf = { exports: {} }, k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _m;
function O0() {
  if (_m) return k;
  _m = 1;
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), M = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), _ = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), N = Symbol.iterator;
  function C(d) {
    return d === null || typeof d != "object" ? null : (d = N && d[N] || d["@@iterator"], typeof d == "function" ? d : null);
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
  }, w = Object.assign, I = {};
  function ft(d, A, H) {
    this.props = d, this.context = A, this.refs = I, this.updater = H || Q;
  }
  ft.prototype.isReactComponent = {}, ft.prototype.setState = function(d, A) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, A, "setState");
  }, ft.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function L() {
  }
  L.prototype = ft.prototype;
  function pt(d, A, H) {
    this.props = d, this.context = A, this.refs = I, this.updater = H || Q;
  }
  var Nt = pt.prototype = new L();
  Nt.constructor = pt, w(Nt, ft.prototype), Nt.isPureReactComponent = !0;
  var gt = Array.isArray;
  function dt() {
  }
  var $ = { H: null, A: null, T: null, S: null }, Ht = Object.prototype.hasOwnProperty;
  function st(d, A, H) {
    var Y = H.ref;
    return {
      $$typeof: c,
      type: d,
      key: A,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function il(d, A) {
    return st(d.type, A, d.props);
  }
  function W(d) {
    return typeof d == "object" && d !== null && d.$$typeof === c;
  }
  function Ot(d) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(H) {
      return A[H];
    });
  }
  var cl = /\/+/g;
  function Gt(d, A) {
    return typeof d == "object" && d !== null && d.key != null ? Ot("" + d.key) : A.toString(36);
  }
  function Ft(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(dt, dt) : (d.status = "pending", d.then(
          function(A) {
            d.status === "pending" && (d.status = "fulfilled", d.value = A);
          },
          function(A) {
            d.status === "pending" && (d.status = "rejected", d.reason = A);
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
  function E(d, A, H, Y, F) {
    var P = typeof d;
    (P === "undefined" || P === "boolean") && (d = null);
    var et = !1;
    if (d === null) et = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          et = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case c:
            case g:
              et = !0;
              break;
            case U:
              return et = d._init, E(
                et(d._payload),
                A,
                H,
                Y,
                F
              );
          }
      }
    if (et)
      return F = F(d), et = Y === "" ? "." + Gt(d, 0) : Y, gt(F) ? (H = "", et != null && (H = et.replace(cl, "$&/") + "/"), E(F, A, H, "", function(be) {
        return be;
      })) : F != null && (W(F) && (F = il(
        F,
        H + (F.key == null || d && d.key === F.key ? "" : ("" + F.key).replace(
          cl,
          "$&/"
        ) + "/") + et
      )), A.push(F)), 1;
    et = 0;
    var Xt = Y === "" ? "." : Y + ":";
    if (gt(d))
      for (var qt = 0; qt < d.length; qt++)
        Y = d[qt], P = Xt + Gt(Y, qt), et += E(
          Y,
          A,
          H,
          P,
          F
        );
    else if (qt = C(d), typeof qt == "function")
      for (d = qt.call(d), qt = 0; !(Y = d.next()).done; )
        Y = Y.value, P = Xt + Gt(Y, qt++), et += E(
          Y,
          A,
          H,
          P,
          F
        );
    else if (P === "object") {
      if (typeof d.then == "function")
        return E(
          Ft(d),
          A,
          H,
          Y,
          F
        );
      throw A = String(d), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return et;
  }
  function q(d, A, H) {
    if (d == null) return d;
    var Y = [], F = 0;
    return E(d, Y, "", "", function(P) {
      return A.call(H, P, F++);
    }), Y;
  }
  function Z(d) {
    if (d._status === -1) {
      var A = d._result;
      A = A(), A.then(
        function(H) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = H);
        },
        function(H) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = H);
        }
      ), d._status === -1 && (d._status = 0, d._result = A);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, rt = {
    map: q,
    forEach: function(d, A, H) {
      q(
        d,
        function() {
          A.apply(this, arguments);
        },
        H
      );
    },
    count: function(d) {
      var A = 0;
      return q(d, function() {
        A++;
      }), A;
    },
    toArray: function(d) {
      return q(d, function(A) {
        return A;
      }) || [];
    },
    only: function(d) {
      if (!W(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return k.Activity = j, k.Children = rt, k.Component = ft, k.Fragment = h, k.Profiler = x, k.PureComponent = pt, k.StrictMode = s, k.Suspense = D, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return $.H.useMemoCache(d);
    }
  }, k.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(d, A, H) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Y = w({}, d.props), F = d.key;
    if (A != null)
      for (P in A.key !== void 0 && (F = "" + A.key), A)
        !Ht.call(A, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && A.ref === void 0 || (Y[P] = A[P]);
    var P = arguments.length - 2;
    if (P === 1) Y.children = H;
    else if (1 < P) {
      for (var et = Array(P), Xt = 0; Xt < P; Xt++)
        et[Xt] = arguments[Xt + 2];
      Y.children = et;
    }
    return st(d.type, F, Y);
  }, k.createContext = function(d) {
    return d = {
      $$typeof: M,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: R,
      _context: d
    }, d;
  }, k.createElement = function(d, A, H) {
    var Y, F = {}, P = null;
    if (A != null)
      for (Y in A.key !== void 0 && (P = "" + A.key), A)
        Ht.call(A, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (F[Y] = A[Y]);
    var et = arguments.length - 2;
    if (et === 1) F.children = H;
    else if (1 < et) {
      for (var Xt = Array(et), qt = 0; qt < et; qt++)
        Xt[qt] = arguments[qt + 2];
      F.children = Xt;
    }
    if (d && d.defaultProps)
      for (Y in et = d.defaultProps, et)
        F[Y] === void 0 && (F[Y] = et[Y]);
    return st(d, P, F);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(d) {
    return { $$typeof: B, render: d };
  }, k.isValidElement = W, k.lazy = function(d) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: d },
      _init: Z
    };
  }, k.memo = function(d, A) {
    return {
      $$typeof: _,
      type: d,
      compare: A === void 0 ? null : A
    };
  }, k.startTransition = function(d) {
    var A = $.T, H = {};
    $.T = H;
    try {
      var Y = d(), F = $.S;
      F !== null && F(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(dt, ht);
    } catch (P) {
      ht(P);
    } finally {
      A !== null && H.types !== null && (A.types = H.types), $.T = A;
    }
  }, k.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, k.use = function(d) {
    return $.H.use(d);
  }, k.useActionState = function(d, A, H) {
    return $.H.useActionState(d, A, H);
  }, k.useCallback = function(d, A) {
    return $.H.useCallback(d, A);
  }, k.useContext = function(d) {
    return $.H.useContext(d);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(d, A) {
    return $.H.useDeferredValue(d, A);
  }, k.useEffect = function(d, A) {
    return $.H.useEffect(d, A);
  }, k.useEffectEvent = function(d) {
    return $.H.useEffectEvent(d);
  }, k.useId = function() {
    return $.H.useId();
  }, k.useImperativeHandle = function(d, A, H) {
    return $.H.useImperativeHandle(d, A, H);
  }, k.useInsertionEffect = function(d, A) {
    return $.H.useInsertionEffect(d, A);
  }, k.useLayoutEffect = function(d, A) {
    return $.H.useLayoutEffect(d, A);
  }, k.useMemo = function(d, A) {
    return $.H.useMemo(d, A);
  }, k.useOptimistic = function(d, A) {
    return $.H.useOptimistic(d, A);
  }, k.useReducer = function(d, A, H) {
    return $.H.useReducer(d, A, H);
  }, k.useRef = function(d) {
    return $.H.useRef(d);
  }, k.useState = function(d) {
    return $.H.useState(d);
  }, k.useSyncExternalStore = function(d, A, H) {
    return $.H.useSyncExternalStore(
      d,
      A,
      H
    );
  }, k.useTransition = function() {
    return $.H.useTransition();
  }, k.version = "19.2.6", k;
}
var Em;
function ji() {
  return Em || (Em = 1, wf.exports = O0()), wf.exports;
}
var J = ji();
const hs = /* @__PURE__ */ z0(J);
var $f = { exports: {} }, ln = {}, Wf = { exports: {} }, Ff = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tm;
function D0() {
  return Tm || (Tm = 1, (function(c) {
    function g(E, q) {
      var Z = E.length;
      E.push(q);
      t: for (; 0 < Z; ) {
        var ht = Z - 1 >>> 1, rt = E[ht];
        if (0 < x(rt, q))
          E[ht] = q, E[Z] = rt, Z = ht;
        else break t;
      }
    }
    function h(E) {
      return E.length === 0 ? null : E[0];
    }
    function s(E) {
      if (E.length === 0) return null;
      var q = E[0], Z = E.pop();
      if (Z !== q) {
        E[0] = Z;
        t: for (var ht = 0, rt = E.length, d = rt >>> 1; ht < d; ) {
          var A = 2 * (ht + 1) - 1, H = E[A], Y = A + 1, F = E[Y];
          if (0 > x(H, Z))
            Y < rt && 0 > x(F, H) ? (E[ht] = F, E[Y] = Z, ht = Y) : (E[ht] = H, E[A] = Z, ht = A);
          else if (Y < rt && 0 > x(F, Z))
            E[ht] = F, E[Y] = Z, ht = Y;
          else break t;
        }
      }
      return q;
    }
    function x(E, q) {
      var Z = E.sortIndex - q.sortIndex;
      return Z !== 0 ? Z : E.id - q.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      c.unstable_now = function() {
        return R.now();
      };
    } else {
      var M = Date, B = M.now();
      c.unstable_now = function() {
        return M.now() - B;
      };
    }
    var D = [], _ = [], U = 1, j = null, N = 3, C = !1, Q = !1, w = !1, I = !1, ft = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, pt = typeof setImmediate < "u" ? setImmediate : null;
    function Nt(E) {
      for (var q = h(_); q !== null; ) {
        if (q.callback === null) s(_);
        else if (q.startTime <= E)
          s(_), q.sortIndex = q.expirationTime, g(D, q);
        else break;
        q = h(_);
      }
    }
    function gt(E) {
      if (w = !1, Nt(E), !Q)
        if (h(D) !== null)
          Q = !0, dt || (dt = !0, Ot());
        else {
          var q = h(_);
          q !== null && Ft(gt, q.startTime - E);
        }
    }
    var dt = !1, $ = -1, Ht = 5, st = -1;
    function il() {
      return I ? !0 : !(c.unstable_now() - st < Ht);
    }
    function W() {
      if (I = !1, dt) {
        var E = c.unstable_now();
        st = E;
        var q = !0;
        try {
          t: {
            Q = !1, w && (w = !1, L($), $ = -1), C = !0;
            var Z = N;
            try {
              l: {
                for (Nt(E), j = h(D); j !== null && !(j.expirationTime > E && il()); ) {
                  var ht = j.callback;
                  if (typeof ht == "function") {
                    j.callback = null, N = j.priorityLevel;
                    var rt = ht(
                      j.expirationTime <= E
                    );
                    if (E = c.unstable_now(), typeof rt == "function") {
                      j.callback = rt, Nt(E), q = !0;
                      break l;
                    }
                    j === h(D) && s(D), Nt(E);
                  } else s(D);
                  j = h(D);
                }
                if (j !== null) q = !0;
                else {
                  var d = h(_);
                  d !== null && Ft(
                    gt,
                    d.startTime - E
                  ), q = !1;
                }
              }
              break t;
            } finally {
              j = null, N = Z, C = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Ot() : dt = !1;
        }
      }
    }
    var Ot;
    if (typeof pt == "function")
      Ot = function() {
        pt(W);
      };
    else if (typeof MessageChannel < "u") {
      var cl = new MessageChannel(), Gt = cl.port2;
      cl.port1.onmessage = W, Ot = function() {
        Gt.postMessage(null);
      };
    } else
      Ot = function() {
        ft(W, 0);
      };
    function Ft(E, q) {
      $ = ft(function() {
        E(c.unstable_now());
      }, q);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, c.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ht = 0 < E ? Math.floor(1e3 / E) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, c.unstable_next = function(E) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = N;
      }
      var Z = N;
      N = q;
      try {
        return E();
      } finally {
        N = Z;
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
      var Z = N;
      N = E;
      try {
        return q();
      } finally {
        N = Z;
      }
    }, c.unstable_scheduleCallback = function(E, q, Z) {
      var ht = c.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ht + Z : ht) : Z = ht, E) {
        case 1:
          var rt = -1;
          break;
        case 2:
          rt = 250;
          break;
        case 5:
          rt = 1073741823;
          break;
        case 4:
          rt = 1e4;
          break;
        default:
          rt = 5e3;
      }
      return rt = Z + rt, E = {
        id: U++,
        callback: q,
        priorityLevel: E,
        startTime: Z,
        expirationTime: rt,
        sortIndex: -1
      }, Z > ht ? (E.sortIndex = Z, g(_, E), h(D) === null && E === h(_) && (w ? (L($), $ = -1) : w = !0, Ft(gt, Z - ht))) : (E.sortIndex = rt, g(D, E), Q || C || (Q = !0, dt || (dt = !0, Ot()))), E;
    }, c.unstable_shouldYield = il, c.unstable_wrapCallback = function(E) {
      var q = N;
      return function() {
        var Z = N;
        N = q;
        try {
          return E.apply(this, arguments);
        } finally {
          N = Z;
        }
      };
    };
  })(Ff)), Ff;
}
var zm;
function M0() {
  return zm || (zm = 1, Wf.exports = D0()), Wf.exports;
}
var kf = { exports: {} }, ul = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Am;
function x0() {
  if (Am) return ul;
  Am = 1;
  var c = ji();
  function g(D) {
    var _ = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        _ += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + D + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h() {
  }
  var s = {
    d: {
      f: h,
      r: function() {
        throw Error(g(522));
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
  }, x = Symbol.for("react.portal");
  function R(D, _, U) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: x,
      key: j == null ? null : "" + j,
      children: D,
      containerInfo: _,
      implementation: U
    };
  }
  var M = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(D, _) {
    if (D === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return ul.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ul.createPortal = function(D, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(g(299));
    return R(D, _, null, U);
  }, ul.flushSync = function(D) {
    var _ = M.T, U = s.p;
    try {
      if (M.T = null, s.p = 2, D) return D();
    } finally {
      M.T = _, s.p = U, s.d.f();
    }
  }, ul.preconnect = function(D, _) {
    typeof D == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, s.d.C(D, _));
  }, ul.prefetchDNS = function(D) {
    typeof D == "string" && s.d.D(D);
  }, ul.preinit = function(D, _) {
    if (typeof D == "string" && _ && typeof _.as == "string") {
      var U = _.as, j = B(U, _.crossOrigin), N = typeof _.integrity == "string" ? _.integrity : void 0, C = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      U === "style" ? s.d.S(
        D,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: j,
          integrity: N,
          fetchPriority: C
        }
      ) : U === "script" && s.d.X(D, {
        crossOrigin: j,
        integrity: N,
        fetchPriority: C,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, ul.preinitModule = function(D, _) {
    if (typeof D == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var U = B(
            _.as,
            _.crossOrigin
          );
          s.d.M(D, {
            crossOrigin: U,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0
          });
        }
      } else _ == null && s.d.M(D);
  }, ul.preload = function(D, _) {
    if (typeof D == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var U = _.as, j = B(U, _.crossOrigin);
      s.d.L(D, U, {
        crossOrigin: j,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, ul.preloadModule = function(D, _) {
    if (typeof D == "string")
      if (_) {
        var U = B(_.as, _.crossOrigin);
        s.d.m(D, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0
        });
      } else s.d.m(D);
  }, ul.requestFormReset = function(D) {
    s.d.r(D);
  }, ul.unstable_batchedUpdates = function(D, _) {
    return D(_);
  }, ul.useFormState = function(D, _, U) {
    return M.H.useFormState(D, _, U);
  }, ul.useFormStatus = function() {
    return M.H.useHostTransitionStatus();
  }, ul.version = "19.2.6", ul;
}
var Nm;
function j0() {
  if (Nm) return kf.exports;
  Nm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (g) {
        console.error(g);
      }
  }
  return c(), kf.exports = x0(), kf.exports;
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
var Om;
function R0() {
  if (Om) return ln;
  Om = 1;
  var c = M0(), g = ji(), h = j0();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function x(t) {
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
  function M(t) {
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
  function D(t) {
    if (R(t) !== t)
      throw Error(s(188));
  }
  function _(t) {
    var l = t.alternate;
    if (!l) {
      if (l = R(t), l === null) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
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
          if (n === e) return D(u), t;
          if (n === a) return D(u), l;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, f = u.child; f; ) {
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
        if (!i) {
          for (f = n.child; f; ) {
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
  var j = Object.assign, N = Symbol.for("react.element"), C = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), ft = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), pt = Symbol.for("react.context"), Nt = Symbol.for("react.forward_ref"), gt = Symbol.for("react.suspense"), dt = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), Ht = Symbol.for("react.lazy"), st = Symbol.for("react.activity"), il = Symbol.for("react.memo_cache_sentinel"), W = Symbol.iterator;
  function Ot(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var cl = Symbol.for("react.client.reference");
  function Gt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === cl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case w:
        return "Fragment";
      case ft:
        return "Profiler";
      case I:
        return "StrictMode";
      case gt:
        return "Suspense";
      case dt:
        return "SuspenseList";
      case st:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Q:
          return "Portal";
        case pt:
          return t.displayName || "Context";
        case L:
          return (t._context.displayName || "Context") + ".Consumer";
        case Nt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case $:
          return l = t.displayName || null, l !== null ? l : Gt(t.type) || "Memo";
        case Ht:
          l = t._payload, t = t._init;
          try {
            return Gt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Ft = Array.isArray, E = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], rt = -1;
  function d(t) {
    return { current: t };
  }
  function A(t) {
    0 > rt || (t.current = ht[rt], ht[rt] = null, rt--);
  }
  function H(t, l) {
    rt++, ht[rt] = t.current, t.current = l;
  }
  var Y = d(null), F = d(null), P = d(null), et = d(null);
  function Xt(t, l) {
    switch (H(P, l), H(F, t), H(Y, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Vd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Vd(l), t = Ld(l, t);
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
    A(Y), H(Y, t);
  }
  function qt() {
    A(Y), A(F), A(P);
  }
  function be(t) {
    t.memoizedState !== null && H(et, t);
    var l = Y.current, e = Ld(l, t.type);
    l !== e && (H(F, t), H(Y, e));
  }
  function We(t) {
    F.current === t && (A(Y), A(F)), et.current === t && (A(et), Fu._currentValue = Z);
  }
  var iu, cn;
  function pl(t) {
    if (iu === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        iu = l && l[1] || "", cn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + iu + t + cn;
  }
  var ga = !1;
  function fn(t, l) {
    if (!t || ga) return "";
    ga = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (p) {
                  var b = p;
                }
                Reflect.construct(t, [], O);
              } else {
                try {
                  O.call();
                } catch (p) {
                  b = p;
                }
                t.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                b = p;
              }
              (O = t()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (p) {
            if (p && b && typeof p.stack == "string")
              return [p.stack, b.stack];
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
      var n = a.DetermineComponentFrameRoot(), i = n[0], f = n[1];
      if (i && f) {
        var o = i.split(`
`), S = f.split(`
`);
        for (u = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < S.length && !S[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === o.length || u === S.length)
          for (a = o.length - 1, u = S.length - 1; 1 <= a && 0 <= u && o[a] !== S[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (o[a] !== S[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || o[a] !== S[u]) {
                  var T = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", t.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ga = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? pl(e) : "";
  }
  function _t(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return pl(t.type);
      case 16:
        return pl("Lazy");
      case 13:
        return t.child !== l && l !== null ? pl("Suspense Fallback") : pl("Suspense");
      case 19:
        return pl("SuspenseList");
      case 0:
      case 15:
        return fn(t.type, !1);
      case 11:
        return fn(t.type.render, !1);
      case 1:
        return fn(t.type, !0);
      case 31:
        return pl("Activity");
      default:
        return "";
    }
  }
  function Ut(t) {
    try {
      var l = "", e = null;
      do
        l += _t(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Dt = Object.prototype.hasOwnProperty, Mt = c.unstable_scheduleCallback, sl = c.unstable_cancelCallback, ol = c.unstable_shouldYield, Qt = c.unstable_requestPaint, xt = c.unstable_now, Fe = c.unstable_getCurrentPriorityLevel, pe = c.unstable_ImmediatePriority, cu = c.unstable_UserBlockingPriority, ke = c.unstable_NormalPriority, rl = c.unstable_LowPriority, jl = c.unstable_IdlePriority, fu = c.log, Ri = c.unstable_setDisableYieldValue, Fl = null, _l = null;
  function _e(t) {
    if (typeof fu == "function" && Ri(t), _l && typeof _l.setStrictMode == "function")
      try {
        _l.setStrictMode(Fl, t);
      } catch {
      }
  }
  var El = Math.clz32 ? Math.clz32 : ov, fv = Math.log, sv = Math.LN2;
  function ov(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (fv(t) / sv | 0) | 0;
  }
  var sn = 256, on = 262144, rn = 4194304;
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
  function dn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~n, a !== 0 ? u = Ie(a) : (i &= f, i !== 0 ? u = Ie(i) : e || (e = f & ~t, e !== 0 && (u = Ie(e))))) : (f = a & ~n, f !== 0 ? u = Ie(f) : i !== 0 ? u = Ie(i) : e || (e = a & ~t, e !== 0 && (u = Ie(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function su(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function rv(t, l) {
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
  function Es() {
    var t = rn;
    return rn <<= 1, (rn & 62914560) === 0 && (rn = 4194304), t;
  }
  function Ui(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function ou(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function dv(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var f = t.entanglements, o = t.expirationTimes, S = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - El(e), O = 1 << T;
      f[T] = 0, o[T] = -1;
      var b = S[T];
      if (b !== null)
        for (S[T] = null, T = 0; T < b.length; T++) {
          var p = b[T];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && Ts(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function Ts(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - El(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function zs(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - El(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function As(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Ci(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Ci(t) {
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
  function Hi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ns() {
    var t = q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : dm(t.type));
  }
  function Os(t, l) {
    var e = q.p;
    try {
      return q.p = t, l();
    } finally {
      q.p = e;
    }
  }
  var Ee = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + Ee, dl = "__reactProps$" + Ee, Sa = "__reactContainer$" + Ee, qi = "__reactEvents$" + Ee, mv = "__reactListeners$" + Ee, vv = "__reactHandles$" + Ee, Ds = "__reactResources$" + Ee, ru = "__reactMarker$" + Ee;
  function Bi(t) {
    delete t[Pt], delete t[dl], delete t[qi], delete t[mv], delete t[vv];
  }
  function ba(t) {
    var l = t[Pt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Sa] || e[Pt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Fd(t); t !== null; ) {
            if (e = t[Pt]) return e;
            t = Fd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function pa(t) {
    if (t = t[Pt] || t[Sa]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function du(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function _a(t) {
    var l = t[Ds];
    return l || (l = t[Ds] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function kt(t) {
    t[ru] = !0;
  }
  var Ms = /* @__PURE__ */ new Set(), xs = {};
  function Pe(t, l) {
    Ea(t, l), Ea(t + "Capture", l);
  }
  function Ea(t, l) {
    for (xs[t] = l, t = 0; t < l.length; t++)
      Ms.add(l[t]);
  }
  var hv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), js = {}, Rs = {};
  function yv(t) {
    return Dt.call(Rs, t) ? !0 : Dt.call(js, t) ? !1 : hv.test(t) ? Rs[t] = !0 : (js[t] = !0, !1);
  }
  function mn(t, l, e) {
    if (yv(l))
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
  function vn(t, l, e) {
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
  function kl(t, l, e, a) {
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
  function Us(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function gv(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
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
  function Yi(t) {
    if (!t._valueTracker) {
      var l = Us(t) ? "checked" : "value";
      t._valueTracker = gv(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Cs(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Us(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function hn(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Sv = /[\n"\\]/g;
  function Ul(t) {
    return t.replace(
      Sv,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Gi(t, l, e, a, u, n, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Rl(l)) : t.value !== "" + Rl(l) && (t.value = "" + Rl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? Xi(t, i, Rl(l)) : e != null ? Xi(t, i, Rl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Rl(f) : t.removeAttribute("name");
  }
  function Hs(t, l, e, a, u, n, i, f) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        Yi(t);
        return;
      }
      e = e != null ? "" + Rl(e) : "", l = l != null ? "" + Rl(l) : e, f || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Yi(t);
  }
  function Xi(t, l, e) {
    l === "number" && hn(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function Ta(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Rl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function qs(t, l, e) {
    if (l != null && (l = "" + Rl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Rl(e) : "";
  }
  function Bs(t, l, e, a) {
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
    e = Rl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), Yi(t);
  }
  function za(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var bv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ys(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || bv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Gs(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && Ys(t, u, a);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && Ys(t, n, l[n]);
  }
  function Qi(t) {
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
  function yn(t) {
    return _v.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Il() {
  }
  var Vi = null;
  function Li(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Aa = null, Na = null;
  function Xs(t) {
    var l = pa(t);
    if (l && (t = l.stateNode)) {
      var e = t[dl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Gi(
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
                var u = a[dl] || null;
                if (!u) throw Error(s(90));
                Gi(
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
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && Cs(a);
          }
          break t;
        case "textarea":
          qs(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Ta(t, !!e.multiple, l, !1);
      }
    }
  }
  var Zi = !1;
  function Qs(t, l, e) {
    if (Zi) return t(l, e);
    Zi = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Zi = !1, (Aa !== null || Na !== null) && (ai(), Aa && (l = Aa, t = Na, Na = Aa = null, Xs(l), t)))
        for (l = 0; l < t.length; l++) Xs(t[l]);
    }
  }
  function mu(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[dl] || null;
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
  var Pl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ki = !1;
  if (Pl)
    try {
      var vu = {};
      Object.defineProperty(vu, "passive", {
        get: function() {
          Ki = !0;
        }
      }), window.addEventListener("test", vu, vu), window.removeEventListener("test", vu, vu);
    } catch {
      Ki = !1;
    }
  var Te = null, Ji = null, gn = null;
  function Vs() {
    if (gn) return gn;
    var t, l = Ji, e = l.length, a, u = "value" in Te ? Te.value : Te.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++) ;
    return gn = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Sn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function bn() {
    return !0;
  }
  function Ls() {
    return !1;
  }
  function ml(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (e = t[f], this[f] = e ? e(n) : n[f]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? bn : Ls, this.isPropagationStopped = Ls, this;
    }
    return j(l.prototype, {
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
  }, pn = ml(ta), hu = j({}, ta, { view: 0, detail: 0 }), Ev = ml(hu), wi, $i, yu, _n = j({}, hu, {
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
    getModifierState: Fi,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== yu && (yu && t.type === "mousemove" ? (wi = t.screenX - yu.screenX, $i = t.screenY - yu.screenY) : $i = wi = 0, yu = t), wi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : $i;
    }
  }), Zs = ml(_n), Tv = j({}, _n, { dataTransfer: 0 }), zv = ml(Tv), Av = j({}, hu, { relatedTarget: 0 }), Wi = ml(Av), Nv = j({}, ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = ml(Nv), Dv = j({}, ta, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Mv = ml(Dv), xv = j({}, ta, { data: 0 }), Ks = ml(xv), jv = {
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
  function Cv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Uv[t]) ? !!l[t] : !1;
  }
  function Fi() {
    return Cv;
  }
  var Hv = j({}, hu, {
    key: function(t) {
      if (t.key) {
        var l = jv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Sn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Rv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fi,
    charCode: function(t) {
      return t.type === "keypress" ? Sn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Sn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), qv = ml(Hv), Bv = j({}, _n, {
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
  }), Js = ml(Bv), Yv = j({}, hu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fi
  }), Gv = ml(Yv), Xv = j({}, ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qv = ml(Xv), Vv = j({}, _n, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Lv = ml(Vv), Zv = j({}, ta, {
    newState: 0,
    oldState: 0
  }), Kv = ml(Zv), Jv = [9, 13, 27, 32], ki = Pl && "CompositionEvent" in window, gu = null;
  Pl && "documentMode" in document && (gu = document.documentMode);
  var wv = Pl && "TextEvent" in window && !gu, ws = Pl && (!ki || gu && 8 < gu && 11 >= gu), $s = " ", Ws = !1;
  function Fs(t, l) {
    switch (t) {
      case "keyup":
        return Jv.indexOf(l.keyCode) !== -1;
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
  function ks(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Oa = !1;
  function $v(t, l) {
    switch (t) {
      case "compositionend":
        return ks(l);
      case "keypress":
        return l.which !== 32 ? null : (Ws = !0, $s);
      case "textInput":
        return t = l.data, t === $s && Ws ? null : t;
      default:
        return null;
    }
  }
  function Wv(t, l) {
    if (Oa)
      return t === "compositionend" || !ki && Fs(t, l) ? (t = Vs(), gn = Ji = Te = null, Oa = !1, t) : null;
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
        return ws && l.locale !== "ko" ? null : l.data;
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
  function Is(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Fv[t.type] : l === "textarea";
  }
  function Ps(t, l, e, a) {
    Aa ? Na ? Na.push(a) : Na = [a] : Aa = a, l = oi(l, "onChange"), 0 < l.length && (e = new pn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Su = null, bu = null;
  function kv(t) {
    qd(t, 0);
  }
  function En(t) {
    var l = du(t);
    if (Cs(l)) return t;
  }
  function to(t, l) {
    if (t === "change") return l;
  }
  var lo = !1;
  if (Pl) {
    var Ii;
    if (Pl) {
      var Pi = "oninput" in document;
      if (!Pi) {
        var eo = document.createElement("div");
        eo.setAttribute("oninput", "return;"), Pi = typeof eo.oninput == "function";
      }
      Ii = Pi;
    } else Ii = !1;
    lo = Ii && (!document.documentMode || 9 < document.documentMode);
  }
  function ao() {
    Su && (Su.detachEvent("onpropertychange", uo), bu = Su = null);
  }
  function uo(t) {
    if (t.propertyName === "value" && En(bu)) {
      var l = [];
      Ps(
        l,
        bu,
        t,
        Li(t)
      ), Qs(kv, l);
    }
  }
  function Iv(t, l, e) {
    t === "focusin" ? (ao(), Su = l, bu = e, Su.attachEvent("onpropertychange", uo)) : t === "focusout" && ao();
  }
  function Pv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return En(bu);
  }
  function th(t, l) {
    if (t === "click") return En(l);
  }
  function lh(t, l) {
    if (t === "input" || t === "change")
      return En(l);
  }
  function eh(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Tl = typeof Object.is == "function" ? Object.is : eh;
  function pu(t, l) {
    if (Tl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Dt.call(l, u) || !Tl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function no(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function io(t, l) {
    var e = no(t);
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
      e = no(e);
    }
  }
  function co(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? co(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function fo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = hn(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = hn(t.document);
    }
    return l;
  }
  function tc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var ah = Pl && "documentMode" in document && 11 >= document.documentMode, Da = null, lc = null, _u = null, ec = !1;
  function so(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    ec || Da == null || Da !== hn(a) || (a = Da, "selectionStart" in a && tc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), _u && pu(_u, a) || (_u = a, a = oi(lc, "onSelect"), 0 < a.length && (l = new pn(
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
  }, ac = {}, oo = {};
  Pl && (oo = document.createElement("div").style, "AnimationEvent" in window || (delete Ma.animationend.animation, delete Ma.animationiteration.animation, delete Ma.animationstart.animation), "TransitionEvent" in window || delete Ma.transitionend.transition);
  function ea(t) {
    if (ac[t]) return ac[t];
    if (!Ma[t]) return t;
    var l = Ma[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in oo)
        return ac[t] = l[e];
    return t;
  }
  var ro = ea("animationend"), mo = ea("animationiteration"), vo = ea("animationstart"), uh = ea("transitionrun"), nh = ea("transitionstart"), ih = ea("transitioncancel"), ho = ea("transitionend"), yo = /* @__PURE__ */ new Map(), uc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  uc.push("scrollEnd");
  function Vl(t, l) {
    yo.set(t, l), Pe(l, [t]);
  }
  var Tn = typeof reportError == "function" ? reportError : function(t) {
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
  }, Cl = [], xa = 0, nc = 0;
  function zn() {
    for (var t = xa, l = nc = xa = 0; l < t; ) {
      var e = Cl[l];
      Cl[l++] = null;
      var a = Cl[l];
      Cl[l++] = null;
      var u = Cl[l];
      Cl[l++] = null;
      var n = Cl[l];
      if (Cl[l++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && go(e, u, n);
    }
  }
  function An(t, l, e, a) {
    Cl[xa++] = t, Cl[xa++] = l, Cl[xa++] = e, Cl[xa++] = a, nc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ic(t, l, e, a) {
    return An(t, l, e, a), Nn(t);
  }
  function aa(t, l) {
    return An(t, null, null, l), Nn(t);
  }
  function go(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - El(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Nn(t) {
    if (50 < Lu)
      throw Lu = 0, yf = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ja = {};
  function ch(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function zl(t, l, e, a) {
    return new ch(t, l, e, a);
  }
  function cc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function te(t, l) {
    var e = t.alternate;
    return e === null ? (e = zl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function So(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function On(t, l, e, a, u, n) {
    var i = 0;
    if (a = t, typeof t == "function") cc(t) && (i = 1);
    else if (typeof t == "string")
      i = d0(
        t,
        e,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case st:
          return t = zl(31, e, l, u), t.elementType = st, t.lanes = n, t;
        case w:
          return ua(e.children, u, n, l);
        case I:
          i = 8, u |= 24;
          break;
        case ft:
          return t = zl(12, e, l, u | 2), t.elementType = ft, t.lanes = n, t;
        case gt:
          return t = zl(13, e, l, u), t.elementType = gt, t.lanes = n, t;
        case dt:
          return t = zl(19, e, l, u), t.elementType = dt, t.lanes = n, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case pt:
                i = 10;
                break t;
              case L:
                i = 9;
                break t;
              case Nt:
                i = 11;
                break t;
              case $:
                i = 14;
                break t;
              case Ht:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = zl(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function ua(t, l, e, a) {
    return t = zl(7, t, a, l), t.lanes = e, t;
  }
  function fc(t, l, e) {
    return t = zl(6, t, null, l), t.lanes = e, t;
  }
  function bo(t) {
    var l = zl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function sc(t, l, e) {
    return l = zl(
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
  var po = /* @__PURE__ */ new WeakMap();
  function Hl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = po.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ut(l)
      }, po.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ut(l)
    };
  }
  var Ra = [], Ua = 0, Dn = null, Eu = 0, ql = [], Bl = 0, ze = null, Kl = 1, Jl = "";
  function le(t, l) {
    Ra[Ua++] = Eu, Ra[Ua++] = Dn, Dn = t, Eu = l;
  }
  function _o(t, l, e) {
    ql[Bl++] = Kl, ql[Bl++] = Jl, ql[Bl++] = ze, ze = t;
    var a = Kl;
    t = Jl;
    var u = 32 - El(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - El(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Kl = 1 << 32 - El(l) + u | e << u | a, Jl = n + t;
    } else
      Kl = 1 << n | e << u | a, Jl = t;
  }
  function oc(t) {
    t.return !== null && (le(t, 1), _o(t, 1, 0));
  }
  function rc(t) {
    for (; t === Dn; )
      Dn = Ra[--Ua], Ra[Ua] = null, Eu = Ra[--Ua], Ra[Ua] = null;
    for (; t === ze; )
      ze = ql[--Bl], ql[Bl] = null, Jl = ql[--Bl], ql[Bl] = null, Kl = ql[--Bl], ql[Bl] = null;
  }
  function Eo(t, l) {
    ql[Bl++] = Kl, ql[Bl++] = Jl, ql[Bl++] = ze, Kl = l.id, Jl = l.overflow, ze = t;
  }
  var tl = null, jt = null, ot = !1, Ae = null, Yl = !1, dc = Error(s(519));
  function Ne(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tu(Hl(l, t)), dc;
  }
  function To(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Pt] = t, l[dl] = a, e) {
      case "dialog":
        ut("cancel", l), ut("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        ut("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Ku.length; e++)
          ut(Ku[e], l);
        break;
      case "source":
        ut("error", l);
        break;
      case "img":
      case "image":
      case "link":
        ut("error", l), ut("load", l);
        break;
      case "details":
        ut("toggle", l);
        break;
      case "input":
        ut("invalid", l), Hs(
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
        ut("invalid", l);
        break;
      case "textarea":
        ut("invalid", l), Bs(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Xd(l.textContent, e) ? (a.popover != null && (ut("beforetoggle", l), ut("toggle", l)), a.onScroll != null && ut("scroll", l), a.onScrollEnd != null && ut("scrollend", l), a.onClick != null && (l.onclick = Il), l = !0) : l = !1, l || Ne(t, !0);
  }
  function zo(t) {
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
  function Ca(t) {
    if (t !== tl) return !1;
    if (!ot) return zo(t), ot = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || jf(t.type, t.memoizedProps)), e = !e), e && jt && Ne(t), zo(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      jt = Wd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      jt = Wd(t);
    } else
      l === 27 ? (l = jt, Xe(t.type) ? (t = qf, qf = null, jt = t) : jt = l) : jt = tl ? Xl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function na() {
    jt = tl = null, ot = !1;
  }
  function mc() {
    var t = Ae;
    return t !== null && (gl === null ? gl = t : gl.push.apply(
      gl,
      t
    ), Ae = null), t;
  }
  function Tu(t) {
    Ae === null ? Ae = [t] : Ae.push(t);
  }
  var vc = d(null), ia = null, ee = null;
  function Oe(t, l, e) {
    H(vc, l._currentValue), l._currentValue = e;
  }
  function ae(t) {
    t._currentValue = vc.current, A(vc);
  }
  function hc(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function yc(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var f = n;
          n = u;
          for (var o = 0; o < l.length; o++)
            if (f.context === l[o]) {
              n.lanes |= e, f = n.alternate, f !== null && (f.lanes |= e), hc(
                n.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          n = f.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), hc(i, e, t), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
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
  function Ha(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var f = u.type;
          Tl(u.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (u === et.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Fu) : t = [Fu]);
      }
      u = u.return;
    }
    t !== null && yc(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Mn(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Tl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ca(t) {
    ia = t, ee = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ll(t) {
    return Ao(ia, t);
  }
  function xn(t, l) {
    return ia === null && ca(t), Ao(t, l);
  }
  function Ao(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, ee === null) {
      if (t === null) throw Error(s(308));
      ee = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else ee = ee.next = l;
    return e;
  }
  var fh = typeof AbortController < "u" ? AbortController : function() {
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
  }, sh = c.unstable_scheduleCallback, oh = c.unstable_NormalPriority, Kt = {
    $$typeof: pt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function gc() {
    return {
      controller: new fh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function zu(t) {
    t.refCount--, t.refCount === 0 && sh(oh, function() {
      t.controller.abort();
    });
  }
  var Au = null, Sc = 0, qa = 0, Ba = null;
  function rh(t, l) {
    if (Au === null) {
      var e = Au = [];
      Sc = 0, qa = Ef(), Ba = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Sc++, l.then(No, No), l;
  }
  function No() {
    if (--Sc === 0 && Au !== null) {
      Ba !== null && (Ba.status = "fulfilled");
      var t = Au;
      Au = null, qa = 0, Ba = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function dh(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var u = 0; u < e.length; u++) (0, e[u])(l);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var Oo = E.S;
  E.S = function(t, l) {
    od = xt(), typeof l == "object" && l !== null && typeof l.then == "function" && rh(t, l), Oo !== null && Oo(t, l);
  };
  var fa = d(null);
  function bc() {
    var t = fa.current;
    return t !== null ? t : At.pooledCache;
  }
  function jn(t, l) {
    l === null ? H(fa, fa.current) : H(fa, l.pool);
  }
  function Do() {
    var t = bc();
    return t === null ? null : { parent: Kt._currentValue, pool: t };
  }
  var Ya = Error(s(460)), pc = Error(s(474)), Rn = Error(s(542)), Un = { then: function() {
  } };
  function Mo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function xo(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Il, Il), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Ro(t), t;
      default:
        if (typeof l.status == "string") l.then(Il, Il);
        else {
          if (t = At, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, Ro(t), t;
        }
        throw oa = l, Ya;
    }
  }
  function sa(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (oa = e, Ya) : e;
    }
  }
  var oa = null;
  function jo() {
    if (oa === null) throw Error(s(459));
    var t = oa;
    return oa = null, t;
  }
  function Ro(t) {
    if (t === Ya || t === Rn)
      throw Error(s(483));
  }
  var Ga = null, Nu = 0;
  function Cn(t) {
    var l = Nu;
    return Nu += 1, Ga === null && (Ga = []), xo(Ga, t, l);
  }
  function Ou(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Hn(t, l) {
    throw l.$$typeof === N ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Uo(t) {
    function l(v, r) {
      if (t) {
        var y = v.deletions;
        y === null ? (v.deletions = [r], v.flags |= 16) : y.push(r);
      }
    }
    function e(v, r) {
      if (!t) return null;
      for (; r !== null; )
        l(v, r), r = r.sibling;
      return null;
    }
    function a(v) {
      for (var r = /* @__PURE__ */ new Map(); v !== null; )
        v.key !== null ? r.set(v.key, v) : r.set(v.index, v), v = v.sibling;
      return r;
    }
    function u(v, r) {
      return v = te(v, r), v.index = 0, v.sibling = null, v;
    }
    function n(v, r, y) {
      return v.index = y, t ? (y = v.alternate, y !== null ? (y = y.index, y < r ? (v.flags |= 67108866, r) : y) : (v.flags |= 67108866, r)) : (v.flags |= 1048576, r);
    }
    function i(v) {
      return t && v.alternate === null && (v.flags |= 67108866), v;
    }
    function f(v, r, y, z) {
      return r === null || r.tag !== 6 ? (r = fc(y, v.mode, z), r.return = v, r) : (r = u(r, y), r.return = v, r);
    }
    function o(v, r, y, z) {
      var V = y.type;
      return V === w ? T(
        v,
        r,
        y.props.children,
        z,
        y.key
      ) : r !== null && (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Ht && sa(V) === r.type) ? (r = u(r, y.props), Ou(r, y), r.return = v, r) : (r = On(
        y.type,
        y.key,
        y.props,
        null,
        v.mode,
        z
      ), Ou(r, y), r.return = v, r);
    }
    function S(v, r, y, z) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== y.containerInfo || r.stateNode.implementation !== y.implementation ? (r = sc(y, v.mode, z), r.return = v, r) : (r = u(r, y.children || []), r.return = v, r);
    }
    function T(v, r, y, z, V) {
      return r === null || r.tag !== 7 ? (r = ua(
        y,
        v.mode,
        z,
        V
      ), r.return = v, r) : (r = u(r, y), r.return = v, r);
    }
    function O(v, r, y) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = fc(
          "" + r,
          v.mode,
          y
        ), r.return = v, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case C:
            return y = On(
              r.type,
              r.key,
              r.props,
              null,
              v.mode,
              y
            ), Ou(y, r), y.return = v, y;
          case Q:
            return r = sc(
              r,
              v.mode,
              y
            ), r.return = v, r;
          case Ht:
            return r = sa(r), O(v, r, y);
        }
        if (Ft(r) || Ot(r))
          return r = ua(
            r,
            v.mode,
            y,
            null
          ), r.return = v, r;
        if (typeof r.then == "function")
          return O(v, Cn(r), y);
        if (r.$$typeof === pt)
          return O(
            v,
            xn(v, r),
            y
          );
        Hn(v, r);
      }
      return null;
    }
    function b(v, r, y, z) {
      var V = r !== null ? r.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return V !== null ? null : f(v, r, "" + y, z);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case C:
            return y.key === V ? o(v, r, y, z) : null;
          case Q:
            return y.key === V ? S(v, r, y, z) : null;
          case Ht:
            return y = sa(y), b(v, r, y, z);
        }
        if (Ft(y) || Ot(y))
          return V !== null ? null : T(v, r, y, z, null);
        if (typeof y.then == "function")
          return b(
            v,
            r,
            Cn(y),
            z
          );
        if (y.$$typeof === pt)
          return b(
            v,
            r,
            xn(v, y),
            z
          );
        Hn(v, y);
      }
      return null;
    }
    function p(v, r, y, z, V) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return v = v.get(y) || null, f(r, v, "" + z, V);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case C:
            return v = v.get(
              z.key === null ? y : z.key
            ) || null, o(r, v, z, V);
          case Q:
            return v = v.get(
              z.key === null ? y : z.key
            ) || null, S(r, v, z, V);
          case Ht:
            return z = sa(z), p(
              v,
              r,
              y,
              z,
              V
            );
        }
        if (Ft(z) || Ot(z))
          return v = v.get(y) || null, T(r, v, z, V, null);
        if (typeof z.then == "function")
          return p(
            v,
            r,
            y,
            Cn(z),
            V
          );
        if (z.$$typeof === pt)
          return p(
            v,
            r,
            y,
            xn(r, z),
            V
          );
        Hn(r, z);
      }
      return null;
    }
    function G(v, r, y, z) {
      for (var V = null, mt = null, X = r, lt = r = 0, it = null; X !== null && lt < y.length; lt++) {
        X.index > lt ? (it = X, X = null) : it = X.sibling;
        var vt = b(
          v,
          X,
          y[lt],
          z
        );
        if (vt === null) {
          X === null && (X = it);
          break;
        }
        t && X && vt.alternate === null && l(v, X), r = n(vt, r, lt), mt === null ? V = vt : mt.sibling = vt, mt = vt, X = it;
      }
      if (lt === y.length)
        return e(v, X), ot && le(v, lt), V;
      if (X === null) {
        for (; lt < y.length; lt++)
          X = O(v, y[lt], z), X !== null && (r = n(
            X,
            r,
            lt
          ), mt === null ? V = X : mt.sibling = X, mt = X);
        return ot && le(v, lt), V;
      }
      for (X = a(X); lt < y.length; lt++)
        it = p(
          X,
          v,
          lt,
          y[lt],
          z
        ), it !== null && (t && it.alternate !== null && X.delete(
          it.key === null ? lt : it.key
        ), r = n(
          it,
          r,
          lt
        ), mt === null ? V = it : mt.sibling = it, mt = it);
      return t && X.forEach(function(Ke) {
        return l(v, Ke);
      }), ot && le(v, lt), V;
    }
    function K(v, r, y, z) {
      if (y == null) throw Error(s(151));
      for (var V = null, mt = null, X = r, lt = r = 0, it = null, vt = y.next(); X !== null && !vt.done; lt++, vt = y.next()) {
        X.index > lt ? (it = X, X = null) : it = X.sibling;
        var Ke = b(v, X, vt.value, z);
        if (Ke === null) {
          X === null && (X = it);
          break;
        }
        t && X && Ke.alternate === null && l(v, X), r = n(Ke, r, lt), mt === null ? V = Ke : mt.sibling = Ke, mt = Ke, X = it;
      }
      if (vt.done)
        return e(v, X), ot && le(v, lt), V;
      if (X === null) {
        for (; !vt.done; lt++, vt = y.next())
          vt = O(v, vt.value, z), vt !== null && (r = n(vt, r, lt), mt === null ? V = vt : mt.sibling = vt, mt = vt);
        return ot && le(v, lt), V;
      }
      for (X = a(X); !vt.done; lt++, vt = y.next())
        vt = p(X, v, lt, vt.value, z), vt !== null && (t && vt.alternate !== null && X.delete(vt.key === null ? lt : vt.key), r = n(vt, r, lt), mt === null ? V = vt : mt.sibling = vt, mt = vt);
      return t && X.forEach(function(T0) {
        return l(v, T0);
      }), ot && le(v, lt), V;
    }
    function zt(v, r, y, z) {
      if (typeof y == "object" && y !== null && y.type === w && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case C:
            t: {
              for (var V = y.key; r !== null; ) {
                if (r.key === V) {
                  if (V = y.type, V === w) {
                    if (r.tag === 7) {
                      e(
                        v,
                        r.sibling
                      ), z = u(
                        r,
                        y.props.children
                      ), z.return = v, v = z;
                      break t;
                    }
                  } else if (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === Ht && sa(V) === r.type) {
                    e(
                      v,
                      r.sibling
                    ), z = u(r, y.props), Ou(z, y), z.return = v, v = z;
                    break t;
                  }
                  e(v, r);
                  break;
                } else l(v, r);
                r = r.sibling;
              }
              y.type === w ? (z = ua(
                y.props.children,
                v.mode,
                z,
                y.key
              ), z.return = v, v = z) : (z = On(
                y.type,
                y.key,
                y.props,
                null,
                v.mode,
                z
              ), Ou(z, y), z.return = v, v = z);
            }
            return i(v);
          case Q:
            t: {
              for (V = y.key; r !== null; ) {
                if (r.key === V)
                  if (r.tag === 4 && r.stateNode.containerInfo === y.containerInfo && r.stateNode.implementation === y.implementation) {
                    e(
                      v,
                      r.sibling
                    ), z = u(r, y.children || []), z.return = v, v = z;
                    break t;
                  } else {
                    e(v, r);
                    break;
                  }
                else l(v, r);
                r = r.sibling;
              }
              z = sc(y, v.mode, z), z.return = v, v = z;
            }
            return i(v);
          case Ht:
            return y = sa(y), zt(
              v,
              r,
              y,
              z
            );
        }
        if (Ft(y))
          return G(
            v,
            r,
            y,
            z
          );
        if (Ot(y)) {
          if (V = Ot(y), typeof V != "function") throw Error(s(150));
          return y = V.call(y), K(
            v,
            r,
            y,
            z
          );
        }
        if (typeof y.then == "function")
          return zt(
            v,
            r,
            Cn(y),
            z
          );
        if (y.$$typeof === pt)
          return zt(
            v,
            r,
            xn(v, y),
            z
          );
        Hn(v, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, r !== null && r.tag === 6 ? (e(v, r.sibling), z = u(r, y), z.return = v, v = z) : (e(v, r), z = fc(y, v.mode, z), z.return = v, v = z), i(v)) : e(v, r);
    }
    return function(v, r, y, z) {
      try {
        Nu = 0;
        var V = zt(
          v,
          r,
          y,
          z
        );
        return Ga = null, V;
      } catch (X) {
        if (X === Ya || X === Rn) throw X;
        var mt = zl(29, X, null, v.mode);
        return mt.lanes = z, mt.return = v, mt;
      } finally {
      }
    };
  }
  var ra = Uo(!0), Co = Uo(!1), De = !1;
  function _c(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ec(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Me(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xe(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (yt & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Nn(t), go(t, null, e), l;
    }
    return An(t, a, l, e), Nn(t);
  }
  function Du(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, zs(t, e);
    }
  }
  function Tc(t, l) {
    var e = t.updateQueue, a = t.alternate;
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
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var zc = !1;
  function Mu() {
    if (zc) {
      var t = Ba;
      if (t !== null) throw t;
    }
  }
  function xu(t, l, e, a) {
    zc = !1;
    var u = t.updateQueue;
    De = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var o = f, S = o.next;
      o.next = null, i === null ? n = S : i.next = S, i = o;
      var T = t.alternate;
      T !== null && (T = T.updateQueue, f = T.lastBaseUpdate, f !== i && (f === null ? T.firstBaseUpdate = S : f.next = S, T.lastBaseUpdate = o));
    }
    if (n !== null) {
      var O = u.baseState;
      i = 0, T = S = o = null, f = n;
      do {
        var b = f.lane & -536870913, p = b !== f.lane;
        if (p ? (nt & b) === b : (a & b) === b) {
          b !== 0 && b === qa && (zc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var G = t, K = f;
            b = l;
            var zt = e;
            switch (K.tag) {
              case 1:
                if (G = K.payload, typeof G == "function") {
                  O = G.call(zt, O, b);
                  break t;
                }
                O = G;
                break t;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = K.payload, b = typeof G == "function" ? G.call(zt, O, b) : G, b == null) break t;
                O = j({}, O, b);
                break t;
              case 2:
                De = !0;
            }
          }
          b = f.callback, b !== null && (t.flags |= 64, p && (t.flags |= 8192), p = u.callbacks, p === null ? u.callbacks = [b] : p.push(b));
        } else
          p = {
            lane: b,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, T === null ? (S = T = p, o = O) : T = T.next = p, i |= b;
        if (f = f.next, f === null) {
          if (f = u.shared.pending, f === null)
            break;
          p = f, f = p.next, p.next = null, u.lastBaseUpdate = p, u.shared.pending = null;
        }
      } while (!0);
      T === null && (o = O), u.baseState = o, u.firstBaseUpdate = S, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), He |= i, t.lanes = i, t.memoizedState = O;
    }
  }
  function Ho(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function qo(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Ho(e[t], l);
  }
  var Xa = d(null), qn = d(0);
  function Bo(t, l) {
    t = de, H(qn, t), H(Xa, l), de = t | l.baseLanes;
  }
  function Ac() {
    H(qn, de), H(Xa, Xa.current);
  }
  function Nc() {
    de = qn.current, A(Xa), A(qn);
  }
  var Al = d(null), Gl = null;
  function je(t) {
    var l = t.alternate;
    H(Vt, Vt.current & 1), H(Al, t), Gl === null && (l === null || Xa.current !== null || l.memoizedState !== null) && (Gl = t);
  }
  function Oc(t) {
    H(Vt, Vt.current), H(Al, t), Gl === null && (Gl = t);
  }
  function Yo(t) {
    t.tag === 22 ? (H(Vt, Vt.current), H(Al, t), Gl === null && (Gl = t)) : Re();
  }
  function Re() {
    H(Vt, Vt.current), H(Al, Al.current);
  }
  function Nl(t) {
    A(Al), Gl === t && (Gl = null), A(Vt);
  }
  var Vt = d(0);
  function Bn(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Cf(e) || Hf(e)))
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
  var ue = 0, tt = null, Et = null, Jt = null, Yn = !1, Qa = !1, da = !1, Gn = 0, ju = 0, Va = null, mh = 0;
  function Bt() {
    throw Error(s(321));
  }
  function Dc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Tl(t[e], l[e])) return !1;
    return !0;
  }
  function Mc(t, l, e, a, u, n) {
    return ue = n, tt = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, E.H = t === null || t.memoizedState === null ? _r : Zc, da = !1, n = e(a, u), da = !1, Qa && (n = Xo(
      l,
      e,
      a,
      u
    )), Go(t), n;
  }
  function Go(t) {
    E.H = Cu;
    var l = Et !== null && Et.next !== null;
    if (ue = 0, Jt = Et = tt = null, Yn = !1, ju = 0, Va = null, l) throw Error(s(300));
    t === null || wt || (t = t.dependencies, t !== null && Mn(t) && (wt = !0));
  }
  function Xo(t, l, e, a) {
    tt = t;
    var u = 0;
    do {
      if (Qa && (Va = null), ju = 0, Qa = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Jt = Et = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      E.H = Er, n = l(e, a);
    } while (Qa);
    return n;
  }
  function vh() {
    var t = E.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Ru(l) : l, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (tt.flags |= 1024), l;
  }
  function xc() {
    var t = Gn !== 0;
    return Gn = 0, t;
  }
  function jc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Rc(t) {
    if (Yn) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Yn = !1;
    }
    ue = 0, Jt = Et = tt = null, Qa = !1, ju = Gn = 0, Va = null;
  }
  function fl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Jt === null ? tt.memoizedState = Jt = t : Jt = Jt.next = t, Jt;
  }
  function Lt() {
    if (Et === null) {
      var t = tt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var l = Jt === null ? tt.memoizedState : Jt.next;
    if (l !== null)
      Jt = l, Et = t;
    else {
      if (t === null)
        throw tt.alternate === null ? Error(s(467)) : Error(s(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Jt === null ? tt.memoizedState = Jt = t : Jt = Jt.next = t;
    }
    return Jt;
  }
  function Xn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ru(t) {
    var l = ju;
    return ju += 1, Va === null && (Va = []), t = xo(Va, t, l), l = tt, (Jt === null ? l.memoizedState : Jt.next) === null && (l = l.alternate, E.H = l === null || l.memoizedState === null ? _r : Zc), t;
  }
  function Qn(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ru(t);
      if (t.$$typeof === pt) return ll(t);
    }
    throw Error(s(438, String(t)));
  }
  function Uc(t) {
    var l = null, e = tt.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = tt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = Xn(), tt.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = il;
    return l.index++, e;
  }
  function ne(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Vn(t) {
    var l = Lt();
    return Cc(l, Et, t);
  }
  function Cc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      l.baseQueue = u = n, a.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var f = i = null, o = null, S = l, T = !1;
      do {
        var O = S.lane & -536870913;
        if (O !== S.lane ? (nt & O) === O : (ue & O) === O) {
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
            }), O === qa && (T = !0);
          else if ((ue & b) === b) {
            S = S.next, b === qa && (T = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, o === null ? (f = o = O, i = n) : o = o.next = O, tt.lanes |= b, He |= b;
          O = S.action, da && e(n, O), n = S.hasEagerState ? S.eagerState : e(n, O);
        } else
          b = {
            lane: O,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, o === null ? (f = o = b, i = n) : o = o.next = b, tt.lanes |= O, He |= O;
        S = S.next;
      } while (S !== null && S !== l);
      if (o === null ? i = n : o.next = f, !Tl(n, t.memoizedState) && (wt = !0, T && (e = Ba, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = o, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Hc(t) {
    var l = Lt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      Tl(n, l.memoizedState) || (wt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Qo(t, l, e) {
    var a = tt, u = Lt(), n = ot;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !Tl(
      (Et || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, wt = !0), u = u.queue, Yc(Zo.bind(null, a, u, t), [
      t
    ]), u.getSnapshot !== l || i || Jt !== null && Jt.memoizedState.tag & 1) {
      if (a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), At === null) throw Error(s(349));
      n || (ue & 127) !== 0 || Vo(a, l, e);
    }
    return e;
  }
  function Vo(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = tt.updateQueue, l === null ? (l = Xn(), tt.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Lo(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Ko(l) && Jo(t);
  }
  function Zo(t, l, e) {
    return e(function() {
      Ko(l) && Jo(t);
    });
  }
  function Ko(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Tl(t, e);
    } catch {
      return !0;
    }
  }
  function Jo(t) {
    var l = aa(t, 2);
    l !== null && Sl(l, t, 2);
  }
  function qc(t) {
    var l = fl();
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
      lastRenderedReducer: ne,
      lastRenderedState: t
    }, l;
  }
  function wo(t, l, e, a) {
    return t.baseState = e, Cc(
      t,
      Et,
      typeof a == "function" ? a : ne
    );
  }
  function hh(t, l, e, a, u) {
    if (Kn(t)) throw Error(s(485));
    if (t = l.action, t !== null) {
      var n = {
        payload: u,
        action: t,
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
      E.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, $o(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function $o(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = E.T, i = {};
      E.T = i;
      try {
        var f = e(u, a), o = E.S;
        o !== null && o(i, f), Wo(t, l, f);
      } catch (S) {
        Bc(t, l, S);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), E.T = n;
      }
    } else
      try {
        n = e(u, a), Wo(t, l, n);
      } catch (S) {
        Bc(t, l, S);
      }
  }
  function Wo(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Fo(t, l, a);
      },
      function(a) {
        return Bc(t, l, a);
      }
    ) : Fo(t, l, e);
  }
  function Fo(t, l, e) {
    l.status = "fulfilled", l.value = e, ko(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, $o(t, e)));
  }
  function Bc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, ko(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function ko(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Io(t, l) {
    return l;
  }
  function Po(t, l) {
    if (ot) {
      var e = At.formState;
      if (e !== null) {
        t: {
          var a = tt;
          if (ot) {
            if (jt) {
              l: {
                for (var u = jt, n = Yl; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Xl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                jt = Xl(
                  u.nextSibling
                ), a = u.data === "F!";
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
    return e = fl(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Io,
      lastRenderedState: l
    }, e.queue = a, e = Sr.bind(
      null,
      tt,
      a
    ), a.dispatch = e, a = qc(!1), n = Lc.bind(
      null,
      tt,
      !1,
      a.queue
    ), a = fl(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = hh.bind(
      null,
      tt,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function tr(t) {
    var l = Lt();
    return lr(l, Et, t);
  }
  function lr(t, l, e) {
    if (l = Cc(
      t,
      l,
      Io
    )[0], t = Vn(ne)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Ru(l);
      } catch (i) {
        throw i === Ya ? Rn : i;
      }
    else a = l;
    l = Lt();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (tt.flags |= 2048, La(
      9,
      { destroy: void 0 },
      yh.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function yh(t, l) {
    t.action = l;
  }
  function er(t) {
    var l = Lt(), e = Et;
    if (e !== null)
      return lr(l, e, t);
    Lt(), l = l.memoizedState, e = Lt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function La(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = tt.updateQueue, l === null && (l = Xn(), tt.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function ar() {
    return Lt().memoizedState;
  }
  function Ln(t, l, e, a) {
    var u = fl();
    tt.flags |= t, u.memoizedState = La(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Zn(t, l, e, a) {
    var u = Lt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    Et !== null && a !== null && Dc(a, Et.memoizedState.deps) ? u.memoizedState = La(l, n, e, a) : (tt.flags |= t, u.memoizedState = La(
      1 | l,
      n,
      e,
      a
    ));
  }
  function ur(t, l) {
    Ln(8390656, 8, t, l);
  }
  function Yc(t, l) {
    Zn(2048, 8, t, l);
  }
  function gh(t) {
    tt.flags |= 4;
    var l = tt.updateQueue;
    if (l === null)
      l = Xn(), tt.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function nr(t) {
    var l = Lt().memoizedState;
    return gh({ ref: l, nextImpl: t }), function() {
      if ((yt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function ir(t, l) {
    return Zn(4, 2, t, l);
  }
  function cr(t, l) {
    return Zn(4, 4, t, l);
  }
  function fr(t, l) {
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
  function sr(t, l, e) {
    e = e != null ? e.concat([t]) : null, Zn(4, 4, fr.bind(null, l, t), e);
  }
  function Gc() {
  }
  function or(t, l) {
    var e = Lt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && Dc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function rr(t, l) {
    var e = Lt();
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
  function Xc(t, l, e) {
    return e === void 0 || (ue & 1073741824) !== 0 && (nt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = dd(), tt.lanes |= t, He |= t, e);
  }
  function dr(t, l, e, a) {
    return Tl(e, l) ? e : Xa.current !== null ? (t = Xc(t, e, a), Tl(t, l) || (wt = !0), t) : (ue & 42) === 0 || (ue & 1073741824) !== 0 && (nt & 261930) === 0 ? (wt = !0, t.memoizedState = e) : (t = dd(), tt.lanes |= t, He |= t, l);
  }
  function mr(t, l, e, a, u) {
    var n = q.p;
    q.p = n !== 0 && 8 > n ? n : 8;
    var i = E.T, f = {};
    E.T = f, Lc(t, !1, l, e);
    try {
      var o = u(), S = E.S;
      if (S !== null && S(f, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var T = dh(
          o,
          a
        );
        Uu(
          t,
          l,
          T,
          Ml(t)
        );
      } else
        Uu(
          t,
          l,
          a,
          Ml(t)
        );
    } catch (O) {
      Uu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: O },
        Ml()
      );
    } finally {
      q.p = n, i !== null && f.types !== null && (i.types = f.types), E.T = i;
    }
  }
  function Sh() {
  }
  function Qc(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var u = vr(t).queue;
    mr(
      t,
      u,
      l,
      Z,
      e === null ? Sh : function() {
        return hr(t), e(a);
      }
    );
  }
  function vr(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ne,
        lastRenderedState: Z
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
        lastRenderedReducer: ne,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function hr(t) {
    var l = vr(t);
    l.next === null && (l = t.alternate.memoizedState), Uu(
      t,
      l.next.queue,
      {},
      Ml()
    );
  }
  function Vc() {
    return ll(Fu);
  }
  function yr() {
    return Lt().memoizedState;
  }
  function gr() {
    return Lt().memoizedState;
  }
  function bh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Ml();
          t = Me(e);
          var a = xe(l, t, e);
          a !== null && (Sl(a, l, e), Du(a, l, e)), l = { cache: gc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function ph(t, l, e) {
    var a = Ml();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(t) ? br(l, e) : (e = ic(t, l, e, a), e !== null && (Sl(e, t, a), pr(e, l, a)));
  }
  function Sr(t, l, e) {
    var a = Ml();
    Uu(t, l, e, a);
  }
  function Uu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Kn(t)) br(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, f = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = f, Tl(f, i))
            return An(t, l, u, 0), At === null && zn(), !1;
        } catch {
        } finally {
        }
      if (e = ic(t, l, u, a), e !== null)
        return Sl(e, t, a), pr(e, l, a), !0;
    }
    return !1;
  }
  function Lc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Ef(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Kn(t)) {
      if (l) throw Error(s(479));
    } else
      l = ic(
        t,
        e,
        a,
        2
      ), l !== null && Sl(l, t, 2);
  }
  function Kn(t) {
    var l = t.alternate;
    return t === tt || l !== null && l === tt;
  }
  function br(t, l) {
    Qa = Yn = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function pr(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, zs(t, e);
    }
  }
  var Cu = {
    readContext: ll,
    use: Qn,
    useCallback: Bt,
    useContext: Bt,
    useEffect: Bt,
    useImperativeHandle: Bt,
    useLayoutEffect: Bt,
    useInsertionEffect: Bt,
    useMemo: Bt,
    useReducer: Bt,
    useRef: Bt,
    useState: Bt,
    useDebugValue: Bt,
    useDeferredValue: Bt,
    useTransition: Bt,
    useSyncExternalStore: Bt,
    useId: Bt,
    useHostTransitionStatus: Bt,
    useFormState: Bt,
    useActionState: Bt,
    useOptimistic: Bt,
    useMemoCache: Bt,
    useCacheRefresh: Bt
  };
  Cu.useEffectEvent = Bt;
  var _r = {
    readContext: ll,
    use: Qn,
    useCallback: function(t, l) {
      return fl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: ll,
    useEffect: ur,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, Ln(
        4194308,
        4,
        fr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return Ln(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      Ln(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = fl();
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
      var a = fl();
      if (e !== void 0) {
        var u = e(l);
        if (da) {
          _e(!0);
          try {
            e(l);
          } finally {
            _e(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = ph.bind(
        null,
        tt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = fl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = qc(t);
      var l = t.queue, e = Sr.bind(null, tt, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Gc,
    useDeferredValue: function(t, l) {
      var e = fl();
      return Xc(e, t, l);
    },
    useTransition: function() {
      var t = qc(!1);
      return t = mr.bind(
        null,
        tt,
        t.queue,
        !0,
        !1
      ), fl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = tt, u = fl();
      if (ot) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), At === null)
          throw Error(s(349));
        (nt & 127) !== 0 || Vo(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, ur(Zo.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, La(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = fl(), l = At.identifierPrefix;
      if (ot) {
        var e = Jl, a = Kl;
        e = (a & ~(1 << 32 - El(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Gn++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = mh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Vc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(t) {
      var l = fl();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Lc.bind(
        null,
        tt,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Uc,
    useCacheRefresh: function() {
      return fl().memoizedState = bh.bind(
        null,
        tt
      );
    },
    useEffectEvent: function(t) {
      var l = fl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((yt & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Zc = {
    readContext: ll,
    use: Qn,
    useCallback: or,
    useContext: ll,
    useEffect: Yc,
    useImperativeHandle: sr,
    useInsertionEffect: ir,
    useLayoutEffect: cr,
    useMemo: rr,
    useReducer: Vn,
    useRef: ar,
    useState: function() {
      return Vn(ne);
    },
    useDebugValue: Gc,
    useDeferredValue: function(t, l) {
      var e = Lt();
      return dr(
        e,
        Et.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Vn(ne)[0], l = Lt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ru(t),
        l
      ];
    },
    useSyncExternalStore: Qo,
    useId: yr,
    useHostTransitionStatus: Vc,
    useFormState: tr,
    useActionState: tr,
    useOptimistic: function(t, l) {
      var e = Lt();
      return wo(e, Et, t, l);
    },
    useMemoCache: Uc,
    useCacheRefresh: gr
  };
  Zc.useEffectEvent = nr;
  var Er = {
    readContext: ll,
    use: Qn,
    useCallback: or,
    useContext: ll,
    useEffect: Yc,
    useImperativeHandle: sr,
    useInsertionEffect: ir,
    useLayoutEffect: cr,
    useMemo: rr,
    useReducer: Hc,
    useRef: ar,
    useState: function() {
      return Hc(ne);
    },
    useDebugValue: Gc,
    useDeferredValue: function(t, l) {
      var e = Lt();
      return Et === null ? Xc(e, t, l) : dr(
        e,
        Et.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Hc(ne)[0], l = Lt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ru(t),
        l
      ];
    },
    useSyncExternalStore: Qo,
    useId: yr,
    useHostTransitionStatus: Vc,
    useFormState: er,
    useActionState: er,
    useOptimistic: function(t, l) {
      var e = Lt();
      return Et !== null ? wo(e, Et, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Uc,
    useCacheRefresh: gr
  };
  Er.useEffectEvent = nr;
  function Kc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : j({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Jc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ml(), u = Me(a);
      u.payload = l, e != null && (u.callback = e), l = xe(t, u, a), l !== null && (Sl(l, t, a), Du(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ml(), u = Me(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = xe(t, u, a), l !== null && (Sl(l, t, a), Du(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Ml(), a = Me(e);
      a.tag = 2, l != null && (a.callback = l), l = xe(t, a, e), l !== null && (Sl(l, t, e), Du(l, t, e));
    }
  };
  function Tr(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !pu(e, a) || !pu(u, n) : !0;
  }
  function zr(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && Jc.enqueueReplaceState(l, l.state, null);
  }
  function ma(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = j({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function Ar(t) {
    Tn(t);
  }
  function Nr(t) {
    console.error(t);
  }
  function Or(t) {
    Tn(t);
  }
  function Jn(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Dr(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function wc(t, l, e) {
    return e = Me(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Jn(t, l);
    }, e;
  }
  function Mr(t) {
    return t = Me(t), t.tag = 3, t;
  }
  function xr(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        Dr(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Dr(l, e, a), typeof u != "function" && (qe === null ? qe = /* @__PURE__ */ new Set([this]) : qe.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function _h(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Ha(
        l,
        e,
        u,
        !0
      ), e = Al.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Gl === null ? ui() : e.alternate === null && Yt === 0 && (Yt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Un ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), bf(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Un ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), bf(t, a, u)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return bf(t, a, u), ui(), !1;
    }
    if (ot)
      return l = Al.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== dc && (t = Error(s(422), { cause: a }), Tu(Hl(t, e)))) : (a !== dc && (l = Error(s(423), {
        cause: a
      }), Tu(
        Hl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Hl(a, e), u = wc(
        t.stateNode,
        a,
        u
      ), Tc(t, u), Yt !== 4 && (Yt = 2)), !1;
    var n = Error(s(520), { cause: a });
    if (n = Hl(n, e), Vu === null ? Vu = [n] : Vu.push(n), Yt !== 4 && (Yt = 2), l === null) return !0;
    a = Hl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = wc(e.stateNode, a, t), Tc(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (qe === null || !qe.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Mr(u), xr(
              u,
              t,
              e,
              a
            ), Tc(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var $c = Error(s(461)), wt = !1;
  function el(t, l, e, a) {
    l.child = t === null ? Co(l, null, e, a) : ra(
      l,
      t.child,
      e,
      a
    );
  }
  function jr(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return ca(l), a = Mc(
      t,
      l,
      e,
      i,
      n,
      u
    ), f = xc(), t !== null && !wt ? (jc(t, l, u), ie(t, l, u)) : (ot && f && oc(l), l.flags |= 1, el(t, l, a, u), l.child);
  }
  function Rr(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !cc(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, Ur(
        t,
        l,
        n,
        a,
        u
      )) : (t = On(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !ef(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : pu, e(i, a) && t.ref === l.ref)
        return ie(t, l, u);
    }
    return l.flags |= 1, t = te(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Ur(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (pu(n, a) && t.ref === l.ref)
        if (wt = !1, l.pendingProps = a = n, ef(t, u))
          (t.flags & 131072) !== 0 && (wt = !0);
        else
          return l.lanes = t.lanes, ie(t, l, u);
    }
    return Wc(
      t,
      l,
      e,
      a,
      u
    );
  }
  function Cr(t, l, e, a) {
    var u = a.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, l.child = null;
        return Hr(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && jn(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? Bo(l, n) : Ac(), Yo(l);
      else
        return a = l.lanes = 536870912, Hr(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (jn(l, n.cachePool), Bo(l, n), Re(), l.memoizedState = null) : (t !== null && jn(l, null), Ac(), Re());
    return el(t, l, u, e), l.child;
  }
  function Hu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Hr(t, l, e, a, u) {
    var n = bc();
    return n = n === null ? null : { parent: Kt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && jn(l, null), Ac(), Yo(l), t !== null && Ha(t, l, a, !0), l.childLanes = u, null;
  }
  function wn(t, l) {
    return l = Wn(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function qr(t, l, e) {
    return ra(l, t.child, null, e), t = wn(l, l.pendingProps), t.flags |= 2, Nl(l), l.memoizedState = null, t;
  }
  function Eh(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (ot) {
        if (a.mode === "hidden")
          return t = wn(l, a), l.lanes = 536870912, Hu(null, t);
        if (Oc(l), (t = jt) ? (t = $d(
          t,
          Yl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ze !== null ? { id: Kl, overflow: Jl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(t), e.return = l, l.child = e, tl = l, jt = null)) : t = null, t === null) throw Ne(l);
        return l.lanes = 536870912, null;
      }
      return wn(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Oc(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = qr(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (wt || Ha(t, l, e, !1), u = (e & t.childLanes) !== 0, wt || u) {
        if (a = At, a !== null && (i = As(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, aa(t, i), Sl(a, t, i), $c;
        ui(), l = qr(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, jt = Xl(i.nextSibling), tl = l, ot = !0, Ae = null, Yl = !1, t !== null && Eo(l, t), l = wn(l, a), l.flags |= 4096;
      return l;
    }
    return t = te(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function $n(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Wc(t, l, e, a, u) {
    return ca(l), e = Mc(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = xc(), t !== null && !wt ? (jc(t, l, u), ie(t, l, u)) : (ot && a && oc(l), l.flags |= 1, el(t, l, e, u), l.child);
  }
  function Br(t, l, e, a, u, n) {
    return ca(l), l.updateQueue = null, e = Xo(
      l,
      a,
      e,
      u
    ), Go(t), a = xc(), t !== null && !wt ? (jc(t, l, n), ie(t, l, n)) : (ot && a && oc(l), l.flags |= 1, el(t, l, e, n), l.child);
  }
  function Yr(t, l, e, a, u) {
    if (ca(l), l.stateNode === null) {
      var n = ja, i = e.contextType;
      typeof i == "object" && i !== null && (n = ll(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Jc, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, _c(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? ll(i) : ja, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Kc(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && Jc.enqueueReplaceState(n, n.state, null), xu(l, a, n, u), Mu(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var f = l.memoizedProps, o = ma(e, f);
      n.props = o;
      var S = n.context, T = e.contextType;
      i = ja, typeof T == "object" && T !== null && (i = ll(T));
      var O = e.getDerivedStateFromProps;
      T = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", f = l.pendingProps !== f, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f || S !== i) && zr(
        l,
        n,
        a,
        i
      ), De = !1;
      var b = l.memoizedState;
      n.state = b, xu(l, a, n, u), Mu(), S = l.memoizedState, f || b !== S || De ? (typeof O == "function" && (Kc(
        l,
        e,
        O,
        a
      ), S = l.memoizedState), (o = De || Tr(
        l,
        e,
        o,
        a,
        b,
        S,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = S), n.props = a, n.state = S, n.context = i, a = o) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, Ec(t, l), i = l.memoizedProps, T = ma(e, i), n.props = T, O = l.pendingProps, b = n.context, S = e.contextType, o = ja, typeof S == "object" && S !== null && (o = ll(S)), f = e.getDerivedStateFromProps, (S = typeof f == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || b !== o) && zr(
        l,
        n,
        a,
        o
      ), De = !1, b = l.memoizedState, n.state = b, xu(l, a, n, u), Mu();
      var p = l.memoizedState;
      i !== O || b !== p || De || t !== null && t.dependencies !== null && Mn(t.dependencies) ? (typeof f == "function" && (Kc(
        l,
        e,
        f,
        a
      ), p = l.memoizedState), (T = De || Tr(
        l,
        e,
        T,
        a,
        b,
        p,
        o
      ) || t !== null && t.dependencies !== null && Mn(t.dependencies)) ? (S || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, p, o), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        p,
        o
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = p), n.props = a, n.state = p, n.context = o, a = T) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, $n(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = ra(
      l,
      t.child,
      null,
      u
    ), l.child = ra(
      l,
      null,
      e,
      u
    )) : el(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = ie(
      t,
      l,
      u
    ), t;
  }
  function Gr(t, l, e, a) {
    return na(), l.flags |= 256, el(t, l, e, a), l.child;
  }
  var Fc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(t) {
    return { baseLanes: t, cachePool: Do() };
  }
  function Ic(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Dl), t;
  }
  function Xr(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (ot) {
        if (u ? je(l) : Re(), (t = jt) ? (t = $d(
          t,
          Yl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ze !== null ? { id: Kl, overflow: Jl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(t), e.return = l, l.child = e, tl = l, jt = null)) : t = null, t === null) throw Ne(l);
        return Hf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, u ? (Re(), u = l.mode, f = Wn(
        { mode: "hidden", children: f },
        u
      ), a = ua(
        a,
        u,
        e,
        null
      ), f.return = l, a.return = l, f.sibling = a, l.child = f, a = l.child, a.memoizedState = kc(e), a.childLanes = Ic(
        t,
        i,
        e
      ), l.memoizedState = Fc, Hu(null, a)) : (je(l), Pc(l, f));
    }
    var o = t.memoizedState;
    if (o !== null && (f = o.dehydrated, f !== null)) {
      if (n)
        l.flags & 256 ? (je(l), l.flags &= -257, l = tf(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Re(), l.child = t.child, l.flags |= 128, l = null) : (Re(), f = a.fallback, u = l.mode, a = Wn(
          { mode: "visible", children: a.children },
          u
        ), f = ua(
          f,
          u,
          e,
          null
        ), f.flags |= 2, a.return = l, f.return = l, a.sibling = f, l.child = a, ra(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = kc(e), a.childLanes = Ic(
          t,
          i,
          e
        ), l.memoizedState = Fc, l = Hu(null, a));
      else if (je(l), Hf(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var S = i.dgst;
        i = S, a = Error(s(419)), a.stack = "", a.digest = i, Tu({ value: a, source: null, stack: null }), l = tf(
          t,
          l,
          e
        );
      } else if (wt || Ha(t, l, e, !1), i = (e & t.childLanes) !== 0, wt || i) {
        if (i = At, i !== null && (a = As(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, aa(t, a), Sl(i, t, a), $c;
        Cf(f) || ui(), l = tf(
          t,
          l,
          e
        );
      } else
        Cf(f) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, jt = Xl(
          f.nextSibling
        ), tl = l, ot = !0, Ae = null, Yl = !1, t !== null && Eo(l, t), l = Pc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return u ? (Re(), f = a.fallback, u = l.mode, o = t.child, S = o.sibling, a = te(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, S !== null ? f = te(
      S,
      f
    ) : (f = ua(
      f,
      u,
      e,
      null
    ), f.flags |= 2), f.return = l, a.return = l, a.sibling = f, l.child = a, Hu(null, a), a = l.child, f = t.child.memoizedState, f === null ? f = kc(e) : (u = f.cachePool, u !== null ? (o = Kt._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Do(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: u
    }), a.memoizedState = f, a.childLanes = Ic(
      t,
      i,
      e
    ), l.memoizedState = Fc, Hu(t.child, a)) : (je(l), e = t.child, t = e.sibling, e = te(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Pc(t, l) {
    return l = Wn(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Wn(t, l) {
    return t = zl(22, t, null, l), t.lanes = 0, t;
  }
  function tf(t, l, e) {
    return ra(l, t.child, null, e), t = Pc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Qr(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), hc(t.return, l, e);
  }
  function lf(t, l, e, a, u, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Vr(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Vt.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, H(Vt, i), el(t, l, a, e), a = ot ? Eu : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Qr(t, e, l);
        else if (t.tag === 19)
          Qr(t, e, l);
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
    switch (u) {
      case "forwards":
        for (e = l.child, u = null; e !== null; )
          t = e.alternate, t !== null && Bn(t) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), lf(
          l,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Bn(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        lf(
          l,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        lf(
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
  function ie(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), He |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Ha(
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
      for (t = l.child, e = te(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = te(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function ef(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Mn(t)));
  }
  function Th(t, l, e) {
    switch (l.tag) {
      case 3:
        Xt(l, l.stateNode.containerInfo), Oe(l, Kt, t.memoizedState.cache), na();
        break;
      case 27:
      case 5:
        be(l);
        break;
      case 4:
        Xt(l, l.stateNode.containerInfo);
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
          return l.flags |= 128, Oc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (je(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Xr(t, l, e) : (je(l), t = ie(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        je(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (Ha(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Vr(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), H(Vt, Vt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Cr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Oe(l, Kt, t.memoizedState.cache);
    }
    return ie(t, l, e);
  }
  function Lr(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        wt = !0;
      else {
        if (!ef(t, e) && (l.flags & 128) === 0)
          return wt = !1, Th(
            t,
            l,
            e
          );
        wt = (t.flags & 131072) !== 0;
      }
    else
      wt = !1, ot && (l.flags & 1048576) !== 0 && _o(l, Eu, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = sa(l.elementType), l.type = t, typeof t == "function")
            cc(t) ? (a = ma(t, a), l.tag = 1, l = Yr(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Wc(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === Nt) {
                l.tag = 11, l = jr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === $) {
                l.tag = 14, l = Rr(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Gt(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return Wc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = ma(
          a,
          l.pendingProps
        ), Yr(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (Xt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, Ec(t, l), xu(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, Oe(l, Kt, a), a !== n.cache && yc(
            l,
            [Kt],
            e,
            !0
          ), Mu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = Gr(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = Hl(
                Error(s(424)),
                l
              ), Tu(u), l = Gr(
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
              for (jt = Xl(t.firstChild), tl = l, ot = !0, Ae = null, Yl = !0, e = Co(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (na(), a === u) {
              l = ie(
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
        return $n(t, l), t === null ? (e = tm(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : ot || (e = l.type, t = l.pendingProps, a = ri(
          P.current
        ).createElement(e), a[Pt] = l, a[dl] = t, al(a, e, t), kt(a), l.stateNode = a) : l.memoizedState = tm(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return be(l), t === null && ot && (a = l.stateNode = kd(
          l.type,
          l.pendingProps,
          P.current
        ), tl = l, Yl = !0, u = jt, Xe(l.type) ? (qf = u, jt = Xl(a.firstChild)) : jt = u), el(
          t,
          l,
          l.pendingProps.children,
          e
        ), $n(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && ot && ((u = a = jt) && (a = Ph(
          a,
          l.type,
          l.pendingProps,
          Yl
        ), a !== null ? (l.stateNode = a, tl = l, jt = Xl(a.firstChild), Yl = !1, u = !0) : u = !1), u || Ne(l)), be(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, jf(u, n) ? a = null : i !== null && jf(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = Mc(
          t,
          l,
          vh,
          null,
          null,
          e
        ), Fu._currentValue = u), $n(t, l), el(t, l, a, e), l.child;
      case 6:
        return t === null && ot && ((t = e = jt) && (e = t0(
          e,
          l.pendingProps,
          Yl
        ), e !== null ? (l.stateNode = e, tl = l, jt = null, t = !0) : t = !1), t || Ne(l)), null;
      case 13:
        return Xr(t, l, e);
      case 4:
        return Xt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = ra(
          l,
          null,
          a,
          e
        ) : el(t, l, a, e), l.child;
      case 11:
        return jr(
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
        return u = l.type._context, a = l.pendingProps.children, ca(l), u = ll(u), a = a(u), l.flags |= 1, el(t, l, a, e), l.child;
      case 14:
        return Rr(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Ur(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Vr(t, l, e);
      case 31:
        return Eh(t, l, e);
      case 22:
        return Cr(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return ca(l), a = ll(Kt), t === null ? (u = bc(), u === null && (u = At, n = gc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, _c(l), Oe(l, Kt, u)) : ((t.lanes & e) !== 0 && (Ec(t, l), xu(l, null, null, e), Mu()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), Oe(l, Kt, a)) : (a = n.cache, Oe(l, Kt, a), a !== u.cache && yc(
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
  function ce(t) {
    t.flags |= 4;
  }
  function af(t, l, e, a, u) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (yd()) t.flags |= 8192;
        else
          throw oa = Un, pc;
    } else t.flags &= -16777217;
  }
  function Zr(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !nm(l))
      if (yd()) t.flags |= 8192;
      else
        throw oa = Un, pc;
  }
  function Fn(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Es() : 536870912, t.lanes |= l, wa |= l);
  }
  function qu(t, l) {
    if (!ot)
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
  function Rt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function zh(t, l, e) {
    var a = l.pendingProps;
    switch (rc(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Rt(l), null;
      case 1:
        return Rt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), ae(Kt), qt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (Ca(l) ? ce(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, mc())), Rt(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (ce(l), n !== null ? (Rt(l), Zr(l, n)) : (Rt(l), af(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (ce(l), Rt(l), Zr(l, n)) : (Rt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && ce(l), Rt(l), af(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (We(l), e = P.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && ce(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Rt(l), null;
          }
          t = Y.current, Ca(l) ? To(l) : (t = kd(u, a, e), l.stateNode = t, ce(l));
        }
        return Rt(l), null;
      case 5:
        if (We(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && ce(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Rt(l), null;
          }
          if (n = Y.current, Ca(l))
            To(l);
          else {
            var i = ri(
              P.current
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
            n[Pt] = l, n[dl] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
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
            l.stateNode = n;
            t: switch (al(n, u, a), u) {
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
            a && ce(l);
          }
        }
        return Rt(l), af(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && ce(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = P.current, Ca(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = tl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[Pt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Xd(t.nodeValue, e)), t || Ne(l, !0);
          } else
            t = ri(t).createTextNode(
              a
            ), t[Pt] = l, l.stateNode = t;
        }
        return Rt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Ca(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Pt] = l;
            } else
              na(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Rt(l), t = !1;
          } else
            e = mc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Nl(l), l) : (Nl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Rt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Ca(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Pt] = l;
            } else
              na(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Rt(l), u = !1;
          } else
            u = mc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (Nl(l), l) : (Nl(l), null);
        }
        return Nl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Fn(l, l.updateQueue), Rt(l), null);
      case 4:
        return qt(), t === null && Nf(l.stateNode.containerInfo), Rt(l), null;
      case 10:
        return ae(l.type), Rt(l), null;
      case 19:
        if (A(Vt), a = l.memoizedState, a === null) return Rt(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) qu(a, !1);
          else {
            if (Yt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = Bn(t), n !== null) {
                  for (l.flags |= 128, qu(a, !1), t = n.updateQueue, l.updateQueue = t, Fn(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    So(e, t), e = e.sibling;
                  return H(
                    Vt,
                    Vt.current & 1 | 2
                  ), ot && le(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && xt() > li && (l.flags |= 128, u = !0, qu(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Bn(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, Fn(l, t), qu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !ot)
                return Rt(l), null;
            } else
              2 * xt() - a.renderingStartTime > li && e !== 536870912 && (l.flags |= 128, u = !0, qu(a, !1), l.lanes = 4194304);
          a.isBackwards ? (n.sibling = l.child, l.child = n) : (t = a.last, t !== null ? t.sibling = n : l.child = n, a.last = n);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = xt(), t.sibling = null, e = Vt.current, H(
          Vt,
          u ? e & 1 | 2 : e & 1
        ), ot && le(l, a.treeForkCount), t) : (Rt(l), null);
      case 22:
      case 23:
        return Nl(l), Nc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Rt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Rt(l), e = l.updateQueue, e !== null && Fn(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && A(fa), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), ae(Kt), Rt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function Ah(t, l) {
    switch (rc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return ae(Kt), qt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return We(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Nl(l), l.alternate === null)
            throw Error(s(340));
          na();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Nl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          na();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return A(Vt), null;
      case 4:
        return qt(), null;
      case 10:
        return ae(l.type), null;
      case 22:
      case 23:
        return Nl(l), Nc(), t !== null && A(fa), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return ae(Kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kr(t, l) {
    switch (rc(l), l.tag) {
      case 3:
        ae(Kt), qt();
        break;
      case 26:
      case 27:
      case 5:
        We(l);
        break;
      case 4:
        qt();
        break;
      case 31:
        l.memoizedState !== null && Nl(l);
        break;
      case 13:
        Nl(l);
        break;
      case 19:
        A(Vt);
        break;
      case 10:
        ae(l.type);
        break;
      case 22:
      case 23:
        Nl(l), Nc(), t !== null && A(fa);
        break;
      case 24:
        ae(Kt);
    }
  }
  function Bu(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (f) {
      bt(l, l.return, f);
    }
  }
  function Ue(t, l, e) {
    try {
      var a = l.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, u = l;
              var o = e, S = f;
              try {
                S();
              } catch (T) {
                bt(
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
      bt(l, l.return, T);
    }
  }
  function Jr(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        qo(l, e);
      } catch (a) {
        bt(t, t.return, a);
      }
    }
  }
  function wr(t, l, e) {
    e.props = ma(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      bt(t, l, a);
    }
  }
  function Yu(t, l) {
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
    } catch (u) {
      bt(t, l, u);
    }
  }
  function wl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          bt(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          bt(t, l, u);
        }
      else e.current = null;
  }
  function $r(t) {
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
    } catch (u) {
      bt(t, t.return, u);
    }
  }
  function uf(t, l, e) {
    try {
      var a = t.stateNode;
      wh(a, t.type, e, l), a[dl] = l;
    } catch (u) {
      bt(t, t.return, u);
    }
  }
  function Wr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Xe(t.type) || t.tag === 4;
  }
  function nf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Wr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Xe(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function cf(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Il));
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (cf(t, l, e), t = t.sibling; t !== null; )
        cf(t, l, e), t = t.sibling;
  }
  function kn(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Xe(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (kn(t, l, e), t = t.sibling; t !== null; )
        kn(t, l, e), t = t.sibling;
  }
  function Fr(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      al(l, a, e), l[Pt] = t, l[dl] = e;
    } catch (n) {
      bt(t, t.return, n);
    }
  }
  var fe = !1, $t = !1, ff = !1, kr = typeof WeakSet == "function" ? WeakSet : Set, It = null;
  function Nh(t, l) {
    if (t = t.containerInfo, Mf = Si, t = fo(t), tc(t)) {
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
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, f = -1, o = -1, S = 0, T = 0, O = t, b = null;
            l: for (; ; ) {
              for (var p; O !== e || u !== 0 && O.nodeType !== 3 || (f = i + u), O !== n || a !== 0 && O.nodeType !== 3 || (o = i + a), O.nodeType === 3 && (i += O.nodeValue.length), (p = O.firstChild) !== null; )
                b = O, O = p;
              for (; ; ) {
                if (O === t) break l;
                if (b === e && ++S === u && (f = i), b === n && ++T === a && (o = i), (p = O.nextSibling) !== null) break;
                O = b, b = O.parentNode;
              }
              O = p;
            }
            e = f === -1 || o === -1 ? null : { start: f, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (xf = { focusedElem: t, selectionRange: e }, Si = !1, It = l; It !== null; )
      if (l = It, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, It = t;
      else
        for (; It !== null; ) {
          switch (l = It, n = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  u = t[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                t = void 0, e = l, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var G = ma(
                    e.type,
                    u
                  );
                  t = a.getSnapshotBeforeUpdate(
                    G,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (K) {
                  bt(
                    e,
                    e.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Uf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Uf(t);
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
  function Ir(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        oe(t, e), a & 4 && Bu(5, e);
        break;
      case 1:
        if (oe(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              bt(e, e.return, i);
            }
          else {
            var u = ma(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              bt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Jr(e), a & 512 && Yu(e, e.return);
        break;
      case 3:
        if (oe(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
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
            qo(t, l);
          } catch (i) {
            bt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Fr(e);
      case 26:
      case 5:
        oe(t, e), l === null && a & 4 && $r(e), a & 512 && Yu(e, e.return);
        break;
      case 12:
        oe(t, e);
        break;
      case 31:
        oe(t, e), a & 4 && ld(t, e);
        break;
      case 13:
        oe(t, e), a & 4 && ed(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Hh.bind(
          null,
          e
        ), l0(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || fe, !a) {
          l = l !== null && l.memoizedState !== null || $t, u = fe;
          var n = $t;
          fe = a, ($t = l) && !n ? re(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : oe(t, e), fe = u, $t = n;
        }
        break;
      case 30:
        break;
      default:
        oe(t, e);
    }
  }
  function Pr(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Pr(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Bi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ct = null, vl = !1;
  function se(t, l, e) {
    for (e = e.child; e !== null; )
      td(t, l, e), e = e.sibling;
  }
  function td(t, l, e) {
    if (_l && typeof _l.onCommitFiberUnmount == "function")
      try {
        _l.onCommitFiberUnmount(Fl, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        $t || wl(e, l), se(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        $t || wl(e, l);
        var a = Ct, u = vl;
        Xe(e.type) && (Ct = e.stateNode, vl = !1), se(
          t,
          l,
          e
        ), wu(e.stateNode), Ct = a, vl = u;
        break;
      case 5:
        $t || wl(e, l);
      case 6:
        if (a = Ct, u = vl, Ct = null, se(
          t,
          l,
          e
        ), Ct = a, vl = u, Ct !== null)
          if (vl)
            try {
              (Ct.nodeType === 9 ? Ct.body : Ct.nodeName === "HTML" ? Ct.ownerDocument.body : Ct).removeChild(e.stateNode);
            } catch (n) {
              bt(
                e,
                l,
                n
              );
            }
          else
            try {
              Ct.removeChild(e.stateNode);
            } catch (n) {
              bt(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        Ct !== null && (vl ? (t = Ct, Jd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), lu(t)) : Jd(Ct, e.stateNode));
        break;
      case 4:
        a = Ct, u = vl, Ct = e.stateNode.containerInfo, vl = !0, se(
          t,
          l,
          e
        ), Ct = a, vl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(2, e, l), $t || Ue(4, e, l), se(
          t,
          l,
          e
        );
        break;
      case 1:
        $t || (wl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && wr(
          e,
          l,
          a
        )), se(
          t,
          l,
          e
        );
        break;
      case 21:
        se(
          t,
          l,
          e
        );
        break;
      case 22:
        $t = (a = $t) || e.memoizedState !== null, se(
          t,
          l,
          e
        ), $t = a;
        break;
      default:
        se(
          t,
          l,
          e
        );
    }
  }
  function ld(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        lu(t);
      } catch (e) {
        bt(l, l.return, e);
      }
    }
  }
  function ed(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        lu(t);
      } catch (e) {
        bt(l, l.return, e);
      }
  }
  function Oh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new kr()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new kr()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function In(t, l) {
    var e = Oh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = qh.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function hl(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = t, i = l, f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Xe(f.type)) {
                Ct = f.stateNode, vl = !1;
                break t;
              }
              break;
            case 5:
              Ct = f.stateNode, vl = !1;
              break t;
            case 3:
            case 4:
              Ct = f.stateNode.containerInfo, vl = !0;
              break t;
          }
          f = f.return;
        }
        if (Ct === null) throw Error(s(160));
        td(n, i, u), Ct = null, vl = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        ad(l, t), l = l.sibling;
  }
  var Ll = null;
  function ad(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        hl(l, t), yl(t), a & 4 && (Ue(3, t, t.return), Bu(3, t), Ue(5, t, t.return));
        break;
      case 1:
        hl(l, t), yl(t), a & 512 && ($t || e === null || wl(e, e.return)), a & 64 && fe && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Ll;
        if (hl(l, t), yl(t), a & 512 && ($t || e === null || wl(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, u = u.ownerDocument || u;
                  l: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[ru] || n[Pt] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), al(n, a, e), n[Pt] = t, kt(n), a = n;
                      break t;
                    case "link":
                      var i = am(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (n = i[f], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), al(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = am(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (f = 0; f < i.length; f++)
                          if (n = i[f], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(f, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), al(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  n[Pt] = t, kt(n), a = n;
                }
                t.stateNode = a;
              } else
                um(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = em(
                u,
                a,
                t.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? um(
              u,
              t.type,
              t.stateNode
            ) : em(
              u,
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
        hl(l, t), yl(t), a & 512 && ($t || e === null || wl(e, e.return)), e !== null && a & 4 && uf(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (hl(l, t), yl(t), a & 512 && ($t || e === null || wl(e, e.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            za(u, "");
          } catch (G) {
            bt(t, t.return, G);
          }
        }
        a & 4 && t.stateNode != null && (u = t.memoizedProps, uf(
          t,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (ff = !0);
        break;
      case 6:
        if (hl(l, t), yl(t), a & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (G) {
            bt(t, t.return, G);
          }
        }
        break;
      case 3:
        if (vi = null, u = Ll, Ll = di(l.containerInfo), hl(l, t), Ll = u, yl(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            lu(l.containerInfo);
          } catch (G) {
            bt(t, t.return, G);
          }
        ff && (ff = !1, ud(t));
        break;
      case 4:
        a = Ll, Ll = di(
          t.stateNode.containerInfo
        ), hl(l, t), yl(t), Ll = a;
        break;
      case 12:
        hl(l, t), yl(t);
        break;
      case 31:
        hl(l, t), yl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, In(t, a)));
        break;
      case 13:
        hl(l, t), yl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ti = xt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, In(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, S = fe, T = $t;
        if (fe = S || u, $t = T || o, hl(l, t), $t = T, fe = S, yl(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = u ? l._visibility & -2 : l._visibility | 1, u && (e === null || o || fe || $t || va(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (n = o.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = o.stateNode;
                    var O = o.memoizedProps.style, b = O != null && O.hasOwnProperty("display") ? O.display : null;
                    f.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (G) {
                  bt(o, o.return, G);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = u ? "" : o.memoizedProps;
                } catch (G) {
                  bt(o, o.return, G);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var p = o.stateNode;
                  u ? wd(p, !0) : wd(o.stateNode, !1);
                } catch (G) {
                  bt(o, o.return, G);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, In(t, e))));
        break;
      case 19:
        hl(l, t), yl(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, In(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        hl(l, t), yl(t);
    }
  }
  function yl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Wr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = nf(t);
            kn(t, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (za(i, ""), e.flags &= -33);
            var f = nf(t);
            kn(t, f, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, S = nf(t);
            cf(
              t,
              S,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (T) {
        bt(t, t.return, T);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function ud(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        ud(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function oe(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Ir(t, l.alternate, l), l = l.sibling;
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
          typeof e.componentWillUnmount == "function" && wr(
            l,
            l.return,
            e
          ), va(l);
          break;
        case 27:
          wu(l.stateNode);
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
  function re(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, i = n.flags;
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
            } catch (S) {
              bt(a, a.return, S);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var f = a.stateNode;
            try {
              var o = u.shared.hiddenCallbacks;
              if (o !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < o.length; u++)
                  Ho(o[u], f);
            } catch (S) {
              bt(a, a.return, S);
            }
          }
          e && i & 64 && Jr(n), Yu(n, n.return);
          break;
        case 27:
          Fr(n);
        case 26:
        case 5:
          re(
            u,
            n,
            e
          ), e && a === null && i & 4 && $r(n), Yu(n, n.return);
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
          ), e && i & 4 && ed(u, n);
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
      l = l.sibling;
    }
  }
  function sf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && zu(e));
  }
  function of(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && zu(t));
  }
  function Zl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        nd(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function nd(t, l, e, a) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Zl(
          t,
          l,
          e,
          a
        ), u & 2048 && Bu(9, l);
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
        ), u & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && zu(t)));
        break;
      case 12:
        if (u & 2048) {
          Zl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var n = l.memoizedProps, i = n.id, f = n.onPostCommit;
            typeof f == "function" && f(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (o) {
            bt(l, l.return, o);
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
        n = l.stateNode, i = l.alternate, l.memoizedState !== null ? n._visibility & 2 ? Zl(
          t,
          l,
          e,
          a
        ) : Gu(t, l) : n._visibility & 2 ? Zl(
          t,
          l,
          e,
          a
        ) : (n._visibility |= 2, Za(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && sf(i, l);
        break;
      case 24:
        Zl(
          t,
          l,
          e,
          a
        ), u & 2048 && of(l.alternate, l);
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
  function Za(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, f = e, o = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Za(
            n,
            i,
            f,
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
            f,
            o,
            u
          ) : Gu(
            n,
            i
          ) : (T._visibility |= 2, Za(
            n,
            i,
            f,
            o,
            u
          )), u && S & 2048 && sf(
            i.alternate,
            i
          );
          break;
        case 24:
          Za(
            n,
            i,
            f,
            o,
            u
          ), u && S & 2048 && of(i.alternate, i);
          break;
        default:
          Za(
            n,
            i,
            f,
            o,
            u
          );
      }
      l = l.sibling;
    }
  }
  function Gu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            Gu(e, a), u & 2048 && sf(
              a.alternate,
              a
            );
            break;
          case 24:
            Gu(e, a), u & 2048 && of(a.alternate, a);
            break;
          default:
            Gu(e, a);
        }
        l = l.sibling;
      }
  }
  var Xu = 8192;
  function Ka(t, l, e) {
    if (t.subtreeFlags & Xu)
      for (t = t.child; t !== null; )
        id(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function id(t, l, e) {
    switch (t.tag) {
      case 26:
        Ka(
          t,
          l,
          e
        ), t.flags & Xu && t.memoizedState !== null && m0(
          e,
          Ll,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ka(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Ll;
        Ll = di(t.stateNode.containerInfo), Ka(
          t,
          l,
          e
        ), Ll = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Xu, Xu = 16777216, Ka(
          t,
          l,
          e
        ), Xu = a) : Ka(
          t,
          l,
          e
        ));
        break;
      default:
        Ka(
          t,
          l,
          e
        );
    }
  }
  function cd(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Qu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          It = a, sd(
            a,
            t
          );
        }
      cd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        fd(t), t = t.sibling;
  }
  function fd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Qu(t), t.flags & 2048 && Ue(9, t, t.return);
        break;
      case 3:
        Qu(t);
        break;
      case 12:
        Qu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Pn(t)) : Qu(t);
        break;
      default:
        Qu(t);
    }
  }
  function Pn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          It = a, sd(
            a,
            t
          );
        }
      cd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ue(8, l, l.return), Pn(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Pn(l));
          break;
        default:
          Pn(l);
      }
      t = t.sibling;
    }
  }
  function sd(t, l) {
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
          zu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, It = a;
      else
        t: for (e = t; It !== null; ) {
          a = It;
          var u = a.sibling, n = a.return;
          if (Pr(a), a === e) {
            It = null;
            break t;
          }
          if (u !== null) {
            u.return = n, It = u;
            break t;
          }
          It = n;
        }
    }
  }
  var Dh = {
    getCacheForType: function(t) {
      var l = ll(Kt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return ll(Kt).controller.signal;
    }
  }, Mh = typeof WeakMap == "function" ? WeakMap : Map, yt = 0, At = null, at = null, nt = 0, St = 0, Ol = null, Ce = !1, Ja = !1, rf = !1, de = 0, Yt = 0, He = 0, ha = 0, df = 0, Dl = 0, wa = 0, Vu = null, gl = null, mf = !1, ti = 0, od = 0, li = 1 / 0, ei = null, qe = null, Wt = 0, Be = null, $a = null, me = 0, vf = 0, hf = null, rd = null, Lu = 0, yf = null;
  function Ml() {
    return (yt & 2) !== 0 && nt !== 0 ? nt & -nt : E.T !== null ? Ef() : Ns();
  }
  function dd() {
    if (Dl === 0)
      if ((nt & 536870912) === 0 || ot) {
        var t = on;
        on <<= 1, (on & 3932160) === 0 && (on = 262144), Dl = t;
      } else Dl = 536870912;
    return t = Al.current, t !== null && (t.flags |= 32), Dl;
  }
  function Sl(t, l, e) {
    (t === At && (St === 2 || St === 9) || t.cancelPendingCommit !== null) && (Wa(t, 0), Ye(
      t,
      nt,
      Dl,
      !1
    )), ou(t, e), ((yt & 2) === 0 || t !== At) && (t === At && ((yt & 2) === 0 && (ha |= e), Yt === 4 && Ye(
      t,
      nt,
      Dl,
      !1
    )), $l(t));
  }
  function md(t, l, e) {
    if ((yt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || su(t, l), u = a ? Rh(t, l) : Sf(t, l, !0), n = a;
    do {
      if (u === 0) {
        Ja && !a && Ye(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !xh(e)) {
          u = Sf(t, l, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = l, t.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var f = t;
              u = Vu;
              var o = f.current.memoizedState.isDehydrated;
              if (o && (Wa(f, i).flags |= 256), i = Sf(
                f,
                i,
                !1
              ), i !== 2) {
                if (rf && !o) {
                  f.errorRecoveryDisabledLanes |= n, ha |= n, u = 4;
                  break t;
                }
                n = gl, gl = u, n !== null && (gl === null ? gl = n : gl.push.apply(
                  gl,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wa(t, 0), Ye(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
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
              gl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (u = ti + 300 - xt(), 10 < u)) {
            if (Ye(
              a,
              l,
              Dl,
              !Ce
            ), dn(a, 0, !0) !== 0) break t;
            me = l, a.timeoutHandle = Zd(
              vd.bind(
                null,
                a,
                e,
                gl,
                ei,
                mf,
                l,
                Dl,
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
            break t;
          }
          vd(
            a,
            e,
            gl,
            ei,
            mf,
            l,
            Dl,
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
    $l(t);
  }
  function vd(t, l, e, a, u, n, i, f, o, S, T, O, b, p) {
    if (t.timeoutHandle = -1, O = l.subtreeFlags, O & 8192 || (O & 16785408) === 16785408) {
      O = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Il
      }, id(
        l,
        n,
        O
      );
      var G = (n & 62914560) === n ? ti - xt() : (n & 4194048) === n ? od - xt() : 0;
      if (G = v0(
        O,
        G
      ), G !== null) {
        me = n, t.cancelPendingCommit = G(
          Ed.bind(
            null,
            t,
            l,
            n,
            e,
            a,
            u,
            i,
            f,
            o,
            T,
            O,
            null,
            b,
            p
          )
        ), Ye(t, n, i, !S);
        return;
      }
    }
    Ed(
      t,
      l,
      n,
      e,
      a,
      u,
      i,
      f,
      o
    );
  }
  function xh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Tl(n(), u)) return !1;
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
    l &= ~df, l &= ~ha, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - El(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Ts(t, e, l);
  }
  function ai() {
    return (yt & 6) === 0 ? (Zu(0), !1) : !0;
  }
  function gf() {
    if (at !== null) {
      if (St === 0)
        var t = at.return;
      else
        t = at, ee = ia = null, Rc(t), Ga = null, Nu = 0, t = at;
      for (; t !== null; )
        Kr(t.alternate, t), t = t.return;
      at = null;
    }
  }
  function Wa(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Fh(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), me = 0, gf(), At = t, at = e = te(t.current, null), nt = l, St = 0, Ol = null, Ce = !1, Ja = su(t, l), rf = !1, wa = Dl = df = ha = He = Yt = 0, gl = Vu = null, mf = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var u = 31 - El(a), n = 1 << u;
        l |= t[u], a &= ~n;
      }
    return de = l, zn(), e;
  }
  function hd(t, l) {
    tt = null, E.H = Cu, l === Ya || l === Rn ? (l = jo(), St = 3) : l === pc ? (l = jo(), St = 4) : St = l === $c ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Ol = l, at === null && (Yt = 1, Jn(
      t,
      Hl(l, t.current)
    ));
  }
  function yd() {
    var t = Al.current;
    return t === null ? !0 : (nt & 4194048) === nt ? Gl === null : (nt & 62914560) === nt || (nt & 536870912) !== 0 ? t === Gl : !1;
  }
  function gd() {
    var t = E.H;
    return E.H = Cu, t === null ? Cu : t;
  }
  function Sd() {
    var t = E.A;
    return E.A = Dh, t;
  }
  function ui() {
    Yt = 4, Ce || (nt & 4194048) !== nt && Al.current !== null || (Ja = !0), (He & 134217727) === 0 && (ha & 134217727) === 0 || At === null || Ye(
      At,
      nt,
      Dl,
      !1
    );
  }
  function Sf(t, l, e) {
    var a = yt;
    yt |= 2;
    var u = gd(), n = Sd();
    (At !== t || nt !== l) && (ei = null, Wa(t, l)), l = !1;
    var i = Yt;
    t: do
      try {
        if (St !== 0 && at !== null) {
          var f = at, o = Ol;
          switch (St) {
            case 8:
              gf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Al.current === null && (l = !0);
              var S = St;
              if (St = 0, Ol = null, Fa(t, f, o, S), e && Ja) {
                i = 0;
                break t;
              }
              break;
            default:
              S = St, St = 0, Ol = null, Fa(t, f, o, S);
          }
        }
        jh(), i = Yt;
        break;
      } catch (T) {
        hd(t, T);
      }
    while (!0);
    return l && t.shellSuspendCounter++, ee = ia = null, yt = a, E.H = u, E.A = n, at === null && (At = null, nt = 0, zn()), i;
  }
  function jh() {
    for (; at !== null; ) bd(at);
  }
  function Rh(t, l) {
    var e = yt;
    yt |= 2;
    var a = gd(), u = Sd();
    At !== t || nt !== l ? (ei = null, li = xt() + 500, Wa(t, l)) : Ja = su(
      t,
      l
    );
    t: do
      try {
        if (St !== 0 && at !== null) {
          l = at;
          var n = Ol;
          l: switch (St) {
            case 1:
              St = 0, Ol = null, Fa(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (Mo(n)) {
                St = 0, Ol = null, pd(l);
                break;
              }
              l = function() {
                St !== 2 && St !== 9 || At !== t || (St = 7), $l(t);
              }, n.then(l, l);
              break t;
            case 3:
              St = 7;
              break t;
            case 4:
              St = 5;
              break t;
            case 7:
              Mo(n) ? (St = 0, Ol = null, pd(l)) : (St = 0, Ol = null, Fa(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (at.tag) {
                case 26:
                  i = at.memoizedState;
                case 5:
                case 27:
                  var f = at;
                  if (i ? nm(i) : f.stateNode.complete) {
                    St = 0, Ol = null;
                    var o = f.sibling;
                    if (o !== null) at = o;
                    else {
                      var S = f.return;
                      S !== null ? (at = S, ni(S)) : at = null;
                    }
                    break l;
                  }
              }
              St = 0, Ol = null, Fa(t, l, n, 5);
              break;
            case 6:
              St = 0, Ol = null, Fa(t, l, n, 6);
              break;
            case 8:
              gf(), Yt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Uh();
        break;
      } catch (T) {
        hd(t, T);
      }
    while (!0);
    return ee = ia = null, E.H = a, E.A = u, yt = e, at !== null ? 0 : (At = null, nt = 0, zn(), Yt);
  }
  function Uh() {
    for (; at !== null && !ol(); )
      bd(at);
  }
  function bd(t) {
    var l = Lr(t.alternate, t, de);
    t.memoizedProps = t.pendingProps, l === null ? ni(t) : at = l;
  }
  function pd(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Br(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          nt
        );
        break;
      case 11:
        l = Br(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          nt
        );
        break;
      case 5:
        Rc(l);
      default:
        Kr(e, l), l = at = So(l, de), l = Lr(e, l, de);
    }
    t.memoizedProps = t.pendingProps, l === null ? ni(t) : at = l;
  }
  function Fa(t, l, e, a) {
    ee = ia = null, Rc(l), Ga = null, Nu = 0;
    var u = l.return;
    try {
      if (_h(
        t,
        u,
        l,
        e,
        nt
      )) {
        Yt = 1, Jn(
          t,
          Hl(e, t.current)
        ), at = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw at = u, n;
      Yt = 1, Jn(
        t,
        Hl(e, t.current)
      ), at = null;
      return;
    }
    l.flags & 32768 ? (ot || a === 1 ? t = !0 : Ja || (nt & 536870912) !== 0 ? t = !1 : (Ce = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Al.current, a !== null && a.tag === 13 && (a.flags |= 16384))), _d(l, t)) : ni(l);
  }
  function ni(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        _d(
          l,
          Ce
        );
        return;
      }
      t = l.return;
      var e = zh(
        l.alternate,
        l,
        de
      );
      if (e !== null) {
        at = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        at = l;
        return;
      }
      at = l = t;
    } while (l !== null);
    Yt === 0 && (Yt = 5);
  }
  function _d(t, l) {
    do {
      var e = Ah(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, at = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        at = t;
        return;
      }
      at = t = e;
    } while (t !== null);
    Yt = 6, at = null;
  }
  function Ed(t, l, e, a, u, n, i, f, o) {
    t.cancelPendingCommit = null;
    do
      ii();
    while (Wt !== 0);
    if ((yt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (n = l.lanes | l.childLanes, n |= nc, dv(
        t,
        e,
        n,
        i,
        f,
        o
      ), t === At && (at = At = null, nt = 0), $a = l, Be = t, me = e, vf = n, hf = u, rd = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Bh(ke, function() {
        return Od(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = E.T, E.T = null, u = q.p, q.p = 2, i = yt, yt |= 4;
        try {
          Nh(t, l, e);
        } finally {
          yt = i, q.p = u, E.T = a;
        }
      }
      Wt = 1, Td(), zd(), Ad();
    }
  }
  function Td() {
    if (Wt === 1) {
      Wt = 0;
      var t = Be, l = $a, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var u = yt;
        yt |= 4;
        try {
          ad(l, t);
          var n = xf, i = fo(t.containerInfo), f = n.focusedElem, o = n.selectionRange;
          if (i !== f && f && f.ownerDocument && co(
            f.ownerDocument.documentElement,
            f
          )) {
            if (o !== null && tc(f)) {
              var S = o.start, T = o.end;
              if (T === void 0 && (T = S), "selectionStart" in f)
                f.selectionStart = S, f.selectionEnd = Math.min(
                  T,
                  f.value.length
                );
              else {
                var O = f.ownerDocument || document, b = O && O.defaultView || window;
                if (b.getSelection) {
                  var p = b.getSelection(), G = f.textContent.length, K = Math.min(o.start, G), zt = o.end === void 0 ? K : Math.min(o.end, G);
                  !p.extend && K > zt && (i = zt, zt = K, K = i);
                  var v = io(
                    f,
                    K
                  ), r = io(
                    f,
                    zt
                  );
                  if (v && r && (p.rangeCount !== 1 || p.anchorNode !== v.node || p.anchorOffset !== v.offset || p.focusNode !== r.node || p.focusOffset !== r.offset)) {
                    var y = O.createRange();
                    y.setStart(v.node, v.offset), p.removeAllRanges(), K > zt ? (p.addRange(y), p.extend(r.node, r.offset)) : (y.setEnd(r.node, r.offset), p.addRange(y));
                  }
                }
              }
            }
            for (O = [], p = f; p = p.parentNode; )
              p.nodeType === 1 && O.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < O.length; f++) {
              var z = O[f];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          Si = !!Mf, xf = Mf = null;
        } finally {
          yt = u, q.p = a, E.T = e;
        }
      }
      t.current = l, Wt = 2;
    }
  }
  function zd() {
    if (Wt === 2) {
      Wt = 0;
      var t = Be, l = $a, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = E.T, E.T = null;
        var a = q.p;
        q.p = 2;
        var u = yt;
        yt |= 4;
        try {
          Ir(t, l.alternate, l);
        } finally {
          yt = u, q.p = a, E.T = e;
        }
      }
      Wt = 3;
    }
  }
  function Ad() {
    if (Wt === 4 || Wt === 3) {
      Wt = 0, Qt();
      var t = Be, l = $a, e = me, a = rd;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Wt = 5 : (Wt = 0, $a = Be = null, Nd(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (qe = null), Hi(e), l = l.stateNode, _l && typeof _l.onCommitFiberRoot == "function")
        try {
          _l.onCommitFiberRoot(
            Fl,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = E.T, u = q.p, q.p = 2, E.T = null;
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            n(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          E.T = l, q.p = u;
        }
      }
      (me & 3) !== 0 && ii(), $l(t), u = t.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? t === yf ? Lu++ : (Lu = 0, yf = t) : Lu = 0, Zu(0);
    }
  }
  function Nd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, zu(l)));
  }
  function ii() {
    return Td(), zd(), Ad(), Od();
  }
  function Od() {
    if (Wt !== 5) return !1;
    var t = Be, l = vf;
    vf = 0;
    var e = Hi(me), a = E.T, u = q.p;
    try {
      q.p = 32 > e ? 32 : e, E.T = null, e = hf, hf = null;
      var n = Be, i = me;
      if (Wt = 0, $a = Be = null, me = 0, (yt & 6) !== 0) throw Error(s(331));
      var f = yt;
      if (yt |= 4, fd(n.current), nd(
        n,
        n.current,
        i,
        e
      ), yt = f, Zu(0, !1), _l && typeof _l.onPostCommitFiberRoot == "function")
        try {
          _l.onPostCommitFiberRoot(Fl, n);
        } catch {
        }
      return !0;
    } finally {
      q.p = u, E.T = a, Nd(t, l);
    }
  }
  function Dd(t, l, e) {
    l = Hl(e, l), l = wc(t.stateNode, l, 2), t = xe(t, l, 2), t !== null && (ou(t, 2), $l(t));
  }
  function bt(t, l, e) {
    if (t.tag === 3)
      Dd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Dd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (qe === null || !qe.has(a))) {
            t = Hl(e, t), e = Mr(2), a = xe(l, e, 2), a !== null && (xr(
              e,
              a,
              l,
              t
            ), ou(a, 2), $l(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function bf(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Mh();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (rf = !0, u.add(e), t = Ch.bind(null, t, l, e), l.then(t, t));
  }
  function Ch(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, At === t && (nt & e) === e && (Yt === 4 || Yt === 3 && (nt & 62914560) === nt && 300 > xt() - ti ? (yt & 2) === 0 && Wa(t, 0) : df |= e, wa === nt && (wa = 0)), $l(t);
  }
  function Md(t, l) {
    l === 0 && (l = Es()), t = aa(t, l), t !== null && (ou(t, l), $l(t));
  }
  function Hh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Md(t, e);
  }
  function qh(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (e = u.retryLane);
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
    a !== null && a.delete(l), Md(t, e);
  }
  function Bh(t, l) {
    return Mt(t, l);
  }
  var ci = null, ka = null, pf = !1, fi = !1, _f = !1, Ge = 0;
  function $l(t) {
    t !== ka && t.next === null && (ka === null ? ci = ka = t : ka = ka.next = t), fi = !0, pf || (pf = !0, Gh());
  }
  function Zu(t, l) {
    if (!_f && fi) {
      _f = !0;
      do
        for (var e = !1, a = ci; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              n = (1 << 31 - El(42 | t) + 1) - 1, n &= u & ~(i & ~f), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Ud(a, n));
          } else
            n = nt, n = dn(
              a,
              a === At ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || su(a, n) || (e = !0, Ud(a, n));
          a = a.next;
        }
      while (e);
      _f = !1;
    }
  }
  function Yh() {
    xd();
  }
  function xd() {
    fi = pf = !1;
    var t = 0;
    Ge !== 0 && Wh() && (t = Ge);
    for (var l = xt(), e = null, a = ci; a !== null; ) {
      var u = a.next, n = jd(a, l);
      n === 0 ? (a.next = null, e === null ? ci = u : e.next = u, u === null && (ka = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (fi = !0)), a = u;
    }
    Wt !== 0 && Wt !== 5 || Zu(t), Ge !== 0 && (Ge = 0);
  }
  function jd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - El(n), f = 1 << i, o = u[i];
      o === -1 ? ((f & e) === 0 || (f & a) !== 0) && (u[i] = rv(f, l)) : o <= l && (t.expiredLanes |= f), n &= ~f;
    }
    if (l = At, e = nt, e = dn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (St === 2 || St === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && sl(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || su(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && sl(a), Hi(e)) {
        case 2:
        case 8:
          e = cu;
          break;
        case 32:
          e = ke;
          break;
        case 268435456:
          e = jl;
          break;
        default:
          e = ke;
      }
      return a = Rd.bind(null, t), e = Mt(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && sl(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Rd(t, l) {
    if (Wt !== 0 && Wt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (ii() && t.callbackNode !== e)
      return null;
    var a = nt;
    return a = dn(
      t,
      t === At ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (md(t, a, l), jd(t, xt()), t.callbackNode != null && t.callbackNode === e ? Rd.bind(null, t) : null);
  }
  function Ud(t, l) {
    if (ii()) return null;
    md(t, l, !0);
  }
  function Gh() {
    kh(function() {
      (yt & 6) !== 0 ? Mt(
        pe,
        Yh
      ) : xd();
    });
  }
  function Ef() {
    if (Ge === 0) {
      var t = qa;
      t === 0 && (t = sn, sn <<= 1, (sn & 261888) === 0 && (sn = 256)), Ge = t;
    }
    return Ge;
  }
  function Cd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : yn("" + t);
  }
  function Hd(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Xh(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = Cd(
        (u[dl] || null).action
      ), i = a.submitter;
      i && (l = (l = i[dl] || null) ? Cd(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var f = new pn(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Ge !== 0) {
                  var o = i ? Hd(u, i) : new FormData(u);
                  Qc(
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
                typeof n == "function" && (f.preventDefault(), o = i ? Hd(u, i) : new FormData(u), Qc(
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
  for (var Tf = 0; Tf < uc.length; Tf++) {
    var zf = uc[Tf], Qh = zf.toLowerCase(), Vh = zf[0].toUpperCase() + zf.slice(1);
    Vl(
      Qh,
      "on" + Vh
    );
  }
  Vl(ro, "onAnimationEnd"), Vl(mo, "onAnimationIteration"), Vl(vo, "onAnimationStart"), Vl("dblclick", "onDoubleClick"), Vl("focusin", "onFocus"), Vl("focusout", "onBlur"), Vl(uh, "onTransitionRun"), Vl(nh, "onTransitionStart"), Vl(ih, "onTransitionCancel"), Vl(ho, "onTransitionEnd"), Ea("onMouseEnter", ["mouseout", "mouseover"]), Ea("onMouseLeave", ["mouseout", "mouseover"]), Ea("onPointerEnter", ["pointerout", "pointerover"]), Ea("onPointerLeave", ["pointerout", "pointerover"]), Pe(
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
  function qd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], o = f.instance, S = f.currentTarget;
            if (f = f.listener, o !== n && u.isPropagationStopped())
              break t;
            n = f, u.currentTarget = S;
            try {
              n(u);
            } catch (T) {
              Tn(T);
            }
            u.currentTarget = null, n = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], o = f.instance, S = f.currentTarget, f = f.listener, o !== n && u.isPropagationStopped())
              break t;
            n = f, u.currentTarget = S;
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
  function ut(t, l) {
    var e = l[qi];
    e === void 0 && (e = l[qi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Bd(l, t, 2, !1), e.add(a));
  }
  function Af(t, l, e) {
    var a = 0;
    l && (a |= 4), Bd(
      e,
      t,
      a,
      l
    );
  }
  var si = "_reactListening" + Math.random().toString(36).slice(2);
  function Nf(t) {
    if (!t[si]) {
      t[si] = !0, Ms.forEach(function(e) {
        e !== "selectionchange" && (Lh.has(e) || Af(e, !1, t), Af(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[si] || (l[si] = !0, Af("selectionchange", !1, l));
    }
  }
  function Bd(t, l, e, a) {
    switch (dm(l)) {
      case 2:
        var u = g0;
        break;
      case 8:
        u = S0;
        break;
      default:
        u = Qf;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !Ki || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function Of(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = ba(f), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = n = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Qs(function() {
      var S = n, T = Li(e), O = [];
      t: {
        var b = yo.get(t);
        if (b !== void 0) {
          var p = pn, G = t;
          switch (t) {
            case "keypress":
              if (Sn(e) === 0) break t;
            case "keydown":
            case "keyup":
              p = qv;
              break;
            case "focusin":
              G = "focus", p = Wi;
              break;
            case "focusout":
              G = "blur", p = Wi;
              break;
            case "beforeblur":
            case "afterblur":
              p = Wi;
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
              p = Zs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = zv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = Gv;
              break;
            case ro:
            case mo:
            case vo:
              p = Ov;
              break;
            case ho:
              p = Qv;
              break;
            case "scroll":
            case "scrollend":
              p = Ev;
              break;
            case "wheel":
              p = Lv;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = Mv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = Js;
              break;
            case "toggle":
            case "beforetoggle":
              p = Kv;
          }
          var K = (l & 4) !== 0, zt = !K && (t === "scroll" || t === "scrollend"), v = K ? b !== null ? b + "Capture" : null : b;
          K = [];
          for (var r = S, y; r !== null; ) {
            var z = r;
            if (y = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || y === null || v === null || (z = mu(r, v), z != null && K.push(
              Ju(r, z, y)
            )), zt) break;
            r = r.return;
          }
          0 < K.length && (b = new p(
            b,
            G,
            null,
            e,
            T
          ), O.push({ event: b, listeners: K }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (b = t === "mouseover" || t === "pointerover", p = t === "mouseout" || t === "pointerout", b && e !== Vi && (G = e.relatedTarget || e.fromElement) && (ba(G) || G[Sa]))
            break t;
          if ((p || b) && (b = T.window === T ? T : (b = T.ownerDocument) ? b.defaultView || b.parentWindow : window, p ? (G = e.relatedTarget || e.toElement, p = S, G = G ? ba(G) : null, G !== null && (zt = R(G), K = G.tag, G !== zt || K !== 5 && K !== 27 && K !== 6) && (G = null)) : (p = null, G = S), p !== G)) {
            if (K = Zs, z = "onMouseLeave", v = "onMouseEnter", r = "mouse", (t === "pointerout" || t === "pointerover") && (K = Js, z = "onPointerLeave", v = "onPointerEnter", r = "pointer"), zt = p == null ? b : du(p), y = G == null ? b : du(G), b = new K(
              z,
              r + "leave",
              p,
              e,
              T
            ), b.target = zt, b.relatedTarget = y, z = null, ba(T) === S && (K = new K(
              v,
              r + "enter",
              G,
              e,
              T
            ), K.target = y, K.relatedTarget = zt, z = K), zt = z, p && G)
              l: {
                for (K = Zh, v = p, r = G, y = 0, z = v; z; z = K(z))
                  y++;
                z = 0;
                for (var V = r; V; V = K(V))
                  z++;
                for (; 0 < y - z; )
                  v = K(v), y--;
                for (; 0 < z - y; )
                  r = K(r), z--;
                for (; y--; ) {
                  if (v === r || r !== null && v === r.alternate) {
                    K = v;
                    break l;
                  }
                  v = K(v), r = K(r);
                }
                K = null;
              }
            else K = null;
            p !== null && Yd(
              O,
              b,
              p,
              K,
              !1
            ), G !== null && zt !== null && Yd(
              O,
              zt,
              G,
              K,
              !0
            );
          }
        }
        t: {
          if (b = S ? du(S) : window, p = b.nodeName && b.nodeName.toLowerCase(), p === "select" || p === "input" && b.type === "file")
            var mt = to;
          else if (Is(b))
            if (lo)
              mt = lh;
            else {
              mt = Pv;
              var X = Iv;
            }
          else
            p = b.nodeName, !p || p.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? S && Qi(S.elementType) && (mt = to) : mt = th;
          if (mt && (mt = mt(t, S))) {
            Ps(
              O,
              mt,
              e,
              T
            );
            break t;
          }
          X && X(t, b, S), t === "focusout" && S && b.type === "number" && S.memoizedProps.value != null && Xi(b, "number", b.value);
        }
        switch (X = S ? du(S) : window, t) {
          case "focusin":
            (Is(X) || X.contentEditable === "true") && (Da = X, lc = S, _u = null);
            break;
          case "focusout":
            _u = lc = Da = null;
            break;
          case "mousedown":
            ec = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ec = !1, so(O, e, T);
            break;
          case "selectionchange":
            if (ah) break;
          case "keydown":
          case "keyup":
            so(O, e, T);
        }
        var lt;
        if (ki)
          t: {
            switch (t) {
              case "compositionstart":
                var it = "onCompositionStart";
                break t;
              case "compositionend":
                it = "onCompositionEnd";
                break t;
              case "compositionupdate":
                it = "onCompositionUpdate";
                break t;
            }
            it = void 0;
          }
        else
          Oa ? Fs(t, e) && (it = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (it = "onCompositionStart");
        it && (ws && e.locale !== "ko" && (Oa || it !== "onCompositionStart" ? it === "onCompositionEnd" && Oa && (lt = Vs()) : (Te = T, Ji = "value" in Te ? Te.value : Te.textContent, Oa = !0)), X = oi(S, it), 0 < X.length && (it = new Ks(
          it,
          t,
          null,
          e,
          T
        ), O.push({ event: it, listeners: X }), lt ? it.data = lt : (lt = ks(e), lt !== null && (it.data = lt)))), (lt = wv ? $v(t, e) : Wv(t, e)) && (it = oi(S, "onBeforeInput"), 0 < it.length && (X = new Ks(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), O.push({
          event: X,
          listeners: it
        }), X.data = lt)), Xh(
          O,
          t,
          S,
          e,
          T
        );
      }
      qd(O, l);
    });
  }
  function Ju(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function oi(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = mu(t, e), u != null && a.unshift(
        Ju(t, u, n)
      ), u = mu(t, l), u != null && a.push(
        Ju(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Zh(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Yd(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var f = e, o = f.alternate, S = f.stateNode;
      if (f = f.tag, o !== null && o === a) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (o = S, u ? (S = mu(e, n), S != null && i.unshift(
        Ju(e, S, o)
      )) : u || (S = mu(e, n), S != null && i.push(
        Ju(e, S, o)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Kh = /\r\n?/g, Jh = /\u0000|\uFFFD/g;
  function Gd(t) {
    return (typeof t == "string" ? t : "" + t).replace(Kh, `
`).replace(Jh, "");
  }
  function Xd(t, l) {
    return l = Gd(l), Gd(t) === l;
  }
  function Tt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || za(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && za(t, "" + a);
        break;
      case "className":
        vn(t, "class", a);
        break;
      case "tabIndex":
        vn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vn(t, e, a);
        break;
      case "style":
        Gs(t, a, n);
        break;
      case "data":
        if (l !== "object") {
          vn(t, "data", a);
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
        a = yn("" + a), t.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (l !== "input" && Tt(t, l, "name", u.name, u, null), Tt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Tt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Tt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Tt(t, l, "encType", u.encType, u, null), Tt(t, l, "method", u.method, u, null), Tt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = yn("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Il);
        break;
      case "onScroll":
        a != null && ut("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ut("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
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
        e = yn("" + a), t.setAttributeNS(
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
        ut("beforetoggle", t), ut("toggle", t), mn(t, "popover", a);
        break;
      case "xlinkActuate":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        kl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        kl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        kl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        kl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        mn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = pv.get(e) || e, mn(t, e, a));
    }
  }
  function Df(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        Gs(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? za(t, a) : (typeof a == "number" || typeof a == "bigint") && za(t, "" + a);
        break;
      case "onScroll":
        a != null && ut("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ut("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Il);
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
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), l = e.slice(2, u ? e.length - 7 : void 0), n = t[dl] || null, n = n != null ? n[e] : null, typeof n == "function" && t.removeEventListener(l, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, u);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : mn(t, e, a);
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
        ut("error", t), ut("load", t);
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
                  throw Error(s(137, l));
                default:
                  Tt(t, l, n, i, e, null);
              }
          }
        u && Tt(t, l, "srcSet", e.srcSet, e, null), a && Tt(t, l, "src", e.src, e, null);
        return;
      case "input":
        ut("invalid", t);
        var f = n = i = u = null, o = null, S = null;
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
                  S = T;
                  break;
                case "value":
                  n = T;
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
                  Tt(t, l, a, T, e, null);
              }
          }
        Hs(
          t,
          n,
          f,
          o,
          S,
          i,
          u,
          !1
        );
        return;
      case "select":
        ut("invalid", t), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (f = e[u], f != null))
            switch (u) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                Tt(t, l, u, f, e, null);
            }
        l = n, e = i, t.multiple = !!a, l != null ? Ta(t, !!a, l, !1) : e != null && Ta(t, !!a, e, !0);
        return;
      case "textarea":
        ut("invalid", t), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (f = e[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                u = f;
                break;
              case "children":
                n = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(s(91));
                break;
              default:
                Tt(t, l, i, f, e, null);
            }
        Bs(t, a, u, n);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Tt(t, l, o, a, e, null);
            }
        return;
      case "dialog":
        ut("beforetoggle", t), ut("toggle", t), ut("cancel", t), ut("close", t);
        break;
      case "iframe":
      case "object":
        ut("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Ku.length; a++)
          ut(Ku[a], t);
        break;
      case "image":
        ut("error", t), ut("load", t);
        break;
      case "details":
        ut("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ut("error", t), ut("load", t);
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
                Tt(t, l, S, a, e, null);
            }
        return;
      default:
        if (Qi(l)) {
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
      e.hasOwnProperty(f) && (a = e[f], a != null && Tt(t, l, f, a, e, null));
  }
  function wh(t, l, e, a) {
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
        var u = null, n = null, i = null, f = null, o = null, S = null, T = null;
        for (p in e) {
          var O = e[p];
          if (e.hasOwnProperty(p) && O != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = O;
              default:
                a.hasOwnProperty(p) || Tt(t, l, p, null, a, O);
            }
        }
        for (var b in a) {
          var p = a[b];
          if (O = e[b], a.hasOwnProperty(b) && (p != null || O != null))
            switch (b) {
              case "type":
                n = p;
                break;
              case "name":
                u = p;
                break;
              case "checked":
                S = p;
                break;
              case "defaultChecked":
                T = p;
                break;
              case "value":
                i = p;
                break;
              case "defaultValue":
                f = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, l));
                break;
              default:
                p !== O && Tt(
                  t,
                  l,
                  b,
                  p,
                  a,
                  O
                );
            }
        }
        Gi(
          t,
          i,
          f,
          o,
          S,
          T,
          n,
          u
        );
        return;
      case "select":
        p = i = f = b = null;
        for (n in e)
          if (o = e[n], e.hasOwnProperty(n) && o != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                p = o;
              default:
                a.hasOwnProperty(n) || Tt(
                  t,
                  l,
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
                b = n;
                break;
              case "defaultValue":
                f = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== o && Tt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  o
                );
            }
        l = f, e = i, a = p, b != null ? Ta(t, !!e, b, !1) : !!a != !!e && (l != null ? Ta(t, !!e, l, !0) : Ta(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        p = b = null;
        for (f in e)
          if (u = e[f], e.hasOwnProperty(f) && u != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Tt(t, l, f, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                b = u;
                break;
              case "defaultValue":
                p = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && Tt(t, l, i, u, a, n);
            }
        qs(t, b, p);
        return;
      case "option":
        for (var G in e)
          if (b = e[G], e.hasOwnProperty(G) && b != null && !a.hasOwnProperty(G))
            switch (G) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Tt(
                  t,
                  l,
                  G,
                  null,
                  a,
                  b
                );
            }
        for (o in a)
          if (b = a[o], p = e[o], a.hasOwnProperty(o) && b !== p && (b != null || p != null))
            switch (o) {
              case "selected":
                t.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                Tt(
                  t,
                  l,
                  o,
                  b,
                  a,
                  p
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
        for (var K in e)
          b = e[K], e.hasOwnProperty(K) && b != null && !a.hasOwnProperty(K) && Tt(t, l, K, null, a, b);
        for (S in a)
          if (b = a[S], p = e[S], a.hasOwnProperty(S) && b !== p && (b != null || p != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(s(137, l));
                break;
              default:
                Tt(
                  t,
                  l,
                  S,
                  b,
                  a,
                  p
                );
            }
        return;
      default:
        if (Qi(l)) {
          for (var zt in e)
            b = e[zt], e.hasOwnProperty(zt) && b !== void 0 && !a.hasOwnProperty(zt) && Df(
              t,
              l,
              zt,
              void 0,
              a,
              b
            );
          for (T in a)
            b = a[T], p = e[T], !a.hasOwnProperty(T) || b === p || b === void 0 && p === void 0 || Df(
              t,
              l,
              T,
              b,
              a,
              p
            );
          return;
        }
    }
    for (var v in e)
      b = e[v], e.hasOwnProperty(v) && b != null && !a.hasOwnProperty(v) && Tt(t, l, v, null, a, b);
    for (O in a)
      b = a[O], p = e[O], !a.hasOwnProperty(O) || b === p || b == null && p == null || Tt(t, l, O, b, a, p);
  }
  function Qd(t) {
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
  function $h() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, f = u.duration;
        if (n && f && Qd(i)) {
          for (i = 0, f = u.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], S = o.startTime;
            if (S > f) break;
            var T = o.transferSize, O = o.initiatorType;
            T && Qd(O) && (o = o.responseEnd, i += T * (o < f ? 1 : (f - S) / (o - S)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Mf = null, xf = null;
  function ri(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Vd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ld(t, l) {
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
  function jf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Rf = null;
  function Wh() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Rf ? !1 : (Rf = t, !0) : (Rf = null, !1);
  }
  var Zd = typeof setTimeout == "function" ? setTimeout : void 0, Fh = typeof clearTimeout == "function" ? clearTimeout : void 0, Kd = typeof Promise == "function" ? Promise : void 0, kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kd < "u" ? function(t) {
    return Kd.resolve(null).then(t).catch(Ih);
  } : Zd;
  function Ih(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Xe(t) {
    return t === "head";
  }
  function Jd(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), lu(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          wu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, wu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, f = n.nodeName;
            n[ru] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && wu(t.ownerDocument.body);
      e = u;
    } while (e);
    lu(l);
  }
  function wd(t, l) {
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
  function Uf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Uf(e), Bi(e);
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
  function Ph(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[ru])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (n = t.getAttribute("src"), (n !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n)
          return t;
      } else return t;
      if (t = Xl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function t0(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function $d(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Cf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Hf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function l0(t, l) {
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
  var qf = null;
  function Wd(t) {
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
  function Fd(t) {
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
  function kd(t, l, e) {
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
  function wu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Bi(t);
  }
  var Ql = /* @__PURE__ */ new Map(), Id = /* @__PURE__ */ new Set();
  function di(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ve = q.d;
  q.d = {
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
    var t = ve.f(), l = ai();
    return t || l;
  }
  function a0(t) {
    var l = pa(t);
    l !== null && l.tag === 5 && l.type === "form" ? hr(l) : ve.r(t);
  }
  var Ia = typeof document > "u" ? null : document;
  function Pd(t, l, e) {
    var a = Ia;
    if (a && typeof l == "string" && l) {
      var u = Ul(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Id.has(u) || (Id.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), al(l, "link", t), kt(l), a.head.appendChild(l)));
    }
  }
  function u0(t) {
    ve.D(t), Pd("dns-prefetch", t, null);
  }
  function n0(t, l) {
    ve.C(t, l), Pd("preconnect", t, l);
  }
  function i0(t, l, e) {
    ve.L(t, l, e);
    var a = Ia;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + Ul(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Ul(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Ul(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Ul(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Pa(t);
          break;
        case "script":
          n = tu(t);
      }
      Ql.has(n) || (t = j(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ql.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector($u(n)) || l === "script" && a.querySelector(Wu(n)) || (l = a.createElement("link"), al(l, "link", t), kt(l), a.head.appendChild(l)));
    }
  }
  function c0(t, l) {
    ve.m(t, l);
    var e = Ia;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Ul(a) + '"][href="' + Ul(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = tu(t);
      }
      if (!Ql.has(n) && (t = j({ rel: "modulepreload", href: t }, l), Ql.set(n, t), e.querySelector(u) === null)) {
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
        a = e.createElement("link"), al(a, "link", t), kt(a), e.head.appendChild(a);
      }
    }
  }
  function f0(t, l, e) {
    ve.S(t, l, e);
    var a = Ia;
    if (a && t) {
      var u = _a(a).hoistableStyles, n = Pa(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          $u(n)
        ))
          f.loading = 5;
        else {
          t = j(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ql.get(n)) && Bf(t, e);
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
        }, u.set(n, i);
      }
    }
  }
  function s0(t, l) {
    ve.X(t, l);
    var e = Ia;
    if (e && t) {
      var a = _a(e).hoistableScripts, u = tu(t), n = a.get(u);
      n || (n = e.querySelector(Wu(u)), n || (t = j({ src: t, async: !0 }, l), (l = Ql.get(u)) && Yf(t, l), n = e.createElement("script"), kt(n), al(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function o0(t, l) {
    ve.M(t, l);
    var e = Ia;
    if (e && t) {
      var a = _a(e).hoistableScripts, u = tu(t), n = a.get(u);
      n || (n = e.querySelector(Wu(u)), n || (t = j({ src: t, async: !0, type: "module" }, l), (l = Ql.get(u)) && Yf(t, l), n = e.createElement("script"), kt(n), al(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function tm(t, l, e, a) {
    var u = (u = P.current) ? di(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Pa(e.href), e = _a(
          u
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Pa(e.href);
          var n = _a(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            $u(t)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Ql.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ql.set(t, e), n || r0(
            u,
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = tu(e), e = _a(
          u
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
  function Pa(t) {
    return 'href="' + Ul(t) + '"';
  }
  function $u(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function lm(t) {
    return j({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function r0(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), al(l, "link", e), kt(l), t.head.appendChild(l));
  }
  function tu(t) {
    return '[src="' + Ul(t) + '"]';
  }
  function Wu(t) {
    return "script[async]" + t;
  }
  function em(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Ul(e.href) + '"]'
          );
          if (a)
            return l.instance = a, kt(a), a;
          var u = j({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), kt(a), al(a, "style", u), mi(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Pa(e.href);
          var n = t.querySelector(
            $u(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, kt(n), n;
          a = lm(e), (u = Ql.get(u)) && Bf(a, u), n = (t.ownerDocument || t).createElement("link"), kt(n);
          var i = n;
          return i._p = new Promise(function(f, o) {
            i.onload = f, i.onerror = o;
          }), al(n, "link", a), l.state.loading |= 4, mi(n, e.precedence, t), l.instance = n;
        case "script":
          return n = tu(e.src), (u = t.querySelector(
            Wu(n)
          )) ? (l.instance = u, kt(u), u) : (a = e, (u = Ql.get(n)) && (a = j({}, e), Yf(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), kt(u), al(u, "link", a), t.head.appendChild(u), l.instance = u);
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
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === l) n = f;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Bf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Yf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var vi = null;
  function am(t, l, e) {
    if (vi === null) {
      var a = /* @__PURE__ */ new Map(), u = vi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = vi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[ru] || n[Pt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function um(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function d0(t, l, e) {
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
  function nm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function m0(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Pa(a.href), n = l.querySelector(
          $u(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = hi.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, kt(n);
          return;
        }
        n = l.ownerDocument || l, a = lm(a), (u = Ql.get(u)) && Bf(a, u), n = n.createElement("link"), kt(n);
        var i = n;
        i._p = new Promise(function(f, o) {
          i.onload = f, i.onerror = o;
        }), al(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = hi.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Gf = 0;
  function v0(t, l) {
    return t.stylesheets && t.count === 0 && gi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && gi(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Gf === 0 && (Gf = 62500 * $h());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && gi(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > Gf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
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
    t.stylesheets = null, t.unsuspend !== null && (t.count++, yi = /* @__PURE__ */ new Map(), l.forEach(h0, t), yi = null, hi.call(t));
  }
  function h0(t, l) {
    if (!(l.state.loading & 4)) {
      var e = yi.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), yi.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = hi.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var Fu = {
    $$typeof: pt,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function y0(t, l, e, a, u, n, i, f, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ui(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ui(0), this.hiddenUpdates = Ui(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function im(t, l, e, a, u, n, i, f, o, S, T, O) {
    return t = new y0(
      t,
      l,
      e,
      i,
      o,
      S,
      T,
      O,
      f
    ), l = 1, n === !0 && (l |= 24), n = zl(3, null, null, l), t.current = n, n.stateNode = t, l = gc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, _c(n), t;
  }
  function cm(t) {
    return t ? (t = ja, t) : ja;
  }
  function fm(t, l, e, a, u, n) {
    u = cm(u), a.context === null ? a.context = u : a.pendingContext = u, a = Me(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = xe(t, a, l), e !== null && (Sl(e, t, l), Du(e, t, l));
  }
  function sm(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Xf(t, l) {
    sm(t, l), (t = t.alternate) && sm(t, l);
  }
  function om(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = aa(t, 67108864);
      l !== null && Sl(l, t, 67108864), Xf(t, 67108864);
    }
  }
  function rm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ml();
      l = Ci(l);
      var e = aa(t, l);
      e !== null && Sl(e, t, l), Xf(t, l);
    }
  }
  var Si = !0;
  function g0(t, l, e, a) {
    var u = E.T;
    E.T = null;
    var n = q.p;
    try {
      q.p = 2, Qf(t, l, e, a);
    } finally {
      q.p = n, E.T = u;
    }
  }
  function S0(t, l, e, a) {
    var u = E.T;
    E.T = null;
    var n = q.p;
    try {
      q.p = 8, Qf(t, l, e, a);
    } finally {
      q.p = n, E.T = u;
    }
  }
  function Qf(t, l, e, a) {
    if (Si) {
      var u = Vf(a);
      if (u === null)
        Of(
          t,
          l,
          a,
          bi,
          e
        ), mm(t, a);
      else if (p0(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (mm(t, a), l & 4 && -1 < b0.indexOf(t)) {
        for (; u !== null; ) {
          var n = pa(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Ie(n.pendingLanes);
                  if (i !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var o = 1 << 31 - El(i);
                      f.entanglements[1] |= o, i &= ~o;
                    }
                    $l(n), (yt & 6) === 0 && (li = xt() + 500, Zu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = aa(n, 2), f !== null && Sl(f, n, 2), ai(), Xf(n, 2);
            }
          if (n = Vf(a), n === null && Of(
            t,
            l,
            a,
            bi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Of(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Vf(t) {
    return t = Li(t), Lf(t);
  }
  var bi = null;
  function Lf(t) {
    if (bi = null, t = ba(t), t !== null) {
      var l = R(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = M(l), t !== null) return t;
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
  function dm(t) {
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
          case cu:
            return 8;
          case ke:
          case rl:
            return 32;
          case jl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Zf = !1, Qe = null, Ve = null, Le = null, ku = /* @__PURE__ */ new Map(), Iu = /* @__PURE__ */ new Map(), Ze = [], b0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mm(t, l) {
    switch (t) {
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
        ku.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Iu.delete(l.pointerId);
    }
  }
  function Pu(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = pa(l), l !== null && om(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function p0(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return Qe = Pu(
          Qe,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ve = Pu(
          Ve,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return Le = Pu(
          Le,
          t,
          l,
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
            t,
            l,
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
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function vm(t) {
    var l = ba(t.target);
    if (l !== null) {
      var e = R(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = M(e), l !== null) {
            t.blockedOn = l, Os(t.priority, function() {
              rm(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = B(e), l !== null) {
            t.blockedOn = l, Os(t.priority, function() {
              rm(e);
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
        return l = pa(e), l !== null && om(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function hm(t, l, e) {
    pi(t) && e.delete(l);
  }
  function _0() {
    Zf = !1, Qe !== null && pi(Qe) && (Qe = null), Ve !== null && pi(Ve) && (Ve = null), Le !== null && pi(Le) && (Le = null), ku.forEach(hm), Iu.forEach(hm);
  }
  function _i(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Zf || (Zf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      _0
    )));
  }
  var Ei = null;
  function ym(t) {
    Ei !== t && (Ei = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Ei === t && (Ei = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (Lf(a || e) === null)
              continue;
            break;
          }
          var n = pa(e);
          n !== null && (t.splice(l, 3), l -= 3, Qc(
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
  function lu(t) {
    function l(o) {
      return _i(o, t);
    }
    Qe !== null && _i(Qe, t), Ve !== null && _i(Ve, t), Le !== null && _i(Le, t), ku.forEach(l), Iu.forEach(l);
    for (var e = 0; e < Ze.length; e++) {
      var a = Ze[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ze.length && (e = Ze[0], e.blockedOn === null); )
      vm(e), e.blockedOn === null && Ze.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[dl] || null;
        if (typeof n == "function")
          i || ym(e);
        else if (i) {
          var f = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[dl] || null)
              f = i.formAction;
            else if (Lf(u) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), ym(e);
        }
      }
  }
  function gm() {
    function t(n) {
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
    function l() {
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
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function Kf(t) {
    this._internalRoot = t;
  }
  Ti.prototype.render = Kf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = Ml();
    fm(e, a, t, l, null, null);
  }, Ti.prototype.unmount = Kf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      fm(t.current, 2, null, t, null, null), ai(), l[Sa] = null;
    }
  };
  function Ti(t) {
    this._internalRoot = t;
  }
  Ti.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Ns();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ze.length && l !== 0 && l < Ze[e].priority; e++) ;
      Ze.splice(e, 0, t), e === 0 && vm(t);
    }
  };
  var Sm = g.version;
  if (Sm !== "19.2.6")
    throw Error(
      s(
        527,
        Sm,
        "19.2.6"
      )
    );
  q.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = _(l), t = t !== null ? U(t) : null, t = t === null ? null : t.stateNode, t;
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
        Fl = zi.inject(
          E0
        ), _l = zi;
      } catch {
      }
  }
  return ln.createRoot = function(t, l) {
    if (!x(t)) throw Error(s(299));
    var e = !1, a = "", u = Ar, n = Nr, i = Or;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = im(
      t,
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
      gm
    ), t[Sa] = l.current, Nf(t), new Kf(l);
  }, ln.hydrateRoot = function(t, l, e) {
    if (!x(t)) throw Error(s(299));
    var a = !1, u = "", n = Ar, i = Nr, f = Or, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = im(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      o,
      n,
      i,
      f,
      gm
    ), l.context = cm(null), e = l.current, a = Ml(), a = Ci(a), u = Me(a), u.callback = null, xe(e, u, a), e = a, l.current.lanes = e, ou(l, e), $l(l), t[Sa] = l.current, Nf(t), new Ti(l);
  }, ln.version = "19.2.6", ln;
}
var Dm;
function U0() {
  if (Dm) return $f.exports;
  Dm = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (g) {
        console.error(g);
      }
  }
  return c(), $f.exports = R0(), $f.exports;
}
var C0 = U0(), If = { exports: {} }, Pf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mm;
function H0() {
  if (Mm) return Pf;
  Mm = 1;
  var c = ji();
  function g(j, N) {
    return j === N && (j !== 0 || 1 / j === 1 / N) || j !== j && N !== N;
  }
  var h = typeof Object.is == "function" ? Object.is : g, s = c.useState, x = c.useEffect, R = c.useLayoutEffect, M = c.useDebugValue;
  function B(j, N) {
    var C = N(), Q = s({ inst: { value: C, getSnapshot: N } }), w = Q[0].inst, I = Q[1];
    return R(
      function() {
        w.value = C, w.getSnapshot = N, D(w) && I({ inst: w });
      },
      [j, C, N]
    ), x(
      function() {
        return D(w) && I({ inst: w }), j(function() {
          D(w) && I({ inst: w });
        });
      },
      [j]
    ), M(C), C;
  }
  function D(j) {
    var N = j.getSnapshot;
    j = j.value;
    try {
      var C = N();
      return !h(j, C);
    } catch {
      return !0;
    }
  }
  function _(j, N) {
    return N();
  }
  var U = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? _ : B;
  return Pf.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : U, Pf;
}
var xm;
function q0() {
  return xm || (xm = 1, If.exports = H0()), If.exports;
}
var jm = q0();
const Lm = 0, Zm = 1, Km = 2, Rm = 3;
var Um = Object.prototype.hasOwnProperty;
function is(c, g) {
  var h, s;
  if (c === g) return !0;
  if (c && g && (h = c.constructor) === g.constructor) {
    if (h === Date) return c.getTime() === g.getTime();
    if (h === RegExp) return c.toString() === g.toString();
    if (h === Array) {
      if ((s = c.length) === g.length)
        for (; s-- && is(c[s], g[s]); ) ;
      return s === -1;
    }
    if (!h || typeof c == "object") {
      s = 0;
      for (h in c)
        if (Um.call(c, h) && ++s && !Um.call(g, h) || !(h in g) || !is(c[h], g[h])) return !1;
      return Object.keys(g).length === s;
    }
  }
  return c !== c && g !== g;
}
const ye = /* @__PURE__ */ new WeakMap(), Se = () => {
}, nl = (
  /*#__NOINLINE__*/
  Se()
), cs = Object, ct = (c) => c === nl, Wl = (c) => typeof c == "function", $e = (c, g) => ({
  ...c,
  ...g
}), Jm = (c) => Wl(c.then), ts = {}, Ai = {}, ys = "undefined", un = typeof window != ys, fs = typeof document != ys, B0 = un && "Deno" in window, Y0 = () => un && typeof window.requestAnimationFrame != ys, wm = (c, g) => {
  const h = ye.get(c);
  return [
    // Getter
    () => !ct(g) && c.get(g) || ts,
    // Setter
    (s) => {
      if (!ct(g)) {
        const x = c.get(g);
        g in Ai || (Ai[g] = x), h[5](g, $e(x, s), x || ts);
      }
    },
    // Subscriber
    h[6],
    // Get server cache snapshot
    () => !ct(g) && g in Ai ? Ai[g] : !ct(g) && c.get(g) || ts
  ];
};
let ss = !0;
const G0 = () => ss, [os, rs] = un && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Se,
  Se
], X0 = () => {
  const c = fs && document.visibilityState;
  return ct(c) || c !== "hidden";
}, Q0 = (c) => (fs && document.addEventListener("visibilitychange", c), os("focus", c), () => {
  fs && document.removeEventListener("visibilitychange", c), rs("focus", c);
}), V0 = (c) => {
  const g = () => {
    ss = !0, c();
  }, h = () => {
    ss = !1;
  };
  return os("online", g), os("offline", h), () => {
    rs("online", g), rs("offline", h);
  };
}, L0 = {
  isOnline: G0,
  isVisible: X0
}, Z0 = {
  initFocus: Q0,
  initReconnect: V0
}, Cm = !hs.useId, au = !un || B0, K0 = (c) => Y0() ? window.requestAnimationFrame(c) : setTimeout(c, 1), ls = au ? J.useEffect : J.useLayoutEffect, es = typeof navigator < "u" && navigator.connection, Hm = !au && es && ([
  "slow-2g",
  "2g"
].includes(es.effectiveType) || es.saveData), Ni = /* @__PURE__ */ new WeakMap(), J0 = (c) => cs.prototype.toString.call(c), as = (c, g) => c === `[object ${g}]`;
let w0 = 0;
const ds = (c) => {
  const g = typeof c, h = J0(c), s = as(h, "Date"), x = as(h, "RegExp"), R = as(h, "Object");
  let M, B;
  if (cs(c) === c && !s && !x) {
    if (M = Ni.get(c), M) return M;
    if (M = ++w0 + "~", Ni.set(c, M), Array.isArray(c)) {
      for (M = "@", B = 0; B < c.length; B++)
        M += ds(c[B]) + ",";
      Ni.set(c, M);
    }
    if (R) {
      M = "#";
      const D = cs.keys(c).sort();
      for (; !ct(B = D.pop()); )
        ct(c[B]) || (M += B + ":" + ds(c[B]) + ",");
      Ni.set(c, M);
    }
  } else
    M = s ? c.toJSON() : g == "symbol" ? c.toString() : g == "string" ? JSON.stringify(c) : "" + c;
  return M;
}, gs = (c) => {
  if (Wl(c))
    try {
      c = c();
    } catch {
      c = "";
    }
  const g = c;
  return c = typeof c == "string" ? c : (Array.isArray(c) ? c.length : c) ? ds(c) : "", [
    c,
    g
  ];
};
let $0 = 0;
const ms = () => ++$0;
async function $m(...c) {
  const [g, h, s, x] = c, R = $e({
    populateCache: !0,
    throwOnError: !0
  }, typeof x == "boolean" ? {
    revalidate: x
  } : x || {});
  let M = R.populateCache;
  const B = R.rollbackOnError;
  let D = R.optimisticData;
  const _ = (N) => typeof B == "function" ? B(N) : B !== !1, U = R.throwOnError;
  if (Wl(h)) {
    const N = h, C = [], Q = g.keys();
    for (const w of Q)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(w) && N(g.get(w)._k) && C.push(w);
    return Promise.all(C.map(j));
  }
  return j(h);
  async function j(N) {
    const [C] = gs(N);
    if (!C) return;
    const [Q, w] = wm(g, C), [I, ft, L, pt] = ye.get(g), Nt = () => {
      const Gt = I[C];
      return (Wl(R.revalidate) ? R.revalidate(Q().data, N) : R.revalidate !== !1) && (delete L[C], delete pt[C], Gt && Gt[0]) ? Gt[0](Km).then(() => Q().data) : Q().data;
    };
    if (c.length < 3)
      return Nt();
    let gt = s, dt, $ = !1;
    const Ht = ms();
    ft[C] = [
      Ht,
      0
    ];
    const st = !ct(D), il = Q(), W = il.data, Ot = il._c, cl = ct(Ot) ? W : Ot;
    if (st && (D = Wl(D) ? D(cl, W) : D, w({
      data: D,
      _c: cl
    })), Wl(gt))
      try {
        gt = gt(cl);
      } catch (Gt) {
        dt = Gt, $ = !0;
      }
    if (gt && Jm(gt))
      if (gt = await gt.catch((Gt) => {
        dt = Gt, $ = !0;
      }), Ht !== ft[C][0]) {
        if ($) throw dt;
        return gt;
      } else $ && st && _(dt) && (M = !0, w({
        data: cl,
        _c: nl
      }));
    if (M && !$)
      if (Wl(M)) {
        const Gt = M(gt, cl);
        w({
          data: Gt,
          error: nl,
          _c: nl
        });
      } else
        w({
          data: gt,
          error: nl,
          _c: nl
        });
    if (ft[C][1] = ms(), Promise.resolve(Nt()).then(() => {
      w({
        _c: nl
      });
    }), $) {
      if (U) throw dt;
      return;
    }
    return gt;
  }
}
const qm = (c, g) => {
  for (const h in c)
    c[h][0] && c[h][0](g);
}, W0 = (c, g) => {
  if (!ye.has(c)) {
    const h = $e(Z0, g), s = /* @__PURE__ */ Object.create(null), x = $m.bind(nl, c);
    let R = Se;
    const M = /* @__PURE__ */ Object.create(null), B = (U, j) => {
      const N = M[U] || [];
      return M[U] = N, N.push(j), () => N.splice(N.indexOf(j), 1);
    }, D = (U, j, N) => {
      c.set(U, j);
      const C = M[U];
      if (C)
        for (const Q of C)
          Q(j, N);
    }, _ = () => {
      if (!ye.has(c) && (ye.set(c, [
        s,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        x,
        D,
        B
      ]), !au)) {
        const U = h.initFocus(setTimeout.bind(nl, qm.bind(nl, s, Lm))), j = h.initReconnect(setTimeout.bind(nl, qm.bind(nl, s, Zm)));
        R = () => {
          U && U(), j && j(), ye.delete(c);
        };
      }
    };
    return _(), [
      c,
      x,
      _,
      R
    ];
  }
  return [
    c,
    ye.get(c)[4]
  ];
}, F0 = (c, g, h, s, x) => {
  const R = h.errorRetryCount, M = x.retryCount, B = ~~((Math.random() + 0.5) * (1 << (M < 8 ? M : 8))) * h.errorRetryInterval;
  !ct(R) && M > R || setTimeout(s, B, x);
}, k0 = is, [Wm, I0] = W0(/* @__PURE__ */ new Map()), P0 = $e(
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
    errorRetryInterval: Hm ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: Hm ? 5e3 : 3e3,
    // providers
    compare: k0,
    isPaused: () => !1,
    cache: Wm,
    mutate: I0,
    fallback: {}
  },
  // use web preset by default
  L0
), ty = (c, g) => {
  const h = $e(c, g);
  if (g) {
    const { use: s, fallback: x } = c, { use: R, fallback: M } = g;
    s && R && (h.use = s.concat(R)), x && M && (h.fallback = $e(x, M));
  }
  return h;
}, ly = J.createContext({}), ey = "$inf$", Fm = un && window.__SWR_DEVTOOLS_USE__, ay = Fm ? window.__SWR_DEVTOOLS_USE__ : [], uy = () => {
  Fm && (window.__SWR_DEVTOOLS_REACT__ = hs);
}, ny = (c) => Wl(c[1]) ? [
  c[0],
  c[1],
  c[2] || {}
] : [
  c[0],
  null,
  (c[1] === null ? c[2] : c[1]) || {}
], iy = () => {
  const c = J.useContext(ly);
  return J.useMemo(() => $e(P0, c), [
    c
  ]);
}, cy = (c) => (g, h, s) => c(g, h && ((...R) => {
  const [M] = gs(g), [, , , B] = ye.get(Wm);
  if (M.startsWith(ey))
    return h(...R);
  const D = B[M];
  return ct(D) ? h(...R) : (delete B[M], D);
}), s), fy = ay.concat(cy), sy = (c) => function(...h) {
  const s = iy(), [x, R, M] = ny(h), B = ty(s, M);
  let D = c;
  const { use: _ } = B, U = (_ || []).concat(fy);
  for (let j = U.length; j--; )
    D = U[j](D);
  return D(x, R || B.fetcher || null, B);
}, oy = (c, g, h) => {
  const s = g[c] || (g[c] = []);
  return s.push(h), () => {
    const x = s.indexOf(h);
    x >= 0 && (s[x] = s[s.length - 1], s.pop());
  };
};
uy();
const us = hs.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
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
      throw c.status = "pending", c.then((g) => {
        c.status = "fulfilled", c.value = g;
      }, (g) => {
        c.status = "rejected", c.reason = g;
      }), c;
  }
}), ns = {
  dedupe: !0
}, Bm = Promise.resolve(nl), ry = () => Se, dy = (c, g, h) => {
  const { cache: s, compare: x, suspense: R, fallbackData: M, revalidateOnMount: B, revalidateIfStale: D, refreshInterval: _, refreshWhenHidden: U, refreshWhenOffline: j, keepPreviousData: N, strictServerPrefetchWarning: C } = h, [Q, w, I, ft] = ye.get(s), [L, pt] = gs(c), Nt = J.useRef(!1), gt = J.useRef(!1), dt = J.useRef(L), $ = J.useRef(g), Ht = J.useRef(h), st = () => Ht.current, il = () => st().isVisible() && st().isOnline(), [W, Ot, cl, Gt] = wm(s, L), Ft = J.useRef({}).current, E = ct(M) ? ct(h.fallback) ? nl : h.fallback[L] : M, q = (_t, Ut) => {
    for (const Dt in Ft) {
      const Mt = Dt;
      if (Mt === "data") {
        if (!x(_t[Mt], Ut[Mt]) && (!ct(_t[Mt]) || !x(P, Ut[Mt])))
          return !1;
      } else if (Ut[Mt] !== _t[Mt])
        return !1;
    }
    return !0;
  }, Z = !Nt.current, ht = J.useMemo(() => {
    const _t = W(), Ut = Gt(), Dt = (Qt) => {
      const xt = $e(Qt);
      return delete xt._k, (() => {
        if (!L || !g || st().isPaused()) return !1;
        if (Z && !ct(B)) return B;
        const pe = ct(E) ? xt.data : E;
        return ct(pe) || D;
      })() ? {
        isValidating: !0,
        isLoading: !0,
        ...xt
      } : xt;
    }, Mt = Dt(_t), sl = _t === Ut ? Mt : Dt(Ut);
    let ol = Mt;
    return [
      () => {
        const Qt = Dt(W());
        return q(Qt, ol) ? (ol.data = Qt.data, ol.isLoading = Qt.isLoading, ol.isValidating = Qt.isValidating, ol.error = Qt.error, ol) : (ol = Qt, Qt);
      },
      () => sl
    ];
  }, [
    s,
    L
  ]), rt = jm.useSyncExternalStore(J.useCallback(
    (_t) => cl(L, (Ut, Dt) => {
      q(Dt, Ut) || _t();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      s,
      L
    ]
  ), ht[0], ht[1]), d = Q[L] && Q[L].length > 0, A = rt.data, H = ct(A) ? E && Jm(E) ? us(E) : E : A, Y = rt.error, F = J.useRef(H), P = N ? ct(A) ? ct(F.current) ? H : F.current : A : H, et = L && ct(H), Xt = J.useRef(null);
  !au && // getServerSnapshot is only called during hydration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  jm.useSyncExternalStore(ry, () => (Xt.current = !1, Xt), () => (Xt.current = !0, Xt));
  const qt = Xt.current;
  C && qt && !R && et && console.warn(`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
  const be = !L || !g || st().isPaused() || d && !ct(Y) ? !1 : Z && !ct(B) ? B : R ? ct(H) ? !1 : D : ct(H) || D, We = Z && be, iu = ct(rt.isValidating) ? We : rt.isValidating, cn = ct(rt.isLoading) ? We : rt.isLoading, pl = J.useCallback(
    async (_t) => {
      const Ut = $.current;
      if (!L || !Ut || gt.current || st().isPaused())
        return !1;
      let Dt, Mt, sl = !0;
      const ol = _t || {}, Qt = !I[L] || !ol.dedupe, xt = () => Cm ? !gt.current && L === dt.current && Nt.current : L === dt.current, Fe = {
        isValidating: !1,
        isLoading: !1
      }, pe = () => {
        Ot(Fe);
      }, cu = () => {
        const rl = I[L];
        rl && rl[1] === Mt && delete I[L];
      }, ke = {
        isValidating: !0
      };
      ct(W().data) && (ke.isLoading = !0);
      try {
        if (Qt && (Ot(ke), h.loadingTimeout && ct(W().data) && setTimeout(() => {
          sl && xt() && st().onLoadingSlow(L, h);
        }, h.loadingTimeout), I[L] = [
          Ut(pt),
          ms()
        ]), [Dt, Mt] = I[L], Dt = await Dt, Qt && setTimeout(cu, h.dedupingInterval), !I[L] || I[L][1] !== Mt)
          return Qt && xt() && st().onDiscarded(L), !1;
        Fe.error = nl;
        const rl = w[L];
        if (!ct(rl) && // case 1
        (Mt <= rl[0] || // case 2
        Mt <= rl[1] || // case 3
        rl[1] === 0))
          return pe(), Qt && xt() && st().onDiscarded(L), !1;
        const jl = W().data;
        Fe.data = x(jl, Dt) ? jl : Dt, Qt && xt() && st().onSuccess(Dt, L, h);
      } catch (rl) {
        cu();
        const jl = st(), { shouldRetryOnError: fu } = jl;
        jl.isPaused() || (Fe.error = rl, Qt && xt() && (jl.onError(rl, L, jl), (fu === !0 || Wl(fu) && fu(rl)) && (!st().revalidateOnFocus || !st().revalidateOnReconnect || il()) && jl.onErrorRetry(rl, L, jl, (Ri) => {
          const Fl = Q[L];
          Fl && Fl[0] && Fl[0](Rm, Ri);
        }, {
          retryCount: (ol.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return sl = !1, pe(), !0;
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
  ), ga = J.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (..._t) => $m(s, dt.current, ..._t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (ls(() => {
    $.current = g, Ht.current = h, ct(A) || (F.current = A);
  }), ls(() => {
    if (!L) return;
    const _t = pl.bind(nl, ns);
    let Ut = 0;
    st().revalidateOnFocus && (Ut = Date.now() + st().focusThrottleInterval);
    const Mt = oy(L, Q, (sl, ol = {}) => {
      if (sl == Lm) {
        const Qt = Date.now();
        st().revalidateOnFocus && Qt > Ut && il() && (Ut = Qt + st().focusThrottleInterval, _t());
      } else if (sl == Zm)
        st().revalidateOnReconnect && il() && _t();
      else {
        if (sl == Km)
          return pl();
        if (sl == Rm)
          return pl(ol);
      }
    });
    return gt.current = !1, dt.current = L, Nt.current = !0, Ot({
      _k: pt
    }), be && (I[L] || (ct(H) || au ? _t() : K0(_t))), () => {
      gt.current = !0, Mt();
    };
  }, [
    L
  ]), ls(() => {
    let _t;
    function Ut() {
      const Mt = Wl(_) ? _(W().data) : _;
      Mt && _t !== -1 && (_t = setTimeout(Dt, Mt));
    }
    function Dt() {
      !W().error && (U || st().isVisible()) && (j || st().isOnline()) ? pl(ns).then(Ut) : Ut();
    }
    return Ut(), () => {
      _t && (clearTimeout(_t), _t = -1);
    };
  }, [
    _,
    U,
    j,
    L
  ]), J.useDebugValue(P), R) {
    if (!Cm && au && et)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    et && ($.current = g, Ht.current = h, gt.current = !1);
    const _t = ft[L], Ut = !ct(_t) && et ? ga(_t) : Bm;
    if (us(Ut), !ct(Y) && et)
      throw Y;
    const Dt = et ? pl(ns) : Bm;
    !ct(P) && et && (Dt.status = "fulfilled", Dt.value = !0), us(Dt);
  }
  return {
    mutate: ga,
    get data() {
      return Ft.data = !0, P;
    },
    get error() {
      return Ft.error = !0, Y;
    },
    get isValidating() {
      return Ft.isValidating = !0, iu;
    },
    get isLoading() {
      return Ft.isLoading = !0, cn;
    }
  };
}, Di = sy(dy), km = "/api/v1/extensions/nexus.video.ltx23";
async function he(c, g) {
  const h = await fetch(`${km}${c}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
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
  plan: (c) => he("/recipe/plan", {
    method: "POST",
    body: JSON.stringify(c)
  }),
  createRender: (c) => he(
    "/renders",
    { method: "POST", body: JSON.stringify(c) }
  ),
  getRender: (c) => he(`/renders/${c}`),
  cancel: (c) => he(`/renders/${c}/cancel`, { method: "POST" }),
  retrySegment: (c, g) => he(`/renders/${c}/retry-segment`, {
    method: "POST",
    body: JSON.stringify({ segment_index: g })
  })
};
function my(c) {
  return `${km}/artifacts/${c}`;
}
const vy = "/api/v1", Ym = "nexus.video.ltx23";
async function Gm(c, g) {
  const h = await fetch(`${vy}${c}`, {
    headers: { "Content-Type": "application/json", ...g?.headers ?? {} },
    ...g
  });
  if (!h.ok) {
    const x = await h.text();
    throw new Error(`${h.status}: ${x}`);
  }
  return (await h.json()).data;
}
const Xm = {
  listDependencies: () => Gm(`/extensions/${Ym}/dependencies`),
  startInstall: (c = !1) => Gm(
    `/extensions/${Ym}/install${c ? "?force=true" : ""}`,
    { method: "POST" }
  )
}, Qm = {
  status: (c) => he(`/profiles/${c}/install`),
  start: (c) => he(`/profiles/${c}/install`, {
    method: "POST"
  })
};
var hy = "_1vmg9ib0", uu = "_1vmg9ib1", en = "_1vmg9ib2", yy = "_1vmg9ib3", bl = "_1vmg9ib4", xl = "_1vmg9ib5", ge = "_1vmg9ib6", Im = "_1vmg9ib7 _1vmg9ib6", Vm = "_1vmg9ib8 _1vmg9ib6", Mi = "_1vmg9ib9", Ss = "_1vmg9iba", bs = "_1vmg9ibb _1vmg9iba", gy = "_1vmg9ibc _1vmg9iba", Oi = "_1vmg9ibd _1vmg9iba", nn = "_1vmg9ibe", Je = "_1vmg9ibf", we = "_1vmg9ibg", ya = "_1vmg9ibh", Pm = "_1vmg9ibj _1vmg9ibi", tv = "_1vmg9ibk _1vmg9ibi", lv = "_1vmg9ibl _1vmg9ibi", ev = "_1vmg9ibm _1vmg9ibi", an = "_1vmg9ibn", nu = "_1vmg9ibo", Sy = "_1vmg9ibp", by = "_1vmg9ibq", vs = "_1vmg9ibs _1vmg9ibr", av = "_1vmg9ibt _1vmg9ibr", uv = "_1vmg9ibu _1vmg9ibr", nv = "_1vmg9ibv _1vmg9ibr", py = "_1vmg9ibw", _y = "_1vmg9ibx", Ey = "_1vmg9iby", Ty = "_1vmg9ibz", zy = "_1vmg9ib10 _1vmg9iba", Zt = "_1vmg9ib11", Ay = "_1vmg9ib12", Ny = "_1vmg9ib13", Oy = "_1vmg9ib14", Dy = "_1vmg9ib15", My = "_1vmg9ib16", ps = "_1vmg9ib17", _s = "_1vmg9ib18", xy = "_1vmg9ib19";
const jy = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb"
};
function Ry() {
  const [c, g] = J.useState(jy), [h, s] = J.useState(null), [x, R] = J.useState(null), [M, B] = J.useState(!1), [D, _] = J.useState(null), [U, j] = J.useState(null), [N, C] = J.useState(!1), [Q, w] = J.useState(!1), [I, ft] = J.useState(
    null
  ), [L, pt] = J.useState(null), { data: Nt } = Di(
    "ltx:runtime-profiles",
    () => eu.listProfiles(),
    { revalidateOnFocus: !1 }
  ), { data: gt, mutate: dt } = Di(
    D ? `ltx:renders:${D}` : null,
    () => D ? eu.getRender(D) : Promise.resolve(null),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (W) => W ? W.status === "completed" || W.status === "failed" || W.status === "cancelled" ? 0 : 2e3 : 1e3
    }
  ), $ = J.useCallback(async () => {
    B(!0), R(null);
    try {
      const W = await eu.plan(c);
      s(W);
    } catch (W) {
      R(W instanceof Error ? W.message : String(W)), s(null);
    } finally {
      B(!1);
    }
  }, [c]), Ht = J.useCallback(async () => {
    C(!0), j(null);
    try {
      const W = await eu.createRender(c);
      _(W.id), dt();
    } catch (W) {
      j(W instanceof Error ? W.message : String(W));
    } finally {
      C(!1);
    }
  }, [c, dt]), st = J.useCallback(async () => {
    if (!(!D || Q)) {
      w(!0), j(null);
      try {
        await eu.cancel(D), dt();
      } catch (W) {
        j(
          `Cancel failed: ${W instanceof Error ? W.message : String(W)}`
        );
      } finally {
        w(!1);
      }
    }
  }, [D, Q, dt]), il = J.useCallback(
    async (W) => {
      if (!(!D || I !== null)) {
        ft(W), pt(null);
        try {
          await eu.retrySegment(D, W), dt();
        } catch (Ot) {
          pt(
            `Retry of segment ${W + 1} failed: ${Ot instanceof Error ? Ot.message : String(Ot)}`
          );
        } finally {
          ft(null);
        }
      }
    },
    [D, I, dt]
  );
  return /* @__PURE__ */ m.jsxs("div", { className: hy, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Ny, children: [
      /* @__PURE__ */ m.jsx(Uy, {}),
      /* @__PURE__ */ m.jsx(
        qy,
        {
          draft: c,
          onChange: g,
          profiles: Nt ?? [],
          onPlan: $,
          onSubmit: Ht,
          planning: M,
          submitting: N,
          plan: h,
          planError: x,
          submitError: U
        }
      )
    ] }),
    /* @__PURE__ */ m.jsx(
      Zy,
      {
        run: gt ?? null,
        onCancel: st,
        cancelling: Q,
        onRetrySegment: il,
        retryingSegmentIndex: I,
        retryError: L
      }
    )
  ] });
}
function Uy() {
  const [c, g] = J.useState(!1), [h, s] = J.useState(null), { data: x, mutate: R } = Di(
    "host:dependencies",
    () => Xm.listDependencies(),
    {
      refreshInterval: (U) => U ? U.steps.some(
        (N) => N.status === "running" || N.status === "pending"
      ) ? 1e3 : 5e3 : 1500
    }
  ), M = J.useCallback(
    async (U = !1) => {
      g(!0), s(null);
      try {
        await Xm.startInstall(U), R();
      } catch (j) {
        s(j instanceof Error ? j.message : String(j));
      } finally {
        g(!1);
      }
    },
    [R]
  );
  if (!x) return null;
  const B = x.steps.find((U) => U.status === "failed"), D = x.all_satisfied, _ = x.steps.some(
    (U) => U.status === "running" || !D && U.status === "pending"
  );
  return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
    /* @__PURE__ */ m.jsxs("div", { className: Oy, children: [
      /* @__PURE__ */ m.jsx("h3", { className: en, style: { fontSize: "15px" }, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: Cy(D, !!B, _), children: D ? "ready" : B ? "install failed" : _ ? "installing…" : "not installed" })
    ] }),
    /* @__PURE__ */ m.jsx("ul", { className: Dy, children: x.steps.map((U) => /* @__PURE__ */ m.jsxs("li", { className: My, children: [
      /* @__PURE__ */ m.jsx("span", { className: Hy(U.status) }),
      /* @__PURE__ */ m.jsx("span", { children: U.id }),
      /* @__PURE__ */ m.jsx("span", { className: Zt, children: U.artifact?.summary ?? U.status })
    ] }, U.id)) }),
    B?.last_error ? /* @__PURE__ */ m.jsxs("div", { className: nu, children: [
      /* @__PURE__ */ m.jsxs("strong", { children: [
        B.id,
        " failed"
      ] }),
      ": ",
      B.last_error.message
    ] }) : null,
    h ? /* @__PURE__ */ m.jsx("div", { className: nu, children: h }) : null,
    !D || B ? /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Ss,
          disabled: c || _,
          onClick: () => void M(!1),
          children: _ || c ? "Installing…" : "Install runtime"
        }
      ),
      B ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: bs,
          disabled: c || _,
          onClick: () => void M(!0),
          children: "Force reinstall"
        }
      ) : null
    ] }) : null
  ] });
}
function Cy(c, g, h) {
  return g ? ev : c ? Pm : h ? tv : lv;
}
function Hy(c) {
  switch (c) {
    case "ok":
      return uv;
    case "running":
      return av;
    case "failed":
      return nv;
    default:
      return vs;
  }
}
function qy({
  draft: c,
  onChange: g,
  profiles: h,
  onPlan: s,
  onSubmit: x,
  planning: R,
  submitting: M,
  plan: B,
  planError: D,
  submitError: _
}) {
  const U = J.useCallback(
    (N, C) => g({ ...c, [N]: C }),
    [c, g]
  ), j = J.useCallback(
    (N) => {
      N.preventDefault(), !(M || c.prompt.trim().length === 0) && x();
    },
    [M, c.prompt, x]
  );
  return /* @__PURE__ */ m.jsxs("form", { className: uu, onSubmit: j, noValidate: !0, children: [
    /* @__PURE__ */ m.jsx("h2", { className: en, children: "LTX 2.3 Video Generator" }),
    /* @__PURE__ */ m.jsx("p", { className: yy, children: "Prompt-driven video synthesis · external-segments mode · 16 GB safe defaults" }),
    /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-prompt", children: "Prompt" }),
      /* @__PURE__ */ m.jsx(
        "textarea",
        {
          id: "ltx-prompt",
          className: Im,
          value: c.prompt,
          onChange: (N) => U("prompt", N.target.value),
          placeholder: "describe the scene…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-neg", children: "Negative prompt (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-neg",
          className: ge,
          value: c.negative_prompt ?? "",
          onChange: (N) => U(
            "negative_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "flicker, watermark, distortion…"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-character", children: "Character anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-character",
          className: ge,
          value: c.character_prompt ?? "",
          onChange: (N) => U(
            "character_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "a woman in a red coat, short black hair, brown eyes"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Zt, children: "Prepended to every scene's prompt; combined with image conditioning to keep characters consistent across cuts." })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
      /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-style", children: "Style anchor (optional)" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "ltx-style",
          className: ge,
          value: c.style_prompt ?? "",
          onChange: (N) => U(
            "style_prompt",
            N.target.value.length > 0 ? N.target.value : void 0
          ),
          placeholder: "moody noir, deep teal shadows, neon highlights, 35mm film grain"
        }
      ),
      /* @__PURE__ */ m.jsx("span", { className: Zt, children: "Appended to every scene's prompt; threads visual style across segment boundaries." })
    ] }),
    /* @__PURE__ */ m.jsx(Qy, { draft: c, update: U }),
    /* @__PURE__ */ m.jsxs("div", { className: Mi, children: [
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-duration", children: "Duration (s)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-duration",
            className: ge,
            type: "number",
            min: 1,
            max: 300,
            value: c.duration_seconds,
            onChange: (N) => {
              const C = Number(N.target.value);
              Number.isFinite(C) && U(
                "duration_seconds",
                Math.max(1, Math.min(300, C))
              );
            }
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-seed", children: "Seed (optional)" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "ltx-seed",
            className: ge,
            type: "number",
            value: c.seed ?? "",
            onChange: (N) => {
              const C = N.target.value;
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
    /* @__PURE__ */ m.jsxs("div", { className: Mi, children: [
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-runtime", children: "Runtime" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-runtime",
            className: Vm,
            value: c.runtime_profile,
            onChange: (N) => U(
              "runtime_profile",
              N.target.value
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
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-quality", children: "Quality" }),
        /* @__PURE__ */ m.jsxs(
          "select",
          {
            id: "ltx-quality",
            className: Vm,
            value: c.quality_preset,
            onChange: (N) => U("quality_preset", N.target.value),
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
    /* @__PURE__ */ m.jsx(Xy, { profiles: h, selected: c.runtime_profile }),
    /* @__PURE__ */ m.jsx(By, { selected: c.runtime_profile }),
    /* @__PURE__ */ m.jsx(Vy, { draft: c, update: U }),
    /* @__PURE__ */ m.jsxs("div", { className: nn, children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: bs,
          onClick: s,
          disabled: R || M || c.prompt.trim().length === 0,
          children: R ? "Planning…" : "Preview plan"
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "submit",
          className: Ss,
          disabled: M || c.prompt.trim().length === 0,
          "aria-busy": M,
          children: M ? "Submitting…" : "Generate video"
        }
      )
    ] }),
    D ? /* @__PURE__ */ m.jsx("div", { className: nu, role: "alert", children: D }) : null,
    _ ? /* @__PURE__ */ m.jsx("div", { className: nu, role: "alert", children: _ }) : null,
    B ? /* @__PURE__ */ m.jsx(Ly, { plan: B }) : null
  ] });
}
function By({
  selected: c
}) {
  const g = Gy(c), [h, s] = J.useState(!1), [x, R] = J.useState(null), { data: M, mutate: B } = Di(
    g ? `profile-install:${g}` : null,
    () => g ? Qm.status(g) : Promise.resolve(null),
    {
      refreshInterval: (N) => N && N.in_flight ? 2e3 : 0
    }
  ), D = J.useCallback(async () => {
    if (g) {
      s(!0), R(null);
      try {
        await Qm.start(g), B();
      } catch (N) {
        R(N instanceof Error ? N.message : String(N));
      } finally {
        s(!1);
      }
    }
  }, [g, B]);
  if (!g || !M) return null;
  if (M.installed)
    return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsx("strong", { children: "Runtime installed" }),
      " · ",
      M.repo
    ] });
  const _ = M.in_flight || h, U = iv(M.phase), j = _ ? U ?? "Installing…" : "Install runtime & download weights";
  return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
    /* @__PURE__ */ m.jsx("strong", { children: "Runtime not installed" }),
    ": ",
    M.repo ?? "unknown repo",
    /* @__PURE__ */ m.jsxs("div", { className: Zt, style: { marginTop: 4 }, children: [
      "Resolves the diffusers extras (torch · diffusers · accelerate) via",
      " ",
      /* @__PURE__ */ m.jsx("code", { children: "uv sync --extra diffusers" }),
      ", then downloads weights from Hugging Face into ",
      M.dest ?? "<host_data_dir>/models/…",
      "."
    ] }),
    M.last_error ? /* @__PURE__ */ m.jsxs("div", { className: Zt, style: { marginTop: 4, color: "#e57373" }, children: [
      "Last error: ",
      M.last_error
    ] }) : null,
    x ? /* @__PURE__ */ m.jsx("div", { className: Zt, style: { marginTop: 4, color: "#e57373" }, children: x }) : null,
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 8 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: Ss,
        disabled: _,
        onClick: () => void D(),
        children: j
      }
    ) }),
    /* @__PURE__ */ m.jsx(
      Yy,
      {
        phase: M.phase,
        recentProgress: M.recent_progress
      }
    )
  ] });
}
function iv(c) {
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
function Yy({
  phase: c,
  recentProgress: g
}) {
  if (!c && g.length === 0) return null;
  const h = iv(c);
  return /* @__PURE__ */ m.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: _s, children: [
      "Install progress",
      h ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
        " · ",
        h
      ] }) : null,
      g.length > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
        " · ",
        g.length,
        " lines"
      ] }) : null
    ] }),
    g.length === 0 ? /* @__PURE__ */ m.jsx("p", { className: Zt, style: { marginTop: 6 }, children: "No output captured yet." }) : /* @__PURE__ */ m.jsx("pre", { className: xy, children: g.join(`
`) })
  ] });
}
function Gy(c) {
  return c === "auto" ? null : c;
}
function Xy({
  profiles: c,
  selected: g
}) {
  if (c.length === 0) return null;
  const h = g === "auto" ? "nexus.video.ltx23.fake" : `nexus.video.ltx23.${g}`, s = c.find((R) => R.runtime_id === h);
  if (!s) return null;
  const x = s.healthy ? "ok" : "warn";
  return /* @__PURE__ */ m.jsxs("div", { className: an, children: [
    /* @__PURE__ */ m.jsx("strong", { children: s.display_name }),
    ": ",
    s.status_message,
    s.experimental ? " (experimental)" : null
  ] });
}
function Qy({
  draft: c,
  update: g
}) {
  const h = c.scenes ?? [], s = J.useRef(0), [x, R] = J.useState(
    () => h.map(() => `scene-${s.current++}`)
  );
  if (x.length !== h.length) {
    const N = x.slice(0, h.length);
    for (; N.length < h.length; )
      N.push(`scene-${s.current++}`);
    R(N);
  }
  const M = J.useCallback(
    (N, C) => {
      g("scenes", N.length > 0 ? N : void 0), R(C);
    },
    [g]
  ), B = J.useCallback(() => {
    const N = h.length > 0 ? c.duration_seconds / (h.length + 1) : c.duration_seconds;
    M(
      [
        ...h,
        { prompt: "", duration_seconds: Math.max(1, Math.round(N)) }
      ],
      [...x, `scene-${s.current++}`]
    );
  }, [h, x, M, c.duration_seconds]), D = J.useCallback(
    (N, C) => {
      const Q = h.map((w, I) => {
        if (I !== N) return w;
        const ft = { ...w };
        return C.prompt !== void 0 && (ft.prompt = C.prompt ?? ""), C.duration_seconds !== void 0 && (C.duration_seconds === null ? delete ft.duration_seconds : ft.duration_seconds = C.duration_seconds), C.seed !== void 0 && (C.seed === null ? delete ft.seed : ft.seed = C.seed), ft;
      });
      M(Q, x);
    },
    [h, x, M]
  ), _ = J.useCallback(
    (N) => {
      M(
        h.filter((C, Q) => Q !== N),
        x.filter((C, Q) => Q !== N)
      );
    },
    [h, x, M]
  ), U = J.useCallback(
    (N, C) => {
      const Q = N + C;
      if (Q < 0 || Q >= h.length) return;
      const w = h[N], I = h[Q], ft = x[N], L = x[Q];
      if (w === void 0 || I === void 0 || ft === void 0 || L === void 0)
        return;
      const pt = [...h], Nt = [...x];
      pt[N] = I, pt[Q] = w, Nt[N] = L, Nt[Q] = ft, M(pt, Nt);
    },
    [h, x, M]
  ), j = h.reduce(
    (N, C) => N + (C.duration_seconds ?? 0),
    0
  );
  return /* @__PURE__ */ m.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: _s, children: [
      "Scenes — ",
      h.length === 0 ? "none (single prompt)" : `${h.length} scenes`,
      j > 0 ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
        " · ",
        j.toFixed(1),
        "s / ",
        c.duration_seconds,
        "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx("p", { className: Zt, style: { marginTop: 8 }, children: "Split the video into named scenes. Each scene's midpoint determines which prompt the corresponding segments use; scenes run consecutively in order. Leave empty to use the global prompt for the whole video." }),
    h.map((N, C) => {
      const Q = x[C] ?? `scene-fallback-${C}`, w = (I) => {
        if (I === "") return null;
        const ft = Number(I);
        return Number.isFinite(ft) ? ft : null;
      };
      return /* @__PURE__ */ m.jsxs(
        "div",
        {
          className: uu,
          style: { background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 },
          children: [
            /* @__PURE__ */ m.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6
                },
                children: [
                  /* @__PURE__ */ m.jsxs("strong", { className: Zt, children: [
                    "Scene ",
                    C + 1
                  ] }),
                  /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                    /* @__PURE__ */ m.jsx(
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
                    /* @__PURE__ */ m.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => U(C, 1),
                        disabled: C === h.length - 1,
                        "aria-label": `Move scene ${C + 1} down`,
                        title: "Move down",
                        children: "↓"
                      }
                    ),
                    /* @__PURE__ */ m.jsx(
                      "button",
                      {
                        type: "button",
                        className: Oi,
                        onClick: () => _(C),
                        "aria-label": `Remove scene ${C + 1}`,
                        title: "Remove scene",
                        children: "✕"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
              /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: `ltx-${Q}-prompt`, children: "Scene prompt" }),
              /* @__PURE__ */ m.jsx(
                "textarea",
                {
                  id: `ltx-${Q}-prompt`,
                  className: Im,
                  value: N.prompt,
                  onChange: (I) => D(C, { prompt: I.target.value }),
                  placeholder: "what happens in this scene…",
                  rows: 2
                }
              )
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: Mi, children: [
              /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
                /* @__PURE__ */ m.jsx(
                  "label",
                  {
                    className: xl,
                    htmlFor: `ltx-${Q}-duration`,
                    children: "Duration (s)"
                  }
                ),
                /* @__PURE__ */ m.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-duration`,
                    className: ge,
                    type: "number",
                    min: 1,
                    step: 0.5,
                    value: N.duration_seconds ?? "",
                    onChange: (I) => {
                      D(C, {
                        duration_seconds: w(I.target.value)
                      });
                    },
                    placeholder: "auto"
                  }
                )
              ] }),
              /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
                /* @__PURE__ */ m.jsx(
                  "label",
                  {
                    className: xl,
                    htmlFor: `ltx-${Q}-seed`,
                    children: "Scene seed (optional)"
                  }
                ),
                /* @__PURE__ */ m.jsx(
                  "input",
                  {
                    id: `ltx-${Q}-seed`,
                    className: ge,
                    type: "number",
                    value: N.seed ?? "",
                    onChange: (I) => {
                      D(C, {
                        seed: w(I.target.value)
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
    /* @__PURE__ */ m.jsx("div", { className: nn, style: { marginTop: 10 }, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: bs,
        onClick: B,
        children: "+ Add scene"
      }
    ) })
  ] });
}
function Vy({
  draft: c,
  update: g
}) {
  const h = c.advanced ?? {}, s = J.useCallback(
    (x, R) => {
      const M = { ...h };
      R == null ? delete M[x] : M[x] = R, g("advanced", Object.keys(M).length > 0 ? M : void 0);
    },
    [h, g]
  );
  return /* @__PURE__ */ m.jsxs("details", { className: ps, children: [
    /* @__PURE__ */ m.jsxs("summary", { className: _s, children: [
      "Advanced — guidance & steps",
      h.guidance_scale !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
        " · cfg ",
        h.guidance_scale
      ] }) : null,
      h.num_inference_steps !== void 0 ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
        " · ",
        h.num_inference_steps,
        " steps"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Mi, style: { marginTop: 10 }, children: [
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-cfg", children: "Guidance scale (temperature)" }),
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
            onChange: (x) => {
              const R = x.target.value;
              s(
                "guidance_scale",
                R === "" ? void 0 : Number(R)
              );
            },
            placeholder: "4.0 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Zt, children: "1–7. Higher = stricter prompt adherence; lower = more creative drift. Distilled LTX 2.3 default is 4.0." })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
        /* @__PURE__ */ m.jsx("label", { className: xl, htmlFor: "ltx-steps", children: "Inference steps" }),
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
            onChange: (x) => {
              const R = x.target.value;
              s(
                "num_inference_steps",
                R === "" ? void 0 : Math.round(Number(R))
              );
            },
            placeholder: "8 (default)"
          }
        ),
        /* @__PURE__ */ m.jsx("span", { className: Zt, children: "Distilled model is tuned for 8. Higher steps improve detail with ~linear wall-clock cost." })
      ] })
    ] })
  ] });
}
function Ly({ plan: c }) {
  const g = c.vram_risk === "safe" ? Pm : c.vram_risk === "moderate" ? tv : c.vram_risk === "risky" ? lv : ev;
  return /* @__PURE__ */ m.jsxs("div", { className: uu, style: { background: "transparent", padding: 0 }, children: [
    /* @__PURE__ */ m.jsx("h3", { className: en, style: { fontSize: "15px" }, children: "Render plan" }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Mode" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: c.mode })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Segments" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: c.segment_count })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Resolution" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        c.width,
        "×",
        c.height
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "FPS" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        c.base_fps,
        " → ",
        c.output_fps,
        " (",
        c.interpolation,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Duration" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        c.requested_duration_seconds.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "VRAM budget" }),
      /* @__PURE__ */ m.jsxs("span", { className: ya, children: [
        c.gpu_memory_budget_mb,
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "VRAM risk" }),
      /* @__PURE__ */ m.jsx("span", { className: g, children: c.vram_risk })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: Je, children: [
      /* @__PURE__ */ m.jsx("span", { className: we, children: "Runtime" }),
      /* @__PURE__ */ m.jsx("span", { className: ya, children: c.runtime_profile })
    ] }),
    c.warnings.length > 0 ? /* @__PURE__ */ m.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: c.warnings.map((h) => /* @__PURE__ */ m.jsxs("div", { className: an, children: [
      /* @__PURE__ */ m.jsx("strong", { children: h.code }),
      ": ",
      h.message
    ] }, h.code)) }) : null
  ] });
}
function Zy({
  run: c,
  onCancel: g,
  cancelling: h,
  onRetrySegment: s,
  retryingSegmentIndex: x,
  retryError: R
}) {
  if (!c)
    return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
      /* @__PURE__ */ m.jsx("h2", { className: en, children: "Output" }),
      /* @__PURE__ */ m.jsx("p", { className: Ay, children: "No render in progress yet. Configure the form on the left and press “Generate video”." })
    ] });
  const M = c.status === "completed" || c.status === "failed" || c.status === "cancelled", B = c.status !== "completed" && c.status !== "cancelled";
  return /* @__PURE__ */ m.jsxs("section", { className: uu, children: [
    /* @__PURE__ */ m.jsxs("h2", { className: en, children: [
      "Render ",
      Iy(c.id)
    ] }),
    /* @__PURE__ */ m.jsxs("p", { className: Zt, children: [
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
    /* @__PURE__ */ m.jsx(Ky, { run: c }),
    c.error_code ? /* @__PURE__ */ m.jsxs("div", { className: nu, role: "alert", "aria-live": "polite", children: [
      /* @__PURE__ */ m.jsx("strong", { children: c.error_code }),
      ":",
      " ",
      c.error_message ?? "unknown error"
    ] }) : null,
    R ? /* @__PURE__ */ m.jsx("div", { className: nu, role: "alert", "aria-live": "polite", children: R }) : null,
    /* @__PURE__ */ m.jsx(
      Jy,
      {
        segments: c.segments,
        onRetry: B ? s : null,
        retryingSegmentIndex: x
      }
    ),
    c.status === "completed" && c.final_artifact_id ? /* @__PURE__ */ m.jsx(ky, { artifactId: c.final_artifact_id }) : null,
    M ? null : /* @__PURE__ */ m.jsx("div", { className: nn, children: /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: gy,
        onClick: g,
        disabled: h,
        "aria-busy": h,
        children: h ? "Cancelling…" : "Cancel"
      }
    ) })
  ] });
}
function Ky({ run: c }) {
  const g = wy(c), h = Wy(c);
  return /* @__PURE__ */ m.jsxs("div", { className: bl, children: [
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
            /* @__PURE__ */ m.jsx("strong", { children: c.status }),
            h,
            g ? /* @__PURE__ */ m.jsxs("span", { className: Zt, children: [
              " · ",
              g
            ] }) : null
          ] }),
          /* @__PURE__ */ m.jsxs("span", { children: [
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
    /* @__PURE__ */ m.jsx("div", { className: py, children: /* @__PURE__ */ m.jsx(
      "div",
      {
        className: _y,
        style: { width: `${Math.max(2, c.progress_percent)}%` }
      }
    ) })
  ] });
}
function Jy({
  segments: c,
  onRetry: g,
  retryingSegmentIndex: h
}) {
  return /* @__PURE__ */ m.jsx("div", { className: Sy, children: c.map((s) => {
    const x = h === s.index, R = g !== null && s.status === "failed";
    return /* @__PURE__ */ m.jsxs("div", { className: by, children: [
      /* @__PURE__ */ m.jsx("span", { className: Fy(s.status) }),
      /* @__PURE__ */ m.jsxs("span", { children: [
        "Segment ",
        s.index + 1,
        " · ",
        s.duration_seconds.toFixed(1),
        "s"
      ] }),
      /* @__PURE__ */ m.jsx("span", { className: Zt, children: s.status }),
      R ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: Oi,
          onClick: () => g?.(s.index),
          disabled: h !== null,
          "aria-busy": x,
          "aria-label": `Retry segment ${s.index + 1}`,
          children: x ? "Retrying…" : "Retry"
        }
      ) : null
    ] }, s.index);
  }) });
}
function wy(c) {
  if (c.status === "completed" || c.status === "failed" || c.status === "cancelled" || c.segment_count <= 0)
    return null;
  const g = c.segments.filter(
    (M) => M.status === "completed" && M.started_at && M.completed_at
  );
  if (g.length === 0)
    return null;
  const h = g.reduce((M, B) => {
    const D = Date.parse(B.started_at), _ = Date.parse(B.completed_at);
    return !Number.isFinite(D) || !Number.isFinite(_) || _ <= D ? M : M + (_ - D);
  }, 0);
  if (h === 0)
    return null;
  const s = h / g.length, x = c.segment_count - c.completed_segments;
  if (x <= 0)
    return null;
  const R = x * s;
  return `~${$y(R)} remaining`;
}
function $y(c) {
  const g = Math.round(c / 1e3);
  if (g < 60)
    return `${g}s`;
  const h = Math.floor(g / 60), s = g % 60;
  if (h < 60)
    return s === 0 ? `${h}m` : `${h}m ${s}s`;
  const x = Math.floor(h / 60), R = h % 60;
  return `${x}h ${R}m`;
}
function Wy(c) {
  if (!c.restart_count || c.restart_count <= 0)
    return null;
  const g = c.max_restart_count > 0 ? c.max_restart_count : c.restart_count, h = c.last_breach_reason?.trim(), s = h ? `VRAM supervisor breach: ${h}` : "VRAM supervisor halted this chain at least once";
  return /* @__PURE__ */ m.jsxs("span", { className: Zt, "aria-live": "polite", title: s, children: [
    " · ",
    "restart ",
    c.restart_count,
    "/",
    g
  ] });
}
function Fy(c) {
  switch (c) {
    case "queued":
      return vs;
    case "rendering":
      return av;
    case "completed":
      return uv;
    case "failed":
      return nv;
    default:
      return vs;
  }
}
function ky({ artifactId: c }) {
  const g = my(c);
  return /* @__PURE__ */ m.jsxs("div", { className: Ey, children: [
    /* @__PURE__ */ m.jsx("video", { className: Ty, src: g, controls: !0, preload: "metadata" }),
    /* @__PURE__ */ m.jsx(
      "a",
      {
        className: zy,
        href: g,
        download: `${c}.mp4`,
        children: "Download MP4"
      }
    ),
    /* @__PURE__ */ m.jsxs("p", { className: Zt, children: [
      "artifact: ",
      c
    ] })
  ] });
}
function Iy(c) {
  return c.length > 12 ? `${c.slice(0, 6)}…${c.slice(-4)}` : c;
}
const xi = "ltx23-video-app", Py = new URL("./ltx23-video.css", import.meta.url).href;
class cv extends HTMLElement {
  root = null;
  shadow = null;
  connectedCallback() {
    this.shadow || (this.shadow = this.attachShadow({ mode: "open" }), this.injectStylesheet(this.shadow)), this.root = C0.createRoot(this.shadow), this.paint();
  }
  disconnectedCallback() {
    this.root?.unmount(), this.root = null;
  }
  injectStylesheet(g) {
    const h = document.createElement("link");
    h.rel = "stylesheet", h.href = Py, g.appendChild(h);
  }
  paint() {
    this.root && this.root.render(
      /* @__PURE__ */ m.jsx(J.StrictMode, { children: /* @__PURE__ */ m.jsx(Ry, {}) })
    );
  }
}
customElements.get(xi) || customElements.define(xi, cv);
function t1() {
  customElements.get(xi) || customElements.define(xi, cv);
}
export {
  t1 as register
};
//# sourceMappingURL=ltx23-video.js.map
